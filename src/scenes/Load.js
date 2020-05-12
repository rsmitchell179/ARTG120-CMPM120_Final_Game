class Load extends Phaser.Scene {
    constructor() {
        super("loadScene");
    }

    preload(){
        // Load game assets
        this.load.path = "./assets/sprites/";
        this.load.image('tempPlayer', 'player.png');
        this.load.image('tempBlock', 'block.png');
    }

    update() {
        this.scene.start("menuScene");
    }

}