//Global constants
const ATTACK_VALUE = 10;
const STRONG_ATTACK_VALUE = 17;
const MONSTER_ATTACK_VALUE = 15;
const HEAL_VALUE = 20;

const MODE_ATTACK = "ATTACK"; //const MODE_ATTACK = 0
const MODE_STRONG_ATTACK = "STRONG_ATTACK"; //const MODE_STRONG_ATTACK = 1

const LOG_EVENT_ATTACK = "PLAYER_ATTACK";
const LOG_EVENT_STRONG_ATTACK = "PLAYER_STRONG_ATTACK";
const LOG_EVENT_MONSTER_ATTACK = "MONSTER_ATTACK";
const LOG_EVENT_HEAL = "PLAYER_HEAL";
const LOG_EVENT_GAME_OVER = "GAME_OVER";
const LOG_EVENT_ERROR = "ERROR";

//User input processing
const userEnteredValue = parseInt(
  prompt("Enter the maximum life for you and the monster", "100")
);
const chosenMaxLife = processUserInput(userEnteredValue);

// Global variables
let currentMonsterHealth = chosenMaxLife;
let currentPlayerHealth = chosenMaxLife;
let hasBonusLife = true;
let battleLog = [];
//App intialization fuctions
adjustHealthBars(chosenMaxLife);

//Button listeners
attackBtn.addEventListener("click", attackHandler);
strongAttackBtn.addEventListener("click", strongAttackHandler);
healBtn.addEventListener("click", healPlayerHandler);
logBtn.addEventListener("click", printLogHandler);

//Helper functions
function processUserInput(value) {
  if (isNaN(value) || value <= 0) {
    console.log("User entered an invalid value, we defaluted to 100");
    return 100;
  }

  return value;
  //u slucaju da je korinik unio nevalidnu vrijednost vratiti 100
  //u suprotnom vratiti ono sto je korisnik unio
}

//sta se desilo
//vrijednost
//meta desavanja
//health igraca
//health cudovista

function writeToLog(ev, val) {
  let logEntry;

  if (ev === LOG_EVENT_ATTACK) {
    logEntry = {
      event: LOG_EVENT_ATTACK,
      target: "MONSTER",
      value: val,
      playerHealth: currentPlayerHealth,
      monsterHealth: currentMonsterHealth
    };
  } 
  else if (ev === LOG_EVENT_STRONG_ATTACK) {
    logEntry = {
      event: LOG_EVENT_STRONG_ATTACK,
      target: "MONSTER",
      value: val,
      playerHealth: currentPlayerHealth,
      monsterHealth: currentMonsterHealth
    };
  }
  // dodati to da je napadnut igrac od strane cudovista

  battleLog.push(logEntry);
}

function attackMonster(mode) {
  let maxDamage;
  let logMode;
  if (mode === MODE_ATTACK) {
    maxDamage = ATTACK_VALUE;
    logMode = LOG_EVENT_ATTACK;
  } else if (mode === MODE_STRONG_ATTACK) {
    maxDamage = STRONG_ATTACK_VALUE;
    logMode = LOG_EVENT_STRONG_ATTACK;
  } else {
    console.log("Wrong attackMonster function parameters!");
    logMode = LOG_EVENT_ERROR;
    return;
  }
  const damageDealt = dealMonsterDamage(maxDamage);
  currentMonsterHealth -= damageDealt;
  writeToLog(logMode, damageDealt);
  endRound();
}

function endRound() {
  const initialPlayerHealth = currentPlayerHealth;
  currentPlayerHealth -= dealPlayerDamage(MONSTER_ATTACK_VALUE);
  //pozvati writeToLog i dodati to da je napadnut igrac od strane cudovista
  if (currentPlayerHealth <= 0 && hasBonusLife) {
    hasBonusLife = false;
    removeBonusLife();
    currentPlayerHealth = initialPlayerHealth;
    setPlayerHealth(currentPlayerHealth);
    alert("You used your bonus life!!");
  }

  if (currentMonsterHealth <= 0 && currentPlayerHealth > 0) {
    alert("You won!");
    // dodati event da je game over, value igrac pobjedio -- nema targeta
  } else if (currentPlayerHealth <= 0 && currentMonsterHealth > 0) {
    alert("You lost!");
    // dodati event da je game over, value cudoviste pobjedilo --nema targeta
  } else if (currentPlayerHealth < 0 && currentMonsterHealth <= 0) {
    // dodati event da je game over, rezultat je izjednacen -- nema targeta
    alert("DRAW!");
  }

  if (currentPlayerHealth <= 0 || currentMonsterHealth <= 0) {
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
  attackMonster(MODE_ATTACK);
}

function strongAttackHandler() {
  attackMonster(MODE_STRONG_ATTACK);
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
  // dodati to da se igrac healao u log i za koliko
  endRound();
}

function printLogHandler() {
  console.log(battleLog);
}
