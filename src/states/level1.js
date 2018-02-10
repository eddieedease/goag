class Level1 extends Phaser.State {

  constructor(game, parent) {
    super(game, parent);
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


    this.player = this.game.add.sprite(0, 180, 'playersheet', 'knight_walk_001.png');
    this.player.scale.setTo(1.5, 1.5);
    // animation
    this.player.animations.add('walk', Phaser.Animation.generateFrameNames('knight_walk_', 1, 8, '.png', 3), 10, true, false);
    this.player.animations.play('walk');

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