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
let triggers = main.triggers;
let triggersObject = main.triggersObject;
let cat = main.cat;
let gameInstance = main.gameInstance;
let animInstance = undefined;

// Données JSON de la map
let map = main.map;

let cnt = 0;
let triggerWhileCounter = 0;
let preventCntProgress = false;
let timeOut = null;
let catDirection = map.player.originDirection;
let DIRECTION = {
  x: 0,
  y: 0
};
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
    triggerWhileCounter = 0;
    preventCntProgress = false;
    catDirection = map.player.originDirection;

    console.log("Game running");

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

  triggers.children.filter(trigger => {
    trigger.tint = 0xffffff;
  });

  steps.children[cnt].tint = 0xd7e5b0;
  triggers.children[cnt].tint = 0xd7e5b0;

  if (checkTrigger()) {
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
  }

  if (isOnMap(cat.x, cat.y) > 0) {

    updateCounter();

    if (stepsObject[cnt].type !== 'empty' && !stopped) {
      timeOut = setTimeout(() => {
        if (!gameInstance) {
          gameInstance = requestAnimationFrame(readSteps);
        }
      }, 50);
    } else if (stepsObject[cnt].type === 'empty' && !stopped) {
      if (!gameInstance) {
        gameInstance = requestAnimationFrame(readSteps);
      }
    }

  }

}

function checkTrigger() {
  checkDirection();
  // S'il n'y a pas de trigger pour cette action : on skip
  if (triggersObject[cnt].condition === null) {
    return true;
  } else {
    // Trigger 'Si' :
    if (triggersObject[cnt].type === 'trigger-block-if') {
      let subject = triggersObject[cnt].condition.subject;
      let verb = triggersObject[cnt].condition.verb;
      let complement = triggersObject[cnt].condition.complement;
      let currentTile;

      if (verb === 'on' || verb === 'not-on') { currentTile = whatTile(cat.x, cat.y); }

      if (verb === 'before' || verb === 'not-before') { currentTile = whatTile(cat.x + DIRECTION.x, cat.y + DIRECTION.y); }

      if (verb === 'after' || verb === 'not-after') { currentTile = whatTile(cat.x - DIRECTION.x, cat.y - DIRECTION.y); }

      if (verb === 'left' || verb === 'not-left') {
        if (catDirection === 'south') { currentTile = whatTile(cat.x + 32, cat.y - 16); }

        if (catDirection === 'west') { currentTile = whatTile(cat.x + 32, cat.y + 16); }

        if (catDirection === 'north') { currentTile = whatTile(cat.x - 32, cat.y + 16); }

        if (catDirection === 'east') { currentTile = whatTile(cat.x - 32, cat.y - 16); }
      }

      if (verb === 'right' || verb === 'not-right') {
        if (catDirection === 'south') { currentTile = whatTile(cat.x - 32, cat.y + 16); }

        if (catDirection === 'west') { currentTile = whatTile(cat.x - 32, cat.y - 16); }

        if (catDirection === 'north') { currentTile = whatTile(cat.x + 32, cat.y - 16); }

        if (catDirection === 'east') { currentTile = whatTile(cat.x + 32, cat.y + 16); }
      }

      // Si c'est une phrase affirmative :
      if (!triggersObject[cnt].condition.negative) {
        return (currentTile.infos.tile.texture === complement || (currentTile.infos.object && currentTile.infos.object.texture === complement));
      }
      // Sinon, une phrase négative :
      else {
        return (currentTile.infos.tile.texture !== complement && ((!currentTile.infos.object) || (currentTile.infos.object && currentTile.infos.object.texture !== complement)));
      }
    }

    //  Trigger 'Pendant' :
    else if (triggersObject[cnt].type === 'trigger-block-while') {
      let duration = triggersObject[cnt].condition.duration;
      if (triggerWhileCounter < duration) {
        triggerWhileCounter++;
        preventCntProgress = true;
        return true;
      } else {
        triggerWhileCounter = 0;
        preventCntProgress = false;
        return false;
      }
    }

    // Trigger 'Tant que' :
    else if (triggersObject[cnt].type === 'trigger-block-until') {
      let subject = triggersObject[cnt].condition.subject;
      let verb = triggersObject[cnt].condition.verb;
      let complement = triggersObject[cnt].condition.complement;
      let currentTile;

      if (verb === 'on' || verb === 'not-on') { currentTile = whatTile(cat.x, cat.y); }

      if (verb === 'before' || verb === 'not-before') { currentTile = whatTile(cat.x + DIRECTION.x, cat.y + DIRECTION.y); }

      if (verb === 'after' || verb === 'not-after') { currentTile = whatTile(cat.x - DIRECTION.x, cat.y - DIRECTION.y); }

      if (verb === 'left' || verb === 'not-left') {
        if (catDirection === 'south') { currentTile = whatTile(cat.x + 32, cat.y - 16); }

        if (catDirection === 'west') { currentTile = whatTile(cat.x + 32, cat.y + 16); }

        if (catDirection === 'north') { currentTile = whatTile(cat.x - 32, cat.y + 16); }

        if (catDirection === 'east') { currentTile = whatTile(cat.x - 32, cat.y - 16); }
      }

      if (verb === 'right' || verb === 'not-right') {
        if (catDirection === 'south') { currentTile = whatTile(cat.x - 32, cat.y + 16); }

        if (catDirection === 'west') { currentTile = whatTile(cat.x - 32, cat.y - 16); }

        if (catDirection === 'north') { currentTile = whatTile(cat.x + 32, cat.y - 16); }

        if (catDirection === 'east') { currentTile = whatTile(cat.x + 32, cat.y + 16); }
      }

      // Si c'est une phrase affirmative :
      if (!triggersObject[cnt].condition.negative) {
        if (currentTile.infos.tile.texture === complement || (currentTile.infos.object && currentTile.infos.object.texture === complement)) {
          preventCntProgress = true;
          return true;
        } else {
          preventCntProgress = false;
          return false;
        }
      }
      // Sinon, une phrase négative :
      else {
        if (currentTile.infos.tile.texture !== complement && ((!currentTile.infos.object) || (currentTile.infos.object && currentTile.infos.object.texture !== complement))) {
          preventCntProgress = true;
          return true;
        } else {
          preventCntProgress = false;
          return false;
        }
      }

    }
  }
}

