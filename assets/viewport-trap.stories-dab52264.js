import{j as t}from"./jsx-runtime-c3d7f245.js";import{r as o,R as v}from"./index-c6dae603.js";const s=({children:r})=>{const n=o.useRef(null),a=o.useRef(null);return o.useEffect(()=>{let l=null;const b=()=>{var f,w;if(!n.current||!a.current)return;const e=n.current.getBoundingClientRect();let p=0,d=0;const u=((f=window==null?void 0:window.visualViewport)==null?void 0:f.width)||window.innerWidth,h=((w=window==null?void 0:window.visualViewport)==null?void 0:w.height)||window.innerHeight;e.right>u?p=u-e.right:e.left<0&&(p=-e.left),e.bottom>h?d=h-e.bottom:e.top<0&&(d=-e.top),a.current.style.transform=`translate3d(${p}px, ${d}px, 0)`},c=()=>{b(),l=requestAnimationFrame(c)};return c(),()=>{l&&cancelAnimationFrame(l)}},[]),t("div",{ref:n,style:{position:"relative"},children:t("div",{ref:a,style:{position:"relative"},children:r})})};try{s.displayName="ViewportTrap",s.__docgenInfo={description:"",displayName:"ViewportTrap",props:{}}}catch{}const T={title:"ViewportTrap",component:s},i={name:"ViewportTrap",render:()=>{const[r,n]=v.useState(!1);return o.useEffect(()=>{setTimeout(()=>{n(!0)},2e3)},[]),t("div",{style:{position:"absolute",top:0,left:0,width:"200vw",height:"200vh",display:"flex",alignItems:"center",justifyContent:"right"},children:t("div",{style:{position:"absolute",top:"50%",left:"50%",transform:"translate(-50%,-50%)",width:300,height:300,border:"2px dashed gray",display:"flex",padding:20},children:r&&t("div",{style:{position:"absolute",top:20,left:20},children:t(s,{children:t("div",{style:{width:300,height:300,border:"2px solid black",background:"rgba(255,255,255,0.5)",display:"flex",justifyContent:"center",alignItems:"center"},children:t("button",{style:{padding:20},onClick:()=>alert("Yay!"),children:"I'm always clickable"})})})})})})}};var m,y,g;i.parameters={...i.parameters,docs:{...(m=i.parameters)==null?void 0:m.docs,source:{originalSource:`{
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
}`,...(g=(y=i.parameters)==null?void 0:y.docs)==null?void 0:g.source}}};const V=["ViewportTrapStory"];export{i as ViewportTrapStory,V as __namedExportsOrder,T as default};
//# sourceMappingURL=viewport-trap.stories-dab52264.js.map
