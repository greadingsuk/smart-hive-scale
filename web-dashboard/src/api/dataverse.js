/**
 * API layer — reads/writes from Dataverse via Power Automate flows.
 * Data is loaded from Dataverse on app init and cached in-memory.
 * Mutations write-through to Dataverse and update the local cache.
 *
 * IMPORTANT: Call `await initDataStore()` once at app startup before rendering.
 */

// Logic App URLs (Azure Consumption — Dataverse OData)
const TELEMETRY_READ_URL = 'https://prod-25.ukwest.logic.azure.com:443/workflows/2a2177c3c7174e0cbd8fa0392b36fd17/triggers/manual/paths/invoke?api-version=2019-05-01&sp=%2Ftriggers%2Fmanual%2Frun&sv=1.0&sig=Mlt3jgZT4UQhN6-doEkU-FrAGZZWzneDHvmyBZfX8Sg';
const APIARY_READ_URL = 'https://prod-01.ukwest.logic.azure.com:443/workflows/3ee8a8759b6248d38b47c30ab29abca1/triggers/manual/paths/invoke?api-version=2019-05-01&sp=%2Ftriggers%2Fmanual%2Frun&sv=1.0&sig=6BX8eq06bY1I2fJMqMRuszsIsFTL8kDZ4yOQF66OD-c';
const APIARY_WRITE_URL = 'https://prod-00.ukwest.logic.azure.com:443/workflows/85b5d48749124f93ab929e8aacbecdf3/triggers/manual/paths/invoke?api-version=2019-05-01&sp=%2Ftriggers%2Fmanual%2Frun&sv=1.0&sig=ygYwSYDDTVPEwpSI5ynZ-8fJQd1aLaMEDuMFooN7w24';

// In-memory cache
let _hives = [];
let _inspections = [];
let _notes = [];
let _tasks = [];
let _dataLoaded = false;

export async function initDataStore() {
  if (_dataLoaded) return;
  try {
    const [hives, inspections, notes, tasks] = await Promise.all([
      fetchEntity('hives'), fetchEntity('inspections'),
      fetchEntity('notes'), fetchEntity('tasks'),
    ]);
    _hives = hives.map(mapHiveFromDv);
    _inspections = inspections.map(mapInspectionFromDv).sort((a, b) => new Date(b.date) - new Date(a.date));
    _notes = notes.map(mapNoteFromDv);
    _tasks = tasks.map(mapTaskFromDv);
    _dataLoaded = true;
  } catch (err) {
    console.error('Failed to load from Dataverse:', err);
    _dataLoaded = true;
  }
}
export function isDataLoaded() { return _dataLoaded; }

async function fetchEntity(entity) {
  if (APIARY_READ_URL.includes('%%')) { console.warn(`Read flow not configured for ${entity}`); return []; }
  const url = new URL(APIARY_READ_URL);
  url.searchParams.set('entity', entity);
  const res = await fetch(url.toString());
  if (!res.ok) throw new Error(`Read ${entity}: HTTP ${res.status}`);
  return res.json();
}

async function writeEntity(entity, operation, data, id) {
  if (APIARY_WRITE_URL.includes('%%')) { console.warn(`Write flow not configured`); return null; }
  const res = await fetch(APIARY_WRITE_URL, {
    method: 'POST', headers: { 'Content-Type': 'application/json' },
    body: JSON.stringify({ entity, operation, data, id }),
  });
  if (!res.ok) throw new Error(`Write ${entity}/${operation}: HTTP ${res.status}`);
  const text = await res.text();
  return text ? JSON.parse(text) : null;
}

function writeAsync(entity, operation, data, id) {
  writeEntity(entity, operation, data, id).catch(err => console.error('Async write failed:', err));
}

// Field mapping
function safeJSON(str, fb) { if (!str) return fb; try { return JSON.parse(str); } catch { return fb; } }

