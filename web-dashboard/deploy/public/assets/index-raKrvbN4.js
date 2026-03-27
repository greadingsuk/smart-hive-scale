const __vite__mapDeps=(i,m=__vite__mapDeps,d=(m.f||(m.f=["assets/chartjs-adapter-date-fns.esm-CV7ru7NP.js","assets/chart-19k6OvwP.js"])))=>i.map(i=>d[i]);
(function(){const i=document.createElement("link").relList;if(i&&i.supports&&i.supports("modulepreload"))return;for(const s of document.querySelectorAll('link[rel="modulepreload"]'))n(s);new MutationObserver(s=>{for(const a of s)if(a.type==="childList")for(const o of a.addedNodes)o.tagName==="LINK"&&o.rel==="modulepreload"&&n(o)}).observe(document,{childList:!0,subtree:!0});function t(s){const a={};return s.integrity&&(a.integrity=s.integrity),s.referrerPolicy&&(a.referrerPolicy=s.referrerPolicy),s.crossOrigin==="use-credentials"?a.credentials="include":s.crossOrigin==="anonymous"?a.credentials="omit":a.credentials="same-origin",a}function n(s){if(s.ep)return;s.ep=!0;const a=t(s);fetch(s.href,a)}})();const Se={};let J=null;function T(e,i){Se[e]=i}function ze(e="#/login"){async function i(){const t=window.location.hash||e,n=sessionStorage.getItem("hive_user");if(!n&&t!=="#/login"){window.location.hash="#/login";return}if(n&&t==="#/login"){window.location.hash="#/apiary";return}let s=null,a={};const o=t.split("?")[0];for(const[l,u]of Object.entries(Se)){const r=l.split("/"),p=o.split("/");if(r.length!==p.length)continue;let c=!0;const h={};for(let v=0;v<r.length;v++)if(r[v].startsWith(":"))h[r[v].slice(1)]=decodeURIComponent(p[v]);else if(r[v]!==p[v]){c=!1;break}if(c){s=u,a=h;break}}if(s){J&&(J(),J=null);const l=document.getElementById("app"),u=await s(l,a);typeof u=="function"&&(J=u)}}window.addEventListener("hashchange",i),i()}const Ee="apiary_theme";function Oe(){localStorage.getItem(Ee)==="light"&&document.documentElement.classList.add("light"),ce()}function Ve(){document.documentElement.classList.toggle("light");const e=document.documentElement.classList.contains("light");localStorage.setItem(Ee,e?"light":"dark"),ce()}function ce(){const e=document.documentElement.classList.contains("light");document.querySelectorAll(".theme-icon-dark").forEach(i=>i.classList.toggle("hidden",e)),document.querySelectorAll(".theme-icon-light").forEach(i=>i.classList.toggle("hidden",!e)),document.querySelectorAll(".theme-knob").forEach(i=>{i.style.left=e?"14px":"2px"})}function Ce(){document.querySelectorAll("#themeToggle").forEach(e=>{const i=e.cloneNode(!0);e.parentNode.replaceChild(i,e),i.addEventListener("click",()=>{Ve()})}),ce()}function Z(e,i,t){const n=[];for(let s=0;s<6;s++){const a=Math.PI/3*s-Math.PI/6;n.push(`${e+t*Math.cos(a)},${i+t*Math.sin(a)}`)}return`M${n.join("L")}Z`}function We(){const a=[];for(let o=0;o<5;o++){const l=o%2===0?4:3;for(let u=0;u<l;u++){const r=u*140.4+(o%2===0?0:105.30000000000001)+78,p=650-o*156*.5-78,c=Math.sqrt(r*r+(650-p)*(650-p))/Math.sqrt(750*750+650*650),h=Math.max(0,1-c*2);h>.05&&a.push({x:r,y:p,opacity:h})}}return Be(750,650,a,78,"bl")}function Ue(){const a=[];for(let o=0;o<4;o++)for(let u=0;u<3;u++){const r=600-u*144-80,p=o*160*.5+80,c=Math.sqrt((600-r)*(600-r)+p*p)/Math.sqrt(600*600+500*500),h=Math.max(0,1-c*2.2);h>.05&&a.push({x:r,y:p,opacity:h})}return Be(600,500,a,80,"tr")}function Be(e,i,t,n,s){const a=document.documentElement.classList.contains("light"),o="http://www.w3.org/2000/svg",l=document.createElementNS(o,"svg");l.setAttribute("width","100%"),l.setAttribute("height","100%"),l.setAttribute("viewBox",`0 0 ${e} ${i}`),l.setAttribute("preserveAspectRatio","none");const u=document.createElementNS(o,"defs"),r=document.createElementNS(o,"filter");r.setAttribute("id",`emboss-${s}`),r.setAttribute("x","-20%"),r.setAttribute("y","-20%"),r.setAttribute("width","140%"),r.setAttribute("height","140%");const p=document.createElementNS(o,"feGaussianBlur");p.setAttribute("in","SourceAlpha"),p.setAttribute("stdDeviation","3"),p.setAttribute("result","blur");const c=document.createElementNS(o,"feDiffuseLighting");c.setAttribute("in","blur"),c.setAttribute("surfaceScale","6"),c.setAttribute("diffuseConstant","0.7"),c.setAttribute("result","diffuse"),c.setAttribute("lighting-color",a?"#c8b890":"#4a6a8a");const h=document.createElementNS(o,"feDistantLight");h.setAttribute("azimuth","315"),h.setAttribute("elevation","25"),c.appendChild(h);const v=document.createElementNS(o,"feSpecularLighting");v.setAttribute("in","blur"),v.setAttribute("surfaceScale","5"),v.setAttribute("specularConstant","0.4"),v.setAttribute("specularExponent","20"),v.setAttribute("result","specular"),v.setAttribute("lighting-color",a?"#e8dcc0":"#8ab4d8");const x=document.createElementNS(o,"feDistantLight");x.setAttribute("azimuth","315"),x.setAttribute("elevation","30"),v.appendChild(x);const d=document.createElementNS(o,"feComposite");d.setAttribute("in","specular"),d.setAttribute("in2","diffuse"),d.setAttribute("operator","arithmetic"),d.setAttribute("k1","0"),d.setAttribute("k2","1"),d.setAttribute("k3","1"),d.setAttribute("k4","0"),d.setAttribute("result","lit");const m=document.createElementNS(o,"feComposite");m.setAttribute("in","lit"),m.setAttribute("in2","SourceAlpha"),m.setAttribute("operator","in"),m.setAttribute("result","clipped");const y=document.createElementNS(o,"feMerge"),S=document.createElementNS(o,"feMergeNode");S.setAttribute("in","clipped");const b=document.createElementNS(o,"feMergeNode");b.setAttribute("in","SourceGraphic"),y.appendChild(S),y.appendChild(b),r.appendChild(p),r.appendChild(c),r.appendChild(v),r.appendChild(d),r.appendChild(m),r.appendChild(y),u.appendChild(r);const w=document.createElementNS(o,"filter");w.setAttribute("id",`shadow-${s}`),w.setAttribute("x","-30%"),w.setAttribute("y","-30%"),w.setAttribute("width","160%"),w.setAttribute("height","160%");const k=document.createElementNS(o,"feDropShadow");return k.setAttribute("dx","4"),k.setAttribute("dy","6"),k.setAttribute("stdDeviation","8"),k.setAttribute("flood-color",a?"rgba(0,0,0,0.15)":"rgba(0,0,0,0.5)"),w.appendChild(k),u.appendChild(w),l.appendChild(u),t.forEach(({x:A,y:C,opacity:f})=>{const E=document.createElementNS(o,"g");E.setAttribute("opacity",String(f));const P=document.createElementNS(o,"path");P.setAttribute("d",Z(A,C,n*.92)),P.setAttribute("fill",a?"rgba(180,165,140,0.3)":"rgba(8,16,28,0.7)"),P.setAttribute("filter",`url(#shadow-${s})`),E.appendChild(P);const F=document.createElementNS(o,"path");F.setAttribute("d",Z(A,C,n*.92)),F.setAttribute("fill",a?"rgba(215,205,185,0.6)":"rgba(14,28,48,0.85)"),F.setAttribute("filter",`url(#emboss-${s})`),E.appendChild(F);const j=document.createElementNS(o,"path");j.setAttribute("d",Z(A,C,n*.92)),j.setAttribute("fill","none"),j.setAttribute("stroke",a?"rgba(255,255,255,0.4)":"rgba(255,255,255,0.06)"),j.setAttribute("stroke-width","1.5"),E.appendChild(j);const g=document.createElementNS(o,"path");g.setAttribute("d",Z(A,C,n*.95)),g.setAttribute("fill","none"),g.setAttribute("stroke",a?"rgba(160,145,120,0.2)":"rgba(255,255,255,0.04)"),g.setAttribute("stroke-width","0.8"),E.appendChild(g),l.appendChild(E)}),l}function Ye(){he(),new MutationObserver(()=>{document.querySelectorAll(".hex-corner-svg").forEach(i=>i.remove()),he()}).observe(document.documentElement,{attributes:!0,attributeFilter:["class"]})}function he(){const e=document.createElement("div");e.className="hex-corner-svg hex-corner-svg--bl",e.setAttribute("aria-hidden","true"),e.appendChild(We()),document.body.insertBefore(e,document.body.firstChild);const i=document.createElement("div");i.className="hex-corner-svg hex-corner-svg--tr",i.setAttribute("aria-hidden","true"),i.appendChild(Ue()),document.body.insertBefore(i,document.body.firstChild)}const Qe="https://prod-25.ukwest.logic.azure.com:443/workflows/2a2177c3c7174e0cbd8fa0392b36fd17/triggers/manual/paths/invoke?api-version=2019-05-01&sp=%2Ftriggers%2Fmanual%2Frun&sv=1.0&sig=Mlt3jgZT4UQhN6-doEkU-FrAGZZWzneDHvmyBZfX8Sg",ie="https://prod-01.ukwest.logic.azure.com:443/workflows/3ee8a8759b6248d38b47c30ab29abca1/triggers/manual/paths/invoke?api-version=2019-05-01&sp=%2Ftriggers%2Fmanual%2Frun&sv=1.0&sig=6BX8eq06bY1I2fJMqMRuszsIsFTL8kDZ4yOQF66OD-c",me="https://prod-00.ukwest.logic.azure.com:443/workflows/85b5d48749124f93ab929e8aacbecdf3/triggers/manual/paths/invoke?api-version=2019-05-01&sp=%2Ftriggers%2Fmanual%2Frun&sv=1.0&sig=ygYwSYDDTVPEwpSI5ynZ-8fJQd1aLaMEDuMFooN7w24";let L=[],U=[],_=[],Q=[],ne=!1;async function Ge(){if(!ne)try{const[e,i,t,n]=await Promise.all([K("hives"),K("inspections"),K("notes"),K("tasks")]);L=e.map(Ze),U=i.map(Ke).sort((s,a)=>new Date(a.date)-new Date(s.date)),_=t.map(Xe),Q=n.map(et),ne=!0}catch(e){console.error("Failed to load from Dataverse:",e),ne=!0}}async function K(e){if(ie.includes("%%"))return console.warn(`Read flow not configured for ${e}`),[];const i=ie.includes("?")?"&":"?",t=await fetch(`${ie}${i}entity=${e}`);if(!t.ok)throw new Error(`Read ${e}: HTTP ${t.status}`);return t.json()}async function Je(e,i,t,n){if(me.includes("%%"))return console.warn("Write flow not configured"),null;const s=await fetch(me,{method:"POST",headers:{"Content-Type":"application/json"},body:JSON.stringify({entity:e,operation:i,data:t,id:n})});if(!s.ok)throw new Error(`Write ${e}/${i}: HTTP ${s.status}`);const a=await s.text();return a?JSON.parse(a):null}function B(e,i,t,n){Je(e,i,t,n).catch(s=>console.error("Async write failed:",s))}function oe(e,i){if(!e)return i;try{return JSON.parse(e)}catch{return i}}function Ze(e){return{id:e.gr_hiveid,hiveName:e.gr_name,type:e.gr_hivetype||"Hive",hiveStyle:e.gr_hivestyle||"",status:e.gr_status||"Active",strength:e.gr_strength??0,beeType:e.gr_beetype||"",color:e.gr_color||"#f59e0b",queenMarked:!!e.gr_queenmarked,queenColor:e.gr_queencolor||null,queenYear:e.gr_queenyear||null,queenClipped:!!e.gr_queenclipped,queenSource:e.gr_queensource||"",queenAddedDate:e.gr_queenaddeddate?e.gr_queenaddeddate.slice(0,10):null,queenNotes:e.gr_queennotes||"",queenImage:e.gr_queenimage||null,dateAdded:e.gr_dateadded?e.gr_dateadded.slice(0,10):new Date().toISOString().slice(0,10),orientation:e.gr_orientation||"vertical",components:oe(e.gr_components,[])}}function G(e){return{gr_name:e.hiveName,gr_hivetype:e.type,gr_hivestyle:e.hiveStyle,gr_status:e.status,gr_strength:e.strength,gr_beetype:e.beeType,gr_color:e.color,gr_queenmarked:e.queenMarked,gr_queencolor:e.queenColor,gr_queenyear:e.queenYear,gr_queenclipped:e.queenClipped,gr_queensource:e.queenSource,gr_queenaddeddate:e.queenAddedDate,gr_queennotes:e.queenNotes,gr_queenimage:e.queenImage||"",gr_components:JSON.stringify(e.components||[]),gr_dateadded:e.dateAdded,gr_orientation:e.orientation}}function Ke(e){return{id:e.gr_inspectionid||e.gr_name,date:e.gr_activitydate?e.gr_activitydate.slice(0,10):"",type:e.gr_activitytype||"Inspection",hive:e.gr_hivename||"",strength:e.gr_strength,queenSeen:!!e.gr_queenseen,broodSpotted:!!e.gr_broodspotted,queenCells:!!e.gr_queencells,temperament:e.gr_temperament||"",broodPattern:e.gr_broodpattern||"",weightLeft:e.gr_weightleft,weightRight:e.gr_weightright,weightTotal:e.gr_weighttotal,diseases:oe(e.gr_diseases,[]),pests:oe(e.gr_pests,[]),notes:e.gr_notes||"",weatherTemp:e.gr_weathertemp,weatherConditions:e.gr_weatherconditions||"",_dvId:e.gr_inspectionid}}function Ae(e){return{gr_name:e.id||"insp-"+Date.now(),gr_activitydate:e.date,gr_activitytype:e.type||"Inspection",gr_hivename:e.hive,gr_strength:e.strength,gr_queenseen:e.queenSeen,gr_broodspotted:e.broodSpotted,gr_queencells:e.queenCells,gr_temperament:e.temperament,gr_broodpattern:e.broodPattern,gr_weightleft:e.weightLeft,gr_weightright:e.weightRight,gr_weighttotal:e.weightTotal,gr_diseases:JSON.stringify(e.diseases||[]),gr_pests:JSON.stringify(e.pests||[]),gr_notes:e.notes,gr_weathertemp:e.weatherTemp,gr_weatherconditions:e.weatherConditions}}function Xe(e){return{id:e.gr_noteid||e.gr_name,text:e.gr_text||"",date:e.gr_notedate?e.gr_notedate.slice(0,10):"",pinned:!!e.gr_pinned,deleted:!!e.gr_deleted,hiveId:e.gr_hiveid||null,_dvId:e.gr_noteid}}function W(e){return{gr_name:e.id||"n"+Date.now(),gr_text:e.text,gr_notedate:e.date,gr_pinned:e.pinned,gr_deleted:e.deleted,gr_hiveid:e.hiveId||""}}function et(e){return{id:e.gr_taskid||e.gr_name,text:e.gr_text||"",done:!!e.gr_done,due:e.gr_duedate?e.gr_duedate.slice(0,10):null,deleted:!!e.gr_deleted,_dvId:e.gr_taskid}}function ue(e){return{gr_name:e.id||"t"+Date.now(),gr_text:e.text,gr_done:e.done,gr_duedate:e.due,gr_deleted:e.deleted}}async function tt(){const e=await fetch(Qe);if(!e.ok)throw new Error(`Telemetry fetch failed: HTTP ${e.status}`);return(await e.json()).map(t=>({weight:t.gr_weight,internalTemp:t.gr_internaltemp,batteryVoltage:t.gr_batteryvoltage,hiveHum:t.gr_hivehum,legTemp:t.gr_legtemp,timestamp:t.gr_readingtimestamp||t.createdon})).sort((t,n)=>new Date(t.timestamp)-new Date(n.timestamp))}const R={name:"Home Apiary",location:"Kidmore End, Reading RG4 9AY, UK",lat:51.509,lng:-.975};function Ie(){return U}function st(){const e={};for(const i of U)e[i.date]||(e[i.date]=[]),e[i.date].push(i);return Object.entries(e).sort(([i],[t])=>new Date(t)-new Date(i)).map(([i,t])=>({date:i,items:t,count:t.length}))}function it(e){return U.filter(i=>i.hive===e)}function Me(){return[]}function nt(e){const i={...e,id:e.id||"insp-"+Date.now()};U.unshift(i),B("inspections","create",Ae(i))}const le=[{id:"hive-roof",name:"Roof",color:"#7a8078",height:14,category:"structure",nuc:!1},{id:"hive-floor",name:"Floor",color:"#8B8580",height:10,category:"structure",nuc:!1},{id:"hive-stand",name:"Hive Stand",color:"#A09080",height:34,category:"structure",nuc:!1},{id:"hive-stand-iot",name:"Hive Stand IOT",color:"#5B7A5E",height:38,category:"structure",nuc:!1},{id:"super",name:"Super",color:"#90968b",height:30,category:"box",nuc:!1},{id:"national-brood",name:"National Brood",color:"#90968b",height:45,category:"box",nuc:!1},{id:"14x12-brood",name:"14x12 Brood",color:"#90968b",height:63,category:"box",nuc:!1},{id:"queen-excluder",name:"Queen Excluder",color:"#BFA67A",height:6,category:"accessory",nuc:!1},{id:"hive-eke",name:"Hive Eke",color:"#A89068",height:18,category:"accessory",nuc:!1},{id:"nuc-roof",name:"Nuc Roof",color:"#7a8078",height:12,category:"structure",nuc:!0},{id:"nuc-floor",name:"Nuc Floor",color:"#8B8580",height:8,category:"structure",nuc:!0},{id:"nuc-stand",name:"Nuc Stand",color:"#A09080",height:30,category:"structure",nuc:!0},{id:"nuc-stand-iot",name:"Nuc Stand IOT",color:"#5B7A5E",height:34,category:"structure",nuc:!0},{id:"nuc-brood",name:"Nuc Brood Box",color:"#90968b",height:40,category:"box",nuc:!0},{id:"nuc-super",name:"Nuc Super",color:"#90968b",height:26,category:"box",nuc:!0},{id:"nuc-eke",name:"Nuc Eke",color:"#A89068",height:14,category:"accessory",nuc:!0}],at=["Swarm","Local","Home Bred","Buckfast","Native Black Bee","Carniolan","Italian","F1 Buckfast","Premium F1 Buckfast","UK F1 Buckfast","Premium UK F1 Buckfast","VSH Buckfast","UK Mated VSH Buckfast","Obsidian","Unknown"],ot=["National","14x12","Commercial","Langstroth","WBC","Top Bar","Poly","Other"],lt=["Bred","Purchased","Swarm","Supersedure","Emergency Cell","Gift","Split","Unknown"],rt=["Blue","White","Yellow","Red","Green","Pink"];function Y(){return L}function q(e){return L.find(i=>i.id===e)}function Le(e){return e.id=e.id||"hive-"+Date.now(),e.dateAdded=e.dateAdded||new Date().toISOString().slice(0,10),e.status=e.status||"Active",L.push(e),B("hives","create",G(e)),e}function se(e,i){const t=L.findIndex(n=>n.id===e);return t===-1?null:(L[t]={...L[t],...i},B("hives","update",G(L[t]),e),L[t])}function dt(e){L=L.filter(i=>i.id!==e),B("hives","delete",null,e)}function ct(e,i,t){const n=L.find(a=>a.id===e);if(!n)return;n.components||(n.components=[]);const s=Math.max(0,n.components.length-1);n.components.splice(s,0,{type:i}),B("hives","update",G(n),e)}function ge(e,i){const t=L.find(n=>n.id===e);!t||!t.components||(t.components.splice(i,1),B("hives","update",G(t),e))}function xe(e,i,t){const n=L.find(a=>a.id===e);if(!n||!n.components||t<0||t>=n.components.length)return;const[s]=n.components.splice(i,1);n.components.splice(t,0,s),B("hives","update",G(n),e)}function O(e){const i={...e,id:"insp-"+Date.now(),date:e.date||new Date().toISOString().slice(0,10)};U.unshift(i),B("inspections","create",Ae(i))}function ut(e,i,t){const n=q(e);if(!n)return null;const s=Le({hiveName:i,type:"Nuc",hiveStyle:n.hiveStyle,beeType:n.beeType,color:"#06b6d4",strength:50,queenMarked:!1,queenColor:null,queenYear:new Date().getFullYear(),orientation:"vertical",components:[{type:"nuc-roof"},{type:"nuc-brood"},{type:"nuc-floor"},{type:"nuc-stand"}]});return O({type:"Split",hive:n.hiveName,notes:`Split made — new nuc "${i}" created. ${t||""}`.trim(),strength:n.strength,queenSeen:!1,broodSpotted:!1}),O({type:"Split",hive:i,notes:`Split from ${n.hiveName}. ${t||""}`.trim(),strength:50,queenSeen:!1,broodSpotted:!1}),s}function vt(e,i,t){const n=q(e),s=q(i);!n||!s||(O({type:"Combined",hive:n.hiveName,notes:`Combined with ${s.hiveName}. ${t||""}`.trim(),strength:n.strength,queenSeen:!1,broodSpotted:!1}),O({type:"Combined",hive:s.hiveName,notes:`Combined into ${n.hiveName}. Hive deactivated. ${t||""}`.trim(),strength:0,queenSeen:!1,broodSpotted:!1}),se(i,{status:"Combined"}))}function pt(e,i){const t=q(e);t&&(O({type:"Hive Death",hive:t.hiveName,notes:i||"Colony died out.",strength:0,queenSeen:!1,broodSpotted:!1}),se(e,{status:"Dead",strength:0}))}function ht(e,i,t){const n=q(e);n&&O({type:"Moved",hive:n.hiveName,notes:`Moved to ${i}. ${t||""}`.trim(),strength:n.strength,queenSeen:!1,broodSpotted:!1})}const mt={"hive-roof":"nuc-roof","hive-floor":"nuc-floor","hive-stand":"nuc-stand",super:"nuc-super","national-brood":"nuc-brood","14x12-brood":"nuc-brood","hive-eke":"nuc-eke"},gt={"nuc-roof":"hive-roof","nuc-floor":"hive-floor","nuc-stand":"hive-stand","nuc-brood":"national-brood","nuc-super":"super","nuc-eke":"hive-eke"};function xt(e,i){const t=q(e);if(!t)return null;const n=t.type==="Hive",s=n?mt:gt,a=n?"Nuc":"Hive",o=(t.components||[]).map(l=>{if(n&&l.type==="queen-excluder")return null;const u=s[l.type];return u?{type:u}:l}).filter(Boolean);return O({type:"Converted",hive:t.hiveName,notes:`${n?"Downsized to Nuc":"Upgraded to Hive"}. ${i||""}`.trim(),strength:t.strength,queenSeen:!1,broodSpotted:!1}),se(e,{type:a,components:o}),q(e)}function Ne(e=!1){return _.filter(i=>e||!i.deleted)}function ft(e){const i=_.find(t=>t.id===e);i&&(i.pinned=!i.pinned,B("notes","update",W(i),i._dvId||e))}function bt(e){const i=_.find(t=>t.id===e);i&&(i.deleted=!0,B("notes","update",W(i),i._dvId||e))}function yt(e,i){const t=_.find(n=>n.id===e);t&&(t.text=i,t.date=new Date().toISOString().slice(0,10),B("notes","update",W(t),t._dvId||e))}function wt(e,i=null){const t={id:"n"+Date.now(),text:e,date:new Date().toISOString().slice(0,10),pinned:!1,deleted:!1,hiveId:i};_.unshift(t),B("notes","create",W(t))}function kt(e){return _.find(i=>i.hiveId===e&&!i.deleted)||null}function fe(e,i){const t=_.find(n=>n.hiveId===e&&!n.deleted);if(t)i?(t.text=i,t.date=new Date().toISOString().slice(0,10),t.pinned=!0):t.deleted=!0,B("notes","update",W(t),t._dvId||t.id);else if(i){const n={id:"n"+Date.now(),text:i,date:new Date().toISOString().slice(0,10),pinned:!0,deleted:!1,hiveId:e};_.unshift(n),B("notes","create",W(n))}}function He(e=!1){const i=Q.filter(t=>!t.deleted);return e?i:i.filter(t=>!t.done)}function Te(e){const i=Q.find(t=>t.id===e);i&&(i.done=!i.done,B("tasks","update",ue(i),i._dvId||e))}function $t(e){const i=Q.find(t=>t.id===e);i&&(i.deleted=!0,B("tasks","update",ue(i),i._dvId||e))}function St(e,i){const t={id:"t"+Date.now(),text:e,done:!1,due:i,deleted:!1};Q.unshift(t),B("tasks","create",ue(t))}function Et(){return[{id:"esp32-1",name:"ESP32 Hive Scale",type:"ESP32",location:"Hive 5 - Survivor",status:"Online",battery:4.1,lastSeen:"2026-03-18T09:30:00Z",firmware:"v1.0.0",ip:"192.168.1.45"},{id:"sb-inside",name:"SwitchBot Inside",type:"SwitchBot",location:"Hive 5 - Survivor (inside)",status:"Online",battery:87,lastSeen:"2026-03-18T09:25:00Z",temp:32.5,humidity:68},{id:"sb-outside",name:"SwitchBot Outside",type:"SwitchBot",location:"Apiary (ambient)",status:"Online",battery:92,lastSeen:"2026-03-18T09:28:00Z",temp:14.2,humidity:55}]}const Ct=["0e98bf2afda73d29f786212cd02fc542cb3307fea44f76f208f396b5fcd4ea98"];async function Bt(e,i){const n=new TextEncoder().encode(`${e}:${i}`),s=await crypto.subtle.digest("SHA-256",n);return Array.from(new Uint8Array(s)).map(a=>a.toString(16).padStart(2,"0")).join("")}async function At(e){e.innerHTML=`
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
  `,document.getElementById("loginForm").addEventListener("submit",async t=>{t.preventDefault();const n=document.getElementById("username").value.trim().toLowerCase(),s=document.getElementById("password").value,a=await Bt(n,s);if(Ct.includes(a))sessionStorage.setItem("hive_user",JSON.stringify({name:n.charAt(0).toUpperCase()+n.slice(1),role:"admin"})),window.location.hash="#/apiary";else{const o=document.getElementById("loginError");o.textContent="Invalid username or password",o.classList.remove("hidden")}}),document.getElementById("username").focus()}function It(e){const i=e>=80?"Strong":e>=50?"Fair":"Weak";return`<span class="inline-flex items-center gap-1.5">
    <span class="w-1.5 h-1.5 rounded-full ${e>=80?"bg-hive-sage":e>=50?"bg-hive-gold":"bg-hive-red"}"></span>
    <span class="text-[10px] font-medium uppercase tracking-wider text-hive-muted" style="font-family:'DM Sans',sans-serif;letter-spacing:0.08em">${i}</span>
  </span>`}function I(e,i=!1,t=!1,n="#/apiary"){const s=window.location.hash,a=s.startsWith("#/admin")||s.startsWith("#/devices");return`
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
          ${t?`<a href="#/admin" class="p-2 ${a?"text-hive-gold":"text-hive-muted hover:text-hive-gold"}" title="Settings">
            <svg class="w-[17px] h-[17px]" fill="none" stroke="currentColor" stroke-width="1.25" viewBox="0 0 24 24"><path stroke-linecap="round" stroke-linejoin="round" d="M10.325 4.317c.426-1.756 2.924-1.756 3.35 0a1.724 1.724 0 002.573 1.066c1.543-.94 3.31.826 2.37 2.37a1.724 1.724 0 001.066 2.573c1.756.426 1.756 2.924 0 3.35a1.724 1.724 0 00-1.066 2.573c.94 1.543-.826 3.31-2.37 2.37a1.724 1.724 0 00-2.573 1.066c-.426 1.756-2.924 1.756-3.35 0a1.724 1.724 0 00-2.573-1.066c-1.543.94-3.31-.826-2.37-2.37a1.724 1.724 0 00-1.066-2.573c-1.756-.426-1.756-2.924 0-3.35a1.724 1.724 0 001.066-2.573c-.94-1.543.826-3.31 2.37-2.37.996.608 2.296.07 2.572-1.065z"/><path stroke-linecap="round" stroke-linejoin="round" d="M15 12a3 3 0 11-6 0 3 3 0 016 0z"/></svg>
          </a>`:""}
          <button onclick="sessionStorage.removeItem('hive_user'); window.location.hash='#/login'" class="p-2 text-hive-muted hover:text-hive-red" title="Sign out">
            <svg class="w-[17px] h-[17px]" fill="none" stroke="currentColor" stroke-width="1.25" viewBox="0 0 24 24"><path stroke-linecap="round" stroke-linejoin="round" d="M17 16l4-4m0 0l-4-4m4 4H7m6 4v1a3 3 0 01-3 3H6a3 3 0 01-3-3V7a3 3 0 013-3h4a3 3 0 013 3v1"/></svg>
          </button>
        </div>
      </div>
    </header>`}function Mt(e){return`<span class="${{Inspection:"pill-amber",Feed:"pill-blue",Treatment:"pill-red",Harvest:"pill-green","Hive Added":"pill-green","Hive Death":"pill-red",Split:"pill-amber",Combined:"pill-blue",Converted:"pill-amber",Moved:"pill-blue",Note:"pill-blue"}[e]||"pill-amber"}">${e}</span>`}function te(e){const i=new Date(e),n=Math.floor((new Date-i)/864e5);return n===0?"Today":n===1?"Yesterday":n<7?`${n}d ago`:n<30?`${Math.floor(n/7)}w ago`:i.toLocaleDateString("en-GB",{day:"numeric",month:"short",year:n>365?"numeric":void 0})}function be(e,i,t,n=!1){return`<div class="border-b" style="border-color:var(--hive-border)">
    <button type="button" class="accordion-trigger" aria-expanded="${n}" data-accordion="${e}">
      <span class="text-sm font-medium text-hive-text">${i}</span>
      <svg class="chevron w-4 h-4 text-hive-muted" fill="none" stroke="currentColor" stroke-width="1.25" viewBox="0 0 24 24"><path stroke-linecap="round" stroke-linejoin="round" d="M19 9l-7 7-7-7"/></svg>
    </button>
    <div id="acc-${e}" class="accordion-content ${n?"open":""}">${t}</div>
  </div>`}function Lt(e){e.querySelectorAll(".accordion-trigger").forEach(i=>{i.addEventListener("click",()=>{var n;const t=i.getAttribute("aria-expanded")==="true";i.setAttribute("aria-expanded",String(!t)),(n=document.getElementById("acc-"+i.dataset.accordion))==null||n.classList.toggle("open")})})}const z={edit:'<svg class="w-4 h-4" fill="none" stroke="currentColor" stroke-width="1.25" viewBox="0 0 24 24"><path stroke-linecap="round" stroke-linejoin="round" d="M11 5H6a2 2 0 00-2 2v11a2 2 0 002 2h11a2 2 0 002-2v-5m-1.414-9.414a2 2 0 112.828 2.828L11.828 15H9v-2.828l8.586-8.586z"/></svg>',flask:'<svg class="w-4 h-4" fill="none" stroke="currentColor" stroke-width="1.25" viewBox="0 0 24 24"><path stroke-linecap="round" stroke-linejoin="round" d="M19.428 15.428a2 2 0 00-1.022-.547l-2.387-.477a6 6 0 00-3.86.517l-.318.158a6 6 0 01-3.86.517L6.05 15.21a2 2 0 00-1.806.547M8 4h8l-1 1v5.172a2 2 0 00.586 1.414l5 5c1.26 1.26.367 3.414-1.415 3.414H4.828c-1.782 0-2.674-2.154-1.414-3.414l5-5A2 2 0 009 10.172V5L8 4z"/></svg>',book:'<svg class="w-4 h-4" fill="none" stroke="currentColor" stroke-width="1.25" viewBox="0 0 24 24"><path stroke-linecap="round" stroke-linejoin="round" d="M12 6.253v13m0-13C10.832 5.477 9.246 5 7.5 5S4.168 5.477 3 6.253v13C4.168 18.477 5.754 18 7.5 18s3.332.477 4.5 1.253m0-13C13.168 5.477 14.754 5 16.5 5c1.747 0 3.332.477 4.5 1.253v13C19.832 18.477 18.247 18 16.5 18c-1.746 0-3.332.477-4.5 1.253"/></svg>',heart:'<svg class="w-4 h-4" fill="none" stroke="currentColor" stroke-width="1.25" viewBox="0 0 24 24"><path stroke-linecap="round" stroke-linejoin="round" d="M4.318 6.318a4.5 4.5 0 000 6.364L12 20.364l7.682-7.682a4.5 4.5 0 00-6.364-6.364L12 7.636l-1.318-1.318a4.5 4.5 0 00-6.364 0z"/></svg>',mapPin:'<svg class="w-3.5 h-3.5" fill="none" stroke="currentColor" stroke-width="1.25" viewBox="0 0 24 24"><path stroke-linecap="round" stroke-linejoin="round" d="M17.657 16.657L13.414 20.9a1.998 1.998 0 01-2.827 0l-4.244-4.243a8 8 0 1111.314 0z"/><path stroke-linecap="round" stroke-linejoin="round" d="M15 11a3 3 0 11-6 0 3 3 0 016 0z"/></svg>',thermometer:'<svg class="w-3.5 h-3.5" fill="none" stroke="currentColor" stroke-width="1.25" viewBox="0 0 24 24"><path stroke-linecap="round" stroke-linejoin="round" d="M12 9V3m0 6a3 3 0 100 6 3 3 0 000-6zm0 6v6"/></svg>',chevron:'<svg class="w-3.5 h-3.5 text-hive-muted" fill="none" stroke="currentColor" stroke-width="1.25" viewBox="0 0 24 24"><path stroke-linecap="round" stroke-linejoin="round" d="M9 5l7 7-7 7"/></svg>'},re=140,de=70;function ve(e){return le.find(i=>i.id===e)}function De(e){return e.some(i=>{const t=ve(i.type);return t&&t.nuc})}function Nt(e){return{"nuc-roof":14,"nuc-floor":10,"nuc-stand":34,"nuc-stand-iot":38,"nuc-brood":45,"nuc-super":30,"nuc-eke":18}[e.id]||e.height}function pe(e=[],i={}){const{size:t="md",interactive:n=!1,hiveId:s=""}=i,a=t==="sm"?.5:t==="lg"?1.2:.8,o=De(e),l=Math.round((o?de:re)*a),u=Math.round((o?de+40:re+40)*a);if(!e.length)return`<div class="flex flex-col items-center" style="width:${u}px">
      <div class="text-gray-600 text-xs text-center py-4">No components</div>
    </div>`;let r=`<div class="flex flex-col items-center" style="width:${u}px">`;return e.forEach((p,c)=>{const h=ve(p.type);if(!h)return;const v=Math.round(h.height*a),x=h.id.includes("roof"),d=h.id.includes("stand-iot"),m=!d&&h.id.includes("stand"),y=h.id.includes("floor"),S=h.category==="accessory";if(x)r+=`<div class="relative" style="width:${l+Math.round(8*a)}px; height:${v}px">
        <div class="absolute inset-0 rounded-t-md" style="background:${h.color}"></div>
        <div class="absolute bottom-0 left-0.5 right-0.5 h-px" style="background:#991b1b"></div>
      </div>`;else if(y)r+=`<div style="width:${l+Math.round(4*a)}px; height:${v}px; background:${h.color}; border-radius: 0 0 2px 2px"></div>`;else if(d){const b=Math.max(3,Math.round(4*a)),w=Math.round(v*.28),k=v-w;r+=`<div class="flex flex-col items-center" style="width:${l+Math.round(16*a)}px">
        <div class="relative" style="width:${l+Math.round(12*a)}px; height:${w}px; background:${h.color}; border-radius: 0 0 3px 3px">
          <div style="position:absolute;bottom:0;left:0;right:0;height:3px;background:#22c55e;border-radius:0 0 3px 3px"></div>
          <div style="position:absolute;top:-${Math.round(6*a)}px;right:${Math.round(8*a)}px;width:2px;height:${Math.round(8*a)}px;background:#22c55e;border-radius:1px"></div>
          <div style="position:absolute;top:-${Math.round(8*a)}px;right:${Math.round(5*a)}px;width:${Math.round(6*a)}px;height:${Math.round(6*a)}px;border:2px solid #22c55e;border-radius:50%;background:transparent"></div>
        </div>
        <div class="flex justify-between" style="width:${l+Math.round(12*a)}px; height:${k}px">
          <div style="width:${b}px; background:#A09080; height:${k}px; border-radius: 0 0 2px 2px"></div>
          <div style="width:${b}px; background:#A09080; height:${k}px; border-radius: 0 0 2px 2px"></div>
        </div>
      </div>`}else if(m){const b=Math.max(2,Math.round(3*a));r+=`<div class="flex justify-between" style="width:${l+Math.round(12*a)}px; height:${v}px">
        <div style="width:${b}px; background:${h.color}; height:${v}px; border-radius: 0 0 2px 2px"></div>
        <div class="flex-1 mx-0.5" style="background:${h.color}; height:${Math.round(v*.3)}px; border-radius: 0 0 2px 2px"></div>
        <div style="width:${b}px; background:${h.color}; height:${v}px; border-radius: 0 0 2px 2px"></div>
      </div>`}else if(S){const b=Math.max(7,Math.round(8*a));r+=`<div class="relative flex items-center justify-center" style="width:${l}px; height:${v}px; background:${h.color}">
        <span class="text-white/60 font-medium text-center leading-tight" style="font-size:${b}px">${h.name}</span>
        ${n?ye(s,c):""}
      </div>`}else{const b=Math.max(8,Math.round(10*a));r+=`<div class="relative flex items-center justify-center" style="width:${l}px; height:${v}px; background:${h.color}; border-left:2px solid rgba(0,0,0,0.12); border-right:2px solid rgba(0,0,0,0.12)">
        <span class="text-white font-semibold text-center leading-tight" style="font-size:${b}px; text-shadow:0 1px 2px rgba(0,0,0,0.3)">${h.name}</span>
        ${n?ye(s,c):""}
      </div>`}}),r+="</div>",r}function ye(e,i){return`<button onclick="document.dispatchEvent(new CustomEvent('hive-remove-component', {detail:{hiveId:'${e}',index:${i}}}))" class="absolute top-0 right-0.5 text-white/40 hover:text-white text-xs leading-none p-0.5" title="Remove">✕</button>`}function qe(e=[],i="#f59e0b"){if(!e||!e.length)return'<div class="w-full h-full flex items-center justify-center text-3xl">🏠</div>';const t=.35,n=De(e),s=Math.round((n?de:re)*t);let a='<div class="flex flex-col items-center justify-end h-full py-1">';return e.forEach(o=>{const l=ve(o.type);if(!l)return;const u=n?Nt(l):l.height,r=Math.round(u*t);l.id.includes("roof")?a+=`<div class="rounded-t" style="width:${s+3}px; height:${r}px; background:${l.color}"></div>`:l.id.includes("stand-iot")?a+=`<div class="flex flex-col items-center" style="width:${s+8}px">
        <div class="relative" style="width:${s+6}px; height:${Math.round(r*.3)}px; background:#5B7A5E">
          <div style="position:absolute;bottom:0;left:0;right:0;height:1px;background:#22c55e"></div>
        </div>
        <div class="flex justify-between" style="width:${s+6}px; height:${r-Math.round(r*.3)}px">
          <div style="width:1px; background:#A09080; height:100%"></div>
          <div style="width:1px; background:#A09080; height:100%"></div>
        </div>
      </div>`:l.id.includes("stand")?a+=`<div class="flex justify-between" style="width:${s+6}px; height:${r}px">
        <div style="width:1px; background:${l.color}; height:${r}px"></div>
        <div class="flex-1 mx-px" style="background:${l.color}; height:${Math.round(r*.3)}px"></div>
        <div style="width:1px; background:${l.color}; height:${r}px"></div>
      </div>`:l.id.includes("floor")?a+=`<div style="width:${s+2}px; height:${Math.max(2,r)}px; background:${l.color}"></div>`:l.category==="accessory"?a+=`<div style="width:${s}px; height:${Math.max(2,r)}px; background:${l.color}"></div>`:a+=`<div style="width:${s}px; height:${r}px; background:${l.color}; border-left:1px solid rgba(0,0,0,0.12); border-right:1px solid rgba(0,0,0,0.12)"></div>`}),a+="</div>",a}const Ht={0:"Clear Sky",1:"Mainly Clear",2:"Partly Cloudy",3:"Overcast",45:"Foggy",48:"Rime Fog",51:"Light Drizzle",53:"Drizzle",55:"Heavy Drizzle",61:"Light Rain",63:"Rain",65:"Heavy Rain",71:"Light Snow",73:"Snow",75:"Heavy Snow",77:"Snow Grains",80:"Light Showers",81:"Showers",82:"Heavy Showers",85:"Light Snow Showers",86:"Snow Showers",95:"Thunderstorm",96:"Thunderstorm + Hail",99:"Thunderstorm + Heavy Hail"};let X=null,we=0;const Tt=10*60*1e3;async function _e(e,i){if(X&&Date.now()-we<Tt)return X;const t=`https://api.open-meteo.com/v1/forecast?latitude=${e}&longitude=${i}&current=temperature_2m,relative_humidity_2m,weather_code,wind_speed_10m&timezone=auto`,n=await fetch(t);if(!n.ok)throw new Error(`Weather API: HTTP ${n.status}`);const a=(await n.json()).current,o=a.weather_code;return X={temp:Math.round(a.temperature_2m),conditions:Ht[o]||`Code ${o}`,humidity:a.relative_humidity_2m,windSpeed:Math.round(a.wind_speed_10m),icon:Dt(o)},we=Date.now(),X}function Dt(e){return e===0||e===1?"☀️":e===2?"⛅":e===3?"☁️":e>=45&&e<=48?"🌫️":e>=51&&e<=55?"🌦️":e>=61&&e<=65?"🌧️":e>=71&&e<=77?"🌨️":e>=80&&e<=82?"🌦️":e>=85&&e<=86?"🌨️":e>=95?"⛈️":"🌤️"}async function qt(e){const i=Y(),t=st(),n=Ne(),s=He(),a=i.filter(o=>o.status==="Active");e.innerHTML=`
    ${I(R.name,!1,!0)}

    <main class="max-w-6xl mx-auto pb-8 hex-bg">

      <!-- Location & Weather -->
      <section class="px-5 py-4">
        <div class="flex items-center gap-5 text-sm">
          <span class="flex items-center gap-1.5 text-hive-muted">${z.mapPin}<span class="text-hive-text text-xs">${R.location}</span></span>
          <span class="flex items-center gap-1.5 text-hive-muted">${z.thermometer}<span id="liveWeather" class="text-hive-text text-xs">Loading...</span></span>
        </div>
      </section>

      <!-- Quick Actions -->
      <section class="px-5 mb-6">
        <div class="flex gap-2">
          <a href="#/inspect" class="btn-action">${z.edit}<span>Inspect</span></a>
          <a href="#/inspect?type=harvest" class="btn-action">${z.flask}<span>Harvest</span></a>
          <a href="#/inspect?type=feed" class="btn-action">${z.book}<span>Feed</span></a>
          <a href="#/inspect?type=treatment" class="btn-action">${z.heart}<span>Treat</span></a>
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
            ${s.map(o=>`
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
              ${z.chevron}
            </a>
          `).join("")}
        </div>
      </section>

    </main>
  `,_e(R.lat,R.lng).then(o=>{const l=document.getElementById("liveWeather");l&&(l.textContent=`${o.temp}°C ${o.conditions}`)}).catch(()=>{const o=document.getElementById("liveWeather");o&&(o.textContent="—")}),document.querySelectorAll(".task-check").forEach(o=>{o.addEventListener("change",()=>{const l=o.dataset.task;Te(l);const u=o.closest(".task-item");u&&(u.style.opacity="0.3",u.style.textDecoration="line-through",setTimeout(()=>u.remove(),600))})})}async function ee(e,i){var m,y,S,b,w,k,A,C,f,E,P,F,j;const t=i.id,s=Y().find(g=>g.hiveName===t),a=[...it(t),...Me().filter(g=>g.hive===t)].sort((g,$)=>new Date($.date)-new Date(g.date));if(!s){e.innerHTML=`
      ${I("Not Found",!0)}
      <div class="max-w-6xl mx-auto p-4 text-center py-16">
        <div class="text-5xl mb-4">🔍</div>
        <p class="text-hive-muted text-lg">Hive not found</p>
        <a href="#/apiary" class="btn-primary inline-block mt-6">Back to Apiary</a>
      </div>`;return}const o=s.strength>=80?"#22c55e":s.strength>=50?"#f59e0b":"#ef4444";s.queenYear&&new Date().getFullYear()-s.queenYear;const l=a.filter(g=>g.type==="Inspection"),u=l.length?new Date(l[0].date):null,r=u?Math.floor((new Date-u)/864e5):null,p=kt(s.id);let c="—";if(s.queenAddedDate){const g=new Date(s.queenAddedDate),$=new Date;let N=$.getFullYear()-g.getFullYear(),D=$.getMonth()-g.getMonth(),H=$.getDate()-g.getDate();H<0&&(D--,H+=new Date($.getFullYear(),$.getMonth(),0).getDate()),D<0&&(N--,D+=12);const M=[];N>0&&M.push(`${N}y`),D>0&&M.push(`${D}m`),M.push(`${H}d`),c=M.join(" ")}const h={Green:"var(--hive-sage)",Pink:"#ec4899",Blue:"var(--hive-blue)",Yellow:"#eab308",Red:"var(--hive-red)",White:"#e5e7eb"};e.innerHTML=`
    ${I(s.hiveName,!0)}

    <main class="max-w-6xl mx-auto pb-24">

      <!-- Hero Card — compact header -->
      <section class="px-4 pt-4 pb-2">
        <div class="card p-5">
          <div class="flex items-start justify-between">
            <div class="flex-1">
              <div class="flex items-center gap-3 mb-2">
                <h2 class="font-serif text-xl font-bold text-hive-text">${s.hiveName}</h2>
                <div class="flex items-center gap-1.5">
                  <span class="text-2xl font-bold" style="color:${o}">${s.strength}%</span>
                  <span class="text-[10px] text-hive-muted uppercase tracking-wider">Strength</span>
                </div>
              </div>
              <div class="flex items-center gap-2 flex-wrap">
                <span class="pill-amber">${s.beeType}</span>
                <span class="${s.type==="Nuc"?"pill-blue":"pill-orange"}">${s.type}</span>
                ${s.hiveStyle?`<span class="pill-blue">${s.hiveStyle}</span>`:""}
                <span class="pill-green">${s.status}</span>
                <a href="#/hive-form/${s.id}" class="pill text-xs bg-hive-surface text-hive-muted hover:text-hive-amber">Edit</a>
              </div>
            </div>
          </div>
        </div>
      </section>

      <!-- Two-panel: Queen Profile + Hive Metrics -->
      <section class="px-4 mb-4 grid grid-cols-1 md:grid-cols-2 gap-3">

        <!-- Queen Profile -->
        <div class="card p-5">
          <div class="flex items-center justify-between mb-3">
            <div class="section-subtitle">Queen Profile</div>
            <a href="#/hive-form/${s.id}" class="text-[10px] uppercase tracking-wider text-hive-gold hover:opacity-80" style="font-family:'DM Sans',sans-serif">Edit</a>
          </div>
          <div class="grid grid-cols-2 gap-4">
            <div class="space-y-3">
              <div class="flex items-center gap-2">
                ${s.queenMarked?`<span class="w-2.5 h-2.5 rounded-full flex-shrink-0" style="background:${h[s.queenColor]||"var(--hive-muted)"}"></span><span class="text-sm text-hive-text">${s.queenColor} Marked</span>`:'<span class="text-sm text-hive-muted">Unmarked</span>'}
                ${s.queenClipped?'<span class="text-sm text-hive-muted ml-1">&middot; Clipped</span>':""}
              </div>
              <div class="flex items-center gap-2.5">
                <span class="text-[11px] text-hive-muted">Breed:</span><span class="text-sm text-hive-text">${s.beeType}</span>
              </div>
              <div class="flex items-center gap-2.5">
                <span class="text-[11px] text-hive-muted">Source:</span><span class="text-sm text-hive-text">${s.queenSource||"—"}</span>
              </div>
              ${s.queenAddedDate?`<div>
                <div class="text-sm text-hive-text">Added: ${new Date(s.queenAddedDate).toLocaleDateString("en-GB",{day:"numeric",month:"short",year:"numeric"})}</div>
                <div class="text-sm text-hive-text">Age: ${c}${s.queenYear?` (${s.queenYear})`:""}</div>
              </div>`:""}
              ${s.queenNotes?`<p class="text-xs text-hive-muted italic">${s.queenNotes}</p>`:""}
            </div>
            <!-- Queen Image — large, right side -->
            <div class="flex items-center justify-center rounded-xl py-3" style="background:var(--hive-bg)">
              <div class="relative w-28 h-28 rounded-xl overflow-hidden" style="border:2px dashed var(--hive-border)">
                ${s.queenImage?`<img src="${s.queenImage}" class="w-full h-full object-cover" alt="Queen">`:'<div class="w-full h-full flex flex-col items-center justify-center text-hive-muted"><svg class="w-10 h-10 mb-1 opacity-30" fill="none" stroke="currentColor" stroke-width="1" viewBox="0 0 24 24"><path stroke-linecap="round" stroke-linejoin="round" d="M6.827 6.175A2.31 2.31 0 015.186 7.23c-.38.054-.757.112-1.134.175C2.999 7.58 2.25 8.507 2.25 9.574V18a2.25 2.25 0 002.25 2.25h15A2.25 2.25 0 0021.75 18V9.574c0-1.067-.75-1.994-1.802-2.169a47.865 47.865 0 00-1.134-.175 2.31 2.31 0 01-1.64-1.055l-.822-1.316a2.192 2.192 0 00-1.736-1.039 48.774 48.774 0 00-5.232 0 2.192 2.192 0 00-1.736 1.039l-.821 1.316z"/><path stroke-linecap="round" stroke-linejoin="round" d="M16.5 12.75a4.5 4.5 0 11-9 0 4.5 4.5 0 019 0z"/></svg><span class="text-[9px] uppercase tracking-wider opacity-30">Queen Photo</span></div>'}
                <button id="queenImageBtn" class="absolute bottom-1 right-1 w-6 h-6 rounded-full flex items-center justify-center shadow-sm" style="background:var(--hive-gold);color:#0B0D0E"><svg class="w-3 h-3" fill="none" stroke="currentColor" stroke-width="2" viewBox="0 0 24 24"><path stroke-linecap="round" stroke-linejoin="round" d="M16.862 4.487l1.687-1.688a1.875 1.875 0 112.652 2.652L10.582 16.07a4.5 4.5 0 01-1.897 1.13L6 18l.8-2.685a4.5 4.5 0 011.13-1.897l8.932-8.931z"/></svg></button>
              </div>
              <input type="file" id="queenImageInput" accept="image/*" capture="environment" class="hidden">
            </div>
          </div>
        </div>

        <!-- Hive Metrics + Visual -->
        <div class="card p-5">
          <div class="section-subtitle mb-3">Hive Metrics</div>
          <div class="grid grid-cols-2 gap-4">
            <div class="space-y-3">
              <div class="flex items-center gap-2.5">
                <svg class="w-4 h-4 text-hive-muted flex-shrink-0" fill="none" stroke="currentColor" stroke-width="1.5" viewBox="0 0 24 24"><path stroke-linecap="round" stroke-linejoin="round" d="M6.75 3v2.25M17.25 3v2.25M3 18.75V7.5a2.25 2.25 0 012.25-2.25h13.5A2.25 2.25 0 0121 7.5v11.25m-18 0A2.25 2.25 0 005.25 21h13.5A2.25 2.25 0 0021 18.75m-18 0v-7.5A2.25 2.25 0 015.25 9h13.5A2.25 2.25 0 0121 11.25v7.5"/></svg>
                <span class="text-sm text-hive-text">Added: ${new Date(s.dateAdded).toLocaleDateString("en-GB",{day:"numeric",month:"short",year:"numeric"})}</span>
              </div>
              <div class="flex items-center gap-2.5">
                <svg class="w-4 h-4 text-hive-muted flex-shrink-0" fill="none" stroke="currentColor" stroke-width="1.5" viewBox="0 0 24 24"><path stroke-linecap="round" stroke-linejoin="round" d="M21 21l-5.197-5.197m0 0A7.5 7.5 0 105.196 5.196a7.5 7.5 0 0010.607 10.607z"/></svg>
                <span class="text-sm text-hive-text">${l.length} Inspections <span class="text-hive-muted">(Since Jun 2025)</span></span>
              </div>
              <div class="flex items-center gap-2.5">
                <svg class="w-4 h-4 flex-shrink-0 ${r!==null&&r>10?"text-hive-red":"text-hive-muted"}" fill="none" stroke="currentColor" stroke-width="1.5" viewBox="0 0 24 24"><path stroke-linecap="round" stroke-linejoin="round" d="M12 6v6h4.5m4.5 0a9 9 0 11-18 0 9 9 0 0118 0z"/></svg>
                <span class="text-sm ${r!==null&&r>10?"text-hive-red":"text-hive-text"}">Last Activity: ${r!==null?r:"—"} Days${u?` (${u.toLocaleDateString("en-GB",{day:"numeric",month:"short"})})`:""}</span>
              </div>
            </div>
            <!-- Hive visual — centered and prominent -->
            <div class="flex items-center justify-center rounded-xl py-3" style="background:var(--hive-bg)">
              ${pe(s.components||[],{size:"md"})}
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
        <a href="#/build/${s.id}" class="card p-4 flex flex-col items-center gap-2 text-center hover:border-hive-gold/30 transition-colors">
          <svg class="w-8 h-8 text-hive-gold" fill="none" stroke="currentColor" stroke-width="1.25" viewBox="0 0 24 24"><path stroke-linecap="round" stroke-linejoin="round" d="M11.42 15.17l-5.66-5.66a2 2 0 010-2.83l.71-.71a2 2 0 012.83 0l5.66 5.66m-8.49 8.49l-2.83-2.83a2 2 0 010-2.83l.71-.71a2 2 0 012.83 0l2.83 2.83"/></svg>
          <div class="text-xs font-semibold text-hive-text uppercase tracking-wider">Hive Build</div>
          <div class="text-[10px] text-hive-muted">Components: ${(s.components||[]).length}</div>
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
              ${p?`<button id="noteModalDelete" class="text-xs text-hive-red hover:opacity-80 uppercase tracking-wider" style="font-family:'DM Sans',sans-serif">Delete Note</button>`:"<span></span>"}
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
          ${a.map((g,$)=>`
            <a href="#/inspection/${g.id||$}?from=${encodeURIComponent(t)}" class="flex gap-3 ${$<a.length-1?"pb-4":""} block">
              <div class="flex flex-col items-center">
                <div class="timeline-dot" style="background: rgba(212,175,55,0.1); color: var(--hive-gold)">
                  <svg class="w-3.5 h-3.5" fill="none" stroke="currentColor" stroke-width="1.5" viewBox="0 0 24 24"><path stroke-linecap="round" stroke-linejoin="round" d="M9 5H7a2 2 0 00-2 2v12a2 2 0 002 2h10a2 2 0 002-2V7a2 2 0 00-2-2h-2M9 5a2 2 0 002 2h2a2 2 0 002-2M9 5a2 2 0 012-2h2a2 2 0 012 2"/></svg>
                </div>
                ${$<a.length-1?'<div class="w-px bg-hive-border flex-1 mt-1"></div>':""}
              </div>
              <div class="flex-1 pb-1">
                <div class="flex items-center justify-between">
                  ${Mt(g.type)}
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
  `;const v=document.getElementById("noteModal"),x=()=>v==null?void 0:v.classList.remove("hidden"),d=()=>v==null?void 0:v.classList.add("hidden");(m=document.getElementById("editHiveNote"))==null||m.addEventListener("click",x),(y=document.getElementById("noteModalBackdrop"))==null||y.addEventListener("click",d),(S=document.getElementById("noteModalClose"))==null||S.addEventListener("click",d),(b=document.getElementById("noteModalCancel"))==null||b.addEventListener("click",d),(w=document.getElementById("noteModalSave"))==null||w.addEventListener("click",()=>{var $;const g=($=document.getElementById("noteModalText"))==null?void 0:$.value.trim();g&&(fe(s.id,g),d(),ee(e,i))}),(k=document.getElementById("noteModalDelete"))==null||k.addEventListener("click",()=>{confirm("Delete this hive note?")&&(fe(s.id,""),d(),ee(e,i))}),(A=document.getElementById("queenImageBtn"))==null||A.addEventListener("click",()=>{var g;(g=document.getElementById("queenImageInput"))==null||g.click()}),(C=document.getElementById("queenImageInput"))==null||C.addEventListener("change",g=>{var D;const $=(D=g.target.files)==null?void 0:D[0];if(!$)return;const N=new FileReader;N.onload=()=>{const H=new Image;H.onload=()=>{const M=Math.min(H.width,H.height),V=document.createElement("canvas");V.width=300,V.height=300;const je=V.getContext("2d"),Re=(H.width-M)/2,Pe=(H.height-M)/2;je.drawImage(H,Re,Pe,M,M,0,0,300,300);const Fe=V.toDataURL("image/jpeg",.8);updateHive(s.id,{queenImage:Fe}),ee(e,i)},H.src=N.result},N.readAsDataURL($)}),(f=e.querySelector('[data-op="split"]'))==null||f.addEventListener("click",()=>{if(!confirm(`Split "${s.hiveName}"? This will create a new nuc from this hive.`))return;const g=prompt('Name for the new nuc/hive (e.g. "Nuc 2 - Split"):');if(!g)return;const $=prompt("Split notes (optional):")||"";ut(s.id,g,$),window.location.hash="#/apiary"}),(E=e.querySelector('[data-op="combine"]'))==null||E.addEventListener("click",()=>{const g=Y().filter(M=>M.id!==s.id&&M.status==="Active");if(!g.length){alert("No other active hives to combine with.");return}if(!confirm(`Combine "${s.hiveName}" into another hive? This hive will be deactivated.`))return;const $=g.map((M,V)=>`${V+1}. ${M.hiveName}`).join(`
`),N=prompt(`Combine ${s.hiveName} INTO which hive? (this hive will be deactivated)

${$}

Enter number:`);if(!N)return;const D=parseInt(N,10)-1;if(D<0||D>=g.length){alert("Invalid selection.");return}const H=prompt("Combine notes (optional):")||"";vt(g[D].id,s.id,H),window.location.hash="#/apiary"}),(P=e.querySelector('[data-op="dead"]'))==null||P.addEventListener("click",()=>{if(!confirm(`Mark "${s.hiveName}" as dead? This will deactivate the hive.`))return;const g=prompt("Notes on the death (optional):")||"";pt(s.id,g),window.location.hash="#/apiary"}),(F=e.querySelector('[data-op="move"]'))==null||F.addEventListener("click",()=>{const g=prompt("Where is the hive being moved to?");if(!g)return;const $=prompt("Move notes (optional):")||"";ht(s.id,g,$),alert(`${s.hiveName} move recorded to timeline.`),window.location.hash="#/hive/"+encodeURIComponent(s.hiveName)}),(j=e.querySelector('[data-op="convert"]'))==null||j.addEventListener("click",()=>{const g=s.type==="Hive"?"downsize to a Nuc":"upgrade to a full Hive";if(!confirm(`Convert "${s.hiveName}" — ${g}?

All components will be swapped to the matching type.`))return;const $=prompt("Conversion notes (optional):")||"",N=xt(s.id,$);N&&(window.location.hash="#/hive/"+encodeURIComponent(N.hiveName))})}const _t="modulepreload",jt=function(e){return"/"+e},ke={},$e=function(i,t,n){let s=Promise.resolve();if(t&&t.length>0){document.getElementsByTagName("link");const o=document.querySelector("meta[property=csp-nonce]"),l=(o==null?void 0:o.nonce)||(o==null?void 0:o.getAttribute("nonce"));s=Promise.allSettled(t.map(u=>{if(u=jt(u),u in ke)return;ke[u]=!0;const r=u.endsWith(".css"),p=r?'[rel="stylesheet"]':"";if(document.querySelector(`link[href="${u}"]${p}`))return;const c=document.createElement("link");if(c.rel=r?"stylesheet":_t,r||(c.as="script"),c.crossOrigin="",c.href=u,l&&c.setAttribute("nonce",l),document.head.appendChild(c),r)return new Promise((h,v)=>{c.addEventListener("load",h),c.addEventListener("error",()=>v(new Error(`Unable to preload CSS for ${u}`)))})}))}function a(o){const l=new Event("vite:preloadError",{cancelable:!0});if(l.payload=o,window.dispatchEvent(l),!l.defaultPrevented)throw o}return s.then(o=>{for(const l of o||[])l.status==="rejected"&&a(l.reason);return i().catch(a)})};async function Rt(e){e.innerHTML=`
    ${I("Sensor Dashboard",!0)}
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
        <div id="weightSkeleton" class="w-full h-[200px] rounded-lg animate-pulse" style="background:var(--hive-border)"></div>
        <canvas id="weightChart" class="w-full hidden"></canvas>
        <div id="weightEmpty" class="hidden text-center py-10">
          <svg class="w-10 h-10 mx-auto mb-2 text-hive-muted opacity-30" fill="none" stroke="currentColor" stroke-width="1" viewBox="0 0 24 24"><path stroke-linecap="round" stroke-linejoin="round" d="M3 13.125C3 12.504 3.504 12 4.125 12h2.25c.621 0 1.125.504 1.125 1.125v6.75C7.5 20.496 6.996 21 6.375 21h-2.25A1.125 1.125 0 013 19.875v-6.75zM9.75 8.625c0-.621.504-1.125 1.125-1.125h2.25c.621 0 1.125.504 1.125 1.125v11.25c0 .621-.504 1.125-1.125 1.125h-2.25a1.125 1.125 0 01-1.125-1.125V8.625zM16.5 4.125c0-.621.504-1.125 1.125-1.125h2.25C20.496 3 21 3.504 21 4.125v15.75c0 .621-.504 1.125-1.125 1.125h-2.25a1.125 1.125 0 01-1.125-1.125V4.125z"/></svg>
          <p class="text-sm text-hive-muted">No weight data yet</p>
          <p class="text-xs text-hive-muted mt-1">Connect your IoT scale to start recording</p>
        </div>
      </section>

      <section class="grid grid-cols-1 md:grid-cols-2 gap-4">
        <div class="card-surface">
          <h3 class="text-sm font-semibold text-hive-muted uppercase tracking-wider mb-3">Temperature</h3>
          <div id="tempSkeleton" class="w-full h-[200px] rounded-lg animate-pulse" style="background:var(--hive-border)"></div>
          <canvas id="tempChart" class="w-full hidden"></canvas>
        </div>
        <div class="card-surface">
          <h3 class="text-sm font-semibold text-hive-muted uppercase tracking-wider mb-3">Humidity & Battery</h3>
          <div id="envSkeleton" class="w-full h-[200px] rounded-lg animate-pulse" style="background:var(--hive-border)"></div>
          <canvas id="envChart" class="w-full hidden"></canvas>
        </div>
      </section>

      <div id="errorBanner" class="hidden bg-hive-red/10 border border-hive-red text-hive-red p-3 rounded-xl text-center text-sm"></div>
    </main>
  `;const{Chart:i,registerables:t}=await $e(async()=>{const{Chart:p,registerables:c}=await import("./chart-19k6OvwP.js");return{Chart:p,registerables:c}},[]);await $e(()=>import("./chartjs-adapter-date-fns.esm-CV7ru7NP.js"),__vite__mapDeps([0,1])),i.register(...t);const n={responsive:!0,maintainAspectRatio:!0,aspectRatio:2.5,interaction:{mode:"index",intersect:!1},plugins:{legend:{labels:{color:"#9ca3af",usePointStyle:!0,padding:12}},tooltip:{backgroundColor:"#1a1d27",borderColor:"#2a2e3e",borderWidth:1,titleColor:"#e4e4e7",bodyColor:"#e4e4e7",padding:10,callbacks:{title:p=>new Date(p[0].parsed.x).toLocaleString()}}},scales:{x:{type:"time",time:{tooltipFormat:"dd MMM HH:mm"},grid:{color:"rgba(255,255,255,0.05)"},ticks:{color:"#9ca3af",maxTicksLimit:8}},y:{grid:{color:"rgba(255,255,255,0.05)"},ticks:{color:"#9ca3af"}}}},s=(p,c)=>({label:p,borderColor:c,backgroundColor:c+"1a",fill:!1,tension:.3,pointRadius:0,borderWidth:2,data:[]}),a=new i(document.getElementById("weightChart"),{type:"line",data:{datasets:[{...s("Weight (kg)","#f59e0b"),fill:!0}]},options:{...n,scales:{...n.scales,y:{...n.scales.y,title:{display:!0,text:"kg",color:"#9ca3af"}}}}}),o=new i(document.getElementById("tempChart"),{type:"line",data:{datasets:[s("Internal (°C)","#ef4444"),s("Leg (°C)","#a78bfa")]},options:{...n,aspectRatio:2,scales:{...n.scales,y:{...n.scales.y,title:{display:!0,text:"°C",color:"#9ca3af"}}}}}),l=new i(document.getElementById("envChart"),{type:"line",data:{datasets:[{...s("Humidity (%)","#3b82f6"),yAxisID:"yHum"},{...s("Battery (V)","#22c55e"),yAxisID:"yBat"}]},options:{...n,aspectRatio:2,scales:{x:n.scales.x,yHum:{type:"linear",position:"left",grid:{color:"rgba(255,255,255,0.05)"},ticks:{color:"#3b82f6"},title:{display:!0,text:"%",color:"#3b82f6"}},yBat:{type:"linear",position:"right",grid:{drawOnChartArea:!1},ticks:{color:"#22c55e"},title:{display:!0,text:"V",color:"#22c55e"}}}}});async function u(){var x,d;const p=parseInt(document.getElementById("timeRange").value,10),c=new Date(Date.now()-p*3600*1e3),h=m=>{const y=document.getElementById(m);y&&y.classList.add("hidden")},v=m=>{const y=document.getElementById(m);y&&y.classList.remove("hidden")};try{const m=await tt();document.getElementById("errorBanner").classList.add("hidden");const y=m.filter(b=>new Date(b.timestamp)>=c);if(h("weightSkeleton"),h("tempSkeleton"),h("envSkeleton"),y.length>0){v("weightChart"),v("tempChart"),v("envChart"),(x=document.getElementById("weightEmpty"))==null||x.classList.add("hidden");const b=y[y.length-1],w=(A,C,f)=>{document.getElementById(A).textContent=C!=null?Number(C).toFixed(f):"—"};w("latestWeight",b.weight,1),w("latestTemp",b.internalTemp,1),w("latestHum",b.hiveHum,1),w("latestBat",b.batteryVoltage,2),w("latestLeg",b.legTemp,1);const k=Math.floor((Date.now()-new Date(b.timestamp))/1e3);document.getElementById("lastReading").textContent=k<60?`${k}s ago`:k<3600?`${Math.floor(k/60)}m ago`:`${Math.floor(k/3600)}h ago`,document.getElementById("dataPoints").textContent=`${y.length} pts`}else(d=document.getElementById("weightEmpty"))==null||d.classList.remove("hidden"),v("tempChart"),v("envChart");const S=(b,w)=>({x:new Date(b.timestamp),y:b[w]});a.data.datasets[0].data=y.map(b=>S(b,"weight")),o.data.datasets[0].data=y.map(b=>S(b,"internalTemp")),o.data.datasets[1].data=y.map(b=>S(b,"legTemp")),l.data.datasets[0].data=y.map(b=>S(b,"hiveHum")),l.data.datasets[1].data=y.map(b=>S(b,"batteryVoltage")),a.update("none"),o.update("none"),l.update("none")}catch(m){const y=document.getElementById("errorBanner");y.textContent=`Failed to load sensor data: ${m.message}`,y.classList.remove("hidden")}}u();const r=setInterval(u,5*60*1e3);return document.getElementById("timeRange").addEventListener("change",u),document.getElementById("refreshBtn").addEventListener("click",u),()=>{clearInterval(r),a.destroy(),o.destroy(),l.destroy()}}function ae(e,i=3e3){const t=document.getElementById("toast");t&&t.remove();const n=document.createElement("div");n.id="toast",n.className="fixed top-20 left-1/2 -translate-x-1/2 z-[100] px-6 py-3 rounded-full text-sm font-medium animate-in",n.style.cssText="background:var(--hive-gold);color:#0B0D0E;box-shadow:0 4px 20px rgba(212,175,55,0.3)",n.textContent=e,document.body.appendChild(n),setTimeout(()=>{n.style.opacity="0",setTimeout(()=>n.remove(),300)},i)}const Pt=["Varroa mites","Nosema","Chalkbrood","Stonebrood","American Foulbrood","European Foulbrood"],Ft=["Waxmoth","Mice","Ants","Wasps","Small Hive Beetle","Hornets"],zt=["","Compact","Spotty","Patchy","Drone-heavy","None visible"];async function Ot(e){const t=new URLSearchParams(window.location.hash.split("?")[1]||"").get("hive")||"",s=Y().filter(d=>d.status==="Active").map(d=>d.hiveName);e.innerHTML=`
    ${I("New Inspection",!0)}
    <main class="max-w-3xl mx-auto p-5 pb-8">
      <form id="inspectionForm" class="space-y-5">

        <!-- Card 1: Inspection Details -->
        <section class="card p-5">
          <div class="grid grid-cols-2 gap-4">
            <div>
              <label class="section-subtitle block mb-2">Hive <span class="text-hive-red">*</span></label>
              <select id="hiveSelect" class="input-field" required>
                <option value="">Select hive...</option>
                ${s.map(d=>`<option value="${d}" ${d===t?"selected":""}>${d}</option>`).join("")}
              </select>
            </div>
            <div>
              <label class="section-subtitle block mb-2">Inspection Date</label>
              <input type="date" id="inspectionDate" class="input-field" value="${new Date().toISOString().slice(0,10)}">
            </div>
          </div>

          <div class="border-t pt-4 mt-4" style="border-color:var(--hive-border)">
            <div class="grid grid-cols-1 md:grid-cols-2 gap-4">
              <div>
                <span class="section-subtitle block mb-3">Colony Health</span>
                <div class="space-y-3">
                  ${["queenSeen:Queen Spotted","broodSpotted:Brood Spotted","queenCells:Queen Cells Spotted"].map(d=>{const[m,y]=d.split(":");return`<div class="flex items-center justify-between">
                      <span class="text-sm text-hive-text">${y}</span>
                      <label class="toggle-switch">
                        <input type="checkbox" data-health="${m}">
                        <div class="toggle-track"></div>
                        <div class="toggle-knob"></div>
                      </label>
                    </div>`}).join("")}
                </div>
              </div>
              <div class="space-y-4">
                <div>
                  <div class="flex items-center justify-between mb-2">
                    <span class="section-subtitle">Hive Strength</span>
                    <span id="strengthValue" class="text-lg font-serif font-medium text-hive-gold">80%</span>
                  </div>
                  <input type="range" id="strengthSlider" min="0" max="100" value="80" class="w-full accent-[var(--hive-gold)]">
                </div>
                <div class="border-t pt-3" style="border-color:var(--hive-border)">
                  <span class="section-subtitle block mb-3">Temperament</span>
                  <div class="flex gap-2">
                    ${["Gentle","Active","Aggressive"].map(d=>`<button type="button" data-temperament="${d}" class="temperament-pill btn-secondary flex-1 py-2 text-xs">${d}</button>`).join("")}
                  </div>
                </div>
              </div>
            </div>
          </div>

          <div class="border-t pt-4 mt-4" style="border-color:var(--hive-border)">
            <label class="section-subtitle block mb-2">Brood Pattern</label>
            <select id="broodPattern" class="input-field">
              ${zt.map(d=>`<option value="${d}">${d||"Not assessed"}</option>`).join("")}
            </select>
          </div>

          <div class="border-t pt-4 mt-4" style="border-color:var(--hive-border)">
            <div class="flex items-center justify-between mb-3">
              <span class="section-subtitle">Hive Weight</span>
              <button type="button" id="fetchWeightBtn" class="section-subtitle text-hive-gold flex items-center gap-1">
                <svg class="w-3.5 h-3.5" fill="none" stroke="currentColor" stroke-width="1.25" viewBox="0 0 24 24"><path stroke-linecap="round" stroke-linejoin="round" d="M4 4v5h.582m15.356 2A8.001 8.001 0 004.582 9m0 0H9m11 11v-5h-.581m0 0a8.003 8.003 0 01-15.357-2m15.357 2H15"/></svg>
                Fetch Live
              </button>
            </div>
            <div class="grid grid-cols-3 gap-4">
              <div><label class="text-[11px] text-hive-muted block mb-1">Total (kg)</label><input type="number" id="weightTotal" class="input-field" step="0.01" placeholder="0.00"></div>
              <div><label class="text-[11px] text-hive-muted block mb-1">Left (kg)</label><input type="number" id="weightLeft" class="input-field" step="0.01" placeholder="Auto"></div>
              <div><label class="text-[11px] text-hive-muted block mb-1">Right (kg)</label><input type="number" id="weightRight" class="input-field" step="0.01" placeholder="Auto"></div>
            </div>
          </div>

          <div class="border-t pt-4 mt-4" style="border-color:var(--hive-border)">
            <h3 class="section-subtitle mb-3">Issues</h3>
            <div class="grid grid-cols-1 md:grid-cols-2 gap-4">
              <div>
                <span class="text-sm font-medium text-hive-text mb-2 block">Diseases</span>
                <div class="space-y-2">
                  ${Pt.map(d=>`<label class="flex items-center gap-2 cursor-pointer"><input type="checkbox" data-disease="${d}" class="w-3.5 h-3.5 rounded accent-[var(--hive-red)]"><span class="text-sm text-hive-text">${d}</span></label>`).join("")}
                </div>
              </div>
              <div>
                <span class="text-sm font-medium text-hive-text mb-2 block">Pests</span>
                <div class="space-y-2">
                  ${Ft.map(d=>`<label class="flex items-center gap-2 cursor-pointer"><input type="checkbox" data-pest="${d}" class="w-3.5 h-3.5 rounded accent-[var(--hive-red)]"><span class="text-sm text-hive-text">${d}</span></label>`).join("")}
                </div>
              </div>
            </div>
          </div>
        </section>

        <!-- Card 3: Notes & Environment -->
        <section class="card p-5">
          <label class="section-subtitle block mb-2">Notes</label>
          <textarea id="notes" class="input-field min-h-[80px] resize-y" style="border:1px solid var(--hive-border);border-radius:8px;padding:12px" placeholder="Frame-by-frame notes, observations..."></textarea>

          <div class="border-t pt-4 mt-4" style="border-color:var(--hive-border)">
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
          </div>
        </section>

        <div class="flex gap-3 pt-2">
          <button type="submit" id="saveBtn" class="btn-primary flex-1 py-3">Save Inspection</button>
          <a href="#/apiary" class="btn-secondary flex-1 py-3 text-center">Cancel</a>
        </div>
      </form>
    </main>
  `;const a={queenSeen:!1,broodSpotted:!1,queenCells:!1};document.querySelectorAll("[data-health]").forEach(d=>{d.addEventListener("change",()=>{a[d.dataset.health]=d.checked})});let o="";document.querySelectorAll(".temperament-pill").forEach(d=>{d.addEventListener("click",()=>{o=d.dataset.temperament,document.querySelectorAll(".temperament-pill").forEach(m=>m.className="temperament-pill btn-secondary flex-1 py-2 text-xs"),d.className="temperament-pill btn-primary flex-1 py-2 text-xs"})});const l=document.getElementById("strengthSlider"),u=document.getElementById("strengthValue");l.addEventListener("input",()=>{u.textContent=l.value+"%"});const r=document.getElementById("weightLeft"),p=document.getElementById("weightRight"),c=document.getElementById("weightTotal"),h=()=>{const d=parseFloat(r.value)||0,m=parseFloat(p.value)||0;(d>0||m>0)&&(c.value=(d+m).toFixed(2))},v=()=>{const d=parseFloat(c.value)||0;if(d>0){const m=(d/2).toFixed(2);r.value=m,p.value=m}};r.addEventListener("input",h),p.addEventListener("input",h),c.addEventListener("input",v),document.getElementById("fetchWeightBtn").addEventListener("click",()=>ae("IoT weight fetch not yet connected"));async function x(){const d=document.getElementById("weatherStatus");try{d.textContent="Fetching...";const m=await _e(R.lat,R.lng);document.getElementById("weatherConditions").value=m.conditions,document.getElementById("weatherTemp").value=m.temp,d.innerHTML='<span style="color:var(--hive-sage)">&#9679;</span> Auto-filled: '+m.temp+"°C "+m.conditions+" ("+m.humidity+"% humidity, "+m.windSpeed+" km/h wind)"}catch{d.textContent="Could not fetch weather."}}x(),document.getElementById("refreshWeatherBtn").addEventListener("click",x),document.getElementById("inspectionForm").addEventListener("submit",d=>{d.preventDefault();const m=document.getElementById("hiveSelect").value;if(!m){ae("Please select a hive");return}const y=document.getElementById("saveBtn");y.disabled=!0,y.textContent="Saving...";const S=[];document.querySelectorAll("[data-disease]:checked").forEach(k=>S.push(k.dataset.disease));const b=[];document.querySelectorAll("[data-pest]:checked").forEach(k=>b.push(k.dataset.pest));const w={date:document.getElementById("inspectionDate").value||new Date().toISOString().slice(0,10),type:"Inspection",hive:m,strength:parseInt(l.value,10),queenSeen:a.queenSeen,broodSpotted:a.broodSpotted,queenCells:a.queenCells,temperament:o,broodPattern:document.getElementById("broodPattern").value,weightLeft:parseFloat(r.value)||null,weightRight:parseFloat(p.value)||null,weightTotal:parseFloat(c.value)||null,diseases:S,pests:b,notes:document.getElementById("notes").value,weatherTemp:parseFloat(document.getElementById("weatherTemp").value)||null,weatherConditions:document.getElementById("weatherConditions").value||null};nt(w),ae("Inspection saved for "+m),setTimeout(()=>{window.location.hash="#/apiary"},1500)})}function Vt(e){const i=Y(),t=i.filter(s=>s.type==="Hive"&&s.status==="Active"),n=i.filter(s=>s.type==="Nuc"&&s.status==="Active");e.innerHTML=`
    ${I("Admin",!0)}

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
          ${i.map(s=>`
            <div class="card-surface flex items-center justify-between">
              <div class="flex items-center gap-3">
                <div class="w-12 h-14 rounded-lg overflow-hidden flex items-center justify-center" style="background: linear-gradient(135deg, ${s.color}15, ${s.color}05)">
                  ${qe(s.components,s.color)}
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
  `}function Wt(e){const i=Et();e.innerHTML=`
    ${I("Device Health",!0)}

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
  `}function Ut(e,i){const t=i.id;let n=q(t);if(!n){e.innerHTML=`${I("Not Found",!0)}<div class="max-w-6xl mx-auto p-4 text-center py-16"><p class="text-hive-muted">Hive not found</p><a href="#/apiary" class="btn-primary inline-block mt-4">Back</a></div>`;return}function s(){n=q(t),e.innerHTML=`
      ${I("Build "+n.hiveName,!0,!1,"#/hive/"+encodeURIComponent(n.hiveName))}
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
            ${(n.components||[]).map((o,l)=>{const u=le.find(p=>p.id===o.type);if(!u)return"";const r=(n.components||[]).length;return`
                <div class="flex items-center justify-between p-2 rounded-lg hover:bg-hive-surface-hover transition-colors">
                  <div class="flex items-center gap-3">
                    <span class="text-xs text-hive-muted w-5 text-right">${l+1}</span>
                    <div class="w-8 h-4 rounded" style="background:${u.color}"></div>
                    <span class="text-sm text-hive-text">${u.name}</span>
                  </div>
                  <div class="flex items-center gap-1">
                    <button data-move-up="${l}" class="p-1 text-hive-muted hover:text-hive-gold transition-colors ${l===0?"opacity-20 pointer-events-none":""}" title="Move up">
                      <svg class="w-4 h-4" fill="none" stroke="currentColor" stroke-width="2" viewBox="0 0 24 24"><path stroke-linecap="round" stroke-linejoin="round" d="M5 15l7-7 7 7"/></svg>
                    </button>
                    <button data-move-down="${l}" class="p-1 text-hive-muted hover:text-hive-gold transition-colors ${l===r-1?"opacity-20 pointer-events-none":""}" title="Move down">
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
    `,e.querySelectorAll("[data-add-type]").forEach(o=>{o.addEventListener("click",()=>{ct(t,o.dataset.addType),s()})}),e.querySelectorAll("[data-remove-idx]").forEach(o=>{o.addEventListener("click",()=>{ge(t,parseInt(o.dataset.removeIdx,10)),s()})}),e.querySelectorAll("[data-move-up]").forEach(o=>{o.addEventListener("click",()=>{const l=parseInt(o.dataset.moveUp,10);xe(t,l,l-1),s()})}),e.querySelectorAll("[data-move-down]").forEach(o=>{o.addEventListener("click",()=>{const l=parseInt(o.dataset.moveDown,10);xe(t,l,l+1),s()})})}s();const a=o=>{o.detail.hiveId===t&&(ge(t,o.detail.index),s())};return document.addEventListener("hive-remove-component",a),()=>document.removeEventListener("hive-remove-component",a)}function Yt(e,i){var u,r,p;const t=i.id,n=t&&t!=="new",a=(n?q(t):null)||{hiveName:"",type:"Hive",hiveStyle:"National",beeType:"Buckfast",strength:100,color:"#f59e0b",queenMarked:!1,queenColor:null,queenYear:new Date().getFullYear(),components:[{type:"roof"},{type:"deep-box"},{type:"stand"}]};e.innerHTML=`
    ${I(n?"Edit "+a.hiveName:"Add New Hive",!0,!1,n?"#/hive/"+encodeURIComponent(a.hiveName):"#/admin")}

    <main class="max-w-3xl mx-auto p-4 pb-8">
      <form id="hiveForm" class="space-y-5">

        <!-- Hero: Name + Visual Preview side by side -->
        <section class="card p-5">
          <div class="grid grid-cols-2 gap-4">
            <div class="space-y-4">
              <div>
                <label class="block section-subtitle mb-2">Hive Name</label>
                <input type="text" id="hiveName" class="input-field text-lg" value="${a.hiveName}" placeholder="e.g. Hive 7 - Luna" required>
              </div>
              <div class="grid grid-cols-2 gap-3">
                <div>
                  <label class="block text-xs text-hive-muted mb-1">Type</label>
                  <select id="hiveType" class="input-field">
                    <option value="Hive" ${a.type==="Hive"?"selected":""}>Hive</option>
                    <option value="Nuc" ${a.type==="Nuc"?"selected":""}>Nuc</option>
                  </select>
                </div>
                <div>
                  <label class="block text-xs text-hive-muted mb-1">Style</label>
                  <select id="hiveStyle" class="input-field">
                    ${ot.map(c=>`<option value="${c}" ${a.hiveStyle===c?"selected":""}>${c}</option>`).join("")}
                  </select>
                </div>
              </div>
            </div>
            <div class="flex items-center justify-center rounded-xl" style="background:var(--hive-bg)">
              ${pe(a.components,{size:"md"})}
            </div>
          </div>
        </section>

        <!-- Queen Details with Image -->
        <section class="card p-5">
          <h3 class="section-subtitle mb-4">Queen Details</h3>
          <div class="grid grid-cols-3 gap-4 mb-4">
            <!-- Queen fields -->
            <div class="col-span-2 space-y-3">
              <div class="grid grid-cols-2 gap-3">
                <div>
                  <label class="block text-xs text-hive-muted mb-1">Breed / Type</label>
                  <select id="beeType" class="input-field">
                    ${at.map(c=>`<option value="${c}" ${a.beeType===c?"selected":""}>${c}</option>`).join("")}
                  </select>
                </div>
                <div>
                  <label class="block text-xs text-hive-muted mb-1">Source</label>
                  <select id="queenSource" class="input-field">
                    ${lt.map(c=>`<option value="${c}" ${a.queenSource===c?"selected":""}>${c}</option>`).join("")}
                  </select>
                </div>
              </div>
              <div class="grid grid-cols-2 gap-3">
                <div>
                  <label class="block text-xs text-hive-muted mb-1">Year Introduced</label>
                  <input type="number" id="queenYear" class="input-field" value="${a.queenYear||""}" min="2018" max="2030">
                </div>
                <div>
                  <label class="block text-xs text-hive-muted mb-1">Date Added</label>
                  <input type="date" id="queenAddedDate" class="input-field" value="${a.queenAddedDate||""}">
                </div>
              </div>
              <div class="grid grid-cols-2 gap-3">
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
                    ${rt.map(c=>`<option value="${c}" ${a.queenColor===c?"selected":""}>${c}</option>`).join("")}
                  </select>
                </div>
              </div>
              <div class="grid grid-cols-2 gap-3">
                <div>
                  <label class="block text-xs text-hive-muted mb-1">Clipped</label>
                  <select id="queenClipped" class="input-field">
                    <option value="false" ${a.queenClipped?"":"selected"}>No</option>
                    <option value="true" ${a.queenClipped?"selected":""}>Yes</option>
                  </select>
                </div>
                <div></div>
              </div>
            </div>
            <!-- Queen Image Upload -->
            <div class="flex flex-col items-center justify-start pt-1">
              <div class="relative w-full aspect-square max-w-[140px] rounded-xl overflow-hidden" style="background:var(--hive-bg);border:2px dashed var(--hive-border)">
                ${a.queenImage?`<img src="${a.queenImage}" class="w-full h-full object-cover" alt="Queen">`:'<div class="w-full h-full flex flex-col items-center justify-center text-hive-muted"><svg class="w-10 h-10 mb-1 opacity-30" fill="none" stroke="currentColor" stroke-width="1" viewBox="0 0 24 24"><path stroke-linecap="round" stroke-linejoin="round" d="M6.827 6.175A2.31 2.31 0 015.186 7.23c-.38.054-.757.112-1.134.175C2.999 7.58 2.25 8.507 2.25 9.574V18a2.25 2.25 0 002.25 2.25h15A2.25 2.25 0 0021.75 18V9.574c0-1.067-.75-1.994-1.802-2.169a47.865 47.865 0 00-1.134-.175 2.31 2.31 0 01-1.64-1.055l-.822-1.316a2.192 2.192 0 00-1.736-1.039 48.774 48.774 0 00-5.232 0 2.192 2.192 0 00-1.736 1.039l-.821 1.316z"/><path stroke-linecap="round" stroke-linejoin="round" d="M16.5 12.75a4.5 4.5 0 11-9 0 4.5 4.5 0 019 0z"/></svg><span class="text-[9px] uppercase tracking-wider opacity-30">Queen Photo</span></div>'}
                <button type="button" id="queenImageBtn" class="absolute bottom-1 right-1 w-6 h-6 rounded-full flex items-center justify-center shadow-sm" style="background:var(--hive-gold);color:#0B0D0E"><svg class="w-3 h-3" fill="none" stroke="currentColor" stroke-width="2" viewBox="0 0 24 24"><path stroke-linecap="round" stroke-linejoin="round" d="M6.827 6.175A2.31 2.31 0 015.186 7.23c-.38.054-.757.112-1.134.175C2.999 7.58 2.25 8.507 2.25 9.574V18a2.25 2.25 0 002.25 2.25h15A2.25 2.25 0 0021.75 18V9.574c0-1.067-.75-1.994-1.802-2.169a47.865 47.865 0 00-1.134-.175 2.31 2.31 0 01-1.64-1.055l-.822-1.316a2.192 2.192 0 00-1.736-1.039 48.774 48.774 0 00-5.232 0 2.192 2.192 0 00-1.736 1.039l-.821 1.316z"/></svg></button>
              </div>
              <input type="file" id="queenImageInput" accept="image/*" capture="environment" class="hidden">
              <span class="text-[9px] text-hive-muted mt-2 uppercase tracking-wider">Upload Photo</span>
            </div>
          </div>
          <div>
            <label class="block text-xs text-hive-muted mb-1">Queen Notes</label>
            <textarea id="queenNotes" class="input-field" rows="2" placeholder="e.g. Gentle temperament, prolific layer">${a.queenNotes||""}</textarea>
          </div>
        </section>

        <!-- Strength -->
        <section class="card p-5">
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
          ${n?`<button type="button" id="deleteBtn" class="w-full py-3 text-xs uppercase tracking-wider text-hive-red hover:text-hive-red/80 transition-colors" style="font-family:'DM Sans',sans-serif">Delete Hive</button>`:""}
        </section>

      </form>
    </main>
  `;const o=document.getElementById("strengthSlider");o.addEventListener("input",()=>{document.getElementById("strengthVal").textContent=o.value+"%"});let l=a.queenImage||null;(u=document.getElementById("queenImageBtn"))==null||u.addEventListener("click",()=>{var c;(c=document.getElementById("queenImageInput"))==null||c.click()}),(r=document.getElementById("queenImageInput"))==null||r.addEventListener("change",c=>{var x;const h=(x=c.target.files)==null?void 0:x[0];if(!h)return;const v=new FileReader;v.onload=()=>{const d=new Image;d.onload=()=>{var w,k,A;const m=Math.min(d.width,d.height),y=document.createElement("canvas");if(y.width=300,y.height=300,y.getContext("2d").drawImage(d,(d.width-m)/2,(d.height-m)/2,m,m,0,0,300,300),l=y.toDataURL("image/jpeg",.8),(k=(w=document.querySelector("#queenImageBtn"))==null?void 0:w.closest(".relative"))==null?void 0:k.querySelector("img, div")){const C=document.querySelector("#queenImageBtn").closest(".relative"),f=C.querySelector("img");if(f)f.src=l;else{(A=C.querySelector("div"))==null||A.remove();const E=document.createElement("img");E.src=l,E.className="w-full h-full object-cover",E.alt="Queen",C.prepend(E)}}},d.src=v.result},v.readAsDataURL(h)}),document.getElementById("hiveForm").addEventListener("submit",c=>{c.preventDefault();const h={hiveName:document.getElementById("hiveName").value.trim(),type:document.getElementById("hiveType").value,hiveStyle:document.getElementById("hiveStyle").value,beeType:document.getElementById("beeType").value,color:a.color||"#f59e0b",strength:parseInt(o.value,10),queenYear:parseInt(document.getElementById("queenYear").value,10)||null,queenMarked:document.getElementById("queenMarked").value==="true",queenColor:document.getElementById("queenColor").value||null,queenClipped:document.getElementById("queenClipped").value==="true",queenSource:document.getElementById("queenSource").value||"Unknown",queenAddedDate:document.getElementById("queenAddedDate").value||null,queenNotes:document.getElementById("queenNotes").value.trim(),queenImage:l,orientation:"vertical"};if(n)se(t,h),window.location.hash="#/hive/"+encodeURIComponent(h.hiveName);else{h.components=[{type:"roof"},{type:"deep-box"},{type:"stand"}];const v=Le(h);window.location.hash="#/build/"+v.id}}),n&&((p=document.getElementById("deleteBtn"))==null||p.addEventListener("click",()=>{confirm(`Delete "${a.hiveName}"? This cannot be undone.`)&&(dt(t),window.location.hash="#/apiary")}))}function Qt(e){function i(){var n;const t=He(!0);e.innerHTML=`
      ${I("Tasks",!0)}
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
                <span class="text-[10px] uppercase tracking-wider block mt-0.5 ${s.done?"text-hive-muted":"text-hive-gold"}">${s.due?te(s.due):""}</span>
              </div>
              <button class="text-hive-muted hover:text-hive-red delete-task p-1" data-tid="${s.id}" title="Delete">
                <svg class="w-4 h-4" fill="none" stroke="currentColor" stroke-width="1.25" viewBox="0 0 24 24"><path stroke-linecap="round" stroke-linejoin="round" d="M19 7l-.867 12.142A2 2 0 0116.138 21H7.862a2 2 0 01-1.995-1.858L5 7m5 4v6m4-6v6m1-10V4a1 1 0 00-1-1h-4a1 1 0 00-1 1v3M4 7h16"/></svg>
              </button>
            </div>
          `).join("")}
          ${t.length===0?'<p class="text-hive-muted text-sm text-center py-8">No tasks yet.</p>':""}
        </div>
      </main>
    `,e.querySelectorAll(".toggle-task").forEach(s=>{s.addEventListener("change",()=>{Te(s.dataset.tid),i()})}),e.querySelectorAll(".delete-task").forEach(s=>{s.addEventListener("click",()=>{$t(s.dataset.tid),i()})}),(n=document.getElementById("addTaskBtn"))==null||n.addEventListener("click",()=>{const s=prompt("New task:");if(!s)return;const a=prompt("Due date (YYYY-MM-DD, optional):")||"";St(s,a||null),i()})}i()}function Gt(e){function i(){var r,p,c,h,v;const t=Ne(!1);e.innerHTML=`
      ${I("Notes",!0)}
      <main class="max-w-6xl mx-auto p-5 space-y-4">
        <div class="flex items-center justify-between mb-2">
          <h2 class="section-title">${t.length} Notes</h2>
          <button id="addNoteBtn" class="btn-primary text-xs py-2 px-4">+ Add Note</button>
        </div>
        <div class="space-y-2">
          ${t.map(x=>`
            <div class="card p-4" data-id="${x.id}">
              <div class="flex items-start gap-3">
                <button class="pin-note p-1 mt-0.5 ${x.pinned?"text-hive-gold":"text-hive-muted"} hover:text-hive-gold" data-nid="${x.id}" title="${x.pinned?"Unpin":"Pin to home"}">
                  <svg class="w-4 h-4" fill="${x.pinned?"currentColor":"none"}" stroke="currentColor" stroke-width="1.25" viewBox="0 0 24 24"><path stroke-linecap="round" stroke-linejoin="round" d="M5 5a2 2 0 012-2h10a2 2 0 012 2v16l-7-3.5L5 21V5z"/></svg>
                </button>
                <div class="flex-1 min-w-0">
                  <p class="text-sm text-hive-text leading-relaxed">${x.text}</p>
                  <p class="text-[11px] text-hive-muted mt-2">${new Date(x.date).toLocaleDateString("en-GB",{month:"short",day:"numeric",year:"numeric"})}</p>
                </div>
                <button class="edit-note p-1 text-hive-muted hover:text-hive-gold" data-nid="${x.id}" data-ntext="${x.text.replace(/"/g,"&quot;")}" title="Edit">
                  <svg class="w-4 h-4" fill="none" stroke="currentColor" stroke-width="1.25" viewBox="0 0 24 24"><path stroke-linecap="round" stroke-linejoin="round" d="M11 5H6a2 2 0 00-2 2v11a2 2 0 002 2h11a2 2 0 002-2v-5m-1.414-9.414a2 2 0 112.828 2.828L11.828 15H9v-2.828l8.586-8.586z"/></svg>
                </button>
                <button class="delete-note p-1 text-hive-muted hover:text-hive-red" data-nid="${x.id}" title="Delete">
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
    `,e.querySelectorAll(".pin-note").forEach(x=>{x.addEventListener("click",()=>{ft(x.dataset.nid),i()})}),e.querySelectorAll(".delete-note").forEach(x=>{x.addEventListener("click",()=>{bt(x.dataset.nid),i()})});const n=document.getElementById("noteModal"),s=document.getElementById("noteModalTitle"),a=document.getElementById("noteModalText");let o=null;const l=(x,d,m)=>{s.textContent=x,a.value=d,o=m,n==null||n.classList.remove("hidden"),setTimeout(()=>a.focus(),100)},u=()=>{n==null||n.classList.add("hidden"),o=null};(r=document.getElementById("addNoteBtn"))==null||r.addEventListener("click",()=>l("New Note","",null)),e.querySelectorAll(".edit-note").forEach(x=>{x.addEventListener("click",()=>l("Edit Note",x.dataset.ntext,x.dataset.nid))}),(p=document.getElementById("noteModalBackdrop"))==null||p.addEventListener("click",u),(c=document.getElementById("noteModalClose"))==null||c.addEventListener("click",u),(h=document.getElementById("noteModalCancel"))==null||h.addEventListener("click",u),(v=document.getElementById("noteModalSave"))==null||v.addEventListener("click",()=>{const x=a==null?void 0:a.value.trim();x&&(o?yt(o,x):wt(x),i())})}i()}function Jt(e){const t=new URLSearchParams(window.location.hash.split("?")[1]||"").get("date")||"";let n=Ie().filter(a=>a.type==="Inspection");t&&(n=n.filter(a=>a.date===t));const s=t?`Inspections — ${new Date(t).toLocaleDateString("en-GB",{day:"numeric",month:"long",year:"numeric"})}`:"All Inspections";e.innerHTML=`
    ${I(s,!0)}
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
  `}const Zt=["Varroa mites","Nosema","Chalkbrood","Stonebrood","American Foulbrood","European Foulbrood"],Kt=["Waxmoth","Mice","Ants","Wasps","Small Hive Beetle","Hornets"],Xt=["","Compact","Spotty","Patchy","Drone-heavy","None visible"];function es(e,i){var C;const t=i.id,n=new URLSearchParams(window.location.hash.split("?")[1]||""),s=n.get("from")||"",a=n.get("date")||"",o=[...Ie(),...Me()],l=o.find(f=>f.id===t)||o[parseInt(t,10)];if(!l){e.innerHTML=`
      ${I("Not Found",!0)}
      <div class="max-w-6xl mx-auto p-4 text-center py-16">
        <div class="text-5xl mb-4">🔍</div>
        <p class="text-hive-muted text-lg">Inspection not found</p>
        <a href="#/inspections" class="btn-primary inline-block mt-4">Back to Inspections</a>
      </div>`;return}let u="#/inspections";s==="inspections"&&a?u=`#/inspections?date=${a}`:s&&s!=="inspections"&&(u=`#/hive/${encodeURIComponent(s)}`);const r=(l.strength||0)>=80?"var(--hive-sage)":(l.strength||0)>=50?"var(--hive-gold)":"var(--hive-red)";e.innerHTML=`
    ${I(l.hive,!0,!1,u)}
    <main class="max-w-3xl mx-auto p-5 pb-8 space-y-5">

      <!-- Header card with date + padlock -->
      <div class="card-surface">
        <div class="flex items-center justify-between">
          <div class="flex items-center gap-2 flex-wrap">
            <span class="pill-amber">${l.type||"Inspection"}</span>
            <input type="date" id="inspDate" class="text-sm px-2 py-1 rounded-lg" style="background:var(--hive-bg);border:1px solid var(--hive-border);color:var(--hive-text)" value="${l.date}" disabled>
          </div>
          <button id="lockToggle" class="flex items-center gap-1.5 px-3 py-1.5 rounded-full text-xs uppercase tracking-wider transition-all" style="background:var(--hive-bg);border:1px solid var(--hive-border);font-family:'DM Sans',sans-serif;color:var(--hive-muted)">
            <svg id="lockIcon" class="w-4 h-4" fill="none" stroke="currentColor" stroke-width="1.5" viewBox="0 0 24 24"><path stroke-linecap="round" stroke-linejoin="round" d="M16.5 10.5V6.75a4.5 4.5 0 10-9 0v3.75m-.75 11.25h10.5a2.25 2.25 0 002.25-2.25v-6.75a2.25 2.25 0 00-2.25-2.25H6.75a2.25 2.25 0 00-2.25 2.25v6.75a2.25 2.25 0 002.25 2.25z"/></svg>
            <span id="lockLabel">Locked</span>
          </button>
        </div>
        <h2 class="font-serif text-xl font-medium text-hive-text mt-3">${l.hive}</h2>
      </div>

      <!-- Card 1: Colony Assessment -->
      <section class="card p-5">
        <div class="grid grid-cols-1 md:grid-cols-2 gap-4">
          <div>
            <span class="section-subtitle block mb-3">Colony Health</span>
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
          </div>
          <div class="space-y-4">
            <div>
              <div class="flex items-center justify-between mb-2">
                <span class="section-subtitle">Hive Strength</span>
                <span id="strengthValue" class="text-lg font-serif font-medium" style="color:${r}">${l.strength||"—"}%</span>
              </div>
              <input type="range" id="strengthSlider" min="0" max="100" value="${l.strength||80}" class="w-full accent-[var(--hive-gold)]" disabled>
            </div>
            <div class="border-t pt-3" style="border-color:var(--hive-border)">
              <span class="section-subtitle block mb-3">Temperament</span>
              <div class="flex gap-2">
                ${["Gentle","Active","Aggressive"].map(f=>`<button type="button" data-temperament="${f}" class="temperament-pill ${l.temperament===f?"btn-primary":"btn-secondary"} flex-1 py-2 text-xs" disabled>${f}</button>`).join("")}
              </div>
            </div>
          </div>
        </div>

        <div class="border-t pt-4 mt-4" style="border-color:var(--hive-border)">
          <label class="section-subtitle block mb-2">Brood Pattern</label>
          <select id="broodPattern" class="input-field" disabled>
            ${Xt.map(f=>`<option value="${f}" ${l.broodPattern===f?"selected":""}>${f||"Not assessed"}</option>`).join("")}
          </select>
        </div>
      </section>

      <!-- Card 2: Measurements & Issues -->
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

        <div class="border-t pt-4 mt-4" style="border-color:var(--hive-border)">
          <h3 class="section-subtitle mb-2">Issues</h3>
          ${be("diseases","Diseases",`<div class="grid grid-cols-2 gap-2 pb-2">${Zt.map(f=>`<label class="flex items-center gap-2"><input type="checkbox" data-disease="${f}" class="w-3.5 h-3.5 rounded accent-[var(--hive-red)]" ${(l.diseases||[]).includes(f)?"checked":""} disabled><span class="text-sm text-hive-text">${f}</span></label>`).join("")}</div>`)}
          ${be("pests","Pests",`<div class="grid grid-cols-2 gap-2 pb-2">${Kt.map(f=>`<label class="flex items-center gap-2"><input type="checkbox" data-pest="${f}" class="w-3.5 h-3.5 rounded accent-[var(--hive-red)]" ${(l.pests||[]).includes(f)?"checked":""} disabled><span class="text-sm text-hive-text">${f}</span></label>`).join("")}</div>`)}
        </div>
      </section>

      <!-- Card 3: Notes & Environment -->
      <section class="card p-5">
        <label class="section-subtitle block mb-2">Notes</label>
        <textarea id="inspNotes" class="input-field min-h-[80px] resize-y" style="border:1px solid var(--hive-border);border-radius:8px;padding:12px" disabled>${l.notes||""}</textarea>

        <div class="border-t pt-4 mt-4" style="border-color:var(--hive-border)">
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
        </div>
      </section>

      <!-- Save button (hidden until unlocked) -->
      <div id="saveBar" class="hidden">
        <button id="saveBtn" class="btn-primary w-full py-3">Save Changes</button>
      </div>

      <a href="${u}" class="btn-secondary w-full py-3 text-center block">Back</a>
    </main>
  `,Lt(e);let p=!0;const c=document.getElementById("lockToggle"),h=document.getElementById("lockIcon"),v=document.getElementById("lockLabel"),x=document.getElementById("saveBar"),d=e.querySelectorAll("input, textarea, select"),m=e.querySelectorAll(".temperament-pill");c.addEventListener("click",()=>{p=!p,d.forEach(f=>{f.id!=="weightTotal"&&(f.disabled=p)}),m.forEach(f=>f.disabled=p),p?(h.innerHTML='<path stroke-linecap="round" stroke-linejoin="round" d="M16.5 10.5V6.75a4.5 4.5 0 10-9 0v3.75m-.75 11.25h10.5a2.25 2.25 0 002.25-2.25v-6.75a2.25 2.25 0 00-2.25-2.25H6.75a2.25 2.25 0 00-2.25 2.25v6.75a2.25 2.25 0 002.25 2.25z"/>',v.textContent="Locked",c.style.color="var(--hive-muted)",x.classList.add("hidden")):(h.innerHTML='<path stroke-linecap="round" stroke-linejoin="round" d="M13.5 10.5V6.75a4.5 4.5 0 119 0v3.75M3.75 21.75h10.5a2.25 2.25 0 002.25-2.25v-6.75a2.25 2.25 0 00-2.25-2.25H3.75a2.25 2.25 0 00-2.25 2.25v6.75a2.25 2.25 0 002.25 2.25z"/>',v.textContent="Editing",c.style.color="var(--hive-gold)",x.classList.remove("hidden"))});const y=document.getElementById("strengthSlider"),S=document.getElementById("strengthValue");y.addEventListener("input",()=>{S.textContent=y.value+"%"}),m.forEach(f=>{f.addEventListener("click",()=>{p||(m.forEach(E=>E.className="temperament-pill btn-secondary flex-1 py-2 text-xs"),f.className="temperament-pill btn-primary flex-1 py-2 text-xs")})});const b=document.getElementById("weightLeft"),w=document.getElementById("weightRight"),k=document.getElementById("weightTotal"),A=()=>{const f=parseFloat(b.value)||0,E=parseFloat(w.value)||0;(f>0||E>0)&&(k.value=(f+E).toFixed(2))};b.addEventListener("input",A),w.addEventListener("input",A),(C=document.getElementById("saveBtn"))==null||C.addEventListener("click",()=>{const f=document.createElement("div");f.className="fixed top-20 left-1/2 -translate-x-1/2 z-[100] px-6 py-3 rounded-full text-sm font-medium animate-in",f.style.cssText="background:var(--hive-gold);color:#0B0D0E;box-shadow:0 4px 20px rgba(212,175,55,0.3)",f.textContent="Inspection updated",document.body.appendChild(f),setTimeout(()=>{f.style.opacity="0",setTimeout(()=>f.remove(),300)},2500)})}Oe();Ye();T("#/login",At);T("#/apiary",qt);T("#/hive/:id",ee);T("#/apiary-dashboard",Rt);T("#/inspect",Ot);T("#/admin",Vt);T("#/devices",Wt);T("#/build/:id",Ut);T("#/hive-form/:id",Yt);T("#/tasks",Qt);T("#/notes",Gt);T("#/inspections",Jt);T("#/inspection/:id",es);window.addEventListener("hashchange",()=>setTimeout(Ce,50));Ge().then(()=>{ze("#/login"),setTimeout(Ce,100)});
