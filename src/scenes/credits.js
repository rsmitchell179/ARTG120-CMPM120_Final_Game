class credits extends Phaser.Scene {
    constructor() {
        super("credits_scene");
    }

    create() {
        go_menu = false;
        
        // Adds text to the screen
        this.add.bitmapText(center_x, center_y - 301, 'font', "Credits", 98).setOrigin(0.5);
        // -------------------------------------------DEVELOPERS -----------------------------------------------------------
        this.add.bitmapText(center_x, center_y - 220, 'smaller_font', 'Developers', 37).setOrigin(0.5);
        this.add.bitmapText(center_x, center_y - 170, 'smaller_font', 'Joshua Jung - Programmer/Level Design', 29).setOrigin(0.5);
        this.add.bitmapText(center_x, center_y - 130, 'smaller_font', 'Binaisha Dastoor - Artist/Sound Design', 29).setOrigin(0.5);
        this.add.bitmapText(center_x, center_y - 90, 'smaller_font', 'Ryan Mitchell - Programmer/Level Design', 29).setOrigin(0.5);
        // --------------------------------------ADDITIONAL ASSETS CREDIT---------------------------------------------------
        this.add.bitmapText(center_x, center_y - 40, 'smaller_font', 'Additional Assets', 37).setOrigin(0.5);
        this.add.bitmapText(center_x, center_y + 10, 'smaller_font', 'Font - ShyFoundry Fonts from 1001fonts.com', 30).setOrigin(0.5);
        this.add.bitmapText(center_x, center_y + 50, 'smaller_font', 'Level Complete Sound - FoolBoyMedia from freesound.org', 30).setOrigin(0.5);
        this.add.bitmapText(center_x, center_y + 90, 'smaller_font', 'Key pickup sound - plasterbrain from freesound.org', 30).setOrigin(0.5);
        this.add.bitmapText(center_x, center_y + 130, 'smaller_font', 'Button sound - Coral_Island_Studios from freesound.org', 30).setOrigin(0.5);
        this.add.bitmapText(center_x, center_y + 170, 'smaller_font', 'Checkpoint sound - MattLeschuck from freesound.org', 30).setOrigin(0.5);
        // ---------------------------------Special Thanks to Playtesters (by Request)-------------------------------------
        this.add.bitmapText(center_x, center_y + 220, 'smaller_font', 'And a special shoutout to these lovely playtesters', 38).setOrigin(0.5);
        this.add.bitmapText(center_x, center_y + 270, 'smaller_font', 'John Anthony, Tommy Robbins, Connor Biondi, Ben Roisen, Maheep Luthra', 30).setOrigin(0.5);
        
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
