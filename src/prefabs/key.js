class key extends Phaser.Physics.Arcade.Sprite {
    constructor(scene, x, y) {
        super(scene, x, y, 'key');
        scene.add.existing(this);
        scene.physics.add.existing(this);
        this.body.setCircle(3).setOffset(3, 5); 
        this.body.setAllowGravity(false);
        this.x = x;
        this.y = y; 
    }
    update() {
        super.update();
    }
}