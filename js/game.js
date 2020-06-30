class Game{
    constructor(){
        this.canvas = createCanvas(displayWidth-16,displayHeight-20);
        this.gamestate;

        database.ref('gameState').on('value',(data)=>this.gamestate = data.val(),showError);
    }
    update(){
        this.canvas.background(255);

        if(this.gamestate == 1)
            player.play();

    }
    updateGameState(state){
        database.ref('/').update({
            gameState: state
        });
    }
    endGame(){
        database.ref('/').update({
            playerCount: 0,
            players: null
        });
    }
}