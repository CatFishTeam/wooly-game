let Tooltip = require('./tooltip');

class Trigger extends PIXI.Sprite {

  constructor(originX, originY, type, container, texture, tooltip, format = 'trigger', condition = null, highlight = false) {
    super(PIXI.loader.resources[texture].texture);

    this._originX = originX;
    this._originY = originY;
    this.x = originX;
    this.y = originY;
    this._type = type;
    this._container = container;
    this._format = format;
    this._tooltip = new Tooltip('tooltip', 'tooltip', tooltip);
    this._tooltip.alpha = 0;
    this._condition = condition;
    this._highlight = highlight;

    this._container.addChild(this);
  }

  /**
   * Getters & setters
   */
  get originX() {
    return this._originX;
  }

  set originX(value) {
    this.x = value;
    this._originX = value;
  }

  get originY() {
    return this._originY;
  }

  set originY(value) {
    this.y = value;
    this._originY = value;
  }

  get type() {
    return this._type;
  }

  set type(newType) {
    this._type = newType;
  }

  get texture() {
    return this._texture;
  }

  set texture(value) {
    this._texture = PIXI.Texture.from(value);
  }

  get container() {
    return this._container;
  }

  set container(value) {
    this._container = value;
  }

  get tooltip() {
    return this._tooltip;
  }

  set tooltip(value) {
    this._tooltip = new Tooltip('tooltip', 'tooltip', value);
  }

  get format() {
    return this._format;
  }

  set format(value) {
    this._format = value;
  }

  get condition() {
    return this._condition;
  }

  set condition(value) {
    this._condition = value;
  }

  get highlight() {
    return this._highlight;
  }

  set highlight(value) {
    this._highlight = value;
  }

}

module.exports = Trigger;
