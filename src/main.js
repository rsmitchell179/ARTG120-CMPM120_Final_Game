// Collaborator Names:
// Binaisha Dastoor
// Joshua Jung 
// Ryan Mitchell
// Game Title: Cubic Escape
// Date Completed: 6/7/20
// Creative tilt justifications: All of the levels are based around triggered events. Certain parts of the level will open up or be destroyed
//                               depending on which buttons they hit. The player can also only interact with certain objects depending on which
//                               powerup they have active. We also fixed some visial bugs(Josh: The box physics were a pain to work with.)(Ryan: Box go through my button BUT NOT ANYMORE HAHA)
//                               (Josh: We used a tween to move the box down with the button while deactivateing gravity so it wouldn't go through the button)(Ryan: We basically fixed it with hacks ;) ). 
//                               There is also a checkpoint system in level 3 that saves the players spawn location
//                               depending on how far into the level they are. All of the art assets that you see were made by Binaisha and each
//                               level was designed in tiled using input from each group member. Josh and Ryan worked together to code the game using live share extension for visual studio code

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
    // Broke game and made text blurry (*Angry Face*)
    // zoom: 2,
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