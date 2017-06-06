import React, { Component } from "react";

import { StyleSheet, View, ActivityIndicator, AsyncStorage, Dimensions, Platform, AppState } from "react-native";

import Orientation from "react-native-orientation";

import RNFetchBlob from "react-native-fetch-blob";

if (!global.Blob) {
  global.Blob = RNFetchBlob.polyfill.Blob;
}

global.JSZip = global.JSZip || require("jszip");

global.URL = require("epubjs/libs/url/url.js");

if (!global.btoa) {
  global.btoa = require("base-64").encode;
}

import ePub, { Rendition, Layout, EpubCFI } from "epubjs";

const core = require("epubjs/lib/utils/core");
const Uri = require("epubjs/lib/utils/url");
const Path = require("epubjs/lib/utils/path");

const EpubViewManager = require("./EpubViewManager");

const EPUBJS = "var _Stringprototype=String.prototype,_Mathmax=Math.max,_Mathfloor=Math.floor;(function(u,p){'object'==typeof exports&&'object'==typeof module?module.exports=p(require('xmldom')):'function'==typeof define&&define.amd?define(['xmldom'],p):'object'==typeof exports?exports.EPUBJSContents=p(require('xmldom')):u.EPUBJSContents=p(u.xmldom)})(this,function(s){return function(u){function p(v){if(f[v])return f[v].exports;var k=f[v]={i:v,l:!1,exports:{}};return u[v].call(k.exports,k,k.exports,p),k.l=!0,k.exports}var f={};return p.m=u,p.c=f,p.i=function(v){return v},p.d=function(v,k,C){p.o(v,k)||Object.defineProperty(v,k,{configurable:!1,enumerable:!0,get:C})},p.n=function(v){var k=v&&v.__esModule?function(){return v['default']}:function(){return v};return p.d(k,'a',k),k},p.o=function(v,k){return Object.prototype.hasOwnProperty.call(v,k)},p.p='',p(p.s=5)}([function(u,p,f){'use strict';function v(pe,fe){if(!(pe instanceof fe))throw new TypeError('Cannot call a class as a function')}function C(){var pe=new Date().getTime(),fe='xxxxxxxx-xxxx-4xxx-yxxx-xxxxxxxxxxxx'.replace(/[xy]/g,function(he){var me=0|(pe+16*Math.random())%16;return pe=_Mathfloor(pe/16),('x'==he?me:8|7&me).toString(16)});return fe}function _(pe){return!isNaN(parseFloat(pe))&&isFinite(pe)}function P(pe,fe,he,me,ge){var ke,ye=me||0,be=ge||fe.length,ve=parseInt(ye+(be-ye)/2);return(he||(he=function(Ce,we){return Ce>we?1:Ce<we?-1:Ce==we?0:void 0}),0>=be-ye)?ve:(ke=he(fe[ve],pe),1==be-ye?0<ke?ve:ve+1:0===ke?ve:-1===ke?P(pe,fe,he,ve,be):P(pe,fe,he,ye,ve))}function O(pe,fe,he,me,ge){var ke,ye=me||0,be=ge||fe.length,ve=parseInt(ye+(be-ye)/2);return(he||(he=function(Ce,we){return Ce>we?1:Ce<we?-1:Ce==we?0:void 0}),0>=be-ye)?-1:(ke=he(fe[ve],pe),1==be-ye?0===ke?ve:-1:0===ke?ve:-1===ke?O(pe,fe,he,ve,be):O(pe,fe,he,ye,ve))}function W(pe,fe){for(var ge,he=pe.parentNode,me=he.childNodes,ye=-1,be=0;be<me.length&&(ge=me[be],ge.nodeType===fe&&ye++,ge!=pe);be++);return ye}function I(pe,fe){return new Blob([pe],{type:fe})}function V(pe,fe){return'undefined'==typeof pe.querySelector?pe.getElementsByTagName(fe):pe.querySelectorAll(fe)}function $(pe,fe,he){for(var ge,me=document.createTreeWalker(pe,he,null,!1);ge=me.nextNode();)fe(ge)}function G(pe,fe){if(fe(pe))return!0;if(pe=pe.firstChild,pe)do{var he=G(pe,fe);if(he)return!0;pe=pe.nextSibling}while(pe)}function ie(pe){for(var fe=[pe];pe;pe=pe.parentNode)fe.unshift(pe);return fe}Object.defineProperty(p,'__esModule',{value:!0});var le=function(){function pe(fe,he){for(var ge,me=0;me<he.length;me++)ge=he[me],ge.enumerable=ge.enumerable||!1,ge.configurable=!0,'value'in ge&&(ge.writable=!0),Object.defineProperty(fe,ge.key,ge)}return function(fe,he,me){return he&&pe(fe.prototype,he),me&&pe(fe,me),fe}}();p.isElement=function(pe){return!!(pe&&1==pe.nodeType)},p.uuid=C,p.documentHeight=function(){return _Mathmax(document.documentElement.clientHeight,document.body.scrollHeight,document.documentElement.scrollHeight,document.body.offsetHeight,document.documentElement.offsetHeight)},p.isNumber=_,p.isFloat=function(pe){return _(pe)&&_Mathfloor(pe)!==pe},p.prefixed=function(pe){var fe=['-Webkit-','-moz-','-o-','-ms-'],he=pe[0].toUpperCase()+pe.slice(1),me=fe.length;if('undefined'==typeof document||'undefined'!=typeof document.body.style[pe])return pe;for(var ge=0;ge<me;ge++)if('undefined'!=typeof document.body.style[fe[ge]+he])return fe[ge]+he;return pe},p.defaults=function(pe){for(var me,fe=1,he=arguments.length;fe<he;fe++)for(var ge in me=arguments[fe],me)void 0===pe[ge]&&(pe[ge]=me[ge]);return pe},p.extend=function(pe){var fe=[].slice.call(arguments,1);return fe.forEach(function(he){he&&Object.getOwnPropertyNames(he).forEach(function(me){Object.defineProperty(pe,me,Object.getOwnPropertyDescriptor(he,me))})}),pe},p.insert=function(pe,fe,he){var me=P(pe,fe,he);return fe.splice(me,0,pe),me},p.locationOf=P,p.indexOfSorted=O,p.bounds=function(pe){var fe=window.getComputedStyle(pe),ge=0,ye=0;return['width','paddingRight','paddingLeft','marginRight','marginLeft','borderRightWidth','borderLeftWidth'].forEach(function(be){ge+=parseFloat(fe[be])||0}),['height','paddingTop','paddingBottom','marginTop','marginBottom','borderTopWidth','borderBottomWidth'].forEach(function(be){ye+=parseFloat(fe[be])||0}),{height:ye,width:ge}},p.borders=function(pe){var fe=window.getComputedStyle(pe),ge=0,ye=0;return['paddingRight','paddingLeft','marginRight','marginLeft','borderRightWidth','borderLeftWidth'].forEach(function(be){ge+=parseFloat(fe[be])||0}),['paddingTop','paddingBottom','marginTop','marginBottom','borderTopWidth','borderBottomWidth'].forEach(function(be){ye+=parseFloat(fe[be])||0}),{height:ye,width:ge}},p.windowBounds=function(){var pe=window.innerWidth,fe=window.innerHeight;return{top:0,left:0,right:pe,bottom:fe,width:pe,height:fe}},p.cleanStringForXpath=function(pe){var fe=pe.match(/[^'\"]+|['\"]/g);return fe=fe.map(function(he){return'\\''===he?'\"\\'\"':'\"'===he?'\\'\"\\'':'\\''+he+'\\''}),'concat(\\'\\','+fe.join(',')+')'},p.indexOfNode=W,p.indexOfTextNode=function(pe){return W(pe,se)},p.indexOfElementNode=function(pe){return W(pe,re)},p.isXml=function(pe){return-1<['xml','opf','ncx'].indexOf(pe)},p.createBlob=I,p.createBlobUrl=function(pe,fe){var me,he=window.URL||window.webkitURL||window.mozURL,ge=I(pe,fe);return me=he.createObjectURL(ge),me},p.createBase64Url=function(pe,fe){var he,me;if('string'==typeof pe)return he=btoa(pe),me='data:'+fe+';base64,'+he,me},p.type=function(pe){return Object.prototype.toString.call(pe).slice(8,-1)},p.parse=function(pe,fe,he){var me,ge;return ge='undefined'==typeof DOMParser||he?f(27).DOMParser:DOMParser,65279===pe.charCodeAt(0)&&(pe=pe.slice(1)),me=new ge().parseFromString(pe,fe),me},p.qs=function(pe,fe){var he;if(!pe)throw new Error('No Element Provided');return'undefined'==typeof pe.querySelector?(he=pe.getElementsByTagName(fe),he.length)?he[0]:void 0:pe.querySelector(fe)},p.qsa=V,p.qsp=function(pe,fe,he){var me,ge;if('undefined'!=typeof pe.querySelector){for(var ye in fe+='[',he)fe+=ye+'=\\''+he[ye]+'\\'';return fe+=']',pe.querySelector(fe)}return(me=pe.getElementsByTagName(fe),ge=Array.prototype.slice.call(me,0).filter(function(be){for(var ve in he)if(be.getAttribute(ve)===he[ve])return!0;return!1}),ge)?ge[0]:void 0},p.sprint=function(pe,fe){var he=pe.ownerDocument||pe;'undefined'==typeof he.createTreeWalker?G(pe,function(me){me&&3===me.nodeType&&fe(me)},!0):$(pe,fe,NodeFilter.SHOW_TEXT)},p.treeWalker=$,p.walk=G,p.blob2base64=function(pe){return new Promise(function(fe){var me=new FileReader;me.readAsDataURL(pe),me.onloadend=function(){fe(me.result)}})},p.defer=function(){var pe=this;this.resolve=null,this.reject=null,this.id=C(),this.promise=new Promise(function(fe,he){pe.resolve=fe,pe.reject=he}),Object.freeze(this)},p.querySelectorByType=function(pe,fe,he){var me;if('undefined'!=typeof pe.querySelector&&(me=pe.querySelector(fe+'[*|type=\"'+he+'\"]')),!me||0===me.length){me=V(pe,fe);for(var ge=0;ge<me.length;ge++)if(me[ge].getAttributeNS('http://www.idpf.org/2007/ops','type')===he||me[ge].getAttribute('epub:type')===he)return me[ge]}else return me},p.findChildren=function(pe){for(var ge,fe=[],he=pe.childNodes,me=0;me<he.length;me++)ge=he[me],1===ge.nodeType&&fe.push(ge);return fe},p.parents=ie;var oe=p.requestAnimationFrame='undefined'!=typeof window&&(window.requestAnimationFrame||window.mozRequestAnimationFrame||window.webkitRequestAnimationFrame||window.msRequestAnimationFrame),re=1,se=3,ce=p.RangeObject=function(){function pe(){v(this,pe),this.collapsed=!1,this.commonAncestorContainer=void 0,this.endContainer=void 0,this.endOffset=void 0,this.startContainer=void 0,this.startOffset=void 0}return le(pe,[{key:'setStart',value:function(he,me){this.startContainer=he,this.startOffset=me,this.endContainer?this.commonAncestorContainer=this._commonAncestorContainer():this.collapse(!0),this._checkCollapsed()}},{key:'setEnd',value:function(he,me){this.endContainer=he,this.endOffset=me,this.startContainer?(this.collapsed=!1,this.commonAncestorContainer=this._commonAncestorContainer()):this.collapse(!1),this._checkCollapsed()}},{key:'collapse',value:function(he){this.collapsed=!0,he?(this.endContainer=this.startContainer,this.endOffset=this.startOffset,this.commonAncestorContainer=this.startContainer.parentNode):(this.startContainer=this.endContainer,this.startOffset=this.endOffset,this.commonAncestorContainer=this.endOffset.parentNode)}},{key:'selectNode',value:function(he){var me=he.parentNode,ge=Array.prototype.indexOf.call(me.childNodes,he);this.setStart(me,ge),this.setEnd(me,ge+1)}},{key:'selectNodeContents',value:function(he){var me=he.childNodes[he.childNodes-1],ge=3===he.nodeType?he.textContent.length:parent.childNodes.length;this.setStart(he,0),this.setEnd(he,ge)}},{key:'_commonAncestorContainer',value:function(he,me){var ge=ie(he||this.startContainer),ye=ie(me||this.endContainer);if(ge[0]==ye[0])for(var be=0;be<ge.length;be++)if(ge[be]!=ye[be])return ge[be-1]}},{key:'_checkCollapsed',value:function(){this.collapsed=this.startContainer===this.endContainer&&this.startOffset===this.endOffset}},{key:'toString',value:function(){}}]),pe}()},function(u,p,f){'use strict';function v(A,P){if(!(A instanceof P))throw new TypeError('Cannot call a class as a function')}var k='function'==typeof Symbol&&'symbol'==typeof Symbol.iterator?function(A){return typeof A}:function(A){return A&&'function'==typeof Symbol&&A.constructor===Symbol&&A!==Symbol.prototype?'symbol':typeof A};Object.defineProperty(p,'__esModule',{value:!0});var C='function'==typeof Symbol&&'symbol'===k(Symbol.iterator)?function(A){return'undefined'==typeof A?'undefined':k(A)}:function(A){return A&&'function'==typeof Symbol&&A.constructor===Symbol&&A!==Symbol.prototype?'symbol':'undefined'==typeof A?'undefined':k(A)},E=function(){function A(P,O){for(var B,L=0;L<O.length;L++)B=O[L],B.enumerable=B.enumerable||!1,B.configurable=!0,'value'in B&&(B.writable=!0),Object.defineProperty(P,B.key,B)}return function(P,O,L){return O&&A(P.prototype,O),L&&A(P,L),P}}(),_=f(0),S=1,R=3,N=function(){function A(P,O,L){v(this,A);var B;if(this.str='',this.base={},this.spinePos=0,this.range=!1,this.path={},this.start=null,this.end=null,!(this instanceof A))return new A(P,O,L);if('string'==typeof O?this.base=this.parseComponent(O):'object'===('undefined'==typeof O?'undefined':C(O))&&O.steps&&(this.base=O),B=this.checkType(P),'string'===B)return this.str=P,(0,_.extend)(this,this.parse(P));if('range'===B)return(0,_.extend)(this,this.fromRange(P,this.base,L));if('node'===B)return(0,_.extend)(this,this.fromNode(P,this.base,L));if('EpubCFI'===B&&P.path)return P;if(!P)return this;throw new TypeError('not a valid argument for EpubCFI')}return E(A,[{key:'checkType',value:function(O){return this.isCfiString(O)?'string':'object'===('undefined'==typeof O?'undefined':C(O))&&('Range'===(0,_.type)(O)||'undefined'!=typeof O.startContainer)?'range':'object'===('undefined'==typeof O?'undefined':C(O))&&'undefined'!=typeof O.nodeType?'node':'object'===('undefined'==typeof O?'undefined':C(O))&&O instanceof A&&'EpubCFI'}},{key:'parse',value:function(O){var B,M,z,L={spinePos:-1,range:!1,base:{},path:{},start:null,end:null};return'string'==typeof O?(0===O.indexOf('epubcfi(')&&')'===O[O.length-1]&&(O=O.slice(8,O.length-1)),B=this.getChapterComponent(O),!B)?{spinePos:-1}:(L.base=this.parseComponent(B),M=this.getPathComponent(O),L.path=this.parseComponent(M),z=this.getRange(O),z&&(L.range=!0,L.start=this.parseComponent(z[0]),L.end=this.parseComponent(z[1])),L.spinePos=L.base.steps[1].index,L):{spinePos:-1}}},{key:'parseComponent',value:function(O){var z,L={steps:[],terminal:{offset:null,assertion:null}},B=O.split(':'),M=B[0].split('/');return 1<B.length&&(z=B[1],L.terminal=this.parseTerminal(z)),''===M[0]&&M.shift(),L.steps=M.map(function(W){return this.parseStep(W)}.bind(this)),L}},{key:'parseStep',value:function(O){var L,B,M,z,W;if(z=O.match(/\\[(.*)\\]/),z&&z[1]&&(W=z[1]),B=parseInt(O),!isNaN(B))return 0==B%2?(L='element',M=B/2-1):(L='text',M=(B-1)/2),{type:L,index:M,id:W||null}}},{key:'parseTerminal',value:function(O){var L,B,M=O.match(/\\[(.*)\\]/);return M&&M[1]?(L=parseInt(O.split('[')[0])||null,B=M[1]):L=parseInt(O)||null,{offset:L,assertion:B}}},{key:'getChapterComponent',value:function(O){var L=O.split('!');return L[0]}},{key:'getPathComponent',value:function(O){var L=O.split('!');if(L[1]){var B=L[1].split(',');return B[0]}}},{key:'getRange',value:function(O){var L=O.split(',');return 3===L.length&&[L[1],L[2]]}},{key:'getCharecterOffsetComponent',value:function(O){var L=O.split(':');return L[1]||''}},{key:'joinSteps',value:function(O){return O?O.map(function(L){var B='';return'element'===L.type&&(B+=2*(L.index+1)),'text'===L.type&&(B+=1+2*L.index),L.id&&(B+='['+L.id+']'),B}).join('/'):''}},{key:'segmentString',value:function(O){var P='/';return P+=this.joinSteps(O.steps),O.terminal&&null!=O.terminal.offset&&(P+=':'+O.terminal.offset),O.terminal&&null!=O.terminal.assertion&&(P+='['+O.terminal.assertion+']'),P}},{key:'toString',value:function(){var O='epubcfi(';return O+=this.segmentString(this.base),O+='!',O+=this.segmentString(this.path),this.start&&(O+=',',O+=this.segmentString(this.start)),this.end&&(O+=',',O+=this.segmentString(this.end)),O+=')',O}},{key:'compare',value:function(O,L){var B,M,z,W;if('string'==typeof O&&(O=new A(O)),'string'==typeof L&&(L=new A(L)),O.spinePos>L.spinePos)return 1;if(O.spinePos<L.spinePos)return-1;O.range?(B=O.path.steps.concat(O.start.steps),z=O.start.terminal):(B=O.path.steps,z=O.path.terminal),L.range?(M=L.path.steps.concat(L.start.steps),W=L.start.terminal):(M=L.path.steps,W=L.path.terminal);for(var D=0;D<B.length;D++){if(!B[D])return-1;if(!M[D])return 1;if(B[D].index>M[D].index)return 1;if(B[D].index<M[D].index)return-1}return B.length<M.length?1:z.offset>W.offset?1:z.offset<W.offset?-1:0}},{key:'step',value:function(O){var L=O.nodeType===R?'text':'element';return{id:O.id,tagName:O.tagName,type:L,index:this.position(O)}}},{key:'filteredStep',value:function(O,L){var M,B=this.filter(O,L);if(B)return M=B.nodeType===R?'text':'element',{id:B.id,tagName:B.tagName,type:M,index:this.filteredPosition(B,L)}}},{key:'pathTo',value:function(O,L,B){for(var W,M={steps:[],terminal:{offset:null,assertion:null}},z=O;z&&z.parentNode&&z.parentNode.nodeType!=9;)W=B?this.filteredStep(z,B):this.step(z),W&&M.steps.unshift(W),z=z.parentNode;return null!=L&&0<=L&&(M.terminal.offset=L,'text'!=M.steps[M.steps.length-1].type&&M.steps.push({type:'text',index:0})),M}},{key:'equalStep',value:function(O,L){return O&&L&&O.index===L.index&&O.id===L.id&&O.type===L.type}},{key:'fromRange',value:function(O,L,B){var M={range:!1,base:{},path:{},start:null,end:null},z=O.startContainer,W=O.endContainer,D=O.startOffset,U=O.endOffset,H=!1;if(B&&(H=null!=z.ownerDocument.querySelector('.'+B)),'string'==typeof L?(M.base=this.parseComponent(L),M.spinePos=M.base.steps[1].index):'object'===('undefined'==typeof L?'undefined':C(L))&&(M.base=L),O.collapsed)H&&(D=this.patchOffset(z,D,B)),M.path=this.pathTo(z,D,B);else{M.range=!0,H&&(D=this.patchOffset(z,D,B)),M.start=this.pathTo(z,D,B),H&&(U=this.patchOffset(W,U,B)),M.end=this.pathTo(W,U,B),M.path={steps:[],terminal:null};var F,I=M.start.steps.length;for(F=0;F<I&&this.equalStep(M.start.steps[F],M.end.steps[F]);F++)F===I-1?M.start.terminal===M.end.terminal&&(M.path.steps.push(M.start.steps[F]),M.range=!1):M.path.steps.push(M.start.steps[F]);M.start.steps=M.start.steps.slice(M.path.steps.length),M.end.steps=M.end.steps.slice(M.path.steps.length)}return M}},{key:'fromNode',value:function(O,L,B){var M={range:!1,base:{},path:{},start:null,end:null};return'string'==typeof L?(M.base=this.parseComponent(L),M.spinePos=M.base.steps[1].index):'object'===('undefined'==typeof L?'undefined':C(L))&&(M.base=L),M.path=this.pathTo(O,null,B),M}},{key:'filter',value:function(O,L){var B,M,z,W,D,U=!1;return O.nodeType===R?(U=!0,z=O.parentNode,B=O.parentNode.classList.contains(L)):(U=!1,B=O.classList.contains(L)),B&&U?(W=z.previousSibling,D=z.nextSibling,W&&W.nodeType===R?M=W:D&&D.nodeType===R&&(M=D),M?M:O):B&&!U?!1:O}},{key:'patchOffset',value:function(O,L,B){if(O.nodeType!=R)throw new Error('Anchor must be a text node');var M=O,z=L;for(O.parentNode.classList.contains(B)&&(M=O.parentNode);M.previousSibling;){if(M.previousSibling.nodeType!==S)z+=M.previousSibling.textContent.length;else if(M.previousSibling.classList.contains(B))z+=M.previousSibling.textContent.length;else break;M=M.previousSibling}return z}},{key:'normalizedMap',value:function(O,L,B){var W,U,H,M={},z=-1,D=O.length;for(W=0;W<D;W++)U=O[W].nodeType,U===S&&O[W].classList.contains(B)&&(U=R),0<W&&U===R&&H===R?M[W]=z:L===U&&(++z,M[W]=z),H=U;return M}},{key:'position',value:function(O){var L,B;return O.nodeType===S?(L=O.parentNode.children,!L&&(L=(0,_.findChildren)(O.parentNode)),B=Array.prototype.indexOf.call(L,O)):(L=this.textNodes(O.parentNode),B=L.indexOf(O)),B}},{key:'filteredPosition',value:function(O,L){var B,M,z;return O.nodeType===S?(B=O.parentNode.children,z=this.normalizedMap(B,S,L)):(B=O.parentNode.childNodes,O.parentNode.classList.contains(L)&&(O=O.parentNode,B=O.parentNode.childNodes),z=this.normalizedMap(B,R,L)),M=Array.prototype.indexOf.call(B,O),z[M]}},{key:'stepsToXpath',value:function(O){var L=['.','*'];return O.forEach(function(B){var M=B.index+1;B.id?L.push('*[position()='+M+' and @id=\\''+B.id+'\\']'):'text'===B.type?L.push('text()['+M+']'):L.push('*['+M+']')}),L.join('/')}},{key:'stepsToQuerySelector',value:function(O){var L=['html'];return O.forEach(function(B){var M=B.index+1;B.id?L.push('#'+B.id):'text'===B.type||L.push('*:nth-child('+M+')')}),L.join('>')}},{key:'textNodes',value:function(O,L){return Array.prototype.slice.call(O.childNodes).filter(function(B){return B.nodeType===R||L&&B.classList.contains(L)})}},{key:'walkToNode',value:function(O,L,B){var W,D,H,M=L||document,z=M.documentElement,U=O.length;for(H=0;H<U&&(D=O[H],'element'===D.type?D.id?z=M.getElementById(D.id):(W=z.children||(0,_.findChildren)(z),z=W[D.index]):'text'===D.type&&(z=this.textNodes(z,B)[D.index]),!!z);H++);return z}},{key:'findNode',value:function(O,L,B){var z,W,M=L||document;return B||'undefined'==typeof M.evaluate?B?z=this.walkToNode(O,M,B):z=this.walkToNode(O,M):(W=this.stepsToXpath(O),z=M.evaluate(W,M,null,XPathResult.FIRST_ORDERED_NODE_TYPE,null).singleNodeValue),z}},{key:'fixMiss',value:function(O,L,B,M){var U,H,z=this.findNode(O.slice(0,-1),B,M),W=z.childNodes,D=this.normalizedMap(W,R,M),I=O[O.length-1].index;for(var F in D){if(!D.hasOwnProperty(F))return;if(D[F]===I)if(U=W[F],H=U.textContent.length,L>H)L-=H;else{z=U.nodeType===S?U.childNodes[0]:U;break}}return{container:z,offset:L}}},{key:'toRange',value:function(O,L){var M,z,W,D,U,I,F,Y,B=O||document,H=this,X=!!L&&null!=B.querySelector('.'+L);if(M='undefined'==typeof B.createRange?new _.RangeObject:B.createRange(),H.range?(z=H.start,I=H.path.steps.concat(z.steps),D=this.findNode(I,B,X?L:null),W=H.end,F=H.path.steps.concat(W.steps),U=this.findNode(F,B,X?L:null)):(z=H.path,I=H.path.steps,D=this.findNode(H.path.steps,B,X?L:null)),D)try{null==z.terminal.offset?M.setStart(D,0):M.setStart(D,z.terminal.offset)}catch(K){Y=this.fixMiss(I,z.terminal.offset,B,X?L:null),M.setStart(Y.container,Y.offset)}else return console.log('NO START'),null;if(U)try{null==W.terminal.offset?M.setEnd(U,0):M.setEnd(U,W.terminal.offset)}catch(K){Y=this.fixMiss(F,H.end.terminal.offset,B,X?L:null),M.setEnd(Y.container,Y.offset)}return M}},{key:'isCfiString',value:function(O){return'string'==typeof O&&0===O.indexOf('epubcfi(')&&')'===O[O.length-1]}},{key:'generateChapterComponent',value:function(O,L,B){var M=parseInt(L),W='/'+2*(O+1)+'/';return W+=2*(M+1),B&&(W+='['+B+']'),W}}]),A}();p.default=N,u.exports=p['default']},function(u,p,f){'use strict';function k(R,T){if(!(R instanceof T))throw new TypeError('Cannot call a class as a function')}Object.defineProperty(p,'__esModule',{value:!0});var C=function(){function R(T,N){for(var P,A=0;A<N.length;A++)P=N[A],P.enumerable=P.enumerable||!1,P.configurable=!0,'value'in P&&(P.writable=!0),Object.defineProperty(T,P.key,P)}return function(T,N,A){return N&&R(T.prototype,N),A&&R(T,A),T}}(),E=f(3),_=function(R){return R&&R.__esModule?R:{default:R}}(E),S=function(){function R(T){k(this,R);var N,A;N=T.indexOf('://'),-1<N&&(T=new URL(T).pathname),A=this.parse(T),this.path=T,this.directory=this.isDirectory(T)?T:A.dir+'/',this.filename=A.base,this.extension=A.ext.slice(1)}return C(R,[{key:'parse',value:function(N){return _.default.parse(N)}},{key:'isAbsolute',value:function(N){return _.default.isAbsolute(N||this.path)}},{key:'isDirectory',value:function(N){return'/'===N.charAt(N.length-1)}},{key:'resolve',value:function(N){return _.default.resolve(this.directory,N)}},{key:'relative',value:function(N){return _.default.relative(this.directory,N)}},{key:'splitPath',value:function(N){return this.splitPathRe.exec(N).slice(1)}},{key:'toString',value:function(){return this.path}}]),R}();p.default=S,u.exports=p['default']},function(u){'use strict';function v(R){if('string'!=typeof R)throw new TypeError('Path must be a string. Received '+R)}function k(R,T){for(var O,N='',A=-1,P=0,L=0;L<=R.length;++L){if(L<R.length)O=R.charCodeAt(L);else if(47===O)break;else O=47;if(47===O){if(A==L-1||1==P);else if(A!=L-1&&2==P){if(2>N.length||46!==N.charCodeAt(N.length-1)||46!==N.charCodeAt(N.length-2))if(2<N.length){for(var B=N.length-1,M=B;0<=M&&47!==N.charCodeAt(M);--M);if(M!=B){N=-1==M?'':N.slice(0,M),A=L,P=0;continue}}else if(2===N.length||1===N.length){N='',A=L,P=0;continue}T&&(0<N.length?N+='/..':N='..')}else 0<N.length?N+='/'+R.slice(A+1,L):N=R.slice(A+1,L);A=L,P=0}else 46===O&&-1!=P?++P:P=-1}return N}function C(R,T){var N=T.dir||T.root,A=T.base||(T.name||'')+(T.ext||'');return N?N===T.root?N+A:N+R+A:A}var E='function'==typeof Symbol&&'symbol'==typeof Symbol.iterator?function(R){return typeof R}:function(R){return R&&'function'==typeof Symbol&&R.constructor===Symbol&&R!==Symbol.prototype?'symbol':typeof R};if(!_)var _={cwd:function(){return'/'}};var S={resolve:function(){for(var A,T='',N=!1,P=arguments.length-1;-1<=P&&!N;P--){var O;(0<=P?O=arguments[P]:(void 0==A&&(A=_.cwd()),O=A),v(O),0!==O.length)&&(T=O+'/'+T,N=47===O.charCodeAt(0))}return T=k(T,!N),N?0<T.length?'/'+T:'/':0<T.length?T:'.'},normalize:function(T){if(v(T),0===T.length)return'.';var N=47===T.charCodeAt(0),A=47===T.charCodeAt(T.length-1);return T=k(T,!N),0!==T.length||N||(T='.'),0<T.length&&A&&(T+='/'),N?'/'+T:T},isAbsolute:function(T){return v(T),0<T.length&&47===T.charCodeAt(0)},join:function(){if(0===arguments.length)return'.';for(var T,A,N=0;N<arguments.length;++N)A=arguments[N],v(A),0<A.length&&(void 0==T?T=A:T+='/'+A);return void 0===T?'.':S.normalize(T)},relative:function(T,N){if(v(T),v(N),T===N)return'';if(T=S.resolve(T),N=S.resolve(N),T===N)return'';for(var A=1;A<T.length&&47===T.charCodeAt(A);++A);for(var P=T.length,O=P-A,L=1;L<N.length&&47===N.charCodeAt(L);++L);for(var B=N.length,M=B-L,z=O<M?O:M,W=-1,D=0;D<=z;++D){if(D==z){if(M>z){if(47===N.charCodeAt(L+D))return N.slice(L+D+1);if(0==D)return N.slice(L+D)}else O>z&&(47===T.charCodeAt(A+D)?W=D:0==D&&(W=0));break}var U=T.charCodeAt(A+D),H=N.charCodeAt(L+D);if(U!==H)break;else 47===U&&(W=D)}var I='';for(D=A+W+1;D<=P;++D)(D===P||47===T.charCodeAt(D))&&(I+=0===I.length?'..':'/..');return 0<I.length?I+N.slice(L+W):(L+=W,47===N.charCodeAt(L)&&++L,N.slice(L))},_makeLong:function(T){return T},dirname:function(T){if(v(T),0===T.length)return'.';for(var N=T.charCodeAt(0),A=47===N,P=-1,O=!0,L=T.length-1;1<=L;--L)if(N=T.charCodeAt(L),47!==N)O=!1;else if(!O){P=L;break}return-1===P?A?'/':'.':A&&1===P?'//':T.slice(0,P)},basename:function(T,N){if(N!==void 0&&'string'!=typeof N)throw new TypeError('\"ext\" argument must be a string');v(T);var A=0,P=-1,O=!0,L;if(void 0!==N&&0<N.length&&N.length<=T.length){if(N.length===T.length&&N===T)return'';var B=N.length-1,M=-1;for(L=T.length-1;0<=L;--L){var z=T.charCodeAt(L);if(47!==z)-1==M&&(O=!1,M=L+1),0<=B&&(z===N.charCodeAt(B)?-1==--B&&(P=L):(B=-1,P=M));else if(!O){A=L+1;break}}return A===P?P=M:-1===P&&(P=T.length),T.slice(A,P)}for(L=T.length-1;0<=L;--L)if(47!==T.charCodeAt(L))-1==P&&(O=!1,P=L+1);else if(!O){A=L+1;break}return-1===P?'':T.slice(A,P)},extname:function(T){v(T);for(var M,N=-1,A=0,P=-1,O=!0,L=0,B=T.length-1;0<=B;--B){if(M=T.charCodeAt(B),47===M){if(!O){A=B+1;break}continue}-1==P&&(O=!1,P=B+1),46===M?-1==N?N=B:1!=L&&(L=1):-1!==N&&(L=-1)}return-1===N||-1===P||0==L||1==L&&N===P-1&&N===A+1?'':T.slice(N,P)},format:function(T){if(null===T||'object'!==('undefined'==typeof T?'undefined':E(T)))throw new TypeError('Parameter \"pathObject\" must be an object, not '+('undefined'==typeof T?'undefined':E(T)));return C('/',T)},parse:function(T){v(T);var N={root:'',dir:'',base:'',ext:'',name:''};if(0===T.length)return N;var O,A=T.charCodeAt(0),P=47===A;P?(N.root='/',O=1):O=0;for(var L=-1,B=0,M=-1,z=!0,W=T.length-1,D=0;W>=O;--W){if(A=T.charCodeAt(W),47===A){if(!z){B=W+1;break}continue}-1==M&&(z=!1,M=W+1),46===A?-1==L?L=W:1!=D&&(D=1):-1!=L&&(D=-1)}return-1==L||-1==M||0==D||1==D&&L==M-1&&L==B+1?-1!=M&&(0==B&&P?N.base=N.name=T.slice(1,M):N.base=N.name=T.slice(B,M)):(0==B&&P?(N.name=T.slice(1,L),N.base=T.slice(1,M)):(N.name=T.slice(B,L),N.base=T.slice(B,M)),N.ext=T.slice(L,M)),0<B?N.dir=T.slice(0,B-1):P&&(N.dir='/'),N},sep:'/',delimiter:':',posix:null};u.exports=S},function(u,p,f){'use strict';function v(M){return M&&M.__esModule?M:{default:M}}function k(M,z){if(!(M instanceof z))throw new TypeError('Cannot call a class as a function')}Object.defineProperty(p,'__esModule',{value:!0});var C=function(){function M(z,W){for(var U,D=0;D<W.length;D++)U=W[D],U.enumerable=U.enumerable||!1,U.configurable=!0,'value'in U&&(U.writable=!0),Object.defineProperty(z,U.key,U)}return function(z,W,D){return W&&M(z.prototype,W),D&&M(z,D),z}}(),E=f(23),_=v(E),S=f(0),R=f(1),T=v(R),N=f(7),A=v(N),P=f(8),O=f(25),L=['keydown','keyup','keypressed','mouseup','mousedown','click','touchend','touchstart'],B=function(){function M(z,W,D){k(this,M),this.epubcfi=new T.default,this.document=z,this.documentElement=this.document.documentElement,this.content=W||this.document.body,this.window=this.document.defaultView,this._size={width:0,height:0},this.cfiBase=D||'',this.pane=void 0,this.highlights={},this.underlines={},this.marks={},this.listeners()}return C(M,[{key:'width',value:function(W){var D=this.content;return W&&(0,S.isNumber)(W)&&(W+='px'),W&&(D.style.width=W),this.window.getComputedStyle(D).width}},{key:'height',value:function(W){var D=this.content;return W&&(0,S.isNumber)(W)&&(W+='px'),W&&(D.style.height=W),this.window.getComputedStyle(D).height}},{key:'contentWidth',value:function(W){var D=this.content||this.document.body;return W&&(0,S.isNumber)(W)&&(W+='px'),W&&(D.style.width=W),this.window.getComputedStyle(D).width}},{key:'contentHeight',value:function(W){var D=this.content||this.document.body;return W&&(0,S.isNumber)(W)&&(W+='px'),W&&(D.style.height=W),this.window.getComputedStyle(D).height}},{key:'textWidth',value:function(){var W,D=this.document.createRange(),U=this.content||this.document.body;return D.selectNodeContents(U),W=D.getBoundingClientRect().width,W}},{key:'textHeight',value:function(){var W,D=this.document.createRange(),U=this.content||this.document.body;return D.selectNodeContents(U),W=D.getBoundingClientRect().height,W}},{key:'scrollWidth',value:function(){var W=this.documentElement.scrollWidth;return W}},{key:'scrollHeight',value:function(){var W=this.documentElement.scrollHeight;return W}},{key:'overflow',value:function(W){return W&&(this.documentElement.style.overflow=W),this.window.getComputedStyle(this.documentElement).overflow}},{key:'overflowX',value:function(W){return W&&(this.documentElement.style.overflowX=W),this.window.getComputedStyle(this.documentElement).overflowX}},{key:'overflowY',value:function(W){return W&&(this.documentElement.style.overflowY=W),this.window.getComputedStyle(this.documentElement).overflowY}},{key:'css',value:function(W,D,U){var H=this.content||this.document.body;return D&&H.style.setProperty(W,D,U?'important':''),this.window.getComputedStyle(H)[W]}},{key:'viewport',value:function(W){var Y,K,$=this.document.querySelector('meta[name=\\'viewport\\']'),G={width:void 0,height:void 0,scale:void 0,minimum:void 0,maximum:void 0,scalable:void 0},ee=[];if($&&$.hasAttribute('content')){var te=$.getAttribute('content'),ne=te.match(/width\\s*=\\s*([^,]*)/g),ae=te.match(/height\\s*=\\s*([^,]*)/g),ie=te.match(/initial-scale\\s*=\\s*([^,]*)/g),le=te.match(/minimum-scale\\s*=\\s*([^,]*)/g),oe=te.match(/maximum-scale\\s*=\\s*([^,]*)/g),re=te.match(/user-scalable\\s*=\\s*([^,]*)/g);ne&&ne.length&&'undefined'!=typeof ne[1]&&(G.width=ne[1]),ae&&ae.length&&'undefined'!=typeof ae[1]&&(G.height=ae[1]),ie&&ie.length&&'undefined'!=typeof ie[1]&&(G.scale=ie[1]),le&&le.length&&'undefined'!=typeof le[1]&&(G.minimum=le[1]),oe&&oe.length&&'undefined'!=typeof oe[1]&&(G.maximum=oe[1]),re&&re.length&&'undefined'!=typeof re[1]&&(G.scalable=re[1])}return W&&((W.width||G.width)&&ee.push('width='+(W.width||G.width)),(W.height||G.height)&&ee.push('height='+(W.height||G.height)),(W.scale||G.scale)&&ee.push('initial-scale='+(W.scale||G.scale)),(W.scalable||G.scalable)&&(ee.push('minimum-scale='+(W.scale||G.minimum)),ee.push('maximum-scale='+(W.scale||G.maximum)),ee.push('user-scalable='+(W.scalable||G.scalable))),!$&&($=this.document.createElement('meta'),$.setAttribute('name','viewport'),this.document.querySelector('head').appendChild($)),$.setAttribute('content',ee.join(', '))),{width:parseInt(Y),height:parseInt(K)}}},{key:'expand',value:function(){this.emit('expand')}},{key:'listeners',value:function(){this.imageLoadListeners(),this.mediaQueryListeners(),this.addEventListeners(),this.addSelectionListeners(),this.resizeListeners(),this.linksHandler()}},{key:'removeListeners',value:function(){this.removeEventListeners(),this.removeSelectionListeners(),clearTimeout(this.expanding)}},{key:'resizeListeners',value:function(){var W,D;clearTimeout(this.expanding),W=this.scrollWidth(),D=this.scrollHeight(),(W!=this._size.width||D!=this._size.height)&&(this._size={width:W,height:D},this.pane&&this.pane.render(),this.emit('resize',this._size)),this.expanding=setTimeout(this.resizeListeners.bind(this),350)}},{key:'mediaQueryListeners',value:function(){for(var W=this.document.styleSheets,D=function(X){X.matches&&!this._expanding&&setTimeout(this.expand.bind(this),1)}.bind(this),U=0;U<W.length;U+=1){var H;try{H=W[U].cssRules}catch(X){return}if(!H)return;for(var I=0;I<H.length;I+=1)if(H[I].media){var F=this.window.matchMedia(H[I].media.mediaText);F.addListener(D)}}}},{key:'observe',value:function(W){var D=this,U=new MutationObserver(function(){D._expanding&&D.expand()});return U.observe(W,{attributes:!0,childList:!0,characterData:!0,subtree:!0}),U}},{key:'imageLoadListeners',value:function(){for(var U,D=this.document.querySelectorAll('img'),H=0;H<D.length;H++)U=D[H],'undefined'!=typeof U.naturalWidth&&0===U.naturalWidth&&(U.onload=this.expand.bind(this))}},{key:'fontLoadListeners',value:function(){this.document&&this.document.fonts&&this.document.fonts.ready.then(function(){this.expand()}.bind(this))}},{key:'root',value:function(){return this.document?this.document.documentElement:null}},{key:'locationOf',value:function(W,D){var U,H={left:0,top:0};if(this.document){if(this.epubcfi.isCfiString(W)){var I=new T.default(W).toRange(this.document,D);I&&(I.startContainer.nodeType===Node.ELEMENT_NODE?(U=I.startContainer.getBoundingClientRect(),H.left=U.left,H.top=U.top):I.collapsed?U=I.getClientRects()[0]:U=I.getBoundingClientRect())}else if('string'==typeof W&&-1<W.indexOf('#')){var F=W.substring(W.indexOf('#')+1),X=this.document.getElementById(F);X&&(U=X.getBoundingClientRect())}return U&&(H.left=U.left,H.top=U.top),H}}},{key:'addStylesheet',value:function(W){return new Promise(function(D){var H,I=!1;return this.document?(H=this.document.querySelector('link[href=\\''+W+'\\']'),H?void D(!0):void(H=this.document.createElement('link'),H.type='text/css',H.rel='stylesheet',H.href=W,H.onload=H.onreadystatechange=function(){var F=this;I||this.readyState&&'complete'!=this.readyState||(I=!0,setTimeout(function(){F.pane&&F.pane.render(),D(!0)},1))},this.document.head.appendChild(H))):void D(!1)}.bind(this))}},{key:'addStylesheetRules',value:function(W){var D,U,H='epubjs-inserted-css';if(this.document&&W&&0!==W.length){if(D=this.document.getElementById('#'+H),D||(D=this.document.createElement('style'),D.id=H),this.document.head.appendChild(D),U=D.sheet,'[object Array]'===Object.prototype.toString.call(W))for(var I=0,F=W.length;I<F;I++){var X=1,Y=W[I],K=W[I][0],Q='';'[object Array]'===Object.prototype.toString.call(Y[1][0])&&(Y=Y[1],X=0);for(var J,V=Y.length;X<V;X++)J=Y[X],Q+=J[0]+':'+J[1]+(J[2]?' !important':'')+';\\n';U.insertRule(K+'{'+Q+'}',U.cssRules.length)}else{var Z=Object.keys(W);Z.forEach(function($){var G=W[$],ee=Object.keys(G),te=ee.map(function(ne){return ne+':'+G[ne]}).join(';');U.insertRule($+'{'+te+'}',U.cssRules.length)})}this.pane&&this.pane.render()}}},{key:'addScript',value:function(W){return new Promise(function(D){var H,I=!1;return this.document?void(H=this.document.createElement('script'),H.type='text/javascript',H.async=!0,H.src=W,H.onload=H.onreadystatechange=function(){I||this.readyState&&'complete'!=this.readyState||(I=!0,setTimeout(function(){D(!0)},1))},this.document.head.appendChild(H)):void D(!1)}.bind(this))}},{key:'addClass',value:function(W){var D;this.document&&(D=this.content||this.document.body,D.classList.add(W))}},{key:'removeClass',value:function(W){var D;this.document&&(D=this.content||this.document.body,D.classList.remove(W))}},{key:'addEventListeners',value:function(){this.document&&L.forEach(function(W){this.document.addEventListener(W,this.triggerEvent.bind(this),!1)},this)}},{key:'removeEventListeners',value:function(){this.document&&L.forEach(function(W){this.document.removeEventListener(W,this.triggerEvent,!1)},this)}},{key:'triggerEvent',value:function(W){this.emit(W.type,W)}},{key:'addSelectionListeners',value:function(){this.document&&this.document.addEventListener('selectionchange',this.onSelectionChange.bind(this),!1)}},{key:'removeSelectionListeners',value:function(){this.document&&this.document.removeEventListener('selectionchange',this.onSelectionChange,!1)}},{key:'onSelectionChange',value:function(){this.selectionEndTimeout&&clearTimeout(this.selectionEndTimeout),this.selectionEndTimeout=setTimeout(function(){var D=this.window.getSelection();this.triggerSelectedEvent(D)}.bind(this),250)}},{key:'triggerSelectedEvent',value:function(W){var D,U;W&&0<W.rangeCount&&(D=W.getRangeAt(0),!D.collapsed&&(U=new T.default(D,this.cfiBase).toString(),this.emit('selected',U),this.emit('selectedRange',D)))}},{key:'range',value:function(W,D){var U=new T.default(W);return U.toRange(this.document,D)}},{key:'cfiFromRange',value:function(W,D){return new T.default(W,this.cfiBase,D).toString()}},{key:'cfiFromNode',value:function(W,D){return new T.default(W,this.cfiBase,D).toString()}},{key:'map',value:function(W){var z=new A.default(W);return z.section()}},{key:'size',value:function(W,D){0<=W&&this.width(W),0<=D&&this.height(D),this.css('margin','0'),this.css('box-sizing','border-box')}},{key:'columns',value:function(W,D,U,H){var I=(0,S.prefixed)('column-axis'),F=(0,S.prefixed)('column-gap'),X=(0,S.prefixed)('column-width'),Y=(0,S.prefixed)('column-fill');this.width(W),this.height(D),this.viewport({width:W,height:D,scale:1,scalable:'no'}),this.css('display','inline-block'),this.css('overflow-y','hidden'),this.css('margin','0',!0),this.css('padding','0',!0),this.css('box-sizing','border-box'),this.css('max-width','inherit'),this.css(I,'horizontal'),this.css(Y,'auto'),this.css(F,H+'px'),this.css(X,U+'px')}},{key:'scaler',value:function(W,D,U){var I='';this.css('transform-origin','top left'),(0<=D||0<=U)&&(I=' translate('+(D||0)+'px, '+(U||0)+'px )'),this.css('transform','scale('+W+')'+I)}},{key:'fit',value:function(W,D){var U=this.viewport(),H=W/U.width,I=D/U.height,F=H<I?H:I,X=(D-U.height*F)/2;this.width(W),this.height(D),this.overflow('hidden'),this.viewport({scale:1}),this.scaler(F,0,X),this.css('background-color','transparent')}},{key:'mapPage',value:function(W,D,U,H,I){var F=new A.default(D,I);return F.page(this,W,U,H)}},{key:'linksHandler',value:function(){var W=this;(0,P.replaceLinks)(this.content,function(D){W.emit('link',D)})}},{key:'highlight',value:function(W){var D=this,U=1<arguments.length&&void 0!==arguments[1]?arguments[1]:{},H=arguments[2],I=this.range(W),F=function(){D.emit('markClicked',W,U)};U.epubcfi=W,this.pane||(this.pane=new O.Pane(this.content,this.document.body));var X=new O.Highlight(I,'epubjs-hl',U,{fill:'yellow','fill-opacity':'0.3','mix-blend-mode':'multiply'}),Y=this.pane.addMark(X);return this.highlights[W]={mark:Y,element:Y.element,listeners:[F,H]},Y.element.addEventListener('click',F),H&&Y.element.addEventListener('click',H),Y}},{key:'underline',value:function(W){var D=this,U=1<arguments.length&&void 0!==arguments[1]?arguments[1]:{},H=arguments[2],I=this.range(W),F=function(){D.emit('markClicked',W,U)};U.epubcfi=W,this.pane||(this.pane=new O.Pane(this.content,this.document.body));var X=new O.Underline(I,'epubjs-ul',U,{stroke:'black','stroke-opacity':'0.3','mix-blend-mode':'multiply'}),Y=this.pane.addMark(X);return this.underlines[W]={mark:Y,element:Y.element,listeners:[F,H]},Y.element.addEventListener('click',F),H&&Y.element.addEventListener('click',H),Y}},{key:'mark',value:function(W){var D=this,U=1<arguments.length&&void 0!==arguments[1]?arguments[1]:{},H=arguments[2],I=this.range(W),F=I.commonAncestorContainer,X=1===F.nodeType?F:F.parentNode,Y=function(){D.emit('markClicked',W,U)};return X.setAttribute('ref','epubjs-mk'),X.dataset.epubcfi=W,U&&Object.keys(U).forEach(function(K){X.dataset[K]=U[K]}),X.addEventListener('click',Y),H&&X.addEventListener('click',H),this.marks[W]={element:X,listeners:[Y,H]},X}},{key:'unhighlight',value:function(W){var D;W in this.highlights&&(D=this.highlights[W],this.pane.removeMark(D.mark),D.listeners.forEach(function(U){U&&D.element.removeEventListener('click',U)}),delete this.highlights[W])}},{key:'ununderline',value:function(W){var D;W in this.underlines&&(D=this.underlines[W],this.pane.removeMark(D.mark),D.listeners.forEach(function(U){U&&D.element.removeEventListener('click',U)}),delete this.underlines[W])}},{key:'unmark',value:function(W){var D;W in this.marks&&(D=this.marks[W],D.element.removeAttribute('ref'),D.listeners.forEach(function(U){U&&D.element.removeEventListener('click',U)}),delete this.marks[W])}},{key:'destroy',value:function(){this.observer&&this.observer.disconnect(),this.removeListeners()}}],[{key:'listenedEvents',get:function(){return L}}]),M}();(0,_.default)(B.prototype),p.default=B,u.exports=p['default']},function(u,p,f){'use strict';var v=f(4);u.exports=v},function(u,p,f){'use strict';var _,v=f(10),k=f(17),C=f(13),E=f(20);_=u.exports=function(S,R){var T,N,A,P,O;return 2>arguments.length||'string'!=typeof S?(P=R,R=S,S=null):P=arguments[2],null==S?(T=A=!0,N=!1):(T=E.call(S,'c'),N=E.call(S,'e'),A=E.call(S,'w')),O={value:R,configurable:T,enumerable:N,writable:A},P?v(k(P),O):O},_.gs=function(S,R,T){var N,A,P,O;return'string'==typeof S?P=arguments[3]:(P=T,T=R,R=S,S=null),null==R?R=void 0:C(R)?null==T?T=void 0:!C(T)&&(P=T,T=void 0):(P=R,R=T=void 0),null==S?(N=!0,A=!1):(N=E.call(S,'c'),A=E.call(S,'e')),O={get:R,set:T,configurable:N,enumerable:A},P?v(k(P),O):O}},function(u,p,f){'use strict';function k(R,T){if(!(R instanceof T))throw new TypeError('Cannot call a class as a function')}Object.defineProperty(p,'__esModule',{value:!0});var C=function(){function R(T,N){for(var P,A=0;A<N.length;A++)P=N[A],P.enumerable=P.enumerable||!1,P.configurable=!0,'value'in P&&(P.writable=!0),Object.defineProperty(T,P.key,P)}return function(T,N,A){return N&&R(T.prototype,N),A&&R(T,A),T}}(),E=f(1),_=function(R){return R&&R.__esModule?R:{default:R}}(E),S=function(){function R(T,N){k(this,R),this.layout=T,this.horizontal='paginated'===this.layout.flow,this._dev=N}return C(R,[{key:'section',value:function(N){var A=this.findRanges(N),P=this.rangeListToCfiList(N.section.cfiBase,A);return P}},{key:'page',value:function(N,A,P,O){var B,L=N&&N.document&&N.document.body;if(L){if(B=this.rangePairToCfiPair(A,{start:this.findStart(L,P,O),end:this.findEnd(L,P,O)}),!0===this._dev){var M=N.document,z=new _.default(B.start).toRange(M),W=new _.default(B.end).toRange(M),D=M.defaultView.getSelection(),U=M.createRange();D.removeAllRanges(),U.setStart(z.startContainer,z.startOffset),U.setEnd(W.endContainer,W.endOffset),D.addRange(U)}return B}}},{key:'walk',value:function(N,A){for(var O,L,P=document.createTreeWalker(N,NodeFilter.SHOW_TEXT,{acceptNode:function(M){return 0<M.data.trim().length?NodeFilter.FILTER_ACCEPT:NodeFilter.FILTER_REJECT}},!1);(O=P.nextNode())&&(L=A(O),!L););return L}},{key:'findRanges',value:function(N){for(var z,W,A=[],P=N.contents.scrollWidth(),O=Math.ceil(P/this.layout.spreadWidth),L=O*this.layout.divisor,B=this.layout.columnWidth,M=this.layout.gap,D=0;D<L.pages;D++)z=(B+M)*D,W=B*(D+1)+M*D,A.push({start:this.findStart(N.document.body,z,W),end:this.findEnd(N.document.body,z,W)});return A}},{key:'findStart',value:function(N,A,P){for(var B,M,O=this,L=[N],z=N;L.length;)if(B=L.shift(),M=this.walk(B,function(W){var D,U,H,I;return(W.nodeType==Node.TEXT_NODE?(I=document.createRange(),I.selectNodeContents(W),H=I.getBoundingClientRect()):H=W.getBoundingClientRect(),D=O.horizontal?H.left:H.top,U=O.horizontal?H.right:H.bottom,D>=A&&D<=P)?W:U>A?W:void(z=W,L.push(W))}),M)return this.findTextStartRange(M,A,P);return this.findTextStartRange(z,A,P)}},{key:'findEnd',value:function(N,A,P){for(var B,z,O=this,L=[N],M=N;L.length;)if(B=L.shift(),z=this.walk(B,function(W){var D,U,H,I;return(W.nodeType==Node.TEXT_NODE?(I=document.createRange(),I.selectNodeContents(W),H=I.getBoundingClientRect()):H=W.getBoundingClientRect(),D=O.horizontal?H.left:H.top,U=O.horizontal?H.right:H.bottom,D>P&&M)?M:U>P?W:void(M=W,L.push(W))}),z)return this.findTextEndRange(z,A,P);return this.findTextEndRange(M,A,P)}},{key:'findTextStartRange',value:function(N,A){for(var L,B,M,O=this.splitTextNodeIntoRanges(N),z=0;z<O.length;z++)if(L=O[z],B=L.getBoundingClientRect(),M=this.horizontal?B.left:B.top,M>=A)return L;return O[0]}},{key:'findTextEndRange',value:function(N,A,P){for(var L,B,M,z,W,O=this.splitTextNodeIntoRanges(N),D=0;D<O.length;D++){if(B=O[D],M=B.getBoundingClientRect(),z=this.horizontal?M.left:M.top,W=this.horizontal?M.right:M.bottom,z>P&&L)return L;if(W>P)return B;L=B}return O[O.length-1]}},{key:'splitTextNodeIntoRanges',value:function(N,A){var B,P=[],O=N.textContent||'',L=O.trim(),M=N.ownerDocument,z=A||' ',W=L.indexOf(z);if(-1===W||N.nodeType!=Node.TEXT_NODE)return B=M.createRange(),B.selectNodeContents(N),[B];for(B=M.createRange(),B.setStart(N,0),B.setEnd(N,W),P.push(B),B=!1;-1!=W;)W=L.indexOf(z,W+1),0<W&&(B&&(B.setEnd(N,W),P.push(B)),B=M.createRange(),B.setStart(N,W+1));return B&&(B.setEnd(N,L.length),P.push(B)),P}},{key:'rangePairToCfiPair',value:function(N,A){var P=A.start,O=A.end;P.collapse(!0),O.collapse(!1);var L=new _.default(P,N).toString(),B=new _.default(O,N).toString();return{start:L,end:B}}},{key:'rangeListToCfiList',value:function(N,A){for(var O,P=[],L=0;L<A.length;L++)O=this.rangePairToCfiPair(N,A[L]),P.push(O);return P}}]),R}();p.default=S,u.exports=p['default']},function(u,p,f){'use strict';function v(P){return P&&P.__esModule?P:{default:P}}Object.defineProperty(p,'__esModule',{value:!0}),p.replaceBase=function(P,O){var L,B;P&&(B=(0,S.qs)(P,'head'),L=(0,S.qs)(B,'base'),!L&&(L=P.createElement('base'),B.insertBefore(L,B.firstChild)),L.setAttribute('href',O.url))},p.replaceCanonical=function(P,O){var L,B,M=O.url;P&&(L=(0,S.qs)(P,'head'),B=(0,S.qs)(L,'link[rel=\\'canonical\\']'),B?B.setAttribute('href',M):(B=P.createElement('link'),B.setAttribute('rel','canonical'),B.setAttribute('href',M),L.appendChild(B)))},p.replaceLinks=function(P,O){var L=P.querySelectorAll('a[href]');if(L.length)for(var B=(0,S.qs)(P.ownerDocument,'base'),M=B?B.getAttribute('href'):void 0,z=function(D){var U=D.getAttribute('href');if(0!==U.indexOf('mailto:')){var H=-1<U.indexOf('://'),I=new T.default(U,M);H?D.setAttribute('target','_blank'):D.onclick=function(){return I&&I.hash?O(I.Path.path+I.hash):I?O(I.Path.path):O(U),!1}}}.bind(this),W=0;W<L.length;W++)z(L[W])},p.substitute=function(P,O,L){return O.forEach(function(B,M){B&&L[M]&&(P=P.replace(new RegExp(B,'g'),L[M]))}),P};var S=f(0),R=f(9),T=v(R),N=f(2),A=v(N)},function(u,p,f){'use strict';function v(N){return N&&N.__esModule?N:{default:N}}function k(N,A){if(!(N instanceof A))throw new TypeError('Cannot call a class as a function')}Object.defineProperty(p,'__esModule',{value:!0});var C=function(){function N(A,P){for(var L,O=0;O<P.length;O++)L=P[O],L.enumerable=L.enumerable||!1,L.configurable=!0,'value'in L&&(L.writable=!0),Object.defineProperty(A,L.key,L)}return function(A,P,O){return P&&N(A.prototype,P),O&&N(A,O),A}}(),E=f(2),_=v(E),S=f(3),R=v(S),T=function(){function N(A,P){k(this,N);var B,O=-1<A.indexOf('://'),L=A;if(this.Url=void 0,this.href=A,this.protocol='',this.origin='',this.hash='',this.hash='',this.search='',this.base=P,!O&&!1!==P&&'string'!=typeof P&&window&&window.location&&(this.base=window.location.href),O||this.base)try{this.Url=this.base?new URL(A,this.base):new URL(A),this.href=this.Url.href,this.protocol=this.Url.protocol,this.origin=this.Url.origin,this.hash=this.Url.hash,this.search=this.Url.search,L=this.Url.pathname}catch(M){this.Url=void 0,this.base&&(B=new _.default(this.base),L=B.resolve(L))}this.Path=new _.default(L),this.directory=this.Path.directory,this.filename=this.Path.filename,this.extension=this.Path.extension}return C(N,[{key:'path',value:function(){return this.Path}},{key:'resolve',value:function(P){var L,O=-1<P.indexOf('://');return O?P:(L=R.default.resolve(this.directory,P),this.origin+L)}},{key:'relative',value:function(P){return R.default.relative(P,this.directory)}},{key:'toString',value:function(){return this.href}}]),N}();p.default=T,u.exports=p['default']},function(u,p,f){'use strict';u.exports=f(11)()?Object.assign:f(12)},function(u){'use strict';u.exports=function(){var k,v=Object.assign;return!('function'!=typeof v)&&(k={foo:'raz'},v(k,{bar:'dwa'},{trzy:'trzy'}),'razdwatrzy'===k.foo+k.bar+k.trzy)}},function(u,p,f){'use strict';var v=f(14),k=f(19);u.exports=function(E,_){var S,R,N,T=_Mathmax(arguments.length,2);for(E=Object(k(E)),N=function(P){try{E[P]=_[P]}catch(O){S||(S=O)}},R=1;R<T;++R)_=arguments[R],v(_).forEach(N);if(S!==void 0)throw S;return E}},function(u){'use strict';u.exports=function(v){return'function'==typeof v}},function(u,p,f){'use strict';u.exports=f(15)()?Object.keys:f(16)},function(u){'use strict';u.exports=function(){try{return Object.keys('primitive'),!0}catch(v){return!1}}},function(u){'use strict';var v=Object.keys;u.exports=function(k){return v(null==k?k:Object(k))}},function(u){'use strict';var v=Array.prototype.forEach,k=Object.create,C=function(_,S){for(var R in _)S[R]=_[R]};u.exports=function(){var _=k(null);return v.call(arguments,function(S){null==S||C(Object(S),_)}),_}},function(u){'use strict';u.exports=function(v){if('function'!=typeof v)throw new TypeError(v+' is not a function');return v}},function(u){'use strict';u.exports=function(v){if(null==v)throw new TypeError('Cannot use null or undefined');return v}},function(u,p,f){'use strict';u.exports=f(21)()?_Stringprototype.contains:f(22)},function(u){'use strict';var v='razdwatrzy';u.exports=function(){return!('function'!=typeof v.contains)&&!0===v.contains('dwa')&&!1===v.contains('foo')}},function(u){'use strict';var v=_Stringprototype.indexOf;u.exports=function(k){return-1<v.call(this,k,arguments[1])}},function(u,p,f){'use strict';var v='function'==typeof Symbol&&'symbol'==typeof Symbol.iterator?function(D){return typeof D}:function(D){return D&&'function'==typeof Symbol&&D.constructor===Symbol&&D!==Symbol.prototype?'symbol':typeof D},k=f(6),C=f(18),E=Function.prototype.apply,_=Function.prototype.call,S=Object.create,R=Object.defineProperty,T=Object.defineProperties,N=Object.prototype.hasOwnProperty,A={configurable:!0,enumerable:!1,writable:!0},P,O,L,B,M,z,W;P=function(U,H){var I;return C(H),N.call(this,'__ee__')?I=this.__ee__:(I=A.value=S(null),R(this,'__ee__',A),A.value=null),I[U]?'object'===v(I[U])?I[U].push(H):I[U]=[I[U],H]:I[U]=H,this},O=function(U,H){var I,F;return C(H),F=this,P.call(this,U,I=function(){L.call(F,U,I),E.call(H,this,arguments)}),I.__eeOnceListener__=H,this},L=function(U,H){var I,F,X,Y;if(C(H),!N.call(this,'__ee__'))return this;if(I=this.__ee__,!I[U])return this;if(F=I[U],'object'===('undefined'==typeof F?'undefined':v(F)))for(Y=0;X=F[Y];++Y)(X===H||X.__eeOnceListener__===H)&&(2===F.length?I[U]=F[Y?0:1]:F.splice(Y,1));else(F===H||F.__eeOnceListener__===H)&&delete I[U];return this},B=function(U){var H,I,F,X,Y;if(N.call(this,'__ee__')&&(X=this.__ee__[U],!!X))if('object'===('undefined'==typeof X?'undefined':v(X))){for(I=arguments.length,Y=Array(I-1),H=1;H<I;++H)Y[H-1]=arguments[H];for(X=X.slice(),H=0;F=X[H];++H)E.call(F,this,Y)}else switch(arguments.length){case 1:_.call(X,this);break;case 2:_.call(X,this,arguments[1]);break;case 3:_.call(X,this,arguments[1],arguments[2]);break;default:for(I=arguments.length,Y=Array(I-1),H=1;H<I;++H)Y[H-1]=arguments[H];E.call(X,this,Y);}},M={on:P,once:O,off:L,emit:B},z={on:k(P),once:k(O),off:k(L),emit:k(B)},W=T({},z),u.exports=p=function(U){return null==U?S(W):T(Object(U),z)},p.methods=M},function(u,p){'use strict';function v(E,_){function S(A){for(var O,P=_.length-1;0<=P;P--)if(O=_[P],!!C(O,A.clientX,A.clientY)){O.dispatchEvent(k(A));break}}for(var N,R=['mouseup','mousedown','click'],T=0;T<R.length;T++)N=R[T],E.addEventListener(N,function(A){return S(A)},!1)}function k(E){var _=Object.assign({},E,{bubbles:!1});try{return new MouseEvent(E.type,_)}catch(R){var S=document.createEvent('MouseEvents');return S.initMouseEvent(E.type,!1,_.cancelable,_.view,_.detail,_.screenX,_.screenY,_.clientX,_.clientY,_.ctrlKey,_.altKey,_.shiftKey,_.metaKey,_.button,_.relatedTarget),S}}function C(E,_,S){function R(O,L,B){var M=O.top+O.height,z=O.left+O.width;return O.top<=B&&O.left<=L&&M>B&&z>L}var T=E.getBoundingClientRect();if(!R(T,_,S))return!1;for(var N=E.getClientRects(),A=0,P=N.length;A<P;A++)if(R(N[A],_,S))return!0;return!1}Object.defineProperty(p,'__esModule',{value:!0}),p.proxyMouse=v,p.clone=k,p.default={proxyMouse:v}},function(u,p,f){'use strict';function v(D){return D&&D.__esModule?D:{default:D}}function k(D,U){if(!D)throw new ReferenceError('this hasn\\'t been initialised - super() hasn\\'t been called');return U&&('object'==typeof U||'function'==typeof U)?U:D}function C(D,U){if('function'!=typeof U&&null!==U)throw new TypeError('Super expression must either be null or a function, not '+typeof U);D.prototype=Object.create(U&&U.prototype,{constructor:{value:D,enumerable:!1,writable:!0,configurable:!0}}),U&&(Object.setPrototypeOf?Object.setPrototypeOf(D,U):D.__proto__=U)}function E(D,U){if(!(D instanceof U))throw new TypeError('Cannot call a class as a function')}function _(D){var U=D.getBoundingClientRect();return{top:U.top+D.ownerDocument.body.scrollTop,left:U.left+D.ownerDocument.body.scrollLeft,height:U.height+D.scrollHeight,width:U.width+D.scrollWidth}}function S(D,U){D.style.top=U.top+'px',D.style.left=U.left+'px',D.style.height=U.height+'px',D.style.width=U.width+'px'}function R(D,U){return U.right<=D.right&&U.left>=D.left&&U.top>=D.top&&U.bottom<=D.bottom}Object.defineProperty(p,'__esModule',{value:!0}),p.Underline=p.Highlight=p.Mark=p.Pane=void 0;var T=function D(U,H,I){null===U&&(U=Function.prototype);var F=Object.getOwnPropertyDescriptor(U,H);if(F===void 0){var X=Object.getPrototypeOf(U);return null===X?void 0:D(X,H,I)}if('value'in F)return F.value;var Y=F.get;return void 0===Y?void 0:Y.call(I)},N=function(){function D(U,H){for(var F,I=0;I<H.length;I++)F=H[I],F.enumerable=F.enumerable||!1,F.configurable=!0,'value'in F&&(F.writable=!0),Object.defineProperty(U,F.key,F)}return function(U,H,I){return H&&D(U.prototype,H),I&&D(U,I),U}}(),A=f(26),P=v(A),O=f(24),L=v(O),B=p.Pane=function(){function D(U){var H=1<arguments.length&&void 0!==arguments[1]?arguments[1]:document.body;E(this,D),this.target=U,this.element=P.default.createElement('svg'),this.marks=[],this.element.style.position='absolute',this.element.setAttribute('pointer-events','none'),L.default.proxyMouse(this.target,this.marks),H.appendChild(this.element),this.render()}return N(D,[{key:'addMark',value:function(H){var I=P.default.createElement('g');return this.element.appendChild(I),H.bind(I),this.marks.push(H),H.render(),H}},{key:'removeMark',value:function(H){var I=this.marks.indexOf(H);if(-1!==I){var F=H.unbind();this.element.removeChild(F),this.marks.splice(I,1)}}},{key:'render',value:function(){S(this.element,_(this.target));var F,H=!0,I=!1;try{for(var Y,K,X=this.marks[Symbol.iterator]();!(H=(Y=X.next()).done);H=!0)K=Y.value,K.render()}catch(Q){I=!0,F=Q}finally{try{!H&&X.return&&X.return()}finally{if(I)throw F}}}}]),D}(),M=p.Mark=function(){function D(){E(this,D),this.element=null}return N(D,[{key:'bind',value:function(H){this.element=H}},{key:'unbind',value:function(){var H=this.element;return this.element=null,H}},{key:'render',value:function(){}},{key:'dispatchEvent',value:function(H){this.element&&this.element.dispatchEvent(H)}},{key:'getBoundingClientRect',value:function(){return this.element.getBoundingClientRect()}},{key:'getClientRects',value:function(){for(var H=[],I=this.element.firstChild;I;)H.push(I.getBoundingClientRect()),I=I.nextSibling;return H}},{key:'filteredRanges',value:function(){var H=Array.from(this.range.getClientRects());return H.filter(function(I){for(var F=0;F<H.length;F++){if(H[F]===I)return!0;var X=R(H[F],I);if(X)return!1}return!0})}}]),D}(),z=p.Highlight=function(D){function U(H,I,F,X){E(this,U);var Y=k(this,(U.__proto__||Object.getPrototypeOf(U)).call(this));return Y.range=H,Y.className=I,Y.data=F||{},Y.attributes=X||{},Y}return C(U,D),N(U,[{key:'bind',value:function(I){for(var F in T(U.prototype.__proto__||Object.getPrototypeOf(U.prototype),'bind',this).call(this,I),this.data)this.data.hasOwnProperty(F)&&(this.element.dataset[F]=this.data[F]);for(var F in this.attributes)this.attributes.hasOwnProperty(F)&&this.element.setAttribute(F,this.attributes[F]);this.className&&this.element.classList.add(this.className)}},{key:'render',value:function(){for(;this.element.firstChild;)this.element.removeChild(this.element.firstChild);for(var I=this.element.ownerDocument.createDocumentFragment(),F=this.filteredRanges(),X=this.element.getBoundingClientRect(),Y=0,K=F.length;Y<K;Y++){var Q=F[Y],V=P.default.createElement('rect');V.setAttribute('x',Q.left-X.left),V.setAttribute('y',Q.top-X.top),V.setAttribute('height',Q.height),V.setAttribute('width',Q.width),I.appendChild(V)}this.element.appendChild(I)}}]),U}(M),W=p.Underline=function(D){function U(H,I,F,X){return E(this,U),k(this,(U.__proto__||Object.getPrototypeOf(U)).call(this,H,I,F,X))}return C(U,D),N(U,[{key:'render',value:function(){for(;this.element.firstChild;)this.element.removeChild(this.element.firstChild);for(var I=this.element.ownerDocument.createDocumentFragment(),F=this.filteredRanges(),X=this.element.getBoundingClientRect(),Y=0,K=F.length;Y<K;Y++){var Q=F[Y],V=P.default.createElement('rect');V.setAttribute('x',Q.left-X.left),V.setAttribute('y',Q.top-X.top),V.setAttribute('height',Q.height),V.setAttribute('width',Q.width),V.setAttribute('fill','none');var J=P.default.createElement('line');J.setAttribute('x1',Q.left-X.left),J.setAttribute('x2',Q.left-X.left+Q.width),J.setAttribute('y1',Q.top-X.top+Q.height-1),J.setAttribute('y2',Q.top-X.top+Q.height-1),J.setAttribute('stroke-width',1),J.setAttribute('stroke','black'),J.setAttribute('stroke-linecap','square'),I.appendChild(V),I.appendChild(J)}this.element.appendChild(I)}}]),U}(z)},function(u,p){'use strict';function v(k){return document.createElementNS('http://www.w3.org/2000/svg',k)}Object.defineProperty(p,'__esModule',{value:!0}),p.createElement=v,p.default={createElement:v}},function(u){u.exports=s}])});";

