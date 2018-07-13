class Tooltip extends PIXI.Sprite {

  constructor(texture = null, name = '', text = '', originX = 0, originY = 0) {
    super(PIXI.loader.resources[texture].texture);

    this.alpha = 0;
    this._name = name;
    this._originX = originX;
    this._originY = originY;
    this.x = originX;
    this.y = originY;
    this._text = new PIXI.Text(text);
    this._text.x = 10;
    this._text.y = 10;
    this._text.style.fill = '0xffffff';
    this._text.style.fontSize = 14;
    this._text.style.wordWrap = true;
    this._text.style.wordWrapWidth = this.texture.width - 16;
    this.addChild(this._text);
  }

  changeSprite(texture) {
    this.texture = texture;
  }

  show() {
    this.alpha = 1;
  }

  hide() {
    this.alpha = 0;
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

  get text() {
    return this._text;
  }

  set text(value) {
    this._text.text = value;
    this.addChild(this._text);
  }

}

module.exports = Tooltip;
