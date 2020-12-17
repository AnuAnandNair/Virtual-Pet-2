//nodes: Food, FeedTime

var dog,dogImg,dogImg1;
var database;
var foodS,foodStock;
var feedButton, addFoodButton;
var fedTime, lastFed;
var food;

function preload(){
   dogImg=loadImage("images/dogImg.png");
   dogImg1=loadImage("images/dogImg1.png");
  }

//Function to set initial environment
function setup() {

  database=firebase.database();
  
  createCanvas(1000,400);

  food=new Food();
  food.getFoodStock();

  dog=createSprite(800,200,150,150);
  dog.addImage(dogImg);
  dog.scale=0.2;

  //foodStock=database.ref('Food');
  //foodStock.on("value",readStock);
  textSize(20);  

  feedButton=createButton("Feed the dog");
  feedButton.position(700,95);
  feedButton.mousePressed(feedDog);

  addFoodButton=createButton("Add Food");
  addFoodButton.position(800,95);
  addFoodButton.mousePressed(addFood);
}

// function to display UI
function draw() {
  background(46,139,87); 
  
  food.display();
  
  //drawSprites();
  

  fedTime=database.ref('FeedTime');
  fedTime.on("value",function(data){
    lastFed=data.val();
  })
  fill(255,255,254);
  textSize(15);
  if(lastFed>=12){
    text("Last Feed : "+lastFed%12+ " PM",350,30);//time is in 24 hoyr format  > 12 means PM like 13 to 24
    //to display it in 12 hour format, 13 = 1 PM that is remainder of 13 /12
    //14=2 PM that is remainder of 14/12
    //15=3 PM that is remainder of 15/12
  }else if(lastFed===0){
    text("Last Feed : 12 AM",350,30);
  }else{
    text("Last Feed : "+lastFed + " AM",350,30);
  }
  drawSprites();
}
  

//Function to read values from DB
/*function readStock(data){
  foodS=data.val();
}*/



function addFood(){
food.getFoodStock();
food.foodStock+=1;//foodS++;
//foodS=food.foodStock;
database.ref('/').update({
  Food:food.foodStock
})

}

function feedDog(){
  
  dog.addImage(dogImg1);
  food.getFoodStock();
  food.deductFood();//food.updateFoodStock(food.getFoodStock()-1); 
  //food.updateFoodStock(food.foodStock);
  database.ref('/').update({    
    Food:food.foodStock,//Food:food.getFoodStock(),
    FeedTime:hour()
      //update foodStock and fedTime
    })
  
  
}

