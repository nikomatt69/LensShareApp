(self.webpackChunk_N_E=self.webpackChunk_N_E||[]).push([[8463],{82010:function(e,t,n){"use strict";n.d(t,{F:function(){return o},f:function(){return d}});var r=n(67294);let l=["light","dark"],s="(prefers-color-scheme: dark)",a="undefined"==typeof window,i=(0,r.createContext)(void 0),c={setTheme:e=>{},themes:[]},o=()=>{var e;return null!==(e=(0,r.useContext)(i))&&void 0!==e?e:c},d=e=>(0,r.useContext)(i)?r.createElement(r.Fragment,null,e.children):r.createElement(m,e),u=["light","dark"],m=({forcedTheme:e,disableTransitionOnChange:t=!1,enableSystem:n=!0,enableColorScheme:a=!0,storageKey:c="theme",themes:o=u,defaultTheme:d=n?"system":"light",attribute:m="data-theme",value:g,children:C,nonce:p})=>{let[w,j]=(0,r.useState)(()=>x(c,d)),[b,y]=(0,r.useState)(()=>x(c)),k=g?Object.values(g):o,N=(0,r.useCallback)(e=>{let r=e;if(!r)return;"system"===e&&n&&(r=f());let s=g?g[r]:r,i=t?v():null,c=document.documentElement;if("class"===m?(c.classList.remove(...k),s&&c.classList.add(s)):s?c.setAttribute(m,s):c.removeAttribute(m),a){let o=l.includes(d)?d:null,u=l.includes(r)?r:o;c.style.colorScheme=u}null==i||i()},[]),M=(0,r.useCallback)(e=>{j(e);try{localStorage.setItem(c,e)}catch(t){}},[e]),L=(0,r.useCallback)(t=>{let r=f(t);y(r),"system"===w&&n&&!e&&N("system")},[w,e]);(0,r.useEffect)(()=>{let e=window.matchMedia(s);return e.addListener(L),L(e),()=>e.removeListener(L)},[L]),(0,r.useEffect)(()=>{let e=e=>{e.key===c&&M(e.newValue||d)};return window.addEventListener("storage",e),()=>window.removeEventListener("storage",e)},[M]),(0,r.useEffect)(()=>{N(null!=e?e:w)},[e,w]);let E=(0,r.useMemo)(()=>({theme:w,setTheme:M,forcedTheme:e,resolvedTheme:"system"===w?b:w,themes:n?[...o,"system"]:o,systemTheme:n?b:void 0}),[w,M,e,b,n,o]);return r.createElement(i.Provider,{value:E},r.createElement(h,{forcedTheme:e,disableTransitionOnChange:t,enableSystem:n,enableColorScheme:a,storageKey:c,themes:o,defaultTheme:d,attribute:m,value:g,children:C,attrs:k,nonce:p}),C)},h=(0,r.memo)(({forcedTheme:e,storageKey:t,attribute:n,enableSystem:a,enableColorScheme:i,defaultTheme:c,value:o,attrs:d,nonce:u})=>{let m="system"===c,h="class"===n?`var d=document.documentElement,c=d.classList;c.remove(${d.map(e=>`'${e}'`).join(",")});`:`var d=document.documentElement,n='${n}',s='setAttribute';`,x=i?l.includes(c)&&c?`if(e==='light'||e==='dark'||!e)d.style.colorScheme=e||'${c}'`:"if(e==='light'||e==='dark')d.style.colorScheme=e":"",v=(e,t=!1,r=!0)=>{let s=o?o[e]:e,a=t?e+"|| ''":`'${s}'`,c="";return i&&r&&!t&&l.includes(e)&&(c+=`d.style.colorScheme = '${e}';`),"class"===n?c+=t||s?`c.add(${a})`:"null":s&&(c+=`d[s](n,${a})`),c},f=e?`!function(){${h}${v(e)}}()`:a?`!function(){try{${h}var e=localStorage.getItem('${t}');if('system'===e||(!e&&${m})){var t='${s}',m=window.matchMedia(t);if(m.media!==t||m.matches){${v("dark")}}else{${v("light")}}}else if(e){${o?`var x=${JSON.stringify(o)};`:""}${v(o?"x[e]":"e",!0)}}${m?"":"else{"+v(c,!1,!1)+"}"}${x}}catch(e){}}()`:`!function(){try{${h}var e=localStorage.getItem('${t}');if(e){${o?`var x=${JSON.stringify(o)};`:""}${v(o?"x[e]":"e",!0)}}else{${v(c,!1,!1)};}${x}}catch(t){}}();`;return r.createElement("script",{nonce:u,dangerouslySetInnerHTML:{__html:f}})},()=>!0),x=(e,t)=>{let n;if(!a){try{n=localStorage.getItem(e)||void 0}catch(r){}return n||t}},v=()=>{let e=document.createElement("style");return e.appendChild(document.createTextNode("*{-webkit-transition:none!important;-moz-transition:none!important;-o-transition:none!important;-ms-transition:none!important;transition:none!important}")),document.head.appendChild(e),()=>{window.getComputedStyle(document.body),setTimeout(()=>{document.head.removeChild(e)},1)}},f=e=>(e||(e=window.matchMedia(s)),e.matches?"dark":"light")},80648:function(e,t,n){(window.__NEXT_P=window.__NEXT_P||[]).push(["/settings/cleanup",function(){return n(40743)}])},32774:function(e,t,n){"use strict";n.d(t,{Z:function(){return k}});var r=n(85893),l=n(92882),s=n(53914),a=n(41113),i=n(4876),c=n(55263),o=n(33137),d=n(28771),u=n(5083),m=n(63750),h=n(86010),x=n(41664),v=n.n(x),f=n(11163);let g=e=>{let{children:t,current:n,url:l}=e;return(0,r.jsx)(v(),{href:l,className:(0,h.Z)({"bg-brand-100 dark:bg-brand-300/20 text-brand font-bold":n},"hover:bg-brand-100/80 dark:hover:bg-brand-300/30","flex items-center space-x-2 rounded-lg px-3 py-2"),children:t})},C=e=>{var t;let{items:n}=e,{pathname:l}=(0,f.useRouter)(),s=n.map(e=>({...e,enabled:null===(t=e.enabled)||void 0===t||t}));return(0,r.jsx)("div",{className:"mb-4 space-y-1.5 px-3 sm:px-0",children:s.map(e=>(null==e?void 0:e.enabled)?(0,r.jsxs)(g,{current:l===e.url||e.active,url:e.url,children:[e.icon,(0,r.jsx)("div",{children:e.title})]},e.title):null)})};var p=n(36595);n(67294);let w=e=>(0,r.jsx)("svg",{...e,viewBox:"0 0 22 22",fill:"none",xmlns:"http://www.w3.org/2000/svg",children:(0,r.jsx)("path",{fillRule:"evenodd",clipRule:"evenodd",d:"M11 0.25C11.4142 0.25 11.75 0.585786 11.75 1V2C11.75 2.41421 11.4142 2.75 11 2.75C10.5858 2.75 10.25 2.41421 10.25 2V1C10.25 0.585786 10.5858 0.25 11 0.25ZM3.39861 3.39861C3.6915 3.10572 4.16638 3.10572 4.45927 3.39861L4.85211 3.79145C5.145 4.08434 5.145 4.55921 4.85211 4.85211C4.55921 5.145 4.08434 5.145 3.79145 4.85211L3.39861 4.45927C3.10572 4.16638 3.10572 3.6915 3.39861 3.39861ZM18.6011 3.39887C18.894 3.69176 18.894 4.16664 18.6011 4.45953L18.2083 4.85237C17.9154 5.14526 17.4405 5.14526 17.1476 4.85237C16.8547 4.55947 16.8547 4.0846 17.1476 3.79171L17.5405 3.39887C17.8334 3.10598 18.3082 3.10598 18.6011 3.39887ZM11 5.75C8.1005 5.75 5.75 8.1005 5.75 11C5.75 13.8995 8.1005 16.25 11 16.25C13.8995 16.25 16.25 13.8995 16.25 11C16.25 8.1005 13.8995 5.75 11 5.75ZM4.25 11C4.25 7.27208 7.27208 4.25 11 4.25C14.7279 4.25 17.75 7.27208 17.75 11C17.75 14.7279 14.7279 17.75 11 17.75C7.27208 17.75 4.25 14.7279 4.25 11ZM0.25 11C0.25 10.5858 0.585786 10.25 1 10.25H2C2.41421 10.25 2.75 10.5858 2.75 11C2.75 11.4142 2.41421 11.75 2 11.75H1C0.585786 11.75 0.25 11.4142 0.25 11ZM19.25 11C19.25 10.5858 19.5858 10.25 20 10.25H21C21.4142 10.25 21.75 10.5858 21.75 11C21.75 11.4142 21.4142 11.75 21 11.75H20C19.5858 11.75 19.25 11.4142 19.25 11ZM17.1476 17.1476C17.4405 16.8547 17.9154 16.8547 18.2083 17.1476L18.6011 17.5405C18.894 17.8334 18.894 18.3082 18.6011 18.6011C18.3082 18.894 17.8334 18.894 17.5405 18.6011L17.1476 18.2083C16.8547 17.9154 16.8547 17.4405 17.1476 17.1476ZM4.85211 17.1479C5.145 17.4408 5.145 17.9157 4.85211 18.2086L4.45927 18.6014C4.16638 18.8943 3.6915 18.8943 3.39861 18.6014C3.10572 18.3085 3.10572 17.8336 3.39861 17.5407L3.79145 17.1479C4.08434 16.855 4.55921 16.855 4.85211 17.1479ZM11 19.25C11.4142 19.25 11.75 19.5858 11.75 20V21C11.75 21.4142 11.4142 21.75 11 21.75C10.5858 21.75 10.25 21.4142 10.25 21V20C10.25 19.5858 10.5858 19.25 11 19.25Z",fill:"currentColor"})}),j=e=>(0,r.jsx)("svg",{viewBox:"0 0 22 22",fill:"none",xmlns:"http://www.w3.org/2000/svg",...e,children:(0,r.jsx)("path",{fillRule:"evenodd",clipRule:"evenodd",d:"M10.0174 1.80157C5.37072 2.29221 1.75 6.22328 1.75 11C1.75 16.1086 5.89137 20.25 11 20.25C15.7767 20.25 19.7078 16.6293 20.1984 11.9826C18.8717 13.6669 16.8126 14.75 14.5 14.75C10.4959 14.75 7.25 11.5041 7.25 7.5C7.25 5.18738 8.33315 3.1283 10.0174 1.80157ZM0.25 11C0.25 5.06294 5.06294 0.25 11 0.25C11.7166 0.25 12.0754 0.821258 12.1368 1.27627C12.196 1.71398 12.0342 2.27065 11.531 2.57467C9.86266 3.5828 8.75 5.41182 8.75 7.5C8.75 10.6756 11.3244 13.25 14.5 13.25C16.5882 13.25 18.4172 12.1373 19.4253 10.469C19.7293 9.96584 20.286 9.80404 20.7237 9.86316C21.1787 9.92461 21.75 10.2834 21.75 11C21.75 16.9371 16.9371 21.75 11 21.75C5.06294 21.75 0.25 16.9371 0.25 11Z",fill:"currentColor"})});var b=n(82010);let y=()=>{let e=(0,l.qr)(e=>e.currentProfile),{theme:t,setTheme:n}=(0,b.F)();return(0,r.jsxs)("div",{className:"mb-4 space-y-1.5 px-3 sm:px-0",children:[(0,r.jsx)("div",{}),(0,r.jsxs)("div",{className:"pb-3",children:[(0,r.jsx)(s.Z,{profile:e,showUserPreview:!1}),(0,r.jsx)("button",{type:"button",className:"flex items-center space-x-2 px-3 py-2 hover:bg-gray-100 dark:hover:bg-gray-800",onClick:()=>{n("dark"===t?"light":"dark")},children:"dark"===t?(0,r.jsx)(w,{className:"h-4 w-4"}):(0,r.jsx)(j,{className:"h-4 w-4"})})]}),(0,r.jsx)(C,{items:[{title:"Profile",icon:(0,r.jsx)(a.Z,{className:"h-4 w-4"}),url:"/settings"},{title:"Account",icon:(0,r.jsx)(i.Z,{className:"h-4 w-4"}),url:"/settings/account"},{title:"Interests",icon:(0,r.jsx)(c.Z,{className:"h-4 w-4"}),url:"/settings/interests"},{title:"Dispatcher",icon:(0,r.jsx)(o.Z,{className:"h-4 w-4"}),url:"/settings/dispatcher"},{title:"Allowance",icon:(0,r.jsx)(d.Z,{className:"h-4 w-4"}),url:"/settings/allowance"},{title:"Cleanup",icon:(0,r.jsx)(u.Z,{className:"h-4 w-4"}),url:"/settings/cleanup"},{title:"Export",icon:(0,r.jsx)(m.oxP,{className:"h-4 w-4"}),url:"/settings/export"},{title:(0,r.jsx)("div",{className:"text-red-500",children:"Danger Zone"}),icon:(0,r.jsx)(m.Vgl,{className:"h-4 w-4 text-red-500"}),url:"/settings/delete"}]}),(0,r.jsx)("div",{children:(0,r.jsx)(p.Z,{})})]})};var k=y},21094:function(e,t,n){"use strict";n.d(t,{Me:function(){return l},ST:function(){return s},VK:function(){return a}});var r=n(85893);let l=e=>{let{children:t,className:n="",classNameChild:l=""}=e;return(0,r.jsx)("div",{className:"container mx-auto max-w-screen-xl grow px-0 pb-2 pt-8 sm:px-5 ".concat(n),children:(0,r.jsx)("div",{className:"grid grid-cols-12 lg:gap-8 ".concat(l),children:t})})},s=e=>{let{children:t,className:n=""}=e;return(0,r.jsx)("div",{className:"col-span-12 md:col-span-12 lg:col-span-4 ".concat(n),children:t})},a=e=>{let{children:t,className:n=""}=e;return(0,r.jsx)("div",{className:"col-span-12 mb-5 md:col-span-12 lg:col-span-8 ".concat(n),children:t})}},50680:function(e,t,n){"use strict";n.r(t),n.d(t,{default:function(){return d}});var r=n(85893),l=n(29780),s=n(9008),a=n.n(s),i=n(41664),c=n.n(i);n(67294);var o=n(5649);function d(){return(0,r.jsxs)(r.Fragment,{children:[(0,r.jsx)(a(),{children:(0,r.jsx)("title",{children:"404"})}),(0,r.jsxs)("div",{className:"mt-10 flex h-full flex-col items-center justify-start md:mt-20",children:[(0,r.jsx)("img",{src:"".concat(o.Fv,"/images/icon.png"),alt:o.iC,draggable:!1,height:200,width:200}),(0,r.jsxs)("div",{className:"py-10 text-center",children:[(0,r.jsx)("h1",{className:"mb-4 text-3xl font-bold",children:"404"}),(0,r.jsx)("div",{className:"mb-6",children:"This page could not be found."}),(0,r.jsx)(c(),{href:"/",children:(0,r.jsx)(l.z,{children:"Go Home"})})]})]})]})}},40743:function(e,t,n){"use strict";n.r(t),n.d(t,{default:function(){return f}});var r=n(85893),l=n(86501),s=n(50680),a=n(92882),i=n(32774),c=n(14382),o=n(21094),d=n(5649),u=n(11281),m=n(11761),h=n(45341),x=n(29780);let v=()=>{let e=(0,a.qr)(e=>e.currentProfile),t=(0,c.T)();if(!e)return(0,r.jsx)(s.default,{});let n=e=>{localStorage.removeItem(e),l.ZP.success("Cleared ".concat(e))};return(0,r.jsxs)(o.Me,{children:[(0,r.jsx)(u.Z,{title:"Cleanup settings • ".concat(d.iC)}),(0,r.jsx)(o.ST,{children:(0,r.jsx)(i.Z,{})}),(0,r.jsx)(o.VK,{children:(0,r.jsxs)(m.Z,{className:"p-5",children:[(0,r.jsxs)("div",{className:"space-y-5",children:[(0,r.jsx)("div",{className:"text-lg font-bold",children:"Cleanup Localstorage"}),(0,r.jsx)("p",{children:"If you stuck with some issues, you can try to clean up the localstorage. This will remove all the data stored in your browser."})]}),(0,r.jsx)("div",{className:"divider my-5"}),(0,r.jsxs)("div",{className:"space-y-6",children:[(0,r.jsxs)("div",{className:"flex items-center justify-between",children:[(0,r.jsxs)("div",{className:"space-y-1",children:[(0,r.jsx)("b",{children:"Optimistic publications"}),(0,r.jsx)("div",{className:"lt-text-gray-500 text-xs font-bold",children:"Clean your posts or comments that are not indexed"})]}),(0,r.jsx)(x.z,{onClick:()=>n(h.d.TransactionStore),children:"Cleanup"})]}),(0,r.jsxs)("div",{className:"flex items-center justify-between",children:[(0,r.jsxs)("div",{className:"space-y-1",children:[(0,r.jsx)("b",{children:"Timeline settings"}),(0,r.jsx)("div",{className:"lt-text-gray-500 text-xs font-bold",children:"Clean your timeline filter settings"})]}),(0,r.jsx)(x.z,{onClick:()=>n(h.d.TimelineStore),children:"Cleanup"})]}),(0,r.jsxs)("div",{className:"flex items-center justify-between",children:[(0,r.jsxs)("div",{className:"space-y-1",children:[(0,r.jsx)("b",{children:"Direct message keys"}),(0,r.jsx)("div",{className:"lt-text-gray-500 text-xs font-bold",children:"Clean your DM encryption key"})]}),(0,r.jsx)(x.z,{onClick:()=>{t(),l.ZP.success("Cleared DM keys")},children:"Cleanup"})]}),(0,r.jsxs)("div",{className:"flex items-center justify-between",children:[(0,r.jsxs)("div",{className:"space-y-1",children:[(0,r.jsx)("b",{children:"Feature flags cache"}),(0,r.jsx)("div",{className:"lt-text-gray-500 text-xs font-bold",children:"Clean your feature flags cache"})]}),(0,r.jsx)(x.z,{onClick:()=>n(h.d.FeaturesCache),children:"Cleanup"})]}),(0,r.jsxs)("div",{className:"flex items-center justify-between",children:[(0,r.jsxs)("div",{className:"space-y-1",children:[(0,r.jsx)("b",{className:"text-red-500",children:"App settings"}),(0,r.jsx)("div",{className:"lt-text-gray-500 text-xs font-bold",children:"Note: Cleaning will log you out"})]}),(0,r.jsx)(x.z,{onClick:()=>n(h.d.LensshareStore),children:"Cleanup"})]})]})]})})]})};var f=v},55263:function(e,t,n){"use strict";var r=n(67294);let l=r.forwardRef(function({title:e,titleId:t,...n},l){return r.createElement("svg",Object.assign({xmlns:"http://www.w3.org/2000/svg",fill:"none",viewBox:"0 0 24 24",strokeWidth:1.5,stroke:"currentColor","aria-hidden":"true",ref:l,"aria-labelledby":t},n),e?r.createElement("title",{id:t},e):null,r.createElement("path",{strokeLinecap:"round",strokeLinejoin:"round",d:"M17.593 3.322c1.1.128 1.907 1.077 1.907 2.185V21L12 17.25 4.5 21V5.507c0-1.108.806-2.057 1.907-2.185a48.507 48.507 0 0111.186 0z"}))});t.Z=l},4876:function(e,t,n){"use strict";var r=n(67294);let l=r.forwardRef(function({title:e,titleId:t,...n},l){return r.createElement("svg",Object.assign({xmlns:"http://www.w3.org/2000/svg",fill:"none",viewBox:"0 0 24 24",strokeWidth:1.5,stroke:"currentColor","aria-hidden":"true",ref:l,"aria-labelledby":t},n),e?r.createElement("title",{id:t},e):null,r.createElement("path",{strokeLinecap:"round",strokeLinejoin:"round",d:"M10.5 6a7.5 7.5 0 107.5 7.5h-7.5V6z"}),r.createElement("path",{strokeLinecap:"round",strokeLinejoin:"round",d:"M13.5 10.5H21A7.5 7.5 0 0013.5 3v7.5z"}))});t.Z=l},61998:function(e,t,n){"use strict";var r=n(67294);let l=r.forwardRef(function({title:e,titleId:t,...n},l){return r.createElement("svg",Object.assign({xmlns:"http://www.w3.org/2000/svg",fill:"none",viewBox:"0 0 24 24",strokeWidth:1.5,stroke:"currentColor","aria-hidden":"true",ref:l,"aria-labelledby":t},n),e?r.createElement("title",{id:t},e):null,r.createElement("path",{strokeLinecap:"round",strokeLinejoin:"round",d:"M12 20.25c4.97 0 9-3.694 9-8.25s-4.03-8.25-9-8.25S3 7.444 3 12c0 2.104.859 4.023 2.273 5.48.432.447.74 1.04.586 1.641a4.483 4.483 0 01-.923 1.785A5.969 5.969 0 006 21c1.282 0 2.47-.402 3.445-1.087.81.22 1.668.337 2.555.337z"}))});t.Z=l},93832:function(e,t,n){"use strict";var r=n(67294);let l=r.forwardRef(function({title:e,titleId:t,...n},l){return r.createElement("svg",Object.assign({xmlns:"http://www.w3.org/2000/svg",fill:"none",viewBox:"0 0 24 24",strokeWidth:1.5,stroke:"currentColor","aria-hidden":"true",ref:l,"aria-labelledby":t},n),e?r.createElement("title",{id:t},e):null,r.createElement("path",{strokeLinecap:"round",strokeLinejoin:"round",d:"M3.375 19.5h17.25m-17.25 0a1.125 1.125 0 01-1.125-1.125M3.375 19.5h1.5C5.496 19.5 6 18.996 6 18.375m-3.75 0V5.625m0 12.75v-1.5c0-.621.504-1.125 1.125-1.125m18.375 2.625V5.625m0 12.75c0 .621-.504 1.125-1.125 1.125m1.125-1.125v-1.5c0-.621-.504-1.125-1.125-1.125m0 3.75h-1.5A1.125 1.125 0 0118 18.375M20.625 4.5H3.375m17.25 0c.621 0 1.125.504 1.125 1.125M20.625 4.5h-1.5C18.504 4.5 18 5.004 18 5.625m3.75 0v1.5c0 .621-.504 1.125-1.125 1.125M3.375 4.5c-.621 0-1.125.504-1.125 1.125M3.375 4.5h1.5C5.496 4.5 6 5.004 6 5.625m-3.75 0v1.5c0 .621.504 1.125 1.125 1.125m0 0h1.5m-1.5 0c-.621 0-1.125.504-1.125 1.125v1.5c0 .621.504 1.125 1.125 1.125m1.5-3.75C5.496 8.25 6 7.746 6 7.125v-1.5M4.875 8.25C5.496 8.25 6 8.754 6 9.375v1.5m0-5.25v5.25m0-5.25C6 5.004 6.504 4.5 7.125 4.5h9.75c.621 0 1.125.504 1.125 1.125m1.125 2.625h1.5m-1.5 0A1.125 1.125 0 0118 7.125v-1.5m1.125 2.625c-.621 0-1.125.504-1.125 1.125v1.5m2.625-2.625c.621 0 1.125.504 1.125 1.125v1.5c0 .621-.504 1.125-1.125 1.125M18 5.625v5.25M7.125 12h9.75m-9.75 0A1.125 1.125 0 016 10.875M7.125 12C6.504 12 6 12.504 6 13.125m0-2.25C6 11.496 5.496 12 4.875 12M18 10.875c0 .621-.504 1.125-1.125 1.125M18 10.875c0 .621.504 1.125 1.125 1.125m-2.25 0c.621 0 1.125.504 1.125 1.125m-12 5.25v-5.25m0 5.25c0 .621.504 1.125 1.125 1.125h9.75c.621 0 1.125-.504 1.125-1.125m-12 0v-1.5c0-.621-.504-1.125-1.125-1.125M18 18.375v-5.25m0 5.25v-1.5c0-.621.504-1.125 1.125-1.125M18 13.125v1.5c0 .621.504 1.125 1.125 1.125M18 13.125c0-.621.504-1.125 1.125-1.125M6 13.125v1.5c0 .621-.504 1.125-1.125 1.125M6 13.125C6 12.504 5.496 12 4.875 12m-1.5 0h1.5m-1.5 0c-.621 0-1.125.504-1.125 1.125v1.5c0 .621.504 1.125 1.125 1.125M19.125 12h1.5m0 0c.621 0 1.125.504 1.125 1.125v1.5c0 .621-.504 1.125-1.125 1.125m-17.25 0h1.5m14.25 0h1.5"}))});t.Z=l},33137:function(e,t,n){"use strict";var r=n(67294);let l=r.forwardRef(function({title:e,titleId:t,...n},l){return r.createElement("svg",Object.assign({xmlns:"http://www.w3.org/2000/svg",fill:"none",viewBox:"0 0 24 24",strokeWidth:1.5,stroke:"currentColor","aria-hidden":"true",ref:l,"aria-labelledby":t},n),e?r.createElement("title",{id:t},e):null,r.createElement("path",{strokeLinecap:"round",strokeLinejoin:"round",d:"M7.864 4.243A7.5 7.5 0 0119.5 10.5c0 2.92-.556 5.709-1.568 8.268M5.742 6.364A7.465 7.465 0 004.5 10.5a7.464 7.464 0 01-1.15 3.993m1.989 3.559A11.209 11.209 0 008.25 10.5a3.75 3.75 0 117.5 0c0 .527-.021 1.049-.064 1.565M12 10.5a14.94 14.94 0 01-3.6 9.75m6.633-4.596a18.666 18.666 0 01-2.485 5.33"}))});t.Z=l},28166:function(e,t,n){"use strict";var r=n(67294);let l=r.forwardRef(function({title:e,titleId:t,...n},l){return r.createElement("svg",Object.assign({xmlns:"http://www.w3.org/2000/svg",fill:"none",viewBox:"0 0 24 24",strokeWidth:1.5,stroke:"currentColor","aria-hidden":"true",ref:l,"aria-labelledby":t},n),e?r.createElement("title",{id:t},e):null,r.createElement("path",{strokeLinecap:"round",strokeLinejoin:"round",d:"M9 9l10.5-3m0 6.553v3.75a2.25 2.25 0 01-1.632 2.163l-1.32.377a1.803 1.803 0 11-.99-3.467l2.31-.66a2.25 2.25 0 001.632-2.163zm0 0V2.25L9 5.25v10.303m0 0v3.75a2.25 2.25 0 01-1.632 2.163l-1.32.377a1.803 1.803 0 01-.99-3.467l2.31-.66A2.25 2.25 0 009 15.553z"}))});t.Z=l},28771:function(e,t,n){"use strict";var r=n(67294);let l=r.forwardRef(function({title:e,titleId:t,...n},l){return r.createElement("svg",Object.assign({xmlns:"http://www.w3.org/2000/svg",fill:"none",viewBox:"0 0 24 24",strokeWidth:1.5,stroke:"currentColor","aria-hidden":"true",ref:l,"aria-labelledby":t},n),e?r.createElement("title",{id:t},e):null,r.createElement("path",{strokeLinecap:"round",strokeLinejoin:"round",d:"M7.217 10.907a2.25 2.25 0 100 2.186m0-2.186c.18.324.283.696.283 1.093s-.103.77-.283 1.093m0-2.186l9.566-5.314m-9.566 7.5l9.566 5.314m0 0a2.25 2.25 0 103.935 2.186 2.25 2.25 0 00-3.935-2.186zm0-12.814a2.25 2.25 0 103.933-2.185 2.25 2.25 0 00-3.933 2.185z"}))});t.Z=l},5083:function(e,t,n){"use strict";var r=n(67294);let l=r.forwardRef(function({title:e,titleId:t,...n},l){return r.createElement("svg",Object.assign({xmlns:"http://www.w3.org/2000/svg",fill:"none",viewBox:"0 0 24 24",strokeWidth:1.5,stroke:"currentColor","aria-hidden":"true",ref:l,"aria-labelledby":t},n),e?r.createElement("title",{id:t},e):null,r.createElement("path",{strokeLinecap:"round",strokeLinejoin:"round",d:"M9.813 15.904L9 18.75l-.813-2.846a4.5 4.5 0 00-3.09-3.09L2.25 12l2.846-.813a4.5 4.5 0 003.09-3.09L9 5.25l.813 2.846a4.5 4.5 0 003.09 3.09L15.75 12l-2.846.813a4.5 4.5 0 00-3.09 3.09zM18.259 8.715L18 9.75l-.259-1.035a3.375 3.375 0 00-2.455-2.456L14.25 6l1.036-.259a3.375 3.375 0 002.455-2.456L18 2.25l.259 1.035a3.375 3.375 0 002.456 2.456L21.75 6l-1.035.259a3.375 3.375 0 00-2.456 2.456zM16.894 20.567L16.5 21.75l-.394-1.183a2.25 2.25 0 00-1.423-1.423L13.5 18.75l1.183-.394a2.25 2.25 0 001.423-1.423l.394-1.183.394 1.183a2.25 2.25 0 001.423 1.423l1.183.394-1.183.394a2.25 2.25 0 00-1.423 1.423z"}))});t.Z=l},41113:function(e,t,n){"use strict";var r=n(67294);let l=r.forwardRef(function({title:e,titleId:t,...n},l){return r.createElement("svg",Object.assign({xmlns:"http://www.w3.org/2000/svg",fill:"none",viewBox:"0 0 24 24",strokeWidth:1.5,stroke:"currentColor","aria-hidden":"true",ref:l,"aria-labelledby":t},n),e?r.createElement("title",{id:t},e):null,r.createElement("path",{strokeLinecap:"round",strokeLinejoin:"round",d:"M15.75 6a3.75 3.75 0 11-7.5 0 3.75 3.75 0 017.5 0zM4.501 20.118a7.5 7.5 0 0114.998 0A17.933 17.933 0 0112 21.75c-2.676 0-5.216-.584-7.499-1.632z"}))});t.Z=l}},function(e){e.O(0,[4980,2013,5445,9866,1228,9498,1664,1618,1692,2697,2100,8649,1257,6781,4732,3463,9774,2888,179],function(){return e(e.s=80648)}),_N_E=e.O()}]);