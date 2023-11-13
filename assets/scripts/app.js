const ATTACK_VALUE = 10;
const STRONG_ATTACK_VALUE = 17;
const MONSTER_ATTACK_VALUE = 15;

let chosenMaxLife = 100;

let currentMonsterHealth = chosenMaxLife;
let currentPlayerHealth = chosenMaxLife;

//App intialization fuctions
adjustHealthBars(chosenMaxLife);

//Button listeners
attackBtn.addEventListener("click", attackHandler);
strongAttackBtn.addEventListener("click", strongAttackHandler);

//Helper functions
function attackMonster(mode) {
  let maxDamage;
  if (mode === "ATTACK") {
    maxDamage = ATTACK_VALUE;
  } else if (mode === "STRONG_ATTACK") {
    maxDamage = STRONG_ATTACK_VALUE;
  }else{
    console.log("Wrong attackMonster function parameters!")
    return;
  }

  currentMonsterHealth -= dealMonsterDamage(attackDamage);
  currentPlayerHealth -= dealPlayerDamage(MONSTER_ATTACK_VALUE);

  if (currentMonsterHealth <= 0 && currentPlayerHealth > 0) {
    alert("You won!");
  } else if (currentPlayerHealth <= 0 && currentMonsterHealth > 0) {
    alert("You lost!");
  } else if (currentPlayerHealth < 0 && currentMonsterHealth <= 0) {
    alert("DRAW!");
  }
}

//Listener functions
function attackHandler() {
  attackMonster("ATTACK");
}

//Listener functions
function strongAttackHandler() {
  attackMonster("STRONG_ATTACK");
}