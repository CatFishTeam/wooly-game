module.exports = function onOut() {
  if (this.object) {
    this.object.alpha = 0.9;
  }
  if (!this.highlight) {
    this.tint = 0xffffff;
  }
  if (this.hasTooltip) {
    this.tooltip.hide();
  }
};
