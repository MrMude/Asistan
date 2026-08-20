(function(){const e=document.createElement("link").relList;if(e&&e.supports&&e.supports("modulepreload"))return;for(const i of document.querySelectorAll('link[rel="modulepreload"]'))r(i);new MutationObserver(i=>{for(const s of i)if(s.type==="childList")for(const o of s.addedNodes)o.tagName==="LINK"&&o.rel==="modulepreload"&&r(o)}).observe(document,{childList:!0,subtree:!0});function n(i){const s={};return i.integrity&&(s.integrity=i.integrity),i.referrerPolicy&&(s.referrerPolicy=i.referrerPolicy),i.crossOrigin==="use-credentials"?s.credentials="include":i.crossOrigin==="anonymous"?s.credentials="omit":s.credentials="same-origin",s}function r(i){if(i.ep)return;i.ep=!0;const s=n(i);fetch(i.href,s)}})();var jg={exports:{}},Pl={},Ug={exports:{}},re={};/**
 * @license React
 * react.production.min.js
 *
 * Copyright (c) Facebook, Inc. and its affiliates.
 *
 * This source code is licensed under the MIT license found in the
 * LICENSE file in the root directory of this source tree.
 */var mo=Symbol.for("react.element"),$w=Symbol.for("react.portal"),Ww=Symbol.for("react.fragment"),Hw=Symbol.for("react.strict_mode"),qw=Symbol.for("react.profiler"),Kw=Symbol.for("react.provider"),Gw=Symbol.for("react.context"),Qw=Symbol.for("react.forward_ref"),Yw=Symbol.for("react.suspense"),Xw=Symbol.for("react.memo"),Jw=Symbol.for("react.lazy"),vp=Symbol.iterator;function Zw(t){return t===null||typeof t!="object"?null:(t=vp&&t[vp]||t["@@iterator"],typeof t=="function"?t:null)}var Bg={isMounted:function(){return!1},enqueueForceUpdate:function(){},enqueueReplaceState:function(){},enqueueSetState:function(){}},zg=Object.assign,$g={};function Bi(t,e,n){this.props=t,this.context=e,this.refs=$g,this.updater=n||Bg}Bi.prototype.isReactComponent={};Bi.prototype.setState=function(t,e){if(typeof t!="object"&&typeof t!="function"&&t!=null)throw Error("setState(...): takes an object of state variables to update or a function which returns an object of state variables.");this.updater.enqueueSetState(this,t,e,"setState")};Bi.prototype.forceUpdate=function(t){this.updater.enqueueForceUpdate(this,t,"forceUpdate")};function Wg(){}Wg.prototype=Bi.prototype;function Vh(t,e,n){this.props=t,this.context=e,this.refs=$g,this.updater=n||Bg}var bh=Vh.prototype=new Wg;bh.constructor=Vh;zg(bh,Bi.prototype);bh.isPureReactComponent=!0;var _p=Array.isArray,Hg=Object.prototype.hasOwnProperty,Oh={current:null},qg={key:!0,ref:!0,__self:!0,__source:!0};function Kg(t,e,n){var r,i={},s=null,o=null;if(e!=null)for(r in e.ref!==void 0&&(o=e.ref),e.key!==void 0&&(s=""+e.key),e)Hg.call(e,r)&&!qg.hasOwnProperty(r)&&(i[r]=e[r]);var l=arguments.length-2;if(l===1)i.children=n;else if(1<l){for(var u=Array(l),h=0;h<l;h++)u[h]=arguments[h+2];i.children=u}if(t&&t.defaultProps)for(r in l=t.defaultProps,l)i[r]===void 0&&(i[r]=l[r]);return{$$typeof:mo,type:t,key:s,ref:o,props:i,_owner:Oh.current}}function eE(t,e){return{$$typeof:mo,type:t.type,key:e,ref:t.ref,props:t.props,_owner:t._owner}}function Lh(t){return typeof t=="object"&&t!==null&&t.$$typeof===mo}function tE(t){var e={"=":"=0",":":"=2"};return"$"+t.replace(/[=:]/g,function(n){return e[n]})}var wp=/\/+/g;function Pu(t,e){return typeof t=="object"&&t!==null&&t.key!=null?tE(""+t.key):e.toString(36)}function wa(t,e,n,r,i){var s=typeof t;(s==="undefined"||s==="boolean")&&(t=null);var o=!1;if(t===null)o=!0;else switch(s){case"string":case"number":o=!0;break;case"object":switch(t.$$typeof){case mo:case $w:o=!0}}if(o)return o=t,i=i(o),t=r===""?"."+Pu(o,0):r,_p(i)?(n="",t!=null&&(n=t.replace(wp,"$&/")+"/"),wa(i,e,n,"",function(h){return h})):i!=null&&(Lh(i)&&(i=eE(i,n+(!i.key||o&&o.key===i.key?"":(""+i.key).replace(wp,"$&/")+"/")+t)),e.push(i)),1;if(o=0,r=r===""?".":r+":",_p(t))for(var l=0;l<t.length;l++){s=t[l];var u=r+Pu(s,l);o+=wa(s,e,n,u,i)}else if(u=Zw(t),typeof u=="function")for(t=u.call(t),l=0;!(s=t.next()).done;)s=s.value,u=r+Pu(s,l++),o+=wa(s,e,n,u,i);else if(s==="object")throw e=String(t),Error("Objects are not valid as a React child (found: "+(e==="[object Object]"?"object with keys {"+Object.keys(t).join(", ")+"}":e)+"). If you meant to render a collection of children, use an array instead.");return o}function Yo(t,e,n){if(t==null)return t;var r=[],i=0;return wa(t,r,"","",function(s){return e.call(n,s,i++)}),r}function nE(t){if(t._status===-1){var e=t._result;e=e(),e.then(function(n){(t._status===0||t._status===-1)&&(t._status=1,t._result=n)},function(n){(t._status===0||t._status===-1)&&(t._status=2,t._result=n)}),t._status===-1&&(t._status=0,t._result=e)}if(t._status===1)return t._result.default;throw t._result}var dt={current:null},Ea={transition:null},rE={ReactCurrentDispatcher:dt,ReactCurrentBatchConfig:Ea,ReactCurrentOwner:Oh};function Gg(){throw Error("act(...) is not supported in production builds of React.")}re.Children={map:Yo,forEach:function(t,e,n){Yo(t,function(){e.apply(this,arguments)},n)},count:function(t){var e=0;return Yo(t,function(){e++}),e},toArray:function(t){return Yo(t,function(e){return e})||[]},only:function(t){if(!Lh(t))throw Error("React.Children.only expected to receive a single React element child.");return t}};re.Component=Bi;re.Fragment=Ww;re.Profiler=qw;re.PureComponent=Vh;re.StrictMode=Hw;re.Suspense=Yw;re.__SECRET_INTERNALS_DO_NOT_USE_OR_YOU_WILL_BE_FIRED=rE;re.act=Gg;re.cloneElement=function(t,e,n){if(t==null)throw Error("React.cloneElement(...): The argument must be a React element, but you passed "+t+".");var r=zg({},t.props),i=t.key,s=t.ref,o=t._owner;if(e!=null){if(e.ref!==void 0&&(s=e.ref,o=Oh.current),e.key!==void 0&&(i=""+e.key),t.type&&t.type.defaultProps)var l=t.type.defaultProps;for(u in e)Hg.call(e,u)&&!qg.hasOwnProperty(u)&&(r[u]=e[u]===void 0&&l!==void 0?l[u]:e[u])}var u=arguments.length-2;if(u===1)r.children=n;else if(1<u){l=Array(u);for(var h=0;h<u;h++)l[h]=arguments[h+2];r.children=l}return{$$typeof:mo,type:t.type,key:i,ref:s,props:r,_owner:o}};re.createContext=function(t){return t={$$typeof:Gw,_currentValue:t,_currentValue2:t,_threadCount:0,Provider:null,Consumer:null,_defaultValue:null,_globalName:null},t.Provider={$$typeof:Kw,_context:t},t.Consumer=t};re.createElement=Kg;re.createFactory=function(t){var e=Kg.bind(null,t);return e.type=t,e};re.createRef=function(){return{current:null}};re.forwardRef=function(t){return{$$typeof:Qw,render:t}};re.isValidElement=Lh;re.lazy=function(t){return{$$typeof:Jw,_payload:{_status:-1,_result:t},_init:nE}};re.memo=function(t,e){return{$$typeof:Xw,type:t,compare:e===void 0?null:e}};re.startTransition=function(t){var e=Ea.transition;Ea.transition={};try{t()}finally{Ea.transition=e}};re.unstable_act=Gg;re.useCallback=function(t,e){return dt.current.useCallback(t,e)};re.useContext=function(t){return dt.current.useContext(t)};re.useDebugValue=function(){};re.useDeferredValue=function(t){return dt.current.useDeferredValue(t)};re.useEffect=function(t,e){return dt.current.useEffect(t,e)};re.useId=function(){return dt.current.useId()};re.useImperativeHandle=function(t,e,n){return dt.current.useImperativeHandle(t,e,n)};re.useInsertionEffect=function(t,e){return dt.current.useInsertionEffect(t,e)};re.useLayoutEffect=function(t,e){return dt.current.useLayoutEffect(t,e)};re.useMemo=function(t,e){return dt.current.useMemo(t,e)};re.useReducer=function(t,e,n){return dt.current.useReducer(t,e,n)};re.useRef=function(t){return dt.current.useRef(t)};re.useState=function(t){return dt.current.useState(t)};re.useSyncExternalStore=function(t,e,n){return dt.current.useSyncExternalStore(t,e,n)};re.useTransition=function(){return dt.current.useTransition()};re.version="18.3.1";Ug.exports=re;var Q=Ug.exports;/**
 * @license React
 * react-jsx-runtime.production.min.js
 *
 * Copyright (c) Facebook, Inc. and its affiliates.
 *
 * This source code is licensed under the MIT license found in the
 * LICENSE file in the root directory of this source tree.
 */var iE=Q,sE=Symbol.for("react.element"),oE=Symbol.for("react.fragment"),aE=Object.prototype.hasOwnProperty,lE=iE.__SECRET_INTERNALS_DO_NOT_USE_OR_YOU_WILL_BE_FIRED.ReactCurrentOwner,uE={key:!0,ref:!0,__self:!0,__source:!0};function Qg(t,e,n){var r,i={},s=null,o=null;n!==void 0&&(s=""+n),e.key!==void 0&&(s=""+e.key),e.ref!==void 0&&(o=e.ref);for(r in e)aE.call(e,r)&&!uE.hasOwnProperty(r)&&(i[r]=e[r]);if(t&&t.defaultProps)for(r in e=t.defaultProps,e)i[r]===void 0&&(i[r]=e[r]);return{$$typeof:sE,type:t,key:s,ref:o,props:i,_owner:lE.current}}Pl.Fragment=oE;Pl.jsx=Qg;Pl.jsxs=Qg;jg.exports=Pl;var p=jg.exports,Yg={exports:{}},Ct={},Xg={exports:{}},Jg={};/**
 * @license React
 * scheduler.production.min.js
 *
 * Copyright (c) Facebook, Inc. and its affiliates.
 *
 * This source code is licensed under the MIT license found in the
 * LICENSE file in the root directory of this source tree.
 */(function(t){function e($,Y){var G=$.length;$.push(Y);e:for(;0<G;){var he=G-1>>>1,de=$[he];if(0<i(de,Y))$[he]=Y,$[G]=de,G=he;else break e}}function n($){return $.length===0?null:$[0]}function r($){if($.length===0)return null;var Y=$[0],G=$.pop();if(G!==Y){$[0]=G;e:for(var he=0,de=$.length,we=de>>>1;he<we;){var xt=2*(he+1)-1,j=$[xt],te=xt+1,ne=$[te];if(0>i(j,G))te<de&&0>i(ne,j)?($[he]=ne,$[te]=G,he=te):($[he]=j,$[xt]=G,he=xt);else if(te<de&&0>i(ne,G))$[he]=ne,$[te]=G,he=te;else break e}}return Y}function i($,Y){var G=$.sortIndex-Y.sortIndex;return G!==0?G:$.id-Y.id}if(typeof performance=="object"&&typeof performance.now=="function"){var s=performance;t.unstable_now=function(){return s.now()}}else{var o=Date,l=o.now();t.unstable_now=function(){return o.now()-l}}var u=[],h=[],f=1,g=null,v=3,R=!1,N=!1,D=!1,V=typeof setTimeout=="function"?setTimeout:null,S=typeof clearTimeout=="function"?clearTimeout:null,_=typeof setImmediate<"u"?setImmediate:null;typeof navigator<"u"&&navigator.scheduling!==void 0&&navigator.scheduling.isInputPending!==void 0&&navigator.scheduling.isInputPending.bind(navigator.scheduling);function k($){for(var Y=n(h);Y!==null;){if(Y.callback===null)r(h);else if(Y.startTime<=$)r(h),Y.sortIndex=Y.expirationTime,e(u,Y);else break;Y=n(h)}}function O($){if(D=!1,k($),!N)if(n(u)!==null)N=!0,gr(U);else{var Y=n(h);Y!==null&&Pt(O,Y.startTime-$)}}function U($,Y){N=!1,D&&(D=!1,S(y),y=-1),R=!0;var G=v;try{for(k(Y),g=n(u);g!==null&&(!(g.expirationTime>Y)||$&&!A());){var he=g.callback;if(typeof he=="function"){g.callback=null,v=g.priorityLevel;var de=he(g.expirationTime<=Y);Y=t.unstable_now(),typeof de=="function"?g.callback=de:g===n(u)&&r(u),k(Y)}else r(u);g=n(u)}if(g!==null)var we=!0;else{var xt=n(h);xt!==null&&Pt(O,xt.startTime-Y),we=!1}return we}finally{g=null,v=G,R=!1}}var B=!1,E=null,y=-1,w=5,I=-1;function A(){return!(t.unstable_now()-I<w)}function P(){if(E!==null){var $=t.unstable_now();I=$;var Y=!0;try{Y=E(!0,$)}finally{Y?T():(B=!1,E=null)}}else B=!1}var T;if(typeof _=="function")T=function(){_(P)};else if(typeof MessageChannel<"u"){var pt=new MessageChannel,Kt=pt.port2;pt.port1.onmessage=P,T=function(){Kt.postMessage(null)}}else T=function(){V(P,0)};function gr($){E=$,B||(B=!0,T())}function Pt($,Y){y=V(function(){$(t.unstable_now())},Y)}t.unstable_IdlePriority=5,t.unstable_ImmediatePriority=1,t.unstable_LowPriority=4,t.unstable_NormalPriority=3,t.unstable_Profiling=null,t.unstable_UserBlockingPriority=2,t.unstable_cancelCallback=function($){$.callback=null},t.unstable_continueExecution=function(){N||R||(N=!0,gr(U))},t.unstable_forceFrameRate=function($){0>$||125<$?console.error("forceFrameRate takes a positive int between 0 and 125, forcing frame rates higher than 125 fps is not supported"):w=0<$?Math.floor(1e3/$):5},t.unstable_getCurrentPriorityLevel=function(){return v},t.unstable_getFirstCallbackNode=function(){return n(u)},t.unstable_next=function($){switch(v){case 1:case 2:case 3:var Y=3;break;default:Y=v}var G=v;v=Y;try{return $()}finally{v=G}},t.unstable_pauseExecution=function(){},t.unstable_requestPaint=function(){},t.unstable_runWithPriority=function($,Y){switch($){case 1:case 2:case 3:case 4:case 5:break;default:$=3}var G=v;v=$;try{return Y()}finally{v=G}},t.unstable_scheduleCallback=function($,Y,G){var he=t.unstable_now();switch(typeof G=="object"&&G!==null?(G=G.delay,G=typeof G=="number"&&0<G?he+G:he):G=he,$){case 1:var de=-1;break;case 2:de=250;break;case 5:de=1073741823;break;case 4:de=1e4;break;default:de=5e3}return de=G+de,$={id:f++,callback:Y,priorityLevel:$,startTime:G,expirationTime:de,sortIndex:-1},G>he?($.sortIndex=G,e(h,$),n(u)===null&&$===n(h)&&(D?(S(y),y=-1):D=!0,Pt(O,G-he))):($.sortIndex=de,e(u,$),N||R||(N=!0,gr(U))),$},t.unstable_shouldYield=A,t.unstable_wrapCallback=function($){var Y=v;return function(){var G=v;v=Y;try{return $.apply(this,arguments)}finally{v=G}}}})(Jg);Xg.exports=Jg;var cE=Xg.exports;/**
 * @license React
 * react-dom.production.min.js
 *
 * Copyright (c) Facebook, Inc. and its affiliates.
 *
 * This source code is licensed under the MIT license found in the
 * LICENSE file in the root directory of this source tree.
 */var hE=Q,kt=cE;function F(t){for(var e="https://reactjs.org/docs/error-decoder.html?invariant="+t,n=1;n<arguments.length;n++)e+="&args[]="+encodeURIComponent(arguments[n]);return"Minified React error #"+t+"; visit "+e+" for the full message or use the non-minified dev environment for full errors and additional helpful warnings."}var Zg=new Set,zs={};function Wr(t,e){ki(t,e),ki(t+"Capture",e)}function ki(t,e){for(zs[t]=e,t=0;t<e.length;t++)Zg.add(e[t])}var En=!(typeof window>"u"||typeof window.document>"u"||typeof window.document.createElement>"u"),_c=Object.prototype.hasOwnProperty,dE=/^[:A-Z_a-z\u00C0-\u00D6\u00D8-\u00F6\u00F8-\u02FF\u0370-\u037D\u037F-\u1FFF\u200C-\u200D\u2070-\u218F\u2C00-\u2FEF\u3001-\uD7FF\uF900-\uFDCF\uFDF0-\uFFFD][:A-Z_a-z\u00C0-\u00D6\u00D8-\u00F6\u00F8-\u02FF\u0370-\u037D\u037F-\u1FFF\u200C-\u200D\u2070-\u218F\u2C00-\u2FEF\u3001-\uD7FF\uF900-\uFDCF\uFDF0-\uFFFD\-.0-9\u00B7\u0300-\u036F\u203F-\u2040]*$/,Ep={},Tp={};function fE(t){return _c.call(Tp,t)?!0:_c.call(Ep,t)?!1:dE.test(t)?Tp[t]=!0:(Ep[t]=!0,!1)}function pE(t,e,n,r){if(n!==null&&n.type===0)return!1;switch(typeof e){case"function":case"symbol":return!0;case"boolean":return r?!1:n!==null?!n.acceptsBooleans:(t=t.toLowerCase().slice(0,5),t!=="data-"&&t!=="aria-");default:return!1}}function mE(t,e,n,r){if(e===null||typeof e>"u"||pE(t,e,n,r))return!0;if(r)return!1;if(n!==null)switch(n.type){case 3:return!e;case 4:return e===!1;case 5:return isNaN(e);case 6:return isNaN(e)||1>e}return!1}function ft(t,e,n,r,i,s,o){this.acceptsBooleans=e===2||e===3||e===4,this.attributeName=r,this.attributeNamespace=i,this.mustUseProperty=n,this.propertyName=t,this.type=e,this.sanitizeURL=s,this.removeEmptyString=o}var Ge={};"children dangerouslySetInnerHTML defaultValue defaultChecked innerHTML suppressContentEditableWarning suppressHydrationWarning style".split(" ").forEach(function(t){Ge[t]=new ft(t,0,!1,t,null,!1,!1)});[["acceptCharset","accept-charset"],["className","class"],["htmlFor","for"],["httpEquiv","http-equiv"]].forEach(function(t){var e=t[0];Ge[e]=new ft(e,1,!1,t[1],null,!1,!1)});["contentEditable","draggable","spellCheck","value"].forEach(function(t){Ge[t]=new ft(t,2,!1,t.toLowerCase(),null,!1,!1)});["autoReverse","externalResourcesRequired","focusable","preserveAlpha"].forEach(function(t){Ge[t]=new ft(t,2,!1,t,null,!1,!1)});"allowFullScreen async autoFocus autoPlay controls default defer disabled disablePictureInPicture disableRemotePlayback formNoValidate hidden loop noModule noValidate open playsInline readOnly required reversed scoped seamless itemScope".split(" ").forEach(function(t){Ge[t]=new ft(t,3,!1,t.toLowerCase(),null,!1,!1)});["checked","multiple","muted","selected"].forEach(function(t){Ge[t]=new ft(t,3,!0,t,null,!1,!1)});["capture","download"].forEach(function(t){Ge[t]=new ft(t,4,!1,t,null,!1,!1)});["cols","rows","size","span"].forEach(function(t){Ge[t]=new ft(t,6,!1,t,null,!1,!1)});["rowSpan","start"].forEach(function(t){Ge[t]=new ft(t,5,!1,t.toLowerCase(),null,!1,!1)});var Mh=/[\-:]([a-z])/g;function Fh(t){return t[1].toUpperCase()}"accent-height alignment-baseline arabic-form baseline-shift cap-height clip-path clip-rule color-interpolation color-interpolation-filters color-profile color-rendering dominant-baseline enable-background fill-opacity fill-rule flood-color flood-opacity font-family font-size font-size-adjust font-stretch font-style font-variant font-weight glyph-name glyph-orientation-horizontal glyph-orientation-vertical horiz-adv-x horiz-origin-x image-rendering letter-spacing lighting-color marker-end marker-mid marker-start overline-position overline-thickness paint-order panose-1 pointer-events rendering-intent shape-rendering stop-color stop-opacity strikethrough-position strikethrough-thickness stroke-dasharray stroke-dashoffset stroke-linecap stroke-linejoin stroke-miterlimit stroke-opacity stroke-width text-anchor text-decoration text-rendering underline-position underline-thickness unicode-bidi unicode-range units-per-em v-alphabetic v-hanging v-ideographic v-mathematical vector-effect vert-adv-y vert-origin-x vert-origin-y word-spacing writing-mode xmlns:xlink x-height".split(" ").forEach(function(t){var e=t.replace(Mh,Fh);Ge[e]=new ft(e,1,!1,t,null,!1,!1)});"xlink:actuate xlink:arcrole xlink:role xlink:show xlink:title xlink:type".split(" ").forEach(function(t){var e=t.replace(Mh,Fh);Ge[e]=new ft(e,1,!1,t,"http://www.w3.org/1999/xlink",!1,!1)});["xml:base","xml:lang","xml:space"].forEach(function(t){var e=t.replace(Mh,Fh);Ge[e]=new ft(e,1,!1,t,"http://www.w3.org/XML/1998/namespace",!1,!1)});["tabIndex","crossOrigin"].forEach(function(t){Ge[t]=new ft(t,1,!1,t.toLowerCase(),null,!1,!1)});Ge.xlinkHref=new ft("xlinkHref",1,!1,"xlink:href","http://www.w3.org/1999/xlink",!0,!1);["src","href","action","formAction"].forEach(function(t){Ge[t]=new ft(t,1,!1,t.toLowerCase(),null,!0,!0)});function jh(t,e,n,r){var i=Ge.hasOwnProperty(e)?Ge[e]:null;(i!==null?i.type!==0:r||!(2<e.length)||e[0]!=="o"&&e[0]!=="O"||e[1]!=="n"&&e[1]!=="N")&&(mE(e,n,i,r)&&(n=null),r||i===null?fE(e)&&(n===null?t.removeAttribute(e):t.setAttribute(e,""+n)):i.mustUseProperty?t[i.propertyName]=n===null?i.type===3?!1:"":n:(e=i.attributeName,r=i.attributeNamespace,n===null?t.removeAttribute(e):(i=i.type,n=i===3||i===4&&n===!0?"":""+n,r?t.setAttributeNS(r,e,n):t.setAttribute(e,n))))}var Nn=hE.__SECRET_INTERNALS_DO_NOT_USE_OR_YOU_WILL_BE_FIRED,Xo=Symbol.for("react.element"),ni=Symbol.for("react.portal"),ri=Symbol.for("react.fragment"),Uh=Symbol.for("react.strict_mode"),wc=Symbol.for("react.profiler"),ey=Symbol.for("react.provider"),ty=Symbol.for("react.context"),Bh=Symbol.for("react.forward_ref"),Ec=Symbol.for("react.suspense"),Tc=Symbol.for("react.suspense_list"),zh=Symbol.for("react.memo"),jn=Symbol.for("react.lazy"),ny=Symbol.for("react.offscreen"),Ip=Symbol.iterator;function us(t){return t===null||typeof t!="object"?null:(t=Ip&&t[Ip]||t["@@iterator"],typeof t=="function"?t:null)}var Ae=Object.assign,xu;function _s(t){if(xu===void 0)try{throw Error()}catch(n){var e=n.stack.trim().match(/\n( *(at )?)/);xu=e&&e[1]||""}return`
`+xu+t}var Nu=!1;function Du(t,e){if(!t||Nu)return"";Nu=!0;var n=Error.prepareStackTrace;Error.prepareStackTrace=void 0;try{if(e)if(e=function(){throw Error()},Object.defineProperty(e.prototype,"props",{set:function(){throw Error()}}),typeof Reflect=="object"&&Reflect.construct){try{Reflect.construct(e,[])}catch(h){var r=h}Reflect.construct(t,[],e)}else{try{e.call()}catch(h){r=h}t.call(e.prototype)}else{try{throw Error()}catch(h){r=h}t()}}catch(h){if(h&&r&&typeof h.stack=="string"){for(var i=h.stack.split(`
`),s=r.stack.split(`
`),o=i.length-1,l=s.length-1;1<=o&&0<=l&&i[o]!==s[l];)l--;for(;1<=o&&0<=l;o--,l--)if(i[o]!==s[l]){if(o!==1||l!==1)do if(o--,l--,0>l||i[o]!==s[l]){var u=`
`+i[o].replace(" at new "," at ");return t.displayName&&u.includes("<anonymous>")&&(u=u.replace("<anonymous>",t.displayName)),u}while(1<=o&&0<=l);break}}}finally{Nu=!1,Error.prepareStackTrace=n}return(t=t?t.displayName||t.name:"")?_s(t):""}function gE(t){switch(t.tag){case 5:return _s(t.type);case 16:return _s("Lazy");case 13:return _s("Suspense");case 19:return _s("SuspenseList");case 0:case 2:case 15:return t=Du(t.type,!1),t;case 11:return t=Du(t.type.render,!1),t;case 1:return t=Du(t.type,!0),t;default:return""}}function Ic(t){if(t==null)return null;if(typeof t=="function")return t.displayName||t.name||null;if(typeof t=="string")return t;switch(t){case ri:return"Fragment";case ni:return"Portal";case wc:return"Profiler";case Uh:return"StrictMode";case Ec:return"Suspense";case Tc:return"SuspenseList"}if(typeof t=="object")switch(t.$$typeof){case ty:return(t.displayName||"Context")+".Consumer";case ey:return(t._context.displayName||"Context")+".Provider";case Bh:var e=t.render;return t=t.displayName,t||(t=e.displayName||e.name||"",t=t!==""?"ForwardRef("+t+")":"ForwardRef"),t;case zh:return e=t.displayName||null,e!==null?e:Ic(t.type)||"Memo";case jn:e=t._payload,t=t._init;try{return Ic(t(e))}catch{}}return null}function yE(t){var e=t.type;switch(t.tag){case 24:return"Cache";case 9:return(e.displayName||"Context")+".Consumer";case 10:return(e._context.displayName||"Context")+".Provider";case 18:return"DehydratedFragment";case 11:return t=e.render,t=t.displayName||t.name||"",e.displayName||(t!==""?"ForwardRef("+t+")":"ForwardRef");case 7:return"Fragment";case 5:return e;case 4:return"Portal";case 3:return"Root";case 6:return"Text";case 16:return Ic(e);case 8:return e===Uh?"StrictMode":"Mode";case 22:return"Offscreen";case 12:return"Profiler";case 21:return"Scope";case 13:return"Suspense";case 19:return"SuspenseList";case 25:return"TracingMarker";case 1:case 0:case 17:case 2:case 14:case 15:if(typeof e=="function")return e.displayName||e.name||null;if(typeof e=="string")return e}return null}function lr(t){switch(typeof t){case"boolean":case"number":case"string":case"undefined":return t;case"object":return t;default:return""}}function ry(t){var e=t.type;return(t=t.nodeName)&&t.toLowerCase()==="input"&&(e==="checkbox"||e==="radio")}function vE(t){var e=ry(t)?"checked":"value",n=Object.getOwnPropertyDescriptor(t.constructor.prototype,e),r=""+t[e];if(!t.hasOwnProperty(e)&&typeof n<"u"&&typeof n.get=="function"&&typeof n.set=="function"){var i=n.get,s=n.set;return Object.defineProperty(t,e,{configurable:!0,get:function(){return i.call(this)},set:function(o){r=""+o,s.call(this,o)}}),Object.defineProperty(t,e,{enumerable:n.enumerable}),{getValue:function(){return r},setValue:function(o){r=""+o},stopTracking:function(){t._valueTracker=null,delete t[e]}}}}function Jo(t){t._valueTracker||(t._valueTracker=vE(t))}function iy(t){if(!t)return!1;var e=t._valueTracker;if(!e)return!0;var n=e.getValue(),r="";return t&&(r=ry(t)?t.checked?"true":"false":t.value),t=r,t!==n?(e.setValue(t),!0):!1}function za(t){if(t=t||(typeof document<"u"?document:void 0),typeof t>"u")return null;try{return t.activeElement||t.body}catch{return t.body}}function Sc(t,e){var n=e.checked;return Ae({},e,{defaultChecked:void 0,defaultValue:void 0,value:void 0,checked:n??t._wrapperState.initialChecked})}function Sp(t,e){var n=e.defaultValue==null?"":e.defaultValue,r=e.checked!=null?e.checked:e.defaultChecked;n=lr(e.value!=null?e.value:n),t._wrapperState={initialChecked:r,initialValue:n,controlled:e.type==="checkbox"||e.type==="radio"?e.checked!=null:e.value!=null}}function sy(t,e){e=e.checked,e!=null&&jh(t,"checked",e,!1)}function kc(t,e){sy(t,e);var n=lr(e.value),r=e.type;if(n!=null)r==="number"?(n===0&&t.value===""||t.value!=n)&&(t.value=""+n):t.value!==""+n&&(t.value=""+n);else if(r==="submit"||r==="reset"){t.removeAttribute("value");return}e.hasOwnProperty("value")?Ac(t,e.type,n):e.hasOwnProperty("defaultValue")&&Ac(t,e.type,lr(e.defaultValue)),e.checked==null&&e.defaultChecked!=null&&(t.defaultChecked=!!e.defaultChecked)}function kp(t,e,n){if(e.hasOwnProperty("value")||e.hasOwnProperty("defaultValue")){var r=e.type;if(!(r!=="submit"&&r!=="reset"||e.value!==void 0&&e.value!==null))return;e=""+t._wrapperState.initialValue,n||e===t.value||(t.value=e),t.defaultValue=e}n=t.name,n!==""&&(t.name=""),t.defaultChecked=!!t._wrapperState.initialChecked,n!==""&&(t.name=n)}function Ac(t,e,n){(e!=="number"||za(t.ownerDocument)!==t)&&(n==null?t.defaultValue=""+t._wrapperState.initialValue:t.defaultValue!==""+n&&(t.defaultValue=""+n))}var ws=Array.isArray;function mi(t,e,n,r){if(t=t.options,e){e={};for(var i=0;i<n.length;i++)e["$"+n[i]]=!0;for(n=0;n<t.length;n++)i=e.hasOwnProperty("$"+t[n].value),t[n].selected!==i&&(t[n].selected=i),i&&r&&(t[n].defaultSelected=!0)}else{for(n=""+lr(n),e=null,i=0;i<t.length;i++){if(t[i].value===n){t[i].selected=!0,r&&(t[i].defaultSelected=!0);return}e!==null||t[i].disabled||(e=t[i])}e!==null&&(e.selected=!0)}}function Cc(t,e){if(e.dangerouslySetInnerHTML!=null)throw Error(F(91));return Ae({},e,{value:void 0,defaultValue:void 0,children:""+t._wrapperState.initialValue})}function Ap(t,e){var n=e.value;if(n==null){if(n=e.children,e=e.defaultValue,n!=null){if(e!=null)throw Error(F(92));if(ws(n)){if(1<n.length)throw Error(F(93));n=n[0]}e=n}e==null&&(e=""),n=e}t._wrapperState={initialValue:lr(n)}}function oy(t,e){var n=lr(e.value),r=lr(e.defaultValue);n!=null&&(n=""+n,n!==t.value&&(t.value=n),e.defaultValue==null&&t.defaultValue!==n&&(t.defaultValue=n)),r!=null&&(t.defaultValue=""+r)}function Cp(t){var e=t.textContent;e===t._wrapperState.initialValue&&e!==""&&e!==null&&(t.value=e)}function ay(t){switch(t){case"svg":return"http://www.w3.org/2000/svg";case"math":return"http://www.w3.org/1998/Math/MathML";default:return"http://www.w3.org/1999/xhtml"}}function Rc(t,e){return t==null||t==="http://www.w3.org/1999/xhtml"?ay(e):t==="http://www.w3.org/2000/svg"&&e==="foreignObject"?"http://www.w3.org/1999/xhtml":t}var Zo,ly=function(t){return typeof MSApp<"u"&&MSApp.execUnsafeLocalFunction?function(e,n,r,i){MSApp.execUnsafeLocalFunction(function(){return t(e,n,r,i)})}:t}(function(t,e){if(t.namespaceURI!=="http://www.w3.org/2000/svg"||"innerHTML"in t)t.innerHTML=e;else{for(Zo=Zo||document.createElement("div"),Zo.innerHTML="<svg>"+e.valueOf().toString()+"</svg>",e=Zo.firstChild;t.firstChild;)t.removeChild(t.firstChild);for(;e.firstChild;)t.appendChild(e.firstChild)}});function $s(t,e){if(e){var n=t.firstChild;if(n&&n===t.lastChild&&n.nodeType===3){n.nodeValue=e;return}}t.textContent=e}var Rs={animationIterationCount:!0,aspectRatio:!0,borderImageOutset:!0,borderImageSlice:!0,borderImageWidth:!0,boxFlex:!0,boxFlexGroup:!0,boxOrdinalGroup:!0,columnCount:!0,columns:!0,flex:!0,flexGrow:!0,flexPositive:!0,flexShrink:!0,flexNegative:!0,flexOrder:!0,gridArea:!0,gridRow:!0,gridRowEnd:!0,gridRowSpan:!0,gridRowStart:!0,gridColumn:!0,gridColumnEnd:!0,gridColumnSpan:!0,gridColumnStart:!0,fontWeight:!0,lineClamp:!0,lineHeight:!0,opacity:!0,order:!0,orphans:!0,tabSize:!0,widows:!0,zIndex:!0,zoom:!0,fillOpacity:!0,floodOpacity:!0,stopOpacity:!0,strokeDasharray:!0,strokeDashoffset:!0,strokeMiterlimit:!0,strokeOpacity:!0,strokeWidth:!0},_E=["Webkit","ms","Moz","O"];Object.keys(Rs).forEach(function(t){_E.forEach(function(e){e=e+t.charAt(0).toUpperCase()+t.substring(1),Rs[e]=Rs[t]})});function uy(t,e,n){return e==null||typeof e=="boolean"||e===""?"":n||typeof e!="number"||e===0||Rs.hasOwnProperty(t)&&Rs[t]?(""+e).trim():e+"px"}function cy(t,e){t=t.style;for(var n in e)if(e.hasOwnProperty(n)){var r=n.indexOf("--")===0,i=uy(n,e[n],r);n==="float"&&(n="cssFloat"),r?t.setProperty(n,i):t[n]=i}}var wE=Ae({menuitem:!0},{area:!0,base:!0,br:!0,col:!0,embed:!0,hr:!0,img:!0,input:!0,keygen:!0,link:!0,meta:!0,param:!0,source:!0,track:!0,wbr:!0});function Pc(t,e){if(e){if(wE[t]&&(e.children!=null||e.dangerouslySetInnerHTML!=null))throw Error(F(137,t));if(e.dangerouslySetInnerHTML!=null){if(e.children!=null)throw Error(F(60));if(typeof e.dangerouslySetInnerHTML!="object"||!("__html"in e.dangerouslySetInnerHTML))throw Error(F(61))}if(e.style!=null&&typeof e.style!="object")throw Error(F(62))}}function xc(t,e){if(t.indexOf("-")===-1)return typeof e.is=="string";switch(t){case"annotation-xml":case"color-profile":case"font-face":case"font-face-src":case"font-face-uri":case"font-face-format":case"font-face-name":case"missing-glyph":return!1;default:return!0}}var Nc=null;function $h(t){return t=t.target||t.srcElement||window,t.correspondingUseElement&&(t=t.correspondingUseElement),t.nodeType===3?t.parentNode:t}var Dc=null,gi=null,yi=null;function Rp(t){if(t=vo(t)){if(typeof Dc!="function")throw Error(F(280));var e=t.stateNode;e&&(e=bl(e),Dc(t.stateNode,t.type,e))}}function hy(t){gi?yi?yi.push(t):yi=[t]:gi=t}function dy(){if(gi){var t=gi,e=yi;if(yi=gi=null,Rp(t),e)for(t=0;t<e.length;t++)Rp(e[t])}}function fy(t,e){return t(e)}function py(){}var Vu=!1;function my(t,e,n){if(Vu)return t(e,n);Vu=!0;try{return fy(t,e,n)}finally{Vu=!1,(gi!==null||yi!==null)&&(py(),dy())}}function Ws(t,e){var n=t.stateNode;if(n===null)return null;var r=bl(n);if(r===null)return null;n=r[e];e:switch(e){case"onClick":case"onClickCapture":case"onDoubleClick":case"onDoubleClickCapture":case"onMouseDown":case"onMouseDownCapture":case"onMouseMove":case"onMouseMoveCapture":case"onMouseUp":case"onMouseUpCapture":case"onMouseEnter":(r=!r.disabled)||(t=t.type,r=!(t==="button"||t==="input"||t==="select"||t==="textarea")),t=!r;break e;default:t=!1}if(t)return null;if(n&&typeof n!="function")throw Error(F(231,e,typeof n));return n}var Vc=!1;if(En)try{var cs={};Object.defineProperty(cs,"passive",{get:function(){Vc=!0}}),window.addEventListener("test",cs,cs),window.removeEventListener("test",cs,cs)}catch{Vc=!1}function EE(t,e,n,r,i,s,o,l,u){var h=Array.prototype.slice.call(arguments,3);try{e.apply(n,h)}catch(f){this.onError(f)}}var Ps=!1,$a=null,Wa=!1,bc=null,TE={onError:function(t){Ps=!0,$a=t}};function IE(t,e,n,r,i,s,o,l,u){Ps=!1,$a=null,EE.apply(TE,arguments)}function SE(t,e,n,r,i,s,o,l,u){if(IE.apply(this,arguments),Ps){if(Ps){var h=$a;Ps=!1,$a=null}else throw Error(F(198));Wa||(Wa=!0,bc=h)}}function Hr(t){var e=t,n=t;if(t.alternate)for(;e.return;)e=e.return;else{t=e;do e=t,e.flags&4098&&(n=e.return),t=e.return;while(t)}return e.tag===3?n:null}function gy(t){if(t.tag===13){var e=t.memoizedState;if(e===null&&(t=t.alternate,t!==null&&(e=t.memoizedState)),e!==null)return e.dehydrated}return null}function Pp(t){if(Hr(t)!==t)throw Error(F(188))}function kE(t){var e=t.alternate;if(!e){if(e=Hr(t),e===null)throw Error(F(188));return e!==t?null:t}for(var n=t,r=e;;){var i=n.return;if(i===null)break;var s=i.alternate;if(s===null){if(r=i.return,r!==null){n=r;continue}break}if(i.child===s.child){for(s=i.child;s;){if(s===n)return Pp(i),t;if(s===r)return Pp(i),e;s=s.sibling}throw Error(F(188))}if(n.return!==r.return)n=i,r=s;else{for(var o=!1,l=i.child;l;){if(l===n){o=!0,n=i,r=s;break}if(l===r){o=!0,r=i,n=s;break}l=l.sibling}if(!o){for(l=s.child;l;){if(l===n){o=!0,n=s,r=i;break}if(l===r){o=!0,r=s,n=i;break}l=l.sibling}if(!o)throw Error(F(189))}}if(n.alternate!==r)throw Error(F(190))}if(n.tag!==3)throw Error(F(188));return n.stateNode.current===n?t:e}function yy(t){return t=kE(t),t!==null?vy(t):null}function vy(t){if(t.tag===5||t.tag===6)return t;for(t=t.child;t!==null;){var e=vy(t);if(e!==null)return e;t=t.sibling}return null}var _y=kt.unstable_scheduleCallback,xp=kt.unstable_cancelCallback,AE=kt.unstable_shouldYield,CE=kt.unstable_requestPaint,Ne=kt.unstable_now,RE=kt.unstable_getCurrentPriorityLevel,Wh=kt.unstable_ImmediatePriority,wy=kt.unstable_UserBlockingPriority,Ha=kt.unstable_NormalPriority,PE=kt.unstable_LowPriority,Ey=kt.unstable_IdlePriority,xl=null,Zt=null;function xE(t){if(Zt&&typeof Zt.onCommitFiberRoot=="function")try{Zt.onCommitFiberRoot(xl,t,void 0,(t.current.flags&128)===128)}catch{}}var Wt=Math.clz32?Math.clz32:VE,NE=Math.log,DE=Math.LN2;function VE(t){return t>>>=0,t===0?32:31-(NE(t)/DE|0)|0}var ea=64,ta=4194304;function Es(t){switch(t&-t){case 1:return 1;case 2:return 2;case 4:return 4;case 8:return 8;case 16:return 16;case 32:return 32;case 64:case 128:case 256:case 512:case 1024:case 2048:case 4096:case 8192:case 16384:case 32768:case 65536:case 131072:case 262144:case 524288:case 1048576:case 2097152:return t&4194240;case 4194304:case 8388608:case 16777216:case 33554432:case 67108864:return t&130023424;case 134217728:return 134217728;case 268435456:return 268435456;case 536870912:return 536870912;case 1073741824:return 1073741824;default:return t}}function qa(t,e){var n=t.pendingLanes;if(n===0)return 0;var r=0,i=t.suspendedLanes,s=t.pingedLanes,o=n&268435455;if(o!==0){var l=o&~i;l!==0?r=Es(l):(s&=o,s!==0&&(r=Es(s)))}else o=n&~i,o!==0?r=Es(o):s!==0&&(r=Es(s));if(r===0)return 0;if(e!==0&&e!==r&&!(e&i)&&(i=r&-r,s=e&-e,i>=s||i===16&&(s&4194240)!==0))return e;if(r&4&&(r|=n&16),e=t.entangledLanes,e!==0)for(t=t.entanglements,e&=r;0<e;)n=31-Wt(e),i=1<<n,r|=t[n],e&=~i;return r}function bE(t,e){switch(t){case 1:case 2:case 4:return e+250;case 8:case 16:case 32:case 64:case 128:case 256:case 512:case 1024:case 2048:case 4096:case 8192:case 16384:case 32768:case 65536:case 131072:case 262144:case 524288:case 1048576:case 2097152:return e+5e3;case 4194304:case 8388608:case 16777216:case 33554432:case 67108864:return-1;case 134217728:case 268435456:case 536870912:case 1073741824:return-1;default:return-1}}function OE(t,e){for(var n=t.suspendedLanes,r=t.pingedLanes,i=t.expirationTimes,s=t.pendingLanes;0<s;){var o=31-Wt(s),l=1<<o,u=i[o];u===-1?(!(l&n)||l&r)&&(i[o]=bE(l,e)):u<=e&&(t.expiredLanes|=l),s&=~l}}function Oc(t){return t=t.pendingLanes&-1073741825,t!==0?t:t&1073741824?1073741824:0}function Ty(){var t=ea;return ea<<=1,!(ea&4194240)&&(ea=64),t}function bu(t){for(var e=[],n=0;31>n;n++)e.push(t);return e}function go(t,e,n){t.pendingLanes|=e,e!==536870912&&(t.suspendedLanes=0,t.pingedLanes=0),t=t.eventTimes,e=31-Wt(e),t[e]=n}function LE(t,e){var n=t.pendingLanes&~e;t.pendingLanes=e,t.suspendedLanes=0,t.pingedLanes=0,t.expiredLanes&=e,t.mutableReadLanes&=e,t.entangledLanes&=e,e=t.entanglements;var r=t.eventTimes;for(t=t.expirationTimes;0<n;){var i=31-Wt(n),s=1<<i;e[i]=0,r[i]=-1,t[i]=-1,n&=~s}}function Hh(t,e){var n=t.entangledLanes|=e;for(t=t.entanglements;n;){var r=31-Wt(n),i=1<<r;i&e|t[r]&e&&(t[r]|=e),n&=~i}}var fe=0;function Iy(t){return t&=-t,1<t?4<t?t&268435455?16:536870912:4:1}var Sy,qh,ky,Ay,Cy,Lc=!1,na=[],Yn=null,Xn=null,Jn=null,Hs=new Map,qs=new Map,Bn=[],ME="mousedown mouseup touchcancel touchend touchstart auxclick dblclick pointercancel pointerdown pointerup dragend dragstart drop compositionend compositionstart keydown keypress keyup input textInput copy cut paste click change contextmenu reset submit".split(" ");function Np(t,e){switch(t){case"focusin":case"focusout":Yn=null;break;case"dragenter":case"dragleave":Xn=null;break;case"mouseover":case"mouseout":Jn=null;break;case"pointerover":case"pointerout":Hs.delete(e.pointerId);break;case"gotpointercapture":case"lostpointercapture":qs.delete(e.pointerId)}}function hs(t,e,n,r,i,s){return t===null||t.nativeEvent!==s?(t={blockedOn:e,domEventName:n,eventSystemFlags:r,nativeEvent:s,targetContainers:[i]},e!==null&&(e=vo(e),e!==null&&qh(e)),t):(t.eventSystemFlags|=r,e=t.targetContainers,i!==null&&e.indexOf(i)===-1&&e.push(i),t)}function FE(t,e,n,r,i){switch(e){case"focusin":return Yn=hs(Yn,t,e,n,r,i),!0;case"dragenter":return Xn=hs(Xn,t,e,n,r,i),!0;case"mouseover":return Jn=hs(Jn,t,e,n,r,i),!0;case"pointerover":var s=i.pointerId;return Hs.set(s,hs(Hs.get(s)||null,t,e,n,r,i)),!0;case"gotpointercapture":return s=i.pointerId,qs.set(s,hs(qs.get(s)||null,t,e,n,r,i)),!0}return!1}function Ry(t){var e=Sr(t.target);if(e!==null){var n=Hr(e);if(n!==null){if(e=n.tag,e===13){if(e=gy(n),e!==null){t.blockedOn=e,Cy(t.priority,function(){ky(n)});return}}else if(e===3&&n.stateNode.current.memoizedState.isDehydrated){t.blockedOn=n.tag===3?n.stateNode.containerInfo:null;return}}}t.blockedOn=null}function Ta(t){if(t.blockedOn!==null)return!1;for(var e=t.targetContainers;0<e.length;){var n=Mc(t.domEventName,t.eventSystemFlags,e[0],t.nativeEvent);if(n===null){n=t.nativeEvent;var r=new n.constructor(n.type,n);Nc=r,n.target.dispatchEvent(r),Nc=null}else return e=vo(n),e!==null&&qh(e),t.blockedOn=n,!1;e.shift()}return!0}function Dp(t,e,n){Ta(t)&&n.delete(e)}function jE(){Lc=!1,Yn!==null&&Ta(Yn)&&(Yn=null),Xn!==null&&Ta(Xn)&&(Xn=null),Jn!==null&&Ta(Jn)&&(Jn=null),Hs.forEach(Dp),qs.forEach(Dp)}function ds(t,e){t.blockedOn===e&&(t.blockedOn=null,Lc||(Lc=!0,kt.unstable_scheduleCallback(kt.unstable_NormalPriority,jE)))}function Ks(t){function e(i){return ds(i,t)}if(0<na.length){ds(na[0],t);for(var n=1;n<na.length;n++){var r=na[n];r.blockedOn===t&&(r.blockedOn=null)}}for(Yn!==null&&ds(Yn,t),Xn!==null&&ds(Xn,t),Jn!==null&&ds(Jn,t),Hs.forEach(e),qs.forEach(e),n=0;n<Bn.length;n++)r=Bn[n],r.blockedOn===t&&(r.blockedOn=null);for(;0<Bn.length&&(n=Bn[0],n.blockedOn===null);)Ry(n),n.blockedOn===null&&Bn.shift()}var vi=Nn.ReactCurrentBatchConfig,Ka=!0;function UE(t,e,n,r){var i=fe,s=vi.transition;vi.transition=null;try{fe=1,Kh(t,e,n,r)}finally{fe=i,vi.transition=s}}function BE(t,e,n,r){var i=fe,s=vi.transition;vi.transition=null;try{fe=4,Kh(t,e,n,r)}finally{fe=i,vi.transition=s}}function Kh(t,e,n,r){if(Ka){var i=Mc(t,e,n,r);if(i===null)Wu(t,e,r,Ga,n),Np(t,r);else if(FE(i,t,e,n,r))r.stopPropagation();else if(Np(t,r),e&4&&-1<ME.indexOf(t)){for(;i!==null;){var s=vo(i);if(s!==null&&Sy(s),s=Mc(t,e,n,r),s===null&&Wu(t,e,r,Ga,n),s===i)break;i=s}i!==null&&r.stopPropagation()}else Wu(t,e,r,null,n)}}var Ga=null;function Mc(t,e,n,r){if(Ga=null,t=$h(r),t=Sr(t),t!==null)if(e=Hr(t),e===null)t=null;else if(n=e.tag,n===13){if(t=gy(e),t!==null)return t;t=null}else if(n===3){if(e.stateNode.current.memoizedState.isDehydrated)return e.tag===3?e.stateNode.containerInfo:null;t=null}else e!==t&&(t=null);return Ga=t,null}function Py(t){switch(t){case"cancel":case"click":case"close":case"contextmenu":case"copy":case"cut":case"auxclick":case"dblclick":case"dragend":case"dragstart":case"drop":case"focusin":case"focusout":case"input":case"invalid":case"keydown":case"keypress":case"keyup":case"mousedown":case"mouseup":case"paste":case"pause":case"play":case"pointercancel":case"pointerdown":case"pointerup":case"ratechange":case"reset":case"resize":case"seeked":case"submit":case"touchcancel":case"touchend":case"touchstart":case"volumechange":case"change":case"selectionchange":case"textInput":case"compositionstart":case"compositionend":case"compositionupdate":case"beforeblur":case"afterblur":case"beforeinput":case"blur":case"fullscreenchange":case"focus":case"hashchange":case"popstate":case"select":case"selectstart":return 1;case"drag":case"dragenter":case"dragexit":case"dragleave":case"dragover":case"mousemove":case"mouseout":case"mouseover":case"pointermove":case"pointerout":case"pointerover":case"scroll":case"toggle":case"touchmove":case"wheel":case"mouseenter":case"mouseleave":case"pointerenter":case"pointerleave":return 4;case"message":switch(RE()){case Wh:return 1;case wy:return 4;case Ha:case PE:return 16;case Ey:return 536870912;default:return 16}default:return 16}}var Kn=null,Gh=null,Ia=null;function xy(){if(Ia)return Ia;var t,e=Gh,n=e.length,r,i="value"in Kn?Kn.value:Kn.textContent,s=i.length;for(t=0;t<n&&e[t]===i[t];t++);var o=n-t;for(r=1;r<=o&&e[n-r]===i[s-r];r++);return Ia=i.slice(t,1<r?1-r:void 0)}function Sa(t){var e=t.keyCode;return"charCode"in t?(t=t.charCode,t===0&&e===13&&(t=13)):t=e,t===10&&(t=13),32<=t||t===13?t:0}function ra(){return!0}function Vp(){return!1}function Rt(t){function e(n,r,i,s,o){this._reactName=n,this._targetInst=i,this.type=r,this.nativeEvent=s,this.target=o,this.currentTarget=null;for(var l in t)t.hasOwnProperty(l)&&(n=t[l],this[l]=n?n(s):s[l]);return this.isDefaultPrevented=(s.defaultPrevented!=null?s.defaultPrevented:s.returnValue===!1)?ra:Vp,this.isPropagationStopped=Vp,this}return Ae(e.prototype,{preventDefault:function(){this.defaultPrevented=!0;var n=this.nativeEvent;n&&(n.preventDefault?n.preventDefault():typeof n.returnValue!="unknown"&&(n.returnValue=!1),this.isDefaultPrevented=ra)},stopPropagation:function(){var n=this.nativeEvent;n&&(n.stopPropagation?n.stopPropagation():typeof n.cancelBubble!="unknown"&&(n.cancelBubble=!0),this.isPropagationStopped=ra)},persist:function(){},isPersistent:ra}),e}var zi={eventPhase:0,bubbles:0,cancelable:0,timeStamp:function(t){return t.timeStamp||Date.now()},defaultPrevented:0,isTrusted:0},Qh=Rt(zi),yo=Ae({},zi,{view:0,detail:0}),zE=Rt(yo),Ou,Lu,fs,Nl=Ae({},yo,{screenX:0,screenY:0,clientX:0,clientY:0,pageX:0,pageY:0,ctrlKey:0,shiftKey:0,altKey:0,metaKey:0,getModifierState:Yh,button:0,buttons:0,relatedTarget:function(t){return t.relatedTarget===void 0?t.fromElement===t.srcElement?t.toElement:t.fromElement:t.relatedTarget},movementX:function(t){return"movementX"in t?t.movementX:(t!==fs&&(fs&&t.type==="mousemove"?(Ou=t.screenX-fs.screenX,Lu=t.screenY-fs.screenY):Lu=Ou=0,fs=t),Ou)},movementY:function(t){return"movementY"in t?t.movementY:Lu}}),bp=Rt(Nl),$E=Ae({},Nl,{dataTransfer:0}),WE=Rt($E),HE=Ae({},yo,{relatedTarget:0}),Mu=Rt(HE),qE=Ae({},zi,{animationName:0,elapsedTime:0,pseudoElement:0}),KE=Rt(qE),GE=Ae({},zi,{clipboardData:function(t){return"clipboardData"in t?t.clipboardData:window.clipboardData}}),QE=Rt(GE),YE=Ae({},zi,{data:0}),Op=Rt(YE),XE={Esc:"Escape",Spacebar:" ",Left:"ArrowLeft",Up:"ArrowUp",Right:"ArrowRight",Down:"ArrowDown",Del:"Delete",Win:"OS",Menu:"ContextMenu",Apps:"ContextMenu",Scroll:"ScrollLock",MozPrintableKey:"Unidentified"},JE={8:"Backspace",9:"Tab",12:"Clear",13:"Enter",16:"Shift",17:"Control",18:"Alt",19:"Pause",20:"CapsLock",27:"Escape",32:" ",33:"PageUp",34:"PageDown",35:"End",36:"Home",37:"ArrowLeft",38:"ArrowUp",39:"ArrowRight",40:"ArrowDown",45:"Insert",46:"Delete",112:"F1",113:"F2",114:"F3",115:"F4",116:"F5",117:"F6",118:"F7",119:"F8",120:"F9",121:"F10",122:"F11",123:"F12",144:"NumLock",145:"ScrollLock",224:"Meta"},ZE={Alt:"altKey",Control:"ctrlKey",Meta:"metaKey",Shift:"shiftKey"};function eT(t){var e=this.nativeEvent;return e.getModifierState?e.getModifierState(t):(t=ZE[t])?!!e[t]:!1}function Yh(){return eT}var tT=Ae({},yo,{key:function(t){if(t.key){var e=XE[t.key]||t.key;if(e!=="Unidentified")return e}return t.type==="keypress"?(t=Sa(t),t===13?"Enter":String.fromCharCode(t)):t.type==="keydown"||t.type==="keyup"?JE[t.keyCode]||"Unidentified":""},code:0,location:0,ctrlKey:0,shiftKey:0,altKey:0,metaKey:0,repeat:0,locale:0,getModifierState:Yh,charCode:function(t){return t.type==="keypress"?Sa(t):0},keyCode:function(t){return t.type==="keydown"||t.type==="keyup"?t.keyCode:0},which:function(t){return t.type==="keypress"?Sa(t):t.type==="keydown"||t.type==="keyup"?t.keyCode:0}}),nT=Rt(tT),rT=Ae({},Nl,{pointerId:0,width:0,height:0,pressure:0,tangentialPressure:0,tiltX:0,tiltY:0,twist:0,pointerType:0,isPrimary:0}),Lp=Rt(rT),iT=Ae({},yo,{touches:0,targetTouches:0,changedTouches:0,altKey:0,metaKey:0,ctrlKey:0,shiftKey:0,getModifierState:Yh}),sT=Rt(iT),oT=Ae({},zi,{propertyName:0,elapsedTime:0,pseudoElement:0}),aT=Rt(oT),lT=Ae({},Nl,{deltaX:function(t){return"deltaX"in t?t.deltaX:"wheelDeltaX"in t?-t.wheelDeltaX:0},deltaY:function(t){return"deltaY"in t?t.deltaY:"wheelDeltaY"in t?-t.wheelDeltaY:"wheelDelta"in t?-t.wheelDelta:0},deltaZ:0,deltaMode:0}),uT=Rt(lT),cT=[9,13,27,32],Xh=En&&"CompositionEvent"in window,xs=null;En&&"documentMode"in document&&(xs=document.documentMode);var hT=En&&"TextEvent"in window&&!xs,Ny=En&&(!Xh||xs&&8<xs&&11>=xs),Mp=" ",Fp=!1;function Dy(t,e){switch(t){case"keyup":return cT.indexOf(e.keyCode)!==-1;case"keydown":return e.keyCode!==229;case"keypress":case"mousedown":case"focusout":return!0;default:return!1}}function Vy(t){return t=t.detail,typeof t=="object"&&"data"in t?t.data:null}var ii=!1;function dT(t,e){switch(t){case"compositionend":return Vy(e);case"keypress":return e.which!==32?null:(Fp=!0,Mp);case"textInput":return t=e.data,t===Mp&&Fp?null:t;default:return null}}function fT(t,e){if(ii)return t==="compositionend"||!Xh&&Dy(t,e)?(t=xy(),Ia=Gh=Kn=null,ii=!1,t):null;switch(t){case"paste":return null;case"keypress":if(!(e.ctrlKey||e.altKey||e.metaKey)||e.ctrlKey&&e.altKey){if(e.char&&1<e.char.length)return e.char;if(e.which)return String.fromCharCode(e.which)}return null;case"compositionend":return Ny&&e.locale!=="ko"?null:e.data;default:return null}}var pT={color:!0,date:!0,datetime:!0,"datetime-local":!0,email:!0,month:!0,number:!0,password:!0,range:!0,search:!0,tel:!0,text:!0,time:!0,url:!0,week:!0};function jp(t){var e=t&&t.nodeName&&t.nodeName.toLowerCase();return e==="input"?!!pT[t.type]:e==="textarea"}function by(t,e,n,r){hy(r),e=Qa(e,"onChange"),0<e.length&&(n=new Qh("onChange","change",null,n,r),t.push({event:n,listeners:e}))}var Ns=null,Gs=null;function mT(t){Hy(t,0)}function Dl(t){var e=ai(t);if(iy(e))return t}function gT(t,e){if(t==="change")return e}var Oy=!1;if(En){var Fu;if(En){var ju="oninput"in document;if(!ju){var Up=document.createElement("div");Up.setAttribute("oninput","return;"),ju=typeof Up.oninput=="function"}Fu=ju}else Fu=!1;Oy=Fu&&(!document.documentMode||9<document.documentMode)}function Bp(){Ns&&(Ns.detachEvent("onpropertychange",Ly),Gs=Ns=null)}function Ly(t){if(t.propertyName==="value"&&Dl(Gs)){var e=[];by(e,Gs,t,$h(t)),my(mT,e)}}function yT(t,e,n){t==="focusin"?(Bp(),Ns=e,Gs=n,Ns.attachEvent("onpropertychange",Ly)):t==="focusout"&&Bp()}function vT(t){if(t==="selectionchange"||t==="keyup"||t==="keydown")return Dl(Gs)}function _T(t,e){if(t==="click")return Dl(e)}function wT(t,e){if(t==="input"||t==="change")return Dl(e)}function ET(t,e){return t===e&&(t!==0||1/t===1/e)||t!==t&&e!==e}var qt=typeof Object.is=="function"?Object.is:ET;function Qs(t,e){if(qt(t,e))return!0;if(typeof t!="object"||t===null||typeof e!="object"||e===null)return!1;var n=Object.keys(t),r=Object.keys(e);if(n.length!==r.length)return!1;for(r=0;r<n.length;r++){var i=n[r];if(!_c.call(e,i)||!qt(t[i],e[i]))return!1}return!0}function zp(t){for(;t&&t.firstChild;)t=t.firstChild;return t}function $p(t,e){var n=zp(t);t=0;for(var r;n;){if(n.nodeType===3){if(r=t+n.textContent.length,t<=e&&r>=e)return{node:n,offset:e-t};t=r}e:{for(;n;){if(n.nextSibling){n=n.nextSibling;break e}n=n.parentNode}n=void 0}n=zp(n)}}function My(t,e){return t&&e?t===e?!0:t&&t.nodeType===3?!1:e&&e.nodeType===3?My(t,e.parentNode):"contains"in t?t.contains(e):t.compareDocumentPosition?!!(t.compareDocumentPosition(e)&16):!1:!1}function Fy(){for(var t=window,e=za();e instanceof t.HTMLIFrameElement;){try{var n=typeof e.contentWindow.location.href=="string"}catch{n=!1}if(n)t=e.contentWindow;else break;e=za(t.document)}return e}function Jh(t){var e=t&&t.nodeName&&t.nodeName.toLowerCase();return e&&(e==="input"&&(t.type==="text"||t.type==="search"||t.type==="tel"||t.type==="url"||t.type==="password")||e==="textarea"||t.contentEditable==="true")}function TT(t){var e=Fy(),n=t.focusedElem,r=t.selectionRange;if(e!==n&&n&&n.ownerDocument&&My(n.ownerDocument.documentElement,n)){if(r!==null&&Jh(n)){if(e=r.start,t=r.end,t===void 0&&(t=e),"selectionStart"in n)n.selectionStart=e,n.selectionEnd=Math.min(t,n.value.length);else if(t=(e=n.ownerDocument||document)&&e.defaultView||window,t.getSelection){t=t.getSelection();var i=n.textContent.length,s=Math.min(r.start,i);r=r.end===void 0?s:Math.min(r.end,i),!t.extend&&s>r&&(i=r,r=s,s=i),i=$p(n,s);var o=$p(n,r);i&&o&&(t.rangeCount!==1||t.anchorNode!==i.node||t.anchorOffset!==i.offset||t.focusNode!==o.node||t.focusOffset!==o.offset)&&(e=e.createRange(),e.setStart(i.node,i.offset),t.removeAllRanges(),s>r?(t.addRange(e),t.extend(o.node,o.offset)):(e.setEnd(o.node,o.offset),t.addRange(e)))}}for(e=[],t=n;t=t.parentNode;)t.nodeType===1&&e.push({element:t,left:t.scrollLeft,top:t.scrollTop});for(typeof n.focus=="function"&&n.focus(),n=0;n<e.length;n++)t=e[n],t.element.scrollLeft=t.left,t.element.scrollTop=t.top}}var IT=En&&"documentMode"in document&&11>=document.documentMode,si=null,Fc=null,Ds=null,jc=!1;function Wp(t,e,n){var r=n.window===n?n.document:n.nodeType===9?n:n.ownerDocument;jc||si==null||si!==za(r)||(r=si,"selectionStart"in r&&Jh(r)?r={start:r.selectionStart,end:r.selectionEnd}:(r=(r.ownerDocument&&r.ownerDocument.defaultView||window).getSelection(),r={anchorNode:r.anchorNode,anchorOffset:r.anchorOffset,focusNode:r.focusNode,focusOffset:r.focusOffset}),Ds&&Qs(Ds,r)||(Ds=r,r=Qa(Fc,"onSelect"),0<r.length&&(e=new Qh("onSelect","select",null,e,n),t.push({event:e,listeners:r}),e.target=si)))}function ia(t,e){var n={};return n[t.toLowerCase()]=e.toLowerCase(),n["Webkit"+t]="webkit"+e,n["Moz"+t]="moz"+e,n}var oi={animationend:ia("Animation","AnimationEnd"),animationiteration:ia("Animation","AnimationIteration"),animationstart:ia("Animation","AnimationStart"),transitionend:ia("Transition","TransitionEnd")},Uu={},jy={};En&&(jy=document.createElement("div").style,"AnimationEvent"in window||(delete oi.animationend.animation,delete oi.animationiteration.animation,delete oi.animationstart.animation),"TransitionEvent"in window||delete oi.transitionend.transition);function Vl(t){if(Uu[t])return Uu[t];if(!oi[t])return t;var e=oi[t],n;for(n in e)if(e.hasOwnProperty(n)&&n in jy)return Uu[t]=e[n];return t}var Uy=Vl("animationend"),By=Vl("animationiteration"),zy=Vl("animationstart"),$y=Vl("transitionend"),Wy=new Map,Hp="abort auxClick cancel canPlay canPlayThrough click close contextMenu copy cut drag dragEnd dragEnter dragExit dragLeave dragOver dragStart drop durationChange emptied encrypted ended error gotPointerCapture input invalid keyDown keyPress keyUp load loadedData loadedMetadata loadStart lostPointerCapture mouseDown mouseMove mouseOut mouseOver mouseUp paste pause play playing pointerCancel pointerDown pointerMove pointerOut pointerOver pointerUp progress rateChange reset resize seeked seeking stalled submit suspend timeUpdate touchCancel touchEnd touchStart volumeChange scroll toggle touchMove waiting wheel".split(" ");function fr(t,e){Wy.set(t,e),Wr(e,[t])}for(var Bu=0;Bu<Hp.length;Bu++){var zu=Hp[Bu],ST=zu.toLowerCase(),kT=zu[0].toUpperCase()+zu.slice(1);fr(ST,"on"+kT)}fr(Uy,"onAnimationEnd");fr(By,"onAnimationIteration");fr(zy,"onAnimationStart");fr("dblclick","onDoubleClick");fr("focusin","onFocus");fr("focusout","onBlur");fr($y,"onTransitionEnd");ki("onMouseEnter",["mouseout","mouseover"]);ki("onMouseLeave",["mouseout","mouseover"]);ki("onPointerEnter",["pointerout","pointerover"]);ki("onPointerLeave",["pointerout","pointerover"]);Wr("onChange","change click focusin focusout input keydown keyup selectionchange".split(" "));Wr("onSelect","focusout contextmenu dragend focusin keydown keyup mousedown mouseup selectionchange".split(" "));Wr("onBeforeInput",["compositionend","keypress","textInput","paste"]);Wr("onCompositionEnd","compositionend focusout keydown keypress keyup mousedown".split(" "));Wr("onCompositionStart","compositionstart focusout keydown keypress keyup mousedown".split(" "));Wr("onCompositionUpdate","compositionupdate focusout keydown keypress keyup mousedown".split(" "));var Ts="abort canplay canplaythrough durationchange emptied encrypted ended error loadeddata loadedmetadata loadstart pause play playing progress ratechange resize seeked seeking stalled suspend timeupdate volumechange waiting".split(" "),AT=new Set("cancel close invalid load scroll toggle".split(" ").concat(Ts));function qp(t,e,n){var r=t.type||"unknown-event";t.currentTarget=n,SE(r,e,void 0,t),t.currentTarget=null}function Hy(t,e){e=(e&4)!==0;for(var n=0;n<t.length;n++){var r=t[n],i=r.event;r=r.listeners;e:{var s=void 0;if(e)for(var o=r.length-1;0<=o;o--){var l=r[o],u=l.instance,h=l.currentTarget;if(l=l.listener,u!==s&&i.isPropagationStopped())break e;qp(i,l,h),s=u}else for(o=0;o<r.length;o++){if(l=r[o],u=l.instance,h=l.currentTarget,l=l.listener,u!==s&&i.isPropagationStopped())break e;qp(i,l,h),s=u}}}if(Wa)throw t=bc,Wa=!1,bc=null,t}function ve(t,e){var n=e[Wc];n===void 0&&(n=e[Wc]=new Set);var r=t+"__bubble";n.has(r)||(qy(e,t,2,!1),n.add(r))}function $u(t,e,n){var r=0;e&&(r|=4),qy(n,t,r,e)}var sa="_reactListening"+Math.random().toString(36).slice(2);function Ys(t){if(!t[sa]){t[sa]=!0,Zg.forEach(function(n){n!=="selectionchange"&&(AT.has(n)||$u(n,!1,t),$u(n,!0,t))});var e=t.nodeType===9?t:t.ownerDocument;e===null||e[sa]||(e[sa]=!0,$u("selectionchange",!1,e))}}function qy(t,e,n,r){switch(Py(e)){case 1:var i=UE;break;case 4:i=BE;break;default:i=Kh}n=i.bind(null,e,n,t),i=void 0,!Vc||e!=="touchstart"&&e!=="touchmove"&&e!=="wheel"||(i=!0),r?i!==void 0?t.addEventListener(e,n,{capture:!0,passive:i}):t.addEventListener(e,n,!0):i!==void 0?t.addEventListener(e,n,{passive:i}):t.addEventListener(e,n,!1)}function Wu(t,e,n,r,i){var s=r;if(!(e&1)&&!(e&2)&&r!==null)e:for(;;){if(r===null)return;var o=r.tag;if(o===3||o===4){var l=r.stateNode.containerInfo;if(l===i||l.nodeType===8&&l.parentNode===i)break;if(o===4)for(o=r.return;o!==null;){var u=o.tag;if((u===3||u===4)&&(u=o.stateNode.containerInfo,u===i||u.nodeType===8&&u.parentNode===i))return;o=o.return}for(;l!==null;){if(o=Sr(l),o===null)return;if(u=o.tag,u===5||u===6){r=s=o;continue e}l=l.parentNode}}r=r.return}my(function(){var h=s,f=$h(n),g=[];e:{var v=Wy.get(t);if(v!==void 0){var R=Qh,N=t;switch(t){case"keypress":if(Sa(n)===0)break e;case"keydown":case"keyup":R=nT;break;case"focusin":N="focus",R=Mu;break;case"focusout":N="blur",R=Mu;break;case"beforeblur":case"afterblur":R=Mu;break;case"click":if(n.button===2)break e;case"auxclick":case"dblclick":case"mousedown":case"mousemove":case"mouseup":case"mouseout":case"mouseover":case"contextmenu":R=bp;break;case"drag":case"dragend":case"dragenter":case"dragexit":case"dragleave":case"dragover":case"dragstart":case"drop":R=WE;break;case"touchcancel":case"touchend":case"touchmove":case"touchstart":R=sT;break;case Uy:case By:case zy:R=KE;break;case $y:R=aT;break;case"scroll":R=zE;break;case"wheel":R=uT;break;case"copy":case"cut":case"paste":R=QE;break;case"gotpointercapture":case"lostpointercapture":case"pointercancel":case"pointerdown":case"pointermove":case"pointerout":case"pointerover":case"pointerup":R=Lp}var D=(e&4)!==0,V=!D&&t==="scroll",S=D?v!==null?v+"Capture":null:v;D=[];for(var _=h,k;_!==null;){k=_;var O=k.stateNode;if(k.tag===5&&O!==null&&(k=O,S!==null&&(O=Ws(_,S),O!=null&&D.push(Xs(_,O,k)))),V)break;_=_.return}0<D.length&&(v=new R(v,N,null,n,f),g.push({event:v,listeners:D}))}}if(!(e&7)){e:{if(v=t==="mouseover"||t==="pointerover",R=t==="mouseout"||t==="pointerout",v&&n!==Nc&&(N=n.relatedTarget||n.fromElement)&&(Sr(N)||N[Tn]))break e;if((R||v)&&(v=f.window===f?f:(v=f.ownerDocument)?v.defaultView||v.parentWindow:window,R?(N=n.relatedTarget||n.toElement,R=h,N=N?Sr(N):null,N!==null&&(V=Hr(N),N!==V||N.tag!==5&&N.tag!==6)&&(N=null)):(R=null,N=h),R!==N)){if(D=bp,O="onMouseLeave",S="onMouseEnter",_="mouse",(t==="pointerout"||t==="pointerover")&&(D=Lp,O="onPointerLeave",S="onPointerEnter",_="pointer"),V=R==null?v:ai(R),k=N==null?v:ai(N),v=new D(O,_+"leave",R,n,f),v.target=V,v.relatedTarget=k,O=null,Sr(f)===h&&(D=new D(S,_+"enter",N,n,f),D.target=k,D.relatedTarget=V,O=D),V=O,R&&N)t:{for(D=R,S=N,_=0,k=D;k;k=Jr(k))_++;for(k=0,O=S;O;O=Jr(O))k++;for(;0<_-k;)D=Jr(D),_--;for(;0<k-_;)S=Jr(S),k--;for(;_--;){if(D===S||S!==null&&D===S.alternate)break t;D=Jr(D),S=Jr(S)}D=null}else D=null;R!==null&&Kp(g,v,R,D,!1),N!==null&&V!==null&&Kp(g,V,N,D,!0)}}e:{if(v=h?ai(h):window,R=v.nodeName&&v.nodeName.toLowerCase(),R==="select"||R==="input"&&v.type==="file")var U=gT;else if(jp(v))if(Oy)U=wT;else{U=vT;var B=yT}else(R=v.nodeName)&&R.toLowerCase()==="input"&&(v.type==="checkbox"||v.type==="radio")&&(U=_T);if(U&&(U=U(t,h))){by(g,U,n,f);break e}B&&B(t,v,h),t==="focusout"&&(B=v._wrapperState)&&B.controlled&&v.type==="number"&&Ac(v,"number",v.value)}switch(B=h?ai(h):window,t){case"focusin":(jp(B)||B.contentEditable==="true")&&(si=B,Fc=h,Ds=null);break;case"focusout":Ds=Fc=si=null;break;case"mousedown":jc=!0;break;case"contextmenu":case"mouseup":case"dragend":jc=!1,Wp(g,n,f);break;case"selectionchange":if(IT)break;case"keydown":case"keyup":Wp(g,n,f)}var E;if(Xh)e:{switch(t){case"compositionstart":var y="onCompositionStart";break e;case"compositionend":y="onCompositionEnd";break e;case"compositionupdate":y="onCompositionUpdate";break e}y=void 0}else ii?Dy(t,n)&&(y="onCompositionEnd"):t==="keydown"&&n.keyCode===229&&(y="onCompositionStart");y&&(Ny&&n.locale!=="ko"&&(ii||y!=="onCompositionStart"?y==="onCompositionEnd"&&ii&&(E=xy()):(Kn=f,Gh="value"in Kn?Kn.value:Kn.textContent,ii=!0)),B=Qa(h,y),0<B.length&&(y=new Op(y,t,null,n,f),g.push({event:y,listeners:B}),E?y.data=E:(E=Vy(n),E!==null&&(y.data=E)))),(E=hT?dT(t,n):fT(t,n))&&(h=Qa(h,"onBeforeInput"),0<h.length&&(f=new Op("onBeforeInput","beforeinput",null,n,f),g.push({event:f,listeners:h}),f.data=E))}Hy(g,e)})}function Xs(t,e,n){return{instance:t,listener:e,currentTarget:n}}function Qa(t,e){for(var n=e+"Capture",r=[];t!==null;){var i=t,s=i.stateNode;i.tag===5&&s!==null&&(i=s,s=Ws(t,n),s!=null&&r.unshift(Xs(t,s,i)),s=Ws(t,e),s!=null&&r.push(Xs(t,s,i))),t=t.return}return r}function Jr(t){if(t===null)return null;do t=t.return;while(t&&t.tag!==5);return t||null}function Kp(t,e,n,r,i){for(var s=e._reactName,o=[];n!==null&&n!==r;){var l=n,u=l.alternate,h=l.stateNode;if(u!==null&&u===r)break;l.tag===5&&h!==null&&(l=h,i?(u=Ws(n,s),u!=null&&o.unshift(Xs(n,u,l))):i||(u=Ws(n,s),u!=null&&o.push(Xs(n,u,l)))),n=n.return}o.length!==0&&t.push({event:e,listeners:o})}var CT=/\r\n?/g,RT=/\u0000|\uFFFD/g;function Gp(t){return(typeof t=="string"?t:""+t).replace(CT,`
`).replace(RT,"")}function oa(t,e,n){if(e=Gp(e),Gp(t)!==e&&n)throw Error(F(425))}function Ya(){}var Uc=null,Bc=null;function zc(t,e){return t==="textarea"||t==="noscript"||typeof e.children=="string"||typeof e.children=="number"||typeof e.dangerouslySetInnerHTML=="object"&&e.dangerouslySetInnerHTML!==null&&e.dangerouslySetInnerHTML.__html!=null}var $c=typeof setTimeout=="function"?setTimeout:void 0,PT=typeof clearTimeout=="function"?clearTimeout:void 0,Qp=typeof Promise=="function"?Promise:void 0,xT=typeof queueMicrotask=="function"?queueMicrotask:typeof Qp<"u"?function(t){return Qp.resolve(null).then(t).catch(NT)}:$c;function NT(t){setTimeout(function(){throw t})}function Hu(t,e){var n=e,r=0;do{var i=n.nextSibling;if(t.removeChild(n),i&&i.nodeType===8)if(n=i.data,n==="/$"){if(r===0){t.removeChild(i),Ks(e);return}r--}else n!=="$"&&n!=="$?"&&n!=="$!"||r++;n=i}while(n);Ks(e)}function Zn(t){for(;t!=null;t=t.nextSibling){var e=t.nodeType;if(e===1||e===3)break;if(e===8){if(e=t.data,e==="$"||e==="$!"||e==="$?")break;if(e==="/$")return null}}return t}function Yp(t){t=t.previousSibling;for(var e=0;t;){if(t.nodeType===8){var n=t.data;if(n==="$"||n==="$!"||n==="$?"){if(e===0)return t;e--}else n==="/$"&&e++}t=t.previousSibling}return null}var $i=Math.random().toString(36).slice(2),Xt="__reactFiber$"+$i,Js="__reactProps$"+$i,Tn="__reactContainer$"+$i,Wc="__reactEvents$"+$i,DT="__reactListeners$"+$i,VT="__reactHandles$"+$i;function Sr(t){var e=t[Xt];if(e)return e;for(var n=t.parentNode;n;){if(e=n[Tn]||n[Xt]){if(n=e.alternate,e.child!==null||n!==null&&n.child!==null)for(t=Yp(t);t!==null;){if(n=t[Xt])return n;t=Yp(t)}return e}t=n,n=t.parentNode}return null}function vo(t){return t=t[Xt]||t[Tn],!t||t.tag!==5&&t.tag!==6&&t.tag!==13&&t.tag!==3?null:t}function ai(t){if(t.tag===5||t.tag===6)return t.stateNode;throw Error(F(33))}function bl(t){return t[Js]||null}var Hc=[],li=-1;function pr(t){return{current:t}}function _e(t){0>li||(t.current=Hc[li],Hc[li]=null,li--)}function ge(t,e){li++,Hc[li]=t.current,t.current=e}var ur={},ot=pr(ur),yt=pr(!1),br=ur;function Ai(t,e){var n=t.type.contextTypes;if(!n)return ur;var r=t.stateNode;if(r&&r.__reactInternalMemoizedUnmaskedChildContext===e)return r.__reactInternalMemoizedMaskedChildContext;var i={},s;for(s in n)i[s]=e[s];return r&&(t=t.stateNode,t.__reactInternalMemoizedUnmaskedChildContext=e,t.__reactInternalMemoizedMaskedChildContext=i),i}function vt(t){return t=t.childContextTypes,t!=null}function Xa(){_e(yt),_e(ot)}function Xp(t,e,n){if(ot.current!==ur)throw Error(F(168));ge(ot,e),ge(yt,n)}function Ky(t,e,n){var r=t.stateNode;if(e=e.childContextTypes,typeof r.getChildContext!="function")return n;r=r.getChildContext();for(var i in r)if(!(i in e))throw Error(F(108,yE(t)||"Unknown",i));return Ae({},n,r)}function Ja(t){return t=(t=t.stateNode)&&t.__reactInternalMemoizedMergedChildContext||ur,br=ot.current,ge(ot,t),ge(yt,yt.current),!0}function Jp(t,e,n){var r=t.stateNode;if(!r)throw Error(F(169));n?(t=Ky(t,e,br),r.__reactInternalMemoizedMergedChildContext=t,_e(yt),_e(ot),ge(ot,t)):_e(yt),ge(yt,n)}var fn=null,Ol=!1,qu=!1;function Gy(t){fn===null?fn=[t]:fn.push(t)}function bT(t){Ol=!0,Gy(t)}function mr(){if(!qu&&fn!==null){qu=!0;var t=0,e=fe;try{var n=fn;for(fe=1;t<n.length;t++){var r=n[t];do r=r(!0);while(r!==null)}fn=null,Ol=!1}catch(i){throw fn!==null&&(fn=fn.slice(t+1)),_y(Wh,mr),i}finally{fe=e,qu=!1}}return null}var ui=[],ci=0,Za=null,el=0,Nt=[],Dt=0,Or=null,pn=1,mn="";function Er(t,e){ui[ci++]=el,ui[ci++]=Za,Za=t,el=e}function Qy(t,e,n){Nt[Dt++]=pn,Nt[Dt++]=mn,Nt[Dt++]=Or,Or=t;var r=pn;t=mn;var i=32-Wt(r)-1;r&=~(1<<i),n+=1;var s=32-Wt(e)+i;if(30<s){var o=i-i%5;s=(r&(1<<o)-1).toString(32),r>>=o,i-=o,pn=1<<32-Wt(e)+i|n<<i|r,mn=s+t}else pn=1<<s|n<<i|r,mn=t}function Zh(t){t.return!==null&&(Er(t,1),Qy(t,1,0))}function ed(t){for(;t===Za;)Za=ui[--ci],ui[ci]=null,el=ui[--ci],ui[ci]=null;for(;t===Or;)Or=Nt[--Dt],Nt[Dt]=null,mn=Nt[--Dt],Nt[Dt]=null,pn=Nt[--Dt],Nt[Dt]=null}var It=null,Tt=null,Ee=!1,zt=null;function Yy(t,e){var n=bt(5,null,null,0);n.elementType="DELETED",n.stateNode=e,n.return=t,e=t.deletions,e===null?(t.deletions=[n],t.flags|=16):e.push(n)}function Zp(t,e){switch(t.tag){case 5:var n=t.type;return e=e.nodeType!==1||n.toLowerCase()!==e.nodeName.toLowerCase()?null:e,e!==null?(t.stateNode=e,It=t,Tt=Zn(e.firstChild),!0):!1;case 6:return e=t.pendingProps===""||e.nodeType!==3?null:e,e!==null?(t.stateNode=e,It=t,Tt=null,!0):!1;case 13:return e=e.nodeType!==8?null:e,e!==null?(n=Or!==null?{id:pn,overflow:mn}:null,t.memoizedState={dehydrated:e,treeContext:n,retryLane:1073741824},n=bt(18,null,null,0),n.stateNode=e,n.return=t,t.child=n,It=t,Tt=null,!0):!1;default:return!1}}function qc(t){return(t.mode&1)!==0&&(t.flags&128)===0}function Kc(t){if(Ee){var e=Tt;if(e){var n=e;if(!Zp(t,e)){if(qc(t))throw Error(F(418));e=Zn(n.nextSibling);var r=It;e&&Zp(t,e)?Yy(r,n):(t.flags=t.flags&-4097|2,Ee=!1,It=t)}}else{if(qc(t))throw Error(F(418));t.flags=t.flags&-4097|2,Ee=!1,It=t}}}function em(t){for(t=t.return;t!==null&&t.tag!==5&&t.tag!==3&&t.tag!==13;)t=t.return;It=t}function aa(t){if(t!==It)return!1;if(!Ee)return em(t),Ee=!0,!1;var e;if((e=t.tag!==3)&&!(e=t.tag!==5)&&(e=t.type,e=e!=="head"&&e!=="body"&&!zc(t.type,t.memoizedProps)),e&&(e=Tt)){if(qc(t))throw Xy(),Error(F(418));for(;e;)Yy(t,e),e=Zn(e.nextSibling)}if(em(t),t.tag===13){if(t=t.memoizedState,t=t!==null?t.dehydrated:null,!t)throw Error(F(317));e:{for(t=t.nextSibling,e=0;t;){if(t.nodeType===8){var n=t.data;if(n==="/$"){if(e===0){Tt=Zn(t.nextSibling);break e}e--}else n!=="$"&&n!=="$!"&&n!=="$?"||e++}t=t.nextSibling}Tt=null}}else Tt=It?Zn(t.stateNode.nextSibling):null;return!0}function Xy(){for(var t=Tt;t;)t=Zn(t.nextSibling)}function Ci(){Tt=It=null,Ee=!1}function td(t){zt===null?zt=[t]:zt.push(t)}var OT=Nn.ReactCurrentBatchConfig;function ps(t,e,n){if(t=n.ref,t!==null&&typeof t!="function"&&typeof t!="object"){if(n._owner){if(n=n._owner,n){if(n.tag!==1)throw Error(F(309));var r=n.stateNode}if(!r)throw Error(F(147,t));var i=r,s=""+t;return e!==null&&e.ref!==null&&typeof e.ref=="function"&&e.ref._stringRef===s?e.ref:(e=function(o){var l=i.refs;o===null?delete l[s]:l[s]=o},e._stringRef=s,e)}if(typeof t!="string")throw Error(F(284));if(!n._owner)throw Error(F(290,t))}return t}function la(t,e){throw t=Object.prototype.toString.call(e),Error(F(31,t==="[object Object]"?"object with keys {"+Object.keys(e).join(", ")+"}":t))}function tm(t){var e=t._init;return e(t._payload)}function Jy(t){function e(S,_){if(t){var k=S.deletions;k===null?(S.deletions=[_],S.flags|=16):k.push(_)}}function n(S,_){if(!t)return null;for(;_!==null;)e(S,_),_=_.sibling;return null}function r(S,_){for(S=new Map;_!==null;)_.key!==null?S.set(_.key,_):S.set(_.index,_),_=_.sibling;return S}function i(S,_){return S=rr(S,_),S.index=0,S.sibling=null,S}function s(S,_,k){return S.index=k,t?(k=S.alternate,k!==null?(k=k.index,k<_?(S.flags|=2,_):k):(S.flags|=2,_)):(S.flags|=1048576,_)}function o(S){return t&&S.alternate===null&&(S.flags|=2),S}function l(S,_,k,O){return _===null||_.tag!==6?(_=Zu(k,S.mode,O),_.return=S,_):(_=i(_,k),_.return=S,_)}function u(S,_,k,O){var U=k.type;return U===ri?f(S,_,k.props.children,O,k.key):_!==null&&(_.elementType===U||typeof U=="object"&&U!==null&&U.$$typeof===jn&&tm(U)===_.type)?(O=i(_,k.props),O.ref=ps(S,_,k),O.return=S,O):(O=Na(k.type,k.key,k.props,null,S.mode,O),O.ref=ps(S,_,k),O.return=S,O)}function h(S,_,k,O){return _===null||_.tag!==4||_.stateNode.containerInfo!==k.containerInfo||_.stateNode.implementation!==k.implementation?(_=ec(k,S.mode,O),_.return=S,_):(_=i(_,k.children||[]),_.return=S,_)}function f(S,_,k,O,U){return _===null||_.tag!==7?(_=Pr(k,S.mode,O,U),_.return=S,_):(_=i(_,k),_.return=S,_)}function g(S,_,k){if(typeof _=="string"&&_!==""||typeof _=="number")return _=Zu(""+_,S.mode,k),_.return=S,_;if(typeof _=="object"&&_!==null){switch(_.$$typeof){case Xo:return k=Na(_.type,_.key,_.props,null,S.mode,k),k.ref=ps(S,null,_),k.return=S,k;case ni:return _=ec(_,S.mode,k),_.return=S,_;case jn:var O=_._init;return g(S,O(_._payload),k)}if(ws(_)||us(_))return _=Pr(_,S.mode,k,null),_.return=S,_;la(S,_)}return null}function v(S,_,k,O){var U=_!==null?_.key:null;if(typeof k=="string"&&k!==""||typeof k=="number")return U!==null?null:l(S,_,""+k,O);if(typeof k=="object"&&k!==null){switch(k.$$typeof){case Xo:return k.key===U?u(S,_,k,O):null;case ni:return k.key===U?h(S,_,k,O):null;case jn:return U=k._init,v(S,_,U(k._payload),O)}if(ws(k)||us(k))return U!==null?null:f(S,_,k,O,null);la(S,k)}return null}function R(S,_,k,O,U){if(typeof O=="string"&&O!==""||typeof O=="number")return S=S.get(k)||null,l(_,S,""+O,U);if(typeof O=="object"&&O!==null){switch(O.$$typeof){case Xo:return S=S.get(O.key===null?k:O.key)||null,u(_,S,O,U);case ni:return S=S.get(O.key===null?k:O.key)||null,h(_,S,O,U);case jn:var B=O._init;return R(S,_,k,B(O._payload),U)}if(ws(O)||us(O))return S=S.get(k)||null,f(_,S,O,U,null);la(_,O)}return null}function N(S,_,k,O){for(var U=null,B=null,E=_,y=_=0,w=null;E!==null&&y<k.length;y++){E.index>y?(w=E,E=null):w=E.sibling;var I=v(S,E,k[y],O);if(I===null){E===null&&(E=w);break}t&&E&&I.alternate===null&&e(S,E),_=s(I,_,y),B===null?U=I:B.sibling=I,B=I,E=w}if(y===k.length)return n(S,E),Ee&&Er(S,y),U;if(E===null){for(;y<k.length;y++)E=g(S,k[y],O),E!==null&&(_=s(E,_,y),B===null?U=E:B.sibling=E,B=E);return Ee&&Er(S,y),U}for(E=r(S,E);y<k.length;y++)w=R(E,S,y,k[y],O),w!==null&&(t&&w.alternate!==null&&E.delete(w.key===null?y:w.key),_=s(w,_,y),B===null?U=w:B.sibling=w,B=w);return t&&E.forEach(function(A){return e(S,A)}),Ee&&Er(S,y),U}function D(S,_,k,O){var U=us(k);if(typeof U!="function")throw Error(F(150));if(k=U.call(k),k==null)throw Error(F(151));for(var B=U=null,E=_,y=_=0,w=null,I=k.next();E!==null&&!I.done;y++,I=k.next()){E.index>y?(w=E,E=null):w=E.sibling;var A=v(S,E,I.value,O);if(A===null){E===null&&(E=w);break}t&&E&&A.alternate===null&&e(S,E),_=s(A,_,y),B===null?U=A:B.sibling=A,B=A,E=w}if(I.done)return n(S,E),Ee&&Er(S,y),U;if(E===null){for(;!I.done;y++,I=k.next())I=g(S,I.value,O),I!==null&&(_=s(I,_,y),B===null?U=I:B.sibling=I,B=I);return Ee&&Er(S,y),U}for(E=r(S,E);!I.done;y++,I=k.next())I=R(E,S,y,I.value,O),I!==null&&(t&&I.alternate!==null&&E.delete(I.key===null?y:I.key),_=s(I,_,y),B===null?U=I:B.sibling=I,B=I);return t&&E.forEach(function(P){return e(S,P)}),Ee&&Er(S,y),U}function V(S,_,k,O){if(typeof k=="object"&&k!==null&&k.type===ri&&k.key===null&&(k=k.props.children),typeof k=="object"&&k!==null){switch(k.$$typeof){case Xo:e:{for(var U=k.key,B=_;B!==null;){if(B.key===U){if(U=k.type,U===ri){if(B.tag===7){n(S,B.sibling),_=i(B,k.props.children),_.return=S,S=_;break e}}else if(B.elementType===U||typeof U=="object"&&U!==null&&U.$$typeof===jn&&tm(U)===B.type){n(S,B.sibling),_=i(B,k.props),_.ref=ps(S,B,k),_.return=S,S=_;break e}n(S,B);break}else e(S,B);B=B.sibling}k.type===ri?(_=Pr(k.props.children,S.mode,O,k.key),_.return=S,S=_):(O=Na(k.type,k.key,k.props,null,S.mode,O),O.ref=ps(S,_,k),O.return=S,S=O)}return o(S);case ni:e:{for(B=k.key;_!==null;){if(_.key===B)if(_.tag===4&&_.stateNode.containerInfo===k.containerInfo&&_.stateNode.implementation===k.implementation){n(S,_.sibling),_=i(_,k.children||[]),_.return=S,S=_;break e}else{n(S,_);break}else e(S,_);_=_.sibling}_=ec(k,S.mode,O),_.return=S,S=_}return o(S);case jn:return B=k._init,V(S,_,B(k._payload),O)}if(ws(k))return N(S,_,k,O);if(us(k))return D(S,_,k,O);la(S,k)}return typeof k=="string"&&k!==""||typeof k=="number"?(k=""+k,_!==null&&_.tag===6?(n(S,_.sibling),_=i(_,k),_.return=S,S=_):(n(S,_),_=Zu(k,S.mode,O),_.return=S,S=_),o(S)):n(S,_)}return V}var Ri=Jy(!0),Zy=Jy(!1),tl=pr(null),nl=null,hi=null,nd=null;function rd(){nd=hi=nl=null}function id(t){var e=tl.current;_e(tl),t._currentValue=e}function Gc(t,e,n){for(;t!==null;){var r=t.alternate;if((t.childLanes&e)!==e?(t.childLanes|=e,r!==null&&(r.childLanes|=e)):r!==null&&(r.childLanes&e)!==e&&(r.childLanes|=e),t===n)break;t=t.return}}function _i(t,e){nl=t,nd=hi=null,t=t.dependencies,t!==null&&t.firstContext!==null&&(t.lanes&e&&(gt=!0),t.firstContext=null)}function Lt(t){var e=t._currentValue;if(nd!==t)if(t={context:t,memoizedValue:e,next:null},hi===null){if(nl===null)throw Error(F(308));hi=t,nl.dependencies={lanes:0,firstContext:t}}else hi=hi.next=t;return e}var kr=null;function sd(t){kr===null?kr=[t]:kr.push(t)}function ev(t,e,n,r){var i=e.interleaved;return i===null?(n.next=n,sd(e)):(n.next=i.next,i.next=n),e.interleaved=n,In(t,r)}function In(t,e){t.lanes|=e;var n=t.alternate;for(n!==null&&(n.lanes|=e),n=t,t=t.return;t!==null;)t.childLanes|=e,n=t.alternate,n!==null&&(n.childLanes|=e),n=t,t=t.return;return n.tag===3?n.stateNode:null}var Un=!1;function od(t){t.updateQueue={baseState:t.memoizedState,firstBaseUpdate:null,lastBaseUpdate:null,shared:{pending:null,interleaved:null,lanes:0},effects:null}}function tv(t,e){t=t.updateQueue,e.updateQueue===t&&(e.updateQueue={baseState:t.baseState,firstBaseUpdate:t.firstBaseUpdate,lastBaseUpdate:t.lastBaseUpdate,shared:t.shared,effects:t.effects})}function _n(t,e){return{eventTime:t,lane:e,tag:0,payload:null,callback:null,next:null}}function er(t,e,n){var r=t.updateQueue;if(r===null)return null;if(r=r.shared,ae&2){var i=r.pending;return i===null?e.next=e:(e.next=i.next,i.next=e),r.pending=e,In(t,n)}return i=r.interleaved,i===null?(e.next=e,sd(r)):(e.next=i.next,i.next=e),r.interleaved=e,In(t,n)}function ka(t,e,n){if(e=e.updateQueue,e!==null&&(e=e.shared,(n&4194240)!==0)){var r=e.lanes;r&=t.pendingLanes,n|=r,e.lanes=n,Hh(t,n)}}function nm(t,e){var n=t.updateQueue,r=t.alternate;if(r!==null&&(r=r.updateQueue,n===r)){var i=null,s=null;if(n=n.firstBaseUpdate,n!==null){do{var o={eventTime:n.eventTime,lane:n.lane,tag:n.tag,payload:n.payload,callback:n.callback,next:null};s===null?i=s=o:s=s.next=o,n=n.next}while(n!==null);s===null?i=s=e:s=s.next=e}else i=s=e;n={baseState:r.baseState,firstBaseUpdate:i,lastBaseUpdate:s,shared:r.shared,effects:r.effects},t.updateQueue=n;return}t=n.lastBaseUpdate,t===null?n.firstBaseUpdate=e:t.next=e,n.lastBaseUpdate=e}function rl(t,e,n,r){var i=t.updateQueue;Un=!1;var s=i.firstBaseUpdate,o=i.lastBaseUpdate,l=i.shared.pending;if(l!==null){i.shared.pending=null;var u=l,h=u.next;u.next=null,o===null?s=h:o.next=h,o=u;var f=t.alternate;f!==null&&(f=f.updateQueue,l=f.lastBaseUpdate,l!==o&&(l===null?f.firstBaseUpdate=h:l.next=h,f.lastBaseUpdate=u))}if(s!==null){var g=i.baseState;o=0,f=h=u=null,l=s;do{var v=l.lane,R=l.eventTime;if((r&v)===v){f!==null&&(f=f.next={eventTime:R,lane:0,tag:l.tag,payload:l.payload,callback:l.callback,next:null});e:{var N=t,D=l;switch(v=e,R=n,D.tag){case 1:if(N=D.payload,typeof N=="function"){g=N.call(R,g,v);break e}g=N;break e;case 3:N.flags=N.flags&-65537|128;case 0:if(N=D.payload,v=typeof N=="function"?N.call(R,g,v):N,v==null)break e;g=Ae({},g,v);break e;case 2:Un=!0}}l.callback!==null&&l.lane!==0&&(t.flags|=64,v=i.effects,v===null?i.effects=[l]:v.push(l))}else R={eventTime:R,lane:v,tag:l.tag,payload:l.payload,callback:l.callback,next:null},f===null?(h=f=R,u=g):f=f.next=R,o|=v;if(l=l.next,l===null){if(l=i.shared.pending,l===null)break;v=l,l=v.next,v.next=null,i.lastBaseUpdate=v,i.shared.pending=null}}while(!0);if(f===null&&(u=g),i.baseState=u,i.firstBaseUpdate=h,i.lastBaseUpdate=f,e=i.shared.interleaved,e!==null){i=e;do o|=i.lane,i=i.next;while(i!==e)}else s===null&&(i.shared.lanes=0);Mr|=o,t.lanes=o,t.memoizedState=g}}function rm(t,e,n){if(t=e.effects,e.effects=null,t!==null)for(e=0;e<t.length;e++){var r=t[e],i=r.callback;if(i!==null){if(r.callback=null,r=n,typeof i!="function")throw Error(F(191,i));i.call(r)}}}var _o={},en=pr(_o),Zs=pr(_o),eo=pr(_o);function Ar(t){if(t===_o)throw Error(F(174));return t}function ad(t,e){switch(ge(eo,e),ge(Zs,t),ge(en,_o),t=e.nodeType,t){case 9:case 11:e=(e=e.documentElement)?e.namespaceURI:Rc(null,"");break;default:t=t===8?e.parentNode:e,e=t.namespaceURI||null,t=t.tagName,e=Rc(e,t)}_e(en),ge(en,e)}function Pi(){_e(en),_e(Zs),_e(eo)}function nv(t){Ar(eo.current);var e=Ar(en.current),n=Rc(e,t.type);e!==n&&(ge(Zs,t),ge(en,n))}function ld(t){Zs.current===t&&(_e(en),_e(Zs))}var Se=pr(0);function il(t){for(var e=t;e!==null;){if(e.tag===13){var n=e.memoizedState;if(n!==null&&(n=n.dehydrated,n===null||n.data==="$?"||n.data==="$!"))return e}else if(e.tag===19&&e.memoizedProps.revealOrder!==void 0){if(e.flags&128)return e}else if(e.child!==null){e.child.return=e,e=e.child;continue}if(e===t)break;for(;e.sibling===null;){if(e.return===null||e.return===t)return null;e=e.return}e.sibling.return=e.return,e=e.sibling}return null}var Ku=[];function ud(){for(var t=0;t<Ku.length;t++)Ku[t]._workInProgressVersionPrimary=null;Ku.length=0}var Aa=Nn.ReactCurrentDispatcher,Gu=Nn.ReactCurrentBatchConfig,Lr=0,ke=null,be=null,Ue=null,sl=!1,Vs=!1,to=0,LT=0;function et(){throw Error(F(321))}function cd(t,e){if(e===null)return!1;for(var n=0;n<e.length&&n<t.length;n++)if(!qt(t[n],e[n]))return!1;return!0}function hd(t,e,n,r,i,s){if(Lr=s,ke=e,e.memoizedState=null,e.updateQueue=null,e.lanes=0,Aa.current=t===null||t.memoizedState===null?UT:BT,t=n(r,i),Vs){s=0;do{if(Vs=!1,to=0,25<=s)throw Error(F(301));s+=1,Ue=be=null,e.updateQueue=null,Aa.current=zT,t=n(r,i)}while(Vs)}if(Aa.current=ol,e=be!==null&&be.next!==null,Lr=0,Ue=be=ke=null,sl=!1,e)throw Error(F(300));return t}function dd(){var t=to!==0;return to=0,t}function Yt(){var t={memoizedState:null,baseState:null,baseQueue:null,queue:null,next:null};return Ue===null?ke.memoizedState=Ue=t:Ue=Ue.next=t,Ue}function Mt(){if(be===null){var t=ke.alternate;t=t!==null?t.memoizedState:null}else t=be.next;var e=Ue===null?ke.memoizedState:Ue.next;if(e!==null)Ue=e,be=t;else{if(t===null)throw Error(F(310));be=t,t={memoizedState:be.memoizedState,baseState:be.baseState,baseQueue:be.baseQueue,queue:be.queue,next:null},Ue===null?ke.memoizedState=Ue=t:Ue=Ue.next=t}return Ue}function no(t,e){return typeof e=="function"?e(t):e}function Qu(t){var e=Mt(),n=e.queue;if(n===null)throw Error(F(311));n.lastRenderedReducer=t;var r=be,i=r.baseQueue,s=n.pending;if(s!==null){if(i!==null){var o=i.next;i.next=s.next,s.next=o}r.baseQueue=i=s,n.pending=null}if(i!==null){s=i.next,r=r.baseState;var l=o=null,u=null,h=s;do{var f=h.lane;if((Lr&f)===f)u!==null&&(u=u.next={lane:0,action:h.action,hasEagerState:h.hasEagerState,eagerState:h.eagerState,next:null}),r=h.hasEagerState?h.eagerState:t(r,h.action);else{var g={lane:f,action:h.action,hasEagerState:h.hasEagerState,eagerState:h.eagerState,next:null};u===null?(l=u=g,o=r):u=u.next=g,ke.lanes|=f,Mr|=f}h=h.next}while(h!==null&&h!==s);u===null?o=r:u.next=l,qt(r,e.memoizedState)||(gt=!0),e.memoizedState=r,e.baseState=o,e.baseQueue=u,n.lastRenderedState=r}if(t=n.interleaved,t!==null){i=t;do s=i.lane,ke.lanes|=s,Mr|=s,i=i.next;while(i!==t)}else i===null&&(n.lanes=0);return[e.memoizedState,n.dispatch]}function Yu(t){var e=Mt(),n=e.queue;if(n===null)throw Error(F(311));n.lastRenderedReducer=t;var r=n.dispatch,i=n.pending,s=e.memoizedState;if(i!==null){n.pending=null;var o=i=i.next;do s=t(s,o.action),o=o.next;while(o!==i);qt(s,e.memoizedState)||(gt=!0),e.memoizedState=s,e.baseQueue===null&&(e.baseState=s),n.lastRenderedState=s}return[s,r]}function rv(){}function iv(t,e){var n=ke,r=Mt(),i=e(),s=!qt(r.memoizedState,i);if(s&&(r.memoizedState=i,gt=!0),r=r.queue,fd(av.bind(null,n,r,t),[t]),r.getSnapshot!==e||s||Ue!==null&&Ue.memoizedState.tag&1){if(n.flags|=2048,ro(9,ov.bind(null,n,r,i,e),void 0,null),Be===null)throw Error(F(349));Lr&30||sv(n,e,i)}return i}function sv(t,e,n){t.flags|=16384,t={getSnapshot:e,value:n},e=ke.updateQueue,e===null?(e={lastEffect:null,stores:null},ke.updateQueue=e,e.stores=[t]):(n=e.stores,n===null?e.stores=[t]:n.push(t))}function ov(t,e,n,r){e.value=n,e.getSnapshot=r,lv(e)&&uv(t)}function av(t,e,n){return n(function(){lv(e)&&uv(t)})}function lv(t){var e=t.getSnapshot;t=t.value;try{var n=e();return!qt(t,n)}catch{return!0}}function uv(t){var e=In(t,1);e!==null&&Ht(e,t,1,-1)}function im(t){var e=Yt();return typeof t=="function"&&(t=t()),e.memoizedState=e.baseState=t,t={pending:null,interleaved:null,lanes:0,dispatch:null,lastRenderedReducer:no,lastRenderedState:t},e.queue=t,t=t.dispatch=jT.bind(null,ke,t),[e.memoizedState,t]}function ro(t,e,n,r){return t={tag:t,create:e,destroy:n,deps:r,next:null},e=ke.updateQueue,e===null?(e={lastEffect:null,stores:null},ke.updateQueue=e,e.lastEffect=t.next=t):(n=e.lastEffect,n===null?e.lastEffect=t.next=t:(r=n.next,n.next=t,t.next=r,e.lastEffect=t)),t}function cv(){return Mt().memoizedState}function Ca(t,e,n,r){var i=Yt();ke.flags|=t,i.memoizedState=ro(1|e,n,void 0,r===void 0?null:r)}function Ll(t,e,n,r){var i=Mt();r=r===void 0?null:r;var s=void 0;if(be!==null){var o=be.memoizedState;if(s=o.destroy,r!==null&&cd(r,o.deps)){i.memoizedState=ro(e,n,s,r);return}}ke.flags|=t,i.memoizedState=ro(1|e,n,s,r)}function sm(t,e){return Ca(8390656,8,t,e)}function fd(t,e){return Ll(2048,8,t,e)}function hv(t,e){return Ll(4,2,t,e)}function dv(t,e){return Ll(4,4,t,e)}function fv(t,e){if(typeof e=="function")return t=t(),e(t),function(){e(null)};if(e!=null)return t=t(),e.current=t,function(){e.current=null}}function pv(t,e,n){return n=n!=null?n.concat([t]):null,Ll(4,4,fv.bind(null,e,t),n)}function pd(){}function mv(t,e){var n=Mt();e=e===void 0?null:e;var r=n.memoizedState;return r!==null&&e!==null&&cd(e,r[1])?r[0]:(n.memoizedState=[t,e],t)}function gv(t,e){var n=Mt();e=e===void 0?null:e;var r=n.memoizedState;return r!==null&&e!==null&&cd(e,r[1])?r[0]:(t=t(),n.memoizedState=[t,e],t)}function yv(t,e,n){return Lr&21?(qt(n,e)||(n=Ty(),ke.lanes|=n,Mr|=n,t.baseState=!0),e):(t.baseState&&(t.baseState=!1,gt=!0),t.memoizedState=n)}function MT(t,e){var n=fe;fe=n!==0&&4>n?n:4,t(!0);var r=Gu.transition;Gu.transition={};try{t(!1),e()}finally{fe=n,Gu.transition=r}}function vv(){return Mt().memoizedState}function FT(t,e,n){var r=nr(t);if(n={lane:r,action:n,hasEagerState:!1,eagerState:null,next:null},_v(t))wv(e,n);else if(n=ev(t,e,n,r),n!==null){var i=ht();Ht(n,t,r,i),Ev(n,e,r)}}function jT(t,e,n){var r=nr(t),i={lane:r,action:n,hasEagerState:!1,eagerState:null,next:null};if(_v(t))wv(e,i);else{var s=t.alternate;if(t.lanes===0&&(s===null||s.lanes===0)&&(s=e.lastRenderedReducer,s!==null))try{var o=e.lastRenderedState,l=s(o,n);if(i.hasEagerState=!0,i.eagerState=l,qt(l,o)){var u=e.interleaved;u===null?(i.next=i,sd(e)):(i.next=u.next,u.next=i),e.interleaved=i;return}}catch{}finally{}n=ev(t,e,i,r),n!==null&&(i=ht(),Ht(n,t,r,i),Ev(n,e,r))}}function _v(t){var e=t.alternate;return t===ke||e!==null&&e===ke}function wv(t,e){Vs=sl=!0;var n=t.pending;n===null?e.next=e:(e.next=n.next,n.next=e),t.pending=e}function Ev(t,e,n){if(n&4194240){var r=e.lanes;r&=t.pendingLanes,n|=r,e.lanes=n,Hh(t,n)}}var ol={readContext:Lt,useCallback:et,useContext:et,useEffect:et,useImperativeHandle:et,useInsertionEffect:et,useLayoutEffect:et,useMemo:et,useReducer:et,useRef:et,useState:et,useDebugValue:et,useDeferredValue:et,useTransition:et,useMutableSource:et,useSyncExternalStore:et,useId:et,unstable_isNewReconciler:!1},UT={readContext:Lt,useCallback:function(t,e){return Yt().memoizedState=[t,e===void 0?null:e],t},useContext:Lt,useEffect:sm,useImperativeHandle:function(t,e,n){return n=n!=null?n.concat([t]):null,Ca(4194308,4,fv.bind(null,e,t),n)},useLayoutEffect:function(t,e){return Ca(4194308,4,t,e)},useInsertionEffect:function(t,e){return Ca(4,2,t,e)},useMemo:function(t,e){var n=Yt();return e=e===void 0?null:e,t=t(),n.memoizedState=[t,e],t},useReducer:function(t,e,n){var r=Yt();return e=n!==void 0?n(e):e,r.memoizedState=r.baseState=e,t={pending:null,interleaved:null,lanes:0,dispatch:null,lastRenderedReducer:t,lastRenderedState:e},r.queue=t,t=t.dispatch=FT.bind(null,ke,t),[r.memoizedState,t]},useRef:function(t){var e=Yt();return t={current:t},e.memoizedState=t},useState:im,useDebugValue:pd,useDeferredValue:function(t){return Yt().memoizedState=t},useTransition:function(){var t=im(!1),e=t[0];return t=MT.bind(null,t[1]),Yt().memoizedState=t,[e,t]},useMutableSource:function(){},useSyncExternalStore:function(t,e,n){var r=ke,i=Yt();if(Ee){if(n===void 0)throw Error(F(407));n=n()}else{if(n=e(),Be===null)throw Error(F(349));Lr&30||sv(r,e,n)}i.memoizedState=n;var s={value:n,getSnapshot:e};return i.queue=s,sm(av.bind(null,r,s,t),[t]),r.flags|=2048,ro(9,ov.bind(null,r,s,n,e),void 0,null),n},useId:function(){var t=Yt(),e=Be.identifierPrefix;if(Ee){var n=mn,r=pn;n=(r&~(1<<32-Wt(r)-1)).toString(32)+n,e=":"+e+"R"+n,n=to++,0<n&&(e+="H"+n.toString(32)),e+=":"}else n=LT++,e=":"+e+"r"+n.toString(32)+":";return t.memoizedState=e},unstable_isNewReconciler:!1},BT={readContext:Lt,useCallback:mv,useContext:Lt,useEffect:fd,useImperativeHandle:pv,useInsertionEffect:hv,useLayoutEffect:dv,useMemo:gv,useReducer:Qu,useRef:cv,useState:function(){return Qu(no)},useDebugValue:pd,useDeferredValue:function(t){var e=Mt();return yv(e,be.memoizedState,t)},useTransition:function(){var t=Qu(no)[0],e=Mt().memoizedState;return[t,e]},useMutableSource:rv,useSyncExternalStore:iv,useId:vv,unstable_isNewReconciler:!1},zT={readContext:Lt,useCallback:mv,useContext:Lt,useEffect:fd,useImperativeHandle:pv,useInsertionEffect:hv,useLayoutEffect:dv,useMemo:gv,useReducer:Yu,useRef:cv,useState:function(){return Yu(no)},useDebugValue:pd,useDeferredValue:function(t){var e=Mt();return be===null?e.memoizedState=t:yv(e,be.memoizedState,t)},useTransition:function(){var t=Yu(no)[0],e=Mt().memoizedState;return[t,e]},useMutableSource:rv,useSyncExternalStore:iv,useId:vv,unstable_isNewReconciler:!1};function Ut(t,e){if(t&&t.defaultProps){e=Ae({},e),t=t.defaultProps;for(var n in t)e[n]===void 0&&(e[n]=t[n]);return e}return e}function Qc(t,e,n,r){e=t.memoizedState,n=n(r,e),n=n==null?e:Ae({},e,n),t.memoizedState=n,t.lanes===0&&(t.updateQueue.baseState=n)}var Ml={isMounted:function(t){return(t=t._reactInternals)?Hr(t)===t:!1},enqueueSetState:function(t,e,n){t=t._reactInternals;var r=ht(),i=nr(t),s=_n(r,i);s.payload=e,n!=null&&(s.callback=n),e=er(t,s,i),e!==null&&(Ht(e,t,i,r),ka(e,t,i))},enqueueReplaceState:function(t,e,n){t=t._reactInternals;var r=ht(),i=nr(t),s=_n(r,i);s.tag=1,s.payload=e,n!=null&&(s.callback=n),e=er(t,s,i),e!==null&&(Ht(e,t,i,r),ka(e,t,i))},enqueueForceUpdate:function(t,e){t=t._reactInternals;var n=ht(),r=nr(t),i=_n(n,r);i.tag=2,e!=null&&(i.callback=e),e=er(t,i,r),e!==null&&(Ht(e,t,r,n),ka(e,t,r))}};function om(t,e,n,r,i,s,o){return t=t.stateNode,typeof t.shouldComponentUpdate=="function"?t.shouldComponentUpdate(r,s,o):e.prototype&&e.prototype.isPureReactComponent?!Qs(n,r)||!Qs(i,s):!0}function Tv(t,e,n){var r=!1,i=ur,s=e.contextType;return typeof s=="object"&&s!==null?s=Lt(s):(i=vt(e)?br:ot.current,r=e.contextTypes,s=(r=r!=null)?Ai(t,i):ur),e=new e(n,s),t.memoizedState=e.state!==null&&e.state!==void 0?e.state:null,e.updater=Ml,t.stateNode=e,e._reactInternals=t,r&&(t=t.stateNode,t.__reactInternalMemoizedUnmaskedChildContext=i,t.__reactInternalMemoizedMaskedChildContext=s),e}function am(t,e,n,r){t=e.state,typeof e.componentWillReceiveProps=="function"&&e.componentWillReceiveProps(n,r),typeof e.UNSAFE_componentWillReceiveProps=="function"&&e.UNSAFE_componentWillReceiveProps(n,r),e.state!==t&&Ml.enqueueReplaceState(e,e.state,null)}function Yc(t,e,n,r){var i=t.stateNode;i.props=n,i.state=t.memoizedState,i.refs={},od(t);var s=e.contextType;typeof s=="object"&&s!==null?i.context=Lt(s):(s=vt(e)?br:ot.current,i.context=Ai(t,s)),i.state=t.memoizedState,s=e.getDerivedStateFromProps,typeof s=="function"&&(Qc(t,e,s,n),i.state=t.memoizedState),typeof e.getDerivedStateFromProps=="function"||typeof i.getSnapshotBeforeUpdate=="function"||typeof i.UNSAFE_componentWillMount!="function"&&typeof i.componentWillMount!="function"||(e=i.state,typeof i.componentWillMount=="function"&&i.componentWillMount(),typeof i.UNSAFE_componentWillMount=="function"&&i.UNSAFE_componentWillMount(),e!==i.state&&Ml.enqueueReplaceState(i,i.state,null),rl(t,n,i,r),i.state=t.memoizedState),typeof i.componentDidMount=="function"&&(t.flags|=4194308)}function xi(t,e){try{var n="",r=e;do n+=gE(r),r=r.return;while(r);var i=n}catch(s){i=`
Error generating stack: `+s.message+`
`+s.stack}return{value:t,source:e,stack:i,digest:null}}function Xu(t,e,n){return{value:t,source:null,stack:n??null,digest:e??null}}function Xc(t,e){try{console.error(e.value)}catch(n){setTimeout(function(){throw n})}}var $T=typeof WeakMap=="function"?WeakMap:Map;function Iv(t,e,n){n=_n(-1,n),n.tag=3,n.payload={element:null};var r=e.value;return n.callback=function(){ll||(ll=!0,ah=r),Xc(t,e)},n}function Sv(t,e,n){n=_n(-1,n),n.tag=3;var r=t.type.getDerivedStateFromError;if(typeof r=="function"){var i=e.value;n.payload=function(){return r(i)},n.callback=function(){Xc(t,e)}}var s=t.stateNode;return s!==null&&typeof s.componentDidCatch=="function"&&(n.callback=function(){Xc(t,e),typeof r!="function"&&(tr===null?tr=new Set([this]):tr.add(this));var o=e.stack;this.componentDidCatch(e.value,{componentStack:o!==null?o:""})}),n}function lm(t,e,n){var r=t.pingCache;if(r===null){r=t.pingCache=new $T;var i=new Set;r.set(e,i)}else i=r.get(e),i===void 0&&(i=new Set,r.set(e,i));i.has(n)||(i.add(n),t=r1.bind(null,t,e,n),e.then(t,t))}function um(t){do{var e;if((e=t.tag===13)&&(e=t.memoizedState,e=e!==null?e.dehydrated!==null:!0),e)return t;t=t.return}while(t!==null);return null}function cm(t,e,n,r,i){return t.mode&1?(t.flags|=65536,t.lanes=i,t):(t===e?t.flags|=65536:(t.flags|=128,n.flags|=131072,n.flags&=-52805,n.tag===1&&(n.alternate===null?n.tag=17:(e=_n(-1,1),e.tag=2,er(n,e,1))),n.lanes|=1),t)}var WT=Nn.ReactCurrentOwner,gt=!1;function ct(t,e,n,r){e.child=t===null?Zy(e,null,n,r):Ri(e,t.child,n,r)}function hm(t,e,n,r,i){n=n.render;var s=e.ref;return _i(e,i),r=hd(t,e,n,r,s,i),n=dd(),t!==null&&!gt?(e.updateQueue=t.updateQueue,e.flags&=-2053,t.lanes&=~i,Sn(t,e,i)):(Ee&&n&&Zh(e),e.flags|=1,ct(t,e,r,i),e.child)}function dm(t,e,n,r,i){if(t===null){var s=n.type;return typeof s=="function"&&!Td(s)&&s.defaultProps===void 0&&n.compare===null&&n.defaultProps===void 0?(e.tag=15,e.type=s,kv(t,e,s,r,i)):(t=Na(n.type,null,r,e,e.mode,i),t.ref=e.ref,t.return=e,e.child=t)}if(s=t.child,!(t.lanes&i)){var o=s.memoizedProps;if(n=n.compare,n=n!==null?n:Qs,n(o,r)&&t.ref===e.ref)return Sn(t,e,i)}return e.flags|=1,t=rr(s,r),t.ref=e.ref,t.return=e,e.child=t}function kv(t,e,n,r,i){if(t!==null){var s=t.memoizedProps;if(Qs(s,r)&&t.ref===e.ref)if(gt=!1,e.pendingProps=r=s,(t.lanes&i)!==0)t.flags&131072&&(gt=!0);else return e.lanes=t.lanes,Sn(t,e,i)}return Jc(t,e,n,r,i)}function Av(t,e,n){var r=e.pendingProps,i=r.children,s=t!==null?t.memoizedState:null;if(r.mode==="hidden")if(!(e.mode&1))e.memoizedState={baseLanes:0,cachePool:null,transitions:null},ge(fi,Et),Et|=n;else{if(!(n&1073741824))return t=s!==null?s.baseLanes|n:n,e.lanes=e.childLanes=1073741824,e.memoizedState={baseLanes:t,cachePool:null,transitions:null},e.updateQueue=null,ge(fi,Et),Et|=t,null;e.memoizedState={baseLanes:0,cachePool:null,transitions:null},r=s!==null?s.baseLanes:n,ge(fi,Et),Et|=r}else s!==null?(r=s.baseLanes|n,e.memoizedState=null):r=n,ge(fi,Et),Et|=r;return ct(t,e,i,n),e.child}function Cv(t,e){var n=e.ref;(t===null&&n!==null||t!==null&&t.ref!==n)&&(e.flags|=512,e.flags|=2097152)}function Jc(t,e,n,r,i){var s=vt(n)?br:ot.current;return s=Ai(e,s),_i(e,i),n=hd(t,e,n,r,s,i),r=dd(),t!==null&&!gt?(e.updateQueue=t.updateQueue,e.flags&=-2053,t.lanes&=~i,Sn(t,e,i)):(Ee&&r&&Zh(e),e.flags|=1,ct(t,e,n,i),e.child)}function fm(t,e,n,r,i){if(vt(n)){var s=!0;Ja(e)}else s=!1;if(_i(e,i),e.stateNode===null)Ra(t,e),Tv(e,n,r),Yc(e,n,r,i),r=!0;else if(t===null){var o=e.stateNode,l=e.memoizedProps;o.props=l;var u=o.context,h=n.contextType;typeof h=="object"&&h!==null?h=Lt(h):(h=vt(n)?br:ot.current,h=Ai(e,h));var f=n.getDerivedStateFromProps,g=typeof f=="function"||typeof o.getSnapshotBeforeUpdate=="function";g||typeof o.UNSAFE_componentWillReceiveProps!="function"&&typeof o.componentWillReceiveProps!="function"||(l!==r||u!==h)&&am(e,o,r,h),Un=!1;var v=e.memoizedState;o.state=v,rl(e,r,o,i),u=e.memoizedState,l!==r||v!==u||yt.current||Un?(typeof f=="function"&&(Qc(e,n,f,r),u=e.memoizedState),(l=Un||om(e,n,l,r,v,u,h))?(g||typeof o.UNSAFE_componentWillMount!="function"&&typeof o.componentWillMount!="function"||(typeof o.componentWillMount=="function"&&o.componentWillMount(),typeof o.UNSAFE_componentWillMount=="function"&&o.UNSAFE_componentWillMount()),typeof o.componentDidMount=="function"&&(e.flags|=4194308)):(typeof o.componentDidMount=="function"&&(e.flags|=4194308),e.memoizedProps=r,e.memoizedState=u),o.props=r,o.state=u,o.context=h,r=l):(typeof o.componentDidMount=="function"&&(e.flags|=4194308),r=!1)}else{o=e.stateNode,tv(t,e),l=e.memoizedProps,h=e.type===e.elementType?l:Ut(e.type,l),o.props=h,g=e.pendingProps,v=o.context,u=n.contextType,typeof u=="object"&&u!==null?u=Lt(u):(u=vt(n)?br:ot.current,u=Ai(e,u));var R=n.getDerivedStateFromProps;(f=typeof R=="function"||typeof o.getSnapshotBeforeUpdate=="function")||typeof o.UNSAFE_componentWillReceiveProps!="function"&&typeof o.componentWillReceiveProps!="function"||(l!==g||v!==u)&&am(e,o,r,u),Un=!1,v=e.memoizedState,o.state=v,rl(e,r,o,i);var N=e.memoizedState;l!==g||v!==N||yt.current||Un?(typeof R=="function"&&(Qc(e,n,R,r),N=e.memoizedState),(h=Un||om(e,n,h,r,v,N,u)||!1)?(f||typeof o.UNSAFE_componentWillUpdate!="function"&&typeof o.componentWillUpdate!="function"||(typeof o.componentWillUpdate=="function"&&o.componentWillUpdate(r,N,u),typeof o.UNSAFE_componentWillUpdate=="function"&&o.UNSAFE_componentWillUpdate(r,N,u)),typeof o.componentDidUpdate=="function"&&(e.flags|=4),typeof o.getSnapshotBeforeUpdate=="function"&&(e.flags|=1024)):(typeof o.componentDidUpdate!="function"||l===t.memoizedProps&&v===t.memoizedState||(e.flags|=4),typeof o.getSnapshotBeforeUpdate!="function"||l===t.memoizedProps&&v===t.memoizedState||(e.flags|=1024),e.memoizedProps=r,e.memoizedState=N),o.props=r,o.state=N,o.context=u,r=h):(typeof o.componentDidUpdate!="function"||l===t.memoizedProps&&v===t.memoizedState||(e.flags|=4),typeof o.getSnapshotBeforeUpdate!="function"||l===t.memoizedProps&&v===t.memoizedState||(e.flags|=1024),r=!1)}return Zc(t,e,n,r,s,i)}function Zc(t,e,n,r,i,s){Cv(t,e);var o=(e.flags&128)!==0;if(!r&&!o)return i&&Jp(e,n,!1),Sn(t,e,s);r=e.stateNode,WT.current=e;var l=o&&typeof n.getDerivedStateFromError!="function"?null:r.render();return e.flags|=1,t!==null&&o?(e.child=Ri(e,t.child,null,s),e.child=Ri(e,null,l,s)):ct(t,e,l,s),e.memoizedState=r.state,i&&Jp(e,n,!0),e.child}function Rv(t){var e=t.stateNode;e.pendingContext?Xp(t,e.pendingContext,e.pendingContext!==e.context):e.context&&Xp(t,e.context,!1),ad(t,e.containerInfo)}function pm(t,e,n,r,i){return Ci(),td(i),e.flags|=256,ct(t,e,n,r),e.child}var eh={dehydrated:null,treeContext:null,retryLane:0};function th(t){return{baseLanes:t,cachePool:null,transitions:null}}function Pv(t,e,n){var r=e.pendingProps,i=Se.current,s=!1,o=(e.flags&128)!==0,l;if((l=o)||(l=t!==null&&t.memoizedState===null?!1:(i&2)!==0),l?(s=!0,e.flags&=-129):(t===null||t.memoizedState!==null)&&(i|=1),ge(Se,i&1),t===null)return Kc(e),t=e.memoizedState,t!==null&&(t=t.dehydrated,t!==null)?(e.mode&1?t.data==="$!"?e.lanes=8:e.lanes=1073741824:e.lanes=1,null):(o=r.children,t=r.fallback,s?(r=e.mode,s=e.child,o={mode:"hidden",children:o},!(r&1)&&s!==null?(s.childLanes=0,s.pendingProps=o):s=Ul(o,r,0,null),t=Pr(t,r,n,null),s.return=e,t.return=e,s.sibling=t,e.child=s,e.child.memoizedState=th(n),e.memoizedState=eh,t):md(e,o));if(i=t.memoizedState,i!==null&&(l=i.dehydrated,l!==null))return HT(t,e,o,r,l,i,n);if(s){s=r.fallback,o=e.mode,i=t.child,l=i.sibling;var u={mode:"hidden",children:r.children};return!(o&1)&&e.child!==i?(r=e.child,r.childLanes=0,r.pendingProps=u,e.deletions=null):(r=rr(i,u),r.subtreeFlags=i.subtreeFlags&14680064),l!==null?s=rr(l,s):(s=Pr(s,o,n,null),s.flags|=2),s.return=e,r.return=e,r.sibling=s,e.child=r,r=s,s=e.child,o=t.child.memoizedState,o=o===null?th(n):{baseLanes:o.baseLanes|n,cachePool:null,transitions:o.transitions},s.memoizedState=o,s.childLanes=t.childLanes&~n,e.memoizedState=eh,r}return s=t.child,t=s.sibling,r=rr(s,{mode:"visible",children:r.children}),!(e.mode&1)&&(r.lanes=n),r.return=e,r.sibling=null,t!==null&&(n=e.deletions,n===null?(e.deletions=[t],e.flags|=16):n.push(t)),e.child=r,e.memoizedState=null,r}function md(t,e){return e=Ul({mode:"visible",children:e},t.mode,0,null),e.return=t,t.child=e}function ua(t,e,n,r){return r!==null&&td(r),Ri(e,t.child,null,n),t=md(e,e.pendingProps.children),t.flags|=2,e.memoizedState=null,t}function HT(t,e,n,r,i,s,o){if(n)return e.flags&256?(e.flags&=-257,r=Xu(Error(F(422))),ua(t,e,o,r)):e.memoizedState!==null?(e.child=t.child,e.flags|=128,null):(s=r.fallback,i=e.mode,r=Ul({mode:"visible",children:r.children},i,0,null),s=Pr(s,i,o,null),s.flags|=2,r.return=e,s.return=e,r.sibling=s,e.child=r,e.mode&1&&Ri(e,t.child,null,o),e.child.memoizedState=th(o),e.memoizedState=eh,s);if(!(e.mode&1))return ua(t,e,o,null);if(i.data==="$!"){if(r=i.nextSibling&&i.nextSibling.dataset,r)var l=r.dgst;return r=l,s=Error(F(419)),r=Xu(s,r,void 0),ua(t,e,o,r)}if(l=(o&t.childLanes)!==0,gt||l){if(r=Be,r!==null){switch(o&-o){case 4:i=2;break;case 16:i=8;break;case 64:case 128:case 256:case 512:case 1024:case 2048:case 4096:case 8192:case 16384:case 32768:case 65536:case 131072:case 262144:case 524288:case 1048576:case 2097152:case 4194304:case 8388608:case 16777216:case 33554432:case 67108864:i=32;break;case 536870912:i=268435456;break;default:i=0}i=i&(r.suspendedLanes|o)?0:i,i!==0&&i!==s.retryLane&&(s.retryLane=i,In(t,i),Ht(r,t,i,-1))}return Ed(),r=Xu(Error(F(421))),ua(t,e,o,r)}return i.data==="$?"?(e.flags|=128,e.child=t.child,e=i1.bind(null,t),i._reactRetry=e,null):(t=s.treeContext,Tt=Zn(i.nextSibling),It=e,Ee=!0,zt=null,t!==null&&(Nt[Dt++]=pn,Nt[Dt++]=mn,Nt[Dt++]=Or,pn=t.id,mn=t.overflow,Or=e),e=md(e,r.children),e.flags|=4096,e)}function mm(t,e,n){t.lanes|=e;var r=t.alternate;r!==null&&(r.lanes|=e),Gc(t.return,e,n)}function Ju(t,e,n,r,i){var s=t.memoizedState;s===null?t.memoizedState={isBackwards:e,rendering:null,renderingStartTime:0,last:r,tail:n,tailMode:i}:(s.isBackwards=e,s.rendering=null,s.renderingStartTime=0,s.last=r,s.tail=n,s.tailMode=i)}function xv(t,e,n){var r=e.pendingProps,i=r.revealOrder,s=r.tail;if(ct(t,e,r.children,n),r=Se.current,r&2)r=r&1|2,e.flags|=128;else{if(t!==null&&t.flags&128)e:for(t=e.child;t!==null;){if(t.tag===13)t.memoizedState!==null&&mm(t,n,e);else if(t.tag===19)mm(t,n,e);else if(t.child!==null){t.child.return=t,t=t.child;continue}if(t===e)break e;for(;t.sibling===null;){if(t.return===null||t.return===e)break e;t=t.return}t.sibling.return=t.return,t=t.sibling}r&=1}if(ge(Se,r),!(e.mode&1))e.memoizedState=null;else switch(i){case"forwards":for(n=e.child,i=null;n!==null;)t=n.alternate,t!==null&&il(t)===null&&(i=n),n=n.sibling;n=i,n===null?(i=e.child,e.child=null):(i=n.sibling,n.sibling=null),Ju(e,!1,i,n,s);break;case"backwards":for(n=null,i=e.child,e.child=null;i!==null;){if(t=i.alternate,t!==null&&il(t)===null){e.child=i;break}t=i.sibling,i.sibling=n,n=i,i=t}Ju(e,!0,n,null,s);break;case"together":Ju(e,!1,null,null,void 0);break;default:e.memoizedState=null}return e.child}function Ra(t,e){!(e.mode&1)&&t!==null&&(t.alternate=null,e.alternate=null,e.flags|=2)}function Sn(t,e,n){if(t!==null&&(e.dependencies=t.dependencies),Mr|=e.lanes,!(n&e.childLanes))return null;if(t!==null&&e.child!==t.child)throw Error(F(153));if(e.child!==null){for(t=e.child,n=rr(t,t.pendingProps),e.child=n,n.return=e;t.sibling!==null;)t=t.sibling,n=n.sibling=rr(t,t.pendingProps),n.return=e;n.sibling=null}return e.child}function qT(t,e,n){switch(e.tag){case 3:Rv(e),Ci();break;case 5:nv(e);break;case 1:vt(e.type)&&Ja(e);break;case 4:ad(e,e.stateNode.containerInfo);break;case 10:var r=e.type._context,i=e.memoizedProps.value;ge(tl,r._currentValue),r._currentValue=i;break;case 13:if(r=e.memoizedState,r!==null)return r.dehydrated!==null?(ge(Se,Se.current&1),e.flags|=128,null):n&e.child.childLanes?Pv(t,e,n):(ge(Se,Se.current&1),t=Sn(t,e,n),t!==null?t.sibling:null);ge(Se,Se.current&1);break;case 19:if(r=(n&e.childLanes)!==0,t.flags&128){if(r)return xv(t,e,n);e.flags|=128}if(i=e.memoizedState,i!==null&&(i.rendering=null,i.tail=null,i.lastEffect=null),ge(Se,Se.current),r)break;return null;case 22:case 23:return e.lanes=0,Av(t,e,n)}return Sn(t,e,n)}var Nv,nh,Dv,Vv;Nv=function(t,e){for(var n=e.child;n!==null;){if(n.tag===5||n.tag===6)t.appendChild(n.stateNode);else if(n.tag!==4&&n.child!==null){n.child.return=n,n=n.child;continue}if(n===e)break;for(;n.sibling===null;){if(n.return===null||n.return===e)return;n=n.return}n.sibling.return=n.return,n=n.sibling}};nh=function(){};Dv=function(t,e,n,r){var i=t.memoizedProps;if(i!==r){t=e.stateNode,Ar(en.current);var s=null;switch(n){case"input":i=Sc(t,i),r=Sc(t,r),s=[];break;case"select":i=Ae({},i,{value:void 0}),r=Ae({},r,{value:void 0}),s=[];break;case"textarea":i=Cc(t,i),r=Cc(t,r),s=[];break;default:typeof i.onClick!="function"&&typeof r.onClick=="function"&&(t.onclick=Ya)}Pc(n,r);var o;n=null;for(h in i)if(!r.hasOwnProperty(h)&&i.hasOwnProperty(h)&&i[h]!=null)if(h==="style"){var l=i[h];for(o in l)l.hasOwnProperty(o)&&(n||(n={}),n[o]="")}else h!=="dangerouslySetInnerHTML"&&h!=="children"&&h!=="suppressContentEditableWarning"&&h!=="suppressHydrationWarning"&&h!=="autoFocus"&&(zs.hasOwnProperty(h)?s||(s=[]):(s=s||[]).push(h,null));for(h in r){var u=r[h];if(l=i!=null?i[h]:void 0,r.hasOwnProperty(h)&&u!==l&&(u!=null||l!=null))if(h==="style")if(l){for(o in l)!l.hasOwnProperty(o)||u&&u.hasOwnProperty(o)||(n||(n={}),n[o]="");for(o in u)u.hasOwnProperty(o)&&l[o]!==u[o]&&(n||(n={}),n[o]=u[o])}else n||(s||(s=[]),s.push(h,n)),n=u;else h==="dangerouslySetInnerHTML"?(u=u?u.__html:void 0,l=l?l.__html:void 0,u!=null&&l!==u&&(s=s||[]).push(h,u)):h==="children"?typeof u!="string"&&typeof u!="number"||(s=s||[]).push(h,""+u):h!=="suppressContentEditableWarning"&&h!=="suppressHydrationWarning"&&(zs.hasOwnProperty(h)?(u!=null&&h==="onScroll"&&ve("scroll",t),s||l===u||(s=[])):(s=s||[]).push(h,u))}n&&(s=s||[]).push("style",n);var h=s;(e.updateQueue=h)&&(e.flags|=4)}};Vv=function(t,e,n,r){n!==r&&(e.flags|=4)};function ms(t,e){if(!Ee)switch(t.tailMode){case"hidden":e=t.tail;for(var n=null;e!==null;)e.alternate!==null&&(n=e),e=e.sibling;n===null?t.tail=null:n.sibling=null;break;case"collapsed":n=t.tail;for(var r=null;n!==null;)n.alternate!==null&&(r=n),n=n.sibling;r===null?e||t.tail===null?t.tail=null:t.tail.sibling=null:r.sibling=null}}function tt(t){var e=t.alternate!==null&&t.alternate.child===t.child,n=0,r=0;if(e)for(var i=t.child;i!==null;)n|=i.lanes|i.childLanes,r|=i.subtreeFlags&14680064,r|=i.flags&14680064,i.return=t,i=i.sibling;else for(i=t.child;i!==null;)n|=i.lanes|i.childLanes,r|=i.subtreeFlags,r|=i.flags,i.return=t,i=i.sibling;return t.subtreeFlags|=r,t.childLanes=n,e}function KT(t,e,n){var r=e.pendingProps;switch(ed(e),e.tag){case 2:case 16:case 15:case 0:case 11:case 7:case 8:case 12:case 9:case 14:return tt(e),null;case 1:return vt(e.type)&&Xa(),tt(e),null;case 3:return r=e.stateNode,Pi(),_e(yt),_e(ot),ud(),r.pendingContext&&(r.context=r.pendingContext,r.pendingContext=null),(t===null||t.child===null)&&(aa(e)?e.flags|=4:t===null||t.memoizedState.isDehydrated&&!(e.flags&256)||(e.flags|=1024,zt!==null&&(ch(zt),zt=null))),nh(t,e),tt(e),null;case 5:ld(e);var i=Ar(eo.current);if(n=e.type,t!==null&&e.stateNode!=null)Dv(t,e,n,r,i),t.ref!==e.ref&&(e.flags|=512,e.flags|=2097152);else{if(!r){if(e.stateNode===null)throw Error(F(166));return tt(e),null}if(t=Ar(en.current),aa(e)){r=e.stateNode,n=e.type;var s=e.memoizedProps;switch(r[Xt]=e,r[Js]=s,t=(e.mode&1)!==0,n){case"dialog":ve("cancel",r),ve("close",r);break;case"iframe":case"object":case"embed":ve("load",r);break;case"video":case"audio":for(i=0;i<Ts.length;i++)ve(Ts[i],r);break;case"source":ve("error",r);break;case"img":case"image":case"link":ve("error",r),ve("load",r);break;case"details":ve("toggle",r);break;case"input":Sp(r,s),ve("invalid",r);break;case"select":r._wrapperState={wasMultiple:!!s.multiple},ve("invalid",r);break;case"textarea":Ap(r,s),ve("invalid",r)}Pc(n,s),i=null;for(var o in s)if(s.hasOwnProperty(o)){var l=s[o];o==="children"?typeof l=="string"?r.textContent!==l&&(s.suppressHydrationWarning!==!0&&oa(r.textContent,l,t),i=["children",l]):typeof l=="number"&&r.textContent!==""+l&&(s.suppressHydrationWarning!==!0&&oa(r.textContent,l,t),i=["children",""+l]):zs.hasOwnProperty(o)&&l!=null&&o==="onScroll"&&ve("scroll",r)}switch(n){case"input":Jo(r),kp(r,s,!0);break;case"textarea":Jo(r),Cp(r);break;case"select":case"option":break;default:typeof s.onClick=="function"&&(r.onclick=Ya)}r=i,e.updateQueue=r,r!==null&&(e.flags|=4)}else{o=i.nodeType===9?i:i.ownerDocument,t==="http://www.w3.org/1999/xhtml"&&(t=ay(n)),t==="http://www.w3.org/1999/xhtml"?n==="script"?(t=o.createElement("div"),t.innerHTML="<script><\/script>",t=t.removeChild(t.firstChild)):typeof r.is=="string"?t=o.createElement(n,{is:r.is}):(t=o.createElement(n),n==="select"&&(o=t,r.multiple?o.multiple=!0:r.size&&(o.size=r.size))):t=o.createElementNS(t,n),t[Xt]=e,t[Js]=r,Nv(t,e,!1,!1),e.stateNode=t;e:{switch(o=xc(n,r),n){case"dialog":ve("cancel",t),ve("close",t),i=r;break;case"iframe":case"object":case"embed":ve("load",t),i=r;break;case"video":case"audio":for(i=0;i<Ts.length;i++)ve(Ts[i],t);i=r;break;case"source":ve("error",t),i=r;break;case"img":case"image":case"link":ve("error",t),ve("load",t),i=r;break;case"details":ve("toggle",t),i=r;break;case"input":Sp(t,r),i=Sc(t,r),ve("invalid",t);break;case"option":i=r;break;case"select":t._wrapperState={wasMultiple:!!r.multiple},i=Ae({},r,{value:void 0}),ve("invalid",t);break;case"textarea":Ap(t,r),i=Cc(t,r),ve("invalid",t);break;default:i=r}Pc(n,i),l=i;for(s in l)if(l.hasOwnProperty(s)){var u=l[s];s==="style"?cy(t,u):s==="dangerouslySetInnerHTML"?(u=u?u.__html:void 0,u!=null&&ly(t,u)):s==="children"?typeof u=="string"?(n!=="textarea"||u!=="")&&$s(t,u):typeof u=="number"&&$s(t,""+u):s!=="suppressContentEditableWarning"&&s!=="suppressHydrationWarning"&&s!=="autoFocus"&&(zs.hasOwnProperty(s)?u!=null&&s==="onScroll"&&ve("scroll",t):u!=null&&jh(t,s,u,o))}switch(n){case"input":Jo(t),kp(t,r,!1);break;case"textarea":Jo(t),Cp(t);break;case"option":r.value!=null&&t.setAttribute("value",""+lr(r.value));break;case"select":t.multiple=!!r.multiple,s=r.value,s!=null?mi(t,!!r.multiple,s,!1):r.defaultValue!=null&&mi(t,!!r.multiple,r.defaultValue,!0);break;default:typeof i.onClick=="function"&&(t.onclick=Ya)}switch(n){case"button":case"input":case"select":case"textarea":r=!!r.autoFocus;break e;case"img":r=!0;break e;default:r=!1}}r&&(e.flags|=4)}e.ref!==null&&(e.flags|=512,e.flags|=2097152)}return tt(e),null;case 6:if(t&&e.stateNode!=null)Vv(t,e,t.memoizedProps,r);else{if(typeof r!="string"&&e.stateNode===null)throw Error(F(166));if(n=Ar(eo.current),Ar(en.current),aa(e)){if(r=e.stateNode,n=e.memoizedProps,r[Xt]=e,(s=r.nodeValue!==n)&&(t=It,t!==null))switch(t.tag){case 3:oa(r.nodeValue,n,(t.mode&1)!==0);break;case 5:t.memoizedProps.suppressHydrationWarning!==!0&&oa(r.nodeValue,n,(t.mode&1)!==0)}s&&(e.flags|=4)}else r=(n.nodeType===9?n:n.ownerDocument).createTextNode(r),r[Xt]=e,e.stateNode=r}return tt(e),null;case 13:if(_e(Se),r=e.memoizedState,t===null||t.memoizedState!==null&&t.memoizedState.dehydrated!==null){if(Ee&&Tt!==null&&e.mode&1&&!(e.flags&128))Xy(),Ci(),e.flags|=98560,s=!1;else if(s=aa(e),r!==null&&r.dehydrated!==null){if(t===null){if(!s)throw Error(F(318));if(s=e.memoizedState,s=s!==null?s.dehydrated:null,!s)throw Error(F(317));s[Xt]=e}else Ci(),!(e.flags&128)&&(e.memoizedState=null),e.flags|=4;tt(e),s=!1}else zt!==null&&(ch(zt),zt=null),s=!0;if(!s)return e.flags&65536?e:null}return e.flags&128?(e.lanes=n,e):(r=r!==null,r!==(t!==null&&t.memoizedState!==null)&&r&&(e.child.flags|=8192,e.mode&1&&(t===null||Se.current&1?Le===0&&(Le=3):Ed())),e.updateQueue!==null&&(e.flags|=4),tt(e),null);case 4:return Pi(),nh(t,e),t===null&&Ys(e.stateNode.containerInfo),tt(e),null;case 10:return id(e.type._context),tt(e),null;case 17:return vt(e.type)&&Xa(),tt(e),null;case 19:if(_e(Se),s=e.memoizedState,s===null)return tt(e),null;if(r=(e.flags&128)!==0,o=s.rendering,o===null)if(r)ms(s,!1);else{if(Le!==0||t!==null&&t.flags&128)for(t=e.child;t!==null;){if(o=il(t),o!==null){for(e.flags|=128,ms(s,!1),r=o.updateQueue,r!==null&&(e.updateQueue=r,e.flags|=4),e.subtreeFlags=0,r=n,n=e.child;n!==null;)s=n,t=r,s.flags&=14680066,o=s.alternate,o===null?(s.childLanes=0,s.lanes=t,s.child=null,s.subtreeFlags=0,s.memoizedProps=null,s.memoizedState=null,s.updateQueue=null,s.dependencies=null,s.stateNode=null):(s.childLanes=o.childLanes,s.lanes=o.lanes,s.child=o.child,s.subtreeFlags=0,s.deletions=null,s.memoizedProps=o.memoizedProps,s.memoizedState=o.memoizedState,s.updateQueue=o.updateQueue,s.type=o.type,t=o.dependencies,s.dependencies=t===null?null:{lanes:t.lanes,firstContext:t.firstContext}),n=n.sibling;return ge(Se,Se.current&1|2),e.child}t=t.sibling}s.tail!==null&&Ne()>Ni&&(e.flags|=128,r=!0,ms(s,!1),e.lanes=4194304)}else{if(!r)if(t=il(o),t!==null){if(e.flags|=128,r=!0,n=t.updateQueue,n!==null&&(e.updateQueue=n,e.flags|=4),ms(s,!0),s.tail===null&&s.tailMode==="hidden"&&!o.alternate&&!Ee)return tt(e),null}else 2*Ne()-s.renderingStartTime>Ni&&n!==1073741824&&(e.flags|=128,r=!0,ms(s,!1),e.lanes=4194304);s.isBackwards?(o.sibling=e.child,e.child=o):(n=s.last,n!==null?n.sibling=o:e.child=o,s.last=o)}return s.tail!==null?(e=s.tail,s.rendering=e,s.tail=e.sibling,s.renderingStartTime=Ne(),e.sibling=null,n=Se.current,ge(Se,r?n&1|2:n&1),e):(tt(e),null);case 22:case 23:return wd(),r=e.memoizedState!==null,t!==null&&t.memoizedState!==null!==r&&(e.flags|=8192),r&&e.mode&1?Et&1073741824&&(tt(e),e.subtreeFlags&6&&(e.flags|=8192)):tt(e),null;case 24:return null;case 25:return null}throw Error(F(156,e.tag))}function GT(t,e){switch(ed(e),e.tag){case 1:return vt(e.type)&&Xa(),t=e.flags,t&65536?(e.flags=t&-65537|128,e):null;case 3:return Pi(),_e(yt),_e(ot),ud(),t=e.flags,t&65536&&!(t&128)?(e.flags=t&-65537|128,e):null;case 5:return ld(e),null;case 13:if(_e(Se),t=e.memoizedState,t!==null&&t.dehydrated!==null){if(e.alternate===null)throw Error(F(340));Ci()}return t=e.flags,t&65536?(e.flags=t&-65537|128,e):null;case 19:return _e(Se),null;case 4:return Pi(),null;case 10:return id(e.type._context),null;case 22:case 23:return wd(),null;case 24:return null;default:return null}}var ca=!1,it=!1,QT=typeof WeakSet=="function"?WeakSet:Set,W=null;function di(t,e){var n=t.ref;if(n!==null)if(typeof n=="function")try{n(null)}catch(r){Pe(t,e,r)}else n.current=null}function rh(t,e,n){try{n()}catch(r){Pe(t,e,r)}}var gm=!1;function YT(t,e){if(Uc=Ka,t=Fy(),Jh(t)){if("selectionStart"in t)var n={start:t.selectionStart,end:t.selectionEnd};else e:{n=(n=t.ownerDocument)&&n.defaultView||window;var r=n.getSelection&&n.getSelection();if(r&&r.rangeCount!==0){n=r.anchorNode;var i=r.anchorOffset,s=r.focusNode;r=r.focusOffset;try{n.nodeType,s.nodeType}catch{n=null;break e}var o=0,l=-1,u=-1,h=0,f=0,g=t,v=null;t:for(;;){for(var R;g!==n||i!==0&&g.nodeType!==3||(l=o+i),g!==s||r!==0&&g.nodeType!==3||(u=o+r),g.nodeType===3&&(o+=g.nodeValue.length),(R=g.firstChild)!==null;)v=g,g=R;for(;;){if(g===t)break t;if(v===n&&++h===i&&(l=o),v===s&&++f===r&&(u=o),(R=g.nextSibling)!==null)break;g=v,v=g.parentNode}g=R}n=l===-1||u===-1?null:{start:l,end:u}}else n=null}n=n||{start:0,end:0}}else n=null;for(Bc={focusedElem:t,selectionRange:n},Ka=!1,W=e;W!==null;)if(e=W,t=e.child,(e.subtreeFlags&1028)!==0&&t!==null)t.return=e,W=t;else for(;W!==null;){e=W;try{var N=e.alternate;if(e.flags&1024)switch(e.tag){case 0:case 11:case 15:break;case 1:if(N!==null){var D=N.memoizedProps,V=N.memoizedState,S=e.stateNode,_=S.getSnapshotBeforeUpdate(e.elementType===e.type?D:Ut(e.type,D),V);S.__reactInternalSnapshotBeforeUpdate=_}break;case 3:var k=e.stateNode.containerInfo;k.nodeType===1?k.textContent="":k.nodeType===9&&k.documentElement&&k.removeChild(k.documentElement);break;case 5:case 6:case 4:case 17:break;default:throw Error(F(163))}}catch(O){Pe(e,e.return,O)}if(t=e.sibling,t!==null){t.return=e.return,W=t;break}W=e.return}return N=gm,gm=!1,N}function bs(t,e,n){var r=e.updateQueue;if(r=r!==null?r.lastEffect:null,r!==null){var i=r=r.next;do{if((i.tag&t)===t){var s=i.destroy;i.destroy=void 0,s!==void 0&&rh(e,n,s)}i=i.next}while(i!==r)}}function Fl(t,e){if(e=e.updateQueue,e=e!==null?e.lastEffect:null,e!==null){var n=e=e.next;do{if((n.tag&t)===t){var r=n.create;n.destroy=r()}n=n.next}while(n!==e)}}function ih(t){var e=t.ref;if(e!==null){var n=t.stateNode;switch(t.tag){case 5:t=n;break;default:t=n}typeof e=="function"?e(t):e.current=t}}function bv(t){var e=t.alternate;e!==null&&(t.alternate=null,bv(e)),t.child=null,t.deletions=null,t.sibling=null,t.tag===5&&(e=t.stateNode,e!==null&&(delete e[Xt],delete e[Js],delete e[Wc],delete e[DT],delete e[VT])),t.stateNode=null,t.return=null,t.dependencies=null,t.memoizedProps=null,t.memoizedState=null,t.pendingProps=null,t.stateNode=null,t.updateQueue=null}function Ov(t){return t.tag===5||t.tag===3||t.tag===4}function ym(t){e:for(;;){for(;t.sibling===null;){if(t.return===null||Ov(t.return))return null;t=t.return}for(t.sibling.return=t.return,t=t.sibling;t.tag!==5&&t.tag!==6&&t.tag!==18;){if(t.flags&2||t.child===null||t.tag===4)continue e;t.child.return=t,t=t.child}if(!(t.flags&2))return t.stateNode}}function sh(t,e,n){var r=t.tag;if(r===5||r===6)t=t.stateNode,e?n.nodeType===8?n.parentNode.insertBefore(t,e):n.insertBefore(t,e):(n.nodeType===8?(e=n.parentNode,e.insertBefore(t,n)):(e=n,e.appendChild(t)),n=n._reactRootContainer,n!=null||e.onclick!==null||(e.onclick=Ya));else if(r!==4&&(t=t.child,t!==null))for(sh(t,e,n),t=t.sibling;t!==null;)sh(t,e,n),t=t.sibling}function oh(t,e,n){var r=t.tag;if(r===5||r===6)t=t.stateNode,e?n.insertBefore(t,e):n.appendChild(t);else if(r!==4&&(t=t.child,t!==null))for(oh(t,e,n),t=t.sibling;t!==null;)oh(t,e,n),t=t.sibling}var $e=null,Bt=!1;function Ln(t,e,n){for(n=n.child;n!==null;)Lv(t,e,n),n=n.sibling}function Lv(t,e,n){if(Zt&&typeof Zt.onCommitFiberUnmount=="function")try{Zt.onCommitFiberUnmount(xl,n)}catch{}switch(n.tag){case 5:it||di(n,e);case 6:var r=$e,i=Bt;$e=null,Ln(t,e,n),$e=r,Bt=i,$e!==null&&(Bt?(t=$e,n=n.stateNode,t.nodeType===8?t.parentNode.removeChild(n):t.removeChild(n)):$e.removeChild(n.stateNode));break;case 18:$e!==null&&(Bt?(t=$e,n=n.stateNode,t.nodeType===8?Hu(t.parentNode,n):t.nodeType===1&&Hu(t,n),Ks(t)):Hu($e,n.stateNode));break;case 4:r=$e,i=Bt,$e=n.stateNode.containerInfo,Bt=!0,Ln(t,e,n),$e=r,Bt=i;break;case 0:case 11:case 14:case 15:if(!it&&(r=n.updateQueue,r!==null&&(r=r.lastEffect,r!==null))){i=r=r.next;do{var s=i,o=s.destroy;s=s.tag,o!==void 0&&(s&2||s&4)&&rh(n,e,o),i=i.next}while(i!==r)}Ln(t,e,n);break;case 1:if(!it&&(di(n,e),r=n.stateNode,typeof r.componentWillUnmount=="function"))try{r.props=n.memoizedProps,r.state=n.memoizedState,r.componentWillUnmount()}catch(l){Pe(n,e,l)}Ln(t,e,n);break;case 21:Ln(t,e,n);break;case 22:n.mode&1?(it=(r=it)||n.memoizedState!==null,Ln(t,e,n),it=r):Ln(t,e,n);break;default:Ln(t,e,n)}}function vm(t){var e=t.updateQueue;if(e!==null){t.updateQueue=null;var n=t.stateNode;n===null&&(n=t.stateNode=new QT),e.forEach(function(r){var i=s1.bind(null,t,r);n.has(r)||(n.add(r),r.then(i,i))})}}function jt(t,e){var n=e.deletions;if(n!==null)for(var r=0;r<n.length;r++){var i=n[r];try{var s=t,o=e,l=o;e:for(;l!==null;){switch(l.tag){case 5:$e=l.stateNode,Bt=!1;break e;case 3:$e=l.stateNode.containerInfo,Bt=!0;break e;case 4:$e=l.stateNode.containerInfo,Bt=!0;break e}l=l.return}if($e===null)throw Error(F(160));Lv(s,o,i),$e=null,Bt=!1;var u=i.alternate;u!==null&&(u.return=null),i.return=null}catch(h){Pe(i,e,h)}}if(e.subtreeFlags&12854)for(e=e.child;e!==null;)Mv(e,t),e=e.sibling}function Mv(t,e){var n=t.alternate,r=t.flags;switch(t.tag){case 0:case 11:case 14:case 15:if(jt(e,t),Qt(t),r&4){try{bs(3,t,t.return),Fl(3,t)}catch(D){Pe(t,t.return,D)}try{bs(5,t,t.return)}catch(D){Pe(t,t.return,D)}}break;case 1:jt(e,t),Qt(t),r&512&&n!==null&&di(n,n.return);break;case 5:if(jt(e,t),Qt(t),r&512&&n!==null&&di(n,n.return),t.flags&32){var i=t.stateNode;try{$s(i,"")}catch(D){Pe(t,t.return,D)}}if(r&4&&(i=t.stateNode,i!=null)){var s=t.memoizedProps,o=n!==null?n.memoizedProps:s,l=t.type,u=t.updateQueue;if(t.updateQueue=null,u!==null)try{l==="input"&&s.type==="radio"&&s.name!=null&&sy(i,s),xc(l,o);var h=xc(l,s);for(o=0;o<u.length;o+=2){var f=u[o],g=u[o+1];f==="style"?cy(i,g):f==="dangerouslySetInnerHTML"?ly(i,g):f==="children"?$s(i,g):jh(i,f,g,h)}switch(l){case"input":kc(i,s);break;case"textarea":oy(i,s);break;case"select":var v=i._wrapperState.wasMultiple;i._wrapperState.wasMultiple=!!s.multiple;var R=s.value;R!=null?mi(i,!!s.multiple,R,!1):v!==!!s.multiple&&(s.defaultValue!=null?mi(i,!!s.multiple,s.defaultValue,!0):mi(i,!!s.multiple,s.multiple?[]:"",!1))}i[Js]=s}catch(D){Pe(t,t.return,D)}}break;case 6:if(jt(e,t),Qt(t),r&4){if(t.stateNode===null)throw Error(F(162));i=t.stateNode,s=t.memoizedProps;try{i.nodeValue=s}catch(D){Pe(t,t.return,D)}}break;case 3:if(jt(e,t),Qt(t),r&4&&n!==null&&n.memoizedState.isDehydrated)try{Ks(e.containerInfo)}catch(D){Pe(t,t.return,D)}break;case 4:jt(e,t),Qt(t);break;case 13:jt(e,t),Qt(t),i=t.child,i.flags&8192&&(s=i.memoizedState!==null,i.stateNode.isHidden=s,!s||i.alternate!==null&&i.alternate.memoizedState!==null||(vd=Ne())),r&4&&vm(t);break;case 22:if(f=n!==null&&n.memoizedState!==null,t.mode&1?(it=(h=it)||f,jt(e,t),it=h):jt(e,t),Qt(t),r&8192){if(h=t.memoizedState!==null,(t.stateNode.isHidden=h)&&!f&&t.mode&1)for(W=t,f=t.child;f!==null;){for(g=W=f;W!==null;){switch(v=W,R=v.child,v.tag){case 0:case 11:case 14:case 15:bs(4,v,v.return);break;case 1:di(v,v.return);var N=v.stateNode;if(typeof N.componentWillUnmount=="function"){r=v,n=v.return;try{e=r,N.props=e.memoizedProps,N.state=e.memoizedState,N.componentWillUnmount()}catch(D){Pe(r,n,D)}}break;case 5:di(v,v.return);break;case 22:if(v.memoizedState!==null){wm(g);continue}}R!==null?(R.return=v,W=R):wm(g)}f=f.sibling}e:for(f=null,g=t;;){if(g.tag===5){if(f===null){f=g;try{i=g.stateNode,h?(s=i.style,typeof s.setProperty=="function"?s.setProperty("display","none","important"):s.display="none"):(l=g.stateNode,u=g.memoizedProps.style,o=u!=null&&u.hasOwnProperty("display")?u.display:null,l.style.display=uy("display",o))}catch(D){Pe(t,t.return,D)}}}else if(g.tag===6){if(f===null)try{g.stateNode.nodeValue=h?"":g.memoizedProps}catch(D){Pe(t,t.return,D)}}else if((g.tag!==22&&g.tag!==23||g.memoizedState===null||g===t)&&g.child!==null){g.child.return=g,g=g.child;continue}if(g===t)break e;for(;g.sibling===null;){if(g.return===null||g.return===t)break e;f===g&&(f=null),g=g.return}f===g&&(f=null),g.sibling.return=g.return,g=g.sibling}}break;case 19:jt(e,t),Qt(t),r&4&&vm(t);break;case 21:break;default:jt(e,t),Qt(t)}}function Qt(t){var e=t.flags;if(e&2){try{e:{for(var n=t.return;n!==null;){if(Ov(n)){var r=n;break e}n=n.return}throw Error(F(160))}switch(r.tag){case 5:var i=r.stateNode;r.flags&32&&($s(i,""),r.flags&=-33);var s=ym(t);oh(t,s,i);break;case 3:case 4:var o=r.stateNode.containerInfo,l=ym(t);sh(t,l,o);break;default:throw Error(F(161))}}catch(u){Pe(t,t.return,u)}t.flags&=-3}e&4096&&(t.flags&=-4097)}function XT(t,e,n){W=t,Fv(t)}function Fv(t,e,n){for(var r=(t.mode&1)!==0;W!==null;){var i=W,s=i.child;if(i.tag===22&&r){var o=i.memoizedState!==null||ca;if(!o){var l=i.alternate,u=l!==null&&l.memoizedState!==null||it;l=ca;var h=it;if(ca=o,(it=u)&&!h)for(W=i;W!==null;)o=W,u=o.child,o.tag===22&&o.memoizedState!==null?Em(i):u!==null?(u.return=o,W=u):Em(i);for(;s!==null;)W=s,Fv(s),s=s.sibling;W=i,ca=l,it=h}_m(t)}else i.subtreeFlags&8772&&s!==null?(s.return=i,W=s):_m(t)}}function _m(t){for(;W!==null;){var e=W;if(e.flags&8772){var n=e.alternate;try{if(e.flags&8772)switch(e.tag){case 0:case 11:case 15:it||Fl(5,e);break;case 1:var r=e.stateNode;if(e.flags&4&&!it)if(n===null)r.componentDidMount();else{var i=e.elementType===e.type?n.memoizedProps:Ut(e.type,n.memoizedProps);r.componentDidUpdate(i,n.memoizedState,r.__reactInternalSnapshotBeforeUpdate)}var s=e.updateQueue;s!==null&&rm(e,s,r);break;case 3:var o=e.updateQueue;if(o!==null){if(n=null,e.child!==null)switch(e.child.tag){case 5:n=e.child.stateNode;break;case 1:n=e.child.stateNode}rm(e,o,n)}break;case 5:var l=e.stateNode;if(n===null&&e.flags&4){n=l;var u=e.memoizedProps;switch(e.type){case"button":case"input":case"select":case"textarea":u.autoFocus&&n.focus();break;case"img":u.src&&(n.src=u.src)}}break;case 6:break;case 4:break;case 12:break;case 13:if(e.memoizedState===null){var h=e.alternate;if(h!==null){var f=h.memoizedState;if(f!==null){var g=f.dehydrated;g!==null&&Ks(g)}}}break;case 19:case 17:case 21:case 22:case 23:case 25:break;default:throw Error(F(163))}it||e.flags&512&&ih(e)}catch(v){Pe(e,e.return,v)}}if(e===t){W=null;break}if(n=e.sibling,n!==null){n.return=e.return,W=n;break}W=e.return}}function wm(t){for(;W!==null;){var e=W;if(e===t){W=null;break}var n=e.sibling;if(n!==null){n.return=e.return,W=n;break}W=e.return}}function Em(t){for(;W!==null;){var e=W;try{switch(e.tag){case 0:case 11:case 15:var n=e.return;try{Fl(4,e)}catch(u){Pe(e,n,u)}break;case 1:var r=e.stateNode;if(typeof r.componentDidMount=="function"){var i=e.return;try{r.componentDidMount()}catch(u){Pe(e,i,u)}}var s=e.return;try{ih(e)}catch(u){Pe(e,s,u)}break;case 5:var o=e.return;try{ih(e)}catch(u){Pe(e,o,u)}}}catch(u){Pe(e,e.return,u)}if(e===t){W=null;break}var l=e.sibling;if(l!==null){l.return=e.return,W=l;break}W=e.return}}var JT=Math.ceil,al=Nn.ReactCurrentDispatcher,gd=Nn.ReactCurrentOwner,Ot=Nn.ReactCurrentBatchConfig,ae=0,Be=null,Ve=null,qe=0,Et=0,fi=pr(0),Le=0,io=null,Mr=0,jl=0,yd=0,Os=null,mt=null,vd=0,Ni=1/0,dn=null,ll=!1,ah=null,tr=null,ha=!1,Gn=null,ul=0,Ls=0,lh=null,Pa=-1,xa=0;function ht(){return ae&6?Ne():Pa!==-1?Pa:Pa=Ne()}function nr(t){return t.mode&1?ae&2&&qe!==0?qe&-qe:OT.transition!==null?(xa===0&&(xa=Ty()),xa):(t=fe,t!==0||(t=window.event,t=t===void 0?16:Py(t.type)),t):1}function Ht(t,e,n,r){if(50<Ls)throw Ls=0,lh=null,Error(F(185));go(t,n,r),(!(ae&2)||t!==Be)&&(t===Be&&(!(ae&2)&&(jl|=n),Le===4&&zn(t,qe)),_t(t,r),n===1&&ae===0&&!(e.mode&1)&&(Ni=Ne()+500,Ol&&mr()))}function _t(t,e){var n=t.callbackNode;OE(t,e);var r=qa(t,t===Be?qe:0);if(r===0)n!==null&&xp(n),t.callbackNode=null,t.callbackPriority=0;else if(e=r&-r,t.callbackPriority!==e){if(n!=null&&xp(n),e===1)t.tag===0?bT(Tm.bind(null,t)):Gy(Tm.bind(null,t)),xT(function(){!(ae&6)&&mr()}),n=null;else{switch(Iy(r)){case 1:n=Wh;break;case 4:n=wy;break;case 16:n=Ha;break;case 536870912:n=Ey;break;default:n=Ha}n=qv(n,jv.bind(null,t))}t.callbackPriority=e,t.callbackNode=n}}function jv(t,e){if(Pa=-1,xa=0,ae&6)throw Error(F(327));var n=t.callbackNode;if(wi()&&t.callbackNode!==n)return null;var r=qa(t,t===Be?qe:0);if(r===0)return null;if(r&30||r&t.expiredLanes||e)e=cl(t,r);else{e=r;var i=ae;ae|=2;var s=Bv();(Be!==t||qe!==e)&&(dn=null,Ni=Ne()+500,Rr(t,e));do try{t1();break}catch(l){Uv(t,l)}while(!0);rd(),al.current=s,ae=i,Ve!==null?e=0:(Be=null,qe=0,e=Le)}if(e!==0){if(e===2&&(i=Oc(t),i!==0&&(r=i,e=uh(t,i))),e===1)throw n=io,Rr(t,0),zn(t,r),_t(t,Ne()),n;if(e===6)zn(t,r);else{if(i=t.current.alternate,!(r&30)&&!ZT(i)&&(e=cl(t,r),e===2&&(s=Oc(t),s!==0&&(r=s,e=uh(t,s))),e===1))throw n=io,Rr(t,0),zn(t,r),_t(t,Ne()),n;switch(t.finishedWork=i,t.finishedLanes=r,e){case 0:case 1:throw Error(F(345));case 2:Tr(t,mt,dn);break;case 3:if(zn(t,r),(r&130023424)===r&&(e=vd+500-Ne(),10<e)){if(qa(t,0)!==0)break;if(i=t.suspendedLanes,(i&r)!==r){ht(),t.pingedLanes|=t.suspendedLanes&i;break}t.timeoutHandle=$c(Tr.bind(null,t,mt,dn),e);break}Tr(t,mt,dn);break;case 4:if(zn(t,r),(r&4194240)===r)break;for(e=t.eventTimes,i=-1;0<r;){var o=31-Wt(r);s=1<<o,o=e[o],o>i&&(i=o),r&=~s}if(r=i,r=Ne()-r,r=(120>r?120:480>r?480:1080>r?1080:1920>r?1920:3e3>r?3e3:4320>r?4320:1960*JT(r/1960))-r,10<r){t.timeoutHandle=$c(Tr.bind(null,t,mt,dn),r);break}Tr(t,mt,dn);break;case 5:Tr(t,mt,dn);break;default:throw Error(F(329))}}}return _t(t,Ne()),t.callbackNode===n?jv.bind(null,t):null}function uh(t,e){var n=Os;return t.current.memoizedState.isDehydrated&&(Rr(t,e).flags|=256),t=cl(t,e),t!==2&&(e=mt,mt=n,e!==null&&ch(e)),t}function ch(t){mt===null?mt=t:mt.push.apply(mt,t)}function ZT(t){for(var e=t;;){if(e.flags&16384){var n=e.updateQueue;if(n!==null&&(n=n.stores,n!==null))for(var r=0;r<n.length;r++){var i=n[r],s=i.getSnapshot;i=i.value;try{if(!qt(s(),i))return!1}catch{return!1}}}if(n=e.child,e.subtreeFlags&16384&&n!==null)n.return=e,e=n;else{if(e===t)break;for(;e.sibling===null;){if(e.return===null||e.return===t)return!0;e=e.return}e.sibling.return=e.return,e=e.sibling}}return!0}function zn(t,e){for(e&=~yd,e&=~jl,t.suspendedLanes|=e,t.pingedLanes&=~e,t=t.expirationTimes;0<e;){var n=31-Wt(e),r=1<<n;t[n]=-1,e&=~r}}function Tm(t){if(ae&6)throw Error(F(327));wi();var e=qa(t,0);if(!(e&1))return _t(t,Ne()),null;var n=cl(t,e);if(t.tag!==0&&n===2){var r=Oc(t);r!==0&&(e=r,n=uh(t,r))}if(n===1)throw n=io,Rr(t,0),zn(t,e),_t(t,Ne()),n;if(n===6)throw Error(F(345));return t.finishedWork=t.current.alternate,t.finishedLanes=e,Tr(t,mt,dn),_t(t,Ne()),null}function _d(t,e){var n=ae;ae|=1;try{return t(e)}finally{ae=n,ae===0&&(Ni=Ne()+500,Ol&&mr())}}function Fr(t){Gn!==null&&Gn.tag===0&&!(ae&6)&&wi();var e=ae;ae|=1;var n=Ot.transition,r=fe;try{if(Ot.transition=null,fe=1,t)return t()}finally{fe=r,Ot.transition=n,ae=e,!(ae&6)&&mr()}}function wd(){Et=fi.current,_e(fi)}function Rr(t,e){t.finishedWork=null,t.finishedLanes=0;var n=t.timeoutHandle;if(n!==-1&&(t.timeoutHandle=-1,PT(n)),Ve!==null)for(n=Ve.return;n!==null;){var r=n;switch(ed(r),r.tag){case 1:r=r.type.childContextTypes,r!=null&&Xa();break;case 3:Pi(),_e(yt),_e(ot),ud();break;case 5:ld(r);break;case 4:Pi();break;case 13:_e(Se);break;case 19:_e(Se);break;case 10:id(r.type._context);break;case 22:case 23:wd()}n=n.return}if(Be=t,Ve=t=rr(t.current,null),qe=Et=e,Le=0,io=null,yd=jl=Mr=0,mt=Os=null,kr!==null){for(e=0;e<kr.length;e++)if(n=kr[e],r=n.interleaved,r!==null){n.interleaved=null;var i=r.next,s=n.pending;if(s!==null){var o=s.next;s.next=i,r.next=o}n.pending=r}kr=null}return t}function Uv(t,e){do{var n=Ve;try{if(rd(),Aa.current=ol,sl){for(var r=ke.memoizedState;r!==null;){var i=r.queue;i!==null&&(i.pending=null),r=r.next}sl=!1}if(Lr=0,Ue=be=ke=null,Vs=!1,to=0,gd.current=null,n===null||n.return===null){Le=1,io=e,Ve=null;break}e:{var s=t,o=n.return,l=n,u=e;if(e=qe,l.flags|=32768,u!==null&&typeof u=="object"&&typeof u.then=="function"){var h=u,f=l,g=f.tag;if(!(f.mode&1)&&(g===0||g===11||g===15)){var v=f.alternate;v?(f.updateQueue=v.updateQueue,f.memoizedState=v.memoizedState,f.lanes=v.lanes):(f.updateQueue=null,f.memoizedState=null)}var R=um(o);if(R!==null){R.flags&=-257,cm(R,o,l,s,e),R.mode&1&&lm(s,h,e),e=R,u=h;var N=e.updateQueue;if(N===null){var D=new Set;D.add(u),e.updateQueue=D}else N.add(u);break e}else{if(!(e&1)){lm(s,h,e),Ed();break e}u=Error(F(426))}}else if(Ee&&l.mode&1){var V=um(o);if(V!==null){!(V.flags&65536)&&(V.flags|=256),cm(V,o,l,s,e),td(xi(u,l));break e}}s=u=xi(u,l),Le!==4&&(Le=2),Os===null?Os=[s]:Os.push(s),s=o;do{switch(s.tag){case 3:s.flags|=65536,e&=-e,s.lanes|=e;var S=Iv(s,u,e);nm(s,S);break e;case 1:l=u;var _=s.type,k=s.stateNode;if(!(s.flags&128)&&(typeof _.getDerivedStateFromError=="function"||k!==null&&typeof k.componentDidCatch=="function"&&(tr===null||!tr.has(k)))){s.flags|=65536,e&=-e,s.lanes|=e;var O=Sv(s,l,e);nm(s,O);break e}}s=s.return}while(s!==null)}$v(n)}catch(U){e=U,Ve===n&&n!==null&&(Ve=n=n.return);continue}break}while(!0)}function Bv(){var t=al.current;return al.current=ol,t===null?ol:t}function Ed(){(Le===0||Le===3||Le===2)&&(Le=4),Be===null||!(Mr&268435455)&&!(jl&268435455)||zn(Be,qe)}function cl(t,e){var n=ae;ae|=2;var r=Bv();(Be!==t||qe!==e)&&(dn=null,Rr(t,e));do try{e1();break}catch(i){Uv(t,i)}while(!0);if(rd(),ae=n,al.current=r,Ve!==null)throw Error(F(261));return Be=null,qe=0,Le}function e1(){for(;Ve!==null;)zv(Ve)}function t1(){for(;Ve!==null&&!AE();)zv(Ve)}function zv(t){var e=Hv(t.alternate,t,Et);t.memoizedProps=t.pendingProps,e===null?$v(t):Ve=e,gd.current=null}function $v(t){var e=t;do{var n=e.alternate;if(t=e.return,e.flags&32768){if(n=GT(n,e),n!==null){n.flags&=32767,Ve=n;return}if(t!==null)t.flags|=32768,t.subtreeFlags=0,t.deletions=null;else{Le=6,Ve=null;return}}else if(n=KT(n,e,Et),n!==null){Ve=n;return}if(e=e.sibling,e!==null){Ve=e;return}Ve=e=t}while(e!==null);Le===0&&(Le=5)}function Tr(t,e,n){var r=fe,i=Ot.transition;try{Ot.transition=null,fe=1,n1(t,e,n,r)}finally{Ot.transition=i,fe=r}return null}function n1(t,e,n,r){do wi();while(Gn!==null);if(ae&6)throw Error(F(327));n=t.finishedWork;var i=t.finishedLanes;if(n===null)return null;if(t.finishedWork=null,t.finishedLanes=0,n===t.current)throw Error(F(177));t.callbackNode=null,t.callbackPriority=0;var s=n.lanes|n.childLanes;if(LE(t,s),t===Be&&(Ve=Be=null,qe=0),!(n.subtreeFlags&2064)&&!(n.flags&2064)||ha||(ha=!0,qv(Ha,function(){return wi(),null})),s=(n.flags&15990)!==0,n.subtreeFlags&15990||s){s=Ot.transition,Ot.transition=null;var o=fe;fe=1;var l=ae;ae|=4,gd.current=null,YT(t,n),Mv(n,t),TT(Bc),Ka=!!Uc,Bc=Uc=null,t.current=n,XT(n),CE(),ae=l,fe=o,Ot.transition=s}else t.current=n;if(ha&&(ha=!1,Gn=t,ul=i),s=t.pendingLanes,s===0&&(tr=null),xE(n.stateNode),_t(t,Ne()),e!==null)for(r=t.onRecoverableError,n=0;n<e.length;n++)i=e[n],r(i.value,{componentStack:i.stack,digest:i.digest});if(ll)throw ll=!1,t=ah,ah=null,t;return ul&1&&t.tag!==0&&wi(),s=t.pendingLanes,s&1?t===lh?Ls++:(Ls=0,lh=t):Ls=0,mr(),null}function wi(){if(Gn!==null){var t=Iy(ul),e=Ot.transition,n=fe;try{if(Ot.transition=null,fe=16>t?16:t,Gn===null)var r=!1;else{if(t=Gn,Gn=null,ul=0,ae&6)throw Error(F(331));var i=ae;for(ae|=4,W=t.current;W!==null;){var s=W,o=s.child;if(W.flags&16){var l=s.deletions;if(l!==null){for(var u=0;u<l.length;u++){var h=l[u];for(W=h;W!==null;){var f=W;switch(f.tag){case 0:case 11:case 15:bs(8,f,s)}var g=f.child;if(g!==null)g.return=f,W=g;else for(;W!==null;){f=W;var v=f.sibling,R=f.return;if(bv(f),f===h){W=null;break}if(v!==null){v.return=R,W=v;break}W=R}}}var N=s.alternate;if(N!==null){var D=N.child;if(D!==null){N.child=null;do{var V=D.sibling;D.sibling=null,D=V}while(D!==null)}}W=s}}if(s.subtreeFlags&2064&&o!==null)o.return=s,W=o;else e:for(;W!==null;){if(s=W,s.flags&2048)switch(s.tag){case 0:case 11:case 15:bs(9,s,s.return)}var S=s.sibling;if(S!==null){S.return=s.return,W=S;break e}W=s.return}}var _=t.current;for(W=_;W!==null;){o=W;var k=o.child;if(o.subtreeFlags&2064&&k!==null)k.return=o,W=k;else e:for(o=_;W!==null;){if(l=W,l.flags&2048)try{switch(l.tag){case 0:case 11:case 15:Fl(9,l)}}catch(U){Pe(l,l.return,U)}if(l===o){W=null;break e}var O=l.sibling;if(O!==null){O.return=l.return,W=O;break e}W=l.return}}if(ae=i,mr(),Zt&&typeof Zt.onPostCommitFiberRoot=="function")try{Zt.onPostCommitFiberRoot(xl,t)}catch{}r=!0}return r}finally{fe=n,Ot.transition=e}}return!1}function Im(t,e,n){e=xi(n,e),e=Iv(t,e,1),t=er(t,e,1),e=ht(),t!==null&&(go(t,1,e),_t(t,e))}function Pe(t,e,n){if(t.tag===3)Im(t,t,n);else for(;e!==null;){if(e.tag===3){Im(e,t,n);break}else if(e.tag===1){var r=e.stateNode;if(typeof e.type.getDerivedStateFromError=="function"||typeof r.componentDidCatch=="function"&&(tr===null||!tr.has(r))){t=xi(n,t),t=Sv(e,t,1),e=er(e,t,1),t=ht(),e!==null&&(go(e,1,t),_t(e,t));break}}e=e.return}}function r1(t,e,n){var r=t.pingCache;r!==null&&r.delete(e),e=ht(),t.pingedLanes|=t.suspendedLanes&n,Be===t&&(qe&n)===n&&(Le===4||Le===3&&(qe&130023424)===qe&&500>Ne()-vd?Rr(t,0):yd|=n),_t(t,e)}function Wv(t,e){e===0&&(t.mode&1?(e=ta,ta<<=1,!(ta&130023424)&&(ta=4194304)):e=1);var n=ht();t=In(t,e),t!==null&&(go(t,e,n),_t(t,n))}function i1(t){var e=t.memoizedState,n=0;e!==null&&(n=e.retryLane),Wv(t,n)}function s1(t,e){var n=0;switch(t.tag){case 13:var r=t.stateNode,i=t.memoizedState;i!==null&&(n=i.retryLane);break;case 19:r=t.stateNode;break;default:throw Error(F(314))}r!==null&&r.delete(e),Wv(t,n)}var Hv;Hv=function(t,e,n){if(t!==null)if(t.memoizedProps!==e.pendingProps||yt.current)gt=!0;else{if(!(t.lanes&n)&&!(e.flags&128))return gt=!1,qT(t,e,n);gt=!!(t.flags&131072)}else gt=!1,Ee&&e.flags&1048576&&Qy(e,el,e.index);switch(e.lanes=0,e.tag){case 2:var r=e.type;Ra(t,e),t=e.pendingProps;var i=Ai(e,ot.current);_i(e,n),i=hd(null,e,r,t,i,n);var s=dd();return e.flags|=1,typeof i=="object"&&i!==null&&typeof i.render=="function"&&i.$$typeof===void 0?(e.tag=1,e.memoizedState=null,e.updateQueue=null,vt(r)?(s=!0,Ja(e)):s=!1,e.memoizedState=i.state!==null&&i.state!==void 0?i.state:null,od(e),i.updater=Ml,e.stateNode=i,i._reactInternals=e,Yc(e,r,t,n),e=Zc(null,e,r,!0,s,n)):(e.tag=0,Ee&&s&&Zh(e),ct(null,e,i,n),e=e.child),e;case 16:r=e.elementType;e:{switch(Ra(t,e),t=e.pendingProps,i=r._init,r=i(r._payload),e.type=r,i=e.tag=a1(r),t=Ut(r,t),i){case 0:e=Jc(null,e,r,t,n);break e;case 1:e=fm(null,e,r,t,n);break e;case 11:e=hm(null,e,r,t,n);break e;case 14:e=dm(null,e,r,Ut(r.type,t),n);break e}throw Error(F(306,r,""))}return e;case 0:return r=e.type,i=e.pendingProps,i=e.elementType===r?i:Ut(r,i),Jc(t,e,r,i,n);case 1:return r=e.type,i=e.pendingProps,i=e.elementType===r?i:Ut(r,i),fm(t,e,r,i,n);case 3:e:{if(Rv(e),t===null)throw Error(F(387));r=e.pendingProps,s=e.memoizedState,i=s.element,tv(t,e),rl(e,r,null,n);var o=e.memoizedState;if(r=o.element,s.isDehydrated)if(s={element:r,isDehydrated:!1,cache:o.cache,pendingSuspenseBoundaries:o.pendingSuspenseBoundaries,transitions:o.transitions},e.updateQueue.baseState=s,e.memoizedState=s,e.flags&256){i=xi(Error(F(423)),e),e=pm(t,e,r,n,i);break e}else if(r!==i){i=xi(Error(F(424)),e),e=pm(t,e,r,n,i);break e}else for(Tt=Zn(e.stateNode.containerInfo.firstChild),It=e,Ee=!0,zt=null,n=Zy(e,null,r,n),e.child=n;n;)n.flags=n.flags&-3|4096,n=n.sibling;else{if(Ci(),r===i){e=Sn(t,e,n);break e}ct(t,e,r,n)}e=e.child}return e;case 5:return nv(e),t===null&&Kc(e),r=e.type,i=e.pendingProps,s=t!==null?t.memoizedProps:null,o=i.children,zc(r,i)?o=null:s!==null&&zc(r,s)&&(e.flags|=32),Cv(t,e),ct(t,e,o,n),e.child;case 6:return t===null&&Kc(e),null;case 13:return Pv(t,e,n);case 4:return ad(e,e.stateNode.containerInfo),r=e.pendingProps,t===null?e.child=Ri(e,null,r,n):ct(t,e,r,n),e.child;case 11:return r=e.type,i=e.pendingProps,i=e.elementType===r?i:Ut(r,i),hm(t,e,r,i,n);case 7:return ct(t,e,e.pendingProps,n),e.child;case 8:return ct(t,e,e.pendingProps.children,n),e.child;case 12:return ct(t,e,e.pendingProps.children,n),e.child;case 10:e:{if(r=e.type._context,i=e.pendingProps,s=e.memoizedProps,o=i.value,ge(tl,r._currentValue),r._currentValue=o,s!==null)if(qt(s.value,o)){if(s.children===i.children&&!yt.current){e=Sn(t,e,n);break e}}else for(s=e.child,s!==null&&(s.return=e);s!==null;){var l=s.dependencies;if(l!==null){o=s.child;for(var u=l.firstContext;u!==null;){if(u.context===r){if(s.tag===1){u=_n(-1,n&-n),u.tag=2;var h=s.updateQueue;if(h!==null){h=h.shared;var f=h.pending;f===null?u.next=u:(u.next=f.next,f.next=u),h.pending=u}}s.lanes|=n,u=s.alternate,u!==null&&(u.lanes|=n),Gc(s.return,n,e),l.lanes|=n;break}u=u.next}}else if(s.tag===10)o=s.type===e.type?null:s.child;else if(s.tag===18){if(o=s.return,o===null)throw Error(F(341));o.lanes|=n,l=o.alternate,l!==null&&(l.lanes|=n),Gc(o,n,e),o=s.sibling}else o=s.child;if(o!==null)o.return=s;else for(o=s;o!==null;){if(o===e){o=null;break}if(s=o.sibling,s!==null){s.return=o.return,o=s;break}o=o.return}s=o}ct(t,e,i.children,n),e=e.child}return e;case 9:return i=e.type,r=e.pendingProps.children,_i(e,n),i=Lt(i),r=r(i),e.flags|=1,ct(t,e,r,n),e.child;case 14:return r=e.type,i=Ut(r,e.pendingProps),i=Ut(r.type,i),dm(t,e,r,i,n);case 15:return kv(t,e,e.type,e.pendingProps,n);case 17:return r=e.type,i=e.pendingProps,i=e.elementType===r?i:Ut(r,i),Ra(t,e),e.tag=1,vt(r)?(t=!0,Ja(e)):t=!1,_i(e,n),Tv(e,r,i),Yc(e,r,i,n),Zc(null,e,r,!0,t,n);case 19:return xv(t,e,n);case 22:return Av(t,e,n)}throw Error(F(156,e.tag))};function qv(t,e){return _y(t,e)}function o1(t,e,n,r){this.tag=t,this.key=n,this.sibling=this.child=this.return=this.stateNode=this.type=this.elementType=null,this.index=0,this.ref=null,this.pendingProps=e,this.dependencies=this.memoizedState=this.updateQueue=this.memoizedProps=null,this.mode=r,this.subtreeFlags=this.flags=0,this.deletions=null,this.childLanes=this.lanes=0,this.alternate=null}function bt(t,e,n,r){return new o1(t,e,n,r)}function Td(t){return t=t.prototype,!(!t||!t.isReactComponent)}function a1(t){if(typeof t=="function")return Td(t)?1:0;if(t!=null){if(t=t.$$typeof,t===Bh)return 11;if(t===zh)return 14}return 2}function rr(t,e){var n=t.alternate;return n===null?(n=bt(t.tag,e,t.key,t.mode),n.elementType=t.elementType,n.type=t.type,n.stateNode=t.stateNode,n.alternate=t,t.alternate=n):(n.pendingProps=e,n.type=t.type,n.flags=0,n.subtreeFlags=0,n.deletions=null),n.flags=t.flags&14680064,n.childLanes=t.childLanes,n.lanes=t.lanes,n.child=t.child,n.memoizedProps=t.memoizedProps,n.memoizedState=t.memoizedState,n.updateQueue=t.updateQueue,e=t.dependencies,n.dependencies=e===null?null:{lanes:e.lanes,firstContext:e.firstContext},n.sibling=t.sibling,n.index=t.index,n.ref=t.ref,n}function Na(t,e,n,r,i,s){var o=2;if(r=t,typeof t=="function")Td(t)&&(o=1);else if(typeof t=="string")o=5;else e:switch(t){case ri:return Pr(n.children,i,s,e);case Uh:o=8,i|=8;break;case wc:return t=bt(12,n,e,i|2),t.elementType=wc,t.lanes=s,t;case Ec:return t=bt(13,n,e,i),t.elementType=Ec,t.lanes=s,t;case Tc:return t=bt(19,n,e,i),t.elementType=Tc,t.lanes=s,t;case ny:return Ul(n,i,s,e);default:if(typeof t=="object"&&t!==null)switch(t.$$typeof){case ey:o=10;break e;case ty:o=9;break e;case Bh:o=11;break e;case zh:o=14;break e;case jn:o=16,r=null;break e}throw Error(F(130,t==null?t:typeof t,""))}return e=bt(o,n,e,i),e.elementType=t,e.type=r,e.lanes=s,e}function Pr(t,e,n,r){return t=bt(7,t,r,e),t.lanes=n,t}function Ul(t,e,n,r){return t=bt(22,t,r,e),t.elementType=ny,t.lanes=n,t.stateNode={isHidden:!1},t}function Zu(t,e,n){return t=bt(6,t,null,e),t.lanes=n,t}function ec(t,e,n){return e=bt(4,t.children!==null?t.children:[],t.key,e),e.lanes=n,e.stateNode={containerInfo:t.containerInfo,pendingChildren:null,implementation:t.implementation},e}function l1(t,e,n,r,i){this.tag=e,this.containerInfo=t,this.finishedWork=this.pingCache=this.current=this.pendingChildren=null,this.timeoutHandle=-1,this.callbackNode=this.pendingContext=this.context=null,this.callbackPriority=0,this.eventTimes=bu(0),this.expirationTimes=bu(-1),this.entangledLanes=this.finishedLanes=this.mutableReadLanes=this.expiredLanes=this.pingedLanes=this.suspendedLanes=this.pendingLanes=0,this.entanglements=bu(0),this.identifierPrefix=r,this.onRecoverableError=i,this.mutableSourceEagerHydrationData=null}function Id(t,e,n,r,i,s,o,l,u){return t=new l1(t,e,n,l,u),e===1?(e=1,s===!0&&(e|=8)):e=0,s=bt(3,null,null,e),t.current=s,s.stateNode=t,s.memoizedState={element:r,isDehydrated:n,cache:null,transitions:null,pendingSuspenseBoundaries:null},od(s),t}function u1(t,e,n){var r=3<arguments.length&&arguments[3]!==void 0?arguments[3]:null;return{$$typeof:ni,key:r==null?null:""+r,children:t,containerInfo:e,implementation:n}}function Kv(t){if(!t)return ur;t=t._reactInternals;e:{if(Hr(t)!==t||t.tag!==1)throw Error(F(170));var e=t;do{switch(e.tag){case 3:e=e.stateNode.context;break e;case 1:if(vt(e.type)){e=e.stateNode.__reactInternalMemoizedMergedChildContext;break e}}e=e.return}while(e!==null);throw Error(F(171))}if(t.tag===1){var n=t.type;if(vt(n))return Ky(t,n,e)}return e}function Gv(t,e,n,r,i,s,o,l,u){return t=Id(n,r,!0,t,i,s,o,l,u),t.context=Kv(null),n=t.current,r=ht(),i=nr(n),s=_n(r,i),s.callback=e??null,er(n,s,i),t.current.lanes=i,go(t,i,r),_t(t,r),t}function Bl(t,e,n,r){var i=e.current,s=ht(),o=nr(i);return n=Kv(n),e.context===null?e.context=n:e.pendingContext=n,e=_n(s,o),e.payload={element:t},r=r===void 0?null:r,r!==null&&(e.callback=r),t=er(i,e,o),t!==null&&(Ht(t,i,o,s),ka(t,i,o)),o}function hl(t){if(t=t.current,!t.child)return null;switch(t.child.tag){case 5:return t.child.stateNode;default:return t.child.stateNode}}function Sm(t,e){if(t=t.memoizedState,t!==null&&t.dehydrated!==null){var n=t.retryLane;t.retryLane=n!==0&&n<e?n:e}}function Sd(t,e){Sm(t,e),(t=t.alternate)&&Sm(t,e)}function c1(){return null}var Qv=typeof reportError=="function"?reportError:function(t){console.error(t)};function kd(t){this._internalRoot=t}zl.prototype.render=kd.prototype.render=function(t){var e=this._internalRoot;if(e===null)throw Error(F(409));Bl(t,e,null,null)};zl.prototype.unmount=kd.prototype.unmount=function(){var t=this._internalRoot;if(t!==null){this._internalRoot=null;var e=t.containerInfo;Fr(function(){Bl(null,t,null,null)}),e[Tn]=null}};function zl(t){this._internalRoot=t}zl.prototype.unstable_scheduleHydration=function(t){if(t){var e=Ay();t={blockedOn:null,target:t,priority:e};for(var n=0;n<Bn.length&&e!==0&&e<Bn[n].priority;n++);Bn.splice(n,0,t),n===0&&Ry(t)}};function Ad(t){return!(!t||t.nodeType!==1&&t.nodeType!==9&&t.nodeType!==11)}function $l(t){return!(!t||t.nodeType!==1&&t.nodeType!==9&&t.nodeType!==11&&(t.nodeType!==8||t.nodeValue!==" react-mount-point-unstable "))}function km(){}function h1(t,e,n,r,i){if(i){if(typeof r=="function"){var s=r;r=function(){var h=hl(o);s.call(h)}}var o=Gv(e,r,t,0,null,!1,!1,"",km);return t._reactRootContainer=o,t[Tn]=o.current,Ys(t.nodeType===8?t.parentNode:t),Fr(),o}for(;i=t.lastChild;)t.removeChild(i);if(typeof r=="function"){var l=r;r=function(){var h=hl(u);l.call(h)}}var u=Id(t,0,!1,null,null,!1,!1,"",km);return t._reactRootContainer=u,t[Tn]=u.current,Ys(t.nodeType===8?t.parentNode:t),Fr(function(){Bl(e,u,n,r)}),u}function Wl(t,e,n,r,i){var s=n._reactRootContainer;if(s){var o=s;if(typeof i=="function"){var l=i;i=function(){var u=hl(o);l.call(u)}}Bl(e,o,t,i)}else o=h1(n,e,t,i,r);return hl(o)}Sy=function(t){switch(t.tag){case 3:var e=t.stateNode;if(e.current.memoizedState.isDehydrated){var n=Es(e.pendingLanes);n!==0&&(Hh(e,n|1),_t(e,Ne()),!(ae&6)&&(Ni=Ne()+500,mr()))}break;case 13:Fr(function(){var r=In(t,1);if(r!==null){var i=ht();Ht(r,t,1,i)}}),Sd(t,1)}};qh=function(t){if(t.tag===13){var e=In(t,134217728);if(e!==null){var n=ht();Ht(e,t,134217728,n)}Sd(t,134217728)}};ky=function(t){if(t.tag===13){var e=nr(t),n=In(t,e);if(n!==null){var r=ht();Ht(n,t,e,r)}Sd(t,e)}};Ay=function(){return fe};Cy=function(t,e){var n=fe;try{return fe=t,e()}finally{fe=n}};Dc=function(t,e,n){switch(e){case"input":if(kc(t,n),e=n.name,n.type==="radio"&&e!=null){for(n=t;n.parentNode;)n=n.parentNode;for(n=n.querySelectorAll("input[name="+JSON.stringify(""+e)+'][type="radio"]'),e=0;e<n.length;e++){var r=n[e];if(r!==t&&r.form===t.form){var i=bl(r);if(!i)throw Error(F(90));iy(r),kc(r,i)}}}break;case"textarea":oy(t,n);break;case"select":e=n.value,e!=null&&mi(t,!!n.multiple,e,!1)}};fy=_d;py=Fr;var d1={usingClientEntryPoint:!1,Events:[vo,ai,bl,hy,dy,_d]},gs={findFiberByHostInstance:Sr,bundleType:0,version:"18.3.1",rendererPackageName:"react-dom"},f1={bundleType:gs.bundleType,version:gs.version,rendererPackageName:gs.rendererPackageName,rendererConfig:gs.rendererConfig,overrideHookState:null,overrideHookStateDeletePath:null,overrideHookStateRenamePath:null,overrideProps:null,overridePropsDeletePath:null,overridePropsRenamePath:null,setErrorHandler:null,setSuspenseHandler:null,scheduleUpdate:null,currentDispatcherRef:Nn.ReactCurrentDispatcher,findHostInstanceByFiber:function(t){return t=yy(t),t===null?null:t.stateNode},findFiberByHostInstance:gs.findFiberByHostInstance||c1,findHostInstancesForRefresh:null,scheduleRefresh:null,scheduleRoot:null,setRefreshHandler:null,getCurrentFiber:null,reconcilerVersion:"18.3.1-next-f1338f8080-20240426"};if(typeof __REACT_DEVTOOLS_GLOBAL_HOOK__<"u"){var da=__REACT_DEVTOOLS_GLOBAL_HOOK__;if(!da.isDisabled&&da.supportsFiber)try{xl=da.inject(f1),Zt=da}catch{}}Ct.__SECRET_INTERNALS_DO_NOT_USE_OR_YOU_WILL_BE_FIRED=d1;Ct.createPortal=function(t,e){var n=2<arguments.length&&arguments[2]!==void 0?arguments[2]:null;if(!Ad(e))throw Error(F(200));return u1(t,e,null,n)};Ct.createRoot=function(t,e){if(!Ad(t))throw Error(F(299));var n=!1,r="",i=Qv;return e!=null&&(e.unstable_strictMode===!0&&(n=!0),e.identifierPrefix!==void 0&&(r=e.identifierPrefix),e.onRecoverableError!==void 0&&(i=e.onRecoverableError)),e=Id(t,1,!1,null,null,n,!1,r,i),t[Tn]=e.current,Ys(t.nodeType===8?t.parentNode:t),new kd(e)};Ct.findDOMNode=function(t){if(t==null)return null;if(t.nodeType===1)return t;var e=t._reactInternals;if(e===void 0)throw typeof t.render=="function"?Error(F(188)):(t=Object.keys(t).join(","),Error(F(268,t)));return t=yy(e),t=t===null?null:t.stateNode,t};Ct.flushSync=function(t){return Fr(t)};Ct.hydrate=function(t,e,n){if(!$l(e))throw Error(F(200));return Wl(null,t,e,!0,n)};Ct.hydrateRoot=function(t,e,n){if(!Ad(t))throw Error(F(405));var r=n!=null&&n.hydratedSources||null,i=!1,s="",o=Qv;if(n!=null&&(n.unstable_strictMode===!0&&(i=!0),n.identifierPrefix!==void 0&&(s=n.identifierPrefix),n.onRecoverableError!==void 0&&(o=n.onRecoverableError)),e=Gv(e,null,t,1,n??null,i,!1,s,o),t[Tn]=e.current,Ys(t),r)for(t=0;t<r.length;t++)n=r[t],i=n._getVersion,i=i(n._source),e.mutableSourceEagerHydrationData==null?e.mutableSourceEagerHydrationData=[n,i]:e.mutableSourceEagerHydrationData.push(n,i);return new zl(e)};Ct.render=function(t,e,n){if(!$l(e))throw Error(F(200));return Wl(null,t,e,!1,n)};Ct.unmountComponentAtNode=function(t){if(!$l(t))throw Error(F(40));return t._reactRootContainer?(Fr(function(){Wl(null,null,t,!1,function(){t._reactRootContainer=null,t[Tn]=null})}),!0):!1};Ct.unstable_batchedUpdates=_d;Ct.unstable_renderSubtreeIntoContainer=function(t,e,n,r){if(!$l(n))throw Error(F(200));if(t==null||t._reactInternals===void 0)throw Error(F(38));return Wl(t,e,n,!1,r)};Ct.version="18.3.1-next-f1338f8080-20240426";function Yv(){if(!(typeof __REACT_DEVTOOLS_GLOBAL_HOOK__>"u"||typeof __REACT_DEVTOOLS_GLOBAL_HOOK__.checkDCE!="function"))try{__REACT_DEVTOOLS_GLOBAL_HOOK__.checkDCE(Yv)}catch(t){console.error(t)}}Yv(),Yg.exports=Ct;var p1=Yg.exports,Xv,Am=p1;Xv=Am.createRoot,Am.hydrateRoot;/**
 * @license lucide-react v0.344.0 - ISC
 *
 * This source code is licensed under the ISC license.
 * See the LICENSE file in the root directory of this source tree.
 */var m1={xmlns:"http://www.w3.org/2000/svg",width:24,height:24,viewBox:"0 0 24 24",fill:"none",stroke:"currentColor",strokeWidth:2,strokeLinecap:"round",strokeLinejoin:"round"};/**
 * @license lucide-react v0.344.0 - ISC
 *
 * This source code is licensed under the ISC license.
 * See the LICENSE file in the root directory of this source tree.
 */const g1=t=>t.replace(/([a-z0-9])([A-Z])/g,"$1-$2").toLowerCase().trim(),Ie=(t,e)=>{const n=Q.forwardRef(({color:r="currentColor",size:i=24,strokeWidth:s=2,absoluteStrokeWidth:o,className:l="",children:u,...h},f)=>Q.createElement("svg",{ref:f,...m1,width:i,height:i,stroke:r,strokeWidth:o?Number(s)*24/Number(i):s,className:["lucide",`lucide-${g1(t)}`,l].join(" "),...h},[...e.map(([g,v])=>Q.createElement(g,v)),...Array.isArray(u)?u:[u]]));return n.displayName=`${t}`,n};/**
 * @license lucide-react v0.344.0 - ISC
 *
 * This source code is licensed under the ISC license.
 * See the LICENSE file in the root directory of this source tree.
 */const Jv=Ie("ArrowRight",[["path",{d:"M5 12h14",key:"1ays0h"}],["path",{d:"m12 5 7 7-7 7",key:"xquz4c"}]]);/**
 * @license lucide-react v0.344.0 - ISC
 *
 * This source code is licensed under the ISC license.
 * See the LICENSE file in the root directory of this source tree.
 */const y1=Ie("Bell",[["path",{d:"M6 8a6 6 0 0 1 12 0c0 7 3 9 3 9H3s3-2 3-9",key:"1qo2s2"}],["path",{d:"M10.3 21a1.94 1.94 0 0 0 3.4 0",key:"qgo35s"}]]);/**
 * @license lucide-react v0.344.0 - ISC
 *
 * This source code is licensed under the ISC license.
 * See the LICENSE file in the root directory of this source tree.
 */const Cd=Ie("CheckSquare",[["path",{d:"m9 11 3 3L22 4",key:"1pflzl"}],["path",{d:"M21 12v7a2 2 0 0 1-2 2H5a2 2 0 0 1-2-2V5a2 2 0 0 1 2-2h11",key:"1jnkn4"}]]);/**
 * @license lucide-react v0.344.0 - ISC
 *
 * This source code is licensed under the ISC license.
 * See the LICENSE file in the root directory of this source tree.
 */const v1=Ie("FileText",[["path",{d:"M15 2H6a2 2 0 0 0-2 2v16a2 2 0 0 0 2 2h12a2 2 0 0 0 2-2V7Z",key:"1rqfz7"}],["path",{d:"M14 2v4a2 2 0 0 0 2 2h4",key:"tnqrlb"}],["path",{d:"M10 9H8",key:"b1mrlr"}],["path",{d:"M16 13H8",key:"t4e002"}],["path",{d:"M16 17H8",key:"z1uh3a"}]]);/**
 * @license lucide-react v0.344.0 - ISC
 *
 * This source code is licensed under the ISC license.
 * See the LICENSE file in the root directory of this source tree.
 */const _1=Ie("Key",[["circle",{cx:"7.5",cy:"15.5",r:"5.5",key:"yqb3hr"}],["path",{d:"m21 2-9.6 9.6",key:"1j0ho8"}],["path",{d:"m15.5 7.5 3 3L22 7l-3-3",key:"1rn1fs"}]]);/**
 * @license lucide-react v0.344.0 - ISC
 *
 * This source code is licensed under the ISC license.
 * See the LICENSE file in the root directory of this source tree.
 */const w1=Ie("LayoutDashboard",[["rect",{width:"7",height:"9",x:"3",y:"3",rx:"1",key:"10lvy0"}],["rect",{width:"7",height:"5",x:"14",y:"3",rx:"1",key:"16une8"}],["rect",{width:"7",height:"9",x:"14",y:"12",rx:"1",key:"1hutg5"}],["rect",{width:"7",height:"5",x:"3",y:"16",rx:"1",key:"ldoo1y"}]]);/**
 * @license lucide-react v0.344.0 - ISC
 *
 * This source code is licensed under the ISC license.
 * See the LICENSE file in the root directory of this source tree.
 */const E1=Ie("ListTodo",[["rect",{x:"3",y:"5",width:"6",height:"6",rx:"1",key:"1defrl"}],["path",{d:"m3 17 2 2 4-4",key:"1jhpwq"}],["path",{d:"M13 6h8",key:"15sg57"}],["path",{d:"M13 12h8",key:"h98zly"}],["path",{d:"M13 18h8",key:"oe0vm4"}]]);/**
 * @license lucide-react v0.344.0 - ISC
 *
 * This source code is licensed under the ISC license.
 * See the LICENSE file in the root directory of this source tree.
 */const tc=Ie("Lock",[["rect",{width:"18",height:"11",x:"3",y:"11",rx:"2",ry:"2",key:"1w4ew1"}],["path",{d:"M7 11V7a5 5 0 0 1 10 0v4",key:"fwvmzm"}]]);/**
 * @license lucide-react v0.344.0 - ISC
 *
 * This source code is licensed under the ISC license.
 * See the LICENSE file in the root directory of this source tree.
 */const T1=Ie("LogOut",[["path",{d:"M9 21H5a2 2 0 0 1-2-2V5a2 2 0 0 1 2-2h4",key:"1uf3rs"}],["polyline",{points:"16 17 21 12 16 7",key:"1gabdz"}],["line",{x1:"21",x2:"9",y1:"12",y2:"12",key:"1uyos4"}]]);/**
 * @license lucide-react v0.344.0 - ISC
 *
 * This source code is licensed under the ISC license.
 * See the LICENSE file in the root directory of this source tree.
 */const I1=Ie("MessageCircle",[["path",{d:"M7.9 20A9 9 0 1 0 4 16.1L2 22Z",key:"vv11sd"}]]);/**
 * @license lucide-react v0.344.0 - ISC
 *
 * This source code is licensed under the ISC license.
 * See the LICENSE file in the root directory of this source tree.
 */const Zv=Ie("Plus",[["path",{d:"M5 12h14",key:"1ays0h"}],["path",{d:"M12 5v14",key:"s699le"}]]);/**
 * @license lucide-react v0.344.0 - ISC
 *
 * This source code is licensed under the ISC license.
 * See the LICENSE file in the root directory of this source tree.
 */const e_=Ie("Printer",[["polyline",{points:"6 9 6 2 18 2 18 9",key:"1306q4"}],["path",{d:"M6 18H4a2 2 0 0 1-2-2v-5a2 2 0 0 1 2-2h16a2 2 0 0 1 2 2v5a2 2 0 0 1-2 2h-2",key:"143wyd"}],["rect",{width:"12",height:"8",x:"6",y:"14",key:"5ipwut"}]]);/**
 * @license lucide-react v0.344.0 - ISC
 *
 * This source code is licensed under the ISC license.
 * See the LICENSE file in the root directory of this source tree.
 */const S1=Ie("RefreshCw",[["path",{d:"M3 12a9 9 0 0 1 9-9 9.75 9.75 0 0 1 6.74 2.74L21 8",key:"v9h5vc"}],["path",{d:"M21 3v5h-5",key:"1q7to0"}],["path",{d:"M21 12a9 9 0 0 1-9 9 9.75 9.75 0 0 1-6.74-2.74L3 16",key:"3uifl3"}],["path",{d:"M8 16H3v5",key:"1cv678"}]]);/**
 * @license lucide-react v0.344.0 - ISC
 *
 * This source code is licensed under the ISC license.
 * See the LICENSE file in the root directory of this source tree.
 */const k1=Ie("Search",[["circle",{cx:"11",cy:"11",r:"8",key:"4ej97u"}],["path",{d:"m21 21-4.3-4.3",key:"1qie3q"}]]);/**
 * @license lucide-react v0.344.0 - ISC
 *
 * This source code is licensed under the ISC license.
 * See the LICENSE file in the root directory of this source tree.
 */const A1=Ie("Send",[["path",{d:"m22 2-7 20-4-9-9-4Z",key:"1q3vgg"}],["path",{d:"M22 2 11 13",key:"nzbqef"}]]);/**
 * @license lucide-react v0.344.0 - ISC
 *
 * This source code is licensed under the ISC license.
 * See the LICENSE file in the root directory of this source tree.
 */const Rd=Ie("ShieldCheck",[["path",{d:"M20 13c0 5-3.5 7.5-7.66 8.95a1 1 0 0 1-.67-.01C7.5 20.5 4 18 4 13V6a1 1 0 0 1 1-1c2 0 4.5-1.2 6.24-2.72a1.17 1.17 0 0 1 1.52 0C14.51 3.81 17 5 19 5a1 1 0 0 1 1 1z",key:"oel41y"}],["path",{d:"m9 12 2 2 4-4",key:"dzmm74"}]]);/**
 * @license lucide-react v0.344.0 - ISC
 *
 * This source code is licensed under the ISC license.
 * See the LICENSE file in the root directory of this source tree.
 */const t_=Ie("Square",[["rect",{width:"18",height:"18",x:"3",y:"3",rx:"2",key:"afitv7"}]]);/**
 * @license lucide-react v0.344.0 - ISC
 *
 * This source code is licensed under the ISC license.
 * See the LICENSE file in the root directory of this source tree.
 */const Pd=Ie("Trash2",[["path",{d:"M3 6h18",key:"d0wm0j"}],["path",{d:"M19 6v14c0 1-1 2-2 2H7c-1 0-2-1-2-2V6",key:"4alrt4"}],["path",{d:"M8 6V4c0-1 1-2 2-2h4c1 0 2 1 2 2v2",key:"v07s0e"}],["line",{x1:"10",x2:"10",y1:"11",y2:"17",key:"1uufr5"}],["line",{x1:"14",x2:"14",y1:"11",y2:"17",key:"xtxkd"}]]);/**
 * @license lucide-react v0.344.0 - ISC
 *
 * This source code is licensed under the ISC license.
 * See the LICENSE file in the root directory of this source tree.
 */const C1=Ie("Truck",[["path",{d:"M14 18V6a2 2 0 0 0-2-2H4a2 2 0 0 0-2 2v11a1 1 0 0 0 1 1h2",key:"wrbu53"}],["path",{d:"M15 18H9",key:"1lyqi6"}],["path",{d:"M19 18h2a1 1 0 0 0 1-1v-3.65a1 1 0 0 0-.22-.624l-3.48-4.35A1 1 0 0 0 17.52 8H14",key:"lysw3i"}],["circle",{cx:"17",cy:"18",r:"2",key:"332jqn"}],["circle",{cx:"7",cy:"18",r:"2",key:"19iecd"}]]);/**
 * @license lucide-react v0.344.0 - ISC
 *
 * This source code is licensed under the ISC license.
 * See the LICENSE file in the root directory of this source tree.
 */const R1=Ie("UserPlus",[["path",{d:"M16 21v-2a4 4 0 0 0-4-4H6a4 4 0 0 0-4 4v2",key:"1yyitq"}],["circle",{cx:"9",cy:"7",r:"4",key:"nufk8"}],["line",{x1:"19",x2:"19",y1:"8",y2:"14",key:"1bvyxn"}],["line",{x1:"22",x2:"16",y1:"11",y2:"11",key:"1shjgl"}]]);/**
 * @license lucide-react v0.344.0 - ISC
 *
 * This source code is licensed under the ISC license.
 * See the LICENSE file in the root directory of this source tree.
 */const P1=Ie("WifiOff",[["path",{d:"M12 20h.01",key:"zekei9"}],["path",{d:"M8.5 16.429a5 5 0 0 1 7 0",key:"1bycff"}],["path",{d:"M5 12.859a10 10 0 0 1 5.17-2.69",key:"1dl1wf"}],["path",{d:"M19 12.859a10 10 0 0 0-2.007-1.523",key:"4k23kn"}],["path",{d:"M2 8.82a15 15 0 0 1 4.177-2.643",key:"1grhjp"}],["path",{d:"M22 8.82a15 15 0 0 0-11.288-3.764",key:"z3jwby"}],["path",{d:"m2 2 20 20",key:"1ooewy"}]]);/**
 * @license lucide-react v0.344.0 - ISC
 *
 * This source code is licensed under the ISC license.
 * See the LICENSE file in the root directory of this source tree.
 */const x1=Ie("Wifi",[["path",{d:"M12 20h.01",key:"zekei9"}],["path",{d:"M2 8.82a15 15 0 0 1 20 0",key:"dnpr2z"}],["path",{d:"M5 12.859a10 10 0 0 1 14 0",key:"1x1e6c"}],["path",{d:"M8.5 16.429a5 5 0 0 1 7 0",key:"1bycff"}]]);/**
 * @license lucide-react v0.344.0 - ISC
 *
 * This source code is licensed under the ISC license.
 * See the LICENSE file in the root directory of this source tree.
 */const wo=Ie("X",[["path",{d:"M18 6 6 18",key:"1bl5f8"}],["path",{d:"m6 6 12 12",key:"d8bk6v"}]]);/**
 * @license lucide-react v0.344.0 - ISC
 *
 * This source code is licensed under the ISC license.
 * See the LICENSE file in the root directory of this source tree.
 */const xd=Ie("Zap",[["polygon",{points:"13 2 3 14 12 14 11 22 21 10 12 10 13 2",key:"45s27k"}]]);var Cm={};/**
 * @license
 * Copyright 2017 Google LLC
 *
 * Licensed under the Apache License, Version 2.0 (the "License");
 * you may not use this file except in compliance with the License.
 * You may obtain a copy of the License at
 *
 *   http://www.apache.org/licenses/LICENSE-2.0
 *
 * Unless required by applicable law or agreed to in writing, software
 * distributed under the License is distributed on an "AS IS" BASIS,
 * WITHOUT WARRANTIES OR CONDITIONS OF ANY KIND, either express or implied.
 * See the License for the specific language governing permissions and
 * limitations under the License.
 */const n_=function(t){const e=[];let n=0;for(let r=0;r<t.length;r++){let i=t.charCodeAt(r);i<128?e[n++]=i:i<2048?(e[n++]=i>>6|192,e[n++]=i&63|128):(i&64512)===55296&&r+1<t.length&&(t.charCodeAt(r+1)&64512)===56320?(i=65536+((i&1023)<<10)+(t.charCodeAt(++r)&1023),e[n++]=i>>18|240,e[n++]=i>>12&63|128,e[n++]=i>>6&63|128,e[n++]=i&63|128):(e[n++]=i>>12|224,e[n++]=i>>6&63|128,e[n++]=i&63|128)}return e},N1=function(t){const e=[];let n=0,r=0;for(;n<t.length;){const i=t[n++];if(i<128)e[r++]=String.fromCharCode(i);else if(i>191&&i<224){const s=t[n++];e[r++]=String.fromCharCode((i&31)<<6|s&63)}else if(i>239&&i<365){const s=t[n++],o=t[n++],l=t[n++],u=((i&7)<<18|(s&63)<<12|(o&63)<<6|l&63)-65536;e[r++]=String.fromCharCode(55296+(u>>10)),e[r++]=String.fromCharCode(56320+(u&1023))}else{const s=t[n++],o=t[n++];e[r++]=String.fromCharCode((i&15)<<12|(s&63)<<6|o&63)}}return e.join("")},r_={byteToCharMap_:null,charToByteMap_:null,byteToCharMapWebSafe_:null,charToByteMapWebSafe_:null,ENCODED_VALS_BASE:"ABCDEFGHIJKLMNOPQRSTUVWXYZabcdefghijklmnopqrstuvwxyz0123456789",get ENCODED_VALS(){return this.ENCODED_VALS_BASE+"+/="},get ENCODED_VALS_WEBSAFE(){return this.ENCODED_VALS_BASE+"-_."},HAS_NATIVE_SUPPORT:typeof atob=="function",encodeByteArray(t,e){if(!Array.isArray(t))throw Error("encodeByteArray takes an array as a parameter");this.init_();const n=e?this.byteToCharMapWebSafe_:this.byteToCharMap_,r=[];for(let i=0;i<t.length;i+=3){const s=t[i],o=i+1<t.length,l=o?t[i+1]:0,u=i+2<t.length,h=u?t[i+2]:0,f=s>>2,g=(s&3)<<4|l>>4;let v=(l&15)<<2|h>>6,R=h&63;u||(R=64,o||(v=64)),r.push(n[f],n[g],n[v],n[R])}return r.join("")},encodeString(t,e){return this.HAS_NATIVE_SUPPORT&&!e?btoa(t):this.encodeByteArray(n_(t),e)},decodeString(t,e){return this.HAS_NATIVE_SUPPORT&&!e?atob(t):N1(this.decodeStringToByteArray(t,e))},decodeStringToByteArray(t,e){this.init_();const n=e?this.charToByteMapWebSafe_:this.charToByteMap_,r=[];for(let i=0;i<t.length;){const s=n[t.charAt(i++)],l=i<t.length?n[t.charAt(i)]:0;++i;const h=i<t.length?n[t.charAt(i)]:64;++i;const g=i<t.length?n[t.charAt(i)]:64;if(++i,s==null||l==null||h==null||g==null)throw new D1;const v=s<<2|l>>4;if(r.push(v),h!==64){const R=l<<4&240|h>>2;if(r.push(R),g!==64){const N=h<<6&192|g;r.push(N)}}}return r},init_(){if(!this.byteToCharMap_){this.byteToCharMap_={},this.charToByteMap_={},this.byteToCharMapWebSafe_={},this.charToByteMapWebSafe_={};for(let t=0;t<this.ENCODED_VALS.length;t++)this.byteToCharMap_[t]=this.ENCODED_VALS.charAt(t),this.charToByteMap_[this.byteToCharMap_[t]]=t,this.byteToCharMapWebSafe_[t]=this.ENCODED_VALS_WEBSAFE.charAt(t),this.charToByteMapWebSafe_[this.byteToCharMapWebSafe_[t]]=t,t>=this.ENCODED_VALS_BASE.length&&(this.charToByteMap_[this.ENCODED_VALS_WEBSAFE.charAt(t)]=t,this.charToByteMapWebSafe_[this.ENCODED_VALS.charAt(t)]=t)}}};class D1 extends Error{constructor(){super(...arguments),this.name="DecodeBase64StringError"}}const V1=function(t){const e=n_(t);return r_.encodeByteArray(e,!0)},dl=function(t){return V1(t).replace(/\./g,"")},i_=function(t){try{return r_.decodeString(t,!0)}catch(e){console.error("base64Decode failed: ",e)}return null};/**
 * @license
 * Copyright 2022 Google LLC
 *
 * Licensed under the Apache License, Version 2.0 (the "License");
 * you may not use this file except in compliance with the License.
 * You may obtain a copy of the License at
 *
 *   http://www.apache.org/licenses/LICENSE-2.0
 *
 * Unless required by applicable law or agreed to in writing, software
 * distributed under the License is distributed on an "AS IS" BASIS,
 * WITHOUT WARRANTIES OR CONDITIONS OF ANY KIND, either express or implied.
 * See the License for the specific language governing permissions and
 * limitations under the License.
 */function b1(){if(typeof self<"u")return self;if(typeof window<"u")return window;if(typeof global<"u")return global;throw new Error("Unable to locate global object.")}/**
 * @license
 * Copyright 2022 Google LLC
 *
 * Licensed under the Apache License, Version 2.0 (the "License");
 * you may not use this file except in compliance with the License.
 * You may obtain a copy of the License at
 *
 *   http://www.apache.org/licenses/LICENSE-2.0
 *
 * Unless required by applicable law or agreed to in writing, software
 * distributed under the License is distributed on an "AS IS" BASIS,
 * WITHOUT WARRANTIES OR CONDITIONS OF ANY KIND, either express or implied.
 * See the License for the specific language governing permissions and
 * limitations under the License.
 */const O1=()=>b1().__FIREBASE_DEFAULTS__,L1=()=>{if(typeof process>"u"||typeof Cm>"u")return;const t=Cm.__FIREBASE_DEFAULTS__;if(t)return JSON.parse(t)},M1=()=>{if(typeof document>"u")return;let t;try{t=document.cookie.match(/__FIREBASE_DEFAULTS__=([^;]+)/)}catch{return}const e=t&&i_(t[1]);return e&&JSON.parse(e)},Hl=()=>{try{return O1()||L1()||M1()}catch(t){console.info(`Unable to get __FIREBASE_DEFAULTS__ due to: ${t}`);return}},s_=t=>{var e,n;return(n=(e=Hl())===null||e===void 0?void 0:e.emulatorHosts)===null||n===void 0?void 0:n[t]},F1=t=>{const e=s_(t);if(!e)return;const n=e.lastIndexOf(":");if(n<=0||n+1===e.length)throw new Error(`Invalid host ${e} with no separate hostname and port!`);const r=parseInt(e.substring(n+1),10);return e[0]==="["?[e.substring(1,n-1),r]:[e.substring(0,n),r]},o_=()=>{var t;return(t=Hl())===null||t===void 0?void 0:t.config},a_=t=>{var e;return(e=Hl())===null||e===void 0?void 0:e[`_${t}`]};/**
 * @license
 * Copyright 2017 Google LLC
 *
 * Licensed under the Apache License, Version 2.0 (the "License");
 * you may not use this file except in compliance with the License.
 * You may obtain a copy of the License at
 *
 *   http://www.apache.org/licenses/LICENSE-2.0
 *
 * Unless required by applicable law or agreed to in writing, software
 * distributed under the License is distributed on an "AS IS" BASIS,
 * WITHOUT WARRANTIES OR CONDITIONS OF ANY KIND, either express or implied.
 * See the License for the specific language governing permissions and
 * limitations under the License.
 */class j1{constructor(){this.reject=()=>{},this.resolve=()=>{},this.promise=new Promise((e,n)=>{this.resolve=e,this.reject=n})}wrapCallback(e){return(n,r)=>{n?this.reject(n):this.resolve(r),typeof e=="function"&&(this.promise.catch(()=>{}),e.length===1?e(n):e(n,r))}}}/**
 * @license
 * Copyright 2021 Google LLC
 *
 * Licensed under the Apache License, Version 2.0 (the "License");
 * you may not use this file except in compliance with the License.
 * You may obtain a copy of the License at
 *
 *   http://www.apache.org/licenses/LICENSE-2.0
 *
 * Unless required by applicable law or agreed to in writing, software
 * distributed under the License is distributed on an "AS IS" BASIS,
 * WITHOUT WARRANTIES OR CONDITIONS OF ANY KIND, either express or implied.
 * See the License for the specific language governing permissions and
 * limitations under the License.
 */function U1(t,e){if(t.uid)throw new Error('The "uid" field is no longer supported by mockUserToken. Please use "sub" instead for Firebase Auth User ID.');const n={alg:"none",type:"JWT"},r=e||"demo-project",i=t.iat||0,s=t.sub||t.user_id;if(!s)throw new Error("mockUserToken must contain 'sub' or 'user_id' field!");const o=Object.assign({iss:`https://securetoken.google.com/${r}`,aud:r,iat:i,exp:i+3600,auth_time:i,sub:s,user_id:s,firebase:{sign_in_provider:"custom",identities:{}}},t);return[dl(JSON.stringify(n)),dl(JSON.stringify(o)),""].join(".")}/**
 * @license
 * Copyright 2017 Google LLC
 *
 * Licensed under the Apache License, Version 2.0 (the "License");
 * you may not use this file except in compliance with the License.
 * You may obtain a copy of the License at
 *
 *   http://www.apache.org/licenses/LICENSE-2.0
 *
 * Unless required by applicable law or agreed to in writing, software
 * distributed under the License is distributed on an "AS IS" BASIS,
 * WITHOUT WARRANTIES OR CONDITIONS OF ANY KIND, either express or implied.
 * See the License for the specific language governing permissions and
 * limitations under the License.
 */function at(){return typeof navigator<"u"&&typeof navigator.userAgent=="string"?navigator.userAgent:""}function B1(){return typeof window<"u"&&!!(window.cordova||window.phonegap||window.PhoneGap)&&/ios|iphone|ipod|ipad|android|blackberry|iemobile/i.test(at())}function z1(){var t;const e=(t=Hl())===null||t===void 0?void 0:t.forceEnvironment;if(e==="node")return!0;if(e==="browser")return!1;try{return Object.prototype.toString.call(global.process)==="[object process]"}catch{return!1}}function $1(){return typeof navigator<"u"&&navigator.userAgent==="Cloudflare-Workers"}function W1(){const t=typeof chrome=="object"?chrome.runtime:typeof browser=="object"?browser.runtime:void 0;return typeof t=="object"&&t.id!==void 0}function H1(){return typeof navigator=="object"&&navigator.product==="ReactNative"}function q1(){const t=at();return t.indexOf("MSIE ")>=0||t.indexOf("Trident/")>=0}function K1(){return!z1()&&!!navigator.userAgent&&navigator.userAgent.includes("Safari")&&!navigator.userAgent.includes("Chrome")}function G1(){try{return typeof indexedDB=="object"}catch{return!1}}function Q1(){return new Promise((t,e)=>{try{let n=!0;const r="validate-browser-context-for-indexeddb-analytics-module",i=self.indexedDB.open(r);i.onsuccess=()=>{i.result.close(),n||self.indexedDB.deleteDatabase(r),t(!0)},i.onupgradeneeded=()=>{n=!1},i.onerror=()=>{var s;e(((s=i.error)===null||s===void 0?void 0:s.message)||"")}}catch(n){e(n)}})}/**
 * @license
 * Copyright 2017 Google LLC
 *
 * Licensed under the Apache License, Version 2.0 (the "License");
 * you may not use this file except in compliance with the License.
 * You may obtain a copy of the License at
 *
 *   http://www.apache.org/licenses/LICENSE-2.0
 *
 * Unless required by applicable law or agreed to in writing, software
 * distributed under the License is distributed on an "AS IS" BASIS,
 * WITHOUT WARRANTIES OR CONDITIONS OF ANY KIND, either express or implied.
 * See the License for the specific language governing permissions and
 * limitations under the License.
 */const Y1="FirebaseError";class Dn extends Error{constructor(e,n,r){super(n),this.code=e,this.customData=r,this.name=Y1,Object.setPrototypeOf(this,Dn.prototype),Error.captureStackTrace&&Error.captureStackTrace(this,Eo.prototype.create)}}class Eo{constructor(e,n,r){this.service=e,this.serviceName=n,this.errors=r}create(e,...n){const r=n[0]||{},i=`${this.service}/${e}`,s=this.errors[e],o=s?X1(s,r):"Error",l=`${this.serviceName}: ${o} (${i}).`;return new Dn(i,l,r)}}function X1(t,e){return t.replace(J1,(n,r)=>{const i=e[r];return i!=null?String(i):`<${r}?>`})}const J1=/\{\$([^}]+)}/g;function Z1(t){for(const e in t)if(Object.prototype.hasOwnProperty.call(t,e))return!1;return!0}function fl(t,e){if(t===e)return!0;const n=Object.keys(t),r=Object.keys(e);for(const i of n){if(!r.includes(i))return!1;const s=t[i],o=e[i];if(Rm(s)&&Rm(o)){if(!fl(s,o))return!1}else if(s!==o)return!1}for(const i of r)if(!n.includes(i))return!1;return!0}function Rm(t){return t!==null&&typeof t=="object"}/**
 * @license
 * Copyright 2017 Google LLC
 *
 * Licensed under the Apache License, Version 2.0 (the "License");
 * you may not use this file except in compliance with the License.
 * You may obtain a copy of the License at
 *
 *   http://www.apache.org/licenses/LICENSE-2.0
 *
 * Unless required by applicable law or agreed to in writing, software
 * distributed under the License is distributed on an "AS IS" BASIS,
 * WITHOUT WARRANTIES OR CONDITIONS OF ANY KIND, either express or implied.
 * See the License for the specific language governing permissions and
 * limitations under the License.
 */function To(t){const e=[];for(const[n,r]of Object.entries(t))Array.isArray(r)?r.forEach(i=>{e.push(encodeURIComponent(n)+"="+encodeURIComponent(i))}):e.push(encodeURIComponent(n)+"="+encodeURIComponent(r));return e.length?"&"+e.join("&"):""}function eI(t,e){const n=new tI(t,e);return n.subscribe.bind(n)}class tI{constructor(e,n){this.observers=[],this.unsubscribes=[],this.observerCount=0,this.task=Promise.resolve(),this.finalized=!1,this.onNoObservers=n,this.task.then(()=>{e(this)}).catch(r=>{this.error(r)})}next(e){this.forEachObserver(n=>{n.next(e)})}error(e){this.forEachObserver(n=>{n.error(e)}),this.close(e)}complete(){this.forEachObserver(e=>{e.complete()}),this.close()}subscribe(e,n,r){let i;if(e===void 0&&n===void 0&&r===void 0)throw new Error("Missing Observer.");nI(e,["next","error","complete"])?i=e:i={next:e,error:n,complete:r},i.next===void 0&&(i.next=nc),i.error===void 0&&(i.error=nc),i.complete===void 0&&(i.complete=nc);const s=this.unsubscribeOne.bind(this,this.observers.length);return this.finalized&&this.task.then(()=>{try{this.finalError?i.error(this.finalError):i.complete()}catch{}}),this.observers.push(i),s}unsubscribeOne(e){this.observers===void 0||this.observers[e]===void 0||(delete this.observers[e],this.observerCount-=1,this.observerCount===0&&this.onNoObservers!==void 0&&this.onNoObservers(this))}forEachObserver(e){if(!this.finalized)for(let n=0;n<this.observers.length;n++)this.sendOne(n,e)}sendOne(e,n){this.task.then(()=>{if(this.observers!==void 0&&this.observers[e]!==void 0)try{n(this.observers[e])}catch(r){typeof console<"u"&&console.error&&console.error(r)}})}close(e){this.finalized||(this.finalized=!0,e!==void 0&&(this.finalError=e),this.task.then(()=>{this.observers=void 0,this.onNoObservers=void 0}))}}function nI(t,e){if(typeof t!="object"||t===null)return!1;for(const n of e)if(n in t&&typeof t[n]=="function")return!0;return!1}function nc(){}/**
 * @license
 * Copyright 2021 Google LLC
 *
 * Licensed under the Apache License, Version 2.0 (the "License");
 * you may not use this file except in compliance with the License.
 * You may obtain a copy of the License at
 *
 *   http://www.apache.org/licenses/LICENSE-2.0
 *
 * Unless required by applicable law or agreed to in writing, software
 * distributed under the License is distributed on an "AS IS" BASIS,
 * WITHOUT WARRANTIES OR CONDITIONS OF ANY KIND, either express or implied.
 * See the License for the specific language governing permissions and
 * limitations under the License.
 */function At(t){return t&&t._delegate?t._delegate:t}class jr{constructor(e,n,r){this.name=e,this.instanceFactory=n,this.type=r,this.multipleInstances=!1,this.serviceProps={},this.instantiationMode="LAZY",this.onInstanceCreated=null}setInstantiationMode(e){return this.instantiationMode=e,this}setMultipleInstances(e){return this.multipleInstances=e,this}setServiceProps(e){return this.serviceProps=e,this}setInstanceCreatedCallback(e){return this.onInstanceCreated=e,this}}/**
 * @license
 * Copyright 2019 Google LLC
 *
 * Licensed under the Apache License, Version 2.0 (the "License");
 * you may not use this file except in compliance with the License.
 * You may obtain a copy of the License at
 *
 *   http://www.apache.org/licenses/LICENSE-2.0
 *
 * Unless required by applicable law or agreed to in writing, software
 * distributed under the License is distributed on an "AS IS" BASIS,
 * WITHOUT WARRANTIES OR CONDITIONS OF ANY KIND, either express or implied.
 * See the License for the specific language governing permissions and
 * limitations under the License.
 */const Ir="[DEFAULT]";/**
 * @license
 * Copyright 2019 Google LLC
 *
 * Licensed under the Apache License, Version 2.0 (the "License");
 * you may not use this file except in compliance with the License.
 * You may obtain a copy of the License at
 *
 *   http://www.apache.org/licenses/LICENSE-2.0
 *
 * Unless required by applicable law or agreed to in writing, software
 * distributed under the License is distributed on an "AS IS" BASIS,
 * WITHOUT WARRANTIES OR CONDITIONS OF ANY KIND, either express or implied.
 * See the License for the specific language governing permissions and
 * limitations under the License.
 */class rI{constructor(e,n){this.name=e,this.container=n,this.component=null,this.instances=new Map,this.instancesDeferred=new Map,this.instancesOptions=new Map,this.onInitCallbacks=new Map}get(e){const n=this.normalizeInstanceIdentifier(e);if(!this.instancesDeferred.has(n)){const r=new j1;if(this.instancesDeferred.set(n,r),this.isInitialized(n)||this.shouldAutoInitialize())try{const i=this.getOrInitializeService({instanceIdentifier:n});i&&r.resolve(i)}catch{}}return this.instancesDeferred.get(n).promise}getImmediate(e){var n;const r=this.normalizeInstanceIdentifier(e==null?void 0:e.identifier),i=(n=e==null?void 0:e.optional)!==null&&n!==void 0?n:!1;if(this.isInitialized(r)||this.shouldAutoInitialize())try{return this.getOrInitializeService({instanceIdentifier:r})}catch(s){if(i)return null;throw s}else{if(i)return null;throw Error(`Service ${this.name} is not available`)}}getComponent(){return this.component}setComponent(e){if(e.name!==this.name)throw Error(`Mismatching Component ${e.name} for Provider ${this.name}.`);if(this.component)throw Error(`Component for ${this.name} has already been provided`);if(this.component=e,!!this.shouldAutoInitialize()){if(sI(e))try{this.getOrInitializeService({instanceIdentifier:Ir})}catch{}for(const[n,r]of this.instancesDeferred.entries()){const i=this.normalizeInstanceIdentifier(n);try{const s=this.getOrInitializeService({instanceIdentifier:i});r.resolve(s)}catch{}}}}clearInstance(e=Ir){this.instancesDeferred.delete(e),this.instancesOptions.delete(e),this.instances.delete(e)}async delete(){const e=Array.from(this.instances.values());await Promise.all([...e.filter(n=>"INTERNAL"in n).map(n=>n.INTERNAL.delete()),...e.filter(n=>"_delete"in n).map(n=>n._delete())])}isComponentSet(){return this.component!=null}isInitialized(e=Ir){return this.instances.has(e)}getOptions(e=Ir){return this.instancesOptions.get(e)||{}}initialize(e={}){const{options:n={}}=e,r=this.normalizeInstanceIdentifier(e.instanceIdentifier);if(this.isInitialized(r))throw Error(`${this.name}(${r}) has already been initialized`);if(!this.isComponentSet())throw Error(`Component ${this.name} has not been registered yet`);const i=this.getOrInitializeService({instanceIdentifier:r,options:n});for(const[s,o]of this.instancesDeferred.entries()){const l=this.normalizeInstanceIdentifier(s);r===l&&o.resolve(i)}return i}onInit(e,n){var r;const i=this.normalizeInstanceIdentifier(n),s=(r=this.onInitCallbacks.get(i))!==null&&r!==void 0?r:new Set;s.add(e),this.onInitCallbacks.set(i,s);const o=this.instances.get(i);return o&&e(o,i),()=>{s.delete(e)}}invokeOnInitCallbacks(e,n){const r=this.onInitCallbacks.get(n);if(r)for(const i of r)try{i(e,n)}catch{}}getOrInitializeService({instanceIdentifier:e,options:n={}}){let r=this.instances.get(e);if(!r&&this.component&&(r=this.component.instanceFactory(this.container,{instanceIdentifier:iI(e),options:n}),this.instances.set(e,r),this.instancesOptions.set(e,n),this.invokeOnInitCallbacks(r,e),this.component.onInstanceCreated))try{this.component.onInstanceCreated(this.container,e,r)}catch{}return r||null}normalizeInstanceIdentifier(e=Ir){return this.component?this.component.multipleInstances?e:Ir:e}shouldAutoInitialize(){return!!this.component&&this.component.instantiationMode!=="EXPLICIT"}}function iI(t){return t===Ir?void 0:t}function sI(t){return t.instantiationMode==="EAGER"}/**
 * @license
 * Copyright 2019 Google LLC
 *
 * Licensed under the Apache License, Version 2.0 (the "License");
 * you may not use this file except in compliance with the License.
 * You may obtain a copy of the License at
 *
 *   http://www.apache.org/licenses/LICENSE-2.0
 *
 * Unless required by applicable law or agreed to in writing, software
 * distributed under the License is distributed on an "AS IS" BASIS,
 * WITHOUT WARRANTIES OR CONDITIONS OF ANY KIND, either express or implied.
 * See the License for the specific language governing permissions and
 * limitations under the License.
 */class oI{constructor(e){this.name=e,this.providers=new Map}addComponent(e){const n=this.getProvider(e.name);if(n.isComponentSet())throw new Error(`Component ${e.name} has already been registered with ${this.name}`);n.setComponent(e)}addOrOverwriteComponent(e){this.getProvider(e.name).isComponentSet()&&this.providers.delete(e.name),this.addComponent(e)}getProvider(e){if(this.providers.has(e))return this.providers.get(e);const n=new rI(e,this);return this.providers.set(e,n),n}getProviders(){return Array.from(this.providers.values())}}/**
 * @license
 * Copyright 2017 Google LLC
 *
 * Licensed under the Apache License, Version 2.0 (the "License");
 * you may not use this file except in compliance with the License.
 * You may obtain a copy of the License at
 *
 *   http://www.apache.org/licenses/LICENSE-2.0
 *
 * Unless required by applicable law or agreed to in writing, software
 * distributed under the License is distributed on an "AS IS" BASIS,
 * WITHOUT WARRANTIES OR CONDITIONS OF ANY KIND, either express or implied.
 * See the License for the specific language governing permissions and
 * limitations under the License.
 */var se;(function(t){t[t.DEBUG=0]="DEBUG",t[t.VERBOSE=1]="VERBOSE",t[t.INFO=2]="INFO",t[t.WARN=3]="WARN",t[t.ERROR=4]="ERROR",t[t.SILENT=5]="SILENT"})(se||(se={}));const aI={debug:se.DEBUG,verbose:se.VERBOSE,info:se.INFO,warn:se.WARN,error:se.ERROR,silent:se.SILENT},lI=se.INFO,uI={[se.DEBUG]:"log",[se.VERBOSE]:"log",[se.INFO]:"info",[se.WARN]:"warn",[se.ERROR]:"error"},cI=(t,e,...n)=>{if(e<t.logLevel)return;const r=new Date().toISOString(),i=uI[e];if(i)console[i](`[${r}]  ${t.name}:`,...n);else throw new Error(`Attempted to log a message with an invalid logType (value: ${e})`)};class Nd{constructor(e){this.name=e,this._logLevel=lI,this._logHandler=cI,this._userLogHandler=null}get logLevel(){return this._logLevel}set logLevel(e){if(!(e in se))throw new TypeError(`Invalid value "${e}" assigned to \`logLevel\``);this._logLevel=e}setLogLevel(e){this._logLevel=typeof e=="string"?aI[e]:e}get logHandler(){return this._logHandler}set logHandler(e){if(typeof e!="function")throw new TypeError("Value assigned to `logHandler` must be a function");this._logHandler=e}get userLogHandler(){return this._userLogHandler}set userLogHandler(e){this._userLogHandler=e}debug(...e){this._userLogHandler&&this._userLogHandler(this,se.DEBUG,...e),this._logHandler(this,se.DEBUG,...e)}log(...e){this._userLogHandler&&this._userLogHandler(this,se.VERBOSE,...e),this._logHandler(this,se.VERBOSE,...e)}info(...e){this._userLogHandler&&this._userLogHandler(this,se.INFO,...e),this._logHandler(this,se.INFO,...e)}warn(...e){this._userLogHandler&&this._userLogHandler(this,se.WARN,...e),this._logHandler(this,se.WARN,...e)}error(...e){this._userLogHandler&&this._userLogHandler(this,se.ERROR,...e),this._logHandler(this,se.ERROR,...e)}}const hI=(t,e)=>e.some(n=>t instanceof n);let Pm,xm;function dI(){return Pm||(Pm=[IDBDatabase,IDBObjectStore,IDBIndex,IDBCursor,IDBTransaction])}function fI(){return xm||(xm=[IDBCursor.prototype.advance,IDBCursor.prototype.continue,IDBCursor.prototype.continuePrimaryKey])}const l_=new WeakMap,hh=new WeakMap,u_=new WeakMap,rc=new WeakMap,Dd=new WeakMap;function pI(t){const e=new Promise((n,r)=>{const i=()=>{t.removeEventListener("success",s),t.removeEventListener("error",o)},s=()=>{n(ir(t.result)),i()},o=()=>{r(t.error),i()};t.addEventListener("success",s),t.addEventListener("error",o)});return e.then(n=>{n instanceof IDBCursor&&l_.set(n,t)}).catch(()=>{}),Dd.set(e,t),e}function mI(t){if(hh.has(t))return;const e=new Promise((n,r)=>{const i=()=>{t.removeEventListener("complete",s),t.removeEventListener("error",o),t.removeEventListener("abort",o)},s=()=>{n(),i()},o=()=>{r(t.error||new DOMException("AbortError","AbortError")),i()};t.addEventListener("complete",s),t.addEventListener("error",o),t.addEventListener("abort",o)});hh.set(t,e)}let dh={get(t,e,n){if(t instanceof IDBTransaction){if(e==="done")return hh.get(t);if(e==="objectStoreNames")return t.objectStoreNames||u_.get(t);if(e==="store")return n.objectStoreNames[1]?void 0:n.objectStore(n.objectStoreNames[0])}return ir(t[e])},set(t,e,n){return t[e]=n,!0},has(t,e){return t instanceof IDBTransaction&&(e==="done"||e==="store")?!0:e in t}};function gI(t){dh=t(dh)}function yI(t){return t===IDBDatabase.prototype.transaction&&!("objectStoreNames"in IDBTransaction.prototype)?function(e,...n){const r=t.call(ic(this),e,...n);return u_.set(r,e.sort?e.sort():[e]),ir(r)}:fI().includes(t)?function(...e){return t.apply(ic(this),e),ir(l_.get(this))}:function(...e){return ir(t.apply(ic(this),e))}}function vI(t){return typeof t=="function"?yI(t):(t instanceof IDBTransaction&&mI(t),hI(t,dI())?new Proxy(t,dh):t)}function ir(t){if(t instanceof IDBRequest)return pI(t);if(rc.has(t))return rc.get(t);const e=vI(t);return e!==t&&(rc.set(t,e),Dd.set(e,t)),e}const ic=t=>Dd.get(t);function _I(t,e,{blocked:n,upgrade:r,blocking:i,terminated:s}={}){const o=indexedDB.open(t,e),l=ir(o);return r&&o.addEventListener("upgradeneeded",u=>{r(ir(o.result),u.oldVersion,u.newVersion,ir(o.transaction),u)}),n&&o.addEventListener("blocked",u=>n(u.oldVersion,u.newVersion,u)),l.then(u=>{s&&u.addEventListener("close",()=>s()),i&&u.addEventListener("versionchange",h=>i(h.oldVersion,h.newVersion,h))}).catch(()=>{}),l}const wI=["get","getKey","getAll","getAllKeys","count"],EI=["put","add","delete","clear"],sc=new Map;function Nm(t,e){if(!(t instanceof IDBDatabase&&!(e in t)&&typeof e=="string"))return;if(sc.get(e))return sc.get(e);const n=e.replace(/FromIndex$/,""),r=e!==n,i=EI.includes(n);if(!(n in(r?IDBIndex:IDBObjectStore).prototype)||!(i||wI.includes(n)))return;const s=async function(o,...l){const u=this.transaction(o,i?"readwrite":"readonly");let h=u.store;return r&&(h=h.index(l.shift())),(await Promise.all([h[n](...l),i&&u.done]))[0]};return sc.set(e,s),s}gI(t=>({...t,get:(e,n,r)=>Nm(e,n)||t.get(e,n,r),has:(e,n)=>!!Nm(e,n)||t.has(e,n)}));/**
 * @license
 * Copyright 2019 Google LLC
 *
 * Licensed under the Apache License, Version 2.0 (the "License");
 * you may not use this file except in compliance with the License.
 * You may obtain a copy of the License at
 *
 *   http://www.apache.org/licenses/LICENSE-2.0
 *
 * Unless required by applicable law or agreed to in writing, software
 * distributed under the License is distributed on an "AS IS" BASIS,
 * WITHOUT WARRANTIES OR CONDITIONS OF ANY KIND, either express or implied.
 * See the License for the specific language governing permissions and
 * limitations under the License.
 */class TI{constructor(e){this.container=e}getPlatformInfoString(){return this.container.getProviders().map(n=>{if(II(n)){const r=n.getImmediate();return`${r.library}/${r.version}`}else return null}).filter(n=>n).join(" ")}}function II(t){const e=t.getComponent();return(e==null?void 0:e.type)==="VERSION"}const fh="@firebase/app",Dm="0.10.13";/**
 * @license
 * Copyright 2019 Google LLC
 *
 * Licensed under the Apache License, Version 2.0 (the "License");
 * you may not use this file except in compliance with the License.
 * You may obtain a copy of the License at
 *
 *   http://www.apache.org/licenses/LICENSE-2.0
 *
 * Unless required by applicable law or agreed to in writing, software
 * distributed under the License is distributed on an "AS IS" BASIS,
 * WITHOUT WARRANTIES OR CONDITIONS OF ANY KIND, either express or implied.
 * See the License for the specific language governing permissions and
 * limitations under the License.
 */const kn=new Nd("@firebase/app"),SI="@firebase/app-compat",kI="@firebase/analytics-compat",AI="@firebase/analytics",CI="@firebase/app-check-compat",RI="@firebase/app-check",PI="@firebase/auth",xI="@firebase/auth-compat",NI="@firebase/database",DI="@firebase/data-connect",VI="@firebase/database-compat",bI="@firebase/functions",OI="@firebase/functions-compat",LI="@firebase/installations",MI="@firebase/installations-compat",FI="@firebase/messaging",jI="@firebase/messaging-compat",UI="@firebase/performance",BI="@firebase/performance-compat",zI="@firebase/remote-config",$I="@firebase/remote-config-compat",WI="@firebase/storage",HI="@firebase/storage-compat",qI="@firebase/firestore",KI="@firebase/vertexai-preview",GI="@firebase/firestore-compat",QI="firebase",YI="10.14.1";/**
 * @license
 * Copyright 2019 Google LLC
 *
 * Licensed under the Apache License, Version 2.0 (the "License");
 * you may not use this file except in compliance with the License.
 * You may obtain a copy of the License at
 *
 *   http://www.apache.org/licenses/LICENSE-2.0
 *
 * Unless required by applicable law or agreed to in writing, software
 * distributed under the License is distributed on an "AS IS" BASIS,
 * WITHOUT WARRANTIES OR CONDITIONS OF ANY KIND, either express or implied.
 * See the License for the specific language governing permissions and
 * limitations under the License.
 */const ph="[DEFAULT]",XI={[fh]:"fire-core",[SI]:"fire-core-compat",[AI]:"fire-analytics",[kI]:"fire-analytics-compat",[RI]:"fire-app-check",[CI]:"fire-app-check-compat",[PI]:"fire-auth",[xI]:"fire-auth-compat",[NI]:"fire-rtdb",[DI]:"fire-data-connect",[VI]:"fire-rtdb-compat",[bI]:"fire-fn",[OI]:"fire-fn-compat",[LI]:"fire-iid",[MI]:"fire-iid-compat",[FI]:"fire-fcm",[jI]:"fire-fcm-compat",[UI]:"fire-perf",[BI]:"fire-perf-compat",[zI]:"fire-rc",[$I]:"fire-rc-compat",[WI]:"fire-gcs",[HI]:"fire-gcs-compat",[qI]:"fire-fst",[GI]:"fire-fst-compat",[KI]:"fire-vertex","fire-js":"fire-js",[QI]:"fire-js-all"};/**
 * @license
 * Copyright 2019 Google LLC
 *
 * Licensed under the Apache License, Version 2.0 (the "License");
 * you may not use this file except in compliance with the License.
 * You may obtain a copy of the License at
 *
 *   http://www.apache.org/licenses/LICENSE-2.0
 *
 * Unless required by applicable law or agreed to in writing, software
 * distributed under the License is distributed on an "AS IS" BASIS,
 * WITHOUT WARRANTIES OR CONDITIONS OF ANY KIND, either express or implied.
 * See the License for the specific language governing permissions and
 * limitations under the License.
 */const pl=new Map,JI=new Map,mh=new Map;function Vm(t,e){try{t.container.addComponent(e)}catch(n){kn.debug(`Component ${e.name} failed to register with FirebaseApp ${t.name}`,n)}}function Di(t){const e=t.name;if(mh.has(e))return kn.debug(`There were multiple attempts to register component ${e}.`),!1;mh.set(e,t);for(const n of pl.values())Vm(n,t);for(const n of JI.values())Vm(n,t);return!0}function Vd(t,e){const n=t.container.getProvider("heartbeat").getImmediate({optional:!0});return n&&n.triggerHeartbeat(),t.container.getProvider(e)}function Jt(t){return t.settings!==void 0}/**
 * @license
 * Copyright 2019 Google LLC
 *
 * Licensed under the Apache License, Version 2.0 (the "License");
 * you may not use this file except in compliance with the License.
 * You may obtain a copy of the License at
 *
 *   http://www.apache.org/licenses/LICENSE-2.0
 *
 * Unless required by applicable law or agreed to in writing, software
 * distributed under the License is distributed on an "AS IS" BASIS,
 * WITHOUT WARRANTIES OR CONDITIONS OF ANY KIND, either express or implied.
 * See the License for the specific language governing permissions and
 * limitations under the License.
 */const ZI={"no-app":"No Firebase App '{$appName}' has been created - call initializeApp() first","bad-app-name":"Illegal App name: '{$appName}'","duplicate-app":"Firebase App named '{$appName}' already exists with different options or config","app-deleted":"Firebase App named '{$appName}' already deleted","server-app-deleted":"Firebase Server App has been deleted","no-options":"Need to provide options, when not being deployed to hosting via source.","invalid-app-argument":"firebase.{$appName}() takes either no argument or a Firebase App instance.","invalid-log-argument":"First argument to `onLog` must be null or a function.","idb-open":"Error thrown when opening IndexedDB. Original error: {$originalErrorMessage}.","idb-get":"Error thrown when reading from IndexedDB. Original error: {$originalErrorMessage}.","idb-set":"Error thrown when writing to IndexedDB. Original error: {$originalErrorMessage}.","idb-delete":"Error thrown when deleting from IndexedDB. Original error: {$originalErrorMessage}.","finalization-registry-not-supported":"FirebaseServerApp deleteOnDeref field defined but the JS runtime does not support FinalizationRegistry.","invalid-server-app-environment":"FirebaseServerApp is not for use in browser environments."},sr=new Eo("app","Firebase",ZI);/**
 * @license
 * Copyright 2019 Google LLC
 *
 * Licensed under the Apache License, Version 2.0 (the "License");
 * you may not use this file except in compliance with the License.
 * You may obtain a copy of the License at
 *
 *   http://www.apache.org/licenses/LICENSE-2.0
 *
 * Unless required by applicable law or agreed to in writing, software
 * distributed under the License is distributed on an "AS IS" BASIS,
 * WITHOUT WARRANTIES OR CONDITIONS OF ANY KIND, either express or implied.
 * See the License for the specific language governing permissions and
 * limitations under the License.
 */class eS{constructor(e,n,r){this._isDeleted=!1,this._options=Object.assign({},e),this._config=Object.assign({},n),this._name=n.name,this._automaticDataCollectionEnabled=n.automaticDataCollectionEnabled,this._container=r,this.container.addComponent(new jr("app",()=>this,"PUBLIC"))}get automaticDataCollectionEnabled(){return this.checkDestroyed(),this._automaticDataCollectionEnabled}set automaticDataCollectionEnabled(e){this.checkDestroyed(),this._automaticDataCollectionEnabled=e}get name(){return this.checkDestroyed(),this._name}get options(){return this.checkDestroyed(),this._options}get config(){return this.checkDestroyed(),this._config}get container(){return this._container}get isDeleted(){return this._isDeleted}set isDeleted(e){this._isDeleted=e}checkDestroyed(){if(this.isDeleted)throw sr.create("app-deleted",{appName:this._name})}}/**
 * @license
 * Copyright 2019 Google LLC
 *
 * Licensed under the Apache License, Version 2.0 (the "License");
 * you may not use this file except in compliance with the License.
 * You may obtain a copy of the License at
 *
 *   http://www.apache.org/licenses/LICENSE-2.0
 *
 * Unless required by applicable law or agreed to in writing, software
 * distributed under the License is distributed on an "AS IS" BASIS,
 * WITHOUT WARRANTIES OR CONDITIONS OF ANY KIND, either express or implied.
 * See the License for the specific language governing permissions and
 * limitations under the License.
 */const Wi=YI;function c_(t,e={}){let n=t;typeof e!="object"&&(e={name:e});const r=Object.assign({name:ph,automaticDataCollectionEnabled:!1},e),i=r.name;if(typeof i!="string"||!i)throw sr.create("bad-app-name",{appName:String(i)});if(n||(n=o_()),!n)throw sr.create("no-options");const s=pl.get(i);if(s){if(fl(n,s.options)&&fl(r,s.config))return s;throw sr.create("duplicate-app",{appName:i})}const o=new oI(i);for(const u of mh.values())o.addComponent(u);const l=new eS(n,r,o);return pl.set(i,l),l}function h_(t=ph){const e=pl.get(t);if(!e&&t===ph&&o_())return c_();if(!e)throw sr.create("no-app",{appName:t});return e}function or(t,e,n){var r;let i=(r=XI[t])!==null&&r!==void 0?r:t;n&&(i+=`-${n}`);const s=i.match(/\s|\//),o=e.match(/\s|\//);if(s||o){const l=[`Unable to register library "${i}" with version "${e}":`];s&&l.push(`library name "${i}" contains illegal characters (whitespace or "/")`),s&&o&&l.push("and"),o&&l.push(`version name "${e}" contains illegal characters (whitespace or "/")`),kn.warn(l.join(" "));return}Di(new jr(`${i}-version`,()=>({library:i,version:e}),"VERSION"))}/**
 * @license
 * Copyright 2021 Google LLC
 *
 * Licensed under the Apache License, Version 2.0 (the "License");
 * you may not use this file except in compliance with the License.
 * You may obtain a copy of the License at
 *
 *   http://www.apache.org/licenses/LICENSE-2.0
 *
 * Unless required by applicable law or agreed to in writing, software
 * distributed under the License is distributed on an "AS IS" BASIS,
 * WITHOUT WARRANTIES OR CONDITIONS OF ANY KIND, either express or implied.
 * See the License for the specific language governing permissions and
 * limitations under the License.
 */const tS="firebase-heartbeat-database",nS=1,so="firebase-heartbeat-store";let oc=null;function d_(){return oc||(oc=_I(tS,nS,{upgrade:(t,e)=>{switch(e){case 0:try{t.createObjectStore(so)}catch(n){console.warn(n)}}}}).catch(t=>{throw sr.create("idb-open",{originalErrorMessage:t.message})})),oc}async function rS(t){try{const n=(await d_()).transaction(so),r=await n.objectStore(so).get(f_(t));return await n.done,r}catch(e){if(e instanceof Dn)kn.warn(e.message);else{const n=sr.create("idb-get",{originalErrorMessage:e==null?void 0:e.message});kn.warn(n.message)}}}async function bm(t,e){try{const r=(await d_()).transaction(so,"readwrite");await r.objectStore(so).put(e,f_(t)),await r.done}catch(n){if(n instanceof Dn)kn.warn(n.message);else{const r=sr.create("idb-set",{originalErrorMessage:n==null?void 0:n.message});kn.warn(r.message)}}}function f_(t){return`${t.name}!${t.options.appId}`}/**
 * @license
 * Copyright 2021 Google LLC
 *
 * Licensed under the Apache License, Version 2.0 (the "License");
 * you may not use this file except in compliance with the License.
 * You may obtain a copy of the License at
 *
 *   http://www.apache.org/licenses/LICENSE-2.0
 *
 * Unless required by applicable law or agreed to in writing, software
 * distributed under the License is distributed on an "AS IS" BASIS,
 * WITHOUT WARRANTIES OR CONDITIONS OF ANY KIND, either express or implied.
 * See the License for the specific language governing permissions and
 * limitations under the License.
 */const iS=1024,sS=30*24*60*60*1e3;class oS{constructor(e){this.container=e,this._heartbeatsCache=null;const n=this.container.getProvider("app").getImmediate();this._storage=new lS(n),this._heartbeatsCachePromise=this._storage.read().then(r=>(this._heartbeatsCache=r,r))}async triggerHeartbeat(){var e,n;try{const i=this.container.getProvider("platform-logger").getImmediate().getPlatformInfoString(),s=Om();return((e=this._heartbeatsCache)===null||e===void 0?void 0:e.heartbeats)==null&&(this._heartbeatsCache=await this._heartbeatsCachePromise,((n=this._heartbeatsCache)===null||n===void 0?void 0:n.heartbeats)==null)||this._heartbeatsCache.lastSentHeartbeatDate===s||this._heartbeatsCache.heartbeats.some(o=>o.date===s)?void 0:(this._heartbeatsCache.heartbeats.push({date:s,agent:i}),this._heartbeatsCache.heartbeats=this._heartbeatsCache.heartbeats.filter(o=>{const l=new Date(o.date).valueOf();return Date.now()-l<=sS}),this._storage.overwrite(this._heartbeatsCache))}catch(r){kn.warn(r)}}async getHeartbeatsHeader(){var e;try{if(this._heartbeatsCache===null&&await this._heartbeatsCachePromise,((e=this._heartbeatsCache)===null||e===void 0?void 0:e.heartbeats)==null||this._heartbeatsCache.heartbeats.length===0)return"";const n=Om(),{heartbeatsToSend:r,unsentEntries:i}=aS(this._heartbeatsCache.heartbeats),s=dl(JSON.stringify({version:2,heartbeats:r}));return this._heartbeatsCache.lastSentHeartbeatDate=n,i.length>0?(this._heartbeatsCache.heartbeats=i,await this._storage.overwrite(this._heartbeatsCache)):(this._heartbeatsCache.heartbeats=[],this._storage.overwrite(this._heartbeatsCache)),s}catch(n){return kn.warn(n),""}}}function Om(){return new Date().toISOString().substring(0,10)}function aS(t,e=iS){const n=[];let r=t.slice();for(const i of t){const s=n.find(o=>o.agent===i.agent);if(s){if(s.dates.push(i.date),Lm(n)>e){s.dates.pop();break}}else if(n.push({agent:i.agent,dates:[i.date]}),Lm(n)>e){n.pop();break}r=r.slice(1)}return{heartbeatsToSend:n,unsentEntries:r}}class lS{constructor(e){this.app=e,this._canUseIndexedDBPromise=this.runIndexedDBEnvironmentCheck()}async runIndexedDBEnvironmentCheck(){return G1()?Q1().then(()=>!0).catch(()=>!1):!1}async read(){if(await this._canUseIndexedDBPromise){const n=await rS(this.app);return n!=null&&n.heartbeats?n:{heartbeats:[]}}else return{heartbeats:[]}}async overwrite(e){var n;if(await this._canUseIndexedDBPromise){const i=await this.read();return bm(this.app,{lastSentHeartbeatDate:(n=e.lastSentHeartbeatDate)!==null&&n!==void 0?n:i.lastSentHeartbeatDate,heartbeats:e.heartbeats})}else return}async add(e){var n;if(await this._canUseIndexedDBPromise){const i=await this.read();return bm(this.app,{lastSentHeartbeatDate:(n=e.lastSentHeartbeatDate)!==null&&n!==void 0?n:i.lastSentHeartbeatDate,heartbeats:[...i.heartbeats,...e.heartbeats]})}else return}}function Lm(t){return dl(JSON.stringify({version:2,heartbeats:t})).length}/**
 * @license
 * Copyright 2019 Google LLC
 *
 * Licensed under the Apache License, Version 2.0 (the "License");
 * you may not use this file except in compliance with the License.
 * You may obtain a copy of the License at
 *
 *   http://www.apache.org/licenses/LICENSE-2.0
 *
 * Unless required by applicable law or agreed to in writing, software
 * distributed under the License is distributed on an "AS IS" BASIS,
 * WITHOUT WARRANTIES OR CONDITIONS OF ANY KIND, either express or implied.
 * See the License for the specific language governing permissions and
 * limitations under the License.
 */function uS(t){Di(new jr("platform-logger",e=>new TI(e),"PRIVATE")),Di(new jr("heartbeat",e=>new oS(e),"PRIVATE")),or(fh,Dm,t),or(fh,Dm,"esm2017"),or("fire-js","")}uS("");var cS="firebase",hS="10.14.1";/**
 * @license
 * Copyright 2020 Google LLC
 *
 * Licensed under the Apache License, Version 2.0 (the "License");
 * you may not use this file except in compliance with the License.
 * You may obtain a copy of the License at
 *
 *   http://www.apache.org/licenses/LICENSE-2.0
 *
 * Unless required by applicable law or agreed to in writing, software
 * distributed under the License is distributed on an "AS IS" BASIS,
 * WITHOUT WARRANTIES OR CONDITIONS OF ANY KIND, either express or implied.
 * See the License for the specific language governing permissions and
 * limitations under the License.
 */or(cS,hS,"app");function bd(t,e){var n={};for(var r in t)Object.prototype.hasOwnProperty.call(t,r)&&e.indexOf(r)<0&&(n[r]=t[r]);if(t!=null&&typeof Object.getOwnPropertySymbols=="function")for(var i=0,r=Object.getOwnPropertySymbols(t);i<r.length;i++)e.indexOf(r[i])<0&&Object.prototype.propertyIsEnumerable.call(t,r[i])&&(n[r[i]]=t[r[i]]);return n}function p_(){return{"dependent-sdk-initialized-before-auth":"Another Firebase SDK was initialized and is trying to use Auth before Auth is initialized. Please be sure to call `initializeAuth` or `getAuth` before starting any other Firebase SDK."}}const dS=p_,m_=new Eo("auth","Firebase",p_());/**
 * @license
 * Copyright 2020 Google LLC
 *
 * Licensed under the Apache License, Version 2.0 (the "License");
 * you may not use this file except in compliance with the License.
 * You may obtain a copy of the License at
 *
 *   http://www.apache.org/licenses/LICENSE-2.0
 *
 * Unless required by applicable law or agreed to in writing, software
 * distributed under the License is distributed on an "AS IS" BASIS,
 * WITHOUT WARRANTIES OR CONDITIONS OF ANY KIND, either express or implied.
 * See the License for the specific language governing permissions and
 * limitations under the License.
 */const ml=new Nd("@firebase/auth");function fS(t,...e){ml.logLevel<=se.WARN&&ml.warn(`Auth (${Wi}): ${t}`,...e)}function Da(t,...e){ml.logLevel<=se.ERROR&&ml.error(`Auth (${Wi}): ${t}`,...e)}/**
 * @license
 * Copyright 2020 Google LLC
 *
 * Licensed under the Apache License, Version 2.0 (the "License");
 * you may not use this file except in compliance with the License.
 * You may obtain a copy of the License at
 *
 *   http://www.apache.org/licenses/LICENSE-2.0
 *
 * Unless required by applicable law or agreed to in writing, software
 * distributed under the License is distributed on an "AS IS" BASIS,
 * WITHOUT WARRANTIES OR CONDITIONS OF ANY KIND, either express or implied.
 * See the License for the specific language governing permissions and
 * limitations under the License.
 */function An(t,...e){throw Od(t,...e)}function tn(t,...e){return Od(t,...e)}function g_(t,e,n){const r=Object.assign(Object.assign({},dS()),{[e]:n});return new Eo("auth","Firebase",r).create(e,{appName:t.name})}function wn(t){return g_(t,"operation-not-supported-in-this-environment","Operations that alter the current user are not supported in conjunction with FirebaseServerApp")}function Od(t,...e){if(typeof t!="string"){const n=e[0],r=[...e.slice(1)];return r[0]&&(r[0].appName=t.name),t._errorFactory.create(n,...r)}return m_.create(t,...e)}function X(t,e,...n){if(!t)throw Od(e,...n)}function gn(t){const e="INTERNAL ASSERTION FAILED: "+t;throw Da(e),new Error(e)}function Cn(t,e){t||gn(e)}/**
 * @license
 * Copyright 2020 Google LLC
 *
 * Licensed under the Apache License, Version 2.0 (the "License");
 * you may not use this file except in compliance with the License.
 * You may obtain a copy of the License at
 *
 *   http://www.apache.org/licenses/LICENSE-2.0
 *
 * Unless required by applicable law or agreed to in writing, software
 * distributed under the License is distributed on an "AS IS" BASIS,
 * WITHOUT WARRANTIES OR CONDITIONS OF ANY KIND, either express or implied.
 * See the License for the specific language governing permissions and
 * limitations under the License.
 */function gh(){var t;return typeof self<"u"&&((t=self.location)===null||t===void 0?void 0:t.href)||""}function pS(){return Mm()==="http:"||Mm()==="https:"}function Mm(){var t;return typeof self<"u"&&((t=self.location)===null||t===void 0?void 0:t.protocol)||null}/**
 * @license
 * Copyright 2020 Google LLC
 *
 * Licensed under the Apache License, Version 2.0 (the "License");
 * you may not use this file except in compliance with the License.
 * You may obtain a copy of the License at
 *
 *   http://www.apache.org/licenses/LICENSE-2.0
 *
 * Unless required by applicable law or agreed to in writing, software
 * distributed under the License is distributed on an "AS IS" BASIS,
 * WITHOUT WARRANTIES OR CONDITIONS OF ANY KIND, either express or implied.
 * See the License for the specific language governing permissions and
 * limitations under the License.
 */function mS(){return typeof navigator<"u"&&navigator&&"onLine"in navigator&&typeof navigator.onLine=="boolean"&&(pS()||W1()||"connection"in navigator)?navigator.onLine:!0}function gS(){if(typeof navigator>"u")return null;const t=navigator;return t.languages&&t.languages[0]||t.language||null}/**
 * @license
 * Copyright 2020 Google LLC
 *
 * Licensed under the Apache License, Version 2.0 (the "License");
 * you may not use this file except in compliance with the License.
 * You may obtain a copy of the License at
 *
 *   http://www.apache.org/licenses/LICENSE-2.0
 *
 * Unless required by applicable law or agreed to in writing, software
 * distributed under the License is distributed on an "AS IS" BASIS,
 * WITHOUT WARRANTIES OR CONDITIONS OF ANY KIND, either express or implied.
 * See the License for the specific language governing permissions and
 * limitations under the License.
 */class Io{constructor(e,n){this.shortDelay=e,this.longDelay=n,Cn(n>e,"Short delay should be less than long delay!"),this.isMobile=B1()||H1()}get(){return mS()?this.isMobile?this.longDelay:this.shortDelay:Math.min(5e3,this.shortDelay)}}/**
 * @license
 * Copyright 2020 Google LLC
 *
 * Licensed under the Apache License, Version 2.0 (the "License");
 * you may not use this file except in compliance with the License.
 * You may obtain a copy of the License at
 *
 *   http://www.apache.org/licenses/LICENSE-2.0
 *
 * Unless required by applicable law or agreed to in writing, software
 * distributed under the License is distributed on an "AS IS" BASIS,
 * WITHOUT WARRANTIES OR CONDITIONS OF ANY KIND, either express or implied.
 * See the License for the specific language governing permissions and
 * limitations under the License.
 */function Ld(t,e){Cn(t.emulator,"Emulator should always be set here");const{url:n}=t.emulator;return e?`${n}${e.startsWith("/")?e.slice(1):e}`:n}/**
 * @license
 * Copyright 2020 Google LLC
 *
 * Licensed under the Apache License, Version 2.0 (the "License");
 * you may not use this file except in compliance with the License.
 * You may obtain a copy of the License at
 *
 *   http://www.apache.org/licenses/LICENSE-2.0
 *
 * Unless required by applicable law or agreed to in writing, software
 * distributed under the License is distributed on an "AS IS" BASIS,
 * WITHOUT WARRANTIES OR CONDITIONS OF ANY KIND, either express or implied.
 * See the License for the specific language governing permissions and
 * limitations under the License.
 */class y_{static initialize(e,n,r){this.fetchImpl=e,n&&(this.headersImpl=n),r&&(this.responseImpl=r)}static fetch(){if(this.fetchImpl)return this.fetchImpl;if(typeof self<"u"&&"fetch"in self)return self.fetch;if(typeof globalThis<"u"&&globalThis.fetch)return globalThis.fetch;if(typeof fetch<"u")return fetch;gn("Could not find fetch implementation, make sure you call FetchProvider.initialize() with an appropriate polyfill")}static headers(){if(this.headersImpl)return this.headersImpl;if(typeof self<"u"&&"Headers"in self)return self.Headers;if(typeof globalThis<"u"&&globalThis.Headers)return globalThis.Headers;if(typeof Headers<"u")return Headers;gn("Could not find Headers implementation, make sure you call FetchProvider.initialize() with an appropriate polyfill")}static response(){if(this.responseImpl)return this.responseImpl;if(typeof self<"u"&&"Response"in self)return self.Response;if(typeof globalThis<"u"&&globalThis.Response)return globalThis.Response;if(typeof Response<"u")return Response;gn("Could not find Response implementation, make sure you call FetchProvider.initialize() with an appropriate polyfill")}}/**
 * @license
 * Copyright 2020 Google LLC
 *
 * Licensed under the Apache License, Version 2.0 (the "License");
 * you may not use this file except in compliance with the License.
 * You may obtain a copy of the License at
 *
 *   http://www.apache.org/licenses/LICENSE-2.0
 *
 * Unless required by applicable law or agreed to in writing, software
 * distributed under the License is distributed on an "AS IS" BASIS,
 * WITHOUT WARRANTIES OR CONDITIONS OF ANY KIND, either express or implied.
 * See the License for the specific language governing permissions and
 * limitations under the License.
 */const yS={CREDENTIAL_MISMATCH:"custom-token-mismatch",MISSING_CUSTOM_TOKEN:"internal-error",INVALID_IDENTIFIER:"invalid-email",MISSING_CONTINUE_URI:"internal-error",INVALID_PASSWORD:"wrong-password",MISSING_PASSWORD:"missing-password",INVALID_LOGIN_CREDENTIALS:"invalid-credential",EMAIL_EXISTS:"email-already-in-use",PASSWORD_LOGIN_DISABLED:"operation-not-allowed",INVALID_IDP_RESPONSE:"invalid-credential",INVALID_PENDING_TOKEN:"invalid-credential",FEDERATED_USER_ID_ALREADY_LINKED:"credential-already-in-use",MISSING_REQ_TYPE:"internal-error",EMAIL_NOT_FOUND:"user-not-found",RESET_PASSWORD_EXCEED_LIMIT:"too-many-requests",EXPIRED_OOB_CODE:"expired-action-code",INVALID_OOB_CODE:"invalid-action-code",MISSING_OOB_CODE:"internal-error",CREDENTIAL_TOO_OLD_LOGIN_AGAIN:"requires-recent-login",INVALID_ID_TOKEN:"invalid-user-token",TOKEN_EXPIRED:"user-token-expired",USER_NOT_FOUND:"user-token-expired",TOO_MANY_ATTEMPTS_TRY_LATER:"too-many-requests",PASSWORD_DOES_NOT_MEET_REQUIREMENTS:"password-does-not-meet-requirements",INVALID_CODE:"invalid-verification-code",INVALID_SESSION_INFO:"invalid-verification-id",INVALID_TEMPORARY_PROOF:"invalid-credential",MISSING_SESSION_INFO:"missing-verification-id",SESSION_EXPIRED:"code-expired",MISSING_ANDROID_PACKAGE_NAME:"missing-android-pkg-name",UNAUTHORIZED_DOMAIN:"unauthorized-continue-uri",INVALID_OAUTH_CLIENT_ID:"invalid-oauth-client-id",ADMIN_ONLY_OPERATION:"admin-restricted-operation",INVALID_MFA_PENDING_CREDENTIAL:"invalid-multi-factor-session",MFA_ENROLLMENT_NOT_FOUND:"multi-factor-info-not-found",MISSING_MFA_ENROLLMENT_ID:"missing-multi-factor-info",MISSING_MFA_PENDING_CREDENTIAL:"missing-multi-factor-session",SECOND_FACTOR_EXISTS:"second-factor-already-in-use",SECOND_FACTOR_LIMIT_EXCEEDED:"maximum-second-factor-count-exceeded",BLOCKING_FUNCTION_ERROR_RESPONSE:"internal-error",RECAPTCHA_NOT_ENABLED:"recaptcha-not-enabled",MISSING_RECAPTCHA_TOKEN:"missing-recaptcha-token",INVALID_RECAPTCHA_TOKEN:"invalid-recaptcha-token",INVALID_RECAPTCHA_ACTION:"invalid-recaptcha-action",MISSING_CLIENT_TYPE:"missing-client-type",MISSING_RECAPTCHA_VERSION:"missing-recaptcha-version",INVALID_RECAPTCHA_VERSION:"invalid-recaptcha-version",INVALID_REQ_TYPE:"invalid-req-type"};/**
 * @license
 * Copyright 2020 Google LLC
 *
 * Licensed under the Apache License, Version 2.0 (the "License");
 * you may not use this file except in compliance with the License.
 * You may obtain a copy of the License at
 *
 *   http://www.apache.org/licenses/LICENSE-2.0
 *
 * Unless required by applicable law or agreed to in writing, software
 * distributed under the License is distributed on an "AS IS" BASIS,
 * WITHOUT WARRANTIES OR CONDITIONS OF ANY KIND, either express or implied.
 * See the License for the specific language governing permissions and
 * limitations under the License.
 */const vS=new Io(3e4,6e4);function So(t,e){return t.tenantId&&!e.tenantId?Object.assign(Object.assign({},e),{tenantId:t.tenantId}):e}async function Hi(t,e,n,r,i={}){return v_(t,i,async()=>{let s={},o={};r&&(e==="GET"?o=r:s={body:JSON.stringify(r)});const l=To(Object.assign({key:t.config.apiKey},o)).slice(1),u=await t._getAdditionalHeaders();u["Content-Type"]="application/json",t.languageCode&&(u["X-Firebase-Locale"]=t.languageCode);const h=Object.assign({method:e,headers:u},s);return $1()||(h.referrerPolicy="no-referrer"),y_.fetch()(__(t,t.config.apiHost,n,l),h)})}async function v_(t,e,n){t._canInitEmulator=!1;const r=Object.assign(Object.assign({},yS),e);try{const i=new _S(t),s=await Promise.race([n(),i.promise]);i.clearNetworkTimeout();const o=await s.json();if("needConfirmation"in o)throw fa(t,"account-exists-with-different-credential",o);if(s.ok&&!("errorMessage"in o))return o;{const l=s.ok?o.errorMessage:o.error.message,[u,h]=l.split(" : ");if(u==="FEDERATED_USER_ID_ALREADY_LINKED")throw fa(t,"credential-already-in-use",o);if(u==="EMAIL_EXISTS")throw fa(t,"email-already-in-use",o);if(u==="USER_DISABLED")throw fa(t,"user-disabled",o);const f=r[u]||u.toLowerCase().replace(/[_\s]+/g,"-");if(h)throw g_(t,f,h);An(t,f)}}catch(i){if(i instanceof Dn)throw i;An(t,"network-request-failed",{message:String(i)})}}async function Md(t,e,n,r,i={}){const s=await Hi(t,e,n,r,i);return"mfaPendingCredential"in s&&An(t,"multi-factor-auth-required",{_serverResponse:s}),s}function __(t,e,n,r){const i=`${e}${n}?${r}`;return t.config.emulator?Ld(t.config,i):`${t.config.apiScheme}://${i}`}class _S{constructor(e){this.auth=e,this.timer=null,this.promise=new Promise((n,r)=>{this.timer=setTimeout(()=>r(tn(this.auth,"network-request-failed")),vS.get())})}clearNetworkTimeout(){clearTimeout(this.timer)}}function fa(t,e,n){const r={appName:t.name};n.email&&(r.email=n.email),n.phoneNumber&&(r.phoneNumber=n.phoneNumber);const i=tn(t,e,r);return i.customData._tokenResponse=n,i}/**
 * @license
 * Copyright 2020 Google LLC
 *
 * Licensed under the Apache License, Version 2.0 (the "License");
 * you may not use this file except in compliance with the License.
 * You may obtain a copy of the License at
 *
 *   http://www.apache.org/licenses/LICENSE-2.0
 *
 * Unless required by applicable law or agreed to in writing, software
 * distributed under the License is distributed on an "AS IS" BASIS,
 * WITHOUT WARRANTIES OR CONDITIONS OF ANY KIND, either express or implied.
 * See the License for the specific language governing permissions and
 * limitations under the License.
 */async function wS(t,e){return Hi(t,"POST","/v1/accounts:delete",e)}async function w_(t,e){return Hi(t,"POST","/v1/accounts:lookup",e)}/**
 * @license
 * Copyright 2020 Google LLC
 *
 * Licensed under the Apache License, Version 2.0 (the "License");
 * you may not use this file except in compliance with the License.
 * You may obtain a copy of the License at
 *
 *   http://www.apache.org/licenses/LICENSE-2.0
 *
 * Unless required by applicable law or agreed to in writing, software
 * distributed under the License is distributed on an "AS IS" BASIS,
 * WITHOUT WARRANTIES OR CONDITIONS OF ANY KIND, either express or implied.
 * See the License for the specific language governing permissions and
 * limitations under the License.
 */function Ms(t){if(t)try{const e=new Date(Number(t));if(!isNaN(e.getTime()))return e.toUTCString()}catch{}}async function ES(t,e=!1){const n=At(t),r=await n.getIdToken(e),i=Fd(r);X(i&&i.exp&&i.auth_time&&i.iat,n.auth,"internal-error");const s=typeof i.firebase=="object"?i.firebase:void 0,o=s==null?void 0:s.sign_in_provider;return{claims:i,token:r,authTime:Ms(ac(i.auth_time)),issuedAtTime:Ms(ac(i.iat)),expirationTime:Ms(ac(i.exp)),signInProvider:o||null,signInSecondFactor:(s==null?void 0:s.sign_in_second_factor)||null}}function ac(t){return Number(t)*1e3}function Fd(t){const[e,n,r]=t.split(".");if(e===void 0||n===void 0||r===void 0)return Da("JWT malformed, contained fewer than 3 sections"),null;try{const i=i_(n);return i?JSON.parse(i):(Da("Failed to decode base64 JWT payload"),null)}catch(i){return Da("Caught error parsing JWT payload as JSON",i==null?void 0:i.toString()),null}}function Fm(t){const e=Fd(t);return X(e,"internal-error"),X(typeof e.exp<"u","internal-error"),X(typeof e.iat<"u","internal-error"),Number(e.exp)-Number(e.iat)}/**
 * @license
 * Copyright 2020 Google LLC
 *
 * Licensed under the Apache License, Version 2.0 (the "License");
 * you may not use this file except in compliance with the License.
 * You may obtain a copy of the License at
 *
 *   http://www.apache.org/licenses/LICENSE-2.0
 *
 * Unless required by applicable law or agreed to in writing, software
 * distributed under the License is distributed on an "AS IS" BASIS,
 * WITHOUT WARRANTIES OR CONDITIONS OF ANY KIND, either express or implied.
 * See the License for the specific language governing permissions and
 * limitations under the License.
 */async function oo(t,e,n=!1){if(n)return e;try{return await e}catch(r){throw r instanceof Dn&&TS(r)&&t.auth.currentUser===t&&await t.auth.signOut(),r}}function TS({code:t}){return t==="auth/user-disabled"||t==="auth/user-token-expired"}/**
 * @license
 * Copyright 2020 Google LLC
 *
 * Licensed under the Apache License, Version 2.0 (the "License");
 * you may not use this file except in compliance with the License.
 * You may obtain a copy of the License at
 *
 *   http://www.apache.org/licenses/LICENSE-2.0
 *
 * Unless required by applicable law or agreed to in writing, software
 * distributed under the License is distributed on an "AS IS" BASIS,
 * WITHOUT WARRANTIES OR CONDITIONS OF ANY KIND, either express or implied.
 * See the License for the specific language governing permissions and
 * limitations under the License.
 */class IS{constructor(e){this.user=e,this.isRunning=!1,this.timerId=null,this.errorBackoff=3e4}_start(){this.isRunning||(this.isRunning=!0,this.schedule())}_stop(){this.isRunning&&(this.isRunning=!1,this.timerId!==null&&clearTimeout(this.timerId))}getInterval(e){var n;if(e){const r=this.errorBackoff;return this.errorBackoff=Math.min(this.errorBackoff*2,96e4),r}else{this.errorBackoff=3e4;const i=((n=this.user.stsTokenManager.expirationTime)!==null&&n!==void 0?n:0)-Date.now()-3e5;return Math.max(0,i)}}schedule(e=!1){if(!this.isRunning)return;const n=this.getInterval(e);this.timerId=setTimeout(async()=>{await this.iteration()},n)}async iteration(){try{await this.user.getIdToken(!0)}catch(e){(e==null?void 0:e.code)==="auth/network-request-failed"&&this.schedule(!0);return}this.schedule()}}/**
 * @license
 * Copyright 2020 Google LLC
 *
 * Licensed under the Apache License, Version 2.0 (the "License");
 * you may not use this file except in compliance with the License.
 * You may obtain a copy of the License at
 *
 *   http://www.apache.org/licenses/LICENSE-2.0
 *
 * Unless required by applicable law or agreed to in writing, software
 * distributed under the License is distributed on an "AS IS" BASIS,
 * WITHOUT WARRANTIES OR CONDITIONS OF ANY KIND, either express or implied.
 * See the License for the specific language governing permissions and
 * limitations under the License.
 */class yh{constructor(e,n){this.createdAt=e,this.lastLoginAt=n,this._initializeTime()}_initializeTime(){this.lastSignInTime=Ms(this.lastLoginAt),this.creationTime=Ms(this.createdAt)}_copy(e){this.createdAt=e.createdAt,this.lastLoginAt=e.lastLoginAt,this._initializeTime()}toJSON(){return{createdAt:this.createdAt,lastLoginAt:this.lastLoginAt}}}/**
 * @license
 * Copyright 2019 Google LLC
 *
 * Licensed under the Apache License, Version 2.0 (the "License");
 * you may not use this file except in compliance with the License.
 * You may obtain a copy of the License at
 *
 *   http://www.apache.org/licenses/LICENSE-2.0
 *
 * Unless required by applicable law or agreed to in writing, software
 * distributed under the License is distributed on an "AS IS" BASIS,
 * WITHOUT WARRANTIES OR CONDITIONS OF ANY KIND, either express or implied.
 * See the License for the specific language governing permissions and
 * limitations under the License.
 */async function gl(t){var e;const n=t.auth,r=await t.getIdToken(),i=await oo(t,w_(n,{idToken:r}));X(i==null?void 0:i.users.length,n,"internal-error");const s=i.users[0];t._notifyReloadListener(s);const o=!((e=s.providerUserInfo)===null||e===void 0)&&e.length?E_(s.providerUserInfo):[],l=kS(t.providerData,o),u=t.isAnonymous,h=!(t.email&&s.passwordHash)&&!(l!=null&&l.length),f=u?h:!1,g={uid:s.localId,displayName:s.displayName||null,photoURL:s.photoUrl||null,email:s.email||null,emailVerified:s.emailVerified||!1,phoneNumber:s.phoneNumber||null,tenantId:s.tenantId||null,providerData:l,metadata:new yh(s.createdAt,s.lastLoginAt),isAnonymous:f};Object.assign(t,g)}async function SS(t){const e=At(t);await gl(e),await e.auth._persistUserIfCurrent(e),e.auth._notifyListenersIfCurrent(e)}function kS(t,e){return[...t.filter(r=>!e.some(i=>i.providerId===r.providerId)),...e]}function E_(t){return t.map(e=>{var{providerId:n}=e,r=bd(e,["providerId"]);return{providerId:n,uid:r.rawId||"",displayName:r.displayName||null,email:r.email||null,phoneNumber:r.phoneNumber||null,photoURL:r.photoUrl||null}})}/**
 * @license
 * Copyright 2020 Google LLC
 *
 * Licensed under the Apache License, Version 2.0 (the "License");
 * you may not use this file except in compliance with the License.
 * You may obtain a copy of the License at
 *
 *   http://www.apache.org/licenses/LICENSE-2.0
 *
 * Unless required by applicable law or agreed to in writing, software
 * distributed under the License is distributed on an "AS IS" BASIS,
 * WITHOUT WARRANTIES OR CONDITIONS OF ANY KIND, either express or implied.
 * See the License for the specific language governing permissions and
 * limitations under the License.
 */async function AS(t,e){const n=await v_(t,{},async()=>{const r=To({grant_type:"refresh_token",refresh_token:e}).slice(1),{tokenApiHost:i,apiKey:s}=t.config,o=__(t,i,"/v1/token",`key=${s}`),l=await t._getAdditionalHeaders();return l["Content-Type"]="application/x-www-form-urlencoded",y_.fetch()(o,{method:"POST",headers:l,body:r})});return{accessToken:n.access_token,expiresIn:n.expires_in,refreshToken:n.refresh_token}}async function CS(t,e){return Hi(t,"POST","/v2/accounts:revokeToken",So(t,e))}/**
 * @license
 * Copyright 2020 Google LLC
 *
 * Licensed under the Apache License, Version 2.0 (the "License");
 * you may not use this file except in compliance with the License.
 * You may obtain a copy of the License at
 *
 *   http://www.apache.org/licenses/LICENSE-2.0
 *
 * Unless required by applicable law or agreed to in writing, software
 * distributed under the License is distributed on an "AS IS" BASIS,
 * WITHOUT WARRANTIES OR CONDITIONS OF ANY KIND, either express or implied.
 * See the License for the specific language governing permissions and
 * limitations under the License.
 */class Ei{constructor(){this.refreshToken=null,this.accessToken=null,this.expirationTime=null}get isExpired(){return!this.expirationTime||Date.now()>this.expirationTime-3e4}updateFromServerResponse(e){X(e.idToken,"internal-error"),X(typeof e.idToken<"u","internal-error"),X(typeof e.refreshToken<"u","internal-error");const n="expiresIn"in e&&typeof e.expiresIn<"u"?Number(e.expiresIn):Fm(e.idToken);this.updateTokensAndExpiration(e.idToken,e.refreshToken,n)}updateFromIdToken(e){X(e.length!==0,"internal-error");const n=Fm(e);this.updateTokensAndExpiration(e,null,n)}async getToken(e,n=!1){return!n&&this.accessToken&&!this.isExpired?this.accessToken:(X(this.refreshToken,e,"user-token-expired"),this.refreshToken?(await this.refresh(e,this.refreshToken),this.accessToken):null)}clearRefreshToken(){this.refreshToken=null}async refresh(e,n){const{accessToken:r,refreshToken:i,expiresIn:s}=await AS(e,n);this.updateTokensAndExpiration(r,i,Number(s))}updateTokensAndExpiration(e,n,r){this.refreshToken=n||null,this.accessToken=e||null,this.expirationTime=Date.now()+r*1e3}static fromJSON(e,n){const{refreshToken:r,accessToken:i,expirationTime:s}=n,o=new Ei;return r&&(X(typeof r=="string","internal-error",{appName:e}),o.refreshToken=r),i&&(X(typeof i=="string","internal-error",{appName:e}),o.accessToken=i),s&&(X(typeof s=="number","internal-error",{appName:e}),o.expirationTime=s),o}toJSON(){return{refreshToken:this.refreshToken,accessToken:this.accessToken,expirationTime:this.expirationTime}}_assign(e){this.accessToken=e.accessToken,this.refreshToken=e.refreshToken,this.expirationTime=e.expirationTime}_clone(){return Object.assign(new Ei,this.toJSON())}_performRefresh(){return gn("not implemented")}}/**
 * @license
 * Copyright 2020 Google LLC
 *
 * Licensed under the Apache License, Version 2.0 (the "License");
 * you may not use this file except in compliance with the License.
 * You may obtain a copy of the License at
 *
 *   http://www.apache.org/licenses/LICENSE-2.0
 *
 * Unless required by applicable law or agreed to in writing, software
 * distributed under the License is distributed on an "AS IS" BASIS,
 * WITHOUT WARRANTIES OR CONDITIONS OF ANY KIND, either express or implied.
 * See the License for the specific language governing permissions and
 * limitations under the License.
 */function Mn(t,e){X(typeof t=="string"||typeof t>"u","internal-error",{appName:e})}class yn{constructor(e){var{uid:n,auth:r,stsTokenManager:i}=e,s=bd(e,["uid","auth","stsTokenManager"]);this.providerId="firebase",this.proactiveRefresh=new IS(this),this.reloadUserInfo=null,this.reloadListener=null,this.uid=n,this.auth=r,this.stsTokenManager=i,this.accessToken=i.accessToken,this.displayName=s.displayName||null,this.email=s.email||null,this.emailVerified=s.emailVerified||!1,this.phoneNumber=s.phoneNumber||null,this.photoURL=s.photoURL||null,this.isAnonymous=s.isAnonymous||!1,this.tenantId=s.tenantId||null,this.providerData=s.providerData?[...s.providerData]:[],this.metadata=new yh(s.createdAt||void 0,s.lastLoginAt||void 0)}async getIdToken(e){const n=await oo(this,this.stsTokenManager.getToken(this.auth,e));return X(n,this.auth,"internal-error"),this.accessToken!==n&&(this.accessToken=n,await this.auth._persistUserIfCurrent(this),this.auth._notifyListenersIfCurrent(this)),n}getIdTokenResult(e){return ES(this,e)}reload(){return SS(this)}_assign(e){this!==e&&(X(this.uid===e.uid,this.auth,"internal-error"),this.displayName=e.displayName,this.photoURL=e.photoURL,this.email=e.email,this.emailVerified=e.emailVerified,this.phoneNumber=e.phoneNumber,this.isAnonymous=e.isAnonymous,this.tenantId=e.tenantId,this.providerData=e.providerData.map(n=>Object.assign({},n)),this.metadata._copy(e.metadata),this.stsTokenManager._assign(e.stsTokenManager))}_clone(e){const n=new yn(Object.assign(Object.assign({},this),{auth:e,stsTokenManager:this.stsTokenManager._clone()}));return n.metadata._copy(this.metadata),n}_onReload(e){X(!this.reloadListener,this.auth,"internal-error"),this.reloadListener=e,this.reloadUserInfo&&(this._notifyReloadListener(this.reloadUserInfo),this.reloadUserInfo=null)}_notifyReloadListener(e){this.reloadListener?this.reloadListener(e):this.reloadUserInfo=e}_startProactiveRefresh(){this.proactiveRefresh._start()}_stopProactiveRefresh(){this.proactiveRefresh._stop()}async _updateTokensIfNecessary(e,n=!1){let r=!1;e.idToken&&e.idToken!==this.stsTokenManager.accessToken&&(this.stsTokenManager.updateFromServerResponse(e),r=!0),n&&await gl(this),await this.auth._persistUserIfCurrent(this),r&&this.auth._notifyListenersIfCurrent(this)}async delete(){if(Jt(this.auth.app))return Promise.reject(wn(this.auth));const e=await this.getIdToken();return await oo(this,wS(this.auth,{idToken:e})),this.stsTokenManager.clearRefreshToken(),this.auth.signOut()}toJSON(){return Object.assign(Object.assign({uid:this.uid,email:this.email||void 0,emailVerified:this.emailVerified,displayName:this.displayName||void 0,isAnonymous:this.isAnonymous,photoURL:this.photoURL||void 0,phoneNumber:this.phoneNumber||void 0,tenantId:this.tenantId||void 0,providerData:this.providerData.map(e=>Object.assign({},e)),stsTokenManager:this.stsTokenManager.toJSON(),_redirectEventId:this._redirectEventId},this.metadata.toJSON()),{apiKey:this.auth.config.apiKey,appName:this.auth.name})}get refreshToken(){return this.stsTokenManager.refreshToken||""}static _fromJSON(e,n){var r,i,s,o,l,u,h,f;const g=(r=n.displayName)!==null&&r!==void 0?r:void 0,v=(i=n.email)!==null&&i!==void 0?i:void 0,R=(s=n.phoneNumber)!==null&&s!==void 0?s:void 0,N=(o=n.photoURL)!==null&&o!==void 0?o:void 0,D=(l=n.tenantId)!==null&&l!==void 0?l:void 0,V=(u=n._redirectEventId)!==null&&u!==void 0?u:void 0,S=(h=n.createdAt)!==null&&h!==void 0?h:void 0,_=(f=n.lastLoginAt)!==null&&f!==void 0?f:void 0,{uid:k,emailVerified:O,isAnonymous:U,providerData:B,stsTokenManager:E}=n;X(k&&E,e,"internal-error");const y=Ei.fromJSON(this.name,E);X(typeof k=="string",e,"internal-error"),Mn(g,e.name),Mn(v,e.name),X(typeof O=="boolean",e,"internal-error"),X(typeof U=="boolean",e,"internal-error"),Mn(R,e.name),Mn(N,e.name),Mn(D,e.name),Mn(V,e.name),Mn(S,e.name),Mn(_,e.name);const w=new yn({uid:k,auth:e,email:v,emailVerified:O,displayName:g,isAnonymous:U,photoURL:N,phoneNumber:R,tenantId:D,stsTokenManager:y,createdAt:S,lastLoginAt:_});return B&&Array.isArray(B)&&(w.providerData=B.map(I=>Object.assign({},I))),V&&(w._redirectEventId=V),w}static async _fromIdTokenResponse(e,n,r=!1){const i=new Ei;i.updateFromServerResponse(n);const s=new yn({uid:n.localId,auth:e,stsTokenManager:i,isAnonymous:r});return await gl(s),s}static async _fromGetAccountInfoResponse(e,n,r){const i=n.users[0];X(i.localId!==void 0,"internal-error");const s=i.providerUserInfo!==void 0?E_(i.providerUserInfo):[],o=!(i.email&&i.passwordHash)&&!(s!=null&&s.length),l=new Ei;l.updateFromIdToken(r);const u=new yn({uid:i.localId,auth:e,stsTokenManager:l,isAnonymous:o}),h={uid:i.localId,displayName:i.displayName||null,photoURL:i.photoUrl||null,email:i.email||null,emailVerified:i.emailVerified||!1,phoneNumber:i.phoneNumber||null,tenantId:i.tenantId||null,providerData:s,metadata:new yh(i.createdAt,i.lastLoginAt),isAnonymous:!(i.email&&i.passwordHash)&&!(s!=null&&s.length)};return Object.assign(u,h),u}}/**
 * @license
 * Copyright 2020 Google LLC
 *
 * Licensed under the Apache License, Version 2.0 (the "License");
 * you may not use this file except in compliance with the License.
 * You may obtain a copy of the License at
 *
 *   http://www.apache.org/licenses/LICENSE-2.0
 *
 * Unless required by applicable law or agreed to in writing, software
 * distributed under the License is distributed on an "AS IS" BASIS,
 * WITHOUT WARRANTIES OR CONDITIONS OF ANY KIND, either express or implied.
 * See the License for the specific language governing permissions and
 * limitations under the License.
 */const jm=new Map;function vn(t){Cn(t instanceof Function,"Expected a class definition");let e=jm.get(t);return e?(Cn(e instanceof t,"Instance stored in cache mismatched with class"),e):(e=new t,jm.set(t,e),e)}/**
 * @license
 * Copyright 2019 Google LLC
 *
 * Licensed under the Apache License, Version 2.0 (the "License");
 * you may not use this file except in compliance with the License.
 * You may obtain a copy of the License at
 *
 *   http://www.apache.org/licenses/LICENSE-2.0
 *
 * Unless required by applicable law or agreed to in writing, software
 * distributed under the License is distributed on an "AS IS" BASIS,
 * WITHOUT WARRANTIES OR CONDITIONS OF ANY KIND, either express or implied.
 * See the License for the specific language governing permissions and
 * limitations under the License.
 */class T_{constructor(){this.type="NONE",this.storage={}}async _isAvailable(){return!0}async _set(e,n){this.storage[e]=n}async _get(e){const n=this.storage[e];return n===void 0?null:n}async _remove(e){delete this.storage[e]}_addListener(e,n){}_removeListener(e,n){}}T_.type="NONE";const Um=T_;/**
 * @license
 * Copyright 2019 Google LLC
 *
 * Licensed under the Apache License, Version 2.0 (the "License");
 * you may not use this file except in compliance with the License.
 * You may obtain a copy of the License at
 *
 *   http://www.apache.org/licenses/LICENSE-2.0
 *
 * Unless required by applicable law or agreed to in writing, software
 * distributed under the License is distributed on an "AS IS" BASIS,
 * WITHOUT WARRANTIES OR CONDITIONS OF ANY KIND, either express or implied.
 * See the License for the specific language governing permissions and
 * limitations under the License.
 */function Va(t,e,n){return`firebase:${t}:${e}:${n}`}class Ti{constructor(e,n,r){this.persistence=e,this.auth=n,this.userKey=r;const{config:i,name:s}=this.auth;this.fullUserKey=Va(this.userKey,i.apiKey,s),this.fullPersistenceKey=Va("persistence",i.apiKey,s),this.boundEventHandler=n._onStorageEvent.bind(n),this.persistence._addListener(this.fullUserKey,this.boundEventHandler)}setCurrentUser(e){return this.persistence._set(this.fullUserKey,e.toJSON())}async getCurrentUser(){const e=await this.persistence._get(this.fullUserKey);return e?yn._fromJSON(this.auth,e):null}removeCurrentUser(){return this.persistence._remove(this.fullUserKey)}savePersistenceForRedirect(){return this.persistence._set(this.fullPersistenceKey,this.persistence.type)}async setPersistence(e){if(this.persistence===e)return;const n=await this.getCurrentUser();if(await this.removeCurrentUser(),this.persistence=e,n)return this.setCurrentUser(n)}delete(){this.persistence._removeListener(this.fullUserKey,this.boundEventHandler)}static async create(e,n,r="authUser"){if(!n.length)return new Ti(vn(Um),e,r);const i=(await Promise.all(n.map(async h=>{if(await h._isAvailable())return h}))).filter(h=>h);let s=i[0]||vn(Um);const o=Va(r,e.config.apiKey,e.name);let l=null;for(const h of n)try{const f=await h._get(o);if(f){const g=yn._fromJSON(e,f);h!==s&&(l=g),s=h;break}}catch{}const u=i.filter(h=>h._shouldAllowMigration);return!s._shouldAllowMigration||!u.length?new Ti(s,e,r):(s=u[0],l&&await s._set(o,l.toJSON()),await Promise.all(n.map(async h=>{if(h!==s)try{await h._remove(o)}catch{}})),new Ti(s,e,r))}}/**
 * @license
 * Copyright 2020 Google LLC
 *
 * Licensed under the Apache License, Version 2.0 (the "License");
 * you may not use this file except in compliance with the License.
 * You may obtain a copy of the License at
 *
 *   http://www.apache.org/licenses/LICENSE-2.0
 *
 * Unless required by applicable law or agreed to in writing, software
 * distributed under the License is distributed on an "AS IS" BASIS,
 * WITHOUT WARRANTIES OR CONDITIONS OF ANY KIND, either express or implied.
 * See the License for the specific language governing permissions and
 * limitations under the License.
 */function Bm(t){const e=t.toLowerCase();if(e.includes("opera/")||e.includes("opr/")||e.includes("opios/"))return"Opera";if(A_(e))return"IEMobile";if(e.includes("msie")||e.includes("trident/"))return"IE";if(e.includes("edge/"))return"Edge";if(I_(e))return"Firefox";if(e.includes("silk/"))return"Silk";if(R_(e))return"Blackberry";if(P_(e))return"Webos";if(S_(e))return"Safari";if((e.includes("chrome/")||k_(e))&&!e.includes("edge/"))return"Chrome";if(C_(e))return"Android";{const n=/([a-zA-Z\d\.]+)\/[a-zA-Z\d\.]*$/,r=t.match(n);if((r==null?void 0:r.length)===2)return r[1]}return"Other"}function I_(t=at()){return/firefox\//i.test(t)}function S_(t=at()){const e=t.toLowerCase();return e.includes("safari/")&&!e.includes("chrome/")&&!e.includes("crios/")&&!e.includes("android")}function k_(t=at()){return/crios\//i.test(t)}function A_(t=at()){return/iemobile/i.test(t)}function C_(t=at()){return/android/i.test(t)}function R_(t=at()){return/blackberry/i.test(t)}function P_(t=at()){return/webos/i.test(t)}function jd(t=at()){return/iphone|ipad|ipod/i.test(t)||/macintosh/i.test(t)&&/mobile/i.test(t)}function RS(t=at()){var e;return jd(t)&&!!(!((e=window.navigator)===null||e===void 0)&&e.standalone)}function PS(){return q1()&&document.documentMode===10}function x_(t=at()){return jd(t)||C_(t)||P_(t)||R_(t)||/windows phone/i.test(t)||A_(t)}/**
 * @license
 * Copyright 2020 Google LLC
 *
 * Licensed under the Apache License, Version 2.0 (the "License");
 * you may not use this file except in compliance with the License.
 * You may obtain a copy of the License at
 *
 *   http://www.apache.org/licenses/LICENSE-2.0
 *
 * Unless required by applicable law or agreed to in writing, software
 * distributed under the License is distributed on an "AS IS" BASIS,
 * WITHOUT WARRANTIES OR CONDITIONS OF ANY KIND, either express or implied.
 * See the License for the specific language governing permissions and
 * limitations under the License.
 */function N_(t,e=[]){let n;switch(t){case"Browser":n=Bm(at());break;case"Worker":n=`${Bm(at())}-${t}`;break;default:n=t}const r=e.length?e.join(","):"FirebaseCore-web";return`${n}/JsCore/${Wi}/${r}`}/**
 * @license
 * Copyright 2022 Google LLC
 *
 * Licensed under the Apache License, Version 2.0 (the "License");
 * you may not use this file except in compliance with the License.
 * You may obtain a copy of the License at
 *
 *   http://www.apache.org/licenses/LICENSE-2.0
 *
 * Unless required by applicable law or agreed to in writing, software
 * distributed under the License is distributed on an "AS IS" BASIS,
 * WITHOUT WARRANTIES OR CONDITIONS OF ANY KIND, either express or implied.
 * See the License for the specific language governing permissions and
 * limitations under the License.
 */class xS{constructor(e){this.auth=e,this.queue=[]}pushCallback(e,n){const r=s=>new Promise((o,l)=>{try{const u=e(s);o(u)}catch(u){l(u)}});r.onAbort=n,this.queue.push(r);const i=this.queue.length-1;return()=>{this.queue[i]=()=>Promise.resolve()}}async runMiddleware(e){if(this.auth.currentUser===e)return;const n=[];try{for(const r of this.queue)await r(e),r.onAbort&&n.push(r.onAbort)}catch(r){n.reverse();for(const i of n)try{i()}catch{}throw this.auth._errorFactory.create("login-blocked",{originalMessage:r==null?void 0:r.message})}}}/**
 * @license
 * Copyright 2023 Google LLC
 *
 * Licensed under the Apache License, Version 2.0 (the "License");
 * you may not use this file except in compliance with the License.
 * You may obtain a copy of the License at
 *
 *   http://www.apache.org/licenses/LICENSE-2.0
 *
 * Unless required by applicable law or agreed to in writing, software
 * distributed under the License is distributed on an "AS IS" BASIS,
 * WITHOUT WARRANTIES OR CONDITIONS OF ANY KIND, either express or implied.
 * See the License for the specific language governing permissions and
 * limitations under the License.
 */async function NS(t,e={}){return Hi(t,"GET","/v2/passwordPolicy",So(t,e))}/**
 * @license
 * Copyright 2023 Google LLC
 *
 * Licensed under the Apache License, Version 2.0 (the "License");
 * you may not use this file except in compliance with the License.
 * You may obtain a copy of the License at
 *
 *   http://www.apache.org/licenses/LICENSE-2.0
 *
 * Unless required by applicable law or agreed to in writing, software
 * distributed under the License is distributed on an "AS IS" BASIS,
 * WITHOUT WARRANTIES OR CONDITIONS OF ANY KIND, either express or implied.
 * See the License for the specific language governing permissions and
 * limitations under the License.
 */const DS=6;class VS{constructor(e){var n,r,i,s;const o=e.customStrengthOptions;this.customStrengthOptions={},this.customStrengthOptions.minPasswordLength=(n=o.minPasswordLength)!==null&&n!==void 0?n:DS,o.maxPasswordLength&&(this.customStrengthOptions.maxPasswordLength=o.maxPasswordLength),o.containsLowercaseCharacter!==void 0&&(this.customStrengthOptions.containsLowercaseLetter=o.containsLowercaseCharacter),o.containsUppercaseCharacter!==void 0&&(this.customStrengthOptions.containsUppercaseLetter=o.containsUppercaseCharacter),o.containsNumericCharacter!==void 0&&(this.customStrengthOptions.containsNumericCharacter=o.containsNumericCharacter),o.containsNonAlphanumericCharacter!==void 0&&(this.customStrengthOptions.containsNonAlphanumericCharacter=o.containsNonAlphanumericCharacter),this.enforcementState=e.enforcementState,this.enforcementState==="ENFORCEMENT_STATE_UNSPECIFIED"&&(this.enforcementState="OFF"),this.allowedNonAlphanumericCharacters=(i=(r=e.allowedNonAlphanumericCharacters)===null||r===void 0?void 0:r.join(""))!==null&&i!==void 0?i:"",this.forceUpgradeOnSignin=(s=e.forceUpgradeOnSignin)!==null&&s!==void 0?s:!1,this.schemaVersion=e.schemaVersion}validatePassword(e){var n,r,i,s,o,l;const u={isValid:!0,passwordPolicy:this};return this.validatePasswordLengthOptions(e,u),this.validatePasswordCharacterOptions(e,u),u.isValid&&(u.isValid=(n=u.meetsMinPasswordLength)!==null&&n!==void 0?n:!0),u.isValid&&(u.isValid=(r=u.meetsMaxPasswordLength)!==null&&r!==void 0?r:!0),u.isValid&&(u.isValid=(i=u.containsLowercaseLetter)!==null&&i!==void 0?i:!0),u.isValid&&(u.isValid=(s=u.containsUppercaseLetter)!==null&&s!==void 0?s:!0),u.isValid&&(u.isValid=(o=u.containsNumericCharacter)!==null&&o!==void 0?o:!0),u.isValid&&(u.isValid=(l=u.containsNonAlphanumericCharacter)!==null&&l!==void 0?l:!0),u}validatePasswordLengthOptions(e,n){const r=this.customStrengthOptions.minPasswordLength,i=this.customStrengthOptions.maxPasswordLength;r&&(n.meetsMinPasswordLength=e.length>=r),i&&(n.meetsMaxPasswordLength=e.length<=i)}validatePasswordCharacterOptions(e,n){this.updatePasswordCharacterOptionsStatuses(n,!1,!1,!1,!1);let r;for(let i=0;i<e.length;i++)r=e.charAt(i),this.updatePasswordCharacterOptionsStatuses(n,r>="a"&&r<="z",r>="A"&&r<="Z",r>="0"&&r<="9",this.allowedNonAlphanumericCharacters.includes(r))}updatePasswordCharacterOptionsStatuses(e,n,r,i,s){this.customStrengthOptions.containsLowercaseLetter&&(e.containsLowercaseLetter||(e.containsLowercaseLetter=n)),this.customStrengthOptions.containsUppercaseLetter&&(e.containsUppercaseLetter||(e.containsUppercaseLetter=r)),this.customStrengthOptions.containsNumericCharacter&&(e.containsNumericCharacter||(e.containsNumericCharacter=i)),this.customStrengthOptions.containsNonAlphanumericCharacter&&(e.containsNonAlphanumericCharacter||(e.containsNonAlphanumericCharacter=s))}}/**
 * @license
 * Copyright 2020 Google LLC
 *
 * Licensed under the Apache License, Version 2.0 (the "License");
 * you may not use this file except in compliance with the License.
 * You may obtain a copy of the License at
 *
 *   http://www.apache.org/licenses/LICENSE-2.0
 *
 * Unless required by applicable law or agreed to in writing, software
 * distributed under the License is distributed on an "AS IS" BASIS,
 * WITHOUT WARRANTIES OR CONDITIONS OF ANY KIND, either express or implied.
 * See the License for the specific language governing permissions and
 * limitations under the License.
 */class bS{constructor(e,n,r,i){this.app=e,this.heartbeatServiceProvider=n,this.appCheckServiceProvider=r,this.config=i,this.currentUser=null,this.emulatorConfig=null,this.operations=Promise.resolve(),this.authStateSubscription=new zm(this),this.idTokenSubscription=new zm(this),this.beforeStateQueue=new xS(this),this.redirectUser=null,this.isProactiveRefreshEnabled=!1,this.EXPECTED_PASSWORD_POLICY_SCHEMA_VERSION=1,this._canInitEmulator=!0,this._isInitialized=!1,this._deleted=!1,this._initializationPromise=null,this._popupRedirectResolver=null,this._errorFactory=m_,this._agentRecaptchaConfig=null,this._tenantRecaptchaConfigs={},this._projectPasswordPolicy=null,this._tenantPasswordPolicies={},this.lastNotifiedUid=void 0,this.languageCode=null,this.tenantId=null,this.settings={appVerificationDisabledForTesting:!1},this.frameworks=[],this.name=e.name,this.clientVersion=i.sdkClientVersion}_initializeWithPersistence(e,n){return n&&(this._popupRedirectResolver=vn(n)),this._initializationPromise=this.queue(async()=>{var r,i;if(!this._deleted&&(this.persistenceManager=await Ti.create(this,e),!this._deleted)){if(!((r=this._popupRedirectResolver)===null||r===void 0)&&r._shouldInitProactively)try{await this._popupRedirectResolver._initialize(this)}catch{}await this.initializeCurrentUser(n),this.lastNotifiedUid=((i=this.currentUser)===null||i===void 0?void 0:i.uid)||null,!this._deleted&&(this._isInitialized=!0)}}),this._initializationPromise}async _onStorageEvent(){if(this._deleted)return;const e=await this.assertedPersistence.getCurrentUser();if(!(!this.currentUser&&!e)){if(this.currentUser&&e&&this.currentUser.uid===e.uid){this._currentUser._assign(e),await this.currentUser.getIdToken();return}await this._updateCurrentUser(e,!0)}}async initializeCurrentUserFromIdToken(e){try{const n=await w_(this,{idToken:e}),r=await yn._fromGetAccountInfoResponse(this,n,e);await this.directlySetCurrentUser(r)}catch(n){console.warn("FirebaseServerApp could not login user with provided authIdToken: ",n),await this.directlySetCurrentUser(null)}}async initializeCurrentUser(e){var n;if(Jt(this.app)){const o=this.app.settings.authIdToken;return o?new Promise(l=>{setTimeout(()=>this.initializeCurrentUserFromIdToken(o).then(l,l))}):this.directlySetCurrentUser(null)}const r=await this.assertedPersistence.getCurrentUser();let i=r,s=!1;if(e&&this.config.authDomain){await this.getOrInitRedirectPersistenceManager();const o=(n=this.redirectUser)===null||n===void 0?void 0:n._redirectEventId,l=i==null?void 0:i._redirectEventId,u=await this.tryRedirectSignIn(e);(!o||o===l)&&(u!=null&&u.user)&&(i=u.user,s=!0)}if(!i)return this.directlySetCurrentUser(null);if(!i._redirectEventId){if(s)try{await this.beforeStateQueue.runMiddleware(i)}catch(o){i=r,this._popupRedirectResolver._overrideRedirectResult(this,()=>Promise.reject(o))}return i?this.reloadAndSetCurrentUserOrClear(i):this.directlySetCurrentUser(null)}return X(this._popupRedirectResolver,this,"argument-error"),await this.getOrInitRedirectPersistenceManager(),this.redirectUser&&this.redirectUser._redirectEventId===i._redirectEventId?this.directlySetCurrentUser(i):this.reloadAndSetCurrentUserOrClear(i)}async tryRedirectSignIn(e){let n=null;try{n=await this._popupRedirectResolver._completeRedirectFn(this,e,!0)}catch{await this._setRedirectUser(null)}return n}async reloadAndSetCurrentUserOrClear(e){try{await gl(e)}catch(n){if((n==null?void 0:n.code)!=="auth/network-request-failed")return this.directlySetCurrentUser(null)}return this.directlySetCurrentUser(e)}useDeviceLanguage(){this.languageCode=gS()}async _delete(){this._deleted=!0}async updateCurrentUser(e){if(Jt(this.app))return Promise.reject(wn(this));const n=e?At(e):null;return n&&X(n.auth.config.apiKey===this.config.apiKey,this,"invalid-user-token"),this._updateCurrentUser(n&&n._clone(this))}async _updateCurrentUser(e,n=!1){if(!this._deleted)return e&&X(this.tenantId===e.tenantId,this,"tenant-id-mismatch"),n||await this.beforeStateQueue.runMiddleware(e),this.queue(async()=>{await this.directlySetCurrentUser(e),this.notifyAuthListeners()})}async signOut(){return Jt(this.app)?Promise.reject(wn(this)):(await this.beforeStateQueue.runMiddleware(null),(this.redirectPersistenceManager||this._popupRedirectResolver)&&await this._setRedirectUser(null),this._updateCurrentUser(null,!0))}setPersistence(e){return Jt(this.app)?Promise.reject(wn(this)):this.queue(async()=>{await this.assertedPersistence.setPersistence(vn(e))})}_getRecaptchaConfig(){return this.tenantId==null?this._agentRecaptchaConfig:this._tenantRecaptchaConfigs[this.tenantId]}async validatePassword(e){this._getPasswordPolicyInternal()||await this._updatePasswordPolicy();const n=this._getPasswordPolicyInternal();return n.schemaVersion!==this.EXPECTED_PASSWORD_POLICY_SCHEMA_VERSION?Promise.reject(this._errorFactory.create("unsupported-password-policy-schema-version",{})):n.validatePassword(e)}_getPasswordPolicyInternal(){return this.tenantId===null?this._projectPasswordPolicy:this._tenantPasswordPolicies[this.tenantId]}async _updatePasswordPolicy(){const e=await NS(this),n=new VS(e);this.tenantId===null?this._projectPasswordPolicy=n:this._tenantPasswordPolicies[this.tenantId]=n}_getPersistence(){return this.assertedPersistence.persistence.type}_updateErrorMap(e){this._errorFactory=new Eo("auth","Firebase",e())}onAuthStateChanged(e,n,r){return this.registerStateListener(this.authStateSubscription,e,n,r)}beforeAuthStateChanged(e,n){return this.beforeStateQueue.pushCallback(e,n)}onIdTokenChanged(e,n,r){return this.registerStateListener(this.idTokenSubscription,e,n,r)}authStateReady(){return new Promise((e,n)=>{if(this.currentUser)e();else{const r=this.onAuthStateChanged(()=>{r(),e()},n)}})}async revokeAccessToken(e){if(this.currentUser){const n=await this.currentUser.getIdToken(),r={providerId:"apple.com",tokenType:"ACCESS_TOKEN",token:e,idToken:n};this.tenantId!=null&&(r.tenantId=this.tenantId),await CS(this,r)}}toJSON(){var e;return{apiKey:this.config.apiKey,authDomain:this.config.authDomain,appName:this.name,currentUser:(e=this._currentUser)===null||e===void 0?void 0:e.toJSON()}}async _setRedirectUser(e,n){const r=await this.getOrInitRedirectPersistenceManager(n);return e===null?r.removeCurrentUser():r.setCurrentUser(e)}async getOrInitRedirectPersistenceManager(e){if(!this.redirectPersistenceManager){const n=e&&vn(e)||this._popupRedirectResolver;X(n,this,"argument-error"),this.redirectPersistenceManager=await Ti.create(this,[vn(n._redirectPersistence)],"redirectUser"),this.redirectUser=await this.redirectPersistenceManager.getCurrentUser()}return this.redirectPersistenceManager}async _redirectUserForId(e){var n,r;return this._isInitialized&&await this.queue(async()=>{}),((n=this._currentUser)===null||n===void 0?void 0:n._redirectEventId)===e?this._currentUser:((r=this.redirectUser)===null||r===void 0?void 0:r._redirectEventId)===e?this.redirectUser:null}async _persistUserIfCurrent(e){if(e===this.currentUser)return this.queue(async()=>this.directlySetCurrentUser(e))}_notifyListenersIfCurrent(e){e===this.currentUser&&this.notifyAuthListeners()}_key(){return`${this.config.authDomain}:${this.config.apiKey}:${this.name}`}_startProactiveRefresh(){this.isProactiveRefreshEnabled=!0,this.currentUser&&this._currentUser._startProactiveRefresh()}_stopProactiveRefresh(){this.isProactiveRefreshEnabled=!1,this.currentUser&&this._currentUser._stopProactiveRefresh()}get _currentUser(){return this.currentUser}notifyAuthListeners(){var e,n;if(!this._isInitialized)return;this.idTokenSubscription.next(this.currentUser);const r=(n=(e=this.currentUser)===null||e===void 0?void 0:e.uid)!==null&&n!==void 0?n:null;this.lastNotifiedUid!==r&&(this.lastNotifiedUid=r,this.authStateSubscription.next(this.currentUser))}registerStateListener(e,n,r,i){if(this._deleted)return()=>{};const s=typeof n=="function"?n:n.next.bind(n);let o=!1;const l=this._isInitialized?Promise.resolve():this._initializationPromise;if(X(l,this,"internal-error"),l.then(()=>{o||s(this.currentUser)}),typeof n=="function"){const u=e.addObserver(n,r,i);return()=>{o=!0,u()}}else{const u=e.addObserver(n);return()=>{o=!0,u()}}}async directlySetCurrentUser(e){this.currentUser&&this.currentUser!==e&&this._currentUser._stopProactiveRefresh(),e&&this.isProactiveRefreshEnabled&&e._startProactiveRefresh(),this.currentUser=e,e?await this.assertedPersistence.setCurrentUser(e):await this.assertedPersistence.removeCurrentUser()}queue(e){return this.operations=this.operations.then(e,e),this.operations}get assertedPersistence(){return X(this.persistenceManager,this,"internal-error"),this.persistenceManager}_logFramework(e){!e||this.frameworks.includes(e)||(this.frameworks.push(e),this.frameworks.sort(),this.clientVersion=N_(this.config.clientPlatform,this._getFrameworks()))}_getFrameworks(){return this.frameworks}async _getAdditionalHeaders(){var e;const n={"X-Client-Version":this.clientVersion};this.app.options.appId&&(n["X-Firebase-gmpid"]=this.app.options.appId);const r=await((e=this.heartbeatServiceProvider.getImmediate({optional:!0}))===null||e===void 0?void 0:e.getHeartbeatsHeader());r&&(n["X-Firebase-Client"]=r);const i=await this._getAppCheckToken();return i&&(n["X-Firebase-AppCheck"]=i),n}async _getAppCheckToken(){var e;const n=await((e=this.appCheckServiceProvider.getImmediate({optional:!0}))===null||e===void 0?void 0:e.getToken());return n!=null&&n.error&&fS(`Error while retrieving App Check token: ${n.error}`),n==null?void 0:n.token}}function ko(t){return At(t)}class zm{constructor(e){this.auth=e,this.observer=null,this.addObserver=eI(n=>this.observer=n)}get next(){return X(this.observer,this.auth,"internal-error"),this.observer.next.bind(this.observer)}}/**
 * @license
 * Copyright 2020 Google LLC
 *
 * Licensed under the Apache License, Version 2.0 (the "License");
 * you may not use this file except in compliance with the License.
 * You may obtain a copy of the License at
 *
 *   http://www.apache.org/licenses/LICENSE-2.0
 *
 * Unless required by applicable law or agreed to in writing, software
 * distributed under the License is distributed on an "AS IS" BASIS,
 * WITHOUT WARRANTIES OR CONDITIONS OF ANY KIND, either express or implied.
 * See the License for the specific language governing permissions and
 * limitations under the License.
 */let Ud={async loadJS(){throw new Error("Unable to load external scripts")},recaptchaV2Script:"",recaptchaEnterpriseScript:"",gapiScript:""};function OS(t){Ud=t}function LS(t){return Ud.loadJS(t)}function MS(){return Ud.gapiScript}function FS(t){return`__${t}${Math.floor(Math.random()*1e6)}`}/**
 * @license
 * Copyright 2020 Google LLC
 *
 * Licensed under the Apache License, Version 2.0 (the "License");
 * you may not use this file except in compliance with the License.
 * You may obtain a copy of the License at
 *
 *   http://www.apache.org/licenses/LICENSE-2.0
 *
 * Unless required by applicable law or agreed to in writing, software
 * distributed under the License is distributed on an "AS IS" BASIS,
 * WITHOUT WARRANTIES OR CONDITIONS OF ANY KIND, either express or implied.
 * See the License for the specific language governing permissions and
 * limitations under the License.
 */function jS(t,e){const n=Vd(t,"auth");if(n.isInitialized()){const i=n.getImmediate(),s=n.getOptions();if(fl(s,e??{}))return i;An(i,"already-initialized")}return n.initialize({options:e})}function US(t,e){const n=(e==null?void 0:e.persistence)||[],r=(Array.isArray(n)?n:[n]).map(vn);e!=null&&e.errorMap&&t._updateErrorMap(e.errorMap),t._initializeWithPersistence(r,e==null?void 0:e.popupRedirectResolver)}function BS(t,e,n){const r=ko(t);X(r._canInitEmulator,r,"emulator-config-failed"),X(/^https?:\/\//.test(e),r,"invalid-emulator-scheme");const i=!1,s=D_(e),{host:o,port:l}=zS(e),u=l===null?"":`:${l}`;r.config.emulator={url:`${s}//${o}${u}/`},r.settings.appVerificationDisabledForTesting=!0,r.emulatorConfig=Object.freeze({host:o,port:l,protocol:s.replace(":",""),options:Object.freeze({disableWarnings:i})}),$S()}function D_(t){const e=t.indexOf(":");return e<0?"":t.substr(0,e+1)}function zS(t){const e=D_(t),n=/(\/\/)?([^?#/]+)/.exec(t.substr(e.length));if(!n)return{host:"",port:null};const r=n[2].split("@").pop()||"",i=/^(\[[^\]]+\])(:|$)/.exec(r);if(i){const s=i[1];return{host:s,port:$m(r.substr(s.length+1))}}else{const[s,o]=r.split(":");return{host:s,port:$m(o)}}}function $m(t){if(!t)return null;const e=Number(t);return isNaN(e)?null:e}function $S(){function t(){const e=document.createElement("p"),n=e.style;e.innerText="Running in emulator mode. Do not use with production credentials.",n.position="fixed",n.width="100%",n.backgroundColor="#ffffff",n.border=".1em solid #000000",n.color="#b50000",n.bottom="0px",n.left="0px",n.margin="0px",n.zIndex="10000",n.textAlign="center",e.classList.add("firebase-emulator-warning"),document.body.appendChild(e)}typeof console<"u"&&typeof console.info=="function"&&console.info("WARNING: You are using the Auth Emulator, which is intended for local testing only.  Do not use with production credentials."),typeof window<"u"&&typeof document<"u"&&(document.readyState==="loading"?window.addEventListener("DOMContentLoaded",t):t())}/**
 * @license
 * Copyright 2020 Google LLC
 *
 * Licensed under the Apache License, Version 2.0 (the "License");
 * you may not use this file except in compliance with the License.
 * You may obtain a copy of the License at
 *
 *   http://www.apache.org/licenses/LICENSE-2.0
 *
 * Unless required by applicable law or agreed to in writing, software
 * distributed under the License is distributed on an "AS IS" BASIS,
 * WITHOUT WARRANTIES OR CONDITIONS OF ANY KIND, either express or implied.
 * See the License for the specific language governing permissions and
 * limitations under the License.
 */class V_{constructor(e,n){this.providerId=e,this.signInMethod=n}toJSON(){return gn("not implemented")}_getIdTokenResponse(e){return gn("not implemented")}_linkToIdToken(e,n){return gn("not implemented")}_getReauthenticationResolver(e){return gn("not implemented")}}/**
 * @license
 * Copyright 2020 Google LLC
 *
 * Licensed under the Apache License, Version 2.0 (the "License");
 * you may not use this file except in compliance with the License.
 * You may obtain a copy of the License at
 *
 *   http://www.apache.org/licenses/LICENSE-2.0
 *
 * Unless required by applicable law or agreed to in writing, software
 * distributed under the License is distributed on an "AS IS" BASIS,
 * WITHOUT WARRANTIES OR CONDITIONS OF ANY KIND, either express or implied.
 * See the License for the specific language governing permissions and
 * limitations under the License.
 */async function Ii(t,e){return Md(t,"POST","/v1/accounts:signInWithIdp",So(t,e))}/**
 * @license
 * Copyright 2020 Google LLC
 *
 * Licensed under the Apache License, Version 2.0 (the "License");
 * you may not use this file except in compliance with the License.
 * You may obtain a copy of the License at
 *
 *   http://www.apache.org/licenses/LICENSE-2.0
 *
 * Unless required by applicable law or agreed to in writing, software
 * distributed under the License is distributed on an "AS IS" BASIS,
 * WITHOUT WARRANTIES OR CONDITIONS OF ANY KIND, either express or implied.
 * See the License for the specific language governing permissions and
 * limitations under the License.
 */const WS="http://localhost";class Ur extends V_{constructor(){super(...arguments),this.pendingToken=null}static _fromParams(e){const n=new Ur(e.providerId,e.signInMethod);return e.idToken||e.accessToken?(e.idToken&&(n.idToken=e.idToken),e.accessToken&&(n.accessToken=e.accessToken),e.nonce&&!e.pendingToken&&(n.nonce=e.nonce),e.pendingToken&&(n.pendingToken=e.pendingToken)):e.oauthToken&&e.oauthTokenSecret?(n.accessToken=e.oauthToken,n.secret=e.oauthTokenSecret):An("argument-error"),n}toJSON(){return{idToken:this.idToken,accessToken:this.accessToken,secret:this.secret,nonce:this.nonce,pendingToken:this.pendingToken,providerId:this.providerId,signInMethod:this.signInMethod}}static fromJSON(e){const n=typeof e=="string"?JSON.parse(e):e,{providerId:r,signInMethod:i}=n,s=bd(n,["providerId","signInMethod"]);if(!r||!i)return null;const o=new Ur(r,i);return o.idToken=s.idToken||void 0,o.accessToken=s.accessToken||void 0,o.secret=s.secret,o.nonce=s.nonce,o.pendingToken=s.pendingToken||null,o}_getIdTokenResponse(e){const n=this.buildRequest();return Ii(e,n)}_linkToIdToken(e,n){const r=this.buildRequest();return r.idToken=n,Ii(e,r)}_getReauthenticationResolver(e){const n=this.buildRequest();return n.autoCreate=!1,Ii(e,n)}buildRequest(){const e={requestUri:WS,returnSecureToken:!0};if(this.pendingToken)e.pendingToken=this.pendingToken;else{const n={};this.idToken&&(n.id_token=this.idToken),this.accessToken&&(n.access_token=this.accessToken),this.secret&&(n.oauth_token_secret=this.secret),n.providerId=this.providerId,this.nonce&&!this.pendingToken&&(n.nonce=this.nonce),e.postBody=To(n)}return e}}/**
 * @license
 * Copyright 2020 Google LLC
 *
 * Licensed under the Apache License, Version 2.0 (the "License");
 * you may not use this file except in compliance with the License.
 * You may obtain a copy of the License at
 *
 *   http://www.apache.org/licenses/LICENSE-2.0
 *
 * Unless required by applicable law or agreed to in writing, software
 * distributed under the License is distributed on an "AS IS" BASIS,
 * WITHOUT WARRANTIES OR CONDITIONS OF ANY KIND, either express or implied.
 * See the License for the specific language governing permissions and
 * limitations under the License.
 */class b_{constructor(e){this.providerId=e,this.defaultLanguageCode=null,this.customParameters={}}setDefaultLanguage(e){this.defaultLanguageCode=e}setCustomParameters(e){return this.customParameters=e,this}getCustomParameters(){return this.customParameters}}/**
 * @license
 * Copyright 2019 Google LLC
 *
 * Licensed under the Apache License, Version 2.0 (the "License");
 * you may not use this file except in compliance with the License.
 * You may obtain a copy of the License at
 *
 *   http://www.apache.org/licenses/LICENSE-2.0
 *
 * Unless required by applicable law or agreed to in writing, software
 * distributed under the License is distributed on an "AS IS" BASIS,
 * WITHOUT WARRANTIES OR CONDITIONS OF ANY KIND, either express or implied.
 * See the License for the specific language governing permissions and
 * limitations under the License.
 */class Ao extends b_{constructor(){super(...arguments),this.scopes=[]}addScope(e){return this.scopes.includes(e)||this.scopes.push(e),this}getScopes(){return[...this.scopes]}}/**
 * @license
 * Copyright 2020 Google LLC
 *
 * Licensed under the Apache License, Version 2.0 (the "License");
 * you may not use this file except in compliance with the License.
 * You may obtain a copy of the License at
 *
 *   http://www.apache.org/licenses/LICENSE-2.0
 *
 * Unless required by applicable law or agreed to in writing, software
 * distributed under the License is distributed on an "AS IS" BASIS,
 * WITHOUT WARRANTIES OR CONDITIONS OF ANY KIND, either express or implied.
 * See the License for the specific language governing permissions and
 * limitations under the License.
 */class $n extends Ao{constructor(){super("facebook.com")}static credential(e){return Ur._fromParams({providerId:$n.PROVIDER_ID,signInMethod:$n.FACEBOOK_SIGN_IN_METHOD,accessToken:e})}static credentialFromResult(e){return $n.credentialFromTaggedObject(e)}static credentialFromError(e){return $n.credentialFromTaggedObject(e.customData||{})}static credentialFromTaggedObject({_tokenResponse:e}){if(!e||!("oauthAccessToken"in e)||!e.oauthAccessToken)return null;try{return $n.credential(e.oauthAccessToken)}catch{return null}}}$n.FACEBOOK_SIGN_IN_METHOD="facebook.com";$n.PROVIDER_ID="facebook.com";/**
 * @license
 * Copyright 2020 Google LLC
 *
 * Licensed under the Apache License, Version 2.0 (the "License");
 * you may not use this file except in compliance with the License.
 * You may obtain a copy of the License at
 *
 *   http://www.apache.org/licenses/LICENSE-2.0
 *
 * Unless required by applicable law or agreed to in writing, software
 * distributed under the License is distributed on an "AS IS" BASIS,
 * WITHOUT WARRANTIES OR CONDITIONS OF ANY KIND, either express or implied.
 * See the License for the specific language governing permissions and
 * limitations under the License.
 */class Wn extends Ao{constructor(){super("google.com"),this.addScope("profile")}static credential(e,n){return Ur._fromParams({providerId:Wn.PROVIDER_ID,signInMethod:Wn.GOOGLE_SIGN_IN_METHOD,idToken:e,accessToken:n})}static credentialFromResult(e){return Wn.credentialFromTaggedObject(e)}static credentialFromError(e){return Wn.credentialFromTaggedObject(e.customData||{})}static credentialFromTaggedObject({_tokenResponse:e}){if(!e)return null;const{oauthIdToken:n,oauthAccessToken:r}=e;if(!n&&!r)return null;try{return Wn.credential(n,r)}catch{return null}}}Wn.GOOGLE_SIGN_IN_METHOD="google.com";Wn.PROVIDER_ID="google.com";/**
 * @license
 * Copyright 2020 Google LLC
 *
 * Licensed under the Apache License, Version 2.0 (the "License");
 * you may not use this file except in compliance with the License.
 * You may obtain a copy of the License at
 *
 *   http://www.apache.org/licenses/LICENSE-2.0
 *
 * Unless required by applicable law or agreed to in writing, software
 * distributed under the License is distributed on an "AS IS" BASIS,
 * WITHOUT WARRANTIES OR CONDITIONS OF ANY KIND, either express or implied.
 * See the License for the specific language governing permissions and
 * limitations under the License.
 */class Hn extends Ao{constructor(){super("github.com")}static credential(e){return Ur._fromParams({providerId:Hn.PROVIDER_ID,signInMethod:Hn.GITHUB_SIGN_IN_METHOD,accessToken:e})}static credentialFromResult(e){return Hn.credentialFromTaggedObject(e)}static credentialFromError(e){return Hn.credentialFromTaggedObject(e.customData||{})}static credentialFromTaggedObject({_tokenResponse:e}){if(!e||!("oauthAccessToken"in e)||!e.oauthAccessToken)return null;try{return Hn.credential(e.oauthAccessToken)}catch{return null}}}Hn.GITHUB_SIGN_IN_METHOD="github.com";Hn.PROVIDER_ID="github.com";/**
 * @license
 * Copyright 2020 Google LLC
 *
 * Licensed under the Apache License, Version 2.0 (the "License");
 * you may not use this file except in compliance with the License.
 * You may obtain a copy of the License at
 *
 *   http://www.apache.org/licenses/LICENSE-2.0
 *
 * Unless required by applicable law or agreed to in writing, software
 * distributed under the License is distributed on an "AS IS" BASIS,
 * WITHOUT WARRANTIES OR CONDITIONS OF ANY KIND, either express or implied.
 * See the License for the specific language governing permissions and
 * limitations under the License.
 */class qn extends Ao{constructor(){super("twitter.com")}static credential(e,n){return Ur._fromParams({providerId:qn.PROVIDER_ID,signInMethod:qn.TWITTER_SIGN_IN_METHOD,oauthToken:e,oauthTokenSecret:n})}static credentialFromResult(e){return qn.credentialFromTaggedObject(e)}static credentialFromError(e){return qn.credentialFromTaggedObject(e.customData||{})}static credentialFromTaggedObject({_tokenResponse:e}){if(!e)return null;const{oauthAccessToken:n,oauthTokenSecret:r}=e;if(!n||!r)return null;try{return qn.credential(n,r)}catch{return null}}}qn.TWITTER_SIGN_IN_METHOD="twitter.com";qn.PROVIDER_ID="twitter.com";/**
 * @license
 * Copyright 2020 Google LLC
 *
 * Licensed under the Apache License, Version 2.0 (the "License");
 * you may not use this file except in compliance with the License.
 * You may obtain a copy of the License at
 *
 *   http://www.apache.org/licenses/LICENSE-2.0
 *
 * Unless required by applicable law or agreed to in writing, software
 * distributed under the License is distributed on an "AS IS" BASIS,
 * WITHOUT WARRANTIES OR CONDITIONS OF ANY KIND, either express or implied.
 * See the License for the specific language governing permissions and
 * limitations under the License.
 */async function HS(t,e){return Md(t,"POST","/v1/accounts:signUp",So(t,e))}/**
 * @license
 * Copyright 2020 Google LLC
 *
 * Licensed under the Apache License, Version 2.0 (the "License");
 * you may not use this file except in compliance with the License.
 * You may obtain a copy of the License at
 *
 *   http://www.apache.org/licenses/LICENSE-2.0
 *
 * Unless required by applicable law or agreed to in writing, software
 * distributed under the License is distributed on an "AS IS" BASIS,
 * WITHOUT WARRANTIES OR CONDITIONS OF ANY KIND, either express or implied.
 * See the License for the specific language governing permissions and
 * limitations under the License.
 */class Rn{constructor(e){this.user=e.user,this.providerId=e.providerId,this._tokenResponse=e._tokenResponse,this.operationType=e.operationType}static async _fromIdTokenResponse(e,n,r,i=!1){const s=await yn._fromIdTokenResponse(e,r,i),o=Wm(r);return new Rn({user:s,providerId:o,_tokenResponse:r,operationType:n})}static async _forOperation(e,n,r){await e._updateTokensIfNecessary(r,!0);const i=Wm(r);return new Rn({user:e,providerId:i,_tokenResponse:r,operationType:n})}}function Wm(t){return t.providerId?t.providerId:"phoneNumber"in t?"phone":null}/**
 * @license
 * Copyright 2020 Google LLC
 *
 * Licensed under the Apache License, Version 2.0 (the "License");
 * you may not use this file except in compliance with the License.
 * You may obtain a copy of the License at
 *
 *   http://www.apache.org/licenses/LICENSE-2.0
 *
 * Unless required by applicable law or agreed to in writing, software
 * distributed under the License is distributed on an "AS IS" BASIS,
 * WITHOUT WARRANTIES OR CONDITIONS OF ANY KIND, either express or implied.
 * See the License for the specific language governing permissions and
 * limitations under the License.
 */async function qS(t){var e;if(Jt(t.app))return Promise.reject(wn(t));const n=ko(t);if(await n._initializationPromise,!((e=n.currentUser)===null||e===void 0)&&e.isAnonymous)return new Rn({user:n.currentUser,providerId:null,operationType:"signIn"});const r=await HS(n,{returnSecureToken:!0}),i=await Rn._fromIdTokenResponse(n,"signIn",r,!0);return await n._updateCurrentUser(i.user),i}/**
 * @license
 * Copyright 2020 Google LLC
 *
 * Licensed under the Apache License, Version 2.0 (the "License");
 * you may not use this file except in compliance with the License.
 * You may obtain a copy of the License at
 *
 *   http://www.apache.org/licenses/LICENSE-2.0
 *
 * Unless required by applicable law or agreed to in writing, software
 * distributed under the License is distributed on an "AS IS" BASIS,
 * WITHOUT WARRANTIES OR CONDITIONS OF ANY KIND, either express or implied.
 * See the License for the specific language governing permissions and
 * limitations under the License.
 */class yl extends Dn{constructor(e,n,r,i){var s;super(n.code,n.message),this.operationType=r,this.user=i,Object.setPrototypeOf(this,yl.prototype),this.customData={appName:e.name,tenantId:(s=e.tenantId)!==null&&s!==void 0?s:void 0,_serverResponse:n.customData._serverResponse,operationType:r}}static _fromErrorAndOperation(e,n,r,i){return new yl(e,n,r,i)}}function O_(t,e,n,r){return(e==="reauthenticate"?n._getReauthenticationResolver(t):n._getIdTokenResponse(t)).catch(s=>{throw s.code==="auth/multi-factor-auth-required"?yl._fromErrorAndOperation(t,s,e,r):s})}async function KS(t,e,n=!1){const r=await oo(t,e._linkToIdToken(t.auth,await t.getIdToken()),n);return Rn._forOperation(t,"link",r)}/**
 * @license
 * Copyright 2019 Google LLC
 *
 * Licensed under the Apache License, Version 2.0 (the "License");
 * you may not use this file except in compliance with the License.
 * You may obtain a copy of the License at
 *
 *   http://www.apache.org/licenses/LICENSE-2.0
 *
 * Unless required by applicable law or agreed to in writing, software
 * distributed under the License is distributed on an "AS IS" BASIS,
 * WITHOUT WARRANTIES OR CONDITIONS OF ANY KIND, either express or implied.
 * See the License for the specific language governing permissions and
 * limitations under the License.
 */async function GS(t,e,n=!1){const{auth:r}=t;if(Jt(r.app))return Promise.reject(wn(r));const i="reauthenticate";try{const s=await oo(t,O_(r,i,e,t),n);X(s.idToken,r,"internal-error");const o=Fd(s.idToken);X(o,r,"internal-error");const{sub:l}=o;return X(t.uid===l,r,"user-mismatch"),Rn._forOperation(t,i,s)}catch(s){throw(s==null?void 0:s.code)==="auth/user-not-found"&&An(r,"user-mismatch"),s}}/**
 * @license
 * Copyright 2020 Google LLC
 *
 * Licensed under the Apache License, Version 2.0 (the "License");
 * you may not use this file except in compliance with the License.
 * You may obtain a copy of the License at
 *
 *   http://www.apache.org/licenses/LICENSE-2.0
 *
 * Unless required by applicable law or agreed to in writing, software
 * distributed under the License is distributed on an "AS IS" BASIS,
 * WITHOUT WARRANTIES OR CONDITIONS OF ANY KIND, either express or implied.
 * See the License for the specific language governing permissions and
 * limitations under the License.
 */async function QS(t,e,n=!1){if(Jt(t.app))return Promise.reject(wn(t));const r="signIn",i=await O_(t,r,e),s=await Rn._fromIdTokenResponse(t,r,i);return n||await t._updateCurrentUser(s.user),s}/**
 * @license
 * Copyright 2020 Google LLC
 *
 * Licensed under the Apache License, Version 2.0 (the "License");
 * you may not use this file except in compliance with the License.
 * You may obtain a copy of the License at
 *
 *   http://www.apache.org/licenses/LICENSE-2.0
 *
 * Unless required by applicable law or agreed to in writing, software
 * distributed under the License is distributed on an "AS IS" BASIS,
 * WITHOUT WARRANTIES OR CONDITIONS OF ANY KIND, either express or implied.
 * See the License for the specific language governing permissions and
 * limitations under the License.
 */async function YS(t,e){return Md(t,"POST","/v1/accounts:signInWithCustomToken",So(t,e))}/**
 * @license
 * Copyright 2020 Google LLC
 *
 * Licensed under the Apache License, Version 2.0 (the "License");
 * you may not use this file except in compliance with the License.
 * You may obtain a copy of the License at
 *
 *   http://www.apache.org/licenses/LICENSE-2.0
 *
 * Unless required by applicable law or agreed to in writing, software
 * distributed under the License is distributed on an "AS IS" BASIS,
 * WITHOUT WARRANTIES OR CONDITIONS OF ANY KIND, either express or implied.
 * See the License for the specific language governing permissions and
 * limitations under the License.
 */async function XS(t,e){if(Jt(t.app))return Promise.reject(wn(t));const n=ko(t),r=await YS(n,{token:e,returnSecureToken:!0}),i=await Rn._fromIdTokenResponse(n,"signIn",r);return await n._updateCurrentUser(i.user),i}function JS(t,e,n,r){return At(t).onIdTokenChanged(e,n,r)}function ZS(t,e,n){return At(t).beforeAuthStateChanged(e,n)}function ek(t,e,n,r){return At(t).onAuthStateChanged(e,n,r)}const vl="__sak";/**
 * @license
 * Copyright 2019 Google LLC
 *
 * Licensed under the Apache License, Version 2.0 (the "License");
 * you may not use this file except in compliance with the License.
 * You may obtain a copy of the License at
 *
 *   http://www.apache.org/licenses/LICENSE-2.0
 *
 * Unless required by applicable law or agreed to in writing, software
 * distributed under the License is distributed on an "AS IS" BASIS,
 * WITHOUT WARRANTIES OR CONDITIONS OF ANY KIND, either express or implied.
 * See the License for the specific language governing permissions and
 * limitations under the License.
 */class L_{constructor(e,n){this.storageRetriever=e,this.type=n}_isAvailable(){try{return this.storage?(this.storage.setItem(vl,"1"),this.storage.removeItem(vl),Promise.resolve(!0)):Promise.resolve(!1)}catch{return Promise.resolve(!1)}}_set(e,n){return this.storage.setItem(e,JSON.stringify(n)),Promise.resolve()}_get(e){const n=this.storage.getItem(e);return Promise.resolve(n?JSON.parse(n):null)}_remove(e){return this.storage.removeItem(e),Promise.resolve()}get storage(){return this.storageRetriever()}}/**
 * @license
 * Copyright 2020 Google LLC
 *
 * Licensed under the Apache License, Version 2.0 (the "License");
 * you may not use this file except in compliance with the License.
 * You may obtain a copy of the License at
 *
 *   http://www.apache.org/licenses/LICENSE-2.0
 *
 * Unless required by applicable law or agreed to in writing, software
 * distributed under the License is distributed on an "AS IS" BASIS,
 * WITHOUT WARRANTIES OR CONDITIONS OF ANY KIND, either express or implied.
 * See the License for the specific language governing permissions and
 * limitations under the License.
 */const tk=1e3,nk=10;class M_ extends L_{constructor(){super(()=>window.localStorage,"LOCAL"),this.boundEventHandler=(e,n)=>this.onStorageEvent(e,n),this.listeners={},this.localCache={},this.pollTimer=null,this.fallbackToPolling=x_(),this._shouldAllowMigration=!0}forAllChangedKeys(e){for(const n of Object.keys(this.listeners)){const r=this.storage.getItem(n),i=this.localCache[n];r!==i&&e(n,i,r)}}onStorageEvent(e,n=!1){if(!e.key){this.forAllChangedKeys((o,l,u)=>{this.notifyListeners(o,u)});return}const r=e.key;n?this.detachListener():this.stopPolling();const i=()=>{const o=this.storage.getItem(r);!n&&this.localCache[r]===o||this.notifyListeners(r,o)},s=this.storage.getItem(r);PS()&&s!==e.newValue&&e.newValue!==e.oldValue?setTimeout(i,nk):i()}notifyListeners(e,n){this.localCache[e]=n;const r=this.listeners[e];if(r)for(const i of Array.from(r))i(n&&JSON.parse(n))}startPolling(){this.stopPolling(),this.pollTimer=setInterval(()=>{this.forAllChangedKeys((e,n,r)=>{this.onStorageEvent(new StorageEvent("storage",{key:e,oldValue:n,newValue:r}),!0)})},tk)}stopPolling(){this.pollTimer&&(clearInterval(this.pollTimer),this.pollTimer=null)}attachListener(){window.addEventListener("storage",this.boundEventHandler)}detachListener(){window.removeEventListener("storage",this.boundEventHandler)}_addListener(e,n){Object.keys(this.listeners).length===0&&(this.fallbackToPolling?this.startPolling():this.attachListener()),this.listeners[e]||(this.listeners[e]=new Set,this.localCache[e]=this.storage.getItem(e)),this.listeners[e].add(n)}_removeListener(e,n){this.listeners[e]&&(this.listeners[e].delete(n),this.listeners[e].size===0&&delete this.listeners[e]),Object.keys(this.listeners).length===0&&(this.detachListener(),this.stopPolling())}async _set(e,n){await super._set(e,n),this.localCache[e]=JSON.stringify(n)}async _get(e){const n=await super._get(e);return this.localCache[e]=JSON.stringify(n),n}async _remove(e){await super._remove(e),delete this.localCache[e]}}M_.type="LOCAL";const rk=M_;/**
 * @license
 * Copyright 2020 Google LLC
 *
 * Licensed under the Apache License, Version 2.0 (the "License");
 * you may not use this file except in compliance with the License.
 * You may obtain a copy of the License at
 *
 *   http://www.apache.org/licenses/LICENSE-2.0
 *
 * Unless required by applicable law or agreed to in writing, software
 * distributed under the License is distributed on an "AS IS" BASIS,
 * WITHOUT WARRANTIES OR CONDITIONS OF ANY KIND, either express or implied.
 * See the License for the specific language governing permissions and
 * limitations under the License.
 */class F_ extends L_{constructor(){super(()=>window.sessionStorage,"SESSION")}_addListener(e,n){}_removeListener(e,n){}}F_.type="SESSION";const j_=F_;/**
 * @license
 * Copyright 2019 Google LLC
 *
 * Licensed under the Apache License, Version 2.0 (the "License");
 * you may not use this file except in compliance with the License.
 * You may obtain a copy of the License at
 *
 *   http://www.apache.org/licenses/LICENSE-2.0
 *
 * Unless required by applicable law or agreed to in writing, software
 * distributed under the License is distributed on an "AS IS" BASIS,
 * WITHOUT WARRANTIES OR CONDITIONS OF ANY KIND, either express or implied.
 * See the License for the specific language governing permissions and
 * limitations under the License.
 */function ik(t){return Promise.all(t.map(async e=>{try{return{fulfilled:!0,value:await e}}catch(n){return{fulfilled:!1,reason:n}}}))}/**
 * @license
 * Copyright 2019 Google LLC
 *
 * Licensed under the Apache License, Version 2.0 (the "License");
 * you may not use this file except in compliance with the License.
 * You may obtain a copy of the License at
 *
 *   http://www.apache.org/licenses/LICENSE-2.0
 *
 * Unless required by applicable law or agreed to in writing, software
 * distributed under the License is distributed on an "AS IS" BASIS,
 * WITHOUT WARRANTIES OR CONDITIONS OF ANY KIND, either express or implied.
 * See the License for the specific language governing permissions and
 * limitations under the License.
 */class ql{constructor(e){this.eventTarget=e,this.handlersMap={},this.boundEventHandler=this.handleEvent.bind(this)}static _getInstance(e){const n=this.receivers.find(i=>i.isListeningto(e));if(n)return n;const r=new ql(e);return this.receivers.push(r),r}isListeningto(e){return this.eventTarget===e}async handleEvent(e){const n=e,{eventId:r,eventType:i,data:s}=n.data,o=this.handlersMap[i];if(!(o!=null&&o.size))return;n.ports[0].postMessage({status:"ack",eventId:r,eventType:i});const l=Array.from(o).map(async h=>h(n.origin,s)),u=await ik(l);n.ports[0].postMessage({status:"done",eventId:r,eventType:i,response:u})}_subscribe(e,n){Object.keys(this.handlersMap).length===0&&this.eventTarget.addEventListener("message",this.boundEventHandler),this.handlersMap[e]||(this.handlersMap[e]=new Set),this.handlersMap[e].add(n)}_unsubscribe(e,n){this.handlersMap[e]&&n&&this.handlersMap[e].delete(n),(!n||this.handlersMap[e].size===0)&&delete this.handlersMap[e],Object.keys(this.handlersMap).length===0&&this.eventTarget.removeEventListener("message",this.boundEventHandler)}}ql.receivers=[];/**
 * @license
 * Copyright 2020 Google LLC
 *
 * Licensed under the Apache License, Version 2.0 (the "License");
 * you may not use this file except in compliance with the License.
 * You may obtain a copy of the License at
 *
 *   http://www.apache.org/licenses/LICENSE-2.0
 *
 * Unless required by applicable law or agreed to in writing, software
 * distributed under the License is distributed on an "AS IS" BASIS,
 * WITHOUT WARRANTIES OR CONDITIONS OF ANY KIND, either express or implied.
 * See the License for the specific language governing permissions and
 * limitations under the License.
 */function Bd(t="",e=10){let n="";for(let r=0;r<e;r++)n+=Math.floor(Math.random()*10);return t+n}/**
 * @license
 * Copyright 2019 Google LLC
 *
 * Licensed under the Apache License, Version 2.0 (the "License");
 * you may not use this file except in compliance with the License.
 * You may obtain a copy of the License at
 *
 *   http://www.apache.org/licenses/LICENSE-2.0
 *
 * Unless required by applicable law or agreed to in writing, software
 * distributed under the License is distributed on an "AS IS" BASIS,
 * WITHOUT WARRANTIES OR CONDITIONS OF ANY KIND, either express or implied.
 * See the License for the specific language governing permissions and
 * limitations under the License.
 */class sk{constructor(e){this.target=e,this.handlers=new Set}removeMessageHandler(e){e.messageChannel&&(e.messageChannel.port1.removeEventListener("message",e.onMessage),e.messageChannel.port1.close()),this.handlers.delete(e)}async _send(e,n,r=50){const i=typeof MessageChannel<"u"?new MessageChannel:null;if(!i)throw new Error("connection_unavailable");let s,o;return new Promise((l,u)=>{const h=Bd("",20);i.port1.start();const f=setTimeout(()=>{u(new Error("unsupported_event"))},r);o={messageChannel:i,onMessage(g){const v=g;if(v.data.eventId===h)switch(v.data.status){case"ack":clearTimeout(f),s=setTimeout(()=>{u(new Error("timeout"))},3e3);break;case"done":clearTimeout(s),l(v.data.response);break;default:clearTimeout(f),clearTimeout(s),u(new Error("invalid_response"));break}}},this.handlers.add(o),i.port1.addEventListener("message",o.onMessage),this.target.postMessage({eventType:e,eventId:h,data:n},[i.port2])}).finally(()=>{o&&this.removeMessageHandler(o)})}}/**
 * @license
 * Copyright 2020 Google LLC
 *
 * Licensed under the Apache License, Version 2.0 (the "License");
 * you may not use this file except in compliance with the License.
 * You may obtain a copy of the License at
 *
 *   http://www.apache.org/licenses/LICENSE-2.0
 *
 * Unless required by applicable law or agreed to in writing, software
 * distributed under the License is distributed on an "AS IS" BASIS,
 * WITHOUT WARRANTIES OR CONDITIONS OF ANY KIND, either express or implied.
 * See the License for the specific language governing permissions and
 * limitations under the License.
 */function nn(){return window}function ok(t){nn().location.href=t}/**
 * @license
 * Copyright 2020 Google LLC.
 *
 * Licensed under the Apache License, Version 2.0 (the "License");
 * you may not use this file except in compliance with the License.
 * You may obtain a copy of the License at
 *
 *   http://www.apache.org/licenses/LICENSE-2.0
 *
 * Unless required by applicable law or agreed to in writing, software
 * distributed under the License is distributed on an "AS IS" BASIS,
 * WITHOUT WARRANTIES OR CONDITIONS OF ANY KIND, either express or implied.
 * See the License for the specific language governing permissions and
 * limitations under the License.
 */function U_(){return typeof nn().WorkerGlobalScope<"u"&&typeof nn().importScripts=="function"}async function ak(){if(!(navigator!=null&&navigator.serviceWorker))return null;try{return(await navigator.serviceWorker.ready).active}catch{return null}}function lk(){var t;return((t=navigator==null?void 0:navigator.serviceWorker)===null||t===void 0?void 0:t.controller)||null}function uk(){return U_()?self:null}/**
 * @license
 * Copyright 2019 Google LLC
 *
 * Licensed under the Apache License, Version 2.0 (the "License");
 * you may not use this file except in compliance with the License.
 * You may obtain a copy of the License at
 *
 *   http://www.apache.org/licenses/LICENSE-2.0
 *
 * Unless required by applicable law or agreed to in writing, software
 * distributed under the License is distributed on an "AS IS" BASIS,
 * WITHOUT WARRANTIES OR CONDITIONS OF ANY KIND, either express or implied.
 * See the License for the specific language governing permissions and
 * limitations under the License.
 */const B_="firebaseLocalStorageDb",ck=1,_l="firebaseLocalStorage",z_="fbase_key";class Co{constructor(e){this.request=e}toPromise(){return new Promise((e,n)=>{this.request.addEventListener("success",()=>{e(this.request.result)}),this.request.addEventListener("error",()=>{n(this.request.error)})})}}function Kl(t,e){return t.transaction([_l],e?"readwrite":"readonly").objectStore(_l)}function hk(){const t=indexedDB.deleteDatabase(B_);return new Co(t).toPromise()}function vh(){const t=indexedDB.open(B_,ck);return new Promise((e,n)=>{t.addEventListener("error",()=>{n(t.error)}),t.addEventListener("upgradeneeded",()=>{const r=t.result;try{r.createObjectStore(_l,{keyPath:z_})}catch(i){n(i)}}),t.addEventListener("success",async()=>{const r=t.result;r.objectStoreNames.contains(_l)?e(r):(r.close(),await hk(),e(await vh()))})})}async function Hm(t,e,n){const r=Kl(t,!0).put({[z_]:e,value:n});return new Co(r).toPromise()}async function dk(t,e){const n=Kl(t,!1).get(e),r=await new Co(n).toPromise();return r===void 0?null:r.value}function qm(t,e){const n=Kl(t,!0).delete(e);return new Co(n).toPromise()}const fk=800,pk=3;class $_{constructor(){this.type="LOCAL",this._shouldAllowMigration=!0,this.listeners={},this.localCache={},this.pollTimer=null,this.pendingWrites=0,this.receiver=null,this.sender=null,this.serviceWorkerReceiverAvailable=!1,this.activeServiceWorker=null,this._workerInitializationPromise=this.initializeServiceWorkerMessaging().then(()=>{},()=>{})}async _openDb(){return this.db?this.db:(this.db=await vh(),this.db)}async _withRetries(e){let n=0;for(;;)try{const r=await this._openDb();return await e(r)}catch(r){if(n++>pk)throw r;this.db&&(this.db.close(),this.db=void 0)}}async initializeServiceWorkerMessaging(){return U_()?this.initializeReceiver():this.initializeSender()}async initializeReceiver(){this.receiver=ql._getInstance(uk()),this.receiver._subscribe("keyChanged",async(e,n)=>({keyProcessed:(await this._poll()).includes(n.key)})),this.receiver._subscribe("ping",async(e,n)=>["keyChanged"])}async initializeSender(){var e,n;if(this.activeServiceWorker=await ak(),!this.activeServiceWorker)return;this.sender=new sk(this.activeServiceWorker);const r=await this.sender._send("ping",{},800);r&&!((e=r[0])===null||e===void 0)&&e.fulfilled&&!((n=r[0])===null||n===void 0)&&n.value.includes("keyChanged")&&(this.serviceWorkerReceiverAvailable=!0)}async notifyServiceWorker(e){if(!(!this.sender||!this.activeServiceWorker||lk()!==this.activeServiceWorker))try{await this.sender._send("keyChanged",{key:e},this.serviceWorkerReceiverAvailable?800:50)}catch{}}async _isAvailable(){try{if(!indexedDB)return!1;const e=await vh();return await Hm(e,vl,"1"),await qm(e,vl),!0}catch{}return!1}async _withPendingWrite(e){this.pendingWrites++;try{await e()}finally{this.pendingWrites--}}async _set(e,n){return this._withPendingWrite(async()=>(await this._withRetries(r=>Hm(r,e,n)),this.localCache[e]=n,this.notifyServiceWorker(e)))}async _get(e){const n=await this._withRetries(r=>dk(r,e));return this.localCache[e]=n,n}async _remove(e){return this._withPendingWrite(async()=>(await this._withRetries(n=>qm(n,e)),delete this.localCache[e],this.notifyServiceWorker(e)))}async _poll(){const e=await this._withRetries(i=>{const s=Kl(i,!1).getAll();return new Co(s).toPromise()});if(!e)return[];if(this.pendingWrites!==0)return[];const n=[],r=new Set;if(e.length!==0)for(const{fbase_key:i,value:s}of e)r.add(i),JSON.stringify(this.localCache[i])!==JSON.stringify(s)&&(this.notifyListeners(i,s),n.push(i));for(const i of Object.keys(this.localCache))this.localCache[i]&&!r.has(i)&&(this.notifyListeners(i,null),n.push(i));return n}notifyListeners(e,n){this.localCache[e]=n;const r=this.listeners[e];if(r)for(const i of Array.from(r))i(n)}startPolling(){this.stopPolling(),this.pollTimer=setInterval(async()=>this._poll(),fk)}stopPolling(){this.pollTimer&&(clearInterval(this.pollTimer),this.pollTimer=null)}_addListener(e,n){Object.keys(this.listeners).length===0&&this.startPolling(),this.listeners[e]||(this.listeners[e]=new Set,this._get(e)),this.listeners[e].add(n)}_removeListener(e,n){this.listeners[e]&&(this.listeners[e].delete(n),this.listeners[e].size===0&&delete this.listeners[e]),Object.keys(this.listeners).length===0&&this.stopPolling()}}$_.type="LOCAL";const mk=$_;new Io(3e4,6e4);/**
 * @license
 * Copyright 2021 Google LLC
 *
 * Licensed under the Apache License, Version 2.0 (the "License");
 * you may not use this file except in compliance with the License.
 * You may obtain a copy of the License at
 *
 *   http://www.apache.org/licenses/LICENSE-2.0
 *
 * Unless required by applicable law or agreed to in writing, software
 * distributed under the License is distributed on an "AS IS" BASIS,
 * WITHOUT WARRANTIES OR CONDITIONS OF ANY KIND, either express or implied.
 * See the License for the specific language governing permissions and
 * limitations under the License.
 */function gk(t,e){return e?vn(e):(X(t._popupRedirectResolver,t,"argument-error"),t._popupRedirectResolver)}/**
 * @license
 * Copyright 2019 Google LLC
 *
 * Licensed under the Apache License, Version 2.0 (the "License");
 * you may not use this file except in compliance with the License.
 * You may obtain a copy of the License at
 *
 *   http://www.apache.org/licenses/LICENSE-2.0
 *
 * Unless required by applicable law or agreed to in writing, software
 * distributed under the License is distributed on an "AS IS" BASIS,
 * WITHOUT WARRANTIES OR CONDITIONS OF ANY KIND, either express or implied.
 * See the License for the specific language governing permissions and
 * limitations under the License.
 */class zd extends V_{constructor(e){super("custom","custom"),this.params=e}_getIdTokenResponse(e){return Ii(e,this._buildIdpRequest())}_linkToIdToken(e,n){return Ii(e,this._buildIdpRequest(n))}_getReauthenticationResolver(e){return Ii(e,this._buildIdpRequest())}_buildIdpRequest(e){const n={requestUri:this.params.requestUri,sessionId:this.params.sessionId,postBody:this.params.postBody,tenantId:this.params.tenantId,pendingToken:this.params.pendingToken,returnSecureToken:!0,returnIdpCredential:!0};return e&&(n.idToken=e),n}}function yk(t){return QS(t.auth,new zd(t),t.bypassAuthState)}function vk(t){const{auth:e,user:n}=t;return X(n,e,"internal-error"),GS(n,new zd(t),t.bypassAuthState)}async function _k(t){const{auth:e,user:n}=t;return X(n,e,"internal-error"),KS(n,new zd(t),t.bypassAuthState)}/**
 * @license
 * Copyright 2020 Google LLC
 *
 * Licensed under the Apache License, Version 2.0 (the "License");
 * you may not use this file except in compliance with the License.
 * You may obtain a copy of the License at
 *
 *   http://www.apache.org/licenses/LICENSE-2.0
 *
 * Unless required by applicable law or agreed to in writing, software
 * distributed under the License is distributed on an "AS IS" BASIS,
 * WITHOUT WARRANTIES OR CONDITIONS OF ANY KIND, either express or implied.
 * See the License for the specific language governing permissions and
 * limitations under the License.
 */class W_{constructor(e,n,r,i,s=!1){this.auth=e,this.resolver=r,this.user=i,this.bypassAuthState=s,this.pendingPromise=null,this.eventManager=null,this.filter=Array.isArray(n)?n:[n]}execute(){return new Promise(async(e,n)=>{this.pendingPromise={resolve:e,reject:n};try{this.eventManager=await this.resolver._initialize(this.auth),await this.onExecution(),this.eventManager.registerConsumer(this)}catch(r){this.reject(r)}})}async onAuthEvent(e){const{urlResponse:n,sessionId:r,postBody:i,tenantId:s,error:o,type:l}=e;if(o){this.reject(o);return}const u={auth:this.auth,requestUri:n,sessionId:r,tenantId:s||void 0,postBody:i||void 0,user:this.user,bypassAuthState:this.bypassAuthState};try{this.resolve(await this.getIdpTask(l)(u))}catch(h){this.reject(h)}}onError(e){this.reject(e)}getIdpTask(e){switch(e){case"signInViaPopup":case"signInViaRedirect":return yk;case"linkViaPopup":case"linkViaRedirect":return _k;case"reauthViaPopup":case"reauthViaRedirect":return vk;default:An(this.auth,"internal-error")}}resolve(e){Cn(this.pendingPromise,"Pending promise was never set"),this.pendingPromise.resolve(e),this.unregisterAndCleanUp()}reject(e){Cn(this.pendingPromise,"Pending promise was never set"),this.pendingPromise.reject(e),this.unregisterAndCleanUp()}unregisterAndCleanUp(){this.eventManager&&this.eventManager.unregisterConsumer(this),this.pendingPromise=null,this.cleanUp()}}/**
 * @license
 * Copyright 2020 Google LLC
 *
 * Licensed under the Apache License, Version 2.0 (the "License");
 * you may not use this file except in compliance with the License.
 * You may obtain a copy of the License at
 *
 *   http://www.apache.org/licenses/LICENSE-2.0
 *
 * Unless required by applicable law or agreed to in writing, software
 * distributed under the License is distributed on an "AS IS" BASIS,
 * WITHOUT WARRANTIES OR CONDITIONS OF ANY KIND, either express or implied.
 * See the License for the specific language governing permissions and
 * limitations under the License.
 */const wk=new Io(2e3,1e4);class pi extends W_{constructor(e,n,r,i,s){super(e,n,i,s),this.provider=r,this.authWindow=null,this.pollId=null,pi.currentPopupAction&&pi.currentPopupAction.cancel(),pi.currentPopupAction=this}async executeNotNull(){const e=await this.execute();return X(e,this.auth,"internal-error"),e}async onExecution(){Cn(this.filter.length===1,"Popup operations only handle one event");const e=Bd();this.authWindow=await this.resolver._openPopup(this.auth,this.provider,this.filter[0],e),this.authWindow.associatedEvent=e,this.resolver._originValidation(this.auth).catch(n=>{this.reject(n)}),this.resolver._isIframeWebStorageSupported(this.auth,n=>{n||this.reject(tn(this.auth,"web-storage-unsupported"))}),this.pollUserCancellation()}get eventId(){var e;return((e=this.authWindow)===null||e===void 0?void 0:e.associatedEvent)||null}cancel(){this.reject(tn(this.auth,"cancelled-popup-request"))}cleanUp(){this.authWindow&&this.authWindow.close(),this.pollId&&window.clearTimeout(this.pollId),this.authWindow=null,this.pollId=null,pi.currentPopupAction=null}pollUserCancellation(){const e=()=>{var n,r;if(!((r=(n=this.authWindow)===null||n===void 0?void 0:n.window)===null||r===void 0)&&r.closed){this.pollId=window.setTimeout(()=>{this.pollId=null,this.reject(tn(this.auth,"popup-closed-by-user"))},8e3);return}this.pollId=window.setTimeout(e,wk.get())};e()}}pi.currentPopupAction=null;/**
 * @license
 * Copyright 2020 Google LLC
 *
 * Licensed under the Apache License, Version 2.0 (the "License");
 * you may not use this file except in compliance with the License.
 * You may obtain a copy of the License at
 *
 *   http://www.apache.org/licenses/LICENSE-2.0
 *
 * Unless required by applicable law or agreed to in writing, software
 * distributed under the License is distributed on an "AS IS" BASIS,
 * WITHOUT WARRANTIES OR CONDITIONS OF ANY KIND, either express or implied.
 * See the License for the specific language governing permissions and
 * limitations under the License.
 */const Ek="pendingRedirect",ba=new Map;class Tk extends W_{constructor(e,n,r=!1){super(e,["signInViaRedirect","linkViaRedirect","reauthViaRedirect","unknown"],n,void 0,r),this.eventId=null}async execute(){let e=ba.get(this.auth._key());if(!e){try{const r=await Ik(this.resolver,this.auth)?await super.execute():null;e=()=>Promise.resolve(r)}catch(n){e=()=>Promise.reject(n)}ba.set(this.auth._key(),e)}return this.bypassAuthState||ba.set(this.auth._key(),()=>Promise.resolve(null)),e()}async onAuthEvent(e){if(e.type==="signInViaRedirect")return super.onAuthEvent(e);if(e.type==="unknown"){this.resolve(null);return}if(e.eventId){const n=await this.auth._redirectUserForId(e.eventId);if(n)return this.user=n,super.onAuthEvent(e);this.resolve(null)}}async onExecution(){}cleanUp(){}}async function Ik(t,e){const n=Ak(e),r=kk(t);if(!await r._isAvailable())return!1;const i=await r._get(n)==="true";return await r._remove(n),i}function Sk(t,e){ba.set(t._key(),e)}function kk(t){return vn(t._redirectPersistence)}function Ak(t){return Va(Ek,t.config.apiKey,t.name)}async function Ck(t,e,n=!1){if(Jt(t.app))return Promise.reject(wn(t));const r=ko(t),i=gk(r,e),o=await new Tk(r,i,n).execute();return o&&!n&&(delete o.user._redirectEventId,await r._persistUserIfCurrent(o.user),await r._setRedirectUser(null,e)),o}/**
 * @license
 * Copyright 2020 Google LLC
 *
 * Licensed under the Apache License, Version 2.0 (the "License");
 * you may not use this file except in compliance with the License.
 * You may obtain a copy of the License at
 *
 *   http://www.apache.org/licenses/LICENSE-2.0
 *
 * Unless required by applicable law or agreed to in writing, software
 * distributed under the License is distributed on an "AS IS" BASIS,
 * WITHOUT WARRANTIES OR CONDITIONS OF ANY KIND, either express or implied.
 * See the License for the specific language governing permissions and
 * limitations under the License.
 */const Rk=10*60*1e3;class Pk{constructor(e){this.auth=e,this.cachedEventUids=new Set,this.consumers=new Set,this.queuedRedirectEvent=null,this.hasHandledPotentialRedirect=!1,this.lastProcessedEventTime=Date.now()}registerConsumer(e){this.consumers.add(e),this.queuedRedirectEvent&&this.isEventForConsumer(this.queuedRedirectEvent,e)&&(this.sendToConsumer(this.queuedRedirectEvent,e),this.saveEventToCache(this.queuedRedirectEvent),this.queuedRedirectEvent=null)}unregisterConsumer(e){this.consumers.delete(e)}onEvent(e){if(this.hasEventBeenHandled(e))return!1;let n=!1;return this.consumers.forEach(r=>{this.isEventForConsumer(e,r)&&(n=!0,this.sendToConsumer(e,r),this.saveEventToCache(e))}),this.hasHandledPotentialRedirect||!xk(e)||(this.hasHandledPotentialRedirect=!0,n||(this.queuedRedirectEvent=e,n=!0)),n}sendToConsumer(e,n){var r;if(e.error&&!H_(e)){const i=((r=e.error.code)===null||r===void 0?void 0:r.split("auth/")[1])||"internal-error";n.onError(tn(this.auth,i))}else n.onAuthEvent(e)}isEventForConsumer(e,n){const r=n.eventId===null||!!e.eventId&&e.eventId===n.eventId;return n.filter.includes(e.type)&&r}hasEventBeenHandled(e){return Date.now()-this.lastProcessedEventTime>=Rk&&this.cachedEventUids.clear(),this.cachedEventUids.has(Km(e))}saveEventToCache(e){this.cachedEventUids.add(Km(e)),this.lastProcessedEventTime=Date.now()}}function Km(t){return[t.type,t.eventId,t.sessionId,t.tenantId].filter(e=>e).join("-")}function H_({type:t,error:e}){return t==="unknown"&&(e==null?void 0:e.code)==="auth/no-auth-event"}function xk(t){switch(t.type){case"signInViaRedirect":case"linkViaRedirect":case"reauthViaRedirect":return!0;case"unknown":return H_(t);default:return!1}}/**
 * @license
 * Copyright 2020 Google LLC
 *
 * Licensed under the Apache License, Version 2.0 (the "License");
 * you may not use this file except in compliance with the License.
 * You may obtain a copy of the License at
 *
 *   http://www.apache.org/licenses/LICENSE-2.0
 *
 * Unless required by applicable law or agreed to in writing, software
 * distributed under the License is distributed on an "AS IS" BASIS,
 * WITHOUT WARRANTIES OR CONDITIONS OF ANY KIND, either express or implied.
 * See the License for the specific language governing permissions and
 * limitations under the License.
 */async function Nk(t,e={}){return Hi(t,"GET","/v1/projects",e)}/**
 * @license
 * Copyright 2020 Google LLC
 *
 * Licensed under the Apache License, Version 2.0 (the "License");
 * you may not use this file except in compliance with the License.
 * You may obtain a copy of the License at
 *
 *   http://www.apache.org/licenses/LICENSE-2.0
 *
 * Unless required by applicable law or agreed to in writing, software
 * distributed under the License is distributed on an "AS IS" BASIS,
 * WITHOUT WARRANTIES OR CONDITIONS OF ANY KIND, either express or implied.
 * See the License for the specific language governing permissions and
 * limitations under the License.
 */const Dk=/^\d{1,3}\.\d{1,3}\.\d{1,3}\.\d{1,3}$/,Vk=/^https?/;async function bk(t){if(t.config.emulator)return;const{authorizedDomains:e}=await Nk(t);for(const n of e)try{if(Ok(n))return}catch{}An(t,"unauthorized-domain")}function Ok(t){const e=gh(),{protocol:n,hostname:r}=new URL(e);if(t.startsWith("chrome-extension://")){const o=new URL(t);return o.hostname===""&&r===""?n==="chrome-extension:"&&t.replace("chrome-extension://","")===e.replace("chrome-extension://",""):n==="chrome-extension:"&&o.hostname===r}if(!Vk.test(n))return!1;if(Dk.test(t))return r===t;const i=t.replace(/\./g,"\\.");return new RegExp("^(.+\\."+i+"|"+i+")$","i").test(r)}/**
 * @license
 * Copyright 2020 Google LLC.
 *
 * Licensed under the Apache License, Version 2.0 (the "License");
 * you may not use this file except in compliance with the License.
 * You may obtain a copy of the License at
 *
 *   http://www.apache.org/licenses/LICENSE-2.0
 *
 * Unless required by applicable law or agreed to in writing, software
 * distributed under the License is distributed on an "AS IS" BASIS,
 * WITHOUT WARRANTIES OR CONDITIONS OF ANY KIND, either express or implied.
 * See the License for the specific language governing permissions and
 * limitations under the License.
 */const Lk=new Io(3e4,6e4);function Gm(){const t=nn().___jsl;if(t!=null&&t.H){for(const e of Object.keys(t.H))if(t.H[e].r=t.H[e].r||[],t.H[e].L=t.H[e].L||[],t.H[e].r=[...t.H[e].L],t.CP)for(let n=0;n<t.CP.length;n++)t.CP[n]=null}}function Mk(t){return new Promise((e,n)=>{var r,i,s;function o(){Gm(),gapi.load("gapi.iframes",{callback:()=>{e(gapi.iframes.getContext())},ontimeout:()=>{Gm(),n(tn(t,"network-request-failed"))},timeout:Lk.get()})}if(!((i=(r=nn().gapi)===null||r===void 0?void 0:r.iframes)===null||i===void 0)&&i.Iframe)e(gapi.iframes.getContext());else if(!((s=nn().gapi)===null||s===void 0)&&s.load)o();else{const l=FS("iframefcb");return nn()[l]=()=>{gapi.load?o():n(tn(t,"network-request-failed"))},LS(`${MS()}?onload=${l}`).catch(u=>n(u))}}).catch(e=>{throw Oa=null,e})}let Oa=null;function Fk(t){return Oa=Oa||Mk(t),Oa}/**
 * @license
 * Copyright 2020 Google LLC.
 *
 * Licensed under the Apache License, Version 2.0 (the "License");
 * you may not use this file except in compliance with the License.
 * You may obtain a copy of the License at
 *
 *   http://www.apache.org/licenses/LICENSE-2.0
 *
 * Unless required by applicable law or agreed to in writing, software
 * distributed under the License is distributed on an "AS IS" BASIS,
 * WITHOUT WARRANTIES OR CONDITIONS OF ANY KIND, either express or implied.
 * See the License for the specific language governing permissions and
 * limitations under the License.
 */const jk=new Io(5e3,15e3),Uk="__/auth/iframe",Bk="emulator/auth/iframe",zk={style:{position:"absolute",top:"-100px",width:"1px",height:"1px"},"aria-hidden":"true",tabindex:"-1"},$k=new Map([["identitytoolkit.googleapis.com","p"],["staging-identitytoolkit.sandbox.googleapis.com","s"],["test-identitytoolkit.sandbox.googleapis.com","t"]]);function Wk(t){const e=t.config;X(e.authDomain,t,"auth-domain-config-required");const n=e.emulator?Ld(e,Bk):`https://${t.config.authDomain}/${Uk}`,r={apiKey:e.apiKey,appName:t.name,v:Wi},i=$k.get(t.config.apiHost);i&&(r.eid=i);const s=t._getFrameworks();return s.length&&(r.fw=s.join(",")),`${n}?${To(r).slice(1)}`}async function Hk(t){const e=await Fk(t),n=nn().gapi;return X(n,t,"internal-error"),e.open({where:document.body,url:Wk(t),messageHandlersFilter:n.iframes.CROSS_ORIGIN_IFRAMES_FILTER,attributes:zk,dontclear:!0},r=>new Promise(async(i,s)=>{await r.restyle({setHideOnLeave:!1});const o=tn(t,"network-request-failed"),l=nn().setTimeout(()=>{s(o)},jk.get());function u(){nn().clearTimeout(l),i(r)}r.ping(u).then(u,()=>{s(o)})}))}/**
 * @license
 * Copyright 2020 Google LLC.
 *
 * Licensed under the Apache License, Version 2.0 (the "License");
 * you may not use this file except in compliance with the License.
 * You may obtain a copy of the License at
 *
 *   http://www.apache.org/licenses/LICENSE-2.0
 *
 * Unless required by applicable law or agreed to in writing, software
 * distributed under the License is distributed on an "AS IS" BASIS,
 * WITHOUT WARRANTIES OR CONDITIONS OF ANY KIND, either express or implied.
 * See the License for the specific language governing permissions and
 * limitations under the License.
 */const qk={location:"yes",resizable:"yes",statusbar:"yes",toolbar:"no"},Kk=500,Gk=600,Qk="_blank",Yk="http://localhost";class Qm{constructor(e){this.window=e,this.associatedEvent=null}close(){if(this.window)try{this.window.close()}catch{}}}function Xk(t,e,n,r=Kk,i=Gk){const s=Math.max((window.screen.availHeight-i)/2,0).toString(),o=Math.max((window.screen.availWidth-r)/2,0).toString();let l="";const u=Object.assign(Object.assign({},qk),{width:r.toString(),height:i.toString(),top:s,left:o}),h=at().toLowerCase();n&&(l=k_(h)?Qk:n),I_(h)&&(e=e||Yk,u.scrollbars="yes");const f=Object.entries(u).reduce((v,[R,N])=>`${v}${R}=${N},`,"");if(RS(h)&&l!=="_self")return Jk(e||"",l),new Qm(null);const g=window.open(e||"",l,f);X(g,t,"popup-blocked");try{g.focus()}catch{}return new Qm(g)}function Jk(t,e){const n=document.createElement("a");n.href=t,n.target=e;const r=document.createEvent("MouseEvent");r.initMouseEvent("click",!0,!0,window,1,0,0,0,0,!1,!1,!1,!1,1,null),n.dispatchEvent(r)}/**
 * @license
 * Copyright 2021 Google LLC
 *
 * Licensed under the Apache License, Version 2.0 (the "License");
 * you may not use this file except in compliance with the License.
 * You may obtain a copy of the License at
 *
 *   http://www.apache.org/licenses/LICENSE-2.0
 *
 * Unless required by applicable law or agreed to in writing, software
 * distributed under the License is distributed on an "AS IS" BASIS,
 * WITHOUT WARRANTIES OR CONDITIONS OF ANY KIND, either express or implied.
 * See the License for the specific language governing permissions and
 * limitations under the License.
 */const Zk="__/auth/handler",eA="emulator/auth/handler",tA=encodeURIComponent("fac");async function Ym(t,e,n,r,i,s){X(t.config.authDomain,t,"auth-domain-config-required"),X(t.config.apiKey,t,"invalid-api-key");const o={apiKey:t.config.apiKey,appName:t.name,authType:n,redirectUrl:r,v:Wi,eventId:i};if(e instanceof b_){e.setDefaultLanguage(t.languageCode),o.providerId=e.providerId||"",Z1(e.getCustomParameters())||(o.customParameters=JSON.stringify(e.getCustomParameters()));for(const[f,g]of Object.entries({}))o[f]=g}if(e instanceof Ao){const f=e.getScopes().filter(g=>g!=="");f.length>0&&(o.scopes=f.join(","))}t.tenantId&&(o.tid=t.tenantId);const l=o;for(const f of Object.keys(l))l[f]===void 0&&delete l[f];const u=await t._getAppCheckToken(),h=u?`#${tA}=${encodeURIComponent(u)}`:"";return`${nA(t)}?${To(l).slice(1)}${h}`}function nA({config:t}){return t.emulator?Ld(t,eA):`https://${t.authDomain}/${Zk}`}/**
 * @license
 * Copyright 2020 Google LLC
 *
 * Licensed under the Apache License, Version 2.0 (the "License");
 * you may not use this file except in compliance with the License.
 * You may obtain a copy of the License at
 *
 *   http://www.apache.org/licenses/LICENSE-2.0
 *
 * Unless required by applicable law or agreed to in writing, software
 * distributed under the License is distributed on an "AS IS" BASIS,
 * WITHOUT WARRANTIES OR CONDITIONS OF ANY KIND, either express or implied.
 * See the License for the specific language governing permissions and
 * limitations under the License.
 */const lc="webStorageSupport";class rA{constructor(){this.eventManagers={},this.iframes={},this.originValidationPromises={},this._redirectPersistence=j_,this._completeRedirectFn=Ck,this._overrideRedirectResult=Sk}async _openPopup(e,n,r,i){var s;Cn((s=this.eventManagers[e._key()])===null||s===void 0?void 0:s.manager,"_initialize() not called before _openPopup()");const o=await Ym(e,n,r,gh(),i);return Xk(e,o,Bd())}async _openRedirect(e,n,r,i){await this._originValidation(e);const s=await Ym(e,n,r,gh(),i);return ok(s),new Promise(()=>{})}_initialize(e){const n=e._key();if(this.eventManagers[n]){const{manager:i,promise:s}=this.eventManagers[n];return i?Promise.resolve(i):(Cn(s,"If manager is not set, promise should be"),s)}const r=this.initAndGetManager(e);return this.eventManagers[n]={promise:r},r.catch(()=>{delete this.eventManagers[n]}),r}async initAndGetManager(e){const n=await Hk(e),r=new Pk(e);return n.register("authEvent",i=>(X(i==null?void 0:i.authEvent,e,"invalid-auth-event"),{status:r.onEvent(i.authEvent)?"ACK":"ERROR"}),gapi.iframes.CROSS_ORIGIN_IFRAMES_FILTER),this.eventManagers[e._key()]={manager:r},this.iframes[e._key()]=n,r}_isIframeWebStorageSupported(e,n){this.iframes[e._key()].send(lc,{type:lc},i=>{var s;const o=(s=i==null?void 0:i[0])===null||s===void 0?void 0:s[lc];o!==void 0&&n(!!o),An(e,"internal-error")},gapi.iframes.CROSS_ORIGIN_IFRAMES_FILTER)}_originValidation(e){const n=e._key();return this.originValidationPromises[n]||(this.originValidationPromises[n]=bk(e)),this.originValidationPromises[n]}get _shouldInitProactively(){return x_()||S_()||jd()}}const iA=rA;var Xm="@firebase/auth",Jm="1.7.9";/**
 * @license
 * Copyright 2020 Google LLC
 *
 * Licensed under the Apache License, Version 2.0 (the "License");
 * you may not use this file except in compliance with the License.
 * You may obtain a copy of the License at
 *
 *   http://www.apache.org/licenses/LICENSE-2.0
 *
 * Unless required by applicable law or agreed to in writing, software
 * distributed under the License is distributed on an "AS IS" BASIS,
 * WITHOUT WARRANTIES OR CONDITIONS OF ANY KIND, either express or implied.
 * See the License for the specific language governing permissions and
 * limitations under the License.
 */class sA{constructor(e){this.auth=e,this.internalListeners=new Map}getUid(){var e;return this.assertAuthConfigured(),((e=this.auth.currentUser)===null||e===void 0?void 0:e.uid)||null}async getToken(e){return this.assertAuthConfigured(),await this.auth._initializationPromise,this.auth.currentUser?{accessToken:await this.auth.currentUser.getIdToken(e)}:null}addAuthTokenListener(e){if(this.assertAuthConfigured(),this.internalListeners.has(e))return;const n=this.auth.onIdTokenChanged(r=>{e((r==null?void 0:r.stsTokenManager.accessToken)||null)});this.internalListeners.set(e,n),this.updateProactiveRefresh()}removeAuthTokenListener(e){this.assertAuthConfigured();const n=this.internalListeners.get(e);n&&(this.internalListeners.delete(e),n(),this.updateProactiveRefresh())}assertAuthConfigured(){X(this.auth._initializationPromise,"dependent-sdk-initialized-before-auth")}updateProactiveRefresh(){this.internalListeners.size>0?this.auth._startProactiveRefresh():this.auth._stopProactiveRefresh()}}/**
 * @license
 * Copyright 2020 Google LLC
 *
 * Licensed under the Apache License, Version 2.0 (the "License");
 * you may not use this file except in compliance with the License.
 * You may obtain a copy of the License at
 *
 *   http://www.apache.org/licenses/LICENSE-2.0
 *
 * Unless required by applicable law or agreed to in writing, software
 * distributed under the License is distributed on an "AS IS" BASIS,
 * WITHOUT WARRANTIES OR CONDITIONS OF ANY KIND, either express or implied.
 * See the License for the specific language governing permissions and
 * limitations under the License.
 */function oA(t){switch(t){case"Node":return"node";case"ReactNative":return"rn";case"Worker":return"webworker";case"Cordova":return"cordova";case"WebExtension":return"web-extension";default:return}}function aA(t){Di(new jr("auth",(e,{options:n})=>{const r=e.getProvider("app").getImmediate(),i=e.getProvider("heartbeat"),s=e.getProvider("app-check-internal"),{apiKey:o,authDomain:l}=r.options;X(o&&!o.includes(":"),"invalid-api-key",{appName:r.name});const u={apiKey:o,authDomain:l,clientPlatform:t,apiHost:"identitytoolkit.googleapis.com",tokenApiHost:"securetoken.googleapis.com",apiScheme:"https",sdkClientVersion:N_(t)},h=new bS(r,i,s,u);return US(h,n),h},"PUBLIC").setInstantiationMode("EXPLICIT").setInstanceCreatedCallback((e,n,r)=>{e.getProvider("auth-internal").initialize()})),Di(new jr("auth-internal",e=>{const n=ko(e.getProvider("auth").getImmediate());return(r=>new sA(r))(n)},"PRIVATE").setInstantiationMode("EXPLICIT")),or(Xm,Jm,oA(t)),or(Xm,Jm,"esm2017")}/**
 * @license
 * Copyright 2021 Google LLC
 *
 * Licensed under the Apache License, Version 2.0 (the "License");
 * you may not use this file except in compliance with the License.
 * You may obtain a copy of the License at
 *
 *   http://www.apache.org/licenses/LICENSE-2.0
 *
 * Unless required by applicable law or agreed to in writing, software
 * distributed under the License is distributed on an "AS IS" BASIS,
 * WITHOUT WARRANTIES OR CONDITIONS OF ANY KIND, either express or implied.
 * See the License for the specific language governing permissions and
 * limitations under the License.
 */const lA=5*60,uA=a_("authIdTokenMaxAge")||lA;let Zm=null;const cA=t=>async e=>{const n=e&&await e.getIdTokenResult(),r=n&&(new Date().getTime()-Date.parse(n.issuedAtTime))/1e3;if(r&&r>uA)return;const i=n==null?void 0:n.token;Zm!==i&&(Zm=i,await fetch(t,{method:i?"POST":"DELETE",headers:i?{Authorization:`Bearer ${i}`}:{}}))};function hA(t=h_()){const e=Vd(t,"auth");if(e.isInitialized())return e.getImmediate();const n=jS(t,{popupRedirectResolver:iA,persistence:[mk,rk,j_]}),r=a_("authTokenSyncURL");if(r&&typeof isSecureContext=="boolean"&&isSecureContext){const s=new URL(r,location.origin);if(location.origin===s.origin){const o=cA(s.toString());ZS(n,o,()=>o(n.currentUser)),JS(n,l=>o(l))}}const i=s_("auth");return i&&BS(n,`http://${i}`),n}function dA(){var t,e;return(e=(t=document.getElementsByTagName("head"))===null||t===void 0?void 0:t[0])!==null&&e!==void 0?e:document}OS({loadJS(t){return new Promise((e,n)=>{const r=document.createElement("script");r.setAttribute("src",t),r.onload=e,r.onerror=i=>{const s=tn("internal-error");s.customData=i,n(s)},r.type="text/javascript",r.charset="UTF-8",dA().appendChild(r)})},gapiScript:"https://apis.google.com/js/api.js",recaptchaV2Script:"https://www.google.com/recaptcha/api.js",recaptchaEnterpriseScript:"https://www.google.com/recaptcha/enterprise.js?render="});aA("Browser");var eg=typeof globalThis<"u"?globalThis:typeof window<"u"?window:typeof global<"u"?global:typeof self<"u"?self:{};/** @license
Copyright The Closure Library Authors.
SPDX-License-Identifier: Apache-2.0
*/var xr,q_;(function(){var t;/** @license

 Copyright The Closure Library Authors.
 SPDX-License-Identifier: Apache-2.0
*/function e(E,y){function w(){}w.prototype=y.prototype,E.D=y.prototype,E.prototype=new w,E.prototype.constructor=E,E.C=function(I,A,P){for(var T=Array(arguments.length-2),pt=2;pt<arguments.length;pt++)T[pt-2]=arguments[pt];return y.prototype[A].apply(I,T)}}function n(){this.blockSize=-1}function r(){this.blockSize=-1,this.blockSize=64,this.g=Array(4),this.B=Array(this.blockSize),this.o=this.h=0,this.s()}e(r,n),r.prototype.s=function(){this.g[0]=1732584193,this.g[1]=4023233417,this.g[2]=2562383102,this.g[3]=271733878,this.o=this.h=0};function i(E,y,w){w||(w=0);var I=Array(16);if(typeof y=="string")for(var A=0;16>A;++A)I[A]=y.charCodeAt(w++)|y.charCodeAt(w++)<<8|y.charCodeAt(w++)<<16|y.charCodeAt(w++)<<24;else for(A=0;16>A;++A)I[A]=y[w++]|y[w++]<<8|y[w++]<<16|y[w++]<<24;y=E.g[0],w=E.g[1],A=E.g[2];var P=E.g[3],T=y+(P^w&(A^P))+I[0]+3614090360&4294967295;y=w+(T<<7&4294967295|T>>>25),T=P+(A^y&(w^A))+I[1]+3905402710&4294967295,P=y+(T<<12&4294967295|T>>>20),T=A+(w^P&(y^w))+I[2]+606105819&4294967295,A=P+(T<<17&4294967295|T>>>15),T=w+(y^A&(P^y))+I[3]+3250441966&4294967295,w=A+(T<<22&4294967295|T>>>10),T=y+(P^w&(A^P))+I[4]+4118548399&4294967295,y=w+(T<<7&4294967295|T>>>25),T=P+(A^y&(w^A))+I[5]+1200080426&4294967295,P=y+(T<<12&4294967295|T>>>20),T=A+(w^P&(y^w))+I[6]+2821735955&4294967295,A=P+(T<<17&4294967295|T>>>15),T=w+(y^A&(P^y))+I[7]+4249261313&4294967295,w=A+(T<<22&4294967295|T>>>10),T=y+(P^w&(A^P))+I[8]+1770035416&4294967295,y=w+(T<<7&4294967295|T>>>25),T=P+(A^y&(w^A))+I[9]+2336552879&4294967295,P=y+(T<<12&4294967295|T>>>20),T=A+(w^P&(y^w))+I[10]+4294925233&4294967295,A=P+(T<<17&4294967295|T>>>15),T=w+(y^A&(P^y))+I[11]+2304563134&4294967295,w=A+(T<<22&4294967295|T>>>10),T=y+(P^w&(A^P))+I[12]+1804603682&4294967295,y=w+(T<<7&4294967295|T>>>25),T=P+(A^y&(w^A))+I[13]+4254626195&4294967295,P=y+(T<<12&4294967295|T>>>20),T=A+(w^P&(y^w))+I[14]+2792965006&4294967295,A=P+(T<<17&4294967295|T>>>15),T=w+(y^A&(P^y))+I[15]+1236535329&4294967295,w=A+(T<<22&4294967295|T>>>10),T=y+(A^P&(w^A))+I[1]+4129170786&4294967295,y=w+(T<<5&4294967295|T>>>27),T=P+(w^A&(y^w))+I[6]+3225465664&4294967295,P=y+(T<<9&4294967295|T>>>23),T=A+(y^w&(P^y))+I[11]+643717713&4294967295,A=P+(T<<14&4294967295|T>>>18),T=w+(P^y&(A^P))+I[0]+3921069994&4294967295,w=A+(T<<20&4294967295|T>>>12),T=y+(A^P&(w^A))+I[5]+3593408605&4294967295,y=w+(T<<5&4294967295|T>>>27),T=P+(w^A&(y^w))+I[10]+38016083&4294967295,P=y+(T<<9&4294967295|T>>>23),T=A+(y^w&(P^y))+I[15]+3634488961&4294967295,A=P+(T<<14&4294967295|T>>>18),T=w+(P^y&(A^P))+I[4]+3889429448&4294967295,w=A+(T<<20&4294967295|T>>>12),T=y+(A^P&(w^A))+I[9]+568446438&4294967295,y=w+(T<<5&4294967295|T>>>27),T=P+(w^A&(y^w))+I[14]+3275163606&4294967295,P=y+(T<<9&4294967295|T>>>23),T=A+(y^w&(P^y))+I[3]+4107603335&4294967295,A=P+(T<<14&4294967295|T>>>18),T=w+(P^y&(A^P))+I[8]+1163531501&4294967295,w=A+(T<<20&4294967295|T>>>12),T=y+(A^P&(w^A))+I[13]+2850285829&4294967295,y=w+(T<<5&4294967295|T>>>27),T=P+(w^A&(y^w))+I[2]+4243563512&4294967295,P=y+(T<<9&4294967295|T>>>23),T=A+(y^w&(P^y))+I[7]+1735328473&4294967295,A=P+(T<<14&4294967295|T>>>18),T=w+(P^y&(A^P))+I[12]+2368359562&4294967295,w=A+(T<<20&4294967295|T>>>12),T=y+(w^A^P)+I[5]+4294588738&4294967295,y=w+(T<<4&4294967295|T>>>28),T=P+(y^w^A)+I[8]+2272392833&4294967295,P=y+(T<<11&4294967295|T>>>21),T=A+(P^y^w)+I[11]+1839030562&4294967295,A=P+(T<<16&4294967295|T>>>16),T=w+(A^P^y)+I[14]+4259657740&4294967295,w=A+(T<<23&4294967295|T>>>9),T=y+(w^A^P)+I[1]+2763975236&4294967295,y=w+(T<<4&4294967295|T>>>28),T=P+(y^w^A)+I[4]+1272893353&4294967295,P=y+(T<<11&4294967295|T>>>21),T=A+(P^y^w)+I[7]+4139469664&4294967295,A=P+(T<<16&4294967295|T>>>16),T=w+(A^P^y)+I[10]+3200236656&4294967295,w=A+(T<<23&4294967295|T>>>9),T=y+(w^A^P)+I[13]+681279174&4294967295,y=w+(T<<4&4294967295|T>>>28),T=P+(y^w^A)+I[0]+3936430074&4294967295,P=y+(T<<11&4294967295|T>>>21),T=A+(P^y^w)+I[3]+3572445317&4294967295,A=P+(T<<16&4294967295|T>>>16),T=w+(A^P^y)+I[6]+76029189&4294967295,w=A+(T<<23&4294967295|T>>>9),T=y+(w^A^P)+I[9]+3654602809&4294967295,y=w+(T<<4&4294967295|T>>>28),T=P+(y^w^A)+I[12]+3873151461&4294967295,P=y+(T<<11&4294967295|T>>>21),T=A+(P^y^w)+I[15]+530742520&4294967295,A=P+(T<<16&4294967295|T>>>16),T=w+(A^P^y)+I[2]+3299628645&4294967295,w=A+(T<<23&4294967295|T>>>9),T=y+(A^(w|~P))+I[0]+4096336452&4294967295,y=w+(T<<6&4294967295|T>>>26),T=P+(w^(y|~A))+I[7]+1126891415&4294967295,P=y+(T<<10&4294967295|T>>>22),T=A+(y^(P|~w))+I[14]+2878612391&4294967295,A=P+(T<<15&4294967295|T>>>17),T=w+(P^(A|~y))+I[5]+4237533241&4294967295,w=A+(T<<21&4294967295|T>>>11),T=y+(A^(w|~P))+I[12]+1700485571&4294967295,y=w+(T<<6&4294967295|T>>>26),T=P+(w^(y|~A))+I[3]+2399980690&4294967295,P=y+(T<<10&4294967295|T>>>22),T=A+(y^(P|~w))+I[10]+4293915773&4294967295,A=P+(T<<15&4294967295|T>>>17),T=w+(P^(A|~y))+I[1]+2240044497&4294967295,w=A+(T<<21&4294967295|T>>>11),T=y+(A^(w|~P))+I[8]+1873313359&4294967295,y=w+(T<<6&4294967295|T>>>26),T=P+(w^(y|~A))+I[15]+4264355552&4294967295,P=y+(T<<10&4294967295|T>>>22),T=A+(y^(P|~w))+I[6]+2734768916&4294967295,A=P+(T<<15&4294967295|T>>>17),T=w+(P^(A|~y))+I[13]+1309151649&4294967295,w=A+(T<<21&4294967295|T>>>11),T=y+(A^(w|~P))+I[4]+4149444226&4294967295,y=w+(T<<6&4294967295|T>>>26),T=P+(w^(y|~A))+I[11]+3174756917&4294967295,P=y+(T<<10&4294967295|T>>>22),T=A+(y^(P|~w))+I[2]+718787259&4294967295,A=P+(T<<15&4294967295|T>>>17),T=w+(P^(A|~y))+I[9]+3951481745&4294967295,E.g[0]=E.g[0]+y&4294967295,E.g[1]=E.g[1]+(A+(T<<21&4294967295|T>>>11))&4294967295,E.g[2]=E.g[2]+A&4294967295,E.g[3]=E.g[3]+P&4294967295}r.prototype.u=function(E,y){y===void 0&&(y=E.length);for(var w=y-this.blockSize,I=this.B,A=this.h,P=0;P<y;){if(A==0)for(;P<=w;)i(this,E,P),P+=this.blockSize;if(typeof E=="string"){for(;P<y;)if(I[A++]=E.charCodeAt(P++),A==this.blockSize){i(this,I),A=0;break}}else for(;P<y;)if(I[A++]=E[P++],A==this.blockSize){i(this,I),A=0;break}}this.h=A,this.o+=y},r.prototype.v=function(){var E=Array((56>this.h?this.blockSize:2*this.blockSize)-this.h);E[0]=128;for(var y=1;y<E.length-8;++y)E[y]=0;var w=8*this.o;for(y=E.length-8;y<E.length;++y)E[y]=w&255,w/=256;for(this.u(E),E=Array(16),y=w=0;4>y;++y)for(var I=0;32>I;I+=8)E[w++]=this.g[y]>>>I&255;return E};function s(E,y){var w=l;return Object.prototype.hasOwnProperty.call(w,E)?w[E]:w[E]=y(E)}function o(E,y){this.h=y;for(var w=[],I=!0,A=E.length-1;0<=A;A--){var P=E[A]|0;I&&P==y||(w[A]=P,I=!1)}this.g=w}var l={};function u(E){return-128<=E&&128>E?s(E,function(y){return new o([y|0],0>y?-1:0)}):new o([E|0],0>E?-1:0)}function h(E){if(isNaN(E)||!isFinite(E))return g;if(0>E)return V(h(-E));for(var y=[],w=1,I=0;E>=w;I++)y[I]=E/w|0,w*=4294967296;return new o(y,0)}function f(E,y){if(E.length==0)throw Error("number format error: empty string");if(y=y||10,2>y||36<y)throw Error("radix out of range: "+y);if(E.charAt(0)=="-")return V(f(E.substring(1),y));if(0<=E.indexOf("-"))throw Error('number format error: interior "-" character');for(var w=h(Math.pow(y,8)),I=g,A=0;A<E.length;A+=8){var P=Math.min(8,E.length-A),T=parseInt(E.substring(A,A+P),y);8>P?(P=h(Math.pow(y,P)),I=I.j(P).add(h(T))):(I=I.j(w),I=I.add(h(T)))}return I}var g=u(0),v=u(1),R=u(16777216);t=o.prototype,t.m=function(){if(D(this))return-V(this).m();for(var E=0,y=1,w=0;w<this.g.length;w++){var I=this.i(w);E+=(0<=I?I:4294967296+I)*y,y*=4294967296}return E},t.toString=function(E){if(E=E||10,2>E||36<E)throw Error("radix out of range: "+E);if(N(this))return"0";if(D(this))return"-"+V(this).toString(E);for(var y=h(Math.pow(E,6)),w=this,I="";;){var A=O(w,y).g;w=S(w,A.j(y));var P=((0<w.g.length?w.g[0]:w.h)>>>0).toString(E);if(w=A,N(w))return P+I;for(;6>P.length;)P="0"+P;I=P+I}},t.i=function(E){return 0>E?0:E<this.g.length?this.g[E]:this.h};function N(E){if(E.h!=0)return!1;for(var y=0;y<E.g.length;y++)if(E.g[y]!=0)return!1;return!0}function D(E){return E.h==-1}t.l=function(E){return E=S(this,E),D(E)?-1:N(E)?0:1};function V(E){for(var y=E.g.length,w=[],I=0;I<y;I++)w[I]=~E.g[I];return new o(w,~E.h).add(v)}t.abs=function(){return D(this)?V(this):this},t.add=function(E){for(var y=Math.max(this.g.length,E.g.length),w=[],I=0,A=0;A<=y;A++){var P=I+(this.i(A)&65535)+(E.i(A)&65535),T=(P>>>16)+(this.i(A)>>>16)+(E.i(A)>>>16);I=T>>>16,P&=65535,T&=65535,w[A]=T<<16|P}return new o(w,w[w.length-1]&-2147483648?-1:0)};function S(E,y){return E.add(V(y))}t.j=function(E){if(N(this)||N(E))return g;if(D(this))return D(E)?V(this).j(V(E)):V(V(this).j(E));if(D(E))return V(this.j(V(E)));if(0>this.l(R)&&0>E.l(R))return h(this.m()*E.m());for(var y=this.g.length+E.g.length,w=[],I=0;I<2*y;I++)w[I]=0;for(I=0;I<this.g.length;I++)for(var A=0;A<E.g.length;A++){var P=this.i(I)>>>16,T=this.i(I)&65535,pt=E.i(A)>>>16,Kt=E.i(A)&65535;w[2*I+2*A]+=T*Kt,_(w,2*I+2*A),w[2*I+2*A+1]+=P*Kt,_(w,2*I+2*A+1),w[2*I+2*A+1]+=T*pt,_(w,2*I+2*A+1),w[2*I+2*A+2]+=P*pt,_(w,2*I+2*A+2)}for(I=0;I<y;I++)w[I]=w[2*I+1]<<16|w[2*I];for(I=y;I<2*y;I++)w[I]=0;return new o(w,0)};function _(E,y){for(;(E[y]&65535)!=E[y];)E[y+1]+=E[y]>>>16,E[y]&=65535,y++}function k(E,y){this.g=E,this.h=y}function O(E,y){if(N(y))throw Error("division by zero");if(N(E))return new k(g,g);if(D(E))return y=O(V(E),y),new k(V(y.g),V(y.h));if(D(y))return y=O(E,V(y)),new k(V(y.g),y.h);if(30<E.g.length){if(D(E)||D(y))throw Error("slowDivide_ only works with positive integers.");for(var w=v,I=y;0>=I.l(E);)w=U(w),I=U(I);var A=B(w,1),P=B(I,1);for(I=B(I,2),w=B(w,2);!N(I);){var T=P.add(I);0>=T.l(E)&&(A=A.add(w),P=T),I=B(I,1),w=B(w,1)}return y=S(E,A.j(y)),new k(A,y)}for(A=g;0<=E.l(y);){for(w=Math.max(1,Math.floor(E.m()/y.m())),I=Math.ceil(Math.log(w)/Math.LN2),I=48>=I?1:Math.pow(2,I-48),P=h(w),T=P.j(y);D(T)||0<T.l(E);)w-=I,P=h(w),T=P.j(y);N(P)&&(P=v),A=A.add(P),E=S(E,T)}return new k(A,E)}t.A=function(E){return O(this,E).h},t.and=function(E){for(var y=Math.max(this.g.length,E.g.length),w=[],I=0;I<y;I++)w[I]=this.i(I)&E.i(I);return new o(w,this.h&E.h)},t.or=function(E){for(var y=Math.max(this.g.length,E.g.length),w=[],I=0;I<y;I++)w[I]=this.i(I)|E.i(I);return new o(w,this.h|E.h)},t.xor=function(E){for(var y=Math.max(this.g.length,E.g.length),w=[],I=0;I<y;I++)w[I]=this.i(I)^E.i(I);return new o(w,this.h^E.h)};function U(E){for(var y=E.g.length+1,w=[],I=0;I<y;I++)w[I]=E.i(I)<<1|E.i(I-1)>>>31;return new o(w,E.h)}function B(E,y){var w=y>>5;y%=32;for(var I=E.g.length-w,A=[],P=0;P<I;P++)A[P]=0<y?E.i(P+w)>>>y|E.i(P+w+1)<<32-y:E.i(P+w);return new o(A,E.h)}r.prototype.digest=r.prototype.v,r.prototype.reset=r.prototype.s,r.prototype.update=r.prototype.u,q_=r,o.prototype.add=o.prototype.add,o.prototype.multiply=o.prototype.j,o.prototype.modulo=o.prototype.A,o.prototype.compare=o.prototype.l,o.prototype.toNumber=o.prototype.m,o.prototype.toString=o.prototype.toString,o.prototype.getBits=o.prototype.i,o.fromNumber=h,o.fromString=f,xr=o}).apply(typeof eg<"u"?eg:typeof self<"u"?self:typeof window<"u"?window:{});var pa=typeof globalThis<"u"?globalThis:typeof window<"u"?window:typeof global<"u"?global:typeof self<"u"?self:{};/** @license
Copyright The Closure Library Authors.
SPDX-License-Identifier: Apache-2.0
*/var K_,Is,G_,La,_h,Q_,Y_,X_;(function(){var t,e=typeof Object.defineProperties=="function"?Object.defineProperty:function(a,c,d){return a==Array.prototype||a==Object.prototype||(a[c]=d.value),a};function n(a){a=[typeof globalThis=="object"&&globalThis,a,typeof window=="object"&&window,typeof self=="object"&&self,typeof pa=="object"&&pa];for(var c=0;c<a.length;++c){var d=a[c];if(d&&d.Math==Math)return d}throw Error("Cannot find global object")}var r=n(this);function i(a,c){if(c)e:{var d=r;a=a.split(".");for(var m=0;m<a.length-1;m++){var x=a[m];if(!(x in d))break e;d=d[x]}a=a[a.length-1],m=d[a],c=c(m),c!=m&&c!=null&&e(d,a,{configurable:!0,writable:!0,value:c})}}function s(a,c){a instanceof String&&(a+="");var d=0,m=!1,x={next:function(){if(!m&&d<a.length){var b=d++;return{value:c(b,a[b]),done:!1}}return m=!0,{done:!0,value:void 0}}};return x[Symbol.iterator]=function(){return x},x}i("Array.prototype.values",function(a){return a||function(){return s(this,function(c,d){return d})}});/** @license

 Copyright The Closure Library Authors.
 SPDX-License-Identifier: Apache-2.0
*/var o=o||{},l=this||self;function u(a){var c=typeof a;return c=c!="object"?c:a?Array.isArray(a)?"array":c:"null",c=="array"||c=="object"&&typeof a.length=="number"}function h(a){var c=typeof a;return c=="object"&&a!=null||c=="function"}function f(a,c,d){return a.call.apply(a.bind,arguments)}function g(a,c,d){if(!a)throw Error();if(2<arguments.length){var m=Array.prototype.slice.call(arguments,2);return function(){var x=Array.prototype.slice.call(arguments);return Array.prototype.unshift.apply(x,m),a.apply(c,x)}}return function(){return a.apply(c,arguments)}}function v(a,c,d){return v=Function.prototype.bind&&Function.prototype.bind.toString().indexOf("native code")!=-1?f:g,v.apply(null,arguments)}function R(a,c){var d=Array.prototype.slice.call(arguments,1);return function(){var m=d.slice();return m.push.apply(m,arguments),a.apply(this,m)}}function N(a,c){function d(){}d.prototype=c.prototype,a.aa=c.prototype,a.prototype=new d,a.prototype.constructor=a,a.Qb=function(m,x,b){for(var z=Array(arguments.length-2),me=2;me<arguments.length;me++)z[me-2]=arguments[me];return c.prototype[x].apply(m,z)}}function D(a){const c=a.length;if(0<c){const d=Array(c);for(let m=0;m<c;m++)d[m]=a[m];return d}return[]}function V(a,c){for(let d=1;d<arguments.length;d++){const m=arguments[d];if(u(m)){const x=a.length||0,b=m.length||0;a.length=x+b;for(let z=0;z<b;z++)a[x+z]=m[z]}else a.push(m)}}class S{constructor(c,d){this.i=c,this.j=d,this.h=0,this.g=null}get(){let c;return 0<this.h?(this.h--,c=this.g,this.g=c.next,c.next=null):c=this.i(),c}}function _(a){return/^[\s\xa0]*$/.test(a)}function k(){var a=l.navigator;return a&&(a=a.userAgent)?a:""}function O(a){return O[" "](a),a}O[" "]=function(){};var U=k().indexOf("Gecko")!=-1&&!(k().toLowerCase().indexOf("webkit")!=-1&&k().indexOf("Edge")==-1)&&!(k().indexOf("Trident")!=-1||k().indexOf("MSIE")!=-1)&&k().indexOf("Edge")==-1;function B(a,c,d){for(const m in a)c.call(d,a[m],m,a)}function E(a,c){for(const d in a)c.call(void 0,a[d],d,a)}function y(a){const c={};for(const d in a)c[d]=a[d];return c}const w="constructor hasOwnProperty isPrototypeOf propertyIsEnumerable toLocaleString toString valueOf".split(" ");function I(a,c){let d,m;for(let x=1;x<arguments.length;x++){m=arguments[x];for(d in m)a[d]=m[d];for(let b=0;b<w.length;b++)d=w[b],Object.prototype.hasOwnProperty.call(m,d)&&(a[d]=m[d])}}function A(a){var c=1;a=a.split(":");const d=[];for(;0<c&&a.length;)d.push(a.shift()),c--;return a.length&&d.push(a.join(":")),d}function P(a){l.setTimeout(()=>{throw a},0)}function T(){var a=Y;let c=null;return a.g&&(c=a.g,a.g=a.g.next,a.g||(a.h=null),c.next=null),c}class pt{constructor(){this.h=this.g=null}add(c,d){const m=Kt.get();m.set(c,d),this.h?this.h.next=m:this.g=m,this.h=m}}var Kt=new S(()=>new gr,a=>a.reset());class gr{constructor(){this.next=this.g=this.h=null}set(c,d){this.h=c,this.g=d,this.next=null}reset(){this.next=this.g=this.h=null}}let Pt,$=!1,Y=new pt,G=()=>{const a=l.Promise.resolve(void 0);Pt=()=>{a.then(he)}};var he=()=>{for(var a;a=T();){try{a.h.call(a.g)}catch(d){P(d)}var c=Kt;c.j(a),100>c.h&&(c.h++,a.next=c.g,c.g=a)}$=!1};function de(){this.s=this.s,this.C=this.C}de.prototype.s=!1,de.prototype.ma=function(){this.s||(this.s=!0,this.N())},de.prototype.N=function(){if(this.C)for(;this.C.length;)this.C.shift()()};function we(a,c){this.type=a,this.g=this.target=c,this.defaultPrevented=!1}we.prototype.h=function(){this.defaultPrevented=!0};var xt=function(){if(!l.addEventListener||!Object.defineProperty)return!1;var a=!1,c=Object.defineProperty({},"passive",{get:function(){a=!0}});try{const d=()=>{};l.addEventListener("test",d,c),l.removeEventListener("test",d,c)}catch{}return a}();function j(a,c){if(we.call(this,a?a.type:""),this.relatedTarget=this.g=this.target=null,this.button=this.screenY=this.screenX=this.clientY=this.clientX=0,this.key="",this.metaKey=this.shiftKey=this.altKey=this.ctrlKey=!1,this.state=null,this.pointerId=0,this.pointerType="",this.i=null,a){var d=this.type=a.type,m=a.changedTouches&&a.changedTouches.length?a.changedTouches[0]:null;if(this.target=a.target||a.srcElement,this.g=c,c=a.relatedTarget){if(U){e:{try{O(c.nodeName);var x=!0;break e}catch{}x=!1}x||(c=null)}}else d=="mouseover"?c=a.fromElement:d=="mouseout"&&(c=a.toElement);this.relatedTarget=c,m?(this.clientX=m.clientX!==void 0?m.clientX:m.pageX,this.clientY=m.clientY!==void 0?m.clientY:m.pageY,this.screenX=m.screenX||0,this.screenY=m.screenY||0):(this.clientX=a.clientX!==void 0?a.clientX:a.pageX,this.clientY=a.clientY!==void 0?a.clientY:a.pageY,this.screenX=a.screenX||0,this.screenY=a.screenY||0),this.button=a.button,this.key=a.key||"",this.ctrlKey=a.ctrlKey,this.altKey=a.altKey,this.shiftKey=a.shiftKey,this.metaKey=a.metaKey,this.pointerId=a.pointerId||0,this.pointerType=typeof a.pointerType=="string"?a.pointerType:te[a.pointerType]||"",this.state=a.state,this.i=a,a.defaultPrevented&&j.aa.h.call(this)}}N(j,we);var te={2:"touch",3:"pen",4:"mouse"};j.prototype.h=function(){j.aa.h.call(this);var a=this.i;a.preventDefault?a.preventDefault():a.returnValue=!1};var ne="closure_listenable_"+(1e6*Math.random()|0),ce=0;function Fe(a,c,d,m,x){this.listener=a,this.proxy=null,this.src=c,this.type=d,this.capture=!!m,this.ha=x,this.key=++ce,this.da=this.fa=!1}function Ye(a){a.da=!0,a.listener=null,a.proxy=null,a.src=null,a.ha=null}function Gt(a){this.src=a,this.g={},this.h=0}Gt.prototype.add=function(a,c,d,m,x){var b=a.toString();a=this.g[b],a||(a=this.g[b]=[],this.h++);var z=au(a,c,m,x);return-1<z?(c=a[z],d||(c.fa=!1)):(c=new Fe(c,this.src,b,!!m,x),c.fa=d,a.push(c)),c};function ou(a,c){var d=c.type;if(d in a.g){var m=a.g[d],x=Array.prototype.indexOf.call(m,c,void 0),b;(b=0<=x)&&Array.prototype.splice.call(m,x,1),b&&(Ye(c),a.g[d].length==0&&(delete a.g[d],a.h--))}}function au(a,c,d,m){for(var x=0;x<a.length;++x){var b=a[x];if(!b.da&&b.listener==c&&b.capture==!!d&&b.ha==m)return x}return-1}var lu="closure_lm_"+(1e6*Math.random()|0),uu={};function _f(a,c,d,m,x){if(Array.isArray(c)){for(var b=0;b<c.length;b++)_f(a,c[b],d,m,x);return null}return d=Tf(d),a&&a[ne]?a.K(c,d,h(m)?!!m.capture:!1,x):pw(a,c,d,!1,m,x)}function pw(a,c,d,m,x,b){if(!c)throw Error("Invalid event type");var z=h(x)?!!x.capture:!!x,me=hu(a);if(me||(a[lu]=me=new Gt(a)),d=me.add(c,d,m,z,b),d.proxy)return d;if(m=mw(),d.proxy=m,m.src=a,m.listener=d,a.addEventListener)xt||(x=z),x===void 0&&(x=!1),a.addEventListener(c.toString(),m,x);else if(a.attachEvent)a.attachEvent(Ef(c.toString()),m);else if(a.addListener&&a.removeListener)a.addListener(m);else throw Error("addEventListener and attachEvent are unavailable.");return d}function mw(){function a(d){return c.call(a.src,a.listener,d)}const c=gw;return a}function wf(a,c,d,m,x){if(Array.isArray(c))for(var b=0;b<c.length;b++)wf(a,c[b],d,m,x);else m=h(m)?!!m.capture:!!m,d=Tf(d),a&&a[ne]?(a=a.i,c=String(c).toString(),c in a.g&&(b=a.g[c],d=au(b,d,m,x),-1<d&&(Ye(b[d]),Array.prototype.splice.call(b,d,1),b.length==0&&(delete a.g[c],a.h--)))):a&&(a=hu(a))&&(c=a.g[c.toString()],a=-1,c&&(a=au(c,d,m,x)),(d=-1<a?c[a]:null)&&cu(d))}function cu(a){if(typeof a!="number"&&a&&!a.da){var c=a.src;if(c&&c[ne])ou(c.i,a);else{var d=a.type,m=a.proxy;c.removeEventListener?c.removeEventListener(d,m,a.capture):c.detachEvent?c.detachEvent(Ef(d),m):c.addListener&&c.removeListener&&c.removeListener(m),(d=hu(c))?(ou(d,a),d.h==0&&(d.src=null,c[lu]=null)):Ye(a)}}}function Ef(a){return a in uu?uu[a]:uu[a]="on"+a}function gw(a,c){if(a.da)a=!0;else{c=new j(c,this);var d=a.listener,m=a.ha||a.src;a.fa&&cu(a),a=d.call(m,c)}return a}function hu(a){return a=a[lu],a instanceof Gt?a:null}var du="__closure_events_fn_"+(1e9*Math.random()>>>0);function Tf(a){return typeof a=="function"?a:(a[du]||(a[du]=function(c){return a.handleEvent(c)}),a[du])}function Xe(){de.call(this),this.i=new Gt(this),this.M=this,this.F=null}N(Xe,de),Xe.prototype[ne]=!0,Xe.prototype.removeEventListener=function(a,c,d,m){wf(this,a,c,d,m)};function lt(a,c){var d,m=a.F;if(m)for(d=[];m;m=m.F)d.push(m);if(a=a.M,m=c.type||c,typeof c=="string")c=new we(c,a);else if(c instanceof we)c.target=c.target||a;else{var x=c;c=new we(m,a),I(c,x)}if(x=!0,d)for(var b=d.length-1;0<=b;b--){var z=c.g=d[b];x=bo(z,m,!0,c)&&x}if(z=c.g=a,x=bo(z,m,!0,c)&&x,x=bo(z,m,!1,c)&&x,d)for(b=0;b<d.length;b++)z=c.g=d[b],x=bo(z,m,!1,c)&&x}Xe.prototype.N=function(){if(Xe.aa.N.call(this),this.i){var a=this.i,c;for(c in a.g){for(var d=a.g[c],m=0;m<d.length;m++)Ye(d[m]);delete a.g[c],a.h--}}this.F=null},Xe.prototype.K=function(a,c,d,m){return this.i.add(String(a),c,!1,d,m)},Xe.prototype.L=function(a,c,d,m){return this.i.add(String(a),c,!0,d,m)};function bo(a,c,d,m){if(c=a.i.g[String(c)],!c)return!0;c=c.concat();for(var x=!0,b=0;b<c.length;++b){var z=c[b];if(z&&!z.da&&z.capture==d){var me=z.listener,ze=z.ha||z.src;z.fa&&ou(a.i,z),x=me.call(ze,m)!==!1&&x}}return x&&!m.defaultPrevented}function If(a,c,d){if(typeof a=="function")d&&(a=v(a,d));else if(a&&typeof a.handleEvent=="function")a=v(a.handleEvent,a);else throw Error("Invalid listener argument");return 2147483647<Number(c)?-1:l.setTimeout(a,c||0)}function Sf(a){a.g=If(()=>{a.g=null,a.i&&(a.i=!1,Sf(a))},a.l);const c=a.h;a.h=null,a.m.apply(null,c)}class yw extends de{constructor(c,d){super(),this.m=c,this.l=d,this.h=null,this.i=!1,this.g=null}j(c){this.h=arguments,this.g?this.i=!0:Sf(this)}N(){super.N(),this.g&&(l.clearTimeout(this.g),this.g=null,this.i=!1,this.h=null)}}function Yi(a){de.call(this),this.h=a,this.g={}}N(Yi,de);var kf=[];function Af(a){B(a.g,function(c,d){this.g.hasOwnProperty(d)&&cu(c)},a),a.g={}}Yi.prototype.N=function(){Yi.aa.N.call(this),Af(this)},Yi.prototype.handleEvent=function(){throw Error("EventHandler.handleEvent not implemented")};var fu=l.JSON.stringify,vw=l.JSON.parse,_w=class{stringify(a){return l.JSON.stringify(a,void 0)}parse(a){return l.JSON.parse(a,void 0)}};function pu(){}pu.prototype.h=null;function Cf(a){return a.h||(a.h=a.i())}function Rf(){}var Xi={OPEN:"a",kb:"b",Ja:"c",wb:"d"};function mu(){we.call(this,"d")}N(mu,we);function gu(){we.call(this,"c")}N(gu,we);var yr={},Pf=null;function Oo(){return Pf=Pf||new Xe}yr.La="serverreachability";function xf(a){we.call(this,yr.La,a)}N(xf,we);function Ji(a){const c=Oo();lt(c,new xf(c))}yr.STAT_EVENT="statevent";function Nf(a,c){we.call(this,yr.STAT_EVENT,a),this.stat=c}N(Nf,we);function ut(a){const c=Oo();lt(c,new Nf(c,a))}yr.Ma="timingevent";function Df(a,c){we.call(this,yr.Ma,a),this.size=c}N(Df,we);function Zi(a,c){if(typeof a!="function")throw Error("Fn must not be null and must be a function");return l.setTimeout(function(){a()},c)}function es(){this.g=!0}es.prototype.xa=function(){this.g=!1};function ww(a,c,d,m,x,b){a.info(function(){if(a.g)if(b)for(var z="",me=b.split("&"),ze=0;ze<me.length;ze++){var le=me[ze].split("=");if(1<le.length){var Je=le[0];le=le[1];var Ze=Je.split("_");z=2<=Ze.length&&Ze[1]=="type"?z+(Je+"="+le+"&"):z+(Je+"=redacted&")}}else z=null;else z=b;return"XMLHTTP REQ ("+m+") [attempt "+x+"]: "+c+`
`+d+`
`+z})}function Ew(a,c,d,m,x,b,z){a.info(function(){return"XMLHTTP RESP ("+m+") [ attempt "+x+"]: "+c+`
`+d+`
`+b+" "+z})}function Gr(a,c,d,m){a.info(function(){return"XMLHTTP TEXT ("+c+"): "+Iw(a,d)+(m?" "+m:"")})}function Tw(a,c){a.info(function(){return"TIMEOUT: "+c})}es.prototype.info=function(){};function Iw(a,c){if(!a.g)return c;if(!c)return null;try{var d=JSON.parse(c);if(d){for(a=0;a<d.length;a++)if(Array.isArray(d[a])){var m=d[a];if(!(2>m.length)){var x=m[1];if(Array.isArray(x)&&!(1>x.length)){var b=x[0];if(b!="noop"&&b!="stop"&&b!="close")for(var z=1;z<x.length;z++)x[z]=""}}}}return fu(d)}catch{return c}}var Lo={NO_ERROR:0,gb:1,tb:2,sb:3,nb:4,rb:5,ub:6,Ia:7,TIMEOUT:8,xb:9},Vf={lb:"complete",Hb:"success",Ja:"error",Ia:"abort",zb:"ready",Ab:"readystatechange",TIMEOUT:"timeout",vb:"incrementaldata",yb:"progress",ob:"downloadprogress",Pb:"uploadprogress"},yu;function Mo(){}N(Mo,pu),Mo.prototype.g=function(){return new XMLHttpRequest},Mo.prototype.i=function(){return{}},yu=new Mo;function Vn(a,c,d,m){this.j=a,this.i=c,this.l=d,this.R=m||1,this.U=new Yi(this),this.I=45e3,this.H=null,this.o=!1,this.m=this.A=this.v=this.L=this.F=this.S=this.B=null,this.D=[],this.g=null,this.C=0,this.s=this.u=null,this.X=-1,this.J=!1,this.O=0,this.M=null,this.W=this.K=this.T=this.P=!1,this.h=new bf}function bf(){this.i=null,this.g="",this.h=!1}var Of={},vu={};function _u(a,c,d){a.L=1,a.v=Bo(un(c)),a.m=d,a.P=!0,Lf(a,null)}function Lf(a,c){a.F=Date.now(),Fo(a),a.A=un(a.v);var d=a.A,m=a.R;Array.isArray(m)||(m=[String(m)]),Yf(d.i,"t",m),a.C=0,d=a.j.J,a.h=new bf,a.g=pp(a.j,d?c:null,!a.m),0<a.O&&(a.M=new yw(v(a.Y,a,a.g),a.O)),c=a.U,d=a.g,m=a.ca;var x="readystatechange";Array.isArray(x)||(x&&(kf[0]=x.toString()),x=kf);for(var b=0;b<x.length;b++){var z=_f(d,x[b],m||c.handleEvent,!1,c.h||c);if(!z)break;c.g[z.key]=z}c=a.H?y(a.H):{},a.m?(a.u||(a.u="POST"),c["Content-Type"]="application/x-www-form-urlencoded",a.g.ea(a.A,a.u,a.m,c)):(a.u="GET",a.g.ea(a.A,a.u,null,c)),Ji(),ww(a.i,a.u,a.A,a.l,a.R,a.m)}Vn.prototype.ca=function(a){a=a.target;const c=this.M;c&&cn(a)==3?c.j():this.Y(a)},Vn.prototype.Y=function(a){try{if(a==this.g)e:{const Ze=cn(this.g);var c=this.g.Ba();const Xr=this.g.Z();if(!(3>Ze)&&(Ze!=3||this.g&&(this.h.h||this.g.oa()||rp(this.g)))){this.J||Ze!=4||c==7||(c==8||0>=Xr?Ji(3):Ji(2)),wu(this);var d=this.g.Z();this.X=d;t:if(Mf(this)){var m=rp(this.g);a="";var x=m.length,b=cn(this.g)==4;if(!this.h.i){if(typeof TextDecoder>"u"){vr(this),ts(this);var z="";break t}this.h.i=new l.TextDecoder}for(c=0;c<x;c++)this.h.h=!0,a+=this.h.i.decode(m[c],{stream:!(b&&c==x-1)});m.length=0,this.h.g+=a,this.C=0,z=this.h.g}else z=this.g.oa();if(this.o=d==200,Ew(this.i,this.u,this.A,this.l,this.R,Ze,d),this.o){if(this.T&&!this.K){t:{if(this.g){var me,ze=this.g;if((me=ze.g?ze.g.getResponseHeader("X-HTTP-Initial-Response"):null)&&!_(me)){var le=me;break t}}le=null}if(d=le)Gr(this.i,this.l,d,"Initial handshake response via X-HTTP-Initial-Response"),this.K=!0,Eu(this,d);else{this.o=!1,this.s=3,ut(12),vr(this),ts(this);break e}}if(this.P){d=!0;let Ft;for(;!this.J&&this.C<z.length;)if(Ft=Sw(this,z),Ft==vu){Ze==4&&(this.s=4,ut(14),d=!1),Gr(this.i,this.l,null,"[Incomplete Response]");break}else if(Ft==Of){this.s=4,ut(15),Gr(this.i,this.l,z,"[Invalid Chunk]"),d=!1;break}else Gr(this.i,this.l,Ft,null),Eu(this,Ft);if(Mf(this)&&this.C!=0&&(this.h.g=this.h.g.slice(this.C),this.C=0),Ze!=4||z.length!=0||this.h.h||(this.s=1,ut(16),d=!1),this.o=this.o&&d,!d)Gr(this.i,this.l,z,"[Invalid Chunked Response]"),vr(this),ts(this);else if(0<z.length&&!this.W){this.W=!0;var Je=this.j;Je.g==this&&Je.ba&&!Je.M&&(Je.j.info("Great, no buffering proxy detected. Bytes received: "+z.length),Cu(Je),Je.M=!0,ut(11))}}else Gr(this.i,this.l,z,null),Eu(this,z);Ze==4&&vr(this),this.o&&!this.J&&(Ze==4?cp(this.j,this):(this.o=!1,Fo(this)))}else Bw(this.g),d==400&&0<z.indexOf("Unknown SID")?(this.s=3,ut(12)):(this.s=0,ut(13)),vr(this),ts(this)}}}catch{}finally{}};function Mf(a){return a.g?a.u=="GET"&&a.L!=2&&a.j.Ca:!1}function Sw(a,c){var d=a.C,m=c.indexOf(`
`,d);return m==-1?vu:(d=Number(c.substring(d,m)),isNaN(d)?Of:(m+=1,m+d>c.length?vu:(c=c.slice(m,m+d),a.C=m+d,c)))}Vn.prototype.cancel=function(){this.J=!0,vr(this)};function Fo(a){a.S=Date.now()+a.I,Ff(a,a.I)}function Ff(a,c){if(a.B!=null)throw Error("WatchDog timer not null");a.B=Zi(v(a.ba,a),c)}function wu(a){a.B&&(l.clearTimeout(a.B),a.B=null)}Vn.prototype.ba=function(){this.B=null;const a=Date.now();0<=a-this.S?(Tw(this.i,this.A),this.L!=2&&(Ji(),ut(17)),vr(this),this.s=2,ts(this)):Ff(this,this.S-a)};function ts(a){a.j.G==0||a.J||cp(a.j,a)}function vr(a){wu(a);var c=a.M;c&&typeof c.ma=="function"&&c.ma(),a.M=null,Af(a.U),a.g&&(c=a.g,a.g=null,c.abort(),c.ma())}function Eu(a,c){try{var d=a.j;if(d.G!=0&&(d.g==a||Tu(d.h,a))){if(!a.K&&Tu(d.h,a)&&d.G==3){try{var m=d.Da.g.parse(c)}catch{m=null}if(Array.isArray(m)&&m.length==3){var x=m;if(x[0]==0){e:if(!d.u){if(d.g)if(d.g.F+3e3<a.F)Ko(d),Ho(d);else break e;Au(d),ut(18)}}else d.za=x[1],0<d.za-d.T&&37500>x[2]&&d.F&&d.v==0&&!d.C&&(d.C=Zi(v(d.Za,d),6e3));if(1>=Bf(d.h)&&d.ca){try{d.ca()}catch{}d.ca=void 0}}else wr(d,11)}else if((a.K||d.g==a)&&Ko(d),!_(c))for(x=d.Da.g.parse(c),c=0;c<x.length;c++){let le=x[c];if(d.T=le[0],le=le[1],d.G==2)if(le[0]=="c"){d.K=le[1],d.ia=le[2];const Je=le[3];Je!=null&&(d.la=Je,d.j.info("VER="+d.la));const Ze=le[4];Ze!=null&&(d.Aa=Ze,d.j.info("SVER="+d.Aa));const Xr=le[5];Xr!=null&&typeof Xr=="number"&&0<Xr&&(m=1.5*Xr,d.L=m,d.j.info("backChannelRequestTimeoutMs_="+m)),m=d;const Ft=a.g;if(Ft){const Qo=Ft.g?Ft.g.getResponseHeader("X-Client-Wire-Protocol"):null;if(Qo){var b=m.h;b.g||Qo.indexOf("spdy")==-1&&Qo.indexOf("quic")==-1&&Qo.indexOf("h2")==-1||(b.j=b.l,b.g=new Set,b.h&&(Iu(b,b.h),b.h=null))}if(m.D){const Ru=Ft.g?Ft.g.getResponseHeader("X-HTTP-Session-Id"):null;Ru&&(m.ya=Ru,ye(m.I,m.D,Ru))}}d.G=3,d.l&&d.l.ua(),d.ba&&(d.R=Date.now()-a.F,d.j.info("Handshake RTT: "+d.R+"ms")),m=d;var z=a;if(m.qa=fp(m,m.J?m.ia:null,m.W),z.K){zf(m.h,z);var me=z,ze=m.L;ze&&(me.I=ze),me.B&&(wu(me),Fo(me)),m.g=z}else lp(m);0<d.i.length&&qo(d)}else le[0]!="stop"&&le[0]!="close"||wr(d,7);else d.G==3&&(le[0]=="stop"||le[0]=="close"?le[0]=="stop"?wr(d,7):ku(d):le[0]!="noop"&&d.l&&d.l.ta(le),d.v=0)}}Ji(4)}catch{}}var kw=class{constructor(a,c){this.g=a,this.map=c}};function jf(a){this.l=a||10,l.PerformanceNavigationTiming?(a=l.performance.getEntriesByType("navigation"),a=0<a.length&&(a[0].nextHopProtocol=="hq"||a[0].nextHopProtocol=="h2")):a=!!(l.chrome&&l.chrome.loadTimes&&l.chrome.loadTimes()&&l.chrome.loadTimes().wasFetchedViaSpdy),this.j=a?this.l:1,this.g=null,1<this.j&&(this.g=new Set),this.h=null,this.i=[]}function Uf(a){return a.h?!0:a.g?a.g.size>=a.j:!1}function Bf(a){return a.h?1:a.g?a.g.size:0}function Tu(a,c){return a.h?a.h==c:a.g?a.g.has(c):!1}function Iu(a,c){a.g?a.g.add(c):a.h=c}function zf(a,c){a.h&&a.h==c?a.h=null:a.g&&a.g.has(c)&&a.g.delete(c)}jf.prototype.cancel=function(){if(this.i=$f(this),this.h)this.h.cancel(),this.h=null;else if(this.g&&this.g.size!==0){for(const a of this.g.values())a.cancel();this.g.clear()}};function $f(a){if(a.h!=null)return a.i.concat(a.h.D);if(a.g!=null&&a.g.size!==0){let c=a.i;for(const d of a.g.values())c=c.concat(d.D);return c}return D(a.i)}function Aw(a){if(a.V&&typeof a.V=="function")return a.V();if(typeof Map<"u"&&a instanceof Map||typeof Set<"u"&&a instanceof Set)return Array.from(a.values());if(typeof a=="string")return a.split("");if(u(a)){for(var c=[],d=a.length,m=0;m<d;m++)c.push(a[m]);return c}c=[],d=0;for(m in a)c[d++]=a[m];return c}function Cw(a){if(a.na&&typeof a.na=="function")return a.na();if(!a.V||typeof a.V!="function"){if(typeof Map<"u"&&a instanceof Map)return Array.from(a.keys());if(!(typeof Set<"u"&&a instanceof Set)){if(u(a)||typeof a=="string"){var c=[];a=a.length;for(var d=0;d<a;d++)c.push(d);return c}c=[],d=0;for(const m in a)c[d++]=m;return c}}}function Wf(a,c){if(a.forEach&&typeof a.forEach=="function")a.forEach(c,void 0);else if(u(a)||typeof a=="string")Array.prototype.forEach.call(a,c,void 0);else for(var d=Cw(a),m=Aw(a),x=m.length,b=0;b<x;b++)c.call(void 0,m[b],d&&d[b],a)}var Hf=RegExp("^(?:([^:/?#.]+):)?(?://(?:([^\\\\/?#]*)@)?([^\\\\/?#]*?)(?::([0-9]+))?(?=[\\\\/?#]|$))?([^?#]+)?(?:\\?([^#]*))?(?:#([\\s\\S]*))?$");function Rw(a,c){if(a){a=a.split("&");for(var d=0;d<a.length;d++){var m=a[d].indexOf("="),x=null;if(0<=m){var b=a[d].substring(0,m);x=a[d].substring(m+1)}else b=a[d];c(b,x?decodeURIComponent(x.replace(/\+/g," ")):"")}}}function _r(a){if(this.g=this.o=this.j="",this.s=null,this.m=this.l="",this.h=!1,a instanceof _r){this.h=a.h,jo(this,a.j),this.o=a.o,this.g=a.g,Uo(this,a.s),this.l=a.l;var c=a.i,d=new is;d.i=c.i,c.g&&(d.g=new Map(c.g),d.h=c.h),qf(this,d),this.m=a.m}else a&&(c=String(a).match(Hf))?(this.h=!1,jo(this,c[1]||"",!0),this.o=ns(c[2]||""),this.g=ns(c[3]||"",!0),Uo(this,c[4]),this.l=ns(c[5]||"",!0),qf(this,c[6]||"",!0),this.m=ns(c[7]||"")):(this.h=!1,this.i=new is(null,this.h))}_r.prototype.toString=function(){var a=[],c=this.j;c&&a.push(rs(c,Kf,!0),":");var d=this.g;return(d||c=="file")&&(a.push("//"),(c=this.o)&&a.push(rs(c,Kf,!0),"@"),a.push(encodeURIComponent(String(d)).replace(/%25([0-9a-fA-F]{2})/g,"%$1")),d=this.s,d!=null&&a.push(":",String(d))),(d=this.l)&&(this.g&&d.charAt(0)!="/"&&a.push("/"),a.push(rs(d,d.charAt(0)=="/"?Nw:xw,!0))),(d=this.i.toString())&&a.push("?",d),(d=this.m)&&a.push("#",rs(d,Vw)),a.join("")};function un(a){return new _r(a)}function jo(a,c,d){a.j=d?ns(c,!0):c,a.j&&(a.j=a.j.replace(/:$/,""))}function Uo(a,c){if(c){if(c=Number(c),isNaN(c)||0>c)throw Error("Bad port number "+c);a.s=c}else a.s=null}function qf(a,c,d){c instanceof is?(a.i=c,bw(a.i,a.h)):(d||(c=rs(c,Dw)),a.i=new is(c,a.h))}function ye(a,c,d){a.i.set(c,d)}function Bo(a){return ye(a,"zx",Math.floor(2147483648*Math.random()).toString(36)+Math.abs(Math.floor(2147483648*Math.random())^Date.now()).toString(36)),a}function ns(a,c){return a?c?decodeURI(a.replace(/%25/g,"%2525")):decodeURIComponent(a):""}function rs(a,c,d){return typeof a=="string"?(a=encodeURI(a).replace(c,Pw),d&&(a=a.replace(/%25([0-9a-fA-F]{2})/g,"%$1")),a):null}function Pw(a){return a=a.charCodeAt(0),"%"+(a>>4&15).toString(16)+(a&15).toString(16)}var Kf=/[#\/\?@]/g,xw=/[#\?:]/g,Nw=/[#\?]/g,Dw=/[#\?@]/g,Vw=/#/g;function is(a,c){this.h=this.g=null,this.i=a||null,this.j=!!c}function bn(a){a.g||(a.g=new Map,a.h=0,a.i&&Rw(a.i,function(c,d){a.add(decodeURIComponent(c.replace(/\+/g," ")),d)}))}t=is.prototype,t.add=function(a,c){bn(this),this.i=null,a=Qr(this,a);var d=this.g.get(a);return d||this.g.set(a,d=[]),d.push(c),this.h+=1,this};function Gf(a,c){bn(a),c=Qr(a,c),a.g.has(c)&&(a.i=null,a.h-=a.g.get(c).length,a.g.delete(c))}function Qf(a,c){return bn(a),c=Qr(a,c),a.g.has(c)}t.forEach=function(a,c){bn(this),this.g.forEach(function(d,m){d.forEach(function(x){a.call(c,x,m,this)},this)},this)},t.na=function(){bn(this);const a=Array.from(this.g.values()),c=Array.from(this.g.keys()),d=[];for(let m=0;m<c.length;m++){const x=a[m];for(let b=0;b<x.length;b++)d.push(c[m])}return d},t.V=function(a){bn(this);let c=[];if(typeof a=="string")Qf(this,a)&&(c=c.concat(this.g.get(Qr(this,a))));else{a=Array.from(this.g.values());for(let d=0;d<a.length;d++)c=c.concat(a[d])}return c},t.set=function(a,c){return bn(this),this.i=null,a=Qr(this,a),Qf(this,a)&&(this.h-=this.g.get(a).length),this.g.set(a,[c]),this.h+=1,this},t.get=function(a,c){return a?(a=this.V(a),0<a.length?String(a[0]):c):c};function Yf(a,c,d){Gf(a,c),0<d.length&&(a.i=null,a.g.set(Qr(a,c),D(d)),a.h+=d.length)}t.toString=function(){if(this.i)return this.i;if(!this.g)return"";const a=[],c=Array.from(this.g.keys());for(var d=0;d<c.length;d++){var m=c[d];const b=encodeURIComponent(String(m)),z=this.V(m);for(m=0;m<z.length;m++){var x=b;z[m]!==""&&(x+="="+encodeURIComponent(String(z[m]))),a.push(x)}}return this.i=a.join("&")};function Qr(a,c){return c=String(c),a.j&&(c=c.toLowerCase()),c}function bw(a,c){c&&!a.j&&(bn(a),a.i=null,a.g.forEach(function(d,m){var x=m.toLowerCase();m!=x&&(Gf(this,m),Yf(this,x,d))},a)),a.j=c}function Ow(a,c){const d=new es;if(l.Image){const m=new Image;m.onload=R(On,d,"TestLoadImage: loaded",!0,c,m),m.onerror=R(On,d,"TestLoadImage: error",!1,c,m),m.onabort=R(On,d,"TestLoadImage: abort",!1,c,m),m.ontimeout=R(On,d,"TestLoadImage: timeout",!1,c,m),l.setTimeout(function(){m.ontimeout&&m.ontimeout()},1e4),m.src=a}else c(!1)}function Lw(a,c){const d=new es,m=new AbortController,x=setTimeout(()=>{m.abort(),On(d,"TestPingServer: timeout",!1,c)},1e4);fetch(a,{signal:m.signal}).then(b=>{clearTimeout(x),b.ok?On(d,"TestPingServer: ok",!0,c):On(d,"TestPingServer: server error",!1,c)}).catch(()=>{clearTimeout(x),On(d,"TestPingServer: error",!1,c)})}function On(a,c,d,m,x){try{x&&(x.onload=null,x.onerror=null,x.onabort=null,x.ontimeout=null),m(d)}catch{}}function Mw(){this.g=new _w}function Fw(a,c,d){const m=d||"";try{Wf(a,function(x,b){let z=x;h(x)&&(z=fu(x)),c.push(m+b+"="+encodeURIComponent(z))})}catch(x){throw c.push(m+"type="+encodeURIComponent("_badmap")),x}}function zo(a){this.l=a.Ub||null,this.j=a.eb||!1}N(zo,pu),zo.prototype.g=function(){return new $o(this.l,this.j)},zo.prototype.i=function(a){return function(){return a}}({});function $o(a,c){Xe.call(this),this.D=a,this.o=c,this.m=void 0,this.status=this.readyState=0,this.responseType=this.responseText=this.response=this.statusText="",this.onreadystatechange=null,this.u=new Headers,this.h=null,this.B="GET",this.A="",this.g=!1,this.v=this.j=this.l=null}N($o,Xe),t=$o.prototype,t.open=function(a,c){if(this.readyState!=0)throw this.abort(),Error("Error reopening a connection");this.B=a,this.A=c,this.readyState=1,os(this)},t.send=function(a){if(this.readyState!=1)throw this.abort(),Error("need to call open() first. ");this.g=!0;const c={headers:this.u,method:this.B,credentials:this.m,cache:void 0};a&&(c.body=a),(this.D||l).fetch(new Request(this.A,c)).then(this.Sa.bind(this),this.ga.bind(this))},t.abort=function(){this.response=this.responseText="",this.u=new Headers,this.status=0,this.j&&this.j.cancel("Request was aborted.").catch(()=>{}),1<=this.readyState&&this.g&&this.readyState!=4&&(this.g=!1,ss(this)),this.readyState=0},t.Sa=function(a){if(this.g&&(this.l=a,this.h||(this.status=this.l.status,this.statusText=this.l.statusText,this.h=a.headers,this.readyState=2,os(this)),this.g&&(this.readyState=3,os(this),this.g)))if(this.responseType==="arraybuffer")a.arrayBuffer().then(this.Qa.bind(this),this.ga.bind(this));else if(typeof l.ReadableStream<"u"&&"body"in a){if(this.j=a.body.getReader(),this.o){if(this.responseType)throw Error('responseType must be empty for "streamBinaryChunks" mode responses.');this.response=[]}else this.response=this.responseText="",this.v=new TextDecoder;Xf(this)}else a.text().then(this.Ra.bind(this),this.ga.bind(this))};function Xf(a){a.j.read().then(a.Pa.bind(a)).catch(a.ga.bind(a))}t.Pa=function(a){if(this.g){if(this.o&&a.value)this.response.push(a.value);else if(!this.o){var c=a.value?a.value:new Uint8Array(0);(c=this.v.decode(c,{stream:!a.done}))&&(this.response=this.responseText+=c)}a.done?ss(this):os(this),this.readyState==3&&Xf(this)}},t.Ra=function(a){this.g&&(this.response=this.responseText=a,ss(this))},t.Qa=function(a){this.g&&(this.response=a,ss(this))},t.ga=function(){this.g&&ss(this)};function ss(a){a.readyState=4,a.l=null,a.j=null,a.v=null,os(a)}t.setRequestHeader=function(a,c){this.u.append(a,c)},t.getResponseHeader=function(a){return this.h&&this.h.get(a.toLowerCase())||""},t.getAllResponseHeaders=function(){if(!this.h)return"";const a=[],c=this.h.entries();for(var d=c.next();!d.done;)d=d.value,a.push(d[0]+": "+d[1]),d=c.next();return a.join(`\r
`)};function os(a){a.onreadystatechange&&a.onreadystatechange.call(a)}Object.defineProperty($o.prototype,"withCredentials",{get:function(){return this.m==="include"},set:function(a){this.m=a?"include":"same-origin"}});function Jf(a){let c="";return B(a,function(d,m){c+=m,c+=":",c+=d,c+=`\r
`}),c}function Su(a,c,d){e:{for(m in d){var m=!1;break e}m=!0}m||(d=Jf(d),typeof a=="string"?d!=null&&encodeURIComponent(String(d)):ye(a,c,d))}function Re(a){Xe.call(this),this.headers=new Map,this.o=a||null,this.h=!1,this.v=this.g=null,this.D="",this.m=0,this.l="",this.j=this.B=this.u=this.A=!1,this.I=null,this.H="",this.J=!1}N(Re,Xe);var jw=/^https?$/i,Uw=["POST","PUT"];t=Re.prototype,t.Ha=function(a){this.J=a},t.ea=function(a,c,d,m){if(this.g)throw Error("[goog.net.XhrIo] Object is active with another request="+this.D+"; newUri="+a);c=c?c.toUpperCase():"GET",this.D=a,this.l="",this.m=0,this.A=!1,this.h=!0,this.g=this.o?this.o.g():yu.g(),this.v=this.o?Cf(this.o):Cf(yu),this.g.onreadystatechange=v(this.Ea,this);try{this.B=!0,this.g.open(c,String(a),!0),this.B=!1}catch(b){Zf(this,b);return}if(a=d||"",d=new Map(this.headers),m)if(Object.getPrototypeOf(m)===Object.prototype)for(var x in m)d.set(x,m[x]);else if(typeof m.keys=="function"&&typeof m.get=="function")for(const b of m.keys())d.set(b,m.get(b));else throw Error("Unknown input type for opt_headers: "+String(m));m=Array.from(d.keys()).find(b=>b.toLowerCase()=="content-type"),x=l.FormData&&a instanceof l.FormData,!(0<=Array.prototype.indexOf.call(Uw,c,void 0))||m||x||d.set("Content-Type","application/x-www-form-urlencoded;charset=utf-8");for(const[b,z]of d)this.g.setRequestHeader(b,z);this.H&&(this.g.responseType=this.H),"withCredentials"in this.g&&this.g.withCredentials!==this.J&&(this.g.withCredentials=this.J);try{np(this),this.u=!0,this.g.send(a),this.u=!1}catch(b){Zf(this,b)}};function Zf(a,c){a.h=!1,a.g&&(a.j=!0,a.g.abort(),a.j=!1),a.l=c,a.m=5,ep(a),Wo(a)}function ep(a){a.A||(a.A=!0,lt(a,"complete"),lt(a,"error"))}t.abort=function(a){this.g&&this.h&&(this.h=!1,this.j=!0,this.g.abort(),this.j=!1,this.m=a||7,lt(this,"complete"),lt(this,"abort"),Wo(this))},t.N=function(){this.g&&(this.h&&(this.h=!1,this.j=!0,this.g.abort(),this.j=!1),Wo(this,!0)),Re.aa.N.call(this)},t.Ea=function(){this.s||(this.B||this.u||this.j?tp(this):this.bb())},t.bb=function(){tp(this)};function tp(a){if(a.h&&typeof o<"u"&&(!a.v[1]||cn(a)!=4||a.Z()!=2)){if(a.u&&cn(a)==4)If(a.Ea,0,a);else if(lt(a,"readystatechange"),cn(a)==4){a.h=!1;try{const z=a.Z();e:switch(z){case 200:case 201:case 202:case 204:case 206:case 304:case 1223:var c=!0;break e;default:c=!1}var d;if(!(d=c)){var m;if(m=z===0){var x=String(a.D).match(Hf)[1]||null;!x&&l.self&&l.self.location&&(x=l.self.location.protocol.slice(0,-1)),m=!jw.test(x?x.toLowerCase():"")}d=m}if(d)lt(a,"complete"),lt(a,"success");else{a.m=6;try{var b=2<cn(a)?a.g.statusText:""}catch{b=""}a.l=b+" ["+a.Z()+"]",ep(a)}}finally{Wo(a)}}}}function Wo(a,c){if(a.g){np(a);const d=a.g,m=a.v[0]?()=>{}:null;a.g=null,a.v=null,c||lt(a,"ready");try{d.onreadystatechange=m}catch{}}}function np(a){a.I&&(l.clearTimeout(a.I),a.I=null)}t.isActive=function(){return!!this.g};function cn(a){return a.g?a.g.readyState:0}t.Z=function(){try{return 2<cn(this)?this.g.status:-1}catch{return-1}},t.oa=function(){try{return this.g?this.g.responseText:""}catch{return""}},t.Oa=function(a){if(this.g){var c=this.g.responseText;return a&&c.indexOf(a)==0&&(c=c.substring(a.length)),vw(c)}};function rp(a){try{if(!a.g)return null;if("response"in a.g)return a.g.response;switch(a.H){case"":case"text":return a.g.responseText;case"arraybuffer":if("mozResponseArrayBuffer"in a.g)return a.g.mozResponseArrayBuffer}return null}catch{return null}}function Bw(a){const c={};a=(a.g&&2<=cn(a)&&a.g.getAllResponseHeaders()||"").split(`\r
`);for(let m=0;m<a.length;m++){if(_(a[m]))continue;var d=A(a[m]);const x=d[0];if(d=d[1],typeof d!="string")continue;d=d.trim();const b=c[x]||[];c[x]=b,b.push(d)}E(c,function(m){return m.join(", ")})}t.Ba=function(){return this.m},t.Ka=function(){return typeof this.l=="string"?this.l:String(this.l)};function as(a,c,d){return d&&d.internalChannelParams&&d.internalChannelParams[a]||c}function ip(a){this.Aa=0,this.i=[],this.j=new es,this.ia=this.qa=this.I=this.W=this.g=this.ya=this.D=this.H=this.m=this.S=this.o=null,this.Ya=this.U=0,this.Va=as("failFast",!1,a),this.F=this.C=this.u=this.s=this.l=null,this.X=!0,this.za=this.T=-1,this.Y=this.v=this.B=0,this.Ta=as("baseRetryDelayMs",5e3,a),this.cb=as("retryDelaySeedMs",1e4,a),this.Wa=as("forwardChannelMaxRetries",2,a),this.wa=as("forwardChannelRequestTimeoutMs",2e4,a),this.pa=a&&a.xmlHttpFactory||void 0,this.Xa=a&&a.Tb||void 0,this.Ca=a&&a.useFetchStreams||!1,this.L=void 0,this.J=a&&a.supportsCrossDomainXhr||!1,this.K="",this.h=new jf(a&&a.concurrentRequestLimit),this.Da=new Mw,this.P=a&&a.fastHandshake||!1,this.O=a&&a.encodeInitMessageHeaders||!1,this.P&&this.O&&(this.O=!1),this.Ua=a&&a.Rb||!1,a&&a.xa&&this.j.xa(),a&&a.forceLongPolling&&(this.X=!1),this.ba=!this.P&&this.X&&a&&a.detectBufferingProxy||!1,this.ja=void 0,a&&a.longPollingTimeout&&0<a.longPollingTimeout&&(this.ja=a.longPollingTimeout),this.ca=void 0,this.R=0,this.M=!1,this.ka=this.A=null}t=ip.prototype,t.la=8,t.G=1,t.connect=function(a,c,d,m){ut(0),this.W=a,this.H=c||{},d&&m!==void 0&&(this.H.OSID=d,this.H.OAID=m),this.F=this.X,this.I=fp(this,null,this.W),qo(this)};function ku(a){if(sp(a),a.G==3){var c=a.U++,d=un(a.I);if(ye(d,"SID",a.K),ye(d,"RID",c),ye(d,"TYPE","terminate"),ls(a,d),c=new Vn(a,a.j,c),c.L=2,c.v=Bo(un(d)),d=!1,l.navigator&&l.navigator.sendBeacon)try{d=l.navigator.sendBeacon(c.v.toString(),"")}catch{}!d&&l.Image&&(new Image().src=c.v,d=!0),d||(c.g=pp(c.j,null),c.g.ea(c.v)),c.F=Date.now(),Fo(c)}dp(a)}function Ho(a){a.g&&(Cu(a),a.g.cancel(),a.g=null)}function sp(a){Ho(a),a.u&&(l.clearTimeout(a.u),a.u=null),Ko(a),a.h.cancel(),a.s&&(typeof a.s=="number"&&l.clearTimeout(a.s),a.s=null)}function qo(a){if(!Uf(a.h)&&!a.s){a.s=!0;var c=a.Ga;Pt||G(),$||(Pt(),$=!0),Y.add(c,a),a.B=0}}function zw(a,c){return Bf(a.h)>=a.h.j-(a.s?1:0)?!1:a.s?(a.i=c.D.concat(a.i),!0):a.G==1||a.G==2||a.B>=(a.Va?0:a.Wa)?!1:(a.s=Zi(v(a.Ga,a,c),hp(a,a.B)),a.B++,!0)}t.Ga=function(a){if(this.s)if(this.s=null,this.G==1){if(!a){this.U=Math.floor(1e5*Math.random()),a=this.U++;const x=new Vn(this,this.j,a);let b=this.o;if(this.S&&(b?(b=y(b),I(b,this.S)):b=this.S),this.m!==null||this.O||(x.H=b,b=null),this.P)e:{for(var c=0,d=0;d<this.i.length;d++){t:{var m=this.i[d];if("__data__"in m.map&&(m=m.map.__data__,typeof m=="string")){m=m.length;break t}m=void 0}if(m===void 0)break;if(c+=m,4096<c){c=d;break e}if(c===4096||d===this.i.length-1){c=d+1;break e}}c=1e3}else c=1e3;c=ap(this,x,c),d=un(this.I),ye(d,"RID",a),ye(d,"CVER",22),this.D&&ye(d,"X-HTTP-Session-Id",this.D),ls(this,d),b&&(this.O?c="headers="+encodeURIComponent(String(Jf(b)))+"&"+c:this.m&&Su(d,this.m,b)),Iu(this.h,x),this.Ua&&ye(d,"TYPE","init"),this.P?(ye(d,"$req",c),ye(d,"SID","null"),x.T=!0,_u(x,d,null)):_u(x,d,c),this.G=2}}else this.G==3&&(a?op(this,a):this.i.length==0||Uf(this.h)||op(this))};function op(a,c){var d;c?d=c.l:d=a.U++;const m=un(a.I);ye(m,"SID",a.K),ye(m,"RID",d),ye(m,"AID",a.T),ls(a,m),a.m&&a.o&&Su(m,a.m,a.o),d=new Vn(a,a.j,d,a.B+1),a.m===null&&(d.H=a.o),c&&(a.i=c.D.concat(a.i)),c=ap(a,d,1e3),d.I=Math.round(.5*a.wa)+Math.round(.5*a.wa*Math.random()),Iu(a.h,d),_u(d,m,c)}function ls(a,c){a.H&&B(a.H,function(d,m){ye(c,m,d)}),a.l&&Wf({},function(d,m){ye(c,m,d)})}function ap(a,c,d){d=Math.min(a.i.length,d);var m=a.l?v(a.l.Na,a.l,a):null;e:{var x=a.i;let b=-1;for(;;){const z=["count="+d];b==-1?0<d?(b=x[0].g,z.push("ofs="+b)):b=0:z.push("ofs="+b);let me=!0;for(let ze=0;ze<d;ze++){let le=x[ze].g;const Je=x[ze].map;if(le-=b,0>le)b=Math.max(0,x[ze].g-100),me=!1;else try{Fw(Je,z,"req"+le+"_")}catch{m&&m(Je)}}if(me){m=z.join("&");break e}}}return a=a.i.splice(0,d),c.D=a,m}function lp(a){if(!a.g&&!a.u){a.Y=1;var c=a.Fa;Pt||G(),$||(Pt(),$=!0),Y.add(c,a),a.v=0}}function Au(a){return a.g||a.u||3<=a.v?!1:(a.Y++,a.u=Zi(v(a.Fa,a),hp(a,a.v)),a.v++,!0)}t.Fa=function(){if(this.u=null,up(this),this.ba&&!(this.M||this.g==null||0>=this.R)){var a=2*this.R;this.j.info("BP detection timer enabled: "+a),this.A=Zi(v(this.ab,this),a)}},t.ab=function(){this.A&&(this.A=null,this.j.info("BP detection timeout reached."),this.j.info("Buffering proxy detected and switch to long-polling!"),this.F=!1,this.M=!0,ut(10),Ho(this),up(this))};function Cu(a){a.A!=null&&(l.clearTimeout(a.A),a.A=null)}function up(a){a.g=new Vn(a,a.j,"rpc",a.Y),a.m===null&&(a.g.H=a.o),a.g.O=0;var c=un(a.qa);ye(c,"RID","rpc"),ye(c,"SID",a.K),ye(c,"AID",a.T),ye(c,"CI",a.F?"0":"1"),!a.F&&a.ja&&ye(c,"TO",a.ja),ye(c,"TYPE","xmlhttp"),ls(a,c),a.m&&a.o&&Su(c,a.m,a.o),a.L&&(a.g.I=a.L);var d=a.g;a=a.ia,d.L=1,d.v=Bo(un(c)),d.m=null,d.P=!0,Lf(d,a)}t.Za=function(){this.C!=null&&(this.C=null,Ho(this),Au(this),ut(19))};function Ko(a){a.C!=null&&(l.clearTimeout(a.C),a.C=null)}function cp(a,c){var d=null;if(a.g==c){Ko(a),Cu(a),a.g=null;var m=2}else if(Tu(a.h,c))d=c.D,zf(a.h,c),m=1;else return;if(a.G!=0){if(c.o)if(m==1){d=c.m?c.m.length:0,c=Date.now()-c.F;var x=a.B;m=Oo(),lt(m,new Df(m,d)),qo(a)}else lp(a);else if(x=c.s,x==3||x==0&&0<c.X||!(m==1&&zw(a,c)||m==2&&Au(a)))switch(d&&0<d.length&&(c=a.h,c.i=c.i.concat(d)),x){case 1:wr(a,5);break;case 4:wr(a,10);break;case 3:wr(a,6);break;default:wr(a,2)}}}function hp(a,c){let d=a.Ta+Math.floor(Math.random()*a.cb);return a.isActive()||(d*=2),d*c}function wr(a,c){if(a.j.info("Error code "+c),c==2){var d=v(a.fb,a),m=a.Xa;const x=!m;m=new _r(m||"//www.google.com/images/cleardot.gif"),l.location&&l.location.protocol=="http"||jo(m,"https"),Bo(m),x?Ow(m.toString(),d):Lw(m.toString(),d)}else ut(2);a.G=0,a.l&&a.l.sa(c),dp(a),sp(a)}t.fb=function(a){a?(this.j.info("Successfully pinged google.com"),ut(2)):(this.j.info("Failed to ping google.com"),ut(1))};function dp(a){if(a.G=0,a.ka=[],a.l){const c=$f(a.h);(c.length!=0||a.i.length!=0)&&(V(a.ka,c),V(a.ka,a.i),a.h.i.length=0,D(a.i),a.i.length=0),a.l.ra()}}function fp(a,c,d){var m=d instanceof _r?un(d):new _r(d);if(m.g!="")c&&(m.g=c+"."+m.g),Uo(m,m.s);else{var x=l.location;m=x.protocol,c=c?c+"."+x.hostname:x.hostname,x=+x.port;var b=new _r(null);m&&jo(b,m),c&&(b.g=c),x&&Uo(b,x),d&&(b.l=d),m=b}return d=a.D,c=a.ya,d&&c&&ye(m,d,c),ye(m,"VER",a.la),ls(a,m),m}function pp(a,c,d){if(c&&!a.J)throw Error("Can't create secondary domain capable XhrIo object.");return c=a.Ca&&!a.pa?new Re(new zo({eb:d})):new Re(a.pa),c.Ha(a.J),c}t.isActive=function(){return!!this.l&&this.l.isActive(this)};function mp(){}t=mp.prototype,t.ua=function(){},t.ta=function(){},t.sa=function(){},t.ra=function(){},t.isActive=function(){return!0},t.Na=function(){};function Go(){}Go.prototype.g=function(a,c){return new wt(a,c)};function wt(a,c){Xe.call(this),this.g=new ip(c),this.l=a,this.h=c&&c.messageUrlParams||null,a=c&&c.messageHeaders||null,c&&c.clientProtocolHeaderRequired&&(a?a["X-Client-Protocol"]="webchannel":a={"X-Client-Protocol":"webchannel"}),this.g.o=a,a=c&&c.initMessageHeaders||null,c&&c.messageContentType&&(a?a["X-WebChannel-Content-Type"]=c.messageContentType:a={"X-WebChannel-Content-Type":c.messageContentType}),c&&c.va&&(a?a["X-WebChannel-Client-Profile"]=c.va:a={"X-WebChannel-Client-Profile":c.va}),this.g.S=a,(a=c&&c.Sb)&&!_(a)&&(this.g.m=a),this.v=c&&c.supportsCrossDomainXhr||!1,this.u=c&&c.sendRawJson||!1,(c=c&&c.httpSessionIdParam)&&!_(c)&&(this.g.D=c,a=this.h,a!==null&&c in a&&(a=this.h,c in a&&delete a[c])),this.j=new Yr(this)}N(wt,Xe),wt.prototype.m=function(){this.g.l=this.j,this.v&&(this.g.J=!0),this.g.connect(this.l,this.h||void 0)},wt.prototype.close=function(){ku(this.g)},wt.prototype.o=function(a){var c=this.g;if(typeof a=="string"){var d={};d.__data__=a,a=d}else this.u&&(d={},d.__data__=fu(a),a=d);c.i.push(new kw(c.Ya++,a)),c.G==3&&qo(c)},wt.prototype.N=function(){this.g.l=null,delete this.j,ku(this.g),delete this.g,wt.aa.N.call(this)};function gp(a){mu.call(this),a.__headers__&&(this.headers=a.__headers__,this.statusCode=a.__status__,delete a.__headers__,delete a.__status__);var c=a.__sm__;if(c){e:{for(const d in c){a=d;break e}a=void 0}(this.i=a)&&(a=this.i,c=c!==null&&a in c?c[a]:void 0),this.data=c}else this.data=a}N(gp,mu);function yp(){gu.call(this),this.status=1}N(yp,gu);function Yr(a){this.g=a}N(Yr,mp),Yr.prototype.ua=function(){lt(this.g,"a")},Yr.prototype.ta=function(a){lt(this.g,new gp(a))},Yr.prototype.sa=function(a){lt(this.g,new yp)},Yr.prototype.ra=function(){lt(this.g,"b")},Go.prototype.createWebChannel=Go.prototype.g,wt.prototype.send=wt.prototype.o,wt.prototype.open=wt.prototype.m,wt.prototype.close=wt.prototype.close,X_=function(){return new Go},Y_=function(){return Oo()},Q_=yr,_h={mb:0,pb:1,qb:2,Jb:3,Ob:4,Lb:5,Mb:6,Kb:7,Ib:8,Nb:9,PROXY:10,NOPROXY:11,Gb:12,Cb:13,Db:14,Bb:15,Eb:16,Fb:17,ib:18,hb:19,jb:20},Lo.NO_ERROR=0,Lo.TIMEOUT=8,Lo.HTTP_ERROR=6,La=Lo,Vf.COMPLETE="complete",G_=Vf,Rf.EventType=Xi,Xi.OPEN="a",Xi.CLOSE="b",Xi.ERROR="c",Xi.MESSAGE="d",Xe.prototype.listen=Xe.prototype.K,Is=Rf,Re.prototype.listenOnce=Re.prototype.L,Re.prototype.getLastError=Re.prototype.Ka,Re.prototype.getLastErrorCode=Re.prototype.Ba,Re.prototype.getStatus=Re.prototype.Z,Re.prototype.getResponseJson=Re.prototype.Oa,Re.prototype.getResponseText=Re.prototype.oa,Re.prototype.send=Re.prototype.ea,Re.prototype.setWithCredentials=Re.prototype.Ha,K_=Re}).apply(typeof pa<"u"?pa:typeof self<"u"?self:typeof window<"u"?window:{});const tg="@firebase/firestore";/**
 * @license
 * Copyright 2017 Google LLC
 *
 * Licensed under the Apache License, Version 2.0 (the "License");
 * you may not use this file except in compliance with the License.
 * You may obtain a copy of the License at
 *
 *   http://www.apache.org/licenses/LICENSE-2.0
 *
 * Unless required by applicable law or agreed to in writing, software
 * distributed under the License is distributed on an "AS IS" BASIS,
 * WITHOUT WARRANTIES OR CONDITIONS OF ANY KIND, either express or implied.
 * See the License for the specific language governing permissions and
 * limitations under the License.
 */class rt{constructor(e){this.uid=e}isAuthenticated(){return this.uid!=null}toKey(){return this.isAuthenticated()?"uid:"+this.uid:"anonymous-user"}isEqual(e){return e.uid===this.uid}}rt.UNAUTHENTICATED=new rt(null),rt.GOOGLE_CREDENTIALS=new rt("google-credentials-uid"),rt.FIRST_PARTY=new rt("first-party-uid"),rt.MOCK_USER=new rt("mock-user");/**
 * @license
 * Copyright 2017 Google LLC
 *
 * Licensed under the Apache License, Version 2.0 (the "License");
 * you may not use this file except in compliance with the License.
 * You may obtain a copy of the License at
 *
 *   http://www.apache.org/licenses/LICENSE-2.0
 *
 * Unless required by applicable law or agreed to in writing, software
 * distributed under the License is distributed on an "AS IS" BASIS,
 * WITHOUT WARRANTIES OR CONDITIONS OF ANY KIND, either express or implied.
 * See the License for the specific language governing permissions and
 * limitations under the License.
 */let qi="10.14.0";/**
 * @license
 * Copyright 2017 Google LLC
 *
 * Licensed under the Apache License, Version 2.0 (the "License");
 * you may not use this file except in compliance with the License.
 * You may obtain a copy of the License at
 *
 *   http://www.apache.org/licenses/LICENSE-2.0
 *
 * Unless required by applicable law or agreed to in writing, software
 * distributed under the License is distributed on an "AS IS" BASIS,
 * WITHOUT WARRANTIES OR CONDITIONS OF ANY KIND, either express or implied.
 * See the License for the specific language governing permissions and
 * limitations under the License.
 */const Br=new Nd("@firebase/firestore");function ys(){return Br.logLevel}function H(t,...e){if(Br.logLevel<=se.DEBUG){const n=e.map($d);Br.debug(`Firestore (${qi}): ${t}`,...n)}}function Pn(t,...e){if(Br.logLevel<=se.ERROR){const n=e.map($d);Br.error(`Firestore (${qi}): ${t}`,...n)}}function Vi(t,...e){if(Br.logLevel<=se.WARN){const n=e.map($d);Br.warn(`Firestore (${qi}): ${t}`,...n)}}function $d(t){if(typeof t=="string")return t;try{/**
* @license
* Copyright 2020 Google LLC
*
* Licensed under the Apache License, Version 2.0 (the "License");
* you may not use this file except in compliance with the License.
* You may obtain a copy of the License at
*
*   http://www.apache.org/licenses/LICENSE-2.0
*
* Unless required by applicable law or agreed to in writing, software
* distributed under the License is distributed on an "AS IS" BASIS,
* WITHOUT WARRANTIES OR CONDITIONS OF ANY KIND, either express or implied.
* See the License for the specific language governing permissions and
* limitations under the License.
*/return function(n){return JSON.stringify(n)}(t)}catch{return t}}/**
 * @license
 * Copyright 2017 Google LLC
 *
 * Licensed under the Apache License, Version 2.0 (the "License");
 * you may not use this file except in compliance with the License.
 * You may obtain a copy of the License at
 *
 *   http://www.apache.org/licenses/LICENSE-2.0
 *
 * Unless required by applicable law or agreed to in writing, software
 * distributed under the License is distributed on an "AS IS" BASIS,
 * WITHOUT WARRANTIES OR CONDITIONS OF ANY KIND, either express or implied.
 * See the License for the specific language governing permissions and
 * limitations under the License.
 */function J(t="Unexpected state"){const e=`FIRESTORE (${qi}) INTERNAL ASSERTION FAILED: `+t;throw Pn(e),new Error(e)}function pe(t,e){t||J()}function ee(t,e){return t}/**
 * @license
 * Copyright 2017 Google LLC
 *
 * Licensed under the Apache License, Version 2.0 (the "License");
 * you may not use this file except in compliance with the License.
 * You may obtain a copy of the License at
 *
 *   http://www.apache.org/licenses/LICENSE-2.0
 *
 * Unless required by applicable law or agreed to in writing, software
 * distributed under the License is distributed on an "AS IS" BASIS,
 * WITHOUT WARRANTIES OR CONDITIONS OF ANY KIND, either express or implied.
 * See the License for the specific language governing permissions and
 * limitations under the License.
 */const M={OK:"ok",CANCELLED:"cancelled",UNKNOWN:"unknown",INVALID_ARGUMENT:"invalid-argument",DEADLINE_EXCEEDED:"deadline-exceeded",NOT_FOUND:"not-found",ALREADY_EXISTS:"already-exists",PERMISSION_DENIED:"permission-denied",UNAUTHENTICATED:"unauthenticated",RESOURCE_EXHAUSTED:"resource-exhausted",FAILED_PRECONDITION:"failed-precondition",ABORTED:"aborted",OUT_OF_RANGE:"out-of-range",UNIMPLEMENTED:"unimplemented",INTERNAL:"internal",UNAVAILABLE:"unavailable",DATA_LOSS:"data-loss"};class q extends Dn{constructor(e,n){super(e,n),this.code=e,this.message=n,this.toString=()=>`${this.name}: [code=${this.code}]: ${this.message}`}}/**
 * @license
 * Copyright 2017 Google LLC
 *
 * Licensed under the Apache License, Version 2.0 (the "License");
 * you may not use this file except in compliance with the License.
 * You may obtain a copy of the License at
 *
 *   http://www.apache.org/licenses/LICENSE-2.0
 *
 * Unless required by applicable law or agreed to in writing, software
 * distributed under the License is distributed on an "AS IS" BASIS,
 * WITHOUT WARRANTIES OR CONDITIONS OF ANY KIND, either express or implied.
 * See the License for the specific language governing permissions and
 * limitations under the License.
 */class Nr{constructor(){this.promise=new Promise((e,n)=>{this.resolve=e,this.reject=n})}}/**
 * @license
 * Copyright 2017 Google LLC
 *
 * Licensed under the Apache License, Version 2.0 (the "License");
 * you may not use this file except in compliance with the License.
 * You may obtain a copy of the License at
 *
 *   http://www.apache.org/licenses/LICENSE-2.0
 *
 * Unless required by applicable law or agreed to in writing, software
 * distributed under the License is distributed on an "AS IS" BASIS,
 * WITHOUT WARRANTIES OR CONDITIONS OF ANY KIND, either express or implied.
 * See the License for the specific language governing permissions and
 * limitations under the License.
 */class J_{constructor(e,n){this.user=n,this.type="OAuth",this.headers=new Map,this.headers.set("Authorization",`Bearer ${e}`)}}class fA{getToken(){return Promise.resolve(null)}invalidateToken(){}start(e,n){e.enqueueRetryable(()=>n(rt.UNAUTHENTICATED))}shutdown(){}}class pA{constructor(e){this.token=e,this.changeListener=null}getToken(){return Promise.resolve(this.token)}invalidateToken(){}start(e,n){this.changeListener=n,e.enqueueRetryable(()=>n(this.token.user))}shutdown(){this.changeListener=null}}class mA{constructor(e){this.t=e,this.currentUser=rt.UNAUTHENTICATED,this.i=0,this.forceRefresh=!1,this.auth=null}start(e,n){pe(this.o===void 0);let r=this.i;const i=u=>this.i!==r?(r=this.i,n(u)):Promise.resolve();let s=new Nr;this.o=()=>{this.i++,this.currentUser=this.u(),s.resolve(),s=new Nr,e.enqueueRetryable(()=>i(this.currentUser))};const o=()=>{const u=s;e.enqueueRetryable(async()=>{await u.promise,await i(this.currentUser)})},l=u=>{H("FirebaseAuthCredentialsProvider","Auth detected"),this.auth=u,this.o&&(this.auth.addAuthTokenListener(this.o),o())};this.t.onInit(u=>l(u)),setTimeout(()=>{if(!this.auth){const u=this.t.getImmediate({optional:!0});u?l(u):(H("FirebaseAuthCredentialsProvider","Auth not yet detected"),s.resolve(),s=new Nr)}},0),o()}getToken(){const e=this.i,n=this.forceRefresh;return this.forceRefresh=!1,this.auth?this.auth.getToken(n).then(r=>this.i!==e?(H("FirebaseAuthCredentialsProvider","getToken aborted due to token change."),this.getToken()):r?(pe(typeof r.accessToken=="string"),new J_(r.accessToken,this.currentUser)):null):Promise.resolve(null)}invalidateToken(){this.forceRefresh=!0}shutdown(){this.auth&&this.o&&this.auth.removeAuthTokenListener(this.o),this.o=void 0}u(){const e=this.auth&&this.auth.getUid();return pe(e===null||typeof e=="string"),new rt(e)}}class gA{constructor(e,n,r){this.l=e,this.h=n,this.P=r,this.type="FirstParty",this.user=rt.FIRST_PARTY,this.I=new Map}T(){return this.P?this.P():null}get headers(){this.I.set("X-Goog-AuthUser",this.l);const e=this.T();return e&&this.I.set("Authorization",e),this.h&&this.I.set("X-Goog-Iam-Authorization-Token",this.h),this.I}}class yA{constructor(e,n,r){this.l=e,this.h=n,this.P=r}getToken(){return Promise.resolve(new gA(this.l,this.h,this.P))}start(e,n){e.enqueueRetryable(()=>n(rt.FIRST_PARTY))}shutdown(){}invalidateToken(){}}class vA{constructor(e){this.value=e,this.type="AppCheck",this.headers=new Map,e&&e.length>0&&this.headers.set("x-firebase-appcheck",this.value)}}class _A{constructor(e){this.A=e,this.forceRefresh=!1,this.appCheck=null,this.R=null}start(e,n){pe(this.o===void 0);const r=s=>{s.error!=null&&H("FirebaseAppCheckTokenProvider",`Error getting App Check token; using placeholder token instead. Error: ${s.error.message}`);const o=s.token!==this.R;return this.R=s.token,H("FirebaseAppCheckTokenProvider",`Received ${o?"new":"existing"} token.`),o?n(s.token):Promise.resolve()};this.o=s=>{e.enqueueRetryable(()=>r(s))};const i=s=>{H("FirebaseAppCheckTokenProvider","AppCheck detected"),this.appCheck=s,this.o&&this.appCheck.addTokenListener(this.o)};this.A.onInit(s=>i(s)),setTimeout(()=>{if(!this.appCheck){const s=this.A.getImmediate({optional:!0});s?i(s):H("FirebaseAppCheckTokenProvider","AppCheck not yet detected")}},0)}getToken(){const e=this.forceRefresh;return this.forceRefresh=!1,this.appCheck?this.appCheck.getToken(e).then(n=>n?(pe(typeof n.token=="string"),this.R=n.token,new vA(n.token)):null):Promise.resolve(null)}invalidateToken(){this.forceRefresh=!0}shutdown(){this.appCheck&&this.o&&this.appCheck.removeTokenListener(this.o),this.o=void 0}}/**
 * @license
 * Copyright 2020 Google LLC
 *
 * Licensed under the Apache License, Version 2.0 (the "License");
 * you may not use this file except in compliance with the License.
 * You may obtain a copy of the License at
 *
 *   http://www.apache.org/licenses/LICENSE-2.0
 *
 * Unless required by applicable law or agreed to in writing, software
 * distributed under the License is distributed on an "AS IS" BASIS,
 * WITHOUT WARRANTIES OR CONDITIONS OF ANY KIND, either express or implied.
 * See the License for the specific language governing permissions and
 * limitations under the License.
 */function wA(t){const e=typeof self<"u"&&(self.crypto||self.msCrypto),n=new Uint8Array(t);if(e&&typeof e.getRandomValues=="function")e.getRandomValues(n);else for(let r=0;r<t;r++)n[r]=Math.floor(256*Math.random());return n}/**
 * @license
 * Copyright 2017 Google LLC
 *
 * Licensed under the Apache License, Version 2.0 (the "License");
 * you may not use this file except in compliance with the License.
 * You may obtain a copy of the License at
 *
 *   http://www.apache.org/licenses/LICENSE-2.0
 *
 * Unless required by applicable law or agreed to in writing, software
 * distributed under the License is distributed on an "AS IS" BASIS,
 * WITHOUT WARRANTIES OR CONDITIONS OF ANY KIND, either express or implied.
 * See the License for the specific language governing permissions and
 * limitations under the License.
 */class Z_{static newId(){const e="ABCDEFGHIJKLMNOPQRSTUVWXYZabcdefghijklmnopqrstuvwxyz0123456789",n=Math.floor(256/e.length)*e.length;let r="";for(;r.length<20;){const i=wA(40);for(let s=0;s<i.length;++s)r.length<20&&i[s]<n&&(r+=e.charAt(i[s]%e.length))}return r}}function ue(t,e){return t<e?-1:t>e?1:0}function bi(t,e,n){return t.length===e.length&&t.every((r,i)=>n(r,e[i]))}/**
 * @license
 * Copyright 2017 Google LLC
 *
 * Licensed under the Apache License, Version 2.0 (the "License");
 * you may not use this file except in compliance with the License.
 * You may obtain a copy of the License at
 *
 *   http://www.apache.org/licenses/LICENSE-2.0
 *
 * Unless required by applicable law or agreed to in writing, software
 * distributed under the License is distributed on an "AS IS" BASIS,
 * WITHOUT WARRANTIES OR CONDITIONS OF ANY KIND, either express or implied.
 * See the License for the specific language governing permissions and
 * limitations under the License.
 */class Me{constructor(e,n){if(this.seconds=e,this.nanoseconds=n,n<0)throw new q(M.INVALID_ARGUMENT,"Timestamp nanoseconds out of range: "+n);if(n>=1e9)throw new q(M.INVALID_ARGUMENT,"Timestamp nanoseconds out of range: "+n);if(e<-62135596800)throw new q(M.INVALID_ARGUMENT,"Timestamp seconds out of range: "+e);if(e>=253402300800)throw new q(M.INVALID_ARGUMENT,"Timestamp seconds out of range: "+e)}static now(){return Me.fromMillis(Date.now())}static fromDate(e){return Me.fromMillis(e.getTime())}static fromMillis(e){const n=Math.floor(e/1e3),r=Math.floor(1e6*(e-1e3*n));return new Me(n,r)}toDate(){return new Date(this.toMillis())}toMillis(){return 1e3*this.seconds+this.nanoseconds/1e6}_compareTo(e){return this.seconds===e.seconds?ue(this.nanoseconds,e.nanoseconds):ue(this.seconds,e.seconds)}isEqual(e){return e.seconds===this.seconds&&e.nanoseconds===this.nanoseconds}toString(){return"Timestamp(seconds="+this.seconds+", nanoseconds="+this.nanoseconds+")"}toJSON(){return{seconds:this.seconds,nanoseconds:this.nanoseconds}}valueOf(){const e=this.seconds- -62135596800;return String(e).padStart(12,"0")+"."+String(this.nanoseconds).padStart(9,"0")}}/**
 * @license
 * Copyright 2017 Google LLC
 *
 * Licensed under the Apache License, Version 2.0 (the "License");
 * you may not use this file except in compliance with the License.
 * You may obtain a copy of the License at
 *
 *   http://www.apache.org/licenses/LICENSE-2.0
 *
 * Unless required by applicable law or agreed to in writing, software
 * distributed under the License is distributed on an "AS IS" BASIS,
 * WITHOUT WARRANTIES OR CONDITIONS OF ANY KIND, either express or implied.
 * See the License for the specific language governing permissions and
 * limitations under the License.
 */class Z{constructor(e){this.timestamp=e}static fromTimestamp(e){return new Z(e)}static min(){return new Z(new Me(0,0))}static max(){return new Z(new Me(253402300799,999999999))}compareTo(e){return this.timestamp._compareTo(e.timestamp)}isEqual(e){return this.timestamp.isEqual(e.timestamp)}toMicroseconds(){return 1e6*this.timestamp.seconds+this.timestamp.nanoseconds/1e3}toString(){return"SnapshotVersion("+this.timestamp.toString()+")"}toTimestamp(){return this.timestamp}}/**
 * @license
 * Copyright 2017 Google LLC
 *
 * Licensed under the Apache License, Version 2.0 (the "License");
 * you may not use this file except in compliance with the License.
 * You may obtain a copy of the License at
 *
 *   http://www.apache.org/licenses/LICENSE-2.0
 *
 * Unless required by applicable law or agreed to in writing, software
 * distributed under the License is distributed on an "AS IS" BASIS,
 * WITHOUT WARRANTIES OR CONDITIONS OF ANY KIND, either express or implied.
 * See the License for the specific language governing permissions and
 * limitations under the License.
 */class ao{constructor(e,n,r){n===void 0?n=0:n>e.length&&J(),r===void 0?r=e.length-n:r>e.length-n&&J(),this.segments=e,this.offset=n,this.len=r}get length(){return this.len}isEqual(e){return ao.comparator(this,e)===0}child(e){const n=this.segments.slice(this.offset,this.limit());return e instanceof ao?e.forEach(r=>{n.push(r)}):n.push(e),this.construct(n)}limit(){return this.offset+this.length}popFirst(e){return e=e===void 0?1:e,this.construct(this.segments,this.offset+e,this.length-e)}popLast(){return this.construct(this.segments,this.offset,this.length-1)}firstSegment(){return this.segments[this.offset]}lastSegment(){return this.get(this.length-1)}get(e){return this.segments[this.offset+e]}isEmpty(){return this.length===0}isPrefixOf(e){if(e.length<this.length)return!1;for(let n=0;n<this.length;n++)if(this.get(n)!==e.get(n))return!1;return!0}isImmediateParentOf(e){if(this.length+1!==e.length)return!1;for(let n=0;n<this.length;n++)if(this.get(n)!==e.get(n))return!1;return!0}forEach(e){for(let n=this.offset,r=this.limit();n<r;n++)e(this.segments[n])}toArray(){return this.segments.slice(this.offset,this.limit())}static comparator(e,n){const r=Math.min(e.length,n.length);for(let i=0;i<r;i++){const s=e.get(i),o=n.get(i);if(s<o)return-1;if(s>o)return 1}return e.length<n.length?-1:e.length>n.length?1:0}}class Te extends ao{construct(e,n,r){return new Te(e,n,r)}canonicalString(){return this.toArray().join("/")}toString(){return this.canonicalString()}toUriEncodedString(){return this.toArray().map(encodeURIComponent).join("/")}static fromString(...e){const n=[];for(const r of e){if(r.indexOf("//")>=0)throw new q(M.INVALID_ARGUMENT,`Invalid segment (${r}). Paths must not contain // in them.`);n.push(...r.split("/").filter(i=>i.length>0))}return new Te(n)}static emptyPath(){return new Te([])}}const EA=/^[_a-zA-Z][_a-zA-Z0-9]*$/;class He extends ao{construct(e,n,r){return new He(e,n,r)}static isValidIdentifier(e){return EA.test(e)}canonicalString(){return this.toArray().map(e=>(e=e.replace(/\\/g,"\\\\").replace(/`/g,"\\`"),He.isValidIdentifier(e)||(e="`"+e+"`"),e)).join(".")}toString(){return this.canonicalString()}isKeyField(){return this.length===1&&this.get(0)==="__name__"}static keyField(){return new He(["__name__"])}static fromServerFormat(e){const n=[];let r="",i=0;const s=()=>{if(r.length===0)throw new q(M.INVALID_ARGUMENT,`Invalid field path (${e}). Paths must not be empty, begin with '.', end with '.', or contain '..'`);n.push(r),r=""};let o=!1;for(;i<e.length;){const l=e[i];if(l==="\\"){if(i+1===e.length)throw new q(M.INVALID_ARGUMENT,"Path has trailing escape character: "+e);const u=e[i+1];if(u!=="\\"&&u!=="."&&u!=="`")throw new q(M.INVALID_ARGUMENT,"Path has invalid escape sequence: "+e);r+=u,i+=2}else l==="`"?(o=!o,i++):l!=="."||o?(r+=l,i++):(s(),i++)}if(s(),o)throw new q(M.INVALID_ARGUMENT,"Unterminated ` in path: "+e);return new He(n)}static emptyPath(){return new He([])}}/**
 * @license
 * Copyright 2017 Google LLC
 *
 * Licensed under the Apache License, Version 2.0 (the "License");
 * you may not use this file except in compliance with the License.
 * You may obtain a copy of the License at
 *
 *   http://www.apache.org/licenses/LICENSE-2.0
 *
 * Unless required by applicable law or agreed to in writing, software
 * distributed under the License is distributed on an "AS IS" BASIS,
 * WITHOUT WARRANTIES OR CONDITIONS OF ANY KIND, either express or implied.
 * See the License for the specific language governing permissions and
 * limitations under the License.
 */class K{constructor(e){this.path=e}static fromPath(e){return new K(Te.fromString(e))}static fromName(e){return new K(Te.fromString(e).popFirst(5))}static empty(){return new K(Te.emptyPath())}get collectionGroup(){return this.path.popLast().lastSegment()}hasCollectionId(e){return this.path.length>=2&&this.path.get(this.path.length-2)===e}getCollectionGroup(){return this.path.get(this.path.length-2)}getCollectionPath(){return this.path.popLast()}isEqual(e){return e!==null&&Te.comparator(this.path,e.path)===0}toString(){return this.path.toString()}static comparator(e,n){return Te.comparator(e.path,n.path)}static isDocumentKey(e){return e.length%2==0}static fromSegments(e){return new K(new Te(e.slice()))}}function TA(t,e){const n=t.toTimestamp().seconds,r=t.toTimestamp().nanoseconds+1,i=Z.fromTimestamp(r===1e9?new Me(n+1,0):new Me(n,r));return new cr(i,K.empty(),e)}function IA(t){return new cr(t.readTime,t.key,-1)}class cr{constructor(e,n,r){this.readTime=e,this.documentKey=n,this.largestBatchId=r}static min(){return new cr(Z.min(),K.empty(),-1)}static max(){return new cr(Z.max(),K.empty(),-1)}}function SA(t,e){let n=t.readTime.compareTo(e.readTime);return n!==0?n:(n=K.comparator(t.documentKey,e.documentKey),n!==0?n:ue(t.largestBatchId,e.largestBatchId))}/**
 * @license
 * Copyright 2020 Google LLC
 *
 * Licensed under the Apache License, Version 2.0 (the "License");
 * you may not use this file except in compliance with the License.
 * You may obtain a copy of the License at
 *
 *   http://www.apache.org/licenses/LICENSE-2.0
 *
 * Unless required by applicable law or agreed to in writing, software
 * distributed under the License is distributed on an "AS IS" BASIS,
 * WITHOUT WARRANTIES OR CONDITIONS OF ANY KIND, either express or implied.
 * See the License for the specific language governing permissions and
 * limitations under the License.
 */const kA="The current tab is not in the required state to perform this operation. It might be necessary to refresh the browser tab.";class AA{constructor(){this.onCommittedListeners=[]}addOnCommittedListener(e){this.onCommittedListeners.push(e)}raiseOnCommittedEvent(){this.onCommittedListeners.forEach(e=>e())}}/**
 * @license
 * Copyright 2017 Google LLC
 *
 * Licensed under the Apache License, Version 2.0 (the "License");
 * you may not use this file except in compliance with the License.
 * You may obtain a copy of the License at
 *
 *   http://www.apache.org/licenses/LICENSE-2.0
 *
 * Unless required by applicable law or agreed to in writing, software
 * distributed under the License is distributed on an "AS IS" BASIS,
 * WITHOUT WARRANTIES OR CONDITIONS OF ANY KIND, either express or implied.
 * See the License for the specific language governing permissions and
 * limitations under the License.
 */async function Ro(t){if(t.code!==M.FAILED_PRECONDITION||t.message!==kA)throw t;H("LocalStore","Unexpectedly lost primary lease")}/**
 * @license
 * Copyright 2017 Google LLC
 *
 * Licensed under the Apache License, Version 2.0 (the "License");
 * you may not use this file except in compliance with the License.
 * You may obtain a copy of the License at
 *
 *   http://www.apache.org/licenses/LICENSE-2.0
 *
 * Unless required by applicable law or agreed to in writing, software
 * distributed under the License is distributed on an "AS IS" BASIS,
 * WITHOUT WARRANTIES OR CONDITIONS OF ANY KIND, either express or implied.
 * See the License for the specific language governing permissions and
 * limitations under the License.
 */class L{constructor(e){this.nextCallback=null,this.catchCallback=null,this.result=void 0,this.error=void 0,this.isDone=!1,this.callbackAttached=!1,e(n=>{this.isDone=!0,this.result=n,this.nextCallback&&this.nextCallback(n)},n=>{this.isDone=!0,this.error=n,this.catchCallback&&this.catchCallback(n)})}catch(e){return this.next(void 0,e)}next(e,n){return this.callbackAttached&&J(),this.callbackAttached=!0,this.isDone?this.error?this.wrapFailure(n,this.error):this.wrapSuccess(e,this.result):new L((r,i)=>{this.nextCallback=s=>{this.wrapSuccess(e,s).next(r,i)},this.catchCallback=s=>{this.wrapFailure(n,s).next(r,i)}})}toPromise(){return new Promise((e,n)=>{this.next(e,n)})}wrapUserFunction(e){try{const n=e();return n instanceof L?n:L.resolve(n)}catch(n){return L.reject(n)}}wrapSuccess(e,n){return e?this.wrapUserFunction(()=>e(n)):L.resolve(n)}wrapFailure(e,n){return e?this.wrapUserFunction(()=>e(n)):L.reject(n)}static resolve(e){return new L((n,r)=>{n(e)})}static reject(e){return new L((n,r)=>{r(e)})}static waitFor(e){return new L((n,r)=>{let i=0,s=0,o=!1;e.forEach(l=>{++i,l.next(()=>{++s,o&&s===i&&n()},u=>r(u))}),o=!0,s===i&&n()})}static or(e){let n=L.resolve(!1);for(const r of e)n=n.next(i=>i?L.resolve(i):r());return n}static forEach(e,n){const r=[];return e.forEach((i,s)=>{r.push(n.call(this,i,s))}),this.waitFor(r)}static mapArray(e,n){return new L((r,i)=>{const s=e.length,o=new Array(s);let l=0;for(let u=0;u<s;u++){const h=u;n(e[h]).next(f=>{o[h]=f,++l,l===s&&r(o)},f=>i(f))}})}static doWhile(e,n){return new L((r,i)=>{const s=()=>{e()===!0?n().next(()=>{s()},i):r()};s()})}}function CA(t){const e=t.match(/Android ([\d.]+)/i),n=e?e[1].split(".").slice(0,2).join("."):"-1";return Number(n)}function Po(t){return t.name==="IndexedDbTransactionError"}/**
 * @license
 * Copyright 2018 Google LLC
 *
 * Licensed under the Apache License, Version 2.0 (the "License");
 * you may not use this file except in compliance with the License.
 * You may obtain a copy of the License at
 *
 *   http://www.apache.org/licenses/LICENSE-2.0
 *
 * Unless required by applicable law or agreed to in writing, software
 * distributed under the License is distributed on an "AS IS" BASIS,
 * WITHOUT WARRANTIES OR CONDITIONS OF ANY KIND, either express or implied.
 * See the License for the specific language governing permissions and
 * limitations under the License.
 */class Wd{constructor(e,n){this.previousValue=e,n&&(n.sequenceNumberHandler=r=>this.ie(r),this.se=r=>n.writeSequenceNumber(r))}ie(e){return this.previousValue=Math.max(e,this.previousValue),this.previousValue}next(){const e=++this.previousValue;return this.se&&this.se(e),e}}Wd.oe=-1;function Gl(t){return t==null}function wl(t){return t===0&&1/t==-1/0}function RA(t){return typeof t=="number"&&Number.isInteger(t)&&!wl(t)&&t<=Number.MAX_SAFE_INTEGER&&t>=Number.MIN_SAFE_INTEGER}/**
 * @license
 * Copyright 2017 Google LLC
 *
 * Licensed under the Apache License, Version 2.0 (the "License");
 * you may not use this file except in compliance with the License.
 * You may obtain a copy of the License at
 *
 *   http://www.apache.org/licenses/LICENSE-2.0
 *
 * Unless required by applicable law or agreed to in writing, software
 * distributed under the License is distributed on an "AS IS" BASIS,
 * WITHOUT WARRANTIES OR CONDITIONS OF ANY KIND, either express or implied.
 * See the License for the specific language governing permissions and
 * limitations under the License.
 */function ng(t){let e=0;for(const n in t)Object.prototype.hasOwnProperty.call(t,n)&&e++;return e}function Ki(t,e){for(const n in t)Object.prototype.hasOwnProperty.call(t,n)&&e(n,t[n])}function e0(t){for(const e in t)if(Object.prototype.hasOwnProperty.call(t,e))return!1;return!0}/**
 * @license
 * Copyright 2017 Google LLC
 *
 * Licensed under the Apache License, Version 2.0 (the "License");
 * you may not use this file except in compliance with the License.
 * You may obtain a copy of the License at
 *
 *   http://www.apache.org/licenses/LICENSE-2.0
 *
 * Unless required by applicable law or agreed to in writing, software
 * distributed under the License is distributed on an "AS IS" BASIS,
 * WITHOUT WARRANTIES OR CONDITIONS OF ANY KIND, either express or implied.
 * See the License for the specific language governing permissions and
 * limitations under the License.
 */class Ce{constructor(e,n){this.comparator=e,this.root=n||We.EMPTY}insert(e,n){return new Ce(this.comparator,this.root.insert(e,n,this.comparator).copy(null,null,We.BLACK,null,null))}remove(e){return new Ce(this.comparator,this.root.remove(e,this.comparator).copy(null,null,We.BLACK,null,null))}get(e){let n=this.root;for(;!n.isEmpty();){const r=this.comparator(e,n.key);if(r===0)return n.value;r<0?n=n.left:r>0&&(n=n.right)}return null}indexOf(e){let n=0,r=this.root;for(;!r.isEmpty();){const i=this.comparator(e,r.key);if(i===0)return n+r.left.size;i<0?r=r.left:(n+=r.left.size+1,r=r.right)}return-1}isEmpty(){return this.root.isEmpty()}get size(){return this.root.size}minKey(){return this.root.minKey()}maxKey(){return this.root.maxKey()}inorderTraversal(e){return this.root.inorderTraversal(e)}forEach(e){this.inorderTraversal((n,r)=>(e(n,r),!1))}toString(){const e=[];return this.inorderTraversal((n,r)=>(e.push(`${n}:${r}`),!1)),`{${e.join(", ")}}`}reverseTraversal(e){return this.root.reverseTraversal(e)}getIterator(){return new ma(this.root,null,this.comparator,!1)}getIteratorFrom(e){return new ma(this.root,e,this.comparator,!1)}getReverseIterator(){return new ma(this.root,null,this.comparator,!0)}getReverseIteratorFrom(e){return new ma(this.root,e,this.comparator,!0)}}class ma{constructor(e,n,r,i){this.isReverse=i,this.nodeStack=[];let s=1;for(;!e.isEmpty();)if(s=n?r(e.key,n):1,n&&i&&(s*=-1),s<0)e=this.isReverse?e.left:e.right;else{if(s===0){this.nodeStack.push(e);break}this.nodeStack.push(e),e=this.isReverse?e.right:e.left}}getNext(){let e=this.nodeStack.pop();const n={key:e.key,value:e.value};if(this.isReverse)for(e=e.left;!e.isEmpty();)this.nodeStack.push(e),e=e.right;else for(e=e.right;!e.isEmpty();)this.nodeStack.push(e),e=e.left;return n}hasNext(){return this.nodeStack.length>0}peek(){if(this.nodeStack.length===0)return null;const e=this.nodeStack[this.nodeStack.length-1];return{key:e.key,value:e.value}}}class We{constructor(e,n,r,i,s){this.key=e,this.value=n,this.color=r??We.RED,this.left=i??We.EMPTY,this.right=s??We.EMPTY,this.size=this.left.size+1+this.right.size}copy(e,n,r,i,s){return new We(e??this.key,n??this.value,r??this.color,i??this.left,s??this.right)}isEmpty(){return!1}inorderTraversal(e){return this.left.inorderTraversal(e)||e(this.key,this.value)||this.right.inorderTraversal(e)}reverseTraversal(e){return this.right.reverseTraversal(e)||e(this.key,this.value)||this.left.reverseTraversal(e)}min(){return this.left.isEmpty()?this:this.left.min()}minKey(){return this.min().key}maxKey(){return this.right.isEmpty()?this.key:this.right.maxKey()}insert(e,n,r){let i=this;const s=r(e,i.key);return i=s<0?i.copy(null,null,null,i.left.insert(e,n,r),null):s===0?i.copy(null,n,null,null,null):i.copy(null,null,null,null,i.right.insert(e,n,r)),i.fixUp()}removeMin(){if(this.left.isEmpty())return We.EMPTY;let e=this;return e.left.isRed()||e.left.left.isRed()||(e=e.moveRedLeft()),e=e.copy(null,null,null,e.left.removeMin(),null),e.fixUp()}remove(e,n){let r,i=this;if(n(e,i.key)<0)i.left.isEmpty()||i.left.isRed()||i.left.left.isRed()||(i=i.moveRedLeft()),i=i.copy(null,null,null,i.left.remove(e,n),null);else{if(i.left.isRed()&&(i=i.rotateRight()),i.right.isEmpty()||i.right.isRed()||i.right.left.isRed()||(i=i.moveRedRight()),n(e,i.key)===0){if(i.right.isEmpty())return We.EMPTY;r=i.right.min(),i=i.copy(r.key,r.value,null,null,i.right.removeMin())}i=i.copy(null,null,null,null,i.right.remove(e,n))}return i.fixUp()}isRed(){return this.color}fixUp(){let e=this;return e.right.isRed()&&!e.left.isRed()&&(e=e.rotateLeft()),e.left.isRed()&&e.left.left.isRed()&&(e=e.rotateRight()),e.left.isRed()&&e.right.isRed()&&(e=e.colorFlip()),e}moveRedLeft(){let e=this.colorFlip();return e.right.left.isRed()&&(e=e.copy(null,null,null,null,e.right.rotateRight()),e=e.rotateLeft(),e=e.colorFlip()),e}moveRedRight(){let e=this.colorFlip();return e.left.left.isRed()&&(e=e.rotateRight(),e=e.colorFlip()),e}rotateLeft(){const e=this.copy(null,null,We.RED,null,this.right.left);return this.right.copy(null,null,this.color,e,null)}rotateRight(){const e=this.copy(null,null,We.RED,this.left.right,null);return this.left.copy(null,null,this.color,null,e)}colorFlip(){const e=this.left.copy(null,null,!this.left.color,null,null),n=this.right.copy(null,null,!this.right.color,null,null);return this.copy(null,null,!this.color,e,n)}checkMaxDepth(){const e=this.check();return Math.pow(2,e)<=this.size+1}check(){if(this.isRed()&&this.left.isRed()||this.right.isRed())throw J();const e=this.left.check();if(e!==this.right.check())throw J();return e+(this.isRed()?0:1)}}We.EMPTY=null,We.RED=!0,We.BLACK=!1;We.EMPTY=new class{constructor(){this.size=0}get key(){throw J()}get value(){throw J()}get color(){throw J()}get left(){throw J()}get right(){throw J()}copy(e,n,r,i,s){return this}insert(e,n,r){return new We(e,n)}remove(e,n){return this}isEmpty(){return!0}inorderTraversal(e){return!1}reverseTraversal(e){return!1}minKey(){return null}maxKey(){return null}isRed(){return!1}checkMaxDepth(){return!0}check(){return 0}};/**
 * @license
 * Copyright 2017 Google LLC
 *
 * Licensed under the Apache License, Version 2.0 (the "License");
 * you may not use this file except in compliance with the License.
 * You may obtain a copy of the License at
 *
 *   http://www.apache.org/licenses/LICENSE-2.0
 *
 * Unless required by applicable law or agreed to in writing, software
 * distributed under the License is distributed on an "AS IS" BASIS,
 * WITHOUT WARRANTIES OR CONDITIONS OF ANY KIND, either express or implied.
 * See the License for the specific language governing permissions and
 * limitations under the License.
 */class Ke{constructor(e){this.comparator=e,this.data=new Ce(this.comparator)}has(e){return this.data.get(e)!==null}first(){return this.data.minKey()}last(){return this.data.maxKey()}get size(){return this.data.size}indexOf(e){return this.data.indexOf(e)}forEach(e){this.data.inorderTraversal((n,r)=>(e(n),!1))}forEachInRange(e,n){const r=this.data.getIteratorFrom(e[0]);for(;r.hasNext();){const i=r.getNext();if(this.comparator(i.key,e[1])>=0)return;n(i.key)}}forEachWhile(e,n){let r;for(r=n!==void 0?this.data.getIteratorFrom(n):this.data.getIterator();r.hasNext();)if(!e(r.getNext().key))return}firstAfterOrEqual(e){const n=this.data.getIteratorFrom(e);return n.hasNext()?n.getNext().key:null}getIterator(){return new rg(this.data.getIterator())}getIteratorFrom(e){return new rg(this.data.getIteratorFrom(e))}add(e){return this.copy(this.data.remove(e).insert(e,!0))}delete(e){return this.has(e)?this.copy(this.data.remove(e)):this}isEmpty(){return this.data.isEmpty()}unionWith(e){let n=this;return n.size<e.size&&(n=e,e=this),e.forEach(r=>{n=n.add(r)}),n}isEqual(e){if(!(e instanceof Ke)||this.size!==e.size)return!1;const n=this.data.getIterator(),r=e.data.getIterator();for(;n.hasNext();){const i=n.getNext().key,s=r.getNext().key;if(this.comparator(i,s)!==0)return!1}return!0}toArray(){const e=[];return this.forEach(n=>{e.push(n)}),e}toString(){const e=[];return this.forEach(n=>e.push(n)),"SortedSet("+e.toString()+")"}copy(e){const n=new Ke(this.comparator);return n.data=e,n}}class rg{constructor(e){this.iter=e}getNext(){return this.iter.getNext().key}hasNext(){return this.iter.hasNext()}}/**
 * @license
 * Copyright 2020 Google LLC
 *
 * Licensed under the Apache License, Version 2.0 (the "License");
 * you may not use this file except in compliance with the License.
 * You may obtain a copy of the License at
 *
 *   http://www.apache.org/licenses/LICENSE-2.0
 *
 * Unless required by applicable law or agreed to in writing, software
 * distributed under the License is distributed on an "AS IS" BASIS,
 * WITHOUT WARRANTIES OR CONDITIONS OF ANY KIND, either express or implied.
 * See the License for the specific language governing permissions and
 * limitations under the License.
 */class $t{constructor(e){this.fields=e,e.sort(He.comparator)}static empty(){return new $t([])}unionWith(e){let n=new Ke(He.comparator);for(const r of this.fields)n=n.add(r);for(const r of e)n=n.add(r);return new $t(n.toArray())}covers(e){for(const n of this.fields)if(n.isPrefixOf(e))return!0;return!1}isEqual(e){return bi(this.fields,e.fields,(n,r)=>n.isEqual(r))}}/**
 * @license
 * Copyright 2023 Google LLC
 *
 * Licensed under the Apache License, Version 2.0 (the "License");
 * you may not use this file except in compliance with the License.
 * You may obtain a copy of the License at
 *
 *   http://www.apache.org/licenses/LICENSE-2.0
 *
 * Unless required by applicable law or agreed to in writing, software
 * distributed under the License is distributed on an "AS IS" BASIS,
 * WITHOUT WARRANTIES OR CONDITIONS OF ANY KIND, either express or implied.
 * See the License for the specific language governing permissions and
 * limitations under the License.
 */class t0 extends Error{constructor(){super(...arguments),this.name="Base64DecodeError"}}/**
 * @license
 * Copyright 2020 Google LLC
 *
 * Licensed under the Apache License, Version 2.0 (the "License");
 * you may not use this file except in compliance with the License.
 * You may obtain a copy of the License at
 *
 *   http://www.apache.org/licenses/LICENSE-2.0
 *
 * Unless required by applicable law or agreed to in writing, software
 * distributed under the License is distributed on an "AS IS" BASIS,
 * WITHOUT WARRANTIES OR CONDITIONS OF ANY KIND, either express or implied.
 * See the License for the specific language governing permissions and
 * limitations under the License.
 */class Qe{constructor(e){this.binaryString=e}static fromBase64String(e){const n=function(i){try{return atob(i)}catch(s){throw typeof DOMException<"u"&&s instanceof DOMException?new t0("Invalid base64 string: "+s):s}}(e);return new Qe(n)}static fromUint8Array(e){const n=function(i){let s="";for(let o=0;o<i.length;++o)s+=String.fromCharCode(i[o]);return s}(e);return new Qe(n)}[Symbol.iterator](){let e=0;return{next:()=>e<this.binaryString.length?{value:this.binaryString.charCodeAt(e++),done:!1}:{value:void 0,done:!0}}}toBase64(){return function(n){return btoa(n)}(this.binaryString)}toUint8Array(){return function(n){const r=new Uint8Array(n.length);for(let i=0;i<n.length;i++)r[i]=n.charCodeAt(i);return r}(this.binaryString)}approximateByteSize(){return 2*this.binaryString.length}compareTo(e){return ue(this.binaryString,e.binaryString)}isEqual(e){return this.binaryString===e.binaryString}}Qe.EMPTY_BYTE_STRING=new Qe("");const PA=new RegExp(/^\d{4}-\d\d-\d\dT\d\d:\d\d:\d\d(?:\.(\d+))?Z$/);function hr(t){if(pe(!!t),typeof t=="string"){let e=0;const n=PA.exec(t);if(pe(!!n),n[1]){let i=n[1];i=(i+"000000000").substr(0,9),e=Number(i)}const r=new Date(t);return{seconds:Math.floor(r.getTime()/1e3),nanos:e}}return{seconds:xe(t.seconds),nanos:xe(t.nanos)}}function xe(t){return typeof t=="number"?t:typeof t=="string"?Number(t):0}function zr(t){return typeof t=="string"?Qe.fromBase64String(t):Qe.fromUint8Array(t)}/**
 * @license
 * Copyright 2020 Google LLC
 *
 * Licensed under the Apache License, Version 2.0 (the "License");
 * you may not use this file except in compliance with the License.
 * You may obtain a copy of the License at
 *
 *   http://www.apache.org/licenses/LICENSE-2.0
 *
 * Unless required by applicable law or agreed to in writing, software
 * distributed under the License is distributed on an "AS IS" BASIS,
 * WITHOUT WARRANTIES OR CONDITIONS OF ANY KIND, either express or implied.
 * See the License for the specific language governing permissions and
 * limitations under the License.
 */function Hd(t){var e,n;return((n=(((e=t==null?void 0:t.mapValue)===null||e===void 0?void 0:e.fields)||{}).__type__)===null||n===void 0?void 0:n.stringValue)==="server_timestamp"}function qd(t){const e=t.mapValue.fields.__previous_value__;return Hd(e)?qd(e):e}function lo(t){const e=hr(t.mapValue.fields.__local_write_time__.timestampValue);return new Me(e.seconds,e.nanos)}/**
 * @license
 * Copyright 2017 Google LLC
 *
 * Licensed under the Apache License, Version 2.0 (the "License");
 * you may not use this file except in compliance with the License.
 * You may obtain a copy of the License at
 *
 *   http://www.apache.org/licenses/LICENSE-2.0
 *
 * Unless required by applicable law or agreed to in writing, software
 * distributed under the License is distributed on an "AS IS" BASIS,
 * WITHOUT WARRANTIES OR CONDITIONS OF ANY KIND, either express or implied.
 * See the License for the specific language governing permissions and
 * limitations under the License.
 */class xA{constructor(e,n,r,i,s,o,l,u,h){this.databaseId=e,this.appId=n,this.persistenceKey=r,this.host=i,this.ssl=s,this.forceLongPolling=o,this.autoDetectLongPolling=l,this.longPollingOptions=u,this.useFetchStreams=h}}class uo{constructor(e,n){this.projectId=e,this.database=n||"(default)"}static empty(){return new uo("","")}get isDefaultDatabase(){return this.database==="(default)"}isEqual(e){return e instanceof uo&&e.projectId===this.projectId&&e.database===this.database}}/**
 * @license
 * Copyright 2020 Google LLC
 *
 * Licensed under the Apache License, Version 2.0 (the "License");
 * you may not use this file except in compliance with the License.
 * You may obtain a copy of the License at
 *
 *   http://www.apache.org/licenses/LICENSE-2.0
 *
 * Unless required by applicable law or agreed to in writing, software
 * distributed under the License is distributed on an "AS IS" BASIS,
 * WITHOUT WARRANTIES OR CONDITIONS OF ANY KIND, either express or implied.
 * See the License for the specific language governing permissions and
 * limitations under the License.
 */const ga={mapValue:{}};function $r(t){return"nullValue"in t?0:"booleanValue"in t?1:"integerValue"in t||"doubleValue"in t?2:"timestampValue"in t?3:"stringValue"in t?5:"bytesValue"in t?6:"referenceValue"in t?7:"geoPointValue"in t?8:"arrayValue"in t?9:"mapValue"in t?Hd(t)?4:DA(t)?9007199254740991:NA(t)?10:11:J()}function an(t,e){if(t===e)return!0;const n=$r(t);if(n!==$r(e))return!1;switch(n){case 0:case 9007199254740991:return!0;case 1:return t.booleanValue===e.booleanValue;case 4:return lo(t).isEqual(lo(e));case 3:return function(i,s){if(typeof i.timestampValue=="string"&&typeof s.timestampValue=="string"&&i.timestampValue.length===s.timestampValue.length)return i.timestampValue===s.timestampValue;const o=hr(i.timestampValue),l=hr(s.timestampValue);return o.seconds===l.seconds&&o.nanos===l.nanos}(t,e);case 5:return t.stringValue===e.stringValue;case 6:return function(i,s){return zr(i.bytesValue).isEqual(zr(s.bytesValue))}(t,e);case 7:return t.referenceValue===e.referenceValue;case 8:return function(i,s){return xe(i.geoPointValue.latitude)===xe(s.geoPointValue.latitude)&&xe(i.geoPointValue.longitude)===xe(s.geoPointValue.longitude)}(t,e);case 2:return function(i,s){if("integerValue"in i&&"integerValue"in s)return xe(i.integerValue)===xe(s.integerValue);if("doubleValue"in i&&"doubleValue"in s){const o=xe(i.doubleValue),l=xe(s.doubleValue);return o===l?wl(o)===wl(l):isNaN(o)&&isNaN(l)}return!1}(t,e);case 9:return bi(t.arrayValue.values||[],e.arrayValue.values||[],an);case 10:case 11:return function(i,s){const o=i.mapValue.fields||{},l=s.mapValue.fields||{};if(ng(o)!==ng(l))return!1;for(const u in o)if(o.hasOwnProperty(u)&&(l[u]===void 0||!an(o[u],l[u])))return!1;return!0}(t,e);default:return J()}}function co(t,e){return(t.values||[]).find(n=>an(n,e))!==void 0}function Oi(t,e){if(t===e)return 0;const n=$r(t),r=$r(e);if(n!==r)return ue(n,r);switch(n){case 0:case 9007199254740991:return 0;case 1:return ue(t.booleanValue,e.booleanValue);case 2:return function(s,o){const l=xe(s.integerValue||s.doubleValue),u=xe(o.integerValue||o.doubleValue);return l<u?-1:l>u?1:l===u?0:isNaN(l)?isNaN(u)?0:-1:1}(t,e);case 3:return ig(t.timestampValue,e.timestampValue);case 4:return ig(lo(t),lo(e));case 5:return ue(t.stringValue,e.stringValue);case 6:return function(s,o){const l=zr(s),u=zr(o);return l.compareTo(u)}(t.bytesValue,e.bytesValue);case 7:return function(s,o){const l=s.split("/"),u=o.split("/");for(let h=0;h<l.length&&h<u.length;h++){const f=ue(l[h],u[h]);if(f!==0)return f}return ue(l.length,u.length)}(t.referenceValue,e.referenceValue);case 8:return function(s,o){const l=ue(xe(s.latitude),xe(o.latitude));return l!==0?l:ue(xe(s.longitude),xe(o.longitude))}(t.geoPointValue,e.geoPointValue);case 9:return sg(t.arrayValue,e.arrayValue);case 10:return function(s,o){var l,u,h,f;const g=s.fields||{},v=o.fields||{},R=(l=g.value)===null||l===void 0?void 0:l.arrayValue,N=(u=v.value)===null||u===void 0?void 0:u.arrayValue,D=ue(((h=R==null?void 0:R.values)===null||h===void 0?void 0:h.length)||0,((f=N==null?void 0:N.values)===null||f===void 0?void 0:f.length)||0);return D!==0?D:sg(R,N)}(t.mapValue,e.mapValue);case 11:return function(s,o){if(s===ga.mapValue&&o===ga.mapValue)return 0;if(s===ga.mapValue)return 1;if(o===ga.mapValue)return-1;const l=s.fields||{},u=Object.keys(l),h=o.fields||{},f=Object.keys(h);u.sort(),f.sort();for(let g=0;g<u.length&&g<f.length;++g){const v=ue(u[g],f[g]);if(v!==0)return v;const R=Oi(l[u[g]],h[f[g]]);if(R!==0)return R}return ue(u.length,f.length)}(t.mapValue,e.mapValue);default:throw J()}}function ig(t,e){if(typeof t=="string"&&typeof e=="string"&&t.length===e.length)return ue(t,e);const n=hr(t),r=hr(e),i=ue(n.seconds,r.seconds);return i!==0?i:ue(n.nanos,r.nanos)}function sg(t,e){const n=t.values||[],r=e.values||[];for(let i=0;i<n.length&&i<r.length;++i){const s=Oi(n[i],r[i]);if(s)return s}return ue(n.length,r.length)}function Li(t){return wh(t)}function wh(t){return"nullValue"in t?"null":"booleanValue"in t?""+t.booleanValue:"integerValue"in t?""+t.integerValue:"doubleValue"in t?""+t.doubleValue:"timestampValue"in t?function(n){const r=hr(n);return`time(${r.seconds},${r.nanos})`}(t.timestampValue):"stringValue"in t?t.stringValue:"bytesValue"in t?function(n){return zr(n).toBase64()}(t.bytesValue):"referenceValue"in t?function(n){return K.fromName(n).toString()}(t.referenceValue):"geoPointValue"in t?function(n){return`geo(${n.latitude},${n.longitude})`}(t.geoPointValue):"arrayValue"in t?function(n){let r="[",i=!0;for(const s of n.values||[])i?i=!1:r+=",",r+=wh(s);return r+"]"}(t.arrayValue):"mapValue"in t?function(n){const r=Object.keys(n.fields||{}).sort();let i="{",s=!0;for(const o of r)s?s=!1:i+=",",i+=`${o}:${wh(n.fields[o])}`;return i+"}"}(t.mapValue):J()}function Eh(t){return!!t&&"integerValue"in t}function Kd(t){return!!t&&"arrayValue"in t}function og(t){return!!t&&"nullValue"in t}function ag(t){return!!t&&"doubleValue"in t&&isNaN(Number(t.doubleValue))}function Ma(t){return!!t&&"mapValue"in t}function NA(t){var e,n;return((n=(((e=t==null?void 0:t.mapValue)===null||e===void 0?void 0:e.fields)||{}).__type__)===null||n===void 0?void 0:n.stringValue)==="__vector__"}function Fs(t){if(t.geoPointValue)return{geoPointValue:Object.assign({},t.geoPointValue)};if(t.timestampValue&&typeof t.timestampValue=="object")return{timestampValue:Object.assign({},t.timestampValue)};if(t.mapValue){const e={mapValue:{fields:{}}};return Ki(t.mapValue.fields,(n,r)=>e.mapValue.fields[n]=Fs(r)),e}if(t.arrayValue){const e={arrayValue:{values:[]}};for(let n=0;n<(t.arrayValue.values||[]).length;++n)e.arrayValue.values[n]=Fs(t.arrayValue.values[n]);return e}return Object.assign({},t)}function DA(t){return(((t.mapValue||{}).fields||{}).__type__||{}).stringValue==="__max__"}/**
 * @license
 * Copyright 2017 Google LLC
 *
 * Licensed under the Apache License, Version 2.0 (the "License");
 * you may not use this file except in compliance with the License.
 * You may obtain a copy of the License at
 *
 *   http://www.apache.org/licenses/LICENSE-2.0
 *
 * Unless required by applicable law or agreed to in writing, software
 * distributed under the License is distributed on an "AS IS" BASIS,
 * WITHOUT WARRANTIES OR CONDITIONS OF ANY KIND, either express or implied.
 * See the License for the specific language governing permissions and
 * limitations under the License.
 */class Vt{constructor(e){this.value=e}static empty(){return new Vt({mapValue:{}})}field(e){if(e.isEmpty())return this.value;{let n=this.value;for(let r=0;r<e.length-1;++r)if(n=(n.mapValue.fields||{})[e.get(r)],!Ma(n))return null;return n=(n.mapValue.fields||{})[e.lastSegment()],n||null}}set(e,n){this.getFieldsMap(e.popLast())[e.lastSegment()]=Fs(n)}setAll(e){let n=He.emptyPath(),r={},i=[];e.forEach((o,l)=>{if(!n.isImmediateParentOf(l)){const u=this.getFieldsMap(n);this.applyChanges(u,r,i),r={},i=[],n=l.popLast()}o?r[l.lastSegment()]=Fs(o):i.push(l.lastSegment())});const s=this.getFieldsMap(n);this.applyChanges(s,r,i)}delete(e){const n=this.field(e.popLast());Ma(n)&&n.mapValue.fields&&delete n.mapValue.fields[e.lastSegment()]}isEqual(e){return an(this.value,e.value)}getFieldsMap(e){let n=this.value;n.mapValue.fields||(n.mapValue={fields:{}});for(let r=0;r<e.length;++r){let i=n.mapValue.fields[e.get(r)];Ma(i)&&i.mapValue.fields||(i={mapValue:{fields:{}}},n.mapValue.fields[e.get(r)]=i),n=i}return n.mapValue.fields}applyChanges(e,n,r){Ki(n,(i,s)=>e[i]=s);for(const i of r)delete e[i]}clone(){return new Vt(Fs(this.value))}}function n0(t){const e=[];return Ki(t.fields,(n,r)=>{const i=new He([n]);if(Ma(r)){const s=n0(r.mapValue).fields;if(s.length===0)e.push(i);else for(const o of s)e.push(i.child(o))}else e.push(i)}),new $t(e)}/**
 * @license
 * Copyright 2017 Google LLC
 *
 * Licensed under the Apache License, Version 2.0 (the "License");
 * you may not use this file except in compliance with the License.
 * You may obtain a copy of the License at
 *
 *   http://www.apache.org/licenses/LICENSE-2.0
 *
 * Unless required by applicable law or agreed to in writing, software
 * distributed under the License is distributed on an "AS IS" BASIS,
 * WITHOUT WARRANTIES OR CONDITIONS OF ANY KIND, either express or implied.
 * See the License for the specific language governing permissions and
 * limitations under the License.
 */class st{constructor(e,n,r,i,s,o,l){this.key=e,this.documentType=n,this.version=r,this.readTime=i,this.createTime=s,this.data=o,this.documentState=l}static newInvalidDocument(e){return new st(e,0,Z.min(),Z.min(),Z.min(),Vt.empty(),0)}static newFoundDocument(e,n,r,i){return new st(e,1,n,Z.min(),r,i,0)}static newNoDocument(e,n){return new st(e,2,n,Z.min(),Z.min(),Vt.empty(),0)}static newUnknownDocument(e,n){return new st(e,3,n,Z.min(),Z.min(),Vt.empty(),2)}convertToFoundDocument(e,n){return!this.createTime.isEqual(Z.min())||this.documentType!==2&&this.documentType!==0||(this.createTime=e),this.version=e,this.documentType=1,this.data=n,this.documentState=0,this}convertToNoDocument(e){return this.version=e,this.documentType=2,this.data=Vt.empty(),this.documentState=0,this}convertToUnknownDocument(e){return this.version=e,this.documentType=3,this.data=Vt.empty(),this.documentState=2,this}setHasCommittedMutations(){return this.documentState=2,this}setHasLocalMutations(){return this.documentState=1,this.version=Z.min(),this}setReadTime(e){return this.readTime=e,this}get hasLocalMutations(){return this.documentState===1}get hasCommittedMutations(){return this.documentState===2}get hasPendingWrites(){return this.hasLocalMutations||this.hasCommittedMutations}isValidDocument(){return this.documentType!==0}isFoundDocument(){return this.documentType===1}isNoDocument(){return this.documentType===2}isUnknownDocument(){return this.documentType===3}isEqual(e){return e instanceof st&&this.key.isEqual(e.key)&&this.version.isEqual(e.version)&&this.documentType===e.documentType&&this.documentState===e.documentState&&this.data.isEqual(e.data)}mutableCopy(){return new st(this.key,this.documentType,this.version,this.readTime,this.createTime,this.data.clone(),this.documentState)}toString(){return`Document(${this.key}, ${this.version}, ${JSON.stringify(this.data.value)}, {createTime: ${this.createTime}}), {documentType: ${this.documentType}}), {documentState: ${this.documentState}})`}}/**
 * @license
 * Copyright 2022 Google LLC
 *
 * Licensed under the Apache License, Version 2.0 (the "License");
 * you may not use this file except in compliance with the License.
 * You may obtain a copy of the License at
 *
 *   http://www.apache.org/licenses/LICENSE-2.0
 *
 * Unless required by applicable law or agreed to in writing, software
 * distributed under the License is distributed on an "AS IS" BASIS,
 * WITHOUT WARRANTIES OR CONDITIONS OF ANY KIND, either express or implied.
 * See the License for the specific language governing permissions and
 * limitations under the License.
 */class El{constructor(e,n){this.position=e,this.inclusive=n}}function lg(t,e,n){let r=0;for(let i=0;i<t.position.length;i++){const s=e[i],o=t.position[i];if(s.field.isKeyField()?r=K.comparator(K.fromName(o.referenceValue),n.key):r=Oi(o,n.data.field(s.field)),s.dir==="desc"&&(r*=-1),r!==0)break}return r}function ug(t,e){if(t===null)return e===null;if(e===null||t.inclusive!==e.inclusive||t.position.length!==e.position.length)return!1;for(let n=0;n<t.position.length;n++)if(!an(t.position[n],e.position[n]))return!1;return!0}/**
 * @license
 * Copyright 2022 Google LLC
 *
 * Licensed under the Apache License, Version 2.0 (the "License");
 * you may not use this file except in compliance with the License.
 * You may obtain a copy of the License at
 *
 *   http://www.apache.org/licenses/LICENSE-2.0
 *
 * Unless required by applicable law or agreed to in writing, software
 * distributed under the License is distributed on an "AS IS" BASIS,
 * WITHOUT WARRANTIES OR CONDITIONS OF ANY KIND, either express or implied.
 * See the License for the specific language governing permissions and
 * limitations under the License.
 */class Tl{constructor(e,n="asc"){this.field=e,this.dir=n}}function VA(t,e){return t.dir===e.dir&&t.field.isEqual(e.field)}/**
 * @license
 * Copyright 2022 Google LLC
 *
 * Licensed under the Apache License, Version 2.0 (the "License");
 * you may not use this file except in compliance with the License.
 * You may obtain a copy of the License at
 *
 *   http://www.apache.org/licenses/LICENSE-2.0
 *
 * Unless required by applicable law or agreed to in writing, software
 * distributed under the License is distributed on an "AS IS" BASIS,
 * WITHOUT WARRANTIES OR CONDITIONS OF ANY KIND, either express or implied.
 * See the License for the specific language governing permissions and
 * limitations under the License.
 */class r0{}class Oe extends r0{constructor(e,n,r){super(),this.field=e,this.op=n,this.value=r}static create(e,n,r){return e.isKeyField()?n==="in"||n==="not-in"?this.createKeyFieldInFilter(e,n,r):new OA(e,n,r):n==="array-contains"?new FA(e,r):n==="in"?new jA(e,r):n==="not-in"?new UA(e,r):n==="array-contains-any"?new BA(e,r):new Oe(e,n,r)}static createKeyFieldInFilter(e,n,r){return n==="in"?new LA(e,r):new MA(e,r)}matches(e){const n=e.data.field(this.field);return this.op==="!="?n!==null&&this.matchesComparison(Oi(n,this.value)):n!==null&&$r(this.value)===$r(n)&&this.matchesComparison(Oi(n,this.value))}matchesComparison(e){switch(this.op){case"<":return e<0;case"<=":return e<=0;case"==":return e===0;case"!=":return e!==0;case">":return e>0;case">=":return e>=0;default:return J()}}isInequality(){return["<","<=",">",">=","!=","not-in"].indexOf(this.op)>=0}getFlattenedFilters(){return[this]}getFilters(){return[this]}}class ln extends r0{constructor(e,n){super(),this.filters=e,this.op=n,this.ae=null}static create(e,n){return new ln(e,n)}matches(e){return i0(this)?this.filters.find(n=>!n.matches(e))===void 0:this.filters.find(n=>n.matches(e))!==void 0}getFlattenedFilters(){return this.ae!==null||(this.ae=this.filters.reduce((e,n)=>e.concat(n.getFlattenedFilters()),[])),this.ae}getFilters(){return Object.assign([],this.filters)}}function i0(t){return t.op==="and"}function s0(t){return bA(t)&&i0(t)}function bA(t){for(const e of t.filters)if(e instanceof ln)return!1;return!0}function Th(t){if(t instanceof Oe)return t.field.canonicalString()+t.op.toString()+Li(t.value);if(s0(t))return t.filters.map(e=>Th(e)).join(",");{const e=t.filters.map(n=>Th(n)).join(",");return`${t.op}(${e})`}}function o0(t,e){return t instanceof Oe?function(r,i){return i instanceof Oe&&r.op===i.op&&r.field.isEqual(i.field)&&an(r.value,i.value)}(t,e):t instanceof ln?function(r,i){return i instanceof ln&&r.op===i.op&&r.filters.length===i.filters.length?r.filters.reduce((s,o,l)=>s&&o0(o,i.filters[l]),!0):!1}(t,e):void J()}function a0(t){return t instanceof Oe?function(n){return`${n.field.canonicalString()} ${n.op} ${Li(n.value)}`}(t):t instanceof ln?function(n){return n.op.toString()+" {"+n.getFilters().map(a0).join(" ,")+"}"}(t):"Filter"}class OA extends Oe{constructor(e,n,r){super(e,n,r),this.key=K.fromName(r.referenceValue)}matches(e){const n=K.comparator(e.key,this.key);return this.matchesComparison(n)}}class LA extends Oe{constructor(e,n){super(e,"in",n),this.keys=l0("in",n)}matches(e){return this.keys.some(n=>n.isEqual(e.key))}}class MA extends Oe{constructor(e,n){super(e,"not-in",n),this.keys=l0("not-in",n)}matches(e){return!this.keys.some(n=>n.isEqual(e.key))}}function l0(t,e){var n;return(((n=e.arrayValue)===null||n===void 0?void 0:n.values)||[]).map(r=>K.fromName(r.referenceValue))}class FA extends Oe{constructor(e,n){super(e,"array-contains",n)}matches(e){const n=e.data.field(this.field);return Kd(n)&&co(n.arrayValue,this.value)}}class jA extends Oe{constructor(e,n){super(e,"in",n)}matches(e){const n=e.data.field(this.field);return n!==null&&co(this.value.arrayValue,n)}}class UA extends Oe{constructor(e,n){super(e,"not-in",n)}matches(e){if(co(this.value.arrayValue,{nullValue:"NULL_VALUE"}))return!1;const n=e.data.field(this.field);return n!==null&&!co(this.value.arrayValue,n)}}class BA extends Oe{constructor(e,n){super(e,"array-contains-any",n)}matches(e){const n=e.data.field(this.field);return!(!Kd(n)||!n.arrayValue.values)&&n.arrayValue.values.some(r=>co(this.value.arrayValue,r))}}/**
 * @license
 * Copyright 2019 Google LLC
 *
 * Licensed under the Apache License, Version 2.0 (the "License");
 * you may not use this file except in compliance with the License.
 * You may obtain a copy of the License at
 *
 *   http://www.apache.org/licenses/LICENSE-2.0
 *
 * Unless required by applicable law or agreed to in writing, software
 * distributed under the License is distributed on an "AS IS" BASIS,
 * WITHOUT WARRANTIES OR CONDITIONS OF ANY KIND, either express or implied.
 * See the License for the specific language governing permissions and
 * limitations under the License.
 */class zA{constructor(e,n=null,r=[],i=[],s=null,o=null,l=null){this.path=e,this.collectionGroup=n,this.orderBy=r,this.filters=i,this.limit=s,this.startAt=o,this.endAt=l,this.ue=null}}function cg(t,e=null,n=[],r=[],i=null,s=null,o=null){return new zA(t,e,n,r,i,s,o)}function Gd(t){const e=ee(t);if(e.ue===null){let n=e.path.canonicalString();e.collectionGroup!==null&&(n+="|cg:"+e.collectionGroup),n+="|f:",n+=e.filters.map(r=>Th(r)).join(","),n+="|ob:",n+=e.orderBy.map(r=>function(s){return s.field.canonicalString()+s.dir}(r)).join(","),Gl(e.limit)||(n+="|l:",n+=e.limit),e.startAt&&(n+="|lb:",n+=e.startAt.inclusive?"b:":"a:",n+=e.startAt.position.map(r=>Li(r)).join(",")),e.endAt&&(n+="|ub:",n+=e.endAt.inclusive?"a:":"b:",n+=e.endAt.position.map(r=>Li(r)).join(",")),e.ue=n}return e.ue}function Qd(t,e){if(t.limit!==e.limit||t.orderBy.length!==e.orderBy.length)return!1;for(let n=0;n<t.orderBy.length;n++)if(!VA(t.orderBy[n],e.orderBy[n]))return!1;if(t.filters.length!==e.filters.length)return!1;for(let n=0;n<t.filters.length;n++)if(!o0(t.filters[n],e.filters[n]))return!1;return t.collectionGroup===e.collectionGroup&&!!t.path.isEqual(e.path)&&!!ug(t.startAt,e.startAt)&&ug(t.endAt,e.endAt)}function Ih(t){return K.isDocumentKey(t.path)&&t.collectionGroup===null&&t.filters.length===0}/**
 * @license
 * Copyright 2017 Google LLC
 *
 * Licensed under the Apache License, Version 2.0 (the "License");
 * you may not use this file except in compliance with the License.
 * You may obtain a copy of the License at
 *
 *   http://www.apache.org/licenses/LICENSE-2.0
 *
 * Unless required by applicable law or agreed to in writing, software
 * distributed under the License is distributed on an "AS IS" BASIS,
 * WITHOUT WARRANTIES OR CONDITIONS OF ANY KIND, either express or implied.
 * See the License for the specific language governing permissions and
 * limitations under the License.
 */class Ql{constructor(e,n=null,r=[],i=[],s=null,o="F",l=null,u=null){this.path=e,this.collectionGroup=n,this.explicitOrderBy=r,this.filters=i,this.limit=s,this.limitType=o,this.startAt=l,this.endAt=u,this.ce=null,this.le=null,this.he=null,this.startAt,this.endAt}}function $A(t,e,n,r,i,s,o,l){return new Ql(t,e,n,r,i,s,o,l)}function Yd(t){return new Ql(t)}function hg(t){return t.filters.length===0&&t.limit===null&&t.startAt==null&&t.endAt==null&&(t.explicitOrderBy.length===0||t.explicitOrderBy.length===1&&t.explicitOrderBy[0].field.isKeyField())}function WA(t){return t.collectionGroup!==null}function js(t){const e=ee(t);if(e.ce===null){e.ce=[];const n=new Set;for(const s of e.explicitOrderBy)e.ce.push(s),n.add(s.field.canonicalString());const r=e.explicitOrderBy.length>0?e.explicitOrderBy[e.explicitOrderBy.length-1].dir:"asc";(function(o){let l=new Ke(He.comparator);return o.filters.forEach(u=>{u.getFlattenedFilters().forEach(h=>{h.isInequality()&&(l=l.add(h.field))})}),l})(e).forEach(s=>{n.has(s.canonicalString())||s.isKeyField()||e.ce.push(new Tl(s,r))}),n.has(He.keyField().canonicalString())||e.ce.push(new Tl(He.keyField(),r))}return e.ce}function rn(t){const e=ee(t);return e.le||(e.le=HA(e,js(t))),e.le}function HA(t,e){if(t.limitType==="F")return cg(t.path,t.collectionGroup,e,t.filters,t.limit,t.startAt,t.endAt);{e=e.map(i=>{const s=i.dir==="desc"?"asc":"desc";return new Tl(i.field,s)});const n=t.endAt?new El(t.endAt.position,t.endAt.inclusive):null,r=t.startAt?new El(t.startAt.position,t.startAt.inclusive):null;return cg(t.path,t.collectionGroup,e,t.filters,t.limit,n,r)}}function Sh(t,e,n){return new Ql(t.path,t.collectionGroup,t.explicitOrderBy.slice(),t.filters.slice(),e,n,t.startAt,t.endAt)}function Yl(t,e){return Qd(rn(t),rn(e))&&t.limitType===e.limitType}function u0(t){return`${Gd(rn(t))}|lt:${t.limitType}`}function Zr(t){return`Query(target=${function(n){let r=n.path.canonicalString();return n.collectionGroup!==null&&(r+=" collectionGroup="+n.collectionGroup),n.filters.length>0&&(r+=`, filters: [${n.filters.map(i=>a0(i)).join(", ")}]`),Gl(n.limit)||(r+=", limit: "+n.limit),n.orderBy.length>0&&(r+=`, orderBy: [${n.orderBy.map(i=>function(o){return`${o.field.canonicalString()} (${o.dir})`}(i)).join(", ")}]`),n.startAt&&(r+=", startAt: ",r+=n.startAt.inclusive?"b:":"a:",r+=n.startAt.position.map(i=>Li(i)).join(",")),n.endAt&&(r+=", endAt: ",r+=n.endAt.inclusive?"a:":"b:",r+=n.endAt.position.map(i=>Li(i)).join(",")),`Target(${r})`}(rn(t))}; limitType=${t.limitType})`}function Xl(t,e){return e.isFoundDocument()&&function(r,i){const s=i.key.path;return r.collectionGroup!==null?i.key.hasCollectionId(r.collectionGroup)&&r.path.isPrefixOf(s):K.isDocumentKey(r.path)?r.path.isEqual(s):r.path.isImmediateParentOf(s)}(t,e)&&function(r,i){for(const s of js(r))if(!s.field.isKeyField()&&i.data.field(s.field)===null)return!1;return!0}(t,e)&&function(r,i){for(const s of r.filters)if(!s.matches(i))return!1;return!0}(t,e)&&function(r,i){return!(r.startAt&&!function(o,l,u){const h=lg(o,l,u);return o.inclusive?h<=0:h<0}(r.startAt,js(r),i)||r.endAt&&!function(o,l,u){const h=lg(o,l,u);return o.inclusive?h>=0:h>0}(r.endAt,js(r),i))}(t,e)}function qA(t){return t.collectionGroup||(t.path.length%2==1?t.path.lastSegment():t.path.get(t.path.length-2))}function c0(t){return(e,n)=>{let r=!1;for(const i of js(t)){const s=KA(i,e,n);if(s!==0)return s;r=r||i.field.isKeyField()}return 0}}function KA(t,e,n){const r=t.field.isKeyField()?K.comparator(e.key,n.key):function(s,o,l){const u=o.data.field(s),h=l.data.field(s);return u!==null&&h!==null?Oi(u,h):J()}(t.field,e,n);switch(t.dir){case"asc":return r;case"desc":return-1*r;default:return J()}}/**
 * @license
 * Copyright 2017 Google LLC
 *
 * Licensed under the Apache License, Version 2.0 (the "License");
 * you may not use this file except in compliance with the License.
 * You may obtain a copy of the License at
 *
 *   http://www.apache.org/licenses/LICENSE-2.0
 *
 * Unless required by applicable law or agreed to in writing, software
 * distributed under the License is distributed on an "AS IS" BASIS,
 * WITHOUT WARRANTIES OR CONDITIONS OF ANY KIND, either express or implied.
 * See the License for the specific language governing permissions and
 * limitations under the License.
 */class Gi{constructor(e,n){this.mapKeyFn=e,this.equalsFn=n,this.inner={},this.innerSize=0}get(e){const n=this.mapKeyFn(e),r=this.inner[n];if(r!==void 0){for(const[i,s]of r)if(this.equalsFn(i,e))return s}}has(e){return this.get(e)!==void 0}set(e,n){const r=this.mapKeyFn(e),i=this.inner[r];if(i===void 0)return this.inner[r]=[[e,n]],void this.innerSize++;for(let s=0;s<i.length;s++)if(this.equalsFn(i[s][0],e))return void(i[s]=[e,n]);i.push([e,n]),this.innerSize++}delete(e){const n=this.mapKeyFn(e),r=this.inner[n];if(r===void 0)return!1;for(let i=0;i<r.length;i++)if(this.equalsFn(r[i][0],e))return r.length===1?delete this.inner[n]:r.splice(i,1),this.innerSize--,!0;return!1}forEach(e){Ki(this.inner,(n,r)=>{for(const[i,s]of r)e(i,s)})}isEmpty(){return e0(this.inner)}size(){return this.innerSize}}/**
 * @license
 * Copyright 2017 Google LLC
 *
 * Licensed under the Apache License, Version 2.0 (the "License");
 * you may not use this file except in compliance with the License.
 * You may obtain a copy of the License at
 *
 *   http://www.apache.org/licenses/LICENSE-2.0
 *
 * Unless required by applicable law or agreed to in writing, software
 * distributed under the License is distributed on an "AS IS" BASIS,
 * WITHOUT WARRANTIES OR CONDITIONS OF ANY KIND, either express or implied.
 * See the License for the specific language governing permissions and
 * limitations under the License.
 */const GA=new Ce(K.comparator);function xn(){return GA}const h0=new Ce(K.comparator);function Ss(...t){let e=h0;for(const n of t)e=e.insert(n.key,n);return e}function d0(t){let e=h0;return t.forEach((n,r)=>e=e.insert(n,r.overlayedDocument)),e}function Cr(){return Us()}function f0(){return Us()}function Us(){return new Gi(t=>t.toString(),(t,e)=>t.isEqual(e))}const QA=new Ce(K.comparator),YA=new Ke(K.comparator);function ie(...t){let e=YA;for(const n of t)e=e.add(n);return e}const XA=new Ke(ue);function JA(){return XA}/**
 * @license
 * Copyright 2020 Google LLC
 *
 * Licensed under the Apache License, Version 2.0 (the "License");
 * you may not use this file except in compliance with the License.
 * You may obtain a copy of the License at
 *
 *   http://www.apache.org/licenses/LICENSE-2.0
 *
 * Unless required by applicable law or agreed to in writing, software
 * distributed under the License is distributed on an "AS IS" BASIS,
 * WITHOUT WARRANTIES OR CONDITIONS OF ANY KIND, either express or implied.
 * See the License for the specific language governing permissions and
 * limitations under the License.
 */function Xd(t,e){if(t.useProto3Json){if(isNaN(e))return{doubleValue:"NaN"};if(e===1/0)return{doubleValue:"Infinity"};if(e===-1/0)return{doubleValue:"-Infinity"}}return{doubleValue:wl(e)?"-0":e}}function p0(t){return{integerValue:""+t}}function ZA(t,e){return RA(e)?p0(e):Xd(t,e)}/**
 * @license
 * Copyright 2018 Google LLC
 *
 * Licensed under the Apache License, Version 2.0 (the "License");
 * you may not use this file except in compliance with the License.
 * You may obtain a copy of the License at
 *
 *   http://www.apache.org/licenses/LICENSE-2.0
 *
 * Unless required by applicable law or agreed to in writing, software
 * distributed under the License is distributed on an "AS IS" BASIS,
 * WITHOUT WARRANTIES OR CONDITIONS OF ANY KIND, either express or implied.
 * See the License for the specific language governing permissions and
 * limitations under the License.
 */class Jl{constructor(){this._=void 0}}function eC(t,e,n){return t instanceof Il?function(i,s){const o={fields:{__type__:{stringValue:"server_timestamp"},__local_write_time__:{timestampValue:{seconds:i.seconds,nanos:i.nanoseconds}}}};return s&&Hd(s)&&(s=qd(s)),s&&(o.fields.__previous_value__=s),{mapValue:o}}(n,e):t instanceof ho?g0(t,e):t instanceof fo?y0(t,e):function(i,s){const o=m0(i,s),l=dg(o)+dg(i.Pe);return Eh(o)&&Eh(i.Pe)?p0(l):Xd(i.serializer,l)}(t,e)}function tC(t,e,n){return t instanceof ho?g0(t,e):t instanceof fo?y0(t,e):n}function m0(t,e){return t instanceof Sl?function(r){return Eh(r)||function(s){return!!s&&"doubleValue"in s}(r)}(e)?e:{integerValue:0}:null}class Il extends Jl{}class ho extends Jl{constructor(e){super(),this.elements=e}}function g0(t,e){const n=v0(e);for(const r of t.elements)n.some(i=>an(i,r))||n.push(r);return{arrayValue:{values:n}}}class fo extends Jl{constructor(e){super(),this.elements=e}}function y0(t,e){let n=v0(e);for(const r of t.elements)n=n.filter(i=>!an(i,r));return{arrayValue:{values:n}}}class Sl extends Jl{constructor(e,n){super(),this.serializer=e,this.Pe=n}}function dg(t){return xe(t.integerValue||t.doubleValue)}function v0(t){return Kd(t)&&t.arrayValue.values?t.arrayValue.values.slice():[]}function nC(t,e){return t.field.isEqual(e.field)&&function(r,i){return r instanceof ho&&i instanceof ho||r instanceof fo&&i instanceof fo?bi(r.elements,i.elements,an):r instanceof Sl&&i instanceof Sl?an(r.Pe,i.Pe):r instanceof Il&&i instanceof Il}(t.transform,e.transform)}class rC{constructor(e,n){this.version=e,this.transformResults=n}}class sn{constructor(e,n){this.updateTime=e,this.exists=n}static none(){return new sn}static exists(e){return new sn(void 0,e)}static updateTime(e){return new sn(e)}get isNone(){return this.updateTime===void 0&&this.exists===void 0}isEqual(e){return this.exists===e.exists&&(this.updateTime?!!e.updateTime&&this.updateTime.isEqual(e.updateTime):!e.updateTime)}}function Fa(t,e){return t.updateTime!==void 0?e.isFoundDocument()&&e.version.isEqual(t.updateTime):t.exists===void 0||t.exists===e.isFoundDocument()}class Zl{}function _0(t,e){if(!t.hasLocalMutations||e&&e.fields.length===0)return null;if(e===null)return t.isNoDocument()?new Jd(t.key,sn.none()):new xo(t.key,t.data,sn.none());{const n=t.data,r=Vt.empty();let i=new Ke(He.comparator);for(let s of e.fields)if(!i.has(s)){let o=n.field(s);o===null&&s.length>1&&(s=s.popLast(),o=n.field(s)),o===null?r.delete(s):r.set(s,o),i=i.add(s)}return new qr(t.key,r,new $t(i.toArray()),sn.none())}}function iC(t,e,n){t instanceof xo?function(i,s,o){const l=i.value.clone(),u=pg(i.fieldTransforms,s,o.transformResults);l.setAll(u),s.convertToFoundDocument(o.version,l).setHasCommittedMutations()}(t,e,n):t instanceof qr?function(i,s,o){if(!Fa(i.precondition,s))return void s.convertToUnknownDocument(o.version);const l=pg(i.fieldTransforms,s,o.transformResults),u=s.data;u.setAll(w0(i)),u.setAll(l),s.convertToFoundDocument(o.version,u).setHasCommittedMutations()}(t,e,n):function(i,s,o){s.convertToNoDocument(o.version).setHasCommittedMutations()}(0,e,n)}function Bs(t,e,n,r){return t instanceof xo?function(s,o,l,u){if(!Fa(s.precondition,o))return l;const h=s.value.clone(),f=mg(s.fieldTransforms,u,o);return h.setAll(f),o.convertToFoundDocument(o.version,h).setHasLocalMutations(),null}(t,e,n,r):t instanceof qr?function(s,o,l,u){if(!Fa(s.precondition,o))return l;const h=mg(s.fieldTransforms,u,o),f=o.data;return f.setAll(w0(s)),f.setAll(h),o.convertToFoundDocument(o.version,f).setHasLocalMutations(),l===null?null:l.unionWith(s.fieldMask.fields).unionWith(s.fieldTransforms.map(g=>g.field))}(t,e,n,r):function(s,o,l){return Fa(s.precondition,o)?(o.convertToNoDocument(o.version).setHasLocalMutations(),null):l}(t,e,n)}function sC(t,e){let n=null;for(const r of t.fieldTransforms){const i=e.data.field(r.field),s=m0(r.transform,i||null);s!=null&&(n===null&&(n=Vt.empty()),n.set(r.field,s))}return n||null}function fg(t,e){return t.type===e.type&&!!t.key.isEqual(e.key)&&!!t.precondition.isEqual(e.precondition)&&!!function(r,i){return r===void 0&&i===void 0||!(!r||!i)&&bi(r,i,(s,o)=>nC(s,o))}(t.fieldTransforms,e.fieldTransforms)&&(t.type===0?t.value.isEqual(e.value):t.type!==1||t.data.isEqual(e.data)&&t.fieldMask.isEqual(e.fieldMask))}class xo extends Zl{constructor(e,n,r,i=[]){super(),this.key=e,this.value=n,this.precondition=r,this.fieldTransforms=i,this.type=0}getFieldMask(){return null}}class qr extends Zl{constructor(e,n,r,i,s=[]){super(),this.key=e,this.data=n,this.fieldMask=r,this.precondition=i,this.fieldTransforms=s,this.type=1}getFieldMask(){return this.fieldMask}}function w0(t){const e=new Map;return t.fieldMask.fields.forEach(n=>{if(!n.isEmpty()){const r=t.data.field(n);e.set(n,r)}}),e}function pg(t,e,n){const r=new Map;pe(t.length===n.length);for(let i=0;i<n.length;i++){const s=t[i],o=s.transform,l=e.data.field(s.field);r.set(s.field,tC(o,l,n[i]))}return r}function mg(t,e,n){const r=new Map;for(const i of t){const s=i.transform,o=n.data.field(i.field);r.set(i.field,eC(s,o,e))}return r}class Jd extends Zl{constructor(e,n){super(),this.key=e,this.precondition=n,this.type=2,this.fieldTransforms=[]}getFieldMask(){return null}}class oC extends Zl{constructor(e,n){super(),this.key=e,this.precondition=n,this.type=3,this.fieldTransforms=[]}getFieldMask(){return null}}/**
 * @license
 * Copyright 2017 Google LLC
 *
 * Licensed under the Apache License, Version 2.0 (the "License");
 * you may not use this file except in compliance with the License.
 * You may obtain a copy of the License at
 *
 *   http://www.apache.org/licenses/LICENSE-2.0
 *
 * Unless required by applicable law or agreed to in writing, software
 * distributed under the License is distributed on an "AS IS" BASIS,
 * WITHOUT WARRANTIES OR CONDITIONS OF ANY KIND, either express or implied.
 * See the License for the specific language governing permissions and
 * limitations under the License.
 */class aC{constructor(e,n,r,i){this.batchId=e,this.localWriteTime=n,this.baseMutations=r,this.mutations=i}applyToRemoteDocument(e,n){const r=n.mutationResults;for(let i=0;i<this.mutations.length;i++){const s=this.mutations[i];s.key.isEqual(e.key)&&iC(s,e,r[i])}}applyToLocalView(e,n){for(const r of this.baseMutations)r.key.isEqual(e.key)&&(n=Bs(r,e,n,this.localWriteTime));for(const r of this.mutations)r.key.isEqual(e.key)&&(n=Bs(r,e,n,this.localWriteTime));return n}applyToLocalDocumentSet(e,n){const r=f0();return this.mutations.forEach(i=>{const s=e.get(i.key),o=s.overlayedDocument;let l=this.applyToLocalView(o,s.mutatedFields);l=n.has(i.key)?null:l;const u=_0(o,l);u!==null&&r.set(i.key,u),o.isValidDocument()||o.convertToNoDocument(Z.min())}),r}keys(){return this.mutations.reduce((e,n)=>e.add(n.key),ie())}isEqual(e){return this.batchId===e.batchId&&bi(this.mutations,e.mutations,(n,r)=>fg(n,r))&&bi(this.baseMutations,e.baseMutations,(n,r)=>fg(n,r))}}class Zd{constructor(e,n,r,i){this.batch=e,this.commitVersion=n,this.mutationResults=r,this.docVersions=i}static from(e,n,r){pe(e.mutations.length===r.length);let i=function(){return QA}();const s=e.mutations;for(let o=0;o<s.length;o++)i=i.insert(s[o].key,r[o].version);return new Zd(e,n,r,i)}}/**
 * @license
 * Copyright 2022 Google LLC
 *
 * Licensed under the Apache License, Version 2.0 (the "License");
 * you may not use this file except in compliance with the License.
 * You may obtain a copy of the License at
 *
 *   http://www.apache.org/licenses/LICENSE-2.0
 *
 * Unless required by applicable law or agreed to in writing, software
 * distributed under the License is distributed on an "AS IS" BASIS,
 * WITHOUT WARRANTIES OR CONDITIONS OF ANY KIND, either express or implied.
 * See the License for the specific language governing permissions and
 * limitations under the License.
 */class lC{constructor(e,n){this.largestBatchId=e,this.mutation=n}getKey(){return this.mutation.key}isEqual(e){return e!==null&&this.mutation===e.mutation}toString(){return`Overlay{
      largestBatchId: ${this.largestBatchId},
      mutation: ${this.mutation.toString()}
    }`}}/**
 * @license
 * Copyright 2017 Google LLC
 *
 * Licensed under the Apache License, Version 2.0 (the "License");
 * you may not use this file except in compliance with the License.
 * You may obtain a copy of the License at
 *
 *   http://www.apache.org/licenses/LICENSE-2.0
 *
 * Unless required by applicable law or agreed to in writing, software
 * distributed under the License is distributed on an "AS IS" BASIS,
 * WITHOUT WARRANTIES OR CONDITIONS OF ANY KIND, either express or implied.
 * See the License for the specific language governing permissions and
 * limitations under the License.
 */class uC{constructor(e,n){this.count=e,this.unchangedNames=n}}/**
 * @license
 * Copyright 2017 Google LLC
 *
 * Licensed under the Apache License, Version 2.0 (the "License");
 * you may not use this file except in compliance with the License.
 * You may obtain a copy of the License at
 *
 *   http://www.apache.org/licenses/LICENSE-2.0
 *
 * Unless required by applicable law or agreed to in writing, software
 * distributed under the License is distributed on an "AS IS" BASIS,
 * WITHOUT WARRANTIES OR CONDITIONS OF ANY KIND, either express or implied.
 * See the License for the specific language governing permissions and
 * limitations under the License.
 */var De,oe;function cC(t){switch(t){default:return J();case M.CANCELLED:case M.UNKNOWN:case M.DEADLINE_EXCEEDED:case M.RESOURCE_EXHAUSTED:case M.INTERNAL:case M.UNAVAILABLE:case M.UNAUTHENTICATED:return!1;case M.INVALID_ARGUMENT:case M.NOT_FOUND:case M.ALREADY_EXISTS:case M.PERMISSION_DENIED:case M.FAILED_PRECONDITION:case M.ABORTED:case M.OUT_OF_RANGE:case M.UNIMPLEMENTED:case M.DATA_LOSS:return!0}}function E0(t){if(t===void 0)return Pn("GRPC error has no .code"),M.UNKNOWN;switch(t){case De.OK:return M.OK;case De.CANCELLED:return M.CANCELLED;case De.UNKNOWN:return M.UNKNOWN;case De.DEADLINE_EXCEEDED:return M.DEADLINE_EXCEEDED;case De.RESOURCE_EXHAUSTED:return M.RESOURCE_EXHAUSTED;case De.INTERNAL:return M.INTERNAL;case De.UNAVAILABLE:return M.UNAVAILABLE;case De.UNAUTHENTICATED:return M.UNAUTHENTICATED;case De.INVALID_ARGUMENT:return M.INVALID_ARGUMENT;case De.NOT_FOUND:return M.NOT_FOUND;case De.ALREADY_EXISTS:return M.ALREADY_EXISTS;case De.PERMISSION_DENIED:return M.PERMISSION_DENIED;case De.FAILED_PRECONDITION:return M.FAILED_PRECONDITION;case De.ABORTED:return M.ABORTED;case De.OUT_OF_RANGE:return M.OUT_OF_RANGE;case De.UNIMPLEMENTED:return M.UNIMPLEMENTED;case De.DATA_LOSS:return M.DATA_LOSS;default:return J()}}(oe=De||(De={}))[oe.OK=0]="OK",oe[oe.CANCELLED=1]="CANCELLED",oe[oe.UNKNOWN=2]="UNKNOWN",oe[oe.INVALID_ARGUMENT=3]="INVALID_ARGUMENT",oe[oe.DEADLINE_EXCEEDED=4]="DEADLINE_EXCEEDED",oe[oe.NOT_FOUND=5]="NOT_FOUND",oe[oe.ALREADY_EXISTS=6]="ALREADY_EXISTS",oe[oe.PERMISSION_DENIED=7]="PERMISSION_DENIED",oe[oe.UNAUTHENTICATED=16]="UNAUTHENTICATED",oe[oe.RESOURCE_EXHAUSTED=8]="RESOURCE_EXHAUSTED",oe[oe.FAILED_PRECONDITION=9]="FAILED_PRECONDITION",oe[oe.ABORTED=10]="ABORTED",oe[oe.OUT_OF_RANGE=11]="OUT_OF_RANGE",oe[oe.UNIMPLEMENTED=12]="UNIMPLEMENTED",oe[oe.INTERNAL=13]="INTERNAL",oe[oe.UNAVAILABLE=14]="UNAVAILABLE",oe[oe.DATA_LOSS=15]="DATA_LOSS";/**
 * @license
 * Copyright 2023 Google LLC
 *
 * Licensed under the Apache License, Version 2.0 (the "License");
 * you may not use this file except in compliance with the License.
 * You may obtain a copy of the License at
 *
 *   http://www.apache.org/licenses/LICENSE-2.0
 *
 * Unless required by applicable law or agreed to in writing, software
 * distributed under the License is distributed on an "AS IS" BASIS,
 * WITHOUT WARRANTIES OR CONDITIONS OF ANY KIND, either express or implied.
 * See the License for the specific language governing permissions and
 * limitations under the License.
 */function hC(){return new TextEncoder}/**
 * @license
 * Copyright 2022 Google LLC
 *
 * Licensed under the Apache License, Version 2.0 (the "License");
 * you may not use this file except in compliance with the License.
 * You may obtain a copy of the License at
 *
 *   http://www.apache.org/licenses/LICENSE-2.0
 *
 * Unless required by applicable law or agreed to in writing, software
 * distributed under the License is distributed on an "AS IS" BASIS,
 * WITHOUT WARRANTIES OR CONDITIONS OF ANY KIND, either express or implied.
 * See the License for the specific language governing permissions and
 * limitations under the License.
 */const dC=new xr([4294967295,4294967295],0);function gg(t){const e=hC().encode(t),n=new q_;return n.update(e),new Uint8Array(n.digest())}function yg(t){const e=new DataView(t.buffer),n=e.getUint32(0,!0),r=e.getUint32(4,!0),i=e.getUint32(8,!0),s=e.getUint32(12,!0);return[new xr([n,r],0),new xr([i,s],0)]}class ef{constructor(e,n,r){if(this.bitmap=e,this.padding=n,this.hashCount=r,n<0||n>=8)throw new ks(`Invalid padding: ${n}`);if(r<0)throw new ks(`Invalid hash count: ${r}`);if(e.length>0&&this.hashCount===0)throw new ks(`Invalid hash count: ${r}`);if(e.length===0&&n!==0)throw new ks(`Invalid padding when bitmap length is 0: ${n}`);this.Ie=8*e.length-n,this.Te=xr.fromNumber(this.Ie)}Ee(e,n,r){let i=e.add(n.multiply(xr.fromNumber(r)));return i.compare(dC)===1&&(i=new xr([i.getBits(0),i.getBits(1)],0)),i.modulo(this.Te).toNumber()}de(e){return(this.bitmap[Math.floor(e/8)]&1<<e%8)!=0}mightContain(e){if(this.Ie===0)return!1;const n=gg(e),[r,i]=yg(n);for(let s=0;s<this.hashCount;s++){const o=this.Ee(r,i,s);if(!this.de(o))return!1}return!0}static create(e,n,r){const i=e%8==0?0:8-e%8,s=new Uint8Array(Math.ceil(e/8)),o=new ef(s,i,n);return r.forEach(l=>o.insert(l)),o}insert(e){if(this.Ie===0)return;const n=gg(e),[r,i]=yg(n);for(let s=0;s<this.hashCount;s++){const o=this.Ee(r,i,s);this.Ae(o)}}Ae(e){const n=Math.floor(e/8),r=e%8;this.bitmap[n]|=1<<r}}class ks extends Error{constructor(){super(...arguments),this.name="BloomFilterError"}}/**
 * @license
 * Copyright 2017 Google LLC
 *
 * Licensed under the Apache License, Version 2.0 (the "License");
 * you may not use this file except in compliance with the License.
 * You may obtain a copy of the License at
 *
 *   http://www.apache.org/licenses/LICENSE-2.0
 *
 * Unless required by applicable law or agreed to in writing, software
 * distributed under the License is distributed on an "AS IS" BASIS,
 * WITHOUT WARRANTIES OR CONDITIONS OF ANY KIND, either express or implied.
 * See the License for the specific language governing permissions and
 * limitations under the License.
 */class eu{constructor(e,n,r,i,s){this.snapshotVersion=e,this.targetChanges=n,this.targetMismatches=r,this.documentUpdates=i,this.resolvedLimboDocuments=s}static createSynthesizedRemoteEventForCurrentChange(e,n,r){const i=new Map;return i.set(e,No.createSynthesizedTargetChangeForCurrentChange(e,n,r)),new eu(Z.min(),i,new Ce(ue),xn(),ie())}}class No{constructor(e,n,r,i,s){this.resumeToken=e,this.current=n,this.addedDocuments=r,this.modifiedDocuments=i,this.removedDocuments=s}static createSynthesizedTargetChangeForCurrentChange(e,n,r){return new No(r,n,ie(),ie(),ie())}}/**
 * @license
 * Copyright 2017 Google LLC
 *
 * Licensed under the Apache License, Version 2.0 (the "License");
 * you may not use this file except in compliance with the License.
 * You may obtain a copy of the License at
 *
 *   http://www.apache.org/licenses/LICENSE-2.0
 *
 * Unless required by applicable law or agreed to in writing, software
 * distributed under the License is distributed on an "AS IS" BASIS,
 * WITHOUT WARRANTIES OR CONDITIONS OF ANY KIND, either express or implied.
 * See the License for the specific language governing permissions and
 * limitations under the License.
 */class ja{constructor(e,n,r,i){this.Re=e,this.removedTargetIds=n,this.key=r,this.Ve=i}}class T0{constructor(e,n){this.targetId=e,this.me=n}}class I0{constructor(e,n,r=Qe.EMPTY_BYTE_STRING,i=null){this.state=e,this.targetIds=n,this.resumeToken=r,this.cause=i}}class vg{constructor(){this.fe=0,this.ge=wg(),this.pe=Qe.EMPTY_BYTE_STRING,this.ye=!1,this.we=!0}get current(){return this.ye}get resumeToken(){return this.pe}get Se(){return this.fe!==0}get be(){return this.we}De(e){e.approximateByteSize()>0&&(this.we=!0,this.pe=e)}ve(){let e=ie(),n=ie(),r=ie();return this.ge.forEach((i,s)=>{switch(s){case 0:e=e.add(i);break;case 2:n=n.add(i);break;case 1:r=r.add(i);break;default:J()}}),new No(this.pe,this.ye,e,n,r)}Ce(){this.we=!1,this.ge=wg()}Fe(e,n){this.we=!0,this.ge=this.ge.insert(e,n)}Me(e){this.we=!0,this.ge=this.ge.remove(e)}xe(){this.fe+=1}Oe(){this.fe-=1,pe(this.fe>=0)}Ne(){this.we=!0,this.ye=!0}}class fC{constructor(e){this.Le=e,this.Be=new Map,this.ke=xn(),this.qe=_g(),this.Qe=new Ce(ue)}Ke(e){for(const n of e.Re)e.Ve&&e.Ve.isFoundDocument()?this.$e(n,e.Ve):this.Ue(n,e.key,e.Ve);for(const n of e.removedTargetIds)this.Ue(n,e.key,e.Ve)}We(e){this.forEachTarget(e,n=>{const r=this.Ge(n);switch(e.state){case 0:this.ze(n)&&r.De(e.resumeToken);break;case 1:r.Oe(),r.Se||r.Ce(),r.De(e.resumeToken);break;case 2:r.Oe(),r.Se||this.removeTarget(n);break;case 3:this.ze(n)&&(r.Ne(),r.De(e.resumeToken));break;case 4:this.ze(n)&&(this.je(n),r.De(e.resumeToken));break;default:J()}})}forEachTarget(e,n){e.targetIds.length>0?e.targetIds.forEach(n):this.Be.forEach((r,i)=>{this.ze(i)&&n(i)})}He(e){const n=e.targetId,r=e.me.count,i=this.Je(n);if(i){const s=i.target;if(Ih(s))if(r===0){const o=new K(s.path);this.Ue(n,o,st.newNoDocument(o,Z.min()))}else pe(r===1);else{const o=this.Ye(n);if(o!==r){const l=this.Ze(e),u=l?this.Xe(l,e,o):1;if(u!==0){this.je(n);const h=u===2?"TargetPurposeExistenceFilterMismatchBloom":"TargetPurposeExistenceFilterMismatch";this.Qe=this.Qe.insert(n,h)}}}}}Ze(e){const n=e.me.unchangedNames;if(!n||!n.bits)return null;const{bits:{bitmap:r="",padding:i=0},hashCount:s=0}=n;let o,l;try{o=zr(r).toUint8Array()}catch(u){if(u instanceof t0)return Vi("Decoding the base64 bloom filter in existence filter failed ("+u.message+"); ignoring the bloom filter and falling back to full re-query."),null;throw u}try{l=new ef(o,i,s)}catch(u){return Vi(u instanceof ks?"BloomFilter error: ":"Applying bloom filter failed: ",u),null}return l.Ie===0?null:l}Xe(e,n,r){return n.me.count===r-this.nt(e,n.targetId)?0:2}nt(e,n){const r=this.Le.getRemoteKeysForTarget(n);let i=0;return r.forEach(s=>{const o=this.Le.tt(),l=`projects/${o.projectId}/databases/${o.database}/documents/${s.path.canonicalString()}`;e.mightContain(l)||(this.Ue(n,s,null),i++)}),i}rt(e){const n=new Map;this.Be.forEach((s,o)=>{const l=this.Je(o);if(l){if(s.current&&Ih(l.target)){const u=new K(l.target.path);this.ke.get(u)!==null||this.it(o,u)||this.Ue(o,u,st.newNoDocument(u,e))}s.be&&(n.set(o,s.ve()),s.Ce())}});let r=ie();this.qe.forEach((s,o)=>{let l=!0;o.forEachWhile(u=>{const h=this.Je(u);return!h||h.purpose==="TargetPurposeLimboResolution"||(l=!1,!1)}),l&&(r=r.add(s))}),this.ke.forEach((s,o)=>o.setReadTime(e));const i=new eu(e,n,this.Qe,this.ke,r);return this.ke=xn(),this.qe=_g(),this.Qe=new Ce(ue),i}$e(e,n){if(!this.ze(e))return;const r=this.it(e,n.key)?2:0;this.Ge(e).Fe(n.key,r),this.ke=this.ke.insert(n.key,n),this.qe=this.qe.insert(n.key,this.st(n.key).add(e))}Ue(e,n,r){if(!this.ze(e))return;const i=this.Ge(e);this.it(e,n)?i.Fe(n,1):i.Me(n),this.qe=this.qe.insert(n,this.st(n).delete(e)),r&&(this.ke=this.ke.insert(n,r))}removeTarget(e){this.Be.delete(e)}Ye(e){const n=this.Ge(e).ve();return this.Le.getRemoteKeysForTarget(e).size+n.addedDocuments.size-n.removedDocuments.size}xe(e){this.Ge(e).xe()}Ge(e){let n=this.Be.get(e);return n||(n=new vg,this.Be.set(e,n)),n}st(e){let n=this.qe.get(e);return n||(n=new Ke(ue),this.qe=this.qe.insert(e,n)),n}ze(e){const n=this.Je(e)!==null;return n||H("WatchChangeAggregator","Detected inactive target",e),n}Je(e){const n=this.Be.get(e);return n&&n.Se?null:this.Le.ot(e)}je(e){this.Be.set(e,new vg),this.Le.getRemoteKeysForTarget(e).forEach(n=>{this.Ue(e,n,null)})}it(e,n){return this.Le.getRemoteKeysForTarget(e).has(n)}}function _g(){return new Ce(K.comparator)}function wg(){return new Ce(K.comparator)}const pC={asc:"ASCENDING",desc:"DESCENDING"},mC={"<":"LESS_THAN","<=":"LESS_THAN_OR_EQUAL",">":"GREATER_THAN",">=":"GREATER_THAN_OR_EQUAL","==":"EQUAL","!=":"NOT_EQUAL","array-contains":"ARRAY_CONTAINS",in:"IN","not-in":"NOT_IN","array-contains-any":"ARRAY_CONTAINS_ANY"},gC={and:"AND",or:"OR"};class yC{constructor(e,n){this.databaseId=e,this.useProto3Json=n}}function kh(t,e){return t.useProto3Json||Gl(e)?e:{value:e}}function kl(t,e){return t.useProto3Json?`${new Date(1e3*e.seconds).toISOString().replace(/\.\d*/,"").replace("Z","")}.${("000000000"+e.nanoseconds).slice(-9)}Z`:{seconds:""+e.seconds,nanos:e.nanoseconds}}function S0(t,e){return t.useProto3Json?e.toBase64():e.toUint8Array()}function vC(t,e){return kl(t,e.toTimestamp())}function on(t){return pe(!!t),Z.fromTimestamp(function(n){const r=hr(n);return new Me(r.seconds,r.nanos)}(t))}function tf(t,e){return Ah(t,e).canonicalString()}function Ah(t,e){const n=function(i){return new Te(["projects",i.projectId,"databases",i.database])}(t).child("documents");return e===void 0?n:n.child(e)}function k0(t){const e=Te.fromString(t);return pe(x0(e)),e}function Ch(t,e){return tf(t.databaseId,e.path)}function uc(t,e){const n=k0(e);if(n.get(1)!==t.databaseId.projectId)throw new q(M.INVALID_ARGUMENT,"Tried to deserialize key from different project: "+n.get(1)+" vs "+t.databaseId.projectId);if(n.get(3)!==t.databaseId.database)throw new q(M.INVALID_ARGUMENT,"Tried to deserialize key from different database: "+n.get(3)+" vs "+t.databaseId.database);return new K(C0(n))}function A0(t,e){return tf(t.databaseId,e)}function _C(t){const e=k0(t);return e.length===4?Te.emptyPath():C0(e)}function Rh(t){return new Te(["projects",t.databaseId.projectId,"databases",t.databaseId.database]).canonicalString()}function C0(t){return pe(t.length>4&&t.get(4)==="documents"),t.popFirst(5)}function Eg(t,e,n){return{name:Ch(t,e),fields:n.value.mapValue.fields}}function wC(t,e){let n;if("targetChange"in e){e.targetChange;const r=function(h){return h==="NO_CHANGE"?0:h==="ADD"?1:h==="REMOVE"?2:h==="CURRENT"?3:h==="RESET"?4:J()}(e.targetChange.targetChangeType||"NO_CHANGE"),i=e.targetChange.targetIds||[],s=function(h,f){return h.useProto3Json?(pe(f===void 0||typeof f=="string"),Qe.fromBase64String(f||"")):(pe(f===void 0||f instanceof Buffer||f instanceof Uint8Array),Qe.fromUint8Array(f||new Uint8Array))}(t,e.targetChange.resumeToken),o=e.targetChange.cause,l=o&&function(h){const f=h.code===void 0?M.UNKNOWN:E0(h.code);return new q(f,h.message||"")}(o);n=new I0(r,i,s,l||null)}else if("documentChange"in e){e.documentChange;const r=e.documentChange;r.document,r.document.name,r.document.updateTime;const i=uc(t,r.document.name),s=on(r.document.updateTime),o=r.document.createTime?on(r.document.createTime):Z.min(),l=new Vt({mapValue:{fields:r.document.fields}}),u=st.newFoundDocument(i,s,o,l),h=r.targetIds||[],f=r.removedTargetIds||[];n=new ja(h,f,u.key,u)}else if("documentDelete"in e){e.documentDelete;const r=e.documentDelete;r.document;const i=uc(t,r.document),s=r.readTime?on(r.readTime):Z.min(),o=st.newNoDocument(i,s),l=r.removedTargetIds||[];n=new ja([],l,o.key,o)}else if("documentRemove"in e){e.documentRemove;const r=e.documentRemove;r.document;const i=uc(t,r.document),s=r.removedTargetIds||[];n=new ja([],s,i,null)}else{if(!("filter"in e))return J();{e.filter;const r=e.filter;r.targetId;const{count:i=0,unchangedNames:s}=r,o=new uC(i,s),l=r.targetId;n=new T0(l,o)}}return n}function EC(t,e){let n;if(e instanceof xo)n={update:Eg(t,e.key,e.value)};else if(e instanceof Jd)n={delete:Ch(t,e.key)};else if(e instanceof qr)n={update:Eg(t,e.key,e.data),updateMask:xC(e.fieldMask)};else{if(!(e instanceof oC))return J();n={verify:Ch(t,e.key)}}return e.fieldTransforms.length>0&&(n.updateTransforms=e.fieldTransforms.map(r=>function(s,o){const l=o.transform;if(l instanceof Il)return{fieldPath:o.field.canonicalString(),setToServerValue:"REQUEST_TIME"};if(l instanceof ho)return{fieldPath:o.field.canonicalString(),appendMissingElements:{values:l.elements}};if(l instanceof fo)return{fieldPath:o.field.canonicalString(),removeAllFromArray:{values:l.elements}};if(l instanceof Sl)return{fieldPath:o.field.canonicalString(),increment:l.Pe};throw J()}(0,r))),e.precondition.isNone||(n.currentDocument=function(i,s){return s.updateTime!==void 0?{updateTime:vC(i,s.updateTime)}:s.exists!==void 0?{exists:s.exists}:J()}(t,e.precondition)),n}function TC(t,e){return t&&t.length>0?(pe(e!==void 0),t.map(n=>function(i,s){let o=i.updateTime?on(i.updateTime):on(s);return o.isEqual(Z.min())&&(o=on(s)),new rC(o,i.transformResults||[])}(n,e))):[]}function IC(t,e){return{documents:[A0(t,e.path)]}}function SC(t,e){const n={structuredQuery:{}},r=e.path;let i;e.collectionGroup!==null?(i=r,n.structuredQuery.from=[{collectionId:e.collectionGroup,allDescendants:!0}]):(i=r.popLast(),n.structuredQuery.from=[{collectionId:r.lastSegment()}]),n.parent=A0(t,i);const s=function(h){if(h.length!==0)return P0(ln.create(h,"and"))}(e.filters);s&&(n.structuredQuery.where=s);const o=function(h){if(h.length!==0)return h.map(f=>function(v){return{field:ei(v.field),direction:CC(v.dir)}}(f))}(e.orderBy);o&&(n.structuredQuery.orderBy=o);const l=kh(t,e.limit);return l!==null&&(n.structuredQuery.limit=l),e.startAt&&(n.structuredQuery.startAt=function(h){return{before:h.inclusive,values:h.position}}(e.startAt)),e.endAt&&(n.structuredQuery.endAt=function(h){return{before:!h.inclusive,values:h.position}}(e.endAt)),{_t:n,parent:i}}function kC(t){let e=_C(t.parent);const n=t.structuredQuery,r=n.from?n.from.length:0;let i=null;if(r>0){pe(r===1);const f=n.from[0];f.allDescendants?i=f.collectionId:e=e.child(f.collectionId)}let s=[];n.where&&(s=function(g){const v=R0(g);return v instanceof ln&&s0(v)?v.getFilters():[v]}(n.where));let o=[];n.orderBy&&(o=function(g){return g.map(v=>function(N){return new Tl(ti(N.field),function(V){switch(V){case"ASCENDING":return"asc";case"DESCENDING":return"desc";default:return}}(N.direction))}(v))}(n.orderBy));let l=null;n.limit&&(l=function(g){let v;return v=typeof g=="object"?g.value:g,Gl(v)?null:v}(n.limit));let u=null;n.startAt&&(u=function(g){const v=!!g.before,R=g.values||[];return new El(R,v)}(n.startAt));let h=null;return n.endAt&&(h=function(g){const v=!g.before,R=g.values||[];return new El(R,v)}(n.endAt)),$A(e,i,o,s,l,"F",u,h)}function AC(t,e){const n=function(i){switch(i){case"TargetPurposeListen":return null;case"TargetPurposeExistenceFilterMismatch":return"existence-filter-mismatch";case"TargetPurposeExistenceFilterMismatchBloom":return"existence-filter-mismatch-bloom";case"TargetPurposeLimboResolution":return"limbo-document";default:return J()}}(e.purpose);return n==null?null:{"goog-listen-tags":n}}function R0(t){return t.unaryFilter!==void 0?function(n){switch(n.unaryFilter.op){case"IS_NAN":const r=ti(n.unaryFilter.field);return Oe.create(r,"==",{doubleValue:NaN});case"IS_NULL":const i=ti(n.unaryFilter.field);return Oe.create(i,"==",{nullValue:"NULL_VALUE"});case"IS_NOT_NAN":const s=ti(n.unaryFilter.field);return Oe.create(s,"!=",{doubleValue:NaN});case"IS_NOT_NULL":const o=ti(n.unaryFilter.field);return Oe.create(o,"!=",{nullValue:"NULL_VALUE"});default:return J()}}(t):t.fieldFilter!==void 0?function(n){return Oe.create(ti(n.fieldFilter.field),function(i){switch(i){case"EQUAL":return"==";case"NOT_EQUAL":return"!=";case"GREATER_THAN":return">";case"GREATER_THAN_OR_EQUAL":return">=";case"LESS_THAN":return"<";case"LESS_THAN_OR_EQUAL":return"<=";case"ARRAY_CONTAINS":return"array-contains";case"IN":return"in";case"NOT_IN":return"not-in";case"ARRAY_CONTAINS_ANY":return"array-contains-any";default:return J()}}(n.fieldFilter.op),n.fieldFilter.value)}(t):t.compositeFilter!==void 0?function(n){return ln.create(n.compositeFilter.filters.map(r=>R0(r)),function(i){switch(i){case"AND":return"and";case"OR":return"or";default:return J()}}(n.compositeFilter.op))}(t):J()}function CC(t){return pC[t]}function RC(t){return mC[t]}function PC(t){return gC[t]}function ei(t){return{fieldPath:t.canonicalString()}}function ti(t){return He.fromServerFormat(t.fieldPath)}function P0(t){return t instanceof Oe?function(n){if(n.op==="=="){if(ag(n.value))return{unaryFilter:{field:ei(n.field),op:"IS_NAN"}};if(og(n.value))return{unaryFilter:{field:ei(n.field),op:"IS_NULL"}}}else if(n.op==="!="){if(ag(n.value))return{unaryFilter:{field:ei(n.field),op:"IS_NOT_NAN"}};if(og(n.value))return{unaryFilter:{field:ei(n.field),op:"IS_NOT_NULL"}}}return{fieldFilter:{field:ei(n.field),op:RC(n.op),value:n.value}}}(t):t instanceof ln?function(n){const r=n.getFilters().map(i=>P0(i));return r.length===1?r[0]:{compositeFilter:{op:PC(n.op),filters:r}}}(t):J()}function xC(t){const e=[];return t.fields.forEach(n=>e.push(n.canonicalString())),{fieldPaths:e}}function x0(t){return t.length>=4&&t.get(0)==="projects"&&t.get(2)==="databases"}/**
 * @license
 * Copyright 2017 Google LLC
 *
 * Licensed under the Apache License, Version 2.0 (the "License");
 * you may not use this file except in compliance with the License.
 * You may obtain a copy of the License at
 *
 *   http://www.apache.org/licenses/LICENSE-2.0
 *
 * Unless required by applicable law or agreed to in writing, software
 * distributed under the License is distributed on an "AS IS" BASIS,
 * WITHOUT WARRANTIES OR CONDITIONS OF ANY KIND, either express or implied.
 * See the License for the specific language governing permissions and
 * limitations under the License.
 */class Qn{constructor(e,n,r,i,s=Z.min(),o=Z.min(),l=Qe.EMPTY_BYTE_STRING,u=null){this.target=e,this.targetId=n,this.purpose=r,this.sequenceNumber=i,this.snapshotVersion=s,this.lastLimboFreeSnapshotVersion=o,this.resumeToken=l,this.expectedCount=u}withSequenceNumber(e){return new Qn(this.target,this.targetId,this.purpose,e,this.snapshotVersion,this.lastLimboFreeSnapshotVersion,this.resumeToken,this.expectedCount)}withResumeToken(e,n){return new Qn(this.target,this.targetId,this.purpose,this.sequenceNumber,n,this.lastLimboFreeSnapshotVersion,e,null)}withExpectedCount(e){return new Qn(this.target,this.targetId,this.purpose,this.sequenceNumber,this.snapshotVersion,this.lastLimboFreeSnapshotVersion,this.resumeToken,e)}withLastLimboFreeSnapshotVersion(e){return new Qn(this.target,this.targetId,this.purpose,this.sequenceNumber,this.snapshotVersion,e,this.resumeToken,this.expectedCount)}}/**
 * @license
 * Copyright 2017 Google LLC
 *
 * Licensed under the Apache License, Version 2.0 (the "License");
 * you may not use this file except in compliance with the License.
 * You may obtain a copy of the License at
 *
 *   http://www.apache.org/licenses/LICENSE-2.0
 *
 * Unless required by applicable law or agreed to in writing, software
 * distributed under the License is distributed on an "AS IS" BASIS,
 * WITHOUT WARRANTIES OR CONDITIONS OF ANY KIND, either express or implied.
 * See the License for the specific language governing permissions and
 * limitations under the License.
 */class NC{constructor(e){this.ct=e}}function DC(t){const e=kC({parent:t.parent,structuredQuery:t.structuredQuery});return t.limitType==="LAST"?Sh(e,e.limit,"L"):e}/**
 * @license
 * Copyright 2019 Google LLC
 *
 * Licensed under the Apache License, Version 2.0 (the "License");
 * you may not use this file except in compliance with the License.
 * You may obtain a copy of the License at
 *
 *   http://www.apache.org/licenses/LICENSE-2.0
 *
 * Unless required by applicable law or agreed to in writing, software
 * distributed under the License is distributed on an "AS IS" BASIS,
 * WITHOUT WARRANTIES OR CONDITIONS OF ANY KIND, either express or implied.
 * See the License for the specific language governing permissions and
 * limitations under the License.
 */class VC{constructor(){this.un=new bC}addToCollectionParentIndex(e,n){return this.un.add(n),L.resolve()}getCollectionParents(e,n){return L.resolve(this.un.getEntries(n))}addFieldIndex(e,n){return L.resolve()}deleteFieldIndex(e,n){return L.resolve()}deleteAllFieldIndexes(e){return L.resolve()}createTargetIndexes(e,n){return L.resolve()}getDocumentsMatchingTarget(e,n){return L.resolve(null)}getIndexType(e,n){return L.resolve(0)}getFieldIndexes(e,n){return L.resolve([])}getNextCollectionGroupToUpdate(e){return L.resolve(null)}getMinOffset(e,n){return L.resolve(cr.min())}getMinOffsetFromCollectionGroup(e,n){return L.resolve(cr.min())}updateCollectionGroup(e,n,r){return L.resolve()}updateIndexEntries(e,n){return L.resolve()}}class bC{constructor(){this.index={}}add(e){const n=e.lastSegment(),r=e.popLast(),i=this.index[n]||new Ke(Te.comparator),s=!i.has(r);return this.index[n]=i.add(r),s}has(e){const n=e.lastSegment(),r=e.popLast(),i=this.index[n];return i&&i.has(r)}getEntries(e){return(this.index[e]||new Ke(Te.comparator)).toArray()}}/**
 * @license
 * Copyright 2017 Google LLC
 *
 * Licensed under the Apache License, Version 2.0 (the "License");
 * you may not use this file except in compliance with the License.
 * You may obtain a copy of the License at
 *
 *   http://www.apache.org/licenses/LICENSE-2.0
 *
 * Unless required by applicable law or agreed to in writing, software
 * distributed under the License is distributed on an "AS IS" BASIS,
 * WITHOUT WARRANTIES OR CONDITIONS OF ANY KIND, either express or implied.
 * See the License for the specific language governing permissions and
 * limitations under the License.
 */class Mi{constructor(e){this.Ln=e}next(){return this.Ln+=2,this.Ln}static Bn(){return new Mi(0)}static kn(){return new Mi(-1)}}/**
 * @license
 * Copyright 2017 Google LLC
 *
 * Licensed under the Apache License, Version 2.0 (the "License");
 * you may not use this file except in compliance with the License.
 * You may obtain a copy of the License at
 *
 *   http://www.apache.org/licenses/LICENSE-2.0
 *
 * Unless required by applicable law or agreed to in writing, software
 * distributed under the License is distributed on an "AS IS" BASIS,
 * WITHOUT WARRANTIES OR CONDITIONS OF ANY KIND, either express or implied.
 * See the License for the specific language governing permissions and
 * limitations under the License.
 */class OC{constructor(){this.changes=new Gi(e=>e.toString(),(e,n)=>e.isEqual(n)),this.changesApplied=!1}addEntry(e){this.assertNotApplied(),this.changes.set(e.key,e)}removeEntry(e,n){this.assertNotApplied(),this.changes.set(e,st.newInvalidDocument(e).setReadTime(n))}getEntry(e,n){this.assertNotApplied();const r=this.changes.get(n);return r!==void 0?L.resolve(r):this.getFromCache(e,n)}getEntries(e,n){return this.getAllFromCache(e,n)}apply(e){return this.assertNotApplied(),this.changesApplied=!0,this.applyChanges(e)}assertNotApplied(){}}/**
 * @license
 * Copyright 2017 Google LLC
 *
 * Licensed under the Apache License, Version 2.0 (the "License");
 * you may not use this file except in compliance with the License.
 * You may obtain a copy of the License at
 *
 *   http://www.apache.org/licenses/LICENSE-2.0
 *
 * Unless required by applicable law or agreed to in writing, software
 * distributed under the License is distributed on an "AS IS" BASIS,
 * WITHOUT WARRANTIES OR CONDITIONS OF ANY KIND, either express or implied.
 * See the License for the specific language governing permissions and
 * limitations under the License.
 *//**
 * @license
 * Copyright 2022 Google LLC
 *
 * Licensed under the Apache License, Version 2.0 (the "License");
 * you may not use this file except in compliance with the License.
 * You may obtain a copy of the License at
 *
 *   http://www.apache.org/licenses/LICENSE-2.0
 *
 * Unless required by applicable law or agreed to in writing, software
 * distributed under the License is distributed on an "AS IS" BASIS,
 * WITHOUT WARRANTIES OR CONDITIONS OF ANY KIND, either express or implied.
 * See the License for the specific language governing permissions and
 * limitations under the License.
 */class LC{constructor(e,n){this.overlayedDocument=e,this.mutatedFields=n}}/**
 * @license
 * Copyright 2017 Google LLC
 *
 * Licensed under the Apache License, Version 2.0 (the "License");
 * you may not use this file except in compliance with the License.
 * You may obtain a copy of the License at
 *
 *   http://www.apache.org/licenses/LICENSE-2.0
 *
 * Unless required by applicable law or agreed to in writing, software
 * distributed under the License is distributed on an "AS IS" BASIS,
 * WITHOUT WARRANTIES OR CONDITIONS OF ANY KIND, either express or implied.
 * See the License for the specific language governing permissions and
 * limitations under the License.
 */class MC{constructor(e,n,r,i){this.remoteDocumentCache=e,this.mutationQueue=n,this.documentOverlayCache=r,this.indexManager=i}getDocument(e,n){let r=null;return this.documentOverlayCache.getOverlay(e,n).next(i=>(r=i,this.remoteDocumentCache.getEntry(e,n))).next(i=>(r!==null&&Bs(r.mutation,i,$t.empty(),Me.now()),i))}getDocuments(e,n){return this.remoteDocumentCache.getEntries(e,n).next(r=>this.getLocalViewOfDocuments(e,r,ie()).next(()=>r))}getLocalViewOfDocuments(e,n,r=ie()){const i=Cr();return this.populateOverlays(e,i,n).next(()=>this.computeViews(e,n,i,r).next(s=>{let o=Ss();return s.forEach((l,u)=>{o=o.insert(l,u.overlayedDocument)}),o}))}getOverlayedDocuments(e,n){const r=Cr();return this.populateOverlays(e,r,n).next(()=>this.computeViews(e,n,r,ie()))}populateOverlays(e,n,r){const i=[];return r.forEach(s=>{n.has(s)||i.push(s)}),this.documentOverlayCache.getOverlays(e,i).next(s=>{s.forEach((o,l)=>{n.set(o,l)})})}computeViews(e,n,r,i){let s=xn();const o=Us(),l=function(){return Us()}();return n.forEach((u,h)=>{const f=r.get(h.key);i.has(h.key)&&(f===void 0||f.mutation instanceof qr)?s=s.insert(h.key,h):f!==void 0?(o.set(h.key,f.mutation.getFieldMask()),Bs(f.mutation,h,f.mutation.getFieldMask(),Me.now())):o.set(h.key,$t.empty())}),this.recalculateAndSaveOverlays(e,s).next(u=>(u.forEach((h,f)=>o.set(h,f)),n.forEach((h,f)=>{var g;return l.set(h,new LC(f,(g=o.get(h))!==null&&g!==void 0?g:null))}),l))}recalculateAndSaveOverlays(e,n){const r=Us();let i=new Ce((o,l)=>o-l),s=ie();return this.mutationQueue.getAllMutationBatchesAffectingDocumentKeys(e,n).next(o=>{for(const l of o)l.keys().forEach(u=>{const h=n.get(u);if(h===null)return;let f=r.get(u)||$t.empty();f=l.applyToLocalView(h,f),r.set(u,f);const g=(i.get(l.batchId)||ie()).add(u);i=i.insert(l.batchId,g)})}).next(()=>{const o=[],l=i.getReverseIterator();for(;l.hasNext();){const u=l.getNext(),h=u.key,f=u.value,g=f0();f.forEach(v=>{if(!s.has(v)){const R=_0(n.get(v),r.get(v));R!==null&&g.set(v,R),s=s.add(v)}}),o.push(this.documentOverlayCache.saveOverlays(e,h,g))}return L.waitFor(o)}).next(()=>r)}recalculateAndSaveOverlaysForDocumentKeys(e,n){return this.remoteDocumentCache.getEntries(e,n).next(r=>this.recalculateAndSaveOverlays(e,r))}getDocumentsMatchingQuery(e,n,r,i){return function(o){return K.isDocumentKey(o.path)&&o.collectionGroup===null&&o.filters.length===0}(n)?this.getDocumentsMatchingDocumentQuery(e,n.path):WA(n)?this.getDocumentsMatchingCollectionGroupQuery(e,n,r,i):this.getDocumentsMatchingCollectionQuery(e,n,r,i)}getNextDocuments(e,n,r,i){return this.remoteDocumentCache.getAllFromCollectionGroup(e,n,r,i).next(s=>{const o=i-s.size>0?this.documentOverlayCache.getOverlaysForCollectionGroup(e,n,r.largestBatchId,i-s.size):L.resolve(Cr());let l=-1,u=s;return o.next(h=>L.forEach(h,(f,g)=>(l<g.largestBatchId&&(l=g.largestBatchId),s.get(f)?L.resolve():this.remoteDocumentCache.getEntry(e,f).next(v=>{u=u.insert(f,v)}))).next(()=>this.populateOverlays(e,h,s)).next(()=>this.computeViews(e,u,h,ie())).next(f=>({batchId:l,changes:d0(f)})))})}getDocumentsMatchingDocumentQuery(e,n){return this.getDocument(e,new K(n)).next(r=>{let i=Ss();return r.isFoundDocument()&&(i=i.insert(r.key,r)),i})}getDocumentsMatchingCollectionGroupQuery(e,n,r,i){const s=n.collectionGroup;let o=Ss();return this.indexManager.getCollectionParents(e,s).next(l=>L.forEach(l,u=>{const h=function(g,v){return new Ql(v,null,g.explicitOrderBy.slice(),g.filters.slice(),g.limit,g.limitType,g.startAt,g.endAt)}(n,u.child(s));return this.getDocumentsMatchingCollectionQuery(e,h,r,i).next(f=>{f.forEach((g,v)=>{o=o.insert(g,v)})})}).next(()=>o))}getDocumentsMatchingCollectionQuery(e,n,r,i){let s;return this.documentOverlayCache.getOverlaysForCollection(e,n.path,r.largestBatchId).next(o=>(s=o,this.remoteDocumentCache.getDocumentsMatchingQuery(e,n,r,s,i))).next(o=>{s.forEach((u,h)=>{const f=h.getKey();o.get(f)===null&&(o=o.insert(f,st.newInvalidDocument(f)))});let l=Ss();return o.forEach((u,h)=>{const f=s.get(u);f!==void 0&&Bs(f.mutation,h,$t.empty(),Me.now()),Xl(n,h)&&(l=l.insert(u,h))}),l})}}/**
 * @license
 * Copyright 2020 Google LLC
 *
 * Licensed under the Apache License, Version 2.0 (the "License");
 * you may not use this file except in compliance with the License.
 * You may obtain a copy of the License at
 *
 *   http://www.apache.org/licenses/LICENSE-2.0
 *
 * Unless required by applicable law or agreed to in writing, software
 * distributed under the License is distributed on an "AS IS" BASIS,
 * WITHOUT WARRANTIES OR CONDITIONS OF ANY KIND, either express or implied.
 * See the License for the specific language governing permissions and
 * limitations under the License.
 */class FC{constructor(e){this.serializer=e,this.hr=new Map,this.Pr=new Map}getBundleMetadata(e,n){return L.resolve(this.hr.get(n))}saveBundleMetadata(e,n){return this.hr.set(n.id,function(i){return{id:i.id,version:i.version,createTime:on(i.createTime)}}(n)),L.resolve()}getNamedQuery(e,n){return L.resolve(this.Pr.get(n))}saveNamedQuery(e,n){return this.Pr.set(n.name,function(i){return{name:i.name,query:DC(i.bundledQuery),readTime:on(i.readTime)}}(n)),L.resolve()}}/**
 * @license
 * Copyright 2022 Google LLC
 *
 * Licensed under the Apache License, Version 2.0 (the "License");
 * you may not use this file except in compliance with the License.
 * You may obtain a copy of the License at
 *
 *   http://www.apache.org/licenses/LICENSE-2.0
 *
 * Unless required by applicable law or agreed to in writing, software
 * distributed under the License is distributed on an "AS IS" BASIS,
 * WITHOUT WARRANTIES OR CONDITIONS OF ANY KIND, either express or implied.
 * See the License for the specific language governing permissions and
 * limitations under the License.
 */class jC{constructor(){this.overlays=new Ce(K.comparator),this.Ir=new Map}getOverlay(e,n){return L.resolve(this.overlays.get(n))}getOverlays(e,n){const r=Cr();return L.forEach(n,i=>this.getOverlay(e,i).next(s=>{s!==null&&r.set(i,s)})).next(()=>r)}saveOverlays(e,n,r){return r.forEach((i,s)=>{this.ht(e,n,s)}),L.resolve()}removeOverlaysForBatchId(e,n,r){const i=this.Ir.get(r);return i!==void 0&&(i.forEach(s=>this.overlays=this.overlays.remove(s)),this.Ir.delete(r)),L.resolve()}getOverlaysForCollection(e,n,r){const i=Cr(),s=n.length+1,o=new K(n.child("")),l=this.overlays.getIteratorFrom(o);for(;l.hasNext();){const u=l.getNext().value,h=u.getKey();if(!n.isPrefixOf(h.path))break;h.path.length===s&&u.largestBatchId>r&&i.set(u.getKey(),u)}return L.resolve(i)}getOverlaysForCollectionGroup(e,n,r,i){let s=new Ce((h,f)=>h-f);const o=this.overlays.getIterator();for(;o.hasNext();){const h=o.getNext().value;if(h.getKey().getCollectionGroup()===n&&h.largestBatchId>r){let f=s.get(h.largestBatchId);f===null&&(f=Cr(),s=s.insert(h.largestBatchId,f)),f.set(h.getKey(),h)}}const l=Cr(),u=s.getIterator();for(;u.hasNext()&&(u.getNext().value.forEach((h,f)=>l.set(h,f)),!(l.size()>=i)););return L.resolve(l)}ht(e,n,r){const i=this.overlays.get(r.key);if(i!==null){const o=this.Ir.get(i.largestBatchId).delete(r.key);this.Ir.set(i.largestBatchId,o)}this.overlays=this.overlays.insert(r.key,new lC(n,r));let s=this.Ir.get(n);s===void 0&&(s=ie(),this.Ir.set(n,s)),this.Ir.set(n,s.add(r.key))}}/**
 * @license
 * Copyright 2024 Google LLC
 *
 * Licensed under the Apache License, Version 2.0 (the "License");
 * you may not use this file except in compliance with the License.
 * You may obtain a copy of the License at
 *
 *   http://www.apache.org/licenses/LICENSE-2.0
 *
 * Unless required by applicable law or agreed to in writing, software
 * distributed under the License is distributed on an "AS IS" BASIS,
 * WITHOUT WARRANTIES OR CONDITIONS OF ANY KIND, either express or implied.
 * See the License for the specific language governing permissions and
 * limitations under the License.
 */class UC{constructor(){this.sessionToken=Qe.EMPTY_BYTE_STRING}getSessionToken(e){return L.resolve(this.sessionToken)}setSessionToken(e,n){return this.sessionToken=n,L.resolve()}}/**
 * @license
 * Copyright 2017 Google LLC
 *
 * Licensed under the Apache License, Version 2.0 (the "License");
 * you may not use this file except in compliance with the License.
 * You may obtain a copy of the License at
 *
 *   http://www.apache.org/licenses/LICENSE-2.0
 *
 * Unless required by applicable law or agreed to in writing, software
 * distributed under the License is distributed on an "AS IS" BASIS,
 * WITHOUT WARRANTIES OR CONDITIONS OF ANY KIND, either express or implied.
 * See the License for the specific language governing permissions and
 * limitations under the License.
 */class nf{constructor(){this.Tr=new Ke(je.Er),this.dr=new Ke(je.Ar)}isEmpty(){return this.Tr.isEmpty()}addReference(e,n){const r=new je(e,n);this.Tr=this.Tr.add(r),this.dr=this.dr.add(r)}Rr(e,n){e.forEach(r=>this.addReference(r,n))}removeReference(e,n){this.Vr(new je(e,n))}mr(e,n){e.forEach(r=>this.removeReference(r,n))}gr(e){const n=new K(new Te([])),r=new je(n,e),i=new je(n,e+1),s=[];return this.dr.forEachInRange([r,i],o=>{this.Vr(o),s.push(o.key)}),s}pr(){this.Tr.forEach(e=>this.Vr(e))}Vr(e){this.Tr=this.Tr.delete(e),this.dr=this.dr.delete(e)}yr(e){const n=new K(new Te([])),r=new je(n,e),i=new je(n,e+1);let s=ie();return this.dr.forEachInRange([r,i],o=>{s=s.add(o.key)}),s}containsKey(e){const n=new je(e,0),r=this.Tr.firstAfterOrEqual(n);return r!==null&&e.isEqual(r.key)}}class je{constructor(e,n){this.key=e,this.wr=n}static Er(e,n){return K.comparator(e.key,n.key)||ue(e.wr,n.wr)}static Ar(e,n){return ue(e.wr,n.wr)||K.comparator(e.key,n.key)}}/**
 * @license
 * Copyright 2017 Google LLC
 *
 * Licensed under the Apache License, Version 2.0 (the "License");
 * you may not use this file except in compliance with the License.
 * You may obtain a copy of the License at
 *
 *   http://www.apache.org/licenses/LICENSE-2.0
 *
 * Unless required by applicable law or agreed to in writing, software
 * distributed under the License is distributed on an "AS IS" BASIS,
 * WITHOUT WARRANTIES OR CONDITIONS OF ANY KIND, either express or implied.
 * See the License for the specific language governing permissions and
 * limitations under the License.
 */class BC{constructor(e,n){this.indexManager=e,this.referenceDelegate=n,this.mutationQueue=[],this.Sr=1,this.br=new Ke(je.Er)}checkEmpty(e){return L.resolve(this.mutationQueue.length===0)}addMutationBatch(e,n,r,i){const s=this.Sr;this.Sr++,this.mutationQueue.length>0&&this.mutationQueue[this.mutationQueue.length-1];const o=new aC(s,n,r,i);this.mutationQueue.push(o);for(const l of i)this.br=this.br.add(new je(l.key,s)),this.indexManager.addToCollectionParentIndex(e,l.key.path.popLast());return L.resolve(o)}lookupMutationBatch(e,n){return L.resolve(this.Dr(n))}getNextMutationBatchAfterBatchId(e,n){const r=n+1,i=this.vr(r),s=i<0?0:i;return L.resolve(this.mutationQueue.length>s?this.mutationQueue[s]:null)}getHighestUnacknowledgedBatchId(){return L.resolve(this.mutationQueue.length===0?-1:this.Sr-1)}getAllMutationBatches(e){return L.resolve(this.mutationQueue.slice())}getAllMutationBatchesAffectingDocumentKey(e,n){const r=new je(n,0),i=new je(n,Number.POSITIVE_INFINITY),s=[];return this.br.forEachInRange([r,i],o=>{const l=this.Dr(o.wr);s.push(l)}),L.resolve(s)}getAllMutationBatchesAffectingDocumentKeys(e,n){let r=new Ke(ue);return n.forEach(i=>{const s=new je(i,0),o=new je(i,Number.POSITIVE_INFINITY);this.br.forEachInRange([s,o],l=>{r=r.add(l.wr)})}),L.resolve(this.Cr(r))}getAllMutationBatchesAffectingQuery(e,n){const r=n.path,i=r.length+1;let s=r;K.isDocumentKey(s)||(s=s.child(""));const o=new je(new K(s),0);let l=new Ke(ue);return this.br.forEachWhile(u=>{const h=u.key.path;return!!r.isPrefixOf(h)&&(h.length===i&&(l=l.add(u.wr)),!0)},o),L.resolve(this.Cr(l))}Cr(e){const n=[];return e.forEach(r=>{const i=this.Dr(r);i!==null&&n.push(i)}),n}removeMutationBatch(e,n){pe(this.Fr(n.batchId,"removed")===0),this.mutationQueue.shift();let r=this.br;return L.forEach(n.mutations,i=>{const s=new je(i.key,n.batchId);return r=r.delete(s),this.referenceDelegate.markPotentiallyOrphaned(e,i.key)}).next(()=>{this.br=r})}On(e){}containsKey(e,n){const r=new je(n,0),i=this.br.firstAfterOrEqual(r);return L.resolve(n.isEqual(i&&i.key))}performConsistencyCheck(e){return this.mutationQueue.length,L.resolve()}Fr(e,n){return this.vr(e)}vr(e){return this.mutationQueue.length===0?0:e-this.mutationQueue[0].batchId}Dr(e){const n=this.vr(e);return n<0||n>=this.mutationQueue.length?null:this.mutationQueue[n]}}/**
 * @license
 * Copyright 2017 Google LLC
 *
 * Licensed under the Apache License, Version 2.0 (the "License");
 * you may not use this file except in compliance with the License.
 * You may obtain a copy of the License at
 *
 *   http://www.apache.org/licenses/LICENSE-2.0
 *
 * Unless required by applicable law or agreed to in writing, software
 * distributed under the License is distributed on an "AS IS" BASIS,
 * WITHOUT WARRANTIES OR CONDITIONS OF ANY KIND, either express or implied.
 * See the License for the specific language governing permissions and
 * limitations under the License.
 */class zC{constructor(e){this.Mr=e,this.docs=function(){return new Ce(K.comparator)}(),this.size=0}setIndexManager(e){this.indexManager=e}addEntry(e,n){const r=n.key,i=this.docs.get(r),s=i?i.size:0,o=this.Mr(n);return this.docs=this.docs.insert(r,{document:n.mutableCopy(),size:o}),this.size+=o-s,this.indexManager.addToCollectionParentIndex(e,r.path.popLast())}removeEntry(e){const n=this.docs.get(e);n&&(this.docs=this.docs.remove(e),this.size-=n.size)}getEntry(e,n){const r=this.docs.get(n);return L.resolve(r?r.document.mutableCopy():st.newInvalidDocument(n))}getEntries(e,n){let r=xn();return n.forEach(i=>{const s=this.docs.get(i);r=r.insert(i,s?s.document.mutableCopy():st.newInvalidDocument(i))}),L.resolve(r)}getDocumentsMatchingQuery(e,n,r,i){let s=xn();const o=n.path,l=new K(o.child("")),u=this.docs.getIteratorFrom(l);for(;u.hasNext();){const{key:h,value:{document:f}}=u.getNext();if(!o.isPrefixOf(h.path))break;h.path.length>o.length+1||SA(IA(f),r)<=0||(i.has(f.key)||Xl(n,f))&&(s=s.insert(f.key,f.mutableCopy()))}return L.resolve(s)}getAllFromCollectionGroup(e,n,r,i){J()}Or(e,n){return L.forEach(this.docs,r=>n(r))}newChangeBuffer(e){return new $C(this)}getSize(e){return L.resolve(this.size)}}class $C extends OC{constructor(e){super(),this.cr=e}applyChanges(e){const n=[];return this.changes.forEach((r,i)=>{i.isValidDocument()?n.push(this.cr.addEntry(e,i)):this.cr.removeEntry(r)}),L.waitFor(n)}getFromCache(e,n){return this.cr.getEntry(e,n)}getAllFromCache(e,n){return this.cr.getEntries(e,n)}}/**
 * @license
 * Copyright 2017 Google LLC
 *
 * Licensed under the Apache License, Version 2.0 (the "License");
 * you may not use this file except in compliance with the License.
 * You may obtain a copy of the License at
 *
 *   http://www.apache.org/licenses/LICENSE-2.0
 *
 * Unless required by applicable law or agreed to in writing, software
 * distributed under the License is distributed on an "AS IS" BASIS,
 * WITHOUT WARRANTIES OR CONDITIONS OF ANY KIND, either express or implied.
 * See the License for the specific language governing permissions and
 * limitations under the License.
 */class WC{constructor(e){this.persistence=e,this.Nr=new Gi(n=>Gd(n),Qd),this.lastRemoteSnapshotVersion=Z.min(),this.highestTargetId=0,this.Lr=0,this.Br=new nf,this.targetCount=0,this.kr=Mi.Bn()}forEachTarget(e,n){return this.Nr.forEach((r,i)=>n(i)),L.resolve()}getLastRemoteSnapshotVersion(e){return L.resolve(this.lastRemoteSnapshotVersion)}getHighestSequenceNumber(e){return L.resolve(this.Lr)}allocateTargetId(e){return this.highestTargetId=this.kr.next(),L.resolve(this.highestTargetId)}setTargetsMetadata(e,n,r){return r&&(this.lastRemoteSnapshotVersion=r),n>this.Lr&&(this.Lr=n),L.resolve()}Kn(e){this.Nr.set(e.target,e);const n=e.targetId;n>this.highestTargetId&&(this.kr=new Mi(n),this.highestTargetId=n),e.sequenceNumber>this.Lr&&(this.Lr=e.sequenceNumber)}addTargetData(e,n){return this.Kn(n),this.targetCount+=1,L.resolve()}updateTargetData(e,n){return this.Kn(n),L.resolve()}removeTargetData(e,n){return this.Nr.delete(n.target),this.Br.gr(n.targetId),this.targetCount-=1,L.resolve()}removeTargets(e,n,r){let i=0;const s=[];return this.Nr.forEach((o,l)=>{l.sequenceNumber<=n&&r.get(l.targetId)===null&&(this.Nr.delete(o),s.push(this.removeMatchingKeysForTargetId(e,l.targetId)),i++)}),L.waitFor(s).next(()=>i)}getTargetCount(e){return L.resolve(this.targetCount)}getTargetData(e,n){const r=this.Nr.get(n)||null;return L.resolve(r)}addMatchingKeys(e,n,r){return this.Br.Rr(n,r),L.resolve()}removeMatchingKeys(e,n,r){this.Br.mr(n,r);const i=this.persistence.referenceDelegate,s=[];return i&&n.forEach(o=>{s.push(i.markPotentiallyOrphaned(e,o))}),L.waitFor(s)}removeMatchingKeysForTargetId(e,n){return this.Br.gr(n),L.resolve()}getMatchingKeysForTargetId(e,n){const r=this.Br.yr(n);return L.resolve(r)}containsKey(e,n){return L.resolve(this.Br.containsKey(n))}}/**
 * @license
 * Copyright 2017 Google LLC
 *
 * Licensed under the Apache License, Version 2.0 (the "License");
 * you may not use this file except in compliance with the License.
 * You may obtain a copy of the License at
 *
 *   http://www.apache.org/licenses/LICENSE-2.0
 *
 * Unless required by applicable law or agreed to in writing, software
 * distributed under the License is distributed on an "AS IS" BASIS,
 * WITHOUT WARRANTIES OR CONDITIONS OF ANY KIND, either express or implied.
 * See the License for the specific language governing permissions and
 * limitations under the License.
 */class HC{constructor(e,n){this.qr={},this.overlays={},this.Qr=new Wd(0),this.Kr=!1,this.Kr=!0,this.$r=new UC,this.referenceDelegate=e(this),this.Ur=new WC(this),this.indexManager=new VC,this.remoteDocumentCache=function(i){return new zC(i)}(r=>this.referenceDelegate.Wr(r)),this.serializer=new NC(n),this.Gr=new FC(this.serializer)}start(){return Promise.resolve()}shutdown(){return this.Kr=!1,Promise.resolve()}get started(){return this.Kr}setDatabaseDeletedListener(){}setNetworkEnabled(){}getIndexManager(e){return this.indexManager}getDocumentOverlayCache(e){let n=this.overlays[e.toKey()];return n||(n=new jC,this.overlays[e.toKey()]=n),n}getMutationQueue(e,n){let r=this.qr[e.toKey()];return r||(r=new BC(n,this.referenceDelegate),this.qr[e.toKey()]=r),r}getGlobalsCache(){return this.$r}getTargetCache(){return this.Ur}getRemoteDocumentCache(){return this.remoteDocumentCache}getBundleCache(){return this.Gr}runTransaction(e,n,r){H("MemoryPersistence","Starting transaction:",e);const i=new qC(this.Qr.next());return this.referenceDelegate.zr(),r(i).next(s=>this.referenceDelegate.jr(i).next(()=>s)).toPromise().then(s=>(i.raiseOnCommittedEvent(),s))}Hr(e,n){return L.or(Object.values(this.qr).map(r=>()=>r.containsKey(e,n)))}}class qC extends AA{constructor(e){super(),this.currentSequenceNumber=e}}class rf{constructor(e){this.persistence=e,this.Jr=new nf,this.Yr=null}static Zr(e){return new rf(e)}get Xr(){if(this.Yr)return this.Yr;throw J()}addReference(e,n,r){return this.Jr.addReference(r,n),this.Xr.delete(r.toString()),L.resolve()}removeReference(e,n,r){return this.Jr.removeReference(r,n),this.Xr.add(r.toString()),L.resolve()}markPotentiallyOrphaned(e,n){return this.Xr.add(n.toString()),L.resolve()}removeTarget(e,n){this.Jr.gr(n.targetId).forEach(i=>this.Xr.add(i.toString()));const r=this.persistence.getTargetCache();return r.getMatchingKeysForTargetId(e,n.targetId).next(i=>{i.forEach(s=>this.Xr.add(s.toString()))}).next(()=>r.removeTargetData(e,n))}zr(){this.Yr=new Set}jr(e){const n=this.persistence.getRemoteDocumentCache().newChangeBuffer();return L.forEach(this.Xr,r=>{const i=K.fromPath(r);return this.ei(e,i).next(s=>{s||n.removeEntry(i,Z.min())})}).next(()=>(this.Yr=null,n.apply(e)))}updateLimboDocument(e,n){return this.ei(e,n).next(r=>{r?this.Xr.delete(n.toString()):this.Xr.add(n.toString())})}Wr(e){return 0}ei(e,n){return L.or([()=>L.resolve(this.Jr.containsKey(n)),()=>this.persistence.getTargetCache().containsKey(e,n),()=>this.persistence.Hr(e,n)])}}/**
 * @license
 * Copyright 2017 Google LLC
 *
 * Licensed under the Apache License, Version 2.0 (the "License");
 * you may not use this file except in compliance with the License.
 * You may obtain a copy of the License at
 *
 *   http://www.apache.org/licenses/LICENSE-2.0
 *
 * Unless required by applicable law or agreed to in writing, software
 * distributed under the License is distributed on an "AS IS" BASIS,
 * WITHOUT WARRANTIES OR CONDITIONS OF ANY KIND, either express or implied.
 * See the License for the specific language governing permissions and
 * limitations under the License.
 */class sf{constructor(e,n,r,i){this.targetId=e,this.fromCache=n,this.$i=r,this.Ui=i}static Wi(e,n){let r=ie(),i=ie();for(const s of n.docChanges)switch(s.type){case 0:r=r.add(s.doc.key);break;case 1:i=i.add(s.doc.key)}return new sf(e,n.fromCache,r,i)}}/**
 * @license
 * Copyright 2023 Google LLC
 *
 * Licensed under the Apache License, Version 2.0 (the "License");
 * you may not use this file except in compliance with the License.
 * You may obtain a copy of the License at
 *
 *   http://www.apache.org/licenses/LICENSE-2.0
 *
 * Unless required by applicable law or agreed to in writing, software
 * distributed under the License is distributed on an "AS IS" BASIS,
 * WITHOUT WARRANTIES OR CONDITIONS OF ANY KIND, either express or implied.
 * See the License for the specific language governing permissions and
 * limitations under the License.
 */class KC{constructor(){this._documentReadCount=0}get documentReadCount(){return this._documentReadCount}incrementDocumentReadCount(e){this._documentReadCount+=e}}/**
 * @license
 * Copyright 2019 Google LLC
 *
 * Licensed under the Apache License, Version 2.0 (the "License");
 * you may not use this file except in compliance with the License.
 * You may obtain a copy of the License at
 *
 *   http://www.apache.org/licenses/LICENSE-2.0
 *
 * Unless required by applicable law or agreed to in writing, software
 * distributed under the License is distributed on an "AS IS" BASIS,
 * WITHOUT WARRANTIES OR CONDITIONS OF ANY KIND, either express or implied.
 * See the License for the specific language governing permissions and
 * limitations under the License.
 */class GC{constructor(){this.Gi=!1,this.zi=!1,this.ji=100,this.Hi=function(){return K1()?8:CA(at())>0?6:4}()}initialize(e,n){this.Ji=e,this.indexManager=n,this.Gi=!0}getDocumentsMatchingQuery(e,n,r,i){const s={result:null};return this.Yi(e,n).next(o=>{s.result=o}).next(()=>{if(!s.result)return this.Zi(e,n,i,r).next(o=>{s.result=o})}).next(()=>{if(s.result)return;const o=new KC;return this.Xi(e,n,o).next(l=>{if(s.result=l,this.zi)return this.es(e,n,o,l.size)})}).next(()=>s.result)}es(e,n,r,i){return r.documentReadCount<this.ji?(ys()<=se.DEBUG&&H("QueryEngine","SDK will not create cache indexes for query:",Zr(n),"since it only creates cache indexes for collection contains","more than or equal to",this.ji,"documents"),L.resolve()):(ys()<=se.DEBUG&&H("QueryEngine","Query:",Zr(n),"scans",r.documentReadCount,"local documents and returns",i,"documents as results."),r.documentReadCount>this.Hi*i?(ys()<=se.DEBUG&&H("QueryEngine","The SDK decides to create cache indexes for query:",Zr(n),"as using cache indexes may help improve performance."),this.indexManager.createTargetIndexes(e,rn(n))):L.resolve())}Yi(e,n){if(hg(n))return L.resolve(null);let r=rn(n);return this.indexManager.getIndexType(e,r).next(i=>i===0?null:(n.limit!==null&&i===1&&(n=Sh(n,null,"F"),r=rn(n)),this.indexManager.getDocumentsMatchingTarget(e,r).next(s=>{const o=ie(...s);return this.Ji.getDocuments(e,o).next(l=>this.indexManager.getMinOffset(e,r).next(u=>{const h=this.ts(n,l);return this.ns(n,h,o,u.readTime)?this.Yi(e,Sh(n,null,"F")):this.rs(e,h,n,u)}))})))}Zi(e,n,r,i){return hg(n)||i.isEqual(Z.min())?L.resolve(null):this.Ji.getDocuments(e,r).next(s=>{const o=this.ts(n,s);return this.ns(n,o,r,i)?L.resolve(null):(ys()<=se.DEBUG&&H("QueryEngine","Re-using previous result from %s to execute query: %s",i.toString(),Zr(n)),this.rs(e,o,n,TA(i,-1)).next(l=>l))})}ts(e,n){let r=new Ke(c0(e));return n.forEach((i,s)=>{Xl(e,s)&&(r=r.add(s))}),r}ns(e,n,r,i){if(e.limit===null)return!1;if(r.size!==n.size)return!0;const s=e.limitType==="F"?n.last():n.first();return!!s&&(s.hasPendingWrites||s.version.compareTo(i)>0)}Xi(e,n,r){return ys()<=se.DEBUG&&H("QueryEngine","Using full collection scan to execute query:",Zr(n)),this.Ji.getDocumentsMatchingQuery(e,n,cr.min(),r)}rs(e,n,r,i){return this.Ji.getDocumentsMatchingQuery(e,r,i).next(s=>(n.forEach(o=>{s=s.insert(o.key,o)}),s))}}/**
 * @license
 * Copyright 2020 Google LLC
 *
 * Licensed under the Apache License, Version 2.0 (the "License");
 * you may not use this file except in compliance with the License.
 * You may obtain a copy of the License at
 *
 *   http://www.apache.org/licenses/LICENSE-2.0
 *
 * Unless required by applicable law or agreed to in writing, software
 * distributed under the License is distributed on an "AS IS" BASIS,
 * WITHOUT WARRANTIES OR CONDITIONS OF ANY KIND, either express or implied.
 * See the License for the specific language governing permissions and
 * limitations under the License.
 */class QC{constructor(e,n,r,i){this.persistence=e,this.ss=n,this.serializer=i,this.os=new Ce(ue),this._s=new Gi(s=>Gd(s),Qd),this.us=new Map,this.cs=e.getRemoteDocumentCache(),this.Ur=e.getTargetCache(),this.Gr=e.getBundleCache(),this.ls(r)}ls(e){this.documentOverlayCache=this.persistence.getDocumentOverlayCache(e),this.indexManager=this.persistence.getIndexManager(e),this.mutationQueue=this.persistence.getMutationQueue(e,this.indexManager),this.localDocuments=new MC(this.cs,this.mutationQueue,this.documentOverlayCache,this.indexManager),this.cs.setIndexManager(this.indexManager),this.ss.initialize(this.localDocuments,this.indexManager)}collectGarbage(e){return this.persistence.runTransaction("Collect garbage","readwrite-primary",n=>e.collect(n,this.os))}}function YC(t,e,n,r){return new QC(t,e,n,r)}async function N0(t,e){const n=ee(t);return await n.persistence.runTransaction("Handle user change","readonly",r=>{let i;return n.mutationQueue.getAllMutationBatches(r).next(s=>(i=s,n.ls(e),n.mutationQueue.getAllMutationBatches(r))).next(s=>{const o=[],l=[];let u=ie();for(const h of i){o.push(h.batchId);for(const f of h.mutations)u=u.add(f.key)}for(const h of s){l.push(h.batchId);for(const f of h.mutations)u=u.add(f.key)}return n.localDocuments.getDocuments(r,u).next(h=>({hs:h,removedBatchIds:o,addedBatchIds:l}))})})}function XC(t,e){const n=ee(t);return n.persistence.runTransaction("Acknowledge batch","readwrite-primary",r=>{const i=e.batch.keys(),s=n.cs.newChangeBuffer({trackRemovals:!0});return function(l,u,h,f){const g=h.batch,v=g.keys();let R=L.resolve();return v.forEach(N=>{R=R.next(()=>f.getEntry(u,N)).next(D=>{const V=h.docVersions.get(N);pe(V!==null),D.version.compareTo(V)<0&&(g.applyToRemoteDocument(D,h),D.isValidDocument()&&(D.setReadTime(h.commitVersion),f.addEntry(D)))})}),R.next(()=>l.mutationQueue.removeMutationBatch(u,g))}(n,r,e,s).next(()=>s.apply(r)).next(()=>n.mutationQueue.performConsistencyCheck(r)).next(()=>n.documentOverlayCache.removeOverlaysForBatchId(r,i,e.batch.batchId)).next(()=>n.localDocuments.recalculateAndSaveOverlaysForDocumentKeys(r,function(l){let u=ie();for(let h=0;h<l.mutationResults.length;++h)l.mutationResults[h].transformResults.length>0&&(u=u.add(l.batch.mutations[h].key));return u}(e))).next(()=>n.localDocuments.getDocuments(r,i))})}function D0(t){const e=ee(t);return e.persistence.runTransaction("Get last remote snapshot version","readonly",n=>e.Ur.getLastRemoteSnapshotVersion(n))}function JC(t,e){const n=ee(t),r=e.snapshotVersion;let i=n.os;return n.persistence.runTransaction("Apply remote event","readwrite-primary",s=>{const o=n.cs.newChangeBuffer({trackRemovals:!0});i=n.os;const l=[];e.targetChanges.forEach((f,g)=>{const v=i.get(g);if(!v)return;l.push(n.Ur.removeMatchingKeys(s,f.removedDocuments,g).next(()=>n.Ur.addMatchingKeys(s,f.addedDocuments,g)));let R=v.withSequenceNumber(s.currentSequenceNumber);e.targetMismatches.get(g)!==null?R=R.withResumeToken(Qe.EMPTY_BYTE_STRING,Z.min()).withLastLimboFreeSnapshotVersion(Z.min()):f.resumeToken.approximateByteSize()>0&&(R=R.withResumeToken(f.resumeToken,r)),i=i.insert(g,R),function(D,V,S){return D.resumeToken.approximateByteSize()===0||V.snapshotVersion.toMicroseconds()-D.snapshotVersion.toMicroseconds()>=3e8?!0:S.addedDocuments.size+S.modifiedDocuments.size+S.removedDocuments.size>0}(v,R,f)&&l.push(n.Ur.updateTargetData(s,R))});let u=xn(),h=ie();if(e.documentUpdates.forEach(f=>{e.resolvedLimboDocuments.has(f)&&l.push(n.persistence.referenceDelegate.updateLimboDocument(s,f))}),l.push(ZC(s,o,e.documentUpdates).next(f=>{u=f.Ps,h=f.Is})),!r.isEqual(Z.min())){const f=n.Ur.getLastRemoteSnapshotVersion(s).next(g=>n.Ur.setTargetsMetadata(s,s.currentSequenceNumber,r));l.push(f)}return L.waitFor(l).next(()=>o.apply(s)).next(()=>n.localDocuments.getLocalViewOfDocuments(s,u,h)).next(()=>u)}).then(s=>(n.os=i,s))}function ZC(t,e,n){let r=ie(),i=ie();return n.forEach(s=>r=r.add(s)),e.getEntries(t,r).next(s=>{let o=xn();return n.forEach((l,u)=>{const h=s.get(l);u.isFoundDocument()!==h.isFoundDocument()&&(i=i.add(l)),u.isNoDocument()&&u.version.isEqual(Z.min())?(e.removeEntry(l,u.readTime),o=o.insert(l,u)):!h.isValidDocument()||u.version.compareTo(h.version)>0||u.version.compareTo(h.version)===0&&h.hasPendingWrites?(e.addEntry(u),o=o.insert(l,u)):H("LocalStore","Ignoring outdated watch update for ",l,". Current version:",h.version," Watch version:",u.version)}),{Ps:o,Is:i}})}function eR(t,e){const n=ee(t);return n.persistence.runTransaction("Get next mutation batch","readonly",r=>(e===void 0&&(e=-1),n.mutationQueue.getNextMutationBatchAfterBatchId(r,e)))}function tR(t,e){const n=ee(t);return n.persistence.runTransaction("Allocate target","readwrite",r=>{let i;return n.Ur.getTargetData(r,e).next(s=>s?(i=s,L.resolve(i)):n.Ur.allocateTargetId(r).next(o=>(i=new Qn(e,o,"TargetPurposeListen",r.currentSequenceNumber),n.Ur.addTargetData(r,i).next(()=>i))))}).then(r=>{const i=n.os.get(r.targetId);return(i===null||r.snapshotVersion.compareTo(i.snapshotVersion)>0)&&(n.os=n.os.insert(r.targetId,r),n._s.set(e,r.targetId)),r})}async function Ph(t,e,n){const r=ee(t),i=r.os.get(e),s=n?"readwrite":"readwrite-primary";try{n||await r.persistence.runTransaction("Release target",s,o=>r.persistence.referenceDelegate.removeTarget(o,i))}catch(o){if(!Po(o))throw o;H("LocalStore",`Failed to update sequence numbers for target ${e}: ${o}`)}r.os=r.os.remove(e),r._s.delete(i.target)}function Tg(t,e,n){const r=ee(t);let i=Z.min(),s=ie();return r.persistence.runTransaction("Execute query","readwrite",o=>function(u,h,f){const g=ee(u),v=g._s.get(f);return v!==void 0?L.resolve(g.os.get(v)):g.Ur.getTargetData(h,f)}(r,o,rn(e)).next(l=>{if(l)return i=l.lastLimboFreeSnapshotVersion,r.Ur.getMatchingKeysForTargetId(o,l.targetId).next(u=>{s=u})}).next(()=>r.ss.getDocumentsMatchingQuery(o,e,n?i:Z.min(),n?s:ie())).next(l=>(nR(r,qA(e),l),{documents:l,Ts:s})))}function nR(t,e,n){let r=t.us.get(e)||Z.min();n.forEach((i,s)=>{s.readTime.compareTo(r)>0&&(r=s.readTime)}),t.us.set(e,r)}class Ig{constructor(){this.activeTargetIds=JA()}fs(e){this.activeTargetIds=this.activeTargetIds.add(e)}gs(e){this.activeTargetIds=this.activeTargetIds.delete(e)}Vs(){const e={activeTargetIds:this.activeTargetIds.toArray(),updateTimeMs:Date.now()};return JSON.stringify(e)}}class rR{constructor(){this.so=new Ig,this.oo={},this.onlineStateHandler=null,this.sequenceNumberHandler=null}addPendingMutation(e){}updateMutationState(e,n,r){}addLocalQueryTarget(e,n=!0){return n&&this.so.fs(e),this.oo[e]||"not-current"}updateQueryState(e,n,r){this.oo[e]=n}removeLocalQueryTarget(e){this.so.gs(e)}isLocalQueryTarget(e){return this.so.activeTargetIds.has(e)}clearQueryState(e){delete this.oo[e]}getAllActiveQueryTargets(){return this.so.activeTargetIds}isActiveQueryTarget(e){return this.so.activeTargetIds.has(e)}start(){return this.so=new Ig,Promise.resolve()}handleUserChange(e,n,r){}setOnlineState(e){}shutdown(){}writeSequenceNumber(e){}notifyBundleLoaded(e){}}/**
 * @license
 * Copyright 2019 Google LLC
 *
 * Licensed under the Apache License, Version 2.0 (the "License");
 * you may not use this file except in compliance with the License.
 * You may obtain a copy of the License at
 *
 *   http://www.apache.org/licenses/LICENSE-2.0
 *
 * Unless required by applicable law or agreed to in writing, software
 * distributed under the License is distributed on an "AS IS" BASIS,
 * WITHOUT WARRANTIES OR CONDITIONS OF ANY KIND, either express or implied.
 * See the License for the specific language governing permissions and
 * limitations under the License.
 */class iR{_o(e){}shutdown(){}}/**
 * @license
 * Copyright 2019 Google LLC
 *
 * Licensed under the Apache License, Version 2.0 (the "License");
 * you may not use this file except in compliance with the License.
 * You may obtain a copy of the License at
 *
 *   http://www.apache.org/licenses/LICENSE-2.0
 *
 * Unless required by applicable law or agreed to in writing, software
 * distributed under the License is distributed on an "AS IS" BASIS,
 * WITHOUT WARRANTIES OR CONDITIONS OF ANY KIND, either express or implied.
 * See the License for the specific language governing permissions and
 * limitations under the License.
 */class Sg{constructor(){this.ao=()=>this.uo(),this.co=()=>this.lo(),this.ho=[],this.Po()}_o(e){this.ho.push(e)}shutdown(){window.removeEventListener("online",this.ao),window.removeEventListener("offline",this.co)}Po(){window.addEventListener("online",this.ao),window.addEventListener("offline",this.co)}uo(){H("ConnectivityMonitor","Network connectivity changed: AVAILABLE");for(const e of this.ho)e(0)}lo(){H("ConnectivityMonitor","Network connectivity changed: UNAVAILABLE");for(const e of this.ho)e(1)}static D(){return typeof window<"u"&&window.addEventListener!==void 0&&window.removeEventListener!==void 0}}/**
 * @license
 * Copyright 2023 Google LLC
 *
 * Licensed under the Apache License, Version 2.0 (the "License");
 * you may not use this file except in compliance with the License.
 * You may obtain a copy of the License at
 *
 *   http://www.apache.org/licenses/LICENSE-2.0
 *
 * Unless required by applicable law or agreed to in writing, software
 * distributed under the License is distributed on an "AS IS" BASIS,
 * WITHOUT WARRANTIES OR CONDITIONS OF ANY KIND, either express or implied.
 * See the License for the specific language governing permissions and
 * limitations under the License.
 */let ya=null;function cc(){return ya===null?ya=function(){return 268435456+Math.round(2147483648*Math.random())}():ya++,"0x"+ya.toString(16)}/**
 * @license
 * Copyright 2020 Google LLC
 *
 * Licensed under the Apache License, Version 2.0 (the "License");
 * you may not use this file except in compliance with the License.
 * You may obtain a copy of the License at
 *
 *   http://www.apache.org/licenses/LICENSE-2.0
 *
 * Unless required by applicable law or agreed to in writing, software
 * distributed under the License is distributed on an "AS IS" BASIS,
 * WITHOUT WARRANTIES OR CONDITIONS OF ANY KIND, either express or implied.
 * See the License for the specific language governing permissions and
 * limitations under the License.
 */const sR={BatchGetDocuments:"batchGet",Commit:"commit",RunQuery:"runQuery",RunAggregationQuery:"runAggregationQuery"};/**
 * @license
 * Copyright 2017 Google LLC
 *
 * Licensed under the Apache License, Version 2.0 (the "License");
 * you may not use this file except in compliance with the License.
 * You may obtain a copy of the License at
 *
 *   http://www.apache.org/licenses/LICENSE-2.0
 *
 * Unless required by applicable law or agreed to in writing, software
 * distributed under the License is distributed on an "AS IS" BASIS,
 * WITHOUT WARRANTIES OR CONDITIONS OF ANY KIND, either express or implied.
 * See the License for the specific language governing permissions and
 * limitations under the License.
 */class oR{constructor(e){this.Io=e.Io,this.To=e.To}Eo(e){this.Ao=e}Ro(e){this.Vo=e}mo(e){this.fo=e}onMessage(e){this.po=e}close(){this.To()}send(e){this.Io(e)}yo(){this.Ao()}wo(){this.Vo()}So(e){this.fo(e)}bo(e){this.po(e)}}/**
 * @license
 * Copyright 2017 Google LLC
 *
 * Licensed under the Apache License, Version 2.0 (the "License");
 * you may not use this file except in compliance with the License.
 * You may obtain a copy of the License at
 *
 *   http://www.apache.org/licenses/LICENSE-2.0
 *
 * Unless required by applicable law or agreed to in writing, software
 * distributed under the License is distributed on an "AS IS" BASIS,
 * WITHOUT WARRANTIES OR CONDITIONS OF ANY KIND, either express or implied.
 * See the License for the specific language governing permissions and
 * limitations under the License.
 */const nt="WebChannelConnection";class aR extends class{constructor(n){this.databaseInfo=n,this.databaseId=n.databaseId;const r=n.ssl?"https":"http",i=encodeURIComponent(this.databaseId.projectId),s=encodeURIComponent(this.databaseId.database);this.Do=r+"://"+n.host,this.vo=`projects/${i}/databases/${s}`,this.Co=this.databaseId.database==="(default)"?`project_id=${i}`:`project_id=${i}&database_id=${s}`}get Fo(){return!1}Mo(n,r,i,s,o){const l=cc(),u=this.xo(n,r.toUriEncodedString());H("RestConnection",`Sending RPC '${n}' ${l}:`,u,i);const h={"google-cloud-resource-prefix":this.vo,"x-goog-request-params":this.Co};return this.Oo(h,s,o),this.No(n,u,h,i).then(f=>(H("RestConnection",`Received RPC '${n}' ${l}: `,f),f),f=>{throw Vi("RestConnection",`RPC '${n}' ${l} failed with error: `,f,"url: ",u,"request:",i),f})}Lo(n,r,i,s,o,l){return this.Mo(n,r,i,s,o)}Oo(n,r,i){n["X-Goog-Api-Client"]=function(){return"gl-js/ fire/"+qi}(),n["Content-Type"]="text/plain",this.databaseInfo.appId&&(n["X-Firebase-GMPID"]=this.databaseInfo.appId),r&&r.headers.forEach((s,o)=>n[o]=s),i&&i.headers.forEach((s,o)=>n[o]=s)}xo(n,r){const i=sR[n];return`${this.Do}/v1/${r}:${i}`}terminate(){}}{constructor(e){super(e),this.forceLongPolling=e.forceLongPolling,this.autoDetectLongPolling=e.autoDetectLongPolling,this.useFetchStreams=e.useFetchStreams,this.longPollingOptions=e.longPollingOptions}No(e,n,r,i){const s=cc();return new Promise((o,l)=>{const u=new K_;u.setWithCredentials(!0),u.listenOnce(G_.COMPLETE,()=>{try{switch(u.getLastErrorCode()){case La.NO_ERROR:const f=u.getResponseJson();H(nt,`XHR for RPC '${e}' ${s} received:`,JSON.stringify(f)),o(f);break;case La.TIMEOUT:H(nt,`RPC '${e}' ${s} timed out`),l(new q(M.DEADLINE_EXCEEDED,"Request time out"));break;case La.HTTP_ERROR:const g=u.getStatus();if(H(nt,`RPC '${e}' ${s} failed with status:`,g,"response text:",u.getResponseText()),g>0){let v=u.getResponseJson();Array.isArray(v)&&(v=v[0]);const R=v==null?void 0:v.error;if(R&&R.status&&R.message){const N=function(V){const S=V.toLowerCase().replace(/_/g,"-");return Object.values(M).indexOf(S)>=0?S:M.UNKNOWN}(R.status);l(new q(N,R.message))}else l(new q(M.UNKNOWN,"Server responded with status "+u.getStatus()))}else l(new q(M.UNAVAILABLE,"Connection failed."));break;default:J()}}finally{H(nt,`RPC '${e}' ${s} completed.`)}});const h=JSON.stringify(i);H(nt,`RPC '${e}' ${s} sending request:`,i),u.send(n,"POST",h,r,15)})}Bo(e,n,r){const i=cc(),s=[this.Do,"/","google.firestore.v1.Firestore","/",e,"/channel"],o=X_(),l=Y_(),u={httpSessionIdParam:"gsessionid",initMessageHeaders:{},messageUrlParams:{database:`projects/${this.databaseId.projectId}/databases/${this.databaseId.database}`},sendRawJson:!0,supportsCrossDomainXhr:!0,internalChannelParams:{forwardChannelRequestTimeoutMs:6e5},forceLongPolling:this.forceLongPolling,detectBufferingProxy:this.autoDetectLongPolling},h=this.longPollingOptions.timeoutSeconds;h!==void 0&&(u.longPollingTimeout=Math.round(1e3*h)),this.useFetchStreams&&(u.useFetchStreams=!0),this.Oo(u.initMessageHeaders,n,r),u.encodeInitMessageHeaders=!0;const f=s.join("");H(nt,`Creating RPC '${e}' stream ${i}: ${f}`,u);const g=o.createWebChannel(f,u);let v=!1,R=!1;const N=new oR({Io:V=>{R?H(nt,`Not sending because RPC '${e}' stream ${i} is closed:`,V):(v||(H(nt,`Opening RPC '${e}' stream ${i} transport.`),g.open(),v=!0),H(nt,`RPC '${e}' stream ${i} sending:`,V),g.send(V))},To:()=>g.close()}),D=(V,S,_)=>{V.listen(S,k=>{try{_(k)}catch(O){setTimeout(()=>{throw O},0)}})};return D(g,Is.EventType.OPEN,()=>{R||(H(nt,`RPC '${e}' stream ${i} transport opened.`),N.yo())}),D(g,Is.EventType.CLOSE,()=>{R||(R=!0,H(nt,`RPC '${e}' stream ${i} transport closed`),N.So())}),D(g,Is.EventType.ERROR,V=>{R||(R=!0,Vi(nt,`RPC '${e}' stream ${i} transport errored:`,V),N.So(new q(M.UNAVAILABLE,"The operation could not be completed")))}),D(g,Is.EventType.MESSAGE,V=>{var S;if(!R){const _=V.data[0];pe(!!_);const k=_,O=k.error||((S=k[0])===null||S===void 0?void 0:S.error);if(O){H(nt,`RPC '${e}' stream ${i} received error:`,O);const U=O.status;let B=function(w){const I=De[w];if(I!==void 0)return E0(I)}(U),E=O.message;B===void 0&&(B=M.INTERNAL,E="Unknown error status: "+U+" with message "+O.message),R=!0,N.So(new q(B,E)),g.close()}else H(nt,`RPC '${e}' stream ${i} received:`,_),N.bo(_)}}),D(l,Q_.STAT_EVENT,V=>{V.stat===_h.PROXY?H(nt,`RPC '${e}' stream ${i} detected buffering proxy`):V.stat===_h.NOPROXY&&H(nt,`RPC '${e}' stream ${i} detected no buffering proxy`)}),setTimeout(()=>{N.wo()},0),N}}function hc(){return typeof document<"u"?document:null}/**
 * @license
 * Copyright 2020 Google LLC
 *
 * Licensed under the Apache License, Version 2.0 (the "License");
 * you may not use this file except in compliance with the License.
 * You may obtain a copy of the License at
 *
 *   http://www.apache.org/licenses/LICENSE-2.0
 *
 * Unless required by applicable law or agreed to in writing, software
 * distributed under the License is distributed on an "AS IS" BASIS,
 * WITHOUT WARRANTIES OR CONDITIONS OF ANY KIND, either express or implied.
 * See the License for the specific language governing permissions and
 * limitations under the License.
 */function tu(t){return new yC(t,!0)}/**
 * @license
 * Copyright 2017 Google LLC
 *
 * Licensed under the Apache License, Version 2.0 (the "License");
 * you may not use this file except in compliance with the License.
 * You may obtain a copy of the License at
 *
 *   http://www.apache.org/licenses/LICENSE-2.0
 *
 * Unless required by applicable law or agreed to in writing, software
 * distributed under the License is distributed on an "AS IS" BASIS,
 * WITHOUT WARRANTIES OR CONDITIONS OF ANY KIND, either express or implied.
 * See the License for the specific language governing permissions and
 * limitations under the License.
 */class V0{constructor(e,n,r=1e3,i=1.5,s=6e4){this.ui=e,this.timerId=n,this.ko=r,this.qo=i,this.Qo=s,this.Ko=0,this.$o=null,this.Uo=Date.now(),this.reset()}reset(){this.Ko=0}Wo(){this.Ko=this.Qo}Go(e){this.cancel();const n=Math.floor(this.Ko+this.zo()),r=Math.max(0,Date.now()-this.Uo),i=Math.max(0,n-r);i>0&&H("ExponentialBackoff",`Backing off for ${i} ms (base delay: ${this.Ko} ms, delay with jitter: ${n} ms, last attempt: ${r} ms ago)`),this.$o=this.ui.enqueueAfterDelay(this.timerId,i,()=>(this.Uo=Date.now(),e())),this.Ko*=this.qo,this.Ko<this.ko&&(this.Ko=this.ko),this.Ko>this.Qo&&(this.Ko=this.Qo)}jo(){this.$o!==null&&(this.$o.skipDelay(),this.$o=null)}cancel(){this.$o!==null&&(this.$o.cancel(),this.$o=null)}zo(){return(Math.random()-.5)*this.Ko}}/**
 * @license
 * Copyright 2017 Google LLC
 *
 * Licensed under the Apache License, Version 2.0 (the "License");
 * you may not use this file except in compliance with the License.
 * You may obtain a copy of the License at
 *
 *   http://www.apache.org/licenses/LICENSE-2.0
 *
 * Unless required by applicable law or agreed to in writing, software
 * distributed under the License is distributed on an "AS IS" BASIS,
 * WITHOUT WARRANTIES OR CONDITIONS OF ANY KIND, either express or implied.
 * See the License for the specific language governing permissions and
 * limitations under the License.
 */class b0{constructor(e,n,r,i,s,o,l,u){this.ui=e,this.Ho=r,this.Jo=i,this.connection=s,this.authCredentialsProvider=o,this.appCheckCredentialsProvider=l,this.listener=u,this.state=0,this.Yo=0,this.Zo=null,this.Xo=null,this.stream=null,this.e_=0,this.t_=new V0(e,n)}n_(){return this.state===1||this.state===5||this.r_()}r_(){return this.state===2||this.state===3}start(){this.e_=0,this.state!==4?this.auth():this.i_()}async stop(){this.n_()&&await this.close(0)}s_(){this.state=0,this.t_.reset()}o_(){this.r_()&&this.Zo===null&&(this.Zo=this.ui.enqueueAfterDelay(this.Ho,6e4,()=>this.__()))}a_(e){this.u_(),this.stream.send(e)}async __(){if(this.r_())return this.close(0)}u_(){this.Zo&&(this.Zo.cancel(),this.Zo=null)}c_(){this.Xo&&(this.Xo.cancel(),this.Xo=null)}async close(e,n){this.u_(),this.c_(),this.t_.cancel(),this.Yo++,e!==4?this.t_.reset():n&&n.code===M.RESOURCE_EXHAUSTED?(Pn(n.toString()),Pn("Using maximum backoff delay to prevent overloading the backend."),this.t_.Wo()):n&&n.code===M.UNAUTHENTICATED&&this.state!==3&&(this.authCredentialsProvider.invalidateToken(),this.appCheckCredentialsProvider.invalidateToken()),this.stream!==null&&(this.l_(),this.stream.close(),this.stream=null),this.state=e,await this.listener.mo(n)}l_(){}auth(){this.state=1;const e=this.h_(this.Yo),n=this.Yo;Promise.all([this.authCredentialsProvider.getToken(),this.appCheckCredentialsProvider.getToken()]).then(([r,i])=>{this.Yo===n&&this.P_(r,i)},r=>{e(()=>{const i=new q(M.UNKNOWN,"Fetching auth token failed: "+r.message);return this.I_(i)})})}P_(e,n){const r=this.h_(this.Yo);this.stream=this.T_(e,n),this.stream.Eo(()=>{r(()=>this.listener.Eo())}),this.stream.Ro(()=>{r(()=>(this.state=2,this.Xo=this.ui.enqueueAfterDelay(this.Jo,1e4,()=>(this.r_()&&(this.state=3),Promise.resolve())),this.listener.Ro()))}),this.stream.mo(i=>{r(()=>this.I_(i))}),this.stream.onMessage(i=>{r(()=>++this.e_==1?this.E_(i):this.onNext(i))})}i_(){this.state=5,this.t_.Go(async()=>{this.state=0,this.start()})}I_(e){return H("PersistentStream",`close with error: ${e}`),this.stream=null,this.close(4,e)}h_(e){return n=>{this.ui.enqueueAndForget(()=>this.Yo===e?n():(H("PersistentStream","stream callback skipped by getCloseGuardedDispatcher."),Promise.resolve()))}}}class lR extends b0{constructor(e,n,r,i,s,o){super(e,"listen_stream_connection_backoff","listen_stream_idle","health_check_timeout",n,r,i,o),this.serializer=s}T_(e,n){return this.connection.Bo("Listen",e,n)}E_(e){return this.onNext(e)}onNext(e){this.t_.reset();const n=wC(this.serializer,e),r=function(s){if(!("targetChange"in s))return Z.min();const o=s.targetChange;return o.targetIds&&o.targetIds.length?Z.min():o.readTime?on(o.readTime):Z.min()}(e);return this.listener.d_(n,r)}A_(e){const n={};n.database=Rh(this.serializer),n.addTarget=function(s,o){let l;const u=o.target;if(l=Ih(u)?{documents:IC(s,u)}:{query:SC(s,u)._t},l.targetId=o.targetId,o.resumeToken.approximateByteSize()>0){l.resumeToken=S0(s,o.resumeToken);const h=kh(s,o.expectedCount);h!==null&&(l.expectedCount=h)}else if(o.snapshotVersion.compareTo(Z.min())>0){l.readTime=kl(s,o.snapshotVersion.toTimestamp());const h=kh(s,o.expectedCount);h!==null&&(l.expectedCount=h)}return l}(this.serializer,e);const r=AC(this.serializer,e);r&&(n.labels=r),this.a_(n)}R_(e){const n={};n.database=Rh(this.serializer),n.removeTarget=e,this.a_(n)}}class uR extends b0{constructor(e,n,r,i,s,o){super(e,"write_stream_connection_backoff","write_stream_idle","health_check_timeout",n,r,i,o),this.serializer=s}get V_(){return this.e_>0}start(){this.lastStreamToken=void 0,super.start()}l_(){this.V_&&this.m_([])}T_(e,n){return this.connection.Bo("Write",e,n)}E_(e){return pe(!!e.streamToken),this.lastStreamToken=e.streamToken,pe(!e.writeResults||e.writeResults.length===0),this.listener.f_()}onNext(e){pe(!!e.streamToken),this.lastStreamToken=e.streamToken,this.t_.reset();const n=TC(e.writeResults,e.commitTime),r=on(e.commitTime);return this.listener.g_(r,n)}p_(){const e={};e.database=Rh(this.serializer),this.a_(e)}m_(e){const n={streamToken:this.lastStreamToken,writes:e.map(r=>EC(this.serializer,r))};this.a_(n)}}/**
 * @license
 * Copyright 2017 Google LLC
 *
 * Licensed under the Apache License, Version 2.0 (the "License");
 * you may not use this file except in compliance with the License.
 * You may obtain a copy of the License at
 *
 *   http://www.apache.org/licenses/LICENSE-2.0
 *
 * Unless required by applicable law or agreed to in writing, software
 * distributed under the License is distributed on an "AS IS" BASIS,
 * WITHOUT WARRANTIES OR CONDITIONS OF ANY KIND, either express or implied.
 * See the License for the specific language governing permissions and
 * limitations under the License.
 */class cR extends class{}{constructor(e,n,r,i){super(),this.authCredentials=e,this.appCheckCredentials=n,this.connection=r,this.serializer=i,this.y_=!1}w_(){if(this.y_)throw new q(M.FAILED_PRECONDITION,"The client has already been terminated.")}Mo(e,n,r,i){return this.w_(),Promise.all([this.authCredentials.getToken(),this.appCheckCredentials.getToken()]).then(([s,o])=>this.connection.Mo(e,Ah(n,r),i,s,o)).catch(s=>{throw s.name==="FirebaseError"?(s.code===M.UNAUTHENTICATED&&(this.authCredentials.invalidateToken(),this.appCheckCredentials.invalidateToken()),s):new q(M.UNKNOWN,s.toString())})}Lo(e,n,r,i,s){return this.w_(),Promise.all([this.authCredentials.getToken(),this.appCheckCredentials.getToken()]).then(([o,l])=>this.connection.Lo(e,Ah(n,r),i,o,l,s)).catch(o=>{throw o.name==="FirebaseError"?(o.code===M.UNAUTHENTICATED&&(this.authCredentials.invalidateToken(),this.appCheckCredentials.invalidateToken()),o):new q(M.UNKNOWN,o.toString())})}terminate(){this.y_=!0,this.connection.terminate()}}class hR{constructor(e,n){this.asyncQueue=e,this.onlineStateHandler=n,this.state="Unknown",this.S_=0,this.b_=null,this.D_=!0}v_(){this.S_===0&&(this.C_("Unknown"),this.b_=this.asyncQueue.enqueueAfterDelay("online_state_timeout",1e4,()=>(this.b_=null,this.F_("Backend didn't respond within 10 seconds."),this.C_("Offline"),Promise.resolve())))}M_(e){this.state==="Online"?this.C_("Unknown"):(this.S_++,this.S_>=1&&(this.x_(),this.F_(`Connection failed 1 times. Most recent error: ${e.toString()}`),this.C_("Offline")))}set(e){this.x_(),this.S_=0,e==="Online"&&(this.D_=!1),this.C_(e)}C_(e){e!==this.state&&(this.state=e,this.onlineStateHandler(e))}F_(e){const n=`Could not reach Cloud Firestore backend. ${e}
This typically indicates that your device does not have a healthy Internet connection at the moment. The client will operate in offline mode until it is able to successfully connect to the backend.`;this.D_?(Pn(n),this.D_=!1):H("OnlineStateTracker",n)}x_(){this.b_!==null&&(this.b_.cancel(),this.b_=null)}}/**
 * @license
 * Copyright 2017 Google LLC
 *
 * Licensed under the Apache License, Version 2.0 (the "License");
 * you may not use this file except in compliance with the License.
 * You may obtain a copy of the License at
 *
 *   http://www.apache.org/licenses/LICENSE-2.0
 *
 * Unless required by applicable law or agreed to in writing, software
 * distributed under the License is distributed on an "AS IS" BASIS,
 * WITHOUT WARRANTIES OR CONDITIONS OF ANY KIND, either express or implied.
 * See the License for the specific language governing permissions and
 * limitations under the License.
 */class dR{constructor(e,n,r,i,s){this.localStore=e,this.datastore=n,this.asyncQueue=r,this.remoteSyncer={},this.O_=[],this.N_=new Map,this.L_=new Set,this.B_=[],this.k_=s,this.k_._o(o=>{r.enqueueAndForget(async()=>{Kr(this)&&(H("RemoteStore","Restarting streams for network reachability change."),await async function(u){const h=ee(u);h.L_.add(4),await Do(h),h.q_.set("Unknown"),h.L_.delete(4),await nu(h)}(this))})}),this.q_=new hR(r,i)}}async function nu(t){if(Kr(t))for(const e of t.B_)await e(!0)}async function Do(t){for(const e of t.B_)await e(!1)}function O0(t,e){const n=ee(t);n.N_.has(e.targetId)||(n.N_.set(e.targetId,e),uf(n)?lf(n):Qi(n).r_()&&af(n,e))}function of(t,e){const n=ee(t),r=Qi(n);n.N_.delete(e),r.r_()&&L0(n,e),n.N_.size===0&&(r.r_()?r.o_():Kr(n)&&n.q_.set("Unknown"))}function af(t,e){if(t.Q_.xe(e.targetId),e.resumeToken.approximateByteSize()>0||e.snapshotVersion.compareTo(Z.min())>0){const n=t.remoteSyncer.getRemoteKeysForTarget(e.targetId).size;e=e.withExpectedCount(n)}Qi(t).A_(e)}function L0(t,e){t.Q_.xe(e),Qi(t).R_(e)}function lf(t){t.Q_=new fC({getRemoteKeysForTarget:e=>t.remoteSyncer.getRemoteKeysForTarget(e),ot:e=>t.N_.get(e)||null,tt:()=>t.datastore.serializer.databaseId}),Qi(t).start(),t.q_.v_()}function uf(t){return Kr(t)&&!Qi(t).n_()&&t.N_.size>0}function Kr(t){return ee(t).L_.size===0}function M0(t){t.Q_=void 0}async function fR(t){t.q_.set("Online")}async function pR(t){t.N_.forEach((e,n)=>{af(t,e)})}async function mR(t,e){M0(t),uf(t)?(t.q_.M_(e),lf(t)):t.q_.set("Unknown")}async function gR(t,e,n){if(t.q_.set("Online"),e instanceof I0&&e.state===2&&e.cause)try{await async function(i,s){const o=s.cause;for(const l of s.targetIds)i.N_.has(l)&&(await i.remoteSyncer.rejectListen(l,o),i.N_.delete(l),i.Q_.removeTarget(l))}(t,e)}catch(r){H("RemoteStore","Failed to remove targets %s: %s ",e.targetIds.join(","),r),await Al(t,r)}else if(e instanceof ja?t.Q_.Ke(e):e instanceof T0?t.Q_.He(e):t.Q_.We(e),!n.isEqual(Z.min()))try{const r=await D0(t.localStore);n.compareTo(r)>=0&&await function(s,o){const l=s.Q_.rt(o);return l.targetChanges.forEach((u,h)=>{if(u.resumeToken.approximateByteSize()>0){const f=s.N_.get(h);f&&s.N_.set(h,f.withResumeToken(u.resumeToken,o))}}),l.targetMismatches.forEach((u,h)=>{const f=s.N_.get(u);if(!f)return;s.N_.set(u,f.withResumeToken(Qe.EMPTY_BYTE_STRING,f.snapshotVersion)),L0(s,u);const g=new Qn(f.target,u,h,f.sequenceNumber);af(s,g)}),s.remoteSyncer.applyRemoteEvent(l)}(t,n)}catch(r){H("RemoteStore","Failed to raise snapshot:",r),await Al(t,r)}}async function Al(t,e,n){if(!Po(e))throw e;t.L_.add(1),await Do(t),t.q_.set("Offline"),n||(n=()=>D0(t.localStore)),t.asyncQueue.enqueueRetryable(async()=>{H("RemoteStore","Retrying IndexedDB access"),await n(),t.L_.delete(1),await nu(t)})}function F0(t,e){return e().catch(n=>Al(t,n,e))}async function ru(t){const e=ee(t),n=dr(e);let r=e.O_.length>0?e.O_[e.O_.length-1].batchId:-1;for(;yR(e);)try{const i=await eR(e.localStore,r);if(i===null){e.O_.length===0&&n.o_();break}r=i.batchId,vR(e,i)}catch(i){await Al(e,i)}j0(e)&&U0(e)}function yR(t){return Kr(t)&&t.O_.length<10}function vR(t,e){t.O_.push(e);const n=dr(t);n.r_()&&n.V_&&n.m_(e.mutations)}function j0(t){return Kr(t)&&!dr(t).n_()&&t.O_.length>0}function U0(t){dr(t).start()}async function _R(t){dr(t).p_()}async function wR(t){const e=dr(t);for(const n of t.O_)e.m_(n.mutations)}async function ER(t,e,n){const r=t.O_.shift(),i=Zd.from(r,e,n);await F0(t,()=>t.remoteSyncer.applySuccessfulWrite(i)),await ru(t)}async function TR(t,e){e&&dr(t).V_&&await async function(r,i){if(function(o){return cC(o)&&o!==M.ABORTED}(i.code)){const s=r.O_.shift();dr(r).s_(),await F0(r,()=>r.remoteSyncer.rejectFailedWrite(s.batchId,i)),await ru(r)}}(t,e),j0(t)&&U0(t)}async function kg(t,e){const n=ee(t);n.asyncQueue.verifyOperationInProgress(),H("RemoteStore","RemoteStore received new credentials");const r=Kr(n);n.L_.add(3),await Do(n),r&&n.q_.set("Unknown"),await n.remoteSyncer.handleCredentialChange(e),n.L_.delete(3),await nu(n)}async function IR(t,e){const n=ee(t);e?(n.L_.delete(2),await nu(n)):e||(n.L_.add(2),await Do(n),n.q_.set("Unknown"))}function Qi(t){return t.K_||(t.K_=function(n,r,i){const s=ee(n);return s.w_(),new lR(r,s.connection,s.authCredentials,s.appCheckCredentials,s.serializer,i)}(t.datastore,t.asyncQueue,{Eo:fR.bind(null,t),Ro:pR.bind(null,t),mo:mR.bind(null,t),d_:gR.bind(null,t)}),t.B_.push(async e=>{e?(t.K_.s_(),uf(t)?lf(t):t.q_.set("Unknown")):(await t.K_.stop(),M0(t))})),t.K_}function dr(t){return t.U_||(t.U_=function(n,r,i){const s=ee(n);return s.w_(),new uR(r,s.connection,s.authCredentials,s.appCheckCredentials,s.serializer,i)}(t.datastore,t.asyncQueue,{Eo:()=>Promise.resolve(),Ro:_R.bind(null,t),mo:TR.bind(null,t),f_:wR.bind(null,t),g_:ER.bind(null,t)}),t.B_.push(async e=>{e?(t.U_.s_(),await ru(t)):(await t.U_.stop(),t.O_.length>0&&(H("RemoteStore",`Stopping write stream with ${t.O_.length} pending writes`),t.O_=[]))})),t.U_}/**
 * @license
 * Copyright 2017 Google LLC
 *
 * Licensed under the Apache License, Version 2.0 (the "License");
 * you may not use this file except in compliance with the License.
 * You may obtain a copy of the License at
 *
 *   http://www.apache.org/licenses/LICENSE-2.0
 *
 * Unless required by applicable law or agreed to in writing, software
 * distributed under the License is distributed on an "AS IS" BASIS,
 * WITHOUT WARRANTIES OR CONDITIONS OF ANY KIND, either express or implied.
 * See the License for the specific language governing permissions and
 * limitations under the License.
 */class cf{constructor(e,n,r,i,s){this.asyncQueue=e,this.timerId=n,this.targetTimeMs=r,this.op=i,this.removalCallback=s,this.deferred=new Nr,this.then=this.deferred.promise.then.bind(this.deferred.promise),this.deferred.promise.catch(o=>{})}get promise(){return this.deferred.promise}static createAndSchedule(e,n,r,i,s){const o=Date.now()+r,l=new cf(e,n,o,i,s);return l.start(r),l}start(e){this.timerHandle=setTimeout(()=>this.handleDelayElapsed(),e)}skipDelay(){return this.handleDelayElapsed()}cancel(e){this.timerHandle!==null&&(this.clearTimeout(),this.deferred.reject(new q(M.CANCELLED,"Operation cancelled"+(e?": "+e:""))))}handleDelayElapsed(){this.asyncQueue.enqueueAndForget(()=>this.timerHandle!==null?(this.clearTimeout(),this.op().then(e=>this.deferred.resolve(e))):Promise.resolve())}clearTimeout(){this.timerHandle!==null&&(this.removalCallback(this),clearTimeout(this.timerHandle),this.timerHandle=null)}}function hf(t,e){if(Pn("AsyncQueue",`${e}: ${t}`),Po(t))return new q(M.UNAVAILABLE,`${e}: ${t}`);throw t}/**
 * @license
 * Copyright 2017 Google LLC
 *
 * Licensed under the Apache License, Version 2.0 (the "License");
 * you may not use this file except in compliance with the License.
 * You may obtain a copy of the License at
 *
 *   http://www.apache.org/licenses/LICENSE-2.0
 *
 * Unless required by applicable law or agreed to in writing, software
 * distributed under the License is distributed on an "AS IS" BASIS,
 * WITHOUT WARRANTIES OR CONDITIONS OF ANY KIND, either express or implied.
 * See the License for the specific language governing permissions and
 * limitations under the License.
 */class Si{constructor(e){this.comparator=e?(n,r)=>e(n,r)||K.comparator(n.key,r.key):(n,r)=>K.comparator(n.key,r.key),this.keyedMap=Ss(),this.sortedSet=new Ce(this.comparator)}static emptySet(e){return new Si(e.comparator)}has(e){return this.keyedMap.get(e)!=null}get(e){return this.keyedMap.get(e)}first(){return this.sortedSet.minKey()}last(){return this.sortedSet.maxKey()}isEmpty(){return this.sortedSet.isEmpty()}indexOf(e){const n=this.keyedMap.get(e);return n?this.sortedSet.indexOf(n):-1}get size(){return this.sortedSet.size}forEach(e){this.sortedSet.inorderTraversal((n,r)=>(e(n),!1))}add(e){const n=this.delete(e.key);return n.copy(n.keyedMap.insert(e.key,e),n.sortedSet.insert(e,null))}delete(e){const n=this.get(e);return n?this.copy(this.keyedMap.remove(e),this.sortedSet.remove(n)):this}isEqual(e){if(!(e instanceof Si)||this.size!==e.size)return!1;const n=this.sortedSet.getIterator(),r=e.sortedSet.getIterator();for(;n.hasNext();){const i=n.getNext().key,s=r.getNext().key;if(!i.isEqual(s))return!1}return!0}toString(){const e=[];return this.forEach(n=>{e.push(n.toString())}),e.length===0?"DocumentSet ()":`DocumentSet (
  `+e.join(`  
`)+`
)`}copy(e,n){const r=new Si;return r.comparator=this.comparator,r.keyedMap=e,r.sortedSet=n,r}}/**
 * @license
 * Copyright 2017 Google LLC
 *
 * Licensed under the Apache License, Version 2.0 (the "License");
 * you may not use this file except in compliance with the License.
 * You may obtain a copy of the License at
 *
 *   http://www.apache.org/licenses/LICENSE-2.0
 *
 * Unless required by applicable law or agreed to in writing, software
 * distributed under the License is distributed on an "AS IS" BASIS,
 * WITHOUT WARRANTIES OR CONDITIONS OF ANY KIND, either express or implied.
 * See the License for the specific language governing permissions and
 * limitations under the License.
 */class Ag{constructor(){this.W_=new Ce(K.comparator)}track(e){const n=e.doc.key,r=this.W_.get(n);r?e.type!==0&&r.type===3?this.W_=this.W_.insert(n,e):e.type===3&&r.type!==1?this.W_=this.W_.insert(n,{type:r.type,doc:e.doc}):e.type===2&&r.type===2?this.W_=this.W_.insert(n,{type:2,doc:e.doc}):e.type===2&&r.type===0?this.W_=this.W_.insert(n,{type:0,doc:e.doc}):e.type===1&&r.type===0?this.W_=this.W_.remove(n):e.type===1&&r.type===2?this.W_=this.W_.insert(n,{type:1,doc:r.doc}):e.type===0&&r.type===1?this.W_=this.W_.insert(n,{type:2,doc:e.doc}):J():this.W_=this.W_.insert(n,e)}G_(){const e=[];return this.W_.inorderTraversal((n,r)=>{e.push(r)}),e}}class Fi{constructor(e,n,r,i,s,o,l,u,h){this.query=e,this.docs=n,this.oldDocs=r,this.docChanges=i,this.mutatedKeys=s,this.fromCache=o,this.syncStateChanged=l,this.excludesMetadataChanges=u,this.hasCachedResults=h}static fromInitialDocuments(e,n,r,i,s){const o=[];return n.forEach(l=>{o.push({type:0,doc:l})}),new Fi(e,n,Si.emptySet(n),o,r,i,!0,!1,s)}get hasPendingWrites(){return!this.mutatedKeys.isEmpty()}isEqual(e){if(!(this.fromCache===e.fromCache&&this.hasCachedResults===e.hasCachedResults&&this.syncStateChanged===e.syncStateChanged&&this.mutatedKeys.isEqual(e.mutatedKeys)&&Yl(this.query,e.query)&&this.docs.isEqual(e.docs)&&this.oldDocs.isEqual(e.oldDocs)))return!1;const n=this.docChanges,r=e.docChanges;if(n.length!==r.length)return!1;for(let i=0;i<n.length;i++)if(n[i].type!==r[i].type||!n[i].doc.isEqual(r[i].doc))return!1;return!0}}/**
 * @license
 * Copyright 2017 Google LLC
 *
 * Licensed under the Apache License, Version 2.0 (the "License");
 * you may not use this file except in compliance with the License.
 * You may obtain a copy of the License at
 *
 *   http://www.apache.org/licenses/LICENSE-2.0
 *
 * Unless required by applicable law or agreed to in writing, software
 * distributed under the License is distributed on an "AS IS" BASIS,
 * WITHOUT WARRANTIES OR CONDITIONS OF ANY KIND, either express or implied.
 * See the License for the specific language governing permissions and
 * limitations under the License.
 */class SR{constructor(){this.z_=void 0,this.j_=[]}H_(){return this.j_.some(e=>e.J_())}}class kR{constructor(){this.queries=Cg(),this.onlineState="Unknown",this.Y_=new Set}terminate(){(function(n,r){const i=ee(n),s=i.queries;i.queries=Cg(),s.forEach((o,l)=>{for(const u of l.j_)u.onError(r)})})(this,new q(M.ABORTED,"Firestore shutting down"))}}function Cg(){return new Gi(t=>u0(t),Yl)}async function AR(t,e){const n=ee(t);let r=3;const i=e.query;let s=n.queries.get(i);s?!s.H_()&&e.J_()&&(r=2):(s=new SR,r=e.J_()?0:1);try{switch(r){case 0:s.z_=await n.onListen(i,!0);break;case 1:s.z_=await n.onListen(i,!1);break;case 2:await n.onFirstRemoteStoreListen(i)}}catch(o){const l=hf(o,`Initialization of query '${Zr(e.query)}' failed`);return void e.onError(l)}n.queries.set(i,s),s.j_.push(e),e.Z_(n.onlineState),s.z_&&e.X_(s.z_)&&df(n)}async function CR(t,e){const n=ee(t),r=e.query;let i=3;const s=n.queries.get(r);if(s){const o=s.j_.indexOf(e);o>=0&&(s.j_.splice(o,1),s.j_.length===0?i=e.J_()?0:1:!s.H_()&&e.J_()&&(i=2))}switch(i){case 0:return n.queries.delete(r),n.onUnlisten(r,!0);case 1:return n.queries.delete(r),n.onUnlisten(r,!1);case 2:return n.onLastRemoteStoreUnlisten(r);default:return}}function RR(t,e){const n=ee(t);let r=!1;for(const i of e){const s=i.query,o=n.queries.get(s);if(o){for(const l of o.j_)l.X_(i)&&(r=!0);o.z_=i}}r&&df(n)}function PR(t,e,n){const r=ee(t),i=r.queries.get(e);if(i)for(const s of i.j_)s.onError(n);r.queries.delete(e)}function df(t){t.Y_.forEach(e=>{e.next()})}var xh,Rg;(Rg=xh||(xh={})).ea="default",Rg.Cache="cache";class xR{constructor(e,n,r){this.query=e,this.ta=n,this.na=!1,this.ra=null,this.onlineState="Unknown",this.options=r||{}}X_(e){if(!this.options.includeMetadataChanges){const r=[];for(const i of e.docChanges)i.type!==3&&r.push(i);e=new Fi(e.query,e.docs,e.oldDocs,r,e.mutatedKeys,e.fromCache,e.syncStateChanged,!0,e.hasCachedResults)}let n=!1;return this.na?this.ia(e)&&(this.ta.next(e),n=!0):this.sa(e,this.onlineState)&&(this.oa(e),n=!0),this.ra=e,n}onError(e){this.ta.error(e)}Z_(e){this.onlineState=e;let n=!1;return this.ra&&!this.na&&this.sa(this.ra,e)&&(this.oa(this.ra),n=!0),n}sa(e,n){if(!e.fromCache||!this.J_())return!0;const r=n!=="Offline";return(!this.options._a||!r)&&(!e.docs.isEmpty()||e.hasCachedResults||n==="Offline")}ia(e){if(e.docChanges.length>0)return!0;const n=this.ra&&this.ra.hasPendingWrites!==e.hasPendingWrites;return!(!e.syncStateChanged&&!n)&&this.options.includeMetadataChanges===!0}oa(e){e=Fi.fromInitialDocuments(e.query,e.docs,e.mutatedKeys,e.fromCache,e.hasCachedResults),this.na=!0,this.ta.next(e)}J_(){return this.options.source!==xh.Cache}}/**
 * @license
 * Copyright 2017 Google LLC
 *
 * Licensed under the Apache License, Version 2.0 (the "License");
 * you may not use this file except in compliance with the License.
 * You may obtain a copy of the License at
 *
 *   http://www.apache.org/licenses/LICENSE-2.0
 *
 * Unless required by applicable law or agreed to in writing, software
 * distributed under the License is distributed on an "AS IS" BASIS,
 * WITHOUT WARRANTIES OR CONDITIONS OF ANY KIND, either express or implied.
 * See the License for the specific language governing permissions and
 * limitations under the License.
 */class B0{constructor(e){this.key=e}}class z0{constructor(e){this.key=e}}class NR{constructor(e,n){this.query=e,this.Ta=n,this.Ea=null,this.hasCachedResults=!1,this.current=!1,this.da=ie(),this.mutatedKeys=ie(),this.Aa=c0(e),this.Ra=new Si(this.Aa)}get Va(){return this.Ta}ma(e,n){const r=n?n.fa:new Ag,i=n?n.Ra:this.Ra;let s=n?n.mutatedKeys:this.mutatedKeys,o=i,l=!1;const u=this.query.limitType==="F"&&i.size===this.query.limit?i.last():null,h=this.query.limitType==="L"&&i.size===this.query.limit?i.first():null;if(e.inorderTraversal((f,g)=>{const v=i.get(f),R=Xl(this.query,g)?g:null,N=!!v&&this.mutatedKeys.has(v.key),D=!!R&&(R.hasLocalMutations||this.mutatedKeys.has(R.key)&&R.hasCommittedMutations);let V=!1;v&&R?v.data.isEqual(R.data)?N!==D&&(r.track({type:3,doc:R}),V=!0):this.ga(v,R)||(r.track({type:2,doc:R}),V=!0,(u&&this.Aa(R,u)>0||h&&this.Aa(R,h)<0)&&(l=!0)):!v&&R?(r.track({type:0,doc:R}),V=!0):v&&!R&&(r.track({type:1,doc:v}),V=!0,(u||h)&&(l=!0)),V&&(R?(o=o.add(R),s=D?s.add(f):s.delete(f)):(o=o.delete(f),s=s.delete(f)))}),this.query.limit!==null)for(;o.size>this.query.limit;){const f=this.query.limitType==="F"?o.last():o.first();o=o.delete(f.key),s=s.delete(f.key),r.track({type:1,doc:f})}return{Ra:o,fa:r,ns:l,mutatedKeys:s}}ga(e,n){return e.hasLocalMutations&&n.hasCommittedMutations&&!n.hasLocalMutations}applyChanges(e,n,r,i){const s=this.Ra;this.Ra=e.Ra,this.mutatedKeys=e.mutatedKeys;const o=e.fa.G_();o.sort((f,g)=>function(R,N){const D=V=>{switch(V){case 0:return 1;case 2:case 3:return 2;case 1:return 0;default:return J()}};return D(R)-D(N)}(f.type,g.type)||this.Aa(f.doc,g.doc)),this.pa(r),i=i!=null&&i;const l=n&&!i?this.ya():[],u=this.da.size===0&&this.current&&!i?1:0,h=u!==this.Ea;return this.Ea=u,o.length!==0||h?{snapshot:new Fi(this.query,e.Ra,s,o,e.mutatedKeys,u===0,h,!1,!!r&&r.resumeToken.approximateByteSize()>0),wa:l}:{wa:l}}Z_(e){return this.current&&e==="Offline"?(this.current=!1,this.applyChanges({Ra:this.Ra,fa:new Ag,mutatedKeys:this.mutatedKeys,ns:!1},!1)):{wa:[]}}Sa(e){return!this.Ta.has(e)&&!!this.Ra.has(e)&&!this.Ra.get(e).hasLocalMutations}pa(e){e&&(e.addedDocuments.forEach(n=>this.Ta=this.Ta.add(n)),e.modifiedDocuments.forEach(n=>{}),e.removedDocuments.forEach(n=>this.Ta=this.Ta.delete(n)),this.current=e.current)}ya(){if(!this.current)return[];const e=this.da;this.da=ie(),this.Ra.forEach(r=>{this.Sa(r.key)&&(this.da=this.da.add(r.key))});const n=[];return e.forEach(r=>{this.da.has(r)||n.push(new z0(r))}),this.da.forEach(r=>{e.has(r)||n.push(new B0(r))}),n}ba(e){this.Ta=e.Ts,this.da=ie();const n=this.ma(e.documents);return this.applyChanges(n,!0)}Da(){return Fi.fromInitialDocuments(this.query,this.Ra,this.mutatedKeys,this.Ea===0,this.hasCachedResults)}}class DR{constructor(e,n,r){this.query=e,this.targetId=n,this.view=r}}class VR{constructor(e){this.key=e,this.va=!1}}class bR{constructor(e,n,r,i,s,o){this.localStore=e,this.remoteStore=n,this.eventManager=r,this.sharedClientState=i,this.currentUser=s,this.maxConcurrentLimboResolutions=o,this.Ca={},this.Fa=new Gi(l=>u0(l),Yl),this.Ma=new Map,this.xa=new Set,this.Oa=new Ce(K.comparator),this.Na=new Map,this.La=new nf,this.Ba={},this.ka=new Map,this.qa=Mi.kn(),this.onlineState="Unknown",this.Qa=void 0}get isPrimaryClient(){return this.Qa===!0}}async function OR(t,e,n=!0){const r=G0(t);let i;const s=r.Fa.get(e);return s?(r.sharedClientState.addLocalQueryTarget(s.targetId),i=s.view.Da()):i=await $0(r,e,n,!0),i}async function LR(t,e){const n=G0(t);await $0(n,e,!0,!1)}async function $0(t,e,n,r){const i=await tR(t.localStore,rn(e)),s=i.targetId,o=t.sharedClientState.addLocalQueryTarget(s,n);let l;return r&&(l=await MR(t,e,s,o==="current",i.resumeToken)),t.isPrimaryClient&&n&&O0(t.remoteStore,i),l}async function MR(t,e,n,r,i){t.Ka=(g,v,R)=>async function(D,V,S,_){let k=V.view.ma(S);k.ns&&(k=await Tg(D.localStore,V.query,!1).then(({documents:E})=>V.view.ma(E,k)));const O=_&&_.targetChanges.get(V.targetId),U=_&&_.targetMismatches.get(V.targetId)!=null,B=V.view.applyChanges(k,D.isPrimaryClient,O,U);return xg(D,V.targetId,B.wa),B.snapshot}(t,g,v,R);const s=await Tg(t.localStore,e,!0),o=new NR(e,s.Ts),l=o.ma(s.documents),u=No.createSynthesizedTargetChangeForCurrentChange(n,r&&t.onlineState!=="Offline",i),h=o.applyChanges(l,t.isPrimaryClient,u);xg(t,n,h.wa);const f=new DR(e,n,o);return t.Fa.set(e,f),t.Ma.has(n)?t.Ma.get(n).push(e):t.Ma.set(n,[e]),h.snapshot}async function FR(t,e,n){const r=ee(t),i=r.Fa.get(e),s=r.Ma.get(i.targetId);if(s.length>1)return r.Ma.set(i.targetId,s.filter(o=>!Yl(o,e))),void r.Fa.delete(e);r.isPrimaryClient?(r.sharedClientState.removeLocalQueryTarget(i.targetId),r.sharedClientState.isActiveQueryTarget(i.targetId)||await Ph(r.localStore,i.targetId,!1).then(()=>{r.sharedClientState.clearQueryState(i.targetId),n&&of(r.remoteStore,i.targetId),Nh(r,i.targetId)}).catch(Ro)):(Nh(r,i.targetId),await Ph(r.localStore,i.targetId,!0))}async function jR(t,e){const n=ee(t),r=n.Fa.get(e),i=n.Ma.get(r.targetId);n.isPrimaryClient&&i.length===1&&(n.sharedClientState.removeLocalQueryTarget(r.targetId),of(n.remoteStore,r.targetId))}async function UR(t,e,n){const r=KR(t);try{const i=await function(o,l){const u=ee(o),h=Me.now(),f=l.reduce((R,N)=>R.add(N.key),ie());let g,v;return u.persistence.runTransaction("Locally write mutations","readwrite",R=>{let N=xn(),D=ie();return u.cs.getEntries(R,f).next(V=>{N=V,N.forEach((S,_)=>{_.isValidDocument()||(D=D.add(S))})}).next(()=>u.localDocuments.getOverlayedDocuments(R,N)).next(V=>{g=V;const S=[];for(const _ of l){const k=sC(_,g.get(_.key).overlayedDocument);k!=null&&S.push(new qr(_.key,k,n0(k.value.mapValue),sn.exists(!0)))}return u.mutationQueue.addMutationBatch(R,h,S,l)}).next(V=>{v=V;const S=V.applyToLocalDocumentSet(g,D);return u.documentOverlayCache.saveOverlays(R,V.batchId,S)})}).then(()=>({batchId:v.batchId,changes:d0(g)}))}(r.localStore,e);r.sharedClientState.addPendingMutation(i.batchId),function(o,l,u){let h=o.Ba[o.currentUser.toKey()];h||(h=new Ce(ue)),h=h.insert(l,u),o.Ba[o.currentUser.toKey()]=h}(r,i.batchId,n),await Vo(r,i.changes),await ru(r.remoteStore)}catch(i){const s=hf(i,"Failed to persist write");n.reject(s)}}async function W0(t,e){const n=ee(t);try{const r=await JC(n.localStore,e);e.targetChanges.forEach((i,s)=>{const o=n.Na.get(s);o&&(pe(i.addedDocuments.size+i.modifiedDocuments.size+i.removedDocuments.size<=1),i.addedDocuments.size>0?o.va=!0:i.modifiedDocuments.size>0?pe(o.va):i.removedDocuments.size>0&&(pe(o.va),o.va=!1))}),await Vo(n,r,e)}catch(r){await Ro(r)}}function Pg(t,e,n){const r=ee(t);if(r.isPrimaryClient&&n===0||!r.isPrimaryClient&&n===1){const i=[];r.Fa.forEach((s,o)=>{const l=o.view.Z_(e);l.snapshot&&i.push(l.snapshot)}),function(o,l){const u=ee(o);u.onlineState=l;let h=!1;u.queries.forEach((f,g)=>{for(const v of g.j_)v.Z_(l)&&(h=!0)}),h&&df(u)}(r.eventManager,e),i.length&&r.Ca.d_(i),r.onlineState=e,r.isPrimaryClient&&r.sharedClientState.setOnlineState(e)}}async function BR(t,e,n){const r=ee(t);r.sharedClientState.updateQueryState(e,"rejected",n);const i=r.Na.get(e),s=i&&i.key;if(s){let o=new Ce(K.comparator);o=o.insert(s,st.newNoDocument(s,Z.min()));const l=ie().add(s),u=new eu(Z.min(),new Map,new Ce(ue),o,l);await W0(r,u),r.Oa=r.Oa.remove(s),r.Na.delete(e),ff(r)}else await Ph(r.localStore,e,!1).then(()=>Nh(r,e,n)).catch(Ro)}async function zR(t,e){const n=ee(t),r=e.batch.batchId;try{const i=await XC(n.localStore,e);q0(n,r,null),H0(n,r),n.sharedClientState.updateMutationState(r,"acknowledged"),await Vo(n,i)}catch(i){await Ro(i)}}async function $R(t,e,n){const r=ee(t);try{const i=await function(o,l){const u=ee(o);return u.persistence.runTransaction("Reject batch","readwrite-primary",h=>{let f;return u.mutationQueue.lookupMutationBatch(h,l).next(g=>(pe(g!==null),f=g.keys(),u.mutationQueue.removeMutationBatch(h,g))).next(()=>u.mutationQueue.performConsistencyCheck(h)).next(()=>u.documentOverlayCache.removeOverlaysForBatchId(h,f,l)).next(()=>u.localDocuments.recalculateAndSaveOverlaysForDocumentKeys(h,f)).next(()=>u.localDocuments.getDocuments(h,f))})}(r.localStore,e);q0(r,e,n),H0(r,e),r.sharedClientState.updateMutationState(e,"rejected",n),await Vo(r,i)}catch(i){await Ro(i)}}function H0(t,e){(t.ka.get(e)||[]).forEach(n=>{n.resolve()}),t.ka.delete(e)}function q0(t,e,n){const r=ee(t);let i=r.Ba[r.currentUser.toKey()];if(i){const s=i.get(e);s&&(n?s.reject(n):s.resolve(),i=i.remove(e)),r.Ba[r.currentUser.toKey()]=i}}function Nh(t,e,n=null){t.sharedClientState.removeLocalQueryTarget(e);for(const r of t.Ma.get(e))t.Fa.delete(r),n&&t.Ca.$a(r,n);t.Ma.delete(e),t.isPrimaryClient&&t.La.gr(e).forEach(r=>{t.La.containsKey(r)||K0(t,r)})}function K0(t,e){t.xa.delete(e.path.canonicalString());const n=t.Oa.get(e);n!==null&&(of(t.remoteStore,n),t.Oa=t.Oa.remove(e),t.Na.delete(n),ff(t))}function xg(t,e,n){for(const r of n)r instanceof B0?(t.La.addReference(r.key,e),WR(t,r)):r instanceof z0?(H("SyncEngine","Document no longer in limbo: "+r.key),t.La.removeReference(r.key,e),t.La.containsKey(r.key)||K0(t,r.key)):J()}function WR(t,e){const n=e.key,r=n.path.canonicalString();t.Oa.get(n)||t.xa.has(r)||(H("SyncEngine","New document in limbo: "+n),t.xa.add(r),ff(t))}function ff(t){for(;t.xa.size>0&&t.Oa.size<t.maxConcurrentLimboResolutions;){const e=t.xa.values().next().value;t.xa.delete(e);const n=new K(Te.fromString(e)),r=t.qa.next();t.Na.set(r,new VR(n)),t.Oa=t.Oa.insert(n,r),O0(t.remoteStore,new Qn(rn(Yd(n.path)),r,"TargetPurposeLimboResolution",Wd.oe))}}async function Vo(t,e,n){const r=ee(t),i=[],s=[],o=[];r.Fa.isEmpty()||(r.Fa.forEach((l,u)=>{o.push(r.Ka(u,e,n).then(h=>{var f;if((h||n)&&r.isPrimaryClient){const g=h?!h.fromCache:(f=n==null?void 0:n.targetChanges.get(u.targetId))===null||f===void 0?void 0:f.current;r.sharedClientState.updateQueryState(u.targetId,g?"current":"not-current")}if(h){i.push(h);const g=sf.Wi(u.targetId,h);s.push(g)}}))}),await Promise.all(o),r.Ca.d_(i),await async function(u,h){const f=ee(u);try{await f.persistence.runTransaction("notifyLocalViewChanges","readwrite",g=>L.forEach(h,v=>L.forEach(v.$i,R=>f.persistence.referenceDelegate.addReference(g,v.targetId,R)).next(()=>L.forEach(v.Ui,R=>f.persistence.referenceDelegate.removeReference(g,v.targetId,R)))))}catch(g){if(!Po(g))throw g;H("LocalStore","Failed to update sequence numbers: "+g)}for(const g of h){const v=g.targetId;if(!g.fromCache){const R=f.os.get(v),N=R.snapshotVersion,D=R.withLastLimboFreeSnapshotVersion(N);f.os=f.os.insert(v,D)}}}(r.localStore,s))}async function HR(t,e){const n=ee(t);if(!n.currentUser.isEqual(e)){H("SyncEngine","User change. New user:",e.toKey());const r=await N0(n.localStore,e);n.currentUser=e,function(s,o){s.ka.forEach(l=>{l.forEach(u=>{u.reject(new q(M.CANCELLED,o))})}),s.ka.clear()}(n,"'waitForPendingWrites' promise is rejected due to a user change."),n.sharedClientState.handleUserChange(e,r.removedBatchIds,r.addedBatchIds),await Vo(n,r.hs)}}function qR(t,e){const n=ee(t),r=n.Na.get(e);if(r&&r.va)return ie().add(r.key);{let i=ie();const s=n.Ma.get(e);if(!s)return i;for(const o of s){const l=n.Fa.get(o);i=i.unionWith(l.view.Va)}return i}}function G0(t){const e=ee(t);return e.remoteStore.remoteSyncer.applyRemoteEvent=W0.bind(null,e),e.remoteStore.remoteSyncer.getRemoteKeysForTarget=qR.bind(null,e),e.remoteStore.remoteSyncer.rejectListen=BR.bind(null,e),e.Ca.d_=RR.bind(null,e.eventManager),e.Ca.$a=PR.bind(null,e.eventManager),e}function KR(t){const e=ee(t);return e.remoteStore.remoteSyncer.applySuccessfulWrite=zR.bind(null,e),e.remoteStore.remoteSyncer.rejectFailedWrite=$R.bind(null,e),e}class Cl{constructor(){this.kind="memory",this.synchronizeTabs=!1}async initialize(e){this.serializer=tu(e.databaseInfo.databaseId),this.sharedClientState=this.Wa(e),this.persistence=this.Ga(e),await this.persistence.start(),this.localStore=this.za(e),this.gcScheduler=this.ja(e,this.localStore),this.indexBackfillerScheduler=this.Ha(e,this.localStore)}ja(e,n){return null}Ha(e,n){return null}za(e){return YC(this.persistence,new GC,e.initialUser,this.serializer)}Ga(e){return new HC(rf.Zr,this.serializer)}Wa(e){return new rR}async terminate(){var e,n;(e=this.gcScheduler)===null||e===void 0||e.stop(),(n=this.indexBackfillerScheduler)===null||n===void 0||n.stop(),this.sharedClientState.shutdown(),await this.persistence.shutdown()}}Cl.provider={build:()=>new Cl};class Dh{async initialize(e,n){this.localStore||(this.localStore=e.localStore,this.sharedClientState=e.sharedClientState,this.datastore=this.createDatastore(n),this.remoteStore=this.createRemoteStore(n),this.eventManager=this.createEventManager(n),this.syncEngine=this.createSyncEngine(n,!e.synchronizeTabs),this.sharedClientState.onlineStateHandler=r=>Pg(this.syncEngine,r,1),this.remoteStore.remoteSyncer.handleCredentialChange=HR.bind(null,this.syncEngine),await IR(this.remoteStore,this.syncEngine.isPrimaryClient))}createEventManager(e){return function(){return new kR}()}createDatastore(e){const n=tu(e.databaseInfo.databaseId),r=function(s){return new aR(s)}(e.databaseInfo);return function(s,o,l,u){return new cR(s,o,l,u)}(e.authCredentials,e.appCheckCredentials,r,n)}createRemoteStore(e){return function(r,i,s,o,l){return new dR(r,i,s,o,l)}(this.localStore,this.datastore,e.asyncQueue,n=>Pg(this.syncEngine,n,0),function(){return Sg.D()?new Sg:new iR}())}createSyncEngine(e,n){return function(i,s,o,l,u,h,f){const g=new bR(i,s,o,l,u,h);return f&&(g.Qa=!0),g}(this.localStore,this.remoteStore,this.eventManager,this.sharedClientState,e.initialUser,e.maxConcurrentLimboResolutions,n)}async terminate(){var e,n;await async function(i){const s=ee(i);H("RemoteStore","RemoteStore shutting down."),s.L_.add(5),await Do(s),s.k_.shutdown(),s.q_.set("Unknown")}(this.remoteStore),(e=this.datastore)===null||e===void 0||e.terminate(),(n=this.eventManager)===null||n===void 0||n.terminate()}}Dh.provider={build:()=>new Dh};/**
 * @license
 * Copyright 2020 Google LLC
 *
 * Licensed under the Apache License, Version 2.0 (the "License");
 * you may not use this file except in compliance with the License.
 * You may obtain a copy of the License at
 *
 *   http://www.apache.org/licenses/LICENSE-2.0
 *
 * Unless required by applicable law or agreed to in writing, software
 * distributed under the License is distributed on an "AS IS" BASIS,
 * WITHOUT WARRANTIES OR CONDITIONS OF ANY KIND, either express or implied.
 * See the License for the specific language governing permissions and
 * limitations under the License.
 *//**
 * @license
 * Copyright 2017 Google LLC
 *
 * Licensed under the Apache License, Version 2.0 (the "License");
 * you may not use this file except in compliance with the License.
 * You may obtain a copy of the License at
 *
 *   http://www.apache.org/licenses/LICENSE-2.0
 *
 * Unless required by applicable law or agreed to in writing, software
 * distributed under the License is distributed on an "AS IS" BASIS,
 * WITHOUT WARRANTIES OR CONDITIONS OF ANY KIND, either express or implied.
 * See the License for the specific language governing permissions and
 * limitations under the License.
 */class GR{constructor(e){this.observer=e,this.muted=!1}next(e){this.muted||this.observer.next&&this.Ya(this.observer.next,e)}error(e){this.muted||(this.observer.error?this.Ya(this.observer.error,e):Pn("Uncaught Error in snapshot listener:",e.toString()))}Za(){this.muted=!0}Ya(e,n){setTimeout(()=>{this.muted||e(n)},0)}}/**
 * @license
 * Copyright 2017 Google LLC
 *
 * Licensed under the Apache License, Version 2.0 (the "License");
 * you may not use this file except in compliance with the License.
 * You may obtain a copy of the License at
 *
 *   http://www.apache.org/licenses/LICENSE-2.0
 *
 * Unless required by applicable law or agreed to in writing, software
 * distributed under the License is distributed on an "AS IS" BASIS,
 * WITHOUT WARRANTIES OR CONDITIONS OF ANY KIND, either express or implied.
 * See the License for the specific language governing permissions and
 * limitations under the License.
 */class QR{constructor(e,n,r,i,s){this.authCredentials=e,this.appCheckCredentials=n,this.asyncQueue=r,this.databaseInfo=i,this.user=rt.UNAUTHENTICATED,this.clientId=Z_.newId(),this.authCredentialListener=()=>Promise.resolve(),this.appCheckCredentialListener=()=>Promise.resolve(),this._uninitializedComponentsProvider=s,this.authCredentials.start(r,async o=>{H("FirestoreClient","Received user=",o.uid),await this.authCredentialListener(o),this.user=o}),this.appCheckCredentials.start(r,o=>(H("FirestoreClient","Received new app check token=",o),this.appCheckCredentialListener(o,this.user)))}get configuration(){return{asyncQueue:this.asyncQueue,databaseInfo:this.databaseInfo,clientId:this.clientId,authCredentials:this.authCredentials,appCheckCredentials:this.appCheckCredentials,initialUser:this.user,maxConcurrentLimboResolutions:100}}setCredentialChangeListener(e){this.authCredentialListener=e}setAppCheckTokenChangeListener(e){this.appCheckCredentialListener=e}terminate(){this.asyncQueue.enterRestrictedMode();const e=new Nr;return this.asyncQueue.enqueueAndForgetEvenWhileRestricted(async()=>{try{this._onlineComponents&&await this._onlineComponents.terminate(),this._offlineComponents&&await this._offlineComponents.terminate(),this.authCredentials.shutdown(),this.appCheckCredentials.shutdown(),e.resolve()}catch(n){const r=hf(n,"Failed to shutdown persistence");e.reject(r)}}),e.promise}}async function dc(t,e){t.asyncQueue.verifyOperationInProgress(),H("FirestoreClient","Initializing OfflineComponentProvider");const n=t.configuration;await e.initialize(n);let r=n.initialUser;t.setCredentialChangeListener(async i=>{r.isEqual(i)||(await N0(e.localStore,i),r=i)}),e.persistence.setDatabaseDeletedListener(()=>t.terminate()),t._offlineComponents=e}async function Ng(t,e){t.asyncQueue.verifyOperationInProgress();const n=await YR(t);H("FirestoreClient","Initializing OnlineComponentProvider"),await e.initialize(n,t.configuration),t.setCredentialChangeListener(r=>kg(e.remoteStore,r)),t.setAppCheckTokenChangeListener((r,i)=>kg(e.remoteStore,i)),t._onlineComponents=e}async function YR(t){if(!t._offlineComponents)if(t._uninitializedComponentsProvider){H("FirestoreClient","Using user provided OfflineComponentProvider");try{await dc(t,t._uninitializedComponentsProvider._offline)}catch(e){const n=e;if(!function(i){return i.name==="FirebaseError"?i.code===M.FAILED_PRECONDITION||i.code===M.UNIMPLEMENTED:!(typeof DOMException<"u"&&i instanceof DOMException)||i.code===22||i.code===20||i.code===11}(n))throw n;Vi("Error using user provided cache. Falling back to memory cache: "+n),await dc(t,new Cl)}}else H("FirestoreClient","Using default OfflineComponentProvider"),await dc(t,new Cl);return t._offlineComponents}async function Q0(t){return t._onlineComponents||(t._uninitializedComponentsProvider?(H("FirestoreClient","Using user provided OnlineComponentProvider"),await Ng(t,t._uninitializedComponentsProvider._online)):(H("FirestoreClient","Using default OnlineComponentProvider"),await Ng(t,new Dh))),t._onlineComponents}function XR(t){return Q0(t).then(e=>e.syncEngine)}async function Dg(t){const e=await Q0(t),n=e.eventManager;return n.onListen=OR.bind(null,e.syncEngine),n.onUnlisten=FR.bind(null,e.syncEngine),n.onFirstRemoteStoreListen=LR.bind(null,e.syncEngine),n.onLastRemoteStoreUnlisten=jR.bind(null,e.syncEngine),n}/**
 * @license
 * Copyright 2023 Google LLC
 *
 * Licensed under the Apache License, Version 2.0 (the "License");
 * you may not use this file except in compliance with the License.
 * You may obtain a copy of the License at
 *
 *   http://www.apache.org/licenses/LICENSE-2.0
 *
 * Unless required by applicable law or agreed to in writing, software
 * distributed under the License is distributed on an "AS IS" BASIS,
 * WITHOUT WARRANTIES OR CONDITIONS OF ANY KIND, either express or implied.
 * See the License for the specific language governing permissions and
 * limitations under the License.
 */function Y0(t){const e={};return t.timeoutSeconds!==void 0&&(e.timeoutSeconds=t.timeoutSeconds),e}/**
 * @license
 * Copyright 2020 Google LLC
 *
 * Licensed under the Apache License, Version 2.0 (the "License");
 * you may not use this file except in compliance with the License.
 * You may obtain a copy of the License at
 *
 *   http://www.apache.org/licenses/LICENSE-2.0
 *
 * Unless required by applicable law or agreed to in writing, software
 * distributed under the License is distributed on an "AS IS" BASIS,
 * WITHOUT WARRANTIES OR CONDITIONS OF ANY KIND, either express or implied.
 * See the License for the specific language governing permissions and
 * limitations under the License.
 */const Vg=new Map;/**
 * @license
 * Copyright 2017 Google LLC
 *
 * Licensed under the Apache License, Version 2.0 (the "License");
 * you may not use this file except in compliance with the License.
 * You may obtain a copy of the License at
 *
 *   http://www.apache.org/licenses/LICENSE-2.0
 *
 * Unless required by applicable law or agreed to in writing, software
 * distributed under the License is distributed on an "AS IS" BASIS,
 * WITHOUT WARRANTIES OR CONDITIONS OF ANY KIND, either express or implied.
 * See the License for the specific language governing permissions and
 * limitations under the License.
 */function X0(t,e,n){if(!n)throw new q(M.INVALID_ARGUMENT,`Function ${t}() cannot be called with an empty ${e}.`)}function JR(t,e,n,r){if(e===!0&&r===!0)throw new q(M.INVALID_ARGUMENT,`${t} and ${n} cannot be used together.`)}function bg(t){if(!K.isDocumentKey(t))throw new q(M.INVALID_ARGUMENT,`Invalid document reference. Document references must have an even number of segments, but ${t} has ${t.length}.`)}function Og(t){if(K.isDocumentKey(t))throw new q(M.INVALID_ARGUMENT,`Invalid collection reference. Collection references must have an odd number of segments, but ${t} has ${t.length}.`)}function pf(t){if(t===void 0)return"undefined";if(t===null)return"null";if(typeof t=="string")return t.length>20&&(t=`${t.substring(0,20)}...`),JSON.stringify(t);if(typeof t=="number"||typeof t=="boolean")return""+t;if(typeof t=="object"){if(t instanceof Array)return"an array";{const e=function(r){return r.constructor?r.constructor.name:null}(t);return e?`a custom ${e} object`:"an object"}}return typeof t=="function"?"a function":J()}function Dr(t,e){if("_delegate"in t&&(t=t._delegate),!(t instanceof e)){if(e.name===t.constructor.name)throw new q(M.INVALID_ARGUMENT,"Type does not match the expected instance. Did you pass a reference from a different Firestore SDK?");{const n=pf(t);throw new q(M.INVALID_ARGUMENT,`Expected type '${e.name}', but it was: ${n}`)}}return t}/**
 * @license
 * Copyright 2020 Google LLC
 *
 * Licensed under the Apache License, Version 2.0 (the "License");
 * you may not use this file except in compliance with the License.
 * You may obtain a copy of the License at
 *
 *   http://www.apache.org/licenses/LICENSE-2.0
 *
 * Unless required by applicable law or agreed to in writing, software
 * distributed under the License is distributed on an "AS IS" BASIS,
 * WITHOUT WARRANTIES OR CONDITIONS OF ANY KIND, either express or implied.
 * See the License for the specific language governing permissions and
 * limitations under the License.
 */class Lg{constructor(e){var n,r;if(e.host===void 0){if(e.ssl!==void 0)throw new q(M.INVALID_ARGUMENT,"Can't provide ssl option if host option is not set");this.host="firestore.googleapis.com",this.ssl=!0}else this.host=e.host,this.ssl=(n=e.ssl)===null||n===void 0||n;if(this.credentials=e.credentials,this.ignoreUndefinedProperties=!!e.ignoreUndefinedProperties,this.localCache=e.localCache,e.cacheSizeBytes===void 0)this.cacheSizeBytes=41943040;else{if(e.cacheSizeBytes!==-1&&e.cacheSizeBytes<1048576)throw new q(M.INVALID_ARGUMENT,"cacheSizeBytes must be at least 1048576");this.cacheSizeBytes=e.cacheSizeBytes}JR("experimentalForceLongPolling",e.experimentalForceLongPolling,"experimentalAutoDetectLongPolling",e.experimentalAutoDetectLongPolling),this.experimentalForceLongPolling=!!e.experimentalForceLongPolling,this.experimentalForceLongPolling?this.experimentalAutoDetectLongPolling=!1:e.experimentalAutoDetectLongPolling===void 0?this.experimentalAutoDetectLongPolling=!0:this.experimentalAutoDetectLongPolling=!!e.experimentalAutoDetectLongPolling,this.experimentalLongPollingOptions=Y0((r=e.experimentalLongPollingOptions)!==null&&r!==void 0?r:{}),function(s){if(s.timeoutSeconds!==void 0){if(isNaN(s.timeoutSeconds))throw new q(M.INVALID_ARGUMENT,`invalid long polling timeout: ${s.timeoutSeconds} (must not be NaN)`);if(s.timeoutSeconds<5)throw new q(M.INVALID_ARGUMENT,`invalid long polling timeout: ${s.timeoutSeconds} (minimum allowed value is 5)`);if(s.timeoutSeconds>30)throw new q(M.INVALID_ARGUMENT,`invalid long polling timeout: ${s.timeoutSeconds} (maximum allowed value is 30)`)}}(this.experimentalLongPollingOptions),this.useFetchStreams=!!e.useFetchStreams}isEqual(e){return this.host===e.host&&this.ssl===e.ssl&&this.credentials===e.credentials&&this.cacheSizeBytes===e.cacheSizeBytes&&this.experimentalForceLongPolling===e.experimentalForceLongPolling&&this.experimentalAutoDetectLongPolling===e.experimentalAutoDetectLongPolling&&function(r,i){return r.timeoutSeconds===i.timeoutSeconds}(this.experimentalLongPollingOptions,e.experimentalLongPollingOptions)&&this.ignoreUndefinedProperties===e.ignoreUndefinedProperties&&this.useFetchStreams===e.useFetchStreams}}class iu{constructor(e,n,r,i){this._authCredentials=e,this._appCheckCredentials=n,this._databaseId=r,this._app=i,this.type="firestore-lite",this._persistenceKey="(lite)",this._settings=new Lg({}),this._settingsFrozen=!1,this._terminateTask="notTerminated"}get app(){if(!this._app)throw new q(M.FAILED_PRECONDITION,"Firestore was not initialized using the Firebase SDK. 'app' is not available");return this._app}get _initialized(){return this._settingsFrozen}get _terminated(){return this._terminateTask!=="notTerminated"}_setSettings(e){if(this._settingsFrozen)throw new q(M.FAILED_PRECONDITION,"Firestore has already been started and its settings can no longer be changed. You can only modify settings before calling any other methods on a Firestore object.");this._settings=new Lg(e),e.credentials!==void 0&&(this._authCredentials=function(r){if(!r)return new fA;switch(r.type){case"firstParty":return new yA(r.sessionIndex||"0",r.iamToken||null,r.authTokenFactory||null);case"provider":return r.client;default:throw new q(M.INVALID_ARGUMENT,"makeAuthCredentialsProvider failed due to invalid credential type")}}(e.credentials))}_getSettings(){return this._settings}_freezeSettings(){return this._settingsFrozen=!0,this._settings}_delete(){return this._terminateTask==="notTerminated"&&(this._terminateTask=this._terminate()),this._terminateTask}async _restart(){this._terminateTask==="notTerminated"?await this._terminate():this._terminateTask="notTerminated"}toJSON(){return{app:this._app,databaseId:this._databaseId,settings:this._settings}}_terminate(){return function(n){const r=Vg.get(n);r&&(H("ComponentProvider","Removing Datastore"),Vg.delete(n),r.terminate())}(this),Promise.resolve()}}function ZR(t,e,n,r={}){var i;const s=(t=Dr(t,iu))._getSettings(),o=`${e}:${n}`;if(s.host!=="firestore.googleapis.com"&&s.host!==o&&Vi("Host has been set in both settings() and connectFirestoreEmulator(), emulator host will be used."),t._setSettings(Object.assign(Object.assign({},s),{host:o,ssl:!1})),r.mockUserToken){let l,u;if(typeof r.mockUserToken=="string")l=r.mockUserToken,u=rt.MOCK_USER;else{l=U1(r.mockUserToken,(i=t._app)===null||i===void 0?void 0:i.options.projectId);const h=r.mockUserToken.sub||r.mockUserToken.user_id;if(!h)throw new q(M.INVALID_ARGUMENT,"mockUserToken must contain 'sub' or 'user_id' field!");u=new rt(h)}t._authCredentials=new pA(new J_(l,u))}}/**
 * @license
 * Copyright 2020 Google LLC
 *
 * Licensed under the Apache License, Version 2.0 (the "License");
 * you may not use this file except in compliance with the License.
 * You may obtain a copy of the License at
 *
 *   http://www.apache.org/licenses/LICENSE-2.0
 *
 * Unless required by applicable law or agreed to in writing, software
 * distributed under the License is distributed on an "AS IS" BASIS,
 * WITHOUT WARRANTIES OR CONDITIONS OF ANY KIND, either express or implied.
 * See the License for the specific language governing permissions and
 * limitations under the License.
 */class su{constructor(e,n,r){this.converter=n,this._query=r,this.type="query",this.firestore=e}withConverter(e){return new su(this.firestore,e,this._query)}}class St{constructor(e,n,r){this.converter=n,this._key=r,this.type="document",this.firestore=e}get _path(){return this._key.path}get id(){return this._key.path.lastSegment()}get path(){return this._key.path.canonicalString()}get parent(){return new ar(this.firestore,this.converter,this._key.path.popLast())}withConverter(e){return new St(this.firestore,e,this._key)}}class ar extends su{constructor(e,n,r){super(e,n,Yd(r)),this._path=r,this.type="collection"}get id(){return this._query.path.lastSegment()}get path(){return this._query.path.canonicalString()}get parent(){const e=this._path.popLast();return e.isEmpty()?null:new St(this.firestore,null,new K(e))}withConverter(e){return new ar(this.firestore,e,this._path)}}function fc(t,e,...n){if(t=At(t),X0("collection","path",e),t instanceof iu){const r=Te.fromString(e,...n);return Og(r),new ar(t,null,r)}{if(!(t instanceof St||t instanceof ar))throw new q(M.INVALID_ARGUMENT,"Expected first argument to collection() to be a CollectionReference, a DocumentReference or FirebaseFirestore");const r=t._path.child(Te.fromString(e,...n));return Og(r),new ar(t.firestore,null,r)}}function vs(t,e,...n){if(t=At(t),arguments.length===1&&(e=Z_.newId()),X0("doc","path",e),t instanceof iu){const r=Te.fromString(e,...n);return bg(r),new St(t,null,new K(r))}{if(!(t instanceof St||t instanceof ar))throw new q(M.INVALID_ARGUMENT,"Expected first argument to collection() to be a CollectionReference, a DocumentReference or FirebaseFirestore");const r=t._path.child(Te.fromString(e,...n));return bg(r),new St(t.firestore,t instanceof ar?t.converter:null,new K(r))}}/**
 * @license
 * Copyright 2020 Google LLC
 *
 * Licensed under the Apache License, Version 2.0 (the "License");
 * you may not use this file except in compliance with the License.
 * You may obtain a copy of the License at
 *
 *   http://www.apache.org/licenses/LICENSE-2.0
 *
 * Unless required by applicable law or agreed to in writing, software
 * distributed under the License is distributed on an "AS IS" BASIS,
 * WITHOUT WARRANTIES OR CONDITIONS OF ANY KIND, either express or implied.
 * See the License for the specific language governing permissions and
 * limitations under the License.
 */class Mg{constructor(e=Promise.resolve()){this.Pu=[],this.Iu=!1,this.Tu=[],this.Eu=null,this.du=!1,this.Au=!1,this.Ru=[],this.t_=new V0(this,"async_queue_retry"),this.Vu=()=>{const r=hc();r&&H("AsyncQueue","Visibility state changed to "+r.visibilityState),this.t_.jo()},this.mu=e;const n=hc();n&&typeof n.addEventListener=="function"&&n.addEventListener("visibilitychange",this.Vu)}get isShuttingDown(){return this.Iu}enqueueAndForget(e){this.enqueue(e)}enqueueAndForgetEvenWhileRestricted(e){this.fu(),this.gu(e)}enterRestrictedMode(e){if(!this.Iu){this.Iu=!0,this.Au=e||!1;const n=hc();n&&typeof n.removeEventListener=="function"&&n.removeEventListener("visibilitychange",this.Vu)}}enqueue(e){if(this.fu(),this.Iu)return new Promise(()=>{});const n=new Nr;return this.gu(()=>this.Iu&&this.Au?Promise.resolve():(e().then(n.resolve,n.reject),n.promise)).then(()=>n.promise)}enqueueRetryable(e){this.enqueueAndForget(()=>(this.Pu.push(e),this.pu()))}async pu(){if(this.Pu.length!==0){try{await this.Pu[0](),this.Pu.shift(),this.t_.reset()}catch(e){if(!Po(e))throw e;H("AsyncQueue","Operation failed with retryable error: "+e)}this.Pu.length>0&&this.t_.Go(()=>this.pu())}}gu(e){const n=this.mu.then(()=>(this.du=!0,e().catch(r=>{this.Eu=r,this.du=!1;const i=function(o){let l=o.message||"";return o.stack&&(l=o.stack.includes(o.message)?o.stack:o.message+`
`+o.stack),l}(r);throw Pn("INTERNAL UNHANDLED ERROR: ",i),r}).then(r=>(this.du=!1,r))));return this.mu=n,n}enqueueAfterDelay(e,n,r){this.fu(),this.Ru.indexOf(e)>-1&&(n=0);const i=cf.createAndSchedule(this,e,n,r,s=>this.yu(s));return this.Tu.push(i),i}fu(){this.Eu&&J()}verifyOperationInProgress(){}async wu(){let e;do e=this.mu,await e;while(e!==this.mu)}Su(e){for(const n of this.Tu)if(n.timerId===e)return!0;return!1}bu(e){return this.wu().then(()=>{this.Tu.sort((n,r)=>n.targetTimeMs-r.targetTimeMs);for(const n of this.Tu)if(n.skipDelay(),e!=="all"&&n.timerId===e)break;return this.wu()})}Du(e){this.Ru.push(e)}yu(e){const n=this.Tu.indexOf(e);this.Tu.splice(n,1)}}function Fg(t){return function(n,r){if(typeof n!="object"||n===null)return!1;const i=n;for(const s of r)if(s in i&&typeof i[s]=="function")return!0;return!1}(t,["next","error","complete"])}class po extends iu{constructor(e,n,r,i){super(e,n,r,i),this.type="firestore",this._queue=new Mg,this._persistenceKey=(i==null?void 0:i.name)||"[DEFAULT]"}async _terminate(){if(this._firestoreClient){const e=this._firestoreClient.terminate();this._queue=new Mg(e),this._firestoreClient=void 0,await e}}}function eP(t,e){const n=typeof t=="object"?t:h_(),r=typeof t=="string"?t:"(default)",i=Vd(n,"firestore").getImmediate({identifier:r});if(!i._initialized){const s=F1("firestore");s&&ZR(i,...s)}return i}function J0(t){if(t._terminated)throw new q(M.FAILED_PRECONDITION,"The client has already been terminated.");return t._firestoreClient||tP(t),t._firestoreClient}function tP(t){var e,n,r;const i=t._freezeSettings(),s=function(l,u,h,f){return new xA(l,u,h,f.host,f.ssl,f.experimentalForceLongPolling,f.experimentalAutoDetectLongPolling,Y0(f.experimentalLongPollingOptions),f.useFetchStreams)}(t._databaseId,((e=t._app)===null||e===void 0?void 0:e.options.appId)||"",t._persistenceKey,i);t._componentsProvider||!((n=i.localCache)===null||n===void 0)&&n._offlineComponentProvider&&(!((r=i.localCache)===null||r===void 0)&&r._onlineComponentProvider)&&(t._componentsProvider={_offline:i.localCache._offlineComponentProvider,_online:i.localCache._onlineComponentProvider}),t._firestoreClient=new QR(t._authCredentials,t._appCheckCredentials,t._queue,s,t._componentsProvider&&function(l){const u=l==null?void 0:l._online.build();return{_offline:l==null?void 0:l._offline.build(u),_online:u}}(t._componentsProvider))}/**
 * @license
 * Copyright 2020 Google LLC
 *
 * Licensed under the Apache License, Version 2.0 (the "License");
 * you may not use this file except in compliance with the License.
 * You may obtain a copy of the License at
 *
 *   http://www.apache.org/licenses/LICENSE-2.0
 *
 * Unless required by applicable law or agreed to in writing, software
 * distributed under the License is distributed on an "AS IS" BASIS,
 * WITHOUT WARRANTIES OR CONDITIONS OF ANY KIND, either express or implied.
 * See the License for the specific language governing permissions and
 * limitations under the License.
 */class ji{constructor(e){this._byteString=e}static fromBase64String(e){try{return new ji(Qe.fromBase64String(e))}catch(n){throw new q(M.INVALID_ARGUMENT,"Failed to construct data from Base64 string: "+n)}}static fromUint8Array(e){return new ji(Qe.fromUint8Array(e))}toBase64(){return this._byteString.toBase64()}toUint8Array(){return this._byteString.toUint8Array()}toString(){return"Bytes(base64: "+this.toBase64()+")"}isEqual(e){return this._byteString.isEqual(e._byteString)}}/**
 * @license
 * Copyright 2020 Google LLC
 *
 * Licensed under the Apache License, Version 2.0 (the "License");
 * you may not use this file except in compliance with the License.
 * You may obtain a copy of the License at
 *
 *   http://www.apache.org/licenses/LICENSE-2.0
 *
 * Unless required by applicable law or agreed to in writing, software
 * distributed under the License is distributed on an "AS IS" BASIS,
 * WITHOUT WARRANTIES OR CONDITIONS OF ANY KIND, either express or implied.
 * See the License for the specific language governing permissions and
 * limitations under the License.
 */class mf{constructor(...e){for(let n=0;n<e.length;++n)if(e[n].length===0)throw new q(M.INVALID_ARGUMENT,"Invalid field name at argument $(i + 1). Field names must not be empty.");this._internalPath=new He(e)}isEqual(e){return this._internalPath.isEqual(e._internalPath)}}/**
 * @license
 * Copyright 2020 Google LLC
 *
 * Licensed under the Apache License, Version 2.0 (the "License");
 * you may not use this file except in compliance with the License.
 * You may obtain a copy of the License at
 *
 *   http://www.apache.org/licenses/LICENSE-2.0
 *
 * Unless required by applicable law or agreed to in writing, software
 * distributed under the License is distributed on an "AS IS" BASIS,
 * WITHOUT WARRANTIES OR CONDITIONS OF ANY KIND, either express or implied.
 * See the License for the specific language governing permissions and
 * limitations under the License.
 */class Z0{constructor(e){this._methodName=e}}/**
 * @license
 * Copyright 2017 Google LLC
 *
 * Licensed under the Apache License, Version 2.0 (the "License");
 * you may not use this file except in compliance with the License.
 * You may obtain a copy of the License at
 *
 *   http://www.apache.org/licenses/LICENSE-2.0
 *
 * Unless required by applicable law or agreed to in writing, software
 * distributed under the License is distributed on an "AS IS" BASIS,
 * WITHOUT WARRANTIES OR CONDITIONS OF ANY KIND, either express or implied.
 * See the License for the specific language governing permissions and
 * limitations under the License.
 */class gf{constructor(e,n){if(!isFinite(e)||e<-90||e>90)throw new q(M.INVALID_ARGUMENT,"Latitude must be a number between -90 and 90, but was: "+e);if(!isFinite(n)||n<-180||n>180)throw new q(M.INVALID_ARGUMENT,"Longitude must be a number between -180 and 180, but was: "+n);this._lat=e,this._long=n}get latitude(){return this._lat}get longitude(){return this._long}isEqual(e){return this._lat===e._lat&&this._long===e._long}toJSON(){return{latitude:this._lat,longitude:this._long}}_compareTo(e){return ue(this._lat,e._lat)||ue(this._long,e._long)}}/**
 * @license
 * Copyright 2024 Google LLC
 *
 * Licensed under the Apache License, Version 2.0 (the "License");
 * you may not use this file except in compliance with the License.
 * You may obtain a copy of the License at
 *
 *   http://www.apache.org/licenses/LICENSE-2.0
 *
 * Unless required by applicable law or agreed to in writing, software
 * distributed under the License is distributed on an "AS IS" BASIS,
 * WITHOUT WARRANTIES OR CONDITIONS OF ANY KIND, either express or implied.
 * See the License for the specific language governing permissions and
 * limitations under the License.
 */class yf{constructor(e){this._values=(e||[]).map(n=>n)}toArray(){return this._values.map(e=>e)}isEqual(e){return function(r,i){if(r.length!==i.length)return!1;for(let s=0;s<r.length;++s)if(r[s]!==i[s])return!1;return!0}(this._values,e._values)}}/**
 * @license
 * Copyright 2017 Google LLC
 *
 * Licensed under the Apache License, Version 2.0 (the "License");
 * you may not use this file except in compliance with the License.
 * You may obtain a copy of the License at
 *
 *   http://www.apache.org/licenses/LICENSE-2.0
 *
 * Unless required by applicable law or agreed to in writing, software
 * distributed under the License is distributed on an "AS IS" BASIS,
 * WITHOUT WARRANTIES OR CONDITIONS OF ANY KIND, either express or implied.
 * See the License for the specific language governing permissions and
 * limitations under the License.
 */const nP=/^__.*__$/;class rP{constructor(e,n,r){this.data=e,this.fieldMask=n,this.fieldTransforms=r}toMutation(e,n){return this.fieldMask!==null?new qr(e,this.data,this.fieldMask,n,this.fieldTransforms):new xo(e,this.data,n,this.fieldTransforms)}}function ew(t){switch(t){case 0:case 2:case 1:return!0;case 3:case 4:return!1;default:throw J()}}class vf{constructor(e,n,r,i,s,o){this.settings=e,this.databaseId=n,this.serializer=r,this.ignoreUndefinedProperties=i,s===void 0&&this.vu(),this.fieldTransforms=s||[],this.fieldMask=o||[]}get path(){return this.settings.path}get Cu(){return this.settings.Cu}Fu(e){return new vf(Object.assign(Object.assign({},this.settings),e),this.databaseId,this.serializer,this.ignoreUndefinedProperties,this.fieldTransforms,this.fieldMask)}Mu(e){var n;const r=(n=this.path)===null||n===void 0?void 0:n.child(e),i=this.Fu({path:r,xu:!1});return i.Ou(e),i}Nu(e){var n;const r=(n=this.path)===null||n===void 0?void 0:n.child(e),i=this.Fu({path:r,xu:!1});return i.vu(),i}Lu(e){return this.Fu({path:void 0,xu:!0})}Bu(e){return Rl(e,this.settings.methodName,this.settings.ku||!1,this.path,this.settings.qu)}contains(e){return this.fieldMask.find(n=>e.isPrefixOf(n))!==void 0||this.fieldTransforms.find(n=>e.isPrefixOf(n.field))!==void 0}vu(){if(this.path)for(let e=0;e<this.path.length;e++)this.Ou(this.path.get(e))}Ou(e){if(e.length===0)throw this.Bu("Document fields must not be empty");if(ew(this.Cu)&&nP.test(e))throw this.Bu('Document fields cannot begin and end with "__"')}}class iP{constructor(e,n,r){this.databaseId=e,this.ignoreUndefinedProperties=n,this.serializer=r||tu(e)}Qu(e,n,r,i=!1){return new vf({Cu:e,methodName:n,qu:r,path:He.emptyPath(),xu:!1,ku:i},this.databaseId,this.serializer,this.ignoreUndefinedProperties)}}function sP(t){const e=t._freezeSettings(),n=tu(t._databaseId);return new iP(t._databaseId,!!e.ignoreUndefinedProperties,n)}function oP(t,e,n,r,i,s={}){const o=t.Qu(s.merge||s.mergeFields?2:0,e,n,i);iw("Data must be an object, but it was:",o,r);const l=nw(r,o);let u,h;if(s.merge)u=new $t(o.fieldMask),h=o.fieldTransforms;else if(s.mergeFields){const f=[];for(const g of s.mergeFields){const v=aP(e,g,n);if(!o.contains(v))throw new q(M.INVALID_ARGUMENT,`Field '${v}' is specified in your field mask but missing from your input data.`);uP(f,v)||f.push(v)}u=new $t(f),h=o.fieldTransforms.filter(g=>u.covers(g.field))}else u=null,h=o.fieldTransforms;return new rP(new Vt(l),u,h)}function tw(t,e){if(rw(t=At(t)))return iw("Unsupported field value:",e,t),nw(t,e);if(t instanceof Z0)return function(r,i){if(!ew(i.Cu))throw i.Bu(`${r._methodName}() can only be used with update() and set()`);if(!i.path)throw i.Bu(`${r._methodName}() is not currently supported inside arrays`);const s=r._toFieldTransform(i);s&&i.fieldTransforms.push(s)}(t,e),null;if(t===void 0&&e.ignoreUndefinedProperties)return null;if(e.path&&e.fieldMask.push(e.path),t instanceof Array){if(e.settings.xu&&e.Cu!==4)throw e.Bu("Nested arrays are not supported");return function(r,i){const s=[];let o=0;for(const l of r){let u=tw(l,i.Lu(o));u==null&&(u={nullValue:"NULL_VALUE"}),s.push(u),o++}return{arrayValue:{values:s}}}(t,e)}return function(r,i){if((r=At(r))===null)return{nullValue:"NULL_VALUE"};if(typeof r=="number")return ZA(i.serializer,r);if(typeof r=="boolean")return{booleanValue:r};if(typeof r=="string")return{stringValue:r};if(r instanceof Date){const s=Me.fromDate(r);return{timestampValue:kl(i.serializer,s)}}if(r instanceof Me){const s=new Me(r.seconds,1e3*Math.floor(r.nanoseconds/1e3));return{timestampValue:kl(i.serializer,s)}}if(r instanceof gf)return{geoPointValue:{latitude:r.latitude,longitude:r.longitude}};if(r instanceof ji)return{bytesValue:S0(i.serializer,r._byteString)};if(r instanceof St){const s=i.databaseId,o=r.firestore._databaseId;if(!o.isEqual(s))throw i.Bu(`Document reference is for database ${o.projectId}/${o.database} but should be for database ${s.projectId}/${s.database}`);return{referenceValue:tf(r.firestore._databaseId||i.databaseId,r._key.path)}}if(r instanceof yf)return function(o,l){return{mapValue:{fields:{__type__:{stringValue:"__vector__"},value:{arrayValue:{values:o.toArray().map(u=>{if(typeof u!="number")throw l.Bu("VectorValues must only contain numeric values.");return Xd(l.serializer,u)})}}}}}}(r,i);throw i.Bu(`Unsupported field value: ${pf(r)}`)}(t,e)}function nw(t,e){const n={};return e0(t)?e.path&&e.path.length>0&&e.fieldMask.push(e.path):Ki(t,(r,i)=>{const s=tw(i,e.Mu(r));s!=null&&(n[r]=s)}),{mapValue:{fields:n}}}function rw(t){return!(typeof t!="object"||t===null||t instanceof Array||t instanceof Date||t instanceof Me||t instanceof gf||t instanceof ji||t instanceof St||t instanceof Z0||t instanceof yf)}function iw(t,e,n){if(!rw(n)||!function(i){return typeof i=="object"&&i!==null&&(Object.getPrototypeOf(i)===Object.prototype||Object.getPrototypeOf(i)===null)}(n)){const r=pf(n);throw r==="an object"?e.Bu(t+" a custom object"):e.Bu(t+" "+r)}}function aP(t,e,n){if((e=At(e))instanceof mf)return e._internalPath;if(typeof e=="string")return sw(t,e);throw Rl("Field path arguments must be of type string or ",t,!1,void 0,n)}const lP=new RegExp("[~\\*/\\[\\]]");function sw(t,e,n){if(e.search(lP)>=0)throw Rl(`Invalid field path (${e}). Paths must not contain '~', '*', '/', '[', or ']'`,t,!1,void 0,n);try{return new mf(...e.split("."))._internalPath}catch{throw Rl(`Invalid field path (${e}). Paths must not be empty, begin with '.', end with '.', or contain '..'`,t,!1,void 0,n)}}function Rl(t,e,n,r,i){const s=r&&!r.isEmpty(),o=i!==void 0;let l=`Function ${e}() called with invalid data`;n&&(l+=" (via `toFirestore()`)"),l+=". ";let u="";return(s||o)&&(u+=" (found",s&&(u+=` in field ${r}`),o&&(u+=` in document ${i}`),u+=")"),new q(M.INVALID_ARGUMENT,l+t+u)}function uP(t,e){return t.some(n=>n.isEqual(e))}/**
 * @license
 * Copyright 2020 Google LLC
 *
 * Licensed under the Apache License, Version 2.0 (the "License");
 * you may not use this file except in compliance with the License.
 * You may obtain a copy of the License at
 *
 *   http://www.apache.org/licenses/LICENSE-2.0
 *
 * Unless required by applicable law or agreed to in writing, software
 * distributed under the License is distributed on an "AS IS" BASIS,
 * WITHOUT WARRANTIES OR CONDITIONS OF ANY KIND, either express or implied.
 * See the License for the specific language governing permissions and
 * limitations under the License.
 */class ow{constructor(e,n,r,i,s){this._firestore=e,this._userDataWriter=n,this._key=r,this._document=i,this._converter=s}get id(){return this._key.path.lastSegment()}get ref(){return new St(this._firestore,this._converter,this._key)}exists(){return this._document!==null}data(){if(this._document){if(this._converter){const e=new cP(this._firestore,this._userDataWriter,this._key,this._document,null);return this._converter.fromFirestore(e)}return this._userDataWriter.convertValue(this._document.data.value)}}get(e){if(this._document){const n=this._document.data.field(aw("DocumentSnapshot.get",e));if(n!==null)return this._userDataWriter.convertValue(n)}}}class cP extends ow{data(){return super.data()}}function aw(t,e){return typeof e=="string"?sw(t,e):e instanceof mf?e._internalPath:e._delegate._internalPath}/**
 * @license
 * Copyright 2020 Google LLC
 *
 * Licensed under the Apache License, Version 2.0 (the "License");
 * you may not use this file except in compliance with the License.
 * You may obtain a copy of the License at
 *
 *   http://www.apache.org/licenses/LICENSE-2.0
 *
 * Unless required by applicable law or agreed to in writing, software
 * distributed under the License is distributed on an "AS IS" BASIS,
 * WITHOUT WARRANTIES OR CONDITIONS OF ANY KIND, either express or implied.
 * See the License for the specific language governing permissions and
 * limitations under the License.
 */function hP(t){if(t.limitType==="L"&&t.explicitOrderBy.length===0)throw new q(M.UNIMPLEMENTED,"limitToLast() queries require specifying at least one orderBy() clause")}class dP{convertValue(e,n="none"){switch($r(e)){case 0:return null;case 1:return e.booleanValue;case 2:return xe(e.integerValue||e.doubleValue);case 3:return this.convertTimestamp(e.timestampValue);case 4:return this.convertServerTimestamp(e,n);case 5:return e.stringValue;case 6:return this.convertBytes(zr(e.bytesValue));case 7:return this.convertReference(e.referenceValue);case 8:return this.convertGeoPoint(e.geoPointValue);case 9:return this.convertArray(e.arrayValue,n);case 11:return this.convertObject(e.mapValue,n);case 10:return this.convertVectorValue(e.mapValue);default:throw J()}}convertObject(e,n){return this.convertObjectMap(e.fields,n)}convertObjectMap(e,n="none"){const r={};return Ki(e,(i,s)=>{r[i]=this.convertValue(s,n)}),r}convertVectorValue(e){var n,r,i;const s=(i=(r=(n=e.fields)===null||n===void 0?void 0:n.value.arrayValue)===null||r===void 0?void 0:r.values)===null||i===void 0?void 0:i.map(o=>xe(o.doubleValue));return new yf(s)}convertGeoPoint(e){return new gf(xe(e.latitude),xe(e.longitude))}convertArray(e,n){return(e.values||[]).map(r=>this.convertValue(r,n))}convertServerTimestamp(e,n){switch(n){case"previous":const r=qd(e);return r==null?null:this.convertValue(r,n);case"estimate":return this.convertTimestamp(lo(e));default:return null}}convertTimestamp(e){const n=hr(e);return new Me(n.seconds,n.nanos)}convertDocumentKey(e,n){const r=Te.fromString(e);pe(x0(r));const i=new uo(r.get(1),r.get(3)),s=new K(r.popFirst(5));return i.isEqual(n)||Pn(`Document ${s} contains a document reference within a different database (${i.projectId}/${i.database}) which is not supported. It will be treated as a reference in the current database (${n.projectId}/${n.database}) instead.`),s}}/**
 * @license
 * Copyright 2020 Google LLC
 *
 * Licensed under the Apache License, Version 2.0 (the "License");
 * you may not use this file except in compliance with the License.
 * You may obtain a copy of the License at
 *
 *   http://www.apache.org/licenses/LICENSE-2.0
 *
 * Unless required by applicable law or agreed to in writing, software
 * distributed under the License is distributed on an "AS IS" BASIS,
 * WITHOUT WARRANTIES OR CONDITIONS OF ANY KIND, either express or implied.
 * See the License for the specific language governing permissions and
 * limitations under the License.
 */function fP(t,e,n){let r;return r=t?t.toFirestore(e):e,r}/**
 * @license
 * Copyright 2020 Google LLC
 *
 * Licensed under the Apache License, Version 2.0 (the "License");
 * you may not use this file except in compliance with the License.
 * You may obtain a copy of the License at
 *
 *   http://www.apache.org/licenses/LICENSE-2.0
 *
 * Unless required by applicable law or agreed to in writing, software
 * distributed under the License is distributed on an "AS IS" BASIS,
 * WITHOUT WARRANTIES OR CONDITIONS OF ANY KIND, either express or implied.
 * See the License for the specific language governing permissions and
 * limitations under the License.
 */class As{constructor(e,n){this.hasPendingWrites=e,this.fromCache=n}isEqual(e){return this.hasPendingWrites===e.hasPendingWrites&&this.fromCache===e.fromCache}}class lw extends ow{constructor(e,n,r,i,s,o){super(e,n,r,i,o),this._firestore=e,this._firestoreImpl=e,this.metadata=s}exists(){return super.exists()}data(e={}){if(this._document){if(this._converter){const n=new Ua(this._firestore,this._userDataWriter,this._key,this._document,this.metadata,null);return this._converter.fromFirestore(n,e)}return this._userDataWriter.convertValue(this._document.data.value,e.serverTimestamps)}}get(e,n={}){if(this._document){const r=this._document.data.field(aw("DocumentSnapshot.get",e));if(r!==null)return this._userDataWriter.convertValue(r,n.serverTimestamps)}}}class Ua extends lw{data(e={}){return super.data(e)}}class pP{constructor(e,n,r,i){this._firestore=e,this._userDataWriter=n,this._snapshot=i,this.metadata=new As(i.hasPendingWrites,i.fromCache),this.query=r}get docs(){const e=[];return this.forEach(n=>e.push(n)),e}get size(){return this._snapshot.docs.size}get empty(){return this.size===0}forEach(e,n){this._snapshot.docs.forEach(r=>{e.call(n,new Ua(this._firestore,this._userDataWriter,r.key,r,new As(this._snapshot.mutatedKeys.has(r.key),this._snapshot.fromCache),this.query.converter))})}docChanges(e={}){const n=!!e.includeMetadataChanges;if(n&&this._snapshot.excludesMetadataChanges)throw new q(M.INVALID_ARGUMENT,"To include metadata changes with your document changes, you must also pass { includeMetadataChanges:true } to onSnapshot().");return this._cachedChanges&&this._cachedChangesIncludeMetadataChanges===n||(this._cachedChanges=function(i,s){if(i._snapshot.oldDocs.isEmpty()){let o=0;return i._snapshot.docChanges.map(l=>{const u=new Ua(i._firestore,i._userDataWriter,l.doc.key,l.doc,new As(i._snapshot.mutatedKeys.has(l.doc.key),i._snapshot.fromCache),i.query.converter);return l.doc,{type:"added",doc:u,oldIndex:-1,newIndex:o++}})}{let o=i._snapshot.oldDocs;return i._snapshot.docChanges.filter(l=>s||l.type!==3).map(l=>{const u=new Ua(i._firestore,i._userDataWriter,l.doc.key,l.doc,new As(i._snapshot.mutatedKeys.has(l.doc.key),i._snapshot.fromCache),i.query.converter);let h=-1,f=-1;return l.type!==0&&(h=o.indexOf(l.doc.key),o=o.delete(l.doc.key)),l.type!==1&&(o=o.add(l.doc),f=o.indexOf(l.doc.key)),{type:mP(l.type),doc:u,oldIndex:h,newIndex:f}})}}(this,n),this._cachedChangesIncludeMetadataChanges=n),this._cachedChanges}}function mP(t){switch(t){case 0:return"added";case 2:case 3:return"modified";case 1:return"removed";default:return J()}}class uw extends dP{constructor(e){super(),this.firestore=e}convertBytes(e){return new ji(e)}convertReference(e){const n=this.convertDocumentKey(e,this.firestore._databaseId);return new St(this.firestore,null,n)}}function va(t,e,n){t=Dr(t,St);const r=Dr(t.firestore,po),i=fP(t.converter,e);return cw(r,[oP(sP(r),"setDoc",t._key,i,t.converter!==null,n).toMutation(t._key,sn.none())])}function gP(t){return cw(Dr(t.firestore,po),[new Jd(t._key,sn.none())])}function pc(t,...e){var n,r,i;t=At(t);let s={includeMetadataChanges:!1,source:"default"},o=0;typeof e[o]!="object"||Fg(e[o])||(s=e[o],o++);const l={includeMetadataChanges:s.includeMetadataChanges,source:s.source};if(Fg(e[o])){const g=e[o];e[o]=(n=g.next)===null||n===void 0?void 0:n.bind(g),e[o+1]=(r=g.error)===null||r===void 0?void 0:r.bind(g),e[o+2]=(i=g.complete)===null||i===void 0?void 0:i.bind(g)}let u,h,f;if(t instanceof St)h=Dr(t.firestore,po),f=Yd(t._key.path),u={next:g=>{e[o]&&e[o](yP(h,t,g))},error:e[o+1],complete:e[o+2]};else{const g=Dr(t,su);h=Dr(g.firestore,po),f=g._query;const v=new uw(h);u={next:R=>{e[o]&&e[o](new pP(h,v,g,R))},error:e[o+1],complete:e[o+2]},hP(t._query)}return function(v,R,N,D){const V=new GR(D),S=new xR(R,V,N);return v.asyncQueue.enqueueAndForget(async()=>AR(await Dg(v),S)),()=>{V.Za(),v.asyncQueue.enqueueAndForget(async()=>CR(await Dg(v),S))}}(J0(h),f,l,u)}function cw(t,e){return function(r,i){const s=new Nr;return r.asyncQueue.enqueueAndForget(async()=>UR(await XR(r),i,s)),s.promise}(J0(t),e)}function yP(t,e,n){const r=n.docs.get(e._key),i=new uw(t);return new lw(t,i,e._key,r,new As(n.hasPendingWrites,n.fromCache),e.converter)}(function(e,n=!0){(function(i){qi=i})(Wi),Di(new jr("firestore",(r,{instanceIdentifier:i,options:s})=>{const o=r.getProvider("app").getImmediate(),l=new po(new mA(r.getProvider("auth-internal")),new _A(r.getProvider("app-check-internal")),function(h,f){if(!Object.prototype.hasOwnProperty.apply(h.options,["projectId"]))throw new q(M.INVALID_ARGUMENT,'"projectId" not provided in firebase.initializeApp.');return new uo(h.options.projectId,f)}(o,i),o);return s=Object.assign({useFetchStreams:n},s),l._setSettings(s),l},"PUBLIC").setMultipleInstances(!0)),or(tg,"4.7.3",e),or(tg,"4.7.3","esm2017")})();let mc,Ba,hn,Fn="asistan-live-workspace-v3",hw=!1;try{let t={apiKey:"AIzaSyCK9WtWTyXxKTY45Mzw0kV4sPsfCIrwUG8",authDomain:"asistanv2-206bc.firebaseapp.com",projectId:"asistanv2-206bc",storageBucket:"asistanv2-206bc.firebasestorage.app",messagingSenderId:"78097147227",appId:"1:78097147227:web:7e990ef654e89c5a2ee67e"};t&&t.apiKey&&(mc=c_(t),Ba=hA(mc),hn=eP(mc),hw=!0)}catch(t){console.warn("Firebase config error:",t)}const Ui=()=>Date.now().toString(36)+Math.random().toString(36).slice(2,7),Vr=()=>new Date().toISOString().slice(0,10),dw=t=>t?new Date(t).toLocaleDateString("tr-TR",{day:"2-digit",month:"short",year:"numeric"}):"",gc=[{id:"asakai",label:"Asakai Toplantısı",icon:xd,color:"#F59E0B"},{id:"iyilestirme",label:"İyileştirme Toplantısı",icon:S1,color:"#38BDF8"},{id:"kalite_guvence",label:"Kalite Güvence",icon:Rd,color:"#10B981"},{id:"kalite_kontrol",label:"Kalite Kontrol",icon:Cd,color:"#A855F7"},{id:"tedarik_kalite",label:"Tedarik Kalite",icon:C1,color:"#EC4899"}],fw=[{id:"acik",label:"Açık / Yeni",color:"#EF4444"},{id:"devam",label:"Devam Ediyor",color:"#F59E0B"},{id:"beklemede",label:"Beklemede",color:"#3B82F6"},{id:"tamam",label:"Tamamlandı",color:"#10B981"}],_a=[{id:"usr-admin",username:"admin",password:"0000",name:"Sistem Yöneticisi (Admin)",role:"admin",status:"approved",permissions:["asakai","iyilestirme","kalite_guvence","kalite_kontrol","tedarik_kalite"]},{id:"usr-ahmet",username:"ahmet",password:"0000",name:"Ahmet Yılmaz",role:"moderator",status:"approved",permissions:["asakai","kalite_guvence"]}],yc=[{id:"tsk-1",module:"asakai",kod:"ASK-2026-001",baslik:"Vardiya A Hatası Giriş Kontrol Tespiti",sorumlu:"Ahmet Yılmaz",gorevTipi:"bireysel",ekipUyeleri:[],acilisTarihi:Vr(),vade:Vr(),bitisTarihi:"",durum:"acik",oncelik:"Kritik",subtasks:[]}],vc=[{id:"td-1",user:"Ahmet Yılmaz",text:"Sabah 09:00 Üretim hattı brifingine katıl",done:!1,priority:"Yüksek",subtasks:[],developments:[]}],Cs=[{id:"chat-genel",type:"general",title:"Genel Ekip Sohbeti",participants:[],messages:[{id:"m-1",sender:"Sistem",text:"Bulut Çalışma Alanına Hoş Geldiniz.",time:"08:30"}]}];function vP(){const[t,e]=Q.useState("loading"),[n,r]=Q.useState(null),[i,s]=Q.useState(()=>{try{return JSON.parse(localStorage.getItem("asistan_modules"))||gc}catch{return gc}}),[o,l]=Q.useState(()=>{try{return JSON.parse(localStorage.getItem("asistan_users"))||_a}catch{return _a}}),[u,h]=Q.useState(()=>{try{return JSON.parse(localStorage.getItem("asistan_tasks"))||yc}catch{return yc}}),[f,g]=Q.useState(()=>{try{return JSON.parse(localStorage.getItem("asistan_todos"))||vc}catch{return vc}}),[v,R]=Q.useState(()=>{try{return JSON.parse(localStorage.getItem("asistan_chats"))||Cs}catch{return Cs}}),[N,D]=Q.useState(()=>{try{return JSON.parse(localStorage.getItem("asistan_notifs"))||[]}catch{return[]}}),[V,S]=Q.useState(()=>{try{return JSON.parse(localStorage.getItem("asistan_current_user"))||null}catch{return null}}),[_,k]=Q.useState(()=>!!localStorage.getItem("asistan_current_user")),[O,U]=Q.useState("dashboard"),[B,E]=Q.useState("all"),[y,w]=Q.useState(null),[I,A]=Q.useState(""),[P,T]=Q.useState(null),[pt,Kt]=Q.useState(!1),[gr,Pt]=Q.useState(!1);Q.useEffect(()=>{if(!hw){e("local");return}(async()=>{try{typeof __initial_auth_token<"u"&&__initial_auth_token?await XS(Ba,__initial_auth_token):await qS(Ba)}catch(ne){console.warn("Auth failed, falling back to local storage.",ne),e("local")}})();const te=ek(Ba,ne=>{ne?(r(ne),e("firebase")):e("local")});return()=>te()},[]),Q.useEffect(()=>{if(t!=="firebase"||!n)return;const j=[],te=(ne,ce,Fe)=>pc(fc(hn,"artifacts",Fn,"public","data",ne),Ye=>{Ye.empty?Fe&&Fe.length>0?(Fe.forEach(Gt=>va(vs(hn,"artifacts",Fn,"public","data",ne,Gt.id),Gt)),ce(Fe)):ce([]):ce(Ye.docs.map(Gt=>({id:Gt.id,...Gt.data()})))},Ye=>{console.error(`${ne} sync error, falling back to local:`,Ye),e("local")});return j.push(te("modules",s,gc)),j.push(te("users",l,_a)),j.push(te("tasks",h,yc)),j.push(te("todos",g,vc)),j.push(pc(fc(hn,"artifacts",Fn,"public","data","chats"),ne=>{ne.empty?(va(vs(hn,"artifacts",Fn,"public","data","chats","chat-genel"),Cs[0]),R(Cs)):R(ne.docs.map(ce=>({id:ce.id,...ce.data()})))},()=>e("local"))),j.push(pc(fc(hn,"artifacts",Fn,"public","data","notifications"),ne=>{D(ne.docs.map(ce=>({id:ce.id,...ce.data()})))},()=>e("local"))),()=>j.forEach(ne=>ne())},[t,n]),Q.useEffect(()=>{if(t==="local")try{localStorage.setItem("asistan_modules",JSON.stringify(i)),localStorage.setItem("asistan_users",JSON.stringify(o)),localStorage.setItem("asistan_tasks",JSON.stringify(u)),localStorage.setItem("asistan_todos",JSON.stringify(f)),localStorage.setItem("asistan_chats",JSON.stringify(v)),localStorage.setItem("asistan_notifs",JSON.stringify(N))}catch{}},[i,o,u,f,v,N,t]),Q.useEffect(()=>{try{V&&!_?localStorage.setItem("asistan_current_user",JSON.stringify(V)):V||localStorage.removeItem("asistan_current_user")}catch{}},[V,_]);const $=async(j,te,ne=[])=>{const ce=Ui(),Fe={id:ce,user:j,ekipUyeleri:ne,text:te,date:Vr(),read:!1};t==="firebase"&&n?await va(vs(hn,"artifacts",Fn,"public","data","notifications",ce),Fe):D(Ye=>[Fe,...Ye])},Y=(j,te)=>{const ce=(o.length>0?o:_a).find(Fe=>Fe.username.toLowerCase()===j.toLowerCase()&&Fe.password===te);ce?(S(ce),k(!1),U("dashboard"),T(null)):T("Hatalı Kullanıcı Adı veya Şifre!")},G=async(j,te,ne)=>{t==="firebase"&&n?await va(vs(hn,"artifacts",Fn,"public","data",j,te.id),te):ne(ce=>ce.find(Ye=>Ye.id===te.id)?ce.map(Ye=>Ye.id===te.id?te:Ye):[...ce,te])},he=async(j,te,ne)=>{t==="firebase"&&n?await gP(vs(hn,"artifacts",Fn,"public","data",j,te)):ne(ce=>ce.filter(Fe=>Fe.id!==te))},de=async j=>{var Fe;const te=Ui(),ne=(j.module||"ask").substring(0,3).toUpperCase(),ce={id:te,module:j.module||((Fe=i[0])==null?void 0:Fe.id)||"asakai",kod:`${ne}-2026-${(u.length+1).toString().padStart(3,"0")}`,baslik:j.baslik,sorumlu:j.sorumlu||V.name,gorevTipi:j.gorevTipi||"bireysel",ekipUyeleri:j.gorevTipi==="ekip"?j.ekipUyeleri||[]:[],acilisTarihi:j.acilisTarihi||Vr(),vade:j.vade||Vr(),bitisTarihi:"",durum:"acik",oncelik:j.oncelik||"Orta",subtasks:j.subtasks||[]};await G("tasks",ce,h),$(ce.sorumlu,`Yeni görev atandı: ${ce.baslik}`,ce.ekipUyeleri)};if(!V)return p.jsx(_P,{onLogin:Y,error:P,syncMode:t});if(_)return p.jsx("div",{style:C.loginOverlay,children:p.jsxs("div",{style:C.loginCard,children:[p.jsxs("div",{style:C.loginHeader,children:[p.jsx("div",{style:C.loginLogo,children:p.jsx(tc,{size:36,color:"#F59E0B"})}),p.jsx("h1",{style:{fontSize:20,fontWeight:800,marginTop:10,color:"#F59E0B"},children:"Oturum Kilitli"}),p.jsxs("p",{style:{fontSize:12,color:"#94A3B8",marginTop:4},children:["Tekrar hoş geldiniz, ",V.name,"."]})]}),P&&p.jsx("div",{style:C.errorBar,children:P}),p.jsxs("form",{onSubmit:j=>{j.preventDefault(),j.target.password.value===V.password?(k(!1),T(null)):T("Şifre hatalı!")},style:{display:"flex",flexDirection:"column",gap:14},children:[p.jsxs("div",{children:[p.jsx("label",{style:C.inputLabel,children:"Şifreniz"}),p.jsx("input",{name:"password",type:"password",maxLength:4,style:C.mainInput,required:!0,autoFocus:!0})]}),p.jsxs("button",{type:"submit",style:C.loginSubmitBtn,children:["Kilidi Aç ",p.jsx(Jv,{size:16})]}),p.jsx("button",{type:"button",style:C.ghostBtn,onClick:()=>S(null),children:"Farklı Hesapla Gir"})]})]})});const we=N.filter(j=>j.user===V.name||j.ekipUyeleri&&j.ekipUyeleri.includes(V.name)),xt=we.filter(j=>!j.read).length;return p.jsxs("div",{style:C.appShell,children:[p.jsxs("header",{style:C.header,children:[p.jsxs("div",{style:C.brand,children:[p.jsx("div",{style:C.logoIcon,children:p.jsx(Rd,{size:24,color:"#F59E0B"})}),p.jsxs("div",{children:[p.jsx("div",{style:C.brandName,children:"ASİSTAN OS"}),p.jsx("div",{style:C.brandSub,children:"Süreç & Yetki Yönetim Paneli"})]})]}),p.jsxs("nav",{style:C.navTabs,children:[p.jsxs("button",{style:{...C.navTab,...O==="dashboard"?C.navTabActive:{}},onClick:()=>{U("dashboard"),E("all")},children:[p.jsx(w1,{size:15,color:"#F59E0B"}),p.jsx("span",{children:"Dashboard"})]}),p.jsxs("button",{style:{...C.navTab,...O==="todo"?C.navTabActive:{}},onClick:()=>U("todo"),children:[p.jsx(E1,{size:15,color:"#F59E0B"}),p.jsx("span",{children:"To-Do List"})]}),i.map(j=>{const te=O===j.id;return p.jsxs("button",{style:{...C.navTab,...te?C.navTabActive:{}},onClick:()=>U(j.id),children:[p.jsx(xd,{size:15,color:te?"#F59E0B":j.color}),p.jsx("span",{children:j.label})]},j.id)}),p.jsxs("button",{style:{...C.navTab,...O==="ic_yazisma"?C.navTabActive:{}},onClick:()=>U("ic_yazisma"),children:[p.jsx(I1,{size:15,color:"#38BDF8"}),p.jsx("span",{children:"İç Yazışmalar"})]}),p.jsxs("button",{style:{...C.navTab,...O==="detayli_rapor"?C.navTabActive:{}},onClick:()=>U("detayli_rapor"),children:[p.jsx(v1,{size:15,color:"#38BDF8"}),p.jsx("span",{children:"Detaylı Rapor"})]}),V.role==="admin"&&p.jsxs("button",{style:{...C.navTab,...O==="admin_panel"?C.navTabAdminActive:{}},onClick:()=>U("admin_panel"),children:[p.jsx(tc,{size:15,color:"#EF4444"}),p.jsx("span",{children:"Admin Panel"})]})]}),p.jsxs("div",{style:{display:"flex",alignItems:"center",gap:12,marginLeft:"auto"},children:[t==="firebase"?p.jsxs("span",{style:{fontSize:10,color:"#10B981",background:"rgba(16, 185, 129, 0.15)",padding:"4px 8px",borderRadius:8,display:"flex",alignItems:"center",gap:4},children:[p.jsx(x1,{size:12})," Bulut"]}):p.jsxs("span",{style:{fontSize:10,color:"#EF4444",background:"rgba(239, 68, 68, 0.15)",padding:"4px 8px",borderRadius:8,display:"flex",alignItems:"center",gap:4},children:[p.jsx(P1,{size:12})," Yerel"]}),p.jsxs("button",{style:C.notificationBellBtn,onClick:()=>Pt(!0),title:"Bildirimler",children:[p.jsx(y1,{size:18,color:"#F59E0B"}),xt>0&&p.jsx("span",{style:C.notificationBadge,children:xt})]}),p.jsxs("div",{style:C.userProfileBar,children:[p.jsxs("div",{style:{textAlign:"right"},children:[p.jsx("div",{style:C.userName,children:V.name}),p.jsx("div",{style:C.userRoleTag,children:V.role==="admin"?"🔑 Admin":"👤 Kullanıcı"})]}),p.jsx("div",{style:C.userAvatar,children:V.name.charAt(0)}),p.jsxs("div",{style:{display:"flex",flexDirection:"column",gap:4,marginLeft:4},children:[p.jsx("button",{style:C.actionSmallBtn,onClick:()=>Kt(!0),title:"Şifre Değiştir",children:p.jsx(_1,{size:14,color:"#38BDF8"})}),p.jsx("button",{style:C.actionSmallBtn,onClick:()=>{S(null),k(!1)},title:"Çıkış Yap",children:p.jsx(T1,{size:14,color:"#EF4444"})})]})]})]})]}),p.jsx("main",{style:C.mainContent,children:O==="dashboard"?p.jsx(wP,{tasks:u,currentUser:V,dashboardFilter:B,setDashboardFilter:E,onOpenDetail:w,onNavigateModule:U,modulesList:i}):O==="todo"?p.jsx(SP,{todos:f,currentUser:V,onSaveTodo:j=>G("todos",j,g),onDeleteTodo:j=>he("todos",j,g)}):O==="ic_yazisma"?p.jsx(kP,{chats:v,currentUser:V,usersList:o,tasks:u,onSaveChat:j=>G("chats",j,R)}):O==="admin_panel"?V.role==="admin"?p.jsx(AP,{usersList:o,modulesList:i,onSaveUser:j=>G("users",j,l),onDeleteUser:j=>he("users",j,l),onSaveModule:j=>G("modules",j,s),onDeleteModule:j=>he("modules",j,s)}):p.jsxs("div",{style:C.unauthorizedBox,children:[p.jsx(tc,{size:40,color:"#EF4444"}),p.jsx("h2",{children:"Yetkiniz Yok"})]}):O==="detayli_rapor"?p.jsx(RP,{tasks:u,usersList:o,modulesList:i}):p.jsx(EP,{activeModule:O,modulesList:i,tasks:u.filter(j=>j.module===O),searchQuery:I,setSearchQuery:A,currentUser:V,onOpenDetail:w,onMoveStage:(j,te)=>{const ne=u.find(ce=>ce.id===j);ne&&G("tasks",{...ne,durum:te},h)},onCreateTask:de,onDeleteTask:j=>he("tasks",j,h),usersList:o})}),y&&p.jsx(IP,{task:y,currentUser:V,onClose:()=>w(null),onSaveTask:j=>G("tasks",j,h),onDeleteTask:j=>{he("tasks",j,h),w(null)}}),pt&&p.jsx(xP,{currentUser:V,onClose:()=>Kt(!1),onSaveUser:j=>G("users",j,l)}),gr&&p.jsx(PP,{notifications:we,onClose:()=>Pt(!1),onMarkAllRead:()=>{N.forEach(j=>{j.user===V.name&&G("notifications",{...j,read:!0},D)})}})]})}function _P({onLogin:t,error:e,syncMode:n}){const[r,i]=Q.useState(""),[s,o]=Q.useState("");return p.jsx("div",{style:C.loginOverlay,children:p.jsxs("div",{style:C.loginCard,children:[p.jsxs("div",{style:C.loginHeader,children:[p.jsx("div",{style:C.loginLogo,children:p.jsx(Rd,{size:36,color:"#F59E0B"})}),p.jsx("h1",{style:{fontSize:24,fontWeight:800,marginTop:12,color:"#F59E0B"},children:"ASİSTAN"}),p.jsx("p",{style:{fontSize:12,color:"#94A3B8",marginTop:6},children:"Süreç ve Kalite Yönetim Sistemi"})]}),e&&p.jsx("div",{style:C.errorBar,children:e}),p.jsxs("form",{onSubmit:l=>{l.preventDefault(),t(r.trim(),s.trim())},style:{display:"flex",flexDirection:"column",gap:16,marginTop:10},children:[p.jsxs("div",{children:[p.jsx("label",{style:C.inputLabel,children:"Kullanıcı Adı (Örn: admin, ahmet)"}),p.jsx("input",{style:C.mainInput,value:r,onChange:l=>i(l.target.value),placeholder:"Kullanıcı adınızı girin...",required:!0,autoFocus:!0})]}),p.jsxs("div",{children:[p.jsx("label",{style:C.inputLabel,children:"Şifre (İlk giriş: 0000)"}),p.jsx("input",{type:"password",maxLength:4,style:C.mainInput,value:s,onChange:l=>o(l.target.value),placeholder:"Şifrenizi girin...",required:!0})]}),p.jsxs("button",{type:"submit",style:C.loginSubmitBtn,children:["Giriş Yap ",p.jsx(Jv,{size:16})]})]}),p.jsx("div",{style:{marginTop:20,textAlign:"center",fontSize:11,fontWeight:700,color:n==="firebase"?"#10B981":n==="loading"?"#F59E0B":"#EF4444"},children:n==="firebase"?"✅ Canlı Bulut Bağlantısı Aktif":n==="loading"?"☁️ Bulut Bağlantısı Bekleniyor...":"⚠️ Çevrimdışı (Yerel Hafıza Modu)"})]})})}function wP({tasks:t,currentUser:e,dashboardFilter:n,setDashboardFilter:r,onOpenDetail:i,onNavigateModule:s,modulesList:o}){const l=t.filter(h=>h.sorumlu===e.name||h.ekipUyeleri&&h.ekipUyeleri.includes(e.name)),u=Q.useMemo(()=>n==="aktif"?l.filter(h=>h.durum!=="tamam"):n==="tamamlanan"?l.filter(h=>h.durum==="tamam"):n==="geciken"?l.filter(h=>h.durum!=="tamam"&&h.vade&&new Date(h.vade)<new Date(Vr())):n==="acik"?l.filter(h=>h.durum==="acik"):l,[l,n]);return p.jsxs("div",{style:C.viewContainer,children:[p.jsxs("div",{style:C.yearEndHeader,children:[p.jsxs("div",{children:[p.jsx("h1",{style:C.viewTitle,children:"Dashboard"}),p.jsxs("p",{style:C.viewSub,children:["Hoş geldiniz, ",e.name,"."]})]}),p.jsxs("button",{style:C.printBtn,onClick:()=>window.print(),children:[p.jsx(e_,{size:15})," Yazdır"]})]}),p.jsxs("div",{style:C.dashboardCardGrid,children:[p.jsxs("div",{style:{...C.dashCard,borderLeftColor:"#38BDF8",cursor:"pointer"},onClick:()=>r("all"),children:[p.jsx("div",{style:C.dashCardTitle,children:"Toplam İş"}),p.jsx("div",{style:C.dashCardValue,children:l.length})]}),p.jsxs("div",{style:{...C.dashCard,borderLeftColor:"#F59E0B",cursor:"pointer"},onClick:()=>r("aktif"),children:[p.jsx("div",{style:C.dashCardTitle,children:"Aktif İşler"}),p.jsx("div",{style:C.dashCardValue,children:l.filter(h=>h.durum!=="tamam").length})]}),p.jsxs("div",{style:{...C.dashCard,borderLeftColor:"#10B981",cursor:"pointer"},onClick:()=>r("tamamlanan"),children:[p.jsx("div",{style:C.dashCardTitle,children:"Tamamlanan"}),p.jsx("div",{style:C.dashCardValue,children:l.filter(h=>h.durum==="tamam").length})]})]}),p.jsx("div",{style:{display:"grid",gridTemplateColumns:"repeat(auto-fit, minmax(280px, 1fr))",gap:16},children:u.length===0?p.jsx("div",{style:{color:"#64748B",gridColumn:"span 3",padding:30},children:"Kritere uygun görev yok."}):u.map(h=>p.jsxs("div",{style:C.personalTaskCard,onClick:()=>i(h),children:[p.jsxs("div",{style:{display:"flex",justifyContent:"space-between",alignItems:"center"},children:[p.jsx("span",{style:C.taskCodeBadge,children:h.kod}),p.jsx("span",{style:{fontSize:10,fontWeight:700,padding:"2px 8px",borderRadius:6,background:h.durum==="tamam"?"rgba(16, 185, 129, 0.2)":"rgba(245, 158, 11, 0.2)",color:h.durum==="tamam"?"#10B981":"#F59E0B"},children:h.durum.toUpperCase()})]}),p.jsx("div",{style:{fontSize:14,fontWeight:700,marginTop:4,color:"#F8FAFC"},children:h.baslik}),p.jsxs("div",{style:{fontSize:11,color:"#94A3B8",marginTop:10,borderTop:"1px solid #334155",paddingTop:8},children:["Vade: ",dw(h.vade)]})]},h.id))})]})}function EP({activeModule:t,modulesList:e,tasks:n,searchQuery:r,setSearchQuery:i,currentUser:s,onOpenDetail:o,onMoveStage:l,onCreateTask:u,onDeleteTask:h,usersList:f}){const[g,v]=Q.useState(!1),R=e.find(V=>V.id===t)||{label:"Pano",color:"#F59E0B"},N=n.filter(V=>V.baslik.toLowerCase().includes(r.toLowerCase())||V.sorumlu.toLowerCase().includes(r.toLowerCase())),D=s.role==="admin"||s.role==="moderator";return p.jsxs("div",{style:C.viewContainer,children:[p.jsxs("div",{style:C.yearEndHeader,children:[p.jsxs("div",{style:{display:"flex",alignItems:"center",gap:12},children:[p.jsx("div",{style:{background:"rgba(245, 158, 11, 0.15)",padding:10,borderRadius:12},children:p.jsx(xd,{size:24,color:R.color})}),p.jsx("div",{children:p.jsx("h1",{style:C.viewTitle,children:R.label})})]}),D&&p.jsxs("button",{style:C.primaryActionBtn,onClick:()=>v(!0),children:[p.jsx(Zv,{size:16})," Görev Ekle"]})]}),p.jsx("div",{style:C.filterToolbar,children:p.jsxs("div",{style:C.searchWrapper,children:[p.jsx(k1,{size:15,color:"#F59E0B"}),p.jsx("input",{style:C.searchInput,placeholder:"Ara...",value:r,onChange:V=>i(V.target.value)})]})}),p.jsx("div",{style:C.kanbanGrid,children:fw.map(V=>{const S=N.filter(_=>_.durum===V.id);return p.jsxs("div",{style:C.kanbanColumn,onDragOver:_=>_.preventDefault(),onDrop:_=>{_.preventDefault();const k=_.dataTransfer.getData("text");k&&l(k,V.id)},children:[p.jsxs("div",{style:{...C.kanbanColumnHeader,borderTopColor:V.color},children:[p.jsx("span",{style:{fontWeight:800,fontSize:13,color:V.color},children:V.label}),p.jsx("span",{style:C.kanbanBadge,children:S.length})]}),p.jsx("div",{style:C.kanbanCardsList,children:S.map(_=>p.jsxs("div",{style:C.kanbanCard,draggable:!0,onDragStart:k=>k.dataTransfer.setData("text",_.id),children:[p.jsxs("div",{style:C.cardHeaderRow,children:[p.jsx("span",{style:C.taskCodeBadge,children:_.kod}),D&&p.jsx("button",{style:C.deleteIconBtn,onClick:()=>h(_.id),children:p.jsx(Pd,{size:12})})]}),p.jsx("div",{style:C.kanbanCardTitle,onClick:()=>o(_),children:_.baslik}),p.jsxs("div",{style:C.kanbanCardFooter,children:[p.jsxs("span",{children:["👤 ",_.sorumlu]}),p.jsxs("span",{children:["📅 ",dw(_.vade)]})]})]},_.id))})]},V.id)})}),g&&p.jsx(TP,{activeModule:t,modulesList:e,usersList:f,currentUser:s,onClose:()=>v(!1),onCreate:u})]})}function TP({activeModule:t,modulesList:e,usersList:n,currentUser:r,onClose:i,onCreate:s}){var N;const[o,l]=Q.useState(""),[u,h]=Q.useState((r==null?void 0:r.name)||((N=n[0])==null?void 0:N.name)||""),[f,g]=Q.useState(Vr()),[v,R]=Q.useState(t);return p.jsx("div",{style:C.modalOverlay,children:p.jsxs("div",{style:{...C.createModalContent,maxWidth:520},children:[p.jsxs("div",{style:C.drawerHeader,children:[p.jsx("h2",{style:C.formTitle,children:"Yeni Görev Oluştur"}),p.jsx("button",{style:C.closeBtn,onClick:i,children:p.jsx(wo,{size:18})})]}),p.jsxs("div",{style:{display:"flex",flexDirection:"column",gap:14,marginTop:14},children:[p.jsxs("div",{children:[p.jsx("label",{style:C.inputLabel,children:"Başlık"}),p.jsx("input",{style:C.mainInput,value:o,onChange:D=>l(D.target.value),placeholder:"Görev başlığı yazın..."})]}),p.jsxs("div",{children:[p.jsx("label",{style:C.inputLabel,children:"Modül (Pano)"}),p.jsx("select",{style:C.selectInput,value:v,onChange:D=>R(D.target.value),children:e.map(D=>p.jsx("option",{value:D.id,children:D.label},D.id))})]}),p.jsxs("div",{children:[p.jsx("label",{style:C.inputLabel,children:"Sorumlu"}),p.jsx("select",{style:C.selectInput,value:u,onChange:D=>h(D.target.value),children:n.map(D=>p.jsx("option",{value:D.name,children:D.name},D.id))})]}),p.jsxs("div",{children:[p.jsx("label",{style:C.inputLabel,children:"Vade"}),p.jsx("input",{type:"date",style:C.selectInput,value:f,onChange:D=>g(D.target.value)})]}),p.jsx("button",{style:C.primaryActionBtn,onClick:()=>{o&&(s({baslik:o,sorumlu:u,vade:f,module:v,gorevTipi:"bireysel",ekipUyeleri:[]}),i())},children:"Görevi Oluştur"})]})]})})}function IP({task:t,currentUser:e,onClose:n,onSaveTask:r,onDeleteTask:i}){const[s,o]=Q.useState(""),l=t.subtasks||[],u=e.role==="admin"||e.role==="moderator";return p.jsx("div",{style:C.modalOverlay,children:p.jsxs("div",{style:C.drawerContainer,children:[p.jsxs("div",{style:C.drawerHeader,children:[p.jsx("span",{style:C.taskCodeBadge,children:t.kod}),p.jsx("button",{style:C.closeBtn,onClick:n,children:p.jsx(wo,{size:18})})]}),p.jsxs("div",{style:C.drawerBody,children:[p.jsx("h2",{style:{fontSize:18,fontWeight:800},children:t.baslik}),p.jsxs("div",{style:{display:"grid",gridTemplateColumns:"1fr 1fr",gap:12,background:"#0F172A",padding:12,borderRadius:10},children:[p.jsxs("div",{children:[p.jsx("label",{style:C.inputLabel,children:"Sorumlu"}),p.jsx("div",{children:t.sorumlu})]}),p.jsxs("div",{children:[p.jsx("label",{style:C.inputLabel,children:"Aşama"}),p.jsx("select",{style:C.selectInput,value:t.durum,onChange:h=>r({...t,durum:h.target.value}),children:fw.map(h=>p.jsx("option",{value:h.id,children:h.label},h.id))})]})]}),p.jsxs("div",{style:C.subtaskSection,children:[p.jsx("div",{style:{fontWeight:700,fontSize:13,color:"#F59E0B"},children:"Alt Adımlar"}),l.map(h=>p.jsxs("div",{style:C.subtaskRowInteractive,onClick:()=>r({...t,subtasks:l.map(f=>f.id===h.id?{...f,done:!f.done}:f)}),children:[h.done?p.jsx(Cd,{size:16,color:"#10B981"}):p.jsx(t_,{size:16,color:"#6B7280"}),p.jsx("span",{style:{textDecoration:h.done?"line-through":"none",flex:1},children:h.text}),p.jsx(Pd,{size:12,color:"#EF4444",onClick:f=>{f.stopPropagation(),r({...t,subtasks:l.filter(g=>g.id!==h.id)})}})]},h.id)),p.jsxs("div",{style:{display:"flex",gap:6,marginTop:8},children:[p.jsx("input",{style:C.mainInput,placeholder:"Alt adım...",value:s,onChange:h=>o(h.target.value)}),p.jsx("button",{style:C.addInlineBtn,onClick:()=>{s.trim()&&(r({...t,subtasks:[...l,{id:Ui(),text:s.trim(),done:!1}]}),o(""))},children:"Ekle"})]})]})]}),p.jsxs("div",{style:C.drawerFooter,children:[u?p.jsx("button",{style:C.deleteDangerBtn,onClick:()=>i(t.id),children:"Görevi Sil"}):p.jsx("div",{}),p.jsx("button",{style:C.primaryActionBtn,onClick:n,children:"Kapat"})]})]})})}function SP({todos:t,currentUser:e,onSaveTodo:n,onDeleteTodo:r}){const[i,s]=Q.useState(""),o=t.filter(l=>l.user===e.name);return p.jsxs("div",{style:C.viewContainer,children:[p.jsx("h1",{style:C.viewTitle,children:"Kişisel To-Do List"}),p.jsxs("div",{style:{background:"#1E293B",border:"1px solid #334155",borderRadius:14,padding:20},children:[p.jsxs("form",{onSubmit:l=>{l.preventDefault(),i&&(n({id:Ui(),user:e.name,text:i.trim(),done:!1}),s(""))},style:{display:"flex",gap:10},children:[p.jsx("input",{style:{...C.mainInput,flex:3},placeholder:"Yeni not...",value:i,onChange:l=>s(l.target.value)}),p.jsxs("button",{type:"submit",style:C.primaryActionBtn,children:[p.jsx(Zv,{size:16})," Ekle"]})]}),p.jsx("div",{style:{display:"flex",flexDirection:"column",gap:8,marginTop:14},children:o.map(l=>p.jsxs("div",{style:{display:"flex",alignItems:"center",justifyContent:"space-between",background:"#0F172A",padding:"12px 16px",borderRadius:10,border:"1px solid #334155"},children:[p.jsxs("div",{style:{display:"flex",alignItems:"center",gap:12,cursor:"pointer",flex:1},onClick:()=>n({...l,done:!l.done}),children:[l.done?p.jsx(Cd,{size:20,color:"#10B981"}):p.jsx(t_,{size:20,color:"#F59E0B"}),p.jsx("span",{style:{textDecoration:l.done?"line-through":"none",color:l.done?"#64748B":"#F8FAFC",fontSize:13,fontWeight:600},children:l.text})]}),p.jsx("button",{style:C.deleteIconBtn,onClick:()=>r(l.id),children:p.jsx(Pd,{size:14})})]},l.id))})]})]})}function kP({chats:t,currentUser:e,onSaveChat:n}){const r=t[0]||Cs[0],[i,s]=Q.useState(""),o=Q.useRef(null);return Q.useEffect(()=>{var l;(l=o.current)==null||l.scrollIntoView({behavior:"smooth"})},[t]),p.jsxs("div",{style:C.viewContainer,children:[p.jsx("h1",{style:C.viewTitle,children:"Genel Ekip Sohbeti"}),p.jsxs("div",{style:{background:"#1E293B",border:"1px solid #334155",borderRadius:14,padding:20,display:"flex",flexDirection:"column",height:"60vh"},children:[p.jsxs("div",{style:{flex:1,overflowY:"auto",display:"flex",flexDirection:"column",gap:12,paddingRight:8},children:[r==null?void 0:r.messages.map(l=>{const u=l.sender===e.name;return p.jsxs("div",{style:{alignSelf:u?"flex-end":"flex-start",maxWidth:"70%"},children:[p.jsxs("div",{style:{fontSize:10,color:"#94A3B8",marginBottom:2},children:[l.sender," • ",l.time]}),p.jsx("div",{style:{background:u?"#F59E0B":"#0F172A",color:u?"#0F172A":"#F8FAFC",padding:"10px 14px",borderRadius:10,fontSize:13},children:l.text})]},l.id)}),p.jsx("div",{ref:o})]}),p.jsxs("form",{onSubmit:l=>{l.preventDefault(),i.trim()&&(n({...r,messages:[...r.messages,{id:Ui(),sender:e.name,text:i.trim(),time:new Date().toLocaleTimeString([],{hour:"2-digit",minute:"2-digit"})}]}),s(""))},style:{display:"flex",gap:10,marginTop:14,borderTop:"1px solid #334155",paddingTop:14},children:[p.jsx("input",{style:C.mainInput,placeholder:"Mesajınız...",value:i,onChange:l=>s(l.target.value)}),p.jsxs("button",{type:"submit",style:C.primaryActionBtn,children:[p.jsx(A1,{size:16})," Gönder"]})]})]})]})}function AP({usersList:t,onSaveUser:e,onDeleteUser:n}){const[r,i]=Q.useState(!1),[s,o]=Q.useState(null);return p.jsxs("div",{style:C.viewContainer,children:[p.jsxs("div",{style:C.yearEndHeader,children:[p.jsx("h1",{style:C.viewTitle,children:"Kullanıcı Yönetimi"}),p.jsxs("button",{style:C.primaryActionBtn,onClick:()=>{o(null),i(!0)},children:[p.jsx(R1,{size:16})," Kullanıcı Ekle"]})]}),p.jsx("div",{style:C.yearEndTableCard,children:p.jsxs("table",{style:C.table,children:[p.jsx("thead",{children:p.jsxs("tr",{children:[p.jsx("th",{style:C.th,children:"Adı Soyadı"}),p.jsx("th",{style:C.th,children:"ID"}),p.jsx("th",{style:C.th,children:"Rol"}),p.jsx("th",{style:C.th,children:"İşlem"})]})}),p.jsx("tbody",{children:t.map(l=>p.jsxs("tr",{style:C.tr,children:[p.jsx("td",{style:C.tdTitle,children:l.name}),p.jsx("td",{style:C.td,children:l.username}),p.jsx("td",{style:C.td,children:l.role}),p.jsx("td",{style:C.td,children:p.jsxs("div",{style:{display:"flex",gap:8},children:[p.jsx("button",{style:C.editIconBtn,onClick:()=>{o(l),i(!0)},children:"Düzenle"}),l.username!=="admin"&&p.jsx("button",{style:C.deleteDangerBtn,onClick:()=>n(l.id),children:"Sil"})]})})]},l.id))})]})}),r&&p.jsx(CP,{userToEdit:s,onClose:()=>i(!1),onSave:e})]})}function CP({userToEdit:t,onClose:e,onSave:n}){const[r,i]=Q.useState(t?t.name:""),[s,o]=Q.useState(t?t.username:""),[l,u]=Q.useState(t?t.password:"0000"),[h,f]=Q.useState(t?t.role:"user");return p.jsx("div",{style:C.modalOverlay,children:p.jsxs("div",{style:C.createModalContent,children:[p.jsxs("div",{style:C.drawerHeader,children:[p.jsx("h2",{style:C.formTitle,children:"Kullanıcı"}),p.jsx("button",{style:C.closeBtn,onClick:e,children:p.jsx(wo,{size:18})})]}),p.jsxs("form",{onSubmit:g=>{g.preventDefault(),n({id:t?t.id:Ui(),name:r,username:s,password:l,role:h,status:"approved"}),e()},style:{display:"flex",flexDirection:"column",gap:14,marginTop:14},children:[p.jsxs("div",{children:[p.jsx("label",{style:C.inputLabel,children:"Adı Soyadı"}),p.jsx("input",{style:C.mainInput,value:r,onChange:g=>i(g.target.value),required:!0})]}),p.jsxs("div",{children:[p.jsx("label",{style:C.inputLabel,children:"Kullanıcı Adı (ID)"}),p.jsx("input",{style:C.mainInput,value:s,onChange:g=>o(g.target.value),required:!0})]}),p.jsxs("div",{children:[p.jsx("label",{style:C.inputLabel,children:"4 Haneli Şifre"}),p.jsx("input",{type:"password",maxLength:4,style:C.mainInput,value:l,onChange:g=>u(g.target.value),required:!0})]}),p.jsxs("div",{children:[p.jsx("label",{style:C.inputLabel,children:"Rol"}),p.jsxs("select",{style:C.selectInput,value:h,onChange:g=>f(g.target.value),children:[p.jsx("option",{value:"user",children:"Kullanıcı"}),p.jsx("option",{value:"admin",children:"Admin"})]})]}),p.jsx("button",{type:"submit",style:C.primaryActionBtn,children:"Kaydet"})]})]})})}function RP({tasks:t}){return p.jsxs("div",{style:C.viewContainer,children:[p.jsxs("div",{style:C.yearEndHeader,children:[p.jsx("h1",{style:C.viewTitle,children:"Rapor"}),p.jsxs("button",{style:C.printBtn,onClick:()=>window.print(),children:[p.jsx(e_,{size:15})," Yazdır"]})]}),p.jsx("div",{style:C.yearEndTableCard,children:p.jsxs("table",{style:C.table,children:[p.jsx("thead",{children:p.jsxs("tr",{children:[p.jsx("th",{style:C.th,children:"Kod"}),p.jsx("th",{style:C.th,children:"Başlık"}),p.jsx("th",{style:C.th,children:"Sorumlu"}),p.jsx("th",{style:C.th,children:"Durum"})]})}),p.jsx("tbody",{children:t.map(e=>p.jsxs("tr",{style:C.tr,children:[p.jsx("td",{style:C.td,children:p.jsx("span",{style:C.taskCodeBadge,children:e.kod})}),p.jsx("td",{style:C.tdTitle,children:e.baslik}),p.jsx("td",{style:C.td,children:e.sorumlu}),p.jsx("td",{style:C.td,children:e.durum})]},e.id))})]})})]})}function PP({notifications:t,onClose:e,onMarkAllRead:n}){return p.jsx("div",{style:C.modalOverlay,children:p.jsxs("div",{style:C.createModalContent,children:[p.jsxs("div",{style:C.drawerHeader,children:[p.jsx("h2",{style:C.formTitle,children:"Bildirimler"}),p.jsx("button",{style:C.closeBtn,onClick:e,children:p.jsx(wo,{size:18})})]}),p.jsx("div",{style:{padding:16,display:"flex",flexDirection:"column",gap:10,maxHeight:350,overflowY:"auto"},children:t.map(r=>p.jsx("div",{style:{background:"#0F172A",padding:12,borderRadius:8},children:p.jsx("div",{style:{fontSize:12},children:r.text})},r.id))}),p.jsxs("div",{style:C.drawerFooter,children:[p.jsx("button",{style:C.ghostBtn,onClick:n,children:"Okundu İşaretle"}),p.jsx("button",{style:C.primaryActionBtn,onClick:e,children:"Kapat"})]})]})})}function xP({currentUser:t,onClose:e,onSaveUser:n}){const[r,i]=Q.useState(""),[s,o]=Q.useState("");return p.jsx("div",{style:C.modalOverlay,children:p.jsxs("div",{style:{...C.createModalContent,maxWidth:400},children:[p.jsxs("div",{style:C.drawerHeader,children:[p.jsx("h2",{style:C.formTitle,children:"Şifre Değiştir"}),p.jsx("button",{style:C.closeBtn,onClick:e,children:p.jsx(wo,{size:18})})]}),p.jsxs("form",{onSubmit:l=>{if(l.preventDefault(),r!==t.password){alert("Eski şifre yanlış!");return}if(s.length!==4){alert("4 haneli olmalı");return}n({...t,password:s}),e()},style:{display:"flex",flexDirection:"column",gap:14,marginTop:14},children:[p.jsxs("div",{children:[p.jsx("label",{style:C.inputLabel,children:"Eski Şifre"}),p.jsx("input",{type:"password",maxLength:4,style:C.mainInput,value:r,onChange:l=>i(l.target.value),required:!0})]}),p.jsxs("div",{children:[p.jsx("label",{style:C.inputLabel,children:"Yeni 4 Haneli Şifre"}),p.jsx("input",{type:"password",maxLength:4,style:C.mainInput,value:s,onChange:l=>o(l.target.value),required:!0})]}),p.jsx("button",{type:"submit",style:C.primaryActionBtn,children:"Kaydet"})]})]})})}const C={appShell:{fontFamily:"'Plus Jakarta Sans', sans-serif",background:"#0F172A",color:"#F8FAFC",minHeight:"100vh",display:"flex",flexDirection:"column"},header:{display:"flex",alignItems:"center",padding:"12px 24px",background:"#1E293B",borderBottom:"2px solid #F59E0B",gap:16,flexWrap:"wrap",boxShadow:"0 4px 20px rgba(245, 158, 11, 0.1)"},brand:{display:"flex",alignItems:"center",gap:10},logoIcon:{background:"rgba(245, 158, 11, 0.15)",padding:8,borderRadius:10,display:"flex"},brandName:{fontWeight:800,fontSize:16,color:"#F59E0B"},brandSub:{fontSize:10,color:"#94A3B8"},navTabs:{display:"flex",gap:6,background:"#0F172A",padding:4,borderRadius:10,flexWrap:"wrap"},navTab:{display:"flex",alignItems:"center",gap:8,padding:"8px 14px",borderRadius:8,border:"none",background:"transparent",color:"#94A3B8",fontSize:12,fontWeight:600,cursor:"pointer",transition:"all 0.2s"},navTabActive:{background:"rgba(245, 158, 11, 0.2)",color:"#F59E0B",border:"1px solid #F59E0B",boxShadow:"0 2px 8px rgba(245, 158, 11, 0.2)"},navTabAdminActive:{background:"rgba(239, 68, 68, 0.2)",color:"#EF4444",border:"1px solid #EF4444"},notificationBellBtn:{background:"#1E293B",border:"1px solid #334155",borderRadius:8,padding:8,cursor:"pointer",position:"relative",display:"flex",alignItems:"center",justifyContent:"center"},notificationBadge:{position:"absolute",top:-4,right:-4,background:"#EF4444",color:"#FFF",fontSize:9,fontWeight:800,padding:"2px 5px",borderRadius:"50%"},userProfileBar:{display:"flex",alignItems:"center",gap:10,background:"#0F172A",padding:"6px 12px",borderRadius:10,border:"1px solid #334155"},userAvatar:{width:32,height:32,borderRadius:"50%",background:"#F59E0B",color:"#0F172A",fontWeight:800,display:"flex",alignItems:"center",justifyContent:"center",fontSize:14},userName:{fontSize:12,fontWeight:700},userRoleTag:{fontSize:10,color:"#F59E0B"},actionSmallBtn:{background:"transparent",border:"none",cursor:"pointer",display:"flex",alignItems:"center",padding:4,borderRadius:4},errorBar:{background:"rgba(239, 68, 68, 0.2)",borderBottom:"1px solid #EF4444",padding:"8px 24px",color:"#FCA5A5",fontSize:12,display:"flex",justifyContent:"space-between",alignItems:"center"},mainContent:{flex:1,padding:"20px 24px",overflowY:"auto"},viewContainer:{display:"flex",flexDirection:"column",gap:20},dashboardCardGrid:{display:"grid",gridTemplateColumns:"repeat(auto-fit, minmax(180px, 1fr))",gap:16},dashCard:{background:"#1E293B",border:"1px solid #334155",borderRadius:12,padding:16,borderLeft:"4px solid"},dashCardTitle:{fontSize:11,color:"#94A3B8",fontWeight:600},dashCardValue:{fontSize:24,fontWeight:800,marginTop:6,color:"#F59E0B"},printBtn:{background:"#1E293B",color:"#38BDF8",border:"1px solid #38BDF8",padding:"6px 14px",borderRadius:8,fontSize:12,fontWeight:700,cursor:"pointer",display:"flex",alignItems:"center",gap:6},personalTaskCard:{background:"#1E293B",border:"1px solid #334155",borderRadius:14,padding:16,display:"flex",flexDirection:"column",gap:8,cursor:"pointer",transition:"transform 0.2s"},kanbanGrid:{display:"grid",gridTemplateColumns:"repeat(auto-fit, minmax(260px, 1fr))",gap:16},kanbanColumn:{background:"#1E293B",border:"1px solid #334155",borderRadius:14,padding:14,display:"flex",flexDirection:"column",gap:12,minHeight:450},kanbanColumnHeader:{display:"flex",justifyContent:"space-between",alignItems:"center",borderTop:"3px solid",paddingTop:8,paddingBottom:6},kanbanBadge:{background:"#0F172A",color:"#F8FAFC",fontSize:11,fontWeight:700,padding:"2px 8px",borderRadius:10},kanbanCardsList:{display:"flex",flexDirection:"column",gap:10,flex:1},kanbanCard:{background:"#0F172A",border:"1px solid #334155",borderRadius:10,padding:12,display:"flex",flexDirection:"column",gap:8,cursor:"grab"},cardHeaderRow:{display:"flex",justifyContent:"space-between",alignItems:"center"},kanbanCardTitle:{fontSize:13,fontWeight:700,cursor:"pointer",lineHeight:1.4},kanbanCardFooter:{display:"flex",justifyContent:"space-between",fontSize:11,color:"#94A3B8",marginTop:4},taskCodeBadge:{fontFamily:"'JetBrains Mono', monospace",fontSize:10,color:"#F59E0B",background:"rgba(245, 158, 11, 0.15)",padding:"2px 6px",borderRadius:4,fontWeight:700},filterToolbar:{display:"flex",gap:12,alignItems:"center"},searchWrapper:{display:"flex",alignItems:"center",gap:8,background:"#1E293B",padding:"8px 12px",borderRadius:8,border:"1px solid #334155",flex:1},searchInput:{background:"transparent",border:"none",color:"#F8FAFC",fontSize:12,outline:"none",width:"100%"},primaryActionBtn:{background:"#F59E0B",color:"#0F172A",border:"none",padding:"8px 16px",borderRadius:8,fontWeight:700,fontSize:12,cursor:"pointer",display:"flex",alignItems:"center",gap:6,boxShadow:"0 2px 10px rgba(245, 158, 11, 0.2)"},ghostBtn:{background:"transparent",border:"1px solid #334155",color:"#94A3B8",padding:"8px 16px",borderRadius:8,fontSize:12,cursor:"pointer",display:"flex",alignItems:"center",gap:6},yearEndHeader:{display:"flex",justifyContent:"space-between",alignItems:"center",flexWrap:"wrap",gap:12},viewTitle:{fontSize:20,fontWeight:800},viewSub:{fontSize:11,color:"#94A3B8"},yearEndTableCard:{background:"#1E293B",border:"1px solid #334155",borderRadius:14,padding:20,overflowX:"auto"},table:{width:"100%",borderCollapse:"collapse",fontSize:12,textAlign:"left"},th:{borderBottom:"1px solid #334155",padding:"10px 12px",color:"#F59E0B",fontWeight:700},tr:{borderBottom:"1px solid #0F172A"},td:{padding:"10px 12px"},tdTitle:{padding:"10px 12px",fontWeight:700},deleteIconBtn:{background:"transparent",border:"none",color:"#EF4444",cursor:"pointer"},editIconBtn:{background:"transparent",border:"none",color:"#F59E0B",cursor:"pointer",fontWeight:600,fontSize:11},loginOverlay:{position:"fixed",top:0,left:0,right:0,bottom:0,background:"#0F172A",display:"flex",alignItems:"center",justifyContent:"center",padding:16,zIndex:1e3},loginCard:{background:"#1E293B",border:"1px solid #F59E0B",borderRadius:20,padding:32,width:"100%",maxWidth:420,display:"flex",flexDirection:"column",gap:16,boxShadow:"0 10px 40px rgba(245, 158, 11, 0.15)"},loginHeader:{textAlign:"center",display:"flex",flexDirection:"column",alignItems:"center"},loginLogo:{width:64,height:64,borderRadius:16,background:"rgba(245, 158, 11, 0.15)",display:"flex",alignItems:"center",justifyContent:"center"},inputLabel:{fontSize:11,color:"#94A3B8",fontWeight:600,marginBottom:4,display:"block"},mainInput:{width:"100%",background:"#0F172A",border:"1px solid #334155",borderRadius:8,padding:"10px 12px",color:"#F8FAFC",fontSize:12,outline:"none"},selectInput:{width:"100%",background:"#0F172A",border:"1px solid #334155",borderRadius:8,padding:"8px 12px",color:"#F8FAFC",fontSize:12,outline:"none"},loginSubmitBtn:{background:"#F59E0B",color:"#0F172A",border:"none",padding:"12px",borderRadius:10,fontWeight:800,fontSize:13,cursor:"pointer",display:"flex",alignItems:"center",justifyContent:"center",gap:8},unauthorizedBox:{display:"flex",flexDirection:"column",alignItems:"center",justifyContent:"center",padding:60,textAlign:"center",gap:12,color:"#94A3B8"},modalOverlay:{position:"fixed",top:0,left:0,right:0,bottom:0,background:"rgba(0,0,0,0.8)",display:"flex",alignItems:"center",justifyContent:"center",zIndex:999,padding:16},drawerContainer:{background:"#1E293B",border:"1px solid #334155",borderRadius:16,width:"100%",maxWidth:540,display:"flex",flexDirection:"column",overflow:"hidden"},createModalContent:{background:"#1E293B",border:"1px solid #334155",borderRadius:16,width:"100%",maxWidth:500,padding:20},drawerHeader:{display:"flex",justifyContent:"space-between",alignItems:"center",padding:"16px 20px",borderBottom:"1px solid #334155"},drawerBody:{padding:20,display:"flex",flexDirection:"column",gap:16},closeBtn:{background:"transparent",border:"none",color:"#94A3B8",cursor:"pointer"},subtaskSection:{background:"#0F172A",border:"1px solid #334155",borderRadius:12,padding:14,display:"flex",flexDirection:"column",gap:10},subtaskRowInteractive:{display:"flex",alignItems:"center",gap:8,background:"#1E293B",padding:"6px 10px",borderRadius:6,fontSize:12,cursor:"pointer"},addInlineBtn:{background:"#F59E0B",color:"#0F172A",border:"none",padding:"0 12px",borderRadius:6,fontWeight:700,fontSize:11,cursor:"pointer"},drawerFooter:{display:"flex",justifyContent:"space-between",alignItems:"center",padding:"14px 20px",borderTop:"1px solid #334155"},deleteDangerBtn:{background:"rgba(239, 68, 68, 0.15)",color:"#EF4444",border:"1px solid #EF4444",padding:"6px 12px",borderRadius:6,fontSize:11,cursor:"pointer"},formTitle:{fontSize:16,fontWeight:800,color:"#F59E0B"}};Xv(document.getElementById("root")).render(p.jsx(Q.StrictMode,{children:p.jsx(vP,{})}));
