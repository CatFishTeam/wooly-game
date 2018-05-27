class MapTile extends PIXI.Sprite {
  constructor(texture = null, id = '', originX = 0, originY = 0, location, infos, type = 'MapTile') {
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
}

module.exports = MapTile;
