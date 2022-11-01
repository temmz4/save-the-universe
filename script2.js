let startBtn = document.querySelector('#start-button')
let battleBtn = document.querySelector("#battle-button")
let retreatBtn = document.querySelector("#retreat-button")
let fightPhrase = document.querySelector("#fight-log")


// Build ships
class playerShip {
    static hull = 20;
    static firepower = 5;
    static accuracy = 0.7;
    static attack(ship) {
        let rNum = Math.random();
        let newPhrase = document.createElement('p')
        if (rNum.toFixed(2) < playerShip.accuracy) {
            console.log(`${ship.shipName} HP: ${ship.hull}`);
            console.log(`Your hit chance: ${rNum.toFixed(2)} is lower than your acc!`);
            console.log(`Impact!`);
            ship.hull -= playerShip.firepower;
            newPhrase.innerText = "Impact! " + ship.shipName + " HP: " + ship.hull.toFixed(2)
            fightPhrase.append(newPhrase)
            console.log(`${ship.shipName} HP is: ${ship.hull.toFixed(2)}`);
            return ship.hull;
        } else {
            newPhrase.innerText = `You missed ${ship.shipName}! your aim trash!`
            fightPhrase.append(newPhrase)
            console.log(`You missed the enemy ship ${ship.shipName}...`);
            console.log(`Your hit chance: ${rNum.toFixed(2)} did not go under 0.7.`);
        };
    };
};

// etShip Class

class etShip {
    randomHull = Math.random() * (6 - 3) + 3;
    randomFirepower = Math.random() * (4 - 2) + 2;
    randomAccuracy = Math.random() * (.8 - .6) + .6;
    constructor(name) {
        this.shipName = name;
        this.hull = this.randomHull.toFixed(2);
        this.firepower = this.randomFirepower.toFixed(2);
        this.accuracy = this.randomAccuracy.toFixed(2);
    };
    attack() {
        let newEtPhrase = document.createElement('p')
        let rNum = Math.random();
        if (rNum < this.accuracy) {
            console.log(`The enemy hit chance: ${rNum.toFixed(2)} is under it's acc!`);
            console.log(`Impact!`);
            console.log(`Your HP was: ${playerShip.hull}`);
            playerShip.hull -= this.firepower;
            console.log(`Your HP is: ${playerShip.hull}`);
            newEtPhrase.innerText = "The enemy ship " + this.shipName + " gets a hit! " + "Your HP: " + playerShip.hull
            fightPhrase.append(newEtPhrase)
            return playerShip.hull;
        } else {
            newEtPhrase.innerText = "The enemy ship " + this.shipName + " missed! " + "dump a clip on them!" 
            fightPhrase.append(newEtPhrase)
            console.log(`The enemy ship ${this.shipName} missed!`);
            console.log(`Hit chance: ${rNum.toFixed(2)}`);
            console.log(`Accuracy: ${this.accuracy}`);
        };
    };
};

const enemyFleet = [
    new etShip("vilgax"),
    new etShip("predator"),
    new etShip("extra terrestrial"),
    new etShip("gwen tennyson"),
    new etShip("albedo"),
    new etShip("marvin")];


//battle function
let retreat = false

const battle = function(player, enemy) {
    let newFightPhrase = document.createElement('p')



        do {
                player.attack(enemy);
                if (enemy.hull >= 0) {
                    enemy.attack();
                    if (player.hull >= 0) {
                        player.attack(enemy)
                    } else{
                        newFightPhrase.innerText = "You got done up cuz...try again?"
                        fightPhrase.append(newFightPhrase)
                    }
                } else {
                    newFightPhrase.innerText = "You win! The " + enemy.shipName + "is slept!"
                    fightPhrase.append(newFightPhrase)
                    console.log(`You win! The ${enemy.shipName} is slept.`);
                };
        } while (enemy.hull > 0 && player.hull > 0)
};

const choose = function(){
    let newFightPhrase = document.createElement('p')
    if(prompt(`You slept the enemy ship! Continue?`) === null){
        retreat = true
        newFightPhrase.innerText = "You don't want no more wreck. try again?"
        fightPhrase.append(newFightPhrase)
    }else{
        retreat = false
    }
}
// selectEnemy function is for itterating through the enemy fleet
const selectEnemy = function(player, enemy){
    for (let i = 0; i < enemyFleet.length; i++){
        battle(playerShip, enemyFleet[i]);
        choose();
        retreatBtn.classList.add("retreat")
        retreatBtn.classList.remove("hide")
        if (retreat === true){
            return
        };
    };
};
    
startBtn.addEventListener('click', ()=>{
    startBtn.classList.add("hide");
    startBtn.classList.remove("start");

    battleBtn.classList.add("battle");
    battleBtn.classList.remove("hide");
});

battleBtn.addEventListener('click', ()=>{
    selectEnemy(playerShip, enemyFleet);
});


retreatBtn.addEventListener('click', ()=>{
    retreat = true
})






