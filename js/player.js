class Player {
    constructor() {
        this.index = null;
        this.distance = 0;
        this.name = form.nameInput.value();
        this.playerData;
        this.players = [
            createSprite(0, 0, 50, 50),
            createSprite(0, 0, 50, 50),
            createSprite(0, 0, 50, 50),
            createSprite(0, 0, 50, 50),
        ];
        this.obsGrp = createGroup();
        this.grndGrp = createGroup();

        for (let i = 0; i < this.players.length; i++) {
            for (let j = 150; j < MAXDIST; j += 250)
                this.obsGrp.add(createSprite(j, (height / 4) * i + 75, 30, 40));

            let s = createSprite(0, (height / 4) * i + 110, MAXDIST*2, 40);
                s.immovable = true;
                this.grndGrp.add(s);
        }

        database.ref('playerCount').on('value', (data) => playerCount = data.val(), showError);
        database.ref('players').on('value', (data) => this.playerData = data.val(), showError);

        this.images = [
            loadImage("finishline-1.png")
        ];
    }
    play() {
        camera.position.x = this.playerData["player" + this.index].distance;
        this.distance += this.players[this.index - 1].velocityX;
        this.updatePlayerInfo();

        for (let i = 0; i < this.players.length; i++) {
            if (this.players[i].y == 0)
                this.players[i].y = (height / 4) * i + 70;
            this.players[i].x = this.playerData["player" + (i + 1)].distance;

            this.grndGrp[i].position.y = (height / 4) * i + 110;

            this.players[i].collide(this.obsGrp,()=>{this.players[i].velocityX = 0;});
            this.players[i].collide(this.grndGrp);
            this.players[i].velocityY += 0.5;
            this.players[i].limitSpeed(15);

            this.players[i].shapeColor = "blue";

            if(this.players[i].position.x > MAXDIST){
                game.updateGameState(0);
                game.endGame();
                this.players[this.index-1].velocityX = 0;
                return 0;
            }
        }
        this.players[this.index-1].shapeColor = "red";

        for (let i = 0; i < this.obsGrp.length; i++)
            this.obsGrp[i].update();

        if (keyDown("d")) {
            this.players[this.index - 1].velocityX += 0.5;
        }
        if (keyDown("a")) {
            this.players[this.index - 1].velocityX -= 0.5;
        }
        if (keyDown("w") && this.grndGrp[this.index - 1].position.y -this.players[this.index - 1].position.y < 60) {
            this.players[this.index - 1].velocityY = -10;
        }
        drawSprites();

        //Finish line
        image(this.images[0],MAXDIST + 20,0,100,height);
    }
    updatePlayerCount(count) {
        database.ref('/').update({
            playerCount: count
        });
    }
    updatePlayerInfo() {
        if (this.index === null)
            this.index = playerCount;
        let data = {
            index: this.index,
            name: this.name,
            distance: this.distance,
        };
        database.ref('players/player' + this.index).set(data);
    }
}