let preload = new Phaser.Scene('preload');
let menu = new Phaser.Scene('menu');
let level1 = new Phaser.Scene('level1');
let level2 = new Phaser.Scene('level2');
let worldX = 600;
let worldY = 750;


let config = {
    type: Phaser.AUTO,
    parent: 'game',
    width: 600,
    height: 750,
    pixelArt: true,
    scale: {
    // Ensure the canvas is resized to fit the parent div's dimensions
    //mode: Phaser.Scale.RESIZE,
    mode: Phaser.Scale.HEIGHT_CONTROLS_WIDTH
    // Center the game canvas both horizontally and vertically within the parent
    //autoCenter: Phaser.Scale.CENTER_BOTH
  },
    scene: [ preload, menu, level1, level2 ],
      physics: {
    default: 'arcade',
    arcade: {
      gravity: false
    },
  }
    
};

let game = new Phaser.Game(config);
