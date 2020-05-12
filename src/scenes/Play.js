class Play extends Phaser.Scene {
    constructor() {
        super("playScene");
    }

    create() {
        // Variables and Settings 
        this.MAX_Y_VELOCITY = 760;
        this.ACCELERATION = 500;
        this.DRAG = 7000;
        this.JUMP_VEL = -700;
        this.physics.world.gravity.y = 2000;
        this.shrunk = false;
        this.grown = false;
        // #region Add Player to game world
        this.player = this.physics.add.sprite(centerX, centerY,'tempPlayer');
        this.player.setCollideWorldBounds(true);
        this.player.body.setAllowGravity(true);
        // #endregion

        this.block = this.physics.add.sprite(centerX + 120, centerY,'tempBlock');
        this.block.setCollideWorldBounds(true);
        this.block.body.setAllowGravity(true);
        this.block.body.immovable = true;

        this.block2 = this.physics.add.sprite(centerX - 120, centerY,'tempBlock');
        this.block2.setCollideWorldBounds(true);
        this.block2.body.setAllowGravity(true);
        this.block2.body.immovable = true;

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
    }

    update() {
        // player movement
        if(cursors.left.isDown) {
            this.player.body.setVelocityX(-this.ACCELERATION);
            this.player.setFlip(true, false);
        } else if(cursors.right.isDown) {
            this.player.body.setVelocityX(this.ACCELERATION);
            this.player.resetFlip();
        } else {
            // set acceleration to 0 so DRAG will take over
            this.player.body.setVelocityX(0);
        }

        if(Phaser.Input.Keyboard.JustDown(cursors.up)) {
            this.player.body.setVelocityY(this.JUMP_VEL)
        }

        if(Phaser.Input.Keyboard.JustDown(keyS) && !this.shrunk) {
            this.player.setScale(0.5);
            this.shrunk = true;
        }

        if(Phaser.Input.Keyboard.JustDown(keyG)) {
            this.player.setScale(2);
            this.grown = true;
            this.block.body.immovable = false;
            this.block2.body.immovable = false;
            //console.log(this.grown);
        }
        
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
            this.block.body.setDragX(this.DRAG);
            this.block2.body.setAccelerationX(0);
            this.block2.body.setDragX(this.DRAG);
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

    blockCollisionCheck() {

    }

}