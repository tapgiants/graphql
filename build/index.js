!function(t,e){if("object"==typeof exports&&"object"==typeof module)module.exports=e(require("react"),require("react-apollo"),require("apollo-absinthe-upload-link"),require("apollo-client"),require("apollo-cache-inmemory"));else if("function"==typeof define&&define.amd)define(["React","react-apollo","apollo-absinthe-upload-link","apollo-client","apollo-cache-inmemory"],e);else{var r="object"==typeof exports?e(require("react"),require("react-apollo"),require("apollo-absinthe-upload-link"),require("apollo-client"),require("apollo-cache-inmemory")):e(t.React,t[void 0],t["apollo-absinthe-upload-link"],t[void 0],t[void 0]);for(var o in r)("object"==typeof exports?exports:t)[o]=r[o]}}(this,function(t,e,r,o,n){return function(t){var e={};function r(o){if(e[o])return e[o].exports;var n=e[o]={i:o,l:!1,exports:{}};return t[o].call(n.exports,n,n.exports,r),n.l=!0,n.exports}return r.m=t,r.c=e,r.d=function(t,e,o){r.o(t,e)||Object.defineProperty(t,e,{enumerable:!0,get:o})},r.r=function(t){"undefined"!=typeof Symbol&&Symbol.toStringTag&&Object.defineProperty(t,Symbol.toStringTag,{value:"Module"}),Object.defineProperty(t,"__esModule",{value:!0})},r.t=function(t,e){if(1&e&&(t=r(t)),8&e)return t;if(4&e&&"object"==typeof t&&t&&t.__esModule)return t;var o=Object.create(null);if(r.r(o),Object.defineProperty(o,"default",{enumerable:!0,value:t}),2&e&&"string"!=typeof t)for(var n in t)r.d(o,n,function(e){return t[e]}.bind(null,n));return o},r.n=function(t){var e=t&&t.__esModule?function(){return t.default}:function(){return t};return r.d(e,"a",e),e},r.o=function(t,e){return Object.prototype.hasOwnProperty.call(t,e)},r.p="",r(r.s=6)}([function(e,r){e.exports=t},function(t,r){t.exports=e},function(t,e){t.exports=r},function(t,e){t.exports=o},function(t,e){t.exports=n},function(t,e){var r=function(t){function e(){this.fetch=!1}return e.prototype=t,new e}("undefined"!=typeof self?self:this);!function(t){!function(e){var r={searchParams:"URLSearchParams"in t,iterable:"Symbol"in t&&"iterator"in Symbol,blob:"FileReader"in t&&"Blob"in t&&function(){try{return new Blob,!0}catch(t){return!1}}(),formData:"FormData"in t,arrayBuffer:"ArrayBuffer"in t};if(r.arrayBuffer)var o=["[object Int8Array]","[object Uint8Array]","[object Uint8ClampedArray]","[object Int16Array]","[object Uint16Array]","[object Int32Array]","[object Uint32Array]","[object Float32Array]","[object Float64Array]"],n=ArrayBuffer.isView||function(t){return t&&o.indexOf(Object.prototype.toString.call(t))>-1};function i(t){if("string"!=typeof t&&(t=String(t)),/[^a-z0-9\-#$%&'*+.^_`|~]/i.test(t))throw new TypeError("Invalid character in header field name");return t.toLowerCase()}function a(t){return"string"!=typeof t&&(t=String(t)),t}function s(t){var e={next:function(){var e=t.shift();return{done:void 0===e,value:e}}};return r.iterable&&(e[Symbol.iterator]=function(){return e}),e}function u(t){this.map={},t instanceof u?t.forEach(function(t,e){this.append(e,t)},this):Array.isArray(t)?t.forEach(function(t){this.append(t[0],t[1])},this):t&&Object.getOwnPropertyNames(t).forEach(function(e){this.append(e,t[e])},this)}function f(t){if(t.bodyUsed)return Promise.reject(new TypeError("Already read"));t.bodyUsed=!0}function c(t){return new Promise(function(e,r){t.onload=function(){e(t.result)},t.onerror=function(){r(t.error)}})}function l(t){var e=new FileReader,r=c(e);return e.readAsArrayBuffer(t),r}function p(t){if(t.slice)return t.slice(0);var e=new Uint8Array(t.byteLength);return e.set(new Uint8Array(t)),e.buffer}function h(){return this.bodyUsed=!1,this._initBody=function(t){var e;this._bodyInit=t,t?"string"==typeof t?this._bodyText=t:r.blob&&Blob.prototype.isPrototypeOf(t)?this._bodyBlob=t:r.formData&&FormData.prototype.isPrototypeOf(t)?this._bodyFormData=t:r.searchParams&&URLSearchParams.prototype.isPrototypeOf(t)?this._bodyText=t.toString():r.arrayBuffer&&r.blob&&((e=t)&&DataView.prototype.isPrototypeOf(e))?(this._bodyArrayBuffer=p(t.buffer),this._bodyInit=new Blob([this._bodyArrayBuffer])):r.arrayBuffer&&(ArrayBuffer.prototype.isPrototypeOf(t)||n(t))?this._bodyArrayBuffer=p(t):this._bodyText=t=Object.prototype.toString.call(t):this._bodyText="",this.headers.get("content-type")||("string"==typeof t?this.headers.set("content-type","text/plain;charset=UTF-8"):this._bodyBlob&&this._bodyBlob.type?this.headers.set("content-type",this._bodyBlob.type):r.searchParams&&URLSearchParams.prototype.isPrototypeOf(t)&&this.headers.set("content-type","application/x-www-form-urlencoded;charset=UTF-8"))},r.blob&&(this.blob=function(){var t=f(this);if(t)return t;if(this._bodyBlob)return Promise.resolve(this._bodyBlob);if(this._bodyArrayBuffer)return Promise.resolve(new Blob([this._bodyArrayBuffer]));if(this._bodyFormData)throw new Error("could not read FormData body as blob");return Promise.resolve(new Blob([this._bodyText]))},this.arrayBuffer=function(){return this._bodyArrayBuffer?f(this)||Promise.resolve(this._bodyArrayBuffer):this.blob().then(l)}),this.text=function(){var t,e,r,o=f(this);if(o)return o;if(this._bodyBlob)return t=this._bodyBlob,e=new FileReader,r=c(e),e.readAsText(t),r;if(this._bodyArrayBuffer)return Promise.resolve(function(t){for(var e=new Uint8Array(t),r=new Array(e.length),o=0;o<e.length;o++)r[o]=String.fromCharCode(e[o]);return r.join("")}(this._bodyArrayBuffer));if(this._bodyFormData)throw new Error("could not read FormData body as text");return Promise.resolve(this._bodyText)},r.formData&&(this.formData=function(){return this.text().then(b)}),this.json=function(){return this.text().then(JSON.parse)},this}u.prototype.append=function(t,e){t=i(t),e=a(e);var r=this.map[t];this.map[t]=r?r+", "+e:e},u.prototype.delete=function(t){delete this.map[i(t)]},u.prototype.get=function(t){return t=i(t),this.has(t)?this.map[t]:null},u.prototype.has=function(t){return this.map.hasOwnProperty(i(t))},u.prototype.set=function(t,e){this.map[i(t)]=a(e)},u.prototype.forEach=function(t,e){for(var r in this.map)this.map.hasOwnProperty(r)&&t.call(e,this.map[r],r,this)},u.prototype.keys=function(){var t=[];return this.forEach(function(e,r){t.push(r)}),s(t)},u.prototype.values=function(){var t=[];return this.forEach(function(e){t.push(e)}),s(t)},u.prototype.entries=function(){var t=[];return this.forEach(function(e,r){t.push([r,e])}),s(t)},r.iterable&&(u.prototype[Symbol.iterator]=u.prototype.entries);var d=["DELETE","GET","HEAD","OPTIONS","POST","PUT"];function y(t,e){var r,o,n=(e=e||{}).body;if(t instanceof y){if(t.bodyUsed)throw new TypeError("Already read");this.url=t.url,this.credentials=t.credentials,e.headers||(this.headers=new u(t.headers)),this.method=t.method,this.mode=t.mode,this.signal=t.signal,n||null==t._bodyInit||(n=t._bodyInit,t.bodyUsed=!0)}else this.url=String(t);if(this.credentials=e.credentials||this.credentials||"same-origin",!e.headers&&this.headers||(this.headers=new u(e.headers)),this.method=(r=e.method||this.method||"GET",o=r.toUpperCase(),d.indexOf(o)>-1?o:r),this.mode=e.mode||this.mode||null,this.signal=e.signal||this.signal,this.referrer=null,("GET"===this.method||"HEAD"===this.method)&&n)throw new TypeError("Body not allowed for GET or HEAD requests");this._initBody(n)}function b(t){var e=new FormData;return t.trim().split("&").forEach(function(t){if(t){var r=t.split("="),o=r.shift().replace(/\+/g," "),n=r.join("=").replace(/\+/g," ");e.append(decodeURIComponent(o),decodeURIComponent(n))}}),e}function m(t,e){e||(e={}),this.type="default",this.status=void 0===e.status?200:e.status,this.ok=this.status>=200&&this.status<300,this.statusText="statusText"in e?e.statusText:"OK",this.headers=new u(e.headers),this.url=e.url||"",this._initBody(t)}y.prototype.clone=function(){return new y(this,{body:this._bodyInit})},h.call(y.prototype),h.call(m.prototype),m.prototype.clone=function(){return new m(this._bodyInit,{status:this.status,statusText:this.statusText,headers:new u(this.headers),url:this.url})},m.error=function(){var t=new m(null,{status:0,statusText:""});return t.type="error",t};var v=[301,302,303,307,308];m.redirect=function(t,e){if(-1===v.indexOf(e))throw new RangeError("Invalid status code");return new m(null,{status:e,headers:{location:t}})},e.DOMException=t.DOMException;try{new e.DOMException}catch(t){e.DOMException=function(t,e){this.message=t,this.name=e;var r=Error(t);this.stack=r.stack},e.DOMException.prototype=Object.create(Error.prototype),e.DOMException.prototype.constructor=e.DOMException}function w(t,o){return new Promise(function(n,i){var a=new y(t,o);if(a.signal&&a.signal.aborted)return i(new e.DOMException("Aborted","AbortError"));var s=new XMLHttpRequest;function f(){s.abort()}s.onload=function(){var t,e,r={status:s.status,statusText:s.statusText,headers:(t=s.getAllResponseHeaders()||"",e=new u,t.replace(/\r?\n[\t ]+/g," ").split(/\r?\n/).forEach(function(t){var r=t.split(":"),o=r.shift().trim();if(o){var n=r.join(":").trim();e.append(o,n)}}),e)};r.url="responseURL"in s?s.responseURL:r.headers.get("X-Request-URL");var o="response"in s?s.response:s.responseText;n(new m(o,r))},s.onerror=function(){i(new TypeError("Network request failed"))},s.ontimeout=function(){i(new TypeError("Network request failed"))},s.onabort=function(){i(new e.DOMException("Aborted","AbortError"))},s.open(a.method,a.url,!0),"include"===a.credentials?s.withCredentials=!0:"omit"===a.credentials&&(s.withCredentials=!1),"responseType"in s&&r.blob&&(s.responseType="blob"),a.headers.forEach(function(t,e){s.setRequestHeader(e,t)}),a.signal&&(a.signal.addEventListener("abort",f),s.onreadystatechange=function(){4===s.readyState&&a.signal.removeEventListener("abort",f)}),s.send(void 0===a._bodyInit?null:a._bodyInit)})}w.polyfill=!0,t.fetch||(t.fetch=w,t.Headers=u,t.Request=y,t.Response=m),e.Headers=u,e.Request=y,e.Response=m,e.fetch=w}({})}(r),delete r.fetch.polyfill,t.exports=e=r.fetch,e.fetch=r.fetch,e.Headers=r.Headers,e.Request=r.Request,e.Response=r.Response,e.default=r.fetch},function(t,e,r){"use strict";r.r(e);var o=r(0),n=r.n(o),i=r(1),a=r(2),s=r(3),u=r(4),f=r(5),c=r.n(f),l=function(t){var e=arguments.length>1&&void 0!==arguments[1]?arguments[1]:{};if(!t)throw new Error("Uri prop not passed to the ApolloWrapper component");var r={uri:t,fetch:c.a};Object.keys(e).length>0&&(r.headers=e);var o=Object(a.createLink)(r),n={cache:new u.InMemoryCache,link:o};return new s.ApolloClient(n)},p=function(t){var e=t.children,r=t.uri,o=t.headers;return n.a.createElement(i.ApolloProvider,{client:l(r,o)},e)};p.defaultProps={headers:{}};var h=p,d=function(t){return t.reduce(function(t,e){return t[e.key]=e.message,t},{})};function y(t){for(var e=1;e<arguments.length;e++){var r=null!=arguments[e]?arguments[e]:{},o=Object.keys(r);"function"==typeof Object.getOwnPropertySymbols&&(o=o.concat(Object.getOwnPropertySymbols(r).filter(function(t){return Object.getOwnPropertyDescriptor(r,t).enumerable}))),o.forEach(function(e){b(t,e,r[e])})}return t}function b(t,e,r){return e in t?Object.defineProperty(t,e,{value:r,enumerable:!0,configurable:!0,writable:!0}):t[e]=r,t}function m(t){return function(t){if(Array.isArray(t)){for(var e=0,r=new Array(t.length);e<t.length;e++)r[e]=t[e];return r}}(t)||function(t){if(Symbol.iterator in Object(t)||"[object Arguments]"===Object.prototype.toString.call(t))return Array.from(t)}(t)||function(){throw new TypeError("Invalid attempt to spread non-iterable instance")}()}var v=function(t,e,r,o){var n=t.readQuery({query:r});t.writeQuery({query:r,data:b({},o,{__typename:n[o].__typename,list:[e].concat(m(n[o].list)),totalCount:n[o].totalCount,pageInfo:n[o].pageInfo})})},w=function(t,e,r,o){var n=t.readQuery({query:e});t.writeQuery({query:e,data:b({},r,{__typename:n[r].__typename,list:n[r].list.filter(function(t){return!o(t)}),totalCount:n[r].totalCount-1,pageInfo:n[r].pageInfo})})},g=function(t,e,r,o){t({variables:{input:y({},o,{first:arguments.length>4&&void 0!==arguments[4]?arguments[4]:10,after:e.endCursor})},updateQuery:function(t,e){var o=e.fetchMoreResult,n=o[r].list,i=o[r].pageInfo,a=o[r].totalCount;return n.length?b({},r,{__typename:t[r].__typename,list:[].concat(m(t[r].list),m(n)),totalCount:a,pageInfo:i}):t}})};r.d(e,"ApolloWrapper",function(){return h}),r.d(e,"formatGQLErrors",function(){return d}),r.d(e,"updateList",function(){return v}),r.d(e,"deleteFromList",function(){return w}),r.d(e,"loadMore",function(){return g})}])});