function mapHiveFromDv(r) {
  return { id: r.gr_hiveid, hiveName: r.gr_name, type: r.gr_hivetype || 'Hive', hiveStyle: r.gr_hivestyle || '', status: r.gr_status || 'Active', strength: r.gr_strength ?? 0, beeType: r.gr_beetype || '', color: r.gr_color || '#f59e0b', queenMarked: !!r.gr_queenmarked, queenColor: r.gr_queencolor || null, queenYear: r.gr_queenyear || null, queenClipped: !!r.gr_queenclipped, queenSource: r.gr_queensource || '', queenAddedDate: r.gr_queenaddeddate ? r.gr_queenaddeddate.slice(0, 10) : null, queenNotes: r.gr_queennotes || '', dateAdded: r.gr_dateadded ? r.gr_dateadded.slice(0, 10) : new Date().toISOString().slice(0, 10), orientation: r.gr_orientation || 'vertical', components: safeJSON(r.gr_components, []) };
}
function mapHiveToDv(h) {
  return { gr_name: h.hiveName, gr_hivetype: h.type, gr_hivestyle: h.hiveStyle, gr_status: h.status, gr_strength: h.strength, gr_beetype: h.beeType, gr_color: h.color, gr_queenmarked: h.queenMarked, gr_queencolor: h.queenColor, gr_queenyear: h.queenYear, gr_queenclipped: h.queenClipped, gr_queensource: h.queenSource, gr_queenaddeddate: h.queenAddedDate, gr_queennotes: h.queenNotes, gr_components: JSON.stringify(h.components || []), gr_dateadded: h.dateAdded, gr_orientation: h.orientation };
}
function mapInspectionFromDv(r) {
  return { id: r.gr_inspectionid || r.gr_name, date: r.gr_activitydate ? r.gr_activitydate.slice(0, 10) : '', type: r.gr_activitytype || 'Inspection', hive: r.gr_hivename || '', strength: r.gr_strength, queenSeen: !!r.gr_queenseen, broodSpotted: !!r.gr_broodspotted, queenCells: !!r.gr_queencells, temperament: r.gr_temperament || '', broodPattern: r.gr_broodpattern || '', weightLeft: r.gr_weightleft, weightRight: r.gr_weightright, weightTotal: r.gr_weighttotal, diseases: safeJSON(r.gr_diseases, []), pests: safeJSON(r.gr_pests, []), notes: r.gr_notes || '', weatherTemp: r.gr_weathertemp, weatherConditions: r.gr_weatherconditions || '', _dvId: r.gr_inspectionid };
}
function mapInspectionToDv(a) {
  return { gr_name: a.id || 'insp-' + Date.now(), gr_activitydate: a.date, gr_activitytype: a.type || 'Inspection', gr_hivename: a.hive, gr_strength: a.strength, gr_queenseen: a.queenSeen, gr_broodspotted: a.broodSpotted, gr_queencells: a.queenCells, gr_temperament: a.temperament, gr_broodpattern: a.broodPattern, gr_weightleft: a.weightLeft, gr_weightright: a.weightRight, gr_weighttotal: a.weightTotal, gr_diseases: JSON.stringify(a.diseases || []), gr_pests: JSON.stringify(a.pests || []), gr_notes: a.notes, gr_weathertemp: a.weatherTemp, gr_weatherconditions: a.weatherConditions };
}
function mapNoteFromDv(r) {
  return { id: r.gr_noteid || r.gr_name, text: r.gr_text || '', date: r.gr_notedate ? r.gr_notedate.slice(0, 10) : '', pinned: !!r.gr_pinned, deleted: !!r.gr_deleted, hiveId: r.gr_hiveid || null, _dvId: r.gr_noteid };
}
function mapNoteToDv(n) {
  return { gr_name: n.id || 'n' + Date.now(), gr_text: n.text, gr_notedate: n.date, gr_pinned: n.pinned, gr_deleted: n.deleted, gr_hiveid: n.hiveId || '' };
}
function mapTaskFromDv(r) {
  return { id: r.gr_taskid || r.gr_name, text: r.gr_text || '', done: !!r.gr_done, due: r.gr_duedate ? r.gr_duedate.slice(0, 10) : null, deleted: !!r.gr_deleted, _dvId: r.gr_taskid };
}
function mapTaskToDv(t) {
  return { gr_name: t.id || 't' + Date.now(), gr_text: t.text, gr_done: t.done, gr_duedate: t.due, gr_deleted: t.deleted };
}

// Telemetry
export async function fetchTelemetry() {
  const res = await fetch(TELEMETRY_READ_URL);
  if (!res.ok) throw new Error(`Telemetry fetch failed: HTTP ${res.status}`);
  const rows = await res.json();
  return rows.map(r => ({ weight: r.gr_weight, internalTemp: r.gr_internaltemp, batteryVoltage: r.gr_batteryvoltage, hiveHum: r.gr_hivehum, legTemp: r.gr_legtemp, timestamp: r.gr_readingtimestamp || r.createdon })).sort((a, b) => new Date(a.timestamp) - new Date(b.timestamp));
}

export const APIARY = { name: 'Home Apiary', location: 'Kidmore End, Reading RG4 9AY, UK', lat: 51.509, lng: -0.975 };

