const __vite__mapDeps=(i,m=__vite__mapDeps,d=(m.f||(m.f=["assets/chartjs-adapter-date-fns.esm-CV7ru7NP.js","assets/chart-19k6OvwP.js"])))=>i.map(i=>d[i]);
(function(){const s=document.createElement("link").relList;if(s&&s.supports&&s.supports("modulepreload"))return;for(const i of document.querySelectorAll('link[rel="modulepreload"]'))n(i);new MutationObserver(i=>{for(const a of i)if(a.type==="childList")for(const o of a.addedNodes)o.tagName==="LINK"&&o.rel==="modulepreload"&&n(o)}).observe(document,{childList:!0,subtree:!0});function t(i){const a={};return i.integrity&&(a.integrity=i.integrity),i.referrerPolicy&&(a.referrerPolicy=i.referrerPolicy),i.crossOrigin==="use-credentials"?a.credentials="include":i.crossOrigin==="anonymous"?a.credentials="omit":a.credentials="same-origin",a}function n(i){if(i.ep)return;i.ep=!0;const a=t(i);fetch(i.href,a)}})();const Se={};let J=null;function N(e,s){Se[e]=s}function ze(e="#/login"){async function s(){const t=window.location.hash||e,n=sessionStorage.getItem("hive_user");if(!n&&t!=="#/login"){window.location.hash="#/login";return}if(n&&t==="#/login"){window.location.hash="#/apiary";return}let i=null,a={};const o=t.split("?")[0];for(const[l,d]of Object.entries(Se)){const c=l.split("/"),p=o.split("/");if(c.length!==p.length)continue;let g=!0;const m={};for(let v=0;v<c.length;v++)if(c[v].startsWith(":"))m[c[v].slice(1)]=decodeURIComponent(p[v]);else if(c[v]!==p[v]){g=!1;break}if(g){i=d,a=m;break}}if(i){J&&(J(),J=null);const l=document.getElementById("app"),d=await i(l,a);typeof d=="function"&&(J=d)}}window.addEventListener("hashchange",s),s()}const Ee="apiary_theme";function We(){localStorage.getItem(Ee)==="light"&&document.documentElement.classList.add("light"),ce()}function Ve(){document.documentElement.classList.toggle("light");const e=document.documentElement.classList.contains("light");localStorage.setItem(Ee,e?"light":"dark"),ce()}function ce(){const e=document.documentElement.classList.contains("light");document.querySelectorAll(".theme-icon-dark").forEach(s=>s.classList.toggle("hidden",e)),document.querySelectorAll(".theme-icon-light").forEach(s=>s.classList.toggle("hidden",!e)),document.querySelectorAll(".theme-knob").forEach(s=>{s.style.left=e?"14px":"2px"})}function Ce(){document.querySelectorAll("#themeToggle").forEach(e=>{const s=e.cloneNode(!0);e.parentNode.replaceChild(s,e),s.addEventListener("click",()=>{Ve()})}),ce()}function Z(e,s,t){const n=[];for(let i=0;i<6;i++){const a=Math.PI/3*i-Math.PI/6;n.push(`${e+t*Math.cos(a)},${s+t*Math.sin(a)}`)}return`M${n.join("L")}Z`}function Ue(){const a=[];for(let o=0;o<5;o++){const l=o%2===0?4:3;for(let d=0;d<l;d++){const c=d*140.4+(o%2===0?0:105.30000000000001)+78,p=650-o*156*.5-78,g=Math.sqrt(c*c+(650-p)*(650-p))/Math.sqrt(750*750+650*650),m=Math.max(0,1-g*2);m>.05&&a.push({x:c,y:p,opacity:m})}}return Be(750,650,a,78,"bl")}function Ye(){const a=[];for(let o=0;o<4;o++)for(let d=0;d<3;d++){const c=600-d*144-80,p=o*160*.5+80,g=Math.sqrt((600-c)*(600-c)+p*p)/Math.sqrt(600*600+500*500),m=Math.max(0,1-g*2.2);m>.05&&a.push({x:c,y:p,opacity:m})}return Be(600,500,a,80,"tr")}function Be(e,s,t,n,i){const a=document.documentElement.classList.contains("light"),o="http://www.w3.org/2000/svg",l=document.createElementNS(o,"svg");l.setAttribute("width","100%"),l.setAttribute("height","100%"),l.setAttribute("viewBox",`0 0 ${e} ${s}`),l.setAttribute("preserveAspectRatio","none");const d=document.createElementNS(o,"defs"),c=document.createElementNS(o,"filter");c.setAttribute("id",`emboss-${i}`),c.setAttribute("x","-20%"),c.setAttribute("y","-20%"),c.setAttribute("width","140%"),c.setAttribute("height","140%");const p=document.createElementNS(o,"feGaussianBlur");p.setAttribute("in","SourceAlpha"),p.setAttribute("stdDeviation","3"),p.setAttribute("result","blur");const g=document.createElementNS(o,"feDiffuseLighting");g.setAttribute("in","blur"),g.setAttribute("surfaceScale","6"),g.setAttribute("diffuseConstant","0.7"),g.setAttribute("result","diffuse"),g.setAttribute("lighting-color",a?"#c8b890":"#4a6a8a");const m=document.createElementNS(o,"feDistantLight");m.setAttribute("azimuth","315"),m.setAttribute("elevation","25"),g.appendChild(m);const v=document.createElementNS(o,"feSpecularLighting");v.setAttribute("in","blur"),v.setAttribute("surfaceScale","5"),v.setAttribute("specularConstant","0.4"),v.setAttribute("specularExponent","20"),v.setAttribute("result","specular"),v.setAttribute("lighting-color",a?"#e8dcc0":"#8ab4d8");const r=document.createElementNS(o,"feDistantLight");r.setAttribute("azimuth","315"),r.setAttribute("elevation","30"),v.appendChild(r);const u=document.createElementNS(o,"feComposite");u.setAttribute("in","specular"),u.setAttribute("in2","diffuse"),u.setAttribute("operator","arithmetic"),u.setAttribute("k1","0"),u.setAttribute("k2","1"),u.setAttribute("k3","1"),u.setAttribute("k4","0"),u.setAttribute("result","lit");const f=document.createElementNS(o,"feComposite");f.setAttribute("in","lit"),f.setAttribute("in2","SourceAlpha"),f.setAttribute("operator","in"),f.setAttribute("result","clipped");const w=document.createElementNS(o,"feMerge"),M=document.createElementNS(o,"feMergeNode");M.setAttribute("in","clipped");const b=document.createElementNS(o,"feMergeNode");b.setAttribute("in","SourceGraphic"),w.appendChild(M),w.appendChild(b),c.appendChild(p),c.appendChild(g),c.appendChild(v),c.appendChild(u),c.appendChild(f),c.appendChild(w),d.appendChild(c);const k=document.createElementNS(o,"filter");k.setAttribute("id",`shadow-${i}`),k.setAttribute("x","-30%"),k.setAttribute("y","-30%"),k.setAttribute("width","160%"),k.setAttribute("height","160%");const E=document.createElementNS(o,"feDropShadow");return E.setAttribute("dx","4"),E.setAttribute("dy","6"),E.setAttribute("stdDeviation","8"),E.setAttribute("flood-color",a?"rgba(0,0,0,0.15)":"rgba(0,0,0,0.5)"),k.appendChild(E),d.appendChild(k),l.appendChild(d),t.forEach(({x:T,y:_,opacity:x})=>{const C=document.createElementNS(o,"g");C.setAttribute("opacity",String(x));const P=document.createElementNS(o,"path");P.setAttribute("d",Z(T,_,n*.92)),P.setAttribute("fill",a?"rgba(180,165,140,0.3)":"rgba(8,16,28,0.7)"),P.setAttribute("filter",`url(#shadow-${i})`),C.appendChild(P);const F=document.createElementNS(o,"path");F.setAttribute("d",Z(T,_,n*.92)),F.setAttribute("fill",a?"rgba(215,205,185,0.6)":"rgba(14,28,48,0.85)"),F.setAttribute("filter",`url(#emboss-${i})`),C.appendChild(F);const j=document.createElementNS(o,"path");j.setAttribute("d",Z(T,_,n*.92)),j.setAttribute("fill","none"),j.setAttribute("stroke",a?"rgba(255,255,255,0.4)":"rgba(255,255,255,0.06)"),j.setAttribute("stroke-width","1.5"),C.appendChild(j);const h=document.createElementNS(o,"path");h.setAttribute("d",Z(T,_,n*.95)),h.setAttribute("fill","none"),h.setAttribute("stroke",a?"rgba(160,145,120,0.2)":"rgba(255,255,255,0.04)"),h.setAttribute("stroke-width","0.8"),C.appendChild(h),l.appendChild(C)}),l}function Ge(){he(),new MutationObserver(()=>{document.querySelectorAll(".hex-corner-svg").forEach(s=>s.remove()),he()}).observe(document.documentElement,{attributes:!0,attributeFilter:["class"]})}function he(){const e=document.createElement("div");e.className="hex-corner-svg hex-corner-svg--bl",e.setAttribute("aria-hidden","true"),e.appendChild(Ue()),document.body.insertBefore(e,document.body.firstChild);const s=document.createElement("div");s.className="hex-corner-svg hex-corner-svg--tr",s.setAttribute("aria-hidden","true"),s.appendChild(Ye()),document.body.insertBefore(s,document.body.firstChild)}const Qe="https://prod-25.ukwest.logic.azure.com:443/workflows/2a2177c3c7174e0cbd8fa0392b36fd17/triggers/manual/paths/invoke?api-version=2019-05-01&sp=%2Ftriggers%2Fmanual%2Frun&sv=1.0&sig=Mlt3jgZT4UQhN6-doEkU-FrAGZZWzneDHvmyBZfX8Sg",me="https://prod-01.ukwest.logic.azure.com:443/workflows/3ee8a8759b6248d38b47c30ab29abca1/triggers/manual/paths/invoke?api-version=2019-05-01&sp=%2Ftriggers%2Fmanual%2Frun&sv=1.0&sig=6BX8eq06bY1I2fJMqMRuszsIsFTL8kDZ4yOQF66OD-c",ge="https://prod-00.ukwest.logic.azure.com:443/workflows/85b5d48749124f93ab929e8aacbecdf3/triggers/manual/paths/invoke?api-version=2019-05-01&sp=%2Ftriggers%2Fmanual%2Frun&sv=1.0&sig=ygYwSYDDTVPEwpSI5ynZ-8fJQd1aLaMEDuMFooN7w24";let A=[],U=[],q=[],G=[],ne=!1;async function Je(){if(!ne)try{const[e,s,t,n]=await Promise.all([K("hives"),K("inspections"),K("notes"),K("tasks")]);A=e.map(Ke),U=s.map(Xe).sort((i,a)=>new Date(a.date)-new Date(i.date)),q=t.map(et),G=n.map(tt),ne=!0}catch(e){console.error("Failed to load from Dataverse:",e),ne=!0}}async function K(e){if(me.includes("%%"))return console.warn(`Read flow not configured for ${e}`),[];const s=new URL(me);s.searchParams.set("entity",e);const t=await fetch(s.toString());if(!t.ok)throw new Error(`Read ${e}: HTTP ${t.status}`);return t.json()}async function Ze(e,s,t,n){if(ge.includes("%%"))return console.warn("Write flow not configured"),null;const i=await fetch(ge,{method:"POST",headers:{"Content-Type":"application/json"},body:JSON.stringify({entity:e,operation:s,data:t,id:n})});if(!i.ok)throw new Error(`Write ${e}/${s}: HTTP ${i.status}`);const a=await i.text();return a?JSON.parse(a):null}function $(e,s,t,n){Ze(e,s,t,n).catch(i=>console.error("Async write failed:",i))}function oe(e,s){if(!e)return s;try{return JSON.parse(e)}catch{return s}}function Ke(e){return{id:e.gr_hiveid,hiveName:e.gr_name,type:e.gr_hivetype||"Hive",hiveStyle:e.gr_hivestyle||"",status:e.gr_status||"Active",strength:e.gr_strength??0,beeType:e.gr_beetype||"",color:e.gr_color||"#f59e0b",queenMarked:!!e.gr_queenmarked,queenColor:e.gr_queencolor||null,queenYear:e.gr_queenyear||null,queenClipped:!!e.gr_queenclipped,queenSource:e.gr_queensource||"",queenAddedDate:e.gr_queenaddeddate?e.gr_queenaddeddate.slice(0,10):null,queenNotes:e.gr_queennotes||"",queenImage:e.gr_queenimage||null,dateAdded:e.gr_dateadded?e.gr_dateadded.slice(0,10):new Date().toISOString().slice(0,10),orientation:e.gr_orientation||"vertical",components:oe(e.gr_components,[])}}function Q(e){return{gr_name:e.hiveName,gr_hivetype:e.type,gr_hivestyle:e.hiveStyle,gr_status:e.status,gr_strength:e.strength,gr_beetype:e.beeType,gr_color:e.color,gr_queenmarked:e.queenMarked,gr_queencolor:e.queenColor,gr_queenyear:e.queenYear,gr_queenclipped:e.queenClipped,gr_queensource:e.queenSource,gr_queenaddeddate:e.queenAddedDate,gr_queennotes:e.queenNotes,gr_queenimage:e.queenImage||"",gr_components:JSON.stringify(e.components||[]),gr_dateadded:e.dateAdded,gr_orientation:e.orientation}}function Xe(e){return{id:e.gr_inspectionid||e.gr_name,date:e.gr_activitydate?e.gr_activitydate.slice(0,10):"",type:e.gr_activitytype||"Inspection",hive:e.gr_hivename||"",strength:e.gr_strength,queenSeen:!!e.gr_queenseen,broodSpotted:!!e.gr_broodspotted,queenCells:!!e.gr_queencells,temperament:e.gr_temperament||"",broodPattern:e.gr_broodpattern||"",weightLeft:e.gr_weightleft,weightRight:e.gr_weightright,weightTotal:e.gr_weighttotal,diseases:oe(e.gr_diseases,[]),pests:oe(e.gr_pests,[]),notes:e.gr_notes||"",weatherTemp:e.gr_weathertemp,weatherConditions:e.gr_weatherconditions||"",_dvId:e.gr_inspectionid}}function Ae(e){return{gr_name:e.id||"insp-"+Date.now(),gr_activitydate:e.date,gr_activitytype:e.type||"Inspection",gr_hivename:e.hive,gr_strength:e.strength,gr_queenseen:e.queenSeen,gr_broodspotted:e.broodSpotted,gr_queencells:e.queenCells,gr_temperament:e.temperament,gr_broodpattern:e.broodPattern,gr_weightleft:e.weightLeft,gr_weightright:e.weightRight,gr_weighttotal:e.weightTotal,gr_diseases:JSON.stringify(e.diseases||[]),gr_pests:JSON.stringify(e.pests||[]),gr_notes:e.notes,gr_weathertemp:e.weatherTemp,gr_weatherconditions:e.weatherConditions}}function et(e){return{id:e.gr_noteid||e.gr_name,text:e.gr_text||"",date:e.gr_notedate?e.gr_notedate.slice(0,10):"",pinned:!!e.gr_pinned,deleted:!!e.gr_deleted,hiveId:e.gr_hiveid||null,_dvId:e.gr_noteid}}function V(e){return{gr_name:e.id||"n"+Date.now(),gr_text:e.text,gr_notedate:e.date,gr_pinned:e.pinned,gr_deleted:e.deleted,gr_hiveid:e.hiveId||""}}function tt(e){return{id:e.gr_taskid||e.gr_name,text:e.gr_text||"",done:!!e.gr_done,due:e.gr_duedate?e.gr_duedate.slice(0,10):null,deleted:!!e.gr_deleted,_dvId:e.gr_taskid}}function ue(e){return{gr_name:e.id||"t"+Date.now(),gr_text:e.text,gr_done:e.done,gr_duedate:e.due,gr_deleted:e.deleted}}async function st(){const e=await fetch(Qe);if(!e.ok)throw new Error(`Telemetry fetch failed: HTTP ${e.status}`);return(await e.json()).map(t=>({weight:t.gr_weight,internalTemp:t.gr_internaltemp,batteryVoltage:t.gr_batteryvoltage,hiveHum:t.gr_hivehum,legTemp:t.gr_legtemp,timestamp:t.gr_readingtimestamp||t.createdon})).sort((t,n)=>new Date(t.timestamp)-new Date(n.timestamp))}const R={name:"Home Apiary",location:"Kidmore End, Reading RG4 9AY, UK",lat:51.509,lng:-.975};function Me(){return U}function it(){const e={};for(const s of U)e[s.date]||(e[s.date]=[]),e[s.date].push(s);return Object.entries(e).sort(([s],[t])=>new Date(t)-new Date(s)).map(([s,t])=>({date:s,items:t,count:t.length}))}function nt(e){return U.filter(s=>s.hive===e)}function Ie(){return[]}function at(e){const s={...e,id:e.id||"insp-"+Date.now()};U.unshift(s),$("inspections","create",Ae(s))}const le=[{id:"hive-roof",name:"Roof",color:"#7a8078",height:14,category:"structure",nuc:!1},{id:"hive-floor",name:"Floor",color:"#8B8580",height:10,category:"structure",nuc:!1},{id:"hive-stand",name:"Hive Stand",color:"#A09080",height:34,category:"structure",nuc:!1},{id:"hive-stand-iot",name:"Hive Stand IOT",color:"#5B7A5E",height:38,category:"structure",nuc:!1},{id:"super",name:"Super",color:"#90968b",height:30,category:"box",nuc:!1},{id:"national-brood",name:"National Brood",color:"#90968b",height:45,category:"box",nuc:!1},{id:"14x12-brood",name:"14x12 Brood",color:"#90968b",height:63,category:"box",nuc:!1},{id:"queen-excluder",name:"Queen Excluder",color:"#BFA67A",height:6,category:"accessory",nuc:!1},{id:"hive-eke",name:"Hive Eke",color:"#A89068",height:18,category:"accessory",nuc:!1},{id:"nuc-roof",name:"Nuc Roof",color:"#7a8078",height:12,category:"structure",nuc:!0},{id:"nuc-floor",name:"Nuc Floor",color:"#8B8580",height:8,category:"structure",nuc:!0},{id:"nuc-stand",name:"Nuc Stand",color:"#A09080",height:30,category:"structure",nuc:!0},{id:"nuc-stand-iot",name:"Nuc Stand IOT",color:"#5B7A5E",height:34,category:"structure",nuc:!0},{id:"nuc-brood",name:"Nuc Brood Box",color:"#90968b",height:40,category:"box",nuc:!0},{id:"nuc-super",name:"Nuc Super",color:"#90968b",height:26,category:"box",nuc:!0},{id:"nuc-eke",name:"Nuc Eke",color:"#A89068",height:14,category:"accessory",nuc:!0}],ot=["Swarm","Local","Home Bred","Buckfast","Native Black Bee","Carniolan","Italian","F1 Buckfast","Premium F1 Buckfast","UK F1 Buckfast","Premium UK F1 Buckfast","VSH Buckfast","UK Mated VSH Buckfast","Obsidian","Unknown"],lt=["National","14x12","Commercial","Langstroth","WBC","Top Bar","Poly","Other"],rt=["Bred","Purchased","Swarm","Supersedure","Emergency Cell","Gift","Split","Unknown"],dt=["Blue","White","Yellow","Red","Green","Pink"];function Y(){return A}function D(e){return A.find(s=>s.id===e)}function Le(e){return e.id=e.id||"hive-"+Date.now(),e.dateAdded=e.dateAdded||new Date().toISOString().slice(0,10),e.status=e.status||"Active",A.push(e),$("hives","create",Q(e)),e}function ie(e,s){const t=A.findIndex(n=>n.id===e);return t===-1?null:(A[t]={...A[t],...s},$("hives","update",Q(A[t]),e),A[t])}function ct(e){A=A.filter(s=>s.id!==e),$("hives","delete",null,e)}function ut(e,s,t){const n=A.find(a=>a.id===e);if(!n)return;n.components||(n.components=[]);const i=Math.max(0,n.components.length-1);n.components.splice(i,0,{type:s}),$("hives","update",Q(n),e)}function xe(e,s){const t=A.find(n=>n.id===e);!t||!t.components||(t.components.splice(s,1),$("hives","update",Q(t),e))}function fe(e,s,t){const n=A.find(a=>a.id===e);if(!n||!n.components||t<0||t>=n.components.length)return;const[i]=n.components.splice(s,1);n.components.splice(t,0,i),$("hives","update",Q(n),e)}function z(e){const s={...e,id:"insp-"+Date.now(),date:e.date||new Date().toISOString().slice(0,10)};U.unshift(s),$("inspections","create",Ae(s))}function vt(e,s,t){const n=D(e);if(!n)return null;const i=Le({hiveName:s,type:"Nuc",hiveStyle:n.hiveStyle,beeType:n.beeType,color:"#06b6d4",strength:50,queenMarked:!1,queenColor:null,queenYear:new Date().getFullYear(),orientation:"vertical",components:[{type:"nuc-roof"},{type:"nuc-brood"},{type:"nuc-floor"},{type:"nuc-stand"}]});return z({type:"Split",hive:n.hiveName,notes:`Split made — new nuc "${s}" created. ${t||""}`.trim(),strength:n.strength,queenSeen:!1,broodSpotted:!1}),z({type:"Split",hive:s,notes:`Split from ${n.hiveName}. ${t||""}`.trim(),strength:50,queenSeen:!1,broodSpotted:!1}),i}function pt(e,s,t){const n=D(e),i=D(s);!n||!i||(z({type:"Combined",hive:n.hiveName,notes:`Combined with ${i.hiveName}. ${t||""}`.trim(),strength:n.strength,queenSeen:!1,broodSpotted:!1}),z({type:"Combined",hive:i.hiveName,notes:`Combined into ${n.hiveName}. Hive deactivated. ${t||""}`.trim(),strength:0,queenSeen:!1,broodSpotted:!1}),ie(s,{status:"Combined"}))}function ht(e,s){const t=D(e);t&&(z({type:"Hive Death",hive:t.hiveName,notes:s||"Colony died out.",strength:0,queenSeen:!1,broodSpotted:!1}),ie(e,{status:"Dead",strength:0}))}function mt(e,s,t){const n=D(e);n&&z({type:"Moved",hive:n.hiveName,notes:`Moved to ${s}. ${t||""}`.trim(),strength:n.strength,queenSeen:!1,broodSpotted:!1})}const gt={"hive-roof":"nuc-roof","hive-floor":"nuc-floor","hive-stand":"nuc-stand",super:"nuc-super","national-brood":"nuc-brood","14x12-brood":"nuc-brood","hive-eke":"nuc-eke"},xt={"nuc-roof":"hive-roof","nuc-floor":"hive-floor","nuc-stand":"hive-stand","nuc-brood":"national-brood","nuc-super":"super","nuc-eke":"hive-eke"};function ft(e,s){const t=D(e);if(!t)return null;const n=t.type==="Hive",i=n?gt:xt,a=n?"Nuc":"Hive",o=(t.components||[]).map(l=>{if(n&&l.type==="queen-excluder")return null;const d=i[l.type];return d?{type:d}:l}).filter(Boolean);return z({type:"Converted",hive:t.hiveName,notes:`${n?"Downsized to Nuc":"Upgraded to Hive"}. ${s||""}`.trim(),strength:t.strength,queenSeen:!1,broodSpotted:!1}),ie(e,{type:a,components:o}),D(e)}function Ne(e=!1){return q.filter(s=>e||!s.deleted)}function bt(e){const s=q.find(t=>t.id===e);s&&(s.pinned=!s.pinned,$("notes","update",V(s),s._dvId||e))}function yt(e){const s=q.find(t=>t.id===e);s&&(s.deleted=!0,$("notes","update",V(s),s._dvId||e))}function wt(e,s){const t=q.find(n=>n.id===e);t&&(t.text=s,t.date=new Date().toISOString().slice(0,10),$("notes","update",V(t),t._dvId||e))}function kt(e,s=null){const t={id:"n"+Date.now(),text:e,date:new Date().toISOString().slice(0,10),pinned:!1,deleted:!1,hiveId:s};q.unshift(t),$("notes","create",V(t))}function $t(e){return q.find(s=>s.hiveId===e&&!s.deleted)||null}function be(e,s){const t=q.find(n=>n.hiveId===e&&!n.deleted);if(t)s?(t.text=s,t.date=new Date().toISOString().slice(0,10),t.pinned=!0):t.deleted=!0,$("notes","update",V(t),t._dvId||t.id);else if(s){const n={id:"n"+Date.now(),text:s,date:new Date().toISOString().slice(0,10),pinned:!0,deleted:!1,hiveId:e};q.unshift(n),$("notes","create",V(n))}}function He(e=!1){const s=G.filter(t=>!t.deleted);return e?s:s.filter(t=>!t.done)}function Te(e){const s=G.find(t=>t.id===e);s&&(s.done=!s.done,$("tasks","update",ue(s),s._dvId||e))}function St(e){const s=G.find(t=>t.id===e);s&&(s.deleted=!0,$("tasks","update",ue(s),s._dvId||e))}function Et(e,s){const t={id:"t"+Date.now(),text:e,done:!1,due:s,deleted:!1};G.unshift(t),$("tasks","create",ue(t))}function Ct(){return[{id:"esp32-1",name:"ESP32 Hive Scale",type:"ESP32",location:"Hive 5 - Survivor",status:"Online",battery:4.1,lastSeen:"2026-03-18T09:30:00Z",firmware:"v1.0.0",ip:"192.168.1.45"},{id:"sb-inside",name:"SwitchBot Inside",type:"SwitchBot",location:"Hive 5 - Survivor (inside)",status:"Online",battery:87,lastSeen:"2026-03-18T09:25:00Z",temp:32.5,humidity:68},{id:"sb-outside",name:"SwitchBot Outside",type:"SwitchBot",location:"Apiary (ambient)",status:"Online",battery:92,lastSeen:"2026-03-18T09:28:00Z",temp:14.2,humidity:55}]}const Bt=["0e98bf2afda73d29f786212cd02fc542cb3307fea44f76f208f396b5fcd4ea98"];async function At(e,s){const n=new TextEncoder().encode(`${e}:${s}`),i=await crypto.subtle.digest("SHA-256",n);return Array.from(new Uint8Array(i)).map(a=>a.toString(16).padStart(2,"0")).join("")}async function Mt(e){e.innerHTML=`
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
  `,document.getElementById("loginForm").addEventListener("submit",async t=>{t.preventDefault();const n=document.getElementById("username").value.trim().toLowerCase(),i=document.getElementById("password").value,a=await At(n,i);if(Bt.includes(a))sessionStorage.setItem("hive_user",JSON.stringify({name:n.charAt(0).toUpperCase()+n.slice(1),role:"admin"})),window.location.hash="#/apiary";else{const o=document.getElementById("loginError");o.textContent="Invalid username or password",o.classList.remove("hidden")}}),document.getElementById("username").focus()}function It(e){const s=e>=80?"Strong":e>=50?"Fair":"Weak";return`<span class="inline-flex items-center gap-1.5">
    <span class="w-1.5 h-1.5 rounded-full ${e>=80?"bg-hive-sage":e>=50?"bg-hive-gold":"bg-hive-red"}"></span>
    <span class="text-[10px] font-medium uppercase tracking-wider text-hive-muted" style="font-family:Inter,sans-serif;letter-spacing:0.08em">${s}</span>
  </span>`}function S(e,s=!1,t=!1,n="#/apiary"){return`
    <header class="app-header px-5 py-3 sticky top-0 z-50" style="border-bottom: 1px solid var(--hive-border);">
      <div class="max-w-6xl mx-auto flex items-center justify-between">
        <div class="flex items-center gap-3">
          ${s?`<a href="${n}" class="text-hive-muted hover:text-hive-gold" title="Back">
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
    </header>`}function Lt(e){return`<span class="${{Inspection:"pill-amber",Feed:"pill-blue",Treatment:"pill-red",Harvest:"pill-green","Hive Added":"pill-green","Hive Death":"pill-red",Split:"pill-amber",Combined:"pill-blue",Converted:"pill-amber",Moved:"pill-blue",Note:"pill-blue"}[e]||"pill-amber"}">${e}</span>`}function te(e){const s=new Date(e),n=Math.floor((new Date-s)/864e5);return n===0?"Today":n===1?"Yesterday":n<7?`${n}d ago`:n<30?`${Math.floor(n/7)}w ago`:s.toLocaleDateString("en-GB",{day:"numeric",month:"short",year:n>365?"numeric":void 0})}function se(e,s,t,n=!1){return`<div class="border-b" style="border-color:var(--hive-border)">
    <button type="button" class="accordion-trigger" aria-expanded="${n}" data-accordion="${e}">
      <span class="text-sm font-medium text-hive-text">${s}</span>
      <svg class="chevron w-4 h-4 text-hive-muted" fill="none" stroke="currentColor" stroke-width="1.25" viewBox="0 0 24 24"><path stroke-linecap="round" stroke-linejoin="round" d="M19 9l-7 7-7-7"/></svg>
    </button>
    <div id="acc-${e}" class="accordion-content ${n?"open":""}">${t}</div>
  </div>`}function _e(e){e.querySelectorAll(".accordion-trigger").forEach(s=>{s.addEventListener("click",()=>{var n;const t=s.getAttribute("aria-expanded")==="true";s.setAttribute("aria-expanded",String(!t)),(n=document.getElementById("acc-"+s.dataset.accordion))==null||n.classList.toggle("open")})})}const O={edit:'<svg class="w-4 h-4" fill="none" stroke="currentColor" stroke-width="1.25" viewBox="0 0 24 24"><path stroke-linecap="round" stroke-linejoin="round" d="M11 5H6a2 2 0 00-2 2v11a2 2 0 002 2h11a2 2 0 002-2v-5m-1.414-9.414a2 2 0 112.828 2.828L11.828 15H9v-2.828l8.586-8.586z"/></svg>',flask:'<svg class="w-4 h-4" fill="none" stroke="currentColor" stroke-width="1.25" viewBox="0 0 24 24"><path stroke-linecap="round" stroke-linejoin="round" d="M19.428 15.428a2 2 0 00-1.022-.547l-2.387-.477a6 6 0 00-3.86.517l-.318.158a6 6 0 01-3.86.517L6.05 15.21a2 2 0 00-1.806.547M8 4h8l-1 1v5.172a2 2 0 00.586 1.414l5 5c1.26 1.26.367 3.414-1.415 3.414H4.828c-1.782 0-2.674-2.154-1.414-3.414l5-5A2 2 0 009 10.172V5L8 4z"/></svg>',book:'<svg class="w-4 h-4" fill="none" stroke="currentColor" stroke-width="1.25" viewBox="0 0 24 24"><path stroke-linecap="round" stroke-linejoin="round" d="M12 6.253v13m0-13C10.832 5.477 9.246 5 7.5 5S4.168 5.477 3 6.253v13C4.168 18.477 5.754 18 7.5 18s3.332.477 4.5 1.253m0-13C13.168 5.477 14.754 5 16.5 5c1.747 0 3.332.477 4.5 1.253v13C19.832 18.477 18.247 18 16.5 18c-1.746 0-3.332.477-4.5 1.253"/></svg>',heart:'<svg class="w-4 h-4" fill="none" stroke="currentColor" stroke-width="1.25" viewBox="0 0 24 24"><path stroke-linecap="round" stroke-linejoin="round" d="M4.318 6.318a4.5 4.5 0 000 6.364L12 20.364l7.682-7.682a4.5 4.5 0 00-6.364-6.364L12 7.636l-1.318-1.318a4.5 4.5 0 00-6.364 0z"/></svg>',mapPin:'<svg class="w-3.5 h-3.5" fill="none" stroke="currentColor" stroke-width="1.25" viewBox="0 0 24 24"><path stroke-linecap="round" stroke-linejoin="round" d="M17.657 16.657L13.414 20.9a1.998 1.998 0 01-2.827 0l-4.244-4.243a8 8 0 1111.314 0z"/><path stroke-linecap="round" stroke-linejoin="round" d="M15 11a3 3 0 11-6 0 3 3 0 016 0z"/></svg>',thermometer:'<svg class="w-3.5 h-3.5" fill="none" stroke="currentColor" stroke-width="1.25" viewBox="0 0 24 24"><path stroke-linecap="round" stroke-linejoin="round" d="M12 9V3m0 6a3 3 0 100 6 3 3 0 000-6zm0 6v6"/></svg>',chevron:'<svg class="w-3.5 h-3.5 text-hive-muted" fill="none" stroke="currentColor" stroke-width="1.25" viewBox="0 0 24 24"><path stroke-linecap="round" stroke-linejoin="round" d="M9 5l7 7-7 7"/></svg>'},re=140,de=70;function ve(e){return le.find(s=>s.id===e)}function De(e){return e.some(s=>{const t=ve(s.type);return t&&t.nuc})}function Nt(e){return{"nuc-roof":14,"nuc-floor":10,"nuc-stand":34,"nuc-stand-iot":38,"nuc-brood":45,"nuc-super":30,"nuc-eke":18}[e.id]||e.height}function pe(e=[],s={}){const{size:t="md",interactive:n=!1,hiveId:i=""}=s,a=t==="sm"?.5:t==="lg"?1.2:.8,o=De(e),l=Math.round((o?de:re)*a),d=Math.round((o?de+40:re+40)*a);if(!e.length)return`<div class="flex flex-col items-center" style="width:${d}px">
      <div class="text-gray-600 text-xs text-center py-4">No components</div>
    </div>`;let c=`<div class="flex flex-col items-center" style="width:${d}px">`;return e.forEach((p,g)=>{const m=ve(p.type);if(!m)return;const v=Math.round(m.height*a),r=m.id.includes("roof"),u=m.id.includes("stand-iot"),f=!u&&m.id.includes("stand"),w=m.id.includes("floor"),M=m.category==="accessory";if(r)c+=`<div class="relative" style="width:${l+Math.round(8*a)}px; height:${v}px">
        <div class="absolute inset-0 rounded-t-md" style="background:${m.color}"></div>
        <div class="absolute bottom-0 left-0.5 right-0.5 h-px" style="background:#991b1b"></div>
      </div>`;else if(w)c+=`<div style="width:${l+Math.round(4*a)}px; height:${v}px; background:${m.color}; border-radius: 0 0 2px 2px"></div>`;else if(u){const b=Math.max(3,Math.round(4*a)),k=Math.round(v*.28),E=v-k;c+=`<div class="flex flex-col items-center" style="width:${l+Math.round(16*a)}px">
        <div class="relative" style="width:${l+Math.round(12*a)}px; height:${k}px; background:${m.color}; border-radius: 0 0 3px 3px">
          <div style="position:absolute;bottom:0;left:0;right:0;height:3px;background:#22c55e;border-radius:0 0 3px 3px"></div>
          <div style="position:absolute;top:-${Math.round(6*a)}px;right:${Math.round(8*a)}px;width:2px;height:${Math.round(8*a)}px;background:#22c55e;border-radius:1px"></div>
          <div style="position:absolute;top:-${Math.round(8*a)}px;right:${Math.round(5*a)}px;width:${Math.round(6*a)}px;height:${Math.round(6*a)}px;border:2px solid #22c55e;border-radius:50%;background:transparent"></div>
        </div>
        <div class="flex justify-between" style="width:${l+Math.round(12*a)}px; height:${E}px">
          <div style="width:${b}px; background:#A09080; height:${E}px; border-radius: 0 0 2px 2px"></div>
          <div style="width:${b}px; background:#A09080; height:${E}px; border-radius: 0 0 2px 2px"></div>
        </div>
      </div>`}else if(f){const b=Math.max(2,Math.round(3*a));c+=`<div class="flex justify-between" style="width:${l+Math.round(12*a)}px; height:${v}px">
        <div style="width:${b}px; background:${m.color}; height:${v}px; border-radius: 0 0 2px 2px"></div>
        <div class="flex-1 mx-0.5" style="background:${m.color}; height:${Math.round(v*.3)}px; border-radius: 0 0 2px 2px"></div>
        <div style="width:${b}px; background:${m.color}; height:${v}px; border-radius: 0 0 2px 2px"></div>
      </div>`}else if(M){const b=Math.max(7,Math.round(8*a));c+=`<div class="relative flex items-center justify-center" style="width:${l}px; height:${v}px; background:${m.color}">
        <span class="text-white/60 font-medium text-center leading-tight" style="font-size:${b}px">${m.name}</span>
        ${n?ye(i,g):""}
      </div>`}else{const b=Math.max(8,Math.round(10*a));c+=`<div class="relative flex items-center justify-center" style="width:${l}px; height:${v}px; background:${m.color}; border-left:2px solid rgba(0,0,0,0.12); border-right:2px solid rgba(0,0,0,0.12)">
        <span class="text-white font-semibold text-center leading-tight" style="font-size:${b}px; text-shadow:0 1px 2px rgba(0,0,0,0.3)">${m.name}</span>
        ${n?ye(i,g):""}
      </div>`}}),c+="</div>",c}function ye(e,s){return`<button onclick="document.dispatchEvent(new CustomEvent('hive-remove-component', {detail:{hiveId:'${e}',index:${s}}}))" class="absolute top-0 right-0.5 text-white/40 hover:text-white text-xs leading-none p-0.5" title="Remove">✕</button>`}function qe(e=[],s="#f59e0b"){if(!e||!e.length)return'<div class="w-full h-full flex items-center justify-center text-3xl">🏠</div>';const t=.35,n=De(e),i=Math.round((n?de:re)*t);let a='<div class="flex flex-col items-center justify-end h-full py-1">';return e.forEach(o=>{const l=ve(o.type);if(!l)return;const d=n?Nt(l):l.height,c=Math.round(d*t);l.id.includes("roof")?a+=`<div class="rounded-t" style="width:${i+3}px; height:${c}px; background:${l.color}"></div>`:l.id.includes("stand-iot")?a+=`<div class="flex flex-col items-center" style="width:${i+8}px">
        <div class="relative" style="width:${i+6}px; height:${Math.round(c*.3)}px; background:#5B7A5E">
          <div style="position:absolute;bottom:0;left:0;right:0;height:1px;background:#22c55e"></div>
        </div>
        <div class="flex justify-between" style="width:${i+6}px; height:${c-Math.round(c*.3)}px">
          <div style="width:1px; background:#A09080; height:100%"></div>
          <div style="width:1px; background:#A09080; height:100%"></div>
        </div>
      </div>`:l.id.includes("stand")?a+=`<div class="flex justify-between" style="width:${i+6}px; height:${c}px">
        <div style="width:1px; background:${l.color}; height:${c}px"></div>
        <div class="flex-1 mx-px" style="background:${l.color}; height:${Math.round(c*.3)}px"></div>
        <div style="width:1px; background:${l.color}; height:${c}px"></div>
      </div>`:l.id.includes("floor")?a+=`<div style="width:${i+2}px; height:${Math.max(2,c)}px; background:${l.color}"></div>`:l.category==="accessory"?a+=`<div style="width:${i}px; height:${Math.max(2,c)}px; background:${l.color}"></div>`:a+=`<div style="width:${i}px; height:${c}px; background:${l.color}; border-left:1px solid rgba(0,0,0,0.12); border-right:1px solid rgba(0,0,0,0.12)"></div>`}),a+="</div>",a}const Ht={0:"Clear Sky",1:"Mainly Clear",2:"Partly Cloudy",3:"Overcast",45:"Foggy",48:"Rime Fog",51:"Light Drizzle",53:"Drizzle",55:"Heavy Drizzle",61:"Light Rain",63:"Rain",65:"Heavy Rain",71:"Light Snow",73:"Snow",75:"Heavy Snow",77:"Snow Grains",80:"Light Showers",81:"Showers",82:"Heavy Showers",85:"Light Snow Showers",86:"Snow Showers",95:"Thunderstorm",96:"Thunderstorm + Hail",99:"Thunderstorm + Heavy Hail"};let X=null,we=0;const Tt=10*60*1e3;async function je(e,s){if(X&&Date.now()-we<Tt)return X;const t=`https://api.open-meteo.com/v1/forecast?latitude=${e}&longitude=${s}&current=temperature_2m,relative_humidity_2m,weather_code,wind_speed_10m&timezone=auto`,n=await fetch(t);if(!n.ok)throw new Error(`Weather API: HTTP ${n.status}`);const a=(await n.json()).current,o=a.weather_code;return X={temp:Math.round(a.temperature_2m),conditions:Ht[o]||`Code ${o}`,humidity:a.relative_humidity_2m,windSpeed:Math.round(a.wind_speed_10m),icon:_t(o)},we=Date.now(),X}function _t(e){return e===0||e===1?"☀️":e===2?"⛅":e===3?"☁️":e>=45&&e<=48?"🌫️":e>=51&&e<=55?"🌦️":e>=61&&e<=65?"🌧️":e>=71&&e<=77?"🌨️":e>=80&&e<=82?"🌦️":e>=85&&e<=86?"🌨️":e>=95?"⛈️":"🌤️"}async function Dt(e){const s=Y(),t=it(),n=Ne(),i=He(),a=s.filter(o=>o.status==="Active");e.innerHTML=`
    ${S(R.name,!1,!0)}

    <main class="max-w-6xl mx-auto pb-8 hex-bg">

      <!-- Location & Weather -->
      <section class="px-5 py-4">
        <div class="flex items-center gap-5 text-sm">
          <span class="flex items-center gap-1.5 text-hive-muted">${O.mapPin}<span class="text-hive-text text-xs">${R.location}</span></span>
          <span class="flex items-center gap-1.5 text-hive-muted">${O.thermometer}<span id="liveWeather" class="text-hive-text text-xs">Loading...</span></span>
        </div>
      </section>

      <!-- Quick Actions -->
      <section class="px-5 mb-6">
        <div class="flex gap-2">
          <a href="#/inspect" class="btn-action">${O.edit}<span>Inspect</span></a>
          <a href="#/inspect?type=harvest" class="btn-action">${O.flask}<span>Harvest</span></a>
          <a href="#/inspect?type=feed" class="btn-action">${O.book}<span>Feed</span></a>
          <a href="#/inspect?type=treatment" class="btn-action">${O.heart}<span>Treat</span></a>
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
                <div class="w-full h-24 flex items-end justify-center mb-3">${qe(o.components,o.color)}</div>
                <h3 class="font-serif text-sm font-medium text-hive-text text-center leading-tight mb-1.5">${o.hiveName}</h3>
                <div class="mb-1">${It(o.strength)}</div>
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
            ${i.map(o=>`
              <label class="flex items-center gap-3 cursor-pointer task-item" data-task-id="${o.id}">
                <input type="checkbox" class="w-4 h-4 rounded accent-[var(--hive-gold)] task-check" data-task="${o.id}">
                <span class="text-sm flex-1 text-hive-text">${o.text}</span>
                <span class="text-[10px] uppercase tracking-wider text-hive-gold">${te(o.due)}</span>
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
              ${O.chevron}
            </a>
          `).join("")}
        </div>
      </section>

    </main>
  `,je(R.lat,R.lng).then(o=>{const l=document.getElementById("liveWeather");l&&(l.textContent=`${o.temp}°C ${o.conditions}`)}).catch(()=>{const o=document.getElementById("liveWeather");o&&(o.textContent="—")}),document.querySelectorAll(".task-check").forEach(o=>{o.addEventListener("change",()=>{const l=o.dataset.task;Te(l);const d=o.closest(".task-item");d&&(d.style.opacity="0.3",d.style.textDecoration="line-through",setTimeout(()=>d.remove(),600))})})}async function ee(e,s){var f,w,M,b,k,E,T,_,x,C,P,F,j;const t=s.id,i=Y().find(h=>h.hiveName===t),a=[...nt(t),...Ie().filter(h=>h.hive===t)].sort((h,y)=>new Date(y.date)-new Date(h.date));if(!i){e.innerHTML=`
      ${S("Not Found",!0)}
      <div class="max-w-6xl mx-auto p-4 text-center py-16">
        <div class="text-5xl mb-4">🔍</div>
        <p class="text-hive-muted text-lg">Hive not found</p>
        <a href="#/apiary" class="btn-primary inline-block mt-6">Back to Apiary</a>
      </div>`;return}const o=i.strength>=80?"#22c55e":i.strength>=50?"#f59e0b":"#ef4444";i.queenYear&&new Date().getFullYear()-i.queenYear;const l=a.filter(h=>h.type==="Inspection"),d=l.length?new Date(l[0].date):null,c=d?Math.floor((new Date-d)/864e5):null,p=$t(i.id);let g="—";if(i.queenAddedDate){const h=new Date(i.queenAddedDate),y=new Date;let I=y.getFullYear()-h.getFullYear(),H=y.getMonth()-h.getMonth(),L=y.getDate()-h.getDate();L<0&&(H--,L+=new Date(y.getFullYear(),y.getMonth(),0).getDate()),H<0&&(I--,H+=12);const B=[];I>0&&B.push(`${I}y`),H>0&&B.push(`${H}m`),B.push(`${L}d`),g=B.join(" ")}const m={Green:"var(--hive-sage)",Pink:"#ec4899",Blue:"var(--hive-blue)",Yellow:"#eab308",Red:"var(--hive-red)",White:"#e5e7eb"};e.innerHTML=`
    ${S(i.hiveName,!0)}

    <main class="max-w-6xl mx-auto pb-24">

      <!-- Hero Card — compact header -->
      <section class="px-4 pt-4 pb-2">
        <div class="card p-5">
          <div class="flex items-start justify-between">
            <div class="flex-1">
              <div class="flex items-center gap-3 mb-2">
                <h2 class="font-serif text-xl font-bold text-hive-text">${i.hiveName}</h2>
                <div class="flex items-center gap-1.5">
                  <span class="text-2xl font-bold" style="color:${o}">${i.strength}%</span>
                  <span class="text-[10px] text-hive-muted uppercase tracking-wider">Strength</span>
                </div>
              </div>
              <div class="flex items-center gap-2 flex-wrap">
                <span class="pill-amber">${i.beeType}</span>
                <span class="${i.type==="Nuc"?"pill-blue":"pill-orange"}">${i.type}</span>
                ${i.hiveStyle?`<span class="pill-blue">${i.hiveStyle}</span>`:""}
                <span class="pill-green">${i.status}</span>
                <a href="#/hive-form/${i.id}" class="pill text-xs bg-hive-surface text-hive-muted hover:text-hive-amber">Edit</a>
              </div>
            </div>
          </div>
        </div>
      </section>

      <!-- Two-panel: Queen Profile + Hive Metrics -->
      <section class="px-4 mb-4 grid grid-cols-1 md:grid-cols-2 gap-3">

        <!-- Queen Profile -->
        <div class="card p-5">
          <div class="section-subtitle mb-3">Queen Profile</div>
          <div class="space-y-2.5">
            <div class="flex items-center gap-2">
              ${i.queenMarked?`<span class="w-2.5 h-2.5 rounded-full flex-shrink-0" style="background:${m[i.queenColor]||"var(--hive-muted)"}"></span><span class="text-sm text-hive-text">${i.queenColor} Marked</span>`:'<span class="text-sm text-hive-muted">Unmarked</span>'}
              ${i.queenClipped?'<span class="text-sm text-hive-muted ml-2">&middot; Clipped</span>':""}
            </div>
            <div class="flex gap-4">
              <div><span class="text-[11px] text-hive-muted block">Breed</span><span class="text-sm text-hive-text">${i.beeType}</span></div>
              <div><span class="text-[11px] text-hive-muted block">Source</span><span class="text-sm text-hive-text">${i.queenSource||"—"}</span></div>
            </div>
            ${i.queenAddedDate?`
            <div class="pt-2 border-t" style="border-color:var(--hive-border)">
              <div class="text-[11px] text-hive-muted uppercase tracking-wider mb-1">Queen Timeline</div>
              <div class="text-sm text-hive-text">Added: ${new Date(i.queenAddedDate).toLocaleDateString("en-GB",{day:"numeric",month:"short",year:"numeric"})}</div>
              <div class="text-sm text-hive-text">Age: ${g}${i.queenYear?` (${i.queenYear})`:""}</div>
            </div>`:""}
            ${i.queenNotes?`<p class="text-xs text-hive-muted italic pt-1">${i.queenNotes}</p>`:""}
          </div>
        </div>

        <!-- Hive Metrics + Visual -->
        <div class="card p-5">
          <div class="section-subtitle mb-3">Hive Metrics</div>
          <div class="grid grid-cols-2 gap-4">
            <div class="space-y-3">
              <div class="flex items-center gap-2.5">
                <svg class="w-4 h-4 text-hive-muted flex-shrink-0" fill="none" stroke="currentColor" stroke-width="1.5" viewBox="0 0 24 24"><path stroke-linecap="round" stroke-linejoin="round" d="M6.75 3v2.25M17.25 3v2.25M3 18.75V7.5a2.25 2.25 0 012.25-2.25h13.5A2.25 2.25 0 0121 7.5v11.25m-18 0A2.25 2.25 0 005.25 21h13.5A2.25 2.25 0 0021 18.75m-18 0v-7.5A2.25 2.25 0 015.25 9h13.5A2.25 2.25 0 0121 11.25v7.5"/></svg>
                <span class="text-sm text-hive-text">Added: ${new Date(i.dateAdded).toLocaleDateString("en-GB",{day:"numeric",month:"short",year:"numeric"})}</span>
              </div>
              <div class="flex items-center gap-2.5">
                <svg class="w-4 h-4 text-hive-muted flex-shrink-0" fill="none" stroke="currentColor" stroke-width="1.5" viewBox="0 0 24 24"><path stroke-linecap="round" stroke-linejoin="round" d="M21 21l-5.197-5.197m0 0A7.5 7.5 0 105.196 5.196a7.5 7.5 0 0010.607 10.607z"/></svg>
                <span class="text-sm text-hive-text">${l.length} Inspections <span class="text-hive-muted">(Since Jun 2025)</span></span>
              </div>
              <div class="flex items-center gap-2.5">
                <svg class="w-4 h-4 flex-shrink-0 ${c!==null&&c>10?"text-hive-red":"text-hive-muted"}" fill="none" stroke="currentColor" stroke-width="1.5" viewBox="0 0 24 24"><path stroke-linecap="round" stroke-linejoin="round" d="M12 6v6h4.5m4.5 0a9 9 0 11-18 0 9 9 0 0118 0z"/></svg>
                <span class="text-sm ${c!==null&&c>10?"text-hive-red":"text-hive-text"}">Last Activity: ${c!==null?c:"—"} Days${d?` (${d.toLocaleDateString("en-GB",{day:"numeric",month:"short"})})`:""}</span>
              </div>
            </div>
            <!-- Hive visual — centered and prominent -->
            <div class="flex items-center justify-center rounded-xl py-3" style="background:var(--hive-bg)">
              ${pe(i.components||[],{size:"md"})}
            </div>
          </div>
        </div>
      </section>

      <!-- Action Buttons — 3 across -->
      <section class="px-4 mb-4 grid grid-cols-3 gap-3">
        <button id="editHiveNote" class="card p-4 flex flex-col items-center gap-2 text-center hover:border-hive-gold/30 transition-colors">
          <svg class="w-8 h-8 ${p?"text-hive-gold":"text-hive-muted"}" fill="none" stroke="currentColor" stroke-width="1.25" viewBox="0 0 24 24"><path stroke-linecap="round" stroke-linejoin="round" d="M11 5H6a2 2 0 00-2 2v11a2 2 0 002 2h11a2 2 0 002-2v-5m-1.414-9.414a2 2 0 112.828 2.828L11.828 15H9v-2.828l8.586-8.586z"/></svg>
          <div class="text-xs font-semibold text-hive-text uppercase tracking-wider">Hive Notes</div>
          <div class="text-[10px] text-hive-muted">${p?"View / Edit":"Add Note"}</div>
        </button>
        <a href="#/apiary-dashboard" class="card p-4 flex flex-col items-center gap-2 text-center hover:border-hive-gold/30 transition-colors">
          <svg class="w-8 h-8 text-hive-gold" fill="none" stroke="currentColor" stroke-width="1.25" viewBox="0 0 24 24"><path stroke-linecap="round" stroke-linejoin="round" d="M3 13.125C3 12.504 3.504 12 4.125 12h2.25c.621 0 1.125.504 1.125 1.125v6.75C7.5 20.496 6.996 21 6.375 21h-2.25A1.125 1.125 0 013 19.875v-6.75zM9.75 8.625c0-.621.504-1.125 1.125-1.125h2.25c.621 0 1.125.504 1.125 1.125v11.25c0 .621-.504 1.125-1.125 1.125h-2.25a1.125 1.125 0 01-1.125-1.125V8.625zM16.5 4.125c0-.621.504-1.125 1.125-1.125h2.25C20.496 3 21 3.504 21 4.125v15.75c0 .621-.504 1.125-1.125 1.125h-2.25a1.125 1.125 0 01-1.125-1.125V4.125z"/></svg>
          <div class="text-xs font-semibold text-hive-text uppercase tracking-wider">Weight Tracking</div>
          <div class="text-[10px] text-hive-muted">Analyze Charts</div>
        </a>
        <a href="#/build/${i.id}" class="card p-4 flex flex-col items-center gap-2 text-center hover:border-hive-gold/30 transition-colors">
          <svg class="w-8 h-8 text-hive-gold" fill="none" stroke="currentColor" stroke-width="1.25" viewBox="0 0 24 24"><path stroke-linecap="round" stroke-linejoin="round" d="M11.42 15.17l-5.66-5.66a2 2 0 010-2.83l.71-.71a2 2 0 012.83 0l5.66 5.66m-8.49 8.49l-2.83-2.83a2 2 0 010-2.83l.71-.71a2 2 0 012.83 0l2.83 2.83"/></svg>
          <div class="text-xs font-semibold text-hive-text uppercase tracking-wider">Hive Build</div>
          <div class="text-[10px] text-hive-muted">Components: ${(i.components||[]).length}</div>
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
              <p class="text-xs text-hive-muted mt-1">${i.hiveName} — ${new Date().toLocaleDateString("en-GB",{day:"numeric",month:"short",year:"numeric"})}</p>
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
            <div class="section-subtitle">${i.type==="Hive"?"Downsize to Nuc":"Upgrade to Hive"}</div>
          </button>
        </div>
      </section>

      <!-- Inspection Timeline -->
      <section class="px-4 mb-6">
        <h3 class="font-serif text-base font-medium text-hive-text mb-3">Inspection History</h3>
        <div class="space-y-0">
          ${a.map((h,y)=>`
            <a href="#/inspection/${h.id||y}?from=${encodeURIComponent(t)}" class="flex gap-3 ${y<a.length-1?"pb-4":""} block">
              <div class="flex flex-col items-center">
                <div class="timeline-dot" style="background: rgba(212,175,55,0.1); color: var(--hive-gold)">
                  <svg class="w-3.5 h-3.5" fill="none" stroke="currentColor" stroke-width="1.5" viewBox="0 0 24 24"><path stroke-linecap="round" stroke-linejoin="round" d="M9 5H7a2 2 0 00-2 2v12a2 2 0 002 2h10a2 2 0 002-2V7a2 2 0 00-2-2h-2M9 5a2 2 0 002 2h2a2 2 0 002-2M9 5a2 2 0 012-2h2a2 2 0 012 2"/></svg>
                </div>
                ${y<a.length-1?'<div class="w-px bg-hive-border flex-1 mt-1"></div>':""}
              </div>
              <div class="flex-1 pb-1">
                <div class="flex items-center justify-between">
                  ${Lt(h.type)}
                  <span class="text-xs text-hive-muted">${new Date(h.date).toLocaleDateString("en-GB",{day:"numeric",month:"short",year:"numeric"})}</span>
                </div>
                ${h.notes?`<p class="text-sm text-hive-text mt-1 leading-relaxed">${h.notes}</p>`:""}
                <div class="flex gap-3 mt-1.5 text-xs text-hive-muted">
                  ${h.queenSeen?'<span style="color:var(--hive-sage)">Queen spotted</span>':""}
                  ${h.broodSpotted?'<span style="color:var(--hive-blue)">Brood present</span>':""}
                  ${h.strength?`<span>${h.strength}%</span>`:""}
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
        <a href="#/inspect?hive=${encodeURIComponent(i.hiveName)}" class="btn-action">
          <svg class="w-4 h-4" fill="none" stroke="currentColor" stroke-width="1.5" viewBox="0 0 24 24"><path stroke-linecap="round" stroke-linejoin="round" d="M11 5H6a2 2 0 00-2 2v11a2 2 0 002 2h11a2 2 0 002-2v-5m-1.414-9.414a2 2 0 112.828 2.828L11.828 15H9v-2.828l8.586-8.586z"/></svg>
          <span>Inspect</span>
        </a>
        <a href="#/inspect?hive=${encodeURIComponent(i.hiveName)}&type=harvest" class="btn-action">
          <svg class="w-4 h-4" fill="none" stroke="currentColor" stroke-width="1.5" viewBox="0 0 24 24"><path stroke-linecap="round" stroke-linejoin="round" d="M19.428 15.428a2 2 0 00-1.022-.547l-2.387-.477a6 6 0 00-3.86.517l-.318.158a6 6 0 01-3.86.517L6.05 15.21a2 2 0 00-1.806.547M8 4h8l-1 1v5.172a2 2 0 00.586 1.414l5 5c1.26 1.26.367 3.414-1.415 3.414H4.828c-1.782 0-2.674-2.154-1.414-3.414l5-5A2 2 0 009 10.172V5L8 4z"/></svg>
          <span>Harvest</span>
        </a>
        <a href="#/inspect?hive=${encodeURIComponent(i.hiveName)}&type=feed" class="btn-action">
          <svg class="w-4 h-4" fill="none" stroke="currentColor" stroke-width="1.5" viewBox="0 0 24 24"><path stroke-linecap="round" stroke-linejoin="round" d="M12 6.253v13m0-13C10.832 5.477 9.246 5 7.5 5S4.168 5.477 3 6.253v13C4.168 18.477 5.754 18 7.5 18s3.332.477 4.5 1.253m0-13C13.168 5.477 14.754 5 16.5 5c1.747 0 3.332.477 4.5 1.253v13C19.832 18.477 18.247 18 16.5 18c-1.746 0-3.332.477-4.5 1.253"/></svg>
          <span>Feed</span>
        </a>
        <a href="#/inspect?hive=${encodeURIComponent(i.hiveName)}&type=treatment" class="btn-action">
          <svg class="w-4 h-4" fill="none" stroke="currentColor" stroke-width="1.5" viewBox="0 0 24 24"><path stroke-linecap="round" stroke-linejoin="round" d="M4.318 6.318a4.5 4.5 0 000 6.364L12 20.364l7.682-7.682a4.5 4.5 0 00-6.364-6.364L12 7.636l-1.318-1.318a4.5 4.5 0 00-6.364 0z"/></svg>
          <span>Treat</span>
        </a>
      </div>
    </div>
  `;const v=document.getElementById("noteModal"),r=()=>v==null?void 0:v.classList.remove("hidden"),u=()=>v==null?void 0:v.classList.add("hidden");(f=document.getElementById("editHiveNote"))==null||f.addEventListener("click",r),(w=document.getElementById("noteModalBackdrop"))==null||w.addEventListener("click",u),(M=document.getElementById("noteModalClose"))==null||M.addEventListener("click",u),(b=document.getElementById("noteModalCancel"))==null||b.addEventListener("click",u),(k=document.getElementById("noteModalSave"))==null||k.addEventListener("click",()=>{var y;const h=(y=document.getElementById("noteModalText"))==null?void 0:y.value.trim();h&&(be(i.id,h),u(),ee(e,s))}),(E=document.getElementById("noteModalDelete"))==null||E.addEventListener("click",()=>{confirm("Delete this hive note?")&&(be(i.id,""),u(),ee(e,s))}),(T=document.getElementById("queenImageBtn"))==null||T.addEventListener("click",()=>{var h;(h=document.getElementById("queenImageInput"))==null||h.click()}),(_=document.getElementById("queenImageInput"))==null||_.addEventListener("change",h=>{var H;const y=(H=h.target.files)==null?void 0:H[0];if(!y)return;const I=new FileReader;I.onload=()=>{const L=new Image;L.onload=()=>{const B=Math.min(L.width,L.height),W=document.createElement("canvas");W.width=300,W.height=300;const Re=W.getContext("2d"),Pe=(L.width-B)/2,Fe=(L.height-B)/2;Re.drawImage(L,Pe,Fe,B,B,0,0,300,300);const Oe=W.toDataURL("image/jpeg",.8);updateHive(i.id,{queenImage:Oe}),ee(e,s)},L.src=I.result},I.readAsDataURL(y)}),(x=e.querySelector('[data-op="split"]'))==null||x.addEventListener("click",()=>{const h=prompt('Name for the new nuc/hive (e.g. "Nuc 2 - Split"):');if(!h)return;const y=prompt("Split notes (optional):")||"";vt(i.id,h,y),window.location.hash="#/apiary"}),(C=e.querySelector('[data-op="combine"]'))==null||C.addEventListener("click",()=>{const h=Y().filter(B=>B.id!==i.id&&B.status==="Active");if(!h.length){alert("No other active hives to combine with.");return}const y=h.map((B,W)=>`${W+1}. ${B.hiveName}`).join(`
`),I=prompt(`Combine ${i.hiveName} INTO which hive? (this hive will be deactivated)

${y}

Enter number:`);if(!I)return;const H=parseInt(I,10)-1;if(H<0||H>=h.length){alert("Invalid selection.");return}const L=prompt("Combine notes (optional):")||"";pt(h[H].id,i.id,L),window.location.hash="#/apiary"}),(P=e.querySelector('[data-op="dead"]'))==null||P.addEventListener("click",()=>{if(!confirm(`Mark "${i.hiveName}" as dead? This will deactivate the hive.`))return;const h=prompt("Notes on the death (optional):")||"";ht(i.id,h),window.location.hash="#/apiary"}),(F=e.querySelector('[data-op="move"]'))==null||F.addEventListener("click",()=>{const h=prompt("Where is the hive being moved to?");if(!h)return;const y=prompt("Move notes (optional):")||"";mt(i.id,h,y),alert(`${i.hiveName} move recorded to timeline.`),window.location.hash="#/hive/"+encodeURIComponent(i.hiveName)}),(j=e.querySelector('[data-op="convert"]'))==null||j.addEventListener("click",()=>{const h=i.type==="Hive"?"downsize to a Nuc":"upgrade to a full Hive";if(!confirm(`Convert "${i.hiveName}" — ${h}?

All components will be swapped to the matching type.`))return;const y=prompt("Conversion notes (optional):")||"",I=ft(i.id,y);I&&(window.location.hash="#/hive/"+encodeURIComponent(I.hiveName))})}const qt="modulepreload",jt=function(e){return"/"+e},ke={},$e=function(s,t,n){let i=Promise.resolve();if(t&&t.length>0){document.getElementsByTagName("link");const o=document.querySelector("meta[property=csp-nonce]"),l=(o==null?void 0:o.nonce)||(o==null?void 0:o.getAttribute("nonce"));i=Promise.allSettled(t.map(d=>{if(d=jt(d),d in ke)return;ke[d]=!0;const c=d.endsWith(".css"),p=c?'[rel="stylesheet"]':"";if(document.querySelector(`link[href="${d}"]${p}`))return;const g=document.createElement("link");if(g.rel=c?"stylesheet":qt,c||(g.as="script"),g.crossOrigin="",g.href=d,l&&g.setAttribute("nonce",l),document.head.appendChild(g),c)return new Promise((m,v)=>{g.addEventListener("load",m),g.addEventListener("error",()=>v(new Error(`Unable to preload CSS for ${d}`)))})}))}function a(o){const l=new Event("vite:preloadError",{cancelable:!0});if(l.payload=o,window.dispatchEvent(l),!l.defaultPrevented)throw o}return i.then(o=>{for(const l of o||[])l.status==="rejected"&&a(l.reason);return s().catch(a)})};async function Rt(e){e.innerHTML=`
    ${S("Sensor Dashboard",!0)}
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
  `;const{Chart:s,registerables:t}=await $e(async()=>{const{Chart:p,registerables:g}=await import("./chart-19k6OvwP.js");return{Chart:p,registerables:g}},[]);await $e(()=>import("./chartjs-adapter-date-fns.esm-CV7ru7NP.js"),__vite__mapDeps([0,1])),s.register(...t);const n={responsive:!0,maintainAspectRatio:!0,aspectRatio:2.5,interaction:{mode:"index",intersect:!1},plugins:{legend:{labels:{color:"#9ca3af",usePointStyle:!0,padding:12}},tooltip:{backgroundColor:"#1a1d27",borderColor:"#2a2e3e",borderWidth:1,titleColor:"#e4e4e7",bodyColor:"#e4e4e7",padding:10,callbacks:{title:p=>new Date(p[0].parsed.x).toLocaleString()}}},scales:{x:{type:"time",time:{tooltipFormat:"dd MMM HH:mm"},grid:{color:"rgba(255,255,255,0.05)"},ticks:{color:"#9ca3af",maxTicksLimit:8}},y:{grid:{color:"rgba(255,255,255,0.05)"},ticks:{color:"#9ca3af"}}}},i=(p,g)=>({label:p,borderColor:g,backgroundColor:g+"1a",fill:!1,tension:.3,pointRadius:0,borderWidth:2,data:[]}),a=new s(document.getElementById("weightChart"),{type:"line",data:{datasets:[{...i("Weight (kg)","#f59e0b"),fill:!0}]},options:{...n,scales:{...n.scales,y:{...n.scales.y,title:{display:!0,text:"kg",color:"#9ca3af"}}}}}),o=new s(document.getElementById("tempChart"),{type:"line",data:{datasets:[i("Internal (°C)","#ef4444"),i("Leg (°C)","#a78bfa")]},options:{...n,aspectRatio:2,scales:{...n.scales,y:{...n.scales.y,title:{display:!0,text:"°C",color:"#9ca3af"}}}}}),l=new s(document.getElementById("envChart"),{type:"line",data:{datasets:[{...i("Humidity (%)","#3b82f6"),yAxisID:"yHum"},{...i("Battery (V)","#22c55e"),yAxisID:"yBat"}]},options:{...n,aspectRatio:2,scales:{x:n.scales.x,yHum:{type:"linear",position:"left",grid:{color:"rgba(255,255,255,0.05)"},ticks:{color:"#3b82f6"},title:{display:!0,text:"%",color:"#3b82f6"}},yBat:{type:"linear",position:"right",grid:{drawOnChartArea:!1},ticks:{color:"#22c55e"},title:{display:!0,text:"V",color:"#22c55e"}}}}});async function d(){const p=parseInt(document.getElementById("timeRange").value,10),g=new Date(Date.now()-p*3600*1e3);try{const m=await st();document.getElementById("errorBanner").classList.add("hidden");const v=m.filter(u=>new Date(u.timestamp)>=g);if(v.length>0){const u=v[v.length-1],f=(M,b,k)=>{document.getElementById(M).textContent=b!=null?Number(b).toFixed(k):"—"};f("latestWeight",u.weight,1),f("latestTemp",u.internalTemp,1),f("latestHum",u.hiveHum,1),f("latestBat",u.batteryVoltage,2),f("latestLeg",u.legTemp,1);const w=Math.floor((Date.now()-new Date(u.timestamp))/1e3);document.getElementById("lastReading").textContent=w<60?`${w}s ago`:w<3600?`${Math.floor(w/60)}m ago`:`${Math.floor(w/3600)}h ago`,document.getElementById("dataPoints").textContent=`${v.length} pts`}const r=(u,f)=>({x:new Date(u.timestamp),y:u[f]});a.data.datasets[0].data=v.map(u=>r(u,"weight")),o.data.datasets[0].data=v.map(u=>r(u,"internalTemp")),o.data.datasets[1].data=v.map(u=>r(u,"legTemp")),l.data.datasets[0].data=v.map(u=>r(u,"hiveHum")),l.data.datasets[1].data=v.map(u=>r(u,"batteryVoltage")),a.update("none"),o.update("none"),l.update("none")}catch(m){const v=document.getElementById("errorBanner");v.textContent=`Failed to load sensor data: ${m.message}`,v.classList.remove("hidden")}}d();const c=setInterval(d,5*60*1e3);return document.getElementById("timeRange").addEventListener("change",d),document.getElementById("refreshBtn").addEventListener("click",d),()=>{clearInterval(c),a.destroy(),o.destroy(),l.destroy()}}function ae(e,s=3e3){const t=document.getElementById("toast");t&&t.remove();const n=document.createElement("div");n.id="toast",n.className="fixed top-20 left-1/2 -translate-x-1/2 z-[100] px-6 py-3 rounded-full text-sm font-medium animate-in",n.style.cssText="background:var(--hive-gold);color:#0B0D0E;box-shadow:0 4px 20px rgba(212,175,55,0.3)",n.textContent=e,document.body.appendChild(n),setTimeout(()=>{n.style.opacity="0",setTimeout(()=>n.remove(),300)},s)}const Pt=["Varroa mites","Nosema","Chalkbrood","Stonebrood","American Foulbrood","European Foulbrood"],Ft=["Waxmoth","Mice","Ants","Wasps","Small Hive Beetle","Hornets"],Ot=["","Compact","Spotty","Patchy","Drone-heavy","None visible"];async function zt(e){const t=new URLSearchParams(window.location.hash.split("?")[1]||"").get("hive")||"",i=Y().filter(r=>r.status==="Active").map(r=>r.hiveName);e.innerHTML=`
    ${S("New Inspection",!0)}
    <main class="max-w-3xl mx-auto p-5 pb-8">
      <form id="inspectionForm" class="space-y-5">
        <section class="card p-5">
          <label class="section-subtitle block mb-2">Hive</label>
          <select id="hiveSelect" class="input-field" required>
            <option value="">Select hive...</option>
            ${i.map(r=>`<option value="${r}" ${r===t?"selected":""}>${r}</option>`).join("")}
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
              ${Ot.map(r=>`<option value="${r}">${r||"Not assessed"}</option>`).join("")}
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
          ${se("diseases","Diseases",`<div class="grid grid-cols-2 gap-2 pb-2">${Pt.map(r=>`<label class="flex items-center gap-2 cursor-pointer"><input type="checkbox" data-disease="${r}" class="w-3.5 h-3.5 rounded accent-[var(--hive-red)]"><span class="text-sm text-hive-text">${r}</span></label>`).join("")}</div>`)}
          ${se("pests","Pests",`<div class="grid grid-cols-2 gap-2 pb-2">${Ft.map(r=>`<label class="flex items-center gap-2 cursor-pointer"><input type="checkbox" data-pest="${r}" class="w-3.5 h-3.5 rounded accent-[var(--hive-red)]"><span class="text-sm text-hive-text">${r}</span></label>`).join("")}</div>`)}
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
  `,_e(e);const a={queenSeen:!1,broodSpotted:!1,queenCells:!1};document.querySelectorAll("[data-health]").forEach(r=>{r.addEventListener("change",()=>{a[r.dataset.health]=r.checked})});let o="";document.querySelectorAll(".temperament-pill").forEach(r=>{r.addEventListener("click",()=>{o=r.dataset.temperament,document.querySelectorAll(".temperament-pill").forEach(u=>u.className="temperament-pill btn-secondary flex-1 py-2 text-xs"),r.className="temperament-pill btn-primary flex-1 py-2 text-xs"})});const l=document.getElementById("strengthSlider"),d=document.getElementById("strengthValue");l.addEventListener("input",()=>{d.textContent=l.value+"%"});const c=document.getElementById("weightLeft"),p=document.getElementById("weightRight"),g=document.getElementById("weightTotal"),m=()=>{const r=parseFloat(c.value)||0,u=parseFloat(p.value)||0;(r>0||u>0)&&(g.value=(r+u).toFixed(2))};c.addEventListener("input",m),p.addEventListener("input",m),document.getElementById("fetchWeightBtn").addEventListener("click",()=>ae("IoT weight fetch not yet connected"));async function v(){const r=document.getElementById("weatherStatus");try{r.textContent="Fetching...";const u=await je(R.lat,R.lng);document.getElementById("weatherConditions").value=u.conditions,document.getElementById("weatherTemp").value=u.temp,r.innerHTML='<span style="color:var(--hive-sage)">&#9679;</span> Auto-filled: '+u.temp+"°C "+u.conditions+" ("+u.humidity+"% humidity, "+u.windSpeed+" km/h wind)"}catch{r.textContent="Could not fetch weather."}}v(),document.getElementById("refreshWeatherBtn").addEventListener("click",v),document.getElementById("inspectionForm").addEventListener("submit",r=>{r.preventDefault();const u=document.getElementById("hiveSelect").value;if(!u){ae("Please select a hive");return}const f=[];document.querySelectorAll("[data-disease]:checked").forEach(b=>f.push(b.dataset.disease));const w=[];document.querySelectorAll("[data-pest]:checked").forEach(b=>w.push(b.dataset.pest));const M={date:new Date().toISOString().slice(0,10),type:"Inspection",hive:u,strength:parseInt(l.value,10),queenSeen:a.queenSeen,broodSpotted:a.broodSpotted,queenCells:a.queenCells,temperament:o,broodPattern:document.getElementById("broodPattern").value,weightLeft:parseFloat(c.value)||null,weightRight:parseFloat(p.value)||null,weightTotal:parseFloat(g.value)||null,diseases:f,pests:w,notes:document.getElementById("notes").value,weatherTemp:parseFloat(document.getElementById("weatherTemp").value)||null,weatherConditions:document.getElementById("weatherConditions").value||null};at(M),ae("Inspection saved for "+u),setTimeout(()=>{window.location.hash="#/apiary"},1500)})}function Wt(e){const s=Y(),t=s.filter(i=>i.type==="Hive"&&i.status==="Active"),n=s.filter(i=>i.type==="Nuc"&&i.status==="Active");e.innerHTML=`
    ${S("Admin",!0)}

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
            <span class="text-sm font-medium">${R.name}</span>
          </div>
          <div class="flex justify-between items-center">
            <span class="text-sm text-hive-muted">Location</span>
            <span class="text-sm font-medium">${R.location}</span>
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
          ${s.map(i=>`
            <div class="card-surface flex items-center justify-between">
              <div class="flex items-center gap-3">
                <div class="w-12 h-14 rounded-lg overflow-hidden flex items-center justify-center" style="background: linear-gradient(135deg, ${i.color}15, ${i.color}05)">
                  ${qe(i.components,i.color)}
                </div>
                <div>
                  <div class="text-sm font-medium">${i.hiveName}</div>
                  <div class="flex items-center gap-2 mt-0.5">
                    <span class="text-xs text-hive-muted">${i.beeType}</span>
                    ${i.hiveStyle?`<span class="text-xs text-hive-muted">${i.hiveStyle}</span>`:""}
                    <span class="text-xs ${i.status==="Active"?"text-hive-green":"text-hive-muted"}">${i.status}</span>
                  </div>
                </div>
              </div>
              <div class="flex items-center gap-2">
                <div class="text-sm font-bold ${i.strength>=80?"text-hive-green":i.strength>=50?"text-hive-amber":"text-hive-red"}">${i.strength}%</div>
                <a href="#/hive-form/${i.id}" class="p-1.5 text-hive-muted hover:text-hive-amber transition-colors" title="Edit">
                  <svg class="w-4 h-4" fill="none" stroke="currentColor" viewBox="0 0 24 24"><path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M11 5H6a2 2 0 00-2 2v11a2 2 0 002 2h11a2 2 0 002-2v-5m-1.414-9.414a2 2 0 112.828 2.828L11.828 15H9v-2.828l8.586-8.586z"/></svg>
                </a>
                <a href="#/build/${i.id}" class="p-1.5 text-hive-muted hover:text-hive-amber transition-colors" title="Build">
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
  `}function Vt(e){const s=Ct();e.innerHTML=`
    ${S("Device Health",!0)}

    <main class="max-w-6xl mx-auto p-4 pb-8 space-y-6">

      <!-- Summary Cards -->
      <section class="grid grid-cols-3 gap-3">
        <div class="card-surface text-center">
          <div class="text-2xl font-bold text-hive-green">${s.filter(t=>t.status==="Online").length}</div>
          <div class="text-xs text-hive-muted mt-1">Online</div>
        </div>
        <div class="card-surface text-center">
          <div class="text-2xl font-bold text-hive-red">${s.filter(t=>t.status==="Offline").length}</div>
          <div class="text-xs text-hive-muted mt-1">Offline</div>
        </div>
        <div class="card-surface text-center">
          <div class="text-2xl font-bold text-hive-text">${s.length}</div>
          <div class="text-xs text-hive-muted mt-1">Total</div>
        </div>
      </section>

      <!-- Device List -->
      <section class="space-y-3">
        ${s.map(t=>`
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
                  <div class="font-semibold text-hive-text">${te(t.lastSeen)}</div>
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
                  <div class="font-semibold text-hive-text">${te(t.lastSeen)}</div>
                </div>
              `}
            </div>
          </div>
        `).join("")}
      </section>

    </main>
  `}function Ut(e,s){const t=s.id;let n=D(t);if(!n){e.innerHTML=`${S("Not Found",!0)}<div class="max-w-6xl mx-auto p-4 text-center py-16"><p class="text-hive-muted">Hive not found</p><a href="#/apiary" class="btn-primary inline-block mt-4">Back</a></div>`;return}function i(){n=D(t),e.innerHTML=`
      ${S("Build "+n.hiveName,!0,!1,"#/hive/"+encodeURIComponent(n.hiveName))}
      <main class="max-w-6xl mx-auto p-4 pb-8">

        <!-- Visual Hive -->
        <section class="flex justify-center py-8 rounded-2xl mb-6" style="background: var(--hive-surface)">
          ${pe(n.components||[],{size:"lg",interactive:!0,hiveId:n.id})}
        </section>

        <!-- Component Picker -->
        <section class="card-surface mb-6">
          <h3 class="section-subtitle mb-4">Add Component</h3>
          <div class="space-y-2">
            ${le.filter(o=>{const l=n.type==="Nuc";return o.nuc===l}).map(o=>`
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
            ${(n.components||[]).map((o,l)=>{const d=le.find(p=>p.id===o.type);if(!d)return"";const c=(n.components||[]).length;return`
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
    `,e.querySelectorAll("[data-add-type]").forEach(o=>{o.addEventListener("click",()=>{ut(t,o.dataset.addType),i()})}),e.querySelectorAll("[data-remove-idx]").forEach(o=>{o.addEventListener("click",()=>{xe(t,parseInt(o.dataset.removeIdx,10)),i()})}),e.querySelectorAll("[data-move-up]").forEach(o=>{o.addEventListener("click",()=>{const l=parseInt(o.dataset.moveUp,10);fe(t,l,l-1),i()})}),e.querySelectorAll("[data-move-down]").forEach(o=>{o.addEventListener("click",()=>{const l=parseInt(o.dataset.moveDown,10);fe(t,l,l+1),i()})})}i();const a=o=>{o.detail.hiveId===t&&(xe(t,o.detail.index),i())};return document.addEventListener("hive-remove-component",a),()=>document.removeEventListener("hive-remove-component",a)}function Yt(e,s){var l;const t=s.id,n=t&&t!=="new",a=(n?D(t):null)||{hiveName:"",type:"Hive",hiveStyle:"National",beeType:"Buckfast",strength:100,color:"#f59e0b",queenMarked:!1,queenColor:null,queenYear:new Date().getFullYear(),components:[{type:"roof"},{type:"deep-box"},{type:"stand"}]};e.innerHTML=`
    ${S(n?"Edit "+a.hiveName:"Add New Hive",!0,!1,n?"#/hive/"+encodeURIComponent(a.hiveName):"#/admin")}

    <main class="max-w-6xl mx-auto p-4 pb-8">
      <form id="hiveForm" class="space-y-6">

        <!-- Visual Preview -->
        <section class="flex justify-center py-6 rounded-2xl" style="background: var(--hive-surface)">
          ${pe(a.components,{size:"md"})}
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
              ${lt.map(d=>`<option value="${d}" ${a.hiveStyle===d?"selected":""}>${d}</option>`).join("")}
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
                ${ot.map(d=>`<option value="${d}" ${a.beeType===d?"selected":""}>${d}</option>`).join("")}
              </select>
            </div>
            <div>
              <label class="block text-xs text-hive-muted mb-1">Source</label>
              <select id="queenSource" class="input-field">
                ${rt.map(d=>`<option value="${d}" ${a.queenSource===d?"selected":""}>${d}</option>`).join("")}
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
                ${dt.map(d=>`<option value="${d}" ${a.queenColor===d?"selected":""}>${d}</option>`).join("")}
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
  `;const o=document.getElementById("strengthSlider");o.addEventListener("input",()=>{document.getElementById("strengthVal").textContent=o.value+"%"}),document.getElementById("hiveForm").addEventListener("submit",d=>{d.preventDefault();const c={hiveName:document.getElementById("hiveName").value.trim(),type:document.getElementById("hiveType").value,hiveStyle:document.getElementById("hiveStyle").value,beeType:document.getElementById("beeType").value,color:a.color||"#f59e0b",strength:parseInt(o.value,10),queenYear:parseInt(document.getElementById("queenYear").value,10)||null,queenMarked:document.getElementById("queenMarked").value==="true",queenColor:document.getElementById("queenColor").value||null,queenClipped:document.getElementById("queenClipped").value==="true",queenSource:document.getElementById("queenSource").value||"Unknown",queenAddedDate:document.getElementById("queenAddedDate").value||null,queenNotes:document.getElementById("queenNotes").value.trim(),orientation:"vertical"};if(n)ie(t,c),window.location.hash="#/hive/"+encodeURIComponent(c.hiveName);else{c.components=[{type:"roof"},{type:"deep-box"},{type:"stand"}];const p=Le(c);window.location.hash="#/build/"+p.id}}),n&&((l=document.getElementById("deleteBtn"))==null||l.addEventListener("click",()=>{confirm(`Delete "${a.hiveName}"? This cannot be undone.`)&&(ct(t),window.location.hash="#/apiary")}))}function Gt(e){function s(){var n;const t=He(!0);e.innerHTML=`
      ${S("Tasks",!0)}
      <main class="max-w-6xl mx-auto p-5 space-y-4">
        <div class="flex items-center justify-between mb-2">
          <h2 class="section-title">${t.length} Tasks</h2>
          <button id="addTaskBtn" class="btn-primary text-xs py-2 px-4">+ Add Task</button>
        </div>
        <div class="space-y-2">
          ${t.map(i=>`
            <div class="card flex items-center gap-3 p-4" data-id="${i.id}">
              <input type="checkbox" ${i.done?"checked":""} class="w-4 h-4 rounded accent-[var(--hive-gold)] toggle-task" data-tid="${i.id}">
              <div class="flex-1 min-w-0">
                <span class="text-sm ${i.done?"line-through text-hive-muted":"text-hive-text"}">${i.text}</span>
                <span class="text-[10px] uppercase tracking-wider block mt-0.5 ${i.done?"text-hive-muted":"text-hive-gold"}">${i.due?te(i.due):""}</span>
              </div>
              <button class="text-hive-muted hover:text-hive-red delete-task p-1" data-tid="${i.id}" title="Delete">
                <svg class="w-4 h-4" fill="none" stroke="currentColor" stroke-width="1.25" viewBox="0 0 24 24"><path stroke-linecap="round" stroke-linejoin="round" d="M19 7l-.867 12.142A2 2 0 0116.138 21H7.862a2 2 0 01-1.995-1.858L5 7m5 4v6m4-6v6m1-10V4a1 1 0 00-1-1h-4a1 1 0 00-1 1v3M4 7h16"/></svg>
              </button>
            </div>
          `).join("")}
          ${t.length===0?'<p class="text-hive-muted text-sm text-center py-8">No tasks yet.</p>':""}
        </div>
      </main>
    `,e.querySelectorAll(".toggle-task").forEach(i=>{i.addEventListener("change",()=>{Te(i.dataset.tid),s()})}),e.querySelectorAll(".delete-task").forEach(i=>{i.addEventListener("click",()=>{St(i.dataset.tid),s()})}),(n=document.getElementById("addTaskBtn"))==null||n.addEventListener("click",()=>{const i=prompt("New task:");if(!i)return;const a=prompt("Due date (YYYY-MM-DD, optional):")||"";Et(i,a||null),s()})}s()}function Qt(e){function s(){var c,p,g,m,v;const t=Ne(!1);e.innerHTML=`
      ${S("Notes",!0)}
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
    `,e.querySelectorAll(".pin-note").forEach(r=>{r.addEventListener("click",()=>{bt(r.dataset.nid),s()})}),e.querySelectorAll(".delete-note").forEach(r=>{r.addEventListener("click",()=>{yt(r.dataset.nid),s()})});const n=document.getElementById("noteModal"),i=document.getElementById("noteModalTitle"),a=document.getElementById("noteModalText");let o=null;const l=(r,u,f)=>{i.textContent=r,a.value=u,o=f,n==null||n.classList.remove("hidden"),setTimeout(()=>a.focus(),100)},d=()=>{n==null||n.classList.add("hidden"),o=null};(c=document.getElementById("addNoteBtn"))==null||c.addEventListener("click",()=>l("New Note","",null)),e.querySelectorAll(".edit-note").forEach(r=>{r.addEventListener("click",()=>l("Edit Note",r.dataset.ntext,r.dataset.nid))}),(p=document.getElementById("noteModalBackdrop"))==null||p.addEventListener("click",d),(g=document.getElementById("noteModalClose"))==null||g.addEventListener("click",d),(m=document.getElementById("noteModalCancel"))==null||m.addEventListener("click",d),(v=document.getElementById("noteModalSave"))==null||v.addEventListener("click",()=>{const r=a==null?void 0:a.value.trim();r&&(o?wt(o,r):kt(r),s())})}s()}function Jt(e){const t=new URLSearchParams(window.location.hash.split("?")[1]||"").get("date")||"";let n=Me().filter(a=>a.type==="Inspection");t&&(n=n.filter(a=>a.date===t));const i=t?`Inspections — ${new Date(t).toLocaleDateString("en-GB",{day:"numeric",month:"long",year:"numeric"})}`:"All Inspections";e.innerHTML=`
    ${S(i,!0)}
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
  `}const Zt=["Varroa mites","Nosema","Chalkbrood","Stonebrood","American Foulbrood","European Foulbrood"],Kt=["Waxmoth","Mice","Ants","Wasps","Small Hive Beetle","Hornets"],Xt=["","Compact","Spotty","Patchy","Drone-heavy","None visible"];function es(e,s){var _;const t=s.id,n=new URLSearchParams(window.location.hash.split("?")[1]||""),i=n.get("from")||"",a=n.get("date")||"",o=[...Me(),...Ie()],l=o.find(x=>x.id===t)||o[parseInt(t,10)];if(!l){e.innerHTML=`
      ${S("Not Found",!0)}
      <div class="max-w-6xl mx-auto p-4 text-center py-16">
        <div class="text-5xl mb-4">🔍</div>
        <p class="text-hive-muted text-lg">Inspection not found</p>
        <a href="#/inspections" class="btn-primary inline-block mt-4">Back to Inspections</a>
      </div>`;return}let d="#/inspections";i==="inspections"&&a?d=`#/inspections?date=${a}`:i&&i!=="inspections"&&(d=`#/hive/${encodeURIComponent(i)}`);const c=(l.strength||0)>=80?"var(--hive-sage)":(l.strength||0)>=50?"var(--hive-gold)":"var(--hive-red)";e.innerHTML=`
    ${S(l.hive,!0,!1,d)}
    <main class="max-w-3xl mx-auto p-5 pb-8 space-y-5">

      <!-- Header card with date + padlock -->
      <div class="card-surface">
        <div class="flex items-center justify-between">
          <div class="flex items-center gap-2 flex-wrap">
            <span class="pill-amber">${l.type||"Inspection"}</span>
            <input type="date" id="inspDate" class="text-sm px-2 py-1 rounded-lg" style="background:var(--hive-bg);border:1px solid var(--hive-border);color:var(--hive-text)" value="${l.date}" disabled>
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
            ${Xt.map(x=>`<option value="${x}" ${l.broodPattern===x?"selected":""}>${x||"Not assessed"}</option>`).join("")}
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
        ${se("diseases","Diseases",`<div class="grid grid-cols-2 gap-2 pb-2">${Zt.map(x=>`<label class="flex items-center gap-2"><input type="checkbox" data-disease="${x}" class="w-3.5 h-3.5 rounded accent-[var(--hive-red)]" ${(l.diseases||[]).includes(x)?"checked":""} disabled><span class="text-sm text-hive-text">${x}</span></label>`).join("")}</div>`)}
        ${se("pests","Pests",`<div class="grid grid-cols-2 gap-2 pb-2">${Kt.map(x=>`<label class="flex items-center gap-2"><input type="checkbox" data-pest="${x}" class="w-3.5 h-3.5 rounded accent-[var(--hive-red)]" ${(l.pests||[]).includes(x)?"checked":""} disabled><span class="text-sm text-hive-text">${x}</span></label>`).join("")}</div>`)}
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
  `,_e(e);let p=!0;const g=document.getElementById("lockToggle"),m=document.getElementById("lockIcon"),v=document.getElementById("lockLabel"),r=document.getElementById("saveBar"),u=e.querySelectorAll("input, textarea, select"),f=e.querySelectorAll(".temperament-pill");g.addEventListener("click",()=>{p=!p,u.forEach(x=>{x.id!=="weightTotal"&&(x.disabled=p)}),f.forEach(x=>x.disabled=p),p?(m.innerHTML='<path stroke-linecap="round" stroke-linejoin="round" d="M16.5 10.5V6.75a4.5 4.5 0 10-9 0v3.75m-.75 11.25h10.5a2.25 2.25 0 002.25-2.25v-6.75a2.25 2.25 0 00-2.25-2.25H6.75a2.25 2.25 0 00-2.25 2.25v6.75a2.25 2.25 0 002.25 2.25z"/>',v.textContent="Locked",g.style.color="var(--hive-muted)",r.classList.add("hidden")):(m.innerHTML='<path stroke-linecap="round" stroke-linejoin="round" d="M13.5 10.5V6.75a4.5 4.5 0 119 0v3.75M3.75 21.75h10.5a2.25 2.25 0 002.25-2.25v-6.75a2.25 2.25 0 00-2.25-2.25H3.75a2.25 2.25 0 00-2.25 2.25v6.75a2.25 2.25 0 002.25 2.25z"/>',v.textContent="Editing",g.style.color="var(--hive-gold)",r.classList.remove("hidden"))});const w=document.getElementById("strengthSlider"),M=document.getElementById("strengthValue");w.addEventListener("input",()=>{M.textContent=w.value+"%"}),f.forEach(x=>{x.addEventListener("click",()=>{p||(f.forEach(C=>C.className="temperament-pill btn-secondary flex-1 py-2 text-xs"),x.className="temperament-pill btn-primary flex-1 py-2 text-xs")})});const b=document.getElementById("weightLeft"),k=document.getElementById("weightRight"),E=document.getElementById("weightTotal"),T=()=>{const x=parseFloat(b.value)||0,C=parseFloat(k.value)||0;(x>0||C>0)&&(E.value=(x+C).toFixed(2))};b.addEventListener("input",T),k.addEventListener("input",T),(_=document.getElementById("saveBtn"))==null||_.addEventListener("click",()=>{const x=document.createElement("div");x.className="fixed top-20 left-1/2 -translate-x-1/2 z-[100] px-6 py-3 rounded-full text-sm font-medium animate-in",x.style.cssText="background:var(--hive-gold);color:#0B0D0E;box-shadow:0 4px 20px rgba(212,175,55,0.3)",x.textContent="Inspection updated",document.body.appendChild(x),setTimeout(()=>{x.style.opacity="0",setTimeout(()=>x.remove(),300)},2500)})}We();Ge();N("#/login",Mt);N("#/apiary",Dt);N("#/hive/:id",ee);N("#/apiary-dashboard",Rt);N("#/inspect",zt);N("#/admin",Wt);N("#/devices",Vt);N("#/build/:id",Ut);N("#/hive-form/:id",Yt);N("#/tasks",Gt);N("#/notes",Qt);N("#/inspections",Jt);N("#/inspection/:id",es);window.addEventListener("hashchange",()=>setTimeout(Ce,50));Je().then(()=>{ze("#/login"),setTimeout(Ce,100)});
