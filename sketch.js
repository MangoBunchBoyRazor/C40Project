const MAXDIST = 4500;

var game, form, player
var database, playerCount;

function preload() {
    window.addEventListener("keydown", (e) => { if ([32, 37, 38, 39, 40].indexOf(e.keyCode) > -1) e.preventDefault() });
    database = firebase.database();
}
function setup() {
    game = new Game();
    form = new Form();
    player = new Player();
}
function draw() {
    game.update();

    if (form.title == null && game.gamestate == 0 && player.players[1].position.y == 0) {
        textSize(25);
        textAlign(CENTER);
        text("Hello " + player.name + "!", width / 2, 100);
        text("Waiting for other players...", width / 2, 150);
    }

    if (game.gamestate == 0 && player.players[1].position.y > 0) {
        camera.position.x = width / 2;

        textSize(25);
        textAlign(CENTER);
        text("Game Over!", width / 2, 100);
        text("You went " + player.players[player.index - 1].position.x + " metres", width / 2, 150);
    }
}
function showError(err) {
    console.log(err);
}