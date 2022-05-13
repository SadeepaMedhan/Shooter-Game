var jet = document.getElementById("jet");
var board = document.getElementById("background");
$("#bullet").css("display","none");

var score = 0;

window.addEventListener("keydown",(e)=>{
    var left = parseInt(window.getComputedStyle(jet).getPropertyValue("left"));
    if(e.key == "ArrowLeft" && left > 0){
        jet.style.left = left - 10 + "px";
    }
    else if (e.key == "ArrowRight" && left <= 450){
        jet.style.left = left + 10 + "px";
    }

    if(e.keyCode == 32){
        var bullet = document.createElement("div");
        bullet.id = "bullet";
        board.appendChild(bullet);

        var moveBullet = setInterval(()=>{

            for (var i=0; i<alien.length; i++){
                var al = alien[i];

                var alienBound = al.getBoundingClientRect();
                var bulletBound = bullet.getBoundingClientRect();

                if (bulletBound.left >= alienBound.left &&
                    bulletBound.right <= alienBound.right &&
                    bulletBound.bottom <= alienBound.bottom &&
                    bulletBound.top <= alienBound.top )
                {
                    al.parentElement.removeChild(al);
                    bullet.parentElement.removeChild(bullet);
                    score = score + 1;
                    $("#lblScore").text(score);
                }
            }

            var bottomBullet = parseInt(window.getComputedStyle(bullet).getPropertyValue("bottom"));

            bullet.style.left = left + 15 + "px";
            bullet.style.bottom = bottomBullet + 3 + "px";
        });
    }

});

var alienList = setInterval(()=>{
    var aliens = document.createElement("div");
    aliens.id = "alien";

    var alienLeft = parseInt(window.getComputedStyle(aliens).getPropertyValue("left"));
    aliens.style.left = Math.floor(Math.random() * 450) + "px";

    board.append(aliens);
}, 1500);

var moveAlien = setInterval(()=>{

    if(alien != undefined){
        for (var i = 0; i < alien.length; i++){
            var al = alien[i];
            var topAlien = parseInt(window.getComputedStyle(al).getPropertyValue("top"));

            if(topAlien >= 550){
                gameOver();
            }

            al.style.top = topAlien + 20 + "px";
        }
    }
}, 450);


function gameOver(){

    swal(
        'Game Over',
        'Score '+score+'.'
    ).then(function (){
        window.location.reload();
        score = 0;
    });
    clearInterval(moveAlien);

}