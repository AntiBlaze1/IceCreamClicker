const upgradeItems= [
    ["Big Cone","bigCone","bigCone.png"],
    ["Big Cone","bigCone","bigCone.png"],
    ["Big Cone","bigCone","bigCone.png"],
    ["Big Cone","bigCone","bigCone.png"],
    ["Big Cone","bigCone","bigCone.png"],
    ["Big Cone","bigCone","bigCone.png"],
    ["Big Cone","bigCone","bigCone.png"],
    ["Big Cone","bigCone","bigCone.png"],
    ["Big Cone","bigCone","bigCone.png"],
    ["Big Cone","bigCone","bigCone.png"],
]

function addUpgrades() {
    for (let i=0;i<upgradeItems.length;i++) {
        const upgradeContainer=document.createElement("div");
        upgradeContainer.classList.add("upgradeContainer");

        const image=document.createElement("img");
        image.src="assets/upgrades/"+upgradeItems[i][2];
        image.classList.add("upgradeImage");

        upgradeContainer.appendChild(image);

        document.getElementById("upgradesList").appendChild(upgradeContainer);
    }
}
