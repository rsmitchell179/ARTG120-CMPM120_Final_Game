class credits extends Phaser.Scene {
    constructor() {
        super("credits_scene");
    }

    create() {
        go_menu = false;
        
        // Adds text to the screen
        this.add.bitmapText(center_x, center_y - 301, 'font', "Credits", 98).setOrigin(0.5);
        this.add.bitmapText(center_x, center_y, 'smaller_font', 'Use -> to start', 26).setOrigin(0.5);
        this.exit_box = this.add.rectangle(game.config.width - 29, 19, 50, 25, 0x000000);
        this.add.bitmapText(game.config.width - 30, 21, 'smaller_font', 'BACK', 26).setOrigin(0.5);
        
        input = this.input;
        // Mouse click
        mouse = this.input.mousePointer;
        this.exit_box.setInteractive({
            useHandCursor: true,
        });
        this.exit_box.on('pointerdown', this.go_menu);
    }

    update() {
        // Takes you back to menu
        if(go_menu) {
            this.sound.play('menu_select');
            this.scene.start("menu_scene");
        }
    }

    go_menu() {
        go_menu = true;
    }
}
