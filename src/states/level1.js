class Level1 extends Phaser.State {

  constructor(game, parent) {
    super(game, parent);
  }

  preload() {

  }

  create() {

    // testVars
    this.enemyalive = true;

    // enable arcade Physics
    this.game.physics.startSystem(Phaser.Physics.ARCADE);
    // set gravity
    this.game.physics.arcade.gravity.y = 600;

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
    this.player.anchor.setTo(0.5, 0.5);

    // animation sets
    this.player.animations.add('walk', Phaser.Animation.generateFrameNames('knight_walk_', 1, 8, '.png', 3), 10, true, false);
    this.player.animations.add('run', Phaser.Animation.generateFrameNames('knight_run_', 1, 8, '.png', 3), 10, true, false);
    this.player.animations.add('jump', Phaser.Animation.generateFrameNames('knight_jump_', 1, 4, '.png', 3), 10, false, false);
    this.player.animations.add('attack', Phaser.Animation.generateFrameNames('knight_attack_', 1, 3, '.png', 3), 10, true, false);
    this.player.animations.add('die', Phaser.Animation.generateFrameNames('knight_die_', 1, 5, '.png', 3), 10, true, false);
    this.player.animations.add('hit', Phaser.Animation.generateFrameNames('knight_hit_', 1, 2, '.png', 3), 10, false, false);
    this.player.animations.add('crouch', Phaser.Animation.generateFrameNames('knight_crouch_', 1, 2, '.png', 3), 10, false, false);
    this.player.animations.add('standing', [0], 20, true);

    this.facingp1 = 'right';
    // this.layerbackground.renderSettings.enableScrollDelta = true;
    // this.layerbackground.setScale(1.6);
    this.game.physics.enable(this.player);
    this.player.body.setSize(15, 18, 30, 32);
    this.player.body.bounce.y = 0.1;
    this.player.body.linearDamping = 1;
    // TODO: think of below
    //this.player.body.collideWorldBounds = true;
    // game.camera.follow(p);
    this.cursorKeys = this.game.input.keyboard.createCursorKeys();


    // ENEMY ENEMY
    // AI
    if (this.enemyalive === true) {
      this.enemy = this.game.add.sprite(900, 180, 'wizardsheet', 'wizard_2_walk_001.png');
      this.enemy.scale.setTo(1.5, 1.5);
      this.enemy.anchor.setTo(0.5, 0.5);

      // animation sets
      this.enemy.animations.add('walk', Phaser.Animation.generateFrameNames('wizard_2_walk_', 1, 8, '.png', 3), 10, true, false);
      this.enemy.animations.add('run', Phaser.Animation.generateFrameNames('wizard_2_run_', 1, 8, '.png', 3), 10, true, false);
      this.enemy.animations.add('jump', Phaser.Animation.generateFrameNames('wizard_2_jump_', 1, 4, '.png', 3), 10, false, false);
      this.enemy.animations.add('attack', Phaser.Animation.generateFrameNames('wizard_2_attack-a_', 1, 4, '.png', 3), 10, true, false);
      this.enemy.animations.add('die', Phaser.Animation.generateFrameNames('wizard_2_die_', 1, 5, '.png', 3), 10, true, false);
      this.enemy.animations.add('hit', Phaser.Animation.generateFrameNames('wizard_2_hit_', 1, 2, '.png', 3), 10, false, false);
      this.enemy.animations.add('crouch', Phaser.Animation.generateFrameNames('wizard_2__crouch_', 1, 2, '.png', 3), 10, false, false);
      this.enemy.animations.add('standing', [0], 20, true);

      // facingenemy should be right or left
      this.facingenemy = 'left';
      this.enemy.scale.x = -1.5;
      // this.layerbackground.renderSettings.enableScrollDelta = true;
      // this.layerbackground.setScale(1.6);
      this.game.physics.enable(this.enemy);
      this.enemy.body.setSize(15, 18, 30, 32);
      this.enemy.body.bounce.y = 0.1;
      this.enemy.body.linearDamping = 1;
    }



  }

  // the whole player controls and input update loop
  // states
  update() {

    // update Enemy loop
    // whats needs to collide?
    


    // if enemy is alive
    if (this.enemyalive === true) {
      
      this.enemyAI();
    }

    this.game.physics.arcade.collide(this.player, this.collisionlayer);
    this.player.body.velocity.x = 0;
    var frameaction = false;

    // player controll responses
    if (this.cursorKeys.up.isDown) {
      frameaction = true;
      if (this.player.body.onFloor()) {
        this.player.body.velocity.y = -400;
        this.player.animations.play('jump');

      } else {

      }
    }
    if (this.cursorKeys.down.isDown) {

      this.player.animations.play('crouch');
      frameaction = true;
    }
    if (this.cursorKeys.left.isDown) {
      if (this.facingp1 = 'right') {
        this.facingp1 = 'left';
        this.player.scale.x = -1.5;
      }

      if (this.player.body.onFloor()) {
        this.player.animations.play('walk');
      }
      frameaction = true;
      this.player.body.velocity.x = -250;
    }
    if (this.cursorKeys.right.isDown) {
      if (this.facingp1 = 'left') {
        this.facingp1 = 'right';
        this.player.scale.x = 1.5;
      }
      frameaction = true;
      this.player.animations.play('walk');
      this.player.body.velocity.x = 250;
    }

    if (frameaction === false) {
      this.player.animations.play('standing');
    }

  }




  enemyAI() {
     // What side are we facing?
     if (this.facingenemy === "left") {
      this.enemy.animations.play('walk');
      this.enemy.body.velocity.x = -250;
      
    } else if (this.facingenemy === "right") {
      this.enemy.animations.play('walk');
      this.enemy.body.velocity.x = 250;
      
    }

    this.game.physics.arcade.collide(this.player, this.enemy);
    this.game.physics.arcade.collide(this.enemy, this.collisionlayer,this.enemyCollisionHandler, null, this);

    // add probability to jump with random number
    var x = Math.floor((Math.random() * 100) + 1);
    if (x === 9){
      if (this.enemy.body.onFloor()) {
        this.enemy.body.velocity.y = -400;
        this.enemy.animations.play('jump');

      } else {

      }
    }


  }


  // eneymy tilemap collision handler
  enemyCollisionHandler(spriteThatCollided, tileThatCollided){
    //console.log(spriteThatCollided.body.onFloor());
    // The turning when colliding in objects
    if(spriteThatCollided.body.blocked.left){
      this.facingenemy = "right";
      this.enemy.body.velocity.x = 250;
      this.enemy.scale.x = 1.5;
    }

    if(spriteThatCollided.body.blocked.right){
      this.facingenemy = "left";
      this.enemy.body.velocity.x = -250;
      this.enemy.scale.x = -1.5;
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