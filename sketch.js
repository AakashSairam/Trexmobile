var trex, trex_running , rand , cloud;
var ground, invisibleGround, groundImage;
var cloud_Image;
var tree;
var tree1 , tree2 , tree3 , tree4 , tree5 , tree6 , gameState , play , end , tree_group , cloud_group;
var randomtree, edges , gameOver , restart , gameOverimage , restartimage , score , checkpoint , jump , die , trexdie;
// loads all pics for animation


function preload(){
  trex_running = loadAnimation("trex1.png","trex3.png","trex4.png");
 
  
  groundImage = loadImage("ground2.png");
  
  cloud_Image =  loadImage("cloud.png");
  tree1 = loadImage("obstacle1.png");
  tree2 = loadImage("obstacle2.png");
  tree3 = loadImage("obstacle3.png");
  tree4 = loadImage("obstacle4.png");
  tree5 = loadImage("obstacle5.png");
  tree6 = loadImage("obstacle6.png");
  gameOverimage = loadImage("gameOver.png");
  restartimage = loadImage("restart.png");
  jump  = loadSound("jump.mp3");
  die = loadSound("die.mp3");
  checkpoint = loadSound("checkPoint.mp3");
  trexdie = loadImage("trex_collided.png");
}


function setup() {
  createCanvas(windowWidth,windowHeight);
//   rand = Math.round(random(10,20));
  
//  console.log(rand);
  play=1;
  end=0;
  gameState = play;   
  //create a trex sprite
  trex = createSprite(50,height-100,20,50);
  trex.addAnimation("running", trex_running);
  trex.addAnimation("die",trexdie);
  trex.scale = 0.5;
  
  //create a ground sprite
  ground = createSprite(width/2,height-100,width,20);
  ground.addImage("ground",groundImage);
  ground.x = ground.width /2;
//  ground.velocityX = -4;
  
  //creating invisible ground
  invisibleGround = createSprite(width/2,height-70,width,10);
  invisibleGround.visible = false;

  //console.log(trex.depth);
  tree_group = new Group();
  cloud_group = new Group();
  //trex.setCollider("rectangle",0,0,70,100);
 // trex.debug = true;
  
  edges = createEdgeSprites();
  gameOver = createSprite(width/2,height/3,50,10);
  restart = createSprite(width/2,height/2,50,50);
  
  gameOver.addImage("game",gameOverimage);
  restart.addImage("start", restartimage);

    score = 0;
  
}

function draw() {
  //set background color
  background("lightgreen");
  text("score -"+score,width-100,25);
  
  
  if(gameState === play){
   trex.changeAnimation("running",trex_running);
    ground.velocityX = -8;
    if (ground.x < 0){
    ground.x = ground.width/2; 
  }
    if((keyDown("space") || touches.length > 0) && trex.y >= height-190) {  
  trex.velocityY = -10;
  jump.play(); 
  }
  trex.velocityY = trex.velocityY + 0.8
  score = score+Math.round(getFrameRate()/60);
    if(score%100 === 0 && score > 0){
      checkpoint.play();
    }
      
    
    
// console.log(getFrameRate());
  //console.log(trex.y)
  
  gameOver.visible = false;
    restart.visible = false;
    
    
  //jump when the space key is pressed
  
  //add gravity
  
  //stop trex from falling down
  trex.collide(invisibleGround);
    trex.collide(edges[2]);
  
  spawncloud();
  spawntree();
  if(trex.isTouching(tree_group)){
    gameState = end;
    die.play();
  }
  }
  else if(gameState === end){
    trex.changeAnimation("die",trexdie);
    ground.velocityX = 0;
    trex.velocityY = 0;
    cloud_group.setVelocityXEach(0);
    tree_group.setVelocityXEach(0);
    cloud_group.setLifetimeEach(-1); 
    tree_group.setLifetimeEach(-1);
    if(mousePressedOver( restart) ){
      tree_group.destroyEach();
      cloud_group.destroyEach();
      gameState = play;
      
    }
   gameOver.visible = true;
    restart.visible = true;
    score = 0;
    
  }
  drawSprites();
}
 function spawncloud(){
   if(frameCount%55 === 0)
   {
     
  
   cloud = createSprite(width-30,50,20,20);
   cloud.y = Math.round(random(30,100));
 cloud.addImage(cloud_Image);
   cloud.velocityX = -4;
   cloud.scale = 1.5;
   //console.log(cloud.depth);
   cloud.lifetime = 200;
     //depth is place an object front or back
     cloud.depth= trex.depth;
     trex.depth = trex.depth+1;
     cloud_group.add(cloud);
   }
  
   
 }
 function spawntree (){
   if (frameCount%120 === 0){  
   
   tree = createSprite(width-30,height-110,20,5);
   randomtree = Math.round(random(1,6));
   // switch is used randomize many images 
     switch(randomtree){
       case 1:tree.addImage(tree1);
      break;
      case 2:tree.addImage(tree2);
         break;
         case 3:tree.addImage(tree3);
         break;
         case 4:tree.addImage(tree4);
         break;
         case 5:tree.addImage(tree5);
         break;
         case 6:tree.addImage(tree6);
         break;
         
     }
     tree.lifetime = 200;
     tree.scale = 0.8;
 // tree.setCollider("rectangle",0,0,300,150);
 //   tree.debug = true;
     tree.velocityX = -9;
     tree_group.add(tree);
     
   }
  
     
      
 }






//rectangle , square , pointers , circle
// any word which is not defined to the code is called string.
// something which can store is  known as array
