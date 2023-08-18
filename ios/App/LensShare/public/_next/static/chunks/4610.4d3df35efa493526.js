(self.webpackChunk_N_E=self.webpackChunk_N_E||[]).push([[4610],{72964:function(e,t,o){"use strict";o.r(t),o.d(t,{default:function(){return D}});var r=o(85893),n=o(53768),l=o(82010),s=o(5649),i=o(99446),a=o(59947),c=o(35667),d=o(76536),u=o(85945),f=o(63200),h=o(96245),p=o(86501),m=o(59508),g=o(86909),v=o(57976),k=o(77243),w=o(8819);let I=e=>{var t;return"".concat(e.__typename,":").concat(JSON.stringify({id:e.id,collectedBy:null===(t=e.collectedBy)||void 0===t?void 0:t.address,createdAt:e.createdAt}))},y=e=>({keyArgs:e,read(e,t){let{canRead:o}=t;if(!e)return e;let{items:r,pageInfo:n}=e,l=null==r?void 0:r.filter(e=>!o(e));return{...e,items:r,pageInfo:{...n,totalCount:(null==n?void 0:n.totalCount)?n.totalCount-(null==l?void 0:l.length):null}}},merge(e,t){var o,r;if(!e)return t;let n=null!==(o=e.items)&&void 0!==o?o:[],l=null!==(r=t.items)&&void 0!==r?r:[];return{...t,items:null==n?void 0:n.concat(l),pageInfo:t.pageInfo}}});var b=o(76781);let T=new m.u({uri:s.T5,fetchOptions:"no-cors",fetch}),q=(0,f.q)(e=>{let{graphQLErrors:t,networkError:o}=e;t&&t.forEach(e=>{let{message:t,locations:o,path:r}=e;return console.log("[GraphQL error]: Message: ".concat(t,", Location: ").concat(o,", Path: ").concat(r))}),o&&console.log("[Network error]: ".concat(o))}),S=new g.i((e,t)=>{let o=localStorage.getItem("accessToken");if("undefined"===o||!o)return localStorage.removeItem("accessToken"),localStorage.removeItem("refreshToken"),localStorage.removeItem("selectedProfile"),t(e);{e.setContext({headers:{"x-access-token":o?"Bearer ".concat(o):""}});let{exp:r}=(0,h.Z)(o);return Date.now()>=1e3*r&&fetch(s.T5,{method:"POST",headers:{"Content-Type":"application/json"},body:JSON.stringify({operationName:"Refresh",query:"\n    mutation Refresh($request: RefreshRequest!) {\n      refresh(request: $request) {\n        accessToken\n        refreshToken\n      }\n    }\n  ",variables:{request:{refreshToken:localStorage.getItem("refreshToken")}}})}).then(e=>e.json()).then(t=>{var r,n,l,s,i,a;e.setContext({headers:{"x-access-token":o?"Bearer ".concat(null==t?void 0:null===(r=t.data)||void 0===r?void 0:null===(n=r.refresh)||void 0===n?void 0:n.accessToken):""}}),localStorage.setItem("accessToken",null==t?void 0:null===(l=t.data)||void 0===l?void 0:null===(s=l.refresh)||void 0===s?void 0:s.accessToken),localStorage.setItem("refreshToken",null==t?void 0:null===(i=t.data)||void 0===i?void 0:null===(a=i.refresh)||void 0===a?void 0:a.refreshToken)}).catch(()=>{localStorage.removeItem("accessToken"),localStorage.removeItem("refreshToken"),p.ZP.error("Something went wrong when authenticating with Lens! Please log out, log back in, and try again.")}),t(e)}}),x=new v.f({link:(0,k.D)([q,S,T]),cache:new w.h({possibleTypes:b.ZP.possibleTypes,typePolicies:{Post:{keyFields:I},Comment:{keyFields:I},Mirror:{keyFields:I},Query:{fields:{timeline:y(["request",["profileId"]]),feed:y(["request",["profileId","feedEventItemTypes"]]),feedHighlights:y(["request",["profileId"]]),explorePublications:y(["request",["sortCriteria","metadata"]]),publications:y(["request",["profileId","commentsOf","publicationTypes","metadata"]]),nfts:y(["request",["ownerAddress","chainIds"]]),notifications:y(["request",["profileId","notificationTypes"]]),followers:y(["request",["profileId"]]),following:y(["request",["address"]]),search:y(["request",["query","type"]]),profiles:y(["request",["profileIds","ownedBy","handles","whoMirroredPublicationId"]]),whoCollectedPublication:y(["request",["publicationId"]]),whoReactedPublication:y(["request",["publicationId"]]),mutualFollowersProfiles:y(["request",["viewingProfileId","yourProfileId","limit"]])}}}})});var C=o(30340),P=o(55548),j=o(50555),N=o(1660),F=o(31618),R=o(31407),B=o(70769),_=o(68980),M=o(22944),O=o(92882);let E=()=>{let e=(0,O.Fc)(e=>e.profileId),t=(0,B.p)(e=>e.setUserSigNonce);return(0,M.G)()&&(0,M.B)("userSigNonce",B.p),(0,_.mM$)({skip:!e,onCompleted:e=>{let{userSigNonces:o}=e;t(o.lensHubOnChainSigNonce)},pollInterval:1e4}),null},J=[R.yu,R.RJ],L=s.yh,{publicClient:U}=(0,N.QB)(J,[(0,P.X)({projectId:L})]),A=(0,F._g)({autoConnect:!0,connectors:(0,P.gu)({projectId:L,chains:J}),publicClient:U}),H=new P.J0(A,J),Q=(0,i.R)({provider:(0,a.e)({apiKey:"9e17a7ab-3370-4e31-85c3-43072da2315e",baseUrl:s.Tq})}),Z=new d.S,$=e=>{let{children:t}=e;return(0,r.jsxs)(F.eM,{config:A,children:[(0,r.jsxs)(n.e,{client:x,children:[(0,r.jsx)(E,{}),(0,r.jsx)(u.aH,{client:Z,children:(0,r.jsxs)(c.L,{client:Q,children:[(0,r.jsx)(l.f,{defaultTheme:"light",attribute:"class",children:t}),(0,r.jsx)(C.cp,{})]})})]}),(0,r.jsx)(j.Eg,{themeVariables:{"--w3m-font-family":"Roboto, sans-serif","--w3m-accent-color":"#000fff","--w3m-background-color":"#FFFF","--w3m-logo-image-url":"https://lenshareapp.xyz/images/icon.png","--w3m-container-border-radius":"25px","--w3m-background-border-radius":"25px"},themeMode:"dark",projectId:L,ethereumClient:H})]})};var D=$},70769:function(e,t,o){"use strict";o.d(t,{p:function(){return l}});var r=o(73445),n=o(782);let l=(0,r.Ue)((0,n.XR)(e=>({userSigNonce:0,setUserSigNonce:t=>e(()=>({userSigNonce:t}))})))},35883:function(){}}]);