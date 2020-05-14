class Load extends Phaser.Scene {
    constructor() {
        super("loadScene");
    }

    preload(){
        // Load game assets
        this.load.path = "./assets/sprites/";
        this.load.image('temp_player', 'player.png');
        this.load.image('box', 'box.png');

        this.load.path = "./assets/levels/";
        this.load.spritesheet("tileset", "tileset.png", {
            frameWidth: 16,
            frameHeight: 16
        });
        this.load.tilemapTiledJSON("level_temp", "temp_level_1.json");
    }

    update() {
        this.scene.start("menuScene");
    }

}