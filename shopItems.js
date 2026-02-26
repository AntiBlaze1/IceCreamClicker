// Name, description, icon path (relative to assets/shopItems), cost, effects
// For INC_SEC, make sure the lowest decimal is tenths
const shopItems= [
    ["Scoop", "scoop", "Scoops the Ice Cream, allowing for more to be scooped a second!","scoop.png", 10, [shopEffects.INC_SEC,0.1]],
    ["Cone","cone","A cone allows for more Ice Cream!","cone.png",200,[shopEffects.INC_CLICK,1]],
    ["Ice Cream Cart","cart","Sell more Ice Cream!","iceCreamCart.png",2000,[shopEffects.INC_SEC,2]],
    ["Ice Cream Truck","truck","Sell even more Ice Cream!!","iceCreamTruck.png",30000,[shopEffects.INC_SEC,4]],
    ["Devoted Customer","customer","YOU'RE BANNED!!","customer.png",100000,[shopEffects.INC_CLICK,6]],
]
