const shooter = document.getElementById("player_shooter");
const space_area = document.getElementById("play_area");
const enemy = ['assets/images/enemy.png','assets/images/boss.png'];

window.addEventListener("keydown", spaceShip);
//create 3 enemies
// createEnemy();
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
        let monsters = document.querySelectorAll(".enemies")
        monsters.forEach(monster => {
          if (checkLaserCollision(laser, monster)) {
            monster.src = "assets/images/explode2.png";
            monster.classList.remove("monster")
            monster.classList.add("dead")
            // scoreCounter.innerText = parseInt(scoreCounter.innerText) + 100
          }
        })

        if (xPosition === 340) {
          laser.remove()
        } else {
          laser.style.left = `${xPosition + 4}px`
        }
      }, 10)
}

function createEnemy(){
    let newEnemy = document.createElement('img');
    let enemyImage = enemy[Math.floor(Math.random()*2)]; // Random enemy spawn
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
    }, 50)
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
