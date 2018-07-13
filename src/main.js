// import Vue from 'vue'
// import App from './App.vue'

// new Vue({
//   el: '#app',
//   render: h => h(App)
// })

/**
 * Game code (with Pixi.js as 2D WebGL Renderer)
 * Chargement de Pixi.js et du CSS
 */
require('./assets/scss/app.scss');
require('pixi.js');
let _ = require('lodash');

let logs = [];


/**
 * Composants
 */
const IsoGrid = require('./components/isogrid');
const Step = require('./components/step');
const Trigger = require('./components/trigger');
const Sprite = require('./components/sprite');
const Cat = require('./components/cat');

// Functions

// Map du niveau (JSON)
const map = require('./assets/maps/map01');

// Affiche la version de Pixijs dans la console du navigateur
PIXI.utils.sayHello();

/**
 * App du jeu
 * Dimensions du canvas par défaut: 800 * 600
 */
let app = new PIXI.Application({
  width: 960,
  height: 480,
  resolution: 1,
  transparent: true,
  roundPixels: true
});

// Ajouter le <canvas> du jeu dans la <div id='app'>
document.getElementById('app').appendChild(app.view);

// Création du container global
let container = new PIXI.Container();

// Création du container du niveau
let stage = new PIXI.Graphics();
stage.beginFill(0xffffff);
stage.drawRect(0, 0, 640, (app.renderer.height - 32));

// Création du container du menu de jeu
let menu = new PIXI.Graphics();
menu.beginFill(0xffffff);
menu.drawRect(0, 0, 320, (app.renderer.height - 32));
menu.position.set(640, 0);


// Ajout des sous-containers dans le container global
container.addChild(stage);
container.addChild(menu);


/**
 * Chargement des sprites/images
 */
