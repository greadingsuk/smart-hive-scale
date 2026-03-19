/**
 * API layer for reading data from Power Automate flows and Dataverse.
 */

// Power Automate Read Flow URL (reads gr_hivereadings for IoT sensor data)
const TELEMETRY_READ_URL = 'https://093c0f3bca66ea3daf04bcc8a98c06.10.environment.api.powerplatform.com:443/powerautomate/automations/direct/workflows/64df8c23e1f548e9a7888164706e316c/triggers/manual/paths/invoke?api-version=1&sp=%2Ftriggers%2Fmanual%2Frun&sv=1.0&sig=EeX8QCqqiPt7LsuoR44C2Cah6jwu_6jBcT0901ePSd8';

/**
 * Fetch live IoT telemetry data
 */
export async function fetchTelemetry() {
  const res = await fetch(TELEMETRY_READ_URL);
  if (!res.ok) throw new Error(`Telemetry fetch failed: HTTP ${res.status}`);
  const rows = await res.json();

  return rows.map(r => ({
    weight: r.gr_weight,
    internalTemp: r.gr_internaltemp,
    batteryVoltage: r.gr_batteryvoltage,
    hiveHum: r.gr_hivehum,
    legTemp: r.gr_legtemp,
    timestamp: r.gr_readingtimestamp || r.createdon,
  })).sort((a, b) => new Date(a.timestamp) - new Date(b.timestamp));
}

/**
 * Apiary configuration
 */
export const APIARY = {
  name: 'Home Apiary',
  location: 'Kidmore End, Reading RG4 9AY, UK',
  lat: 51.509,
  lng: -0.975,
};

/**
 * Hive definitions with metadata — now managed via CRUD functions above
 */

/**
 * All activity records (inspection history from CSV import June 2025+)
 * Sorted newest first.
 */
