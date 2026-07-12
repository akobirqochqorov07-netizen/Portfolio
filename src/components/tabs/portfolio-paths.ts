export type TraceDef = { d: string; width: number; delay: number };

type Point = { x: number; y: number };

const R = 2;

function elbow(from: Point, to: Point): string {
  const mid: Point = { x: from.x, y: to.y };
  const dx = to.x - mid.x;
  const dy = to.y - from.y;
  const sx = dx >= 0 ? R : -R;
  const sy = dy >= 0 ? R : -R;

  if (Math.abs(from.x - to.x) < 0.5) {
    return `L ${to.x},${to.y}`;
  }
  if (Math.abs(from.y - to.y) < 0.5) {
    return `L ${to.x},${to.y}`;
  }

  return `L ${from.x},${to.y - sy} Q ${from.x},${to.y} ${from.x + sx},${to.y} L ${to.x},${to.y}`;
}

/** Clean orthographic route — blueprint style */
export function buildConstructionRoute(from: Point, to: Point, offset = 0): string {
  const f = { x: from.x + offset, y: from.y + offset * 0.3 };
  const t = { x: to.x + offset * 0.5, y: to.y };
  const mid: Point = { x: f.x + (t.x - f.x) * 0.55, y: f.y };
  return `M ${f.x},${f.y} L ${mid.x},${mid.y} ${elbow({ x: mid.x, y: mid.y }, t)}`;
}

export function buildTracesBetween(from: Point, to: Point, count = 2): TraceDef[] {
  return Array.from({ length: count }, (_, i) => ({
    d: buildConstructionRoute(from, to, (i - (count - 1) / 2) * 1.2),
    width: i === 0 ? 0.55 : 0.3,
    delay: i * 0.06,
  }));
}

/** Frame built corner-by-corner: top edge → right → bottom → left → inner */
export function buildRectFramePaths(
  x: number,
  y: number,
  w: number,
  h: number,
  inset = 0
): TraceDef[] {
  const ix = x + inset;
  const iy = y + inset;
  const iw = w - inset * 2;
  const ih = h - inset * 2;
  const r = Math.min(3.5, iw / 10, ih / 10);

  const tl = { x: ix + r, y: iy };
  const tr = { x: ix + iw - r, y: iy };
  const br = { x: ix + iw, y: iy + ih - r };
  const bl = { x: ix + r, y: iy + ih };

  const topEdge = `M ${tl.x},${tl.y} L ${tr.x},${tr.y}`;
  const topRight = `M ${tr.x},${tr.y} Q ${ix + iw},${iy} ${ix + iw},${iy + r}`;
  const rightEdge = `M ${ix + iw},${iy + r} L ${ix + iw},${iy + ih - r}`;
  const bottomRight = `M ${ix + iw},${iy + ih - r} Q ${ix + iw},${iy + ih} ${ix + iw - r},${iy + ih}`;
  const bottomEdge = `M ${ix + iw - r},${iy + ih} L ${ix + r},${iy + ih}`;
  const bottomLeft = `M ${ix + r},${iy + ih} Q ${ix},${iy + ih} ${ix},${iy + ih - r}`;
  const leftEdge = `M ${ix},${iy + ih - r} L ${ix},${iy + r}`;
  const topLeft = `M ${ix},${iy + r} Q ${ix},${iy} ${tl.x},${tl.y}`;

  const inner = buildRectFramePathsInner(ix + 1.2, iy + 1.2, iw - 2.4, ih - 2.4, r - 0.8);

  return [
    { d: topEdge, width: 0.55, delay: 0 },
    { d: `${topRight} ${rightEdge}`, width: 0.55, delay: 0.04 },
    { d: `${bottomRight} ${bottomEdge}`, width: 0.55, delay: 0.08 },
    { d: `${bottomLeft} ${leftEdge} ${topLeft}`, width: 0.55, delay: 0.12 },
    { d: inner, width: 0.28, delay: 0.16 },
  ];
}

function buildRectFramePathsInner(ix: number, iy: number, iw: number, ih: number, r: number): string {
  if (iw <= 0 || ih <= 0) return `M ${ix},${iy}`;
  return `M ${ix + r},${iy} L ${ix + iw - r},${iy} Q ${ix + iw},${iy} ${ix + iw},${iy + r} L ${ix + iw},${iy + ih - r} Q ${ix + iw},${iy + ih} ${ix + iw - r},${iy + ih} L ${ix + r},${iy + ih} Q ${ix},${iy + ih} ${ix},${iy + ih - r} L ${ix},${iy + r} Q ${ix},${iy} ${ix + r},${iy}`;
}

export function buildBridgePath(
  fromSide: "left" | "right",
  toSide: "left" | "right"
): TraceDef[] {
  const sx = fromSide === "left" ? 22 : 78;
  const ex = toSide === "left" ? 22 : 78;
  const primary = `M ${sx},4 L ${sx},28 Q ${sx},38 ${sx + (fromSide === "left" ? 12 : -12)},44 L 50,56 Q ${toSide === "left" ? 38 : 62},68 ${ex},80 L ${ex},96`;
  const secondary = `M ${sx + 1.5},6 L ${sx + 1.5},30 Q ${sx + 1.5},40 ${sx + (fromSide === "left" ? 10 : -10)},46 L 50,58 Q ${toSide === "left" ? 40 : 60},70 ${ex - 1.5},82 L ${ex - 1.5},94`;

  return [
    { d: primary, width: 0.45, delay: 0 },
    { d: secondary, width: 0.22, delay: 0.08 },
  ];
}

export function rectAnchor(
  el: HTMLElement,
  stage: DOMRect,
  anchor: "center" | "left" | "right" | "top" | "bottom" | "top-left" | "top-right" | "bottom-left" | "bottom-right"
): Point {
  const r = el.getBoundingClientRect();
  let x = r.left + r.width / 2;
  let y = r.top + r.height / 2;

  if (anchor.includes("left")) x = r.left;
  if (anchor.includes("right")) x = r.right;
  if (anchor.includes("top")) y = r.top;
  if (anchor.includes("bottom")) y = r.bottom;

  return {
    x: ((x - stage.left) / stage.width) * 100,
    y: ((y - stage.top) / stage.height) * 100,
  };
}

export function rectBoundsPct(el: HTMLElement, stage: DOMRect) {
  const r = el.getBoundingClientRect();
  return {
    x: ((r.left - stage.left) / stage.width) * 100,
    y: ((r.top - stage.top) / stage.height) * 100,
    w: (r.width / stage.width) * 100,
    h: (r.height / stage.height) * 100,
  };
}
