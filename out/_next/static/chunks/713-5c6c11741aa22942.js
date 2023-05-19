"use strict";(self.webpackChunk_N_E=self.webpackChunk_N_E||[]).push([[713],{61363:function(e,t,n){n.d(t,{R:function(){return i}});var r,i=((r=i||{}).Space=" ",r.Enter="Enter",r.Escape="Escape",r.Backspace="Backspace",r.Delete="Delete",r.ArrowLeft="ArrowLeft",r.ArrowUp="ArrowUp",r.ArrowRight="ArrowRight",r.ArrowDown="ArrowDown",r.Home="Home",r.End="End",r.PageUp="PageUp",r.PageDown="PageDown",r.Tab="Tab",r)},11355:function(e,t,n){n.d(t,{u:function(){return k}});var r,i=n(67294),u=n(12351),o=n(16567),l=n(32984),a=n(14879),s=n(16723),c=n(3855),f=n(82180),d=n(23784),m=n(9362);function v(e,...t){e&&t.length>0&&e.classList.add(...t)}function p(e,...t){e&&t.length>0&&e.classList.remove(...t)}var h=n(94192),E=n(73781),g=n(5003),b=n(14227);function y(e=""){return e.split(" ").filter(e=>e.trim().length>1)}let w=(0,i.createContext)(null);w.displayName="TransitionContext";var F=((r=F||{}).Visible="visible",r.Hidden="hidden",r);let O=(0,i.createContext)(null);function T(e){return"children"in e?T(e.children):e.current.filter(({el:e})=>null!==e.current).filter(({state:e})=>"visible"===e).length>0}function N(e,t){let n=(0,c.E)(e),r=(0,i.useRef)([]),o=(0,a.t)(),s=(0,h.G)(),f=(0,E.z)((e,t=u.l4.Hidden)=>{let i=r.current.findIndex(({el:t})=>t===e);-1!==i&&((0,l.E)(t,{[u.l4.Unmount](){r.current.splice(i,1)},[u.l4.Hidden](){r.current[i].state="hidden"}}),s.microTask(()=>{var e;!T(r)&&o.current&&(null==(e=n.current)||e.call(n))}))}),d=(0,E.z)(e=>{let t=r.current.find(({el:t})=>t===e);return t?"visible"!==t.state&&(t.state="visible"):r.current.push({el:e,state:"visible"}),()=>f(e,u.l4.Unmount)}),m=(0,i.useRef)([]),v=(0,i.useRef)(Promise.resolve()),p=(0,i.useRef)({enter:[],leave:[],idle:[]}),g=(0,E.z)((e,n,r)=>{m.current.splice(0),t&&(t.chains.current[n]=t.chains.current[n].filter(([t])=>t!==e)),null==t||t.chains.current[n].push([e,new Promise(e=>{m.current.push(e)})]),null==t||t.chains.current[n].push([e,new Promise(e=>{Promise.all(p.current[n].map(([e,t])=>t)).then(()=>e())})]),"enter"===n?v.current=v.current.then(()=>null==t?void 0:t.wait.current).then(()=>r(n)):r(n)}),b=(0,E.z)((e,t,n)=>{Promise.all(p.current[t].splice(0).map(([e,t])=>t)).then(()=>{var e;null==(e=m.current.shift())||e()}).then(()=>n(t))});return(0,i.useMemo)(()=>({children:r,register:d,unregister:f,onStart:g,onStop:b,wait:v,chains:p}),[d,f,r,g,b,p,v])}function S(){}O.displayName="NestingContext";let A=["beforeEnter","afterEnter","beforeLeave","afterLeave"];function P(e){var t;let n={};for(let r of A)n[r]=null!=(t=e[r])?t:S;return n}let C=u.AN.RenderStrategy,L=(0,u.yV)(function(e,t){let{show:n,appear:r=!1,unmount:l,...a}=e,c=(0,i.useRef)(null),m=(0,d.T)(c,t);(0,f.H)();let v=(0,o.oJ)();if(void 0===n&&null!==v&&(n=(v&o.ZM.Open)===o.ZM.Open),![!0,!1].includes(n))throw Error("A <Transition /> is used but it is missing a `show={true | false}` prop.");let[p,h]=(0,i.useState)(n?"visible":"hidden"),E=N(()=>{h("hidden")}),[g,b]=(0,i.useState)(!0),y=(0,i.useRef)([n]);(0,s.e)(()=>{!1!==g&&y.current[y.current.length-1]!==n&&(y.current.push(n),b(!1))},[y,n]);let F=(0,i.useMemo)(()=>({show:n,appear:r,initial:g}),[n,r,g]);(0,i.useEffect)(()=>{if(n)h("visible");else if(T(E)){let e=c.current;if(!e)return;let t=e.getBoundingClientRect();0===t.x&&0===t.y&&0===t.width&&0===t.height&&h("hidden")}else h("hidden")},[n,E]);let S={unmount:l};return i.createElement(O.Provider,{value:E},i.createElement(w.Provider,{value:F},(0,u.sY)({ourProps:{...S,as:i.Fragment,children:i.createElement(x,{ref:m,...S,...a})},theirProps:{},defaultTag:i.Fragment,features:C,visible:"visible"===p,name:"Transition"})))}),x=(0,u.yV)(function(e,t){var n;let r,{beforeEnter:F,afterEnter:S,beforeLeave:A,afterLeave:L,enter:x,enterFrom:M,enterTo:k,entered:R,leave:j,leaveFrom:H,leaveTo:I,...D}=e,U=(0,i.useRef)(null),V=(0,d.T)(U,t),_=D.unmount?u.l4.Unmount:u.l4.Hidden,{show:z,appear:Z,initial:q}=function(){let e=(0,i.useContext)(w);if(null===e)throw Error("A <Transition.Child /> is used but it is missing a parent <Transition /> or <Transition.Root />.");return e}(),[G,Y]=(0,i.useState)(z?"visible":"hidden"),$=function(){let e=(0,i.useContext)(O);if(null===e)throw Error("A <Transition.Child /> is used but it is missing a parent <Transition /> or <Transition.Root />.");return e}(),{register:B,unregister:J}=$,K=(0,i.useRef)(null);(0,i.useEffect)(()=>B(U),[B,U]),(0,i.useEffect)(()=>{if(_===u.l4.Hidden&&U.current){if(z&&"visible"!==G){Y("visible");return}return(0,l.E)(G,{hidden:()=>J(U),visible:()=>B(U)})}},[G,U,B,J,z,_]);let W=(0,c.E)({enter:y(x),enterFrom:y(M),enterTo:y(k),entered:y(R),leave:y(j),leaveFrom:y(H),leaveTo:y(I)}),X=(n={beforeEnter:F,afterEnter:S,beforeLeave:A,afterLeave:L},r=(0,i.useRef)(P(n)),(0,i.useEffect)(()=>{r.current=P(n)},[n]),r),Q=(0,f.H)();(0,i.useEffect)(()=>{if(Q&&"visible"===G&&null===U.current)throw Error("Did you forget to passthrough the `ref` to the actual DOM node?")},[U,G,Q]);let ee=q&&!Z,et=!Q||ee||K.current===z?"idle":z?"enter":"leave",en=(0,b.V)(0),er=(0,E.z)(e=>(0,l.E)(e,{enter:()=>{en.addFlag(o.ZM.Opening),X.current.beforeEnter()},leave:()=>{en.addFlag(o.ZM.Closing),X.current.beforeLeave()},idle:()=>{}})),ei=(0,E.z)(e=>(0,l.E)(e,{enter:()=>{en.removeFlag(o.ZM.Opening),X.current.afterEnter()},leave:()=>{en.removeFlag(o.ZM.Closing),X.current.afterLeave()},idle:()=>{}})),eu=N(()=>{Y("hidden"),J(U)},$);(function({container:e,direction:t,classes:n,onStart:r,onStop:i}){let u=(0,a.t)(),o=(0,h.G)(),f=(0,c.E)(t);(0,s.e)(()=>{let t=(0,m.k)();o.add(t.dispose);let a=e.current;if(a&&"idle"!==f.current&&u.current){var s,c,d,h;let E,g,b,y,w,F,O;return t.dispose(),r.current(f.current),t.add((s=a,c=n.current,d="enter"===f.current,h=()=>{t.dispose(),i.current(f.current)},g=d?"enter":"leave",b=(0,m.k)(),y=void 0!==h?(E={called:!1},(...e)=>{if(!E.called)return E.called=!0,h(...e)}):()=>{},"enter"===g&&(s.removeAttribute("hidden"),s.style.display=""),w=(0,l.E)(g,{enter:()=>c.enter,leave:()=>c.leave}),F=(0,l.E)(g,{enter:()=>c.enterTo,leave:()=>c.leaveTo}),O=(0,l.E)(g,{enter:()=>c.enterFrom,leave:()=>c.leaveFrom}),p(s,...c.enter,...c.enterTo,...c.enterFrom,...c.leave,...c.leaveFrom,...c.leaveTo,...c.entered),v(s,...w,...O),b.nextFrame(()=>{p(s,...O),v(s,...F),function(e,t){let n=(0,m.k)();if(!e)return n.dispose;let{transitionDuration:r,transitionDelay:i}=getComputedStyle(e),[u,o]=[r,i].map(e=>{let[t=0]=e.split(",").filter(Boolean).map(e=>e.includes("ms")?parseFloat(e):1e3*parseFloat(e)).sort((e,t)=>t-e);return t}),l=u+o;if(0!==l){n.group(n=>{n.setTimeout(()=>{t(),n.dispose()},l),n.addEventListener(e,"transitionrun",e=>{e.target===e.currentTarget&&n.dispose()})});let a=n.addEventListener(e,"transitionend",e=>{e.target===e.currentTarget&&(t(),a())})}else t();n.add(()=>t()),n.dispose}(s,()=>(p(s,...w),v(s,...c.entered),y()))}),b.dispose)),t.dispose}},[t])})({container:U,classes:W,direction:et,onStart:(0,c.E)(e=>{eu.onStart(U,e,er)}),onStop:(0,c.E)(e=>{eu.onStop(U,e,ei),"leave"!==e||T(eu)||(Y("hidden"),J(U))})}),(0,i.useEffect)(()=>{ee&&(_===u.l4.Hidden?K.current=null:K.current=z)},[z,ee,G]);let eo=D;return Z&&z&&(eo={...eo,className:(0,g.A)(D.className,...W.current.enter,...W.current.enterFrom)}),i.createElement(O.Provider,{value:eu},i.createElement(o.up,{value:(0,l.E)(G,{visible:o.ZM.Open,hidden:o.ZM.Closed})|en.flags},(0,u.sY)({ourProps:{ref:V},theirProps:eo,defaultTag:"div",features:C,visible:"visible"===G,name:"Transition.Child"})))}),M=(0,u.yV)(function(e,t){let n=null!==(0,i.useContext)(w),r=null!==(0,o.oJ)();return i.createElement(i.Fragment,null,!n&&r?i.createElement(L,{ref:t,...e}):i.createElement(x,{ref:t,...e}))}),k=Object.assign(L,{Child:M,Root:L})},94192:function(e,t,n){n.d(t,{G:function(){return u}});var r=n(67294),i=n(9362);function u(){let[e]=(0,r.useState)(i.k);return(0,r.useEffect)(()=>()=>e.dispose(),[e]),e}},73781:function(e,t,n){n.d(t,{z:function(){return u}});var r=n(67294),i=n(3855);let u=function(e){let t=(0,i.E)(e);return r.useCallback((...e)=>t.current(...e),[t])}},14227:function(e,t,n){n.d(t,{V:function(){return u}});var r=n(67294),i=n(14879);function u(e=0){let[t,n]=(0,r.useState)(e),u=(0,i.t)(),o=(0,r.useCallback)(e=>{u.current&&n(t=>t|e)},[t,u]),l=(0,r.useCallback)(e=>Boolean(t&e),[t]);return{flags:t,addFlag:o,hasFlag:l,removeFlag:(0,r.useCallback)(e=>{u.current&&n(t=>t&~e)},[n,u]),toggleFlag:(0,r.useCallback)(e=>{u.current&&n(t=>t^e)},[n])}}},19946:function(e,t,n){n.d(t,{M:function(){return a}});var r,i=n(67294),u=n(16723),o=n(82180),l=n(77896);let a=null!=(r=i.useId)?r:function(){let e=(0,o.H)(),[t,n]=i.useState(e?()=>l.O.nextId():null);return(0,u.e)(()=>{null===t&&n(l.O.nextId())},[t]),null!=t?""+t:void 0}},14879:function(e,t,n){n.d(t,{t:function(){return u}});var r=n(67294),i=n(16723);function u(){let e=(0,r.useRef)(!1);return(0,i.e)(()=>(e.current=!0,()=>{e.current=!1}),[]),e}},16723:function(e,t,n){n.d(t,{e:function(){return u}});var r=n(67294),i=n(77896);let u=(e,t)=>{i.O.isServer?(0,r.useEffect)(e,t):(0,r.useLayoutEffect)(e,t)}},3855:function(e,t,n){n.d(t,{E:function(){return u}});var r=n(67294),i=n(16723);function u(e){let t=(0,r.useRef)(e);return(0,i.e)(()=>{t.current=e},[e]),t}},39650:function(e,t,n){n.d(t,{O:function(){return l}});var r=n(67294),i=n(84575),u=n(3855);function o(e,t,n){let i=(0,u.E)(t);(0,r.useEffect)(()=>{function t(e){i.current(e)}return document.addEventListener(e,t,n),()=>document.removeEventListener(e,t,n)},[e,n])}function l(e,t,n=!0){let u=(0,r.useRef)(!1);function l(n,r){if(!u.current||n.defaultPrevented)return;let o=function e(t){return"function"==typeof t?e(t()):Array.isArray(t)||t instanceof Set?t:[t]}(e),l=r(n);if(null!==l&&l.getRootNode().contains(l)){for(let a of o){if(null===a)continue;let s=a instanceof HTMLElement?a:a.current;if(null!=s&&s.contains(l)||n.composed&&n.composedPath().includes(s))return}return(0,i.sP)(l,i.tJ.Loose)||-1===l.tabIndex||n.preventDefault(),t(n,l)}}(0,r.useEffect)(()=>{requestAnimationFrame(()=>{u.current=n})},[n]);let a=(0,r.useRef)(null);o("mousedown",e=>{var t,n;u.current&&(a.current=(null==(n=null==(t=e.composedPath)?void 0:t.call(e))?void 0:n[0])||e.target)},!0),o("click",e=>{a.current&&(l(e,()=>a.current),a.current=null)},!0),o("blur",e=>l(e,()=>window.document.activeElement instanceof HTMLIFrameElement?window.document.activeElement:null),!0)}},51074:function(e,t,n){n.d(t,{i:function(){return u}});var r=n(67294),i=n(15466);function u(...e){return(0,r.useMemo)(()=>(0,i.r)(...e),[...e])}},82180:function(e,t,n){n.d(t,{H:function(){return u}});var r=n(67294),i=n(77896);function u(){let[e,t]=(0,r.useState)(i.O.isHandoffComplete);return e&&!1===i.O.isHandoffComplete&&t(!1),(0,r.useEffect)(()=>{!0!==e&&t(!0)},[e]),(0,r.useEffect)(()=>i.O.handoff(),[]),e}},23784:function(e,t,n){n.d(t,{T:function(){return l},h:function(){return o}});var r=n(67294),i=n(73781);let u=Symbol();function o(e,t=!0){return Object.assign(e,{[u]:t})}function l(...e){let t=(0,r.useRef)(e);(0,r.useEffect)(()=>{t.current=e},[e]);let n=(0,i.z)(e=>{for(let n of t.current)null!=n&&("function"==typeof n?n(e):n.current=e)});return e.every(e=>null==e||(null==e?void 0:e[u]))?void 0:n}},46045:function(e,t,n){n.d(t,{A:function(){return u},_:function(){return o}});var r,i=n(12351),u=((r=u||{})[r.None=1]="None",r[r.Focusable=2]="Focusable",r[r.Hidden=4]="Hidden",r);let o=(0,i.yV)(function(e,t){let{features:n=1,...r}=e,u={ref:t,"aria-hidden":(2&n)==2||void 0,style:{position:"fixed",top:1,left:1,width:1,height:0,padding:0,margin:-1,overflow:"hidden",clip:"rect(0, 0, 0, 0)",whiteSpace:"nowrap",borderWidth:"0",...(4&n)==4&&(2&n)!=2&&{display:"none"}}};return(0,i.sY)({ourProps:u,theirProps:r,slot:{},defaultTag:"div",name:"Hidden"})})},16567:function(e,t,n){n.d(t,{ZM:function(){return o},oJ:function(){return l},up:function(){return a}});var r,i=n(67294);let u=(0,i.createContext)(null);u.displayName="OpenClosedContext";var o=((r=o||{})[r.Open=1]="Open",r[r.Closed=2]="Closed",r[r.Closing=4]="Closing",r[r.Opening=8]="Opening",r);function l(){return(0,i.useContext)(u)}function a({value:e,children:t}){return i.createElement(u.Provider,{value:e},t)}},64103:function(e,t,n){function r(e){let t=e.parentElement,n=null;for(;t&&!(t instanceof HTMLFieldSetElement);)t instanceof HTMLLegendElement&&(n=t),t=t.parentElement;let r=(null==t?void 0:t.getAttribute("disabled"))==="";return!(r&&function(e){if(!e)return!1;let t=e.previousElementSibling;for(;null!==t;){if(t instanceof HTMLLegendElement)return!1;t=t.previousElementSibling}return!0}(n))&&r}n.d(t,{P:function(){return r}})},5003:function(e,t,n){n.d(t,{A:function(){return r}});function r(...e){return e.filter(Boolean).join(" ")}},9362:function(e,t,n){n.d(t,{k:function(){return function e(){let t=[],n={addEventListener:(e,t,r,i)=>(e.addEventListener(t,r,i),n.add(()=>e.removeEventListener(t,r,i))),requestAnimationFrame(...e){let t=requestAnimationFrame(...e);return n.add(()=>cancelAnimationFrame(t))},nextFrame:(...e)=>n.requestAnimationFrame(()=>n.requestAnimationFrame(...e)),setTimeout(...e){let t=setTimeout(...e);return n.add(()=>clearTimeout(t))},microTask(...e){let t={current:!0};return(0,r.Y)(()=>{t.current&&e[0]()}),n.add(()=>{t.current=!1})},style(e,t,n){let r=e.style.getPropertyValue(t);return Object.assign(e.style,{[t]:n}),this.add(()=>{Object.assign(e.style,{[t]:r})})},group(t){let n=e();return t(n),this.add(()=>n.dispose())},add:e=>(t.push(e),()=>{let n=t.indexOf(e);if(n>=0)for(let r of t.splice(n,1))r()}),dispose(){for(let e of t.splice(0))e()}};return n}}});var r=n(81021)},77896:function(e,t,n){n.d(t,{O:function(){return o}});var r=Object.defineProperty,i=(e,t,n)=>t in e?r(e,t,{enumerable:!0,configurable:!0,writable:!0,value:n}):e[t]=n,u=(e,t,n)=>(i(e,"symbol"!=typeof t?t+"":t,n),n);let o=new class{constructor(){u(this,"current",this.detect()),u(this,"handoffState","pending"),u(this,"currentId",0)}set(e){this.current!==e&&(this.handoffState="pending",this.currentId=0,this.current=e)}reset(){this.set(this.detect())}nextId(){return++this.currentId}get isServer(){return"server"===this.current}get isClient(){return"client"===this.current}detect(){return"undefined"==typeof window||"undefined"==typeof document?"server":"client"}handoff(){"pending"===this.handoffState&&(this.handoffState="complete")}get isHandoffComplete(){return"complete"===this.handoffState}}},84575:function(e,t,n){n.d(t,{C5:function(){return y},EO:function(){return F},TO:function(){return d},fE:function(){return m},jA:function(){return O},sP:function(){return E},tJ:function(){return h},wI:function(){return g},z2:function(){return w}});var r,i,u,o,l,a=n(9362),s=n(32984),c=n(15466);let f=["[contentEditable=true]","[tabindex]","a[href]","area[href]","button:not([disabled])","iframe","input:not([disabled])","select:not([disabled])","textarea:not([disabled])"].map(e=>`${e}:not([tabindex='-1'])`).join(",");var d=((r=d||{})[r.First=1]="First",r[r.Previous=2]="Previous",r[r.Next=4]="Next",r[r.Last=8]="Last",r[r.WrapAround=16]="WrapAround",r[r.NoScroll=32]="NoScroll",r),m=((i=m||{})[i.Error=0]="Error",i[i.Overflow=1]="Overflow",i[i.Success=2]="Success",i[i.Underflow=3]="Underflow",i),v=((u=v||{})[u.Previous=-1]="Previous",u[u.Next=1]="Next",u);function p(e=document.body){return null==e?[]:Array.from(e.querySelectorAll(f)).sort((e,t)=>Math.sign((e.tabIndex||Number.MAX_SAFE_INTEGER)-(t.tabIndex||Number.MAX_SAFE_INTEGER)))}var h=((o=h||{})[o.Strict=0]="Strict",o[o.Loose=1]="Loose",o);function E(e,t=0){var n;return e!==(null==(n=(0,c.r)(e))?void 0:n.body)&&(0,s.E)(t,{0:()=>e.matches(f),1(){let t=e;for(;null!==t;){if(t.matches(f))return!0;t=t.parentElement}return!1}})}function g(e){let t=(0,c.r)(e);(0,a.k)().nextFrame(()=>{t&&!E(t.activeElement,0)&&y(e)})}var b=((l=b||{})[l.Keyboard=0]="Keyboard",l[l.Mouse=1]="Mouse",l);function y(e){null==e||e.focus({preventScroll:!0})}function w(e,t=e=>e){return e.slice().sort((e,n)=>{let r=t(e),i=t(n);if(null===r||null===i)return 0;let u=r.compareDocumentPosition(i);return u&Node.DOCUMENT_POSITION_FOLLOWING?-1:u&Node.DOCUMENT_POSITION_PRECEDING?1:0})}function F(e,t){return O(p(),t,{relativeTo:e})}function O(e,t,{sorted:n=!0,relativeTo:r=null,skipElements:i=[]}={}){var u,o,l;let a=Array.isArray(e)?e.length>0?e[0].ownerDocument:document:e.ownerDocument,s=Array.isArray(e)?n?w(e):e:p(e);i.length>0&&s.length>1&&(s=s.filter(e=>!i.includes(e))),r=null!=r?r:a.activeElement;let c=(()=>{if(5&t)return 1;if(10&t)return -1;throw Error("Missing Focus.First, Focus.Previous, Focus.Next or Focus.Last")})(),f=(()=>{if(1&t)return 0;if(2&t)return Math.max(0,s.indexOf(r))-1;if(4&t)return Math.max(0,s.indexOf(r))+1;if(8&t)return s.length-1;throw Error("Missing Focus.First, Focus.Previous, Focus.Next or Focus.Last")})(),d=32&t?{preventScroll:!0}:{},m=0,v=s.length,h;do{if(m>=v||m+v<=0)return 0;let E=f+m;if(16&t)E=(E+v)%v;else{if(E<0)return 3;if(E>=v)return 1}null==(h=s[E])||h.focus(d),m+=c}while(h!==a.activeElement);return 6&t&&null!=(l=null==(o=null==(u=h)?void 0:u.matches)?void 0:o.call(u,"textarea,input"))&&l&&h.select(),2}"undefined"!=typeof window&&"undefined"!=typeof document&&(document.addEventListener("keydown",e=>{e.metaKey||e.altKey||e.ctrlKey||(document.documentElement.dataset.headlessuiFocusVisible="")},!0),document.addEventListener("click",e=>{1===e.detail?delete document.documentElement.dataset.headlessuiFocusVisible:0===e.detail&&(document.documentElement.dataset.headlessuiFocusVisible="")},!0))},32984:function(e,t,n){n.d(t,{E:function(){return r}});function r(e,t,...n){if(e in t){let i=t[e];return"function"==typeof i?i(...n):i}let u=Error(`Tried to handle "${e}" but there is no handler defined. Only defined handlers are: ${Object.keys(t).map(e=>`"${e}"`).join(", ")}.`);throw Error.captureStackTrace&&Error.captureStackTrace(u,r),u}},81021:function(e,t,n){n.d(t,{Y:function(){return r}});function r(e){"function"==typeof queueMicrotask?queueMicrotask(e):Promise.resolve().then(e).catch(e=>setTimeout(()=>{throw e}))}},15466:function(e,t,n){n.d(t,{r:function(){return i}});var r=n(77896);function i(e){return r.O.isServer?null:e instanceof Node?e.ownerDocument:null!=e&&e.hasOwnProperty("current")&&e.current instanceof Node?e.current.ownerDocument:document}},12351:function(e,t,n){n.d(t,{AN:function(){return a},l4:function(){return s},oA:function(){return v},sY:function(){return c},yV:function(){return m}});var r,i,u=n(67294),o=n(5003),l=n(32984),a=((r=a||{})[r.None=0]="None",r[r.RenderStrategy=1]="RenderStrategy",r[r.Static=2]="Static",r),s=((i=s||{})[i.Unmount=0]="Unmount",i[i.Hidden=1]="Hidden",i);function c({ourProps:e,theirProps:t,slot:n,defaultTag:r,features:i,visible:u=!0,name:o}){let a=d(t,e);if(u)return f(a,n,r,o);let s=null!=i?i:0;if(2&s){let{static:c=!1,...m}=a;if(c)return f(m,n,r,o)}if(1&s){let{unmount:v=!0,...p}=a;return(0,l.E)(v?0:1,{0:()=>null,1:()=>f({...p,hidden:!0,style:{display:"none"}},n,r,o)})}return f(a,n,r,o)}function f(e,t={},n,r){let{as:i=n,children:l,refName:a="ref",...s}=p(e,["unmount","static"]),c=void 0!==e.ref?{[a]:e.ref}:{},f="function"==typeof l?l(t):l;"className"in s&&s.className&&"function"==typeof s.className&&(s.className=s.className(t));let m={};if(t){let h=!1,E=[];for(let[g,b]of Object.entries(t))"boolean"==typeof b&&(h=!0),!0===b&&E.push(g);h&&(m["data-headlessui-state"]=E.join(" "))}if(i===u.Fragment&&Object.keys(v(s)).length>0){if(!(0,u.isValidElement)(f)||Array.isArray(f)&&f.length>1)throw Error(['Passing props on "Fragment"!',"",`The current component <${r} /> is rendering a "Fragment".`,"However we need to passthrough the following props:",Object.keys(s).map(e=>`  - ${e}`).join(`
`),"","You can apply a few solutions:",['Add an `as="..."` prop, to ensure that we render an actual element instead of a "Fragment".',"Render a single element as the child so that we can forward the props onto that element."].map(e=>`  - ${e}`).join(`
`)].join(`
`));let y=f.props,w="function"==typeof(null==y?void 0:y.className)?(...e)=>(0,o.A)(null==y?void 0:y.className(...e),s.className):(0,o.A)(null==y?void 0:y.className,s.className);return(0,u.cloneElement)(f,Object.assign({},d(f.props,v(p(s,["ref"]))),m,c,function(...e){return{ref:e.every(e=>null==e)?void 0:t=>{for(let n of e)null!=n&&("function"==typeof n?n(t):n.current=t)}}}(f.ref,c.ref),w?{className:w}:{}))}return(0,u.createElement)(i,Object.assign({},p(s,["ref"]),i!==u.Fragment&&c,i!==u.Fragment&&m),f)}function d(...e){if(0===e.length)return{};if(1===e.length)return e[0];let t={},n={};for(let r of e)for(let i in r)i.startsWith("on")&&"function"==typeof r[i]?(null!=n[i]||(n[i]=[]),n[i].push(r[i])):t[i]=r[i];if(t.disabled||t["aria-disabled"])return Object.assign(t,Object.fromEntries(Object.keys(n).map(e=>[e,void 0])));for(let u in n)Object.assign(t,{[u](e,...t){for(let r of n[u]){if((e instanceof Event||(null==e?void 0:e.nativeEvent)instanceof Event)&&e.defaultPrevented)return;r(e,...t)}}});return t}function m(e){var t;return Object.assign((0,u.forwardRef)(e),{displayName:null!=(t=e.displayName)?t:e.name})}function v(e){let t=Object.assign({},e);for(let n in t)void 0===t[n]&&delete t[n];return t}function p(e,t=[]){let n=Object.assign({},e);for(let r of t)r in n&&delete n[r];return n}}}]);