class level_2 extends Phaser.Scene {
    constructor() {
        super("level_2_scene");
    }

    create() {
        // Variables and Settings 
        this.max_y_vel = 200;
        this.acceleration = 200;
        this.drag = 7000;
        this.jump_vel = -450;
        this.physics.world.gravity.y = 2000;
        this.shrunk = false;
        this.grown = false;
        this.breakable = true;
        this.button_pressed = true;
        this.unlock = false;
        //this.physics.world.TILE_BIAS = 10000;

        // Load Map
        // Create the level
        const level_2 = this.add.tilemap("level_2");
        // Add the tileset to the map
        const tileset = level_2.addTilesetImage("tileset");
        // Create tilemap layers
        const background_layer = level_2.createStaticLayer("background_layer", tileset, 0 ,0);
        const platform_layer = level_2.createStaticLayer("platform_layer", tileset, 0 ,0);
        const breakable_walls = level_2.createStaticLayer("breakable_walls", tileset, 0 ,0);
        const button_wall = level_2.createStaticLayer("button_wall", tileset, 0 ,0);

        // Set map collisions
        platform_layer.setCollisionByProperty({collides: true });
        breakable_walls.setCollisionByProperty({collides: true });
        button_wall.setCollisionByProperty({collides: true});
        
        // Spawns Tilemap Objects
        // Spawns shrink powerup
        this.shrink_powerup = level_2.createFromObjects("object_layer", "shrink_powerup", {
            key: "tileset",
            frame: 7
        }, this);
        this.physics.world.enable(this.shrink_powerup, Phaser.Physics.Arcade.STATIC_BODY);

        this.shrink_powerup.map((shrink_powerup) => {
            shrink_powerup.body.setCircle(5).setOffset(3, 3); 
        });

        this.shrink_group = this.add.group(this.shrink_powerup);

        // Spawns grow powerup
        this.grow_powerup = level_2.createFromObjects("object_layer", "grow_powerup", {
            key: "tileset",
            frame: 6
        }, this);
        this.physics.world.enable(this.grow_powerup, Phaser.Physics.Arcade.STATIC_BODY);
    
        this.grow_powerup.map((grow_power_up) => {
            grow_power_up.body.setCircle(5).setOffset(3, 3); 
        });

        this.grow_group = this.add.group(this.grow_powerup);

        //this.physics.world.bounds.setTo(0, 0, level_2.widthInPixels, level_2.heightInPixels);
        // Spawns exit door
        this.door = level_2.createFromObjects("object_layer", "door", {
            key: "tileset",
            frame: 3
        }, this);
        this.physics.world.enable(this.door, Phaser.Physics.Arcade.STATIC_BODY);

        this.door_group = this.add.group(this.door);

        // Spawns player activated button
        this.button = level_2.createFromObjects("object_layer", "little_button_spawn", {
            key: "tileset",
            frame: 10
        }, this);
        this.physics.world.enable(this.button, Phaser.Physics.Arcade.STATIC_BODY);
       
        this.button.map((button) => {
            button.body.setSize(16, 8).setOffset(0, 8);
        });

        // Spawns breakable walls
        // this.breakable_wall = level_2.createFromObjects("breakable_walls", "breakable_wall", {
        //     key: "tileset",
        //     frame: 0
        // }, this);
        // this.physics.world.enable(this.breakable_wall, Phaser.Physics.Arcade.STATIC_BODY);
        // this.breakable_wall_group = this.add.group(this.breakable_wall);
        
        // Spawns key in spawn location
        this.key = level_2.createFromObjects("object_layer", "key_spawn", {
            key: "tileset",
            frame: 11
        }, this);
        this.physics.world.enable(this.key, Phaser.Physics.Arcade.STATIC_BODY);

        this.key.map((key) => {
            key.body.setCircle(3).setOffset(3, 5); 
        });
        
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
        const box_spawn = level_2.findObject("object_layer", obj => obj.name === "box_spawn");
        this.block = this.physics.add.sprite(box_spawn.x, box_spawn.y,'box');
        this.block.body.setAllowGravity(true);
        this.block.body.immovable = true;
        
        //Spawn on big button
        const big_button_spawn = level_2.findObject("object_layer", obj => obj.name === "big_button_spawn");
        this.big_button = this.physics.add.sprite(big_button_spawn.x, big_button_spawn.y, 'big_button');
        this.big_button.body.setAllowGravity(false);
        this.big_button.body.immovable = true;
        this.big_button.body.setSize(32,16).setOffset(0, 16);

        // #region Add Player to game world
        const player_spawn = level_2.findObject("object_layer", obj => obj.name === "player_spawn");
        this.player = this.physics.add.sprite(player_spawn.x, player_spawn.y,'temp_player');
        this.player.body.setAllowGravity(true);
        // #endregion

        // setup camera
        this.cameras.main.setBounds(0, 0, level_2.widthInPixels, level_2.heightInPixels);
        this.cameras.main.startFollow(this.player, true, 0.25, 0.25); // (target, [,roundPixels][,lerpX][,lerpY])

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
        this.physics.add.collider(this.player, this.block);
        this.physics.add.collider(this.player, platform_layer);
        this.physics.add.collider(this.block, platform_layer);
        this.button_collider = this.physics.add.collider(this.player, button_wall);
        this.big_button_collider = this.physics.add.collider(this.player, breakable_walls);
        this.physics.add.collider(this.player, this.big_button);
        this.physics.add.collider(this.player, this.half_wall);
        this.physics.add.collider(this.player, this.breakable_wall_group);
        this.physics.add.collider(this.player, this.button, (obj1, obj2) => {
            if(this.button_pressed) {
                this.button_pressed = false;
                button_wall.destroy();
                this.button_collider.destroy();
            }
        });
        this.physics.add.collider(this.block, this.big_button, (obj1, obj2) => {
            if(this.breakable) {
                this.breakable = false;
                breakable_walls.destroy();
                this.big_button_collider.destroy();
            }
        });
        
        // Overlap checkers
        // Grow powerup overlap check
        this.physics.add.overlap(this.player, this.grow_group, (obj1, obj2) => {
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
            
            this.block.body.immovable = false;
        });

        // Shrink powerup overlap check
        this.physics.add.overlap(this.player, this.shrink_group, (obj1, obj2) => {
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
            this.block.body.immovable = true;
        });

        // Door powerup overlap check
        this.physics.add.overlap(this.player, this.door_group, (obj1, obj2) => {
            if(this.unlock) {
                this.sound.play("level_complete", {volume: 0.1});
                this.scene.start("end_game_scene");
            }
        });

        // Key overlap check
        this.physics.add.overlap(this.player, this.key, (obj1, obj2) => {
            obj2.destroy(); // remove key
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

        //if(this.physics.collide(this.block, this.big_button))
        
        // Buttons for shrink and grow for debug purposes

        // if(Phaser.Input.Keyboard.JustDown(keyS) && !this.shrunk) {
        //     this.player.setScale(0.5);
        //     this.shrunk = true;
        //     this.block.body.immovable = false;
        // }

        // if(Phaser.Input.Keyboard.JustDown(keyG)) {
        //     this.player.setScale(2);
        //     this.grown = true;
        //     this.block.body.immovable = false;
        //     //console.log(this.grown);
        // }

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
            this.block.body.immovable = true;
        }
        // Collision logic for box
        if(this.player.body.blocking) {
            if(this.grown) {
                //this.block.body.setAccelerationX(-this.ACCELERATION);
            } 
        }
        else {
            this.block.body.setAccelerationX(0);
            this.block.body.setDragX(this.drag);
        }
        
        // Reset level
        if(Phaser.Input.Keyboard.JustDown(key_r)) {
            this.scene.restart(this.level);
        }

    }

}