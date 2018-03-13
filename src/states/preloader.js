class Preloader extends Phaser.State {

  constructor() {
    super();
    this.asset = null;
    this.ready = false;
  }

  preload() {
    // setup loading bar
    this.asset = this.add.sprite(this.game.width * 0.5 - 110, this.game.height * 0.5 - 10, 'preloader');
    this.load.setPreloadSprite(this.asset);

    // setup loading and its events
    this.load.onLoadComplete.addOnce(this.onLoadComplete, this);
    this.loadResources();
  }

  loadResources() {

    // example imports for game.js
    this.game.load.image('background','assets/bg_wood.png');
    this.game.load.image('introbg','assets/introbg.png');
    this.game.load.image('crosshairs', 'assets/crosshair_red_small.png');
    this.game.load.image('text_go', 'assets/text_go.png');
    this.game.load.image('text_ready', 'assets/text_ready.png');

    this.game.load.spritesheet('target', 'assets/target.png',128.66,128);

    this.game.load.audio('gunshot','assets/gunshot.wav');
    this.game.load.audio('ding','assets/ding.wav');

    // OWN tiledmap and atlas
    this.game.load.tilemap('map', 'assets/tiledata/level1.json', null, Phaser.Tilemap.TILED_JSON);
    this.game.load.image('tiles', 'assets/tiledata/tileset.png');

    // character sheets
    this.game.load.atlasJSONArray('playersheet', 'assets/sheets/player.png', 'assets/sheets/player.json');
    this.game.load.atlasJSONArray('wizardsheet', 'assets/sheets/wizard.png', 'assets/sheets/wizard.json');


  }

  onLoadComplete() {
    this.game.state.start('menu');
  }
}

export default Preloader;
