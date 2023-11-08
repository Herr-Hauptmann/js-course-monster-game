const ATTACK_VALUE = 10;
const MONSTER_ATTACK_VALUE = 15;
let chosenMaxLife = 100;

let currentMonsterHealth = chosenMaxLife;
let currentPlayerHealth = chosenMaxLife;

//App intialization fuctions
adjustHealthBars(chosenMaxLife);

//Button listeners
attackBtn.addEventListener("click", attackHandler);

//Listener functions
function attackHandler() {
  currentMonsterHealth -= dealMonsterDamage(ATTACK_VALUE);
  currentPlayerHealth -= dealPlayerDamage(MONSTER_ATTACK_VALUE);
  
  if (currentMonsterHealth <= 0 && currentPlayerHealth > 0) {
    alert("You won!");
  } 
  else if (currentPlayerHealth <= 0 && currentMonsterHealth > 0) {
    alert("You lost!");
  }
  else if (currentPlayerHealth <0 && currentMonsterHealth <=0 )
  {
    alert("DRAW!");
  }
}
