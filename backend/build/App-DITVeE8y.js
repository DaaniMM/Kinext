import{j as t,L as O,z as Ue,r as l,d1 as j,gx as pe,bN as ze,eO as He,gy as We,ae as Ke,gz as Ze,gA as qe,gB as Ye,gC as Je,gD as Qe,gE as Xe,gF as te,a as D,Z as A,I as T,U as oe,db as et,o as ge,dA as me,l as v,d8 as tt,d9 as ot,T as E,dV as he,eD as K,bH as xe,eF as nt,eH as rt,eC as st,eE as at,eG as ve,g8 as it,q as lt,p as ct,dF as ut,gG as dt,af as ft,fE as pt,ge as gt,gf as mt,g0 as ht,n as xt,P as ne,R as vt,J as re}from"./strapi-D0ivxu6x.js";import{S as bt}from"./SearchInput-BlCSDN9b.js";const Ct=()=>t.jsxs(O.Root,{children:[t.jsx(O.Header,{title:"AI Generation",primaryAction:t.jsx(Ue,{children:"TODO: Generate"})}),t.jsx(O.Content,{children:"TODO: AI ListView"})]});function J(e,o=[]){let n=[];function s(a,c){const i=l.createContext(c),d=n.length;n=[...n,c];const g=f=>{const{scope:y,children:m,...b}=f,C=y?.[e]?.[d]||i,p=l.useMemo(()=>b,Object.values(b));return t.jsx(C.Provider,{value:p,children:m})};g.displayName=a+"Provider";function u(f,y){const m=y?.[e]?.[d]||i,b=l.useContext(m);if(b)return b;if(c!==void 0)return c;throw new Error(`\`${f}\` must be used within \`${a}\``)}return[g,u]}const r=()=>{const a=n.map(c=>l.createContext(c));return function(i){const d=i?.[e]||a;return l.useMemo(()=>({[`__scope${e}`]:{...i,[e]:d}}),[i,d])}};return r.scopeName=e,[s,jt(r,...o)]}function jt(...e){const o=e[0];if(e.length===1)return o;const n=()=>{const s=e.map(r=>({useScope:r(),scopeName:r.scopeName}));return function(a){const c=s.reduce((i,{useScope:d,scopeName:g})=>{const f=d(a)[`__scope${g}`];return{...i,...f}},{});return l.useMemo(()=>({[`__scope${o.scopeName}`]:c}),[c])}};return n.scopeName=o.scopeName,n}function se(e,o){if(typeof e=="function")return e(o);e!=null&&(e.current=o)}function be(...e){return o=>{let n=!1;const s=e.map(r=>{const a=se(r,o);return!n&&typeof a=="function"&&(n=!0),a});if(n)return()=>{for(let r=0;r<s.length;r++){const a=s[r];typeof a=="function"?a():se(e[r],null)}}}}function Z(...e){return l.useCallback(be(...e),e)}function q(e){const o=yt(e),n=l.forwardRef((s,r)=>{const{children:a,...c}=s,i=l.Children.toArray(a),d=i.find(wt);if(d){const g=d.props.children,u=i.map(f=>f===d?l.Children.count(g)>1?l.Children.only(null):l.isValidElement(g)?g.props.children:null:f);return t.jsx(o,{...c,ref:r,children:l.isValidElement(g)?l.cloneElement(g,void 0,u):null})}return t.jsx(o,{...c,ref:r,children:a})});return n.displayName=`${e}.Slot`,n}function yt(e){const o=l.forwardRef((n,s)=>{const{children:r,...a}=n;if(l.isValidElement(r)){const c=St(r),i=Rt(a,r.props);return r.type!==l.Fragment&&(i.ref=s?be(s,c):c),l.cloneElement(r,i)}return l.Children.count(r)>1?l.Children.only(null):null});return o.displayName=`${e}.SlotClone`,o}var It=Symbol("radix.slottable");function wt(e){return l.isValidElement(e)&&typeof e.type=="function"&&"__radixId"in e.type&&e.type.__radixId===It}function Rt(e,o){const n={...o};for(const s in o){const r=e[s],a=o[s];/^on[A-Z]/.test(s)?r&&a?n[s]=(...i)=>{const d=a(...i);return r(...i),d}:r&&(n[s]=r):s==="style"?n[s]={...r,...a}:s==="className"&&(n[s]=[r,a].filter(Boolean).join(" "))}return{...e,...n}}function St(e){let o=Object.getOwnPropertyDescriptor(e.props,"ref")?.get,n=o&&"isReactWarning"in o&&o.isReactWarning;return n?e.ref:(o=Object.getOwnPropertyDescriptor(e,"ref")?.get,n=o&&"isReactWarning"in o&&o.isReactWarning,n?e.props.ref:e.props.ref||e.ref)}var Tt=["a","button","div","form","h2","h3","img","input","label","li","nav","ol","p","select","span","svg","ul"],L=Tt.reduce((e,o)=>{const n=q(`Primitive.${o}`),s=l.forwardRef((r,a)=>{const{asChild:c,...i}=r,d=c?n:o;return typeof window<"u"&&(window[Symbol.for("radix-ui")]=!0),t.jsx(d,{...i,ref:a})});return s.displayName=`Primitive.${o}`,{...e,[o]:s}},{});function F(e,o,{checkForDefaultPrevented:n=!0}={}){return function(r){if(e?.(r),n===!1||!r.defaultPrevented)return o?.(r)}}function Et(e){const o=e+"CollectionProvider",[n,s]=J(o),[r,a]=n(o,{collectionRef:{current:null},itemMap:new Map}),c=C=>{const{scope:p,children:I}=C,S=j.useRef(null),h=j.useRef(new Map).current;return t.jsx(r,{scope:p,itemMap:h,collectionRef:S,children:I})};c.displayName=o;const i=e+"CollectionSlot",d=q(i),g=j.forwardRef((C,p)=>{const{scope:I,children:S}=C,h=a(i,I),w=Z(p,h.collectionRef);return t.jsx(d,{ref:w,children:S})});g.displayName=i;const u=e+"CollectionItemSlot",f="data-radix-collection-item",y=q(u),m=j.forwardRef((C,p)=>{const{scope:I,children:S,...h}=C,w=j.useRef(null),$=Z(p,w),G=a(u,I);return j.useEffect(()=>(G.itemMap.set(w,{ref:w,...h}),()=>void G.itemMap.delete(w))),t.jsx(y,{[f]:"",ref:$,children:S})});m.displayName=u;function b(C){const p=a(e+"CollectionConsumer",C);return j.useCallback(()=>{const S=p.collectionRef.current;if(!S)return[];const h=Array.from(S.querySelectorAll(`[${f}]`));return Array.from(p.itemMap.values()).sort((G,V)=>h.indexOf(G.ref.current)-h.indexOf(V.ref.current))},[p.collectionRef,p.itemMap])}return[{Provider:c,Slot:g,ItemSlot:m},b,s]}var Ce=globalThis?.document?l.useLayoutEffect:()=>{},At=pe[" useId ".trim().toString()]||(()=>{}),Dt=0;function Pt(e){const[o,n]=l.useState(At());return Ce(()=>{n(s=>s??String(Dt++))},[e]),o?`radix-${o}`:""}function Mt(e){const o=l.useRef(e);return l.useEffect(()=>{o.current=e}),l.useMemo(()=>(...n)=>o.current?.(...n),[])}var Ft=pe[" useInsertionEffect ".trim().toString()]||Ce;function z({prop:e,defaultProp:o,onChange:n=()=>{},caller:s}){const[r,a,c]=$t({defaultProp:o,onChange:n}),i=e!==void 0,d=i?e:r;{const u=l.useRef(e!==void 0);l.useEffect(()=>{const f=u.current;f!==i&&console.warn(`${s} is changing from ${f?"controlled":"uncontrolled"} to ${i?"controlled":"uncontrolled"}. Components should not switch from controlled to uncontrolled (or vice versa). Decide between using a controlled or uncontrolled value for the lifetime of the component.`),u.current=i},[i,s])}const g=l.useCallback(u=>{if(i){const f=Gt(u)?u(e):u;f!==e&&c.current?.(f)}else a(u)},[i,e,a,c]);return[d,g]}function $t({defaultProp:e,onChange:o}){const[n,s]=l.useState(e),r=l.useRef(n),a=l.useRef(o);return Ft(()=>{a.current=o},[o]),l.useEffect(()=>{r.current!==n&&(a.current?.(n),r.current=n)},[n,r]),[n,s,a]}function Gt(e){return typeof e=="function"}var _t=l.createContext(void 0);function je(e){const o=l.useContext(_t);return e||o||"ltr"}var W="rovingFocusGroup.onEntryFocus",Ot={bubbles:!1,cancelable:!0},k="RovingFocusGroup",[Y,ye,Nt]=Et(k),[Lt,Ie]=J(k,[Nt]),[kt,Vt]=Lt(k),we=l.forwardRef((e,o)=>t.jsx(Y.Provider,{scope:e.__scopeRovingFocusGroup,children:t.jsx(Y.Slot,{scope:e.__scopeRovingFocusGroup,children:t.jsx(Bt,{...e,ref:o})})}));we.displayName=k;var Bt=l.forwardRef((e,o)=>{const{__scopeRovingFocusGroup:n,orientation:s,loop:r=!1,dir:a,currentTabStopId:c,defaultCurrentTabStopId:i,onCurrentTabStopIdChange:d,onEntryFocus:g,preventScrollOnEntryFocus:u=!1,...f}=e,y=l.useRef(null),m=Z(o,y),b=je(a),[C,p]=z({prop:c,defaultProp:i??null,onChange:d,caller:k}),[I,S]=l.useState(!1),h=Mt(g),w=ye(n),$=l.useRef(!1),[G,V]=l.useState(0);return l.useEffect(()=>{const R=y.current;if(R)return R.addEventListener(W,h),()=>R.removeEventListener(W,h)},[h]),t.jsx(kt,{scope:n,orientation:s,dir:b,loop:r,currentTabStopId:C,onItemFocus:l.useCallback(R=>p(R),[p]),onItemShiftTab:l.useCallback(()=>S(!0),[]),onFocusableItemAdd:l.useCallback(()=>V(R=>R+1),[]),onFocusableItemRemove:l.useCallback(()=>V(R=>R-1),[]),children:t.jsx(L.div,{tabIndex:I||G===0?-1:0,"data-orientation":s,...f,ref:m,style:{outline:"none",...e.style},onMouseDown:F(e.onMouseDown,()=>{$.current=!0}),onFocus:F(e.onFocus,R=>{const Le=!$.current;if(R.target===R.currentTarget&&Le&&!I){const ee=new CustomEvent(W,Ot);if(R.currentTarget.dispatchEvent(ee),!ee.defaultPrevented){const H=w().filter(M=>M.focusable),ke=H.find(M=>M.active),Ve=H.find(M=>M.id===C),Be=[ke,Ve,...H].filter(Boolean).map(M=>M.ref.current);Te(Be,u)}}$.current=!1}),onBlur:F(e.onBlur,()=>S(!1))})})}),Re="RovingFocusGroupItem",Se=l.forwardRef((e,o)=>{const{__scopeRovingFocusGroup:n,focusable:s=!0,active:r=!1,tabStopId:a,children:c,...i}=e,d=Pt(),g=a||d,u=Vt(Re,n),f=u.currentTabStopId===g,y=ye(n),{onFocusableItemAdd:m,onFocusableItemRemove:b,currentTabStopId:C}=u;return l.useEffect(()=>{if(s)return m(),()=>b()},[s,m,b]),t.jsx(Y.ItemSlot,{scope:n,id:g,focusable:s,active:r,children:t.jsx(L.span,{tabIndex:f?0:-1,"data-orientation":u.orientation,...i,ref:o,onMouseDown:F(e.onMouseDown,p=>{s?u.onItemFocus(g):p.preventDefault()}),onFocus:F(e.onFocus,()=>u.onItemFocus(g)),onKeyDown:F(e.onKeyDown,p=>{if(p.key==="Tab"&&p.shiftKey){u.onItemShiftTab();return}if(p.target!==p.currentTarget)return;const I=Ht(p,u.orientation,u.dir);if(I!==void 0){if(p.metaKey||p.ctrlKey||p.altKey||p.shiftKey)return;p.preventDefault();let h=y().filter(w=>w.focusable).map(w=>w.ref.current);if(I==="last")h.reverse();else if(I==="prev"||I==="next"){I==="prev"&&h.reverse();const w=h.indexOf(p.currentTarget);h=u.loop?Wt(h,w+1):h.slice(w+1)}setTimeout(()=>Te(h))}}),children:typeof c=="function"?c({isCurrentTabStop:f,hasTabStop:C!=null}):c})})});Se.displayName=Re;var Ut={ArrowLeft:"prev",ArrowUp:"prev",ArrowRight:"next",ArrowDown:"next",PageUp:"first",Home:"first",PageDown:"last",End:"last"};function zt(e,o){return o!=="rtl"?e:e==="ArrowLeft"?"ArrowRight":e==="ArrowRight"?"ArrowLeft":e}function Ht(e,o,n){const s=zt(e.key,n);if(!(o==="vertical"&&["ArrowLeft","ArrowRight"].includes(s))&&!(o==="horizontal"&&["ArrowUp","ArrowDown"].includes(s)))return Ut[s]}function Te(e,o=!1){const n=document.activeElement;for(const s of e)if(s===n||(s.focus({preventScroll:o}),document.activeElement!==n))return}function Wt(e,o){return e.map((n,s)=>e[(o+s)%e.length])}var Kt=we,Zt=Se,Ee="Toggle",Ae=l.forwardRef((e,o)=>{const{pressed:n,defaultPressed:s,onPressedChange:r,...a}=e,[c,i]=z({prop:n,onChange:r,defaultProp:s??!1,caller:Ee});return t.jsx(L.button,{type:"button","aria-pressed":c,"data-state":c?"on":"off","data-disabled":e.disabled?"":void 0,...a,ref:o,onClick:F(e.onClick,()=>{e.disabled||i(!c)})})});Ae.displayName=Ee;var P="ToggleGroup",[De]=J(P,[Ie]),Pe=Ie(),Q=j.forwardRef((e,o)=>{const{type:n,...s}=e;if(n==="single"){const r=s;return t.jsx(qt,{...r,ref:o})}if(n==="multiple"){const r=s;return t.jsx(Yt,{...r,ref:o})}throw new Error(`Missing prop \`type\` expected on \`${P}\``)});Q.displayName=P;var[Me,Fe]=De(P),qt=j.forwardRef((e,o)=>{const{value:n,defaultValue:s,onValueChange:r=()=>{},...a}=e,[c,i]=z({prop:n,defaultProp:s??"",onChange:r,caller:P});return t.jsx(Me,{scope:e.__scopeToggleGroup,type:"single",value:j.useMemo(()=>c?[c]:[],[c]),onItemActivate:i,onItemDeactivate:j.useCallback(()=>i(""),[i]),children:t.jsx($e,{...a,ref:o})})}),Yt=j.forwardRef((e,o)=>{const{value:n,defaultValue:s,onValueChange:r=()=>{},...a}=e,[c,i]=z({prop:n,defaultProp:s??[],onChange:r,caller:P}),d=j.useCallback(u=>i((f=[])=>[...f,u]),[i]),g=j.useCallback(u=>i((f=[])=>f.filter(y=>y!==u)),[i]);return t.jsx(Me,{scope:e.__scopeToggleGroup,type:"multiple",value:c,onItemActivate:d,onItemDeactivate:g,children:t.jsx($e,{...a,ref:o})})});Q.displayName=P;var[Jt,Qt]=De(P),$e=j.forwardRef((e,o)=>{const{__scopeToggleGroup:n,disabled:s=!1,rovingFocus:r=!0,orientation:a,dir:c,loop:i=!0,...d}=e,g=Pe(n),u=je(c),f={role:"group",dir:u,...d};return t.jsx(Jt,{scope:n,rovingFocus:r,disabled:s,children:r?t.jsx(Kt,{asChild:!0,...g,orientation:a,dir:u,loop:i,children:t.jsx(L.div,{...f,ref:o})}):t.jsx(L.div,{...f,ref:o})})}),U="ToggleGroupItem",Ge=j.forwardRef((e,o)=>{const n=Fe(U,e.__scopeToggleGroup),s=Qt(U,e.__scopeToggleGroup),r=Pe(e.__scopeToggleGroup),a=n.value.includes(e.value),c=s.disabled||e.disabled,i={...e,pressed:a,disabled:c},d=j.useRef(null);return s.rovingFocus?t.jsx(Zt,{asChild:!0,...r,focusable:!c,active:a,ref:d,children:t.jsx(ae,{...i,ref:o})}):t.jsx(ae,{...i,ref:o})});Ge.displayName=U;var ae=j.forwardRef((e,o)=>{const{__scopeToggleGroup:n,value:s,...r}=e,a=Fe(U,n),c={role:"radio","aria-checked":e.pressed,"aria-pressed":void 0},i=a.type==="single"?c:void 0;return t.jsx(Ae,{...i,...r,ref:o,onPressedChange:d=>{d?a.onItemActivate(s):a.onItemDeactivate(s)}})}),Xt=Q,eo=Ge;const _e=ze.enhanceEndpoints({addTagTypes:["Asset","Folder"]}).injectEndpoints({endpoints:e=>({uploadFiles:e.mutation({query:o=>({url:"/upload",method:"POST",data:o}),invalidatesTags:["Asset"]})})}),{useUploadFilesMutation:to}=_e,oo=_e.injectEndpoints({endpoints:e=>({getAssets:e.query({query:(o={})=>({url:"/upload/files",method:"GET",config:{params:o}}),transformResponse:o=>o,providesTags:o=>o?[...o.results.map(({id:n})=>({type:"Asset",id:n})),{type:"Asset",id:"LIST"}]:[{type:"Asset",id:"LIST"}]})})}),{useGetAssetsQuery:no}=oo,x=e=>`${He}.${e}`;var B=function(e){return e.Video="video",e.Image="image",e.Document="doc",e.Audio="audio",e}({});function ie(e,o=0){const n=typeof e=="string"?Number(e):e,{value:s,unit:r}=We(n*1e3,{precision:o});return r?`${s}${r.toUpperCase()}`:"0B"}const ro=e=>e&&e[0]==="."?e.substring(1):e,le=e=>e&&e.startsWith("/")?`${window.strapi.backendURL}${e}`:e,so={pdf:Xe,csv:Qe,xls:Je,zip:Ye},X=(e,o)=>{const n=ro(o);return e?.includes(B.Image)?Ke:e?.includes(B.Video)?Ze:e?.includes(B.Audio)?qe:n?so[n]||te:te},ao=v(tt)`
  border: 1px solid ${({theme:e})=>e.colors.neutral200};
  border-radius: 8px;
  overflow: hidden;
`,ce=v(A)`
  position: relative;
  width: 100%;
  padding-bottom: 62.5%;
  height: 0;
  overflow: hidden;
  background: repeating-conic-gradient(
      ${({theme:e})=>e.colors.neutral100} 0% 25%,
      transparent 0% 50%
    )
    50% / 20px 20px;
`,io=v.img`
  position: absolute;
  top: 0;
  left: 0;
  width: 100%;
  height: 100%;
  object-fit: cover;
`,lo=v(E)`
  position: absolute;
  top: 0;
  left: 0;
  width: 100%;
  height: 100%;
  color: ${({theme:e})=>e.colors.neutral500};
  background: ${({theme:e})=>e.colors.neutral100};
`,co=({asset:e})=>{const{alternativeText:o,ext:n,formats:s,mime:r,url:a}=e;if(r?.includes(B.Image)){const i=le(s?.thumbnail?.url)??le(a);if(i)return t.jsx(ce,{children:t.jsx(io,{src:i,alt:o||""})})}const c=X(r,n);return t.jsx(ce,{children:t.jsx(lo,{justifyContent:"center",alignItems:"center",children:t.jsx(c,{width:48,height:48})})})},uo=v(ot)`
  border-bottom: none;
`,fo=v(E)`
  min-width: 0;
`,po=v(E)`
  color: ${({theme:e})=>e.colors.neutral600};
  flex-shrink: 0;
`,go=v(T)`
  flex: 1;
  min-width: 0;
`,mo=({asset:e})=>{const{formatMessage:o}=D(),n=X(e.mime,e.ext);return t.jsxs(ao,{children:[t.jsx(uo,{children:t.jsx(co,{asset:e})}),t.jsx(et,{children:t.jsxs(fo,{alignItems:"center",gap:2,paddingTop:2,children:[t.jsx(po,{children:t.jsx(n,{width:16,height:16})}),t.jsx(go,{textColor:"primary800",ellipsis:!0,children:e.name}),t.jsx(ge,{label:o({id:x("control-card.more-actions"),defaultMessage:"More actions"}),variant:"ghost",children:t.jsx(me,{})})]})})]})},ho=({assets:e})=>{const{formatMessage:o}=D();return e.length===0?t.jsx(A,{padding:8,children:t.jsx(T,{textColor:"neutral600",children:o({id:"app.components.EmptyStateLayout.content-document",defaultMessage:"No content found"})})}):t.jsx(oe.Root,{gap:4,children:e.map(n=>t.jsx(oe.Item,{col:3,m:4,s:6,xs:12,direction:"column",alignItems:"stretch",children:t.jsx(mo,{asset:n})},n.id))})},xo={view:"STRAPI_UPLOAD_LIBRARY_VIEW"},N={GRID:0,TABLE:1},ue=[{name:"name",label:{id:x("list.table.header.name"),defaultMessage:"name"}},{name:"createdAt",label:{id:x("list.table.header.creationDate"),defaultMessage:"creation date"}},{name:"updatedAt",label:{id:x("list.table.header.lastModified"),defaultMessage:"last modified"}},{name:"size",label:{id:x("list.table.header.size"),defaultMessage:"size"}},{name:"actions",label:{id:x("list.table.header.actions"),defaultMessage:"actions"},isVisuallyHidden:!0}],vo=v(rt)`
  width: 100%;
  border-collapse: separate;
  border-spacing: 0;
  border: 1px solid ${({theme:e})=>e.colors.neutral150};
  border-radius: 4px;
  overflow: hidden;
`,bo=v(st)`
  background: ${({theme:e})=>e.colors.neutral100};

  tr {
    border-bottom: 1px solid ${({theme:e})=>e.colors.neutral150};
  }
`,de=v(at)`
  height: 40px;
  padding: 0 ${({theme:e})=>e.spaces[4]};
  text-align: left;
`,_=v(ve)`
  padding: 0 ${({theme:e})=>e.spaces[4]};
  border-bottom: 1px solid ${({theme:e})=>e.colors.neutral150};
`,Co=v(K)`
  height: 48px;
  background: ${({theme:e})=>e.colors.neutral0};

  &:last-child {
    ${_} {
      border-bottom: 0;
    }
  }
`,jo=v(ve)`
  padding: ${({theme:e})=>e.spaces[4]};
  border-bottom: 1px solid ${({theme:e})=>e.colors.neutral150};
`,yo=({asset:e})=>{const{ext:o,mime:n}=e,s=X(n,o);return t.jsx(E,{justifyContent:"center",alignItems:"center",borderRadius:"4px",color:"neutral500",width:"3.2rem",height:"3.2rem",shrink:0,children:t.jsx(s,{width:16,height:16})})},Io=({asset:e})=>{const o=he(),{formatDate:n,formatMessage:s}=D();return t.jsxs(Co,{children:[t.jsx(_,{children:t.jsxs(E,{gap:3,alignItems:"center",children:[t.jsx(yo,{asset:e}),t.jsxs(E,{direction:"column",alignItems:"flex-start",children:[t.jsx(T,{textColor:"neutral800",fontWeight:"semiBold",ellipsis:!0,children:e.name}),o&&t.jsx(T,{textColor:"neutral600",variant:"pi",children:e.size?ie(e.size,1):"-"})]})]})}),!o&&t.jsxs(t.Fragment,{children:[t.jsx(_,{children:t.jsx(T,{textColor:"neutral600",children:e.createdAt?n(new Date(e.createdAt),{dateStyle:"long"}):"-"})}),t.jsx(_,{children:t.jsx(T,{textColor:"neutral600",children:e.updatedAt?n(new Date(e.updatedAt),{dateStyle:"long"}):"-"})}),t.jsx(_,{children:t.jsx(T,{textColor:"neutral600",children:e.size?ie(e.size,1):"-"})})]}),t.jsx(_,{children:t.jsx(E,{justifyContent:"flex-end",children:t.jsx(ge,{label:s({id:x("control-card.more-actions"),defaultMessage:"More actions"}),variant:"ghost",children:t.jsx(me,{})})})})]})},wo=({assets:e})=>{const o=he(),{formatMessage:n}=D(),s=o?ue.filter(r=>r.name==="name"||r.name==="actions"):ue;return t.jsxs(vo,{colCount:s.length,rowCount:e.length+1,children:[t.jsx(bo,{children:t.jsx(K,{children:s.map(r=>{const a=n(r.label);return"isVisuallyHidden"in r&&r.isVisuallyHidden?t.jsx(de,{children:t.jsx(xe,{children:n({id:x("table.header.actions"),defaultMessage:"actions"})})},r.name):t.jsx(de,{children:t.jsx(T,{textColor:"neutral600",variant:"sigma",children:a})},r.name)})})}),t.jsx(nt,{children:e.length===0?t.jsx(K,{children:t.jsx(jo,{colSpan:s.length,children:t.jsx(T,{textColor:"neutral600",children:n({id:"app.components.EmptyStateLayout.content-document",defaultMessage:"No content found"})})})}):e.map(r=>t.jsx(Io,{asset:r},r.id))})]})},Oe=l.createContext(null),Ro=v(A)`
  position: relative;
  display: flex;
  flex-direction: column;
  min-height: 100%;
`,So=({children:e,onDrop:o})=>{const[n,s]=l.useState(!1),r=l.useRef(0),a={isDragging:n};l.useEffect(()=>{const u=()=>{s(!1),r.current=0},f=y=>{y.relatedTarget||(s(!1),r.current=0)};return document.addEventListener("dragend",u),document.addEventListener("dragleave",f),()=>{document.removeEventListener("dragend",u),document.removeEventListener("dragleave",f)}},[]);const c=l.useCallback(u=>{u.preventDefault(),u.stopPropagation(),r.current+=1,u.dataTransfer.types.includes("Files")&&s(!0)},[]),i=l.useCallback(u=>{u.preventDefault(),u.stopPropagation(),r.current-=1,r.current<=0&&(s(!1),r.current=0)},[]),d=l.useCallback(u=>{u.preventDefault(),u.stopPropagation(),u.dataTransfer.dropEffect="copy"},[]),g=l.useCallback(u=>{u.preventDefault(),u.stopPropagation(),s(!1),r.current=0;const{files:f}=u.dataTransfer;f?.length&&o&&o(Array.from(f))},[o]);return t.jsx(Oe.Provider,{value:a,children:t.jsx(Ro,{"data-testid":"assets-dropzone",onDragEnter:c,onDragLeave:i,onDragOver:d,onDrop:g,children:e})})},Ne=()=>{const e=l.useContext(Oe);if(!e)throw new Error("useUploadDropZone must be used within UploadDropZone");return{isDragging:e.isDragging}},To=(e,o)=>`${e}${Math.floor(o*255).toString(16).padStart(2,"0")}`,Eo=v(A)`
  position: absolute;
  top: 0;
  left: 0;
  right: 0;
  bottom: 0;
  background: ${({theme:e})=>To(e.colors.primary200,.3)};
  border: 1px solid ${({theme:e})=>e.colors.primary700};
  border-radius: ${({theme:e})=>e.borderRadius};
  z-index: 1;
  pointer-events: none;
`,Ao=({children:e})=>{const{isDragging:o}=Ne();return t.jsxs(A,{position:"relative",children:[o&&t.jsx(Eo,{}),e]})},Do=({view:e})=>{const{formatMessage:o}=D(),{data:n,isLoading:s,error:r}=no({folder:null}),a=e===N.GRID,c=n?.results??[];return s?t.jsx(E,{justifyContent:"center",padding:8,children:t.jsx(xt,{children:o({id:"app.loading",defaultMessage:"Loading..."})})}):r?t.jsx(A,{padding:8,children:t.jsx(T,{textColor:"danger600",children:o({id:x("list.assets.error"),defaultMessage:"An error occurred while fetching assets."})})}):a?t.jsx(ho,{assets:c}):t.jsx(wo,{assets:c})},Po=v(Xt)`
  display: flex;
  border: 1px solid ${({theme:e})=>e.colors.neutral200};
  border-radius: ${({theme:e})=>e.borderRadius};
  overflow: hidden;
`,fe=v(eo)`
  display: flex;
  align-items: center;
  gap: ${({theme:e})=>e.spaces[2]};
  padding: ${({theme:e})=>`${e.spaces[2]} ${e.spaces[4]}`};
  border: none;
  background: ${({theme:e})=>e.colors.neutral0};
  color: ${({theme:e})=>e.colors.neutral800};
  cursor: pointer;
  font-size: ${({theme:e})=>e.fontSizes[1]};
  font-weight: ${({theme:e})=>e.fontWeights.semiBold};

  &:hover {
    background: ${({theme:e})=>e.colors.neutral100};
  }

  &[data-state='on'] {
    background: ${({theme:e})=>e.colors.neutral150};
  }

  svg {
    width: 1.6rem;
    height: 1.6rem;
  }
`,Mo=({uploadDropZoneRef:e})=>{const{formatMessage:o}=D(),{isDragging:n}=Ne(),[s,r]=l.useState(0);return l.useEffect(()=>{if(!e?.current)return;const a=()=>{const i=e.current?.getBoundingClientRect();i&&r(d=>d!==i.left?i.left:d)};a();const c=new ResizeObserver(a);return c.observe(e.current),()=>c.disconnect()},[e]),n?t.jsxs(Fo,{$leftContentWidth:s,children:[t.jsx(T,{textColor:"neutral0",children:o({id:x("dropzone.upload.message"),defaultMessage:"Drop here to upload to"})}),t.jsxs(E,{gap:2,alignItems:"center",children:[t.jsx(ht,{width:20,height:20,fill:"neutral0"}),t.jsx(T,{textColor:"neutral0",fontWeight:"semiBold",children:"Current folder"})]})]}):null},Fo=v(A)`
  position: fixed;
  bottom: ${({theme:e})=>e.spaces[8]};
  left: 50%;
  transform: translateX(calc(-50% + ${({$leftContentWidth:e})=>e/2}px));
  display: flex;
  flex-direction: column;
  align-items: center;
  justify-content: center;
  gap: ${({theme:e})=>e.spaces[2]};
  background: ${({theme:e})=>e.colors.primary600};
  padding: ${({theme:e})=>e.spaces[4]} ${({theme:e})=>e.spaces[6]};
  border-radius: ${({theme:e})=>e.borderRadius};
  z-index: 2;
`,$o=()=>{const{formatMessage:e}=D(),[o,n]=it(xo.view,N.GRID),s=o===N.GRID,r=l.useRef(null),a=l.useRef(null),{toggleNotification:c}=lt(),{_unstableFormatAPIError:i}=ct(),[d]=to(),g=async(m,b)=>{if(m.length===0)return;const C=new FormData;m.forEach(p=>{C.append("files",p),C.append("fileInfo",JSON.stringify({name:p.name,caption:null,alternativeText:null,folder:b}))});try{await d(C).unwrap(),c({type:"success",message:e({id:x("assets.uploaded"),defaultMessage:"{number, plural, one {# asset} other {# assets}} uploaded successfully"},{number:m.length})})}catch(p){const I=i(p);c({type:"danger",message:I})}},u=()=>{r.current?.click()},f=async m=>{const b=m.target.files;b&&b.length>0&&await g(Array.from(b),null),m.target.value=""},y=async m=>{await g(m,null)};return t.jsx(So,{onDrop:y,children:t.jsx(A,{ref:a,children:t.jsxs(O.Root,{minHeight:"100vh",children:[t.jsx(xe,{children:t.jsx("input",{type:"file",ref:r,onChange:f,multiple:!0})}),t.jsx(Mo,{uploadDropZoneRef:a}),t.jsx(O.Header,{navigationAction:t.jsx(A,{children:"TODO: Breadcrumbs"}),title:"TODO: Folder location",primaryAction:t.jsxs(E,{gap:2,children:[t.jsx(ut,{popoverPlacement:"bottom-end",variant:"default",endIcon:t.jsx(pt,{}),label:e({id:x("new"),defaultMessage:"New"}),children:t.jsx(dt,{onSelect:u,startIcon:t.jsx(ft,{}),children:e({id:x("import-files"),defaultMessage:"Import files"})})}),t.jsx(bt,{label:e({id:x("search.label"),defaultMessage:"Search for an asset"}),trackedEvent:"didSearchMediaLibraryElements",trackedEventDetails:{location:"upload"}}),t.jsxs(Po,{type:"single",value:s?"grid":"table",onValueChange:m=>m&&n(m==="grid"?N.GRID:N.TABLE),"aria-label":e({id:x("view.switch.label"),defaultMessage:"View options"}),children:[t.jsxs(fe,{value:"table","aria-label":e({id:x("view.table"),defaultMessage:"Table view"}),children:[t.jsx(gt,{}),e({id:x("view.table"),defaultMessage:"Table view"})]}),t.jsxs(fe,{value:"grid","aria-label":e({id:x("view.grid"),defaultMessage:"Grid view"}),children:[t.jsx(mt,{}),e({id:x("view.grid"),defaultMessage:"Grid view"})]})]})]})}),t.jsx(O.Content,{children:t.jsx(Ao,{children:t.jsx(Do,{view:o})})})]})})})},No=()=>{const{formatMessage:e}=D(),o=e({id:x("plugin.name"),defaultMessage:"Media Library"});return t.jsxs(ne.Main,{children:[t.jsx(ne.Title,{children:o}),t.jsxs(vt,{children:[t.jsx(re,{index:!0,element:t.jsx($o,{})}),t.jsx(re,{path:"ai-generation",element:t.jsx(Ct,{})})]})]})};export{No as UnstableMediaLibrary};
