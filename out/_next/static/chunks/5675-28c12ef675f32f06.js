(self.webpackChunk_N_E=self.webpackChunk_N_E||[]).push([[5675],{19749:function(e,t,i){"use strict";Object.defineProperty(t,"__esModule",{value:!0}),t.default=void 0;var r=i(6495).Z,o=i(92648).Z,n=i(91598).Z,a=i(17273).Z,l=n(i(67294)),s=o(i(83121)),c=i(2675),u=i(10139),d=i(28730);i(57238);var f=o(i(89824));let g={deviceSizes:[640,750,828,1080,1200,1920,2048,3840],imageSizes:[16,32,48,64,96,128,256,384],path:"/_next/image",loader:"default",dangerouslyAllowSVG:!1,unoptimized:!1};function h(e){return void 0!==e.default}function m(e){return"number"==typeof e||void 0===e?e:"string"==typeof e&&/^[0-9]+$/.test(e)?parseInt(e,10):NaN}function p(e,t,i,o,n,a,l){if(!e||e["data-loaded-src"]===t)return;e["data-loaded-src"]=t;let s="decode"in e?e.decode():Promise.resolve();s.catch(()=>{}).then(()=>{if(e.parentNode){if("blur"===i&&a(!0),null==o?void 0:o.current){let t=new Event("load");Object.defineProperty(t,"target",{writable:!1,value:e});let l=!1,s=!1;o.current(r({},t,{nativeEvent:t,currentTarget:e,target:e,isDefaultPrevented:()=>l,isPropagationStopped:()=>s,persist:()=>{},preventDefault:()=>{l=!0,t.preventDefault()},stopPropagation:()=>{s=!0,t.stopPropagation()}}))}(null==n?void 0:n.current)&&n.current(e)}})}let v=l.forwardRef((e,t)=>{var{imgAttributes:i,heightInt:o,widthInt:n,qualityInt:s,className:c,imgStyle:u,blurStyle:d,isLazy:f,fill:g,placeholder:h,loading:m,srcString:v,config:w,unoptimized:b,loader:y,onLoadRef:E,onLoadingCompleteRef:S,setBlurComplete:C,setShowAltText:_,onLoad:j,onError:z}=e,x=a(e,["imgAttributes","heightInt","widthInt","qualityInt","className","imgStyle","blurStyle","isLazy","fill","placeholder","loading","srcString","config","unoptimized","loader","onLoadRef","onLoadingCompleteRef","setBlurComplete","setShowAltText","onLoad","onError"]);return m=f?"lazy":m,l.default.createElement(l.default.Fragment,null,l.default.createElement("img",Object.assign({},x,i,{width:n,height:o,decoding:"async","data-nimg":g?"fill":"1",className:c,loading:m,style:r({},u,d),ref:l.useCallback(e=>{t&&("function"==typeof t?t(e):"object"==typeof t&&(t.current=e)),e&&(z&&(e.src=e.src),e.complete&&p(e,v,h,E,S,C,b))},[v,h,E,S,C,z,b,t]),onLoad:e=>{let t=e.currentTarget;p(t,v,h,E,S,C,b)},onError:e=>{_(!0),"blur"===h&&C(!0),z&&z(e)}})))}),w=l.forwardRef((e,t)=>{let i,o;var n,{src:p,sizes:w,unoptimized:b=!1,priority:y=!1,loading:E,className:S,quality:C,width:_,height:j,fill:z,style:x,onLoad:R,onLoadingComplete:k,placeholder:O="empty",blurDataURL:I,layout:P,objectFit:A,objectPosition:N,lazyBoundary:L,lazyRoot:M}=e,B=a(e,["src","sizes","unoptimized","priority","loading","className","quality","width","height","fill","style","onLoad","onLoadingComplete","placeholder","blurDataURL","layout","objectFit","objectPosition","lazyBoundary","lazyRoot"]);let D=l.useContext(d.ImageConfigContext),W=l.useMemo(()=>{let e=g||D||u.imageConfigDefault,t=[...e.deviceSizes,...e.imageSizes].sort((e,t)=>e-t),i=e.deviceSizes.sort((e,t)=>e-t);return r({},e,{allSizes:t,deviceSizes:i})},[D]),F=B,T=F.loader||f.default;if(delete F.loader,"__next_img_default"in T){if("custom"===W.loader)throw Error('Image with src "'.concat(p,'" is missing "loader" prop.')+"\nRead more: https://nextjs.org/docs/messages/next-image-missing-loader")}else{let q=T;T=e=>{let{config:t}=e,i=a(e,["config"]);return q(i)}}if(P){"fill"===P&&(z=!0);let G={intrinsic:{maxWidth:"100%",height:"auto"},responsive:{width:"100%",height:"auto"}}[P];G&&(x=r({},x,G));let Z={responsive:"100vw",fill:"100vw"}[P];Z&&!w&&(w=Z)}let U="",V=m(_),J=m(j);if("object"==typeof(n=p)&&(h(n)||void 0!==n.src)){let H=h(p)?p.default:p;if(!H.src)throw Error("An object should only be passed to the image component src parameter if it comes from a static image import. It must include src. Received ".concat(JSON.stringify(H)));if(!H.height||!H.width)throw Error("An object should only be passed to the image component src parameter if it comes from a static image import. It must include height and width. Received ".concat(JSON.stringify(H)));if(i=H.blurWidth,o=H.blurHeight,I=I||H.blurDataURL,U=H.src,!z){if(V||J){if(V&&!J){let $=V/H.width;J=Math.round(H.height*$)}else if(!V&&J){let K=J/H.height;V=Math.round(H.width*K)}}else V=H.width,J=H.height}}let Q=!y&&("lazy"===E||void 0===E);((p="string"==typeof p?p:U).startsWith("data:")||p.startsWith("blob:"))&&(b=!0,Q=!1),W.unoptimized&&(b=!0);let[X,Y]=l.useState(!1),[ee,et]=l.useState(!1),ei=m(C),er=Object.assign(z?{position:"absolute",height:"100%",width:"100%",left:0,top:0,right:0,bottom:0,objectFit:A,objectPosition:N}:{},ee?{}:{color:"transparent"},x),eo="blur"===O&&I&&!X?{backgroundSize:er.objectFit||"cover",backgroundPosition:er.objectPosition||"50% 50%",backgroundRepeat:"no-repeat",backgroundImage:'url("data:image/svg+xml;charset=utf-8,'.concat(c.getImageBlurSvg({widthInt:V,heightInt:J,blurWidth:i,blurHeight:o,blurDataURL:I}),'")')}:{},en=function(e){let{config:t,src:i,unoptimized:r,width:o,quality:n,sizes:a,loader:l}=e;if(r)return{src:i,srcSet:void 0,sizes:void 0};let{widths:s,kind:c}=function(e,t,i){let{deviceSizes:r,allSizes:o}=e;if(i){let n=/(^|\s)(1?\d?\d)vw/g,a=[];for(let l;l=n.exec(i);l)a.push(parseInt(l[2]));if(a.length){let s=.01*Math.min(...a);return{widths:o.filter(e=>e>=r[0]*s),kind:"w"}}return{widths:o,kind:"w"}}if("number"!=typeof t)return{widths:r,kind:"w"};let c=[...new Set([t,2*t].map(e=>o.find(t=>t>=e)||o[o.length-1]))];return{widths:c,kind:"x"}}(t,o,a),u=s.length-1;return{sizes:a||"w"!==c?a:"100vw",srcSet:s.map((e,r)=>"".concat(l({config:t,src:i,quality:n,width:e})," ").concat("w"===c?e:r+1).concat(c)).join(", "),src:l({config:t,src:i,quality:n,width:s[u]})}}({config:W,src:p,unoptimized:b,width:V,quality:ei,sizes:w,loader:T}),ea=p,el={imageSrcSet:en.srcSet,imageSizes:en.sizes,crossOrigin:F.crossOrigin},es=l.useRef(R);l.useEffect(()=>{es.current=R},[R]);let ec=l.useRef(k);l.useEffect(()=>{ec.current=k},[k]);let eu=r({isLazy:Q,imgAttributes:en,heightInt:J,widthInt:V,qualityInt:ei,className:S,imgStyle:er,blurStyle:eo,loading:E,config:W,fill:z,unoptimized:b,placeholder:O,loader:T,srcString:ea,onLoadRef:es,onLoadingCompleteRef:ec,setBlurComplete:Y,setShowAltText:et},F);return l.default.createElement(l.default.Fragment,null,l.default.createElement(v,Object.assign({},eu,{ref:t})),y?l.default.createElement(s.default,null,l.default.createElement("link",Object.assign({key:"__nimg-"+en.src+en.srcSet+en.sizes,rel:"preload",as:"image",href:en.srcSet?void 0:en.src},el))):null)});t.default=w,("function"==typeof t.default||"object"==typeof t.default&&null!==t.default)&&void 0===t.default.__esModule&&(Object.defineProperty(t.default,"__esModule",{value:!0}),Object.assign(t.default,t),e.exports=t.default)},2675:function(e,t){"use strict";Object.defineProperty(t,"__esModule",{value:!0}),t.getImageBlurSvg=function(e){let{widthInt:t,heightInt:i,blurWidth:r,blurHeight:o,blurDataURL:n}=e,a=r||t,l=o||i,s=n.startsWith("data:image/jpeg")?"%3CfeComponentTransfer%3E%3CfeFuncA type='discrete' tableValues='1 1'/%3E%3C/feComponentTransfer%3E%":"";return a&&l?"%3Csvg xmlns='http%3A//www.w3.org/2000/svg' viewBox='0 0 ".concat(a," ").concat(l,"'%3E%3Cfilter id='b' color-interpolation-filters='sRGB'%3E%3CfeGaussianBlur stdDeviation='").concat(r&&o?"1":"20","'/%3E").concat(s,"%3C/filter%3E%3Cimage preserveAspectRatio='none' filter='url(%23b)' x='0' y='0' height='100%25' width='100%25' href='").concat(n,"'/%3E%3C/svg%3E"):"%3Csvg xmlns='http%3A//www.w3.org/2000/svg'%3E%3Cimage style='filter:blur(20px)' x='0' y='0' height='100%25' width='100%25' href='".concat(n,"'/%3E%3C/svg%3E")}},89824:function(e,t){"use strict";function i(e){let{config:t,src:i,width:r,quality:o}=e;return i.endsWith(".svg")&&!t.dangerouslyAllowSVG?i:"".concat(t.path,"?url=").concat(encodeURIComponent(i),"&w=").concat(r,"&q=").concat(o||75)}Object.defineProperty(t,"__esModule",{value:!0}),t.default=void 0,i.__next_img_default=!0,t.default=i},25675:function(e,t,i){e.exports=i(19749)}}]);