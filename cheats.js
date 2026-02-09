var cheatEnabled=false;


//dragability vars
var offsetX=0;
var offsetY=0;
var drag=false;

function toggleCheats() {
    cheatEnabled=!cheatEnabled;

    if (cheatEnabled) {
        const menu=document.createElement("div");
        menu.id="debugMenu";

        const title=document.createElement("h2");
        title.appendChild(document.createTextNode("DEV CHEATS"));
        menu.appendChild(title);

        const setIceCream=document.createElement("button");
        setIceCream.appendChild(document.createTextNode("Set Ice Cream"));
        setIceCream.onclick=function (e) {
            iceCream=parseInt(prompt("How much?"),10);
            updateIceCreamCounter();
        }
        menu.appendChild(setIceCream);

        const shopItemAmount=document.createElement("button");
        shopItemAmount.appendChild(document.createTextNode("Add item amount"));
        shopItemAmount.onclick=function (e) {
            let id=prompt("What ID?");
            let amount=parseInt(prompt("How much?"),10);
            inventory.set(id,(inventory.get(id)||0)+amount);
            let baseCost=0;
            let shopArrayIndex=0;
            for (let i=0;i<shopItems.length;i++) {
                if (shopItems[i][idIndex]==id) {
                    baseCost=shopItems[i][priceIndex];
                    shopArrayIndex=i;
                    break;
                }
            }
            document.getElementById(id+"-itemID").querySelector(".shopItemCost").innerHTML=getNumberAsWord(calculateCost(baseCost,id))+"$";
            document.getElementById(id+"-itemID").querySelector(".shopItemAmount").innerHTML=inventory.get(id);
            for (let i=0;i<amount;i++) {
                let currentEffectIndex=0;
                var lookingForEffect=true;
                let effect;
                while (currentEffectIndex<shopItems[shopArrayIndex][effectsIndex].length) {
                    if (lookingForEffect===true) {
                        effect=shopItems[shopArrayIndex][effectsIndex][currentEffectIndex];
                        lookingForEffect=false;
                        currentEffectIndex++;
                    } else {
                        let effectVar=shopItems[shopArrayIndex][effectsIndex][currentEffectIndex];
                        handleEffect(effect,effectVar);
                        currentEffectIndex++;
                    }
                }
            }
        }
        menu.appendChild(shopItemAmount);

        menu.addEventListener("mousedown", function (e) {
            offsetX=e.clientX-menu.offsetLeft;
            offsetY=e.clientY-menu.offsetTop;
            drag=true;
        });

        menu.addEventListener("mousemove", function (e) {
            if (drag) {
                menu.style.left=e.clientX-offsetX+"px";
                menu.style.top=e.clientY-offsetY+"px";
            }
        });

        menu.addEventListener("mouseup", function (e) {
            drag=false;
        });

        document.getElementById("left").appendChild(menu);
    } else {
        document.getElementById("left").removeChild(document.getElementById("debugMenu"));
    }
}