// Inspections / Activity
export function getAllActivity() { return _inspections; }
export function getActivityTimeline() {
  const groups = {};
  for (const a of _inspections) { if (!groups[a.date]) groups[a.date] = []; groups[a.date].push(a); }
  return Object.entries(groups).sort(([a], [b]) => new Date(b) - new Date(a)).map(([date, items]) => ({ date, items, count: items.length }));
}
export function getHiveActivity(hiveName) { return _inspections.filter(a => a.hive === hiveName); }
export function getCustomActivity() { return []; }
export function saveInspection(data) {
  const record = { ...data, id: data.id || 'insp-' + Date.now() };
  _inspections.unshift(record);
  writeAsync('inspections', 'create', mapInspectionToDv(record));
}

// Static config
export const COMPONENT_TYPES = [
  { id: 'hive-roof', name: 'Roof', color: '#7a8078', height: 14, category: 'structure', nuc: false },
  { id: 'hive-floor', name: 'Floor', color: '#8B8580', height: 10, category: 'structure', nuc: false },
  { id: 'hive-stand', name: 'Hive Stand', color: '#A09080', height: 34, category: 'structure', nuc: false },
  { id: 'hive-stand-iot', name: 'Hive Stand IOT', color: '#5B7A5E', height: 38, category: 'structure', nuc: false },
  { id: 'super', name: 'Super', color: '#90968b', height: 30, category: 'box', nuc: false },
  { id: 'national-brood', name: 'National Brood', color: '#90968b', height: 45, category: 'box', nuc: false },
  { id: '14x12-brood', name: '14x12 Brood', color: '#90968b', height: 63, category: 'box', nuc: false },
  { id: 'queen-excluder', name: 'Queen Excluder', color: '#BFA67A', height: 6, category: 'accessory', nuc: false },
  { id: 'hive-eke', name: 'Hive Eke', color: '#A89068', height: 18, category: 'accessory', nuc: false },
  { id: 'nuc-roof', name: 'Nuc Roof', color: '#7a8078', height: 12, category: 'structure', nuc: true },
  { id: 'nuc-floor', name: 'Nuc Floor', color: '#8B8580', height: 8, category: 'structure', nuc: true },
  { id: 'nuc-stand', name: 'Nuc Stand', color: '#A09080', height: 30, category: 'structure', nuc: true },
  { id: 'nuc-stand-iot', name: 'Nuc Stand IOT', color: '#5B7A5E', height: 34, category: 'structure', nuc: true },
  { id: 'nuc-brood', name: 'Nuc Brood Box', color: '#90968b', height: 40, category: 'box', nuc: true },
  { id: 'nuc-super', name: 'Nuc Super', color: '#90968b', height: 26, category: 'box', nuc: true },
  { id: 'nuc-eke', name: 'Nuc Eke', color: '#A89068', height: 14, category: 'accessory', nuc: true },
];
export const BREED_OPTIONS = ['Swarm', 'Local', 'Home Bred', 'Buckfast', 'Native Black Bee', 'Carniolan', 'Italian', 'F1 Buckfast', 'Premium F1 Buckfast', 'UK F1 Buckfast', 'Premium UK F1 Buckfast', 'VSH Buckfast', 'UK Mated VSH Buckfast', 'Obsidian', 'Unknown'];
export const HIVE_TYPES = ['National', '14x12', 'Commercial', 'Langstroth', 'WBC', 'Top Bar', 'Poly', 'Other'];
export const QUEEN_SOURCES = ['Bred', 'Purchased', 'Swarm', 'Supersedure', 'Emergency Cell', 'Gift', 'Split', 'Unknown'];
export const QUEEN_COLORS = ['Blue', 'White', 'Yellow', 'Red', 'Green', 'Pink'];

// Hive CRUD
export function getHives() { return _hives; }
export function getHiveById(id) { return _hives.find(h => h.id === id); }
export function addHive(hive) {
  hive.id = hive.id || 'hive-' + Date.now();
  hive.dateAdded = hive.dateAdded || new Date().toISOString().slice(0, 10);
  hive.status = hive.status || 'Active';
  _hives.push(hive);
  writeAsync('hives', 'create', mapHiveToDv(hive));
  return hive;
}
export function updateHive(id, updates) {
  const idx = _hives.findIndex(h => h.id === id);
  if (idx === -1) return null;
  _hives[idx] = { ..._hives[idx], ...updates };
  writeAsync('hives', 'update', mapHiveToDv(_hives[idx]), id);
  return _hives[idx];
}
export function deleteHive(id) { _hives = _hives.filter(h => h.id !== id); writeAsync('hives', 'delete', null, id); }

