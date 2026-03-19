/**
 * Embossed hexagon corner overlays using SVG filter primitives.
 * Uses feDiffuseLighting + feSpecularLighting for true 3D emboss effect.
 */

/** Generate hexagon path centered at (cx, cy) with given radius */
function hexPath(cx, cy, r) {
  const pts = [];
  for (let i = 0; i < 6; i++) {
    const angle = (Math.PI / 3) * i - Math.PI / 6;
    pts.push(`${cx + r * Math.cos(angle)},${cy + r * Math.sin(angle)}`);
  }
  return `M${pts.join('L')}Z`;
}

/** Create the bottom-left corner SVG */
function createBLCorner() {
  const w = 750, h = 650;
  const hexR = 78;
  const rowH = hexR * 2;
  const colW = hexR * 1.8;

  // Hex positions clustered bottom-left — staggered honeycomb grid
  const hexes = [];
  for (let row = 0; row < 5; row++) {
    const cols = row % 2 === 0 ? 4 : 3;
    for (let col = 0; col < cols; col++) {
      const x = col * colW + (row % 2 === 0 ? 0 : colW * 0.75) + hexR;
      const y = h - (row * rowH * 0.5) - hexR;
      // Fade opacity with distance from bottom-left corner
      const dist = Math.sqrt(x * x + (h - y) * (h - y)) / Math.sqrt(w * w + h * h);
      const opacity = Math.max(0, 1 - dist * 2.0);
      if (opacity > 0.05) hexes.push({ x, y, opacity });
    }
  }

  return buildSVG(w, h, hexes, hexR, 'bl');
}

/** Create the top-right corner SVG */
function createTRCorner() {
  const w = 600, h = 500;
  const hexR = 80;
  const rowH = hexR * 2;
  const colW = hexR * 1.8;

  const hexes = [];
  for (let row = 0; row < 4; row++) {
    const cols = 3;
    for (let col = 0; col < cols; col++) {
      const x = w - (col * colW) - hexR;
      const y = row * rowH * 0.5 + hexR;
      const dist = Math.sqrt((w - x) * (w - x) + y * y) / Math.sqrt(w * w + h * h);
      const opacity = Math.max(0, 1 - dist * 2.2);
      if (opacity > 0.05) hexes.push({ x, y, opacity });
    }
  }

  return buildSVG(w, h, hexes, hexR, 'tr');
}

