import { brickLayoutConfig, colorConfig } from './config.ts';

export let viewHeight = window.innerHeight;
export let viewWidth = window.innerWidth;

export const ballColor = colorConfig.ball;
export const padColor = colorConfig.pad;
export const backgroundColor = colorConfig.background;
export const brickColor = colorConfig.brick;

export const CELL_SIDE_MARGIN_RATIO = brickLayoutConfig.sideMarginRatio;
export const CELL_TOP_MARGIN_RATIO = brickLayoutConfig.topMarginRatio;

export let isPaused = false;

export const pad = {
  x: viewWidth / 2 - 25,
  y: viewHeight - 50,
  width: 100,
  height: 20,
  speed: 4,
};

export const ball = {
  x: viewWidth / 2,
  y: viewHeight / 2,
  radius: 10,
  speed: 5,
  dx: 0,
  dy: 0,
};

export const input = {
  left: false,
  right: false,
};

export const cell = {
  width: brickLayoutConfig.cell.width,
  height: brickLayoutConfig.cell.height,
  marginLeftRight: brickLayoutConfig.cell.marginLeftRight,
  marginTop: brickLayoutConfig.cell.marginTop,
  padding: brickLayoutConfig.cell.padding,
};

export const rows = brickLayoutConfig.rows;
export const columns = brickLayoutConfig.columns;

export function setViewportSize(width: number, height: number) {
  viewWidth = width;
  viewHeight = height;
}

export function setPaused(value: boolean) {
  isPaused = value;
}
