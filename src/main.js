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
    type: Phaser.AUTO,
    width: 832,
    height: 576,
    scale: {
        autoCenter: Phaser.Scale.CENTER_BOTH
    },
    scene: [Load, Menu, Play],
    physics: {
        default: 'arcade',
        arcade: {
            debug: true,
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
let keyG, keyS, keyD, keyRIGHT;