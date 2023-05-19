"use strict";(self.webpackChunk_N_E=self.webpackChunk_N_E||[]).push([[4866],{24866:function(e,t,o){o.r(t),o.d(t,{default:function(){return Z}});var r=o(85893),l=o(53768),n=o(82010),a=o(39321),s=o(16194),i=o(12166),c=o(46839);o(41159);var d=o(7780),u=o(12313),f=o(1575),h=o(64078),p=o(54524),v=o(31407),m=o(86386),g=o(81202),y=o(63200),I=o(96245),k=o(86501),T=o(59508),q=o(86909),w=o(57976),b=o(77243),P=o(8819);let S=e=>{var t;return"".concat(e.__typename,":").concat(JSON.stringify({id:e.id,collectedBy:null===(t=e.collectedBy)||void 0===t?void 0:t.address,createdAt:e.createdAt}))},C=e=>({keyArgs:e,read(e,t){let{canRead:o}=t;if(!e)return e;let{items:r,pageInfo:l}=e,n=null==r?void 0:r.filter(e=>!o(e));return{...e,items:r,pageInfo:{...l,totalCount:(null==l?void 0:l.totalCount)?l.totalCount-(null==n?void 0:n.length):null}}},merge(e,t){var o,r;if(!e)return t;let l=null!==(o=e.items)&&void 0!==o?o:[],n=null!==(r=t.items)&&void 0!==r?r:[];return{...t,items:null==l?void 0:l.concat(n),pageInfo:t.pageInfo}}});var x=o(76781);let j=new T.u({uri:a.T5,fetch}),B=(0,y.q)(e=>{let{graphQLErrors:t,networkError:o}=e;t&&t.forEach(e=>{let{message:t,locations:o,path:r}=e;return console.log("[GraphQL error]: Message: ".concat(t,", Location: ").concat(o,", Path: ").concat(r))}),o&&console.log("[Network error]: ".concat(o))}),N=new q.i((e,t)=>{let o=localStorage.getItem("accessToken");if("undefined"===o||!o)return localStorage.removeItem("accessToken"),localStorage.removeItem("refreshToken"),localStorage.removeItem("selectedProfile"),t(e);{e.setContext({headers:{"x-access-token":o?"Bearer ".concat(o):""}});let{exp:r}=(0,I.Z)(o);return Date.now()>=1e3*r&&fetch(a.T5,{method:"POST",headers:{"Content-Type":"application/json"},body:JSON.stringify({operationName:"Refresh",query:"\n    mutation Refresh($request: RefreshRequest!) {\n      refresh(request: $request) {\n        accessToken\n        refreshToken\n      }\n    }\n  ",variables:{request:{refreshToken:localStorage.getItem("refreshToken")}}})}).then(e=>e.json()).then(t=>{var r,l,n,a,s,i;e.setContext({headers:{"x-access-token":o?"Bearer ".concat(null==t?void 0:null===(r=t.data)||void 0===r?void 0:null===(l=r.refresh)||void 0===l?void 0:l.accessToken):""}}),localStorage.setItem("accessToken",null==t?void 0:null===(n=t.data)||void 0===n?void 0:null===(a=n.refresh)||void 0===a?void 0:a.accessToken),localStorage.setItem("refreshToken",null==t?void 0:null===(s=t.data)||void 0===s?void 0:null===(i=s.refresh)||void 0===i?void 0:i.refreshToken)}).catch(()=>{localStorage.removeItem("accessToken"),localStorage.removeItem("refreshToken"),k.ZP.error("Something went wrong when authenticating with Lens! Please log out, log back in, and try again.")}),t(e)}}),R=new w.f({link:(0,b.D)([B,N,j]),cache:new P.h({possibleTypes:x.ZP.possibleTypes,typePolicies:{Post:{keyFields:S},Comment:{keyFields:S},Mirror:{keyFields:S},Query:{fields:{timeline:C(["request",["profileId"]]),feed:C(["request",["profileId","feedEventItemTypes"]]),feedHighlights:C(["request",["profileId"]]),explorePublications:C(["request",["sortCriteria","metadata"]]),publications:C(["request",["profileId","commentsOf","publicationTypes","metadata"]]),nfts:C(["request",["ownerAddress","chainIds"]]),notifications:C(["request",["profileId","notificationTypes"]]),followers:C(["request",["profileId"]]),following:C(["request",["address"]]),search:C(["request",["query","type"]]),profiles:C(["request",["profileIds","ownedBy","handles","whoMirroredPublicationId"]]),whoCollectedPublication:C(["request",["publicationId"]]),whoReactedPublication:C(["request",["publicationId"]]),mutualFollowersProfiles:C(["request",["viewingProfileId","yourProfileId","limit"]])}}}})});var _=o(30340);let{chains:L,provider:M}=(0,h.QB)([a.M8?v.yu:v.v8],[(0,m.$)({apiKey:a.Rp}),(0,g.I)()]),{wallets:E}=(0,d.wo)({appName:"LensShare",chains:L}),F=(0,d.a3)([...E]),O=(0,p.eI)({autoConnect:!0,connectors:F,provider:M}),A=(0,s.c)({provider:(0,i.e)({apiKey:"8187b37a-e74f-462d-a34f-80f180f70b9e",baseUrl:a.Tq})}),Q=e=>{let{children:t}=e;return(0,r.jsx)(p.eM,{client:O,children:(0,r.jsx)(u.pj,{chains:L,theme:(0,f.W)({...f.W.accentColors.blue,borderRadius:"small",fontStack:"system",overlayBlur:"small"}),children:(0,r.jsx)(l.e,{client:R,children:(0,r.jsxs)(c.L,{client:A,children:[(0,r.jsx)(n.f,{defaultTheme:"light",attribute:"class",children:t}),(0,r.jsx)(_.cp,{})]})})})})};var Z=Q}}]);