export function getAllActivity() {
  return [
    // Sep 26 — weight checks all hives
    { id: 'a1', date: '2025-09-26', type: 'Inspection', hive: 'Hive 1 - Obsidian', strength: 100, queenSeen: false, broodSpotted: false, notes: 'Left 15.83 Right 15.43' },
    { id: 'a2', date: '2025-09-26', type: 'Inspection', hive: 'Hive 2 - BMH', strength: 100, queenSeen: false, broodSpotted: false, notes: 'Left 15.46 right 13.90' },
    { id: 'a3', date: '2025-09-26', type: 'Inspection', hive: 'Hive 4 - Carly', strength: 71, queenSeen: false, broodSpotted: false, notes: 'Left 12.98 right 13.04' },
    { id: 'a4', date: '2025-09-26', type: 'Inspection', hive: 'Hive 5 - Survivor', strength: 100, queenSeen: false, broodSpotted: false, notes: '16.39 left 15.81 right' },
    { id: 'a5', date: '2025-09-26', type: 'Inspection', hive: 'Hive 6 - Backup', strength: 100, queenSeen: false, broodSpotted: false, notes: '7.66 left 7.27 right' },
    // Sep 8 — detailed inspections
    { id: 'a6', date: '2025-09-08', type: 'Inspection', hive: 'Hive 4 - Carly', strength: 71, queenSeen: false, broodSpotted: true, notes: 'There is a queen but couldn\'t find her. They were active but need to be fed and assessed after winter.' },
    { id: 'a7', date: '2025-09-08', type: 'Inspection', hive: 'Hive 1 - Obsidian', strength: 100, queenSeen: true, broodSpotted: true, notes: 'F1 - stores 70% F2- Stores 50% F3- eggs brood stores 40% F4 - brood, eggs, queen stores 20%...' },
    { id: 'a8', date: '2025-09-08', type: 'Inspection', hive: 'Hive 5 - Survivor', strength: 100, queenSeen: false, broodSpotted: false, notes: 'Lots of bees with stores but will need feeding still. Queen spotted and could see brood larve and eggs.' },
    { id: 'a9', date: '2025-09-08', type: 'Inspection', hive: 'Hive 6 - Backup', strength: 100, queenSeen: true, broodSpotted: true, notes: 'F1 - stores 10% F2 - brood and larve stores 20% F3 - Brood stores 40%...' },
    { id: 'a10', date: '2025-09-08', type: 'Inspection', hive: 'Hive 2 - BMH', strength: 100, queenSeen: true, broodSpotted: true, notes: 'F1 - stores 10% F2 - stores 10% F3 - stores 30%... queen larve eggs tiny brood.' },
    // Sep 5
    { id: 'a11', date: '2025-09-05', type: 'Inspection', hive: 'Hive 6 - Backup', strength: 100, queenSeen: false, broodSpotted: false, notes: 'Left 6.69 Right 7.32' },
    { id: 'a12', date: '2025-09-05', type: 'Inspection', hive: 'Hive 5 - Survivor', strength: 100, queenSeen: false, broodSpotted: false, notes: 'Left 12.76 right 11.55' },
    { id: 'a13', date: '2025-09-05', type: 'Inspection', hive: 'Hive 2 - BMH', strength: 100, queenSeen: false, broodSpotted: false, notes: 'Left 12.66 Right 12.37' },
    { id: 'a14', date: '2025-09-05', type: 'Inspection', hive: 'Hive 1 - Obsidian', strength: 100, queenSeen: false, broodSpotted: false, notes: 'Left 14.39 Right 13.93' },
    // Aug 25
    { id: 'a15', date: '2025-08-25', type: 'Inspection', hive: 'Hive 6 - Backup', strength: 100, queenSeen: false, broodSpotted: false, notes: 'Left 5.71 Right 6.45 added feed' },
    { id: 'a16', date: '2025-08-25', type: 'Inspection', hive: 'Hive 5 - Survivor', strength: 100, queenSeen: false, broodSpotted: false, notes: 'Left 12.75 Right 11.03 added feed' },
    { id: 'a17', date: '2025-08-25', type: 'Inspection', hive: 'Hive 2 - BMH', strength: 100, queenSeen: false, broodSpotted: false, notes: 'Left 12.09 Right 11.66 added feed' },
    { id: 'a18', date: '2025-08-25', type: 'Inspection', hive: 'Hive 1 - Obsidian', strength: 100, queenSeen: false, broodSpotted: false, notes: 'Left 13.33 Right 12.61 added more feed' },
    // Aug 17
    { id: 'a19', date: '2025-08-17', type: 'Inspection', hive: 'Hive 1 - Obsidian', strength: 100, queenSeen: false, broodSpotted: false, notes: 'Super off and feeder added' },
    { id: 'a20', date: '2025-08-17', type: 'Inspection', hive: 'Hive 2 - BMH', strength: 100, queenSeen: false, broodSpotted: false, notes: 'Super off and feeders added' },
    { id: 'a21', date: '2025-08-17', type: 'Inspection', hive: 'Hive 5 - Survivor', strength: 100, queenSeen: false, broodSpotted: false, notes: 'Supers off and feeder added' },
    { id: 'a22', date: '2025-08-17', type: 'Inspection', hive: 'Hive 6 - Backup', strength: 100, queenSeen: true, broodSpotted: true, notes: 'Bit light for winter so added feeder and will start to feed' },
    // Jul 28
    { id: 'a23', date: '2025-07-28', type: 'Inspection', hive: 'Hive 1 - Obsidian', strength: 100, queenSeen: true, broodSpotted: true, notes: 'Built up well. Removed a super to help them finish off and condense down.' },
    { id: 'a24', date: '2025-07-28', type: 'Inspection', hive: 'Hive 2 - BMH', strength: 100, queenSeen: true, broodSpotted: true, notes: 'Doing really well. Removed one super condense them down.' },
    { id: 'a25', date: '2025-07-28', type: 'Inspection', hive: 'Hive 4 - Carly', strength: 100, queenSeen: false, broodSpotted: false, notes: 'No queen. Loads of stores and still horrid.' },
    { id: 'a26', date: '2025-07-28', type: 'Inspection', hive: 'Hive 5 - Survivor', strength: 100, queenSeen: true, broodSpotted: true, notes: 'Doing really well. Supers swapped about so they can finish capping.' },
    { id: 'a27', date: '2025-07-28', type: 'Inspection', hive: 'Hive 6 - Backup', strength: 100, queenSeen: true, broodSpotted: true, notes: 'Queen found. Clipped and marked. She is laying and they are building up.' },
    // Jun 30
    { id: 'a28', date: '2025-06-30', type: 'Inspection', hive: 'Hive 4 - Carly', strength: 100, queenSeen: true, broodSpotted: false, notes: 'Let queen out of cage' },
    // Jun 25
    { id: 'a29', date: '2025-06-25', type: 'Hive Added', hive: 'Hive 6 - Backup', strength: null, queenSeen: false, broodSpotted: false, notes: 'Made from BMH buckfast' },
    { id: 'a30', date: '2025-06-25', type: 'Inspection', hive: 'Hive 2 - BMH', strength: 100, queenSeen: true, broodSpotted: true, notes: 'Good temper and very productive. Took 1 frame nuc off them as insurance policy' },
    { id: 'a31', date: '2025-06-25', type: 'Inspection', hive: 'Hive 1 - Obsidian', strength: 100, queenSeen: true, broodSpotted: true, notes: 'All doing good. Slightly up in face but not to bad.' },
    { id: 'a32', date: '2025-06-25', type: 'Inspection', hive: 'Hive 5 - Survivor', strength: 100, queenSeen: true, broodSpotted: true, notes: 'Added in super' },
    // Jun 20
    { id: 'a33', date: '2025-06-20', type: 'Inspection', hive: 'Hive 4 - Carly', strength: 100, queenSeen: true, broodSpotted: true, notes: 'Ripped down QC and placed new queen in from mating nuc in the queen cage.' },
    // Jun 17
    { id: 'a34', date: '2025-06-17', type: 'Inspection', hive: 'Hive 5 - Survivor', strength: 100, queenSeen: true, broodSpotted: true, notes: 'Going really well. Stores in brood box that could move up.' },
    { id: 'a35', date: '2025-06-17', type: 'Inspection', hive: 'Hive 2 - BMH', strength: 100, queenSeen: true, broodSpotted: true, notes: 'Growing well added 2x supers for the coming flow.' },
    { id: 'a36', date: '2025-06-17', type: 'Inspection', hive: 'Nuc 1 - Obsidian', strength: 100, queenSeen: true, broodSpotted: true, notes: 'All looking good and added 2x supers.' },
    // Jun 13
    { id: 'a37', date: '2025-06-13', type: 'Inspection', hive: 'Hive 4 - Carly', strength: 82, queenSeen: true, broodSpotted: true, notes: 'Queen and 4 shakes off bees taken to remove her to Johnny.' },
    // Jun 3
    { id: 'a38', date: '2025-06-03', type: 'Inspection', hive: 'Hive 1 - Obsidian', strength: 100, queenSeen: true, broodSpotted: true, notes: '2 Queen cells spotted and charged with some empty. Found, marked/clipped queen.' },
    { id: 'a39', date: '2025-06-03', type: 'Inspection', hive: 'Hive 2 - BMH', strength: 100, queenSeen: true, broodSpotted: true, notes: 'Doing well needs a super asap.' },
    { id: 'a40', date: '2025-06-03', type: 'Inspection', hive: 'Hive 5 - Survivor', strength: 100, queenSeen: true, broodSpotted: true, notes: 'Building out well on the plastic frames.' },
  ];
}

