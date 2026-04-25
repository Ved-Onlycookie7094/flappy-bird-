var flappy,flappyImg
var bg,bgImg
var toppipe,toppipeImg
var downpipe,downpipeImg
var score=0;
var pipeGroup
var gamestate="start";
var start,startImg
var end,endImg
var hitsound,pointsound,diesound,flapsound
function preload(){
    flappyImg=loadImage("bird_gif.gif")
    bgImg=loadImage("bg.png")
    toppipeImg=loadImage("toppipe.png")
    downpipeImg=loadImage("downpipe.png")
    startImg=loadImage("start.png")
    endImg=loadImage("gameover.png")
    hitsound=loadSound("hit.mp3")
    pointsound=loadSound("point.mp3")
    diesound=loadSound("die.mp3")
    flapsound=loadSound("flap.mp3")
}






function setup(){
    createCanvas(400,500)
    bg=createSprite(200,290)
    flappy=createSprite(100,250)
    flappy.addImage(flappyImg)
    flappy.setCollider("circle",0,0,400)
    flappy.debug=false;
    flappy.scale=0.05
    bg.addImage(bgImg)
    bg.scale=0.5
    pipeGroup=createGroup()
    start=createSprite(200,250)
    start.addImage(startImg)
    start.scale=0.3
    end=createSprite(200,160)
    end.addImage(endImg)
    end.scale=0.3

}



function draw(){
    background("white")
    drawSprites();
    fill("black")
    text("Score: " + score, 320,20)
    

    if(gamestate=="start"){
        end.visible=false
        start.visible = true
        flappy.y=250
        pipeGroup.destroyEach()
        score=0
        if(mousePressedOver(start)){
            gamestate="play"
      
        }
    }
    
   

    if(gamestate=="play"){

        end.visible=false
        start.visible=false
        if(frameCount % 50==0){
            score=score+1
            pointsound.play()
        }
        if(keyWentDown("space")){
            flappy.velocityY=-8;
            flapsound.play()
        }

        if(flappy.isTouching(pipeGroup)  || flappy.y>450 || flappy.y<0  ){
            gamestate="end"
            diesound.play()
          
        }
        if(flappy.isTouching(pipeGroup)){
            gamestate="end"
            hitsound.play()
        }
        flappy.velocityY=flappy.velocityY +1;
        showPipes()
    }   


    if(gamestate=="end"){
        end.visible=true 
        flappy.velocityY=0
        pipeGroup.setVelocityXEach(0)
        start.visible=true
        if(mousePressedOver(start)){
            gamestate="start"
            
        
        }
    }


   




}

function showPipes(){
    if(frameCount % 60==0){
        toppipe=createSprite(400,random(-30,100 ))
        toppipe.addImage(toppipeImg)
        toppipe.scale=0.5
        toppipe.velocityX=-(6+score/10)
          
        downpipe=createSprite(400,toppipe.y+400)
        downpipe.addImage(downpipeImg)
        downpipe.scale=0.5
        downpipe.velocityX=-(6+score/10) 
        pipeGroup.add(toppipe)
        pipeGroup.add(downpipe)

        end.depth = toppipe.depth+1
        end.depth = downpipe.depth+1
        start.depth=toppipe.depth+1
        start.depth = downpipe.depth+1
    }

 

}















