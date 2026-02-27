const upgradeItems=new Map();

const upgradeEffects=Object.freeze({
    INC_CLICK_MULT:0,
    INC_SEC_MULT:1,
});

upgradeItems.set("sprinkles",
    ["Sprinkles","sprinkles.png",10,"Increases ICPS multiplier by 1",[upgradeEffects.INC_SEC_MULT,1]]
);

upgradeItems.set("cherry",
    ["Cherry","cherry.png",10,"Increases click multiplier by 1",[upgradeEffects.INC_CLICK_MULT,1]]
);

var nextIceCreamUpgradeIndex=0;
// Unlock price, id
const iceCreamUpgradeRequirements=[
    [5,"sprinkles"],
    [7,"cherry"]
]

var upgradeInventory=[];

function checkIceCreamUpgradeRequirement() {
    if (nextIceCreamUpgradeIndex==-1) {
        return;
    }
    if (iceCream>=iceCreamUpgradeRequirements[nextIceCreamUpgradeIndex][0]) {
        addUpgrade(iceCreamUpgradeRequirements[nextIceCreamUpgradeIndex][1])
        if (nextIceCreamUpgradeIndex<iceCreamUpgradeRequirements.length-1) {
            nextIceCreamUpgradeIndex++;
        } else {
            nextIceCreamUpgradeIndex=-1;
        }

    }
}

function addUpgrade(id) {
    if (upgradeInventory.includes(id)) {
        return;
    }

    const upgradeContainer=document.createElement("div");
    upgradeContainer.classList.add("upgradeContainer");

    const background=document.createElement("img");
    background.src="assets/squareUpgradeBackground.png";
    background.classList.add("smallUpgradeBackground");

    
    const image=document.createElement("img");
    image.src="assets/upgrades/"+upgradeItems.get(id)[1];
    image.classList.add("upgradeImage");
    upgradeContainer.onclick=function (e) {
        let price=upgradeItems.get(id)[2];
        if (price>iceCream) {
            upgradeContainer.style.animation="none";
            void upgradeContainer.offsetWidth;
            upgradeContainer.style.animation="wiggle 0.2s";
            return;
        } else {
            iceCream-=price;
            handleUpgradeEffect(upgradeItems.get(id)[4]);
            upgradeInventory.push(id);
            upgradeContainer.remove();
        }
    }

    const description=document.createElement("div");
    description.style.display="none";
    description.classList.add("upgradeDescriptionPopup");
    const descriptionText=document.createElement("p");
    descriptionText.appendChild(document.createTextNode(
        upgradeItems.get(id)[0]+"   "
        +upgradeItems.get(id)[2]+"$\n"
        +upgradeItems.get(id)[3]
    ));
    descriptionText.classList.add("upgradeDescriptionText");
    description.appendChild(descriptionText);
    
    image.addEventListener("mouseenter",function (e) {
        description.style.display="block";
    });

    image.addEventListener("mouseout",function (e) {
        description.style.display="none";
    });


    upgradeContainer.appendChild(background);
    upgradeContainer.appendChild(image);
    upgradeContainer.appendChild(description);
    document.getElementById("upgradesList").appendChild(upgradeContainer);

    
}

function handleUpgradeEffect(effect) {
    switch (effect[0]) {
        case upgradeEffects.INC_CLICK_MULT:
            perClickMult+=effect[1];
            break;
        case upgradeEffects.INC_SEC_MULT:
            perSecondMult+=effect[1];
            break;
    }
}
