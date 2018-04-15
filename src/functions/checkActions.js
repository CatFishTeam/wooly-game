let main = require('../main');
let actions = main.actions;
let triggerActions = main.triggerActions;

module.exports = function checkActions() {

  // Pour chacun des boutons d'action, on les rend interactif pour pouvoir les cliquer,
  // drag'n'drop, etc, et on associe ces events aux fonctions dans ./functions
  const onHover = require('./onHover');
  const onOut = require('./onOut');
  const onDragStart = require('./onDragStart');
  const onDragEnd = require('./onDragEnd');
  const onDragMove = require('./onDragMove');

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
};
