/*! For license information please see 143.ffe0b74e.chunk.js.LICENSE.txt */
"use strict";(self.webpackChunkloco_landing=self.webpackChunkloco_landing||[]).push([[143],{143:(e,t,s)=>{s.r(t),s.d(t,{default:()=>m});var n=s(43),a=s(404),i=s(245),r=s(139),l=s.n(r),o=s(270);let c="undefined"!==typeof window?n.useLayoutEffect:n.useEffect,u=e=>e&&!Array.isArray(e)&&"object"===typeof e,d=[],f={},g=o.Ay;const p=function(e){let t=arguments.length>1&&void 0!==arguments[1]?arguments[1]:d,s=f;u(e)?(s=e,e=null,t="dependencies"in s?s.dependencies:d):u(t)&&(s=t,t="dependencies"in s?s.dependencies:d);let{scope:a,revertOnUpdate:i}=s,[r,l]=(0,n.useState)(!1);e&&"function"!==typeof e&&console.warn("First parameter must be a function or config object");const o=g.context((()=>{}),a),p=()=>o.revert(),x=t&&t.length&&!i;return c((()=>{if(e&&o.add(e,a),!x||!r)return p}),t),x&&c((()=>(l(!0),p)),d),{context:o,contextSafe:e=>o.add(null,e)}};p.register=e=>{g=e},p.headless=!0;var x=s(579);o.Ay.registerPlugin(p);const h=[{src:"https://images.unsplash.com/photo-1566204773863-cf63e6d4ab88?ixlib=rb-1.2.1&ixid=MnwxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8&auto=format&fit=crop&w=1345&q=100",title:"Dracaena Trifasciata",subtitle:"Live the Beauty",category:"Shooting / Adv.Campaing"},{src:"https://images.unsplash.com/photo-1558603668-6570496b66f8?ixid=MnwxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8&ixlib=rb-1.2.1&auto=format&fit=crop&w=1300&q=100",title:"Cereus Penuvianus",subtitle:"Live the Beauty",category:"Shooting / Adv.Campaing"},{src:"https://images.unsplash.com/photo-1567225557594-88d73e55f2cb?ixlib=rb-1.2.1&ixid=MnwxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8&auto=format&fit=crop&w=934&q=100",title:"Calliope",subtitle:"Live the Beauty",category:"Shooting / Adv.Campaing"},{src:"https://images.unsplash.com/photo-1611145367651-6303b46e4040?ixlib=rb-1.2.1&ixid=MnwxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8&auto=format&fit=crop&w=2006&q=100",title:"Golden Pothos",subtitle:"Living Room",category:"Shooting / Adv.Campaing"}];function m(e){let{src:t,index:s,columnOffset:i}=e;const[r,l]=(0,n.useState)(1),c=(0,n.useRef)(null),u=(0,n.useRef)();p((()=>{console.log(c.current.offsetWidth),console.log(c.current.clientWidth),console.log({current:c.current});const e=o.Ay.utils.toArray(".gallery-item-wrapper"),t=document.querySelector("#main-container");o.Ay.to(e,{xPercent:-100*(e.length-1),ease:"none",scrollTrigger:{markers:"true",start:"top top",trigger:c.current,scroller:t,pin:!0,scrub:.5,snap:1/(e.length-1),end:()=>"+=".concat(c.current.offsetWidth)}}),a.A.refresh()}),[]);const d=e=>{l(e+1)};return(0,x.jsx)("section",{"data-scroll-section":!0,ref:u,className:"section-wrapper gallery-wrap",children:(0,x.jsxs)("div",{className:"gallery",ref:c,children:[(0,x.jsxs)("div",{className:"gallery-counter",children:[(0,x.jsx)("span",{children:r}),(0,x.jsx)("span",{className:"divider"}),(0,x.jsx)("span",{children:h.length})]}),h.map(((e,t)=>(0,x.jsx)(y,{index:t,...e,updateActiveImage:d},t)))]})})}function y(e){let{src:t,category:s,subtitle:a,title:r,updateActiveImage:o,index:c}=e;const u=(0,n.useRef)(null),d=(0,i.A)(u,.5);return(0,n.useEffect)((()=>{d&&o(c)}),[d,c,o]),(0,x.jsxs)("div",{className:l()("gallery-item-wrapper",{"is-reveal":d}),ref:u,children:[(0,x.jsx)("div",{}),(0,x.jsxs)("div",{className:"gallery-item",children:[(0,x.jsxs)("div",{className:"gallery-item-info",children:[(0,x.jsx)("h1",{className:"gallery-info-title",children:r}),(0,x.jsx)("h2",{className:"gallery-info-subtitle",children:a}),(0,x.jsx)("p",{className:"gallery-info-category",children:s})]}),(0,x.jsx)("div",{className:"gallery-item-image",style:{backgroundImage:"url(".concat(t,")")}})]}),(0,x.jsx)("div",{})]})}}}]);
//# sourceMappingURL=143.ffe0b74e.chunk.js.map