class checkpoint extends Phaser.Physics.Arcade.Sprite {
    constructor(scene, x, y, texture) {
        super(scene, x, y, texture);
        scene.add.existing(this);
        scene.physics.add.existing(this);
        this.body.setAllowGravity(false);
        this.x = x;
        this.y = y;
        this.body.setSize(9, 16).setOffset(7, 0);
    }
    update() {
        super.update();
    }
}