class MapTile extends PIXI.Sprite {

  constructor(texture = null, id = '', originX = 0, originY = 0, location, infos, type = 'MapTile', highlight = false, object = null, priority = 1) {
    super(PIXI.loader.resources[texture].texture);
    this.anchor.set(0.5, 0.5);
    this.x = originX;
    this.y = originY;
    this._id = id;
    this._location = location;
    this._infos = infos;
    this.height = 40;
    this.width = 64;
    this._type = type;
    this._highlight = highlight;
    this._object = object;
    this._priority = priority;
  }

  changeSprite(texture) {
    this.texture = PIXI.loader.resources[texture].texture;
  }

  highlightOn() {
    this.tint = 0xfad390;
  }

  highlightOff() {
    this.tint = 0xffffff;
  }

  get id() {
    return this._id;
  }

  set id(value) {
    this._id = value;
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

  get location() {
    return this._location;
  }

  set location(value) {
    this._location = value;
  }

  get infos() {
    return this._infos;
  }

  set infos(value) {
    this._infos = value;
  }

  get type() {
    return this._type;
  }

  set type(value) {
    this._type = value;
  }

  get highlight() {
    return this._highlight;
  }

  set highlight(value) {
    this._highlight = value;
  }

  get object() {
    return this._object;
  }

  set object(value) {
    this._object = value;
  }

  get priority() {
    return this._priority;
  }

  set priority(value) {
    this._priority = value;
  }
}

module.exports = MapTile;
