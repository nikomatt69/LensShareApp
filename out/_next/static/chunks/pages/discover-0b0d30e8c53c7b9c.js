(self.webpackChunk_N_E=self.webpackChunk_N_E||[]).push([[2626],{24477:function(e,t,r){(window.__NEXT_P=window.__NEXT_P||[]).push(["/discover",function(){return r(60792)}])},66909:function(e,t,r){"use strict";var n=r(85893),o=r(37887),i=r(41664),s=r.n(i),a=r(25675),l=r.n(a),c=r(68980),d=r(22257),u=r(92882),m=r(31618),p=r(29451);let f=()=>{let e=(0,u.qr)(e=>e.currentProfile);console.log("ADDRESSS",null==e?void 0:e.id);let{address:t}=(0,m.mA)(),{data:r,loading:i,error:a}=(0,o.a)(c.k8C,{nextFetchPolicy:"standby",variables:{request:{address:t}}}),f=null==r?void 0:r.following.items;return console.log("I Follow",f),(0,n.jsxs)("div",{className:"border-gray-200 pb-4 lg:border-b-2",children:[(0,n.jsx)("p",{className:"m-3 mt-4 hidden font-semibold text-gray-500 lg:block",children:"Following"}),(0,n.jsx)("div",{children:null==f?void 0:f.map(e=>(0,n.jsx)(s(),{href:"/u/".concat(null==e?void 0:e.profile.id),children:(0,n.jsxs)("div",{className:"flex cursor-pointer items-center gap-3 rounded p-2 font-semibold hover:bg-primary",children:[(0,n.jsx)("div",{className:"relative h-[32px] w-[32px]",children:(0,n.jsx)(l(),{src:(0,d.Z)(null==e?void 0:e.profile),alt:"profilepic",className:"rounded-full",layout:"fill"})}),(0,n.jsx)("div",{}),(0,n.jsxs)("div",{children:[(0,n.jsx)("p",{className:"text-md flex items-center gap-1 font-bold lowercase text-primary",children:null==e?void 0:e.profile.name}),(0,n.jsxs)("p",{className:"text-xs capitalize text-gray-400",children:[(0,p.Z)(null==e?void 0:e.profile.handle)," ",""]})]})]})},null==e?void 0:e.profile.id))})]})};t.Z=f},94138:function(e,t,r){"use strict";var n=r(85893),o=r(37887),i=r(41664),s=r.n(i),a=r(25675),l=r.n(a),c=r(68980),d=r(22257),u=r(29451);let m=()=>{let{data:e,loading:t,error:r}=(0,o.a)(c.Hvc,{nextFetchPolicy:"standby",variables:{options:{shuffle:!0}}});return console.log("Recommended",e),(0,n.jsxs)("div",{className:"border-gray-200 pb-4 lg:border-b-2",children:[(0,n.jsx)("p",{className:"m-3 mt-4 hidden font-semibold text-gray-500 lg:block",children:"Suggested Accounts"}),(0,n.jsx)("div",{children:null==e?void 0:e.recommendedProfiles.slice(0,20).map(e=>(0,n.jsx)(s(),{href:"/u/".concat(e.id),children:(0,n.jsxs)("div",{className:"flex cursor-pointer items-center gap-3 rounded p-2 font-semibold hover:bg-primary",children:[(0,n.jsx)("div",{className:"relative h-[32px] w-[32px]",children:(0,n.jsx)(l(),{src:(0,d.Z)(e),alt:(0,d.Z)(e),className:"rounded-full",layout:"fill"})}),(0,n.jsx)("div",{}),(0,n.jsxs)("div",{children:[(0,n.jsx)("p",{className:"text-md flex items-center gap-1 font-bold lowercase text-primary",children:e.name}),(0,n.jsxs)("p",{className:"text-xs capitalize text-gray-400",children:[(0,u.Z)(e.handle)," ",""]})]})]})},e.id))})]})};t.Z=m},33962:function(e,t,r){"use strict";r.d(t,{$:function(){return i}});var n=r(85893),o=r(86010);let i=e=>{let{className:t="",variant:r="primary",size:i="md"}=e;return(0,n.jsx)("div",{className:(0,o.Z)({"border-blue-200 border-t-blue-600":"primary"===r,"border-gray-200 border-t-gray-600":"secondary"===r,"border-green-200 border-t-green-600":"success"===r,"border-yellow-200 border-t-yellow-600":"warning"===r,"border-pink-200 border-t-pink-600":"super"===r,"border-red-200 border-t-red-600":"danger"===r,"h-4 w-4 border-[2px]":"xs"===i,"h-5 w-5 border-2":"sm"===i,"h-8 w-8 border-[3px]":"md"===i,"h-10 w-10 border-4":"lg"===i},"animate-spin rounded-full",t)})}},22257:function(e,t,r){"use strict";var n=r(23286),o=r(7925);let i=e=>{var t,r,i,s,a,l;return(0,n.A)(null!==(l=null!==(s=null==e?void 0:null===(t=e.picture)||void 0===t?void 0:null===(r=t.original)||void 0===r?void 0:r.url)&&void 0!==s?s:null==e?void 0:null===(i=e.picture)||void 0===i?void 0:i.uri)&&void 0!==l?l:(0,o.Z)(null!==(a=null==e?void 0:e.ownedBy)&&void 0!==a?a:"0x0000000000000000000000000000000000000000"))};t.Z=i},7925:function(e,t){"use strict";let r=e=>"https://cdn.stamp.fyi/avatar/eth:".concat(e.toLowerCase(),"?s=250");t.Z=r},60792:function(e,t,r){"use strict";r.r(t),r.d(t,{default:function(){return C}});var n=r(85893),o=r(36595),i=r(86501),s=r(67294),a=r(92882),l=r(94138),c=r(66909),d=r(41664),u=r.n(d),m=r(11163),p=r(5996);let f=()=>{let e=(0,m.useRouter)(),{topic:t}=e.query;return(0,n.jsxs)("div",{className:"pb-6 xl:border-b-2 xl:border-gray-200",children:[(0,n.jsx)("p",{className:"m-3 mt-4 hidden font-semibold text-gray-500 lg:block",children:"Popular Topics"}),(0,n.jsx)("div",{className:"flex flex-wrap gap-3",children:null===p.F5||void 0===p.F5?void 0:p.F5.map(e=>(0,n.jsx)(u(),{href:"/?topic=".concat(e.name),children:(0,n.jsxs)("div",{className:t===e.name?"lg:border-2 bg-[#57B8FF] lg:border-[#a3f32b] px-3 py-2 rounded lg:rounded-full flex items-center gap-2 justify-center cursor-pointer text-[#000000]":"lg:border-2 hover:text-[#000000] hover:bg-[#57B8FF] lg:border-gray-300 px-3 py-2 rounded lg:rounded-full flex items-center gap-2 justify-center cursor-pointer text-[#000000]",children:[(0,n.jsx)("span",{className:"xl:text-md text-2xl font-bold ",children:e.icon}),(0,n.jsx)("span",{className:"text-md font-medium capitalize",children:e.name})]})},e.name))})]})};var h=r(21273),x=r(68980),g=r(47516),b=r(33962),v=r(22257),y=r(25675),w=r.n(y),j=r(29451);let N=e=>{let{hideDropdown:t=!1}=e,{push:r,pathname:o,query:i}=(0,m.useRouter)(),[a,l]=(0,s.useState)(""),c=(0,s.useRef)(null),[d,{data:p,loading:f}]=(0,h.mp)(),y=e=>{let r=e.target.value;l(r),"/search"===o||t||d({variables:{request:{type:x.qkC.Profile,query:r,limit:8}}})},N=e=>{e.preventDefault(),"/search"===o?r("/search?q=".concat(a,"&type=").concat(i.type)):r("/search?q=".concat(a,"&type=profiles")),l(""),console.log(a)},k=null==p?void 0:p.search,E=k&&k.hasOwnProperty("items"),C=E?k.items:[];return(0,n.jsxs)("div",{className:"relative content-center items-center justify-center ",children:[(0,n.jsxs)("form",{className:"absolute top-10 max-w-md md:static",onSubmit:N,children:[(0,n.jsx)("input",{className:"md:text-md w-[300px] rounded-full border-2 border-gray-100 bg-primary p-3 font-medium focus:border-2 focus:border-gray-300 focus:outline-none md:top-0 md:w-[350px]",placeholder:"Search accounts and videos",value:a,onChange:y}),(0,n.jsx)("button",{className:"absolute right-6 top-4 border-l-2 border-gray-300 pl-4 text-2xl text-gray-400 md:right-5",children:(0,n.jsx)(g.Goc,{})})]}),"/search"!==o&&!t&&a.length>0&&(0,n.jsx)("div",{className:"absolute mt-2 flex w-full flex-col rounded-xl",ref:c,children:(0,n.jsx)("div",{className:"overflow-y-scroll rounded-xl border bg-white py-2",children:f?(0,n.jsxs)("div",{className:"space-y-2 rounded-xl px-4 py-2 text-center text-sm font-bold",children:[(0,n.jsx)(b.$,{size:"sm",className:"mx-auto"}),(0,n.jsx)("div",{children:"Searching..."})]}):(0,n.jsxs)(n.Fragment,{children:[C.map(e=>(0,n.jsx)("div",{className:"p-5",children:(0,n.jsx)(u(),{href:"/u/".concat(null==e?void 0:e.id),children:(0,n.jsxs)("div",{className:"flex cursor-pointer items-center gap-3 rounded-xl p-2 font-semibold hover:bg-primary",children:[(0,n.jsx)("div",{children:(0,n.jsx)(w(),{width:40,height:40,className:"cursor-pointer rounded-full",src:(0,v.Z)(e),alt:(0,j.Z)(null==e?void 0:e.handle)})}),(0,n.jsx)("div",{children:(0,n.jsx)("p",{className:"text-md flex items-center gap-1 font-bold lowercase text-primary",children:(0,j.Z)(null==e?void 0:e.handle)})})]})})},null==e?void 0:e.id)),0===C.length&&(0,n.jsx)("div",{children:"No matching Profiles"})]})})})]})},k=()=>{(0,a.qr)(e=>e.currentProfile);let[e,t]=(0,s.useState)("suggestedaccounts"),r="suggestedaccounts"===e?" border-black":"text-black",o="categories"===e?" border-black":"text-black",i="search"===e?" border-black":"text-black";return console.log("oioioioio",e),console.log("a",r),console.log("b",o),console.log("c",i),(0,n.jsx)("div",{className:"mx-4 flex justify-center rounded-full border-blue-700",children:(0,n.jsxs)("div",{className:"w-full max-w-[1150px]",children:[(0,n.jsx)("div",{className:"flex w-full items-center justify-center rounded-full border-4 border-black bg-blue-500 p-5",children:(0,n.jsx)("span",{className:"text-center text-xl font-semibold",children:"Discover"})}),(0,n.jsxs)("div",{className:"mb-5 flex w-full items-center justify-center gap-10 rounded-full border-2 border-black bg-blue-500 p-5",children:[(0,n.jsx)("span",{className:"text-md cursor-pointer rounded-full border-2 border-black px-2 py-2 font-semibold ".concat(r," mt-2"),onClick:()=>t("suggestedaccounts"),children:"Users"}),(0,n.jsx)("span",{className:"text-md cursor-pointer rounded-full border-2 border-black px-2 py-2 font-semibold  ".concat(o," mt-2"),onClick:()=>t("categories"),children:"Categories"}),(0,n.jsx)("span",{className:"text-md cursor-pointer rounded-full border-2 border-black px-2 py-2 font-semibold ".concat(i," mt-2"),onClick:()=>t("search"),children:"Search"})]}),"suggestedaccounts"===e&&(0,n.jsxs)(n.Fragment,{children:[(0,n.jsx)(l.Z,{}),(0,n.jsx)(c.Z,{})]}),"categories"===e&&(0,n.jsx)(f,{}),"search"===e&&(0,n.jsx)("div",{className:"content-center items-center justify-center",children:(0,n.jsx)(N,{})})]})})},E=()=>(0,n.jsx)("div",{children:(0,n.jsxs)("div",{className:"m-auto h-[100vh] items-center overflow-hidden lg:w-[1100px] xl:w-[1200px]",children:[(0,n.jsx)(i.x7,{position:"bottom-right"}),(0,n.jsx)("div",{className:"flex gap-6 md:gap-20",children:(0,n.jsx)("div",{className:"videos mb-8 mt-2 flex h-[88vh] flex-1 flex-col items-center gap-10 overflow-auto overflow-x-hidden pb-8",children:(0,n.jsx)(k,{})})}),(0,n.jsx)("div",{className:"m-auto block h-[100vh] overflow-hidden border-0 lg:w-[1100px] xl:w-[1200px]",children:(0,n.jsx)(o.Z,{})})]})});var C=E},21273:function(e,t,r){"use strict";r.d(t,{BI:function(){return g},BS:function(){return p},Cy:function(){return E},Dt:function(){return c},Dw:function(){return b},EE:function(){return f},Ey:function(){return N},Fh:function(){return j},NF:function(){return C},Or:function(){return h},Os:function(){return a},RI:function(){return d},Rs:function(){return u},cN:function(){return v},d6:function(){return l},i0:function(){return m},kV:function(){return x},lA:function(){return k},mp:function(){return w},ug:function(){return y}});var n=r(50319),o=r(37887),i=r(73359),s=r(76781);function a(e){let t={...e};return n.D(s.kV,t)}function l(e){let t={...e};return n.D(s.vK,t)}function c(e){let t={...e};return n.D(s.Jv,t)}function d(e){let t={...e};return n.D(s._5,t)}function u(e){let t={...e};return n.D(s.UD,t)}function m(e){let t={...e};return n.D(s.yP,t)}function p(e){let t={...e};return o.a(s.Bz,t)}function f(e){let t={...e};return o.a(s.uJ,t)}function h(e){let t={...e};return o.a(s.PN,t)}function x(e){let t={...e};return o.a(s.Im,t)}function g(e){let t={...e};return o.a(s.AC,t)}function b(e){let t={...e};return i.t(s.s2,t)}function v(e){let t={...e};return o.a(s.i_,t)}function y(e){let t={...e};return o.a(s.k8,t)}function w(e){let t={...e};return i.t(s.LZ,t)}function j(e){let t={...e};return o.a(s.LZ,t)}function N(e){let t={...e};return o.a(s.F2,t)}function k(e){let t={...e};return n.D(s.VP,t)}function E(e){let t={...e};return n.D(s.VV,t)}function C(e){let t={...e};return n.D(s.B$,t)}},29451:function(e,t,r){"use strict";var n=r(34625);t.Z=function(e){let t=arguments.length>1&&void 0!==arguments[1]&&arguments[1];return e?(null==e?void 0:e.toLowerCase())===n.Vq?e:t?e.match(n.$P)?e.split(n.$P)[0]+n.$P:e+n.$P:e.replace(n.$P,""):""}},52942:function(e,t,r){"use strict";var n=r(34625),o=r(31618);let i=()=>{let{data:e,isLoading:t}=(0,o.py)(),{signMessage:r,...i}=null!=e?e:{},s={data:{getAddress:async()=>{var t;return null!==(t=await (null==e?void 0:e.account.address))&&void 0!==t?t:n.r_},signMessage:async t=>{let r=await (null==e?void 0:e.signMessage({message:t}));return null!=r?r:""},...{...i}}};return{data:s.data,isLoading:t}};t.Z=i},61998:function(e,t,r){"use strict";var n=r(67294);let o=n.forwardRef(function({title:e,titleId:t,...r},o){return n.createElement("svg",Object.assign({xmlns:"http://www.w3.org/2000/svg",fill:"none",viewBox:"0 0 24 24",strokeWidth:1.5,stroke:"currentColor","aria-hidden":"true",ref:o,"aria-labelledby":t},r),e?n.createElement("title",{id:t},e):null,n.createElement("path",{strokeLinecap:"round",strokeLinejoin:"round",d:"M12 20.25c4.97 0 9-3.694 9-8.25s-4.03-8.25-9-8.25S3 7.444 3 12c0 2.104.859 4.023 2.273 5.48.432.447.74 1.04.586 1.641a4.483 4.483 0 01-.923 1.785A5.969 5.969 0 006 21c1.282 0 2.47-.402 3.445-1.087.81.22 1.668.337 2.555.337z"}))});t.Z=o},93832:function(e,t,r){"use strict";var n=r(67294);let o=n.forwardRef(function({title:e,titleId:t,...r},o){return n.createElement("svg",Object.assign({xmlns:"http://www.w3.org/2000/svg",fill:"none",viewBox:"0 0 24 24",strokeWidth:1.5,stroke:"currentColor","aria-hidden":"true",ref:o,"aria-labelledby":t},r),e?n.createElement("title",{id:t},e):null,n.createElement("path",{strokeLinecap:"round",strokeLinejoin:"round",d:"M3.375 19.5h17.25m-17.25 0a1.125 1.125 0 01-1.125-1.125M3.375 19.5h1.5C5.496 19.5 6 18.996 6 18.375m-3.75 0V5.625m0 12.75v-1.5c0-.621.504-1.125 1.125-1.125m18.375 2.625V5.625m0 12.75c0 .621-.504 1.125-1.125 1.125m1.125-1.125v-1.5c0-.621-.504-1.125-1.125-1.125m0 3.75h-1.5A1.125 1.125 0 0118 18.375M20.625 4.5H3.375m17.25 0c.621 0 1.125.504 1.125 1.125M20.625 4.5h-1.5C18.504 4.5 18 5.004 18 5.625m3.75 0v1.5c0 .621-.504 1.125-1.125 1.125M3.375 4.5c-.621 0-1.125.504-1.125 1.125M3.375 4.5h1.5C5.496 4.5 6 5.004 6 5.625m-3.75 0v1.5c0 .621.504 1.125 1.125 1.125m0 0h1.5m-1.5 0c-.621 0-1.125.504-1.125 1.125v1.5c0 .621.504 1.125 1.125 1.125m1.5-3.75C5.496 8.25 6 7.746 6 7.125v-1.5M4.875 8.25C5.496 8.25 6 8.754 6 9.375v1.5m0-5.25v5.25m0-5.25C6 5.004 6.504 4.5 7.125 4.5h9.75c.621 0 1.125.504 1.125 1.125m1.125 2.625h1.5m-1.5 0A1.125 1.125 0 0118 7.125v-1.5m1.125 2.625c-.621 0-1.125.504-1.125 1.125v1.5m2.625-2.625c.621 0 1.125.504 1.125 1.125v1.5c0 .621-.504 1.125-1.125 1.125M18 5.625v5.25M7.125 12h9.75m-9.75 0A1.125 1.125 0 016 10.875M7.125 12C6.504 12 6 12.504 6 13.125m0-2.25C6 11.496 5.496 12 4.875 12M18 10.875c0 .621-.504 1.125-1.125 1.125M18 10.875c0 .621.504 1.125 1.125 1.125m-2.25 0c.621 0 1.125.504 1.125 1.125m-12 5.25v-5.25m0 5.25c0 .621.504 1.125 1.125 1.125h9.75c.621 0 1.125-.504 1.125-1.125m-12 0v-1.5c0-.621-.504-1.125-1.125-1.125M18 18.375v-5.25m0 5.25v-1.5c0-.621.504-1.125 1.125-1.125M18 13.125v1.5c0 .621.504 1.125 1.125 1.125M18 13.125c0-.621.504-1.125 1.125-1.125M6 13.125v1.5c0 .621-.504 1.125-1.125 1.125M6 13.125C6 12.504 5.496 12 4.875 12m-1.5 0h1.5m-1.5 0c-.621 0-1.125.504-1.125 1.125v1.5c0 .621.504 1.125 1.125 1.125M19.125 12h1.5m0 0c.621 0 1.125.504 1.125 1.125v1.5c0 .621-.504 1.125-1.125 1.125m-17.25 0h1.5m14.25 0h1.5"}))});t.Z=o},28166:function(e,t,r){"use strict";var n=r(67294);let o=n.forwardRef(function({title:e,titleId:t,...r},o){return n.createElement("svg",Object.assign({xmlns:"http://www.w3.org/2000/svg",fill:"none",viewBox:"0 0 24 24",strokeWidth:1.5,stroke:"currentColor","aria-hidden":"true",ref:o,"aria-labelledby":t},r),e?n.createElement("title",{id:t},e):null,n.createElement("path",{strokeLinecap:"round",strokeLinejoin:"round",d:"M9 9l10.5-3m0 6.553v3.75a2.25 2.25 0 01-1.632 2.163l-1.32.377a1.803 1.803 0 11-.99-3.467l2.31-.66a2.25 2.25 0 001.632-2.163zm0 0V2.25L9 5.25v10.303m0 0v3.75a2.25 2.25 0 01-1.632 2.163l-1.32.377a1.803 1.803 0 01-.99-3.467l2.31-.66A2.25 2.25 0 009 15.553z"}))});t.Z=o},86501:function(e,t,r){"use strict";let n,o;r.d(t,{x7:function(){return eo},ZP:function(){return ei},Am:function(){return L}});var i,s=r(67294);let a={data:""},l=e=>"object"==typeof window?((e?e.querySelector("#_goober"):window._goober)||Object.assign((e||document.head).appendChild(document.createElement("style")),{innerHTML:" ",id:"_goober"})).firstChild:e||a,c=/(?:([\u0080-\uFFFF\w-%@]+) *:? *([^{;]+?);|([^;}{]*?) *{)|(}\s*)/g,d=/\/\*[^]*?\*\/|  +/g,u=/\n+/g,m=(e,t)=>{let r="",n="",o="";for(let i in e){let s=e[i];"@"==i[0]?"i"==i[1]?r=i+" "+s+";":n+="f"==i[1]?m(s,i):i+"{"+m(s,"k"==i[1]?"":t)+"}":"object"==typeof s?n+=m(s,t?t.replace(/([^,])+/g,e=>i.replace(/(^:.*)|([^,])+/g,t=>/&/.test(t)?t.replace(/&/g,e):e?e+" "+t:t)):i):null!=s&&(i=/^--/.test(i)?i:i.replace(/[A-Z]/g,"-$&").toLowerCase(),o+=m.p?m.p(i,s):i+":"+s+";")}return r+(t&&o?t+"{"+o+"}":o)+n},p={},f=e=>{if("object"==typeof e){let t="";for(let r in e)t+=r+f(e[r]);return t}return e},h=(e,t,r,n,o)=>{var i,s;let a=f(e),l=p[a]||(p[a]=(e=>{let t=0,r=11;for(;t<e.length;)r=101*r+e.charCodeAt(t++)>>>0;return"go"+r})(a));if(!p[l]){let h=a!==e?e:(e=>{let t,r,n=[{}];for(;t=c.exec(e.replace(d,""));)t[4]?n.shift():t[3]?(r=t[3].replace(u," ").trim(),n.unshift(n[0][r]=n[0][r]||{})):n[0][t[1]]=t[2].replace(u," ").trim();return n[0]})(e);p[l]=m(o?{["@keyframes "+l]:h}:h,r?"":"."+l)}let x=r&&p.g?p.g:null;return r&&(p.g=p[l]),i=p[l],s=t,x?s.data=s.data.replace(x,i):-1===s.data.indexOf(i)&&(s.data=n?i+s.data:s.data+i),l},x=(e,t,r)=>e.reduce((e,n,o)=>{let i=t[o];if(i&&i.call){let s=i(r),a=s&&s.props&&s.props.className||/^go/.test(s)&&s;i=a?"."+a:s&&"object"==typeof s?s.props?"":m(s,""):!1===s?"":s}return e+n+(null==i?"":i)},"");function g(e){let t=this||{},r=e.call?e(t.p):e;return h(r.unshift?r.raw?x(r,[].slice.call(arguments,1),t.p):r.reduce((e,r)=>Object.assign(e,r&&r.call?r(t.p):r),{}):r,l(t.target),t.g,t.o,t.k)}g.bind({g:1});let b,v,y,w=g.bind({k:1});function j(e,t){let r=this||{};return function(){let n=arguments;function o(i,s){let a=Object.assign({},i),l=a.className||o.className;r.p=Object.assign({theme:v&&v()},a),r.o=/ *go\d+/.test(l),a.className=g.apply(r,n)+(l?" "+l:""),t&&(a.ref=s);let c=e;return e[0]&&(c=a.as||e,delete a.as),y&&c[0]&&y(a),b(c,a)}return t?t(o):o}}var N=e=>"function"==typeof e,k=(e,t)=>N(e)?e(t):e,E=(n=0,()=>(++n).toString()),C=()=>{if(void 0===o&&"u">typeof window){let e=matchMedia("(prefers-reduced-motion: reduce)");o=!e||e.matches}return o},M=new Map,P=e=>{if(M.has(e))return;let t=setTimeout(()=>{M.delete(e),F({type:4,toastId:e})},1e3);M.set(e,t)},$=e=>{let t=M.get(e);t&&clearTimeout(t)},Z=(e,t)=>{switch(t.type){case 0:return{...e,toasts:[t.toast,...e.toasts].slice(0,20)};case 1:return t.toast.id&&$(t.toast.id),{...e,toasts:e.toasts.map(e=>e.id===t.toast.id?{...e,...t.toast}:e)};case 2:let{toast:r}=t;return e.toasts.find(e=>e.id===r.id)?Z(e,{type:1,toast:r}):Z(e,{type:0,toast:r});case 3:let{toastId:n}=t;return n?P(n):e.toasts.forEach(e=>{P(e.id)}),{...e,toasts:e.toasts.map(e=>e.id===n||void 0===n?{...e,visible:!1}:e)};case 4:return void 0===t.toastId?{...e,toasts:[]}:{...e,toasts:e.toasts.filter(e=>e.id!==t.toastId)};case 5:return{...e,pausedAt:t.time};case 6:let o=t.time-(e.pausedAt||0);return{...e,pausedAt:void 0,toasts:e.toasts.map(e=>({...e,pauseDuration:e.pauseDuration+o}))}}},D=[],A={toasts:[],pausedAt:void 0},F=e=>{A=Z(A,e),D.forEach(e=>{e(A)})},O={blank:4e3,error:4e3,success:2e3,loading:1/0,custom:4e3},z=(e={})=>{let[t,r]=(0,s.useState)(A);(0,s.useEffect)(()=>(D.push(r),()=>{let e=D.indexOf(r);e>-1&&D.splice(e,1)}),[t]);let n=t.toasts.map(t=>{var r,n;return{...e,...e[t.type],...t,duration:t.duration||(null==(r=e[t.type])?void 0:r.duration)||(null==e?void 0:e.duration)||O[t.type],style:{...e.style,...null==(n=e[t.type])?void 0:n.style,...t.style}}});return{...t,toasts:n}},_=(e,t="blank",r)=>({createdAt:Date.now(),visible:!0,type:t,ariaProps:{role:"status","aria-live":"polite"},message:e,pauseDuration:0,...r,id:(null==r?void 0:r.id)||E()}),S=e=>(t,r)=>{let n=_(t,e,r);return F({type:2,toast:n}),n.id},L=(e,t)=>S("blank")(e,t);L.error=S("error"),L.success=S("success"),L.loading=S("loading"),L.custom=S("custom"),L.dismiss=e=>{F({type:3,toastId:e})},L.remove=e=>F({type:4,toastId:e}),L.promise=(e,t,r)=>{let n=L.loading(t.loading,{...r,...null==r?void 0:r.loading});return e.then(e=>(L.success(k(t.success,e),{id:n,...r,...null==r?void 0:r.success}),e)).catch(e=>{L.error(k(t.error,e),{id:n,...r,...null==r?void 0:r.error})}),e};var I=(e,t)=>{F({type:1,toast:{id:e,height:t}})},q=()=>{F({type:5,time:Date.now()})},B=e=>{let{toasts:t,pausedAt:r}=z(e);(0,s.useEffect)(()=>{if(r)return;let e=Date.now(),n=t.map(t=>{if(t.duration===1/0)return;let r=(t.duration||0)+t.pauseDuration-(e-t.createdAt);if(r<0){t.visible&&L.dismiss(t.id);return}return setTimeout(()=>L.dismiss(t.id),r)});return()=>{n.forEach(e=>e&&clearTimeout(e))}},[t,r]);let n=(0,s.useCallback)(()=>{r&&F({type:6,time:Date.now()})},[r]),o=(0,s.useCallback)((e,r)=>{let{reverseOrder:n=!1,gutter:o=8,defaultPosition:i}=r||{},s=t.filter(t=>(t.position||i)===(e.position||i)&&t.height),a=s.findIndex(t=>t.id===e.id),l=s.filter((e,t)=>t<a&&e.visible).length;return s.filter(e=>e.visible).slice(...n?[l+1]:[0,l]).reduce((e,t)=>e+(t.height||0)+o,0)},[t]);return{toasts:t,handlers:{updateHeight:I,startPause:q,endPause:n,calculateOffset:o}}},R=j("div")`
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
`,T=j("div")`
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
`,V=j("div")`
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
`,H=j("div")`
  position: absolute;
`,U=j("div")`
  position: relative;
  display: flex;
  justify-content: center;
  align-items: center;
  min-width: 20px;
  min-height: 20px;
`,W=j("div")`
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
`,J=({toast:e})=>{let{icon:t,type:r,iconTheme:n}=e;return void 0!==t?"string"==typeof t?s.createElement(W,null,t):t:"blank"===r?null:s.createElement(U,null,s.createElement(T,{...n}),"loading"!==r&&s.createElement(H,null,"error"===r?s.createElement(R,{...n}):s.createElement(V,{...n})))},X=e=>`
0% {transform: translate3d(0,${-200*e}%,0) scale(.6); opacity:.5;}
100% {transform: translate3d(0,0,0) scale(1); opacity:1;}
`,G=e=>`
0% {transform: translate3d(0,0,-1px) scale(1); opacity:1;}
100% {transform: translate3d(0,${-150*e}%,-1px) scale(.6); opacity:0;}
`,K=j("div")`
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
`,Y=j("div")`
  display: flex;
  justify-content: center;
  margin: 4px 10px;
  color: inherit;
  flex: 1 1 auto;
  white-space: pre-line;
`,Q=(e,t)=>{let r=e.includes("top")?1:-1,[n,o]=C()?["0%{opacity:0;} 100%{opacity:1;}","0%{opacity:1;} 100%{opacity:0;}"]:[X(r),G(r)];return{animation:t?`${w(n)} 0.35s cubic-bezier(.21,1.02,.73,1) forwards`:`${w(o)} 0.4s forwards cubic-bezier(.06,.71,.55,1)`}},ee=s.memo(({toast:e,position:t,style:r,children:n})=>{let o=e.height?Q(e.position||t||"top-center",e.visible):{opacity:0},i=s.createElement(J,{toast:e}),a=s.createElement(Y,{...e.ariaProps},k(e.message,e));return s.createElement(K,{className:e.className,style:{...o,...r,...e.style}},"function"==typeof n?n({icon:i,message:a}):s.createElement(s.Fragment,null,i,a))});i=s.createElement,m.p=void 0,b=i,v=void 0,y=void 0;var et=({id:e,className:t,style:r,onHeightUpdate:n,children:o})=>{let i=s.useCallback(t=>{if(t){let r=()=>{n(e,t.getBoundingClientRect().height)};r(),new MutationObserver(r).observe(t,{subtree:!0,childList:!0,characterData:!0})}},[e,n]);return s.createElement("div",{ref:i,className:t,style:r},o)},er=(e,t)=>{let r=e.includes("top"),n=e.includes("center")?{justifyContent:"center"}:e.includes("right")?{justifyContent:"flex-end"}:{};return{left:0,right:0,display:"flex",position:"absolute",transition:C()?void 0:"all 230ms cubic-bezier(.21,1.02,.73,1)",transform:`translateY(${t*(r?1:-1)}px)`,...r?{top:0}:{bottom:0},...n}},en=g`
  z-index: 9999;
  > * {
    pointer-events: auto;
  }
`,eo=({reverseOrder:e,position:t="top-center",toastOptions:r,gutter:n,children:o,containerStyle:i,containerClassName:a})=>{let{toasts:l,handlers:c}=B(r);return s.createElement("div",{style:{position:"fixed",zIndex:9999,top:16,left:16,right:16,bottom:16,pointerEvents:"none",...i},className:a,onMouseEnter:c.startPause,onMouseLeave:c.endPause},l.map(r=>{let i=r.position||t,a=er(i,c.calculateOffset(r,{reverseOrder:e,gutter:n,defaultPosition:t}));return s.createElement(et,{id:r.id,key:r.id,onHeightUpdate:c.updateHeight,className:r.visible?en:"",style:a},"custom"===r.type?k(r.message,r):o?o(r):s.createElement(ee,{toast:r,position:i}))}))},ei=L}},function(e){e.O(0,[9498,1228,3874,1664,1618,1098,1257,5675,6781,3463,9774,2888,179],function(){return e(e.s=24477)}),_N_E=e.O()}]);