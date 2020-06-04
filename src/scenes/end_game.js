class end_game extends Phaser.Scene {
    constructor() {
        super("end_game_scene");
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
        this.add.bitmapText(center_x, center_y - 70, 'font', 'THE END!!', 100).setOrigin(0.5);
        this.add.bitmapText(center_x, center_y, 'smaller_font', '     Press M for menu      \n   Press R to play again', 30).setOrigin(0.5);

        // Define keys
        key_m = this.input.keyboard.addKey(Phaser.Input.Keyboard.KeyCodes.M);
        key_r = this.input.keyboard.addKey(Phaser.Input.Keyboard.KeyCodes.R);
    }

    update() {
        // Goes back to play scene
        if(Phaser.Input.Keyboard.JustDown(key_r)) {
            this.sound.play('menu_select');
            this.scene.start("level_1_scene");
        }
        // Goes back to menu scene
        if(Phaser.Input.Keyboard.JustDown(key_m)) {
            this.sound.play('menu_select'); 
            this.scene.start("load_scene");
        }
    }
}