// Component operations
export function addComponent(hiveId, componentType, position) {
  const hive = _hives.find(h => h.id === hiveId); if (!hive) return;
  if (!hive.components) hive.components = [];
  const insertAt = position != null ? position : Math.max(0, hive.components.length - 1);
  hive.components.splice(insertAt, 0, { type: componentType });
  writeAsync('hives', 'update', mapHiveToDv(hive), hiveId);
}
export function removeComponent(hiveId, index) {
  const hive = _hives.find(h => h.id === hiveId); if (!hive || !hive.components) return;
  hive.components.splice(index, 1);
  writeAsync('hives', 'update', mapHiveToDv(hive), hiveId);
}
export function moveComponent(hiveId, fromIndex, toIndex) {
  const hive = _hives.find(h => h.id === hiveId); if (!hive || !hive.components) return;
  if (toIndex < 0 || toIndex >= hive.components.length) return;
  const [item] = hive.components.splice(fromIndex, 1);
  hive.components.splice(toIndex, 0, item);
  writeAsync('hives', 'update', mapHiveToDv(hive), hiveId);
}

// Hive operations
function addActivityRecord(record) {
  const full = { ...record, id: 'insp-' + Date.now(), date: record.date || new Date().toISOString().slice(0, 10) };
  _inspections.unshift(full);
  writeAsync('inspections', 'create', mapInspectionToDv(full));
}
export function splitHive(sourceId, newHiveName, notes) {
  const source = getHiveById(sourceId); if (!source) return null;
  const newHive = addHive({ hiveName: newHiveName, type: 'Nuc', hiveStyle: source.hiveStyle, beeType: source.beeType, color: '#06b6d4', strength: 50, queenMarked: false, queenColor: null, queenYear: new Date().getFullYear(), orientation: 'vertical', components: [{ type: 'nuc-roof' }, { type: 'nuc-brood' }, { type: 'nuc-floor' }, { type: 'nuc-stand' }] });
  addActivityRecord({ type: 'Split', hive: source.hiveName, notes: `Split made — new nuc "${newHiveName}" created. ${notes || ''}`.trim(), strength: source.strength, queenSeen: false, broodSpotted: false });
  addActivityRecord({ type: 'Split', hive: newHiveName, notes: `Split from ${source.hiveName}. ${notes || ''}`.trim(), strength: 50, queenSeen: false, broodSpotted: false });
  return newHive;
}
export function combineHives(primaryId, secondaryId, notes) {
  const primary = getHiveById(primaryId); const secondary = getHiveById(secondaryId); if (!primary || !secondary) return;
  addActivityRecord({ type: 'Combined', hive: primary.hiveName, notes: `Combined with ${secondary.hiveName}. ${notes || ''}`.trim(), strength: primary.strength, queenSeen: false, broodSpotted: false });
  addActivityRecord({ type: 'Combined', hive: secondary.hiveName, notes: `Combined into ${primary.hiveName}. Hive deactivated. ${notes || ''}`.trim(), strength: 0, queenSeen: false, broodSpotted: false });
  updateHive(secondaryId, { status: 'Combined' });
}
export function deadOutHive(hiveId, notes) {
  const hive = getHiveById(hiveId); if (!hive) return;
  addActivityRecord({ type: 'Hive Death', hive: hive.hiveName, notes: notes || 'Colony died out.', strength: 0, queenSeen: false, broodSpotted: false });
  updateHive(hiveId, { status: 'Dead', strength: 0 });
}
export function moveHive(hiveId, newLocation, notes) {
  const hive = getHiveById(hiveId); if (!hive) return;
  addActivityRecord({ type: 'Moved', hive: hive.hiveName, notes: `Moved to ${newLocation}. ${notes || ''}`.trim(), strength: hive.strength, queenSeen: false, broodSpotted: false });
}
const COMPONENT_MAP_TO_NUC = { 'hive-roof': 'nuc-roof', 'hive-floor': 'nuc-floor', 'hive-stand': 'nuc-stand', 'super': 'nuc-super', 'national-brood': 'nuc-brood', '14x12-brood': 'nuc-brood', 'hive-eke': 'nuc-eke' };
const COMPONENT_MAP_TO_HIVE = { 'nuc-roof': 'hive-roof', 'nuc-floor': 'hive-floor', 'nuc-stand': 'hive-stand', 'nuc-brood': 'national-brood', 'nuc-super': 'super', 'nuc-eke': 'hive-eke' };
export function convertHive(hiveId, notes) {
  const hive = getHiveById(hiveId); if (!hive) return null;
  const toNuc = hive.type === 'Hive'; const map = toNuc ? COMPONENT_MAP_TO_NUC : COMPONENT_MAP_TO_HIVE; const newType = toNuc ? 'Nuc' : 'Hive';
  const newComponents = (hive.components || []).map(c => { if (toNuc && c.type === 'queen-excluder') return null; const mapped = map[c.type]; return mapped ? { type: mapped } : c; }).filter(Boolean);
  addActivityRecord({ type: 'Converted', hive: hive.hiveName, notes: `${toNuc ? 'Downsized to Nuc' : 'Upgraded to Hive'}. ${notes || ''}`.trim(), strength: hive.strength, queenSeen: false, broodSpotted: false });
  updateHive(hiveId, { type: newType, components: newComponents });
  return getHiveById(hiveId);
}

