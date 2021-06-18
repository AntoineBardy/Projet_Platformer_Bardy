import Player from "../class/player.js";

export default class Game extends Phaser.Scene {
    constructor()
      {
          super('game')
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
        "./assets/Assets/Personnage.png",
        {
          frameWidth: 64,
          frameHeight: 96,
        }
      );
      this.load.image("Finish", "./assets/Assets/ArriveeMaison2.png");
      this.load.image("PU", "./assets/Assets/PowerUp.png");
      this.load.image("Checkpoint", "./assets/Assets/Checkpoint OW.png");
      this.load.spritesheet("BDF","./assets/Assets/BouleDeFeu.png",{frameWidth: 32, frameHeight: 64})
      this.load.spritesheet("Croa","./assets/Assets/monstreOiseau.png",{frameWidth: 192, frameHeight: 96})
      this.load.spritesheet("monstre","./assets/Assets/Monstre Arbre.png",{frameWidth: 96, frameHeight: 96})
      this.load.image("tile", "./assets/Tiled/TilesSet.png");
      this.load.tilemapTiledJSON("map", "./assets/Tiled/Map3.json");
      this.load.image("background", "./assets/Assets/Background2.png");
      this.load.audio('ambiance', "./Sound/SonSchizo.ogg");
    }
  
    create() {

      console.log(this)
      //Setting the state of the player
      this.isPlayerDead = false;
      this.respawn = false;
      this.posX;
      this.posY;
      this.test = false;
      
  
  
      //Setting the map
      this.add.image(0, 0, 'background').setOrigin(0,0).setDepth(-3);
      const map = this.make.tilemap({ key: "map" });
      const tiles = map.addTilesetImage("TilesSet", "tile");
  
      this.ground = map.createLayer("Plateforme", tiles).setDepth(0);
      map.createLayer("Decor1", tiles).setDepth(0);
      map.createLayer("Decor2", tiles).setDepth(-1);
      this.mortel = map.createLayer("Mortel", tiles).setDepth(-1);
  
      // Using Spawn Point to get an easy way to spawn player
      if(this.testRespawn){
        this.player = new Player(this, this.posX, this.posY);
      }
      else{
      const spawnPoint = map.findObject("Objects", obj => obj.name === "Spawn Point");
      this.player = new Player(this, spawnPoint.x, spawnPoint.y - 200);
      }
  
      // Collide the player with Tiled Layers
      this.ground.setCollisionByProperty({ collides: true });
      this.physics.world.addCollider(this.player.sprite, this.ground);
  
      this.mortel.setCollisionByProperty({ mortal: true });
      this.physics.world.addCollider(this.player.sprite, this.mortel,this.death,null,this)
  

      //Ajout des monstres
      this.monstre = this.physics.add.group({
        immovable: true,
        allowGravity: false
      });

    this.CheckPoint = map.findObject("Objects", obj => obj.name === "CheckPoint")

    this.checkpoint = this.physics.add.group({allowGravity: false,immovable: true})
    this.checkpoint.create(this.CheckPoint.x, this.CheckPoint.y, 'Checkpoint').setDepth(0);

    this.physics.add.overlap(this.player.sprite, this.checkpoint, this.respawning, null,this);

    const monstreSp = map.findObject("Monstres", obj => obj.name === "Monstre1");
    const monstreSp4 = map.findObject("Monstres", obj => obj.name === "Monstre 4");
    const monstreSp7 = map.findObject("Monstres", obj => obj.name === "Monstre 7");
    const monstreSp8 = map.findObject("Monstres", obj => obj.name === "Monstre 8");

    
    this.monstre.create(monstreSp.x, monstreSp.y, 'monstre').setDepth(0);
    this.monstre.create(monstreSp4.x, monstreSp4.y, 'monstre').setDepth(0);
    this.monstre.create(monstreSp7.x, monstreSp7.y, 'monstre').setDepth(0);
    this.monstre.create(monstreSp8.x, monstreSp8.y, 'monstre').setDepth(0);

    this.physics.add.overlap(this.player.sprite, this.monstre, this.death, null,this);


    this.corbeau = this.physics.add.group({allowGravity: false,immovable: true});
    this.corbeauA = this.physics.add.group({allowGravity: false,immovable: true});

    const oisalI = map.findObject("Monstres", obj => obj.name === "Monstre 2");
    const oisalII = map.findObject("Monstres", obj => obj.name === "Monstre 3");
    const oisalIII = map.findObject("Monstres", obj => obj.name === "Monstre 5");
    const oisalIV = map.findObject("Monstres", obj => obj.name === "Monstre 6");
    const oisalV = map.findObject("Monstres", obj => obj.name === "Monstre 9");

    this.corbeauI = this.corbeau.create(oisalI.x + 140, oisalI.y, 'Croa').setDepth(0).setSize(64, 64);
    this.corbeauII = this.corbeau.create(oisalII.x + 140 , oisalII.y - 40, 'Croa').setDepth(0).setSize(64, 64);
    this.corbeauIII = this.corbeauA.create(oisalIII.x - 190, oisalIII.y - 40 , 'Croa').setDepth(0).setSize(64, 64);
    this.corbeauIV = this.corbeau.create(oisalIV.x + 340, oisalIV.y - 40 , 'Croa').setDepth(0).setSize(64, 64);
    this.corbeauV = this.corbeau.create(oisalV.x , oisalV.y , 'Croa').setDepth(0).setSize(64, 64);

    this.corbeauIII.flipX = true;
    this.corbeauV.flipX = true;

    this.physics.add.overlap(this.player.sprite, this.corbeauI, this.death, null,this);
    this.physics.add.overlap(this.player.sprite, this.corbeauII, this.death, null,this);
    this.physics.add.overlap(this.player.sprite, this.corbeauIII, this.death, null,this);
    this.physics.add.overlap(this.player.sprite, this.corbeauIV, this.death, null,this);
    this.physics.add.overlap(this.player.sprite, this.corbeauV, this.death, null,this);


    this.PU = map.findObject("Objects", obj => obj.name === "Power-Up 1")

    this.PU1 = this.physics.add.group({allowGravity: false,immovable: true})
    this.PU1.create(this.PU.x, this.PU.y, 'PU').setDepth(0);

    this.physics.add.overlap(this.player.sprite, this.PU1, this.warping, null,this);

    this.PUbis = map.findObject("Objects", obj => obj.name === "Power-Up 2")

    this.PU2 = this.physics.add.group({allowGravity: false,immovable: true})
    this.PU2.create(this.PUbis.x, this.PUbis.y, 'PU').setDepth(0);

    this.physics.add.overlap(this.player.sprite, this.PU2, this.warping, null,this);

    this.PUter = map.findObject("Objects", obj => obj.name === "Power-Up 3")

    this.PU3 = this.physics.add.group({allowGravity: false,immovable: true})
    this.PU3.create(this.PUter.x, this.PUter.y, 'PU').setDepth(0);

    this.physics.add.overlap(this.player.sprite, this.PU3, this.warping, null,this);


    this.anims.create({
      key: "croa_marche",
      frames: this.anims.generateFrameNumbers("Croa", { start: 0, end: 9 }),
      frameRate: 8,
      repeat: -1
    });

    this.corbeauI.anims.play('croa_marche');
    this.corbeauII.anims.play('croa_marche');
    this.corbeauIII.anims.play('croa_marche');
    this.corbeauIV.anims.play('croa_marche');
    this.corbeauV.anims.play('croa_marche');

    var test = this;
    var i = 0;

    this.corbeau.children.iterate(function (child) {
      test.tweens.add({
          targets: child,
          x: child.x-400,
          ease: 'Linear',
          duration: 1200,
          yoyo: true,
          repeat: -1,
          flipX : true
      });

      i++;

      if (i == test.corbeau.length)
      {
          i = 0;
      }

  })

  var i = 0;

    this.corbeauA.children.iterate(function (child) {
      test.tweens.add({
          targets: child,
          x: child.x+600,
          ease: 'Linear',
          duration: 1500,
          yoyo: true,
          repeat: -1,
          flipX : true
      });

      i++;

      if (i == test.corbeauA.length)
      {
          i = 0;
      }

  })

    
    this.bdf = this.physics.add.group({allowGravity: false,immovable: true});
    this.bdfA = this.physics.add.group({allowGravity: false,immovable: true});

    const bdfI = map.findObject("Monstres", obj => obj.name === "BDF 1");
    const bdfII = map.findObject("Monstres", obj => obj.name === "BDF 2");
    const bdfIII = map.findObject("Monstres", obj => obj.name === "BDF 3");
    const bdfIV = map.findObject("Monstres", obj => obj.name === "BDF 4");
    const bdfV = map.findObject("Monstres", obj => obj.name === "BDF 5");

    this.bdf1 = this.bdf.create(bdfI.x , bdfI.y + 50 , 'BDF').setDepth(-3).setSize(64, 64);
    this.bdf2 = this.bdf.create(bdfII.x , bdfII.y + 50, 'BDF').setDepth(-3).setSize(64, 64);
    this.bdf3 = this.bdfA.create(bdfIII.x , bdfIII.y + 50 , 'BDF').setDepth(-3).setSize(64, 64);
    this.bdf4 = this.bdfA.create(bdfIV.x , bdfIV.y, 'BDF').setDepth(-3).setSize(64, 64);
    this.bdf5 = this.bdf.create(bdfV.x , bdfV.y, 'BDF').setDepth(-3).setSize(64, 64);

    this.physics.add.overlap(this.player.sprite, this.bdf1, this.death, null,this);
    this.physics.add.overlap(this.player.sprite, this.bdf2, this.death, null,this);
    this.physics.add.overlap(this.player.sprite, this.bdf3, this.death, null,this);
    this.physics.add.overlap(this.player.sprite, this.bdf4, this.death, null,this);
    this.physics.add.overlap(this.player.sprite, this.bdf5, this.death, null,this);

    this.anims.create({
      key: "feu",
      frames: this.anims.generateFrameNumbers("BDF", { start: 0, end: 3 }),
      frameRate: 4,
      repeat: -1
    });

    this.bdf1.anims.play('feu');
    this.bdf2.anims.play('feu');
    this.bdf3.anims.play('feu');
    this.bdf4.anims.play('feu');
    this.bdf5.anims.play('feu');

  var test = this;
  var i = 0;

    this.bdf.children.iterate(function (child) {
      test.tweens.add({
          targets: child,
          y: child.y-400,
          ease: 'Power2',
          duration: 1400,
          yoyo: true,
          repeat: -1,
          flipY : true
      });

      i++;

      if (i == test.bdf.length)
      {
          i = 0;
      }

  })

  var i = 0;

    this.bdfA.children.iterate(function (child) {
      test.tweens.add({
          targets: child,
          y: child.y-1200,
          ease: 'Power2',
          duration: 1800,
          yoyo: true,
          repeat: -1,
          flipY : true
      });

      i++;

      if (i == test.bdfA.length)
      {
          i = 0;
      }

  })

      //Setting the camera
      this.cameras.main.startFollow(this.player.sprite);
      this.cameras.main.setBounds(0, 0, map.widthInPixels, map.heightInPixels);
      this.musique;
      this.musique = this.sound.add('ambiance');
    }

  
    update(time, delta) {
      if (this.isPlayerDead) return;
  
      this.player.update();

      if(this.blabla){
        this.musique.play({volume : 0.5, rate: 0.6, loop: true})
        this.blabla = false
      }
      else{
        this.musique.resume()
      }
  
      this.posX = this.player.sprite.body.x
      this.posY = this.player.sprite.body.y

      
      
      
    }

    warping(player){
      this.test = true
      this.musique.pause()
      //this.player.destroy();
      this.scene.start('world', {PositionX:this.posX , PositionY:this.posY, Respawn:this.respawn, testRespawn:this.test, Bonjour:this.blabla})
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
          this.musique.stop();
          this.player.destroy();
          this.scene.restart();
        
      });
      }

    }
    respawning(player){
      this.respawn = true
    }
  }