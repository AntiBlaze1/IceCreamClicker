var iceCream=0;

document.addEventListener("DOMContentLoaded",function () {
    updateIceCreamCounter();

    //Add shop items
    addShopItems();

    //When button clicked
    var clickButton=document.getElementById("clicker");
    clickButton.onclick=function(e) {
        iceCream++;
        updateIceCreamCounter();
        clickButton.style.animation="none";
        void clickButton.offsetWidth;
        clickButton.style.animation="scaleClicker 0.25s";
    }

});

function updateIceCreamCounter() {
    document.getElementById("counter").innerHTML=getIceCreamAsWord();
}

const numSuffix= new Map();
numSuffix.set(2,"million");
numSuffix.set(3,"billion");
numSuffix.set(4,"trillion");
numSuffix.set(5,"quadrillion");
numSuffix.set(6,"quintillion");
numSuffix.set(7,"sextillion");

function getIceCreamAsWord() {
    var digits=iceCream.toString().length;
    var threeZeroes=Math.floor((digits-1)/3);
    var prefix=iceCream.toString().slice(0,2)/10;
    return (numSuffix.get(threeZeroes)!=null)?prefix+" "+numSuffix.get(threeZeroes):iceCream;
}
// Name, description, 
const shopItems= [
    ["Scoop","test"],
    ["Scoop","test"],
    ["Scoop","test"],
    ["Scoop","test"],
    ["Scoop","test"],
    ["Scoop","test"],
    ["Scoop","test"],
    ["Scoop","test"],
    ["Scoop","test"],
    ["Scoop","test"],
    ["Scoop","test"],
]

function addShopItems() {
    for (const item in shopItems) {
        const button=document.createElement("img");
        button.src="assets/upgradeBackground.png";
        button.classList.add("shopItem");
        document.getElementById("shopList").appendChild(button);
    }
}
