setInterval(()=>
{
    update();
},1000);

function update() {
    updateIceCreamPerSecond();
}

var updateTen=0;

function updateIceCreamPerSecond() {
    amountPerSecond=Math.round(amountPerSecond*10)/10;
    updateGainStats();
    let intAmountPerSecond=Math.floor(amountPerSecond);
    addIceCream(intAmountPerSecond);

    updateTen++;
    if (updateTen==10) {
        updateTen=0;
        let decimalPart=amountPerSecond-intAmountPerSecond;
        addIceCream(decimalPart*10);
    }

    updateIceCreamCounter();
}
