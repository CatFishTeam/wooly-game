module.exports = function onOut() {
  this.tint = 0xffffff;
  if (this.hasTooltip) {
    this.tooltip.hide();
  }
};
