class menu extends Phaser.Scene {
    constructor() {
        super("menu_scene");
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
        // Adds text to the screen
        this.add.text(centerX, centerY - text_space, 'Cubic Escape', menuConfig).setOrigin(0.5);
        this.add.text(centerX, centerY, 'Use → to start', menuConfig).setOrigin(0.5);
        menuConfig.backgroundColor = '#00FF00';
        menuConfig.color = '#000';

        // Define keys
        key_right = this.input.keyboard.addKey(Phaser.Input.Keyboard.KeyCodes.RIGHT);
    }

    update() {
        // Takes you to the first level
        if(Phaser.Input.Keyboard.JustDown(key_right)) {
            this.sound.play('menu_select');
            this.scene.start("level_1_scene");
        }
    }
}
