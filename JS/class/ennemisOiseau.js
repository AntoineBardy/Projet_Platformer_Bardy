export default class Croa {
    constructor (scene, x, y, texture ){
        //super (scene, x, y, texture);
        
        scene.add.existing(this);
        scene.physics.world.enableBody(this);

        console.log(this) 
        
   }

   Marche (){
        
    if (this.dead != true){
            this.body.setVelocityX(this.vitesseDeDeplacement);
            this.flipX = false ;
            this.anims.play('croa_marche', true);
        }
        else {
            this.anims.play('croa_bougePas', true);
        }
    }
}