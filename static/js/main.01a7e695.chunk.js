(this["webpackJsonpkartes-r"]=this["webpackJsonpkartes-r"]||[]).push([[0],{124:function(e,t,r){},134:function(e,t,r){"use strict";r.r(t);var a=r(0),n=r.n(a),s=r(47),c=r.n(s),o=(r(124),r(12)),i=r(50),l=r(51),j=r(77),d=r(76),b=r(46),h=r(11),u=r(145),m=r(146),p=r(163),f=r(18),O=r(2),x=function(e){Object(j.a)(r,e);var t=Object(d.a)(r);function r(){var e;Object(i.a)(this,r);for(var a=arguments.length,n=new Array(a),s=0;s<a;s++)n[s]=arguments[s];return(e=t.call.apply(t,[this].concat(n))).fetchData=function(e){e&&(alert("[check console] Search for room #"+e),fetch("/kartes/data.json").then((function(e){return e.json()})).then((function(t){var r=!1;console.log("Fetched data:"),console.log(t),t.features.forEach((function(t){t.properties.roomID===e&&(console.log("The requested room was found:"),console.log(t),r=!0)})),r||console.log("Room was not found.")}),(function(e){})))},e}return Object(l.a)(r,[{key:"componentDidMount",value:function(){var e=this.props.match.params.id;this.fetchData(e)}},{key:"componentDidUpdate",value:function(e,t,r){var a=this.props.match.params.id;this.fetchData(a)}},{key:"render",value:function(){return Object(O.jsx)(u.a,{bounds:this.props.bounds,center:this.props.center,minZoom:-5,doubleClickZoom:!1,crs:f.CRS.Simple,children:Object(O.jsxs)(m.a,{position:"topright",collapsed:!1,children:[Object(O.jsx)(m.a.BaseLayer,{ref:this.props.baseLayerRef,checked:!0,name:this.props.theLayers[1].name,children:Object(O.jsx)(p.a,{bounds:this.props.bounds,url:this.props.pathToImg+this.props.theLayers[1].imageName})}),Object(O.jsx)(m.a.BaseLayer,{name:this.props.theLayers[2].name,children:Object(O.jsx)(p.a,{bounds:this.props.bounds,url:this.props.pathToImg+this.props.theLayers[2].imageName})}),Object(O.jsx)(m.a.BaseLayer,{name:this.props.theLayers[3].name,children:Object(O.jsx)(p.a,{bounds:this.props.bounds,url:this.props.pathToImg+this.props.theLayers[3].imageName})}),Object(O.jsx)(m.a.BaseLayer,{name:this.props.theLayers[4].name,children:Object(O.jsx)(p.a,{bounds:this.props.bounds,url:this.props.pathToImg+this.props.theLayers[4].imageName})}),Object(O.jsx)(m.a.BaseLayer,{name:this.props.theLayers[5].name,children:Object(O.jsx)(p.a,{bounds:this.props.bounds,url:this.props.pathToImg+this.props.theLayers[5].imageName})})]})})}}]),r}(a.Component),y=Object(h.f)(x),g=r(3),v=r(159),L=r(147),T=r(148),N=r(149),k=r(151),S=r(152),C=r(153),w=r(154),I=r(161),B=r(164);var F=function(){var e=Object(a.useState)(null),t=Object(g.a)(e,2),r=(t[0],t[1]),s=Object(a.useState)(!1),c=Object(g.a)(s,2),o=c[0],i=c[1],l=Object(a.useState)([]),j=Object(g.a)(l,2),d=j[0],h=j[1],u={roomTypes:[{filterTerm:"kabinets",frontendName:"Kabineti"},{filterTerm:"laboratorija",frontendName:"Laboratorijas"},{filterTerm:"cits",frontendName:"Citi"}],floors:[{filterTerm:"1",frontendName:"1. st\u0101vs"},{filterTerm:"2",frontendName:"2. st\u0101vs"},{filterTerm:"3",frontendName:"3. st\u0101vs"},{filterTerm:"4",frontendName:"4. st\u0101vs"},{filterTerm:"5",frontendName:"5. st\u0101vs"}]},m=Object(a.useState)({roomTypes:["kabinets","laboratorija","cits"],floors:["1","2","3","4","5"]}),p=Object(g.a)(m,2),f=p[0],x=p[1],y=n.a.useState(""),F=Object(g.a)(y,2),R=F[0],D=F[1],P=n.a.useState([]),J=Object(g.a)(P,2),z=J[0],E=J[1];return Object(a.useEffect)((function(){fetch("/kartes/data.json").then((function(e){return e.json()})).then((function(e){i(!0),h(e)}),(function(e){i(!0),r(e)}))}),[]),n.a.useEffect((function(){if(o){var e=d.features.filter((function(e){var t=R.toLowerCase(),r=e.properties.roomID.toLowerCase(),a=e.properties.roomType.toLowerCase(),n=e.properties.floor.toLowerCase(),s=f.floors,c=f.roomTypes.includes(a)&&s.includes(n),o=r.includes(t)||a.includes(t);return c&&o}));E(e)}}),[R,f,d]),Object(O.jsx)("div",{className:"App",children:Object(O.jsxs)(v.a,{children:[Object(O.jsxs)(L.a,{ml:2,maxW:500,w:["96%","97%","98%"],children:[Object(O.jsx)(T.a,{pointerEvents:"none",children:Object(O.jsx)(B.a,{color:"gray.300"})}),Object(O.jsx)(N.a,{type:"text",placeholder:"Mekl\u0113t...",value:R,onChange:function(e){D(e.target.value)}})]}),Object(O.jsx)(k.a,{css:{flexFlow:"row wrap"},maxW:500,m:1,children:Object.keys(u).map((function(e){return u[e].map((function(t){var r="";return r=f[e].includes(t.filterTerm)?"blue":"gray",Object(O.jsx)(S.a,{m:1,size:"lg",colorScheme:r,"data-filtertype":e,"data-filtername":t.filterTerm,onClick:function(e){return function(e){var t=e.currentTarget.getAttribute("data-filtername"),r=e.currentTarget.getAttribute("data-filtertype");f[r].includes(t)?x((function(e){var a=JSON.parse(JSON.stringify(e));return a[r]=f[r].filter((function(e){return!t.includes(e)})),a})):x((function(e){var a=JSON.parse(JSON.stringify(e));return a[r].push(t),a}))}(e)},children:t.frontendName},t.filterTerm)}))}))}),Object(O.jsx)("div",{children:z.map((function(e,t){return Object(O.jsx)(C.a,{shadow:"md",m:2,maxW:"sm",borderWidth:"1px",borderRadius:"md",overflow:"hidden",children:Object(O.jsxs)(b.b,{to:"/"+e.properties.roomID,children:[Object(O.jsx)(C.a,{bg:"#f2f8fc",children:Object(O.jsx)(C.a,{p:2,children:Object(O.jsxs)(w.a,{children:[e.properties.floor,". st\u0101vs"]})})},t+"-header"),Object(O.jsx)(C.a,{p:2,children:Object(O.jsxs)(I.a,{children:[Object(O.jsx)(w.a,{fontSize:"xl",children:e.properties.roomID}),Object(O.jsx)(w.a,{children:e.properties.roomType})]})},t+"-body")]})},t)}))})]})})},R=r(29),D=r.n(R),P=r(162),J=r(160),z=r(158),E=r(57),U=r(155),A=r(156),Z=r(157);r(131),r(132);var M=function(e){var t=n.a.useRef(),r=[n.a.useRef(),n.a.useRef(),n.a.useRef(),n.a.useRef(),n.a.useRef()],a=Object(P.a)({onClose:function(){D()("#cancelButton").click()}}),s=a.isOpen,c=a.onOpen,o=a.onClose,i=n.a.useRef();return D()(document).ready((function(){var e=t.current;if(e){e.pm.addControls({drawCircleMarker:!1,drawCircle:!1,drawMarker:!1,drawPolyline:!1});var a=r[0].current;e.on("pm:create",(function(e){c(),D()("#cancelButton").on("click",(function(){e.layer.remove(),D()("#mainForm").off("click"),D()("#cancelbutton").off("click")})),D()("#mainForm").on("submit",(function(t){var r=D()("#idField").val(),n=D()("#typeField").val();e.layer.LUProperties={},e.layer.LUProperties.id=r,e.layer.LUProperties.type=n,a.addLayer(e.layer),D()("#mainForm").off("submit"),D()("#cancelButton").off("click")}))})).on("baselayerchange",(function(e){a=e.layer}))}})),Object(O.jsxs)("div",{id:"geoman-wrapper",children:[Object(O.jsxs)(v.a,{children:[Object(O.jsx)(J.a,{m:1,onClick:function(){var e=null;t.current&&(e=function(e){var t={type:"GeometryCollection",features:[]},r=function(r){var a=t.features;e[r].forEach((function(e,t){var n=e.pm._shape,s=[];e._parts[0].forEach((function(e,t){s.push([e.x,e.y])})),a.push({type:n,id:r.toString()+t.toString(),properties:{floor:r,roomID:e.LUProperties.id,roomType:e.LUProperties.type},coordinates:s})}))};for(var a in e)r(a);return t}(function(){var e={1:[],2:[],3:[],4:[],5:[]};return r.forEach((function(t,r){var a=t.current._layers;for(var n in a)(a[n]instanceof f.Polyline||a[n]instanceof f.Polygon)&&e[r+1].push(a[n])})),e}())),D()("#bin-data-sent").html("<pre>"+JSON.stringify(e,void 0,2)+"</pre>")},id:"button-geoJSON",children:"GeoJSON"}),Object(O.jsx)(J.a,{m:1,id:"button-clear",children:"Clear printed data"}),Object(O.jsx)(J.a,{m:1,id:"button-draw",children:"Refresh data and draw"}),Object(O.jsxs)(z.a,{initialFocusRef:i,isOpen:s,onClose:o,children:[Object(O.jsx)(z.g,{}),Object(O.jsxs)(z.d,{children:[Object(O.jsx)(z.f,{children:"Telpas inform\u0101cija"}),Object(O.jsx)(z.c,{}),Object(O.jsxs)("form",{id:"mainForm",children:[Object(O.jsxs)(z.b,{pb:6,children:[Object(O.jsxs)(E.a,{children:[Object(O.jsx)(U.a,{children:"ID"}),Object(O.jsx)(N.a,{id:"idField",ref:i,placeholder:"Piem\u0113ram, 312"})]}),Object(O.jsxs)(E.a,{mt:4,children:[Object(O.jsx)(U.a,{children:"Tips"}),Object(O.jsxs)(A.a,{id:"typeField",placeholder:"Izv\u0113lies tipu",children:[Object(O.jsx)("option",{value:"kabinets",children:"Kabinets"}),Object(O.jsx)("option",{value:"laboratorija",children:"Laboratorija"}),Object(O.jsx)("option",{value:"cits",children:"Cits"})]})]})]}),Object(O.jsxs)(z.e,{children:[Object(O.jsx)(J.a,{onClick:o,type:"submit",colorScheme:"blue",mr:3,children:"Saglab\u0101t"}),Object(O.jsx)(J.a,{onClick:o,id:"cancelButton",children:"Atcelt"})]})]})]})]})]}),Object(O.jsx)("div",{id:"bin-data-sent",className:"bin-data"}),Object(O.jsx)("div",{id:"bin-data-received-content",className:"bin-data"}),Object(O.jsx)("div",{id:"bin-data-received-metadata",className:"bin-data"}),Object(O.jsx)(u.a,{whenCreated:function(e){t.current=e},bounds:e.bounds,center:e.center,maxZoom:1,minZoom:-5,doubleClickZoom:!1,crs:f.CRS.Simple,children:Object(O.jsxs)(m.a,{position:"topright",collapsed:!1,children:[Object(O.jsx)(m.a.BaseLayer,{checked:!0,name:e.theLayers[1].name,children:Object(O.jsx)(Z.a,{ref:r[0],children:Object(O.jsx)(p.a,{bounds:e.bounds,url:e.pathToImg+e.theLayers[1].imageName})})}),Object(O.jsx)(m.a.BaseLayer,{name:e.theLayers[2].name,children:Object(O.jsx)(Z.a,{ref:r[1],children:Object(O.jsx)(p.a,{bounds:e.bounds,url:e.pathToImg+e.theLayers[2].imageName})})}),Object(O.jsx)(m.a.BaseLayer,{name:e.theLayers[3].name,children:Object(O.jsx)(Z.a,{ref:r[2],children:Object(O.jsx)(p.a,{bounds:e.bounds,url:e.pathToImg+e.theLayers[3].imageName})})}),Object(O.jsx)(m.a.BaseLayer,{name:e.theLayers[4].name,children:Object(O.jsx)(Z.a,{ref:r[3],children:Object(O.jsx)(p.a,{bounds:e.bounds,url:e.pathToImg+e.theLayers[4].imageName})})}),Object(O.jsx)(m.a.BaseLayer,{name:e.theLayers[5].name,children:Object(O.jsx)(Z.a,{ref:r[4],children:Object(O.jsx)(p.a,{bounds:e.bounds,url:e.pathToImg+e.theLayers[5].imageName})})})]})})]})},W=(r(133),function(e){Object(j.a)(r,e);var t=Object(d.a)(r);function r(){return Object(i.a)(this,r),t.apply(this,arguments)}return Object(l.a)(r,[{key:"render",value:function(){var e=window.location.origin+"/kartes/media/",t=[[0,0],[1e3,1e3]],r=[500,500],a={0:{name:"0. st\u0101vs",imageName:""},1:{name:"1. st\u0101vs",imageName:"zm1.svg"},2:{name:"2. st\u0101vs",imageName:"zm2.svg"},3:{name:"3. st\u0101vs",imageName:"zm3.svg"},4:{name:"4. st\u0101vs",imageName:"zm4.svg"},5:{name:"5. st\u0101vs",imageName:"zm5.svg"}};return Object(O.jsx)(O.Fragment,{children:Object(O.jsxs)(b.a,{children:[Object(O.jsxs)(v.a,{children:[Object(O.jsx)(b.b,{to:"/",children:Object(O.jsx)(J.a,{m:1,colorScheme:"blue",children:"Home"})}),Object(O.jsx)(b.b,{to:"/geoman",children:Object(O.jsx)(J.a,{m:1,colorScheme:"blue",children:"Geoman"})}),Object(O.jsx)(b.b,{to:"/search",children:Object(O.jsx)(J.a,{m:1,colorScheme:"blue",children:"Search"})}),Object(O.jsx)(b.b,{to:"/512",children:Object(O.jsx)(J.a,{m:1,colorScheme:"blue",children:"Search for #512"})})]}),Object(O.jsxs)(h.c,{children:[Object(O.jsx)(h.a,{exact:!0,path:"/geoman",render:function(n){return Object(O.jsx)(M,Object(o.a)(Object(o.a)({},n),{},{pathToImg:e,bounds:t,center:r,theLayers:a}))}}),Object(O.jsx)(h.a,{exact:!0,path:"/search",render:function(n){return Object(O.jsx)(F,Object(o.a)(Object(o.a)({},n),{},{pathToImg:e,bounds:t,center:r,theLayers:a}))}}),Object(O.jsx)(h.a,{exact:!0,path:"/:id?",render:function(n){return Object(O.jsx)(y,Object(o.a)(Object(o.a)({},n),{},{pathToImg:e,bounds:t,center:r,theLayers:a}))}}),Object(O.jsx)(h.a,{status:404,children:Object(O.jsx)("div",{children:"Page not found."})})]})]})})}}]),r}(a.Component)),G=function(e){e&&e instanceof Function&&r.e(3).then(r.bind(null,165)).then((function(t){var r=t.getCLS,a=t.getFID,n=t.getFCP,s=t.getLCP,c=t.getTTFB;r(e),a(e),n(e),s(e),c(e)}))};c.a.render(Object(O.jsx)(W,{}),document.getElementById("root")),G()}},[[134,1,2]]]);
//# sourceMappingURL=main.01a7e695.chunk.js.map