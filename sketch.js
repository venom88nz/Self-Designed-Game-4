var warrior,corona;
var obsacle1;
var invisibleground, coronagroup;
var PLAY = 1;
var END = 0;
var gamestate = PLAY;

function preload()
{
backgroundimg = loadImage("background.png");
warrior1img = loadAnimation("warrior1.png","warrior2.png","warrior3.png","warrior4.png","warrior5.png")	;
coronaimg = loadAnimation("corona1.png","corona2.png","corona3.png","corona4.png","corona5.png");
warriorstop = loadAnimation("warrior5.png");
coronastop = loadAnimation("corona5.png");
gameoverimg  = loadImage("gameover.jpg");
retryimg  = loadImage ("retry.png");
}

function setup()
 {
	createCanvas(1000, 550);

  bg = createSprite(500,280,1000,450);
  bg.addImage(backgroundimg)
  bg.scale = 0.8;  

  warrior = createSprite(100,450,30,40);
  warrior.addAnimation("runwarrior",warrior1img);
  warrior.addAnimation("stopwarrior",warriorstop);
  warrior .scale = 0.4;

  invisibleground = createSprite(100,520,500,20);
  invisibleground .visible= false	;
  
  gameover = createSprite(500,220,50,50);
  gameover.addImage(gameoverimg);
  gameover.scale = 0.2;
  gameover.visible  =false;
  
  retry = createSprite(500, 350,50,50);
  retry.addImage(retryimg);
  retry.scale = 0.4;
  retry.visible = false;
  
  coronagroup = new Group();
}
function draw() {
  background(0);

  warrior.collide(invisibleground);

if (gamestate === PLAY)
  {
      bg.velocityX = -3;
    
    if (bg.x<200)
    {
      bg.x= 650;
    }
    if(keyDown("space")&& warrior.y>410)
    {
      warrior.velocityY = -10;
    }
    
    warrior.velocityY = warrior.velocityY + 0.5;
    
    spawncorona();
    
    if(warrior.isTouching(coronagroup))
    {
      gamestate = END;
    }
}
  else if(gamestate === END) 
  {
    bg.velocityX = 0;
    coronagroup.setVelocityXEach(0)
    warrior.changeAnimation("stopwarrior",warriorstop);
    corona.changeAnimation("coronastop",coronastop)
    gameover.visible = true;
    retry.visible = true;
  }

  drawSprites();
 
}
function spawncorona()
{
  if(frameCount % 150 === 0)
  {
    corona = createSprite (1020,450);
    corona.velocityX = -3;
    corona.addAnimation("corona",coronaimg);
    corona.addAnimation("coronastop",coronastop)

    corona.scale = 0.7;
    corona.lifeTime = 300;
    coronagroup.add(corona);

  }
}




