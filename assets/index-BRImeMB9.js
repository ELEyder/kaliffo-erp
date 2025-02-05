import{n as V,o as X,y as G,r as a,C as w,c as S,K as U,x as Y,Z as R}from"./index-DnZSuapv.js";import{u as D}from"./useMergedState-xnIRtK6W.js";import{o as Z}from"./useSize-DL9WfM8p.js";import{g as q}from"./EllipsisOutlined-BC2kcC9O.js";import{c as J,B as Q,a as ee}from"./button-DxAvYtf7.js";import{i as te,c as ne,P as oe,g as re,d as ae,e as le,T as ie}from"./index-OoAlQgr1.js";import{A as se}from"./ActionButton-HZPJWirw.js";import{u as ce}from"./responsiveObserver-P31G7zPC.js";const h=e=>e?typeof e=="function"?e():e:null,de=e=>{const{componentCls:n,popoverColor:o,titleMinWidth:t,fontWeightStrong:r,innerPadding:l,boxShadowSecondary:c,colorTextHeading:i,borderRadiusLG:s,zIndexPopup:p,titleMarginBottom:d,colorBgElevated:m,popoverBg:g,titleBorderBottom:v,innerContentPadding:O,titlePadding:C}=e;return[{[n]:Object.assign(Object.assign({},G(e)),{position:"absolute",top:0,left:{_skip_check_:!0,value:0},zIndex:p,fontWeight:"normal",whiteSpace:"normal",textAlign:"start",cursor:"auto",userSelect:"text","--valid-offset-x":"var(--arrow-offset-horizontal, var(--arrow-x))",transformOrigin:["var(--valid-offset-x, 50%)","var(--arrow-y, 50%)"].join(" "),"--antd-arrow-background-color":m,width:"max-content",maxWidth:"100vw","&-rtl":{direction:"rtl"},"&-hidden":{display:"none"},[`${n}-content`]:{position:"relative"},[`${n}-inner`]:{backgroundColor:g,backgroundClip:"padding-box",borderRadius:s,boxShadow:c,padding:l},[`${n}-title`]:{minWidth:t,marginBottom:d,color:i,fontWeight:r,borderBottom:v,padding:C},[`${n}-inner-content`]:{color:o,padding:O}})},ne(e,"var(--antd-arrow-background-color)"),{[`${n}-pure`]:{position:"relative",maxWidth:"none",margin:e.sizePopupArrow,display:"inline-block",[`${n}-content`]:{display:"inline-block"}}}]},pe=e=>{const{componentCls:n}=e;return{[n]:oe.map(o=>{const t=e[`${o}6`];return{[`&${n}-${o}`]:{"--antd-arrow-background-color":t,[`${n}-inner`]:{backgroundColor:t},[`${n}-arrow`]:{background:"transparent"}}}})}},me=e=>{const{lineWidth:n,controlHeight:o,fontHeight:t,padding:r,wireframe:l,zIndexPopupBase:c,borderRadiusLG:i,marginXS:s,lineType:p,colorSplit:d,paddingSM:m}=e,g=o-t,v=g/2,O=g/2-n,C=r;return Object.assign(Object.assign(Object.assign({titleMinWidth:177,zIndexPopup:c+30},re(e)),ae({contentRadius:i,limitVerticalRadius:!0})),{innerPadding:l?0:12,titleMarginBottom:l?0:s,titlePadding:l?`${v}px ${C}px ${O}px`:0,titleBorderBottom:l?`${n}px ${p} ${d}`:"none",innerContentPadding:l?`${m}px ${C}px`:0})},M=V("Popover",e=>{const{colorBgElevated:n,colorText:o}=e,t=X(e,{popoverBg:n,popoverColor:o});return[de(t),pe(t),te(t,"zoom-big")]},me,{resetStyle:!1,deprecatedTokens:[["width","titleMinWidth"],["minWidth","titleMinWidth"]]});var ue=function(e,n){var o={};for(var t in e)Object.prototype.hasOwnProperty.call(e,t)&&n.indexOf(t)<0&&(o[t]=e[t]);if(e!=null&&typeof Object.getOwnPropertySymbols=="function")for(var r=0,t=Object.getOwnPropertySymbols(e);r<t.length;r++)n.indexOf(t[r])<0&&Object.prototype.propertyIsEnumerable.call(e,t[r])&&(o[t[r]]=e[t[r]]);return o};const A=e=>{let{title:n,content:o,prefixCls:t}=e;return!n&&!o?null:a.createElement(a.Fragment,null,n&&a.createElement("div",{className:`${t}-title`},n),o&&a.createElement("div",{className:`${t}-inner-content`},o))},fe=e=>{const{hashId:n,prefixCls:o,className:t,style:r,placement:l="top",title:c,content:i,children:s}=e,p=h(c),d=h(i),m=S(n,o,`${o}-pure`,`${o}-placement-${l}`,t);return a.createElement("div",{className:m,style:r},a.createElement("div",{className:`${o}-arrow`}),a.createElement(le,Object.assign({},e,{className:n,prefixCls:o}),s||a.createElement(A,{prefixCls:o,title:p,content:d})))},H=e=>{const{prefixCls:n,className:o}=e,t=ue(e,["prefixCls","className"]),{getPrefixCls:r}=a.useContext(w),l=r("popover",n),[c,i,s]=M(l);return c(a.createElement(fe,Object.assign({},t,{prefixCls:l,hashId:i,className:S(o,s)})))};var ge=function(e,n){var o={};for(var t in e)Object.prototype.hasOwnProperty.call(e,t)&&n.indexOf(t)<0&&(o[t]=e[t]);if(e!=null&&typeof Object.getOwnPropertySymbols=="function")for(var r=0,t=Object.getOwnPropertySymbols(e);r<t.length;r++)n.indexOf(t[r])<0&&Object.prototype.propertyIsEnumerable.call(e,t[r])&&(o[t[r]]=e[t[r]]);return o};const ve=a.forwardRef((e,n)=>{var o,t;const{prefixCls:r,title:l,content:c,overlayClassName:i,placement:s="top",trigger:p="hover",children:d,mouseEnterDelay:m=.1,mouseLeaveDelay:g=.1,onOpenChange:v,overlayStyle:O={}}=e,C=ge(e,["prefixCls","title","content","overlayClassName","placement","trigger","children","mouseEnterDelay","mouseLeaveDelay","onOpenChange","overlayStyle"]),{getPrefixCls:y}=a.useContext(w),x=y("popover",r),[P,N,j]=M(x),B=y(),$=S(i,N,j),[k,I]=D(!1,{value:(o=e.open)!==null&&o!==void 0?o:e.visible,defaultValue:(t=e.defaultOpen)!==null&&t!==void 0?t:e.defaultVisible}),u=(b,E)=>{I(b,!0),v==null||v(b,E)},f=b=>{b.keyCode===U.ESC&&u(!1,b)},T=b=>{u(b)},z=h(l),W=h(c);return P(a.createElement(ie,Object.assign({placement:s,trigger:p,mouseEnterDelay:m,mouseLeaveDelay:g,overlayStyle:O},C,{prefixCls:x,overlayClassName:$,ref:n,open:k,onOpenChange:T,overlay:z||W?a.createElement(A,{prefixCls:x,title:z,content:W}):null,transitionName:q(B,"zoom-big",C.transitionName),"data-popover-inject":!0}),J(d,{onKeyDown:b=>{var E,_;a.isValidElement(d)&&((_=d==null?void 0:(E=d.props).onKeyDown)===null||_===void 0||_.call(E,b)),f(b)}})))}),L=ve;L._InternalPanelDoNotUseOrYouWillBeFired=H;const Ce=e=>{const{componentCls:n,iconCls:o,antCls:t,zIndexPopup:r,colorText:l,colorWarning:c,marginXXS:i,marginXS:s,fontSize:p,fontWeightStrong:d,colorTextHeading:m}=e;return{[n]:{zIndex:r,[`&${t}-popover`]:{fontSize:p},[`${n}-message`]:{marginBottom:s,display:"flex",flexWrap:"nowrap",alignItems:"start",[`> ${n}-message-icon ${o}`]:{color:c,fontSize:p,lineHeight:1,marginInlineEnd:s},[`${n}-title`]:{fontWeight:d,color:m,"&:only-child":{fontWeight:"normal"}},[`${n}-description`]:{marginTop:i,color:l}},[`${n}-buttons`]:{textAlign:"end",whiteSpace:"nowrap",button:{marginInlineStart:s}}}}},ye=e=>{const{zIndexPopupBase:n}=e;return{zIndexPopup:n+60}},F=V("Popconfirm",e=>Ce(e),ye,{resetStyle:!1});var xe=function(e,n){var o={};for(var t in e)Object.prototype.hasOwnProperty.call(e,t)&&n.indexOf(t)<0&&(o[t]=e[t]);if(e!=null&&typeof Object.getOwnPropertySymbols=="function")for(var r=0,t=Object.getOwnPropertySymbols(e);r<t.length;r++)n.indexOf(t[r])<0&&Object.prototype.propertyIsEnumerable.call(e,t[r])&&(o[t[r]]=e[t[r]]);return o};const K=e=>{const{prefixCls:n,okButtonProps:o,cancelButtonProps:t,title:r,description:l,cancelText:c,okText:i,okType:s="primary",icon:p=a.createElement(R,null),showCancel:d=!0,close:m,onConfirm:g,onCancel:v,onPopupClick:O}=e,{getPrefixCls:C}=a.useContext(w),[y]=ce("Popconfirm",Y.Popconfirm),x=h(r),P=h(l);return a.createElement("div",{className:`${n}-inner-content`,onClick:O},a.createElement("div",{className:`${n}-message`},p&&a.createElement("span",{className:`${n}-message-icon`},p),a.createElement("div",{className:`${n}-message-text`},x&&a.createElement("div",{className:`${n}-title`},x),P&&a.createElement("div",{className:`${n}-description`},P))),a.createElement("div",{className:`${n}-buttons`},d&&a.createElement(Q,Object.assign({onClick:v,size:"small"},t),c||(y==null?void 0:y.cancelText)),a.createElement(se,{buttonProps:Object.assign(Object.assign({size:"small"},ee(s)),o),actionFn:g,close:m,prefixCls:C("btn"),quitOnNullishReturnValue:!0,emitEvent:!0},i||(y==null?void 0:y.okText))))},be=e=>{const{prefixCls:n,placement:o,className:t,style:r}=e,l=xe(e,["prefixCls","placement","className","style"]),{getPrefixCls:c}=a.useContext(w),i=c("popconfirm",n),[s]=F(i);return s(a.createElement(H,{placement:o,className:S(i,t),style:r,content:a.createElement(K,Object.assign({prefixCls:i},l))}))};var Oe=function(e,n){var o={};for(var t in e)Object.prototype.hasOwnProperty.call(e,t)&&n.indexOf(t)<0&&(o[t]=e[t]);if(e!=null&&typeof Object.getOwnPropertySymbols=="function")for(var r=0,t=Object.getOwnPropertySymbols(e);r<t.length;r++)n.indexOf(t[r])<0&&Object.prototype.propertyIsEnumerable.call(e,t[r])&&(o[t[r]]=e[t[r]]);return o};const Pe=a.forwardRef((e,n)=>{var o,t;const{prefixCls:r,placement:l="top",trigger:c="click",okType:i="primary",icon:s=a.createElement(R,null),children:p,overlayClassName:d,onOpenChange:m,onVisibleChange:g}=e,v=Oe(e,["prefixCls","placement","trigger","okType","icon","children","overlayClassName","onOpenChange","onVisibleChange"]),{getPrefixCls:O}=a.useContext(w),[C,y]=D(!1,{value:(o=e.open)!==null&&o!==void 0?o:e.visible,defaultValue:(t=e.defaultOpen)!==null&&t!==void 0?t:e.defaultVisible}),x=(u,f)=>{y(u,!0),g==null||g(u),m==null||m(u,f)},P=u=>{x(!1,u)},N=u=>{var f;return(f=e.onConfirm)===null||f===void 0?void 0:f.call(void 0,u)},j=u=>{var f;x(!1,u),(f=e.onCancel)===null||f===void 0||f.call(void 0,u)},B=(u,f)=>{const{disabled:T=!1}=e;T||x(u,f)},$=O("popconfirm",r),k=S($,d),[I]=F($);return I(a.createElement(L,Object.assign({},Z(v,["title"]),{trigger:c,placement:l,onOpenChange:B,open:C,ref:n,overlayClassName:k,content:a.createElement(K,Object.assign({okType:i,icon:s},e,{prefixCls:$,close:P,onConfirm:N,onCancel:j})),"data-popover-inject":!0}),p))}),he=Pe;he._InternalPanelDoNotUseOrYouWillBeFired=be;export{he as P};
