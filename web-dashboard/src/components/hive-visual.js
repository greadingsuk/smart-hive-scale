/**
 * Visual hive renderer — draws a stacked hive from component parts.
 * Nucs are rendered at half the width of full hives.
 * Proportions based on real dimensions (460mm full, ~230mm nuc).
 */
import { COMPONENT_TYPES } from '../api/dataverse.js';

const FULL_WIDTH = 140;  // px base width for a full hive
const NUC_WIDTH = 70;    // px base width for a nuc (half)

function getComponentDef(typeId) {
  return COMPONENT_TYPES.find(c => c.id === typeId);
}

function isNucHive(components) {
  return components.some(c => {
    const def = getComponentDef(c.type);
    return def && def.nuc;
  });
}

/** Map nuc component heights to full-hive equivalents so nucs render at same height */
function getFullHiveHeight(def) {
  const map = { 'nuc-roof': 14, 'nuc-floor': 10, 'nuc-stand': 34, 'nuc-stand-iot': 38, 'nuc-brood': 45, 'nuc-super': 30, 'nuc-eke': 18 };
  return map[def.id] || def.height;
}

/**
 * Render a visual hive stack as HTML.
 */
export function renderHiveStack(components = [], opts = {}) {
  const { size = 'md', interactive = false, hiveId = '' } = opts;
  const scale = size === 'sm' ? 0.5 : size === 'lg' ? 1.2 : 0.8;
  const isNuc = isNucHive(components);
  const boxWidth = Math.round((isNuc ? NUC_WIDTH : FULL_WIDTH) * scale);
  const containerWidth = Math.round((isNuc ? NUC_WIDTH + 40 : FULL_WIDTH + 40) * scale);

  if (!components.length) {
    return `<div class="flex flex-col items-center" style="width:${containerWidth}px">
      <div class="text-gray-600 text-xs text-center py-4">No components</div>
    </div>`;
  }

  let html = `<div class="flex flex-col items-center" style="width:${containerWidth}px">`;

  components.forEach((comp, i) => {
    const def = getComponentDef(comp.type);
    if (!def) return;

    const h = Math.round(def.height * scale);
    const isRoof = def.id.includes('roof');
    const isStandIot = def.id.includes('stand-iot');
    const isStand = !isStandIot && def.id.includes('stand');
    const isFloor = def.id.includes('floor');
    const isAccessory = def.category === 'accessory';

    if (isRoof) {
      html += `<div class="relative" style="width:${boxWidth + Math.round(8 * scale)}px; height:${h}px">
        <div class="absolute inset-0 rounded-t-md" style="background:${def.color}"></div>
        <div class="absolute bottom-0 left-0.5 right-0.5 h-px" style="background:#991b1b"></div>
      </div>`;
    } else if (isFloor) {
      html += `<div style="width:${boxWidth + Math.round(4 * scale)}px; height:${h}px; background:${def.color}; border-radius: 0 0 2px 2px"></div>`;    } else if (isStandIot) {
      // IOT stand — wider platform with green accent strip and signal indicator
      const legW = Math.max(3, Math.round(4 * scale));
      const platformH = Math.round(h * 0.28);
      const legH = h - platformH;
      html += `<div class=\"flex flex-col items-center\" style=\"width:${boxWidth + Math.round(16 * scale)}px\">
        <div class=\"relative\" style=\"width:${boxWidth + Math.round(12 * scale)}px; height:${platformH}px; background:${def.color}; border-radius: 0 0 3px 3px\">
          <div style=\"position:absolute;bottom:0;left:0;right:0;height:3px;background:#22c55e;border-radius:0 0 3px 3px\"></div>
          <div style=\"position:absolute;top:-${Math.round(6*scale)}px;right:${Math.round(8*scale)}px;width:2px;height:${Math.round(8*scale)}px;background:#22c55e;border-radius:1px\"></div>
          <div style=\"position:absolute;top:-${Math.round(8*scale)}px;right:${Math.round(5*scale)}px;width:${Math.round(6*scale)}px;height:${Math.round(6*scale)}px;border:2px solid #22c55e;border-radius:50%;background:transparent\"></div>
        </div>
        <div class=\"flex justify-between\" style=\"width:${boxWidth + Math.round(12 * scale)}px; height:${legH}px\">
          <div style=\"width:${legW}px; background:#A09080; height:${legH}px; border-radius: 0 0 2px 2px\"></div>
          <div style=\"width:${legW}px; background:#A09080; height:${legH}px; border-radius: 0 0 2px 2px\"></div>
        </div>
      </div>`;    } else if (isStand) {
      const legW = Math.max(2, Math.round(3 * scale));
      html += `<div class="flex justify-between" style="width:${boxWidth + Math.round(12 * scale)}px; height:${h}px">
        <div style="width:${legW}px; background:${def.color}; height:${h}px; border-radius: 0 0 2px 2px"></div>
        <div class="flex-1 mx-0.5" style="background:${def.color}; height:${Math.round(h * 0.3)}px; border-radius: 0 0 2px 2px"></div>
        <div style="width:${legW}px; background:${def.color}; height:${h}px; border-radius: 0 0 2px 2px"></div>
      </div>`;
    } else if (isAccessory) {
      const fontSize = Math.max(7, Math.round(8 * scale));
      html += `<div class="relative flex items-center justify-center" style="width:${boxWidth}px; height:${h}px; background:${def.color}">
        <span class="text-white/60 font-medium text-center leading-tight" style="font-size:${fontSize}px">${def.name}</span>
        ${interactive ? removeBtn(hiveId, i) : ''}
      </div>`;
    } else {
      // Box
      const fontSize = Math.max(8, Math.round(10 * scale));
      html += `<div class="relative flex items-center justify-center" style="width:${boxWidth}px; height:${h}px; background:${def.color}; border-left:2px solid rgba(0,0,0,0.12); border-right:2px solid rgba(0,0,0,0.12)">
        <span class="text-white font-semibold text-center leading-tight" style="font-size:${fontSize}px; text-shadow:0 1px 2px rgba(0,0,0,0.3)">${def.name}</span>
        ${interactive ? removeBtn(hiveId, i) : ''}
      </div>`;
    }
  });

  html += '</div>';
  return html;
}

