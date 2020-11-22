let prizes_config = {

    count:12,

    prize_names : ["3000 Credits","35% Off","Hard Luck","70% OFF","Swagpack","100% OFF","Netflix","50% Off","Amazon Voucher","2 Extra Spin", "CB Tshirt","CB Book"]

}



let config={
    type:Phaser.CANVAS,
    width:700,
    height:450,
     backgroundColor:0xffcc00,
    scene:{
        preload:preload,
        create:create,
        update:update,
        
    }
};
var game =new Phaser.Game(config);
function preload(){
    console.log('preload');
    this.load.image('background','../Assets/back.jpg');
    this.load.image('wheel','../Assets/wheel[1].png');
    this.load.image('pin','../Assets/pin[1].png');
    this.load.image('stand','../Assets/stand[1].png')
    this.load.image('strtbtn','../Assets/button.png')
    console.log(this);
    this.load.audio('spin','../Assets/sound.mp3');
    this.load.image('restart','../Assets/restart.png')
}
var button;
function create(){
    console.log('create')
    this.btn=document.createElement("BUTTON");
    let W=game.config.width;
    let H=game.config.height;
    let background=this.add.sprite(0,0,'background');
    background.setPosition(W/2,H/2);
    background.setScale(0.5);
     let stand=this.add.sprite(W/2+50,H/2+200,'stand');
    stand.setScale(0.2);
    this.strtbtn=this.add.sprite(W/2-250,H/2-50,'strtbtn').setScale(.50).setInteractive({
        cursor:'pointer'
    });
 this.restart=this.add.sprite(W/2-250,H/2-50,'restart').setScale(.50).setInteractive({
        cursor:'pointer'
    });
    this.restart.visible=false;
    
    this.wheel=this.add.sprite(W/2+50,H/2,'wheel');
   this.wheel.setScale(0.17);
    this.pin=this.add.sprite(W/2+50,H/2-175,'pin');
   this. pin.setScale(0.2);
    font_style={
        font:"bold 30px Roboto",
        align:"center",
        color:"red"
    };
    this.game_text=this.add.text(10,10,"welcome to spin and win",font_style);
    this.strtbtn.on("pointerdown",spinwheel,this);
    this.spin=this.sound.add('spin');
   // button = this.add.button(-50,10, 'button', spinwheel, this, 2, 1, 0);
   this.strtbtn.visible=true;
   
}
function update(){
    console.log('update');
    
    //this.wheel.angle+=2;
    
    
}
function spinwheel(){
    this.strtbtn.visible=false;
    this.sound.play('spin');
    console.log("you clicked");
    //this.game_text.setText("you clicked");
    let rounds=Phaser.Math.Between(4,7);
    let angle=Phaser.Math.Between(0,11)*30;//so it always moves multiple of 30 and points at the point
     let total=rounds*360+angle;
         let idx=prizes_config.count-1-Math.floor(angle/30);   
    tween=this.tweens.add({
        targets:this.wheel,
        angle:total,
        duration:5000,
        ease:"cubic.easeOut",
        callbackScope:this,
        onComplete:function(){
            this.game_text.setText("You won "+prizes_config.prize_names[idx]);
           // alert("You won "+prizes_config.prize_names[idx]);
        }
    })
    setTimeout(()=>{
        this.pin.visible=false;
        this.restart.visible=true;
        this.restart.on('pointerdown',restart,this);
    },5500);

}
function restart(){
    this.scene.restart();
    
}
