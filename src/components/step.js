class Step {
    constructor(x, y, width, height, type, container) {
        this._x = x;
        this._y = y;
        this._width = width;
        this._height = height;
        this._type = type;
        this._container = container;
    }

    draw() {
        let step = new PIXI.Graphics();
        step.beginFill(0xffffff, 0.5);
        step.lineStyle(1, 0x000000, 0.2);
        step.drawRect(this._x, this._y, this._width, this._height);
        this._container.addChild(step);
    }

    /**
     * Getters & setters
     */
    get type() {
        return this._type;
    }

    set type(newType) {
        this._type = newType;
    }

    get height() {
        return this._height;
    }

    set height(value) {
        this._height = value;
    }

    get container() {
        return this._container;
    }

    set container(value) {
        this._container = value;
    }
    get width() {
        return this._width;
    }

    set width(value) {
        this._width = value;
    }
    get y() {
        return this._y;
    }

    set y(value) {
        this._y = value;
    }
    get x() {
        return this._x;
    }

    set x(value) {
        this._x = value;
    }
}

module.exports = Step;
