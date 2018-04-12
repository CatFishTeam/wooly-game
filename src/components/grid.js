class Grid {
  // Properties
  constructor(horizontalTiles, verticalTiles, tileWidth, tileHeight, container) {
    this.horizontalTiles = horizontalTiles;
    this.verticalTiles = verticalTiles;
    this.tileWidth = tileWidth;
    this.tileHeight = tileHeight;
    this.container = container;
  }
  // Methods
  draw() {

    for (let y = 0; y < this.verticalTiles; y++) {
      for (let x = 0; x < this.horizontalTiles; x++) {
        let tile = new PIXI.Graphics();
        tile.lineStyle(1, 0x000000, 0.2);
        tile.drawRect(0, 0, this.tileWidth, this.tileHeight);
        tile.position.set(x * this.tileWidth, y * this.tileHeight);
        this.container.addChild(tile);
      }
    }

    console.log(`Grille de ${this.horizontalTiles} sur ${this.verticalTiles}`);
  }

  getWidth() {
    return this.horizontalTiles * this.tileWidth;
  }

  getHeight() {
    return this.verticalTiles * this.tileHeight;
  }
}

module.exports = Grid;
