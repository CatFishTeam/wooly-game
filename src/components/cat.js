class Cat extends PIXI.extras.AnimatedSprite {

  constructor(frames = null, animationSpeed = 0, name = 'cat', originX = 0, originY = 0) {
    super(PIXI.Texture.from(frames));
    this._name = name;
    this._originX = originX;
    this._originY = originY;
    this._frames = frames;
    this._animationSpeed = animationSpeed;
  }

  changeSprite(texture) {
    this.texture = PIXI.loader.resources[texture].texture;
  }


  get frames() {
    return this._frames;
  }

  set frames(value) {
    this._frames = value;
  }

  get animationSpeed() {
    return this._animationSpeed;
  }

  set animationSpeed(value) {
    this._animationSpeed = value;
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

}

module.exports = Cat;
