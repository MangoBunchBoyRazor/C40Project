var game, form, player, database;

function setup(){
    database = firebase.database();

    game = new Game();
    form = new Form();
}
function draw(){
    game.update();
}
function showError(err){
    console.log(err);
}