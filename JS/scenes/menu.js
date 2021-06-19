export default class Menu extends Phaser.Scene {
    constructor() {
        super('menu')
    }

    preload()
	{
		this.load.image('logo', './assets/Logo.png')
        this.load.image('playbutton', './assets/BouttonPlay.png')
        this.load.image('menu', './assets/menu.png')
        this.load.image('commandesbutton', './assets/BouttonOption.png')	
        this.load.image('exit', './assets/Exit.png')
        this.load.spritesheet('pilluleP', './assets/PillulePlay.png',{frameWidth: 48, frameHeight: 8})
        this.load.spritesheet('pilluleO', './assets/PilluleOptions.png',{frameWidth: 48, frameHeight: 8})
        this.load.spritesheet('pilluleE', './assets/PilluleExit.png',{frameWidth: 48, frameHeight: 8})
	}

    create() { //creating the menu screen

        this.testRespawn = false;
        this.ambi = true;

        //create images (z order)

        this.add.image(this.game.renderer.width / 2 , this.game.renderer.height / 2 - 150, 'logo').setDepth(1);

        this.add.image(0, 0, 'menu').setOrigin(0).setDepth(0);

        let playButton = this.add.image(this.game.renderer.width / 2 - 15 , this.game.renderer.height / 2 + 10, 'playbutton').setDepth(1);

        let commandButton = this.add.image(this.game.renderer.width / 2 + 10 , this.game.renderer.height / 2 + 97, 'commandesbutton').setDepth(1);

        let exitButton = this.add.image(this.game.renderer.width / 2 - 15 , this.game.renderer.height / 2 + 177, 'exit').setDepth(1);

        /*
        this.anims.create({
            key: 'playNo',
            frames: [ { key: 'pilluleP', frame: 0 } ],
            frameRate: 20
        })
        this.anims.create({
            key: 'playYes',
            frames: [ { key: 'pilluleP', frame: 1 } ],
            frameRate: 20
        })

        this.play = this.add.sprite(410,280,'pilluleP').setScrollFactor(0).setInteractive({cursor:'pointer'});

        this.play.on('pointerover', function (event){

            this.play.anims.play('playYes',true);

        });

        this.play.on('pointerout', function (event){

            this.play.anims.play('playNo',true);

        });

        this.anims.create({
            key: 'playNo',
            frames: [ { key: 'pilluleO', frame: 0 } ],
            frameRate: 20
        })
        this.anims.create({
            key: 'playYes',
            frames: [ { key: 'pilluleO', frame: 1 } ],
            frameRate: 20
        })

        this.playA = this.add.sprite(600,370,'pilluleO').setScrollFactor(0).setInteractive({cursor:'pointer'});

        this.playA.on('pointerover', function (event){

            this.playA.anims.play('playYes',true);

        });

        this.playA.on('pointerout', function (event){

            this.playA.anims.play('playNo',true);

        });
 
            PointerEvents:
                pointerover - hovering
                pointerout - not hovering
                pointerup - click and release
                pointerdown - just click
        */

        playButton.setInteractive();

        playButton.on("pointerup", () => {
            this.scene.start('game', {testRespawn:this.test, Zik: this.ambi});
        })

        commandButton.setInteractive();

        commandButton.on("pointerup", () => {
            this.scene.start('touches');
            
        })

        exitButton.setInteractive();

        exitButton.on("pointerup", () => {
            this.scene.stop()
            
        })

    }
}