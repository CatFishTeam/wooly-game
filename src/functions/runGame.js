/**
* Ce module est appelé quand le joueur clique sur le bouton Play dans un niveau
* */
let main = require('../main');
let grid = main.grid;
let stage = main.stage;
let tiles = stage.children.filter(child => child.type === 'MapTile');
let app = main.app;
let steps = main.steps;
let stepsObject = main.stepsObject;
let cat = main.cat;
let gameInstance = main.gameInstance;
let animInstance = undefined;

// Données JSON de la map
const map = require('../assets/maps/map01');

let cnt = 0;
let timeOut = null;
let catDirection = map.player.originDirection;
let stopped = false;

module.exports = function runGame(action = 'run') {
  // Bouton Stop a été cliqué :
  if (action === 'stop') {
    stopGame();

    cat.x = tiles[map.player.originTileId].infos.x;
    cat.y = tiles[map.player.originTileId].infos.y;
    catDirection = map.player.originDirection;
  }
  // Bouton Play a été cliqué :
  else {
    stopped = false;
    cnt = 0;
    catDirection = map.player.originDirection;

    console.log("Game running");
    // console.log(app.renderer.width);
    // console.log(`${app.renderer.width} et ${app.renderer.height}`);

    if (!gameInstance) {
      requestAnimationFrame(readSteps);
    }
  }
};

function readSteps() {

  gameInstance = undefined;

  if (isOnMap(cat.x, cat.y) === 0) {
    stopGame();
  }

  steps.children.filter(step => {
    step.tint = 0xffffff;
  });

  steps.children[cnt].tint = 0xd7e5b0;

  switch (stepsObject[cnt].type) {
    case 'empty': break;
    case 'forward':
      moveForward();
      break;
    case 'turnleft':
      turnLeft();
      break;
    case 'turnright':
      turnRight();
      break;
    default: break;
  }

  if (isOnMap(cat.x, cat.y) > 0) {

    updateCounter();

    if (stepsObject[cnt].type !== 'empty' && !stopped) {
      timeOut = setTimeout(() => {
        if (!gameInstance)
          gameInstance = requestAnimationFrame(readSteps);
      }, 50);
    } else if (stepsObject[cnt].type === 'empty' && !stopped) {
      if (!gameInstance)
        gameInstance = requestAnimationFrame(readSteps);
    }

  }

}

function updateCounter() {
  cnt++;
  if (cnt === 9) cnt = 0;
}

function moveForward() {
  cat.play();

    if (isDeadly(cat.x, cat.y) > 0) {
        console.log("creve");
        let vid = document.getElementById("myVideo");
        vid.style.display = 'block';
        stopGame();

        vid.play();

        setTimeout(function(){ vid.style.display = 'none'; }, 8000);
        return;
    }

  switch (catDirection) {
    case 'south':
        if (isOnMap(cat.x + 32, cat.y + 16) > 0 && isAccessible(cat.x + 32, cat.y + 16) > 0) {
        moveTo(cat.x, cat.y, cat.x + 32, cat.y + 16);
      } else
        stopGame();
      break;
    case 'west':
        if (isOnMap(cat.x - 32, cat.y + 16) > 0 && isAccessible(cat.x - 32, cat.y + 16) > 0) {
        moveTo(cat.x, cat.y, cat.x - 32, cat.y + 16);
      } else
        stopGame();
      break;
    case 'north':
        if (isOnMap(cat.x - 32, cat.y - 16) > 0 && isAccessible(cat.x - 32, cat.y - 16) > 0) {
        moveTo(cat.x, cat.y, cat.x - 32, cat.y - 16);
      }
      else
        stopGame();
      break;
    case 'east':
        if (isOnMap(cat.x + 32, cat.y - 16) > 0 && isAccessible(cat.x + 32, cat.y - 16) > 0) {
        moveTo(cat.x, cat.y, cat.x + 32, cat.y - 16);
      } else
        stopGame();
      break;
    default: break;
  }

}

function moveTo(originCatX, originCatY, x, y) {
  let diffX = Math.abs(originCatX - x);
  let diffY = Math.abs(originCatY - y);
  // console.log(cat.x + ' ' + x);
  // console.log(cat.y + ' ' + y);
  if (cat.x < x) cat.x += (diffX/40);
  if (cat.x > x) cat.x -= (diffX/40);
  if (cat.y < y) cat.y += (diffY/40);
  if (cat.y > y) cat.y -= (diffY/40);

  if (Math.ceil(cat.x) === x && Math.ceil(cat.y) === y) {
    cat.x = Math.ceil(cat.x);
    cat.y = Math.ceil(cat.y);
    updateCounter();
    readSteps();
  } else {
    animInstance = requestAnimationFrame(function() { moveTo(originCatX, originCatY, x, y) });
  }
}

function isOnMap(x, y) {
    return tiles.filter((tile, i) => JSON.stringify(tile.location) === JSON.stringify({id: (i+1), x: x, y: y})).length;
}

function isDeadly(x, y) {
    return tiles.filter((tile, i) => (tile.infos.x === x && tile.infos.y === y && tile.infos.tile.deadly === true)).length;
}

function isAccessible(x, y) {
    return tiles.filter((tile, i) => ((tile.infos.x === x && tile.infos.y === y) && (tile.infos.object === null || (tile.infos.object !== null && tile.infos.object.accessible === true)))).length;
}

function turnLeft() {
  switch (catDirection) {
    case 'south':
      catDirection = 'west';
      break;
    case 'west':
      catDirection = 'north';
      break;
    case 'north':
      catDirection = 'east';
      break;
    case 'east':
      catDirection = 'south';
      break;
    default: break;
  }
}

function turnRight() {
  switch (catDirection) {
    case 'south':
      catDirection = 'east';
      break;
    case 'west':
      catDirection = 'south';
      break;
    case 'north':
      catDirection = 'west';
      break;
    case 'east':
      catDirection = 'north';
      break;
    default: break;
  }
}

function stopGame() {
  cat.stop();
  cancelAnimationFrame(gameInstance);
  cancelAnimationFrame(animInstance);
  clearTimeout(timeOut);
  stopped = true;
  gameInstance = undefined;
  steps.children.filter(step => {
    step.tint = 0xffffff;
  });
  console.log('game stopped');
}
