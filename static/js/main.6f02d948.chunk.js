(this["webpackJsonpkartes-r"]=this["webpackJsonpkartes-r"]||[]).push([[0],{144:function(e,t,r){},154:function(e,t,r){"use strict";r.r(t);var a=r(0),s=r.n(a),n=r(55),o=r.n(n),i=r(189),c=(r(144),r(15)),l=r(60),u=r(61),h=r(80),j=r(95),p=r(94),d=r(89),m=r(18),b=r(181),f=r(182),O=r(183),x=r(184),y=r(192),g=r(22),v=r(10),L=r.n(v),F=r(178),N=r(171),k=r(172),I=r(173),T=r(179),S=r(180),R=r(121),B=r(4),C=r(164),w=r(170),E=r(190),D=r(175),z=r(176),K=r(177),P=r(174),J=r(165),U=r(166),A=r(168),H=r(167),M=r(3);var Z=function(e){return Object(M.jsx)(C.a,{children:Object(M.jsxs)(J.a,{children:[Object(M.jsx)(U.a,{pointerEvents:"none",children:Object(M.jsx)(H.a,{color:"gray.300"})}),Object(M.jsx)(A.a,{type:"text",placeholder:"Mekl\u0113t...",value:e.searchTerm,onChange:e.handleChange})]})})};var _=function(e){var t=Object(a.useState)(null),r=Object(B.a)(t,2),n=(r[0],r[1]),o=Object(a.useState)(!1),i=Object(B.a)(o,2),c=i[0],l=i[1],u=Object(a.useState)("none"),h=Object(B.a)(u,2),j=h[0],p=h[1],m=Object(a.useState)([]),b=Object(B.a)(m,2),f=b[0],O=b[1],x=s.a.useState(!1),y=Object(B.a)(x,2),g=y[0],v=y[1],T={roomTypes:[{filterTerm:"kabinets",frontendName:"Kabineti"},{filterTerm:"laboratorija",frontendName:"Laboratorijas"},{filterTerm:"auditorija",frontendName:"Auditorija"},{filterTerm:"tualete",frontendName:"Tualete"},{filterTerm:"telpa",frontendName:"Telpa"}],floors:[{filterTerm:"1",frontendName:"1. st\u0101vs"},{filterTerm:"2",frontendName:"2. st\u0101vs"},{filterTerm:"3",frontendName:"3. st\u0101vs"},{filterTerm:"4",frontendName:"4. st\u0101vs"},{filterTerm:"5",frontendName:"5. st\u0101vs"},{filterTerm:"6",frontendName:"6. st\u0101vs"},{filterTerm:"7",frontendName:"7. st\u0101vs"},{filterTerm:"8",frontendName:"8. st\u0101vs"},{filterTerm:"9",frontendName:"9. st\u0101vs"}]},S={roomTypes:["kabinets","laboratorija","auditorija","tualete","telpa"],floors:["1","2","3","4","5","6","7","8","9"]},R=Object(a.useState)(S),J=Object(B.a)(R,2),U=J[0],A=J[1],H=s.a.useState(""),_=Object(B.a)(H,2),W=_[0],G=_[1],q=s.a.useState([]),Q=Object(B.a)(q,2),V=Q[0],X=Q[1],Y=function(t){p(t),e.resultsListDisplayStatusHandler&&e.resultsListDisplayStatusHandler(t)};function $(e){var t=W.toLowerCase().replace(/[^a-z0-9 ]/gi,"").trim(),r=e.properties.roomID.toLowerCase(),a=e.properties.roomType.toLowerCase(),s=e.properties.floor.toLowerCase(),n=[];e.properties.extraInfo&&(n=e.properties.extraInfo.toLowerCase().split(" "));var o=t.split(" "),i=U.floors;if(!(U.roomTypes.includes(a)&&i.includes(s)))return 0;var c=0,l=o.length;if(0===l||1===l&&(""===o[0]||" "===o[0]))return 1;for(var u=function(e){if(""===o[e])return"continue";r===o[e]?c+=1:r.includes(o[e])&&(c+=.3),a===o[e]?c+=1:a.includes(o[e])&&(c+=.3),n.forEach((function(t){t===o[e]?c+=1:t.includes(o[e])&&(c+=.3)}))},h=0;h<l;h++)u(h);return c}return Object(a.useEffect)((function(){fetch("/kartes/data.json").then((function(e){return e.json()})).then((function(e){l(!0),O(e)}),(function(e){l(!0),n(e)})),L()(document).on("click",(function(e){0===L()(e.target).closest("#searchWrapper").length&&Y("none")}))}),[]),s.a.useEffect((function(){if(c){var e=JSON.parse(JSON.stringify(f.features)).filter((function(e){return $(e)>0})).sort((function(e,t){var r=$(e),a=$(t);return r>a?-1:r<a?1:0}));1===e.length&&e.push({}),X(e)}}),[W,U,f]),Object(M.jsxs)(C.a,{id:"searchWrapper",width:"full",className:"App",onFocus:function(){return Y("block")},children:[Object(M.jsx)(Z,{searchTerm:W,handleChange:function(e){G(e.target.value)}}),Object(M.jsx)("div",{children:Object(M.jsxs)(w.a,{spacing:0,shadow:"md",style:{display:j},maxH:"90%",overflow:"scroll",css:{"&::-webkit-scrollbar":{width:"4px"},"&::-webkit-scrollbar-track":{width:"6px"},"&::-webkit-scrollbar-thumb":{background:"#bbb",borderRadius:"24px"}},children:[Object(M.jsxs)(w.b,{p:3,pb:0,children:[Object(M.jsxs)(N.a,{children:[Object(M.jsxs)(E.a,{size:"sm",onClick:function(){return v(!g)},children:[g?"Aizv\u0113rt":"Atv\u0113rt"," filtrus"]}),Object(M.jsx)(E.a,{ml:2,size:"sm",onClick:function(){A(S)},children:"Izsl\u0113gt filtrus"}),Object(M.jsx)(k.a,{}),Object(M.jsx)(I.a,{children:Object(M.jsx)(P.a,{cursor:"pointer",onClick:function(){return Y("none")},w:5,h:5})})]}),Object(M.jsx)(D.a,{startingHeight:0,in:g,children:Object(M.jsx)(N.a,{css:{flexFlow:"row wrap"},children:Object.keys(T).map((function(e){return T[e].map((function(t){var r="";return r=U[e].includes(t.filterTerm)?"blue":"gray",Object(M.jsx)(z.a,{mr:2,mt:2,size:"lg",colorScheme:r,"data-filtertype":e,"data-filtername":t.filterTerm,onClick:function(e){return function(e){var t=e.currentTarget.getAttribute("data-filtername"),r=e.currentTarget.getAttribute("data-filtertype");U[r].includes(t)?A((function(e){var a=JSON.parse(JSON.stringify(e));return a[r]=U[r].filter((function(e){return!t.includes(e)})),a})):A((function(e){var a=JSON.parse(JSON.stringify(e));return a[r].push(t),a}))}(e)},children:t.frontendName},t.filterTerm)}))}))})}),Object(M.jsx)(K.a,{mt:1})]},"filterTags"),V.length>1?V.slice(0,0===Object.keys(V[1]).length?1:1e3).map((function(e,t){return Object(M.jsxs)(d.b,{onClick:function(){return Y("none")},to:"/"+e.properties.floor+"/"+e.properties.roomID,children:[Object(M.jsx)(w.b,{_hover:{bg:"#f1f1f1"},p:3,children:Object(M.jsxs)(N.a,{children:[Object(M.jsx)(F.a,{children:e.properties.extraInfo?e.properties.extraInfo:e.properties.roomID+". "+e.properties.roomType.substr(0,1).toUpperCase()+e.properties.roomType.substr(1)}),Object(M.jsx)(k.a,{}),Object(M.jsxs)(F.a,{children:[" ",e.properties.floor,". st\u0101vs"]})]})}),Object(M.jsx)(K.a,{})]},t)})):Object(M.jsx)(w.b,{children:Object(M.jsx)(F.a,{fontSize:"md",p:3,children:"Nekas netika atrasts."})})]})})]})},W=(r(115),r(116),function(e){var t=e.feature,r="",a="",s="",n="";return t.properties&&(t.properties.roomID&&(r=t.properties.roomID),t.properties.roomType&&(a=t.properties.roomType),t.properties.roomDescription&&(s=t.properties.roomDescription),t.properties.extraInfo&&(n=t.properties.extraInfo)),Object(M.jsxs)(F.a,{fontSize:"20px",children:[" ","  ".concat((n||r+". "+a)+" "+s)]})}),G=function(e){Object(j.a)(r,e);var t=Object(p.a)(r);function r(e){var a;return Object(l.a)(this,r),(a=t.call(this,e)).onEachFeature=function(e,t){a.state.searchingForRoomID&&a.state.searchingForRoomID.includes(parseInt(e.properties.roomID))&&t.setStyle({fillOpacity:.5,fillColor:"red"});var r=R.renderToString(Object(M.jsx)(W,{feature:e}));t.bindPopup(r)},a.state={currentBaseLayerFloorNumber:1,searchingForRoomID:[],features:{},mapRerenderKey:0},a}return Object(u.a)(r,[{key:"groupFeaturesByFloor",value:function(e){var t={};return e.forEach((function(e){var r=e.properties.floor;r in t||(t[r]={type:"FeatureCollection",features:[]}),t[r].features.push(e)})),t}},{key:"componentDidMount",value:function(){var e=this;this.props.match.params.floor&&this.setState({currentBaseLayerFloorNumber:parseInt(this.props.match.params.floor)}),this.props.match.params.id&&this.setState({searchingForRoomID:[parseInt(this.props.match.params.id)]}),fetch("/kartes/data.json").then((function(e){return e.json()})).then((function(t){var r=e.groupFeaturesByFloor(t.features);e.setState({features:r}),e.setState((function(e){return{mapRerenderKey:e.mapRerenderKey+1}}))}),(function(e){alert("error fetching data....")})),L()(document).ready((function(){L()("#FloorDownIcon").on("click",(function(){e.state.currentBaseLayerFloorNumber>1&&(e.setState((function(e){return{currentBaseLayerFloorNumber:e.currentBaseLayerFloorNumber-1}})),e.setState((function(e){return{mapRerenderKey:e.mapRerenderKey+1}})))})),L()("#FloorUpIcon").on("click",(function(){e.state.currentBaseLayerFloorNumber<5&&(e.setState((function(e){return{currentBaseLayerFloorNumber:e.currentBaseLayerFloorNumber+1}})),e.setState((function(e){return{mapRerenderKey:e.mapRerenderKey+1}})))}))}))}},{key:"componentDidUpdate",value:function(e,t,r){!this.state.searchingForRoomID.includes(parseInt(this.props.match.params.id))&&this.props.match.params.id&&this.props.match.params.floor&&(this.setState({searchingForRoomID:[parseInt(this.props.match.params.id)]}),this.setState({currentBaseLayerFloorNumber:parseInt(this.props.match.params.floor)}),this.setState((function(e){return{mapRerenderKey:e.mapRerenderKey+1}})))}},{key:"render",value:function(){var e=1==this.state.currentBaseLayerFloorNumber,t=2==this.state.currentBaseLayerFloorNumber,r=3==this.state.currentBaseLayerFloorNumber,a=4==this.state.currentBaseLayerFloorNumber,s=5==this.state.currentBaseLayerFloorNumber,n=6==this.state.currentBaseLayerFloorNumber,o=7==this.state.currentBaseLayerFloorNumber,i=8==this.state.currentBaseLayerFloorNumber,c={fillOpacity:0,fillColor:"transparent",color:"transparent",opacity:1};return Object(M.jsxs)(M.Fragment,{children:[Object(M.jsx)(N.a,{p:4,children:Object(M.jsx)(_,{resultsListDisplayStatusHandler:function(e){"block"===e?(L()(".hideOnResultsListShow").css("display","none"),L()(".hideOnResultsListShowFlex").css("display","none")):"none"===e&&(L()(".hideOnResultsListShow").css("display","block"),L()(".hideOnResultsListShowFlex").css("display","flex"))}})}),Object(M.jsxs)(N.a,{mr:4,className:"hideOnResultsListShowFlex",children:[this.state.searchingForRoomID.length>0?Object(M.jsxs)(F.a,{pl:4,children:["Tiek mekl\u0113ta",this.state.searchingForRoomID.map((function(e){return" "+e+". telpa "}))]}):"",Object(M.jsx)(k.a,{}),Object(M.jsxs)(I.a,{children:[Object(M.jsx)(T.a,{id:"FloorDownIcon",style:{cursor:"pointer"},w:8,h:8}),Object(M.jsxs)(F.a,{fontSize:20,children:[this.state.currentBaseLayerFloorNumber,". St\u0101vs"]}),Object(M.jsx)(S.a,{id:"FloorUpIcon",style:{cursor:"pointer"},w:8,h:8})]})]}),Object(M.jsx)(b.a,{zoomSnap:.1,zoomDelta:.6,wheelPxPerZoomLevel:70,className:"hideOnResultsListShow",bounds:this.props.bounds,center:this.props.center,minZoom:-2,crs:g.CRS.Simple,children:Object(M.jsxs)(f.a,{position:"topright",collapsed:!0,children:[Object(M.jsx)(f.a.BaseLayer,{checked:e,ref:this.props.baseLayerRef,name:this.props.theLayers[1].name,children:Object(M.jsxs)(O.a,{children:[Object(M.jsx)(x.a,{style:c,data:this.state.features[1],onEachFeature:this.onEachFeature},this.state.mapRerenderKey+1),Object(M.jsx)(y.a,{bounds:this.props.bounds,url:this.props.pathToImg+this.props.theLayers[1].imageName})]})}),Object(M.jsx)(f.a.BaseLayer,{checked:t,name:this.props.theLayers[2].name,children:Object(M.jsxs)(O.a,{children:[Object(M.jsx)(x.a,{style:c,data:this.state.features[2],onEachFeature:this.onEachFeature},this.state.mapRerenderKey+2),Object(M.jsx)(y.a,{bounds:this.props.bounds,url:this.props.pathToImg+this.props.theLayers[2].imageName})]})}),Object(M.jsx)(f.a.BaseLayer,{checked:r,name:this.props.theLayers[3].name,children:Object(M.jsxs)(O.a,{children:[Object(M.jsx)(x.a,{style:c,data:this.state.features[3],onEachFeature:this.onEachFeature},this.state.mapRerenderKey+3),Object(M.jsx)(y.a,{bounds:this.props.bounds,url:this.props.pathToImg+this.props.theLayers[3].imageName})]})}),Object(M.jsx)(f.a.BaseLayer,{checked:a,name:this.props.theLayers[4].name,children:Object(M.jsxs)(O.a,{children:[Object(M.jsx)(x.a,{style:c,data:this.state.features[4],onEachFeature:this.onEachFeature},this.state.mapRerenderKey+4),Object(M.jsx)(y.a,{bounds:this.props.bounds,url:this.props.pathToImg+this.props.theLayers[4].imageName})]})}),Object(M.jsx)(f.a.BaseLayer,{checked:s,name:this.props.theLayers[5].name,children:Object(M.jsxs)(O.a,{children:[Object(M.jsx)(x.a,{style:c,data:this.state.features[5],onEachFeature:this.onEachFeature},this.state.mapRerenderKey+5),Object(M.jsx)(y.a,{bounds:this.props.bounds,url:this.props.pathToImg+this.props.theLayers[5].imageName})]})}),Object(M.jsx)(f.a.BaseLayer,{checked:n,name:this.props.theLayers[6].name,children:Object(M.jsxs)(O.a,{children:[Object(M.jsx)(x.a,{style:c,data:this.state.features[6],onEachFeature:this.onEachFeature},this.state.mapRerenderKey+6),Object(M.jsx)(y.a,{bounds:this.props.bounds,url:this.props.pathToImg+this.props.theLayers[6].imageName})]})}),Object(M.jsx)(f.a.BaseLayer,{checked:o,name:this.props.theLayers[7].name,children:Object(M.jsxs)(O.a,{children:[Object(M.jsx)(x.a,{style:c,data:this.state.features[7],onEachFeature:this.onEachFeature},this.state.mapRerenderKey+7),Object(M.jsx)(y.a,{bounds:this.props.bounds,url:this.props.pathToImg+this.props.theLayers[7].imageName})]})}),Object(M.jsx)(f.a.BaseLayer,{checked:i,name:this.props.theLayers[8].name,children:Object(M.jsxs)(O.a,{children:[Object(M.jsx)(x.a,{style:c,data:this.state.features[8],onEachFeature:this.onEachFeature},this.state.mapRerenderKey+8),Object(M.jsx)(y.a,{bounds:this.props.bounds,url:this.props.pathToImg+this.props.theLayers[8].imageName})]})})]})},this.state.mapRerenderKey)]})}}]),r}(a.Component),q=Object(m.f)(G),Q=r(191),V=r(188),X=r(73),Y=r(185),$=r(186);r(152);var ee=function(e){var t=s.a.useRef(),r=[s.a.useRef(),s.a.useRef(),s.a.useRef(),s.a.useRef(),s.a.useRef(),s.a.useRef(),s.a.useRef(),s.a.useRef()],n=Object(Q.a)({onClose:function(){L()("#cancelButton").click()}}),o=n.isOpen,i=n.onOpen,c=n.onClose,l=s.a.useRef(),u=Object(a.useState)({}),h=Object(B.a)(u,2),j=(h[0],h[1]);return L()(document).ready((function(){var e=t.current;if(L()("#button-clear").on("click",(function(){L()("#bin-data-sent").html(""),L()("#bin-data-received-content").html("")})),L()("#button-receive-data").on("click",(function(){fetch("/kartes/data.json").then((function(e){return e.json()})).then((function(e){j(e),L()("#bin-data-received-content").html(JSON.stringify(e))}),(function(e){}))})),e){var a=r[0].current;e.pm.addControls({drawCircleMarker:!1,drawCircle:!1,drawMarker:!1,drawPolyline:!1}),e.on("pm:create",(function(e){i(),L()("#cancelButton").on("click",(function(){e.layer.remove(),L()("#mainForm").off("click"),L()("#cancelbutton").off("click")})),L()("#mainForm").on("submit",(function(t){var r=L()("#idField").val(),s=L()("#typeField").val(),n=L()("#extraInfoField").val();e.layer.LUProperties={},e.layer.LUProperties.id=r,e.layer.LUProperties.type=s,e.layer.LUProperties.extraInfo=n,a.addLayer(e.layer),L()("#mainForm").off("submit"),L()("#cancelButton").off("click")}))})).on("baselayerchange",(function(e){a=e.layer}))}})),Object(M.jsxs)("div",{id:"geoman-wrapper",children:[Object(M.jsx)(N.a,{p:4,children:Object(M.jsx)(_,{})}),Object(M.jsx)(E.a,{m:1,onClick:function(){var e=null;t.current&&(e=function(e){if(t.current){var r={type:"FeatureCollection",features:[]},a=function(t){var a=r.features;e[t].forEach((function(e,r){e.pm._shape;var s=[];e.getLatLngs()[0].forEach((function(e,t){s.push([e.lng,e.lat])})),a.push({type:"Feature",id:t.toString()+r.toString(),properties:{floor:t,roomID:e.LUProperties.id,roomType:e.LUProperties.type,extraInfo:e.LUProperties.extraInfo},geometry:{type:"Polygon",coordinates:[s]}})}))};for(var s in e)a(s);return r}return alert("there was error processing map..."),""}(function(){var e={1:[],2:[],3:[],4:[],5:[],6:[],7:[],8:[]};return r.forEach((function(t,r){var a=t.current._layers;for(var s in a)"LUProperties"in a[s]&&e[r+1].push(a[s])})),e}())),L()("#bin-data-sent").html("<pre>"+JSON.stringify(e,void 0,2)+"</pre>")},id:"button-geoJSON",children:"Generate JSON"}),Object(M.jsx)(E.a,{m:1,id:"button-receive-data",children:"Receive data"}),Object(M.jsx)(E.a,{m:1,id:"button-clear",children:"Clear data"}),Object(M.jsxs)(V.a,{initialFocusRef:l,isOpen:o,onClose:c,children:[Object(M.jsx)(V.g,{}),Object(M.jsxs)(V.d,{children:[Object(M.jsx)(V.f,{children:"Pievienot jaunu telpu"}),Object(M.jsx)(V.c,{}),Object(M.jsxs)("form",{id:"mainForm",children:[Object(M.jsxs)(V.b,{pb:6,children:[Object(M.jsxs)(X.a,{children:[Object(M.jsx)(Y.a,{children:"ID*"}),Object(M.jsx)(A.a,{type:"number",id:"idField",ref:l,placeholder:"Piem\u0113ram, 312"})]}),Object(M.jsxs)(X.a,{my:5,children:[Object(M.jsx)(Y.a,{children:"Tips*"}),Object(M.jsxs)($.a,{id:"typeField",placeholder:"Izv\u0113lies tipu",children:[Object(M.jsx)("option",{value:"kabinets",children:"Kabinets"}),Object(M.jsx)("option",{value:"laboratorija",children:"Laboratorija"}),Object(M.jsx)("option",{value:"auditorija",children:"Auditorija"}),Object(M.jsx)("option",{value:"tualete",children:"Tualetes"}),Object(M.jsx)("option",{value:"telpa",children:"Cita telpa"})]})]}),Object(M.jsxs)(X.a,{children:[Object(M.jsx)(Y.a,{children:"Telpas nosaukums"}),Object(M.jsx)(A.a,{id:"extraInfoField",placeholder:"Piem\u0113ram, Studentu pa\u0161p\u0101rvaldes telpa"}),Object(M.jsx)(X.b,{children:"\u0160o j\u0101ieraksta tikai tad, ja telpai ir \u012bpa\u0161s nosaukums. Tas aizst\u0101j ID un tipu. "})]})]}),Object(M.jsxs)(V.e,{children:[Object(M.jsx)(E.a,{onClick:c,type:"submit",colorScheme:"blue",mr:3,children:"Saglab\u0101t"}),Object(M.jsx)(E.a,{onClick:c,id:"cancelButton",children:"Atcelt"})]})]})]})]}),Object(M.jsx)("div",{id:"bin-data-sent",className:"bin-data"}),Object(M.jsx)("div",{id:"bin-data-received-content",className:"bin-data"}),Object(M.jsx)(b.a,{whenCreated:function(e){t.current=e},bounds:e.bounds,center:e.center,maxZoom:1,minZoom:-5,doubleClickZoom:!1,crs:g.CRS.Simple,children:Object(M.jsxs)(f.a,{position:"topright",collapsed:!1,children:[Object(M.jsx)(f.a.BaseLayer,{checked:!0,name:e.theLayers[1].name,children:Object(M.jsx)(O.a,{ref:r[0],children:Object(M.jsx)(y.a,{bounds:e.bounds,url:e.pathToImg+e.theLayers[1].imageName})})}),Object(M.jsx)(f.a.BaseLayer,{name:e.theLayers[2].name,children:Object(M.jsx)(O.a,{ref:r[1],children:Object(M.jsx)(y.a,{bounds:e.bounds,url:e.pathToImg+e.theLayers[2].imageName})})}),Object(M.jsx)(f.a.BaseLayer,{name:e.theLayers[3].name,children:Object(M.jsx)(O.a,{ref:r[2],children:Object(M.jsx)(y.a,{bounds:e.bounds,url:e.pathToImg+e.theLayers[3].imageName})})}),Object(M.jsx)(f.a.BaseLayer,{name:e.theLayers[4].name,children:Object(M.jsx)(O.a,{ref:r[3],children:Object(M.jsx)(y.a,{bounds:e.bounds,url:e.pathToImg+e.theLayers[4].imageName})})}),Object(M.jsx)(f.a.BaseLayer,{name:e.theLayers[5].name,children:Object(M.jsx)(O.a,{ref:r[4],children:Object(M.jsx)(y.a,{bounds:e.bounds,url:e.pathToImg+e.theLayers[5].imageName})})}),Object(M.jsx)(f.a.BaseLayer,{name:e.theLayers[6].name,children:Object(M.jsx)(O.a,{ref:r[5],children:Object(M.jsx)(y.a,{bounds:e.bounds,url:e.pathToImg+e.theLayers[6].imageName})})}),Object(M.jsx)(f.a.BaseLayer,{name:e.theLayers[7].name,children:Object(M.jsx)(O.a,{ref:r[6],children:Object(M.jsx)(y.a,{bounds:e.bounds,url:e.pathToImg+e.theLayers[7].imageName})})}),Object(M.jsx)(f.a.BaseLayer,{name:e.theLayers[8].name,children:Object(M.jsx)(O.a,{ref:r[7],children:Object(M.jsx)(y.a,{bounds:e.bounds,url:e.pathToImg+e.theLayers[8].imageName})})})]})})]})},te=(r(153),function(e){Object(j.a)(r,e);var t=Object(p.a)(r);function r(e){var a;return Object(l.a)(this,r),(a=t.call(this,e)).state={searchTerm:""},a.handleChange=a.handleChange.bind(Object(h.a)(a)),a}return Object(u.a)(r,[{key:"handleChange",value:function(e){this.setState((function(t){return{searchTerm:e.target.value}}))}},{key:"render",value:function(){var e=window.location.origin+"/kartes/media/",t=[[0,0],[1e3,1e3]],r=[500,500],a={0:{name:"0. st\u0101vs",imageName:""},1:{name:"1. st\u0101vs",imageName:"zm1.svg"},2:{name:"2. st\u0101vs",imageName:"zm2.svg"},3:{name:"3. st\u0101vs",imageName:"zm3.svg"},4:{name:"4. st\u0101vs",imageName:"zm4.svg"},5:{name:"5. st\u0101vs",imageName:"zm5.svg"},6:{name:"6. st\u0101vs",imageName:"zm6.svg"},7:{name:"7. st\u0101vs",imageName:"zm7.svg"},8:{name:"8. st\u0101vs",imageName:"zm8.svg"}};return Object(M.jsx)(M.Fragment,{children:Object(M.jsx)(d.a,{children:Object(M.jsxs)(m.c,{children:[Object(M.jsx)(m.a,{exact:!0,path:"/geoman",render:function(s){return Object(M.jsx)(ee,Object(c.a)(Object(c.a)({},s),{},{pathToImg:e,bounds:t,center:r,theLayers:a}))}}),Object(M.jsx)(m.a,{exact:!0,path:"/search",render:function(s){return Object(M.jsx)(_,Object(c.a)(Object(c.a)({},s),{},{pathToImg:e,bounds:t,center:r,theLayers:a}))}}),Object(M.jsx)(m.a,{exact:!0,path:"/:floor?/:id?",render:function(s){return Object(M.jsx)(q,Object(c.a)(Object(c.a)({},s),{},{pathToImg:e,bounds:t,center:r,theLayers:a}))}}),Object(M.jsx)(m.a,{status:404,children:Object(M.jsx)("div",{children:"Page not found."})})]})})})}}]),r}(a.Component)),re=r(187),ae=Object(re.a)({colors:{primary:{100:"#E5FCF1",200:"#27EF96",300:"#10DE82",400:"#0EBE6F",500:"#0CA25F",600:"#0A864F",700:"#086F42",800:"#075C37",900:"#064C2E"}}}),se=document.getElementById("root");o.a.render(Object(M.jsx)(s.a.StrictMode,{children:Object(M.jsx)(i.a,{theme:ae,children:Object(M.jsx)(te,{})})}),se)}},[[154,1,2]]]);
//# sourceMappingURL=main.6f02d948.chunk.js.map