class level_3 extends Phaser.Scene {
    constructor() {
        super("level_3_scene");
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
        this.breakable_1 = true;
        this.breakable_2 = true;
        this.button_1_pressed = true;
        this.button_2_pressed = true;
        this.unlock = false;
        this.player_X;
        this.player_Y;
        this.checkpoint = 0;
        
        this.spawned_spikes = false;
        this.draw_hit_box = false;
        this.key_wall_exists = true;
        this.button_1_wall_exists = true;
        this.button_2_wall_exists = true;
        this.spawn_platform_exists = false;
        this.grow_powerup_exists = true;
        this.grow_powerup_2_exists = true;
        this.shrink_powerup_exists = true;
        this.key_exists = true;
        this.checkpoint_overlap_1 = true;
        this.checkpoint_overlap_2 = true;

        this.background = this.add.image(0, 0, 'background_level_3').setOrigin(0, 0);

        // Load Map
        // Create the level
        const level_3 = this.add.tilemap("level_3");
        // Add the tileset to the map
        const tileset = level_3.addTilesetImage("tileset");
        // Create tilemap layers
        const platform_layer = level_3.createStaticLayer("platform_layer", tileset, 0, 0);
        const button_1_wall = level_3.createStaticLayer("button_1_wall", tileset, 0, 0);
        const button_2_wall = level_3.createStaticLayer("button_2_wall", tileset, 0, 0);
        const key_wall = level_3.createStaticLayer("key_wall", tileset, 0, 0);

        // Set map collisions
        platform_layer.setCollisionByProperty({collides: true });
        button_1_wall.setCollisionByProperty({collides: true });
        button_2_wall.setCollisionByProperty({collides: true});
        key_wall.setCollisionByProperty({collides: true});

        // Get height of level 3
        this.height_of_level = level_3.heightInPixels;
       
        // ----------------------------Spawns Tilemap Objects----------------------------------------

        // Spawns shrink powerup
        this.shrink_spawn = level_3.findObject("object_layer", obj => obj.name === "shrink_powerup");
        this.shrink_powerup = new shrink_powerup(this, this.shrink_spawn.x, this.shrink_spawn.y);

        // Spawns grow powerup
        this.grow_spawn = level_3.findObject("object_layer", obj => obj.name === "grow_powerup");
        this.grow_powerup = new grow_powerup(this, this.grow_spawn.x, this.grow_spawn.y);

        // spawns second grow powerup for part 4 of level 3
        this.grow_spawn_2 = level_3.findObject("object_layer", obj => obj.name === "grow_powerup_2");
        this.grow_powerup_2 = new grow_powerup(this, this.grow_spawn_2.x, this.grow_spawn_2.y);

        // Spawns in checkpoint 1 for part 2 of level 3
        this.checkpoint_1_spawn = level_3.findObject("object_layer", obj => obj.name === "checkpoint_1");
        this.checkpoint_1 = new checkpoint(this, this.checkpoint_1_spawn.x, this.checkpoint_1_spawn.y - 8, 'checkpoint_flag_down');
        
        // Spawns in checkpoint 2 for part 3 of level 3 
        this.checkpoint_2_spawn = level_3.findObject("object_layer", obj => obj.name === "checkpoint_2");
        this.checkpoint_2 = new checkpoint(this, this.checkpoint_2_spawn.x, this.checkpoint_2_spawn.y - 8, 'checkpoint_flag_down');
        
        // Spawns in checkpoint 3 for part 4 of level 3
        this.checkpoint_3_spawn = level_3.findObject("object_layer", obj => obj.name === "checkpoint_3");
        this.checkpoint_3 = new checkpoint(this, this.checkpoint_3_spawn.x, this.checkpoint_3_spawn.y - 8, 'checkpoint_flag_down');
        
        //Spawns in closed background door
        this.open_door_spawn = level_3.findObject("object_layer", obj => obj.name === "open_door");
        this.open_door = new door(this, this.open_door_spawn.x, this.open_door_spawn.y - 7, 'open_door');

        // Spawns exit door
        this.closed_door_spawn = level_3.findObject("object_layer", obj => obj.name === "door");
        this.closed_door = new door(this, this.closed_door_spawn.x, this.closed_door_spawn.y - 16, 'locked_door');

        // Spawns in player activated button in the first part of the level
        this.button_1_spawn = level_3.findObject("object_layer", obj => obj.name === "button_1");
        this.button_1 = new small_button(this, this.button_1_spawn.x, this.button_1_spawn.y - 8, 'orange_button_up');

        // Spawns in player activated button in the third part of the level
        this.button_2_spawn = level_3.findObject("object_layer", obj => obj.name === "button_2");
        this.button_2 = new small_button(this, this.button_2_spawn.x + 8, this.button_2_spawn.y - 8, 'orange_button_up');

        // Spawns spikes in the level
        this.spikes = level_3.createFromObjects("object_layer", "spike", {
            key: "tileset",
            frame: 16
        }, this);
        this.physics.world.enable(this.spikes, Phaser.Physics.Arcade.STATIC_BODY);
        
        this.spike_group = this.add.group(this.spikes);
        
        this.spikes.map((spikes) => {
            spikes.body.setSize(10, 8).setOffset(3, 8);
        });

        // Spawns key in spawn location
        this.key_spawn = level_3.findObject("object_layer", obj => obj.name === "key_spawn");
        this.key = new key(this, this.key_spawn.x, this.key_spawn.y);

        // Spawn half_left_wall
        this.half_left_wall = level_3.createFromObjects("object_layer", "half_left_wall", {
            key: "tileset",
            frame: 1
        }, this);
        this.physics.world.enable(this.half_left_wall, Phaser.Physics.Arcade.STATIC_BODY);

        // Adds half_left_wall to a group for hitboxes 
        this.half_left_group = this.add.group(this.half_left_wall);
        this.half_left_wall.map((half_left_wall) => {
            half_left_wall.body.setSize(3, 15).setOffset(1, 1);
        });

        // Spawn half_floor 
        this.half_floor = level_3.createFromObjects("object_layer", "half_floor", {
            key: "tileset",
            frame: 8
        }, this);
        this.physics.world.enable(this.half_floor, Phaser.Physics.Arcade.STATIC_BODY);

        // Add half_floor to a group for hitboxes
        this.half_floor_group = this.add.group(this.half_floor);
        this.half_floor.map((half_floor) => {
            half_floor.body.setSize(16, 8).setOffset(0, 8);
        });

        // Spawns half_block
        this.half_block = level_3.createFromObjects("object_layer", "half_block", {
            key: "tileset",
            frame: 9
        }, this);
        this.physics.world.enable(this.half_block, Phaser.Physics.Arcade.STATIC_BODY);

        // Adds half_blocks to a group for hitboxes
        this.half_block_group = this.add.group(this.half_block);
        this.half_block.map((half_block) => {
            half_block.body.setSize(16, 8).setOffset(0, -1)
        });

        //Spawns a big button for second part of level
        this.big_button_1_spawn = level_3.findObject("object_layer", obj => obj.name === "big_button_spawn");
        this.big_button = new big_button(this, this.big_button_1_spawn.x, this.big_button_1_spawn.y, 'big_button_up');

        //Spawns a big button for the last part of level
        this.big_button_2_spawn = level_3.findObject("object_layer", obj => obj.name === "big_button_spawn_2");
        this.big_button_2 = new big_button(this, this.big_button_2_spawn.x, this.big_button_2_spawn.y, 'big_button_up');

        // Spawns in boxes
        const box_spawn = level_3.findObject("object_layer", obj => obj.name === "box_spawn_1");
        this.box_spawn = box_spawn;
        this.block = this.physics.add.sprite(box_spawn.x, box_spawn.y,'box');
        //this.block.body.setAllowGravity(true);
        this.block.body.immovable = true;

        // Spawns in boxes
        const box_spawn_2 = level_3.findObject("object_layer", obj => obj.name === "box_spawn_2");
        this.box_spawn_2 = box_spawn_2;
        this.block_2 = this.physics.add.sprite(box_spawn_2.x, box_spawn_2.y,'box');
        //this.block_2.body.setAllowGravity(true);
        this.block_2.body.immovable = true;

        // #region Add Player to game world
        const player_spawn = level_3.findObject("object_layer", obj => obj.name === "player_spawn");
        this.player_X = player_spawn.x;
        this.player_Y = player_spawn.y;
        this.player = this.physics.add.sprite(this.player_X, this.player_Y,'player');
        this.player.body.setAllowGravity(true);
        // #endregion

        // setup camera
        this.cameras.main.setBounds(0, 0, level_3.widthInPixels, level_3.heightInPixels);
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
        this.physics.add.collider(this.player, platform_layer);
        this.physics.add.collider(this.block, platform_layer);
        this.physics.add.collider(this.player, this.block);
        this.button_1_collider = this.physics.add.collider(this.player, button_1_wall);
        this.button_2_collider = this.physics.add.collider(this.player, key_wall);
        this.big_button_collider = this.physics.add.collider(this.player, button_2_wall);
        this.physics.add.collider(this.player, this.block_2);
        this.physics.add.collider(this.block_2, platform_layer);
        this.physics.add.collider(this.player, this.half_block);
        this.physics.add.collider(this.player, this.half_floor);
        this.physics.add.collider(this.player, this.half_left_wall);
        
        this.physics.add.collider(this.block, this.big_button, (obj1, obj2) => {
            if(this.breakable_1) {
                this.breakable_1 = false;
                this.sound.play("button_sound", {volume: 1});
                this.big_button.setTexture('big_button_down');
                this.big_button.body.setSize(32,14).setOffset(0, 18);
                button_2_wall.destroy();
                this.big_button_collider.destroy();
            }
            this.block.body.setAllowGravity(false);
                this.moveTween = this.tweens.add({
                    targets: this.block,
                    y: {from: this.block.y, to: this.big_button.y - 14},
                    duration: 200,
                    repeat: 0,
                    yoyo: false,
                });
        });

        this.physics.add.collider(this.block_2, this.big_button_2, (obj1, obj2) => {
            if(this.breakable_2) {
                const spawn_platform = level_3.createStaticLayer("spawn_platform", tileset, 0, 0);
                spawn_platform.setCollisionByProperty({collides: true });
                this.sound.play("button_sound", {volume: 1});
                this.big_button_2.setTexture('big_button_down');
                this.big_button_2.body.setSize(32,14).setOffset(0, 18);
                
                this.spawn_spikes = level_3.createFromObjects("spawn_spikes", "spike", {
                    key: "tileset",
                    frame: 16
                }, this);
                this.spawned_spikes = true;
                this.draw_hit_box = true;
                this.spawn_spike_group = this.add.group(this.spawn_spikes);
                this.physics.world.enable(this.spawn_spikes, Phaser.Physics.Arcade.STATIC_BODY);
                this.physics.add.collider(this.player, spawn_platform);
                this.physics.add.collider(this.player, this.spawn_spike_group, (obj1, obj2) => {
                this.sound.play("die_sound", {volume: 0.3});
                this.checkpoint_check();
                });
                this.breakable_2 = false;
            }
            this.block_2.body.setAllowGravity(false);
                this.moveTween = this.tweens.add({
                    targets: this.block_2,
                    y: {from: this.block_2.y, to: this.big_button_2.y - 14},
                    duration: 200,
                    repeat: 0,
                    yoyo: false,
                });
            //this.block_2.body.setAllowGravity(false);
        });

        this.physics.add.collider(this.player, this.button_1, (obj1, obj2) => {
            if(this.button_1_pressed && this.player.body.touching.down) {
                this.button_1_pressed = false;
                this.sound.play("button_sound", {volume: 0.8});
                this.button_1.setTexture('orange_button_down');
                this.button_1.body.setSize(16, 7).setOffset(0, 8);
                button_1_wall.destroy();
                this.button_1_collider.destroy();
            }
        });
        this.physics.add.collider(this.player, this.button_2, (obj1, obj2) => {
            if(this.button_2_pressed && this.player.body.touching.down) {
                this.button_2_pressed = false;
                this.sound.play("button_sound", {volume: 0.8});
                this.button_2.setTexture('orange_button_down');
                this.button_2.body.setSize(16, 7).setOffset(0, 8);
                key_wall.destroy();
                this.button_2_collider.destroy();
            }
        });
        this.physics.add.collider(this.player, this.big_button);
        this.physics.add.collider(this.player, this.big_button_2);
        this.physics.add.collider(this.player, this.spike_group, (obj1, obj2) => {
            this.sound.play("die_sound", {volume: 0.3});
            this.checkpoint_check();
        });

        // Overlap checkers
        // Grow powerup overlap check
        this.physics.add.overlap(this.player, this.grow_powerup, (obj1, obj2) => {
            obj2.destroy(); // remove grow powerup
            this.grown = true;
            this.shrunk = false;
            this.grow_powerup_exists = false;
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
            this.block_2.body.immovable = false;
        });

        this.physics.add.overlap(this.player, this.grow_powerup_2, (obj1, obj2) => {
            obj2.destroy(); // remove grow powerup
            this.grown = true;
            this.shrunk = false;
            this.grow_powerup_2_exists = false;
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
            this.block_2.body.immovable = false;
        });

        // Shrink powerup overlap check
        this.physics.add.overlap(this.player, this.shrink_powerup, (obj1, obj2) => {
            obj2.destroy(); // remove shrink powerup
            this.shrunk = true;
            this.grown = false;
            this.shrink_powerup_exists = false;
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
            this.block_2.body.immovable = true;
        });

         // Door powerup overlap check
         this.physics.add.overlap(this.player, this.closed_door, (obj1, obj2) => {
            if(this.unlock) {
                this.sound.play("level_complete", {volume: 0.4});
                this.scene.start("end_game_scene");
            }
        });

        // Key overlap check
        this.physics.add.overlap(this.player, this.key, (obj1, obj2) => {
            obj2.destroy(); // remove key
            this.sound.play("key_sound", {volume: 0.4});
            this.closed_door.setTexture('open_door');
            this.unlock = true;
            this.key_exists = false;
        });

        // Chekpoint 1 overlap
        this.checkpoint_1_overlap = this.physics.add.overlap(this.player, this.checkpoint_1, (obj1, obj2) => {
            const checkpoint_1_spawn = level_3.findObject("object_layer", obj => obj.name === "checkpoint_1");
            if(this.checkpoint == 0) {
                this.sound.play("checkpoint_sound", {volume: 0.4});   
            }
            this.checkpoint_1.setTexture('checkpoint_flag_up');
            this.checkpoint = 1;
            this.player_X = checkpoint_1_spawn.x;
            this.player_Y = checkpoint_1_spawn.y;
        });
        // Checkpoint 2 overlap
        this.checkpoint_2_overlap = this.physics.add.overlap(this.player, this.checkpoint_2, (obj1, obj2) => {
            const checkpoint_2_spawn = level_3.findObject("object_layer", obj => obj.name === "checkpoint_2");
            if(this.checkpoint == 1) {
                this.sound.play("checkpoint_sound", {volume: 0.4});   
            }
            this.checkpoint_2.setTexture('checkpoint_flag_up');
            this.checkpoint = 2;
            this.player_X = checkpoint_2_spawn.x;
            this.player_Y = checkpoint_2_spawn.y;
            if(this.checkpoint_overlap_1){
                this.checkpoint_1_overlap.destroy();
                this.checkpoint_overlap_1 = false;
            };
        });
       // Checkpoint 3 overlap
       this.checkpoint_3_overlap = this.physics.add.overlap(this.player, this.checkpoint_3, (obj1, obj2) => {
        const checkpoint_3_spawn = level_3.findObject("object_layer", obj => obj.name === "checkpoint_3");
        if(this.checkpoint == 2) {
            this.sound.play("checkpoint_sound", {volume: 0.4});   
        }
        this.checkpoint_3.setTexture('checkpoint_flag_up');
        this.checkpoint = 3;
        this.player_X = checkpoint_3_spawn.x;
        this.player_Y = checkpoint_3_spawn.y;
        if(this.checkpoint_overlap_2){
            this.checkpoint_2_overlap.destroy();
            this.checkpoint_overlap_2 = false;
        }
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

        // if(Phaser.Input.Keyboard.JustDown(cursors.up)) {
        //     this.player.body.setVelocityY(this.jump_vel);
        //     this.sound.play('jump_sound', {volume: 0.1});
        // }

        // Reset Scale
        if(Phaser.Input.Keyboard.JustDown(key_d)) {
            //console.log(this.grown);
            if(this.shrunk) {
                this.sound.play('return_normal_sound', {volume: 0.1})
                let small_to_normal_tween = this.tweens.add({
                    targets: this.player,
                    scale: {from: 0.5, to: 1},
                    duration: 200,
                    repeat: 0,
                    yoyo: false,
                });
            } else if (this.grown) {
                this.sound.play('return_normal_sound', {volume: 0.1})
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
            this.block_2.body.immovable = true;
        }
        //Collision logic for box
        if(this.player.body.blocking) {
            if(this.grown) {
                //this.block.body.setAccelerationX(-this.ACCELERATION);
            } 
        }

        if(this.spawned_spikes && this.draw_hit_box) {
            this.spawn_spikes.map((spikes) => {
                spikes.body.setSize(10, 8).setOffset(3, 8);
            });
        }
        else {
            this.block.body.setAccelerationX(0);
            this.block.body.setDragX(this.drag);
            this.block_2.body.setAccelerationX(0);
            this.block_2.body.setDragX(this.drag);
        }
        
        // Reset level
        if(Phaser.Input.Keyboard.JustDown(key_r)) {
            this.scene.restart(this.level);
        }

        // Fall through level check
        if(this.player.y >= this.height_of_level) {
            this.sound.play("die_sound", {volume: 0.3});
            this.checkpoint_check();
        }

    }

    checkpoint_check(){
        if(this.checkpoint == 0) {
            //this.scene.restart(this.level);
            this.player.x = this.player_X;
            this.player.y = this.player_Y;
        }
        else if(this.checkpoint == 1) {
            this.player.body.setVelocity(0);
            this.player.x = this.player_X;
            this.player.y = this.player_Y - 10;
            this.block.body.setVelocity(0);
            this.block.x = this.box_spawn.x;
            this.block.y = this.box_spawn.y;
            this.block.body.setAllowGravity(true);
            this.block.body.immovable = true;
            this.player.setScale(1);
            this.grown = false;
            if(!this.grow_powerup_exists) {
                this.grow_powerup = new grow_powerup(this, this.grow_spawn.x, this.grow_spawn.y);
                this.grow_powerup.body.setCircle(5).setOffset(3, 3);
                this.grow_powerup_exists = true;
                this.physics.add.overlap(this.player, this.grow_powerup, (obj1, obj2) => {
                    obj2.destroy(); // remove grow powerup
                    this.grown = true;
                    this.shrunk = false;
                    this.grow_powerup_exists = false;
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
                    this.block_2.body.immovable = false;
                });
            }
        }
        else if(this.checkpoint == 2) {
            this.player.body.setVelocity(0);
            this.player.x = this.player_X + 10;
            this.player.y = this.player_Y - 10;
            this.player.setScale(1);
            this.shrunk = false;
            if(!this.key_exists) { 
                this.key = new key(this, this.key_spawn.x, this.key_spawn.y);
                this.key_exists = true;
                this.physics.add.overlap(this.player, this.key, (obj1, obj2) => {
                    obj2.destroy(); // remove key
                    this.key_exists = false;
                    this.unlock = true;
                });
            }
            if(!this.shrink_powerup_exists) {
                this.shrink_powerup = new shrink_powerup(this, this.shrink_spawn.x, this.shrink_spawn.y);
                this.shrink_powerup.body.setCircle(5).setOffset(3, 3);
                this.shrink_powerup_exists = true;
                this.physics.add.overlap(this.player, this.shrink_powerup, (obj1, obj2) => {
                    obj2.destroy(); // remove shrink powerup
                    this.shrunk = true;
                    this.grown = false;
                    this.shrink_powerup_exists = false;
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
                    this.block_2.body.immovable = true;
                });
            }
        }
        else if(this.checkpoint == 3) {
            this.player.body.setVelocity(0);
            this.player.x = this.player_X;
            this.player.y = this.player_Y - 10;
            this.player.setScale(1);
            this.grown = false;
            this.block_2.x = this.box_spawn_2.x;
            this.block_2.y = this.box_spawn_2.y;
            this.block_2.body.setAllowGravity(true);
            this.block_2.setVelocity(0);
            this.block_2.body.immovable = true;
            if(!this.grow_powerup_2_exists){
                this.grow_powerup_2 = new grow_powerup(this, this.grow_spawn_2.x, this.grow_spawn_2.y);
                this.grow_powerup_2.body.setCircle(5).setOffset(3, 3);
                this.grow_powerup_2_exists = true;
                this.physics.add.overlap(this.player, this.grow_powerup_2, (obj1, obj2) => {
                    obj2.destroy(); // remove grow powerup
                    this.grown = true;
                    this.shrunk = false;
                    this.grow_powerup_2_exists = false;
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
                    this.block_2.body.immovable = false;
                });
            }
        }
    }
}
