class Food{
    constructor(){        
        this.foodStock=0;
        this.lastFed=null;
        this.image = loadImage("images/Milk.png");
    }


    getFoodStock(){
       var foodStockRef=database.ref('Food');   
        foodStockRef.on("value",(data)=>{
         //bottle image will not be displayed in the beginning  
        //foodStock=data.val();//uncomment if function(data) is to be used in line 11 and comment 14
        this.foodStock=data.val();//bottle image will be displayed in the beginning             
        });
        //this.foodStock=foodStock;//uncomment if function(data) is to be used in line 11       
    }

    getFedTime(lastFed){
        this.lastFed=lastFed;
      }


      
    updateFoodStock(foodStock){
        database.ref('/').update({
            Food:foodStock
        })
    }
    
    deductFood(){
        if(this.foodStock>0){
            this.foodStock=this.foodStock-1;
           } 
    }

    display(){
        var x=80;
        var y=100;

        imageMode(CENTER);
        image(this.image,720,220,70,70);

        if(this.foodStock!=0){
            for(var i=0;i<this.foodStock;i++){
                if(i%10==0){
                    x=80;
                    y=y+50;
                }
                image(this.image,x,y,50,50);
                x=x+30;
            }
        }
    }
}