const INJECTED_SCRIPT = "window.epubContents = undefined;\n(function () {\n \tvar waitForReactNativePostMessageReady;\n\n\tfunction _ready() {\n\t\tvar contents;\n\t\tvar targetOrigin = \"*\";\n\t\tvar sendMessage = function(obj) {\n\t\t\tif (typeof window.webkit != \"undefined\") {\n\t\t\t\twindow.postMessage(obj, targetOrigin);\n\t\t\t} else {\n\t\t\t\twindow.postMessage(JSON.stringify(obj), targetOrigin);\n\t\t\t}\n\t\t};\n\n\t\tvar isReactNativePostMessageReady = !!window.originalPostMessage;\n\t\tclearTimeout(waitForReactNativePostMessageReady);\n\t\tif(!isReactNativePostMessageReady) {\n\t\t  waitForReactNativePostMessageReady = setTimeout(_ready, 1);\n\t\t\treturn;\n\t\t}\n\n\t\tif (typeof EPUBJSContents === \"undefined\") {\n\t\t\treturn sendMessage({\n\t\t\t\tmethod: \"error\",\n\t\t\t\tvalue: \"EPUB.js is not loaded\"\n\t\t\t});\n\t\t}\n\n\t\tcontents = new EPUBJSContents(document);\n\n\t\tcontents.setCfiBase = function(cfiBase) {\n\t\t\tcontents.cfiBase = cfiBase;\n\t\t};\n\n\t\tvar preventTap = false;\n\t\tcontents.mark = function(cfiRange, data) {\n\t\t\tvar m = EPUBJSContents.prototype.mark.call(contents, cfiRange, data);\n\t\t\tm.addEventListener(\"touchstart\", function (e) {\n\t\t\t\tvar bounds = e.target.getBoundingClientRect();\n\t\t\t\tvar padding = parseFloat(window.getComputedStyle(e.target)[\"paddingRight\"]);\n\t\t\t\tvar clientX = e.targetTouches[0].pageX;\n\t\t\t\tif (clientX >= bounds.right - (padding || 0)) {\n\t\t\t\t\tpreventTap = true;\n\t\t\t\t\tsendMessage({method:\"markClicked\", data: data, cfiRange: cfiRange });\n\t\t\t\t}\n\t\t\t});\n\t\t\treturn m;\n\t\t};\n\n\t\tdocument.addEventListener(\"message\", function (e) {\n\t\t\tvar message = e.data;\n\t\t\tvar decoded = (typeof message == \"object\") ? message : JSON.parse(message);\n\t\t\tvar response;\n\t\t\tvar result;\n\n\t\t\tif (decoded.method in contents) {\n\t\t\t\tresult = contents[decoded.method].apply(contents, decoded.args);\n\n\t\t\t\tresponse = {\n\t\t\t\t\tmethod: decoded.method,\n\t\t\t\t\tpromise: decoded.promise,\n\t\t\t\t\tvalue: result\n\t\t\t\t};\n\n\t\t\t\tsendMessage(response);\n\n\t\t\t}\n\t\t});\n\n\t\tcontents.on(\"resize\", function (size) {\n\t\t\tsendMessage({method:\"resize\", value: size });\n\t\t});\n\n\t\tcontents.on(\"expand\", function () {\n\t\t\tsendMessage({method:\"expand\", value: true});\n\t\t});\n\n\t\tcontents.on(\"link\", function (href) {\n\t\t\tsendMessage({method:\"link\", value: href});\n\t\t});\n\n\t\tcontents.on(\"selected\", function (sel) {\n\t\t\tpreventTap = true;\n\t\t\tsendMessage({method:\"selected\", value: sel});\n\t\t});\n\n\t\tvar startPosition = { x: -1, y: -1 };\n\t\tvar currentPosition = { x: -1, y: -1 };\n\t\tvar isLongPress = false;\n\t\tvar longPressTimer;\n\t\tvar touchduration = 300;\n\n\t\tdocument.getElementsByTagName('body')[0].addEventListener(\"touchstart\", function (e) {\n\t\t\tstartPosition.x = e.targetTouches[0].pageX;\n\t\t\tstartPosition.y = e.targetTouches[0].pageY;\n\t\t\tcurrentPosition.x = e.targetTouches[0].pageX;\n\t\t\tcurrentPosition.y = e.targetTouches[0].pageY;\n\t\t\tisLongPress = false;\n\t\t\tlongPressTimer = setTimeout(function() {\n\t\t\t\tisLongPress = true;\n\t\t\t}, touchduration);\n\t\t}, false);\n\n\t\tdocument.getElementsByTagName('body')[0].addEventListener(\"touchmove\", function (e) {\n\t\t\tcurrentPosition.x = e.targetTouches[0].pageX;\n\t\t\tcurrentPosition.y = e.targetTouches[0].pageY;\n\t\t\tclearTimeout(longPressTimer);\n\t\t}, false);\n\n \t\tdocument.getElementsByTagName('body')[0].addEventListener(\"touchend\", function (e) {\n\t\t\tvar cfi;\n\t\t\tclearTimeout(longPressTimer);\n\t\t\tif(Math.abs(startPosition.x - currentPosition.x) < 2 &&\n\t\t\t\t Math.abs(startPosition.y - currentPosition.y) < 2) {\n\n\t\t\t\tcfi = contents.cfiFromNode(e.changedTouches[0].target).toString();\n\n\t\t\t\tif(preventTap) {\n\t\t\t\t\tpreventTap = false;\n\t\t\t\t} else if(isLongPress) {\n\t\t\t\t\tsendMessage({method:\"longpress\", position: currentPosition, cfi: cfi});\n\t\t\t\t\tisLongPress = false;\n\t\t\t\t} else {\n\t\t\t\t\tsetTimeout(function() {\n\t\t\t\t\t\tif(preventTap) {\n\t\t\t\t\t\t\tpreventTap = false;\n\t\t\t\t\t\t\tisLongPress = false;\n\t\t\t\t\t\t\treturn;\n\t\t\t\t\t\t}\n\t\t\t\t\t\tsendMessage({method:\"press\", position: currentPosition, cfi: cfi});\n\t\t\t\t\t}, 10);\n\t\t\t\t}\n\t\t\t}\n\t\t}, false);\n\n\t\tsendMessage({method:\"ready\", value: true});\n\n\t\twindow.epubContents = contents;\n\t}\n\n\tif ( document.readyState === 'complete' ) {\n\t\t_ready();\n\t} else {\n\t\twindow.addEventListener(\"load\", _ready, false);\n\t}\n}());\n";

