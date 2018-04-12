class MapObject extends PIXI.Sprite {

  constructor(texture = null, id = '', originX = 0, originY = 0, location, infos) {
    super();
    this.texture = texture;
    this.anchor.set(0.5, 0.65);
    this.x = originX;
    this.y = originY;
    this._id = id;
    this._location = location;
    this._infos = infos;
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

}

module.exports = MapObject;
