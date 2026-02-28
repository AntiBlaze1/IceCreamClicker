document.addEventListener("DOMContentLoaded", function () {
    document.getElementById("truck").onclick=function (e) {
        let saveFile=document.getElementById("saveSelection").value;
        window.location.href="game.html"+"?saveid="+saveFile;
    };
})