// Notes
export function getApiaryNotes(includeDeleted = false) { return _notes.filter(n => includeDeleted || !n.deleted); }
export function toggleNotePin(id) { const n = _notes.find(x => x.id === id); if (n) { n.pinned = !n.pinned; writeAsync('notes', 'update', mapNoteToDv(n), n._dvId || id); } }
export function deleteNote(id) { const n = _notes.find(x => x.id === id); if (n) { n.deleted = true; writeAsync('notes', 'update', mapNoteToDv(n), n._dvId || id); } }
export function editNote(id, newText) { const n = _notes.find(x => x.id === id); if (n) { n.text = newText; n.date = new Date().toISOString().slice(0, 10); writeAsync('notes', 'update', mapNoteToDv(n), n._dvId || id); } }
export function addNote(text, hiveId = null) { const note = { id: 'n' + Date.now(), text, date: new Date().toISOString().slice(0, 10), pinned: false, deleted: false, hiveId }; _notes.unshift(note); writeAsync('notes', 'create', mapNoteToDv(note)); }
export function getHiveNote(hiveId) { return _notes.find(n => n.hiveId === hiveId && !n.deleted) || null; }
export function setHiveNote(hiveId, text) {
  const existing = _notes.find(n => n.hiveId === hiveId && !n.deleted);
  if (existing) { if (!text) { existing.deleted = true; } else { existing.text = text; existing.date = new Date().toISOString().slice(0, 10); existing.pinned = true; } writeAsync('notes', 'update', mapNoteToDv(existing), existing._dvId || existing.id); }
  else if (text) { const note = { id: 'n' + Date.now(), text, date: new Date().toISOString().slice(0, 10), pinned: true, deleted: false, hiveId }; _notes.unshift(note); writeAsync('notes', 'create', mapNoteToDv(note)); }
}

// Tasks
export function getApiaryTasks(includeCompleted = false) { const tasks = _tasks.filter(t => !t.deleted); return includeCompleted ? tasks : tasks.filter(t => !t.done); }
export function toggleTask(id) { const t = _tasks.find(x => x.id === id); if (t) { t.done = !t.done; writeAsync('tasks', 'update', mapTaskToDv(t), t._dvId || id); } }
export function deleteTask(id) { const t = _tasks.find(x => x.id === id); if (t) { t.deleted = true; writeAsync('tasks', 'update', mapTaskToDv(t), t._dvId || id); } }
export function addTask(text, due) { const task = { id: 't' + Date.now(), text, done: false, due, deleted: false }; _tasks.unshift(task); writeAsync('tasks', 'create', mapTaskToDv(task)); }

// Devices (static until IoT connected)
export function getDevices() {
  return [
    { id: 'esp32-1', name: 'ESP32 Hive Scale', type: 'ESP32', location: 'Hive 5 - Survivor', status: 'Online', battery: 4.1, lastSeen: '2026-03-18T09:30:00Z', firmware: 'v1.0.0', ip: '192.168.1.45' },
    { id: 'sb-inside', name: 'SwitchBot Inside', type: 'SwitchBot', location: 'Hive 5 - Survivor (inside)', status: 'Online', battery: 87, lastSeen: '2026-03-18T09:25:00Z', temp: 32.5, humidity: 68 },
    { id: 'sb-outside', name: 'SwitchBot Outside', type: 'SwitchBot', location: 'Apiary (ambient)', status: 'Online', battery: 92, lastSeen: '2026-03-18T09:28:00Z', temp: 14.2, humidity: 55 },
  ];
}