class Epub extends Component {

  constructor(props) {
    super(props);

    var bounds = Dimensions.get("window");

    this.book_url = this.props.src;
    this.state = {
      toc: [],
      show: false,
      width: bounds.width,
      height: bounds.height
    };

    this.active = true;
  }

  componentDidMount() {

    AppState.addEventListener('change', this._handleAppStateChange.bind(this));

    Orientation.addSpecificOrientationListener(this._orientationDidChange.bind(this));
    this.orientation = Orientation.getInitialOrientation();
    if (this.orientation === "PORTRAITUPSIDEDOWN" || this.orientation === "UNKNOWN") {
      this.orientation = "PORTRAIT";
    }

    // Android starts as null
    if (this.orientation === null) {
      this.orientation = this.state.width > this.state.height ? "LANDSCAPE" : "PORTRAIT";
    }
    __DEV__ && console.log("inital orientation", this.orientation, this.state.width, this.state.height);

    if (this.book_url) {
      this._loadBook(this.book_url);
    }
  }

  componentWillUnmount() {
    AppState.removeEventListener('change', this._handleAppStateChange);
    Orientation.removeSpecificOrientationListener(this._orientationDidChange);
    clearTimeout(this.orientationTimeout);

    this.destroy();
  }

  shouldComponentUpdate(nextProps, nextState) {

    if (nextState.show !== this.state.show) {
      return true;
    }

    if (nextProps.width !== this.props.width || nextProps.height !== this.props.height) {
      return true;
    }

    if (nextState.width !== this.state.width || nextState.height !== this.state.height) {
      return true;
    }

    if (nextProps.color != this.props.color) {
      return true;
    }

    if (nextProps.backgroundColor != this.props.backgroundColor) {
      return true;
    }

    if (nextProps.size != this.props.size) {
      return true;
    }

    if (nextProps.flow != this.props.flow) {
      return true;
    }

    if (nextProps.origin != this.props.origin) {
      return true;
    }

    if (nextProps.orientation != this.props.orientation) {
      return true;
    }

    if (nextProps.src != this.props.src) {
      return true;
    }

    if (nextProps.onPress != this.props.onPress) {
      return true;
    }

    if (nextProps.onLongPress != this.props.onLongPress) {
      return true;
    }

    return false;
  }

