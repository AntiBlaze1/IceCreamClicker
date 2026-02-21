const upgradeItems=new Map();

upgradeItems.set("bigCone",
    ["Big Cone","bigCone.png"]
)

let nextIceCreamUpgradeIndex=0;
const iceCreamUpgradeRequirements=[
    [5,"bigCone"],

]

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

    const upgradeContainer=document.createElement("div");
    upgradeContainer.classList.add("upgradeContainer");

    const image=document.createElement("img");
    image.src="assets/upgrades/"+upgradeItems.get(id)[1];
    image.classList.add("upgradeImage");
    image.onclick=function (e) {

    }

    upgradeContainer.appendChild(image);

    document.getElementById("upgradesList").appendChild(upgradeContainer);

    
}