function checkDirection() {
  switch(catDirection) {
    case 'south':
      DIRECTION.x = 32;
      DIRECTION.y = 16;
      break;
    case 'west':
      DIRECTION.x = -32;
      DIRECTION.y = 16;
      break;
    case 'north':
      DIRECTION.x = -32;
      DIRECTION.y = -16;
      break;
    case 'east':
      DIRECTION.x = 32;
      DIRECTION.y = -16;
      break;
    default: break;
  }
}

function updateCounter() {
  if (!preventCntProgress) {
    cnt++;
  }
  if (cnt === 9) cnt = 0;
}

function moveForward() {
  cat.play();

  if (isDeadly(cat.x, cat.y) > 0) {
    alert("lose");
    stopGame();

    return;
  }

  // TODO
  // NIVEAU VALIDE DANS LE JEU : ON INSERE EN BDD UNE VICTOIRE DE PLUS SUR CE NIVEAU
  // + LA SOLUTION DU JOUEUR EN JSON
  if (isEndGame(cat.x, cat.y) > 0) {

    let validateLevel = confirm("Bravo, vous avez réussi votre niveau ! Souhaitez-vous valider sa création ?");
    if (validateLevel) {
      // slug / id de la map
      map.id = Math.random().toString(36).substr(2, 9);
      // nom de la map
      let mapName = prompt("Donnez un nom à votre niveau :");
      // screenshot de la map
      let renderTexture = PIXI.RenderTexture.create(app.renderer.width, app.renderer.height);
      app.renderer.render(stage, renderTexture);
      let canvas = app.renderer.extract.canvas(renderTexture);
      // convertit le rendu en une image base64
      let screenshot = canvas.toDataURL('image/png');

      const user_id = 1;
      const slug = map.id;
      const name = mapName;
      const data = JSON.stringify(map);
      const best = 'notyet';
      const played = 0;
      const won = 0;
      const created_at = new Date();
      const updated_at = new Date();
      post('/createLevel', { user_id, slug, name, data, best, played, won, created_at, updated_at, screenshot });
    }

    stopGame();
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

  // if (isDeadly(cat.x, cat.y) > 0) {
  //   stopGame();
  // }

}

function moveTo(originCatX, originCatY, x, y) {
  // let catCurrentTile = whatTile(x, y);
  // console.log(catCurrentTile.id);
  // console.log(grid.container.children);
  // let catIdInGrid = grid.container.children.map(child => child.name).indexOf('cat');
  // console.log(catIdInGrid);
  // reorderInGrid(grid.container.children, catIdInGrid, (catCurrentTile.id + 1));

  let diffX = Math.abs(originCatX - x);
  let diffY = Math.abs(originCatY - y);
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

function whatTile(x, y) {
  return tiles.filter((tile, i) => (_.inRange(tile.location.x, (x-2), (x+2)) && _.inRange(tile.location.y, (y-2), (y+2))))[0];
}

function isOnMap(x, y) {
  return tiles.filter((tile, i) => JSON.stringify(tile.location) === JSON.stringify({id: i, x: x, y: y})).length;
}

function isDeadly(x, y) {
  return tiles.filter((tile, i) => (tile.infos.x === x && tile.infos.y === y && tile.infos.tile.deadly === true)).length;
}

function isAccessible(x, y) {
  return tiles.filter((tile, i) => ((tile.infos.x === x && tile.infos.y === y) && (tile.infos.object === null || (tile.infos.object !== null && tile.infos.object.accessible === true)))).length;
}

function isEndGame(x, y) {
  let tile = whatTile(x, y);
  return tile.id === map.player.goalTileId;
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

function reorderInGrid(arr, from, to) {
  arr.splice(to, 0, arr.splice(from, 1)[0]);
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
  triggers.children.filter(trigger => {
    trigger.tint = 0xffffff;
  });
  console.log('game stopped');
}


// Fonction d'envoi POST du level une fois validé
function post(path, data) {
  return window.fetch(path, {
    method: 'POST',
    headers: {
      'Accept': 'application/json',
      'Content-Type': 'application/json'
    },
    body: JSON.stringify(data)
  })
}
