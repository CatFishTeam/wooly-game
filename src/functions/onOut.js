module.exports = function onOut() {
  this.alpha = 1;
  if (this.hasTooltip) {
    this.tooltip.hide();
  }

  // Si on ne survole plus un déclencheur
  /*if (this.name === "trigger-block-if" && this.onStep && !focusPopup) {
    console.log(checkPopup());
    popup.style.display = 'none';
  }*/
};

