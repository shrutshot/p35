//Create variables here`
var dog,dogpic, happyDog, happypic, database, foodS, foodStock,feed,add,fedTime, lastFed,foodObj;

function preload()
{
  //load images here
  dogpic=loadImage("dogImg1.png");
  happypic=loadImage("dogImg.png");
}


function setup() {
	createCanvas(500, 500);
  dog=createSprite(200,200)
  dog.addImage(dogpic);
  dog.scale=0.3;


  database=firebase.database();

  foodStock=database.ref('food');
  foodStock.on("value",readStock);

  foodObj= new Fooodd;

  feed=createButton("feed the dog")
  feed.position(200,95)
  feed.mousePressed(feedDog)
  add=createButton("add food")
  add.position(300,95)
  add.mousePressed(addFood)
}


function draw() {  
  background(46,139,87);
  drawSprites();
  stroke("black"); 
  text("Food remaining : "+foodS,170,200); 
  foodObj.display();
  
  //add styles here
  fedTime=database.ref('feedTime');
  fedTime.on("value", function(data){
    lastFed=data.val();
  })
  


}

function addFood(){
  foodS++;
  database.ref('/').update({
    Food:foodS
  })
}

function feedDog(){
  dog.addImage(happyDog);

  foodObj.updateFoodStock(foodObj.getFoodStock()-1);
  database.ref('/').update({
    Food:foodObj.getFoodStock(),
    feedTime:hour()
  })
}

function readStock(data){
    foodS=data.val();
}

function writeStock(x){
  if(x<=0){
    x=0;
  }
  else{
    x=x-1;
  }

    database.ref('/').update({
      Food:x
    })
}



