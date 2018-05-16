export const gridRatio = 16/9;
export const gridWidth = 32;
export const gridHeight = 18;
export const gridWidthPx = 1280;
export const gridHeightPx = 720;
export const tileNumber = gridHeight * gridWidth;

const generateLevelLayouts = () => {
  let array = [];
  for (let i=0; i<tileNumber; i++) {
    array.push(Math.floor(Math.random() * Math.floor(3)));
  }
  return array;
}

export const levelOne = [generateLevelLayouts(), generateLevelLayouts(), generateLevelLayouts()]
