!function(n){function t(t){for(var o,r,a=t[0],p=t[1],c=t[2],s=0,i=[];s<a.length;s++)r=a[s],l[r]&&i.push(l[r][0]),l[r]=0;for(o in p)Object.prototype.hasOwnProperty.call(p,o)&&(n[o]=p[o]);for(d&&d(t);i.length;)i.shift()();return u.push.apply(u,c||[]),e()}function e(){for(var n,t=0;t<u.length;t++){for(var e=u[t],o=!0,a=1;a<e.length;a++){var p=e[a];0!==l[p]&&(o=!1)}o&&(u.splice(t--,1),n=r(r.s=e[0]))}return n}var o={},l={3:0};var u=[];function r(t){if(o[t])return o[t].exports;var e=o[t]={i:t,l:!1,exports:{}};return n[t].call(e.exports,e,e.exports,r),e.l=!0,e.exports}r.m=n,r.c=o,r.d=function(n,t,e){r.o(n,t)||Object.defineProperty(n,t,{configurable:!1,enumerable:!0,get:e})},r.r=function(n){Object.defineProperty(n,"__esModule",{value:!0})},r.n=function(n){var t=n&&n.__esModule?function(){return n.default}:function(){return n};return r.d(t,"a",t),t},r.o=function(n,t){return Object.prototype.hasOwnProperty.call(n,t)},r.p="";var a=window.webpackJsonp=window.webpackJsonp||[],p=a.push.bind(a);a.push=t,a=a.slice();for(var c=0;c<a.length;c++)t(a[c]);var d=p;u.push([90,0]),e()}({90:function(n,t,e){"use strict";e.r(t);var o=e(39),l=e(0),u=function(){function n(){this.hasLoad=!1}return n.prototype.ngOnInit=function(){},n.prototype.load=function(){if(this.hasLoad)alert("已加载");else{var n=document.createElement("script");n.src="https://meepo.com.cn/elements/element2.js?t=7",n.onload=function(){setTimeout(function(){var n=document.createElement("app-demo2-test1"),t=document.createElement("app-demo2-test2"),e=document.createElement("app-demo2-test3");document.body.appendChild(n),document.body.appendChild(t),document.body.appendChild(e)},300)},document.head.appendChild(n),this.hasLoad=!0}},n.decorators=[{type:l.Component,args:[{selector:"app-demo1-test1",template:'app demo1 test1  <br>  <button (click)="load()">加载demo2</button>'}]}],n.ctorParameters=function(){return[]},n}(),r=function(){function n(){}return n.prototype.ngOnInit=function(){},n.decorators=[{type:l.Component,args:[{selector:"app-demo1-test2",template:"app demo1 test2  <br>"}]}],n.ctorParameters=function(){return[]},n}(),a=function(){function n(){}return n.prototype.ngOnInit=function(){},n.decorators=[{type:l.Component,args:[{selector:"app-demo1-test3",template:"app demo1 test3 <br>"}]}],n.ctorParameters=function(){return[]},n}(),p=e(4),c=e(3),d=e(2);Object(p["ɵinitDomAdapter"])();var s=function(){function n(){}return n.prototype.ngDoBootstrap=function(){},n.prototype.getElements=function(){return[{selector:"app-demo1-test1",component:u},{selector:"app-demo1-test2",component:r},{selector:"app-demo1-test3",component:a}]},n.decorators=[{type:l.NgModule,args:[{imports:[c.CommonModule,d.RouterModule.forChild([])],exports:[u,r,a],declarations:[u,r,a],entryComponents:[u,r,a],providers:[]}]}],n}(),i=l["ɵcrt"]({encapsulation:2,styles:[],data:{}});function m(n){return l["ɵvid"](0,[(n()(),l["ɵted"](-1,null,["app demo1 test1 "])),(n()(),l["ɵeld"](1,0,null,null,0,"br",[],null,null,null,null,null)),(n()(),l["ɵeld"](2,0,null,null,1,"button",[],null,[[null,"click"]],function(n,t,e){var o=!0,l=n.component;"click"===t&&(o=!1!==l.load()&&o);return o},null,null)),(n()(),l["ɵted"](-1,null,["加载demo2"]))],null,null)}var f=l["ɵccf"]("app-demo1-test1",u,function(n){return l["ɵvid"](0,[(n()(),l["ɵeld"](0,0,null,null,1,"app-demo1-test1",[],null,null,null,m,i)),l["ɵdid"](1,114688,null,0,u,[],null,null)],function(n,t){n(t,1,0)},null)},{},{},[]),v=l["ɵcrt"]({encapsulation:2,styles:[],data:{}});function y(n){return l["ɵvid"](0,[(n()(),l["ɵted"](-1,null,["app demo1 test2 "])),(n()(),l["ɵeld"](1,0,null,null,0,"br",[],null,null,null,null,null))],null,null)}var h=l["ɵccf"]("app-demo1-test2",r,function(n){return l["ɵvid"](0,[(n()(),l["ɵeld"](0,0,null,null,1,"app-demo1-test2",[],null,null,null,y,v)),l["ɵdid"](1,114688,null,0,r,[],null,null)],function(n,t){n(t,1,0)},null)},{},{},[]),g=l["ɵcrt"]({encapsulation:2,styles:[],data:{}});function b(n){return l["ɵvid"](0,[(n()(),l["ɵted"](-1,null,["app demo1 test3 "])),(n()(),l["ɵeld"](1,0,null,null,0,"br",[],null,null,null,null,null))],null,null)}var C=l["ɵccf"]("app-demo1-test3",a,function(n){return l["ɵvid"](0,[(n()(),l["ɵeld"](0,0,null,null,1,"app-demo1-test3",[],null,null,null,b,g)),l["ɵdid"](1,114688,null,0,a,[],null,null)],function(n,t){n(t,1,0)},null)},{},{},[]),O=l["ɵcmf"](s,[],function(n){return l["ɵmod"]([l["ɵmpd"](512,l.ComponentFactoryResolver,l["ɵCodegenComponentFactoryResolver"],[[8,[f,h,C]],[3,l.ComponentFactoryResolver],l.NgModuleRef]),l["ɵmpd"](4608,c.NgLocalization,c.NgLocaleLocalization,[l.LOCALE_ID,[2,c["ɵangular_packages_common_common_a"]]]),l["ɵmpd"](1073742336,c.CommonModule,c.CommonModule,[]),l["ɵmpd"](1073742336,d.RouterModule,d.RouterModule,[[2,d["ɵangular_packages_router_router_a"]],[2,d.Router]]),l["ɵmpd"](1073742336,s,s,[]),l["ɵmpd"](1024,d.ROUTES,function(){return[[]]},[])])}),_=e(38);Object(_.a)(o.a,O)}});