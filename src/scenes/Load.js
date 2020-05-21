class load extends Phaser.Scene {
    constructor() {
        super("load_scene");
    }

    preload(){
        // Load game images and sprites
        this.load.path = "./assets/sprites/";
        this.load.image('temp_player', 'player.png');
        this.load.image('box', 'box.png');
        this.load.image('big_button', 'big_boy_button.png');
        // Load tilemap and spritesheet
        this.load.path = "./assets/levels/";
        this.load.spritesheet("tileset", "tileset.png", {
            frameWidth: 16,
            frameHeight: 16
        });
        this.load.tilemapTiledJSON("level_temp", "temp_level_1.json");
        this.load.tilemapTiledJSON("level_2", "level_2.json");

        // Load game audio
        this.load.path = "./assets/audio/";
        this.load.audio("grow_sound", "GrowPowerup.wav");
        this.load.audio("jump_sound", "Jump.wav");
        this.load.audio("level_complete", "LevelComplete.wav");
        this.load.audio("shrink_sound", "ShrinkPowerup.wav");
        this.load.audio("menu_select", "Menu_Select.wav");
    }

    update() {
        this.scene.start('menu_scene');
    }

}