  componentWillUpdate(nextProps) {
    if (nextProps.src !== this.props.src) {
      this.destroy();
    }
  }

  componentDidUpdate(prevProps) {
    if (this.rendition && this.props.themes && JSON.stringify(prevProps.themes) !== JSON.stringify(this.props.themes)) {
      this.rendition.themes.register(this.props.themes);
      this.rendition.themes.apply(this.props.theme);
    }

    if (this.rendition && prevProps.theme !== this.props.theme) {
      this.rendition.themes.apply(this.props.theme);
    }

    if (this.rendition && prevProps.fontSize !== this.props.fontSize) {
      this.rendition.themes.fontSize(this.props.fontSize);
    }

    if (prevProps.src !== this.props.src) {
      this.book_url = this.props.src;
      this._loadBook(this.book_url);
    } else if (prevProps.orientation !== this.props.orientation) {
      _orientationDidChange(this.props.orientation);
    } else if (prevProps.width !== this.props.width || prevProps.height !== this.props.height) {
      this.redisplay();
    } else if (prevProps.flow !== this.props.flow) {
      this.rendition.flow(this.props.flow || "paginated");
      this.redisplay();
    }

    if (prevProps.location !== this.props.location) {
      this.rendition.display(this.props.location);
    }
  }

  // LANDSCAPE PORTRAIT UNKNOWN PORTRAITUPSIDEDOWN
  _orientationDidChange(orientation) {
    var wait = 10;

    if (!this.active) return;

    if (orientation === "UNKNOWN" || orientation == "PORTRAITUPSIDEDOWN" || this.orientation === orientation) {
      return;
    }

    if (this.rendition) {
      this.orientationTimeout = setTimeout(() => {
        this._updateOrientation(orientation);
      }, wait);
    } else {
      this.orientationTimeout = setTimeout(() => {
        this._updateOrientation(orientation);
      }, wait);
    }
  }

