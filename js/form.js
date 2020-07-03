class Form{
    constructor(){
       this.title;
       this.msg;
       this.msg2;
       this.nameInput;
       this.btn;

       this.createElements();
    }
    createElements(){
        this.title = createElement('h1','Hurdle Over!');
        this.title.style('color: #333333ff; position: relative; font-family: serif');
        this.title.position(width/2-92.865,50);

        this.msg = createP('A horizontal hurdles game');
        this.msg.style('color: #222222ff; position: relative; font-family: "Lucida Console"');
        this.msg.position(width/2-120.865,120);

        this.msg2 = createP('Your character');
        this.msg2.style('color: #222222ff; position absolute; font-family: "Lucida Console');
        this.msg2.position(150,80);

        this.nameInput = createInput();
        this.nameInput.attribute('placeholder','name..');
        this.nameInput.input(()=>player.name = this.nameInput.value());
        this.nameInput.position(width/2-90.865,190);

        this.btn = createButton('Lets Play');
        this.btn.position(width/2+15,235);
        this.btn.mouseClicked(()=>{
            this.removeElements();
            if(playerCount < 4){
                player.updatePlayerCount(playerCount+1);
                player.index = playerCount;
                player.updatePlayerInfo();
            }
            return null;
        });
    }
    removeElements(){
        this.title.remove();
        this.msg.remove();
        this.msg2.remove();
        this.nameInput.remove();
        this.btn.remove();

        this.title = null;
        this.msg = null;
        this.msg2 = null;
        this.nameInput = null;
        this.btn = null;
    }
}