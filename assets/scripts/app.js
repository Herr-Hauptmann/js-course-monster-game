const ATTACK_VALUE = 10;
const STRONG_ATTACK_VALUE = 17;
const MONSTER_ATTACK_VALUE = 15;
const HEAL_VALUE = 20;

const userEnteredValue = parseInt(prompt("Enter the maximum life for you and the monster", "100"));

const chosenMaxLife = processUserInput(userEnteredValue);

let currentMonsterHealth = chosenMaxLife;
let currentPlayerHealth = chosenMaxLife;

//App intialization fuctions
adjustHealthBars(chosenMaxLife);

//Button listeners
attackBtn.addEventListener("click", attackHandler);
strongAttackBtn.addEventListener("click", strongAttackHandler);
healBtn.addEventListener("click", healPlayerHandler);

//Helper functions
function processUserInput(value){
  //u slucaju da je korinik unio nevalidnu vrijednost vratiti 100
  //u suprotnom vratiti ono sto je korisnik unio
}

function attackMonster(mode) {
  let maxDamage;
  if (mode === "ATTACK") {
    maxDamage = ATTACK_VALUE;
  } else if (mode === "STRONG_ATTACK") {
    maxDamage = STRONG_ATTACK_VALUE;
  } else {
    console.log("Wrong attackMonster function parameters!");
    return;
  }

  currentMonsterHealth -= dealMonsterDamage(maxDamage);
  endRound();
}

function endRound() {
  currentPlayerHealth -= dealPlayerDamage(MONSTER_ATTACK_VALUE);
  if (currentMonsterHealth <= 0 && currentPlayerHealth > 0) {
    alert("You won!");
  } else if (currentPlayerHealth <= 0 && currentMonsterHealth > 0) {
    alert("You lost!");
  } else if (currentPlayerHealth < 0 && currentMonsterHealth <= 0) {
    alert("DRAW!");
  }

  if (currentPlayerHealth <= 0 || currentMonsterHealth <= 0){
    reset();
  }
}

function reset() {
  resetGame(chosenMaxLife);
  currentMonsterHealth = chosenMaxLife;
  currentPlayerHealth = chosenMaxLife;
}

//Listener functions
function attackHandler() {
  attackMonster("ATTACK");
}

function strongAttackHandler() {
  attackMonster("STRONG_ATTACK");
}

function healPlayerHandler() {
  let healValue;
  // if(currentPlayerHealth >= chosenMaxLife - HEAL_VALUE)
  if (currentPlayerHealth + HEAL_VALUE >= chosenMaxLife) {
    healValue = chosenMaxLife - HEAL_VALUE;
  } else {
    healValue = HEAL_VALUE;
  }

  increasePlayerHealth(healValue);
  currentPlayerHealth += healValue;
  endRound();
}