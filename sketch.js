var game, form, player
var database, playerCount;

function setup(){
    database = firebase.database();

    game = new Game();
    form = new Form();
    player = new Player();
}
function draw(){
    game.update();
}
function showError(err){
    console.log(err);
}