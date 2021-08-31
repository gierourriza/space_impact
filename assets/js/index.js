const shooter = document.getElementById("player_shooter"); //main player
const space_area = document.getElementById("play_area");// play area

const enemy = ['assets/images/alien1.png','assets/images/alien2.png','assets/images/alien3.png','assets/images/alien4.png']; // random enemy that will spawn
const score = document.getElementById("score");
const destroyed = false;

window.addEventListener("keydown", spaceShip);
//create 3 enemies
createEnemy();
createEnemy();
createEnemy();
createEnemy();
//space ship movements , fire laser beam
function spaceShip(event) {
    if (event.key === "ArrowUp") {
    event.preventDefault();
    moveUp();
    } else if (event.key === "ArrowDown") {
    event.preventDefault();
    moveDown();
    } else if (event.key === " ") {
    event.preventDefault();
    fireLaser();
}

}


function moveUp() {
    // let topPosition = document.getElementById("player_shooter").style.top;
    let topPosition = window.getComputedStyle(shooter).getPropertyValue('top');
    if (topPosition === "0px") {
        return;
    }
    else {
        let position = parseInt(topPosition);
        position -= 4;
        shooter.style.top = `${position}px`;
    }
}


function moveDown() {
    // let topPosition = document.getElementById("player_shooter").style.top;
    let topPosition = window.getComputedStyle(shooter).getPropertyValue('top');
    if (topPosition === "360px") {
        return
    } 
    else {
        let position = parseInt(topPosition);
        position += 4;
        shooter.style.top = `${position}px`;
    }
}

function fireLaser(){
    let laser = createLaser();
    space_area.appendChild(laser);
    moveLaser(laser);
}

function createLaser(){
    let xPosition = parseInt(window.getComputedStyle(shooter).getPropertyValue('left'));
    let yPosition = parseInt(window.getComputedStyle(shooter).getPropertyValue('top'));
    let newLaser = document.createElement('img');
    newLaser.src = "assets/images/laser2.png";
    newLaser.classList.add('laser');
    newLaser.style.left = `${xPosition}px`;
    newLaser.style.top = `${yPosition - 10}px`;
    return newLaser;
}

function moveLaser(laser){
    let laserInterval = setInterval(() => {
        let xPosition = parseInt(laser.style.left)
        let theEnemies = document.querySelectorAll(".enemies")
        theEnemies.forEach(enemy => {
          if (checkLaserCollision(laser, enemy)) {
            enemy.src = "assets/images/explode2.png";
            enemy.classList.remove("monster")
            enemy.classList.add("dead")
            score.innerHTML = parseInt(score.innerHTML) + 100;
            enemy.remove();
            createEnemy();
          }
        })

        if (xPosition === 340) {
          laser.remove();
        } else {
          laser.style.left = `${xPosition + 4}px`
        }
      }, 10)
}

function createEnemy(){
    let newEnemy = document.createElement('img');
    let enemyImage = enemy[Math.floor(Math.random()*4)]; // Random enemy spawn
    newEnemy.src = enemyImage;
    newEnemy.classList.add("enemies");
    newEnemy.style.left="370";
    newEnemy.style.top = `${Math.floor(Math.random() * 330) + 30}px`;
    space_area.appendChild(newEnemy);
    moveEnemy(newEnemy);
}

//allow anemies to move from right to left
function moveEnemy(enemy){
    let enemyInterval = setInterval(() => {
        let xPosition = parseInt(window.getComputedStyle(enemy).getPropertyValue('left'));
        if(xPosition <= 50){
            
            enemy.remove();
            createEnemy();
        }
        else{
            enemy.style.left = `${xPosition - 4}px`;
        }
        // console.log("enemy =" + enemy.style.left);
    }, 100)
}
//Check COllision
function checkLaserCollision(laser, monster) {
    let laserLeft = parseInt(laser.style.left)
    let laserTop = parseInt(laser.style.top)
    let laserBottom = laserTop - 20
    let monsterTop = parseInt(monster.style.top)
    let monsterBottom = monsterTop - 30
    let monsterLeft = parseInt(monster.style.left)
    if (laserLeft != 340 && laserLeft + 40 >= monsterLeft) {
      if ( (laserTop <= monsterTop && laserTop >= monsterBottom) ) {
        return true
      } else {
        return false
      }
    } else {
      return false
   
}
}

//Spawn Boss

