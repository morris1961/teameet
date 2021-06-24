(()=>{"use strict";var e={n:t=>{var r=t&&t.__esModule?()=>t.default:()=>t;return e.d(r,{a:r}),r},d:(t,r)=>{for(var n in r)e.o(r,n)&&!e.o(t,n)&&Object.defineProperty(t,n,{enumerable:!0,get:r[n]})},o:(e,t)=>Object.prototype.hasOwnProperty.call(e,t)};const t=require("@babel/runtime/helpers/asyncToGenerator");var r=e.n(t);const n=require("@babel/runtime/regenerator");var a=e.n(n);const s=require("http");var o=e.n(s);const i=require("express");var u=e.n(i);const c=require("dotenv-defaults");var p=e.n(c);const l=require("ws");var f=e.n(l);const d=require("mongoose");var m=e.n(d);const g=function(){m().connect(process.env.MONGO_URL,{useCreateIndex:!0,useNewUrlParser:!0,useUnifiedTopology:!0,useFindAndModify:!1});var e=m().connection;e.on("error",console.error.bind(console,"connection error:")),e.once("open",(function(){console.log("Mongo database connected!")}))};var b=new(0,m().Schema)({email:{type:String,required:!0,match:/^\w+((-\w+)|(\.\w+))*\@[A-Za-z0-9]+((\.|-)[A-Za-z0-9]+)*\.[A-Za-z]+$/,unique:!0},UName:{type:String,required:!0},password:{type:String,required:!0},groups:[{type:m().Types.ObjectId,ref:"Group"}]});const h=m().model("User",b);function v(){return(v=r()(a().mark((function e(t){var r,n,s,o,i,u;return a().wrap((function(e){for(;;)switch(e.prev=e.next){case 0:return r=t.email,n=t.UName,s=t.password,o=!1,i="Something wrong...",e.prev=3,e.next=6,h.findOne({email:r});case 6:if(!e.sent){e.next=12;break}o=!1,i="The email has been used!",e.next=17;break;case 12:return u=new h({email:r,UName:n,password:s}),e.next=15,u.save();case 15:o=!0,i="Successed!";case 17:e.next=25;break;case 19:e.prev=19,e.t0=e.catch(3),console.log(e.t0),o=!1,i="Something wrong...";case 25:return e.abrupt("return",{status:o,error_msg:i});case 26:case"end":return e.stop()}}),e,null,[[3,19]])})))).apply(this,arguments)}const y=function(e){return v.apply(this,arguments)};function x(){return(x=r()(a().mark((function e(t){var r,n,s,o,i,u;return a().wrap((function(e){for(;;)switch(e.prev=e.next){case 0:return r=t.email,n=t.password,s=!1,o="",i="Something wrong...",e.prev=4,e.next=7,h.findOne({email:r,password:n});case 7:(u=e.sent)?(o=u._id,s=!0,i="Successed!"):(s=!1,i="The email or password is invalid!"),e.next=17;break;case 11:e.prev=11,e.t0=e.catch(4),console.log(e.t0),s=!1,i="Something wrong...";case 17:return e.abrupt("return",{status:s,UID:o,error_msg:i});case 18:case"end":return e.stop()}}),e,null,[[4,11]])})))).apply(this,arguments)}const w=function(e){return x.apply(this,arguments)};var k=new(0,m().Schema)({GName:{type:String,required:!0},admin:{type:m().Types.ObjectId,required:!0,ref:"User"},code:{type:String,unique:!0,match:/^#/},messages:[{type:m().Types.ObjectId,ref:"Message"}],file:{type:String,default:""},discussions:[{type:m().Types.ObjectId,ref:"Discussion"}]});const S=m().model("Group",k);function _(){return(_=r()(a().mark((function e(t){var r,n,s,o,i,u,c,p,l;return a().wrap((function(e){for(;;)switch(e.prev=e.next){case 0:return r=t.GName,n=t.admin,s=t.file,o=!1,i="",u="Something wrong...",e.prev=4,e.next=7,h.findById(n);case 7:if(c=e.sent){e.next=12;break}return o=!1,u="The user is not valid!",e.abrupt("return",{status:o,error_msg:u});case 12:return p=new S({GName:r,admin:n,file:s}),e.next=15,p.save();case 15:return i=p._id,e.next=18,S.updateOne({_id:i},{$set:{code:"#".concat(i.toString().slice(-6))}});case 18:return(l=c.groups).push(i),e.next=22,h.updateOne({_id:n},{$set:{groups:l}});case 22:o=!0,u="Successed!",e.next=32;break;case 26:e.prev=26,e.t0=e.catch(4),console.log(e.t0),o=!1,u="Something wrong...";case 32:return e.abrupt("return",{status:o,GID:i,GName:r,error_msg:u});case 33:case"end":return e.stop()}}),e,null,[[4,26]])})))).apply(this,arguments)}const I=function(e){return _.apply(this,arguments)};function D(){return(D=r()(a().mark((function e(t){var r,n,s,o,i,u,c,p,l,f,d,m;return a().wrap((function(e){for(;;)switch(e.prev=e.next){case 0:return r=t.UID,n=t.code,s=!1,o="",i=[],u="Something wrong...",e.prev=5,e.next=8,S.findOne({code:n});case 8:if(c=e.sent){e.next=13;break}return s=!1,u="The code is not valid!",e.abrupt("return",{status:s,error_msg:u});case 13:return e.next=15,h.findById(r);case 15:if(p=e.sent){e.next=20;break}return s=!1,u="The user is not valid!",e.abrupt("return",{status:s,error_msg:u});case 20:l=p.groups,f=0;case 22:if(!(f<l.length)){e.next=34;break}if(l[f].toString()!==c._id.toString()){e.next=27;break}return s=!1,u="The user has been in the group!",e.abrupt("return",{status:s,error_msg:u});case 27:return e.next=29,S.findById(l[f]);case 29:d=e.sent,i.push(d.GName);case 31:f++,e.next=22;break;case 34:return l.push(c._id),e.next=37,h.updateOne({_id:r},{$set:{groups:l}});case 37:return e.next=39,S.findById(c._id);case 39:m=e.sent,i.push(m.GName),s=!0,u="Successed!",e.next=51;break;case 45:e.prev=45,e.t0=e.catch(5),console.log(e.t0),s=!1,u="Something wrong...";case 51:return e.abrupt("return",{status:s,GID:o,GName:i,error_msg:u});case 52:case"end":return e.stop()}}),e,null,[[5,45]])})))).apply(this,arguments)}const T=function(e){return D.apply(this,arguments)};var A=new(0,m().Schema)({admin:{type:m().Types.ObjectId,required:!0,ref:"User"},subject:{type:String,required:!0},time_start:{type:Date,required:!0},time_end:{type:Date,required:!0},time_span:{type:Number,enum:[30,60,120],default:60},time_options:{type:Map,of:[{type:m().Types.ObjectId,ref:"User"}],default:{}},deadline:{type:Date,required:!0},time_result:{type:Date,default:new Date(0)},place_options:{type:Map,of:[{type:m().Types.ObjectId,ref:"User"}],default:{}},place_result:{type:String,default:""},content:{type:String,default:""}});const O=m().model("Discussion",A);function j(){return(j=r()(a().mark((function e(t){var r,n,s,o,i,u,c,p,l,f,d,m,g,b,v;return a().wrap((function(e){for(;;)switch(e.prev=e.next){case 0:return r=t.UID,n=!1,s="",o=[],i=[],u=[],c="Something wrong...",e.prev=7,p=(new Date).getTime(),e.next=11,h.findById(r);case 11:if(l=e.sent){e.next=16;break}return n=!1,c="The user is not valid!",e.abrupt("return",{status:n,error_msg:c});case 16:s=l.UName,f=l.groups,d=0;case 19:if(!(d<f.length)){e.next=37;break}return e.next=22,S.findById(f[d]);case 22:m=e.sent,u.push({GID:m._id,GName:m.GName}),g=m.discussions,b=0;case 26:if(!(b<g.length)){e.next=34;break}return e.next=29,O.findById(g[b]);case 29:v=e.sent,p-v.deadline.getTime()<0?o.push({GID:m._id,DID:v._id,GName:m.GName,subject:v.subject,time_result:v.time_result,place:v.place_result,deadline:v.deadline}):p-v.time_result.getTime()<0&&i.push({GID:m._id,DID:v._id,GName:m.GName,subject:v.subject,time_result:v.time_result,place:v.place_result});case 31:b++,e.next=26;break;case 34:d++,e.next=19;break;case 37:o.sort((function(e,t){return e.deadline.getTime()<t.deadline.getTime()?1:t.deadline.getTime()<e.deadline.getTime()?-1:0})),i.sort((function(e,t){return e.time_result.getTime()<t.time_result.getTime()?1:t.time_result.getTime()<e.time_result.getTime()?-1:0})),n=!0,c="Successed!",e.next=49;break;case 43:e.prev=43,e.t0=e.catch(7),console.log(e.t0),n=!1,c="Something wrong...";case 49:return e.abrupt("return",{status:n,UName:s,recent:i,voting:o,group:u,error_msg:c});case 50:case"end":return e.stop()}}),e,null,[[7,43]])})))).apply(this,arguments)}const U=function(e){return j.apply(this,arguments)};function G(){return(G=r()(a().mark((function e(t){var r,n,s,o,i,u;return a().wrap((function(e){for(;;)switch(e.prev=e.next){case 0:return r=t.UID,n=t.UName,s=t.password,o=!1,i="Something wrong...",e.prev=3,e.next=6,h.findById(r);case 6:if(u=e.sent){e.next=11;break}return o=!1,i="The user is not valid!",e.abrupt("return",{status:o,error_msg:i});case 11:return e.next=13,u.updateOne({$set:{UName:n,password:s}});case 13:o=!0,i="Successed!",e.next=23;break;case 17:e.prev=17,e.t0=e.catch(3),console.log(e.t0),o=!1,i="Something wrong...";case 23:return e.abrupt("return",{status:o,UName:n,error_msg:i});case 24:case"end":return e.stop()}}),e,null,[[3,17]])})))).apply(this,arguments)}const N=function(e){return G.apply(this,arguments)};function E(){return(E=r()(a().mark((function e(t){var r,n,s,o,i,u,c,p,l,f,d,m,g;return a().wrap((function(e){for(;;)switch(e.prev=e.next){case 0:return r=t.UID,n=t.GID,s=!1,o="",i="",u=!1,c=[],p="",l=[],f="Something wrong...",e.prev=9,e.next=12,S.findById(n);case 12:if(d=e.sent){e.next=17;break}return s=!1,f="The code is not valid!",e.abrupt("return",{status:s,error_msg:f});case 17:return e.next=19,h.findById(r);case 19:if(e.sent){e.next=24;break}return s=!1,f="The user is not valid!",e.abrupt("return",{status:s,error_msg:f});case 24:o=d.code,i=d.GName,u=d.admin.toString()===r.toString(),p=d.file,m=0;case 29:if(!(m<d.discussions.length)){e.next=37;break}return e.next=32,O.findById(d.discussions[m]);case 32:g=e.sent,l.push({DID:g._id,subject:g.subject});case 34:m++,e.next=29;break;case 37:s=!0,f="Successed!",e.next=47;break;case 41:e.prev=41,e.t0=e.catch(9),console.log(e.t0),s=!1,f="Something wrong...";case 47:return e.abrupt("return",{status:s,code:o,GName:i,isAdmin:u,messages:c,file:p,discussions:l,error_msg:f});case 48:case"end":return e.stop()}}),e,null,[[9,41]])})))).apply(this,arguments)}const B=function(e){return E.apply(this,arguments)};function q(){return(q=r()(a().mark((function e(t){var r,n,s,o,i;return a().wrap((function(e){for(;;)switch(e.prev=e.next){case 0:return r=t.GID,n=t.file,s=!1,o="Something wrong...",e.prev=3,e.next=6,S.findById(r);case 6:if(i=e.sent){e.next=11;break}return s=!1,o="The code is not valid!",e.abrupt("return",{status:s,error_msg:o});case 11:return e.next=13,i.updateOne({$set:{file:n}});case 13:s=!0,o="Successed!",e.next=23;break;case 17:e.prev=17,e.t0=e.catch(3),console.log(e.t0),s=!1,o="Something wrong...";case 23:return e.abrupt("return",{status:s,file:n,error_msg:o});case 24:case"end":return e.stop()}}),e,null,[[3,17]])})))).apply(this,arguments)}const $=function(e){return q.apply(this,arguments)},M=require("moment");var C=e.n(M);function P(){return(P=r()(a().mark((function e(t){var r,n,s,o,i,u,c,p,l,f,d,m,g,b,h,v,y,x,w,k,_;return a().wrap((function(e){for(;;)switch(e.prev=e.next){case 0:return r=t.GID,n=t.UID,s=t.subject,o=t.content,i=t.time_start,u=t.time_span,c=t.time_end,p=t.deadline,l=t.place,f=!1,d="",m="Something wrong...",g=[],i=new Date(C()(i).toDate()),c=new Date(C()(c).toDate()),p=new Date(C()(p).toDate()),u=parseInt(u),e.prev=9,e.next=12,S.findById(r);case 12:if(b=e.sent){e.next=17;break}return f=!1,m="The group is not valid!",e.abrupt("return",{status:f,error_msg:m});case 17:for(h=new Map,v=i,h.set(v.toISOString().replace("."," "),[]);v.getTime()<c.getTime();)v.setMinutes(v.getMinutes()+u),h.set(v.toISOString().replace("."," "),[]);return(y={})[l]=[],x=new O({admin:n,subject:s,time_start:i,time_end:c,time_span:u,deadline:p,content:o,place_options:y,time_options:h}),e.next=26,x.save();case 26:return d=x._id,(w=b.discussions).push(d),e.next=31,b.updateOne({discussions:w});case 31:k=0;case 32:if(!(k<b.discussions.length)){e.next=40;break}return e.next=35,O.findById(b.discussions[k]);case 35:_=e.sent,g.push({DID:_._id,subject:_.subject});case 37:k++,e.next=32;break;case 40:f=!0,m="Successed!",e.next=50;break;case 44:e.prev=44,e.t0=e.catch(9),console.log(e.t0),f=!1,m="Something wrong...";case 50:return e.abrupt("return",{status:f,DID:d,discussions:g,error_msg:m});case 51:case"end":return e.stop()}}),e,null,[[9,44]])})))).apply(this,arguments)}const z=function(e){return P.apply(this,arguments)};function Z(){return(Z=r()(a().mark((function e(t){var r,n,s,o,i,u,c,p;return a().wrap((function(e){for(;;)switch(e.prev=e.next){case 0:return r=t.UID,n=t.DID,s=!1,o="",i="",u=!1,c="Something wrong...",e.prev=6,e.next=9,O.findById(n);case 9:if(p=e.sent){e.next=14;break}return s=!1,c="The discussion is not valid!",e.abrupt("return",{status:s,error_msg:c});case 14:o=p.subject,i=p.content,u=r.toString()===p.admin.toString(),s=!0,c="Successed!",e.next=27;break;case 21:e.prev=21,e.t0=e.catch(6),console.log(e.t0),s=!1,c="Something wrong...";case 27:return e.abrupt("return",{status:s,subject:o,content:i,isAdmin:u,DID:n,error_msg:c});case 28:case"end":return e.stop()}}),e,null,[[6,21]])})))).apply(this,arguments)}const F=function(e){return Z.apply(this,arguments)},J=require("@babel/runtime/helpers/slicedToArray");var L=e.n(J);function R(e,t){var r="undefined"!=typeof Symbol&&e[Symbol.iterator]||e["@@iterator"];if(!r){if(Array.isArray(e)||(r=function(e,t){if(e){if("string"==typeof e)return H(e,t);var r=Object.prototype.toString.call(e).slice(8,-1);return"Object"===r&&e.constructor&&(r=e.constructor.name),"Map"===r||"Set"===r?Array.from(e):"Arguments"===r||/^(?:Ui|I)nt(?:8|16|32)(?:Clamped)?Array$/.test(r)?H(e,t):void 0}}(e))||t&&e&&"number"==typeof e.length){r&&(e=r);var n=0,a=function(){};return{s:a,n:function(){return n>=e.length?{done:!0}:{done:!1,value:e[n++]}},e:function(e){throw e},f:a}}throw new TypeError("Invalid attempt to iterate non-iterable instance.\nIn order to be iterable, non-array objects must have a [Symbol.iterator]() method.")}var s,o=!0,i=!1;return{s:function(){r=r.call(e)},n:function(){var e=r.next();return o=e.done,e},e:function(e){i=!0,s=e},f:function(){try{o||null==r.return||r.return()}finally{if(i)throw s}}}}function H(e,t){(null==t||t>e.length)&&(t=e.length);for(var r=0,n=new Array(t);r<t;r++)n[r]=e[r];return n}function K(){return(K=r()(a().mark((function e(t){var r,n,s,o,i,u,c,p,l,f,d,m,g,b,h,v,y,x;return a().wrap((function(e){for(;;)switch(e.prev=e.next){case 0:return r=t.UID,n=t.DID,s=!1,o={},i=!1,u=!1,c=!1,p="Something wrong...",l=!1,f="",e.prev=9,e.next=12,O.findById(n);case 12:if(d=e.sent){e.next=17;break}return s=!1,p="The discussion is not valid!",e.abrupt("return",{status:s,error_msg:p});case 17:m=d.time_options,g=R(m),e.prev=19,g.s();case 21:if((b=g.n()).done){e.next=35;break}if(h=L()(b.value,2),v=h[0],y=h[1],o[v.replace(" ",".")]=y,c){e.next=33;break}x=0;case 26:if(!(x<y.length)){e.next=33;break}if(y[x].toString()!==r.toString()){e.next=30;break}return c=!0,e.abrupt("break",33);case 30:x++,e.next=26;break;case 33:e.next=21;break;case 35:e.next=40;break;case 37:e.prev=37,e.t0=e.catch(19),g.e(e.t0);case 40:return e.prev=40,g.f(),e.finish(40);case 43:i=(new Date).getTime()-d.deadline.getTime()>=0,u=r.toString()===d.admin.toString(),f=d.time_result,l=!(f.getTime()-new Date(0).getTime()==0),s=!0,p="Successed!",e.next=57;break;case 51:e.prev=51,e.t1=e.catch(9),console.log(e.t1),s=!1,p="Something wrong...";case 57:return e.abrupt("return",{status:s,time_options:o,isDue:i,isAdmin:u,voted:c,isSelect:l,time_result:f,error_msg:p});case 58:case"end":return e.stop()}}),e,null,[[9,51],[19,37,40,43]])})))).apply(this,arguments)}const Q=function(e){return K.apply(this,arguments)};function V(e,t){var r="undefined"!=typeof Symbol&&e[Symbol.iterator]||e["@@iterator"];if(!r){if(Array.isArray(e)||(r=function(e,t){if(e){if("string"==typeof e)return W(e,t);var r=Object.prototype.toString.call(e).slice(8,-1);return"Object"===r&&e.constructor&&(r=e.constructor.name),"Map"===r||"Set"===r?Array.from(e):"Arguments"===r||/^(?:Ui|I)nt(?:8|16|32)(?:Clamped)?Array$/.test(r)?W(e,t):void 0}}(e))||t&&e&&"number"==typeof e.length){r&&(e=r);var n=0,a=function(){};return{s:a,n:function(){return n>=e.length?{done:!0}:{done:!1,value:e[n++]}},e:function(e){throw e},f:a}}throw new TypeError("Invalid attempt to iterate non-iterable instance.\nIn order to be iterable, non-array objects must have a [Symbol.iterator]() method.")}var s,o=!0,i=!1;return{s:function(){r=r.call(e)},n:function(){var e=r.next();return o=e.done,e},e:function(e){i=!0,s=e},f:function(){try{o||null==r.return||r.return()}finally{if(i)throw s}}}}function W(e,t){(null==t||t>e.length)&&(t=e.length);for(var r=0,n=new Array(t);r<t;r++)n[r]=e[r];return n}function X(){return(X=r()(a().mark((function e(t){var r,n,s,o,i,u,c,p,l,f,d,m,g,b,h,v;return a().wrap((function(e){for(;;)switch(e.prev=e.next){case 0:return r=t.UID,n=t.DID,s=!1,o=[],i=!1,u=!1,c=!1,p=!1,l="",f="Something wrong...",e.prev=9,e.next=12,O.findById(n);case 12:if(d=e.sent){e.next=17;break}return s=!1,f="The discussion is not valid!",e.abrupt("return",{status:s,error_msg:f});case 17:o=d.place_options,m=V(o),e.prev=19,m.s();case 21:if((g=m.n()).done){e.next=35;break}(b=L()(g.value,2))[0],h=b[1],v=0;case 24:if(!(v<h.length)){e.next=31;break}if(h[v].toString()!==r.toString()){e.next=28;break}return c=!0,e.abrupt("break",31);case 28:v++,e.next=24;break;case 31:if(!c){e.next=33;break}return e.abrupt("break",35);case 33:e.next=21;break;case 35:e.next=40;break;case 37:e.prev=37,e.t0=e.catch(19),m.e(e.t0);case 40:return e.prev=40,m.f(),e.finish(40);case 43:i=(new Date).getTime()-d.deadline.getTime()>=0,u=r.toString()===d.admin.toString(),l=d.place_result,p=!(""==l),s=!0,f="Successed!",e.next=56;break;case 51:e.prev=51,e.t1=e.catch(9),console.log(e.t1),s=!1,f="Something wrong...";case 56:return e.abrupt("return",{status:s,place_options:o,isDue:i,isAdmin:u,voted:c,isSelect:p,place_result:l,error_msg:f});case 57:case"end":return e.stop()}}),e,null,[[9,51],[19,37,40,43]])})))).apply(this,arguments)}const Y=function(e){return X.apply(this,arguments)};function ee(e,t){var r="undefined"!=typeof Symbol&&e[Symbol.iterator]||e["@@iterator"];if(!r){if(Array.isArray(e)||(r=function(e,t){if(e){if("string"==typeof e)return te(e,t);var r=Object.prototype.toString.call(e).slice(8,-1);return"Object"===r&&e.constructor&&(r=e.constructor.name),"Map"===r||"Set"===r?Array.from(e):"Arguments"===r||/^(?:Ui|I)nt(?:8|16|32)(?:Clamped)?Array$/.test(r)?te(e,t):void 0}}(e))||t&&e&&"number"==typeof e.length){r&&(e=r);var n=0,a=function(){};return{s:a,n:function(){return n>=e.length?{done:!0}:{done:!1,value:e[n++]}},e:function(e){throw e},f:a}}throw new TypeError("Invalid attempt to iterate non-iterable instance.\nIn order to be iterable, non-array objects must have a [Symbol.iterator]() method.")}var s,o=!0,i=!1;return{s:function(){r=r.call(e)},n:function(){var e=r.next();return o=e.done,e},e:function(e){i=!0,s=e},f:function(){try{o||null==r.return||r.return()}finally{if(i)throw s}}}}function te(e,t){(null==t||t>e.length)&&(t=e.length);for(var r=0,n=new Array(t);r<t;r++)n[r]=e[r];return n}function re(){return(re=r()(a().mark((function e(t){var r,n,s,o,i,u,c,p,l,f,d,m,g,b,h,v,y,x,w;return a().wrap((function(e){for(;;)switch(e.prev=e.next){case 0:return r=t.UID,n=t.DID,s=t.times,o=!1,i={},u="Something wrong...",e.prev=4,e.next=7,O.findById(n);case 7:if(c=e.sent){e.next=12;break}return o=!1,u="The discussion is not valid!",e.abrupt("return",{status:o,error_msg:u});case 12:if(!((new Date).getTime()-c.deadline.getTime()>=0)){e.next=16;break}return o=!1,u="The deadline has arrived!",e.abrupt("return",{status:o,error_msg:u});case 16:p=c.time_options,l=0;case 18:if(!(l<s.length)){e.next=42;break}f=new Date(C()(s[l]).toDate()),d=ee(p),e.prev=21,d.s();case 23:if((m=d.n()).done){e.next=31;break}if(g=L()(m.value,2),b=g[0],h=g[1],b!==f.toISOString().replace("."," ")){e.next=29;break}return v=h.push(r),p.set(b,v),e.abrupt("break",31);case 29:e.next=23;break;case 31:e.next=36;break;case 33:e.prev=33,e.t0=e.catch(21),d.e(e.t0);case 36:return e.prev=36,d.f(),e.finish(36);case 39:l++,e.next=18;break;case 42:y=ee(p);try{for(y.s();!(x=y.n()).done;)w=L()(x.value,2),b=w[0],h=w[1],i[b.replace(" ",".")]=h}catch(e){y.e(e)}finally{y.f()}return e.next=46,c.updateOne({$set:{time_options:p}});case 46:o=!0,u="Successed!",e.next=56;break;case 50:e.prev=50,e.t1=e.catch(4),console.log(e.t1),o=!1,u="Something wrong...";case 56:return e.abrupt("return",{status:o,time_options:i,error_msg:u});case 57:case"end":return e.stop()}}),e,null,[[4,50],[21,33,36,39]])})))).apply(this,arguments)}require("moment-timezone");const ne=function(e){return re.apply(this,arguments)};function ae(e,t){var r="undefined"!=typeof Symbol&&e[Symbol.iterator]||e["@@iterator"];if(!r){if(Array.isArray(e)||(r=function(e,t){if(e){if("string"==typeof e)return se(e,t);var r=Object.prototype.toString.call(e).slice(8,-1);return"Object"===r&&e.constructor&&(r=e.constructor.name),"Map"===r||"Set"===r?Array.from(e):"Arguments"===r||/^(?:Ui|I)nt(?:8|16|32)(?:Clamped)?Array$/.test(r)?se(e,t):void 0}}(e))||t&&e&&"number"==typeof e.length){r&&(e=r);var n=0,a=function(){};return{s:a,n:function(){return n>=e.length?{done:!0}:{done:!1,value:e[n++]}},e:function(e){throw e},f:a}}throw new TypeError("Invalid attempt to iterate non-iterable instance.\nIn order to be iterable, non-array objects must have a [Symbol.iterator]() method.")}var s,o=!0,i=!1;return{s:function(){r=r.call(e)},n:function(){var e=r.next();return o=e.done,e},e:function(e){i=!0,s=e},f:function(){try{o||null==r.return||r.return()}finally{if(i)throw s}}}}function se(e,t){(null==t||t>e.length)&&(t=e.length);for(var r=0,n=new Array(t);r<t;r++)n[r]=e[r];return n}function oe(){return(oe=r()(a().mark((function e(t){var r,n,s,o,i,u,c,p,l,f;return a().wrap((function(e){for(;;)switch(e.prev=e.next){case 0:return t.UID,r=t.DID,n=t.place,s=!1,o=[],i="Something wrong...",e.prev=4,e.next=7,O.findById(r);case 7:if(u=e.sent){e.next=12;break}return s=!1,i="The discussion is not valid!",e.abrupt("return",{status:s,error_msg:i});case 12:o=u.place_options,c=ae(o),e.prev=14,c.s();case 16:if((p=c.n()).done){e.next=24;break}if(l=L()(p.value,2),f=l[0],l[1],f!==n){e.next=22;break}return s=!1,i="The place has been added!",e.abrupt("return",{status:s,error_msg:i});case 22:e.next=16;break;case 24:e.next=29;break;case 26:e.prev=26,e.t0=e.catch(14),c.e(e.t0);case 29:return e.prev=29,c.f(),e.finish(29);case 32:return o.set(n,[]),e.next=35,u.updateOne({$set:{place_options:o}});case 35:s=!0,i="Successed!",e.next=45;break;case 39:e.prev=39,e.t1=e.catch(4),console.log(e.t1),s=!1,i="Something wrong...";case 45:return e.abrupt("return",{status:s,place_options:o,error_msg:i});case 46:case"end":return e.stop()}}),e,null,[[4,39],[14,26,29,32]])})))).apply(this,arguments)}const ie=function(e){return oe.apply(this,arguments)};function ue(e,t){var r="undefined"!=typeof Symbol&&e[Symbol.iterator]||e["@@iterator"];if(!r){if(Array.isArray(e)||(r=function(e,t){if(e){if("string"==typeof e)return ce(e,t);var r=Object.prototype.toString.call(e).slice(8,-1);return"Object"===r&&e.constructor&&(r=e.constructor.name),"Map"===r||"Set"===r?Array.from(e):"Arguments"===r||/^(?:Ui|I)nt(?:8|16|32)(?:Clamped)?Array$/.test(r)?ce(e,t):void 0}}(e))||t&&e&&"number"==typeof e.length){r&&(e=r);var n=0,a=function(){};return{s:a,n:function(){return n>=e.length?{done:!0}:{done:!1,value:e[n++]}},e:function(e){throw e},f:a}}throw new TypeError("Invalid attempt to iterate non-iterable instance.\nIn order to be iterable, non-array objects must have a [Symbol.iterator]() method.")}var s,o=!0,i=!1;return{s:function(){r=r.call(e)},n:function(){var e=r.next();return o=e.done,e},e:function(e){i=!0,s=e},f:function(){try{o||null==r.return||r.return()}finally{if(i)throw s}}}}function ce(e,t){(null==t||t>e.length)&&(t=e.length);for(var r=0,n=new Array(t);r<t;r++)n[r]=e[r];return n}function pe(){return(pe=r()(a().mark((function e(t){var r,n,s,o,i,u,c,p,l,f,d,m,g;return a().wrap((function(e){for(;;)switch(e.prev=e.next){case 0:return r=t.UID,n=t.DID,s=t.places,o=!1,i="Something wrong...",e.prev=3,e.next=6,O.findById(n);case 6:if(u=e.sent){e.next=11;break}return o=!1,i="The discussion is not valid!",e.abrupt("return",{status:o,error_msg:i});case 11:if(!((new Date).getTime()-u.deadline.getTime()>=0)){e.next=15;break}return o=!1,i="The deadline has arrived!",e.abrupt("return",{status:o,error_msg:i});case 15:c=u.place_options,p=0;case 17:if(!(p<s.length)){e.next=47;break}l=ue(c),e.prev=19,l.s();case 21:if((f=l.n()).done){e.next=36;break}if(d=L()(f.value,2),m=d[0],d[1],m!==s[p]){e.next=34;break}g=0;case 25:if(!(g<c.get(m).length)){e.next=33;break}if(r.toString()!==c.get(m)[g].toString()){e.next=30;break}return o=!1,i="The place has been voted by this user!",e.abrupt("return",{status:o,error_msg:i});case 30:g++,e.next=25;break;case 33:c.get(m).push(r);case 34:e.next=21;break;case 36:e.next=41;break;case 38:e.prev=38,e.t0=e.catch(19),l.e(e.t0);case 41:return e.prev=41,l.f(),e.finish(41);case 44:p++,e.next=17;break;case 47:return e.next=49,u.updateOne({$set:{place_options:c}});case 49:o=!0,i="Successed!",e.next=59;break;case 53:e.prev=53,e.t1=e.catch(3),console.log(e.t1),o=!1,i="Something wrong...";case 59:return e.abrupt("return",{status:o,place_options:c,error_msg:i});case 60:case"end":return e.stop()}}),e,null,[[3,53],[19,38,41,44]])})))).apply(this,arguments)}const le=function(e){return pe.apply(this,arguments)};function fe(e,t){var r="undefined"!=typeof Symbol&&e[Symbol.iterator]||e["@@iterator"];if(!r){if(Array.isArray(e)||(r=function(e,t){if(e){if("string"==typeof e)return de(e,t);var r=Object.prototype.toString.call(e).slice(8,-1);return"Object"===r&&e.constructor&&(r=e.constructor.name),"Map"===r||"Set"===r?Array.from(e):"Arguments"===r||/^(?:Ui|I)nt(?:8|16|32)(?:Clamped)?Array$/.test(r)?de(e,t):void 0}}(e))||t&&e&&"number"==typeof e.length){r&&(e=r);var n=0,a=function(){};return{s:a,n:function(){return n>=e.length?{done:!0}:{done:!1,value:e[n++]}},e:function(e){throw e},f:a}}throw new TypeError("Invalid attempt to iterate non-iterable instance.\nIn order to be iterable, non-array objects must have a [Symbol.iterator]() method.")}var s,o=!0,i=!1;return{s:function(){r=r.call(e)},n:function(){var e=r.next();return o=e.done,e},e:function(e){i=!0,s=e},f:function(){try{o||null==r.return||r.return()}finally{if(i)throw s}}}}function de(e,t){(null==t||t>e.length)&&(t=e.length);for(var r=0,n=new Array(t);r<t;r++)n[r]=e[r];return n}function me(){return(me=r()(a().mark((function e(t){var r,n,s,o,i,u,c,p,l,f,d;return a().wrap((function(e){for(;;)switch(e.prev=e.next){case 0:return r=t.UID,n=t.DID,s=t.time_result,o=!1,i="Something wrong...",s=new Date(C()(s).toDate()),e.prev=4,e.next=7,O.findById(n);case 7:if(u=e.sent){e.next=12;break}return o=!1,i="The discussion is not valid!",e.abrupt("return",{status:o,error_msg:i});case 12:if(u.admin.toString()===r.toString()){e.next=16;break}return o=!1,i="The user is not admin!",e.abrupt("return",{status:o,error_msg:i});case 16:if(!((new Date).getTime()-u.deadline.getTime()<0)){e.next=20;break}return o=!1,i="The deadline has not arrived!",e.abrupt("return",{status:o,error_msg:i});case 20:c=!1,p=fe(u.time_options),e.prev=22,p.s();case 24:if((l=p.n()).done){e.next=31;break}if(f=L()(l.value,2),d=f[0],f[1],d!==s.toISOString().replace("."," ")){e.next=29;break}return c=!0,e.abrupt("break",31);case 29:e.next=24;break;case 31:e.next=36;break;case 33:e.prev=33,e.t0=e.catch(22),p.e(e.t0);case 36:return e.prev=36,p.f(),e.finish(36);case 39:if(c){e.next=43;break}return o=!1,i="The time is not in the options",e.abrupt("return",{status:o,error_msg:i});case 43:return e.next=45,u.updateOne({$set:{time_result:s}});case 45:o=!0,i="Successed!",e.next=55;break;case 49:e.prev=49,e.t1=e.catch(4),console.log(e.t1),o=!1,i="Something wrong...";case 55:return e.abrupt("return",{status:o,time_result:s,error_msg:i});case 56:case"end":return e.stop()}}),e,null,[[4,49],[22,33,36,39]])})))).apply(this,arguments)}const ge=function(e){return me.apply(this,arguments)};function be(e,t){var r="undefined"!=typeof Symbol&&e[Symbol.iterator]||e["@@iterator"];if(!r){if(Array.isArray(e)||(r=function(e,t){if(e){if("string"==typeof e)return he(e,t);var r=Object.prototype.toString.call(e).slice(8,-1);return"Object"===r&&e.constructor&&(r=e.constructor.name),"Map"===r||"Set"===r?Array.from(e):"Arguments"===r||/^(?:Ui|I)nt(?:8|16|32)(?:Clamped)?Array$/.test(r)?he(e,t):void 0}}(e))||t&&e&&"number"==typeof e.length){r&&(e=r);var n=0,a=function(){};return{s:a,n:function(){return n>=e.length?{done:!0}:{done:!1,value:e[n++]}},e:function(e){throw e},f:a}}throw new TypeError("Invalid attempt to iterate non-iterable instance.\nIn order to be iterable, non-array objects must have a [Symbol.iterator]() method.")}var s,o=!0,i=!1;return{s:function(){r=r.call(e)},n:function(){var e=r.next();return o=e.done,e},e:function(e){i=!0,s=e},f:function(){try{o||null==r.return||r.return()}finally{if(i)throw s}}}}function he(e,t){(null==t||t>e.length)&&(t=e.length);for(var r=0,n=new Array(t);r<t;r++)n[r]=e[r];return n}function ve(){return(ve=r()(a().mark((function e(t){var r,n,s,o,i,u,c,p,l,f,d;return a().wrap((function(e){for(;;)switch(e.prev=e.next){case 0:return r=t.UID,n=t.DID,s=t.place_result,o=!1,i="Something wrong...",e.prev=3,e.next=6,O.findById(n);case 6:if(u=e.sent){e.next=11;break}return o=!1,i="The discussion is not valid!",e.abrupt("return",{status:o,error_msg:i});case 11:if(u.admin.toString()===r.toString()){e.next=15;break}return o=!1,i="The user is not admin!",e.abrupt("return",{status:o,error_msg:i});case 15:if(!((new Date).getTime()-u.deadline.getTime()<0)){e.next=19;break}return o=!1,i="The deadline has not arrived!",e.abrupt("return",{status:o,error_msg:i});case 19:c=!1,p=be(u.place_options),e.prev=21,p.s();case 23:if((l=p.n()).done){e.next=30;break}if(f=L()(l.value,2),d=f[0],f[1],d!==s){e.next=28;break}return c=!0,e.abrupt("break",30);case 28:e.next=23;break;case 30:e.next=35;break;case 32:e.prev=32,e.t0=e.catch(21),p.e(e.t0);case 35:return e.prev=35,p.f(),e.finish(35);case 38:if(c){e.next=42;break}return o=!1,i="The place is not in the options",e.abrupt("return",{status:o,error_msg:i});case 42:return e.next=44,u.updateOne({$set:{place_result:s}});case 44:o=!0,i="Successed!",e.next=54;break;case 48:e.prev=48,e.t1=e.catch(3),console.log(e.t1),o=!1,i="Something wrong...";case 54:return e.abrupt("return",{status:o,place_result:s,error_msg:i});case 55:case"end":return e.stop()}}),e,null,[[3,48],[21,32,35,38]])})))).apply(this,arguments)}const ye=function(e){return ve.apply(this,arguments)};var xe=new(0,m().Schema)({time:{type:Date,required:!0},sender:{type:m().Types.ObjectId,required:!0,ref:"User"},body:{type:String,required:!0}});const we=m().model("Message",xe);function ke(){return(ke=r()(a().mark((function e(t){var r,n,s,o,i,u,c,p,l,f,d;return a().wrap((function(e){for(;;)switch(e.prev=e.next){case 0:return r=t.UID,n=t.GID,s=t.body,o=!1,i="",u=[],c="Something wrong...",e.prev=5,p=new Date,e.next=9,h.findById(r);case 9:if(l=e.sent){e.next=14;break}return o=!1,c="The user is not valid!",e.abrupt("return",{status:o,error_msg:c});case 14:if(-1!==l.groups.indexOf(n)){e.next=18;break}return o=!1,c="The user is not in the group!",e.abrupt("return",{status:o,error_msg:c});case 18:return e.next=20,S.findById(n);case 20:if(f=e.sent){e.next=25;break}return o=!1,c="The group is not valid!",e.abrupt("return",{status:o,error_msg:c});case 25:return d=new we({time:p,sender:r,body:s}),e.next=28,d.save();case 28:return(u=f.messages).push(d),e.next=32,f.updateOne({$set:{messages:u}});case 32:i=l.UName,o=!0,c="Successed!",e.next=43;break;case 37:e.prev=37,e.t0=e.catch(5),console.log(e.t0),o=!1,c="Something wrong...";case 43:return e.abrupt("return",{status:o,time:nowTime,sender:i,body:s,error_msg:c});case 44:case"end":return e.stop()}}),e,null,[[5,37]])})))).apply(this,arguments)}const Se=function(e){return ke.apply(this,arguments)};function _e(){return(_e=r()(a().mark((function e(t){var r,n,s,o,i,u,c;return a().wrap((function(e){for(;;)switch(e.prev=e.next){case 0:return r=t.UID,n=t.GID,s=!1,o=[],i="Something wrong...",e.prev=4,e.next=7,h.findById(r);case 7:if(u=e.sent){e.next=12;break}return s=!1,i="The user is not valid!",e.abrupt("return",{status:s,error_msg:i});case 12:if(-1!==u.groups.indexOf(n)){e.next=16;break}return s=!1,i="The user is not in the group!",e.abrupt("return",{status:s,error_msg:i});case 16:return e.next=18,S.findById(n).populate({path:"messages",populate:"sender"});case 18:if(c=e.sent){e.next=23;break}return s=!1,i="The group is not valid!",e.abrupt("return",{status:s,error_msg:i});case 23:o=c.messages.map((function(e){var t=e.time,r=e.body;return{time:t,sender:e.sender.UName,body:r}})),s=!0,i="Successed!",e.next=34;break;case 28:e.prev=28,e.t0=e.catch(4),console.log(e.t0),s=!1,i="Something wrong...";case 34:return e.abrupt("return",{status:s,messages:o,error_msg:i});case 35:case"end":return e.stop()}}),e,null,[[4,28]])})))).apply(this,arguments)}const Ie=function(e){return _e.apply(this,arguments)};p().config(),g();var De=u()(),Te=o().createServer(De);De.use(u().static("./public")),new(f().Server)({server:Te}).on("connection",function(){var e=r()(a().mark((function e(t){return a().wrap((function(e){for(;;)switch(e.prev=e.next){case 0:console.log("server connected!"),t.sendEvent=function(e){return t.send(JSON.stringify(e))},t.on("message",(function(e){var r=e=JSON.parse(e),n=r.api,a=r.data;console.log(n,a);var s={};switch(s.api=n,n){case"register":y(a).then((function(e){s.data=e,t.sendEvent(s)}));break;case"login":w(a).then((function(e){s.data=e,t.sendEvent(s),console.log("login_msg",s)}));break;case"index":U(a).then((function(e){s.data=e,t.sendEvent(s)}));break;case"createGroup":I(a).then((function(e){s.data=e,t.sendEvent(s)}));break;case"joinGroup":T(a).then((function(e){s.data=e,t.sendEvent(s)}));break;case"renewProfile":N(a).then((function(e){s.data=e,t.sendEvent(s)}));break;case"group":B(a).then((function(e){s.data=e,t.sendEvent(s)}));break;case"renewFile":$(a).then((function(e){s.data=e,t.sendEvent(s)}));break;case"createDiscussion":z(a).then((function(e){s.data=e,t.sendEvent(s)}));break;case"discussion":F(a).then((function(e){s.data=e,t.sendEvent(s)}));break;case"time":Q(a).then((function(e){s.data=e,t.sendEvent(s)}));break;case"place":Y(a).then((function(e){s.data=e,t.sendEvent(s)}));break;case"voteTime":ne(a).then((function(e){s.data=e,t.sendEvent(s)}));break;case"addPlace":ie(a).then((function(e){s.data=e,t.sendEvent(s)}));break;case"votePlace":le(a).then((function(e){s.data=e,t.sendEvent(s)}));break;case"confirmPlace":ye(a).then((function(e){s.data=e,t.sendEvent(s)}));break;case"confirmTime":ge(a).then((function(e){s.data=e,t.sendEvent(s)}));break;case"chat":Ie(a).then((function(e){s.data=e,t.sendEvent(s)}));break;case"message":Se(a).then((function(e){s.data=e,t.sendEvent(s)}));break;default:console.log(e)}}));case 3:case"end":return e.stop()}}),e)})));return function(t){return e.apply(this,arguments)}}());var Ae=process.env.port||4e3;Te.listen(Ae,(function(){console.log("Listening on http://localhost:".concat(Ae))}))})();