import{r as l,R as k}from"./index-c6dae603.js";var x={exports:{}},c={};/**
 * @license React
 * react-jsx-runtime.production.min.js
 *
 * Copyright (c) Facebook, Inc. and its affiliates.
 *
 * This source code is licensed under the MIT license found in the
 * LICENSE file in the root directory of this source tree.
 */var R=l,O=Symbol.for("react.element"),T=Symbol.for("react.fragment"),I=Object.prototype.hasOwnProperty,E=R.__SECRET_INTERNALS_DO_NOT_USE_OR_YOU_WILL_BE_FIRED.ReactCurrentOwner,V={key:!0,ref:!0,__self:!0,__source:!0};function _(r,e,o){var t,s={},a=null,n=null;o!==void 0&&(a=""+o),e.key!==void 0&&(a=""+e.key),e.ref!==void 0&&(n=e.ref);for(t in e)I.call(e,t)&&!V.hasOwnProperty(t)&&(s[t]=e[t]);if(r&&r.defaultProps)for(t in e=r.defaultProps,e)s[t]===void 0&&(s[t]=e[t]);return{$$typeof:O,type:r,key:a,ref:n,props:s,_owner:E.current}}c.Fragment=T;c.jsx=_;c.jsxs=_;x.exports=c;var j=x.exports;const i=j.jsx,d=({children:r})=>{const e=l.useRef(null),o=l.useRef(null);return l.useEffect(()=>{let t=null;const s=()=>{var m,w;if(!e.current||!o.current)return;const n=e.current.getBoundingClientRect();let u=0,f=0;const h=((m=window==null?void 0:window.visualViewport)==null?void 0:m.width)||window.innerWidth,y=((w=window==null?void 0:window.visualViewport)==null?void 0:w.height)||window.innerHeight;n.right>h?u=h-n.right:n.left<0&&(u=-n.left),n.bottom>y?f=y-n.bottom:n.top<0&&(f=-n.top),o.current.style.transform=`translate3d(${u}px, ${f}px, 0)`},a=()=>{s(),t=requestAnimationFrame(a)};return a(),()=>{t&&cancelAnimationFrame(t)}},[]),i("div",{ref:e,style:{position:"relative"},children:i("div",{ref:o,style:{position:"relative"},children:r})})};try{d.displayName="ViewportTrap",d.__docgenInfo={description:"",displayName:"ViewportTrap",props:{}}}catch{}const C={title:"ViewportTrap",component:d},p={name:"ViewportTrap",render:()=>{const[r,e]=k.useState(!1);return l.useEffect(()=>{setTimeout(()=>{e(!0)},2e3)},[]),i("div",{style:{position:"absolute",top:0,left:0,width:"200vw",height:"200vh",display:"flex",alignItems:"center",justifyContent:"right"},children:i("div",{style:{position:"absolute",top:"50%",left:"50%",transform:"translate(-50%,-50%)",width:300,height:300,border:"2px dashed gray",display:"flex",padding:20},children:r&&i("div",{style:{position:"absolute",top:20,left:20},children:i(d,{children:i("div",{style:{width:300,height:300,border:"2px solid black",background:"rgba(255,255,255,0.5)",display:"flex",justifyContent:"center",alignItems:"center"},children:i("button",{style:{padding:20},onClick:()=>alert("Yay!"),children:"I'm always clickable"})})})})})})}};var g,v,b;p.parameters={...p.parameters,docs:{...(g=p.parameters)==null?void 0:g.docs,source:{originalSource:`{
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
      width: '200vw',
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
        padding: 20
      }}>
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
              background: 'rgba(255,255,255,0.5)',
              display: 'flex',
              justifyContent: 'center',
              alignItems: 'center'
            }}>
                  <button style={{
                padding: 20
              }} onClick={() => alert('Yay!')}>
                    I'm always clickable
                  </button>
                </div>
              </ViewportTrap>
            </div>}
        </div>
      </div>;
  }
}`,...(b=(v=p.parameters)==null?void 0:v.docs)==null?void 0:b.source}}};const F=["ViewportTrapStory"];export{p as ViewportTrapStory,F as __namedExportsOrder,C as default};
//# sourceMappingURL=viewport-trap.stories-0cfdbfe3.js.map
