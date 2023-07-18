"use strict";(self.webpackChunk_N_E=self.webpackChunk_N_E||[]).push([[8541],{82010:function(e,t,r){r.d(t,{F:function(){return c},f:function(){return d}});var n=r(67294);let a=["light","dark"],l="(prefers-color-scheme: dark)",o="undefined"==typeof window,s=(0,n.createContext)(void 0),i={setTheme:e=>{},themes:[]},c=()=>{var e;return null!==(e=(0,n.useContext)(s))&&void 0!==e?e:i},d=e=>(0,n.useContext)(s)?n.createElement(n.Fragment,null,e.children):n.createElement(f,e),u=["light","dark"],f=({forcedTheme:e,disableTransitionOnChange:t=!1,enableSystem:r=!0,enableColorScheme:o=!0,storageKey:i="theme",themes:c=u,defaultTheme:d=r?"system":"light",attribute:f="data-theme",value:y,children:b,nonce:v})=>{let[w,I]=(0,n.useState)(()=>m(i,d)),[E,O]=(0,n.useState)(()=>m(i)),C=y?Object.values(y):c,j=(0,n.useCallback)(e=>{let n=e;if(!n)return;"system"===e&&r&&(n=g());let l=y?y[n]:n,s=t?h():null,i=document.documentElement;if("class"===f?(i.classList.remove(...C),l&&i.classList.add(l)):l?i.setAttribute(f,l):i.removeAttribute(f),o){let c=a.includes(d)?d:null,u=a.includes(n)?n:c;i.style.colorScheme=u}null==s||s()},[]),L=(0,n.useCallback)(e=>{I(e);try{localStorage.setItem(i,e)}catch(t){}},[e]),P=(0,n.useCallback)(t=>{let n=g(t);O(n),"system"===w&&r&&!e&&j("system")},[w,e]);(0,n.useEffect)(()=>{let e=window.matchMedia(l);return e.addListener(P),P(e),()=>e.removeListener(P)},[P]),(0,n.useEffect)(()=>{let e=e=>{e.key===i&&L(e.newValue||d)};return window.addEventListener("storage",e),()=>window.removeEventListener("storage",e)},[L]),(0,n.useEffect)(()=>{j(null!=e?e:w)},[e,w]);let W=(0,n.useMemo)(()=>({theme:w,setTheme:L,forcedTheme:e,resolvedTheme:"system"===w?E:w,themes:r?[...c,"system"]:c,systemTheme:r?E:void 0}),[w,L,e,E,r,c]);return n.createElement(s.Provider,{value:W},n.createElement(p,{forcedTheme:e,disableTransitionOnChange:t,enableSystem:r,enableColorScheme:o,storageKey:i,themes:c,defaultTheme:d,attribute:f,value:y,children:b,attrs:C,nonce:v}),b)},p=(0,n.memo)(({forcedTheme:e,storageKey:t,attribute:r,enableSystem:o,enableColorScheme:s,defaultTheme:i,value:c,attrs:d,nonce:u})=>{let f="system"===i,p="class"===r?`var d=document.documentElement,c=d.classList;c.remove(${d.map(e=>`'${e}'`).join(",")});`:`var d=document.documentElement,n='${r}',s='setAttribute';`,m=s?a.includes(i)&&i?`if(e==='light'||e==='dark'||!e)d.style.colorScheme=e||'${i}'`:"if(e==='light'||e==='dark')d.style.colorScheme=e":"",h=(e,t=!1,n=!0)=>{let l=c?c[e]:e,o=t?e+"|| ''":`'${l}'`,i="";return s&&n&&!t&&a.includes(e)&&(i+=`d.style.colorScheme = '${e}';`),"class"===r?i+=t||l?`c.add(${o})`:"null":l&&(i+=`d[s](n,${o})`),i},g=e?`!function(){${p}${h(e)}}()`:o?`!function(){try{${p}var e=localStorage.getItem('${t}');if('system'===e||(!e&&${f})){var t='${l}',m=window.matchMedia(t);if(m.media!==t||m.matches){${h("dark")}}else{${h("light")}}}else if(e){${c?`var x=${JSON.stringify(c)};`:""}${h(c?"x[e]":"e",!0)}}${f?"":"else{"+h(i,!1,!1)+"}"}${m}}catch(e){}}()`:`!function(){try{${p}var e=localStorage.getItem('${t}');if(e){${c?`var x=${JSON.stringify(c)};`:""}${h(c?"x[e]":"e",!0)}}else{${h(i,!1,!1)};}${m}}catch(t){}}();`;return n.createElement("script",{nonce:u,dangerouslySetInnerHTML:{__html:g}})},()=>!0),m=(e,t)=>{let r;if(!o){try{r=localStorage.getItem(e)||void 0}catch(n){}return r||t}},h=()=>{let e=document.createElement("style");return e.appendChild(document.createTextNode("*{-webkit-transition:none!important;-moz-transition:none!important;-o-transition:none!important;-ms-transition:none!important;transition:none!important}")),document.head.appendChild(e),()=>{window.getComputedStyle(document.body),setTimeout(()=>{document.head.removeChild(e)},1)}},g=e=>(e||(e=window.matchMedia(l)),e.matches?"dark":"light")},72478:function(e,t,r){r.d(t,{jc:function(){return h},o5:function(){return m}});let n=Symbol(),a=Symbol(),l=(e,t)=>new Proxy(e,t),o=Object.getPrototypeOf,s=new WeakMap,i=e=>e&&(s.has(e)?s.get(e):o(e)===Object.prototype||o(e)===Array.prototype),c=e=>"object"==typeof e&&null!==e,d=e=>{if(Array.isArray(e))return Array.from(e);let t=Object.getOwnPropertyDescriptors(e);return Object.values(t).forEach(e=>{e.configurable=!0}),Object.create(o(e),t)},u=e=>e[a]||e,f=(e,t,r,o)=>{if(!i(e))return e;let s=o&&o.get(e);if(!s){let c=u(e);s=Object.values(Object.getOwnPropertyDescriptors(c)).some(e=>!e.configurable&&!e.writable)?[c,d(c)]:[c],null==o||o.set(e,s)}let[p,m]=s,h=r&&r.get(p);return h&&!!m===h[1].f||((h=((e,t)=>{let r={f:t},l=!1,o=(t,n)=>{if(!l){let a=r.a.get(e);if(a||(a={},r.a.set(e,a)),"w"===t)a.w=!0;else{let o=a[t];o||(o=new Set,a[t]=o),o.add(n)}}},s={get:(t,n)=>n===a?e:(o("k",n),f(Reflect.get(t,n),r.a,r.c,r.t)),has:(t,a)=>a===n?(l=!0,r.a.delete(e),!0):(o("h",a),Reflect.has(t,a)),getOwnPropertyDescriptor:(e,t)=>(o("o",t),Reflect.getOwnPropertyDescriptor(e,t)),ownKeys:e=>(o("w"),Reflect.ownKeys(e))};return t&&(s.set=s.deleteProperty=()=>!1),[s,r]})(p,!!m))[1].p=l(m||p,h[0]),r&&r.set(p,h)),h[1].a=t,h[1].c=r,h[1].t=o,h[1].p},p=(e,t,r,n)=>{if(Object.is(e,t))return!1;if(!c(e)||!c(t))return!0;let a=r.get(u(e));if(!a)return!0;if(n){let l=n.get(e);if(l&&l.n===t)return l.g;n.set(e,{n:t,g:!1})}let o=null;try{for(let s of a.h||[])if(o=Reflect.has(e,s)!==Reflect.has(t,s))return o;if(!0===a.w){if(o=((e,t)=>{let r=Reflect.ownKeys(e),n=Reflect.ownKeys(t);return r.length!==n.length||r.some((e,t)=>e!==n[t])})(e,t))return o}else for(let i of a.o||[])if(o=!!Reflect.getOwnPropertyDescriptor(e,i)!=!!Reflect.getOwnPropertyDescriptor(t,i))return o;for(let d of a.k||[])if(o=p(e[d],t[d],r,n))return o;return null===o&&(o=!0),o}finally{n&&n.set(e,{n:t,g:o})}},m=e=>i(e)&&e[a]||null,h=(e,t=!0)=>{s.set(e,t)}},56882:function(e,t,r){let n;r.d(t,{CV:function(){return j},Id:function(){return h},t0:function(){return E},zv:function(){return m},uA:function(){return b},uc:function(){return R},jb:function(){return K},zb:function(){return w},AV:function(){return p},Ic:function(){return q},Vs:function(){return X},kD:function(){return x}});var a=r(72478);let l=e=>"object"==typeof e&&null!==e,o=new WeakMap,s=new WeakSet,i=(e=Object.is,t=(e,t)=>new Proxy(e,t),r=e=>l(e)&&!s.has(e)&&(Array.isArray(e)||!(Symbol.iterator in e))&&!(e instanceof WeakMap)&&!(e instanceof WeakSet)&&!(e instanceof Error)&&!(e instanceof Number)&&!(e instanceof Date)&&!(e instanceof String)&&!(e instanceof RegExp)&&!(e instanceof ArrayBuffer),n=e=>{switch(e.status){case"fulfilled":return e.value;case"rejected":throw e.reason;default:throw e}},i=new WeakMap,c=(e,t,r=n)=>{let l=i.get(e);if((null==l?void 0:l[0])===t)return l[1];let d=Array.isArray(e)?[]:Object.create(Object.getPrototypeOf(e));return(0,a.jc)(d,!0),i.set(e,[t,d]),Reflect.ownKeys(e).forEach(t=>{if(Object.getOwnPropertyDescriptor(d,t))return;let n=Reflect.get(e,t),l={value:n,enumerable:!0,configurable:!0};if(s.has(n))(0,a.jc)(n,!1);else if(n instanceof Promise)delete l.value,l.get=()=>r(n);else if(o.has(n)){let[i,u]=o.get(n);l.value=c(i,u(),r)}Object.defineProperty(d,t,l)}),Object.preventExtensions(d)},d=new WeakMap,u=[1,1],f=n=>{if(!l(n))throw Error("object required");let i=d.get(n);if(i)return i;let p=u[0],m=new Set,h=(e,t=++u[0])=>{p!==t&&(p=t,m.forEach(r=>r(e,t)))},g=u[1],y=(e=++u[1])=>(g===e||m.size||(g=e,v.forEach(([t])=>{let r=t[1](e);r>p&&(p=r)})),p),b=e=>(t,r)=>{let n=[...t];n[1]=[e,...n[1]],h(n,r)},v=new Map,w=(e,t)=>{if(v.has(e))throw Error("prop listener already exists");if(m.size){let r=t[3](b(e));v.set(e,[t,r])}else v.set(e,[t])},I=e=>{var t;let r=v.get(e);r&&(v.delete(e),null==(t=r[1])||t.call(r))},E=e=>{m.add(e),1===m.size&&v.forEach(([e,t],r)=>{if(t)throw Error("remove already exists");let n=e[3](b(r));v.set(r,[e,n])});let t=()=>{m.delete(e),0===m.size&&v.forEach(([e,t],r)=>{t&&(t(),v.set(r,[e]))})};return t},O=Array.isArray(n)?[]:Object.create(Object.getPrototypeOf(n)),C=t(O,{deleteProperty(e,t){let r=Reflect.get(e,t);I(t);let n=Reflect.deleteProperty(e,t);return n&&h(["delete",[t],r]),n},set(t,n,i,c){let u=Reflect.has(t,n),p=Reflect.get(t,n,c);if(u&&(e(p,i)||d.has(i)&&e(p,d.get(i))))return!0;I(n),l(i)&&(i=(0,a.o5)(i)||i);let m=i;if(i instanceof Promise)i.then(e=>{i.status="fulfilled",i.value=e,h(["resolve",[n],e])}).catch(e=>{i.status="rejected",i.reason=e,h(["reject",[n],e])});else{!o.has(i)&&r(i)&&(m=f(i));let g=!s.has(m)&&o.get(m);g&&w(n,g)}return Reflect.set(t,n,m,c),h(["set",[n],i,p]),!0}});return d.set(n,C),o.set(C,[O,y,c,E]),Reflect.ownKeys(n).forEach(e=>{let t=Object.getOwnPropertyDescriptor(n,e);"value"in t&&(C[e]=n[e],delete t.value,delete t.writable),Object.defineProperty(O,e,t)}),C})=>[f,o,s,e,t,r,n,i,c,d,u],[c]=i();function d(e={}){return c(e)}function u(e,t,r){let n;let a=o.get(e);a||console.warn("Please use proxy object");let l=[],s=a[3],i=!1,c=e=>{if(l.push(e),r){t(l.splice(0));return}n||(n=Promise.resolve().then(()=>{n=void 0,i&&t(l.splice(0))}))},d=s(c);return i=!0,()=>{i=!1,d()}}let f=d({history:["ConnectWallet"],view:"ConnectWallet",data:void 0}),p={state:f,subscribe:e=>u(f,()=>e(f)),push(e,t){e!==f.view&&(f.view=e,t&&(f.data=t),f.history.push(e))},reset(e){f.view=e,f.history=[e]},replace(e){f.history.length>1&&(f.history[f.history.length-1]=e,f.view=e)},goBack(){if(f.history.length>1){f.history.pop();let[e]=f.history.slice(-1);f.view=e}},setData(e){f.data=e}},m={WALLETCONNECT_DEEPLINK_CHOICE:"WALLETCONNECT_DEEPLINK_CHOICE",W3M_VERSION:"W3M_VERSION",W3M_PREFER_INJECTED_URL_FLAG:"w3mPreferInjected",RECOMMENDED_WALLET_AMOUNT:9,isMobile:()=>"u">typeof window&&Boolean(window.matchMedia("(pointer:coarse)").matches||/Android|webOS|iPhone|iPad|iPod|BlackBerry|Opera Mini/u.test(navigator.userAgent)),isAndroid:()=>m.isMobile()&&navigator.userAgent.toLowerCase().includes("android"),isIos(){let e=navigator.userAgent.toLowerCase();return m.isMobile()&&(e.includes("iphone")||e.includes("ipad"))},isHttpUrl:e=>e.startsWith("http://")||e.startsWith("https://"),isArray:e=>Array.isArray(e)&&e.length>0,formatNativeUrl(e,t,r){if(m.isHttpUrl(e))return this.formatUniversalUrl(e,t,r);let n=e;n.includes("://")||(n=`${n=e.replaceAll("/","").replaceAll(":","")}://`),n.endsWith("/")||(n=`${n}/`),this.setWalletConnectDeepLink(n,r);let a=encodeURIComponent(t);return`${n}wc?uri=${a}`},formatUniversalUrl(e,t,r){if(!m.isHttpUrl(e))return this.formatNativeUrl(e,t,r);let n=e;n.endsWith("/")||(n=`${n}/`),this.setWalletConnectDeepLink(n,r);let a=encodeURIComponent(t);return`${n}wc?uri=${a}`},wait:async e=>new Promise(t=>{setTimeout(t,e)}),openHref(e,t){window.open(e,t,"noreferrer noopener")},setWalletConnectDeepLink(e,t){try{localStorage.setItem(m.WALLETCONNECT_DEEPLINK_CHOICE,JSON.stringify({href:e,name:t}))}catch{console.info("Unable to set WalletConnect deep link")}},setWalletConnectAndroidDeepLink(e){try{let[t]=e.split("?");localStorage.setItem(m.WALLETCONNECT_DEEPLINK_CHOICE,JSON.stringify({href:t,name:"Android"}))}catch{console.info("Unable to set WalletConnect android deep link")}},removeWalletConnectDeepLink(){try{localStorage.removeItem(m.WALLETCONNECT_DEEPLINK_CHOICE)}catch{console.info("Unable to remove WalletConnect deep link")}},setWeb3ModalVersionInStorage(){try{"u">typeof localStorage&&localStorage.setItem(m.W3M_VERSION,"2.7.0")}catch{console.info("Unable to set Web3Modal version in storage")}},getWalletRouterData(){var e;let t=null==(e=p.state.data)?void 0:e.Wallet;if(!t)throw Error('Missing "Wallet" view data');return t},getSwitchNetworkRouterData(){var e;let t=null==(e=p.state.data)?void 0:e.SwitchNetwork;if(!t)throw Error('Missing "SwitchNetwork" view data');return t},isPreferInjectedFlag:()=>"u">typeof location&&new URLSearchParams(location.search).has(m.W3M_PREFER_INJECTED_URL_FLAG)},h={ethereumClient:void 0,setEthereumClient(e){n=e},client(){if(n)return n;throw Error("ClientCtrl has no client set")}},g="u">typeof location&&(location.hostname.includes("localhost")||location.protocol.includes("https")),y=d({enabled:g,userSessionId:"",events:[],connectedWalletId:void 0}),b={state:y,subscribe:e=>u(y.events,()=>e(function(e,t){let r=o.get(e);r||console.warn("Please use proxy object");let[n,a,l]=r;return l(n,a(),void 0)}(y.events[y.events.length-1]))),initialize(){y.enabled&&"u">typeof(null==crypto?void 0:crypto.randomUUID)&&(y.userSessionId=crypto.randomUUID())},setConnectedWalletId(e){y.connectedWalletId=e},click(e){if(y.enabled){let t={type:"CLICK",name:e.name,userSessionId:y.userSessionId,timestamp:Date.now(),data:e};y.events.push(t)}},track(e){if(y.enabled){let t={type:"TRACK",name:e.name,userSessionId:y.userSessionId,timestamp:Date.now(),data:e};y.events.push(t)}},view(e){if(y.enabled){let t={type:"VIEW",name:e.name,userSessionId:y.userSessionId,timestamp:Date.now(),data:e};y.events.push(t)}}},v=d({selectedChain:void 0,chains:void 0,isCustomDesktop:!1,isCustomMobile:!1,isDataLoaded:!1,isUiLoaded:!1,isPreferInjected:!1}),w={state:v,subscribe:e=>u(v,()=>e(v)),setChains(e){v.chains=e},getSelectedChain(){let e=h.client().getNetwork().chain;return e&&(v.selectedChain=e),v.selectedChain},setSelectedChain(e){v.selectedChain=e},setIsCustomDesktop(e){v.isCustomDesktop=e},setIsCustomMobile(e){v.isCustomMobile=e},setIsDataLoaded(e){v.isDataLoaded=e},setIsUiLoaded(e){v.isUiLoaded=e},setIsPreferInjected(e){v.isPreferInjected=e}},I=d({projectId:"",mobileWallets:void 0,desktopWallets:void 0,walletImages:void 0,chainImages:void 0,tokenImages:void 0,tokenContracts:void 0,enableNetworkView:!1,enableAccountView:!0,enableExplorer:!0,defaultChain:void 0,explorerExcludedWalletIds:void 0,explorerRecommendedWalletIds:void 0,termsOfServiceUrl:void 0,privacyPolicyUrl:void 0}),E={state:I,subscribe:e=>u(I,()=>e(I)),setConfig(e){var t,r;b.initialize(),w.setIsCustomMobile(Boolean(null==(t=e.mobileWallets)?void 0:t.length)),w.setIsCustomDesktop(Boolean(null==(r=e.desktopWallets)?void 0:r.length)),w.setChains(h.client().chains),w.setIsPreferInjected(h.client().isInjectedProviderInstalled()&&m.isPreferInjectedFlag()),e.defaultChain&&w.setSelectedChain(e.defaultChain),m.setWeb3ModalVersionInStorage(),Object.assign(I,e)}},O={async getIdentity(e,t){let{projectId:r}=E.state,n=`eip155:${t}`,a=`https://rpc.walletconnect.com/v1/identity/${e}?chainId=${n}&projectId=${r}`;return(await fetch(a)).json()}},C=d({address:void 0,profileName:void 0,profileAvatar:void 0,profileLoading:!1,balanceLoading:!1,balance:void 0,isConnected:!1}),j={state:C,subscribe:e=>u(C,()=>e(C)),getAccount(){let e=h.client().getAccount();C.address=e.address,C.isConnected=e.isConnected},async fetchProfile(e,t){var r;try{C.profileLoading=!0,C.profileName=null,C.profileAvatar=null;let n=t??C.address,a=null==(r=w.state.chains)?void 0:r.find(e=>1===e.id);if(n&&a){try{let l=await O.getIdentity(n,1);C.profileName=l.name,C.profileAvatar=l.avatar}catch{let o=await h.client().fetchEnsName({address:n,chainId:1});if(C.profileName=o,o){let s=await h.client().fetchEnsAvatar({name:o,chainId:1});C.profileAvatar=s}}C.profileAvatar&&await e(C.profileAvatar)}}finally{C.profileLoading=!1}},async fetchBalance(e){try{let t;let{chain:r}=h.client().getNetwork(),{tokenContracts:n}=E.state;r&&n&&(t=n[r.id]),C.balanceLoading=!0;let a=e??C.address;if(a){let l=await h.client().fetchBalance({address:a,token:t});C.balance={amount:l.formatted,symbol:l.symbol}}}finally{C.balanceLoading=!1}},setAddress(e){C.address=e},setIsConnected(e){C.isConnected=e},resetBalance(){C.balance=void 0},resetAccount(){C.address=void 0,C.isConnected=!1,C.profileName=void 0,C.profileAvatar=void 0,C.balance=void 0}},L="https://explorer-api.walletconnect.com";async function P(e,t){let r=new URL(e,L);return r.searchParams.append("projectId",E.state.projectId),Object.entries(t).forEach(([e,t])=>{t&&r.searchParams.append(e,String(t))}),(await fetch(r)).json()}let W={getDesktopListings:async e=>P("/w3m/v1/getDesktopListings",e),getMobileListings:async e=>P("/w3m/v1/getMobileListings",e),getInjectedListings:async e=>P("/w3m/v1/getInjectedListings",e),getAllListings:async e=>P("/w3m/v1/getAllListings",e),getWalletImageUrl:e=>`${L}/w3m/v1/getWalletImage/${e}?projectId=${E.state.projectId}`,getAssetImageUrl:e=>`${L}/w3m/v1/getAssetImage/${e}?projectId=${E.state.projectId}`};var A=Object.defineProperty,S=Object.getOwnPropertySymbols,k=Object.prototype.hasOwnProperty,N=Object.prototype.propertyIsEnumerable,D=(e,t,r)=>t in e?A(e,t,{enumerable:!0,configurable:!0,writable:!0,value:r}):e[t]=r,M=(e,t)=>{for(var r in t||(t={}))k.call(t,r)&&D(e,r,t[r]);if(S)for(var r of S(t))N.call(t,r)&&D(e,r,t[r]);return e};let $=m.isMobile(),U=d({wallets:{listings:[],total:0,page:1},injectedWallets:[],search:{listings:[],total:0,page:1},recomendedWallets:[]}),R={state:U,async getRecomendedWallets(){let{explorerRecommendedWalletIds:e,explorerExcludedWalletIds:t}=E.state;if("NONE"===e||"ALL"===t&&!e)return U.recomendedWallets;if(m.isArray(e)){let r={recommendedIds:e.join(",")},{listings:n}=await W.getAllListings(r),a=Object.values(n);a.sort((t,r)=>{let n=e.indexOf(t.id),a=e.indexOf(r.id);return n-a}),U.recomendedWallets=a}else{let l=m.isArray(t),o={page:1,entries:m.RECOMMENDED_WALLET_AMOUNT,version:2,excludedIds:l?t.join(","):void 0},{listings:s}=$?await W.getMobileListings(o):await W.getDesktopListings(o);U.recomendedWallets=Object.values(s)}return U.recomendedWallets},async getWallets(e){let t=M({},e),{explorerRecommendedWalletIds:r,explorerExcludedWalletIds:n}=E.state,{recomendedWallets:a}=U;if("ALL"===n)return U.wallets;a.length?t.excludedIds=a.map(e=>e.id).join(","):m.isArray(r)&&(t.excludedIds=r.join(",")),m.isArray(n)&&(t.excludedIds=[t.excludedIds,n].filter(Boolean).join(","));let{page:l,search:o}=e,{listings:s,total:i}=$?await W.getMobileListings(t):await W.getDesktopListings(t),c=Object.values(s),d=o?"search":"wallets";return U[d]={listings:[...U[d].listings,...c],total:i,page:l??1},{listings:c,total:i}},async getInjectedWallets(){let{listings:e}=await W.getInjectedListings({}),t=Object.values(e);return U.injectedWallets=t,U.injectedWallets},getWalletImageUrl:e=>W.getWalletImageUrl(e),getAssetImageUrl:e=>W.getAssetImageUrl(e),resetSearch(){U.search={listings:[],total:0,page:1}}},T=d({pairingEnabled:!1,pairingUri:"",pairingError:!1}),x={state:T,subscribe:e=>u(T,()=>e(T)),setPairingUri(e){T.pairingUri=e},setPairingError(e){T.pairingError=e},setPairingEnabled(e){T.pairingEnabled=e}},_=d({open:!1}),K={state:_,subscribe:e=>u(_,()=>e(_)),open:async e=>new Promise(t=>{let{isUiLoaded:r,isDataLoaded:n,isPreferInjected:a,selectedChain:l}=w.state,{isConnected:o}=j.state,{enableNetworkView:s}=E.state;if(x.setPairingEnabled(!0),null!=e&&e.route)p.reset(e.route);else if(o)p.reset("Account");else if(s)p.reset("SelectNetwork");else if(a){h.client().connectConnector("injected",l?.id).catch(e=>console.error(e)),t();return}else p.reset("ConnectWallet");let{pairingUri:i}=x.state;if(r&&n&&(i||o))_.open=!0,t();else{let c=setInterval(()=>{let e=w.state,r=x.state;e.isUiLoaded&&e.isDataLoaded&&(r.pairingUri||o)&&(clearInterval(c),_.open=!0,t())},200)}}),close(){_.open=!1}};var V=Object.defineProperty,B=Object.getOwnPropertySymbols,z=Object.prototype.hasOwnProperty,H=Object.prototype.propertyIsEnumerable,F=(e,t,r)=>t in e?V(e,t,{enumerable:!0,configurable:!0,writable:!0,value:r}):e[t]=r,J=(e,t)=>{for(var r in t||(t={}))z.call(t,r)&&F(e,r,t[r]);if(B)for(var r of B(t))H.call(t,r)&&F(e,r,t[r]);return e};let G=d({themeMode:"u">typeof matchMedia&&matchMedia("(prefers-color-scheme: dark)").matches?"dark":"light"}),q={state:G,subscribe:e=>u(G,()=>e(G)),setThemeConfig(e){let{themeMode:t,themeVariables:r}=e;t&&(G.themeMode=t),r&&(G.themeVariables=J({},r))}},Q=d({open:!1,message:"",variant:"success"}),X={state:Q,subscribe:e=>u(Q,()=>e(Q)),openToast(e,t){Q.open=!0,Q.message=e,Q.variant=t},closeToast(){Q.open=!1}}},50555:function(e,t,r){r.d(t,{Eg:function(){return O},tn:function(){return u}});var n=r(67294),a=r(56882);Object.prototype.hasOwnProperty,Object.prototype.propertyIsEnumerable;var l=Object.defineProperty,o=Object.getOwnPropertySymbols,s=Object.prototype.hasOwnProperty,i=Object.prototype.propertyIsEnumerable,c=(e,t,r)=>t in e?l(e,t,{enumerable:!0,configurable:!0,writable:!0,value:r}):e[t]=r,d=(e,t)=>{for(var r in t||(t={}))s.call(t,r)&&c(e,r,t[r]);if(o)for(var r of o(t))i.call(t,r)&&c(e,r,t[r]);return e};function u(e){return n.createElement("w3m-core-button",d({},e))}var f=Object.defineProperty,p=Object.getOwnPropertySymbols,m=Object.prototype.hasOwnProperty,h=Object.prototype.propertyIsEnumerable,g=(e,t,r)=>t in e?f(e,t,{enumerable:!0,configurable:!0,writable:!0,value:r}):e[t]=r,y=(e,t)=>{for(var r in t||(t={}))m.call(t,r)&&g(e,r,t[r]);if(p)for(var r of p(t))h.call(t,r)&&g(e,r,t[r]);return e};function b(e){return n.createElement("w3m-modal",y({},e))}var v=Object.getOwnPropertySymbols,w=Object.prototype.hasOwnProperty,I=Object.prototype.propertyIsEnumerable,E=(e,t)=>{var r={};for(var n in e)w.call(e,n)&&0>t.indexOf(n)&&(r[n]=e[n]);if(null!=e&&v)for(var n of v(e))0>t.indexOf(n)&&I.call(e,n)&&(r[n]=e[n]);return r};let O=(0,n.memo)(function(e){var{ethereumClient:t}=e,l=E(e,["ethereumClient"]);let o=(0,n.useCallback)(async()=>{a.Ic.setThemeConfig(l),t&&a.Id.setEthereumClient(t),a.t0.setConfig(l),await Promise.all([r.e(7206),r.e(6765)]).then(r.bind(r,86765)),a.zb.setIsUiLoaded(!0)},[t,l]);return(0,n.useEffect)(()=>{o()},[o]),n.createElement(b,null)});Object.prototype.hasOwnProperty,Object.prototype.propertyIsEnumerable,Object.prototype.hasOwnProperty,Object.prototype.propertyIsEnumerable}}]);