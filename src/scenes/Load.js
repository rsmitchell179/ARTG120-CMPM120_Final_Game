class Load extends Phaser.Scene {
    constructor() {
        super("load_scene");
    }

    preload(){
        // Load game images and sprites
        this.load.path = "./assets/sprites/";
        this.load.image('temp_player', 'player.png');
        this.load.image('box', 'box.png');
        // Load tilemap and spritesheet
        this.load.path = "./assets/levels/";
        this.load.spritesheet("tileset", "tileset.png", {
            frameWidth: 16,
            frameHeight: 16
        });
        this.load.tilemapTiledJSON("level_temp", "temp_level_1.json");

        // Load game audio
        this.load.path = "./assets/audio/";
        this.load.audio = ("grow_sound", "grow_powerup.wav");
        this.load.audio = ("jump_sound", "jump.wav");
        this.load.audio = ("level_complete", "level_complete.wav");
        this.load.audio = ("shrink_sound", "shrink_powerup.wav");
    }

    update() {
        this.scene.start("menu_scene");
    }

}