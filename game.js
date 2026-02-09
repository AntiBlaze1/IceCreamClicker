var iceCream=0;
var amountPerClick=1;
var amountPerSecond=0;
var inventory=new Map();

document.addEventListener("DOMContentLoaded",function () {
    updateGainStats();
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
    document.getElementById("counter").innerHTML=getNumberAsWord(iceCream);
}

function updateGainStats() {
    document.getElementById("gainStats").innerHTML="Per Click: "+amountPerClick+"                    Per Second: "+amountPerSecond;
}

const numSuffix= new Map();
numSuffix.set(2,"million");
numSuffix.set(3,"billion");
numSuffix.set(4,"trillion");
numSuffix.set(5,"quadrillion");
numSuffix.set(6,"quintillion");
numSuffix.set(7,"sextillion");

function getNumberAsWord(number) {
    var digits=number.toString().length;
    var threeZeroes=Math.floor((digits-1)/3);
    var prefix=number.toString().slice(0,2)/10;
    return (numSuffix.get(threeZeroes)!=null)?prefix+" "+numSuffix.get(threeZeroes):number;
}


const shopEffects=Object.freeze({
    INC_CLICK:0,
    INC_SEC:1,
});


const nameIndex=0;
const idIndex=1
const descriptionIndex=2;
const iconIndex=3;
const priceIndex=4;
const effectsIndex=5;

function addShopItems() {
    for (let i=0;i<shopItems.length;i++) {
        const container=document.createElement("div");
        container.classList.add("shopItemContainer");

        const button=document.createElement("img");
        button.src="assets/upgradeBackground.png";
        button.classList.add("shopItem");

        const title=document.createElement("h3");
        title.appendChild(document.createTextNode(shopItems[i][nameIndex]));
        title.classList.add("shopItemTitle");

        const description=document.createElement("p");
        description.appendChild(document.createTextNode(shopItems[i][descriptionIndex]));
        description.classList.add("shopItemDescription");

        const icon=document.createElement("img");
        icon.src="assets/shopItems/"+shopItems[i][iconIndex];
        icon.classList.add("shopItemIcon");

        const cost=document.createElement("p");
        cost.appendChild(document.createTextNode(String(shopItems[i][priceIndex])+"$"));
        cost.classList.add("shopItemCost");

        const amount=document.createElement("p");
        amount.appendChild(document.createTextNode((inventory.get(shopItems[i][idIndex])||0)));
        amount.classList.add("shopItemAmount");

        container.appendChild(amount);
        container.appendChild(cost);
        container.appendChild(icon);
        container.appendChild(description);
        container.appendChild(title);
        container.appendChild(button);

        container.onclick=function (e) {
            if (iceCream<calculateCost(shopItems[i][priceIndex],shopItems[i][idIndex])) {
                container.style.animation="none";
                void container.offsetWidth;
                container.style.animation="wiggle 0.2s";
                return;
            }
            iceCream-=calculateCost(shopItems[i][priceIndex],shopItems[i][idIndex]);
            updateIceCreamCounter();
            container.style.animation="none";
            void container.offsetWidth;
            container.style.animation="smallScale 0.2s";

            inventory.set(shopItems[i][idIndex],(inventory.get(shopItems[i][idIndex])||0)+1);

            container.querySelector(".shopItemCost").innerHTML=getNumberAsWord(calculateCost(shopItems[i][priceIndex],shopItems[i][idIndex]))+"$";
            container.querySelector(".shopItemAmount").innerHTML=inventory.get(shopItems[i][idIndex]);

            let currentEffectIndex=0;
            var lookingForEffect=true;
            let effect;
            while (currentEffectIndex<shopItems[i][effectsIndex].length) {
                if (lookingForEffect===true) {
                    effect=shopItems[i][effectsIndex][currentEffectIndex];
                    lookingForEffect=false;
                    currentEffectIndex++;
                } else {
                    let effectVar=shopItems[i][effectsIndex][currentEffectIndex];
                    handleEffect(effect,effectVar);
                    currentEffectIndex++;
                }
            }
        }

        container.id=shopItems[i][idIndex]+"-itemID";

        document.getElementById("shopList").appendChild(container);
    }
}

function handleEffect(effect, amount) {
    switch(effect) {
        case shopEffects.INC_CLICK:
            amountPerClick+=amount;
            break;
        case shopEffects.INC_SEC:
            amountPerSecond+=amount;
            break;
    }
    updateGainStats();
}

function calculateCost(cost, id) {
    return Math.ceil(cost*Math.pow(1.1,(inventory.get(id)||0)));
}
