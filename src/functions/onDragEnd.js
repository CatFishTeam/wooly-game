let main = require('../main');
let steps = main.steps;
let stepsObject = main.stepsObject;
let triggers = main.triggers;
let triggersObject = main.triggersObject;
let stepsArea = main.stepsArea;
let actions = main.actions;
let triggerActions = main.triggerActions;
// let checkActions = main.checkActions;

module.exports = function onDragEnd() {
  if (this.picked) {

    let onStep = false;
    let theStep;
    let theIndex;
    let previousStep;
    let point;

    if (this.data !== null && this.type === 'action') {
      for (let [index, step] of steps.children.entries()) {
        point = this.data.global;
        // Si on est au-dessus d'une case vide, on met l'action dessus
        if (point && step.getBounds().contains(point.x, point.y)) {
          if (stepsObject[index].type === 'empty' && (step.tint).toString(16) === 'ff00') {
            theStep = step;
            theIndex = index;
            onStep = true;
            break;
          }
        }
      }
    } else if (this.data !== null && this.type === 'trigger') {
      for (let [index, trigger] of triggers.children.entries()) {
        let point = this.data.global;
        // Si on est au-dessus d'une case vide, on met l'action dessus
        if (trigger.containsPoint(point)) {
          if (triggersObject[index].type === 'empty' && trigger.alpha === 0.5) {
            theStep = trigger;
            theIndex = index;
            onStep = true;
            if (trigger.originY === 0) {
              trigger.originY -= 32;
              trigger.texture = "settrigger-top";
            } else {
              trigger.originY += 1;
              trigger.texture = "settrigger-bottom";
            }
            break;
          }
        }
      }
    }


    //  Si cette action / trigger était déjà posé sur une step
    if (this.onStep) {
      previousStep = this.currentStep;
      if (this.type === 'action') stepsObject[previousStep].type = 'empty';
      else {
        triggersObject[previousStep].type = 'empty';
        if (triggers.children[previousStep].originY === -32) {
          triggers.children[previousStep].originY += 32;
          triggers.children[previousStep].texture = "trigger-top";
        } else {
          triggers.children[previousStep].originY -= 1;
          triggers.children[previousStep].texture = "trigger-bottom";
        }
      }
    }

    if (onStep) {
      this.setParent(stepsArea);
      this.anchor.set(0);
      if (this.type === 'action') {
        stepsObject[theIndex].type = this.name;
        theStep.tint = 0xffffff;
        this.x = theStep.getLocalBounds().x;
        this.y = theStep.getLocalBounds().y;
      } else {
        triggersObject[theIndex].type = this.name;
        theStep.alpha = 1;
        this.x = theStep.x;
        if (triggers.children[theIndex].originY === -32)
          this.y = theStep.y + 40;
        else
          this.y = theStep.y + 8;
      }

      this.onStep = true;
      this.currentStep = theIndex;
    } else {
      if (this.type === 'action') this.setParent(actions);
      else this.setParent(triggerActions);
      this.anchor.set(0.5);
      this.x = this.originX;
      this.y = this.originY;
      this.onStep = false;
    }

    // checkActions();
    this.picked = false;
    this.alpha = 1;
    this.dragging = false;
    this.data = null;
  }
};