/**
 * Get activity grouped by date for timeline display
 */
export function getActivityTimeline() {
  const all = getAllActivity();
  const groups = {};
  for (const a of all) {
    if (!groups[a.date]) groups[a.date] = [];
    groups[a.date].push(a);
  }
  return Object.entries(groups)
    .sort(([a], [b]) => new Date(b) - new Date(a))
    .map(([date, items]) => ({ date, items, count: items.length }));
}

/**
 * Get activity for a specific hive
 */
export function getHiveActivity(hiveName) {
  return getAllActivity().filter(a => a.hive === hiveName);
}

/**
 * Hive component types available for building hive stacks
 */
/**
 * Hive component types — proportional heights based on real dimensions.
 * National boxes are 460mm square. Nucs are ~half width (~230mm).
 * Heights: Super 150mm, National Brood 225mm, 14x12 Brood 315mm.
 * Pixel scale: ~0.2px per mm for visual rendering.
 */
export const COMPONENT_TYPES = [
  // Full hive — realistic poly hive palette
  { id: 'hive-roof',     name: 'Roof',             color: '#7a8078', height: 14, category: 'structure', nuc: false },
  { id: 'hive-floor',    name: 'Floor',            color: '#8B8580', height: 10, category: 'structure', nuc: false },
  { id: 'hive-stand',    name: 'Hive Stand',       color: '#A09080', height: 22, category: 'structure', nuc: false },
  { id: 'super',         name: 'Super',            color: '#90968b', height: 30, category: 'box',       nuc: false },  // 150mm
  { id: 'national-brood',name: 'National Brood',   color: '#90968b', height: 45, category: 'box',       nuc: false },  // 225mm
  { id: '14x12-brood',   name: '14x12 Brood',      color: '#90968b', height: 63, category: 'box',       nuc: false },  // 315mm
  { id: 'queen-excluder',name: 'Queen Excluder',   color: '#BFA67A', height: 6,  category: 'accessory', nuc: false },
  { id: 'hive-eke',      name: 'Hive Eke',         color: '#A89068', height: 18, category: 'accessory', nuc: false },
  // Nuc
  { id: 'nuc-roof',      name: 'Nuc Roof',         color: '#7a8078', height: 12, category: 'structure', nuc: true },
  { id: 'nuc-floor',     name: 'Nuc Floor',        color: '#8B8580', height: 8,  category: 'structure', nuc: true },
  { id: 'nuc-stand',     name: 'Nuc Stand',        color: '#A09080', height: 20, category: 'structure', nuc: true },
  { id: 'nuc-brood',     name: 'Nuc Brood Box',    color: '#90968b', height: 40, category: 'box',       nuc: true },
  { id: 'nuc-super',     name: 'Nuc Super',        color: '#90968b', height: 26, category: 'box',       nuc: true },
  { id: 'nuc-eke',       name: 'Nuc Eke',          color: '#A89068', height: 14, category: 'accessory', nuc: true },
];

