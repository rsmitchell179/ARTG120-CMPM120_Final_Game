class level_2 extends Phaser.Scene {
    constructor() {
        super("level_2_scene");
    }

    create() {
        // Menu display 
        let menuConfig = {
            fontFamily: 'Courier',
            fontSize: '28px',
            color: '#FFFFFF',
            align: 'right',
            padding: {
                top: 5, 
                bottom: 5,
            },
            fixedWidth: 0
        }

        this.add.text(centerX, centerY - 70, 'Congratulations!!', menuConfig).setOrigin(0.5);
        this.add.text(centerX, centerY, 'Press M for menu      \nPress → to play level again', menuConfig).setOrigin(0.5);
        menuConfig.backgroundColor = '#00FF00';
        menuConfig.color = '#000';

        // Define keys
        key_right = this.input.keyboard.addKey(Phaser.Input.Keyboard.KeyCodes.RIGHT);
        key_m = this.input.keyboard.addKey(Phaser.Input.Keyboard.KeyCodes.M);
    }

    update() {
        if(Phaser.Input.Keyboard.JustDown(key_right)) {
            this.scene.start("play_scene");
        }
        if(Phaser.Input.Keyboard.JustDown(key_m)) { 
            this.scene.start("menu_scene");
        }
    }
}