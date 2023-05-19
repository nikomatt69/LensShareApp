(self.webpackChunk_N_E=self.webpackChunk_N_E||[]).push([[4486],{56964:function(e,t,r){"use strict";r.r(t);var o=r(85893),a=r(15209),i=r(67294),n=r(76781),s=r(37887),l=r(86501),d=r(39321),c=r(54524),u=r(11281),p=r(44122);let f=e=>{let{children:t}=e;(0,a.qr)(e=>e.setUserSigNonce),(0,a.qr)(e=>e.setCurrentProfile);let r=(0,a.qr)(e=>e.currentProfile),f=(0,a.qr)(e=>e.setCurrentProfile),m=(0,a.Fc)(e=>e.profileId),g=(0,a.Fc)(e=>e.setProfileId),{address:h,isDisconnected:y}=(0,c.mA)(),{chain:b}=(0,c.LN)(),[v,x]=(0,i.useState)(!1),{disconnect:w}=(0,c.qL)({onError(e){l.ZP.error(null==e?void 0:e.message)}}),{loading:E}=(0,s.a)(n.$,{variables:{request:{ownedBy:[h]}},skip:!m,onCompleted:e=>{var t;let r=null==e?void 0:null===(t=e.profiles)||void 0===t?void 0:t.items;if(!r.length)return N()},onError:()=>{g(null)}}),N=()=>{f(null),g(null)},C=()=>{let e=null==r?void 0:r.ownedBy,t=localStorage.getItem("accessToken")&&localStorage.getItem("refreshToken"),o=(null==b?void 0:b.id)!==d.Kj;(!t||o||y||void 0!==e&&e!==h)&&m&&(f(null),g(null),localStorage.removeItem("accessToken"),localStorage.removeItem("refreshToken"),null==w||w())};return((0,i.useEffect)(()=>{C()},[y,h,b,w,m]),(0,i.useEffect)(()=>{x(!0)},[]),E||!v)?(0,o.jsxs)("div",{className:"grid h-screen place-items-center",children:[(0,o.jsx)(u.Z,{}),(0,o.jsx)("div",{className:"animate-bounce",children:(0,o.jsx)("img",{src:(0,p.Z)("".concat(d.Fv,"/images/icon.png")),draggable:!1,className:"h-12 w-12 md:h-16 md:w-16",alt:"lensshare"})})]}):(0,o.jsxs)("div",{children:[" ",(0,o.jsx)(l.x7,{position:"bottom-right"}),t]})};t.default=f},15209:function(e,t,r){"use strict";r.d(t,{Fc:function(){return u},HB:function(){return p},Ju:function(){return d},nN:function(){return f},qr:function(){return c},sr:function(){return l}});var o=r(82921),a=r(76781),i=r(73445),n=r(782),s=r(39321);let l={stream:null,preview:"",videoType:"",file:null,title:"",description:"",category:"",thumbnail:"",thumbnailType:"",videoSource:"",percent:0,playbackId:"",isSensitiveContent:!1,isuploadIpfs:!1,isUploadToAr:!1,isIndexed:!1,loading:!1,uploadingThumbnail:!1,buttonText:"Post Video",durationInSeconds:null,collectModule:{followerOnlyCollect:!1,amount:{currency:s.Y7,value:""},referralFee:0,isTimedFeeCollect:!1,isFreeCollect:!0,isFeeCollect:!1,isRevertCollect:!1},referenceModule:{followerOnlyReferenceModule:!1,degreesOfSeparationReferenceModule:null}},d={balance:"0",estimatedPrice:"0",deposit:null,instance:null,depositing:!1,showDeposit:!1},c=(0,i.ZP)(e=>({showCreateBoard:!1,hasNewNotification:!1,setHasNewNotification:t=>e({hasNewNotification:t}),setShowCreateBoard:t=>e({showCreateBoard:t}),uploadedVideo:l,setUploadedVideo:t=>e(e=>({uploadedVideo:{...e.uploadedVideo,...t}})),bundlrData:d,setBundlrData:t=>e(e=>({bundlrData:{...e.bundlrData,...t}})),profiles:[],setProfiles:t=>e(()=>({profiles:t})),currentProfile:null,setCurrentProfile:t=>e(()=>({currentProfile:t})),userSigNonce:0,setUserSigNonce:t=>e(()=>({userSigNonce:t})),getBundlrInstance:async t=>{try{let r=new o.WebBundlr(s.$Y,s.Wq,null==t?void 0:t.provider,{providerUrl:s.FC});return await r.utils.getBundlerAddress(s.Wq),await r.ready(),r}catch(a){return console.log("[Error Init Bundlr]",a),e(e=>({uploadedVideo:{...e.uploadedVideo,loading:!1}})),null}}})),u=(0,i.ZP)((0,n.tJ)(e=>({profileId:null,setProfileId:t=>e(()=>({profileId:t}))}),{name:"lensshare.store"})),p=(0,i.ZP)(e=>({selectedReferenceModule:a._9.DegreesOfSeparationReferenceModule,setSelectedReferenceModule:t=>e(()=>({selectedReferenceModule:t})),onlyFollowers:!1,setOnlyFollowers:t=>e(()=>({onlyFollowers:t})),degreesOfSeparation:2,setDegreesOfSeparation:t=>e(()=>({degreesOfSeparation:t}))})),f=(0,i.ZP)((0,n.tJ)(e=>({txnQueue:[],setTxnQueue:t=>e(()=>({txnQueue:t}))}),{name:s.Pd.TRANSACTION_STORE}))},43094:function(){},80950:function(){},89214:function(){},85568:function(){},73105:function(){},52361:function(){},94616:function(){},55024:function(){},86501:function(e,t,r){"use strict";let o,a;r.d(t,{x7:function(){return ea},ZP:function(){return ei},Am:function(){return q}});var i,n=r(67294);let s={data:""},l=e=>"object"==typeof window?((e?e.querySelector("#_goober"):window._goober)||Object.assign((e||document.head).appendChild(document.createElement("style")),{innerHTML:" ",id:"_goober"})).firstChild:e||s,d=/(?:([\u0080-\uFFFF\w-%@]+) *:? *([^{;]+?);|([^;}{]*?) *{)|(}\s*)/g,c=/\/\*[^]*?\*\/|  +/g,u=/\n+/g,p=(e,t)=>{let r="",o="",a="";for(let i in e){let n=e[i];"@"==i[0]?"i"==i[1]?r=i+" "+n+";":o+="f"==i[1]?p(n,i):i+"{"+p(n,"k"==i[1]?"":t)+"}":"object"==typeof n?o+=p(n,t?t.replace(/([^,])+/g,e=>i.replace(/(^:.*)|([^,])+/g,t=>/&/.test(t)?t.replace(/&/g,e):e?e+" "+t:t)):i):null!=n&&(i=/^--/.test(i)?i:i.replace(/[A-Z]/g,"-$&").toLowerCase(),a+=p.p?p.p(i,n):i+":"+n+";")}return r+(t&&a?t+"{"+a+"}":a)+o},f={},m=e=>{if("object"==typeof e){let t="";for(let r in e)t+=r+m(e[r]);return t}return e},g=(e,t,r,o,a)=>{var i,n;let s=m(e),l=f[s]||(f[s]=(e=>{let t=0,r=11;for(;t<e.length;)r=101*r+e.charCodeAt(t++)>>>0;return"go"+r})(s));if(!f[l]){let g=s!==e?e:(e=>{let t,r,o=[{}];for(;t=d.exec(e.replace(c,""));)t[4]?o.shift():t[3]?(r=t[3].replace(u," ").trim(),o.unshift(o[0][r]=o[0][r]||{})):o[0][t[1]]=t[2].replace(u," ").trim();return o[0]})(e);f[l]=p(a?{["@keyframes "+l]:g}:g,r?"":"."+l)}let h=r&&f.g?f.g:null;return r&&(f.g=f[l]),i=f[l],n=t,h?n.data=n.data.replace(h,i):-1===n.data.indexOf(i)&&(n.data=o?i+n.data:n.data+i),l},h=(e,t,r)=>e.reduce((e,o,a)=>{let i=t[a];if(i&&i.call){let n=i(r),s=n&&n.props&&n.props.className||/^go/.test(n)&&n;i=s?"."+s:n&&"object"==typeof n?n.props?"":p(n,""):!1===n?"":n}return e+o+(null==i?"":i)},"");function y(e){let t=this||{},r=e.call?e(t.p):e;return g(r.unshift?r.raw?h(r,[].slice.call(arguments,1),t.p):r.reduce((e,r)=>Object.assign(e,r&&r.call?r(t.p):r),{}):r,l(t.target),t.g,t.o,t.k)}y.bind({g:1});let b,v,x,w=y.bind({k:1});function E(e,t){let r=this||{};return function(){let o=arguments;function a(i,n){let s=Object.assign({},i),l=s.className||a.className;r.p=Object.assign({theme:v&&v()},s),r.o=/ *go\d+/.test(l),s.className=y.apply(r,o)+(l?" "+l:""),t&&(s.ref=n);let d=e;return e[0]&&(d=s.as||e,delete s.as),x&&d[0]&&x(s),b(d,s)}return t?t(a):a}}var N=e=>"function"==typeof e,C=(e,t)=>N(e)?e(t):e,k=(o=0,()=>(++o).toString()),P=()=>{if(void 0===a&&"u">typeof window){let e=matchMedia("(prefers-reduced-motion: reduce)");a=!e||e.matches}return a},I=new Map,S=e=>{if(I.has(e))return;let t=setTimeout(()=>{I.delete(e),D({type:4,toastId:e})},1e3);I.set(e,t)},O=e=>{let t=I.get(e);t&&clearTimeout(t)},$=(e,t)=>{switch(t.type){case 0:return{...e,toasts:[t.toast,...e.toasts].slice(0,20)};case 1:return t.toast.id&&O(t.toast.id),{...e,toasts:e.toasts.map(e=>e.id===t.toast.id?{...e,...t.toast}:e)};case 2:let{toast:r}=t;return e.toasts.find(e=>e.id===r.id)?$(e,{type:1,toast:r}):$(e,{type:0,toast:r});case 3:let{toastId:o}=t;return o?S(o):e.toasts.forEach(e=>{S(e.id)}),{...e,toasts:e.toasts.map(e=>e.id===o||void 0===o?{...e,visible:!1}:e)};case 4:return void 0===t.toastId?{...e,toasts:[]}:{...e,toasts:e.toasts.filter(e=>e.id!==t.toastId)};case 5:return{...e,pausedAt:t.time};case 6:let a=t.time-(e.pausedAt||0);return{...e,pausedAt:void 0,toasts:e.toasts.map(e=>({...e,pauseDuration:e.pauseDuration+a}))}}},T=[],j={toasts:[],pausedAt:void 0},D=e=>{j=$(j,e),T.forEach(e=>{e(j)})},F={blank:4e3,error:4e3,success:2e3,loading:1/0,custom:4e3},A=(e={})=>{let[t,r]=(0,n.useState)(j);(0,n.useEffect)(()=>(T.push(r),()=>{let e=T.indexOf(r);e>-1&&T.splice(e,1)}),[t]);let o=t.toasts.map(t=>{var r,o;return{...e,...e[t.type],...t,duration:t.duration||(null==(r=e[t.type])?void 0:r.duration)||(null==e?void 0:e.duration)||F[t.type],style:{...e.style,...null==(o=e[t.type])?void 0:o.style,...t.style}}});return{...t,toasts:o}},M=(e,t="blank",r)=>({createdAt:Date.now(),visible:!0,type:t,ariaProps:{role:"status","aria-live":"polite"},message:e,pauseDuration:0,...r,id:(null==r?void 0:r.id)||k()}),B=e=>(t,r)=>{let o=M(t,e,r);return D({type:2,toast:o}),o.id},q=(e,t)=>B("blank")(e,t);q.error=B("error"),q.success=B("success"),q.loading=B("loading"),q.custom=B("custom"),q.dismiss=e=>{D({type:3,toastId:e})},q.remove=e=>D({type:4,toastId:e}),q.promise=(e,t,r)=>{let o=q.loading(t.loading,{...r,...null==r?void 0:r.loading});return e.then(e=>(q.success(C(t.success,e),{id:o,...r,...null==r?void 0:r.success}),e)).catch(e=>{q.error(C(t.error,e),{id:o,...r,...null==r?void 0:r.error})}),e};var z=(e,t)=>{D({type:1,toast:{id:e,height:t}})},R=()=>{D({type:5,time:Date.now()})},Z=e=>{let{toasts:t,pausedAt:r}=A(e);(0,n.useEffect)(()=>{if(r)return;let e=Date.now(),o=t.map(t=>{if(t.duration===1/0)return;let r=(t.duration||0)+t.pauseDuration-(e-t.createdAt);if(r<0){t.visible&&q.dismiss(t.id);return}return setTimeout(()=>q.dismiss(t.id),r)});return()=>{o.forEach(e=>e&&clearTimeout(e))}},[t,r]);let o=(0,n.useCallback)(()=>{r&&D({type:6,time:Date.now()})},[r]),a=(0,n.useCallback)((e,r)=>{let{reverseOrder:o=!1,gutter:a=8,defaultPosition:i}=r||{},n=t.filter(t=>(t.position||i)===(e.position||i)&&t.height),s=n.findIndex(t=>t.id===e.id),l=n.filter((e,t)=>t<s&&e.visible).length;return n.filter(e=>e.visible).slice(...o?[l+1]:[0,l]).reduce((e,t)=>e+(t.height||0)+a,0)},[t]);return{toasts:t,handlers:{updateHeight:z,startPause:R,endPause:o,calculateOffset:a}}},_=E("div")`
  width: 20px;
  opacity: 0;
  height: 20px;
  border-radius: 10px;
  background: ${e=>e.primary||"#ff4b4b"};
  position: relative;
  transform: rotate(45deg);

  animation: ${w`
from {
  transform: scale(0) rotate(45deg);
	opacity: 0;
}
to {
 transform: scale(1) rotate(45deg);
  opacity: 1;
}`} 0.3s cubic-bezier(0.175, 0.885, 0.32, 1.275)
    forwards;
  animation-delay: 100ms;

  &:after,
  &:before {
    content: '';
    animation: ${w`
from {
  transform: scale(0);
  opacity: 0;
}
to {
  transform: scale(1);
  opacity: 1;
}`} 0.15s ease-out forwards;
    animation-delay: 150ms;
    position: absolute;
    border-radius: 3px;
    opacity: 0;
    background: ${e=>e.secondary||"#fff"};
    bottom: 9px;
    left: 4px;
    height: 2px;
    width: 12px;
  }

  &:before {
    animation: ${w`
from {
  transform: scale(0) rotate(90deg);
	opacity: 0;
}
to {
  transform: scale(1) rotate(90deg);
	opacity: 1;
}`} 0.15s ease-out forwards;
    animation-delay: 180ms;
    transform: rotate(90deg);
  }
`,H=E("div")`
  width: 12px;
  height: 12px;
  box-sizing: border-box;
  border: 2px solid;
  border-radius: 100%;
  border-color: ${e=>e.secondary||"#e0e0e0"};
  border-right-color: ${e=>e.primary||"#616161"};
  animation: ${w`
  from {
    transform: rotate(0deg);
  }
  to {
    transform: rotate(360deg);
  }
`} 1s linear infinite;
`,U=E("div")`
  width: 20px;
  opacity: 0;
  height: 20px;
  border-radius: 10px;
  background: ${e=>e.primary||"#61d345"};
  position: relative;
  transform: rotate(45deg);

  animation: ${w`
from {
  transform: scale(0) rotate(45deg);
	opacity: 0;
}
to {
  transform: scale(1) rotate(45deg);
	opacity: 1;
}`} 0.3s cubic-bezier(0.175, 0.885, 0.32, 1.275)
    forwards;
  animation-delay: 100ms;
  &:after {
    content: '';
    box-sizing: border-box;
    animation: ${w`
0% {
	height: 0;
	width: 0;
	opacity: 0;
}
40% {
  height: 0;
	width: 6px;
	opacity: 1;
}
100% {
  opacity: 1;
  height: 10px;
}`} 0.2s ease-out forwards;
    opacity: 0;
    animation-delay: 200ms;
    position: absolute;
    border-right: 2px solid;
    border-bottom: 2px solid;
    border-color: ${e=>e.secondary||"#fff"};
    bottom: 6px;
    left: 6px;
    height: 10px;
    width: 6px;
  }
`,V=E("div")`
  position: absolute;
`,L=E("div")`
  position: relative;
  display: flex;
  justify-content: center;
  align-items: center;
  min-width: 20px;
  min-height: 20px;
`,J=E("div")`
  position: relative;
  transform: scale(0.6);
  opacity: 0.4;
  min-width: 20px;
  animation: ${w`
from {
  transform: scale(0.6);
  opacity: 0.4;
}
to {
  transform: scale(1);
  opacity: 1;
}`} 0.3s 0.12s cubic-bezier(0.175, 0.885, 0.32, 1.275)
    forwards;
`,W=({toast:e})=>{let{icon:t,type:r,iconTheme:o}=e;return void 0!==t?"string"==typeof t?n.createElement(J,null,t):t:"blank"===r?null:n.createElement(L,null,n.createElement(H,{...o}),"loading"!==r&&n.createElement(V,null,"error"===r?n.createElement(_,{...o}):n.createElement(U,{...o})))},Y=e=>`
0% {transform: translate3d(0,${-200*e}%,0) scale(.6); opacity:.5;}
100% {transform: translate3d(0,0,0) scale(1); opacity:1;}
`,Q=e=>`
0% {transform: translate3d(0,0,-1px) scale(1); opacity:1;}
100% {transform: translate3d(0,${-150*e}%,-1px) scale(.6); opacity:0;}
`,K=E("div")`
  display: flex;
  align-items: center;
  background: #fff;
  color: #363636;
  line-height: 1.3;
  will-change: transform;
  box-shadow: 0 3px 10px rgba(0, 0, 0, 0.1), 0 3px 3px rgba(0, 0, 0, 0.05);
  max-width: 350px;
  pointer-events: auto;
  padding: 8px 10px;
  border-radius: 8px;
`,G=E("div")`
  display: flex;
  justify-content: center;
  margin: 4px 10px;
  color: inherit;
  flex: 1 1 auto;
  white-space: pre-line;
`,X=(e,t)=>{let r=e.includes("top")?1:-1,[o,a]=P()?["0%{opacity:0;} 100%{opacity:1;}","0%{opacity:1;} 100%{opacity:0;}"]:[Y(r),Q(r)];return{animation:t?`${w(o)} 0.35s cubic-bezier(.21,1.02,.73,1) forwards`:`${w(a)} 0.4s forwards cubic-bezier(.06,.71,.55,1)`}},ee=n.memo(({toast:e,position:t,style:r,children:o})=>{let a=e.height?X(e.position||t||"top-center",e.visible):{opacity:0},i=n.createElement(W,{toast:e}),s=n.createElement(G,{...e.ariaProps},C(e.message,e));return n.createElement(K,{className:e.className,style:{...a,...r,...e.style}},"function"==typeof o?o({icon:i,message:s}):n.createElement(n.Fragment,null,i,s))});i=n.createElement,p.p=void 0,b=i,v=void 0,x=void 0;var et=({id:e,className:t,style:r,onHeightUpdate:o,children:a})=>{let i=n.useCallback(t=>{if(t){let r=()=>{o(e,t.getBoundingClientRect().height)};r(),new MutationObserver(r).observe(t,{subtree:!0,childList:!0,characterData:!0})}},[e,o]);return n.createElement("div",{ref:i,className:t,style:r},a)},er=(e,t)=>{let r=e.includes("top"),o=e.includes("center")?{justifyContent:"center"}:e.includes("right")?{justifyContent:"flex-end"}:{};return{left:0,right:0,display:"flex",position:"absolute",transition:P()?void 0:"all 230ms cubic-bezier(.21,1.02,.73,1)",transform:`translateY(${t*(r?1:-1)}px)`,...r?{top:0}:{bottom:0},...o}},eo=y`
  z-index: 9999;
  > * {
    pointer-events: auto;
  }
`,ea=({reverseOrder:e,position:t="top-center",toastOptions:r,gutter:o,children:a,containerStyle:i,containerClassName:s})=>{let{toasts:l,handlers:d}=Z(r);return n.createElement("div",{style:{position:"fixed",zIndex:9999,top:16,left:16,right:16,bottom:16,pointerEvents:"none",...i},className:s,onMouseEnter:d.startPause,onMouseLeave:d.endPause},l.map(r=>{let i=r.position||t,s=er(i,d.calculateOffset(r,{reverseOrder:e,gutter:o,defaultPosition:t}));return n.createElement(et,{id:r.id,key:r.id,onHeightUpdate:d.updateHeight,className:r.visible?eo:"",style:s},"custom"===r.type?C(r.message,r):a?a(r):n.createElement(ee,{toast:r,position:i}))}))},ei=q}}]);