function buildSVG(w, h, hexes, hexR, id) {
  const isLight = document.documentElement.classList.contains('light');
  const ns = 'http://www.w3.org/2000/svg';
  const svg = document.createElementNS(ns, 'svg');
  svg.setAttribute('width', '100%');
  svg.setAttribute('height', '100%');
  svg.setAttribute('viewBox', `0 0 ${w} ${h}`);
  svg.setAttribute('preserveAspectRatio', 'none');

  // Define the emboss filter
  const defs = document.createElementNS(ns, 'defs');

  const filter = document.createElementNS(ns, 'filter');
  filter.setAttribute('id', `emboss-${id}`);
  filter.setAttribute('x', '-20%');
  filter.setAttribute('y', '-20%');
  filter.setAttribute('width', '140%');
  filter.setAttribute('height', '140%');

  // Blur the source alpha to create a bevel map
  const blur = document.createElementNS(ns, 'feGaussianBlur');
  blur.setAttribute('in', 'SourceAlpha');
  blur.setAttribute('stdDeviation', '3');
  blur.setAttribute('result', 'blur');

  // Diffuse lighting — creates the embossed depth
  const diffuse = document.createElementNS(ns, 'feDiffuseLighting');
  diffuse.setAttribute('in', 'blur');
  diffuse.setAttribute('surfaceScale', '6');
  diffuse.setAttribute('diffuseConstant', '0.7');
  diffuse.setAttribute('result', 'diffuse');
  diffuse.setAttribute('lighting-color', isLight ? '#c8b890' : '#4a6a8a');
  const diffuseLight = document.createElementNS(ns, 'feDistantLight');
  diffuseLight.setAttribute('azimuth', '315');
  diffuseLight.setAttribute('elevation', '25');
  diffuse.appendChild(diffuseLight);

  // Specular lighting — adds highlight shine
  const specular = document.createElementNS(ns, 'feSpecularLighting');
  specular.setAttribute('in', 'blur');
  specular.setAttribute('surfaceScale', '5');
  specular.setAttribute('specularConstant', '0.4');
  specular.setAttribute('specularExponent', '20');
  specular.setAttribute('result', 'specular');
  specular.setAttribute('lighting-color', isLight ? '#e8dcc0' : '#8ab4d8');
  const specLight = document.createElementNS(ns, 'feDistantLight');
  specLight.setAttribute('azimuth', '315');
  specLight.setAttribute('elevation', '30');
  specular.appendChild(specLight);

  // Composite specular onto diffuse
  const comp1 = document.createElementNS(ns, 'feComposite');
  comp1.setAttribute('in', 'specular');
  comp1.setAttribute('in2', 'diffuse');
  comp1.setAttribute('operator', 'arithmetic');
  comp1.setAttribute('k1', '0');
  comp1.setAttribute('k2', '1');
  comp1.setAttribute('k3', '1');
  comp1.setAttribute('k4', '0');
  comp1.setAttribute('result', 'lit');

  // Clip to original shape
  const comp2 = document.createElementNS(ns, 'feComposite');
  comp2.setAttribute('in', 'lit');
  comp2.setAttribute('in2', 'SourceAlpha');
  comp2.setAttribute('operator', 'in');
  comp2.setAttribute('result', 'clipped');

  // Merge with source
  const merge = document.createElementNS(ns, 'feMerge');
  const mn1 = document.createElementNS(ns, 'feMergeNode');
  mn1.setAttribute('in', 'clipped');
  const mn2 = document.createElementNS(ns, 'feMergeNode');
  mn2.setAttribute('in', 'SourceGraphic');
  merge.appendChild(mn1);
  merge.appendChild(mn2);

  filter.appendChild(blur);
  filter.appendChild(diffuse);
  filter.appendChild(specular);
  filter.appendChild(comp1);
  filter.appendChild(comp2);
  filter.appendChild(merge);
  defs.appendChild(filter);

  // Drop shadow filter for depth
  const shadow = document.createElementNS(ns, 'filter');
  shadow.setAttribute('id', `shadow-${id}`);
  shadow.setAttribute('x', '-30%');
  shadow.setAttribute('y', '-30%');
  shadow.setAttribute('width', '160%');
  shadow.setAttribute('height', '160%');
  const shadowBlur = document.createElementNS(ns, 'feDropShadow');
  shadowBlur.setAttribute('dx', '4');
  shadowBlur.setAttribute('dy', '6');
  shadowBlur.setAttribute('stdDeviation', '8');
  shadowBlur.setAttribute('flood-color', isLight ? 'rgba(0,0,0,0.15)' : 'rgba(0,0,0,0.5)');
  shadow.appendChild(shadowBlur);
  defs.appendChild(shadow);

  svg.appendChild(defs);

  // Draw hexagons
  hexes.forEach(({ x, y, opacity }) => {
    const g = document.createElementNS(ns, 'g');
    g.setAttribute('opacity', String(opacity));

    // Shadow layer
    const shadowPath = document.createElementNS(ns, 'path');
    shadowPath.setAttribute('d', hexPath(x, y, hexR * 0.92));
    shadowPath.setAttribute('fill', isLight ? 'rgba(180,165,140,0.3)' : 'rgba(8,16,28,0.7)');
    shadowPath.setAttribute('filter', `url(#shadow-${id})`);
    g.appendChild(shadowPath);

    // Main filled hexagon
    const filled = document.createElementNS(ns, 'path');
    filled.setAttribute('d', hexPath(x, y, hexR * 0.92));
    filled.setAttribute('fill', isLight ? 'rgba(215,205,185,0.6)' : 'rgba(14,28,48,0.85)');
    filled.setAttribute('filter', `url(#emboss-${id})`);
    g.appendChild(filled);

    // Subtle inner highlight stroke (top-left edge highlight)
    const highlight = document.createElementNS(ns, 'path');
    highlight.setAttribute('d', hexPath(x, y, hexR * 0.92));
    highlight.setAttribute('fill', 'none');
    highlight.setAttribute('stroke', isLight ? 'rgba(255,255,255,0.4)' : 'rgba(255,255,255,0.06)');
    highlight.setAttribute('stroke-width', '1.5');
    g.appendChild(highlight);

    // Outer border
    const outer = document.createElementNS(ns, 'path');
    outer.setAttribute('d', hexPath(x, y, hexR * 0.95));
    outer.setAttribute('fill', 'none');
    outer.setAttribute('stroke', isLight ? 'rgba(160,145,120,0.2)' : 'rgba(255,255,255,0.04)');
    outer.setAttribute('stroke-width', '0.8');
    g.appendChild(outer);

    svg.appendChild(g);
  });

  return svg;
}

/** Inject the corner SVGs into the DOM */
export function initHexCorners() {
  buildCorners();

  // Rebuild SVGs when theme changes
  const observer = new MutationObserver(() => {
    document.querySelectorAll('.hex-corner-svg').forEach(el => el.remove());
    buildCorners();
  });
  observer.observe(document.documentElement, { attributes: true, attributeFilter: ['class'] });
}

function buildCorners() {
  // Bottom-left
  const blDiv = document.createElement('div');
  blDiv.className = 'hex-corner-svg hex-corner-svg--bl';
  blDiv.setAttribute('aria-hidden', 'true');
  blDiv.appendChild(createBLCorner());
  document.body.insertBefore(blDiv, document.body.firstChild);

  // Top-right
  const trDiv = document.createElement('div');
  trDiv.className = 'hex-corner-svg hex-corner-svg--tr';
  trDiv.setAttribute('aria-hidden', 'true');
  trDiv.appendChild(createTRCorner());
  document.body.insertBefore(trDiv, document.body.firstChild);
}
