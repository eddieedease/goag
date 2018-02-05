
class Level1 extends Phaser.State {

  constructor(game, parent) {
    super(game,parent);
  }

  preload() {

  }

  create() {

    // loading of the tiles
    this.map = this.game.add.tilemap('map');
    this.map.addTilesetImage('tileset', 'tiles');

    this.layerbackground = this.map.createLayer('background');
    this.platformlayer = this.map.createLayer('platforms');
    this.above = this.map.createLayer('above');


    // this.layerbackground.renderSettings.enableScrollDelta = true;
    // this.layerbackground.setScale(1.6);

  }

  update() {

  }

  paused() {

  }

  render() {

  }

  shutdown() {

  }

}

export default Level1;
