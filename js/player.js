//Player class definition to handle the user playing
class Player {
    constructor() {
        this.index = null;  //Player index. Used to refer to the current player
        this.character = 0; //Player character. Used to determine the animation of the player
        this.distance = 0;  //Player distance. Used to determine whether a player has won or not
        this.name = form.nameInput.value(); //Name of the player
        this.players = [];  //Array to hold all the player sprites for rendering
        this.obsGrp = createGroup();    //Obstacle group
        this.grndGrp = createGroup();   //Ground group
        //Images array
        this.images = [
            loadImage("finishline-1.png"),
            loadImage("obstacleimg.png")
        ];
    }
    play() {
        camera.position.x = playerData["player" + this.index].distance; //Focusing the camera to the current players distance

        this.distance += this.players[this.index - 1].velocityX; //Updating distance as per velocity
        this.updatePlayerInfo();    //Updating new distance to database

        //Main for loop to iterate to each player
        for (let i = 0; i < this.players.length; i++) {
            this.players[i].x = playerData["player" + (i + 1)].distance; //Rendering each player at their respective distance

            this.grndGrp[i].position.y = (height / 4) * i + 110; //Setting the ground position else ground will fall too
            this.grndGrp[i].shapeColor = "orange";

            textSize(20);
            textAlign(CENTER);
            fill(255);
            if (i == this.index - 1) {
                ellipse(this.players[i].x, this.players[i].y, 25, 25);
                text("You", this.players[i].x, this.players[i].y - 40);
            }
            else {
                text("" + playerData["player" + (i + 1)].name, this.players[i].x, this.players[i].y - 40);
            }

            //Player collisions
            this.players[i].collide(this.obsGrp, () => { this.players[i].velocityX = 0; });
            this.players[i].collide(this.grndGrp);
            //Gravity
            this.players[i].velocityY += 0.5;
            //Limiting total scalar speed
            this.players[i].limitSpeed(10);

            //Condition to end the game
            if (this.players[i].position.x > MAXDIST) {
                game.updateGameState(2);
                game.endGame();
                this.players[this.index - 1].velocityX = 0;
                return 0;
            }
        }

        //User controls
        if (keyDown("d"))
            this.players[this.index - 1].velocityX += 0.5;
        if (keyDown("a"))
            this.players[this.index - 1].velocityX -= 0.5;
        if (keyDown("w") && this.grndGrp[this.index - 1].position.y - this.players[this.index - 1].position.y < 60)
            this.players[this.index - 1].velocityY = -5.5;
        drawSprites();

        //Finish line
        image(this.images[0], MAXDIST + 20, 0, 100, height);
    }
    //Update functions
    updatePlayerCount(count) {
        database.ref('/').update({
            playerCount: count
        });
    }
    updatePlayerInfo() {
        if (this.index === null) {
            this.index = playerCount;
            this.players[this.index - 1].addAnimation("athlete", spriteanim);
        }
        let data = {
            index: this.index,
            name: this.name,
            distance: this.distance,
            character: this.character
        };
        database.ref('players/player' + this.index).set(data);
    }
}