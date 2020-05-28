class shrink_powerup extends Phaser.Physics.Arcade.Sprite {
    constructor(scene, x, y) {
        super(scene, x, y, 'shrink_power');
        scene.add.existing(this);
        scene.physics.add.existing(this);
        this.body.setCircle(5).setOffset(3, 3);
        this.body.setAllowGravity(false);
        this.x = x;
        this.y = y; 
    }
    update() {
        super.update();
    }
}