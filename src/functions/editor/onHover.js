module.exports = function () {
  if (this.object) {
    this.object.alpha = 0.5;
  }
  if (!this.highlight) {
    this.tint = 0xfad390;
  }
  if (this.hasTooltip) {
    this.tooltip.show();
  }
};
