const __vite__mapDeps=(i,m=__vite__mapDeps,d=(m.f||(m.f=["assets/chartjs-adapter-date-fns.esm-CV7ru7NP.js","assets/chart-19k6OvwP.js"])))=>i.map(i=>d[i]);
(function(){const n=document.createElement("link").relList;if(n&&n.supports&&n.supports("modulepreload"))return;for(const t of document.querySelectorAll('link[rel="modulepreload"]'))i(t);new MutationObserver(t=>{for(const a of t)if(a.type==="childList")for(const o of a.addedNodes)o.tagName==="LINK"&&o.rel==="modulepreload"&&i(o)}).observe(document,{childList:!0,subtree:!0});function s(t){const a={};return t.integrity&&(a.integrity=t.integrity),t.referrerPolicy&&(a.referrerPolicy=t.referrerPolicy),t.crossOrigin==="use-credentials"?a.credentials="include":t.crossOrigin==="anonymous"?a.credentials="omit":a.credentials="same-origin",a}function i(t){if(t.ep)return;t.ep=!0;const a=s(t);fetch(t.href,a)}})();const he={};let _=null;function E(e,n){he[e]=n}function qe(e="#/login"){async function n(){const s=window.location.hash||e,i=sessionStorage.getItem("hive_user");if(!i&&s!=="#/login"){window.location.hash="#/login";return}if(i&&s==="#/login"){window.location.hash="#/apiary";return}let t=null,a={};const o=s.split("?")[0];for(const[l,d]of Object.entries(he)){const c=l.split("/"),p=o.split("/");if(c.length!==p.length)continue;let v=!0;const m={};for(let h=0;h<c.length;h++)if(c[h].startsWith(":"))m[c[h].slice(1)]=decodeURIComponent(p[h]);else if(c[h]!==p[h]){v=!1;break}if(v){t=d,a=m;break}}if(t){_&&(_(),_=null);const l=document.getElementById("app"),d=await t(l,a);typeof d=="function"&&(_=d)}}window.addEventListener("hashchange",n),n()}const me="apiary_theme";function Te(){localStorage.getItem(me)==="light"&&document.documentElement.classList.add("light"),te()}function De(){document.documentElement.classList.toggle("light");const e=document.documentElement.classList.contains("light");localStorage.setItem(me,e?"light":"dark"),te()}function te(){const e=document.documentElement.classList.contains("light");document.querySelectorAll(".theme-icon-dark").forEach(n=>n.classList.toggle("hidden",e)),document.querySelectorAll(".theme-icon-light").forEach(n=>n.classList.toggle("hidden",!e)),document.querySelectorAll(".theme-knob").forEach(n=>{n.style.left=e?"14px":"2px"})}function fe(){document.querySelectorAll("#themeToggle").forEach(e=>{const n=e.cloneNode(!0);e.parentNode.replaceChild(n,e),n.addEventListener("click",()=>{De()})}),te()}function z(e,n,s){const i=[];for(let t=0;t<6;t++){const a=Math.PI/3*t-Math.PI/6;i.push(`${e+s*Math.cos(a)},${n+s*Math.sin(a)}`)}return`M${i.join("L")}Z`}function je(){const a=[];for(let o=0;o<5;o++){const l=o%2===0?4:3;for(let d=0;d<l;d++){const c=d*140.4+(o%2===0?0:105.30000000000001)+78,p=650-o*156*.5-78,v=Math.sqrt(c*c+(650-p)*(650-p))/Math.sqrt(750*750+650*650),m=Math.max(0,1-v*2);m>.05&&a.push({x:c,y:p,opacity:m})}}return xe(750,650,a,78,"bl")}function Re(){const a=[];for(let o=0;o<4;o++)for(let d=0;d<3;d++){const c=600-d*144-80,p=o*160*.5+80,v=Math.sqrt((600-c)*(600-c)+p*p)/Math.sqrt(600*600+500*500),m=Math.max(0,1-v*2.2);m>.05&&a.push({x:c,y:p,opacity:m})}return xe(600,500,a,80,"tr")}function xe(e,n,s,i,t){const a=document.documentElement.classList.contains("light"),o="http://www.w3.org/2000/svg",l=document.createElementNS(o,"svg");l.setAttribute("width","100%"),l.setAttribute("height","100%"),l.setAttribute("viewBox",`0 0 ${e} ${n}`),l.setAttribute("preserveAspectRatio","none");const d=document.createElementNS(o,"defs"),c=document.createElementNS(o,"filter");c.setAttribute("id",`emboss-${t}`),c.setAttribute("x","-20%"),c.setAttribute("y","-20%"),c.setAttribute("width","140%"),c.setAttribute("height","140%");const p=document.createElementNS(o,"feGaussianBlur");p.setAttribute("in","SourceAlpha"),p.setAttribute("stdDeviation","3"),p.setAttribute("result","blur");const v=document.createElementNS(o,"feDiffuseLighting");v.setAttribute("in","blur"),v.setAttribute("surfaceScale","6"),v.setAttribute("diffuseConstant","0.7"),v.setAttribute("result","diffuse"),v.setAttribute("lighting-color",a?"#c8b890":"#4a6a8a");const m=document.createElementNS(o,"feDistantLight");m.setAttribute("azimuth","315"),m.setAttribute("elevation","25"),v.appendChild(m);const h=document.createElementNS(o,"feSpecularLighting");h.setAttribute("in","blur"),h.setAttribute("surfaceScale","5"),h.setAttribute("specularConstant","0.4"),h.setAttribute("specularExponent","20"),h.setAttribute("result","specular"),h.setAttribute("lighting-color",a?"#e8dcc0":"#8ab4d8");const r=document.createElementNS(o,"feDistantLight");r.setAttribute("azimuth","315"),r.setAttribute("elevation","30"),h.appendChild(r);const u=document.createElementNS(o,"feComposite");u.setAttribute("in","specular"),u.setAttribute("in2","diffuse"),u.setAttribute("operator","arithmetic"),u.setAttribute("k1","0"),u.setAttribute("k2","1"),u.setAttribute("k3","1"),u.setAttribute("k4","0"),u.setAttribute("result","lit");const g=document.createElementNS(o,"feComposite");g.setAttribute("in","lit"),g.setAttribute("in2","SourceAlpha"),g.setAttribute("operator","in"),g.setAttribute("result","clipped");const y=document.createElementNS(o,"feMerge"),w=document.createElementNS(o,"feMergeNode");w.setAttribute("in","clipped");const k=document.createElementNS(o,"feMergeNode");k.setAttribute("in","SourceGraphic"),y.appendChild(w),y.appendChild(k),c.appendChild(p),c.appendChild(v),c.appendChild(h),c.appendChild(u),c.appendChild(g),c.appendChild(y),d.appendChild(c);const S=document.createElementNS(o,"filter");S.setAttribute("id",`shadow-${t}`),S.setAttribute("x","-30%"),S.setAttribute("y","-30%"),S.setAttribute("width","160%"),S.setAttribute("height","160%");const H=document.createElementNS(o,"feDropShadow");return H.setAttribute("dx","4"),H.setAttribute("dy","6"),H.setAttribute("stdDeviation","8"),H.setAttribute("flood-color",a?"rgba(0,0,0,0.15)":"rgba(0,0,0,0.5)"),S.appendChild(H),d.appendChild(S),l.appendChild(d),s.forEach(({x:I,y:A,opacity:f})=>{const C=document.createElementNS(o,"g");C.setAttribute("opacity",String(f));const x=document.createElementNS(o,"path");x.setAttribute("d",z(I,A,i*.92)),x.setAttribute("fill",a?"rgba(180,165,140,0.3)":"rgba(8,16,28,0.7)"),x.setAttribute("filter",`url(#shadow-${t})`),C.appendChild(x);const b=document.createElementNS(o,"path");b.setAttribute("d",z(I,A,i*.92)),b.setAttribute("fill",a?"rgba(215,205,185,0.6)":"rgba(14,28,48,0.85)"),b.setAttribute("filter",`url(#emboss-${t})`),C.appendChild(b);const B=document.createElementNS(o,"path");B.setAttribute("d",z(I,A,i*.92)),B.setAttribute("fill","none"),B.setAttribute("stroke",a?"rgba(255,255,255,0.4)":"rgba(255,255,255,0.06)"),B.setAttribute("stroke-width","1.5"),C.appendChild(B);const L=document.createElementNS(o,"path");L.setAttribute("d",z(I,A,i*.95)),L.setAttribute("fill","none"),L.setAttribute("stroke",a?"rgba(160,145,120,0.2)":"rgba(255,255,255,0.04)"),L.setAttribute("stroke-width","0.8"),C.appendChild(L),l.appendChild(C)}),l}function Pe(){oe(),new MutationObserver(()=>{document.querySelectorAll(".hex-corner-svg").forEach(n=>n.remove()),oe()}).observe(document.documentElement,{attributes:!0,attributeFilter:["class"]})}function oe(){const e=document.createElement("div");e.className="hex-corner-svg hex-corner-svg--bl",e.setAttribute("aria-hidden","true"),e.appendChild(je()),document.body.insertBefore(e,document.body.firstChild);const n=document.createElement("div");n.className="hex-corner-svg hex-corner-svg--tr",n.setAttribute("aria-hidden","true"),n.appendChild(Re()),document.body.insertBefore(n,document.body.firstChild)}const Oe=["0e98bf2afda73d29f786212cd02fc542cb3307fea44f76f208f396b5fcd4ea98"];async function Fe(e,n){const i=new TextEncoder().encode(`${e}:${n}`),t=await crypto.subtle.digest("SHA-256",i);return Array.from(new Uint8Array(t)).map(a=>a.toString(16).padStart(2,"0")).join("")}async function _e(e){e.innerHTML=`
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
  `,document.getElementById("loginForm").addEventListener("submit",async s=>{s.preventDefault();const i=document.getElementById("username").value.trim().toLowerCase(),t=document.getElementById("password").value,a=await Fe(i,t);if(Oe.includes(a))sessionStorage.setItem("hive_user",JSON.stringify({name:i.charAt(0).toUpperCase()+i.slice(1),role:"admin"})),window.location.hash="#/apiary";else{const o=document.getElementById("loginError");o.textContent="Invalid username or password",o.classList.remove("hidden")}}),document.getElementById("username").focus()}function ze(e){const n=e>=80?"Strong":e>=50?"Fair":"Weak";return`<span class="inline-flex items-center gap-1.5">
    <span class="w-1.5 h-1.5 rounded-full ${e>=80?"bg-hive-sage":e>=50?"bg-hive-gold":"bg-hive-red"}"></span>
    <span class="text-[10px] font-medium uppercase tracking-wider text-hive-muted" style="font-family:Inter,sans-serif;letter-spacing:0.08em">${n}</span>
  </span>`}function $(e,n=!1,s=!1,i="#/apiary"){return`
    <header class="app-header px-5 py-3 sticky top-0 z-50" style="border-bottom: 1px solid var(--hive-border);">
      <div class="max-w-6xl mx-auto flex items-center justify-between">
        <div class="flex items-center gap-3">
          ${n?`<a href="${i}" class="text-hive-muted hover:text-hive-gold" title="Back">
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
          ${s?`<a href="#/admin" class="p-2 text-hive-muted hover:text-hive-gold" title="Settings">
            <svg class="w-[17px] h-[17px]" fill="none" stroke="currentColor" stroke-width="1.25" viewBox="0 0 24 24"><path stroke-linecap="round" stroke-linejoin="round" d="M10.325 4.317c.426-1.756 2.924-1.756 3.35 0a1.724 1.724 0 002.573 1.066c1.543-.94 3.31.826 2.37 2.37a1.724 1.724 0 001.066 2.573c1.756.426 1.756 2.924 0 3.35a1.724 1.724 0 00-1.066 2.573c.94 1.543-.826 3.31-2.37 2.37a1.724 1.724 0 00-2.573 1.066c-.426 1.756-2.924 1.756-3.35 0a1.724 1.724 0 00-2.573-1.066c-1.543.94-3.31-.826-2.37-2.37a1.724 1.724 0 00-1.066-2.573c-1.756-.426-1.756-2.924 0-3.35a1.724 1.724 0 001.066-2.573c-.94-1.543.826-3.31 2.37-2.37.996.608 2.296.07 2.572-1.065z"/><path stroke-linecap="round" stroke-linejoin="round" d="M15 12a3 3 0 11-6 0 3 3 0 016 0z"/></svg>
          </a>`:""}
          <button onclick="sessionStorage.removeItem('hive_user'); window.location.hash='#/login'" class="p-2 text-hive-muted hover:text-hive-red" title="Sign out">
            <svg class="w-[17px] h-[17px]" fill="none" stroke="currentColor" stroke-width="1.25" viewBox="0 0 24 24"><path stroke-linecap="round" stroke-linejoin="round" d="M17 16l4-4m0 0l-4-4m4 4H7m6 4v1a3 3 0 01-3 3H6a3 3 0 01-3-3V7a3 3 0 013-3h4a3 3 0 013 3v1"/></svg>
          </button>
        </div>
      </div>
    </header>`}function Ve(e){return`<span class="${{Inspection:"pill-amber",Feed:"pill-blue",Treatment:"pill-red",Harvest:"pill-green","Hive Added":"pill-green","Hive Death":"pill-red",Split:"pill-amber",Combined:"pill-blue",Converted:"pill-amber",Moved:"pill-blue",Note:"pill-blue"}[e]||"pill-amber"}">${e}</span>`}function W(e){const n=new Date(e),i=Math.floor((new Date-n)/864e5);return i===0?"Today":i===1?"Yesterday":i<7?`${i}d ago`:i<30?`${Math.floor(i/7)}w ago`:n.toLocaleDateString("en-GB",{day:"numeric",month:"short",year:i>365?"numeric":void 0})}function U(e,n,s,i=!1){return`<div class="border-b" style="border-color:var(--hive-border)">
    <button type="button" class="accordion-trigger" aria-expanded="${i}" data-accordion="${e}">
      <span class="text-sm font-medium text-hive-text">${n}</span>
      <svg class="chevron w-4 h-4 text-hive-muted" fill="none" stroke="currentColor" stroke-width="1.25" viewBox="0 0 24 24"><path stroke-linecap="round" stroke-linejoin="round" d="M19 9l-7 7-7-7"/></svg>
    </button>
    <div id="acc-${e}" class="accordion-content ${i?"open":""}">${s}</div>
  </div>`}function ge(e){e.querySelectorAll(".accordion-trigger").forEach(n=>{n.addEventListener("click",()=>{var i;const s=n.getAttribute("aria-expanded")==="true";n.setAttribute("aria-expanded",String(!s)),(i=document.getElementById("acc-"+n.dataset.accordion))==null||i.classList.toggle("open")})})}const T={edit:'<svg class="w-4 h-4" fill="none" stroke="currentColor" stroke-width="1.25" viewBox="0 0 24 24"><path stroke-linecap="round" stroke-linejoin="round" d="M11 5H6a2 2 0 00-2 2v11a2 2 0 002 2h11a2 2 0 002-2v-5m-1.414-9.414a2 2 0 112.828 2.828L11.828 15H9v-2.828l8.586-8.586z"/></svg>',flask:'<svg class="w-4 h-4" fill="none" stroke="currentColor" stroke-width="1.25" viewBox="0 0 24 24"><path stroke-linecap="round" stroke-linejoin="round" d="M19.428 15.428a2 2 0 00-1.022-.547l-2.387-.477a6 6 0 00-3.86.517l-.318.158a6 6 0 01-3.86.517L6.05 15.21a2 2 0 00-1.806.547M8 4h8l-1 1v5.172a2 2 0 00.586 1.414l5 5c1.26 1.26.367 3.414-1.415 3.414H4.828c-1.782 0-2.674-2.154-1.414-3.414l5-5A2 2 0 009 10.172V5L8 4z"/></svg>',book:'<svg class="w-4 h-4" fill="none" stroke="currentColor" stroke-width="1.25" viewBox="0 0 24 24"><path stroke-linecap="round" stroke-linejoin="round" d="M12 6.253v13m0-13C10.832 5.477 9.246 5 7.5 5S4.168 5.477 3 6.253v13C4.168 18.477 5.754 18 7.5 18s3.332.477 4.5 1.253m0-13C13.168 5.477 14.754 5 16.5 5c1.747 0 3.332.477 4.5 1.253v13C19.832 18.477 18.247 18 16.5 18c-1.746 0-3.332.477-4.5 1.253"/></svg>',heart:'<svg class="w-4 h-4" fill="none" stroke="currentColor" stroke-width="1.25" viewBox="0 0 24 24"><path stroke-linecap="round" stroke-linejoin="round" d="M4.318 6.318a4.5 4.5 0 000 6.364L12 20.364l7.682-7.682a4.5 4.5 0 00-6.364-6.364L12 7.636l-1.318-1.318a4.5 4.5 0 00-6.364 0z"/></svg>',mapPin:'<svg class="w-3.5 h-3.5" fill="none" stroke="currentColor" stroke-width="1.25" viewBox="0 0 24 24"><path stroke-linecap="round" stroke-linejoin="round" d="M17.657 16.657L13.414 20.9a1.998 1.998 0 01-2.827 0l-4.244-4.243a8 8 0 1111.314 0z"/><path stroke-linecap="round" stroke-linejoin="round" d="M15 11a3 3 0 11-6 0 3 3 0 016 0z"/></svg>',thermometer:'<svg class="w-3.5 h-3.5" fill="none" stroke="currentColor" stroke-width="1.25" viewBox="0 0 24 24"><path stroke-linecap="round" stroke-linejoin="round" d="M12 9V3m0 6a3 3 0 100 6 3 3 0 000-6zm0 6v6"/></svg>',chevron:'<svg class="w-3.5 h-3.5 text-hive-muted" fill="none" stroke="currentColor" stroke-width="1.25" viewBox="0 0 24 24"><path stroke-linecap="round" stroke-linejoin="round" d="M9 5l7 7-7 7"/></svg>'},We="https://093c0f3bca66ea3daf04bcc8a98c06.10.environment.api.powerplatform.com:443/powerautomate/automations/direct/workflows/64df8c23e1f548e9a7888164706e316c/triggers/manual/paths/invoke?api-version=1&sp=%2Ftriggers%2Fmanual%2Frun&sv=1.0&sig=EeX8QCqqiPt7LsuoR44C2Cah6jwu_6jBcT0901ePSd8";async function Ue(){const e=await fetch(We);if(!e.ok)throw new Error(`Telemetry fetch failed: HTTP ${e.status}`);return(await e.json()).map(s=>({weight:s.gr_weight,internalTemp:s.gr_internaltemp,batteryVoltage:s.gr_batteryvoltage,hiveHum:s.gr_hivehum,legTemp:s.gr_legtemp,timestamp:s.gr_readingtimestamp||s.createdon})).sort((s,i)=>new Date(s.timestamp)-new Date(i.timestamp))}const M={name:"Home Apiary",location:"Kidmore End, Reading RG4 9AY, UK",lat:51.509,lng:-.975};function Y(){return[{id:"a1",date:"2025-09-26",type:"Inspection",hive:"Hive 1 - Obsidian",strength:100,queenSeen:!1,broodSpotted:!1,notes:"Left 15.83 Right 15.43"},{id:"a2",date:"2025-09-26",type:"Inspection",hive:"Hive 2 - BMH",strength:100,queenSeen:!1,broodSpotted:!1,notes:"Left 15.46 right 13.90"},{id:"a3",date:"2025-09-26",type:"Inspection",hive:"Hive 4 - Carly",strength:71,queenSeen:!1,broodSpotted:!1,notes:"Left 12.98 right 13.04"},{id:"a4",date:"2025-09-26",type:"Inspection",hive:"Hive 5 - Survivor",strength:100,queenSeen:!1,broodSpotted:!1,notes:"16.39 left 15.81 right"},{id:"a5",date:"2025-09-26",type:"Inspection",hive:"Hive 6 - Backup",strength:100,queenSeen:!1,broodSpotted:!1,notes:"7.66 left 7.27 right"},{id:"a6",date:"2025-09-08",type:"Inspection",hive:"Hive 4 - Carly",strength:71,queenSeen:!1,broodSpotted:!0,notes:"There is a queen but couldn't find her. They were active but need to be fed and assessed after winter."},{id:"a7",date:"2025-09-08",type:"Inspection",hive:"Hive 1 - Obsidian",strength:100,queenSeen:!0,broodSpotted:!0,notes:"F1 - stores 70% F2- Stores 50% F3- eggs brood stores 40% F4 - brood, eggs, queen stores 20%..."},{id:"a8",date:"2025-09-08",type:"Inspection",hive:"Hive 5 - Survivor",strength:100,queenSeen:!1,broodSpotted:!1,notes:"Lots of bees with stores but will need feeding still. Queen spotted and could see brood larve and eggs."},{id:"a9",date:"2025-09-08",type:"Inspection",hive:"Hive 6 - Backup",strength:100,queenSeen:!0,broodSpotted:!0,notes:"F1 - stores 10% F2 - brood and larve stores 20% F3 - Brood stores 40%..."},{id:"a10",date:"2025-09-08",type:"Inspection",hive:"Hive 2 - BMH",strength:100,queenSeen:!0,broodSpotted:!0,notes:"F1 - stores 10% F2 - stores 10% F3 - stores 30%... queen larve eggs tiny brood."},{id:"a11",date:"2025-09-05",type:"Inspection",hive:"Hive 6 - Backup",strength:100,queenSeen:!1,broodSpotted:!1,notes:"Left 6.69 Right 7.32"},{id:"a12",date:"2025-09-05",type:"Inspection",hive:"Hive 5 - Survivor",strength:100,queenSeen:!1,broodSpotted:!1,notes:"Left 12.76 right 11.55"},{id:"a13",date:"2025-09-05",type:"Inspection",hive:"Hive 2 - BMH",strength:100,queenSeen:!1,broodSpotted:!1,notes:"Left 12.66 Right 12.37"},{id:"a14",date:"2025-09-05",type:"Inspection",hive:"Hive 1 - Obsidian",strength:100,queenSeen:!1,broodSpotted:!1,notes:"Left 14.39 Right 13.93"},{id:"a15",date:"2025-08-25",type:"Inspection",hive:"Hive 6 - Backup",strength:100,queenSeen:!1,broodSpotted:!1,notes:"Left 5.71 Right 6.45 added feed"},{id:"a16",date:"2025-08-25",type:"Inspection",hive:"Hive 5 - Survivor",strength:100,queenSeen:!1,broodSpotted:!1,notes:"Left 12.75 Right 11.03 added feed"},{id:"a17",date:"2025-08-25",type:"Inspection",hive:"Hive 2 - BMH",strength:100,queenSeen:!1,broodSpotted:!1,notes:"Left 12.09 Right 11.66 added feed"},{id:"a18",date:"2025-08-25",type:"Inspection",hive:"Hive 1 - Obsidian",strength:100,queenSeen:!1,broodSpotted:!1,notes:"Left 13.33 Right 12.61 added more feed"},{id:"a19",date:"2025-08-17",type:"Inspection",hive:"Hive 1 - Obsidian",strength:100,queenSeen:!1,broodSpotted:!1,notes:"Super off and feeder added"},{id:"a20",date:"2025-08-17",type:"Inspection",hive:"Hive 2 - BMH",strength:100,queenSeen:!1,broodSpotted:!1,notes:"Super off and feeders added"},{id:"a21",date:"2025-08-17",type:"Inspection",hive:"Hive 5 - Survivor",strength:100,queenSeen:!1,broodSpotted:!1,notes:"Supers off and feeder added"},{id:"a22",date:"2025-08-17",type:"Inspection",hive:"Hive 6 - Backup",strength:100,queenSeen:!0,broodSpotted:!0,notes:"Bit light for winter so added feeder and will start to feed"},{id:"a23",date:"2025-07-28",type:"Inspection",hive:"Hive 1 - Obsidian",strength:100,queenSeen:!0,broodSpotted:!0,notes:"Built up well. Removed a super to help them finish off and condense down."},{id:"a24",date:"2025-07-28",type:"Inspection",hive:"Hive 2 - BMH",strength:100,queenSeen:!0,broodSpotted:!0,notes:"Doing really well. Removed one super condense them down."},{id:"a25",date:"2025-07-28",type:"Inspection",hive:"Hive 4 - Carly",strength:100,queenSeen:!1,broodSpotted:!1,notes:"No queen. Loads of stores and still horrid."},{id:"a26",date:"2025-07-28",type:"Inspection",hive:"Hive 5 - Survivor",strength:100,queenSeen:!0,broodSpotted:!0,notes:"Doing really well. Supers swapped about so they can finish capping."},{id:"a27",date:"2025-07-28",type:"Inspection",hive:"Hive 6 - Backup",strength:100,queenSeen:!0,broodSpotted:!0,notes:"Queen found. Clipped and marked. She is laying and they are building up."},{id:"a28",date:"2025-06-30",type:"Inspection",hive:"Hive 4 - Carly",strength:100,queenSeen:!0,broodSpotted:!1,notes:"Let queen out of cage"},{id:"a29",date:"2025-06-25",type:"Hive Added",hive:"Hive 6 - Backup",strength:null,queenSeen:!1,broodSpotted:!1,notes:"Made from BMH buckfast"},{id:"a30",date:"2025-06-25",type:"Inspection",hive:"Hive 2 - BMH",strength:100,queenSeen:!0,broodSpotted:!0,notes:"Good temper and very productive. Took 1 frame nuc off them as insurance policy"},{id:"a31",date:"2025-06-25",type:"Inspection",hive:"Hive 1 - Obsidian",strength:100,queenSeen:!0,broodSpotted:!0,notes:"All doing good. Slightly up in face but not to bad."},{id:"a32",date:"2025-06-25",type:"Inspection",hive:"Hive 5 - Survivor",strength:100,queenSeen:!0,broodSpotted:!0,notes:"Added in super"},{id:"a33",date:"2025-06-20",type:"Inspection",hive:"Hive 4 - Carly",strength:100,queenSeen:!0,broodSpotted:!0,notes:"Ripped down QC and placed new queen in from mating nuc in the queen cage."},{id:"a34",date:"2025-06-17",type:"Inspection",hive:"Hive 5 - Survivor",strength:100,queenSeen:!0,broodSpotted:!0,notes:"Going really well. Stores in brood box that could move up."},{id:"a35",date:"2025-06-17",type:"Inspection",hive:"Hive 2 - BMH",strength:100,queenSeen:!0,broodSpotted:!0,notes:"Growing well added 2x supers for the coming flow."},{id:"a36",date:"2025-06-17",type:"Inspection",hive:"Nuc 1 - Obsidian",strength:100,queenSeen:!0,broodSpotted:!0,notes:"All looking good and added 2x supers."},{id:"a37",date:"2025-06-13",type:"Inspection",hive:"Hive 4 - Carly",strength:82,queenSeen:!0,broodSpotted:!0,notes:"Queen and 4 shakes off bees taken to remove her to Johnny."},{id:"a38",date:"2025-06-03",type:"Inspection",hive:"Hive 1 - Obsidian",strength:100,queenSeen:!0,broodSpotted:!0,notes:"2 Queen cells spotted and charged with some empty. Found, marked/clipped queen."},{id:"a39",date:"2025-06-03",type:"Inspection",hive:"Hive 2 - BMH",strength:100,queenSeen:!0,broodSpotted:!0,notes:"Doing well needs a super asap."},{id:"a40",date:"2025-06-03",type:"Inspection",hive:"Hive 5 - Survivor",strength:100,queenSeen:!0,broodSpotted:!0,notes:"Building out well on the plastic frames."}]}function Ye(){const e=Y(),n={};for(const s of e)n[s.date]||(n[s.date]=[]),n[s.date].push(s);return Object.entries(n).sort(([s],[i])=>new Date(i)-new Date(s)).map(([s,i])=>({date:s,items:i,count:i.length}))}function Ge(e){return Y().filter(n=>n.hive===e)}const K=[{id:"hive-roof",name:"Roof",color:"#7a8078",height:14,category:"structure",nuc:!1},{id:"hive-floor",name:"Floor",color:"#8B8580",height:10,category:"structure",nuc:!1},{id:"hive-stand",name:"Hive Stand",color:"#A09080",height:22,category:"structure",nuc:!1},{id:"super",name:"Super",color:"#90968b",height:30,category:"box",nuc:!1},{id:"national-brood",name:"National Brood",color:"#90968b",height:45,category:"box",nuc:!1},{id:"14x12-brood",name:"14x12 Brood",color:"#90968b",height:63,category:"box",nuc:!1},{id:"queen-excluder",name:"Queen Excluder",color:"#BFA67A",height:6,category:"accessory",nuc:!1},{id:"hive-eke",name:"Hive Eke",color:"#A89068",height:18,category:"accessory",nuc:!1},{id:"nuc-roof",name:"Nuc Roof",color:"#7a8078",height:12,category:"structure",nuc:!0},{id:"nuc-floor",name:"Nuc Floor",color:"#8B8580",height:8,category:"structure",nuc:!0},{id:"nuc-stand",name:"Nuc Stand",color:"#A09080",height:20,category:"structure",nuc:!0},{id:"nuc-brood",name:"Nuc Brood Box",color:"#90968b",height:40,category:"box",nuc:!0},{id:"nuc-super",name:"Nuc Super",color:"#90968b",height:26,category:"box",nuc:!0},{id:"nuc-eke",name:"Nuc Eke",color:"#A89068",height:14,category:"accessory",nuc:!0}],Qe=["Swarm","Local","Home Bred","Buckfast","Native Black Bee","Carniolan","Italian","F1 Buckfast","Premium F1 Buckfast","UK F1 Buckfast","Premium UK F1 Buckfast","VSH Buckfast","UK Mated VSH Buckfast","Obsidian","Unknown"],Je=["National","14x12","Commercial","Langstroth","WBC","Top Bar","Poly","Other"],Ke=["Bred","Purchased","Swarm","Supersedure","Emergency Cell","Gift","Split","Unknown"],Ze=["Blue","White","Yellow","Red","Green","Pink"],be="apiary_hives_v2";function q(){const e=localStorage.getItem(be);return e?JSON.parse(e):[{id:"hive-1",hiveName:"Hive 1 - Obsidian",type:"Hive",hiveStyle:"14x12",status:"Active",strength:100,beeType:"Buckfast",color:"#f59e0b",queenMarked:!0,queenColor:"Green",queenYear:2024,queenClipped:!0,queenSource:"Bred",queenAddedDate:"2024-06-03",queenNotes:"Found, marked & clipped Jun 2025",dateAdded:"2025-05-16",orientation:"vertical",components:[{type:"hive-roof"},{type:"super"},{type:"queen-excluder"},{type:"14x12-brood"},{type:"hive-floor"},{type:"hive-stand"}]},{id:"hive-2",hiveName:"Hive 2 - BMH",type:"Hive",hiveStyle:"14x12",status:"Active",strength:100,beeType:"Buckfast",color:"#ef4444",queenMarked:!0,queenColor:"Pink",queenYear:2024,queenClipped:!1,queenSource:"Purchased",queenAddedDate:"2024-05-01",queenNotes:"",dateAdded:"2025-04-27",orientation:"vertical",components:[{type:"hive-roof"},{type:"super"},{type:"super"},{type:"queen-excluder"},{type:"14x12-brood"},{type:"hive-floor"},{type:"hive-stand"}]},{id:"hive-4",hiveName:"Hive 4 - Carly",type:"Hive",hiveStyle:"National",status:"Active",strength:71,beeType:"Local",color:"#a78bfa",queenMarked:!1,queenColor:null,queenYear:2025,queenClipped:!1,queenSource:"Purchased",queenAddedDate:"2025-06-20",queenNotes:"New queen caged Jun 20, released Jun 30",dateAdded:"2025-05-12",orientation:"vertical",components:[{type:"hive-roof"},{type:"national-brood"},{type:"hive-floor"},{type:"hive-stand"}]},{id:"hive-5",hiveName:"Hive 5 - Survivor",type:"Hive",hiveStyle:"14x12",status:"Active",strength:100,beeType:"Local",color:"#3b82f6",queenMarked:!1,queenColor:null,queenYear:2023,queenClipped:!1,queenSource:"Swarm",queenAddedDate:"2023-08-31",queenNotes:"",dateAdded:"2023-08-31",orientation:"vertical",components:[{type:"hive-roof"},{type:"super"},{type:"queen-excluder"},{type:"14x12-brood"},{type:"hive-floor"},{type:"hive-stand"}]},{id:"hive-6",hiveName:"Hive 6 - Backup",type:"Hive",hiveStyle:"14x12",status:"Active",strength:100,beeType:"Buckfast",color:"#22c55e",queenMarked:!0,queenColor:"Blue",queenYear:2025,queenClipped:!0,queenSource:"Split",queenAddedDate:"2025-06-25",queenNotes:"Made from BMH buckfast. Clipped & marked Jul 28.",dateAdded:"2025-06-25",orientation:"vertical",components:[{type:"hive-roof"},{type:"14x12-brood"},{type:"hive-floor"},{type:"hive-stand"}]},{id:"nuc-1",hiveName:"Nuc 1 - Obsidian",type:"Nuc",hiveStyle:"National",status:"Active",strength:100,beeType:"Buckfast",color:"#06b6d4",queenMarked:!1,queenColor:null,queenYear:2025,queenClipped:!1,queenSource:"Unknown",queenAddedDate:null,queenNotes:"",dateAdded:"2025-05-16",orientation:"vertical",components:[{type:"nuc-roof"},{type:"nuc-brood"},{type:"nuc-floor"},{type:"nuc-stand"}]}]}function R(e){localStorage.setItem(be,JSON.stringify(e))}function P(){return q()}function N(e){return q().find(n=>n.id===e)}function ye(e){const n=q();return e.id="hive-"+Date.now(),e.dateAdded=new Date().toISOString().slice(0,10),e.status="Active",n.push(e),R(n),e}function G(e,n){const s=q(),i=s.findIndex(t=>t.id===e);return i===-1?null:(s[i]={...s[i],...n},R(s),s[i])}function Xe(e){const n=q().filter(s=>s.id!==e);R(n)}function et(e,n,s){const i=q(),t=i.find(o=>o.id===e);if(!t)return;t.components||(t.components=[]);const a=Math.max(0,t.components.length-1);t.components.splice(a,0,{type:n}),R(i)}function ae(e,n){const s=q(),i=s.find(t=>t.id===e);!i||!i.components||(i.components.splice(n,1),R(s))}function le(e,n,s){const i=q(),t=i.find(o=>o.id===e);if(!t||!t.components||s<0||s>=t.components.length)return;const[a]=t.components.splice(n,1);t.components.splice(s,0,a),R(i)}const we="apiary_activity";function ke(){const e=localStorage.getItem(we);return e?JSON.parse(e):[]}function tt(e){localStorage.setItem(we,JSON.stringify(e))}function D(e){const n=ke();n.unshift({...e,date:e.date||new Date().toISOString().slice(0,10)}),tt(n)}function st(e,n,s){const i=N(e);if(!i)return null;const t=ye({hiveName:n,type:"Nuc",hiveStyle:i.hiveStyle,beeType:i.beeType,color:"#06b6d4",strength:50,queenMarked:!1,queenColor:null,queenYear:new Date().getFullYear(),orientation:"vertical",components:[{type:"nuc-roof"},{type:"nuc-brood"},{type:"nuc-floor"},{type:"nuc-stand"}]});return D({type:"Split",hive:i.hiveName,notes:`Split made — new nuc "${n}" created. ${s||""}`.trim(),strength:i.strength,queenSeen:!1,broodSpotted:!1}),D({type:"Split",hive:n,notes:`Split from ${i.hiveName}. ${s||""}`.trim(),strength:50,queenSeen:!1,broodSpotted:!1}),t}function nt(e,n,s){const i=N(e),t=N(n);!i||!t||(D({type:"Combined",hive:i.hiveName,notes:`Combined with ${t.hiveName}. ${s||""}`.trim(),strength:i.strength,queenSeen:!1,broodSpotted:!1}),D({type:"Combined",hive:t.hiveName,notes:`Combined into ${i.hiveName}. Hive deactivated. ${s||""}`.trim(),strength:0,queenSeen:!1,broodSpotted:!1}),G(n,{status:"Combined"}))}function it(e,n){const s=N(e);s&&(D({type:"Hive Death",hive:s.hiveName,notes:n||"Colony died out.",strength:0,queenSeen:!1,broodSpotted:!1}),G(e,{status:"Dead",strength:0}))}function ot(e,n,s){const i=N(e);i&&D({type:"Moved",hive:i.hiveName,notes:`Moved to ${n}. ${s||""}`.trim(),strength:i.strength,queenSeen:!1,broodSpotted:!1})}const at={"hive-roof":"nuc-roof","hive-floor":"nuc-floor","hive-stand":"nuc-stand",super:"nuc-super","national-brood":"nuc-brood","14x12-brood":"nuc-brood","hive-eke":"nuc-eke"},lt={"nuc-roof":"hive-roof","nuc-floor":"hive-floor","nuc-stand":"hive-stand","nuc-brood":"national-brood","nuc-super":"super","nuc-eke":"hive-eke"};function rt(e,n){const s=N(e);if(!s)return null;const i=s.type==="Hive",t=i?at:lt,a=i?"Nuc":"Hive",o=(s.components||[]).map(d=>{if(i&&d.type==="queen-excluder")return null;const c=t[d.type];return c?{type:c}:d}).filter(Boolean),l=i?"Downsized to Nuc":"Upgraded to Hive";return D({type:"Converted",hive:s.hiveName,notes:`${l}. ${n||""}`.trim(),strength:s.strength,queenSeen:!1,broodSpotted:!1}),G(e,{type:a,components:o}),N(e)}function Se(){return ke()}const $e="apiary_notes";function j(){const e=localStorage.getItem($e);return e?JSON.parse(e):[{id:"n1",text:"157c oxalic acid 2:1 sugar syrup in metric is 1.6kg to 1L",date:"2024-07-14",pinned:!0,deleted:!1},{id:"n2",text:"Spring inspection schedule begins mid-March",date:"2025-03-01",pinned:!1,deleted:!1}]}function O(e){localStorage.setItem($e,JSON.stringify(e))}function Ce(e=!1){return j().filter(n=>e||!n.deleted)}function dt(e){const n=j(),s=n.find(i=>i.id===e);s&&(s.pinned=!s.pinned,O(n))}function ct(e){const n=j(),s=n.find(i=>i.id===e);s&&(s.deleted=!0,O(n))}function ut(e,n){const s=j(),i=s.find(t=>t.id===e);i&&(i.text=n,i.date=new Date().toISOString().slice(0,10),O(s))}function vt(e,n=null){const s=j();s.unshift({id:"n"+Date.now(),text:e,date:new Date().toISOString().slice(0,10),pinned:!1,deleted:!1,hiveId:n}),O(s)}function pt(e){return j().find(n=>n.hiveId===e&&!n.deleted)||null}function re(e,n){const s=j(),i=s.find(t=>t.hiveId===e&&!t.deleted);i?n?(i.text=n,i.date=new Date().toISOString().slice(0,10),i.pinned=!0):i.deleted=!0:n&&s.unshift({id:"n"+Date.now(),text:n,date:new Date().toISOString().slice(0,10),pinned:!0,deleted:!1,hiveId:e}),O(s)}const Ee="apiary_tasks";function Q(){const e=localStorage.getItem(Ee);return e?JSON.parse(e):[{id:"t1",text:"Spring varroa check all hives",done:!1,due:"2026-03-20",deleted:!1},{id:"t2",text:"Order new frames for Hive 4",done:!1,due:"2026-04-01",deleted:!1},{id:"t3",text:"Check fondant levels",done:!0,due:"2026-03-15",deleted:!1},{id:"t4",text:"Assemble new nuc boxes",done:!1,due:"2026-04-10",deleted:!1}]}function se(e){localStorage.setItem(Ee,JSON.stringify(e))}function Be(e=!1){const n=Q().filter(s=>!s.deleted);return e?n:n.filter(s=>!s.done)}function He(e){const n=Q(),s=n.find(i=>i.id===e);s&&(s.done=!s.done,se(n))}function ht(e){const n=Q(),s=n.find(i=>i.id===e);s&&(s.deleted=!0,se(n))}function mt(e,n){const s=Q();s.unshift({id:"t"+Date.now(),text:e,done:!1,due:n,deleted:!1}),se(s)}function ft(){return[{id:"esp32-1",name:"ESP32 Hive Scale",type:"ESP32",location:"Hive 5 - Survivor",status:"Online",battery:4.1,lastSeen:"2026-03-18T09:30:00Z",firmware:"v1.0.0",ip:"192.168.1.45"},{id:"sb-inside",name:"SwitchBot Inside",type:"SwitchBot",location:"Hive 5 - Survivor (inside)",status:"Online",battery:87,lastSeen:"2026-03-18T09:25:00Z",temp:32.5,humidity:68},{id:"sb-outside",name:"SwitchBot Outside",type:"SwitchBot",location:"Apiary (ambient)",status:"Online",battery:92,lastSeen:"2026-03-18T09:28:00Z",temp:14.2,humidity:55}]}const Z=140,X=70;function ne(e){return K.find(n=>n.id===e)}function Ie(e){return e.some(n=>{const s=ne(n.type);return s&&s.nuc})}function xt(e){return{"nuc-roof":14,"nuc-floor":10,"nuc-stand":22,"nuc-brood":45,"nuc-super":30,"nuc-eke":18}[e.id]||e.height}function ie(e=[],n={}){const{size:s="md",interactive:i=!1,hiveId:t=""}=n,a=s==="sm"?.5:s==="lg"?1.2:.8,o=Ie(e),l=Math.round((o?X:Z)*a),d=Math.round((o?X+40:Z+40)*a);if(!e.length)return`<div class="flex flex-col items-center" style="width:${d}px">
      <div class="text-gray-600 text-xs text-center py-4">No components</div>
    </div>`;let c=`<div class="flex flex-col items-center" style="width:${d}px">`;return e.forEach((p,v)=>{const m=ne(p.type);if(!m)return;const h=Math.round(m.height*a),r=m.id.includes("roof"),u=m.id.includes("stand"),g=m.id.includes("floor"),y=m.category==="accessory";if(r)c+=`<div class="relative" style="width:${l+Math.round(8*a)}px; height:${h}px">
        <div class="absolute inset-0 rounded-t-md" style="background:${m.color}"></div>
        <div class="absolute bottom-0 left-0.5 right-0.5 h-px" style="background:#991b1b"></div>
      </div>`;else if(g)c+=`<div style="width:${l+Math.round(4*a)}px; height:${h}px; background:${m.color}; border-radius: 0 0 2px 2px"></div>`;else if(u){const w=Math.max(2,Math.round(3*a));c+=`<div class="flex justify-between" style="width:${l+Math.round(12*a)}px; height:${h}px">
        <div style="width:${w}px; background:${m.color}; height:${h}px; border-radius: 0 0 2px 2px"></div>
        <div class="flex-1 mx-0.5" style="background:${m.color}; height:${Math.round(h*.3)}px; border-radius: 0 0 2px 2px"></div>
        <div style="width:${w}px; background:${m.color}; height:${h}px; border-radius: 0 0 2px 2px"></div>
      </div>`}else if(y){const w=Math.max(7,Math.round(8*a));c+=`<div class="relative flex items-center justify-center" style="width:${l}px; height:${h}px; background:${m.color}">
        <span class="text-white/60 font-medium text-center leading-tight" style="font-size:${w}px">${m.name}</span>
        ${i?de(t,v):""}
      </div>`}else{const w=Math.max(8,Math.round(10*a));c+=`<div class="relative flex items-center justify-center" style="width:${l}px; height:${h}px; background:${m.color}; border-left:2px solid rgba(0,0,0,0.12); border-right:2px solid rgba(0,0,0,0.12)">
        <span class="text-white font-semibold text-center leading-tight" style="font-size:${w}px; text-shadow:0 1px 2px rgba(0,0,0,0.3)">${m.name}</span>
        ${i?de(t,v):""}
      </div>`}}),c+="</div>",c}function de(e,n){return`<button onclick="document.dispatchEvent(new CustomEvent('hive-remove-component', {detail:{hiveId:'${e}',index:${n}}}))" class="absolute top-0 right-0.5 text-white/40 hover:text-white text-xs leading-none p-0.5" title="Remove">✕</button>`}function Ae(e=[],n="#f59e0b"){if(!e||!e.length)return'<div class="w-full h-full flex items-center justify-center text-3xl">🏠</div>';const s=.35,i=Ie(e),t=Math.round((i?X:Z)*s);let a='<div class="flex flex-col items-center justify-end h-full py-1">';return e.forEach(o=>{const l=ne(o.type);if(!l)return;const d=i?xt(l):l.height,c=Math.round(d*s);l.id.includes("roof")?a+=`<div class="rounded-t" style="width:${t+3}px; height:${c}px; background:${l.color}"></div>`:l.id.includes("stand")?a+=`<div class="flex justify-between" style="width:${t+6}px; height:${c}px">
        <div style="width:1px; background:${l.color}; height:${c}px"></div>
        <div class="flex-1 mx-px" style="background:${l.color}; height:${Math.round(c*.3)}px"></div>
        <div style="width:1px; background:${l.color}; height:${c}px"></div>
      </div>`:l.id.includes("floor")?a+=`<div style="width:${t+2}px; height:${Math.max(2,c)}px; background:${l.color}"></div>`:l.category==="accessory"?a+=`<div style="width:${t}px; height:${Math.max(2,c)}px; background:${l.color}"></div>`:a+=`<div style="width:${t}px; height:${c}px; background:${l.color}; border-left:1px solid rgba(0,0,0,0.12); border-right:1px solid rgba(0,0,0,0.12)"></div>`}),a+="</div>",a}const gt={0:"Clear Sky",1:"Mainly Clear",2:"Partly Cloudy",3:"Overcast",45:"Foggy",48:"Rime Fog",51:"Light Drizzle",53:"Drizzle",55:"Heavy Drizzle",61:"Light Rain",63:"Rain",65:"Heavy Rain",71:"Light Snow",73:"Snow",75:"Heavy Snow",77:"Snow Grains",80:"Light Showers",81:"Showers",82:"Heavy Showers",85:"Light Snow Showers",86:"Snow Showers",95:"Thunderstorm",96:"Thunderstorm + Hail",99:"Thunderstorm + Heavy Hail"};let V=null,ce=0;const bt=10*60*1e3;async function Ne(e,n){if(V&&Date.now()-ce<bt)return V;const s=`https://api.open-meteo.com/v1/forecast?latitude=${e}&longitude=${n}&current=temperature_2m,relative_humidity_2m,weather_code,wind_speed_10m&timezone=auto`,i=await fetch(s);if(!i.ok)throw new Error(`Weather API: HTTP ${i.status}`);const a=(await i.json()).current,o=a.weather_code;return V={temp:Math.round(a.temperature_2m),conditions:gt[o]||`Code ${o}`,humidity:a.relative_humidity_2m,windSpeed:Math.round(a.wind_speed_10m),icon:yt(o)},ce=Date.now(),V}function yt(e){return e===0||e===1?"☀️":e===2?"⛅":e===3?"☁️":e>=45&&e<=48?"🌫️":e>=51&&e<=55?"🌦️":e>=61&&e<=65?"🌧️":e>=71&&e<=77?"🌨️":e>=80&&e<=82?"🌦️":e>=85&&e<=86?"🌨️":e>=95?"⛈️":"🌤️"}async function wt(e){const n=P(),s=Ye(),i=Ce(),t=Be(),a=n.filter(o=>o.status==="Active");e.innerHTML=`
    ${$(M.name,!1,!0)}

    <main class="max-w-6xl mx-auto pb-8 hex-bg">

      <!-- Location & Weather -->
      <section class="px-5 py-4">
        <div class="flex items-center gap-5 text-sm">
          <span class="flex items-center gap-1.5 text-hive-muted">${T.mapPin}<span class="text-hive-text text-xs">${M.location}</span></span>
          <span class="flex items-center gap-1.5 text-hive-muted">${T.thermometer}<span id="liveWeather" class="text-hive-text text-xs">Loading...</span></span>
        </div>
      </section>

      <!-- Quick Actions -->
      <section class="px-5 mb-6">
        <div class="flex gap-2">
          <a href="#/inspect" class="btn-action">${T.edit}<span>Inspect</span></a>
          <a href="#/inspect?type=harvest" class="btn-action">${T.flask}<span>Harvest</span></a>
          <a href="#/inspect?type=feed" class="btn-action">${T.book}<span>Feed</span></a>
          <a href="#/inspect?type=treatment" class="btn-action">${T.heart}<span>Treat</span></a>
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
                <div class="w-full h-24 flex items-end justify-center mb-3">${Ae(o.components,o.color)}</div>
                <h3 class="font-serif text-sm font-medium text-hive-text text-center leading-tight mb-1.5">${o.hiveName}</h3>
                <div class="mb-1">${ze(o.strength)}</div>
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
            ${i.filter(o=>o.pinned&&!o.deleted).slice(0,3).map(o=>`
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
            ${t.map(o=>`
              <label class="flex items-center gap-3 cursor-pointer task-item" data-task-id="${o.id}">
                <input type="checkbox" class="w-4 h-4 rounded accent-[var(--hive-gold)] task-check" data-task="${o.id}">
                <span class="text-sm flex-1 text-hive-text">${o.text}</span>
                <span class="text-[10px] uppercase tracking-wider text-hive-gold">${W(o.due)}</span>
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
          ${s.slice(0,5).map(o=>`
            <a href="#/inspections?date=${o.date}" class="card flex items-center gap-3 p-4 block">
              <div class="timeline-dot">
                <svg class="w-3 h-3 text-hive-gold" fill="none" stroke="currentColor" stroke-width="1.25" viewBox="0 0 24 24"><path stroke-linecap="round" stroke-linejoin="round" d="M9 5H7a2 2 0 00-2 2v12a2 2 0 002 2h10a2 2 0 002-2V7a2 2 0 00-2-2h-2M9 5a2 2 0 002 2h2a2 2 0 002-2"/></svg>
              </div>
              <div class="flex-1">
                <div class="text-sm text-hive-text">${o.count} inspection${o.count>1?"s":""}</div>
                <div class="text-[11px] text-hive-muted">${new Date(o.date).toLocaleDateString("en-GB",{month:"short",day:"numeric",year:"numeric"})}</div>
              </div>
              ${T.chevron}
            </a>
          `).join("")}
        </div>
      </section>

    </main>
  `,Ne(M.lat,M.lng).then(o=>{const l=document.getElementById("liveWeather");l&&(l.textContent=`${o.temp}°C ${o.conditions}`)}).catch(()=>{const o=document.getElementById("liveWeather");o&&(o.textContent="—")}),document.querySelectorAll(".task-check").forEach(o=>{o.addEventListener("change",()=>{const l=o.dataset.task;He(l);const d=o.closest(".task-item");d&&(d.style.opacity="0.3",d.style.textDecoration="line-through",setTimeout(()=>d.remove(),600))})})}async function ee(e,n){var u,g,y,w,k,S,H,I,A,f,C;const s=n.id,t=P().find(x=>x.hiveName===s),a=[...Ge(s),...Se().filter(x=>x.hive===s)].sort((x,b)=>new Date(b.date)-new Date(x.date));if(!t){e.innerHTML=`
      ${$("Not Found",!0)}
      <div class="max-w-6xl mx-auto p-4 text-center py-16">
        <div class="text-5xl mb-4">🔍</div>
        <p class="text-hive-muted text-lg">Hive not found</p>
        <a href="#/apiary" class="btn-primary inline-block mt-6">Back to Apiary</a>
      </div>`;return}const o=t.strength>=80?"#22c55e":t.strength>=50?"#f59e0b":"#ef4444",l=t.queenYear?new Date().getFullYear()-t.queenYear:null,d=a.filter(x=>x.type==="Inspection"),c=d.length?new Date(d[0].date):null,p=c?Math.floor((new Date-c)/864e5):null,v=pt(t.id);e.innerHTML=`
    ${$(t.hiveName,!0)}

    <main class="max-w-6xl mx-auto pb-24">

      <!-- Hero Card -->
      <section class="p-4">
        <div class="rounded-2xl overflow-hidden" style="background: var(--hive-surface)">
          <div class="flex items-center justify-center py-6">
            ${ie(t.components||[],{size:"md"})}
          </div>
          <!-- Strength bar under image, like HiveBloom -->
          <div class="h-2 w-full" style="background: ${o}"></div>
        </div>

        <div class="mt-4 flex items-center justify-between">
          <div>
            <h2 class="text-xl font-bold text-hive-text">${t.hiveName}</h2>
            <div class="flex items-center gap-2 mt-2 flex-wrap">
              <span class="pill-amber">${t.beeType}</span>
              <span class="${t.type==="Nuc"?"pill-blue":"pill-orange"}">${t.type}</span>
              ${t.hiveStyle?`<span class="pill-blue">${t.hiveStyle}</span>`:""}
              <span class="pill-green">${t.status}</span>
              <a href="#/hive-form/${t.id}" class="pill text-xs bg-hive-surface text-hive-muted hover:text-hive-amber">+ Edit</a>
            </div>
          </div>
          <div class="text-right">
            <div class="text-3xl font-bold" style="color: ${o}">${t.strength}%</div>
            <div class="text-xs text-hive-muted">Strength</div>
          </div>
        </div>
      </section>

      <!-- Queen Detail Card -->
      <section class="px-4 mb-4">
        <div class="card-surface">
          <div class="flex items-center justify-between mb-3">
            <div class="section-subtitle">Queen Details</div>
            <a href="#/hive-form/${t.id}" class="text-[10px] uppercase tracking-wider text-hive-gold hover:opacity-80" style="font-family:Inter,sans-serif">Edit</a>
          </div>
          <div class="grid grid-cols-2 gap-x-4 gap-y-2">
            <div class="flex items-center gap-2">
              ${t.queenMarked?`<span class="w-3 h-3 rounded-full flex-shrink-0" style="background: ${t.queenColor==="Green"?"var(--hive-sage)":t.queenColor==="Pink"?"#ec4899":t.queenColor==="Blue"?"var(--hive-blue)":t.queenColor==="Yellow"?"#eab308":t.queenColor==="Red"?"var(--hive-red)":t.queenColor==="White"?"#e5e7eb":"var(--hive-muted)"}"></span><span class="text-sm text-hive-text">${t.queenColor} marked</span>`:'<span class="text-sm text-hive-muted">Unmarked</span>'}
            </div>
            <div class="text-sm">
              ${t.queenClipped?'<span class="text-hive-text">Clipped</span>':'<span class="text-hive-muted">Not clipped</span>'}
            </div>
            <div>
              <span class="text-xs text-hive-muted">Age</span>
              <div class="text-sm text-hive-text">${l!==null?`${l}yr (${t.queenYear})`:"Unknown"}</div>
            </div>
            <div>
              <span class="text-xs text-hive-muted">Source</span>
              <div class="text-sm text-hive-text">${t.queenSource||"Unknown"}</div>
            </div>
            <div>
              <span class="text-xs text-hive-muted">Added</span>
              <div class="text-sm text-hive-text">${t.queenAddedDate?new Date(t.queenAddedDate).toLocaleDateString("en-GB",{day:"numeric",month:"short",year:"numeric"}):"—"}</div>
            </div>
            <div>
              <span class="text-xs text-hive-muted">Breed</span>
              <div class="text-sm text-hive-text">${t.beeType}</div>
            </div>
          </div>
          ${t.queenNotes?`<div class="mt-3 pt-2 border-t" style="border-color:var(--hive-border)"><p class="text-xs text-hive-muted italic">${t.queenNotes}</p></div>`:""}
        </div>
      </section>

      <!-- Info Grid -->
      <section class="px-4 grid grid-cols-2 gap-3 mb-4">
        <a href="#/inspections" class="card-surface block">
          <div class="section-subtitle mb-2">Inspections</div>
          <span class="text-lg font-serif font-medium text-hive-text">${d.length}</span>
          <span class="text-xs text-hive-muted block">since Jun 2025</span>
        </a>

        <div class="card-surface">
          <div class="section-subtitle mb-2">Days Since</div>
          <span class="text-lg font-serif font-medium ${p!==null&&p>10?"text-hive-red":"text-hive-text"}">${p!==null?p:"—"}</span>
          <span class="text-xs text-hive-muted block">${c?c.toLocaleDateString("en-GB",{day:"numeric",month:"short"}):"No inspections"}</span>
        </div>

        <div class="card-surface">
          <div class="section-subtitle mb-2">Weight</div>
          <span class="text-sm text-hive-muted">Pending IoT</span>
          <a href="#/apiary-dashboard" class="text-xs text-hive-gold block mt-1">View charts &rarr;</a>
        </div>

        <div class="card-surface">
          <div class="section-subtitle mb-2">Added</div>
          <span class="text-sm text-hive-text">${new Date(t.dateAdded).toLocaleDateString("en-GB",{day:"numeric",month:"short",year:"numeric"})}</span>
        </div>
      </section>

      <!-- Hive Note & Build Hive — same row -->
      <section class="px-4 mb-4 grid grid-cols-2 gap-3">
        <button id="editHiveNote" class="card-surface flex items-center justify-between p-4 text-left">
          <div class="flex items-center gap-3 min-w-0">
            <svg class="w-5 h-5 flex-shrink-0 ${v?"text-hive-gold":"text-hive-muted"}" fill="none" stroke="currentColor" stroke-width="1.5" viewBox="0 0 24 24"><path stroke-linecap="round" stroke-linejoin="round" d="M11 5H6a2 2 0 00-2 2v11a2 2 0 002 2h11a2 2 0 002-2v-5m-1.414-9.414a2 2 0 112.828 2.828L11.828 15H9v-2.828l8.586-8.586z"/></svg>
            <div class="min-w-0">
              <div class="text-sm font-medium text-hive-text">Hive Note</div>
              <div class="text-xs text-hive-muted truncate">${v?v.text.slice(0,30)+(v.text.length>30?"…":""):"Add a note"}</div>
            </div>
          </div>
          <svg class="w-4 h-4 text-hive-muted flex-shrink-0" fill="none" stroke="currentColor" stroke-width="1.5" viewBox="0 0 24 24"><path stroke-linecap="round" stroke-linejoin="round" d="M9 5l7 7-7 7"/></svg>
        </button>
        <a href="#/build/${t.id}" class="card-surface flex items-center justify-between p-4 block">
          <div class="flex items-center gap-3">
            <svg class="w-5 h-5 text-hive-gold" fill="none" stroke="currentColor" stroke-width="1.5" viewBox="0 0 24 24"><path stroke-linecap="round" stroke-linejoin="round" d="M11.42 15.17l-5.66-5.66a2 2 0 010-2.83l.71-.71a2 2 0 012.83 0l5.66 5.66m-8.49 8.49l-2.83-2.83a2 2 0 010-2.83l.71-.71a2 2 0 012.83 0l2.83 2.83"/></svg>
            <div>
              <div class="text-sm font-medium text-hive-text">Build Hive</div>
              <div class="text-xs text-hive-muted">${(t.components||[]).length} components</div>
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
                <h3 class="font-serif text-lg font-medium text-hive-text">${v?"Edit":"Add"} Hive Note</h3>
                <button id="noteModalClose" class="p-1 text-hive-muted hover:text-hive-text">
                  <svg class="w-5 h-5" fill="none" stroke="currentColor" stroke-width="1.5" viewBox="0 0 24 24"><path stroke-linecap="round" stroke-linejoin="round" d="M6 18L18 6M6 6l12 12"/></svg>
                </button>
              </div>
              <p class="text-xs text-hive-muted mt-1">${t.hiveName} — ${new Date().toLocaleDateString("en-GB",{day:"numeric",month:"short",year:"numeric"})}</p>
            </div>
            <div class="p-5">
              <textarea id="noteModalText" rows="5" class="w-full rounded-xl p-4 text-sm leading-relaxed resize-none focus:outline-none focus:ring-2 focus:ring-hive-gold/40" style="background:var(--hive-bg);border:1px solid var(--hive-border);color:var(--hive-text)" placeholder="Write your note about this hive…">${v?v.text:""}</textarea>
            </div>
            <div class="px-5 pb-5 flex items-center justify-between">
              ${v?'<button id="noteModalDelete" class="text-xs text-hive-red hover:opacity-80 uppercase tracking-wider" style="font-family:Inter,sans-serif">Delete Note</button>':"<span></span>"}
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
            <div class="section-subtitle">${t.type==="Hive"?"Downsize to Nuc":"Upgrade to Hive"}</div>
          </button>
        </div>
      </section>

      <!-- Inspection Timeline -->
      <section class="px-4 mb-6">
        <h3 class="font-serif text-base font-medium text-hive-text mb-3">Inspection History</h3>
        <div class="space-y-0">
          ${a.map((x,b)=>`
            <a href="#/inspection/${x.id||b}?from=${encodeURIComponent(s)}" class="flex gap-3 ${b<a.length-1?"pb-4":""} block">
              <div class="flex flex-col items-center">
                <div class="timeline-dot" style="background: rgba(212,175,55,0.1); color: var(--hive-gold)">
                  <svg class="w-3.5 h-3.5" fill="none" stroke="currentColor" stroke-width="1.5" viewBox="0 0 24 24"><path stroke-linecap="round" stroke-linejoin="round" d="M9 5H7a2 2 0 00-2 2v12a2 2 0 002 2h10a2 2 0 002-2V7a2 2 0 00-2-2h-2M9 5a2 2 0 002 2h2a2 2 0 002-2M9 5a2 2 0 012-2h2a2 2 0 012 2"/></svg>
                </div>
                ${b<a.length-1?'<div class="w-px bg-hive-border flex-1 mt-1"></div>':""}
              </div>
              <div class="flex-1 pb-1">
                <div class="flex items-center justify-between">
                  ${Ve(x.type)}
                  <span class="text-xs text-hive-muted">${new Date(x.date).toLocaleDateString("en-GB",{day:"numeric",month:"short",year:"numeric"})}</span>
                </div>
                ${x.notes?`<p class="text-sm text-hive-text mt-1 leading-relaxed">${x.notes}</p>`:""}
                <div class="flex gap-3 mt-1.5 text-xs text-hive-muted">
                  ${x.queenSeen?'<span style="color:var(--hive-sage)">Queen spotted</span>':""}
                  ${x.broodSpotted?'<span style="color:var(--hive-blue)">Brood present</span>':""}
                  ${x.strength?`<span>${x.strength}%</span>`:""}
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
        <a href="#/inspect?hive=${encodeURIComponent(t.hiveName)}" class="btn-action">
          <svg class="w-4 h-4" fill="none" stroke="currentColor" stroke-width="1.5" viewBox="0 0 24 24"><path stroke-linecap="round" stroke-linejoin="round" d="M11 5H6a2 2 0 00-2 2v11a2 2 0 002 2h11a2 2 0 002-2v-5m-1.414-9.414a2 2 0 112.828 2.828L11.828 15H9v-2.828l8.586-8.586z"/></svg>
          <span>Inspect</span>
        </a>
        <a href="#/inspect?hive=${encodeURIComponent(t.hiveName)}&type=harvest" class="btn-action">
          <svg class="w-4 h-4" fill="none" stroke="currentColor" stroke-width="1.5" viewBox="0 0 24 24"><path stroke-linecap="round" stroke-linejoin="round" d="M19.428 15.428a2 2 0 00-1.022-.547l-2.387-.477a6 6 0 00-3.86.517l-.318.158a6 6 0 01-3.86.517L6.05 15.21a2 2 0 00-1.806.547M8 4h8l-1 1v5.172a2 2 0 00.586 1.414l5 5c1.26 1.26.367 3.414-1.415 3.414H4.828c-1.782 0-2.674-2.154-1.414-3.414l5-5A2 2 0 009 10.172V5L8 4z"/></svg>
          <span>Harvest</span>
        </a>
        <a href="#/inspect?hive=${encodeURIComponent(t.hiveName)}&type=feed" class="btn-action">
          <svg class="w-4 h-4" fill="none" stroke="currentColor" stroke-width="1.5" viewBox="0 0 24 24"><path stroke-linecap="round" stroke-linejoin="round" d="M12 6.253v13m0-13C10.832 5.477 9.246 5 7.5 5S4.168 5.477 3 6.253v13C4.168 18.477 5.754 18 7.5 18s3.332.477 4.5 1.253m0-13C13.168 5.477 14.754 5 16.5 5c1.747 0 3.332.477 4.5 1.253v13C19.832 18.477 18.247 18 16.5 18c-1.746 0-3.332.477-4.5 1.253"/></svg>
          <span>Feed</span>
        </a>
        <a href="#/inspect?hive=${encodeURIComponent(t.hiveName)}&type=treatment" class="btn-action">
          <svg class="w-4 h-4" fill="none" stroke="currentColor" stroke-width="1.5" viewBox="0 0 24 24"><path stroke-linecap="round" stroke-linejoin="round" d="M4.318 6.318a4.5 4.5 0 000 6.364L12 20.364l7.682-7.682a4.5 4.5 0 00-6.364-6.364L12 7.636l-1.318-1.318a4.5 4.5 0 00-6.364 0z"/></svg>
          <span>Treat</span>
        </a>
      </div>
    </div>
  `;const m=document.getElementById("noteModal"),h=()=>m==null?void 0:m.classList.remove("hidden"),r=()=>m==null?void 0:m.classList.add("hidden");(u=document.getElementById("editHiveNote"))==null||u.addEventListener("click",h),(g=document.getElementById("noteModalBackdrop"))==null||g.addEventListener("click",r),(y=document.getElementById("noteModalClose"))==null||y.addEventListener("click",r),(w=document.getElementById("noteModalCancel"))==null||w.addEventListener("click",r),(k=document.getElementById("noteModalSave"))==null||k.addEventListener("click",()=>{var b;const x=(b=document.getElementById("noteModalText"))==null?void 0:b.value.trim();x&&(re(t.id,x),r(),ee(e,n))}),(S=document.getElementById("noteModalDelete"))==null||S.addEventListener("click",()=>{confirm("Delete this hive note?")&&(re(t.id,""),r(),ee(e,n))}),(H=e.querySelector('[data-op="split"]'))==null||H.addEventListener("click",()=>{const x=prompt('Name for the new nuc/hive (e.g. "Nuc 2 - Split"):');if(!x)return;const b=prompt("Split notes (optional):")||"";st(t.id,x,b),window.location.hash="#/apiary"}),(I=e.querySelector('[data-op="combine"]'))==null||I.addEventListener("click",()=>{const x=P().filter(F=>F.id!==t.id&&F.status==="Active");if(!x.length){alert("No other active hives to combine with.");return}const b=x.map((F,Me)=>`${Me+1}. ${F.hiveName}`).join(`
`),B=prompt(`Combine ${t.hiveName} INTO which hive? (this hive will be deactivated)

${b}

Enter number:`);if(!B)return;const L=parseInt(B,10)-1;if(L<0||L>=x.length){alert("Invalid selection.");return}const Le=prompt("Combine notes (optional):")||"";nt(x[L].id,t.id,Le),window.location.hash="#/apiary"}),(A=e.querySelector('[data-op="dead"]'))==null||A.addEventListener("click",()=>{if(!confirm(`Mark "${t.hiveName}" as dead? This will deactivate the hive.`))return;const x=prompt("Notes on the death (optional):")||"";it(t.id,x),window.location.hash="#/apiary"}),(f=e.querySelector('[data-op="move"]'))==null||f.addEventListener("click",()=>{const x=prompt("Where is the hive being moved to?");if(!x)return;const b=prompt("Move notes (optional):")||"";ot(t.id,x,b),alert(`${t.hiveName} move recorded to timeline.`),window.location.hash="#/hive/"+encodeURIComponent(t.hiveName)}),(C=e.querySelector('[data-op="convert"]'))==null||C.addEventListener("click",()=>{const x=t.type==="Hive"?"downsize to a Nuc":"upgrade to a full Hive";if(!confirm(`Convert "${t.hiveName}" — ${x}?

All components will be swapped to the matching type.`))return;const b=prompt("Conversion notes (optional):")||"",B=rt(t.id,b);B&&(window.location.hash="#/hive/"+encodeURIComponent(B.hiveName))})}const kt="modulepreload",St=function(e){return"/"+e},ue={},ve=function(n,s,i){let t=Promise.resolve();if(s&&s.length>0){document.getElementsByTagName("link");const o=document.querySelector("meta[property=csp-nonce]"),l=(o==null?void 0:o.nonce)||(o==null?void 0:o.getAttribute("nonce"));t=Promise.allSettled(s.map(d=>{if(d=St(d),d in ue)return;ue[d]=!0;const c=d.endsWith(".css"),p=c?'[rel="stylesheet"]':"";if(document.querySelector(`link[href="${d}"]${p}`))return;const v=document.createElement("link");if(v.rel=c?"stylesheet":kt,c||(v.as="script"),v.crossOrigin="",v.href=d,l&&v.setAttribute("nonce",l),document.head.appendChild(v),c)return new Promise((m,h)=>{v.addEventListener("load",m),v.addEventListener("error",()=>h(new Error(`Unable to preload CSS for ${d}`)))})}))}function a(o){const l=new Event("vite:preloadError",{cancelable:!0});if(l.payload=o,window.dispatchEvent(l),!l.defaultPrevented)throw o}return t.then(o=>{for(const l of o||[])l.status==="rejected"&&a(l.reason);return n().catch(a)})};async function $t(e){e.innerHTML=`
    ${$("Sensor Dashboard",!0)}
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
  `;const{Chart:n,registerables:s}=await ve(async()=>{const{Chart:p,registerables:v}=await import("./chart-19k6OvwP.js");return{Chart:p,registerables:v}},[]);await ve(()=>import("./chartjs-adapter-date-fns.esm-CV7ru7NP.js"),__vite__mapDeps([0,1])),n.register(...s);const i={responsive:!0,maintainAspectRatio:!0,aspectRatio:2.5,interaction:{mode:"index",intersect:!1},plugins:{legend:{labels:{color:"#9ca3af",usePointStyle:!0,padding:12}},tooltip:{backgroundColor:"#1a1d27",borderColor:"#2a2e3e",borderWidth:1,titleColor:"#e4e4e7",bodyColor:"#e4e4e7",padding:10,callbacks:{title:p=>new Date(p[0].parsed.x).toLocaleString()}}},scales:{x:{type:"time",time:{tooltipFormat:"dd MMM HH:mm"},grid:{color:"rgba(255,255,255,0.05)"},ticks:{color:"#9ca3af",maxTicksLimit:8}},y:{grid:{color:"rgba(255,255,255,0.05)"},ticks:{color:"#9ca3af"}}}},t=(p,v)=>({label:p,borderColor:v,backgroundColor:v+"1a",fill:!1,tension:.3,pointRadius:0,borderWidth:2,data:[]}),a=new n(document.getElementById("weightChart"),{type:"line",data:{datasets:[{...t("Weight (kg)","#f59e0b"),fill:!0}]},options:{...i,scales:{...i.scales,y:{...i.scales.y,title:{display:!0,text:"kg",color:"#9ca3af"}}}}}),o=new n(document.getElementById("tempChart"),{type:"line",data:{datasets:[t("Internal (°C)","#ef4444"),t("Leg (°C)","#a78bfa")]},options:{...i,aspectRatio:2,scales:{...i.scales,y:{...i.scales.y,title:{display:!0,text:"°C",color:"#9ca3af"}}}}}),l=new n(document.getElementById("envChart"),{type:"line",data:{datasets:[{...t("Humidity (%)","#3b82f6"),yAxisID:"yHum"},{...t("Battery (V)","#22c55e"),yAxisID:"yBat"}]},options:{...i,aspectRatio:2,scales:{x:i.scales.x,yHum:{type:"linear",position:"left",grid:{color:"rgba(255,255,255,0.05)"},ticks:{color:"#3b82f6"},title:{display:!0,text:"%",color:"#3b82f6"}},yBat:{type:"linear",position:"right",grid:{drawOnChartArea:!1},ticks:{color:"#22c55e"},title:{display:!0,text:"V",color:"#22c55e"}}}}});async function d(){const p=parseInt(document.getElementById("timeRange").value,10),v=new Date(Date.now()-p*3600*1e3);try{const m=await Ue();document.getElementById("errorBanner").classList.add("hidden");const h=m.filter(u=>new Date(u.timestamp)>=v);if(h.length>0){const u=h[h.length-1],g=(w,k,S)=>{document.getElementById(w).textContent=k!=null?Number(k).toFixed(S):"—"};g("latestWeight",u.weight,1),g("latestTemp",u.internalTemp,1),g("latestHum",u.hiveHum,1),g("latestBat",u.batteryVoltage,2),g("latestLeg",u.legTemp,1);const y=Math.floor((Date.now()-new Date(u.timestamp))/1e3);document.getElementById("lastReading").textContent=y<60?`${y}s ago`:y<3600?`${Math.floor(y/60)}m ago`:`${Math.floor(y/3600)}h ago`,document.getElementById("dataPoints").textContent=`${h.length} pts`}const r=(u,g)=>({x:new Date(u.timestamp),y:u[g]});a.data.datasets[0].data=h.map(u=>r(u,"weight")),o.data.datasets[0].data=h.map(u=>r(u,"internalTemp")),o.data.datasets[1].data=h.map(u=>r(u,"legTemp")),l.data.datasets[0].data=h.map(u=>r(u,"hiveHum")),l.data.datasets[1].data=h.map(u=>r(u,"batteryVoltage")),a.update("none"),o.update("none"),l.update("none")}catch(m){const h=document.getElementById("errorBanner");h.textContent=`Failed to load sensor data: ${m.message}`,h.classList.remove("hidden")}}d();const c=setInterval(d,5*60*1e3);return document.getElementById("timeRange").addEventListener("change",d),document.getElementById("refreshBtn").addEventListener("click",d),()=>{clearInterval(c),a.destroy(),o.destroy(),l.destroy()}}const pe="apiary_activity";function Ct(e){const n=JSON.parse(localStorage.getItem(pe)||"[]");n.unshift(e),localStorage.setItem(pe,JSON.stringify(n))}function J(e,n=3e3){const s=document.getElementById("toast");s&&s.remove();const i=document.createElement("div");i.id="toast",i.className="fixed top-20 left-1/2 -translate-x-1/2 z-[100] px-6 py-3 rounded-full text-sm font-medium animate-in",i.style.cssText="background:var(--hive-gold);color:#0B0D0E;box-shadow:0 4px 20px rgba(212,175,55,0.3)",i.textContent=e,document.body.appendChild(i),setTimeout(()=>{i.style.opacity="0",setTimeout(()=>i.remove(),300)},n)}const Et=["Varroa mites","Nosema","Chalkbrood","Stonebrood","American Foulbrood","European Foulbrood"],Bt=["Waxmoth","Mice","Ants","Wasps","Small Hive Beetle","Hornets"],Ht=["","Compact","Spotty","Patchy","Drone-heavy","None visible"];async function It(e){const s=new URLSearchParams(window.location.hash.split("?")[1]||"").get("hive")||"",t=P().filter(r=>r.status==="Active").map(r=>r.hiveName);e.innerHTML=`
    ${$("New Inspection",!0)}
    <main class="max-w-3xl mx-auto p-5 pb-8">
      <form id="inspectionForm" class="space-y-5">
        <section class="card p-5">
          <label class="section-subtitle block mb-2">Hive</label>
          <select id="hiveSelect" class="input-field" required>
            <option value="">Select hive...</option>
            ${t.map(r=>`<option value="${r}" ${r===s?"selected":""}>${r}</option>`).join("")}
          </select>
        </section>

        <section class="card p-5">
          <h3 class="section-subtitle mb-4">Colony Health</h3>
          <div class="space-y-3">
            ${["queenSeen:Queen Spotted","broodSpotted:Brood Spotted","queenCells:Queen Cells Spotted"].map(r=>{const[u,g]=r.split(":");return`<div class="flex items-center justify-between">
                <span class="text-sm text-hive-text">${g}</span>
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
              ${Ht.map(r=>`<option value="${r}">${r||"Not assessed"}</option>`).join("")}
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
          ${U("diseases","Diseases",`<div class="grid grid-cols-2 gap-2 pb-2">${Et.map(r=>`<label class="flex items-center gap-2 cursor-pointer"><input type="checkbox" data-disease="${r}" class="w-3.5 h-3.5 rounded accent-[var(--hive-red)]"><span class="text-sm text-hive-text">${r}</span></label>`).join("")}</div>`)}
          ${U("pests","Pests",`<div class="grid grid-cols-2 gap-2 pb-2">${Bt.map(r=>`<label class="flex items-center gap-2 cursor-pointer"><input type="checkbox" data-pest="${r}" class="w-3.5 h-3.5 rounded accent-[var(--hive-red)]"><span class="text-sm text-hive-text">${r}</span></label>`).join("")}</div>`)}
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
  `,ge(e);const a={queenSeen:!1,broodSpotted:!1,queenCells:!1};document.querySelectorAll("[data-health]").forEach(r=>{r.addEventListener("change",()=>{a[r.dataset.health]=r.checked})});let o="";document.querySelectorAll(".temperament-pill").forEach(r=>{r.addEventListener("click",()=>{o=r.dataset.temperament,document.querySelectorAll(".temperament-pill").forEach(u=>u.className="temperament-pill btn-secondary flex-1 py-2 text-xs"),r.className="temperament-pill btn-primary flex-1 py-2 text-xs"})});const l=document.getElementById("strengthSlider"),d=document.getElementById("strengthValue");l.addEventListener("input",()=>{d.textContent=l.value+"%"});const c=document.getElementById("weightLeft"),p=document.getElementById("weightRight"),v=document.getElementById("weightTotal"),m=()=>{const r=parseFloat(c.value)||0,u=parseFloat(p.value)||0;(r>0||u>0)&&(v.value=(r+u).toFixed(2))};c.addEventListener("input",m),p.addEventListener("input",m),document.getElementById("fetchWeightBtn").addEventListener("click",()=>J("IoT weight fetch not yet connected"));async function h(){const r=document.getElementById("weatherStatus");try{r.textContent="Fetching...";const u=await Ne(M.lat,M.lng);document.getElementById("weatherConditions").value=u.conditions,document.getElementById("weatherTemp").value=u.temp,r.innerHTML='<span style="color:var(--hive-sage)">&#9679;</span> Auto-filled: '+u.temp+"°C "+u.conditions+" ("+u.humidity+"% humidity, "+u.windSpeed+" km/h wind)"}catch{r.textContent="Could not fetch weather."}}h(),document.getElementById("refreshWeatherBtn").addEventListener("click",h),document.getElementById("inspectionForm").addEventListener("submit",r=>{r.preventDefault();const u=document.getElementById("hiveSelect").value;if(!u){J("Please select a hive");return}const g=[];document.querySelectorAll("[data-disease]:checked").forEach(k=>g.push(k.dataset.disease));const y=[];document.querySelectorAll("[data-pest]:checked").forEach(k=>y.push(k.dataset.pest));const w={date:new Date().toISOString().slice(0,10),type:"Inspection",hive:u,strength:parseInt(l.value,10),queenSeen:a.queenSeen,broodSpotted:a.broodSpotted,queenCells:a.queenCells,temperament:o,broodPattern:document.getElementById("broodPattern").value,weightLeft:parseFloat(c.value)||null,weightRight:parseFloat(p.value)||null,weightTotal:parseFloat(v.value)||null,diseases:g,pests:y,notes:document.getElementById("notes").value,weatherTemp:parseFloat(document.getElementById("weatherTemp").value)||null,weatherConditions:document.getElementById("weatherConditions").value||null};Ct(w),J("Inspection saved for "+u),setTimeout(()=>{window.location.hash="#/apiary"},1500)})}function At(e){const n=P(),s=n.filter(t=>t.type==="Hive"&&t.status==="Active"),i=n.filter(t=>t.type==="Nuc"&&t.status==="Active");e.innerHTML=`
    ${$("Admin",!0)}

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
            <span class="text-sm font-medium">${M.name}</span>
          </div>
          <div class="flex justify-between items-center">
            <span class="text-sm text-hive-muted">Location</span>
            <span class="text-sm font-medium">${M.location}</span>
          </div>
          <div class="flex justify-between items-center">
            <span class="text-sm text-hive-muted">Active Hives</span>
            <span class="text-sm font-bold text-hive-amber">${s.length}</span>
          </div>
          <div class="flex justify-between items-center">
            <span class="text-sm text-hive-muted">Active Nucs</span>
            <span class="text-sm font-bold text-hive-blue">${i.length}</span>
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
          ${n.map(t=>`
            <div class="card-surface flex items-center justify-between">
              <div class="flex items-center gap-3">
                <div class="w-12 h-14 rounded-lg overflow-hidden flex items-center justify-center" style="background: linear-gradient(135deg, ${t.color}15, ${t.color}05)">
                  ${Ae(t.components,t.color)}
                </div>
                <div>
                  <div class="text-sm font-medium">${t.hiveName}</div>
                  <div class="flex items-center gap-2 mt-0.5">
                    <span class="text-xs text-hive-muted">${t.beeType}</span>
                    ${t.hiveStyle?`<span class="text-xs text-hive-muted">${t.hiveStyle}</span>`:""}
                    <span class="text-xs ${t.status==="Active"?"text-hive-green":"text-hive-muted"}">${t.status}</span>
                  </div>
                </div>
              </div>
              <div class="flex items-center gap-2">
                <div class="text-sm font-bold ${t.strength>=80?"text-hive-green":t.strength>=50?"text-hive-amber":"text-hive-red"}">${t.strength}%</div>
                <a href="#/hive-form/${t.id}" class="p-1.5 text-hive-muted hover:text-hive-amber transition-colors" title="Edit">
                  <svg class="w-4 h-4" fill="none" stroke="currentColor" viewBox="0 0 24 24"><path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M11 5H6a2 2 0 00-2 2v11a2 2 0 002 2h11a2 2 0 002-2v-5m-1.414-9.414a2 2 0 112.828 2.828L11.828 15H9v-2.828l8.586-8.586z"/></svg>
                </a>
                <a href="#/build/${t.id}" class="p-1.5 text-hive-muted hover:text-hive-amber transition-colors" title="Build">
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
  `}function Nt(e){const n=ft();e.innerHTML=`
    ${$("Device Health",!0)}

    <main class="max-w-6xl mx-auto p-4 pb-8 space-y-6">

      <!-- Summary Cards -->
      <section class="grid grid-cols-3 gap-3">
        <div class="card-surface text-center">
          <div class="text-2xl font-bold text-hive-green">${n.filter(s=>s.status==="Online").length}</div>
          <div class="text-xs text-hive-muted mt-1">Online</div>
        </div>
        <div class="card-surface text-center">
          <div class="text-2xl font-bold text-hive-red">${n.filter(s=>s.status==="Offline").length}</div>
          <div class="text-xs text-hive-muted mt-1">Offline</div>
        </div>
        <div class="card-surface text-center">
          <div class="text-2xl font-bold text-hive-text">${n.length}</div>
          <div class="text-xs text-hive-muted mt-1">Total</div>
        </div>
      </section>

      <!-- Device List -->
      <section class="space-y-3">
        ${n.map(s=>`
          <div class="card-surface">
            <div class="flex items-start justify-between mb-3">
              <div class="flex items-center gap-3">
                <div class="w-12 h-12 rounded-xl flex items-center justify-center text-2xl ${s.status==="Online"?"bg-hive-green/10":"bg-hive-red/10"}">
                  ${s.type==="ESP32"?"🔌":"🌡️"}
                </div>
                <div>
                  <div class="text-sm font-semibold">${s.name}</div>
                  <div class="text-xs text-hive-muted">${s.location}</div>
                </div>
              </div>
              <span class="pill ${s.status==="Online"?"pill-green":"pill-red"}">
                <span class="w-1.5 h-1.5 rounded-full ${s.status==="Online"?"bg-hive-green":"bg-hive-red"} mr-1.5 animate-pulse"></span>
                ${s.status}
              </span>
            </div>

            <div class="grid grid-cols-2 gap-2 text-xs">
              ${s.type==="ESP32"?`
                <div class="bg-hive-bg rounded-lg p-2">
                  <div class="text-hive-muted mb-0.5">Battery</div>
                  <div class="font-semibold ${s.battery>=3.7?"text-hive-green":"text-hive-red"}">${s.battery}V</div>
                </div>
                <div class="bg-hive-bg rounded-lg p-2">
                  <div class="text-hive-muted mb-0.5">Firmware</div>
                  <div class="font-semibold text-hive-text">${s.firmware}</div>
                </div>
                <div class="bg-hive-bg rounded-lg p-2">
                  <div class="text-hive-muted mb-0.5">IP Address</div>
                  <div class="font-semibold text-hive-text">${s.ip}</div>
                </div>
                <div class="bg-hive-bg rounded-lg p-2">
                  <div class="text-hive-muted mb-0.5">Last Seen</div>
                  <div class="font-semibold text-hive-text">${W(s.lastSeen)}</div>
                </div>
              `:`
                <div class="bg-hive-bg rounded-lg p-2">
                  <div class="text-hive-muted mb-0.5">Temperature</div>
                  <div class="font-semibold text-hive-amber">${s.temp}°C</div>
                </div>
                <div class="bg-hive-bg rounded-lg p-2">
                  <div class="text-hive-muted mb-0.5">Humidity</div>
                  <div class="font-semibold text-hive-blue">${s.humidity}%</div>
                </div>
                <div class="bg-hive-bg rounded-lg p-2">
                  <div class="text-hive-muted mb-0.5">Battery</div>
                  <div class="font-semibold ${s.battery>=50?"text-hive-green":"text-hive-red"}">${s.battery}%</div>
                </div>
                <div class="bg-hive-bg rounded-lg p-2">
                  <div class="text-hive-muted mb-0.5">Last Seen</div>
                  <div class="font-semibold text-hive-text">${W(s.lastSeen)}</div>
                </div>
              `}
            </div>
          </div>
        `).join("")}
      </section>

    </main>
  `}function Lt(e,n){const s=n.id;let i=N(s);if(!i){e.innerHTML=`${$("Not Found",!0)}<div class="max-w-6xl mx-auto p-4 text-center py-16"><p class="text-hive-muted">Hive not found</p><a href="#/apiary" class="btn-primary inline-block mt-4">Back</a></div>`;return}function t(){i=N(s),e.innerHTML=`
      ${$("Build "+i.hiveName,!0,!1,"#/hive/"+encodeURIComponent(i.hiveName))}
      <main class="max-w-6xl mx-auto p-4 pb-8">

        <!-- Visual Hive -->
        <section class="flex justify-center py-8 rounded-2xl mb-6" style="background: var(--hive-surface)">
          ${ie(i.components||[],{size:"lg",interactive:!0,hiveId:i.id})}
        </section>

        <!-- Component Picker -->
        <section class="card-surface mb-6">
          <h3 class="section-subtitle mb-4">Add Component</h3>
          <div class="space-y-2">
            ${K.filter(o=>{const l=i.type==="Nuc";return!(o.nuc!==l||o.id.includes("roof")||o.id.includes("stand")||o.id.includes("floor"))}).map(o=>`
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
          <h3 class="section-subtitle mb-3">Components (${(i.components||[]).length})</h3>
          <div class="space-y-1">
            ${(i.components||[]).map((o,l)=>{const d=K.find(p=>p.id===o.type);if(!d)return"";const c=(i.components||[]).length;return`
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
    `,e.querySelectorAll("[data-add-type]").forEach(o=>{o.addEventListener("click",()=>{et(s,o.dataset.addType),t()})}),e.querySelectorAll("[data-remove-idx]").forEach(o=>{o.addEventListener("click",()=>{ae(s,parseInt(o.dataset.removeIdx,10)),t()})}),e.querySelectorAll("[data-move-up]").forEach(o=>{o.addEventListener("click",()=>{const l=parseInt(o.dataset.moveUp,10);le(s,l,l-1),t()})}),e.querySelectorAll("[data-move-down]").forEach(o=>{o.addEventListener("click",()=>{const l=parseInt(o.dataset.moveDown,10);le(s,l,l+1),t()})})}t();const a=o=>{o.detail.hiveId===s&&(ae(s,o.detail.index),t())};return document.addEventListener("hive-remove-component",a),()=>document.removeEventListener("hive-remove-component",a)}function Mt(e,n){var l;const s=n.id,i=s&&s!=="new",a=(i?N(s):null)||{hiveName:"",type:"Hive",hiveStyle:"National",beeType:"Buckfast",strength:100,color:"#f59e0b",queenMarked:!1,queenColor:null,queenYear:new Date().getFullYear(),components:[{type:"roof"},{type:"deep-box"},{type:"stand"}]};e.innerHTML=`
    ${$(i?"Edit "+a.hiveName:"Add New Hive",!0,!1,i?"#/hive/"+encodeURIComponent(a.hiveName):"#/admin")}

    <main class="max-w-6xl mx-auto p-4 pb-8">
      <form id="hiveForm" class="space-y-6">

        <!-- Visual Preview -->
        <section class="flex justify-center py-6 rounded-2xl" style="background: var(--hive-surface)">
          ${ie(a.components,{size:"md"})}
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
              ${Je.map(d=>`<option value="${d}" ${a.hiveStyle===d?"selected":""}>${d}</option>`).join("")}
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
                ${Qe.map(d=>`<option value="${d}" ${a.beeType===d?"selected":""}>${d}</option>`).join("")}
              </select>
            </div>
            <div>
              <label class="block text-xs text-hive-muted mb-1">Source</label>
              <select id="queenSource" class="input-field">
                ${Ke.map(d=>`<option value="${d}" ${a.queenSource===d?"selected":""}>${d}</option>`).join("")}
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
                ${Ze.map(d=>`<option value="${d}" ${a.queenColor===d?"selected":""}>${d}</option>`).join("")}
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
        ${i?`
        <a href="#/build/${s}" class="card-surface flex items-center justify-between p-4">
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
          <button type="submit" class="btn-primary w-full py-3">${i?"Save Changes":"Add Hive"}</button>
          <a href="${i?"#/hive/"+encodeURIComponent(a.hiveName):"#/admin"}" class="btn-secondary w-full py-3 text-center block">Cancel</a>
          ${i?'<button type="button" id="deleteBtn" class="w-full py-3 text-xs uppercase tracking-wider text-hive-red hover:text-hive-red/80 transition-colors" style="font-family:Inter,sans-serif">Delete Hive</button>':""}
        </section>

      </form>
    </main>
  `;const o=document.getElementById("strengthSlider");o.addEventListener("input",()=>{document.getElementById("strengthVal").textContent=o.value+"%"}),document.getElementById("hiveForm").addEventListener("submit",d=>{d.preventDefault();const c={hiveName:document.getElementById("hiveName").value.trim(),type:document.getElementById("hiveType").value,hiveStyle:document.getElementById("hiveStyle").value,beeType:document.getElementById("beeType").value,color:a.color||"#f59e0b",strength:parseInt(o.value,10),queenYear:parseInt(document.getElementById("queenYear").value,10)||null,queenMarked:document.getElementById("queenMarked").value==="true",queenColor:document.getElementById("queenColor").value||null,queenClipped:document.getElementById("queenClipped").value==="true",queenSource:document.getElementById("queenSource").value||"Unknown",queenAddedDate:document.getElementById("queenAddedDate").value||null,queenNotes:document.getElementById("queenNotes").value.trim(),orientation:"vertical"};if(i)G(s,c),window.location.hash="#/hive/"+encodeURIComponent(c.hiveName);else{c.components=[{type:"roof"},{type:"deep-box"},{type:"stand"}];const p=ye(c);window.location.hash="#/build/"+p.id}}),i&&((l=document.getElementById("deleteBtn"))==null||l.addEventListener("click",()=>{confirm(`Delete "${a.hiveName}"? This cannot be undone.`)&&(Xe(s),window.location.hash="#/apiary")}))}function qt(e){function n(){var i;const s=Be(!0);e.innerHTML=`
      ${$("Tasks",!0)}
      <main class="max-w-6xl mx-auto p-5 space-y-4">
        <div class="flex items-center justify-between mb-2">
          <h2 class="section-title">${s.length} Tasks</h2>
          <button id="addTaskBtn" class="btn-primary text-xs py-2 px-4">+ Add Task</button>
        </div>
        <div class="space-y-2">
          ${s.map(t=>`
            <div class="card flex items-center gap-3 p-4" data-id="${t.id}">
              <input type="checkbox" ${t.done?"checked":""} class="w-4 h-4 rounded accent-[var(--hive-gold)] toggle-task" data-tid="${t.id}">
              <div class="flex-1 min-w-0">
                <span class="text-sm ${t.done?"line-through text-hive-muted":"text-hive-text"}">${t.text}</span>
                <span class="text-[10px] uppercase tracking-wider block mt-0.5 ${t.done?"text-hive-muted":"text-hive-gold"}">${t.due?W(t.due):""}</span>
              </div>
              <button class="text-hive-muted hover:text-hive-red delete-task p-1" data-tid="${t.id}" title="Delete">
                <svg class="w-4 h-4" fill="none" stroke="currentColor" stroke-width="1.25" viewBox="0 0 24 24"><path stroke-linecap="round" stroke-linejoin="round" d="M19 7l-.867 12.142A2 2 0 0116.138 21H7.862a2 2 0 01-1.995-1.858L5 7m5 4v6m4-6v6m1-10V4a1 1 0 00-1-1h-4a1 1 0 00-1 1v3M4 7h16"/></svg>
              </button>
            </div>
          `).join("")}
          ${s.length===0?'<p class="text-hive-muted text-sm text-center py-8">No tasks yet.</p>':""}
        </div>
      </main>
    `,e.querySelectorAll(".toggle-task").forEach(t=>{t.addEventListener("change",()=>{He(t.dataset.tid),n()})}),e.querySelectorAll(".delete-task").forEach(t=>{t.addEventListener("click",()=>{ht(t.dataset.tid),n()})}),(i=document.getElementById("addTaskBtn"))==null||i.addEventListener("click",()=>{const t=prompt("New task:");if(!t)return;const a=prompt("Due date (YYYY-MM-DD, optional):")||"";mt(t,a||null),n()})}n()}function Tt(e){function n(){var c,p,v,m,h;const s=Ce(!1);e.innerHTML=`
      ${$("Notes",!0)}
      <main class="max-w-6xl mx-auto p-5 space-y-4">
        <div class="flex items-center justify-between mb-2">
          <h2 class="section-title">${s.length} Notes</h2>
          <button id="addNoteBtn" class="btn-primary text-xs py-2 px-4">+ Add Note</button>
        </div>
        <div class="space-y-2">
          ${s.map(r=>`
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
          ${s.length===0?`
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
    `,e.querySelectorAll(".pin-note").forEach(r=>{r.addEventListener("click",()=>{dt(r.dataset.nid),n()})}),e.querySelectorAll(".delete-note").forEach(r=>{r.addEventListener("click",()=>{ct(r.dataset.nid),n()})});const i=document.getElementById("noteModal"),t=document.getElementById("noteModalTitle"),a=document.getElementById("noteModalText");let o=null;const l=(r,u,g)=>{t.textContent=r,a.value=u,o=g,i==null||i.classList.remove("hidden"),setTimeout(()=>a.focus(),100)},d=()=>{i==null||i.classList.add("hidden"),o=null};(c=document.getElementById("addNoteBtn"))==null||c.addEventListener("click",()=>l("New Note","",null)),e.querySelectorAll(".edit-note").forEach(r=>{r.addEventListener("click",()=>l("Edit Note",r.dataset.ntext,r.dataset.nid))}),(p=document.getElementById("noteModalBackdrop"))==null||p.addEventListener("click",d),(v=document.getElementById("noteModalClose"))==null||v.addEventListener("click",d),(m=document.getElementById("noteModalCancel"))==null||m.addEventListener("click",d),(h=document.getElementById("noteModalSave"))==null||h.addEventListener("click",()=>{const r=a==null?void 0:a.value.trim();r&&(o?ut(o,r):vt(r),n())})}n()}function Dt(e){const s=new URLSearchParams(window.location.hash.split("?")[1]||"").get("date")||"";let i=Y().filter(a=>a.type==="Inspection");s&&(i=i.filter(a=>a.date===s));const t=s?`Inspections — ${new Date(s).toLocaleDateString("en-GB",{day:"numeric",month:"long",year:"numeric"})}`:"All Inspections";e.innerHTML=`
    ${$(t,!0)}
    <main class="max-w-6xl mx-auto p-4 pb-8">
      <div class="flex items-center justify-between mb-4">
        <h2 class="section-title">${i.length} Inspection${i.length!==1?"s":""}</h2>
        ${s?'<a href="#/inspections" class="section-subtitle text-hive-gold">View all</a>':""}
      </div>
      <div class="space-y-2">
        ${i.map((a,o)=>`
          <a href="#/inspection/${a.id||o}${s?"?from=inspections&date="+s:""}" class="card-surface flex items-center justify-between p-3 block">
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
        ${i.length===0?'<p class="text-hive-muted text-center py-8">No inspections found.</p>':""}
      </div>
    </main>
  `}const jt=["Varroa mites","Nosema","Chalkbrood","Stonebrood","American Foulbrood","European Foulbrood"],Rt=["Waxmoth","Mice","Ants","Wasps","Small Hive Beetle","Hornets"],Pt=["","Compact","Spotty","Patchy","Drone-heavy","None visible"];function Ot(e,n){var A;const s=n.id,i=new URLSearchParams(window.location.hash.split("?")[1]||""),t=i.get("from")||"",a=i.get("date")||"",o=[...Y(),...Se()],l=o.find(f=>f.id===s)||o[parseInt(s,10)];if(!l){e.innerHTML=`
      ${$("Not Found",!0)}
      <div class="max-w-6xl mx-auto p-4 text-center py-16">
        <div class="text-5xl mb-4">🔍</div>
        <p class="text-hive-muted text-lg">Inspection not found</p>
        <a href="#/inspections" class="btn-primary inline-block mt-4">Back to Inspections</a>
      </div>`;return}let d="#/inspections";t==="inspections"&&a?d=`#/inspections?date=${a}`:t&&t!=="inspections"&&(d=`#/hive/${encodeURIComponent(t)}`);const c=(l.strength||0)>=80?"var(--hive-sage)":(l.strength||0)>=50?"var(--hive-gold)":"var(--hive-red)";e.innerHTML=`
    ${$(l.hive,!0,!1,d)}
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
            ${["Gentle","Active","Aggressive"].map(f=>`<button type="button" data-temperament="${f}" class="temperament-pill ${l.temperament===f?"btn-primary":"btn-secondary"} flex-1 py-2 text-xs" disabled>${f}</button>`).join("")}
          </div>
        </div>
        <div class="border-t pt-4" style="border-color:var(--hive-border)">
          <label class="section-subtitle block mb-2">Brood Pattern</label>
          <select id="broodPattern" class="input-field" disabled>
            ${Pt.map(f=>`<option value="${f}" ${l.broodPattern===f?"selected":""}>${f||"Not assessed"}</option>`).join("")}
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
        ${U("diseases","Diseases",`<div class="grid grid-cols-2 gap-2 pb-2">${jt.map(f=>`<label class="flex items-center gap-2"><input type="checkbox" data-disease="${f}" class="w-3.5 h-3.5 rounded accent-[var(--hive-red)]" ${(l.diseases||[]).includes(f)?"checked":""} disabled><span class="text-sm text-hive-text">${f}</span></label>`).join("")}</div>`)}
        ${U("pests","Pests",`<div class="grid grid-cols-2 gap-2 pb-2">${Rt.map(f=>`<label class="flex items-center gap-2"><input type="checkbox" data-pest="${f}" class="w-3.5 h-3.5 rounded accent-[var(--hive-red)]" ${(l.pests||[]).includes(f)?"checked":""} disabled><span class="text-sm text-hive-text">${f}</span></label>`).join("")}</div>`)}
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
  `,ge(e);let p=!0;const v=document.getElementById("lockToggle"),m=document.getElementById("lockIcon"),h=document.getElementById("lockLabel"),r=document.getElementById("saveBar"),u=e.querySelectorAll("input, textarea, select"),g=e.querySelectorAll(".temperament-pill");v.addEventListener("click",()=>{p=!p,u.forEach(f=>{f.id!=="weightTotal"&&(f.disabled=p)}),g.forEach(f=>f.disabled=p),p?(m.innerHTML='<path stroke-linecap="round" stroke-linejoin="round" d="M16.5 10.5V6.75a4.5 4.5 0 10-9 0v3.75m-.75 11.25h10.5a2.25 2.25 0 002.25-2.25v-6.75a2.25 2.25 0 00-2.25-2.25H6.75a2.25 2.25 0 00-2.25 2.25v6.75a2.25 2.25 0 002.25 2.25z"/>',h.textContent="Locked",v.style.color="var(--hive-muted)",r.classList.add("hidden")):(m.innerHTML='<path stroke-linecap="round" stroke-linejoin="round" d="M13.5 10.5V6.75a4.5 4.5 0 119 0v3.75M3.75 21.75h10.5a2.25 2.25 0 002.25-2.25v-6.75a2.25 2.25 0 00-2.25-2.25H3.75a2.25 2.25 0 00-2.25 2.25v6.75a2.25 2.25 0 002.25 2.25z"/>',h.textContent="Editing",v.style.color="var(--hive-gold)",r.classList.remove("hidden"))});const y=document.getElementById("strengthSlider"),w=document.getElementById("strengthValue");y.addEventListener("input",()=>{w.textContent=y.value+"%"}),g.forEach(f=>{f.addEventListener("click",()=>{p||(g.forEach(C=>C.className="temperament-pill btn-secondary flex-1 py-2 text-xs"),f.className="temperament-pill btn-primary flex-1 py-2 text-xs")})});const k=document.getElementById("weightLeft"),S=document.getElementById("weightRight"),H=document.getElementById("weightTotal"),I=()=>{const f=parseFloat(k.value)||0,C=parseFloat(S.value)||0;(f>0||C>0)&&(H.value=(f+C).toFixed(2))};k.addEventListener("input",I),S.addEventListener("input",I),(A=document.getElementById("saveBtn"))==null||A.addEventListener("click",()=>{const f=document.createElement("div");f.className="fixed top-20 left-1/2 -translate-x-1/2 z-[100] px-6 py-3 rounded-full text-sm font-medium animate-in",f.style.cssText="background:var(--hive-gold);color:#0B0D0E;box-shadow:0 4px 20px rgba(212,175,55,0.3)",f.textContent="Inspection updated",document.body.appendChild(f),setTimeout(()=>{f.style.opacity="0",setTimeout(()=>f.remove(),300)},2500)})}Te();Pe();E("#/login",_e);E("#/apiary",wt);E("#/hive/:id",ee);E("#/apiary-dashboard",$t);E("#/inspect",It);E("#/admin",At);E("#/devices",Nt);E("#/build/:id",Lt);E("#/hive-form/:id",Mt);E("#/tasks",qt);E("#/notes",Tt);E("#/inspections",Dt);E("#/inspection/:id",Ot);window.addEventListener("hashchange",()=>setTimeout(fe,50));qe("#/login");setTimeout(fe,100);
