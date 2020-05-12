class Menu extends Phaser.Scene {
    constructor() {
        super("menuScene");
    }

    create() {
        // Menu display 
        let menuConfig = {
            fontFamily: 'Courier',
            fontSize: '28px',
            backgroundColor: '#F3B141',
            color: '#843605',
            align: 'right',
            padding: {
                top: 5, 
                bottom: 5,
            },
            fixedWidth: 0
        }

        // Show menu text
        let centerX = game.config.width/2;
        let centerY = game.config.height/2;
        let textSpace = 64;

        this.add.text(centerX, centerY - textSpace, 'Prototype', menuConfig).setOrigin(0.5);
        this.add.text(centerX, centerY, 'Use → to start', menuConfig).setOrigin(0.5);
        menuConfig.backgroundColor = '#00FF00';
        menuConfig.color = '#000';

        // Define keys
        keyRIGHT = this.input.keyboard.addKey(Phaser.Input.Keyboard.KeyCodes.RIGHT);
    }

    update() {
        if(Phaser.Input.Keyboard.JustDown(keyRIGHT)) {
            this.scene.start("playScene");
        }
    }
}