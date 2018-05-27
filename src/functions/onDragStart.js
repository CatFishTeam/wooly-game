const Sprite = require('../components/sprite');

let main = require('../main');
let actions = main.actions;
let triggerActions = main.triggerActions;
let tooltips = main.tooltips;

module.exports = function (event) {
  const onHover = require('./onHover');
  const onOut = require('./onOut');
  const onDragStart = require('./onDragStart');
  const onDragEnd = require('./onDragEnd');
  const onDragMove = require('./onDragMove');

  this.picked = true;
  // Crée une copie de l'action qu'on déplace,
  // pour qu'on puisse en ajouter autant qu'on veut
  let duplicate = new Sprite(this.name, this.name, this.originX, this.originY);
  duplicate.x = this.originX;

  if (this.type === 'trigger') {
    duplicate.type = 'trigger';
  }

  duplicate.interactive = true;
  duplicate.buttonMode = true;
  duplicate
    .on('pointerover', onHover)
    .on('pointerout', onOut)
    .on('pointerdown', onDragStart)
    .on('pointerup', onDragEnd)
    .on('pointerupoutside', onDragEnd)
    .on('pointermove', onDragMove);
  duplicate.anchor.set(0.5, 0.5);

  // Redéfinit le tooltip pour la copie
  switch (duplicate.name) {
    // Actions
    case 'forward':
      duplicate.hasTooltip = true;
      duplicate.tooltip = 'Fait avancer le chat d\'une case dans sa direction actuelle';
      tooltips.addChild(duplicate.tooltip);
      break;
    case 'turnleft':
      duplicate.hasTooltip = true;
      duplicate.tooltip = 'Change la direction du chat de 90° dans le sens des aiguilles d\'une montre';
      tooltips.addChild(duplicate.tooltip);
      break;
    case 'turnright':
      duplicate.hasTooltip = true;
      duplicate.tooltip = 'Change la direction du chat de 90° dans le sens inverse des aiguilles d\'une montre';
      tooltips.addChild(duplicate.tooltip);
      break;
    case 'wait':
      duplicate.hasTooltip = true;
      duplicate.tooltip = 'Attend (sert à rien pour l\'instant - ptet à virer)';
      tooltips.addChild(duplicate.tooltip);
      break;

    // Triggers
    case 'trigger-block-if':
      duplicate.hasTooltip = true;
      duplicate.tooltip = '"Si" : Exécute l\'action liée si la condition est vraie';
      tooltips.addChild(duplicate.tooltip);
      break;
    case 'trigger-block-while':
      duplicate.hasTooltip = true;
      duplicate.tooltip = '"Pendant" : Exécute l\'action pendant un certain temps';
      tooltips.addChild(duplicate.tooltip);
      break;
    case 'trigger-block-until':
      duplicate.hasTooltip = true;
      duplicate.tooltip = '"Tant que" : Exécute l\'action tant que la condition est vraie';
      tooltips.addChild(duplicate.tooltip);
      break;

    default: break;
  }

  // Si c'est une action
  if (this.type === 'action') {
    actions.addChild(duplicate);
  }
  // Sinon, un déclencheur
  else {
    triggerActions.addChild(duplicate);
  }

  this.data = event.data;
  this.alpha = 0.8;
  this.dragging = true;
  this.anchor.set(0.5);
};
