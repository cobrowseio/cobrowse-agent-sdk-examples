(this["webpackJsonpcustom-agent-demo"]=this["webpackJsonpcustom-agent-demo"]||[]).push([[0],{131:function(e,t,n){},132:function(e,t,n){},209:function(e,t){},228:function(e,t,n){},229:function(e,t,n){},230:function(e,t,n){"use strict";n.r(t);var c=n(4),s=n.n(c),i=n(41),o=n(7),a=n.n(o),r=n(120),l=n.n(r),d=(n(131),n(42)),u=(n(132),n(0));function j(e){return Object(u.jsx)("div",{className:"FakeWindow",style:e.style,children:Object(u.jsxs)("div",{className:"window-chrome",children:[Object(u.jsx)("div",{className:"window-chrome-buttons"}),Object(u.jsx)("div",{className:"window-chrome-address"}),e.children]})})}var b=n(33),v=n(23),m=n(24),h=n(121),f=n.n(h),O=n(122),p=n(123),x=n(125),w=n(124),g=n(32),N=n.n(g),k=function(e){Object(x.a)(n,e);var t=Object(w.a)(n);function n(){return Object(O.a)(this,n),t.apply(this,arguments)}return Object(p.a)(n,[{key:"componentDidMount",value:function(){var e=this;this.interval=setInterval((function(){e.forceUpdate()}),1e3)}},{key:"componentWillUnmount",value:function(){clearInterval(this.interval)}},{key:"render",value:function(){var e=N()(this.props.start||0),t=N()(this.props.end||Date.now()),n=N()(t).diff(e),c=N.a.duration(n);return Object(u.jsxs)("div",{style:this.props.style,className:"Stopwatch",children:[c.hours()>0?Object(u.jsxs)("span",{children:[c.hours(),Object(u.jsx)("span",{children:":"})]}):null,Object(u.jsx)("span",{children:N.a.utc(n).format("mm:ss")})]})}}]),n}(o.Component),_=(n(228),new f.a);function C(e){var t=Object(o.useState)(null),n=Object(b.a)(t,2),c=n[0],a=n[1],r=Object(o.useState)(null),l=Object(b.a)(r,2),j=l[0],h=l[1],f=Object(o.useState)("laser"),O=Object(b.a)(f,2),p=O[0],x=O[1],w=Object(o.useState)(),g=Object(b.a)(w,2),N=g[0],C=g[1],y=Object(o.useState)(),S=Object(b.a)(y,2),D=S[0],I=S[1];function A(){return A=Object(i.a)(s.a.mark((function e(t){var n;return s.a.wrap((function(e){for(;;)switch(e.prev=e.next){case 0:if(N||!t){e.next=9;break}return e.next=3,_.attachContext(t);case 3:n=e.sent,window.cobrowse_ctx=n,n.on("session.updated",(function(e){a(e.toJSON()),e.isEnded()&&(n.destroy(),C(null))})),n.on("screen.updated",(function(e){I(e)})),n.on("error",(function(e){h(e)})),C(n);case 9:case"end":return e.stop()}}),e)}))),A.apply(this,arguments)}function E(e){x(e),null===N||void 0===N||N.setTool(e)}return Object(o.useEffect)((function(){var e=setInterval((function(){return I(Object(d.a)(Object(d.a)({},D),{},{time:Date.now()}))}),500);return function(){return clearInterval(e)}}),[D]),"ended"===(null===c||void 0===c?void 0:c.state)?Object(u.jsx)("div",{children:"The custom agent UI session has ended!"}):Object(u.jsx)("div",{className:"CustomAgentUIExample",children:Object(u.jsxs)("div",{className:"agent-session",children:[(console.log(j),j?Object(u.jsxs)("div",{className:"error",children:[Object(u.jsx)("b",{children:"Your custom error screen"}),Object(u.jsxs)("p",{children:["id = ",j.id]})]}):null),c&&"pending"!==(null===c||void 0===c?void 0:c.state)?"authorizing"===(null===c||void 0===c?void 0:c.state)?Object(u.jsx)("div",{className:"loading",children:"Custom waiting for user to accept message..."}):(null===D||void 0===D?void 0:D.width)?null:Object(u.jsx)("div",{className:"loading",children:"Custom loading loading video stream message..."}):Object(u.jsx)("div",{className:"loading",children:"Custom connecting to device message..."}),function(){if("active"===(null===c||void 0===c?void 0:c.state)&&(null===D||void 0===D?void 0:D.updated)){var e=new Date(null===D||void 0===D?void 0:D.updated);if(Date.now()-e.getTime()>1e4)return Object(u.jsx)("div",{className:"disconnected",children:"Having trouble reaching the device!"})}return null}(),Object(u.jsx)("iframe",{ref:function(e){return A.apply(this,arguments)},className:"screen",title:"Agent Session",frameBorder:0,src:"".concat(e.api,"/connect?filter_cobrowseio_demo_id=").concat(e.demoId,"&token=").concat(e.token,"&end_action=none&agent_tools=none&device_controls=none&session_details=none&popout=none&messages=none")}),"active"!==(null===c||void 0===c?void 0:c.state)?null:Object(u.jsxs)("div",{className:"agent-controls",children:[Object(u.jsx)("div",{className:"timer",children:Object(u.jsx)(k,{start:c.activated})}),Object(u.jsx)("div",{onClick:function(){return E("laser")},title:"Laser Pointer",className:"btn btn-left-most ".concat("laser"===p?"btn-selected":""),children:Object(u.jsx)(v.a,{icon:m.d})}),Object(u.jsx)("div",{onClick:function(){return E("drawing")},title:"Draw",className:"btn ".concat("drawing"===p?"btn-selected":""),children:Object(u.jsx)(v.a,{icon:m.c})}),Object(u.jsx)("div",{onClick:function(){return N.clearAnnotations()},title:"Clear Drawing",className:"btn",children:Object(u.jsx)(v.a,{icon:m.f})}),Object(u.jsx)("div",{onClick:function(){return E("control")},title:"Remote Control",className:"btn ".concat("control"===p?"btn-selected":""),children:Object(u.jsx)(v.a,{icon:m.b})}),Object(u.jsx)("div",{onClick:function(){return N.setFullDevice(!c.full_device)},title:"Full Device Mode",className:"btn ".concat(c.full_device?"full-device-on":""),children:Object(u.jsx)(v.a,{icon:m.a})}),Object(u.jsx)("div",{onClick:function(){return N.endSession()},title:"End Screenshare",className:"btn btn-right-most btn-end",children:Object(u.jsx)(v.a,{icon:m.e,className:"fa-rotate-180"})})]})]})})}n(229);var y=function(e){return Object(u.jsxs)("div",{className:"App",children:[Object(u.jsxs)("div",{className:"agent-view",children:[Object(u.jsx)("h2",{children:"Your Support Agent"}),Object(u.jsx)(j,{children:Object(u.jsx)(C,Object(d.a)({},e))})]}),function(){var t={cobrowseio_demo_id:e.demoId,license:"trial",api:e.api,device_name:"Trial Website"};return Object(u.jsxs)("div",{className:"customer-view",children:[Object(u.jsx)("h2",{children:"Your Customer"}),Object(u.jsx)(j,{children:Object(u.jsx)("iframe",{className:"device",title:"Device",frameBorder:0,width:"100%",height:"100%",src:"https://cobrowseio.github.io/todo-mvc-example/index.html?cobrowseio_demo_id=".concat(t.cobrowseio_demo_id,"&device_name=Web%20Trial%20Device&license=").concat(t.license,"&api=").concat(t.api)})})]})}()]})},S="https://cobrowse.io";function D(e){return I.apply(this,arguments)}function I(){return(I=Object(i.a)(s.a.mark((function e(t){var n,c,i;return s.a.wrap((function(e){for(;;)switch(e.prev=e.next){case 0:if(t){e.next=2;break}return e.abrupt("return");case 2:return window.localStorage.cobrowse_demo_id=t,e.next=5,fetch("".concat(S,"/api/1/demo/token?cobrowseio_demo_id=").concat(t));case 5:return n=e.sent,e.next=8,n.json();case 8:return c=e.sent,i=c.token,e.abrupt("return",i);case 11:case"end":return e.stop()}}),e)})))).apply(this,arguments)}function A(e,t,n){l.a.render(Object(u.jsx)(a.a.StrictMode,{children:Object(u.jsx)(y,{token:e,demoId:t,api:n})}),document.getElementById("root"))}Object(i.a)(s.a.mark((function e(){var t;return s.a.wrap((function(e){for(;;)switch(e.prev=e.next){case 0:return t=Date.now()*Math.random(),e.next=3,D(t);case 3:A(e.sent,t,S);case 5:case"end":return e.stop()}}),e)})))()}},[[230,1,2]]]);
//# sourceMappingURL=main.efb87be3.chunk.js.map