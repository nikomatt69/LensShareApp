(self.webpackChunk_N_E=self.webpackChunk_N_E||[]).push([[9603],{8266:function(e,l,r){(window.__NEXT_P=window.__NEXT_P||[]).push(["/search",function(){return r(26225)}])},92435:function(e,l,r){"use strict";r.d(l,{Z:function(){return R}});var s=r(85893),t=r(41664),o=r.n(t),i=r(25675),n=r.n(i),d=r(67294),a=r(30874),c=r(99767),u=r(15209);let x=e=>{let{publication:l}=e,[r,t]=(0,d.useState)(!1),o="Mirror"===l.__typename,[i,n]=(0,d.useState)(o?l.mirrorOf.stats.totalUpvotes:l.stats.totalUpvotes),a=(0,u.qr)(e=>e.currentProfile);return(0,d.useEffect)(()=>{(null==l?void 0:l.reaction)==="UPVOTE"?t(!0):t(!1),a||t(!1)},[null==l?void 0:l.reaction]),(0,s.jsx)("div",{className:"flex gap-6",children:(0,s.jsxs)("div",{className:" md:mt-4 flex flex-col justify-center items-center cursor-pointer",children:[(0,s.jsx)(c.Z,{setCount:n,count:i,setLiked:t,liked:r,publication:l}),(0,s.jsxs)("p",{className:"text-xs hidden lg:block font-semibold text-gray-400",children:[" ",i," "]})]})})};var m=r(71118),p=r(54524),h=r(9187),v=r(86501),f=r(39321),b=r(37331),j=r(21273),g=r(65475),N=r(56371);function w(){return(0,s.jsxs)("svg",{role:"status",className:"inline m-auto w-4 h-4 text-black animate-spin",viewBox:"0 0 100 101",fill:"none",xmlns:"http://www.w3.org/2000/svg",children:[(0,s.jsx)("path",{d:"M100 50.5908C100 78.2051 77.6142 100.591 50 100.591C22.3858 100.591 0 78.2051 0 50.5908C0 22.9766 22.3858 0.59082 50 0.59082C77.6142 0.59082 100 22.9766 100 50.5908ZM9.08144 50.5908C9.08144 73.1895 27.4013 91.5094 50 91.5094C72.5987 91.5094 90.9186 73.1895 90.9186 50.5908C90.9186 27.9921 72.5987 9.67226 50 9.67226C27.4013 9.67226 9.08144 27.9921 9.08144 50.5908Z",fill:"#E5E7EB"}),(0,s.jsx)("path",{d:"M93.9676 39.0409C96.393 38.4038 97.8624 35.9116 97.0079 33.5539C95.2932 28.8227 92.871 24.3692 89.8167 20.348C85.8452 15.1192 80.8826 10.7238 75.2124 7.41289C69.5422 4.10194 63.2754 1.94025 56.7698 1.05124C51.7666 0.367541 46.6976 0.446843 41.7345 1.27873C39.2613 1.69328 37.813 4.19778 38.4501 6.62326C39.0873 9.04874 41.5694 10.4717 44.0505 10.1071C47.8511 9.54855 51.7191 9.52689 55.5402 10.0491C60.8642 10.7766 65.9928 12.5457 70.6331 15.2552C75.2735 17.9648 79.3347 21.5619 82.5849 25.841C84.9175 28.9121 86.7997 32.2913 88.1811 35.8758C89.083 38.2158 91.5421 39.6781 93.9676 39.0409Z",fill:"currentColor"})]})}let y=e=>{var l,r,t,o,i,n;let{publication:a}=e,c="Mirror"===a.__typename,x=(0,u.qr)(e=>e.setUserSigNonce);(0,u.qr)(e=>e.setUserSigNonce);let y=(0,u.qr)(e=>e.currentProfile),[k,A]=(0,d.useState)(c?null==a?void 0:null===(l=a.mirrorOf)||void 0===l?void 0:null===(r=l.stats)||void 0===r?void 0:r.totalAmountOfMirrors:null==a?void 0:null===(t=a.stats)||void 0===t?void 0:t.totalAmountOfMirrors),{isLoading:C,signTypedDataAsync:Z}=(0,p.yw)({onError:h.Z}),[F,S]=(0,d.useState)(c?(null==a?void 0:null===(o=a.mirrorOf)||void 0===o?void 0:null===(i=o.mirrors)||void 0===i?void 0:i.length)>0:(null==a?void 0:null===(n=a.mirrors)||void 0===n?void 0:n.length)>0),O=()=>{S(!0),A(k+1),v.Am.success("Post mirrored sucessfully!")},{isLoading:M,write:_}=(0,p.GG)({address:f.Nm,abi:b.g,functionName:"mirrorWithSig",mode:"recklesslyUnprepared",onSuccess:O,onError:h.Z}),[E,{loading:q}]=(0,j.lA)({onCompleted:O}),[B,{loading:R}]=(0,j.Cy)({onCompleted:async e=>{let{createMirrorTypedData:l}=e,{id:r,typedData:s}=l,{profileId:t,profileIdPointed:o,pubIdPointed:i,referenceModule:n,referenceModuleData:d,referenceModuleInitData:a,deadline:c}=s.value,u=await Z((0,g.Z)(s)),{v:x,r:m,s:p}=(0,N.splitSignature)(u),{data:h}=await E({variables:{request:{id:r,signature:u}}});if((null==h?void 0:h.broadcast.__typename)==="RelayError")return null==_?void 0:_({recklesslySetUnpreparedArgs:[{profileId:t,profileIdPointed:o,pubIdPointed:i,referenceModule:n,referenceModuleData:d,referenceModuleInitData:a,sig:{v:x,r:m,s:p,deadline:c}}]})},onError:h.Z}),[P,{loading:U}]=(0,j.NF)({onCompleted:O,onError:h.Z}),L=async e=>{var l;let{data:r}=await P({variables:{request:e}});(null==r?void 0:null===(l=r.createMirrorViaDispatcher)||void 0===l?void 0:l.__typename)==="RelayError"&&await B({variables:{options:{overrideSigNonce:x},request:e}})},I=async()=>{if(!y)return v.Am.error("Please sign in with your wallet!");try{var e;let l={profileId:null==y?void 0:y.id,publicationId:null==a?void 0:a.id,referenceModule:{followerOnlyReferenceModule:!1}};if(null==y?void 0:null===(e=y.dispatcher)||void 0===e?void 0:e.canUseRelay)return await L(l);return await B({variables:{options:{overrideSigNonce:x},request:l}})}catch(r){}};return(0,s.jsx)("div",{className:"flex gap-6",children:(0,s.jsxs)("div",{className:"md:mt-4 flex flex-col justify-center items-center cursor-pointer",children:[F?(0,s.jsx)("div",{className:"flex items-center drop-shadow-lg md:border-none bg-blue-500 border-2 border-black rounded-lg p-2 md:p-3",children:(0,s.jsx)(m.Z,{className:"w-3 h-3 text-[#57B8FF] font-bold"})}):(0,s.jsxs)("div",{className:"flex items-center drop-shadow-lg md:border-none bg-blue-500 border-2 border-black rounded-lg p-2 md:p-3 md:hover:bg-[#57B8FF] group relative w-max",children:[R||U||C||M||q?(0,s.jsx)(w,{}):(0,s.jsx)(m.Z,{onClick:I,className:"w-3 h-3 font-bold text-black"}),(0,s.jsx)("span",{className:"hidden md:block pointer-events-none absolute -bottom-7 left-7 w-max shadow px-2 py-1 text-xs text-blue-700 opacity-0 group-hover:opacity-100",children:" Mirror "})]}),(0,s.jsx)("p",{className:"text-xs hidden lg:block font-semibold text-gray-400",children:k})]})})};var k=r(85783);let A=e=>{let{publication:l}=e,[r,t]=(0,d.useState)(!1),i="Mirror"===l.__typename,n=i?l.mirrorOf.stats.totalAmountOfComments:l.stats.totalAmountOfComments;return(0,s.jsx)("div",{className:"flex gap-6",children:(0,s.jsx)(o(),{href:"/post/".concat(l.id),children:(0,s.jsxs)("a",{className:"md:mt-4 flex flex-col justify-center items-center cursor-pointer",children:[r?(0,s.jsx)("div",{className:"flex items-center drop-shadow-lg border-2 border-black md:border-none bg-blue-500 rounded-lg p-2 md:p-3",children:(0,s.jsx)(k.Z,{className:"w-4 h-4 text-[#57B8FF] font-bold"})}):(0,s.jsxs)("div",{className:"flex items-center drop-shadow-lg border-2 border-black md:border-none bg-blue-500 rounded-lg p-2 md:p-3 md:hover:bg-[#57B8FF] group relative w-max",children:[(0,s.jsx)(k.Z,{className:"w-3 h-3 font-bold text-black"}),(0,s.jsx)("span",{className:"hidden md:block pointer-events-none absolute -bottom-7 left-7 w-max shadow px-2 py-1 text-xs text-blue-700 opacity-0 group-hover:opacity-100",children:" Comment "})]}),(0,s.jsx)("p",{className:"text-xs hidden lg:block font-semibold text-gray-400",children:n})]})})})};var C=r(93865),Z=r(67912),F=r(11163);let S=e=>{var l;let{publication:r}=e,[t,i]=(0,d.useState)(!1),[n,c]=(0,d.useState)(!1),[u,m]=(0,d.useState)(!0),[p,h]=(0,d.useState)("");(0,d.useMemo)(()=>null!==(l=(0,a.lV)(p))&&void 0!==l?l:(0,a.qv)(p),[p]);let v=(0,d.useRef)(null),[f,b]=(0,d.useState)(!1),[j,g]=(0,d.useState)(!1),[N,w]=(0,d.useState)(!1),k="Mirror"===r.__typename,S=k?r.mirrorOf:r;(0,F.useRouter)();let O=()=>{var e,l;j?(null==v||null===(e=v.current)||void 0===e||e.pause(),g(!1)):(null==v||null===(l=v.current)||void 0===l||l.play(),g(!0))};(0,d.useEffect)(()=>{let e=new IntersectionObserver(l=>{l.forEach(l=>{l.isIntersecting&&(b(!0),e.disconnect())})});v.current&&e.observe(v.current)},[]);let M=e=>{e.currentTarget.play()},_=e=>{e.currentTarget.pause()};return(0,s.jsxs)("div",{className:"lg:ml-20 md:flex gap-4 relative",children:[(0,s.jsx)("div",{onMouseEnter:()=>i(!0),onMouseLeave:()=>i(!1),className:"rounded-xl",children:(0,s.jsx)(o(),{href:"/post/".concat(S.id),children:(0,s.jsx)("video",{loop:!0,autoPlay:!0,playsInline:!0,draggable:!1,muted:!0,onClick:O,ref:v,src:(0,Z.Z)(r),onMouseOver:M,onMouseOut:_,className:"lg:w-[410px] lg:h-[547px] md:h-[400px] md:w-[400px] h-[547px] w-full xs:w-[full] xs:h-[full] shadow-inner rounded-xl object-cover transform transition md:rounded-lg cursor-pointer bg-black pointer-events-auto md:pointer-events-auto"})},S.id)}),(0,s.jsx)("div",{className:"absolute md:relative mr-6 md:flex md:flex-col z-50 top-0 right-0 space-x-6 md:space-x-0 flex flex-row p-2 m-2 mb-10 md:p-0 md:m-0 md:pt-[135px]",children:(0,s.jsx)("div",{className:"dropdown inline-block relative",children:u&&(0,s.jsxs)("ul",{className:"dropdown-menu hidden md:block pt-1",children:[(0,s.jsx)("li",{children:(0,s.jsx)(x,{publication:r})}),(0,s.jsx)("li",{children:(0,s.jsx)(A,{publication:r})}),(0,s.jsxs)("li",{children:[" ",(0,s.jsx)(y,{publication:r})]}),(0,s.jsx)("li",{children:(0,s.jsx)(C.Z,{publication:r})})]})})})]})};var O=r(72329),M=r(7960),_=r(92864),E=r(29451),q=r(8974);let B=e=>{var l,r,t,i,a,c,m,p,h,v,f,b;let{publication:j}=e,g=j.createdAt,N=g.split("T")[0],[w,k]=(0,d.useState)(!1),Z=(0,u.qr)(e=>e.currentProfile),F=(null==j?void 0:j.__typename)==="Mirror",B=F?null==j?void 0:null===(l=j.mirrorOf)||void 0===l?void 0:l.profile:null==j?void 0:j.profile,R=F?null==j?void 0:null===(r=j.mirrorOf)||void 0===r?void 0:null===(t=r.stats)||void 0===t?void 0:t.totalUpvotes:null==j?void 0:null===(i=j.stats)||void 0===i?void 0:i.totalUpvotes,P=F?j.mirrorOf.stats.totalAmountOfComments:j.stats.totalAmountOfComments,U=F?null==j?void 0:null===(a=j.mirrorOf)||void 0===a?void 0:null===(c=a.stats)||void 0===c?void 0:c.totalAmountOfComments:null==j?void 0:null===(m=j.stats)||void 0===m?void 0:m.totalAmountOfComments,L=F?null==j?void 0:null===(p=j.mirrorOf)||void 0===p?void 0:null===(h=p.stats)||void 0===h?void 0:h.totalAmountOfCollects:null==j?void 0:null===(v=j.stats)||void 0===v?void 0:v.totalAmountOfCollects;return(0,d.useEffect)(()=>{(null==B?void 0:B.isFollowedByMe)===!0?k(!0):k(!1),Z||k(!1)},[null==B?void 0:B.isFollowedByMe]),(0,s.jsxs)("div",{className:"flex flex-col bg-[#d9dff1f6] justify-content break-word border-b-2 border-gray-200 pb-0 md:pb-6",children:[(0,s.jsxs)("div",{className:"flex-row flex break-word ",children:[(0,s.jsxs)("div",{className:"flex-auto gap-3 p-2 mt-4 cursor-pointer break-word font-semibold rounded",children:[(0,s.jsx)(o(),{href:"/u/".concat(B.id)},B.id),(0,s.jsx)(n(),{itemRef:"/u/".concat(B.id),src:(0,O.Z)(B),width:62,height:62,alt:B.handle,className:"rounded-full border-2 border-blue-500"}),(0,s.jsxs)("div",{className:"break-word ",children:[(0,s.jsx)(o(),{href:"/u/".concat(B.id),children:(0,s.jsx)("div",{className:"flex items-center gap-2",children:(0,s.jsxs)("p",{className:"capitalize flex pl-1 pt-3 gap-1 items-center text-md font-bold text-primary",children:[B.name," "]})})},B.id),(0,s.jsx)(q.Z,{className:"pl-1 text-xs text-grey-500 ",slug:(0,E.Z)(null==B?void 0:B.handle),prefix:"@"}),(0,s.jsxs)("p",{className:"text-xs pl-1 p-1 block font-semibold pt-2 pr-4 pl-full text-blue-500",children:[" ",N]}),(0,s.jsxs)(o(),{className:"pointer-events-auto ",href:"/post/".concat(j.id),children:[(0,s.jsxs)("div",{className:"my-3 pb-3 text-xs break-word text-black font-semibold",style:{wordWrap:"break-word",overflowWrap:"break-word"},children:[null==j?void 0:null===(f=j.metadata)||void 0===f?void 0:null===(b=f.description)||void 0===b?void 0:b.slice(0,150)," ",""]}),(0,s.jsx)("span",{className:"text-grey border-2 text-xs flex-shrink-0 p-1 rounded-full bg-blue-300 ",children:"See more"})]},j.id)]})]}),(0,s.jsx)("div",{className:"mt-6 mr-6",children:w?(0,s.jsx)(M.Z,{setFollowing:k,profile:B}):(0,s.jsx)(_.Z,{setFollowing:k,profile:B})})]}),(0,s.jsx)(S,{publication:j}),(0,s.jsxs)("div",{className:"flex flex-row py-3 space-x-3",children:[(0,s.jsxs)("p",{className:"text-xs block md:hidden font-semibold text-black-400 pl-1",children:[" ",R," Likes"]}),(0,s.jsxs)("p",{className:"text-xs block md:hidden font-semibold text-black-400",children:[" ",P," Comments"]}),(0,s.jsxs)("p",{className:"text-xs block md:hidden font-semibold text-black-400",children:[" ",U," Mirrors"]}),(0,s.jsxs)("p",{className:"text-xs block md:hidden font-semibold text-black-400",children:[" ",L," Collects"]})]}),(0,s.jsxs)("div",{className:"flex ml-auto",children:[(0,s.jsx)("button",{className:"block md:hidden pr-2 pb-2 ",children:(0,s.jsx)(x,{publication:j})}),(0,s.jsx)("button",{className:"block md:hidden pr-2 pb-2",children:(0,s.jsx)(A,{publication:j})}),(0,s.jsx)("button",{className:"block md:hidden pr-2 pb-2",children:(0,s.jsx)(y,{publication:j})}),(0,s.jsx)("button",{className:"block md:hidden pr-2 pb-2",children:(0,s.jsx)(C.Z,{publication:j})})]})]})};var R=B},95184:function(e,l,r){"use strict";r.d(l,{Z:function(){return h}});var s=r(85893),t={src:"/_next/static/media/Lenstoknewlogo.eec1ad02.png",height:240,width:680,blurDataURL:"data:image/png;base64,iVBORw0KGgoAAAANSUhEUgAAAAgAAAADCAMAAACZFr56AAAADFBMVEUAAAAAAAAMDO4NDfJfvlLJAAAABHRSTlMBGQkc3Rt+BgAAAAlwSFlzAAAuIwAALiMBeKU/dgAAABhJREFUeJxjYAABJiYGBkYQYGZmAguARAABGwAWcJJdQQAAAABJRU5ErkJggg==",blurWidth:8,blurHeight:3},o=r(41664),i=r.n(o),n=r(25675),d=r.n(n),a=r(15209),c=r(23286),u=r(33193),x=r(79494),m=r(12313);let p=()=>{var e;let l=(0,a.qr)(e=>e.currentProfile),r=null==l?void 0:l.picture;return console.log("CURRENT PROFILE",null==l?void 0:l.picture),(0,s.jsxs)("div",{className:"w-full flex justify-between rounded-lg items-center border-4 border-blue-500 p-2 ",children:[(0,s.jsx)(i(),{href:"/",children:(0,s.jsx)("div",{className:"w-[100px] md:w-[129px]",children:(0,s.jsx)(d(),{className:"cursor-pointer",src:t,alt:"logo",layout:"responsive"})})}),(0,s.jsx)(x.Z,{}),(0,s.jsx)(i(),{href:"/discover",children:(0,s.jsx)("button",{className:"flex px-2 pt-3 py-2 md:px-4 text-md font-semibold lg:hidden xl:hidden items-center gap-2 cursor-pointer md:hidden rounded-full text-md border-[#57B8FF] text-[#000000] hover:bg-[#57B8FF]",children:(0,s.jsx)("svg",{className:"h-6 w-6",fill:"none",stroke:"currentColor",viewBox:"0 0 24 24",xmlns:"http://www.w3.org/2000/svg",children:(0,s.jsx)("path",{strokeLinecap:"round",strokeLinejoin:"round",strokeWidth:"2",d:"M21 21l-6-6m2-5a7 7 0 11-14 0 7 7 0 0114 0z"})})})}),(0,s.jsx)("div",{children:(0,s.jsxs)("div",{className:"flex pl-2 centre-item gap-5 md:gap-10 ",children:[(0,s.jsx)(i(),{href:"/upload",children:(0,s.jsxs)("button",{className:"flex px-2 pt-3 py-2 md:px-4 text-md font-semibold items-center gap-2 cursor-pointer rounded-full text-md border-[#57B8FF] text-[#000000] hover:bg-[#57B8FF]",children:[(0,s.jsx)(u.Z,{className:"h-6 text-black"})," ",(0,s.jsx)("span",{className:"hidden ",children:"Upload "})]})}),(0,s.jsx)("div",{className:"flex",children:l?(0,s.jsx)("div",{className:"w-12 h-12",children:(0,s.jsx)(i(),{href:"/u/".concat(l.id),children:(null==r?void 0:r.__typename)==="MediaSet"?(null===(e=r.original)||void 0===e?void 0:e.url.includes("ipfs"))?(0,s.jsx)(d(),{src:(0,c.A)(null==r?void 0:r.original.url),width:40,height:40,className:"rounded-full cursor-pointer",alt:l.id.handle,layout:"responsive"}):(0,s.jsx)(d(),{src:null==r?void 0:r.original.url,width:40,height:40,className:"rounded-full cursor-pointer",alt:l.id.handle,layout:"responsive"}):(0,s.jsx)("div",{className:"bg-blue-900 w-8 h-8 rounded-full"})},l.id)}):(0,s.jsx)("div",{className:"block",children:(0,s.jsx)(m.NL,{})})})]})})]})};var h=p},79494:function(e,l,r){"use strict";var s=r(85893),t=r(21273),o=r(16175),i=r(11163),n=r(67294),d=r(47516),a=r(33962),c=r(72329),u=r(41664),x=r.n(u);let m=e=>{let{hideDropdown:l=!1}=e,{push:r,pathname:u,query:m}=(0,i.useRouter)(),[p,h]=(0,n.useState)(""),v=(0,n.useRef)(null),[f,{data:b,loading:j}]=(0,t.mp)(),g=e=>{let r=e.target.value;h(r),"/search"===u||l||f({variables:{request:{type:o.qkC.Profile,query:r,limit:8}}})},N=e=>{e.preventDefault(),"/search"===u?r("/search?q=".concat(p,"&type=").concat(m.type)):r("/search?q=".concat(p,"&type=profiles")),h(""),console.log(p)},w=null==b?void 0:b.search,y=w&&w.hasOwnProperty("items"),k=y?w.items:[];return(0,s.jsxs)("div",{className:"relative items-center hidden md:hidden",children:[(0,s.jsxs)("form",{className:"absolute md:static top-10 -left-20 max-w-md",onSubmit:N,children:[(0,s.jsx)("input",{className:"justify-content bg-primary p-3 md:text-md font-medium border-2 border-gray-100 focus:outline-none focus:border-2 focus:border-gray-300 w-[300px] md:w-[350px] rounded-full md:top-0",placeholder:"Search accounts and videos",value:p,onChange:g}),(0,s.jsx)("button",{className:"absolute md:right-5 right-6 top-4 border-l-2 border-gray-300 pl-4 text-2xl text-gray-400",children:(0,s.jsx)(d.Goc,{})})]}),"/search"!==u&&!l&&p.length>0&&(0,s.jsx)("div",{className:"flex absolute flex-col mt-2 w-[94%] z-50",ref:v,children:(0,s.jsx)("div",{className:"overflow-y-auto py-2 max-h-[80vh] rounded-none border bg-white",children:j?(0,s.jsxs)("div",{className:"py-2 px-4 space-y-2 text-sm font-bold text-center",children:[(0,s.jsx)(a.$,{size:"sm",className:"mx-auto"}),(0,s.jsx)("div",{children:"Searching..."})]}):(0,s.jsxs)(s.Fragment,{children:[k.map(e=>(0,s.jsx)("div",{className:"p-5",children:(0,s.jsx)(x(),{href:"/u/".concat(null==e?void 0:e.id),children:(0,s.jsxs)("div",{className:"flex gap-3 hover:bg-primary p-2 cursor-pointer font-semibold rounded items-center",children:[(0,s.jsx)("div",{children:(0,s.jsx)("img",{width:40,height:40,className:"rounded-full cursro-pointer",src:(0,c.Z)(e),alt:null==e?void 0:e.handle})}),(0,s.jsx)("div",{className:"hidden lg:block",children:(0,s.jsx)("p",{className:"flex gap-1 items-center text-md font-bold text-primary lowercase",children:null==e?void 0:e.handle})})]})})},null==e?void 0:e.id)),0===k.length&&(0,s.jsx)("div",{children:"No matching Profiles"})]})})})]})};l.Z=m},47422:function(e,l,r){"use strict";var s=r(85893),t=r(21273),o=r(16175);r(67294);var i=r(33962),n=r(25675),d=r.n(n),a=r(72329),c=r(41664),u=r.n(c),x=r(29451);let m=e=>{var l,r;let{query:n}=e,c={query:n,type:o.qkC.Profile,limit:10},{data:m,loading:p,error:h,fetchMore:v}=(0,t.Fh)({variables:{request:c},skip:!n}),f=null==m?void 0:null===(l=m.search)||void 0===l?void 0:l.items,b=null==m?void 0:null===(r=m.search)||void 0===r?void 0:r.pageInfo;return((null==b?void 0:b.next)&&(null==f||f.length,b.totalCount),console.log(f),(null==f?void 0:f.length)===0)?(0,s.jsxs)("div",{children:["No profiles for ",(0,s.jsxs)("b",{children:["“",n,"”"]})]}):h?(0,s.jsx)("div",{children:"Failed to load profiles"}):(p&&(s.Fragment,i.$),(0,s.jsx)("div",{className:"space-y-3 rounded-xl",children:null==f?void 0:f.map(e=>(0,s.jsx)("div",{className:"p-5",children:(0,s.jsx)(u(),{href:"/u/".concat(null==e?void 0:e.id),children:(0,s.jsxs)("div",{className:"flex gap-3 p-2 cursor-pointer rounded-xl font-semibold items-center",children:[(0,s.jsx)(d(),{width:62,height:62,className:"rounded-full cursor-pointer",src:(0,a.Z)(e),alt:(0,x.Z)(null==e?void 0:e.handle)}),(0,s.jsx)("div",{className:" lg:block",children:(0,s.jsxs)("p",{className:"flex gap-1 items-center text-md font-bold text-primary lowercase",children:[null==e?void 0:e.name,(0,s.jsxs)("p",{className:"capitalize text-gray-400",children:[(0,x.Z)(null==e?void 0:e.handle),""]})]})})]})})},null==e?void 0:e.id))}))};l.Z=m},8974:function(e,l,r){"use strict";var s=r(85893),t=r(86010);let o=e=>{let{slug:l,prefix:r,className:o=""}=e;return(0,s.jsxs)("span",{className:(0,t.Z)("text-black bg-clip-text bg-gradient-to-r text-xs from-brand-600 dark:from-brand-400 to-pink-600 dark:to-pink-400",o),children:[r,l]})};l.Z=o},26225:function(e,l,r){"use strict";r.r(l),r.d(l,{default:function(){return g}});var s=r(85893),t=r(11163),o=r(67294),i=r(47422),n=r(86501),d=r(95184),a=r(15209),c=r(41664),u=r.n(c),x=r(8193),m=r(53990);let p=()=>{(0,a.qr)(e=>e.currentProfile);let[e,l]=(0,o.useState)(!0),{query:r}=(0,t.useRouter)(),i="flex items-center gap-3 hover:bg-primary p-3 justify-center lg:justify-start curser-pointer font-semibold text-[#57B8FF] rounded";return(0,s.jsxs)("div",{children:[(0,s.jsx)("div",{className:"block lg:hidden m-2 ml-4 mt-3 text-xl",onClick:()=>l(!e),children:e?(0,s.jsx)(m.ZCS,{}):(0,s.jsx)(x.qTj,{})}),e&&(0,s.jsx)("div",{className:"lg:w-400 w-20 flex flex-col justify-start mb-10 border-r-2 border-gray-100 xl:border-0 p-3",children:(0,s.jsxs)("div",{className:"lg:border-b-2 border-gray-200 xl:pb-4",children:[(0,s.jsx)(u(),{href:"/search?q=".concat(r.q,"&type=profiles"),children:(0,s.jsx)("div",{className:i,children:(0,s.jsx)("a",{className:"text-md hidden lg:block cursor-pointer",children:"Profiles"})})}),(0,s.jsx)(u(),{href:"/search?q=".concat(r.q,"&type=pubs"),children:(0,s.jsx)("div",{className:i,children:(0,s.jsx)("a",{className:"text-md hidden lg:block text-[#000000] cursor-pointer",children:"Publications"})})})]})})]})};var h=r(21273),v=r(16175),f=r(92435);let b=e=>{let{query:l}=e;(0,a.qr)(e=>e.currentProfile);let r={query:l,type:v.qkC.Publication,limit:10},{data:t,loading:o,error:i,fetchMore:n}=(0,h.Ey)({variables:{request:r}}),d=null==t?void 0:t.search,c=null==d?void 0:d.items,u=null==d?void 0:d.pageInfo;return(null==u?void 0:u.next)&&(null==c||c.length,u.totalCount),(0,s.jsx)("div",{children:null==c?void 0:c.map(e=>(0,s.jsx)(f.Z,{publication:e},null==e?void 0:e.id))})},j=()=>{let{query:e}=(0,t.useRouter)();return e.q&&["pubs","profiles"].includes(e.type)?(0,s.jsx)("div",{children:(0,s.jsxs)("div",{className:"xl:w-[1200px] lg:w-[1100px] m-auto overflow-hidden h-[100vh]",children:[(0,s.jsx)(n.x7,{position:"bottom-right"}),(0,s.jsx)(d.Z,{}),(0,s.jsxs)("div",{className:"flex gap-6 md:gap-20",children:[(0,s.jsx)("div",{className:"h-[92vh] overflow-hidden hidden lg:block lg:hover:overflow-auto",children:(0,s.jsx)(p,{})}),(0,s.jsxs)("div",{className:"mt-2 flex flex-col gap-10 overflow-auto overflow-x-hidden h-[88vh] videos flex-1",children:["profiles"===e.type&&(0,s.jsx)(i.Z,{query:e.q}),"pubs"===e.type&&(0,s.jsx)(b,{query:e.q})]})]})]})}):(0,s.jsx)("p",{children:"Error"})};var g=j}},function(e){e.O(0,[3714,8766,7025,2692,4980,2013,5445,9866,3874,4617,3609,7856,6552,8179,3987,1664,9869,713,6064,5006,6526,7806,4879,4953,7410,9717,5056,9774,2888,179],function(){return e(e.s=8266)}),_N_E=e.O()}]);