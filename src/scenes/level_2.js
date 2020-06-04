class level_2 extends Phaser.Scene {
    constructor() {
        super("level_2_scene");
    }

    create() {
        // Variables and Settings 
        this.max_y_vel = 200;
        this.acceleration = 170;
        this.drag = 7000;
        this.jump_vel = -350;
        this.physics.world.gravity.y = 1500;
        this.shrunk = false;
        this.grown = false;
        this.breakable = true;
        this.button_pressed = true;
        this.unlock = false;
        this.box_is_pushable = false;

        this.background = this.add.image(0, 0, 'background_level_2').setOrigin(0, 0);

        // Load Map
        // Create the level
        const level_2 = this.add.tilemap("level_2");
        // Add the tileset to the map
        const tileset = level_2.addTilesetImage("tileset");
        // Create tilemap layers
        //const background_layer = level_2.createStaticLayer("background_layer", tileset, 0 ,0);
        const platform_layer = level_2.createStaticLayer("platform_layer", tileset, 0 ,0);
        const breakable_walls = level_2.createStaticLayer("breakable_walls", tileset, 0 ,0);
        const button_wall = level_2.createStaticLayer("button_wall", tileset, 0 ,0);

        // Set map collisions
        platform_layer.setCollisionByProperty({collides: true });
        breakable_walls.setCollisionByProperty({collides: true });
        button_wall.setCollisionByProperty({collides: true});
        
        // Spawns Tilemap Objects
        // Spawns shrink powerup
        this.shrink_spawn = level_2.findObject("object_layer", obj => obj.name === "shrink_powerup");
        this.shrink_powerup = new shrink_powerup(this, this.shrink_spawn.x, this.shrink_spawn.y);

        // Spawns grow powerup
        this.grow_spawn = level_2.findObject("object_layer", obj => obj.name === "grow_powerup");
        this.grow_powerup = new grow_powerup(this, this.grow_spawn.x, this.grow_spawn.y);

        //this.physics.world.bounds.setTo(0, 0, level_2.widthInPixels, level_2.heightInPixels);
        // Spawns exit door
        
        this.open_door_spawn = level_2.findObject("object_layer", obj => obj.name === "open_door");
        this.open_door = new door(this, this.open_door_spawn.x, this.open_door_spawn.y - 16, 'open_door');

        this.closed_door_spawn = level_2.findObject("object_layer", obj => obj.name === "door");
        this.closed_door = new door(this, this.closed_door_spawn.x, this.closed_door_spawn.y - 15, 'locked_door');
       

        this.door_group = this.add.group(this.door);
        // Spawns player activated button
        this.button_spawn = level_2.findObject("object_layer", obj => obj.name === "little_button_spawn");
        this.button = new small_button(this, this.button_spawn.x, this.button_spawn.y - 8, 'orange_button_up');
       
        
        this.key_spawn = level_2.findObject("object_layer", obj => obj.name === "key_spawn");
        this.key = new key(this, this.key_spawn.x, this.key_spawn.y - 10);
    
        
        // Creates a half block for shrunken tunnel escape
        this.half_wall = level_2.createFromObjects("object_layer", "half_wall", {
            key: "tileset",
            frame: 1
        }, this);
        this.physics.world.enable(this.half_wall, Phaser.Physics.Arcade.STATIC_BODY);

        this.half_wall_group = this.add.group(this.half_wall);
        this.half_wall.map((half_wall) => {
            half_wall.body.setSize(3, 15).setOffset(1, 1);
        });

        // Spawns in boxes
        const box_spawn_1 = level_2.findObject("object_layer", obj => obj.name === "box_spawn");
        this.box_1 = new box(this, box_spawn_1.x, box_spawn_1.y);
        this.box_1.body.immovable = true;
        
        //Spawn on big button
        this.big_button_spawn = level_2.findObject("object_layer", obj => obj.name === "big_button_spawn");
        this.big_button = new big_button(this, this.big_button_spawn.x, this.big_button_spawn.y, 'big_button_up');

        // #region Add Player to game world
        const player_spawn = level_2.findObject("object_layer", obj => obj.name === "player_spawn");
        this.player = this.physics.add.sprite(player_spawn.x, player_spawn.y,'player');
        this.player.body.setAllowGravity(true);
        // #endregion

        // setup camera
        this.cameras.main.setBounds(0, 0, level_2.widthInPixels, level_2.heightInPixels);
        this.cameras.main.startFollow(this.player, true, 0.25, 0.25); // (target, [,roundPixels][,lerpX][,lerpY])
        this.cameras.main.setZoom(2);

        // set up input
        cursors = this.input.keyboard.createCursorKeys();
        // S for Shrink (TEMP)
        //keyS = this.input.keyboard.addKey(Phaser.Input.Keyboard.KeyCodes.S);
        // G for Grow (TEMP)
        //keyG = this.input.keyboard.addKey(Phaser.Input.Keyboard.KeyCodes.G);
        // D for debug check
        key_d = this.input.keyboard.addKey(Phaser.Input.Keyboard.KeyCodes.D);
        // R for reset
        key_r = this.input.keyboard.addKey(Phaser.Input.Keyboard.KeyCodes.R);

        // Physics colliders
        this.physics.add.collider(this.player, this.box_1);
        this.physics.add.collider(this.player, platform_layer);
        this.physics.add.collider(this.box_1, platform_layer);
        this.button_collider = this.physics.add.collider(this.player, button_wall);
        this.big_button_collider = this.physics.add.collider(this.player, breakable_walls);
        this.physics.add.collider(this.player, this.big_button);
        this.physics.add.collider(this.player, this.half_wall);
        this.physics.add.collider(this.player, this.breakable_wall_group);
        this.physics.add.collider(this.player, this.button, (obj1, obj2) => {
            if(this.button_pressed && this.player.body.touching.down) {
                this.button_pressed = false;
                this.button.setTexture('orange_button_down');
                this.button.body.setSize(16, 7).setOffset(0, 10);
                button_wall.destroy();
                this.button_collider.destroy();
            }
        });
        this.physics.add.collider(this.box_1, this.big_button, (obj1, obj2) => {
            if(this.breakable) {
                this.breakable = false;
                this.big_button.setTexture('big_button_down');
                this.big_button.body.setSize(32,14).setOffset(0, 18);
                breakable_walls.destroy();
                this.big_button_collider.destroy();
                this.box_1.body.setAllowGravity(false);
                //this.box_1.body.immovable = true;
                this.moveTween = this.tweens.add({
                    targets: this.box_1,
                    y: {from: this.box_1.y, to: this.big_button.y - 14},
                    duration: 200,
                    repeat: 0,
                    yoyo: false,
                });
            }
        });
        
        // Overlap checkers
        // Grow powerup overlap check
        this.physics.add.overlap(this.player, this.grow_powerup, (obj1, obj2) => {
            obj2.destroy(); // remove grow powerup
            this.grown = true;
            this.shrunk = false;
            this.sound.play("grow_sound", {volume: 0.1});
            let grow_tween = this.tweens.add({
                targets: this.player,
                scale: {from: 1, to: 2},
                duration: 200,
                repeat: 0,
                yoyo: false,
            });
            //this.player.setScale(2);
            
            this.box_1.body.immovable = false;
        });

        // Shrink powerup overlap check
        this.physics.add.overlap(this.player, this.shrink_powerup, (obj1, obj2) => {
            obj2.destroy(); // remove shrink powerup
            this.shrunk = true;
            this.grown = false;
            this.sound.play("shrink_sound", {volume: 0.1})
            let shrink_tween = this.tweens.add({
                targets: this.player,
                scale: {from: 1, to: 0.5},
                duration: 200,
                repeat: 0,
                yoyo: false,
            });
            
            this.grow = false;
            this.box_1.body.immovable = true;
        });

        // Door powerup overlap check
        this.physics.add.overlap(this.player, this.closed_door, (obj1, obj2) => {
            if(this.unlock) {
                this.sound.play("level_complete", {volume: 0.1});
                this.scene.start("level_3_scene");
            }
        });

        // Key overlap check
        this.physics.add.overlap(this.player, this.key, (obj1, obj2) => {
            obj2.destroy(); // remove key
            this.closed_door.setTexture('open_door');
            this.unlock = true;
        });
    }

    update() {
        // player movement
        if(cursors.left.isDown) {
            this.player.body.setVelocityX(-this.acceleration);
            this.player.setFlip(true, false);
        } else if(cursors.right.isDown) {
            this.player.body.setVelocityX(this.acceleration);
            this.player.resetFlip();
        } else {
            // set acceleration to 0 so DRAG will take over
            this.player.body.setVelocityX(0);
        }

        // Jump logic
        if((this.player.body.blocked.down || this.player.body.touching.down) && Phaser.Input.Keyboard.JustDown(cursors.up) && !this.grown) {
            this.player.body.setVelocityY(this.jump_vel);
            this.sound.play('jump_sound', {volume: 0.1});
        }
        
        // Reset Scale
        if(Phaser.Input.Keyboard.JustDown(key_d)) {
            //console.log(this.grown);
            if(this.shrunk) {
                let small_to_normal_tween = this.tweens.add({
                    targets: this.player,
                    scale: {from: 0.5, to: 1},
                    duration: 200,
                    repeat: 0,
                    yoyo: false,
                });
            } else if (this.grown) {
                let grown_to_normal_tween = this.tweens.add({
                    targets: this.player,
                    scale: {from: 2, to: 1},
                    duration: 200,
                    repeat: 0,
                    yoyo: false,
                });
            }
            this.grown = false;
            this.shrunk = false;
            this.box_1.body.immovable = true;
        }
        if(this.player.body.blocking) {
            if(this.grown) {
                //this.box_1.body.setAccelerationX(-this.ACCELERATION);
            } 
        }
        else {
            this.box_1.body.setAccelerationX(0);
            this.box_1.body.setDragX(this.drag);
        }
        
        // Reset level
        if(Phaser.Input.Keyboard.JustDown(key_r)) {
            this.scene.restart(this.level);
        }

    }

}