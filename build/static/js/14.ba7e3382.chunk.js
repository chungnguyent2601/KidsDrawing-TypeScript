(this["webpackJsonpreact-template"]=this["webpackJsonpreact-template"]||[]).push([[14],{724:function(e,t,a){},752:function(e,t,a){"use strict";a.r(t);var n=a(137),c=a(2),l=a.n(c),o=a(79),r=a(10),i=a(91),s=a(143),m=a.n(s),d=a(144),g=a.n(d),u=a(145),b=a.n(u),p=a(35),f=a(168),h=a(155);var O=function(e){var t=Object(o.b)(),a=Object(o.c)((function(e){return e.users})).students,n=Object(p.g)(),s=function(e){localStorage.removeItem("student_id"),localStorage.setItem("student_id",e.id.toString()),n.push({pathname:"/student/detail",state:{class_id:e.id}})},O={paginationSize:5,pageStartIndex:1,firstPageText:"First",prePageText:"Back",nextPageText:"Next",lastPageText:"Last",nextPageTitle:"First page",prePageTitle:"Pre page",firstPageTitle:"Next page",lastPageTitle:"Last page",showTotal:!0,totalSize:a.length,onSizePerPageChange:function(e,t){console.log("Size per page change!!!"),console.log("Newest size per page:"+e),console.log("Newest page:"+t)},onPageChange:function(e,t){console.log("Page change!!!"),console.log("Newest size per page:"+t),console.log("Newest page:"+e)}},v=[{dataField:"username",text:"T\xean \u0111\u0103ng nh\u1eadp",filter:Object(u.textFilter)()},{dataField:"email",text:"Email",filter:Object(u.textFilter)()},{dataField:"firstName",text:"H\u1ecd",filter:Object(u.textFilter)()},{dataField:"lastName",text:"T\xean",filter:Object(u.textFilter)()},{dataField:"dateOfBirth",text:"Ng\xe0y sinh",filter:Object(u.textFilter)()},{dataField:"sex",text:"Gi\u1edbi t\xednh",filter:Object(u.textFilter)()},{dataField:"phone",text:"S\u1ed1 \u0111i\u1ec7n tho\u1ea1i",filter:Object(u.textFilter)()},{dataField:"address",text:"H\xe0nh \u0111\u1ed9ng",formatter:function(a,n){return l.a.createElement("button",{type:"button",className:"btn btn-danger",onClick:function(){e.onSelect&&e.onSelect(n),t(Object(r.K)(i.a.Remove))}},l.a.createElement(h.a,{className:"icon-remove"}))}},{dataField:"",text:"",formatter:function(e,t){return l.a.createElement("button",{type:"button",className:"btn btn-info",onClick:function(){s(t)}},l.a.createElement(f.a,{className:"icon-remove"}))}}];return l.a.createElement(c.Fragment,null,l.a.createElement("div",null,l.a.createElement(d.PaginationProvider,{pagination:g()(O)},(function(e){e.paginationProps;var t=e.paginationTableProps;return l.a.createElement("div",null,l.a.createElement("div",null,l.a.createElement("div",null,l.a.createElement(m.a,Object.assign({hover:!0,keyField:"id",data:a,columns:v,filter:b()()},t)))))}))))},v=a(152),x=(a(724),a(89)),j=a(147),E=a(84),N=a(255),S=a(311),P=a(83),F=a(140),T=a(139),I=a(136);t.default=function(){var e=Object(o.b)(),t=Object(o.c)((function(e){return e.users})),a=Object(o.c)((function(e){return e.root.page})),s=t.students.length,m=Object(c.useState)(!1),d=Object(n.a)(m,2),g=d[0],u=d[1],b=Object(T.usePromiseTracker)().promiseInProgress,p=localStorage.getItem("access_token"),f=localStorage.getItem("refresh_token");return Object(c.useEffect)((function(){if(null!==p&&null!==f&&void 0!==p&&void 0!==f){var t=Object(F.a)(p),a=Object(F.a)(f),n=t.exp,c=a.exp,l=Date.now()/1e3;console.log(n),console.log(l),n<l?c<l?(localStorage.removeItem("access_token"),localStorage.removeItem("refresh_token"),localStorage.removeItem("username"),localStorage.removeItem("role"),localStorage.removeItem("id"),localStorage.removeItem("contest_id"),localStorage.removeItem("schedule_id"),e(Object(P.d)())):(Object(T.trackPromise)(Object(S.a)(e)),console.log("hello")):(Object(T.trackPromise)(Object(S.a)(e)),console.log("hello 1"))}}),[e,p,f]),Object(c.useEffect)((function(){e(Object(r.z)()),e(Object(x.b)("H\u1ecdc sinh","Danh s\xe1ch"))}),[a.area,e]),b?l.a.createElement("div",{className:"loader"}):l.a.createElement(c.Fragment,null,l.a.createElement("h1",{className:"h3 mb-2 text-gray-800"},"H\u1ecdc sinh"),l.a.createElement("p",{className:"mb-4"},"Th\xf4ng tin chung"),l.a.createElement("div",{className:"row"},l.a.createElement(v.a,{title:"H\u1eccC SINH",text:"".concat(s),icon:"user",class:"primary"})),l.a.createElement("div",{className:"row"},l.a.createElement("div",{className:"col-xl-12 col-lg-12"},l.a.createElement("div",{className:"card shadow mb-4"},l.a.createElement("div",{className:"card-header py-3"},l.a.createElement("h6",{className:"m-0 font-weight-bold text-green"},"Danh s\xe1ch h\u1ecdc sinh")),l.a.createElement("div",{className:"card-body"},l.a.createElement(O,{onSelect:function(t){e(Object(r.y)(t)),u(!0),e(Object(r.K)(i.a.None))}}))))),function(){if(t.selectedUser&&t.modificationState===i.a.Remove)return l.a.createElement(j.a,{open:g,onClose:function(){return u(!1)},closeOnDocumentClick:!0},l.a.createElement("div",{className:"popup-modal",id:"popup-modal"},l.a.createElement("div",{className:"popup-title"},"B\u1ea1n c\xf3 ch\u1eafc ch\u1eafn mu\u1ed1n x\xf3a?"),l.a.createElement("div",{className:"popup-content"},l.a.createElement("button",{type:"button",className:"btn btn-danger",onClick:function(){if(t.selectedUser){var a=I.b.loading("\u0110ang x\xe1c th\u1ef1c. Vui l\xf2ng \u0111\u1ee3i gi\xe2y l\xe1t...",{position:I.b.POSITION.TOP_CENTER});Object(N.a)(e,t.selectedUser.id,a),e(Object(E.c)("Ph\u1ee5 huynh","".concat(t.selectedUser.username," \u0111\xe3 \u0111\u01b0\u1ee3c x\xf3a!"))),e(Object(r.z)()),u(!1)}}},"Remove"))))}())}}}]);
//# sourceMappingURL=14.ba7e3382.chunk.js.map