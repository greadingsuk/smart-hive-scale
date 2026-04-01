/**
 * image-crop.js — Touch-friendly image crop modal.
 * Shows a square crop overlay; user can drag to pan, pinch/scroll to zoom.
 * Returns a 300×300 JPEG data URL via callback.
 */

const OUTPUT_SIZE = 300;
const MIN_ZOOM = 0.5;
const MAX_ZOOM = 5;

/**
 * Open the crop modal for a given image source.
 * @param {string} imageSrc — data URL or object URL of the source image
 * @param {(dataUrl: string|null) => void} onDone — called with cropped JPEG data URL, or null if cancelled
 */
export function openCropModal(imageSrc, onDone) {
  // State
  let zoom = 1;
  let panX = 0, panY = 0;
  let imgW = 0, imgH = 0;
  let dragging = false;
  let lastX = 0, lastY = 0;
  let lastPinchDist = 0;

  // Build modal DOM
  const overlay = document.createElement('div');
  overlay.className = 'crop-overlay';
  overlay.innerHTML = `
    <div class="crop-modal">
      <div class="crop-header">
        <button class="crop-cancel">Cancel</button>
        <span class="crop-title">Move & Scale</span>
        <button class="crop-save">Save</button>
      </div>
      <div class="crop-viewport">
        <canvas class="crop-canvas"></canvas>
        <div class="crop-guide"></div>
      </div>
      <div class="crop-zoom-row">
        <svg class="crop-zoom-icon" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2"><circle cx="11" cy="11" r="6"/><path d="m21 21-4.35-4.35"/><path d="M8 11h6"/></svg>
        <input type="range" class="crop-zoom-slider" min="50" max="500" value="100">
        <svg class="crop-zoom-icon" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2"><circle cx="11" cy="11" r="6"/><path d="m21 21-4.35-4.35"/><path d="M8 11h6M11 8v6"/></svg>
      </div>
    </div>
  `;

  // Inject styles if not yet present
  if (!document.getElementById('crop-modal-styles')) {
    const style = document.createElement('style');
    style.id = 'crop-modal-styles';
    style.textContent = `
      .crop-overlay { position:fixed; inset:0; z-index:9999; background:rgba(0,0,0,0.92); display:flex; align-items:center; justify-content:center; }
      .crop-modal { width:100%; max-width:400px; display:flex; flex-direction:column; }
      .crop-header { display:flex; justify-content:space-between; align-items:center; padding:12px 16px; }
      .crop-title { color:#e4e4e7; font-size:14px; font-weight:600; letter-spacing:0.04em; text-transform:uppercase; }
      .crop-cancel, .crop-save { background:none; border:none; color:#D4AF37; font-size:14px; font-weight:600; cursor:pointer; padding:6px 4px; text-transform:uppercase; letter-spacing:0.04em; }
      .crop-cancel:active, .crop-save:active { opacity:0.7; }
      .crop-viewport { position:relative; width:100%; aspect-ratio:1; overflow:hidden; touch-action:none; margin:0 auto; background:#000; }
      .crop-canvas { position:absolute; top:0; left:0; width:100%; height:100%; }
      .crop-guide { position:absolute; inset:0; border:2px solid rgba(212,175,55,0.5); pointer-events:none;
        box-shadow: inset 0 0 0 1px rgba(212,175,55,0.15); }
      .crop-zoom-row { display:flex; align-items:center; gap:8px; padding:12px 24px; }
      .crop-zoom-icon { width:20px; height:20px; color:#9ca3af; flex-shrink:0; }
      .crop-zoom-slider { flex:1; -webkit-appearance:none; appearance:none; height:3px; background:#2a2e3e; border-radius:2px; outline:none; }
      .crop-zoom-slider::-webkit-slider-thumb { -webkit-appearance:none; width:20px; height:20px; border-radius:50%; background:#D4AF37; cursor:pointer; }
    `;
    document.head.appendChild(style);
  }

  document.body.appendChild(overlay);

  const canvas = overlay.querySelector('.crop-canvas');
  const ctx = canvas.getContext('2d');
  const viewport = overlay.querySelector('.crop-viewport');
  const slider = overlay.querySelector('.crop-zoom-slider');
  const img = new Image();

  function getViewportSize() {
    return viewport.clientWidth; // square, so width = height
  }

  function draw() {
    const vp = getViewportSize();
    canvas.width = vp; canvas.height = vp;
    ctx.clearRect(0, 0, vp, vp);

    // Scale image so shortest side fills viewport at zoom=1
    const baseScale = vp / Math.min(imgW, imgH);
    const s = baseScale * zoom;
    const dw = imgW * s;
    const dh = imgH * s;
    const dx = (vp - dw) / 2 + panX;
    const dy = (vp - dh) / 2 + panY;

    ctx.drawImage(img, dx, dy, dw, dh);
  }

  function clampPan() {
    const vp = getViewportSize();
    const baseScale = vp / Math.min(imgW, imgH);
    const s = baseScale * zoom;
    const dw = imgW * s;
    const dh = imgH * s;
    const maxPanX = Math.max(0, (dw - vp) / 2);
    const maxPanY = Math.max(0, (dh - vp) / 2);
    panX = Math.max(-maxPanX, Math.min(maxPanX, panX));
    panY = Math.max(-maxPanY, Math.min(maxPanY, panY));
  }

  function setZoom(z) {
    zoom = Math.max(MIN_ZOOM, Math.min(MAX_ZOOM, z));
    slider.value = Math.round(zoom * 100);
    clampPan();
    draw();
  }

  // Load image
  img.onload = () => {
    imgW = img.naturalWidth;
    imgH = img.naturalHeight;
    zoom = 1; panX = 0; panY = 0;
    draw();
  };
  img.src = imageSrc;

  // Slider
  slider.addEventListener('input', () => setZoom(parseInt(slider.value, 10) / 100));

  // Mouse wheel zoom
  viewport.addEventListener('wheel', (e) => {
    e.preventDefault();
    setZoom(zoom + (e.deltaY < 0 ? 0.1 : -0.1));
  }, { passive: false });

  // Touch: drag + pinch
  viewport.addEventListener('pointerdown', (e) => {
    dragging = true;
    lastX = e.clientX; lastY = e.clientY;
    viewport.setPointerCapture(e.pointerId);
  });
  viewport.addEventListener('pointermove', (e) => {
    if (!dragging) return;
    panX += e.clientX - lastX;
    panY += e.clientY - lastY;
    lastX = e.clientX; lastY = e.clientY;
    clampPan(); draw();
  });
  viewport.addEventListener('pointerup', () => { dragging = false; });
  viewport.addEventListener('pointercancel', () => { dragging = false; });

  // Pinch to zoom
  viewport.addEventListener('touchstart', (e) => {
    if (e.touches.length === 2) {
      lastPinchDist = Math.hypot(e.touches[0].clientX - e.touches[1].clientX, e.touches[0].clientY - e.touches[1].clientY);
    }
  }, { passive: true });
  viewport.addEventListener('touchmove', (e) => {
    if (e.touches.length === 2) {
      e.preventDefault();
      const dist = Math.hypot(e.touches[0].clientX - e.touches[1].clientX, e.touches[0].clientY - e.touches[1].clientY);
      if (lastPinchDist > 0) {
        setZoom(zoom * (dist / lastPinchDist));
      }
      lastPinchDist = dist;
    }
  }, { passive: false });
  viewport.addEventListener('touchend', () => { lastPinchDist = 0; });

  // Crop & save
  overlay.querySelector('.crop-save').addEventListener('click', () => {
    const vp = getViewportSize();
    const baseScale = vp / Math.min(imgW, imgH);
    const s = baseScale * zoom;
    const dw = imgW * s;
    const dh = imgH * s;
    const dx = (vp - dw) / 2 + panX;
    const dy = (vp - dh) / 2 + panY;

    // Map viewport square back to source image coordinates
    const sx = -dx / s;
    const sy = -dy / s;
    const sSize = vp / s;

    const out = document.createElement('canvas');
    out.width = OUTPUT_SIZE; out.height = OUTPUT_SIZE;
    const outCtx = out.getContext('2d');
    outCtx.drawImage(img, sx, sy, sSize, sSize, 0, 0, OUTPUT_SIZE, OUTPUT_SIZE);

    overlay.remove();
    onDone(out.toDataURL('image/jpeg', 0.85));
  });

  // Cancel
  overlay.querySelector('.crop-cancel').addEventListener('click', () => {
    overlay.remove();
    onDone(null);
  });
}