export const BREED_OPTIONS = ['Swarm', 'Local', 'Home Bred', 'Buckfast', 'Native Black Bee', 'Carniolan', 'Italian', 'F1 Buckfast', 'Premium F1 Buckfast', 'UK F1 Buckfast', 'Premium UK F1 Buckfast', 'VSH Buckfast', 'UK Mated VSH Buckfast', 'Obsidian', 'Unknown'];
export const HIVE_TYPES = ['National', '14x12', 'Commercial', 'Langstroth', 'WBC', 'Top Bar', 'Poly', 'Other'];
export const QUEEN_SOURCES = ['Bred', 'Purchased', 'Swarm', 'Supersedure', 'Emergency Cell', 'Gift', 'Split', 'Unknown'];
export const QUEEN_COLORS = ['Blue', 'White', 'Yellow', 'Red', 'Green', 'Pink'];

/**
 * In-memory hive store (mutable — persisted to localStorage)
 */
const STORAGE_KEY = 'apiary_hives_v2';

function loadHives() {
  const saved = localStorage.getItem(STORAGE_KEY);
  if (saved) return JSON.parse(saved);
  return [
    { id: 'hive-1', hiveName: 'Hive 1 - Obsidian', type: 'Hive', hiveStyle: '14x12', status: 'Active', strength: 100, beeType: 'Buckfast', color: '#f59e0b', queenMarked: true, queenColor: 'Green', queenYear: 2024, queenClipped: true, queenSource: 'Bred', queenAddedDate: '2024-06-03', queenNotes: 'Found, marked & clipped Jun 2025', dateAdded: '2025-05-16', orientation: 'vertical', components: [{ type: 'hive-roof' }, { type: 'super' }, { type: 'queen-excluder' }, { type: '14x12-brood' }, { type: 'hive-floor' }, { type: 'hive-stand' }] },
    { id: 'hive-2', hiveName: 'Hive 2 - BMH', type: 'Hive', hiveStyle: '14x12', status: 'Active', strength: 100, beeType: 'Buckfast', color: '#ef4444', queenMarked: true, queenColor: 'Pink', queenYear: 2024, queenClipped: false, queenSource: 'Purchased', queenAddedDate: '2024-05-01', queenNotes: '', dateAdded: '2025-04-27', orientation: 'vertical', components: [{ type: 'hive-roof' }, { type: 'super' }, { type: 'super' }, { type: 'queen-excluder' }, { type: '14x12-brood' }, { type: 'hive-floor' }, { type: 'hive-stand' }] },
    { id: 'hive-4', hiveName: 'Hive 4 - Carly', type: 'Hive', hiveStyle: 'National', status: 'Active', strength: 71, beeType: 'Local', color: '#a78bfa', queenMarked: false, queenColor: null, queenYear: 2025, queenClipped: false, queenSource: 'Purchased', queenAddedDate: '2025-06-20', queenNotes: 'New queen caged Jun 20, released Jun 30', dateAdded: '2025-05-12', orientation: 'vertical', components: [{ type: 'hive-roof' }, { type: 'national-brood' }, { type: 'hive-floor' }, { type: 'hive-stand' }] },
    { id: 'hive-5', hiveName: 'Hive 5 - Survivor', type: 'Hive', hiveStyle: '14x12', status: 'Active', strength: 100, beeType: 'Local', color: '#3b82f6', queenMarked: false, queenColor: null, queenYear: 2023, queenClipped: false, queenSource: 'Swarm', queenAddedDate: '2023-08-31', queenNotes: '', dateAdded: '2023-08-31', orientation: 'vertical', components: [{ type: 'hive-roof' }, { type: 'super' }, { type: 'queen-excluder' }, { type: '14x12-brood' }, { type: 'hive-floor' }, { type: 'hive-stand' }] },
    { id: 'hive-6', hiveName: 'Hive 6 - Backup', type: 'Hive', hiveStyle: '14x12', status: 'Active', strength: 100, beeType: 'Buckfast', color: '#22c55e', queenMarked: true, queenColor: 'Blue', queenYear: 2025, queenClipped: true, queenSource: 'Split', queenAddedDate: '2025-06-25', queenNotes: 'Made from BMH buckfast. Clipped & marked Jul 28.', dateAdded: '2025-06-25', orientation: 'vertical', components: [{ type: 'hive-roof' }, { type: '14x12-brood' }, { type: 'hive-floor' }, { type: 'hive-stand' }] },
    { id: 'nuc-1', hiveName: 'Nuc 1 - Obsidian', type: 'Nuc', hiveStyle: 'National', status: 'Active', strength: 100, beeType: 'Buckfast', color: '#06b6d4', queenMarked: false, queenColor: null, queenYear: 2025, queenClipped: false, queenSource: 'Unknown', queenAddedDate: null, queenNotes: '', dateAdded: '2025-05-16', orientation: 'vertical', components: [{ type: 'nuc-roof' }, { type: 'nuc-brood' }, { type: 'nuc-floor' }, { type: 'nuc-stand' }] },
  ];
}