function removeBtn(hiveId, index) {
  return `<button onclick="document.dispatchEvent(new CustomEvent('hive-remove-component', {detail:{hiveId:'${hiveId}',index:${index}}}))" class="absolute top-0 right-0.5 text-white/40 hover:text-white text-xs leading-none p-0.5" title="Remove">\u2715</button>`;
}

/**
 * Render a small hive icon for the carousel.
 */
export function renderHiveThumb(components = [], color = '#f59e0b') {
  if (!components || !components.length) {
    return `<div class="w-full h-full flex items-center justify-center text-3xl">\ud83c\udfe0</div>`;
  }

  const scale = 0.35;
  const isNuc = isNucHive(components);
  // Nuc = half width but same height scale
  const boxWidth = Math.round((isNuc ? NUC_WIDTH : FULL_WIDTH) * scale);

  let html = `<div class="flex flex-col items-center justify-end h-full py-1">`;

  components.forEach(comp => {
    const def = getComponentDef(comp.type);
    if (!def) return;
    // Use full-hive equivalent heights for nucs so they stack to same total height
    const baseHeight = isNuc ? getFullHiveHeight(def) : def.height;
    const h = Math.round(baseHeight * scale);

    if (def.id.includes('roof')) {
      html += `<div class="rounded-t" style="width:${boxWidth + 3}px; height:${h}px; background:${def.color}"></div>`;
    } else if (def.id.includes('stand-iot')) {
      html += `<div class="flex flex-col items-center" style="width:${boxWidth + 8}px">
        <div class="relative" style="width:${boxWidth + 6}px; height:${Math.round(h * 0.3)}px; background:#5B7A5E">
          <div style="position:absolute;bottom:0;left:0;right:0;height:1px;background:#22c55e"></div>
        </div>
        <div class="flex justify-between" style="width:${boxWidth + 6}px; height:${h - Math.round(h * 0.3)}px">
          <div style="width:1px; background:#A09080; height:100%"></div>
          <div style="width:1px; background:#A09080; height:100%"></div>
        </div>
      </div>`;
    } else if (def.id.includes('stand')) {
      html += `<div class="flex justify-between" style="width:${boxWidth + 6}px; height:${h}px">
        <div style="width:1px; background:${def.color}; height:${h}px"></div>
        <div class="flex-1 mx-px" style="background:${def.color}; height:${Math.round(h * 0.3)}px"></div>
        <div style="width:1px; background:${def.color}; height:${h}px"></div>
      </div>`;
    } else if (def.id.includes('floor')) {
      html += `<div style="width:${boxWidth + 2}px; height:${Math.max(2, h)}px; background:${def.color}"></div>`;
    } else if (def.category === 'accessory') {
      html += `<div style="width:${boxWidth}px; height:${Math.max(2, h)}px; background:${def.color}"></div>`;
    } else {
      html += `<div style="width:${boxWidth}px; height:${h}px; background:${def.color}; border-left:1px solid rgba(0,0,0,0.12); border-right:1px solid rgba(0,0,0,0.12)"></div>`;
    }
  });

  html += '</div>';
  return html;
}
