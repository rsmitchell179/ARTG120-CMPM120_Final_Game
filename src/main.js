// Collaborator Names:
// Binaisha Dastoor
// Joshua Jung 
// Ryan Mitchell
// Game Title: Cubic Escape
// Date Completed: 
// Creative tilt justifications:  

// Tame the JavaShrek
"use strict";

let config = {
    parent: 'myGame',
    type: Phaser.CANVAS,
    render: {
        pixelArt: true,
    },
    width: 1056,
    height: 736,
    //zoom: 2,
    scale: {
        autoCenter: Phaser.Scale.CENTER_BOTH
    },
    scene: [load, menu, credits, level_1, level_2, level_3, end_game],
    physics: {
        default: 'arcade',
        arcade: {
            //debug: true,
            TILE_BIAS: 64,
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
let center_x = game.config.width/2;
let center_y = game.config.height/2; 
let text_space = 64;
let key_g, key_s, key_d, key_r, key_m ,key_right;
// Mouse 
var input, mouse;
var start, credit, go_menu;