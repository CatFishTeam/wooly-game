let main = require('../main');
let steps = main.steps;
let stepsObject = main.stepsObject;
let triggers = main.triggers;
let triggersObject = main.triggersObject;

module.exports = function onDragMove() {
  if (this.dragging) {
    // Si action
    if (this.type === 'action') {
      for (let [index, step] of steps.children.entries()) {
        if (stepsObject[index].type === 'empty') {
          if (step.getBounds().contains(this.data.global.x, this.data.global.y)) {
            step.tint = 0x00ff00;
          } else {
            step.tint = 0xffffff;
          }
        }
      }
    }
    // Si déclencheur
    else {
      for (let [index, trigger] of triggers.children.entries()) {
        if (triggersObject[index].type === 'empty') {
          if (trigger.getBounds().contains(this.data.global.x, this.data.global.y)) {
            trigger.alpha = 0.5;
          } else {
            trigger.alpha = 1;
          }
        }
      }
    }

    let newPosition = this.data.getLocalPosition(this.parent);
    this.x = newPosition.x;
    this.y = newPosition.y;
  }
};
