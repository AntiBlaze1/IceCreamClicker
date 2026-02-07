var iceCream=0;
var amountPerClick=1;

document.addEventListener("DOMContentLoaded",function () {
    updateIceCreamCounter();

    //Add shop items
    addShopItems();

    //When button clicked
    var clickButton=document.getElementById("clicker");
    clickButton.onclick=function(e) {
        iceCream+=amountPerClick;
        updateIceCreamCounter();
        clickButton.style.animation="none";
        void clickButton.offsetWidth;
        clickButton.style.animation="scaleClicker 0.25s";
    }

    //Handle no image found
    document.addEventListener("error",function (e) {
        if (e.target.tagName==="IMG") {
            e.target.src="assets/debug.png";
        }
    },true);

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


const shopEffects=Object.freeze({
    INC_CLICK:0,
});

// Name, description, icon path (relative to assets/shopItems), cost, effects
const shopItems= [
    ["Scoop","does stuff ig","scoop.png", 15, [shopEffects.INC_CLICK,1]],

]

function addShopItems() {
    for (let i=0;i<shopItems.length;i++) {
        const container=document.createElement("div");
        container.classList.add("shopItemContainer");

        const button=document.createElement("img");
        button.src="assets/upgradeBackground.png";
        button.classList.add("shopItem");

        const title=document.createElement("h3");
        title.appendChild(document.createTextNode(shopItems[i][0]));
        title.classList.add("shopItemTitle");

        const description=document.createElement("p");
        description.appendChild(document.createTextNode(shopItems[i][1]));
        description.classList.add("shopItemDescription");

        const icon=document.createElement("img");
        icon.src="assets/shopItems/"+shopItems[i][2];
        icon.classList.add("shopItemIcon");

        const cost=document.createElement("p");
        cost.appendChild(document.createTextNode(String(shopItems[i][3])+" $"));
        cost.classList.add("shopItemCost");

        container.appendChild(cost);
        container.appendChild(icon);
        container.appendChild(description);
        container.appendChild(title);
        container.appendChild(button);

        container.onclick=function (e) {
            if (iceCream<shopItems[i][3]) {
                return;
            }
            iceCream-=shopItems[i][3];
            updateIceCreamCounter();

            let currentEffectIndex=0;
            var lookingForEffect=true;
            let effect;
            while (currentEffectIndex<shopItems[i][4].length) {
                if (lookingForEffect===true) {
                    effect=shopItems[i][4][currentEffectIndex];
                    lookingForEffect=false;
                    currentEffectIndex++;
                } else {
                    let effectVar=shopItems[i][4][currentEffectIndex];
                    handleEffect(effect,effectVar);
                    currentEffectIndex++;
                }
            }
        }

        document.getElementById("shopList").appendChild(container);
    }
}

function handleEffect(effect, amount) {
    switch(effect) {
        case shopEffects.INC_CLICK:
            amountPerClick+=amount;
            break;
    }
}