function saveHives(hives) {
  localStorage.setItem(STORAGE_KEY, JSON.stringify(hives));
}

/**
 * Hive CRUD operations
 */
export function getHives() {
  return loadHives();
}

export function getHiveById(id) {
  return loadHives().find(h => h.id === id);
}

export function addHive(hive) {
  const hives = loadHives();
  hive.id = 'hive-' + Date.now();
  hive.dateAdded = new Date().toISOString().slice(0, 10);
  hive.status = 'Active';
  hives.push(hive);
  saveHives(hives);
  return hive;
}

export function updateHive(id, updates) {
  const hives = loadHives();
  const idx = hives.findIndex(h => h.id === id);
  if (idx === -1) return null;
  hives[idx] = { ...hives[idx], ...updates };
  saveHives(hives);
  return hives[idx];
}

export function deleteHive(id) {
  const hives = loadHives().filter(h => h.id !== id);
  saveHives(hives);
}

/**
 * Hive component operations
 */
export function addComponent(hiveId, componentType, position) {
  const hives = loadHives();
  const hive = hives.find(h => h.id === hiveId);
  if (!hive) return;
  if (!hive.components) hive.components = [];
  // Insert before the stand (last item) by default
  const insertAt = position != null ? position : Math.max(0, hive.components.length - 1);
  hive.components.splice(insertAt, 0, { type: componentType });
  saveHives(hives);
}