  _updateOrientation(orientation) {
    var location = this._visibleLocation ? this._visibleLocation.start : this.props.location;
    var width, height;
    var bounds = Dimensions.get('window');
    var _width = bounds.width,
        _height = bounds.height;
    var reversed = false;

    __DEV__ && console.log("orientation", orientation, bounds.width, bounds.height);

    switch (orientation) {
      case "PORTRAIT":
        if (_width > _height) {
          reversed = true;
        };
        break;
      case "LANDSCAPE":
        width = this.props.height || _width;
        height = this.props.width || _height;
        break;
      case "LANDSCAPE-RIGHT":
        if (_height > _width) {
          reversed = true;
        };
        break;
      case "LANDSCAPE-LEFT":
        if (_height > _width) {
          reversed = true;
        };
        break;
      default:
        reversed = false;
    }

    this.orientation = orientation;

    if (reversed) {
      width = this.props.width || _height;
      height = this.props.height || _width;
    } else {
      width = this.props.width || _width;
      height = this.props.height || _height;
    }

    this.setState({ width, height }, () => {
      if ((!this.props.width || !this.props.height) && this.rendition) {
        this.redisplay(location);
      }
    });

    this.props.onOrientationChanged && this.props.onOrientationChanged(orientation);
  }

  redisplay(location) {
    var _location = location;
    if (!_location) {
      _location = this._visibleLocation ? this._visibleLocation.start : this.props.location;
    }

    if (this.rendition) {

      this.rendition.manager.clear(() => {
        this.rendition.layout(this.rendition.settings.globalLayoutProperties);
        this.rendition.display(_location);
      });
    }
  }

