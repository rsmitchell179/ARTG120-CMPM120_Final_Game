class menu extends Phaser.Scene {
    constructor() {
        super("menu_scene");
    }

    create() {
        // Create clickable boxes for onclick events
        this.start_box = this.add.rectangle(center_x - 129, center_y + 50, 72, 34, 0x000000, {isStroke: true, strokeThickness: 2, strokeColor: 0xFFFFFF});
        this.credits_box = this.add.rectangle(center_x + 129, center_y + 50, 88, 34, 0x000000);
        
        // Add background image 
        this.background = this.add.image(0, 0, 'menu_background').setOrigin(0,0);

        // Variables for checking if start or credits is pushed 
        start = false;
        credit = false;

        // Adds text to the screen
        this.add.bitmapText(center_x, center_y - text_space, 'font', "Cubic Escape", 100).setOrigin(0.5);
        this.physics.add.existing(this.start_box);
        this.add.bitmapText(center_x - 130, center_y + 50, 'smaller_font', 'Start', 30).setOrigin(0.5);
        this.add.bitmapText(center_x + 127, center_y + 50, 'smaller_font', 'Credits', 30).setOrigin(0.5);

        // Define keys
        key_right = this.input.keyboard.addKey(Phaser.Input.Keyboard.KeyCodes.RIGHT);

        // Mouse position
        input = this.input;
        // Mouse click
        mouse = this.input.mousePointer;
        this.start_box.setInteractive({
            useHandCursor: true,
        });
        this.start_box.on('pointerdown', this.start_game);

        this.credits_box.setInteractive({
            useHandCursor: true,
        });
        this.credits_box.on('pointerdown', this.credit_click);
    }

    update() {
        if(start) {
            this.sound.play('menu_select');
            this.scene.start("end_game_scene");
        }
        if(credit) {
            this.sound.play('menu_select');
            this.scene.start("credits_scene");
        }
    }

    start_game() {
        start = true;
    }

    credit_click() {
        credit = true;
    }
}
