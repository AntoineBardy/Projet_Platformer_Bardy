import Player from "../class/player.js";

export default class SecondWorld extends Phaser.Scene {
    constructor()
      {
          super('world')
      }

      init(data){

        this.posX = data.PositionX
		    this.posY = data.PositionY
		    this.respawn = data.Respawn
        this.testRespawn = data.testRespawn
        this.blabla = data.Bonjour

      }
      
      
      preload() {
        //Preloading Images, Textures and Maps
      this.load.spritesheet(
        "player",
        "../assets/Hero.png",
        {
          frameWidth: 32,
          frameHeight: 32,
          margin: 1,
          spacing: 2
        }
      );
      this.load.image("tiles", "./assets/Tiled/TilesSet.png");
      this.load.tilemapTiledJSON("map2", "./assets/Tiled/Map4.json");
      this.load.image("background2", "./assets/Assets/Background1.png");
      
    }
  
    create() {
      //Setting the state of the player
      this.isPlayerDead = false;
      this.respawn = false;
      this.test = false;
  
  
      //Setting the map
      this.add.image(0, 0, 'background2').setOrigin(0,0).setDepth(-3);
      const map = this.make.tilemap({ key: "map2" });
      const tiles = map.addTilesetImage("TilesSet", "tiles");
  
      this.ground = map.createLayer("Plateforme", tiles).setDepth(0);
      map.createLayer("Decor1", tiles).setDepth(-1);
      map.createLayer("Decor2", tiles).setDepth(-2);
      this.mortel = map.createLayer("Mortel", tiles).setDepth(-2);

      //Setting soud design


  
      // Using Spawn Point to get an easy way to spawn player

      if(this.testRespawn){
        this.player = new Player(this, this.posX, this.posY);
      }
      /*
      else{
      const spawnPoint = map.findObject("Objects", obj => obj.name === "Spawn Point");
      this.player = new Player(this, spawnPoint.x, spawnPoint.y);
      }
      */
  
      // Collide the player with Tiled Layers
      this.ground.setCollisionByProperty({ collides: true });
      this.physics.world.addCollider(this.player.sprite, this.ground);

      this.mortel.setCollisionByProperty({ mortal: true });
      this.physics.world.addCollider(this.player.sprite, this.mortel,this.death,null,this)

      //Setting the camera
      this.cameras.main.startFollow(this.player.sprite);
      this.cameras.main.setBounds(0, 0, map.widthInPixels, map.heightInPixels);
    }
  
    update(time, delta) {
      if (this.isPlayerDead) return;
  
      this.player.update();
      this.blabla = false

      this.time.addEvent({ delay : 5000, repeat: 9, callback: function(){this.warping(this.player);}, callbackScope: this});

      this.posX = this.player.sprite.body.x
      this.posY = this.player.sprite.body.y
  
      
    }

    warping(player){
      this.test = true;
      this.scene.start('game', {PositionX:this.posX , PositionY:this.posY , Respawn:this.respawn, testRespawn:this.test, Bonjour:this.blabla})
    }

    death(player){
      // Flag that the player is dead
      this.isPlayerDead = true;

      const cam = this.cameras.main;
      cam.shake(100, 0.05);
  
      if(this.respawn){
        this.player.sprite.setVelocity(0);
        this.player.sprite.setPosition(this.CheckPoint.x,this.CheckPoint.y - 20);
        this.isPlayerDead = false;
      }
      
      else{

        cam.fade(250, 0, 0, 0);

        // Freeze the player
        this.player.freeze();

        cam.once("camerafadeoutcomplete", () => { 
          this.player.destroy();
          this.scene.restart();
        
      });
      }

    }

    respawning(player){
      this.respawn = true
    }
  }