PIXI.loader
  .add("forward", "./src/assets/images/move.png")
  .add("turnleft", "./src/assets/images/clockwise.png")
  .add("turnright", "./src/assets/images/anticlockwise.png")
  .add("wait", "./src/assets/images/wait.png")
  .add("play", "./src/assets/images/play.png")
  .add("pause", "./src/assets/images/pause.png")
  .add("tooltip", "./src/assets/images/tooltip.png")
  .add("trigger-top", "./src/assets/images/trigger-top.png")
  .add("trigger-bottom", "./src/assets/images/trigger-bottom.png")
  .add("trigger-block-if", "./src/assets/images/trigger-block-if.png")
  .add("trigger-block-while", "./src/assets/images/trigger-block-while.png")
  .add("trigger-block-until", "./src/assets/images/trigger-block-until.png")
  .add("settrigger-top", "./src/assets/images/settrigger-top.png")
  .add("settrigger-bottom", "./src/assets/images/settrigger-bottom.png")
  // Cat character sprites
  .add("catanim1", "./src/assets/images/catanim1.png")
  .add("catanim2", "./src/assets/images/catanim2.png")
  .add("catanim3", "./src/assets/images/catanim3.png")
  .add("catanim4", "./src/assets/images/catanim4.png")
  //  Wool ball
  .add("wool", "./src/assets/images/wool.png")
  // JSON map data
  .add("map", "./src/assets/maps/map01.json")
  // Map textures (tiles & objets)
  // // tiles
  .add("grass", "./src/assets/images/test-grass.png")
  .add("water", "./src/assets/images/test-water.png")
  .add("stone", "./src/assets/images/stone.png")
  .add("sand", "./src/assets/images/sand.png")
  .add("ice", "./src/assets/images/ice.png")
  // // objects
  .add("tree", "./src/assets/images/test-tree.png")
  .add("wall", "./src/assets/images/test-wall.png")
  .add("stone1", "./src/assets/images/stone1.png")
  .add("stone2", "./src/assets/images/stone2.png")
  .add("bush", "./src/assets/images/bush.png")
  .load((loader, resources) => {

    /* here : connect to db to get level */

    const onHover = require('./functions/onHover');
    const onOut = require('./functions/onOut');

    // console.log(resources["map"].data.player);

    let catframes = [];

    for (let i = 1; i < 5; i++) {
      catframes.push(PIXI.Texture.fromFrame('./src/assets/images/catanim'+ i +'.png'));
    }

    // let cat = new PIXI.extras.AnimatedSprite(catframes);
    // cat.animationSpeed = 0.1;
    let cat = new Cat(catframes, 0.1);

    /**
     * La map
     */
    // Dessine la grille sur la map (voir ./components/grid.js)

    let grid = new IsoGrid(10, 14, 64, 32, stage);


    /**
     * Le menu
     */
    // Barre des actions possibles (dans le menu en bas)
    let actions = new PIXI.Container();
    let triggerActions = new PIXI.Container();
    menu.addChild(actions);
    menu.addChild(triggerActions);

    // Actions
    let forward;
    let turnleft;
    let turnright;
    // let wait;
    // Déclencheurs
    let ifTrigger;
    let whileTrigger;
    let untilTrigger;

    // Zone des tooltips
    let gameTooltips = new PIXI.Container();
    menu.addChild(gameTooltips);

    // Barre des steps que le chat fera (dans le menu en haut)
    let stepsArea = new PIXI.Container();
    let steps = new PIXI.Container();
    let triggers = new PIXI.Container();
    let stepsObject = [];
    let triggersObject = [];

    stepsArea.addChild(steps);
    stepsArea.addChild(triggers);

    menu.addChild(stepsArea);
    // On crée 10 steps vides, 5 sur chaque ligne...
    for (let y = 0; y < 2; y++) {
      for (let x = 0; x < 5; x++) {
        let step = new Step(x * 32, (y * 32) + 48, 32, 32, 'empty', steps);
        let trigger = undefined;
        if (y === 0)
          trigger = new Trigger(x * 32, y, 'empty', triggers, 'trigger-top');
        else
          trigger = new Trigger(x * 32, (y * 32) + 80, 'empty', triggers, 'trigger-bottom');
        trigger.tooltip = "Rien pour l'instant";
        gameTooltips.addChild(trigger.tooltip);

        step.draw();

        stepsObject.push(step);
        triggersObject.push(trigger);
      }
    }

    // ... puis on supprime la dernière, pour mettre le bouton PLAY à la place après
    steps.children.pop();
    triggers.children.pop();
    stepsObject.pop();
    triggersObject.pop();

    menu.setChildIndex(stepsArea, 0);

    let gameInstance = undefined;


    /**
     * Map du jeu
     */
    grid.draw();

    cat.anchor.set(0.5, 1);
    // Appelle les données JSON du joueur dans le fichier assets/maps/**.json
    let tiles = stage.children.filter(child => child.type === 'MapTile');
    cat.x = tiles[resources["map"].data.player.originTileId].infos.x;
    cat.y = tiles[resources["map"].data.player.originTileId].infos.y;

    // La pelote de laine
    let wool = new Sprite('wool', 'wool');
    wool.anchor.set(0.5, 0.75);
    wool.x = tiles[resources["map"].data.player.goalTileId].infos.x;
    wool.y = tiles[resources["map"].data.player.goalTileId].infos.y;

    // On ajoute notre chat et la pelote à notre niveau
    stage.addChild(cat);
    stage.addChild(wool);

    /**
     * GAME CODE
     */

    // On positionne les steps en haut et centré dans le menu
    // stepsArea.x = (stepsArea.parent.width / 2) - (stepsArea.width / 2);
    stepsArea.x = 16;
    stepsArea.y = 36;


    // et le bouton Play en bas à gauche des steps
    let play = new Sprite('play', 'play', 128, 80);
    play.x = 128;
    play.y = 80;
    play.interactive = true;
    play.buttonMode = true;
    stepsArea.addChild(play);
    play
      .on('pointerover', onHover)
      .on('pointerout', onOut);
    play.hasTooltip = true;
    play.tooltip = 'Exécute la série des actions en boucle';
    gameTooltips.addChild(play.tooltip);

    // Icones d'action
    forward = new Sprite('forward', 'forward');
    forward.x = 0;
    forward.hasTooltip = true;
    forward.tooltip = 'Fait avancer le chat d\'une case dans sa direction actuelle';
    gameTooltips.addChild(forward.tooltip);

    turnleft = new Sprite('turnleft', 'turnleft', 32);
    turnleft.x = 32;
    turnleft.hasTooltip = true;
    turnleft.tooltip = 'Change la direction du chat de 90° dans le sens des aiguilles d\'une montre';
    gameTooltips.addChild(turnleft.tooltip);

    turnright = new Sprite('turnright', 'turnright', 64);
    turnright.x = 64;
    turnright.hasTooltip = true;
    turnright.tooltip = 'Change la direction du chat de 90° dans le sens inverse des aiguilles d\'une montre';
    gameTooltips.addChild(turnright.tooltip);

    // wait = new Sprite('wait', 'wait', 96);
    // wait.x = 96;
    // wait.hasTooltip = true;
    // wait.tooltip = 'Attend (sert à rien pour l\'instant - ptet à virer)';
    // tooltips.addChild(wait.tooltip);

    actions.addChild(forward, turnleft, turnright);

    // Icones de déclencheurs
    ifTrigger = new Sprite('trigger-block-if', 'trigger-block-if');
    ifTrigger.x = 0;
    ifTrigger.originX = 0;
    ifTrigger.type = 'trigger';
    ifTrigger.hasTooltip = true;
    ifTrigger.tooltip = '"Si" : Exécute l\'action si la condition est vraie';
    gameTooltips.addChild(ifTrigger.tooltip);

    triggerActions.addChild(ifTrigger);

    whileTrigger = new Sprite('trigger-block-while', 'trigger-block-while');
    whileTrigger.x = 32;
    whileTrigger.originX = 32;
    whileTrigger.type = 'trigger';
    whileTrigger.hasTooltip = true;
    whileTrigger.tooltip = '"Pendant" : Exécute l\'action pendant un certain temps';
    gameTooltips.addChild(whileTrigger.tooltip);

    triggerActions.addChild(whileTrigger);

    untilTrigger = new Sprite('trigger-block-until', 'trigger-block-until');
    untilTrigger.x = 64;
    untilTrigger.originX = 64;
    untilTrigger.type = 'trigger';
    untilTrigger.hasTooltip = true;
    untilTrigger.tooltip = '"Tant que" : Exécute l\'action tant que la condition est vraie';
    gameTooltips.addChild(untilTrigger.tooltip);

    triggerActions.addChild(untilTrigger);


    // On positionne notre barre d'actions en bas et centré dans le menu,
    // et la barre des déclencheurs
    // actions.x = (actions.parent.width / 2) - (actions.width / 2);
    actions.x = 32;
    actions.y = actions.parent.height - 198;

    // triggerActions.x = (triggerActions.parent.width / 2) - (triggerActions.width / 2);
    triggerActions.x = 32;
    triggerActions.y = triggerActions.parent.height - 160;

    // On positionne la zone où les tooltips s'afficheront
    gameTooltips.x = 0;
    gameTooltips.y = gameTooltips.parent.height - 64;


    function checkActions() {

      // Pour chacun des boutons d'action, on les rend interactif pour pouvoir les cliquer,
      // drag'n'drop, etc, et on associe ces events aux fonctions dans ./functions
      const onHover = require('./functions/onHover');
      const onOut = require('./functions/onOut');
      const onDragStart = require('./functions/onDragStart');
      const onDragEnd = require('./functions/onDragEnd');
      const onDragMove = require('./functions/onDragMove');
      const onClick = require('./functions/onClick');

      // Boutons d'actions
      for (let action of actions.children) {
        action.interactive = true;
        action.buttonMode = true;
        action.anchor.set(0.5, 0.5);
        action
          .on('pointerover', onHover)
          .on('pointerout', onOut)
          .on('pointerdown', onDragStart)
          .on('pointerup', onDragEnd)
          .on('pointerupoutside', onDragEnd)
          .on('pointermove', onDragMove);
      }

      // Boutons de déclencheurs
      for (let trigger of triggerActions.children) {
        trigger.interactive = true;
        trigger.buttonMode = true;
        trigger.anchor.set(0.5, 0.5);
        trigger
          .on('pointerover', onHover)
          .on('pointerout', onOut)
          .on('pointerdown', onDragStart)
          .on('pointerup', onDragEnd)
          .on('pointerupoutside', onDragEnd)
          .on('pointermove', onDragMove);
      }

      //   Cases de déclencheurs
      triggersObject.filter(triggerObject => {
        triggerObject.interactive = true;
        triggerObject.buttonMode = true;
        triggerObject.on('click', onClick);
      });

    }


    module.exports = {
      app,
      map,
      grid,
      stage,
      actions,
      triggerActions,
      menu,
      stepsArea,
      steps,
      triggers,
      stepsObject,
      triggersObject,
      gameTooltips,
      cat,
      wool,
      gameInstance
    };

    // Quand on clique sur le bouton Play du menu
    let runGame = require('./functions/runGame');
    let gameRunning = false;

    play.click = function () {
      gameRunning = !gameRunning;
      // On lance le jeu SI il y a au moins une step définie avec une action
      if (gameRunning && stepsObject.filter(step => step.type !== 'empty').length > 0) {
        runGame('run');
        play.changeSprite('pause');
      }
      // Sinon, on ne lance pas le jeu, ou on le stoppe s'il était lancé
      else {
        runGame('stop');
        play.changeSprite('play');
      }
      writeLogs();
    };

    // // Pour chacun des boutons d'action et déclencheurs, on les rend interactif pour pouvoir les cliquer,
    // // drag'n'drop, etc, et on associe ces events aux fonctions dans ./functions
    checkActions();

    // Set map id
    document.querySelector('.uniq').addEventListener('click', function () {
      map.id = Math.random().toString(36).substr(2, 9);
      console.log(map.id);
      let renderTexture = PIXI.RenderTexture.create(app.renderer.width, app.renderer.height);
      app.renderer.render(stage, renderTexture);
      let canvas = app.renderer.extract.canvas(renderTexture);
      let img = canvas.toDataURL('image/png');
      // document.querySelector('img.screenshot').src = img;

      // convert base64 to blob
      fetch(img)
        .then(res => res.blob())
        .then(blob => {

          // convert blob to base64
          let reader = new FileReader();
          reader.readAsDataURL(blob);
          reader.onloadend = function() {
            let base64data = reader.result;
            document.querySelector('img.screenshot').src = base64data;
          };

        });

    });


    // Get JSON from map
    document.querySelector('.getJson').addEventListener('click', function () {
      let jsonInput = document.querySelector('.mapjson');
      jsonInput.style.display = 'block';
      jsonInput.value = JSON.stringify(map);
      jsonInput.focus();
      jsonInput.select();
      document.execCommand("copy");
      jsonInput.style.display = 'none';
      alert("json de la map ajouté à ton clipboard mon srab sûr");
    });


    // On lance la fonction loop qui se répètera à chaque frame
    loop();


    /**
     * loop: se répète à chaque frame
     */
    function loop() {
      requestAnimationFrame(loop);
      app.renderer.render(container);
    }

  });


/**
 * Code JS, en dehors de PIXI / du <canvas>
 */

// Affichage des logs (sous le canvas) :
let logsDiv = document.querySelector('#logs');
function writeLogs() {
  logsDiv.innerHTML = '';
  for (let log of logs) {
    let logHtml = document.createElement('div');
    logHtml.setAttribute('class', 'log');
    logHtml.innerHTML = `<div>${log}</div>`;
    logsDiv.appendChild(logHtml);
  }
}

