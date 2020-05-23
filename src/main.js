// Collaborator Names:
// Binaisha Dastoor
// Joshua Jung 
// Ryan Mitchell
// Game Title:  
// Date Completed 
// Creative tilt justifications:  

// Tame the JavaShrek
"use strict";

let config = {
    type: Phaser.CANVAS,
    pixelArt: true,
    width: 528,
    height: 368,
    zoom: 2,
    scale: {
        autoCenter: Phaser.Scale.CENTER_BOTH
    },
    scene: [load, menu, level_1, level_2, end_game],
    physics: {
        default: 'arcade',
        arcade: {
            //debug: true,
            TILE_BIAS: 32,
            gravity: {
                x: 0,
                y: 0
            },
        },
    },
};

// Define Game 
let game = new Phaser.Game(config);

// Define Variables
let cursors;
let centerX = game.config.width/2;
let centerY = game.config.height/2; 
let text_space = 64;
let key_g, key_s, key_d, key_r, key_m ,key_right;