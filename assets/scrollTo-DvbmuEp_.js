import{w as r}from"./index-DnZSuapv.js";function u(n){return n!=null&&n===n.window}const d=n=>{var e,s;if(typeof window>"u")return 0;let o=0;return u(n)?o=n.pageYOffset:n instanceof Document?o=n.documentElement.scrollTop:(n instanceof HTMLElement||n)&&(o=n.scrollTop),n&&!u(n)&&typeof o!="number"&&(o=(s=((e=n.ownerDocument)!==null&&e!==void 0?e:n).documentElement)===null||s===void 0?void 0:s.scrollTop),o};function a(n,e,s,o){const c=s-e;return n/=o/2,n<1?c/2*n*n*n+e:c/2*((n-=2)*n*n+2)+e}function D(n){let e=arguments.length>1&&arguments[1]!==void 0?arguments[1]:{};const{getContainer:s=()=>window,callback:o,duration:c=450}=e,l=s(),m=d(l),p=Date.now(),f=()=>{const i=Date.now()-p,t=a(i>c?c:i,m,n,c);u(l)?l.scrollTo(window.pageXOffset,t):l instanceof Document||l.constructor.name==="HTMLDocument"?l.documentElement.scrollTop=t:l.scrollTop=t,i<c?r(f):typeof o=="function"&&o()};r(f)}export{d as g,D as s};
