module.exports = function onOut() {
  this.alpha = 1;
  if (this.hasTooltip) {
    this.tooltip.hide();
  }
};

