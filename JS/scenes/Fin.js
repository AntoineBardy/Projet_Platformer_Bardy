export default class Fin extends Phaser.Scene {
    constructor() {
        super('fin')
    }

    create () {
        this.text;
        this.text = this.add.text(150,250,'Maman, je suis rentré !', { fontSize: 16 }).setDepth(3).setScrollFactor(0);

        this.textA;
        this.textA = this.add.text(150,300,'Tu vas bien ? Prends tes médicaments mon chéri et on passera à table après.', { fontSize: 16 }).setDepth(3).setScrollFactor(0);
    }
}