export function removeComponent(hiveId, index) {
  const hives = loadHives();
  const hive = hives.find(h => h.id === hiveId);
  if (!hive || !hive.components) return;
  hive.components.splice(index, 1);
  saveHives(hives);
}

export function moveComponent(hiveId, fromIndex, toIndex) {
  const hives = loadHives();
  const hive = hives.find(h => h.id === hiveId);
  if (!hive || !hive.components) return;
  if (toIndex < 0 || toIndex >= hive.components.length) return;
  const [item] = hive.components.splice(fromIndex, 1);
  hive.components.splice(toIndex, 0, item);
  saveHives(hives);
}

/**
 * Hive operations — Split, Combine, Dead Out, Move
 * Each creates a timeline note on the relevant hive(s).
 */

const ACTIVITY_KEY = 'apiary_activity';

function loadActivity() {
  const saved = localStorage.getItem(ACTIVITY_KEY);
  return saved ? JSON.parse(saved) : [];
}

function saveActivity(records) {
  localStorage.setItem(ACTIVITY_KEY, JSON.stringify(records));
}

function addActivityRecord(record) {
  const all = loadActivity();
  all.unshift({ ...record, date: record.date || new Date().toISOString().slice(0, 10) });
  saveActivity(all);
}

export function splitHive(sourceId, newHiveName, notes) {
  const source = getHiveById(sourceId);
  if (!source) return null;

  // Create the new hive (starts fresh — no history carried over)
  const isNuc = true; // splits usually go into a nuc
  const newHive = addHive({
    hiveName: newHiveName,
    type: 'Nuc',
    hiveStyle: source.hiveStyle,
    beeType: source.beeType,
    color: '#06b6d4',
    strength: 50,
    queenMarked: false,
    queenColor: null,
    queenYear: new Date().getFullYear(),
    orientation: 'vertical',
    components: [{ type: 'nuc-roof' }, { type: 'nuc-brood' }, { type: 'nuc-floor' }, { type: 'nuc-stand' }],
  });

  // Add timeline notes to both
  addActivityRecord({ type: 'Split', hive: source.hiveName, notes: `Split made — new nuc "${newHiveName}" created. ${notes || ''}`.trim(), strength: source.strength, queenSeen: false, broodSpotted: false });
  addActivityRecord({ type: 'Split', hive: newHiveName, notes: `Split from ${source.hiveName}. ${notes || ''}`.trim(), strength: 50, queenSeen: false, broodSpotted: false });

  return newHive;
}

