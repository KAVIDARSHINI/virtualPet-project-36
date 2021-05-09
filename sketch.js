var dog,sadDog,happyDog, database;
var foodS,foodStock;
var addFood;
var foodObj;
var backImage;

//create feed and lastFed variable here
var feed,lastFed,fedtime


function preload(){
backImage = loadImage("land.jpg");  
sadDog=loadImage("angry.png");
happyDog=loadImage("shishimaruu.png");
}

function setup() {
  database=firebase.database();
  createCanvas(1000,400);

  foodObj = new Food();

  foodStock=database.ref('Food');
  foodStock.on("value",readStock);
  
  dog=createSprite(800,200,150,150);
  dog.addImage(sadDog);
  dog.scale=0.3;

  //create feed the dog button here

  feed = createButton("Feed");
  feed.position(700,95);
  feed.mousePressed(feedDog);

  addFood=createButton("Add Food");
  addFood.position(800,95);
  addFood.mousePressed(addFoods);

}

function draw() {
  background(backImage);
  foodObj.display();

  //write code to read fedtime value from the database 
   fedtime = database.ref('FeedTime');
   fedtime.on("value",function(data){
     lastFed = data.val();
   })
 
  //write code to display text lastFed time here
  fill(161, 255, 10);
  stroke(0, 112, 74);
  strokeWeight(5);
  

  textFont("Cooper Black");
  textSize(20);
  if(lastFed >= 12){
    text("Last Fed  :  " + lastFed % 12 + "  PM",270,30);
  }else if(lastFed == 0){
    text("Last  Fed  :   12  AM",270,30);
  }else{
    text("Last Fed : " + lastFed + "  AM",270,30);
  }
 
  drawSprites();
}

//function to read food Stock
function readStock(data){
  foodS=data.val();
  foodObj.updateFoodStock(foodS);
}


function feedDog(){
  dog.addImage(happyDog);

  //write code here to update food stock and last fed time

  var food_stock_val = foodObj.getFoodStock();
  if(food_stock_val <= 0){
     foodObj.updateFoodStock(food_stock_val *0);
  } else{
    foodObj.updateFoodStock(food_stock_val -1);
  }
  database.ref('/').update({
     'FeedTime' : hour(),
     'Food' : foodObj.getFoodStock()
   })


}

//function to add food in stock
function addFoods(){
  foodS++;
  database.ref('/').update({
    Food:foodS
  })
}
