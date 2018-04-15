module.exports = function () {
  this.alpha = 0.8;
  if (this.hasTooltip) {
    this.tooltip.show();
  }
  // Si on survole un déclencheur
  /*if (this.name === "trigger-block-if" && this.onStep) {
    document.querySelector('.trigger-choice').style.display = 'block';
    document.querySelector('.trigger-choice').style.left = this.getGlobalPosition().x + 'px';
    document.querySelector('.trigger-choice').style.top = (this.getGlobalPosition().y + 24) + 'px';
  }*/
};
