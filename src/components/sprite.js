let Tooltip = require('./tooltip');

class Sprite extends PIXI.Sprite {

  constructor(texture = null, name = '', originX = 0, originY = 0, onStep = false, currentStep = null, hasTooltip = false, tooltip = '', type = 'action', picked = false, editorId = null, highlight = false) {
    super(PIXI.loader.resources[texture].texture);

    this._name = name;
    this._originX = originX;
    this._originY = originY;
    this._onStep = onStep;
    this._currentStep = currentStep;
    this._hasTooltip = hasTooltip;
    this._tooltip = new Tooltip('tooltip', 'tooltip', tooltip);
    this._tooltip.alpha = 0;
    this._type = type;
    this._picked = picked;
    this._editorId = editorId;
    this._highlight = highlight;
  }

  changeSprite(texture) {
    this.texture = PIXI.loader.resources[texture].texture;
  }

  get name() {
    return this._name;
  }

  set name(value) {
    this._name = value;
  }

  get originY() {
    return this._originY;
  }

  set originY(value) {
    this._originY = value;
  }
  get originX() {
    return this._originX;
  }

  set originX(value) {
    this._originX = value;
  }

  get onStep() {
    return this._onStep;
  }

  set onStep(value) {
    this._onStep = value;
  }

  get currentStep() {
    return this._currentStep;
  }

  set currentStep(value) {
    this._currentStep = value;
  }

  get hasTooltip() {
    return this._hasTooltip;
  }

  set hasTooltip(value) {
    this._hasTooltip = value;
  }

  get tooltip() {
    return this._tooltip;
  }

  set tooltip(value) {
    this._tooltip = new Tooltip('tooltip', 'tooltip', value);
  }

  get type() {
    return this._type;
  }

  set type(value) {
    this._type = value;
  }

  get picked() {
    return this._picked;
  }

  set picked(value) {
    this._picked = value;
  }

  get editorId() {
    return this._editorId;
  }

  set editorId(value) {
    this._editorId = value;
  }

  get highlight() {
    return this._highlight;
  }

  set highlight(value) {
    this._highlight = value;
  }
}

module.exports = Sprite;
