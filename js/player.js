class Player{
    constructor(){
        this.index = null;
        this.name = form.nameInput.value();
        this.sprite = createSprite(0,0,50,50);

        database.ref('playerCount').on('value',(data)=>playerCount = data.val(),showError);
    }
    play(){
        this.sprite.x = 0;
        this.sprite.y = (height/4) * (this.index+1);
    }
    updatePlayerCount(count){
        database.ref('/').update({
            playerCount: count
        });
    }
    updatePlayerInfo(){
        let data = {
            name: this.name
        };
        database.ref('players/player'+playerCount).set(data);
    }
}