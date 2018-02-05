class Boot extends Phaser.State {

  constructor() {
    super();
  }

  preload() {
    this.load.image('preloader', 'assets/preloader.gif');
  }

  create() {
    this.game.input.maxPointers = 1;
    this.game.scale.pageAlignHorizontally = true;
    // setup device scaling
    if (this.game.device.desktop) {
      this.game.scale.scaleMode = Phaser.ScaleManager.SHOW_ALL;
      //this.game.scale.scaleMode = Phaser.ScaleManager.SHOW_ALL;
     
      this.game.scale.minWidth =  480;
      this.game.scale.minHeight = 360;
      this.game.scale.maxWidth = 1024;
      this.game.scale.maxHeight = 768;
      
    }
    if (!this.game.device.desktop) {
      this.game.scale.scaleMode = Phaser.ScaleManager.SHOW_ALL;
      this.game.scale.minWidth =  480;
      this.game.scale.minHeight = 260;
      this.game.scale.maxWidth = 600;
      this.game.scale.maxHeight = 768;
      this.game.scale.forceOrientation(true);
      this.game.scale.setSize();
    }

    this.initGlobalVariables();

    this.game.state.start('preloader');
  }

  initGlobalVariables() {
    this.game.global = {
      score: 0
    };
  }

}

export default Boot;