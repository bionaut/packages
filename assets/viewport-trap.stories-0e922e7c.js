import{r as c,R}from"./index-c6dae603.js";var w={exports:{}},u={};/**
 * @license React
 * react-jsx-runtime.production.min.js
 *
 * Copyright (c) Facebook, Inc. and its affiliates.
 *
 * This source code is licensed under the MIT license found in the
 * LICENSE file in the root directory of this source tree.
 */var E=c,O=Symbol.for("react.element"),T=Symbol.for("react.fragment"),k=Object.prototype.hasOwnProperty,j=E.__SECRET_INTERNALS_DO_NOT_USE_OR_YOU_WILL_BE_FIRED.ReactCurrentOwner,I={key:!0,ref:!0,__self:!0,__source:!0};function g(o,e,s){var t,l={},p=null,n=null;s!==void 0&&(p=""+s),e.key!==void 0&&(p=""+e.key),e.ref!==void 0&&(n=e.ref);for(t in e)k.call(e,t)&&!I.hasOwnProperty(t)&&(l[t]=e[t]);if(o&&o.defaultProps)for(t in e=o.defaultProps,e)l[t]===void 0&&(l[t]=e[t]);return{$$typeof:O,type:o,key:p,ref:n,props:l,_owner:j.current}}u.Fragment=T;u.jsx=g;u.jsxs=g;w.exports=u;var x=w.exports;const a=x.jsx,S=x.jsxs,f=({children:o})=>{const e=c.useRef(null),s=c.useRef(null);return c.useEffect(()=>{if(!e.current||!s.current)return;const t=e.current,l=[];for(let n=0;n<=1;n+=.01)l.push(n);const p=new IntersectionObserver(([n])=>{if(n.intersectionRatio<1){const r=n.boundingClientRect,i=n.intersectionRect;let h=0,m=0;if(r.right>i.right?h=i.right-r.right:r.left<i.left&&(h=i.left-r.left),r.bottom>i.bottom?m=i.bottom-r.bottom:r.top<i.top&&(m=i.top-r.top),!s.current)return;const _=s.current.style;_.transform=`translate(${h}px, ${m}px)`}else{if(!s.current)return;const r=s.current.style;r.transform=""}},{root:null,threshold:l});return p.observe(t),()=>{t&&p.unobserve(t)}},[]),a("div",{ref:e,style:{position:"relative",pointerEvents:"none"},children:a("div",{ref:s,style:{position:"relative",pointerEvents:"none"},children:o})})};try{f.displayName="ViewportTrap",f.__docgenInfo={description:"",displayName:"ViewportTrap",props:{}}}catch{}const C={title:"ViewportTrap",component:f},d={name:"ViewportTrap",render:()=>{const[o,e]=R.useState(!1);return c.useEffect(()=>{setTimeout(()=>{e(!0)},2e3)},[]),a("div",{style:{position:"absolute",top:0,left:0,width:"100vw",height:"200vh",display:"flex",alignItems:"center",justifyContent:"right"},children:S("div",{style:{position:"absolute",top:"50%",left:"50%",transform:"translate(-50%,-50%)",width:300,height:300,border:"2px dashed gray",display:"flex",padding:20,justifyContent:"center",alignItems:"center",textAlign:"center"},children:[a("div",{children:"Element will be mounted in 2 seconds, move this square so it is partially off the screen and then wait for the element to appear."}),o&&a("div",{style:{position:"absolute",top:20,left:20},children:a(f,{children:a("div",{style:{width:300,height:300,border:"2px solid black",background:"rgba(255,255,255,0.5)"}})})})]})})}};var y,v,b;d.parameters={...d.parameters,docs:{...(y=d.parameters)==null?void 0:y.docs,source:{originalSource:`{
  name: 'ViewportTrap',
  render: () => {
    // eslint-disable-next-line react-hooks/rules-of-hooks
    const [isOpen, setIsOpen] = React.useState(false);

    // eslint-disable-next-line react-hooks/rules-of-hooks
    useEffect(() => {
      setTimeout(() => {
        setIsOpen(true);
      }, 2000);
    }, []);
    return <div style={{
      position: 'absolute',
      top: 0,
      left: 0,
      width: '100vw',
      height: '200vh',
      display: 'flex',
      alignItems: 'center',
      justifyContent: 'right'
    }}>
        <div style={{
        position: 'absolute',
        top: '50%',
        left: '50%',
        transform: 'translate(-50%,-50%)',
        width: 300,
        height: 300,
        border: '2px dashed gray',
        display: 'flex',
        padding: 20,
        justifyContent: 'center',
        alignItems: 'center',
        textAlign: 'center'
      }}>
          <div>
            Element will be mounted in 2 seconds, move this square so it is
            partially off the screen and then wait for the element to appear.
          </div>
          {isOpen && /* main positional wrapper - e.g. dropdown menu wrapper that is invisible  */
        /* think of this wrapper as the ideal place for your element */
        /* can be relative */
        <div style={{
          position: 'absolute',
          top: 20,
          left: 20
        }}>
              {/*  dropdown menu that is allowed to correct its position dynamically */}
              <ViewportTrap>
                <div style={{
              width: 300,
              height: 300,
              border: '2px solid black',
              background: 'rgba(255,255,255,0.5)'
            }} />
              </ViewportTrap>
            </div>}
        </div>
      </div>;
  }
}`,...(b=(v=d.parameters)==null?void 0:v.docs)==null?void 0:b.source}}};const N=["ViewportTrapStory"];export{d as ViewportTrapStory,N as __namedExportsOrder,C as default};
//# sourceMappingURL=viewport-trap.stories-0e922e7c.js.map
