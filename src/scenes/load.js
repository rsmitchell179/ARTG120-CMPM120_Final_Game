class load extends Phaser.Scene {
    constructor() {
        super("load_scene");
    }

    preload() {
        // Load game images and sprites
        this.load.path = "./assets/sprites/";
        this.load.image('player', 'player.png');
        this.load.image('box', 'box.png');
        this.load.image('open_door', 'open_door.png');
        this.load.image('locked_door', 'closed_door.png');
        this.load.image('big_button_up', 'big_boy_button_up.png');
        this.load.image('big_button_down', 'big_boy_button_down.png');
        this.load.image('grow_power', 'grow.png');
        this.load.image('shrink_power', 'shrink.png');
        this.load.image('key', 'key.png');
        this.load.image('checkpoint_flag_up', 'active_checkpoint.png');
        this.load.image('checkpoint_flag_down', 'inactive_checkpoint.png');
        this.load.image('orange_button_up', 'orange_button_up.png');
        this.load.image('player_death_particle', 'player_death_particle.png');
        this.load.image('orange_button_down', 'orange_button_down.png');
        this.load.image('background_level_1', 'background_level_1.png');
        this.load.image('background_level_2', 'background_level_2.png');
        this.load.image('background_level_3', 'background_level_3.png');
        
        // Load tilemap and spritesheet
        this.load.path = "./assets/levels/";
        this.load.spritesheet("tileset", "tileset.png", {
            frameWidth: 16,
            frameHeight: 16
        });
        this.load.tilemapTiledJSON("level_1", "level_1.json");
        this.load.tilemapTiledJSON("level_2", "level_2.json");
        this.load.tilemapTiledJSON("level_3", "level_3.json");

        // Load game audio
        this.load.path = "./assets/audio/";
        this.load.audio("grow_sound", "GrowPowerup.wav");
        this.load.audio("jump_sound", "Jump.wav");
        this.load.audio("level_complete", "LevelComplete.mp3");
        this.load.audio("shrink_sound", "ShrinkPowerup.wav");
        this.load.audio("menu_select", "Menu_Select.wav");
        this.load.audio("button_sound", "button.mp3")
        this.load.audio("checkpoint_sound", "checkpoint.wav");
        this.load.audio("return_normal_sound", "returnNormal.wav");
        this.load.audio("key_sound", "key.mp3");
        this.load.audio("die_sound", "Die_Sound.mp3");

        // Load font 
        // Font made by ShyFoundry Fonts from 1001fonts.com
        this.load.path = "./assets/font/";
        this.load.bitmapFont('font', 'font.png', 'font.fnt');
        this.load.bitmapFont('real_font', 'real_font.png', 'real_font.fnt');
        this.load.bitmapFont('smaller_font', 'smaller_font.png', 'smaller_font.fnt');
    }

    update() {
        this.scene.start('menu_scene');
    }

}
