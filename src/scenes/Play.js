class Play extends Phaser.Scene {
    constructor() {
        super("playScene");
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


        // Load Map
        // Create the level
        const temp_level = this.add.tilemap("level_temp");
        // Add the tileset to the map
        const tileset = temp_level.addTilesetImage("tileset");
        // Create tilemap layers
        const background_layer = temp_level.createStaticLayer("background_layer", tileset, 0 ,0);
        const platform_layer = temp_level.createStaticLayer("platform_layer", tileset, 0 ,0);

        // Set map collisions
        platform_layer.setCollisionByProperty({collides: true });

        
        // Spawns Tilemap Objects
        this.shrink_powerup = temp_level.createFromObjects("object_layer", "shrink_powerup", {
            key: "tileset",
            frame: 7
        }, this);
        this.physics.world.enable(this.shrink_powerup, Phaser.Physics.Arcade.STATIC_BODY);

        this.shrink_powerup.map((shrink_powerup) => {
            shrink_powerup.body.setCircle(5).setOffset(3, 3); 
        });

        this.shrink_group = this.add.group(this.shrink_powerup);

        this.grow_powerup = temp_level.createFromObjects("object_layer", "grow_powerup", {
            key: "tileset",
            frame: 6
        }, this);
        this.physics.world.enable(this.grow_powerup, Phaser.Physics.Arcade.STATIC_BODY);
        
        this.grow_powerup.map((grow_power_up) => {
            grow_power_up.body.setCircle(5).setOffset(3, 3); 
        });

        this.grow_group = this.add.group(this.grow_powerup);

        this.physics.world.bounds.setTo(0, 0, temp_level.widthInPixels, temp_level.heightInPixels);

        


        this.door = temp_level.createFromObjects("object_layer", "door", {
            key: "tileset",
            frame: 3
        }, this);
        this.physics.world.enable(this.door, Phaser.Physics.Arcade.STATIC_BODY);

        this.door_group = this.add.group(this.door);
        

        const box_spawn1 = temp_level.findObject("object_layer", obj => obj.name === "box_spawn1");
        this.block = this.physics.add.sprite(box_spawn1.x, box_spawn1.y,'box');
        this.block.body.setAllowGravity(true);
        this.block.body.immovable = true;
        


        const box_spawn2 = temp_level.findObject("object_layer", obj => obj.name === "box_spawn2");
        this.block2 = this.physics.add.sprite(box_spawn2.x, box_spawn2.y,'box');
        this.block2.body.setAllowGravity(true);
        this.block2.body.immovable = true;



        // #region Add Player to game world
        const player_spawn = temp_level.findObject("object_layer", obj => obj.name === "player_spawn");
        this.player = this.physics.add.sprite(player_spawn.x, player_spawn.y,'temp_player');
        this.player.setCollideWorldBounds(true);
        this.player.body.setAllowGravity(true);
        // #endregion

        // set up input
        cursors = this.input.keyboard.createCursorKeys();
        // S for Shrink (TEMP)
        keyS = this.input.keyboard.addKey(Phaser.Input.Keyboard.KeyCodes.S);
        // G for Grow (TEMP)
        keyG = this.input.keyboard.addKey(Phaser.Input.Keyboard.KeyCodes.G);
        // D for debug check
        keyD = this.input.keyboard.addKey(Phaser.Input.Keyboard.KeyCodes.D);

        // Physics collider
        this.physics.add.collider(this.player, this.block);
        this.physics.add.collider(this.player, this.block2);
        this.physics.add.collider(this.block, this.block2);
        this.physics.add.collider(this.player, platform_layer);
        this.physics.add.collider(this.block, platform_layer);
        this.physics.add.collider(this.block2, platform_layer);

        this.physics.add.overlap(this.player, this.grow_group, (obj1, obj2) => {
            obj2.destroy(); // remove coin on overlap
            this.player.setScale(2);
            this.grown = true;
            this.block.body.immovable = false;
            this.block2.body.immovable = false;
        });

        this.physics.add.overlap(this.player, this.shrink_group, (obj1, obj2) => {
            obj2.destroy(); // remove coin on overlap
            this.player.setScale(0.5);
            this.shrunk = true;
            this.block.body.immovable = true;
            this.block2.body.immovable = true;
        });

        this.physics.add.overlap(this.player, this.door_group, (obj1, obj2) => {
            this.scene.start("level_2_scene");
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

        if((this.player.body.blocked.down || this.player.body.touching.down) && Phaser.Input.Keyboard.JustDown(cursors.up) && !this.grown) {
            this.player.body.setVelocityY(this.jump_vel)
        }

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
        
        if(Phaser.Input.Keyboard.JustDown(keyD)) {
            //console.log(this.grown);
            this.player.setScale(1);
            this.grown = false;
            this.shrunk = false;
            this.block.body.immovable = true;
            this.block2.body.immovable = true;
        }
        // Collision logic
        if(this.player.body.touching.left) {
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

        // if(this.player.body.touching.right) {
        //     if(this.grown) {
        //         this.block.body.setAccelerationX(this.ACCELERATION);
        //     } 
        // }
        // else {
        //     this.block.body.setAccelerationX(0);
        //     this.block.body.setDrag(this.DRAG);
        // }

        // player jump
        // note that we need body.blocked rather than body.touching b/c the former applies to tilemap tiles and the latter to the "ground"
        // if(!this.player.body.blocked.down) {
        //     //this.player.anims.play('jump', true);
        // }
        // if(this.player.body.blocked.down && Phaser.Input.Keyboard.JustDown(cursors.up)) {
        //     this.player.body.setVelocityY(this.JUMP_VELOCITY);
        // }
    }

}