  _loadBook(bookUrl) {

    // __DEV__ && console.log("loading book: ", bookUrl);

    this.book = ePub({
      replacements: this.props.base64 || "none"
    });

    return this._openBook(bookUrl);

    // var type = this.book.determineType(bookUrl);

    // var uri = new Uri(bookUrl);
    // if ((type === "directory") || (type === "opf")) {
    //   return this._openBook(bookUrl);
    // } else {
    // return this.streamer.start()
    // .then((origin) => {
    //   this.setState({origin})
    //   return this.streamer.get(bookUrl);
    // })
    // .then((localUrl) => {
    //   console.log("local", localUrl);
    //   return this._openBook(localUrl);
    // });
    // }
  }

  _openBook(bookUrl, useBase64) {
    var type = useBase64 ? "base64" : null;
    var unzipTimer = Date.now();

    this.book.open(bookUrl).then(() => {
      // __DEV__ && console.log("book opened", Date.now() - unzipTimer);
    }).catch(err => {
      console.error(err);
    }

    // load epubjs in views
    /*
    book.spine.hooks.content.register(function(doc, section) {
      var script = doc.createElement("script");
      script.setAttribute("type", "text/javascript");
      script.setAttribute("src", EPUBJS_LOCATION);
       doc.getElementsByTagName("head")[0].appendChild(script);
    });
    */

    // Load the epubjs library into a hook for each webview
    );this.book.spine.hooks.content.register(function (doc, section) {
      var script = doc.createElement("script");
      script.setAttribute("type", "text/javascript");
      script.textContent = EPUBJS;
      doc.getElementsByTagName("head")[0].appendChild(script);

      var iscript = doc.createElement("script");
      iscript.setAttribute("type", "text/javascript");
      iscript.textContent = INJECTED_SCRIPT;
      doc.getElementsByTagName("head")[0].appendChild(iscript);
    }.bind(this));

    this.manager = this.refs["manager"];

    this.rendition = new Rendition(this.book, {
      flow: this.props.flow || "paginated",
      minSpreadWidth: 550,
      manager: this.manager,
      stylesheet: this.props.stylesheet,
      script: this.props.script
    });

    // Pass marks along
    this.rendition.hooks.content.register(contents => {
      contents.on("markClicked", (cfiRange, data) => this.rendition.emit("markClicked", cfiRange, data, contents));
    });

    if (this.props.onSelected) {
      this.rendition.on("selected", (cfiRange, contents) => {
        this.props.onSelected(cfiRange, contents);
      });
    }

    if (this.props.onMarkClicked) {
      this.rendition.on("markClicked", (cfiRange, data, contents) => {
        this.props.onMarkClicked(cfiRange, data, contents);
      });
    }

    if (this.props.onViewAdded) {
      this.rendition.manager.on("added", view => {
        this.props.onViewAdded(view, view.contents);
      });
    }

    if (this.props.beforeViewRemoved) {
      this.rendition.manager.on("hidden", view => {
        this.props.beforeViewRemoved(view, view.contents);
      });
    }

    // this.rendition.setManager(this.manager);

    if (this.props.themes) {
      this.rendition.themes.register(this.props.themes);
    }

    if (this.props.theme) {
      this.rendition.themes.apply(this.props.theme);
    }

    if (this.props.fontSize) {
      this.rendition.themes.fontSize(this.props.fontSize);
    }

    this.rendition.display(this.props.location || 0).then(() => {
      if (this.props.generateLocations != false) {
        requestAnimationFrame(() => this.loadLocations());
      }
    });
    // Disable Scrollbar for Android
    /*
    this.rendition.hooks.content.register((contents) => {
      contents.addStylesheetRules([
        ["html",
          ["position", "fixed"],
          ["overflow", "hidden"],
          ["height", "100%"],
          ["width", "100%"]
        ]
      ]);
    });
    */

    this.rendition.on("locationChanged", visibleLocation => {

      this._visibleLocation = visibleLocation;

      if (this.props.onLocationChange) {
        this.props.onLocationChange(visibleLocation);
      }
    });

    this.book.ready.then(() => {
      this.setState({ show: true });

      this.props.onReady && this.props.onReady(this.book);
    });

    this.book.loaded.navigation.then(nav => {
      this.setState({ toc: nav.toc });
      this.props.onNavigationReady && this.props.onNavigationReady(nav.toc);
    });
  }

