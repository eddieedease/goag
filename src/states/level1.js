class Level1 extends Phaser.State {

  constructor(game, parent) {
    super(game, parent);
  }

  preload() {

  }

  create() {

    // enable arcade Physics
    this.game.physics.startSystem(Phaser.Physics.ARCADE);

    // loading of the tiles
    this.map = this.game.add.tilemap('map');
    this.map.addTilesetImage('tileset', 'tiles');
    

    this.layerbackground = this.map.createLayer('background');
    this.platformlayer = this.map.createLayer('platforms');
    this.collisionlayer = this.map.createLayer('collisions');
    this.collisionlayer.visible = false;
    this.above = this.map.createLayer('above');

    // collision
    this.map.setCollision(85, true, this.collisionlayer);

    this.player = this.game.add.sprite(300, 180, 'playersheet', 'knight_walk_001.png');
    this.player.scale.setTo(1.5, 1.5);
    
    // animation
    this.player.animations.add('walk', Phaser.Animation.generateFrameNames('knight_walk_', 1, 8, '.png', 3), 10, true, false);
    this.player.animations.play('walk');

    // this.layerbackground.renderSettings.enableScrollDelta = true;
    // this.layerbackground.setScale(1.6);
    this.game.physics.enable(this.player);
    this.player.body.setSize(15, 18, 30, 32);

    this.game.physics.arcade.gravity.y = 600;

    this.player.body.bounce.y = 0.1;
    this.player.body.linearDamping = 1;
    
    //TODO think of below
    //this.player.body.collideWorldBounds = true;

    // game.camera.follow(p);

    this.cursorKeys = this.game.input.keyboard.createCursorKeys();

  }

  update() {
    this.game.physics.arcade.collide(this.player, this.collisionlayer);

    this.player.body.velocity.x = 0;

    if (this.cursorKeys.up.isDown)
    {
        if (this.player.body.onFloor())
        {
          this.player.body.velocity.y = -400;
        }
    }

    if (this.cursorKeys.left.isDown)
    {
      this.player.body.velocity.x = -250;
    }
    else if (this.cursorKeys.right.isDown)
    {
      this.player.body.velocity.x = 250;
    }

  }

  paused() {

  }

  render() {
     //this.game.debug.body(this.player);
    // this.game.debug.bodyInfo(this.player, 32, 20);
  }

  shutdown() {

  }

}

export default Level1;