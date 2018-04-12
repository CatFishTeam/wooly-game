const MapTile = require('./maptile');
const MapObject = require('./mapobject');
const map = require('../assets/maps/map01');
const onHover = require('../functions/editor/onHover');
const onOut = require('../functions/editor/onOut');
const onClick = require('../functions/editor/onClick');


class IsoGrid {

  constructor(horizontalTiles, verticalTiles, tileWidth, tileHeight, container, textures) {
    this.horizontalTiles = horizontalTiles;
    this.verticalTiles = verticalTiles;
    this.tileWidth = tileWidth;
    this.tileHeight = tileHeight;
    this.container = container;
    this.textures = textures;
  }

  draw() {
    let floorTexture = undefined;
    let objetTexture = undefined;
    let cnt = 0;
    let tilesLine = 1;
    let x = 336;
    let initialX = x;
    let y = 96;
    let tileId = 1;

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

        floorTexture = PIXI.Texture.fromImage('./src/assets/images/' + map.tiles[tileId].firstLayer + '.png');
        floor = new MapTile(floorTexture, tileId, x, y, location, infos);
        floor.interactive = true;
        floor.hitArea = new PIXI.Polygon(new PIXI.Point(-32, 0), new PIXI.Point(0, -16), new PIXI.Point(32, 0), new PIXI.Point(0, 16));
        floor
          .on('pointerover', onHover)
          .on('pointerout', onOut)
          .on('click', onClick);

        this.container.addChild(floor);

        if (map.tiles[tileId].secondLayer !== null) {
          let objet = undefined;

          objetTexture = PIXI.Texture.fromImage('./src/assets/images/' + map.tiles[tileId].secondLayer + '.png');
          objet = new MapObject(objetTexture, tileId, x, y, location, infos);
          objet.alpha = 0.9;

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

        floorTexture = PIXI.Texture.fromImage('./src/assets/images/' + map.tiles[tileId].firstLayer + '.png');
        floor = new MapTile(floorTexture, tileId, x, y, location, infos);
        floor.interactive = true;
        floor.hitArea = new PIXI.Polygon(new PIXI.Point(-32, 0), new PIXI.Point(0, -16), new PIXI.Point(32, 0), new PIXI.Point(0, 16));
        floor
          .on('pointerover', onHover)
          .on('pointerout', onOut)
          .on('click', onClick);

        this.container.addChild(floor);

        if (map.tiles[tileId].secondLayer !== null) {
          let objet = undefined;

          objetTexture = PIXI.Texture.fromImage('./src/assets/images/' + map.tiles[tileId].secondLayer + '.png');
          objet = new MapObject(objetTexture, tileId, x, y, location, infos);
          objet.alpha = 0.9;

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

    // console.log(map.tiles["1"].firstLayer); // => "grass", "water"...
    // console.log(this.container.children[5].constructor.name); // => "MapTile"
    // console.log(this.container.children.filter(child => child.constructor.name === 'MapTile')); // Afficher que les MapTiles

  }

  getWidth() {
    return this.horizontalTiles * this.tileWidth;
  }

  getHeight() {
    return this.verticalTiles * this.tileHeight;
  }
}

module.exports = IsoGrid;