export function combineHives(primaryId, secondaryId, notes) {
  const primary = getHiveById(primaryId);
  const secondary = getHiveById(secondaryId);
  if (!primary || !secondary) return;

  addActivityRecord({ type: 'Combined', hive: primary.hiveName, notes: `Combined with ${secondary.hiveName}. ${notes || ''}`.trim(), strength: primary.strength, queenSeen: false, broodSpotted: false });
  addActivityRecord({ type: 'Combined', hive: secondary.hiveName, notes: `Combined into ${primary.hiveName}. Hive deactivated. ${notes || ''}`.trim(), strength: 0, queenSeen: false, broodSpotted: false });

  // Deactivate the secondary
  updateHive(secondaryId, { status: 'Combined' });
}

export function deadOutHive(hiveId, notes) {
  const hive = getHiveById(hiveId);
  if (!hive) return;

  addActivityRecord({ type: 'Hive Death', hive: hive.hiveName, notes: notes || 'Colony died out.', strength: 0, queenSeen: false, broodSpotted: false });
  updateHive(hiveId, { status: 'Dead', strength: 0 });
}

export function moveHive(hiveId, newLocation, notes) {
  const hive = getHiveById(hiveId);
  if (!hive) return;

  addActivityRecord({ type: 'Moved', hive: hive.hiveName, notes: `Moved to ${newLocation}. ${notes || ''}`.trim(), strength: hive.strength, queenSeen: false, broodSpotted: false });
}

/**
 * Convert between Hive and Nuc — swaps all components to matching type.
 */
const COMPONENT_MAP_TO_NUC = {
  'hive-roof': 'nuc-roof', 'hive-floor': 'nuc-floor', 'hive-stand': 'nuc-stand',
  'super': 'nuc-super', 'national-brood': 'nuc-brood', '14x12-brood': 'nuc-brood',
  'hive-eke': 'nuc-eke',
};
const COMPONENT_MAP_TO_HIVE = {
  'nuc-roof': 'hive-roof', 'nuc-floor': 'hive-floor', 'nuc-stand': 'hive-stand',
  'nuc-brood': 'national-brood', 'nuc-super': 'super', 'nuc-eke': 'hive-eke',
};

export function convertHive(hiveId, notes) {
  const hive = getHiveById(hiveId);
  if (!hive) return null;

  const toNuc = hive.type === 'Hive';
  const map = toNuc ? COMPONENT_MAP_TO_NUC : COMPONENT_MAP_TO_HIVE;
  const newType = toNuc ? 'Nuc' : 'Hive';

  // Convert components — drop queen excluder when going to nuc (not used), keep when going to hive
  const newComponents = (hive.components || [])
    .map(c => {
      if (toNuc && c.type === 'queen-excluder') return null; // drop QE for nucs
      const mapped = map[c.type];
      return mapped ? { type: mapped } : c;
    })
    .filter(Boolean);

  const direction = toNuc ? 'Downsized to Nuc' : 'Upgraded to Hive';
  addActivityRecord({ type: 'Converted', hive: hive.hiveName, notes: `${direction}. ${notes || ''}`.trim(), strength: hive.strength, queenSeen: false, broodSpotted: false });

  updateHive(hiveId, { type: newType, components: newComponents });
  return getHiveById(hiveId);
}

/**
 * Get all activity — merges static CSV data + localStorage records
 */
export function getCustomActivity() {
  return loadActivity();
}

/**
 * Notes — persisted to localStorage
 */
const NOTES_KEY = 'apiary_notes';

function loadNotes() {
  const saved = localStorage.getItem(NOTES_KEY);
  if (saved) return JSON.parse(saved);
  return [
    { id: 'n1', text: '157c oxalic acid 2:1 sugar syrup in metric is 1.6kg to 1L', date: '2024-07-14', pinned: true, deleted: false },
    { id: 'n2', text: 'Spring inspection schedule begins mid-March', date: '2025-03-01', pinned: false, deleted: false },
  ];
}

function saveNotes(notes) { localStorage.setItem(NOTES_KEY, JSON.stringify(notes)); }

export function getApiaryNotes(includeDeleted = false) {
  return loadNotes().filter(n => includeDeleted || !n.deleted);
}

