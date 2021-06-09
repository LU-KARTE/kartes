(this["webpackJsonpkartes-r"]=this["webpackJsonpkartes-r"]||[]).push([[0],{140:function(e,t,r){},150:function(e,t,r){"use strict";r.r(t);var a=r(0),n=r.n(a),s=r(56),c=r.n(s),o=r(184),i=(r(140),r(19)),l=r(61),j=r(62),u=r(79),b=r(93),h=r(92),d=r(55),m=r(17),p=r(167),f=r(168),O=r(187),x=r(22),y=r(14),g=r.n(y),v=r(161),L=r(162),k=r(163),N=r(164),S=r(165),T=r(166),C=r(3),F=function(e){Object(b.a)(r,e);var t=Object(h.a)(r);function r(e){var a;return Object(l.a)(this,r),(a=t.call(this,e)).fetchData=function(e){e&&fetch("/kartes/data.json").then((function(e){return e.json()})).then((function(t){var r=!1;console.log("Fetched data:"),console.log(t),t.features.forEach((function(t){t.properties.roomID===e&&(console.log("The requested room was found:"),console.log(t),r=!0)})),r||console.log("Room was not found.")}),(function(e){}))},a.state={currentBaseLayerFloorNumber:1,roomID:a.props.match.params.id},a}return Object(j.a)(r,[{key:"componentDidMount",value:function(){var e=this,t=this.state.roomID;this.fetchData(t),g()(document).ready((function(){g()("#FloorDownIcon").on("click",(function(){e.state.currentBaseLayerFloorNumber>1&&e.setState((function(e){return{currentBaseLayerFloorNumber:e.currentBaseLayerFloorNumber-1}}))})),g()("#FloorUpIcon").on("click",(function(){e.state.currentBaseLayerFloorNumber<5&&e.setState((function(e){return{currentBaseLayerFloorNumber:e.currentBaseLayerFloorNumber+1}}))}))}))}},{key:"componentDidUpdate",value:function(e,t,r){this.state.roomID!==this.props.match.params.id&&this.setState({roomID:this.props.match.params.id});var a=this.state.roomID;this.fetchData(a)}},{key:"render",value:function(){var e=1===this.state.currentBaseLayerFloorNumber,t=2===this.state.currentBaseLayerFloorNumber,r=3===this.state.currentBaseLayerFloorNumber,a=4===this.state.currentBaseLayerFloorNumber,n=5===this.state.currentBaseLayerFloorNumber;return Object(C.jsxs)(C.Fragment,{children:[Object(C.jsxs)(v.a,{mr:4,children:[this.state.roomID?Object(C.jsxs)(L.a,{pl:4,children:["Tiek mekl\u0113ts #",this.state.roomID]}):"",Object(C.jsx)(k.a,{}),Object(C.jsxs)(N.a,{children:[Object(C.jsx)(S.a,{id:"FloorDownIcon",style:{cursor:"pointer"},w:8,h:8}),Object(C.jsxs)(L.a,{fontSize:20,children:[this.state.currentBaseLayerFloorNumber,". St\u0101vs"]}),Object(C.jsx)(T.a,{id:"FloorUpIcon",style:{cursor:"pointer"},w:8,h:8})]})]}),Object(C.jsx)(p.a,{bounds:this.props.bounds,center:this.props.center,minZoom:-5,doubleClickZoom:!1,crs:x.CRS.Simple,children:Object(C.jsxs)(f.a,{position:"topright",collapsed:!1,children:[Object(C.jsx)(f.a.BaseLayer,{checked:e,ref:this.props.baseLayerRef,name:this.props.theLayers[1].name,children:Object(C.jsx)(O.a,{bounds:this.props.bounds,url:this.props.pathToImg+this.props.theLayers[1].imageName})}),Object(C.jsx)(f.a.BaseLayer,{checked:t,name:this.props.theLayers[2].name,children:Object(C.jsx)(O.a,{bounds:this.props.bounds,url:this.props.pathToImg+this.props.theLayers[2].imageName})}),Object(C.jsx)(f.a.BaseLayer,{checked:r,name:this.props.theLayers[3].name,children:Object(C.jsx)(O.a,{bounds:this.props.bounds,url:this.props.pathToImg+this.props.theLayers[3].imageName})}),Object(C.jsx)(f.a.BaseLayer,{checked:a,name:this.props.theLayers[4].name,children:Object(C.jsx)(O.a,{bounds:this.props.bounds,url:this.props.pathToImg+this.props.theLayers[4].imageName})}),Object(C.jsx)(f.a.BaseLayer,{checked:n,name:this.props.theLayers[5].name,children:Object(C.jsx)(O.a,{bounds:this.props.bounds,url:this.props.pathToImg+this.props.theLayers[5].imageName})})]})})]})}}]),r}(a.Component),I=Object(m.f)(F),w=r(4),B=r(169),D=r(175),z=r(185),E=r(176),R=r(177),J=r(178),P=r(170),U=r(171),A=r(173),M=r(172);var Z=function(e){return Object(C.jsx)(B.a,{children:Object(C.jsxs)(P.a,{children:[Object(C.jsx)(U.a,{pointerEvents:"none",children:Object(C.jsx)(M.a,{color:"gray.300"})}),Object(C.jsx)(A.a,{type:"text",placeholder:"Mekl\u0113t...",value:e.searchTerm,onChange:e.handleChange})]})})};var _=function(e){var t=Object(a.useState)(null),r=Object(w.a)(t,2),s=(r[0],r[1]),c=Object(a.useState)(!1),o=Object(w.a)(c,2),i=o[0],l=o[1],j=Object(a.useState)("none"),u=Object(w.a)(j,2),b=u[0],h=u[1],m=Object(a.useState)([]),p=Object(w.a)(m,2),f=p[0],O=p[1],x=n.a.useState(!1),y=Object(w.a)(x,2),N=y[0],S=y[1],T={roomTypes:[{filterTerm:"kabinets",frontendName:"Kabineti"},{filterTerm:"laboratorija",frontendName:"Laboratorijas"},{filterTerm:"cits",frontendName:"Citi"}],floors:[{filterTerm:"1",frontendName:"1. st\u0101vs"},{filterTerm:"2",frontendName:"2. st\u0101vs"},{filterTerm:"3",frontendName:"3. st\u0101vs"},{filterTerm:"4",frontendName:"4. st\u0101vs"},{filterTerm:"5",frontendName:"5. st\u0101vs"}]},F={roomTypes:["kabinets","laboratorija","cits"],floors:["1","2","3","4","5"]},I=Object(a.useState)(F),P=Object(w.a)(I,2),U=P[0],A=P[1],M=n.a.useState(""),_=Object(w.a)(M,2),G=_[0],H=_[1],K=n.a.useState([]),W=Object(w.a)(K,2),q=W[0],Q=W[1];function V(e){var t=G.toLowerCase().replace(/[^a-z0-9 ]/gi,"").trim(),r=e.properties.roomID.toLowerCase(),a=e.properties.roomType.toLowerCase(),n=e.properties.floor.toLowerCase(),s=t.split(" "),c=U.floors;if(!(U.roomTypes.includes(a)&&c.includes(n)))return 0;var o=0,i=s.length;if(0===i||1===i&&(""===s[0]||" "===s[0]))return 1;for(var l=0;l<i;l++)""!==s[l]&&(r===s[l]?o+=1:r.includes(s[l])&&(o+=.3),a===s[l]?o+=1:a.includes(s[l])&&(o+=.3));return o}return Object(a.useEffect)((function(){fetch("/kartes/data.json").then((function(e){return e.json()})).then((function(e){l(!0),O(e)}),(function(e){l(!0),s(e)})),g()(document).on("click",(function(e){0===g()(e.target).closest("#searchWrapper").length&&h("none")}))}),[]),n.a.useEffect((function(){if(i){var e=JSON.parse(JSON.stringify(f.features)).filter((function(e){return V(e)>0})).sort((function(e,t){var r=V(e),a=V(t);return r>a?-1:r<a?1:0}));1===e.length&&e.push({}),Q(e)}}),[G,U,f]),Object(C.jsxs)(B.a,{id:"searchWrapper",width:"full",className:"App",onFocus:function(){return h("block")},children:[Object(C.jsx)(Z,{searchTerm:G,handleChange:function(e){H(e.target.value)}}),Object(C.jsx)("div",{children:Object(C.jsxs)(D.a,{spacing:0,shadow:"md",style:{display:b},maxH:300,overflow:"scroll",css:{"&::-webkit-scrollbar":{width:"4px"},"&::-webkit-scrollbar-track":{width:"6px"},"&::-webkit-scrollbar-thumb":{background:"#bbb",borderRadius:"24px"}},children:[Object(C.jsxs)(D.b,{p:3,pb:0,children:[Object(C.jsxs)(z.a,{size:"sm",onClick:function(){return S(!N)},children:[N?"Aizv\u0113rt":"Atv\u0113rt"," filtrus"]}),Object(C.jsx)(z.a,{ml:2,size:"sm",onClick:function(){A(F)},children:"Izsl\u0113gt filtrus"}),Object(C.jsx)(E.a,{startingHeight:0,in:N,children:Object(C.jsx)(v.a,{css:{flexFlow:"row wrap"},children:Object.keys(T).map((function(e){return T[e].map((function(t){var r="";return r=U[e].includes(t.filterTerm)?"blue":"gray",Object(C.jsx)(R.a,{mr:2,mt:2,size:"lg",colorScheme:r,"data-filtertype":e,"data-filtername":t.filterTerm,onClick:function(e){return function(e){var t=e.currentTarget.getAttribute("data-filtername"),r=e.currentTarget.getAttribute("data-filtertype");U[r].includes(t)?A((function(e){var a=JSON.parse(JSON.stringify(e));return a[r]=U[r].filter((function(e){return!t.includes(e)})),a})):A((function(e){var a=JSON.parse(JSON.stringify(e));return a[r].push(t),a}))}(e)},children:t.frontendName},t.filterTerm)}))}))})}),Object(C.jsx)(J.a,{mt:1})]},"filterTags"),q.length>1?q.slice(0,0===Object.keys(q[1]).length?1:1e3).map((function(e,t){return Object(C.jsxs)(d.b,{onClick:function(){return h("none")},to:"/"+e.properties.roomID,children:[Object(C.jsx)(D.b,{_hover:{bg:"#f1f1f1"},p:3,children:Object(C.jsxs)(v.a,{children:[Object(C.jsxs)(L.a,{children:[e.properties.roomID+". "+e.properties.roomType.substr(0,1).toUpperCase()+e.properties.roomType.substr(1)," "]}),Object(C.jsx)(k.a,{}),Object(C.jsxs)(L.a,{children:[" ",e.properties.floor,". st\u0101vs"]})]})}),Object(C.jsx)(J.a,{})]},t)})):Object(C.jsx)(D.b,{children:Object(C.jsx)(L.a,{fontSize:"md",p:3,children:"Nekas netika atrasts."})})]})})]})},G=r(186),H=r(183),K=r(74),W=r(179),q=r(180),Q=r(181);r(147),r(148);var V=function(e){var t=n.a.useRef(),r=[n.a.useRef(),n.a.useRef(),n.a.useRef(),n.a.useRef(),n.a.useRef()],s=Object(G.a)({onClose:function(){g()("#cancelButton").click()}}),c=s.isOpen,o=s.onOpen,i=s.onClose,l=n.a.useRef(),j=Object(a.useState)({}),u=Object(w.a)(j,2),b=(u[0],u[1]);return g()(document).ready((function(){var e=t.current;if(g()("#button-clear").on("click",(function(){g()("#bin-data-sent").html(""),g()("#bin-data-received-content").html("")})),g()("#button-receive-data").on("click",(function(){fetch("/kartes/data.json").then((function(e){return e.json()})).then((function(e){b(e),g()("#bin-data-received-content").html(JSON.stringify(e))}),(function(e){}))})),e){e.pm.addControls({drawCircleMarker:!1,drawCircle:!1,drawMarker:!1,drawPolyline:!1});var a=r[0].current;e.on("pm:create",(function(e){o(),g()("#cancelButton").on("click",(function(){e.layer.remove(),g()("#mainForm").off("click"),g()("#cancelbutton").off("click")})),g()("#mainForm").on("submit",(function(t){var r=g()("#idField").val(),n=g()("#typeField").val();e.layer.LUProperties={},e.layer.LUProperties.id=r,e.layer.LUProperties.type=n,a.addLayer(e.layer),g()("#mainForm").off("submit"),g()("#cancelButton").off("click")}))})).on("baselayerchange",(function(e){a=e.layer}))}})),Object(C.jsxs)("div",{id:"geoman-wrapper",children:[Object(C.jsx)(z.a,{m:1,onClick:function(){var e=null;t.current&&(e=function(e){var t={type:"GeometryCollection",features:[]},r=function(r){var a=t.features;e[r].forEach((function(e,t){var n=e.pm._shape,s=[];e._parts[0].forEach((function(e,t){s.push([e.x,e.y])})),a.push({type:n,id:r.toString()+t.toString(),properties:{floor:r,roomID:e.LUProperties.id,roomType:e.LUProperties.type},coordinates:s})}))};for(var a in e)r(a);return t}(function(){var e={1:[],2:[],3:[],4:[],5:[]};return r.forEach((function(t,r){var a=t.current._layers;for(var n in a)(a[n]instanceof x.Polyline||a[n]instanceof x.Polygon)&&e[r+1].push(a[n])})),e}())),g()("#bin-data-sent").html("<pre>"+JSON.stringify(e,void 0,2)+"</pre>")},id:"button-geoJSON",children:"Generate JSON"}),Object(C.jsx)(z.a,{m:1,id:"button-receive-data",children:"Receive data"}),Object(C.jsx)(z.a,{m:1,id:"button-clear",children:"Clear data"}),Object(C.jsxs)(H.a,{initialFocusRef:l,isOpen:c,onClose:i,children:[Object(C.jsx)(H.g,{}),Object(C.jsxs)(H.d,{children:[Object(C.jsx)(H.f,{children:"Telpas inform\u0101cija"}),Object(C.jsx)(H.c,{}),Object(C.jsxs)("form",{id:"mainForm",children:[Object(C.jsxs)(H.b,{pb:6,children:[Object(C.jsxs)(K.a,{children:[Object(C.jsx)(W.a,{children:"ID"}),Object(C.jsx)(A.a,{id:"idField",ref:l,placeholder:"Piem\u0113ram, 312"})]}),Object(C.jsxs)(K.a,{mt:4,children:[Object(C.jsx)(W.a,{children:"Tips"}),Object(C.jsxs)(q.a,{id:"typeField",placeholder:"Izv\u0113lies tipu",children:[Object(C.jsx)("option",{value:"kabinets",children:"Kabinets"}),Object(C.jsx)("option",{value:"laboratorija",children:"Laboratorija"}),Object(C.jsx)("option",{value:"cits",children:"Cits"})]})]})]}),Object(C.jsxs)(H.e,{children:[Object(C.jsx)(z.a,{onClick:i,type:"submit",colorScheme:"blue",mr:3,children:"Saglab\u0101t"}),Object(C.jsx)(z.a,{onClick:i,id:"cancelButton",children:"Atcelt"})]})]})]})]}),Object(C.jsx)("div",{id:"bin-data-sent",className:"bin-data"}),Object(C.jsx)("div",{id:"bin-data-received-content",className:"bin-data"}),Object(C.jsx)(p.a,{whenCreated:function(e){t.current=e},bounds:e.bounds,center:e.center,maxZoom:1,minZoom:-5,doubleClickZoom:!1,crs:x.CRS.Simple,children:Object(C.jsxs)(f.a,{position:"topright",collapsed:!1,children:[Object(C.jsx)(f.a.BaseLayer,{checked:!0,name:e.theLayers[1].name,children:Object(C.jsx)(Q.a,{ref:r[0],children:Object(C.jsx)(O.a,{bounds:e.bounds,url:e.pathToImg+e.theLayers[1].imageName})})}),Object(C.jsx)(f.a.BaseLayer,{name:e.theLayers[2].name,children:Object(C.jsx)(Q.a,{ref:r[1],children:Object(C.jsx)(O.a,{bounds:e.bounds,url:e.pathToImg+e.theLayers[2].imageName})})}),Object(C.jsx)(f.a.BaseLayer,{name:e.theLayers[3].name,children:Object(C.jsx)(Q.a,{ref:r[2],children:Object(C.jsx)(O.a,{bounds:e.bounds,url:e.pathToImg+e.theLayers[3].imageName})})}),Object(C.jsx)(f.a.BaseLayer,{name:e.theLayers[4].name,children:Object(C.jsx)(Q.a,{ref:r[3],children:Object(C.jsx)(O.a,{bounds:e.bounds,url:e.pathToImg+e.theLayers[4].imageName})})}),Object(C.jsx)(f.a.BaseLayer,{name:e.theLayers[5].name,children:Object(C.jsx)(Q.a,{ref:r[4],children:Object(C.jsx)(O.a,{bounds:e.bounds,url:e.pathToImg+e.theLayers[5].imageName})})})]})})]})},X=(r(149),function(e){Object(b.a)(r,e);var t=Object(h.a)(r);function r(e){var a;return Object(l.a)(this,r),(a=t.call(this,e)).state={searchTerm:""},a.handleChange=a.handleChange.bind(Object(u.a)(a)),a}return Object(j.a)(r,[{key:"handleChange",value:function(e){this.setState((function(t){return{searchTerm:e.target.value}}))}},{key:"render",value:function(){var e=window.location.origin+"/kartes/media/",t=[[0,0],[1e3,1e3]],r=[500,500],a={0:{name:"0. st\u0101vs",imageName:""},1:{name:"1. st\u0101vs",imageName:"zm1.svg"},2:{name:"2. st\u0101vs",imageName:"zm2.svg"},3:{name:"3. st\u0101vs",imageName:"zm3.svg"},4:{name:"4. st\u0101vs",imageName:"zm4.svg"},5:{name:"5. st\u0101vs",imageName:"zm5.svg"}};return Object(C.jsx)(C.Fragment,{children:Object(C.jsxs)(d.a,{children:[Object(C.jsx)(v.a,{p:4,children:Object(C.jsx)(_,{})}),Object(C.jsxs)(m.c,{children:[Object(C.jsx)(m.a,{exact:!0,path:"/geoman",render:function(n){return Object(C.jsx)(V,Object(i.a)(Object(i.a)({},n),{},{pathToImg:e,bounds:t,center:r,theLayers:a}))}}),Object(C.jsx)(m.a,{exact:!0,path:"/search",render:function(n){return Object(C.jsx)(_,Object(i.a)(Object(i.a)({},n),{},{pathToImg:e,bounds:t,center:r,theLayers:a}))}}),Object(C.jsx)(m.a,{exact:!0,path:"/:id?",render:function(n){return Object(C.jsx)(I,Object(i.a)(Object(i.a)({},n),{},{pathToImg:e,bounds:t,center:r,theLayers:a}))}}),Object(C.jsx)(m.a,{status:404,children:Object(C.jsx)("div",{children:"Page not found."})})]}),Object(C.jsx)(d.b,{to:"/",children:Object(C.jsx)(z.a,{size:"xs",m:1,colorScheme:"blue",children:"Home"})}),Object(C.jsx)(d.b,{to:"/geoman",children:Object(C.jsx)(z.a,{size:"xs",m:1,colorScheme:"blue",children:"Geoman"})}),Object(C.jsx)(d.b,{to:"/search",children:Object(C.jsx)(z.a,{size:"xs",m:1,colorScheme:"blue",children:"Search"})}),Object(C.jsx)(d.b,{to:"/512",children:Object(C.jsx)(z.a,{size:"xs",m:1,colorScheme:"blue",children:"Search for #512"})})]})})}}]),r}(a.Component)),Y=r(182),$=Object(Y.a)({colors:{primary:{100:"#E5FCF1",200:"#27EF96",300:"#10DE82",400:"#0EBE6F",500:"#0CA25F",600:"#0A864F",700:"#086F42",800:"#075C37",900:"#064C2E"}}}),ee=document.getElementById("root");c.a.render(Object(C.jsx)(n.a.StrictMode,{children:Object(C.jsx)(o.a,{theme:$,children:Object(C.jsx)(X,{})})}),ee)}},[[150,1,2]]]);
//# sourceMappingURL=main.da739e6f.chunk.js.map