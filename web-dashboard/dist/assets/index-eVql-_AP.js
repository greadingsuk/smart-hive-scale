const __vite__mapDeps=(i,m=__vite__mapDeps,d=(m.f||(m.f=["assets/chartjs-adapter-date-fns.esm-CV7ru7NP.js","assets/chart-19k6OvwP.js"])))=>i.map(i=>d[i]);
(function(){const i=document.createElement("link").relList;if(i&&i.supports&&i.supports("modulepreload"))return;for(const s of document.querySelectorAll('link[rel="modulepreload"]'))n(s);new MutationObserver(s=>{for(const a of s)if(a.type==="childList")for(const o of a.addedNodes)o.tagName==="LINK"&&o.rel==="modulepreload"&&n(o)}).observe(document,{childList:!0,subtree:!0});function t(s){const a={};return s.integrity&&(a.integrity=s.integrity),s.referrerPolicy&&(a.referrerPolicy=s.referrerPolicy),s.crossOrigin==="use-credentials"?a.credentials="include":s.crossOrigin==="anonymous"?a.credentials="omit":a.credentials="same-origin",a}function n(s){if(s.ep)return;s.ep=!0;const a=t(s);fetch(s.href,a)}})();const we={};let Y=null;function L(e,i){we[e]=i}function qe(e="#/login"){async function i(){const t=window.location.hash||e,n=sessionStorage.getItem("hive_user");if(!n&&t!=="#/login"){window.location.hash="#/login";return}if(n&&t==="#/login"){window.location.hash="#/apiary";return}let s=null,a={};const o=t.split("?")[0];for(const[l,d]of Object.entries(we)){const c=l.split("/"),h=o.split("/");if(c.length!==h.length)continue;let p=!0;const m={};for(let v=0;v<c.length;v++)if(c[v].startsWith(":"))m[c[v].slice(1)]=decodeURIComponent(h[v]);else if(c[v]!==h[v]){p=!1;break}if(p){s=d,a=m;break}}if(s){Y&&(Y(),Y=null);const l=document.getElementById("app"),d=await s(l,a);typeof d=="function"&&(Y=d)}}window.addEventListener("hashchange",i),i()}const ke="apiary_theme";function je(){localStorage.getItem(ke)==="light"&&document.documentElement.classList.add("light"),le()}function Re(){document.documentElement.classList.toggle("light");const e=document.documentElement.classList.contains("light");localStorage.setItem(ke,e?"light":"dark"),le()}function le(){const e=document.documentElement.classList.contains("light");document.querySelectorAll(".theme-icon-dark").forEach(i=>i.classList.toggle("hidden",e)),document.querySelectorAll(".theme-icon-light").forEach(i=>i.classList.toggle("hidden",!e)),document.querySelectorAll(".theme-knob").forEach(i=>{i.style.left=e?"14px":"2px"})}function $e(){document.querySelectorAll("#themeToggle").forEach(e=>{const i=e.cloneNode(!0);e.parentNode.replaceChild(i,e),i.addEventListener("click",()=>{Re()})}),le()}function G(e,i,t){const n=[];for(let s=0;s<6;s++){const a=Math.PI/3*s-Math.PI/6;n.push(`${e+t*Math.cos(a)},${i+t*Math.sin(a)}`)}return`M${n.join("L")}Z`}function Pe(){const a=[];for(let o=0;o<5;o++){const l=o%2===0?4:3;for(let d=0;d<l;d++){const c=d*140.4+(o%2===0?0:105.30000000000001)+78,h=650-o*156*.5-78,p=Math.sqrt(c*c+(650-h)*(650-h))/Math.sqrt(750*750+650*650),m=Math.max(0,1-p*2);m>.05&&a.push({x:c,y:h,opacity:m})}}return Se(750,650,a,78,"bl")}function Fe(){const a=[];for(let o=0;o<4;o++)for(let d=0;d<3;d++){const c=600-d*144-80,h=o*160*.5+80,p=Math.sqrt((600-c)*(600-c)+h*h)/Math.sqrt(600*600+500*500),m=Math.max(0,1-p*2.2);m>.05&&a.push({x:c,y:h,opacity:m})}return Se(600,500,a,80,"tr")}function Se(e,i,t,n,s){const a=document.documentElement.classList.contains("light"),o="http://www.w3.org/2000/svg",l=document.createElementNS(o,"svg");l.setAttribute("width","100%"),l.setAttribute("height","100%"),l.setAttribute("viewBox",`0 0 ${e} ${i}`),l.setAttribute("preserveAspectRatio","none");const d=document.createElementNS(o,"defs"),c=document.createElementNS(o,"filter");c.setAttribute("id",`emboss-${s}`),c.setAttribute("x","-20%"),c.setAttribute("y","-20%"),c.setAttribute("width","140%"),c.setAttribute("height","140%");const h=document.createElementNS(o,"feGaussianBlur");h.setAttribute("in","SourceAlpha"),h.setAttribute("stdDeviation","3"),h.setAttribute("result","blur");const p=document.createElementNS(o,"feDiffuseLighting");p.setAttribute("in","blur"),p.setAttribute("surfaceScale","6"),p.setAttribute("diffuseConstant","0.7"),p.setAttribute("result","diffuse"),p.setAttribute("lighting-color",a?"#c8b890":"#4a6a8a");const m=document.createElementNS(o,"feDistantLight");m.setAttribute("azimuth","315"),m.setAttribute("elevation","25"),p.appendChild(m);const v=document.createElementNS(o,"feSpecularLighting");v.setAttribute("in","blur"),v.setAttribute("surfaceScale","5"),v.setAttribute("specularConstant","0.4"),v.setAttribute("specularExponent","20"),v.setAttribute("result","specular"),v.setAttribute("lighting-color",a?"#e8dcc0":"#8ab4d8");const r=document.createElementNS(o,"feDistantLight");r.setAttribute("azimuth","315"),r.setAttribute("elevation","30"),v.appendChild(r);const u=document.createElementNS(o,"feComposite");u.setAttribute("in","specular"),u.setAttribute("in2","diffuse"),u.setAttribute("operator","arithmetic"),u.setAttribute("k1","0"),u.setAttribute("k2","1"),u.setAttribute("k3","1"),u.setAttribute("k4","0"),u.setAttribute("result","lit");const f=document.createElementNS(o,"feComposite");f.setAttribute("in","lit"),f.setAttribute("in2","SourceAlpha"),f.setAttribute("operator","in"),f.setAttribute("result","clipped");const w=document.createElementNS(o,"feMerge"),M=document.createElementNS(o,"feMergeNode");M.setAttribute("in","clipped");const y=document.createElementNS(o,"feMergeNode");y.setAttribute("in","SourceGraphic"),w.appendChild(M),w.appendChild(y),c.appendChild(h),c.appendChild(p),c.appendChild(v),c.appendChild(u),c.appendChild(f),c.appendChild(w),d.appendChild(c);const k=document.createElementNS(o,"filter");k.setAttribute("id",`shadow-${s}`),k.setAttribute("x","-30%"),k.setAttribute("y","-30%"),k.setAttribute("width","160%"),k.setAttribute("height","160%");const C=document.createElementNS(o,"feDropShadow");return C.setAttribute("dx","4"),C.setAttribute("dy","6"),C.setAttribute("stdDeviation","8"),C.setAttribute("flood-color",a?"rgba(0,0,0,0.15)":"rgba(0,0,0,0.5)"),k.appendChild(C),d.appendChild(k),l.appendChild(d),t.forEach(({x:N,y:I,opacity:x})=>{const B=document.createElementNS(o,"g");B.setAttribute("opacity",String(x));const j=document.createElementNS(o,"path");j.setAttribute("d",G(N,I,n*.92)),j.setAttribute("fill",a?"rgba(180,165,140,0.3)":"rgba(8,16,28,0.7)"),j.setAttribute("filter",`url(#shadow-${s})`),B.appendChild(j);const g=document.createElementNS(o,"path");g.setAttribute("d",G(N,I,n*.92)),g.setAttribute("fill",a?"rgba(215,205,185,0.6)":"rgba(14,28,48,0.85)"),g.setAttribute("filter",`url(#emboss-${s})`),B.appendChild(g);const b=document.createElementNS(o,"path");b.setAttribute("d",G(N,I,n*.92)),b.setAttribute("fill","none"),b.setAttribute("stroke",a?"rgba(255,255,255,0.4)":"rgba(255,255,255,0.06)"),b.setAttribute("stroke-width","1.5"),B.appendChild(b);const S=document.createElementNS(o,"path");S.setAttribute("d",G(N,I,n*.95)),S.setAttribute("fill","none"),S.setAttribute("stroke",a?"rgba(160,145,120,0.2)":"rgba(255,255,255,0.04)"),S.setAttribute("stroke-width","0.8"),B.appendChild(S),l.appendChild(B)}),l}function Oe(){ue(),new MutationObserver(()=>{document.querySelectorAll(".hex-corner-svg").forEach(i=>i.remove()),ue()}).observe(document.documentElement,{attributes:!0,attributeFilter:["class"]})}function ue(){const e=document.createElement("div");e.className="hex-corner-svg hex-corner-svg--bl",e.setAttribute("aria-hidden","true"),e.appendChild(Pe()),document.body.insertBefore(e,document.body.firstChild);const i=document.createElement("div");i.className="hex-corner-svg hex-corner-svg--tr",i.setAttribute("aria-hidden","true"),i.appendChild(Fe()),document.body.insertBefore(i,document.body.firstChild)}const ze="https://prod-25.ukwest.logic.azure.com:443/workflows/2a2177c3c7174e0cbd8fa0392b36fd17/triggers/manual/paths/invoke?api-version=2019-05-01&sp=%2Ftriggers%2Fmanual%2Frun&sv=1.0&sig=Mlt3jgZT4UQhN6-doEkU-FrAGZZWzneDHvmyBZfX8Sg",ve="https://prod-01.ukwest.logic.azure.com:443/workflows/3ee8a8759b6248d38b47c30ab29abca1/triggers/manual/paths/invoke?api-version=2019-05-01&sp=%2Ftriggers%2Fmanual%2Frun&sv=1.0&sig=6BX8eq06bY1I2fJMqMRuszsIsFTL8kDZ4yOQF66OD-c",pe="https://prod-00.ukwest.logic.azure.com:443/workflows/85b5d48749124f93ab929e8aacbecdf3/triggers/manual/paths/invoke?api-version=2019-05-01&sp=%2Ftriggers%2Fmanual%2Frun&sv=1.0&sig=ygYwSYDDTVPEwpSI5ynZ-8fJQd1aLaMEDuMFooN7w24";let A=[],O=[],D=[],V=[],ee=!1;async function We(){if(!ee)try{const[e,i,t,n]=await Promise.all([Q("hives"),Q("inspections"),Q("notes"),Q("tasks")]);A=e.map(Ue),O=i.map(Ye).sort((s,a)=>new Date(a.date)-new Date(s.date)),D=t.map(Ge),V=n.map(Qe),ee=!0}catch(e){console.error("Failed to load from Dataverse:",e),ee=!0}}async function Q(e){if(ve.includes("%%"))return console.warn(`Read flow not configured for ${e}`),[];const i=new URL(ve);i.searchParams.set("entity",e);const t=await fetch(i.toString());if(!t.ok)throw new Error(`Read ${e}: HTTP ${t.status}`);return t.json()}async function Ve(e,i,t,n){if(pe.includes("%%"))return console.warn("Write flow not configured"),null;const s=await fetch(pe,{method:"POST",headers:{"Content-Type":"application/json"},body:JSON.stringify({entity:e,operation:i,data:t,id:n})});if(!s.ok)throw new Error(`Write ${e}/${i}: HTTP ${s.status}`);const a=await s.text();return a?JSON.parse(a):null}function $(e,i,t,n){Ve(e,i,t,n).catch(s=>console.error("Async write failed:",s))}function se(e,i){if(!e)return i;try{return JSON.parse(e)}catch{return i}}function Ue(e){return{id:e.gr_hiveid,hiveName:e.gr_name,type:e.gr_hivetype||"Hive",hiveStyle:e.gr_hivestyle||"",status:e.gr_status||"Active",strength:e.gr_strength??0,beeType:e.gr_beetype||"",color:e.gr_color||"#f59e0b",queenMarked:!!e.gr_queenmarked,queenColor:e.gr_queencolor||null,queenYear:e.gr_queenyear||null,queenClipped:!!e.gr_queenclipped,queenSource:e.gr_queensource||"",queenAddedDate:e.gr_queenaddeddate?e.gr_queenaddeddate.slice(0,10):null,queenNotes:e.gr_queennotes||"",dateAdded:e.gr_dateadded?e.gr_dateadded.slice(0,10):new Date().toISOString().slice(0,10),orientation:e.gr_orientation||"vertical",components:se(e.gr_components,[])}}function U(e){return{gr_name:e.hiveName,gr_hivetype:e.type,gr_hivestyle:e.hiveStyle,gr_status:e.status,gr_strength:e.strength,gr_beetype:e.beeType,gr_color:e.color,gr_queenmarked:e.queenMarked,gr_queencolor:e.queenColor,gr_queenyear:e.queenYear,gr_queenclipped:e.queenClipped,gr_queensource:e.queenSource,gr_queenaddeddate:e.queenAddedDate,gr_queennotes:e.queenNotes,gr_components:JSON.stringify(e.components||[]),gr_dateadded:e.dateAdded,gr_orientation:e.orientation}}function Ye(e){return{id:e.gr_inspectionid||e.gr_name,date:e.gr_activitydate?e.gr_activitydate.slice(0,10):"",type:e.gr_activitytype||"Inspection",hive:e.gr_hivename||"",strength:e.gr_strength,queenSeen:!!e.gr_queenseen,broodSpotted:!!e.gr_broodspotted,queenCells:!!e.gr_queencells,temperament:e.gr_temperament||"",broodPattern:e.gr_broodpattern||"",weightLeft:e.gr_weightleft,weightRight:e.gr_weightright,weightTotal:e.gr_weighttotal,diseases:se(e.gr_diseases,[]),pests:se(e.gr_pests,[]),notes:e.gr_notes||"",weatherTemp:e.gr_weathertemp,weatherConditions:e.gr_weatherconditions||"",_dvId:e.gr_inspectionid}}function Ee(e){return{gr_name:e.id||"insp-"+Date.now(),gr_activitydate:e.date,gr_activitytype:e.type||"Inspection",gr_hivename:e.hive,gr_strength:e.strength,gr_queenseen:e.queenSeen,gr_broodspotted:e.broodSpotted,gr_queencells:e.queenCells,gr_temperament:e.temperament,gr_broodpattern:e.broodPattern,gr_weightleft:e.weightLeft,gr_weightright:e.weightRight,gr_weighttotal:e.weightTotal,gr_diseases:JSON.stringify(e.diseases||[]),gr_pests:JSON.stringify(e.pests||[]),gr_notes:e.notes,gr_weathertemp:e.weatherTemp,gr_weatherconditions:e.weatherConditions}}function Ge(e){return{id:e.gr_noteid||e.gr_name,text:e.gr_text||"",date:e.gr_notedate?e.gr_notedate.slice(0,10):"",pinned:!!e.gr_pinned,deleted:!!e.gr_deleted,hiveId:e.gr_hiveid||null,_dvId:e.gr_noteid}}function F(e){return{gr_name:e.id||"n"+Date.now(),gr_text:e.text,gr_notedate:e.date,gr_pinned:e.pinned,gr_deleted:e.deleted,gr_hiveid:e.hiveId||""}}function Qe(e){return{id:e.gr_taskid||e.gr_name,text:e.gr_text||"",done:!!e.gr_done,due:e.gr_duedate?e.gr_duedate.slice(0,10):null,deleted:!!e.gr_deleted,_dvId:e.gr_taskid}}function re(e){return{gr_name:e.id||"t"+Date.now(),gr_text:e.text,gr_done:e.done,gr_duedate:e.due,gr_deleted:e.deleted}}async function Je(){const e=await fetch(ze);if(!e.ok)throw new Error(`Telemetry fetch failed: HTTP ${e.status}`);return(await e.json()).map(t=>({weight:t.gr_weight,internalTemp:t.gr_internaltemp,batteryVoltage:t.gr_batteryvoltage,hiveHum:t.gr_hivehum,legTemp:t.gr_legtemp,timestamp:t.gr_readingtimestamp||t.createdon})).sort((t,n)=>new Date(t.timestamp)-new Date(n.timestamp))}const q={name:"Home Apiary",location:"Kidmore End, Reading RG4 9AY, UK",lat:51.509,lng:-.975};function Ce(){return O}function Ze(){const e={};for(const i of O)e[i.date]||(e[i.date]=[]),e[i.date].push(i);return Object.entries(e).sort(([i],[t])=>new Date(t)-new Date(i)).map(([i,t])=>({date:i,items:t,count:t.length}))}function Ke(e){return O.filter(i=>i.hive===e)}function Be(){return[]}function Xe(e){const i={...e,id:e.id||"insp-"+Date.now()};O.unshift(i),$("inspections","create",Ee(i))}const ie=[{id:"hive-roof",name:"Roof",color:"#7a8078",height:14,category:"structure",nuc:!1},{id:"hive-floor",name:"Floor",color:"#8B8580",height:10,category:"structure",nuc:!1},{id:"hive-stand",name:"Hive Stand",color:"#A09080",height:34,category:"structure",nuc:!1},{id:"hive-stand-iot",name:"Hive Stand IOT",color:"#5B7A5E",height:38,category:"structure",nuc:!1},{id:"super",name:"Super",color:"#90968b",height:30,category:"box",nuc:!1},{id:"national-brood",name:"National Brood",color:"#90968b",height:45,category:"box",nuc:!1},{id:"14x12-brood",name:"14x12 Brood",color:"#90968b",height:63,category:"box",nuc:!1},{id:"queen-excluder",name:"Queen Excluder",color:"#BFA67A",height:6,category:"accessory",nuc:!1},{id:"hive-eke",name:"Hive Eke",color:"#A89068",height:18,category:"accessory",nuc:!1},{id:"nuc-roof",name:"Nuc Roof",color:"#7a8078",height:12,category:"structure",nuc:!0},{id:"nuc-floor",name:"Nuc Floor",color:"#8B8580",height:8,category:"structure",nuc:!0},{id:"nuc-stand",name:"Nuc Stand",color:"#A09080",height:30,category:"structure",nuc:!0},{id:"nuc-stand-iot",name:"Nuc Stand IOT",color:"#5B7A5E",height:34,category:"structure",nuc:!0},{id:"nuc-brood",name:"Nuc Brood Box",color:"#90968b",height:40,category:"box",nuc:!0},{id:"nuc-super",name:"Nuc Super",color:"#90968b",height:26,category:"box",nuc:!0},{id:"nuc-eke",name:"Nuc Eke",color:"#A89068",height:14,category:"accessory",nuc:!0}],et=["Swarm","Local","Home Bred","Buckfast","Native Black Bee","Carniolan","Italian","F1 Buckfast","Premium F1 Buckfast","UK F1 Buckfast","Premium UK F1 Buckfast","VSH Buckfast","UK Mated VSH Buckfast","Obsidian","Unknown"],tt=["National","14x12","Commercial","Langstroth","WBC","Top Bar","Poly","Other"],st=["Bred","Purchased","Swarm","Supersedure","Emergency Cell","Gift","Split","Unknown"],it=["Blue","White","Yellow","Red","Green","Pink"];function W(){return A}function H(e){return A.find(i=>i.id===e)}function Ae(e){return e.id=e.id||"hive-"+Date.now(),e.dateAdded=e.dateAdded||new Date().toISOString().slice(0,10),e.status=e.status||"Active",A.push(e),$("hives","create",U(e)),e}function X(e,i){const t=A.findIndex(n=>n.id===e);return t===-1?null:(A[t]={...A[t],...i},$("hives","update",U(A[t]),e),A[t])}function nt(e){A=A.filter(i=>i.id!==e),$("hives","delete",null,e)}function at(e,i,t){const n=A.find(a=>a.id===e);if(!n)return;n.components||(n.components=[]);const s=Math.max(0,n.components.length-1);n.components.splice(s,0,{type:i}),$("hives","update",U(n),e)}function he(e,i){const t=A.find(n=>n.id===e);!t||!t.components||(t.components.splice(i,1),$("hives","update",U(t),e))}function me(e,i,t){const n=A.find(a=>a.id===e);if(!n||!n.components||t<0||t>=n.components.length)return;const[s]=n.components.splice(i,1);n.components.splice(t,0,s),$("hives","update",U(n),e)}function P(e){const i={...e,id:"insp-"+Date.now(),date:e.date||new Date().toISOString().slice(0,10)};O.unshift(i),$("inspections","create",Ee(i))}function ot(e,i,t){const n=H(e);if(!n)return null;const s=Ae({hiveName:i,type:"Nuc",hiveStyle:n.hiveStyle,beeType:n.beeType,color:"#06b6d4",strength:50,queenMarked:!1,queenColor:null,queenYear:new Date().getFullYear(),orientation:"vertical",components:[{type:"nuc-roof"},{type:"nuc-brood"},{type:"nuc-floor"},{type:"nuc-stand"}]});return P({type:"Split",hive:n.hiveName,notes:`Split made — new nuc "${i}" created. ${t||""}`.trim(),strength:n.strength,queenSeen:!1,broodSpotted:!1}),P({type:"Split",hive:i,notes:`Split from ${n.hiveName}. ${t||""}`.trim(),strength:50,queenSeen:!1,broodSpotted:!1}),s}function lt(e,i,t){const n=H(e),s=H(i);!n||!s||(P({type:"Combined",hive:n.hiveName,notes:`Combined with ${s.hiveName}. ${t||""}`.trim(),strength:n.strength,queenSeen:!1,broodSpotted:!1}),P({type:"Combined",hive:s.hiveName,notes:`Combined into ${n.hiveName}. Hive deactivated. ${t||""}`.trim(),strength:0,queenSeen:!1,broodSpotted:!1}),X(i,{status:"Combined"}))}function rt(e,i){const t=H(e);t&&(P({type:"Hive Death",hive:t.hiveName,notes:i||"Colony died out.",strength:0,queenSeen:!1,broodSpotted:!1}),X(e,{status:"Dead",strength:0}))}function dt(e,i,t){const n=H(e);n&&P({type:"Moved",hive:n.hiveName,notes:`Moved to ${i}. ${t||""}`.trim(),strength:n.strength,queenSeen:!1,broodSpotted:!1})}const ct={"hive-roof":"nuc-roof","hive-floor":"nuc-floor","hive-stand":"nuc-stand",super:"nuc-super","national-brood":"nuc-brood","14x12-brood":"nuc-brood","hive-eke":"nuc-eke"},ut={"nuc-roof":"hive-roof","nuc-floor":"hive-floor","nuc-stand":"hive-stand","nuc-brood":"national-brood","nuc-super":"super","nuc-eke":"hive-eke"};function vt(e,i){const t=H(e);if(!t)return null;const n=t.type==="Hive",s=n?ct:ut,a=n?"Nuc":"Hive",o=(t.components||[]).map(l=>{if(n&&l.type==="queen-excluder")return null;const d=s[l.type];return d?{type:d}:l}).filter(Boolean);return P({type:"Converted",hive:t.hiveName,notes:`${n?"Downsized to Nuc":"Upgraded to Hive"}. ${i||""}`.trim(),strength:t.strength,queenSeen:!1,broodSpotted:!1}),X(e,{type:a,components:o}),H(e)}function Me(e=!1){return D.filter(i=>e||!i.deleted)}function pt(e){const i=D.find(t=>t.id===e);i&&(i.pinned=!i.pinned,$("notes","update",F(i),i._dvId||e))}function ht(e){const i=D.find(t=>t.id===e);i&&(i.deleted=!0,$("notes","update",F(i),i._dvId||e))}function mt(e,i){const t=D.find(n=>n.id===e);t&&(t.text=i,t.date=new Date().toISOString().slice(0,10),$("notes","update",F(t),t._dvId||e))}function gt(e,i=null){const t={id:"n"+Date.now(),text:e,date:new Date().toISOString().slice(0,10),pinned:!1,deleted:!1,hiveId:i};D.unshift(t),$("notes","create",F(t))}function xt(e){return D.find(i=>i.hiveId===e&&!i.deleted)||null}function ge(e,i){const t=D.find(n=>n.hiveId===e&&!n.deleted);if(t)i?(t.text=i,t.date=new Date().toISOString().slice(0,10),t.pinned=!0):t.deleted=!0,$("notes","update",F(t),t._dvId||t.id);else if(i){const n={id:"n"+Date.now(),text:i,date:new Date().toISOString().slice(0,10),pinned:!0,deleted:!1,hiveId:e};D.unshift(n),$("notes","create",F(n))}}function Le(e=!1){const i=V.filter(t=>!t.deleted);return e?i:i.filter(t=>!t.done)}function Ne(e){const i=V.find(t=>t.id===e);i&&(i.done=!i.done,$("tasks","update",re(i),i._dvId||e))}function ft(e){const i=V.find(t=>t.id===e);i&&(i.deleted=!0,$("tasks","update",re(i),i._dvId||e))}function bt(e,i){const t={id:"t"+Date.now(),text:e,done:!1,due:i,deleted:!1};V.unshift(t),$("tasks","create",re(t))}function yt(){return[{id:"esp32-1",name:"ESP32 Hive Scale",type:"ESP32",location:"Hive 5 - Survivor",status:"Online",battery:4.1,lastSeen:"2026-03-18T09:30:00Z",firmware:"v1.0.0",ip:"192.168.1.45"},{id:"sb-inside",name:"SwitchBot Inside",type:"SwitchBot",location:"Hive 5 - Survivor (inside)",status:"Online",battery:87,lastSeen:"2026-03-18T09:25:00Z",temp:32.5,humidity:68},{id:"sb-outside",name:"SwitchBot Outside",type:"SwitchBot",location:"Apiary (ambient)",status:"Online",battery:92,lastSeen:"2026-03-18T09:28:00Z",temp:14.2,humidity:55}]}const wt=["0e98bf2afda73d29f786212cd02fc542cb3307fea44f76f208f396b5fcd4ea98"];async function kt(e,i){const n=new TextEncoder().encode(`${e}:${i}`),s=await crypto.subtle.digest("SHA-256",n);return Array.from(new Uint8Array(s)).map(a=>a.toString(16).padStart(2,"0")).join("")}async function $t(e){e.innerHTML=`
    <div class="min-h-screen flex items-center justify-center p-5 hex-bg">
      <div class="w-full max-w-sm animate-in">
        <div class="text-center mb-10">
          <img src="/bee-logo.png" alt="Apiary Hub" class="w-48 h-auto mx-auto drop-shadow-2xl" />
        </div>

        <form id="loginForm" class="space-y-5">
          <div class="login-input-group">
            <label for="username" class="login-label">Username</label>
            <div class="login-input-wrapper">
              <svg class="login-input-icon" fill="none" stroke="currentColor" stroke-width="1.5" viewBox="0 0 24 24"><path stroke-linecap="round" stroke-linejoin="round" d="M15.75 6a3.75 3.75 0 11-7.5 0 3.75 3.75 0 017.5 0zM4.501 20.118a7.5 7.5 0 0114.998 0"/></svg>
              <input type="text" id="username" class="login-input" placeholder="Enter your username" autocomplete="username" required>
            </div>
          </div>
          <div class="login-input-group">
            <label for="password" class="login-label">Password</label>
            <div class="login-input-wrapper">
              <svg class="login-input-icon" fill="none" stroke="currentColor" stroke-width="1.5" viewBox="0 0 24 24"><path stroke-linecap="round" stroke-linejoin="round" d="M16.5 10.5V6.75a4.5 4.5 0 10-9 0v3.75m-.75 11.25h10.5a2.25 2.25 0 002.25-2.25v-6.75a2.25 2.25 0 00-2.25-2.25H6.75a2.25 2.25 0 00-2.25 2.25v6.75a2.25 2.25 0 002.25 2.25z"/></svg>
              <input type="password" id="password" class="login-input" placeholder="Enter your password" autocomplete="current-password" required>
            </div>
          </div>
          <div id="loginError" class="text-hive-red text-sm hidden"></div>
          <button type="submit" class="btn-primary w-full py-3 mt-2">Sign In</button>
        </form>
      </div>
    </div>
  `,document.getElementById("loginForm").addEventListener("submit",async t=>{t.preventDefault();const n=document.getElementById("username").value.trim().toLowerCase(),s=document.getElementById("password").value,a=await kt(n,s);if(wt.includes(a))sessionStorage.setItem("hive_user",JSON.stringify({name:n.charAt(0).toUpperCase()+n.slice(1),role:"admin"})),window.location.hash="#/apiary";else{const o=document.getElementById("loginError");o.textContent="Invalid username or password",o.classList.remove("hidden")}}),document.getElementById("username").focus()}function St(e){const i=e>=80?"Strong":e>=50?"Fair":"Weak";return`<span class="inline-flex items-center gap-1.5">
    <span class="w-1.5 h-1.5 rounded-full ${e>=80?"bg-hive-sage":e>=50?"bg-hive-gold":"bg-hive-red"}"></span>
    <span class="text-[10px] font-medium uppercase tracking-wider text-hive-muted" style="font-family:Inter,sans-serif;letter-spacing:0.08em">${i}</span>
  </span>`}function E(e,i=!1,t=!1,n="#/apiary"){return`
    <header class="app-header px-5 py-3 sticky top-0 z-50" style="border-bottom: 1px solid var(--hive-border);">
      <div class="max-w-6xl mx-auto flex items-center justify-between">
        <div class="flex items-center gap-3">
          ${i?`<a href="${n}" class="text-hive-muted hover:text-hive-gold" title="Back">
            <svg class="w-5 h-5" fill="none" stroke="currentColor" stroke-width="1.25" viewBox="0 0 24 24"><path stroke-linecap="round" stroke-linejoin="round" d="M15 19l-7-7 7-7"/></svg>
          </a>`:""}
          <h1 class="font-serif text-lg font-medium text-hive-text" style="letter-spacing:-0.02em">${e}</h1>
        </div>
        <div class="flex items-center gap-0.5">
          <label id="themeToggle" class="relative inline-flex items-center cursor-pointer gap-1.5" title="Toggle light/dark mode">
            <span class="text-[9px] font-medium uppercase tracking-wider theme-icon-light hidden" style="color:var(--hive-gold);letter-spacing:0.1em">Light</span>
            <span class="text-[9px] font-medium uppercase tracking-wider theme-icon-dark" style="color:var(--hive-muted);letter-spacing:0.1em">Dark</span>
            <div class="relative">
              <div class="w-8 h-4 rounded-full" style="background:var(--hive-border)"></div>
              <div class="theme-knob absolute top-0.5 w-3 h-3 rounded-full shadow-sm" style="background:var(--hive-gold);left:2px;transition:left 200ms ease"></div>
            </div>
          </label>
          ${t?`<a href="#/admin" class="p-2 text-hive-muted hover:text-hive-gold" title="Settings">
            <svg class="w-[17px] h-[17px]" fill="none" stroke="currentColor" stroke-width="1.25" viewBox="0 0 24 24"><path stroke-linecap="round" stroke-linejoin="round" d="M10.325 4.317c.426-1.756 2.924-1.756 3.35 0a1.724 1.724 0 002.573 1.066c1.543-.94 3.31.826 2.37 2.37a1.724 1.724 0 001.066 2.573c1.756.426 1.756 2.924 0 3.35a1.724 1.724 0 00-1.066 2.573c.94 1.543-.826 3.31-2.37 2.37a1.724 1.724 0 00-2.573 1.066c-.426 1.756-2.924 1.756-3.35 0a1.724 1.724 0 00-2.573-1.066c-1.543.94-3.31-.826-2.37-2.37a1.724 1.724 0 00-1.066-2.573c-1.756-.426-1.756-2.924 0-3.35a1.724 1.724 0 001.066-2.573c-.94-1.543.826-3.31 2.37-2.37.996.608 2.296.07 2.572-1.065z"/><path stroke-linecap="round" stroke-linejoin="round" d="M15 12a3 3 0 11-6 0 3 3 0 016 0z"/></svg>
          </a>`:""}
          <button onclick="sessionStorage.removeItem('hive_user'); window.location.hash='#/login'" class="p-2 text-hive-muted hover:text-hive-red" title="Sign out">
            <svg class="w-[17px] h-[17px]" fill="none" stroke="currentColor" stroke-width="1.25" viewBox="0 0 24 24"><path stroke-linecap="round" stroke-linejoin="round" d="M17 16l4-4m0 0l-4-4m4 4H7m6 4v1a3 3 0 01-3 3H6a3 3 0 01-3-3V7a3 3 0 013-3h4a3 3 0 013 3v1"/></svg>
          </button>
        </div>
      </div>
    </header>`}function Et(e){return`<span class="${{Inspection:"pill-amber",Feed:"pill-blue",Treatment:"pill-red",Harvest:"pill-green","Hive Added":"pill-green","Hive Death":"pill-red",Split:"pill-amber",Combined:"pill-blue",Converted:"pill-amber",Moved:"pill-blue",Note:"pill-blue"}[e]||"pill-amber"}">${e}</span>`}function Z(e){const i=new Date(e),n=Math.floor((new Date-i)/864e5);return n===0?"Today":n===1?"Yesterday":n<7?`${n}d ago`:n<30?`${Math.floor(n/7)}w ago`:i.toLocaleDateString("en-GB",{day:"numeric",month:"short",year:n>365?"numeric":void 0})}function K(e,i,t,n=!1){return`<div class="border-b" style="border-color:var(--hive-border)">
    <button type="button" class="accordion-trigger" aria-expanded="${n}" data-accordion="${e}">
      <span class="text-sm font-medium text-hive-text">${i}</span>
      <svg class="chevron w-4 h-4 text-hive-muted" fill="none" stroke="currentColor" stroke-width="1.25" viewBox="0 0 24 24"><path stroke-linecap="round" stroke-linejoin="round" d="M19 9l-7 7-7-7"/></svg>
    </button>
    <div id="acc-${e}" class="accordion-content ${n?"open":""}">${t}</div>
  </div>`}function Ie(e){e.querySelectorAll(".accordion-trigger").forEach(i=>{i.addEventListener("click",()=>{var n;const t=i.getAttribute("aria-expanded")==="true";i.setAttribute("aria-expanded",String(!t)),(n=document.getElementById("acc-"+i.dataset.accordion))==null||n.classList.toggle("open")})})}const R={edit:'<svg class="w-4 h-4" fill="none" stroke="currentColor" stroke-width="1.25" viewBox="0 0 24 24"><path stroke-linecap="round" stroke-linejoin="round" d="M11 5H6a2 2 0 00-2 2v11a2 2 0 002 2h11a2 2 0 002-2v-5m-1.414-9.414a2 2 0 112.828 2.828L11.828 15H9v-2.828l8.586-8.586z"/></svg>',flask:'<svg class="w-4 h-4" fill="none" stroke="currentColor" stroke-width="1.25" viewBox="0 0 24 24"><path stroke-linecap="round" stroke-linejoin="round" d="M19.428 15.428a2 2 0 00-1.022-.547l-2.387-.477a6 6 0 00-3.86.517l-.318.158a6 6 0 01-3.86.517L6.05 15.21a2 2 0 00-1.806.547M8 4h8l-1 1v5.172a2 2 0 00.586 1.414l5 5c1.26 1.26.367 3.414-1.415 3.414H4.828c-1.782 0-2.674-2.154-1.414-3.414l5-5A2 2 0 009 10.172V5L8 4z"/></svg>',book:'<svg class="w-4 h-4" fill="none" stroke="currentColor" stroke-width="1.25" viewBox="0 0 24 24"><path stroke-linecap="round" stroke-linejoin="round" d="M12 6.253v13m0-13C10.832 5.477 9.246 5 7.5 5S4.168 5.477 3 6.253v13C4.168 18.477 5.754 18 7.5 18s3.332.477 4.5 1.253m0-13C13.168 5.477 14.754 5 16.5 5c1.747 0 3.332.477 4.5 1.253v13C19.832 18.477 18.247 18 16.5 18c-1.746 0-3.332.477-4.5 1.253"/></svg>',heart:'<svg class="w-4 h-4" fill="none" stroke="currentColor" stroke-width="1.25" viewBox="0 0 24 24"><path stroke-linecap="round" stroke-linejoin="round" d="M4.318 6.318a4.5 4.5 0 000 6.364L12 20.364l7.682-7.682a4.5 4.5 0 00-6.364-6.364L12 7.636l-1.318-1.318a4.5 4.5 0 00-6.364 0z"/></svg>',mapPin:'<svg class="w-3.5 h-3.5" fill="none" stroke="currentColor" stroke-width="1.25" viewBox="0 0 24 24"><path stroke-linecap="round" stroke-linejoin="round" d="M17.657 16.657L13.414 20.9a1.998 1.998 0 01-2.827 0l-4.244-4.243a8 8 0 1111.314 0z"/><path stroke-linecap="round" stroke-linejoin="round" d="M15 11a3 3 0 11-6 0 3 3 0 016 0z"/></svg>',thermometer:'<svg class="w-3.5 h-3.5" fill="none" stroke="currentColor" stroke-width="1.25" viewBox="0 0 24 24"><path stroke-linecap="round" stroke-linejoin="round" d="M12 9V3m0 6a3 3 0 100 6 3 3 0 000-6zm0 6v6"/></svg>',chevron:'<svg class="w-3.5 h-3.5 text-hive-muted" fill="none" stroke="currentColor" stroke-width="1.25" viewBox="0 0 24 24"><path stroke-linecap="round" stroke-linejoin="round" d="M9 5l7 7-7 7"/></svg>'},ne=140,ae=70;function de(e){return ie.find(i=>i.id===e)}function He(e){return e.some(i=>{const t=de(i.type);return t&&t.nuc})}function Ct(e){return{"nuc-roof":14,"nuc-floor":10,"nuc-stand":34,"nuc-stand-iot":38,"nuc-brood":45,"nuc-super":30,"nuc-eke":18}[e.id]||e.height}function ce(e=[],i={}){const{size:t="md",interactive:n=!1,hiveId:s=""}=i,a=t==="sm"?.5:t==="lg"?1.2:.8,o=He(e),l=Math.round((o?ae:ne)*a),d=Math.round((o?ae+40:ne+40)*a);if(!e.length)return`<div class="flex flex-col items-center" style="width:${d}px">
      <div class="text-gray-600 text-xs text-center py-4">No components</div>
    </div>`;let c=`<div class="flex flex-col items-center" style="width:${d}px">`;return e.forEach((h,p)=>{const m=de(h.type);if(!m)return;const v=Math.round(m.height*a),r=m.id.includes("roof"),u=m.id.includes("stand-iot"),f=!u&&m.id.includes("stand"),w=m.id.includes("floor"),M=m.category==="accessory";if(r)c+=`<div class="relative" style="width:${l+Math.round(8*a)}px; height:${v}px">
        <div class="absolute inset-0 rounded-t-md" style="background:${m.color}"></div>
        <div class="absolute bottom-0 left-0.5 right-0.5 h-px" style="background:#991b1b"></div>
      </div>`;else if(w)c+=`<div style="width:${l+Math.round(4*a)}px; height:${v}px; background:${m.color}; border-radius: 0 0 2px 2px"></div>`;else if(u){const y=Math.max(3,Math.round(4*a)),k=Math.round(v*.28),C=v-k;c+=`<div class="flex flex-col items-center" style="width:${l+Math.round(16*a)}px">
        <div class="relative" style="width:${l+Math.round(12*a)}px; height:${k}px; background:${m.color}; border-radius: 0 0 3px 3px">
          <div style="position:absolute;bottom:0;left:0;right:0;height:3px;background:#22c55e;border-radius:0 0 3px 3px"></div>
          <div style="position:absolute;top:-${Math.round(6*a)}px;right:${Math.round(8*a)}px;width:2px;height:${Math.round(8*a)}px;background:#22c55e;border-radius:1px"></div>
          <div style="position:absolute;top:-${Math.round(8*a)}px;right:${Math.round(5*a)}px;width:${Math.round(6*a)}px;height:${Math.round(6*a)}px;border:2px solid #22c55e;border-radius:50%;background:transparent"></div>
        </div>
        <div class="flex justify-between" style="width:${l+Math.round(12*a)}px; height:${C}px">
          <div style="width:${y}px; background:#A09080; height:${C}px; border-radius: 0 0 2px 2px"></div>
          <div style="width:${y}px; background:#A09080; height:${C}px; border-radius: 0 0 2px 2px"></div>
        </div>
      </div>`}else if(f){const y=Math.max(2,Math.round(3*a));c+=`<div class="flex justify-between" style="width:${l+Math.round(12*a)}px; height:${v}px">
        <div style="width:${y}px; background:${m.color}; height:${v}px; border-radius: 0 0 2px 2px"></div>
        <div class="flex-1 mx-0.5" style="background:${m.color}; height:${Math.round(v*.3)}px; border-radius: 0 0 2px 2px"></div>
        <div style="width:${y}px; background:${m.color}; height:${v}px; border-radius: 0 0 2px 2px"></div>
      </div>`}else if(M){const y=Math.max(7,Math.round(8*a));c+=`<div class="relative flex items-center justify-center" style="width:${l}px; height:${v}px; background:${m.color}">
        <span class="text-white/60 font-medium text-center leading-tight" style="font-size:${y}px">${m.name}</span>
        ${n?xe(s,p):""}
      </div>`}else{const y=Math.max(8,Math.round(10*a));c+=`<div class="relative flex items-center justify-center" style="width:${l}px; height:${v}px; background:${m.color}; border-left:2px solid rgba(0,0,0,0.12); border-right:2px solid rgba(0,0,0,0.12)">
        <span class="text-white font-semibold text-center leading-tight" style="font-size:${y}px; text-shadow:0 1px 2px rgba(0,0,0,0.3)">${m.name}</span>
        ${n?xe(s,p):""}
      </div>`}}),c+="</div>",c}function xe(e,i){return`<button onclick="document.dispatchEvent(new CustomEvent('hive-remove-component', {detail:{hiveId:'${e}',index:${i}}}))" class="absolute top-0 right-0.5 text-white/40 hover:text-white text-xs leading-none p-0.5" title="Remove">✕</button>`}function Te(e=[],i="#f59e0b"){if(!e||!e.length)return'<div class="w-full h-full flex items-center justify-center text-3xl">🏠</div>';const t=.35,n=He(e),s=Math.round((n?ae:ne)*t);let a='<div class="flex flex-col items-center justify-end h-full py-1">';return e.forEach(o=>{const l=de(o.type);if(!l)return;const d=n?Ct(l):l.height,c=Math.round(d*t);l.id.includes("roof")?a+=`<div class="rounded-t" style="width:${s+3}px; height:${c}px; background:${l.color}"></div>`:l.id.includes("stand-iot")?a+=`<div class="flex flex-col items-center" style="width:${s+8}px">
        <div class="relative" style="width:${s+6}px; height:${Math.round(c*.3)}px; background:#5B7A5E">
          <div style="position:absolute;bottom:0;left:0;right:0;height:1px;background:#22c55e"></div>
        </div>
        <div class="flex justify-between" style="width:${s+6}px; height:${c-Math.round(c*.3)}px">
          <div style="width:1px; background:#A09080; height:100%"></div>
          <div style="width:1px; background:#A09080; height:100%"></div>
        </div>
      </div>`:l.id.includes("stand")?a+=`<div class="flex justify-between" style="width:${s+6}px; height:${c}px">
        <div style="width:1px; background:${l.color}; height:${c}px"></div>
        <div class="flex-1 mx-px" style="background:${l.color}; height:${Math.round(c*.3)}px"></div>
        <div style="width:1px; background:${l.color}; height:${c}px"></div>
      </div>`:l.id.includes("floor")?a+=`<div style="width:${s+2}px; height:${Math.max(2,c)}px; background:${l.color}"></div>`:l.category==="accessory"?a+=`<div style="width:${s}px; height:${Math.max(2,c)}px; background:${l.color}"></div>`:a+=`<div style="width:${s}px; height:${c}px; background:${l.color}; border-left:1px solid rgba(0,0,0,0.12); border-right:1px solid rgba(0,0,0,0.12)"></div>`}),a+="</div>",a}const Bt={0:"Clear Sky",1:"Mainly Clear",2:"Partly Cloudy",3:"Overcast",45:"Foggy",48:"Rime Fog",51:"Light Drizzle",53:"Drizzle",55:"Heavy Drizzle",61:"Light Rain",63:"Rain",65:"Heavy Rain",71:"Light Snow",73:"Snow",75:"Heavy Snow",77:"Snow Grains",80:"Light Showers",81:"Showers",82:"Heavy Showers",85:"Light Snow Showers",86:"Snow Showers",95:"Thunderstorm",96:"Thunderstorm + Hail",99:"Thunderstorm + Heavy Hail"};let J=null,fe=0;const At=10*60*1e3;async function _e(e,i){if(J&&Date.now()-fe<At)return J;const t=`https://api.open-meteo.com/v1/forecast?latitude=${e}&longitude=${i}&current=temperature_2m,relative_humidity_2m,weather_code,wind_speed_10m&timezone=auto`,n=await fetch(t);if(!n.ok)throw new Error(`Weather API: HTTP ${n.status}`);const a=(await n.json()).current,o=a.weather_code;return J={temp:Math.round(a.temperature_2m),conditions:Bt[o]||`Code ${o}`,humidity:a.relative_humidity_2m,windSpeed:Math.round(a.wind_speed_10m),icon:Mt(o)},fe=Date.now(),J}function Mt(e){return e===0||e===1?"☀️":e===2?"⛅":e===3?"☁️":e>=45&&e<=48?"🌫️":e>=51&&e<=55?"🌦️":e>=61&&e<=65?"🌧️":e>=71&&e<=77?"🌨️":e>=80&&e<=82?"🌦️":e>=85&&e<=86?"🌨️":e>=95?"⛈️":"🌤️"}async function Lt(e){const i=W(),t=Ze(),n=Me(),s=Le(),a=i.filter(o=>o.status==="Active");e.innerHTML=`
    ${E(q.name,!1,!0)}

    <main class="max-w-6xl mx-auto pb-8 hex-bg">

      <!-- Location & Weather -->
      <section class="px-5 py-4">
        <div class="flex items-center gap-5 text-sm">
          <span class="flex items-center gap-1.5 text-hive-muted">${R.mapPin}<span class="text-hive-text text-xs">${q.location}</span></span>
          <span class="flex items-center gap-1.5 text-hive-muted">${R.thermometer}<span id="liveWeather" class="text-hive-text text-xs">Loading...</span></span>
        </div>
      </section>

      <!-- Quick Actions -->
      <section class="px-5 mb-6">
        <div class="flex gap-2">
          <a href="#/inspect" class="btn-action">${R.edit}<span>Inspect</span></a>
          <a href="#/inspect?type=harvest" class="btn-action">${R.flask}<span>Harvest</span></a>
          <a href="#/inspect?type=feed" class="btn-action">${R.book}<span>Feed</span></a>
          <a href="#/inspect?type=treatment" class="btn-action">${R.heart}<span>Treat</span></a>
        </div>
      </section>

      <!-- Hives -->
      <section class="px-5 mb-8">
        <div class="flex items-center justify-between mb-4">
          <h2 class="section-title">${a.length} Hive${a.length!==1?"s":""}</h2>
          <a href="#/admin" class="section-subtitle text-hive-gold hover:opacity-80">Manage</a>
        </div>
        <div class="flex gap-3 overflow-x-auto no-scrollbar pb-2">
          ${a.map(o=>`
            <a href="#/hive/${encodeURIComponent(o.hiveName)}" class="flex-shrink-0 w-[170px] animate-in">
              <div class="card p-4 flex flex-col items-center" style="min-height:220px">
                <div class="w-full h-24 flex items-end justify-center mb-3">${Te(o.components,o.color)}</div>
                <h3 class="font-serif text-sm font-medium text-hive-text text-center leading-tight mb-1.5">${o.hiveName}</h3>
                <div class="mb-1">${St(o.strength)}</div>
                <p class="section-subtitle mt-0.5 text-center leading-tight">${o.beeType}</p>
              </div>
            </a>
          `).join("")}
        </div>
      </section>

      <div class="px-5 grid grid-cols-1 md:grid-cols-2 gap-5 mb-6">
        <!-- Notes (pinned only on home) -->
        <section>
          <div class="flex items-center justify-between mb-3">
            <h2 class="section-title">Notes</h2>
            <a href="#/notes" class="section-subtitle text-hive-gold">View all</a>
          </div>
          <div class="card space-y-3">
            ${n.filter(o=>o.pinned&&!o.deleted).slice(0,3).map(o=>`
              <div class="flex items-start gap-3">
                <svg class="w-4 h-4 mt-0.5 text-hive-gold flex-shrink-0" fill="currentColor" stroke="currentColor" stroke-width="0.5" viewBox="0 0 24 24"><path stroke-linecap="round" stroke-linejoin="round" d="M5 5a2 2 0 012-2h10a2 2 0 012 2v16l-7-3.5L5 21V5z"/></svg>
                <div class="flex-1 min-w-0">
                  <p class="text-sm leading-relaxed text-hive-text">${o.text}</p>
                  <p class="text-[11px] text-hive-muted mt-1">${new Date(o.date).toLocaleDateString("en-GB",{month:"short",day:"numeric",year:"numeric"})}</p>
                </div>
              </div>
            `).join("")||`
              <div class="text-center py-4">
                <svg class="w-8 h-8 mx-auto text-hive-muted/40 mb-2" fill="none" stroke="currentColor" stroke-width="1" viewBox="0 0 24 24"><path stroke-linecap="round" stroke-linejoin="round" d="M5 5a2 2 0 012-2h10a2 2 0 012 2v16l-7-3.5L5 21V5z"/></svg>
                <p class="text-sm text-hive-muted">No pinned notes</p>
                <a href="#/notes" class="text-xs text-hive-gold mt-1 inline-block">Add a note</a>
              </div>
            `}
          </div>
        </section>
        <!-- Tasks (incomplete only on home) -->
        <section>
          <div class="flex items-center justify-between mb-3">
            <h2 class="section-title">Tasks</h2>
            <a href="#/tasks" class="section-subtitle text-hive-gold">View all</a>
          </div>
          <div class="card space-y-3" id="taskList">
            ${s.map(o=>`
              <label class="flex items-center gap-3 cursor-pointer task-item" data-task-id="${o.id}">
                <input type="checkbox" class="w-4 h-4 rounded accent-[var(--hive-gold)] task-check" data-task="${o.id}">
                <span class="text-sm flex-1 text-hive-text">${o.text}</span>
                <span class="text-[10px] uppercase tracking-wider text-hive-gold">${Z(o.due)}</span>
              </label>
            `).join("")||`
              <div class="text-center py-4">
                <svg class="w-8 h-8 mx-auto text-hive-muted/40 mb-2" fill="none" stroke="currentColor" stroke-width="1" viewBox="0 0 24 24"><path stroke-linecap="round" stroke-linejoin="round" d="M9 5H7a2 2 0 00-2 2v12a2 2 0 002 2h10a2 2 0 002-2V7a2 2 0 00-2-2h-2M9 5a2 2 0 002 2h2a2 2 0 002-2M9 5a2 2 0 012-2h2a2 2 0 012 2m-6 9l2 2 4-4"/></svg>
                <p class="text-sm text-hive-muted">All tasks complete!</p>
                <a href="#/tasks" class="text-xs text-hive-gold mt-1 inline-block">Add a task</a>
              </div>
            `}
          </div>
        </section>
      </div>

      <!-- Recent Activity -->
      <section class="px-5 mb-6">
        <div class="flex items-center justify-between mb-3">
          <h2 class="section-title">Recent Activity</h2>
          <a href="#/inspections" class="section-subtitle text-hive-gold">View all</a>
        </div>
        <div class="space-y-2">
          ${t.slice(0,5).map(o=>`
            <a href="#/inspections?date=${o.date}" class="card flex items-center gap-3 p-4 block">
              <div class="timeline-dot">
                <svg class="w-3 h-3 text-hive-gold" fill="none" stroke="currentColor" stroke-width="1.25" viewBox="0 0 24 24"><path stroke-linecap="round" stroke-linejoin="round" d="M9 5H7a2 2 0 00-2 2v12a2 2 0 002 2h10a2 2 0 002-2V7a2 2 0 00-2-2h-2M9 5a2 2 0 002 2h2a2 2 0 002-2"/></svg>
              </div>
              <div class="flex-1">
                <div class="text-sm text-hive-text">${o.count} inspection${o.count>1?"s":""}</div>
                <div class="text-[11px] text-hive-muted">${new Date(o.date).toLocaleDateString("en-GB",{month:"short",day:"numeric",year:"numeric"})}</div>
              </div>
              ${R.chevron}
            </a>
          `).join("")}
        </div>
      </section>

    </main>
  `,_e(q.lat,q.lng).then(o=>{const l=document.getElementById("liveWeather");l&&(l.textContent=`${o.temp}°C ${o.conditions}`)}).catch(()=>{const o=document.getElementById("liveWeather");o&&(o.textContent="—")}),document.querySelectorAll(".task-check").forEach(o=>{o.addEventListener("change",()=>{const l=o.dataset.task;Ne(l);const d=o.closest(".task-item");d&&(d.style.opacity="0.3",d.style.textDecoration="line-through",setTimeout(()=>d.remove(),600))})})}async function oe(e,i){var f,w,M,y,k,C,N,I,x,B,j;const t=i.id,s=W().find(g=>g.hiveName===t),a=[...Ke(t),...Be().filter(g=>g.hive===t)].sort((g,b)=>new Date(b.date)-new Date(g.date));if(!s){e.innerHTML=`
      ${E("Not Found",!0)}
      <div class="max-w-6xl mx-auto p-4 text-center py-16">
        <div class="text-5xl mb-4">🔍</div>
        <p class="text-hive-muted text-lg">Hive not found</p>
        <a href="#/apiary" class="btn-primary inline-block mt-6">Back to Apiary</a>
      </div>`;return}const o=s.strength>=80?"#22c55e":s.strength>=50?"#f59e0b":"#ef4444",l=s.queenYear?new Date().getFullYear()-s.queenYear:null,d=a.filter(g=>g.type==="Inspection"),c=d.length?new Date(d[0].date):null,h=c?Math.floor((new Date-c)/864e5):null,p=xt(s.id);let m="—";if(s.queenAddedDate){const g=new Date(s.queenAddedDate),b=new Date;let S=b.getFullYear()-g.getFullYear(),T=b.getMonth()-g.getMonth(),z=b.getDate()-g.getDate();z<0&&(T--,z+=new Date(b.getFullYear(),b.getMonth(),0).getDate()),T<0&&(S--,T+=12);const _=[];S>0&&_.push(`${S}y`),T>0&&_.push(`${T}m`),_.push(`${z}d`),m=_.join(" ")}e.innerHTML=`
    ${E(s.hiveName,!0)}

    <main class="max-w-6xl mx-auto pb-24">

      <!-- Hero Card -->
      <section class="p-4">
        <div class="rounded-2xl overflow-hidden" style="background: var(--hive-surface)">
          <div class="flex items-center justify-center py-6">
            ${ce(s.components||[],{size:"md"})}
          </div>
          <!-- Strength bar under image, like HiveBloom -->
          <div class="h-2 w-full" style="background: ${o}"></div>
        </div>

        <div class="mt-4 flex items-center justify-between">
          <div>
            <h2 class="text-xl font-bold text-hive-text">${s.hiveName}</h2>
            <div class="flex items-center gap-2 mt-2 flex-wrap">
              <span class="pill-amber">${s.beeType}</span>
              <span class="${s.type==="Nuc"?"pill-blue":"pill-orange"}">${s.type}</span>
              ${s.hiveStyle?`<span class="pill-blue">${s.hiveStyle}</span>`:""}
              <span class="pill-green">${s.status}</span>
              <a href="#/hive-form/${s.id}" class="pill text-xs bg-hive-surface text-hive-muted hover:text-hive-amber">+ Edit</a>
            </div>
          </div>
          <div class="text-right">
            <div class="text-3xl font-bold" style="color: ${o}">${s.strength}%</div>
            <div class="text-xs text-hive-muted">Strength</div>
          </div>
        </div>
      </section>

      <!-- Queen Detail Card -->
      <section class="px-4 mb-4">
        <div class="card-surface">
          <div class="flex items-center justify-between mb-3">
            <div class="section-subtitle">Queen Details</div>
            <a href="#/hive-form/${s.id}" class="text-[10px] uppercase tracking-wider text-hive-gold hover:opacity-80" style="font-family:Inter,sans-serif">Edit</a>
          </div>
          <div class="grid grid-cols-2 gap-x-4 gap-y-2">
            <div class="flex items-center gap-2">
              ${s.queenMarked?`<span class="w-3 h-3 rounded-full flex-shrink-0" style="background: ${s.queenColor==="Green"?"var(--hive-sage)":s.queenColor==="Pink"?"#ec4899":s.queenColor==="Blue"?"var(--hive-blue)":s.queenColor==="Yellow"?"#eab308":s.queenColor==="Red"?"var(--hive-red)":s.queenColor==="White"?"#e5e7eb":"var(--hive-muted)"}"></span><span class="text-sm text-hive-text">${s.queenColor} marked</span>`:'<span class="text-sm text-hive-muted">Unmarked</span>'}
            </div>
            <div class="text-sm">
              ${s.queenClipped?'<span class="text-hive-text">Clipped</span>':'<span class="text-hive-muted">Not clipped</span>'}
            </div>
            <div>
              <span class="text-xs text-hive-muted">Age</span>
              <div class="text-sm text-hive-text">${l!==null?`${l}yr (${s.queenYear})`:"Unknown"}</div>
            </div>
            <div>
              <span class="text-xs text-hive-muted">Source</span>
              <div class="text-sm text-hive-text">${s.queenSource||"Unknown"}</div>
            </div>
            <div>
              <span class="text-xs text-hive-muted">Added</span>
              <div class="text-sm text-hive-text">${s.queenAddedDate?new Date(s.queenAddedDate).toLocaleDateString("en-GB",{day:"numeric",month:"short",year:"numeric"}):"—"}</div>
            </div>
            <div>
              <span class="text-xs text-hive-muted">Breed</span>
              <div class="text-sm text-hive-text">${s.beeType}</div>
            </div>
          </div>
          ${s.queenNotes?`<div class="mt-3 pt-2 border-t" style="border-color:var(--hive-border)"><p class="text-xs text-hive-muted italic">${s.queenNotes}</p></div>`:""}
        </div>
      </section>

      <!-- Stats Grid — 4 across -->
      <section class="px-4 grid grid-cols-4 gap-3 mb-4">
        <a href="#/inspections" class="card-surface block">
          <div class="section-subtitle mb-2">Inspections</div>
          <span class="text-lg font-serif font-medium text-hive-text">${d.length}</span>
          <span class="text-xs text-hive-muted block">since Jun 2025</span>
        </a>

        <div class="card-surface">
          <div class="section-subtitle mb-2">Days Since</div>
          <span class="text-lg font-serif font-medium ${h!==null&&h>10?"text-hive-red":"text-hive-text"}">${h!==null?h:"—"}</span>
          <span class="text-xs text-hive-muted block">${c?c.toLocaleDateString("en-GB",{day:"numeric",month:"short"}):"No inspections"}</span>
        </div>

        <div class="card-surface">
          <div class="section-subtitle mb-2">Queen Added</div>
          <span class="text-sm text-hive-text">${s.queenAddedDate?new Date(s.queenAddedDate).toLocaleDateString("en-GB",{day:"numeric",month:"short",year:"numeric"}):"—"}</span>
        </div>

        <div class="card-surface">
          <div class="section-subtitle mb-2">Queen Age</div>
          <span class="text-lg font-serif font-medium text-hive-text">${m}</span>
          <span class="text-xs text-hive-muted block">${s.queenYear?`(${s.queenYear})`:""}</span>
        </div>
      </section>

      <!-- Hive Note, Weight Graph, Build Hive — 3 across -->
      <section class="px-4 mb-4 grid grid-cols-3 gap-3">
        <button id="editHiveNote" class="card-surface flex items-center justify-between p-4 text-left">
          <div class="flex items-center gap-3 min-w-0">
            <svg class="w-5 h-5 flex-shrink-0 ${p?"text-hive-gold":"text-hive-muted"}" fill="none" stroke="currentColor" stroke-width="1.5" viewBox="0 0 24 24"><path stroke-linecap="round" stroke-linejoin="round" d="M11 5H6a2 2 0 00-2 2v11a2 2 0 002 2h11a2 2 0 002-2v-5m-1.414-9.414a2 2 0 112.828 2.828L11.828 15H9v-2.828l8.586-8.586z"/></svg>
            <div class="min-w-0">
              <div class="text-sm font-medium text-hive-text">Hive Note</div>
              <div class="text-xs text-hive-muted truncate">${p?p.text.slice(0,20)+(p.text.length>20?"…":""):"Add a note"}</div>
            </div>
          </div>
          <svg class="w-4 h-4 text-hive-muted flex-shrink-0" fill="none" stroke="currentColor" stroke-width="1.5" viewBox="0 0 24 24"><path stroke-linecap="round" stroke-linejoin="round" d="M9 5l7 7-7 7"/></svg>
        </button>

        <a href="#/apiary-dashboard" class="card-surface flex items-center justify-between p-4 block">
          <div class="flex items-center gap-3">
            <svg class="w-5 h-5 text-hive-gold" fill="none" stroke="currentColor" stroke-width="1.5" viewBox="0 0 24 24"><path stroke-linecap="round" stroke-linejoin="round" d="M3 13.125C3 12.504 3.504 12 4.125 12h2.25c.621 0 1.125.504 1.125 1.125v6.75C7.5 20.496 6.996 21 6.375 21h-2.25A1.125 1.125 0 013 19.875v-6.75zM9.75 8.625c0-.621.504-1.125 1.125-1.125h2.25c.621 0 1.125.504 1.125 1.125v11.25c0 .621-.504 1.125-1.125 1.125h-2.25a1.125 1.125 0 01-1.125-1.125V8.625zM16.5 4.125c0-.621.504-1.125 1.125-1.125h2.25C20.496 3 21 3.504 21 4.125v15.75c0 .621-.504 1.125-1.125 1.125h-2.25a1.125 1.125 0 01-1.125-1.125V4.125z"/></svg>
            <div>
              <div class="text-sm font-medium text-hive-text">Weight</div>
              <div class="text-xs text-hive-muted">View charts</div>
            </div>
          </div>
          <svg class="w-4 h-4 text-hive-muted" fill="none" stroke="currentColor" stroke-width="1.5" viewBox="0 0 24 24"><path stroke-linecap="round" stroke-linejoin="round" d="M9 5l7 7-7 7"/></svg>
        </a>

        <a href="#/build/${s.id}" class="card-surface flex items-center justify-between p-4 block">
          <div class="flex items-center gap-3">
            <svg class="w-5 h-5 text-hive-gold" fill="none" stroke="currentColor" stroke-width="1.5" viewBox="0 0 24 24"><path stroke-linecap="round" stroke-linejoin="round" d="M11.42 15.17l-5.66-5.66a2 2 0 010-2.83l.71-.71a2 2 0 012.83 0l5.66 5.66m-8.49 8.49l-2.83-2.83a2 2 0 010-2.83l.71-.71a2 2 0 012.83 0l2.83 2.83"/></svg>
            <div>
              <div class="text-sm font-medium text-hive-text">Build Hive</div>
              <div class="text-xs text-hive-muted">${(s.components||[]).length} components</div>
            </div>
          </div>
          <svg class="w-4 h-4 text-hive-muted" fill="none" stroke="currentColor" stroke-width="1.5" viewBox="0 0 24 24"><path stroke-linecap="round" stroke-linejoin="round" d="M9 5l7 7-7 7"/></svg>
        </a>
      </section>

      <!-- Hive Note Modal -->
      <div id="noteModal" class="fixed inset-0 z-[100] hidden">
        <div class="absolute inset-0 bg-black/60 backdrop-blur-sm" id="noteModalBackdrop"></div>
        <div class="absolute inset-x-4 top-1/2 -translate-y-1/2 max-w-lg mx-auto">
          <div class="rounded-2xl overflow-hidden" style="background:var(--hive-surface);border:1px solid var(--hive-border);box-shadow:0 25px 50px rgba(0,0,0,0.4)">
            <div class="p-5" style="border-bottom:1px solid var(--hive-border)">
              <div class="flex items-center justify-between">
                <h3 class="font-serif text-lg font-medium text-hive-text">${p?"Edit":"Add"} Hive Note</h3>
                <button id="noteModalClose" class="p-1 text-hive-muted hover:text-hive-text">
                  <svg class="w-5 h-5" fill="none" stroke="currentColor" stroke-width="1.5" viewBox="0 0 24 24"><path stroke-linecap="round" stroke-linejoin="round" d="M6 18L18 6M6 6l12 12"/></svg>
                </button>
              </div>
              <p class="text-xs text-hive-muted mt-1">${s.hiveName} — ${new Date().toLocaleDateString("en-GB",{day:"numeric",month:"short",year:"numeric"})}</p>
            </div>
            <div class="p-5">
              <textarea id="noteModalText" rows="5" class="w-full rounded-xl p-4 text-sm leading-relaxed resize-none focus:outline-none focus:ring-2 focus:ring-hive-gold/40" style="background:var(--hive-bg);border:1px solid var(--hive-border);color:var(--hive-text)" placeholder="Write your note about this hive…">${p?p.text:""}</textarea>
            </div>
            <div class="px-5 pb-5 flex items-center justify-between">
              ${p?'<button id="noteModalDelete" class="text-xs text-hive-red hover:opacity-80 uppercase tracking-wider" style="font-family:Inter,sans-serif">Delete Note</button>':"<span></span>"}
              <div class="flex gap-2">
                <button id="noteModalCancel" class="btn-secondary text-xs py-2 px-5">Cancel</button>
                <button id="noteModalSave" class="btn-primary text-xs py-2 px-5">Save Note</button>
              </div>
            </div>
          </div>
        </div>
      </div>

      <!-- Hive Operations -->
      <section class="px-4 mb-6">
        <h3 class="font-serif text-base font-medium text-hive-text mb-3">Hive Operations</h3>
        <div class="grid grid-cols-2 sm:grid-cols-4 gap-2">
          <button data-op="split" class="card-surface text-center py-3">
            <div class="section-subtitle">Split</div>
          </button>
          <button data-op="combine" class="card-surface text-center py-3">
            <div class="section-subtitle">Combine</div>
          </button>
          <button data-op="dead" class="card-surface text-center py-3">
            <div class="section-subtitle">Dead Out</div>
          </button>
          <button data-op="move" class="card-surface text-center py-3">
            <div class="section-subtitle">Move</div>
          </button>
          <button data-op="convert" class="card-surface text-center py-3 col-span-2 sm:col-span-4">
            <div class="section-subtitle">${s.type==="Hive"?"Downsize to Nuc":"Upgrade to Hive"}</div>
          </button>
        </div>
      </section>

      <!-- Inspection Timeline -->
      <section class="px-4 mb-6">
        <h3 class="font-serif text-base font-medium text-hive-text mb-3">Inspection History</h3>
        <div class="space-y-0">
          ${a.map((g,b)=>`
            <a href="#/inspection/${g.id||b}?from=${encodeURIComponent(t)}" class="flex gap-3 ${b<a.length-1?"pb-4":""} block">
              <div class="flex flex-col items-center">
                <div class="timeline-dot" style="background: rgba(212,175,55,0.1); color: var(--hive-gold)">
                  <svg class="w-3.5 h-3.5" fill="none" stroke="currentColor" stroke-width="1.5" viewBox="0 0 24 24"><path stroke-linecap="round" stroke-linejoin="round" d="M9 5H7a2 2 0 00-2 2v12a2 2 0 002 2h10a2 2 0 002-2V7a2 2 0 00-2-2h-2M9 5a2 2 0 002 2h2a2 2 0 002-2M9 5a2 2 0 012-2h2a2 2 0 012 2"/></svg>
                </div>
                ${b<a.length-1?'<div class="w-px bg-hive-border flex-1 mt-1"></div>':""}
              </div>
              <div class="flex-1 pb-1">
                <div class="flex items-center justify-between">
                  ${Et(g.type)}
                  <span class="text-xs text-hive-muted">${new Date(g.date).toLocaleDateString("en-GB",{day:"numeric",month:"short",year:"numeric"})}</span>
                </div>
                ${g.notes?`<p class="text-sm text-hive-text mt-1 leading-relaxed">${g.notes}</p>`:""}
                <div class="flex gap-3 mt-1.5 text-xs text-hive-muted">
                  ${g.queenSeen?'<span style="color:var(--hive-sage)">Queen spotted</span>':""}
                  ${g.broodSpotted?'<span style="color:var(--hive-blue)">Brood present</span>':""}
                  ${g.strength?`<span>${g.strength}%</span>`:""}
                </div>
              </div>
            </a>`).join("")}
          ${a.length===0?'<p class="text-hive-muted text-sm text-center py-6">No activity recorded yet.</p>':""}
        </div>
      </section>

    </main>

    <!-- Floating Action Bar -->
    <div class="fab-bar">
      <div class="max-w-6xl mx-auto flex justify-around">
        <a href="#/inspect?hive=${encodeURIComponent(s.hiveName)}" class="btn-action">
          <svg class="w-4 h-4" fill="none" stroke="currentColor" stroke-width="1.5" viewBox="0 0 24 24"><path stroke-linecap="round" stroke-linejoin="round" d="M11 5H6a2 2 0 00-2 2v11a2 2 0 002 2h11a2 2 0 002-2v-5m-1.414-9.414a2 2 0 112.828 2.828L11.828 15H9v-2.828l8.586-8.586z"/></svg>
          <span>Inspect</span>
        </a>
        <a href="#/inspect?hive=${encodeURIComponent(s.hiveName)}&type=harvest" class="btn-action">
          <svg class="w-4 h-4" fill="none" stroke="currentColor" stroke-width="1.5" viewBox="0 0 24 24"><path stroke-linecap="round" stroke-linejoin="round" d="M19.428 15.428a2 2 0 00-1.022-.547l-2.387-.477a6 6 0 00-3.86.517l-.318.158a6 6 0 01-3.86.517L6.05 15.21a2 2 0 00-1.806.547M8 4h8l-1 1v5.172a2 2 0 00.586 1.414l5 5c1.26 1.26.367 3.414-1.415 3.414H4.828c-1.782 0-2.674-2.154-1.414-3.414l5-5A2 2 0 009 10.172V5L8 4z"/></svg>
          <span>Harvest</span>
        </a>
        <a href="#/inspect?hive=${encodeURIComponent(s.hiveName)}&type=feed" class="btn-action">
          <svg class="w-4 h-4" fill="none" stroke="currentColor" stroke-width="1.5" viewBox="0 0 24 24"><path stroke-linecap="round" stroke-linejoin="round" d="M12 6.253v13m0-13C10.832 5.477 9.246 5 7.5 5S4.168 5.477 3 6.253v13C4.168 18.477 5.754 18 7.5 18s3.332.477 4.5 1.253m0-13C13.168 5.477 14.754 5 16.5 5c1.747 0 3.332.477 4.5 1.253v13C19.832 18.477 18.247 18 16.5 18c-1.746 0-3.332.477-4.5 1.253"/></svg>
          <span>Feed</span>
        </a>
        <a href="#/inspect?hive=${encodeURIComponent(s.hiveName)}&type=treatment" class="btn-action">
          <svg class="w-4 h-4" fill="none" stroke="currentColor" stroke-width="1.5" viewBox="0 0 24 24"><path stroke-linecap="round" stroke-linejoin="round" d="M4.318 6.318a4.5 4.5 0 000 6.364L12 20.364l7.682-7.682a4.5 4.5 0 00-6.364-6.364L12 7.636l-1.318-1.318a4.5 4.5 0 00-6.364 0z"/></svg>
          <span>Treat</span>
        </a>
      </div>
    </div>
  `;const v=document.getElementById("noteModal"),r=()=>v==null?void 0:v.classList.remove("hidden"),u=()=>v==null?void 0:v.classList.add("hidden");(f=document.getElementById("editHiveNote"))==null||f.addEventListener("click",r),(w=document.getElementById("noteModalBackdrop"))==null||w.addEventListener("click",u),(M=document.getElementById("noteModalClose"))==null||M.addEventListener("click",u),(y=document.getElementById("noteModalCancel"))==null||y.addEventListener("click",u),(k=document.getElementById("noteModalSave"))==null||k.addEventListener("click",()=>{var b;const g=(b=document.getElementById("noteModalText"))==null?void 0:b.value.trim();g&&(ge(s.id,g),u(),oe(e,i))}),(C=document.getElementById("noteModalDelete"))==null||C.addEventListener("click",()=>{confirm("Delete this hive note?")&&(ge(s.id,""),u(),oe(e,i))}),(N=e.querySelector('[data-op="split"]'))==null||N.addEventListener("click",()=>{const g=prompt('Name for the new nuc/hive (e.g. "Nuc 2 - Split"):');if(!g)return;const b=prompt("Split notes (optional):")||"";ot(s.id,g,b),window.location.hash="#/apiary"}),(I=e.querySelector('[data-op="combine"]'))==null||I.addEventListener("click",()=>{const g=W().filter(_=>_.id!==s.id&&_.status==="Active");if(!g.length){alert("No other active hives to combine with.");return}const b=g.map((_,De)=>`${De+1}. ${_.hiveName}`).join(`
`),S=prompt(`Combine ${s.hiveName} INTO which hive? (this hive will be deactivated)

${b}

Enter number:`);if(!S)return;const T=parseInt(S,10)-1;if(T<0||T>=g.length){alert("Invalid selection.");return}const z=prompt("Combine notes (optional):")||"";lt(g[T].id,s.id,z),window.location.hash="#/apiary"}),(x=e.querySelector('[data-op="dead"]'))==null||x.addEventListener("click",()=>{if(!confirm(`Mark "${s.hiveName}" as dead? This will deactivate the hive.`))return;const g=prompt("Notes on the death (optional):")||"";rt(s.id,g),window.location.hash="#/apiary"}),(B=e.querySelector('[data-op="move"]'))==null||B.addEventListener("click",()=>{const g=prompt("Where is the hive being moved to?");if(!g)return;const b=prompt("Move notes (optional):")||"";dt(s.id,g,b),alert(`${s.hiveName} move recorded to timeline.`),window.location.hash="#/hive/"+encodeURIComponent(s.hiveName)}),(j=e.querySelector('[data-op="convert"]'))==null||j.addEventListener("click",()=>{const g=s.type==="Hive"?"downsize to a Nuc":"upgrade to a full Hive";if(!confirm(`Convert "${s.hiveName}" — ${g}?

All components will be swapped to the matching type.`))return;const b=prompt("Conversion notes (optional):")||"",S=vt(s.id,b);S&&(window.location.hash="#/hive/"+encodeURIComponent(S.hiveName))})}const Nt="modulepreload",It=function(e){return"/"+e},be={},ye=function(i,t,n){let s=Promise.resolve();if(t&&t.length>0){document.getElementsByTagName("link");const o=document.querySelector("meta[property=csp-nonce]"),l=(o==null?void 0:o.nonce)||(o==null?void 0:o.getAttribute("nonce"));s=Promise.allSettled(t.map(d=>{if(d=It(d),d in be)return;be[d]=!0;const c=d.endsWith(".css"),h=c?'[rel="stylesheet"]':"";if(document.querySelector(`link[href="${d}"]${h}`))return;const p=document.createElement("link");if(p.rel=c?"stylesheet":Nt,c||(p.as="script"),p.crossOrigin="",p.href=d,l&&p.setAttribute("nonce",l),document.head.appendChild(p),c)return new Promise((m,v)=>{p.addEventListener("load",m),p.addEventListener("error",()=>v(new Error(`Unable to preload CSS for ${d}`)))})}))}function a(o){const l=new Event("vite:preloadError",{cancelable:!0});if(l.payload=o,window.dispatchEvent(l),!l.defaultPrevented)throw o}return s.then(o=>{for(const l of o||[])l.status==="rejected"&&a(l.reason);return i().catch(a)})};async function Ht(e){e.innerHTML=`
    ${E("Sensor Dashboard",!0)}
    <main class="max-w-5xl mx-auto p-4 pb-20 md:pb-4 space-y-6">

      <!-- Time Range -->
      <div class="flex items-center gap-3">
        <select id="timeRange" class="input-field w-auto">
          <option value="6">Last 6 hours</option>
          <option value="24" selected>Last 24 hours</option>
          <option value="72">Last 3 days</option>
          <option value="168">Last 7 days</option>
          <option value="720">Last 30 days</option>
        </select>
        <button id="refreshBtn" class="btn-primary flex items-center gap-2">
          <svg class="w-4 h-4" fill="none" stroke="currentColor" viewBox="0 0 24 24"><path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M4 4v5h.582m15.356 2A8.001 8.001 0 004.582 9m0 0H9m11 11v-5h-.581m0 0a8.003 8.003 0 01-15.357-2m15.357 2H15"/></svg>
          Refresh
        </button>
      </div>

      <!-- Summary Cards -->
      <section class="grid grid-cols-2 sm:grid-cols-3 lg:grid-cols-6 gap-3" id="summaryCards">
        <div class="card-surface">
          <div class="text-xs text-hive-muted uppercase">Weight</div>
          <div class="text-xl font-bold mt-1" id="latestWeight">—</div>
          <div class="text-xs text-hive-muted">kg</div>
        </div>
        <div class="card-surface">
          <div class="text-xs text-hive-muted uppercase">Internal Temp</div>
          <div class="text-xl font-bold mt-1" id="latestTemp">—</div>
          <div class="text-xs text-hive-muted">°C</div>
        </div>
        <div class="card-surface">
          <div class="text-xs text-hive-muted uppercase">Humidity</div>
          <div class="text-xl font-bold mt-1" id="latestHum">—</div>
          <div class="text-xs text-hive-muted">%</div>
        </div>
        <div class="card-surface">
          <div class="text-xs text-hive-muted uppercase">Battery</div>
          <div class="text-xl font-bold mt-1" id="latestBat">—</div>
          <div class="text-xs text-hive-muted">V</div>
        </div>
        <div class="card-surface">
          <div class="text-xs text-hive-muted uppercase">Leg Temp</div>
          <div class="text-xl font-bold mt-1" id="latestLeg">—</div>
          <div class="text-xs text-hive-muted">°C</div>
        </div>
        <div class="card-surface">
          <div class="text-xs text-hive-muted uppercase">Last Reading</div>
          <div class="text-sm font-medium mt-1 text-hive-muted" id="lastReading">—</div>
          <div class="text-xs text-hive-muted" id="dataPoints">0 pts</div>
        </div>
      </section>

      <!-- Charts -->
      <section class="card-surface">
        <h3 class="text-sm font-semibold text-hive-muted uppercase tracking-wider mb-3">Weight</h3>
        <canvas id="weightChart" class="w-full"></canvas>
      </section>

      <section class="grid grid-cols-1 md:grid-cols-2 gap-4">
        <div class="card-surface">
          <h3 class="text-sm font-semibold text-hive-muted uppercase tracking-wider mb-3">Temperature</h3>
          <canvas id="tempChart" class="w-full"></canvas>
        </div>
        <div class="card-surface">
          <h3 class="text-sm font-semibold text-hive-muted uppercase tracking-wider mb-3">Humidity & Battery</h3>
          <canvas id="envChart" class="w-full"></canvas>
        </div>
      </section>

      <div id="errorBanner" class="hidden bg-hive-red/10 border border-hive-red text-hive-red p-3 rounded-xl text-center text-sm"></div>
    </main>
  `;const{Chart:i,registerables:t}=await ye(async()=>{const{Chart:h,registerables:p}=await import("./chart-19k6OvwP.js");return{Chart:h,registerables:p}},[]);await ye(()=>import("./chartjs-adapter-date-fns.esm-CV7ru7NP.js"),__vite__mapDeps([0,1])),i.register(...t);const n={responsive:!0,maintainAspectRatio:!0,aspectRatio:2.5,interaction:{mode:"index",intersect:!1},plugins:{legend:{labels:{color:"#9ca3af",usePointStyle:!0,padding:12}},tooltip:{backgroundColor:"#1a1d27",borderColor:"#2a2e3e",borderWidth:1,titleColor:"#e4e4e7",bodyColor:"#e4e4e7",padding:10,callbacks:{title:h=>new Date(h[0].parsed.x).toLocaleString()}}},scales:{x:{type:"time",time:{tooltipFormat:"dd MMM HH:mm"},grid:{color:"rgba(255,255,255,0.05)"},ticks:{color:"#9ca3af",maxTicksLimit:8}},y:{grid:{color:"rgba(255,255,255,0.05)"},ticks:{color:"#9ca3af"}}}},s=(h,p)=>({label:h,borderColor:p,backgroundColor:p+"1a",fill:!1,tension:.3,pointRadius:0,borderWidth:2,data:[]}),a=new i(document.getElementById("weightChart"),{type:"line",data:{datasets:[{...s("Weight (kg)","#f59e0b"),fill:!0}]},options:{...n,scales:{...n.scales,y:{...n.scales.y,title:{display:!0,text:"kg",color:"#9ca3af"}}}}}),o=new i(document.getElementById("tempChart"),{type:"line",data:{datasets:[s("Internal (°C)","#ef4444"),s("Leg (°C)","#a78bfa")]},options:{...n,aspectRatio:2,scales:{...n.scales,y:{...n.scales.y,title:{display:!0,text:"°C",color:"#9ca3af"}}}}}),l=new i(document.getElementById("envChart"),{type:"line",data:{datasets:[{...s("Humidity (%)","#3b82f6"),yAxisID:"yHum"},{...s("Battery (V)","#22c55e"),yAxisID:"yBat"}]},options:{...n,aspectRatio:2,scales:{x:n.scales.x,yHum:{type:"linear",position:"left",grid:{color:"rgba(255,255,255,0.05)"},ticks:{color:"#3b82f6"},title:{display:!0,text:"%",color:"#3b82f6"}},yBat:{type:"linear",position:"right",grid:{drawOnChartArea:!1},ticks:{color:"#22c55e"},title:{display:!0,text:"V",color:"#22c55e"}}}}});async function d(){const h=parseInt(document.getElementById("timeRange").value,10),p=new Date(Date.now()-h*3600*1e3);try{const m=await Je();document.getElementById("errorBanner").classList.add("hidden");const v=m.filter(u=>new Date(u.timestamp)>=p);if(v.length>0){const u=v[v.length-1],f=(M,y,k)=>{document.getElementById(M).textContent=y!=null?Number(y).toFixed(k):"—"};f("latestWeight",u.weight,1),f("latestTemp",u.internalTemp,1),f("latestHum",u.hiveHum,1),f("latestBat",u.batteryVoltage,2),f("latestLeg",u.legTemp,1);const w=Math.floor((Date.now()-new Date(u.timestamp))/1e3);document.getElementById("lastReading").textContent=w<60?`${w}s ago`:w<3600?`${Math.floor(w/60)}m ago`:`${Math.floor(w/3600)}h ago`,document.getElementById("dataPoints").textContent=`${v.length} pts`}const r=(u,f)=>({x:new Date(u.timestamp),y:u[f]});a.data.datasets[0].data=v.map(u=>r(u,"weight")),o.data.datasets[0].data=v.map(u=>r(u,"internalTemp")),o.data.datasets[1].data=v.map(u=>r(u,"legTemp")),l.data.datasets[0].data=v.map(u=>r(u,"hiveHum")),l.data.datasets[1].data=v.map(u=>r(u,"batteryVoltage")),a.update("none"),o.update("none"),l.update("none")}catch(m){const v=document.getElementById("errorBanner");v.textContent=`Failed to load sensor data: ${m.message}`,v.classList.remove("hidden")}}d();const c=setInterval(d,5*60*1e3);return document.getElementById("timeRange").addEventListener("change",d),document.getElementById("refreshBtn").addEventListener("click",d),()=>{clearInterval(c),a.destroy(),o.destroy(),l.destroy()}}function te(e,i=3e3){const t=document.getElementById("toast");t&&t.remove();const n=document.createElement("div");n.id="toast",n.className="fixed top-20 left-1/2 -translate-x-1/2 z-[100] px-6 py-3 rounded-full text-sm font-medium animate-in",n.style.cssText="background:var(--hive-gold);color:#0B0D0E;box-shadow:0 4px 20px rgba(212,175,55,0.3)",n.textContent=e,document.body.appendChild(n),setTimeout(()=>{n.style.opacity="0",setTimeout(()=>n.remove(),300)},i)}const Tt=["Varroa mites","Nosema","Chalkbrood","Stonebrood","American Foulbrood","European Foulbrood"],_t=["Waxmoth","Mice","Ants","Wasps","Small Hive Beetle","Hornets"],Dt=["","Compact","Spotty","Patchy","Drone-heavy","None visible"];async function qt(e){const t=new URLSearchParams(window.location.hash.split("?")[1]||"").get("hive")||"",s=W().filter(r=>r.status==="Active").map(r=>r.hiveName);e.innerHTML=`
    ${E("New Inspection",!0)}
    <main class="max-w-3xl mx-auto p-5 pb-8">
      <form id="inspectionForm" class="space-y-5">
        <section class="card p-5">
          <label class="section-subtitle block mb-2">Hive</label>
          <select id="hiveSelect" class="input-field" required>
            <option value="">Select hive...</option>
            ${s.map(r=>`<option value="${r}" ${r===t?"selected":""}>${r}</option>`).join("")}
          </select>
        </section>

        <section class="card p-5">
          <h3 class="section-subtitle mb-4">Colony Health</h3>
          <div class="space-y-3">
            ${["queenSeen:Queen Spotted","broodSpotted:Brood Spotted","queenCells:Queen Cells Spotted"].map(r=>{const[u,f]=r.split(":");return`<div class="flex items-center justify-between">
                <span class="text-sm text-hive-text">${f}</span>
                <label class="toggle-switch">
                  <input type="checkbox" data-health="${u}">
                  <div class="toggle-track"></div>
                  <div class="toggle-knob"></div>
                </label>
              </div>`}).join("")}
          </div>
        </section>

        <section class="card p-5 space-y-5">
          <div>
            <div class="flex items-center justify-between mb-2">
              <span class="section-subtitle">Hive Strength</span>
              <span id="strengthValue" class="text-lg font-serif font-medium text-hive-gold">80%</span>
            </div>
            <input type="range" id="strengthSlider" min="0" max="100" value="80" class="w-full accent-[var(--hive-gold)]">
          </div>
          <div class="border-t pt-4" style="border-color:var(--hive-border)">
            <span class="section-subtitle block mb-3">Temperament</span>
            <div class="flex gap-2">
              ${["Gentle","Active","Aggressive"].map(r=>`<button type="button" data-temperament="${r}" class="temperament-pill btn-secondary flex-1 py-2 text-xs">${r}</button>`).join("")}
            </div>
          </div>
          <div class="border-t pt-4" style="border-color:var(--hive-border)">
            <label class="section-subtitle block mb-2">Brood Pattern</label>
            <select id="broodPattern" class="input-field">
              ${Dt.map(r=>`<option value="${r}">${r||"Not assessed"}</option>`).join("")}
            </select>
          </div>
        </section>

        <section class="card p-5">
          <div class="flex items-center justify-between mb-3">
            <span class="section-subtitle">Hive Weight</span>
            <button type="button" id="fetchWeightBtn" class="section-subtitle text-hive-gold flex items-center gap-1">
              <svg class="w-3.5 h-3.5" fill="none" stroke="currentColor" stroke-width="1.25" viewBox="0 0 24 24"><path stroke-linecap="round" stroke-linejoin="round" d="M4 4v5h.582m15.356 2A8.001 8.001 0 004.582 9m0 0H9m11 11v-5h-.581m0 0a8.003 8.003 0 01-15.357-2m15.357 2H15"/></svg>
              Fetch Live
            </button>
          </div>
          <div class="grid grid-cols-2 gap-4">
            <div><label class="text-[11px] text-hive-muted block mb-1">Left (kg)</label><input type="number" id="weightLeft" class="input-field" step="0.01" placeholder="0.00"></div>
            <div><label class="text-[11px] text-hive-muted block mb-1">Right (kg)</label><input type="number" id="weightRight" class="input-field" step="0.01" placeholder="0.00"></div>
          </div>
          <div class="mt-3"><label class="text-[11px] text-hive-muted block mb-1">Total (kg)</label><input type="number" id="weightTotal" class="input-field" step="0.01" placeholder="Auto-calculated" readonly></div>
        </section>

        <section class="card p-5">
          <h3 class="section-subtitle mb-2">Issues</h3>
          ${K("diseases","Diseases",`<div class="grid grid-cols-2 gap-2 pb-2">${Tt.map(r=>`<label class="flex items-center gap-2 cursor-pointer"><input type="checkbox" data-disease="${r}" class="w-3.5 h-3.5 rounded accent-[var(--hive-red)]"><span class="text-sm text-hive-text">${r}</span></label>`).join("")}</div>`)}
          ${K("pests","Pests",`<div class="grid grid-cols-2 gap-2 pb-2">${_t.map(r=>`<label class="flex items-center gap-2 cursor-pointer"><input type="checkbox" data-pest="${r}" class="w-3.5 h-3.5 rounded accent-[var(--hive-red)]"><span class="text-sm text-hive-text">${r}</span></label>`).join("")}</div>`)}
        </section>

        <section class="card p-5">
          <label class="section-subtitle block mb-2">Notes</label>
          <textarea id="notes" class="input-field min-h-[100px] resize-y" style="border:1px solid var(--hive-border);border-radius:8px;padding:12px" placeholder="Frame-by-frame notes, observations..."></textarea>
        </section>

        <section class="card p-5">
          <div class="flex items-center justify-between mb-3">
            <span class="section-subtitle">Environment</span>
            <button type="button" id="refreshWeatherBtn" class="section-subtitle text-hive-gold flex items-center gap-1">
              <svg class="w-3.5 h-3.5" fill="none" stroke="currentColor" stroke-width="1.25" viewBox="0 0 24 24"><path stroke-linecap="round" stroke-linejoin="round" d="M4 4v5h.582m15.356 2A8.001 8.001 0 004.582 9m0 0H9m11 11v-5h-.581m0 0a8.003 8.003 0 01-15.357-2m15.357 2H15"/></svg>
              Auto-fill
            </button>
          </div>
          <div class="grid grid-cols-2 gap-4">
            <div><label class="text-[11px] text-hive-muted block mb-1">Weather</label><input type="text" id="weatherConditions" class="input-field" placeholder="e.g. Clear Sky"></div>
            <div><label class="text-[11px] text-hive-muted block mb-1">Temp (C)</label><input type="number" id="weatherTemp" class="input-field" step="1" placeholder="Temp"></div>
          </div>
          <div id="weatherStatus" class="text-[11px] text-hive-muted mt-2"></div>
        </section>

        <div class="flex gap-3 pt-2">
          <button type="submit" class="btn-primary flex-1 py-3">Save Inspection</button>
          <a href="#/apiary" class="btn-secondary flex-1 py-3 text-center">Cancel</a>
        </div>
      </form>
    </main>
  `,Ie(e);const a={queenSeen:!1,broodSpotted:!1,queenCells:!1};document.querySelectorAll("[data-health]").forEach(r=>{r.addEventListener("change",()=>{a[r.dataset.health]=r.checked})});let o="";document.querySelectorAll(".temperament-pill").forEach(r=>{r.addEventListener("click",()=>{o=r.dataset.temperament,document.querySelectorAll(".temperament-pill").forEach(u=>u.className="temperament-pill btn-secondary flex-1 py-2 text-xs"),r.className="temperament-pill btn-primary flex-1 py-2 text-xs"})});const l=document.getElementById("strengthSlider"),d=document.getElementById("strengthValue");l.addEventListener("input",()=>{d.textContent=l.value+"%"});const c=document.getElementById("weightLeft"),h=document.getElementById("weightRight"),p=document.getElementById("weightTotal"),m=()=>{const r=parseFloat(c.value)||0,u=parseFloat(h.value)||0;(r>0||u>0)&&(p.value=(r+u).toFixed(2))};c.addEventListener("input",m),h.addEventListener("input",m),document.getElementById("fetchWeightBtn").addEventListener("click",()=>te("IoT weight fetch not yet connected"));async function v(){const r=document.getElementById("weatherStatus");try{r.textContent="Fetching...";const u=await _e(q.lat,q.lng);document.getElementById("weatherConditions").value=u.conditions,document.getElementById("weatherTemp").value=u.temp,r.innerHTML='<span style="color:var(--hive-sage)">&#9679;</span> Auto-filled: '+u.temp+"°C "+u.conditions+" ("+u.humidity+"% humidity, "+u.windSpeed+" km/h wind)"}catch{r.textContent="Could not fetch weather."}}v(),document.getElementById("refreshWeatherBtn").addEventListener("click",v),document.getElementById("inspectionForm").addEventListener("submit",r=>{r.preventDefault();const u=document.getElementById("hiveSelect").value;if(!u){te("Please select a hive");return}const f=[];document.querySelectorAll("[data-disease]:checked").forEach(y=>f.push(y.dataset.disease));const w=[];document.querySelectorAll("[data-pest]:checked").forEach(y=>w.push(y.dataset.pest));const M={date:new Date().toISOString().slice(0,10),type:"Inspection",hive:u,strength:parseInt(l.value,10),queenSeen:a.queenSeen,broodSpotted:a.broodSpotted,queenCells:a.queenCells,temperament:o,broodPattern:document.getElementById("broodPattern").value,weightLeft:parseFloat(c.value)||null,weightRight:parseFloat(h.value)||null,weightTotal:parseFloat(p.value)||null,diseases:f,pests:w,notes:document.getElementById("notes").value,weatherTemp:parseFloat(document.getElementById("weatherTemp").value)||null,weatherConditions:document.getElementById("weatherConditions").value||null};Xe(M),te("Inspection saved for "+u),setTimeout(()=>{window.location.hash="#/apiary"},1500)})}function jt(e){const i=W(),t=i.filter(s=>s.type==="Hive"&&s.status==="Active"),n=i.filter(s=>s.type==="Nuc"&&s.status==="Active");e.innerHTML=`
    ${E("Admin",!0)}

    <main class="max-w-6xl mx-auto p-4 pb-8 space-y-6">

      <!-- Admin Navigation -->
      <section class="grid grid-cols-2 gap-3">
        <a href="#/devices" class="card-surface flex flex-col items-center gap-2 py-6 text-center hover:border-hive-green/50">
          <span class="text-3xl">📡</span>
          <span class="text-sm font-semibold text-hive-text">Device Health</span>
          <span class="text-xs text-hive-muted">ESP32 & SwitchBot</span>
        </a>
        <a href="#/apiary-dashboard" class="card-surface flex flex-col items-center gap-2 py-6 text-center hover:border-hive-blue/50">
          <span class="text-3xl">📊</span>
          <span class="text-sm font-semibold text-hive-text">Sensor Dashboard</span>
          <span class="text-xs text-hive-muted">Charts & Telemetry</span>
        </a>
      </section>

      <!-- Apiary Info -->
      <section>
        <h2 class="text-sm font-semibold text-hive-muted uppercase tracking-wider mb-3">Apiary</h2>
        <div class="card-surface space-y-3">
          <div class="flex justify-between items-center">
            <span class="text-sm text-hive-muted">Name</span>
            <span class="text-sm font-medium">${q.name}</span>
          </div>
          <div class="flex justify-between items-center">
            <span class="text-sm text-hive-muted">Location</span>
            <span class="text-sm font-medium">${q.location}</span>
          </div>
          <div class="flex justify-between items-center">
            <span class="text-sm text-hive-muted">Active Hives</span>
            <span class="text-sm font-bold text-hive-amber">${t.length}</span>
          </div>
          <div class="flex justify-between items-center">
            <span class="text-sm text-hive-muted">Active Nucs</span>
            <span class="text-sm font-bold text-hive-blue">${n.length}</span>
          </div>
        </div>
      </section>

      <!-- Manage Hives -->
      <section>
        <div class="flex items-center justify-between mb-3">
          <h2 class="text-sm font-semibold text-hive-muted uppercase tracking-wider">Hives & Nucs</h2>
          <a href="#/hive-form/new" class="btn-primary text-xs py-1.5 px-3 flex items-center gap-1">
            <svg class="w-3.5 h-3.5" fill="none" stroke="currentColor" viewBox="0 0 24 24"><path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M12 4v16m8-8H4"/></svg>
            Add Hive
          </a>
        </div>
        <div class="space-y-2">
          ${i.map(s=>`
            <div class="card-surface flex items-center justify-between">
              <div class="flex items-center gap-3">
                <div class="w-12 h-14 rounded-lg overflow-hidden flex items-center justify-center" style="background: linear-gradient(135deg, ${s.color}15, ${s.color}05)">
                  ${Te(s.components,s.color)}
                </div>
                <div>
                  <div class="text-sm font-medium">${s.hiveName}</div>
                  <div class="flex items-center gap-2 mt-0.5">
                    <span class="text-xs text-hive-muted">${s.beeType}</span>
                    ${s.hiveStyle?`<span class="text-xs text-hive-muted">${s.hiveStyle}</span>`:""}
                    <span class="text-xs ${s.status==="Active"?"text-hive-green":"text-hive-muted"}">${s.status}</span>
                  </div>
                </div>
              </div>
              <div class="flex items-center gap-2">
                <div class="text-sm font-bold ${s.strength>=80?"text-hive-green":s.strength>=50?"text-hive-amber":"text-hive-red"}">${s.strength}%</div>
                <a href="#/hive-form/${s.id}" class="p-1.5 text-hive-muted hover:text-hive-amber transition-colors" title="Edit">
                  <svg class="w-4 h-4" fill="none" stroke="currentColor" viewBox="0 0 24 24"><path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M11 5H6a2 2 0 00-2 2v11a2 2 0 002 2h11a2 2 0 002-2v-5m-1.414-9.414a2 2 0 112.828 2.828L11.828 15H9v-2.828l8.586-8.586z"/></svg>
                </a>
                <a href="#/build/${s.id}" class="p-1.5 text-hive-muted hover:text-hive-amber transition-colors" title="Build">
                  <svg class="w-4 h-4" fill="none" stroke="currentColor" viewBox="0 0 24 24"><path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M19.428 15.428a2 2 0 00-1.022-.547l-2.387-.477a6 6 0 00-3.86.517l-.318.158a6 6 0 01-3.86.517L6.05 15.21a2 2 0 00-1.806.547M8 4h8l-1 1v5.172a2 2 0 00.586 1.414l5 5c1.26 1.26.367 3.414-1.415 3.414H4.828c-1.782 0-2.674-2.154-1.414-3.414l5-5A2 2 0 009 10.172V5L8 4z"/></svg>
                </a>
              </div>
            </div>
          `).join("")}
        </div>
      </section>

      <!-- Account -->
      <section>
        <h2 class="text-sm font-semibold text-hive-muted uppercase tracking-wider mb-3">Account</h2>
        <div class="card-surface space-y-3">
          <div class="flex justify-between items-center">
            <span class="text-sm text-hive-muted">Logged in as</span>
            <span class="text-sm font-medium text-hive-amber">Grant</span>
          </div>
          <div class="flex justify-between items-center">
            <span class="text-sm text-hive-muted">Dashboard</span>
            <span class="text-xs text-hive-muted">v2.0.0</span>
          </div>
          <button onclick="sessionStorage.removeItem('hive_user'); window.location.hash='#/login'" class="w-full btn-secondary text-hive-red border-hive-red/30 hover:border-hive-red mt-2">
            Sign Out
          </button>
        </div>
      </section>

    </main>
  `}function Rt(e){const i=yt();e.innerHTML=`
    ${E("Device Health",!0)}

    <main class="max-w-6xl mx-auto p-4 pb-8 space-y-6">

      <!-- Summary Cards -->
      <section class="grid grid-cols-3 gap-3">
        <div class="card-surface text-center">
          <div class="text-2xl font-bold text-hive-green">${i.filter(t=>t.status==="Online").length}</div>
          <div class="text-xs text-hive-muted mt-1">Online</div>
        </div>
        <div class="card-surface text-center">
          <div class="text-2xl font-bold text-hive-red">${i.filter(t=>t.status==="Offline").length}</div>
          <div class="text-xs text-hive-muted mt-1">Offline</div>
        </div>
        <div class="card-surface text-center">
          <div class="text-2xl font-bold text-hive-text">${i.length}</div>
          <div class="text-xs text-hive-muted mt-1">Total</div>
        </div>
      </section>

      <!-- Device List -->
      <section class="space-y-3">
        ${i.map(t=>`
          <div class="card-surface">
            <div class="flex items-start justify-between mb-3">
              <div class="flex items-center gap-3">
                <div class="w-12 h-12 rounded-xl flex items-center justify-center text-2xl ${t.status==="Online"?"bg-hive-green/10":"bg-hive-red/10"}">
                  ${t.type==="ESP32"?"🔌":"🌡️"}
                </div>
                <div>
                  <div class="text-sm font-semibold">${t.name}</div>
                  <div class="text-xs text-hive-muted">${t.location}</div>
                </div>
              </div>
              <span class="pill ${t.status==="Online"?"pill-green":"pill-red"}">
                <span class="w-1.5 h-1.5 rounded-full ${t.status==="Online"?"bg-hive-green":"bg-hive-red"} mr-1.5 animate-pulse"></span>
                ${t.status}
              </span>
            </div>

            <div class="grid grid-cols-2 gap-2 text-xs">
              ${t.type==="ESP32"?`
                <div class="bg-hive-bg rounded-lg p-2">
                  <div class="text-hive-muted mb-0.5">Battery</div>
                  <div class="font-semibold ${t.battery>=3.7?"text-hive-green":"text-hive-red"}">${t.battery}V</div>
                </div>
                <div class="bg-hive-bg rounded-lg p-2">
                  <div class="text-hive-muted mb-0.5">Firmware</div>
                  <div class="font-semibold text-hive-text">${t.firmware}</div>
                </div>
                <div class="bg-hive-bg rounded-lg p-2">
                  <div class="text-hive-muted mb-0.5">IP Address</div>
                  <div class="font-semibold text-hive-text">${t.ip}</div>
                </div>
                <div class="bg-hive-bg rounded-lg p-2">
                  <div class="text-hive-muted mb-0.5">Last Seen</div>
                  <div class="font-semibold text-hive-text">${Z(t.lastSeen)}</div>
                </div>
              `:`
                <div class="bg-hive-bg rounded-lg p-2">
                  <div class="text-hive-muted mb-0.5">Temperature</div>
                  <div class="font-semibold text-hive-amber">${t.temp}°C</div>
                </div>
                <div class="bg-hive-bg rounded-lg p-2">
                  <div class="text-hive-muted mb-0.5">Humidity</div>
                  <div class="font-semibold text-hive-blue">${t.humidity}%</div>
                </div>
                <div class="bg-hive-bg rounded-lg p-2">
                  <div class="text-hive-muted mb-0.5">Battery</div>
                  <div class="font-semibold ${t.battery>=50?"text-hive-green":"text-hive-red"}">${t.battery}%</div>
                </div>
                <div class="bg-hive-bg rounded-lg p-2">
                  <div class="text-hive-muted mb-0.5">Last Seen</div>
                  <div class="font-semibold text-hive-text">${Z(t.lastSeen)}</div>
                </div>
              `}
            </div>
          </div>
        `).join("")}
      </section>

    </main>
  `}function Pt(e,i){const t=i.id;let n=H(t);if(!n){e.innerHTML=`${E("Not Found",!0)}<div class="max-w-6xl mx-auto p-4 text-center py-16"><p class="text-hive-muted">Hive not found</p><a href="#/apiary" class="btn-primary inline-block mt-4">Back</a></div>`;return}function s(){n=H(t),e.innerHTML=`
      ${E("Build "+n.hiveName,!0,!1,"#/hive/"+encodeURIComponent(n.hiveName))}
      <main class="max-w-6xl mx-auto p-4 pb-8">

        <!-- Visual Hive -->
        <section class="flex justify-center py-8 rounded-2xl mb-6" style="background: var(--hive-surface)">
          ${ce(n.components||[],{size:"lg",interactive:!0,hiveId:n.id})}
        </section>

        <!-- Component Picker -->
        <section class="card-surface mb-6">
          <h3 class="section-subtitle mb-4">Add Component</h3>
          <div class="space-y-2">
            ${ie.filter(o=>{const l=n.type==="Nuc";return o.nuc===l}).map(o=>`
              <button data-add-type="${o.id}" class="w-full flex items-center justify-between p-3 rounded-lg hover:bg-hive-surface-hover transition-colors border border-hive-border">
                <div class="flex items-center gap-3">
                  <div class="w-12 h-6 rounded" style="background:${o.color}"></div>
                  <span class="text-sm font-medium text-hive-text">${o.name}</span>
                </div>
                <span class="text-xs text-hive-muted">${o.category}</span>
              </button>
            `).join("")}
          </div>
        </section>

        <!-- Current Components List -->
        <section class="card-surface">
          <h3 class="section-subtitle mb-3">Components (${(n.components||[]).length})</h3>
          <div class="space-y-1">
            ${(n.components||[]).map((o,l)=>{const d=ie.find(h=>h.id===o.type);if(!d)return"";const c=(n.components||[]).length;return`
                <div class="flex items-center justify-between p-2 rounded-lg hover:bg-hive-surface-hover transition-colors">
                  <div class="flex items-center gap-3">
                    <span class="text-xs text-hive-muted w-5 text-right">${l+1}</span>
                    <div class="w-8 h-4 rounded" style="background:${d.color}"></div>
                    <span class="text-sm text-hive-text">${d.name}</span>
                  </div>
                  <div class="flex items-center gap-1">
                    <button data-move-up="${l}" class="p-1 text-hive-muted hover:text-hive-gold transition-colors ${l===0?"opacity-20 pointer-events-none":""}" title="Move up">
                      <svg class="w-4 h-4" fill="none" stroke="currentColor" stroke-width="2" viewBox="0 0 24 24"><path stroke-linecap="round" stroke-linejoin="round" d="M5 15l7-7 7 7"/></svg>
                    </button>
                    <button data-move-down="${l}" class="p-1 text-hive-muted hover:text-hive-gold transition-colors ${l===c-1?"opacity-20 pointer-events-none":""}" title="Move down">
                      <svg class="w-4 h-4" fill="none" stroke="currentColor" stroke-width="2" viewBox="0 0 24 24"><path stroke-linecap="round" stroke-linejoin="round" d="M19 9l-7 7-7-7"/></svg>
                    </button>
                    <button data-remove-idx="${l}" class="p-1 text-hive-muted hover:text-hive-red transition-colors" title="Remove">
                      <svg class="w-4 h-4" fill="none" stroke="currentColor" viewBox="0 0 24 24"><path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M19 7l-.867 12.142A2 2 0 0116.138 21H7.862a2 2 0 01-1.995-1.858L5 7m5 4v6m4-6v6m1-10V4a1 1 0 00-1-1h-4a1 1 0 00-1 1v3M4 7h16"/></svg>
                    </button>
                  </div>
                </div>`}).join("")}
          </div>
        </section>

      </main>
    `,e.querySelectorAll("[data-add-type]").forEach(o=>{o.addEventListener("click",()=>{at(t,o.dataset.addType),s()})}),e.querySelectorAll("[data-remove-idx]").forEach(o=>{o.addEventListener("click",()=>{he(t,parseInt(o.dataset.removeIdx,10)),s()})}),e.querySelectorAll("[data-move-up]").forEach(o=>{o.addEventListener("click",()=>{const l=parseInt(o.dataset.moveUp,10);me(t,l,l-1),s()})}),e.querySelectorAll("[data-move-down]").forEach(o=>{o.addEventListener("click",()=>{const l=parseInt(o.dataset.moveDown,10);me(t,l,l+1),s()})})}s();const a=o=>{o.detail.hiveId===t&&(he(t,o.detail.index),s())};return document.addEventListener("hive-remove-component",a),()=>document.removeEventListener("hive-remove-component",a)}function Ft(e,i){var l;const t=i.id,n=t&&t!=="new",a=(n?H(t):null)||{hiveName:"",type:"Hive",hiveStyle:"National",beeType:"Buckfast",strength:100,color:"#f59e0b",queenMarked:!1,queenColor:null,queenYear:new Date().getFullYear(),components:[{type:"roof"},{type:"deep-box"},{type:"stand"}]};e.innerHTML=`
    ${E(n?"Edit "+a.hiveName:"Add New Hive",!0,!1,n?"#/hive/"+encodeURIComponent(a.hiveName):"#/admin")}

    <main class="max-w-6xl mx-auto p-4 pb-8">
      <form id="hiveForm" class="space-y-6">

        <!-- Visual Preview -->
        <section class="flex justify-center py-6 rounded-2xl" style="background: var(--hive-surface)">
          ${ce(a.components,{size:"md"})}
        </section>

        <!-- Name -->
        <section class="card-surface">
          <label class="block section-subtitle mb-2">Hive Name</label>
          <input type="text" id="hiveName" class="input-field text-lg" value="${a.hiveName}" placeholder="e.g. Hive 7 - Luna" required>
        </section>

        <!-- Type & Style -->
        <section class="card-surface grid grid-cols-2 gap-4">
          <div>
            <label class="block section-subtitle mb-2">Type</label>
            <select id="hiveType" class="input-field">
              <option value="Hive" ${a.type==="Hive"?"selected":""}>Hive</option>
              <option value="Nuc" ${a.type==="Nuc"?"selected":""}>Nuc</option>
            </select>
          </div>
          <div>
            <label class="block section-subtitle mb-2">Hive Style</label>
            <select id="hiveStyle" class="input-field">
              ${tt.map(d=>`<option value="${d}" ${a.hiveStyle===d?"selected":""}>${d}</option>`).join("")}
            </select>
          </div>
        </section>

        <!-- Queen -->
        <section class="card-surface">
          <h3 class="section-subtitle mb-3">Queen Details</h3>
          <div class="grid grid-cols-2 gap-3 mb-3">
            <div>
              <label class="block text-xs text-hive-muted mb-1">Breed / Type</label>
              <select id="beeType" class="input-field">
                ${et.map(d=>`<option value="${d}" ${a.beeType===d?"selected":""}>${d}</option>`).join("")}
              </select>
            </div>
            <div>
              <label class="block text-xs text-hive-muted mb-1">Source</label>
              <select id="queenSource" class="input-field">
                ${st.map(d=>`<option value="${d}" ${a.queenSource===d?"selected":""}>${d}</option>`).join("")}
              </select>
            </div>
          </div>
          <div class="grid grid-cols-2 gap-3 mb-3">
            <div>
              <label class="block text-xs text-hive-muted mb-1">Year Introduced</label>
              <input type="number" id="queenYear" class="input-field" value="${a.queenYear||""}" min="2018" max="2030">
            </div>
            <div>
              <label class="block text-xs text-hive-muted mb-1">Date Added</label>
              <input type="date" id="queenAddedDate" class="input-field" value="${a.queenAddedDate||""}">
            </div>
          </div>
          <div class="grid grid-cols-2 gap-3 mb-3">
            <div>
              <label class="block text-xs text-hive-muted mb-1">Marked</label>
              <select id="queenMarked" class="input-field">
                <option value="false" ${a.queenMarked?"":"selected"}>No</option>
                <option value="true" ${a.queenMarked?"selected":""}>Yes</option>
              </select>
            </div>
            <div>
              <label class="block text-xs text-hive-muted mb-1">Mark Colour</label>
              <select id="queenColor" class="input-field">
                <option value="">None</option>
                ${it.map(d=>`<option value="${d}" ${a.queenColor===d?"selected":""}>${d}</option>`).join("")}
              </select>
            </div>
          </div>
          <div class="grid grid-cols-2 gap-3 mb-3">
            <div>
              <label class="block text-xs text-hive-muted mb-1">Clipped</label>
              <select id="queenClipped" class="input-field">
                <option value="false" ${a.queenClipped?"":"selected"}>No</option>
                <option value="true" ${a.queenClipped?"selected":""}>Yes</option>
              </select>
            </div>
            <div></div>
          </div>
          <div>
            <label class="block text-xs text-hive-muted mb-1">Queen Notes</label>
            <textarea id="queenNotes" class="input-field" rows="2" placeholder="e.g. Gentle temperament, prolific layer">${a.queenNotes||""}</textarea>
          </div>
        </section>

        <!-- Strength -->
        <section class="card-surface">
          <label class="block section-subtitle mb-2">Hive Strength</label>
          <div class="flex items-center gap-4">
            <input type="range" id="strengthSlider" min="0" max="100" value="${a.strength}" class="flex-1 accent-hive-amber">
            <span id="strengthVal" class="text-xl font-bold text-hive-amber w-14 text-right">${a.strength}%</span>
          </div>
        </section>

        <!-- Build Link -->
        ${n?`
        <a href="#/build/${t}" class="card-surface flex items-center justify-between p-4">
          <div class="flex items-center gap-3">
            <svg class="w-5 h-5 text-hive-gold" fill="none" stroke="currentColor" stroke-width="1.5" viewBox="0 0 24 24"><path stroke-linecap="round" stroke-linejoin="round" d="M11.42 15.17l-5.66-5.66a2 2 0 010-2.83l.71-.71a2 2 0 012.83 0l5.66 5.66m-8.49 8.49l-2.83-2.83a2 2 0 010-2.83l.71-.71a2 2 0 012.83 0l2.83 2.83"/></svg>
            <div>
              <div class="text-sm font-medium text-hive-text">Build / Edit Components</div>
              <div class="text-xs text-hive-muted">${(a.components||[]).length} components</div>
            </div>
          </div>
          <svg class="w-4 h-4 text-hive-muted" fill="none" stroke="currentColor" stroke-width="1.5" viewBox="0 0 24 24"><path stroke-linecap="round" stroke-linejoin="round" d="M9 5l7 7-7 7"/></svg>
        </a>`:""}

        <!-- Actions -->
        <section class="space-y-3">
          <button type="submit" class="btn-primary w-full py-3">${n?"Save Changes":"Add Hive"}</button>
          <a href="${n?"#/hive/"+encodeURIComponent(a.hiveName):"#/admin"}" class="btn-secondary w-full py-3 text-center block">Cancel</a>
          ${n?'<button type="button" id="deleteBtn" class="w-full py-3 text-xs uppercase tracking-wider text-hive-red hover:text-hive-red/80 transition-colors" style="font-family:Inter,sans-serif">Delete Hive</button>':""}
        </section>

      </form>
    </main>
  `;const o=document.getElementById("strengthSlider");o.addEventListener("input",()=>{document.getElementById("strengthVal").textContent=o.value+"%"}),document.getElementById("hiveForm").addEventListener("submit",d=>{d.preventDefault();const c={hiveName:document.getElementById("hiveName").value.trim(),type:document.getElementById("hiveType").value,hiveStyle:document.getElementById("hiveStyle").value,beeType:document.getElementById("beeType").value,color:a.color||"#f59e0b",strength:parseInt(o.value,10),queenYear:parseInt(document.getElementById("queenYear").value,10)||null,queenMarked:document.getElementById("queenMarked").value==="true",queenColor:document.getElementById("queenColor").value||null,queenClipped:document.getElementById("queenClipped").value==="true",queenSource:document.getElementById("queenSource").value||"Unknown",queenAddedDate:document.getElementById("queenAddedDate").value||null,queenNotes:document.getElementById("queenNotes").value.trim(),orientation:"vertical"};if(n)X(t,c),window.location.hash="#/hive/"+encodeURIComponent(c.hiveName);else{c.components=[{type:"roof"},{type:"deep-box"},{type:"stand"}];const h=Ae(c);window.location.hash="#/build/"+h.id}}),n&&((l=document.getElementById("deleteBtn"))==null||l.addEventListener("click",()=>{confirm(`Delete "${a.hiveName}"? This cannot be undone.`)&&(nt(t),window.location.hash="#/apiary")}))}function Ot(e){function i(){var n;const t=Le(!0);e.innerHTML=`
      ${E("Tasks",!0)}
      <main class="max-w-6xl mx-auto p-5 space-y-4">
        <div class="flex items-center justify-between mb-2">
          <h2 class="section-title">${t.length} Tasks</h2>
          <button id="addTaskBtn" class="btn-primary text-xs py-2 px-4">+ Add Task</button>
        </div>
        <div class="space-y-2">
          ${t.map(s=>`
            <div class="card flex items-center gap-3 p-4" data-id="${s.id}">
              <input type="checkbox" ${s.done?"checked":""} class="w-4 h-4 rounded accent-[var(--hive-gold)] toggle-task" data-tid="${s.id}">
              <div class="flex-1 min-w-0">
                <span class="text-sm ${s.done?"line-through text-hive-muted":"text-hive-text"}">${s.text}</span>
                <span class="text-[10px] uppercase tracking-wider block mt-0.5 ${s.done?"text-hive-muted":"text-hive-gold"}">${s.due?Z(s.due):""}</span>
              </div>
              <button class="text-hive-muted hover:text-hive-red delete-task p-1" data-tid="${s.id}" title="Delete">
                <svg class="w-4 h-4" fill="none" stroke="currentColor" stroke-width="1.25" viewBox="0 0 24 24"><path stroke-linecap="round" stroke-linejoin="round" d="M19 7l-.867 12.142A2 2 0 0116.138 21H7.862a2 2 0 01-1.995-1.858L5 7m5 4v6m4-6v6m1-10V4a1 1 0 00-1-1h-4a1 1 0 00-1 1v3M4 7h16"/></svg>
              </button>
            </div>
          `).join("")}
          ${t.length===0?'<p class="text-hive-muted text-sm text-center py-8">No tasks yet.</p>':""}
        </div>
      </main>
    `,e.querySelectorAll(".toggle-task").forEach(s=>{s.addEventListener("change",()=>{Ne(s.dataset.tid),i()})}),e.querySelectorAll(".delete-task").forEach(s=>{s.addEventListener("click",()=>{ft(s.dataset.tid),i()})}),(n=document.getElementById("addTaskBtn"))==null||n.addEventListener("click",()=>{const s=prompt("New task:");if(!s)return;const a=prompt("Due date (YYYY-MM-DD, optional):")||"";bt(s,a||null),i()})}i()}function zt(e){function i(){var c,h,p,m,v;const t=Me(!1);e.innerHTML=`
      ${E("Notes",!0)}
      <main class="max-w-6xl mx-auto p-5 space-y-4">
        <div class="flex items-center justify-between mb-2">
          <h2 class="section-title">${t.length} Notes</h2>
          <button id="addNoteBtn" class="btn-primary text-xs py-2 px-4">+ Add Note</button>
        </div>
        <div class="space-y-2">
          ${t.map(r=>`
            <div class="card p-4" data-id="${r.id}">
              <div class="flex items-start gap-3">
                <button class="pin-note p-1 mt-0.5 ${r.pinned?"text-hive-gold":"text-hive-muted"} hover:text-hive-gold" data-nid="${r.id}" title="${r.pinned?"Unpin":"Pin to home"}">
                  <svg class="w-4 h-4" fill="${r.pinned?"currentColor":"none"}" stroke="currentColor" stroke-width="1.25" viewBox="0 0 24 24"><path stroke-linecap="round" stroke-linejoin="round" d="M5 5a2 2 0 012-2h10a2 2 0 012 2v16l-7-3.5L5 21V5z"/></svg>
                </button>
                <div class="flex-1 min-w-0">
                  <p class="text-sm text-hive-text leading-relaxed">${r.text}</p>
                  <p class="text-[11px] text-hive-muted mt-2">${new Date(r.date).toLocaleDateString("en-GB",{month:"short",day:"numeric",year:"numeric"})}</p>
                </div>
                <button class="edit-note p-1 text-hive-muted hover:text-hive-gold" data-nid="${r.id}" data-ntext="${r.text.replace(/"/g,"&quot;")}" title="Edit">
                  <svg class="w-4 h-4" fill="none" stroke="currentColor" stroke-width="1.25" viewBox="0 0 24 24"><path stroke-linecap="round" stroke-linejoin="round" d="M11 5H6a2 2 0 00-2 2v11a2 2 0 002 2h11a2 2 0 002-2v-5m-1.414-9.414a2 2 0 112.828 2.828L11.828 15H9v-2.828l8.586-8.586z"/></svg>
                </button>
                <button class="delete-note p-1 text-hive-muted hover:text-hive-red" data-nid="${r.id}" title="Delete">
                  <svg class="w-4 h-4" fill="none" stroke="currentColor" stroke-width="1.25" viewBox="0 0 24 24"><path stroke-linecap="round" stroke-linejoin="round" d="M19 7l-.867 12.142A2 2 0 0116.138 21H7.862a2 2 0 01-1.995-1.858L5 7m5 4v6m4-6v6m1-10V4a1 1 0 00-1-1h-4a1 1 0 00-1 1v3M4 7h16"/></svg>
                </button>
              </div>
            </div>
          `).join("")}
          ${t.length===0?`
            <div class="card text-center py-10">
              <svg class="w-10 h-10 mx-auto text-hive-muted/40 mb-3" fill="none" stroke="currentColor" stroke-width="1" viewBox="0 0 24 24"><path stroke-linecap="round" stroke-linejoin="round" d="M5 5a2 2 0 012-2h10a2 2 0 012 2v16l-7-3.5L5 21V5z"/></svg>
              <p class="text-hive-muted">No notes yet</p>
              <p class="text-xs text-hive-muted mt-1">Tap + Add Note to get started</p>
            </div>
          `:""}
        </div>
      </main>

      <!-- Note Modal (add/edit) -->
      <div id="noteModal" class="fixed inset-0 z-[100] hidden">
        <div class="absolute inset-0 bg-black/60 backdrop-blur-sm" id="noteModalBackdrop"></div>
        <div class="absolute inset-x-4 top-1/2 -translate-y-1/2 max-w-lg mx-auto">
          <div class="rounded-2xl overflow-hidden" style="background:var(--hive-surface);border:1px solid var(--hive-border);box-shadow:0 25px 50px rgba(0,0,0,0.4)">
            <div class="p-5" style="border-bottom:1px solid var(--hive-border)">
              <div class="flex items-center justify-between">
                <h3 id="noteModalTitle" class="font-serif text-lg font-medium text-hive-text">New Note</h3>
                <button id="noteModalClose" class="p-1 text-hive-muted hover:text-hive-text">
                  <svg class="w-5 h-5" fill="none" stroke="currentColor" stroke-width="1.5" viewBox="0 0 24 24"><path stroke-linecap="round" stroke-linejoin="round" d="M6 18L18 6M6 6l12 12"/></svg>
                </button>
              </div>
              <p class="text-xs text-hive-muted mt-1">${new Date().toLocaleDateString("en-GB",{day:"numeric",month:"short",year:"numeric"})}</p>
            </div>
            <div class="p-5">
              <textarea id="noteModalText" rows="5" class="w-full rounded-xl p-4 text-sm leading-relaxed resize-none focus:outline-none focus:ring-2 focus:ring-hive-gold/40" style="background:var(--hive-bg);border:1px solid var(--hive-border);color:var(--hive-text)" placeholder="Write your note…"></textarea>
            </div>
            <div class="px-5 pb-5 flex justify-end gap-2">
              <button id="noteModalCancel" class="btn-secondary text-xs py-2 px-5">Cancel</button>
              <button id="noteModalSave" class="btn-primary text-xs py-2 px-5">Save Note</button>
            </div>
          </div>
        </div>
      </div>
    `,e.querySelectorAll(".pin-note").forEach(r=>{r.addEventListener("click",()=>{pt(r.dataset.nid),i()})}),e.querySelectorAll(".delete-note").forEach(r=>{r.addEventListener("click",()=>{ht(r.dataset.nid),i()})});const n=document.getElementById("noteModal"),s=document.getElementById("noteModalTitle"),a=document.getElementById("noteModalText");let o=null;const l=(r,u,f)=>{s.textContent=r,a.value=u,o=f,n==null||n.classList.remove("hidden"),setTimeout(()=>a.focus(),100)},d=()=>{n==null||n.classList.add("hidden"),o=null};(c=document.getElementById("addNoteBtn"))==null||c.addEventListener("click",()=>l("New Note","",null)),e.querySelectorAll(".edit-note").forEach(r=>{r.addEventListener("click",()=>l("Edit Note",r.dataset.ntext,r.dataset.nid))}),(h=document.getElementById("noteModalBackdrop"))==null||h.addEventListener("click",d),(p=document.getElementById("noteModalClose"))==null||p.addEventListener("click",d),(m=document.getElementById("noteModalCancel"))==null||m.addEventListener("click",d),(v=document.getElementById("noteModalSave"))==null||v.addEventListener("click",()=>{const r=a==null?void 0:a.value.trim();r&&(o?mt(o,r):gt(r),i())})}i()}function Wt(e){const t=new URLSearchParams(window.location.hash.split("?")[1]||"").get("date")||"";let n=Ce().filter(a=>a.type==="Inspection");t&&(n=n.filter(a=>a.date===t));const s=t?`Inspections — ${new Date(t).toLocaleDateString("en-GB",{day:"numeric",month:"long",year:"numeric"})}`:"All Inspections";e.innerHTML=`
    ${E(s,!0)}
    <main class="max-w-6xl mx-auto p-4 pb-8">
      <div class="flex items-center justify-between mb-4">
        <h2 class="section-title">${n.length} Inspection${n.length!==1?"s":""}</h2>
        ${t?'<a href="#/inspections" class="section-subtitle text-hive-gold">View all</a>':""}
      </div>
      <div class="space-y-2">
        ${n.map((a,o)=>`
          <a href="#/inspection/${a.id||o}${t?"?from=inspections&date="+t:""}" class="card-surface flex items-center justify-between p-3 block">
            <div class="flex-1 min-w-0">
              <div class="flex items-center gap-2 mb-1">
                <span class="text-sm font-medium text-hive-text">${a.hive}</span>
                <span class="pill-green text-[9px]">${a.strength||"—"}%</span>
              </div>
              <p class="text-xs text-hive-muted truncate">${a.notes||"No notes"}</p>
            </div>
            <div class="flex items-center gap-2 flex-shrink-0 ml-3">
              <span class="text-xs text-hive-muted">${new Date(a.date).toLocaleDateString("en-GB",{day:"numeric",month:"short",year:"numeric"})}</span>
              <svg class="w-4 h-4 text-hive-muted" fill="none" stroke="currentColor" stroke-width="1.5" viewBox="0 0 24 24"><path stroke-linecap="round" stroke-linejoin="round" d="M9 5l7 7-7 7"/></svg>
            </div>
          </a>`).join("")}
        ${n.length===0?'<p class="text-hive-muted text-center py-8">No inspections found.</p>':""}
      </div>
    </main>
  `}const Vt=["Varroa mites","Nosema","Chalkbrood","Stonebrood","American Foulbrood","European Foulbrood"],Ut=["Waxmoth","Mice","Ants","Wasps","Small Hive Beetle","Hornets"],Yt=["","Compact","Spotty","Patchy","Drone-heavy","None visible"];function Gt(e,i){var I;const t=i.id,n=new URLSearchParams(window.location.hash.split("?")[1]||""),s=n.get("from")||"",a=n.get("date")||"",o=[...Ce(),...Be()],l=o.find(x=>x.id===t)||o[parseInt(t,10)];if(!l){e.innerHTML=`
      ${E("Not Found",!0)}
      <div class="max-w-6xl mx-auto p-4 text-center py-16">
        <div class="text-5xl mb-4">🔍</div>
        <p class="text-hive-muted text-lg">Inspection not found</p>
        <a href="#/inspections" class="btn-primary inline-block mt-4">Back to Inspections</a>
      </div>`;return}let d="#/inspections";s==="inspections"&&a?d=`#/inspections?date=${a}`:s&&s!=="inspections"&&(d=`#/hive/${encodeURIComponent(s)}`);const c=(l.strength||0)>=80?"var(--hive-sage)":(l.strength||0)>=50?"var(--hive-gold)":"var(--hive-red)";e.innerHTML=`
    ${E(l.hive,!0,!1,d)}
    <main class="max-w-3xl mx-auto p-5 pb-8 space-y-5">

      <!-- Header card with date + padlock -->
      <div class="card-surface">
        <div class="flex items-center justify-between">
          <div>
            <span class="pill-amber">${l.type||"Inspection"}</span>
            <span class="text-sm text-hive-muted ml-2">${new Date(l.date).toLocaleDateString("en-GB",{day:"numeric",month:"long",year:"numeric"})}</span>
          </div>
          <button id="lockToggle" class="flex items-center gap-1.5 px-3 py-1.5 rounded-full text-xs uppercase tracking-wider transition-all" style="background:var(--hive-bg);border:1px solid var(--hive-border);font-family:Inter,sans-serif;color:var(--hive-muted)">
            <svg id="lockIcon" class="w-4 h-4" fill="none" stroke="currentColor" stroke-width="1.5" viewBox="0 0 24 24"><path stroke-linecap="round" stroke-linejoin="round" d="M16.5 10.5V6.75a4.5 4.5 0 10-9 0v3.75m-.75 11.25h10.5a2.25 2.25 0 002.25-2.25v-6.75a2.25 2.25 0 00-2.25-2.25H6.75a2.25 2.25 0 00-2.25 2.25v6.75a2.25 2.25 0 002.25 2.25z"/></svg>
            <span id="lockLabel">Locked</span>
          </button>
        </div>
        <h2 class="font-serif text-xl font-medium text-hive-text mt-3">${l.hive}</h2>
      </div>

      <!-- Colony Health -->
      <section class="card p-5">
        <h3 class="section-subtitle mb-4">Colony Health</h3>
        <div class="space-y-3">
          <div class="flex items-center justify-between">
            <span class="text-sm text-hive-text">Queen Spotted</span>
            <label class="toggle-switch">
              <input type="checkbox" data-field="queenSeen" ${l.queenSeen?"checked":""} disabled>
              <div class="toggle-track"></div>
              <div class="toggle-knob"></div>
            </label>
          </div>
          <div class="flex items-center justify-between">
            <span class="text-sm text-hive-text">Brood Spotted</span>
            <label class="toggle-switch">
              <input type="checkbox" data-field="broodSpotted" ${l.broodSpotted?"checked":""} disabled>
              <div class="toggle-track"></div>
              <div class="toggle-knob"></div>
            </label>
          </div>
          <div class="flex items-center justify-between">
            <span class="text-sm text-hive-text">Queen Cells Spotted</span>
            <label class="toggle-switch">
              <input type="checkbox" data-field="queenCells" ${l.queenCells?"checked":""} disabled>
              <div class="toggle-track"></div>
              <div class="toggle-knob"></div>
            </label>
          </div>
        </div>
      </section>

      <!-- Strength, Temperament, Brood Pattern -->
      <section class="card p-5 space-y-5">
        <div>
          <div class="flex items-center justify-between mb-2">
            <span class="section-subtitle">Hive Strength</span>
            <span id="strengthValue" class="text-lg font-serif font-medium" style="color:${c}">${l.strength||"—"}%</span>
          </div>
          <input type="range" id="strengthSlider" min="0" max="100" value="${l.strength||80}" class="w-full accent-[var(--hive-gold)]" disabled>
        </div>
        <div class="border-t pt-4" style="border-color:var(--hive-border)">
          <span class="section-subtitle block mb-3">Temperament</span>
          <div class="flex gap-2">
            ${["Gentle","Active","Aggressive"].map(x=>`<button type="button" data-temperament="${x}" class="temperament-pill ${l.temperament===x?"btn-primary":"btn-secondary"} flex-1 py-2 text-xs" disabled>${x}</button>`).join("")}
          </div>
        </div>
        <div class="border-t pt-4" style="border-color:var(--hive-border)">
          <label class="section-subtitle block mb-2">Brood Pattern</label>
          <select id="broodPattern" class="input-field" disabled>
            ${Yt.map(x=>`<option value="${x}" ${l.broodPattern===x?"selected":""}>${x||"Not assessed"}</option>`).join("")}
          </select>
        </div>
      </section>

      <!-- Weight -->
      <section class="card p-5">
        <span class="section-subtitle block mb-3">Hive Weight</span>
        <div class="grid grid-cols-3 gap-4">
          <div>
            <label class="text-[11px] text-hive-muted block mb-1">Left (kg)</label>
            <input type="number" id="weightLeft" class="input-field" step="0.01" value="${l.weightLeft||""}" placeholder="—" disabled>
          </div>
          <div>
            <label class="text-[11px] text-hive-muted block mb-1">Right (kg)</label>
            <input type="number" id="weightRight" class="input-field" step="0.01" value="${l.weightRight||""}" placeholder="—" disabled>
          </div>
          <div>
            <label class="text-[11px] text-hive-muted block mb-1">Total (kg)</label>
            <input type="number" id="weightTotal" class="input-field" step="0.01" value="${l.weightTotal||""}" placeholder="—" disabled>
          </div>
        </div>
      </section>

      <!-- Issues -->
      <section class="card p-5">
        <h3 class="section-subtitle mb-2">Issues</h3>
        ${K("diseases","Diseases",`<div class="grid grid-cols-2 gap-2 pb-2">${Vt.map(x=>`<label class="flex items-center gap-2"><input type="checkbox" data-disease="${x}" class="w-3.5 h-3.5 rounded accent-[var(--hive-red)]" ${(l.diseases||[]).includes(x)?"checked":""} disabled><span class="text-sm text-hive-text">${x}</span></label>`).join("")}</div>`)}
        ${K("pests","Pests",`<div class="grid grid-cols-2 gap-2 pb-2">${Ut.map(x=>`<label class="flex items-center gap-2"><input type="checkbox" data-pest="${x}" class="w-3.5 h-3.5 rounded accent-[var(--hive-red)]" ${(l.pests||[]).includes(x)?"checked":""} disabled><span class="text-sm text-hive-text">${x}</span></label>`).join("")}</div>`)}
      </section>

      <!-- Notes -->
      <section class="card p-5">
        <label class="section-subtitle block mb-2">Notes</label>
        <textarea id="inspNotes" class="input-field min-h-[100px] resize-y" style="border:1px solid var(--hive-border);border-radius:8px;padding:12px" disabled>${l.notes||""}</textarea>
      </section>

      <!-- Environment -->
      <section class="card p-5">
        <span class="section-subtitle block mb-3">Environment</span>
        <div class="grid grid-cols-2 gap-4">
          <div>
            <label class="text-[11px] text-hive-muted block mb-1">Weather</label>
            <input type="text" id="weatherConditions" class="input-field" value="${l.weatherConditions||""}" placeholder="—" disabled>
          </div>
          <div>
            <label class="text-[11px] text-hive-muted block mb-1">Temp (°C)</label>
            <input type="number" id="weatherTemp" class="input-field" value="${l.weatherTemp||""}" placeholder="—" disabled>
          </div>
        </div>
      </section>

      <!-- Save button (hidden until unlocked) -->
      <div id="saveBar" class="hidden">
        <button id="saveBtn" class="btn-primary w-full py-3">Save Changes</button>
      </div>

      <a href="${d}" class="btn-secondary w-full py-3 text-center block">Back</a>
    </main>
  `,Ie(e);let h=!0;const p=document.getElementById("lockToggle"),m=document.getElementById("lockIcon"),v=document.getElementById("lockLabel"),r=document.getElementById("saveBar"),u=e.querySelectorAll("input, textarea, select"),f=e.querySelectorAll(".temperament-pill");p.addEventListener("click",()=>{h=!h,u.forEach(x=>{x.id!=="weightTotal"&&(x.disabled=h)}),f.forEach(x=>x.disabled=h),h?(m.innerHTML='<path stroke-linecap="round" stroke-linejoin="round" d="M16.5 10.5V6.75a4.5 4.5 0 10-9 0v3.75m-.75 11.25h10.5a2.25 2.25 0 002.25-2.25v-6.75a2.25 2.25 0 00-2.25-2.25H6.75a2.25 2.25 0 00-2.25 2.25v6.75a2.25 2.25 0 002.25 2.25z"/>',v.textContent="Locked",p.style.color="var(--hive-muted)",r.classList.add("hidden")):(m.innerHTML='<path stroke-linecap="round" stroke-linejoin="round" d="M13.5 10.5V6.75a4.5 4.5 0 119 0v3.75M3.75 21.75h10.5a2.25 2.25 0 002.25-2.25v-6.75a2.25 2.25 0 00-2.25-2.25H3.75a2.25 2.25 0 00-2.25 2.25v6.75a2.25 2.25 0 002.25 2.25z"/>',v.textContent="Editing",p.style.color="var(--hive-gold)",r.classList.remove("hidden"))});const w=document.getElementById("strengthSlider"),M=document.getElementById("strengthValue");w.addEventListener("input",()=>{M.textContent=w.value+"%"}),f.forEach(x=>{x.addEventListener("click",()=>{h||(f.forEach(B=>B.className="temperament-pill btn-secondary flex-1 py-2 text-xs"),x.className="temperament-pill btn-primary flex-1 py-2 text-xs")})});const y=document.getElementById("weightLeft"),k=document.getElementById("weightRight"),C=document.getElementById("weightTotal"),N=()=>{const x=parseFloat(y.value)||0,B=parseFloat(k.value)||0;(x>0||B>0)&&(C.value=(x+B).toFixed(2))};y.addEventListener("input",N),k.addEventListener("input",N),(I=document.getElementById("saveBtn"))==null||I.addEventListener("click",()=>{const x=document.createElement("div");x.className="fixed top-20 left-1/2 -translate-x-1/2 z-[100] px-6 py-3 rounded-full text-sm font-medium animate-in",x.style.cssText="background:var(--hive-gold);color:#0B0D0E;box-shadow:0 4px 20px rgba(212,175,55,0.3)",x.textContent="Inspection updated",document.body.appendChild(x),setTimeout(()=>{x.style.opacity="0",setTimeout(()=>x.remove(),300)},2500)})}je();Oe();L("#/login",$t);L("#/apiary",Lt);L("#/hive/:id",oe);L("#/apiary-dashboard",Ht);L("#/inspect",qt);L("#/admin",jt);L("#/devices",Rt);L("#/build/:id",Pt);L("#/hive-form/:id",Ft);L("#/tasks",Ot);L("#/notes",zt);L("#/inspections",Wt);L("#/inspection/:id",Gt);window.addEventListener("hashchange",()=>setTimeout($e,50));We().then(()=>{qe("#/login"),setTimeout($e,100)});
