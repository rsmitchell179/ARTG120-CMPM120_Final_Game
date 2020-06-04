class level_1 extends Phaser.Scene {
    constructor() {
        super("level_1_scene");
    }

    create() {
        // Variables and Settings 
        this.acceleration = 170;
        this.drag = 7000;
        this.jump_vel = -350;
        this.physics.world.gravity.y = 1500;
        this.shrunk = false;
        this.grown = false;
        this.unlock = false;
        this.box_is_pushable = false;
        this.push_text_exists = true;
        // Add background image 
        this.background = this.add.image(0, 0, 'background_level_1').setOrigin(0,0);

        // Load Map
        // Create the level
        const level_1 = this.add.tilemap("level_1");
        // Add the tileset to the map
        const tileset = level_1.addTilesetImage("tileset");
        // Create tilemap layers
        const platform_layer = level_1.createStaticLayer("platform_layer", tileset, 0 ,0);

        // Set map collisions
        platform_layer.setCollisionByProperty({collides: true });

        // -----------------------Spawns Tilemap Objects-----------------------------------------------------------

        // Spawns shrink powerup
        this.shrink_spawn = level_1.findObject("object_layer", obj => obj.name === "shrink_powerup");
        this.shrink_powerup = new shrink_powerup(this, this.shrink_spawn.x, this.shrink_spawn.y);
        //this.shrink_group = this.add.group(this.shrink_powerup);
        
        // Spawns second shrink powerup with individual text logics
        this.shrink_spawn_2 = level_1.findObject("object_layer", obj => obj.name === "shrink_powerup_2");
        this.shrink_powerup_2 = new shrink_powerup(this, this.shrink_spawn_2.x, this.shrink_spawn_2.y);

        // Spawns grow powerup 1
        this.grow_spawn = level_1.findObject("object_layer", obj => obj.name === "grow_powerup");
        this.grow_powerup = new grow_powerup(this, this.grow_spawn.x, this.grow_spawn.y);

        // Spawns second grow powerup with individual text logics
        this.grow_spawn_2 = level_1.findObject("object_layer", obj => obj.name === "grow_powerup_2");
        this.grow_powerup_2 = new grow_powerup(this, this.grow_spawn_2.x, this.grow_spawn_2.y);

        // Creates a half block for shrunken tunnel escape
        this.half_wall = level_1.createFromObjects("object_layer", "half_wall", {
            key: "tileset",
            frame: 1
        }, this);
        this.physics.world.enable(this.half_wall, Phaser.Physics.Arcade.STATIC_BODY);

        this.half_wall_group = this.add.group(this.half_wall);
        this.half_wall.map((half_wall) => {
            half_wall.body.setSize(3, 15).setOffset(1, 1);
        });
        
        // Spawns exit door
        this.closed_door_spawn = level_1.findObject("object_layer", obj => obj.name === "door");
        this.closed_door = new door(this, this.closed_door_spawn.x, this.closed_door_spawn.y - 16, 'locked_door');
        
        // Creates instructional text
        const movement_text = level_1.findObject("text_layer", obj => obj.name === "movement_text");
        const shrink_text = level_1.findObject("text_layer", obj => obj.name === "shrink_text");
        const grow_text = level_1.findObject("text_layer", obj => obj.name === "grow_text");
        const box_text = level_1.findObject("text_layer", obj => obj.name === "box_text");
        const normal_text = level_1.findObject("text_layer", obj => obj.name === "normal_text");
        const door_text = level_1.findObject("text_layer", obj => obj.name === "door_text");
        const key_text = level_1.findObject("text_layer", obj => obj.name === "key_text");
        // Spawn in intructional text
        this.shrink_text = this.add.bitmapText(shrink_text.x, shrink_text.y, 'smaller_font', 'Collect blue\npowerup to shrink', 19);
        this.movement_text = this.add.bitmapText(movement_text.x, movement_text.y, 'smaller_font', 'Use Arrow Keys to\n    navigate', 19);
        this.add.bitmapText(normal_text.x, normal_text.y, 'smaller_font', 'Press D to return\nto normal size\nPress R to reset level', 17);
        
        // Creates a half block for shrunken tunnel escape
        this.half_block = level_1.createFromObjects("object_layer", "half_block", {
            key: "tileset",
            frame: 9
        }, this);
        this.physics.world.enable(this.half_block, Phaser.Physics.Arcade.STATIC_BODY);

        this.half_block_group = this.add.group(this.half_block);
        this.half_block.map((half_block) => {
            half_block.body.setSize(16, 8).setOffset(0, -1)
        });

        // Spawn in key
        this.key_spawn = level_1.findObject("object_layer", obj => obj.name === "key_spawn");
        this.key = new key(this, this.key_spawn.x, this.key_spawn.y - 10);

        // Spawns in boxes
        const box_spawn_1 = level_1.findObject("object_layer", obj => obj.name === "box_spawn_1");
        this.box_1 = new box(this, box_spawn_1.x, box_spawn_1.y);
        //this.box_1.body.setAllowGravity(true);
        this.block_is_pushable = true;

        const box_spawn_2 = level_1.findObject("object_layer", obj => obj.name === "box_spawn_2");
        this.box_2 = new box(this, box_spawn_2.x, box_spawn_2.y);
        //this.box_2.body.setAllowGravity(true);

        // #region Add Player to game world
        const player_spawn = level_1.findObject("object_layer", obj => obj.name === "player_spawn");
        this.player = this.physics.add.sprite(player_spawn.x, player_spawn.y,'player');
        this.player.setCollideWorldBounds(true);
        this.player.body.setAllowGravity(true);
        // #endregion

        // setup camera
        this.cameras.main.setBounds(0, 0, level_1.widthInPixels, level_1.heightInPixels);
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

        // Physics collider
        this.physics.add.collider(this.player, this.box_1);
        this.physics.add.collider(this.player, this.box_2);
        this.physics.add.collider(this.box_1, this.box_2);
        this.physics.add.collider(this.player, platform_layer);
        this.physics.add.collider(this.box_1, platform_layer);
        this.physics.add.collider(this.box_2, platform_layer);
        this.physics.add.collider(this.player, this.half_block);
        this.physics.add.collider(this.player, this.half_wall);
        
        // Overlap checkers
        
         // Shrink powerup overlap check
         this.physics.add.overlap(this.player, this.shrink_powerup, (obj1, obj2) => {
            obj2.destroy(); // remove shrink powerup
            this.shrink_text.destroy();
            this.movement_text.destroy();
            this.shrunk = true;
            this.grown = false;
            this.grow_text = this.add.bitmapText(grow_text.x-14, grow_text.y, 'smaller_font', 'Collect yellow\npowerup to grow', 19);
            this.sound.play("shrink_sound", {volume: 0.1})
            //this.player.setScale(0.5);
            let shrink_tween = this.tweens.add({
                targets: this.player,
                scale: {from: 1, to: 0.5},
                duration: 200,
                repeat: 0,
                yoyo: false,
            });
            this.box_1.body.immovable = true;
            this.box_2.body.immovable = true;
        });
        
        this.physics.add.overlap(this.player, this.shrink_powerup_2, (obj1, obj2) => {
            obj2.destroy(); // remove shrink powerup
            this.shrunk = true;
            this.grown = false;
            this.sound.play("shrink_sound", {volume: 0.1})
            //this.player.setScale(0.5);
            let shrink_tween = this.tweens.add({
                targets: this.player,
                scale: {from: 1, to: 0.5},
                duration: 200,
                repeat: 0,
                yoyo: false,
            });
            this.box_1.body.immovable = true;
            this.box_2.body.immovable = true;
        });
        
        // Grow powerup overlap check
        this.physics.add.overlap(this.player, this.grow_powerup, (obj1, obj2) => {
            obj2.destroy(); // remove grow powerup
            this.grow_text.destroy();
            this.grown = true;
            this.shrunk = false;
            this.box_1.body.immovable = false;
            this.box_2.body.immovable = false;
            this.box_text = this.add.bitmapText(box_text.x, box_text.y, 'smaller_font' , 'Push box here |', 19);
            this.sound.play("grow_sound", {volume: 0.1});
            let grow_tween = this.tweens.add({
                targets: this.player,
                scale: {from: 1, to: 2},
                duration: 200,
                repeat: 0,
                yoyo: false,
            });
            //this.player.setScale(2);
        });

        // To add text to show the player to get the key 
        this.physics.add.overlap(this.player, this.grow_powerup_2, (obj1, obj2) => {
            obj2.destroy(); // remove grow powerup
            this.box_text.destroy();
            this.grow_text.destroy();
            this.key_text = this.add.bitmapText(key_text.x - 15, key_text.y - 13, 'smaller_font', 'Grab key to\nunlock door', 19);
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
            this.box_2.body.immovable = false;
        });

        // Door powerup overlap check
        this.physics.add.overlap(this.player, this.closed_door, (obj1, obj2) => {
            if(this.unlock) {
                this.sound.play("level_complete", {volume: 0.1});
                this.scene.start("level_2_scene");
            }
        });
        
         // Key overlap check
         this.physics.add.overlap(this.player, this.key, (obj1, obj2) => {
            obj2.destroy(); // remove key
            this.door_text = this.add.bitmapText(door_text.x, door_text.y, 'smaller_font', 'Get to the door\n  to complete \n   the level', 15);
            this.closed_door.setTexture('open_door');
            this.key_text.destroy();
            this.unlock = true;
        });
    }

    update() {
        // player movement
        if(cursors.left.isDown) {
            this.player.body.setVelocityX(-this.acceleration);
        } else if(cursors.right.isDown) {
            this.player.body.setVelocityX(this.acceleration);
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
                let grow_to_normal_tween = this.tweens.add({
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
            this.box_2.body.immovable = true;
        }
        
        // Collision logic for box
        if(this.player.body.blocking) {
            if(this.grown) {
                //this.block.body.setAccelerationX(-this.ACCELERATION);
            } 
        }
        else {
            this.box_1.body.setAccelerationX(0);
            this.box_1.body.setDragX(this.drag);
            this.box_2.body.setAccelerationX(0);
            this.box_2.body.setDragX(this.drag);
        }
        // Destroy text when box is pushed there
        if(this.box_1.x <= 375){
            if(this.push_text_exists) {
                this.box_text.destroy();
                this.push_text_exists = false;
            }
        }
        
        // Reset level
        if(Phaser.Input.Keyboard.JustDown(key_r)) {
            this.scene.restart(this.level);
        }
    }

}