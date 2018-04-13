let main = require('../main');
let steps = main.steps;
let stepsObject = main.stepsObject;
let triggers = main.triggers;
let triggersObject = main.triggersObject;
let stepsArea = main.stepsArea;
let actions = main.actions;
let triggerActions = main.triggerActions;

module.exports = function onDragEnd() {
  if (this.picked) {

    console.log(triggersObject);
    let onStep = false;
    let theStep;
    let theIndex;
    let previousStep;
    let point;

    if (this.data !== null && this.type === 'action') {
      for (let [index, step] of steps.children.entries()) {
        point = this.data.global;
        console.log(point.x + ' ' + point.y);
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
        console.log(point.x + ' ' + point.y);
        // Si on est au-dessus d'une case vide, on met l'action dessus
        if (trigger.containsPoint(point)) {
          if (triggersObject[index].type === 'empty' && trigger.alpha === 0.5) {
            theStep = trigger;
            theIndex = index;
            onStep = true;
            console.log(theStep);
            break;
          }
        }
      }
    }


    //  Si cette action / trigger était déjà posé sur une step
    if (this.onStep) {
      previousStep = this.currentStep;
      if (this.type === 'action') stepsObject[previousStep].type = 'empty';
      else triggersObject[previousStep].type = 'empty';
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
        this.y = theStep.y + 8;
      }
      console.log('xy');
      console.log(theStep.x);
      console.log(theStep.y);
      console.log('local bounds');
      console.log(theStep.getLocalBounds().x);
      console.log(theStep.getLocalBounds().y);
      console.log('bounds');
      console.log(theStep.getBounds().x);
      console.log(theStep.getBounds().y);
      console.log('global pos');
      console.log(theStep.getGlobalPosition());
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

    this.picked = false;
    this.alpha = 1;
    this.dragging = false;
    this.data = null;
  }
};
