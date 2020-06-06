class end_game extends Phaser.Scene {
    constructor() {
        super("end_game_scene");
    }

    create() {
        // Set endless variable to false
        endless = false;

        // Add background image 
        this.background = this.add.image(0, 0, 'end_game_background').setOrigin(0,0);

        // End Game Text
        this.add.bitmapText(center_x, center_y - 150, 'real_font', '         Congrats!!\nYou Became Human and Escaped\n        or did you?', 56).setOrigin(0.5);
        this.add.bitmapText(center_x, center_y, 'smaller_font', '     Press M for menu      \n   Press R to play again', 30).setOrigin(0.5);

        this.human = this.physics.add.sprite(center_x + 160, center_y + 183, 'human_atlas', 'Run1');
        this.human.body.setSize(44, 95);
        
        this.human.setInteractive({
            useHandCursor: true,
        });
        this.human.on('pointerdown', this.start_endless_runner);

        // Run Animation
        this.anims.create({ 
            key: 'Run', 
            frames: this.anims.generateFrameNames('human_atlas', {      
                prefix: 'Run',
                start: 1,
                end: 10,
                suffix: '', 
            }), 
            frameRate: 12,
            repeat: -1 
        });       

        // Define keys
        key_m = this.input.keyboard.addKey(Phaser.Input.Keyboard.KeyCodes.M);
        key_r = this.input.keyboard.addKey(Phaser.Input.Keyboard.KeyCodes.R);
    }

    update() {
        // Run animation for human
        this.human.anims.play('Run', true);

        if(endless) {
            window.open("https://rsmitchell179.github.io/Bullet_Time/");
            endless = false;
        }

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

    start_endless_runner() {
        endless = true;
    }
}