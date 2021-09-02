const shooter = document.getElementById("player_shooter"); //main player
const space_area = document.getElementById("play_area");// play area

const enemy = ['assets/images/alien1.png','assets/images/alien2.png','assets/images/alien3.png','assets/images/alien4.png']; // random enemy that will spawn
const score = document.getElementById("score");
const destroyed = false;
let scorePoints = 0;
let bossMode = false;
let bossLife = 1000;
let stop = false;
let myLife = 3;

window.addEventListener("keydown", spaceShip);
//create 2 enemies
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
        let xPosition = parseInt(laser.style.left);
        let theEnemies = document.querySelectorAll(".enemies");
        theEnemies.forEach(enemy => {
          if (checkLaserCollision(laser, enemy)) {
            score.innerHTML = parseInt(score.innerHTML) + scorePoints;
            enemy.remove();
            laser.remove();
            createEnemy();
          }
        })

        if(bossMode){
            let theBoss = document.querySelector(".boss");
            if(checkLaserCollision(laser, theBoss)){
                // console.log("bosslife =" + bossLife);
                bossLife--;
            }
            if(bossLife <= 0){ //Boss Enemy Defeated - Explode
                stop = true; //
                theBoss.src =  "assets/images/explode2.png";
                score.innerHTML = parseInt(score.innerHTML) + scorePoints;
                bossMode = false;
                let msg = document.createElement('div');
                msg.classList.add("gameover");
                let msg_content = document.createElement('h1');
                let msg_content2 = document.createElement('h2');
                let img1 = document.createElement('img');
                let img2 = document.createElement('img');
                let img3 = document.createElement('img');
                img1.src = "assets/images/alien1.png";
                img2.src = "assets/images/player.png";
                img3.src = "assets/images/alien2.png";
                msg_content.innerText = "GAME OVER";
                msg_content2.innerText = "Final Score:" + parseInt(score.innerText);
                msg.appendChild(msg_content);
                msg.appendChild(img1);
                msg.appendChild(img2);
                msg.appendChild(img3);
                msg.appendChild(msg_content2);
                space_area.appendChild(msg);
                
            }
        }

        if (xPosition === 500) {
          laser.remove();
        } else {
          laser.style.left = `${xPosition + 4}px`
        }
      }, 10)
}  

function createEnemy(){
  //Spawn BOSS
//   console.log(parseInt(score.innerHTML));
  if(parseInt(score.innerHTML) === 1500){
    stop = false;
    bossMode= true;
    scorePoints = 500;
    let theEnemies = document.querySelectorAll(".enemies");
    theEnemies.forEach(enemy => {
        enemy.remove();
    })

    let bossEnemy = document.createElement('img');
    let enemyImage = enemy[Math.floor(Math.random()*4)];
    bossEnemy.src = enemyImage;
    bossEnemy.classList.add("boss");
    bossEnemy.style.left ='400';
    bossEnemy.style.top = `${Math.floor(Math.random() * 200) + 30}px`;
    space_area.appendChild(bossEnemy);
    moveBoss(bossEnemy);

  }
  else{
    bossLife = 5000;
    let newEnemy = document.createElement('img');
    let enemyImage = enemy[Math.floor(Math.random()*4)]; // Random enemy spawn
    newEnemy.src = enemyImage;
    newEnemy.classList.add("enemies");
    newEnemy.style.left="370";
    newEnemy.style.top = `${Math.floor(Math.random() * 330) + 30}px`;
    space_area.appendChild(newEnemy);
    moveEnemy(newEnemy);
    scorePoints = 100;
  }
    
}
//function that lets the boss move up and down
function moveBoss(bossEnemy){
    let direction = true;
    let enemyInterval = setInterval(() => {
    let yPosition = parseInt(window.getComputedStyle(bossEnemy).getPropertyValue('top'));
    // console.log(yPosition);
    if(yPosition == 0){
        direction = false;
    }
    else if(yPosition == 225){
        direction = true;
    }
    if(stop){
        //  bossEnemy.remove();  
    }
    else{
        if(direction){ //Boss Enemy Direction
            bossEnemy.style.top = `${yPosition - 1}px`;
        }
        else{
            bossEnemy.style.top = `${yPosition + 1}px`;
        }

        if(yPosition % 10 === 0){
            enemyLaser(bossEnemy);
        }
    }
    
 
}, 30)
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
//Check Collision 
function checkLaserCollision(laser, monster) {
    let laserLeft = parseInt(laser.style.left);
    let laserTop = parseInt(laser.style.top);
    let laserBottom = laserTop - 20;
    let monsterTop = parseInt(monster.style.top);
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

function enemyLaser(bossEnemy){
    let laser = createEnemyLaser(bossEnemy);
    space_area.appendChild(laser);
    moveEnemyLaser(laser);
}

function createEnemyLaser(bossEnemy){
    // const boss_enemy = document.getElementsByClassName("boss");
    // let xPosition = parseInt(boss_enemy.style.left);
    // let yPosition = parseInt(boss_enemy.style.top);
    let xPosition = parseInt(window.getComputedStyle(bossEnemy).getPropertyValue('left'));
    let yPosition = parseInt(window.getComputedStyle(bossEnemy).getPropertyValue('top'));
    let enemyAttack = document.createElement('img');
    enemyAttack.src = "assets/images/explode.png";
    enemyAttack.classList.add('laser_enemy');
    enemyAttack.style.left = `${xPosition - 120}px`;
    enemyAttack.style.top = `${yPosition + 50}px`;
    return enemyAttack;
}

function moveEnemyLaser(laser){
    let laserInterval = setInterval(() => {
        bossLaserCollision(laser);
        let xPosition = parseInt(laser.style.left);
        if (xPosition === 0) {
          laser.remove();
        } else {
          laser.style.left = `${xPosition - 4}px`
        }
      }, 10)
}
//This function checks if the laser fired by the boss hit the player
//
function bossLaserCollision(bossLaser){
    // console.log(bossLaser);
    
    let laserLeft = parseInt(bossLaser.style.left);
    let laserTop = parseInt(bossLaser.style.top);
    let shooterTop = parseInt(window.getComputedStyle(shooter).getPropertyValue('top'))
    let shooterLeft = parseInt(window.getComputedStyle(shooter).getPropertyValue('left'))
    
    // console.log("laser left:" + laserLeft);
    if(shooterLeft == laserLeft && laserTop == shooterTop){
        myLife--;
        console.log("Life =" + myLife);
    }
    
   
}