export function toggleNotePin(id) {
  const notes = loadNotes();
  const n = notes.find(x => x.id === id);
  if (n) { n.pinned = !n.pinned; saveNotes(notes); }
}

export function deleteNote(id) {
  const notes = loadNotes();
  const n = notes.find(x => x.id === id);
  if (n) { n.deleted = true; saveNotes(notes); }
}

export function editNote(id, newText) {
  const notes = loadNotes();
  const n = notes.find(x => x.id === id);
  if (n) { n.text = newText; n.date = new Date().toISOString().slice(0, 10); saveNotes(notes); }
}

export function addNote(text, hiveId = null) {
  const notes = loadNotes();
  notes.unshift({ id: 'n' + Date.now(), text, date: new Date().toISOString().slice(0, 10), pinned: false, deleted: false, hiveId });
  saveNotes(notes);
}

export function getHiveNote(hiveId) {
  return loadNotes().find(n => n.hiveId === hiveId && !n.deleted) || null;
}

export function setHiveNote(hiveId, text) {
  const notes = loadNotes();
  const existing = notes.find(n => n.hiveId === hiveId && !n.deleted);
  if (existing) {
    if (!text) { existing.deleted = true; }
    else { existing.text = text; existing.date = new Date().toISOString().slice(0, 10); existing.pinned = true; }
  } else if (text) {
    notes.unshift({ id: 'n' + Date.now(), text, date: new Date().toISOString().slice(0, 10), pinned: true, deleted: false, hiveId });
  }
  saveNotes(notes);
}

/**
 * Tasks — persisted to localStorage
 */
const TASKS_KEY = 'apiary_tasks';

function loadTasks() {
  const saved = localStorage.getItem(TASKS_KEY);
  if (saved) return JSON.parse(saved);
  return [
    { id: 't1', text: 'Spring varroa check all hives', done: false, due: '2026-03-20', deleted: false },
    { id: 't2', text: 'Order new frames for Hive 4', done: false, due: '2026-04-01', deleted: false },
    { id: 't3', text: 'Check fondant levels', done: true, due: '2026-03-15', deleted: false },
    { id: 't4', text: 'Assemble new nuc boxes', done: false, due: '2026-04-10', deleted: false },
  ];
}

function saveTasks(tasks) { localStorage.setItem(TASKS_KEY, JSON.stringify(tasks)); }

export function getApiaryTasks(includeCompleted = false) {
  const tasks = loadTasks().filter(t => !t.deleted);
  return includeCompleted ? tasks : tasks.filter(t => !t.done);
}

export function toggleTask(id) {
  const tasks = loadTasks();
  const t = tasks.find(x => x.id === id);
  if (t) { t.done = !t.done; saveTasks(tasks); }
}

export function deleteTask(id) {
  const tasks = loadTasks();
  const t = tasks.find(x => x.id === id);
  if (t) { t.deleted = true; saveTasks(tasks); }
}

export function addTask(text, due) {
  const tasks = loadTasks();
  tasks.unshift({ id: 't' + Date.now(), text, done: false, due, deleted: false });
  saveTasks(tasks);
}

/**
 * Device health data (ESP32 + SwitchBot sensors)
 */
export function getDevices() {
  return [
    { id: 'esp32-1', name: 'ESP32 Hive Scale', type: 'ESP32', location: 'Hive 5 - Survivor', status: 'Online', battery: 4.1, lastSeen: '2026-03-18T09:30:00Z', firmware: 'v1.0.0', ip: '192.168.1.45' },
    { id: 'sb-inside', name: 'SwitchBot Inside', type: 'SwitchBot', location: 'Hive 5 - Survivor (inside)', status: 'Online', battery: 87, lastSeen: '2026-03-18T09:25:00Z', temp: 32.5, humidity: 68 },
    { id: 'sb-outside', name: 'SwitchBot Outside', type: 'SwitchBot', location: 'Apiary (ambient)', status: 'Online', battery: 92, lastSeen: '2026-03-18T09:28:00Z', temp: 14.2, humidity: 55 },
  ];
}
