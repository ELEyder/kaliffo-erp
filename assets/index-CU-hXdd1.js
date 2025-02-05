import{r,I as je,d as Te,av as Ie,aw as et,p as tt,n as nt,c as Y,K as he,A as ot,D as rt,C as $e,aj as _e,G as U,_ as st}from"./index-DnZSuapv.js";import{R as it}from"./EditOutlined-Bm2pbz4p.js";import{u as xe,R as lt}from"./useMergedState-xnIRtK6W.js";import{t as Le,o as Me}from"./useSize-DL9WfM8p.js";import{i as Se}from"./styleChecker-BPMTEHVB.js";import{u as at}from"./responsiveObserver-P31G7zPC.js";import{T as pe}from"./index-OoAlQgr1.js";import{c as ct,R as ut}from"./button-DxAvYtf7.js";import{T as dt}from"./TextArea-D6coABml.js";import{R as pt}from"./CheckOutlined-CxFn5oU1.js";function ft(e){return(arguments.length>1&&arguments[1]!==void 0?arguments[1]:!1)&&e==null?[]:Array.isArray(e)?e:[e]}var mt={icon:{tag:"svg",attrs:{viewBox:"64 64 896 896",focusable:"false"},children:[{tag:"path",attrs:{d:"M832 64H296c-4.4 0-8 3.6-8 8v56c0 4.4 3.6 8 8 8h496v688c0 4.4 3.6 8 8 8h56c4.4 0 8-3.6 8-8V96c0-17.7-14.3-32-32-32zM704 192H192c-17.7 0-32 14.3-32 32v530.7c0 8.5 3.4 16.6 9.4 22.6l173.3 173.3c2.2 2.2 4.7 4 7.4 5.5v1.9h4.2c3.5 1.3 7.2 2 11 2H704c17.7 0 32-14.3 32-32V224c0-17.7-14.3-32-32-32zM350 856.2L263.9 770H350v86.2zM664 888H414V746c0-22.1-17.9-40-40-40H232V264h432v624z"}}]},name:"copy",theme:"outlined"},gt=function(t,o){return r.createElement(je,Te({},t,{ref:o,icon:mt}))},yt=r.forwardRef(gt),bt={icon:{tag:"svg",attrs:{viewBox:"64 64 896 896",focusable:"false"},children:[{tag:"path",attrs:{d:"M864 170h-60c-4.4 0-8 3.6-8 8v518H310v-73c0-6.7-7.8-10.5-13-6.3l-141.9 112a8 8 0 000 12.6l141.9 112c5.3 4.2 13 .4 13-6.3v-75h498c35.3 0 64-28.7 64-64V178c0-4.4-3.6-8-8-8z"}}]},name:"enter",theme:"outlined"},vt=function(t,o){return r.createElement(je,Te({},t,{ref:o,icon:bt}))},Et=r.forwardRef(vt);const ht=(e,t,o,n)=>{const{titleMarginBottom:s,fontWeightStrong:l}=n;return{marginBottom:s,color:o,fontWeight:l,fontSize:e,lineHeight:t}},xt=e=>{const t=[1,2,3,4,5],o={};return t.forEach(n=>{o[`
      h${n}&,
      div&-h${n},
      div&-h${n} > textarea,
      h${n}
    `]=ht(e[`fontSizeHeading${n}`],e[`lineHeightHeading${n}`],e.colorTextHeading,e)}),o},St=e=>{const{componentCls:t}=e;return{"a&, a":Object.assign(Object.assign({},Ie(e)),{userSelect:"text",[`&[disabled], &${t}-disabled`]:{color:e.colorTextDisabled,cursor:"not-allowed","&:active, &:hover":{color:e.colorTextDisabled},"&:active":{pointerEvents:"none"}}})}},Ct=e=>({code:{margin:"0 0.2em",paddingInline:"0.4em",paddingBlock:"0.2em 0.1em",fontSize:"85%",fontFamily:e.fontFamilyCode,background:"rgba(150, 150, 150, 0.1)",border:"1px solid rgba(100, 100, 100, 0.2)",borderRadius:3},kbd:{margin:"0 0.2em",paddingInline:"0.4em",paddingBlock:"0.15em 0.1em",fontSize:"90%",fontFamily:e.fontFamilyCode,background:"rgba(150, 150, 150, 0.06)",border:"1px solid rgba(100, 100, 100, 0.2)",borderBottomWidth:2,borderRadius:3},mark:{padding:0,backgroundColor:et[2]},"u, ins":{textDecoration:"underline",textDecorationSkipInk:"auto"},"s, del":{textDecoration:"line-through"},strong:{fontWeight:600},"ul, ol":{marginInline:0,marginBlock:"0 1em",padding:0,li:{marginInline:"20px 0",marginBlock:0,paddingInline:"4px 0",paddingBlock:0}},ul:{listStyleType:"circle",ul:{listStyleType:"disc"}},ol:{listStyleType:"decimal"},"pre, blockquote":{margin:"1em 0"},pre:{padding:"0.4em 0.6em",whiteSpace:"pre-wrap",wordWrap:"break-word",background:"rgba(150, 150, 150, 0.1)",border:"1px solid rgba(100, 100, 100, 0.2)",borderRadius:3,fontFamily:e.fontFamilyCode,code:{display:"inline",margin:0,padding:0,fontSize:"inherit",fontFamily:"inherit",background:"transparent",border:0}},blockquote:{paddingInline:"0.6em 0",paddingBlock:0,borderInlineStart:"4px solid rgba(100, 100, 100, 0.2)",opacity:.85}}),Ot=e=>{const{componentCls:t,paddingSM:o}=e,n=o;return{"&-edit-content":{position:"relative","div&":{insetInlineStart:e.calc(e.paddingSM).mul(-1).equal(),marginTop:e.calc(n).mul(-1).equal(),marginBottom:`calc(1em - ${tt(n)})`},[`${t}-edit-content-confirm`]:{position:"absolute",insetInlineEnd:e.calc(e.marginXS).add(2).equal(),insetBlockEnd:e.marginXS,color:e.colorTextDescription,fontWeight:"normal",fontSize:e.fontSize,fontStyle:"normal",pointerEvents:"none"},textarea:{margin:"0!important",MozTransition:"none",height:"1em"}}}},wt=e=>({[`${e.componentCls}-copy-success`]:{"\n    &,\n    &:hover,\n    &:focus":{color:e.colorSuccess}},[`${e.componentCls}-copy-icon-only`]:{marginInlineStart:0}}),Rt=()=>({"\n  a&-ellipsis,\n  span&-ellipsis\n  ":{display:"inline-block",maxWidth:"100%"},"&-ellipsis-single-line":{whiteSpace:"nowrap",overflow:"hidden",textOverflow:"ellipsis","a&, span&":{verticalAlign:"bottom"},"> code":{paddingBlock:0,maxWidth:"calc(100% - 1.2em)",display:"inline-block",overflow:"hidden",textOverflow:"ellipsis",verticalAlign:"bottom",boxSizing:"content-box"}},"&-ellipsis-multiple-line":{display:"-webkit-box",overflow:"hidden",WebkitLineClamp:3,WebkitBoxOrient:"vertical"}}),jt=e=>{const{componentCls:t,titleMarginTop:o}=e;return{[t]:Object.assign(Object.assign(Object.assign(Object.assign(Object.assign(Object.assign(Object.assign(Object.assign(Object.assign({color:e.colorText,wordBreak:"break-word",lineHeight:e.lineHeight,[`&${t}-secondary`]:{color:e.colorTextDescription},[`&${t}-success`]:{color:e.colorSuccess},[`&${t}-warning`]:{color:e.colorWarning},[`&${t}-danger`]:{color:e.colorError,"a&:active, a&:focus":{color:e.colorErrorActive},"a&:hover":{color:e.colorErrorHover}},[`&${t}-disabled`]:{color:e.colorTextDisabled,cursor:"not-allowed",userSelect:"none"},"\n        div&,\n        p\n      ":{marginBottom:"1em"}},xt(e)),{[`
      & + h1${t},
      & + h2${t},
      & + h3${t},
      & + h4${t},
      & + h5${t}
      `]:{marginTop:o},"\n      div,\n      ul,\n      li,\n      p,\n      h1,\n      h2,\n      h3,\n      h4,\n      h5":{"\n        + h1,\n        + h2,\n        + h3,\n        + h4,\n        + h5\n        ":{marginTop:o}}}),Ct(e)),St(e)),{[`
        ${t}-expand,
        ${t}-collapse,
        ${t}-edit,
        ${t}-copy
      `]:Object.assign(Object.assign({},Ie(e)),{marginInlineStart:e.marginXXS})}),Ot(e)),wt(e)),Rt()),{"&-rtl":{direction:"rtl"}})}},Tt=()=>({titleMarginTop:"1.2em",titleMarginBottom:"0.5em"}),Pe=nt("Typography",e=>[jt(e)],Tt),It=e=>{const{prefixCls:t,"aria-label":o,className:n,style:s,direction:l,maxLength:f,autoSize:c=!0,value:u,onSave:p,onCancel:a,onEnd:m,component:g,enterIcon:b=r.createElement(Et,null)}=e,T=r.useRef(null),S=r.useRef(!1),C=r.useRef(),[y,$]=r.useState(u);r.useEffect(()=>{$(u)},[u]),r.useEffect(()=>{var v;if(!((v=T.current)===null||v===void 0)&&v.resizableTextArea){const{textArea:E}=T.current.resizableTextArea;E.focus();const{length:x}=E.value;E.setSelectionRange(x,x)}},[]);const H=v=>{let{target:E}=v;$(E.value.replace(/[\n\r]/g,""))},O=()=>{S.current=!0},w=()=>{S.current=!1},_=v=>{let{keyCode:E}=v;S.current||(C.current=E)},h=()=>{p(y.trim())},z=v=>{let{keyCode:E,ctrlKey:x,altKey:N,metaKey:j,shiftKey:L}=v;C.current!==E||S.current||x||N||j||L||(E===he.ENTER?(h(),m==null||m()):E===he.ESC&&a())},V=()=>{h()},[W,k,F]=Pe(t),D=Y(t,`${t}-edit-content`,{[`${t}-rtl`]:l==="rtl",[`${t}-${g}`]:!!g},n,k,F);return W(r.createElement("div",{className:D,style:s},r.createElement(dt,{ref:T,maxLength:f,value:y,onChange:H,onKeyDown:_,onKeyUp:z,onCompositionStart:O,onCompositionEnd:w,onBlur:V,"aria-label":o,rows:1,autoSize:c}),b!==null?ct(b,{className:`${t}-edit-content-confirm`}):null))};var $t=function(){var e=document.getSelection();if(!e.rangeCount)return function(){};for(var t=document.activeElement,o=[],n=0;n<e.rangeCount;n++)o.push(e.getRangeAt(n));switch(t.tagName.toUpperCase()){case"INPUT":case"TEXTAREA":t.blur();break;default:t=null;break}return e.removeAllRanges(),function(){e.type==="Caret"&&e.removeAllRanges(),e.rangeCount||o.forEach(function(s){e.addRange(s)}),t&&t.focus()}},_t=$t,Ce={"text/plain":"Text","text/html":"Url",default:"Text"},Lt="Copy to clipboard: #{key}, Enter";function Mt(e){var t=(/mac os x/i.test(navigator.userAgent)?"⌘":"Ctrl")+"+C";return e.replace(/#{\s*key\s*}/g,t)}function Pt(e,t){var o,n,s,l,f,c,u=!1;t||(t={}),o=t.debug||!1;try{s=_t(),l=document.createRange(),f=document.getSelection(),c=document.createElement("span"),c.textContent=e,c.ariaHidden="true",c.style.all="unset",c.style.position="fixed",c.style.top=0,c.style.clip="rect(0, 0, 0, 0)",c.style.whiteSpace="pre",c.style.webkitUserSelect="text",c.style.MozUserSelect="text",c.style.msUserSelect="text",c.style.userSelect="text",c.addEventListener("copy",function(a){if(a.stopPropagation(),t.format)if(a.preventDefault(),typeof a.clipboardData>"u"){o&&console.warn("unable to use e.clipboardData"),o&&console.warn("trying IE specific stuff"),window.clipboardData.clearData();var m=Ce[t.format]||Ce.default;window.clipboardData.setData(m,e)}else a.clipboardData.clearData(),a.clipboardData.setData(t.format,e);t.onCopy&&(a.preventDefault(),t.onCopy(a.clipboardData))}),document.body.appendChild(c),l.selectNodeContents(c),f.addRange(l);var p=document.execCommand("copy");if(!p)throw new Error("copy command was unsuccessful");u=!0}catch(a){o&&console.error("unable to copy using execCommand: ",a),o&&console.warn("trying IE specific stuff");try{window.clipboardData.setData(t.format||"text",e),t.onCopy&&t.onCopy(window.clipboardData),u=!0}catch(m){o&&console.error("unable to copy using clipboardData: ",m),o&&console.error("falling back to prompt"),n=Mt("message"in t?t.message:Lt),window.prompt(n,e)}}finally{f&&(typeof f.removeRange=="function"?f.removeRange(l):f.removeAllRanges()),c&&document.body.removeChild(c),s()}return u}var kt=Pt;const Dt=ot(kt);var Nt=function(e,t,o,n){function s(l){return l instanceof o?l:new o(function(f){f(l)})}return new(o||(o=Promise))(function(l,f){function c(a){try{p(n.next(a))}catch(m){f(m)}}function u(a){try{p(n.throw(a))}catch(m){f(m)}}function p(a){a.done?l(a.value):s(a.value).then(c,u)}p((n=n.apply(e,t||[])).next())})};const At=e=>{let{copyConfig:t,children:o}=e;const[n,s]=r.useState(!1),[l,f]=r.useState(!1),c=r.useRef(null),u=()=>{c.current&&clearTimeout(c.current)},p={};t.format&&(p.format=t.format),r.useEffect(()=>u,[]);const a=rt(m=>Nt(void 0,void 0,void 0,function*(){var g;m==null||m.preventDefault(),m==null||m.stopPropagation(),f(!0);try{const b=typeof t.text=="function"?yield t.text():t.text;Dt(b||ft(o,!0).join("")||"",p),f(!1),s(!0),u(),c.current=setTimeout(()=>{s(!1)},3e3),(g=t.onCopy)===null||g===void 0||g.call(t,m)}catch(b){throw f(!1),b}}));return{copied:n,copyLoading:l,onClick:a}};function ie(e,t){return r.useMemo(()=>{const o=!!e;return[o,Object.assign(Object.assign({},t),o&&typeof e=="object"?e:null)]},[e])}const Ht=e=>{const t=r.useRef();return r.useEffect(()=>{t.current=e}),t.current},zt=(e,t,o)=>r.useMemo(()=>e===!0?{title:t??o}:r.isValidElement(e)?{title:e}:typeof e=="object"?Object.assign({title:t??o},e):{title:e},[e,t,o]);var Bt=function(e,t){var o={};for(var n in e)Object.prototype.hasOwnProperty.call(e,n)&&t.indexOf(n)<0&&(o[n]=e[n]);if(e!=null&&typeof Object.getOwnPropertySymbols=="function")for(var s=0,n=Object.getOwnPropertySymbols(e);s<n.length;s++)t.indexOf(n[s])<0&&Object.prototype.propertyIsEnumerable.call(e,n[s])&&(o[n[s]]=e[n[s]]);return o};const ke=r.forwardRef((e,t)=>{const{prefixCls:o,component:n="article",className:s,rootClassName:l,setContentRef:f,children:c,direction:u,style:p}=e,a=Bt(e,["prefixCls","component","className","rootClassName","setContentRef","children","direction","style"]),{getPrefixCls:m,direction:g,typography:b}=r.useContext($e),T=u??g,S=f?_e(t,f):t,C=m("typography",o),[y,$,H]=Pe(C),O=Y(C,b==null?void 0:b.className,{[`${C}-rtl`]:T==="rtl"},s,l,$,H),w=Object.assign(Object.assign({},b==null?void 0:b.style),p);return y(r.createElement(n,Object.assign({className:O,style:w,ref:S},a),c))});function Oe(e){return e===!1?[!1,!1]:Array.isArray(e)?e:[e]}function le(e,t,o){return e===!0||e===void 0?t:e||o&&t}function Wt(e){const t=document.createElement("em");e.appendChild(t);const o=e.getBoundingClientRect(),n=t.getBoundingClientRect();return e.removeChild(t),o.left>n.left||n.right>o.right||o.top>n.top||n.bottom>o.bottom}const fe=e=>["string","number"].includes(typeof e),Ut=e=>{let{prefixCls:t,copied:o,locale:n,iconOnly:s,tooltips:l,icon:f,tabIndex:c,onCopy:u,loading:p}=e;const a=Oe(l),m=Oe(f),{copied:g,copy:b}=n??{},T=o?g:b,S=le(a[o?1:0],T),C=typeof S=="string"?S:T;return r.createElement(pe,{title:S},r.createElement("button",{type:"button",className:Y(`${t}-copy`,{[`${t}-copy-success`]:o,[`${t}-copy-icon-only`]:s}),onClick:u,"aria-label":C,tabIndex:c},o?le(m[1],r.createElement(pt,null),!0):le(m[0],p?r.createElement(ut,null):r.createElement(yt,null),!0)))},G=r.forwardRef((e,t)=>{let{style:o,children:n}=e;const s=r.useRef(null);return r.useImperativeHandle(t,()=>({isExceed:()=>{const l=s.current;return l.scrollHeight>l.clientHeight},getHeight:()=>s.current.clientHeight})),r.createElement("span",{"aria-hidden":!0,ref:s,style:Object.assign({position:"fixed",display:"block",left:0,top:0,pointerEvents:"none",backgroundColor:"rgba(255, 0, 0, 0.65)"},o)},n)}),Vt=e=>e.reduce((t,o)=>t+(fe(o)?String(o).length:1),0);function we(e,t){let o=0;const n=[];for(let s=0;s<e.length;s+=1){if(o===t)return n;const l=e[s],c=fe(l)?String(l).length:1,u=o+c;if(u>t){const p=t-o;return n.push(String(l).slice(0,p)),n}n.push(l),o=u}return e}const ae=0,ce=1,ue=2,de=3,Re=4,Q={display:"-webkit-box",overflow:"hidden",WebkitBoxOrient:"vertical"};function Ft(e){const{enableMeasure:t,width:o,text:n,children:s,rows:l,expanded:f,miscDeps:c,onEllipsis:u}=e,p=r.useMemo(()=>Le(n),[n]),a=r.useMemo(()=>Vt(p),[n]),m=r.useMemo(()=>s(p,!1),[n]),[g,b]=r.useState(null),T=r.useRef(null),S=r.useRef(null),C=r.useRef(null),y=r.useRef(null),$=r.useRef(null),[H,O]=r.useState(!1),[w,_]=r.useState(ae),[h,z]=r.useState(0),[V,W]=r.useState(null);U(()=>{_(t&&o&&a?ce:ae)},[o,n,l,t,p]),U(()=>{var v,E,x,N;if(w===ce){_(ue);const j=S.current&&getComputedStyle(S.current).whiteSpace;W(j)}else if(w===ue){const j=!!(!((v=C.current)===null||v===void 0)&&v.isExceed());_(j?de:Re),b(j?[0,a]:null),O(j);const L=((E=C.current)===null||E===void 0?void 0:E.getHeight())||0,te=l===1?0:((x=y.current)===null||x===void 0?void 0:x.getHeight())||0,q=((N=$.current)===null||N===void 0?void 0:N.getHeight())||0,ne=Math.max(L,te+q);z(ne+1),u(j)}},[w]);const k=g?Math.ceil((g[0]+g[1])/2):0;U(()=>{var v;const[E,x]=g||[0,0];if(E!==x){const j=(((v=T.current)===null||v===void 0?void 0:v.getHeight())||0)>h;let L=k;x-E===1&&(L=j?E:x),b(j?[E,L]:[L,x])}},[g,k]);const F=r.useMemo(()=>{if(!t)return s(p,!1);if(w!==de||!g||g[0]!==g[1]){const v=s(p,!1);return[Re,ae].includes(w)?v:r.createElement("span",{style:Object.assign(Object.assign({},Q),{WebkitLineClamp:l})},v)}return s(f?p:we(p,g[0]),H)},[f,w,g,p].concat(st(c))),D={width:o,margin:0,padding:0,whiteSpace:V==="nowrap"?"normal":"inherit"};return r.createElement(r.Fragment,null,F,w===ue&&r.createElement(r.Fragment,null,r.createElement(G,{style:Object.assign(Object.assign(Object.assign({},D),Q),{WebkitLineClamp:l}),ref:C},m),r.createElement(G,{style:Object.assign(Object.assign(Object.assign({},D),Q),{WebkitLineClamp:l-1}),ref:y},m),r.createElement(G,{style:Object.assign(Object.assign(Object.assign({},D),Q),{WebkitLineClamp:1}),ref:$},s([],!0))),w===de&&g&&g[0]!==g[1]&&r.createElement(G,{style:Object.assign(Object.assign({},D),{top:400}),ref:T},s(we(p,k),!0)),w===ce&&r.createElement("span",{style:{whiteSpace:"inherit"},ref:S}))}const Kt=e=>{let{enableEllipsis:t,isEllipsis:o,children:n,tooltipProps:s}=e;return!(s!=null&&s.title)||!t?n:r.createElement(pe,Object.assign({open:o?void 0:!1},s),n)};var qt=function(e,t){var o={};for(var n in e)Object.prototype.hasOwnProperty.call(e,n)&&t.indexOf(n)<0&&(o[n]=e[n]);if(e!=null&&typeof Object.getOwnPropertySymbols=="function")for(var s=0,n=Object.getOwnPropertySymbols(e);s<n.length;s++)t.indexOf(n[s])<0&&Object.prototype.propertyIsEnumerable.call(e,n[s])&&(o[n[s]]=e[n[s]]);return o};function Xt(e,t){let{mark:o,code:n,underline:s,delete:l,strong:f,keyboard:c,italic:u}=e,p=t;function a(m,g){g&&(p=r.createElement(m,{},p))}return a("strong",f),a("u",s),a("del",l),a("code",n),a("mark",o),a("kbd",c),a("i",u),p}const Jt="...",Z=r.forwardRef((e,t)=>{var o;const{prefixCls:n,className:s,style:l,type:f,disabled:c,children:u,ellipsis:p,editable:a,copyable:m,component:g,title:b}=e,T=qt(e,["prefixCls","className","style","type","disabled","children","ellipsis","editable","copyable","component","title"]),{getPrefixCls:S,direction:C}=r.useContext($e),[y]=at("Text"),$=r.useRef(null),H=r.useRef(null),O=S("typography",n),w=Me(T,["mark","code","delete","underline","strong","keyboard","italic"]),[_,h]=ie(a),[z,V]=xe(!1,{value:h.editing}),{triggerType:W=["icon"]}=h,k=i=>{var d;i&&((d=h.onStart)===null||d===void 0||d.call(h)),V(i)},F=Ht(z);U(()=>{var i;!z&&F&&((i=H.current)===null||i===void 0||i.focus())},[z]);const D=i=>{i==null||i.preventDefault(),k(!0)},v=i=>{var d;(d=h.onChange)===null||d===void 0||d.call(h,i),k(!1)},E=()=>{var i;(i=h.onCancel)===null||i===void 0||i.call(h),k(!1)},[x,N]=ie(m),{copied:j,copyLoading:L,onClick:te}=At({copyConfig:N,children:u}),[q,ne]=r.useState(!1),[me,De]=r.useState(!1),[ge,Ne]=r.useState(!1),[ye,Ae]=r.useState(!1),[He,ze]=r.useState(!0),[B,R]=ie(p,{expandable:!1,symbol:i=>i?y==null?void 0:y.collapse:y==null?void 0:y.expand}),[A,Be]=xe(R.defaultExpanded||!1,{value:R.expanded}),I=B&&(!A||R.expandable==="collapsible"),{rows:K=1}=R,X=r.useMemo(()=>I&&(R.suffix!==void 0||R.onEllipsis||R.expandable||_||x),[I,R,_,x]);U(()=>{B&&!X&&(ne(Se("webkitLineClamp")),De(Se("textOverflow")))},[X,B]);const[M,We]=r.useState(I),be=r.useMemo(()=>X?!1:K===1?me:q,[X,me,q]);U(()=>{We(be&&I)},[be,I]);const ve=I&&(M?ye:ge),Ue=I&&K===1&&M,oe=I&&K>1&&M,Ve=(i,d)=>{var P;Be(d.expanded),(P=R.onExpand)===null||P===void 0||P.call(R,i,d)},[Ee,Fe]=r.useState(0),Ke=i=>{let{offsetWidth:d}=i;Fe(d)},qe=i=>{var d;Ne(i),ge!==i&&((d=R.onEllipsis)===null||d===void 0||d.call(R,i))};r.useEffect(()=>{const i=$.current;if(B&&M&&i){const d=Wt(i);ye!==d&&Ae(d)}},[B,M,u,oe,He,Ee]),r.useEffect(()=>{const i=$.current;if(typeof IntersectionObserver>"u"||!i||!M||!I)return;const d=new IntersectionObserver(()=>{ze(!!i.offsetParent)});return d.observe(i),()=>{d.disconnect()}},[M,I]);const re=zt(R.tooltip,h.text,u),J=r.useMemo(()=>{if(!(!B||M))return[h.text,u,b,re.title].find(fe)},[B,M,b,re.title,ve]);if(z)return r.createElement(It,{value:(o=h.text)!==null&&o!==void 0?o:typeof u=="string"?u:"",onSave:v,onCancel:E,onEnd:h.onEnd,prefixCls:O,className:s,style:l,direction:C,component:g,maxLength:h.maxLength,autoSize:h.autoSize,enterIcon:h.enterIcon});const Xe=()=>{const{expandable:i,symbol:d}=R;return i?r.createElement("button",{type:"button",key:"expand",className:`${O}-${A?"collapse":"expand"}`,onClick:P=>Ve(P,{expanded:!A}),"aria-label":A?y.collapse:y==null?void 0:y.expand},typeof d=="function"?d(A):d):null},Je=()=>{if(!_)return;const{icon:i,tooltip:d,tabIndex:P}=h,se=Le(d)[0]||(y==null?void 0:y.edit),Ze=typeof se=="string"?se:"";return W.includes("icon")?r.createElement(pe,{key:"edit",title:d===!1?"":se},r.createElement("button",{type:"button",ref:H,className:`${O}-edit`,onClick:D,"aria-label":Ze,tabIndex:P},i||r.createElement(it,{role:"button"}))):null},Ge=()=>x?r.createElement(Ut,Object.assign({key:"copy"},N,{prefixCls:O,copied:j,locale:y,onCopy:te,loading:L,iconOnly:u==null})):null,Qe=i=>[i&&Xe(),Je(),Ge()],Ye=i=>[i&&!A&&r.createElement("span",{"aria-hidden":!0,key:"ellipsis"},Jt),R.suffix,Qe(i)];return r.createElement(lt,{onResize:Ke,disabled:!I},i=>r.createElement(Kt,{tooltipProps:re,enableEllipsis:I,isEllipsis:ve},r.createElement(ke,Object.assign({className:Y({[`${O}-${f}`]:f,[`${O}-disabled`]:c,[`${O}-ellipsis`]:B,[`${O}-ellipsis-single-line`]:Ue,[`${O}-ellipsis-multiple-line`]:oe},s),prefixCls:n,style:Object.assign(Object.assign({},l),{WebkitLineClamp:oe?K:void 0}),component:g,ref:_e(i,$,t),direction:C,onClick:W.includes("text")?D:void 0,"aria-label":J==null?void 0:J.toString(),title:b},w),r.createElement(Ft,{enableMeasure:I&&!M,text:u,rows:K,width:Ee,onEllipsis:qe,expanded:A,miscDeps:[j,A,L,_,x,y]},(d,P)=>Xt(e,r.createElement(r.Fragment,null,d.length>0&&P&&!A&&J?r.createElement("span",{key:"show-content","aria-hidden":!0},d):d,Ye(P)))))))});var Gt=function(e,t){var o={};for(var n in e)Object.prototype.hasOwnProperty.call(e,n)&&t.indexOf(n)<0&&(o[n]=e[n]);if(e!=null&&typeof Object.getOwnPropertySymbols=="function")for(var s=0,n=Object.getOwnPropertySymbols(e);s<n.length;s++)t.indexOf(n[s])<0&&Object.prototype.propertyIsEnumerable.call(e,n[s])&&(o[n[s]]=e[n[s]]);return o};const Qt=r.forwardRef((e,t)=>{var{ellipsis:o,rel:n}=e,s=Gt(e,["ellipsis","rel"]);const l=Object.assign(Object.assign({},s),{rel:n===void 0&&s.target==="_blank"?"noopener noreferrer":n});return delete l.navigate,r.createElement(Z,Object.assign({},l,{ref:t,ellipsis:!!o,component:"a"}))}),Yt=r.forwardRef((e,t)=>r.createElement(Z,Object.assign({ref:t},e,{component:"div"})));var Zt=function(e,t){var o={};for(var n in e)Object.prototype.hasOwnProperty.call(e,n)&&t.indexOf(n)<0&&(o[n]=e[n]);if(e!=null&&typeof Object.getOwnPropertySymbols=="function")for(var s=0,n=Object.getOwnPropertySymbols(e);s<n.length;s++)t.indexOf(n[s])<0&&Object.prototype.propertyIsEnumerable.call(e,n[s])&&(o[n[s]]=e[n[s]]);return o};const en=(e,t)=>{var{ellipsis:o}=e,n=Zt(e,["ellipsis"]);const s=r.useMemo(()=>o&&typeof o=="object"?Me(o,["expandable","rows"]):o,[o]);return r.createElement(Z,Object.assign({ref:t},n,{ellipsis:s,component:"span"}))},tn=r.forwardRef(en);var nn=function(e,t){var o={};for(var n in e)Object.prototype.hasOwnProperty.call(e,n)&&t.indexOf(n)<0&&(o[n]=e[n]);if(e!=null&&typeof Object.getOwnPropertySymbols=="function")for(var s=0,n=Object.getOwnPropertySymbols(e);s<n.length;s++)t.indexOf(n[s])<0&&Object.prototype.propertyIsEnumerable.call(e,n[s])&&(o[n[s]]=e[n[s]]);return o};const on=[1,2,3,4,5],rn=r.forwardRef((e,t)=>{const{level:o=1}=e,n=nn(e,["level"]),s=on.includes(o)?`h${o}`:"h1";return r.createElement(Z,Object.assign({ref:t},n,{component:s}))}),ee=ke;ee.Text=tn;ee.Link=Qt;ee.Title=rn;ee.Paragraph=Yt;export{ee as T};
