class Game{
    constructor(){
        this.canvas = createCanvas(windowWidth-16,windowHeight-20);
        this.gamestate;


        database.ref('gameState').on('value',(data)=>{this.gamestate = data.val();},showError);
    }
    update(){
        this.canvas.background(0);
    }
}
function windowResized(){
    resizeCanvas(windowWidth-16,windowHeight-20);
    form.title.position(width/2-92.865,50);
}