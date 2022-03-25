(this["webpackJsonpcustom-agent-demo"]=this["webpackJsonpcustom-agent-demo"]||[]).push([[0],{180:function(e,t,n){},181:function(e,t,n){},251:function(e,t){},272:function(e,t,n){},273:function(e,t,n){},274:function(e,t,n){"use strict";n.r(t);var c=n(10),i=n.n(c),s=n(62),a=n(16),o=n.n(a),r=n(170),l=n.n(r),d=(n(180),n(63)),u=(n(181),n(1));function j(e){return Object(u.jsx)("div",{className:"FakeWindow",style:e.style,children:Object(u.jsxs)("div",{className:"window-chrome",children:[Object(u.jsx)("div",{className:"window-chrome-buttons"}),Object(u.jsx)("div",{className:"window-chrome-address"}),e.children]})})}var b=n(65),v=n(42),m=n(43),h=n(171),f=n.n(h),p=n(172),O=n(173),x=n(175),w=n(174),g=n(51),N=n.n(g),k=function(e){Object(x.a)(n,e);var t=Object(w.a)(n);function n(){return Object(p.a)(this,n),t.apply(this,arguments)}return Object(O.a)(n,[{key:"componentDidMount",value:function(){var e=this;this.interval=setInterval((function(){e.forceUpdate()}),1e3)}},{key:"componentWillUnmount",value:function(){clearInterval(this.interval)}},{key:"render",value:function(){var e=N()(this.props.start||0),t=N()(this.props.end||Date.now()),n=N()(t).diff(e),c=N.a.duration(n);return Object(u.jsxs)("div",{style:this.props.style,className:"Stopwatch",children:[c.hours()>0?Object(u.jsxs)("span",{children:[c.hours(),Object(u.jsx)("span",{children:":"})]}):null,Object(u.jsx)("span",{children:N.a.utc(n).format("mm:ss")})]})}}]),n}(a.Component),_=(n(272),new f.a);function C(e){var t=Object(a.useState)(null),n=Object(b.a)(t,2),c=n[0],o=n[1],r=Object(a.useState)("laser"),l=Object(b.a)(r,2),j=l[0],h=l[1],f=Object(a.useState)(),p=Object(b.a)(f,2),O=p[0],x=p[1],w=Object(a.useState)(),g=Object(b.a)(w,2),N=g[0],C=g[1];function y(){return y=Object(s.a)(i.a.mark((function e(t){var n;return i.a.wrap((function(e){for(;;)switch(e.prev=e.next){case 0:if(O||!t){e.next=8;break}return e.next=3,_.attachContext(t);case 3:n=e.sent,window.cobrowse_ctx=n,n.on("session.updated",(function(e){o(e.toJSON()),e.isEnded()&&(n.destroy(),x(null))})),n.on("screen.updated",(function(e){C(e)})),x(n);case 8:case"end":return e.stop()}}),e)}))),y.apply(this,arguments)}function D(e){h(e),null===O||void 0===O||O.setTool(e)}return Object(a.useEffect)((function(){var e=setInterval((function(){return C(Object(d.a)(Object(d.a)({},N),{},{time:Date.now()}))}),500);return function(){return clearInterval(e)}}),[N]),"ended"===(null===c||void 0===c?void 0:c.state)?Object(u.jsx)("div",{children:"The custom agent UI session has ended!"}):Object(u.jsx)("div",{className:"CustomAgentUIExample",children:Object(u.jsxs)("div",{className:"agent-session",children:[c&&"pending"!==(null===c||void 0===c?void 0:c.state)?"authorizing"===(null===c||void 0===c?void 0:c.state)?Object(u.jsx)("div",{className:"loading",children:"Custom waiting for user to accept message..."}):(null===N||void 0===N?void 0:N.width)?null:Object(u.jsx)("div",{className:"loading",children:"Custom loading loading video stream message..."}):Object(u.jsx)("div",{className:"loading",children:"Custom connecting to device message..."}),function(){if("active"===(null===c||void 0===c?void 0:c.state)&&(null===N||void 0===N?void 0:N.updated)){var e=new Date(null===N||void 0===N?void 0:N.updated);if(Date.now()-e.getTime()>1e4)return Object(u.jsx)("div",{className:"disconnected",children:"Having trouble reaching the device!"})}return null}(),Object(u.jsx)("iframe",{ref:function(e){return y.apply(this,arguments)},className:"screen",title:"Agent Session",frameBorder:0,src:"".concat(e.api,"/connect?filter_cobrowseio_demo_id=").concat(e.demoId,"&token=").concat(e.token,"&end_action=none&agent_tools=none&device_controls=none&session_details=none&popout=none&messages=none")}),"active"!==(null===c||void 0===c?void 0:c.state)?null:Object(u.jsxs)("div",{className:"agent-controls",children:[Object(u.jsx)("div",{className:"timer",children:Object(u.jsx)(k,{start:c.activated})}),Object(u.jsx)("div",{onClick:function(){return D("laser")},title:"Laser Pointer",className:"btn btn-left-most ".concat("laser"===j?"btn-selected":""),children:Object(u.jsx)(v.a,{icon:m.d})}),Object(u.jsx)("div",{onClick:function(){return D("drawing")},title:"Draw",className:"btn ".concat("drawing"===j?"btn-selected":""),children:Object(u.jsx)(v.a,{icon:m.c})}),Object(u.jsx)("div",{onClick:function(){return O.clearAnnotations()},title:"Clear Drawing",className:"btn",children:Object(u.jsx)(v.a,{icon:m.f})}),Object(u.jsx)("div",{onClick:function(){return D("control")},title:"Remote Control",className:"btn ".concat("control"===j?"btn-selected":""),children:Object(u.jsx)(v.a,{icon:m.b})}),Object(u.jsx)("div",{onClick:function(){return O.setFullDevice(!c.full_device)},title:"Full Device Mode",className:"btn ".concat(c.full_device?"full-device-on":""),children:Object(u.jsx)(v.a,{icon:m.a})}),Object(u.jsx)("div",{onClick:function(){return O.endSession()},title:"End Screenshare",className:"btn btn-right-most btn-end",children:Object(u.jsx)(v.a,{icon:m.e,className:"fa-rotate-180"})})]})]})})}n(273);var y=function(e){return Object(u.jsxs)("div",{className:"App",children:[Object(u.jsxs)("div",{className:"agent-view",children:[Object(u.jsx)("h2",{children:"Your Support Agent"}),Object(u.jsx)(j,{children:Object(u.jsx)(C,Object(d.a)({},e))})]}),function(){var t={cobrowseio_demo_id:e.demoId,license:"trial",api:e.api,device_name:"Trial Website"};return Object(u.jsxs)("div",{className:"customer-view",children:[Object(u.jsx)("h2",{children:"Your Customer"}),Object(u.jsx)(j,{children:Object(u.jsx)("iframe",{className:"device",title:"Device",frameBorder:0,width:"100%",height:"100%",src:"".concat(e.api,"/todomvc/index.html?cobrowseio_demo_id=").concat(t.cobrowseio_demo_id,"&device_name=Web%20Trial%20Device&license=").concat(t.license,"&api=").concat(t.api)})})]})}()]})},D="https://cobrowse.io";function S(e){return I.apply(this,arguments)}function I(){return(I=Object(s.a)(i.a.mark((function e(t){var n,c,s;return i.a.wrap((function(e){for(;;)switch(e.prev=e.next){case 0:if(t){e.next=2;break}return e.abrupt("return");case 2:return window.localStorage.cobrowse_demo_id=t,e.next=5,fetch("".concat(D,"/api/1/demo/token?cobrowseio_demo_id=").concat(t));case 5:return n=e.sent,e.next=8,n.json();case 8:return c=e.sent,s=c.token,e.abrupt("return",s);case 11:case"end":return e.stop()}}),e)})))).apply(this,arguments)}function A(e,t,n){l.a.render(Object(u.jsx)(o.a.StrictMode,{children:Object(u.jsx)(y,{token:e,demoId:t,api:n})}),document.getElementById("root"))}Object(s.a)(i.a.mark((function e(){var t;return i.a.wrap((function(e){for(;;)switch(e.prev=e.next){case 0:return t=Date.now()*Math.random(),e.next=3,S(t);case 3:A(e.sent,t,D);case 5:case"end":return e.stop()}}),e)})))()}},[[274,1,2]]]);
//# sourceMappingURL=main.2bb8bb7f.chunk.js.map