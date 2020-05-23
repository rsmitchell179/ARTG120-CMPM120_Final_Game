class level_1 extends Phaser.Scene {
    constructor() {
        super("level_1_scene");
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
        this.unlock = false;
        // Load Map
        // Create the level
        const level_1 = this.add.tilemap("level_temp");
        // Add the tileset to the map
        const tileset = level_1.addTilesetImage("tileset");
        // Create tilemap layers
        const background_layer = level_1.createStaticLayer("background_layer", tileset, 0 ,0);
        const platform_layer = level_1.createStaticLayer("platform_layer", tileset, 0 ,0);

        // Set map collisions
        platform_layer.setCollisionByProperty({collides: true });

        
        // Spawns Tilemap Objects
        // Spawns shrink powerup
        this.shrink_powerup = level_1.createFromObjects("object_layer", "shrink_powerup", {
            key: "tileset",
            frame: 7
        }, this);
        this.physics.world.enable(this.shrink_powerup, Phaser.Physics.Arcade.STATIC_BODY);

        this.shrink_powerup.map((shrink_powerup) => {
            shrink_powerup.body.setCircle(5).setOffset(3, 3); 
        });

        this.shrink_group = this.add.group(this.shrink_powerup);
        // Spawns second powerup with individual text logics
        this.shrink_powerup_2 = level_1.createFromObjects("object_layer", "shrink_powerup_2", {
            key: "tileset",
            frame: 7
        }, this);
        this.physics.world.enable(this.shrink_powerup_2, Phaser.Physics.Arcade.STATIC_BODY);

        this.shrink_powerup_2.map((shrink_powerup) => {
            shrink_powerup.body.setCircle(5).setOffset(3, 3); 
        });

        // Spawns grow powerup
        this.grow_powerup = level_1.createFromObjects("object_layer", "grow_powerup", {
            key: "tileset",
            frame: 6
        }, this);
        this.physics.world.enable(this.grow_powerup, Phaser.Physics.Arcade.STATIC_BODY);
    
        this.grow_powerup.map((grow_power_up) => {
            grow_power_up.body.setCircle(5).setOffset(3, 3); 
        });

        this.grow_group = this.add.group(this.grow_powerup);

        this.grow_powerup_2 = level_1.createFromObjects("object_layer", "grow_powerup_2", {
            key: "tileset",
            frame: 6
        }, this);
        this.physics.world.enable(this.grow_powerup_2, Phaser.Physics.Arcade.STATIC_BODY);
    
        this.grow_powerup_2.map((grow_power_up) => {
            grow_power_up.body.setCircle(5).setOffset(3, 3); 
        });


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
        
        //this.physics.world.bounds.setTo(0, 0, level_1.widthInPixels, level_1.heightInPixels);
        
        // Spawns exit door
        this.door = level_1.createFromObjects("object_layer", "door", {
            key: "tileset",
            frame: 3
        }, this);
        this.physics.world.enable(this.door, Phaser.Physics.Arcade.STATIC_BODY);

        this.door_group = this.add.group(this.door);
        
        // Creates instructional text
        const shrink_text = level_1.findObject("text_layer", obj => obj.name === "shrink_text");
        const grow_text = level_1.findObject("text_layer", obj => obj.name === "grow_text");
        const box_text = level_1.findObject("text_layer", obj => obj.name === "box_text");
        const normal_text = level_1.findObject("text_layer", obj => obj.name === "normal_text");
        const door_text = level_1.findObject("text_layer", obj => obj.name === "door_text");
        const key_text = level_1.findObject("text_layer", obj => obj.name === "key_text");
        // Spawn in intructional text
        this.shrink_text = this.add.text(shrink_text.x, shrink_text.y, 'Collect blue\npowerup to shrink');
        this.add.text(normal_text.x, normal_text.y, 'Press D to return\nto normal size\nPress R to reset level');
        
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
        this.key = level_1.createFromObjects("object_layer", "key_spawn", {
            key: "tileset",
            frame: 11
        }, this);
        this.physics.world.enable(this.key, Phaser.Physics.Arcade.STATIC_BODY);

        this.key.map((key) => {
            key.body.setCircle(3).setOffset(3, 5); 
        });

        // Spawns in boxes
        const box_spawn1 = level_1.findObject("object_layer", obj => obj.name === "box_spawn1");
        this.block = this.physics.add.sprite(box_spawn1.x, box_spawn1.y,'box');
        this.block.body.setAllowGravity(true);
        this.block.body.immovable = true;
        
        const box_spawn2 = level_1.findObject("object_layer", obj => obj.name === "box_spawn2");
        this.block2 = this.physics.add.sprite(box_spawn2.x, box_spawn2.y,'box');
        this.block2.body.setAllowGravity(true);
        this.block2.body.immovable = true;

        // #region Add Player to game world
        const player_spawn = level_1.findObject("object_layer", obj => obj.name === "player_spawn");
        this.player = this.physics.add.sprite(player_spawn.x, player_spawn.y,'temp_player');
        this.player.setCollideWorldBounds(true);
        this.player.body.setAllowGravity(true);
        // #endregion

        // setup camera
        this.cameras.main.setBounds(0, 0, level_1.widthInPixels, level_1.heightInPixels);
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
        this.physics.add.collider(this.player, this.block2);
        this.physics.add.collider(this.block, this.block2);
        this.physics.add.collider(this.player, platform_layer);
        this.physics.add.collider(this.block, platform_layer);
        this.physics.add.collider(this.block2, platform_layer);
        this.physics.add.collider(this.player, this.half_block);
        this.physics.add.collider(this.player, this.half_wall);
        
        // Overlap checkers
        
         // Shrink powerup overlap check
         this.physics.add.overlap(this.player, this.shrink_group, (obj1, obj2) => {
            obj2.destroy(); // remove shrink powerup
            this.shrink_text.destroy();
            this.shrunk = true;
            this.grown = false;
            this.grow_text = this.add.text(grow_text.x-14, grow_text.y, 'Collect yellow\npowerup to grow');
            this.sound.play("shrink_sound", {volume: 0.1})
            //this.player.setScale(0.5);
            let shrink_tween = this.tweens.add({
                targets: this.player,
                scale: {from: 1, to: 0.5},
                duration: 200,
                repeat: 0,
                yoyo: false,
            });
            this.block.body.immovable = true;
            this.block2.body.immovable = true;
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
            this.block.body.immovable = true;
            this.block2.body.immovable = true;
        });
        
        // Grow powerup overlap check
        this.physics.add.overlap(this.player, this.grow_group, (obj1, obj2) => {
            obj2.destroy(); // remove grow powerup
            this.grow_text.destroy();
            this.grown = true;
            this.shrunk = false;
            this.box_text = this.add.text(box_text.x-5, box_text.y, 'Push box here|');
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
            this.block2.body.immovable = false;
        });

        // To add text to show the player to get the key 
        this.physics.add.overlap(this.player, this.grow_powerup_2, (obj1, obj2) => {
            obj2.destroy(); // remove grow powerup
            this.box_text.destroy();
            this.grow_text.destroy();
            this.key_text = this.add.text(key_text.x+20, key_text.y - 15, 'Grab key to\nunlock door->');
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
            this.block2.body.immovable = false;
        });

        // Door powerup overlap check
        this.physics.add.overlap(this.player, this.door_group, (obj1, obj2) => {
            if(this.unlock) {
                this.sound.play("level_complete", {volume: 0.1});
                this.scene.start("level_2_scene");
            }
        });

         // Key overlap check
         this.physics.add.overlap(this.player, this.key, (obj1, obj2) => {
            obj2.destroy(); // remove key
            this.door_text = this.add.text(door_text.x-10, door_text.y, 'Get to the door\nto complete ->\nthe level', {fontSize: 14});
            this.key_text.destroy();
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

        // Buttons for shrink and grow for debug purposes

        // if(Phaser.Input.Keyboard.JustDown(keyS) && !this.shrunk) {
        //     this.player.setScale(0.5);
        //     this.shrunk = true;
        //     this.block.body.immovable = false;
        //     this.block2.body.immovable = false;
        // }

        // if(Phaser.Input.Keyboard.JustDown(keyG)) {
        //     this.player.setScale(2);
        //     this.grown = true;
        //     this.block.body.immovable = false;
        //     this.block2.body.immovable = false;
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
            this.block2.body.immovable = true;
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
            this.block2.body.setAccelerationX(0);
            this.block2.body.setDragX(this.drag);
        }
        
        // Reset level
        if(Phaser.Input.Keyboard.JustDown(key_r)) {
            this.scene.restart(this.level);
        }
    }

}