(()=>{var f=(t,r)=>()=>(r||t((r={exports:{}}).exports,r),r.exports);var h=(t,r,n)=>new Promise((o,a)=>{var c=e=>{try{d(n.next(e))}catch(g){a(g)}},p=e=>{try{d(n.throw(e))}catch(g){a(g)}},d=e=>e.done?o(e.value):Promise.resolve(e.value).then(c,p);d((n=n.apply(t,r)).next())});var k=f(v=>{(self.webpackChunklens_share=self.webpackChunklens_share||[]).push([[179],{"./.storybook/preview.ts":(t,r,n)=>{"use strict";n.r(r),n.d(r,{default:()=>u});var o=n("./node_modules/style-loader/dist/runtime/injectStylesIntoStyleTag.js"),a=n.n(o),c=n("./node_modules/style-loader/dist/runtime/styleDomAPI.js"),p=n.n(c),d=n("./node_modules/style-loader/dist/runtime/insertBySelector.js"),e=n.n(d),g=n("./node_modules/style-loader/dist/runtime/setAttributesWithoutAttributes.js"),b=n.n(g),y=n("./node_modules/style-loader/dist/runtime/insertStyleElement.js"),m=n.n(y),w=n("./node_modules/style-loader/dist/runtime/styleTagTransform.js"),i=n.n(w),s=n("./node_modules/css-loader/dist/cjs.js??ruleSet[1].rules[7].use[1]!./node_modules/postcss-loader/dist/cjs.js??ruleSet[1].rules[7].use[2]!./.storybook/style.css"),l={};l.styleTagTransform=i(),l.setAttributes=b(),l.insert=e().bind(null,"head"),l.domAPI=p(),l.insertStyleElement=m();var O=a()(s.Z,l);const j=s.Z&&s.Z.locals?s.Z.locals:void 0;var x={parameters:{actions:{argTypesRegex:"^on[A-Z].*"},controls:{hideNoControlsWarning:!0}}};const u=x},"./node_modules/css-loader/dist/cjs.js??ruleSet[1].rules[7].use[1]!./node_modules/postcss-loader/dist/cjs.js??ruleSet[1].rules[7].use[2]!./.storybook/style.css":(t,r,n)=>{"use strict";n.d(r,{Z:()=>e});var o=n("./node_modules/css-loader/dist/runtime/noSourceMaps.js"),a=n.n(o),c=n("./node_modules/css-loader/dist/runtime/api.js"),p=n.n(c),d=p()(a());d.push([t.id,`/*
! tailwindcss v3.3.2 | MIT License | https://tailwindcss.com
*//*
1. Prevent padding and border from affecting element width. (https://github.com/mozdevs/cssremedy/issues/4)
2. Allow adding a border to an element by just adding a border-width. (https://github.com/tailwindcss/tailwindcss/pull/116)
*/

*,
::before,
::after {
  box-sizing: border-box; /* 1 */
  border-width: 0; /* 2 */
  border-style: solid; /* 2 */
  border-color: #e5e7eb; /* 2 */
}

::before,
::after {
  --tw-content: '';
}

/*
1. Use a consistent sensible line-height in all browsers.
2. Prevent adjustments of font size after orientation changes in iOS.
3. Use a more readable tab size.
4. Use the user's configured \`sans\` font-family by default.
5. Use the user's configured \`sans\` font-feature-settings by default.
6. Use the user's configured \`sans\` font-variation-settings by default.
*/

html {
  line-height: 1.5; /* 1 */
  -webkit-text-size-adjust: 100%; /* 2 */
  -moz-tab-size: 4; /* 3 */
  -o-tab-size: 4;
     tab-size: 4; /* 3 */
  font-family: Inter var, ui-sans-serif, system-ui, -apple-system, BlinkMacSystemFont, "Segoe UI", Roboto, "Helvetica Neue", Arial, "Noto Sans", sans-serif, "Apple Color Emoji", "Segoe UI Emoji", "Segoe UI Symbol", "Noto Color Emoji"; /* 4 */
  font-feature-settings: normal; /* 5 */
  font-variation-settings: normal; /* 6 */
}

/*
1. Remove the margin in all browsers.
2. Inherit line-height from \`html\` so users can set them as a class directly on the \`html\` element.
*/

body {
  margin: 0; /* 1 */
  line-height: inherit; /* 2 */
}

/*
1. Add the correct height in Firefox.
2. Correct the inheritance of border color in Firefox. (https://bugzilla.mozilla.org/show_bug.cgi?id=190655)
3. Ensure horizontal rules are visible by default.
*/

hr {
  height: 0; /* 1 */
  color: inherit; /* 2 */
  border-top-width: 1px; /* 3 */
}

/*
Add the correct text decoration in Chrome, Edge, and Safari.
*/

abbr:where([title]) {
  -webkit-text-decoration: underline dotted;
          text-decoration: underline dotted;
}

/*
Remove the default font size and weight for headings.
*/

h1,
h2,
h3,
h4,
h5,
h6 {
  font-size: inherit;
  font-weight: inherit;
}

/*
Reset links to optimize for opt-in styling instead of opt-out.
*/

a {
  color: inherit;
  text-decoration: inherit;
}

/*
Add the correct font weight in Edge and Safari.
*/

b,
strong {
  font-weight: bolder;
}

/*
1. Use the user's configured \`mono\` font family by default.
2. Correct the odd \`em\` font sizing in all browsers.
*/

code,
kbd,
samp,
pre {
  font-family: ui-monospace, SFMono-Regular, Menlo, Monaco, Consolas, "Liberation Mono", "Courier New", monospace; /* 1 */
  font-size: 1em; /* 2 */
}

/*
Add the correct font size in all browsers.
*/

small {
  font-size: 80%;
}

/*
Prevent \`sub\` and \`sup\` elements from affecting the line height in all browsers.
*/

sub,
sup {
  font-size: 75%;
  line-height: 0;
  position: relative;
  vertical-align: baseline;
}

sub {
  bottom: -0.25em;
}

sup {
  top: -0.5em;
}

/*
1. Remove text indentation from table contents in Chrome and Safari. (https://bugs.chromium.org/p/chromium/issues/detail?id=999088, https://bugs.webkit.org/show_bug.cgi?id=201297)
2. Correct table border color inheritance in all Chrome and Safari. (https://bugs.chromium.org/p/chromium/issues/detail?id=935729, https://bugs.webkit.org/show_bug.cgi?id=195016)
3. Remove gaps between table borders by default.
*/

table {
  text-indent: 0; /* 1 */
  border-color: inherit; /* 2 */
  border-collapse: collapse; /* 3 */
}

/*
1. Change the font styles in all browsers.
2. Remove the margin in Firefox and Safari.
3. Remove default padding in all browsers.
*/

button,
input,
optgroup,
select,
textarea {
  font-family: inherit; /* 1 */
  font-size: 100%; /* 1 */
  font-weight: inherit; /* 1 */
  line-height: inherit; /* 1 */
  color: inherit; /* 1 */
  margin: 0; /* 2 */
  padding: 0; /* 3 */
}

/*
Remove the inheritance of text transform in Edge and Firefox.
*/

button,
select {
  text-transform: none;
}

/*
1. Correct the inability to style clickable types in iOS and Safari.
2. Remove default button styles.
*/

button,
[type='button'],
[type='reset'],
[type='submit'] {
  -webkit-appearance: button; /* 1 */
  background-color: transparent; /* 2 */
  background-image: none; /* 2 */
}

/*
Use the modern Firefox focus style for all focusable elements.
*/

:-moz-focusring {
  outline: auto;
}

/*
Remove the additional \`:invalid\` styles in Firefox. (https://github.com/mozilla/gecko-dev/blob/2f9eacd9d3d995c937b4251a5557d95d494c9be1/layout/style/res/forms.css#L728-L737)
*/

:-moz-ui-invalid {
  box-shadow: none;
}

/*
Add the correct vertical alignment in Chrome and Firefox.
*/

progress {
  vertical-align: baseline;
}

/*
Correct the cursor style of increment and decrement buttons in Safari.
*/

::-webkit-inner-spin-button,
::-webkit-outer-spin-button {
  height: auto;
}

/*
1. Correct the odd appearance in Chrome and Safari.
2. Correct the outline style in Safari.
*/

[type='search'] {
  -webkit-appearance: textfield; /* 1 */
  outline-offset: -2px; /* 2 */
}

/*
Remove the inner padding in Chrome and Safari on macOS.
*/

::-webkit-search-decoration {
  -webkit-appearance: none;
}

/*
1. Correct the inability to style clickable types in iOS and Safari.
2. Change font properties to \`inherit\` in Safari.
*/

::-webkit-file-upload-button {
  -webkit-appearance: button; /* 1 */
  font: inherit; /* 2 */
}

/*
Add the correct display in Chrome and Safari.
*/

summary {
  display: list-item;
}

/*
Removes the default spacing and border for appropriate elements.
*/

blockquote,
dl,
dd,
h1,
h2,
h3,
h4,
h5,
h6,
hr,
figure,
p,
pre {
  margin: 0;
}

fieldset {
  margin: 0;
  padding: 0;
}

legend {
  padding: 0;
}

ol,
ul,
menu {
  list-style: none;
  margin: 0;
  padding: 0;
}

/*
Prevent resizing textareas horizontally by default.
*/

textarea {
  resize: vertical;
}

/*
1. Reset the default placeholder opacity in Firefox. (https://github.com/tailwindlabs/tailwindcss/issues/3300)
2. Set the default placeholder color to the user's configured gray 400 color.
*/

input::-moz-placeholder, textarea::-moz-placeholder {
  opacity: 1; /* 1 */
  color: #9ca3af; /* 2 */
}

input::placeholder,
textarea::placeholder {
  opacity: 1; /* 1 */
  color: #9ca3af; /* 2 */
}

/*
Set the default cursor for buttons.
*/

button,
[role="button"] {
  cursor: pointer;
}

/*
Make sure disabled buttons don't get the pointer cursor.
*/
:disabled {
  cursor: default;
}

/*
1. Make replaced elements \`display: block\` by default. (https://github.com/mozdevs/cssremedy/issues/14)
2. Add \`vertical-align: middle\` to align replaced elements more sensibly by default. (https://github.com/jensimmons/cssremedy/issues/14#issuecomment-634934210)
   This can trigger a poorly considered lint error in some tools but is included by design.
*/

img,
svg,
video,
canvas,
audio,
iframe,
embed,
object {
  display: block; /* 1 */
  vertical-align: middle; /* 2 */
}

/*
Constrain images and videos to the parent width and preserve their intrinsic aspect ratio. (https://github.com/mozdevs/cssremedy/issues/14)
*/

img,
video {
  max-width: 100%;
  height: auto;
}

/* Make elements with the HTML hidden attribute stay hidden by default */
[hidden] {
  display: none;
}

*, ::before, ::after {
  --tw-border-spacing-x: 0;
  --tw-border-spacing-y: 0;
  --tw-translate-x: 0;
  --tw-translate-y: 0;
  --tw-rotate: 0;
  --tw-skew-x: 0;
  --tw-skew-y: 0;
  --tw-scale-x: 1;
  --tw-scale-y: 1;
  --tw-pan-x:  ;
  --tw-pan-y:  ;
  --tw-pinch-zoom:  ;
  --tw-scroll-snap-strictness: proximity;
  --tw-gradient-from-position:  ;
  --tw-gradient-via-position:  ;
  --tw-gradient-to-position:  ;
  --tw-ordinal:  ;
  --tw-slashed-zero:  ;
  --tw-numeric-figure:  ;
  --tw-numeric-spacing:  ;
  --tw-numeric-fraction:  ;
  --tw-ring-inset:  ;
  --tw-ring-offset-width: 0px;
  --tw-ring-offset-color: #fff;
  --tw-ring-color: rgb(59 130 246 / 0.5);
  --tw-ring-offset-shadow: 0 0 #0000;
  --tw-ring-shadow: 0 0 #0000;
  --tw-shadow: 0 0 #0000;
  --tw-shadow-colored: 0 0 #0000;
  --tw-blur:  ;
  --tw-brightness:  ;
  --tw-contrast:  ;
  --tw-grayscale:  ;
  --tw-hue-rotate:  ;
  --tw-invert:  ;
  --tw-saturate:  ;
  --tw-sepia:  ;
  --tw-drop-shadow:  ;
  --tw-backdrop-blur:  ;
  --tw-backdrop-brightness:  ;
  --tw-backdrop-contrast:  ;
  --tw-backdrop-grayscale:  ;
  --tw-backdrop-hue-rotate:  ;
  --tw-backdrop-invert:  ;
  --tw-backdrop-opacity:  ;
  --tw-backdrop-saturate:  ;
  --tw-backdrop-sepia:  ;
}

::backdrop {
  --tw-border-spacing-x: 0;
  --tw-border-spacing-y: 0;
  --tw-translate-x: 0;
  --tw-translate-y: 0;
  --tw-rotate: 0;
  --tw-skew-x: 0;
  --tw-skew-y: 0;
  --tw-scale-x: 1;
  --tw-scale-y: 1;
  --tw-pan-x:  ;
  --tw-pan-y:  ;
  --tw-pinch-zoom:  ;
  --tw-scroll-snap-strictness: proximity;
  --tw-gradient-from-position:  ;
  --tw-gradient-via-position:  ;
  --tw-gradient-to-position:  ;
  --tw-ordinal:  ;
  --tw-slashed-zero:  ;
  --tw-numeric-figure:  ;
  --tw-numeric-spacing:  ;
  --tw-numeric-fraction:  ;
  --tw-ring-inset:  ;
  --tw-ring-offset-width: 0px;
  --tw-ring-offset-color: #fff;
  --tw-ring-color: rgb(59 130 246 / 0.5);
  --tw-ring-offset-shadow: 0 0 #0000;
  --tw-ring-shadow: 0 0 #0000;
  --tw-shadow: 0 0 #0000;
  --tw-shadow-colored: 0 0 #0000;
  --tw-blur:  ;
  --tw-brightness:  ;
  --tw-contrast:  ;
  --tw-grayscale:  ;
  --tw-hue-rotate:  ;
  --tw-invert:  ;
  --tw-saturate:  ;
  --tw-sepia:  ;
  --tw-drop-shadow:  ;
  --tw-backdrop-blur:  ;
  --tw-backdrop-brightness:  ;
  --tw-backdrop-contrast:  ;
  --tw-backdrop-grayscale:  ;
  --tw-backdrop-hue-rotate:  ;
  --tw-backdrop-invert:  ;
  --tw-backdrop-opacity:  ;
  --tw-backdrop-saturate:  ;
  --tw-backdrop-sepia:  ;
}
.pointer-events-none {
  pointer-events: none;
}
.pointer-events-auto {
  pointer-events: auto;
}
.visible {
  visibility: visible;
}
.invisible {
  visibility: hidden;
}
.static {
  position: static;
}
.fixed {
  position: fixed;
}
.absolute {
  position: absolute;
}
.relative {
  position: relative;
}
.sticky {
  position: sticky;
}
.inset-0 {
  inset: 0px;
}
.-bottom-7 {
  bottom: -1.75rem;
}
.-left-20 {
  left: -5rem;
}
.bottom-0 {
  bottom: 0px;
}
.bottom-3 {
  bottom: 0.75rem;
}
.left-0 {
  left: 0px;
}
.left-3 {
  left: 0.75rem;
}
.left-5 {
  left: 1.25rem;
}
.left-7 {
  left: 1.75rem;
}
.right-0 {
  right: 0px;
}
.right-2 {
  right: 0.5rem;
}
.right-6 {
  right: 1.5rem;
}
.top-0 {
  top: 0px;
}
.top-10 {
  top: 2.5rem;
}
.top-4 {
  top: 1rem;
}
.top-5 {
  top: 1.25rem;
}
.z-10 {
  z-index: 10;
}
.z-30 {
  z-index: 30;
}
.z-50 {
  z-index: 50;
}
.z-\\[5\\] {
  z-index: 5;
}
.order-first {
  order: -9999;
}
.order-last {
  order: 9999;
}
.col-span-2 {
  grid-column: span 2 / span 2;
}
.m-2 {
  margin: 0.5rem;
}
.m-3 {
  margin: 0.75rem;
}
.m-5 {
  margin: 1.25rem;
}
.m-auto {
  margin: auto;
}
.mx-11 {
  margin-left: 2.75rem;
  margin-right: 2.75rem;
}
.mx-4 {
  margin-left: 1rem;
  margin-right: 1rem;
}
.mx-5 {
  margin-left: 1.25rem;
  margin-right: 1.25rem;
}
.mx-auto {
  margin-left: auto;
  margin-right: auto;
}
.my-3 {
  margin-top: 0.75rem;
  margin-bottom: 0.75rem;
}
.my-4 {
  margin-top: 1rem;
  margin-bottom: 1rem;
}
.mb-0 {
  margin-bottom: 0px;
}
.mb-0\\.5 {
  margin-bottom: 0.125rem;
}
.mb-1 {
  margin-bottom: 0.25rem;
}
.mb-10 {
  margin-bottom: 2.5rem;
}
.mb-2 {
  margin-bottom: 0.5rem;
}
.mb-3 {
  margin-bottom: 0.75rem;
}
.mb-4 {
  margin-bottom: 1rem;
}
.mb-5 {
  margin-bottom: 1.25rem;
}
.mb-6 {
  margin-bottom: 1.5rem;
}
.mb-8 {
  margin-bottom: 2rem;
}
.ml-1 {
  margin-left: 0.25rem;
}
.ml-12 {
  margin-left: 3rem;
}
.ml-2 {
  margin-left: 0.5rem;
}
.ml-4 {
  margin-left: 1rem;
}
.ml-8 {
  margin-left: 2rem;
}
.ml-auto {
  margin-left: auto;
}
.mr-0 {
  margin-right: 0px;
}
.mr-1 {
  margin-right: 0.25rem;
}
.mr-1\\.5 {
  margin-right: 0.375rem;
}
.mr-2 {
  margin-right: 0.5rem;
}
.mr-3 {
  margin-right: 0.75rem;
}
.mr-4 {
  margin-right: 1rem;
}
.mr-6 {
  margin-right: 1.5rem;
}
.mt-1 {
  margin-top: 0.25rem;
}
.mt-10 {
  margin-top: 2.5rem;
}
.mt-2 {
  margin-top: 0.5rem;
}
.mt-3 {
  margin-top: 0.75rem;
}
.mt-4 {
  margin-top: 1rem;
}
.mt-5 {
  margin-top: 1.25rem;
}
.mt-6 {
  margin-top: 1.5rem;
}
.mt-8 {
  margin-top: 2rem;
}
.line-clamp-1 {
  overflow: hidden;
  display: -webkit-box;
  -webkit-box-orient: vertical;
  -webkit-line-clamp: 1;
}
.line-clamp-2 {
  overflow: hidden;
  display: -webkit-box;
  -webkit-box-orient: vertical;
  -webkit-line-clamp: 2;
}
.block {
  display: block;
}
.inline-block {
  display: inline-block;
}
.inline {
  display: inline;
}
.flex {
  display: flex;
}
.inline-flex {
  display: inline-flex;
}
.grid {
  display: grid;
}
.contents {
  display: contents;
}
.hidden {
  display: none;
}
.aspect-\\[16\\/9\\] {
  aspect-ratio: 16/9;
}
.h-0 {
  height: 0px;
}
.h-0\\.5 {
  height: 0.125rem;
}
.h-10 {
  height: 2.5rem;
}
.h-12 {
  height: 3rem;
}
.h-14 {
  height: 3.5rem;
}
.h-2 {
  height: 0.5rem;
}
.h-2\\.5 {
  height: 0.625rem;
}
.h-28 {
  height: 7rem;
}
.h-3 {
  height: 0.75rem;
}
.h-3\\.5 {
  height: 0.875rem;
}
.h-32 {
  height: 8rem;
}
.h-4 {
  height: 1rem;
}
.h-5 {
  height: 1.25rem;
}
.h-6 {
  height: 1.5rem;
}
.h-7 {
  height: 1.75rem;
}
.h-8 {
  height: 2rem;
}
.h-9 {
  height: 2.25rem;
}
.h-\\[100vh\\] {
  height: 100vh;
}
.h-\\[18px\\] {
  height: 18px;
}
.h-\\[22px\\] {
  height: 22px;
}
.h-\\[240px\\] {
  height: 240px;
}
.h-\\[300px\\] {
  height: 300px;
}
.h-\\[32px\\] {
  height: 32px;
}
.h-\\[34px\\] {
  height: 34px;
}
.h-\\[40px\\] {
  height: 40px;
}
.h-\\[45vh\\] {
  height: 45vh;
}
.h-\\[547px\\] {
  height: 547px;
}
.h-\\[70px\\] {
  height: 70px;
}
.h-\\[75\\%\\] {
  height: 75%;
}
.h-\\[88vh\\] {
  height: 88vh;
}
.h-\\[92vh\\] {
  height: 92vh;
}
.h-auto {
  height: auto;
}
.h-full {
  height: 100%;
}
.h-screen {
  height: 100vh;
}
.max-h-\\[450px\\] {
  max-height: 450px;
}
.max-h-\\[80vh\\] {
  max-height: 80vh;
}
.min-h-screen {
  min-height: 100vh;
}
.w-10 {
  width: 2.5rem;
}
.w-12 {
  width: 3rem;
}
.w-14 {
  width: 3.5rem;
}
.w-2 {
  width: 0.5rem;
}
.w-20 {
  width: 5rem;
}
.w-28 {
  width: 7rem;
}
.w-3 {
  width: 0.75rem;
}
.w-3\\.5 {
  width: 0.875rem;
}
.w-4 {
  width: 1rem;
}
.w-5 {
  width: 1.25rem;
}
.w-6 {
  width: 1.5rem;
}
.w-64 {
  width: 16rem;
}
.w-7 {
  width: 1.75rem;
}
.w-8 {
  width: 2rem;
}
.w-9 {
  width: 2.25rem;
}
.w-\\[100px\\] {
  width: 100px;
}
.w-\\[15px\\] {
  width: 15px;
}
.w-\\[18px\\] {
  width: 18px;
}
.w-\\[250px\\] {
  width: 250px;
}
.w-\\[284px\\] {
  width: 284px;
}
.w-\\[300px\\] {
  width: 300px;
}
.w-\\[32px\\] {
  width: 32px;
}
.w-\\[40\\%\\] {
  width: 40%;
}
.w-\\[400px\\] {
  width: 400px;
}
.w-\\[40px\\] {
  width: 40px;
}
.w-\\[42\\.5px\\] {
  width: 42.5px;
}
.w-\\[90\\%\\] {
  width: 90%;
}
.w-\\[94\\%\\] {
  width: 94%;
}
.w-auto {
  width: auto;
}
.w-full {
  width: 100%;
}
.w-max {
  width: -moz-max-content;
  width: max-content;
}
.min-w-fit {
  min-width: -moz-fit-content;
  min-width: fit-content;
}
.max-w-3xl {
  max-width: 48rem;
}
.max-w-5xl {
  max-width: 64rem;
}
.max-w-\\[1150px\\] {
  max-width: 1150px;
}
.max-w-\\[60\\%\\] {
  max-width: 60%;
}
.max-w-full {
  max-width: 100%;
}
.max-w-lg {
  max-width: 32rem;
}
.max-w-md {
  max-width: 28rem;
}
.max-w-none {
  max-width: none;
}
.max-w-sm {
  max-width: 24rem;
}
.flex-1 {
  flex: 1 1 0%;
}
.flex-auto {
  flex: 1 1 auto;
}
.flex-none {
  flex: none;
}
.flex-shrink-0 {
  flex-shrink: 0;
}
.flex-grow {
  flex-grow: 1;
}
.grow {
  flex-grow: 1;
}
.translate-x-0 {
  --tw-translate-x: 0px;
  transform: translate(var(--tw-translate-x), var(--tw-translate-y)) rotate(var(--tw-rotate)) skewX(var(--tw-skew-x)) skewY(var(--tw-skew-y)) scaleX(var(--tw-scale-x)) scaleY(var(--tw-scale-y));
}
.translate-x-1 {
  --tw-translate-x: 0.25rem;
  transform: translate(var(--tw-translate-x), var(--tw-translate-y)) rotate(var(--tw-rotate)) skewX(var(--tw-skew-x)) skewY(var(--tw-skew-y)) scaleX(var(--tw-scale-x)) scaleY(var(--tw-scale-y));
}
.translate-x-5 {
  --tw-translate-x: 1.25rem;
  transform: translate(var(--tw-translate-x), var(--tw-translate-y)) rotate(var(--tw-rotate)) skewX(var(--tw-skew-x)) skewY(var(--tw-skew-y)) scaleX(var(--tw-scale-x)) scaleY(var(--tw-scale-y));
}
.translate-y-0 {
  --tw-translate-y: 0px;
  transform: translate(var(--tw-translate-x), var(--tw-translate-y)) rotate(var(--tw-rotate)) skewX(var(--tw-skew-x)) skewY(var(--tw-skew-y)) scaleX(var(--tw-scale-x)) scaleY(var(--tw-scale-y));
}
.translate-y-4 {
  --tw-translate-y: 1rem;
  transform: translate(var(--tw-translate-x), var(--tw-translate-y)) rotate(var(--tw-rotate)) skewX(var(--tw-skew-x)) skewY(var(--tw-skew-y)) scaleX(var(--tw-scale-x)) scaleY(var(--tw-scale-y));
}
.scale-100 {
  --tw-scale-x: 1;
  --tw-scale-y: 1;
  transform: translate(var(--tw-translate-x), var(--tw-translate-y)) rotate(var(--tw-rotate)) skewX(var(--tw-skew-x)) skewY(var(--tw-skew-y)) scaleX(var(--tw-scale-x)) scaleY(var(--tw-scale-y));
}
.scale-95 {
  --tw-scale-x: .95;
  --tw-scale-y: .95;
  transform: translate(var(--tw-translate-x), var(--tw-translate-y)) rotate(var(--tw-rotate)) skewX(var(--tw-skew-x)) skewY(var(--tw-skew-y)) scaleX(var(--tw-scale-x)) scaleY(var(--tw-scale-y));
}
.scale-x-\\[-1\\] {
  --tw-scale-x: -1;
  transform: translate(var(--tw-translate-x), var(--tw-translate-y)) rotate(var(--tw-rotate)) skewX(var(--tw-skew-x)) skewY(var(--tw-skew-y)) scaleX(var(--tw-scale-x)) scaleY(var(--tw-scale-y));
}
.transform {
  transform: translate(var(--tw-translate-x), var(--tw-translate-y)) rotate(var(--tw-rotate)) skewX(var(--tw-skew-x)) skewY(var(--tw-skew-y)) scaleX(var(--tw-scale-x)) scaleY(var(--tw-scale-y));
}
@keyframes bounce {

  0%, 100% {
    transform: translateY(-25%);
    animation-timing-function: cubic-bezier(0.8,0,1,1);
  }

  50% {
    transform: none;
    animation-timing-function: cubic-bezier(0,0,0.2,1);
  }
}
.animate-bounce {
  animation: bounce 1s infinite;
}
@keyframes spin {

  to {
    transform: rotate(360deg);
  }
}
.animate-spin {
  animation: spin 1s linear infinite;
}
.cursor-pointer {
  cursor: pointer;
}
.select-all {
  -webkit-user-select: all;
     -moz-user-select: all;
          user-select: all;
}
.resize {
  resize: both;
}
.grid-cols-2 {
  grid-template-columns: repeat(2, minmax(0, 1fr));
}
.flex-row {
  flex-direction: row;
}
.flex-col {
  flex-direction: column;
}
.flex-col-reverse {
  flex-direction: column-reverse;
}
.flex-wrap {
  flex-wrap: wrap;
}
.flex-nowrap {
  flex-wrap: nowrap;
}
.place-items-center {
  place-items: center;
}
.content-center {
  align-content: center;
}
.items-start {
  align-items: flex-start;
}
.items-end {
  align-items: flex-end;
}
.items-center {
  align-items: center;
}
.items-baseline {
  align-items: baseline;
}
.items-stretch {
  align-items: stretch;
}
.justify-start {
  justify-content: flex-start;
}
.justify-end {
  justify-content: flex-end;
}
.justify-center {
  justify-content: center;
}
.justify-between {
  justify-content: space-between;
}
.justify-around {
  justify-content: space-around;
}
.justify-items-center {
  justify-items: center;
}
.gap-0 {
  gap: 0px;
}
.gap-1 {
  gap: 0.25rem;
}
.gap-10 {
  gap: 2.5rem;
}
.gap-2 {
  gap: 0.5rem;
}
.gap-2\\.5 {
  gap: 0.625rem;
}
.gap-3 {
  gap: 0.75rem;
}
.gap-4 {
  gap: 1rem;
}
.gap-5 {
  gap: 1.25rem;
}
.gap-6 {
  gap: 1.5rem;
}
.gap-8 {
  gap: 2rem;
}
.gap-x-4 {
  -moz-column-gap: 1rem;
       column-gap: 1rem;
}
.gap-y-2 {
  row-gap: 0.5rem;
}
.space-x-0 > :not([hidden]) ~ :not([hidden]) {
  --tw-space-x-reverse: 0;
  margin-right: calc(0px * var(--tw-space-x-reverse));
  margin-left: calc(0px * calc(1 - var(--tw-space-x-reverse)));
}
.space-x-0\\.5 > :not([hidden]) ~ :not([hidden]) {
  --tw-space-x-reverse: 0;
  margin-right: calc(0.125rem * var(--tw-space-x-reverse));
  margin-left: calc(0.125rem * calc(1 - var(--tw-space-x-reverse)));
}
.space-x-1 > :not([hidden]) ~ :not([hidden]) {
  --tw-space-x-reverse: 0;
  margin-right: calc(0.25rem * var(--tw-space-x-reverse));
  margin-left: calc(0.25rem * calc(1 - var(--tw-space-x-reverse)));
}
.space-x-1\\.5 > :not([hidden]) ~ :not([hidden]) {
  --tw-space-x-reverse: 0;
  margin-right: calc(0.375rem * var(--tw-space-x-reverse));
  margin-left: calc(0.375rem * calc(1 - var(--tw-space-x-reverse)));
}
.space-x-2 > :not([hidden]) ~ :not([hidden]) {
  --tw-space-x-reverse: 0;
  margin-right: calc(0.5rem * var(--tw-space-x-reverse));
  margin-left: calc(0.5rem * calc(1 - var(--tw-space-x-reverse)));
}
.space-x-3 > :not([hidden]) ~ :not([hidden]) {
  --tw-space-x-reverse: 0;
  margin-right: calc(0.75rem * var(--tw-space-x-reverse));
  margin-left: calc(0.75rem * calc(1 - var(--tw-space-x-reverse)));
}
.space-x-4 > :not([hidden]) ~ :not([hidden]) {
  --tw-space-x-reverse: 0;
  margin-right: calc(1rem * var(--tw-space-x-reverse));
  margin-left: calc(1rem * calc(1 - var(--tw-space-x-reverse)));
}
.space-x-6 > :not([hidden]) ~ :not([hidden]) {
  --tw-space-x-reverse: 0;
  margin-right: calc(1.5rem * var(--tw-space-x-reverse));
  margin-left: calc(1.5rem * calc(1 - var(--tw-space-x-reverse)));
}
.space-y-1 > :not([hidden]) ~ :not([hidden]) {
  --tw-space-y-reverse: 0;
  margin-top: calc(0.25rem * calc(1 - var(--tw-space-y-reverse)));
  margin-bottom: calc(0.25rem * var(--tw-space-y-reverse));
}
.space-y-1\\.5 > :not([hidden]) ~ :not([hidden]) {
  --tw-space-y-reverse: 0;
  margin-top: calc(0.375rem * calc(1 - var(--tw-space-y-reverse)));
  margin-bottom: calc(0.375rem * var(--tw-space-y-reverse));
}
.space-y-2 > :not([hidden]) ~ :not([hidden]) {
  --tw-space-y-reverse: 0;
  margin-top: calc(0.5rem * calc(1 - var(--tw-space-y-reverse)));
  margin-bottom: calc(0.5rem * var(--tw-space-y-reverse));
}
.space-y-2\\.5 > :not([hidden]) ~ :not([hidden]) {
  --tw-space-y-reverse: 0;
  margin-top: calc(0.625rem * calc(1 - var(--tw-space-y-reverse)));
  margin-bottom: calc(0.625rem * var(--tw-space-y-reverse));
}
.space-y-3 > :not([hidden]) ~ :not([hidden]) {
  --tw-space-y-reverse: 0;
  margin-top: calc(0.75rem * calc(1 - var(--tw-space-y-reverse)));
  margin-bottom: calc(0.75rem * var(--tw-space-y-reverse));
}
.space-y-4 > :not([hidden]) ~ :not([hidden]) {
  --tw-space-y-reverse: 0;
  margin-top: calc(1rem * calc(1 - var(--tw-space-y-reverse)));
  margin-bottom: calc(1rem * var(--tw-space-y-reverse));
}
.space-y-5 > :not([hidden]) ~ :not([hidden]) {
  --tw-space-y-reverse: 0;
  margin-top: calc(1.25rem * calc(1 - var(--tw-space-y-reverse)));
  margin-bottom: calc(1.25rem * var(--tw-space-y-reverse));
}
.divide-y > :not([hidden]) ~ :not([hidden]) {
  --tw-divide-y-reverse: 0;
  border-top-width: calc(1px * calc(1 - var(--tw-divide-y-reverse)));
  border-bottom-width: calc(1px * var(--tw-divide-y-reverse));
}
.place-self-end {
  place-self: end;
}
.overflow-auto {
  overflow: auto;
}
.overflow-hidden {
  overflow: hidden;
}
.overflow-x-auto {
  overflow-x: auto;
}
.overflow-y-auto {
  overflow-y: auto;
}
.overflow-x-hidden {
  overflow-x: hidden;
}
.overflow-y-hidden {
  overflow-y: hidden;
}
.overflow-y-scroll {
  overflow-y: scroll;
}
.truncate {
  overflow: hidden;
  text-overflow: ellipsis;
  white-space: nowrap;
}
.whitespace-nowrap {
  white-space: nowrap;
}
.break-words {
  overflow-wrap: break-word;
}
.break-all {
  word-break: break-all;
}
.\\!rounded-lg {
  border-radius: 0.5rem !important;
}
.\\!rounded-none {
  border-radius: 0px !important;
}
.\\!rounded-xl {
  border-radius: 0.75rem !important;
}
.rounded {
  border-radius: 0.25rem;
}
.rounded-2xl {
  border-radius: 1rem;
}
.rounded-3xl {
  border-radius: 1.5rem;
}
.rounded-full {
  border-radius: 9999px;
}
.rounded-lg {
  border-radius: 0.5rem;
}
.rounded-md {
  border-radius: 0.375rem;
}
.rounded-none {
  border-radius: 0px;
}
.rounded-xl {
  border-radius: 0.75rem;
}
.rounded-l-xl {
  border-top-left-radius: 0.75rem;
  border-bottom-left-radius: 0.75rem;
}
.rounded-r-lg {
  border-top-right-radius: 0.5rem;
  border-bottom-right-radius: 0.5rem;
}
.\\!rounded-bl-3xl {
  border-bottom-left-radius: 1.5rem !important;
}
.\\!rounded-br-lg {
  border-bottom-right-radius: 0.5rem !important;
}
.\\!rounded-br-xl {
  border-bottom-right-radius: 0.75rem !important;
}
.\\!rounded-tl-3xl {
  border-top-left-radius: 1.5rem !important;
}
.\\!rounded-tr-lg {
  border-top-right-radius: 0.5rem !important;
}
.\\!rounded-tr-xl {
  border-top-right-radius: 0.75rem !important;
}
.border {
  border-width: 1px;
}
.border-0 {
  border-width: 0px;
}
.border-2 {
  border-width: 2px;
}
.border-4 {
  border-width: 4px;
}
.border-\\[2px\\] {
  border-width: 2px;
}
.border-\\[3px\\] {
  border-width: 3px;
}
.\\!border-r-0 {
  border-right-width: 0px !important;
}
.border-b {
  border-bottom-width: 1px;
}
.border-b-2 {
  border-bottom-width: 2px;
}
.border-l-2 {
  border-left-width: 2px;
}
.border-l-4 {
  border-left-width: 4px;
}
.border-r-0 {
  border-right-width: 0px;
}
.border-r-2 {
  border-right-width: 2px;
}
.border-t {
  border-top-width: 1px;
}
.border-t-2 {
  border-top-width: 2px;
}
.border-solid {
  border-style: solid;
}
.border-dashed {
  border-style: dashed;
}
.border-none {
  border-style: none;
}
.\\!border-red-500 {
  --tw-border-opacity: 1 !important;
  border-color: rgb(239 68 68 / var(--tw-border-opacity)) !important;
}
.border-\\[\\#57B8FF\\] {
  --tw-border-opacity: 1;
  border-color: rgb(87 184 255 / var(--tw-border-opacity));
}
.border-\\[rgba\\(190\\2c _253\\2c _103\\2c _1\\.22\\)\\] {
  border-color: rgba(190, 253, 103, 1.22);
}
.border-black {
  --tw-border-opacity: 1;
  border-color: rgb(0 0 0 / var(--tw-border-opacity));
}
.border-blue-200 {
  --tw-border-opacity: 1;
  border-color: rgb(191 219 254 / var(--tw-border-opacity));
}
.border-blue-500 {
  --tw-border-opacity: 1;
  border-color: rgb(59 130 246 / var(--tw-border-opacity));
}
.border-blue-700 {
  --tw-border-opacity: 1;
  border-color: rgb(29 78 216 / var(--tw-border-opacity));
}
.border-gray-100 {
  --tw-border-opacity: 1;
  border-color: rgb(243 244 246 / var(--tw-border-opacity));
}
.border-gray-200 {
  --tw-border-opacity: 1;
  border-color: rgb(229 231 235 / var(--tw-border-opacity));
}
.border-gray-300 {
  --tw-border-opacity: 1;
  border-color: rgb(209 213 219 / var(--tw-border-opacity));
}
.border-gray-500 {
  --tw-border-opacity: 1;
  border-color: rgb(107 114 128 / var(--tw-border-opacity));
}
.border-gray-600 {
  --tw-border-opacity: 1;
  border-color: rgb(75 85 99 / var(--tw-border-opacity));
}
.border-gray-700 {
  --tw-border-opacity: 1;
  border-color: rgb(55 65 81 / var(--tw-border-opacity));
}
.border-gray-800 {
  --tw-border-opacity: 1;
  border-color: rgb(31 41 55 / var(--tw-border-opacity));
}
.border-green-200 {
  --tw-border-opacity: 1;
  border-color: rgb(187 247 208 / var(--tw-border-opacity));
}
.border-green-600 {
  --tw-border-opacity: 1;
  border-color: rgb(22 163 74 / var(--tw-border-opacity));
}
.border-green-700 {
  --tw-border-opacity: 1;
  border-color: rgb(21 128 61 / var(--tw-border-opacity));
}
.border-indigo-900 {
  --tw-border-opacity: 1;
  border-color: rgb(49 46 129 / var(--tw-border-opacity));
}
.border-pink-200 {
  --tw-border-opacity: 1;
  border-color: rgb(251 207 232 / var(--tw-border-opacity));
}
.border-pink-600 {
  --tw-border-opacity: 1;
  border-color: rgb(219 39 119 / var(--tw-border-opacity));
}
.border-pink-700 {
  --tw-border-opacity: 1;
  border-color: rgb(190 24 93 / var(--tw-border-opacity));
}
.border-red-200 {
  --tw-border-opacity: 1;
  border-color: rgb(254 202 202 / var(--tw-border-opacity));
}
.border-red-500 {
  --tw-border-opacity: 1;
  border-color: rgb(239 68 68 / var(--tw-border-opacity));
}
.border-red-600 {
  --tw-border-opacity: 1;
  border-color: rgb(220 38 38 / var(--tw-border-opacity));
}
.border-red-700 {
  --tw-border-opacity: 1;
  border-color: rgb(185 28 28 / var(--tw-border-opacity));
}
.border-transparent {
  border-color: transparent;
}
.border-white {
  --tw-border-opacity: 1;
  border-color: rgb(255 255 255 / var(--tw-border-opacity));
}
.border-yellow-200 {
  --tw-border-opacity: 1;
  border-color: rgb(254 240 138 / var(--tw-border-opacity));
}
.border-yellow-500 {
  --tw-border-opacity: 1;
  border-color: rgb(234 179 8 / var(--tw-border-opacity));
}
.border-yellow-600 {
  --tw-border-opacity: 1;
  border-color: rgb(202 138 4 / var(--tw-border-opacity));
}
.border-yellow-700 {
  --tw-border-opacity: 1;
  border-color: rgb(161 98 7 / var(--tw-border-opacity));
}
.border-t-blue-600 {
  --tw-border-opacity: 1;
  border-top-color: rgb(37 99 235 / var(--tw-border-opacity));
}
.border-t-gray-600 {
  --tw-border-opacity: 1;
  border-top-color: rgb(75 85 99 / var(--tw-border-opacity));
}
.border-t-green-600 {
  --tw-border-opacity: 1;
  border-top-color: rgb(22 163 74 / var(--tw-border-opacity));
}
.border-t-pink-600 {
  --tw-border-opacity: 1;
  border-top-color: rgb(219 39 119 / var(--tw-border-opacity));
}
.border-t-red-600 {
  --tw-border-opacity: 1;
  border-top-color: rgb(220 38 38 / var(--tw-border-opacity));
}
.border-t-yellow-600 {
  --tw-border-opacity: 1;
  border-top-color: rgb(202 138 4 / var(--tw-border-opacity));
}
.border-opacity-50 {
  --tw-border-opacity: 0.5;
}
.\\!bg-gray-300 {
  --tw-bg-opacity: 1 !important;
  background-color: rgb(209 213 219 / var(--tw-bg-opacity)) !important;
}
.\\!bg-green-500 {
  --tw-bg-opacity: 1 !important;
  background-color: rgb(34 197 94 / var(--tw-bg-opacity)) !important;
}
.\\!bg-red-500 {
  --tw-bg-opacity: 1 !important;
  background-color: rgb(239 68 68 / var(--tw-bg-opacity)) !important;
}
.\\!bg-transparent {
  background-color: transparent !important;
}
.\\!bg-white {
  --tw-bg-opacity: 1 !important;
  background-color: rgb(255 255 255 / var(--tw-bg-opacity)) !important;
}
.\\!bg-yellow-500 {
  --tw-bg-opacity: 1 !important;
  background-color: rgb(234 179 8 / var(--tw-bg-opacity)) !important;
}
.bg-\\[\\#57B8FF\\] {
  --tw-bg-opacity: 1;
  background-color: rgb(87 184 255 / var(--tw-bg-opacity));
}
.bg-\\[\\#F1F1F2\\] {
  --tw-bg-opacity: 1;
  background-color: rgb(241 241 242 / var(--tw-bg-opacity));
}
.bg-\\[\\#F2F4F7\\] {
  --tw-bg-opacity: 1;
  background-color: rgb(242 244 247 / var(--tw-bg-opacity));
}
.bg-\\[\\#d9dff1f6\\] {
  background-color: #d9dff1f6;
}
.bg-black {
  --tw-bg-opacity: 1;
  background-color: rgb(0 0 0 / var(--tw-bg-opacity));
}
.bg-blue-100 {
  --tw-bg-opacity: 1;
  background-color: rgb(219 234 254 / var(--tw-bg-opacity));
}
.bg-blue-300 {
  --tw-bg-opacity: 1;
  background-color: rgb(147 197 253 / var(--tw-bg-opacity));
}
.bg-blue-400 {
  --tw-bg-opacity: 1;
  background-color: rgb(96 165 250 / var(--tw-bg-opacity));
}
.bg-blue-500 {
  --tw-bg-opacity: 1;
  background-color: rgb(59 130 246 / var(--tw-bg-opacity));
}
.bg-blue-600 {
  --tw-bg-opacity: 1;
  background-color: rgb(37 99 235 / var(--tw-bg-opacity));
}
.bg-blue-700 {
  --tw-bg-opacity: 1;
  background-color: rgb(29 78 216 / var(--tw-bg-opacity));
}
.bg-blue-900 {
  --tw-bg-opacity: 1;
  background-color: rgb(30 58 138 / var(--tw-bg-opacity));
}
.bg-cyan-100 {
  --tw-bg-opacity: 1;
  background-color: rgb(207 250 254 / var(--tw-bg-opacity));
}
.bg-cyan-200 {
  --tw-bg-opacity: 1;
  background-color: rgb(165 243 252 / var(--tw-bg-opacity));
}
.bg-gray-100 {
  --tw-bg-opacity: 1;
  background-color: rgb(243 244 246 / var(--tw-bg-opacity));
}
.bg-gray-200 {
  --tw-bg-opacity: 1;
  background-color: rgb(229 231 235 / var(--tw-bg-opacity));
}
.bg-gray-300 {
  --tw-bg-opacity: 1;
  background-color: rgb(209 213 219 / var(--tw-bg-opacity));
}
.bg-gray-300\\/25 {
  background-color: rgb(209 213 219 / 0.25);
}
.bg-gray-400 {
  --tw-bg-opacity: 1;
  background-color: rgb(156 163 175 / var(--tw-bg-opacity));
}
.bg-gray-50 {
  --tw-bg-opacity: 1;
  background-color: rgb(249 250 251 / var(--tw-bg-opacity));
}
.bg-gray-500 {
  --tw-bg-opacity: 1;
  background-color: rgb(107 114 128 / var(--tw-bg-opacity));
}
.bg-green-500 {
  --tw-bg-opacity: 1;
  background-color: rgb(34 197 94 / var(--tw-bg-opacity));
}
.bg-pink-700 {
  --tw-bg-opacity: 1;
  background-color: rgb(190 24 93 / var(--tw-bg-opacity));
}
.bg-primary {
  --tw-bg-opacity: 1;
  background-color: rgb(241 241 242 / var(--tw-bg-opacity));
}
.bg-red-50 {
  --tw-bg-opacity: 1;
  background-color: rgb(254 242 242 / var(--tw-bg-opacity));
}
.bg-red-500 {
  --tw-bg-opacity: 1;
  background-color: rgb(239 68 68 / var(--tw-bg-opacity));
}
.bg-red-700 {
  --tw-bg-opacity: 1;
  background-color: rgb(185 28 28 / var(--tw-bg-opacity));
}
.bg-slate-900 {
  --tw-bg-opacity: 1;
  background-color: rgb(15 23 42 / var(--tw-bg-opacity));
}
.bg-transparent {
  background-color: transparent;
}
.bg-white {
  --tw-bg-opacity: 1;
  background-color: rgb(255 255 255 / var(--tw-bg-opacity));
}
.bg-yellow-100 {
  --tw-bg-opacity: 1;
  background-color: rgb(254 249 195 / var(--tw-bg-opacity));
}
.bg-yellow-50 {
  --tw-bg-opacity: 1;
  background-color: rgb(254 252 232 / var(--tw-bg-opacity));
}
.bg-yellow-500 {
  --tw-bg-opacity: 1;
  background-color: rgb(234 179 8 / var(--tw-bg-opacity));
}
.\\!bg-opacity-20 {
  --tw-bg-opacity: 0.2 !important;
}
.bg-opacity-100 {
  --tw-bg-opacity: 1;
}
.bg-opacity-20 {
  --tw-bg-opacity: 0.2;
}
.bg-opacity-75 {
  --tw-bg-opacity: 0.75;
}
.bg-gradient-to-b {
  background-image: linear-gradient(to bottom, var(--tw-gradient-stops));
}
.bg-gradient-to-r {
  background-image: linear-gradient(to right, var(--tw-gradient-stops));
}
.from-\\[rgba\\(155\\2c 251\\2c 0\\2c 1\\)\\] {
  --tw-gradient-from: rgba(155,251,0,1) var(--tw-gradient-from-position);
  --tw-gradient-to: rgba(155, 251, 0, 0) var(--tw-gradient-to-position);
  --tw-gradient-stops: var(--tw-gradient-from), var(--tw-gradient-to);
}
.from-transparent {
  --tw-gradient-from: transparent var(--tw-gradient-from-position);
  --tw-gradient-to: rgb(0 0 0 / 0) var(--tw-gradient-to-position);
  --tw-gradient-stops: var(--tw-gradient-from), var(--tw-gradient-to);
}
.to-\\[rgba\\(220\\2c 255\\2c 146\\2c 1\\)\\] {
  --tw-gradient-to: rgba(220,255,146,1) var(--tw-gradient-to-position);
}
.to-gray-800 {
  --tw-gradient-to: #1f2937 var(--tw-gradient-to-position);
}
.to-pink-600 {
  --tw-gradient-to: #db2777 var(--tw-gradient-to-position);
}
.bg-clip-text {
  -webkit-background-clip: text;
          background-clip: text;
}
.fill-black {
  fill: #000;
}
.fill-white {
  fill: #fff;
}
.object-contain {
  -o-object-fit: contain;
     object-fit: contain;
}
.object-cover {
  -o-object-fit: cover;
     object-fit: cover;
}
.object-fill {
  -o-object-fit: fill;
     object-fit: fill;
}
.object-center {
  -o-object-position: center;
     object-position: center;
}
.\\!p-1 {
  padding: 0.25rem !important;
}
.\\!p-1\\.5 {
  padding: 0.375rem !important;
}
.p-1 {
  padding: 0.25rem;
}
.p-1\\.5 {
  padding: 0.375rem;
}
.p-10 {
  padding: 2.5rem;
}
.p-14 {
  padding: 3.5rem;
}
.p-2 {
  padding: 0.5rem;
}
.p-2\\.5 {
  padding: 0.625rem;
}
.p-3 {
  padding: 0.75rem;
}
.p-4 {
  padding: 1rem;
}
.p-5 {
  padding: 1.25rem;
}
.p-8 {
  padding: 2rem;
}
.\\!px-1 {
  padding-left: 0.25rem !important;
  padding-right: 0.25rem !important;
}
.\\!px-1\\.5 {
  padding-left: 0.375rem !important;
  padding-right: 0.375rem !important;
}
.\\!px-3 {
  padding-left: 0.75rem !important;
  padding-right: 0.75rem !important;
}
.\\!py-3 {
  padding-top: 0.75rem !important;
  padding-bottom: 0.75rem !important;
}
.px-0 {
  padding-left: 0px;
  padding-right: 0px;
}
.px-0\\.5 {
  padding-left: 0.125rem;
  padding-right: 0.125rem;
}
.px-1 {
  padding-left: 0.25rem;
  padding-right: 0.25rem;
}
.px-2 {
  padding-left: 0.5rem;
  padding-right: 0.5rem;
}
.px-3 {
  padding-left: 0.75rem;
  padding-right: 0.75rem;
}
.px-4 {
  padding-left: 1rem;
  padding-right: 1rem;
}
.px-5 {
  padding-left: 1.25rem;
  padding-right: 1.25rem;
}
.px-6 {
  padding-left: 1.5rem;
  padding-right: 1.5rem;
}
.px-7 {
  padding-left: 1.75rem;
  padding-right: 1.75rem;
}
.px-8 {
  padding-left: 2rem;
  padding-right: 2rem;
}
.px-\\[5px\\] {
  padding-left: 5px;
  padding-right: 5px;
}
.py-0 {
  padding-top: 0px;
  padding-bottom: 0px;
}
.py-0\\.5 {
  padding-top: 0.125rem;
  padding-bottom: 0.125rem;
}
.py-1 {
  padding-top: 0.25rem;
  padding-bottom: 0.25rem;
}
.py-1\\.5 {
  padding-top: 0.375rem;
  padding-bottom: 0.375rem;
}
.py-10 {
  padding-top: 2.5rem;
  padding-bottom: 2.5rem;
}
.py-2 {
  padding-top: 0.5rem;
  padding-bottom: 0.5rem;
}
.py-3 {
  padding-top: 0.75rem;
  padding-bottom: 0.75rem;
}
.py-3\\.5 {
  padding-top: 0.875rem;
  padding-bottom: 0.875rem;
}
.py-4 {
  padding-top: 1rem;
  padding-bottom: 1rem;
}
.py-\\[2px\\] {
  padding-top: 2px;
  padding-bottom: 2px;
}
.pb-0 {
  padding-bottom: 0px;
}
.pb-1 {
  padding-bottom: 0.25rem;
}
.pb-10 {
  padding-bottom: 2.5rem;
}
.pb-2 {
  padding-bottom: 0.5rem;
}
.pb-3 {
  padding-bottom: 0.75rem;
}
.pb-4 {
  padding-bottom: 1rem;
}
.pb-5 {
  padding-bottom: 1.25rem;
}
.pb-6 {
  padding-bottom: 1.5rem;
}
.pb-8 {
  padding-bottom: 2rem;
}
.pb-\\[131\\%\\] {
  padding-bottom: 131%;
}
.pl-1 {
  padding-left: 0.25rem;
}
.pl-1\\.5 {
  padding-left: 0.375rem;
}
.pl-2 {
  padding-left: 0.5rem;
}
.pl-3 {
  padding-left: 0.75rem;
}
.pl-4 {
  padding-left: 1rem;
}
.pr-0 {
  padding-right: 0px;
}
.pr-0\\.5 {
  padding-right: 0.125rem;
}
.pr-1 {
  padding-right: 0.25rem;
}
.pr-2 {
  padding-right: 0.5rem;
}
.pr-3 {
  padding-right: 0.75rem;
}
.pr-4 {
  padding-right: 1rem;
}
.pt-0 {
  padding-top: 0px;
}
.pt-0\\.5 {
  padding-top: 0.125rem;
}
.pt-1 {
  padding-top: 0.25rem;
}
.pt-10 {
  padding-top: 2.5rem;
}
.pt-2 {
  padding-top: 0.5rem;
}
.pt-3 {
  padding-top: 0.75rem;
}
.pt-4 {
  padding-top: 1rem;
}
.pt-5 {
  padding-top: 1.25rem;
}
.pt-6 {
  padding-top: 1.5rem;
}
.text-left {
  text-align: left;
}
.text-center {
  text-align: center;
}
.text-right {
  text-align: right;
}
.align-bottom {
  vertical-align: bottom;
}
.font-\\[\\'Inter\\'\\] {
  font-family: 'Inter';
}
.\\!text-xs {
  font-size: 0.75rem !important;
  line-height: 1rem !important;
}
.text-2xl {
  font-size: 1.5rem;
  line-height: 2rem;
}
.text-3xl {
  font-size: 1.875rem;
  line-height: 2.25rem;
}
.text-6xl {
  font-size: 3.75rem;
  line-height: 1;
}
.text-7xl {
  font-size: 4.5rem;
  line-height: 1;
}
.text-\\[10px\\] {
  font-size: 10px;
}
.text-base {
  font-size: 1rem;
  line-height: 1.5rem;
}
.text-lg {
  font-size: 1.125rem;
  line-height: 1.75rem;
}
.text-sm {
  font-size: 0.875rem;
  line-height: 1.25rem;
}
.text-xl {
  font-size: 1.25rem;
  line-height: 1.75rem;
}
.text-xs {
  font-size: 0.75rem;
  line-height: 1rem;
}
.font-bold {
  font-weight: 700;
}
.font-medium {
  font-weight: 500;
}
.font-semibold {
  font-weight: 600;
}
.uppercase {
  text-transform: uppercase;
}
.lowercase {
  text-transform: lowercase;
}
.capitalize {
  text-transform: capitalize;
}
.\\!leading-6 {
  line-height: 1.5rem !important;
}
.leading-10 {
  line-height: 2.5rem;
}
.leading-6 {
  line-height: 1.5rem;
}
.leading-\\[22px\\] {
  line-height: 22px;
}
.tracking-wide {
  letter-spacing: 0.025em;
}
.\\!text-black {
  --tw-text-opacity: 1 !important;
  color: rgb(0 0 0 / var(--tw-text-opacity)) !important;
}
.\\!text-red-500 {
  --tw-text-opacity: 1 !important;
  color: rgb(239 68 68 / var(--tw-text-opacity)) !important;
}
.\\!text-white {
  --tw-text-opacity: 1 !important;
  color: rgb(255 255 255 / var(--tw-text-opacity)) !important;
}
.text-\\[\\#000000\\] {
  --tw-text-opacity: 1;
  color: rgb(0 0 0 / var(--tw-text-opacity));
}
.text-\\[\\#57B8FF\\] {
  --tw-text-opacity: 1;
  color: rgb(87 184 255 / var(--tw-text-opacity));
}
.text-black {
  --tw-text-opacity: 1;
  color: rgb(0 0 0 / var(--tw-text-opacity));
}
.text-blue-500 {
  --tw-text-opacity: 1;
  color: rgb(59 130 246 / var(--tw-text-opacity));
}
.text-blue-700 {
  --tw-text-opacity: 1;
  color: rgb(29 78 216 / var(--tw-text-opacity));
}
.text-gray-300 {
  --tw-text-opacity: 1;
  color: rgb(209 213 219 / var(--tw-text-opacity));
}
.text-gray-400 {
  --tw-text-opacity: 1;
  color: rgb(156 163 175 / var(--tw-text-opacity));
}
.text-gray-500 {
  --tw-text-opacity: 1;
  color: rgb(107 114 128 / var(--tw-text-opacity));
}
.text-gray-600 {
  --tw-text-opacity: 1;
  color: rgb(75 85 99 / var(--tw-text-opacity));
}
.text-gray-700 {
  --tw-text-opacity: 1;
  color: rgb(55 65 81 / var(--tw-text-opacity));
}
.text-gray-800 {
  --tw-text-opacity: 1;
  color: rgb(31 41 55 / var(--tw-text-opacity));
}
.text-green-500 {
  --tw-text-opacity: 1;
  color: rgb(34 197 94 / var(--tw-text-opacity));
}
.text-green-700 {
  --tw-text-opacity: 1;
  color: rgb(21 128 61 / var(--tw-text-opacity));
}
.text-indigo-500 {
  --tw-text-opacity: 1;
  color: rgb(99 102 241 / var(--tw-text-opacity));
}
.text-pink-700 {
  --tw-text-opacity: 1;
  color: rgb(190 24 93 / var(--tw-text-opacity));
}
.text-primary {
  --tw-text-opacity: 1;
  color: rgb(22 24 35 / var(--tw-text-opacity));
}
.text-red-400 {
  --tw-text-opacity: 1;
  color: rgb(248 113 113 / var(--tw-text-opacity));
}
.text-red-500 {
  --tw-text-opacity: 1;
  color: rgb(239 68 68 / var(--tw-text-opacity));
}
.text-red-700 {
  --tw-text-opacity: 1;
  color: rgb(185 28 28 / var(--tw-text-opacity));
}
.text-red-800 {
  --tw-text-opacity: 1;
  color: rgb(153 27 27 / var(--tw-text-opacity));
}
.text-white {
  --tw-text-opacity: 1;
  color: rgb(255 255 255 / var(--tw-text-opacity));
}
.text-yellow-700 {
  --tw-text-opacity: 1;
  color: rgb(161 98 7 / var(--tw-text-opacity));
}
.text-yellow-800 {
  --tw-text-opacity: 1;
  color: rgb(133 77 14 / var(--tw-text-opacity));
}
.text-zinc-500 {
  --tw-text-opacity: 1;
  color: rgb(113 113 122 / var(--tw-text-opacity));
}
.placeholder-red-500::-moz-placeholder {
  --tw-placeholder-opacity: 1;
  color: rgb(239 68 68 / var(--tw-placeholder-opacity));
}
.placeholder-red-500::placeholder {
  --tw-placeholder-opacity: 1;
  color: rgb(239 68 68 / var(--tw-placeholder-opacity));
}
.opacity-0 {
  opacity: 0;
}
.opacity-100 {
  opacity: 1;
}
.opacity-50 {
  opacity: 0.5;
}
.opacity-60 {
  opacity: 0.6;
}
.opacity-70 {
  opacity: 0.7;
}
.\\!shadow-none {
  --tw-shadow: 0 0 #0000 !important;
  --tw-shadow-colored: 0 0 #0000 !important;
  box-shadow: var(--tw-ring-offset-shadow, 0 0 #0000), var(--tw-ring-shadow, 0 0 #0000), var(--tw-shadow) !important;
}
.shadow {
  --tw-shadow: 0 1px 3px 0 rgb(0 0 0 / 0.1), 0 1px 2px -1px rgb(0 0 0 / 0.1);
  --tw-shadow-colored: 0 1px 3px 0 var(--tw-shadow-color), 0 1px 2px -1px var(--tw-shadow-color);
  box-shadow: var(--tw-ring-offset-shadow, 0 0 #0000), var(--tw-ring-shadow, 0 0 #0000), var(--tw-shadow);
}
.shadow-inner {
  --tw-shadow: inset 0 2px 4px 0 rgb(0 0 0 / 0.05);
  --tw-shadow-colored: inset 0 2px 4px 0 var(--tw-shadow-color);
  box-shadow: var(--tw-ring-offset-shadow, 0 0 #0000), var(--tw-ring-shadow, 0 0 #0000), var(--tw-shadow);
}
.shadow-lg {
  --tw-shadow: 0 10px 15px -3px rgb(0 0 0 / 0.1), 0 4px 6px -4px rgb(0 0 0 / 0.1);
  --tw-shadow-colored: 0 10px 15px -3px var(--tw-shadow-color), 0 4px 6px -4px var(--tw-shadow-color);
  box-shadow: var(--tw-ring-offset-shadow, 0 0 #0000), var(--tw-ring-shadow, 0 0 #0000), var(--tw-shadow);
}
.shadow-md {
  --tw-shadow: 0 4px 6px -1px rgb(0 0 0 / 0.1), 0 2px 4px -2px rgb(0 0 0 / 0.1);
  --tw-shadow-colored: 0 4px 6px -1px var(--tw-shadow-color), 0 2px 4px -2px var(--tw-shadow-color);
  box-shadow: var(--tw-ring-offset-shadow, 0 0 #0000), var(--tw-ring-shadow, 0 0 #0000), var(--tw-shadow);
}
.shadow-sm {
  --tw-shadow: 0 1px 2px 0 rgb(0 0 0 / 0.05);
  --tw-shadow-colored: 0 1px 2px 0 var(--tw-shadow-color);
  box-shadow: var(--tw-ring-offset-shadow, 0 0 #0000), var(--tw-ring-shadow, 0 0 #0000), var(--tw-shadow);
}
.shadow-xl {
  --tw-shadow: 0 20px 25px -5px rgb(0 0 0 / 0.1), 0 8px 10px -6px rgb(0 0 0 / 0.1);
  --tw-shadow-colored: 0 20px 25px -5px var(--tw-shadow-color), 0 8px 10px -6px var(--tw-shadow-color);
  box-shadow: var(--tw-ring-offset-shadow, 0 0 #0000), var(--tw-ring-shadow, 0 0 #0000), var(--tw-shadow);
}
.outline-none {
  outline: 2px solid transparent;
  outline-offset: 2px;
}
.\\!outline {
  outline-style: solid !important;
}
.outline {
  outline-style: solid;
}
.ring-0 {
  --tw-ring-offset-shadow: var(--tw-ring-inset) 0 0 0 var(--tw-ring-offset-width) var(--tw-ring-offset-color);
  --tw-ring-shadow: var(--tw-ring-inset) 0 0 0 calc(0px + var(--tw-ring-offset-width)) var(--tw-ring-color);
  box-shadow: var(--tw-ring-offset-shadow), var(--tw-ring-shadow), var(--tw-shadow, 0 0 #0000);
}
.ring-blue-400 {
  --tw-ring-opacity: 1;
  --tw-ring-color: rgb(96 165 250 / var(--tw-ring-opacity));
}
.ring-gray-400 {
  --tw-ring-opacity: 1;
  --tw-ring-color: rgb(156 163 175 / var(--tw-ring-opacity));
}
.ring-green-400 {
  --tw-ring-opacity: 1;
  --tw-ring-color: rgb(74 222 128 / var(--tw-ring-opacity));
}
.ring-pink-400 {
  --tw-ring-opacity: 1;
  --tw-ring-color: rgb(244 114 182 / var(--tw-ring-opacity));
}
.ring-red-400 {
  --tw-ring-opacity: 1;
  --tw-ring-color: rgb(248 113 113 / var(--tw-ring-opacity));
}
.ring-yellow-400 {
  --tw-ring-opacity: 1;
  --tw-ring-color: rgb(250 204 21 / var(--tw-ring-opacity));
}
.blur {
  --tw-blur: blur(8px);
  filter: var(--tw-blur) var(--tw-brightness) var(--tw-contrast) var(--tw-grayscale) var(--tw-hue-rotate) var(--tw-invert) var(--tw-saturate) var(--tw-sepia) var(--tw-drop-shadow);
}
.drop-shadow-lg {
  --tw-drop-shadow: drop-shadow(0 10px 8px rgb(0 0 0 / 0.04)) drop-shadow(0 4px 3px rgb(0 0 0 / 0.1));
  filter: var(--tw-blur) var(--tw-brightness) var(--tw-contrast) var(--tw-grayscale) var(--tw-hue-rotate) var(--tw-invert) var(--tw-saturate) var(--tw-sepia) var(--tw-drop-shadow);
}
.drop-shadow-xl {
  --tw-drop-shadow: drop-shadow(0 20px 13px rgb(0 0 0 / 0.03)) drop-shadow(0 8px 5px rgb(0 0 0 / 0.08));
  filter: var(--tw-blur) var(--tw-brightness) var(--tw-contrast) var(--tw-grayscale) var(--tw-hue-rotate) var(--tw-invert) var(--tw-saturate) var(--tw-sepia) var(--tw-drop-shadow);
}
.filter {
  filter: var(--tw-blur) var(--tw-brightness) var(--tw-contrast) var(--tw-grayscale) var(--tw-hue-rotate) var(--tw-invert) var(--tw-saturate) var(--tw-sepia) var(--tw-drop-shadow);
}
.transition {
  transition-property: color, background-color, border-color, text-decoration-color, fill, stroke, opacity, box-shadow, transform, filter, -webkit-backdrop-filter;
  transition-property: color, background-color, border-color, text-decoration-color, fill, stroke, opacity, box-shadow, transform, filter, backdrop-filter;
  transition-property: color, background-color, border-color, text-decoration-color, fill, stroke, opacity, box-shadow, transform, filter, backdrop-filter, -webkit-backdrop-filter;
  transition-timing-function: cubic-bezier(0.4, 0, 0.2, 1);
  transition-duration: 150ms;
}
.transition-all {
  transition-property: all;
  transition-timing-function: cubic-bezier(0.4, 0, 0.2, 1);
  transition-duration: 150ms;
}
.transition-colors {
  transition-property: color, background-color, border-color, text-decoration-color, fill, stroke;
  transition-timing-function: cubic-bezier(0.4, 0, 0.2, 1);
  transition-duration: 150ms;
}
.transition-opacity {
  transition-property: opacity;
  transition-timing-function: cubic-bezier(0.4, 0, 0.2, 1);
  transition-duration: 150ms;
}
.duration-100 {
  transition-duration: 100ms;
}
.duration-200 {
  transition-duration: 200ms;
}
.duration-500 {
  transition-duration: 500ms;
}
.duration-75 {
  transition-duration: 75ms;
}
.ease-in {
  transition-timing-function: cubic-bezier(0.4, 0, 1, 1);
}
.ease-in-out {
  transition-timing-function: cubic-bezier(0.4, 0, 0.2, 1);
}
.ease-out {
  transition-timing-function: cubic-bezier(0, 0, 0.2, 1);
}
@media (min-width: 768px) {

  .md\\:container {
    width: 100%;
  }

  @media (min-width: 640px) {

    .md\\:container {
      max-width: 640px;
    }
  }

  @media (min-width: 768px) {

    .md\\:container {
      max-width: 768px;
    }
  }

  @media (min-width: 1024px) {

    .md\\:container {
      max-width: 1024px;
    }
  }

  @media (min-width: 1280px) {

    .md\\:container {
      max-width: 1280px;
    }
  }

  @media (min-width: 1536px) {

    .md\\:container {
      max-width: 1536px;
    }
  }
}
.placeholder\\:text-gray-500::-moz-placeholder {
  --tw-text-opacity: 1;
  color: rgb(107 114 128 / var(--tw-text-opacity));
}
.placeholder\\:text-gray-500::placeholder {
  --tw-text-opacity: 1;
  color: rgb(107 114 128 / var(--tw-text-opacity));
}
.focus-within\\:ring-0:focus-within {
  --tw-ring-offset-shadow: var(--tw-ring-inset) 0 0 0 var(--tw-ring-offset-width) var(--tw-ring-offset-color);
  --tw-ring-shadow: var(--tw-ring-inset) 0 0 0 calc(0px + var(--tw-ring-offset-width)) var(--tw-ring-color);
  box-shadow: var(--tw-ring-offset-shadow), var(--tw-ring-shadow), var(--tw-shadow, 0 0 #0000);
}
.focus-within\\:ring-1:focus-within {
  --tw-ring-offset-shadow: var(--tw-ring-inset) 0 0 0 var(--tw-ring-offset-width) var(--tw-ring-offset-color);
  --tw-ring-shadow: var(--tw-ring-inset) 0 0 0 calc(1px + var(--tw-ring-offset-width)) var(--tw-ring-color);
  box-shadow: var(--tw-ring-offset-shadow), var(--tw-ring-shadow), var(--tw-shadow, 0 0 #0000);
}
.hover\\:border-red-300:hover {
  --tw-border-opacity: 1;
  border-color: rgb(252 165 165 / var(--tw-border-opacity));
}
.hover\\:bg-\\[\\#57B8FF\\]:hover {
  --tw-bg-opacity: 1;
  background-color: rgb(87 184 255 / var(--tw-bg-opacity));
}
.hover\\:bg-blue-100:hover {
  --tw-bg-opacity: 1;
  background-color: rgb(219 234 254 / var(--tw-bg-opacity));
}
.hover\\:bg-blue-300:hover {
  --tw-bg-opacity: 1;
  background-color: rgb(147 197 253 / var(--tw-bg-opacity));
}
.hover\\:bg-blue-400:hover {
  --tw-bg-opacity: 1;
  background-color: rgb(96 165 250 / var(--tw-bg-opacity));
}
.hover\\:bg-blue-500:hover {
  --tw-bg-opacity: 1;
  background-color: rgb(59 130 246 / var(--tw-bg-opacity));
}
.hover\\:bg-gray-100:hover {
  --tw-bg-opacity: 1;
  background-color: rgb(243 244 246 / var(--tw-bg-opacity));
}
.hover\\:bg-gray-200:hover {
  --tw-bg-opacity: 1;
  background-color: rgb(229 231 235 / var(--tw-bg-opacity));
}
.hover\\:bg-gray-300\\/20:hover {
  background-color: rgb(209 213 219 / 0.2);
}
.hover\\:bg-gray-600:hover {
  --tw-bg-opacity: 1;
  background-color: rgb(75 85 99 / var(--tw-bg-opacity));
}
.hover\\:bg-green-100:hover {
  --tw-bg-opacity: 1;
  background-color: rgb(220 252 231 / var(--tw-bg-opacity));
}
.hover\\:bg-green-400:hover {
  --tw-bg-opacity: 1;
  background-color: rgb(74 222 128 / var(--tw-bg-opacity));
}
.hover\\:bg-pink-100:hover {
  --tw-bg-opacity: 1;
  background-color: rgb(252 231 243 / var(--tw-bg-opacity));
}
.hover\\:bg-pink-400:hover {
  --tw-bg-opacity: 1;
  background-color: rgb(244 114 182 / var(--tw-bg-opacity));
}
.hover\\:bg-primary:hover {
  --tw-bg-opacity: 1;
  background-color: rgb(241 241 242 / var(--tw-bg-opacity));
}
.hover\\:bg-red-100:hover {
  --tw-bg-opacity: 1;
  background-color: rgb(254 226 226 / var(--tw-bg-opacity));
}
.hover\\:bg-red-400:hover {
  --tw-bg-opacity: 1;
  background-color: rgb(248 113 113 / var(--tw-bg-opacity));
}
.hover\\:bg-slate-300:hover {
  --tw-bg-opacity: 1;
  background-color: rgb(203 213 225 / var(--tw-bg-opacity));
}
.hover\\:bg-yellow-100:hover {
  --tw-bg-opacity: 1;
  background-color: rgb(254 249 195 / var(--tw-bg-opacity));
}
.hover\\:bg-yellow-400:hover {
  --tw-bg-opacity: 1;
  background-color: rgb(250 204 21 / var(--tw-bg-opacity));
}
.hover\\:bg-opacity-100:hover {
  --tw-bg-opacity: 1;
}
.hover\\:text-\\[\\#000000\\]:hover {
  --tw-text-opacity: 1;
  color: rgb(0 0 0 / var(--tw-text-opacity));
}
.hover\\:text-\\[\\#57B8FF\\]:hover {
  --tw-text-opacity: 1;
  color: rgb(87 184 255 / var(--tw-text-opacity));
}
.hover\\:text-\\[\\#fff\\]:hover {
  --tw-text-opacity: 1;
  color: rgb(255 255 255 / var(--tw-text-opacity));
}
.hover\\:text-gray-100:hover {
  --tw-text-opacity: 1;
  color: rgb(243 244 246 / var(--tw-text-opacity));
}
.hover\\:text-gray-500:hover {
  --tw-text-opacity: 1;
  color: rgb(107 114 128 / var(--tw-text-opacity));
}
.hover\\:text-white:hover {
  --tw-text-opacity: 1;
  color: rgb(255 255 255 / var(--tw-text-opacity));
}
.hover\\:underline:hover {
  text-decoration-line: underline;
}
.hover\\:opacity-100:hover {
  opacity: 1;
}
.hover\\:opacity-60:hover {
  opacity: 0.6;
}
.focus\\:border-2:focus {
  border-width: 2px;
}
.focus\\:border-gray-300:focus {
  --tw-border-opacity: 1;
  border-color: rgb(209 213 219 / var(--tw-border-opacity));
}
.focus\\:text-gray-100:focus {
  --tw-text-opacity: 1;
  color: rgb(243 244 246 / var(--tw-text-opacity));
}
.focus\\:outline-none:focus {
  outline: 2px solid transparent;
  outline-offset: 2px;
}
.focus\\:ring-0:focus {
  --tw-ring-offset-shadow: var(--tw-ring-inset) 0 0 0 var(--tw-ring-offset-width) var(--tw-ring-offset-color);
  --tw-ring-shadow: var(--tw-ring-inset) 0 0 0 calc(0px + var(--tw-ring-offset-width)) var(--tw-ring-color);
  box-shadow: var(--tw-ring-offset-shadow), var(--tw-ring-shadow), var(--tw-shadow, 0 0 #0000);
}
.focus\\:ring-2:focus {
  --tw-ring-offset-shadow: var(--tw-ring-inset) 0 0 0 var(--tw-ring-offset-width) var(--tw-ring-offset-color);
  --tw-ring-shadow: var(--tw-ring-inset) 0 0 0 calc(2px + var(--tw-ring-offset-width)) var(--tw-ring-color);
  box-shadow: var(--tw-ring-offset-shadow), var(--tw-ring-shadow), var(--tw-shadow, 0 0 #0000);
}
.focus\\:ring-blue-400:focus {
  --tw-ring-opacity: 1;
  --tw-ring-color: rgb(96 165 250 / var(--tw-ring-opacity));
}
.focus\\:ring-gray-400:focus {
  --tw-ring-opacity: 1;
  --tw-ring-color: rgb(156 163 175 / var(--tw-ring-opacity));
}
.focus\\:ring-green-400:focus {
  --tw-ring-opacity: 1;
  --tw-ring-color: rgb(74 222 128 / var(--tw-ring-opacity));
}
.focus\\:ring-pink-400:focus {
  --tw-ring-opacity: 1;
  --tw-ring-color: rgb(244 114 182 / var(--tw-ring-opacity));
}
.focus\\:ring-red-400:focus {
  --tw-ring-opacity: 1;
  --tw-ring-color: rgb(248 113 113 / var(--tw-ring-opacity));
}
.focus\\:ring-yellow-400:focus {
  --tw-ring-opacity: 1;
  --tw-ring-color: rgb(250 204 21 / var(--tw-ring-opacity));
}
.focus\\:ring-opacity-50:focus {
  --tw-ring-opacity: 0.5;
}
.focus\\:ring-offset-1:focus {
  --tw-ring-offset-width: 1px;
}
.focus-visible\\:outline-none:focus-visible {
  outline: 2px solid transparent;
  outline-offset: 2px;
}
.focus-visible\\:ring-0:focus-visible {
  --tw-ring-offset-shadow: var(--tw-ring-inset) 0 0 0 var(--tw-ring-offset-width) var(--tw-ring-offset-color);
  --tw-ring-shadow: var(--tw-ring-inset) 0 0 0 calc(0px + var(--tw-ring-offset-width)) var(--tw-ring-color);
  box-shadow: var(--tw-ring-offset-shadow), var(--tw-ring-shadow), var(--tw-shadow, 0 0 #0000);
}
.active\\:bg-blue-500:active {
  --tw-bg-opacity: 1;
  background-color: rgb(59 130 246 / var(--tw-bg-opacity));
}
.active\\:bg-violet-600:active {
  --tw-bg-opacity: 1;
  background-color: rgb(124 58 237 / var(--tw-bg-opacity));
}
.disabled\\:bg-gray-500:disabled {
  --tw-bg-opacity: 1;
  background-color: rgb(107 114 128 / var(--tw-bg-opacity));
}
.disabled\\:bg-opacity-20:disabled {
  --tw-bg-opacity: 0.2;
}
.disabled\\:opacity-50:disabled {
  opacity: 0.5;
}
.disabled\\:opacity-60:disabled {
  opacity: 0.6;
}
.group:hover .group-hover\\:opacity-100 {
  opacity: 1;
}
.peer:focus ~ .peer-focus\\:\\!text-red-500 {
  --tw-text-opacity: 1 !important;
  color: rgb(239 68 68 / var(--tw-text-opacity)) !important;
}
@media (prefers-color-scheme: dark) {

  .dark\\:border-gray-700 {
    --tw-border-opacity: 1;
    border-color: rgb(55 65 81 / var(--tw-border-opacity));
  }

  .dark\\:border-gray-700\\/80 {
    border-color: rgb(55 65 81 / 0.8);
  }

  .dark\\:border-gray-800 {
    --tw-border-opacity: 1;
    border-color: rgb(31 41 55 / var(--tw-border-opacity));
  }

  .dark\\:\\!bg-black {
    --tw-bg-opacity: 1 !important;
    background-color: rgb(0 0 0 / var(--tw-bg-opacity)) !important;
  }

  .dark\\:bg-gray-700 {
    --tw-bg-opacity: 1;
    background-color: rgb(55 65 81 / var(--tw-bg-opacity));
  }

  .dark\\:bg-gray-800 {
    --tw-bg-opacity: 1;
    background-color: rgb(31 41 55 / var(--tw-bg-opacity));
  }

  .dark\\:bg-gray-900 {
    --tw-bg-opacity: 1;
    background-color: rgb(17 24 39 / var(--tw-bg-opacity));
  }

  .dark\\:bg-red-900 {
    --tw-bg-opacity: 1;
    background-color: rgb(127 29 29 / var(--tw-bg-opacity));
  }

  .dark\\:bg-yellow-900 {
    --tw-bg-opacity: 1;
    background-color: rgb(113 63 18 / var(--tw-bg-opacity));
  }

  .dark\\:bg-opacity-10 {
    --tw-bg-opacity: 0.1;
  }

  .dark\\:bg-opacity-20 {
    --tw-bg-opacity: 0.2;
  }

  .dark\\:to-pink-400 {
    --tw-gradient-to: #f472b6 var(--tw-gradient-to-position);
  }

  .dark\\:\\!text-white {
    --tw-text-opacity: 1 !important;
    color: rgb(255 255 255 / var(--tw-text-opacity)) !important;
  }

  .dark\\:text-gray-200 {
    --tw-text-opacity: 1;
    color: rgb(229 231 235 / var(--tw-text-opacity));
  }

  .dark\\:text-gray-400 {
    --tw-text-opacity: 1;
    color: rgb(156 163 175 / var(--tw-text-opacity));
  }

  .dark\\:text-red-200 {
    --tw-text-opacity: 1;
    color: rgb(254 202 202 / var(--tw-text-opacity));
  }

  .dark\\:text-white {
    --tw-text-opacity: 1;
    color: rgb(255 255 255 / var(--tw-text-opacity));
  }

  .dark\\:text-yellow-200 {
    --tw-text-opacity: 1;
    color: rgb(254 240 138 / var(--tw-text-opacity));
  }

  .dark\\:hover\\:bg-blue-300:hover {
    --tw-bg-opacity: 1;
    background-color: rgb(147 197 253 / var(--tw-bg-opacity));
  }

  .dark\\:hover\\:bg-opacity-20:hover {
    --tw-bg-opacity: 0.2;
  }
}
@media (min-width: 640px) {

  .sm\\:my-8 {
    margin-top: 2rem;
    margin-bottom: 2rem;
  }

  .sm\\:mb-0 {
    margin-bottom: 0px;
  }

  .sm\\:mr-10 {
    margin-right: 2.5rem;
  }

  .sm\\:block {
    display: block;
  }

  .sm\\:inline-block {
    display: inline-block;
  }

  .sm\\:flex {
    display: flex;
  }

  .sm\\:hidden {
    display: none;
  }

  .sm\\:h-\\[76vh\\] {
    height: 76vh;
  }

  .sm\\:h-screen {
    height: 100vh;
  }

  .sm\\:w-3\\/4 {
    width: 75%;
  }

  .sm\\:w-\\[100vh\\] {
    width: 100vh;
  }

  .sm\\:w-\\[18px\\] {
    width: 18px;
  }

  .sm\\:max-w-3xl {
    max-width: 48rem;
  }

  .sm\\:max-w-5xl {
    max-width: 64rem;
  }

  .sm\\:max-w-lg {
    max-width: 32rem;
  }

  .sm\\:translate-y-0 {
    --tw-translate-y: 0px;
    transform: translate(var(--tw-translate-x), var(--tw-translate-y)) rotate(var(--tw-rotate)) skewX(var(--tw-skew-x)) skewY(var(--tw-skew-y)) scaleX(var(--tw-scale-x)) scaleY(var(--tw-scale-y));
  }

  .sm\\:scale-100 {
    --tw-scale-x: 1;
    --tw-scale-y: 1;
    transform: translate(var(--tw-translate-x), var(--tw-translate-y)) rotate(var(--tw-rotate)) skewX(var(--tw-skew-x)) skewY(var(--tw-skew-y)) scaleX(var(--tw-scale-x)) scaleY(var(--tw-scale-y));
  }

  .sm\\:scale-95 {
    --tw-scale-x: .95;
    --tw-scale-y: .95;
    transform: translate(var(--tw-translate-x), var(--tw-translate-y)) rotate(var(--tw-rotate)) skewX(var(--tw-skew-x)) skewY(var(--tw-skew-y)) scaleX(var(--tw-scale-x)) scaleY(var(--tw-scale-y));
  }

  .sm\\:grid-cols-1 {
    grid-template-columns: repeat(1, minmax(0, 1fr));
  }

  .sm\\:grid-cols-2 {
    grid-template-columns: repeat(2, minmax(0, 1fr));
  }

  .sm\\:space-x-5 > :not([hidden]) ~ :not([hidden]) {
    --tw-space-x-reverse: 0;
    margin-right: calc(1.25rem * var(--tw-space-x-reverse));
    margin-left: calc(1.25rem * calc(1 - var(--tw-space-x-reverse)));
  }

  .sm\\:rounded-xl {
    border-radius: 0.75rem;
  }

  .sm\\:p-0 {
    padding: 0px;
  }

  .sm\\:px-3 {
    padding-left: 0.75rem;
    padding-right: 0.75rem;
  }

  .sm\\:py-1 {
    padding-top: 0.25rem;
    padding-bottom: 0.25rem;
  }

  .sm\\:py-1\\.5 {
    padding-top: 0.375rem;
    padding-bottom: 0.375rem;
  }

  .sm\\:align-middle {
    vertical-align: middle;
  }
}
@media (min-width: 768px) {

  .md\\:pointer-events-auto {
    pointer-events: auto;
  }

  .md\\:invisible {
    visibility: hidden;
  }

  .md\\:static {
    position: static;
  }

  .md\\:relative {
    position: relative;
  }

  .md\\:right-5 {
    right: 1.25rem;
  }

  .md\\:top-0 {
    top: 0px;
  }

  .md\\:m-0 {
    margin: 0px;
  }

  .md\\:mb-10 {
    margin-bottom: 2.5rem;
  }

  .md\\:mt-20 {
    margin-top: 5rem;
  }

  .md\\:mt-4 {
    margin-top: 1rem;
  }

  .md\\:block {
    display: block;
  }

  .md\\:flex {
    display: flex;
  }

  .md\\:hidden {
    display: none;
  }

  .md\\:h-16 {
    height: 4rem;
  }

  .md\\:h-4 {
    height: 1rem;
  }

  .md\\:h-\\[100vh\\] {
    height: 100vh;
  }

  .md\\:h-\\[400px\\] {
    height: 400px;
  }

  .md\\:h-\\[80vh\\] {
    height: 80vh;
  }

  .md\\:h-full {
    height: 100%;
  }

  .md\\:w-16 {
    width: 4rem;
  }

  .md\\:w-3\\/4 {
    width: 75%;
  }

  .md\\:w-\\[129px\\] {
    width: 129px;
  }

  .md\\:w-\\[350px\\] {
    width: 350px;
  }

  .md\\:w-\\[400px\\] {
    width: 400px;
  }

  .md\\:max-w-3xl {
    max-width: 48rem;
  }

  .md\\:grid-cols-1 {
    grid-template-columns: repeat(1, minmax(0, 1fr));
  }

  .md\\:grid-cols-3 {
    grid-template-columns: repeat(3, minmax(0, 1fr));
  }

  .md\\:flex-col {
    flex-direction: column;
  }

  .md\\:gap-10 {
    gap: 2.5rem;
  }

  .md\\:gap-20 {
    gap: 5rem;
  }

  .md\\:gap-y-6 {
    row-gap: 1.5rem;
  }

  .md\\:gap-y-8 {
    row-gap: 2rem;
  }

  .md\\:space-x-0 > :not([hidden]) ~ :not([hidden]) {
    --tw-space-x-reverse: 0;
    margin-right: calc(0px * var(--tw-space-x-reverse));
    margin-left: calc(0px * calc(1 - var(--tw-space-x-reverse)));
  }

  .md\\:rounded-lg {
    border-radius: 0.5rem;
  }

  .md\\:border-none {
    border-style: none;
  }

  .md\\:object-contain {
    -o-object-fit: contain;
       object-fit: contain;
  }

  .md\\:p-0 {
    padding: 0px;
  }

  .md\\:p-3 {
    padding: 0.75rem;
  }

  .md\\:px-4 {
    padding-left: 1rem;
    padding-right: 1rem;
  }

  .md\\:pb-3 {
    padding-bottom: 0.75rem;
  }

  .md\\:pb-6 {
    padding-bottom: 1.5rem;
  }

  .md\\:pt-\\[135px\\] {
    padding-top: 135px;
  }

  .md\\:text-white {
    --tw-text-opacity: 1;
    color: rgb(255 255 255 / var(--tw-text-opacity));
  }

  .md\\:hover\\:z-10:hover {
    z-index: 10;
  }

  .md\\:hover\\:scale-125:hover {
    --tw-scale-x: 1.25;
    --tw-scale-y: 1.25;
    transform: translate(var(--tw-translate-x), var(--tw-translate-y)) rotate(var(--tw-rotate)) skewX(var(--tw-skew-x)) skewY(var(--tw-skew-y)) scaleX(var(--tw-scale-x)) scaleY(var(--tw-scale-y));
  }

  .md\\:hover\\:border:hover {
    border-width: 1px;
  }

  .md\\:hover\\:bg-\\[\\#57B8FF\\]:hover {
    --tw-bg-opacity: 1;
    background-color: rgb(87 184 255 / var(--tw-bg-opacity));
  }
}
@media (min-width: 1024px) {

  .lg\\:ml-20 {
    margin-left: 5rem;
  }

  .lg\\:block {
    display: block;
  }

  .lg\\:hidden {
    display: none;
  }

  .lg\\:h-\\[500px\\] {
    height: 500px;
  }

  .lg\\:h-\\[547px\\] {
    height: 547px;
  }

  .lg\\:h-screen {
    height: 100vh;
  }

  .lg\\:w-400 {
    width: 400px;
  }

  .lg\\:w-44 {
    width: 11rem;
  }

  .lg\\:w-\\[1100px\\] {
    width: 1100px;
  }

  .lg\\:w-\\[400px\\] {
    width: 400px;
  }

  .lg\\:w-\\[410px\\] {
    width: 410px;
  }

  .lg\\:w-\\[500px\\] {
    width: 500px;
  }

  .lg\\:flex-grow {
    flex-grow: 1;
  }

  .lg\\:grid-cols-1 {
    grid-template-columns: repeat(1, minmax(0, 1fr));
  }

  .lg\\:grid-cols-3 {
    grid-template-columns: repeat(3, minmax(0, 1fr));
  }

  .lg\\:flex-row {
    flex-direction: row;
  }

  .lg\\:justify-start {
    justify-content: flex-start;
  }

  .lg\\:rounded-full {
    border-radius: 9999px;
  }

  .lg\\:border-2 {
    border-width: 2px;
  }

  .lg\\:border-b-2 {
    border-bottom-width: 2px;
  }

  .lg\\:border-\\[\\#a3f32b\\] {
    --tw-border-opacity: 1;
    border-color: rgb(163 243 43 / var(--tw-border-opacity));
  }

  .lg\\:border-gray-300 {
    --tw-border-opacity: 1;
    border-color: rgb(209 213 219 / var(--tw-border-opacity));
  }

  .lg\\:p-4 {
    padding: 1rem;
  }

  .lg\\:pb-3 {
    padding-bottom: 0.75rem;
  }

  .lg\\:pt-5 {
    padding-top: 1.25rem;
  }

  .lg\\:after\\:w-650::after {
    content: var(--tw-content);
    width: 650px;
  }

  .lg\\:hover\\:overflow-auto:hover {
    overflow: auto;
  }
}
@media (min-width: 1280px) {

  .xl\\:block {
    display: block;
  }

  .xl\\:hidden {
    display: none;
  }

  .xl\\:h-\\[100vh\\] {
    height: 100vh;
  }

  .xl\\:h-\\[84vh\\] {
    height: 84vh;
  }

  .xl\\:w-\\[1200px\\] {
    width: 1200px;
  }

  .xl\\:border-0 {
    border-width: 0px;
  }

  .xl\\:border-b-2 {
    border-bottom-width: 2px;
  }

  .xl\\:border-gray-200 {
    --tw-border-opacity: 1;
    border-color: rgb(229 231 235 / var(--tw-border-opacity));
  }

  .xl\\:pb-4 {
    padding-bottom: 1rem;
  }
}
.\\[\\&\\>\\*\\]\\:h-5>* {
  height: 1.25rem;
}
.peer:focus ~ .\\[\\&\\>\\*\\]\\:peer-focus\\:\\!text-red-500>* {
  --tw-text-opacity: 1 !important;
  color: rgb(239 68 68 / var(--tw-text-opacity)) !important;
}
`,""]);const e=d},"./src lazy recursive ^\\.\\/.*$ include: (?:\\/src(?:\\/(?%21\\.)(?:(?:(?%21(?:^%7C\\/)\\.).)*?)\\/%7C\\/%7C$)(?%21\\.)(?=.)[^/]*?\\.stories\\.(js%7Cjsx%7Cts%7Ctsx))$":(t,r,n)=>{var o={"./stories/Button.stories":["./src/stories/Button.stories.tsx",256],"./stories/Button.stories.tsx":["./src/stories/Button.stories.tsx",256]};function a(c){if(!n.o(o,c))return Promise.resolve().then(()=>{var e=new Error("Cannot find module '"+c+"'");throw e.code="MODULE_NOT_FOUND",e});var p=o[c],d=p[0];return n.e(p[1]).then(()=>n(d))}a.keys=()=>Object.keys(o),a.id="./src lazy recursive ^\\.\\/.*$ include: (?:\\/src(?:\\/(?%21\\.)(?:(?:(?%21(?:^%7C\\/)\\.).)*?)\\/%7C\\/%7C$)(?%21\\.)(?=.)[^/]*?\\.stories\\.(js%7Cjsx%7Cts%7Ctsx))$",t.exports=a},"./src lazy recursive ^\\.\\/.*$ include: (?:\\/src(?:\\/(?%21\\.)(?:(?:(?%21(?:^%7C\\/)\\.).)*?)\\/%7C\\/%7C$)(?%21\\.)(?=.)[^/]*?\\.stories\\.mdx)$":t=>{function r(n){return Promise.resolve().then(()=>{var o=new Error("Cannot find module '"+n+"'");throw o.code="MODULE_NOT_FOUND",o})}r.keys=()=>[],r.resolve=r,r.id="./src lazy recursive ^\\.\\/.*$ include: (?:\\/src(?:\\/(?%21\\.)(?:(?:(?%21(?:^%7C\\/)\\.).)*?)\\/%7C\\/%7C$)(?%21\\.)(?=.)[^/]*?\\.stories\\.mdx)$",t.exports=r},"./storybook-config-entry.js":(t,r,n)=>{"use strict";var o=n("./node_modules/@storybook/global/dist/index.mjs"),a=n("@storybook/preview-api");const c=__STORYBOOK_MODULE_CHANNEL_POSTMESSAGE__,p=__STORYBOOK_MODULE_CHANNEL_WEBSOCKET__,d=i=>i(),e=[i=>h(v,null,function*(){if(!/^\.[\\/](?:src(?:\/(?!\.)(?:(?:(?!(?:^|\/)\.).)*?)\/|\/|$)(?!\.)(?=.)[^/]*?\.stories\.(js|jsx|ts|tsx))$/.exec(i))return;const s=i.substring(6);return n("./src lazy recursive ^\\.\\/.*$ include: (?:\\/src(?:\\/(?%21\\.)(?:(?:(?%21(?:^%7C\\/)\\.).)*?)\\/%7C\\/%7C$)(?%21\\.)(?=.)[^/]*?\\.stories\\.(js%7Cjsx%7Cts%7Ctsx))$")("./"+s)}),i=>h(v,null,function*(){if(!/^\.[\\/](?:src(?:\/(?!\.)(?:(?:(?!(?:^|\/)\.).)*?)\/|\/|$)(?!\.)(?=.)[^/]*?\.stories\.mdx)$/.exec(i))return;const s=i.substring(6);return n("./src lazy recursive ^\\.\\/.*$ include: (?:\\/src(?:\\/(?%21\\.)(?:(?:(?%21(?:^%7C\\/)\\.).)*?)\\/%7C\\/%7C$)(?%21\\.)(?=.)[^/]*?\\.stories\\.mdx)$")("./"+s)})];function g(i){return h(this,null,function*(){for(let s=0;s<e.length;s++){const l=yield d(()=>e[s](i));if(l)return l}})}const{SERVER_CHANNEL_URL:b}=o.global,y=()=>(0,a.composeConfigs)([n("./node_modules/@storybook/nextjs/dist/preview.js"),n("./node_modules/@storybook/react/preview.js"),n("./node_modules/@storybook/addon-essentials/dist/docs/preview.mjs"),n("./node_modules/@storybook/addon-essentials/dist/actions/preview.mjs"),n("./node_modules/@storybook/addon-essentials/dist/backgrounds/preview.mjs"),n("./node_modules/@storybook/addon-essentials/dist/measure/preview.mjs"),n("./node_modules/@storybook/addon-essentials/dist/outline/preview.mjs"),n("./node_modules/@storybook/addon-essentials/dist/highlight/preview.mjs"),n("./node_modules/@storybook/addon-styling/dist/preview.mjs"),n("./.storybook/preview.ts")]),m=(0,c.createChannel)({page:"preview"});if(a.addons.setChannel(m),b){const i=(0,p.createChannel)({url:b});a.addons.setServerChannel(i),window.__STORYBOOK_SERVER_CHANNEL__=i}const w=new a.PreviewWeb;window.__STORYBOOK_PREVIEW__=w,window.__STORYBOOK_STORY_STORE__=w.storyStore,window.__STORYBOOK_ADDONS_CHANNEL__=m,window.__STORYBOOK_CLIENT_API__=new a.ClientApi({storyStore:w.storyStore}),w.initialize({importFn:g,getProjectAnnotations:y})},"@storybook/channels":t=>{"use strict";t.exports=__STORYBOOK_MODULE_CHANNELS__},"@storybook/client-logger":t=>{"use strict";t.exports=__STORYBOOK_MODULE_CLIENT_LOGGER__},"@storybook/core-events":t=>{"use strict";t.exports=__STORYBOOK_MODULE_CORE_EVENTS__},"@storybook/preview-api":t=>{"use strict";t.exports=__STORYBOOK_MODULE_PREVIEW_API__}},t=>{var r=o=>t(t.s=o);t.O(0,[36],()=>r("./storybook-config-entry.js"));var n=t.O()}])});k();})();
