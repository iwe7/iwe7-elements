!function(n){function e(e){for(var o,r,c=e[0],a=e[1],p=e[2],i=0,s=[];i<c.length;i++)r=c[i],l[r]&&s.push(l[r][0]),l[r]=0;for(o in a)Object.prototype.hasOwnProperty.call(a,o)&&(n[o]=a[o]);for(d&&d(e);s.length;)s.shift()();return u.push.apply(u,p||[]),t()}function t(){for(var n,e=0;e<u.length;e++){for(var t=u[e],o=!0,c=1;c<t.length;c++){var a=t[c];0!==l[a]&&(o=!1)}o&&(u.splice(e--,1),n=r(r.s=t[0]))}return n}var o={},l={3:0};var u=[];function r(e){if(o[e])return o[e].exports;var t=o[e]={i:e,l:!1,exports:{}};return n[e].call(t.exports,t,t.exports,r),t.l=!0,t.exports}r.m=n,r.c=o,r.d=function(n,e,t){r.o(n,e)||Object.defineProperty(n,e,{configurable:!1,enumerable:!0,get:t})},r.r=function(n){Object.defineProperty(n,"__esModule",{value:!0})},r.n=function(n){var e=n&&n.__esModule?function(){return n.default}:function(){return n};return r.d(e,"a",e),e},r.o=function(n,e){return Object.prototype.hasOwnProperty.call(n,e)},r.p="";var c=window.webpackJsonp=window.webpackJsonp||[],a=c.push.bind(c);c.push=e,c=c.slice();for(var p=0;p<c.length;p++)e(c[p]);var d=a;u.push([90,0]),t()}({90:function(n,e,t){"use strict";t.r(e);var o=t(0),l=function(){function n(){this.hasLoad=!1}return n.prototype.ngOnInit=function(){},n.prototype.load=function(){if(this.hasLoad)alert("已加载");else{var n=document.createElement("script");n.src="https://meepo.com.cn/elements/demo2.js?t=5",n.onload=function(){setTimeout(function(){var n=document.createElement("app-demo2-test1"),e=document.createElement("app-demo2-test2"),t=document.createElement("app-demo2-test3");document.body.appendChild(n),document.body.appendChild(e),document.body.appendChild(t)},3e3)},document.head.appendChild(n),this.hasLoad=!0}},n.decorators=[{type:o.Component,args:[{selector:"app-demo1-test1",template:'app demo1 test1  <br>  <button (click)="load()">加载demo2</button>'}]}],n.ctorParameters=function(){return[]},n}(),u=o["ɵcrt"]({encapsulation:2,styles:[],data:{}});function r(n){return o["ɵvid"](0,[(n()(),o["ɵted"](-1,null,["app demo1 test1 "])),(n()(),o["ɵeld"](1,0,null,null,0,"br",[],null,null,null,null,null)),(n()(),o["ɵeld"](2,0,null,null,1,"button",[],null,[[null,"click"]],function(n,e,t){var o=!0,l=n.component;"click"===e&&(o=!1!==l.load()&&o);return o},null,null)),(n()(),o["ɵted"](-1,null,["加载demo2"]))],null,null)}var c=o["ɵccf"]("app-demo1-test1",l,function(n){return o["ɵvid"](0,[(n()(),o["ɵeld"](0,0,null,null,1,"app-demo1-test1",[],null,null,null,r,u)),o["ɵdid"](1,114688,null,0,l,[],null,null)],function(n,e){n(e,1,0)},null)},{},{},[]),a=function(){function n(){}return n.prototype.ngOnInit=function(){},n.decorators=[{type:o.Component,args:[{selector:"app-demo1-test2",template:"app demo1 test2  <br>"}]}],n.ctorParameters=function(){return[]},n}(),p=o["ɵcrt"]({encapsulation:2,styles:[],data:{}});function d(n){return o["ɵvid"](0,[(n()(),o["ɵted"](-1,null,["app demo1 test2 "])),(n()(),o["ɵeld"](1,0,null,null,0,"br",[],null,null,null,null,null))],null,null)}var i=o["ɵccf"]("app-demo1-test2",a,function(n){return o["ɵvid"](0,[(n()(),o["ɵeld"](0,0,null,null,1,"app-demo1-test2",[],null,null,null,d,p)),o["ɵdid"](1,114688,null,0,a,[],null,null)],function(n,e){n(e,1,0)},null)},{},{},[]),s=function(){function n(){}return n.prototype.ngOnInit=function(){},n.decorators=[{type:o.Component,args:[{selector:"app-demo1-test3",template:"app demo1 test3 <br>"}]}],n.ctorParameters=function(){return[]},n}(),m=o["ɵcrt"]({encapsulation:2,styles:[],data:{}});function f(n){return o["ɵvid"](0,[(n()(),o["ɵted"](-1,null,["app demo1 test3 "])),(n()(),o["ɵeld"](1,0,null,null,0,"br",[],null,null,null,null,null))],null,null)}var v=o["ɵccf"]("app-demo1-test3",s,function(n){return o["ɵvid"](0,[(n()(),o["ɵeld"](0,0,null,null,1,"app-demo1-test3",[],null,null,null,f,m)),o["ɵdid"](1,114688,null,0,s,[],null,null)],function(n,e){n(e,1,0)},null)},{},{},[]),y=t(4),h=t(3),b=t(2);Object(y["ɵinitDomAdapter"])();var g=function(){function n(){}return n.prototype.ngDoBootstrap=function(){},n.decorators=[{type:o.NgModule,args:[{imports:[h.CommonModule,b.RouterModule.forChild([])],exports:[l,a,s],declarations:[l,a,s],entryComponents:[l,a,s],providers:[]}]}],n}(),C=o["ɵcmf"](g,[],function(n){return o["ɵmod"]([o["ɵmpd"](512,o.ComponentFactoryResolver,o["ɵCodegenComponentFactoryResolver"],[[8,[c,i,v]],[3,o.ComponentFactoryResolver],o.NgModuleRef]),o["ɵmpd"](4608,h.NgLocalization,h.NgLocaleLocalization,[o.LOCALE_ID,[2,h["ɵangular_packages_common_common_a"]]]),o["ɵmpd"](1073742336,h.CommonModule,h.CommonModule,[]),o["ɵmpd"](1073742336,b.RouterModule,b.RouterModule,[[2,b["ɵangular_packages_router_router_a"]],[2,b.Router]]),o["ɵmpd"](1073742336,g,g,[]),o["ɵmpd"](1024,b.ROUTES,function(){return[[]]},[])])}),O=t(24),j=t(39),_=C.create(j.a).injector;customElements.define(c.selector,Object(O.a)(c.componentType,{injector:_})),customElements.define(i.selector,Object(O.a)(i.componentType,{injector:_})),customElements.define(v.selector,Object(O.a)(v.componentType,{injector:_}))}});