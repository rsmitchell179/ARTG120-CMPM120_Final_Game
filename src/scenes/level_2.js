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

        // End Game Text
        this.add.text(centerX, centerY - 70, 'Congratulations!!', menuConfig).setOrigin(0.5);
        this.add.text(centerX, centerY, 'Press M for menu      \nPress → to play level again', menuConfig).setOrigin(0.5);
        menuConfig.backgroundColor = '#00FF00';
        menuConfig.color = '#000';

        // Define keys
        key_right = this.input.keyboard.addKey(Phaser.Input.Keyboard.KeyCodes.RIGHT);
        key_m = this.input.keyboard.addKey(Phaser.Input.Keyboard.KeyCodes.M);
    }

    update() {
        // Goes back to play scene
        if(Phaser.Input.Keyboard.JustDown(key_right)) {
            this.sound.play('menu_select');
            this.scene.start("play_scene");
        }
        // Goes back to menu scene
        if(Phaser.Input.Keyboard.JustDown(key_m)) {
            this.sound.play('menu_select'); 
            this.scene.start("load_scene");
        }
    }
}