  loadLocations() {
    this.book.ready.then(() => {
      // Load in stored locations from json or local storage
      var key = this.book.key() + "-locations";

      return AsyncStorage.getItem(key).then(stored => {
        if (this.props.regenerateLocations != true && stored !== null) {
          return this.book.locations.load(stored);
        } else {
          var locationsTimer = Date.now();
          return this.book.locations.generate(600).then(locations => {
            // __DEV__ && console.log("locations generated", Date.now() - locationsTimer);
            // Save out the generated locations to JSON
            AsyncStorage.setItem(key, this.book.locations.save());
          });
        }
      });
    }).then(() => {
      this.props.onLocationsReady && this.props.onLocationsReady(this.book.locations);
    });
  }

  visibleLocation() {
    return this._visibleLocation;
  }

  getRange(cfi) {
    return this.book.getRange(cfi);
  }

  _onShown(shouldShow) {
    this.setState({ show: shouldShow });
  }

  _handleAppStateChange(appState) {
    if (appState === "active") {
      this.active = true;
    }

    if (appState === "background") {
      this.active = false;
    }

    if (appState === "inactive") {
      this.active = false;
    }
  }

  destroy() {
    if (this.book) {
      this.book.destroy();
    }
  }

  render() {

    var loader;
    if (!this.state.show) {
      loader = <View style={[styles.loadScreen, {
        backgroundColor: this.props.backgroundColor || "#FFFFFF"
      }]}>
          <ActivityIndicator color={this.props.color || "black"} size={this.props.size || "large"} style={{ flex: 1 }} />
        </View>;
    }

    return <View ref="framer" style={styles.container}>
        <EpubViewManager ref="manager" style={[styles.manager, {
        backgroundColor: this.props.backgroundColor || "#FFFFFF"
      }]} flow={this.props.flow || "paginated"} request={this.book && this.book.load.bind(this.book)} onPress={this.props.onPress} onLongPress={this.props.onLongPress} onShow={this._onShown.bind(this)} origin={this.props.origin} backgroundColor={this.props.backgroundColor} lastSectionIndex={this.book && this.book.spine.length - 1} bounds={{ width: this.props.width || this.state.width,
        height: this.props.height || this.state.height }} />
        {loader}
      </View>;
  }
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    flexDirection: "column"
  },
  manager: {
    flex: 1
  },
  scrollContainer: {
    flex: 1,
    marginTop: 0,
    flexDirection: "row",
    flexWrap: "nowrap",
    backgroundColor: "#F8F8F8"
  },
  rowContainer: {
    flex: 1
  },
  loadScreen: {
    position: "absolute",
    top: 0,
    bottom: 0,
    left: 0,
    right: 0,
    backgroundColor: "#fff",
    justifyContent: "center",
    alignItems: "center"
  }
});

module.exports = Epub;