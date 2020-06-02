class small_button extends Phaser.Physics.Arcade.Sprite {
    constructor(scene, x, y, texture) {
        super(scene, x, y, texture);
        scene.add.existing(this);
        scene.physics.add.existing(this);
        this.body.setAllowGravity(false);
        this.body.immovable = true;
        this.x = x;
        this.y = y;
        this.body.setSize(16, 10).setOffset(0, 6);
    }
    update() {
        super.update();
    }
}