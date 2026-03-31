import {
  BRICK_AREA_OFFSET_X,
  BRICK_AREA_OFFSET_Y,
  cell,
  columns,
  rows,
  canvasWidth,
} from './gameState.ts';

export const BRICK_COLOR_CENTER = '#d9f99d';
export const BRICK_COLOR_MIDDLE_RING = '#f43f5e';
export const BRICK_COLOR_OUTER_RING = '#9ca3af';
export const BRICK_COLOR_DEFAULT = '#22c55e';

export const BRICK_SCORE_CENTER = 5;
export const BRICK_SCORE_MIDDLE_RING = 3;
export const BRICK_SCORE_OUTER_RING = 2;
export const BRICK_SCORE_DEFAULT = 1;

// Distance-band ratios relative to the shorter grid side.
// Increase these values to make each scoring zone wider.
export const BRICK_CENTER_RADIUS_RATIO = 0.1;
export const BRICK_MIDDLE_RADIUS_RATIO = 0.2;
export const BRICK_OUTER_RADIUS_RATIO = 0.32;

export type Brick = {
  x: number;
  y: number;
  width: number;
  height: number;
  color: string;
  points: number;
};

export let bricks: Brick[] = [];

function getBrickTier(row: number, column: number) {
  const centerRow = (rows - 1) / 2;
  const centerColumn = (columns - 1) / 2;
  const rowDistance = row - centerRow;
  const columnDistance = column - centerColumn;
  const distanceFromCenter = Math.hypot(rowDistance, columnDistance);

  const shortestGridSide = Math.min(rows, columns);
  const centerRadius = shortestGridSide * BRICK_CENTER_RADIUS_RATIO;
  const middleRingRadius = shortestGridSide * BRICK_MIDDLE_RADIUS_RATIO;
  const outerRingRadius = shortestGridSide * BRICK_OUTER_RADIUS_RATIO;

  if (distanceFromCenter <= centerRadius) {
    return { color: BRICK_COLOR_CENTER, points: BRICK_SCORE_CENTER };
  }

  if (distanceFromCenter <= middleRingRadius) {
    return { color: BRICK_COLOR_MIDDLE_RING, points: BRICK_SCORE_MIDDLE_RING };
  }

  if (distanceFromCenter <= outerRingRadius) {
    return { color: BRICK_COLOR_OUTER_RING, points: BRICK_SCORE_OUTER_RING };
  }

  return { color: BRICK_COLOR_DEFAULT, points: BRICK_SCORE_DEFAULT };
}

export function initializeBricks() {
  bricks = [];

  const startX = BRICK_AREA_OFFSET_X;
  const startY = BRICK_AREA_OFFSET_Y;
  const availableWidth = canvasWidth - BRICK_AREA_OFFSET_X * 2;
  const totalHorizontalSpacing = cell.marginLeftRight * (columns - 1);
  const cellWidth = (availableWidth - totalHorizontalSpacing) / columns;

  for (let i = 0; i < rows; i++) {
    for (let j = 0; j < columns; j++) {
      const tier = getBrickTier(i, j);

      bricks.push({
        x: startX + (j * (cellWidth + cell.marginLeftRight)),
        y: startY + (i * (cell.height + cell.marginTop)),
        width: cellWidth,
        height: cell.height,
        color: tier.color,
        points: tier.points,
      });
    }
  }
}

export function removeBrickAtIndex(index: number) {
  bricks.splice(index, 1);
}
