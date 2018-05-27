const MapTile = require('./maptile');
const MapObject = require('./mapobject');
const map = require('../assets/maps/map01');
const onHover = require('../functions/editor/onHover');
const onOut = require('../functions/editor/onOut');
const onClick = require('../functions/editor/onClick');


class IsoGrid {
  constructor(horizontalTiles, verticalTiles, tileWidth, tileHeight, container) {
    this.horizontalTiles = horizontalTiles;
    this.verticalTiles = verticalTiles;
    this.tileWidth = tileWidth;
    this.tileHeight = tileHeight;
    this.container = container;
  }

  draw() {
    let cnt = 0;
    let tilesLine = 1;
    let x = 336;
    let initialX = x;
    let y = 96;
    let tileId = 0;

    // Dessine la partie supérieure de la map
    while (tilesLine <= 9) {
      for (cnt = 0; cnt < tilesLine; cnt++) {
        let location = {
          id: tileId,
          x: x,
          y: y
        };

        let infos = {
          id: tileId,
          x: x,
          y: y,
          tile: map.tiles[tileId].firstLayer,
          object: map.tiles[tileId].secondLayer
        };

        let floor = undefined;

        floor = new MapTile(map.tiles[tileId].firstLayer.texture, tileId, x, y, location, infos);
        floor.interactive = true;
        floor.hitArea = new PIXI.Polygon(new PIXI.Point(-360, 0), new PIXI.Point(0, -200), new PIXI.Point(360, 0), new PIXI.Point(0, 200));
        floor
          .on('pointerover', onHover)
          .on('pointerout', onOut)
          .on('click', onClick);

        this.container.addChild(floor);

        if (map.tiles[tileId].secondLayer !== null) {
          let objet = undefined;

          objet = new MapObject(map.tiles[tileId].secondLayer.texture, tileId, x, y, location, infos);
          this.container.addChild(objet);
        }

        x += 64;
        tileId++;
      }

      x = initialX - 32;
      initialX = x;
      y += 16;
      tilesLine++;
    }

    tilesLine--;

    // Dessine la partie inférieure de la map
    while (tilesLine >= 1) {
      for (cnt = 0; cnt < tilesLine; cnt++) {
        let location = {
          id: tileId,
          x: x,
          y: y
        };

        let infos = {
          id: tileId,
          x: x,
          y: y,
          tile: map.tiles[tileId].firstLayer,
          object: map.tiles[tileId].secondLayer
        };

        floor = new MapTile(map.tiles[tileId].firstLayer.texture, tileId, x, y, location, infos);
        floor.interactive = true;
        floor.hitArea = new PIXI.Polygon(new PIXI.Point(-360, 0), new PIXI.Point(0, -200), new PIXI.Point(360, 0), new PIXI.Point(0, 200));
        floor
          .on('pointerover', onHover)
          .on('pointerout', onOut)
          .on('click', onClick);

        this.container.addChild(floor);

        if (map.tiles[tileId].secondLayer !== null) {
          let objet = undefined;

          objet = new MapObject(map.tiles[tileId].secondLayer.texture, tileId, x, y, location, infos);
          this.container.addChild(objet);
        }

        x += 64;
        tileId++;
      }

      x = initialX + 32;
      initialX = x;
      y += 16;
      tilesLine--;
    }
  }

  getWidth() {
    return this.horizontalTiles * this.tileWidth;
  }

  getHeight() {
    return this.verticalTiles * this.tileHeight;
  }
}

module.exports = IsoGrid;
