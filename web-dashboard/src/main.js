/**
 * Apiary AI — Main Entry Point
 */
import './style.css';
import { registerRoute, initRouter } from './router.js';
import { initTheme } from './theme.js';
import { wireDensityToggle } from './theme.js';
import { initHexCorners } from './components/hex-corners.js';
import { initDataStore } from './api/dataverse.js';
import { renderLogin } from './views/login.js';
import { renderApiarySelect } from './views/apiary-select.js';
import { renderApiary } from './views/apiary.js';
import { renderHiveDashboard } from './views/hive-dashboard.js';
import { renderApiaryDashboard } from './views/apiary-dashboard.js';
import { renderInspectionForm } from './views/inspection-form.js';
import { renderAdmin } from './views/admin.js';
import { renderDevices } from './views/devices.js';
import { renderHiveBuilder } from './views/hive-builder.js';
import { renderHiveForm } from './views/hive-form.js';
import { renderTasks } from './views/tasks.js';
import { renderNotes } from './views/notes.js';
import { renderInspections } from './views/inspections-list.js';
import { renderInspectionDetail } from './views/inspection-detail.js';
import { renderHiveArchive } from './views/hive-archive.js';
import { renderHiveArchiveDetail } from './views/hive-archive-detail.js';

// Init theme & embossed hex corners before first render
initTheme();
initHexCorners();

// Register routes
registerRoute('#/login', renderLogin);
registerRoute('#/apiary-select', renderApiarySelect);
registerRoute('#/apiary', renderApiary);
registerRoute('#/hive/:id', renderHiveDashboard);
registerRoute('#/apiary-dashboard', renderApiaryDashboard);
registerRoute('#/inspect', renderInspectionForm);
registerRoute('#/admin', renderAdmin);
registerRoute('#/devices', renderDevices);
registerRoute('#/build/:id', renderHiveBuilder);
registerRoute('#/hive-form/:id', renderHiveForm);
registerRoute('#/tasks', renderTasks);
registerRoute('#/notes', renderNotes);
registerRoute('#/inspections', renderInspections);
registerRoute('#/inspection/:id', renderInspectionDetail);
registerRoute('#/archive', renderHiveArchive);
registerRoute('#/archive/:id', renderHiveArchiveDetail);

// Wire density toggle after each route change
window.addEventListener('hashchange', () => setTimeout(wireDensityToggle, 50));

// Load data from Dataverse, then start router
initDataStore().then(() => {
  initRouter('#/login');
  setTimeout(wireDensityToggle, 100);
});
