export default class Touches extends Phaser.Scene {
    constructor() {
        super('touches')
    }
    preload()
	{
		this.load.image('commandes', './assets/MenuTouche.png')	
        this.load.image('retour', './assets/Retour.png')
	}
    create()
	{

        this.add.image(0, 0, 'commandes').setOrigin(0).setDepth(0);

        let returnButton = this.add.image(this.game.renderer.width / 2 - 420 , this.game.renderer.height / 2 + 240, 'retour').setDepth(1);

        returnButton.setInteractive();

        returnButton.on("pointerup", () => {
            this.scene.start('menu');
            
        })
	}
}