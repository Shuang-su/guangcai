import{a as e,c as t,d as n,f as r,i,l as a,m as o,n as s,o as c,p as l,r as u,s as d,t as f,u as p}from"./client-BYTvRpVq.js";var m=Object.defineProperty,h=(e,t)=>{let n={};for(var r in e)m(n,r,{get:e[r],enumerable:!0});return t||m(n,Symbol.toStringTag,{value:`Module`}),n},g=`7.1.10`,_={LEFT:0,MIDDLE:1,RIGHT:2,ROTATE:0,DOLLY:1,PAN:2},v={ROTATE:0,PAN:1,DOLLY_PAN:2,DOLLY_ROTATE:3},y=1e3,b=1001,x=1002,S=1003,C=1004,w=1005,T=1006,E=1007,D=1008,O=1009,k=1010,A=1011,j=1012,M=1013,N=1014,P=1015,F=1016,I=1017,L=1018,R=1020,z=35902,ee=35899,B=1021,te=1022,V=1023,H=1026,ne=1027,re=1028,ie=1029,ae=1030,oe=1031,se=1033,ce=33776,le=33777,ue=33778,U=33779,de=35840,fe=35841,pe=35842,me=35843,he=36196,ge=37492,_e=37496,ve=37488,ye=37489,be=37490,xe=37491,Se=37808,Ce=37809,we=37810,W=37811,Te=37812,Ee=37813,De=37814,G=37815,Oe=37816,ke=37817,Ae=37818,je=37819,Me=37820,Ne=37821,Pe=36492,Fe=36494,Ie=36495,Le=36283,Re=36284,ze=36285,Be=36286,Ve=2300,He=2301,Ue=2302,We=2303,Ge=2400,Ke=2401,qe=2402,Je=3200,Ye=`srgb`,Xe=`srgb-linear`,Ze=`linear`,Qe=`srgb`,$e=7680,et=35044,tt=2e3;function nt(e){for(let t=e.length-1;t>=0;--t)if(e[t]>=65535)return!0;return!1}function rt(e){return ArrayBuffer.isView(e)&&!(e instanceof DataView)}function it(e){return document.createElementNS(`http://www.w3.org/1999/xhtml`,e)}function at(){let e=it(`canvas`);return e.style.display=`block`,e}var ot={};function st(...e){let t=`THREE.`+e.shift();console.log(t,...e)}function ct(e){let t=e[0];if(typeof t==`string`&&t.startsWith(`TSL:`)){let t=e[1];t&&t.isStackTrace?e[0]+=` `+t.getLocation():e[1]=`Stack trace not available. Enable "THREE.Node.captureStackTrace" to capture stack traces.`}return e}function K(...e){e=ct(e);let t=`THREE.`+e.shift();{let n=e[0];n&&n.isStackTrace?console.warn(n.getError(t)):console.warn(t,...e)}}function q(...e){e=ct(e);let t=`THREE.`+e.shift();{let n=e[0];n&&n.isStackTrace?console.error(n.getError(t)):console.error(t,...e)}}function lt(...e){let t=e.join(` `);t in ot||(ot[t]=!0,K(...e))}function ut(e,t,n){return new Promise(function(r,i){function a(){switch(e.clientWaitSync(t,e.SYNC_FLUSH_COMMANDS_BIT,0)){case e.WAIT_FAILED:i();break;case e.TIMEOUT_EXPIRED:setTimeout(a,n);break;default:r()}}setTimeout(a,n)})}var dt={0:1,2:6,4:7,3:5,1:0,6:2,7:4,5:3},ft=class{addEventListener(e,t){this._listeners===void 0&&(this._listeners={});let n=this._listeners;n[e]===void 0&&(n[e]=[]),n[e].indexOf(t)===-1&&n[e].push(t)}hasEventListener(e,t){let n=this._listeners;return n!==void 0&&n[e]!==void 0&&n[e].indexOf(t)!==-1}removeEventListener(e,t){let n=this._listeners;if(n===void 0)return;let r=n[e];if(r!==void 0){let e=r.indexOf(t);e!==-1&&r.splice(e,1)}}dispatchEvent(e){let t=this._listeners;if(t===void 0)return;let n=t[e.type];if(n!==void 0){e.target=this;let t=n.slice(0);for(let n=0,r=t.length;n<r;n++)t[n].call(this,e);e.target=null}}},pt=`00.01.02.03.04.05.06.07.08.09.0a.0b.0c.0d.0e.0f.10.11.12.13.14.15.16.17.18.19.1a.1b.1c.1d.1e.1f.20.21.22.23.24.25.26.27.28.29.2a.2b.2c.2d.2e.2f.30.31.32.33.34.35.36.37.38.39.3a.3b.3c.3d.3e.3f.40.41.42.43.44.45.46.47.48.49.4a.4b.4c.4d.4e.4f.50.51.52.53.54.55.56.57.58.59.5a.5b.5c.5d.5e.5f.60.61.62.63.64.65.66.67.68.69.6a.6b.6c.6d.6e.6f.70.71.72.73.74.75.76.77.78.79.7a.7b.7c.7d.7e.7f.80.81.82.83.84.85.86.87.88.89.8a.8b.8c.8d.8e.8f.90.91.92.93.94.95.96.97.98.99.9a.9b.9c.9d.9e.9f.a0.a1.a2.a3.a4.a5.a6.a7.a8.a9.aa.ab.ac.ad.ae.af.b0.b1.b2.b3.b4.b5.b6.b7.b8.b9.ba.bb.bc.bd.be.bf.c0.c1.c2.c3.c4.c5.c6.c7.c8.c9.ca.cb.cc.cd.ce.cf.d0.d1.d2.d3.d4.d5.d6.d7.d8.d9.da.db.dc.dd.de.df.e0.e1.e2.e3.e4.e5.e6.e7.e8.e9.ea.eb.ec.ed.ee.ef.f0.f1.f2.f3.f4.f5.f6.f7.f8.f9.fa.fb.fc.fd.fe.ff`.split(`.`),mt=1234567,ht=Math.PI/180,gt=180/Math.PI;function _t(){let e=Math.random()*4294967295|0,t=Math.random()*4294967295|0,n=Math.random()*4294967295|0,r=Math.random()*4294967295|0;return(pt[e&255]+pt[e>>8&255]+pt[e>>16&255]+pt[e>>24&255]+`-`+pt[t&255]+pt[t>>8&255]+`-`+pt[t>>16&15|64]+pt[t>>24&255]+`-`+pt[n&63|128]+pt[n>>8&255]+`-`+pt[n>>16&255]+pt[n>>24&255]+pt[r&255]+pt[r>>8&255]+pt[r>>16&255]+pt[r>>24&255]).toLowerCase()}function vt(e,t,n){return Math.max(t,Math.min(n,e))}function yt(e,t){return(e%t+t)%t}function bt(e,t,n,r,i){return r+(e-t)*(i-r)/(n-t)}function xt(e,t,n){return e===t?0:(n-e)/(t-e)}function St(e,t,n){return(1-n)*e+n*t}function Ct(e,t,n,r){return St(e,t,1-Math.exp(-n*r))}function wt(e,t=1){return t-Math.abs(yt(e,t*2)-t)}function Tt(e,t,n){return e<=t?0:e>=n?1:(e=(e-t)/(n-t),e*e*(3-2*e))}function Et(e,t,n){return e<=t?0:e>=n?1:(e=(e-t)/(n-t),e*e*e*(e*(e*6-15)+10))}function Dt(e,t){return e+Math.floor(Math.random()*(t-e+1))}function Ot(e,t){return e+Math.random()*(t-e)}function kt(e){return e*(.5-Math.random())}function At(e){e!==void 0&&(mt=e);let t=mt+=1831565813;return t=Math.imul(t^t>>>15,t|1),t^=t+Math.imul(t^t>>>7,t|61),((t^t>>>14)>>>0)/4294967296}function jt(e){return e*ht}function Mt(e){return e*gt}function Nt(e){return e>0&&Number.isInteger(e)&&2**Math.round(Math.log2(e))===e}function Pt(e){return 2**Math.ceil(Math.log(e)/Math.LN2)}function Ft(e){return 2**Math.floor(Math.log(e)/Math.LN2)}function It(e,t,n,r,i){let a=Math.cos,o=Math.sin,s=a(n/2),c=o(n/2),l=a((t+r)/2),u=o((t+r)/2),d=a((t-r)/2),f=o((t-r)/2),p=a((r-t)/2),m=o((r-t)/2);switch(i){case`XYX`:e.set(s*u,c*d,c*f,s*l);break;case`YZY`:e.set(c*f,s*u,c*d,s*l);break;case`ZXZ`:e.set(c*d,c*f,s*u,s*l);break;case`XZX`:e.set(s*u,c*m,c*p,s*l);break;case`YXY`:e.set(c*p,s*u,c*m,s*l);break;case`ZYZ`:e.set(c*m,c*p,s*u,s*l);break;default:K(`MathUtils: .setQuaternionFromProperEuler() encountered an unknown order: `+i)}}function Lt(e,t){switch(t.constructor){case Float32Array:return e;case Uint32Array:return e/4294967295;case Uint16Array:return e/65535;case Uint8Array:case Uint8ClampedArray:return e/255;case Int32Array:return Math.max(e/2147483647,-1);case Int16Array:return Math.max(e/32767,-1);case Int8Array:return Math.max(e/127,-1);default:throw Error(`THREE.MathUtils: Invalid component type.`)}}function Rt(e,t){switch(t.constructor){case Float32Array:return e;case Uint32Array:return Math.round(e*4294967295);case Uint16Array:return Math.round(e*65535);case Uint8Array:case Uint8ClampedArray:return Math.round(e*255);case Int32Array:return Math.round(e*2147483647);case Int16Array:return Math.round(e*32767);case Int8Array:return Math.round(e*127);default:throw Error(`THREE.MathUtils: Invalid component type.`)}}var zt={DEG2RAD:ht,RAD2DEG:gt,generateUUID:_t,clamp:vt,euclideanModulo:yt,mapLinear:bt,inverseLerp:xt,lerp:St,damp:Ct,pingpong:wt,smoothstep:Tt,smootherstep:Et,randInt:Dt,randFloat:Ot,randFloatSpread:kt,seededRandom:At,degToRad:jt,radToDeg:Mt,isPowerOfTwo:Nt,ceilPowerOfTwo:Pt,floorPowerOfTwo:Ft,setQuaternionFromProperEuler:It,normalize:Rt,denormalize:Lt},J=class e{static{e.prototype.isVector2=!0}constructor(e=0,t=0){this.x=e,this.y=t}get width(){return this.x}set width(e){this.x=e}get height(){return this.y}set height(e){this.y=e}set(e,t){return this.x=e,this.y=t,this}setScalar(e){return this.x=e,this.y=e,this}setX(e){return this.x=e,this}setY(e){return this.y=e,this}setComponent(e,t){switch(e){case 0:this.x=t;break;case 1:this.y=t;break;default:throw Error(`THREE.Vector2: index is out of range: `+e)}return this}getComponent(e){switch(e){case 0:return this.x;case 1:return this.y;default:throw Error(`THREE.Vector2: index is out of range: `+e)}}clone(){return new this.constructor(this.x,this.y)}copy(e){return this.x=e.x,this.y=e.y,this}add(e){return this.x+=e.x,this.y+=e.y,this}addScalar(e){return this.x+=e,this.y+=e,this}addVectors(e,t){return this.x=e.x+t.x,this.y=e.y+t.y,this}addScaledVector(e,t){return this.x+=e.x*t,this.y+=e.y*t,this}sub(e){return this.x-=e.x,this.y-=e.y,this}subScalar(e){return this.x-=e,this.y-=e,this}subVectors(e,t){return this.x=e.x-t.x,this.y=e.y-t.y,this}multiply(e){return this.x*=e.x,this.y*=e.y,this}multiplyScalar(e){return this.x*=e,this.y*=e,this}divide(e){return this.x/=e.x,this.y/=e.y,this}divideScalar(e){return this.multiplyScalar(1/e)}applyMatrix3(e){let t=this.x,n=this.y,r=e.elements;return this.x=r[0]*t+r[3]*n+r[6],this.y=r[1]*t+r[4]*n+r[7],this}min(e){return this.x=Math.min(this.x,e.x),this.y=Math.min(this.y,e.y),this}max(e){return this.x=Math.max(this.x,e.x),this.y=Math.max(this.y,e.y),this}clamp(e,t){return this.x=vt(this.x,e.x,t.x),this.y=vt(this.y,e.y,t.y),this}clampScalar(e,t){return this.x=vt(this.x,e,t),this.y=vt(this.y,e,t),this}clampLength(e,t){let n=this.length();return this.divideScalar(n||1).multiplyScalar(vt(n,e,t))}floor(){return this.x=Math.floor(this.x),this.y=Math.floor(this.y),this}ceil(){return this.x=Math.ceil(this.x),this.y=Math.ceil(this.y),this}round(){return this.x=Math.round(this.x),this.y=Math.round(this.y),this}roundToZero(){return this.x=Math.trunc(this.x),this.y=Math.trunc(this.y),this}negate(){return this.x=-this.x,this.y=-this.y,this}dot(e){return this.x*e.x+this.y*e.y}cross(e){return this.x*e.y-this.y*e.x}lengthSq(){return this.x*this.x+this.y*this.y}length(){return Math.sqrt(this.x*this.x+this.y*this.y)}manhattanLength(){return Math.abs(this.x)+Math.abs(this.y)}normalize(){return this.divideScalar(this.length()||1)}angle(){return Math.atan2(-this.y,-this.x)+Math.PI}angleTo(e){let t=Math.sqrt(this.lengthSq()*e.lengthSq());if(t===0)return Math.PI/2;let n=this.dot(e)/t;return Math.acos(vt(n,-1,1))}distanceTo(e){return Math.sqrt(this.distanceToSquared(e))}distanceToSquared(e){let t=this.x-e.x,n=this.y-e.y;return t*t+n*n}manhattanDistanceTo(e){return Math.abs(this.x-e.x)+Math.abs(this.y-e.y)}setLength(e){return this.normalize().multiplyScalar(e)}lerp(e,t){return this.x+=(e.x-this.x)*t,this.y+=(e.y-this.y)*t,this}lerpVectors(e,t,n){return this.x=e.x+(t.x-e.x)*n,this.y=e.y+(t.y-e.y)*n,this}equals(e){return e.x===this.x&&e.y===this.y}fromArray(e,t=0){return this.x=e[t],this.y=e[t+1],this}toArray(e=[],t=0){return e[t]=this.x,e[t+1]=this.y,e}fromBufferAttribute(e,t){return this.x=e.getX(t),this.y=e.getY(t),this}rotateAround(e,t){let n=Math.cos(t),r=Math.sin(t),i=this.x-e.x,a=this.y-e.y;return this.x=i*n-a*r+e.x,this.y=i*r+a*n+e.y,this}random(){return this.x=Math.random(),this.y=Math.random(),this}*[Symbol.iterator](){yield this.x,yield this.y}},Bt=class{constructor(e=0,t=0,n=0,r=1){this.isQuaternion=!0,this._x=e,this._y=t,this._z=n,this._w=r}static slerpFlat(e,t,n,r,i,a,o){let s=n[r+0],c=n[r+1],l=n[r+2],u=n[r+3],d=i[a+0],f=i[a+1],p=i[a+2],m=i[a+3];if(u!==m||s!==d||c!==f||l!==p){let e=s*d+c*f+l*p+u*m;e<0&&(d=-d,f=-f,p=-p,m=-m,e=-e);let t=1-o;if(e<.9995){let n=Math.acos(e),r=Math.sin(n);t=Math.sin(t*n)/r,o=Math.sin(o*n)/r,s=s*t+d*o,c=c*t+f*o,l=l*t+p*o,u=u*t+m*o}else{s=s*t+d*o,c=c*t+f*o,l=l*t+p*o,u=u*t+m*o;let e=1/Math.sqrt(s*s+c*c+l*l+u*u);s*=e,c*=e,l*=e,u*=e}}e[t]=s,e[t+1]=c,e[t+2]=l,e[t+3]=u}static multiplyQuaternionsFlat(e,t,n,r,i,a){let o=n[r],s=n[r+1],c=n[r+2],l=n[r+3],u=i[a],d=i[a+1],f=i[a+2],p=i[a+3];return e[t]=o*p+l*u+s*f-c*d,e[t+1]=s*p+l*d+c*u-o*f,e[t+2]=c*p+l*f+o*d-s*u,e[t+3]=l*p-o*u-s*d-c*f,e}get x(){return this._x}set x(e){this._x=e,this._onChangeCallback()}get y(){return this._y}set y(e){this._y=e,this._onChangeCallback()}get z(){return this._z}set z(e){this._z=e,this._onChangeCallback()}get w(){return this._w}set w(e){this._w=e,this._onChangeCallback()}set(e,t,n,r){return this._x=e,this._y=t,this._z=n,this._w=r,this._onChangeCallback(),this}clone(){return new this.constructor(this._x,this._y,this._z,this._w)}copy(e){return this._x=e.x,this._y=e.y,this._z=e.z,this._w=e.w,this._onChangeCallback(),this}setFromEuler(e,t=!0){let n=e._x,r=e._y,i=e._z,a=e._order,o=Math.cos,s=Math.sin,c=o(n/2),l=o(r/2),u=o(i/2),d=s(n/2),f=s(r/2),p=s(i/2);switch(a){case`XYZ`:this._x=d*l*u+c*f*p,this._y=c*f*u-d*l*p,this._z=c*l*p+d*f*u,this._w=c*l*u-d*f*p;break;case`YXZ`:this._x=d*l*u+c*f*p,this._y=c*f*u-d*l*p,this._z=c*l*p-d*f*u,this._w=c*l*u+d*f*p;break;case`ZXY`:this._x=d*l*u-c*f*p,this._y=c*f*u+d*l*p,this._z=c*l*p+d*f*u,this._w=c*l*u-d*f*p;break;case`ZYX`:this._x=d*l*u-c*f*p,this._y=c*f*u+d*l*p,this._z=c*l*p-d*f*u,this._w=c*l*u+d*f*p;break;case`YZX`:this._x=d*l*u+c*f*p,this._y=c*f*u+d*l*p,this._z=c*l*p-d*f*u,this._w=c*l*u-d*f*p;break;case`XZY`:this._x=d*l*u-c*f*p,this._y=c*f*u-d*l*p,this._z=c*l*p+d*f*u,this._w=c*l*u+d*f*p;break;default:K(`Quaternion: .setFromEuler() encountered an unknown order: `+a)}return t===!0&&this._onChangeCallback(),this}setFromAxisAngle(e,t){let n=t/2,r=Math.sin(n);return this._x=e.x*r,this._y=e.y*r,this._z=e.z*r,this._w=Math.cos(n),this._onChangeCallback(),this}setFromRotationMatrix(e){let t=e.elements,n=t[0],r=t[4],i=t[8],a=t[1],o=t[5],s=t[9],c=t[2],l=t[6],u=t[10],d=n+o+u;if(d>0){let e=.5/Math.sqrt(d+1);this._w=.25/e,this._x=(l-s)*e,this._y=(i-c)*e,this._z=(a-r)*e}else if(n>o&&n>u){let e=2*Math.sqrt(1+n-o-u);this._w=(l-s)/e,this._x=.25*e,this._y=(r+a)/e,this._z=(i+c)/e}else if(o>u){let e=2*Math.sqrt(1+o-n-u);this._w=(i-c)/e,this._x=(r+a)/e,this._y=.25*e,this._z=(s+l)/e}else{let e=2*Math.sqrt(1+u-n-o);this._w=(a-r)/e,this._x=(i+c)/e,this._y=(s+l)/e,this._z=.25*e}return this._onChangeCallback(),this}setFromUnitVectors(e,t){let n=e.dot(t)+1;return n<1e-8?(n=0,Math.abs(e.x)>Math.abs(e.z)?(this._x=-e.y,this._y=e.x,this._z=0,this._w=n):(this._x=0,this._y=-e.z,this._z=e.y,this._w=n)):(this._x=e.y*t.z-e.z*t.y,this._y=e.z*t.x-e.x*t.z,this._z=e.x*t.y-e.y*t.x,this._w=n),this.normalize()}angleTo(e){return 2*Math.acos(Math.abs(vt(this.dot(e),-1,1)))}rotateTowards(e,t){let n=this.angleTo(e);if(n===0)return this;let r=Math.min(1,t/n);return this.slerp(e,r),this}identity(){return this.set(0,0,0,1)}invert(){return this.conjugate()}conjugate(){return this._x*=-1,this._y*=-1,this._z*=-1,this._onChangeCallback(),this}dot(e){return this._x*e._x+this._y*e._y+this._z*e._z+this._w*e._w}lengthSq(){return this._x*this._x+this._y*this._y+this._z*this._z+this._w*this._w}length(){return Math.sqrt(this._x*this._x+this._y*this._y+this._z*this._z+this._w*this._w)}normalize(){let e=this.length();return e===0?(this._x=0,this._y=0,this._z=0,this._w=1):(e=1/e,this._x*=e,this._y*=e,this._z*=e,this._w*=e),this._onChangeCallback(),this}multiply(e){return this.multiplyQuaternions(this,e)}premultiply(e){return this.multiplyQuaternions(e,this)}multiplyQuaternions(e,t){let n=e._x,r=e._y,i=e._z,a=e._w,o=t._x,s=t._y,c=t._z,l=t._w;return this._x=n*l+a*o+r*c-i*s,this._y=r*l+a*s+i*o-n*c,this._z=i*l+a*c+n*s-r*o,this._w=a*l-n*o-r*s-i*c,this._onChangeCallback(),this}slerp(e,t){let n=e._x,r=e._y,i=e._z,a=e._w,o=this.dot(e);o<0&&(n=-n,r=-r,i=-i,a=-a,o=-o);let s=1-t;if(o<.9995){let e=Math.acos(o),c=Math.sin(e);s=Math.sin(s*e)/c,t=Math.sin(t*e)/c,this._x=this._x*s+n*t,this._y=this._y*s+r*t,this._z=this._z*s+i*t,this._w=this._w*s+a*t,this._onChangeCallback()}else this._x=this._x*s+n*t,this._y=this._y*s+r*t,this._z=this._z*s+i*t,this._w=this._w*s+a*t,this.normalize();return this}slerpQuaternions(e,t,n){return this.copy(e).slerp(t,n)}random(){let e=2*Math.PI*Math.random(),t=2*Math.PI*Math.random(),n=Math.random(),r=Math.sqrt(1-n),i=Math.sqrt(n);return this.set(r*Math.sin(e),r*Math.cos(e),i*Math.sin(t),i*Math.cos(t))}equals(e){return e._x===this._x&&e._y===this._y&&e._z===this._z&&e._w===this._w}fromArray(e,t=0){return this._x=e[t],this._y=e[t+1],this._z=e[t+2],this._w=e[t+3],this._onChangeCallback(),this}toArray(e=[],t=0){return e[t]=this._x,e[t+1]=this._y,e[t+2]=this._z,e[t+3]=this._w,e}fromBufferAttribute(e,t){return this._x=e.getX(t),this._y=e.getY(t),this._z=e.getZ(t),this._w=e.getW(t),this._onChangeCallback(),this}toJSON(){return this.toArray()}_onChange(e){return this._onChangeCallback=e,this}_onChangeCallback(){}*[Symbol.iterator](){yield this._x,yield this._y,yield this._z,yield this._w}},Y=class e{static{e.prototype.isVector3=!0}constructor(e=0,t=0,n=0){this.x=e,this.y=t,this.z=n}set(e,t,n){return n===void 0&&(n=this.z),this.x=e,this.y=t,this.z=n,this}setScalar(e){return this.x=e,this.y=e,this.z=e,this}setX(e){return this.x=e,this}setY(e){return this.y=e,this}setZ(e){return this.z=e,this}setComponent(e,t){switch(e){case 0:this.x=t;break;case 1:this.y=t;break;case 2:this.z=t;break;default:throw Error(`THREE.Vector3: index is out of range: `+e)}return this}getComponent(e){switch(e){case 0:return this.x;case 1:return this.y;case 2:return this.z;default:throw Error(`THREE.Vector3: index is out of range: `+e)}}clone(){return new this.constructor(this.x,this.y,this.z)}copy(e){return this.x=e.x,this.y=e.y,this.z=e.z,this}add(e){return this.x+=e.x,this.y+=e.y,this.z+=e.z,this}addScalar(e){return this.x+=e,this.y+=e,this.z+=e,this}addVectors(e,t){return this.x=e.x+t.x,this.y=e.y+t.y,this.z=e.z+t.z,this}addScaledVector(e,t){return this.x+=e.x*t,this.y+=e.y*t,this.z+=e.z*t,this}sub(e){return this.x-=e.x,this.y-=e.y,this.z-=e.z,this}subScalar(e){return this.x-=e,this.y-=e,this.z-=e,this}subVectors(e,t){return this.x=e.x-t.x,this.y=e.y-t.y,this.z=e.z-t.z,this}multiply(e){return this.x*=e.x,this.y*=e.y,this.z*=e.z,this}multiplyScalar(e){return this.x*=e,this.y*=e,this.z*=e,this}multiplyVectors(e,t){return this.x=e.x*t.x,this.y=e.y*t.y,this.z=e.z*t.z,this}applyEuler(e){return this.applyQuaternion(Ht.setFromEuler(e))}applyAxisAngle(e,t){return this.applyQuaternion(Ht.setFromAxisAngle(e,t))}applyMatrix3(e){let t=this.x,n=this.y,r=this.z,i=e.elements;return this.x=i[0]*t+i[3]*n+i[6]*r,this.y=i[1]*t+i[4]*n+i[7]*r,this.z=i[2]*t+i[5]*n+i[8]*r,this}applyNormalMatrix(e){return this.applyMatrix3(e).normalize()}applyMatrix4(e){let t=this.x,n=this.y,r=this.z,i=e.elements,a=1/(i[3]*t+i[7]*n+i[11]*r+i[15]);return this.x=(i[0]*t+i[4]*n+i[8]*r+i[12])*a,this.y=(i[1]*t+i[5]*n+i[9]*r+i[13])*a,this.z=(i[2]*t+i[6]*n+i[10]*r+i[14])*a,this}applyQuaternion(e){let t=this.x,n=this.y,r=this.z,i=e.x,a=e.y,o=e.z,s=e.w,c=2*(a*r-o*n),l=2*(o*t-i*r),u=2*(i*n-a*t);return this.x=t+s*c+a*u-o*l,this.y=n+s*l+o*c-i*u,this.z=r+s*u+i*l-a*c,this}project(e){return this.applyMatrix4(e.matrixWorldInverse).applyMatrix4(e.projectionMatrix)}unproject(e){return this.applyMatrix4(e.projectionMatrixInverse).applyMatrix4(e.matrixWorld)}transformDirection(e){let t=this.x,n=this.y,r=this.z,i=e.elements;return this.x=i[0]*t+i[4]*n+i[8]*r,this.y=i[1]*t+i[5]*n+i[9]*r,this.z=i[2]*t+i[6]*n+i[10]*r,this.normalize()}divide(e){return this.x/=e.x,this.y/=e.y,this.z/=e.z,this}divideScalar(e){return this.multiplyScalar(1/e)}min(e){return this.x=Math.min(this.x,e.x),this.y=Math.min(this.y,e.y),this.z=Math.min(this.z,e.z),this}max(e){return this.x=Math.max(this.x,e.x),this.y=Math.max(this.y,e.y),this.z=Math.max(this.z,e.z),this}clamp(e,t){return this.x=vt(this.x,e.x,t.x),this.y=vt(this.y,e.y,t.y),this.z=vt(this.z,e.z,t.z),this}clampScalar(e,t){return this.x=vt(this.x,e,t),this.y=vt(this.y,e,t),this.z=vt(this.z,e,t),this}clampLength(e,t){let n=this.length();return this.divideScalar(n||1).multiplyScalar(vt(n,e,t))}floor(){return this.x=Math.floor(this.x),this.y=Math.floor(this.y),this.z=Math.floor(this.z),this}ceil(){return this.x=Math.ceil(this.x),this.y=Math.ceil(this.y),this.z=Math.ceil(this.z),this}round(){return this.x=Math.round(this.x),this.y=Math.round(this.y),this.z=Math.round(this.z),this}roundToZero(){return this.x=Math.trunc(this.x),this.y=Math.trunc(this.y),this.z=Math.trunc(this.z),this}negate(){return this.x=-this.x,this.y=-this.y,this.z=-this.z,this}dot(e){return this.x*e.x+this.y*e.y+this.z*e.z}lengthSq(){return this.x*this.x+this.y*this.y+this.z*this.z}length(){return Math.sqrt(this.x*this.x+this.y*this.y+this.z*this.z)}manhattanLength(){return Math.abs(this.x)+Math.abs(this.y)+Math.abs(this.z)}normalize(){return this.divideScalar(this.length()||1)}setLength(e){return this.normalize().multiplyScalar(e)}lerp(e,t){return this.x+=(e.x-this.x)*t,this.y+=(e.y-this.y)*t,this.z+=(e.z-this.z)*t,this}lerpVectors(e,t,n){return this.x=e.x+(t.x-e.x)*n,this.y=e.y+(t.y-e.y)*n,this.z=e.z+(t.z-e.z)*n,this}cross(e){return this.crossVectors(this,e)}crossVectors(e,t){let n=e.x,r=e.y,i=e.z,a=t.x,o=t.y,s=t.z;return this.x=r*s-i*o,this.y=i*a-n*s,this.z=n*o-r*a,this}projectOnVector(e){let t=e.lengthSq();if(t===0)return this.set(0,0,0);let n=e.dot(this)/t;return this.copy(e).multiplyScalar(n)}projectOnPlane(e){return Vt.copy(this).projectOnVector(e),this.sub(Vt)}reflect(e){return this.sub(Vt.copy(e).multiplyScalar(2*this.dot(e)))}angleTo(e){let t=Math.sqrt(this.lengthSq()*e.lengthSq());if(t===0)return Math.PI/2;let n=this.dot(e)/t;return Math.acos(vt(n,-1,1))}distanceTo(e){return Math.sqrt(this.distanceToSquared(e))}distanceToSquared(e){let t=this.x-e.x,n=this.y-e.y,r=this.z-e.z;return t*t+n*n+r*r}manhattanDistanceTo(e){return Math.abs(this.x-e.x)+Math.abs(this.y-e.y)+Math.abs(this.z-e.z)}setFromSpherical(e){return this.setFromSphericalCoords(e.radius,e.phi,e.theta)}setFromSphericalCoords(e,t,n){let r=Math.sin(t)*e;return this.x=r*Math.sin(n),this.y=Math.cos(t)*e,this.z=r*Math.cos(n),this}setFromCylindrical(e){return this.setFromCylindricalCoords(e.radius,e.theta,e.y)}setFromCylindricalCoords(e,t,n){return this.x=e*Math.sin(t),this.y=n,this.z=e*Math.cos(t),this}setFromMatrixPosition(e){let t=e.elements;return this.x=t[12],this.y=t[13],this.z=t[14],this}setFromMatrixScale(e){let t=this.setFromMatrixColumn(e,0).length(),n=this.setFromMatrixColumn(e,1).length(),r=this.setFromMatrixColumn(e,2).length();return this.x=t,this.y=n,this.z=r,this}setFromMatrixColumn(e,t){return this.fromArray(e.elements,t*4)}setFromMatrix3Column(e,t){return this.fromArray(e.elements,t*3)}setFromEuler(e){return this.x=e._x,this.y=e._y,this.z=e._z,this}setFromColor(e){return this.x=e.r,this.y=e.g,this.z=e.b,this}equals(e){return e.x===this.x&&e.y===this.y&&e.z===this.z}fromArray(e,t=0){return this.x=e[t],this.y=e[t+1],this.z=e[t+2],this}toArray(e=[],t=0){return e[t]=this.x,e[t+1]=this.y,e[t+2]=this.z,e}fromBufferAttribute(e,t){return this.x=e.getX(t),this.y=e.getY(t),this.z=e.getZ(t),this}random(){return this.x=Math.random(),this.y=Math.random(),this.z=Math.random(),this}randomDirection(){let e=Math.random()*Math.PI*2,t=Math.random()*2-1,n=Math.sqrt(1-t*t);return this.x=n*Math.cos(e),this.y=t,this.z=n*Math.sin(e),this}*[Symbol.iterator](){yield this.x,yield this.y,yield this.z}},Vt=new Y,Ht=new Bt,Ut=class e{static{e.prototype.isMatrix3=!0}constructor(e,t,n,r,i,a,o,s,c){this.elements=[1,0,0,0,1,0,0,0,1],e!==void 0&&this.set(e,t,n,r,i,a,o,s,c)}set(e,t,n,r,i,a,o,s,c){let l=this.elements;return l[0]=e,l[1]=r,l[2]=o,l[3]=t,l[4]=i,l[5]=s,l[6]=n,l[7]=a,l[8]=c,this}identity(){return this.set(1,0,0,0,1,0,0,0,1),this}copy(e){let t=this.elements,n=e.elements;return t[0]=n[0],t[1]=n[1],t[2]=n[2],t[3]=n[3],t[4]=n[4],t[5]=n[5],t[6]=n[6],t[7]=n[7],t[8]=n[8],this}extractBasis(e,t,n){return e.setFromMatrix3Column(this,0),t.setFromMatrix3Column(this,1),n.setFromMatrix3Column(this,2),this}setFromMatrix4(e){let t=e.elements;return this.set(t[0],t[4],t[8],t[1],t[5],t[9],t[2],t[6],t[10]),this}multiply(e){return this.multiplyMatrices(this,e)}premultiply(e){return this.multiplyMatrices(e,this)}multiplyMatrices(e,t){let n=e.elements,r=t.elements,i=this.elements,a=n[0],o=n[3],s=n[6],c=n[1],l=n[4],u=n[7],d=n[2],f=n[5],p=n[8],m=r[0],h=r[3],g=r[6],_=r[1],v=r[4],y=r[7],b=r[2],x=r[5],S=r[8];return i[0]=a*m+o*_+s*b,i[3]=a*h+o*v+s*x,i[6]=a*g+o*y+s*S,i[1]=c*m+l*_+u*b,i[4]=c*h+l*v+u*x,i[7]=c*g+l*y+u*S,i[2]=d*m+f*_+p*b,i[5]=d*h+f*v+p*x,i[8]=d*g+f*y+p*S,this}multiplyScalar(e){let t=this.elements;return t[0]*=e,t[3]*=e,t[6]*=e,t[1]*=e,t[4]*=e,t[7]*=e,t[2]*=e,t[5]*=e,t[8]*=e,this}determinant(){let e=this.elements,t=e[0],n=e[1],r=e[2],i=e[3],a=e[4],o=e[5],s=e[6],c=e[7],l=e[8];return t*a*l-t*o*c-n*i*l+n*o*s+r*i*c-r*a*s}invert(){let e=this.elements,t=e[0],n=e[1],r=e[2],i=e[3],a=e[4],o=e[5],s=e[6],c=e[7],l=e[8],u=l*a-o*c,d=o*s-l*i,f=c*i-a*s,p=t*u+n*d+r*f;if(p===0)return this.set(0,0,0,0,0,0,0,0,0);let m=1/p;return e[0]=u*m,e[1]=(r*c-l*n)*m,e[2]=(o*n-r*a)*m,e[3]=d*m,e[4]=(l*t-r*s)*m,e[5]=(r*i-o*t)*m,e[6]=f*m,e[7]=(n*s-c*t)*m,e[8]=(a*t-n*i)*m,this}transpose(){let e,t=this.elements;return e=t[1],t[1]=t[3],t[3]=e,e=t[2],t[2]=t[6],t[6]=e,e=t[5],t[5]=t[7],t[7]=e,this}getNormalMatrix(e){return this.setFromMatrix4(e).invert().transpose()}transposeIntoArray(e){let t=this.elements;return e[0]=t[0],e[1]=t[3],e[2]=t[6],e[3]=t[1],e[4]=t[4],e[5]=t[7],e[6]=t[2],e[7]=t[5],e[8]=t[8],this}setUvTransform(e,t,n,r,i,a,o){let s=Math.cos(i),c=Math.sin(i);return this.set(n*s,n*c,-n*(s*a+c*o)+a+e,-r*c,r*s,-r*(-c*a+s*o)+o+t,0,0,1),this}scale(e,t){return lt(`Matrix3: .scale() is deprecated. Use .makeScale() instead.`),this.premultiply(Wt.makeScale(e,t)),this}rotate(e){return lt(`Matrix3: .rotate() is deprecated. Use .makeRotation() instead.`),this.premultiply(Wt.makeRotation(-e)),this}translate(e,t){return lt(`Matrix3: .translate() is deprecated. Use .makeTranslation() instead.`),this.premultiply(Wt.makeTranslation(e,t)),this}makeTranslation(e,t){return e.isVector2?this.set(1,0,e.x,0,1,e.y,0,0,1):this.set(1,0,e,0,1,t,0,0,1),this}makeRotation(e){let t=Math.cos(e),n=Math.sin(e);return this.set(t,-n,0,n,t,0,0,0,1),this}makeScale(e,t){return this.set(e,0,0,0,t,0,0,0,1),this}equals(e){let t=this.elements,n=e.elements;for(let e=0;e<9;e++)if(t[e]!==n[e])return!1;return!0}fromArray(e,t=0){for(let n=0;n<9;n++)this.elements[n]=e[n+t];return this}toArray(e=[],t=0){let n=this.elements;return e[t]=n[0],e[t+1]=n[1],e[t+2]=n[2],e[t+3]=n[3],e[t+4]=n[4],e[t+5]=n[5],e[t+6]=n[6],e[t+7]=n[7],e[t+8]=n[8],e}clone(){return new this.constructor().fromArray(this.elements)}},Wt=new Ut,Gt=new Ut().set(.4123908,.3575843,.1804808,.212639,.7151687,.0721923,.0193308,.1191948,.9505322),Kt=new Ut().set(3.2409699,-1.5373832,-.4986108,-.9692436,1.8759675,.0415551,.0556301,-.203977,1.0569715);function qt(){let e={enabled:!0,workingColorSpace:Xe,spaces:{},convert:function(e,t,n){return this.enabled===!1||t===n||!t||!n?e:(this.spaces[t].transfer===`srgb`&&(e.r=Yt(e.r),e.g=Yt(e.g),e.b=Yt(e.b)),this.spaces[t].primaries!==this.spaces[n].primaries&&(e.applyMatrix3(this.spaces[t].toXYZ),e.applyMatrix3(this.spaces[n].fromXYZ)),this.spaces[n].transfer===`srgb`&&(e.r=Xt(e.r),e.g=Xt(e.g),e.b=Xt(e.b)),e)},workingToColorSpace:function(e,t){return this.convert(e,this.workingColorSpace,t)},colorSpaceToWorking:function(e,t){return this.convert(e,t,this.workingColorSpace)},getPrimaries:function(e){return this.spaces[e].primaries},getTransfer:function(e){return e===``?Ze:this.spaces[e].transfer},getToneMappingMode:function(e){return this.spaces[e].outputColorSpaceConfig.toneMappingMode||`standard`},getLuminanceCoefficients:function(e,t=this.workingColorSpace){return e.fromArray(this.spaces[t].luminanceCoefficients)},define:function(e){Object.assign(this.spaces,e)},_getMatrix:function(e,t,n){return e.copy(this.spaces[t].toXYZ).multiply(this.spaces[n].fromXYZ)},_getDrawingBufferColorSpace:function(e){return this.spaces[e].outputColorSpaceConfig.drawingBufferColorSpace},_getUnpackColorSpace:function(e=this.workingColorSpace){return this.spaces[e].workingColorSpaceConfig.unpackColorSpace},fromWorkingColorSpace:function(t,n){return lt(`ColorManagement: .fromWorkingColorSpace() has been renamed to .workingToColorSpace().`),e.workingToColorSpace(t,n)},toWorkingColorSpace:function(t,n){return lt(`ColorManagement: .toWorkingColorSpace() has been renamed to .colorSpaceToWorking().`),e.colorSpaceToWorking(t,n)}},t=[.64,.33,.3,.6,.15,.06],n=[.2126,.7152,.0722],r=[.3127,.329];return e.define({[Xe]:{primaries:t,whitePoint:r,transfer:Ze,toXYZ:Gt,fromXYZ:Kt,luminanceCoefficients:n,workingColorSpaceConfig:{unpackColorSpace:Ye},outputColorSpaceConfig:{drawingBufferColorSpace:Ye}},[Ye]:{primaries:t,whitePoint:r,transfer:Qe,toXYZ:Gt,fromXYZ:Kt,luminanceCoefficients:n,outputColorSpaceConfig:{drawingBufferColorSpace:Ye}}}),e}var Jt=qt();function Yt(e){return e<.04045?e*.0773993808:(e*.9478672986+.0521327014)**2.4}function Xt(e){return e<.0031308?e*12.92:1.055*e**.41666-.055}var Zt,Qt=class{static getDataURL(e,t=`image/png`){if(/^data:/i.test(e.src)||typeof HTMLCanvasElement>`u`)return e.src;let n;if(e instanceof HTMLCanvasElement)n=e;else{Zt===void 0&&(Zt=it(`canvas`)),Zt.width=e.width,Zt.height=e.height;let t=Zt.getContext(`2d`);e instanceof ImageData?t.putImageData(e,0,0):t.drawImage(e,0,0,e.width,e.height),n=Zt}return n.toDataURL(t)}static sRGBToLinear(e){if(typeof HTMLImageElement<`u`&&e instanceof HTMLImageElement||typeof HTMLCanvasElement<`u`&&e instanceof HTMLCanvasElement||typeof ImageBitmap<`u`&&e instanceof ImageBitmap){let t=it(`canvas`);t.width=e.width,t.height=e.height;let n=t.getContext(`2d`);n.drawImage(e,0,0,e.width,e.height);let r=n.getImageData(0,0,e.width,e.height),i=r.data;for(let e=0;e<i.length;e++)i[e]=Yt(i[e]/255)*255;return n.putImageData(r,0,0),t}if(e.data){let t=e.data.slice(0);for(let e=0;e<t.length;e++)t instanceof Uint8Array||t instanceof Uint8ClampedArray?t[e]=Math.floor(Yt(t[e]/255)*255):t[e]=Yt(t[e]);return{data:t,width:e.width,height:e.height}}return K(`ImageUtils.sRGBToLinear(): Unsupported image type. No color space conversion applied.`),e}},$t=0,en=class{constructor(e=null){this.isTextureSource=!0,Object.defineProperty(this,"id",{value:$t++}),this.uuid=_t(),this.data=e,this.dataReady=!0,this.version=0}getSize(e){let t=this.data;return typeof HTMLVideoElement<`u`&&t instanceof HTMLVideoElement?e.set(t.videoWidth,t.videoHeight,0):typeof VideoFrame<`u`&&t instanceof VideoFrame?e.set(t.displayWidth,t.displayHeight,0):t===null?e.set(0,0,0):e.set(t.width,t.height,t.depth||0),e}set needsUpdate(e){e===!0&&this.version++}toJSON(e){let t=e===void 0||typeof e==`string`;if(!t&&e.images[this.uuid]!==void 0)return e.images[this.uuid];let n={uuid:this.uuid,url:``},r=this.data;if(r!==null){let e;if(Array.isArray(r)){e=[];for(let t=0,n=r.length;t<n;t++)r[t].isDataTexture?e.push(tn(r[t].image)):e.push(tn(r[t]))}else e=tn(r);n.url=e}return t||(e.images[this.uuid]=n),n}};function tn(e){return typeof HTMLImageElement<`u`&&e instanceof HTMLImageElement||typeof HTMLCanvasElement<`u`&&e instanceof HTMLCanvasElement||typeof ImageBitmap<`u`&&e instanceof ImageBitmap?Qt.getDataURL(e):e.data?{data:Array.from(e.data),width:e.width,height:e.height,type:e.data.constructor.name}:(K(`Texture: Unable to serialize Texture.`),{})}var nn=0,rn=new Y,an=class e extends ft{constructor(t=e.DEFAULT_IMAGE,n=e.DEFAULT_MAPPING,r=b,i=b,a=T,o=D,s=V,c=O,l=e.DEFAULT_ANISOTROPY,u=``){super(),this.isTexture=!0,Object.defineProperty(this,"id",{value:nn++}),this.uuid=_t(),this.name=``,this.source=new en(t),this.mipmaps=[],this.mapping=n,this.channel=0,this.wrapS=r,this.wrapT=i,this.magFilter=a,this.minFilter=o,this.anisotropy=l,this.format=s,this.internalFormat=null,this.type=c,this.offset=new J(0,0),this.repeat=new J(1,1),this.center=new J(0,0),this.rotation=0,this.matrixAutoUpdate=!0,this.matrix=new Ut,this.generateMipmaps=!0,this.premultiplyAlpha=!1,this.flipY=!0,this.unpackAlignment=4,this.colorSpace=u,this.userData={},this.updateRanges=[],this.version=0,this.onUpdate=null,this.renderTarget=null,this.isRenderTargetTexture=!1,this.isArrayTexture=!!(t&&t.depth&&t.depth>1),this.pmremVersion=0,this.normalized=!1}get width(){return this.source.getSize(rn).x}get height(){return this.source.getSize(rn).y}get depth(){return this.source.getSize(rn).z}get image(){return this.source.data}set image(e){this.source.data=e}updateMatrix(){this.matrix.setUvTransform(this.offset.x,this.offset.y,this.repeat.x,this.repeat.y,this.rotation,this.center.x,this.center.y)}addUpdateRange(e,t){this.updateRanges.push({start:e,count:t})}clearUpdateRanges(){this.updateRanges.length=0}clone(){return new this.constructor().copy(this)}copy(e){return this.name=e.name,this.source=e.source,this.mipmaps=e.mipmaps.slice(0),this.mapping=e.mapping,this.channel=e.channel,this.wrapS=e.wrapS,this.wrapT=e.wrapT,this.magFilter=e.magFilter,this.minFilter=e.minFilter,this.anisotropy=e.anisotropy,this.format=e.format,this.internalFormat=e.internalFormat,this.type=e.type,this.normalized=e.normalized,this.offset.copy(e.offset),this.repeat.copy(e.repeat),this.center.copy(e.center),this.rotation=e.rotation,this.matrixAutoUpdate=e.matrixAutoUpdate,this.matrix.copy(e.matrix),this.generateMipmaps=e.generateMipmaps,this.premultiplyAlpha=e.premultiplyAlpha,this.flipY=e.flipY,this.unpackAlignment=e.unpackAlignment,this.colorSpace=e.colorSpace,this.renderTarget=e.renderTarget,this.isRenderTargetTexture=e.isRenderTargetTexture,this.isArrayTexture=e.isArrayTexture,this.userData=JSON.parse(JSON.stringify(e.userData)),this.needsUpdate=!0,this}setValues(e){for(let t in e){let n=e[t];if(n===void 0){K(`Texture.setValues(): parameter '${t}' has value of undefined.`);continue}let r=this[t];if(r===void 0){K(`Texture.setValues(): property '${t}' does not exist.`);continue}r&&n&&r.isVector2&&n.isVector2||r&&n&&r.isVector3&&n.isVector3||r&&n&&r.isMatrix3&&n.isMatrix3?r.copy(n):this[t]=n}}toJSON(e){let t=e===void 0||typeof e==`string`;if(!t&&e.textures[this.uuid]!==void 0)return e.textures[this.uuid];let n={metadata:{version:4.7,type:`Texture`,generator:`Texture.toJSON`},uuid:this.uuid,name:this.name,image:this.source.toJSON(e).uuid,mapping:this.mapping,channel:this.channel,repeat:[this.repeat.x,this.repeat.y],offset:[this.offset.x,this.offset.y],center:[this.center.x,this.center.y],rotation:this.rotation,wrap:[this.wrapS,this.wrapT],format:this.format,internalFormat:this.internalFormat,type:this.type,normalized:this.normalized,colorSpace:this.colorSpace,minFilter:this.minFilter,magFilter:this.magFilter,anisotropy:this.anisotropy,flipY:this.flipY,generateMipmaps:this.generateMipmaps,premultiplyAlpha:this.premultiplyAlpha,unpackAlignment:this.unpackAlignment};return Object.keys(this.userData).length>0&&(n.userData=this.userData),t||(e.textures[this.uuid]=n),n}dispose(){this.dispatchEvent({type:`dispose`})}transformUv(e){if(this.mapping!==300)return e;if(e.applyMatrix3(this.matrix),e.x<0||e.x>1)switch(this.wrapS){case y:e.x-=Math.floor(e.x);break;case b:e.x=e.x<0?0:1;break;case x:Math.abs(Math.floor(e.x)%2)===1?e.x=Math.ceil(e.x)-e.x:e.x-=Math.floor(e.x)}if(e.y<0||e.y>1)switch(this.wrapT){case y:e.y-=Math.floor(e.y);break;case b:e.y=e.y<0?0:1;break;case x:Math.abs(Math.floor(e.y)%2)===1?e.y=Math.ceil(e.y)-e.y:e.y-=Math.floor(e.y)}return this.flipY&&(e.y=1-e.y),e}set needsUpdate(e){e===!0&&(this.version++,this.source.needsUpdate=!0)}set needsPMREMUpdate(e){e===!0&&this.pmremVersion++}};an.DEFAULT_IMAGE=null,an.DEFAULT_MAPPING=300,an.DEFAULT_ANISOTROPY=1;var on=class e{static{e.prototype.isVector4=!0}constructor(e=0,t=0,n=0,r=1){this.x=e,this.y=t,this.z=n,this.w=r}get width(){return this.z}set width(e){this.z=e}get height(){return this.w}set height(e){this.w=e}set(e,t,n,r){return this.x=e,this.y=t,this.z=n,this.w=r,this}setScalar(e){return this.x=e,this.y=e,this.z=e,this.w=e,this}setX(e){return this.x=e,this}setY(e){return this.y=e,this}setZ(e){return this.z=e,this}setW(e){return this.w=e,this}setComponent(e,t){switch(e){case 0:this.x=t;break;case 1:this.y=t;break;case 2:this.z=t;break;case 3:this.w=t;break;default:throw Error(`THREE.Vector4: index is out of range: `+e)}return this}getComponent(e){switch(e){case 0:return this.x;case 1:return this.y;case 2:return this.z;case 3:return this.w;default:throw Error(`THREE.Vector4: index is out of range: `+e)}}clone(){return new this.constructor(this.x,this.y,this.z,this.w)}copy(e){return this.x=e.x,this.y=e.y,this.z=e.z,this.w=e.w===void 0?1:e.w,this}add(e){return this.x+=e.x,this.y+=e.y,this.z+=e.z,this.w+=e.w,this}addScalar(e){return this.x+=e,this.y+=e,this.z+=e,this.w+=e,this}addVectors(e,t){return this.x=e.x+t.x,this.y=e.y+t.y,this.z=e.z+t.z,this.w=e.w+t.w,this}addScaledVector(e,t){return this.x+=e.x*t,this.y+=e.y*t,this.z+=e.z*t,this.w+=e.w*t,this}sub(e){return this.x-=e.x,this.y-=e.y,this.z-=e.z,this.w-=e.w,this}subScalar(e){return this.x-=e,this.y-=e,this.z-=e,this.w-=e,this}subVectors(e,t){return this.x=e.x-t.x,this.y=e.y-t.y,this.z=e.z-t.z,this.w=e.w-t.w,this}multiply(e){return this.x*=e.x,this.y*=e.y,this.z*=e.z,this.w*=e.w,this}multiplyScalar(e){return this.x*=e,this.y*=e,this.z*=e,this.w*=e,this}applyMatrix4(e){let t=this.x,n=this.y,r=this.z,i=this.w,a=e.elements;return this.x=a[0]*t+a[4]*n+a[8]*r+a[12]*i,this.y=a[1]*t+a[5]*n+a[9]*r+a[13]*i,this.z=a[2]*t+a[6]*n+a[10]*r+a[14]*i,this.w=a[3]*t+a[7]*n+a[11]*r+a[15]*i,this}divide(e){return this.x/=e.x,this.y/=e.y,this.z/=e.z,this.w/=e.w,this}divideScalar(e){return this.multiplyScalar(1/e)}setAxisAngleFromQuaternion(e){this.w=2*Math.acos(e.w);let t=Math.sqrt(1-e.w*e.w);return t<1e-4?(this.x=1,this.y=0,this.z=0):(this.x=e.x/t,this.y=e.y/t,this.z=e.z/t),this}setAxisAngleFromRotationMatrix(e){let t,n,r,i,a=.01,o=.1,s=e.elements,c=s[0],l=s[4],u=s[8],d=s[1],f=s[5],p=s[9],m=s[2],h=s[6],g=s[10];if(Math.abs(l-d)<a&&Math.abs(u-m)<a&&Math.abs(p-h)<a){if(Math.abs(l+d)<o&&Math.abs(u+m)<o&&Math.abs(p+h)<o&&Math.abs(c+f+g-3)<o)return this.set(1,0,0,0),this;t=Math.PI;let e=(c+1)/2,s=(f+1)/2,_=(g+1)/2,v=(l+d)/4,y=(u+m)/4,b=(p+h)/4;return e>s&&e>_?e<a?(n=0,r=.707106781,i=.707106781):(n=Math.sqrt(e),r=v/n,i=y/n):s>_?s<a?(n=.707106781,r=0,i=.707106781):(r=Math.sqrt(s),n=v/r,i=b/r):_<a?(n=.707106781,r=.707106781,i=0):(i=Math.sqrt(_),n=y/i,r=b/i),this.set(n,r,i,t),this}let _=Math.sqrt((h-p)*(h-p)+(u-m)*(u-m)+(d-l)*(d-l));return Math.abs(_)<.001&&(_=1),this.x=(h-p)/_,this.y=(u-m)/_,this.z=(d-l)/_,this.w=Math.acos((c+f+g-1)/2),this}setFromMatrixPosition(e){let t=e.elements;return this.x=t[12],this.y=t[13],this.z=t[14],this.w=t[15],this}min(e){return this.x=Math.min(this.x,e.x),this.y=Math.min(this.y,e.y),this.z=Math.min(this.z,e.z),this.w=Math.min(this.w,e.w),this}max(e){return this.x=Math.max(this.x,e.x),this.y=Math.max(this.y,e.y),this.z=Math.max(this.z,e.z),this.w=Math.max(this.w,e.w),this}clamp(e,t){return this.x=vt(this.x,e.x,t.x),this.y=vt(this.y,e.y,t.y),this.z=vt(this.z,e.z,t.z),this.w=vt(this.w,e.w,t.w),this}clampScalar(e,t){return this.x=vt(this.x,e,t),this.y=vt(this.y,e,t),this.z=vt(this.z,e,t),this.w=vt(this.w,e,t),this}clampLength(e,t){let n=this.length();return this.divideScalar(n||1).multiplyScalar(vt(n,e,t))}floor(){return this.x=Math.floor(this.x),this.y=Math.floor(this.y),this.z=Math.floor(this.z),this.w=Math.floor(this.w),this}ceil(){return this.x=Math.ceil(this.x),this.y=Math.ceil(this.y),this.z=Math.ceil(this.z),this.w=Math.ceil(this.w),this}round(){return this.x=Math.round(this.x),this.y=Math.round(this.y),this.z=Math.round(this.z),this.w=Math.round(this.w),this}roundToZero(){return this.x=Math.trunc(this.x),this.y=Math.trunc(this.y),this.z=Math.trunc(this.z),this.w=Math.trunc(this.w),this}negate(){return this.x=-this.x,this.y=-this.y,this.z=-this.z,this.w=-this.w,this}dot(e){return this.x*e.x+this.y*e.y+this.z*e.z+this.w*e.w}lengthSq(){return this.x*this.x+this.y*this.y+this.z*this.z+this.w*this.w}length(){return Math.sqrt(this.x*this.x+this.y*this.y+this.z*this.z+this.w*this.w)}manhattanLength(){return Math.abs(this.x)+Math.abs(this.y)+Math.abs(this.z)+Math.abs(this.w)}normalize(){return this.divideScalar(this.length()||1)}setLength(e){return this.normalize().multiplyScalar(e)}lerp(e,t){return this.x+=(e.x-this.x)*t,this.y+=(e.y-this.y)*t,this.z+=(e.z-this.z)*t,this.w+=(e.w-this.w)*t,this}lerpVectors(e,t,n){return this.x=e.x+(t.x-e.x)*n,this.y=e.y+(t.y-e.y)*n,this.z=e.z+(t.z-e.z)*n,this.w=e.w+(t.w-e.w)*n,this}equals(e){return e.x===this.x&&e.y===this.y&&e.z===this.z&&e.w===this.w}fromArray(e,t=0){return this.x=e[t],this.y=e[t+1],this.z=e[t+2],this.w=e[t+3],this}toArray(e=[],t=0){return e[t]=this.x,e[t+1]=this.y,e[t+2]=this.z,e[t+3]=this.w,e}fromBufferAttribute(e,t){return this.x=e.getX(t),this.y=e.getY(t),this.z=e.getZ(t),this.w=e.getW(t),this}random(){return this.x=Math.random(),this.y=Math.random(),this.z=Math.random(),this.w=Math.random(),this}*[Symbol.iterator](){yield this.x,yield this.y,yield this.z,yield this.w}},sn=class extends ft{constructor(e=1,t=1,n={}){super(),n=Object.assign({generateMipmaps:!1,internalFormat:null,minFilter:T,depthBuffer:!0,stencilBuffer:!1,resolveColorBuffer:!0,resolveDepthBuffer:!0,resolveStencilBuffer:!0,storeMultisampledColorBuffer:!0,storeMultisampledDepthBuffer:!0,storeMultisampledStencilBuffer:!0,depthTexture:null,samples:0,count:1,depth:1,multiview:!1,useArrayDepthTexture:!1},n),this.isRenderTarget=!0,this.width=e,this.height=t,this.depth=n.depth,this.scissor=new on(0,0,e,t),this.scissorTest=!1,this.viewport=new on(0,0,e,t),this.textures=[];let r=new an({width:e,height:t,depth:n.depth}),i=n.count;for(let e=0;e<i;e++)this.textures[e]=r.clone(),this.textures[e].isRenderTargetTexture=!0,this.textures[e].renderTarget=this;this._setTextureOptions(n),this.depthBuffer=n.depthBuffer,this.stencilBuffer=n.stencilBuffer,this.resolveColorBuffer=n.resolveColorBuffer,this.resolveDepthBuffer=n.resolveDepthBuffer,this.resolveStencilBuffer=n.resolveStencilBuffer,this.storeMultisampledColorBuffer=n.storeMultisampledColorBuffer,this.storeMultisampledDepthBuffer=n.storeMultisampledDepthBuffer,this.storeMultisampledStencilBuffer=n.storeMultisampledStencilBuffer,this._depthTexture=null,this.depthTexture=n.depthTexture,this.samples=n.samples,this.multiview=n.multiview,this.useArrayDepthTexture=n.useArrayDepthTexture}_setTextureOptions(e={}){let t={minFilter:T,generateMipmaps:!1,flipY:!1,internalFormat:null};e.mapping!==void 0&&(t.mapping=e.mapping),e.wrapS!==void 0&&(t.wrapS=e.wrapS),e.wrapT!==void 0&&(t.wrapT=e.wrapT),e.wrapR!==void 0&&(t.wrapR=e.wrapR),e.magFilter!==void 0&&(t.magFilter=e.magFilter),e.minFilter!==void 0&&(t.minFilter=e.minFilter),e.format!==void 0&&(t.format=e.format),e.type!==void 0&&(t.type=e.type),e.anisotropy!==void 0&&(t.anisotropy=e.anisotropy),e.colorSpace!==void 0&&(t.colorSpace=e.colorSpace),e.flipY!==void 0&&(t.flipY=e.flipY),e.generateMipmaps!==void 0&&(t.generateMipmaps=e.generateMipmaps),e.internalFormat!==void 0&&(t.internalFormat=e.internalFormat);for(let e=0;e<this.textures.length;e++)this.textures[e].setValues(t)}get texture(){return this.textures[0]}set texture(e){this.textures[0]=e}set depthTexture(e){this._depthTexture!==null&&this._depthTexture.renderTarget===this&&(this._depthTexture.renderTarget=null),e!==null&&e.renderTarget===null&&(e.renderTarget=this),this._depthTexture=e}get depthTexture(){return this._depthTexture}setSize(e,t,n=1){if(this.width!==e||this.height!==t||this.depth!==n){this.width=e,this.height=t,this.depth=n;for(let r=0,i=this.textures.length;r<i;r++)this.textures[r].image.width=e,this.textures[r].image.height=t,this.textures[r].image.depth=n,this.textures[r].isData3DTexture!==!0&&(this.textures[r].isArrayTexture=this.textures[r].image.depth>1);this.dispose()}this.viewport.set(0,0,e,t),this.scissor.set(0,0,e,t)}clone(){return new this.constructor().copy(this)}copy(e){this.width=e.width,this.height=e.height,this.depth=e.depth,this.scissor.copy(e.scissor),this.scissorTest=e.scissorTest,this.viewport.copy(e.viewport),this.textures.length=0;for(let t=0,n=e.textures.length;t<n;t++){this.textures[t]=e.textures[t].clone(),this.textures[t].isRenderTargetTexture=!0,this.textures[t].renderTarget=this;let n=Object.assign({},e.textures[t].image);this.textures[t].source=new en(n)}if(this.depthBuffer=e.depthBuffer,this.stencilBuffer=e.stencilBuffer,this.resolveColorBuffer=e.resolveColorBuffer,this.resolveDepthBuffer=e.resolveDepthBuffer,this.resolveStencilBuffer=e.resolveStencilBuffer,this.storeMultisampledColorBuffer=e.storeMultisampledColorBuffer,this.storeMultisampledDepthBuffer=e.storeMultisampledDepthBuffer,this.storeMultisampledStencilBuffer=e.storeMultisampledStencilBuffer,e.depthTexture!==null){if(e.depthTexture.renderTarget===e){let t=e.depthTexture.clone();t.renderTarget=null,this.depthTexture=t}else this.depthTexture=e.depthTexture}return this.samples=e.samples,this.multiview=e.multiview,this.useArrayDepthTexture=e.useArrayDepthTexture,this}dispose(){this.dispatchEvent({type:`dispose`})}},cn=class extends sn{constructor(e=1,t=1,n={}){super(e,t,n),this.isWebGLRenderTarget=!0}},ln=class extends an{constructor(e=null,t=1,n=1,r=1){super(null),this.isDataArrayTexture=!0,this.image={data:e,width:t,height:n,depth:r},this.magFilter=S,this.minFilter=S,this.wrapR=b,this.generateMipmaps=!1,this.flipY=!1,this.unpackAlignment=1,this.layerUpdates=new Set}copy(e){return super.copy(e),this.wrapR=e.wrapR,this}addLayerUpdate(e){this.layerUpdates.add(e)}clearLayerUpdates(){this.layerUpdates.clear()}},un=class extends an{constructor(e=null,t=1,n=1,r=1){super(null),this.isData3DTexture=!0,this.image={data:e,width:t,height:n,depth:r},this.magFilter=S,this.minFilter=S,this.wrapR=b,this.generateMipmaps=!1,this.flipY=!1,this.unpackAlignment=1}copy(e){return super.copy(e),this.wrapR=e.wrapR,this}},dn=class e{static{e.prototype.isMatrix4=!0}constructor(e,t,n,r,i,a,o,s,c,l,u,d,f,p,m,h){this.elements=[1,0,0,0,0,1,0,0,0,0,1,0,0,0,0,1],e!==void 0&&this.set(e,t,n,r,i,a,o,s,c,l,u,d,f,p,m,h)}set(e,t,n,r,i,a,o,s,c,l,u,d,f,p,m,h){let g=this.elements;return g[0]=e,g[4]=t,g[8]=n,g[12]=r,g[1]=i,g[5]=a,g[9]=o,g[13]=s,g[2]=c,g[6]=l,g[10]=u,g[14]=d,g[3]=f,g[7]=p,g[11]=m,g[15]=h,this}identity(){return this.set(1,0,0,0,0,1,0,0,0,0,1,0,0,0,0,1),this}clone(){return new e().fromArray(this.elements)}copy(e){let t=this.elements,n=e.elements;return t[0]=n[0],t[1]=n[1],t[2]=n[2],t[3]=n[3],t[4]=n[4],t[5]=n[5],t[6]=n[6],t[7]=n[7],t[8]=n[8],t[9]=n[9],t[10]=n[10],t[11]=n[11],t[12]=n[12],t[13]=n[13],t[14]=n[14],t[15]=n[15],this}copyPosition(e){let t=this.elements,n=e.elements;return t[12]=n[12],t[13]=n[13],t[14]=n[14],this}setFromMatrix3(e){let t=e.elements;return this.set(t[0],t[3],t[6],0,t[1],t[4],t[7],0,t[2],t[5],t[8],0,0,0,0,1),this}extractBasis(e,t,n){return this.determinantAffine()===0?(e.set(1,0,0),t.set(0,1,0),n.set(0,0,1),this):(e.setFromMatrixColumn(this,0),t.setFromMatrixColumn(this,1),n.setFromMatrixColumn(this,2),this)}makeBasis(e,t,n){return this.set(e.x,t.x,n.x,0,e.y,t.y,n.y,0,e.z,t.z,n.z,0,0,0,0,1),this}extractRotation(e){if(e.determinantAffine()===0)return this.identity();let t=this.elements,n=e.elements,r=1/fn.setFromMatrixColumn(e,0).length(),i=1/fn.setFromMatrixColumn(e,1).length(),a=1/fn.setFromMatrixColumn(e,2).length();return t[0]=n[0]*r,t[1]=n[1]*r,t[2]=n[2]*r,t[3]=0,t[4]=n[4]*i,t[5]=n[5]*i,t[6]=n[6]*i,t[7]=0,t[8]=n[8]*a,t[9]=n[9]*a,t[10]=n[10]*a,t[11]=0,t[12]=0,t[13]=0,t[14]=0,t[15]=1,this}makeRotationFromEuler(e){let t=this.elements,n=e.x,r=e.y,i=e.z,a=Math.cos(n),o=Math.sin(n),s=Math.cos(r),c=Math.sin(r),l=Math.cos(i),u=Math.sin(i);if(e.order===`XYZ`){let e=a*l,n=a*u,r=o*l,i=o*u;t[0]=s*l,t[4]=-s*u,t[8]=c,t[1]=n+r*c,t[5]=e-i*c,t[9]=-o*s,t[2]=i-e*c,t[6]=r+n*c,t[10]=a*s}else if(e.order===`YXZ`){let e=s*l,n=s*u,r=c*l,i=c*u;t[0]=e+i*o,t[4]=r*o-n,t[8]=a*c,t[1]=a*u,t[5]=a*l,t[9]=-o,t[2]=n*o-r,t[6]=i+e*o,t[10]=a*s}else if(e.order===`ZXY`){let e=s*l,n=s*u,r=c*l,i=c*u;t[0]=e-i*o,t[4]=-a*u,t[8]=r+n*o,t[1]=n+r*o,t[5]=a*l,t[9]=i-e*o,t[2]=-a*c,t[6]=o,t[10]=a*s}else if(e.order===`ZYX`){let e=a*l,n=a*u,r=o*l,i=o*u;t[0]=s*l,t[4]=r*c-n,t[8]=e*c+i,t[1]=s*u,t[5]=i*c+e,t[9]=n*c-r,t[2]=-c,t[6]=o*s,t[10]=a*s}else if(e.order===`YZX`){let e=a*s,n=a*c,r=o*s,i=o*c;t[0]=s*l,t[4]=i-e*u,t[8]=r*u+n,t[1]=u,t[5]=a*l,t[9]=-o*l,t[2]=-c*l,t[6]=n*u+r,t[10]=e-i*u}else if(e.order===`XZY`){let e=a*s,n=a*c,r=o*s,i=o*c;t[0]=s*l,t[4]=-u,t[8]=c*l,t[1]=e*u+i,t[5]=a*l,t[9]=n*u-r,t[2]=r*u-n,t[6]=o*l,t[10]=i*u+e}return t[3]=0,t[7]=0,t[11]=0,t[12]=0,t[13]=0,t[14]=0,t[15]=1,this}makeRotationFromQuaternion(e){return this.compose(mn,e,hn)}lookAt(e,t,n){let r=this.elements;return vn.subVectors(e,t),vn.lengthSq()===0&&(vn.z=1),vn.normalize(),gn.crossVectors(n,vn),gn.lengthSq()===0&&(Math.abs(n.z)===1?vn.x+=1e-4:vn.z+=1e-4,vn.normalize(),gn.crossVectors(n,vn)),gn.normalize(),_n.crossVectors(vn,gn),r[0]=gn.x,r[4]=_n.x,r[8]=vn.x,r[1]=gn.y,r[5]=_n.y,r[9]=vn.y,r[2]=gn.z,r[6]=_n.z,r[10]=vn.z,this}multiply(e){return this.multiplyMatrices(this,e)}premultiply(e){return this.multiplyMatrices(e,this)}multiplyMatrices(e,t){let n=e.elements,r=t.elements,i=this.elements,a=n[0],o=n[4],s=n[8],c=n[12],l=n[1],u=n[5],d=n[9],f=n[13],p=n[2],m=n[6],h=n[10],g=n[14],_=n[3],v=n[7],y=n[11],b=n[15],x=r[0],S=r[4],C=r[8],w=r[12],T=r[1],E=r[5],D=r[9],O=r[13],k=r[2],A=r[6],j=r[10],M=r[14],N=r[3],P=r[7],F=r[11],I=r[15];return i[0]=a*x+o*T+s*k+c*N,i[4]=a*S+o*E+s*A+c*P,i[8]=a*C+o*D+s*j+c*F,i[12]=a*w+o*O+s*M+c*I,i[1]=l*x+u*T+d*k+f*N,i[5]=l*S+u*E+d*A+f*P,i[9]=l*C+u*D+d*j+f*F,i[13]=l*w+u*O+d*M+f*I,i[2]=p*x+m*T+h*k+g*N,i[6]=p*S+m*E+h*A+g*P,i[10]=p*C+m*D+h*j+g*F,i[14]=p*w+m*O+h*M+g*I,i[3]=_*x+v*T+y*k+b*N,i[7]=_*S+v*E+y*A+b*P,i[11]=_*C+v*D+y*j+b*F,i[15]=_*w+v*O+y*M+b*I,this}multiplyScalar(e){let t=this.elements;return t[0]*=e,t[4]*=e,t[8]*=e,t[12]*=e,t[1]*=e,t[5]*=e,t[9]*=e,t[13]*=e,t[2]*=e,t[6]*=e,t[10]*=e,t[14]*=e,t[3]*=e,t[7]*=e,t[11]*=e,t[15]*=e,this}determinant(){let e=this.elements,t=e[0],n=e[4],r=e[8],i=e[12],a=e[1],o=e[5],s=e[9],c=e[13],l=e[2],u=e[6],d=e[10],f=e[14],p=e[3],m=e[7],h=e[11],g=e[15],_=s*f-c*d,v=o*f-c*u,y=o*d-s*u,b=a*f-c*l,x=a*d-s*l,S=a*u-o*l;return t*(m*_-h*v+g*y)-n*(p*_-h*b+g*x)+r*(p*v-m*b+g*S)-i*(p*y-m*x+h*S)}determinantAffine(){let e=this.elements,t=e[0],n=e[4],r=e[8],i=e[1],a=e[5],o=e[9],s=e[2],c=e[6],l=e[10];return t*(a*l-o*c)-n*(i*l-o*s)+r*(i*c-a*s)}transpose(){let e=this.elements,t;return t=e[1],e[1]=e[4],e[4]=t,t=e[2],e[2]=e[8],e[8]=t,t=e[6],e[6]=e[9],e[9]=t,t=e[3],e[3]=e[12],e[12]=t,t=e[7],e[7]=e[13],e[13]=t,t=e[11],e[11]=e[14],e[14]=t,this}setPosition(e,t,n){let r=this.elements;return e.isVector3?(r[12]=e.x,r[13]=e.y,r[14]=e.z):(r[12]=e,r[13]=t,r[14]=n),this}invert(){let e=this.elements,t=e[0],n=e[1],r=e[2],i=e[3],a=e[4],o=e[5],s=e[6],c=e[7],l=e[8],u=e[9],d=e[10],f=e[11],p=e[12],m=e[13],h=e[14],g=e[15],_=t*o-n*a,v=t*s-r*a,y=t*c-i*a,b=n*s-r*o,x=n*c-i*o,S=r*c-i*s,C=l*m-u*p,w=l*h-d*p,T=l*g-f*p,E=u*h-d*m,D=u*g-f*m,O=d*g-f*h,k=_*O-v*D+y*E+b*T-x*w+S*C;if(k===0)return this.set(0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0);let A=1/k;return e[0]=(o*O-s*D+c*E)*A,e[1]=(r*D-n*O-i*E)*A,e[2]=(m*S-h*x+g*b)*A,e[3]=(d*x-u*S-f*b)*A,e[4]=(s*T-a*O-c*w)*A,e[5]=(t*O-r*T+i*w)*A,e[6]=(h*y-p*S-g*v)*A,e[7]=(l*S-d*y+f*v)*A,e[8]=(a*D-o*T+c*C)*A,e[9]=(n*T-t*D-i*C)*A,e[10]=(p*x-m*y+g*_)*A,e[11]=(u*y-l*x-f*_)*A,e[12]=(o*w-a*E-s*C)*A,e[13]=(t*E-n*w+r*C)*A,e[14]=(m*v-p*b-h*_)*A,e[15]=(l*b-u*v+d*_)*A,this}scale(e){let t=this.elements,n=e.x,r=e.y,i=e.z;return t[0]*=n,t[4]*=r,t[8]*=i,t[1]*=n,t[5]*=r,t[9]*=i,t[2]*=n,t[6]*=r,t[10]*=i,t[3]*=n,t[7]*=r,t[11]*=i,this}getMaxScaleOnAxis(){let e=this.elements,t=e[0]*e[0]+e[1]*e[1]+e[2]*e[2],n=e[4]*e[4]+e[5]*e[5]+e[6]*e[6],r=e[8]*e[8]+e[9]*e[9]+e[10]*e[10];return Math.sqrt(Math.max(t,n,r))}makeTranslation(e,t,n){return e.isVector3?this.set(1,0,0,e.x,0,1,0,e.y,0,0,1,e.z,0,0,0,1):this.set(1,0,0,e,0,1,0,t,0,0,1,n,0,0,0,1),this}makeRotationX(e){let t=Math.cos(e),n=Math.sin(e);return this.set(1,0,0,0,0,t,-n,0,0,n,t,0,0,0,0,1),this}makeRotationY(e){let t=Math.cos(e),n=Math.sin(e);return this.set(t,0,n,0,0,1,0,0,-n,0,t,0,0,0,0,1),this}makeRotationZ(e){let t=Math.cos(e),n=Math.sin(e);return this.set(t,-n,0,0,n,t,0,0,0,0,1,0,0,0,0,1),this}makeRotationAxis(e,t){let n=Math.cos(t),r=Math.sin(t),i=1-n,a=e.x,o=e.y,s=e.z,c=i*a,l=i*o;return this.set(c*a+n,c*o-r*s,c*s+r*o,0,c*o+r*s,l*o+n,l*s-r*a,0,c*s-r*o,l*s+r*a,i*s*s+n,0,0,0,0,1),this}makeScale(e,t,n){return this.set(e,0,0,0,0,t,0,0,0,0,n,0,0,0,0,1),this}makeShear(e,t,n,r,i,a){return this.set(1,n,i,0,e,1,a,0,t,r,1,0,0,0,0,1),this}compose(e,t,n){let r=this.elements,i=t._x,a=t._y,o=t._z,s=t._w,c=i+i,l=a+a,u=o+o,d=i*c,f=i*l,p=i*u,m=a*l,h=a*u,g=o*u,_=s*c,v=s*l,y=s*u,b=n.x,x=n.y,S=n.z;return r[0]=(1-(m+g))*b,r[1]=(f+y)*b,r[2]=(p-v)*b,r[3]=0,r[4]=(f-y)*x,r[5]=(1-(d+g))*x,r[6]=(h+_)*x,r[7]=0,r[8]=(p+v)*S,r[9]=(h-_)*S,r[10]=(1-(d+m))*S,r[11]=0,r[12]=e.x,r[13]=e.y,r[14]=e.z,r[15]=1,this}decompose(e,t,n){let r=this.elements;e.x=r[12],e.y=r[13],e.z=r[14];let i=this.determinantAffine();if(i===0)return n.set(1,1,1),t.identity(),this;let a=fn.set(r[0],r[1],r[2]).length(),o=fn.set(r[4],r[5],r[6]).length(),s=fn.set(r[8],r[9],r[10]).length();i<0&&(a=-a),pn.copy(this);let c=1/a,l=1/o,u=1/s;return pn.elements[0]*=c,pn.elements[1]*=c,pn.elements[2]*=c,pn.elements[4]*=l,pn.elements[5]*=l,pn.elements[6]*=l,pn.elements[8]*=u,pn.elements[9]*=u,pn.elements[10]*=u,t.setFromRotationMatrix(pn),n.x=a,n.y=o,n.z=s,this}makePerspective(e,t,n,r,i,a,o=tt,s=!1){let c=this.elements,l=2*i/(t-e),u=2*i/(n-r),d=(t+e)/(t-e),f=(n+r)/(n-r),p,m;if(s)p=i/(a-i),m=a*i/(a-i);else if(o===2e3)p=-(a+i)/(a-i),m=-2*a*i/(a-i);else if(o===2001)p=-a/(a-i),m=-a*i/(a-i);else throw Error(`THREE.Matrix4.makePerspective(): Invalid coordinate system: `+o);return c[0]=l,c[4]=0,c[8]=d,c[12]=0,c[1]=0,c[5]=u,c[9]=f,c[13]=0,c[2]=0,c[6]=0,c[10]=p,c[14]=m,c[3]=0,c[7]=0,c[11]=-1,c[15]=0,this}makeOrthographic(e,t,n,r,i,a,o=tt,s=!1){let c=this.elements,l=2/(t-e),u=2/(n-r),d=-(t+e)/(t-e),f=-(n+r)/(n-r),p,m;if(s)p=1/(a-i),m=a/(a-i);else if(o===2e3)p=-2/(a-i),m=-(a+i)/(a-i);else if(o===2001)p=-1/(a-i),m=-i/(a-i);else throw Error(`THREE.Matrix4.makeOrthographic(): Invalid coordinate system: `+o);return c[0]=l,c[4]=0,c[8]=0,c[12]=d,c[1]=0,c[5]=u,c[9]=0,c[13]=f,c[2]=0,c[6]=0,c[10]=p,c[14]=m,c[3]=0,c[7]=0,c[11]=0,c[15]=1,this}equals(e){let t=this.elements,n=e.elements;for(let e=0;e<16;e++)if(t[e]!==n[e])return!1;return!0}fromArray(e,t=0){for(let n=0;n<16;n++)this.elements[n]=e[n+t];return this}toArray(e=[],t=0){let n=this.elements;return e[t]=n[0],e[t+1]=n[1],e[t+2]=n[2],e[t+3]=n[3],e[t+4]=n[4],e[t+5]=n[5],e[t+6]=n[6],e[t+7]=n[7],e[t+8]=n[8],e[t+9]=n[9],e[t+10]=n[10],e[t+11]=n[11],e[t+12]=n[12],e[t+13]=n[13],e[t+14]=n[14],e[t+15]=n[15],e}},fn=new Y,pn=new dn,mn=new Y(0,0,0),hn=new Y(1,1,1),gn=new Y,_n=new Y,vn=new Y,yn=new dn,bn=new Bt,xn=class e{constructor(t=0,n=0,r=0,i=e.DEFAULT_ORDER){this.isEuler=!0,this._x=t,this._y=n,this._z=r,this._order=i}get x(){return this._x}set x(e){this._x=e,this._onChangeCallback()}get y(){return this._y}set y(e){this._y=e,this._onChangeCallback()}get z(){return this._z}set z(e){this._z=e,this._onChangeCallback()}get order(){return this._order}set order(e){this._order=e,this._onChangeCallback()}set(e,t,n,r=this._order){return this._x=e,this._y=t,this._z=n,this._order=r,this._onChangeCallback(),this}clone(){return new this.constructor(this._x,this._y,this._z,this._order)}copy(e){return this._x=e._x,this._y=e._y,this._z=e._z,this._order=e._order,this._onChangeCallback(),this}setFromRotationMatrix(e,t=this._order,n=!0){let r=e.elements,i=r[0],a=r[4],o=r[8],s=r[1],c=r[5],l=r[9],u=r[2],d=r[6],f=r[10];switch(t){case`XYZ`:this._y=Math.asin(vt(o,-1,1)),Math.abs(o)<.9999999?(this._x=Math.atan2(-l,f),this._z=Math.atan2(-a,i)):(this._x=Math.atan2(d,c),this._z=0);break;case`YXZ`:this._x=Math.asin(-vt(l,-1,1)),Math.abs(l)<.9999999?(this._y=Math.atan2(o,f),this._z=Math.atan2(s,c)):(this._y=Math.atan2(-u,i),this._z=0);break;case`ZXY`:this._x=Math.asin(vt(d,-1,1)),Math.abs(d)<.9999999?(this._y=Math.atan2(-u,f),this._z=Math.atan2(-a,c)):(this._y=0,this._z=Math.atan2(s,i));break;case`ZYX`:this._y=Math.asin(-vt(u,-1,1)),Math.abs(u)<.9999999?(this._x=Math.atan2(d,f),this._z=Math.atan2(s,i)):(this._x=0,this._z=Math.atan2(-a,c));break;case`YZX`:this._z=Math.asin(vt(s,-1,1)),Math.abs(s)<.9999999?(this._x=Math.atan2(-l,c),this._y=Math.atan2(-u,i)):(this._x=0,this._y=Math.atan2(o,f));break;case`XZY`:this._z=Math.asin(-vt(a,-1,1)),Math.abs(a)<.9999999?(this._x=Math.atan2(d,c),this._y=Math.atan2(o,i)):(this._x=Math.atan2(-l,f),this._y=0);break;default:K(`Euler: .setFromRotationMatrix() encountered an unknown order: `+t)}return this._order=t,n===!0&&this._onChangeCallback(),this}setFromQuaternion(e,t,n){return yn.makeRotationFromQuaternion(e),this.setFromRotationMatrix(yn,t,n)}setFromVector3(e,t=this._order){return this.set(e.x,e.y,e.z,t)}reorder(e){return bn.setFromEuler(this),this.setFromQuaternion(bn,e)}equals(e){return e._x===this._x&&e._y===this._y&&e._z===this._z&&e._order===this._order}fromArray(e){return this._x=e[0],this._y=e[1],this._z=e[2],e[3]!==void 0&&(this._order=e[3]),this._onChangeCallback(),this}toArray(e=[],t=0){return e[t]=this._x,e[t+1]=this._y,e[t+2]=this._z,e[t+3]=this._order,e}_onChange(e){return this._onChangeCallback=e,this}_onChangeCallback(){}*[Symbol.iterator](){yield this._x,yield this._y,yield this._z,yield this._order}};xn.DEFAULT_ORDER=`XYZ`;var Sn=class{constructor(){this.mask=1}set(e){this.mask=(1<<e|0)>>>0}enable(e){this.mask|=1<<e|0}enableAll(){this.mask=-1}toggle(e){this.mask^=1<<e|0}disable(e){this.mask&=~(1<<e|0)}disableAll(){this.mask=0}test(e){return(this.mask&e.mask)!==0}isEnabled(e){return!!(this.mask&(1<<e|0))}},Cn=0,wn=new Y,Tn=new Bt,En=new dn,Dn=new Y,On=new Y,kn=new Y,An=new Bt,jn=new Y(1,0,0),Mn=new Y(0,1,0),Nn=new Y(0,0,1),Pn={type:`added`},Fn={type:`removed`},In={type:`childadded`,child:null},Ln={type:`childremoved`,child:null},Rn=class e extends ft{constructor(){super(),this.isObject3D=!0,Object.defineProperty(this,"id",{value:Cn++}),this.uuid=_t(),this.name=``,this.type=`Object3D`,this.parent=null,this.children=[],this.up=e.DEFAULT_UP.clone();let t=new Y,n=new xn,r=new Bt,i=new Y(1,1,1);function a(){r.setFromEuler(n,!1)}function o(){n.setFromQuaternion(r,void 0,!1)}n._onChange(a),r._onChange(o),Object.defineProperties(this,{position:{configurable:!0,enumerable:!0,value:t},rotation:{configurable:!0,enumerable:!0,value:n},quaternion:{configurable:!0,enumerable:!0,value:r},scale:{configurable:!0,enumerable:!0,value:i},modelViewMatrix:{value:new dn},normalMatrix:{value:new Ut}}),this.matrix=new dn,this.matrixWorld=new dn,this.matrixAutoUpdate=e.DEFAULT_MATRIX_AUTO_UPDATE,this.matrixWorldAutoUpdate=e.DEFAULT_MATRIX_WORLD_AUTO_UPDATE,this.matrixWorldNeedsUpdate=!1,this.layers=new Sn,this.visible=!0,this.castShadow=!1,this.receiveShadow=!1,this.frustumCulled=!0,this.renderOrder=0,this.animations=[],this.customDepthMaterial=void 0,this.customDistanceMaterial=void 0,this.static=!1,this.userData={},this.pivot=null}onBeforeShadow(){}onAfterShadow(){}onBeforeRender(){}onAfterRender(){}applyMatrix4(e){this.matrixAutoUpdate&&this.updateMatrix(),this.matrix.premultiply(e),this.matrix.decompose(this.position,this.quaternion,this.scale)}applyQuaternion(e){return this.quaternion.premultiply(e),this}setRotationFromAxisAngle(e,t){this.quaternion.setFromAxisAngle(e,t)}setRotationFromEuler(e){this.quaternion.setFromEuler(e,!0)}setRotationFromMatrix(e){this.quaternion.setFromRotationMatrix(e)}setRotationFromQuaternion(e){this.quaternion.copy(e)}rotateOnAxis(e,t){return Tn.setFromAxisAngle(e,t),this.quaternion.multiply(Tn),this}rotateOnWorldAxis(e,t){return Tn.setFromAxisAngle(e,t),this.quaternion.premultiply(Tn),this}rotateX(e){return this.rotateOnAxis(jn,e)}rotateY(e){return this.rotateOnAxis(Mn,e)}rotateZ(e){return this.rotateOnAxis(Nn,e)}translateOnAxis(e,t){return wn.copy(e).applyQuaternion(this.quaternion),this.position.add(wn.multiplyScalar(t)),this}translateX(e){return this.translateOnAxis(jn,e)}translateY(e){return this.translateOnAxis(Mn,e)}translateZ(e){return this.translateOnAxis(Nn,e)}localToWorld(e){return this.updateWorldMatrix(!0,!1),e.applyMatrix4(this.matrixWorld)}worldToLocal(e){return this.updateWorldMatrix(!0,!1),e.applyMatrix4(En.copy(this.matrixWorld).invert())}lookAt(e,t,n){e.isVector3?Dn.copy(e):Dn.set(e,t,n);let r=this.parent;this.updateWorldMatrix(!0,!1),On.setFromMatrixPosition(this.matrixWorld),this.isCamera||this.isLight?En.lookAt(On,Dn,this.up):En.lookAt(Dn,On,this.up),this.quaternion.setFromRotationMatrix(En),r&&(En.extractRotation(r.matrixWorld),Tn.setFromRotationMatrix(En),this.quaternion.premultiply(Tn.invert()))}add(e){if(arguments.length>1){for(let e=0;e<arguments.length;e++)this.add(arguments[e]);return this}return e===this?(q(`Object3D.add: object can't be added as a child of itself.`,e),this):(e&&e.isObject3D?(e.removeFromParent(),e.parent=this,this.children.push(e),e.dispatchEvent(Pn),In.child=e,this.dispatchEvent(In),In.child=null):q(`Object3D.add: object not an instance of THREE.Object3D.`,e),this)}remove(e){if(arguments.length>1){for(let e=0;e<arguments.length;e++)this.remove(arguments[e]);return this}let t=this.children.indexOf(e);return t!==-1&&(e.parent=null,this.children.splice(t,1),e.dispatchEvent(Fn),Ln.child=e,this.dispatchEvent(Ln),Ln.child=null),this}removeFromParent(){let e=this.parent;return e!==null&&e.remove(this),this}clear(){return this.remove(...this.children)}attach(e){return this.updateWorldMatrix(!0,!1),En.copy(this.matrixWorld).invert(),e.parent!==null&&(e.parent.updateWorldMatrix(!0,!1),En.multiply(e.parent.matrixWorld)),e.applyMatrix4(En),e.removeFromParent(),e.parent=this,this.children.push(e),e.updateWorldMatrix(!1,!0),e.dispatchEvent(Pn),In.child=e,this.dispatchEvent(In),In.child=null,this}getObjectById(e){return this.getObjectByProperty(`id`,e)}getObjectByName(e){return this.getObjectByProperty(`name`,e)}getObjectByProperty(e,t){if(this[e]===t)return this;for(let n=0,r=this.children.length;n<r;n++){let r=this.children[n].getObjectByProperty(e,t);if(r!==void 0)return r}}getObjectsByProperty(e,t,n=[]){this[e]===t&&n.push(this);let r=this.children;for(let i=0,a=r.length;i<a;i++)r[i].getObjectsByProperty(e,t,n);return n}getWorldPosition(e){return this.updateWorldMatrix(!0,!1),e.setFromMatrixPosition(this.matrixWorld)}getWorldQuaternion(e){return this.updateWorldMatrix(!0,!1),this.matrixWorld.decompose(On,e,kn),e}getWorldScale(e){return this.updateWorldMatrix(!0,!1),this.matrixWorld.decompose(On,An,e),e}getWorldDirection(e){this.updateWorldMatrix(!0,!1);let t=this.matrixWorld.elements;return e.set(t[8],t[9],t[10]).normalize()}raycast(){}intersectsFrustum(){}traverse(e){e(this);let t=this.children;for(let n=0,r=t.length;n<r;n++)t[n].traverse(e)}traverseVisible(e){if(this.visible===!1)return;e(this);let t=this.children;for(let n=0,r=t.length;n<r;n++)t[n].traverseVisible(e)}traverseAncestors(e){let t=this.parent;t!==null&&(e(t),t.traverseAncestors(e))}updateMatrix(){this.matrix.compose(this.position,this.quaternion,this.scale);let e=this.pivot;if(e!==null){let t=e.x,n=e.y,r=e.z,i=this.matrix.elements;i[12]+=t-i[0]*t-i[4]*n-i[8]*r,i[13]+=n-i[1]*t-i[5]*n-i[9]*r,i[14]+=r-i[2]*t-i[6]*n-i[10]*r}this.matrixWorldNeedsUpdate=!0}updateMatrixWorld(e){this.matrixAutoUpdate&&this.updateMatrix(),(this.matrixWorldNeedsUpdate||e)&&(this.matrixWorldAutoUpdate===!0&&(this.parent===null?this.matrixWorld.copy(this.matrix):this.matrixWorld.multiplyMatrices(this.parent.matrixWorld,this.matrix)),this.matrixWorldNeedsUpdate=!1,e=!0);let t=this.children;for(let n=0,r=t.length;n<r;n++)t[n].updateMatrixWorld(e)}updateWorldMatrix(e,t,n=!1){let r=this.parent;if(e===!0&&r!==null&&r.updateWorldMatrix(!0,!1),this.matrixAutoUpdate&&this.updateMatrix(),(this.matrixWorldNeedsUpdate||n)&&(this.matrixWorldAutoUpdate===!0&&(this.parent===null?this.matrixWorld.copy(this.matrix):this.matrixWorld.multiplyMatrices(this.parent.matrixWorld,this.matrix)),this.matrixWorldNeedsUpdate=!1,n=!0),t===!0){let e=this.children;for(let t=0,r=e.length;t<r;t++)e[t].updateWorldMatrix(!1,!0,n)}}toJSON(e){let t=e===void 0||typeof e==`string`,n={};t&&(e={geometries:{},materials:{},textures:{},images:{},shapes:{},skeletons:{},animations:{},nodes:{}},n.metadata={version:4.7,type:`Object`,generator:`Object3D.toJSON`});let r={};r.uuid=this.uuid,r.type=this.type,r.name=this.name,r.castShadow=this.castShadow,r.receiveShadow=this.receiveShadow,r.visible=this.visible,r.frustumCulled=this.frustumCulled,r.renderOrder=this.renderOrder,r.static=this.static,r.matrixAutoUpdate=this.matrixAutoUpdate,Object.keys(this.userData).length>0&&(r.userData=this.userData),r.layers=this.layers.mask,r.matrix=this.matrix.toArray(),r.up=this.up.toArray(),this.pivot!==null&&(r.pivot=this.pivot.toArray()),this.morphTargetDictionary!==void 0&&(r.morphTargetDictionary=Object.assign({},this.morphTargetDictionary)),this.morphTargetInfluences!==void 0&&(r.morphTargetInfluences=this.morphTargetInfluences.slice()),this.isInstancedMesh&&(r.type=`InstancedMesh`,r.count=this.count,r.instanceMatrix=this.instanceMatrix.toJSON(),this.instanceColor!==null&&(r.instanceColor=this.instanceColor.toJSON())),this.isBatchedMesh&&(r.type=`BatchedMesh`,r.perObjectFrustumCulled=this.perObjectFrustumCulled,r.sortObjects=this.sortObjects,r.drawRanges=this._drawRanges,r.reservedRanges=this._reservedRanges,r.geometryInfo=this._geometryInfo.map(e=>({...e,boundingBox:e.boundingBox?e.boundingBox.toJSON():void 0,boundingSphere:e.boundingSphere?e.boundingSphere.toJSON():void 0})),r.instanceInfo=this._instanceInfo.map(e=>({...e})),r.availableInstanceIds=this._availableInstanceIds.slice(),r.availableGeometryIds=this._availableGeometryIds.slice(),r.nextIndexStart=this._nextIndexStart,r.nextVertexStart=this._nextVertexStart,r.geometryCount=this._geometryCount,r.maxInstanceCount=this._maxInstanceCount,r.maxVertexCount=this._maxVertexCount,r.maxIndexCount=this._maxIndexCount,r.geometryInitialized=this._geometryInitialized,r.matricesTexture=this._matricesTexture.toJSON(e),r.indirectTexture=this._indirectTexture.toJSON(e),this._colorsTexture!==null&&(r.colorsTexture=this._colorsTexture.toJSON(e)),this.boundingSphere!==null&&(r.boundingSphere=this.boundingSphere.toJSON()),this.boundingBox!==null&&(r.boundingBox=this.boundingBox.toJSON()));function i(t,n){return t[n.uuid]===void 0&&(t[n.uuid]=n.toJSON(e)),n.uuid}if(this.isScene)this.background&&(this.background.isColor?r.background=this.background.toJSON():this.background.isTexture&&(r.background=this.background.toJSON(e).uuid)),this.environment&&this.environment.isTexture&&this.environment.isRenderTargetTexture!==!0&&(r.environment=this.environment.toJSON(e).uuid);else if(this.isMesh||this.isLine||this.isPoints){r.geometry=i(e.geometries,this.geometry);let t=this.geometry.parameters;if(t!==void 0&&t.shapes!==void 0){let n=t.shapes;if(Array.isArray(n))for(let t=0,r=n.length;t<r;t++){let r=n[t];i(e.shapes,r)}else i(e.shapes,n)}}if(this.isSkinnedMesh&&(r.bindMode=this.bindMode,r.bindMatrix=this.bindMatrix.toArray(),this.skeleton!==void 0&&(i(e.skeletons,this.skeleton),r.skeleton=this.skeleton.uuid)),this.material!==void 0){if(Array.isArray(this.material)){let t=[];for(let n=0,r=this.material.length;n<r;n++)t.push(i(e.materials,this.material[n]));r.material=t}else r.material=i(e.materials,this.material)}if(this.children.length>0){r.children=[];for(let t=0;t<this.children.length;t++)r.children.push(this.children[t].toJSON(e).object)}if(this.animations.length>0){r.animations=[];for(let t=0;t<this.animations.length;t++){let n=this.animations[t];r.animations.push(i(e.animations,n))}}if(t){let t=a(e.geometries),r=a(e.materials),i=a(e.textures),o=a(e.images),s=a(e.shapes),c=a(e.skeletons),l=a(e.animations),u=a(e.nodes);t.length>0&&(n.geometries=t),r.length>0&&(n.materials=r),i.length>0&&(n.textures=i),o.length>0&&(n.images=o),s.length>0&&(n.shapes=s),c.length>0&&(n.skeletons=c),l.length>0&&(n.animations=l),u.length>0&&(n.nodes=u)}return n.object=r,n;function a(e){let t=[];for(let n in e){let r=e[n];delete r.metadata,t.push(r)}return t}}clone(e){return new this.constructor().copy(this,e)}copy(e,t=!0){if(this.name=e.name,this.up.copy(e.up),this.position.copy(e.position),this.rotation.order=e.rotation.order,this.quaternion.copy(e.quaternion),this.scale.copy(e.scale),this.pivot=e.pivot===null?null:e.pivot.clone(),this.matrix.copy(e.matrix),this.matrixWorld.copy(e.matrixWorld),this.matrixAutoUpdate=e.matrixAutoUpdate,this.matrixWorldAutoUpdate=e.matrixWorldAutoUpdate,this.matrixWorldNeedsUpdate=e.matrixWorldNeedsUpdate,this.layers.mask=e.layers.mask,this.visible=e.visible,this.castShadow=e.castShadow,this.receiveShadow=e.receiveShadow,this.frustumCulled=e.frustumCulled,this.renderOrder=e.renderOrder,this.static=e.static,this.animations=e.animations.slice(),this.userData=JSON.parse(JSON.stringify(e.userData)),t===!0)for(let t=0;t<e.children.length;t++){let n=e.children[t];this.add(n.clone())}return this}dispose(){this.dispatchEvent({type:`dispose`})}};Rn.DEFAULT_UP=new Y(0,1,0),Rn.DEFAULT_MATRIX_AUTO_UPDATE=!0,Rn.DEFAULT_MATRIX_WORLD_AUTO_UPDATE=!0;var zn=class extends Rn{constructor(){super(),this.isGroup=!0,this.type=`Group`}},Bn={type:`move`},Vn=class{constructor(){this._targetRay=null,this._grip=null,this._hand=null}getHandSpace(){return this._hand===null&&(this._hand=new zn,this._hand.matrixAutoUpdate=!1,this._hand.visible=!1,this._hand.joints={},this._hand.inputState={pinching:!1}),this._hand}getTargetRaySpace(){return this._targetRay===null&&(this._targetRay=new zn,this._targetRay.matrixAutoUpdate=!1,this._targetRay.visible=!1,this._targetRay.hasLinearVelocity=!1,this._targetRay.linearVelocity=new Y,this._targetRay.hasAngularVelocity=!1,this._targetRay.angularVelocity=new Y),this._targetRay}getGripSpace(){return this._grip===null&&(this._grip=new zn,this._grip.matrixAutoUpdate=!1,this._grip.visible=!1,this._grip.hasLinearVelocity=!1,this._grip.linearVelocity=new Y,this._grip.hasAngularVelocity=!1,this._grip.angularVelocity=new Y,this._grip.eventsEnabled=!1),this._grip}dispatchEvent(e){return this._targetRay!==null&&this._targetRay.dispatchEvent(e),this._grip!==null&&this._grip.dispatchEvent(e),this._hand!==null&&this._hand.dispatchEvent(e),this}connect(e){if(e&&e.hand){let t=this._hand;if(t)for(let n of e.hand.values())this._getHandJoint(t,n)}return this.dispatchEvent({type:`connected`,data:e}),this}disconnect(e){return this.dispatchEvent({type:`disconnected`,data:e}),this._targetRay!==null&&(this._targetRay.visible=!1),this._grip!==null&&(this._grip.visible=!1),this._hand!==null&&(this._hand.visible=!1),this}update(e,t,n){let r=null,i=null,a=null,o=this._targetRay,s=this._grip,c=this._hand;if(e&&t.session.visibilityState!==`visible-blurred`){if(c&&e.hand){a=!0;for(let r of e.hand.values()){let e=t.getJointPose(r,n),i=this._getHandJoint(c,r);e!==null&&(i.matrix.fromArray(e.transform.matrix),i.matrix.decompose(i.position,i.rotation,i.scale),i.matrixWorldNeedsUpdate=!0,i.jointRadius=e.radius),i.visible=e!==null}let r=c.joints[`index-finger-tip`],i=c.joints[`thumb-tip`],o=r.position.distanceTo(i.position);c.inputState.pinching&&o>.025?(c.inputState.pinching=!1,this.dispatchEvent({type:`pinchend`,handedness:e.handedness,target:this})):!c.inputState.pinching&&o<=.015&&(c.inputState.pinching=!0,this.dispatchEvent({type:`pinchstart`,handedness:e.handedness,target:this}))}else s!==null&&e.gripSpace&&(i=t.getPose(e.gripSpace,n),i!==null&&(s.matrix.fromArray(i.transform.matrix),s.matrix.decompose(s.position,s.rotation,s.scale),s.matrixWorldNeedsUpdate=!0,i.linearVelocity?(s.hasLinearVelocity=!0,s.linearVelocity.copy(i.linearVelocity)):s.hasLinearVelocity=!1,i.angularVelocity?(s.hasAngularVelocity=!0,s.angularVelocity.copy(i.angularVelocity)):s.hasAngularVelocity=!1,s.eventsEnabled&&s.dispatchEvent({type:`gripUpdated`,data:e,target:this})));o!==null&&(r=t.getPose(e.targetRaySpace,n),r===null&&i!==null&&(r=i),r!==null&&(o.matrix.fromArray(r.transform.matrix),o.matrix.decompose(o.position,o.rotation,o.scale),o.matrixWorldNeedsUpdate=!0,r.linearVelocity?(o.hasLinearVelocity=!0,o.linearVelocity.copy(r.linearVelocity)):o.hasLinearVelocity=!1,r.angularVelocity?(o.hasAngularVelocity=!0,o.angularVelocity.copy(r.angularVelocity)):o.hasAngularVelocity=!1,this.dispatchEvent(Bn)))}return o!==null&&(o.visible=r!==null),s!==null&&(s.visible=i!==null),c!==null&&(c.visible=a!==null),this}_getHandJoint(e,t){if(e.joints[t.jointName]===void 0){let n=new zn;n.matrixAutoUpdate=!1,n.visible=!1,e.joints[t.jointName]=n,e.add(n)}return e.joints[t.jointName]}},Hn={aliceblue:15792383,antiquewhite:16444375,aqua:65535,aquamarine:8388564,azure:15794175,beige:16119260,bisque:16770244,black:0,blanchedalmond:16772045,blue:255,blueviolet:9055202,brown:10824234,burlywood:14596231,cadetblue:6266528,chartreuse:8388352,chocolate:13789470,coral:16744272,cornflowerblue:6591981,cornsilk:16775388,crimson:14423100,cyan:65535,darkblue:139,darkcyan:35723,darkgoldenrod:12092939,darkgray:11119017,darkgreen:25600,darkgrey:11119017,darkkhaki:12433259,darkmagenta:9109643,darkolivegreen:5597999,darkorange:16747520,darkorchid:10040012,darkred:9109504,darksalmon:15308410,darkseagreen:9419919,darkslateblue:4734347,darkslategray:3100495,darkslategrey:3100495,darkturquoise:52945,darkviolet:9699539,deeppink:16716947,deepskyblue:49151,dimgray:6908265,dimgrey:6908265,dodgerblue:2003199,firebrick:11674146,floralwhite:16775920,forestgreen:2263842,fuchsia:16711935,gainsboro:14474460,ghostwhite:16316671,gold:16766720,goldenrod:14329120,gray:8421504,green:32768,greenyellow:11403055,grey:8421504,honeydew:15794160,hotpink:16738740,indianred:13458524,indigo:4915330,ivory:16777200,khaki:15787660,lavender:15132410,lavenderblush:16773365,lawngreen:8190976,lemonchiffon:16775885,lightblue:11393254,lightcoral:15761536,lightcyan:14745599,lightgoldenrodyellow:16448210,lightgray:13882323,lightgreen:9498256,lightgrey:13882323,lightpink:16758465,lightsalmon:16752762,lightseagreen:2142890,lightskyblue:8900346,lightslategray:7833753,lightslategrey:7833753,lightsteelblue:11584734,lightyellow:16777184,lime:65280,limegreen:3329330,linen:16445670,magenta:16711935,maroon:8388608,mediumaquamarine:6737322,mediumblue:205,mediumorchid:12211667,mediumpurple:9662683,mediumseagreen:3978097,mediumslateblue:8087790,mediumspringgreen:64154,mediumturquoise:4772300,mediumvioletred:13047173,midnightblue:1644912,mintcream:16121850,mistyrose:16770273,moccasin:16770229,navajowhite:16768685,navy:128,oldlace:16643558,olive:8421376,olivedrab:7048739,orange:16753920,orangered:16729344,orchid:14315734,palegoldenrod:15657130,palegreen:10025880,paleturquoise:11529966,palevioletred:14381203,papayawhip:16773077,peachpuff:16767673,peru:13468991,pink:16761035,plum:14524637,powderblue:11591910,purple:8388736,rebeccapurple:6697881,red:16711680,rosybrown:12357519,royalblue:4286945,saddlebrown:9127187,salmon:16416882,sandybrown:16032864,seagreen:3050327,seashell:16774638,sienna:10506797,silver:12632256,skyblue:8900331,slateblue:6970061,slategray:7372944,slategrey:7372944,snow:16775930,springgreen:65407,steelblue:4620980,tan:13808780,teal:32896,thistle:14204888,tomato:16737095,turquoise:4251856,violet:15631086,wheat:16113331,white:16777215,whitesmoke:16119285,yellow:16776960,yellowgreen:10145074},Un={h:0,s:0,l:0},Wn={h:0,s:0,l:0};function Gn(e,t,n){return n<0&&(n+=1),n>1&&--n,n<1/6?e+(t-e)*6*n:n<1/2?t:n<2/3?e+(t-e)*6*(2/3-n):e}var X=class{constructor(e,t,n){return this.isColor=!0,this.r=1,this.g=1,this.b=1,this.set(e,t,n)}set(e,t,n){if(t===void 0&&n===void 0){let t=e;t&&t.isColor?this.copy(t):typeof t==`number`?this.setHex(t):typeof t==`string`&&this.setStyle(t)}else this.setRGB(e,t,n);return this}setScalar(e){return this.r=e,this.g=e,this.b=e,this}setHex(e,t=Ye){return e=Math.floor(e),this.r=(e>>16&255)/255,this.g=(e>>8&255)/255,this.b=(e&255)/255,Jt.colorSpaceToWorking(this,t),this}setRGB(e,t,n,r=Jt.workingColorSpace){return this.r=e,this.g=t,this.b=n,Jt.colorSpaceToWorking(this,r),this}setHSL(e,t,n,r=Jt.workingColorSpace){if(e=yt(e,1),t=vt(t,0,1),n=vt(n,0,1),t===0)this.r=this.g=this.b=n;else{let r=n<=.5?n*(1+t):n+t-n*t,i=2*n-r;this.r=Gn(i,r,e+1/3),this.g=Gn(i,r,e),this.b=Gn(i,r,e-1/3)}return Jt.colorSpaceToWorking(this,r),this}setStyle(e,t=Ye){function n(t){t!==void 0&&parseFloat(t)<1&&K(`Color: Alpha component of `+e+` will be ignored.`)}let r;if(r=/^(\w+)\(([^\)]*)\)/.exec(e)){let i,a=r[1],o=r[2];switch(a){case`rgb`:case`rgba`:if(i=/^\s*(\d+)\s*,\s*(\d+)\s*,\s*(\d+)\s*(?:,\s*(\d*\.?\d+)\s*)?$/.exec(o))return n(i[4]),this.setRGB(Math.min(255,parseInt(i[1],10))/255,Math.min(255,parseInt(i[2],10))/255,Math.min(255,parseInt(i[3],10))/255,t);if(i=/^\s*(\d+)\%\s*,\s*(\d+)\%\s*,\s*(\d+)\%\s*(?:,\s*(\d*\.?\d+)\s*)?$/.exec(o))return n(i[4]),this.setRGB(Math.min(100,parseInt(i[1],10))/100,Math.min(100,parseInt(i[2],10))/100,Math.min(100,parseInt(i[3],10))/100,t);break;case`hsl`:case`hsla`:if(i=/^\s*(\d*\.?\d+)\s*,\s*(\d*\.?\d+)\%\s*,\s*(\d*\.?\d+)\%\s*(?:,\s*(\d*\.?\d+)\s*)?$/.exec(o))return n(i[4]),this.setHSL(parseFloat(i[1])/360,parseFloat(i[2])/100,parseFloat(i[3])/100,t);break;default:K(`Color: Unknown color model `+e)}}else if(r=/^\#([A-Fa-f\d]+)$/.exec(e)){let n=r[1],i=n.length;if(i===3)return this.setRGB(parseInt(n.charAt(0),16)/15,parseInt(n.charAt(1),16)/15,parseInt(n.charAt(2),16)/15,t);if(i===6)return this.setHex(parseInt(n,16),t);K(`Color: Invalid hex color `+e)}else if(e&&e.length>0)return this.setColorName(e,t);return this}setColorName(e,t=Ye){let n=Hn[e.toLowerCase()];return n===void 0?K(`Color: Unknown color `+e):this.setHex(n,t),this}clone(){return new this.constructor(this.r,this.g,this.b)}copy(e){return this.r=e.r,this.g=e.g,this.b=e.b,this}copySRGBToLinear(e){return this.r=Yt(e.r),this.g=Yt(e.g),this.b=Yt(e.b),this}copyLinearToSRGB(e){return this.r=Xt(e.r),this.g=Xt(e.g),this.b=Xt(e.b),this}convertSRGBToLinear(){return this.copySRGBToLinear(this),this}convertLinearToSRGB(){return this.copyLinearToSRGB(this),this}getHex(e=Ye){return Jt.workingToColorSpace(Kn.copy(this),e),Math.round(vt(Kn.r*255,0,255))*65536+Math.round(vt(Kn.g*255,0,255))*256+Math.round(vt(Kn.b*255,0,255))}getHexString(e=Ye){return(`000000`+this.getHex(e).toString(16)).slice(-6)}getHSL(e,t=Jt.workingColorSpace){Jt.workingToColorSpace(Kn.copy(this),t);let n=Kn.r,r=Kn.g,i=Kn.b,a=Math.max(n,r,i),o=Math.min(n,r,i),s,c,l=(o+a)/2;if(o===a)s=0,c=0;else{let e=a-o;switch(c=l<=.5?e/(a+o):e/(2-a-o),a){case n:s=(r-i)/e+(r<i?6:0);break;case r:s=(i-n)/e+2;break;case i:s=(n-r)/e+4}s/=6}return e.h=s,e.s=c,e.l=l,e}getRGB(e,t=Jt.workingColorSpace){return Jt.workingToColorSpace(Kn.copy(this),t),e.r=Kn.r,e.g=Kn.g,e.b=Kn.b,e}getStyle(e=Ye){Jt.workingToColorSpace(Kn.copy(this),e);let t=Kn.r,n=Kn.g,r=Kn.b;return e===`srgb`?`rgb(${Math.round(t*255)},${Math.round(n*255)},${Math.round(r*255)})`:`color(${e} ${t.toFixed(3)} ${n.toFixed(3)} ${r.toFixed(3)})`}offsetHSL(e,t,n){return this.getHSL(Un),this.setHSL(Un.h+e,Un.s+t,Un.l+n)}add(e){return this.r+=e.r,this.g+=e.g,this.b+=e.b,this}addColors(e,t){return this.r=e.r+t.r,this.g=e.g+t.g,this.b=e.b+t.b,this}addScalar(e){return this.r+=e,this.g+=e,this.b+=e,this}sub(e){return this.r=Math.max(0,this.r-e.r),this.g=Math.max(0,this.g-e.g),this.b=Math.max(0,this.b-e.b),this}multiply(e){return this.r*=e.r,this.g*=e.g,this.b*=e.b,this}multiplyScalar(e){return this.r*=e,this.g*=e,this.b*=e,this}lerp(e,t){return this.r+=(e.r-this.r)*t,this.g+=(e.g-this.g)*t,this.b+=(e.b-this.b)*t,this}lerpColors(e,t,n){return this.r=e.r+(t.r-e.r)*n,this.g=e.g+(t.g-e.g)*n,this.b=e.b+(t.b-e.b)*n,this}lerpHSL(e,t){this.getHSL(Un),e.getHSL(Wn);let n=St(Un.h,Wn.h,t),r=St(Un.s,Wn.s,t),i=St(Un.l,Wn.l,t);return this.setHSL(n,r,i),this}setFromVector3(e){return this.r=e.x,this.g=e.y,this.b=e.z,this}applyMatrix3(e){let t=this.r,n=this.g,r=this.b,i=e.elements;return this.r=i[0]*t+i[3]*n+i[6]*r,this.g=i[1]*t+i[4]*n+i[7]*r,this.b=i[2]*t+i[5]*n+i[8]*r,this}equals(e){return e.r===this.r&&e.g===this.g&&e.b===this.b}fromArray(e,t=0){return this.r=e[t],this.g=e[t+1],this.b=e[t+2],this}toArray(e=[],t=0){return e[t]=this.r,e[t+1]=this.g,e[t+2]=this.b,e}fromBufferAttribute(e,t){return this.r=e.getX(t),this.g=e.getY(t),this.b=e.getZ(t),this}toJSON(){return this.getHex()}*[Symbol.iterator](){yield this.r,yield this.g,yield this.b}},Kn=new X;X.NAMES=Hn;var qn=class extends Rn{constructor(){super(),this.isScene=!0,this.type=`Scene`,this.background=null,this.environment=null,this.fog=null,this.backgroundBlurriness=0,this.backgroundIntensity=1,this.backgroundRotation=new xn,this.environmentIntensity=1,this.environmentRotation=new xn,this.overrideMaterial=null,typeof __THREE_DEVTOOLS__<`u`&&__THREE_DEVTOOLS__.dispatchEvent(new CustomEvent(`observe`,{detail:this}))}copy(e,t){return super.copy(e,t),e.background!==null&&(this.background=e.background.clone()),e.environment!==null&&(this.environment=e.environment.clone()),e.fog!==null&&(this.fog=e.fog.clone()),this.backgroundBlurriness=e.backgroundBlurriness,this.backgroundIntensity=e.backgroundIntensity,this.backgroundRotation.copy(e.backgroundRotation),this.environmentIntensity=e.environmentIntensity,this.environmentRotation.copy(e.environmentRotation),e.overrideMaterial!==null&&(this.overrideMaterial=e.overrideMaterial.clone()),this.matrixAutoUpdate=e.matrixAutoUpdate,this}toJSON(e){let t=super.toJSON(e);return this.fog!==null&&(t.object.fog=this.fog.toJSON()),t.object.backgroundBlurriness=this.backgroundBlurriness,t.object.backgroundIntensity=this.backgroundIntensity,t.object.backgroundRotation=this.backgroundRotation.toArray(),t.object.environmentIntensity=this.environmentIntensity,t.object.environmentRotation=this.environmentRotation.toArray(),t}},Jn=new Y,Yn=new Y,Xn=new Y,Zn=new Y,Qn=new Y,$n=new Y,er=new Y,tr=new Y,nr=new Y,rr=new Y,ir=new on,ar=new on,or=new on,sr=class e{constructor(e=new Y,t=new Y,n=new Y){this.a=e,this.b=t,this.c=n}static getNormal(e,t,n,r){r.subVectors(n,t),Jn.subVectors(e,t),r.cross(Jn);let i=r.lengthSq();return i>0?r.multiplyScalar(1/Math.sqrt(i)):r.set(0,0,0)}static getBarycoord(e,t,n,r,i){Jn.subVectors(r,t),Yn.subVectors(n,t),Xn.subVectors(e,t);let a=Jn.dot(Jn),o=Jn.dot(Yn),s=Jn.dot(Xn),c=Yn.dot(Yn),l=Yn.dot(Xn),u=a*c-o*o;if(u===0)return i.set(0,0,0),null;let d=1/u,f=(c*s-o*l)*d,p=(a*l-o*s)*d;return i.set(1-f-p,p,f)}static containsPoint(e,t,n,r){return this.getBarycoord(e,t,n,r,Zn)!==null&&Zn.x>=0&&Zn.y>=0&&Zn.x+Zn.y<=1}static getInterpolation(e,t,n,r,i,a,o,s){return this.getBarycoord(e,t,n,r,Zn)===null?(s.x=0,s.y=0,`z`in s&&(s.z=0),`w`in s&&(s.w=0),null):(s.setScalar(0),s.addScaledVector(i,Zn.x),s.addScaledVector(a,Zn.y),s.addScaledVector(o,Zn.z),s)}static getInterpolatedAttribute(e,t,n,r,i,a){return ir.setScalar(0),ar.setScalar(0),or.setScalar(0),ir.fromBufferAttribute(e,t),ar.fromBufferAttribute(e,n),or.fromBufferAttribute(e,r),a.setScalar(0),a.addScaledVector(ir,i.x),a.addScaledVector(ar,i.y),a.addScaledVector(or,i.z),a}static isFrontFacing(e,t,n,r){return Jn.subVectors(n,t),Yn.subVectors(e,t),Jn.cross(Yn).dot(r)<0}set(e,t,n){return this.a.copy(e),this.b.copy(t),this.c.copy(n),this}setFromPointsAndIndices(e,t,n,r){return this.a.copy(e[t]),this.b.copy(e[n]),this.c.copy(e[r]),this}setFromAttributeAndIndices(e,t,n,r){return this.a.fromBufferAttribute(e,t),this.b.fromBufferAttribute(e,n),this.c.fromBufferAttribute(e,r),this}clone(){return new this.constructor().copy(this)}copy(e){return this.a.copy(e.a),this.b.copy(e.b),this.c.copy(e.c),this}getArea(){return Jn.subVectors(this.c,this.b),Yn.subVectors(this.a,this.b),Jn.cross(Yn).length()*.5}getMidpoint(e){return e.addVectors(this.a,this.b).add(this.c).multiplyScalar(1/3)}getNormal(t){return e.getNormal(this.a,this.b,this.c,t)}getPlane(e){return e.setFromCoplanarPoints(this.a,this.b,this.c)}getBarycoord(t,n){return e.getBarycoord(t,this.a,this.b,this.c,n)}getInterpolation(t,n,r,i,a){return e.getInterpolation(t,this.a,this.b,this.c,n,r,i,a)}containsPoint(t){return e.containsPoint(t,this.a,this.b,this.c)}isFrontFacing(t){return e.isFrontFacing(this.a,this.b,this.c,t)}intersectsBox(e){return e.intersectsTriangle(this)}closestPointToPoint(e,t){let n=this.a,r=this.b,i=this.c,a,o;Qn.subVectors(r,n),$n.subVectors(i,n),tr.subVectors(e,n);let s=Qn.dot(tr),c=$n.dot(tr);if(s<=0&&c<=0)return t.copy(n);nr.subVectors(e,r);let l=Qn.dot(nr),u=$n.dot(nr);if(l>=0&&u<=l)return t.copy(r);let d=s*u-l*c;if(d<=0&&s>=0&&l<=0)return a=s/(s-l),t.copy(n).addScaledVector(Qn,a);rr.subVectors(e,i);let f=Qn.dot(rr),p=$n.dot(rr);if(p>=0&&f<=p)return t.copy(i);let m=f*c-s*p;if(m<=0&&c>=0&&p<=0)return o=c/(c-p),t.copy(n).addScaledVector($n,o);let h=l*p-f*u;if(h<=0&&u-l>=0&&f-p>=0)return er.subVectors(i,r),o=(u-l)/(u-l+(f-p)),t.copy(r).addScaledVector(er,o);let g=1/(h+m+d);return a=m*g,o=d*g,t.copy(n).addScaledVector(Qn,a).addScaledVector($n,o)}equals(e){return e.a.equals(this.a)&&e.b.equals(this.b)&&e.c.equals(this.c)}},cr=class{constructor(e=new Y(1/0,1/0,1/0),t=new Y(-1/0,-1/0,-1/0)){this.isBox3=!0,this.min=e,this.max=t}set(e,t){return this.min.copy(e),this.max.copy(t),this}setFromArray(e){this.makeEmpty();for(let t=0,n=e.length;t<n;t+=3)this.expandByPoint(ur.fromArray(e,t));return this}setFromBufferAttribute(e){this.makeEmpty();for(let t=0,n=e.count;t<n;t++)this.expandByPoint(ur.fromBufferAttribute(e,t));return this}setFromPoints(e){this.makeEmpty();for(let t=0,n=e.length;t<n;t++)this.expandByPoint(e[t]);return this}setFromCenterAndSize(e,t){let n=ur.copy(t).multiplyScalar(.5);return this.min.copy(e).sub(n),this.max.copy(e).add(n),this}setFromObject(e,t=!1){return this.makeEmpty(),this.expandByObject(e,t)}clone(){return new this.constructor().copy(this)}copy(e){return this.min.copy(e.min),this.max.copy(e.max),this}makeEmpty(){return this.min.x=this.min.y=this.min.z=1/0,this.max.x=this.max.y=this.max.z=-1/0,this}isEmpty(){return this.max.x<this.min.x||this.max.y<this.min.y||this.max.z<this.min.z}getCenter(e){return this.isEmpty()?e.set(0,0,0):e.addVectors(this.min,this.max).multiplyScalar(.5)}getSize(e){return this.isEmpty()?e.set(0,0,0):e.subVectors(this.max,this.min)}expandByPoint(e){return this.min.min(e),this.max.max(e),this}expandByVector(e){return this.min.sub(e),this.max.add(e),this}expandByScalar(e){return this.min.addScalar(-e),this.max.addScalar(e),this}expandByObject(e,t=!1){e.updateWorldMatrix(!1,!1);let n=e.geometry;if(n!==void 0){let r=n.getAttribute(`position`);if(t===!0&&r!==void 0&&e.isInstancedMesh!==!0)for(let t=0,n=r.count;t<n;t++)e.isMesh===!0?e.getVertexPosition(t,ur):ur.fromBufferAttribute(r,t),ur.applyMatrix4(e.matrixWorld),this.expandByPoint(ur);else e.boundingBox===void 0?(n.boundingBox===null&&n.computeBoundingBox(),dr.copy(n.boundingBox)):(e.boundingBox===null&&e.computeBoundingBox(),dr.copy(e.boundingBox)),dr.applyMatrix4(e.matrixWorld),this.union(dr)}let r=e.children;for(let e=0,n=r.length;e<n;e++)this.expandByObject(r[e],t);return this}containsPoint(e){return e.x>=this.min.x&&e.x<=this.max.x&&e.y>=this.min.y&&e.y<=this.max.y&&e.z>=this.min.z&&e.z<=this.max.z}containsBox(e){return this.min.x<=e.min.x&&e.max.x<=this.max.x&&this.min.y<=e.min.y&&e.max.y<=this.max.y&&this.min.z<=e.min.z&&e.max.z<=this.max.z}getParameter(e,t){return t.set((e.x-this.min.x)/(this.max.x-this.min.x),(e.y-this.min.y)/(this.max.y-this.min.y),(e.z-this.min.z)/(this.max.z-this.min.z))}intersectsBox(e){return e.max.x>=this.min.x&&e.min.x<=this.max.x&&e.max.y>=this.min.y&&e.min.y<=this.max.y&&e.max.z>=this.min.z&&e.min.z<=this.max.z}intersectsSphere(e){return this.clampPoint(e.center,ur),ur.distanceToSquared(e.center)<=e.radius*e.radius}intersectsPlane(e){let t,n;return e.normal.x>0?(t=e.normal.x*this.min.x,n=e.normal.x*this.max.x):(t=e.normal.x*this.max.x,n=e.normal.x*this.min.x),e.normal.y>0?(t+=e.normal.y*this.min.y,n+=e.normal.y*this.max.y):(t+=e.normal.y*this.max.y,n+=e.normal.y*this.min.y),e.normal.z>0?(t+=e.normal.z*this.min.z,n+=e.normal.z*this.max.z):(t+=e.normal.z*this.max.z,n+=e.normal.z*this.min.z),t<=-e.constant&&n>=-e.constant}intersectsTriangle(e){if(this.isEmpty())return!1;this.getCenter(vr),yr.subVectors(this.max,vr),fr.subVectors(e.a,vr),pr.subVectors(e.b,vr),mr.subVectors(e.c,vr),hr.subVectors(pr,fr),gr.subVectors(mr,pr),_r.subVectors(fr,mr);let t=[0,-hr.z,hr.y,0,-gr.z,gr.y,0,-_r.z,_r.y,hr.z,0,-hr.x,gr.z,0,-gr.x,_r.z,0,-_r.x,-hr.y,hr.x,0,-gr.y,gr.x,0,-_r.y,_r.x,0];return!Sr(t,fr,pr,mr,yr)||(t=[1,0,0,0,1,0,0,0,1],!Sr(t,fr,pr,mr,yr))?!1:(br.crossVectors(hr,gr),t=[br.x,br.y,br.z],Sr(t,fr,pr,mr,yr))}clampPoint(e,t){return t.copy(e).clamp(this.min,this.max)}distanceToPoint(e){return this.clampPoint(e,ur).distanceTo(e)}getBoundingSphere(e){return this.isEmpty()?e.makeEmpty():(this.getCenter(e.center),e.radius=this.getSize(ur).length()*.5),e}intersect(e){return this.min.max(e.min),this.max.min(e.max),this.isEmpty()&&this.makeEmpty(),this}union(e){return this.min.min(e.min),this.max.max(e.max),this}applyMatrix4(e){return this.isEmpty()?this:(lr[0].set(this.min.x,this.min.y,this.min.z).applyMatrix4(e),lr[1].set(this.min.x,this.min.y,this.max.z).applyMatrix4(e),lr[2].set(this.min.x,this.max.y,this.min.z).applyMatrix4(e),lr[3].set(this.min.x,this.max.y,this.max.z).applyMatrix4(e),lr[4].set(this.max.x,this.min.y,this.min.z).applyMatrix4(e),lr[5].set(this.max.x,this.min.y,this.max.z).applyMatrix4(e),lr[6].set(this.max.x,this.max.y,this.min.z).applyMatrix4(e),lr[7].set(this.max.x,this.max.y,this.max.z).applyMatrix4(e),this.setFromPoints(lr),this)}translate(e){return this.min.add(e),this.max.add(e),this}equals(e){return e.min.equals(this.min)&&e.max.equals(this.max)}toJSON(){return{min:this.min.toArray(),max:this.max.toArray()}}fromJSON(e){return this.min.fromArray(e.min),this.max.fromArray(e.max),this}},lr=[new Y,new Y,new Y,new Y,new Y,new Y,new Y,new Y],ur=new Y,dr=new cr,fr=new Y,pr=new Y,mr=new Y,hr=new Y,gr=new Y,_r=new Y,vr=new Y,yr=new Y,br=new Y,xr=new Y;function Sr(e,t,n,r,i){for(let a=0,o=e.length-3;a<=o;a+=3){xr.fromArray(e,a);let o=i.x*Math.abs(xr.x)+i.y*Math.abs(xr.y)+i.z*Math.abs(xr.z),s=t.dot(xr),c=n.dot(xr),l=r.dot(xr);if(Math.max(-Math.max(s,c,l),Math.min(s,c,l))>o)return!1}return!0}var Cr=new Y,wr=new J,Tr=0,Er=class extends ft{constructor(e,t,n=!1){if(super(),Array.isArray(e))throw TypeError(`THREE.BufferAttribute: array should be a Typed Array.`);this.isBufferAttribute=!0,Object.defineProperty(this,"id",{value:Tr++}),this.name=``,this.array=e,this.itemSize=t,this.count=e===void 0?0:e.length/t,this.normalized=n,this.usage=et,this.updateRanges=[],this.gpuType=P,this.version=0}onUploadCallback(){}set needsUpdate(e){e===!0&&this.version++}setUsage(e){return this.usage=e,this}addUpdateRange(e,t){this.updateRanges.push({start:e,count:t})}clearUpdateRanges(){this.updateRanges.length=0}copy(e){return this.name=e.name,this.array=new e.array.constructor(e.array),this.itemSize=e.itemSize,this.count=e.count,this.normalized=e.normalized,this.usage=e.usage,this.gpuType=e.gpuType,this}copyAt(e,t,n){e*=this.itemSize,n*=t.itemSize;for(let r=0,i=this.itemSize;r<i;r++)this.array[e+r]=t.array[n+r];return this}copyArray(e){return this.array.set(e),this}applyMatrix3(e){if(this.itemSize===2)for(let t=0,n=this.count;t<n;t++)wr.fromBufferAttribute(this,t),wr.applyMatrix3(e),this.setXY(t,wr.x,wr.y);else if(this.itemSize===3)for(let t=0,n=this.count;t<n;t++)Cr.fromBufferAttribute(this,t),Cr.applyMatrix3(e),this.setXYZ(t,Cr.x,Cr.y,Cr.z);return this}applyMatrix4(e){for(let t=0,n=this.count;t<n;t++)Cr.fromBufferAttribute(this,t),Cr.applyMatrix4(e),this.setXYZ(t,Cr.x,Cr.y,Cr.z);return this}applyNormalMatrix(e){for(let t=0,n=this.count;t<n;t++)Cr.fromBufferAttribute(this,t),Cr.applyNormalMatrix(e),this.setXYZ(t,Cr.x,Cr.y,Cr.z);return this}transformDirection(e){for(let t=0,n=this.count;t<n;t++)Cr.fromBufferAttribute(this,t),Cr.transformDirection(e),this.setXYZ(t,Cr.x,Cr.y,Cr.z);return this}set(e,t=0){return this.array.set(e,t),this}getComponent(e,t){let n=this.array[e*this.itemSize+t];return this.normalized&&(n=Lt(n,this.array)),n}setComponent(e,t,n){return this.normalized&&(n=Rt(n,this.array)),this.array[e*this.itemSize+t]=n,this}getX(e){let t=this.array[e*this.itemSize];return this.normalized&&(t=Lt(t,this.array)),t}setX(e,t){return this.normalized&&(t=Rt(t,this.array)),this.array[e*this.itemSize]=t,this}getY(e){let t=this.array[e*this.itemSize+1];return this.normalized&&(t=Lt(t,this.array)),t}setY(e,t){return this.normalized&&(t=Rt(t,this.array)),this.array[e*this.itemSize+1]=t,this}getZ(e){let t=this.array[e*this.itemSize+2];return this.normalized&&(t=Lt(t,this.array)),t}setZ(e,t){return this.normalized&&(t=Rt(t,this.array)),this.array[e*this.itemSize+2]=t,this}getW(e){let t=this.array[e*this.itemSize+3];return this.normalized&&(t=Lt(t,this.array)),t}setW(e,t){return this.normalized&&(t=Rt(t,this.array)),this.array[e*this.itemSize+3]=t,this}setXY(e,t,n){return e*=this.itemSize,this.normalized&&(t=Rt(t,this.array),n=Rt(n,this.array)),this.array[e+0]=t,this.array[e+1]=n,this}setXYZ(e,t,n,r){return e*=this.itemSize,this.normalized&&(t=Rt(t,this.array),n=Rt(n,this.array),r=Rt(r,this.array)),this.array[e+0]=t,this.array[e+1]=n,this.array[e+2]=r,this}setXYZW(e,t,n,r,i){return e*=this.itemSize,this.normalized&&(t=Rt(t,this.array),n=Rt(n,this.array),r=Rt(r,this.array),i=Rt(i,this.array)),this.array[e+0]=t,this.array[e+1]=n,this.array[e+2]=r,this.array[e+3]=i,this}onUpload(e){return this.onUploadCallback=e,this}clone(){return new this.constructor(this.array,this.itemSize).copy(this)}toJSON(){let e={itemSize:this.itemSize,type:this.array.constructor.name,array:Array.from(this.array),normalized:this.normalized};return e.name=this.name,e.usage=this.usage,e.gpuType=this.gpuType,e}dispose(){this.dispatchEvent({type:`dispose`})}},Dr=class extends Er{constructor(e,t,n){super(new Uint16Array(e),t,n)}},Or=class extends Er{constructor(e,t,n){super(new Uint32Array(e),t,n)}},kr=class extends Er{constructor(e,t,n){super(new Float32Array(e),t,n)}},Ar=new cr,jr=new Y,Mr=new Y,Nr=class{constructor(e=new Y,t=-1){this.isSphere=!0,this.center=e,this.radius=t}set(e,t){return this.center.copy(e),this.radius=t,this}setFromPoints(e,t){let n=this.center;t===void 0?Ar.setFromPoints(e).getCenter(n):n.copy(t);let r=0;for(let t=0,i=e.length;t<i;t++)r=Math.max(r,n.distanceToSquared(e[t]));return this.radius=Math.sqrt(r),this}copy(e){return this.center.copy(e.center),this.radius=e.radius,this}isEmpty(){return this.radius<0}makeEmpty(){return this.center.set(0,0,0),this.radius=-1,this}containsPoint(e){return e.distanceToSquared(this.center)<=this.radius*this.radius}distanceToPoint(e){return e.distanceTo(this.center)-this.radius}intersectsSphere(e){let t=this.radius+e.radius;return e.center.distanceToSquared(this.center)<=t*t}intersectsBox(e){return e.intersectsSphere(this)}intersectsPlane(e){return Math.abs(e.distanceToPoint(this.center))<=this.radius}clampPoint(e,t){let n=this.center.distanceToSquared(e);return t.copy(e),n>this.radius*this.radius&&(t.sub(this.center).normalize(),t.multiplyScalar(this.radius).add(this.center)),t}getBoundingBox(e){return this.isEmpty()?(e.makeEmpty(),e):(e.set(this.center,this.center),e.expandByScalar(this.radius),e)}applyMatrix4(e){return this.center.applyMatrix4(e),this.radius*=e.getMaxScaleOnAxis(),this}translate(e){return this.center.add(e),this}expandByPoint(e){if(this.isEmpty())return this.center.copy(e),this.radius=0,this;jr.subVectors(e,this.center);let t=jr.lengthSq();if(t>this.radius*this.radius){let e=Math.sqrt(t),n=(e-this.radius)*.5;this.center.addScaledVector(jr,n/e),this.radius+=n}return this}union(e){return e.isEmpty()?this:this.isEmpty()?(this.copy(e),this):(this.center.equals(e.center)===!0?this.radius=Math.max(this.radius,e.radius):(Mr.subVectors(e.center,this.center).setLength(e.radius),this.expandByPoint(jr.copy(e.center).add(Mr)),this.expandByPoint(jr.copy(e.center).sub(Mr))),this)}equals(e){return e.center.equals(this.center)&&e.radius===this.radius}clone(){return new this.constructor().copy(this)}toJSON(){return{radius:this.radius,center:this.center.toArray()}}fromJSON(e){return this.radius=e.radius,this.center.fromArray(e.center),this}},Pr=0,Fr=new dn,Ir=new Rn,Lr=new Y,Rr=new cr,zr=new cr,Br=new Y,Vr=class e extends ft{constructor(){super(),this.isBufferGeometry=!0,Object.defineProperty(this,"id",{value:Pr++}),this.uuid=_t(),this.name=``,this.type=`BufferGeometry`,this.index=null,this.indirect=null,this.indirectOffset=0,this.attributes={},this.morphAttributes={},this.morphTargetsRelative=!1,this.groups=[],this.boundingBox=null,this.boundingSphere=null,this.drawRange={start:0,count:1/0},this.userData={},this._transformed=!1}getIndex(){return this.index}setIndex(e){return this.index=Array.isArray(e)?new(nt(e)?Or:Dr)(e,1):e,this}setIndirect(e,t=0){return this.indirect=e,this.indirectOffset=t,this}getIndirect(){return this.indirect}getAttribute(e){return this.attributes[e]}setAttribute(e,t){return this.attributes[e]=t,this}deleteAttribute(e){return delete this.attributes[e],this}hasAttribute(e){return this.attributes[e]!==void 0}addGroup(e,t,n=0){this.groups.push({start:e,count:t,materialIndex:n})}clearGroups(){this.groups=[]}setDrawRange(e,t){this.drawRange.start=e,this.drawRange.count=t}applyMatrix4(e){let t=this.attributes.position;t!==void 0&&(t.applyMatrix4(e),t.needsUpdate=!0);let n=this.attributes.normal;if(n!==void 0){let t=new Ut().getNormalMatrix(e);n.applyNormalMatrix(t),n.needsUpdate=!0}let r=this.attributes.tangent;return r!==void 0&&(r.transformDirection(e),r.needsUpdate=!0),this.boundingBox!==null&&this.computeBoundingBox(),this.boundingSphere!==null&&this.computeBoundingSphere(),this._transformed=!0,this}applyQuaternion(e){return Fr.makeRotationFromQuaternion(e),this.applyMatrix4(Fr),this}rotateX(e){return Fr.makeRotationX(e),this.applyMatrix4(Fr),this}rotateY(e){return Fr.makeRotationY(e),this.applyMatrix4(Fr),this}rotateZ(e){return Fr.makeRotationZ(e),this.applyMatrix4(Fr),this}translate(e,t,n){return Fr.makeTranslation(e,t,n),this.applyMatrix4(Fr),this}scale(e,t,n){return Fr.makeScale(e,t,n),this.applyMatrix4(Fr),this}lookAt(e){return Ir.lookAt(e),Ir.updateMatrix(),this.applyMatrix4(Ir.matrix),this}center(){return this.computeBoundingBox(),this.boundingBox.getCenter(Lr).negate(),this.translate(Lr.x,Lr.y,Lr.z),this}setFromPoints(e){let t=this.getAttribute(`position`);if(t===void 0){let t=[];for(let n=0,r=e.length;n<r;n++){let r=e[n];t.push(r.x,r.y,r.z||0)}this.setAttribute(`position`,new kr(t,3))}else{let n=Math.min(e.length,t.count);for(let r=0;r<n;r++){let n=e[r];t.setXYZ(r,n.x,n.y,n.z||0)}e.length>t.count&&K(`BufferGeometry: Buffer size too small for points data. Use .dispose() and create a new geometry.`),t.needsUpdate=!0}return this}computeBoundingBox(){this.boundingBox===null&&(this.boundingBox=new cr);let e=this.attributes.position,t=this.morphAttributes.position;if(e&&e.isGLBufferAttribute){q(`BufferGeometry.computeBoundingBox(): GLBufferAttribute requires a manual bounding box.`,this),this.boundingBox.set(new Y(-1/0,-1/0,-1/0),new Y(1/0,1/0,1/0));return}if(e!==void 0){if(this.boundingBox.setFromBufferAttribute(e),t)for(let e=0,n=t.length;e<n;e++){let n=t[e];Rr.setFromBufferAttribute(n),this.morphTargetsRelative?(Br.addVectors(this.boundingBox.min,Rr.min),this.boundingBox.expandByPoint(Br),Br.addVectors(this.boundingBox.max,Rr.max),this.boundingBox.expandByPoint(Br)):(this.boundingBox.expandByPoint(Rr.min),this.boundingBox.expandByPoint(Rr.max))}}else this.boundingBox.makeEmpty();(isNaN(this.boundingBox.min.x)||isNaN(this.boundingBox.min.y)||isNaN(this.boundingBox.min.z))&&q(`BufferGeometry.computeBoundingBox(): Computed min/max have NaN values. The "position" attribute is likely to have NaN values.`,this)}computeBoundingSphere(){this.boundingSphere===null&&(this.boundingSphere=new Nr);let e=this.attributes.position,t=this.morphAttributes.position;if(e&&e.isGLBufferAttribute){q(`BufferGeometry.computeBoundingSphere(): GLBufferAttribute requires a manual bounding sphere.`,this),this.boundingSphere.set(new Y,1/0);return}if(e){let n=this.boundingSphere.center;if(Rr.setFromBufferAttribute(e),t)for(let e=0,n=t.length;e<n;e++){let n=t[e];zr.setFromBufferAttribute(n),this.morphTargetsRelative?(Br.addVectors(Rr.min,zr.min),Rr.expandByPoint(Br),Br.addVectors(Rr.max,zr.max),Rr.expandByPoint(Br)):(Rr.expandByPoint(zr.min),Rr.expandByPoint(zr.max))}Rr.getCenter(n);let r=0;for(let t=0,i=e.count;t<i;t++)Br.fromBufferAttribute(e,t),r=Math.max(r,n.distanceToSquared(Br));if(t)for(let i=0,a=t.length;i<a;i++){let a=t[i],o=this.morphTargetsRelative;for(let t=0,i=a.count;t<i;t++)Br.fromBufferAttribute(a,t),o&&(Lr.fromBufferAttribute(e,t),Br.add(Lr)),r=Math.max(r,n.distanceToSquared(Br))}this.boundingSphere.radius=Math.sqrt(r),isNaN(this.boundingSphere.radius)&&q(`BufferGeometry.computeBoundingSphere(): Computed radius is NaN. The "position" attribute is likely to have NaN values.`,this)}}computeTangents(){let e=this.index,t=this.attributes;if(e===null||t.position===void 0||t.normal===void 0||t.uv===void 0){q(`BufferGeometry: .computeTangents() failed. Missing required attributes (index, position, normal or uv)`);return}let n=t.position,r=t.normal,i=t.uv,a=this.getAttribute(`tangent`);(a===void 0||a.count!==n.count)&&(a=new Er(new Float32Array(4*n.count),4),this.setAttribute(`tangent`,a));let o=[],s=[];for(let e=0;e<n.count;e++)o[e]=new Y,s[e]=new Y;let c=new Y,l=new Y,u=new Y,d=new J,f=new J,p=new J,m=new Y,h=new Y;function g(e,t,r){c.fromBufferAttribute(n,e),l.fromBufferAttribute(n,t),u.fromBufferAttribute(n,r),d.fromBufferAttribute(i,e),f.fromBufferAttribute(i,t),p.fromBufferAttribute(i,r),l.sub(c),u.sub(c),f.sub(d),p.sub(d);let a=1/(f.x*p.y-p.x*f.y);isFinite(a)&&(m.copy(l).multiplyScalar(p.y).addScaledVector(u,-f.y).multiplyScalar(a),h.copy(u).multiplyScalar(f.x).addScaledVector(l,-p.x).multiplyScalar(a),o[e].add(m),o[t].add(m),o[r].add(m),s[e].add(h),s[t].add(h),s[r].add(h))}let _=this.groups;_.length===0&&(_=[{start:0,count:e.count}]);for(let t=0,n=_.length;t<n;++t){let n=_[t],r=n.start,i=n.count;for(let t=r,n=r+i;t<n;t+=3)g(e.getX(t+0),e.getX(t+1),e.getX(t+2))}let v=new Y,y=new Y,b=new Y,x=new Y;function S(e){b.fromBufferAttribute(r,e),x.copy(b);let t=o[e];v.copy(t),v.sub(b.multiplyScalar(b.dot(t))).normalize(),y.crossVectors(x,t);let n=y.dot(s[e])<0?-1:1;a.setXYZW(e,v.x,v.y,v.z,n)}for(let t=0,n=_.length;t<n;++t){let n=_[t],r=n.start,i=n.count;for(let t=r,n=r+i;t<n;t+=3)S(e.getX(t+0)),S(e.getX(t+1)),S(e.getX(t+2))}this._transformed=!0}computeVertexNormals(){let e=this.index,t=this.getAttribute(`position`);if(t!==void 0){let n=this.getAttribute(`normal`);if(n===void 0||n.count!==t.count)n=new Er(new Float32Array(t.count*3),3),this.setAttribute(`normal`,n);else for(let e=0,t=n.count;e<t;e++)n.setXYZ(e,0,0,0);let r=new Y,i=new Y,a=new Y,o=new Y,s=new Y,c=new Y,l=new Y,u=new Y;if(e)for(let d=0,f=e.count;d<f;d+=3){let f=e.getX(d+0),p=e.getX(d+1),m=e.getX(d+2);r.fromBufferAttribute(t,f),i.fromBufferAttribute(t,p),a.fromBufferAttribute(t,m),l.subVectors(a,i),u.subVectors(r,i),l.cross(u),o.fromBufferAttribute(n,f),s.fromBufferAttribute(n,p),c.fromBufferAttribute(n,m),o.add(l),s.add(l),c.add(l),n.setXYZ(f,o.x,o.y,o.z),n.setXYZ(p,s.x,s.y,s.z),n.setXYZ(m,c.x,c.y,c.z)}else for(let e=0,o=t.count;e<o;e+=3)r.fromBufferAttribute(t,e+0),i.fromBufferAttribute(t,e+1),a.fromBufferAttribute(t,e+2),l.subVectors(a,i),u.subVectors(r,i),l.cross(u),n.setXYZ(e+0,l.x,l.y,l.z),n.setXYZ(e+1,l.x,l.y,l.z),n.setXYZ(e+2,l.x,l.y,l.z);this.normalizeNormals(),n.needsUpdate=!0}}normalizeNormals(){let e=this.attributes.normal;for(let t=0,n=e.count;t<n;t++)Br.fromBufferAttribute(e,t),Br.normalize(),e.setXYZ(t,Br.x,Br.y,Br.z)}toNonIndexed(){function t(e,t){let n=e.array,r=e.itemSize,i=e.normalized,a=new n.constructor(t.length*r),o=0,s=0;for(let i=0,c=t.length;i<c;i++){o=e.isInterleavedBufferAttribute?t[i]*e.data.stride+e.offset:t[i]*r;for(let e=0;e<r;e++)a[s++]=n[o++]}return new Er(a,r,i)}if(this.index===null)return K(`BufferGeometry.toNonIndexed(): BufferGeometry is already non-indexed.`),this;let n=new e,r=this.index.array,i=this.attributes;for(let e in i){let a=i[e],o=t(a,r);n.setAttribute(e,o)}let a=this.morphAttributes;for(let e in a){let i=[],o=a[e];for(let e=0,n=o.length;e<n;e++){let n=o[e],a=t(n,r);i.push(a)}n.morphAttributes[e]=i}n.morphTargetsRelative=this.morphTargetsRelative;let o=this.groups;for(let e=0,t=o.length;e<t;e++){let t=o[e];n.addGroup(t.start,t.count,t.materialIndex)}return n}toJSON(){let e={metadata:{version:4.7,type:`BufferGeometry`,generator:`BufferGeometry.toJSON`}};if(e.uuid=this.uuid,e.type=this.parameters!==void 0&&this._transformed===!0?`BufferGeometry`:this.type,e.name=this.name,Object.keys(this.userData).length>0&&(e.userData=this.userData),this.parameters!==void 0&&this._transformed!==!0){let t=this.parameters;for(let n in t)t[n]!==void 0&&(e[n]=t[n]);return e}e.data={attributes:{}};let t=this.index;t!==null&&(e.data.index={type:t.array.constructor.name,array:Array.prototype.slice.call(t.array)});let n=this.attributes;for(let t in n){let r=n[t];e.data.attributes[t]=r.toJSON(e.data)}let r={},i=!1;for(let t in this.morphAttributes){let n=this.morphAttributes[t],a=[];for(let t=0,r=n.length;t<r;t++){let r=n[t];a.push(r.toJSON(e.data))}a.length>0&&(r[t]=a,i=!0)}i&&(e.data.morphAttributes=r,e.data.morphTargetsRelative=this.morphTargetsRelative);let a=this.groups;a.length>0&&(e.data.groups=JSON.parse(JSON.stringify(a)));let o=this.boundingSphere;return o!==null&&(e.data.boundingSphere=o.toJSON()),e}clone(){return new this.constructor().copy(this)}copy(e){this.index=null,this.attributes={},this.morphAttributes={},this.groups=[],this.boundingBox=null,this.boundingSphere=null;let t={};this.name=e.name;let n=e.index;n!==null&&this.setIndex(n.clone());let r=e.attributes;for(let e in r){let n=r[e];this.setAttribute(e,n.clone(t))}let i=e.morphAttributes;for(let e in i){let n=[],r=i[e];for(let e=0,i=r.length;e<i;e++)n.push(r[e].clone(t));this.morphAttributes[e]=n}this.morphTargetsRelative=e.morphTargetsRelative;let a=e.groups;for(let e=0,t=a.length;e<t;e++){let t=a[e];this.addGroup(t.start,t.count,t.materialIndex)}let o=e.boundingBox;o!==null&&(this.boundingBox=o.clone());let s=e.boundingSphere;return s!==null&&(this.boundingSphere=s.clone()),this.drawRange.start=e.drawRange.start,this.drawRange.count=e.drawRange.count,this.userData=e.userData,this._transformed=e._transformed,this}dispose(){this.dispatchEvent({type:`dispose`})}},Hr=new Y,Ur=new Y,Wr=new Ut,Gr=class{constructor(e=new Y(1,0,0),t=0){this.isPlane=!0,this.normal=e,this.constant=t}set(e,t){return this.normal.copy(e),this.constant=t,this}setComponents(e,t,n,r){return this.normal.set(e,t,n),this.constant=r,this}setFromNormalAndCoplanarPoint(e,t){return this.normal.copy(e),this.constant=-t.dot(this.normal),this}setFromCoplanarPoints(e,t,n){let r=Hr.subVectors(n,t).cross(Ur.subVectors(e,t)).normalize();return this.setFromNormalAndCoplanarPoint(r,e),this}copy(e){return this.normal.copy(e.normal),this.constant=e.constant,this}normalize(){let e=1/this.normal.length();return this.normal.multiplyScalar(e),this.constant*=e,this}negate(){return this.constant*=-1,this.normal.negate(),this}distanceToPoint(e){return this.normal.dot(e)+this.constant}distanceToSphere(e){return this.distanceToPoint(e.center)-e.radius}projectPoint(e,t){return t.copy(e).addScaledVector(this.normal,-this.distanceToPoint(e))}intersectLine(e,t,n=!0){let r=e.delta(Hr),i=this.normal.dot(r);if(i===0)return this.distanceToPoint(e.start)===0?t.copy(e.start):null;let a=-(e.start.dot(this.normal)+this.constant)/i;return n===!0&&(a<0||a>1)?null:t.copy(e.start).addScaledVector(r,a)}intersectsLine(e){let t=this.distanceToPoint(e.start),n=this.distanceToPoint(e.end);return t<0&&n>0||n<0&&t>0}intersectsBox(e){return e.intersectsPlane(this)}intersectsSphere(e){return e.intersectsPlane(this)}coplanarPoint(e){return e.copy(this.normal).multiplyScalar(-this.constant)}applyMatrix4(e,t){let n=t||Wr.getNormalMatrix(e),r=this.coplanarPoint(Hr).applyMatrix4(e),i=this.normal.applyMatrix3(n).normalize();return this.constant=-r.dot(i),this}translate(e){return this.constant-=e.dot(this.normal),this}equals(e){return e.normal.equals(this.normal)&&e.constant===this.constant}clone(){return new this.constructor().copy(this)}toJSON(){return{normal:this.normal.toArray(),constant:this.constant}}fromJSON(e){return this.normal.fromArray(e.normal),this.constant=e.constant,this}},Kr=0,qr=class extends ft{constructor(){super(),this.isMaterial=!0,Object.defineProperty(this,"id",{value:Kr++}),this.uuid=_t(),this.name=``,this.type=`Material`,this.blending=1,this.side=0,this.vertexColors=!1,this.opacity=1,this.transparent=!1,this.alphaHash=!1,this.blendSrc=204,this.blendDst=205,this.blendEquation=100,this.blendSrcAlpha=null,this.blendDstAlpha=null,this.blendEquationAlpha=null,this.blendColor=new X(0,0,0),this.blendAlpha=0,this.depthFunc=3,this.depthTest=!0,this.depthWrite=!0,this.stencilWriteMask=255,this.stencilFunc=519,this.stencilRef=0,this.stencilFuncMask=255,this.stencilFail=$e,this.stencilZFail=$e,this.stencilZPass=$e,this.stencilWrite=!1,this.clippingPlanes=null,this.clipIntersection=!1,this.clipShadows=!1,this.shadowSide=null,this.colorWrite=!0,this.precision=null,this.polygonOffset=!1,this.polygonOffsetFactor=0,this.polygonOffsetUnits=0,this.dithering=!1,this.alphaToCoverage=!1,this.premultipliedAlpha=!1,this.forceSinglePass=!1,this.allowOverride=!0,this.visible=!0,this.toneMapped=!0,this.userData={},this.version=0,this._alphaTest=0}get alphaTest(){return this._alphaTest}set alphaTest(e){this._alphaTest>0!=e>0&&this.version++,this._alphaTest=e}onBeforeRender(){}onBeforeCompile(){}customProgramCacheKey(){return this.onBeforeCompile.toString()}setValues(e){if(e!==void 0)for(let t in e){let n=e[t];if(n===void 0){K(`Material: parameter '${t}' has value of undefined.`);continue}let r=this[t];if(r===void 0){K(`Material: '${t}' is not a property of THREE.${this.type}.`);continue}r&&r.isColor?r.set(n):r&&r.isVector2&&n&&n.isVector2||r&&r.isEuler&&n&&n.isEuler||r&&r.isVector3&&n&&n.isVector3?r.copy(n):this[t]=n}}toJSON(e){let t=e===void 0||typeof e==`string`;t&&(e={textures:{},images:{}});let n={metadata:{version:4.7,type:`Material`,generator:`Material.toJSON`}};n.uuid=this.uuid,n.type=this.type,n.blending=this.blending,n.side=this.side,n.shadowSide=this.shadowSide,n.vertexColors=this.vertexColors,n.opacity=this.opacity,n.transparent=this.transparent,n.blendSrc=this.blendSrc,n.blendDst=this.blendDst,n.blendEquation=this.blendEquation,n.blendSrcAlpha=this.blendSrcAlpha,n.blendDstAlpha=this.blendDstAlpha,n.blendEquationAlpha=this.blendEquationAlpha,n.blendColor=this.blendColor.getHex(),n.blendAlpha=this.blendAlpha,n.depthFunc=this.depthFunc,n.depthTest=this.depthTest,n.depthWrite=this.depthWrite,n.colorWrite=this.colorWrite,n.clipIntersection=this.clipIntersection,n.clipShadows=this.clipShadows,n.stencilWriteMask=this.stencilWriteMask,n.stencilFunc=this.stencilFunc,n.stencilRef=this.stencilRef,n.stencilFuncMask=this.stencilFuncMask,n.stencilFail=this.stencilFail,n.stencilZFail=this.stencilZFail,n.stencilZPass=this.stencilZPass,n.stencilWrite=this.stencilWrite,n.polygonOffset=this.polygonOffset,n.polygonOffsetFactor=this.polygonOffsetFactor,n.polygonOffsetUnits=this.polygonOffsetUnits,n.dithering=this.dithering,n.alphaTest=this.alphaTest,n.alphaHash=this.alphaHash,n.alphaToCoverage=this.alphaToCoverage,n.premultipliedAlpha=this.premultipliedAlpha,n.forceSinglePass=this.forceSinglePass,n.allowOverride=this.allowOverride,n.visible=this.visible,n.toneMapped=this.toneMapped,n.name=this.name,this.color&&this.color.isColor&&(n.color=this.color.getHex()),this.roughness!==void 0&&(n.roughness=this.roughness),this.metalness!==void 0&&(n.metalness=this.metalness),this.sheen!==void 0&&(n.sheen=this.sheen),this.sheenColor&&this.sheenColor.isColor&&(n.sheenColor=this.sheenColor.getHex()),this.sheenRoughness!==void 0&&(n.sheenRoughness=this.sheenRoughness),this.emissive&&this.emissive.isColor&&(n.emissive=this.emissive.getHex()),this.emissiveIntensity!==void 0&&(n.emissiveIntensity=this.emissiveIntensity),this.specular&&this.specular.isColor&&(n.specular=this.specular.getHex()),this.specularIntensity!==void 0&&(n.specularIntensity=this.specularIntensity),this.specularColor&&this.specularColor.isColor&&(n.specularColor=this.specularColor.getHex()),this.shininess!==void 0&&(n.shininess=this.shininess),this.clearcoat!==void 0&&(n.clearcoat=this.clearcoat),this.clearcoatRoughness!==void 0&&(n.clearcoatRoughness=this.clearcoatRoughness),this.clearcoatMap&&this.clearcoatMap.isTexture&&(n.clearcoatMap=this.clearcoatMap.toJSON(e).uuid),this.clearcoatRoughnessMap&&this.clearcoatRoughnessMap.isTexture&&(n.clearcoatRoughnessMap=this.clearcoatRoughnessMap.toJSON(e).uuid),this.clearcoatNormalMap&&this.clearcoatNormalMap.isTexture&&(n.clearcoatNormalMap=this.clearcoatNormalMap.toJSON(e).uuid,n.clearcoatNormalScale=this.clearcoatNormalScale.toArray()),this.sheenColorMap&&this.sheenColorMap.isTexture&&(n.sheenColorMap=this.sheenColorMap.toJSON(e).uuid),this.sheenRoughnessMap&&this.sheenRoughnessMap.isTexture&&(n.sheenRoughnessMap=this.sheenRoughnessMap.toJSON(e).uuid),this.dispersion!==void 0&&(n.dispersion=this.dispersion),this.retroreflectivity!==void 0&&(n.retroreflectivity=this.retroreflectivity),this.iridescence!==void 0&&(n.iridescence=this.iridescence),this.iridescenceIOR!==void 0&&(n.iridescenceIOR=this.iridescenceIOR),this.iridescenceThicknessRange!==void 0&&(n.iridescenceThicknessRange=this.iridescenceThicknessRange),this.iridescenceMap&&this.iridescenceMap.isTexture&&(n.iridescenceMap=this.iridescenceMap.toJSON(e).uuid),this.iridescenceThicknessMap&&this.iridescenceThicknessMap.isTexture&&(n.iridescenceThicknessMap=this.iridescenceThicknessMap.toJSON(e).uuid),this.anisotropy!==void 0&&(n.anisotropy=this.anisotropy),this.anisotropyRotation!==void 0&&(n.anisotropyRotation=this.anisotropyRotation),this.anisotropyMap&&this.anisotropyMap.isTexture&&(n.anisotropyMap=this.anisotropyMap.toJSON(e).uuid),this.map&&this.map.isTexture&&(n.map=this.map.toJSON(e).uuid),this.matcap&&this.matcap.isTexture&&(n.matcap=this.matcap.toJSON(e).uuid),this.alphaMap&&this.alphaMap.isTexture&&(n.alphaMap=this.alphaMap.toJSON(e).uuid),this.lightMap&&this.lightMap.isTexture&&(n.lightMap=this.lightMap.toJSON(e).uuid,n.lightMapIntensity=this.lightMapIntensity),this.aoMap&&this.aoMap.isTexture&&(n.aoMap=this.aoMap.toJSON(e).uuid,n.aoMapIntensity=this.aoMapIntensity),this.bumpMap&&this.bumpMap.isTexture&&(n.bumpMap=this.bumpMap.toJSON(e).uuid,n.bumpScale=this.bumpScale),this.normalMap&&this.normalMap.isTexture&&(n.normalMap=this.normalMap.toJSON(e).uuid,n.normalMapType=this.normalMapType,n.normalScale=this.normalScale.toArray()),this.displacementMap&&this.displacementMap.isTexture&&(n.displacementMap=this.displacementMap.toJSON(e).uuid,n.displacementScale=this.displacementScale,n.displacementBias=this.displacementBias),this.roughnessMap&&this.roughnessMap.isTexture&&(n.roughnessMap=this.roughnessMap.toJSON(e).uuid),this.metalnessMap&&this.metalnessMap.isTexture&&(n.metalnessMap=this.metalnessMap.toJSON(e).uuid),this.emissiveMap&&this.emissiveMap.isTexture&&(n.emissiveMap=this.emissiveMap.toJSON(e).uuid),this.specularMap&&this.specularMap.isTexture&&(n.specularMap=this.specularMap.toJSON(e).uuid),this.specularIntensityMap&&this.specularIntensityMap.isTexture&&(n.specularIntensityMap=this.specularIntensityMap.toJSON(e).uuid),this.specularColorMap&&this.specularColorMap.isTexture&&(n.specularColorMap=this.specularColorMap.toJSON(e).uuid),this.envMap&&this.envMap.isTexture&&(n.envMap=this.envMap.toJSON(e).uuid,this.combine!==void 0&&(n.combine=this.combine)),this.envMapRotation!==void 0&&(n.envMapRotation=this.envMapRotation.toArray()),this.envMapIntensity!==void 0&&(n.envMapIntensity=this.envMapIntensity),this.reflectivity!==void 0&&(n.reflectivity=this.reflectivity),this.refractionRatio!==void 0&&(n.refractionRatio=this.refractionRatio),this.gradientMap&&this.gradientMap.isTexture&&(n.gradientMap=this.gradientMap.toJSON(e).uuid),this.transmission!==void 0&&(n.transmission=this.transmission),this.transmissionMap&&this.transmissionMap.isTexture&&(n.transmissionMap=this.transmissionMap.toJSON(e).uuid),this.thickness!==void 0&&(n.thickness=this.thickness),this.thicknessMap&&this.thicknessMap.isTexture&&(n.thicknessMap=this.thicknessMap.toJSON(e).uuid),this.attenuationDistance!==void 0&&(n.attenuationDistance=this.attenuationDistance),this.attenuationColor!==void 0&&(n.attenuationColor=this.attenuationColor.getHex()),this.size!==void 0&&(n.size=this.size),this.sizeAttenuation!==void 0&&(n.sizeAttenuation=this.sizeAttenuation),Array.isArray(this.clippingPlanes)&&this.clippingPlanes.length>0&&(n.clippingPlanes=this.clippingPlanes.map(e=>e.toJSON())),this.rotation!==void 0&&(n.rotation=this.rotation),this.depthPacking!==void 0&&(n.depthPacking=this.depthPacking),this.linewidth!==void 0&&(n.linewidth=this.linewidth),this.linecap!==void 0&&(n.linecap=this.linecap),this.linejoin!==void 0&&(n.linejoin=this.linejoin),this.dashSize!==void 0&&(n.dashSize=this.dashSize),this.gapSize!==void 0&&(n.gapSize=this.gapSize),this.scale!==void 0&&(n.scale=this.scale),this.wireframe!==void 0&&(n.wireframe=this.wireframe),this.wireframeLinewidth!==void 0&&(n.wireframeLinewidth=this.wireframeLinewidth),this.wireframeLinecap!==void 0&&(n.wireframeLinecap=this.wireframeLinecap),this.wireframeLinejoin!==void 0&&(n.wireframeLinejoin=this.wireframeLinejoin),this.flatShading!==void 0&&(n.flatShading=this.flatShading),this.fog!==void 0&&(n.fog=this.fog),Object.keys(this.userData).length>0&&(n.userData=this.userData);function r(e){let t=[];for(let n in e){let r=e[n];delete r.metadata,t.push(r)}return t}if(t){let t=r(e.textures),i=r(e.images);t.length>0&&(n.textures=t),i.length>0&&(n.images=i)}return n}fromJSON(e,t){if(e.uuid!==void 0&&(this.uuid=e.uuid),e.name!==void 0&&(this.name=e.name),e.color!==void 0&&this.color!==void 0&&this.color.setHex(e.color),e.roughness!==void 0&&(this.roughness=e.roughness),e.metalness!==void 0&&(this.metalness=e.metalness),e.sheen!==void 0&&(this.sheen=e.sheen),e.sheenColor!==void 0&&(this.sheenColor=new X().setHex(e.sheenColor)),e.sheenRoughness!==void 0&&(this.sheenRoughness=e.sheenRoughness),e.emissive!==void 0&&this.emissive!==void 0&&this.emissive.setHex(e.emissive),e.specular!==void 0&&this.specular!==void 0&&this.specular.setHex(e.specular),e.specularIntensity!==void 0&&(this.specularIntensity=e.specularIntensity),e.specularColor!==void 0&&this.specularColor!==void 0&&this.specularColor.setHex(e.specularColor),e.shininess!==void 0&&(this.shininess=e.shininess),e.clearcoat!==void 0&&(this.clearcoat=e.clearcoat),e.clearcoatRoughness!==void 0&&(this.clearcoatRoughness=e.clearcoatRoughness),e.dispersion!==void 0&&(this.dispersion=e.dispersion),e.retroreflectivity!==void 0&&(this.retroreflectivity=e.retroreflectivity),e.iridescence!==void 0&&(this.iridescence=e.iridescence),e.iridescenceIOR!==void 0&&(this.iridescenceIOR=e.iridescenceIOR),e.iridescenceThicknessRange!==void 0&&(this.iridescenceThicknessRange=e.iridescenceThicknessRange),e.transmission!==void 0&&(this.transmission=e.transmission),e.thickness!==void 0&&(this.thickness=e.thickness),e.attenuationDistance!==void 0&&(this.attenuationDistance=e.attenuationDistance),e.attenuationColor!==void 0&&this.attenuationColor!==void 0&&this.attenuationColor.setHex(e.attenuationColor),e.anisotropy!==void 0&&(this.anisotropy=e.anisotropy),e.anisotropyRotation!==void 0&&(this.anisotropyRotation=e.anisotropyRotation),e.fog!==void 0&&(this.fog=e.fog),e.flatShading!==void 0&&(this.flatShading=e.flatShading),e.blending!==void 0&&(this.blending=e.blending),e.combine!==void 0&&(this.combine=e.combine),e.side!==void 0&&(this.side=e.side),e.shadowSide!==void 0&&(this.shadowSide=e.shadowSide),e.opacity!==void 0&&(this.opacity=e.opacity),e.transparent!==void 0&&(this.transparent=e.transparent),e.alphaTest!==void 0&&(this.alphaTest=e.alphaTest),e.alphaHash!==void 0&&(this.alphaHash=e.alphaHash),e.depthFunc!==void 0&&(this.depthFunc=e.depthFunc),e.depthTest!==void 0&&(this.depthTest=e.depthTest),e.depthWrite!==void 0&&(this.depthWrite=e.depthWrite),e.colorWrite!==void 0&&(this.colorWrite=e.colorWrite),e.clippingPlanes!==void 0&&(this.clippingPlanes=e.clippingPlanes.map(e=>new Gr().fromJSON(e))),e.clipIntersection!==void 0&&(this.clipIntersection=e.clipIntersection),e.clipShadows!==void 0&&(this.clipShadows=e.clipShadows),e.depthPacking!==void 0&&(this.depthPacking=e.depthPacking),e.blendSrc!==void 0&&(this.blendSrc=e.blendSrc),e.blendDst!==void 0&&(this.blendDst=e.blendDst),e.blendEquation!==void 0&&(this.blendEquation=e.blendEquation),e.blendSrcAlpha!==void 0&&(this.blendSrcAlpha=e.blendSrcAlpha),e.blendDstAlpha!==void 0&&(this.blendDstAlpha=e.blendDstAlpha),e.blendEquationAlpha!==void 0&&(this.blendEquationAlpha=e.blendEquationAlpha),e.blendColor!==void 0&&this.blendColor!==void 0&&this.blendColor.setHex(e.blendColor),e.blendAlpha!==void 0&&(this.blendAlpha=e.blendAlpha),e.stencilWriteMask!==void 0&&(this.stencilWriteMask=e.stencilWriteMask),e.stencilFunc!==void 0&&(this.stencilFunc=e.stencilFunc),e.stencilRef!==void 0&&(this.stencilRef=e.stencilRef),e.stencilFuncMask!==void 0&&(this.stencilFuncMask=e.stencilFuncMask),e.stencilFail!==void 0&&(this.stencilFail=e.stencilFail),e.stencilZFail!==void 0&&(this.stencilZFail=e.stencilZFail),e.stencilZPass!==void 0&&(this.stencilZPass=e.stencilZPass),e.stencilWrite!==void 0&&(this.stencilWrite=e.stencilWrite),e.wireframe!==void 0&&(this.wireframe=e.wireframe),e.wireframeLinewidth!==void 0&&(this.wireframeLinewidth=e.wireframeLinewidth),e.wireframeLinecap!==void 0&&(this.wireframeLinecap=e.wireframeLinecap),e.wireframeLinejoin!==void 0&&(this.wireframeLinejoin=e.wireframeLinejoin),e.rotation!==void 0&&(this.rotation=e.rotation),e.linewidth!==void 0&&(this.linewidth=e.linewidth),e.linecap!==void 0&&(this.linecap=e.linecap),e.linejoin!==void 0&&(this.linejoin=e.linejoin),e.dashSize!==void 0&&(this.dashSize=e.dashSize),e.gapSize!==void 0&&(this.gapSize=e.gapSize),e.scale!==void 0&&(this.scale=e.scale),e.polygonOffset!==void 0&&(this.polygonOffset=e.polygonOffset),e.polygonOffsetFactor!==void 0&&(this.polygonOffsetFactor=e.polygonOffsetFactor),e.polygonOffsetUnits!==void 0&&(this.polygonOffsetUnits=e.polygonOffsetUnits),e.dithering!==void 0&&(this.dithering=e.dithering),e.alphaToCoverage!==void 0&&(this.alphaToCoverage=e.alphaToCoverage),e.premultipliedAlpha!==void 0&&(this.premultipliedAlpha=e.premultipliedAlpha),e.forceSinglePass!==void 0&&(this.forceSinglePass=e.forceSinglePass),e.allowOverride!==void 0&&(this.allowOverride=e.allowOverride),e.visible!==void 0&&(this.visible=e.visible),e.toneMapped!==void 0&&(this.toneMapped=e.toneMapped),e.userData!==void 0&&(this.userData=e.userData),e.vertexColors!==void 0&&(this.vertexColors=typeof e.vertexColors==`number`?e.vertexColors>0:e.vertexColors),e.size!==void 0&&(this.size=e.size),e.sizeAttenuation!==void 0&&(this.sizeAttenuation=e.sizeAttenuation),e.map!==void 0&&(this.map=t[e.map]||null),e.matcap!==void 0&&(this.matcap=t[e.matcap]||null),e.alphaMap!==void 0&&(this.alphaMap=t[e.alphaMap]||null),e.bumpMap!==void 0&&(this.bumpMap=t[e.bumpMap]||null),e.bumpScale!==void 0&&(this.bumpScale=e.bumpScale),e.normalMap!==void 0&&(this.normalMap=t[e.normalMap]||null),e.normalMapType!==void 0&&(this.normalMapType=e.normalMapType),e.normalScale!==void 0){let t=e.normalScale;Array.isArray(t)===!1&&(t=[t,t]),this.normalScale=new J().fromArray(t)}return e.displacementMap!==void 0&&(this.displacementMap=t[e.displacementMap]||null),e.displacementScale!==void 0&&(this.displacementScale=e.displacementScale),e.displacementBias!==void 0&&(this.displacementBias=e.displacementBias),e.roughnessMap!==void 0&&(this.roughnessMap=t[e.roughnessMap]||null),e.metalnessMap!==void 0&&(this.metalnessMap=t[e.metalnessMap]||null),e.emissiveMap!==void 0&&(this.emissiveMap=t[e.emissiveMap]||null),e.emissiveIntensity!==void 0&&(this.emissiveIntensity=e.emissiveIntensity),e.specularMap!==void 0&&(this.specularMap=t[e.specularMap]||null),e.specularIntensityMap!==void 0&&(this.specularIntensityMap=t[e.specularIntensityMap]||null),e.specularColorMap!==void 0&&(this.specularColorMap=t[e.specularColorMap]||null),e.envMap!==void 0&&(this.envMap=t[e.envMap]||null),e.envMapRotation!==void 0&&this.envMapRotation.fromArray(e.envMapRotation),e.envMapIntensity!==void 0&&(this.envMapIntensity=e.envMapIntensity),e.reflectivity!==void 0&&(this.reflectivity=e.reflectivity),e.refractionRatio!==void 0&&(this.refractionRatio=e.refractionRatio),e.lightMap!==void 0&&(this.lightMap=t[e.lightMap]||null),e.lightMapIntensity!==void 0&&(this.lightMapIntensity=e.lightMapIntensity),e.aoMap!==void 0&&(this.aoMap=t[e.aoMap]||null),e.aoMapIntensity!==void 0&&(this.aoMapIntensity=e.aoMapIntensity),e.gradientMap!==void 0&&(this.gradientMap=t[e.gradientMap]||null),e.clearcoatMap!==void 0&&(this.clearcoatMap=t[e.clearcoatMap]||null),e.clearcoatRoughnessMap!==void 0&&(this.clearcoatRoughnessMap=t[e.clearcoatRoughnessMap]||null),e.clearcoatNormalMap!==void 0&&(this.clearcoatNormalMap=t[e.clearcoatNormalMap]||null),e.clearcoatNormalScale!==void 0&&(this.clearcoatNormalScale=new J().fromArray(e.clearcoatNormalScale)),e.iridescenceMap!==void 0&&(this.iridescenceMap=t[e.iridescenceMap]||null),e.iridescenceThicknessMap!==void 0&&(this.iridescenceThicknessMap=t[e.iridescenceThicknessMap]||null),e.transmissionMap!==void 0&&(this.transmissionMap=t[e.transmissionMap]||null),e.thicknessMap!==void 0&&(this.thicknessMap=t[e.thicknessMap]||null),e.anisotropyMap!==void 0&&(this.anisotropyMap=t[e.anisotropyMap]||null),e.sheenColorMap!==void 0&&(this.sheenColorMap=t[e.sheenColorMap]||null),e.sheenRoughnessMap!==void 0&&(this.sheenRoughnessMap=t[e.sheenRoughnessMap]||null),this}clone(){return new this.constructor().copy(this)}copy(e){this.name=e.name,this.blending=e.blending,this.side=e.side,this.vertexColors=e.vertexColors,this.opacity=e.opacity,this.transparent=e.transparent,this.blendSrc=e.blendSrc,this.blendDst=e.blendDst,this.blendEquation=e.blendEquation,this.blendSrcAlpha=e.blendSrcAlpha,this.blendDstAlpha=e.blendDstAlpha,this.blendEquationAlpha=e.blendEquationAlpha,this.blendColor.copy(e.blendColor),this.blendAlpha=e.blendAlpha,this.depthFunc=e.depthFunc,this.depthTest=e.depthTest,this.depthWrite=e.depthWrite,this.stencilWriteMask=e.stencilWriteMask,this.stencilFunc=e.stencilFunc,this.stencilRef=e.stencilRef,this.stencilFuncMask=e.stencilFuncMask,this.stencilFail=e.stencilFail,this.stencilZFail=e.stencilZFail,this.stencilZPass=e.stencilZPass,this.stencilWrite=e.stencilWrite;let t=e.clippingPlanes,n=null;if(t!==null){let e=t.length;n=Array(e);for(let r=0;r!==e;++r)n[r]=t[r].clone()}return this.clippingPlanes=n,this.clipIntersection=e.clipIntersection,this.clipShadows=e.clipShadows,this.shadowSide=e.shadowSide,this.colorWrite=e.colorWrite,this.precision=e.precision,this.polygonOffset=e.polygonOffset,this.polygonOffsetFactor=e.polygonOffsetFactor,this.polygonOffsetUnits=e.polygonOffsetUnits,this.dithering=e.dithering,this.alphaTest=e.alphaTest,this.alphaHash=e.alphaHash,this.alphaToCoverage=e.alphaToCoverage,this.premultipliedAlpha=e.premultipliedAlpha,this.forceSinglePass=e.forceSinglePass,this.allowOverride=e.allowOverride,this.visible=e.visible,this.toneMapped=e.toneMapped,this.userData=JSON.parse(JSON.stringify(e.userData)),this}dispose(){this.dispatchEvent({type:`dispose`})}set needsUpdate(e){e===!0&&this.version++}},Jr=new Y,Yr=new Y,Xr=new Y,Zr=new Y,Qr=class{constructor(e=new Y,t=new Y(0,0,-1)){this.origin=e,this.direction=t}set(e,t){return this.origin.copy(e),this.direction.copy(t),this}copy(e){return this.origin.copy(e.origin),this.direction.copy(e.direction),this}at(e,t){return t.copy(this.origin).addScaledVector(this.direction,e)}lookAt(e){return this.direction.copy(e).sub(this.origin).normalize(),this}recast(e){return this.origin.copy(this.at(e,Jr)),this}closestPointToPoint(e,t){t.subVectors(e,this.origin);let n=t.dot(this.direction);return n<0?t.copy(this.origin):t.copy(this.origin).addScaledVector(this.direction,n)}distanceToPoint(e){return Math.sqrt(this.distanceSqToPoint(e))}distanceSqToPoint(e){let t=Jr.subVectors(e,this.origin).dot(this.direction);return t<0?this.origin.distanceToSquared(e):(Jr.copy(this.origin).addScaledVector(this.direction,t),Jr.distanceToSquared(e))}distanceSqToSegment(e,t,n,r){Yr.copy(e).add(t).multiplyScalar(.5),Xr.copy(t).sub(e).normalize(),Zr.copy(this.origin).sub(Yr);let i=e.distanceTo(t)*.5,a=-this.direction.dot(Xr),o=Zr.dot(this.direction),s=-Zr.dot(Xr),c=Zr.lengthSq(),l=Math.abs(1-a*a),u,d,f,p;if(l>0){if(u=a*s-o,d=a*o-s,p=i*l,u>=0){if(d>=-p){if(d<=p){let e=1/l;u*=e,d*=e,f=u*(u+a*d+2*o)+d*(a*u+d+2*s)+c}else d=i,u=Math.max(0,-(a*d+o)),f=-u*u+d*(d+2*s)+c}else d=-i,u=Math.max(0,-(a*d+o)),f=-u*u+d*(d+2*s)+c}else d<=-p?(u=Math.max(0,-(-a*i+o)),d=u>0?-i:Math.min(Math.max(-i,-s),i),f=-u*u+d*(d+2*s)+c):d<=p?(u=0,d=Math.min(Math.max(-i,-s),i),f=d*(d+2*s)+c):(u=Math.max(0,-(a*i+o)),d=u>0?i:Math.min(Math.max(-i,-s),i),f=-u*u+d*(d+2*s)+c)}else d=a>0?-i:i,u=Math.max(0,-(a*d+o)),f=-u*u+d*(d+2*s)+c;return n&&n.copy(this.origin).addScaledVector(this.direction,u),r&&r.copy(Yr).addScaledVector(Xr,d),f}intersectSphere(e,t){if(e.radius<0)return null;Jr.subVectors(e.center,this.origin);let n=Jr.dot(this.direction),r=Jr.dot(Jr)-n*n,i=e.radius*e.radius;if(r>i)return null;let a=Math.sqrt(i-r),o=n-a,s=n+a;return s<0?null:o<0?this.at(s,t):this.at(o,t)}intersectsSphere(e){return e.radius<0?!1:this.distanceSqToPoint(e.center)<=e.radius*e.radius}distanceToPlane(e){let t=e.normal.dot(this.direction);if(t===0)return e.distanceToPoint(this.origin)===0?0:null;let n=-(this.origin.dot(e.normal)+e.constant)/t;return n>=0?n:null}intersectPlane(e,t){let n=this.distanceToPlane(e);return n===null?null:this.at(n,t)}intersectsPlane(e){let t=e.distanceToPoint(this.origin);return t===0||e.normal.dot(this.direction)*t<0}intersectBox(e,t){let n,r,i,a,o,s,c=1/this.direction.x,l=1/this.direction.y,u=1/this.direction.z,d=this.origin;return c>=0?(n=(e.min.x-d.x)*c,r=(e.max.x-d.x)*c):(n=(e.max.x-d.x)*c,r=(e.min.x-d.x)*c),l>=0?(i=(e.min.y-d.y)*l,a=(e.max.y-d.y)*l):(i=(e.max.y-d.y)*l,a=(e.min.y-d.y)*l),n>a||i>r||((i>n||isNaN(n))&&(n=i),(a<r||isNaN(r))&&(r=a),u>=0?(o=(e.min.z-d.z)*u,s=(e.max.z-d.z)*u):(o=(e.max.z-d.z)*u,s=(e.min.z-d.z)*u),n>s||o>r)||((o>n||n!==n)&&(n=o),(s<r||r!==r)&&(r=s),r<0)?null:this.at(n>=0?n:r,t)}intersectsBox(e){return this.intersectBox(e,Jr)!==null}intersectTriangle(e,t,n,r,i){let a=this.origin,o=this.direction,s=o.x,c=o.y,l=o.z,u=e.x-a.x,d=e.y-a.y,f=e.z-a.z,p=t.x-a.x,m=t.y-a.y,h=t.z-a.z,g=n.x-a.x,_=n.y-a.y,v=n.z-a.z,y=Math.abs(s),b=Math.abs(c),x=Math.abs(l),S,C,w,T,E,D,O,k,A,j,M,N;if(y>=b&&y>=x?(w=s,D=u,A=p,N=g,s>=0?(S=c,C=l,T=d,E=f,O=m,k=h,j=_,M=v):(S=l,C=c,T=f,E=d,O=h,k=m,j=v,M=_)):b>=x?(w=c,D=d,A=m,N=_,c>=0?(S=l,C=s,T=f,E=u,O=h,k=p,j=v,M=g):(S=s,C=l,T=u,E=f,O=p,k=h,j=g,M=v)):(w=l,D=f,A=h,N=v,l>=0?(S=s,C=c,T=u,E=d,O=p,k=m,j=g,M=_):(S=c,C=s,T=d,E=u,O=m,k=p,j=_,M=g)),w===0)return null;let P=S/w,F=C/w,I=1/w,L=T-P*D,R=E-F*D,z=O-P*A,ee=k-F*A,B=j-P*N,te=M-F*N,V=B*ee-te*z,H=L*te-R*B,ne=z*R-ee*L;if(r){if(V<0||H<0||ne<0)return null}else if((V<0||H<0||ne<0)&&(V>0||H>0||ne>0))return null;let re=V+H+ne;if(re===0)return null;let ie=I*(V*D+H*A+ne*N);return(re>0?ie<0:ie>0)?null:this.at(ie/re,i)}applyMatrix4(e){return this.origin.applyMatrix4(e),this.direction.transformDirection(e),this}equals(e){return e.origin.equals(this.origin)&&e.direction.equals(this.direction)}clone(){return new this.constructor().copy(this)}},$r=class extends qr{constructor(e){super(),this.isMeshBasicMaterial=!0,this.type=`MeshBasicMaterial`,this.color=new X(16777215),this.map=null,this.lightMap=null,this.lightMapIntensity=1,this.aoMap=null,this.aoMapIntensity=1,this.specularMap=null,this.alphaMap=null,this.envMap=null,this.envMapRotation=new xn,this.combine=0,this.reflectivity=1,this.refractionRatio=.98,this.wireframe=!1,this.wireframeLinewidth=1,this.wireframeLinecap=`round`,this.wireframeLinejoin=`round`,this.fog=!0,this.setValues(e)}copy(e){return super.copy(e),this.color.copy(e.color),this.map=e.map,this.lightMap=e.lightMap,this.lightMapIntensity=e.lightMapIntensity,this.aoMap=e.aoMap,this.aoMapIntensity=e.aoMapIntensity,this.specularMap=e.specularMap,this.alphaMap=e.alphaMap,this.envMap=e.envMap,this.envMapRotation.copy(e.envMapRotation),this.combine=e.combine,this.reflectivity=e.reflectivity,this.refractionRatio=e.refractionRatio,this.wireframe=e.wireframe,this.wireframeLinewidth=e.wireframeLinewidth,this.wireframeLinecap=e.wireframeLinecap,this.wireframeLinejoin=e.wireframeLinejoin,this.fog=e.fog,this}},ei=new dn,ti=new Qr,ni=new Nr,ri=new Y,ii=new Y,ai=new Y,oi=new Y,si=new Y,ci=new Y,li=new Y,ui=new Y,di=class extends Rn{constructor(e=new Vr,t=new $r){super(),this.isMesh=!0,this.type=`Mesh`,this.geometry=e,this.material=t,this.morphTargetDictionary=void 0,this.morphTargetInfluences=void 0,this.count=1,this.updateMorphTargets()}copy(e,t){return super.copy(e,t),e.morphTargetInfluences!==void 0&&(this.morphTargetInfluences=e.morphTargetInfluences.slice()),e.morphTargetDictionary!==void 0&&(this.morphTargetDictionary=Object.assign({},e.morphTargetDictionary)),this.material=Array.isArray(e.material)?e.material.slice():e.material,this.geometry=e.geometry,this}updateMorphTargets(){let e=this.geometry.morphAttributes,t=Object.keys(e);if(t.length>0){let n=e[t[0]];if(n!==void 0){this.morphTargetInfluences=[],this.morphTargetDictionary={};for(let e=0,t=n.length;e<t;e++){let t=n[e].name||String(e);this.morphTargetInfluences.push(0),this.morphTargetDictionary[t]=e}}}}getVertexPosition(e,t){let n=this.geometry,r=n.attributes.position,i=n.morphAttributes.position,a=n.morphTargetsRelative;t.fromBufferAttribute(r,e);let o=this.morphTargetInfluences;if(i&&o){ci.set(0,0,0);for(let n=0,r=i.length;n<r;n++){let r=o[n],s=i[n];r!==0&&(si.fromBufferAttribute(s,e),a?ci.addScaledVector(si,r):ci.addScaledVector(si.sub(t),r))}t.add(ci)}return t}intersectsFrustum(e){return e.intersectsObject(this)}raycast(e,t){let n=this.geometry,r=this.material,i=this.matrixWorld;r!==void 0&&(n.boundingSphere===null&&n.computeBoundingSphere(),ni.copy(n.boundingSphere),ni.applyMatrix4(i),ti.copy(e.ray).recast(e.near),!(ni.containsPoint(ti.origin)===!1&&(ti.intersectSphere(ni,ri)===null||ti.origin.distanceToSquared(ri)>(e.far-e.near)**2))&&(ei.copy(i).invert(),ti.copy(e.ray).applyMatrix4(ei),(n.boundingBox===null||ti.intersectsBox(n.boundingBox)!==!1)&&this._computeIntersections(e,t,ti)))}_computeIntersections(e,t,n){let r,i=this.geometry,a=this.material,o=i.index,s=i.attributes.position,c=i.attributes.uv,l=i.attributes.uv1,u=i.attributes.normal,d=i.groups,f=i.drawRange;if(o!==null){if(Array.isArray(a))for(let i=0,s=d.length;i<s;i++){let s=d[i],p=a[s.materialIndex],m=Math.max(s.start,f.start),h=Math.min(o.count,Math.min(s.start+s.count,f.start+f.count));for(let i=m,a=h;i<a;i+=3){let a=o.getX(i),d=o.getX(i+1),f=o.getX(i+2);r=pi(this,p,e,n,c,l,u,a,d,f),r&&(r.faceIndex=Math.floor(i/3),r.face.materialIndex=s.materialIndex,t.push(r))}}else{let i=Math.max(0,f.start),s=Math.min(o.count,f.start+f.count);for(let d=i,f=s;d<f;d+=3){let i=o.getX(d),s=o.getX(d+1),f=o.getX(d+2);r=pi(this,a,e,n,c,l,u,i,s,f),r&&(r.faceIndex=Math.floor(d/3),t.push(r))}}}else if(s!==void 0){if(Array.isArray(a))for(let i=0,o=d.length;i<o;i++){let o=d[i],p=a[o.materialIndex],m=Math.max(o.start,f.start),h=Math.min(s.count,Math.min(o.start+o.count,f.start+f.count));for(let i=m,a=h;i<a;i+=3){let a=i,s=i+1,d=i+2;r=pi(this,p,e,n,c,l,u,a,s,d),r&&(r.faceIndex=Math.floor(i/3),r.face.materialIndex=o.materialIndex,t.push(r))}}else{let i=Math.max(0,f.start),o=Math.min(s.count,f.start+f.count);for(let s=i,d=o;s<d;s+=3){let i=s,o=s+1,d=s+2;r=pi(this,a,e,n,c,l,u,i,o,d),r&&(r.faceIndex=Math.floor(s/3),t.push(r))}}}}};function fi(e,t,n,r,i,a,o,s){let c;if(c=t.side===1?r.intersectTriangle(o,a,i,!0,s):r.intersectTriangle(i,a,o,t.side===0,s),c===null)return null;ui.copy(s),ui.applyMatrix4(e.matrixWorld);let l=n.ray.origin.distanceTo(ui);return l<n.near||l>n.far?null:{distance:l,point:ui.clone(),object:e}}function pi(e,t,n,r,i,a,o,s,c,l){e.getVertexPosition(s,ii),e.getVertexPosition(c,ai),e.getVertexPosition(l,oi);let u=fi(e,t,n,r,ii,ai,oi,li);if(u){let e=new Y;sr.getBarycoord(li,ii,ai,oi,e),i&&(u.uv=sr.getInterpolatedAttribute(i,s,c,l,e,new J)),a&&(u.uv1=sr.getInterpolatedAttribute(a,s,c,l,e,new J)),o&&(u.normal=sr.getInterpolatedAttribute(o,s,c,l,e,new Y),u.normal.dot(r.direction)>0&&u.normal.multiplyScalar(-1));let t={a:s,b:c,c:l,normal:new Y,materialIndex:0};sr.getNormal(ii,ai,oi,t.normal),u.face=t,u.barycoord=e}return u}var mi=class extends an{constructor(e=null,t=1,n=1,r,i,a,o,s,c=S,l=S,u,d){super(null,a,o,s,c,l,r,i,u,d),this.isDataTexture=!0,this.image={data:e,width:t,height:n},this.generateMipmaps=!1,this.flipY=!1,this.unpackAlignment=1}},hi=new Nr,gi=new J(.5,.5),_i=new Y,vi=class{constructor(e=new Gr,t=new Gr,n=new Gr,r=new Gr,i=new Gr,a=new Gr){this.planes=[e,t,n,r,i,a]}set(e,t,n,r,i,a){let o=this.planes;return o[0].copy(e),o[1].copy(t),o[2].copy(n),o[3].copy(r),o[4].copy(i),o[5].copy(a),this}copy(e){let t=this.planes;for(let n=0;n<6;n++)t[n].copy(e.planes[n]);return this}setFromProjectionMatrix(e,t=tt,n=!1){let r=this.planes,i=e.elements,a=i[0],o=i[1],s=i[2],c=i[3],l=i[4],u=i[5],d=i[6],f=i[7],p=i[8],m=i[9],h=i[10],g=i[11],_=i[12],v=i[13],y=i[14],b=i[15];if(r[0].setComponents(c-a,f-l,g-p,b-_).normalize(),r[1].setComponents(c+a,f+l,g+p,b+_).normalize(),r[2].setComponents(c+o,f+u,g+m,b+v).normalize(),r[3].setComponents(c-o,f-u,g-m,b-v).normalize(),n)r[4].setComponents(s,d,h,y).normalize(),r[5].setComponents(c-s,f-d,g-h,b-y).normalize();else if(r[4].setComponents(c-s,f-d,g-h,b-y).normalize(),t===2e3)r[5].setComponents(c+s,f+d,g+h,b+y).normalize();else if(t===2001)r[5].setComponents(s,d,h,y).normalize();else throw Error(`THREE.Frustum.setFromProjectionMatrix(): Invalid coordinate system: `+t);return this}intersectsObject(e){if(e.boundingSphere!==void 0)e.boundingSphere===null&&e.computeBoundingSphere(),hi.copy(e.boundingSphere).applyMatrix4(e.matrixWorld);else{let t=e.geometry;t.boundingSphere===null&&t.computeBoundingSphere(),hi.copy(t.boundingSphere).applyMatrix4(e.matrixWorld)}return this.intersectsSphere(hi)}intersectsSprite(e){return hi.center.set(0,0,0),hi.radius=.7071067811865476+gi.distanceTo(e.center),hi.applyMatrix4(e.matrixWorld),this.intersectsSphere(hi)}intersectsSphere(e){let t=this.planes,n=e.center,r=-e.radius;for(let e=0;e<6;e++)if(t[e].distanceToPoint(n)<r)return!1;return!0}intersectsBox(e){let t=this.planes;for(let n=0;n<6;n++){let r=t[n];if(_i.x=r.normal.x>0?e.max.x:e.min.x,_i.y=r.normal.y>0?e.max.y:e.min.y,_i.z=r.normal.z>0?e.max.z:e.min.z,r.distanceToPoint(_i)<0)return!1}return!0}containsPoint(e){let t=this.planes;for(let n=0;n<6;n++)if(t[n].distanceToPoint(e)<0)return!1;return!0}clone(){return new this.constructor().copy(this)}},yi=class extends qr{constructor(e){super(),this.isLineBasicMaterial=!0,this.type=`LineBasicMaterial`,this.color=new X(16777215),this.map=null,this.linewidth=1,this.linecap=`round`,this.linejoin=`round`,this.fog=!0,this.setValues(e)}copy(e){return super.copy(e),this.color.copy(e.color),this.map=e.map,this.linewidth=e.linewidth,this.linecap=e.linecap,this.linejoin=e.linejoin,this.fog=e.fog,this}},bi=new Y,xi=new Y,Si=new dn,Ci=new Qr,wi=new Nr,Ti=new Y,Ei=new Y,Di=class extends Rn{constructor(e=new Vr,t=new yi){super(),this.isLine=!0,this.type=`Line`,this.geometry=e,this.material=t,this.morphTargetDictionary=void 0,this.morphTargetInfluences=void 0,this.updateMorphTargets()}copy(e,t){return super.copy(e,t),this.material=Array.isArray(e.material)?e.material.slice():e.material,this.geometry=e.geometry,this}computeLineDistances(){let e=this.geometry;if(e.index===null){let t=e.attributes.position,n=[0];for(let e=1,r=t.count;e<r;e++)bi.fromBufferAttribute(t,e-1),xi.fromBufferAttribute(t,e),n[e]=n[e-1],n[e]+=bi.distanceTo(xi);e.setAttribute(`lineDistance`,new kr(n,1))}else K(`Line.computeLineDistances(): Computation only possible with non-indexed BufferGeometry.`);return this}intersectsFrustum(e){return e.intersectsObject(this)}raycast(e,t){let n=this.geometry,r=this.matrixWorld,i=e.params.Line.threshold,a=n.drawRange;if(n.boundingSphere===null&&n.computeBoundingSphere(),wi.copy(n.boundingSphere),wi.applyMatrix4(r),wi.radius+=i,e.ray.intersectsSphere(wi)===!1)return;Si.copy(r).invert(),Ci.copy(e.ray).applyMatrix4(Si);let o=i/((this.scale.x+this.scale.y+this.scale.z)/3),s=o*o,c=this.isLineSegments?2:1,l=n.index,u=n.attributes.position;if(l!==null){let n=Math.max(0,a.start),r=Math.min(l.count,a.start+a.count);for(let i=n,a=r-1;i<a;i+=c){let n=l.getX(i),r=l.getX(i+1),a=Oi(this,e,Ci,s,n,r,i);a&&t.push(a)}if(this.isLineLoop){let i=l.getX(r-1),a=l.getX(n),o=Oi(this,e,Ci,s,i,a,r-1);o&&t.push(o)}}else{let n=Math.max(0,a.start),r=Math.min(u.count,a.start+a.count);for(let i=n,a=r-1;i<a;i+=c){let n=Oi(this,e,Ci,s,i,i+1,i);n&&t.push(n)}if(this.isLineLoop){let i=Oi(this,e,Ci,s,r-1,n,r-1);i&&t.push(i)}}}updateMorphTargets(){let e=this.geometry.morphAttributes,t=Object.keys(e);if(t.length>0){let n=e[t[0]];if(n!==void 0){this.morphTargetInfluences=[],this.morphTargetDictionary={};for(let e=0,t=n.length;e<t;e++){let t=n[e].name||String(e);this.morphTargetInfluences.push(0),this.morphTargetDictionary[t]=e}}}}};function Oi(e,t,n,r,i,a,o){let s=e.geometry.attributes.position;if(bi.fromBufferAttribute(s,i),xi.fromBufferAttribute(s,a),n.distanceSqToSegment(bi,xi,Ti,Ei)>r)return;Ti.applyMatrix4(e.matrixWorld);let c=t.ray.origin.distanceTo(Ti);if(!(c<t.near||c>t.far))return{distance:c,point:Ei.clone().applyMatrix4(e.matrixWorld),index:o,face:null,faceIndex:null,barycoord:null,object:e}}var ki=new Y,Ai=new Y,ji=class extends Di{constructor(e,t){super(e,t),this.isLineSegments=!0,this.type=`LineSegments`}computeLineDistances(){let e=this.geometry;if(e.index===null){let t=e.attributes.position,n=[];for(let e=0,r=t.count;e<r;e+=2)ki.fromBufferAttribute(t,e),Ai.fromBufferAttribute(t,e+1),n[e]=e===0?0:n[e-1],n[e+1]=n[e]+ki.distanceTo(Ai);e.setAttribute(`lineDistance`,new kr(n,1))}else K(`LineSegments.computeLineDistances(): Computation only possible with non-indexed BufferGeometry.`);return this}},Mi=class extends an{constructor(e=[],t=301,n,r,i,a,o,s,c,l){super(e,t,n,r,i,a,o,s,c,l),this.isCubeTexture=!0,this.flipY=!1}get images(){return this.image}set images(e){this.image=e}},Ni=class extends an{constructor(e,t,n,r,i,a,o,s,c){super(e,t,n,r,i,a,o,s,c),this.isCanvasTexture=!0,this.needsUpdate=!0}},Pi=class extends an{constructor(e,t,n=N,r,i,a,o=S,s=S,c,l=H,u=1){if(l!==1026&&l!==1027)throw Error(`THREE.DepthTexture: format must be either THREE.DepthFormat or THREE.DepthStencilFormat`);super({width:e,height:t,depth:u},r,i,a,o,s,l,n,c),this.isDepthTexture=!0,this.flipY=!1,this.generateMipmaps=!1,this.compareFunction=null}copy(e){return super.copy(e),this.source=new en(Object.assign({},e.image)),this.compareFunction=e.compareFunction,this}toJSON(e){let t=super.toJSON(e);return t.compareFunction=this.compareFunction,t}},Fi=class extends Pi{constructor(e,t=N,n=301,r,i,a=S,o=S,s,c=H){let l={width:e,height:e,depth:1},u=[l,l,l,l,l,l];super(e,e,t,n,r,i,a,o,s,c),this.image=u,this.isCubeDepthTexture=!0,this.isCubeTexture=!0}get images(){return this.image}set images(e){this.image=e}},Ii=class extends an{constructor(e=null){super(),this.sourceTexture=e,this.isExternalTexture=!0}copy(e){return super.copy(e),this.sourceTexture=e.sourceTexture,this}},Li=class e extends Vr{constructor(e=1,t=1,n=1,r=1,i=1,a=1){super(),this.type=`BoxGeometry`,this.parameters={width:e,height:t,depth:n,widthSegments:r,heightSegments:i,depthSegments:a};let o=this;r=Math.floor(r),i=Math.floor(i),a=Math.floor(a);let s=[],c=[],l=[],u=[],d=0,f=0;p(`z`,`y`,`x`,-1,-1,n,t,e,a,i,0),p(`z`,`y`,`x`,1,-1,n,t,-e,a,i,1),p(`x`,`z`,`y`,1,1,e,n,t,r,a,2),p(`x`,`z`,`y`,1,-1,e,n,-t,r,a,3),p(`x`,`y`,`z`,1,-1,e,t,n,r,i,4),p(`x`,`y`,`z`,-1,-1,e,t,-n,r,i,5),this.setIndex(s),this.setAttribute(`position`,new kr(c,3)),this.setAttribute(`normal`,new kr(l,3)),this.setAttribute(`uv`,new kr(u,2));function p(e,t,n,r,i,a,p,m,h,g,_){let v=a/h,y=p/g,b=a/2,x=p/2,S=m/2,C=h+1,w=g+1,T=0,E=0,D=new Y;for(let a=0;a<w;a++){let o=a*y-x;for(let s=0;s<C;s++)D[e]=(s*v-b)*r,D[t]=o*i,D[n]=S,c.push(D.x,D.y,D.z),D[e]=0,D[t]=0,D[n]=m>0?1:-1,l.push(D.x,D.y,D.z),u.push(s/h),u.push(1-a/g),T+=1}for(let e=0;e<g;e++)for(let t=0;t<h;t++){let n=d+t+C*e,r=d+t+C*(e+1),i=d+(t+1)+C*(e+1),a=d+(t+1)+C*e;s.push(n,r,a),s.push(r,i,a),E+=6}o.addGroup(f,E,_),f+=E,d+=T}}copy(e){return super.copy(e),this.parameters=Object.assign({},e.parameters),this}static fromJSON(t){return new e(t.width,t.height,t.depth,t.widthSegments,t.heightSegments,t.depthSegments)}},Ri=class{constructor(){this.type=`Curve`,this.arcLengthDivisions=200,this.needsUpdate=!1,this.cacheArcLengths=null}getPoint(){K(`Curve: .getPoint() not implemented.`)}getPointAt(e,t){let n=this.getUtoTmapping(e);return this.getPoint(n,t)}getPoints(e=5){let t=[];for(let n=0;n<=e;n++)t.push(this.getPoint(n/e));return t}getSpacedPoints(e=5){let t=[];for(let n=0;n<=e;n++)t.push(this.getPointAt(n/e));return t}getLength(){let e=this.getLengths();return e[e.length-1]}getLengths(e=this.arcLengthDivisions){if(this.cacheArcLengths&&this.cacheArcLengths.length===e+1&&!this.needsUpdate)return this.cacheArcLengths;this.needsUpdate=!1;let t=[],n,r=this.getPoint(0),i=0;t.push(0);for(let a=1;a<=e;a++)n=this.getPoint(a/e),i+=n.distanceTo(r),t.push(i),r=n;return this.cacheArcLengths=t,t}updateArcLengths(){this.needsUpdate=!0,this.getLengths()}getUtoTmapping(e,t=null){let n=this.getLengths(),r=0,i=n.length,a;a=t||e*n[i-1];let o=0,s=i-1,c;for(;o<=s;)if(r=Math.floor(o+(s-o)/2),c=n[r]-a,c<0)o=r+1;else if(c>0)s=r-1;else{s=r;break}if(r=s,n[r]===a)return r/(i-1);let l=n[r],u=n[r+1]-l,d=(a-l)/u;return(r+d)/(i-1)}getTangent(e,t){let n=1e-4,r=e-n,i=e+n;r<0&&(r=0),i>1&&(i=1);let a=this.getPoint(r),o=this.getPoint(i),s=t||(a.isVector2?new J:new Y);return s.copy(o).sub(a).normalize(),s}getTangentAt(e,t){let n=this.getUtoTmapping(e);return this.getTangent(n,t)}computeFrenetFrames(e,t=!1){let n=new Y,r=[],i=[],a=[],o=new Y,s=new dn;for(let t=0;t<=e;t++){let n=t/e;r[t]=this.getTangentAt(n,new Y)}i[0]=new Y,a[0]=new Y;let c=Number.MAX_VALUE,l=Math.abs(r[0].x),u=Math.abs(r[0].y),d=Math.abs(r[0].z);l<=c&&(c=l,n.set(1,0,0)),u<=c&&(c=u,n.set(0,1,0)),d<=c&&n.set(0,0,1),o.crossVectors(r[0],n).normalize(),i[0].crossVectors(r[0],o),a[0].crossVectors(r[0],i[0]);for(let t=1;t<=e;t++){if(i[t]=i[t-1].clone(),a[t]=a[t-1].clone(),o.crossVectors(r[t-1],r[t]),o.length()>2**-52){o.normalize();let e=Math.acos(vt(r[t-1].dot(r[t]),-1,1));i[t].applyMatrix4(s.makeRotationAxis(o,e))}a[t].crossVectors(r[t],i[t])}if(t===!0){let t=Math.acos(vt(i[0].dot(i[e]),-1,1));t/=e,r[0].dot(o.crossVectors(i[0],i[e]))>0&&(t=-t);for(let n=1;n<=e;n++)i[n].applyMatrix4(s.makeRotationAxis(r[n],t*n)),a[n].crossVectors(r[n],i[n])}return{tangents:r,normals:i,binormals:a}}clone(){return new this.constructor().copy(this)}copy(e){return this.arcLengthDivisions=e.arcLengthDivisions,this}toJSON(){let e={metadata:{version:4.7,type:`Curve`,generator:`Curve.toJSON`}};return e.arcLengthDivisions=this.arcLengthDivisions,e.type=this.type,e}fromJSON(e){return this.arcLengthDivisions=e.arcLengthDivisions,this}},zi=class extends Ri{constructor(e=0,t=0,n=1,r=1,i=0,a=Math.PI*2,o=!1,s=0){super(),this.isEllipseCurve=!0,this.type=`EllipseCurve`,this.aX=e,this.aY=t,this.xRadius=n,this.yRadius=r,this.aStartAngle=i,this.aEndAngle=a,this.aClockwise=o,this.aRotation=s}getPoint(e,t=new J){let n=t,r=Math.PI*2,i=this.aEndAngle-this.aStartAngle,a=Math.abs(i)<2**-52;for(;i<0;)i+=r;for(;i>r;)i-=r;i<2**-52&&(i=a?0:r),this.aClockwise===!0&&!a&&(i===r?i=-r:i-=r);let o=this.aStartAngle+e*i,s=this.aX+this.xRadius*Math.cos(o),c=this.aY+this.yRadius*Math.sin(o);if(this.aRotation!==0){let e=Math.cos(this.aRotation),t=Math.sin(this.aRotation),n=s-this.aX,r=c-this.aY;s=n*e-r*t+this.aX,c=n*t+r*e+this.aY}return n.set(s,c)}copy(e){return super.copy(e),this.aX=e.aX,this.aY=e.aY,this.xRadius=e.xRadius,this.yRadius=e.yRadius,this.aStartAngle=e.aStartAngle,this.aEndAngle=e.aEndAngle,this.aClockwise=e.aClockwise,this.aRotation=e.aRotation,this}toJSON(){let e=super.toJSON();return e.aX=this.aX,e.aY=this.aY,e.xRadius=this.xRadius,e.yRadius=this.yRadius,e.aStartAngle=this.aStartAngle,e.aEndAngle=this.aEndAngle,e.aClockwise=this.aClockwise,e.aRotation=this.aRotation,e}fromJSON(e){return super.fromJSON(e),this.aX=e.aX,this.aY=e.aY,this.xRadius=e.xRadius,this.yRadius=e.yRadius,this.aStartAngle=e.aStartAngle,this.aEndAngle=e.aEndAngle,this.aClockwise=e.aClockwise,this.aRotation=e.aRotation,this}},Bi=class extends zi{constructor(e,t,n,r,i,a){super(e,t,n,n,r,i,a),this.isArcCurve=!0,this.type=`ArcCurve`}};function Vi(){let e=0,t=0,n=0,r=0;function i(i,a,o,s){e=i,t=o,n=-3*i+3*a-2*o-s,r=2*i-2*a+o+s}return{initCatmullRom:function(e,t,n,r,a){i(t,n,a*(n-e),a*(r-t))},initNonuniformCatmullRom:function(e,t,n,r,a,o,s){let c=(t-e)/a-(n-e)/(a+o)+(n-t)/o,l=(n-t)/o-(r-t)/(o+s)+(r-n)/s;c*=o,l*=o,i(t,n,c,l)},calc:function(i){let a=i*i,o=a*i;return e+t*i+n*a+r*o}}}var Hi=new Y,Ui=new Y,Wi=new Vi,Gi=new Vi,Ki=new Vi,qi=class extends Ri{constructor(e=[],t=!1,n=`centripetal`,r=.5){super(),this.isCatmullRomCurve3=!0,this.type=`CatmullRomCurve3`,this.points=e,this.closed=t,this.curveType=n,this.tension=r}getPoint(e,t=new Y){let n=t,r=this.points,i=r.length,a=(i-+!this.closed)*e,o=Math.floor(a),s=a-o;this.closed?o+=o>0?0:(Math.floor(Math.abs(o)/i)+1)*i:s===0&&o===i-1&&(o=i-2,s=1);let c,l;this.closed||o>0?c=r[(o-1)%i]:(Ui.subVectors(r[0],r[1]).add(r[0]),c=Ui);let u=r[o%i],d=r[(o+1)%i];if(this.closed||o+2<i?l=r[(o+2)%i]:(Hi.subVectors(r[i-1],r[i-2]).add(r[i-1]),l=Hi),this.curveType===`centripetal`||this.curveType===`chordal`){let e=this.curveType===`chordal`?.5:.25,t=c.distanceToSquared(u)**+e,n=u.distanceToSquared(d)**+e,r=d.distanceToSquared(l)**+e;n<1e-4&&(n=1),t<1e-4&&(t=n),r<1e-4&&(r=n),Wi.initNonuniformCatmullRom(c.x,u.x,d.x,l.x,t,n,r),Gi.initNonuniformCatmullRom(c.y,u.y,d.y,l.y,t,n,r),Ki.initNonuniformCatmullRom(c.z,u.z,d.z,l.z,t,n,r)}else this.curveType===`catmullrom`&&(Wi.initCatmullRom(c.x,u.x,d.x,l.x,this.tension),Gi.initCatmullRom(c.y,u.y,d.y,l.y,this.tension),Ki.initCatmullRom(c.z,u.z,d.z,l.z,this.tension));return n.set(Wi.calc(s),Gi.calc(s),Ki.calc(s)),n}copy(e){super.copy(e),this.points=[];for(let t=0,n=e.points.length;t<n;t++){let n=e.points[t];this.points.push(n.clone())}return this.closed=e.closed,this.curveType=e.curveType,this.tension=e.tension,this}toJSON(){let e=super.toJSON();e.points=[];for(let t=0,n=this.points.length;t<n;t++){let n=this.points[t];e.points.push(n.toArray())}return e.closed=this.closed,e.curveType=this.curveType,e.tension=this.tension,e}fromJSON(e){super.fromJSON(e),this.points=[];for(let t=0,n=e.points.length;t<n;t++){let n=e.points[t];this.points.push(new Y().fromArray(n))}return this.closed=e.closed,this.curveType=e.curveType,this.tension=e.tension,this}};function Ji(e,t,n,r,i){let a=(r-t)*.5,o=(i-n)*.5,s=e*e,c=e*s;return(2*n-2*r+a+o)*c+(-3*n+3*r-2*a-o)*s+a*e+n}function Yi(e,t){let n=1-e;return n*n*t}function Xi(e,t){return 2*(1-e)*e*t}function Zi(e,t){return e*e*t}function Qi(e,t,n,r){return Yi(e,t)+Xi(e,n)+Zi(e,r)}function $i(e,t){let n=1-e;return n*n*n*t}function ea(e,t){let n=1-e;return 3*n*n*e*t}function ta(e,t){return 3*(1-e)*e*e*t}function na(e,t){return e*e*e*t}function ra(e,t,n,r,i){return $i(e,t)+ea(e,n)+ta(e,r)+na(e,i)}var ia=class extends Ri{constructor(e=new J,t=new J,n=new J,r=new J){super(),this.isCubicBezierCurve=!0,this.type=`CubicBezierCurve`,this.v0=e,this.v1=t,this.v2=n,this.v3=r}getPoint(e,t=new J){let n=t,r=this.v0,i=this.v1,a=this.v2,o=this.v3;return n.set(ra(e,r.x,i.x,a.x,o.x),ra(e,r.y,i.y,a.y,o.y)),n}copy(e){return super.copy(e),this.v0.copy(e.v0),this.v1.copy(e.v1),this.v2.copy(e.v2),this.v3.copy(e.v3),this}toJSON(){let e=super.toJSON();return e.v0=this.v0.toArray(),e.v1=this.v1.toArray(),e.v2=this.v2.toArray(),e.v3=this.v3.toArray(),e}fromJSON(e){return super.fromJSON(e),this.v0.fromArray(e.v0),this.v1.fromArray(e.v1),this.v2.fromArray(e.v2),this.v3.fromArray(e.v3),this}},aa=class extends Ri{constructor(e=new Y,t=new Y,n=new Y,r=new Y){super(),this.isCubicBezierCurve3=!0,this.type=`CubicBezierCurve3`,this.v0=e,this.v1=t,this.v2=n,this.v3=r}getPoint(e,t=new Y){let n=t,r=this.v0,i=this.v1,a=this.v2,o=this.v3;return n.set(ra(e,r.x,i.x,a.x,o.x),ra(e,r.y,i.y,a.y,o.y),ra(e,r.z,i.z,a.z,o.z)),n}copy(e){return super.copy(e),this.v0.copy(e.v0),this.v1.copy(e.v1),this.v2.copy(e.v2),this.v3.copy(e.v3),this}toJSON(){let e=super.toJSON();return e.v0=this.v0.toArray(),e.v1=this.v1.toArray(),e.v2=this.v2.toArray(),e.v3=this.v3.toArray(),e}fromJSON(e){return super.fromJSON(e),this.v0.fromArray(e.v0),this.v1.fromArray(e.v1),this.v2.fromArray(e.v2),this.v3.fromArray(e.v3),this}},oa=Object.freeze({__proto__:null,ArcCurve:Bi,CatmullRomCurve3:qi,CubicBezierCurve:ia,CubicBezierCurve3:aa,EllipseCurve:zi,LineCurve:class extends Ri{constructor(e=new J,t=new J){super(),this.isLineCurve=!0,this.type=`LineCurve`,this.v1=e,this.v2=t}getPoint(e,t=new J){let n=t;return e===1?n.copy(this.v2):(n.copy(this.v2).sub(this.v1),n.multiplyScalar(e).add(this.v1)),n}getPointAt(e,t){return this.getPoint(e,t)}getTangent(e,t=new J){return t.subVectors(this.v2,this.v1).normalize()}getTangentAt(e,t){return this.getTangent(e,t)}copy(e){return super.copy(e),this.v1.copy(e.v1),this.v2.copy(e.v2),this}toJSON(){let e=super.toJSON();return e.v1=this.v1.toArray(),e.v2=this.v2.toArray(),e}fromJSON(e){return super.fromJSON(e),this.v1.fromArray(e.v1),this.v2.fromArray(e.v2),this}},LineCurve3:class extends Ri{constructor(e=new Y,t=new Y){super(),this.isLineCurve3=!0,this.type=`LineCurve3`,this.v1=e,this.v2=t}getPoint(e,t=new Y){let n=t;return e===1?n.copy(this.v2):(n.copy(this.v2).sub(this.v1),n.multiplyScalar(e).add(this.v1)),n}getPointAt(e,t){return this.getPoint(e,t)}getTangent(e,t=new Y){return t.subVectors(this.v2,this.v1).normalize()}getTangentAt(e,t){return this.getTangent(e,t)}copy(e){return super.copy(e),this.v1.copy(e.v1),this.v2.copy(e.v2),this}toJSON(){let e=super.toJSON();return e.v1=this.v1.toArray(),e.v2=this.v2.toArray(),e}fromJSON(e){return super.fromJSON(e),this.v1.fromArray(e.v1),this.v2.fromArray(e.v2),this}},QuadraticBezierCurve:class extends Ri{constructor(e=new J,t=new J,n=new J){super(),this.isQuadraticBezierCurve=!0,this.type=`QuadraticBezierCurve`,this.v0=e,this.v1=t,this.v2=n}getPoint(e,t=new J){let n=t,r=this.v0,i=this.v1,a=this.v2;return n.set(Qi(e,r.x,i.x,a.x),Qi(e,r.y,i.y,a.y)),n}copy(e){return super.copy(e),this.v0.copy(e.v0),this.v1.copy(e.v1),this.v2.copy(e.v2),this}toJSON(){let e=super.toJSON();return e.v0=this.v0.toArray(),e.v1=this.v1.toArray(),e.v2=this.v2.toArray(),e}fromJSON(e){return super.fromJSON(e),this.v0.fromArray(e.v0),this.v1.fromArray(e.v1),this.v2.fromArray(e.v2),this}},QuadraticBezierCurve3:class extends Ri{constructor(e=new Y,t=new Y,n=new Y){super(),this.isQuadraticBezierCurve3=!0,this.type=`QuadraticBezierCurve3`,this.v0=e,this.v1=t,this.v2=n}getPoint(e,t=new Y){let n=t,r=this.v0,i=this.v1,a=this.v2;return n.set(Qi(e,r.x,i.x,a.x),Qi(e,r.y,i.y,a.y),Qi(e,r.z,i.z,a.z)),n}copy(e){return super.copy(e),this.v0.copy(e.v0),this.v1.copy(e.v1),this.v2.copy(e.v2),this}toJSON(){let e=super.toJSON();return e.v0=this.v0.toArray(),e.v1=this.v1.toArray(),e.v2=this.v2.toArray(),e}fromJSON(e){return super.fromJSON(e),this.v0.fromArray(e.v0),this.v1.fromArray(e.v1),this.v2.fromArray(e.v2),this}},SplineCurve:class extends Ri{constructor(e=[]){super(),this.isSplineCurve=!0,this.type=`SplineCurve`,this.points=e}getPoint(e,t=new J){let n=t,r=this.points,i=(r.length-1)*e,a=Math.floor(i),o=i-a,s=r[a===0?a:a-1],c=r[a],l=r[a>r.length-2?r.length-1:a+1],u=r[a>r.length-3?r.length-1:a+2];return n.set(Ji(o,s.x,c.x,l.x,u.x),Ji(o,s.y,c.y,l.y,u.y)),n}copy(e){super.copy(e),this.points=[];for(let t=0,n=e.points.length;t<n;t++){let n=e.points[t];this.points.push(n.clone())}return this}toJSON(){let e=super.toJSON();e.points=[];for(let t=0,n=this.points.length;t<n;t++){let n=this.points[t];e.points.push(n.toArray())}return e}fromJSON(e){super.fromJSON(e),this.points=[];for(let t=0,n=e.points.length;t<n;t++){let n=e.points[t];this.points.push(new J().fromArray(n))}return this}}}),sa=class extends Ri{constructor(){super(),this.type=`CurvePath`,this.curves=[],this.autoClose=!1}add(e){this.curves.push(e)}closePath(){let e=this.curves[0].getPoint(0),t=this.curves[this.curves.length-1].getPoint(1);if(!e.equals(t)){let n=e.isVector2===!0?`LineCurve`:`LineCurve3`;this.curves.push(new oa[n](t,e))}return this}getPoint(e,t){let n=e*this.getLength(),r=this.getCurveLengths(),i=0;for(;i<r.length;){if(r[i]>=n){let e=r[i]-n,a=this.curves[i],o=a.getLength(),s=o===0?0:1-e/o;return a.getPointAt(s,t)}i++}return null}getLength(){let e=this.getCurveLengths();return e[e.length-1]}updateArcLengths(){this.needsUpdate=!0,this.cacheLengths=null,this.getCurveLengths()}getCurveLengths(){if(this.cacheLengths&&this.cacheLengths.length===this.curves.length)return this.cacheLengths;let e=[],t=0;for(let n=0,r=this.curves.length;n<r;n++)t+=this.curves[n].getLength(),e.push(t);return this.cacheLengths=e,e}getSpacedPoints(e=40){let t=[];for(let n=0;n<=e;n++)t.push(this.getPoint(n/e));return this.autoClose&&t.push(t[0]),t}getPoints(e=12){let t=[],n;for(let r=0,i=this.curves;r<i.length;r++){let a=i[r],o=a.isEllipseCurve?e*2:a.isLineCurve||a.isLineCurve3?1:a.isSplineCurve?e*a.points.length:e,s=a.getPoints(o);for(let e=0;e<s.length;e++){let r=s[e];n&&n.equals(r)||(t.push(r),n=r)}}return this.autoClose&&t.length>1&&!t[t.length-1].equals(t[0])&&t.push(t[0]),t}copy(e){super.copy(e),this.curves=[];for(let t=0,n=e.curves.length;t<n;t++){let n=e.curves[t];this.curves.push(n.clone())}return this.autoClose=e.autoClose,this}toJSON(){let e=super.toJSON();e.autoClose=this.autoClose,e.curves=[];for(let t=0,n=this.curves.length;t<n;t++){let n=this.curves[t];e.curves.push(n.toJSON())}return e}fromJSON(e){super.fromJSON(e),this.autoClose=e.autoClose,this.curves=[];for(let t=0,n=e.curves.length;t<n;t++){let n=e.curves[t];this.curves.push(new oa[n.type]().fromJSON(n))}return this}},ca=class e extends Vr{constructor(e=1,t=1,n=1,r=1){super(),this.type=`PlaneGeometry`,this.parameters={width:e,height:t,widthSegments:n,heightSegments:r};let i=e/2,a=t/2,o=Math.floor(n),s=Math.floor(r),c=o+1,l=s+1,u=e/o,d=t/s,f=[],p=[],m=[],h=[];for(let e=0;e<l;e++){let t=e*d-a;for(let n=0;n<c;n++){let r=n*u-i;p.push(r,-t,0),m.push(0,0,1),h.push(n/o),h.push(1-e/s)}}for(let e=0;e<s;e++)for(let t=0;t<o;t++){let n=t+c*e,r=t+c*(e+1),i=t+1+c*(e+1),a=t+1+c*e;f.push(n,r,a),f.push(r,i,a)}this.setIndex(f),this.setAttribute(`position`,new kr(p,3)),this.setAttribute(`normal`,new kr(m,3)),this.setAttribute(`uv`,new kr(h,2))}copy(e){return super.copy(e),this.parameters=Object.assign({},e.parameters),this}static fromJSON(t){return new e(t.width,t.height,t.widthSegments,t.heightSegments)}};function la(e){let t={};for(let n in e){t[n]={};for(let r in e[n]){let i=e[n][r];if(da(i))i.isRenderTargetTexture?(K(`UniformsUtils: Textures of render targets cannot be cloned via cloneUniforms() or mergeUniforms().`),t[n][r]=null):t[n][r]=i.clone();else if(Array.isArray(i)){if(da(i[0])){let e=[];for(let t=0,n=i.length;t<n;t++)e[t]=i[t].clone();t[n][r]=e}else t[n][r]=i.slice()}else t[n][r]=i}}return t}function ua(e){let t={};for(let n=0;n<e.length;n++){let r=la(e[n]);for(let e in r)t[e]=r[e]}return t}function da(e){return e&&(e.isColor||e.isMatrix3||e.isMatrix4||e.isVector2||e.isVector3||e.isVector4||e.isTexture||e.isQuaternion)}function fa(e){let t=[];for(let n=0;n<e.length;n++)t.push(e[n].clone());return t}function pa(e){let t=e.getRenderTarget();return t===null?e.outputColorSpace:t.isXRRenderTarget===!0?t.texture.colorSpace:Jt.workingColorSpace}var ma={clone:la,merge:ua},ha=`void main() {
	gl_Position = projectionMatrix * modelViewMatrix * vec4( position, 1.0 );
}`,ga=`void main() {
	gl_FragColor = vec4( 1.0, 0.0, 0.0, 1.0 );
}`,_a=class extends qr{constructor(e){super(),this.isShaderMaterial=!0,this.type=`ShaderMaterial`,this.defines={},this.uniforms={},this.uniformsGroups=[],this.vertexShader=ha,this.fragmentShader=ga,this.linewidth=1,this.wireframe=!1,this.wireframeLinewidth=1,this.fog=!1,this.lights=!1,this.clipping=!1,this.forceSinglePass=!0,this.extensions={clipCullDistance:!1,multiDraw:!1},this.defaultAttributeValues={color:[1,1,1],uv:[0,0],uv1:[0,0]},this.index0AttributeName=void 0,this.uniformsNeedUpdate=!1,this.glslVersion=null,e!==void 0&&this.setValues(e)}copy(e){return super.copy(e),this.fragmentShader=e.fragmentShader,this.vertexShader=e.vertexShader,this.uniforms=la(e.uniforms),this.uniformsGroups=fa(e.uniformsGroups),this.defines=Object.assign({},e.defines),this.wireframe=e.wireframe,this.wireframeLinewidth=e.wireframeLinewidth,this.fog=e.fog,this.lights=e.lights,this.clipping=e.clipping,this.extensions=Object.assign({},e.extensions),this.glslVersion=e.glslVersion,this.defaultAttributeValues=Object.assign({},e.defaultAttributeValues),this.index0AttributeName=e.index0AttributeName,this.uniformsNeedUpdate=e.uniformsNeedUpdate,this}toJSON(e){let t=super.toJSON(e);t.glslVersion=this.glslVersion,t.uniforms={};for(let n in this.uniforms){let r=this.uniforms[n].value;r&&r.isTexture?t.uniforms[n]={type:`t`,value:r.toJSON(e).uuid}:r&&r.isColor?t.uniforms[n]={type:`c`,value:r.getHex()}:r&&r.isVector2?t.uniforms[n]={type:`v2`,value:r.toArray()}:r&&r.isVector3?t.uniforms[n]={type:`v3`,value:r.toArray()}:r&&r.isVector4?t.uniforms[n]={type:`v4`,value:r.toArray()}:r&&r.isMatrix3?t.uniforms[n]={type:`m3`,value:r.toArray()}:r&&r.isMatrix4?t.uniforms[n]={type:`m4`,value:r.toArray()}:t.uniforms[n]={value:r}}Object.keys(this.defines).length>0&&(t.defines=this.defines),t.vertexShader=this.vertexShader,t.fragmentShader=this.fragmentShader,t.lights=this.lights,t.clipping=this.clipping;let n={};for(let e in this.extensions)this.extensions[e]===!0&&(n[e]=!0);return Object.keys(n).length>0&&(t.extensions=n),t}fromJSON(e,t){if(super.fromJSON(e,t),e.uniforms!==void 0)for(let n in e.uniforms){let r=e.uniforms[n];switch(this.uniforms[n]={},r.type){case`t`:this.uniforms[n].value=t[r.value]||null;break;case`c`:this.uniforms[n].value=new X().setHex(r.value);break;case`v2`:this.uniforms[n].value=new J().fromArray(r.value);break;case`v3`:this.uniforms[n].value=new Y().fromArray(r.value);break;case`v4`:this.uniforms[n].value=new on().fromArray(r.value);break;case`m3`:this.uniforms[n].value=new Ut().fromArray(r.value);break;case`m4`:this.uniforms[n].value=new dn().fromArray(r.value);break;default:this.uniforms[n].value=r.value}}if(e.defines!==void 0&&(this.defines=e.defines),e.vertexShader!==void 0&&(this.vertexShader=e.vertexShader),e.fragmentShader!==void 0&&(this.fragmentShader=e.fragmentShader),e.glslVersion!==void 0&&(this.glslVersion=e.glslVersion),e.extensions!==void 0)for(let t in e.extensions)this.extensions[t]=e.extensions[t];return e.lights!==void 0&&(this.lights=e.lights),e.clipping!==void 0&&(this.clipping=e.clipping),this}},va=class extends _a{constructor(e){super(e),this.isRawShaderMaterial=!0,this.type=`RawShaderMaterial`}},ya=class extends qr{constructor(e){super(),this.isMeshStandardMaterial=!0,this.type=`MeshStandardMaterial`,this.defines={STANDARD:``},this.color=new X(16777215),this.roughness=1,this.metalness=0,this.map=null,this.lightMap=null,this.lightMapIntensity=1,this.aoMap=null,this.aoMapIntensity=1,this.emissive=new X(0),this.emissiveIntensity=1,this.emissiveMap=null,this.bumpMap=null,this.bumpScale=1,this.normalMap=null,this.normalMapType=0,this.normalScale=new J(1,1),this.displacementMap=null,this.displacementScale=1,this.displacementBias=0,this.roughnessMap=null,this.metalnessMap=null,this.alphaMap=null,this.envMap=null,this.envMapRotation=new xn,this.envMapIntensity=1,this.wireframe=!1,this.wireframeLinewidth=1,this.wireframeLinecap=`round`,this.wireframeLinejoin=`round`,this.flatShading=!1,this.fog=!0,this.setValues(e)}copy(e){return super.copy(e),this.defines={STANDARD:``},this.color.copy(e.color),this.roughness=e.roughness,this.metalness=e.metalness,this.map=e.map,this.lightMap=e.lightMap,this.lightMapIntensity=e.lightMapIntensity,this.aoMap=e.aoMap,this.aoMapIntensity=e.aoMapIntensity,this.emissive.copy(e.emissive),this.emissiveMap=e.emissiveMap,this.emissiveIntensity=e.emissiveIntensity,this.bumpMap=e.bumpMap,this.bumpScale=e.bumpScale,this.normalMap=e.normalMap,this.normalMapType=e.normalMapType,this.normalScale.copy(e.normalScale),this.displacementMap=e.displacementMap,this.displacementScale=e.displacementScale,this.displacementBias=e.displacementBias,this.roughnessMap=e.roughnessMap,this.metalnessMap=e.metalnessMap,this.alphaMap=e.alphaMap,this.envMap=e.envMap,this.envMapRotation.copy(e.envMapRotation),this.envMapIntensity=e.envMapIntensity,this.wireframe=e.wireframe,this.wireframeLinewidth=e.wireframeLinewidth,this.wireframeLinecap=e.wireframeLinecap,this.wireframeLinejoin=e.wireframeLinejoin,this.flatShading=e.flatShading,this.fog=e.fog,this}},ba=class extends ya{constructor(e){super(),this.isMeshPhysicalMaterial=!0,this.defines={STANDARD:``,PHYSICAL:``},this.type=`MeshPhysicalMaterial`,this.anisotropyRotation=0,this.anisotropyMap=null,this.clearcoatMap=null,this.clearcoatRoughness=0,this.clearcoatRoughnessMap=null,this.clearcoatNormalScale=new J(1,1),this.clearcoatNormalMap=null,this.ior=1.5,Object.defineProperty(this,"reflectivity",{get:function(){return vt(2.5*(this.ior-1)/(this.ior+1),0,1)},set:function(e){this.ior=(1+.4*e)/(1-.4*e)}}),this.iridescenceMap=null,this.iridescenceIOR=1.3,this.iridescenceThicknessRange=[100,400],this.iridescenceThicknessMap=null,this.sheenColor=new X(0),this.sheenColorMap=null,this.sheenRoughness=1,this.sheenRoughnessMap=null,this.transmissionMap=null,this.thickness=0,this.thicknessMap=null,this.attenuationDistance=1/0,this.attenuationColor=new X(1,1,1),this.specularIntensity=1,this.specularIntensityMap=null,this.specularColor=new X(1,1,1),this.specularColorMap=null,this._anisotropy=0,this._clearcoat=0,this._dispersion=0,this._iridescence=0,this._retroreflectivity=0,this._sheen=0,this._transmission=0,this.setValues(e)}get anisotropy(){return this._anisotropy}set anisotropy(e){this._anisotropy>0!=e>0&&this.version++,this._anisotropy=e}get clearcoat(){return this._clearcoat}set clearcoat(e){this._clearcoat>0!=e>0&&this.version++,this._clearcoat=e}get iridescence(){return this._iridescence}set iridescence(e){this._iridescence>0!=e>0&&this.version++,this._iridescence=e}get dispersion(){return this._dispersion}set dispersion(e){this._dispersion>0!=e>0&&this.version++,this._dispersion=e}get retroreflectivity(){return this._retroreflectivity}set retroreflectivity(e){this._retroreflectivity>0!=e>0&&this.version++,this._retroreflectivity=e}get sheen(){return this._sheen}set sheen(e){this._sheen>0!=e>0&&this.version++,this._sheen=e}get transmission(){return this._transmission}set transmission(e){this._transmission>0!=e>0&&this.version++,this._transmission=e}copy(e){return super.copy(e),this.defines={STANDARD:``,PHYSICAL:``},this.anisotropy=e.anisotropy,this.anisotropyRotation=e.anisotropyRotation,this.anisotropyMap=e.anisotropyMap,this.clearcoat=e.clearcoat,this.clearcoatMap=e.clearcoatMap,this.clearcoatRoughness=e.clearcoatRoughness,this.clearcoatRoughnessMap=e.clearcoatRoughnessMap,this.clearcoatNormalMap=e.clearcoatNormalMap,this.clearcoatNormalScale.copy(e.clearcoatNormalScale),this.dispersion=e.dispersion,this.ior=e.ior,this.iridescence=e.iridescence,this.iridescenceMap=e.iridescenceMap,this.iridescenceIOR=e.iridescenceIOR,this.iridescenceThicknessRange=[...e.iridescenceThicknessRange],this.iridescenceThicknessMap=e.iridescenceThicknessMap,this.retroreflectivity=e.retroreflectivity,this.sheen=e.sheen,this.sheenColor.copy(e.sheenColor),this.sheenColorMap=e.sheenColorMap,this.sheenRoughness=e.sheenRoughness,this.sheenRoughnessMap=e.sheenRoughnessMap,this.transmission=e.transmission,this.transmissionMap=e.transmissionMap,this.thickness=e.thickness,this.thicknessMap=e.thicknessMap,this.attenuationDistance=e.attenuationDistance,this.attenuationColor.copy(e.attenuationColor),this.specularIntensity=e.specularIntensity,this.specularIntensityMap=e.specularIntensityMap,this.specularColor.copy(e.specularColor),this.specularColorMap=e.specularColorMap,this}},xa=class extends qr{constructor(e){super(),this.isMeshDepthMaterial=!0,this.type=`MeshDepthMaterial`,this.depthPacking=Je,this.map=null,this.alphaMap=null,this.displacementMap=null,this.displacementScale=1,this.displacementBias=0,this.wireframe=!1,this.wireframeLinewidth=1,this.setValues(e)}copy(e){return super.copy(e),this.depthPacking=e.depthPacking,this.map=e.map,this.alphaMap=e.alphaMap,this.displacementMap=e.displacementMap,this.displacementScale=e.displacementScale,this.displacementBias=e.displacementBias,this.wireframe=e.wireframe,this.wireframeLinewidth=e.wireframeLinewidth,this}},Sa=class extends qr{constructor(e){super(),this.isMeshDistanceMaterial=!0,this.type=`MeshDistanceMaterial`,this.map=null,this.alphaMap=null,this.displacementMap=null,this.displacementScale=1,this.displacementBias=0,this.setValues(e)}copy(e){return super.copy(e),this.map=e.map,this.alphaMap=e.alphaMap,this.displacementMap=e.displacementMap,this.displacementScale=e.displacementScale,this.displacementBias=e.displacementBias,this}};function Ca(e,t){return!e||e.constructor===t?e:typeof t.BYTES_PER_ELEMENT==`number`?new t(e):Array.prototype.slice.call(e)}function wa(e){return e!==void 0&&e.inTangents!==void 0&&e.outTangents!==void 0}var Ta=class{constructor(e,t,n,r){this.parameterPositions=e,this._cachedIndex=0,this.resultBuffer=r===void 0?new t.constructor(n):r,this.sampleValues=t,this.valueSize=n,this.settings=null,this.DefaultSettings_={}}evaluate(e){let t=this.parameterPositions,n=this._cachedIndex,r=t[n],i=t[n-1];validate_interval:{seek:{let a;linear_scan:{forward_scan:if(!(e<r)){for(let a=n+2;;){if(r===void 0){if(e<i)break forward_scan;return n=t.length,this._cachedIndex=n,this.copySampleValue_(n-1)}if(n===a)break;if(i=r,r=t[++n],e<r)break seek}a=t.length;break linear_scan}if(!(e>=i)){let o=t[1];e<o&&(n=2,i=o);for(let a=n-2;;){if(i===void 0)return this._cachedIndex=0,this.copySampleValue_(0);if(n===a)break;if(r=i,i=t[--n-1],e>=i)break seek}a=n,n=0;break linear_scan}break validate_interval}for(;n<a;){let r=n+a>>>1;e<t[r]?a=r:n=r+1}if(r=t[n],i=t[n-1],i===void 0)return this._cachedIndex=0,this.copySampleValue_(0);if(r===void 0)return n=t.length,this._cachedIndex=n,this.copySampleValue_(n-1)}this._cachedIndex=n,this.intervalChanged_(n,i,r)}return this.interpolate_(n,i,e,r)}getSettings_(){return this.settings||this.DefaultSettings_}copySampleValue_(e){let t=this.resultBuffer,n=this.sampleValues,r=this.valueSize,i=e*r;for(let e=0;e!==r;++e)t[e]=n[i+e];return t}interpolate_(){throw Error(`THREE.Interpolant: Call to abstract method.`)}intervalChanged_(){}},Ea=class extends Ta{constructor(e,t,n,r){super(e,t,n,r),this._weightPrev=-0,this._offsetPrev=-0,this._weightNext=-0,this._offsetNext=-0,this.DefaultSettings_={endingStart:Ge,endingEnd:Ge}}intervalChanged_(e,t,n){let r=this.parameterPositions,i=e-2,a=e+1,o=r[i],s=r[a];if(o===void 0)switch(this.getSettings_().endingStart){case Ke:i=e,o=2*t-n;break;case qe:i=r.length-2,o=t+r[i]-r[i+1];break;default:i=e,o=n}if(s===void 0)switch(this.getSettings_().endingEnd){case Ke:a=e,s=2*n-t;break;case qe:a=1,s=n+r[1]-r[0];break;default:a=e-1,s=t}let c=(n-t)*.5,l=this.valueSize;this._weightPrev=c/(t-o),this._weightNext=c/(s-n),this._offsetPrev=i*l,this._offsetNext=a*l}interpolate_(e,t,n,r){let i=this.resultBuffer,a=this.sampleValues,o=this.valueSize,s=e*o,c=s-o,l=this._offsetPrev,u=this._offsetNext,d=this._weightPrev,f=this._weightNext,p=(n-t)/(r-t),m=p*p,h=m*p,g=-d*h+2*d*m-d*p,_=(1+d)*h+(-1.5-2*d)*m+(-.5+d)*p+1,v=(-1-f)*h+(1.5+f)*m+.5*p,y=f*h-f*m;for(let e=0;e!==o;++e)i[e]=g*a[l+e]+_*a[c+e]+v*a[s+e]+y*a[u+e];return i}},Da=class extends Ta{constructor(e,t,n,r){super(e,t,n,r)}interpolate_(e,t,n,r){let i=this.resultBuffer,a=this.sampleValues,o=this.valueSize,s=e*o,c=s-o,l=(n-t)/(r-t),u=1-l;for(let e=0;e!==o;++e)i[e]=a[c+e]*u+a[s+e]*l;return i}},Oa=class extends Ta{constructor(e,t,n,r){super(e,t,n,r)}interpolate_(e){return this.copySampleValue_(e-1)}},ka=class extends Ta{interpolate_(e,t,n,r){let i=this.resultBuffer,a=this.sampleValues,o=this.valueSize,s=e*o,c=s-o,l=this.inTangents,u=this.outTangents;if(!l||!u){let e=(n-t)/(r-t),l=1-e;for(let t=0;t!==o;++t)i[t]=a[c+t]*l+a[s+t]*e;return i}let d=o*2,f=e-1;for(let p=0;p!==o;++p){let o=a[c+p],m=a[s+p],h=f*d+p*2,g=u[h],_=u[h+1],v=e*d+p*2,y=l[v],b=l[v+1],x=Ma(n,t,g,y,r);i[p]=Aa(x,o,_,b,m)}return i}};function Aa(e,t,n,r,i){let a=1-e;return a*a*a*t+3*a*a*e*n+3*a*e*e*r+e*e*e*i}function ja(e,t,n,r,i){let a=1-e;return 3*a*a*(n-t)+6*a*e*(r-n)+3*e*e*(i-r)}function Ma(e,t,n,r,i){let a=(e-t)/(i-t);for(let o=0;o<8;o++){let o=Aa(a,t,n,r,i)-e;if(Math.abs(o)<1e-10)break;let s=ja(a,t,n,r,i);if(Math.abs(s)<1e-10)break;a=Math.max(0,Math.min(1,a-o/s))}return a}var Na=class{constructor(e,t,n,r){if(e===void 0)throw Error(`THREE.KeyframeTrack: track name is undefined`);if(t===void 0||t.length===0)throw Error(`THREE.KeyframeTrack: no keyframes in track named `+e);this.name=e,this.times=Ca(t,this.TimeBufferType),this.values=Ca(n,this.ValueBufferType),this.setInterpolation(r||this.DefaultInterpolation)}static toJSON(e){let t=e.constructor,n;if(t.toJSON!==this.toJSON)n=t.toJSON(e);else{n={name:e.name,times:Ca(e.times,Array),values:Ca(e.values,Array)};let t=e.getInterpolation();t!==e.DefaultInterpolation&&(n.interpolation=t),wa(e.settings)&&(n.settings={inTangents:Ca(e.settings.inTangents,Array),outTangents:Ca(e.settings.outTangents,Array)})}return n.type=e.ValueTypeName,n}InterpolantFactoryMethodDiscrete(e){return new Oa(this.times,this.values,this.getValueSize(),e)}InterpolantFactoryMethodLinear(e){return new Da(this.times,this.values,this.getValueSize(),e)}InterpolantFactoryMethodSmooth(e){return new Ea(this.times,this.values,this.getValueSize(),e)}InterpolantFactoryMethodBezier(e){let t=new ka(this.times,this.values,this.getValueSize(),e);return this.settings&&(t.inTangents=this.settings.inTangents,t.outTangents=this.settings.outTangents),t}setInterpolation(e){let t;switch(e){case Ve:t=this.InterpolantFactoryMethodDiscrete;break;case He:t=this.InterpolantFactoryMethodLinear;break;case Ue:t=this.InterpolantFactoryMethodSmooth;break;case We:t=this.InterpolantFactoryMethodBezier}if(t===void 0){let t=`unsupported interpolation for `+this.ValueTypeName+` keyframe track named `+this.name;if(this.createInterpolant===void 0){if(e!==this.DefaultInterpolation)this.setInterpolation(this.DefaultInterpolation);else throw Error(t)}return K(`KeyframeTrack:`,t),this}return this.createInterpolant=t,this}getInterpolation(){switch(this.createInterpolant){case this.InterpolantFactoryMethodDiscrete:return Ve;case this.InterpolantFactoryMethodLinear:return He;case this.InterpolantFactoryMethodSmooth:return Ue;case this.InterpolantFactoryMethodBezier:return We}}getValueSize(){return this.values.length/this.times.length}shift(e){if(e!==0){let t=this.times;for(let n=0,r=t.length;n!==r;++n)t[n]+=e}return this}scale(e){if(e!==1){let t=this.times;for(let n=0,r=t.length;n!==r;++n)t[n]*=e;wa(this.settings)&&(Pa(this.settings.inTangents,e),Pa(this.settings.outTangents,e))}return this}trim(e,t){let n=this.times,r=n.length,i=0,a=r-1;for(;i!==r&&n[i]<e;)++i;for(;a!==-1&&n[a]>t;)--a;if(++a,i!==0||a!==r){i>=a&&(a=Math.max(a,1),i=a-1);let e=this.getValueSize();this.times=n.slice(i,a),this.values=this.values.slice(i*e,a*e)}return this}validate(){let e=!0,t=this.getValueSize();t-Math.floor(t)!==0&&(q(`KeyframeTrack: Invalid value size in track.`,this),e=!1);let n=this.times,r=this.values,i=n.length;i===0&&(q(`KeyframeTrack: Track is empty.`,this),e=!1);let a=null;for(let t=0;t!==i;t++){let r=n[t];if(typeof r==`number`&&isNaN(r)){q(`KeyframeTrack: Time is not a valid number.`,this,t,r),e=!1;break}if(a!==null&&a>r){q(`KeyframeTrack: Out of order keys.`,this,t,r,a),e=!1;break}a=r}if(r!==void 0&&rt(r))for(let t=0,n=r.length;t!==n;++t){let n=r[t];if(isNaN(n)){q(`KeyframeTrack: Value is not a valid number.`,this,t,n),e=!1;break}}return e}optimize(){let e=this.times.slice(),t=this.values.slice(),n=this.getValueSize(),r=this.getInterpolation()===Ue,i=e.length-1,a=1;for(let o=1;o<i;++o){let i=!1,s=e[o];if(s!==e[o+1]&&(o!==1||s!==e[0])){if(r)i=!0;else{let e=o*n,r=e-n,a=e+n;for(let o=0;o!==n;++o){let n=t[e+o];if(n!==t[r+o]||n!==t[a+o]){i=!0;break}}}}if(i){if(o!==a){e[a]=e[o];let r=o*n,i=a*n;for(let e=0;e!==n;++e)t[i+e]=t[r+e]}++a}}if(i>0){e[a]=e[i];for(let e=i*n,r=a*n,o=0;o!==n;++o)t[r+o]=t[e+o];++a}return a===e.length?(this.times=e,this.values=t):(this.times=e.slice(0,a),this.values=t.slice(0,a*n)),this}clone(){let e=this.times.slice(),t=this.values.slice(),n=this.constructor,r=new n(this.name,e,t);return r.createInterpolant=this.createInterpolant,wa(this.settings)&&(r.settings={inTangents:this.settings.inTangents.slice(),outTangents:this.settings.outTangents.slice()}),r}};function Pa(e,t){for(let n=0,r=e.length;n!==r;n+=2)e[n]*=t}Na.prototype.ValueTypeName=``,Na.prototype.TimeBufferType=Float32Array,Na.prototype.ValueBufferType=Float32Array,Na.prototype.DefaultInterpolation=He;var Fa=class extends Na{constructor(e,t,n){super(e,t,n)}};Fa.prototype.ValueTypeName=`bool`,Fa.prototype.ValueBufferType=Array,Fa.prototype.DefaultInterpolation=Ve,Fa.prototype.InterpolantFactoryMethodLinear=void 0,Fa.prototype.InterpolantFactoryMethodSmooth=void 0;var Ia=class extends Na{constructor(e,t,n,r){super(e,t,n,r)}};Ia.prototype.ValueTypeName=`color`;var La=class extends Na{constructor(e,t,n,r){super(e,t,n,r)}};La.prototype.ValueTypeName=`number`;var Ra=class extends Ta{constructor(e,t,n,r){super(e,t,n,r)}interpolate_(e,t,n,r){let i=this.resultBuffer,a=this.sampleValues,o=this.valueSize,s=(n-t)/(r-t),c=e*o;for(let e=c+o;c!==e;c+=4)Bt.slerpFlat(i,0,a,c-o,a,c,s);return i}},za=class extends Na{constructor(e,t,n,r){super(e,t,n,r)}InterpolantFactoryMethodLinear(e){return new Ra(this.times,this.values,this.getValueSize(),e)}};za.prototype.ValueTypeName=`quaternion`,za.prototype.InterpolantFactoryMethodSmooth=void 0;var Ba=class extends Na{constructor(e,t,n){super(e,t,n)}};Ba.prototype.ValueTypeName=`string`,Ba.prototype.ValueBufferType=Array,Ba.prototype.DefaultInterpolation=Ve,Ba.prototype.InterpolantFactoryMethodLinear=void 0,Ba.prototype.InterpolantFactoryMethodSmooth=void 0;var Va=class extends Na{constructor(e,t,n,r){super(e,t,n,r)}};Va.prototype.ValueTypeName=`vector`;var Ha=class extends Rn{constructor(e,t=1){super(),this.isLight=!0,this.type=`Light`,this.color=new X(e),this.intensity=t}copy(e,t){return super.copy(e,t),this.color.copy(e.color),this.intensity=e.intensity,this}toJSON(e){let t=super.toJSON(e);return t.object.color=this.color.getHex(),t.object.intensity=this.intensity,t}},Ua=class extends Ha{constructor(e,t,n){super(e,n),this.isHemisphereLight=!0,this.type=`HemisphereLight`,this.position.copy(Rn.DEFAULT_UP),this.updateMatrix(),this.groundColor=new X(t)}copy(e,t){return super.copy(e,t),this.groundColor.copy(e.groundColor),this}toJSON(e){let t=super.toJSON(e);return t.object.groundColor=this.groundColor.getHex(),t}},Wa=new dn,Ga=new Y,Ka=new Y,qa=class{constructor(e){this.camera=e,this.intensity=1,this.bias=0,this.biasNode=null,this.normalBias=0,this.radius=1,this.blurSamples=8,this.mapSize=new J(512,512),this.mapType=O,this.map=null,this.mapPass=null,this.matrix=new dn,this.autoUpdate=!0,this.needsUpdate=!1,this._frustum=new vi,this._frameExtents=new J(1,1),this._viewportCount=1,this._viewports=[new on(0,0,1,1)]}getViewportCount(){return this._viewportCount}getCamera(){return this.camera}getFrustum(){return this._frustum}updateMatrices(e){let t=this.camera;Ga.setFromMatrixPosition(e.matrixWorld),t.position.copy(Ga),Ka.setFromMatrixPosition(e.target.matrixWorld),t.lookAt(Ka),t.updateMatrixWorld(),this._updateMatrix(t,this.matrix,this._frustum)}_updateMatrix(e,t,n,r){Wa.multiplyMatrices(e.projectionMatrix,e.matrixWorldInverse),n.setFromProjectionMatrix(Wa,e.coordinateSystem,e.reversedDepth);let i=this._frameExtents,a=r?r.z/i.x:1,o=r?r.w/i.y:1,s=r?r.x/i.x:0,c=r?r.y/i.y:0;e.coordinateSystem===2001||e.reversedDepth?t.set(.5*a,0,0,.5*a+s,0,.5*o,0,.5*o+c,0,0,1,0,0,0,0,1):t.set(.5*a,0,0,.5*a+s,0,.5*o,0,.5*o+c,0,0,.5,.5,0,0,0,1),t.multiply(Wa)}getViewport(e){return this._viewports[e]}getFrameExtents(){return this._frameExtents}dispose(){this.map&&this.map.dispose(),this.mapPass&&this.mapPass.dispose()}copy(e){return this.camera=e.camera.clone(),this.intensity=e.intensity,this.bias=e.bias,this.radius=e.radius,this.autoUpdate=e.autoUpdate,this.needsUpdate=e.needsUpdate,this.normalBias=e.normalBias,this.blurSamples=e.blurSamples,this.mapSize.copy(e.mapSize),this.biasNode=e.biasNode,this}clone(){return new this.constructor().copy(this)}toJSON(){let e={};return e.intensity=this.intensity,e.bias=this.bias,e.normalBias=this.normalBias,e.radius=this.radius,e.blurSamples=this.blurSamples,e.mapSize=this.mapSize.toArray(),e.camera=this.camera.toJSON(!1).object,delete e.camera.matrix,e}},Ja=new Y,Ya=new Bt,Xa=new Y,Za=class extends Rn{constructor(){super(),this.isCamera=!0,this.type=`Camera`,this.matrixWorldInverse=new dn,this.projectionMatrix=new dn,this.projectionMatrixInverse=new dn,this.coordinateSystem=tt,this._reversedDepth=!1}get reversedDepth(){return this._reversedDepth}copy(e,t){return super.copy(e,t),this.matrixWorldInverse.copy(e.matrixWorldInverse),this.projectionMatrix.copy(e.projectionMatrix),this.projectionMatrixInverse.copy(e.projectionMatrixInverse),this.coordinateSystem=e.coordinateSystem,this}getWorldDirection(e){return super.getWorldDirection(e).negate()}updateMatrixWorld(e){super.updateMatrixWorld(e),this.matrixWorld.decompose(Ja,Ya,Xa),Xa.x===1&&Xa.y===1&&Xa.z===1?this.matrixWorldInverse.copy(this.matrixWorld).invert():this.matrixWorldInverse.compose(Ja,Ya,Xa.set(1,1,1)).invert()}updateWorldMatrix(e,t,n=!1){super.updateWorldMatrix(e,t,n),this.matrixWorld.decompose(Ja,Ya,Xa),Xa.x===1&&Xa.y===1&&Xa.z===1?this.matrixWorldInverse.copy(this.matrixWorld).invert():this.matrixWorldInverse.compose(Ja,Ya,Xa.set(1,1,1)).invert()}clone(){return new this.constructor().copy(this)}},Qa=new Y,$a=new J,eo=new J,to=class extends Za{constructor(e=50,t=1,n=.1,r=2e3){super(),this.isPerspectiveCamera=!0,this.type=`PerspectiveCamera`,this.fov=e,this.zoom=1,this.near=n,this.far=r,this.focus=10,this.aspect=t,this.view=null,this.filmGauge=35,this.filmOffset=0,this.updateProjectionMatrix()}copy(e,t){return super.copy(e,t),this.fov=e.fov,this.zoom=e.zoom,this.near=e.near,this.far=e.far,this.focus=e.focus,this.aspect=e.aspect,this.view=e.view===null?null:Object.assign({},e.view),this.filmGauge=e.filmGauge,this.filmOffset=e.filmOffset,this}setFocalLength(e){let t=.5*this.getFilmHeight()/e;this.fov=gt*2*Math.atan(t),this.updateProjectionMatrix()}getFocalLength(){let e=Math.tan(ht*.5*this.fov);return .5*this.getFilmHeight()/e}getEffectiveFOV(){return gt*2*Math.atan(Math.tan(ht*.5*this.fov)/this.zoom)}getFilmWidth(){return this.filmGauge*Math.min(this.aspect,1)}getFilmHeight(){return this.filmGauge/Math.max(this.aspect,1)}getViewBounds(e,t,n){Qa.set(-1,-1,.5).applyMatrix4(this.projectionMatrixInverse),t.set(Qa.x,Qa.y).multiplyScalar(-e/Qa.z),Qa.set(1,1,.5).applyMatrix4(this.projectionMatrixInverse),n.set(Qa.x,Qa.y).multiplyScalar(-e/Qa.z)}getViewSize(e,t){return this.getViewBounds(e,$a,eo),t.subVectors(eo,$a)}setViewOffset(e,t,n,r,i,a){this.aspect=e/t,this.view===null&&(this.view={enabled:!0,fullWidth:1,fullHeight:1,offsetX:0,offsetY:0,width:1,height:1}),this.view.enabled=!0,this.view.fullWidth=e,this.view.fullHeight=t,this.view.offsetX=n,this.view.offsetY=r,this.view.width=i,this.view.height=a,this.updateProjectionMatrix()}clearViewOffset(){this.view!==null&&(this.view.enabled=!1),this.updateProjectionMatrix()}updateProjectionMatrix(){let e=this.near,t=e*Math.tan(ht*.5*this.fov)/this.zoom,n=2*t,r=this.aspect*n,i=-.5*r,a=this.view;if(this.view!==null&&this.view.enabled){let e=a.fullWidth,o=a.fullHeight;i+=a.offsetX*r/e,t-=a.offsetY*n/o,r*=a.width/e,n*=a.height/o}let o=this.filmOffset;o!==0&&(i+=e*o/this.getFilmWidth()),this.projectionMatrix.makePerspective(i,i+r,t,t-n,e,this.far,this.coordinateSystem,this.reversedDepth),this.projectionMatrixInverse.copy(this.projectionMatrix).invert()}toJSON(e){let t=super.toJSON(e);return t.object.fov=this.fov,t.object.zoom=this.zoom,t.object.near=this.near,t.object.far=this.far,t.object.focus=this.focus,t.object.aspect=this.aspect,this.view!==null&&(t.object.view=Object.assign({},this.view)),t.object.filmGauge=this.filmGauge,t.object.filmOffset=this.filmOffset,t}},no=class extends Za{constructor(e=-1,t=1,n=1,r=-1,i=.1,a=2e3){super(),this.isOrthographicCamera=!0,this.type=`OrthographicCamera`,this.zoom=1,this.view=null,this.left=e,this.right=t,this.top=n,this.bottom=r,this.near=i,this.far=a,this.updateProjectionMatrix()}copy(e,t){return super.copy(e,t),this.left=e.left,this.right=e.right,this.top=e.top,this.bottom=e.bottom,this.near=e.near,this.far=e.far,this.zoom=e.zoom,this.view=e.view===null?null:Object.assign({},e.view),this}setViewOffset(e,t,n,r,i,a){this.view===null&&(this.view={enabled:!0,fullWidth:1,fullHeight:1,offsetX:0,offsetY:0,width:1,height:1}),this.view.enabled=!0,this.view.fullWidth=e,this.view.fullHeight=t,this.view.offsetX=n,this.view.offsetY=r,this.view.width=i,this.view.height=a,this.updateProjectionMatrix()}clearViewOffset(){this.view!==null&&(this.view.enabled=!1),this.updateProjectionMatrix()}updateProjectionMatrix(){let e=(this.right-this.left)/(2*this.zoom),t=(this.top-this.bottom)/(2*this.zoom),n=(this.right+this.left)/2,r=(this.top+this.bottom)/2,i=n-e,a=n+e,o=r+t,s=r-t;if(this.view!==null&&this.view.enabled){let e=(this.right-this.left)/this.view.fullWidth/this.zoom,t=(this.top-this.bottom)/this.view.fullHeight/this.zoom;i+=e*this.view.offsetX,a=i+e*this.view.width,o-=t*this.view.offsetY,s=o-t*this.view.height}this.projectionMatrix.makeOrthographic(i,a,o,s,this.near,this.far,this.coordinateSystem,this.reversedDepth),this.projectionMatrixInverse.copy(this.projectionMatrix).invert()}toJSON(e){let t=super.toJSON(e);return t.object.zoom=this.zoom,t.object.left=this.left,t.object.right=this.right,t.object.top=this.top,t.object.bottom=this.bottom,t.object.near=this.near,t.object.far=this.far,this.view!==null&&(t.object.view=Object.assign({},this.view)),t}},ro=class extends qa{constructor(){super(new no(-5,5,5,-5,.5,500)),this.isDirectionalLightShadow=!0}},io=class extends Ha{constructor(e,t){super(e,t),this.isDirectionalLight=!0,this.type=`DirectionalLight`,this.position.copy(Rn.DEFAULT_UP),this.updateMatrix(),this.target=new Rn,this.shadow=new ro}dispose(){super.dispose(),this.shadow.dispose()}copy(e){return super.copy(e),this.target=e.target.clone(),this.shadow=e.shadow.clone(),this}toJSON(e){let t=super.toJSON(e);return t.object.shadow=this.shadow.toJSON(),t.object.target=this.target.uuid,t}},ao=-90,oo=1,so=class extends Rn{constructor(e,t,n){super(),this.type=`CubeCamera`,this.renderTarget=n,this.coordinateSystem=null,this.activeMipmapLevel=0;let r=new to(ao,oo,e,t);r.layers=this.layers,this.add(r);let i=new to(ao,oo,e,t);i.layers=this.layers,this.add(i);let a=new to(ao,oo,e,t);a.layers=this.layers,this.add(a);let o=new to(ao,oo,e,t);o.layers=this.layers,this.add(o);let s=new to(ao,oo,e,t);s.layers=this.layers,this.add(s);let c=new to(ao,oo,e,t);c.layers=this.layers,this.add(c)}updateCoordinateSystem(){let e=this.coordinateSystem,t=this.children.concat(),[n,r,i,a,o,s]=t;for(let e of t)this.remove(e);if(e===2e3)n.up.set(0,1,0),n.lookAt(1,0,0),r.up.set(0,1,0),r.lookAt(-1,0,0),i.up.set(0,0,-1),i.lookAt(0,1,0),a.up.set(0,0,1),a.lookAt(0,-1,0),o.up.set(0,1,0),o.lookAt(0,0,1),s.up.set(0,1,0),s.lookAt(0,0,-1);else if(e===2001)n.up.set(0,-1,0),n.lookAt(-1,0,0),r.up.set(0,-1,0),r.lookAt(1,0,0),i.up.set(0,0,1),i.lookAt(0,1,0),a.up.set(0,0,-1),a.lookAt(0,-1,0),o.up.set(0,-1,0),o.lookAt(0,0,1),s.up.set(0,-1,0),s.lookAt(0,0,-1);else throw Error(`THREE.CubeCamera.updateCoordinateSystem(): Invalid coordinate system: `+e);for(let e of t)this.add(e),e.updateMatrixWorld()}update(e,t){this.parent===null&&this.updateMatrixWorld();let{renderTarget:n,activeMipmapLevel:r}=this;this.coordinateSystem!==e.coordinateSystem&&(this.coordinateSystem=e.coordinateSystem,this.updateCoordinateSystem());let[i,a,o,s,c,l]=this.children,u=e.getRenderTarget(),d=e.getActiveCubeFace(),f=e.getActiveMipmapLevel(),p=e.xr.enabled;e.xr.enabled=!1;let m=n.texture.generateMipmaps;n.texture.generateMipmaps=!1;let h=!1;h=e.isWebGLRenderer===!0?e.state.buffers.depth.getReversed():e.reversedDepthBuffer,e.setRenderTarget(n,0,r),h&&e.autoClear===!1&&e.clearDepth(),e.render(t,i),e.setRenderTarget(n,1,r),h&&e.autoClear===!1&&e.clearDepth(),e.render(t,a),e.setRenderTarget(n,2,r),h&&e.autoClear===!1&&e.clearDepth(),e.render(t,o),e.setRenderTarget(n,3,r),h&&e.autoClear===!1&&e.clearDepth(),e.render(t,s),e.setRenderTarget(n,4,r),h&&e.autoClear===!1&&e.clearDepth(),e.render(t,c),n.texture.generateMipmaps=m,e.setRenderTarget(n,5,r),h&&e.autoClear===!1&&e.clearDepth(),e.render(t,l),e.setRenderTarget(u,d,f),e.xr.enabled=p,n.texture.needsPMREMUpdate=!0}},co=class extends to{constructor(e=[]){super(),this.isArrayCamera=!0,this.isMultiViewCamera=!1,this.cameras=e}},lo=`\\[\\]\\.:\\/`,uo=RegExp(`[\\[\\]\\.:\\/]`,`g`),fo=`[^\\[\\]\\.:\\/]`,po=`[^`+lo.replace(`\\.`,``)+`]`,mo=`((?:WC+[\\/:])*)`.replace(`WC`,fo),ho=`(WCOD+)?`.replace(`WCOD`,po),go=`(?:\\.(WC+)(?:\\[(.+)\\])?)?`.replace(`WC`,fo),_o=`\\.(WC+)(?:\\[(.+)\\])?`.replace(`WC`,fo),vo=RegExp(`^`+mo+ho+go+_o+`$`),yo=[`material`,`materials`,`bones`,`map`],bo=class{constructor(e,t,n){let r=n||xo.parseTrackName(t);this._targetGroup=e,this._bindings=e.subscribe_(t,r)}getValue(e,t){this.bind();let n=this._targetGroup.nCachedObjects_,r=this._bindings[n];r!==void 0&&r.getValue(e,t)}setValue(e,t){let n=this._bindings;for(let r=this._targetGroup.nCachedObjects_,i=n.length;r!==i;++r)n[r].setValue(e,t)}bind(){let e=this._bindings;for(let t=this._targetGroup.nCachedObjects_,n=e.length;t!==n;++t)e[t].bind()}unbind(){let e=this._bindings;for(let t=this._targetGroup.nCachedObjects_,n=e.length;t!==n;++t)e[t].unbind()}},xo=class e{constructor(t,n,r){this.path=n,this.parsedPath=r||e.parseTrackName(n),this.node=e.findNode(t,this.parsedPath.nodeName),this.rootNode=t,this.getValue=this._getValue_unbound,this.setValue=this._setValue_unbound}static create(t,n,r){return t&&t.isAnimationObjectGroup?new e.Composite(t,n,r):new e(t,n,r)}static sanitizeNodeName(e){return e.replace(/\s/g,`_`).replace(uo,``)}static parseTrackName(e){let t=vo.exec(e);if(t===null)throw Error(`THREE.PropertyBinding: Cannot parse trackName: `+e);let n={nodeName:t[2],objectName:t[3],objectIndex:t[4],propertyName:t[5],propertyIndex:t[6]},r=n.nodeName&&n.nodeName.lastIndexOf(`.`);if(r!==void 0&&r!==-1){let e=n.nodeName.substring(r+1);yo.indexOf(e)!==-1&&(n.nodeName=n.nodeName.substring(0,r),n.objectName=e)}if(n.propertyName===null||n.propertyName.length===0)throw Error(`THREE.PropertyBinding: can not parse propertyName from trackName: `+e);return n}static findNode(e,t){if(t===void 0||t===``||t===`.`||t===-1||t===e.name||t===e.uuid)return e;if(e.skeleton){let n=e.skeleton.getBoneByName(t);if(n!==void 0)return n}if(e.children){let n=function(e){for(let r=0;r<e.length;r++){let i=e[r];if(i.name===t||i.uuid===t)return i;let a=n(i.children);if(a)return a}return null},r=n(e.children);if(r)return r}return null}_getValue_unavailable(){}_setValue_unavailable(){}_getValue_direct(e,t){e[t]=this.targetObject[this.propertyName]}_getValue_array(e,t){let n=this.resolvedProperty;for(let r=0,i=n.length;r!==i;++r)e[t++]=n[r]}_getValue_arrayElement(e,t){e[t]=this.resolvedProperty[this.propertyIndex]}_getValue_toArray(e,t){this.resolvedProperty.toArray(e,t)}_setValue_direct(e,t){this.targetObject[this.propertyName]=e[t]}_setValue_direct_setNeedsUpdate(e,t){this.targetObject[this.propertyName]=e[t],this.targetObject.needsUpdate=!0}_setValue_direct_setMatrixWorldNeedsUpdate(e,t){this.targetObject[this.propertyName]=e[t],this.targetObject.matrixWorldNeedsUpdate=!0}_setValue_array(e,t){let n=this.resolvedProperty;for(let r=0,i=n.length;r!==i;++r)n[r]=e[t++]}_setValue_array_setNeedsUpdate(e,t){let n=this.resolvedProperty;for(let r=0,i=n.length;r!==i;++r)n[r]=e[t++];this.targetObject.needsUpdate=!0}_setValue_array_setMatrixWorldNeedsUpdate(e,t){let n=this.resolvedProperty;for(let r=0,i=n.length;r!==i;++r)n[r]=e[t++];this.targetObject.matrixWorldNeedsUpdate=!0}_setValue_arrayElement(e,t){this.resolvedProperty[this.propertyIndex]=e[t]}_setValue_arrayElement_setNeedsUpdate(e,t){this.resolvedProperty[this.propertyIndex]=e[t],this.targetObject.needsUpdate=!0}_setValue_arrayElement_setMatrixWorldNeedsUpdate(e,t){this.resolvedProperty[this.propertyIndex]=e[t],this.targetObject.matrixWorldNeedsUpdate=!0}_setValue_fromArray(e,t){this.resolvedProperty.fromArray(e,t)}_setValue_fromArray_setNeedsUpdate(e,t){this.resolvedProperty.fromArray(e,t),this.targetObject.needsUpdate=!0}_setValue_fromArray_setMatrixWorldNeedsUpdate(e,t){this.resolvedProperty.fromArray(e,t),this.targetObject.matrixWorldNeedsUpdate=!0}_getValue_unbound(e,t){this.bind(),this.getValue(e,t)}_setValue_unbound(e,t){this.bind(),this.setValue(e,t)}bind(){let t=this.node,n=this.parsedPath,r=n.objectName,i=n.propertyName,a=n.propertyIndex;if(t||(t=e.findNode(this.rootNode,n.nodeName),this.node=t),this.getValue=this._getValue_unavailable,this.setValue=this._setValue_unavailable,!t){K(`PropertyBinding: No target node found for track: `+this.path+`.`);return}if(r){let e=n.objectIndex;switch(r){case`materials`:if(!t.material){q(`PropertyBinding: Can not bind to material as node does not have a material.`,this);return}if(!t.material.materials){q(`PropertyBinding: Can not bind to material.materials as node.material does not have a materials array.`,this);return}t=t.material.materials;break;case`bones`:if(!t.skeleton){q(`PropertyBinding: Can not bind to bones as node does not have a skeleton.`,this);return}t=t.skeleton.bones;for(let n=0;n<t.length;n++)if(t[n].name===e){e=n;break}break;case`map`:if(`map`in t){t=t.map;break}if(!t.material){q(`PropertyBinding: Can not bind to material as node does not have a material.`,this);return}if(!t.material.map){q(`PropertyBinding: Can not bind to material.map as node.material does not have a map.`,this);return}t=t.material.map;break;default:if(t[r]===void 0){q(`PropertyBinding: Can not bind to objectName of node undefined.`,this);return}t=t[r]}if(e!==void 0){if(t[e]===void 0){q(`PropertyBinding: Trying to bind to objectIndex of objectName, but is undefined.`,this,t);return}t=t[e]}}let o=t[i];if(o===void 0){let e=n.nodeName;q(`PropertyBinding: Trying to update property for track: `+e+`.`+i+` but it wasn't found.`,t);return}let s=this.Versioning.None;this.targetObject=t,t.isMaterial===!0?s=this.Versioning.NeedsUpdate:t.isObject3D===!0&&(s=this.Versioning.MatrixWorldNeedsUpdate);let c=this.BindingType.Direct;if(a!==void 0){if(i===`morphTargetInfluences`){if(!t.geometry){q(`PropertyBinding: Can not bind to morphTargetInfluences because node does not have a geometry.`,this);return}if(!t.geometry.morphAttributes){q(`PropertyBinding: Can not bind to morphTargetInfluences because node does not have a geometry.morphAttributes.`,this);return}t.morphTargetDictionary[a]!==void 0&&(a=t.morphTargetDictionary[a])}c=this.BindingType.ArrayElement,this.resolvedProperty=o,this.propertyIndex=a}else o.fromArray!==void 0&&o.toArray!==void 0?(c=this.BindingType.HasFromToArray,this.resolvedProperty=o):Array.isArray(o)?(c=this.BindingType.EntireArray,this.resolvedProperty=o):this.propertyName=i;this.getValue=this.GetterByBindingType[c],this.setValue=this.SetterByBindingTypeAndVersioning[c][s]}unbind(){this.node=null,this.getValue=this._getValue_unbound,this.setValue=this._setValue_unbound}};xo.Composite=bo,xo.prototype.BindingType={Direct:0,EntireArray:1,ArrayElement:2,HasFromToArray:3},xo.prototype.Versioning={None:0,NeedsUpdate:1,MatrixWorldNeedsUpdate:2},xo.prototype.GetterByBindingType=[xo.prototype._getValue_direct,xo.prototype._getValue_array,xo.prototype._getValue_arrayElement,xo.prototype._getValue_toArray],xo.prototype.SetterByBindingTypeAndVersioning=[[xo.prototype._setValue_direct,xo.prototype._setValue_direct_setNeedsUpdate,xo.prototype._setValue_direct_setMatrixWorldNeedsUpdate],[xo.prototype._setValue_array,xo.prototype._setValue_array_setNeedsUpdate,xo.prototype._setValue_array_setMatrixWorldNeedsUpdate],[xo.prototype._setValue_arrayElement,xo.prototype._setValue_arrayElement_setNeedsUpdate,xo.prototype._setValue_arrayElement_setMatrixWorldNeedsUpdate],[xo.prototype._setValue_fromArray,xo.prototype._setValue_fromArray_setNeedsUpdate,xo.prototype._setValue_fromArray_setMatrixWorldNeedsUpdate]];var So=class{constructor(e=1,t=0,n=0){this.radius=e,this.phi=t,this.theta=n}set(e,t,n){return this.radius=e,this.phi=t,this.theta=n,this}copy(e){return this.radius=e.radius,this.phi=e.phi,this.theta=e.theta,this}makeSafe(){let e=1e-6;return this.phi=vt(this.phi,e,Math.PI-e),this}setFromVector3(e){return this.setFromCartesianCoords(e.x,e.y,e.z)}setFromCartesianCoords(e,t,n){return this.radius=Math.sqrt(e*e+t*t+n*n),this.radius===0?(this.theta=0,this.phi=0):(this.theta=Math.atan2(e,n),this.phi=Math.acos(vt(t/this.radius,-1,1))),this}clone(){return new this.constructor().copy(this)}};(class e{static{e.prototype.isMatrix2=!0}constructor(e,t,n,r){this.elements=[1,0,0,1],e!==void 0&&this.set(e,t,n,r)}identity(){return this.set(1,0,0,1),this}fromArray(e,t=0){for(let n=0;n<4;n++)this.elements[n]=e[n+t];return this}set(e,t,n,r){let i=this.elements;return i[0]=e,i[2]=t,i[1]=n,i[3]=r,this}});var Co=class extends ft{constructor(e,t=null){super(),this.object=e,this.domElement=t,this.enabled=!0,this.state=-1,this.keys={},this.mouseButtons={LEFT:null,MIDDLE:null,RIGHT:null},this.touches={ONE:null,TWO:null}}connect(e){this.domElement!==null&&this.disconnect(),this.domElement=e}disconnect(){}dispose(){}update(){}};function wo(e,t,n,r){let i=To(r);switch(n){case B:return e*t;case re:return e*t/i.components*i.byteLength;case ie:return e*t/i.components*i.byteLength;case ae:return e*t*2/i.components*i.byteLength;case oe:return e*t*2/i.components*i.byteLength;case te:return e*t*3/i.components*i.byteLength;case V:return e*t*4/i.components*i.byteLength;case se:return e*t*4/i.components*i.byteLength;case ce:case le:return Math.floor((e+3)/4)*Math.floor((t+3)/4)*8;case ue:case U:return Math.floor((e+3)/4)*Math.floor((t+3)/4)*16;case fe:case me:return Math.max(e,16)*Math.max(t,8)/4;case de:case pe:return Math.max(e,8)*Math.max(t,8)/2;case he:case ge:case ve:case ye:return Math.floor((e+3)/4)*Math.floor((t+3)/4)*8;case _e:case be:case xe:return Math.floor((e+3)/4)*Math.floor((t+3)/4)*16;case Se:return Math.floor((e+3)/4)*Math.floor((t+3)/4)*16;case Ce:return Math.floor((e+4)/5)*Math.floor((t+3)/4)*16;case we:return Math.floor((e+4)/5)*Math.floor((t+4)/5)*16;case W:return Math.floor((e+5)/6)*Math.floor((t+4)/5)*16;case Te:return Math.floor((e+5)/6)*Math.floor((t+5)/6)*16;case Ee:return Math.floor((e+7)/8)*Math.floor((t+4)/5)*16;case De:return Math.floor((e+7)/8)*Math.floor((t+5)/6)*16;case G:return Math.floor((e+7)/8)*Math.floor((t+7)/8)*16;case Oe:return Math.floor((e+9)/10)*Math.floor((t+4)/5)*16;case ke:return Math.floor((e+9)/10)*Math.floor((t+5)/6)*16;case Ae:return Math.floor((e+9)/10)*Math.floor((t+7)/8)*16;case je:return Math.floor((e+9)/10)*Math.floor((t+9)/10)*16;case Me:return Math.floor((e+11)/12)*Math.floor((t+9)/10)*16;case Ne:return Math.floor((e+11)/12)*Math.floor((t+11)/12)*16;case Pe:case Fe:case Ie:return Math.ceil(e/4)*Math.ceil(t/4)*16;case Le:case Re:return Math.ceil(e/4)*Math.ceil(t/4)*8;case ze:case Be:return Math.ceil(e/4)*Math.ceil(t/4)*16}throw Error(`Unable to determine texture byte length for ${n} format.`)}function To(e){switch(e){case O:case k:return{byteLength:1,components:1};case j:case A:case F:return{byteLength:2,components:1};case I:case L:return{byteLength:2,components:4};case N:case M:case P:return{byteLength:4,components:1};case z:case ee:return{byteLength:4,components:3}}throw Error(`THREE.TextureUtils: Unknown texture type ${e}.`)}typeof __THREE_DEVTOOLS__<`u`&&__THREE_DEVTOOLS__.dispatchEvent(new CustomEvent(`register`,{detail:{revision:`186`}})),typeof window<`u`&&(window.__THREE__?K(`WARNING: Multiple instances of Three.js being imported.`):window.__THREE__=`186`);function Eo(){let e=null,t=!1,n=null,r=null;function i(t,a){r=e.requestAnimationFrame(i),n(t,a)}return{start:function(){t!==!0&&n!==null&&e!==null&&(r=e.requestAnimationFrame(i),t=!0)},stop:function(){e!==null&&e.cancelAnimationFrame(r),t=!1},setAnimationLoop:function(e){n=e},setContext:function(t){e=t}}}function Do(e){let t=new WeakMap;function n(t,n){let r=t.array,i=t.usage,a=r.byteLength,o=e.createBuffer();e.bindBuffer(n,o),e.bufferData(n,r,i),t.onUploadCallback();let s;if(r instanceof Float32Array)s=e.FLOAT;else if(typeof Float16Array<`u`&&r instanceof Float16Array)s=e.HALF_FLOAT;else if(r instanceof Uint16Array)s=t.isFloat16BufferAttribute?e.HALF_FLOAT:e.UNSIGNED_SHORT;else if(r instanceof Int16Array)s=e.SHORT;else if(r instanceof Uint32Array)s=e.UNSIGNED_INT;else if(r instanceof Int32Array)s=e.INT;else if(r instanceof Int8Array)s=e.BYTE;else if(r instanceof Uint8Array)s=e.UNSIGNED_BYTE;else if(r instanceof Uint8ClampedArray)s=e.UNSIGNED_BYTE;else throw Error(`THREE.WebGLAttributes: Unsupported buffer data format: `+r);return{buffer:o,type:s,bytesPerElement:r.BYTES_PER_ELEMENT,version:t.version,size:a}}function r(t,n,r){let i=n.array,a=n.updateRanges;if(e.bindBuffer(r,t),a.length===0)e.bufferSubData(r,0,i);else{a.sort((e,t)=>e.start-t.start);let t=0;for(let e=1;e<a.length;e++){let n=a[t],r=a[e];r.start<=n.start+n.count+1?n.count=Math.max(n.count,r.start+r.count-n.start):(++t,a[t]=r)}a.length=t+1;for(let t=0,n=a.length;t<n;t++){let n=a[t];e.bufferSubData(r,n.start*i.BYTES_PER_ELEMENT,i,n.start,n.count)}n.clearUpdateRanges()}n.onUploadCallback()}function i(e){return e.isInterleavedBufferAttribute&&(e=e.data),t.get(e)}function a(n){n.isInterleavedBufferAttribute&&(n=n.data);let r=t.get(n);r&&(e.deleteBuffer(r.buffer),t.delete(n))}function o(e,i){if(e.isInterleavedBufferAttribute&&(e=e.data),e.isGLBufferAttribute){let n=t.get(e);(!n||n.version<e.version)&&t.set(e,{buffer:e.buffer,type:e.type,bytesPerElement:e.elementSize,version:e.version});return}let a=t.get(e);if(a===void 0)t.set(e,n(e,i));else if(a.version<e.version){if(a.size!==e.array.byteLength)throw Error(`THREE.WebGLAttributes: The size of the buffer attribute's array buffer does not match the original size. Resizing buffer attributes is not supported.`);r(a.buffer,e,i),a.version=e.version}}return{get:i,remove:a,update:o}}var Oo={alphahash_fragment:`#ifdef USE_ALPHAHASH
	if ( diffuseColor.a < getAlphaHashThreshold( vPosition ) ) discard;
#endif`,alphahash_pars_fragment:`#ifdef USE_ALPHAHASH
	const float ALPHA_HASH_SCALE = 0.05;
	float hash2D( vec2 value ) {
		return fract( 1.0e4 * sin( 17.0 * value.x + 0.1 * value.y ) * ( 0.1 + abs( sin( 13.0 * value.y + value.x ) ) ) );
	}
	float hash3D( vec3 value ) {
		return hash2D( vec2( hash2D( value.xy ), value.z ) );
	}
	float getAlphaHashThreshold( vec3 position ) {
		float maxDeriv = max(
			length( dFdx( position.xyz ) ),
			length( dFdy( position.xyz ) )
		);
		float pixScale = 1.0 / ( ALPHA_HASH_SCALE * maxDeriv );
		vec2 pixScales = vec2(
			exp2( floor( log2( pixScale ) ) ),
			exp2( ceil( log2( pixScale ) ) )
		);
		vec2 alpha = vec2(
			hash3D( floor( pixScales.x * position.xyz ) ),
			hash3D( floor( pixScales.y * position.xyz ) )
		);
		float lerpFactor = fract( log2( pixScale ) );
		float x = ( 1.0 - lerpFactor ) * alpha.x + lerpFactor * alpha.y;
		float a = min( lerpFactor, 1.0 - lerpFactor );
		vec3 cases = vec3(
			x * x / ( 2.0 * a * ( 1.0 - a ) ),
			( x - 0.5 * a ) / ( 1.0 - a ),
			1.0 - ( ( 1.0 - x ) * ( 1.0 - x ) / ( 2.0 * a * ( 1.0 - a ) ) )
		);
		float threshold = ( x < ( 1.0 - a ) )
			? ( ( x < a ) ? cases.x : cases.y )
			: cases.z;
		return clamp( threshold , 1.0e-6, 1.0 );
	}
#endif`,alphamap_fragment:`#ifdef USE_ALPHAMAP
	diffuseColor.a *= texture2D( alphaMap, vAlphaMapUv ).g;
#endif`,alphamap_pars_fragment:`#ifdef USE_ALPHAMAP
	uniform sampler2D alphaMap;
#endif`,alphatest_fragment:`#ifdef USE_ALPHATEST
	#ifdef ALPHA_TO_COVERAGE
	diffuseColor.a = smoothstep( alphaTest, alphaTest + fwidth( diffuseColor.a ), diffuseColor.a );
	if ( diffuseColor.a == 0.0 ) discard;
	#else
	if ( diffuseColor.a < alphaTest ) discard;
	#endif
#endif`,alphatest_pars_fragment:`#ifdef USE_ALPHATEST
	uniform float alphaTest;
#endif`,aomap_fragment:`#ifdef USE_AOMAP
	float ambientOcclusion = ( texture2D( aoMap, vAoMapUv ).r - 1.0 ) * aoMapIntensity + 1.0;
	reflectedLight.indirectDiffuse *= ambientOcclusion;
	#if defined( USE_CLEARCOAT ) 
		clearcoatSpecularIndirect *= ambientOcclusion;
	#endif
	#if defined( USE_SHEEN ) 
		sheenSpecularIndirect *= ambientOcclusion;
	#endif
	#if defined( USE_ENVMAP ) && defined( STANDARD )
		float dotNV = saturate( dot( geometryNormal, geometryViewDir ) );
		reflectedLight.indirectSpecular *= computeSpecularOcclusion( dotNV, ambientOcclusion, material.roughness );
	#endif
#endif`,aomap_pars_fragment:`#ifdef USE_AOMAP
	uniform sampler2D aoMap;
	uniform float aoMapIntensity;
#endif`,batching_pars_vertex:`#ifdef USE_BATCHING
	#if ! defined( GL_ANGLE_multi_draw )
	#define gl_DrawID _gl_DrawID
	uniform int _gl_DrawID;
	#endif
	uniform highp sampler2D batchingTexture;
	uniform highp usampler2D batchingIdTexture;
	mat4 getBatchingMatrix( const in float i ) {
		int size = textureSize( batchingTexture, 0 ).x;
		int j = int( i ) * 4;
		int x = j % size;
		int y = j / size;
		vec4 v1 = texelFetch( batchingTexture, ivec2( x, y ), 0 );
		vec4 v2 = texelFetch( batchingTexture, ivec2( x + 1, y ), 0 );
		vec4 v3 = texelFetch( batchingTexture, ivec2( x + 2, y ), 0 );
		vec4 v4 = texelFetch( batchingTexture, ivec2( x + 3, y ), 0 );
		return mat4( v1, v2, v3, v4 );
	}
	float getIndirectIndex( const in int i ) {
		int size = textureSize( batchingIdTexture, 0 ).x;
		int x = i % size;
		int y = i / size;
		return float( texelFetch( batchingIdTexture, ivec2( x, y ), 0 ).r );
	}
#endif
#ifdef USE_BATCHING_COLOR
	uniform sampler2D batchingColorTexture;
	vec4 getBatchingColor( const in float i ) {
		int size = textureSize( batchingColorTexture, 0 ).x;
		int j = int( i );
		int x = j % size;
		int y = j / size;
		return texelFetch( batchingColorTexture, ivec2( x, y ), 0 );
	}
#endif`,batching_vertex:`#ifdef USE_BATCHING
	mat4 batchingMatrix = getBatchingMatrix( getIndirectIndex( gl_DrawID ) );
#endif`,begin_vertex:`vec3 transformed = vec3( position );
#ifdef USE_ALPHAHASH
	vPosition = vec3( position );
#endif`,beginnormal_vertex:`vec3 objectNormal = vec3( normal );
#ifdef USE_TANGENT
	vec3 objectTangent = vec3( tangent.xyz );
#endif`,bsdfs:`float G_BlinnPhong_Implicit( ) {
	return 0.25;
}
float D_BlinnPhong( const in float shininess, const in float dotNH ) {
	return RECIPROCAL_PI * ( shininess * 0.5 + 1.0 ) * pow( dotNH, shininess );
}
vec3 BRDF_BlinnPhong( const in vec3 lightDir, const in vec3 viewDir, const in vec3 normal, const in vec3 specularColor, const in float shininess ) {
	vec3 halfDir = normalize( lightDir + viewDir );
	float dotNH = saturate( dot( normal, halfDir ) );
	float dotVH = saturate( dot( viewDir, halfDir ) );
	vec3 F = F_Schlick( specularColor, 1.0, dotVH );
	float G = G_BlinnPhong_Implicit( );
	float D = D_BlinnPhong( shininess, dotNH );
	return F * ( G * D );
} // validated`,iridescence_fragment:`#ifdef USE_IRIDESCENCE
	const mat3 XYZ_TO_REC709 = mat3(
		 3.2404542, -0.9692660,  0.0556434,
		-1.5371385,  1.8760108, -0.2040259,
		-0.4985314,  0.0415560,  1.0572252
	);
	vec3 Fresnel0ToIor( vec3 fresnel0 ) {
		vec3 sqrtF0 = sqrt( fresnel0 );
		return ( vec3( 1.0 ) + sqrtF0 ) / ( vec3( 1.0 ) - sqrtF0 );
	}
	vec3 IorToFresnel0( vec3 transmittedIor, float incidentIor ) {
		return pow2( ( transmittedIor - vec3( incidentIor ) ) / ( transmittedIor + vec3( incidentIor ) ) );
	}
	float IorToFresnel0( float transmittedIor, float incidentIor ) {
		return pow2( ( transmittedIor - incidentIor ) / ( transmittedIor + incidentIor ));
	}
	vec3 evalSensitivity( float OPD, vec3 shift ) {
		float phase = 2.0 * PI * OPD * 1.0e-9;
		vec3 val = vec3( 5.4856e-13, 4.4201e-13, 5.2481e-13 );
		vec3 pos = vec3( 1.6810e+06, 1.7953e+06, 2.2084e+06 );
		vec3 var = vec3( 4.3278e+09, 9.3046e+09, 6.6121e+09 );
		vec3 xyz = val * sqrt( 2.0 * PI * var ) * cos( pos * phase + shift ) * exp( - pow2( phase ) * var );
		xyz.x += 9.7470e-14 * sqrt( 2.0 * PI * 4.5282e+09 ) * cos( 2.2399e+06 * phase + shift[ 0 ] ) * exp( - 4.5282e+09 * pow2( phase ) );
		xyz /= 1.0685e-7;
		vec3 rgb = XYZ_TO_REC709 * xyz;
		return rgb;
	}
	vec3 evalIridescence( float outsideIOR, float eta2, float cosTheta1, float thinFilmThickness, vec3 baseF0 ) {
		vec3 I;
		float iridescenceIOR = mix( outsideIOR, eta2, smoothstep( 0.0, 0.03, thinFilmThickness ) );
		float sinTheta2Sq = pow2( outsideIOR / iridescenceIOR ) * ( 1.0 - pow2( cosTheta1 ) );
		float cosTheta2Sq = 1.0 - sinTheta2Sq;
		if ( cosTheta2Sq < 0.0 ) {
			return vec3( 1.0 );
		}
		float cosTheta2 = sqrt( cosTheta2Sq );
		float R0 = IorToFresnel0( iridescenceIOR, outsideIOR );
		float R12 = F_Schlick( R0, 1.0, cosTheta1 );
		float T121 = 1.0 - R12;
		float phi12 = 0.0;
		if ( iridescenceIOR < outsideIOR ) phi12 = PI;
		float phi21 = PI - phi12;
		vec3 baseIOR = Fresnel0ToIor( clamp( baseF0, 0.0, 0.9999 ) );		vec3 R1 = IorToFresnel0( baseIOR, iridescenceIOR );
		vec3 R23 = F_Schlick( R1, 1.0, cosTheta2 );
		vec3 phi23 = vec3( 0.0 );
		if ( baseIOR[ 0 ] < iridescenceIOR ) phi23[ 0 ] = PI;
		if ( baseIOR[ 1 ] < iridescenceIOR ) phi23[ 1 ] = PI;
		if ( baseIOR[ 2 ] < iridescenceIOR ) phi23[ 2 ] = PI;
		float OPD = 2.0 * iridescenceIOR * thinFilmThickness * cosTheta2;
		vec3 phi = vec3( phi21 ) + phi23;
		vec3 R123 = clamp( R12 * R23, 1e-5, 0.9999 );
		vec3 r123 = sqrt( R123 );
		vec3 Rs = pow2( T121 ) * R23 / ( vec3( 1.0 ) - R123 );
		vec3 C0 = R12 + Rs;
		I = C0;
		vec3 Cm = Rs - T121;
		for ( int m = 1; m <= 2; ++ m ) {
			Cm *= r123;
			vec3 Sm = 2.0 * evalSensitivity( float( m ) * OPD, float( m ) * phi );
			I += Cm * Sm;
		}
		return max( I, vec3( 0.0 ) );
	}
#endif`,bumpmap_pars_fragment:`#ifdef USE_BUMPMAP
	uniform sampler2D bumpMap;
	uniform float bumpScale;
	vec2 dHdxy_fwd() {
		vec2 dSTdx = dFdx( vBumpMapUv );
		vec2 dSTdy = dFdy( vBumpMapUv );
		float Hll = bumpScale * texture2D( bumpMap, vBumpMapUv ).x;
		float dBx = bumpScale * texture2D( bumpMap, vBumpMapUv + dSTdx ).x - Hll;
		float dBy = bumpScale * texture2D( bumpMap, vBumpMapUv + dSTdy ).x - Hll;
		return vec2( dBx, dBy );
	}
	vec3 perturbNormalArb( vec3 surf_pos, vec3 surf_norm, vec2 dHdxy, float faceDirection ) {
		vec3 vSigmaX = normalize( dFdx( surf_pos.xyz ) );
		vec3 vSigmaY = normalize( dFdy( surf_pos.xyz ) );
		vec3 vN = surf_norm;
		vec3 R1 = cross( vSigmaY, vN );
		vec3 R2 = cross( vN, vSigmaX );
		float fDet = dot( vSigmaX, R1 ) * faceDirection;
		vec3 vGrad = sign( fDet ) * ( dHdxy.x * R1 + dHdxy.y * R2 );
		return normalize( abs( fDet ) * surf_norm - vGrad );
	}
#endif`,clipping_planes_fragment:`#if NUM_CLIPPING_PLANES > 0
	vec4 plane;
	#ifdef ALPHA_TO_COVERAGE
		float distanceToPlane, distanceGradient;
		float clipOpacity = 1.0;
		#pragma unroll_loop_start
		for ( int i = 0; i < UNION_CLIPPING_PLANES; i ++ ) {
			plane = clippingPlanes[ i ];
			distanceToPlane = - dot( vClipPosition, plane.xyz ) + plane.w;
			distanceGradient = fwidth( distanceToPlane ) / 2.0;
			clipOpacity *= smoothstep( - distanceGradient, distanceGradient, distanceToPlane );
			if ( clipOpacity == 0.0 ) discard;
		}
		#pragma unroll_loop_end
		#if UNION_CLIPPING_PLANES < NUM_CLIPPING_PLANES
			float unionClipOpacity = 1.0;
			#pragma unroll_loop_start
			for ( int i = UNION_CLIPPING_PLANES; i < NUM_CLIPPING_PLANES; i ++ ) {
				plane = clippingPlanes[ i ];
				distanceToPlane = - dot( vClipPosition, plane.xyz ) + plane.w;
				distanceGradient = fwidth( distanceToPlane ) / 2.0;
				unionClipOpacity *= 1.0 - smoothstep( - distanceGradient, distanceGradient, distanceToPlane );
			}
			#pragma unroll_loop_end
			clipOpacity *= 1.0 - unionClipOpacity;
		#endif
		diffuseColor.a *= clipOpacity;
		if ( diffuseColor.a == 0.0 ) discard;
	#else
		#pragma unroll_loop_start
		for ( int i = 0; i < UNION_CLIPPING_PLANES; i ++ ) {
			plane = clippingPlanes[ i ];
			if ( dot( vClipPosition, plane.xyz ) > plane.w ) discard;
		}
		#pragma unroll_loop_end
		#if UNION_CLIPPING_PLANES < NUM_CLIPPING_PLANES
			bool clipped = true;
			#pragma unroll_loop_start
			for ( int i = UNION_CLIPPING_PLANES; i < NUM_CLIPPING_PLANES; i ++ ) {
				plane = clippingPlanes[ i ];
				clipped = ( dot( vClipPosition, plane.xyz ) > plane.w ) && clipped;
			}
			#pragma unroll_loop_end
			if ( clipped ) discard;
		#endif
	#endif
#endif`,clipping_planes_pars_fragment:`#if NUM_CLIPPING_PLANES > 0
	varying vec3 vClipPosition;
	uniform vec4 clippingPlanes[ NUM_CLIPPING_PLANES ];
#endif`,clipping_planes_pars_vertex:`#if NUM_CLIPPING_PLANES > 0
	varying vec3 vClipPosition;
#endif`,clipping_planes_vertex:`#if NUM_CLIPPING_PLANES > 0
	vClipPosition = - mvPosition.xyz;
#endif`,color_fragment:`#if defined( USE_COLOR ) || defined( USE_COLOR_ALPHA )
	diffuseColor *= vColor;
#endif`,color_pars_fragment:`#if defined( USE_COLOR ) || defined( USE_COLOR_ALPHA )
	varying vec4 vColor;
#endif`,color_pars_vertex:`#if defined( USE_COLOR ) || defined( USE_COLOR_ALPHA ) || defined( USE_INSTANCING_COLOR ) || defined( USE_BATCHING_COLOR )
	varying vec4 vColor;
#endif`,color_vertex:`#if defined( USE_COLOR ) || defined( USE_COLOR_ALPHA ) || defined( USE_INSTANCING_COLOR ) || defined( USE_BATCHING_COLOR )
	vColor = vec4( 1.0 );
#endif
#ifdef USE_COLOR_ALPHA
	vColor *= color;
#elif defined( USE_COLOR )
	vColor.rgb *= color;
#endif
#ifdef USE_INSTANCING_COLOR
	vColor.rgb *= instanceColor.rgb;
#endif
#ifdef USE_BATCHING_COLOR
	vColor *= getBatchingColor( getIndirectIndex( gl_DrawID ) );
#endif`,common:`#define PI 3.141592653589793
#define PI2 6.283185307179586
#define PI_HALF 1.5707963267948966
#define RECIPROCAL_PI 0.3183098861837907
#define RECIPROCAL_PI2 0.15915494309189535
#define EPSILON 1e-6
#ifndef saturate
#define saturate( a ) clamp( a, 0.0, 1.0 )
#endif
#define whiteComplement( a ) ( 1.0 - saturate( a ) )
float pow2( const in float x ) { return x*x; }
vec3 pow2( const in vec3 x ) { return x*x; }
float pow3( const in float x ) { return x*x*x; }
float pow4( const in float x ) { float x2 = x*x; return x2*x2; }
float max3( const in vec3 v ) { return max( max( v.x, v.y ), v.z ); }
float average( const in vec3 v ) { return dot( v, vec3( 0.3333333 ) ); }
highp float rand( const in vec2 uv ) {
	const highp float a = 12.9898, b = 78.233, c = 43758.5453;
	highp float dt = dot( uv.xy, vec2( a,b ) ), sn = mod( dt, PI );
	return fract( sin( sn ) * c );
}
#ifdef HIGH_PRECISION
	float precisionSafeLength( vec3 v ) { return length( v ); }
#else
	float precisionSafeLength( vec3 v ) {
		float maxComponent = max3( abs( v ) );
		return length( v / maxComponent ) * maxComponent;
	}
#endif
struct IncidentLight {
	vec3 color;
	vec3 direction;
	bool visible;
};
struct ReflectedLight {
	vec3 directDiffuse;
	vec3 directSpecular;
	vec3 indirectDiffuse;
	vec3 indirectSpecular;
};
#ifdef USE_ALPHAHASH
	varying vec3 vPosition;
#endif
vec3 transformDirection( in vec3 dir, in mat4 matrix ) {
	return normalize( ( matrix * vec4( dir, 0.0 ) ).xyz );
}
#define inverseTransformDirection transformDirectionByInverseViewMatrix
vec3 transformNormalByInverseViewMatrix( in vec3 normal, in mat4 viewMatrix ) {
	return normalize( ( vec4( normal, 0.0 ) * viewMatrix ).xyz );
}
vec3 transformDirectionByInverseViewMatrix( in vec3 dir, in mat4 viewMatrix ) {
	return normalize( ( vec4( dir, 0.0 ) * viewMatrix ).xyz );
}
bool isPerspectiveMatrix( mat4 m ) {
	return m[ 2 ][ 3 ] == - 1.0;
}
vec2 equirectUv( in vec3 dir ) {
	float u = atan( dir.z, dir.x ) * RECIPROCAL_PI2 + 0.5;
	float v = asin( clamp( dir.y, - 1.0, 1.0 ) ) * RECIPROCAL_PI + 0.5;
	return vec2( u, v );
}
vec3 BRDF_Lambert( const in vec3 diffuseColor ) {
	return RECIPROCAL_PI * diffuseColor;
}
vec3 F_Schlick( const in vec3 f0, const in float f90, const in float dotVH ) {
	float fresnel = exp2( ( - 5.55473 * dotVH - 6.98316 ) * dotVH );
	return f0 * ( 1.0 - fresnel ) + ( f90 * fresnel );
}
float F_Schlick( const in float f0, const in float f90, const in float dotVH ) {
	float fresnel = exp2( ( - 5.55473 * dotVH - 6.98316 ) * dotVH );
	return f0 * ( 1.0 - fresnel ) + ( f90 * fresnel );
} // validated`,cube_uv_reflection_fragment:`#ifdef ENVMAP_TYPE_CUBE_UV
	#define cubeUV_minMipLevel 4.0
	#define cubeUV_minTileSize 16.0
	float getFace( vec3 direction ) {
		vec3 absDirection = abs( direction );
		float face = - 1.0;
		if ( absDirection.x > absDirection.z ) {
			if ( absDirection.x > absDirection.y )
				face = direction.x > 0.0 ? 0.0 : 3.0;
			else
				face = direction.y > 0.0 ? 1.0 : 4.0;
		} else {
			if ( absDirection.z > absDirection.y )
				face = direction.z > 0.0 ? 2.0 : 5.0;
			else
				face = direction.y > 0.0 ? 1.0 : 4.0;
		}
		return face;
	}
	vec2 getUV( vec3 direction, float face ) {
		vec2 uv;
		if ( face == 0.0 ) {
			uv = vec2( direction.z, direction.y ) / abs( direction.x );
		} else if ( face == 1.0 ) {
			uv = vec2( - direction.x, - direction.z ) / abs( direction.y );
		} else if ( face == 2.0 ) {
			uv = vec2( - direction.x, direction.y ) / abs( direction.z );
		} else if ( face == 3.0 ) {
			uv = vec2( - direction.z, direction.y ) / abs( direction.x );
		} else if ( face == 4.0 ) {
			uv = vec2( - direction.x, direction.z ) / abs( direction.y );
		} else {
			uv = vec2( direction.x, direction.y ) / abs( direction.z );
		}
		return 0.5 * ( uv + 1.0 );
	}
	vec3 bilinearCubeUV( sampler2D envMap, vec3 direction, float mipInt ) {
		float face = getFace( direction );
		float filterInt = max( cubeUV_minMipLevel - mipInt, 0.0 );
		mipInt = max( mipInt, cubeUV_minMipLevel );
		float faceSize = exp2( mipInt );
		highp vec2 uv = getUV( direction, face ) * ( faceSize - 2.0 ) + 1.0;
		if ( face > 2.0 ) {
			uv.y += faceSize;
			face -= 3.0;
		}
		uv.x += face * faceSize;
		uv.x += filterInt * 3.0 * cubeUV_minTileSize;
		uv.y += 4.0 * ( exp2( CUBEUV_MAX_MIP ) - faceSize );
		uv.x *= CUBEUV_TEXEL_WIDTH;
		uv.y *= CUBEUV_TEXEL_HEIGHT;
		#ifdef texture2DGradEXT
			return texture2DGradEXT( envMap, uv, vec2( 0.0 ), vec2( 0.0 ) ).rgb;
		#else
			return texture2D( envMap, uv ).rgb;
		#endif
	}
	#define cubeUV_r0 1.0
	#define cubeUV_m0 - 2.0
	#define cubeUV_r1 0.8
	#define cubeUV_m1 - 1.0
	#define cubeUV_r4 0.4
	#define cubeUV_m4 2.0
	#define cubeUV_r5 0.305
	#define cubeUV_m5 3.0
	#define cubeUV_r6 0.21
	#define cubeUV_m6 4.0
	float roughnessToMip( float roughness ) {
		float mip = 0.0;
		if ( roughness >= cubeUV_r1 ) {
			mip = ( cubeUV_r0 - roughness ) * ( cubeUV_m1 - cubeUV_m0 ) / ( cubeUV_r0 - cubeUV_r1 ) + cubeUV_m0;
		} else if ( roughness >= cubeUV_r4 ) {
			mip = ( cubeUV_r1 - roughness ) * ( cubeUV_m4 - cubeUV_m1 ) / ( cubeUV_r1 - cubeUV_r4 ) + cubeUV_m1;
		} else if ( roughness >= cubeUV_r5 ) {
			mip = ( cubeUV_r4 - roughness ) * ( cubeUV_m5 - cubeUV_m4 ) / ( cubeUV_r4 - cubeUV_r5 ) + cubeUV_m4;
		} else if ( roughness >= cubeUV_r6 ) {
			mip = ( cubeUV_r5 - roughness ) * ( cubeUV_m6 - cubeUV_m5 ) / ( cubeUV_r5 - cubeUV_r6 ) + cubeUV_m5;
		} else {
			mip = - 2.0 * log2( 1.16 * roughness );		}
		return mip;
	}
	vec4 textureCubeUV( sampler2D envMap, vec3 sampleDir, float roughness ) {
		float mip = clamp( roughnessToMip( roughness ), cubeUV_m0, CUBEUV_MAX_MIP );
		float mipF = fract( mip );
		float mipInt = floor( mip );
		vec3 color0 = bilinearCubeUV( envMap, sampleDir, mipInt );
		if ( mipF == 0.0 ) {
			return vec4( color0, 1.0 );
		} else {
			vec3 color1 = bilinearCubeUV( envMap, sampleDir, mipInt + 1.0 );
			return vec4( mix( color0, color1, mipF ), 1.0 );
		}
	}
#endif`,defaultnormal_vertex:`vec3 transformedNormal = objectNormal;
#ifdef USE_TANGENT
	vec3 transformedTangent = objectTangent;
#endif
#ifdef USE_BATCHING
	mat3 bm = mat3( batchingMatrix );
	transformedNormal /= vec3( dot( bm[ 0 ], bm[ 0 ] ), dot( bm[ 1 ], bm[ 1 ] ), dot( bm[ 2 ], bm[ 2 ] ) );
	transformedNormal = bm * transformedNormal;
	#ifdef USE_TANGENT
		transformedTangent = bm * transformedTangent;
	#endif
#endif
#ifdef USE_INSTANCING
	mat3 im = mat3( instanceMatrix );
	transformedNormal /= vec3( dot( im[ 0 ], im[ 0 ] ), dot( im[ 1 ], im[ 1 ] ), dot( im[ 2 ], im[ 2 ] ) );
	transformedNormal = im * transformedNormal;
	#ifdef USE_TANGENT
		transformedTangent = im * transformedTangent;
	#endif
#endif
transformedNormal = normalMatrix * transformedNormal;
#ifdef FLIP_SIDED
	transformedNormal = - transformedNormal;
#endif
#ifdef USE_TANGENT
	transformedTangent = ( modelViewMatrix * vec4( transformedTangent, 0.0 ) ).xyz;
#endif`,displacementmap_pars_vertex:`#ifdef USE_DISPLACEMENTMAP
	uniform sampler2D displacementMap;
	uniform float displacementScale;
	uniform float displacementBias;
#endif`,displacementmap_vertex:`#ifdef USE_DISPLACEMENTMAP
	transformed += normalize( objectNormal ) * ( texture2D( displacementMap, vDisplacementMapUv ).x * displacementScale + displacementBias );
#endif`,emissivemap_fragment:`#ifdef USE_EMISSIVEMAP
	vec4 emissiveColor = texture2D( emissiveMap, vEmissiveMapUv );
	#ifdef DECODE_VIDEO_TEXTURE_EMISSIVE
		emissiveColor = sRGBTransferEOTF( emissiveColor );
	#endif
	totalEmissiveRadiance *= emissiveColor.rgb;
#endif`,emissivemap_pars_fragment:`#ifdef USE_EMISSIVEMAP
	uniform sampler2D emissiveMap;
#endif`,colorspace_fragment:`gl_FragColor = linearToOutputTexel( gl_FragColor );`,colorspace_pars_fragment:`vec4 LinearTransferOETF( in vec4 value ) {
	return value;
}
vec4 sRGBTransferEOTF( in vec4 value ) {
	return vec4( mix( pow( value.rgb * 0.9478672986 + vec3( 0.0521327014 ), vec3( 2.4 ) ), value.rgb * 0.0773993808, vec3( lessThanEqual( value.rgb, vec3( 0.04045 ) ) ) ), value.a );
}
vec4 sRGBTransferOETF( in vec4 value ) {
	return vec4( mix( pow( value.rgb, vec3( 0.41666 ) ) * 1.055 - vec3( 0.055 ), value.rgb * 12.92, vec3( lessThanEqual( value.rgb, vec3( 0.0031308 ) ) ) ), value.a );
}`,envmap_fragment:`#ifdef USE_ENVMAP
	#ifdef ENV_WORLDPOS
		vec3 cameraToFrag;
		if ( isOrthographic ) {
			cameraToFrag = normalize( vec3( - viewMatrix[ 0 ][ 2 ], - viewMatrix[ 1 ][ 2 ], - viewMatrix[ 2 ][ 2 ] ) );
		} else {
			cameraToFrag = normalize( vWorldPosition - cameraPosition );
		}
		vec3 worldNormal = transformNormalByInverseViewMatrix( normal, viewMatrix );
		#ifdef ENVMAP_MODE_REFLECTION
			vec3 reflectVec = reflect( cameraToFrag, worldNormal );
		#else
			vec3 reflectVec = refract( cameraToFrag, worldNormal, refractionRatio );
		#endif
	#else
		vec3 reflectVec = vReflect;
	#endif
	#ifdef ENVMAP_TYPE_CUBE
		vec4 envColor = textureCube( envMap, envMapRotation * reflectVec );
		#ifdef ENVMAP_BLENDING_MULTIPLY
			outgoingLight = mix( outgoingLight, outgoingLight * envColor.xyz, specularStrength * reflectivity );
		#elif defined( ENVMAP_BLENDING_MIX )
			outgoingLight = mix( outgoingLight, envColor.xyz, specularStrength * reflectivity );
		#elif defined( ENVMAP_BLENDING_ADD )
			outgoingLight += envColor.xyz * specularStrength * reflectivity;
		#endif
	#endif
#endif`,envmap_common_pars_fragment:`#ifdef USE_ENVMAP
	uniform float envMapIntensity;
	uniform mat3 envMapRotation;
	#ifdef ENVMAP_TYPE_CUBE
		uniform samplerCube envMap;
	#else
		uniform sampler2D envMap;
	#endif
#endif`,envmap_pars_fragment:`#ifdef USE_ENVMAP
	uniform float reflectivity;
	#if defined( USE_BUMPMAP ) || defined( USE_NORMALMAP ) || defined( PHONG ) || defined( LAMBERT )
		#define ENV_WORLDPOS
	#endif
	#ifdef ENV_WORLDPOS
		varying vec3 vWorldPosition;
		uniform float refractionRatio;
	#else
		varying vec3 vReflect;
	#endif
#endif`,envmap_pars_vertex:`#ifdef USE_ENVMAP
	#if defined( USE_BUMPMAP ) || defined( USE_NORMALMAP ) || defined( PHONG ) || defined( LAMBERT )
		#define ENV_WORLDPOS
	#endif
	#ifdef ENV_WORLDPOS
		
		varying vec3 vWorldPosition;
	#else
		varying vec3 vReflect;
		uniform float refractionRatio;
	#endif
#endif`,envmap_physical_pars_fragment:`#ifdef USE_ENVMAP
	vec3 getIBLIrradiance( const in vec3 normal ) {
		#ifdef ENVMAP_TYPE_CUBE_UV
			vec3 worldNormal = transformNormalByInverseViewMatrix( normal, viewMatrix );
			vec4 envMapColor = textureCubeUV( envMap, envMapRotation * worldNormal, 1.0 );
			return PI * envMapColor.rgb * envMapIntensity;
		#else
			return vec3( 0.0 );
		#endif
	}
	vec3 getIBLRadiance( const in vec3 viewDir, const in vec3 normal, const in float roughness ) {
		#ifdef ENVMAP_TYPE_CUBE_UV
			vec3 reflectVec = reflect( - viewDir, normal );
			reflectVec = normalize( mix( reflectVec, normal, pow4( roughness ) ) );
			reflectVec = transformDirectionByInverseViewMatrix( reflectVec, viewMatrix );
			vec4 envMapColor = textureCubeUV( envMap, envMapRotation * reflectVec, roughness );
			return envMapColor.rgb * envMapIntensity;
		#else
			return vec3( 0.0 );
		#endif
	}
	#ifdef USE_RETROREFLECTION
		vec3 getIBLRetroRadiance( const in vec3 viewDir, const in vec3 normal, const in float roughness ) {
			#ifdef ENVMAP_TYPE_CUBE_UV
				vec3 retroVec = normalize( mix( viewDir, normal, pow4( roughness ) ) );
				retroVec = transformDirectionByInverseViewMatrix( retroVec, viewMatrix );
				vec4 envMapColor = textureCubeUV( envMap, envMapRotation * retroVec, roughness );
				return envMapColor.rgb * envMapIntensity;
			#else
				return vec3( 0.0 );
			#endif
		}
	#endif
	#ifdef USE_ANISOTROPY
		vec3 getIBLAnisotropyRadiance( const in vec3 viewDir, const in vec3 normal, const in float roughness, const in vec3 bitangent, const in float anisotropy ) {
			#ifdef ENVMAP_TYPE_CUBE_UV
				vec3 bentNormal = cross( bitangent, viewDir );
				bentNormal = normalize( cross( bentNormal, bitangent ) );
				bentNormal = normalize( mix( bentNormal, normal, pow2( pow2( 1.0 - anisotropy * ( 1.0 - roughness ) ) ) ) );
				return getIBLRadiance( viewDir, bentNormal, roughness );
			#else
				return vec3( 0.0 );
			#endif
		}
		#ifdef USE_RETROREFLECTION
			vec3 getIBLAnisotropyRetroRadiance( const in vec3 viewDir, const in vec3 normal, const in float roughness, const in vec3 bitangent, const in float anisotropy ) {
				#ifdef ENVMAP_TYPE_CUBE_UV
					vec3 bentNormal = cross( bitangent, viewDir );
					bentNormal = normalize( cross( bentNormal, bitangent ) );
					bentNormal = normalize( mix( bentNormal, normal, pow2( pow2( 1.0 - anisotropy * ( 1.0 - roughness ) ) ) ) );
					return getIBLRetroRadiance( viewDir, bentNormal, roughness );
				#else
					return vec3( 0.0 );
				#endif
			}
		#endif
	#endif
#endif`,envmap_vertex:`#ifdef USE_ENVMAP
	#ifdef ENV_WORLDPOS
		vWorldPosition = worldPosition.xyz;
	#else
		vec3 cameraToVertex;
		if ( isOrthographic ) {
			cameraToVertex = normalize( vec3( - viewMatrix[ 0 ][ 2 ], - viewMatrix[ 1 ][ 2 ], - viewMatrix[ 2 ][ 2 ] ) );
		} else {
			cameraToVertex = normalize( worldPosition.xyz - cameraPosition );
		}
		vec3 worldNormal = transformNormalByInverseViewMatrix( transformedNormal, viewMatrix );
		#ifdef ENVMAP_MODE_REFLECTION
			vReflect = reflect( cameraToVertex, worldNormal );
		#else
			vReflect = refract( cameraToVertex, worldNormal, refractionRatio );
		#endif
	#endif
#endif`,fog_vertex:`#ifdef USE_FOG
	vFogDepth = - mvPosition.z;
#endif`,fog_pars_vertex:`#ifdef USE_FOG
	varying float vFogDepth;
#endif`,fog_fragment:`#ifdef USE_FOG
	#ifdef FOG_EXP2
		float fogFactor = 1.0 - exp( - fogDensity * fogDensity * vFogDepth * vFogDepth );
	#else
		float fogFactor = smoothstep( fogNear, fogFar, vFogDepth );
	#endif
	gl_FragColor.rgb = mix( gl_FragColor.rgb, fogColor, fogFactor );
#endif`,fog_pars_fragment:`#ifdef USE_FOG
	uniform vec3 fogColor;
	varying float vFogDepth;
	#ifdef FOG_EXP2
		uniform float fogDensity;
	#else
		uniform float fogNear;
		uniform float fogFar;
	#endif
#endif`,gradientmap_pars_fragment:`#ifdef USE_GRADIENTMAP
	uniform sampler2D gradientMap;
#endif
vec3 getGradientIrradiance( vec3 normal, vec3 lightDirection ) {
	float dotNL = dot( normal, lightDirection );
	vec2 coord = vec2( dotNL * 0.5 + 0.5, 0.0 );
	#ifdef USE_GRADIENTMAP
		return vec3( texture2D( gradientMap, coord ).r );
	#else
		vec2 fw = fwidth( coord ) * 0.5;
		return mix( vec3( 0.7 ), vec3( 1.0 ), smoothstep( 0.7 - fw.x, 0.7 + fw.x, coord.x ) );
	#endif
}`,lightmap_pars_fragment:`#ifdef USE_LIGHTMAP
	uniform sampler2D lightMap;
	uniform float lightMapIntensity;
#endif`,lights_lambert_fragment:`LambertMaterial material;
material.diffuseColor = diffuseColor.rgb;
material.specularStrength = specularStrength;`,lights_lambert_pars_fragment:`varying vec3 vViewPosition;
struct LambertMaterial {
	vec3 diffuseColor;
	float specularStrength;
};
void RE_Direct_Lambert( const in IncidentLight directLight, const in vec3 geometryPosition, const in vec3 geometryNormal, const in vec3 geometryViewDir, const in vec3 geometryClearcoatNormal, const in LambertMaterial material, inout ReflectedLight reflectedLight ) {
	float dotNL = saturate( dot( geometryNormal, directLight.direction ) );
	vec3 irradiance = dotNL * directLight.color;
	reflectedLight.directDiffuse += irradiance * BRDF_Lambert( material.diffuseColor );
}
void RE_IndirectDiffuse_Lambert( const in vec3 irradiance, const in vec3 geometryPosition, const in vec3 geometryNormal, const in vec3 geometryViewDir, const in vec3 geometryClearcoatNormal, const in LambertMaterial material, inout ReflectedLight reflectedLight ) {
	reflectedLight.indirectDiffuse += irradiance * BRDF_Lambert( material.diffuseColor );
}
#define RE_Direct				RE_Direct_Lambert
#define RE_IndirectDiffuse		RE_IndirectDiffuse_Lambert`,lights_pars_begin:`uniform bool receiveShadow;
uniform vec3 ambientLightColor;
#if defined( USE_LIGHT_PROBES )
	uniform vec3 lightProbe[ 9 ];
#endif
vec3 shGetIrradianceAt( in vec3 normal, in vec3 shCoefficients[ 9 ] ) {
	float x = normal.x, y = normal.y, z = normal.z;
	vec3 result = shCoefficients[ 0 ] * 0.886227;
	result += shCoefficients[ 1 ] * 2.0 * 0.511664 * y;
	result += shCoefficients[ 2 ] * 2.0 * 0.511664 * z;
	result += shCoefficients[ 3 ] * 2.0 * 0.511664 * x;
	result += shCoefficients[ 4 ] * 2.0 * 0.429043 * x * y;
	result += shCoefficients[ 5 ] * 2.0 * 0.429043 * y * z;
	result += shCoefficients[ 6 ] * ( 0.743125 * z * z - 0.247708 );
	result += shCoefficients[ 7 ] * 2.0 * 0.429043 * x * z;
	result += shCoefficients[ 8 ] * 0.429043 * ( x * x - y * y );
	return result;
}
vec3 getLightProbeIrradiance( const in vec3 lightProbe[ 9 ], const in vec3 normal ) {
	vec3 worldNormal = transformNormalByInverseViewMatrix( normal, viewMatrix );
	vec3 irradiance = shGetIrradianceAt( worldNormal, lightProbe );
	return irradiance;
}
vec3 getAmbientLightIrradiance( const in vec3 ambientLightColor ) {
	vec3 irradiance = ambientLightColor;
	return irradiance;
}
float getDistanceAttenuation( const in float lightDistance, const in float cutoffDistance, const in float decayExponent ) {
	float distanceFalloff = 1.0 / max( pow( lightDistance, decayExponent ), 0.01 );
	if ( cutoffDistance > 0.0 ) {
		distanceFalloff *= pow2( saturate( 1.0 - pow4( lightDistance / cutoffDistance ) ) );
	}
	return distanceFalloff;
}
float getSpotAttenuation( const in float coneCosine, const in float penumbraCosine, const in float angleCosine ) {
	return smoothstep( coneCosine, penumbraCosine, angleCosine );
}
#if NUM_SUN_LIGHTS > 0
	struct SunLight {
		vec3 direction;
		vec3 color;
	};
	uniform SunLight sunLights[ NUM_SUN_LIGHTS ];
	void getSunLightInfo( const in SunLight sunLight, out IncidentLight light ) {
		light.color = sunLight.color;
		light.direction = sunLight.direction;
		light.visible = true;
	}
#endif
#if NUM_DIR_LIGHTS > 0
	struct DirectionalLight {
		vec3 direction;
		vec3 color;
	};
	uniform DirectionalLight directionalLights[ NUM_DIR_LIGHTS ];
	void getDirectionalLightInfo( const in DirectionalLight directionalLight, out IncidentLight light ) {
		light.color = directionalLight.color;
		light.direction = directionalLight.direction;
		light.visible = true;
	}
#endif
#if NUM_POINT_LIGHTS > 0
	struct PointLight {
		vec3 position;
		vec3 color;
		float distance;
		float decay;
	};
	uniform PointLight pointLights[ NUM_POINT_LIGHTS ];
	void getPointLightInfo( const in PointLight pointLight, const in vec3 geometryPosition, out IncidentLight light ) {
		vec3 lVector = pointLight.position - geometryPosition;
		light.direction = normalize( lVector );
		float lightDistance = length( lVector );
		light.color = pointLight.color;
		light.color *= getDistanceAttenuation( lightDistance, pointLight.distance, pointLight.decay );
		light.visible = ( light.color != vec3( 0.0 ) );
	}
#endif
#if NUM_SPOT_LIGHTS > 0
	struct SpotLight {
		vec3 position;
		vec3 direction;
		vec3 color;
		float distance;
		float decay;
		float coneCos;
		float penumbraCos;
	};
	uniform SpotLight spotLights[ NUM_SPOT_LIGHTS ];
	void getSpotLightInfo( const in SpotLight spotLight, const in vec3 geometryPosition, out IncidentLight light ) {
		vec3 lVector = spotLight.position - geometryPosition;
		light.direction = normalize( lVector );
		float angleCos = dot( light.direction, spotLight.direction );
		float spotAttenuation = getSpotAttenuation( spotLight.coneCos, spotLight.penumbraCos, angleCos );
		if ( spotAttenuation > 0.0 ) {
			float lightDistance = length( lVector );
			light.color = spotLight.color * spotAttenuation;
			light.color *= getDistanceAttenuation( lightDistance, spotLight.distance, spotLight.decay );
			light.visible = ( light.color != vec3( 0.0 ) );
		} else {
			light.color = vec3( 0.0 );
			light.visible = false;
		}
	}
#endif
#if NUM_RECT_AREA_LIGHTS > 0
	struct RectAreaLight {
		vec3 color;
		vec3 position;
		vec3 halfWidth;
		vec3 halfHeight;
	};
	uniform sampler2D ltc_1;	uniform sampler2D ltc_2;
	uniform RectAreaLight rectAreaLights[ NUM_RECT_AREA_LIGHTS ];
#endif
#if NUM_HEMI_LIGHTS > 0
	struct HemisphereLight {
		vec3 direction;
		vec3 skyColor;
		vec3 groundColor;
	};
	uniform HemisphereLight hemisphereLights[ NUM_HEMI_LIGHTS ];
	vec3 getHemisphereLightIrradiance( const in HemisphereLight hemiLight, const in vec3 normal ) {
		float dotNL = dot( normal, hemiLight.direction );
		float hemiDiffuseWeight = 0.5 * dotNL + 0.5;
		vec3 irradiance = mix( hemiLight.groundColor, hemiLight.skyColor, hemiDiffuseWeight );
		return irradiance;
	}
#endif
#include <lightprobes_pars_fragment>`,lights_toon_fragment:`ToonMaterial material;
material.diffuseColor = diffuseColor.rgb;`,lights_toon_pars_fragment:`varying vec3 vViewPosition;
struct ToonMaterial {
	vec3 diffuseColor;
};
void RE_Direct_Toon( const in IncidentLight directLight, const in vec3 geometryPosition, const in vec3 geometryNormal, const in vec3 geometryViewDir, const in vec3 geometryClearcoatNormal, const in ToonMaterial material, inout ReflectedLight reflectedLight ) {
	vec3 irradiance = getGradientIrradiance( geometryNormal, directLight.direction ) * directLight.color;
	reflectedLight.directDiffuse += irradiance * BRDF_Lambert( material.diffuseColor );
}
void RE_IndirectDiffuse_Toon( const in vec3 irradiance, const in vec3 geometryPosition, const in vec3 geometryNormal, const in vec3 geometryViewDir, const in vec3 geometryClearcoatNormal, const in ToonMaterial material, inout ReflectedLight reflectedLight ) {
	reflectedLight.indirectDiffuse += irradiance * BRDF_Lambert( material.diffuseColor );
}
#define RE_Direct				RE_Direct_Toon
#define RE_IndirectDiffuse		RE_IndirectDiffuse_Toon`,lights_phong_fragment:`BlinnPhongMaterial material;
material.diffuseColor = diffuseColor.rgb;
material.specularColor = specular;
material.specularShininess = shininess;
material.specularStrength = specularStrength;`,lights_phong_pars_fragment:`varying vec3 vViewPosition;
struct BlinnPhongMaterial {
	vec3 diffuseColor;
	vec3 specularColor;
	float specularShininess;
	float specularStrength;
};
void RE_Direct_BlinnPhong( const in IncidentLight directLight, const in vec3 geometryPosition, const in vec3 geometryNormal, const in vec3 geometryViewDir, const in vec3 geometryClearcoatNormal, const in BlinnPhongMaterial material, inout ReflectedLight reflectedLight ) {
	float dotNL = saturate( dot( geometryNormal, directLight.direction ) );
	vec3 irradiance = dotNL * directLight.color;
	reflectedLight.directDiffuse += irradiance * BRDF_Lambert( material.diffuseColor );
	reflectedLight.directSpecular += irradiance * BRDF_BlinnPhong( directLight.direction, geometryViewDir, geometryNormal, material.specularColor, material.specularShininess ) * material.specularStrength;
}
void RE_IndirectDiffuse_BlinnPhong( const in vec3 irradiance, const in vec3 geometryPosition, const in vec3 geometryNormal, const in vec3 geometryViewDir, const in vec3 geometryClearcoatNormal, const in BlinnPhongMaterial material, inout ReflectedLight reflectedLight ) {
	reflectedLight.indirectDiffuse += irradiance * BRDF_Lambert( material.diffuseColor );
}
#define RE_Direct				RE_Direct_BlinnPhong
#define RE_IndirectDiffuse		RE_IndirectDiffuse_BlinnPhong`,lights_physical_fragment:`PhysicalMaterial material;
material.diffuseColor = diffuseColor.rgb;
material.diffuseContribution = diffuseColor.rgb * ( 1.0 - metalnessFactor );
material.metalness = metalnessFactor;
vec3 dxy = max( abs( dFdx( nonPerturbedNormal ) ), abs( dFdy( nonPerturbedNormal ) ) );
float geometryRoughness = max( max( dxy.x, dxy.y ), dxy.z );
material.roughness = max( roughnessFactor, 0.0525 );material.roughness += geometryRoughness;
material.roughness = min( material.roughness, 1.0 );
#ifdef IOR
	material.ior = ior;
	#ifdef USE_SPECULAR
		float specularIntensityFactor = specularIntensity;
		vec3 specularColorFactor = specularColor;
		#ifdef USE_SPECULAR_COLORMAP
			specularColorFactor *= texture2D( specularColorMap, vSpecularColorMapUv ).rgb;
		#endif
		#ifdef USE_SPECULAR_INTENSITYMAP
			specularIntensityFactor *= texture2D( specularIntensityMap, vSpecularIntensityMapUv ).a;
		#endif
		material.specularF90 = mix( specularIntensityFactor, 1.0, metalnessFactor );
	#else
		float specularIntensityFactor = 1.0;
		vec3 specularColorFactor = vec3( 1.0 );
		material.specularF90 = 1.0;
	#endif
	material.specularColor = min( pow2( ( material.ior - 1.0 ) / ( material.ior + 1.0 ) ) * specularColorFactor, vec3( 1.0 ) ) * specularIntensityFactor;
	material.specularColorBlended = mix( material.specularColor, diffuseColor.rgb, metalnessFactor );
#else
	material.specularColor = vec3( 0.04 );
	material.specularColorBlended = mix( material.specularColor, diffuseColor.rgb, metalnessFactor );
	material.specularF90 = 1.0;
#endif
#ifdef USE_CLEARCOAT
	material.clearcoat = clearcoat;
	material.clearcoatRoughness = clearcoatRoughness;
	material.clearcoatF0 = vec3( 0.04 );
	material.clearcoatF90 = 1.0;
	#ifdef USE_CLEARCOATMAP
		material.clearcoat *= texture2D( clearcoatMap, vClearcoatMapUv ).x;
	#endif
	#ifdef USE_CLEARCOAT_ROUGHNESSMAP
		material.clearcoatRoughness *= texture2D( clearcoatRoughnessMap, vClearcoatRoughnessMapUv ).y;
	#endif
	material.clearcoat = saturate( material.clearcoat );	material.clearcoatRoughness = max( material.clearcoatRoughness, 0.0525 );
	material.clearcoatRoughness += geometryRoughness;
	material.clearcoatRoughness = min( material.clearcoatRoughness, 1.0 );
#endif
#ifdef USE_DISPERSION
	material.dispersion = dispersion;
#endif
#ifdef USE_RETROREFLECTION
	material.retroreflectivity = retroreflectivity;
#endif
#ifdef USE_IRIDESCENCE
	material.iridescence = iridescence;
	material.iridescenceIOR = iridescenceIOR;
	#ifdef USE_IRIDESCENCEMAP
		material.iridescence *= texture2D( iridescenceMap, vIridescenceMapUv ).r;
	#endif
	#ifdef USE_IRIDESCENCE_THICKNESSMAP
		material.iridescenceThickness = (iridescenceThicknessMaximum - iridescenceThicknessMinimum) * texture2D( iridescenceThicknessMap, vIridescenceThicknessMapUv ).g + iridescenceThicknessMinimum;
	#else
		material.iridescenceThickness = iridescenceThicknessMaximum;
	#endif
#endif
#ifdef USE_SHEEN
	material.sheenColor = sheenColor;
	#ifdef USE_SHEEN_COLORMAP
		material.sheenColor *= texture2D( sheenColorMap, vSheenColorMapUv ).rgb;
	#endif
	material.sheenRoughness = clamp( sheenRoughness, 0.0001, 1.0 );
	#ifdef USE_SHEEN_ROUGHNESSMAP
		material.sheenRoughness *= texture2D( sheenRoughnessMap, vSheenRoughnessMapUv ).a;
	#endif
#endif
#ifdef USE_ANISOTROPY
	#ifdef USE_ANISOTROPYMAP
		mat2 anisotropyMat = mat2( anisotropyVector.x, anisotropyVector.y, - anisotropyVector.y, anisotropyVector.x );
		vec3 anisotropyPolar = texture2D( anisotropyMap, vAnisotropyMapUv ).rgb;
		vec2 anisotropyV = anisotropyMat * normalize( 2.0 * anisotropyPolar.rg - vec2( 1.0 ) ) * anisotropyPolar.b;
	#else
		vec2 anisotropyV = anisotropyVector;
	#endif
	material.anisotropy = length( anisotropyV );
	if( material.anisotropy == 0.0 ) {
		anisotropyV = vec2( 1.0, 0.0 );
	} else {
		anisotropyV /= material.anisotropy;
		material.anisotropy = saturate( material.anisotropy );
	}
	material.alphaT = mix( pow2( material.roughness ), 1.0, pow2( material.anisotropy ) );
	material.anisotropyT = tbn[ 0 ] * anisotropyV.x + tbn[ 1 ] * anisotropyV.y;
	material.anisotropyB = tbn[ 1 ] * anisotropyV.x - tbn[ 0 ] * anisotropyV.y;
#endif`,lights_physical_pars_fragment:`uniform sampler2D dfgLUT;
struct PhysicalMaterial {
	vec3 diffuseColor;
	vec3 diffuseContribution;
	vec3 specularColor;
	vec3 specularColorBlended;
	float roughness;
	float metalness;
	float specularF90;
	float dispersion;
	vec2 dfg;
	vec3 multiScatteringCompensation;
	#ifdef USE_RETROREFLECTION
		float retroreflectivity;
	#endif
	#ifdef USE_CLEARCOAT
		float clearcoat;
		float clearcoatRoughness;
		vec3 clearcoatF0;
		float clearcoatF90;
	#endif
	#ifdef USE_IRIDESCENCE
		float iridescence;
		float iridescenceIOR;
		float iridescenceThickness;
		vec3 iridescenceFresnel;
		vec3 iridescenceF0Dielectric;
		vec3 iridescenceF0Metallic;
	#endif
	#ifdef USE_SHEEN
		vec3 sheenColor;
		float sheenRoughness;
	#endif
	#ifdef IOR
		float ior;
	#endif
	#ifdef USE_TRANSMISSION
		float transmission;
		float transmissionAlpha;
		float thickness;
		float attenuationDistance;
		vec3 attenuationColor;
	#endif
	#ifdef USE_ANISOTROPY
		float anisotropy;
		float alphaT;
		vec3 anisotropyT;
		vec3 anisotropyB;
	#endif
};
vec3 clearcoatSpecularDirect = vec3( 0.0 );
vec3 clearcoatSpecularIndirect = vec3( 0.0 );
vec3 sheenSpecularDirect = vec3( 0.0 );
vec3 sheenSpecularIndirect = vec3(0.0 );
vec3 Schlick_to_F0( const in vec3 f, const in float f90, const in float dotVH ) {
    float x = clamp( 1.0 - dotVH, 0.0, 1.0 );
    float x2 = x * x;
    float x5 = clamp( x * x2 * x2, 0.0, 0.9999 );
    return ( f - vec3( f90 ) * x5 ) / ( 1.0 - x5 );
}
float V_GGX_SmithCorrelated( const in float alpha, const in float dotNL, const in float dotNV ) {
	float a2 = pow2( alpha );
	float gv = dotNL * sqrt( a2 + ( 1.0 - a2 ) * pow2( dotNV ) );
	float gl = dotNV * sqrt( a2 + ( 1.0 - a2 ) * pow2( dotNL ) );
	return 0.5 / max( gv + gl, EPSILON );
}
float D_GGX( const in float alpha, const in float dotNH ) {
	float a2 = pow2( alpha );
	float denom = pow2( dotNH ) * ( a2 - 1.0 ) + 1.0;
	return RECIPROCAL_PI * a2 / pow2( denom );
}
#ifdef USE_ANISOTROPY
	float V_GGX_SmithCorrelated_Anisotropic( const in float alphaT, const in float alphaB, const in float dotTV, const in float dotBV, const in float dotTL, const in float dotBL, const in float dotNV, const in float dotNL ) {
		float gv = dotNL * length( vec3( alphaT * dotTV, alphaB * dotBV, dotNV ) );
		float gl = dotNV * length( vec3( alphaT * dotTL, alphaB * dotBL, dotNL ) );
		return 0.5 / max( gv + gl, EPSILON );
	}
	float D_GGX_Anisotropic( const in float alphaT, const in float alphaB, const in float dotNH, const in float dotTH, const in float dotBH ) {
		float a2 = alphaT * alphaB;
		highp vec3 v = vec3( alphaB * dotTH, alphaT * dotBH, a2 * dotNH );
		highp float v2 = dot( v, v );
		float w2 = a2 / v2;
		return RECIPROCAL_PI * a2 * pow2 ( w2 );
	}
#endif
#ifdef USE_CLEARCOAT
	vec3 BRDF_GGX_Clearcoat( const in vec3 lightDir, const in vec3 viewDir, const in vec3 normal, const in PhysicalMaterial material) {
		vec3 f0 = material.clearcoatF0;
		float f90 = material.clearcoatF90;
		float roughness = material.clearcoatRoughness;
		float alpha = pow2( roughness );
		vec3 halfDir = normalize( lightDir + viewDir );
		float dotNL = saturate( dot( normal, lightDir ) );
		float dotNV = saturate( dot( normal, viewDir ) );
		float dotNH = saturate( dot( normal, halfDir ) );
		float dotVH = saturate( dot( viewDir, halfDir ) );
		vec3 F = F_Schlick( f0, f90, dotVH );
		float V = V_GGX_SmithCorrelated( alpha, dotNL, dotNV );
		float D = D_GGX( alpha, dotNH );
		return F * ( V * D );
	}
#endif
vec3 BRDF_GGX( const in vec3 lightDir, const in vec3 viewDir, const in vec3 normal, const in PhysicalMaterial material ) {
	vec3 f0 = material.specularColorBlended;
	float f90 = material.specularF90;
	float roughness = material.roughness;
	float alpha = pow2( roughness );
	vec3 halfDir = normalize( lightDir + viewDir );
	float dotNL = saturate( dot( normal, lightDir ) );
	float dotNV = saturate( dot( normal, viewDir ) );
	float dotNH = saturate( dot( normal, halfDir ) );
	float dotVH = saturate( dot( viewDir, halfDir ) );
	vec3 F = F_Schlick( f0, f90, dotVH );
	#ifdef USE_IRIDESCENCE
		F = mix( F, material.iridescenceFresnel, material.iridescence );
	#endif
	#ifdef USE_ANISOTROPY
		float dotTL = dot( material.anisotropyT, lightDir );
		float dotTV = dot( material.anisotropyT, viewDir );
		float dotTH = dot( material.anisotropyT, halfDir );
		float dotBL = dot( material.anisotropyB, lightDir );
		float dotBV = dot( material.anisotropyB, viewDir );
		float dotBH = dot( material.anisotropyB, halfDir );
		float V = V_GGX_SmithCorrelated_Anisotropic( material.alphaT, alpha, dotTV, dotBV, dotTL, dotBL, dotNV, dotNL );
		float D = D_GGX_Anisotropic( material.alphaT, alpha, dotNH, dotTH, dotBH );
	#else
		float V = V_GGX_SmithCorrelated( alpha, dotNL, dotNV );
		float D = D_GGX( alpha, dotNH );
	#endif
	return F * ( V * D );
}
vec2 LTC_Uv( const in vec3 N, const in vec3 V, const in float roughness ) {
	const float LUT_SIZE = 64.0;
	const float LUT_SCALE = ( LUT_SIZE - 1.0 ) / LUT_SIZE;
	const float LUT_BIAS = 0.5 / LUT_SIZE;
	float dotNV = saturate( dot( N, V ) );
	vec2 uv = vec2( roughness, sqrt( 1.0 - dotNV ) );
	uv = uv * LUT_SCALE + LUT_BIAS;
	return uv;
}
float LTC_ClippedSphereFormFactor( const in vec3 f ) {
	float l = length( f );
	return max( ( l * l + f.z ) / ( l + 1.0 ), 0.0 );
}
vec3 LTC_EdgeVectorFormFactor( const in vec3 v1, const in vec3 v2 ) {
	float x = dot( v1, v2 );
	float y = abs( x );
	float a = 0.8543985 + ( 0.4965155 + 0.0145206 * y ) * y;
	float b = 3.4175940 + ( 4.1616724 + y ) * y;
	float v = a / b;
	float theta_sintheta = ( x > 0.0 ) ? v : 0.5 * inversesqrt( max( 1.0 - x * x, 1e-7 ) ) - v;
	return cross( v1, v2 ) * theta_sintheta;
}
vec3 LTC_Evaluate( const in vec3 N, const in vec3 V, const in vec3 P, const in mat3 mInv, const in vec3 rectCoords[ 4 ] ) {
	vec3 v1 = rectCoords[ 1 ] - rectCoords[ 0 ];
	vec3 v2 = rectCoords[ 3 ] - rectCoords[ 0 ];
	vec3 lightNormal = cross( v1, v2 );
	if( dot( lightNormal, P - rectCoords[ 0 ] ) < 0.0 ) return vec3( 0.0 );
	vec3 T1, T2;
	T1 = normalize( V - N * dot( V, N ) );
	T2 = - cross( N, T1 );
	mat3 mat = mInv * transpose( mat3( T1, T2, N ) );
	vec3 coords[ 4 ];
	coords[ 0 ] = mat * ( rectCoords[ 0 ] - P );
	coords[ 1 ] = mat * ( rectCoords[ 1 ] - P );
	coords[ 2 ] = mat * ( rectCoords[ 2 ] - P );
	coords[ 3 ] = mat * ( rectCoords[ 3 ] - P );
	coords[ 0 ] = normalize( coords[ 0 ] );
	coords[ 1 ] = normalize( coords[ 1 ] );
	coords[ 2 ] = normalize( coords[ 2 ] );
	coords[ 3 ] = normalize( coords[ 3 ] );
	vec3 vectorFormFactor = vec3( 0.0 );
	vectorFormFactor += LTC_EdgeVectorFormFactor( coords[ 0 ], coords[ 1 ] );
	vectorFormFactor += LTC_EdgeVectorFormFactor( coords[ 1 ], coords[ 2 ] );
	vectorFormFactor += LTC_EdgeVectorFormFactor( coords[ 2 ], coords[ 3 ] );
	vectorFormFactor += LTC_EdgeVectorFormFactor( coords[ 3 ], coords[ 0 ] );
	float result = LTC_ClippedSphereFormFactor( vectorFormFactor );
	return vec3( result );
}
#if defined( USE_SHEEN )
float D_Charlie( float roughness, float dotNH ) {
	float alpha = pow2( roughness );
	float invAlpha = 1.0 / alpha;
	float cos2h = dotNH * dotNH;
	float sin2h = max( 1.0 - cos2h, 0.0078125 );
	return ( 2.0 + invAlpha ) * pow( sin2h, invAlpha * 0.5 ) / ( 2.0 * PI );
}
float V_Neubelt( float dotNV, float dotNL ) {
	return saturate( 1.0 / ( 4.0 * ( dotNL + dotNV - dotNL * dotNV ) ) );
}
vec3 BRDF_Sheen( const in vec3 lightDir, const in vec3 viewDir, const in vec3 normal, vec3 sheenColor, const in float sheenRoughness ) {
	vec3 halfDir = normalize( lightDir + viewDir );
	float dotNL = saturate( dot( normal, lightDir ) );
	float dotNV = saturate( dot( normal, viewDir ) );
	float dotNH = saturate( dot( normal, halfDir ) );
	float D = D_Charlie( sheenRoughness, dotNH );
	float V = V_Neubelt( dotNV, dotNL );
	return sheenColor * ( D * V );
}
#endif
float IBLSheenBRDF( const in vec3 normal, const in vec3 viewDir, const in float roughness ) {
	float dotNV = saturate( dot( normal, viewDir ) );
	float r2 = roughness * roughness;
	float rInv = 1.0 / ( roughness + 0.1 );
	float a = -1.9362 + 1.0678 * roughness + 0.4573 * r2 - 0.8469 * rInv;
	float b = -0.6014 + 0.5538 * roughness - 0.4670 * r2 - 0.1255 * rInv;
	float DG = exp( a * dotNV + b );
	return saturate( DG );
}
vec3 EnvironmentBRDF( const in vec3 normal, const in vec3 viewDir, const in vec3 specularColor, const in float specularF90, const in float roughness ) {
	float dotNV = saturate( dot( normal, viewDir ) );
	vec2 fab = texture2D( dfgLUT, vec2( roughness, dotNV ) ).rg;
	return specularColor * fab.x + specularF90 * fab.y;
}
#ifdef USE_IRIDESCENCE
void computeMultiscatteringIridescence( const in vec2 fab, const in vec3 specularColor, const in float specularF90, const in float iridescence, const in vec3 iridescenceF0, inout vec3 singleScatter, inout vec3 multiScatter ) {
#else
void computeMultiscattering( const in vec2 fab, const in vec3 specularColor, const in float specularF90, inout vec3 singleScatter, inout vec3 multiScatter ) {
#endif
	#ifdef USE_IRIDESCENCE
		vec3 Fr = mix( specularColor, iridescenceF0, iridescence );
	#else
		vec3 Fr = specularColor;
	#endif
	vec3 FssEss = Fr * fab.x + specularF90 * fab.y;
	float Ess = fab.x + fab.y;
	float Ems = 1.0 - Ess;
	vec3 Favg = Fr + ( 1.0 - Fr ) * 0.047619;	vec3 Fms = FssEss * Favg / ( 1.0 - Ems * Favg );
	singleScatter += FssEss;
	multiScatter += Fms * Ems;
}
#if NUM_RECT_AREA_LIGHTS > 0
	void RE_Direct_RectArea_Physical( const in RectAreaLight rectAreaLight, const in vec3 geometryPosition, const in vec3 geometryNormal, const in vec3 geometryViewDir, const in vec3 geometryClearcoatNormal, const in PhysicalMaterial material, inout ReflectedLight reflectedLight ) {
		vec3 normal = geometryNormal;
		vec3 viewDir = geometryViewDir;
		vec3 position = geometryPosition;
		vec3 lightPos = rectAreaLight.position;
		vec3 halfWidth = rectAreaLight.halfWidth;
		vec3 halfHeight = rectAreaLight.halfHeight;
		vec3 lightColor = rectAreaLight.color;
		float roughness = material.roughness;
		vec3 rectCoords[ 4 ];
		rectCoords[ 0 ] = lightPos + halfWidth - halfHeight;		rectCoords[ 1 ] = lightPos - halfWidth - halfHeight;
		rectCoords[ 2 ] = lightPos - halfWidth + halfHeight;
		rectCoords[ 3 ] = lightPos + halfWidth + halfHeight;
		vec2 uv = LTC_Uv( normal, viewDir, roughness );
		vec4 t1 = texture2D( ltc_1, uv );
		vec4 t2 = texture2D( ltc_2, uv );
		mat3 mInv = mat3(
			vec3( t1.x, 0, t1.y ),
			vec3(    0, 1,    0 ),
			vec3( t1.z, 0, t1.w )
		);
		vec3 fresnel = ( material.specularColorBlended * t2.x + ( material.specularF90 - material.specularColorBlended ) * t2.y );
		reflectedLight.directSpecular += lightColor * fresnel * LTC_Evaluate( normal, viewDir, position, mInv, rectCoords );
		reflectedLight.directDiffuse += lightColor * material.diffuseContribution * LTC_Evaluate( normal, viewDir, position, mat3( 1.0 ), rectCoords );
		#ifdef USE_CLEARCOAT
			vec3 Ncc = geometryClearcoatNormal;
			vec2 uvClearcoat = LTC_Uv( Ncc, viewDir, material.clearcoatRoughness );
			vec4 t1Clearcoat = texture2D( ltc_1, uvClearcoat );
			vec4 t2Clearcoat = texture2D( ltc_2, uvClearcoat );
			mat3 mInvClearcoat = mat3(
				vec3( t1Clearcoat.x, 0, t1Clearcoat.y ),
				vec3(             0, 1,             0 ),
				vec3( t1Clearcoat.z, 0, t1Clearcoat.w )
			);
			vec3 fresnelClearcoat = material.clearcoatF0 * t2Clearcoat.x + ( material.clearcoatF90 - material.clearcoatF0 ) * t2Clearcoat.y;
			clearcoatSpecularDirect += lightColor * fresnelClearcoat * LTC_Evaluate( Ncc, viewDir, position, mInvClearcoat, rectCoords );
		#endif
	}
#endif
void RE_Direct_Physical( const in IncidentLight directLight, const in vec3 geometryPosition, const in vec3 geometryNormal, const in vec3 geometryViewDir, const in vec3 geometryClearcoatNormal, const in PhysicalMaterial material, inout ReflectedLight reflectedLight ) {
	float dotNL = saturate( dot( geometryNormal, directLight.direction ) );
	vec3 irradiance = dotNL * directLight.color;
	#ifdef USE_CLEARCOAT
		float dotNLcc = saturate( dot( geometryClearcoatNormal, directLight.direction ) );
		vec3 ccIrradiance = dotNLcc * directLight.color;
		clearcoatSpecularDirect += ccIrradiance * BRDF_GGX_Clearcoat( directLight.direction, geometryViewDir, geometryClearcoatNormal, material );
	#endif
	#ifdef USE_SHEEN
 
 		sheenSpecularDirect += irradiance * BRDF_Sheen( directLight.direction, geometryViewDir, geometryNormal, material.sheenColor, material.sheenRoughness );
 
 		float sheenAlbedoV = IBLSheenBRDF( geometryNormal, geometryViewDir, material.sheenRoughness );
 		float sheenAlbedoL = IBLSheenBRDF( geometryNormal, directLight.direction, material.sheenRoughness );
 
 		float sheenEnergyComp = 1.0 - max3( material.sheenColor ) * max( sheenAlbedoV, sheenAlbedoL );
 
 		irradiance *= sheenEnergyComp;
 
 	#endif
	vec3 specularBRDF = BRDF_GGX( directLight.direction, geometryViewDir, geometryNormal, material );
	#ifdef USE_RETROREFLECTION
		vec3 retroViewDir = reflect( - geometryViewDir, geometryNormal );
		vec3 retroSpecularBRDF = BRDF_GGX( directLight.direction, retroViewDir, geometryNormal, material );
		specularBRDF = mix( specularBRDF, retroSpecularBRDF, saturate( material.retroreflectivity ) );
	#endif
	reflectedLight.directSpecular += irradiance * specularBRDF * material.multiScatteringCompensation;
	vec3 halfDir = normalize( directLight.direction + geometryViewDir );
	float dotVH = saturate( dot( geometryViewDir, halfDir ) );
	vec3 F = F_Schlick( material.specularColor, material.specularF90, dotVH );
	#ifdef USE_RETROREFLECTION
		vec3 retroHalfDir = normalize( directLight.direction + retroViewDir );
		float dotRetroVH = saturate( dot( retroViewDir, retroHalfDir ) );
		vec3 retroF = F_Schlick( material.specularColor, material.specularF90, dotRetroVH );
		F = mix( F, retroF, saturate( material.retroreflectivity ) );
	#endif
	reflectedLight.directDiffuse += irradiance * BRDF_Lambert( material.diffuseContribution ) * ( 1.0 - F );
}
void RE_IndirectDiffuse_Physical( const in vec3 irradiance, const in vec3 geometryPosition, const in vec3 geometryNormal, const in vec3 geometryViewDir, const in vec3 geometryClearcoatNormal, const in PhysicalMaterial material, inout ReflectedLight reflectedLight ) {
	vec3 singleScattering = vec3( 0.0 );
	vec3 multiScattering = vec3( 0.0 );
	#ifdef USE_IRIDESCENCE
		computeMultiscatteringIridescence( material.dfg, material.specularColor, material.specularF90, material.iridescence, material.iridescenceF0Dielectric, singleScattering, multiScattering );
	#else
		computeMultiscattering( material.dfg, material.specularColor, material.specularF90, singleScattering, multiScattering );
	#endif
	vec3 diffuse = irradiance * BRDF_Lambert( material.diffuseContribution ) * ( 1.0 - singleScattering - multiScattering );
	#ifdef USE_SHEEN
		float sheenAlbedo = IBLSheenBRDF( geometryNormal, geometryViewDir, material.sheenRoughness );
		sheenSpecularIndirect += irradiance * material.sheenColor * sheenAlbedo * RECIPROCAL_PI;
		float sheenEnergyComp = 1.0 - max3( material.sheenColor ) * sheenAlbedo;
		diffuse *= sheenEnergyComp;
	#endif
	reflectedLight.indirectDiffuse += diffuse;
}
void RE_IndirectSpecular_Physical( const in vec3 radiance, const in vec3 irradiance, const in vec3 clearcoatRadiance, const in vec3 geometryPosition, const in vec3 geometryNormal, const in vec3 geometryViewDir, const in vec3 geometryClearcoatNormal, const in PhysicalMaterial material, inout ReflectedLight reflectedLight) {
	#ifdef USE_CLEARCOAT
		clearcoatSpecularIndirect += clearcoatRadiance * EnvironmentBRDF( geometryClearcoatNormal, geometryViewDir, material.clearcoatF0, material.clearcoatF90, material.clearcoatRoughness );
	#endif
	#ifdef USE_SHEEN
		sheenSpecularIndirect += irradiance * material.sheenColor * IBLSheenBRDF( geometryNormal, geometryViewDir, material.sheenRoughness ) * RECIPROCAL_PI;
 	#endif
	vec3 singleScatteringDielectric = vec3( 0.0 );
	vec3 multiScatteringDielectric = vec3( 0.0 );
	vec3 singleScatteringMetallic = vec3( 0.0 );
	vec3 multiScatteringMetallic = vec3( 0.0 );
	#ifdef USE_IRIDESCENCE
		computeMultiscatteringIridescence( material.dfg, material.specularColor, material.specularF90, material.iridescence, material.iridescenceF0Dielectric, singleScatteringDielectric, multiScatteringDielectric );
		computeMultiscatteringIridescence( material.dfg, material.diffuseColor, material.specularF90, material.iridescence, material.iridescenceF0Metallic, singleScatteringMetallic, multiScatteringMetallic );
	#else
		computeMultiscattering( material.dfg, material.specularColor, material.specularF90, singleScatteringDielectric, multiScatteringDielectric );
		computeMultiscattering( material.dfg, material.diffuseColor, material.specularF90, singleScatteringMetallic, multiScatteringMetallic );
	#endif
	vec3 singleScattering = mix( singleScatteringDielectric, singleScatteringMetallic, material.metalness );
	vec3 multiScattering = mix( multiScatteringDielectric, multiScatteringMetallic, material.metalness );
	vec3 totalScatteringDielectric = singleScatteringDielectric + multiScatteringDielectric;
	vec3 diffuse = material.diffuseContribution * ( 1.0 - totalScatteringDielectric );
	vec3 cosineWeightedIrradiance = irradiance * RECIPROCAL_PI;
	vec3 indirectSpecular = radiance * singleScattering;
	indirectSpecular += multiScattering * cosineWeightedIrradiance;
	vec3 indirectDiffuse = diffuse * cosineWeightedIrradiance;
	#ifdef USE_SHEEN
		float sheenAlbedo = IBLSheenBRDF( geometryNormal, geometryViewDir, material.sheenRoughness );
		float sheenEnergyComp = 1.0 - max3( material.sheenColor ) * sheenAlbedo;
		indirectSpecular *= sheenEnergyComp;
		indirectDiffuse *= sheenEnergyComp;
	#endif
	reflectedLight.indirectSpecular += indirectSpecular;
	reflectedLight.indirectDiffuse += indirectDiffuse;
}
#define RE_Direct				RE_Direct_Physical
#define RE_Direct_RectArea		RE_Direct_RectArea_Physical
#define RE_IndirectDiffuse		RE_IndirectDiffuse_Physical
#define RE_IndirectSpecular		RE_IndirectSpecular_Physical
float computeSpecularOcclusion( const in float dotNV, const in float ambientOcclusion, const in float roughness ) {
	return saturate( pow( dotNV + ambientOcclusion, exp2( - 16.0 * roughness - 1.0 ) ) - 1.0 + ambientOcclusion );
}`,lights_fragment_begin:`
vec3 geometryPosition = - vViewPosition;
vec3 geometryNormal = normal;
vec3 geometryViewDir = ( isOrthographic ) ? vec3( 0, 0, 1 ) : normalize( vViewPosition );
vec3 geometryClearcoatNormal = vec3( 0.0 );
#ifdef USE_CLEARCOAT
	geometryClearcoatNormal = clearcoatNormal;
#endif
#ifdef USE_IRIDESCENCE
	float dotNVi = saturate( dot( normal, geometryViewDir ) );
	if ( material.iridescenceThickness == 0.0 ) {
		material.iridescence = 0.0;
	} else {
		material.iridescence = saturate( material.iridescence );
	}
	if ( material.iridescence > 0.0 ) {
		vec3 iridescenceFresnelDielectric = evalIridescence( 1.0, material.iridescenceIOR, dotNVi, material.iridescenceThickness, material.specularColor );
		vec3 iridescenceFresnelMetallic = evalIridescence( 1.0, material.iridescenceIOR, dotNVi, material.iridescenceThickness, material.diffuseColor );
		material.iridescenceFresnel = mix( iridescenceFresnelDielectric, iridescenceFresnelMetallic, material.metalness );
		material.iridescenceF0Dielectric = Schlick_to_F0( iridescenceFresnelDielectric, 1.0, dotNVi );
		material.iridescenceF0Metallic = Schlick_to_F0( iridescenceFresnelMetallic, 1.0, dotNVi );
	}
#endif
#ifdef STANDARD
	float dotNVms = saturate( dot( geometryNormal, geometryViewDir ) );
	material.dfg = texture2D( dfgLUT, vec2( material.roughness, dotNVms ) ).rg;
	#if ( NUM_SUN_LIGHTS > 0 || NUM_DIR_LIGHTS > 0 || NUM_POINT_LIGHTS > 0 || NUM_SPOT_LIGHTS > 0 )
		float EssMs = material.dfg.x + material.dfg.y;
		material.multiScatteringCompensation = 1.0 + material.specularColorBlended * ( 1.0 / EssMs - 1.0 );
	#endif
#endif
IncidentLight directLight;
#if ( NUM_POINT_LIGHTS > 0 ) && defined( RE_Direct )
	PointLight pointLight;
	#if defined( USE_SHADOWMAP ) && NUM_POINT_LIGHT_SHADOWS > 0
	PointLightShadow pointLightShadow;
	#endif
	#pragma unroll_loop_start
	for ( int i = 0; i < NUM_POINT_LIGHTS; i ++ ) {
		pointLight = pointLights[ i ];
		getPointLightInfo( pointLight, geometryPosition, directLight );
		#if defined( USE_SHADOWMAP ) && ( UNROLLED_LOOP_INDEX < NUM_POINT_LIGHT_SHADOWS ) && ( defined( SHADOWMAP_TYPE_PCF ) || defined( SHADOWMAP_TYPE_BASIC ) )
		pointLightShadow = pointLightShadows[ i ];
		directLight.color *= ( directLight.visible && receiveShadow ) ? getPointShadow( pointShadowMap[ i ], pointLightShadow.shadowMapSize, pointLightShadow.shadowIntensity, pointLightShadow.shadowBias, pointLightShadow.shadowRadius, vPointShadowCoord[ i ], pointLightShadow.shadowCameraNear, pointLightShadow.shadowCameraFar ) : 1.0;
		#endif
		RE_Direct( directLight, geometryPosition, geometryNormal, geometryViewDir, geometryClearcoatNormal, material, reflectedLight );
	}
	#pragma unroll_loop_end
#endif
#if ( NUM_SPOT_LIGHTS > 0 ) && defined( RE_Direct )
	SpotLight spotLight;
	vec4 spotColor;
	vec3 spotLightCoord;
	bool inSpotLightMap;
	#if defined( USE_SHADOWMAP ) && NUM_SPOT_LIGHT_SHADOWS > 0
	SpotLightShadow spotLightShadow;
	#endif
	#pragma unroll_loop_start
	for ( int i = 0; i < NUM_SPOT_LIGHTS; i ++ ) {
		spotLight = spotLights[ i ];
		getSpotLightInfo( spotLight, geometryPosition, directLight );
		#if ( UNROLLED_LOOP_INDEX < NUM_SPOT_LIGHT_SHADOWS_WITH_MAPS )
		#define SPOT_LIGHT_MAP_INDEX UNROLLED_LOOP_INDEX
		#elif ( UNROLLED_LOOP_INDEX < NUM_SPOT_LIGHT_SHADOWS )
		#define SPOT_LIGHT_MAP_INDEX NUM_SPOT_LIGHT_MAPS
		#else
		#define SPOT_LIGHT_MAP_INDEX ( UNROLLED_LOOP_INDEX - NUM_SPOT_LIGHT_SHADOWS + NUM_SPOT_LIGHT_SHADOWS_WITH_MAPS )
		#endif
		#if ( SPOT_LIGHT_MAP_INDEX < NUM_SPOT_LIGHT_MAPS )
			spotLightCoord = vSpotLightCoord[ i ].xyz / vSpotLightCoord[ i ].w;
			inSpotLightMap = all( lessThan( abs( spotLightCoord * 2. - 1. ), vec3( 1.0 ) ) );
			spotColor = texture2D( spotLightMap[ SPOT_LIGHT_MAP_INDEX ], spotLightCoord.xy );
			directLight.color = inSpotLightMap ? directLight.color * spotColor.rgb : directLight.color;
		#endif
		#undef SPOT_LIGHT_MAP_INDEX
		#if defined( USE_SHADOWMAP ) && ( UNROLLED_LOOP_INDEX < NUM_SPOT_LIGHT_SHADOWS )
		spotLightShadow = spotLightShadows[ i ];
		directLight.color *= ( directLight.visible && receiveShadow ) ? getShadow( spotShadowMap[ i ], spotLightShadow.shadowMapSize, spotLightShadow.shadowIntensity, spotLightShadow.shadowBias, spotLightShadow.shadowRadius, vSpotLightCoord[ i ] ) : 1.0;
		#endif
		RE_Direct( directLight, geometryPosition, geometryNormal, geometryViewDir, geometryClearcoatNormal, material, reflectedLight );
	}
	#pragma unroll_loop_end
#endif
#if ( NUM_SUN_LIGHTS > 0 ) && defined( RE_Direct )
	SunLight sunLight;
	#if defined( USE_SHADOWMAP ) && NUM_SUN_LIGHT_SHADOWS > 0
	SunLightShadow sunLightShadow;
	#endif
	#pragma unroll_loop_start
	for ( int i = 0; i < NUM_SUN_LIGHTS; i ++ ) {
		sunLight = sunLights[ i ];
		getSunLightInfo( sunLight, directLight );
		#if defined( USE_SHADOWMAP ) && ( UNROLLED_LOOP_INDEX < NUM_SUN_LIGHT_SHADOWS )
		sunLightShadow = sunLightShadows[ i ];
		directLight.color *= ( directLight.visible && receiveShadow ) ? getSunShadow( sunShadowMap[ i ], sunLightShadow, UNROLLED_LOOP_INDEX ) : 1.0;
		#endif
		RE_Direct( directLight, geometryPosition, geometryNormal, geometryViewDir, geometryClearcoatNormal, material, reflectedLight );
	}
	#pragma unroll_loop_end
#endif
#if ( NUM_DIR_LIGHTS > 0 ) && defined( RE_Direct )
	DirectionalLight directionalLight;
	#if defined( USE_SHADOWMAP ) && NUM_DIR_LIGHT_SHADOWS > 0
	DirectionalLightShadow directionalLightShadow;
	#endif
	#pragma unroll_loop_start
	for ( int i = 0; i < NUM_DIR_LIGHTS; i ++ ) {
		directionalLight = directionalLights[ i ];
		getDirectionalLightInfo( directionalLight, directLight );
		#if defined( USE_SHADOWMAP ) && ( UNROLLED_LOOP_INDEX < NUM_DIR_LIGHT_SHADOWS )
		directionalLightShadow = directionalLightShadows[ i ];
		directLight.color *= ( directLight.visible && receiveShadow ) ? getShadow( directionalShadowMap[ i ], directionalLightShadow.shadowMapSize, directionalLightShadow.shadowIntensity, directionalLightShadow.shadowBias, directionalLightShadow.shadowRadius, vDirectionalShadowCoord[ i ] ) : 1.0;
		#endif
		RE_Direct( directLight, geometryPosition, geometryNormal, geometryViewDir, geometryClearcoatNormal, material, reflectedLight );
	}
	#pragma unroll_loop_end
#endif
#if ( NUM_RECT_AREA_LIGHTS > 0 ) && defined( RE_Direct_RectArea )
	RectAreaLight rectAreaLight;
	#pragma unroll_loop_start
	for ( int i = 0; i < NUM_RECT_AREA_LIGHTS; i ++ ) {
		rectAreaLight = rectAreaLights[ i ];
		RE_Direct_RectArea( rectAreaLight, geometryPosition, geometryNormal, geometryViewDir, geometryClearcoatNormal, material, reflectedLight );
	}
	#pragma unroll_loop_end
#endif
#if defined( RE_IndirectDiffuse )
	vec3 iblIrradiance = vec3( 0.0 );
	vec3 irradiance = getAmbientLightIrradiance( ambientLightColor );
	#if defined( USE_LIGHT_PROBES )
		irradiance += getLightProbeIrradiance( lightProbe, geometryNormal );
	#endif
	#if ( NUM_HEMI_LIGHTS > 0 )
		#pragma unroll_loop_start
		for ( int i = 0; i < NUM_HEMI_LIGHTS; i ++ ) {
			irradiance += getHemisphereLightIrradiance( hemisphereLights[ i ], geometryNormal );
		}
		#pragma unroll_loop_end
	#endif
	#ifdef USE_LIGHT_PROBES_GRID
		vec3 probeWorldPos = ( ( vec4( geometryPosition, 1.0 ) - viewMatrix[ 3 ] ) * viewMatrix ).xyz;
		vec3 probeWorldNormal = transformNormalByInverseViewMatrix( geometryNormal, viewMatrix );
		irradiance += getLightProbeGridIrradiance( probeWorldPos, probeWorldNormal );
	#endif
#endif
#if defined( RE_IndirectSpecular )
	vec3 radiance = vec3( 0.0 );
	vec3 clearcoatRadiance = vec3( 0.0 );
#endif`,lights_fragment_maps:`#if defined( RE_IndirectDiffuse )
	#ifdef USE_LIGHTMAP
		vec4 lightMapTexel = texture2D( lightMap, vLightMapUv );
		vec3 lightMapIrradiance = lightMapTexel.rgb * lightMapIntensity;
		irradiance += lightMapIrradiance;
	#endif
	#if defined( USE_ENVMAP ) && defined( ENVMAP_TYPE_CUBE_UV )
		#if defined( STANDARD ) || defined( LAMBERT ) || defined( PHONG )
			iblIrradiance += getIBLIrradiance( geometryNormal );
		#endif
	#endif
#endif
#if defined( USE_ENVMAP ) && defined( RE_IndirectSpecular )
	#ifdef USE_ANISOTROPY
		vec3 iblRadiance = getIBLAnisotropyRadiance( geometryViewDir, geometryNormal, material.roughness, material.anisotropyB, material.anisotropy );
	#else
		vec3 iblRadiance = getIBLRadiance( geometryViewDir, geometryNormal, material.roughness );
	#endif
	#ifdef USE_RETROREFLECTION
		#ifdef USE_ANISOTROPY
			vec3 retroIBLRadiance = getIBLAnisotropyRetroRadiance( geometryViewDir, geometryNormal, material.roughness, material.anisotropyB, material.anisotropy );
		#else
			vec3 retroIBLRadiance = getIBLRetroRadiance( geometryViewDir, geometryNormal, material.roughness );
		#endif
		iblRadiance = mix( iblRadiance, retroIBLRadiance, saturate( material.retroreflectivity ) );
	#endif
	radiance += iblRadiance;
	#ifdef USE_CLEARCOAT
		clearcoatRadiance += getIBLRadiance( geometryViewDir, geometryClearcoatNormal, material.clearcoatRoughness );
	#endif
#endif`,lights_fragment_end:`#if defined( RE_IndirectDiffuse )
	#if defined( LAMBERT ) || defined( PHONG )
		irradiance += iblIrradiance;
	#endif
	RE_IndirectDiffuse( irradiance, geometryPosition, geometryNormal, geometryViewDir, geometryClearcoatNormal, material, reflectedLight );
#endif
#if defined( RE_IndirectSpecular )
	RE_IndirectSpecular( radiance, iblIrradiance, clearcoatRadiance, geometryPosition, geometryNormal, geometryViewDir, geometryClearcoatNormal, material, reflectedLight );
#endif`,lightprobes_pars_fragment:`#ifdef USE_LIGHT_PROBES_GRID
uniform highp sampler3D probesSH;
uniform vec3 probesMin;
uniform vec3 probesMax;
uniform vec3 probesResolution;
vec3 getLightProbeGridIrradiance( vec3 worldPos, vec3 worldNormal ) {
	vec3 res = probesResolution;
	vec3 gridRange = probesMax - probesMin;
	vec3 resMinusOne = res - 1.0;
	vec3 probeSpacing = gridRange / resMinusOne;
	vec3 samplePos = worldPos + worldNormal * probeSpacing * 0.5;
	vec3 uvw = clamp( ( samplePos - probesMin ) / gridRange, 0.0, 1.0 );
	uvw = uvw * resMinusOne / res + 0.5 / res;
	float nz          = res.z;
	float paddedSlices = nz + 2.0;
	float atlasDepth  = 7.0 * paddedSlices;
	float uvZBase     = uvw.z * nz + 1.0;
	vec4 s0 = texture( probesSH, vec3( uvw.xy, ( uvZBase                       ) / atlasDepth ) );
	vec4 s1 = texture( probesSH, vec3( uvw.xy, ( uvZBase +       paddedSlices   ) / atlasDepth ) );
	vec4 s2 = texture( probesSH, vec3( uvw.xy, ( uvZBase + 2.0 * paddedSlices   ) / atlasDepth ) );
	vec4 s3 = texture( probesSH, vec3( uvw.xy, ( uvZBase + 3.0 * paddedSlices   ) / atlasDepth ) );
	vec4 s4 = texture( probesSH, vec3( uvw.xy, ( uvZBase + 4.0 * paddedSlices   ) / atlasDepth ) );
	vec4 s5 = texture( probesSH, vec3( uvw.xy, ( uvZBase + 5.0 * paddedSlices   ) / atlasDepth ) );
	vec4 s6 = texture( probesSH, vec3( uvw.xy, ( uvZBase + 6.0 * paddedSlices   ) / atlasDepth ) );
	vec3 c0 = s0.xyz;
	vec3 c1 = vec3( s0.w, s1.xy );
	vec3 c2 = vec3( s1.zw, s2.x );
	vec3 c3 = s2.yzw;
	vec3 c4 = s3.xyz;
	vec3 c5 = vec3( s3.w, s4.xy );
	vec3 c6 = vec3( s4.zw, s5.x );
	vec3 c7 = s5.yzw;
	vec3 c8 = s6.xyz;
	float x = worldNormal.x, y = worldNormal.y, z = worldNormal.z;
	vec3 result = c0 * 0.886227;
	result += c1 * 2.0 * 0.511664 * y;
	result += c2 * 2.0 * 0.511664 * z;
	result += c3 * 2.0 * 0.511664 * x;
	result += c4 * 2.0 * 0.429043 * x * y;
	result += c5 * 2.0 * 0.429043 * y * z;
	result += c6 * ( 0.743125 * z * z - 0.247708 );
	result += c7 * 2.0 * 0.429043 * x * z;
	result += c8 * 0.429043 * ( x * x - y * y );
	return max( result, vec3( 0.0 ) );
}
#endif`,logdepthbuf_fragment:`#if defined( USE_LOGARITHMIC_DEPTH_BUFFER )
	gl_FragDepth = vIsPerspective == 0.0 ? gl_FragCoord.z : log2( vFragDepth ) * logDepthBufFC * 0.5;
#endif`,logdepthbuf_pars_fragment:`#if defined( USE_LOGARITHMIC_DEPTH_BUFFER )
	uniform float logDepthBufFC;
	varying float vFragDepth;
	varying float vIsPerspective;
#endif`,logdepthbuf_pars_vertex:`#ifdef USE_LOGARITHMIC_DEPTH_BUFFER
	varying float vFragDepth;
	varying float vIsPerspective;
#endif`,logdepthbuf_vertex:`#ifdef USE_LOGARITHMIC_DEPTH_BUFFER
	vFragDepth = 1.0 + gl_Position.w;
	vIsPerspective = float( isPerspectiveMatrix( projectionMatrix ) );
#endif`,map_fragment:`#ifdef USE_MAP
	vec4 sampledDiffuseColor = texture2D( map, vMapUv );
	#ifdef DECODE_VIDEO_TEXTURE
		sampledDiffuseColor = sRGBTransferEOTF( sampledDiffuseColor );
	#endif
	diffuseColor *= sampledDiffuseColor;
#endif`,map_pars_fragment:`#ifdef USE_MAP
	uniform sampler2D map;
#endif`,map_particle_fragment:`#if defined( USE_MAP ) || defined( USE_ALPHAMAP )
	#if defined( USE_POINTS_UV )
		vec2 uv = vUv;
	#else
		vec2 uv = ( uvTransform * vec3( gl_PointCoord.x, 1.0 - gl_PointCoord.y, 1 ) ).xy;
	#endif
#endif
#ifdef USE_MAP
	diffuseColor *= texture2D( map, uv );
#endif
#ifdef USE_ALPHAMAP
	diffuseColor.a *= texture2D( alphaMap, uv ).g;
#endif`,map_particle_pars_fragment:`#if defined( USE_POINTS_UV )
	varying vec2 vUv;
#else
	#if defined( USE_MAP ) || defined( USE_ALPHAMAP )
		uniform mat3 uvTransform;
	#endif
#endif
#ifdef USE_MAP
	uniform sampler2D map;
#endif
#ifdef USE_ALPHAMAP
	uniform sampler2D alphaMap;
#endif`,metalnessmap_fragment:`float metalnessFactor = metalness;
#ifdef USE_METALNESSMAP
	vec4 texelMetalness = texture2D( metalnessMap, vMetalnessMapUv );
	metalnessFactor *= texelMetalness.b;
#endif`,metalnessmap_pars_fragment:`#ifdef USE_METALNESSMAP
	uniform sampler2D metalnessMap;
#endif`,morphinstance_vertex:`#ifdef USE_INSTANCING_MORPH
	float morphTargetInfluences[ MORPHTARGETS_COUNT ];
	float morphTargetBaseInfluence = texelFetch( morphTexture, ivec2( 0, gl_InstanceID ), 0 ).r;
	for ( int i = 0; i < MORPHTARGETS_COUNT; i ++ ) {
		morphTargetInfluences[i] =  texelFetch( morphTexture, ivec2( i + 1, gl_InstanceID ), 0 ).r;
	}
#endif`,morphcolor_vertex:`#if defined( USE_MORPHCOLORS )
	vColor *= morphTargetBaseInfluence;
	for ( int i = 0; i < MORPHTARGETS_COUNT; i ++ ) {
		#if defined( USE_COLOR_ALPHA )
			if ( morphTargetInfluences[ i ] != 0.0 ) vColor += getMorph( gl_VertexID, i, 2 ) * morphTargetInfluences[ i ];
		#elif defined( USE_COLOR )
			if ( morphTargetInfluences[ i ] != 0.0 ) vColor += getMorph( gl_VertexID, i, 2 ).rgb * morphTargetInfluences[ i ];
		#endif
	}
#endif`,morphnormal_vertex:`#ifdef USE_MORPHNORMALS
	objectNormal *= morphTargetBaseInfluence;
	for ( int i = 0; i < MORPHTARGETS_COUNT; i ++ ) {
		if ( morphTargetInfluences[ i ] != 0.0 ) objectNormal += getMorph( gl_VertexID, i, 1 ).xyz * morphTargetInfluences[ i ];
	}
#endif`,morphtarget_pars_vertex:`#ifdef USE_MORPHTARGETS
	#ifndef USE_INSTANCING_MORPH
		uniform float morphTargetBaseInfluence;
		uniform float morphTargetInfluences[ MORPHTARGETS_COUNT ];
	#endif
	uniform sampler2DArray morphTargetsTexture;
	uniform ivec2 morphTargetsTextureSize;
	vec4 getMorph( const in int vertexIndex, const in int morphTargetIndex, const in int offset ) {
		int texelIndex = vertexIndex * MORPHTARGETS_TEXTURE_STRIDE + offset;
		int y = texelIndex / morphTargetsTextureSize.x;
		int x = texelIndex - y * morphTargetsTextureSize.x;
		ivec3 morphUV = ivec3( x, y, morphTargetIndex );
		return texelFetch( morphTargetsTexture, morphUV, 0 );
	}
#endif`,morphtarget_vertex:`#ifdef USE_MORPHTARGETS
	transformed *= morphTargetBaseInfluence;
	for ( int i = 0; i < MORPHTARGETS_COUNT; i ++ ) {
		if ( morphTargetInfluences[ i ] != 0.0 ) transformed += getMorph( gl_VertexID, i, 0 ).xyz * morphTargetInfluences[ i ];
	}
#endif`,normal_fragment_begin:`float faceDirection = gl_FrontFacing ? 1.0 : - 1.0;
#ifdef FLAT_SHADED
	vec3 fdx = dFdx( vViewPosition );
	vec3 fdy = dFdy( vViewPosition );
	vec3 normal = normalize( cross( fdx, fdy ) );
#else
	vec3 normal = normalize( vNormal );
	#ifdef DOUBLE_SIDED
		normal *= faceDirection;
	#endif
#endif
#if defined( USE_NORMALMAP_TANGENTSPACE ) || defined( USE_CLEARCOAT_NORMALMAP ) || defined( USE_ANISOTROPY )
	#ifdef USE_TANGENT
		mat3 tbn = mat3( normalize( vTangent ), normalize( vBitangent ), normal );
	#else
		mat3 tbn = getTangentFrame( - vViewPosition, normal,
		#if defined( USE_NORMALMAP )
			vNormalMapUv
		#elif defined( USE_CLEARCOAT_NORMALMAP )
			vClearcoatNormalMapUv
		#else
			vUv
		#endif
		);
	#endif
	#ifdef DOUBLE_SIDED
		tbn[0] *= faceDirection;
		tbn[1] *= faceDirection;
	#endif
#endif
#ifdef USE_CLEARCOAT_NORMALMAP
	#ifdef USE_TANGENT
		mat3 tbn2 = mat3( normalize( vTangent ), normalize( vBitangent ), normal );
	#else
		mat3 tbn2 = getTangentFrame( - vViewPosition, normal, vClearcoatNormalMapUv );
	#endif
	#ifdef DOUBLE_SIDED
		tbn2[0] *= faceDirection;
		tbn2[1] *= faceDirection;
	#endif
#endif
vec3 nonPerturbedNormal = normal;`,normal_fragment_maps:`#ifdef USE_NORMALMAP_OBJECTSPACE
	normal = texture2D( normalMap, vNormalMapUv ).xyz * 2.0 - 1.0;
	#ifdef FLIP_SIDED
		normal = - normal;
	#endif
	#ifdef DOUBLE_SIDED
		normal = normal * faceDirection;
	#endif
	normal = normalize( normalMatrix * normal );
#elif defined( USE_NORMALMAP_TANGENTSPACE )
	vec3 mapN = texture2D( normalMap, vNormalMapUv ).xyz * 2.0 - 1.0;
	#if defined( USE_PACKED_NORMALMAP )
		mapN = vec3( mapN.xy, sqrt( saturate( 1.0 - dot( mapN.xy, mapN.xy ) ) ) );
	#endif
	mapN.xy *= normalScale;
	normal = normalize( tbn * mapN );
#elif defined( USE_BUMPMAP )
	normal = perturbNormalArb( - vViewPosition, normal, dHdxy_fwd(), faceDirection );
#endif`,normal_pars_fragment:`#ifndef FLAT_SHADED
	varying vec3 vNormal;
	#ifdef USE_TANGENT
		varying vec3 vTangent;
		varying vec3 vBitangent;
	#endif
#endif`,normal_pars_vertex:`#ifndef FLAT_SHADED
	varying vec3 vNormal;
	#ifdef USE_TANGENT
		varying vec3 vTangent;
		varying vec3 vBitangent;
	#endif
#endif`,normal_vertex:`#ifndef FLAT_SHADED
	vNormal = normalize( transformedNormal );
	#ifdef USE_TANGENT
		vTangent = normalize( transformedTangent );
		vBitangent = normalize( cross( vNormal, vTangent ) * tangent.w );
		#ifdef FLIP_SIDED
			vBitangent = - vBitangent;
		#endif
	#endif
#endif`,normalmap_pars_fragment:`#ifdef USE_NORMALMAP
	uniform sampler2D normalMap;
	uniform vec2 normalScale;
#endif
#ifdef USE_NORMALMAP_OBJECTSPACE
	uniform mat3 normalMatrix;
#endif
#if ! defined ( USE_TANGENT ) && ( defined ( USE_NORMALMAP_TANGENTSPACE ) || defined ( USE_CLEARCOAT_NORMALMAP ) || defined( USE_ANISOTROPY ) )
	mat3 getTangentFrame( vec3 eye_pos, vec3 surf_norm, vec2 uv ) {
		vec3 q0 = dFdx( eye_pos.xyz );
		vec3 q1 = dFdy( eye_pos.xyz );
		vec2 st0 = dFdx( uv.st );
		vec2 st1 = dFdy( uv.st );
		vec3 N = surf_norm;
		vec3 q1perp = cross( q1, N );
		vec3 q0perp = cross( N, q0 );
		vec3 T = q1perp * st0.x + q0perp * st1.x;
		vec3 B = q1perp * st0.y + q0perp * st1.y;
		float det = max( dot( T, T ), dot( B, B ) );
		float scale = ( det == 0.0 ) ? 0.0 : inversesqrt( det );
		return mat3( T * scale, B * scale, N );
	}
#endif`,clearcoat_normal_fragment_begin:`#ifdef USE_CLEARCOAT
	vec3 clearcoatNormal = nonPerturbedNormal;
#endif`,clearcoat_normal_fragment_maps:`#ifdef USE_CLEARCOAT_NORMALMAP
	vec3 clearcoatMapN = texture2D( clearcoatNormalMap, vClearcoatNormalMapUv ).xyz * 2.0 - 1.0;
	clearcoatMapN.xy *= clearcoatNormalScale;
	clearcoatNormal = normalize( tbn2 * clearcoatMapN );
#endif`,clearcoat_pars_fragment:`#ifdef USE_CLEARCOATMAP
	uniform sampler2D clearcoatMap;
#endif
#ifdef USE_CLEARCOAT_NORMALMAP
	uniform sampler2D clearcoatNormalMap;
	uniform vec2 clearcoatNormalScale;
#endif
#ifdef USE_CLEARCOAT_ROUGHNESSMAP
	uniform sampler2D clearcoatRoughnessMap;
#endif`,iridescence_pars_fragment:`#ifdef USE_IRIDESCENCEMAP
	uniform sampler2D iridescenceMap;
#endif
#ifdef USE_IRIDESCENCE_THICKNESSMAP
	uniform sampler2D iridescenceThicknessMap;
#endif`,opaque_fragment:`#ifdef OPAQUE
diffuseColor.a = 1.0;
#endif
#ifdef USE_TRANSMISSION
diffuseColor.a *= material.transmissionAlpha;
#endif
gl_FragColor = vec4( outgoingLight, diffuseColor.a );`,packing:`vec3 packNormalToRGB( const in vec3 normal ) {
	return normalize( normal ) * 0.5 + 0.5;
}
vec3 unpackRGBToNormal( const in vec3 rgb ) {
	return 2.0 * rgb.xyz - 1.0;
}
const float PackUpscale = 256. / 255.;const float UnpackDownscale = 255. / 256.;const float ShiftRight8 = 1. / 256.;
const float Inv255 = 1. / 255.;
const vec4 PackFactors = vec4( 1.0, 256.0, 256.0 * 256.0, 256.0 * 256.0 * 256.0 );
const vec2 UnpackFactors2 = vec2( UnpackDownscale, 1.0 / PackFactors.g );
const vec3 UnpackFactors3 = vec3( UnpackDownscale / PackFactors.rg, 1.0 / PackFactors.b );
const vec4 UnpackFactors4 = vec4( UnpackDownscale / PackFactors.rgb, 1.0 / PackFactors.a );
vec4 packDepthToRGBA( const in float v ) {
	if( v <= 0.0 )
		return vec4( 0., 0., 0., 0. );
	if( v >= 1.0 )
		return vec4( 1., 1., 1., 1. );
	float vuf;
	float af = modf( v * PackFactors.a, vuf );
	float bf = modf( vuf * ShiftRight8, vuf );
	float gf = modf( vuf * ShiftRight8, vuf );
	return vec4( vuf * Inv255, gf * PackUpscale, bf * PackUpscale, af );
}
vec3 packDepthToRGB( const in float v ) {
	if( v <= 0.0 )
		return vec3( 0., 0., 0. );
	if( v >= 1.0 )
		return vec3( 1., 1., 1. );
	float vuf;
	float bf = modf( v * PackFactors.b, vuf );
	float gf = modf( vuf * ShiftRight8, vuf );
	return vec3( vuf * Inv255, gf * PackUpscale, bf );
}
vec2 packDepthToRG( const in float v ) {
	if( v <= 0.0 )
		return vec2( 0., 0. );
	if( v >= 1.0 )
		return vec2( 1., 1. );
	float vuf;
	float gf = modf( v * 256., vuf );
	return vec2( vuf * Inv255, gf );
}
float unpackRGBAToDepth( const in vec4 v ) {
	return dot( v, UnpackFactors4 );
}
float unpackRGBToDepth( const in vec3 v ) {
	return dot( v, UnpackFactors3 );
}
float unpackRGToDepth( const in vec2 v ) {
	return v.r * UnpackFactors2.r + v.g * UnpackFactors2.g;
}
vec4 pack2HalfToRGBA( const in vec2 v ) {
	vec4 r = vec4( v.x, fract( v.x * 255.0 ), v.y, fract( v.y * 255.0 ) );
	return vec4( r.x - r.y / 255.0, r.y, r.z - r.w / 255.0, r.w );
}
vec2 unpackRGBATo2Half( const in vec4 v ) {
	return vec2( v.x + ( v.y / 255.0 ), v.z + ( v.w / 255.0 ) );
}
float viewZToOrthographicDepth( const in float viewZ, const in float near, const in float far ) {
	return ( viewZ + near ) / ( near - far );
}
float orthographicDepthToViewZ( const in float depth, const in float near, const in float far ) {
	#ifdef USE_REVERSED_DEPTH_BUFFER
	
		return depth * ( far - near ) - far;
	#else
		return depth * ( near - far ) - near;
	#endif
}
float viewZToPerspectiveDepth( const in float viewZ, const in float near, const in float far ) {
	return ( ( near + viewZ ) * far ) / ( ( far - near ) * viewZ );
}
float perspectiveDepthToViewZ( const in float depth, const in float near, const in float far ) {
	
	#ifdef USE_REVERSED_DEPTH_BUFFER
		return ( near * far ) / ( ( near - far ) * depth - near );
	#else
		return ( near * far ) / ( ( far - near ) * depth - far );
	#endif
}`,premultiplied_alpha_fragment:`#ifdef PREMULTIPLIED_ALPHA
	gl_FragColor.rgb *= gl_FragColor.a;
#endif`,project_vertex:`vec4 mvPosition = vec4( transformed, 1.0 );
#ifdef USE_BATCHING
	mvPosition = batchingMatrix * mvPosition;
#endif
#ifdef USE_INSTANCING
	mvPosition = instanceMatrix * mvPosition;
#endif
mvPosition = modelViewMatrix * mvPosition;
gl_Position = projectionMatrix * mvPosition;`,dithering_fragment:`#ifdef DITHERING
	gl_FragColor.rgb = dithering( gl_FragColor.rgb );
#endif`,dithering_pars_fragment:`#ifdef DITHERING
	vec3 dithering( vec3 color ) {
		float grid_position = rand( gl_FragCoord.xy );
		vec3 dither_shift_RGB = vec3( 0.25 / 255.0, -0.25 / 255.0, 0.25 / 255.0 );
		dither_shift_RGB = mix( 2.0 * dither_shift_RGB, -2.0 * dither_shift_RGB, grid_position );
		return color + dither_shift_RGB;
	}
#endif`,roughnessmap_fragment:`float roughnessFactor = roughness;
#ifdef USE_ROUGHNESSMAP
	vec4 texelRoughness = texture2D( roughnessMap, vRoughnessMapUv );
	roughnessFactor *= texelRoughness.g;
#endif`,roughnessmap_pars_fragment:`#ifdef USE_ROUGHNESSMAP
	uniform sampler2D roughnessMap;
#endif`,shadowmap_pars_fragment:`#if NUM_SPOT_LIGHT_COORDS > 0
	varying vec4 vSpotLightCoord[ NUM_SPOT_LIGHT_COORDS ];
#endif
#if NUM_SPOT_LIGHT_MAPS > 0
	uniform sampler2D spotLightMap[ NUM_SPOT_LIGHT_MAPS ];
#endif
#ifdef USE_SHADOWMAP
	#if NUM_SUN_LIGHT_SHADOWS > 0
		#define SUN_LIGHT_CASCADES 2
		#if defined( SHADOWMAP_TYPE_PCF )
			uniform sampler2DShadow sunShadowMap[ NUM_SUN_LIGHT_SHADOWS ];
		#else
			uniform sampler2D sunShadowMap[ NUM_SUN_LIGHT_SHADOWS ];
		#endif
		uniform mat4 sunShadowMatrix[ NUM_SUN_LIGHT_SHADOWS * SUN_LIGHT_CASCADES ];
		uniform vec4 sunShadowCascade[ NUM_SUN_LIGHT_SHADOWS * SUN_LIGHT_CASCADES ];
		varying vec4 vSunShadowWorldPosition;
		varying vec3 vSunShadowWorldNormal;
		struct SunLightShadow {
			float shadowIntensity;
			float shadowBias;
			float shadowNormalBias;
			float shadowRadius;
			vec2 shadowMapSize;
		};
		uniform SunLightShadow sunLightShadows[ NUM_SUN_LIGHT_SHADOWS ];
	#endif
	#if NUM_DIR_LIGHT_SHADOWS > 0
		#if defined( SHADOWMAP_TYPE_PCF )
			uniform sampler2DShadow directionalShadowMap[ NUM_DIR_LIGHT_SHADOWS ];
		#else
			uniform sampler2D directionalShadowMap[ NUM_DIR_LIGHT_SHADOWS ];
		#endif
		varying vec4 vDirectionalShadowCoord[ NUM_DIR_LIGHT_SHADOWS ];
		struct DirectionalLightShadow {
			float shadowIntensity;
			float shadowBias;
			float shadowNormalBias;
			float shadowRadius;
			vec2 shadowMapSize;
		};
		uniform DirectionalLightShadow directionalLightShadows[ NUM_DIR_LIGHT_SHADOWS ];
	#endif
	#if NUM_SPOT_LIGHT_SHADOWS > 0
		#if defined( SHADOWMAP_TYPE_PCF )
			uniform sampler2DShadow spotShadowMap[ NUM_SPOT_LIGHT_SHADOWS ];
		#else
			uniform sampler2D spotShadowMap[ NUM_SPOT_LIGHT_SHADOWS ];
		#endif
		struct SpotLightShadow {
			float shadowIntensity;
			float shadowBias;
			float shadowNormalBias;
			float shadowRadius;
			vec2 shadowMapSize;
		};
		uniform SpotLightShadow spotLightShadows[ NUM_SPOT_LIGHT_SHADOWS ];
	#endif
	#if NUM_POINT_LIGHT_SHADOWS > 0
		#if defined( SHADOWMAP_TYPE_PCF )
			uniform samplerCubeShadow pointShadowMap[ NUM_POINT_LIGHT_SHADOWS ];
		#elif defined( SHADOWMAP_TYPE_BASIC )
			uniform samplerCube pointShadowMap[ NUM_POINT_LIGHT_SHADOWS ];
		#endif
		varying vec4 vPointShadowCoord[ NUM_POINT_LIGHT_SHADOWS ];
		struct PointLightShadow {
			float shadowIntensity;
			float shadowBias;
			float shadowNormalBias;
			float shadowRadius;
			vec2 shadowMapSize;
			float shadowCameraNear;
			float shadowCameraFar;
		};
		uniform PointLightShadow pointLightShadows[ NUM_POINT_LIGHT_SHADOWS ];
	#endif
	#if defined( SHADOWMAP_TYPE_PCF )
		float interleavedGradientNoise( vec2 position ) {
			return fract( 52.9829189 * fract( dot( position, vec2( 0.06711056, 0.00583715 ) ) ) );
		}
		vec2 vogelDiskSample( int sampleIndex, int samplesCount, float phi ) {
			const float goldenAngle = 2.399963229728653;
			float r = sqrt( ( float( sampleIndex ) + 0.5 ) / float( samplesCount ) );
			float theta = float( sampleIndex ) * goldenAngle + phi;
			return vec2( cos( theta ), sin( theta ) ) * r;
		}
	#endif
	#if defined( SHADOWMAP_TYPE_PCF )
		float getShadow( sampler2DShadow shadowMap, vec2 shadowMapSize, float shadowIntensity, float shadowBias, float shadowRadius, vec4 shadowCoord ) {
			float shadow = 1.0;
			shadowCoord.xyz /= shadowCoord.w;
			shadowCoord.z += shadowBias;
			bool inFrustum = shadowCoord.x >= 0.0 && shadowCoord.x <= 1.0 && shadowCoord.y >= 0.0 && shadowCoord.y <= 1.0;
			bool frustumTest = inFrustum && shadowCoord.z <= 1.0;
			if ( frustumTest ) {
				vec2 texelSize = vec2( 1.0 ) / shadowMapSize;
				float radius = shadowRadius * texelSize.x;
				float phi = interleavedGradientNoise( gl_FragCoord.xy ) * PI2;
				shadow = (
					texture( shadowMap, vec3( shadowCoord.xy + vogelDiskSample( 0, 5, phi ) * radius, shadowCoord.z ) ) +
					texture( shadowMap, vec3( shadowCoord.xy + vogelDiskSample( 1, 5, phi ) * radius, shadowCoord.z ) ) +
					texture( shadowMap, vec3( shadowCoord.xy + vogelDiskSample( 2, 5, phi ) * radius, shadowCoord.z ) ) +
					texture( shadowMap, vec3( shadowCoord.xy + vogelDiskSample( 3, 5, phi ) * radius, shadowCoord.z ) ) +
					texture( shadowMap, vec3( shadowCoord.xy + vogelDiskSample( 4, 5, phi ) * radius, shadowCoord.z ) )
				) * 0.2;
			}
			return mix( 1.0, shadow, shadowIntensity );
		}
	#elif defined( SHADOWMAP_TYPE_VSM )
		float getShadow( sampler2D shadowMap, vec2 shadowMapSize, float shadowIntensity, float shadowBias, float shadowRadius, vec4 shadowCoord ) {
			float shadow = 1.0;
			shadowCoord.xyz /= shadowCoord.w;
			#ifdef USE_REVERSED_DEPTH_BUFFER
				shadowCoord.z -= shadowBias;
			#else
				shadowCoord.z += shadowBias;
			#endif
			bool inFrustum = shadowCoord.x >= 0.0 && shadowCoord.x <= 1.0 && shadowCoord.y >= 0.0 && shadowCoord.y <= 1.0;
			bool frustumTest = inFrustum && shadowCoord.z <= 1.0;
			if ( frustumTest ) {
				vec2 distribution = texture2D( shadowMap, shadowCoord.xy ).rg;
				float mean = distribution.x;
				float variance = distribution.y * distribution.y;
				#ifdef USE_REVERSED_DEPTH_BUFFER
					float hard_shadow = step( mean, shadowCoord.z );
				#else
					float hard_shadow = step( shadowCoord.z, mean );
				#endif
				
				if ( hard_shadow == 1.0 ) {
					shadow = 1.0;
				} else {
					variance = max( variance, 0.0000001 );
					float d = shadowCoord.z - mean;
					float p_max = variance / ( variance + d * d );
					p_max = clamp( ( p_max - 0.3 ) / 0.65, 0.0, 1.0 );
					shadow = max( hard_shadow, p_max );
				}
			}
			return mix( 1.0, shadow, shadowIntensity );
		}
	#else
		float getShadow( sampler2D shadowMap, vec2 shadowMapSize, float shadowIntensity, float shadowBias, float shadowRadius, vec4 shadowCoord ) {
			float shadow = 1.0;
			shadowCoord.xyz /= shadowCoord.w;
			#ifdef USE_REVERSED_DEPTH_BUFFER
				shadowCoord.z -= shadowBias;
			#else
				shadowCoord.z += shadowBias;
			#endif
			bool inFrustum = shadowCoord.x >= 0.0 && shadowCoord.x <= 1.0 && shadowCoord.y >= 0.0 && shadowCoord.y <= 1.0;
			bool frustumTest = inFrustum && shadowCoord.z <= 1.0;
			if ( frustumTest ) {
				float depth = texture2D( shadowMap, shadowCoord.xy ).r;
				#ifdef USE_REVERSED_DEPTH_BUFFER
					shadow = step( depth, shadowCoord.z );
				#else
					shadow = step( shadowCoord.z, depth );
				#endif
			}
			return mix( 1.0, shadow, shadowIntensity );
		}
	#endif
	#if NUM_SUN_LIGHT_SHADOWS > 0
		float getSunShadow(
			#if defined( SHADOWMAP_TYPE_PCF )
				sampler2DShadow shadowMap,
			#else
				sampler2D shadowMap,
			#endif
			SunLightShadow sunLightShadow,
			int shadowIndex
		) {
			vec4 shadowWorldPosition = vec4( vSunShadowWorldPosition.xyz + vSunShadowWorldNormal * sunLightShadow.shadowNormalBias, 1.0 );
			float viewDepth = vSunShadowWorldPosition.w;
			int cascadeOffset = shadowIndex * SUN_LIGHT_CASCADES;
			float shadow = 1.0;
			for ( int i = SUN_LIGHT_CASCADES - 1; i >= 0; i -- ) {
				vec4 cascade = sunShadowCascade[ cascadeOffset + i ];
				if ( viewDepth >= cascade.x && viewDepth < cascade.y ) {
					float cascadeShadow = getShadow(
						shadowMap,
						sunLightShadow.shadowMapSize,
						sunLightShadow.shadowIntensity,
						sunLightShadow.shadowBias,
						sunLightShadow.shadowRadius,
						sunShadowMatrix[ cascadeOffset + i ] * shadowWorldPosition
					);
					shadow = mix( cascadeShadow, shadow, smoothstep( cascade.z, cascade.y, viewDepth ) );
				}
			}
			return shadow;
		}
	#endif
	#if NUM_POINT_LIGHT_SHADOWS > 0
	#if defined( SHADOWMAP_TYPE_PCF )
	float getPointShadow( samplerCubeShadow shadowMap, vec2 shadowMapSize, float shadowIntensity, float shadowBias, float shadowRadius, vec4 shadowCoord, float shadowCameraNear, float shadowCameraFar ) {
		float shadow = 1.0;
		vec3 lightToPosition = shadowCoord.xyz;
		vec3 bd3D = normalize( lightToPosition );
		vec3 absVec = abs( lightToPosition );
		float viewSpaceZ = max( max( absVec.x, absVec.y ), absVec.z );
		if ( viewSpaceZ - shadowCameraFar <= 0.0 && viewSpaceZ - shadowCameraNear >= 0.0 ) {
			#ifdef USE_REVERSED_DEPTH_BUFFER
				float dp = ( shadowCameraNear * ( shadowCameraFar - viewSpaceZ ) ) / ( viewSpaceZ * ( shadowCameraFar - shadowCameraNear ) );
				dp -= shadowBias;
			#else
				float dp = ( shadowCameraFar * ( viewSpaceZ - shadowCameraNear ) ) / ( viewSpaceZ * ( shadowCameraFar - shadowCameraNear ) );
				dp += shadowBias;
			#endif
			float texelSize = shadowRadius / shadowMapSize.x;
			vec3 absDir = abs( bd3D );
			vec3 tangent = absDir.x > absDir.z ? vec3( 0.0, 1.0, 0.0 ) : vec3( 1.0, 0.0, 0.0 );
			tangent = normalize( cross( bd3D, tangent ) );
			vec3 bitangent = cross( bd3D, tangent );
			float phi = interleavedGradientNoise( gl_FragCoord.xy ) * PI2;
			vec2 sample0 = vogelDiskSample( 0, 5, phi );
			vec2 sample1 = vogelDiskSample( 1, 5, phi );
			vec2 sample2 = vogelDiskSample( 2, 5, phi );
			vec2 sample3 = vogelDiskSample( 3, 5, phi );
			vec2 sample4 = vogelDiskSample( 4, 5, phi );
			shadow = (
				texture( shadowMap, vec4( bd3D + ( tangent * sample0.x + bitangent * sample0.y ) * texelSize, dp ) ) +
				texture( shadowMap, vec4( bd3D + ( tangent * sample1.x + bitangent * sample1.y ) * texelSize, dp ) ) +
				texture( shadowMap, vec4( bd3D + ( tangent * sample2.x + bitangent * sample2.y ) * texelSize, dp ) ) +
				texture( shadowMap, vec4( bd3D + ( tangent * sample3.x + bitangent * sample3.y ) * texelSize, dp ) ) +
				texture( shadowMap, vec4( bd3D + ( tangent * sample4.x + bitangent * sample4.y ) * texelSize, dp ) )
			) * 0.2;
		}
		return mix( 1.0, shadow, shadowIntensity );
	}
	#elif defined( SHADOWMAP_TYPE_BASIC )
	float getPointShadow( samplerCube shadowMap, vec2 shadowMapSize, float shadowIntensity, float shadowBias, float shadowRadius, vec4 shadowCoord, float shadowCameraNear, float shadowCameraFar ) {
		float shadow = 1.0;
		vec3 lightToPosition = shadowCoord.xyz;
		vec3 absVec = abs( lightToPosition );
		float viewSpaceZ = max( max( absVec.x, absVec.y ), absVec.z );
		if ( viewSpaceZ - shadowCameraFar <= 0.0 && viewSpaceZ - shadowCameraNear >= 0.0 ) {
			float dp = ( shadowCameraFar * ( viewSpaceZ - shadowCameraNear ) ) / ( viewSpaceZ * ( shadowCameraFar - shadowCameraNear ) );
			dp += shadowBias;
			vec3 bd3D = normalize( lightToPosition );
			float depth = textureCube( shadowMap, bd3D ).r;
			#ifdef USE_REVERSED_DEPTH_BUFFER
				depth = 1.0 - depth;
			#endif
			shadow = step( dp, depth );
		}
		return mix( 1.0, shadow, shadowIntensity );
	}
	#endif
	#endif
#endif`,shadowmap_pars_vertex:`#if NUM_SPOT_LIGHT_COORDS > 0
	uniform mat4 spotLightMatrix[ NUM_SPOT_LIGHT_COORDS ];
	varying vec4 vSpotLightCoord[ NUM_SPOT_LIGHT_COORDS ];
#endif
#ifdef USE_SHADOWMAP
	#if NUM_SUN_LIGHT_SHADOWS > 0
		varying vec4 vSunShadowWorldPosition;
		varying vec3 vSunShadowWorldNormal;
	#endif
	#if NUM_DIR_LIGHT_SHADOWS > 0
		uniform mat4 directionalShadowMatrix[ NUM_DIR_LIGHT_SHADOWS ];
		varying vec4 vDirectionalShadowCoord[ NUM_DIR_LIGHT_SHADOWS ];
		struct DirectionalLightShadow {
			float shadowIntensity;
			float shadowBias;
			float shadowNormalBias;
			float shadowRadius;
			vec2 shadowMapSize;
		};
		uniform DirectionalLightShadow directionalLightShadows[ NUM_DIR_LIGHT_SHADOWS ];
	#endif
	#if NUM_SPOT_LIGHT_SHADOWS > 0
		struct SpotLightShadow {
			float shadowIntensity;
			float shadowBias;
			float shadowNormalBias;
			float shadowRadius;
			vec2 shadowMapSize;
		};
		uniform SpotLightShadow spotLightShadows[ NUM_SPOT_LIGHT_SHADOWS ];
	#endif
	#if NUM_POINT_LIGHT_SHADOWS > 0
		uniform mat4 pointShadowMatrix[ NUM_POINT_LIGHT_SHADOWS ];
		varying vec4 vPointShadowCoord[ NUM_POINT_LIGHT_SHADOWS ];
		struct PointLightShadow {
			float shadowIntensity;
			float shadowBias;
			float shadowNormalBias;
			float shadowRadius;
			vec2 shadowMapSize;
			float shadowCameraNear;
			float shadowCameraFar;
		};
		uniform PointLightShadow pointLightShadows[ NUM_POINT_LIGHT_SHADOWS ];
	#endif
#endif`,shadowmap_vertex:`#if ( defined( USE_SHADOWMAP ) && ( NUM_DIR_LIGHT_SHADOWS > 0 || NUM_SUN_LIGHT_SHADOWS > 0 || NUM_POINT_LIGHT_SHADOWS > 0 ) ) || ( NUM_SPOT_LIGHT_COORDS > 0 )
	#ifdef HAS_NORMAL
		vec3 shadowWorldNormal = transformNormalByInverseViewMatrix( transformedNormal, viewMatrix );
	#else
		vec3 shadowWorldNormal = vec3( 0.0 );
	#endif
	vec4 shadowWorldPosition;
#endif
#if defined( USE_SHADOWMAP )
	#if NUM_SUN_LIGHT_SHADOWS > 0
		vSunShadowWorldPosition = vec4( worldPosition.xyz, - mvPosition.z );
		vSunShadowWorldNormal = shadowWorldNormal;
	#endif
	#if NUM_DIR_LIGHT_SHADOWS > 0
		#pragma unroll_loop_start
		for ( int i = 0; i < NUM_DIR_LIGHT_SHADOWS; i ++ ) {
			shadowWorldPosition = worldPosition + vec4( shadowWorldNormal * directionalLightShadows[ i ].shadowNormalBias, 0 );
			vDirectionalShadowCoord[ i ] = directionalShadowMatrix[ i ] * shadowWorldPosition;
		}
		#pragma unroll_loop_end
	#endif
	#if NUM_POINT_LIGHT_SHADOWS > 0
		#pragma unroll_loop_start
		for ( int i = 0; i < NUM_POINT_LIGHT_SHADOWS; i ++ ) {
			shadowWorldPosition = worldPosition + vec4( shadowWorldNormal * pointLightShadows[ i ].shadowNormalBias, 0 );
			vPointShadowCoord[ i ] = pointShadowMatrix[ i ] * shadowWorldPosition;
		}
		#pragma unroll_loop_end
	#endif
#endif
#if NUM_SPOT_LIGHT_COORDS > 0
	#pragma unroll_loop_start
	for ( int i = 0; i < NUM_SPOT_LIGHT_COORDS; i ++ ) {
		shadowWorldPosition = worldPosition;
		#if ( defined( USE_SHADOWMAP ) && UNROLLED_LOOP_INDEX < NUM_SPOT_LIGHT_SHADOWS )
			shadowWorldPosition.xyz += shadowWorldNormal * spotLightShadows[ i ].shadowNormalBias;
		#endif
		vSpotLightCoord[ i ] = spotLightMatrix[ i ] * shadowWorldPosition;
	}
	#pragma unroll_loop_end
#endif`,shadowmask_pars_fragment:`float getShadowMask() {
	float shadow = 1.0;
	#ifdef USE_SHADOWMAP
	#if NUM_SUN_LIGHT_SHADOWS > 0
	SunLightShadow sunLight;
	#pragma unroll_loop_start
	for ( int i = 0; i < NUM_SUN_LIGHT_SHADOWS; i ++ ) {
		sunLight = sunLightShadows[ i ];
		shadow *= receiveShadow ? getSunShadow( sunShadowMap[ i ], sunLight, UNROLLED_LOOP_INDEX ) : 1.0;
	}
	#pragma unroll_loop_end
	#endif
	#if NUM_DIR_LIGHT_SHADOWS > 0
	DirectionalLightShadow directionalLight;
	#pragma unroll_loop_start
	for ( int i = 0; i < NUM_DIR_LIGHT_SHADOWS; i ++ ) {
		directionalLight = directionalLightShadows[ i ];
		shadow *= receiveShadow ? getShadow( directionalShadowMap[ i ], directionalLight.shadowMapSize, directionalLight.shadowIntensity, directionalLight.shadowBias, directionalLight.shadowRadius, vDirectionalShadowCoord[ i ] ) : 1.0;
	}
	#pragma unroll_loop_end
	#endif
	#if NUM_SPOT_LIGHT_SHADOWS > 0
	SpotLightShadow spotLight;
	#pragma unroll_loop_start
	for ( int i = 0; i < NUM_SPOT_LIGHT_SHADOWS; i ++ ) {
		spotLight = spotLightShadows[ i ];
		shadow *= receiveShadow ? getShadow( spotShadowMap[ i ], spotLight.shadowMapSize, spotLight.shadowIntensity, spotLight.shadowBias, spotLight.shadowRadius, vSpotLightCoord[ i ] ) : 1.0;
	}
	#pragma unroll_loop_end
	#endif
	#if NUM_POINT_LIGHT_SHADOWS > 0 && ( defined( SHADOWMAP_TYPE_PCF ) || defined( SHADOWMAP_TYPE_BASIC ) )
	PointLightShadow pointLight;
	#pragma unroll_loop_start
	for ( int i = 0; i < NUM_POINT_LIGHT_SHADOWS; i ++ ) {
		pointLight = pointLightShadows[ i ];
		shadow *= receiveShadow ? getPointShadow( pointShadowMap[ i ], pointLight.shadowMapSize, pointLight.shadowIntensity, pointLight.shadowBias, pointLight.shadowRadius, vPointShadowCoord[ i ], pointLight.shadowCameraNear, pointLight.shadowCameraFar ) : 1.0;
	}
	#pragma unroll_loop_end
	#endif
	#endif
	return shadow;
}`,skinbase_vertex:`#ifdef USE_SKINNING
	mat4 boneMatX = getBoneMatrix( skinIndex.x );
	mat4 boneMatY = getBoneMatrix( skinIndex.y );
	mat4 boneMatZ = getBoneMatrix( skinIndex.z );
	mat4 boneMatW = getBoneMatrix( skinIndex.w );
#endif`,skinning_pars_vertex:`#ifdef USE_SKINNING
	uniform mat4 bindMatrix;
	uniform mat4 bindMatrixInverse;
	uniform highp sampler2D boneTexture;
	mat4 getBoneMatrix( const in float i ) {
		int size = textureSize( boneTexture, 0 ).x;
		int j = int( i ) * 4;
		int x = j % size;
		int y = j / size;
		vec4 v1 = texelFetch( boneTexture, ivec2( x, y ), 0 );
		vec4 v2 = texelFetch( boneTexture, ivec2( x + 1, y ), 0 );
		vec4 v3 = texelFetch( boneTexture, ivec2( x + 2, y ), 0 );
		vec4 v4 = texelFetch( boneTexture, ivec2( x + 3, y ), 0 );
		return mat4( v1, v2, v3, v4 );
	}
#endif`,skinning_vertex:`#ifdef USE_SKINNING
	vec4 skinVertex = bindMatrix * vec4( transformed, 1.0 );
	vec4 skinned = vec4( 0.0 );
	skinned += boneMatX * skinVertex * skinWeight.x;
	skinned += boneMatY * skinVertex * skinWeight.y;
	skinned += boneMatZ * skinVertex * skinWeight.z;
	skinned += boneMatW * skinVertex * skinWeight.w;
	transformed = ( bindMatrixInverse * skinned ).xyz;
#endif`,skinnormal_vertex:`#ifdef USE_SKINNING
	mat4 skinMatrix = mat4( 0.0 );
	skinMatrix += skinWeight.x * boneMatX;
	skinMatrix += skinWeight.y * boneMatY;
	skinMatrix += skinWeight.z * boneMatZ;
	skinMatrix += skinWeight.w * boneMatW;
	skinMatrix = bindMatrixInverse * skinMatrix * bindMatrix;
	objectNormal = vec4( skinMatrix * vec4( objectNormal, 0.0 ) ).xyz;
	#ifdef USE_TANGENT
		objectTangent = vec4( skinMatrix * vec4( objectTangent, 0.0 ) ).xyz;
	#endif
#endif`,specularmap_fragment:`float specularStrength;
#ifdef USE_SPECULARMAP
	vec4 texelSpecular = texture2D( specularMap, vSpecularMapUv );
	specularStrength = texelSpecular.r;
#else
	specularStrength = 1.0;
#endif`,specularmap_pars_fragment:`#ifdef USE_SPECULARMAP
	uniform sampler2D specularMap;
#endif`,tonemapping_fragment:`#if defined( TONE_MAPPING )
	gl_FragColor.rgb = toneMapping( gl_FragColor.rgb );
#endif`,tonemapping_pars_fragment:`#ifndef saturate
#define saturate( a ) clamp( a, 0.0, 1.0 )
#endif
uniform float toneMappingExposure;
vec3 LinearToneMapping( vec3 color ) {
	return saturate( toneMappingExposure * color );
}
vec3 ReinhardToneMapping( vec3 color ) {
	color *= toneMappingExposure;
	return saturate( color / ( vec3( 1.0 ) + color ) );
}
vec3 CineonToneMapping( vec3 color ) {
	color *= toneMappingExposure;
	color = max( vec3( 0.0 ), color - 0.004 );
	return pow( ( color * ( 6.2 * color + 0.5 ) ) / ( color * ( 6.2 * color + 1.7 ) + 0.06 ), vec3( 2.2 ) );
}
vec3 RRTAndODTFit( vec3 v ) {
	vec3 a = v * ( v + 0.0245786 ) - 0.000090537;
	vec3 b = v * ( 0.983729 * v + 0.4329510 ) + 0.238081;
	return a / b;
}
vec3 ACESFilmicToneMapping( vec3 color ) {
	const mat3 ACESInputMat = mat3(
		vec3( 0.59719, 0.07600, 0.02840 ),		vec3( 0.35458, 0.90834, 0.13383 ),
		vec3( 0.04823, 0.01566, 0.83777 )
	);
	const mat3 ACESOutputMat = mat3(
		vec3(  1.60475, -0.10208, -0.00327 ),		vec3( -0.53108,  1.10813, -0.07276 ),
		vec3( -0.07367, -0.00605,  1.07602 )
	);
	color *= toneMappingExposure / 0.6;
	color = ACESInputMat * color;
	color = RRTAndODTFit( color );
	color = ACESOutputMat * color;
	return saturate( color );
}
const mat3 LINEAR_REC2020_TO_LINEAR_SRGB = mat3(
	vec3( 1.6605, - 0.1246, - 0.0182 ),
	vec3( - 0.5876, 1.1329, - 0.1006 ),
	vec3( - 0.0728, - 0.0083, 1.1187 )
);
const mat3 LINEAR_SRGB_TO_LINEAR_REC2020 = mat3(
	vec3( 0.6274, 0.0691, 0.0164 ),
	vec3( 0.3293, 0.9195, 0.0880 ),
	vec3( 0.0433, 0.0113, 0.8956 )
);
vec3 agxDefaultContrastApprox( vec3 x ) {
	vec3 x2 = x * x;
	vec3 x4 = x2 * x2;
	return + 15.5 * x4 * x2
		- 40.14 * x4 * x
		+ 31.96 * x4
		- 6.868 * x2 * x
		+ 0.4298 * x2
		+ 0.1191 * x
		- 0.00232;
}
vec3 AgXToneMapping( vec3 color ) {
	const mat3 AgXInsetMatrix = mat3(
		vec3( 0.856627153315983, 0.137318972929847, 0.11189821299995 ),
		vec3( 0.0951212405381588, 0.761241990602591, 0.0767994186031903 ),
		vec3( 0.0482516061458583, 0.101439036467562, 0.811302368396859 )
	);
	const mat3 AgXOutsetMatrix = mat3(
		vec3( 1.1271005818144368, - 0.1413297634984383, - 0.14132976349843826 ),
		vec3( - 0.11060664309660323, 1.157823702216272, - 0.11060664309660294 ),
		vec3( - 0.016493938717834573, - 0.016493938717834257, 1.2519364065950405 )
	);
	const float AgxMinEv = - 12.47393;	const float AgxMaxEv = 4.026069;
	color *= toneMappingExposure;
	color = LINEAR_SRGB_TO_LINEAR_REC2020 * color;
	color = AgXInsetMatrix * color;
	color = max( color, 1e-10 );	color = log2( color );
	color = ( color - AgxMinEv ) / ( AgxMaxEv - AgxMinEv );
	color = clamp( color, 0.0, 1.0 );
	color = agxDefaultContrastApprox( color );
	color = AgXOutsetMatrix * color;
	color = pow( max( vec3( 0.0 ), color ), vec3( 2.2 ) );
	color = LINEAR_REC2020_TO_LINEAR_SRGB * color;
	color = clamp( color, 0.0, 1.0 );
	return color;
}
vec3 NeutralToneMapping( vec3 color ) {
	const float StartCompression = 0.8 - 0.04;
	const float Desaturation = 0.15;
	color *= toneMappingExposure;
	float x = min( color.r, min( color.g, color.b ) );
	float offset = x < 0.08 ? x - 6.25 * x * x : 0.04;
	color -= offset;
	float peak = max( color.r, max( color.g, color.b ) );
	if ( peak < StartCompression ) return color;
	float d = 1. - StartCompression;
	float newPeak = 1. - d * d / ( peak + d - StartCompression );
	color *= newPeak / peak;
	float g = 1. - 1. / ( Desaturation * ( peak - newPeak ) + 1. );
	return mix( color, vec3( newPeak ), g );
}
vec3 CustomToneMapping( vec3 color ) { return color; }`,transmission_fragment:`#ifdef USE_TRANSMISSION
	material.transmission = transmission;
	material.transmissionAlpha = 1.0;
	material.thickness = thickness;
	material.attenuationDistance = attenuationDistance;
	material.attenuationColor = attenuationColor;
	#ifdef USE_TRANSMISSIONMAP
		material.transmission *= texture2D( transmissionMap, vTransmissionMapUv ).r;
	#endif
	#ifdef USE_THICKNESSMAP
		material.thickness *= texture2D( thicknessMap, vThicknessMapUv ).g;
	#endif
	vec3 pos = vWorldPosition;
	vec3 v = normalize( cameraPosition - pos );
	vec3 n = transformNormalByInverseViewMatrix( normal, viewMatrix );
	vec4 transmitted = getIBLVolumeRefraction(
		n, v, material.roughness, material.diffuseContribution, material.specularColorBlended, material.specularF90,
		pos, modelMatrix, viewMatrix, projectionMatrix, material.dispersion, material.ior, material.thickness,
		material.attenuationColor, material.attenuationDistance );
	material.transmissionAlpha = mix( material.transmissionAlpha, transmitted.a, material.transmission );
	totalDiffuse = mix( totalDiffuse, transmitted.rgb, material.transmission );
#endif`,transmission_pars_fragment:`#ifdef USE_TRANSMISSION
	uniform float transmission;
	uniform float thickness;
	uniform float attenuationDistance;
	uniform vec3 attenuationColor;
	#ifdef USE_TRANSMISSIONMAP
		uniform sampler2D transmissionMap;
	#endif
	#ifdef USE_THICKNESSMAP
		uniform sampler2D thicknessMap;
	#endif
	uniform vec2 transmissionSamplerSize;
	uniform sampler2D transmissionSamplerMap;
	uniform mat4 modelMatrix;
	uniform mat4 projectionMatrix;
	varying vec3 vWorldPosition;
	float w0( float a ) {
		return ( 1.0 / 6.0 ) * ( a * ( a * ( - a + 3.0 ) - 3.0 ) + 1.0 );
	}
	float w1( float a ) {
		return ( 1.0 / 6.0 ) * ( a *  a * ( 3.0 * a - 6.0 ) + 4.0 );
	}
	float w2( float a ){
		return ( 1.0 / 6.0 ) * ( a * ( a * ( - 3.0 * a + 3.0 ) + 3.0 ) + 1.0 );
	}
	float w3( float a ) {
		return ( 1.0 / 6.0 ) * ( a * a * a );
	}
	float g0( float a ) {
		return w0( a ) + w1( a );
	}
	float g1( float a ) {
		return w2( a ) + w3( a );
	}
	float h0( float a ) {
		return - 1.0 + w1( a ) / ( w0( a ) + w1( a ) );
	}
	float h1( float a ) {
		return 1.0 + w3( a ) / ( w2( a ) + w3( a ) );
	}
	vec4 bicubic( sampler2D tex, vec2 uv, vec4 texelSize, float lod ) {
		uv = uv * texelSize.zw + 0.5;
		vec2 iuv = floor( uv );
		vec2 fuv = fract( uv );
		float g0x = g0( fuv.x );
		float g1x = g1( fuv.x );
		float h0x = h0( fuv.x );
		float h1x = h1( fuv.x );
		float h0y = h0( fuv.y );
		float h1y = h1( fuv.y );
		vec2 p0 = ( vec2( iuv.x + h0x, iuv.y + h0y ) - 0.5 ) * texelSize.xy;
		vec2 p1 = ( vec2( iuv.x + h1x, iuv.y + h0y ) - 0.5 ) * texelSize.xy;
		vec2 p2 = ( vec2( iuv.x + h0x, iuv.y + h1y ) - 0.5 ) * texelSize.xy;
		vec2 p3 = ( vec2( iuv.x + h1x, iuv.y + h1y ) - 0.5 ) * texelSize.xy;
		return g0( fuv.y ) * ( g0x * textureLod( tex, p0, lod ) + g1x * textureLod( tex, p1, lod ) ) +
			g1( fuv.y ) * ( g0x * textureLod( tex, p2, lod ) + g1x * textureLod( tex, p3, lod ) );
	}
	vec4 textureBicubic( sampler2D sampler, vec2 uv, float lod ) {
		vec2 fLodSize = vec2( textureSize( sampler, int( lod ) ) );
		vec2 cLodSize = vec2( textureSize( sampler, int( lod + 1.0 ) ) );
		vec2 fLodSizeInv = 1.0 / fLodSize;
		vec2 cLodSizeInv = 1.0 / cLodSize;
		vec4 fSample = bicubic( sampler, uv, vec4( fLodSizeInv, fLodSize ), floor( lod ) );
		vec4 cSample = bicubic( sampler, uv, vec4( cLodSizeInv, cLodSize ), ceil( lod ) );
		return mix( fSample, cSample, fract( lod ) );
	}
	vec3 getVolumeTransmissionRay( const in vec3 n, const in vec3 v, const in float thickness, const in float ior, const in mat4 modelMatrix ) {
		vec3 refractionVector = refract( - v, normalize( n ), 1.0 / ior );
		vec3 modelScale;
		modelScale.x = length( vec3( modelMatrix[ 0 ].xyz ) );
		modelScale.y = length( vec3( modelMatrix[ 1 ].xyz ) );
		modelScale.z = length( vec3( modelMatrix[ 2 ].xyz ) );
		return normalize( refractionVector ) * thickness * modelScale;
	}
	float applyIorToRoughness( const in float roughness, const in float ior ) {
		return roughness * clamp( ior * 2.0 - 2.0, 0.0, 1.0 );
	}
	vec4 getTransmissionSample( const in vec2 fragCoord, const in float roughness, const in float ior ) {
		float lod = log2( transmissionSamplerSize.x ) * applyIorToRoughness( roughness, ior );
		return textureBicubic( transmissionSamplerMap, fragCoord.xy, lod );
	}
	vec3 volumeAttenuation( const in float transmissionDistance, const in vec3 attenuationColor, const in float attenuationDistance ) {
		if ( isinf( attenuationDistance ) ) {
			return vec3( 1.0 );
		} else {
			vec3 attenuationCoefficient = -log( attenuationColor ) / attenuationDistance;
			vec3 transmittance = exp( - attenuationCoefficient * transmissionDistance );			return transmittance;
		}
	}
	vec4 getIBLVolumeRefraction( const in vec3 n, const in vec3 v, const in float roughness, const in vec3 diffuseColor,
		const in vec3 specularColor, const in float specularF90, const in vec3 position, const in mat4 modelMatrix,
		const in mat4 viewMatrix, const in mat4 projMatrix, const in float dispersion, const in float ior, const in float thickness,
		const in vec3 attenuationColor, const in float attenuationDistance ) {
		vec4 transmittedLight;
		vec3 transmittance;
		#ifdef USE_DISPERSION
			float halfSpread = ( ior - 1.0 ) * 0.025 * dispersion;
			vec3 iors = vec3( ior - halfSpread, ior, ior + halfSpread );
			for ( int i = 0; i < 3; i ++ ) {
				vec3 transmissionRay = getVolumeTransmissionRay( n, v, thickness, iors[ i ], modelMatrix );
				vec3 refractedRayExit = position + transmissionRay;
				vec4 ndcPos = projMatrix * viewMatrix * vec4( refractedRayExit, 1.0 );
				vec2 refractionCoords = ndcPos.xy / ndcPos.w;
				refractionCoords += 1.0;
				refractionCoords /= 2.0;
				vec4 transmissionSample = getTransmissionSample( refractionCoords, roughness, iors[ i ] );
				transmittedLight[ i ] = transmissionSample[ i ];
				transmittedLight.a += transmissionSample.a;
				transmittance[ i ] = diffuseColor[ i ] * volumeAttenuation( length( transmissionRay ), attenuationColor, attenuationDistance )[ i ];
			}
			transmittedLight.a /= 3.0;
		#else
			vec3 transmissionRay = getVolumeTransmissionRay( n, v, thickness, ior, modelMatrix );
			vec3 refractedRayExit = position + transmissionRay;
			vec4 ndcPos = projMatrix * viewMatrix * vec4( refractedRayExit, 1.0 );
			vec2 refractionCoords = ndcPos.xy / ndcPos.w;
			refractionCoords += 1.0;
			refractionCoords /= 2.0;
			transmittedLight = getTransmissionSample( refractionCoords, roughness, ior );
			transmittance = diffuseColor * volumeAttenuation( length( transmissionRay ), attenuationColor, attenuationDistance );
		#endif
		vec3 attenuatedColor = transmittance * transmittedLight.rgb;
		vec3 F = EnvironmentBRDF( n, v, specularColor, specularF90, roughness );
		float transmittanceFactor = ( transmittance.r + transmittance.g + transmittance.b ) / 3.0;
		return vec4( ( 1.0 - F ) * attenuatedColor, 1.0 - ( 1.0 - transmittedLight.a ) * transmittanceFactor );
	}
#endif`,uv_pars_fragment:`#if defined( USE_UV ) || defined( USE_ANISOTROPY )
	varying vec2 vUv;
#endif
#ifdef USE_MAP
	varying vec2 vMapUv;
#endif
#ifdef USE_ALPHAMAP
	varying vec2 vAlphaMapUv;
#endif
#ifdef USE_LIGHTMAP
	varying vec2 vLightMapUv;
#endif
#ifdef USE_AOMAP
	varying vec2 vAoMapUv;
#endif
#ifdef USE_BUMPMAP
	varying vec2 vBumpMapUv;
#endif
#ifdef USE_NORMALMAP
	varying vec2 vNormalMapUv;
#endif
#ifdef USE_EMISSIVEMAP
	varying vec2 vEmissiveMapUv;
#endif
#ifdef USE_METALNESSMAP
	varying vec2 vMetalnessMapUv;
#endif
#ifdef USE_ROUGHNESSMAP
	varying vec2 vRoughnessMapUv;
#endif
#ifdef USE_ANISOTROPYMAP
	varying vec2 vAnisotropyMapUv;
#endif
#ifdef USE_CLEARCOATMAP
	varying vec2 vClearcoatMapUv;
#endif
#ifdef USE_CLEARCOAT_NORMALMAP
	varying vec2 vClearcoatNormalMapUv;
#endif
#ifdef USE_CLEARCOAT_ROUGHNESSMAP
	varying vec2 vClearcoatRoughnessMapUv;
#endif
#ifdef USE_IRIDESCENCEMAP
	varying vec2 vIridescenceMapUv;
#endif
#ifdef USE_IRIDESCENCE_THICKNESSMAP
	varying vec2 vIridescenceThicknessMapUv;
#endif
#ifdef USE_SHEEN_COLORMAP
	varying vec2 vSheenColorMapUv;
#endif
#ifdef USE_SHEEN_ROUGHNESSMAP
	varying vec2 vSheenRoughnessMapUv;
#endif
#ifdef USE_SPECULARMAP
	varying vec2 vSpecularMapUv;
#endif
#ifdef USE_SPECULAR_COLORMAP
	varying vec2 vSpecularColorMapUv;
#endif
#ifdef USE_SPECULAR_INTENSITYMAP
	varying vec2 vSpecularIntensityMapUv;
#endif
#ifdef USE_TRANSMISSIONMAP
	uniform mat3 transmissionMapTransform;
	varying vec2 vTransmissionMapUv;
#endif
#ifdef USE_THICKNESSMAP
	uniform mat3 thicknessMapTransform;
	varying vec2 vThicknessMapUv;
#endif`,uv_pars_vertex:`#if defined( USE_UV ) || defined( USE_ANISOTROPY )
	varying vec2 vUv;
#endif
#ifdef USE_MAP
	uniform mat3 mapTransform;
	varying vec2 vMapUv;
#endif
#ifdef USE_ALPHAMAP
	uniform mat3 alphaMapTransform;
	varying vec2 vAlphaMapUv;
#endif
#ifdef USE_LIGHTMAP
	uniform mat3 lightMapTransform;
	varying vec2 vLightMapUv;
#endif
#ifdef USE_AOMAP
	uniform mat3 aoMapTransform;
	varying vec2 vAoMapUv;
#endif
#ifdef USE_BUMPMAP
	uniform mat3 bumpMapTransform;
	varying vec2 vBumpMapUv;
#endif
#ifdef USE_NORMALMAP
	uniform mat3 normalMapTransform;
	varying vec2 vNormalMapUv;
#endif
#ifdef USE_DISPLACEMENTMAP
	uniform mat3 displacementMapTransform;
	varying vec2 vDisplacementMapUv;
#endif
#ifdef USE_EMISSIVEMAP
	uniform mat3 emissiveMapTransform;
	varying vec2 vEmissiveMapUv;
#endif
#ifdef USE_METALNESSMAP
	uniform mat3 metalnessMapTransform;
	varying vec2 vMetalnessMapUv;
#endif
#ifdef USE_ROUGHNESSMAP
	uniform mat3 roughnessMapTransform;
	varying vec2 vRoughnessMapUv;
#endif
#ifdef USE_ANISOTROPYMAP
	uniform mat3 anisotropyMapTransform;
	varying vec2 vAnisotropyMapUv;
#endif
#ifdef USE_CLEARCOATMAP
	uniform mat3 clearcoatMapTransform;
	varying vec2 vClearcoatMapUv;
#endif
#ifdef USE_CLEARCOAT_NORMALMAP
	uniform mat3 clearcoatNormalMapTransform;
	varying vec2 vClearcoatNormalMapUv;
#endif
#ifdef USE_CLEARCOAT_ROUGHNESSMAP
	uniform mat3 clearcoatRoughnessMapTransform;
	varying vec2 vClearcoatRoughnessMapUv;
#endif
#ifdef USE_SHEEN_COLORMAP
	uniform mat3 sheenColorMapTransform;
	varying vec2 vSheenColorMapUv;
#endif
#ifdef USE_SHEEN_ROUGHNESSMAP
	uniform mat3 sheenRoughnessMapTransform;
	varying vec2 vSheenRoughnessMapUv;
#endif
#ifdef USE_IRIDESCENCEMAP
	uniform mat3 iridescenceMapTransform;
	varying vec2 vIridescenceMapUv;
#endif
#ifdef USE_IRIDESCENCE_THICKNESSMAP
	uniform mat3 iridescenceThicknessMapTransform;
	varying vec2 vIridescenceThicknessMapUv;
#endif
#ifdef USE_SPECULARMAP
	uniform mat3 specularMapTransform;
	varying vec2 vSpecularMapUv;
#endif
#ifdef USE_SPECULAR_COLORMAP
	uniform mat3 specularColorMapTransform;
	varying vec2 vSpecularColorMapUv;
#endif
#ifdef USE_SPECULAR_INTENSITYMAP
	uniform mat3 specularIntensityMapTransform;
	varying vec2 vSpecularIntensityMapUv;
#endif
#ifdef USE_TRANSMISSIONMAP
	uniform mat3 transmissionMapTransform;
	varying vec2 vTransmissionMapUv;
#endif
#ifdef USE_THICKNESSMAP
	uniform mat3 thicknessMapTransform;
	varying vec2 vThicknessMapUv;
#endif`,uv_vertex:`#if defined( USE_UV ) || defined( USE_ANISOTROPY )
	vUv = vec3( uv, 1 ).xy;
#endif
#ifdef USE_MAP
	vMapUv = ( mapTransform * vec3( MAP_UV, 1 ) ).xy;
#endif
#ifdef USE_ALPHAMAP
	vAlphaMapUv = ( alphaMapTransform * vec3( ALPHAMAP_UV, 1 ) ).xy;
#endif
#ifdef USE_LIGHTMAP
	vLightMapUv = ( lightMapTransform * vec3( LIGHTMAP_UV, 1 ) ).xy;
#endif
#ifdef USE_AOMAP
	vAoMapUv = ( aoMapTransform * vec3( AOMAP_UV, 1 ) ).xy;
#endif
#ifdef USE_BUMPMAP
	vBumpMapUv = ( bumpMapTransform * vec3( BUMPMAP_UV, 1 ) ).xy;
#endif
#ifdef USE_NORMALMAP
	vNormalMapUv = ( normalMapTransform * vec3( NORMALMAP_UV, 1 ) ).xy;
#endif
#ifdef USE_DISPLACEMENTMAP
	vDisplacementMapUv = ( displacementMapTransform * vec3( DISPLACEMENTMAP_UV, 1 ) ).xy;
#endif
#ifdef USE_EMISSIVEMAP
	vEmissiveMapUv = ( emissiveMapTransform * vec3( EMISSIVEMAP_UV, 1 ) ).xy;
#endif
#ifdef USE_METALNESSMAP
	vMetalnessMapUv = ( metalnessMapTransform * vec3( METALNESSMAP_UV, 1 ) ).xy;
#endif
#ifdef USE_ROUGHNESSMAP
	vRoughnessMapUv = ( roughnessMapTransform * vec3( ROUGHNESSMAP_UV, 1 ) ).xy;
#endif
#ifdef USE_ANISOTROPYMAP
	vAnisotropyMapUv = ( anisotropyMapTransform * vec3( ANISOTROPYMAP_UV, 1 ) ).xy;
#endif
#ifdef USE_CLEARCOATMAP
	vClearcoatMapUv = ( clearcoatMapTransform * vec3( CLEARCOATMAP_UV, 1 ) ).xy;
#endif
#ifdef USE_CLEARCOAT_NORMALMAP
	vClearcoatNormalMapUv = ( clearcoatNormalMapTransform * vec3( CLEARCOAT_NORMALMAP_UV, 1 ) ).xy;
#endif
#ifdef USE_CLEARCOAT_ROUGHNESSMAP
	vClearcoatRoughnessMapUv = ( clearcoatRoughnessMapTransform * vec3( CLEARCOAT_ROUGHNESSMAP_UV, 1 ) ).xy;
#endif
#ifdef USE_IRIDESCENCEMAP
	vIridescenceMapUv = ( iridescenceMapTransform * vec3( IRIDESCENCEMAP_UV, 1 ) ).xy;
#endif
#ifdef USE_IRIDESCENCE_THICKNESSMAP
	vIridescenceThicknessMapUv = ( iridescenceThicknessMapTransform * vec3( IRIDESCENCE_THICKNESSMAP_UV, 1 ) ).xy;
#endif
#ifdef USE_SHEEN_COLORMAP
	vSheenColorMapUv = ( sheenColorMapTransform * vec3( SHEEN_COLORMAP_UV, 1 ) ).xy;
#endif
#ifdef USE_SHEEN_ROUGHNESSMAP
	vSheenRoughnessMapUv = ( sheenRoughnessMapTransform * vec3( SHEEN_ROUGHNESSMAP_UV, 1 ) ).xy;
#endif
#ifdef USE_SPECULARMAP
	vSpecularMapUv = ( specularMapTransform * vec3( SPECULARMAP_UV, 1 ) ).xy;
#endif
#ifdef USE_SPECULAR_COLORMAP
	vSpecularColorMapUv = ( specularColorMapTransform * vec3( SPECULAR_COLORMAP_UV, 1 ) ).xy;
#endif
#ifdef USE_SPECULAR_INTENSITYMAP
	vSpecularIntensityMapUv = ( specularIntensityMapTransform * vec3( SPECULAR_INTENSITYMAP_UV, 1 ) ).xy;
#endif
#ifdef USE_TRANSMISSIONMAP
	vTransmissionMapUv = ( transmissionMapTransform * vec3( TRANSMISSIONMAP_UV, 1 ) ).xy;
#endif
#ifdef USE_THICKNESSMAP
	vThicknessMapUv = ( thicknessMapTransform * vec3( THICKNESSMAP_UV, 1 ) ).xy;
#endif`,worldpos_vertex:`#if defined( USE_ENVMAP ) || defined( DISTANCE ) || defined ( USE_SHADOWMAP ) || defined ( USE_TRANSMISSION ) || NUM_SPOT_LIGHT_COORDS > 0
	vec4 worldPosition = vec4( transformed, 1.0 );
	#ifdef USE_BATCHING
		worldPosition = batchingMatrix * worldPosition;
	#endif
	#ifdef USE_INSTANCING
		worldPosition = instanceMatrix * worldPosition;
	#endif
	worldPosition = modelMatrix * worldPosition;
#endif`,background_vert:`varying vec2 vUv;
uniform mat3 uvTransform;
void main() {
	vUv = ( uvTransform * vec3( uv, 1 ) ).xy;
	gl_Position = vec4( position.xy, 1.0, 1.0 );
}`,background_frag:`uniform sampler2D t2D;
uniform float backgroundIntensity;
varying vec2 vUv;
void main() {
	vec4 texColor = texture2D( t2D, vUv );
	#ifdef DECODE_VIDEO_TEXTURE
		texColor = vec4( mix( pow( texColor.rgb * 0.9478672986 + vec3( 0.0521327014 ), vec3( 2.4 ) ), texColor.rgb * 0.0773993808, vec3( lessThanEqual( texColor.rgb, vec3( 0.04045 ) ) ) ), texColor.w );
	#endif
	texColor.rgb *= backgroundIntensity;
	gl_FragColor = texColor;
	#include <tonemapping_fragment>
	#include <colorspace_fragment>
}`,backgroundCube_vert:`varying vec3 vWorldDirection;
#include <common>
void main() {
	vWorldDirection = transformDirection( position, modelMatrix );
	#include <begin_vertex>
	#include <project_vertex>
	gl_Position.z = gl_Position.w;
}`,backgroundCube_frag:`#ifdef ENVMAP_TYPE_CUBE
	uniform samplerCube envMap;
#elif defined( ENVMAP_TYPE_CUBE_UV )
	uniform sampler2D envMap;
#endif
uniform float backgroundBlurriness;
uniform float backgroundIntensity;
uniform mat3 backgroundRotation;
varying vec3 vWorldDirection;
#include <cube_uv_reflection_fragment>
void main() {
	#ifdef ENVMAP_TYPE_CUBE
		vec4 texColor = textureCube( envMap, backgroundRotation * vWorldDirection );
	#elif defined( ENVMAP_TYPE_CUBE_UV )
		vec4 texColor = textureCubeUV( envMap, backgroundRotation * vWorldDirection, backgroundBlurriness );
	#else
		vec4 texColor = vec4( 0.0, 0.0, 0.0, 1.0 );
	#endif
	texColor.rgb *= backgroundIntensity;
	gl_FragColor = texColor;
	#include <tonemapping_fragment>
	#include <colorspace_fragment>
}`,cube_vert:`varying vec3 vWorldDirection;
#include <common>
void main() {
	vWorldDirection = transformDirection( position, modelMatrix );
	#include <begin_vertex>
	#include <project_vertex>
	gl_Position.z = gl_Position.w;
}`,cube_frag:`uniform samplerCube tCube;
uniform float tFlip;
uniform float opacity;
varying vec3 vWorldDirection;
void main() {
	vec4 texColor = textureCube( tCube, vec3( tFlip * vWorldDirection.x, vWorldDirection.yz ) );
	gl_FragColor = texColor;
	gl_FragColor.a *= opacity;
	#include <tonemapping_fragment>
	#include <colorspace_fragment>
}`,depth_vert:`#include <common>
#include <batching_pars_vertex>
#include <uv_pars_vertex>
#include <displacementmap_pars_vertex>
#include <morphtarget_pars_vertex>
#include <skinning_pars_vertex>
#include <logdepthbuf_pars_vertex>
#include <clipping_planes_pars_vertex>
varying vec2 vHighPrecisionZW;
void main() {
	#include <uv_vertex>
	#include <batching_vertex>
	#include <skinbase_vertex>
	#include <morphinstance_vertex>
	#ifdef USE_DISPLACEMENTMAP
		#include <beginnormal_vertex>
		#include <morphnormal_vertex>
		#include <skinnormal_vertex>
	#endif
	#include <begin_vertex>
	#include <morphtarget_vertex>
	#include <skinning_vertex>
	#include <displacementmap_vertex>
	#include <project_vertex>
	#include <logdepthbuf_vertex>
	#include <clipping_planes_vertex>
	vHighPrecisionZW = gl_Position.zw;
}`,depth_frag:`#if DEPTH_PACKING == 3200
	uniform float opacity;
#endif
#include <common>
#include <packing>
#include <uv_pars_fragment>
#include <map_pars_fragment>
#include <alphamap_pars_fragment>
#include <alphatest_pars_fragment>
#include <alphahash_pars_fragment>
#include <logdepthbuf_pars_fragment>
#include <clipping_planes_pars_fragment>
varying vec2 vHighPrecisionZW;
void main() {
	vec4 diffuseColor = vec4( 1.0 );
	#include <clipping_planes_fragment>
	#if DEPTH_PACKING == 3200
		diffuseColor.a = opacity;
	#endif
	#include <map_fragment>
	#include <alphamap_fragment>
	#include <alphatest_fragment>
	#include <alphahash_fragment>
	#include <logdepthbuf_fragment>
	#ifdef USE_REVERSED_DEPTH_BUFFER
		float fragCoordZ = vHighPrecisionZW[ 0 ] / vHighPrecisionZW[ 1 ];
	#else
		float fragCoordZ = 0.5 * vHighPrecisionZW[ 0 ] / vHighPrecisionZW[ 1 ] + 0.5;
	#endif
	#if DEPTH_PACKING == 3200
		gl_FragColor = vec4( vec3( 1.0 - fragCoordZ ), opacity );
	#elif DEPTH_PACKING == 3201
		gl_FragColor = packDepthToRGBA( fragCoordZ );
	#elif DEPTH_PACKING == 3202
		gl_FragColor = vec4( packDepthToRGB( fragCoordZ ), 1.0 );
	#elif DEPTH_PACKING == 3203
		gl_FragColor = vec4( packDepthToRG( fragCoordZ ), 0.0, 1.0 );
	#endif
}`,distance_vert:`#define DISTANCE
varying vec3 vWorldPosition;
#include <common>
#include <batching_pars_vertex>
#include <uv_pars_vertex>
#include <displacementmap_pars_vertex>
#include <morphtarget_pars_vertex>
#include <skinning_pars_vertex>
#include <clipping_planes_pars_vertex>
void main() {
	#include <uv_vertex>
	#include <batching_vertex>
	#include <skinbase_vertex>
	#include <morphinstance_vertex>
	#ifdef USE_DISPLACEMENTMAP
		#include <beginnormal_vertex>
		#include <morphnormal_vertex>
		#include <skinnormal_vertex>
	#endif
	#include <begin_vertex>
	#include <morphtarget_vertex>
	#include <skinning_vertex>
	#include <displacementmap_vertex>
	#include <project_vertex>
	#include <worldpos_vertex>
	#include <clipping_planes_vertex>
	vWorldPosition = worldPosition.xyz;
}`,distance_frag:`#define DISTANCE
uniform vec3 referencePosition;
uniform float nearDistance;
uniform float farDistance;
varying vec3 vWorldPosition;
#include <common>
#include <uv_pars_fragment>
#include <map_pars_fragment>
#include <alphamap_pars_fragment>
#include <alphatest_pars_fragment>
#include <alphahash_pars_fragment>
#include <clipping_planes_pars_fragment>
void main() {
	vec4 diffuseColor = vec4( 1.0 );
	#include <clipping_planes_fragment>
	#include <map_fragment>
	#include <alphamap_fragment>
	#include <alphatest_fragment>
	#include <alphahash_fragment>
	float dist = length( vWorldPosition - referencePosition );
	dist = ( dist - nearDistance ) / ( farDistance - nearDistance );
	dist = saturate( dist );
	gl_FragColor = vec4( dist, 0.0, 0.0, 1.0 );
}`,equirect_vert:`varying vec3 vWorldDirection;
#include <common>
void main() {
	vWorldDirection = transformDirection( position, modelMatrix );
	#include <begin_vertex>
	#include <project_vertex>
}`,equirect_frag:`uniform sampler2D tEquirect;
varying vec3 vWorldDirection;
#include <common>
void main() {
	vec3 direction = normalize( vWorldDirection );
	vec2 sampleUV = equirectUv( direction );
	gl_FragColor = texture2D( tEquirect, sampleUV );
	#include <tonemapping_fragment>
	#include <colorspace_fragment>
}`,linedashed_vert:`uniform float scale;
attribute float lineDistance;
varying float vLineDistance;
#include <common>
#include <uv_pars_vertex>
#include <color_pars_vertex>
#include <fog_pars_vertex>
#include <morphtarget_pars_vertex>
#include <logdepthbuf_pars_vertex>
#include <clipping_planes_pars_vertex>
void main() {
	vLineDistance = scale * lineDistance;
	#include <uv_vertex>
	#include <color_vertex>
	#include <morphinstance_vertex>
	#include <morphcolor_vertex>
	#include <begin_vertex>
	#include <morphtarget_vertex>
	#include <project_vertex>
	#include <logdepthbuf_vertex>
	#include <clipping_planes_vertex>
	#include <fog_vertex>
}`,linedashed_frag:`uniform vec3 diffuse;
uniform float opacity;
uniform float dashSize;
uniform float totalSize;
varying float vLineDistance;
#include <common>
#include <color_pars_fragment>
#include <uv_pars_fragment>
#include <map_pars_fragment>
#include <fog_pars_fragment>
#include <logdepthbuf_pars_fragment>
#include <clipping_planes_pars_fragment>
void main() {
	vec4 diffuseColor = vec4( diffuse, opacity );
	#include <clipping_planes_fragment>
	if ( mod( vLineDistance, totalSize ) > dashSize ) {
		discard;
	}
	vec3 outgoingLight = vec3( 0.0 );
	#include <logdepthbuf_fragment>
	#include <map_fragment>
	#include <color_fragment>
	outgoingLight = diffuseColor.rgb;
	#include <opaque_fragment>
	#include <tonemapping_fragment>
	#include <colorspace_fragment>
	#include <fog_fragment>
	#include <premultiplied_alpha_fragment>
}`,meshbasic_vert:`#include <common>
#include <batching_pars_vertex>
#include <uv_pars_vertex>
#include <envmap_pars_vertex>
#include <color_pars_vertex>
#include <fog_pars_vertex>
#include <morphtarget_pars_vertex>
#include <skinning_pars_vertex>
#include <logdepthbuf_pars_vertex>
#include <clipping_planes_pars_vertex>
void main() {
	#include <uv_vertex>
	#include <color_vertex>
	#include <morphinstance_vertex>
	#include <morphcolor_vertex>
	#include <batching_vertex>
	#if defined ( USE_ENVMAP ) || defined ( USE_SKINNING )
		#include <beginnormal_vertex>
		#include <morphnormal_vertex>
		#include <skinbase_vertex>
		#include <skinnormal_vertex>
		#include <defaultnormal_vertex>
	#endif
	#include <begin_vertex>
	#include <morphtarget_vertex>
	#include <skinning_vertex>
	#include <project_vertex>
	#include <logdepthbuf_vertex>
	#include <clipping_planes_vertex>
	#include <worldpos_vertex>
	#include <envmap_vertex>
	#include <fog_vertex>
}`,meshbasic_frag:`uniform vec3 diffuse;
uniform float opacity;
#ifndef FLAT_SHADED
	varying vec3 vNormal;
#endif
#include <common>
#include <dithering_pars_fragment>
#include <color_pars_fragment>
#include <uv_pars_fragment>
#include <map_pars_fragment>
#include <alphamap_pars_fragment>
#include <alphatest_pars_fragment>
#include <alphahash_pars_fragment>
#include <aomap_pars_fragment>
#include <lightmap_pars_fragment>
#include <envmap_common_pars_fragment>
#include <envmap_pars_fragment>
#include <fog_pars_fragment>
#include <specularmap_pars_fragment>
#include <logdepthbuf_pars_fragment>
#include <clipping_planes_pars_fragment>
void main() {
	vec4 diffuseColor = vec4( diffuse, opacity );
	#include <clipping_planes_fragment>
	#include <logdepthbuf_fragment>
	#include <map_fragment>
	#include <color_fragment>
	#include <alphamap_fragment>
	#include <alphatest_fragment>
	#include <alphahash_fragment>
	#include <specularmap_fragment>
	ReflectedLight reflectedLight = ReflectedLight( vec3( 0.0 ), vec3( 0.0 ), vec3( 0.0 ), vec3( 0.0 ) );
	#ifdef USE_LIGHTMAP
		vec4 lightMapTexel = texture2D( lightMap, vLightMapUv );
		reflectedLight.indirectDiffuse += lightMapTexel.rgb * lightMapIntensity * RECIPROCAL_PI;
	#else
		reflectedLight.indirectDiffuse += vec3( 1.0 );
	#endif
	#include <aomap_fragment>
	reflectedLight.indirectDiffuse *= diffuseColor.rgb;
	vec3 outgoingLight = reflectedLight.indirectDiffuse;
	#include <envmap_fragment>
	#include <opaque_fragment>
	#include <tonemapping_fragment>
	#include <colorspace_fragment>
	#include <fog_fragment>
	#include <premultiplied_alpha_fragment>
	#include <dithering_fragment>
}`,meshlambert_vert:`#define LAMBERT
varying vec3 vViewPosition;
#include <common>
#include <batching_pars_vertex>
#include <uv_pars_vertex>
#include <displacementmap_pars_vertex>
#include <envmap_pars_vertex>
#include <color_pars_vertex>
#include <fog_pars_vertex>
#include <normal_pars_vertex>
#include <morphtarget_pars_vertex>
#include <skinning_pars_vertex>
#include <shadowmap_pars_vertex>
#include <logdepthbuf_pars_vertex>
#include <clipping_planes_pars_vertex>
void main() {
	#include <uv_vertex>
	#include <color_vertex>
	#include <morphinstance_vertex>
	#include <morphcolor_vertex>
	#include <batching_vertex>
	#include <beginnormal_vertex>
	#include <morphnormal_vertex>
	#include <skinbase_vertex>
	#include <skinnormal_vertex>
	#include <defaultnormal_vertex>
	#include <normal_vertex>
	#include <begin_vertex>
	#include <morphtarget_vertex>
	#include <skinning_vertex>
	#include <displacementmap_vertex>
	#include <project_vertex>
	#include <logdepthbuf_vertex>
	#include <clipping_planes_vertex>
	vViewPosition = - mvPosition.xyz;
	#include <worldpos_vertex>
	#include <envmap_vertex>
	#include <shadowmap_vertex>
	#include <fog_vertex>
}`,meshlambert_frag:`#define LAMBERT
uniform vec3 diffuse;
uniform vec3 emissive;
uniform float opacity;
#include <common>
#include <dithering_pars_fragment>
#include <color_pars_fragment>
#include <uv_pars_fragment>
#include <map_pars_fragment>
#include <alphamap_pars_fragment>
#include <alphatest_pars_fragment>
#include <alphahash_pars_fragment>
#include <aomap_pars_fragment>
#include <lightmap_pars_fragment>
#include <emissivemap_pars_fragment>
#include <cube_uv_reflection_fragment>
#include <envmap_common_pars_fragment>
#include <envmap_pars_fragment>
#include <envmap_physical_pars_fragment>
#include <fog_pars_fragment>
#include <bsdfs>
#include <lights_pars_begin>
#include <normal_pars_fragment>
#include <lights_lambert_pars_fragment>
#include <shadowmap_pars_fragment>
#include <bumpmap_pars_fragment>
#include <normalmap_pars_fragment>
#include <specularmap_pars_fragment>
#include <logdepthbuf_pars_fragment>
#include <clipping_planes_pars_fragment>
void main() {
	vec4 diffuseColor = vec4( diffuse, opacity );
	#include <clipping_planes_fragment>
	ReflectedLight reflectedLight = ReflectedLight( vec3( 0.0 ), vec3( 0.0 ), vec3( 0.0 ), vec3( 0.0 ) );
	vec3 totalEmissiveRadiance = emissive;
	#include <logdepthbuf_fragment>
	#include <map_fragment>
	#include <color_fragment>
	#include <alphamap_fragment>
	#include <alphatest_fragment>
	#include <alphahash_fragment>
	#include <specularmap_fragment>
	#include <normal_fragment_begin>
	#include <normal_fragment_maps>
	#include <emissivemap_fragment>
	#include <lights_lambert_fragment>
	#include <lights_fragment_begin>
	#include <lights_fragment_maps>
	#include <lights_fragment_end>
	#include <aomap_fragment>
	vec3 outgoingLight = reflectedLight.directDiffuse + reflectedLight.indirectDiffuse + totalEmissiveRadiance;
	#include <envmap_fragment>
	#include <opaque_fragment>
	#include <tonemapping_fragment>
	#include <colorspace_fragment>
	#include <fog_fragment>
	#include <premultiplied_alpha_fragment>
	#include <dithering_fragment>
}`,meshmatcap_vert:`#define MATCAP
varying vec3 vViewPosition;
#include <common>
#include <batching_pars_vertex>
#include <uv_pars_vertex>
#include <color_pars_vertex>
#include <displacementmap_pars_vertex>
#include <fog_pars_vertex>
#include <normal_pars_vertex>
#include <morphtarget_pars_vertex>
#include <skinning_pars_vertex>
#include <logdepthbuf_pars_vertex>
#include <clipping_planes_pars_vertex>
void main() {
	#include <uv_vertex>
	#include <color_vertex>
	#include <morphinstance_vertex>
	#include <morphcolor_vertex>
	#include <batching_vertex>
	#include <beginnormal_vertex>
	#include <morphnormal_vertex>
	#include <skinbase_vertex>
	#include <skinnormal_vertex>
	#include <defaultnormal_vertex>
	#include <normal_vertex>
	#include <begin_vertex>
	#include <morphtarget_vertex>
	#include <skinning_vertex>
	#include <displacementmap_vertex>
	#include <project_vertex>
	#include <logdepthbuf_vertex>
	#include <clipping_planes_vertex>
	#include <fog_vertex>
	vViewPosition = - mvPosition.xyz;
}`,meshmatcap_frag:`#define MATCAP
uniform vec3 diffuse;
uniform float opacity;
uniform sampler2D matcap;
varying vec3 vViewPosition;
#include <common>
#include <dithering_pars_fragment>
#include <color_pars_fragment>
#include <uv_pars_fragment>
#include <map_pars_fragment>
#include <alphamap_pars_fragment>
#include <alphatest_pars_fragment>
#include <alphahash_pars_fragment>
#include <fog_pars_fragment>
#include <normal_pars_fragment>
#include <bumpmap_pars_fragment>
#include <normalmap_pars_fragment>
#include <logdepthbuf_pars_fragment>
#include <clipping_planes_pars_fragment>
void main() {
	vec4 diffuseColor = vec4( diffuse, opacity );
	#include <clipping_planes_fragment>
	#include <logdepthbuf_fragment>
	#include <map_fragment>
	#include <color_fragment>
	#include <alphamap_fragment>
	#include <alphatest_fragment>
	#include <alphahash_fragment>
	#include <normal_fragment_begin>
	#include <normal_fragment_maps>
	vec3 viewDir = normalize( vViewPosition );
	vec3 x = normalize( vec3( viewDir.z, 0.0, - viewDir.x ) );
	vec3 y = cross( viewDir, x );
	vec2 uv = vec2( dot( x, normal ), dot( y, normal ) ) * 0.495 + 0.5;
	#ifdef USE_MATCAP
		vec4 matcapColor = texture2D( matcap, uv );
	#else
		vec4 matcapColor = vec4( vec3( mix( 0.2, 0.8, uv.y ) ), 1.0 );
	#endif
	vec3 outgoingLight = diffuseColor.rgb * matcapColor.rgb;
	#include <opaque_fragment>
	#include <tonemapping_fragment>
	#include <colorspace_fragment>
	#include <fog_fragment>
	#include <premultiplied_alpha_fragment>
	#include <dithering_fragment>
}`,meshnormal_vert:`#define NORMAL
#if defined( FLAT_SHADED ) || defined( USE_BUMPMAP ) || defined( USE_NORMALMAP_TANGENTSPACE )
	varying vec3 vViewPosition;
#endif
#include <common>
#include <batching_pars_vertex>
#include <uv_pars_vertex>
#include <displacementmap_pars_vertex>
#include <normal_pars_vertex>
#include <morphtarget_pars_vertex>
#include <skinning_pars_vertex>
#include <logdepthbuf_pars_vertex>
#include <clipping_planes_pars_vertex>
void main() {
	#include <uv_vertex>
	#include <batching_vertex>
	#include <beginnormal_vertex>
	#include <morphinstance_vertex>
	#include <morphnormal_vertex>
	#include <skinbase_vertex>
	#include <skinnormal_vertex>
	#include <defaultnormal_vertex>
	#include <normal_vertex>
	#include <begin_vertex>
	#include <morphtarget_vertex>
	#include <skinning_vertex>
	#include <displacementmap_vertex>
	#include <project_vertex>
	#include <logdepthbuf_vertex>
	#include <clipping_planes_vertex>
#if defined( FLAT_SHADED ) || defined( USE_BUMPMAP ) || defined( USE_NORMALMAP_TANGENTSPACE )
	vViewPosition = - mvPosition.xyz;
#endif
}`,meshnormal_frag:`#define NORMAL
uniform float opacity;
#if defined( FLAT_SHADED ) || defined( USE_BUMPMAP ) || defined( USE_NORMALMAP_TANGENTSPACE )
	varying vec3 vViewPosition;
#endif
#include <uv_pars_fragment>
#include <normal_pars_fragment>
#include <bumpmap_pars_fragment>
#include <normalmap_pars_fragment>
#include <logdepthbuf_pars_fragment>
#include <clipping_planes_pars_fragment>
void main() {
	vec4 diffuseColor = vec4( 0.0, 0.0, 0.0, opacity );
	#include <clipping_planes_fragment>
	#include <logdepthbuf_fragment>
	#include <normal_fragment_begin>
	#include <normal_fragment_maps>
	gl_FragColor = vec4( normalize( normal ) * 0.5 + 0.5, diffuseColor.a );
	#ifdef OPAQUE
		gl_FragColor.a = 1.0;
	#endif
}`,meshphong_vert:`#define PHONG
varying vec3 vViewPosition;
#include <common>
#include <batching_pars_vertex>
#include <uv_pars_vertex>
#include <displacementmap_pars_vertex>
#include <envmap_pars_vertex>
#include <color_pars_vertex>
#include <fog_pars_vertex>
#include <normal_pars_vertex>
#include <morphtarget_pars_vertex>
#include <skinning_pars_vertex>
#include <shadowmap_pars_vertex>
#include <logdepthbuf_pars_vertex>
#include <clipping_planes_pars_vertex>
void main() {
	#include <uv_vertex>
	#include <color_vertex>
	#include <morphcolor_vertex>
	#include <batching_vertex>
	#include <beginnormal_vertex>
	#include <morphinstance_vertex>
	#include <morphnormal_vertex>
	#include <skinbase_vertex>
	#include <skinnormal_vertex>
	#include <defaultnormal_vertex>
	#include <normal_vertex>
	#include <begin_vertex>
	#include <morphtarget_vertex>
	#include <skinning_vertex>
	#include <displacementmap_vertex>
	#include <project_vertex>
	#include <logdepthbuf_vertex>
	#include <clipping_planes_vertex>
	vViewPosition = - mvPosition.xyz;
	#include <worldpos_vertex>
	#include <envmap_vertex>
	#include <shadowmap_vertex>
	#include <fog_vertex>
}`,meshphong_frag:`#define PHONG
uniform vec3 diffuse;
uniform vec3 emissive;
uniform vec3 specular;
uniform float shininess;
uniform float opacity;
#include <common>
#include <dithering_pars_fragment>
#include <color_pars_fragment>
#include <uv_pars_fragment>
#include <map_pars_fragment>
#include <alphamap_pars_fragment>
#include <alphatest_pars_fragment>
#include <alphahash_pars_fragment>
#include <aomap_pars_fragment>
#include <lightmap_pars_fragment>
#include <emissivemap_pars_fragment>
#include <cube_uv_reflection_fragment>
#include <envmap_common_pars_fragment>
#include <envmap_pars_fragment>
#include <envmap_physical_pars_fragment>
#include <fog_pars_fragment>
#include <bsdfs>
#include <lights_pars_begin>
#include <normal_pars_fragment>
#include <lights_phong_pars_fragment>
#include <shadowmap_pars_fragment>
#include <bumpmap_pars_fragment>
#include <normalmap_pars_fragment>
#include <specularmap_pars_fragment>
#include <logdepthbuf_pars_fragment>
#include <clipping_planes_pars_fragment>
void main() {
	vec4 diffuseColor = vec4( diffuse, opacity );
	#include <clipping_planes_fragment>
	ReflectedLight reflectedLight = ReflectedLight( vec3( 0.0 ), vec3( 0.0 ), vec3( 0.0 ), vec3( 0.0 ) );
	vec3 totalEmissiveRadiance = emissive;
	#include <logdepthbuf_fragment>
	#include <map_fragment>
	#include <color_fragment>
	#include <alphamap_fragment>
	#include <alphatest_fragment>
	#include <alphahash_fragment>
	#include <specularmap_fragment>
	#include <normal_fragment_begin>
	#include <normal_fragment_maps>
	#include <emissivemap_fragment>
	#include <lights_phong_fragment>
	#include <lights_fragment_begin>
	#include <lights_fragment_maps>
	#include <lights_fragment_end>
	#include <aomap_fragment>
	vec3 outgoingLight = reflectedLight.directDiffuse + reflectedLight.indirectDiffuse + reflectedLight.directSpecular + reflectedLight.indirectSpecular + totalEmissiveRadiance;
	#include <envmap_fragment>
	#include <opaque_fragment>
	#include <tonemapping_fragment>
	#include <colorspace_fragment>
	#include <fog_fragment>
	#include <premultiplied_alpha_fragment>
	#include <dithering_fragment>
}`,meshphysical_vert:`#define STANDARD
varying vec3 vViewPosition;
#ifdef USE_TRANSMISSION
	varying vec3 vWorldPosition;
#endif
#include <common>
#include <batching_pars_vertex>
#include <uv_pars_vertex>
#include <displacementmap_pars_vertex>
#include <color_pars_vertex>
#include <fog_pars_vertex>
#include <normal_pars_vertex>
#include <morphtarget_pars_vertex>
#include <skinning_pars_vertex>
#include <shadowmap_pars_vertex>
#include <logdepthbuf_pars_vertex>
#include <clipping_planes_pars_vertex>
void main() {
	#include <uv_vertex>
	#include <color_vertex>
	#include <morphinstance_vertex>
	#include <morphcolor_vertex>
	#include <batching_vertex>
	#include <beginnormal_vertex>
	#include <morphnormal_vertex>
	#include <skinbase_vertex>
	#include <skinnormal_vertex>
	#include <defaultnormal_vertex>
	#include <normal_vertex>
	#include <begin_vertex>
	#include <morphtarget_vertex>
	#include <skinning_vertex>
	#include <displacementmap_vertex>
	#include <project_vertex>
	#include <logdepthbuf_vertex>
	#include <clipping_planes_vertex>
	vViewPosition = - mvPosition.xyz;
	#include <worldpos_vertex>
	#include <shadowmap_vertex>
	#include <fog_vertex>
#ifdef USE_TRANSMISSION
	vWorldPosition = worldPosition.xyz;
#endif
}`,meshphysical_frag:`#define STANDARD
#ifdef PHYSICAL
	#define IOR
	#define USE_SPECULAR
#endif
uniform vec3 diffuse;
uniform vec3 emissive;
uniform float roughness;
uniform float metalness;
uniform float opacity;
#ifdef IOR
	uniform float ior;
#endif
#ifdef USE_SPECULAR
	uniform float specularIntensity;
	uniform vec3 specularColor;
	#ifdef USE_SPECULAR_COLORMAP
		uniform sampler2D specularColorMap;
	#endif
	#ifdef USE_SPECULAR_INTENSITYMAP
		uniform sampler2D specularIntensityMap;
	#endif
#endif
#ifdef USE_CLEARCOAT
	uniform float clearcoat;
	uniform float clearcoatRoughness;
#endif
#ifdef USE_DISPERSION
	uniform float dispersion;
#endif
#ifdef USE_RETROREFLECTION
	uniform float retroreflectivity;
#endif
#ifdef USE_IRIDESCENCE
	uniform float iridescence;
	uniform float iridescenceIOR;
	uniform float iridescenceThicknessMinimum;
	uniform float iridescenceThicknessMaximum;
#endif
#ifdef USE_SHEEN
	uniform vec3 sheenColor;
	uniform float sheenRoughness;
	#ifdef USE_SHEEN_COLORMAP
		uniform sampler2D sheenColorMap;
	#endif
	#ifdef USE_SHEEN_ROUGHNESSMAP
		uniform sampler2D sheenRoughnessMap;
	#endif
#endif
#ifdef USE_ANISOTROPY
	uniform vec2 anisotropyVector;
	#ifdef USE_ANISOTROPYMAP
		uniform sampler2D anisotropyMap;
	#endif
#endif
varying vec3 vViewPosition;
#include <common>
#include <dithering_pars_fragment>
#include <color_pars_fragment>
#include <uv_pars_fragment>
#include <map_pars_fragment>
#include <alphamap_pars_fragment>
#include <alphatest_pars_fragment>
#include <alphahash_pars_fragment>
#include <aomap_pars_fragment>
#include <lightmap_pars_fragment>
#include <emissivemap_pars_fragment>
#include <iridescence_fragment>
#include <cube_uv_reflection_fragment>
#include <envmap_common_pars_fragment>
#include <envmap_physical_pars_fragment>
#include <fog_pars_fragment>
#include <lights_pars_begin>
#include <normal_pars_fragment>
#include <lights_physical_pars_fragment>
#include <transmission_pars_fragment>
#include <shadowmap_pars_fragment>
#include <bumpmap_pars_fragment>
#include <normalmap_pars_fragment>
#include <clearcoat_pars_fragment>
#include <iridescence_pars_fragment>
#include <roughnessmap_pars_fragment>
#include <metalnessmap_pars_fragment>
#include <logdepthbuf_pars_fragment>
#include <clipping_planes_pars_fragment>
void main() {
	vec4 diffuseColor = vec4( diffuse, opacity );
	#include <clipping_planes_fragment>
	ReflectedLight reflectedLight = ReflectedLight( vec3( 0.0 ), vec3( 0.0 ), vec3( 0.0 ), vec3( 0.0 ) );
	vec3 totalEmissiveRadiance = emissive;
	#include <logdepthbuf_fragment>
	#include <map_fragment>
	#include <color_fragment>
	#include <alphamap_fragment>
	#include <alphatest_fragment>
	#include <alphahash_fragment>
	#include <roughnessmap_fragment>
	#include <metalnessmap_fragment>
	#include <normal_fragment_begin>
	#include <normal_fragment_maps>
	#include <clearcoat_normal_fragment_begin>
	#include <clearcoat_normal_fragment_maps>
	#include <emissivemap_fragment>
	#include <lights_physical_fragment>
	#include <lights_fragment_begin>
	#include <lights_fragment_maps>
	#include <lights_fragment_end>
	#include <aomap_fragment>
	vec3 totalDiffuse = reflectedLight.directDiffuse + reflectedLight.indirectDiffuse;
	vec3 totalSpecular = reflectedLight.directSpecular + reflectedLight.indirectSpecular;
	#include <transmission_fragment>
	vec3 outgoingLight = totalDiffuse + totalSpecular + totalEmissiveRadiance;
	#ifdef USE_SHEEN
 
		outgoingLight = outgoingLight + sheenSpecularDirect + sheenSpecularIndirect;
 
 	#endif
	#ifdef USE_CLEARCOAT
		float dotNVcc = saturate( dot( geometryClearcoatNormal, geometryViewDir ) );
		vec3 Fcc = F_Schlick( material.clearcoatF0, material.clearcoatF90, dotNVcc );
		outgoingLight = outgoingLight * ( 1.0 - material.clearcoat * Fcc ) + ( clearcoatSpecularDirect + clearcoatSpecularIndirect ) * material.clearcoat;
	#endif
	#include <opaque_fragment>
	#include <tonemapping_fragment>
	#include <colorspace_fragment>
	#include <fog_fragment>
	#include <premultiplied_alpha_fragment>
	#include <dithering_fragment>
}`,meshtoon_vert:`#define TOON
varying vec3 vViewPosition;
#include <common>
#include <batching_pars_vertex>
#include <uv_pars_vertex>
#include <displacementmap_pars_vertex>
#include <color_pars_vertex>
#include <fog_pars_vertex>
#include <normal_pars_vertex>
#include <morphtarget_pars_vertex>
#include <skinning_pars_vertex>
#include <shadowmap_pars_vertex>
#include <logdepthbuf_pars_vertex>
#include <clipping_planes_pars_vertex>
void main() {
	#include <uv_vertex>
	#include <color_vertex>
	#include <morphinstance_vertex>
	#include <morphcolor_vertex>
	#include <batching_vertex>
	#include <beginnormal_vertex>
	#include <morphnormal_vertex>
	#include <skinbase_vertex>
	#include <skinnormal_vertex>
	#include <defaultnormal_vertex>
	#include <normal_vertex>
	#include <begin_vertex>
	#include <morphtarget_vertex>
	#include <skinning_vertex>
	#include <displacementmap_vertex>
	#include <project_vertex>
	#include <logdepthbuf_vertex>
	#include <clipping_planes_vertex>
	vViewPosition = - mvPosition.xyz;
	#include <worldpos_vertex>
	#include <shadowmap_vertex>
	#include <fog_vertex>
}`,meshtoon_frag:`#define TOON
uniform vec3 diffuse;
uniform vec3 emissive;
uniform float opacity;
#include <common>
#include <dithering_pars_fragment>
#include <color_pars_fragment>
#include <uv_pars_fragment>
#include <map_pars_fragment>
#include <alphamap_pars_fragment>
#include <alphatest_pars_fragment>
#include <alphahash_pars_fragment>
#include <aomap_pars_fragment>
#include <lightmap_pars_fragment>
#include <emissivemap_pars_fragment>
#include <gradientmap_pars_fragment>
#include <fog_pars_fragment>
#include <bsdfs>
#include <lights_pars_begin>
#include <normal_pars_fragment>
#include <lights_toon_pars_fragment>
#include <shadowmap_pars_fragment>
#include <bumpmap_pars_fragment>
#include <normalmap_pars_fragment>
#include <logdepthbuf_pars_fragment>
#include <clipping_planes_pars_fragment>
void main() {
	vec4 diffuseColor = vec4( diffuse, opacity );
	#include <clipping_planes_fragment>
	ReflectedLight reflectedLight = ReflectedLight( vec3( 0.0 ), vec3( 0.0 ), vec3( 0.0 ), vec3( 0.0 ) );
	vec3 totalEmissiveRadiance = emissive;
	#include <logdepthbuf_fragment>
	#include <map_fragment>
	#include <color_fragment>
	#include <alphamap_fragment>
	#include <alphatest_fragment>
	#include <alphahash_fragment>
	#include <normal_fragment_begin>
	#include <normal_fragment_maps>
	#include <emissivemap_fragment>
	#include <lights_toon_fragment>
	#include <lights_fragment_begin>
	#include <lights_fragment_maps>
	#include <lights_fragment_end>
	#include <aomap_fragment>
	vec3 outgoingLight = reflectedLight.directDiffuse + reflectedLight.indirectDiffuse + totalEmissiveRadiance;
	#include <opaque_fragment>
	#include <tonemapping_fragment>
	#include <colorspace_fragment>
	#include <fog_fragment>
	#include <premultiplied_alpha_fragment>
	#include <dithering_fragment>
}`,points_vert:`uniform float size;
uniform float scale;
#include <common>
#include <color_pars_vertex>
#include <fog_pars_vertex>
#include <morphtarget_pars_vertex>
#include <logdepthbuf_pars_vertex>
#include <clipping_planes_pars_vertex>
#ifdef USE_POINTS_UV
	varying vec2 vUv;
	uniform mat3 uvTransform;
#endif
void main() {
	#ifdef USE_POINTS_UV
		vUv = ( uvTransform * vec3( uv, 1 ) ).xy;
	#endif
	#include <color_vertex>
	#include <morphinstance_vertex>
	#include <morphcolor_vertex>
	#include <begin_vertex>
	#include <morphtarget_vertex>
	#include <project_vertex>
	gl_PointSize = size;
	#ifdef USE_SIZEATTENUATION
		bool isPerspective = isPerspectiveMatrix( projectionMatrix );
		if ( isPerspective ) gl_PointSize *= ( scale / - mvPosition.z );
	#endif
	#include <logdepthbuf_vertex>
	#include <clipping_planes_vertex>
	#include <worldpos_vertex>
	#include <fog_vertex>
}`,points_frag:`uniform vec3 diffuse;
uniform float opacity;
#include <common>
#include <color_pars_fragment>
#include <map_particle_pars_fragment>
#include <alphatest_pars_fragment>
#include <alphahash_pars_fragment>
#include <fog_pars_fragment>
#include <logdepthbuf_pars_fragment>
#include <clipping_planes_pars_fragment>
void main() {
	vec4 diffuseColor = vec4( diffuse, opacity );
	#include <clipping_planes_fragment>
	vec3 outgoingLight = vec3( 0.0 );
	#include <logdepthbuf_fragment>
	#include <map_particle_fragment>
	#include <color_fragment>
	#include <alphatest_fragment>
	#include <alphahash_fragment>
	outgoingLight = diffuseColor.rgb;
	#include <opaque_fragment>
	#include <tonemapping_fragment>
	#include <colorspace_fragment>
	#include <fog_fragment>
	#include <premultiplied_alpha_fragment>
}`,shadow_vert:`#include <common>
#include <batching_pars_vertex>
#include <fog_pars_vertex>
#include <morphtarget_pars_vertex>
#include <skinning_pars_vertex>
#include <logdepthbuf_pars_vertex>
#include <shadowmap_pars_vertex>
void main() {
	#include <batching_vertex>
	#include <beginnormal_vertex>
	#include <morphinstance_vertex>
	#include <morphnormal_vertex>
	#include <skinbase_vertex>
	#include <skinnormal_vertex>
	#include <defaultnormal_vertex>
	#include <begin_vertex>
	#include <morphtarget_vertex>
	#include <skinning_vertex>
	#include <project_vertex>
	#include <logdepthbuf_vertex>
	#include <worldpos_vertex>
	#include <shadowmap_vertex>
	#include <fog_vertex>
}`,shadow_frag:`uniform vec3 color;
uniform float opacity;
#include <common>
#include <fog_pars_fragment>
#include <bsdfs>
#include <lights_pars_begin>
#include <logdepthbuf_pars_fragment>
#include <shadowmap_pars_fragment>
#include <shadowmask_pars_fragment>
void main() {
	#include <logdepthbuf_fragment>
	gl_FragColor = vec4( color, opacity * ( 1.0 - getShadowMask() ) );
	#include <tonemapping_fragment>
	#include <colorspace_fragment>
	#include <fog_fragment>
	#include <premultiplied_alpha_fragment>
}`,sprite_vert:`uniform float rotation;
uniform vec2 center;
#include <common>
#include <uv_pars_vertex>
#include <fog_pars_vertex>
#include <logdepthbuf_pars_vertex>
#include <clipping_planes_pars_vertex>
void main() {
	#include <uv_vertex>
	vec4 mvPosition = modelViewMatrix[ 3 ];
	vec2 scale = vec2( length( modelMatrix[ 0 ].xyz ), length( modelMatrix[ 1 ].xyz ) );
	#ifndef USE_SIZEATTENUATION
		bool isPerspective = isPerspectiveMatrix( projectionMatrix );
		if ( isPerspective ) scale *= - mvPosition.z;
	#endif
	vec2 alignedPosition = ( position.xy - ( center - vec2( 0.5 ) ) ) * scale;
	vec2 rotatedPosition;
	rotatedPosition.x = cos( rotation ) * alignedPosition.x - sin( rotation ) * alignedPosition.y;
	rotatedPosition.y = sin( rotation ) * alignedPosition.x + cos( rotation ) * alignedPosition.y;
	mvPosition.xy += rotatedPosition;
	gl_Position = projectionMatrix * mvPosition;
	#include <logdepthbuf_vertex>
	#include <clipping_planes_vertex>
	#include <fog_vertex>
}`,sprite_frag:`uniform vec3 diffuse;
uniform float opacity;
#include <common>
#include <uv_pars_fragment>
#include <map_pars_fragment>
#include <alphamap_pars_fragment>
#include <alphatest_pars_fragment>
#include <alphahash_pars_fragment>
#include <fog_pars_fragment>
#include <logdepthbuf_pars_fragment>
#include <clipping_planes_pars_fragment>
void main() {
	vec4 diffuseColor = vec4( diffuse, opacity );
	#include <clipping_planes_fragment>
	vec3 outgoingLight = vec3( 0.0 );
	#include <logdepthbuf_fragment>
	#include <map_fragment>
	#include <alphamap_fragment>
	#include <alphatest_fragment>
	#include <alphahash_fragment>
	outgoingLight = diffuseColor.rgb;
	#include <opaque_fragment>
	#include <tonemapping_fragment>
	#include <colorspace_fragment>
	#include <fog_fragment>
}`},Z={common:{diffuse:{value:new X(16777215)},opacity:{value:1},map:{value:null},mapTransform:{value:new Ut},alphaMap:{value:null},alphaMapTransform:{value:new Ut},alphaTest:{value:0}},specularmap:{specularMap:{value:null},specularMapTransform:{value:new Ut}},envmap:{envMap:{value:null},envMapRotation:{value:new Ut},reflectivity:{value:1},ior:{value:1.5},refractionRatio:{value:.98},dfgLUT:{value:null}},aomap:{aoMap:{value:null},aoMapIntensity:{value:1},aoMapTransform:{value:new Ut}},lightmap:{lightMap:{value:null},lightMapIntensity:{value:1},lightMapTransform:{value:new Ut}},bumpmap:{bumpMap:{value:null},bumpMapTransform:{value:new Ut},bumpScale:{value:1}},normalmap:{normalMap:{value:null},normalMapTransform:{value:new Ut},normalScale:{value:new J(1,1)}},displacementmap:{displacementMap:{value:null},displacementMapTransform:{value:new Ut},displacementScale:{value:1},displacementBias:{value:0}},emissivemap:{emissiveMap:{value:null},emissiveMapTransform:{value:new Ut}},metalnessmap:{metalnessMap:{value:null},metalnessMapTransform:{value:new Ut}},roughnessmap:{roughnessMap:{value:null},roughnessMapTransform:{value:new Ut}},gradientmap:{gradientMap:{value:null}},fog:{fogDensity:{value:25e-5},fogNear:{value:1},fogFar:{value:2e3},fogColor:{value:new X(16777215)}},lights:{ambientLightColor:{value:[]},lightProbe:{value:[]},sunLights:{value:[],properties:{direction:{},color:{}}},sunLightShadows:{value:[],properties:{shadowIntensity:1,shadowBias:{},shadowNormalBias:{},shadowRadius:{},shadowMapSize:{}}},sunShadowMatrix:{value:[]},sunShadowCascade:{value:[]},directionalLights:{value:[],properties:{direction:{},color:{}}},directionalLightShadows:{value:[],properties:{shadowIntensity:1,shadowBias:{},shadowNormalBias:{},shadowRadius:{},shadowMapSize:{}}},directionalShadowMatrix:{value:[]},spotLights:{value:[],properties:{color:{},position:{},direction:{},distance:{},coneCos:{},penumbraCos:{},decay:{}}},spotLightShadows:{value:[],properties:{shadowIntensity:1,shadowBias:{},shadowNormalBias:{},shadowRadius:{},shadowMapSize:{}}},spotLightMap:{value:[]},spotLightMatrix:{value:[]},pointLights:{value:[],properties:{color:{},position:{},decay:{},distance:{}}},pointLightShadows:{value:[],properties:{shadowIntensity:1,shadowBias:{},shadowNormalBias:{},shadowRadius:{},shadowMapSize:{},shadowCameraNear:{},shadowCameraFar:{}}},pointShadowMatrix:{value:[]},hemisphereLights:{value:[],properties:{direction:{},skyColor:{},groundColor:{}}},rectAreaLights:{value:[],properties:{color:{},position:{},width:{},height:{}}},ltc_1:{value:null},ltc_2:{value:null},probesSH:{value:null},probesMin:{value:new Y},probesMax:{value:new Y},probesResolution:{value:new Y}},points:{diffuse:{value:new X(16777215)},opacity:{value:1},size:{value:1},scale:{value:1},map:{value:null},alphaMap:{value:null},alphaMapTransform:{value:new Ut},alphaTest:{value:0},uvTransform:{value:new Ut}},sprite:{diffuse:{value:new X(16777215)},opacity:{value:1},center:{value:new J(.5,.5)},rotation:{value:0},map:{value:null},mapTransform:{value:new Ut},alphaMap:{value:null},alphaMapTransform:{value:new Ut},alphaTest:{value:0}}},ko={basic:{uniforms:ua([Z.common,Z.specularmap,Z.envmap,Z.aomap,Z.lightmap,Z.fog]),vertexShader:Oo.meshbasic_vert,fragmentShader:Oo.meshbasic_frag},lambert:{uniforms:ua([Z.common,Z.specularmap,Z.envmap,Z.aomap,Z.lightmap,Z.emissivemap,Z.bumpmap,Z.normalmap,Z.displacementmap,Z.fog,Z.lights,{emissive:{value:new X(0)},envMapIntensity:{value:1}}]),vertexShader:Oo.meshlambert_vert,fragmentShader:Oo.meshlambert_frag},phong:{uniforms:ua([Z.common,Z.specularmap,Z.envmap,Z.aomap,Z.lightmap,Z.emissivemap,Z.bumpmap,Z.normalmap,Z.displacementmap,Z.fog,Z.lights,{emissive:{value:new X(0)},specular:{value:new X(1118481)},shininess:{value:30},envMapIntensity:{value:1}}]),vertexShader:Oo.meshphong_vert,fragmentShader:Oo.meshphong_frag},standard:{uniforms:ua([Z.common,Z.envmap,Z.aomap,Z.lightmap,Z.emissivemap,Z.bumpmap,Z.normalmap,Z.displacementmap,Z.roughnessmap,Z.metalnessmap,Z.fog,Z.lights,{emissive:{value:new X(0)},roughness:{value:1},metalness:{value:0},envMapIntensity:{value:1}}]),vertexShader:Oo.meshphysical_vert,fragmentShader:Oo.meshphysical_frag},toon:{uniforms:ua([Z.common,Z.aomap,Z.lightmap,Z.emissivemap,Z.bumpmap,Z.normalmap,Z.displacementmap,Z.gradientmap,Z.fog,Z.lights,{emissive:{value:new X(0)}}]),vertexShader:Oo.meshtoon_vert,fragmentShader:Oo.meshtoon_frag},matcap:{uniforms:ua([Z.common,Z.bumpmap,Z.normalmap,Z.displacementmap,Z.fog,{matcap:{value:null}}]),vertexShader:Oo.meshmatcap_vert,fragmentShader:Oo.meshmatcap_frag},points:{uniforms:ua([Z.points,Z.fog]),vertexShader:Oo.points_vert,fragmentShader:Oo.points_frag},dashed:{uniforms:ua([Z.common,Z.fog,{scale:{value:1},dashSize:{value:1},totalSize:{value:2}}]),vertexShader:Oo.linedashed_vert,fragmentShader:Oo.linedashed_frag},depth:{uniforms:ua([Z.common,Z.displacementmap]),vertexShader:Oo.depth_vert,fragmentShader:Oo.depth_frag},normal:{uniforms:ua([Z.common,Z.bumpmap,Z.normalmap,Z.displacementmap,{opacity:{value:1}}]),vertexShader:Oo.meshnormal_vert,fragmentShader:Oo.meshnormal_frag},sprite:{uniforms:ua([Z.sprite,Z.fog]),vertexShader:Oo.sprite_vert,fragmentShader:Oo.sprite_frag},background:{uniforms:{uvTransform:{value:new Ut},t2D:{value:null},backgroundIntensity:{value:1}},vertexShader:Oo.background_vert,fragmentShader:Oo.background_frag},backgroundCube:{uniforms:{envMap:{value:null},backgroundBlurriness:{value:0},backgroundIntensity:{value:1},backgroundRotation:{value:new Ut}},vertexShader:Oo.backgroundCube_vert,fragmentShader:Oo.backgroundCube_frag},cube:{uniforms:{tCube:{value:null},tFlip:{value:-1},opacity:{value:1}},vertexShader:Oo.cube_vert,fragmentShader:Oo.cube_frag},equirect:{uniforms:{tEquirect:{value:null}},vertexShader:Oo.equirect_vert,fragmentShader:Oo.equirect_frag},distance:{uniforms:ua([Z.common,Z.displacementmap,{referencePosition:{value:new Y},nearDistance:{value:1},farDistance:{value:1e3}}]),vertexShader:Oo.distance_vert,fragmentShader:Oo.distance_frag},shadow:{uniforms:ua([Z.lights,Z.fog,{color:{value:new X(0)},opacity:{value:1}}]),vertexShader:Oo.shadow_vert,fragmentShader:Oo.shadow_frag}};ko.physical={uniforms:ua([ko.standard.uniforms,{clearcoat:{value:0},clearcoatMap:{value:null},clearcoatMapTransform:{value:new Ut},clearcoatNormalMap:{value:null},clearcoatNormalMapTransform:{value:new Ut},clearcoatNormalScale:{value:new J(1,1)},clearcoatRoughness:{value:0},clearcoatRoughnessMap:{value:null},clearcoatRoughnessMapTransform:{value:new Ut},dispersion:{value:0},retroreflectivity:{value:0},iridescence:{value:0},iridescenceMap:{value:null},iridescenceMapTransform:{value:new Ut},iridescenceIOR:{value:1.3},iridescenceThicknessMinimum:{value:100},iridescenceThicknessMaximum:{value:400},iridescenceThicknessMap:{value:null},iridescenceThicknessMapTransform:{value:new Ut},sheen:{value:0},sheenColor:{value:new X(0)},sheenColorMap:{value:null},sheenColorMapTransform:{value:new Ut},sheenRoughness:{value:1},sheenRoughnessMap:{value:null},sheenRoughnessMapTransform:{value:new Ut},transmission:{value:0},transmissionMap:{value:null},transmissionMapTransform:{value:new Ut},transmissionSamplerSize:{value:new J},transmissionSamplerMap:{value:null},thickness:{value:0},thicknessMap:{value:null},thicknessMapTransform:{value:new Ut},attenuationDistance:{value:0},attenuationColor:{value:new X(0)},specularColor:{value:new X(1,1,1)},specularColorMap:{value:null},specularColorMapTransform:{value:new Ut},specularIntensity:{value:1},specularIntensityMap:{value:null},specularIntensityMapTransform:{value:new Ut},anisotropyVector:{value:new J},anisotropyMap:{value:null},anisotropyMapTransform:{value:new Ut}}]),vertexShader:Oo.meshphysical_vert,fragmentShader:Oo.meshphysical_frag};var Ao={r:0,b:0,g:0},jo=new dn,Mo=new Ut;Mo.set(-1,0,0,0,1,0,0,0,1);function No(e,t,n,r,i,a){let o=new X(0),s=i===!0?0:1,c,l,u=null,d=0,f=null;function p(e){let n=e.isScene===!0?e.background:null;if(n&&n.isTexture){let r=e.backgroundBlurriness>0;n=t.get(n,r)}return n}function m(t){let r=!1,i=p(t);i===null?g(o,s):i&&i.isColor&&(g(i,1),r=!0);let c=e.xr.getEnvironmentBlendMode();c===`additive`?n.buffers.color.setClear(0,0,0,1,a):c===`alpha-blend`&&n.buffers.color.setClear(0,0,0,0,a),(e.autoClear||r)&&(n.buffers.depth.setTest(!0),n.buffers.depth.setMask(!0),n.buffers.color.setMask(!0),e.clear(e.autoClearColor,e.autoClearDepth,e.autoClearStencil))}function h(t,n){let i=p(n);i&&(i.isCubeTexture||i.mapping===306)?(l===void 0&&(l=new di(new Li(1,1,1),new _a({name:`BackgroundCubeMaterial`,uniforms:la(ko.backgroundCube.uniforms),vertexShader:ko.backgroundCube.vertexShader,fragmentShader:ko.backgroundCube.fragmentShader,side:1,depthTest:!1,depthWrite:!1,fog:!1,allowOverride:!1})),l.geometry.deleteAttribute(`normal`),l.geometry.deleteAttribute(`uv`),l.onBeforeRender=function(e,t,n){this.matrixWorld.copyPosition(n.matrixWorld)},Object.defineProperty(l.material,"envMap",{get:function(){return this.uniforms.envMap.value}}),r.update(l)),l.material.uniforms.envMap.value=i,l.material.uniforms.backgroundBlurriness.value=n.backgroundBlurriness,l.material.uniforms.backgroundIntensity.value=n.backgroundIntensity,l.material.uniforms.backgroundRotation.value.setFromMatrix4(jo.makeRotationFromEuler(n.backgroundRotation)).transpose(),i.isCubeTexture&&i.isRenderTargetTexture===!1&&l.material.uniforms.backgroundRotation.value.premultiply(Mo),l.material.toneMapped=Jt.getTransfer(i.colorSpace)!==Qe,(u!==i||d!==i.version||f!==e.toneMapping)&&(l.material.needsUpdate=!0,u=i,d=i.version,f=e.toneMapping),l.layers.enableAll(),t.unshift(l,l.geometry,l.material,0,0,null)):i&&i.isTexture&&(c===void 0&&(c=new di(new ca(2,2),new _a({name:`BackgroundMaterial`,uniforms:la(ko.background.uniforms),vertexShader:ko.background.vertexShader,fragmentShader:ko.background.fragmentShader,side:0,depthTest:!1,depthWrite:!1,fog:!1,allowOverride:!1})),c.geometry.deleteAttribute(`normal`),Object.defineProperty(c.material,"map",{get:function(){return this.uniforms.t2D.value}}),r.update(c)),c.material.uniforms.t2D.value=i,c.material.uniforms.backgroundIntensity.value=n.backgroundIntensity,c.material.toneMapped=Jt.getTransfer(i.colorSpace)!==Qe,i.matrixAutoUpdate===!0&&i.updateMatrix(),c.material.uniforms.uvTransform.value.copy(i.matrix),(u!==i||d!==i.version||f!==e.toneMapping)&&(c.material.needsUpdate=!0,u=i,d=i.version,f=e.toneMapping),c.layers.enableAll(),t.unshift(c,c.geometry,c.material,0,0,null))}function g(t,r){t.getRGB(Ao,pa(e)),n.buffers.color.setClear(Ao.r,Ao.g,Ao.b,r,a)}function _(){l!==void 0&&(l.geometry.dispose(),l.material.dispose(),l=void 0),c!==void 0&&(c.geometry.dispose(),c.material.dispose(),c=void 0)}return{getClearColor:function(){return o},setClearColor:function(e,t=1){o.set(e),s=t,g(o,s)},getClearAlpha:function(){return s},setClearAlpha:function(e){s=e,g(o,s)},render:m,addToRenderList:h,dispose:_}}function Po(e,t){let n=e.getParameter(e.MAX_VERTEX_ATTRIBS),r={},i=f(null),a=i,o=!1;function s(n,r,i,s,c){let u=!1,f=d(n,s,i,r);a!==f&&(a=f,l(a.object)),u=p(n,s,i,c),u&&m(n,s,i,c),c!==null&&t.update(c,e.ELEMENT_ARRAY_BUFFER),(u||o)&&(o=!1,b(n,r,i,s),c!==null&&e.bindBuffer(e.ELEMENT_ARRAY_BUFFER,t.get(c).buffer))}function c(){return e.createVertexArray()}function l(t){return e.bindVertexArray(t)}function u(t){return e.deleteVertexArray(t)}function d(e,t,n,i){let a=i.wireframe===!0,o=r[t.id];o===void 0&&(o={},r[t.id]=o);let s=e.isInstancedMesh===!0?e.id:0,l=o[s];l===void 0&&(l={},o[s]=l);let u=l[n.id];u===void 0&&(u={},l[n.id]=u);let d=u[a];return d===void 0&&(d=f(c()),u[a]=d),d}function f(e){let t=[],r=[],i=[];for(let e=0;e<n;e++)t[e]=0,r[e]=0,i[e]=0;return{geometry:null,program:null,wireframe:!1,newAttributes:t,enabledAttributes:r,attributeDivisors:i,object:e,attributes:{},index:null}}function p(e,t,n,r){let i=a.attributes,o=t.attributes,s=0,c=n.getAttributes();for(let t in c)if(c[t].location>=0){let n=i[t],r=o[t];if(r===void 0&&(t===`instanceMatrix`&&e.instanceMatrix&&(r=e.instanceMatrix),t===`instanceColor`&&e.instanceColor&&(r=e.instanceColor)),n===void 0||n.attribute!==r||r&&n.data!==r.data)return!0;s++}return a.attributesNum!==s||a.index!==r}function m(e,t,n,r){let i={},o=t.attributes,s=0,c=n.getAttributes();for(let t in c)if(c[t].location>=0){let n=o[t];n===void 0&&(t===`instanceMatrix`&&e.instanceMatrix&&(n=e.instanceMatrix),t===`instanceColor`&&e.instanceColor&&(n=e.instanceColor));let r={};r.attribute=n,n&&n.data&&(r.data=n.data),i[t]=r,s++}a.attributes=i,a.attributesNum=s,a.index=r}function h(){let e=a.newAttributes;for(let t=0,n=e.length;t<n;t++)e[t]=0}function g(e){_(e,0)}function _(t,n){let r=a.newAttributes,i=a.enabledAttributes,o=a.attributeDivisors;r[t]=1,i[t]===0&&(e.enableVertexAttribArray(t),i[t]=1),o[t]!==n&&(e.vertexAttribDivisor(t,n),o[t]=n)}function v(){let t=a.newAttributes,n=a.enabledAttributes;for(let r=0,i=n.length;r<i;r++)n[r]!==t[r]&&(e.disableVertexAttribArray(r),n[r]=0)}function y(t,n,r,i,a,o,s){s===!0?e.vertexAttribIPointer(t,n,r,a,o):e.vertexAttribPointer(t,n,r,i,a,o)}function b(n,r,i,a){h();let o=a.attributes,s=i.getAttributes(),c=r.defaultAttributeValues;for(let r in s){let i=s[r];if(i.location>=0){let s=o[r];if(s===void 0&&(r===`instanceMatrix`&&n.instanceMatrix&&(s=n.instanceMatrix),r===`instanceColor`&&n.instanceColor&&(s=n.instanceColor)),s!==void 0){let r=s.normalized,o=s.itemSize,c=t.get(s);if(c===void 0)continue;let l=c.buffer,u=c.type,d=c.bytesPerElement,f=u===e.INT||u===e.UNSIGNED_INT||s.gpuType===1013;if(s.isInterleavedBufferAttribute){let t=s.data,c=t.stride,p=s.offset;if(t.isInstancedInterleavedBuffer){for(let e=0;e<i.locationSize;e++)_(i.location+e,t.meshPerAttribute);n.isInstancedMesh!==!0&&a._maxInstanceCount===void 0&&(a._maxInstanceCount=t.meshPerAttribute*t.count)}else for(let e=0;e<i.locationSize;e++)g(i.location+e);e.bindBuffer(e.ARRAY_BUFFER,l);for(let e=0;e<i.locationSize;e++)y(i.location+e,o/i.locationSize,u,r,c*d,(p+o/i.locationSize*e)*d,f)}else{if(s.isInstancedBufferAttribute){for(let e=0;e<i.locationSize;e++)_(i.location+e,s.meshPerAttribute);n.isInstancedMesh!==!0&&a._maxInstanceCount===void 0&&(a._maxInstanceCount=s.meshPerAttribute*s.count)}else for(let e=0;e<i.locationSize;e++)g(i.location+e);e.bindBuffer(e.ARRAY_BUFFER,l);for(let e=0;e<i.locationSize;e++)y(i.location+e,o/i.locationSize,u,r,o*d,o/i.locationSize*e*d,f)}}else if(c!==void 0){let t=c[r];if(t!==void 0)switch(t.length){case 2:e.vertexAttrib2fv(i.location,t);break;case 3:e.vertexAttrib3fv(i.location,t);break;case 4:e.vertexAttrib4fv(i.location,t);break;default:e.vertexAttrib1fv(i.location,t)}}}}v()}function x(){T();for(let e in r){let t=r[e];for(let e in t){let n=t[e];for(let e in n){let t=n[e];for(let e in t)u(t[e].object),delete t[e];delete n[e]}}delete r[e]}}function S(e){if(r[e.id]===void 0)return;let t=r[e.id];for(let e in t){let n=t[e];for(let e in n){let t=n[e];for(let e in t)u(t[e].object),delete t[e];delete n[e]}}delete r[e.id]}function C(e){for(let t in r){let n=r[t];for(let t in n){let r=n[t];if(r[e.id]===void 0)continue;let i=r[e.id];for(let e in i)u(i[e].object),delete i[e];delete r[e.id]}}}function w(e){for(let t in r){let n=r[t],i=e.isInstancedMesh===!0?e.id:0,a=n[i];if(a!==void 0){for(let e in a){let t=a[e];for(let e in t)u(t[e].object),delete t[e];delete a[e]}delete n[i],Object.keys(n).length===0&&delete r[t]}}}function T(){E(),o=!0,a!==i&&(a=i,l(a.object))}function E(){i.geometry=null,i.program=null,i.wireframe=!1}return{setup:s,reset:T,resetDefaultState:E,dispose:x,releaseStatesOfGeometry:S,releaseStatesOfObject:w,releaseStatesOfProgram:C,initAttributes:h,enableAttribute:g,disableUnusedAttributes:v}}function Fo(e,t,n){let r;function i(e){r=e}function a(t,i){e.drawArrays(r,t,i),n.update(i,r,1)}function o(t,i,a){a!==0&&(e.drawArraysInstanced(r,t,i,a),n.update(i,r,a))}function s(e,i,a){if(a===0)return;t.get(`WEBGL_multi_draw`).multiDrawArraysWEBGL(r,e,0,i,0,a);let o=0;for(let e=0;e<a;e++)o+=i[e];n.update(o,r,1)}this.setMode=i,this.render=a,this.renderInstances=o,this.renderMultiDraw=s}function Io(e,t,n,r){let i;function a(){if(i!==void 0)return i;if(t.has(`EXT_texture_filter_anisotropic`)===!0){let n=t.get(`EXT_texture_filter_anisotropic`);i=e.getParameter(n.MAX_TEXTURE_MAX_ANISOTROPY_EXT)}else i=0;return i}function o(t){return t===1023||r.convert(t)===e.getParameter(e.IMPLEMENTATION_COLOR_READ_FORMAT)}function s(n){let i=n===1016&&(t.has(`EXT_color_buffer_half_float`)||t.has(`EXT_color_buffer_float`));return!(n!==1009&&n!==1015&&!i&&r.convert(n)!==e.getParameter(e.IMPLEMENTATION_COLOR_READ_TYPE))}function c(t){if(t===`highp`){if(e.getShaderPrecisionFormat(e.VERTEX_SHADER,e.HIGH_FLOAT).precision>0&&e.getShaderPrecisionFormat(e.FRAGMENT_SHADER,e.HIGH_FLOAT).precision>0)return`highp`;t=`mediump`}return t===`mediump`&&e.getShaderPrecisionFormat(e.VERTEX_SHADER,e.MEDIUM_FLOAT).precision>0&&e.getShaderPrecisionFormat(e.FRAGMENT_SHADER,e.MEDIUM_FLOAT).precision>0?`mediump`:`lowp`}let l=n.precision===void 0?`highp`:n.precision,u=c(l);u!==l&&(K(`WebGLRenderer:`,l,`not supported, using`,u,`instead.`),l=u);let d=n.logarithmicDepthBuffer===!0,f=n.reversedDepthBuffer===!0&&t.has(`EXT_clip_control`);n.reversedDepthBuffer===!0&&f===!1&&K(`WebGLRenderer: Unable to use reversed depth buffer due to missing EXT_clip_control extension. Fallback to default depth buffer.`);let p=e.getParameter(e.MAX_TEXTURE_IMAGE_UNITS),m=e.getParameter(e.MAX_VERTEX_TEXTURE_IMAGE_UNITS),h=e.getParameter(e.MAX_TEXTURE_SIZE),g=e.getParameter(e.MAX_CUBE_MAP_TEXTURE_SIZE),_=e.getParameter(e.MAX_VERTEX_ATTRIBS),v=e.getParameter(e.MAX_VERTEX_UNIFORM_VECTORS),y=e.getParameter(e.MAX_VARYING_VECTORS),b=e.getParameter(e.MAX_FRAGMENT_UNIFORM_VECTORS),x=e.getParameter(e.MAX_SAMPLES),S=e.getParameter(e.SAMPLES);return{isWebGL2:!0,getMaxAnisotropy:a,getMaxPrecision:c,textureFormatReadable:o,textureTypeReadable:s,precision:l,logarithmicDepthBuffer:d,reversedDepthBuffer:f,maxTextures:p,maxVertexTextures:m,maxTextureSize:h,maxCubemapSize:g,maxAttributes:_,maxVertexUniforms:v,maxVaryings:y,maxFragmentUniforms:b,maxSamples:x,samples:S}}function Lo(e){let t=this,n=null,r=0,i=!1,a=!1,o=new Gr,s=new Ut,c={value:null,needsUpdate:!1};this.uniform=c,this.numPlanes=0,this.numIntersection=0,this.init=function(e,t){let n=e.length!==0||t||r!==0||i;return i=t,r=e.length,n},this.beginShadows=function(){a=!0,u(null)},this.endShadows=function(){a=!1},this.setGlobalState=function(e,t){n=u(e,t,0)},this.setState=function(t,o,s){let d=t.clippingPlanes,f=t.clipIntersection,p=t.clipShadows,m=e.get(t);if(!i||d===null||d.length===0||a&&!p)a?u(null):l();else{let e=a?0:r,t=e*4,i=m.clippingState||null;c.value=i,i=u(d,o,t,s);for(let e=0;e!==t;++e)i[e]=n[e];m.clippingState=i,this.numIntersection=f?this.numPlanes:0,this.numPlanes+=e}};function l(){c.value!==n&&(c.value=n,c.needsUpdate=r>0),t.numPlanes=r,t.numIntersection=0}function u(e,n,r,i){let a=e===null?0:e.length,l=null;if(a!==0){if(l=c.value,i!==!0||l===null){let t=r+a*4,i=n.matrixWorldInverse;s.getNormalMatrix(i),(l===null||l.length<t)&&(l=new Float32Array(t));for(let t=0,n=r;t!==a;++t,n+=4)o.copy(e[t]).applyMatrix4(i,s),o.normal.toArray(l,n),l[n+3]=o.constant}c.value=l,c.needsUpdate=!0}return t.numPlanes=a,t.numIntersection=0,l}}var Ro=4,zo=6,Bo=20,Vo=256,Ho=new no,Uo=new X,Wo=null,Go=0,Ko=0,qo=!1,Jo=new Y,Yo=new Y,Xo=class{constructor(e){this._renderer=e,this._pingPongRenderTarget=null,this._lodMax=0,this._cubeSize=0,this._sizeLods=[],this._lodMeshes=[],this._backgroundBox=null,this._cubemapMaterial=null,this._equirectMaterial=null,this._blurMaterial=null,this._ggxMaterial=null}fromScene(e,t=0,n=.1,r=100,i={}){let{size:a=256,position:o=Jo}=i;Wo=this._renderer.getRenderTarget(),Go=this._renderer.getActiveCubeFace(),Ko=this._renderer.getActiveMipmapLevel(),qo=this._renderer.xr.enabled,this._renderer.xr.enabled=!1,this._setSize(a);let s=this._allocateTargets();return s.depthBuffer=!0,this._sceneToCubeUV(e,n,r,s,o),t>0&&this._blur(s,0,0,t),this._applyPMREM(s),this._cleanup(s),s}fromEquirectangular(e,t=null){return this._fromTexture(e,t)}fromCubemap(e,t=null){return this._fromTexture(e,t)}compileCubemapShader(){this._cubemapMaterial===null&&(this._cubemapMaterial=rs(),this._compileMaterial(this._cubemapMaterial))}compileEquirectangularShader(){this._equirectMaterial===null&&(this._equirectMaterial=ns(),this._compileMaterial(this._equirectMaterial))}dispose(){this._dispose(),this._cubemapMaterial!==null&&this._cubemapMaterial.dispose(),this._equirectMaterial!==null&&this._equirectMaterial.dispose(),this._backgroundBox!==null&&(this._backgroundBox.geometry.dispose(),this._backgroundBox.material.dispose())}_setSize(e){this._lodMax=Math.floor(Math.log2(e)),this._cubeSize=2**this._lodMax}_dispose(){this._blurMaterial!==null&&this._blurMaterial.dispose(),this._ggxMaterial!==null&&this._ggxMaterial.dispose(),this._pingPongRenderTarget!==null&&this._pingPongRenderTarget.dispose();for(let e=0;e<this._lodMeshes.length;e++)this._lodMeshes[e].geometry.dispose()}_cleanup(e){this._renderer.setRenderTarget(Wo,Go,Ko),this._renderer.xr.enabled=qo,e.scissorTest=!1,$o(e,0,0,e.width,e.height)}_fromTexture(e,t){e.mapping===301||e.mapping===302?this._setSize(e.image.length===0?16:e.image[0].width||e.image[0].image.width):this._setSize(e.image.width/4),Wo=this._renderer.getRenderTarget(),Go=this._renderer.getActiveCubeFace(),Ko=this._renderer.getActiveMipmapLevel(),qo=this._renderer.xr.enabled,this._renderer.xr.enabled=!1;let n=t||this._allocateTargets();return this._textureToCubeUV(e,n),this._applyPMREM(n),this._cleanup(n),n}_allocateTargets(){let e=3*Math.max(this._cubeSize,112),t=4*this._cubeSize,n={magFilter:T,minFilter:T,generateMipmaps:!1,type:F,format:V,colorSpace:Xe,depthBuffer:!1},r=Qo(e,t,n);if(this._pingPongRenderTarget===null||this._pingPongRenderTarget.width!==e||this._pingPongRenderTarget.height!==t){this._pingPongRenderTarget!==null&&this._dispose(),this._pingPongRenderTarget=Qo(e,t,n);let{_lodMax:r}=this;({lodMeshes:this._lodMeshes,sizeLods:this._sizeLods}=Zo(r)),this._blurMaterial=ts(r,e,t),this._ggxMaterial=es(r,e,t)}return r}_compileMaterial(e){let t=new di(new Vr,e);this._renderer.compile(t,Ho)}_sceneToCubeUV(e,t,n,r,i){let a=new to(90,1,t,n),o=[1,-1,1,1,1,1],s=[1,1,1,-1,-1,-1],c=this._renderer,l=c.autoClear,u=c.toneMapping;c.getClearColor(Uo),c.toneMapping=0,c.autoClear=!1,c.state.buffers.depth.getReversed()&&(c.setRenderTarget(r),c.clearDepth(),c.setRenderTarget(null)),this._backgroundBox===null&&(this._backgroundBox=new di(new Li,new $r({name:`PMREM.Background`,side:1,depthWrite:!1,depthTest:!1})));let d=this._backgroundBox,f=d.material,p=!1,m=e.background;m?m.isColor&&(f.color.copy(m),e.background=null,p=!0):(f.color.copy(Uo),p=!0);for(let t=0;t<6;t++){let n=t%3;n===0?(a.up.set(0,o[t],0),a.position.set(i.x,i.y,i.z),a.lookAt(i.x+s[t],i.y,i.z)):n===1?(a.up.set(0,0,o[t]),a.position.set(i.x,i.y,i.z),a.lookAt(i.x,i.y+s[t],i.z)):(a.up.set(0,o[t],0),a.position.set(i.x,i.y,i.z),a.lookAt(i.x,i.y,i.z+s[t]));let l=this._cubeSize;$o(r,n*l,t>2?l:0,l,l),c.setRenderTarget(r),p&&c.render(d,a),c.render(e,a)}c.toneMapping=u,c.autoClear=l,e.background=m}_textureToCubeUV(e,t){let n=this._renderer,r=e.mapping===301||e.mapping===302;r?(this._cubemapMaterial===null&&(this._cubemapMaterial=rs()),this._cubemapMaterial.uniforms.flipEnvMap.value=e.isRenderTargetTexture===!1?-1:1):this._equirectMaterial===null&&(this._equirectMaterial=ns());let i=r?this._cubemapMaterial:this._equirectMaterial,a=this._lodMeshes[0];a.material=i;let o=i.uniforms;o.envMap.value=e;let s=this._cubeSize;$o(t,0,0,3*s,2*s),n.setRenderTarget(t),n.render(a,Ho)}_applyPMREM(e){let t=this._renderer,n=t.autoClear;t.autoClear=!1;let r=this._lodMeshes.length;for(let t=1;t<r;t++)this._applyGGXFilter(e,t-1,t);t.autoClear=n}_applyGGXFilter(e,t,n){let r=this._renderer,i=this._pingPongRenderTarget,a=this._ggxMaterial,o=this._lodMeshes[n];o.material=a;let s=a.uniforms,c=n/(this._lodMeshes.length-1),l=t/(this._lodMeshes.length-1),u=Math.sqrt(c*c-l*l)*(c*1.25),{_lodMax:d}=this,f=this._sizeLods[n],p=3*f*(n>d-Ro?n-d+Ro:0),m=4*(this._cubeSize-f);s.envMap.value=e.texture,s.roughness.value=u,s.mipInt.value=d-t,$o(i,p,m,3*f,2*f),r.setRenderTarget(i),r.render(o,Ho),s.envMap.value=i.texture,s.roughness.value=0,s.mipInt.value=d-n,$o(e,p,m,3*f,2*f),r.setRenderTarget(e),r.render(o,Ho)}_blur(e,t,n,r){let i=this._pingPongRenderTarget,a=Math.min(r,Math.PI)/Math.SQRT2;this._blurPass(e,i,t,n,a),this._blurPass(i,e,n,n,a)}_blurPass(e,t,n,r,i){let a=this._renderer,o=this._blurMaterial,s=this._lodMeshes[r];s.material=o;let c=o.uniforms;c.envMap.value=e.texture,c.sigma.value=i,c.mipInt.value=this._lodMax-n;let l=this._sizeLods[r];$o(t,3*l*(r>this._lodMax-Ro?r-this._lodMax+Ro:0),4*(this._cubeSize-l),3*l,2*l),a.setRenderTarget(t),a.render(s,Ho)}};function Zo(e){let t=[],n=[],r=e,i=e-Ro+1+zo;for(let e=0;e<i;e++){let e=2**r;t.push(e);let i=1/(e-2),a=-i,o=1+i,s=[a,a,o,a,o,o,a,a,o,o,a,o],c=new Float32Array(108),l=new Float32Array(108);for(let e=0;e<6;e++){let t=e%3*2/3-1,n=e>2?0:-1,r=[t,n,0,t+2/3,n,0,t+2/3,n+1,0,t,n,0,t+2/3,n+1,0,t,n+1,0];c.set(r,18*e);for(let t=0;t<6;t++){let n=s[t*2]*2-1,r=s[t*2+1]*2-1;e===0?Yo.set(1,r,n):e===1?Yo.set(-n,1,-r):e===2?Yo.set(-n,r,1):e===3?Yo.set(-1,r,-n):e===4?Yo.set(-n,-1,r):Yo.set(n,r,-1),Yo.toArray(l,(e*6+t)*3)}}let u=new Vr;u.setAttribute(`position`,new Er(c,3)),u.setAttribute(`outputDirection`,new Er(l,3)),n.push(new di(u,null)),r>Ro&&r--}return{lodMeshes:n,sizeLods:t}}function Qo(e,t,n){let r=new cn(e,t,n);return r.texture.mapping=306,r.texture.name=`PMREM.cubeUv`,r.scissorTest=!0,r}function $o(e,t,n,r,i){e.viewport.set(t,n,r,i),e.scissor.set(t,n,r,i)}function es(e,t,n){return new _a({name:`PMREMGGXConvolution`,defines:{GGX_SAMPLES:Vo,CUBEUV_TEXEL_WIDTH:1/t,CUBEUV_TEXEL_HEIGHT:1/n,CUBEUV_MAX_MIP:`${e}.0`},uniforms:{envMap:{value:null},roughness:{value:0},mipInt:{value:0}},vertexShader:is(),fragmentShader:`

			precision highp float;
			precision highp int;

			varying vec3 vOutputDirection;

			uniform sampler2D envMap;
			uniform float roughness;
			uniform float mipInt;

			#define ENVMAP_TYPE_CUBE_UV
			#include <cube_uv_reflection_fragment>

			#define PI 3.14159265359

			// Van der Corput radical inverse
			float radicalInverse_VdC(uint bits) {
				bits = (bits << 16u) | (bits >> 16u);
				bits = ((bits & 0x55555555u) << 1u) | ((bits & 0xAAAAAAAAu) >> 1u);
				bits = ((bits & 0x33333333u) << 2u) | ((bits & 0xCCCCCCCCu) >> 2u);
				bits = ((bits & 0x0F0F0F0Fu) << 4u) | ((bits & 0xF0F0F0F0u) >> 4u);
				bits = ((bits & 0x00FF00FFu) << 8u) | ((bits & 0xFF00FF00u) >> 8u);
				return float(bits) * 2.3283064365386963e-10; // / 0x100000000
			}

			// Hammersley sequence
			vec2 hammersley(uint i, uint N) {
				return vec2(float(i) / float(N), radicalInverse_VdC(i));
			}

			// GGX VNDF importance sampling (Eric Heitz 2018)
			// "Sampling the GGX Distribution of Visible Normals"
			// https://jcgt.org/published/0007/04/01/
			vec3 importanceSampleGGX_VNDF(vec2 Xi, vec3 V, float roughness) {
				float alpha = roughness * roughness;

				// Section 4.1: Orthonormal basis
				vec3 T1 = vec3(1.0, 0.0, 0.0);
				vec3 T2 = cross(V, T1);

				// Section 4.2: Parameterization of projected area
				float r = sqrt(Xi.x);
				float phi = 2.0 * PI * Xi.y;
				float t1 = r * cos(phi);
				float t2 = r * sin(phi);
				float s = 0.5 * (1.0 + V.z);
				t2 = (1.0 - s) * sqrt(1.0 - t1 * t1) + s * t2;

				// Section 4.3: Reprojection onto hemisphere
				vec3 Nh = t1 * T1 + t2 * T2 + sqrt(max(0.0, 1.0 - t1 * t1 - t2 * t2)) * V;

				// Section 3.4: Transform back to ellipsoid configuration
				return normalize(vec3(alpha * Nh.x, alpha * Nh.y, max(0.0, Nh.z)));
			}

			void main() {
				vec3 N = normalize(vOutputDirection);
				vec3 V = N; // Assume view direction equals normal for pre-filtering

				vec3 prefilteredColor = vec3(0.0);
				float totalWeight = 0.0;

				// For very low roughness, just sample the environment directly
				if (roughness < 0.001) {
					gl_FragColor = vec4(bilinearCubeUV(envMap, N, mipInt), 1.0);
					return;
				}

				// Tangent space basis for VNDF sampling
				vec3 up = abs(N.z) < 0.999 ? vec3(0.0, 0.0, 1.0) : vec3(1.0, 0.0, 0.0);
				vec3 tangent = normalize(cross(up, N));
				vec3 bitangent = cross(N, tangent);

				for(uint i = 0u; i < uint(GGX_SAMPLES); i++) {
					vec2 Xi = hammersley(i, uint(GGX_SAMPLES));

					// For PMREM, V = N, so in tangent space V is always (0, 0, 1)
					vec3 H_tangent = importanceSampleGGX_VNDF(Xi, vec3(0.0, 0.0, 1.0), roughness);

					// Transform H back to world space
					vec3 H = normalize(tangent * H_tangent.x + bitangent * H_tangent.y + N * H_tangent.z);
					vec3 L = normalize(2.0 * dot(V, H) * H - V);

					float NdotL = max(dot(N, L), 0.0);

					if(NdotL > 0.0) {
						// Sample environment at fixed mip level
						// VNDF importance sampling handles the distribution filtering
						vec3 sampleColor = bilinearCubeUV(envMap, L, mipInt);

						// Weight by NdotL for the split-sum approximation
						// VNDF PDF naturally accounts for the visible microfacet distribution
						prefilteredColor += sampleColor * NdotL;
						totalWeight += NdotL;
					}
				}

				if (totalWeight > 0.0) {
					prefilteredColor = prefilteredColor / totalWeight;
				}

				gl_FragColor = vec4(prefilteredColor, 1.0);
			}
		`,blending:0,depthTest:!1,depthWrite:!1})}function ts(e,t,n){return new _a({name:`SphericalGaussianBlur`,defines:{SAMPLES:Bo,CUBEUV_TEXEL_WIDTH:1/t,CUBEUV_TEXEL_HEIGHT:1/n,CUBEUV_MAX_MIP:`${e}.0`},uniforms:{envMap:{value:null},sigma:{value:0},mipInt:{value:0}},vertexShader:is(),fragmentShader:`

			precision highp float;
			precision highp int;

			varying vec3 vOutputDirection;

			uniform sampler2D envMap;
			uniform float sigma;
			uniform float mipInt;

			#define ENVMAP_TYPE_CUBE_UV
			#include <cube_uv_reflection_fragment>

			#define PI 3.14159265359
			#define GOLDEN_ANGLE 2.39996322973

			void main() {

				if ( sigma == 0.0 ) {

					gl_FragColor = vec4( bilinearCubeUV( envMap, vOutputDirection, mipInt ), 1.0 );
					return;

				}

				vec3 outputDirection = normalize( vOutputDirection );

				vec3 up = abs( outputDirection.z ) < 0.999 ? vec3( 0.0, 0.0, 1.0 ) : vec3( 1.0, 0.0, 0.0 );
				vec3 tangent = normalize( cross( up, outputDirection ) );
				vec3 bitangent = cross( outputDirection, tangent );

				// Truncate the kernel at three standard deviations or at the antipode.
				float thetaMax = min( 3.0 * sigma, PI );
				float truncation = 1.0 - exp( - 0.5 * thetaMax * thetaMax / ( sigma * sigma ) );

				vec3 accumColor = vec3( 0.0 );
				float accumWeight = 0.0;

				for ( int i = 0; i < SAMPLES; i ++ ) {

					// Stratified inverse-CDF sampling of the Gaussian, placed on a golden-angle spiral.
					float stratum = ( float( i ) + 0.5 ) / float( SAMPLES );
					float theta = sigma * sqrt( - 2.0 * log( 1.0 - stratum * truncation ) );
					float phi = float( i ) * GOLDEN_ANGLE;

					vec3 offset = cos( phi ) * tangent + sin( phi ) * bitangent;
					vec3 sampleDirection = cos( theta ) * outputDirection + sin( theta ) * offset;

					// Correct the planar sample density to solid angle.
					float weight = sin( theta ) / theta;

					accumColor += weight * bilinearCubeUV( envMap, sampleDirection, mipInt );
					accumWeight += weight;

				}

				gl_FragColor = vec4( accumColor / accumWeight, 1.0 );

			}
		`,blending:0,depthTest:!1,depthWrite:!1})}function ns(){return new _a({name:`EquirectangularToCubeUV`,uniforms:{envMap:{value:null}},vertexShader:is(),fragmentShader:`

			precision mediump float;
			precision mediump int;

			varying vec3 vOutputDirection;

			uniform sampler2D envMap;

			#include <common>

			void main() {

				vec3 outputDirection = normalize( vOutputDirection );
				vec2 uv = equirectUv( outputDirection );

				gl_FragColor = vec4( texture2D ( envMap, uv ).rgb, 1.0 );

			}
		`,blending:0,depthTest:!1,depthWrite:!1})}function rs(){return new _a({name:`CubemapToCubeUV`,uniforms:{envMap:{value:null},flipEnvMap:{value:-1}},vertexShader:is(),fragmentShader:`

			precision mediump float;
			precision mediump int;

			uniform float flipEnvMap;

			varying vec3 vOutputDirection;

			uniform samplerCube envMap;

			void main() {

				gl_FragColor = textureCube( envMap, vec3( flipEnvMap * vOutputDirection.x, vOutputDirection.yz ) );

			}
		`,blending:0,depthTest:!1,depthWrite:!1})}function is(){return`

		precision mediump float;
		precision mediump int;

		attribute vec3 outputDirection;

		varying vec3 vOutputDirection;

		void main() {

			vOutputDirection = outputDirection;
			gl_Position = vec4( position, 1.0 );

		}
	`}var as=class extends cn{constructor(e=1,t={}){super(e,e,t),this.isWebGLCubeRenderTarget=!0;let n={width:e,height:e,depth:1},r=[n,n,n,n,n,n];this.texture=new Mi(r),this._setTextureOptions(t),this.texture.isRenderTargetTexture=!0}fromEquirectangularTexture(e,t){this.texture.type=t.type,this.texture.colorSpace=t.colorSpace,this.texture.generateMipmaps=t.generateMipmaps,this.texture.minFilter=t.minFilter,this.texture.magFilter=t.magFilter;let n={uniforms:{tEquirect:{value:null}},vertexShader:`

				varying vec3 vWorldDirection;

				vec3 transformDirection( in vec3 dir, in mat4 matrix ) {

					return normalize( ( matrix * vec4( dir, 0.0 ) ).xyz );

				}

				void main() {

					vWorldDirection = transformDirection( position, modelMatrix );

					#include <begin_vertex>
					#include <project_vertex>

				}
			`,fragmentShader:`

				uniform sampler2D tEquirect;

				varying vec3 vWorldDirection;

				#include <common>

				void main() {

					vec3 direction = normalize( vWorldDirection );

					vec2 sampleUV = equirectUv( direction );

					gl_FragColor = texture2D( tEquirect, sampleUV );

				}
			`},r=new Li(5,5,5),i=new _a({name:`CubemapFromEquirect`,uniforms:la(n.uniforms),vertexShader:n.vertexShader,fragmentShader:n.fragmentShader,side:1,blending:0});i.uniforms.tEquirect.value=t;let a=new di(r,i),o=t.minFilter;return t.minFilter===1008&&(t.minFilter=T),new so(1,10,this).update(e,a),t.minFilter=o,a.geometry.dispose(),a.material.dispose(),this}clear(e,t=!0,n=!0,r=!0){let i=e.getRenderTarget();for(let i=0;i<6;i++)e.setRenderTarget(this,i),e.clear(t,n,r);e.setRenderTarget(i)}};function os(e){let t=new WeakMap,n=new WeakMap,r=null;function i(e,t=!1){return e==null?null:t?o(e):a(e)}function a(n){if(n&&n.isTexture){let r=n.mapping;if(r===303||r===304){if(t.has(n)){let e=t.get(n).texture;return s(e,n.mapping)}{let r=n.image;if(r&&r.height>0){let i=new as(r.height);return i.fromEquirectangularTexture(e,n),t.set(n,i),n.addEventListener(`dispose`,l),s(i.texture,n.mapping)}return null}}}return n}function o(t){if(t&&t.isTexture){let i=t.mapping,a=i===303||i===304,o=i===301||i===302;if(a||o){let i=n.get(t),s=i===void 0?0:i.texture.pmremVersion;if(t.isRenderTargetTexture&&t.pmremVersion!==s)return r===null&&(r=new Xo(e)),i=a?r.fromEquirectangular(t,i):r.fromCubemap(t,i),i.texture.pmremVersion=t.pmremVersion,n.set(t,i),i.texture;if(i!==void 0)return i.texture;{let s=t.image;return a&&s&&s.height>0||o&&s&&c(s)?(r===null&&(r=new Xo(e)),i=a?r.fromEquirectangular(t):r.fromCubemap(t),i.texture.pmremVersion=t.pmremVersion,n.set(t,i),t.addEventListener(`dispose`,u),i.texture):null}}}return t}function s(e,t){return t===303?e.mapping=301:t===304&&(e.mapping=302),e}function c(e){let t=0;for(let n=0;n<6;n++)e[n]!==void 0&&t++;return t===6}function l(e){let n=e.target;n.removeEventListener(`dispose`,l);let r=t.get(n);r!==void 0&&(t.delete(n),r.dispose())}function u(e){let t=e.target;t.removeEventListener(`dispose`,u);let r=n.get(t);r!==void 0&&(n.delete(t),r.dispose())}function d(){t=new WeakMap,n=new WeakMap,r!==null&&(r.dispose(),r=null)}return{get:i,dispose:d}}function ss(e){let t={};function n(n){if(t[n]!==void 0)return t[n];let r=e.getExtension(n);return t[n]=r,r}return{has:function(e){return n(e)!==null},init:function(){n(`EXT_color_buffer_float`),n(`WEBGL_clip_cull_distance`),n(`OES_texture_float_linear`),n(`EXT_color_buffer_half_float`),n(`WEBGL_multisampled_render_to_texture`),n(`WEBGL_render_shared_exponent`)},get:function(e){let t=n(e);return t===null&&lt(`WebGLRenderer: `+e+` extension not supported.`),t}}}function cs(e,t,n,r){let i={},a=new WeakMap;function o(e){let s=e.target;s.index!==null&&t.remove(s.index);for(let e in s.attributes)t.remove(s.attributes[e]);s.removeEventListener(`dispose`,o),delete i[s.id];let c=a.get(s);c&&(t.remove(c),a.delete(s)),r.releaseStatesOfGeometry(s),s.isInstancedBufferGeometry===!0&&delete s._maxInstanceCount,n.memory.geometries--}function s(e,t){return i[t.id]===!0?t:(t.addEventListener(`dispose`,o),i[t.id]=!0,n.memory.geometries++,t)}function c(n){let r=n.attributes;for(let n in r)t.update(r[n],e.ARRAY_BUFFER)}function l(e){let n=[],r=e.index,i=e.attributes.position,o=0;if(i===void 0)return;if(r!==null){let e=r.array;o=r.version;for(let t=0,r=e.length;t<r;t+=3){let r=e[t+0],i=e[t+1],a=e[t+2];n.push(r,i,i,a,a,r)}}else{let e=i.array;o=i.version;for(let t=0,r=e.length/3-1;t<r;t+=3){let e=t+0,r=t+1,i=t+2;n.push(e,r,r,i,i,e)}}let s=new(i.count>=65535?Or:Dr)(n,1);s.version=o;let c=a.get(e);c&&t.remove(c),a.set(e,s)}function u(e){let t=a.get(e);if(t){let n=e.index;n!==null&&t.version<n.version&&l(e)}else l(e);return a.get(e)}return{get:s,update:c,getWireframeAttribute:u}}function ls(e,t,n){let r;function i(e){r=e}let a,o;function s(e){a=e.type,o=e.bytesPerElement}function c(t,i){e.drawElements(r,i,a,t*o),n.update(i,r,1)}function l(t,i,s){s!==0&&(e.drawElementsInstanced(r,i,a,t*o,s),n.update(i,r,s))}function u(e,i,o){if(o===0)return;t.get(`WEBGL_multi_draw`).multiDrawElementsWEBGL(r,i,0,a,e,0,o);let s=0;for(let e=0;e<o;e++)s+=i[e];n.update(s,r,1)}this.setMode=i,this.setIndex=s,this.render=c,this.renderInstances=l,this.renderMultiDraw=u}function us(e){let t={geometries:0,textures:0},n={frame:0,calls:0,triangles:0,points:0,lines:0};function r(t,r,i){switch(n.calls++,r){case e.TRIANGLES:n.triangles+=t/3*i;break;case e.LINES:n.lines+=t/2*i;break;case e.LINE_STRIP:n.lines+=i*(t-1);break;case e.LINE_LOOP:n.lines+=i*t;break;case e.POINTS:n.points+=i*t;break;default:q(`WebGLInfo: Unknown draw mode:`,r)}}function i(){n.calls=0,n.triangles=0,n.points=0,n.lines=0}return{memory:t,render:n,programs:null,autoReset:!0,reset:i,update:r}}function ds(e,t,n){let r=new WeakMap,i=new on;function a(a,o,s){let c=a.morphTargetInfluences,l=o.morphAttributes.position||o.morphAttributes.normal||o.morphAttributes.color,u=l===void 0?0:l.length,d=r.get(o);if(d===void 0||d.count!==u){d!==void 0&&d.texture.dispose();let e=o.morphAttributes.position!==void 0,n=o.morphAttributes.normal!==void 0,a=o.morphAttributes.color!==void 0,s=o.morphAttributes.position||[],c=o.morphAttributes.normal||[],l=o.morphAttributes.color||[],f=0;e===!0&&(f=1),n===!0&&(f=2),a===!0&&(f=3);let p=o.attributes.position.count*f,m=1;p>t.maxTextureSize&&(m=Math.ceil(p/t.maxTextureSize),p=t.maxTextureSize);let h=new Float32Array(p*m*4*u),g=new ln(h,p,m,u);g.type=P,g.needsUpdate=!0;let _=f*4;for(let t=0;t<u;t++){let r=s[t],o=c[t],u=l[t],d=p*m*4*t;for(let t=0;t<r.count;t++){let s=t*_;e===!0&&(i.fromBufferAttribute(r,t),h[d+s+0]=i.x,h[d+s+1]=i.y,h[d+s+2]=i.z,h[d+s+3]=0),n===!0&&(i.fromBufferAttribute(o,t),h[d+s+4]=i.x,h[d+s+5]=i.y,h[d+s+6]=i.z,h[d+s+7]=0),a===!0&&(i.fromBufferAttribute(u,t),h[d+s+8]=i.x,h[d+s+9]=i.y,h[d+s+10]=i.z,h[d+s+11]=u.itemSize===4?i.w:1)}}d={count:u,texture:g,size:new J(p,m)},r.set(o,d);function v(){g.dispose(),r.delete(o),o.removeEventListener(`dispose`,v)}o.addEventListener(`dispose`,v)}if(a.isInstancedMesh===!0&&a.morphTexture!==null)s.getUniforms().setValue(e,`morphTexture`,a.morphTexture,n);else{let t=0;for(let e=0;e<c.length;e++)t+=c[e];let n=o.morphTargetsRelative?1:1-t;s.getUniforms().setValue(e,`morphTargetBaseInfluence`,n),s.getUniforms().setValue(e,`morphTargetInfluences`,c)}s.getUniforms().setValue(e,`morphTargetsTexture`,d.texture,n),s.getUniforms().setValue(e,`morphTargetsTextureSize`,d.size)}return{update:a}}function fs(e,t,n,r,i){let a=new WeakMap;function o(r){let o=i.render.frame,s=r.geometry,l=t.get(r,s);if(a.get(l)!==o&&(t.update(l),a.set(l,o)),r.isInstancedMesh&&(r.hasEventListener(`dispose`,c)===!1&&r.addEventListener(`dispose`,c),a.get(r)!==o&&(n.update(r.instanceMatrix,e.ARRAY_BUFFER),r.instanceColor!==null&&n.update(r.instanceColor,e.ARRAY_BUFFER),a.set(r,o))),r.isSkinnedMesh){let e=r.skeleton;a.get(e)!==o&&(e.update(),a.set(e,o))}return l}function s(){a=new WeakMap}function c(e){let t=e.target;t.removeEventListener(`dispose`,c),r.releaseStatesOfObject(t),n.remove(t.instanceMatrix),t.instanceColor!==null&&n.remove(t.instanceColor)}return{update:o,dispose:s}}var ps={1:`LINEAR_TONE_MAPPING`,2:`REINHARD_TONE_MAPPING`,3:`CINEON_TONE_MAPPING`,4:`ACES_FILMIC_TONE_MAPPING`,6:`AGX_TONE_MAPPING`,7:`NEUTRAL_TONE_MAPPING`,5:`CUSTOM_TONE_MAPPING`};function ms(e,t,n,r,i,a){let o=new cn(t,n,{type:e,depthBuffer:i,stencilBuffer:a,samples:r?4:0,storeMultisampledDepthBuffer:!1,storeMultisampledStencilBuffer:!1,resolveDepthBuffer:!1,resolveStencilBuffer:!1}),s=null,c=null,l=new Vr;l.setAttribute(`position`,new kr([-1,3,0,-1,-1,0,3,-1,0],3)),l.setAttribute(`uv`,new kr([0,2,0,0,2,0],2));let u=new va({uniforms:{tDiffuse:{value:null}},vertexShader:`
			precision highp float;

			uniform mat4 modelViewMatrix;
			uniform mat4 projectionMatrix;

			attribute vec3 position;
			attribute vec2 uv;

			varying vec2 vUv;

			void main() {
				vUv = uv;
				gl_Position = projectionMatrix * modelViewMatrix * vec4( position, 1.0 );
			}`,fragmentShader:`
			precision highp float;

			uniform sampler2D tDiffuse;

			varying vec2 vUv;

			#include <tonemapping_pars_fragment>
			#include <colorspace_pars_fragment>

			void main() {
				gl_FragColor = texture2D( tDiffuse, vUv );

				#ifdef LINEAR_TONE_MAPPING
					gl_FragColor.rgb = LinearToneMapping( gl_FragColor.rgb );
				#elif defined( REINHARD_TONE_MAPPING )
					gl_FragColor.rgb = ReinhardToneMapping( gl_FragColor.rgb );
				#elif defined( CINEON_TONE_MAPPING )
					gl_FragColor.rgb = CineonToneMapping( gl_FragColor.rgb );
				#elif defined( ACES_FILMIC_TONE_MAPPING )
					gl_FragColor.rgb = ACESFilmicToneMapping( gl_FragColor.rgb );
				#elif defined( AGX_TONE_MAPPING )
					gl_FragColor.rgb = AgXToneMapping( gl_FragColor.rgb );
				#elif defined( NEUTRAL_TONE_MAPPING )
					gl_FragColor.rgb = NeutralToneMapping( gl_FragColor.rgb );
				#elif defined( CUSTOM_TONE_MAPPING )
					gl_FragColor.rgb = CustomToneMapping( gl_FragColor.rgb );
				#endif

				#ifdef SRGB_TRANSFER
					gl_FragColor = sRGBTransferOETF( gl_FragColor );
				#endif
			}`,depthTest:!1,depthWrite:!1}),d=new di(l,u),f=new no(-1,1,1,-1,0,1),p=null,m=null,h=!1,g,_=null,v=[],y=!1;this.setSize=function(e,t){o.setSize(e,t),s!==null&&s.setSize(e,t),c!==null&&c.setSize(e,t);for(let n=0;n<v.length;n++){let r=v[n];r.setSize&&r.setSize(e,t)}},this.setEffects=function(e){v=e,y=v.length>0&&v[0].isRenderPass===!0;let t=o.width,n=o.height;v.length>0&&s===null&&(s=new cn(t,n,{type:F,depthBuffer:!1,stencilBuffer:!1}),c=new cn(t,n,{type:F,depthBuffer:!1,stencilBuffer:!1}));for(let e=0;e<v.length;e++){let r=v[e];r.setSize&&r.setSize(t,n)}},this.begin=function(e,t){if(h||e.toneMapping===0&&v.length===0)return!1;if(_=t,t!==null){let e=t.width,n=t.height;(o.width!==e||o.height!==n)&&this.setSize(e,n)}return y===!1&&e.setRenderTarget(o),g=e.toneMapping,e.toneMapping=0,!0},this.hasRenderPass=function(){return y},this.end=function(e,t){e.toneMapping=g,h=!0;let n=o,r=s;for(let i=0;i<v.length;i++){let a=v[i];a.enabled!==!1&&(a.render(e,r,n,t),a.needsSwap!==!1&&(n=r,r=r===s?c:s))}if(p!==e.outputColorSpace||m!==e.toneMapping){p=e.outputColorSpace,m=e.toneMapping,u.defines={},Jt.getTransfer(p)===`srgb`&&(u.defines.SRGB_TRANSFER=``);let t=ps[m];t&&(u.defines[t]=``),u.needsUpdate=!0}u.uniforms.tDiffuse.value=n.texture,e.setRenderTarget(_),e.render(d,f),_=null,h=!1},this.isCompositing=function(){return h},this.dispose=function(){o.dispose(),s!==null&&s.dispose(),c!==null&&c.dispose(),l.dispose(),u.dispose()}}var hs=new an,gs=new Pi(1,1),_s=new ln,vs=new un,ys=new Mi,bs=[],xs=[],Ss=new Float32Array(16),Cs=new Float32Array(9),ws=new Float32Array(4);function Ts(e,t,n){let r=e[0];if(r<=0||r>0)return e;let i=t*n,a=bs[i];if(a===void 0&&(a=new Float32Array(i),bs[i]=a),t!==0){r.toArray(a,0);for(let r=1,i=0;r!==t;++r)i+=n,e[r].toArray(a,i)}return a}function Es(e,t){if(e.length!==t.length)return!1;for(let n=0,r=e.length;n<r;n++)if(e[n]!==t[n])return!1;return!0}function Ds(e,t){for(let n=0,r=t.length;n<r;n++)e[n]=t[n]}function Os(e,t){let n=xs[t];n===void 0&&(n=new Int32Array(t),xs[t]=n);for(let r=0;r!==t;++r)n[r]=e.allocateTextureUnit();return n}function ks(e,t){let n=this.cache;n[0]!==t&&(e.uniform1f(this.addr,t),n[0]=t)}function As(e,t){let n=this.cache;if(t.x!==void 0)(n[0]!==t.x||n[1]!==t.y)&&(e.uniform2f(this.addr,t.x,t.y),n[0]=t.x,n[1]=t.y);else{if(Es(n,t))return;e.uniform2fv(this.addr,t),Ds(n,t)}}function js(e,t){let n=this.cache;if(t.x!==void 0)(n[0]!==t.x||n[1]!==t.y||n[2]!==t.z)&&(e.uniform3f(this.addr,t.x,t.y,t.z),n[0]=t.x,n[1]=t.y,n[2]=t.z);else if(t.r!==void 0)(n[0]!==t.r||n[1]!==t.g||n[2]!==t.b)&&(e.uniform3f(this.addr,t.r,t.g,t.b),n[0]=t.r,n[1]=t.g,n[2]=t.b);else{if(Es(n,t))return;e.uniform3fv(this.addr,t),Ds(n,t)}}function Ms(e,t){let n=this.cache;if(t.x!==void 0)(n[0]!==t.x||n[1]!==t.y||n[2]!==t.z||n[3]!==t.w)&&(e.uniform4f(this.addr,t.x,t.y,t.z,t.w),n[0]=t.x,n[1]=t.y,n[2]=t.z,n[3]=t.w);else{if(Es(n,t))return;e.uniform4fv(this.addr,t),Ds(n,t)}}function Ns(e,t){let n=this.cache,r=t.elements;if(r===void 0){if(Es(n,t))return;e.uniformMatrix2fv(this.addr,!1,t),Ds(n,t)}else{if(Es(n,r))return;ws.set(r),e.uniformMatrix2fv(this.addr,!1,ws),Ds(n,r)}}function Ps(e,t){let n=this.cache,r=t.elements;if(r===void 0){if(Es(n,t))return;e.uniformMatrix3fv(this.addr,!1,t),Ds(n,t)}else{if(Es(n,r))return;Cs.set(r),e.uniformMatrix3fv(this.addr,!1,Cs),Ds(n,r)}}function Fs(e,t){let n=this.cache,r=t.elements;if(r===void 0){if(Es(n,t))return;e.uniformMatrix4fv(this.addr,!1,t),Ds(n,t)}else{if(Es(n,r))return;Ss.set(r),e.uniformMatrix4fv(this.addr,!1,Ss),Ds(n,r)}}function Is(e,t){let n=this.cache;n[0]!==t&&(e.uniform1i(this.addr,t),n[0]=t)}function Ls(e,t){let n=this.cache;if(t.x!==void 0)(n[0]!==t.x||n[1]!==t.y)&&(e.uniform2i(this.addr,t.x,t.y),n[0]=t.x,n[1]=t.y);else{if(Es(n,t))return;e.uniform2iv(this.addr,t),Ds(n,t)}}function Rs(e,t){let n=this.cache;if(t.x!==void 0)(n[0]!==t.x||n[1]!==t.y||n[2]!==t.z)&&(e.uniform3i(this.addr,t.x,t.y,t.z),n[0]=t.x,n[1]=t.y,n[2]=t.z);else{if(Es(n,t))return;e.uniform3iv(this.addr,t),Ds(n,t)}}function zs(e,t){let n=this.cache;if(t.x!==void 0)(n[0]!==t.x||n[1]!==t.y||n[2]!==t.z||n[3]!==t.w)&&(e.uniform4i(this.addr,t.x,t.y,t.z,t.w),n[0]=t.x,n[1]=t.y,n[2]=t.z,n[3]=t.w);else{if(Es(n,t))return;e.uniform4iv(this.addr,t),Ds(n,t)}}function Bs(e,t){let n=this.cache;n[0]!==t&&(e.uniform1ui(this.addr,t),n[0]=t)}function Vs(e,t){let n=this.cache;if(t.x!==void 0)(n[0]!==t.x||n[1]!==t.y)&&(e.uniform2ui(this.addr,t.x,t.y),n[0]=t.x,n[1]=t.y);else{if(Es(n,t))return;e.uniform2uiv(this.addr,t),Ds(n,t)}}function Hs(e,t){let n=this.cache;if(t.x!==void 0)(n[0]!==t.x||n[1]!==t.y||n[2]!==t.z)&&(e.uniform3ui(this.addr,t.x,t.y,t.z),n[0]=t.x,n[1]=t.y,n[2]=t.z);else{if(Es(n,t))return;e.uniform3uiv(this.addr,t),Ds(n,t)}}function Us(e,t){let n=this.cache;if(t.x!==void 0)(n[0]!==t.x||n[1]!==t.y||n[2]!==t.z||n[3]!==t.w)&&(e.uniform4ui(this.addr,t.x,t.y,t.z,t.w),n[0]=t.x,n[1]=t.y,n[2]=t.z,n[3]=t.w);else{if(Es(n,t))return;e.uniform4uiv(this.addr,t),Ds(n,t)}}function Ws(e,t,n){let r=this.cache,i=n.allocateTextureUnit();r[0]!==i&&(e.uniform1i(this.addr,i),r[0]=i);let a;this.type===e.SAMPLER_2D_SHADOW?(gs.compareFunction=n.isReversedDepthBuffer()?518:515,a=gs):a=hs,n.setTexture2D(t||a,i)}function Gs(e,t,n){let r=this.cache,i=n.allocateTextureUnit();r[0]!==i&&(e.uniform1i(this.addr,i),r[0]=i),n.setTexture3D(t||vs,i)}function Ks(e,t,n){let r=this.cache,i=n.allocateTextureUnit();r[0]!==i&&(e.uniform1i(this.addr,i),r[0]=i),n.setTextureCube(t||ys,i)}function qs(e,t,n){let r=this.cache,i=n.allocateTextureUnit();r[0]!==i&&(e.uniform1i(this.addr,i),r[0]=i),n.setTexture2DArray(t||_s,i)}function Js(e){switch(e){case 5126:return ks;case 35664:return As;case 35665:return js;case 35666:return Ms;case 35674:return Ns;case 35675:return Ps;case 35676:return Fs;case 5124:case 35670:return Is;case 35667:case 35671:return Ls;case 35668:case 35672:return Rs;case 35669:case 35673:return zs;case 5125:return Bs;case 36294:return Vs;case 36295:return Hs;case 36296:return Us;case 35678:case 36198:case 36298:case 36306:case 35682:return Ws;case 35679:case 36299:case 36307:return Gs;case 35680:case 36300:case 36308:case 36293:return Ks;case 36289:case 36303:case 36311:case 36292:return qs}}function Ys(e,t){e.uniform1fv(this.addr,t)}function Xs(e,t){let n=Ts(t,this.size,2);e.uniform2fv(this.addr,n)}function Zs(e,t){let n=Ts(t,this.size,3);e.uniform3fv(this.addr,n)}function Qs(e,t){let n=Ts(t,this.size,4);e.uniform4fv(this.addr,n)}function $s(e,t){let n=Ts(t,this.size,4);e.uniformMatrix2fv(this.addr,!1,n)}function ec(e,t){let n=Ts(t,this.size,9);e.uniformMatrix3fv(this.addr,!1,n)}function tc(e,t){let n=Ts(t,this.size,16);e.uniformMatrix4fv(this.addr,!1,n)}function nc(e,t){e.uniform1iv(this.addr,t)}function rc(e,t){e.uniform2iv(this.addr,t)}function ic(e,t){e.uniform3iv(this.addr,t)}function ac(e,t){e.uniform4iv(this.addr,t)}function oc(e,t){e.uniform1uiv(this.addr,t)}function sc(e,t){e.uniform2uiv(this.addr,t)}function cc(e,t){e.uniform3uiv(this.addr,t)}function lc(e,t){e.uniform4uiv(this.addr,t)}function uc(e,t,n){let r=this.cache,i=t.length,a=Os(n,i);Es(r,a)||(e.uniform1iv(this.addr,a),Ds(r,a));let o;o=this.type===e.SAMPLER_2D_SHADOW?gs:hs;for(let e=0;e!==i;++e)n.setTexture2D(t[e]||o,a[e])}function dc(e,t,n){let r=this.cache,i=t.length,a=Os(n,i);Es(r,a)||(e.uniform1iv(this.addr,a),Ds(r,a));for(let e=0;e!==i;++e)n.setTexture3D(t[e]||vs,a[e])}function fc(e,t,n){let r=this.cache,i=t.length,a=Os(n,i);Es(r,a)||(e.uniform1iv(this.addr,a),Ds(r,a));for(let e=0;e!==i;++e)n.setTextureCube(t[e]||ys,a[e])}function pc(e,t,n){let r=this.cache,i=t.length,a=Os(n,i);Es(r,a)||(e.uniform1iv(this.addr,a),Ds(r,a));for(let e=0;e!==i;++e)n.setTexture2DArray(t[e]||_s,a[e])}function mc(e){switch(e){case 5126:return Ys;case 35664:return Xs;case 35665:return Zs;case 35666:return Qs;case 35674:return $s;case 35675:return ec;case 35676:return tc;case 5124:case 35670:return nc;case 35667:case 35671:return rc;case 35668:case 35672:return ic;case 35669:case 35673:return ac;case 5125:return oc;case 36294:return sc;case 36295:return cc;case 36296:return lc;case 35678:case 36198:case 36298:case 36306:case 35682:return uc;case 35679:case 36299:case 36307:return dc;case 35680:case 36300:case 36308:case 36293:return fc;case 36289:case 36303:case 36311:case 36292:return pc}}var hc=class{constructor(e,t,n){this.id=e,this.addr=n,this.cache=[],this.type=t.type,this.setValue=Js(t.type)}},gc=class{constructor(e,t,n){this.id=e,this.addr=n,this.cache=[],this.type=t.type,this.size=t.size,this.setValue=mc(t.type)}},_c=class{constructor(e){this.id=e,this.seq=[],this.map={}}setValue(e,t,n){let r=this.seq;for(let i=0,a=r.length;i!==a;++i){let a=r[i];a.setValue(e,t[a.id],n)}}},vc=/(\w+)(\])?(\[|\.)?/g;function yc(e,t){e.seq.push(t),e.map[t.id]=t}function bc(e,t,n){let r=e.name,i=r.length;for(vc.lastIndex=0;;){let a=vc.exec(r),o=vc.lastIndex,s=a[1],c=a[2]===`]`,l=a[3];if(c&&(s|=0),l===void 0||l===`[`&&o+2===i){yc(n,l===void 0?new hc(s,e,t):new gc(s,e,t));break}{let e=n.map[s];e===void 0&&(e=new _c(s),yc(n,e)),n=e}}}var xc=class{constructor(e,t){this.seq=[],this.map={};let n=e.getProgramParameter(t,e.ACTIVE_UNIFORMS);for(let r=0;r<n;++r){let n=e.getActiveUniform(t,r);bc(n,e.getUniformLocation(t,n.name),this)}let r=[],i=[];for(let t of this.seq)t.type===e.SAMPLER_2D_SHADOW||t.type===e.SAMPLER_CUBE_SHADOW||t.type===e.SAMPLER_2D_ARRAY_SHADOW?r.push(t):i.push(t);r.length>0&&(this.seq=r.concat(i))}setValue(e,t,n,r){let i=this.map[t];i!==void 0&&i.setValue(e,n,r)}setOptional(e,t,n){let r=t[n];r!==void 0&&this.setValue(e,n,r)}static upload(e,t,n,r){for(let i=0,a=t.length;i!==a;++i){let a=t[i],o=n[a.id];o.needsUpdate!==!1&&a.setValue(e,o.value,r)}}static seqWithValue(e,t){let n=[];for(let r=0,i=e.length;r!==i;++r){let i=e[r];i.id in t&&n.push(i)}return n}};function Sc(e,t,n){let r=e.createShader(t);return e.shaderSource(r,n),e.compileShader(r),r}var Cc=37297,wc=0;function Tc(e,t){let n=e.split(`
`),r=[],i=Math.max(t-6,0),a=Math.min(t+6,n.length);for(let e=i;e<a;e++){let i=e+1;r.push(`${i===t?`>`:` `} ${i}: ${n[e]}`)}return r.join(`
`)}var Ec=new Ut;function Dc(e){Jt._getMatrix(Ec,Jt.workingColorSpace,e);let t=`mat3( ${Ec.elements.map(e=>e.toFixed(4))} )`;switch(Jt.getTransfer(e)){case Ze:return[t,`LinearTransferOETF`];case Qe:return[t,`sRGBTransferOETF`];default:return K(`WebGLProgram: Unsupported color space: `,e),[t,`LinearTransferOETF`]}}function Oc(e,t,n){let r=e.getShaderParameter(t,e.COMPILE_STATUS),i=(e.getShaderInfoLog(t)||``).trim();if(r&&i===``)return``;let a=/ERROR: 0:(\d+)/.exec(i);if(a){let r=parseInt(a[1]);return n.toUpperCase()+`

`+i+`

`+Tc(e.getShaderSource(t),r)}return i}function kc(e,t){let n=Dc(t);return[`vec4 ${e}( vec4 value ) {`,`	return ${n[1]}( vec4( value.rgb * ${n[0]}, value.a ) );`,`}`].join(`
`)}var Ac={1:`Linear`,2:`Reinhard`,3:`Cineon`,4:`ACESFilmic`,6:`AgX`,7:`Neutral`,5:`Custom`};function jc(e,t){let n=Ac[t];return n===void 0?(K(`WebGLProgram: Unsupported toneMapping:`,t),`vec3 `+e+`( vec3 color ) { return LinearToneMapping( color ); }`):`vec3 `+e+`( vec3 color ) { return `+n+`ToneMapping( color ); }`}var Mc=new Y;function Nc(){return Jt.getLuminanceCoefficients(Mc),[`float luminance( const in vec3 rgb ) {`,`	const vec3 weights = vec3( ${Mc.x.toFixed(4)}, ${Mc.y.toFixed(4)}, ${Mc.z.toFixed(4)} );`,`	return dot( weights, rgb );`,`}`].join(`
`)}function Pc(e){return[e.extensionClipCullDistance?`#extension GL_ANGLE_clip_cull_distance : require`:``,e.extensionMultiDraw?`#extension GL_ANGLE_multi_draw : require`:``].filter(Lc).join(`
`)}function Fc(e){let t=[];for(let n in e){let r=e[n];r!==!1&&t.push(`#define `+n+` `+r)}return t.join(`
`)}function Ic(e,t){let n={},r=e.getProgramParameter(t,e.ACTIVE_ATTRIBUTES);for(let i=0;i<r;i++){let r=e.getActiveAttrib(t,i),a=r.name,o=1;r.type===e.FLOAT_MAT2&&(o=2),r.type===e.FLOAT_MAT3&&(o=3),r.type===e.FLOAT_MAT4&&(o=4),n[a]={type:r.type,location:e.getAttribLocation(t,a),locationSize:o}}return n}function Lc(e){return e!==``}function Rc(e,t){let n=t.numSpotLightShadows+t.numSpotLightMaps-t.numSpotLightShadowsWithMaps;return e.replace(/NUM_SUN_LIGHTS/g,t.numSunLights).replace(/NUM_DIR_LIGHTS/g,t.numDirLights).replace(/NUM_SPOT_LIGHTS/g,t.numSpotLights).replace(/NUM_SPOT_LIGHT_MAPS/g,t.numSpotLightMaps).replace(/NUM_SPOT_LIGHT_COORDS/g,n).replace(/NUM_RECT_AREA_LIGHTS/g,t.numRectAreaLights).replace(/NUM_POINT_LIGHTS/g,t.numPointLights).replace(/NUM_HEMI_LIGHTS/g,t.numHemiLights).replace(/NUM_SUN_LIGHT_SHADOWS/g,t.numSunLightShadows).replace(/NUM_DIR_LIGHT_SHADOWS/g,t.numDirLightShadows).replace(/NUM_SPOT_LIGHT_SHADOWS_WITH_MAPS/g,t.numSpotLightShadowsWithMaps).replace(/NUM_SPOT_LIGHT_SHADOWS/g,t.numSpotLightShadows).replace(/NUM_POINT_LIGHT_SHADOWS/g,t.numPointLightShadows)}function zc(e,t){return e.replace(/NUM_CLIPPING_PLANES/g,t.numClippingPlanes).replace(/UNION_CLIPPING_PLANES/g,t.numClippingPlanes-t.numClipIntersection)}var Bc=/^[ \t]*#include +<([\w\d./]+)>/gm;function Vc(e){return e.replace(Bc,Uc)}var Hc=new Map;function Uc(e,t){let n=Oo[t];if(n===void 0){let e=Hc.get(t);if(e!==void 0)n=Oo[e],K(`WebGLRenderer: Shader chunk "%s" has been deprecated. Use "%s" instead.`,t,e);else throw Error(`THREE.WebGLProgram: Can not resolve #include <`+t+`>`)}return Vc(n)}var Wc=/#pragma unroll_loop_start\s+for\s*\(\s*int\s+i\s*=\s*(\d+)\s*;\s*i\s*<\s*(\d+)\s*;\s*i\s*\+\+\s*\)\s*{([\s\S]+?)}\s+#pragma unroll_loop_end/g;function Gc(e){return e.replace(Wc,Kc)}function Kc(e,t,n,r){let i=``;for(let e=parseInt(t);e<parseInt(n);e++)i+=r.replace(/\[\s*i\s*\]/g,`[ `+e+` ]`).replace(/UNROLLED_LOOP_INDEX/g,e);return i}function qc(e){let t=`precision ${e.precision} float;
	precision ${e.precision} int;
	precision ${e.precision} sampler2D;
	precision ${e.precision} samplerCube;
	precision ${e.precision} sampler3D;
	precision ${e.precision} sampler2DArray;
	precision ${e.precision} sampler2DShadow;
	precision ${e.precision} samplerCubeShadow;
	precision ${e.precision} sampler2DArrayShadow;
	precision ${e.precision} isampler2D;
	precision ${e.precision} isampler3D;
	precision ${e.precision} isamplerCube;
	precision ${e.precision} isampler2DArray;
	precision ${e.precision} usampler2D;
	precision ${e.precision} usampler3D;
	precision ${e.precision} usamplerCube;
	precision ${e.precision} usampler2DArray;
	`;return e.precision===`highp`?t+=`
#define HIGH_PRECISION`:e.precision===`mediump`?t+=`
#define MEDIUM_PRECISION`:e.precision===`lowp`&&(t+=`
#define LOW_PRECISION`),t}var Jc={1:`SHADOWMAP_TYPE_PCF`,3:`SHADOWMAP_TYPE_VSM`};function Yc(e){return Jc[e.shadowMapType]||`SHADOWMAP_TYPE_BASIC`}var Xc={301:`ENVMAP_TYPE_CUBE`,302:`ENVMAP_TYPE_CUBE`,306:`ENVMAP_TYPE_CUBE_UV`};function Zc(e){return e.envMap===!1?`ENVMAP_TYPE_CUBE`:Xc[e.envMapMode]||`ENVMAP_TYPE_CUBE`}var Qc={302:`ENVMAP_MODE_REFRACTION`};function $c(e){return e.envMap===!1?`ENVMAP_MODE_REFLECTION`:Qc[e.envMapMode]||`ENVMAP_MODE_REFLECTION`}var el={0:`ENVMAP_BLENDING_MULTIPLY`,1:`ENVMAP_BLENDING_MIX`,2:`ENVMAP_BLENDING_ADD`};function tl(e){return e.envMap===!1?`ENVMAP_BLENDING_NONE`:el[e.combine]||`ENVMAP_BLENDING_NONE`}function nl(e){let t=e.envMapCubeUVHeight;if(t===null)return null;let n=Math.log2(t)-2,r=1/t;return{texelWidth:1/(3*Math.max(2**n,112)),texelHeight:r,maxMip:n}}function rl(e,t,n,r){let i=e.getContext(),a=n.defines,o=n.vertexShader,s=n.fragmentShader,c=Yc(n),l=Zc(n),u=$c(n),d=tl(n),f=nl(n),p=Pc(n),m=Fc(a),h=i.createProgram(),g,_,v=n.glslVersion?`#version `+n.glslVersion+`
`:``;n.isRawShaderMaterial?(g=[`#define SHADER_TYPE `+n.shaderType,`#define SHADER_NAME `+n.shaderName,m].filter(Lc).join(`
`),g.length>0&&(g+=`
`),_=[`#define SHADER_TYPE `+n.shaderType,`#define SHADER_NAME `+n.shaderName,m].filter(Lc).join(`
`),_.length>0&&(_+=`
`)):(g=[qc(n),`#define SHADER_TYPE `+n.shaderType,`#define SHADER_NAME `+n.shaderName,m,n.extensionClipCullDistance?`#define USE_CLIP_DISTANCE`:``,n.batching?`#define USE_BATCHING`:``,n.batchingColor?`#define USE_BATCHING_COLOR`:``,n.instancing?`#define USE_INSTANCING`:``,n.instancingColor?`#define USE_INSTANCING_COLOR`:``,n.instancingMorph?`#define USE_INSTANCING_MORPH`:``,n.useFog&&n.fog?`#define USE_FOG`:``,n.useFog&&n.fogExp2?`#define FOG_EXP2`:``,n.map?`#define USE_MAP`:``,n.envMap?`#define USE_ENVMAP`:``,n.envMap?`#define `+u:``,n.lightMap?`#define USE_LIGHTMAP`:``,n.aoMap?`#define USE_AOMAP`:``,n.bumpMap?`#define USE_BUMPMAP`:``,n.normalMap?`#define USE_NORMALMAP`:``,n.normalMapObjectSpace?`#define USE_NORMALMAP_OBJECTSPACE`:``,n.normalMapTangentSpace?`#define USE_NORMALMAP_TANGENTSPACE`:``,n.displacementMap?`#define USE_DISPLACEMENTMAP`:``,n.emissiveMap?`#define USE_EMISSIVEMAP`:``,n.anisotropy?`#define USE_ANISOTROPY`:``,n.anisotropyMap?`#define USE_ANISOTROPYMAP`:``,n.clearcoatMap?`#define USE_CLEARCOATMAP`:``,n.clearcoatRoughnessMap?`#define USE_CLEARCOAT_ROUGHNESSMAP`:``,n.clearcoatNormalMap?`#define USE_CLEARCOAT_NORMALMAP`:``,n.iridescenceMap?`#define USE_IRIDESCENCEMAP`:``,n.iridescenceThicknessMap?`#define USE_IRIDESCENCE_THICKNESSMAP`:``,n.specularMap?`#define USE_SPECULARMAP`:``,n.specularColorMap?`#define USE_SPECULAR_COLORMAP`:``,n.specularIntensityMap?`#define USE_SPECULAR_INTENSITYMAP`:``,n.roughnessMap?`#define USE_ROUGHNESSMAP`:``,n.metalnessMap?`#define USE_METALNESSMAP`:``,n.alphaMap?`#define USE_ALPHAMAP`:``,n.alphaHash?`#define USE_ALPHAHASH`:``,n.transmission?`#define USE_TRANSMISSION`:``,n.transmissionMap?`#define USE_TRANSMISSIONMAP`:``,n.thicknessMap?`#define USE_THICKNESSMAP`:``,n.sheenColorMap?`#define USE_SHEEN_COLORMAP`:``,n.sheenRoughnessMap?`#define USE_SHEEN_ROUGHNESSMAP`:``,n.mapUv?`#define MAP_UV `+n.mapUv:``,n.alphaMapUv?`#define ALPHAMAP_UV `+n.alphaMapUv:``,n.lightMapUv?`#define LIGHTMAP_UV `+n.lightMapUv:``,n.aoMapUv?`#define AOMAP_UV `+n.aoMapUv:``,n.emissiveMapUv?`#define EMISSIVEMAP_UV `+n.emissiveMapUv:``,n.bumpMapUv?`#define BUMPMAP_UV `+n.bumpMapUv:``,n.normalMapUv?`#define NORMALMAP_UV `+n.normalMapUv:``,n.displacementMapUv?`#define DISPLACEMENTMAP_UV `+n.displacementMapUv:``,n.metalnessMapUv?`#define METALNESSMAP_UV `+n.metalnessMapUv:``,n.roughnessMapUv?`#define ROUGHNESSMAP_UV `+n.roughnessMapUv:``,n.anisotropyMapUv?`#define ANISOTROPYMAP_UV `+n.anisotropyMapUv:``,n.clearcoatMapUv?`#define CLEARCOATMAP_UV `+n.clearcoatMapUv:``,n.clearcoatNormalMapUv?`#define CLEARCOAT_NORMALMAP_UV `+n.clearcoatNormalMapUv:``,n.clearcoatRoughnessMapUv?`#define CLEARCOAT_ROUGHNESSMAP_UV `+n.clearcoatRoughnessMapUv:``,n.iridescenceMapUv?`#define IRIDESCENCEMAP_UV `+n.iridescenceMapUv:``,n.iridescenceThicknessMapUv?`#define IRIDESCENCE_THICKNESSMAP_UV `+n.iridescenceThicknessMapUv:``,n.sheenColorMapUv?`#define SHEEN_COLORMAP_UV `+n.sheenColorMapUv:``,n.sheenRoughnessMapUv?`#define SHEEN_ROUGHNESSMAP_UV `+n.sheenRoughnessMapUv:``,n.specularMapUv?`#define SPECULARMAP_UV `+n.specularMapUv:``,n.specularColorMapUv?`#define SPECULAR_COLORMAP_UV `+n.specularColorMapUv:``,n.specularIntensityMapUv?`#define SPECULAR_INTENSITYMAP_UV `+n.specularIntensityMapUv:``,n.transmissionMapUv?`#define TRANSMISSIONMAP_UV `+n.transmissionMapUv:``,n.thicknessMapUv?`#define THICKNESSMAP_UV `+n.thicknessMapUv:``,n.vertexTangents&&n.flatShading===!1?`#define USE_TANGENT`:``,n.vertexNormals?`#define HAS_NORMAL`:``,n.vertexColors?`#define USE_COLOR`:``,n.vertexAlphas?`#define USE_COLOR_ALPHA`:``,n.vertexUv1s?`#define USE_UV1`:``,n.vertexUv2s?`#define USE_UV2`:``,n.vertexUv3s?`#define USE_UV3`:``,n.pointsUvs?`#define USE_POINTS_UV`:``,n.flatShading?`#define FLAT_SHADED`:``,n.skinning?`#define USE_SKINNING`:``,n.morphTargets?`#define USE_MORPHTARGETS`:``,n.morphNormals&&n.flatShading===!1?`#define USE_MORPHNORMALS`:``,n.morphColors?`#define USE_MORPHCOLORS`:``,n.morphTargetsCount>0?`#define MORPHTARGETS_TEXTURE_STRIDE `+n.morphTextureStride:``,n.morphTargetsCount>0?`#define MORPHTARGETS_COUNT `+n.morphTargetsCount:``,n.doubleSided?`#define DOUBLE_SIDED`:``,n.flipSided?`#define FLIP_SIDED`:``,n.shadowMapEnabled?`#define USE_SHADOWMAP`:``,n.shadowMapEnabled?`#define `+c:``,n.sizeAttenuation?`#define USE_SIZEATTENUATION`:``,n.numLightProbes>0?`#define USE_LIGHT_PROBES`:``,n.logarithmicDepthBuffer?`#define USE_LOGARITHMIC_DEPTH_BUFFER`:``,n.reversedDepthBuffer?`#define USE_REVERSED_DEPTH_BUFFER`:``,`uniform mat4 modelMatrix;`,`uniform mat4 modelViewMatrix;`,`uniform mat4 projectionMatrix;`,`uniform mat4 viewMatrix;`,`uniform mat3 normalMatrix;`,`uniform vec3 cameraPosition;`,`uniform bool isOrthographic;`,`#ifdef USE_INSTANCING`,`	attribute mat4 instanceMatrix;`,`#endif`,`#ifdef USE_INSTANCING_COLOR`,`	attribute vec3 instanceColor;`,`#endif`,`#ifdef USE_INSTANCING_MORPH`,`	uniform sampler2D morphTexture;`,`#endif`,`attribute vec3 position;`,`attribute vec3 normal;`,`attribute vec2 uv;`,`#ifdef USE_UV1`,`	attribute vec2 uv1;`,`#endif`,`#ifdef USE_UV2`,`	attribute vec2 uv2;`,`#endif`,`#ifdef USE_UV3`,`	attribute vec2 uv3;`,`#endif`,`#ifdef USE_TANGENT`,`	attribute vec4 tangent;`,`#endif`,`#if defined( USE_COLOR_ALPHA )`,`	attribute vec4 color;`,`#elif defined( USE_COLOR )`,`	attribute vec3 color;`,`#endif`,`#ifdef USE_SKINNING`,`	attribute vec4 skinIndex;`,`	attribute vec4 skinWeight;`,`#endif`,`
`].filter(Lc).join(`
`),_=[qc(n),`#define SHADER_TYPE `+n.shaderType,`#define SHADER_NAME `+n.shaderName,m,n.useFog&&n.fog?`#define USE_FOG`:``,n.useFog&&n.fogExp2?`#define FOG_EXP2`:``,n.alphaToCoverage?`#define ALPHA_TO_COVERAGE`:``,n.map?`#define USE_MAP`:``,n.matcap?`#define USE_MATCAP`:``,n.envMap?`#define USE_ENVMAP`:``,n.envMap?`#define `+l:``,n.envMap?`#define `+u:``,n.envMap?`#define `+d:``,f?`#define CUBEUV_TEXEL_WIDTH `+f.texelWidth:``,f?`#define CUBEUV_TEXEL_HEIGHT `+f.texelHeight:``,f?`#define CUBEUV_MAX_MIP `+f.maxMip+`.0`:``,n.lightMap?`#define USE_LIGHTMAP`:``,n.aoMap?`#define USE_AOMAP`:``,n.bumpMap?`#define USE_BUMPMAP`:``,n.normalMap?`#define USE_NORMALMAP`:``,n.normalMapObjectSpace?`#define USE_NORMALMAP_OBJECTSPACE`:``,n.normalMapTangentSpace?`#define USE_NORMALMAP_TANGENTSPACE`:``,n.packedNormalMap?`#define USE_PACKED_NORMALMAP`:``,n.emissiveMap?`#define USE_EMISSIVEMAP`:``,n.anisotropy?`#define USE_ANISOTROPY`:``,n.anisotropyMap?`#define USE_ANISOTROPYMAP`:``,n.clearcoat?`#define USE_CLEARCOAT`:``,n.clearcoatMap?`#define USE_CLEARCOATMAP`:``,n.clearcoatRoughnessMap?`#define USE_CLEARCOAT_ROUGHNESSMAP`:``,n.clearcoatNormalMap?`#define USE_CLEARCOAT_NORMALMAP`:``,n.dispersion?`#define USE_DISPERSION`:``,n.retroreflection?`#define USE_RETROREFLECTION`:``,n.iridescence?`#define USE_IRIDESCENCE`:``,n.iridescenceMap?`#define USE_IRIDESCENCEMAP`:``,n.iridescenceThicknessMap?`#define USE_IRIDESCENCE_THICKNESSMAP`:``,n.specularMap?`#define USE_SPECULARMAP`:``,n.specularColorMap?`#define USE_SPECULAR_COLORMAP`:``,n.specularIntensityMap?`#define USE_SPECULAR_INTENSITYMAP`:``,n.roughnessMap?`#define USE_ROUGHNESSMAP`:``,n.metalnessMap?`#define USE_METALNESSMAP`:``,n.alphaMap?`#define USE_ALPHAMAP`:``,n.alphaTest?`#define USE_ALPHATEST`:``,n.alphaHash?`#define USE_ALPHAHASH`:``,n.sheen?`#define USE_SHEEN`:``,n.sheenColorMap?`#define USE_SHEEN_COLORMAP`:``,n.sheenRoughnessMap?`#define USE_SHEEN_ROUGHNESSMAP`:``,n.transmission?`#define USE_TRANSMISSION`:``,n.transmissionMap?`#define USE_TRANSMISSIONMAP`:``,n.thicknessMap?`#define USE_THICKNESSMAP`:``,n.vertexTangents&&n.flatShading===!1?`#define USE_TANGENT`:``,n.vertexColors||n.instancingColor?`#define USE_COLOR`:``,n.vertexAlphas||n.batchingColor?`#define USE_COLOR_ALPHA`:``,n.vertexUv1s?`#define USE_UV1`:``,n.vertexUv2s?`#define USE_UV2`:``,n.vertexUv3s?`#define USE_UV3`:``,n.pointsUvs?`#define USE_POINTS_UV`:``,n.gradientMap?`#define USE_GRADIENTMAP`:``,n.flatShading?`#define FLAT_SHADED`:``,n.doubleSided?`#define DOUBLE_SIDED`:``,n.flipSided?`#define FLIP_SIDED`:``,n.shadowMapEnabled?`#define USE_SHADOWMAP`:``,n.shadowMapEnabled?`#define `+c:``,n.premultipliedAlpha?`#define PREMULTIPLIED_ALPHA`:``,n.numLightProbes>0?`#define USE_LIGHT_PROBES`:``,n.numLightProbeGrids>0?`#define USE_LIGHT_PROBES_GRID`:``,n.decodeVideoTexture?`#define DECODE_VIDEO_TEXTURE`:``,n.decodeVideoTextureEmissive?`#define DECODE_VIDEO_TEXTURE_EMISSIVE`:``,n.logarithmicDepthBuffer?`#define USE_LOGARITHMIC_DEPTH_BUFFER`:``,n.reversedDepthBuffer?`#define USE_REVERSED_DEPTH_BUFFER`:``,`uniform mat4 viewMatrix;`,`uniform vec3 cameraPosition;`,`uniform bool isOrthographic;`,n.toneMapping===0?``:`#define TONE_MAPPING`,n.toneMapping===0?``:Oo.tonemapping_pars_fragment,n.toneMapping===0?``:jc(`toneMapping`,n.toneMapping),n.dithering?`#define DITHERING`:``,n.opaque?`#define OPAQUE`:``,Oo.colorspace_pars_fragment,kc(`linearToOutputTexel`,n.outputColorSpace),Nc(),n.useDepthPacking?`#define DEPTH_PACKING `+n.depthPacking:``,`
`].filter(Lc).join(`
`)),o=Vc(o),o=Rc(o,n),o=zc(o,n),s=Vc(s),s=Rc(s,n),s=zc(s,n),o=Gc(o),s=Gc(s),n.isRawShaderMaterial!==!0&&(v=`#version 300 es
`,g=[p,`#define attribute in`,`#define varying out`,`#define texture2D texture`].join(`
`)+`
`+g,_=[`#define varying in`,n.glslVersion===`300 es`?``:`layout(location = 0) out highp vec4 pc_fragColor;`,n.glslVersion===`300 es`?``:`#define gl_FragColor pc_fragColor`,`#define gl_FragDepthEXT gl_FragDepth`,`#define texture2D texture`,`#define textureCube texture`,`#define texture2DProj textureProj`,`#define texture2DLodEXT textureLod`,`#define texture2DProjLodEXT textureProjLod`,`#define textureCubeLodEXT textureLod`,`#define texture2DGradEXT textureGrad`,`#define texture2DProjGradEXT textureProjGrad`,`#define textureCubeGradEXT textureGrad`].join(`
`)+`
`+_);let y=v+g+o,b=v+_+s,x=Sc(i,i.VERTEX_SHADER,y),S=Sc(i,i.FRAGMENT_SHADER,b);i.attachShader(h,x),i.attachShader(h,S),n.index0AttributeName===void 0?n.hasPositionAttribute===!0&&i.bindAttribLocation(h,0,`position`):i.bindAttribLocation(h,0,n.index0AttributeName),i.linkProgram(h);function C(t){if(e.debug.checkShaderErrors){let n=i.getProgramInfoLog(h)||``,r=i.getShaderInfoLog(x)||``,a=i.getShaderInfoLog(S)||``,o=n.trim(),s=r.trim(),c=a.trim(),l=!0,u=!0;if(i.getProgramParameter(h,i.LINK_STATUS)===!1){if(l=!1,typeof e.debug.onShaderError==`function`)e.debug.onShaderError(i,h,x,S);else{let e=Oc(i,x,`vertex`),n=Oc(i,S,`fragment`);q(`WebGLProgram: Shader Error `+i.getError()+` - VALIDATE_STATUS `+i.getProgramParameter(h,i.VALIDATE_STATUS)+`

Material Name: `+t.name+`
Material Type: `+t.type+`

Program Info Log: `+o+`
`+e+`
`+n)}}else o===``?(s===``||c===``)&&(u=!1):K(`WebGLProgram: Program Info Log:`,o);u&&(t.diagnostics={runnable:l,programLog:o,vertexShader:{log:s,prefix:g},fragmentShader:{log:c,prefix:_}})}i.deleteShader(x),i.deleteShader(S),w=new xc(i,h),T=Ic(i,h)}let w;this.getUniforms=function(){return w===void 0&&C(this),w};let T;this.getAttributes=function(){return T===void 0&&C(this),T};let E=n.rendererExtensionParallelShaderCompile===!1;return this.isReady=function(){return E===!1&&(E=i.getProgramParameter(h,Cc)),E},this.destroy=function(){r.releaseStatesOfProgram(this),i.deleteProgram(h),this.program=void 0},this.type=n.shaderType,this.name=n.shaderName,this.id=wc++,this.cacheKey=t,this.usedTimes=1,this.program=h,this.vertexShader=x,this.fragmentShader=S,this}var il=0,al=class{constructor(){this.shaderCache=new Map,this.materialCache=new Map}update(e,t,n){let r=this._getShaderCacheForMaterial(e);return r.has(t)===!1&&(r.add(t),t.usedTimes++),r.has(n)===!1&&(r.add(n),n.usedTimes++),this}remove(e){let t=this.materialCache.get(e);for(let e of t)e.usedTimes--,e.usedTimes===0&&this.shaderCache.delete(e.code);return this.materialCache.delete(e),this}getVertexShaderStage(e){return this._getShaderStage(e.vertexShader)}getFragmentShaderStage(e){return this._getShaderStage(e.fragmentShader)}dispose(){this.shaderCache.clear(),this.materialCache.clear()}_getShaderCacheForMaterial(e){let t=this.materialCache,n=t.get(e);return n===void 0&&(n=new Set,t.set(e,n)),n}_getShaderStage(e){let t=this.shaderCache,n=t.get(e);return n===void 0&&(n=new ol(e),t.set(e,n)),n}},ol=class{constructor(e){this.id=il++,this.code=e,this.usedTimes=0}};function sl(e){return e===1030||e===37490||e===36285}function cl(e,t,n,r,i,a){let o=new Sn,s=new al,c=new Set,l=[],u=new Map,d=r.logarithmicDepthBuffer,f=r.precision,p={MeshDepthMaterial:`depth`,MeshDistanceMaterial:`distance`,MeshNormalMaterial:`normal`,MeshBasicMaterial:`basic`,MeshLambertMaterial:`lambert`,MeshPhongMaterial:`phong`,MeshToonMaterial:`toon`,MeshStandardMaterial:`physical`,MeshPhysicalMaterial:`physical`,MeshMatcapMaterial:`matcap`,LineBasicMaterial:`basic`,LineDashedMaterial:`dashed`,PointsMaterial:`points`,ShadowMaterial:`shadow`,SpriteMaterial:`sprite`};function m(e){return c.add(e),e===0?`uv`:`uv${e}`}function h(i,o,l,u,h,g){let _=u.fog,v=h.geometry,y=i.isMeshStandardMaterial||i.isMeshLambertMaterial||i.isMeshPhongMaterial?u.environment:null,b=i.isMeshStandardMaterial||i.isMeshLambertMaterial&&!i.envMap||i.isMeshPhongMaterial&&!i.envMap,x=t.get(i.envMap||y,b),S=x&&x.mapping===306?x.image.height:null,C=p[i.type];i.precision!==null&&(f=r.getMaxPrecision(i.precision),f!==i.precision&&K(`WebGLProgram.getParameters:`,i.precision,`not supported, using`,f,`instead.`));let w=v.morphAttributes.position||v.morphAttributes.normal||v.morphAttributes.color,T=w===void 0?0:w.length,E=0;v.morphAttributes.position!==void 0&&(E=1),v.morphAttributes.normal!==void 0&&(E=2),v.morphAttributes.color!==void 0&&(E=3);let D,O,k,A;if(C){let e=ko[C];D=e.vertexShader,O=e.fragmentShader}else{D=i.vertexShader,O=i.fragmentShader;let e=s.getVertexShaderStage(i),t=s.getFragmentShaderStage(i);s.update(i,e,t),k=e.id,A=t.id}let j=e.getRenderTarget(),M=e.state.buffers.depth.getReversed(),N=h.isInstancedMesh===!0,P=h.isBatchedMesh===!0,F=!!i.map,I=!!i.matcap,L=!!x,R=!!i.aoMap,z=!!i.lightMap,ee=!!i.bumpMap&&i.wireframe===!1,B=!!i.normalMap,te=!!i.displacementMap,V=!!i.emissiveMap,H=!!i.metalnessMap,ne=!!i.roughnessMap,re=i.anisotropy>0,ie=i.clearcoat>0,ae=i.dispersion>0,oe=i.retroreflectivity>0,se=i.iridescence>0,ce=i.sheen>0,le=i.transmission>0,ue=re&&!!i.anisotropyMap,U=ie&&!!i.clearcoatMap,de=ie&&!!i.clearcoatNormalMap,fe=ie&&!!i.clearcoatRoughnessMap,pe=se&&!!i.iridescenceMap,me=se&&!!i.iridescenceThicknessMap,he=ce&&!!i.sheenColorMap,ge=ce&&!!i.sheenRoughnessMap,_e=!!i.specularMap,ve=!!i.specularColorMap,ye=!!i.specularIntensityMap,be=le&&!!i.transmissionMap,xe=le&&!!i.thicknessMap,Se=!!i.gradientMap,Ce=!!i.alphaMap,we=i.alphaTest>0,W=!!i.alphaHash,Te=!!i.extensions,Ee=0;i.toneMapped&&(j===null||j.isXRRenderTarget===!0)&&(Ee=e.toneMapping);let De={shaderID:C,shaderType:i.type,shaderName:i.name,vertexShader:D,fragmentShader:O,defines:i.defines,customVertexShaderID:k,customFragmentShaderID:A,isRawShaderMaterial:i.isRawShaderMaterial===!0,glslVersion:i.glslVersion,precision:f,batching:P,batchingColor:P&&h._colorsTexture!==null,instancing:N,instancingColor:N&&h.instanceColor!==null,instancingMorph:N&&h.morphTexture!==null,outputColorSpace:j===null?e.outputColorSpace:j.isXRRenderTarget===!0?j.texture.colorSpace:Jt.workingColorSpace,alphaToCoverage:!!i.alphaToCoverage,map:F,matcap:I,envMap:L,envMapMode:L&&x.mapping,envMapCubeUVHeight:S,aoMap:R,lightMap:z,bumpMap:ee,normalMap:B,displacementMap:te,emissiveMap:V,normalMapObjectSpace:B&&i.normalMapType===1,normalMapTangentSpace:B&&i.normalMapType===0,packedNormalMap:B&&i.normalMapType===0&&sl(i.normalMap.format),metalnessMap:H,roughnessMap:ne,anisotropy:re,anisotropyMap:ue,clearcoat:ie,clearcoatMap:U,clearcoatNormalMap:de,clearcoatRoughnessMap:fe,dispersion:ae,retroreflection:oe,iridescence:se,iridescenceMap:pe,iridescenceThicknessMap:me,sheen:ce,sheenColorMap:he,sheenRoughnessMap:ge,specularMap:_e,specularColorMap:ve,specularIntensityMap:ye,transmission:le,transmissionMap:be,thicknessMap:xe,gradientMap:Se,opaque:i.transparent===!1&&i.blending===1&&i.alphaToCoverage===!1,alphaMap:Ce,alphaTest:we,alphaHash:W,combine:i.combine,mapUv:F&&m(i.map.channel),aoMapUv:R&&m(i.aoMap.channel),lightMapUv:z&&m(i.lightMap.channel),bumpMapUv:ee&&m(i.bumpMap.channel),normalMapUv:B&&m(i.normalMap.channel),displacementMapUv:te&&m(i.displacementMap.channel),emissiveMapUv:V&&m(i.emissiveMap.channel),metalnessMapUv:H&&m(i.metalnessMap.channel),roughnessMapUv:ne&&m(i.roughnessMap.channel),anisotropyMapUv:ue&&m(i.anisotropyMap.channel),clearcoatMapUv:U&&m(i.clearcoatMap.channel),clearcoatNormalMapUv:de&&m(i.clearcoatNormalMap.channel),clearcoatRoughnessMapUv:fe&&m(i.clearcoatRoughnessMap.channel),iridescenceMapUv:pe&&m(i.iridescenceMap.channel),iridescenceThicknessMapUv:me&&m(i.iridescenceThicknessMap.channel),sheenColorMapUv:he&&m(i.sheenColorMap.channel),sheenRoughnessMapUv:ge&&m(i.sheenRoughnessMap.channel),specularMapUv:_e&&m(i.specularMap.channel),specularColorMapUv:ve&&m(i.specularColorMap.channel),specularIntensityMapUv:ye&&m(i.specularIntensityMap.channel),transmissionMapUv:be&&m(i.transmissionMap.channel),thicknessMapUv:xe&&m(i.thicknessMap.channel),alphaMapUv:Ce&&m(i.alphaMap.channel),vertexTangents:!!v.attributes.tangent&&(B||re),vertexNormals:!!v.attributes.normal,vertexColors:i.vertexColors,vertexAlphas:i.vertexColors===!0&&!!v.attributes.color&&v.attributes.color.itemSize===4,pointsUvs:h.isPoints===!0&&!!v.attributes.uv&&(F||Ce),fog:!!_,useFog:i.fog===!0,fogExp2:!!_&&_.isFogExp2,flatShading:i.wireframe===!1&&(i.flatShading===!0||v.attributes.normal===void 0&&B===!1&&(i.isMeshLambertMaterial||i.isMeshPhongMaterial||i.isMeshStandardMaterial||i.isMeshPhysicalMaterial)),sizeAttenuation:i.sizeAttenuation===!0,logarithmicDepthBuffer:d,reversedDepthBuffer:M,skinning:h.isSkinnedMesh===!0,hasPositionAttribute:v.attributes.position!==void 0,morphTargets:v.morphAttributes.position!==void 0,morphNormals:v.morphAttributes.normal!==void 0,morphColors:v.morphAttributes.color!==void 0,morphTargetsCount:T,morphTextureStride:E,numSunLights:o.sun.length,numDirLights:o.directional.length,numPointLights:o.point.length,numSpotLights:o.spot.length,numSpotLightMaps:o.spotLightMap.length,numRectAreaLights:o.rectArea.length,numHemiLights:o.hemi.length,numSunLightShadows:o.sunShadowMap.length,numDirLightShadows:o.directionalShadowMap.length,numPointLightShadows:o.pointShadowMap.length,numSpotLightShadows:o.spotShadowMap.length,numSpotLightShadowsWithMaps:o.numSpotLightShadowsWithMaps,numLightProbes:o.numLightProbes,numLightProbeGrids:g.length,numClippingPlanes:a.numPlanes,numClipIntersection:a.numIntersection,dithering:i.dithering,shadowMapEnabled:e.shadowMap.enabled&&l.length>0,shadowMapType:e.shadowMap.type,toneMapping:Ee,decodeVideoTexture:F&&i.map.isVideoTexture===!0&&Jt.getTransfer(i.map.colorSpace)===`srgb`,decodeVideoTextureEmissive:V&&i.emissiveMap.isVideoTexture===!0&&Jt.getTransfer(i.emissiveMap.colorSpace)===`srgb`,premultipliedAlpha:i.premultipliedAlpha,doubleSided:i.side===2,flipSided:i.side===1,useDepthPacking:i.depthPacking>=0,depthPacking:i.depthPacking||0,index0AttributeName:i.index0AttributeName,extensionClipCullDistance:Te&&i.extensions.clipCullDistance===!0&&n.has(`WEBGL_clip_cull_distance`),extensionMultiDraw:(Te&&i.extensions.multiDraw===!0||P)&&n.has(`WEBGL_multi_draw`),rendererExtensionParallelShaderCompile:n.has(`KHR_parallel_shader_compile`),customProgramCacheKey:i.customProgramCacheKey()};return De.vertexUv1s=c.has(1),De.vertexUv2s=c.has(2),De.vertexUv3s=c.has(3),c.clear(),De}function g(t){let n=[];if(t.shaderID?n.push(t.shaderID):(n.push(t.customVertexShaderID),n.push(t.customFragmentShaderID)),t.defines!==void 0)for(let e in t.defines)n.push(e),n.push(t.defines[e]);return t.isRawShaderMaterial===!1&&(_(n,t),v(n,t),n.push(e.outputColorSpace)),n.push(t.customProgramCacheKey),n.join()}function _(e,t){e.push(t.precision),e.push(t.outputColorSpace),e.push(t.envMapMode),e.push(t.envMapCubeUVHeight),e.push(t.mapUv),e.push(t.alphaMapUv),e.push(t.lightMapUv),e.push(t.aoMapUv),e.push(t.bumpMapUv),e.push(t.normalMapUv),e.push(t.displacementMapUv),e.push(t.emissiveMapUv),e.push(t.metalnessMapUv),e.push(t.roughnessMapUv),e.push(t.anisotropyMapUv),e.push(t.clearcoatMapUv),e.push(t.clearcoatNormalMapUv),e.push(t.clearcoatRoughnessMapUv),e.push(t.iridescenceMapUv),e.push(t.iridescenceThicknessMapUv),e.push(t.sheenColorMapUv),e.push(t.sheenRoughnessMapUv),e.push(t.specularMapUv),e.push(t.specularColorMapUv),e.push(t.specularIntensityMapUv),e.push(t.transmissionMapUv),e.push(t.thicknessMapUv),e.push(t.combine),e.push(t.fogExp2),e.push(t.sizeAttenuation),e.push(t.morphTargetsCount),e.push(t.morphAttributeCount),e.push(t.numSunLights),e.push(t.numDirLights),e.push(t.numPointLights),e.push(t.numSpotLights),e.push(t.numSpotLightMaps),e.push(t.numHemiLights),e.push(t.numRectAreaLights),e.push(t.numSunLightShadows),e.push(t.numDirLightShadows),e.push(t.numPointLightShadows),e.push(t.numSpotLightShadows),e.push(t.numSpotLightShadowsWithMaps),e.push(t.numLightProbes),e.push(t.shadowMapType),e.push(t.toneMapping),e.push(t.numClippingPlanes),e.push(t.numClipIntersection),e.push(t.depthPacking)}function v(e,t){o.disableAll(),t.instancing&&o.enable(0),t.instancingColor&&o.enable(1),t.instancingMorph&&o.enable(2),t.matcap&&o.enable(3),t.envMap&&o.enable(4),t.normalMapObjectSpace&&o.enable(5),t.normalMapTangentSpace&&o.enable(6),t.clearcoat&&o.enable(7),t.iridescence&&o.enable(8),t.alphaTest&&o.enable(9),t.vertexColors&&o.enable(10),t.vertexAlphas&&o.enable(11),t.vertexUv1s&&o.enable(12),t.vertexUv2s&&o.enable(13),t.vertexUv3s&&o.enable(14),t.vertexTangents&&o.enable(15),t.anisotropy&&o.enable(16),t.alphaHash&&o.enable(17),t.batching&&o.enable(18),t.dispersion&&o.enable(19),t.retroreflection&&o.enable(24),t.batchingColor&&o.enable(20),t.gradientMap&&o.enable(21),t.packedNormalMap&&o.enable(22),t.vertexNormals&&o.enable(23),e.push(o.mask),o.disableAll(),t.fog&&o.enable(0),t.useFog&&o.enable(1),t.flatShading&&o.enable(2),t.logarithmicDepthBuffer&&o.enable(3),t.reversedDepthBuffer&&o.enable(4),t.skinning&&o.enable(5),t.morphTargets&&o.enable(6),t.morphNormals&&o.enable(7),t.morphColors&&o.enable(8),t.premultipliedAlpha&&o.enable(9),t.shadowMapEnabled&&o.enable(10),t.doubleSided&&o.enable(11),t.flipSided&&o.enable(12),t.useDepthPacking&&o.enable(13),t.dithering&&o.enable(14),t.transmission&&o.enable(15),t.sheen&&o.enable(16),t.opaque&&o.enable(17),t.pointsUvs&&o.enable(18),t.decodeVideoTexture&&o.enable(19),t.decodeVideoTextureEmissive&&o.enable(20),t.alphaToCoverage&&o.enable(21),t.numLightProbeGrids>0&&o.enable(22),t.hasPositionAttribute&&o.enable(23),e.push(o.mask)}function y(e){let t=p[e.type],n;if(t){let e=ko[t];n=ma.clone(e.uniforms)}else n=e.uniforms;return n}function b(t,n){let r=u.get(n);return r===void 0?(r=new rl(e,n,t,i),l.push(r),u.set(n,r)):++r.usedTimes,r}function x(e){if(--e.usedTimes===0){let t=l.indexOf(e);l[t]=l[l.length-1],l.pop(),u.delete(e.cacheKey),e.destroy()}}function S(e){s.remove(e)}function C(){s.dispose()}return{getParameters:h,getProgramCacheKey:g,getUniforms:y,acquireProgram:b,releaseProgram:x,releaseShaderCache:S,programs:l,dispose:C}}function ll(){let e=new WeakMap;function t(t){return e.has(t)}function n(t){let n=e.get(t);return n===void 0&&(n={},e.set(t,n)),n}function r(t){e.delete(t)}function i(t,n,r){e.get(t)[n]=r}function a(){e=new WeakMap}return{has:t,get:n,remove:r,update:i,dispose:a}}function ul(e,t){return e.groupOrder===t.groupOrder?e.renderOrder===t.renderOrder?e.material.id===t.material.id?e.materialVariant===t.materialVariant?e.z===t.z?e.id-t.id:e.z-t.z:e.materialVariant-t.materialVariant:e.material.id-t.material.id:e.renderOrder-t.renderOrder:e.groupOrder-t.groupOrder}function dl(e,t){return e.groupOrder===t.groupOrder?e.renderOrder===t.renderOrder?e.z===t.z?e.id-t.id:t.z-e.z:e.renderOrder-t.renderOrder:e.groupOrder-t.groupOrder}function fl(){let e=[],t=0,n=[],r=[],i=[];function a(){t=0,n.length=0,r.length=0,i.length=0}function o(e){let t=0;return e.isInstancedMesh&&(t+=2),e.isSkinnedMesh&&(t+=1),t}function s(n,r,i,a,s,c){let l=e[t];return l===void 0?(l={id:n.id,object:n,geometry:r,material:i,materialVariant:o(n),groupOrder:a,renderOrder:n.renderOrder,z:s,group:c},e[t]=l):(l.id=n.id,l.object=n,l.geometry=r,l.material=i,l.materialVariant=o(n),l.groupOrder=a,l.renderOrder=n.renderOrder,l.z=s,l.group=c),t++,l}function c(e,t,a,o,c,l,u){u.reversedDepth===!0&&(c=-c);let d=s(e,t,a,o,c,l);a.transmission>0?r.push(d):a.transparent===!0?i.push(d):n.push(d)}function l(e,t,a,o,c,l){let u=s(e,t,a,o,c,l);a.transmission>0?r.unshift(u):a.transparent===!0?i.unshift(u):n.unshift(u)}function u(e,t){n.length>1&&n.sort(e||ul),r.length>1&&r.sort(t||dl),i.length>1&&i.sort(t||dl)}function d(){for(let n=t,r=e.length;n<r;n++){let t=e[n];if(t.id===null)break;t.id=null,t.object=null,t.geometry=null,t.material=null,t.group=null}}return{opaque:n,transmissive:r,transparent:i,init:a,push:c,unshift:l,finish:d,sort:u}}function pl(){let e=new WeakMap;function t(t,n){let r=e.get(t),i;return r===void 0?(i=new fl,e.set(t,[i])):n>=r.length?(i=new fl,r.push(i)):i=r[n],i}function n(){e=new WeakMap}return{get:t,dispose:n}}function ml(){let e={};return{get:function(t){if(e[t.id]!==void 0)return e[t.id];let n;switch(t.type){case`SunLight`:case`DirectionalLight`:n={direction:new Y,color:new X};break;case`SpotLight`:n={position:new Y,direction:new Y,color:new X,distance:0,coneCos:0,penumbraCos:0,decay:0};break;case`PointLight`:n={position:new Y,color:new X,distance:0,decay:0};break;case`HemisphereLight`:n={direction:new Y,skyColor:new X,groundColor:new X};break;case`RectAreaLight`:n={color:new X,position:new Y,halfWidth:new Y,halfHeight:new Y}}return e[t.id]=n,n}}}function hl(){let e={};return{get:function(t){if(e[t.id]!==void 0)return e[t.id];let n;switch(t.type){case`SunLight`:case`DirectionalLight`:n={shadowIntensity:1,shadowBias:0,shadowNormalBias:0,shadowRadius:1,shadowMapSize:new J};break;case`SpotLight`:n={shadowIntensity:1,shadowBias:0,shadowNormalBias:0,shadowRadius:1,shadowMapSize:new J};break;case`PointLight`:n={shadowIntensity:1,shadowBias:0,shadowNormalBias:0,shadowRadius:1,shadowMapSize:new J,shadowCameraNear:1,shadowCameraFar:1e3}}return e[t.id]=n,n}}}var gl=0;function _l(e,t){return(t.castShadow?2:0)-(e.castShadow?2:0)+ +!!t.map-!!e.map}function vl(e){let t=new ml,n=hl(),r={version:0,hash:{sunLength:-1,directionalLength:-1,pointLength:-1,spotLength:-1,rectAreaLength:-1,hemiLength:-1,numSunShadows:-1,numDirectionalShadows:-1,numPointShadows:-1,numSpotShadows:-1,numSpotMaps:-1,numLightProbes:-1},ambient:[0,0,0],probe:[],sun:[],sunShadow:[],sunShadowMap:[],sunShadowMatrix:[],sunShadowCascade:[],directional:[],directionalShadow:[],directionalShadowMap:[],directionalShadowMatrix:[],spot:[],spotLightMap:[],spotShadow:[],spotShadowMap:[],spotLightMatrix:[],rectArea:[],rectAreaLTC1:null,rectAreaLTC2:null,point:[],pointShadow:[],pointShadowMap:[],pointShadowMatrix:[],hemi:[],numSpotLightShadowsWithMaps:0,numLightProbes:0};for(let e=0;e<9;e++)r.probe.push(new Y);let i=new Y,a=new dn,o=new dn;function s(i){let a=0,o=0,s=0;for(let e=0;e<9;e++)r.probe[e].set(0,0,0);let c=0,l=0,u=0,d=0,f=0,p=0,m=0,h=0,g=0,_=0,v=0,y=0,b=0,x=0;i.sort(_l);for(let e=0,S=i.length;e<S;e++){let S=i[e],C=S.color,w=S.intensity,T=S.distance,E=null;if(S.shadow&&S.shadow.map&&(E=S.shadow.map.texture.format===1030?S.shadow.map.texture:S.shadow.map.depthTexture||S.shadow.map.texture),S.isAmbientLight)a+=C.r*w,o+=C.g*w,s+=C.b*w;else if(S.isLightProbe){for(let e=0;e<9;e++)r.probe[e].addScaledVector(S.sh.coefficients[e],w);x++}else if(S.isSunLight){let e=t.get(S);if(e.color.copy(S.color).multiplyScalar(S.intensity),S.castShadow){let e=S.shadow,t=n.get(S);t.shadowIntensity=e.intensity,t.shadowBias=e.bias,t.shadowNormalBias=e.normalBias,t.shadowRadius=e.radius,t.shadowMapSize.copy(e.mapSize).multiply(e.getFrameExtents()),r.sunShadow[l]=t,r.sunShadowMap[l]=E;let i=e.getViewportCount();for(let t=0;t<i;t++)r.sunShadowMatrix[u+t]=e.getMatrix(t),r.sunShadowCascade[u+t]=e._cascadeData[t];u+=i,l++}r.sun[c]=e,c++}else if(S.isDirectionalLight){let e=t.get(S);if(e.color.copy(S.color).multiplyScalar(S.intensity),S.castShadow){let e=S.shadow,t=n.get(S);t.shadowIntensity=e.intensity,t.shadowBias=e.bias,t.shadowNormalBias=e.normalBias,t.shadowRadius=e.radius,t.shadowMapSize=e.mapSize,r.directionalShadow[d]=t,r.directionalShadowMap[d]=E,r.directionalShadowMatrix[d]=S.shadow.matrix,g++}r.directional[d]=e,d++}else if(S.isSpotLight){let e=t.get(S);e.position.setFromMatrixPosition(S.matrixWorld),e.color.copy(C).multiplyScalar(w),e.distance=T,e.coneCos=Math.cos(S.angle),e.penumbraCos=Math.cos(S.angle*(1-S.penumbra)),e.decay=S.decay,r.spot[p]=e;let i=S.shadow;if(S.map&&(r.spotLightMap[y]=S.map,y++,i.updateMatrices(S),S.castShadow&&b++),r.spotLightMatrix[p]=i.matrix,S.castShadow){let e=n.get(S);e.shadowIntensity=i.intensity,e.shadowBias=i.bias,e.shadowNormalBias=i.normalBias,e.shadowRadius=i.radius,e.shadowMapSize=i.mapSize,r.spotShadow[p]=e,r.spotShadowMap[p]=E,v++}p++}else if(S.isRectAreaLight){let e=t.get(S);e.color.copy(C).multiplyScalar(w),e.halfWidth.set(S.width*.5,0,0),e.halfHeight.set(0,S.height*.5,0),r.rectArea[m]=e,m++}else if(S.isPointLight){let e=t.get(S);if(e.color.copy(S.color).multiplyScalar(S.intensity),e.distance=S.distance,e.decay=S.decay,S.castShadow){let e=S.shadow,t=n.get(S);t.shadowIntensity=e.intensity,t.shadowBias=e.bias,t.shadowNormalBias=e.normalBias,t.shadowRadius=e.radius,t.shadowMapSize=e.mapSize,t.shadowCameraNear=e.camera.near,t.shadowCameraFar=e.camera.far,r.pointShadow[f]=t,r.pointShadowMap[f]=E,r.pointShadowMatrix[f]=S.shadow.matrix,_++}r.point[f]=e,f++}else if(S.isHemisphereLight){let e=t.get(S);e.skyColor.copy(S.color).multiplyScalar(w),e.groundColor.copy(S.groundColor).multiplyScalar(w),r.hemi[h]=e,h++}}m>0&&(e.has(`OES_texture_float_linear`)===!0?(r.rectAreaLTC1=Z.LTC_FLOAT_1,r.rectAreaLTC2=Z.LTC_FLOAT_2):(r.rectAreaLTC1=Z.LTC_HALF_1,r.rectAreaLTC2=Z.LTC_HALF_2)),r.ambient[0]=a,r.ambient[1]=o,r.ambient[2]=s;let S=r.hash;(S.sunLength!==c||S.directionalLength!==d||S.pointLength!==f||S.spotLength!==p||S.rectAreaLength!==m||S.hemiLength!==h||S.numSunShadows!==l||S.numDirectionalShadows!==g||S.numPointShadows!==_||S.numSpotShadows!==v||S.numSpotMaps!==y||S.numLightProbes!==x)&&(r.sun.length=c,r.directional.length=d,r.spot.length=p,r.rectArea.length=m,r.point.length=f,r.hemi.length=h,r.sunShadow.length=l,r.sunShadowMap.length=l,r.sunShadowMatrix.length=u,r.sunShadowCascade.length=u,r.directionalShadow.length=g,r.directionalShadowMap.length=g,r.directionalShadowMatrix.length=g,r.pointShadow.length=_,r.pointShadowMap.length=_,r.pointShadowMatrix.length=_,r.spotShadow.length=v,r.spotShadowMap.length=v,r.spotLightMatrix.length=v+y-b,r.spotLightMap.length=y,r.numSpotLightShadowsWithMaps=b,r.numLightProbes=x,S.sunLength=c,S.directionalLength=d,S.pointLength=f,S.spotLength=p,S.rectAreaLength=m,S.hemiLength=h,S.numSunShadows=l,S.numDirectionalShadows=g,S.numPointShadows=_,S.numSpotShadows=v,S.numSpotMaps=y,S.numLightProbes=x,r.version=gl++)}function c(e,t){let n=0,s=0,c=0,l=0,u=0,d=0,f=t.matrixWorldInverse;for(let t=0,p=e.length;t<p;t++){let p=e[t];if(p.isSunLight){let e=r.sun[n];e.direction.setFromMatrixPosition(p.matrixWorld),e.direction.transformDirection(f),n++}else if(p.isDirectionalLight){let e=r.directional[s];e.direction.setFromMatrixPosition(p.matrixWorld),i.setFromMatrixPosition(p.target.matrixWorld),e.direction.sub(i),e.direction.transformDirection(f),s++}else if(p.isSpotLight){let e=r.spot[l];e.position.setFromMatrixPosition(p.matrixWorld),e.position.applyMatrix4(f),e.direction.setFromMatrixPosition(p.matrixWorld),i.setFromMatrixPosition(p.target.matrixWorld),e.direction.sub(i),e.direction.transformDirection(f),l++}else if(p.isRectAreaLight){let e=r.rectArea[u];e.position.setFromMatrixPosition(p.matrixWorld),e.position.applyMatrix4(f),o.identity(),a.copy(p.matrixWorld),a.premultiply(f),o.extractRotation(a),e.halfWidth.set(p.width*.5,0,0),e.halfHeight.set(0,p.height*.5,0),e.halfWidth.applyMatrix4(o),e.halfHeight.applyMatrix4(o),u++}else if(p.isPointLight){let e=r.point[c];e.position.setFromMatrixPosition(p.matrixWorld),e.position.applyMatrix4(f),c++}else if(p.isHemisphereLight){let e=r.hemi[d];e.direction.setFromMatrixPosition(p.matrixWorld),e.direction.transformDirection(f),d++}}}return{setup:s,setupView:c,state:r}}function yl(e){let t=new vl(e),n=[],r=[],i=[];function a(e){d.camera=e,n.length=0,r.length=0,i.length=0}function o(e){n.push(e)}function s(e){r.push(e)}function c(e){i.push(e)}function l(){t.setup(n)}function u(e){t.setupView(n,e)}let d={lightsArray:n,shadowsArray:r,lightProbeGridArray:i,camera:null,lights:t,transmissionRenderTarget:{},textureUnits:0};return{init:a,state:d,setupLights:l,setupLightsView:u,pushLight:o,pushShadow:s,pushLightProbeGrid:c}}function bl(e){let t=new WeakMap;function n(n,r=0){let i=t.get(n),a;return i===void 0?(a=new yl(e),t.set(n,[a])):r>=i.length?(a=new yl(e),i.push(a)):a=i[r],a}function r(){t=new WeakMap}return{get:n,dispose:r}}var xl=`void main() {
	gl_Position = vec4( position, 1.0 );
}`,Sl=`uniform sampler2D shadow_pass;
uniform vec2 resolution;
uniform float radius;
void main() {
	const float samples = float( VSM_SAMPLES );
	float mean = 0.0;
	float squared_mean = 0.0;
	float uvStride = samples <= 1.0 ? 0.0 : 2.0 / ( samples - 1.0 );
	float uvStart = samples <= 1.0 ? 0.0 : - 1.0;
	for ( float i = 0.0; i < samples; i ++ ) {
		float uvOffset = uvStart + i * uvStride;
		#ifdef HORIZONTAL_PASS
			vec2 distribution = texture2D( shadow_pass, ( gl_FragCoord.xy + vec2( uvOffset, 0.0 ) * radius ) / resolution ).rg;
			mean += distribution.x;
			squared_mean += distribution.y * distribution.y + distribution.x * distribution.x;
		#else
			float depth = texture2D( shadow_pass, ( gl_FragCoord.xy + vec2( 0.0, uvOffset ) * radius ) / resolution ).r;
			mean += depth;
			squared_mean += depth * depth;
		#endif
	}
	mean = mean / samples;
	squared_mean = squared_mean / samples;
	float std_dev = sqrt( max( 0.0, squared_mean - mean * mean ) );
	gl_FragColor = vec4( mean, std_dev, 0.0, 1.0 );
}`,Cl=[new Y(1,0,0),new Y(-1,0,0),new Y(0,1,0),new Y(0,-1,0),new Y(0,0,1),new Y(0,0,-1)],wl=[new Y(0,-1,0),new Y(0,-1,0),new Y(0,0,1),new Y(0,0,-1),new Y(0,-1,0),new Y(0,-1,0)],Tl=new dn,El=new Y,Dl=new Y;function Ol(e,t,n){let r=new vi,i=new J,a=new J,o=new on,s=new xa,c=new Sa,l={},u=n.maxTextureSize,d={0:1,1:0,2:2},f=new _a({defines:{VSM_SAMPLES:8},uniforms:{shadow_pass:{value:null},resolution:{value:new J},radius:{value:4}},vertexShader:xl,fragmentShader:Sl}),p=f.clone();p.defines.HORIZONTAL_PASS=1;let m=new Vr;m.setAttribute(`position`,new Er(new Float32Array([-1,-1,.5,3,-1,.5,-1,3,.5]),3));let h=new di(m,f),g=this;this.enabled=!1,this.autoUpdate=!0,this.needsUpdate=!1,this.type=1;let _=this.type;this.render=function(t,n,s){if(g.enabled===!1||g.autoUpdate===!1&&g.needsUpdate===!1||t.length===0)return;this.type===2&&(K(`WebGLShadowMap: PCFSoftShadowMap has been removed. Using PCFShadowMap instead.`),this.type=1);let c=e.getRenderTarget(),l=e.getActiveCubeFace(),d=e.getActiveMipmapLevel(),f=e.state;f.setBlending(0),f.buffers.depth.getReversed()===!0?f.buffers.color.setClear(0,0,0,0):f.buffers.color.setClear(1,1,1,1),f.buffers.depth.setTest(!0),f.setScissorTest(!1);let p=_!==this.type;p&&n.traverse(function(e){e.material&&(Array.isArray(e.material)?e.material.forEach(e=>e.needsUpdate=!0):e.material.needsUpdate=!0)});for(let c=0,l=t.length;c<l;c++){let l=t[c],d=l.shadow;if(d===void 0){K(`WebGLShadowMap:`,l,`has no shadow.`);continue}if(d.autoUpdate===!1&&d.needsUpdate===!1)continue;i.copy(d.mapSize);let m=d.getFrameExtents();i.multiply(m),a.copy(d.mapSize),(i.x>u||i.y>u)&&(i.x>u&&(a.x=Math.floor(u/m.x),i.x=a.x*m.x,d.mapSize.x=a.x),i.y>u&&(a.y=Math.floor(u/m.y),i.y=a.y*m.y,d.mapSize.y=a.y));let h=e.state.buffers.depth.getReversed();if(d.camera._reversedDepth=h,d.map===null||p===!0){if(d.map!==null&&(d.map.depthTexture!==null&&(d.map.depthTexture.dispose(),d.map.depthTexture=null),d.map.dispose()),this.type===3){if(l.isPointLight){K(`WebGLShadowMap: VSM shadow maps are not supported for PointLights. Use PCF or BasicShadowMap instead.`);continue}d.map=new cn(i.x,i.y,{format:ae,type:F,minFilter:T,magFilter:T,generateMipmaps:!1}),d.map.texture.name=l.name+`.shadowMap`,d.map.depthTexture=new Pi(i.x,i.y,P),d.map.depthTexture.name=l.name+`.shadowMapDepth`,d.map.depthTexture.format=H,d.map.depthTexture.compareFunction=null,d.map.depthTexture.minFilter=S,d.map.depthTexture.magFilter=S}else l.isPointLight?(d.map=new as(i.x),d.map.depthTexture=new Fi(i.x,N)):(d.map=new cn(i.x,i.y),d.map.depthTexture=new Pi(i.x,i.y,N)),d.map.depthTexture.name=l.name+`.shadowMap`,d.map.depthTexture.format=H,this.type===1?(d.map.depthTexture.compareFunction=h?518:515,d.map.depthTexture.minFilter=T,d.map.depthTexture.magFilter=T):(d.map.depthTexture.compareFunction=null,d.map.depthTexture.minFilter=S,d.map.depthTexture.magFilter=S);d.camera.updateProjectionMatrix()}d.map.isWebGLCubeRenderTarget!==!0&&(d.map.width!==i.x||d.map.height!==i.y)&&d.map.setSize(i.x,i.y);let g=d.map.isWebGLCubeRenderTarget?6:d.getViewportCount();l.isPointLight!==!0&&d.updateMatrices(l,s);for(let t=0;t<g;t++){let i=d.getCamera(t);if(l.isPointLight){let e=d.camera,n=d.matrix,r=l.distance||e.far;r!==e.far&&(e.far=r,e.updateProjectionMatrix()),El.setFromMatrixPosition(l.matrixWorld),e.position.copy(El),Dl.copy(e.position),Dl.add(Cl[t]),e.up.copy(wl[t]),e.lookAt(Dl),e.updateMatrixWorld(),n.makeTranslation(-El.x,-El.y,-El.z),Tl.multiplyMatrices(e.projectionMatrix,e.matrixWorldInverse),d._frustum.setFromProjectionMatrix(Tl,e.coordinateSystem,e.reversedDepth)}if(d.map.isWebGLCubeRenderTarget)e.setRenderTarget(d.map,t),e.clear();else{t===0&&(e.setRenderTarget(d.map),e.clear());let n=d.getViewport(t);o.set(a.x*n.x,a.y*n.y,a.x*n.z,a.y*n.w),f.viewport(o)}r=d.getFrustum(t),b(n,s,i,l,this.type)}d.isPointLightShadow!==!0&&this.type===3&&v(d,s),d.needsUpdate=!1}_=this.type,g.needsUpdate=!1,e.setRenderTarget(c,l,d)};function v(n,r){let a=t.update(h);f.defines.VSM_SAMPLES!==n.blurSamples&&(f.defines.VSM_SAMPLES=n.blurSamples,p.defines.VSM_SAMPLES=n.blurSamples,f.needsUpdate=!0,p.needsUpdate=!0),n.mapPass===null?n.mapPass=new cn(i.x,i.y,{format:ae,type:F}):(n.mapPass.width!==n.map.width||n.mapPass.height!==n.map.height)&&n.mapPass.setSize(n.map.width,n.map.height),f.uniforms.shadow_pass.value=n.map.depthTexture,f.uniforms.resolution.value.set(n.map.width,n.map.height),f.uniforms.radius.value=n.radius,e.setRenderTarget(n.mapPass),e.clear(),e.renderBufferDirect(r,null,a,f,h,null),p.uniforms.shadow_pass.value=n.mapPass.texture,p.uniforms.resolution.value.set(n.map.width,n.map.height),p.uniforms.radius.value=n.radius,e.setRenderTarget(n.map),e.clear(),e.renderBufferDirect(r,null,a,p,h,null)}function y(t,n,r,i){let a=null,o=r.isPointLight===!0?t.customDistanceMaterial:t.customDepthMaterial;if(o!==void 0)a=o;else if(a=r.isPointLight===!0?c:s,e.localClippingEnabled&&n.clipShadows===!0&&Array.isArray(n.clippingPlanes)&&n.clippingPlanes.length!==0||n.displacementMap&&n.displacementScale!==0||n.alphaMap&&n.alphaTest>0||n.map&&n.alphaTest>0||n.alphaToCoverage===!0){let e=a.uuid,t=n.uuid,r=l[e];r===void 0&&(r={},l[e]=r);let i=r[t];i===void 0&&(i=a.clone(),r[t]=i,n.addEventListener(`dispose`,x)),a=i}if(a.visible=n.visible,a.wireframe=n.wireframe,i===3?a.side=n.shadowSide===null?n.side:n.shadowSide:a.side=n.shadowSide===null?d[n.side]:n.shadowSide,a.alphaMap=n.alphaMap,a.alphaTest=n.alphaToCoverage===!0?.5:n.alphaTest,a.map=n.map,a.clipShadows=n.clipShadows,a.clippingPlanes=n.clippingPlanes,a.clipIntersection=n.clipIntersection,a.displacementMap=n.displacementMap,a.displacementScale=n.displacementScale,a.displacementBias=n.displacementBias,a.wireframeLinewidth=n.wireframeLinewidth,a.linewidth=n.linewidth,r.isPointLight===!0&&a.isMeshDistanceMaterial===!0){let t=e.properties.get(a);t.light=r}return a}function b(n,i,a,o,s){if(n.visible===!1)return;if(n.layers.test(i.layers)&&(n.isMesh||n.isLine||n.isPoints)&&(n.castShadow||n.receiveShadow&&s===3)&&(!n.frustumCulled||n.intersectsFrustum(r))){n.modelViewMatrix.multiplyMatrices(a.matrixWorldInverse,n.matrixWorld);let r=t.update(n),c=n.material;if(Array.isArray(c)){let t=r.groups;for(let l=0,u=t.length;l<u;l++){let u=t[l],d=c[u.materialIndex];if(d&&d.visible){let t=y(n,d,o,s);n.onBeforeShadow(e,n,i,a,r,t,u),e.renderBufferDirect(a,null,r,t,n,u),n.onAfterShadow(e,n,i,a,r,t,u)}}}else if(c.visible){let t=y(n,c,o,s);n.onBeforeShadow(e,n,i,a,r,t,null),e.renderBufferDirect(a,null,r,t,n,null),n.onAfterShadow(e,n,i,a,r,t,null)}}let c=n.children;for(let e=0,t=c.length;e<t;e++)b(c[e],i,a,o,s)}function x(e){e.target.removeEventListener(`dispose`,x);for(let t in l){let n=l[t],r=e.target.uuid;r in n&&(n[r].dispose(),delete n[r])}}}function kl(e,t){function n(){let t=!1,n=new on,r=null,i=new on(0,0,0,0);return{setMask:function(n){r!==n&&!t&&(e.colorMask(n,n,n,n),r=n)},setLocked:function(e){t=e},setClear:function(t,r,a,o,s){s===!0&&(t*=o,r*=o,a*=o),n.set(t,r,a,o),i.equals(n)===!1&&(e.clearColor(t,r,a,o),i.copy(n))},reset:function(){t=!1,r=null,i.set(-1,0,0,0)}}}function r(){let n=!1,r=!1,i=null,a=null,o=null;return{setReversed:function(e){if(r!==e){let n=t.get(`EXT_clip_control`);e?n.clipControlEXT(n.LOWER_LEFT_EXT,n.ZERO_TO_ONE_EXT):n.clipControlEXT(n.LOWER_LEFT_EXT,n.NEGATIVE_ONE_TO_ONE_EXT),r=e;let i=o;o=null,this.setClear(i)}},getReversed:function(){return r},setTest:function(t){t?H(e.DEPTH_TEST):ne(e.DEPTH_TEST)},setMask:function(t){i!==t&&!n&&(e.depthMask(t),i=t)},setFunc:function(t){if(r&&(t=dt[t]),a!==t){switch(t){case 0:e.depthFunc(e.NEVER);break;case 1:e.depthFunc(e.ALWAYS);break;case 2:e.depthFunc(e.LESS);break;case 3:e.depthFunc(e.LEQUAL);break;case 4:e.depthFunc(e.EQUAL);break;case 5:e.depthFunc(e.GEQUAL);break;case 6:e.depthFunc(e.GREATER);break;case 7:e.depthFunc(e.NOTEQUAL);break;default:e.depthFunc(e.LEQUAL)}a=t}},setLocked:function(e){n=e},setClear:function(t){o!==t&&(o=t,r&&(t=1-t),e.clearDepth(t))},reset:function(){n=!1,i=null,a=null,o=null,r=!1}}}function i(){let t=!1,n=null,r=null,i=null,a=null,o=null,s=null,c=null,l=null;return{setTest:function(n){t||(n?H(e.STENCIL_TEST):ne(e.STENCIL_TEST))},setMask:function(r){n!==r&&!t&&(e.stencilMask(r),n=r)},setFunc:function(t,n,o){(r!==t||i!==n||a!==o)&&(e.stencilFunc(t,n,o),r=t,i=n,a=o)},setOp:function(t,n,r){(o!==t||s!==n||c!==r)&&(e.stencilOp(t,n,r),o=t,s=n,c=r)},setLocked:function(e){t=e},setClear:function(t){l!==t&&(e.clearStencil(t),l=t)},reset:function(){t=!1,n=null,r=null,i=null,a=null,o=null,s=null,c=null,l=null}}}let a=new n,o=new r,s=new i,c=new WeakMap,l=new WeakMap,u={},d={},f={},p=new WeakMap,m=[],h=null,g=!1,_=null,v=null,y=null,b=null,x=null,S=null,C=null,w=new X(0,0,0),T=0,E=!1,D=null,O=null,k=null,A=null,j=null,M=e.getParameter(e.MAX_COMBINED_TEXTURE_IMAGE_UNITS),N=!1,P=0,F=e.getParameter(e.VERSION);F.indexOf(`WebGL`)===-1?F.indexOf(`OpenGL ES`)!==-1&&(P=parseFloat(/^OpenGL ES (\d)/.exec(F)[1]),N=P>=2):(P=parseFloat(/^WebGL (\d)/.exec(F)[1]),N=P>=1);let I=null,L={},R=e.getParameter(e.SCISSOR_BOX),z=e.getParameter(e.VIEWPORT),ee=new on().fromArray(R),B=new on().fromArray(z);function te(t,n,r,i){let a=new Uint8Array(4),o=e.createTexture();e.bindTexture(t,o),e.texParameteri(t,e.TEXTURE_MIN_FILTER,e.NEAREST),e.texParameteri(t,e.TEXTURE_MAG_FILTER,e.NEAREST);for(let o=0;o<r;o++)t===e.TEXTURE_3D||t===e.TEXTURE_2D_ARRAY?e.texImage3D(n,0,e.RGBA,1,1,i,0,e.RGBA,e.UNSIGNED_BYTE,a):e.texImage2D(n+o,0,e.RGBA,1,1,0,e.RGBA,e.UNSIGNED_BYTE,a);return o}let V={};V[e.TEXTURE_2D]=te(e.TEXTURE_2D,e.TEXTURE_2D,1),V[e.TEXTURE_CUBE_MAP]=te(e.TEXTURE_CUBE_MAP,e.TEXTURE_CUBE_MAP_POSITIVE_X,6),V[e.TEXTURE_2D_ARRAY]=te(e.TEXTURE_2D_ARRAY,e.TEXTURE_2D_ARRAY,1,1),V[e.TEXTURE_3D]=te(e.TEXTURE_3D,e.TEXTURE_3D,1,1),a.setClear(0,0,0,1),o.setClear(1),s.setClear(0),H(e.DEPTH_TEST),o.setFunc(3),ue(!1),U(1),H(e.CULL_FACE),ce(0);function H(t){u[t]!==!0&&(e.enable(t),u[t]=!0)}function ne(t){u[t]!==!1&&(e.disable(t),u[t]=!1)}function re(t,n){return f[t]!==n&&(e.bindFramebuffer(t,n),f[t]=n,t===e.DRAW_FRAMEBUFFER&&(f[e.FRAMEBUFFER]=n),t===e.FRAMEBUFFER&&(f[e.DRAW_FRAMEBUFFER]=n),!0)}function ie(t,n){let r=m,i=!1;if(t){r=p.get(n),r===void 0&&(r=[],p.set(n,r));let a=t.textures;if(r.length!==a.length||r[0]!==e.COLOR_ATTACHMENT0){for(let t=0,n=a.length;t<n;t++)r[t]=e.COLOR_ATTACHMENT0+t;r.length=a.length,i=!0}}else r[0]!==e.BACK&&(r[0]=e.BACK,i=!0);i&&e.drawBuffers(r)}function ae(t){return h!==t&&(e.useProgram(t),h=t,!0)}let oe={100:e.FUNC_ADD,101:e.FUNC_SUBTRACT,102:e.FUNC_REVERSE_SUBTRACT};oe[103]=e.MIN,oe[104]=e.MAX;let se={200:e.ZERO,201:e.ONE,202:e.SRC_COLOR,204:e.SRC_ALPHA,210:e.SRC_ALPHA_SATURATE,208:e.DST_COLOR,206:e.DST_ALPHA,203:e.ONE_MINUS_SRC_COLOR,205:e.ONE_MINUS_SRC_ALPHA,209:e.ONE_MINUS_DST_COLOR,207:e.ONE_MINUS_DST_ALPHA,211:e.CONSTANT_COLOR,212:e.ONE_MINUS_CONSTANT_COLOR,213:e.CONSTANT_ALPHA,214:e.ONE_MINUS_CONSTANT_ALPHA};function ce(t,n,r,i,a,o,s,c,l,u){if(t===0){g===!0&&(ne(e.BLEND),g=!1);return}if(g===!1&&(H(e.BLEND),g=!0),t!==5){if(t!==_||u!==E){if((v!==100||x!==100)&&(e.blendEquation(e.FUNC_ADD),v=100,x=100),u)switch(t){case 1:e.blendFuncSeparate(e.ONE,e.ONE_MINUS_SRC_ALPHA,e.ONE,e.ONE_MINUS_SRC_ALPHA);break;case 2:e.blendFunc(e.ONE,e.ONE);break;case 3:e.blendFuncSeparate(e.ZERO,e.ONE_MINUS_SRC_COLOR,e.ZERO,e.ONE);break;case 4:e.blendFuncSeparate(e.DST_COLOR,e.ONE_MINUS_SRC_ALPHA,e.ZERO,e.ONE);break;default:q(`WebGLState: Invalid blending: `,t)}else switch(t){case 1:e.blendFuncSeparate(e.SRC_ALPHA,e.ONE_MINUS_SRC_ALPHA,e.ONE,e.ONE_MINUS_SRC_ALPHA);break;case 2:e.blendFuncSeparate(e.SRC_ALPHA,e.ONE,e.ONE,e.ONE);break;case 3:q(`WebGLState: SubtractiveBlending requires material.premultipliedAlpha = true`);break;case 4:q(`WebGLState: MultiplyBlending requires material.premultipliedAlpha = true`);break;default:q(`WebGLState: Invalid blending: `,t)}y=null,b=null,S=null,C=null,w.set(0,0,0),T=0,_=t,E=u}return}a||=n,o||=r,s||=i,(n!==v||a!==x)&&(e.blendEquationSeparate(oe[n],oe[a]),v=n,x=a),(r!==y||i!==b||o!==S||s!==C)&&(e.blendFuncSeparate(se[r],se[i],se[o],se[s]),y=r,b=i,S=o,C=s),(c.equals(w)===!1||l!==T)&&(e.blendColor(c.r,c.g,c.b,l),w.copy(c),T=l),_=t,E=!1}function le(t,n){t.side===2?ne(e.CULL_FACE):H(e.CULL_FACE);let r=t.side===1;n&&(r=!r),ue(r),t.blending===1&&t.transparent===!1?ce(0):ce(t.blending,t.blendEquation,t.blendSrc,t.blendDst,t.blendEquationAlpha,t.blendSrcAlpha,t.blendDstAlpha,t.blendColor,t.blendAlpha,t.premultipliedAlpha),o.setFunc(t.depthFunc),o.setTest(t.depthTest),o.setMask(t.depthWrite),a.setMask(t.colorWrite);let i=t.stencilWrite;s.setTest(i),i&&(s.setMask(t.stencilWriteMask),s.setFunc(t.stencilFunc,t.stencilRef,t.stencilFuncMask),s.setOp(t.stencilFail,t.stencilZFail,t.stencilZPass)),fe(t.polygonOffset,t.polygonOffsetFactor,t.polygonOffsetUnits),t.alphaToCoverage===!0?H(e.SAMPLE_ALPHA_TO_COVERAGE):ne(e.SAMPLE_ALPHA_TO_COVERAGE)}function ue(t){D!==t&&(t?e.frontFace(e.CW):e.frontFace(e.CCW),D=t)}function U(t){t===0?ne(e.CULL_FACE):(H(e.CULL_FACE),t!==O&&(t===1?e.cullFace(e.BACK):t===2?e.cullFace(e.FRONT):e.cullFace(e.FRONT_AND_BACK))),O=t}function de(t){t!==k&&(N&&e.lineWidth(t),k=t)}function fe(t,n,r){t?(H(e.POLYGON_OFFSET_FILL),(A!==n||j!==r)&&(A=n,j=r,o.getReversed()&&(n=-n),e.polygonOffset(n,r))):ne(e.POLYGON_OFFSET_FILL)}function pe(t){t?H(e.SCISSOR_TEST):ne(e.SCISSOR_TEST)}function me(t){t===void 0&&(t=e.TEXTURE0+M-1),I!==t&&(e.activeTexture(t),I=t)}function he(t,n,r){r===void 0&&(r=I===null?e.TEXTURE0+M-1:I);let i=L[r];i===void 0&&(i={type:void 0,texture:void 0},L[r]=i),(i.type!==t||i.texture!==n)&&(I!==r&&(e.activeTexture(r),I=r),e.bindTexture(t,n||V[t]),i.type=t,i.texture=n)}function ge(){let t=L[I];t!==void 0&&t.type!==void 0&&(e.bindTexture(t.type,null),t.type=void 0,t.texture=void 0)}function _e(){try{e.compressedTexImage2D(...arguments)}catch(e){q(`WebGLState:`,e)}}function ve(){try{e.compressedTexImage3D(...arguments)}catch(e){q(`WebGLState:`,e)}}function ye(){try{e.texSubImage2D(...arguments)}catch(e){q(`WebGLState:`,e)}}function be(){try{e.texSubImage3D(...arguments)}catch(e){q(`WebGLState:`,e)}}function xe(){try{e.compressedTexSubImage2D(...arguments)}catch(e){q(`WebGLState:`,e)}}function Se(){try{e.compressedTexSubImage3D(...arguments)}catch(e){q(`WebGLState:`,e)}}function Ce(){try{e.texStorage2D(...arguments)}catch(e){q(`WebGLState:`,e)}}function we(){try{e.texStorage3D(...arguments)}catch(e){q(`WebGLState:`,e)}}function W(){try{e.texImage2D(...arguments)}catch(e){q(`WebGLState:`,e)}}function Te(){try{e.texImage3D(...arguments)}catch(e){q(`WebGLState:`,e)}}function Ee(t){return d[t]===void 0?e.getParameter(t):d[t]}function De(t,n){d[t]!==n&&(e.pixelStorei(t,n),d[t]=n)}function G(t){ee.equals(t)===!1&&(e.scissor(t.x,t.y,t.z,t.w),ee.copy(t))}function Oe(t){B.equals(t)===!1&&(e.viewport(t.x,t.y,t.z,t.w),B.copy(t))}function ke(t,n){let r=l.get(n);r===void 0&&(r=new WeakMap,l.set(n,r));let i=r.get(t);i===void 0&&(i=e.getUniformBlockIndex(n,t.name),r.set(t,i))}function Ae(t,n){let r=l.get(n).get(t);c.get(n)!==r&&(e.uniformBlockBinding(n,r,t.__bindingPointIndex),c.set(n,r))}function je(){e.disable(e.BLEND),e.disable(e.CULL_FACE),e.disable(e.DEPTH_TEST),e.disable(e.POLYGON_OFFSET_FILL),e.disable(e.SCISSOR_TEST),e.disable(e.STENCIL_TEST),e.disable(e.SAMPLE_ALPHA_TO_COVERAGE),e.blendEquation(e.FUNC_ADD),e.blendFunc(e.ONE,e.ZERO),e.blendFuncSeparate(e.ONE,e.ZERO,e.ONE,e.ZERO),e.blendColor(0,0,0,0),e.colorMask(!0,!0,!0,!0),e.clearColor(0,0,0,0),e.depthMask(!0),e.depthFunc(e.LESS),o.setReversed(!1),e.clearDepth(1),e.stencilMask(4294967295),e.stencilFunc(e.ALWAYS,0,4294967295),e.stencilOp(e.KEEP,e.KEEP,e.KEEP),e.clearStencil(0),e.cullFace(e.BACK),e.frontFace(e.CCW),e.polygonOffset(0,0),e.activeTexture(e.TEXTURE0),e.bindFramebuffer(e.FRAMEBUFFER,null),e.bindFramebuffer(e.DRAW_FRAMEBUFFER,null),e.bindFramebuffer(e.READ_FRAMEBUFFER,null),e.useProgram(null),e.lineWidth(1),e.scissor(0,0,e.canvas.width,e.canvas.height),e.viewport(0,0,e.canvas.width,e.canvas.height),e.pixelStorei(e.PACK_ALIGNMENT,4),e.pixelStorei(e.UNPACK_ALIGNMENT,4),e.pixelStorei(e.UNPACK_FLIP_Y_WEBGL,!1),e.pixelStorei(e.UNPACK_PREMULTIPLY_ALPHA_WEBGL,!1),e.pixelStorei(e.UNPACK_COLORSPACE_CONVERSION_WEBGL,e.BROWSER_DEFAULT_WEBGL),e.pixelStorei(e.PACK_ROW_LENGTH,0),e.pixelStorei(e.PACK_SKIP_PIXELS,0),e.pixelStorei(e.PACK_SKIP_ROWS,0),e.pixelStorei(e.UNPACK_ROW_LENGTH,0),e.pixelStorei(e.UNPACK_IMAGE_HEIGHT,0),e.pixelStorei(e.UNPACK_SKIP_PIXELS,0),e.pixelStorei(e.UNPACK_SKIP_ROWS,0),e.pixelStorei(e.UNPACK_SKIP_IMAGES,0),u={},d={},I=null,L={},f={},p=new WeakMap,m=[],h=null,g=!1,_=null,v=null,y=null,b=null,x=null,S=null,C=null,w=new X(0,0,0),T=0,E=!1,D=null,O=null,k=null,A=null,j=null,ee.set(0,0,e.canvas.width,e.canvas.height),B.set(0,0,e.canvas.width,e.canvas.height),a.reset(),o.reset(),s.reset()}return{buffers:{color:a,depth:o,stencil:s},enable:H,disable:ne,bindFramebuffer:re,drawBuffers:ie,useProgram:ae,setBlending:ce,setMaterial:le,setFlipSided:ue,setCullFace:U,setLineWidth:de,setPolygonOffset:fe,setScissorTest:pe,activeTexture:me,bindTexture:he,unbindTexture:ge,compressedTexImage2D:_e,compressedTexImage3D:ve,texImage2D:W,texImage3D:Te,pixelStorei:De,getParameter:Ee,updateUBOMapping:ke,uniformBlockBinding:Ae,texStorage2D:Ce,texStorage3D:we,texSubImage2D:ye,texSubImage3D:be,compressedTexSubImage2D:xe,compressedTexSubImage3D:Se,scissor:G,viewport:Oe,reset:je}}function Al(e,t,n,r,i,a,o){let s=t.has(`WEBGL_multisampled_render_to_texture`)?t.get(`WEBGL_multisampled_render_to_texture`):null,c=typeof navigator>`u`?!1:/OculusBrowser/g.test(navigator.userAgent),l=new J,u=new WeakMap,d=new Set,f,p=new WeakMap,m=!1;try{m=typeof OffscreenCanvas<`u`&&new OffscreenCanvas(1,1).getContext(`2d`)!==null}catch{}function h(e,t){return m?new OffscreenCanvas(e,t):it(`canvas`)}function g(e,t,n){let r=1,i=Ee(e);if((i.width>n||i.height>n)&&(r=n/Math.max(i.width,i.height)),r<1){if(typeof HTMLImageElement<`u`&&e instanceof HTMLImageElement||typeof HTMLCanvasElement<`u`&&e instanceof HTMLCanvasElement||typeof ImageBitmap<`u`&&e instanceof ImageBitmap||typeof VideoFrame<`u`&&e instanceof VideoFrame){let n=Math.floor(r*i.width),a=Math.floor(r*i.height);f===void 0&&(f=h(n,a));let o=t?h(n,a):f;return o.width=n,o.height=a,o.getContext(`2d`).drawImage(e,0,0,n,a),K(`WebGLRenderer: Texture has been resized from (`+i.width+`x`+i.height+`) to (`+n+`x`+a+`).`),o}return`data`in e&&K(`WebGLRenderer: Image in DataTexture is too big (`+i.width+`x`+i.height+`).`),e}return e}function _(e){return e.generateMipmaps}function v(t){e.generateMipmap(t)}function O(t){return t.isWebGLCubeRenderTarget?e.TEXTURE_CUBE_MAP:t.isWebGL3DRenderTarget?e.TEXTURE_3D:t.isWebGLArrayRenderTarget||t.isCompressedArrayTexture?e.TEXTURE_2D_ARRAY:e.TEXTURE_2D}function k(n,r,i,a,o,s=!1){if(n!==null){if(e[n]!==void 0)return e[n];K(`WebGLRenderer: Attempt to use non-existing WebGL internal format '`+n+`'`)}let c;a&&(c=t.get(`EXT_texture_norm16`),c||K(`WebGLRenderer: Unable to use normalized textures without EXT_texture_norm16 extension`));let l=r;if(r===e.RED&&(i===e.FLOAT&&(l=e.R32F),i===e.HALF_FLOAT&&(l=e.R16F),i===e.UNSIGNED_BYTE&&(l=e.R8),i===e.UNSIGNED_SHORT&&c&&(l=c.R16_EXT),i===e.SHORT&&c&&(l=c.R16_SNORM_EXT)),r===e.RED_INTEGER&&(i===e.UNSIGNED_BYTE&&(l=e.R8UI),i===e.UNSIGNED_SHORT&&(l=e.R16UI),i===e.UNSIGNED_INT&&(l=e.R32UI),i===e.BYTE&&(l=e.R8I),i===e.SHORT&&(l=e.R16I),i===e.INT&&(l=e.R32I)),r===e.RG&&(i===e.FLOAT&&(l=e.RG32F),i===e.HALF_FLOAT&&(l=e.RG16F),i===e.UNSIGNED_BYTE&&(l=e.RG8),i===e.UNSIGNED_SHORT&&c&&(l=c.RG16_EXT),i===e.SHORT&&c&&(l=c.RG16_SNORM_EXT)),r===e.RG_INTEGER&&(i===e.UNSIGNED_BYTE&&(l=e.RG8UI),i===e.UNSIGNED_SHORT&&(l=e.RG16UI),i===e.UNSIGNED_INT&&(l=e.RG32UI),i===e.BYTE&&(l=e.RG8I),i===e.SHORT&&(l=e.RG16I),i===e.INT&&(l=e.RG32I)),r===e.RGB_INTEGER&&(i===e.UNSIGNED_BYTE&&(l=e.RGB8UI),i===e.UNSIGNED_SHORT&&(l=e.RGB16UI),i===e.UNSIGNED_INT&&(l=e.RGB32UI),i===e.BYTE&&(l=e.RGB8I),i===e.SHORT&&(l=e.RGB16I),i===e.INT&&(l=e.RGB32I)),r===e.RGBA_INTEGER&&(i===e.UNSIGNED_BYTE&&(l=e.RGBA8UI),i===e.UNSIGNED_SHORT&&(l=e.RGBA16UI),i===e.UNSIGNED_INT&&(l=e.RGBA32UI),i===e.BYTE&&(l=e.RGBA8I),i===e.SHORT&&(l=e.RGBA16I),i===e.INT&&(l=e.RGBA32I)),r===e.RGB&&(i===e.UNSIGNED_SHORT&&c&&(l=c.RGB16_EXT),i===e.SHORT&&c&&(l=c.RGB16_SNORM_EXT),i===e.UNSIGNED_INT_5_9_9_9_REV&&(l=e.RGB9_E5),i===e.UNSIGNED_INT_10F_11F_11F_REV&&(l=e.R11F_G11F_B10F)),r===e.RGBA){let t=s?Ze:Jt.getTransfer(o);i===e.FLOAT&&(l=e.RGBA32F),i===e.HALF_FLOAT&&(l=e.RGBA16F),i===e.UNSIGNED_BYTE&&(l=t===`srgb`?e.SRGB8_ALPHA8:e.RGBA8),i===e.UNSIGNED_SHORT&&c&&(l=c.RGBA16_EXT),i===e.SHORT&&c&&(l=c.RGBA16_SNORM_EXT),i===e.UNSIGNED_SHORT_4_4_4_4&&(l=e.RGBA4),i===e.UNSIGNED_SHORT_5_5_5_1&&(l=e.RGB5_A1)}return(l===e.R16F||l===e.R32F||l===e.RG16F||l===e.RG32F||l===e.RGBA16F||l===e.RGBA32F)&&t.get(`EXT_color_buffer_float`),l}function A(t,n){let r;return t?n===null||n===1014||n===1020?r=e.DEPTH24_STENCIL8:n===1015?r=e.DEPTH32F_STENCIL8:n===1012&&(r=e.DEPTH24_STENCIL8,K(`DepthTexture: 16 bit depth attachment is not supported with stencil. Using 24-bit attachment.`)):n===null||n===1014||n===1020?r=e.DEPTH_COMPONENT24:n===1015?r=e.DEPTH_COMPONENT32F:n===1012&&(r=e.DEPTH_COMPONENT16),r}function j(e,t){return _(e)===!0||e.isFramebufferTexture&&e.minFilter!==1003&&e.minFilter!==1006?Math.log2(Math.max(t.width,t.height))+1:e.mipmaps!==void 0&&e.mipmaps.length>0?e.mipmaps.length:e.isCompressedTexture&&Array.isArray(e.image)?t.mipmaps.length:1}function M(e){let t=e.target;t.removeEventListener(`dispose`,M),P(t),t.isVideoTexture&&u.delete(t),t.isHTMLTexture&&d.delete(t)}function N(e){let t=e.target;t.removeEventListener(`dispose`,N),I(t)}function P(e){let t=r.get(e);if(t.__webglInit===void 0)return;let n=e.source,i=p.get(n);if(i){let r=i[t.__cacheKey];r.usedTimes--,r.usedTimes===0&&F(e),Object.keys(i).length===0&&p.delete(n)}r.remove(e)}function F(t){let n=r.get(t);e.deleteTexture(n.__webglTexture);let i=t.source,a=p.get(i);delete a[n.__cacheKey],o.memory.textures--}function I(t){let n=r.get(t);if(t.depthTexture&&(t.depthTexture.dispose(),r.remove(t.depthTexture)),t.isWebGLCubeRenderTarget)for(let t=0;t<6;t++){if(Array.isArray(n.__webglFramebuffer[t]))for(let r=0;r<n.__webglFramebuffer[t].length;r++)e.deleteFramebuffer(n.__webglFramebuffer[t][r]);else e.deleteFramebuffer(n.__webglFramebuffer[t]);n.__webglDepthbuffer&&e.deleteRenderbuffer(n.__webglDepthbuffer[t])}else{if(Array.isArray(n.__webglFramebuffer))for(let t=0;t<n.__webglFramebuffer.length;t++)e.deleteFramebuffer(n.__webglFramebuffer[t]);else e.deleteFramebuffer(n.__webglFramebuffer);if(n.__webglDepthbuffer&&e.deleteRenderbuffer(n.__webglDepthbuffer),n.__webglMultisampledFramebuffer&&e.deleteFramebuffer(n.__webglMultisampledFramebuffer),n.__webglColorRenderbuffer)for(let t=0;t<n.__webglColorRenderbuffer.length;t++)n.__webglColorRenderbuffer[t]&&e.deleteRenderbuffer(n.__webglColorRenderbuffer[t]);n.__webglDepthRenderbuffer&&e.deleteRenderbuffer(n.__webglDepthRenderbuffer)}let i=t.textures;for(let t=0,n=i.length;t<n;t++){let n=r.get(i[t]);n.__webglTexture&&(e.deleteTexture(n.__webglTexture),o.memory.textures--),r.remove(i[t])}r.remove(t)}let L=0;function R(){L=0}function z(){return L}function ee(e){L=e}function B(){let e=L;return e>=i.maxTextures&&K(`WebGLTextures: Trying to use `+(e+1)+` texture units while this GPU supports only `+i.maxTextures),L+=1,e}function te(e){let t=[];return t.push(e.wrapS),t.push(e.wrapT),t.push(e.wrapR||0),t.push(e.magFilter),t.push(e.minFilter),t.push(e.anisotropy),t.push(e.internalFormat),t.push(e.format),t.push(e.type),t.push(e.generateMipmaps),t.push(e.premultiplyAlpha),t.push(e.flipY),t.push(e.unpackAlignment),t.push(e.colorSpace),t.join()}function V(t,i){let a=r.get(t);if(t.isVideoTexture&&W(t),t.isRenderTargetTexture===!1&&t.isExternalTexture!==!0&&t.version>0&&a.__version!==t.version){let e=t.image;if(e===null)K(`WebGLRenderer: Texture marked for update but no image data found.`);else if(e.complete===!1)K(`WebGLRenderer: Texture marked for update but image is incomplete`);else{de(a,t,i);return}}else t.isExternalTexture&&(a.__webglTexture=t.sourceTexture?t.sourceTexture:null);n.bindTexture(e.TEXTURE_2D,a.__webglTexture,e.TEXTURE0+i)}function H(t,i){let a=r.get(t);if(t.isRenderTargetTexture===!1&&t.version>0&&a.__version!==t.version){de(a,t,i);return}t.isExternalTexture&&(a.__webglTexture=t.sourceTexture?t.sourceTexture:null),n.bindTexture(e.TEXTURE_2D_ARRAY,a.__webglTexture,e.TEXTURE0+i)}function re(t,i){let a=r.get(t);if(t.isRenderTargetTexture===!1&&t.version>0&&a.__version!==t.version){de(a,t,i);return}n.bindTexture(e.TEXTURE_3D,a.__webglTexture,e.TEXTURE0+i)}function ie(t,i){let a=r.get(t);if(t.isCubeDepthTexture!==!0&&t.version>0&&a.__version!==t.version){fe(a,t,i);return}n.bindTexture(e.TEXTURE_CUBE_MAP,a.__webglTexture,e.TEXTURE0+i)}let ae={[y]:e.REPEAT,[b]:e.CLAMP_TO_EDGE,[x]:e.MIRRORED_REPEAT},oe={[S]:e.NEAREST,[C]:e.NEAREST_MIPMAP_NEAREST,[w]:e.NEAREST_MIPMAP_LINEAR,[T]:e.LINEAR,[E]:e.LINEAR_MIPMAP_NEAREST,[D]:e.LINEAR_MIPMAP_LINEAR},se={512:e.NEVER,519:e.ALWAYS,513:e.LESS,515:e.LEQUAL,514:e.EQUAL,518:e.GEQUAL,516:e.GREATER,517:e.NOTEQUAL};function ce(n,a){if(a.type===1015&&t.has(`OES_texture_float_linear`)===!1&&(a.magFilter===1006||a.magFilter===1007||a.magFilter===1005||a.magFilter===1008||a.minFilter===1006||a.minFilter===1007||a.minFilter===1005||a.minFilter===1008)&&K(`WebGLRenderer: Unable to use linear filtering with floating point textures. OES_texture_float_linear not supported on this device.`),e.texParameteri(n,e.TEXTURE_WRAP_S,ae[a.wrapS]),e.texParameteri(n,e.TEXTURE_WRAP_T,ae[a.wrapT]),(n===e.TEXTURE_3D||n===e.TEXTURE_2D_ARRAY)&&e.texParameteri(n,e.TEXTURE_WRAP_R,ae[a.wrapR]),e.texParameteri(n,e.TEXTURE_MAG_FILTER,oe[a.magFilter]),e.texParameteri(n,e.TEXTURE_MIN_FILTER,oe[a.minFilter]),a.compareFunction&&(e.texParameteri(n,e.TEXTURE_COMPARE_MODE,e.COMPARE_REF_TO_TEXTURE),e.texParameteri(n,e.TEXTURE_COMPARE_FUNC,se[a.compareFunction])),t.has(`EXT_texture_filter_anisotropic`)===!0){if(a.magFilter===1003||a.minFilter!==1005&&a.minFilter!==1008||a.type===1015&&t.has(`OES_texture_float_linear`)===!1)return;if(a.anisotropy>1||r.get(a).__currentAnisotropy){let o=t.get(`EXT_texture_filter_anisotropic`);e.texParameterf(n,o.TEXTURE_MAX_ANISOTROPY_EXT,Math.min(a.anisotropy,i.getMaxAnisotropy())),r.get(a).__currentAnisotropy=a.anisotropy}}}function le(t,n){let r=!1;t.__webglInit===void 0&&(t.__webglInit=!0,n.addEventListener(`dispose`,M));let i=n.source,a=p.get(i);a===void 0&&(a={},p.set(i,a));let s=te(n);if(s!==t.__cacheKey){a[s]===void 0&&(a[s]={texture:e.createTexture(),usedTimes:0},o.memory.textures++,r=!0),a[s].usedTimes++;let i=a[t.__cacheKey];i!==void 0&&(a[t.__cacheKey].usedTimes--,i.usedTimes===0&&F(n)),t.__cacheKey=s,t.__webglTexture=a[s].texture}return r}function ue(e,t,n){return Math.floor(Math.floor(e/n)/t)}function U(t,r,i,a){let o=t.updateRanges;if(o.length===0)n.texSubImage2D(e.TEXTURE_2D,0,0,0,r.width,r.height,i,a,r.data);else{o.sort((e,t)=>e.start-t.start);let s=0;for(let e=1;e<o.length;e++){let t=o[s],n=o[e],i=t.start+t.count,a=ue(n.start,r.width,4),c=ue(t.start,r.width,4);n.start<=i+1&&a===c&&ue(n.start+n.count-1,r.width,4)===a?t.count=Math.max(t.count,n.start+n.count-t.start):(++s,o[s]=n)}o.length=s+1;let c=n.getParameter(e.UNPACK_ROW_LENGTH),l=n.getParameter(e.UNPACK_SKIP_PIXELS),u=n.getParameter(e.UNPACK_SKIP_ROWS);n.pixelStorei(e.UNPACK_ROW_LENGTH,r.width);for(let t=0,s=o.length;t<s;t++){let s=o[t],c=Math.floor(s.start/4),l=Math.ceil(s.count/4),u=c%r.width,d=Math.floor(c/r.width),f=l;n.pixelStorei(e.UNPACK_SKIP_PIXELS,u),n.pixelStorei(e.UNPACK_SKIP_ROWS,d),n.texSubImage2D(e.TEXTURE_2D,0,u,d,f,1,i,a,r.data)}t.clearUpdateRanges(),n.pixelStorei(e.UNPACK_ROW_LENGTH,c),n.pixelStorei(e.UNPACK_SKIP_PIXELS,l),n.pixelStorei(e.UNPACK_SKIP_ROWS,u)}}function de(t,o,s){let c=e.TEXTURE_2D;(o.isDataArrayTexture||o.isCompressedArrayTexture)&&(c=e.TEXTURE_2D_ARRAY),o.isData3DTexture&&(c=e.TEXTURE_3D);let l=le(t,o),u=o.source;n.bindTexture(c,t.__webglTexture,e.TEXTURE0+s);let f=r.get(u);if(u.version!==f.__version||l===!0){if(n.activeTexture(e.TEXTURE0+s),!(typeof ImageBitmap<`u`&&o.image instanceof ImageBitmap)){let t=Jt.getPrimaries(Jt.workingColorSpace),r=o.colorSpace===``?null:Jt.getPrimaries(o.colorSpace),i=o.colorSpace===``||t===r?e.NONE:e.BROWSER_DEFAULT_WEBGL;n.pixelStorei(e.UNPACK_FLIP_Y_WEBGL,o.flipY),n.pixelStorei(e.UNPACK_PREMULTIPLY_ALPHA_WEBGL,o.premultiplyAlpha),n.pixelStorei(e.UNPACK_COLORSPACE_CONVERSION_WEBGL,i)}n.pixelStorei(e.UNPACK_ALIGNMENT,o.unpackAlignment);let t=g(o.image,!1,i.maxTextureSize);t=Te(o,t);let r=a.convert(o.format,o.colorSpace),p=a.convert(o.type),m=k(o.internalFormat,r,p,o.normalized,o.colorSpace,o.isVideoTexture);ce(c,o);let h,y=o.mipmaps,b=o.isVideoTexture!==!0,x=f.__version===void 0||l===!0,S=u.dataReady,C=j(o,t);if(o.isDepthTexture)m=A(o.format===ne,o.type),x&&(b?n.texStorage2D(e.TEXTURE_2D,1,m,t.width,t.height):n.texImage2D(e.TEXTURE_2D,0,m,t.width,t.height,0,r,p,null));else if(o.isDataTexture){if(y.length>0){b&&x&&n.texStorage2D(e.TEXTURE_2D,C,m,y[0].width,y[0].height);for(let t=0,i=y.length;t<i;t++)h=y[t],b?S&&n.texSubImage2D(e.TEXTURE_2D,t,0,0,h.width,h.height,r,p,h.data):n.texImage2D(e.TEXTURE_2D,t,m,h.width,h.height,0,r,p,h.data);o.generateMipmaps=!1}else b?(x&&n.texStorage2D(e.TEXTURE_2D,C,m,t.width,t.height),S&&U(o,t,r,p)):n.texImage2D(e.TEXTURE_2D,0,m,t.width,t.height,0,r,p,t.data)}else if(o.isCompressedTexture){if(o.isCompressedArrayTexture){b&&x&&n.texStorage3D(e.TEXTURE_2D_ARRAY,C,m,y[0].width,y[0].height,t.depth);for(let i=0,a=y.length;i<a;i++)if(h=y[i],o.format!==1023){if(r!==null){if(b){if(S){if(o.layerUpdates.size>0){let t=wo(h.width,h.height,o.format,o.type);for(let a of o.layerUpdates){let o=h.data.subarray(a*t/h.data.BYTES_PER_ELEMENT,(a+1)*t/h.data.BYTES_PER_ELEMENT);n.compressedTexSubImage3D(e.TEXTURE_2D_ARRAY,i,0,0,a,h.width,h.height,1,r,o)}}else n.compressedTexSubImage3D(e.TEXTURE_2D_ARRAY,i,0,0,0,h.width,h.height,t.depth,r,h.data)}}else n.compressedTexImage3D(e.TEXTURE_2D_ARRAY,i,m,h.width,h.height,t.depth,0,h.data,0,0)}else K(`WebGLRenderer: Attempt to load unsupported compressed texture format in .uploadTexture()`)}else b?S&&n.texSubImage3D(e.TEXTURE_2D_ARRAY,i,0,0,0,h.width,h.height,t.depth,r,p,h.data):n.texImage3D(e.TEXTURE_2D_ARRAY,i,m,h.width,h.height,t.depth,0,r,p,h.data);o.layerUpdates.size>0&&o.clearLayerUpdates()}else{b&&x&&n.texStorage2D(e.TEXTURE_2D,C,m,y[0].width,y[0].height);for(let t=0,i=y.length;t<i;t++)h=y[t],o.format===1023?b?S&&n.texSubImage2D(e.TEXTURE_2D,t,0,0,h.width,h.height,r,p,h.data):n.texImage2D(e.TEXTURE_2D,t,m,h.width,h.height,0,r,p,h.data):r===null?K(`WebGLRenderer: Attempt to load unsupported compressed texture format in .uploadTexture()`):b?S&&n.compressedTexSubImage2D(e.TEXTURE_2D,t,0,0,h.width,h.height,r,h.data):n.compressedTexImage2D(e.TEXTURE_2D,t,m,h.width,h.height,0,h.data)}}else if(o.isDataArrayTexture){if(b){if(x&&n.texStorage3D(e.TEXTURE_2D_ARRAY,C,m,t.width,t.height,t.depth),S){if(o.layerUpdates.size>0){let i=wo(t.width,t.height,o.format,o.type);for(let a of o.layerUpdates){let o=t.data.subarray(a*i/t.data.BYTES_PER_ELEMENT,(a+1)*i/t.data.BYTES_PER_ELEMENT);n.texSubImage3D(e.TEXTURE_2D_ARRAY,0,0,0,a,t.width,t.height,1,r,p,o)}o.clearLayerUpdates()}else n.texSubImage3D(e.TEXTURE_2D_ARRAY,0,0,0,0,t.width,t.height,t.depth,r,p,t.data)}}else n.texImage3D(e.TEXTURE_2D_ARRAY,0,m,t.width,t.height,t.depth,0,r,p,t.data)}else if(o.isData3DTexture)b?(x&&n.texStorage3D(e.TEXTURE_3D,C,m,t.width,t.height,t.depth),S&&n.texSubImage3D(e.TEXTURE_3D,0,0,0,0,t.width,t.height,t.depth,r,p,t.data)):n.texImage3D(e.TEXTURE_3D,0,m,t.width,t.height,t.depth,0,r,p,t.data);else if(o.isFramebufferTexture){if(x){if(b)n.texStorage2D(e.TEXTURE_2D,C,m,t.width,t.height);else{let i=t.width,a=t.height;for(let t=0;t<C;t++)n.texImage2D(e.TEXTURE_2D,t,m,i,a,0,r,p,null),i>>=1,a>>=1}}}else if(o.isHTMLTexture){if(`texElementImage2D`in e){let n=e.canvas;if(n.hasAttribute(`layoutsubtree`)||n.setAttribute(`layoutsubtree`,`true`),t.parentNode!==n){n.appendChild(t),d.add(o),n.onpaint=e=>{let t=e.changedElements;for(let e of d)t.includes(e.image)&&(e.needsUpdate=!0)},n.requestPaint();return}if(e.texElementImage2D.length===3)e.texElementImage2D(e.TEXTURE_2D,e.RGBA8,t);else{let n=e.RGBA,r=e.RGBA,i=e.UNSIGNED_BYTE;e.texElementImage2D(e.TEXTURE_2D,0,n,r,i,t)}e.texParameteri(e.TEXTURE_2D,e.TEXTURE_MIN_FILTER,e.LINEAR),e.texParameteri(e.TEXTURE_2D,e.TEXTURE_WRAP_S,e.CLAMP_TO_EDGE),e.texParameteri(e.TEXTURE_2D,e.TEXTURE_WRAP_T,e.CLAMP_TO_EDGE)}}else if(y.length>0){if(b&&x){let t=Ee(y[0]);n.texStorage2D(e.TEXTURE_2D,C,m,t.width,t.height)}for(let t=0,i=y.length;t<i;t++)h=y[t],b?S&&n.texSubImage2D(e.TEXTURE_2D,t,0,0,r,p,h):n.texImage2D(e.TEXTURE_2D,t,m,r,p,h);o.generateMipmaps=!1}else if(b){if(x){let r=Ee(t);n.texStorage2D(e.TEXTURE_2D,C,m,r.width,r.height)}S&&n.texSubImage2D(e.TEXTURE_2D,0,0,0,r,p,t)}else n.texImage2D(e.TEXTURE_2D,0,m,r,p,t);_(o)&&v(c),f.__version=u.version,o.onUpdate&&o.onUpdate(o)}t.__version=o.version}function fe(t,o,s){if(o.image.length!==6)return;let c=le(t,o),l=o.source;n.bindTexture(e.TEXTURE_CUBE_MAP,t.__webglTexture,e.TEXTURE0+s);let u=r.get(l);if(l.version!==u.__version||c===!0){n.activeTexture(e.TEXTURE0+s);let t=Jt.getPrimaries(Jt.workingColorSpace),r=o.colorSpace===``?null:Jt.getPrimaries(o.colorSpace),d=o.colorSpace===``||t===r?e.NONE:e.BROWSER_DEFAULT_WEBGL;n.pixelStorei(e.UNPACK_FLIP_Y_WEBGL,o.flipY),n.pixelStorei(e.UNPACK_PREMULTIPLY_ALPHA_WEBGL,o.premultiplyAlpha),n.pixelStorei(e.UNPACK_ALIGNMENT,o.unpackAlignment),n.pixelStorei(e.UNPACK_COLORSPACE_CONVERSION_WEBGL,d);let f=o.isCompressedTexture||o.image[0].isCompressedTexture,p=o.image[0]&&o.image[0].isDataTexture,m=[];for(let e=0;e<6;e++)!f&&!p?m[e]=g(o.image[e],!0,i.maxCubemapSize):m[e]=p?o.image[e].image:o.image[e],m[e]=Te(o,m[e]);let h=m[0],y=a.convert(o.format,o.colorSpace),b=a.convert(o.type),x=k(o.internalFormat,y,b,o.normalized,o.colorSpace),S=o.isVideoTexture!==!0,C=u.__version===void 0||c===!0,w=l.dataReady,T=j(o,h);ce(e.TEXTURE_CUBE_MAP,o);let E;if(f){S&&C&&n.texStorage2D(e.TEXTURE_CUBE_MAP,T,x,h.width,h.height);for(let t=0;t<6;t++){E=m[t].mipmaps;for(let r=0;r<E.length;r++){let i=E[r];o.format===1023?S?w&&n.texSubImage2D(e.TEXTURE_CUBE_MAP_POSITIVE_X+t,r,0,0,i.width,i.height,y,b,i.data):n.texImage2D(e.TEXTURE_CUBE_MAP_POSITIVE_X+t,r,x,i.width,i.height,0,y,b,i.data):y===null?K(`WebGLRenderer: Attempt to load unsupported compressed texture format in .setTextureCube()`):S?w&&n.compressedTexSubImage2D(e.TEXTURE_CUBE_MAP_POSITIVE_X+t,r,0,0,i.width,i.height,y,i.data):n.compressedTexImage2D(e.TEXTURE_CUBE_MAP_POSITIVE_X+t,r,x,i.width,i.height,0,i.data)}}}else{if(E=o.mipmaps,S&&C){E.length>0&&T++;let t=Ee(m[0]);n.texStorage2D(e.TEXTURE_CUBE_MAP,T,x,t.width,t.height)}for(let t=0;t<6;t++)if(p){S?w&&n.texSubImage2D(e.TEXTURE_CUBE_MAP_POSITIVE_X+t,0,0,0,m[t].width,m[t].height,y,b,m[t].data):n.texImage2D(e.TEXTURE_CUBE_MAP_POSITIVE_X+t,0,x,m[t].width,m[t].height,0,y,b,m[t].data);for(let r=0;r<E.length;r++){let i=E[r].image[t].image;S?w&&n.texSubImage2D(e.TEXTURE_CUBE_MAP_POSITIVE_X+t,r+1,0,0,i.width,i.height,y,b,i.data):n.texImage2D(e.TEXTURE_CUBE_MAP_POSITIVE_X+t,r+1,x,i.width,i.height,0,y,b,i.data)}}else{S?w&&n.texSubImage2D(e.TEXTURE_CUBE_MAP_POSITIVE_X+t,0,0,0,y,b,m[t]):n.texImage2D(e.TEXTURE_CUBE_MAP_POSITIVE_X+t,0,x,y,b,m[t]);for(let r=0;r<E.length;r++){let i=E[r];S?w&&n.texSubImage2D(e.TEXTURE_CUBE_MAP_POSITIVE_X+t,r+1,0,0,y,b,i.image[t]):n.texImage2D(e.TEXTURE_CUBE_MAP_POSITIVE_X+t,r+1,x,y,b,i.image[t])}}}_(o)&&v(e.TEXTURE_CUBE_MAP),u.__version=l.version,o.onUpdate&&o.onUpdate(o)}t.__version=o.version}function pe(t,i,o,c,l,u){let d=a.convert(o.format,o.colorSpace),f=a.convert(o.type),p=k(o.internalFormat,d,f,o.normalized,o.colorSpace),m=r.get(i),h=r.get(o);if(h.__renderTarget=i,!m.__hasExternalTextures){let t=Math.max(1,i.width>>u),r=Math.max(1,i.height>>u);l===e.TEXTURE_3D||l===e.TEXTURE_2D_ARRAY?n.texImage3D(l,u,p,t,r,i.depth,0,d,f,null):n.texImage2D(l,u,p,t,r,0,d,f,null)}n.bindFramebuffer(e.FRAMEBUFFER,t),we(i)?s.framebufferTexture2DMultisampleEXT(e.FRAMEBUFFER,c,l,h.__webglTexture,0,Ce(i)):(l===e.TEXTURE_2D||l>=e.TEXTURE_CUBE_MAP_POSITIVE_X&&l<=e.TEXTURE_CUBE_MAP_NEGATIVE_Z)&&e.framebufferTexture2D(e.FRAMEBUFFER,c,l,h.__webglTexture,u),n.bindFramebuffer(e.FRAMEBUFFER,null)}function me(t,n,r){if(e.bindRenderbuffer(e.RENDERBUFFER,t),n.depthBuffer){let i=n.depthTexture,a=i&&i.isDepthTexture?i.type:null,o=A(n.stencilBuffer,a),c=n.stencilBuffer?e.DEPTH_STENCIL_ATTACHMENT:e.DEPTH_ATTACHMENT;we(n)?s.renderbufferStorageMultisampleEXT(e.RENDERBUFFER,Ce(n),o,n.width,n.height):r?e.renderbufferStorageMultisample(e.RENDERBUFFER,Ce(n),o,n.width,n.height):e.renderbufferStorage(e.RENDERBUFFER,o,n.width,n.height),e.framebufferRenderbuffer(e.FRAMEBUFFER,c,e.RENDERBUFFER,t)}else{let t=n.textures;for(let i=0;i<t.length;i++){let o=t[i],c=a.convert(o.format,o.colorSpace),l=a.convert(o.type),u=k(o.internalFormat,c,l,o.normalized,o.colorSpace);we(n)?s.renderbufferStorageMultisampleEXT(e.RENDERBUFFER,Ce(n),u,n.width,n.height):r?e.renderbufferStorageMultisample(e.RENDERBUFFER,Ce(n),u,n.width,n.height):e.renderbufferStorage(e.RENDERBUFFER,u,n.width,n.height)}}e.bindRenderbuffer(e.RENDERBUFFER,null)}function he(t,i,o){let c=i.isWebGLCubeRenderTarget===!0;if(n.bindFramebuffer(e.FRAMEBUFFER,t),!(i.depthTexture&&i.depthTexture.isDepthTexture))throw Error(`THREE.WebGLTextures: renderTarget.depthTexture must be an instance of THREE.DepthTexture.`);let l=r.get(i.depthTexture);if(l.__renderTarget=i,(!l.__webglTexture||i.depthTexture.image.width!==i.width||i.depthTexture.image.height!==i.height)&&(i.depthTexture.image.width=i.width,i.depthTexture.image.height=i.height,i.depthTexture.needsUpdate=!0),c){if(l.__webglInit===void 0&&(l.__webglInit=!0,i.depthTexture.addEventListener(`dispose`,M)),l.__webglTexture===void 0){l.__webglTexture=e.createTexture(),n.bindTexture(e.TEXTURE_CUBE_MAP,l.__webglTexture),ce(e.TEXTURE_CUBE_MAP,i.depthTexture);let t=a.convert(i.depthTexture.format),r=a.convert(i.depthTexture.type),o;i.depthTexture.format===1026?o=e.DEPTH_COMPONENT24:i.depthTexture.format===1027&&(o=e.DEPTH24_STENCIL8);for(let n=0;n<6;n++)e.texImage2D(e.TEXTURE_CUBE_MAP_POSITIVE_X+n,0,o,i.width,i.height,0,t,r,null)}}else V(i.depthTexture,0);let u=l.__webglTexture,d=Ce(i),f=c?e.TEXTURE_CUBE_MAP_POSITIVE_X+o:e.TEXTURE_2D,p=i.depthTexture.format===1027?e.DEPTH_STENCIL_ATTACHMENT:e.DEPTH_ATTACHMENT;if(i.depthTexture.format===1026)we(i)?s.framebufferTexture2DMultisampleEXT(e.FRAMEBUFFER,p,f,u,0,d):e.framebufferTexture2D(e.FRAMEBUFFER,p,f,u,0);else if(i.depthTexture.format===1027)we(i)?s.framebufferTexture2DMultisampleEXT(e.FRAMEBUFFER,p,f,u,0,d):e.framebufferTexture2D(e.FRAMEBUFFER,p,f,u,0);else throw Error(`THREE.WebGLTextures: Unknown depthTexture format.`)}function ge(t){let i=r.get(t),a=t.isWebGLCubeRenderTarget===!0;if(i.__boundDepthTexture!==t.depthTexture){let e=t.depthTexture;if(i.__depthDisposeCallback&&i.__depthDisposeCallback(),e){let t=()=>{delete i.__boundDepthTexture,delete i.__depthDisposeCallback,e.removeEventListener(`dispose`,t)};e.addEventListener(`dispose`,t),i.__depthDisposeCallback=t}i.__boundDepthTexture=e}if(t.depthTexture&&!i.__autoAllocateDepthBuffer){if(a)for(let e=0;e<6;e++)he(i.__webglFramebuffer[e],t,e);else{let e=t.texture.mipmaps;e&&e.length>0?he(i.__webglFramebuffer[0],t,0):he(i.__webglFramebuffer,t,0)}}else if(a){i.__webglDepthbuffer=[];for(let r=0;r<6;r++)if(n.bindFramebuffer(e.FRAMEBUFFER,i.__webglFramebuffer[r]),i.__webglDepthbuffer[r]===void 0)i.__webglDepthbuffer[r]=e.createRenderbuffer(),me(i.__webglDepthbuffer[r],t,!1);else{let n=t.stencilBuffer?e.DEPTH_STENCIL_ATTACHMENT:e.DEPTH_ATTACHMENT,a=i.__webglDepthbuffer[r];e.bindRenderbuffer(e.RENDERBUFFER,a),e.framebufferRenderbuffer(e.FRAMEBUFFER,n,e.RENDERBUFFER,a)}}else{let r=t.texture.mipmaps;if(r&&r.length>0?n.bindFramebuffer(e.FRAMEBUFFER,i.__webglFramebuffer[0]):n.bindFramebuffer(e.FRAMEBUFFER,i.__webglFramebuffer),i.__webglDepthbuffer===void 0)i.__webglDepthbuffer=e.createRenderbuffer(),me(i.__webglDepthbuffer,t,!1);else{let n=t.stencilBuffer?e.DEPTH_STENCIL_ATTACHMENT:e.DEPTH_ATTACHMENT,r=i.__webglDepthbuffer;e.bindRenderbuffer(e.RENDERBUFFER,r),e.framebufferRenderbuffer(e.FRAMEBUFFER,n,e.RENDERBUFFER,r)}}n.bindFramebuffer(e.FRAMEBUFFER,null)}function _e(t,n,i){let a=r.get(t);n!==void 0&&pe(a.__webglFramebuffer,t,t.texture,e.COLOR_ATTACHMENT0,e.TEXTURE_2D,0),i!==void 0&&ge(t)}function ve(t){let i=t.texture,s=r.get(t),c=r.get(i);t.addEventListener(`dispose`,N);let l=t.textures,u=t.isWebGLCubeRenderTarget===!0,d=l.length>1;if(d||(c.__webglTexture===void 0&&(c.__webglTexture=e.createTexture()),c.__version=i.version,o.memory.textures++),u){s.__webglFramebuffer=[];for(let t=0;t<6;t++)if(i.mipmaps&&i.mipmaps.length>0){s.__webglFramebuffer[t]=[];for(let n=0;n<i.mipmaps.length;n++)s.__webglFramebuffer[t][n]=e.createFramebuffer()}else s.__webglFramebuffer[t]=e.createFramebuffer()}else{if(i.mipmaps&&i.mipmaps.length>0){s.__webglFramebuffer=[];for(let t=0;t<i.mipmaps.length;t++)s.__webglFramebuffer[t]=e.createFramebuffer()}else s.__webglFramebuffer=e.createFramebuffer();if(d)for(let t=0,n=l.length;t<n;t++){let n=r.get(l[t]);n.__webglTexture===void 0&&(n.__webglTexture=e.createTexture(),o.memory.textures++)}if(t.samples>0&&we(t)===!1){s.__webglMultisampledFramebuffer=e.createFramebuffer(),s.__webglColorRenderbuffer=[],n.bindFramebuffer(e.FRAMEBUFFER,s.__webglMultisampledFramebuffer);for(let n=0;n<l.length;n++){let r=l[n];s.__webglColorRenderbuffer[n]=e.createRenderbuffer(),e.bindRenderbuffer(e.RENDERBUFFER,s.__webglColorRenderbuffer[n]);let i=a.convert(r.format,r.colorSpace),o=a.convert(r.type),c=k(r.internalFormat,i,o,r.normalized,r.colorSpace,t.isXRRenderTarget===!0),u=Ce(t);e.renderbufferStorageMultisample(e.RENDERBUFFER,u,c,t.width,t.height),e.framebufferRenderbuffer(e.FRAMEBUFFER,e.COLOR_ATTACHMENT0+n,e.RENDERBUFFER,s.__webglColorRenderbuffer[n])}e.bindRenderbuffer(e.RENDERBUFFER,null),t.depthBuffer&&(s.__webglDepthRenderbuffer=e.createRenderbuffer(),me(s.__webglDepthRenderbuffer,t,!0)),n.bindFramebuffer(e.FRAMEBUFFER,null)}}if(u){n.bindTexture(e.TEXTURE_CUBE_MAP,c.__webglTexture),ce(e.TEXTURE_CUBE_MAP,i);for(let n=0;n<6;n++)if(i.mipmaps&&i.mipmaps.length>0)for(let r=0;r<i.mipmaps.length;r++)pe(s.__webglFramebuffer[n][r],t,i,e.COLOR_ATTACHMENT0,e.TEXTURE_CUBE_MAP_POSITIVE_X+n,r);else pe(s.__webglFramebuffer[n],t,i,e.COLOR_ATTACHMENT0,e.TEXTURE_CUBE_MAP_POSITIVE_X+n,0);_(i)&&v(e.TEXTURE_CUBE_MAP),n.unbindTexture()}else if(d){for(let i=0,a=l.length;i<a;i++){let a=l[i],o=r.get(a),c=e.TEXTURE_2D;(t.isWebGL3DRenderTarget||t.isWebGLArrayRenderTarget)&&(c=t.isWebGL3DRenderTarget?e.TEXTURE_3D:e.TEXTURE_2D_ARRAY),n.bindTexture(c,o.__webglTexture),ce(c,a),pe(s.__webglFramebuffer,t,a,e.COLOR_ATTACHMENT0+i,c,0),_(a)&&v(c)}n.unbindTexture()}else{let r=e.TEXTURE_2D;if((t.isWebGL3DRenderTarget||t.isWebGLArrayRenderTarget)&&(r=t.isWebGL3DRenderTarget?e.TEXTURE_3D:e.TEXTURE_2D_ARRAY),n.bindTexture(r,c.__webglTexture),ce(r,i),i.mipmaps&&i.mipmaps.length>0)for(let n=0;n<i.mipmaps.length;n++)pe(s.__webglFramebuffer[n],t,i,e.COLOR_ATTACHMENT0,r,n);else pe(s.__webglFramebuffer,t,i,e.COLOR_ATTACHMENT0,r,0);_(i)&&v(r),n.unbindTexture()}t.depthBuffer&&ge(t)}function ye(e){let t=e.textures;for(let i=0,a=t.length;i<a;i++){let a=t[i];if(_(a)){let t=O(e),i=r.get(a).__webglTexture;n.bindTexture(t,i),v(t),n.unbindTexture()}}}let be=[],xe=[];function Se(t){if(t.samples>0){if(we(t)===!1){let i=t.textures,a=t.width,o=t.height,s=e.COLOR_BUFFER_BIT,l=t.stencilBuffer?e.DEPTH_STENCIL_ATTACHMENT:e.DEPTH_ATTACHMENT,u=r.get(t),d=i.length>1;if(d)for(let t=0;t<i.length;t++)n.bindFramebuffer(e.FRAMEBUFFER,u.__webglMultisampledFramebuffer),e.framebufferRenderbuffer(e.FRAMEBUFFER,e.COLOR_ATTACHMENT0+t,e.RENDERBUFFER,null),n.bindFramebuffer(e.FRAMEBUFFER,u.__webglFramebuffer),e.framebufferTexture2D(e.DRAW_FRAMEBUFFER,e.COLOR_ATTACHMENT0+t,e.TEXTURE_2D,null,0);n.bindFramebuffer(e.READ_FRAMEBUFFER,u.__webglMultisampledFramebuffer);let f=t.texture.mipmaps;f&&f.length>0?n.bindFramebuffer(e.DRAW_FRAMEBUFFER,u.__webglFramebuffer[0]):n.bindFramebuffer(e.DRAW_FRAMEBUFFER,u.__webglFramebuffer);for(let n=0;n<i.length;n++){if(t.resolveDepthBuffer&&(t.depthBuffer&&(s|=e.DEPTH_BUFFER_BIT),t.stencilBuffer&&t.resolveStencilBuffer&&(s|=e.STENCIL_BUFFER_BIT)),d){e.framebufferRenderbuffer(e.READ_FRAMEBUFFER,e.COLOR_ATTACHMENT0,e.RENDERBUFFER,u.__webglColorRenderbuffer[n]);let t=r.get(i[n]).__webglTexture;e.framebufferTexture2D(e.DRAW_FRAMEBUFFER,e.COLOR_ATTACHMENT0,e.TEXTURE_2D,t,0)}e.blitFramebuffer(0,0,a,o,0,0,a,o,s,e.NEAREST),c===!0&&(be.length=0,xe.length=0,be.push(e.COLOR_ATTACHMENT0+n),t.depthBuffer&&t.storeMultisampledDepthBuffer===!1&&(be.push(l),xe.push(l),e.invalidateFramebuffer(e.DRAW_FRAMEBUFFER,xe)),e.invalidateFramebuffer(e.READ_FRAMEBUFFER,be))}if(n.bindFramebuffer(e.READ_FRAMEBUFFER,null),n.bindFramebuffer(e.DRAW_FRAMEBUFFER,null),d)for(let t=0;t<i.length;t++){n.bindFramebuffer(e.FRAMEBUFFER,u.__webglMultisampledFramebuffer),e.framebufferRenderbuffer(e.FRAMEBUFFER,e.COLOR_ATTACHMENT0+t,e.RENDERBUFFER,u.__webglColorRenderbuffer[t]);let a=r.get(i[t]).__webglTexture;n.bindFramebuffer(e.FRAMEBUFFER,u.__webglFramebuffer),e.framebufferTexture2D(e.DRAW_FRAMEBUFFER,e.COLOR_ATTACHMENT0+t,e.TEXTURE_2D,a,0)}n.bindFramebuffer(e.DRAW_FRAMEBUFFER,u.__webglMultisampledFramebuffer)}else if(t.depthBuffer&&t.storeMultisampledDepthBuffer===!1&&c){let n=t.stencilBuffer?e.DEPTH_STENCIL_ATTACHMENT:e.DEPTH_ATTACHMENT;e.invalidateFramebuffer(e.DRAW_FRAMEBUFFER,[n])}}}function Ce(e){return Math.min(i.maxSamples,e.samples)}function we(e){let n=r.get(e);return e.samples>0&&t.has(`WEBGL_multisampled_render_to_texture`)===!0&&n.__useRenderToTexture!==!1}function W(e){let t=o.render.frame;u.get(e)!==t&&(u.set(e,t),e.update())}function Te(e,t){let n=e.colorSpace,r=e.format,i=e.type;return e.isCompressedTexture===!0||e.isVideoTexture===!0||n!==`srgb-linear`&&n!==``&&(Jt.getTransfer(n)===`srgb`?(r!==1023||i!==1009)&&K(`WebGLTextures: sRGB encoded textures have to use RGBAFormat and UnsignedByteType.`):q(`WebGLTextures: Unsupported texture color space:`,n)),t}function Ee(e){return typeof HTMLImageElement<`u`&&e instanceof HTMLImageElement?(l.width=e.naturalWidth||e.width,l.height=e.naturalHeight||e.height):typeof VideoFrame<`u`&&e instanceof VideoFrame?(l.width=e.displayWidth,l.height=e.displayHeight):(l.width=e.width,l.height=e.height),l}this.allocateTextureUnit=B,this.resetTextureUnits=R,this.getTextureUnits=z,this.setTextureUnits=ee,this.setTexture2D=V,this.setTexture2DArray=H,this.setTexture3D=re,this.setTextureCube=ie,this.rebindTextures=_e,this.setupRenderTarget=ve,this.updateRenderTargetMipmap=ye,this.updateMultisampleRenderTarget=Se,this.setupDepthRenderbuffer=ge,this.setupFrameBufferTexture=pe,this.useMultisampledRTT=we,this.isReversedDepthBuffer=function(){return n.buffers.depth.getReversed()}}function jl(e,t){function n(n,r=``){let i,a=Jt.getTransfer(r);if(n===1009)return e.UNSIGNED_BYTE;if(n===1017)return e.UNSIGNED_SHORT_4_4_4_4;if(n===1018)return e.UNSIGNED_SHORT_5_5_5_1;if(n===35902)return e.UNSIGNED_INT_5_9_9_9_REV;if(n===35899)return e.UNSIGNED_INT_10F_11F_11F_REV;if(n===1010)return e.BYTE;if(n===1011)return e.SHORT;if(n===1012)return e.UNSIGNED_SHORT;if(n===1013)return e.INT;if(n===1014)return e.UNSIGNED_INT;if(n===1015)return e.FLOAT;if(n===1016)return e.HALF_FLOAT;if(n===1021)return e.ALPHA;if(n===1022)return e.RGB;if(n===1023)return e.RGBA;if(n===1026)return e.DEPTH_COMPONENT;if(n===1027)return e.DEPTH_STENCIL;if(n===1028)return e.RED;if(n===1029)return e.RED_INTEGER;if(n===1030)return e.RG;if(n===1031)return e.RG_INTEGER;if(n===1033)return e.RGBA_INTEGER;if(n===33776||n===33777||n===33778||n===33779){if(a===`srgb`){if(i=t.get(`WEBGL_compressed_texture_s3tc_srgb`),i!==null){if(n===33776)return i.COMPRESSED_SRGB_S3TC_DXT1_EXT;if(n===33777)return i.COMPRESSED_SRGB_ALPHA_S3TC_DXT1_EXT;if(n===33778)return i.COMPRESSED_SRGB_ALPHA_S3TC_DXT3_EXT;if(n===33779)return i.COMPRESSED_SRGB_ALPHA_S3TC_DXT5_EXT}else return null}else if(i=t.get(`WEBGL_compressed_texture_s3tc`),i!==null){if(n===33776)return i.COMPRESSED_RGB_S3TC_DXT1_EXT;if(n===33777)return i.COMPRESSED_RGBA_S3TC_DXT1_EXT;if(n===33778)return i.COMPRESSED_RGBA_S3TC_DXT3_EXT;if(n===33779)return i.COMPRESSED_RGBA_S3TC_DXT5_EXT}else return null}if(n===35840||n===35841||n===35842||n===35843){if(i=t.get(`WEBGL_compressed_texture_pvrtc`),i!==null){if(n===35840)return i.COMPRESSED_RGB_PVRTC_4BPPV1_IMG;if(n===35841)return i.COMPRESSED_RGB_PVRTC_2BPPV1_IMG;if(n===35842)return i.COMPRESSED_RGBA_PVRTC_4BPPV1_IMG;if(n===35843)return i.COMPRESSED_RGBA_PVRTC_2BPPV1_IMG}else return null}if(n===36196||n===37492||n===37496||n===37488||n===37489||n===37490||n===37491){if(i=t.get(`WEBGL_compressed_texture_etc`),i!==null){if(n===36196||n===37492)return a===`srgb`?i.COMPRESSED_SRGB8_ETC2:i.COMPRESSED_RGB8_ETC2;if(n===37496)return a===`srgb`?i.COMPRESSED_SRGB8_ALPHA8_ETC2_EAC:i.COMPRESSED_RGBA8_ETC2_EAC;if(n===37488)return i.COMPRESSED_R11_EAC;if(n===37489)return i.COMPRESSED_SIGNED_R11_EAC;if(n===37490)return i.COMPRESSED_RG11_EAC;if(n===37491)return i.COMPRESSED_SIGNED_RG11_EAC}else return null}if(n===37808||n===37809||n===37810||n===37811||n===37812||n===37813||n===37814||n===37815||n===37816||n===37817||n===37818||n===37819||n===37820||n===37821){if(i=t.get(`WEBGL_compressed_texture_astc`),i!==null){if(n===37808)return a===`srgb`?i.COMPRESSED_SRGB8_ALPHA8_ASTC_4x4_KHR:i.COMPRESSED_RGBA_ASTC_4x4_KHR;if(n===37809)return a===`srgb`?i.COMPRESSED_SRGB8_ALPHA8_ASTC_5x4_KHR:i.COMPRESSED_RGBA_ASTC_5x4_KHR;if(n===37810)return a===`srgb`?i.COMPRESSED_SRGB8_ALPHA8_ASTC_5x5_KHR:i.COMPRESSED_RGBA_ASTC_5x5_KHR;if(n===37811)return a===`srgb`?i.COMPRESSED_SRGB8_ALPHA8_ASTC_6x5_KHR:i.COMPRESSED_RGBA_ASTC_6x5_KHR;if(n===37812)return a===`srgb`?i.COMPRESSED_SRGB8_ALPHA8_ASTC_6x6_KHR:i.COMPRESSED_RGBA_ASTC_6x6_KHR;if(n===37813)return a===`srgb`?i.COMPRESSED_SRGB8_ALPHA8_ASTC_8x5_KHR:i.COMPRESSED_RGBA_ASTC_8x5_KHR;if(n===37814)return a===`srgb`?i.COMPRESSED_SRGB8_ALPHA8_ASTC_8x6_KHR:i.COMPRESSED_RGBA_ASTC_8x6_KHR;if(n===37815)return a===`srgb`?i.COMPRESSED_SRGB8_ALPHA8_ASTC_8x8_KHR:i.COMPRESSED_RGBA_ASTC_8x8_KHR;if(n===37816)return a===`srgb`?i.COMPRESSED_SRGB8_ALPHA8_ASTC_10x5_KHR:i.COMPRESSED_RGBA_ASTC_10x5_KHR;if(n===37817)return a===`srgb`?i.COMPRESSED_SRGB8_ALPHA8_ASTC_10x6_KHR:i.COMPRESSED_RGBA_ASTC_10x6_KHR;if(n===37818)return a===`srgb`?i.COMPRESSED_SRGB8_ALPHA8_ASTC_10x8_KHR:i.COMPRESSED_RGBA_ASTC_10x8_KHR;if(n===37819)return a===`srgb`?i.COMPRESSED_SRGB8_ALPHA8_ASTC_10x10_KHR:i.COMPRESSED_RGBA_ASTC_10x10_KHR;if(n===37820)return a===`srgb`?i.COMPRESSED_SRGB8_ALPHA8_ASTC_12x10_KHR:i.COMPRESSED_RGBA_ASTC_12x10_KHR;if(n===37821)return a===`srgb`?i.COMPRESSED_SRGB8_ALPHA8_ASTC_12x12_KHR:i.COMPRESSED_RGBA_ASTC_12x12_KHR}else return null}if(n===36492||n===36494||n===36495){if(i=t.get(`EXT_texture_compression_bptc`),i!==null){if(n===36492)return a===`srgb`?i.COMPRESSED_SRGB_ALPHA_BPTC_UNORM_EXT:i.COMPRESSED_RGBA_BPTC_UNORM_EXT;if(n===36494)return i.COMPRESSED_RGB_BPTC_SIGNED_FLOAT_EXT;if(n===36495)return i.COMPRESSED_RGB_BPTC_UNSIGNED_FLOAT_EXT}else return null}if(n===36283||n===36284||n===36285||n===36286){if(i=t.get(`EXT_texture_compression_rgtc`),i!==null){if(n===36283)return i.COMPRESSED_RED_RGTC1_EXT;if(n===36284)return i.COMPRESSED_SIGNED_RED_RGTC1_EXT;if(n===36285)return i.COMPRESSED_RED_GREEN_RGTC2_EXT;if(n===36286)return i.COMPRESSED_SIGNED_RED_GREEN_RGTC2_EXT}else return null}return n===1020?e.UNSIGNED_INT_24_8:e[n]===void 0?null:e[n]}return{convert:n}}var Ml=`
void main() {

	gl_Position = vec4( position, 1.0 );

}`,Nl=`
uniform sampler2DArray depthColor;
uniform float depthWidth;
uniform float depthHeight;

void main() {

	vec2 coord = vec2( gl_FragCoord.x / depthWidth, gl_FragCoord.y / depthHeight );

	if ( coord.x >= 1.0 ) {

		gl_FragDepth = texture( depthColor, vec3( coord.x - 1.0, coord.y, 1 ) ).r;

	} else {

		gl_FragDepth = texture( depthColor, vec3( coord.x, coord.y, 0 ) ).r;

	}

}`,Pl=class{constructor(){this.texture=null,this.mesh=null,this.depthNear=0,this.depthFar=0}init(e,t){if(this.texture===null){let n=new Ii(e.texture);(e.depthNear!==t.depthNear||e.depthFar!==t.depthFar)&&(this.depthNear=e.depthNear,this.depthFar=e.depthFar),this.texture=n}}getMesh(e){if(this.texture!==null&&this.mesh===null){let t=e.cameras[0].viewport,n=new _a({vertexShader:Ml,fragmentShader:Nl,uniforms:{depthColor:{value:this.texture},depthWidth:{value:t.z},depthHeight:{value:t.w}}});this.mesh=new di(new ca(20,20),n)}return this.mesh}reset(){this.texture=null,this.mesh=null}getDepthTexture(){return this.texture}},Fl=class extends ft{constructor(e,t){super();let n=this,r=null,i=1,a=null,o=`local-floor`,s=1,c=null,l=null,u=null,d=null,f=null,p=null,m=typeof XRWebGLBinding<`u`,h=new Pl,g={},_=t.getContextAttributes(),v=null,y=null,b=[],x=[],S=new J,C=null,w=null,T=new to;T.viewport=new on;let E=new to;E.viewport=new on;let D=[T,E],k=new co,A=null,j=null;this.cameraAutoUpdate=!0,this.enabled=!1,this.isPresenting=!1,this.getController=function(e){let t=b[e];return t===void 0&&(t=new Vn,b[e]=t),t.getTargetRaySpace()},this.getControllerGrip=function(e){let t=b[e];return t===void 0&&(t=new Vn,b[e]=t),t.getGripSpace()},this.getHand=function(e){let t=b[e];return t===void 0&&(t=new Vn,b[e]=t),t.getHandSpace()};function M(e){let t=x.indexOf(e.inputSource);if(t===-1)return;let n=b[t];n!==void 0&&(n.update(e.inputSource,e.frame,c||a),n.dispatchEvent({type:e.type,data:e.inputSource}))}function P(){r.removeEventListener(`select`,M),r.removeEventListener(`selectstart`,M),r.removeEventListener(`selectend`,M),r.removeEventListener(`squeeze`,M),r.removeEventListener(`squeezestart`,M),r.removeEventListener(`squeezeend`,M),r.removeEventListener(`end`,P),r.removeEventListener(`inputsourceschange`,F);for(let e=0;e<b.length;e++){let t=x[e];t!==null&&(x[e]=null,b[e].disconnect(t))}A=null,j=null,h.reset();for(let e in g)delete g[e];if(e.setRenderTarget(v),f=null,d=null,u=null,r=null,y=null,ie.stop(),n.isPresenting=!1,e.setPixelRatio(C),e.setSize(S.width,S.height,!1),w!==null){let e=w.camera;e.fov=w.fov,e.zoom=w.zoom,e.updateProjectionMatrix(),w=null}n.dispatchEvent({type:`sessionend`})}this.setFramebufferScaleFactor=function(e){i=e,n.isPresenting===!0&&K(`WebXRManager: Cannot change framebuffer scale while presenting.`)},this.setReferenceSpaceType=function(e){o=e,n.isPresenting===!0&&K(`WebXRManager: Cannot change reference space type while presenting.`)},this.getReferenceSpace=function(){return c||a},this.setReferenceSpace=function(e){c=e},this.getBaseLayer=function(){return d===null?f:d},this.getBinding=function(){return u===null&&m&&(u=new XRWebGLBinding(r,t)),u},this.getFrame=function(){return p},this.getSession=function(){return r},this.setSession=async function(l){if(r=l,r!==null){if(v=e.getRenderTarget(),r.addEventListener(`select`,M),r.addEventListener(`selectstart`,M),r.addEventListener(`selectend`,M),r.addEventListener(`squeeze`,M),r.addEventListener(`squeezestart`,M),r.addEventListener(`squeezeend`,M),r.addEventListener(`end`,P),r.addEventListener(`inputsourceschange`,F),_.xrCompatible!==!0&&await t.makeXRCompatible(),C=e.getPixelRatio(),e.getSize(S),m&&`createProjectionLayer`in XRWebGLBinding.prototype){let n=null,a=null,o=null;_.depth&&(o=_.stencil?t.DEPTH24_STENCIL8:t.DEPTH_COMPONENT24,n=_.stencil?ne:H,a=_.stencil?R:N);let s={colorFormat:t.RGBA8,depthFormat:o,scaleFactor:i};u=this.getBinding(),d=u.createProjectionLayer(s),r.updateRenderState({layers:[d]}),e.setPixelRatio(1),e.setSize(d.textureWidth,d.textureHeight,!1),y=new cn(d.textureWidth,d.textureHeight,{format:V,type:O,depthTexture:new Pi(d.textureWidth,d.textureHeight,a,void 0,void 0,void 0,void 0,void 0,void 0,n),stencilBuffer:_.stencil,colorSpace:e.outputColorSpace,samples:_.antialias?4:0,resolveDepthBuffer:d.ignoreDepthValues===!1,resolveStencilBuffer:d.ignoreDepthValues===!1,storeMultisampledDepthBuffer:d.ignoreDepthValues===!1,storeMultisampledStencilBuffer:d.ignoreDepthValues===!1})}else{let n={antialias:_.antialias,alpha:!0,depth:_.depth,stencil:_.stencil,framebufferScaleFactor:i};f=new XRWebGLLayer(r,t,n),r.updateRenderState({baseLayer:f}),e.setPixelRatio(1),e.setSize(f.framebufferWidth,f.framebufferHeight,!1),y=new cn(f.framebufferWidth,f.framebufferHeight,{format:V,type:O,colorSpace:e.outputColorSpace,stencilBuffer:_.stencil,resolveDepthBuffer:f.ignoreDepthValues===!1,resolveStencilBuffer:f.ignoreDepthValues===!1,storeMultisampledDepthBuffer:f.ignoreDepthValues===!1,storeMultisampledStencilBuffer:f.ignoreDepthValues===!1})}y.isXRRenderTarget=!0,this.setFoveation(s),c=null,a=await r.requestReferenceSpace(o),ie.setContext(r),ie.start(),n.isPresenting=!0,n.dispatchEvent({type:`sessionstart`})}},this.getEnvironmentBlendMode=function(){if(r!==null)return r.environmentBlendMode},this.getDepthTexture=function(){return h.getDepthTexture()};function F(e){for(let t=0;t<e.removed.length;t++){let n=e.removed[t],r=x.indexOf(n);r>=0&&(x[r]=null,b[r].disconnect(n))}for(let t=0;t<e.added.length;t++){let n=e.added[t],r=x.indexOf(n);if(r===-1){for(let e=0;e<b.length;e++)if(e>=x.length){x.push(n),r=e;break}else if(x[e]===null){x[e]=n,r=e;break}if(r===-1)break}let i=b[r];i&&i.connect(n)}}let I=new Y,L=new Y;function z(e,t,n){I.setFromMatrixPosition(t.matrixWorld),L.setFromMatrixPosition(n.matrixWorld);let r=I.distanceTo(L),i=t.projectionMatrix.elements,a=n.projectionMatrix.elements,o=i[14]/(i[10]-1),s=i[14]/(i[10]+1),c=(i[9]+1)/i[5],l=(i[9]-1)/i[5],u=(i[8]-1)/i[0],d=(a[8]+1)/a[0],f=o*u,p=o*d,m=r/(-u+d),h=m*-u;if(t.matrixWorld.decompose(e.position,e.quaternion,e.scale),e.translateX(h),e.translateZ(m),e.matrixWorld.compose(e.position,e.quaternion,e.scale),e.matrixWorldInverse.copy(e.matrixWorld).invert(),i[10]===-1)e.projectionMatrix.copy(t.projectionMatrix),e.projectionMatrixInverse.copy(t.projectionMatrixInverse);else{let t=o+m,n=s+m,i=f-h,a=p+(r-h),u=c*s/n*t,d=l*s/n*t;e.projectionMatrix.makePerspective(i,a,u,d,t,n),e.projectionMatrixInverse.copy(e.projectionMatrix).invert()}}function ee(e,t){t===null?e.matrixWorld.copy(e.matrix):e.matrixWorld.multiplyMatrices(t.matrixWorld,e.matrix),e.matrixWorldInverse.copy(e.matrixWorld).invert()}this.updateCamera=function(e){if(r===null)return;let t=e.near,n=e.far;h.texture!==null&&(h.depthNear>0&&(t=h.depthNear),h.depthFar>0&&(n=h.depthFar)),k.near=E.near=T.near=t,k.far=E.far=T.far=n,(A!==k.near||j!==k.far)&&(r.updateRenderState({depthNear:k.near,depthFar:k.far}),A=k.near,j=k.far),k.layers.mask=e.layers.mask|6,T.layers.mask=k.layers.mask&-5,E.layers.mask=k.layers.mask&-3;let i=e.parent,a=k.cameras;ee(k,i);for(let e=0;e<a.length;e++)ee(a[e],i);a.length===2?z(k,T,E):k.projectionMatrix.copy(T.projectionMatrix),w===null&&e.isPerspectiveCamera&&(w={camera:e,fov:e.fov,zoom:e.zoom}),B(e,k,i)};function B(e,t,n){n===null?e.matrix.copy(t.matrixWorld):(e.matrix.copy(n.matrixWorld),e.matrix.invert(),e.matrix.multiply(t.matrixWorld)),e.matrix.decompose(e.position,e.quaternion,e.scale),e.updateMatrixWorld(!0),e.projectionMatrix.copy(t.projectionMatrix),e.projectionMatrixInverse.copy(t.projectionMatrixInverse),e.isPerspectiveCamera&&(e.fov=gt*2*Math.atan(1/e.projectionMatrix.elements[5]),e.zoom=1)}this.getCamera=function(){return k},this.getFoveation=function(){if(d!==null||f!==null)return s},this.setFoveation=function(e){s=e,d!==null&&(d.fixedFoveation=e),f!==null&&f.fixedFoveation!==void 0&&(f.fixedFoveation=e)},this.hasDepthSensing=function(){return h.texture!==null},this.getDepthSensingMesh=function(){return h.getMesh(k)},this.getCameraTexture=function(e){return g[e]};let te=null;function re(t,i){if(l=i.getViewerPose(c||a),p=i,l!==null){let t=l.views;f!==null&&(e.setRenderTargetFramebuffer(y,f.framebuffer),e.setRenderTarget(y));let i=!1;t.length!==k.cameras.length&&(k.cameras.length=0,i=!0);for(let n=0;n<t.length;n++){let r=t[n],a=null;if(f!==null)a=f.getViewport(r);else{let t=u.getViewSubImage(d,r);a=t.viewport,n===0&&(e.setRenderTargetTextures(y,t.colorTexture,t.depthStencilTexture),e.setRenderTarget(y))}let o=D[n];o===void 0&&(o=new to,o.layers.enable(n),o.viewport=new on,D[n]=o),o.matrix.fromArray(r.transform.matrix),o.matrix.decompose(o.position,o.quaternion,o.scale),o.projectionMatrix.fromArray(r.projectionMatrix),o.projectionMatrixInverse.copy(o.projectionMatrix).invert(),o.viewport.set(a.x,a.y,a.width,a.height),n===0&&(k.matrix.copy(o.matrix),k.matrix.decompose(k.position,k.quaternion,k.scale)),i===!0&&k.cameras.push(o)}let a=r.enabledFeatures;if(a&&a.includes(`depth-sensing`)&&r.depthUsage==`gpu-optimized`&&m){u=n.getBinding();let e=u.getDepthInformation(t[0]);e&&e.isValid&&e.texture&&h.init(e,r.renderState)}if(a&&a.includes(`camera-access`)&&m){e.state.unbindTexture(),u=n.getBinding();for(let e=0;e<t.length;e++){let n=t[e].camera;if(n){let e=g[n];e||(e=new Ii,g[n]=e);let t=u.getCameraImage(n);e.sourceTexture=t}}}}for(let e=0;e<b.length;e++){let t=x[e],n=b[e];t!==null&&n!==void 0&&n.update(t,i,c||a)}te&&te(t,i),i.detectedPlanes&&n.dispatchEvent({type:`planesdetected`,data:i}),p=null}let ie=new Eo;ie.setAnimationLoop(re),this.setAnimationLoop=function(e){te=e},this.dispose=function(){}}},Il=new dn,Ll=new Ut;Ll.set(-1,0,0,0,1,0,0,0,1);function Rl(e,t){function n(e,t){e.matrixAutoUpdate===!0&&e.updateMatrix(),t.value.copy(e.matrix)}function r(t,n){n.color.getRGB(t.fogColor.value,pa(e)),n.isFog?(t.fogNear.value=n.near,t.fogFar.value=n.far):n.isFogExp2&&(t.fogDensity.value=n.density)}function i(e,t,n,r,i){t.isNodeMaterial?t.uniformsNeedUpdate=!1:t.isMeshBasicMaterial?a(e,t):t.isMeshLambertMaterial?(a(e,t),t.envMap&&(e.envMapIntensity.value=t.envMapIntensity)):t.isMeshToonMaterial?(a(e,t),d(e,t)):t.isMeshPhongMaterial?(a(e,t),u(e,t),t.envMap&&(e.envMapIntensity.value=t.envMapIntensity)):t.isMeshStandardMaterial?(a(e,t),f(e,t),t.isMeshPhysicalMaterial&&p(e,t,i)):t.isMeshMatcapMaterial?(a(e,t),m(e,t)):t.isMeshDepthMaterial?a(e,t):t.isMeshDistanceMaterial?(a(e,t),h(e,t)):t.isMeshNormalMaterial?a(e,t):t.isLineBasicMaterial?(o(e,t),t.isLineDashedMaterial&&s(e,t)):t.isPointsMaterial?c(e,t,n,r):t.isSpriteMaterial?l(e,t):t.isShadowMaterial?(e.color.value.copy(t.color),e.opacity.value=t.opacity):t.isShaderMaterial&&(t.uniformsNeedUpdate=!1)}function a(e,r){e.opacity.value=r.opacity,r.color&&e.diffuse.value.copy(r.color),r.emissive&&e.emissive.value.copy(r.emissive).multiplyScalar(r.emissiveIntensity),r.map&&(e.map.value=r.map,n(r.map,e.mapTransform)),r.alphaMap&&(e.alphaMap.value=r.alphaMap,n(r.alphaMap,e.alphaMapTransform)),r.bumpMap&&(e.bumpMap.value=r.bumpMap,n(r.bumpMap,e.bumpMapTransform),e.bumpScale.value=r.bumpScale,r.side===1&&(e.bumpScale.value*=-1)),r.normalMap&&(e.normalMap.value=r.normalMap,n(r.normalMap,e.normalMapTransform),e.normalScale.value.copy(r.normalScale),r.side===1&&e.normalScale.value.negate()),r.displacementMap&&(e.displacementMap.value=r.displacementMap,n(r.displacementMap,e.displacementMapTransform),e.displacementScale.value=r.displacementScale,e.displacementBias.value=r.displacementBias),r.emissiveMap&&(e.emissiveMap.value=r.emissiveMap,n(r.emissiveMap,e.emissiveMapTransform)),r.specularMap&&(e.specularMap.value=r.specularMap,n(r.specularMap,e.specularMapTransform)),r.alphaTest>0&&(e.alphaTest.value=r.alphaTest);let i=t.get(r),a=i.envMap,o=i.envMapRotation;a&&(e.envMap.value=a,e.envMapRotation.value.setFromMatrix4(Il.makeRotationFromEuler(o)).transpose(),a.isCubeTexture&&a.isRenderTargetTexture===!1&&e.envMapRotation.value.premultiply(Ll),e.reflectivity.value=r.reflectivity,e.ior.value=r.ior,e.refractionRatio.value=r.refractionRatio),r.lightMap&&(e.lightMap.value=r.lightMap,e.lightMapIntensity.value=r.lightMapIntensity,n(r.lightMap,e.lightMapTransform)),r.aoMap&&(e.aoMap.value=r.aoMap,e.aoMapIntensity.value=r.aoMapIntensity,n(r.aoMap,e.aoMapTransform))}function o(e,t){e.diffuse.value.copy(t.color),e.opacity.value=t.opacity,t.map&&(e.map.value=t.map,n(t.map,e.mapTransform))}function s(e,t){e.dashSize.value=t.dashSize,e.totalSize.value=t.dashSize+t.gapSize,e.scale.value=t.scale}function c(e,t,r,i){e.diffuse.value.copy(t.color),e.opacity.value=t.opacity,e.size.value=t.size*r,e.scale.value=i*.5,t.map&&(e.map.value=t.map,n(t.map,e.uvTransform)),t.alphaMap&&(e.alphaMap.value=t.alphaMap,n(t.alphaMap,e.alphaMapTransform)),t.alphaTest>0&&(e.alphaTest.value=t.alphaTest)}function l(e,t){e.diffuse.value.copy(t.color),e.opacity.value=t.opacity,e.rotation.value=t.rotation,t.map&&(e.map.value=t.map,n(t.map,e.mapTransform)),t.alphaMap&&(e.alphaMap.value=t.alphaMap,n(t.alphaMap,e.alphaMapTransform)),t.alphaTest>0&&(e.alphaTest.value=t.alphaTest)}function u(e,t){e.specular.value.copy(t.specular),e.shininess.value=Math.max(t.shininess,1e-4)}function d(e,t){t.gradientMap&&(e.gradientMap.value=t.gradientMap)}function f(e,t){e.metalness.value=t.metalness,t.metalnessMap&&(e.metalnessMap.value=t.metalnessMap,n(t.metalnessMap,e.metalnessMapTransform)),e.roughness.value=t.roughness,t.roughnessMap&&(e.roughnessMap.value=t.roughnessMap,n(t.roughnessMap,e.roughnessMapTransform)),t.envMap&&(e.envMapIntensity.value=t.envMapIntensity)}function p(e,t,r){e.ior.value=t.ior,t.sheen>0&&(e.sheenColor.value.copy(t.sheenColor).multiplyScalar(t.sheen),e.sheenRoughness.value=t.sheenRoughness,t.sheenColorMap&&(e.sheenColorMap.value=t.sheenColorMap,n(t.sheenColorMap,e.sheenColorMapTransform)),t.sheenRoughnessMap&&(e.sheenRoughnessMap.value=t.sheenRoughnessMap,n(t.sheenRoughnessMap,e.sheenRoughnessMapTransform))),t.clearcoat>0&&(e.clearcoat.value=t.clearcoat,e.clearcoatRoughness.value=t.clearcoatRoughness,t.clearcoatMap&&(e.clearcoatMap.value=t.clearcoatMap,n(t.clearcoatMap,e.clearcoatMapTransform)),t.clearcoatRoughnessMap&&(e.clearcoatRoughnessMap.value=t.clearcoatRoughnessMap,n(t.clearcoatRoughnessMap,e.clearcoatRoughnessMapTransform)),t.clearcoatNormalMap&&(e.clearcoatNormalMap.value=t.clearcoatNormalMap,n(t.clearcoatNormalMap,e.clearcoatNormalMapTransform),e.clearcoatNormalScale.value.copy(t.clearcoatNormalScale),t.side===1&&e.clearcoatNormalScale.value.negate())),t.dispersion>0&&(e.dispersion.value=t.dispersion),t.retroreflectivity>0&&(e.retroreflectivity.value=t.retroreflectivity),t.iridescence>0&&(e.iridescence.value=t.iridescence,e.iridescenceIOR.value=t.iridescenceIOR,e.iridescenceThicknessMinimum.value=t.iridescenceThicknessRange[0],e.iridescenceThicknessMaximum.value=t.iridescenceThicknessRange[1],t.iridescenceMap&&(e.iridescenceMap.value=t.iridescenceMap,n(t.iridescenceMap,e.iridescenceMapTransform)),t.iridescenceThicknessMap&&(e.iridescenceThicknessMap.value=t.iridescenceThicknessMap,n(t.iridescenceThicknessMap,e.iridescenceThicknessMapTransform))),t.transmission>0&&(e.transmission.value=t.transmission,e.transmissionSamplerMap.value=r.texture,e.transmissionSamplerSize.value.set(r.width,r.height),t.transmissionMap&&(e.transmissionMap.value=t.transmissionMap,n(t.transmissionMap,e.transmissionMapTransform)),e.thickness.value=t.thickness,t.thicknessMap&&(e.thicknessMap.value=t.thicknessMap,n(t.thicknessMap,e.thicknessMapTransform)),e.attenuationDistance.value=t.attenuationDistance,e.attenuationColor.value.copy(t.attenuationColor)),t.anisotropy>0&&(e.anisotropyVector.value.set(t.anisotropy*Math.cos(t.anisotropyRotation),t.anisotropy*Math.sin(t.anisotropyRotation)),t.anisotropyMap&&(e.anisotropyMap.value=t.anisotropyMap,n(t.anisotropyMap,e.anisotropyMapTransform))),e.specularIntensity.value=t.specularIntensity,e.specularColor.value.copy(t.specularColor),t.specularColorMap&&(e.specularColorMap.value=t.specularColorMap,n(t.specularColorMap,e.specularColorMapTransform)),t.specularIntensityMap&&(e.specularIntensityMap.value=t.specularIntensityMap,n(t.specularIntensityMap,e.specularIntensityMapTransform))}function m(e,t){t.matcap&&(e.matcap.value=t.matcap)}function h(e,n){let r=t.get(n).light;e.referencePosition.value.setFromMatrixPosition(r.matrixWorld),e.nearDistance.value=r.shadow.camera.near,e.farDistance.value=r.shadow.camera.far}return{refreshFogUniforms:r,refreshMaterialUniforms:i}}function zl(e,t,n,r){let i={},a={},o=[],s=e.getParameter(e.MAX_UNIFORM_BUFFER_BINDINGS);function c(e,t){let n=t.program;r.uniformBlockBinding(e,n)}function l(e,n){let o=i[e.id];o===void 0&&(g(e),o=u(e),i[e.id]=o,e.addEventListener(`dispose`,v));let s=n.program;r.updateUBOMapping(e,s);let c=t.render.frame;a[e.id]!==c&&(f(e),a[e.id]=c)}function u(t){let n=d();t.__bindingPointIndex=n;let r=e.createBuffer(),i=t.__size,a=t.usage;return e.bindBuffer(e.UNIFORM_BUFFER,r),e.bufferData(e.UNIFORM_BUFFER,i,a),e.bindBuffer(e.UNIFORM_BUFFER,null),e.bindBufferBase(e.UNIFORM_BUFFER,n,r),r}function d(){for(let e=0;e<s;e++)if(o.indexOf(e)===-1)return o.push(e),e;return q(`WebGLRenderer: Maximum number of simultaneously usable uniforms groups reached.`),0}function f(t){let n=i[t.id],r=t.uniforms,a=t.__cache;e.bindBuffer(e.UNIFORM_BUFFER,n);for(let e=0,t=r.length;e<t;e++){let t=r[e];if(Array.isArray(t))for(let n=0,r=t.length;n<r;n++)p(t[n],e,n,a);else p(t,e,0,a)}e.bindBuffer(e.UNIFORM_BUFFER,null)}function p(t,n,r,i){if(h(t,n,r,i)===!0){let n=t.__offset,r=t.value;if(Array.isArray(r)){let e=0;for(let n=0;n<r.length;n++){let i=r[n],a=_(i);m(i,t.__data,e),typeof i!=`number`&&typeof i!=`boolean`&&!i.isMatrix3&&!ArrayBuffer.isView(i)&&(e+=a.storage/Float32Array.BYTES_PER_ELEMENT)}}else m(r,t.__data,0);e.bufferSubData(e.UNIFORM_BUFFER,n,t.__data)}}function m(e,t,n){typeof e==`number`||typeof e==`boolean`?t[0]=e:e.isMatrix3?(t[0]=e.elements[0],t[1]=e.elements[1],t[2]=e.elements[2],t[3]=0,t[4]=e.elements[3],t[5]=e.elements[4],t[6]=e.elements[5],t[7]=0,t[8]=e.elements[6],t[9]=e.elements[7],t[10]=e.elements[8],t[11]=0):ArrayBuffer.isView(e)?t.set(new e.constructor(e.buffer,e.byteOffset,t.length)):e.toArray(t,n)}function h(e,t,n,r){let i=e.value,a=t+`_`+n;if(r[a]===void 0)return r[a]=typeof i==`number`||typeof i==`boolean`?i:ArrayBuffer.isView(i)?i.slice():i.clone(),!0;{let e=r[a];if(typeof i==`number`||typeof i==`boolean`){if(e!==i)return r[a]=i,!0}else if(ArrayBuffer.isView(i))return!0;else if(e.equals(i)===!1)return e.copy(i),!0}return!1}function g(e){let t=e.uniforms,n=0;for(let e=0,r=t.length;e<r;e++){let r=Array.isArray(t[e])?t[e]:[t[e]];for(let e=0,t=r.length;e<t;e++){let t=r[e],i=Array.isArray(t.value)?t.value:[t.value];for(let e=0,r=i.length;e<r;e++){let r=i[e],a=_(r),o=n%16,s=o%a.boundary,c=o+s;n+=s,c!==0&&16-c<a.storage&&(n+=16-c),t.__data=new Float32Array(a.storage/Float32Array.BYTES_PER_ELEMENT),t.__offset=n,n+=a.storage}}}let r=n%16;return r>0&&(n+=16-r),e.__size=n,e.__cache={},this}function _(e){let t={boundary:0,storage:0};return typeof e==`number`||typeof e==`boolean`?(t.boundary=4,t.storage=4):e.isVector2?(t.boundary=8,t.storage=8):e.isVector3||e.isColor?(t.boundary=16,t.storage=12):e.isVector4?(t.boundary=16,t.storage=16):e.isMatrix3?(t.boundary=48,t.storage=48):e.isMatrix4?(t.boundary=64,t.storage=64):e.isTexture?K(`WebGLRenderer: Texture samplers can not be part of an uniforms group.`):ArrayBuffer.isView(e)?(t.boundary=16,t.storage=e.byteLength):K(`WebGLRenderer: Unsupported uniform value type.`,e),t}function v(t){let n=t.target;n.removeEventListener(`dispose`,v);let r=o.indexOf(n.__bindingPointIndex);o.splice(r,1),e.deleteBuffer(i[n.id]),delete i[n.id],delete a[n.id]}function y(){for(let t in i)e.deleteBuffer(i[t]);o=[],i={},a={}}return{bind:c,update:l,dispose:y}}var Bl=new Uint16Array([12469,15057,12620,14925,13266,14620,13807,14376,14323,13990,14545,13625,14713,13328,14840,12882,14931,12528,14996,12233,15039,11829,15066,11525,15080,11295,15085,10976,15082,10705,15073,10495,13880,14564,13898,14542,13977,14430,14158,14124,14393,13732,14556,13410,14702,12996,14814,12596,14891,12291,14937,11834,14957,11489,14958,11194,14943,10803,14921,10506,14893,10278,14858,9960,14484,14039,14487,14025,14499,13941,14524,13740,14574,13468,14654,13106,14743,12678,14818,12344,14867,11893,14889,11509,14893,11180,14881,10751,14852,10428,14812,10128,14765,9754,14712,9466,14764,13480,14764,13475,14766,13440,14766,13347,14769,13070,14786,12713,14816,12387,14844,11957,14860,11549,14868,11215,14855,10751,14825,10403,14782,10044,14729,9651,14666,9352,14599,9029,14967,12835,14966,12831,14963,12804,14954,12723,14936,12564,14917,12347,14900,11958,14886,11569,14878,11247,14859,10765,14828,10401,14784,10011,14727,9600,14660,9289,14586,8893,14508,8533,15111,12234,15110,12234,15104,12216,15092,12156,15067,12010,15028,11776,14981,11500,14942,11205,14902,10752,14861,10393,14812,9991,14752,9570,14682,9252,14603,8808,14519,8445,14431,8145,15209,11449,15208,11451,15202,11451,15190,11438,15163,11384,15117,11274,15055,10979,14994,10648,14932,10343,14871,9936,14803,9532,14729,9218,14645,8742,14556,8381,14461,8020,14365,7603,15273,10603,15272,10607,15267,10619,15256,10631,15231,10614,15182,10535,15118,10389,15042,10167,14963,9787,14883,9447,14800,9115,14710,8665,14615,8318,14514,7911,14411,7507,14279,7198,15314,9675,15313,9683,15309,9712,15298,9759,15277,9797,15229,9773,15166,9668,15084,9487,14995,9274,14898,8910,14800,8539,14697,8234,14590,7790,14479,7409,14367,7067,14178,6621,15337,8619,15337,8631,15333,8677,15325,8769,15305,8871,15264,8940,15202,8909,15119,8775,15022,8565,14916,8328,14804,8009,14688,7614,14569,7287,14448,6888,14321,6483,14088,6171,15350,7402,15350,7419,15347,7480,15340,7613,15322,7804,15287,7973,15229,8057,15148,8012,15046,7846,14933,7611,14810,7357,14682,7069,14552,6656,14421,6316,14251,5948,14007,5528,15356,5942,15356,5977,15353,6119,15348,6294,15332,6551,15302,6824,15249,7044,15171,7122,15070,7050,14949,6861,14818,6611,14679,6349,14538,6067,14398,5651,14189,5311,13935,4958,15359,4123,15359,4153,15356,4296,15353,4646,15338,5160,15311,5508,15263,5829,15188,6042,15088,6094,14966,6001,14826,5796,14678,5543,14527,5287,14377,4985,14133,4586,13869,4257,15360,1563,15360,1642,15358,2076,15354,2636,15341,3350,15317,4019,15273,4429,15203,4732,15105,4911,14981,4932,14836,4818,14679,4621,14517,4386,14359,4156,14083,3795,13808,3437,15360,122,15360,137,15358,285,15355,636,15344,1274,15322,2177,15281,2765,15215,3223,15120,3451,14995,3569,14846,3567,14681,3466,14511,3305,14344,3121,14037,2800,13753,2467,15360,0,15360,1,15359,21,15355,89,15346,253,15325,479,15287,796,15225,1148,15133,1492,15008,1749,14856,1882,14685,1886,14506,1783,14324,1608,13996,1398,13702,1183]),Vl=null;function Hl(){return Vl===null&&(Vl=new mi(Bl,16,16,ae,F),Vl.name=`DFG_LUT`,Vl.minFilter=T,Vl.magFilter=T,Vl.wrapS=b,Vl.wrapT=b,Vl.generateMipmaps=!1,Vl.needsUpdate=!0),Vl}var Ul=class{constructor(e={}){let{canvas:t=at(),context:n=null,depth:r=!0,stencil:i=!1,alpha:a=!1,antialias:o=!1,premultipliedAlpha:s=!0,preserveDrawingBuffer:c=!1,powerPreference:l=`default`,failIfMajorPerformanceCaveat:u=!1,reversedDepthBuffer:d=!1,outputBufferType:f=O}=e;this.isWebGLRenderer=!0;let p;if(n!==null){if(typeof WebGLRenderingContext<`u`&&n instanceof WebGLRenderingContext)throw Error(`THREE.WebGLRenderer: WebGL 1 is not supported since r163.`);p=n.getContextAttributes().alpha}else p=a;let m=f,h=new Set([se,oe,ie]),g=new Set([O,N,j,R,I,L]),_=new Uint32Array(4),v=new Int32Array(4),y=new Y,b=null,x=null,S=[],C=[],w=null;this.domElement=t,this.debug={checkShaderErrors:!0,diagnostics:{keywords:!1},onShaderError:null},this.autoClear=!0,this.autoClearColor=!0,this.autoClearDepth=!0,this.autoClearStencil=!0,this.sortObjects=!0,this.clippingPlanes=[],this.localClippingEnabled=!1,this.toneMapping=0,this.toneMappingExposure=1,this.transmissionResolutionScale=1;let T=this,E=!1,k=null,A=null,M=null,P=null;this._outputColorSpace=Ye;let z=0,ee=0,B=null,te=-1,V=null,H=new on,ne=new on,re=null,ae=new X(0),ce=0,le=t.width,ue=t.height,U=1,de=null,fe=null,pe=new on(0,0,le,ue),me=new on(0,0,le,ue),he=!1,ge=new vi,_e=!1,ve=!1,ye=new dn,be=new Y,xe=new on,Se={background:null,fog:null,environment:null,overrideMaterial:null,isScene:!0},Ce=!1;function we(){return B===null?U:1}let W=n;function Te(e,n){return t.getContext(e,n)}let Ee,De,G,Oe,ke,Ae,je,Me,Ne,Pe,Fe,Ie,Le,Re,ze,Be,Ve,He,Ue,We,Ge,Ke,qe;try{let e={alpha:!0,depth:r,stencil:i,antialias:o,premultipliedAlpha:s,preserveDrawingBuffer:c,powerPreference:l,failIfMajorPerformanceCaveat:u};if(`setAttribute`in t&&t.setAttribute(`data-engine`,`three.js r186`),t.addEventListener(`webglcontextlost`,Ze,!1),t.addEventListener(`webglcontextrestored`,Qe,!1),t.addEventListener(`webglcontextcreationerror`,$e,!1),W===null){let t=`webgl2`;if(W=Te(t,e),W===null)throw Te(t)?Error(`THREE.WebGLRenderer: Error creating WebGL context with your selected attributes.`):Error(`THREE.WebGLRenderer: Error creating WebGL context.`)}Je()}catch(e){throw t.removeEventListener(`webglcontextlost`,Ze,!1),t.removeEventListener(`webglcontextrestored`,Qe,!1),t.removeEventListener(`webglcontextcreationerror`,$e,!1),q(`WebGLRenderer: `+e.message),e}function Je(){Ee=new ss(W),Ee.init(),Ge=new jl(W,Ee),De=new Io(W,Ee,e,Ge),G=new kl(W,Ee),De.reversedDepthBuffer&&d&&G.buffers.depth.setReversed(!0),A=W.createFramebuffer(),M=W.createFramebuffer(),P=W.createFramebuffer(),Oe=new us(W),ke=new ll,Ae=new Al(W,Ee,G,ke,De,Ge,Oe),je=new os(T),Me=new Do(W),Ke=new Po(W,Me),Ne=new cs(W,Me,Oe,Ke),Pe=new fs(W,Ne,Me,Ke,Oe),He=new ds(W,De,Ae),ze=new Lo(ke),Fe=new cl(T,je,Ee,De,Ke,ze),Ie=new Rl(T,ke),Le=new pl,Re=new bl(Ee),Ve=new No(T,je,G,Pe,p,s),Be=new Ol(T,Pe,De),qe=new zl(W,Oe,De,G),Ue=new Fo(W,Ee,Oe),We=new ls(W,Ee,Oe),Oe.programs=Fe.programs,T.capabilities=De,T.extensions=Ee,T.properties=ke,T.renderLists=Le,T.shadowMap=Be,T.state=G,T.info=Oe}m!==1009&&(w=new ms(m,t.width,t.height,o,r,i));let Xe=new Fl(T,W);this.xr=Xe,this.getContext=function(){return W},this.getContextAttributes=function(){return W.getContextAttributes()},this.forceContextLoss=function(){let e=Ee.get(`WEBGL_lose_context`);e&&e.loseContext()},this.forceContextRestore=function(){let e=Ee.get(`WEBGL_lose_context`);e&&e.restoreContext()},this.getPixelRatio=function(){return U},this.setPixelRatio=function(e){e!==void 0&&(U=e,this.setSize(le,ue,!1))},this.getSize=function(e){return e.set(le,ue)},this.setSize=function(e,n,r=!0){if(Xe.isPresenting){K(`WebGLRenderer: Can't change size while VR device is presenting.`);return}le=e,ue=n,t.width=Math.floor(e*U),t.height=Math.floor(n*U),r===!0&&(t.style.width=e+`px`,t.style.height=n+`px`),w!==null&&w.setSize(t.width,t.height),this.setViewport(0,0,e,n)},this.getDrawingBufferSize=function(e){return e.set(le*U,ue*U).floor()},this.setDrawingBufferSize=function(e,n,r){le=e,ue=n,U=r,t.width=Math.floor(e*r),t.height=Math.floor(n*r),this.setViewport(0,0,e,n)},this.setEffects=function(e){if(m===1009){q(`WebGLRenderer: setEffects() requires outputBufferType set to HalfFloatType or FloatType.`);return}if(e){for(let t=0;t<e.length;t++)if(e[t].isOutputPass===!0){K(`WebGLRenderer: OutputPass is not needed in setEffects(). Tone mapping and color space conversion are applied automatically.`);break}}w.setEffects(e||[])},this.getCurrentViewport=function(e){return e.copy(H)},this.getViewport=function(e){return e.copy(pe)},this.setViewport=function(e,t,n,r){e.isVector4?pe.set(e.x,e.y,e.z,e.w):pe.set(e,t,n,r),G.viewport(H.copy(pe).multiplyScalar(U).round())},this.getScissor=function(e){return e.copy(me)},this.setScissor=function(e,t,n,r){e.isVector4?me.set(e.x,e.y,e.z,e.w):me.set(e,t,n,r),G.scissor(ne.copy(me).multiplyScalar(U).round())},this.getScissorTest=function(){return he},this.setScissorTest=function(e){G.setScissorTest(he=e)},this.setOpaqueSort=function(e){de=e},this.setTransparentSort=function(e){fe=e},this.getClearColor=function(e){return e.copy(Ve.getClearColor())},this.setClearColor=function(){Ve.setClearColor(...arguments)},this.getClearAlpha=function(){return Ve.getClearAlpha()},this.setClearAlpha=function(){Ve.setClearAlpha(...arguments)},this.clear=function(e=!0,t=!0,n=!0){let r=0;if(e){let e=!1;if(B!==null){let t=B.texture.format;e=h.has(t)}if(e){let e=B.texture.type,t=g.has(e),n=Ve.getClearColor(),r=Ve.getClearAlpha(),i=n.r,a=n.g,o=n.b;t?(_[0]=i,_[1]=a,_[2]=o,_[3]=r,W.clearBufferuiv(W.COLOR,0,_)):(v[0]=i,v[1]=a,v[2]=o,v[3]=r,W.clearBufferiv(W.COLOR,0,v))}else r|=W.COLOR_BUFFER_BIT}t&&(r|=W.DEPTH_BUFFER_BIT,this.state.buffers.depth.setMask(!0)),n&&(r|=W.STENCIL_BUFFER_BIT,this.state.buffers.stencil.setMask(4294967295)),r!==0&&W.clear(r)},this.clearColor=function(){this.clear(!0,!1,!1)},this.clearDepth=function(){this.clear(!1,!0,!1)},this.clearStencil=function(){this.clear(!1,!1,!0)},this.setNodesHandler=function(e){e.setRenderer(this),k=e},this.dispose=function(){t.removeEventListener(`webglcontextlost`,Ze,!1),t.removeEventListener(`webglcontextrestored`,Qe,!1),t.removeEventListener(`webglcontextcreationerror`,$e,!1),Ve.dispose(),Le.dispose(),Re.dispose(),ke.dispose(),je.dispose(),Pe.dispose(),Ke.dispose(),qe.dispose(),Fe.dispose(),Xe.dispose(),Xe.removeEventListener(`sessionstart`,lt),Xe.removeEventListener(`sessionend`,dt),ft.stop()};function Ze(e){e.preventDefault(),st(`WebGLRenderer: Context Lost.`),E=!0}function Qe(){st(`WebGLRenderer: Context Restored.`),E=!1;let e=Oe.autoReset,t=Be.enabled,n=Be.autoUpdate,r=Be.needsUpdate,i=Be.type;Je(),Oe.autoReset=e,Be.enabled=t,Be.autoUpdate=n,Be.needsUpdate=r,Be.type=i}function $e(e){q(`WebGLRenderer: A WebGL context could not be created. Reason: `,e.statusMessage)}function et(e){let t=e.target;t.removeEventListener(`dispose`,et),nt(t)}function nt(e){rt(e),ke.remove(e)}function rt(e){let t=ke.get(e).programs;t!==void 0&&(t.forEach(function(e){Fe.releaseProgram(e)}),e.isShaderMaterial&&Fe.releaseShaderCache(e))}this.renderBufferDirect=function(e,t,n,r,i,a){t===null&&(t=Se);let o=i.isMesh&&i.matrixWorld.determinantAffine()<0,s=St(e,t,n,r,i);G.setMaterial(r,o);let c=n.index,l=1;if(r.wireframe===!0){if(c=Ne.getWireframeAttribute(n),c===void 0)return;l=2}let u=n.drawRange,d=n.attributes.position,f=u.start*l,p=(u.start+u.count)*l;a!==null&&(f=Math.max(f,a.start*l),p=Math.min(p,(a.start+a.count)*l)),c===null?d!=null&&(f=Math.max(f,0),p=Math.min(p,d.count)):(f=Math.max(f,0),p=Math.min(p,c.count));let m=p-f;if(m<0||m===1/0)return;Ke.setup(i,r,s,n,c);let h,g=Ue;if(c!==null&&(h=Me.get(c),g=We,g.setIndex(h)),i.isMesh)r.wireframe===!0?(G.setLineWidth(r.wireframeLinewidth*we()),g.setMode(W.LINES)):g.setMode(W.TRIANGLES);else if(i.isLine){let e=r.linewidth;e===void 0&&(e=1),G.setLineWidth(e*we()),i.isLineSegments?g.setMode(W.LINES):i.isLineLoop?g.setMode(W.LINE_LOOP):g.setMode(W.LINE_STRIP)}else i.isPoints?g.setMode(W.POINTS):i.isSprite&&g.setMode(W.TRIANGLES);if(i.isBatchedMesh){if(Ee.get(`WEBGL_multi_draw`))g.renderMultiDraw(i._multiDrawStarts,i._multiDrawCounts,i._multiDrawCount);else{let e=i._multiDrawStarts,t=i._multiDrawCounts,n=i._multiDrawCount,a=c?Me.get(c).bytesPerElement:1,o=ke.get(r).currentProgram.getUniforms();for(let r=0;r<n;r++)o.setValue(W,`_gl_DrawID`,r),g.render(e[r]/a,t[r])}}else if(i.isInstancedMesh)g.renderInstances(f,m,i.count);else if(n.isInstancedBufferGeometry){let e=n._maxInstanceCount===void 0?1/0:n._maxInstanceCount,t=Math.min(n.instanceCount,e);g.renderInstances(f,m,t)}else g.render(f,m)};function it(e,t,n,r){k!==null&&e.isNodeMaterial&&k.setObject(r,e),_e===!0&&ze.setState(e,n,!1),e.transparent===!0&&e.side===2&&e.forceSinglePass===!1?(e.side=1,e.needsUpdate=!0,vt(e,t,r),e.side=0,e.needsUpdate=!0,vt(e,t,r),e.side=2):vt(e,t,r)}this.compile=function(e,t,n=null){n===null&&(n=e),k!==null&&k.renderStart(e,t,n),x=Re.get(n),x.init(t),C.push(x),n.traverseVisible(function(e){e.isLight&&e.layers.test(t.layers)&&(x.pushLight(e),e.castShadow&&x.pushShadow(e))}),e!==n&&e.traverseVisible(function(e){e.isLight&&e.layers.test(t.layers)&&(x.pushLight(e),e.castShadow&&x.pushShadow(e))}),x.setupLights(),k!==null&&k.updateLights(x.state.lightsArray),ve=this.localClippingEnabled,_e=ze.init(this.clippingPlanes,ve),_e===!0&&ze.setGlobalState(this.clippingPlanes,t),k!==null&&Be.render(x.state.shadowsArray,n,t);let r=new Set;return e.traverse(function(e){if(!(e.isMesh||e.isPoints||e.isLine||e.isSprite))return;let i=e.material;if(i){if(Array.isArray(i))for(let a=0;a<i.length;a++){let o=i[a];it(o,n,t,e),r.add(o)}else it(i,n,t,e),r.add(i)}}),x=C.pop(),k!==null&&k.renderEnd(),r},this.compileAsync=function(e,t,n=null){let r=this.compile(e,t,n);return new Promise(t=>{function n(){if(r.forEach(function(e){let t=ke.get(e).currentProgram;(t===void 0||t.isReady())&&r.delete(e)}),r.size===0){t(e);return}setTimeout(n,10)}Ee.get(`KHR_parallel_shader_compile`)===null?setTimeout(n,10):n()})};let ot=null;function ct(e){ot&&ot(e)}function lt(){ft.stop()}function dt(){ft.start()}let ft=new Eo;ft.setAnimationLoop(ct),typeof self<`u`&&ft.setContext(self),this.setAnimationLoop=function(e){ot=e,Xe.setAnimationLoop(e),e===null?ft.stop():ft.start()},Xe.addEventListener(`sessionstart`,lt),Xe.addEventListener(`sessionend`,dt),this.render=function(e,t){if(t!==void 0&&t.isCamera!==!0){q(`WebGLRenderer.render: camera is not an instance of THREE.Camera.`);return}if(E===!0)return;k!==null&&k.renderStart(e,t);let n=Xe.enabled===!0&&Xe.isPresenting===!0,r=w!==null&&(B===null||n)&&w.begin(T,B);if(e.matrixWorldAutoUpdate===!0&&e.updateMatrixWorld(),t.parent===null&&t.matrixWorldAutoUpdate===!0&&t.updateMatrixWorld(),Xe.enabled===!0&&Xe.isPresenting===!0&&(w===null||w.isCompositing()===!1)&&(Xe.cameraAutoUpdate===!0&&Xe.updateCamera(t),t=Xe.getCamera()),e.isScene===!0&&e.onBeforeRender(T,e,t,B),x=Re.get(e,C.length),x.init(t),x.state.textureUnits=Ae.getTextureUnits(),C.push(x),ye.multiplyMatrices(t.projectionMatrix,t.matrixWorldInverse),ge.setFromProjectionMatrix(ye,tt,t.reversedDepth),ve=this.localClippingEnabled,_e=ze.init(this.clippingPlanes,ve),b=Le.get(e,S.length),b.init(),S.push(b),Xe.enabled===!0&&Xe.isPresenting===!0){let e=T.xr.getDepthSensingMesh();e!==null&&pt(e,t,-1/0,T.sortObjects)}pt(e,t,0,T.sortObjects),b.finish(),k!==null&&k.updateLights(x.state.lightsArray),T.sortObjects===!0&&b.sort(de,fe),Ce=Xe.enabled===!1||Xe.isPresenting===!1||Xe.hasDepthSensing()===!1,Ce&&Ve.addToRenderList(b,e),this.info.render.frame++,this.info.autoReset===!0&&this.info.reset(),_e===!0&&ze.beginShadows();let i=x.state.shadowsArray;if(Be.render(i,e,t),_e===!0&&ze.endShadows(),(r&&w.hasRenderPass())===!1){let n=b.opaque,r=b.transmissive;if(x.setupLights(),t.isArrayCamera){let i=t.cameras;if(r.length>0)for(let t=0,a=i.length;t<a;t++){let a=i[t];ht(n,r,e,a)}Ce&&Ve.render(e);for(let t=0,n=i.length;t<n;t++){let n=i[t];mt(b,e,n,n.viewport)}}else r.length>0&&ht(n,r,e,t),Ce&&Ve.render(e),mt(b,e,t)}B!==null&&ee===0&&(Ae.updateMultisampleRenderTarget(B),Ae.updateRenderTargetMipmap(B)),r&&w.end(T),e.isScene===!0&&e.onAfterRender(T,e,t),Ke.resetDefaultState(),te=-1,V=null,C.pop(),C.length>0?(x=C[C.length-1],Ae.setTextureUnits(x.state.textureUnits),_e===!0&&ze.setGlobalState(T.clippingPlanes,x.state.camera)):x=null,S.pop(),b=S.length>0?S[S.length-1]:null,k!==null&&k.renderEnd()};function pt(e,t,n,r){if(e.visible===!1)return;if(e.layers.test(t.layers)){if(e.isGroup)n=e.renderOrder;else if(e.isLOD)e.autoUpdate===!0&&e.update(t);else if(e.isLightProbeGrid)x.pushLightProbeGrid(e);else if(e.isLight)x.pushLight(e),e.castShadow&&x.pushShadow(e);else if(e.isSprite){if(!e.frustumCulled||e.intersectsFrustum(ge)){r&&xe.setFromMatrixPosition(e.matrixWorld).applyMatrix4(ye);let i=Pe.update(e),a=e.material;a.visible&&b.push(e,i,a,n,xe.z,null,t)}}else if((e.isMesh||e.isLine||e.isPoints)&&(!e.frustumCulled||e.intersectsFrustum(ge))){let i=Pe.update(e),a=e.material;if(r&&(e.boundingSphere===void 0?(i.boundingSphere===null&&i.computeBoundingSphere(),xe.copy(i.boundingSphere.center)):(e.boundingSphere===null&&e.computeBoundingSphere(),xe.copy(e.boundingSphere.center)),xe.applyMatrix4(e.matrixWorld).applyMatrix4(ye)),Array.isArray(a)){let r=i.groups;for(let o=0,s=r.length;o<s;o++){let s=r[o],c=a[s.materialIndex];c&&c.visible&&b.push(e,i,c,n,xe.z,s,t)}}else a.visible&&b.push(e,i,a,n,xe.z,null,t)}}let i=e.children;for(let e=0,a=i.length;e<a;e++)pt(i[e],t,n,r)}function mt(e,t,n,r){let{opaque:i,transmissive:a,transparent:o}=e;x.setupLightsView(n),_e===!0&&ze.setGlobalState(T.clippingPlanes,n),r&&G.viewport(H.copy(r)),i.length>0&&gt(i,t,n),a.length>0&&gt(a,t,n),o.length>0&&gt(o,t,n),G.buffers.depth.setTest(!0),G.buffers.depth.setMask(!0),G.buffers.color.setMask(!0),G.setPolygonOffset(!1)}function ht(e,t,n,r){if((n.isScene===!0?n.overrideMaterial:null)!==null)return;if(x.state.transmissionRenderTarget[r.id]===void 0){let e=Ee.has(`EXT_color_buffer_half_float`)||Ee.has(`EXT_color_buffer_float`);x.state.transmissionRenderTarget[r.id]=new cn(1,1,{generateMipmaps:!0,type:e?F:O,minFilter:D,samples:Math.max(4,De.samples),stencilBuffer:i,resolveDepthBuffer:!1,resolveStencilBuffer:!1,storeMultisampledDepthBuffer:!1,storeMultisampledStencilBuffer:!1,colorSpace:Jt.workingColorSpace})}let a=x.state.transmissionRenderTarget[r.id],o=r.viewport||H;a.setSize(o.z*T.transmissionResolutionScale,o.w*T.transmissionResolutionScale);let s=T.getRenderTarget(),c=T.getActiveCubeFace(),l=T.getActiveMipmapLevel();T.setRenderTarget(a),T.getClearColor(ae),ce=T.getClearAlpha(),ce<1&&T.setClearColor(16777215,.5),T.clear(),Ce&&Ve.render(n);let u=T.toneMapping;T.toneMapping=0;let d=r.viewport;if(r.viewport!==void 0&&(r.viewport=void 0),x.setupLightsView(r),_e===!0&&ze.setGlobalState(T.clippingPlanes,r),gt(e,n,r),Ae.updateMultisampleRenderTarget(a),Ae.updateRenderTargetMipmap(a),Ee.has(`WEBGL_multisampled_render_to_texture`)===!1){let e=!1;for(let i=0,a=t.length;i<a;i++){let{object:a,geometry:o,material:s,group:c}=t[i];if(s.side===2&&a.layers.test(r.layers)){let t=s.side;s.side=1,s.needsUpdate=!0,_t(a,n,r,o,s,c),s.side=t,s.needsUpdate=!0,e=!0}}e===!0&&(Ae.updateMultisampleRenderTarget(a),Ae.updateRenderTargetMipmap(a))}T.setRenderTarget(s,c,l),T.setClearColor(ae,ce),d!==void 0&&(r.viewport=d),T.toneMapping=u}function gt(e,t,n){let r=t.isScene===!0?t.overrideMaterial:null;for(let i=0,a=e.length;i<a;i++){let a=e[i],{object:o,geometry:s,group:c}=a,l=a.material;l.allowOverride===!0&&r!==null&&(l=r),o.layers.test(n.layers)&&_t(o,t,n,s,l,c)}}function _t(e,t,n,r,i,a){k!==null&&i.isNodeMaterial&&k.setObject(e,i),e.onBeforeRender(T,t,n,r,i,a),e.modelViewMatrix.multiplyMatrices(n.matrixWorldInverse,e.matrixWorld),e.normalMatrix.getNormalMatrix(e.modelViewMatrix),i.onBeforeRender(T,t,n,r,e,a),i.transparent===!0&&i.side===2&&i.forceSinglePass===!1?(i.side=1,i.needsUpdate=!0,T.renderBufferDirect(n,t,r,i,e,a),i.side=0,i.needsUpdate=!0,T.renderBufferDirect(n,t,r,i,e,a),i.side=2):T.renderBufferDirect(n,t,r,i,e,a),e.onAfterRender(T,t,n,r,i,a)}function vt(e,t,n){t.isScene!==!0&&(t=Se);let r=ke.get(e),i=x.state.lights,a=x.state.shadowsArray,o=i.state.version,s=Fe.getParameters(e,i.state,a,t,n,x.state.lightProbeGridArray),c=Fe.getProgramCacheKey(s),l=r.programs;r.environment=e.isMeshStandardMaterial||e.isMeshLambertMaterial||e.isMeshPhongMaterial?t.environment:null,r.fog=t.fog;let u=e.isMeshStandardMaterial||e.isMeshLambertMaterial&&!e.envMap||e.isMeshPhongMaterial&&!e.envMap;r.envMap=je.get(e.envMap||r.environment,u),r.envMapRotation=r.environment!==null&&e.envMap===null?t.environmentRotation:e.envMapRotation,l===void 0&&(e.addEventListener(`dispose`,et),l=new Map,r.programs=l);let d=l.get(c);if(d!==void 0){if(r.currentProgram===d&&r.lightsStateVersion===o)return bt(e,s),d}else s.uniforms=Fe.getUniforms(e),k!==null&&e.isNodeMaterial&&k.build(e,n,s),e.onBeforeCompile(s,T),d=Fe.acquireProgram(s,c),l.set(c,d),r.uniforms=s.uniforms;let f=r.uniforms;return(!e.isShaderMaterial&&!e.isRawShaderMaterial||e.clipping===!0)&&(f.clippingPlanes=ze.uniform),bt(e,s),r.needsLights=wt(e),r.lightsStateVersion=o,r.needsLights&&(f.ambientLightColor.value=i.state.ambient,f.lightProbe.value=i.state.probe,f.sunLights.value=i.state.sun,f.sunLightShadows.value=i.state.sunShadow,f.directionalLights.value=i.state.directional,f.directionalLightShadows.value=i.state.directionalShadow,f.spotLights.value=i.state.spot,f.spotLightShadows.value=i.state.spotShadow,f.rectAreaLights.value=i.state.rectArea,f.ltc_1.value=i.state.rectAreaLTC1,f.ltc_2.value=i.state.rectAreaLTC2,f.pointLights.value=i.state.point,f.pointLightShadows.value=i.state.pointShadow,f.hemisphereLights.value=i.state.hemi,f.sunShadowMatrix.value=i.state.sunShadowMatrix,f.sunShadowCascade.value=i.state.sunShadowCascade,f.directionalShadowMatrix.value=i.state.directionalShadowMatrix,f.spotLightMatrix.value=i.state.spotLightMatrix,f.spotLightMap.value=i.state.spotLightMap,f.pointShadowMatrix.value=i.state.pointShadowMatrix),r.lightProbeGrid=x.state.lightProbeGridArray.length>0,r.currentProgram=d,r.uniformsList=null,d}function yt(e){if(e.uniformsList===null){let t=e.currentProgram.getUniforms();e.uniformsList=xc.seqWithValue(t.seq,e.uniforms)}return e.uniformsList}function bt(e,t){let n=ke.get(e);n.outputColorSpace=t.outputColorSpace,n.batching=t.batching,n.batchingColor=t.batchingColor,n.instancing=t.instancing,n.instancingColor=t.instancingColor,n.instancingMorph=t.instancingMorph,n.skinning=t.skinning,n.morphTargets=t.morphTargets,n.morphNormals=t.morphNormals,n.morphColors=t.morphColors,n.morphTargetsCount=t.morphTargetsCount,n.numClippingPlanes=t.numClippingPlanes,n.numIntersection=t.numClipIntersection,n.vertexAlphas=t.vertexAlphas,n.vertexTangents=t.vertexTangents,n.toneMapping=t.toneMapping}function xt(e,t){if(e.length===0)return null;if(e.length===1)return e[0].texture===null?null:e[0];y.setFromMatrixPosition(t.matrixWorld);for(let t=0,n=e.length;t<n;t++){let n=e[t];if(n.texture!==null&&n.boundingBox.containsPoint(y))return n}return null}function St(e,t,n,r,i){t.isScene!==!0&&(t=Se),Ae.resetTextureUnits();let a=t.fog,o=r.isMeshStandardMaterial||r.isMeshLambertMaterial||r.isMeshPhongMaterial?t.environment:null,s=B===null?T.outputColorSpace:B.isXRRenderTarget===!0?B.texture.colorSpace:Jt.workingColorSpace,c=r.isMeshStandardMaterial||r.isMeshLambertMaterial&&!r.envMap||r.isMeshPhongMaterial&&!r.envMap,l=je.get(r.envMap||o,c),u=r.vertexColors===!0&&!!n.attributes.color&&n.attributes.color.itemSize===4,d=!!n.attributes.tangent&&(!!r.normalMap||r.anisotropy>0),f=!!n.morphAttributes.position,p=!!n.morphAttributes.normal,m=!!n.morphAttributes.color,h=0;r.toneMapped&&(B===null||B.isXRRenderTarget===!0)&&(h=T.toneMapping);let g=n.morphAttributes.position||n.morphAttributes.normal||n.morphAttributes.color,_=g===void 0?0:g.length,v=ke.get(r),y=x.state.lights;if(_e===!0&&(ve===!0||e!==V)){let t=e===V&&r.id===te;ze.setState(r,e,t)}let b=!1;r.version===v.__version?v.needsLights&&v.lightsStateVersion!==y.state.version?b=!0:v.outputColorSpace===s?i.isBatchedMesh&&v.batching===!1||!i.isBatchedMesh&&v.batching===!0||i.isBatchedMesh&&v.batchingColor===!0&&i._colorsTexture===null||i.isBatchedMesh&&v.batchingColor===!1&&i._colorsTexture!==null||i.isInstancedMesh&&v.instancing===!1||!i.isInstancedMesh&&v.instancing===!0||i.isSkinnedMesh&&v.skinning===!1||!i.isSkinnedMesh&&v.skinning===!0||i.isInstancedMesh&&v.instancingColor===!0&&i.instanceColor===null||i.isInstancedMesh&&v.instancingColor===!1&&i.instanceColor!==null||i.isInstancedMesh&&v.instancingMorph===!0&&i.morphTexture===null||i.isInstancedMesh&&v.instancingMorph===!1&&i.morphTexture!==null?b=!0:v.envMap===l?r.fog===!0&&v.fog!==a||v.numClippingPlanes!==void 0&&(v.numClippingPlanes!==ze.numPlanes||v.numIntersection!==ze.numIntersection)?b=!0:v.vertexAlphas===u&&v.vertexTangents===d&&v.morphTargets===f&&v.morphNormals===p&&v.morphColors===m&&v.toneMapping===h&&v.morphTargetsCount===_?!!v.lightProbeGrid!=x.state.lightProbeGridArray.length>0&&(b=!0):b=!0:b=!0:b=!0:(b=!0,v.__version=r.version);let S=v.currentProgram;b===!0&&(S=vt(r,t,i),k&&r.isNodeMaterial&&k.onUpdateProgram(r,S,v));let C=!1,w=!1,E=!1,D=S.getUniforms(),O=v.uniforms;if(G.useProgram(S.program)&&(C=!0,w=!0,E=!0),r.id!==te&&(te=r.id,w=!0),v.needsLights){let e=xt(x.state.lightProbeGridArray,i);v.lightProbeGrid!==e&&(v.lightProbeGrid=e,w=!0)}if(C||V!==e){G.buffers.depth.getReversed()&&e.reversedDepth!==!0&&(e._reversedDepth=!0,e.updateProjectionMatrix()),D.setValue(W,`projectionMatrix`,e.projectionMatrix),D.setValue(W,`viewMatrix`,e.matrixWorldInverse);let t=D.map.cameraPosition;t!==void 0&&t.setValue(W,be.setFromMatrixPosition(e.matrixWorld)),De.logarithmicDepthBuffer&&D.setValue(W,`logDepthBufFC`,2/(Math.log(e.far+1)/Math.LN2)),(r.isMeshPhongMaterial||r.isMeshToonMaterial||r.isMeshLambertMaterial||r.isMeshBasicMaterial||r.isMeshStandardMaterial||r.isShaderMaterial)&&D.setValue(W,`isOrthographic`,e.isOrthographicCamera===!0),V!==e&&(V=e,w=!0,E=!0)}if(v.needsLights&&(y.state.sunShadowMap.length>0&&D.setValue(W,`sunShadowMap`,y.state.sunShadowMap,Ae),y.state.directionalShadowMap.length>0&&D.setValue(W,`directionalShadowMap`,y.state.directionalShadowMap,Ae),y.state.spotShadowMap.length>0&&D.setValue(W,`spotShadowMap`,y.state.spotShadowMap,Ae),y.state.pointShadowMap.length>0&&D.setValue(W,`pointShadowMap`,y.state.pointShadowMap,Ae)),i.isSkinnedMesh){D.setOptional(W,i,`bindMatrix`),D.setOptional(W,i,`bindMatrixInverse`);let e=i.skeleton;e&&(e.boneTexture===null&&e.computeBoneTexture(),D.setValue(W,`boneTexture`,e.boneTexture,Ae))}i.isBatchedMesh&&(D.setOptional(W,i,`batchingTexture`),D.setValue(W,`batchingTexture`,i._matricesTexture,Ae),D.setOptional(W,i,`batchingIdTexture`),D.setValue(W,`batchingIdTexture`,i._indirectTexture,Ae),D.setOptional(W,i,`batchingColorTexture`),i._colorsTexture!==null&&D.setValue(W,`batchingColorTexture`,i._colorsTexture,Ae));let A=n.morphAttributes;if((A.position!==void 0||A.normal!==void 0||A.color!==void 0)&&He.update(i,n,S),(w||v.receiveShadow!==i.receiveShadow)&&(v.receiveShadow=i.receiveShadow,D.setValue(W,`receiveShadow`,i.receiveShadow)),(r.isMeshStandardMaterial||r.isMeshLambertMaterial||r.isMeshPhongMaterial)&&r.envMap===null&&t.environment!==null&&(O.envMapIntensity.value=t.environmentIntensity),O.dfgLUT!==void 0&&(O.dfgLUT.value=Hl()),w){if(D.setValue(W,`toneMappingExposure`,T.toneMappingExposure),v.needsLights&&Ct(O,E),a&&r.fog===!0&&Ie.refreshFogUniforms(O,a),Ie.refreshMaterialUniforms(O,r,U,ue,x.state.transmissionRenderTarget[e.id]),v.needsLights&&v.lightProbeGrid){let e=v.lightProbeGrid;O.probesSH.value=e.texture,O.probesMin.value.copy(e.boundingBox.min),O.probesMax.value.copy(e.boundingBox.max),O.probesResolution.value.copy(e.resolution)}xc.upload(W,yt(v),O,Ae)}if(r.isShaderMaterial&&r.uniformsNeedUpdate===!0&&(xc.upload(W,yt(v),O,Ae),r.uniformsNeedUpdate=!1),r.isSpriteMaterial&&D.setValue(W,`center`,i.center),D.setValue(W,`modelViewMatrix`,i.modelViewMatrix),D.setValue(W,`normalMatrix`,i.normalMatrix),D.setValue(W,`modelMatrix`,i.matrixWorld),r.uniformsGroups!==void 0){let e=r.uniformsGroups;for(let t=0,n=e.length;t<n;t++){let n=e[t];qe.update(n,S),qe.bind(n,S)}}return S}function Ct(e,t){e.ambientLightColor.needsUpdate=t,e.lightProbe.needsUpdate=t,e.sunLights.needsUpdate=t,e.sunLightShadows.needsUpdate=t,e.directionalLights.needsUpdate=t,e.directionalLightShadows.needsUpdate=t,e.pointLights.needsUpdate=t,e.pointLightShadows.needsUpdate=t,e.spotLights.needsUpdate=t,e.spotLightShadows.needsUpdate=t,e.rectAreaLights.needsUpdate=t,e.hemisphereLights.needsUpdate=t}function wt(e){return e.isMeshLambertMaterial||e.isMeshToonMaterial||e.isMeshPhongMaterial||e.isMeshStandardMaterial||e.isShadowMaterial||e.isShaderMaterial&&e.lights===!0}this.getActiveCubeFace=function(){return z},this.getActiveMipmapLevel=function(){return ee},this.getRenderTarget=function(){return B},this.setRenderTargetTextures=function(e,t,n){let r=ke.get(e);r.__autoAllocateDepthBuffer=e.resolveDepthBuffer===!1,r.__autoAllocateDepthBuffer===!1&&(r.__useRenderToTexture=!1),ke.get(e.texture).__webglTexture=t,ke.get(e.depthTexture).__webglTexture=r.__autoAllocateDepthBuffer?void 0:n,r.__hasExternalTextures=!0},this.setRenderTargetFramebuffer=function(e,t){let n=ke.get(e);n.__webglFramebuffer=t,n.__useDefaultFramebuffer=t===void 0},this.setRenderTarget=function(e,t=0,n=0){B=e,z=t,ee=n;let r=null,i=!1,a=!1;if(e){let o=ke.get(e);if(o.__useDefaultFramebuffer!==void 0){G.bindFramebuffer(W.FRAMEBUFFER,o.__webglFramebuffer),H.copy(e.viewport),ne.copy(e.scissor),re=e.scissorTest,G.viewport(H),G.scissor(ne),G.setScissorTest(re),te=-1;return}if(o.__webglFramebuffer===void 0)Ae.setupRenderTarget(e);else if(o.__hasExternalTextures)Ae.rebindTextures(e,ke.get(e.texture).__webglTexture,ke.get(e.depthTexture).__webglTexture);else if(e.depthBuffer){let t=e.depthTexture;if(o.__boundDepthTexture!==t){if(t!==null&&ke.has(t)&&(e.width!==t.image.width||e.height!==t.image.height))throw Error(`THREE.WebGLRenderer: Attached DepthTexture is initialized to the incorrect size.`);Ae.setupDepthRenderbuffer(e)}}let s=e.texture;(s.isData3DTexture||s.isDataArrayTexture||s.isCompressedArrayTexture)&&(a=!0);let c=ke.get(e).__webglFramebuffer;e.isWebGLCubeRenderTarget?(r=Array.isArray(c[t])?c[t][n]:c[t],i=!0):r=e.samples>0&&Ae.useMultisampledRTT(e)===!1?ke.get(e).__webglMultisampledFramebuffer:Array.isArray(c)?c[n]:c,H.copy(e.viewport),ne.copy(e.scissor),re=e.scissorTest}else H.copy(pe).multiplyScalar(U).floor(),ne.copy(me).multiplyScalar(U).floor(),re=he;if(n!==0&&(r=A),G.bindFramebuffer(W.FRAMEBUFFER,r)&&G.drawBuffers(e,r),G.viewport(H),G.scissor(ne),G.setScissorTest(re),i){let r=ke.get(e.texture);W.framebufferTexture2D(W.FRAMEBUFFER,W.COLOR_ATTACHMENT0,W.TEXTURE_CUBE_MAP_POSITIVE_X+t,r.__webglTexture,n)}else if(a){let r=t;for(let t=0;t<e.textures.length;t++){let i=ke.get(e.textures[t]);W.framebufferTextureLayer(W.FRAMEBUFFER,W.COLOR_ATTACHMENT0+t,i.__webglTexture,n,r)}}else if(e!==null&&n!==0){let t=ke.get(e.texture);W.framebufferTexture2D(W.FRAMEBUFFER,W.COLOR_ATTACHMENT0,W.TEXTURE_2D,t.__webglTexture,n)}te=-1};function Tt(e){let t=ke.get(e);return(t.__readFormat!==e.format||t.__readType!==e.type)&&(t.__readFormat=e.format,t.__readType=e.type,t.__formatReadable=De.textureFormatReadable(e.format),t.__typeReadable=De.textureTypeReadable(e.type)),t}this.readRenderTargetPixels=function(e,t,n,r,i,a,o,s=0){if(!(e&&e.isWebGLRenderTarget)){q(`WebGLRenderer.readRenderTargetPixels: renderTarget is not THREE.WebGLRenderTarget.`);return}let c=ke.get(e).__webglFramebuffer;if(e.isWebGLCubeRenderTarget&&o!==void 0&&(c=c[o]),c){G.bindFramebuffer(W.FRAMEBUFFER,c);try{let o=e.textures[s],c=o.format,l=o.type;e.textures.length>1&&W.readBuffer(W.COLOR_ATTACHMENT0+s);let u=Tt(o);if(u.__formatReadable===!1){q(`WebGLRenderer.readRenderTargetPixels: renderTarget is not in RGBA or implementation defined format.`);return}if(u.__typeReadable===!1){q(`WebGLRenderer.readRenderTargetPixels: renderTarget is not in UnsignedByteType or implementation defined type.`);return}t>=0&&t<=e.width-r&&n>=0&&n<=e.height-i&&W.readPixels(t,n,r,i,Ge.convert(c),Ge.convert(l),a)}finally{let e=B===null?null:ke.get(B).__webglFramebuffer;G.bindFramebuffer(W.FRAMEBUFFER,e)}}},this.readRenderTargetPixelsAsync=async function(e,t,n,r,i,a,o,s=0){if(!(e&&e.isWebGLRenderTarget))throw Error(`THREE.WebGLRenderer.readRenderTargetPixels: renderTarget is not THREE.WebGLRenderTarget.`);let c=ke.get(e).__webglFramebuffer;if(e.isWebGLCubeRenderTarget&&o!==void 0&&(c=c[o]),c){if(t>=0&&t<=e.width-r&&n>=0&&n<=e.height-i){G.bindFramebuffer(W.FRAMEBUFFER,c);let o=e.textures[s],l=o.format,u=o.type;e.textures.length>1&&W.readBuffer(W.COLOR_ATTACHMENT0+s);let d=Tt(o);if(d.__formatReadable===!1)throw Error(`THREE.WebGLRenderer.readRenderTargetPixelsAsync: renderTarget is not in RGBA or implementation defined format.`);if(d.__typeReadable===!1)throw Error(`THREE.WebGLRenderer.readRenderTargetPixelsAsync: renderTarget is not in UnsignedByteType or implementation defined type.`);let f=W.createBuffer();W.bindBuffer(W.PIXEL_PACK_BUFFER,f),W.bufferData(W.PIXEL_PACK_BUFFER,a.byteLength,W.STREAM_READ),W.readPixels(t,n,r,i,Ge.convert(l),Ge.convert(u),0),W.bindBuffer(W.PIXEL_PACK_BUFFER,null);let p=B===null?null:ke.get(B).__webglFramebuffer;G.bindFramebuffer(W.FRAMEBUFFER,p);let m=W.fenceSync(W.SYNC_GPU_COMMANDS_COMPLETE,0);return W.flush(),await ut(W,m,4),W.bindBuffer(W.PIXEL_PACK_BUFFER,f),W.getBufferSubData(W.PIXEL_PACK_BUFFER,0,a),W.bindBuffer(W.PIXEL_PACK_BUFFER,null),W.deleteBuffer(f),W.deleteSync(m),a}throw Error(`THREE.WebGLRenderer.readRenderTargetPixelsAsync: requested read bounds are out of range.`)}},this.copyFramebufferToTexture=function(e,t=null,n=0){let r=2**-n,i=Math.floor(e.image.width*r),a=Math.floor(e.image.height*r),o=t===null?0:t.x,s=t===null?0:t.y;Ae.setTexture2D(e,0),W.copyTexSubImage2D(W.TEXTURE_2D,n,0,0,o,s,i,a),G.unbindTexture()},this.copyTextureToTexture=function(e,t,n=null,r=null,i=0,a=0){let o,s,c,l,u,d,f,p,m,h=e.isCompressedTexture?e.mipmaps[a]:e.image;if(n!==null)o=n.max.x-n.min.x,s=n.max.y-n.min.y,c=n.isBox3?n.max.z-n.min.z:1,l=n.min.x,u=n.min.y,d=n.isBox3?n.min.z:0;else{let t=2**-i;o=Math.floor(h.width*t),s=Math.floor(h.height*t),c=e.isDataArrayTexture?h.depth:e.isData3DTexture?Math.floor(h.depth*t):1,l=0,u=0,d=0}r===null?(f=0,p=0,m=0):(f=r.x,p=r.y,m=r.z);let g=Ge.convert(t.format),_=Ge.convert(t.type),v;t.isData3DTexture?(Ae.setTexture3D(t,0),v=W.TEXTURE_3D):t.isDataArrayTexture||t.isCompressedArrayTexture?(Ae.setTexture2DArray(t,0),v=W.TEXTURE_2D_ARRAY):(Ae.setTexture2D(t,0),v=W.TEXTURE_2D),G.activeTexture(W.TEXTURE0),G.pixelStorei(W.UNPACK_FLIP_Y_WEBGL,t.flipY),G.pixelStorei(W.UNPACK_PREMULTIPLY_ALPHA_WEBGL,t.premultiplyAlpha),G.pixelStorei(W.UNPACK_ALIGNMENT,t.unpackAlignment);let y=G.getParameter(W.UNPACK_ROW_LENGTH),b=G.getParameter(W.UNPACK_IMAGE_HEIGHT),x=G.getParameter(W.UNPACK_SKIP_PIXELS),S=G.getParameter(W.UNPACK_SKIP_ROWS),C=G.getParameter(W.UNPACK_SKIP_IMAGES);G.pixelStorei(W.UNPACK_ROW_LENGTH,h.width),G.pixelStorei(W.UNPACK_IMAGE_HEIGHT,h.height),G.pixelStorei(W.UNPACK_SKIP_PIXELS,l),G.pixelStorei(W.UNPACK_SKIP_ROWS,u),G.pixelStorei(W.UNPACK_SKIP_IMAGES,d);let w=e.isDataArrayTexture||e.isData3DTexture,T=t.isDataArrayTexture||t.isData3DTexture;if(e.isDepthTexture){let n=ke.get(e),r=ke.get(t),h=ke.get(n.__renderTarget),g=ke.get(r.__renderTarget);G.bindFramebuffer(W.READ_FRAMEBUFFER,h.__webglFramebuffer),G.bindFramebuffer(W.DRAW_FRAMEBUFFER,g.__webglFramebuffer);for(let n=0;n<c;n++)w&&(W.framebufferTextureLayer(W.READ_FRAMEBUFFER,W.COLOR_ATTACHMENT0,ke.get(e).__webglTexture,i,d+n),W.framebufferTextureLayer(W.DRAW_FRAMEBUFFER,W.COLOR_ATTACHMENT0,ke.get(t).__webglTexture,a,m+n)),W.blitFramebuffer(l,u,o,s,f,p,o,s,W.DEPTH_BUFFER_BIT,W.NEAREST);G.bindFramebuffer(W.READ_FRAMEBUFFER,null),G.bindFramebuffer(W.DRAW_FRAMEBUFFER,null)}else if(i!==0||e.isRenderTargetTexture||ke.has(e)){let n=ke.get(e),r=ke.get(t);G.bindFramebuffer(W.READ_FRAMEBUFFER,M),G.bindFramebuffer(W.DRAW_FRAMEBUFFER,P);for(let e=0;e<c;e++)w?W.framebufferTextureLayer(W.READ_FRAMEBUFFER,W.COLOR_ATTACHMENT0,n.__webglTexture,i,d+e):W.framebufferTexture2D(W.READ_FRAMEBUFFER,W.COLOR_ATTACHMENT0,W.TEXTURE_2D,n.__webglTexture,i),T?W.framebufferTextureLayer(W.DRAW_FRAMEBUFFER,W.COLOR_ATTACHMENT0,r.__webglTexture,a,m+e):W.framebufferTexture2D(W.DRAW_FRAMEBUFFER,W.COLOR_ATTACHMENT0,W.TEXTURE_2D,r.__webglTexture,a),i===0?T?W.copyTexSubImage3D(v,a,f,p,m+e,l,u,o,s):W.copyTexSubImage2D(v,a,f,p,l,u,o,s):W.blitFramebuffer(l,u,o,s,f,p,o,s,W.COLOR_BUFFER_BIT,W.NEAREST);G.bindFramebuffer(W.READ_FRAMEBUFFER,null),G.bindFramebuffer(W.DRAW_FRAMEBUFFER,null)}else T?e.isDataTexture||e.isData3DTexture?W.texSubImage3D(v,a,f,p,m,o,s,c,g,_,h.data):t.isCompressedArrayTexture?W.compressedTexSubImage3D(v,a,f,p,m,o,s,c,g,h.data):W.texSubImage3D(v,a,f,p,m,o,s,c,g,_,h):e.isDataTexture?W.texSubImage2D(W.TEXTURE_2D,a,f,p,o,s,g,_,h.data):e.isCompressedTexture?W.compressedTexSubImage2D(W.TEXTURE_2D,a,f,p,h.width,h.height,g,h.data):W.texSubImage2D(W.TEXTURE_2D,a,f,p,o,s,g,_,h);G.pixelStorei(W.UNPACK_ROW_LENGTH,y),G.pixelStorei(W.UNPACK_IMAGE_HEIGHT,b),G.pixelStorei(W.UNPACK_SKIP_PIXELS,x),G.pixelStorei(W.UNPACK_SKIP_ROWS,S),G.pixelStorei(W.UNPACK_SKIP_IMAGES,C),a===0&&t.generateMipmaps&&W.generateMipmap(v),G.unbindTexture()},this.initRenderTarget=function(e){ke.get(e).__webglFramebuffer===void 0&&Ae.setupRenderTarget(e)},this.initTexture=function(e){e.isCubeTexture?Ae.setTextureCube(e,0):e.isData3DTexture?Ae.setTexture3D(e,0):e.isDataArrayTexture||e.isCompressedArrayTexture?Ae.setTexture2DArray(e,0):Ae.setTexture2D(e,0),G.unbindTexture()},this.resetState=function(){z=0,ee=0,B=null,G.reset(),Ke.reset()},typeof __THREE_DEVTOOLS__<`u`&&__THREE_DEVTOOLS__.dispatchEvent(new CustomEvent(`observe`,{detail:this}))}get coordinateSystem(){return tt}get outputColorSpace(){return this._outputColorSpace}set outputColorSpace(e){this._outputColorSpace=e;let t=this.getContext();t.drawingBufferColorSpace=Jt._getDrawingBufferColorSpace(e),t.unpackColorSpace=Jt._getUnpackColorSpace()}},Wl=new WeakSet;function Gl(e){if(Wl.has(e))return;Wl.add(e);let t=e.onBeforeCompile,n=e.customProgramCacheKey.bind(e);e.onBeforeCompile=(n,r)=>{t.call(e,n,r),e.clearcoatNormalMap?.format===1030&&(n.fragmentShader=n.fragmentShader.replace(`#include <clearcoat_normal_fragment_maps>`,Oo.clearcoat_normal_fragment_maps).replace(`clearcoatMapN.xy *= clearcoatNormalScale;`,`clearcoatMapN.z = sqrt(max(0.0, 1.0 - dot(clearcoatMapN.xy, clearcoatMapN.xy)));
clearcoatMapN.xy *= clearcoatNormalScale;`))},e.customProgramCacheKey=()=>n()+`-packed-coat-`+String(e.clearcoatNormalMap?.format),e.needsUpdate=!0}var Kl=16777216,ql=e=>e.encoding===`hfn1-gzip`?Math.ceil(e.width*e.height*4*4/3):e.gpuBytes,Jl=e=>e.encoding===`hfn1-gzip`?e.width*e.height*4:e.decodedBytes;function Yl(){let e={phase:`loading`,receivedBytes:0,totalBytes:0,lastProgressAt:0,error:null},t=new Set,n=()=>({...e}),r=r=>{r.receivedBytes!==void 0&&r.receivedBytes>e.receivedBytes&&(r.lastProgressAt=Date.now()),e={...e,...r};for(let e of t)try{e(n())}catch(e){console.error(`Load listener failed`,e)}};return{get:n,publish:r,subscribe:e=>(t.add(e),e(n()),()=>{t.delete(e)}),whenReady:({signal:n}={})=>new Promise((r,i)=>{let a=()=>{},o=()=>{a(),n?.removeEventListener(`abort`,o),i(new DOMException(`Viewer wait cancelled`,`AbortError`))};if(n?.aborted){o();return}n?.addEventListener(`abort`,o,{once:!0});let s=e=>{(e.phase===`ready`||e.phase===`error`||e.phase===`disposed`)&&(a(),n?.removeEventListener(`abort`,o),e.phase===`ready`?r():i(Error(e.error??`Viewer disposed`)))};t.add(s),a=()=>{t.delete(s)},s(e)}),dispose(){r({phase:`disposed`,error:`Viewer disposed`}),t.clear()}}}var Xl=class{samples=[];start=0;previous=0;slow=0;reason=``;reset(){this.samples=[],this.start=this.previous=0,this.slow=0}sample(e,t){if(this.reason)return this.reason;if(!t)return this.reset(),``;let n=this.previous?e-this.previous:0;if(this.previous=e,this.start||=e,n>0&&this.samples.push(n),e-this.start<2e3)return``;let r=this.samples.sort((e,t)=>e-t),i=r[Math.max(0,Math.ceil(r.length*.95)-1)]??0;return this.slow=i>1e3/30+.5?this.slow+1:0,this.samples=[],this.start=e,this.slow>=2&&(this.reason=`sustained-frame-budget`),this.reason}},Zl=location.pathname.startsWith(`/dev`)?`dev`:`consumer`;document.documentElement.dataset.profile=Zl;var Ql=()=>new DOMException(`Resource request cancelled`,`AbortError`),$l=class{limit;active=0;paused=!1;waiting=[];constructor(e){if(this.limit=e,e<1)throw Error(`Invalid queue limit`)}run(e,t){return t?.aborted?Promise.reject(Ql()):new Promise((n,r)=>{let i={run:()=>{t?.removeEventListener(`abort`,a),this.active++,Promise.resolve().then(()=>{if(t?.aborted)throw Ql();return e()}).then(n,r).finally(()=>{this.active--,this.pump()})},cancel:()=>a()},a=()=>{let e=this.waiting.indexOf(i);e>=0&&(this.waiting.splice(e,1),t?.removeEventListener(`abort`,a),r(Ql()))};t?.addEventListener(`abort`,a,{once:!0}),this.waiting.push(i),this.pump()})}pump(){for(;!this.paused&&this.active<this.limit&&this.waiting.length;)this.waiting.shift().run()}pause(e){this.paused=e,this.pump()}debug(){return{active:this.active,queued:this.waiting.length,limit:this.limit,paused:this.paused}}};async function eu(e,t,n){if(!Number.isSafeInteger(t)||t<0)throw Error(`Invalid resource byte length`);let r=new Uint8Array(t),i=e.getReader(),a=0;try{for(;;){let e=await i.read();if(e.done)break;let o=a+e.value.byteLength;if(o>t)throw Error(`Resource exceeds declared byte budget`);r.set(e.value,a),a=o,n?.(a)}if(a!==t)throw Error(`Resource is shorter than declared byte length`);return r.buffer}catch(e){throw await i.cancel().catch(()=>{}),e}finally{i.releaseLock()}}var tu=class extends Error{status;constructor(e){super(`Resource HTTP ${e}`),this.status=e}};async function nu(e,t,n){let{signal:r,onProgress:i,idleMs:a=12e4,request:o=fetch,backoffMs:s=400}=n;for(let n=0;n<3;n++){if(r.aborted)throw Ql();let c=new AbortController,l,u=0,d=!1,f=()=>{clearTimeout(l),(typeof document>`u`||!document.hidden)&&(l=setTimeout(()=>{d=!0,c.abort()},a))},p=()=>c.abort();r.addEventListener(`abort`,p,{once:!0}),typeof document<`u`&&document.addEventListener(`visibilitychange`,f);let m=!1;try{i?.(0),f();let n=await o(e,{signal:c.signal});if(f(),!n.ok)throw await n.body?.cancel(),new tu(n.status);if(!n.body)throw Error(`Resource response has no body`);return await eu(n.body,t,e=>{e>u&&(u=e,f()),i?.(e)})}catch(e){if(r.aborted)throw Ql();if(m=d||e instanceof TypeError||e instanceof tu&&([408,429].includes(e.status)||e.status>=500),!m||n===2)throw d?Error(`Resource download stalled`):e}finally{clearTimeout(l),r.removeEventListener(`abort`,p),typeof document<`u`&&document.removeEventListener(`visibilitychange`,f)}m&&await new Promise((e,t)=>{let i=()=>{r.removeEventListener(`abort`,a),e()},a=()=>{clearTimeout(o),r.removeEventListener(`abort`,a),t(Ql())},o=setTimeout(i,s*2**n);r.addEventListener(`abort`,a,{once:!0}),r.aborted&&a()})}throw Error(`Resource download failed`)}async function ru(e,t,n){if(Array.from(new Uint8Array(await crypto.subtle.digest(`SHA-256`,e))).map(e=>e.toString(16).padStart(2,`0`)).join(``)!==t.sha256)throw Error(`Resource checksum mismatch`);if(n.aborted)throw Ql();let r=await new Promise((t,r)=>{let i=new Image,a=URL.createObjectURL(new Blob([e],{type:`image/webp`})),o=()=>{clearTimeout(l),n.removeEventListener(`abort`,c),i.onload=i.onerror=null,URL.revokeObjectURL(a)},s=e=>{o(),i.src=``,r(e)},c=()=>s(Ql()),l=setTimeout(()=>s(Error(`Image decode timed out`)),15e3);i.onload=()=>{o(),t(i)},i.onerror=()=>s(Error(`Image decode failed`)),n.addEventListener(`abort`,c,{once:!0}),i.src=a}),i=()=>{r.src=``};if(n.aborted)throw i(),Ql();if(r.naturalWidth!==t.width||r.naturalHeight!==t.height)throw i(),Error(`Image dimensions differ from manifest`);if(t.channels===4)return{kind:`image`,image:Object.assign(r,{close:i})};let a=document.createElement(`canvas`);a.width=t.width,a.height=t.height;try{let e=a.getContext(`2d`,{willReadFrequently:!0});e.translate(0,t.height),e.scale(1,-1),e.drawImage(r,0,0);let n=e.getImageData(0,0,t.width,t.height).data,i=new Uint8Array(t.width*t.height*t.channels);for(let e=0;e<t.width*t.height;e++)for(let r=0;r<t.channels;r++)i[e*t.channels+r]=n[e*4+r];return{kind:`data`,data:i}}finally{i(),a.width=a.height=1}}var iu=class{limit;fetcher;entries=new Map;pins=new Set;used=0;peak=0;disposed=!1;constructor(e,t){this.limit=e,this.fetcher=t}pin(e){let t=new Map(e.map(e=>[e.url,e]));if([...t.values()].reduce((e,t)=>e+t.bytes,0)>this.limit)throw Error(`Pinned resource library exceeds cache budget`);this.pins=new Set(t.keys())}drop(e,t){this.entries.get(e)===t&&(this.entries.delete(e),this.used-=t.asset.bytes,t.controller.abort(),t.data=void 0)}reserve(e){for(let[t,n]of[...this.entries].filter(([e,t])=>!this.pins.has(e)&&t.refs===0).sort((e,t)=>e[1].touched-t[1].touched)){if(this.used+e<=this.limit)break;this.drop(t,n)}if(this.used+e>this.limit)throw Error(`Encoded resource cache budget exceeded`)}async acquire(e,t){if(this.disposed||t?.aborted)throw Ql();let n=this.entries.get(e.url);if(!n){this.reserve(e.bytes);let t=new AbortController;n={asset:e,refs:0,touched:performance.now(),controller:t,promise:null};let r=n;this.entries.set(e.url,r),this.used+=e.bytes,this.peak=Math.max(this.peak,this.used),n.promise=Promise.resolve().then(()=>this.fetcher(e,t.signal)).then(async n=>{if(n.byteLength!==e.bytes)throw Error(`Encoded resource size differs from manifest`);if(Array.from(new Uint8Array(await crypto.subtle.digest(`SHA-256`,n))).map(e=>e.toString(16).padStart(2,`0`)).join(``)!==e.sha256)throw Error(`Resource checksum mismatch`);if(t.signal.aborted||this.disposed)throw Ql();return r.data=n,n}).catch(t=>{throw this.drop(e.url,r),t})}let r=n;r.refs++,r.touched=performance.now();let i=!1,a=()=>{},o=()=>{i||(i=!0,t?.removeEventListener(`abort`,a),r.refs--,r.touched=performance.now(),r.refs===0&&!r.data&&this.drop(e.url,r))};try{let e=new Promise((e,n)=>{a=()=>{o(),n(Ql())},t?.addEventListener(`abort`,a,{once:!0})}),n=await Promise.race([r.promise,e]);if(t?.removeEventListener(`abort`,a),t?.aborted)throw o(),Ql();return{bytes:n,release:o}}catch(e){throw o(),e}}async prefetch(e,t){let n=(await Promise.allSettled([...new Map(e.map(e=>[e.url,e])).values()].map(async e=>{(await this.acquire(e,t)).release()}))).find(e=>e.status===`rejected`);if(n?.status===`rejected`)throw n.reason}peek(e){let t=this.entries.get(e.url);if(t?.data)return t.touched=performance.now(),t.data}has(e){return!!this.entries.get(e.url)?.data}debug(){return{bytes:[...this.entries.values()].reduce((e,t)=>e+(t.data?.byteLength??0),0),reservedBytes:this.used,peakBytes:this.peak,limit:this.limit,entries:this.entries.size,pending:[...this.entries.values()].filter(e=>!e.data).length}}dispose(){this.disposed=!0;for(let[e,t]of this.entries)this.drop(e,t);this.pins.clear()}},au=1048576,ou=class{received=new Map;decodeTask=null;decodeRetries=0;swaps=0;entries=new Map;disposed=!1;worker;network=new $l(2);decoding=new $l(1);bytes=0;peak=0;transferred=0;cancelled=0;steady;maximum;reserve=0;encoded;previewUrls=new Map;constructor(e){this.steady=(e?128:256)*au,this.maximum=(e?192:384)*au,this.encoded=new iu(e?Kl:24*au,(e,t)=>this.fetchBytes(e,t))}disposeEntry(e,t){if(this.entries.delete(e),this.bytes-=ql(t.asset),t.controller.abort(),t.texture){t.texture.dispose();let e=t.texture.image;e?.close?.(),e&&`data`in e&&(e.data=null),t.texture.mipmaps=[],t.texture=null}}trim(e){let t=[...this.entries].filter(([,e])=>e.refs===0).sort((e,t)=>e[1].touched-t[1].touched);for(let[n,r]of t){if(this.bytes+this.reserve<=e)break;this.disposeEntry(n,r)}}get transitioning(){return this.swaps>0}beginSwap(){this.swaps++;let e=!1;return()=>{e||(e=!0,this.swaps--,this.trim(this.steady))}}trimIdle(e=this.reserve){this.trim(this.steady+this.reserve-e)}setReserve(e){this.reserve=e,this.trim(this.steady),this.peak=Math.max(this.peak,this.bytes+this.reserve)}canFit(e){let t=[...new Map(e.map(e=>[e.url,e])).values()].filter(e=>!this.entries.has(e.url)).reduce((e,t)=>e+ql(t),0);return this.trim(this.steady-t),this.bytes+this.reserve+t<=this.maximum}async acquire(e,t){if(this.disposed||t?.aborted)throw Ql();let n=this.entries.get(e.url);if(!n){if(!this.canFit([e]))throw Error(`Resource memory budget exceeded`);let t=new AbortController;n={asset:e,refs:0,touched:performance.now(),controller:t,promise:null},this.entries.set(e.url,n),this.bytes+=ql(e),this.peak=Math.max(this.peak,this.bytes+this.reserve);let r=n;n.promise=this.load(e,t.signal).then(e=>{if(t.signal.aborted||this.disposed)throw e.dispose(),e.image?.close?.(),Ql();return r.texture=e,e}).catch(t=>{throw this.entries.get(e.url)===r&&this.disposeEntry(e.url,r),t})}let r=n;r.refs++;let i=!1,a=()=>{i||(i=!0,t?.removeEventListener(`abort`,o),r.refs--,r.touched=performance.now(),r.refs===0&&!r.texture&&(this.cancelled++,r.controller.abort(),this.entries.get(e.url)===r&&this.disposeEntry(e.url,r)),this.trim(this.steady))},o=()=>{};try{let e=new Promise((e,n)=>{o=()=>{a(),n(Ql())},t?.addEventListener(`abort`,o,{once:!0})}),n=await Promise.race([r.promise,e]);if(t?.removeEventListener(`abort`,o),t?.aborted)throw a(),Ql();return{texture:n,release:a}}catch(e){throw a(),e}}async acquireAll(e,t){if(!this.canFit(e))throw Error(`Resource memory budget exceeded`);let n=await Promise.allSettled(e.map(e=>this.acquire(e,t))),r=n.flatMap(e=>e.status===`fulfilled`?[e.value]:[]),i=n.find(e=>e.status===`rejected`);if(i?.status===`rejected`)throw r.forEach(e=>e.release()),i.reason;return r}fetchBytes(e,t){return this.network.run(async()=>{let n=await nu(e.url,e.bytes,{signal:t,onProgress:t=>this.received.set(e.url,t)});return this.transferred+=n.byteLength,n},t)}async load(e,t){let n=await this.encoded.acquire(e,t),r=n.bytes;try{return await this.decoding.run(async()=>{if(t.aborted)throw Ql();this.decodeTask={asset:e.id,phase:`decode`};let n;try{if(e.encoding===`webp`)n=await ru(r,e,t);else try{n=await this.decode(r.slice(0),e,t)}catch(i){if(t.aborted||!String(i).includes(`timed out`))throw i;this.decodeRetries++,n=await this.decode(r.slice(0),e,t)}}finally{this.decodeTask=null}if(t.aborted)throw n.kind===`image`&&n.image.close(),Ql();let i;return i=n.kind===`image`?new an(n.image):new mi(n.data,e.width,e.height,e.encoding===`hfn1-gzip`?ae:e.channels===1?re:ae,e.encoding===`hfn1-gzip`?F:O),i.flipY=n.kind===`image`,i.generateMipmaps=!0,i.minFilter=D,i.magFilter=T,i.wrapS=i.wrapT=b,i.colorSpace=e.colorSpace===`srgb`?Ye:``,i.needsUpdate=!0,i.userData={assetId:e.id,gpuBytes:ql(e),precision:e.encoding===`hfn1-gzip`?`RG16F`:e.channels===1?`R8`:e.channels===2?`RG8`:`RGBA8`},i},t)}finally{n.release()}}pinFiles(e){this.encoded.pin(e)}prefetch(e,t){return this.encoded.prefetch(e,t)}fileReady(e){return this.encoded.has(e)}previewUrl(e){let t=this.previewUrls.get(e.url);if(!t){let n=this.encoded.peek(e);if(!n)throw Error(`Thumbnail was not preloaded`);t=URL.createObjectURL(new Blob([n],{type:`image/webp`})),this.previewUrls.set(e.url,t)}return t}decode(e,t,n){return new Promise((r,i)=>{let a=this.worker??=new Worker(new URL(`/assets/decode.worker-DRG5ZHis.js`,``+import.meta.url),{type:`module`}),o=()=>{clearTimeout(l),n.removeEventListener(`abort`,c),a.onmessage=null,a.onerror=null},s=e=>{o(),a.terminate(),this.worker===a&&(this.worker=void 0),i(e)},c=()=>s(Ql()),l=setTimeout(()=>s(Error(`Normal decode timed out`)),15e3);n.addEventListener(`abort`,c,{once:!0}),a.onmessage=e=>{if(e.data.stage){this.decodeTask={asset:t.id,phase:e.data.stage};return}o(),e.data.error?i(Error(e.data.error)):r(e.data)},a.onerror=e=>{o(),a.terminate(),this.worker=void 0,i(Error(e.message))},a.postMessage({bytes:e,asset:t},[e])})}progress(e){let t=[...new Map(e.map(e=>[e.url,e])).values()];return{total:t.reduce((e,t)=>e+t.bytes,0),received:t.reduce((e,t)=>e+(this.encoded.has(t)?t.bytes:Math.min(t.bytes,this.received.get(t.url)??0)),0),completed:t.filter(e=>this.encoded.has(e)||!!this.entries.get(e.url)?.texture).length,count:t.length}}pause(e){this.network.pause(e),this.decoding.pause(e)}clear(){this.received.clear();for(let[e,t]of this.entries)this.disposeEntry(e,t);this.worker?.terminate(),this.worker=void 0}debug(){return{transitions:this.swaps,fileCache:this.encoded.debug(),decodeTask:this.decodeTask,decodeRetries:this.decodeRetries,estimatedGpuBytes:this.bytes,reservedRenderTargetBytes:this.reserve,peakEstimatedBytes:this.peak,steadyBudget:this.steady,peakBudget:this.maximum,entries:this.entries.size,activeEntries:[...this.entries.values()].filter(e=>e.refs>0).length,decodedBytes:[...this.entries.values()].filter(e=>e.texture).reduce((e,t)=>e+Jl(t.asset),0),fetchedBodyBytes:this.transferred,cancelled:this.cancelled,network:this.network.debug(),decode:this.decoding.debug()}}dispose(){this.disposed=!0,this.clear(),this.encoded.dispose();for(let e of this.previewUrls.values())URL.revokeObjectURL(e);this.previewUrls.clear()}},su=e=>e>=1024**2?`${(e/1024**2).toFixed(2)} MiB`:`${(e/1024).toFixed(0)} KiB`;function cu(e,t=()=>{}){let n=document.querySelector(`#entry-loading`),r=document.querySelector(`#app`);if(!n)return;let i=(e,t)=>{let r=n.querySelector(`#entry-`+e);r.textContent!==t&&(r.textContent=t)},a=n.querySelector(`progress`),o=[],s=performance.now(),c=!1,l=!1,u=!1,d=``,f=0,p=0,m=0,h=[],g=()=>{if(u)return;let n=performance.now(),r=e.progress(o),l=e.debug();for(h.push({time:n,received:r.received});h.length>2&&h[1].time<n-3e3;)h.shift();let f=(n-h[0].time)/1e3,p=f>=.4?Math.max(0,r.received-h[0].received)/f:null,m=r.total?Math.min(100,Math.floor(100*r.received/r.total)):null;m===null?a.removeAttribute(`value`):a.value=m,i(`percent`,m===null?`—`:`${m}%`),i(`received`,su(r.received)),i(`total`,r.total?su(r.total):`正在计算`),i(`rate`,p===null?`—`:su(p)+`/s`),i(`elapsed`,`${((n-s)/1e3).toFixed(1)} s`),i(`graphics`,`${((l.estimatedGpuBytes+l.reservedRenderTargetBytes)/1024**2).toFixed(1)} / ${(l.steadyBudget/1024**2).toFixed(0)} MiB`);let g=performance.memory?.usedJSHeapSize;i(`cache`,`${(l.fileCache.bytes/1024**2).toFixed(2)} / ${(l.fileCache.limit/1024**2).toFixed(0)} MiB`),i(`heap`,typeof g==`number`&&Number.isFinite(g)?su(g):`浏览器未提供`),t({phase:d?`error`:c?`rendering`:`loading`,receivedBytes:r.received,totalBytes:r.total,error:d||null}),i(`phase`,d||(document.hidden?`页面在后台，加载已暂停`:c?`画面已准备好`:r.total?r.completed<r.count?`正在预加载城市与花纸 · ${r.completed} / ${r.count}`:`正在准备文字与完整画面`:`正在读取资源目录`))},_=()=>{m++,clearTimeout(p),clearInterval(f),o=[],h=[],s=u?performance.now():0,c=l=u=!1,d=``,n.hidden=!1,n.classList.remove(`is-leaving`),n.dataset.state=`loading`,r.inert=!0,r.setAttribute(`aria-hidden`,`true`),g(),f=window.setInterval(g,200)};return _(),{begin:_,plan(e){o=e,g()},prepared(){c=!0,g()},fail(e){d=e,n.dataset.state=`error`,g()},finish(e){if(!c||u||l||d)return;l=!0,g(),n.classList.add(`is-leaving`);let i=m;r.inert=!1,r.removeAttribute(`aria-hidden`),p=window.setTimeout(()=>{i===m&&(u=!0,t({phase:`ready`,error:null}),n.hidden=!0,n.dataset.state=`entered`,clearInterval(f),e())},matchMedia(`(prefers-reduced-motion: reduce)`).matches?0:220)},debug:()=>({prepared:c,entered:u,error:d,...e.progress(o)}),dispose(){m++,clearTimeout(p),clearInterval(f),n.remove()}}}var lu=class{ratio;maximum;slow=0;fast=0;constructor(e,t=2){this.ratio=e,this.maximum=t}sample(e){if(e>100||e<1)return!1;this.slow=e>34?this.slow+e:0,this.fast=e<19?this.fast+e:0;let t=this.ratio;return this.slow>2e3&&(this.ratio=Math.max(1,this.ratio-.25),this.slow=this.fast=0),this.fast>5e3&&(this.ratio=Math.min(this.maximum,this.ratio+.25),this.slow=this.fast=0),this.ratio!==t}},uu={version:4,size:[4096,1783],placementBaked:{scale:.82,offsetU:.047,offsetV:0},variants:[{id:`china-green`,name:`中国 · 青绿金线`,theme:`china`,reference:3,lineStyle:!1,textColor:`#237751`,thumbnail:`china-green-thumb-eb9e190c3faa6b36.webp`,maps:{baseColor:`china-green-baseColor-777eae434b4e2921.webp`,coverage:`china-green-coverage-834d8ef0614acbcf.webp`,metalness:`china-green-metalness-bda496bc6c13e988.webp`,roughness:`china-green-roughness-0e49973dcb22bb16.webp`,clearcoat:`china-green-clearcoat-aea7a8b419244538.webp`,normal:`china-green-a686155c82e74832.hfn.gz`},structureSha256:`7dbd749924e1f857716e3c9ea5c017945d53b9c15692e7f52a9042184b14bc9a`},{id:`china-red`,name:`中国 · 红金`,theme:`china`,reference:4,lineStyle:!1,textColor:`#a92019`,thumbnail:`china-red-thumb-9fad55a0ac328d17.webp`,maps:{baseColor:`china-red-baseColor-043235809b06b82f.webp`,coverage:`china-red-coverage-865719758797ae44.webp`,metalness:`china-red-metalness-6e04c9e171e5bddf.webp`,roughness:`china-red-roughness-f64b9af378edf0f3.webp`,clearcoat:`china-green-clearcoat-aea7a8b419244538.webp`,normal:`china-red-853a9155a4d6f706.hfn.gz`},structureSha256:`7dbd749924e1f857716e3c9ea5c017945d53b9c15692e7f52a9042184b14bc9a`},{id:`china-purple`,name:`中国 · 紫金`,theme:`china`,reference:5,lineStyle:!1,textColor:`#672c86`,thumbnail:`china-purple-thumb-b3d54b925091e700.webp`,maps:{baseColor:`china-purple-baseColor-e5893c9514580877.webp`,coverage:`china-purple-coverage-73311ead26018f39.webp`,metalness:`china-purple-metalness-ccd6dc1582f8782d.webp`,roughness:`china-purple-roughness-b3aa5cd5681d0c56.webp`,clearcoat:`china-green-clearcoat-aea7a8b419244538.webp`,normal:`china-purple-8ba5f9cdd2723823.hfn.gz`},structureSha256:`7dbd749924e1f857716e3c9ea5c017945d53b9c15692e7f52a9042184b14bc9a`},{id:`china-blue`,name:`中国 · 蓝金`,theme:`china`,reference:6,lineStyle:!1,textColor:`#266799`,thumbnail:`china-blue-thumb-ff6662557c8268a2.webp`,maps:{baseColor:`china-blue-baseColor-48997049094a6aac.webp`,coverage:`china-blue-coverage-ea09b8ceb0482dd8.webp`,metalness:`china-blue-metalness-96b572880a7c8fe8.webp`,roughness:`china-blue-roughness-d464f6f134c9ba0a.webp`,clearcoat:`china-green-clearcoat-aea7a8b419244538.webp`,normal:`china-blue-a7d037e5b349b479.hfn.gz`},structureSha256:`7dbd749924e1f857716e3c9ea5c017945d53b9c15692e7f52a9042184b14bc9a`},{id:`china-blue-line`,name:`中国 · 蓝色线描`,theme:`china`,reference:7,lineStyle:!0,textColor:`#245a90`,thumbnail:`china-blue-line-thumb-d5489ce65fe3cd34.webp`,maps:{baseColor:`china-blue-line-baseColor-37f1a27f7d86d911.webp`,coverage:`china-blue-line-coverage-33812078eb659b62.webp`,metalness:`china-blue-line-metalness-1f872cf65156edfa.webp`,roughness:`china-blue-line-roughness-76d42e14b5bb0e37.webp`,clearcoat:`china-green-clearcoat-aea7a8b419244538.webp`,normal:`china-blue-line-abb445fc12901f1e.hfn.gz`},structureSha256:`7dbd749924e1f857716e3c9ea5c017945d53b9c15692e7f52a9042184b14bc9a`},{id:`china-purple-line`,name:`中国 · 紫色线描`,theme:`china`,reference:8,lineStyle:!0,textColor:`#6f348b`,thumbnail:`china-purple-line-thumb-9c1fdd3df50872dd.webp`,maps:{baseColor:`china-purple-line-baseColor-09af6a31a550a0fd.webp`,coverage:`china-blue-line-coverage-33812078eb659b62.webp`,metalness:`china-blue-line-metalness-1f872cf65156edfa.webp`,roughness:`china-blue-line-roughness-76d42e14b5bb0e37.webp`,clearcoat:`china-green-clearcoat-aea7a8b419244538.webp`,normal:`china-blue-line-abb445fc12901f1e.hfn.gz`},structureSha256:`7dbd749924e1f857716e3c9ea5c017945d53b9c15692e7f52a9042184b14bc9a`},{id:`shenzhen-red`,name:`深圳 · 红金`,theme:`shenzhen`,reference:1,lineStyle:!1,textColor:`#ae221b`,thumbnail:`shenzhen-red-thumb-e3ce5f5fbd85d7ef.webp`,maps:{baseColor:`shenzhen-red-baseColor-a061d93590f39d89.webp`,coverage:`shenzhen-red-coverage-6c400fb706d2e61e.webp`,metalness:`shenzhen-red-metalness-45835a5448a62694.webp`,roughness:`shenzhen-red-roughness-c1bace17754a32fd.webp`,clearcoat:`china-green-clearcoat-aea7a8b419244538.webp`,normal:`shenzhen-red-e515a4f707c04173.hfn.gz`},structureSha256:`5266ecdfa941db14787fd7c7eb9b966f041b2cc99da61eb9447c7a9bcc54da1a`},{id:`shenzhen-teal`,name:`深圳 · 青蓝金线`,theme:`shenzhen`,reference:2,lineStyle:!1,textColor:`#327e85`,thumbnail:`shenzhen-teal-thumb-83f0f2ea4d28cd13.webp`,maps:{baseColor:`shenzhen-teal-baseColor-964c7c3c31fbb207.webp`,coverage:`shenzhen-teal-coverage-9168da8875bc29fa.webp`,metalness:`shenzhen-teal-metalness-9992b719f76510da.webp`,roughness:`shenzhen-teal-roughness-0e8ab8bb8a281bf2.webp`,clearcoat:`china-green-clearcoat-aea7a8b419244538.webp`,normal:`shenzhen-teal-c8c9a345d1685a6f.hfn.gz`},structureSha256:`5266ecdfa941db14787fd7c7eb9b966f041b2cc99da61eb9447c7a9bcc54da1a`},{id:`beijing-gold`,name:`北京 · 纯金`,theme:`beijing`,lineStyle:!1,fixedGold:!0,textColor:`#ddb538`,thumbnail:`beijing-gold-thumb-30441038830cf6fe.webp`,maps:{baseColor:`beijing-gold-baseColor-754558a83d8866b8.webp`,coverage:`beijing-coverage-1f72e0f67d1fe4b6.webp`,metalness:`beijing-coverage-1f72e0f67d1fe4b6.webp`,roughness:`beijing-gold-roughness-b75af1a64ba8a698.webp`,clearcoat:`beijing-gold-clearcoat-212a18e05a4de31c.webp`,normal:`beijing-normal-9a95e36609b02939.hfn.gz`},structureSha256:`fcf14372439b14561ca65e0161c0910e23b46bb131bd3bff871827ccb257eecf`},{id:`beijing-green`,name:`北京 · 青绿金线`,theme:`beijing`,lineStyle:!1,fixedGold:!1,textColor:`#237751`,thumbnail:`beijing-green-thumb-1f7768a04caa8003.webp`,maps:{baseColor:`beijing-green-baseColor-765847e7f8dfa5a7.webp`,coverage:`beijing-coverage-1f72e0f67d1fe4b6.webp`,metalness:`beijing-green-metalness-2caa5bf6464adaa6.webp`,roughness:`beijing-green-roughness-962b2ab636ca4e06.webp`,clearcoat:`china-green-clearcoat-aea7a8b419244538.webp`,normal:`beijing-normal-9a95e36609b02939.hfn.gz`},structureSha256:`fcf14372439b14561ca65e0161c0910e23b46bb131bd3bff871827ccb257eecf`},{id:`beijing-red`,name:`北京 · 红金`,theme:`beijing`,lineStyle:!1,fixedGold:!1,textColor:`#a92019`,thumbnail:`beijing-red-thumb-c596b483e34f6ce3.webp`,maps:{baseColor:`beijing-red-baseColor-ecd4e668f5f92de3.webp`,coverage:`beijing-coverage-1f72e0f67d1fe4b6.webp`,metalness:`beijing-green-metalness-2caa5bf6464adaa6.webp`,roughness:`beijing-green-roughness-962b2ab636ca4e06.webp`,clearcoat:`china-green-clearcoat-aea7a8b419244538.webp`,normal:`beijing-normal-9a95e36609b02939.hfn.gz`},structureSha256:`fcf14372439b14561ca65e0161c0910e23b46bb131bd3bff871827ccb257eecf`},{id:`beijing-purple`,name:`北京 · 紫金`,theme:`beijing`,lineStyle:!1,fixedGold:!1,textColor:`#672c86`,thumbnail:`beijing-purple-thumb-b56692a9a6c6f73e.webp`,maps:{baseColor:`beijing-purple-baseColor-f1608a4addc25835.webp`,coverage:`beijing-coverage-1f72e0f67d1fe4b6.webp`,metalness:`beijing-green-metalness-2caa5bf6464adaa6.webp`,roughness:`beijing-green-roughness-962b2ab636ca4e06.webp`,clearcoat:`china-green-clearcoat-aea7a8b419244538.webp`,normal:`beijing-normal-9a95e36609b02939.hfn.gz`},structureSha256:`fcf14372439b14561ca65e0161c0910e23b46bb131bd3bff871827ccb257eecf`},{id:`beijing-blue`,name:`北京 · 蓝金`,theme:`beijing`,lineStyle:!1,fixedGold:!1,textColor:`#266799`,thumbnail:`beijing-blue-thumb-5930414488414121.webp`,maps:{baseColor:`beijing-blue-baseColor-712d3906e86fbfcd.webp`,coverage:`beijing-coverage-1f72e0f67d1fe4b6.webp`,metalness:`beijing-green-metalness-2caa5bf6464adaa6.webp`,roughness:`beijing-green-roughness-962b2ab636ca4e06.webp`,clearcoat:`china-green-clearcoat-aea7a8b419244538.webp`,normal:`beijing-normal-9a95e36609b02939.hfn.gz`},structureSha256:`fcf14372439b14561ca65e0161c0910e23b46bb131bd3bff871827ccb257eecf`}],labels:{china:`label-china-cc5fe88a14e8bcc7.webp`,shenzhen:`label-shenzhen-9d6374680bb7fb1d.webp`,he:`label-he-0c91ba3679e51b3e.webp`,create:`label-create-5391195266bd432f.webp`,beijing:`label-beijing-cb6bcae3d5ce1ca9.webp`}},du={version:5,cities:{beijing:{name:`北京`,mask:`beijing-structure.webp`,normal:`beijing-normal.hfn.gz`,label:`beijing-label.webp`,thumbnail:`beijing-thumb.webp`},shenzhen:{name:`深圳`,mask:`shenzhen-structure.webp`,normal:`shenzhen-normal.hfn.gz`,label:`shenzhen-label.webp`,thumbnail:`shenzhen-thumb.webp`},"beijing-2":{name:`北京 2`,mask:`beijing-2-structure.webp`,normal:`beijing-2-normal.hfn.gz`,label:`beijing-2-label.webp`,thumbnail:`beijing-2-thumb.webp`},shanghai:{name:`上海`,mask:`shanghai-structure.webp`,normal:`shanghai-normal.hfn.gz`,label:`shanghai-label.webp`,thumbnail:`shanghai-thumb.webp`},guangzhou:{name:`广州`,mask:`guangzhou-structure.webp`,normal:`guangzhou-normal.hfn.gz`,label:`guangzhou-label.webp`,thumbnail:`guangzhou-thumb.webp`},tianjin:{name:`天津`,mask:`tianjin-structure.webp`,normal:`tianjin-normal.hfn.gz`,label:`tianjin-label.webp`,thumbnail:`tianjin-thumb.webp`},qingdao:{name:`青岛`,mask:`qingdao-structure.webp`,normal:`qingdao-normal.hfn.gz`,label:`qingdao-label.webp`,thumbnail:`qingdao-thumb.webp`},taiyuan:{name:`太原`,mask:`taiyuan-structure.webp`,normal:`taiyuan-normal.hfn.gz`,label:`taiyuan-label.webp`,thumbnail:`taiyuan-thumb.webp`},hangzhou:{name:`杭州`,mask:`hangzhou-structure.webp`,normal:`hangzhou-normal.hfn.gz`,label:`hangzhou-label.webp`,thumbnail:`hangzhou-thumb.webp`},xian:{name:`西安`,mask:`xian-structure.webp`,normal:`xian-normal.hfn.gz`,label:`xian-label.webp`,thumbnail:`xian-thumb.webp`},"shenzhen-2":{name:`深圳 2`,mask:`shenzhen-2-structure.webp`,normal:`shenzhen-2-normal.hfn.gz`,label:`shenzhen-2-label.webp`,thumbnail:`shenzhen-2-thumb.webp`},wuhan:{name:`武汉`,mask:`wuhan-structure.webp`,normal:`wuhan-normal.hfn.gz`,label:`wuhan-label.webp`,thumbnail:`wuhan-thumb.webp`},nanjing:{name:`南京`,mask:`nanjing-structure.webp`,normal:`nanjing-normal.hfn.gz`,label:`nanjing-label.webp`,thumbnail:`nanjing-thumb.webp`},urumqi:{name:`乌鲁木齐`,mask:`urumqi-structure.webp`,normal:`urumqi-normal.hfn.gz`,label:`urumqi-label.webp`,thumbnail:`urumqi-thumb.webp`},nanchang:{name:`南昌`,mask:`nanchang-structure.webp`,normal:`nanchang-normal.hfn.gz`,label:`nanchang-label.webp`,thumbnail:`nanchang-thumb.webp`},xiamen:{name:`厦门`,mask:`xiamen-structure.webp`,normal:`xiamen-normal.hfn.gz`,label:`xiamen-label.webp`,thumbnail:`xiamen-thumb.webp`},hohhot:{name:`呼和浩特`,mask:`hohhot-structure.webp`,normal:`hohhot-normal.hfn.gz`,label:`hohhot-label.webp`,thumbnail:`hohhot-thumb.webp`},harbin:{name:`哈尔滨`,mask:`harbin-structure.webp`,normal:`harbin-normal.hfn.gz`,label:`harbin-label.webp`,thumbnail:`harbin-thumb.webp`},chengdu:{name:`成都`,mask:`chengdu-structure.webp`,normal:`chengdu-normal.hfn.gz`,label:`chengdu-label.webp`,thumbnail:`chengdu-thumb.webp`},jingdezhen:{name:`景德镇`,mask:`jingdezhen-structure.webp`,normal:`jingdezhen-normal.hfn.gz`,label:`jingdezhen-label.webp`,thumbnail:`jingdezhen-thumb.webp`},shenyang:{name:`沈阳`,mask:`shenyang-structure.webp`,normal:`shenyang-normal.hfn.gz`,label:`shenyang-label.webp`,thumbnail:`shenyang-thumb.webp`},shijiazhuang:{name:`石家庄`,mask:`shijiazhuang-structure.webp`,normal:`shijiazhuang-normal.hfn.gz`,label:`shijiazhuang-label.webp`,thumbnail:`shijiazhuang-thumb.webp`},zhengzhou:{name:`郑州`,mask:`zhengzhou-structure.webp`,normal:`zhengzhou-normal.hfn.gz`,label:`zhengzhou-label.webp`,thumbnail:`zhengzhou-thumb.webp`},chongqing:{name:`重庆`,mask:`chongqing-structure.webp`,normal:`chongqing-normal.hfn.gz`,label:`chongqing-label.webp`,thumbnail:`chongqing-thumb.webp`},changchun:{name:`长春`,mask:`changchun-structure.webp`,normal:`changchun-normal.hfn.gz`,label:`changchun-label.webp`,thumbnail:`changchun-thumb.webp`}}},fu={version:6,cities:{shanghai:{name:`上海`,mask:`shanghai-structure.webp`,normal:`shanghai-normal.hfn.gz`,label:`shanghai-label.webp`,thumbnail:`shanghai-thumb.webp`},urumqi:{name:`乌鲁木齐`,mask:`urumqi-structure.webp`,normal:`urumqi-normal.hfn.gz`,label:`urumqi-label.webp`,thumbnail:`urumqi-thumb.webp`},beijing:{name:`北京`,mask:`beijing-structure.webp`,normal:`beijing-normal.hfn.gz`,label:`beijing-label.webp`,thumbnail:`beijing-thumb.webp`},nanjing:{name:`南京`,mask:`nanjing-structure.webp`,normal:`nanjing-normal.hfn.gz`,label:`nanjing-label.webp`,thumbnail:`nanjing-thumb.webp`},nanchang:{name:`南昌`,mask:`nanchang-structure.webp`,normal:`nanchang-normal.hfn.gz`,label:`nanchang-label.webp`,thumbnail:`nanchang-thumb.webp`},xiamen:{name:`厦门`,mask:`xiamen-structure.webp`,normal:`xiamen-normal.hfn.gz`,label:`xiamen-label.webp`,thumbnail:`xiamen-thumb.webp`},hohhot:{name:`呼和浩特`,mask:`hohhot-structure.webp`,normal:`hohhot-normal.hfn.gz`,label:`hohhot-label.webp`,thumbnail:`hohhot-thumb.webp`},harbin:{name:`哈尔滨`,mask:`harbin-structure.webp`,normal:`harbin-normal.hfn.gz`,label:`harbin-label.webp`,thumbnail:`harbin-thumb.webp`},tianjin:{name:`天津`,mask:`tianjin-structure.webp`,normal:`tianjin-normal.hfn.gz`,label:`tianjin-label.webp`,thumbnail:`tianjin-thumb.webp`},taiyuan:{name:`太原`,mask:`taiyuan-structure.webp`,normal:`taiyuan-normal.hfn.gz`,label:`taiyuan-label.webp`,thumbnail:`taiyuan-thumb.webp`},guangzhou:{name:`广州`,mask:`guangzhou-structure.webp`,normal:`guangzhou-normal.hfn.gz`,label:`guangzhou-label.webp`,thumbnail:`guangzhou-thumb.webp`},chengdu:{name:`成都`,mask:`chengdu-structure.webp`,normal:`chengdu-normal.hfn.gz`,label:`chengdu-label.webp`,thumbnail:`chengdu-thumb.webp`},jingdezhen:{name:`景德镇`,mask:`jingdezhen-structure.webp`,normal:`jingdezhen-normal.hfn.gz`,label:`jingdezhen-label.webp`,thumbnail:`jingdezhen-thumb.webp`},hangzhou:{name:`杭州`,mask:`hangzhou-structure.webp`,normal:`hangzhou-normal.hfn.gz`,label:`hangzhou-label.webp`,thumbnail:`hangzhou-thumb.webp`},wuhan:{name:`武汉`,mask:`wuhan-structure.webp`,normal:`wuhan-normal.hfn.gz`,label:`wuhan-label.webp`,thumbnail:`wuhan-thumb.webp`},shenyang:{name:`沈阳`,mask:`shenyang-structure.webp`,normal:`shenyang-normal.hfn.gz`,label:`shenyang-label.webp`,thumbnail:`shenyang-thumb.webp`},shenzhen:{name:`深圳`,mask:`shenzhen-structure.webp`,normal:`shenzhen-normal.hfn.gz`,label:`shenzhen-label.webp`,thumbnail:`shenzhen-thumb.webp`},shijiazhuang:{name:`石家庄`,mask:`shijiazhuang-structure.webp`,normal:`shijiazhuang-normal.hfn.gz`,label:`shijiazhuang-label.webp`,thumbnail:`shijiazhuang-thumb.webp`},xian:{name:`西安`,mask:`xian-structure.webp`,normal:`xian-normal.hfn.gz`,label:`xian-label.webp`,thumbnail:`xian-thumb.webp`},zhengzhou:{name:`郑州`,mask:`zhengzhou-structure.webp`,normal:`zhengzhou-normal.hfn.gz`,label:`zhengzhou-label.webp`,thumbnail:`zhengzhou-thumb.webp`},chongqing:{name:`重庆`,mask:`chongqing-structure.webp`,normal:`chongqing-normal.hfn.gz`,label:`chongqing-label.webp`,thumbnail:`chongqing-thumb.webp`},changchun:{name:`长春`,mask:`changchun-structure.webp`,normal:`changchun-normal.hfn.gz`,label:`changchun-label.webp`,thumbnail:`changchun-thumb.webp`},qingdao:{name:`青岛`,mask:`qingdao-structure.webp`,normal:`qingdao-normal.hfn.gz`,label:`qingdao-label.webp`,thumbnail:`qingdao-thumb.webp`}}},pu={open:`开放包容`,innovation:`创新驱动`,cooperation:`合作共赢`,sharing:`共建共享`,together:`携手同心`,ocean:`拥抱瀚海`},mu=Object.fromEntries(Object.entries(du.cities).map(([e,t])=>[e,{name:t.name,defaultVariant:`${e}-gold`,label:e,slogans:e===`shenzhen`}])),hu=Object.fromEntries(Object.entries(fu.cities).map(([e,t])=>[`v6-${e}`,{name:t.name,defaultVariant:`v6-${e}-gold`,label:e,slogans:!0}])),gu=e=>Object.hasOwn(hu,e),_u={china:{name:`中国`,defaultVariant:`china-gold`,label:`china`,slogans:!1},...mu,...hu},vu={variant:`china-gold`,finish:`enamel`,text:`auto`},yu={variant:`v6-shenzhen-gold`,finish:`metal`,text:`open`,appearance:p(`gold`)},bu={enamel:`彩釉金线`,metal:`彩色金属`},xu=e=>Object.hasOwn(du.cities,e)||gu(e),Su=[{id:`china-gold`,name:`中国 · 原版纯金`,theme:`china`,thumbnail:``,fixedGold:!0},...uu.variants.filter(e=>e.theme===`china`),...[...Object.keys(du.cities),...Object.keys(hu)].flatMap(e=>Object.keys(a).map(t=>({id:`${e}-${t}`,name:`${_u[e].name} · ${a[t].name}`,theme:e,thumbnail:gu(e)?fu.cities[e.slice(3)].thumbnail:du.cities[e].thumbnail,fixedGold:!1})))],Cu=e=>e.id===`china-gold`||e.fixedGold===!0,wu=e=>_u[e.theme],Tu=e=>e===`shenzhen-teal`?`shenzhen-blue`:e,Eu=e=>{let t=Su.find(t=>t.id===Tu(e));if(!t)throw Error(`未知图样款式`);return t};function Du(e,n){let r={...e,...n};r.variant=Tu(r.variant);let i=Eu(r.variant);if(r.finish===`paint`&&(r.finish=`enamel`),!(r.finish in bu)||![`auto`,`name`,`he`,`create`,`none`,...Object.keys(pu)].includes(r.text))throw Error(`不支持的材质或文字选项`);if(Cu(i)&&(r.finish=`enamel`),gu(i.theme)&&!Object.hasOwn(pu,r.text)&&(r.text=`open`),!gu(i.theme)&&Object.hasOwn(pu,r.text)&&(r.text=`auto`),!wu(i).slogans&&[`he`,`create`].includes(r.text)&&(r.text=`auto`),xu(i.theme)){let a=r.variant.slice(i.theme.length+1);r.appearance=t(n.appearance??(n.variant?p(a):e.appearance??p(a))),n.finish&&!n.appearance&&(r.appearance={...r.appearance,material:+(r.finish===`metal`),materialX:.5}),r.finish=r.appearance.material===1?`metal`:`enamel`}else r.appearance&&=t(r.appearance);return r}function Ou(e,t){if(!Object.hasOwn(_u,t))throw Error(`未知主题`);if(xu(t)){let n=e.appearance??p(`gold`);return Du(e,{variant:`${t}-${n.preset}`,appearance:n})}return Du(e,{variant:_u[t].defaultVariant,finish:`enamel`})}function ku(e,t,n=`/`){let r=Du(e,{}),i=Eu(r.variant);if(r.variant===`china-gold`)return r.text===`none`?{...t,label:{hidden:!0}}:{...t};if(gu(i.theme)){let e=fu.cities[i.theme.slice(3)],t=e=>`${n}cities/v6/${e}`;return{id:r.variant,version:6,name:i.name,layout:`blank-300deg-v1`,baseColor:t(e.mask),metalness:t(e.mask),roughness:t(e.mask),normal:t(e.normal),coverage:t(e.mask),normalEncoding:`rgba16f`,finish:r.finish===`metal`?`metal`:`enamel`,parametric:{mask:t(e.mask),appearance:r.appearance},label:{source:t(`slogan-${r.text}.webp`),fixedGold:!0}}}if(xu(i.theme)){let e=du.cities[i.theme],t=e=>`${n}cities/v5/${e}`,a=r.text===`he`||r.text===`create`?`${n}cities/v4/${uu.labels[r.text]}`:t(e.label);return{id:r.variant,version:5,name:i.name,layout:`blank-300deg-v1`,baseColor:t(e.mask),metalness:t(e.mask),roughness:t(e.mask),normal:t(e.normal),coverage:t(e.mask),normalEncoding:`rgba16f`,finish:r.finish===`metal`?`metal`:`enamel`,parametric:{mask:t(e.mask),appearance:r.appearance},label:{source:a,hidden:r.text===`none`}}}let a=uu.variants.find(e=>e.id===r.variant),o=e=>`${n}cities/v4/${e}`;return{id:a.id,version:4,name:a.name,layout:`blank-300deg-v1`,...Object.fromEntries(Object.entries(a.maps).map(([e,t])=>[e,o(t)])),normalEncoding:`rgba16f`,finish:r.finish===`metal`?`metal`:`enamel`,label:{source:o(uu.labels.china),color:a.textColor,hidden:r.text===`none`,metalness:+(r.finish===`metal`)}}}var Au=class{apply;changed;initial;current;desired;busy=!1;error=``;locked=!1;revision=0;constructor(e,t,n=vu){this.apply=e,this.changed=t,this.initial=n,this.current=Du(n,{}),this.desired={...this.current}}cancelPending(){++this.revision,this.busy=!1,this.desired={...this.current}}commit(e){this.current=Du(e,{}),this.desired={...this.current},this.error=``,this.changed()}async select(e){if(this.locked)return!1;let t=Du(this.desired,e),n=++this.revision;this.desired=t,this.busy=!0,this.error=``,this.changed();try{let e=await this.apply(t);if(n!==this.revision)return!1;if(!e)throw Error(`图样未完整应用，已保留当前款式`);return this.current={...t},!0}catch(e){return n===this.revision&&(this.error=e.message,this.desired={...this.current},!1)}finally{n===this.revision&&(this.busy=!1,this.changed())}}restore(){return this.select({...this.initial})}},ju=e=>Math.max(0,Math.min(1,e));function Mu(e){if(!Number.isFinite(e.x)||!Number.isFinite(e.y))throw Error(`调整位置必须为有限数值`);return{x:ju(e.x),y:ju(e.y)}}var Nu=e=>(e%360+360)%360;function Pu(e,t){if(!Number.isFinite(t))throw Error(`色相必须为有限数值`);let n=Mu(e),r=2*n.x-1,i=2*n.y-1,a=Math.max(Math.abs(r),Math.abs(i));return{hue:Nu(a<1e-10?t:Math.atan2(-r,i)*180/Math.PI),saturation:a*100}}function Fu(e,t){if(!Number.isFinite(e)||!Number.isFinite(t))throw Error(`颜色必须为有限数值`);let n=Nu(e)*Math.PI/180,r=-Math.sin(n),i=Math.cos(n),a=ju(t/100)/Math.max(Math.abs(r),Math.abs(i));return Mu({x:(1+r*a)/2,y:(1+i*a)/2})}function Iu(e){let t=e.closest(`.color-pad-row`),n=e.closest(`aside`);if(!n)return;let r=n.getBoundingClientRect(),i=n.clientWidth-24,a=t?.querySelector(`.xy-pad`),o=t?.querySelector(`.lightness-control`),s=e.classList.contains(`lightness-control`),c=e.clientWidth,l=e.clientHeight,u=a&&!s?Math.min(1.24,(i-54)/a.clientWidth):1,d=o&&s?Math.min(1.24,(i-a.clientWidth-10)/o.clientWidth):1,f=e=>{let t=e.getBoundingClientRect(),n=new DOMMatrixReadOnly(getComputedStyle(e).transform);return{left:t.left-n.e+(t.width-e.clientWidth)/2,top:t.top-n.f+(t.height-e.clientHeight)/2}},p=f(e).top+l/2,m=Math.max(1,2*Math.min(p-r.top-10,r.bottom-10-p)/l);u=Math.min(u,m),d=Math.min(d,m);let h=Math.max(1,Math.min(1.24,i/c,m));if(t&&a&&o){let e=a.clientWidth*u+10+o.clientWidth*d,n=t.getBoundingClientRect(),i=Math.max(r.left+12,Math.min(r.right-12-e,n.left+(n.width-e)/2));t.style.setProperty(`--pad-lift-x`,`${i+(u-1)*a.clientWidth/2-f(a).left}px`),t.style.setProperty(`--slider-lift-x`,`${i+a.clientWidth*u+10+(d-1)*o.clientWidth/2-f(o).left}px`),t.style.setProperty(`--pad-lift-scale`,String(u)),t.style.setProperty(`--slider-lift-scale`,String(d))}else e.style.setProperty(`--xy-expand-scale`,String(h)),e.style.setProperty(`--xy-expand-y`,`0px`),e.style.setProperty(`--xy-expand-x`,`0px`)}var Lu=`
@group(0) @binding(0) var source: texture_2d<f32>;
@group(0) @binding(1) var sourceSampler: sampler;
@group(0) @binding(2) var<uniform> settings: vec4f;
fn decodeSRGB(color:vec3f)->vec3f {
 return select(pow((color+vec3f(.055))/1.055,vec3f(2.4)),color/12.92,color<=vec3f(.04045));
}
fn encodeSRGB(color:vec3f)->vec3f {
 return select(1.055*pow(color,vec3f(1./2.4))-vec3f(.055),color*12.92,color<=vec3f(.0031308));
}
struct Vertex { @builtin(position) position: vec4f, @location(0) uv: vec2f };
@vertex fn vertex(@builtin(vertex_index) index:u32)->Vertex {
 let positions=array<vec2f,3>(vec2f(-1,-1),vec2f(3,-1),vec2f(-1,3));
 let p=positions[index];var out:Vertex;out.position=vec4f(p,0,1);out.uv=vec2f((p.x+1)*.5,(1-p.y)*.5);return out;
}
@fragment fn fragment(in:Vertex)->@location(0) vec4f {
 if(settings.y>.5){
  let alpha=1-smoothstep(.47,.5,length(in.uv-vec2f(.5)));
  return vec4f(encodeSRGB(vec3f(settings.x))*alpha,alpha);
 }
 // Gain is scene-linear exposure, not a multiplier on gamma-encoded RGB.
 let linear=decodeSRGB(textureSample(source,sourceSampler,in.uv).rgb);
 return vec4f(encodeSRGB(linear*settings.x),1);
}`,Ru,zu=0;function Bu(){return zu++,Ru||=(async()=>{let e;try{let t=await navigator.gpu.requestAdapter({powerPreference:`low-power`});if(!t)return null;e=await t.requestDevice();let n=e.createShaderModule({code:Lu,label:`Control HDR highlight`}),r=await e.createRenderPipelineAsync({layout:`auto`,vertex:{module:n,entryPoint:`vertex`},fragment:{module:n,entryPoint:`fragment`,targets:[{format:`rgba16float`}]},primitive:{topology:`triangle-list`}});return{device:e,pipeline:r,sampler:e.createSampler({magFilter:`linear`,minFilter:`linear`})}}catch{return e?.destroy(),null}})(),Ru}function Vu(){if(--zu===0){let e=Ru;Ru=void 0,e?.then(e=>e?.device.destroy())}}function Hu(e,t){let n=document.createElement(`canvas`);n.className=t?`xy-hdr-field`:`xy-hdr-selector`,n.setAttribute(`aria-hidden`,`true`),n.hidden=!0,t?t.after(n):e.append(n);let r=matchMedia(`(dynamic-range: high)`),i=null,a=null,o,s,c,l=!1,u=!1,d=!1,f=!1,p=0,m=1,h=!0,g=0,_=0,v=NaN,y=0,b=0,x,S=e=>{n.dataset.hdrState=e};function C(e){++p,f=!1,n.hidden=!0,S(e),o?.destroy(),s?.destroy(),a?.unconfigure(),x&&i?.device.removeEventListener(`uncapturederror`,x),x=void 0,i=null,o=void 0,s=void 0,a=null,c=void 0,g=_=0,v=NaN,h=!0,u&&(u=!1,Vu())}function w(e=`Extended output unavailable`){d=!0,n.dataset.hdrReason=String(e),C(`unavailable`)}async function T(){if(l||u||d)return;if(!r.matches){S(`sdr-display`);return}if(!isSecureContext||!navigator.gpu){S(`unavailable`);return}u=!0;let e=++p;delete n.dataset.hdrReason,S(`checking`);let t=await Bu();if(l||e!==p)return;if(!t){w();return}i=t;let o=i.device;if(a=n.getContext(`webgpu`),!a){w();return}o.pushErrorScope(`validation`);try{a.configure({device:o,format:`rgba16float`,colorSpace:`srgb`,alphaMode:`premultiplied`,toneMapping:{mode:`extended`}});let e=a.getConfiguration();if(e?.toneMapping?.mode!==`extended`||e.format!==`rgba16float`)throw Error(`Extended output unavailable`);s=o.createBuffer({size:16,usage:GPUBufferUsage.UNIFORM|GPUBufferUsage.COPY_DST})}catch(e){await o.popErrorScope(),w(e);return}let c=await o.popErrorScope();if(!(l||e!==p)){if(c){w();return}x=t=>{t.preventDefault(),!l&&e===p&&w(t.error.message)},o.addEventListener(`uncapturederror`,x,{once:!0}),o.lost.then(()=>{!l&&e===p&&w()}),f=!0,S(`ready`),n.dataset.hdrFormat=`rgba16float/extended`,E()}}function E(){if(f&&i&&a&&s&&!l){if(m<=1.001||e.closest(`[hidden]`)){n.hidden=!0;return}try{let r=t?.width??Math.round(e.clientWidth*Math.min(devicePixelRatio||1,2)),l=t?.height??Math.round(e.clientHeight*Math.min(devicePixelRatio||1,2));if(!r||!l)return;let u=n.width!==r||n.height!==l;u&&(n.width=r,n.height=l);let d=t?r:1,f=t?l:1;if((g!==d||_!==f)&&(o?.destroy(),o=i.device.createTexture({size:[d,f],format:`rgba8unorm`,usage:GPUTextureUsage.TEXTURE_BINDING|GPUTextureUsage.COPY_DST|GPUTextureUsage.RENDER_ATTACHMENT}),g=d,_=f,h=!0,c=i.device.createBindGroup({layout:i.pipeline.getBindGroupLayout(0),entries:[{binding:0,resource:o.createView()},{binding:1,resource:i.sampler},{binding:2,resource:{buffer:s}}]})),!h&&!u&&v===m){n.hidden=!1;return}h&&(t?i.device.queue.copyExternalImageToTexture({source:t},{texture:o,colorSpace:`srgb`},[d,f]):i.device.queue.writeTexture({texture:o},new Uint8Array([255,255,255,255]),{bytesPerRow:4},[1,1]),h=!1,n.dataset.hdrUploads=String(++b)),i.device.queue.writeBuffer(s,0,new Float32Array([m,+!t,0,0]));let p=i.device.createCommandEncoder(),x=p.beginRenderPass({colorAttachments:[{view:a.getCurrentTexture().createView(),clearValue:[0,0,0,0],loadOp:`clear`,storeOp:`store`}]});x.setPipeline(i.pipeline),x.setBindGroup(0,c),x.draw(3),x.end(),i.device.queue.submit([p.finish()]),v=m,n.hidden=!1,n.dataset.hdrFrames=String(++y),n.dataset.hdrGain=String(m)}catch(e){w(e)}}}let D=()=>{d=!1,r.matches?T():C(`sdr-display`)};return r.addEventListener(`change`,D),S(r.matches?`idle`:`sdr-display`),{update(t,n=!1){m=Number.isFinite(t)?Math.max(1,Math.min(2.25,t)):1,h||=n,e.closest(`[hidden]`)||T(),E()},dispose(){l=!0,r.removeEventListener(`change`,D),C(`disposed`),n.remove()}}}function Uu(e){if(e.touchPoints<1)return`none`;if(e.vibrate)return`vibration`;if(!e.switchSupported)return`none`;let t=e.userAgent.match(/Version\/(\d+)(?:\.(\d+))?/)??e.userAgent.match(/(?:iPhone OS|CPU OS) (\d+)(?:_(\d+))?/),n=t?Number(t[1]):void 0,r=Number(t?.[2]??0);return n!==void 0&&n<18?`none`:n===void 0||n>26||n===26&&r>=5||!e.labelForwardsTrusted?`ios-gesture`:`ios-label`}function Wu(){let e=document.createElement(`label`),t=document.createElement(`input`);t.type=`checkbox`,e.hidden=!0,e.append(t),document.body.append(e);let n=!1;e.addEventListener(`click`,e=>{e.stopPropagation(),e.target===t&&(n=e.isTrusted)});try{e.click()}finally{e.remove()}return n}function Gu(){if(typeof navigator>`u`||typeof document>`u`)return`none`;let e=typeof navigator.vibrate==`function`,t=navigator.maxTouchPoints,n=`switch`in document.createElement(`input`);return Uu({vibrate:e,touchPoints:t,switchSupported:n,userAgent:navigator.userAgent,labelForwardsTrusted:!e&&t>0&&n?Wu():!1})}function Ku(e,t){let n=new WeakMap,r=new WeakMap,i=new Set,a=new Map,o,s=0,c=typeof matchMedia==`function`?matchMedia(`(prefers-reduced-motion: reduce)`):void 0,l=()=>{for(let e of i)e()};c?.addEventListener(`change`,l),typeof document<`u`&&document.addEventListener(`visibilitychange`,l);function u(){let e=document.createElement(`input`);e.type=`checkbox`,e.setAttribute(`switch`,``),e.tabIndex=-1,e.setAttribute(`aria-hidden`,`true`),e.autocomplete=`off`,e.dataset.hapticSwitch=``;for(let t of[`click`,`input`,`change`])e.addEventListener(t,e=>e.stopPropagation());return e}function d(t,r){let i=t.target?n.get(t.target):void 0;return i?i(r):e===`ios-gesture`||e!==`ios-label`?!1:(o||(o=document.createElement(`label`),o.dataset.hapticLegacy=``,o.hidden=!0,o.append(u()),o.addEventListener(`click`,e=>e.stopPropagation()),document.body.append(o)),o.click(),!0)}function f(r){if(e!==`ios-gesture`&&e!==`ios-label`)return;let o=document.createElement(`span`),s=u(),c=new AbortController;o.className=`ios-haptic-surface`,o.setAttribute(`aria-hidden`,`true`),o.append(s),r.append(o),s.style.cssText=`all:revert;position:absolute;width:100%;height:100%;top:50%;left:50%;transform:translate(-50%,-50%);touch-action:none;`;let l=null,d=0,f=0,p=0,m=0,h=0,g=0,_=0,v=!1,y=!1,b=!1,x=0,S=0,C=0,w=0,T=0,E=0,D=e=>e.target===s&&e.isTrusted&&e.pointerType===`touch`;a.set(r,()=>({control:r.id||`lightness`,active:l!==null,pending:y,starts:C,cancels:w,pointerMoves:T,touchMovesSeen:E,nativeMoves:x,transitions:S,direction:b?`ltr`:`rtl`}));function O(){clearTimeout(_),_=0,l=null,v=!1,y=!1,b=!1,s.checked=!1,o.style.cssText=``,s.disabled=!t(),o.style.pointerEvents=t()?``:`none`}function k(){if(l===null)return;w++,s.disabled=!0,y=!1;let e=l;l=null,s.hasPointerCapture(e)&&s.releasePointerCapture(e),clearTimeout(_),_=window.setTimeout(O,0)}function A(){if(l===null||!v)return;let e=12.4,t=Math.atan2(g-f,h-d)*180/Math.PI;o.style.cssText=`position:absolute;inset:auto;width:28px;height:${e}px;top:0;left:0;overflow:hidden;opacity:0;direction:${b?`ltr`:`rtl`};transform:translate(${d-14}px,${f-e/2}px) rotate(${t}deg);`,s.getBoundingClientRect()}function j(e){if(!D(e)||!e.isPrimary||!t())return;O(),C++,l=e.pointerId;let n=r.getBoundingClientRect();p=e.clientX,m=e.clientY,d=h=(e.clientX-n.left)*r.clientWidth/n.width,f=g=(e.clientY-n.top)*r.clientHeight/n.height}s.addEventListener(`pointermove`,e=>{D(e)&&T++},{passive:!0,signal:c.signal}),s.addEventListener(`touchmove`,e=>{if(e.isTrusted&&E++,!e.isTrusted||l===null||!t()||e.touches.length!==1)return;let n=e.targetTouches[0];if(!n)return;let i=r.getBoundingClientRect(),a=r.clientWidth/i.width,o=r.clientHeight/i.height;d=(p-i.left)*a,f=(m-i.top)*o,h=(n.clientX-i.left)*a,g=(n.clientY-i.top)*o,v=!0,x++,y&&(y=!1,b=!b,S++),A()},{passive:!0,signal:c.signal}),s.addEventListener(`pointerup`,()=>{y=!1,clearTimeout(_),_=window.setTimeout(O,0)},{signal:c.signal}),s.addEventListener(`pointercancel`,k,{signal:c.signal}),s.addEventListener(`touchcancel`,k,{signal:c.signal});let M=()=>{t()?l===null&&O():(k(),s.disabled=!0,o.style.pointerEvents=`none`)};return i.add(M),O(),n.set(s,()=>l===null||!t()?!1:(y=!0,!0)),{owns:D,start:j,cancel:k,dispose(){c.abort(),clearTimeout(_),i.delete(M),n.delete(s),a.delete(r),o.remove()}}}function p(a){if(e===`none`)return()=>{};let o=new AbortController,c={capture:!0,signal:o.signal};a.addEventListener(`pointerdown`,e=>r.set(a,e.isTrusted&&e.pointerType===`touch`),c);for(let e of[`pointercancel`,`keydown`])a.addEventListener(e,()=>r.delete(a),c);let l=()=>r.delete(a),d=()=>{o.abort(),r.delete(a)};if(e!==`ios-gesture`)return a.addEventListener(`click`,l,{signal:o.signal}),d;let f=document.createElement(`label`),p=u(),m=new AbortController,h=a.style.position;getComputedStyle(a).position===`static`&&(a.style.position=`relative`),p.id=`city-haptic-switch-${++s}`,p.hidden=!0,f.htmlFor=p.id,f.className=`ios-haptic-button`,f.setAttribute(`aria-hidden`,`true`),a.append(f,p);let g=!1;f.addEventListener(`click`,()=>{g=!1},{capture:!0,signal:m.signal}),a.addEventListener(`click`,e=>{e.target===f&&(!e.isTrusted||!r.get(a)||!g||!t())&&e.preventDefault(),l()},{signal:m.signal}),n.set(f,()=>(g=!0,!0));let _=()=>{p.disabled=!t(),f.style.pointerEvents=t()?``:`none`};return i.add(_),_(),()=>{d(),m.abort(),i.delete(_),n.delete(f),f.remove(),p.remove(),a.style.position=h}}function m(e){if(!e.isTrusted||e.type!==`click`||!e.detail||typeof Element>`u`||!(e.target instanceof Element))return!1;let t=e.target.closest(`button`);return!!t&&r.get(t)===!0}return{request:d,isTouchClick:m,attachContinuous:f,attachButton:p,debug:()=>[...a.values()].map(e=>e()),dispose(){o?.remove(),i.clear(),a.clear(),c?.removeEventListener(`change`,l),typeof document<`u`&&document.removeEventListener(`visibilitychange`,l)}}}function qu(e){let t=-1/0;return{pulse(n,r=8){if(!n.isTrusted||n.pointerType!==`touch`||!e.allowed())return!1;let i=e.now();if(i-t<55)return!1;t=i;try{return e.vibrate(Math.max(4,Math.min(16,r)),n)}catch{return!1}}}}function Ju(){let e=0,t=0,n=``,r=(e,t,n)=>`${Math.round(e/n)},${Math.round(t/n)}`;return{reset(i,a,o){e=i,t=a,n=r(e,t,o)},move(i,a,o){let s=Math.hypot(i-e,a-t);if(s<.7)return!1;let c=r(i,a,o),l=c!==n;return s>=o*.8||l&&s>=o*.45?(e=i,t=a,n=c,!0):!1}}}var Yu=()=>typeof navigator<`u`&&navigator.maxTouchPoints>0&&document.visibilityState===`visible`&&!matchMedia(`(prefers-reduced-motion: reduce)`).matches,Xu,Zu=`none`,Qu=0;function $u(){return Xu||=(Zu=Gu(),Ku(Zu,Yu)),Xu}var ed=qu({allowed:Yu,now:()=>performance.now(),vibrate:(e,t)=>{let n=$u(),r=Zu===`vibration`?navigator.vibrate(e):n.request(t,e);return r&&Qu++,r}}),td={pulse(e,t=8){let n=$u(),r=!e.pointerType&&n.isTouchClick(e)?{isTrusted:e.isTrusted,pointerType:`touch`,target:e.target}:e;return ed.pulse(r,t)},attachContinuous:e=>$u().attachContinuous(e),attachButton:e=>$u().attachButton(e),debug:()=>({backend:Zu,continuousBackend:Zu.startsWith(`ios-`)?`ios-gesture`:Zu,requests:Qu,surfaces:Xu?.debug()??[],physicalMotorVerified:!1}),dispose(){Xu?.dispose(),Xu=void 0,Zu=`none`,Qu=0}};function nd(e){let t=document.createElement(`div`);t.id=e.id,t.className=`xy-pad`,t.tabIndex=0,t.setAttribute(`role`,`group`),t.setAttribute(`aria-roledescription`,`二维调整面板`),t.setAttribute(`aria-label`,e.label),t.setAttribute(`aria-describedby`,e.id+`-help`),t.innerHTML=`<canvas class="xy-background" aria-hidden="true"></canvas><canvas class="xy-dots" aria-hidden="true"></canvas><span class="xy-reference" aria-hidden="true"></span><span class="xy-thumb" aria-hidden="true"></span><span class="sr-only" id="${e.id}-help">使用方向键调整位置，按住 Shift 精细调整。也可使用以下横向、纵向控件。</span><input class="sr-only" type="range" min="0" max="100" step="0.1" tabindex="-1" aria-label="${e.label}横向位置"><input class="sr-only" type="range" min="0" max="100" step="0.1" tabindex="-1" aria-label="${e.label}纵向位置">`;let n=t.querySelector(`.xy-background`),r=t.querySelector(`.xy-dots`),i=t.querySelector(`.xy-thumb`),a=t.querySelector(`.xy-reference`),o=Hu(t,n),s=Hu(i),c=Ju(),l=[...t.querySelectorAll(`input`)],u=td.attachContinuous(t),d=new AbortController,f={signal:d.signal},p=matchMedia(`(prefers-reduced-motion: reduce)`),m={x:.5,y:.5},h=null,g=0,_=0,v=0,y=``,b=!0,x,S=!1,C,w=0,T=0,E=0,D=0,O=!1,k={x:.5,y:.5},A,j=``,M=()=>Math.hypot(m.x-k.x,m.y-k.y)<.035?`default`:[m.x,m.y].some(e=>e===0||e===1)?`edge`:``;function N(){let e=Math.max(1,_-36);i.style.left=`${18+m.x*e}px`,i.style.top=`${18+(1-m.y)*e}px`,a.dataset.x=String(k.x),a.dataset.y=String(k.y),t.dataset.x=String(m.x),t.dataset.y=String(m.y),l[0].value=String(m.x*100),l[1].value=String(m.y*100),l.forEach((e,t)=>e.setAttribute(`aria-valuetext`,`${Math.round((t?m.y:m.x)*100)}%`))}function P(){Iu(t)}function F(e){e&&P(),t.classList.toggle(`is-expanded`,e)}function I(e){if(g=0,S)return;let i=t.clientWidth;if(!i)return;let c=Math.min(devicePixelRatio||1,2);if(_!==i||c!==v){_=i,v=c,b=!0,t.classList.contains(`is-expanded`)&&P();for(let e of[n,r])e.width=Math.round(_*v),e.height=Math.round(_*v)}N();let l=Math.min(.05,(e-T)/1e3||1/60);T=e;let u=h===null?O?.48:0:1;if(p.matches?E=0:h===null?e>D&&(E=Math.max(0,E-l/.32)):E=Math.max(.8,E-l/.7),C||={...m},p.matches)C={...m},w=u;else{let e=1-Math.exp(-l*23),t=1-Math.exp(-l*14);C.x+=(m.x-C.x)*e,C.y+=(m.y-C.y)*e,w+=(u-w)*t}let d=!1;if(b&&x){let e=n.getContext(`2d`);e.setTransform(v,0,0,v,0,0),e.clearRect(0,0,_,_),x(e,_,18),b=!1,d=!0}let f=r.getContext(`2d`);f.setTransform(v,0,0,v,0,0),f.clearRect(0,0,_,_);let y=_-36,A=Math.max(6,Math.round(y/20)),j=18+C.x*y,M=18+(1-C.y)*y,F=18+m.x*y,I=18+(1-m.y)*y,R=y/A*.28,z=(e,t)=>{let n=Math.hypot(e-j,t-M),r=Math.exp(-n*n/3528),i=p.matches?0:r*w*4;return{x:e+(n?(e-j)/n*i:0),y:t+(n?(t-M)/n*i:0)}},ee=z(18+k.x*y,18+(1-k.y)*y);if(a.style.left=`${ee.x}px`,a.style.top=`${ee.y}px`,n.style.filter=`brightness(${1+E*.65})`,o.update(1+E*1.25,d),s.update(1+E*1.25),w>.003){let e=(64+w*22)*_/240,t=f.createRadialGradient(j,M,0,j,M,e);t.addColorStop(0,`rgba(255,255,255,${w*.28})`),t.addColorStop(.45,`rgba(255,255,255,${w*.13})`),t.addColorStop(1,`rgba(255,255,255,0)`),f.fillStyle=t,f.fillRect(0,0,_,_)}for(let e=0;e<=A;e++)for(let t=0;t<=A;t++){let n=18+t/A*y,r=18+e/A*y,i=Math.hypot(n-j,r-M),a=Math.exp(-i*i/3528),o=Math.max(Math.exp(-((n-F)**2)/(2*R**2)),Math.exp(-((r-I)**2)/(2*R**2))),s=1+a*(.65+w*1.55)+o*.1,c=Math.min(1,.17+o*.5+a*(.25+w*.45)),l=z(n,r);f.beginPath(),f.fillStyle=`rgba(255,255,255,${c})`,f.shadowColor=`rgba(255,255,255,${a*.7})`,f.shadowBlur=p.matches?0:a*(3+w*8),f.arc(l.x,l.y,1.65*s,0,Math.PI*2),f.fill(),f.shadowBlur=0,f.strokeStyle=`rgba(35,25,35,.16)`,f.lineWidth=.5,f.stroke()}!p.matches&&(Math.hypot(C.x-m.x,C.y-m.y)*y>.1||Math.abs(u-w)>.003||E>.001)&&L()}function L(){!g&&!S&&(g=requestAnimationFrame(I))}function R(e){h===null&&(m=Mu(e),N(),L())}function z(t){m=Mu(t),N(),L(),e.onInput({...m})}function ee(e){let n=t.getBoundingClientRect(),r=18/(_||n.width);return{x:(e.clientX-n.left-n.width*r)/(n.width*(1-2*r)),y:1-(e.clientY-n.top-n.height*r)/(n.height*(1-2*r))}}function B(e=!1){let n=h;h=null,A=void 0,t.classList.remove(`is-dragging`),F(!1),e||(E=0,D=0,w=0,C=void 0,O=!1),n!==null&&t.hasPointerCapture(n)&&t.releasePointerCapture(n),e||u?.cancel(),L()}t.addEventListener(`pointerdown`,n=>{if(h!==null||!n.isPrimary||n.button!==0)return;let r=u?.owns(n);r||n.preventDefault(),n.stopPropagation();let i=ee(n);e.onStart?.(),u?.start(n),r||t.focus({preventScroll:!0}),O=!1,E=1,D=0,h=n.pointerId,A={x:n.clientX,y:n.clientY},r||t.setPointerCapture(h),P(),t.classList.add(`is-dragging`),F(!0),z(i),j=M();let a=_-36;c.reset(m.x*a,m.y*a,a/Math.max(6,Math.round(a/20))),td.pulse(n)},f),t.addEventListener(`pointermove`,e=>{if(h!==e.pointerId||(u?.owns(e)||e.preventDefault(),e.stopPropagation(),A?.x===e.clientX&&A?.y===e.clientY))return;A={x:e.clientX,y:e.clientY},z(ee(e));let t=M(),n=_-36,r=n/Math.max(6,Math.round(n/20)),i=c.move(m.x*n,m.y*n,r);t&&t!==j?(td.pulse(e,8),c.reset(m.x*n,m.y*n,r)):i&&td.pulse(e,4),j=t},f),t.addEventListener(`pointerup`,t=>{h===t.pointerId&&(u?.owns(t)||t.preventDefault(),t.stopPropagation(),(A?.x!==t.clientX||A?.y!==t.clientY)&&z(ee(t)),D=performance.now()+80,B(!0),e.onCommit({...m}),td.pulse(t,6))},f);let te=t=>{h===t.pointerId&&(B(),e.onCancel())};t.addEventListener(`pointercancel`,te,f),t.addEventListener(`lostpointercapture`,te,f),t.addEventListener(`focus`,()=>{O=t.matches(`:focus-visible`),O&&(E=.65),L()},f),t.addEventListener(`blur`,()=>{O=!1,E=0,F(!1),L()},f),t.addEventListener(`keydown`,n=>{if(n.target!==t)return;let r=n.shiftKey?.001:.01,i={...m};if(n.key===`ArrowLeft`)i.x-=r;else if(n.key===`ArrowRight`)i.x+=r;else if(n.key===`ArrowUp`)i.y+=r;else if(n.key===`ArrowDown`)i.y-=r;else if(n.key===`Home`)i.x=.5,i.y=.5;else return;n.preventDefault(),n.stopPropagation(),e.onStart?.(),O||(E=.65),O=!0,z(i),e.onCommit({...m})},f),l.forEach((t,n)=>{t.addEventListener(`input`,r=>{r.stopPropagation();let i=Number(t.value)/100;e.onStart?.(),z({...m,[n?`y`:`x`]:i})},f),t.addEventListener(`change`,()=>e.onCommit({...m}),f)});let V=new ResizeObserver(L);return V.observe(t),p.addEventListener(`change`,L,f),{element:t,setValue:R,cancel:B,setReference(e){k=Mu(e),N(),L()},setBackground(e,t){e!==y&&(y=e,x=t,b=!0,L())},refresh:L,dispose(){S=!0,B(),u?.dispose(),d.abort(),V.disconnect(),cancelAnimationFrame(g),o.dispose(),s.dispose(),t.remove()}}}function rd(e,t){let n=e.querySelector(`input`);e.insertAdjacentHTML(`afterbegin`,`<div class="lightness-rail" aria-hidden="true"><canvas class="lightness-dots"></canvas></div><span class="lightness-reference" aria-hidden="true"></span><span class="lightness-thumb" aria-hidden="true"></span>`);let r=e.querySelector(`.lightness-rail`),i=e.querySelector(`canvas`),a=e.querySelector(`.lightness-thumb`),o=e.querySelector(`.lightness-reference`),s=50,c=Ju(),l=td.attachContinuous(e),u=new AbortController,d={signal:u.signal},f=matchMedia(`(prefers-reduced-motion: reduce)`),p=50,m=50,h=0,g=0,_=0,v=0,y=0,b=null,x=!1,S=!1,C=!1,w,T=``,E=Number(n.min),D=Number(n.max),O=e=>Number.isFinite(e)?Math.max(E,Math.min(D,e)):50,k=e=>(O(e)-E)/(D-E),A=()=>Math.abs(p-s)<1?`default`:p===E||p===D?`edge`:``;function j(){o.style.top=`${17+(1-k(s))*Math.max(0,e.clientHeight-34)}px`,a.style.top=`${17+(1-k(p))*Math.max(0,e.clientHeight-34)}px`}function M(){!y&&!C&&(y=requestAnimationFrame(N))}function N(e){if(y=0,C||!r.clientHeight)return;let t=r.clientWidth,n=r.clientHeight,a=Math.min(devicePixelRatio||1,2);(i.width!==Math.round(t*a)||i.height!==Math.round(n*a))&&(i.width=Math.round(t*a),i.height=Math.round(n*a)),j();let o=Math.min(.05,(e-v)/1e3||1/60);v=e;let c=b===null?S?.48:0:1;f.matches?g=0:b===null?e>_&&(g=Math.max(0,g-o/.32)):g=Math.max(.8,g-o/.7),f.matches?(m=p,h=c):(m+=(p-m)*(1-Math.exp(-o*23)),h+=(c-h)*(1-Math.exp(-o*14)));let l=i.getContext(`2d`);l.setTransform(a,0,0,a,0,0),l.clearRect(0,0,t,n);let u=t/2,d=n-34,x=17+(1-k(m))*d;if(r.style.filter=`saturate(${1+g*.9})`,h>.003){let e=l.createRadialGradient(u,x,0,u,x,58);e.addColorStop(0,`rgba(255,255,255,${h*.3})`),e.addColorStop(1,`rgba(255,255,255,0)`),l.fillStyle=e,l.fillRect(0,0,t,n)}let w=Math.max(4,Math.round(d/20));for(let e=0;e<=w;e++){let t=17+e/w*d,n=t-x,r=Math.exp(-n*n/2312);Math.abs(t-(17+(1-k(s))*d))<7||(l.beginPath(),l.fillStyle=`rgba(255,255,255,${Math.min(1,.28+r*(.62+h*.16))})`,l.shadowColor=`rgba(255,255,255,${r*.7})`,l.shadowBlur=f.matches?0:r*(3+h*8),l.arc(u,t,1.65*(1+r*(1.4+h*.95)),0,Math.PI*2),l.fill(),l.shadowBlur=0,l.strokeStyle=`rgba(35,25,35,.2)`,l.lineWidth=.5,l.stroke())}!f.matches&&(Math.abs(m-p)>.04||Math.abs(c-h)>.003||g>.001)&&M()}function P(){if(b!==null){x=!0;let e=b;b=null,n.hasPointerCapture(e)&&n.releasePointerCapture(e)}w=void 0,S=!1,h=0,g=0,_=0,m=p,e.classList.remove(`is-dragging`,`is-keyboard`),M(),l?.cancel()}function F(t){let n=e.getBoundingClientRect(),r=17/e.clientHeight*n.height;return O(E+(1-(t.clientY-n.top-r)/(n.height-2*r))*(D-E))}function I(e){p=e,n.value=String(p),j(),M(),t.onInput(p)}e.addEventListener(`pointerdown`,r=>{if(b!==null||!r.isPrimary||r.button!==0)return;let i=l?.owns(r);i||r.preventDefault(),r.stopPropagation();let a=F(r);t.onStart(),l?.start(r),i||n.focus({preventScroll:!0}),x=!1,S=!1,b=r.pointerId,g=1,_=0,w={x:r.clientX,y:r.clientY},i||n.setPointerCapture(b),Iu(e),e.classList.add(`is-dragging`),e.classList.remove(`is-keyboard`),I(a),T=A();let o=e.clientHeight-34;c.reset(0,k(p)*o,o/Math.max(4,Math.round(o/20))),td.pulse(r)},d),e.addEventListener(`pointermove`,t=>{if(t.pointerId!==b||(l?.owns(t)||t.preventDefault(),t.stopPropagation(),w?.x===t.clientX&&w?.y===t.clientY))return;w={x:t.clientX,y:t.clientY},I(F(t));let n=A(),r=e.clientHeight-34,i=r/Math.max(4,Math.round(r/20)),a=c.move(0,k(p)*r,i);n&&n!==T?(td.pulse(t,8),c.reset(0,k(p)*r,i)):a&&td.pulse(t,4),T=n},d),e.addEventListener(`pointerup`,r=>{if(r.pointerId!==b)return;l?.owns(r)||r.preventDefault(),r.stopPropagation(),(w?.x!==r.clientX||w?.y!==r.clientY)&&I(F(r));let i=b;b=null,w=void 0,n.hasPointerCapture(i)&&n.releasePointerCapture(i),_=performance.now()+80,e.classList.remove(`is-dragging`),M(),t.onCommit(),td.pulse(r,6)},d);let L=()=>{b!==null&&(P(),t.onCancel())};e.addEventListener(`pointercancel`,L,d),e.addEventListener(`lostpointercapture`,L,d),n.addEventListener(`input`,()=>{if(x){n.value=String(p);return}p=O(Number(n.value)),j(),M(),t.onInput(p)},d),n.addEventListener(`change`,()=>{x||t.onCommit()},d),n.addEventListener(`focus`,()=>{b===null&&n.matches(`:focus-visible`)&&(S=!0,g=.65,e.classList.add(`is-keyboard`),M())},d),n.addEventListener(`keydown`,()=>{t.onStart(),x=!1,S||(g=.65),S=!0,e.classList.add(`is-keyboard`),M()},d),n.addEventListener(`blur`,()=>{S=!1,g=0,e.classList.remove(`is-keyboard`),M()},d);let R=new ResizeObserver(M);return R.observe(e),f.addEventListener(`change`,M,d),{cancel:P,refresh:M,setValue(e,t,i,a=e){s=O(a),b===null&&(p=O(e),n.value=String(p)),r.style.setProperty(`--lightness-low`,`hsl(${t} ${i}% ${E}%)`),r.style.setProperty(`--lightness-mid`,`hsl(${t} ${i}% ${(E+D)/2}%)`),r.style.setProperty(`--lightness-high`,`hsl(${t} ${i}% ${D}%)`),j(),M()},dispose(){C=!0,P(),l?.dispose(),u.abort(),R.disconnect(),cancelAnimationFrame(y)}}}var id;function ad(e){return(t,n,r)=>{let i=Math.min(512,Math.round(n*2)),a=r/n;if(!id||id.pixels!==i||id.padding!==a){let e=document.createElement(`canvas`);e.width=e.height=i;let t=e.getContext(`2d`),n=t.createImageData(i,i);for(let e=0;e<i;e++)for(let t=0;t<i;t++){let r=Pu({x:(t/(i-1)-a)/(1-2*a),y:1-(e/(i-1)-a)/(1-2*a)},0),o=c(r.hue,r.saturation,50),s=4*(e*i+t);n.data[s]=Math.round(o[0]*255),n.data[s+1]=Math.round(o[1]*255),n.data[s+2]=Math.round(o[2]*255),n.data[s+3]=255}t.putImageData(n,0,0),id={pixels:i,padding:a,canvas:e}}t.drawImage(id.canvas,0,0,n,n);let o=Math.max(0,Math.min(100,e))/100;t.fillStyle=o<.5?`rgba(0,0,0,${1-2*o})`:`rgba(255,255,255,${2*o-1})`,t.fillRect(0,0,n,n)}}function od(e){let{hue:t,saturation:n,lightness:r}=e;return(e,i)=>{let a=e.createLinearGradient(0,i,i,0);a.addColorStop(0,`hsl(${t} ${n*.45}% ${Math.min(80,r+18)}%)`),a.addColorStop(.55,`hsl(${t} ${n*.65}% ${Math.max(15,r)}%)`),a.addColorStop(1,`hsl(${t} ${n*.7}% ${Math.max(10,r-15)}%)`),e.fillStyle=a,e.fillRect(0,0,i,i);let o=e.createLinearGradient(0,0,i,i);o.addColorStop(0,`#ffffff00`),o.addColorStop(.55,`#ffffff04`),o.addColorStop(.78,`#ffffff60`),o.addColorStop(1,`#ffffff08`),e.fillStyle=o,e.fillRect(0,0,i,i)}}var sd,cd=new Set;function ld(e){sd=e;for(let e of cd)e.attach();return()=>{if(sd===e){sd=void 0;for(let e of cd)e.attach()}}}function ud(e){let t=0,n,r=!1,i=()=>{cancelAnimationFrame(t),t=0,n?.(),n=void 0},a=()=>{r||(r=!0,i(),cd.delete(s))},o=(t,n=!1)=>{if(r)return!1;if(n)return!0;let i=e(t);return i||queueMicrotask(a),i},s={cancel:a,attach(){if(i(),sd)n=sd.addAnimator({frame:o,dispose(){}});else{let e=n=>{t=0,o(n)&&(t=requestAnimationFrame(e))};t=requestAnimationFrame(e)}}};return cd.add(s),s.attach(),a}var dd={press:{duration:.24,bounce:.2},release:{duration:.5,bounce:.42},glow:{duration:.42,bounce:0},morph:{duration:.42,bounce:.18},layout:{duration:.4,bounce:.16},track:{duration:.18,bounce:0}},fd=class{value;velocity=0;target;stiffness=0;damping=0;constructor(e,t){this.value=e,this.target=e,this.configure(t)}configure({duration:e,bounce:t}){if(!(e>0)||!Number.isFinite(e))throw RangeError(`Spring duration must be positive and finite.`);if(!(t>-1&&t<1))throw RangeError(`Spring bounce must be greater than -1 and less than 1.`);let n=2*Math.PI/e;return this.stiffness=n*n,this.damping=t>=0?4*Math.PI*(1-t)/e:4*Math.PI/(e*(1+t)),this}jump(e){return this.value=this.target=e,this.velocity=0,this}get settled(){return this.value===this.target&&this.velocity===0}step(e){if(this.settled||!(e>0))return this;let t=Math.sqrt(this.stiffness),n=this.damping/(2*t),r=this.value-this.target,i=this.velocity,a,o;if(n<1){let s=t*Math.sqrt(1-n*n),c=Math.exp(-n*t*e),l=r,u=(i+n*t*r)/s,d=Math.cos(s*e),f=Math.sin(s*e);a=c*(l*d+u*f),o=c*((u*s-n*t*l)*d-(l*s+n*t*u)*f)}else if(n===1){let n=Math.exp(-t*e),s=i+t*r;a=n*(r+s*e),o=n*(s-t*(r+s*e))}else{let s=t*Math.sqrt(n*n-1),c=-n*t+s,l=-n*t-s,u=(i-c*r)/(l-c),d=r-u,f=Math.exp(c*e),p=Math.exp(l*e);a=d*f+u*p,o=d*c*f+u*l*p}let s=Math.max(1,Math.abs(this.target),Math.abs(r));return Math.abs(a)<1e-4*s&&Math.abs(o)<.001*s?(this.value=this.target,this.velocity=0):(this.value=this.target+a,this.velocity=o),this}};function pd(e,t,n,r=0,i=0){let a=new fd(t,e);a.target=n,a.velocity=r;let o=i*Math.abs(t-n),s=0;for(;!a.settled&&s<5&&!(o&&Math.abs(a.value-n)<=o&&Math.abs(a.velocity)<=o*10);)a.step(1/120),s+=1/120;return s}function md(e,t,n=.55){if(t<=0)return 0;let r=Math.abs(e);return Math.sign(e)*t*(1-1/(r*n/t+1))}var hd=(e,t)=>(e%t+t)%t;function gd(e,t,n,r=1){let i=hd(e-t,n);return i>n/2&&(i-=n),n%2==0&&i===n/2&&r<0&&(i=-i),i}function _d(e,t,n){let r=n.wrapCopies?t.flatMap((t,n)=>[-1,1].map(r=>{let i=t.cloneNode(!0);return i.removeAttribute(`data-palette`),i.dataset.paletteCopy=t.dataset.palette,i.classList.add(`palette-copy`),i.tabIndex=-1,i.setAttribute(`aria-hidden`,`true`),e.append(i),{button:i,index:n,lap:r}})):[],i=t.length,a=n.visibleSlots??3,o=new fd(0,dd.layout),s=matchMedia(`(prefers-reduced-motion: reduce)`),c=hd(n.initial,i),l=c,u=1,d=1,f=0,p=!1,m=0,h=!1,g=!1,_,v,y=()=>{let t=e.clientWidth;if(t<=0)return;let r=t/a,i=r/d;o.value*=i,o.target*=i,o.velocity*=i,d=r,n.peek&&e.style.setProperty(`--city-card-size`,`${Math.max(1,d-6)}px`),b()};function b(){e.dataset.selected=String(l),t.forEach((e,t)=>{let s=gd(t,c,i,u)+o.value/d;s=((s+i/2)%i+i)%i-i/2,e.style.left=`calc(50% + ${s*d}px)`;let f=Math.min(1,Math.abs(s));e.style.setProperty(`--loop-scale`,String(n.palette?1-f*.16:1)),e.style.opacity=String(1-f*(n.palette?.3:.43)),e.setAttribute(`data-glass-near`,String(Math.abs(s)<a/2+(n.peek?1.5:1)));let p=e.querySelector(`img[data-src]`);p&&(Math.abs(s)<a/2+1.5?p.hasAttribute(`src`)||(p.src=p.dataset.src):p.removeAttribute(`src`));let m=Math.abs(s)<a/2+(n.peek||!n.palette?.5:0);if(!n.palette){let t=Math.max(0,Math.min(1,(a/2+.42-Math.abs(s))/.42));e.style.opacity=String((1-f*.43)*t)}e.style.visibility=m?`visible`:`hidden`;let h=Math.abs(s)<a/2+(n.peek?.5:0);e.inert=!h,e.setAttribute(`aria-hidden`,String(!h)),e.tabIndex=t===l?0:-1,e.setAttribute(n.palette?`aria-pressed`:`aria-selected`,String(t===l));for(let e of r.filter(e=>e.index===t)){let t=s+e.lap*i,r=Math.abs(t)<a/2+.5;e.button.style.left=`calc(50% + ${t*d}px)`,e.button.style.setProperty(`--loop-scale`,String(n.palette?1-Math.min(1,Math.abs(t))*.16:1)),e.button.style.opacity=String(1-Math.min(1,Math.abs(t))*.3),e.button.style.visibility=r?`visible`:`hidden`,e.button.inert=!r,e.button.setAttribute(`data-glass-near`,String(Math.abs(t)<a/2+1))}})}function x(){p&&(o.value+=m*d,o.target+=m*d,c=l,p=!1,m=0)}function S(){p&&=(c=l,!1),o.jump(0),b()}function C(e){let t=f?Math.min(.05,(e-f)/1e3):1/60;return f=e,v||o.step(t),b(),!v&&!o.settled||(v||S(),_=void 0,!1)}let w=()=>{!_&&!g&&(f=0,_=ud(C))};function T(e){g||(x(),u=e<0?-1:1,l=hd(c+e,i),p=!0,m=e,o.configure(dd.layout).target=-e*d,n.onSelect(l),s.matches?S():w())}function E(e){u=e<0?-1:1,l=hd(c+u,i),p=!0,m=u,o.configure(dd.release).target=-u*d,n.onSelect(l),s.matches?S():w()}let D=e=>{e.button===0&&(x(),v={id:e.pointerId,x:e.clientX,y:e.clientY,lastX:e.clientX,lastTime:performance.now(),velocity:0,moved:!1,offset:o.value})},O=t=>{if(!v||t.pointerId!==v.id)return;let n=t.clientX-v.x,r=t.clientY-v.y;if(!v.moved&&Math.abs(r)>Math.abs(n)&&Math.abs(r)>10){v=void 0;return}if(Math.abs(n)>7&&(v.moved=!0,e.setPointerCapture(t.pointerId)),!v.moved)return;t.preventDefault(),u=n>0?-1:1;let i=performance.now();v.velocity=(t.clientX-v.lastX)/Math.max(1,i-v.lastTime),v.lastX=t.clientX,v.lastTime=i,o.jump(Math.max(-d*1.12,Math.min(d*1.12,n+v.offset))),b()},k=t=>{if(!v||t.pointerId!==v.id)return;let{moved:n,velocity:r}=v;v=void 0,e.hasPointerCapture(t.pointerId)&&e.releasePointerCapture(t.pointerId),n&&(h=!0,setTimeout(()=>{h=!1},0),Math.abs(o.value)>Math.min(36,d*.24)||Math.abs(r)>.45?E(o.value<0?1:-1):(o.target=0,w()))},A=t=>{v?.id===t.pointerId&&(v=void 0,e.hasPointerCapture(t.pointerId)&&e.releasePointerCapture(t.pointerId),o.target=0,w())},j=e=>{h&&(h=!1,e.preventDefault(),e.stopImmediatePropagation())};e.addEventListener(`pointerdown`,D),e.addEventListener(`pointermove`,O),e.addEventListener(`pointerup`,k),e.addEventListener(`pointercancel`,A),e.addEventListener(`click`,j,!0);let M=e=>{e===l?p||n.onActivate?.(e):T(gd(e,l,i,u))};r.forEach(e=>e.button.onclick=()=>M(e.index)),t.forEach((e,r)=>{e.onclick=()=>M(r),e.onkeydown=e=>{e.key===`ArrowLeft`||e.key===`ArrowRight`?(e.preventDefault(),T(e.key===`ArrowRight`?1:-1),t[l].focus({preventScroll:!0})):(e.key===`Home`||e.key===`End`)&&(e.preventDefault(),N(e.key===`Home`?0:i-1),n.onSelect(c),t[c].focus({preventScroll:!0}))}});function N(e){e=hd(e,i),e!==l&&(l=c=e,p=!1,o.jump(0),b())}let P=0,F=new ResizeObserver(()=>{P||=requestAnimationFrame(()=>{P=0,y()})});return F.observe(e),y(),{move:T,set:N,selected:()=>l,refresh:y,dispose(){g=!0,cancelAnimationFrame(P),_?.(),F.disconnect(),e.removeEventListener(`pointerdown`,D),e.removeEventListener(`pointermove`,O),e.removeEventListener(`pointerup`,k),e.removeEventListener(`pointercancel`,A),e.removeEventListener(`click`,j,!0);for(let e of t)e.onclick=null,e.onkeydown=null;r.forEach(e=>e.button.remove())}}}var vd=[`purple`,`red`,`gold`,`blue`,`green`],yd={purple:`焕新紫`,red:`繁盛红`,gold:`同心金`,blue:`开放蓝`,green:`共融绿`},bd=[`city`,`color`,`material`,`slogan`],xd=[`城市`,`色彩`,`质感`,`祝福语`];function Sd(e,t){let n=document.createElement(`aside`);n.id=`artwork-settings`,n.className=`creator-panel camera-creator`,n.dataset.pane=`city`,n.dataset.level=`overview`,n.setAttribute(`aria-label`,`城市与创作`),n.innerHTML=`<div class="creator-glass" aria-hidden="true"></div><button class="panel-handle" aria-label="收起创作面板" aria-expanded="true"><span class="handle-glass lg-surface" data-glass-interactive></span></button><div class="creator-tabs loop-menu lg-surface" role="tablist" aria-label="创作选项，左右循环切换"><div class="creator-indicator" aria-hidden="true"></div>${bd.map((e,t)=>`<button role="tab" id="${e}-tab" data-pane="${e}" aria-controls="${e}-pane" aria-selected="${t===0}">${xd[t]}</button>`).join(``)}</div>
 <div class="creator-content"><div id="city-pane" role="tabpanel" aria-labelledby="city-tab"><div class="city-cards" role="group" aria-label="选择城市">${Object.entries(hu).map(([e,t])=>`<button class="city-card" data-theme="${e}"><span>${t.name}</span><img alt="" loading="${e===`v6-shenzhen`?`eager`:`lazy`}" decoding="async"></button>`).join(``)}</div></div>
 <div id="color-pane" role="tabpanel" aria-labelledby="color-tab" hidden><div class="palette-overview"><div class="palette-viewport"><div class="palette-loop" role="group" aria-label="五种配色，左右循环切换">${vd.map(e=>`<button class="palette-tile" data-palette="${e}" aria-label="${yd[e]}"><span class="palette-swatch" style="background:linear-gradient(155deg,${a[e].light},${a[e].dark})"></span><span>${yd[e]}</span></button>`).join(``)}</div></div><button class="open-palette-editor lg-surface" aria-label="自定义配色"><svg viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="1.7" stroke-linecap="round" aria-hidden="true"><path d="M4 7h8m4 0h4M4 17h3m4 0h9"/><circle cx="14" cy="7" r="2"/><circle cx="9" cy="17" r="2"/></svg><span>自定义</span></button></div>
 <div class="color-editor" hidden><div class="editor-toolbar"><button id="palette-back" class="icon-control" aria-label="返回配色预设"><img src="/icons/chevron-left.svg" alt=""></button><button id="reset-palette" class="icon-control" aria-label="恢复当前配色预设"><img src="/icons/arrow-path.svg" alt=""></button></div><div id="creation-controls"><div class="pad-stage editor-pad-transition"><div class="color-pad-row"><div class="pad-mount"></div><div class="lightness-control"><input id="fill-lightness" type="range" min="20" max="65" step="1" aria-label="明度" aria-orientation="vertical"></div></div></div></div></div></div>
 <div id="material-pane" role="tabpanel" aria-labelledby="material-tab" hidden><div class="material-toolbar"><button id="reset-material" class="icon-control" aria-label="恢复当前质感"><img src="/icons/arrow-path.svg" alt=""></button></div><div class="pad-stage material-pad-stage"><div class="pad-mount"></div></div></div>
 <div id="slogan-pane" role="tabpanel" aria-labelledby="slogan-tab" hidden><div class="slogan-grid" role="group" aria-label="选择祝福语">${Object.entries(pu).map(([e,t])=>`<button class="lg-surface" data-slogan="${e}">${t}</button>`).join(``)}</div></div></div><p id="artwork-progress" class="sr-only" role="status" aria-live="polite"></p>`,n.append(n.querySelector(`.creator-tabs`)),document.querySelector(`main`).append(n);let r=e=>n.querySelector(e),i=!1,o=!1,s,c=0,l=!1,u,d=0,f=0,m=matchMedia(`(prefers-reduced-motion: reduce)`),h=[],g=[],_,v,y=()=>{_?.cancel(),v?.cancel(),_=v=void 0,n.classList.remove(`is-resizing`)},b=()=>({box:n.getBoundingClientRect(),tabs:r(`.creator-tabs`).getBoundingClientRect()}),x=e=>{y();let t=e.box,i=n.getBoundingClientRect(),a=r(`.creator-tabs`),o=a.getBoundingClientRect();if(m.matches||Math.abs(t.height-i.height)+Math.abs(t.width-i.width)<1)return;let s={duration:420,easing:`cubic-bezier(.22,.82,.22,1)`,fill:`both`};n.classList.add(`is-resizing`),e.tabs.height&&o.height&&(v=a.animate([{bottom:t.bottom-e.tabs.bottom+`px`,width:e.tabs.width+`px`},{bottom:i.bottom-o.bottom+`px`,width:o.width+`px`}],s));let c=n.animate([{height:t.height+`px`,width:t.width+`px`},{height:i.height+`px`,width:i.width+`px`}],s);_=c,c.finished.then(()=>{_===c&&(y(),z())},()=>{})},S=()=>{n.dataset.collapsed=String(o),r(`.panel-handle`).hidden=o,r(`.creator-content`).hidden=o,r(`.creator-content`).inert=o,r(`.panel-handle`).setAttribute(`aria-expanded`,String(!o)),r(`.panel-handle`).setAttribute(`aria-label`,o?`展开创作面板`:`收起创作面板`)},C=()=>{++d,g.forEach(e=>e.cancel()),g=[]},w=()=>{cancelAnimationFrame(f),f=0,delete n.dataset.restoring,cancelAnimationFrame(c),c=0,s=void 0,k.cancel(),A.cancel(),j.cancel()},T=()=>{C(),y(),w()},E=()=>{cancelAnimationFrame(c),c=0;let t=s;if(s=void 0,t){l=!0;try{e.select({appearance:t})}finally{l=!1}}},D=t=>{let n=s??e.desired.appearance;n&&(s={...n,...t},c||=requestAnimationFrame(E))},O=()=>{w(),se()},k=nd({id:`color-pad`,label:`调整颜色`,onStart:T,onInput:t=>{let n=s??e.desired.appearance;n&&D(Pu(t,n.hue))},onCommit:E,onCancel:O}),A=nd({id:`material-pad`,label:`调整质感`,onStart:T,onInput:e=>D({materialX:e.x,material:e.y}),onCommit:E,onCancel:O}),j=rd(r(`.lightness-control`),{onStart:T,onInput:e=>D({lightness:e}),onCommit:E,onCancel:O});r(`.color-pad-row .pad-mount`).append(k.element),r(`#material-pane .pad-mount`).append(A.element);let M=[...n.querySelectorAll(`.creator-tabs [role=tab]`)],N=[...n.querySelectorAll(`[data-palette]`)],P=_d(r(`.creator-tabs`),M,{initial:0,onSelect:e=>ee(bd[e]),onActivate:()=>B(!o)}),F=_d(r(`.palette-loop`),N,{initial:2,palette:!0,visibleSlots:5,wrapCopies:!0,onSelect:t=>{w();let n=Eu(e.desired.variant).theme;e.select({variant:`${n}-${vd[t]}`})},onActivate:()=>te()}),I=[...n.querySelectorAll(`[data-theme]`)],L=Object.keys(hu),R=_d(r(`.city-cards`),I,{initial:L.indexOf(`v6-shenzhen`),palette:!0,visibleSlots:4,peek:!0,onSelect:t=>{w(),e.select(Ou(e.desired,L[t]))}});function z(){P.refresh(),F.refresh(),R.refresh(),k.refresh(),A.refresh(),j.refresh()}function ee(e){let a=b();C(),y(),w();let s=d,c=r(`.creator-content`),l=()=>{if(s===d){i=!1,o=!1,n.dataset.pane=e,n.dataset.level=`overview`,S(),r(`.creator-tabs`).hidden=!1,r(`.palette-overview`).hidden=!1,r(`.color-editor`).hidden=!0;for(let t of bd){let n=r(`#`+t+`-pane`);n.hidden=t!==e,n.inert=n.hidden}e===`city`&&t(`hero`),e===`slogan`&&t(`front`),se(),z(),x(a),m.matches||g.push(c.animate([{opacity:0,filter:`blur(7px)`,transform:`translateY(5px) scale(.96)`},{opacity:1,filter:`blur(0px)`,transform:`none`}],{duration:290,easing:`cubic-bezier(.2,.75,.2,1)`}))}};if(m.matches||o){l();return}c.inert=!0;let u=c.animate([{opacity:1,filter:`blur(0px)`,transform:`none`},{opacity:0,filter:`blur(6px)`,transform:`scale(.97)`}],{duration:110,easing:`ease-in`,fill:`both`});g.push(u),u.finished.then(()=>{u.cancel(),l()},()=>{})}function B(e){i&&V();let t=b();if(C(),y(),w(),o=e,S(),x(t),z(),!m.matches){let t=r(`.creator-content`),n=r(`.panel-handle`),i=d;e&&(t.hidden=!1,n.hidden=!1);let a=[{opacity:0,filter:`blur(7px)`,transform:`translateY(5px) scale(.96)`},{opacity:1,filter:`blur(0px)`,transform:`none`}];for(let r of[t,n]){let t=r.animate(e?[...a].reverse():a,{duration:420,easing:`cubic-bezier(.22,.82,.22,1)`,fill:`both`});g.push(t),t.finished.then(()=>{i===d&&(t.cancel(),e&&(r.hidden=!0))},()=>{})}}}function te(){if(i)return;let e=b();C(),y(),w();let t=N[F.selected()].querySelector(`.palette-swatch`).getBoundingClientRect();if(i=!0,o=!1,S(),n.dataset.level=`editor`,r(`.creator-tabs`).hidden=!0,r(`.palette-overview`).hidden=!0,r(`.color-editor`).hidden=!1,se(),z(),x(e),!m.matches){let e=r(`.color-pad-row .pad-mount`),n=e.getBoundingClientRect(),i=t.width/n.width,a=e.animate([{transform:`translate(${t.x-n.x}px,${t.y-n.y}px) scale(${i})`,opacity:.15,filter:`blur(5px)`},{transform:`scale(1.025)`,opacity:1,filter:`blur(0px)`,offset:.78},{transform:`none`,opacity:1,filter:`blur(0px)`}],{duration:460,easing:`cubic-bezier(.2,.8,.2,1)`,fill:`both`});g.push(a),g.push(r(`.lightness-control`).animate([{opacity:0,transform:`translateX(-8px) scale(.6)`,filter:`blur(3px)`},{opacity:1,transform:`none`,filter:`blur(0px)`}],{duration:460,easing:`cubic-bezier(.2,.8,.2,1)`,fill:`backwards`})),g.push(r(`.editor-toolbar`).animate([{opacity:0},{opacity:1}],{duration:220,delay:80,fill:`backwards`}));let o=d;a.finished.then(()=>{o===d&&(a.cancel(),z())},()=>{})}}function V(){if(!i)return;let e=b();C(),y(),w();let t=k.element.getBoundingClientRect();i=!1,n.dataset.level=`overview`,r(`.creator-tabs`).hidden=!1,r(`.palette-overview`).hidden=!1,r(`.color-editor`).hidden=!0,z(),x(e);let a=N[F.selected()],o=a.querySelector(`.palette-swatch`),s=o.getBoundingClientRect();if(!m.matches){let e=o.animate([{transform:`translate(${t.x-s.x}px,${t.y-s.y}px) scale(${t.width/s.width})`,opacity:.35,filter:`blur(4px)`},{transform:`none`,opacity:1,filter:`blur(0px)`}],{duration:420,easing:`cubic-bezier(.22,.82,.22,1)`});g.push(e)}a.focus({preventScroll:!0})}let H=r(`.panel-handle`),ne,re=!1;H.onclick=()=>{if(re){re=!1;return}B(!o)},H.onpointerdown=e=>{ne={id:e.pointerId,y:e.clientY},re=!1,H.setPointerCapture(e.pointerId)},H.onpointerup=e=>{if(ne?.id!==e.pointerId)return;let t=e.clientY-ne.y;ne=void 0,H.releasePointerCapture(e.pointerId),Math.abs(t)>16&&(re=!0,B(t>0))},H.onpointercancel=()=>{ne=void 0,re=!1},S(),r(`#palette-back`).onclick=V,r(`.open-palette-editor`).onclick=te;function ie(t,i){td.pulse(i,12),w();let a=e.desired.appearance;if(!a)return;let o=p(a.preset),s=t===`color`?o:{...a,material:o.material,materialX:o.materialX};if(m.matches){e.select({appearance:s});return}let c=r(t===`color`?`#reset-palette img`:`#reset-material img`);c.getAnimations().forEach(e=>e.cancel()),c.animate([{transform:`rotate(-180deg)`},{transform:`rotate(0deg)`}],{duration:420,easing:`ease-out`});let u=performance.now(),d=(s.hue-a.hue+540)%360-180;n.dataset.restoring=`true`;let h=t=>{let r=Math.min(1,(t-u)/420),i=1-(1-r)**3,o={...s,hue:(a.hue+d*i+360)%360};for(let e of[`saturation`,`lightness`,`material`,`materialX`,`relief`])o[e]=(a[e]??.5)+((s[e]??.5)-(a[e]??.5))*i;l=!0;try{e.select({appearance:r===1?s:o})}finally{l=!1}r<1?f=requestAnimationFrame(h):(f=0,delete n.dataset.restoring)};f=requestAnimationFrame(h)}r(`#reset-palette`).onclick=e=>ie(`color`,e),r(`#reset-material`).onclick=e=>ie(`material`,e),n.querySelectorAll(`[data-slogan]`).forEach(t=>t.onclick=()=>{w(),e.select({text:t.dataset.slogan})});let ae=[...M,...N,...n.querySelectorAll(`[data-palette-copy]`),...I,...n.querySelectorAll(`[data-slogan],.panel-handle,.open-palette-editor,#palette-back`)];for(let e of ae){let t=e.onclick;e.onclick=function(e){return td.pulse(e,8),t?.call(this,e)},h.push(td.attachButton(e))}for(let e of[`reset-palette`,`reset-material`])h.push(td.attachButton(r(`#`+e)));let oe=e=>{e.key===`Escape`&&i&&(e.preventDefault(),V())};document.addEventListener(`keydown`,oe);function se(){let t=e.desired,i=t.appearance;if(!i)return;u!==i&&!l&&w(),u=i;let a=Eu(t.variant).theme;R.set(L.indexOf(a)),n.setAttribute(`aria-busy`,String(e.busy)),n.querySelectorAll(`[data-theme]`).forEach(e=>e.setAttribute(`aria-pressed`,String(e.dataset.theme===a))),n.querySelectorAll(`[data-slogan]`).forEach(e=>e.setAttribute(`aria-pressed`,String(e.dataset.slogan===t.text))),F.set(vd.indexOf(i.preset));let o=p(i.preset);k.setValue(Fu(i.hue,i.saturation)),k.setReference(Fu(o.hue,o.saturation)),A.setValue({x:i.materialX??.5,y:i.material}),A.setReference({x:o.materialX??.5,y:o.material}),j.setValue(i.lightness,i.hue,i.saturation,o.lightness),k.setBackground(String(i.lightness),ad(i.lightness)),A.setBackground([i.hue,i.saturation,i.lightness].join(`,`),od(i)),r(`#artwork-progress`).textContent=e.busy?`正在准备图样`:e.error}return se(),{async setThumbnails(e){for(let t of I){let n=t.querySelector(`img`);n.dataset.src=e[t.dataset.theme.slice(3)]}R.refresh(),await Promise.all(I.map(e=>e.querySelector(`img`)).filter(e=>e.hasAttribute(`src`)).map(e=>(e.loading=`eager`,e.decode())))},ready(){n.inert=!1,z()},render:se,progress(){se()},close:V,dispose(){C(),y(),w(),R.dispose(),P.dispose(),F.dispose(),k.dispose(),A.dispose(),j.dispose(),h.forEach(e=>e()),document.removeEventListener(`keydown`,oe),n.remove()}}}var Cd=e=>`<svg viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="1.7" stroke-linecap="round" stroke-linejoin="round" aria-hidden="true">${e}</svg>`,wd=Cd(`<path d="m12 2.5 5.5 3.2v6.4L12 15.3l-5.5-3.2V5.7Z"/><path d="m6.5 5.7 5.5 3.2 5.5-3.2M12 8.9v6.4"/><path d="M4.1 12.5C1 14.1 1.8 17 5.6 18.6c4 1.8 9.5 1.6 13.2-.4 2.6-1.5 3.1-3.7 1.3-5.2m0 0 .2 3m-.2-3-2.7 1"/>`),Td=Cd(`<path d="M9 7v10M15 7v10"/>`),Ed=Cd(`<path d="M4.5 8A8 8 0 1 1 4 16.5M4.5 3.5V8H9"/>`),Dd=Cd(`<path d="M2 12s3.5-7 10-7 10 7 10 7-3.5 7-10 7S2 12 2 12Z"/><circle cx="12" cy="12" r="3"/>`);function Od(e){let t=[{id:`exploded`,label:`拆解`},{id:`lid`,label:`杯盖`},{id:`hero`,label:`杯碟`},{id:`saucerBottom`,label:`碟底`},{id:`bottom`,label:`杯底`},{id:`detail`,label:`浮雕`},{id:`flowers`,label:`花纹`}];document.querySelector(`#app`).innerHTML=`<main class="consumer-scene" aria-label="城市杯自由创作"><div id="glass-content"><div id="scene-background" class="scene-background" aria-hidden="true"></div><canvas id="viewport" tabindex="0" aria-label="单指旋转杯子，双指移动或缩放"></canvas></div><div class="consumer-actions" role="group" aria-label="杯子操作"><button id="auto" class="scene-icon lg-surface" aria-label="自动旋转" title="自动旋转" aria-pressed="false">${wd}</button><button id="reset" class="scene-icon lg-surface" aria-label="复位视角" title="复位视角">${Ed}</button></div><div class="view-picker"><button id="view-trigger" class="lg-surface" aria-haspopup="menu" aria-expanded="false" aria-controls="view-menu" aria-label="切换视角，当前杯碟">${Dd}<span>杯碟</span>${Cd(`<path d="m8 10 4 4 4-4"/>`)}</button><nav id="view-menu" class="view-rail lg-surface lg-menu" role="menu" aria-label="观察视角" hidden>${t.map(e=>`<button data-view="${e.id}" role="menuitemradio" aria-checked="${e.id===`hero`}" aria-pressed="${e.id===`hero`}" tabindex="${e.id===`hero`?0:-1}"><span>${e.label}</span>${Cd(`<path d="m5 12 4 4L19 6"/>`)}</button>`).join(``)}</nav></div><div id="status" role="status" aria-live="polite"></div><div id="fatal" role="alert" hidden></div></main>`;let n=e=>document.querySelector(e),r=n(`#view-trigger`),i=n(`#view-menu`),a=n(`.view-picker`),o=Array.from(i.querySelectorAll(`[data-view]`)),s=0,c=!1,l,u=matchMedia(`(prefers-reduced-motion: reduce)`),d=()=>{c||(i.hidden=!0,i.dataset.closed=``)};i.addEventListener(`glass:exited`,d);function f(e,t=!1){if(l?.cancel(),l=void 0,c=e,r.setAttribute(`aria-expanded`,String(c)),i.inert=!c,e&&(i.hidden=!1,delete i.dataset.closed,delete i.dataset.endingStyle),!u.matches&&document.querySelector(`.consumer-scene`)?.getAttribute(`data-glass-state`)===`ready`)e||(i.hasAttribute(`data-lg-container`)?i.dataset.endingStyle=``:i.hidden=!0);else if(u.matches)i.hidden=!e;else{let t=i.animate(e?[{opacity:0,transform:`translateY(-8px) scale(.85)`},{opacity:1,transform:`none`}]:[{opacity:1,transform:`none`},{opacity:0,transform:`translateY(-8px) scale(.85)`}],{duration:200,easing:`ease-out`});l=t,t.finished.then(()=>{l===t&&(l=void 0,c||(i.hidden=!0))},()=>{})}t&&(e?o.find(e=>e.getAttribute(`aria-checked`)===`true`)??o[0]:r).focus()}r.onclick=e=>f(!c,e.detail===0);for(let t of o)t.onclick=()=>{e.view(t.dataset.view),f(!1,!0)};n(`#auto`).onclick=e.auto,n(`#reset`).onclick=()=>{e.reset(),f(!1)};let p=[r,...o,n(`#auto`),n(`#reset`)].map(e=>{let t=e.onclick;return e.onclick=function(e){return td.pulse(e,8),t?.call(this,e)},td.attachButton(e)}),m=e=>{c&&!a.contains(e.target)&&f(!1)};document.addEventListener(`pointerdown`,m);let h=e=>{let t=o.indexOf(document.activeElement);if([`ArrowDown`,`ArrowUp`,`Home`,`End`].includes(e.key)){e.preventDefault();let n=e.key===`Home`?0:e.key===`End`?o.length-1:(t+(e.key===`ArrowDown`?1:-1)+o.length)%o.length;o[n].focus()}};i.addEventListener(`keydown`,h);function g(e,t=!1){clearTimeout(s),n(`#status`).textContent=e,n(`#status`).classList.add(`visible`),t||(s=window.setTimeout(()=>n(`#status`).classList.remove(`visible`),2600))}let _=t=>{t.key===`Escape`&&c?(t.preventDefault(),t.stopImmediatePropagation(),f(!1,!0)):t.key.toLowerCase()===`r`&&!(t.target instanceof HTMLInputElement)&&e.reset()};return document.addEventListener(`keydown`,_,!0),{canvas:n(`#viewport`),backgroundLayer:n(`#scene-background`),closePanels(){f(!1)},background(e){},backgroundError:g,message:g,style(e){clearTimeout(s),n(`#status`).classList.remove(`visible`),n(`#status`).textContent=``},update(e,i){let a=e===`front`?`hero`:e,s=t.find(e=>e.id===a)?.label??`杯碟`;for(let e of o){let t=e.dataset.view===a;e.setAttribute(`aria-pressed`,String(t)),e.setAttribute(`aria-checked`,String(t)),e.tabIndex=t?0:-1}r.querySelector(`span`).textContent=s,r.setAttribute(`aria-label`,`切换视角，当前${s}`),n(`#auto`).setAttribute(`aria-pressed`,String(i));let c=n(`#auto`),l=i?`暂停旋转`:`自动旋转`;c.setAttribute(`aria-label`,l),c.title=l;let u=c.querySelector(`svg`);u.outerHTML=i?Td:wd},error(e){n(`#fatal`).hidden=!1,n(`#fatal`).textContent=e},dispose(){clearTimeout(s),l?.cancel(),p.forEach(e=>e()),document.removeEventListener(`pointerdown`,m),document.removeEventListener(`keydown`,_,!0),i.removeEventListener(`keydown`,h),i.removeEventListener(`glass:exited`,d)}}}var kd=new Map,Ad=()=>!0;function jd(e){Ad=e}function Md(){return{gpuBytes:[...kd.values()].reduce((e,t)=>e+t.gpu,0),scratchBytes:[...kd.values()].reduce((e,t)=>e+t.scratch,0),cpuBytes:[...kd.values()].reduce((e,t)=>e+t.cpu,0),parts:Object.fromEntries(kd)}}function Nd(e,t,n=0,r=0){let i=Md(),a=i.gpuBytes-(kd.get(e)?.gpu??0)+t,o=i.scratchBytes-(kd.get(e)?.scratch??0)+r;if(!Ad(a,o))throw Error(`Glass resource budget exceeded: ${e}; total=${a}; scratch=${o}`);kd.set(e,{gpu:t,cpu:n,scratch:r})}function Pd(e){kd.delete(e);let t=Md();Ad(t.gpuBytes,t.scratchBytes)}var Fd=new Int32Array(256);for(let e=0;e<256;e++){let t=e;for(let e=0;e<8;e++)t=t&1?3988292384^t>>>1:t>>>1;Fd[e]=t}function Id(e,t=0,n=e.length){let r=-1;for(let i=t;i<n;i++)r=Fd[(r^e[i])&255]^r>>>8;return(r^-1)>>>0}function Ld(e){let t=1,n=0;for(let r=0;r<e.length;){let i=Math.min(e.length,r+3800);for(;r<i;r++)t+=e[r],n+=t;t%=65521,n%=65521}return(n<<16|t)>>>0}function Rd(e){let t=Math.max(1,Math.ceil(e.length/65535)),n=new Uint8Array(2+e.length+t*5+4);n[0]=120,n[1]=1;let r=2;for(let i=0;i<t;i++){let a=i*65535,o=Math.min(65535,e.length-a);n[r++]=+(i===t-1),n[r++]=o&255,n[r++]=o>>>8,n[r++]=~o&255,n[r++]=~o>>>8&255,n.set(e.subarray(a,a+o),r),r+=o}let i=Ld(e);return n[r++]=i>>>24,n[r++]=i>>>16&255,n[r++]=i>>>8&255,n[r++]=i&255,n}async function zd(e){if(typeof CompressionStream>`u`)return Rd(e);try{let t=new Blob([e]).stream().pipeThrough(new CompressionStream(`deflate`));return new Uint8Array(await new Response(t).arrayBuffer())}catch{return Rd(e)}}function Bd(e,t){let n=new Uint8Array(12+t.length),r=new DataView(n.buffer);r.setUint32(0,t.length);for(let t=0;t<4;t++)n[4+t]=e.charCodeAt(t);return n.set(t,8),r.setUint32(8+t.length,Id(n,4,8+t.length)),n}function Vd(e,t,n,r){let i=e*4,a=new Uint8Array((i+1)*t);for(let e=0;e<t;e++){let t=e*r,o=e*(i+1);a[o]=1;for(let e=0;e<4;e++)a[o+1+e]=n[t+e];for(let e=4;e<i;e++)a[o+1+e]=n[t+e]-n[t+e-4]&255}return a}function Hd(e,t,n){let r=new Uint8Array(13),i=new DataView(r.buffer);i.setUint32(0,e),i.setUint32(4,t),r[8]=8,r[9]=6,r[10]=0,r[11]=0,r[12]=0;let a=[new Uint8Array([137,80,78,71,13,10,26,10]),Bd(`IHDR`,r),Bd(`IDAT`,n),Bd(`IEND`,new Uint8Array)],o=new Uint8Array(a.reduce((e,t)=>e+t.length,0)),s=0;for(let e of a)o.set(e,s),s+=e.length;return o}async function Ud(e,t,n,r=e*4){return Hd(e,t,await zd(Vd(e,t,n,r)))}var Wd=`ABCDEFGHIJKLMNOPQRSTUVWXYZabcdefghijklmnopqrstuvwxyz0123456789+/`;function Gd(e){let t=``,n=e.length-e.length%3;for(let r=0;r<n;r+=3){let n=e[r]<<16|e[r+1]<<8|e[r+2];t+=Wd[n>>>18]+Wd[n>>>12&63]+Wd[n>>>6&63]+Wd[n&63]}if(e.length-n===1){let r=e[n]<<16;t+=Wd[r>>>18]+Wd[r>>>12&63]+`==`}else if(e.length-n===2){let r=e[n]<<16|e[n+1]<<8;t+=Wd[r>>>18]+Wd[r>>>12&63]+Wd[r>>>6&63]+`=`}return t}async function Kd(e,t,n,r){return`data:image/png;base64,${Gd(await Ud(e,t,n,r))}`}function qd(e,t,n){return`data:image/png;base64,${Gd(Hd(e,t,Rd(Vd(e,t,n,e*4))))}`}function Jd(e,t,n,r){let i=t*4,a=r===void 0?[[0,t]]:[[0,t],[0,r],[r,t-2*r],[t-r,r]];return Promise.all(Array.from({length:2},(t,r)=>{let o=r*n*i;return Promise.all(a.map(([t,r])=>Kd(r,n,e.subarray(o+t*4,o+n*i),i)))}))}var Yd=`modulepreload`,Xd=function(e){return`/`+e},Zd={},Qd=function(e,t,n){let r=Promise.resolve();if(t&&t.length>0){let e=document.getElementsByTagName(`link`),i=document.querySelector(`meta[property=csp-nonce]`),a=i?.nonce||i?.getAttribute(`nonce`);function o(e){return Promise.all(e.map(e=>Promise.resolve(e).then(e=>({status:`fulfilled`,value:e}),e=>({status:`rejected`,reason:e}))))}function s(e){return import.meta.resolve?import.meta.resolve(e):new URL(e,import.meta.url).href}r=o(t.map(t=>{if(t=Xd(t,n),t=s(t),t in Zd)return;Zd[t]=!0;let r=t.endsWith(`.css`);for(let n=e.length-1;n>=0;n--){let i=e[n];if(i.href===t&&(!r||i.rel===`stylesheet`))return}let i=document.createElement(`link`);if(i.rel=r?`stylesheet`:Yd,r||(i.as=`script`),i.crossOrigin=``,i.href=t,a&&i.setAttribute(`nonce`,a),document.head.appendChild(i),r)return new Promise((e,n)=>{i.addEventListener(`load`,e),i.addEventListener(`error`,()=>n(Error(`Unable to preload CSS for ${t}`)))})}).filter(e=>e!==void 0))}function i(e){let t=new Event(`vite:preloadError`,{cancelable:!0});if(t.payload=e,window.dispatchEvent(t),!t.defaultPrevented)throw e}return r.then(t=>{for(let e of t||[])e.status===`rejected`&&i(e.reason);return e().catch(i)})},$d,ef=!1,tf,nf=0,rf=new Map;async function af(){if(!ef)return $d||(tf??=Qd(async()=>{let{default:e}=await import(`./map-encoder.worker-gG3z5fOt.js`);return{default:e}},[]).then(({default:e})=>{$d=new e,$d.onmessage=({data:{id:e,planes:t,error:n}})=>{let r=rf.get(e);rf.delete(e),n?r?.reject(Error(n)):r?.resolve(t)};let t=()=>{ef=!0,$d?.terminate(),$d=void 0;for(let e of rf.values())e.reject(Error(`Material encoder worker unavailable.`));rf.clear()};return $d.onerror=e=>{e.preventDefault(),t()},$d.onmessageerror=t,$d}).catch(()=>{ef=!0}))}async function of(e,t,n,r){let i=await af();if(i)try{return await new Promise((a,o)=>{let s=++nf;rf.set(s,{resolve:a,reject:o});try{i.postMessage({id:s,pixels:e,width:t,height:n,cap:r})}catch(e){rf.delete(s),o(e)}})}catch{}return Jd(e,t,n,r)}var sf=typeof location<`u`&&location.pathname.startsWith(`/audit/`)&&new URLSearchParams(location.search).get(`backend`)===`webgpu`?`webgpu`:`webgl2`;function cf(){return Qd(sf===`webgpu`?()=>import(`./gpu-BTqVGPKC.js`).then(e=>e.getMaterialRenderer()):()=>Promise.resolve().then(()=>D_).then(e=>e.getMaterialRenderer()),[])}var lf=8192;function uf(e){let t=Math.max(1,Math.min(e.dpr??1,2)),n=Math.min(1,4096/((e.width+4)*t),lf/2/((e.height+4)*t));return n<1?Math.max(.25,t*n):t}var df={version:1,wgsl:`// Lisse outlines tessellated once on the host, shared with DOM clipping.
// A batch renders several shapes into one atlas: each shape owns a band of
// rows holding its two planes, so every map of an animation path is one
// pass and one readback. The field plane carries displacement in red and
// green and shape coverage in alpha; SVG reads a displacement map
// unpremultiplied, so the two never interfere. The overlay plane is the rim
// shade with the highlight drawn over it, ready to paint over the material.
struct Shape {
  size: vec2f,
  // First atlas row of this shape, and physical rows per plane.
  row: f32,
  rows: f32,
  // Physical columns this shape covers; the atlas is as wide as its widest shape.
  columns: f32,
  dpr: f32,
  dark: f32,
  symmetric: f32,
  // Outline segment range in the shared segment table.
  start: u32,
  count: u32,
  pad: vec2u,
}
struct Batch { count: u32, pad: vec3u, shapes: array<Shape, 32> }
struct Outline { segments: array<vec4f, 4096> }
@group(0) @binding(0) var<uniform> batch: Batch;
@group(0) @binding(1) var<uniform> outline: Outline;
fn sat(x: f32) -> f32 { return clamp(x, 0.0, 1.0); }
fn shape(s: Shape, point: vec2f) -> vec3f {
  let symmetric = s.symmetric != 0.0;
  let p = select(point, vec2f(abs(point.x), -abs(point.y)), symmetric) + s.size * 0.5;
  var distance2 = 1e20;
  var delta = vec2f(0.0);
  var outward = vec2f(0.0, -1.0);
  for (var i = s.start; i < s.start + s.count; i++) {
    let segment = outline.segments[i];
    let edge = segment.zw - segment.xy;
    let nearest = segment.xy + edge * sat(dot(p-segment.xy, edge) / dot(edge, edge));
    let v = p - nearest;
    let d2 = dot(v, v);
    if (d2 < distance2) {
      distance2 = d2;
      delta = v;
      outward = normalize(vec2f(edge.y, -edge.x));
    }
  }
  let direction = select(-1.0, 1.0, dot(delta, outward) >= 0.0);
  let distance = sqrt(distance2);
  let normal = select(outward, delta * direction / max(distance, 0.00001), distance > 0.00001);
  return vec3f(distance * direction, select(normal, vec2f(normal.x, -normal.y) * sign(point), symmetric));
}
@fragment fn fs_main(@builtin(position) position: vec4f) -> @location(0) vec4f {
  var index = 0u;
  for (var k = 1u; k < batch.count; k++) {
    if (position.y >= batch.shapes[k].row) { index = k; }
  }
  let s = batch.shapes[index];
  let band = position.y - s.row;
  let plane = min(u32(band / s.rows), 1u);
  let local = vec2f(position.x / s.columns, (band - f32(plane) * s.rows) / s.rows);
  let point = local * (s.size + 4.0) - (s.size + 4.0) * 0.5;
  let field = shape(s, point);
  let d = field.x; let n = field.yz;
  let aa = max(fwidth(d), 1.0 / s.dpr);
  // Derivatives above stay in uniform control flow; columns past this
  // shape's width belong to a wider shape in the same atlas.
  if (position.x >= s.columns) { return vec4f(0.0); }
  let coverage = sat(0.5 - d / aa);
  let depth = sat(-d * 0.05);
  let edge = 1.0 - sat(sqrt((2.0 - depth) * depth));
  if (plane == 0u) { return vec4f(vec2f(0.5) - n * edge * 0.5, 0.5, coverage); }
  // Keep the top/bottom light away from the side outline, including capsules.
  let spread = 1.08;
  let directional = pow(sat((abs(n.y) - cos(spread)) / (1.0 - cos(spread))), 1.25);
  let diffuseDir = pow(sat((abs(n.y) - cos(spread * 0.65)) / (1.0 - cos(spread * 0.65))), 1.25);
  let stroke = sat((d + 0.9) / aa + 0.5) * sat(0.5 - d / aa);
  var specular = directional * stroke;
  specular = specular / (1.0 + 0.5 * (1.0 - specular));
  let diffuse = diffuseDir * 0.18 * pow(1.0 - sat(-d / 4.5), 2.0) * coverage;
  let highlight = sat(specular * mix(1.0, 0.82, s.dark) + diffuse * mix(1.0, 0.40, s.dark));
  let adjusted = d - 0.5;
  let falloff = 1.0 - sat(-adjusted / 0.5);
  let ramp = mix(select(0.0, 1.0, falloff > 0.0), falloff, 0.75);
  let outline = ramp * sat((adjusted + 0.5) / aa + 0.5) * sat(-adjusted / aa + 0.5);
  let sideSpread = 0.98;
  let weights = clamp((vec2f(n.x, -n.x) - cos(sideSpread)) / (1.0 - cos(sideSpread)), vec2f(0), vec2f(1)) * outline;
  let shade = dot(weights / (vec2f(1) + 0.4 * (vec2f(1) - weights)), vec2f(1)) * mix(0.48, 0.60, s.dark);
  // Light over a black rim, unpremultiplied for the PNG encoder.
  let alpha = highlight + shade * (1.0 - highlight);
  let light = mix(1.0, 0.82, s.dark) * highlight / max(alpha, 0.00001);
  return vec4f(vec3f(light), alpha);
}
`,functionExports:[]},ff=`#version 300 es
// Faithful GLSL ES port of ../gpu/maps.wgsl at upstream 9f5bfc7.
precision highp float;
precision highp int;
uniform sampler2D outlines;
uniform vec4 shapes[96];
uniform int shapeCount;
uniform float atlasHeight;
out vec4 result;
float sat(float x) { return clamp(x,0.0,1.0); }
vec3 field(vec2 size, bool symmetric, int start, int count, vec2 point) {
  vec2 p=(symmetric?vec2(abs(point.x),-abs(point.y)):point)+size*0.5;
  float distance2=1e20;
  vec2 delta=vec2(0), outward=vec2(0,-1);
  for(int i=start;i<start+count;i++) {
    vec4 segment=texelFetch(outlines,ivec2(i%64,i/64),0);
    vec2 edge=segment.zw-segment.xy;
    vec2 nearest=segment.xy+edge*sat(dot(p-segment.xy,edge)/dot(edge,edge));
    vec2 v=p-nearest;
    float d2=dot(v,v);
    if(d2<distance2){distance2=d2;delta=v;outward=normalize(vec2(edge.y,-edge.x));}
  }
  float direction=dot(delta,outward)>=0.0?1.0:-1.0;
  float distance=sqrt(distance2);
  vec2 normal=distance>0.00001?delta*direction/max(distance,0.00001):outward;
  return vec3(distance*direction,symmetric?vec2(normal.x,-normal.y)*sign(point):normal);
}
void main() {
  // WebGPU's fragment positions are top-down; convert exactly once here.
  vec2 position=vec2(gl_FragCoord.x,atlasHeight-gl_FragCoord.y);
  int index=0;
  for(int k=1;k<shapeCount;k++)if(position.y>=shapes[k*3].z)index=k;
  vec4 a=shapes[index*3],b=shapes[index*3+1],c=shapes[index*3+2];
  vec2 size=a.xy;
  float row=a.z,rows=a.w,columns=b.x,dpr=b.y,dark=b.z;
  float band=position.y-row;
  int plane=min(int(band/rows),1);
  vec2 local=vec2(position.x/columns,(band-float(plane)*rows)/rows);
  vec2 point=local*(size+4.0)-(size+4.0)*0.5;
  vec3 f=field(size,b.w!=0.0,int(c.x),int(c.y),point);
  float d=f.x;vec2 n=f.yz;
  float aa=max(fwidth(d),1.0/dpr);
  if(position.x>=columns){result=vec4(0);return;}
  float coverage=sat(0.5-d/aa);
  float depth=sat(-d*0.05);
  float edge=1.0-sat(sqrt((2.0-depth)*depth));
  if(plane==0){result=vec4(vec2(0.5)-n*edge*0.5,0.5,coverage);return;}
  float spread=1.08;
  float directional=pow(sat((abs(n.y)-cos(spread))/(1.0-cos(spread))),1.25);
  float diffuseDir=pow(sat((abs(n.y)-cos(spread*0.65))/(1.0-cos(spread*0.65))),1.25);
  float stroke=sat((d+0.9)/aa+0.5)*sat(0.5-d/aa);
  float specular=directional*stroke;
  specular=specular/(1.0+0.5*(1.0-specular));
  float diffuse=diffuseDir*0.18*pow(1.0-sat(-d/4.5),2.0)*coverage;
  float highlight=sat(specular*mix(1.0,0.82,dark)+diffuse*mix(1.0,0.40,dark));
  float adjusted=d-0.5;
  float falloff=1.0-sat(-adjusted/0.5);
  float ramp=mix(falloff>0.0?1.0:0.0,falloff,0.75);
  float outline=ramp*sat((adjusted+0.5)/aa+0.5)*sat(-adjusted/aa+0.5);
  float sideSpread=0.98;
  vec2 weights=clamp((vec2(n.x,-n.x)-cos(sideSpread))/(1.0-cos(sideSpread)),vec2(0),vec2(1))*outline;
  float shade=dot(weights/(vec2(1)+0.4*(vec2(1)-weights)),vec2(1))*mix(0.48,0.60,dark);
  float alpha=highlight+shade*(1.0-highlight);
  float light=mix(1.0,0.82,dark)*highlight/max(alpha,0.00001);
  result=vec4(vec3(light),alpha);
}
`,pf={field:`field`,overlay:`overlay`},mf=(e,t)=>`s${e}${pf[t]}`;function hf(e){if(!(e.outline||e.radius!==`capsule`||!Number.isFinite(e.width)||!Number.isFinite(e.height)||e.height<=0||e.width<e.height*2))return{...e,width:e.height*3}}var gf=new Map,_f=new Map,vf=0;function yf(e){let t=gf.get(e);return t||(t=`m${++vf}`,gf.set(e,t),_f.set(t,e)),t}function bf(e){return _f.get(e)}function xf(e){let t=gf.get(e);t&&(gf.delete(e),_f.delete(t))}function Sf(e,t,n,r,i,a,o,s=1,c=1){let l=(e,t,n,r)=>`<feImage data-map="${yf(e)}" x="${t/s}" y="${i/c}" width="${n/s}" height="${o/c}" preserveAspectRatio="none" result="${r}"/>`;sp(e);let u=e.capsule,d=u?u.cap*o/u.height:0;if(!u||a<d*2)return l(e[t],r,a,n);let[f,p,m]=u.planes[t];return l(p,r+d-.5,a-d*2+1,`${n}M`)+l(f,r,d,`${n}L`)+l(m,r+a-d,d,`${n}R`)+`<feMerge result="${n}" x="${r/s}" y="${i/c}" width="${a/s}" height="${o/c}"><feMergeNode in="${n}M"/><feMergeNode in="${n}L"/><feMergeNode in="${n}R"/></feMerge>`}var Cf=`liquid-glass`,wf=`maps`,Tf=256,Ef;function Df(){return Ef||=new Promise(e=>{let t;try{if(typeof indexedDB>`u`)return e(void 0);t=indexedDB.open(Cf,1)}catch{return e(void 0)}t.onupgradeneeded=()=>{t.result.createObjectStore(wf,{keyPath:`key`}).createIndex(`used`,`used`)},t.onsuccess=()=>{t.result.onversionchange=()=>{t.result.close(),Ef=void 0},e(t.result)},t.onerror=()=>e(void 0),t.onblocked=()=>e(void 0)})}var Of=new Map,kf=!1;function Af(e){return new Promise(t=>{let n=Of.get(e)??[];n.push({resolve:t}),Of.set(e,n),kf||(kf=!0,queueMicrotask(jf))})}typeof performance>`u`||performance.now();async function jf(){kf=!1;let e=new Map(Of);Of.clear();let t=await Df(),n=(t,n)=>{for(let r of e.get(t))r.resolve(n)};if(!t){for(let t of e.keys())n(t,void 0);return}let r;try{r=t.transaction(wf,`readonly`)}catch{for(let t of e.keys())n(t,void 0);return}let i=r.objectStore(wf);for(let t of e.keys()){let e=i.get(t);e.onsuccess=()=>{let r=e.result;n(t,r?{planes:r.planes,duration:r.duration}:void 0),r&&Ff(t)},e.onerror=()=>n(t,void 0)}}var Mf=new Set,Nf=new Map,Pf;function Ff(e){Mf.has(e)||(Mf.add(e),Lf())}function If(e,t){Nf.set(e,t),Mf.add(e),Lf()}function Lf(){Pf??=setTimeout(Rf,400)}async function Rf(){Pf=void 0;let e=new Map(Nf);Nf.clear();let t=[...Mf].filter(t=>!e.has(t));Mf.clear();let n=await Df();if(!n)return;let r;try{r=n.transaction(wf,`readwrite`)}catch{return}let i=r.objectStore(wf),a=Date.now();for(let[t,n]of e)i.put({key:t,used:a,...n});for(let e of t){let t=i.get(e);t.onsuccess=()=>{t.result&&i.put({...t.result,used:a})}}if(r.onerror=()=>void 0,e.size){let e=i.count();e.onsuccess=()=>{let t=e.result-Tf;if(t<=0)return;let n=i.index(`used`).openCursor();n.onsuccess=()=>{let e=n.result;!e||t--<=0||(e.delete(),e.continue())}}}}var zf=(()=>{let e=2166136261;for(let t of`${sf}|${sf===`webgpu`?df.wgsl:ff}|png-sub-2`)e=Math.imul(e^t.charCodeAt(0),16777619);return(e>>>0).toString(36)})(),Bf=0,Vf=new Map;function Hf(e){return Xf(e)}function Uf(e,t=!0){let n=hf(e);return n?Xf(n,!0,t):Xf(e,!1,t)}function Wf(e){let t=hf(e);return Kf(t??e,!!t)}function Gf(e){return Kf(e,!1)}function Kf(e,t){let n=qf(e,t),r=op.get(n);if(r)return r;Vf.has(n)||`${zf}${n}`}var qf=(e,t)=>JSON.stringify([e.width,e.height,e.radius,e.dpr,e.appearance,e.outline,t]),Jf=[`field`,`overlay`];function Yf(e,t,n,r){let i=Object.fromEntries(Jf.map((e,t)=>[e,n[t].slice(1)]));return{field:n[0][0],overlay:n[1][0],duration:r,...t?{capsule:{cap:e.height+2,height:e.height+4,planes:i}}:{}}}function Xf(e,t=!1,n=!0){let r=Bf,i=qf(e,t),a=Vf.get(i);if(a)return a;let o=`${zf}|${i}`,s=(n?Af(o):Promise.resolve(void 0)).then(async i=>{if(r!==Bf)throw Error(`Glass maps cancelled`);if(i)return Yf(e,t,i.planes,i.duration);let{width:a,height:s,pixels:c,duration:l}=await(await cf()).render(e),u=await of(c,a,s,t?Math.round((e.height+2)*uf(e)):void 0);return n&&If(o,{planes:u,duration:l}),Yf(e,t,u,l)}).then(async e=>{if(r!==Bf)throw Error(`Glass maps cancelled`);return await Promise.all(cp(e).map($f)),ap.set(e,performance.now()),Vf.get(i)===s&&op.set(i,e),e}).catch(e=>{throw Vf.delete(i),e});return Vf.set(i,s),up(),s}var Zf=new Map,Qf=e=>Zf.get(e);async function $f(e){if(Zf.has(e)||typeof Image>`u`)return;let t=Bf,n=new Image;n.src=e,await n.decode(),t===Bf&&(Zf.set(e,n),np())}var ep=new Set,tp=()=>[...Zf.values()].reduce((e,t)=>e+t.naturalWidth*t.naturalHeight*4,0);function np(){for(let[e]of Zf){if(tp()<=8*1024**2)break;ep.has(e)||Zf.delete(e)}if(Nd(`decoded-maps`,0,tp()),tp()>8*1024**2)throw Error(`Glass decoded-map budget exceeded`)}function rp(e){ep.clear();for(let t of e)for(let e of cp(t))ep.add(e);np()}function ip(){Bf++,ep.clear(),Zf.clear(),Pd(`decoded-maps`)}var ap=new WeakMap,op=new Map;function sp(e){ap.set(e,performance.now())}var cp=e=>[e.field,e.overlay,...Object.values(e.capsule?.planes??{}).flat()];function lp(e){for(let t of cp(e))xf(t),Zf.delete(t)}function up(){let e=performance.now();for(let[t,n]of op){if(Vf.size<=64)break;e-(ap.get(n)??0)<1e4||(Vf.delete(t),op.delete(t),lp(n))}}function dp(){let e=performance.now();for(let t of op.values())e-(ap.get(t)??0)>=1e4&&lp(t);op.clear(),Vf.clear()}function fp(e,t,n,r,i,a,o){let s=e===0&&t===0?0:n>=0?r-n:e/(e+t)*r,c=e===0&&i===0?0:a>=0?o-a:e/(e+i)*o;return Math.min(s,c)}function pp({topLeftCornerRadius:e,topRightCornerRadius:t,bottomRightCornerRadius:n,bottomLeftCornerRadius:r,width:i,height:a}){if(e===t&&t===n&&n===r&&e>0&&i>0&&a>0){let t=Math.min(i,a)/2,n={radius:Math.min(e,t),roundingAndSmoothingBudget:t};return{topLeft:n,topRight:n,bottomLeft:n,bottomRight:n}}let o=+(t>e)+ +(r>e)+ +(n>e),s=+(e>=t)+ +(r>t)+ +(n>t),c=+(e>=r)+ +(t>=r)+ +(n>r),l=e,u=t,d=r,f=n,p=-1,m=-1,h=-1,g=-1;for(let _=0;_<4;_++){let v=o===_?0:s===_?1:c===_?2:3;v===0?(p=fp(e,u,m,i,d,h,a),l=Math.min(e,p)):v===1?(m=fp(t,l,p,i,f,g,a),u=Math.min(t,m)):v===2?(h=fp(r,f,g,i,l,p,a),d=Math.min(r,h)):(g=fp(n,d,h,i,u,m,a),f=Math.min(n,g))}return{topLeft:{radius:l,roundingAndSmoothingBudget:p},topRight:{radius:u,roundingAndSmoothingBudget:m},bottomLeft:{radius:d,roundingAndSmoothingBudget:h},bottomRight:{radius:f,roundingAndSmoothingBudget:g}}}function mp(e){return e*Math.PI/180}function hp(e){let t=e*1e4,n=Math.round(t),r=t-n;if(r>.4999999||r<-.4999999||!Number.isSafeInteger(n))return e.toFixed(4);let i=e<0,a=i?-n:n,o=a%1e4,s=(a-o)/1e4,c=o<10?`000`:o<100?`00`:o<1e3?`0`:``;return(i?`-`:``)+s+`.`+c+o}var gp={p:0,pathSegment:()=>``};function _p(e,t){return e===0||Number.isNaN(e)?t:t.charCodeAt(0)===45?t.slice(1):`-`+t}function vp(e,t,n,r,i,a){let o=hp(e),s=hp(t),c=hp(n),l=hp(r),u=hp(i),d=hp(a);return{x1:o,x1n:_p(e,o),y1:s,y1n:_p(t,s),x2:c,x2n:_p(n,c),y2:l,y2n:_p(r,l),x3:u,x3n:_p(i,u),y3:d,y3n:_p(a,d)}}function yp(e,t){switch(t){case`TR`:return`c ${e.x1} ${e.y1} ${e.x2} ${e.y2} ${e.x3} ${e.y3}`;case`BR`:return`c ${e.y1n} ${e.x1} ${e.y2n} ${e.x2} ${e.y3n} ${e.x3}`;case`BL`:return`c ${e.x1n} ${e.y1n} ${e.x2n} ${e.y2n} ${e.x3n} ${e.y3n}`;case`TL`:return`c ${e.y1} ${e.x1n} ${e.y2} ${e.x2n} ${e.y3} ${e.x3n}`}}function bp(e,t){switch(t){case`TR`:return`a ${e.radius} ${e.radius} 0 0 1 ${e.d} ${e.d}`;case`BR`:return`a ${e.radius} ${e.radius} 0 0 1 ${e.dn} ${e.d}`;case`BL`:return`a ${e.radius} ${e.radius} 0 0 1 ${e.dn} ${e.dn}`;case`TL`:return`a ${e.radius} ${e.radius} 0 0 1 ${e.d} ${e.dn}`}}var xp=({cornerRadius:e,roundingAndSmoothingBudget:t})=>{let n=Math.min(e,t);if(n<=0)return gp;let r=hp(n),i={radius:r,d:r,dn:_p(n,r)};return{p:n,pathSegment:e=>bp(i,e)}};function Sp({cornerRadius:e,cornerSmoothing:t,preserveSmoothing:n,roundingAndSmoothingBudget:r}){if(e<=0)return{a:0,b:0,c:0,d:0,p:0,arcSectionLength:0,cornerRadius:0};let i=(1+t)*e;if(!n){let n=r/e-1;t=Math.min(t,n),i=Math.min(i,r)}let a=90*(1-t),o=Math.sin(mp(a/2))*e*Math.sqrt(2),s=(90-a)/2,c=e*Math.tan(mp(s/2)),l=45*t,u=c*Math.cos(mp(l)),d=u*Math.tan(mp(l)),f=(i-o-u-d)/3,p=2*f;if(n&&i>r){let e=r-d-o-u,t=e-e/6;f=Math.min(f,t),p=e-f,i=Math.min(i,r)}return{a:p,b:f,c:u,d,p:i,arcSectionLength:o,cornerRadius:e}}var Cp=({cornerRadius:e,smoothing:t,preserveSmoothing:n,roundingAndSmoothingBudget:r})=>{let i=Sp({cornerRadius:e,cornerSmoothing:t,preserveSmoothing:n,roundingAndSmoothingBudget:r});if(i.cornerRadius<=0)return gp;let a=wp(i);return{p:i.p,pathSegment:e=>{switch(e){case`TR`:return`c ${a.a} 0 ${a.ab} 0 ${a.abc} ${a.d} a ${a.r} ${a.r} 0 0 1 ${a.arc} ${a.arc} c ${a.d} ${a.c} ${a.d} ${a.bc} ${a.d} ${a.abc}`;case`BR`:return`c 0 ${a.a} 0 ${a.ab} ${a.dn} ${a.abc} a ${a.r} ${a.r} 0 0 1 ${a.arcn} ${a.arc} c ${a.cn} ${a.d} ${a.bcn} ${a.d} ${a.abcn} ${a.d}`;case`BL`:return`c ${a.an} 0 ${a.abn} 0 ${a.abcn} ${a.dn} a ${a.r} ${a.r} 0 0 1 ${a.arcn} ${a.arcn} c ${a.dn} ${a.cn} ${a.dn} ${a.bcn} ${a.dn} ${a.abcn}`;case`TL`:return`c 0 ${a.an} 0 ${a.abn} ${a.d} ${a.abcn} a ${a.r} ${a.r} 0 0 1 ${a.arc} ${a.arcn} c ${a.c} ${a.dn} ${a.bc} ${a.dn} ${a.abc} ${a.dn}`}}}};function wp({cornerRadius:e,a:t,b:n,c:r,d:i,arcSectionLength:a}){let o=t+n,s=o+r,c=n+r,l=hp(t),u=hp(o),d=hp(s),f=hp(r),p=hp(c),m=hp(i),h=hp(a);return{a:l,an:_p(t,l),ab:u,abn:_p(o,u),abc:d,abcn:_p(s,d),c:f,cn:_p(r,f),bc:p,bcn:_p(c,p),d:m,dn:_p(i,m),r:hp(e),arc:h,arcn:`-`+h}}var Tp=[0,Math.PI/6,Math.PI/3,Math.PI/2],Ep=Tp.map(e=>Math.sin(e)),Dp=Tp.map(e=>Math.cos(e)),Op=[(Tp[0]+Tp[1])/2,(Tp[1]+Tp[2])/2,(Tp[2]+Tp[3])/2],kp=Op.map(e=>Math.sin(e)),Ap=Op.map(e=>Math.cos(e)),jp=({cornerRadius:e,exponent:t,roundingAndSmoothingBudget:n})=>{let r=Math.min(e,n);if(r<=0)return gp;let i=Number.isFinite(t)?Math.max(2,t):4,a=2/i,o=i===2?e=>e:i===4?Math.sqrt:i===8?e=>Math.sqrt(Math.sqrt(e)):e=>e**+a,s=a-1,c=i===2?()=>1:i===4?e=>1/Math.sqrt(e):e=>e**+s,l=Tp.map((e,t)=>t===0?[0,0]:t===Tp.length-1?[r,r]:[r*o(Ep[t]),r*(1-o(Dp[t]))]),u=Tp.map((e,t)=>{if(t===0)return[1,0];if(t===Tp.length-1)return[0,1];let n=a*c(Ep[t])*Dp[t]*r,i=a*c(Dp[t])*Ep[t]*r,o=Math.sqrt(n*n+i*i)||1;return[n/o,i/o]}),d=[];for(let e=0;e<Tp.length-1;e++){let[t,n]=l[e],[i,a]=l[e+1],[s,c]=u[e],[f,p]=u[e+1],m=r*o(kp[e]),h=r*(1-o(Ap[e])),g=8/3*(m-(t+i)/2),_=8/3*(h-(n+a)/2),v=f*c-p*s,y=v===0?0:(-p*g+f*_)/v,b=v===0?0:(s*_-c*g)/v,x=t+y*s,S=n+y*c,C=i-b*f,w=a-b*p,T=x-t,E=S-n,D=C-t,O=w-n,k=i-t,A=a-n;d.push(vp(T,E,D,O,k,A))}return{p:r,pathSegment:e=>{let t=yp(d[0],e);for(let n=1;n<d.length;n++)t+=` `+yp(d[n],e);return t}}};function Mp(e,t,n,r){if(r<=0)return{x:0,y:0,theta:e};let i=r/32,a=0,o=0;for(let r=1;r<=32;r++){let s=(r-1)*i,c=s+i,l=(s+c)/2,u=e+t*s+n/2*s*s,d=e+t*c+n/2*c*c,f=e+t*l+n/2*l*l;a+=i/6*(Math.cos(u)+4*Math.cos(f)+Math.cos(d)),o+=i/6*(Math.sin(u)+4*Math.sin(f)+Math.sin(d))}let s=e+t*r+n/2*r*r;return{x:a,y:o,theta:s}}var Np=1e-6,Pp={arc:xp,squircle:Cp,superellipse:jp,clothoid:({cornerRadius:e,smoothing:t,roundingAndSmoothingBudget:n})=>{if(e<=0)return gp;let r=Math.max(0,Math.min(1,t)),i=e,a=Math.PI/4*r,o=Math.PI/2*i*r,s=o>0?1/(i*o):0,{x:c,y:l}=o>0?Mp(0,0,s,o):{x:0,y:0},{x:u,y:d}=o>0?Mp(0,0,s,o/2):{x:0,y:0},f=c-i*Math.sin(a)+(l+i*Math.cos(a)),p=f,m=i,h=c,g=l,_=u,v=d;if(f>n&&f>0){let e=n/f;p=n,m=i*e,h=c*e,g=l*e,_=u*e,v=d*e}if(p<=0)return gp;let y=Math.cos(a),b=Math.sin(a),x=0,S=0;o>0&&(b>1e-12&&(S=8/3*(g/2-v)/b),x=8/3*(_-h/2)+S*y);let C=Math.PI/2-2*a,w=Math.abs(C)>Np,T=o>0?{head:vp(x,0,h-S*y,g-S*b,h,g),tail:vp(S*b,S*y,g,h-x,g,h)}:null,E=null;if(w){let e=p-h-g,t=hp(e);E={radius:hp(m),d:t,dn:_p(e,t)}}return{p,pathSegment:e=>{if(T===null)return E===null?``:bp(E,e);let t=yp(T.head,e),n=yp(T.tail,e);return E===null?t+` `+n:t+` `+bp(E,e)+` `+n}}}};Object.keys(Pp);function Fp(e){return Pp[e]}var Ip=new Map,Lp=null;function Rp(e,t){return e+`|`+t.cornerRadius+`|`+t.smoothing+`|`+t.exponent+`|`+ +!!t.preserveSmoothing+`|`+t.roundingAndSmoothingBudget}function zp(e){return!Number.isFinite(e.cornerRadius)||!Number.isFinite(e.smoothing)||!Number.isFinite(e.exponent)||!Number.isFinite(e.roundingAndSmoothingBudget)}function Bp(e){let t={};return{p:e.p,pathSegment:n=>{let r=t[n];if(r!==void 0)return r;let i=e.pathSegment(n);return t[n]=i,i}}}function Vp(e,t,n){if(zp(n))return t(n);let r=Rp(e,n),i=Ip.get(r);if(i)return r!==Lp&&(Ip.delete(r),Ip.set(r,i),Lp=r),i;let a=Bp(t(n));return Ip.size>=64&&Ip.delete(Ip.keys().next().value),Ip.set(r,a),Lp=r,a}function Hp(e,t,n,r){let i=Sp({cornerRadius:e,cornerSmoothing:Math.min(t,r/e-1),preserveSmoothing:n,roundingAndSmoothingBudget:r}),a=i.a+i.b+i.c;return{p:i.p,a:i.a,b:i.b,c:i.c,d:i.d,e:a,ax:i.p-a,ay:e-i.d,R:e}}function Up({a:e,b:t,c:n,d:r,e:i,ax:a,ay:o,R:s}){let c=e+t,l=t+n,u=hp(e),d=hp(c),f=hp(i),p=hp(n),m=hp(l),h=hp(r),g=hp(a),_=hp(o);return{a:u,an:_p(e,u),ab:d,abn:_p(c,d),e:f,en:_p(i,f),c:p,cn:_p(n,p),bc:m,bcn:_p(l,m),d:h,dn:_p(r,h),r:hp(s),ax:g,axn:_p(a,g),ay:_,ayn:_p(o,_)}}function Wp(e){let t=Up(e);return`c ${t.a} 0 ${t.ab} 0 ${t.e} ${t.d} a ${t.r} ${t.r} 0 0 1 ${t.ax} ${t.ay} a ${t.r} ${t.r} 0 0 1 ${t.axn} ${t.ay} c ${t.cn} ${t.d} ${t.bcn} ${t.d} ${t.en} ${t.d}`}function Gp(e){let t=Up(e);return`c ${t.an} 0 ${t.abn} 0 ${t.en} ${t.dn} a ${t.r} ${t.r} 0 0 1 ${t.axn} ${t.ayn} a ${t.r} ${t.r} 0 0 1 ${t.ax} ${t.ayn} c ${t.c} ${t.dn} ${t.bc} ${t.dn} ${t.e} ${t.dn}`}function Kp(e){let t=Up(e);return`c 0 ${t.an} 0 ${t.abn} ${t.d} ${t.en} a ${t.r} ${t.r} 0 0 1 ${t.ay} ${t.axn} a ${t.r} ${t.r} 0 0 1 ${t.ay} ${t.ax} c ${t.d} ${t.c} ${t.d} ${t.bc} ${t.d} ${t.e}`}function qp(e){let t=Up(e);return`c 0 ${t.a} 0 ${t.ab} ${t.dn} ${t.e} a ${t.r} ${t.r} 0 0 1 ${t.ayn} ${t.ax} a ${t.r} ${t.r} 0 0 1 ${t.ayn} ${t.axn} c ${t.dn} ${t.cn} ${t.dn} ${t.bcn} ${t.dn} ${t.en}`}function Jp(e,t,n,r){let i=Sp({cornerRadius:e,cornerSmoothing:t,preserveSmoothing:n,roundingAndSmoothingBudget:r}),a=mp(45*t);return{a:i.a,b:i.b,p:i.p,sin:Math.sin(a),cos:Math.cos(a)}}var Yp=(e,t,n)=>Math.max(0,Math.min(e/t-1,n)),Xp=e=>hp(Object.is(e,-0)?0:e);function Zp(e,t,n,r,i){let a=Jp(n,Yp(e/2,n,r),i,e/2),o=Jp(n,Yp(t/2,n,r),i,t/2),s=(e,t,r,i,s,c)=>{let l=i===0?a:o,u=c===0?a:o,d=e+(r+s)*n,f=t+(i+c)*n,p=d-s*n*l.cos-r*n*l.sin,m=f-c*n*l.cos-i*n*l.sin,h=d-r*n*u.cos-s*n*u.sin,g=f-i*n*u.cos-c*n*u.sin,_=e+r*l.p,v=t+i*l.p,y=Math.hypot(h-p,g-m)>1e-6,b=y?h:p,x=y?g:m,S=e+s*u.p,C=t+c*u.p,w=`L ${Xp(_)} ${Xp(v)} `;return w+=`c ${Xp(-r*l.a)} ${Xp(-i*l.a)} ${Xp(-r*(l.a+l.b))} ${Xp(-i*(l.a+l.b))} ${Xp(p-_)} ${Xp(m-v)} `,y&&(w+=`a ${Xp(n)} ${Xp(n)} 0 0 1 ${Xp(h-p)} ${Xp(g-m)} `),w+=`c ${Xp(S-s*(u.a+u.b)-b)} ${Xp(C-c*(u.a+u.b)-x)} ${Xp(S-s*u.a-b)} ${Xp(C-c*u.a-x)} ${Xp(S-b)} ${Xp(C-x)}`,w},c=s(e,0,-1,0,0,1),l=s(e,t,0,-1,-1,0),u=s(0,t,1,0,0,-1),d=s(0,0,0,1,1,0);return`M ${Xp(a.p)} 0 ${c} ${l} ${u} ${d} Z`}var Qp=hp;function $p(e){return{radius:e.radius,curve:e.curve??`squircle`,smoothing:e.smoothing??.65,exponent:e.exponent??4,preserveSmoothing:e.preserveSmoothing??!0}}function em(e){return $p(typeof e==`number`?{radius:e}:e??{radius:0})}function tm(e){if(`radius`in e){let t=$p(e);return{topLeft:t,topRight:t,bottomRight:t,bottomLeft:t}}return{topLeft:em(e.topLeft),topRight:em(e.topRight),bottomRight:em(e.bottomRight),bottomLeft:em(e.bottomLeft)}}function nm(e){return e.length>0?` `+e:``}function rm(e,t){let n=Fp(e.curve);return Vp(e.curve,n,{cornerRadius:t.radius,smoothing:e.smoothing,exponent:e.exponent,preserveSmoothing:e.preserveSmoothing,roundingAndSmoothingBudget:t.roundingAndSmoothingBudget})}var im=1e-9;function am(e,t,n,r,i){return e.curve===`squircle`&&t.curve===`squircle`&&Math.abs(n.radius-i)<im&&Math.abs(r.radius-i)<im&&e.smoothing===t.smoothing&&e.preserveSmoothing===t.preserveSmoothing}function om(e,t,n,r){return(e===n||e.curve===n.curve&&e.smoothing===n.smoothing&&e.exponent===n.exponent&&e.preserveSmoothing===n.preserveSmoothing)&&(t===r||t.radius===r.radius&&t.roundingAndSmoothingBudget===r.roundingAndSmoothingBudget)}function sm(e,t,n){if(e<=0||t<=0)return`M 0 0 H 0 V 0 H 0 Z`;let r=tm(n);if(r.topLeft.radius<=0&&r.topRight.radius<=0&&r.bottomRight.radius<=0&&r.bottomLeft.radius<=0)return`M 0 0 H ${e} V ${t} H 0 Z`;let i=pp({topLeftCornerRadius:r.topLeft.radius,topRightCornerRadius:r.topRight.radius,bottomRightCornerRadius:r.bottomRight.radius,bottomLeftCornerRadius:r.bottomLeft.radius,width:e,height:t}),a=r.topLeft;if(cm(r)){let n=Math.min(a.radius,e/2,t/2),r=Math.min(e,t)/2,i=1e-9;if(n>0&&r>n+i&&r<(1+a.smoothing)*n-i)return Zp(e,t,n,a.smoothing,a.preserveSmoothing)}let o=e>=t,s=o?t/2:e/2;if(o){let n=am(r.topRight,r.bottomRight,i.topRight,i.bottomRight,s),a=am(r.topLeft,r.bottomLeft,i.topLeft,i.bottomLeft,s);if(n||a){let o=e/2,c=n?Hp(s,r.topRight.smoothing,r.topRight.preserveSmoothing,o):null,l=a?Hp(s,r.topLeft.smoothing,r.topLeft.preserveSmoothing,o):null,u=l?null:rm(r.topLeft,i.topLeft),d=c?null:rm(r.topRight,i.topRight),f=c?null:rm(r.bottomRight,i.bottomRight),p=l?null:rm(r.bottomLeft,i.bottomLeft),m=`M `+Qp(l?l.p:u.p)+` 0`;return m+=` L `+Qp(e-(c?c.p:d.p))+` 0`,c?m+=` `+Wp(c):(m+=nm(d.pathSegment(`TR`)),m+=` L `+Qp(e)+` `+Qp(f.p),m+=` L `+Qp(e)+` `+Qp(t-f.p),m+=nm(f.pathSegment(`BR`))),l?(m+=` L `+Qp(l.p)+` `+Qp(t),m+=` `+Gp(l)):(m+=` L `+Qp(e-p.p)+` `+Qp(t),m+=` L `+Qp(p.p)+` `+Qp(t),m+=nm(p.pathSegment(`BL`)),m+=` L 0 `+Qp(t-u.p),m+=` L 0 `+Qp(u.p),m+=nm(u.pathSegment(`TL`))),m+` Z`}}else{let n=am(r.topLeft,r.topRight,i.topLeft,i.topRight,s),a=am(r.bottomLeft,r.bottomRight,i.bottomLeft,i.bottomRight,s);if(n||a){let o=t/2,c=n?Hp(s,r.topLeft.smoothing,r.topLeft.preserveSmoothing,o):null,l=a?Hp(s,r.bottomLeft.smoothing,r.bottomLeft.preserveSmoothing,o):null,u=c?null:rm(r.topLeft,i.topLeft),d=c?null:rm(r.topRight,i.topRight),f=l?null:rm(r.bottomRight,i.bottomRight),p=l?null:rm(r.bottomLeft,i.bottomLeft),m;return c?m=`M 0 `+Qp(c.p)+` `+Kp(c):(m=`M `+Qp(u.p)+` 0`,m+=` L `+Qp(e-d.p)+` 0`,m+=nm(d.pathSegment(`TR`))),m+=` L `+Qp(e)+` `+Qp(t-(l?l.p:f.p)),l?m+=` `+qp(l):(m+=nm(f.pathSegment(`BR`)),m+=` L `+Qp(p.p)+` `+Qp(t),m+=nm(p.pathSegment(`BL`))),c?m+=` L 0 `+Qp(c.p):(m+=` L 0 `+Qp(t-u.p),m+=` L 0 `+Qp(u.p),m+=nm(u.pathSegment(`TL`))),m+` Z`}}let c=rm(r.topLeft,i.topLeft),l=om(r.topLeft,i.topLeft,r.topRight,i.topRight)&&om(r.topLeft,i.topLeft,r.bottomRight,i.bottomRight)&&om(r.topLeft,i.topLeft,r.bottomLeft,i.bottomLeft),u=l?c:rm(r.topRight,i.topRight),d=l?c:rm(r.bottomRight,i.bottomRight),f=l?c:rm(r.bottomLeft,i.bottomLeft);return`M `+Qp(c.p)+` 0 L `+Qp(e-u.p)+` 0`+nm(u.pathSegment(`TR`))+` L `+Qp(e)+` `+Qp(d.p)+` L `+Qp(e)+` `+Qp(t-d.p)+nm(d.pathSegment(`BR`))+` L `+Qp(e-f.p)+` `+Qp(t)+` L `+Qp(f.p)+` `+Qp(t)+nm(f.pathSegment(`BL`))+` L 0 `+Qp(t-c.p)+` L 0 `+Qp(c.p)+nm(c.pathSegment(`TL`))+` Z`}function cm(e){let t=e.topLeft,n=e.topRight,r=e.bottomRight,i=e.bottomLeft;return t.curve===`squircle`&&n.curve===`squircle`&&n.radius===t.radius&&n.smoothing===t.smoothing&&n.preserveSmoothing===t.preserveSmoothing&&r.curve===`squircle`&&r.radius===t.radius&&r.smoothing===t.smoothing&&r.preserveSmoothing===t.preserveSmoothing&&i.curve===`squircle`&&i.radius===t.radius&&i.smoothing===t.smoothing&&i.preserveSmoothing===t.preserveSmoothing}function lm(e,t,n){return`path("${sm(e,t,n)}")`}function um(e,t=window.getComputedStyle(e)){let n=e=>e.endsWith(`px`)?parseFloat(e):NaN,r=n(t.width),i=n(t.height);if(Number.isNaN(r)||Number.isNaN(i))return{width:e.offsetWidth,height:e.offsetHeight};if(t.boxSizing===`border-box`)return{width:r,height:i};let a=(parseFloat(t.paddingLeft)||0)+(parseFloat(t.paddingRight)||0),o=(parseFloat(t.paddingTop)||0)+(parseFloat(t.paddingBottom)||0),s=(parseFloat(t.borderLeftWidth)||0)+(parseFloat(t.borderRightWidth)||0),c=(parseFloat(t.borderTopWidth)||0)+(parseFloat(t.borderBottomWidth)||0);return{width:r+a+s,height:i+o+c}}function dm(e){if(typeof e!=`number`&&e!==`capsule`&&e!==`circle`)throw RangeError(`Unknown glass radius.`);if(typeof e==`number`&&(!Number.isFinite(e)||e<0))throw RangeError(`Corner radius must be finite and nonnegative.`);return{radius:typeof e==`number`?e:2**53-1,smoothing:.8125,preserveSmoothing:!0,curve:e===`circle`?`arc`:`squircle`}}var fm=new Map;function pm(e,t){let n=fm.get(e);return n===void 0&&(n=t(),fm.size>=1024&&fm.delete(fm.keys().next().value),fm.set(e,n)),n}function mm(e,t,n){return pm(`p|${e}|${t}|${n}`,()=>sm(e,t,dm(n)))}function hm(e,t,n){return pm(`c|${e}|${t}|${n}`,()=>lm(e,t,dm(n)))}function gm(e,t,n){let r=mm(e,t,n).match(/[a-zA-Z]|[-+]?(?:\d*\.)?\d+(?:e[-+]?\d+)?/g),i=[],a=0,o=[0,0],s=[0,0],c=()=>Number(r[a++]),l=()=>[c(),c()],u=e=>{i.push(e),o=e};for(;a<r.length;){let e=r[a++];if(e===`M`)u(l()),s=o;else if(e===`L`)u(l());else if(e===`H`)u([c(),o[1]]);else if(e===`V`)u([o[0],c()]);else if(e===`c`){let e=o,t=l(),n=l(),r=l();for(let i=1;i<=32;i++){let a=i/32,o=1-a;u([e[0]+3*o*o*a*t[0]+3*o*a*a*n[0]+a*a*a*r[0],e[1]+3*o*o*a*t[1]+3*o*a*a*n[1]+a*a*a*r[1]])}}else if(e===`a`){let e=c(),t=c(),n=c(),r=c(),i=c(),a=l();if(e!==t||n!==0||r!==0||i!==1)throw Error(`Unsupported Lisse arc geometry.`);let s=o,d=Math.hypot(...a);if(d<1e-8)continue;let f=Math.sqrt(Math.max(0,e*e-d*d/4)),p=[s[0]+a[0]/2-a[1]/d*f,s[1]+a[1]/2+a[0]/d*f],m=Math.atan2(s[1]-p[1],s[0]-p[0]),h=2*Math.asin(Math.min(1,d/(2*e)));for(let t=1;t<=32;t++){let n=m+h*t/32;u([p[0]+e*Math.cos(n),p[1]+e*Math.sin(n)])}}else if(e===`Z`)u(s);else throw Error(`Unsupported Lisse path command: ${e}`)}return i}function _m(e,t,n){let r=gm(e,t,n);for(let n of r){for(let t of[0,e])Math.abs(n[0]-t)<2e-4&&(n[0]=t);for(let e of[0,t])Math.abs(n[1]-e)<2e-4&&(n[1]=e);Math.abs(n[0]-e/2)<2e-4&&(n[0]=e/2),Math.abs(n[1]-t/2)<2e-4&&(n[1]=t/2)}let i=[];for(let n=1;n<r.length;n++){let a=r[n-1],o=r[n],s=o[0]-a[0],c=o[1]-a[1],l=0,u=1;for(let[n,r,i,o]of[[a[0],s,e/2,1],[a[1],c,t/2,-1]])if(Math.abs(r)<1e-8)(n-i)*o<-1e-6&&(u=-1);else{let e=(i-n)/r;r*o>0?l=Math.max(l,e):u=Math.min(u,e)}u<=l||Math.hypot(s,c)*(u-l)<1e-6||i.push([a[0]+s*l,a[1]+c*l,a[0]+s*u,a[1]+c*u])}let a=i.length;if(a>128||!a)throw RangeError(`Lisse outline exceeds the GPU segment budget.`);return{segments:i,count:a}}function vm(e,t){if(!Number.isFinite(t)||t<0)throw RangeError(`Shape inset must be finite and nonnegative.`);if(e.outline&&!e.outline.length)return[];let n=e.outline?[...e.outline,e.outline[0]]:gm(e.width,e.height,e.radius),r=[[0,0],[e.width,0],[e.width,e.height],[0,e.height]];for(let e=1;e<n.length;e++){let i=n[e-1],a=n[e],o=a[0]-i[0],s=a[1]-i[1],c=Math.hypot(o,s);if(!(c<2e-4)&&(r=ym(r,-s/c,o/c,(-s*i[0]+o*i[1])/c+t),!r.length))break}return r}function ym(e,t,n,r){let i=[];for(let a=0;a<e.length;a++){let o=e[a],s=e[(a+1)%e.length],c=o[0]*t+o[1]*n-r,l=s[0]*t+s[1]*n-r;if(c>=-1e-7&&i.push(o),c<0!=l<0){let e=c/(c-l);i.push([o[0]+(s[0]-o[0])*e,o[1]+(s[1]-o[1])*e])}}return i}function bm(e,t,n=8){let r=gm(t.width,t.height,n).map(([e,n])=>[e+t.x,n+t.y]);for(let t=0;t<e.length;t++){let n=e[t],i=e[(t+1)%e.length],a=i[0]-n[0],o=i[1]-n[1],s=Math.hypot(a,o);s<1e-7||(r=ym(r,-o/s,a/s,(-o*n[0]+a*n[1])/s))}return r.map(([e,n])=>[Math.round((e-t.x)*1e4)/1e4,Math.round((n-t.y)*1e4)/1e4])}function xm(e){return e.length?`polygon(${e.map(([e,t])=>`${e.toFixed(3)}px ${t.toFixed(3)}px`).join(`,`)})`:`polygon(0px 0px,0px 0px,0px 0px)`}function Sm(e){let t=[];for(let n=0;n<e.length;n++){let r=e[n],i=e[(n+1)%e.length];if(![...r,...i].every(Number.isFinite))throw RangeError(`Outline coordinates must be finite.`);Math.hypot(i[0]-r[0],i[1]-r[1])>1e-5&&t.push([...r,...i])}let n=t.length;if(n<3||n>1024)throw RangeError(`A glass outline needs between 3 and 1024 edges.`);return{segments:t,count:n}}var Cm=[`pointerdown`,`pointerup`,`pointercancel`,`pointermove`,`pointerenter`,`pointerleave`,`keydown`,`keyup`,`focusin`,`focusout`],wm=[`transitionrun`,`transitionstart`,`transitionend`,`transitioncancel`,`animationstart`,`animationiteration`,`animationend`,`animationcancel`],Tm=class{view;raf=0;pending=new Set;constructor(e){this.view=e}schedule(e){e.disposed||(this.pending.add(e),this.raf||=this.view.requestAnimationFrame(e=>this.frame(e)))}frame(e){this.raf=0;let t=[...this.pending];this.pending.clear();let n=[];for(let r of t){if(r.disposed)continue;let t;try{t=r.step(e)}catch(e){queueMicrotask(()=>{throw e});continue}let i=typeof t==`boolean`?t:t.active;typeof t!=`boolean`&&t.write&&n.push(t.write),r.idle=i?0:r.idle+1,r.idle<3&&this.schedule(r)}for(let e of n)try{e()}catch(e){queueMicrotask(()=>{throw e})}}},Em=new WeakMap;function Dm(e,t){let{root:n,ignore:r,onMutation:i}=t,a=(n.ownerDocument??n).defaultView??window,o=Em.get(a)??(()=>{let e=new Tm(a);return Em.set(a,e),e})(),s={step:e,idle:0,disposed:!1},c=()=>o.schedule(s),l=typeof ResizeObserver==`function`?new ResizeObserver(c):void 0,u=typeof MutationObserver==`function`?new MutationObserver(e=>{(!r||e.some(e=>!r(e.target)))&&(i?.(),c())}):void 0;u?.observe(n,{subtree:!0,attributes:!0,childList:!0,characterData:!1});let d=n;for(let e of[...Cm,...wm])d.addEventListener(e,c,{capture:!0,passive:!0});a.addEventListener(`scroll`,c,{capture:!0,passive:!0}),a.addEventListener(`resize`,c,{passive:!0}),a.document.addEventListener(`visibilitychange`,c);let f=a.setInterval(c,t.heartbeat??1e3);return c(),{wake:c,observe(e){l?.observe(e)},unobserve(e){l?.unobserve(e)},dispose(){s.disposed=!0,l?.disconnect(),u?.disconnect();for(let e of[...Cm,...wm])d.removeEventListener(e,c,{capture:!0});a.removeEventListener(`scroll`,c,{capture:!0}),a.removeEventListener(`resize`,c),a.document.removeEventListener(`visibilitychange`,c),a.clearInterval(f)}}}function Om(e){return dm(e),{"data-lg-container":``,"data-lg-container-radius":String(e)}}function km(e,t){let n=Om(t),r=Object.keys(n).map(t=>[t,e.getAttribute(t)]);for(let[t,r]of Object.entries(n))e.getAttribute(t)!==r&&e.setAttribute(t,r);let i=!1;return()=>{if(!i){i=!0;for(let[t,n]of r)n===null?e.removeAttribute(t):e.setAttribute(t,n)}}}var Am=new WeakMap;function jm(e,t){t?Am.set(e,t):Am.delete(e)}function Mm(e){let t=e.getAttribute(`data-lg-container-radius`);if(t===null)throw Error(`Declare the container with GlassShapeContainer, GlassShape, GlassSurface, or registerShapeContainer.`);let{width:n,height:r}=um(e);return{width:n,height:r,radius:t===`circle`||t===`capsule`?t:Number(t),outline:Am.get(e)}}function Nm(e,t){if(t)return t();let n=e.parentElement?.closest(`[data-lg-container]`);if(!n&&e.isConnected)throw Error(`Container-relative geometry requires a declared shape container.`);return n??null}function Pm(e,t,n){let r=``,i=[];return()=>{let a=Nm(e);if(!a)return;let o=Mm(a),s=um(e),c=a.getBoundingClientRect(),l=e.getBoundingClientRect();if(!o.width||!o.height||!c.width||!c.height||!s.width||!s.height)return;let u={x:(l.left-c.left)*o.width/c.width,y:(l.top-c.top)*o.height/c.height,width:s.width,height:s.height},d=JSON.stringify([o,u,t,n]),f=t??Math.max(0,Math.min(u.x,u.y,o.width-u.x-u.width,o.height-u.y-u.height));return d!==r&&(i=bm(vm(o,f),u,n),r=d),i}}var Fm;function Im(e){return e===`none`||e===`reduced`?e:typeof matchMedia==`function`?(Fm??=matchMedia(`(prefers-reduced-motion: reduce)`),Fm.matches?`reduced`:`full`):`full`}var Lm=new WeakSet,Rm=`(hover: hover) and (pointer: fine)`;function zm(e){return e.matches(`:disabled, [data-disabled], [aria-disabled='true']`)}function Bm(e,t){let n=e.ownerDocument.defaultView,r={translate:e.style.translate,scale:e.style.scale},i=new fd(0,dd.track),a=new fd(0,dd.track),o=new fd(0,dd.press),s=new fd(0,dd.glow),c=null,l=!1,u=!1,d=0,f=!1,p=0,m=0,h=0,g=0,_=(t,n)=>{e.style.getPropertyValue(t)!==n&&e.style.setProperty(t,n)},v=()=>({width:e.offsetWidth||1,height:e.offsetHeight||1}),y=()=>{let t=e.getBoundingClientRect(),{width:n,height:r}=v();return{cx:t.left+t.width/2-i.value,cy:t.top+t.height/2-a.value,width:n,height:r,rect:t,ratioX:n/(t.width||1),ratioY:r/(t.height||1)}},b=(e,t)=>{let{rect:n,ratioX:r,ratioY:i}=y();p=(e-n.left)*r,m=(t-n.top)*i},x=(e,t,n)=>{e.configure(n).target=t};function S(e){c&&e.pointerId===c.id&&(c.clientX=e.clientX,c.clientY=e.clientY)}function C(e){(!e||c&&e.pointerId===c.id)&&(c=null,n.removeEventListener(`pointermove`,S),n.removeEventListener(`pointerup`,C),n.removeEventListener(`pointercancel`,C),x(o,0,dd.release),x(i,0,dd.release),x(a,0,dd.release),x(s,u?.35:0,dd.glow))}function w(t){if(Lm.has(t)||t.button!==0||zm(e))return;Lm.add(t);let{cx:r,cy:l}=y();c={id:t.pointerId,x:t.clientX,y:t.clientY,cx:r,cy:l,clientX:t.clientX,clientY:t.clientY,lastX:r,lastY:l},h=g=0,b(t.clientX,t.clientY),x(o,1,dd.press),x(s,1,dd.press);let{width:u,height:d}=v(),f={duration:dd.track.duration+5e-4*Math.max(u,d),bounce:0};x(i,0,f),x(a,0,f),n.addEventListener(`pointermove`,S),n.addEventListener(`pointerup`,C),n.addEventListener(`pointercancel`,C)}function T(e){e.pointerType!==`touch`&&n.matchMedia(Rm).matches&&(u=e.type!==`pointerleave`,u&&b(e.clientX,e.clientY),!c&&!l&&x(s,u?.35:0,dd.glow))}function E(t){if(t.key===` `||t.key===`Enter`){if(t.type===`keydown`){if(t.repeat||Lm.has(t)||zm(e)||c)return;Lm.add(t),l=!0;let{width:n,height:r}=v();p=n/2,m=r/2,x(o,1,dd.press),x(s,1,dd.press)}else l&&(l=!1,x(o,0,dd.release),x(s,u?.35:0,dd.glow))}}function D(e){if(!c)return;let t=e.target;(t?.nodeType===1?t:t?.parentElement)?.closest(`[draggable="true"]`)||e.preventDefault()}let O=()=>{l&&(l=!1,x(o,0,dd.release),x(s,0,dd.glow))};return e.addEventListener(`pointerdown`,w),e.addEventListener(`dragstart`,D),e.addEventListener(`pointerenter`,T),e.addEventListener(`pointermove`,T),e.addEventListener(`pointerleave`,T),e.addEventListener(`keydown`,E),e.addEventListener(`keyup`,E),e.addEventListener(`focusout`,O),{frame(n,u){if(u)return d=n,!0;let x=d?Math.max(0,(n-d)/1e3):1/60;d=n;let S=t(),{width:C,height:w}=v();if(c){let{cx:e,cy:t}=y(),n=Math.max(C,w)<=72,r=n?c.clientX-c.x-(e-c.cx):c.clientX-Math.max(e-C/2,Math.min(e+C/2,c.clientX)),o=n?c.clientY-c.y-(t-c.cy):c.clientY-Math.max(t-w/2,Math.min(t+w/2,c.clientY)),s=n?4+.15*Math.max(C,w):Math.min(10,3+.04*Math.max(C,w));i.target=md(r,s),a.target=md(o,s),b(c.clientX,c.clientY),h+=((e-c.lastX)/x-h)*Math.min(1,x*12),g+=((t-c.lastY)/x-g)*Math.min(1,x*12),c.lastX=e,c.lastY=t}else h*=Math.exp(-x*10),g*=Math.exp(-x*10);for(let e of[i,a,o,s])e.step(x);let T=S===`full`,E=T?Math.min(.16,8/Math.max(C,w))*o.value:0,D=Math.max(C,w)<=72?.2:.12,O=T?Math.min(D,.5*Math.abs(i.value)/C+7e-5*Math.abs(i.velocity)+5e-5*Math.abs(h)):0,k=T?Math.min(D,.5*Math.abs(a.value)/w+7e-5*Math.abs(a.velocity)+5e-5*Math.abs(g)):0,A=(1+E)*(1+O)/Math.sqrt(1+k),j=(1+E)*(1+k)/Math.sqrt(1+O),M=T&&(Math.abs(i.value)>.01||Math.abs(a.value)>.01),N=Math.abs(A-1)>1e-4||Math.abs(j-1)>1e-4,P=s.value>.001;if(M||N||P||c||l)f=!0,_(`translate`,M?`${i.value.toFixed(3)}px ${a.value.toFixed(3)}px`:r.translate),_(`scale`,N?`${A.toFixed(5)} ${j.toFixed(5)}`:r.scale),_(`--lg-glow`,P?s.value.toFixed(4):`0`),_(`--lg-glow-x`,`${p.toFixed(2)}px`),_(`--lg-glow-y`,`${m.toFixed(2)}px`),_(`--lg-glow-size`,`${Math.max(36,Math.min(180,Math.max(C,w)*.9)).toFixed(1)}px`),c||l?e.dataset.glassPressed!==``&&(e.dataset.glassPressed=``):e.dataset.glassPressed!==void 0&&delete e.dataset.glassPressed;else if(f){f=!1,e.style.translate=r.translate,e.style.scale=r.scale;for(let t of[`--lg-glow`,`--lg-glow-x`,`--lg-glow-y`,`--lg-glow-size`])e.style.removeProperty(t);delete e.dataset.glassPressed}let F=!!c||[i,a,o,s].some(e=>!e.settled);return F||(d=0),F},dispose(){C(),e.removeEventListener(`pointerdown`,w),e.removeEventListener(`dragstart`,D),e.removeEventListener(`pointerenter`,T),e.removeEventListener(`pointermove`,T),e.removeEventListener(`pointerleave`,T),e.removeEventListener(`keydown`,E),e.removeEventListener(`keyup`,E),e.removeEventListener(`focusout`,O),e.style.translate=r.translate,e.style.scale=r.scale;for(let t of[`--lg-glow`,`--lg-glow-x`,`--lg-glow-y`,`--lg-glow-size`])e.style.removeProperty(t);delete e.dataset.glassPressed}}}function Vm(e,t,n){let r=Math.max(0,Math.min(n.radius,n.width/2,n.height/2)),i=Math.abs(e-(n.x+n.width/2))-(n.width/2-r),a=Math.abs(t-(n.y+n.height/2))-(n.height/2-r);return Math.hypot(Math.max(i,0),Math.max(a,0))+Math.min(Math.max(i,a),0)-r}function Hm(e,t,n){if(n<=0)return Math.min(e,t);let r=Math.max(n-Math.abs(e-t),0)/n;return Math.min(e,t)-r*r*n*.25}function Um(e){let t=0;for(let n=0;n<e.length;n++){let r=e[n],i=e[(n+1)%e.length];t+=r[0]*i[1]-i[0]*r[1]}return t}function Wm(e,t){if(e.length<4)return e;let n=new Uint8Array(e.length);n[0]=n[e.length-1]=1;let r=[[0,e.length-1]];for(;r.length;){let[i,a]=r.pop(),[o,s]=e[i],[c,l]=e[a],u=Math.hypot(c-o,l-s)||1,d=-1,f=-1;for(let t=i+1;t<a;t++){let[n,r]=e[t],i=Math.abs((c-o)*(s-r)-(o-n)*(l-s))/u;i>d&&(d=i,f=t)}d>t&&(n[f]=1,r.push([i,f],[f,a]))}return e.filter((e,t)=>n[t])}function Gm(e,t){let[n,r]=e[0],i=0,a=-1;e.forEach(([e,t],o)=>{let s=Math.hypot(e-n,t-r);s>a&&(a=s,i=o)});let o=Wm(e.slice(0,i+1),t),s=Wm([...e.slice(i),e[0]],t);return[...o,...s.slice(1,-1)]}function Km(e,t,n=1,r=1e3){if(!e.length)return[];let i=t/2+2*n,a=Math.min(...e.map(e=>e.x))-i,o=Math.min(...e.map(e=>e.y))-i,s=Math.max(...e.map(e=>e.x+e.width))+i,c=Math.max(...e.map(e=>e.y+e.height))+i,l=Math.ceil((s-a)/n)+1,u=Math.ceil((c-o)/n)+1,d=new Float64Array(l*u);for(let r=0;r<u;r++)for(let i=0;i<l;i++){let s=a+i*n,c=o+r*n,u=1/0;for(let n of e)u=u===1/0?Vm(s,c,n):Hm(u,Vm(s,c,n),t);d[r*l+i]=u}let f=new Map,p=(e,t,r,i)=>{let s=e===r?(t*l+e)*2+1:(t*l+Math.min(e,r))*2;if(!f.has(s)){let c=d[t*l+e],u=c/(c-d[i*l+r]);f.set(s,[a+(e+(r-e)*u)*n,o+(t+(i-t)*u)*n])}return s},m=new Map;for(let e=0;e<u-1;e++)for(let t=0;t<l-1;t++){let n=d[e*l+t]<0,r=d[e*l+t+1]<0,i=d[(e+1)*l+t+1]<0,a=d[(e+1)*l+t]<0,o=()=>p(t,e,t+1,e),s=()=>p(t+1,e,t+1,e+1),c=()=>p(t,e+1,t+1,e+1),u=()=>p(t,e,t,e+1),f=(e,t)=>m.set(e,t);switch((n?8:0)|(r?4:0)|(i?2:0)|!!a){case 1:f(u(),c());break;case 2:f(c(),s());break;case 3:f(u(),s());break;case 4:f(s(),o());break;case 5:f(u(),o()),f(s(),c());break;case 6:f(c(),o());break;case 7:f(u(),o());break;case 8:f(o(),u());break;case 9:f(o(),c());break;case 10:f(o(),s()),f(c(),u());break;case 11:f(o(),s());break;case 12:f(s(),u());break;case 13:f(s(),c());break;case 14:f(c(),u())}}let h=[],g=new Set;for(let e of m.keys()){if(g.has(e))continue;let t=[];for(let n=e;n!==void 0&&!g.has(n);n=m.get(n))g.add(n),t.push(f.get(n));if(t.length<3)continue;let i=Gm(t,n*.12);for(let e=n*.25;i.length>r;e*=1.6)i=Gm(t,e);Um(i)<0&&i.reverse(),h.push(i)}return h}var qm=(e,t,n)=>e+(t-e)*n;function Jm(e,t,n){let r=Math.min(1,Math.max(0,(n-e)/(t-e)));return r*r*(3-2*r)}function Ym(e,t,n){let r=Math.min(t,n)/2;if(e===`capsule`||e===`circle`)return r;let i=Number(e);return Math.max(0,Math.min(Number.isFinite(i)?i:8,r))}function Xm(e,t){let n=Ym(e.radius,e.width,e.height),r=Ym(t.radius,t.width,t.height);return Math.abs(Math.log(e.width/t.width))+Math.abs(Math.log(e.height/t.height))+Math.abs(n-r)/Math.max(4,Math.min(t.width,t.height)/2)}var Zm=(e,t)=>Math.hypot(Math.max(0,e.left-(t.left+t.width),t.left-(e.left+e.width)),Math.max(0,e.top-(t.top+t.height),t.top-(e.top+e.height))),Qm=(e,t,n=.5)=>t.left>=e.left-n&&t.top>=e.top-n&&t.left+t.width<=e.left+e.width+n&&t.top+t.height<=e.top+e.height+n;function $m(e,t){let n=t.top>=e.top+e.height-.5||t.top+t.height<=e.top+.5;return n===(t.left>=e.left+e.width-.5||t.left+t.width<=e.left+.5)?Math.abs(t.left+t.width/2-e.left-e.width/2)/Math.max(1,t.width)>Math.abs(t.top+t.height/2-e.top-e.height/2)/Math.max(1,t.height)?`x`:`y`:n?`y`:`x`}function eh(e,t,n){if(!n||e>=1)return e;let r=Math.max(0,e);return t?1-(1-r)**1.6:r**1.4}function th(e,t){let n=e.along!==void 0,r=eh(t,e.along===`x`,n),i=eh(t,e.along===`y`,n),a=Math.max(1,qm(e.from.width,e.to.width,r)),o=Math.max(1,qm(e.from.height,e.to.height,i)),s=qm(e.from.left+e.from.width/2,e.to.left+e.to.width/2,r),c=qm(e.from.top+e.from.height/2,e.to.top+e.to.height/2,i),l=Math.min(a,o)/2,u=Math.min(1,Math.max(0,t)),d=Ym(e.fromRadius,e.from.width,e.from.height),f=qm(d,Ym(e.toRadius,a,o),u),p=Math.min(l,Math.max(f,.34*Math.min(a,o))),m=.12*(1-d/Math.max(1,Math.min(e.from.width,e.from.height)/2)),h=n?(m>0?Jm(0,m,u):1)*(1-Jm(.35,.8,u)):0,g=Math.min(l,qm(f,p,h));return{left:s-a/2,top:c-o/2,width:a,height:o,radius:g}}var nh=e=>Jm(.4,.9,e),rh=e=>Jm(.02,.3,e),ih=(e,t)=>t*(1-Jm(.3,.95,e)),ah=(e,t)=>Math.round(e/t)*t,oh=new Map;function sh(e,t,n={}){if(!t)return ch(e,t,n);let r=e=>({...e,left:Number((e.left-t.left).toFixed(8)),top:Number((e.top-t.top).toFixed(8))}),i={...e,from:r(e.from),to:r(e.to)},a={...t,left:0,top:0},o=JSON.stringify([i,a,n]),s=oh.get(o);return s?oh.delete(o):s=ch(i,a,n),oh.set(o,s),oh.size>16&&oh.delete(oh.keys().next().value),s.map(e=>({...e,shape:{...e.shape},...e.box?{box:{...e.box,left:e.box.left+t.left,top:e.box.top+t.top}}:{}}))}function ch(e,t,n){let{stops:r=14,unions:i=16,neck:a=18,dpr:o=1,restDpr:s=o}=n,c=Array.from({length:241},(t,n)=>th(e,n/240)),l=(e,t,n)=>{let r=n?t.width:Math.max(1,Math.round(t.width)),i=n?t.height:Math.max(1,Math.round(t.height)),a=ah(Math.min(t.radius,r/2,i/2),.5);return{p:e,shape:{width:r,height:i,radius:a>=Math.min(r,i)/2-.25?`capsule`:a,dpr:o},absorbs:!1}},u=[],d=[0];for(let e=1;e<=240;e++)d.push(d[e-1]+Xm(c[e],c[e-1]));let f=d[240],p=1;for(let e=1;e<240&&f>0;e++)d[e]>=f*p/(r-1)&&p<r-1&&(u.push(l(e/240,c[e],!1)),p++);let m={p:0,shape:{width:e.from.width,height:e.from.height,radius:e.fromRadius,dpr:s,resting:!0},absorbs:!1},h={p:1,shape:{width:e.to.width,height:e.to.height,radius:e.toRadius,dpr:s,resting:!0},absorbs:!1};if(!t)return[m,...u,h];let g={x:t.left,y:t.top,width:t.width,height:t.height,radius:Ym(t.radius,t.width,t.height)},_=e=>{let n=c[e],r=ih(e/240,a);return!Qm(t,n)&&r>=1&&Zm(t,n)<=r},v=-1,y=-1;for(let e=0;e<=240;e++){if(!_(e)){if(v>=0)break;continue}v<0&&(v=e),y=e}if(v<0)return[m,...u,h];let b={p:Math.max(0,v-1)/240,shape:{width:t.layoutWidth,height:t.layoutHeight,radius:t.radius,dpr:s,resting:!0},box:{...t},absorbs:!0},x=Math.max(2,Math.min(i,Math.ceil((y-v)/240/.025)+1)),S=[];for(let e=0;e<x;e++){let t=Math.round(qm(v,y,e/(x-1))),n=c[t],r=t/240,i=Km([g,{x:n.left,y:n.top,width:n.width,height:n.height,radius:n.radius}],ih(r,a),1.5,700);if(i.length!==1)continue;let s=i[0],l=Math.floor(Math.min(...s.map(([e])=>e))),u=Math.floor(Math.min(...s.map(([,e])=>e))),d=Math.ceil(Math.max(...s.map(([e])=>e))),f=Math.ceil(Math.max(...s.map(([,e])=>e)));S.push({p:r,shape:{width:d-l,height:f-u,radius:0,outline:s.map(([e,t])=>[e-l,t-u]),dpr:o},box:{left:l,top:u,width:d-l,height:f-u},absorbs:!0})}if(!S.length)return[m,...u,h];let C=l(Math.min(1,(y+1)/240),c[Math.min(240,y+1)],!1),w=u.filter(e=>e.p>C.p);return[b,...S,C,...w,h]}function lh(e,t){if(!e.length||t<e[0].p-1e-9)return;let n=0;for(;n+1<e.length&&e[n+1].p<=t;)n++;let r=e[n],i=e[n+1];if(!i||i.p<=r.p)return{a:r,mix:0,absorb:+!!r.absorbs};let a=Math.min(1,Math.max(0,(t-r.p)/(i.p-r.p)));return{a:r,b:i,mix:a,absorb:(r.absorbs?1-a:0)+(i.absorbs?a:0)}}function uh(e){return e.vendor===`Apple Computer, Inc.`||/AppleWebKit\//.test(e.userAgent)&&!/(?:Chrome|Chromium|Edg|OPR|SamsungBrowser)\//.test(e.userAgent)}var dh=typeof navigator<`u`&&uh(navigator),fh=typeof navigator<`u`&&/Gecko\//.test(navigator.userAgent)&&!/like Gecko/.test(navigator.userAgent),ph=typeof navigator<`u`&&!dh&&!fh,mh=e=>3*(e*.75*Math.sqrt(2*Math.PI))/2,hh=15099494.4;function gh(e,t,n){return!dh||n<=0||(e+2*n)*(t+2*n)<=hh?1:Math.max(.1,Math.min(1,_h(e,t)/n))}function _h(e,t){return Math.max(0,(-(e+t)+Math.sqrt((e+t)**2-4*(e*t-hh)))/4)}function vh(e,t=1,n=t){let r=new Map,i;for(let a of e.matchAll(/<(fe\w+)\b([^>]*?)(?:\/>|>(.*?)<\/\1>)/gs)){let[,e,o=``,s=``]=a,c=Object.fromEntries([...o.matchAll(/([\w-]+)="([^"]*)"/g)].map(e=>[e[1],e[2]])),l=e===`feMerge`?[...s.matchAll(/in="([^"]+)"/g)].map(e=>e[1]):[c.in,c.in2].filter(e=>!!e),u=(c.stdDeviation??`0`).split(` `).map(Number),d=Math.max(u[0]*t,(u[1]??u[0])*n);i={inputs:l,outset:e===`feGaussianBlur`&&d>0?Math.floor(3*Math.min(500,Math.max(2,Math.floor(d*.75*Math.sqrt(2*Math.PI)+.5)))/2):e===`feDisplacementMap`?Math.ceil(Math.abs(Number(c.scale??0))*Math.max(t,n)/2):e===`feOffset`?Math.ceil(Math.max(Math.abs(Number(c.dx??0))*t,Math.abs(Number(c.dy??0))*n)):0},c.result&&r.set(c.result,i)}if(!i)return 0;let a=[],o=()=>{let e=a.at(-1).depth,t=0;for(;a.length&&a.at(-1).depth===e;)t=Math.max(t,a.pop().outset);return t},s=(e,t)=>{if(a.length&&t<a.at(-1).depth){let e=o();a.at(-1).outset+=e}a.push({outset:e.outset,depth:t});for(let n of e.inputs){let e=r.get(n);e&&s(e,t+1)}};for(s(i,0);a.length>1;){let e=o();a.at(-1).outset+=e}return a[0].outset}var yh=new WeakMap;function bh(e){let t=yh.get(e);yh.delete(e),t?.()}function xh(e,t){let n=yh.get(e);return yh.set(e,t),n?.(),()=>{yh.get(e)===t&&yh.delete(e)}}var Sh=e=>dh?Math.max(4,Math.round(e/2)):e,Ch=140,wh=1/60,Th=new WeakMap,Eh=new WeakMap;function Dh(e){if(!(e instanceof HTMLElement))return()=>{};Th.set(e,(Th.get(e)??0)+1),e.dataset.glassMorphSource=``;let t=!1;return()=>{if(t)return;t=!0;let n=(Th.get(e)??1)-1;n>0?Th.set(e,n):(Th.delete(e),delete e.dataset.glassMorphSource,e.style.removeProperty(`--lg-morph-source`))}}function Oh(e){let t=e.getBoundingClientRect();return{left:t.left,top:t.top,width:t.width,height:t.height}}var kh=e=>{let t=e.getAttribute(`data-lg-container-radius`);if(t===`capsule`||t===`circle`)return t;let n=Number(t);return Number.isFinite(n)&&t!==null?n:e.classList.contains(`lg-surface`)?8:0},Ah=e=>um(e),jh=(e,t)=>Math.hypot(e.left-t.left,e.top-t.top)>1||Mh(e,t),Mh=(e,t)=>Math.abs(e.width-t.width)>.5||Math.abs(e.height-t.height)>.5;function Nh(e,t){let n={duration:.32,bounce:.1},r=t.submenu?{duration:.22,bounce:0}:dd.morph,i=t.submenu?{duration:.14,bounce:0}:dd.glow,a=new fd(0,dd.morph),o=new fd(1,i),s=null,c=null,l=`become`,u={left:0,top:0,width:0,height:0},d,f,p=!1,m,h=0,g=0,_,v,y=!1,b=!1,x=!1,S=0,C=!1,w,T,E=null,D,O=0,k=0,A={element:e,visible:()=>!C,trigger:()=>t.from?.(),retain:()=>{O++,m?.pause();let e=!1;return()=>{e||(e=!0,--O===0&&!C&&(h=performance.now(),m?.play()))}},snapshot:()=>v??(S&&T?T.snapshot():Oh(e)),finish:()=>{f?.(),f=void 0,y=!1,C=!0,S=0,a.jump(0),o.jump(0),v=void 0,e.style.setProperty(`--lg-morph`,`0`),m?.finish(),e.dispatchEvent(new CustomEvent(`glass:exited`))}},j=(e,n)=>t.radius===`capsule`?`capsule`:Ym(t.radius,e,n),M=()=>Math.min(devicePixelRatio||1,2),N=()=>{if(!t.submenu||T)return;E=t.from?.()?.parentElement?.closest(`.lg-menu`)??null;let e=E?Eh.get(E):void 0;e!==A&&e?.element.isConnected&&e.visible()&&(T=e,D=e.retain())},P=()=>{if(s=t.from?.()??null,t.submenu){N(),s=T?.element??null,c=null,l=`become`,T&&(u={...T.snapshot()}),x=!T;return}let n=s?.classList.contains(`lg-surface`)?s:null,r=s?.parentElement?.closest(`.lg-surface`)??null;l=t.morph??(n?`become`:`detach`),c=l===`become`?n:n??(r&&!r.contains(e)?r:null),l===`become`&&c&&(s=c),s?.isConnected&&(u=Oh(s)),x=!s?.isConnected||!u.width||!u.height},F=()=>{let n=Oh(e),r=Ah(e);if(!r.width||!r.height||x||!s){_=void 0;return}let i={from:{...u},fromRadius:kh(s),to:n,toRadius:t.radius,along:$m(u,n)},a=l===`detach`&&c?.isConnected?(()=>{let e=Oh(c),t=Ah(c);return{...e,radius:kh(c),layoutWidth:t.width||e.width,layoutHeight:t.height||e.height}})():void 0,o=t.neck??18,d=sh(i,o>0?a:void 0,{dpr:1,restDpr:M(),neck:o,stops:Sh(o>0?14:10)});if(l===`become`&&c){let e=Ah(c);e.width&&e.height&&Object.assign(d[0].shape,{width:e.width,height:e.height})}Object.assign(d.at(-1).shape,{width:r.width,height:r.height});let f=o>0&&a?c??void 0:void 0;_={endpoints:i,stops:d,shapes:d.map(e=>e.shape),glass:l===`become`?c??void 0:f,glassRect:f&&a?{left:a.left,top:a.top,width:a.width,height:a.height}:void 0}},I=()=>!_||!t.prepared||_.stops.every(e=>t.prepared(e.shape))?!0:!_.stops.some(e=>e.shape.outline)&&t.prepared(_.stops.at(-1).shape);function L(){if(t.motion()===`none`)return;f?.(),f=void 0,P(),E&&Eh.set(E,A),p=!0,l===`become`&&c&&!x&&(d?.(),d=Dh(c)),y=!0,b=!1,C=!1;let n=x||t.motion()===`reduced`;a.configure(r).jump(+!!n),n?(_=void 0,S=0):(F(),S=g||performance.now()),o.jump(+!n).target=1,e.dataset.glassMorph=`enter`,e.style.setProperty(`--lg-morph`,`0`)}function R(){if(t.motion()===`none`)return;p=!1,t.submenu&&(_=void 0,x=!0,D?.(),D=void 0,T=void 0),y||(t.submenu||P(),!x&&t.motion()!==`reduced`?(l===`become`&&c&&(d??=Dh(c)),!_||jh(_.endpoints.to,Oh(e))?F():_.endpoints.from={...u},a.jump(1)):_=void 0),y=!0,b=!0,S=0;let r=!_||x||t.motion()===`reduced`;a.configure(n).target=+!!r,o.target=+!r,e.dataset.glassMorph=`exit`;let g=r?pd(i,o.value,0,o.velocity):pd(n,a.value,0,a.velocity,.01);m?.cancel(),h=performance.now();let w=t.submenu?60:0;k=h+w,m=e.animate([{},{}],{duration:Math.max(16,g*1e3+40+w)}),O&&m.pause();let A=t.submenu?E:s?.parentElement?.closest(`.lg-menu`);A&&(f=xh(A,()=>{b&&!C&&(f?.(),f=void 0,y=!1,C=!0,S=0,a.jump(0),o.jump(0),v=void 0,e.style.setProperty(`--lg-morph`,`0`),d?.(),d=void 0,m?.finish(),e.dispatchEvent(new CustomEvent(`glass:exited`)))}))}function z(){f?.(),f=void 0,p=!1,y=!1,b=!1,S=0,m=void 0,delete e.dataset.glassMorph,e.style.removeProperty(`--lg-morph`)}let ee=new MutationObserver(()=>{let n=e.hasAttribute(`data-ending-style`);n&&!b?R():!n&&!e.hasAttribute(`data-closed`)&&C&&!b?(C=!1,te=t.enter!==!1&&t.motion()!==`none`,V=void 0,H=0,ne=0,te&&(N(),e.dataset.glassMorph=`enter`,e.style.setProperty(`--lg-morph`,`0`))):!n&&!e.hasAttribute(`data-closed`)&&b&&(f?.(),f=void 0,p=!0,E&&Eh.set(E,A),C&&(C=!1,l===`become`&&c&&(d??=Dh(c))),m?.cancel(),m=void 0,b=!1,y=!0,a.configure(r).target=1,o.target=1,S=t.motion()===`full`&&_&&!I()?performance.now():0,e.dataset.glassMorph=`enter`)}),B=!!t.from&&e.hasAttribute(`data-ending-style`);C=!!t.from&&!B&&e.hasAttribute(`data-closed`);let te=!!t.from&&t.enter!==!1&&!B&&!C&&t.motion()!==`none`,V,H=0,ne=0;t.from&&ee.observe(e,{attributes:!0,attributeFilter:[`data-ending-style`,`data-closed`]}),B&&t.motion()!==`none`&&R(),te&&(N(),e.dataset.glassMorph=`enter`,e.style.setProperty(`--lg-morph`,`0`));let re=(e,t)=>{if(!e.box)return{shape:e.shape,...t};let n=_?.glassRect,r=n&&_?.glass?.isConnected?Oh(_.glass):void 0,i=r&&n?r.left-n.left:0,a=r&&n?r.top-n.top:0;return{shape:e.shape,left:e.box.left+i,top:e.box.top+a,width:e.box.width,height:e.box.height}},ie=(e,t)=>{let n=_?lh(_.stops,e):void 0,r=!_?.glass||!n?0:l===`become`?1:n.absorb;return{...t,draw:n&&{a:re(n.a,t),b:n.b&&re(n.b,t),mix:n.mix},absorbs:r>0&&_?.glass?{element:_.glass,weight:r}:void 0}};return{frame(n){let r=h?Math.max(0,(n-h)/1e3):wh;if(h=n,g=n,O&&b&&!C)return!0;if(b&&t.submenu&&(r=Math.min(r,Math.max(0,(n-k)/1e3))),te){let t=Oh(e),n=!e.hasAttribute(`data-starting-style`)&&V&&Math.hypot(t.left-V.left,t.top-V.top)<.5&&Math.abs(t.width-V.width)<.5&&Math.abs(t.height-V.height)<.5;V=t,ne=n?ne+1:0,(ne>=2||++H>8)&&(te=!1,r=0,e.hasAttribute(`data-ending-style`)||L(),y||z())}if(t.layout&&!y){let n={x:e.offsetLeft,y:e.offsetTop,width:e.offsetWidth,height:e.offsetHeight};if(w&&n.width&&n.height&&t.motion()===`full`&&[n.x-w.x,n.y-w.y,n.width-w.width,n.height-w.height].some(e=>Math.abs(e)>.5)){let e=_?.layout&&v?{left:v.left-_.layout.x,top:v.top-_.layout.y,width:v.width,height:v.height}:{left:w.x,top:w.y,width:w.width,height:w.height},i={from:e,fromRadius:j(e.width,e.height),to:{left:n.x,top:n.y,width:n.width,height:n.height},toRadius:t.radius},o=sh(i,void 0,{stops:Sh(12),dpr:1,restDpr:M()});_={endpoints:i,stops:o,shapes:o.map(e=>e.shape),layout:n},a.configure(dd.layout).jump(0).target=1,r=0}n.width&&n.height&&(w=n)}if(S&&(I()||n-S>Ch)&&(S=0,a.target=1,r=0),S&&(r=0),p&&!S){p=!1,T?.finish(),D?.(),D=void 0,T=void 0;let e=t.submenu?E:s?.parentElement?.closest(`.lg-menu`);e&&bh(e)}a.step(r),o.step(r);let i=()=>{let e=te||y||S>0||!a.settled||!o.settled;return e||(h=0),e},m=b&&_&&!x&&t.motion()===`full`&&a.value<=.012&&Math.abs(a.velocity)<=.15;if(y&&!S&&(m||a.settled&&o.settled)&&(b?(f?.(),f=void 0,y=!1,C=!0,_&&a.jump(0),d?.(),d=void 0,e.dispatchEvent(new CustomEvent(`glass:exited`))):z()),_?.layout){if(a.settled&&a.value===1)return _=void 0,v=void 0,i();let t=Oh(e),n=a.value,r=th(_.endpoints,n),o=_.layout,s={left:t.left+r.left-o.x,top:t.top+r.top-o.y,width:r.width,height:r.height,radius:r.radius};return v={...ie(n,s),radius:j(r.width,r.height)},!0}if(C)return v=void 0,i();if(y&&_){if(s?.isConnected&&!b){let t=Oh(e);Mh(_.endpoints.to,t)?S||(u=Oh(s),F(),I()||(S=n)):jh(_.endpoints.to,t)&&(_.endpoints.to=t)}let t=a.value,r=th(_.endpoints,t);return e.style.setProperty(`--lg-morph`,(nh(t)*o.value).toFixed(3)),l===`become`&&c instanceof HTMLElement&&c.style.setProperty(`--lg-morph-source`,rh(t).toFixed(3)),v=ie(t,r),i()}return y?(e.style.setProperty(`--lg-morph`,o.value.toFixed(3)),v=void 0,i()):(v=void 0,i())},geometry:()=>v,detachedSource:()=>!C&&l===`detach`&&c?.isConnected&&_?.stops.some(e=>e.absorbs)?c:void 0,waypoints:()=>_?.shapes??[],pending:()=>S>0,positioning:()=>te,opacity(){return C||te?0:y?_?t.submenu||_.glass?1:Math.min(1,Math.max(0,a.value/.2)):dh&&!t.submenu?1:o.value:1},dispose(){D?.(),D=void 0,E&&Eh.get(E)===A&&Eh.delete(E),ee.disconnect(),m?.cancel(),d?.(),z()}}}var Ph={clear:{blur:0,refraction:60,light:{shadowLift:.18,highlightRolloff:0},dark:{shadowLift:.15,highlightRolloff:.2}},regular:{blur:7.33,refraction:60,light:{fillSigma:23,fillOpacity:.34,tone:[.36,.67,-.1113,1.1031]},dark:{fillSigma:21.8,fillOpacity:.65,tone:[.105,.83,-.2091,1.0648]}}};function Fh(e,t){if(e===t)return 0;let n=e=>{let t=[];for(let n=e;n;n=n.parentElement)t.unshift(n);return t},r=n(e),i=n(t),a=0;for(;r[a]&&r[a]===i[a];)a++;let o=e=>{for(let t of e.slice(a)){let e=getComputedStyle(t);if(e.zIndex!==`auto`&&e.position!==`static`)return Number(e.zIndex)||0}return 0};return o(r)-o(i)||(e.compareDocumentPosition(t)&Node.DOCUMENT_POSITION_FOLLOWING?-1:1)}function Ih(e,t){return e.x<t.x+t.w&&t.x<e.x+e.w&&e.y<t.y+t.h&&t.y<e.y+e.h}function Lh(e,t,n){let r=t.w>0?(t.element?.offsetWidth||t.w)/t.w:1,i=t.h>0?(t.element?.offsetHeight||t.h)/t.h:1,a=Math.max(r,i),o=Math.abs(r-i)>1e-6,s=[],c=`SourceGraphic`;for(let[e,l]of n.entries()){if(!l.maps)continue;let n=`f${e}`,u=l.x-t.x-2,d=l.y-t.y-2,f=(e,t)=>Sf(l.maps,e,t,u,d,l.w+4,l.h+4,1/r,1/i),p=(e=0)=>`x="${(u-e)*r}" y="${(d-e)*i}" width="${(l.w+4+2*e)*r}" height="${(l.h+4+2*e)*i}"`,m=p(),h=l.opacity>=1;s.push(f(`field`,`${n}raw`)),o&&s.push(`<feComponentTransfer in="${n}raw" ${m} result="${n}map"><feFuncR type="linear" slope="${r/a}" intercept="${(1-r/a)/2}"/><feFuncG type="linear" slope="${i/a}" intercept="${(1-i/a)/2}"/></feComponentTransfer>`),h||s.push(`<feComponentTransfer in="${n}raw" ${m} result="${n}mask"><feFuncA type="linear" slope="${l.opacity}"/></feComponentTransfer>`);let g=o?`${n}map`:`${n}raw`,_=h?`${n}raw`:`${n}mask`,v=Ph[l.options.material??`clear`].blur,y=l.options.refraction??Ph[l.options.material??`clear`].refraction;v>0&&s.push(`<feGaussianBlur in="${c}" ${p(Math.ceil(3*v+Math.abs(y)+2))} stdDeviation="${v*r} ${v*i}" result="${n}blur"/>`),s.push(`<feDisplacementMap in="${v>0?`${n}blur`:c}" in2="${g}" ${m} scale="${y*2*a}" xChannelSelector="R" yChannelSelector="G" result="${n}refracted"/>`),s.push(`<feComposite in="${n}refracted" in2="${_}" operator="in" ${m} result="${n}inside"/><feComposite in="${c}" in2="${_}" operator="out" result="${n}outside"/><feMerge result="${n}result"><feMergeNode in="${n}outside"/><feMergeNode in="${n}inside"/></feMerge>`),c=`${n}result`}return`<filter id="${e}" x="-1" y="-1" width="3" height="3" filterUnits="objectBoundingBox" primitiveUnits="userSpaceOnUse" color-interpolation-filters="sRGB">${s.join(``)}</filter>`}var Rh={ratio:0,pinch:0,zoom:1},zh=()=>dh&&typeof visualViewport==`object`&&visualViewport&&visualViewport.scale>0?visualViewport.scale:1;function Bh(){return(typeof devicePixelRatio==`number`&&devicePixelRatio>0?devicePixelRatio:1)/zh()}function Vh(e,t,n=1){if(!dh)return 1/0;let r=(typeof navigator==`object`&&navigator.maxTouchPoints>1?1024:2048)*n;return Math.max(0,(r/(Hh()*zh())-Math.max(e,t))/2)}function Hh(){if(!dh||typeof matchMedia!=`function`)return 1;let e=typeof devicePixelRatio==`number`&&devicePixelRatio>0?devicePixelRatio:1,t=zh();if(e===Rh.ratio&&t===Rh.pinch)return Rh.zoom;let n=.25,r=16;for(let e=0;e<24;e++){let e=(n+r)/2;matchMedia(`(min-resolution: ${e}dppx)`).matches?n=e:r=e}let i=Math.round(e/t/n*1e3)/1e3;return Rh={ratio:e,pinch:t,zoom:Math.abs(i-1)<.005?1:i},Rh.zoom}var Uh=new Set([`x`,`y`,`width`,`height`,`dx`,`dy`,`stdDeviation`,`scale`]);function Wh(e,t){return t===1?e:e.replace(/<(fe\w+)\b([^>]*)>/g,(e,n,r)=>`<${n}${r.replace(/([\w-]+)="([^"]*)"/g,(e,n,r)=>Uh.has(n)?`${n}="${r.split(/[\s,]+/).filter(Boolean).map(e=>Number(e)*t).join(` `)}"`:e)}>`)}var Gh=new WeakMap,Kh=`http://www.w3.org/2000/svg`,qh=0;function Jh(e,t,n){let r=Gh.get(e);r||(r=new Map,Gh.set(e,r));let i=new Set(r.keys()),a=new Map,o=[],s=Hh();for(let n of t){let t=Wh(n,s),c=/\bid="([^"]+)"/.exec(t)?.[1];if(!c)throw Error(`A glass filter must have an id.`);i.delete(c);let l=r.get(c);if(l?.element.parentElement!==e&&(l=void 0),l?.markup===t){a.set(c,l.id);continue}let u=Yh(t);if(l){let e=Qh(l,u,o);l.markup=t,e&&ph&&l.element.setAttribute(`x`,u.attributes.x)}else{let n=`${c}-${++qh}`,i=Zh(e.ownerDocument,u,o);i.element.setAttribute(`data-filter`,c),i.element.id=n,e.append(i.element),l={...i,markup:t,id:n},r.set(c,l)}a.set(c,l.id)}for(let e of i)r.get(e).element.remove(),r.delete(e);let c=!1;for(let e of o){let t=n(e.getAttribute(`data-map`));t&&e.getAttribute(`href`)!==t&&(e.setAttribute(`href`,t),c=!0)}return c&&ph&&eg(e),e=>a.get(e)??e}function Yh(e){let t=[],n;for(let r of e.matchAll(/<(\/?)([\w:-]+)([^>]*?)(\/?)>/g)){let[,e,i,a,o]=r;if(e){if(t.pop()?.tag!==i)throw Error(`Unbalanced glass filter markup.`);continue}let s={};for(let[,e,t]of a.matchAll(/([\w:-]+)="([^"]*)"/g))s[e]=t;let c={tag:i,attributes:s,children:[]};if(t.length)t[t.length-1].children.push(c);else if(n)throw Error(`Expected one glass filter.`);else n=c;o||t.push(c)}if(!n||t.length||n.tag!==`filter`)throw Error(`Invalid glass filter markup.`);let r=new Set;for(let e of n.children){let t=e.attributes.result;if(t){if(r.has(t))throw Error(`Duplicate glass filter result "${t}".`);r.add(t)}}if(n.children.every(e=>[`feImage`,`feFlood`,`feTurbulence`].includes(e.tag)?!0:e.tag===`feMerge`?e.children.every(e=>!!e.attributes.in):!!e.attributes.in&&(![`feBlend`,`feComposite`,`feDisplacementMap`].includes(e.tag)||!!e.attributes.in2))&&n.children.at(-1)?.tag!==`feImage`){let e=n.children.filter(e=>e.tag===`feImage`);e.sort((e,t)=>(e.attributes.result??``)<(t.attributes.result??``)?-1:+((e.attributes.result??``)>(t.attributes.result??``))),n.children=[...e,...n.children.filter(e=>e.tag!==`feImage`)]}return n}var Xh=(e,t)=>e.attributes.result??`${e.tag}#${t}`;function Zh(e,t,n){let r=e.createElementNS(Kh,t.tag);for(let[e,n]of Object.entries(t.attributes))r.setAttribute(e,n);let i=new Map;return t.children.forEach((t,a)=>{let o=Zh(e,t,n);i.set(Xh(t,a),o),r.append(o.element)}),t.attributes[`data-map`]&&n.push(r),{element:r,description:t,children:i}}function Qh(e,t,n){let r=e.description.attributes;for(let[i,a]of Object.entries(t.attributes))i!==`id`&&r[i]!==a&&(e.element.setAttribute(i,a),i===`data-map`&&n.push(e.element));for(let n of Object.keys(r))n!==`id`&&!(n in t.attributes)&&e.element.removeAttribute(n);let i=new Map(e.children),a=new Map,o=!1,s=new Map(t.children.map((e,t)=>[Xh(e,t),e.tag]));for(let[e,t]of i)s.get(e)!==t.description.tag&&(t.element.remove(),i.delete(e),o=!0);let c=e.element.firstElementChild;t.children.forEach((t,r)=>{let s=Xh(t,r),l=i.get(s);l?.description.tag===t.tag?(i.delete(s),o=Qh(l,t,n)||o):(l=Zh(e.element.ownerDocument,t,n),o=!0),l.element!==c&&(e.element.insertBefore(l.element,c),o=!0),c=l.element.nextElementSibling,a.set(s,l)});for(let e of i.values())e.element.remove(),o=!0;return e.description=t,e.children=a,o}var $h=new WeakMap;function eg(e){let t=($h.get(e)??0)+1;$h.set(e,t);for(let n of[16,100,300,700,1500,3e3])setTimeout(()=>{if($h.get(e)!==t||!e.isConnected)return;let n=e.querySelector(`feImage`);n?.setAttribute(`x`,n.getAttribute(`x`))},n)}var tg=`http://www.w3.org/2000/svg`,ng=48,rg=96,ig=0;function ag(e){let t=`lg-warm-${++ig}`,n=e.ownerDocument,r=n.createElementNS(tg,`svg`);r.setAttribute(`aria-hidden`,`true`),r.setAttribute(`width`,`0`),r.setAttribute(`height`,`0`),r.style.position=`absolute`,e.append(r);let i=[],a=()=>{let a=n.createElementNS(tg,`filter`);a.id=`${t}-${i.length}`;for(let[e,t]of Object.entries({x:`0`,y:`0`,width:`1`,height:`1`,filterUnits:`objectBoundingBox`,primitiveUnits:`objectBoundingBox`}))a.setAttribute(e,t);r.append(a);let o=n.createElement(`div`);o.setAttribute(`aria-hidden`,`true`),Object.assign(o.style,{position:`absolute`,left:`0`,top:`0`,width:`1px`,height:`1px`,opacity:`0.004`,pointerEvents:`none`,filter:`url("#${a.id}")`}),e.append(o);let s=n.createElementNS(tg,`feMerge`);a.append(s);let c={filter:a,merge:s,element:o,count:0};return i.push(c),c};a();let o=new Map,s=new WeakSet,c=new Map,l,u=0,d=e=>{if(o.has(e))return;if(o.size>=rg){let[e,t]=o.entries().next().value;t.image.remove(),t.node.remove(),t.probe.count--,o.delete(e)}let t=i.find(e=>e.count<ng)??a(),r=`w${++u}`,s=n.createElementNS(tg,`feImage`);for(let[e,t]of Object.entries({x:`0`,y:`0`,width:`1`,height:`1`,preserveAspectRatio:`none`,result:r}))s.setAttribute(e,t);let c=n.createElementNS(tg,`feMergeNode`);c.setAttribute(`in`,r),t.filter.insertBefore(s,t.merge),t.merge.append(c),s.setAttribute(`href`,e),t.count++,o.set(e,{image:s,node:c,probe:t})},f=0,p=!1,m=[],h=()=>{let e=++f;m.forEach(clearTimeout),m=[16,60,150].map(t=>setTimeout(()=>{if(f===e&&!p)for(let{filter:e}of i)e.setAttribute(`x`,e.getAttribute(`x`)===`0`?`0.000001`:`0`)},t))},g=e=>[e.field,e.overlay,...Object.values(e.capsule?.planes??{}).flat()],_=()=>{let e=performance.now();for(let[t,n]of c)n<=e&&(g(t).every(e=>o.has(e))&&s.add(t),c.delete(t))},v=()=>{if(l!==void 0||!c.size)return;let e=Math.min(...c.values());l=setTimeout(()=>{l=void 0,!p&&(_(),v())},Math.max(0,e-performance.now()))};return{warm(e){if(p||(_(),s.has(e)))return;let t=g(e).filter(e=>!o.has(e));if(t.length){for(let e of t)d(e);h()}(t.length||!c.has(e))&&c.set(e,performance.now()+50),v()},has(e){return!p&&(_(),s.has(e))},owns(e){return r.contains(e)||i.some(t=>t.element.contains(e))},dispose(){p=!0,m.forEach(clearTimeout),m=[],l!==void 0&&clearTimeout(l),l=void 0,c.clear(),r.remove();for(let{element:e}of i)e.remove();o.clear()}}}var og=new Map;function sg(e,t){let n=!1;for(let[r,i]of og)e.contains(r)&&(i.update(t),i.active()&&(n=!0));return n}function cg(e){for(let[t,n,r]of[[`size`,e.size??80,4096],[`blur`,e.blur??20,64],[`refraction`,e.refraction??0,32]])if(!Number.isFinite(n)||n<0||n>r)throw RangeError(`${t} must be finite and between 0 and ${r}.`);if(e.edge&&![`top`,`bottom`,`inline-start`,`inline-end`].includes(e.edge))throw RangeError(`Unknown progressive blur edge.`)}function lg(e,t){return e===`inline-start`?t?`right`:`left`:e===`inline-end`?t?`left`:`right`:e}function ug(e,t,n,r,i,a,o){let s=Math.max(0,Math.min(r,a?r+t:t)),c=Math.max(0,Math.min(i,n)),l=e===`top`?c:e===`bottom`?i-c:e===`left`?s:r-s,u=Math.max(0,Math.min(1,l/Math.max(1,Math.min(o,32))));return u*u*(3-2*u)}function dg(e,t,n,r=[]){let i=0,a=e=>{i=Math.max(i,e.x,t-e.x-e.width,e.y,n-e.y-e.height)};for(let[t]of e.matchAll(/<fe\w+\b[^>]*>/g)){let e=e=>Number(RegExp(`\\s${e}="([-\\d.e]+)"`).exec(t)?.[1]??NaN),n={x:e(`x`),y:e(`y`),width:e(`width`),height:e(`height`)};Object.values(n).every(Number.isFinite)&&a(n)}return r.forEach(a),i>0?Math.ceil((i/2+2)/16)*16:0}function fg(e,t,n,r,i=!1){let a=[...e.matchAll(/<feMerge[\s>]/g)].at(-1)?.index??-1;if(a<0||t<=0)return e;let o=e.indexOf(`>`,a)+1,s=`x="0" y="0" width="${n}" height="${r}"`,c=`<feFlood flood-opacity="0" ${s} result="reach"/>`,l;if(i){let e=`reach`,n=t,r=0;for(;n>0;){let t=Math.min(n,700);c+=`<feGaussianBlur in="${e}" stdDeviation="${Math.ceil(t/pg)}" ${s} result="reach-${++r}"/>`,e=`reach-${r}`,n-=t}l=[e]}else{let e=Math.min(t,Math.floor(n/2)),i=Math.min(t,Math.floor(r/2));c+=`<feOffset in="reach" dx="${e}" dy="${i}" ${s} result="reach-after"/><feOffset in="reach" dx="${-e}" dy="${-i}" ${s} result="reach-before"/>`,l=[`reach-after`,`reach-before`]}return e.slice(0,a)+c+e.slice(a,o)+l.map(e=>`<feMergeNode in="${e}"/>`).join(``)+e.slice(o)}var pg=2.25*Math.sqrt(2*Math.PI)/2;function mg(e){return[...e.matchAll(/<fe(?!Func[RGBA]\b|MergeNode\b)[A-Z][\w]*\b/g)].length}var hg=new WeakMap;function gg(e){return vg(e,`transform`)}function _g(e){return vg(e,`opacity`)}function vg(e,t){let n=hg.get(e);if(!n){let t=e.style,r=e.ownerDocument.defaultView?.getComputedStyle(e).willChange??t.getPropertyValue(`will-change`);n={hints:new Map,tokens:r.split(`,`).map(e=>e.trim()).filter(e=>e&&e!==`auto`),original:t.getPropertyValue(`will-change`),priority:t.getPropertyPriority(`will-change`),owned:null,superseded:!1},hg.set(e,n)}let r=()=>{let t=e.style;if((t.getPropertyValue(`will-change`)!==(n.owned??n.original)||t.getPropertyPriority(`will-change`)!==(n.owned===null?n.priority:`important`))&&(n.superseded=!0),n.superseded)return;let r=[...n.hints.keys()].filter(e=>!n.tokens.includes(e));if(r.length){let e=[...n.tokens,...r].join(`, `);e!==n.owned&&t.setProperty(`will-change`,e,`important`),n.owned=t.getPropertyValue(`will-change`)}else n.owned!==null&&(n.original?t.setProperty(`will-change`,n.original,n.priority):t.removeProperty(`will-change`),n.owned=null)};n.hints.set(t,(n.hints.get(t)??0)+1),r();let i=!1;return()=>{if(i)return;i=!0;let a=n.hints.get(t)-1;a?n.hints.set(t,a):n.hints.delete(t),r(),n.hints.size||hg.delete(e)}}var yg=dh?`webkit`:fh?`gecko`:`chromium`,bg=0,xg=`http://www.w3.org/2000/svg`,Sg=6,Cg=e=>e*e*(3-2*e),wg=e=>.5-Math.sin(Math.asin(1-2*Math.max(0,Math.min(1,e)))/3),Tg=(e,t)=>Math.max(0,1-Math.abs(Sg*Cg(Math.max(0,Math.min(1,t)))-e)),Eg=Array.from({length:7},(e,t)=>[wg((t-1)/Sg),wg((t+1)/Sg)]),Dg=e=>{let t=e/Sg;return 3.92*t*(1-t)};function Og(e){let t=1/(1+.3275911*Math.abs(e)/Math.SQRT2),n=1-((((1.061405429*t-1.453152027)*t+1.421413741)*t-.284496736)*t+.254829592)*t*Math.exp(-e*e/2);return e<0?(1-n)/2:(1+n)/2}function kg(e){let t=-8,n=8;for(let r=0;r<48;r++){let r=(t+n)/2;Og(r)<e?t=r:n=r}return(t+n)/2}var Ag=Array.from({length:7},(e,t)=>Array.from({length:65},(e,n)=>{let r=n/64,i=r<=0?0:r>=1?1:.5+kg(r)/6;return Number(Tg(t,i).toFixed(4))}).join(` `)),jg=64,Mg=new Map;function Ng(e){let t=Mg.get(e);if(t)return t;let[,n,r]=e.split(`:`),i=Number(r),[a,o]=Eg[i],s=n===`top`||n===`bottom`,c=n===`top`||n===`left`,l=new Uint8Array(256);for(let e=0;e<jg;e++){let t=(e+.5)/jg,n=c?o-t*(o-a):a+t*(o-a);l.set([255,255,255,Math.round(255*Tg(i,n))],e*4)}let u=qd(s?1:jg,s?jg:1,l);return Mg.set(e,u),u}var Pg=e=>{let t=Math.floor(e.x),n=Math.floor(e.y);return{x:t,y:n,width:Math.ceil(e.x+e.width)-t,height:Math.ceil(e.y+e.height)-n}},Fg=e=>`x="${e.x}" y="${e.y}" width="${e.width}" height="${e.height}"`,Ig=(e,t)=>({x:e.x-t,y:e.y-t,width:e.width+2*t,height:e.height+2*t});function Lg(e,t,n){switch(e.edge){case`bottom`:return Pg({x:e.x,y:e.y+t*e.height,width:e.width,height:(n-t)*e.height});case`top`:return Pg({x:e.x,y:e.y+(1-n)*e.height,width:e.width,height:(n-t)*e.height});case`right`:return Pg({x:e.x+t*e.width,y:e.y,width:(n-t)*e.width,height:e.height});case`left`:return Pg({x:e.x+(1-n)*e.width,y:e.y,width:(n-t)*e.width,height:e.height})}}var Rg=(e,t)=>e.x<t.x+t.width&&t.x<e.x+e.width&&e.y<t.y+t.height&&t.y<e.y+e.height;function zg(e,t,n,r,i){let a=[],o=e.edge===`top`||e.edge===`bottom`,s=e.edge===`bottom`||e.edge===`right`?-1:1,c=o?e.height:e.width;if(!r){let n=c/6;a.push(`<feFlood flood-color="#fff" ${Fg(Lg(e,.5,1.5))} result="${t}step"/>`,`<feGaussianBlur in="${t}step" stdDeviation="${o?`0 ${n}`:`${n} 0`}" ${Fg(Pg(e))} result="${t}ramp"/>`)}let l=[],u=[];for(let c=0;c<=Sg;c++){let d=Lg(e,Eg[c][0],Eg[c][1]),f=` ${Fg(c===0&&i?i:d)}`,p=e.blur*(c/Sg)**2,m=n,h=e.refraction*Dg(c);if(h>.01){let e=(h*s).toFixed(3);a.push(`<feOffset in="${n}" dx="${o?0:e}" dy="${o?e:0}" ${Fg(Ig(d,Math.ceil(3*p)+1))} result="${t}shift${c}"/>`),m=`${t}shift${c}`}c&&(a.push(`<feGaussianBlur in="${m}" stdDeviation="${p}" ${Fg(d)} result="${t}blur${c}"/>`),m=`${t}blur${c}`),a.push(r?`<feImage data-map="pg:${e.edge}:${c}" preserveAspectRatio="none" ${Fg(d)} result="${t}weight${c}"/>`:`<feComponentTransfer in="${t}ramp"${f} result="${t}weight${c}"><feFuncA type="table" tableValues="${Ag[c]}"/></feComponentTransfer>`),a.push(`<feComposite in="${m}" in2="${t}weight${c}" operator="in"${f} result="${t}part${c}"/>`),(c%2?u:l).push(`${t}part${c}`)}return{markup:a,even:l,odd:u}}function Bg(e,t,n,r,i=yg){let a=Math.max(256,...t.map(e=>Math.ceil((e.edge===`top`||e.edge===`bottom`?e.height:e.width)/2+3*e.blur+e.refraction+8))),o={x:-a,y:-a,width:n+2*a,height:r+2*a},s=[],c=(e,t,n)=>`<feMerge result="${t}"${n?` ${Fg(n)}`:``}>${e.map(e=>`<feMergeNode in="${e}"/>`).join(``)}</feMerge>`,l=(e,t,n,r)=>i===`gecko`?`<feComposite in="${e}" in2="${t}" operator="arithmetic" k2="1" k3="1"${r?` ${Fg(r)}`:``} result="${n}"/>`:`<feComposite in="${e}" in2="${t}" operator="lighter"${r?` ${Fg(r)}`:``} result="${n}"/>`;if(i===`gecko`){let e=`SourceGraphic`;t.forEach((t,n)=>{let r=`e${n}`,{markup:i,even:a,odd:u}=zg(t,r,e,!1,o);s.push(...i,c(a,`${r}even`,o),c(u,`${r}odd`,Pg(t)),l(`${r}even`,`${r}odd`,`${r}result`,o)),e=`${r}result`})}else{let e=t.every((e,n)=>t.every((t,r)=>n===r||!Rg(Pg(e),Pg(t))))?[t]:t.map(e=>[e]),n=`SourceGraphic`;e.forEach((e,r)=>{let a=[],o=[];e.forEach(e=>{let r=`e${t.indexOf(e)}`,{markup:u,even:d,odd:f}=zg(e,r,n,i===`webkit`);s.push(...u,`<feFlood flood-color="#fff" ${Fg(Pg(e))} result="${r}area"/>`,c(d,`${r}even`,Pg(e)),c(f,`${r}odd`,Pg(e)),l(`${r}even`,`${r}odd`,`${r}result`,Pg(e))),a.push(`${r}result`),o.push(`${r}area`)});let u=`g${r}`;o.length>1&&s.push(c(o,`${u}areas`)),s.push(`<feComposite in="${n}" in2="${o.length>1?`${u}areas`:o[0]}" operator="out" result="${u}outside"/>`,c([`${u}outside`,...a],`${u}result`)),n=`${u}result`})}return`<filter id="${e}" x="${-a/n}" y="${-a/r}" width="${1+2*a/n}" height="${1+2*a/r}" filterUnits="objectBoundingBox" primitiveUnits="userSpaceOnUse" color-interpolation-filters="sRGB">${s.join(``)}</filter>`}function Vg(e,t,n=!1){let r=document.createElementNS(xg,`svg`);r.setAttribute(`aria-hidden`,`true`),r.setAttribute(`width`,`0`),r.setAttribute(`height`,`0`),r.style.cssText=`position:absolute;pointer-events:none;overflow:hidden`;let i=document.createElementNS(xg,`defs`);r.append(i),e.ownerDocument.body.append(r);let a=`lg-progressive-${++bg}`,o=new Set,s=new Set,c=0,l=1,u=!1,d=``,f=0,p=new Map;function m(e,t){e.style.filter===t.applied&&(e.style.filter=t.original),t.layer.dispose(),t.releasePaint?.(),p.delete(e)}function h(n){let r=new Map;for(let e of s){let t=typeof e.target==`function`?e.target():e.target;if(t===n)continue;let i=t;if(!i)continue;let a=r.get(i)??[];a.push(e),r.set(i,a)}for(let[e,t]of p)r.has(e)||m(e,t);let i=0;for(let[n,a]of r){let r=p.get(n);r||(r={layer:Vg(e,t,!0),options:[],remove:[],original:n.style.filter,releasePaint:dh?gg(n):void 0,applied:n.style.filter},p.set(n,r)),(a.length!==r.options.length||a.some((e,t)=>e!==r.options[t]))&&(r.remove.forEach(e=>e()),r.remove=a.map(e=>r.layer.addScroll(e)),r.options=a);let o=r.layer.update(n),s=[r.original,o].filter(Boolean).join(` `);n.style.filter!==s&&(n.style.filter=s),r.applied=s,i+=r.layer.count()}return i}let g=matchMedia(`(prefers-reduced-transparency: reduce)`),_=matchMedia(`(forced-colors: active)`),v=``,y=``,b=0,x=[],S,C=0,w=t=>{e.dataset.glassBlurEdges!==t&&(e.dataset.glassBlurEdges=t)};function T(){x=[],v&&Jh(i,[],Ng),v=``,y=``,b=0,S=void 0,C=0,n||w(`0`)}let E=()=>o.size+[...s].reduce((e,t)=>e+new Set(t.edges??[`top`,`bottom`]).size,0);function D(e){if(cg(e.options),E()>=64)throw RangeError(`A GlassScene supports at most 64 progressive blur regions.`);return o.add(e),()=>{o.delete(e)}}return{add(e,t={}){return D({element:e,options:t})},addScroll(e){let t=[...new Set(e.edges??[`top`,`bottom`])];if(cg(e),t.forEach(e=>cg({edge:e})),E()+t.length>64)throw RangeError(`A GlassScene supports at most 64 progressive blur regions.`);if(!n)return s.add(e),()=>{s.delete(e)};let r=t.map(t=>D({options:{...e,edge:t},target:e.target}));return()=>r.forEach(e=>e())},count(){return b},regions(){return x},operations(){return C},outsets(){return c},scrollsContent(){return u},error(){return S??[...p.values()].map(e=>e.layer.error()).find(Boolean)},update(t){c=0;let r=n?0:h(t);n||w(String(r));let p=[...s].filter(e=>(typeof e.target==`function`?e.target():e.target)===t).flatMap(e=>[...new Set(e.edges??[`top`,`bottom`])].map(t=>({options:{...e,edge:t},target:e.target})));u=p.length>0;let m=[...o,...p];if(!t||g.matches||_.matches||!m.length)return(v||y)&&T(),n||w(String(r)),``;let E=t.getBoundingClientRect(),D=t.offsetWidth,O=t.offsetHeight;if(!D||!O||!E.width||!E.height)return T(),``;let k=D/E.width,A=O/E.height,j=[];for(let{element:t,options:n,target:r}of m){if(n.disabled||!(n.size??80)||!(n.blur??20)&&!(n.refraction??0))continue;let i=typeof r==`function`?r():r;if(r&&!i)continue;let a=getComputedStyle(i??e).direction===`rtl`,o=lg(n.edge??`bottom`,a),s=o===`top`||o===`bottom`,c=t?.getBoundingClientRect(),l=1;if(i){let e=i.clientWidth,t=i.clientHeight,r=i.getBoundingClientRect(),u=r.width/(i.offsetWidth||1),d=r.height/(i.offsetHeight||1),f=r.left+i.clientLeft*u,p=r.top+i.clientTop*d,m=Math.min(n.size??80,(s?t:e)/2);l=ug(o,i.scrollLeft,i.scrollTop,Math.max(0,i.scrollWidth-e),Math.max(0,i.scrollHeight-t),a,m),c=new DOMRect(o===`right`?f+(e-m)*u:f,o===`bottom`?p+(t-m)*d:p,(s?e:m)*u,(s?m:t)*d)}if(!c||!l||c.bottom<0||c.top>innerHeight||c.right<0||c.left>innerWidth)continue;let u=s?Math.max(c.left,E.left):c.left,d=s?c.top:Math.max(c.top,E.top),f=s?Math.min(c.right,E.right):c.right,p=s?c.bottom:Math.min(c.bottom,E.bottom);f<=u||p<=d||c.bottom<=E.top||c.top>=E.bottom||c.right<=E.left||c.left>=E.right||j.push({edge:o,x:(u-E.left)*k,y:(d-E.top)*A,width:(f-u)*k,height:(p-d)*A,blur:(n.blur??20)*l,refraction:(n.refraction??0)*l})}if(x=j,!j.length)return(v||y)&&T(),n||w(String(r)),``;let M=Bh();if(dh){let e=JSON.stringify([D,O,...j.map(e=>[e.edge,e.width,e.height,e.blur,e.refraction])]);e!==d&&(d=e,f=vh(Bg(a,j,D,O)));let t=f*M,n=gh(D*M,O*M,t);if(c=t*n/M,n<1)for(let e of j)e.blur*=n,e.refraction*=n}let N=Bg(a,j,D,O);if(dh){let e=c>Vh(D,O)/2,t=Math.min((e?2:1)*dg(N,D,O),_h(D*M,O*M)/M/2,e?1/0:Vh(D,O,.85)/2);t>c&&(N=fg(N,Math.floor(t),D,O,e),c=Math.floor(t))}let P=Hh();return(N!==v||P!==l)&&(v=N,l=P,b=j.length,C=fh?mg(N):0,S=C>64?RangeError(`Progressive blur requires ${C} filter operations; this browser supports 64 per element.`):void 0,y=`url("#${Jh(i,[N],Ng)(a)}")`),n||w(String(r+j.length)),y},dispose(){o.clear(),s.clear();for(let[e,t]of p)m(e,t);r.remove(),n||delete e.dataset.glassBlurEdges}}}function Hg(e,t,n,r){let i=Math.min(0,...n.map(e=>e.x))-r,a=Math.min(0,...n.map(e=>e.y))-r,o=Math.max(e,...n.map(e=>e.x+e.width))+r,s=Math.max(t,...n.map(e=>e.y+e.height))+r;return{x:i,y:a,width:o-i,height:s-a}}function Ug(e,t,n){let r=new Set;for(let i of n){let n=i.x<0,a=i.y<0,o=i.x+i.width>e,s=i.y+i.height>t;n&&a&&r.add(`00`),o&&a&&r.add(`20`),n&&s&&r.add(`02`),o&&s&&r.add(`22`)}return{left:n.some(e=>e.x<0),top:n.some(e=>e.y<0),right:n.some(t=>t.x+t.width>e),bottom:n.some(e=>e.y+e.height>t),corners:r}}function Wg(e,t,n,r,i,a=`SourceGraphic`){let o=Math.min(1,e,t),s=[{source:0,size:o,target:n.x,extent:-n.x,needed:i.left},{source:0,size:e,target:0,extent:e,needed:!0},{source:e-o,size:o,target:e,extent:n.x+n.width-e,needed:i.right}],c=[{source:0,size:o,target:n.y,extent:-n.y,needed:i.top},{source:0,size:t,target:0,extent:t,needed:!0},{source:t-o,size:o,target:t,extent:n.y+n.height-t,needed:i.bottom}],l=[],u={};return s.forEach((e,t)=>c.forEach((n,o)=>{if(t===1&&o===1||!e.needed||!n.needed||e.extent<=0||n.extent<=0||t!==1&&o!==1&&!i.corners.has(`${t}${o}`))return;let s=`${r}edge${t}${o}`;l.push(`<feOffset in="${a}" dx="0" dy="0" x="${e.source}" y="${n.source}" width="${e.size}" height="${n.size}" result="${s}"/>`);let c=t!==1&&o!==1;c&&l.push(`<feTile in="${s}" x="${e.target}" y="${n.source}" width="${e.extent}" height="${n.size}" result="${s}row"/>`),l.push(`<feTile in="${c?`${s}row`:s}" x="${e.target}" y="${n.target}" width="${e.extent}" height="${n.extent}" result="${s}tile"/>`),u[`${t}${o}`]=`${s}tile`})),{markup:l.join(``),names:u}}function Gg(e,t,n){let r=n.x<0,i=n.y<0,a=n.x+n.width>e,o=n.y+n.height>t,s=[];return r&&s.push(`01`),a&&s.push(`21`),i&&s.push(`10`),o&&s.push(`12`),r&&i&&s.push(`00`),a&&i&&s.push(`20`),r&&o&&s.push(`02`),a&&o&&s.push(`22`),s}function Kg(e,t){return e.x-2<t.x+t.w+2&&t.x-2<e.x+e.w+2&&e.y-2<t.y+t.h+2&&t.y-2<e.y+e.h+2}var qg=e=>e.width*e.height;function Jg(e,t){let n=Math.min(e.x,t.x),r=Math.min(e.y,t.y);return{x:n,y:r,width:Math.max(e.x+e.width,t.x+t.width)-n,height:Math.max(e.y+e.height,t.y+t.height)-r}}function Yg(e,t,n){let r=[],i=e=>qg(e.crop)+n.sampled*qg(e.sampled)+(n.output+(e.members.length>1?4:0))*qg(e.output)+e.images;for(let n of e){let e=t(n),a={...e,members:[n],images:4*qg(e.output)},o=-1,s=0,c;for(let[e,t]of r.entries()){let r={output:Jg(t.output,a.output),crop:Jg(t.crop,a.crop),sampled:Jg(t.sampled,a.sampled),members:[...t.members,n],images:t.images+a.images},l=i(t)+i(a)-i(r);l>s&&(o=e,s=l,c=r)}c?r[o]=c:r.push(a)}return r.map(e=>e.members)}var Xg=(e,t,n=0)=>e.x<t.x+t.w+n&&t.x-n<e.x+e.w&&e.y<t.y+t.h+n&&t.y-n<e.y+e.h;function Zg(e,t){let n=new Map(e.map(e=>[e,t.source(e)])),r=new Map;for(let e of n.values())e&&r.set(e,(r.get(e)??0)+1);let i=new Map;for(let[a,o]of e.entries()){let s=n.get(o),c=s&&e.find(e=>e.element===s);if(!c||c===o||!c.maps||!o.maps||r.get(s)!==1||n.get(c)||r.has(o.element)||(c.baseOpacity??c.opacity)<.999||(o.baseOpacity??o.opacity)<.999||t.nested(c)||t.nested(o))continue;let l=c.options,u=o.options;if((l.material??`clear`)!==(u.material??`clear`)||(l.appearance??`light`)!==(u.appearance??`light`)||l.tint!==u.tint||t.refraction(c)!==t.refraction(o))continue;let d=e.indexOf(c);d>=a||e.slice(d+1,a).some(e=>e.maps&&e.opacity>=.001&&Xg(c,e,Math.max(t.reach(c),t.reach(e))))||i.set(o,c)}return i}function Qg(e,t,n,r,i,a){let o=`x="${i.x}" y="${i.y}" width="${i.width}" height="${i.height}"`,s=mf(e.serial,n),c=mf(t.serial,n),l=Math.max(0,Math.min(1,e.opacity/(e.baseOpacity||1))),u=(e,t)=>`<feMerge result="${r}" ${o}><feMergeNode in="${e}"/><feMergeNode in="${t}"/></feMerge>`,d=`<feComponentTransfer in="${s}" result="${s}faded" ${o}><feFuncA type="linear" slope="${l}"/></feComponentTransfer>`,f=a(e,n,s)+a(t,n,c)+d;return n===`field`?f+u(`${s}faded`,c):f+`<feComposite in="${s}faded" in2="${mf(t.serial,`field`)}" operator="out" result="${s}under" ${o}/>`+u(`${s}under`,c)}function $g(e,t,n=!1){let r=Math.abs(t),i=e=>!n||t<0?r+3:Math.min(r,Math.max(0,r-e/2)+r/255)+3,a=i(e.width),o=i(e.height);return{x:e.x-a,y:e.y-o,width:e.width+2*a,height:e.height+2*o}}function e_(e){if(!e.length)throw RangeError(`At least one sampling box is required.`);let t=Math.min(...e.map(e=>e.x)),n=Math.min(...e.map(e=>e.y));return{x:t,y:n,width:Math.max(...e.map(e=>e.x+e.width))-t,height:Math.max(...e.map(e=>e.y+e.height))-n}}function t_(e,t){let n=new Map;for(let t of e){if(t.options.material!==`regular`||t.inputs.length)continue;let e=t.options.appearance??`light`,r=n.get(e)??[];r.push(t),n.set(e,r)}let r=new Map,i=e=>`x="${e.x}" y="${e.y}" width="${e.width}" height="${e.height}"`;for(let[e,a]of n){let n=Ph.regular[e],o=Ph.regular.blur*t,s=n.fillSigma*t,c=Math.ceil(3*o)+2,l=Math.ceil(3*s)+2,u=(e,t)=>({x:e.x-t,y:e.y-t,width:e.width+2*t,height:e.height+2*t}),d=e=>e.width*e.height,f=e=>3*d(u(e,c))+3*d(u(e,l))+2*d(e),p=[];for(let e of a){let t=-1,n=0,r=e.bounds;for(let[i,a]of p.entries()){let o=e_([a.bounds,e.bounds]),s=f(a.bounds)+f(e.bounds)-f(o);s>n&&(t=i,n=s,r=o)}t<0?p.push({members:[e],bounds:e.bounds}):(p[t].members.push(e),p[t].bounds=r)}for(let{members:t,bounds:a}of p){let d=i(u(a,c)),f=i(u(a,l)),p=i(a),m=t.length===1?t[0].id:`shared${e===`dark`?`Dark`:`Light`}-${t.map(e=>e.id).sort().join(`-`)}`,h={result:`${m}mix`,markup:`<feGaussianBlur in="SourceGraphic" stdDeviation="${o}" result="${m}frost" ${d}/><feGaussianBlur in="SourceGraphic" stdDeviation="${s}" result="${m}fill" ${f}/><feBlend in="${m}frost" in2="${m}fill" mode="${e===`dark`?`darken`:`lighten`}" result="${m}blend" ${p}/><feComposite in="${m}blend" in2="${m}frost" operator="arithmetic" k2="${n.fillOpacity}" k3="${1-n.fillOpacity}" k4="0" result="${m}mix" ${p}/>`};for(let e of t)r.set(e.key,h)}}return r}function n_(e,t,n,r,i=!1){let{a,b:o,mix:s}=n,c=(t,n)=>Sf(t.maps,e,n,t.x-2,t.y-2,t.w+4,t.h+4);return i&&(a===o||a.maps===o.maps&&a.x===o.x&&a.y===o.y&&a.w===o.w&&a.h===o.h)?c(a,t):c(a,`${t}A`)+c(o,`${t}B`)+`<feComposite in="${t}A" in2="${t}B" operator="arithmetic" k1="0" k2="${(1-s).toFixed(4)}" k3="${s.toFixed(4)}" k4="0" result="${t}" x="${r.x-2}" y="${r.y-2}" width="${r.w+4}" height="${r.h+4}"/>`}var r_=e=>e.appearance===`dark`;function i_(e,t,n,r=1){let i=r_(n)?Ph.regular.dark:Ph.regular.light;return{markup:`<feGaussianBlur in="${t}" stdDeviation="${Ph.regular.blur*r}" result="${e}frost"/><feGaussianBlur in="${t}" stdDeviation="${i.fillSigma*r}" result="${e}fill"/><feBlend in="${e}frost" in2="${e}fill" mode="${r_(n)?`darken`:`lighten`}" result="${e}blend"/><feComposite in="${e}blend" in2="${e}frost" operator="arithmetic" k2="${i.fillOpacity}" k3="${1-i.fillOpacity}" result="${e}mix"/>`,result:`${e}mix`}}function a_(e,t,n){if(t.material===`regular`){let[n,r,i,a]=(r_(t)?Ph.regular.dark:Ph.regular.light).tone,o=Array.from({length:33},(e,a)=>{let o=a/32,s=n+r*o+i*o*o,c=r_(t)?.9:.8;return c*s+(1-c)*o}).join(` `);return`<feComponentTransfer in="${e}refracted" result="${e}tone"><feFuncR type="table" tableValues="${o}"/><feFuncG type="table" tableValues="${o}"/><feFuncB type="table" tableValues="${o}"/></feComponentTransfer><feColorMatrix in="${e}tone" type="saturate" values="${a}" result="${e}color"/>`}let r=r_(t)?Ph.clear.dark:Ph.clear.light,i=Array.from({length:33},(e,i)=>{let a=i/32,o=a+r.shadowLift*(1-a)**3-r.highlightRolloff*a**3,s=r_(t)?.38*a+.2:.78*a+.26,c=r_(t)?.14:.06,l=r_(t)&&n?.08*(1-a):0;return Math.max(0,Math.min(1,(1-c)*o+c*s+l))}).join(` `);return`<feComponentTransfer in="${e}refracted" result="${e}color"><feFuncR type="table" tableValues="${i}"/><feFuncG type="table" tableValues="${i}"/><feFuncB type="table" tableValues="${i}"/></feComponentTransfer>`}function o_(e){return e.tint&&/^#[\da-f]{6}$/i.test(e.tint)?[1,3,5].map(t=>parseInt(e.tint.slice(t,t+2),16)/255):void 0}function s_(e,t,n){let r=t.material===`regular`?.78:.68;return{markup:`<feColorMatrix in="${e}color" type="saturate" values="0" result="${e}luminance"/><feComponentTransfer in="${e}luminance" result="${e}tinted">${[`R`,`G`,`B`].map((e,t)=>`<feFunc${e} type="linear" slope="${n[t]*(1-r)}" intercept="${n[t]*r}"/>`).join(``)}<feFuncA type="linear" slope="${1-r}" intercept="${r}"/></feComponentTransfer>`,color:`${e}tinted`}}function c_(e,t,n,r){let i=r_(n)?.82:1;return`<feComponentTransfer in="${e}" result="${t}">${[`R`,`G`,`B`].map((e,t)=>`<feFunc${e} type="linear" slope="${(.45+.55*r[t])/i}"/>`).join(``)}</feComponentTransfer>`}var l_=0,u_=`http://www.w3.org/2000/svg`,d_=/^(area|base|br|col|embed|hr|img|input|link|meta|source|track|wbr)$/i;function f_(e){let t=++l_,n=e.ownerDocument,r=n.createElementNS(u_,`svg`);r.setAttribute(`aria-hidden`,`true`),r.setAttribute(`width`,`0`),r.setAttribute(`height`,`0`),r.style.position=`absolute`,r.style.pointerEvents=`none`;let i=n.createElementNS(u_,`defs`);r.append(i),n.body.append(r);let a=new Map,o,s=(e,t,n)=>{e.written.get(t)!==n&&(e.written.set(t,n),e.element.style.setProperty(t,n))},c=(e,t)=>{t.element.remove(),t.isolation?t.host.style.isolation=t.isolation:t.host.style.removeProperty(`isolation`),a.delete(e)},l=e=>`-moz-element(#${CSS.escape(e.id)})`;return{update(e,r,d,f){o?.element!==r&&(o&&u(),o={element:r,original:r.getAttribute(`id`),id:r.id||`lg-content-${t}`},r.id||=o.id);let p=new Set,m=[],h=[];for(let r of e){if(d_.test(r.element.tagName))continue;p.add(r.serial);let e=a.get(r.serial);if(e&&e.host!==r.element&&(c(r.serial,e),e=void 0),!e){let i=n.createElement(`div`);i.className=`lg-glass-layer`,i.setAttribute(`aria-hidden`,`true`),i.id=`lg-layer-${t}-${r.serial}`,e={element:i,host:r.element,base:`lg-lens-${t}-${r.serial}`,isolation:r.element.style.isolation,written:new Map},r.element.style.isolation=`isolate`,r.element.append(i),a.set(r.serial,e)}let i=r.options,o=r.frame,s=i.material===`regular`?Math.max(Ph.regular.blur,(i.appearance===`dark`?Ph.regular.dark:Ph.regular.light).fillSigma):0,l=Math.ceil(3*s+r.refraction+4),u={left:d.left+r.x-2,top:d.top+r.y-2,width:r.w+4,height:r.h+4},f={left:u.left-l,top:u.top-l,width:u.width+2*l,height:u.height+2*l};e.screen=f;let m={left:(f.left-o.left)/o.sx-o.clientLeft,top:(f.top-o.top)/o.sy-o.clientTop,width:f.width/o.sx,height:f.height/o.sy},g={left:l/o.sx,top:l/o.sy,width:u.width/o.sx,height:u.height/o.sy};h.push({lens:r,layer:e,screen:f,local:m,lens_:g})}for(let[e,t]of a)p.has(e)||c(e,t);for(let{lens:e,layer:t,screen:n,local:i,lens_:o}of h){let c=e.frame,u=e.options,p=(e,t)=>[(e-n.left)/c.sx,(t-n.top)/c.sy],h=[];for(let n of[...e.parents,...[...e.beneath].reverse()]){let e=a.get(n.serial);e?.screen&&e!==t&&h.push({image:l(e.element),box:e.screen})}let g=e.parents[0],_=g&&a.get(g.serial)?.screen,v=g&&_&&g.opacity>=.999&&_.left<=n.left&&_.top<=n.top&&_.left+_.width>=n.left+n.width&&_.top+_.height>=n.top+n.height;v||h.push({image:l(r),box:d});let y=v||!f?[]:f.regions.flatMap(e=>{let[t,n]=p(d.left+f.left+e.x,d.top+f.top+e.y),r={...e,x:t,y:n,width:e.width/c.sx,height:e.height/c.sy,blur:e.blur/Math.max(c.sx,c.sy),refraction:e.refraction/Math.max(c.sx,c.sy)},a=3*r.blur+r.refraction;return r.x<i.width+a&&r.x+r.width>-a&&r.y<i.height+a&&r.y+r.height>-a?[r]:[]});y.length&&m.push(Bg(`${t.base}-blur`,y,i.width,i.height,`gecko`)),s(t,`left`,`${i.left}px`),s(t,`top`,`${i.top}px`),s(t,`width`,`${i.width}px`),s(t,`height`,`${i.height}px`),s(t,`opacity`,String(Math.round(e.opacity*1e3)/1e3)),s(t,`background-image`,h.map(e=>e.image).join(`, `)),s(t,`background-position`,h.map(e=>{let[t,n]=p(e.box.left,e.box.top);return`${t}px ${n}px`}).join(`, `)),s(t,`background-size`,h.map(e=>`${e.box.width/c.sx}px ${e.box.height/c.sy}px`).join(`, `));let b=`x="${o.left}" y="${o.top}" width="${o.width}" height="${o.height}"`,x=(t,n)=>{if(!e.place)return Sf(e.maps,t,n,o.left,o.top,o.width,o.height);let r=e=>{let[t,n]=p(d.left+e.x,d.top+e.y);return{maps:e.maps,x:t,y:n,w:e.w/c.sx,h:e.h/c.sy}},[i,a]=p(d.left+e.x,d.top+e.y);return n_(t,n,{a:r(e.place.a),b:r(e.place.b),mix:e.place.mix},{x:i,y:a,w:e.w/c.sx,h:e.h/c.sy})},S=Math.max(c.sx,c.sy),C=`SourceGraphic`,w=[x(`field`,`lfield`)];if(u.material===`regular`){let e=i_(`l`,C,u,1/S);w.push(e.markup),C=e.result}w.push(`<feDisplacementMap in="${C}" in2="lfield" scale="${2*e.refraction/S}" xChannelSelector="R" yChannelSelector="G" ${b} result="lrefracted"/>`,a_(`l`,u,e.parents.length>0));let T=`lcolor`,E=`loverlay`,D=o_(u);if(D){let e=s_(`l`,u,D);w.push(e.markup),T=e.color,E=`ltintOverlay`}w.push(`<feComposite in="${T}" in2="lfield" operator="in" ${b} result="linside"/>`,x(`overlay`,`loverlay`),...D?[c_(`loverlay`,E,u,D)]:[],`<feMerge ${b} result="lglass"><feMergeNode in="linside"/><feMergeNode in="${E}"/></feMerge>`);let O=w.join(``).replace(/<(feComponentTransfer|feColorMatrix)\b(?![^>]*\sx=")([^>]*?)(\/?)>/g,`<$1$2 ${b}$3>`);m.push(`<filter id="${t.base}" x="0" y="0" width="1" height="1" filterUnits="objectBoundingBox" primitiveUnits="userSpaceOnUse" color-interpolation-filters="sRGB">${O}</filter>`)}let g=Jh(i,m,bf),_=new Set(m.map(e=>/id="([^"]+)"/.exec(e)[1]));for(let{layer:e}of h){let t=`${e.base}-blur`;s(e,`filter`,[_.has(t)?`url("#${g(t)}")`:``,`url("#${g(e.base)}")`].filter(Boolean).join(` `))}},owns(e){if(r.contains(e))return!0;for(let t of a.values())if(t.element.contains(e))return!0;return!1},dispose(){for(let[e,t]of a)c(e,t);r.remove(),u()}};function u(){if(!o)return;let{element:e,original:t,id:n}=o;e.id===n&&t===null&&e.removeAttribute(`id`),o=void 0}}var p_=(e,t)=>e.x<t.x+t.width&&t.x<e.x+e.width&&e.y<t.y+t.height&&t.y<e.y+e.height,m_=e=>`x="${e.x}" y="${e.y}" width="${e.width}" height="${e.height}"`,h_=e=>{let t=Math.floor(e.x),n=Math.floor(e.y);return{x:t,y:n,width:Math.ceil(e.x+e.width)-t,height:Math.ceil(e.y+e.height)-n}},g_=(e,t,n)=>`<feMerge result="${t}"${n?` ${m_(n)}`:``}>${e.map(e=>`<feMergeNode in="${e}"/>`).join(``)}</feMerge>`;function __(e,t=`scene`,n=`SourceGraphic`){if(!e.length)return g_([n],t);let r=[];e.forEach((e,t)=>{let n={members:[t],bounds:h_(e.bounds)};for(let e=0;e<r.length;){if(!p_(n.bounds,r[e].bounds)){e++;continue}let t=r.splice(e,1)[0];n={members:[...n.members,...t.members],bounds:h_(e_([n.bounds,t.bounds]))},e=0}n.members.sort((e,t)=>e-t),r.push(n)});let i=[],a=[],o=[];r.forEach((r,s)=>{if(r.members.length===1){let t=e[r.members[0]];a.push(t.mask),o.push(...t.layers);return}let c=`${t}-group${s}`,l=m_(r.bounds),u=`${c}-area`;i.push(`<feFlood flood-color="white" ${l} result="${u}"/>`),a.push(u);let d=`${c}-source`;i.push(`<feComposite in="${n}" in2="${u}" operator="in" ${l} result="${d}"/>`);for(let n of r.members){let a=e[n],o=`${t}-${a.id}-outside`,s=`${t}-${a.id}-output`;i.push(`<feComposite in="${d}" in2="${a.mask}" operator="out" ${l} result="${o}"/>`),i.push(g_([o,...a.layers],s,r.bounds)),d=s}o.push(d)});let s=a[0];return a.length>1&&(i.push(g_(a,`${t}-areas`,e_(r.map(e=>e.bounds)))),s=`${t}-areas`),i.push(`<feComposite in="${n}" in2="${s}" operator="out" result="${t}-outside"/>`),i.push(g_([`${t}-outside`,...o],t)),i.join(``)}var v_=0,y_=0,b_=`transform`;function x_(e){let t=e.promoted;e.promoted=void 0,t&&!t.value&&e.element.style.getPropertyValue(`will-change`)===b_&&e.element.style.removeProperty(`will-change`)}var S_=1,C_=e=>JSON.stringify(hf(e)??e);function w_(e,t){let n=1;for(let r=e;r&&r!==t;r=r.parentElement){let e=Number(getComputedStyle(r).opacity);if(Number.isFinite(e)&&(n*=e),n<.001)return 0}return n}var T_=`http://www.w3.org/2000/svg`;function E_(e,t={}){let n=dh&&!t.layers?_g(e):void 0,r=++v_,i=document.createElementNS(T_,`svg`);i.setAttribute(`aria-hidden`,`true`),i.setAttribute(`width`,`0`),i.setAttribute(`height`,`0`),i.style.position=`absolute`,i.style.inset=`0`,i.style.pointerEvents=`none`;let a=document.createElementNS(T_,`defs`);i.append(a),e.append(i);let o=Math.max(1,Math.min(64,Math.floor(t.maxSurfaces??16))),s=``,c,l,u=null,d=!1,f=!0,p=``,m=new Set,h=new Set,g=0,_=0,v=!1,y=0,b=n=>{n??=c??l??[...m].find(e=>e.error)?.error;let r=[...m].filter(e=>e.maps),i=String(r.length===m.size&&!n);e.dataset.glassReady!==i&&(e.dataset.glassReady=i);let a=`${m.size},${r.length},${n?.message??``},${r.reduce((e,t)=>e+t.maps.duration,0)}`;s!==a&&(s=a,t.onDiagnostic?.({surfaces:m.size,maps:r.length,mapTime:r.reduce((e,t)=>e+t.maps.duration,0),error:n}),e.dispatchEvent(new CustomEvent(`glass:diagnostic`,{detail:{surfaces:m.size,maps:r.length,error:n?.message}})))},x=Vg(e,e=>b(e)),S=t.layers?{warm(e){},has:e=>!0,owns:e=>!1,dispose(){}}:ag(e),C=typeof navigator<`u`?setTimeout(()=>{cf().then(e=>e.warmed).catch(()=>void 0)},600):void 0,w=``,T=0,E=`${Hh()} ${devicePixelRatio}`,D=t.layers??(fh?f_(e):void 0),O={left:0,top:0,width:0,height:0},k=``,A=e=>{let n=e.style.getPropertyValue(`filter`);return{original:n,base:/^(initial|inherit|unset|revert|revert-layer)$/i.test(n.trim())?getComputedStyle(e).filter:n,priority:e.style.getPropertyPriority(`filter`),releasePaint:dh&&!t.layers?gg(e):void 0}},j=(e,t,n)=>{let r=t.base.trim().toLowerCase()===`none`?``:t.base,i=n?[r,n].filter(Boolean).join(` `):t.original;(e.style.getPropertyValue(`filter`)!==i||e.style.getPropertyPriority(`filter`)!==t.priority)&&e.style.setProperty(`filter`,i,t.priority),t.applied=e.style.getPropertyValue(`filter`)},M=(e,t)=>{t.applied!==void 0&&e.style.getPropertyValue(`filter`)===t.applied&&e.style.getPropertyPriority(`filter`)===t.priority&&(t.original?e.style.setProperty(`filter`,t.original,t.priority):e.style.removeProperty(`filter`)),t.releasePaint?.()},N,P,F=``,I=new Map,L=new Set,R=e=>{N&&M(e,N),P&&(M(P.element,P.style),P.element.removeAttribute(`data-glass-blur-active`)),P=void 0,N=void 0},z=e=>{let t=I.get(e);t!==void 0&&(M(e,t),I.delete(e))},ee=(e,t)=>{if(e.options.refraction!==void 0)return e.options.refraction;if(!t.length)return Ph[e.options.material??`clear`].refraction;let n=Math.min(...t.map(t=>Math.min(e.x-t.x,e.y-t.y,t.x+t.w-e.x-e.w,t.y+t.h-e.y-e.h)));return Math.max(0,Math.min(8,n*.6))},B=e=>[...m].filter(t=>t!==e&&t.element.contains(e.element)),te=(e,t)=>e.options.material===`regular`?Math.max(Ph.regular.blur,(e.options.appearance===`dark`?Ph.regular.dark:Ph.regular.light).fillSigma)*t:0,V=0,H=-1,ne=[],re=()=>(H!==V&&(ne=[...m].sort((e,t)=>Fh(e.element,t.element)),H=V),ne),ie=-1,ae=[],oe=()=>(ie!==V&&(ae=[...re(),...L].sort((e,t)=>Fh(e.element,t.element)),ie=V),ae);function se(e,t){if(!u)return;if(!e||!t){N&&j(u,N,``);return}(i.getAttribute(`width`)!==String(e)||i.getAttribute(`height`)!==String(t))&&(i.setAttribute(`width`,String(e)),i.setAttribute(`height`,String(t)),i.setAttribute(`viewBox`,`0 0 ${e} ${t}`));let n=`lg-${r}`,o=[],s=[],l=re(),d=dh?Zg(l,{source:e=>e.outline?.detachedSource(),nested:e=>B(e).length>0,refraction:e=>ee(e,B(e)),reach:e=>Math.ceil(3*te(e,1)+ee(e,B(e))+8)+2}):new Map,f=new Set(d.values()),p=e=>e.length===2&&d.get(e[1])===e[0]?{source:e[0],popup:e[1]}:void 0,m=l.filter(e=>e.maps&&(e.opacity>=.001||f.has(e))),h=new Map(m.map(e=>[e,B(e)])),g=new Map(m.map(e=>[e,ee(e,h.get(e))])),_=e=>g.get(e)+4,v=(e,t)=>e.x<t.x+t.w&&t.x<e.x+e.w&&e.y<t.y+t.h&&t.y<e.y+e.h,y=(e,t)=>{let n=Math.max(_(e),_(t));return e.x<t.x+t.w+n&&t.x-n<e.x+e.w&&e.y<t.y+t.h+n&&t.y-n<e.y+e.h},S=e=>`${e.options.material??`clear`},${e.options.appearance??`light`},${e.options.tint??``},${g.get(e)}`,C=e=>dh&&e.opacity>=.999&&!h.get(e).length,E=e=>C(e)&&!m.some(t=>t!==e&&y(e,t)&&(!C(t)||S(t)!==S(e)||Kg(e,t))),k=[],M=new Map;for(let e of m){if(f.has(e))continue;let t=d.get(e);if(t){k.push([t,e]);continue}if(!E(e)){k.push([e]);continue}let n=S(e),r=M.get(n);r||(r=[],M.set(n,r),k.push(r)),r.push(e)}let F=new Map(k.flatMap(e=>e.map(t=>[t,e]))),L=Bh(),R=new Map(m.map(e=>{let t=e.options.appearance===`dark`?Ph.regular.dark:Ph.regular.light,n=e.options.material===`regular`?mh(Ph.regular.blur)+mh(t.fillSigma):0;return[e,L*(n+g.get(e))]})),V=e=>e.reduce((e,t)=>e+Math.max(...t.map(e=>R.get(e)))+(t.length===1||p(t)?m.filter(e=>!t.includes(e)&&t.some(t=>v(e,t))).reduce((e,t)=>Math.max(e,R.get(t)),0):0),0),H=gh(e*L,t*L,V(k)),ne=new Map(m.map(e=>[e,g.get(e)*H])),ie=new Map(m.map(e=>{let t=e.place,n=!d.has(e)&&!f.has(e)&&(t?t.stretched&&t.a.x===t.b.x&&t.a.y===t.b.y&&t.a.w===t.b.w&&t.a.h===t.b.h:!(!e.shown||e.shown.outline));return[e,$g({x:e.x-2,y:e.y-2,width:e.w+4,height:e.h+4},ne.get(e),n)]})),ae=e=>{let t=Math.ceil(3*te(e,H)+ne.get(e)+8);return{x:e.x-2-t,y:e.y-2-t,width:e.w+4+2*t,height:e.h+4+2*t}},se=k.flatMap(e=>{if(e.length<2||p(e))return[e];let t=e[0].options.material===`regular`,n=/^#[\da-f]{6}$/i.test(e[0].options.tint??``);return Yg(e,e=>{let t={x:e.x-2,y:e.y-2,width:e.w+4,height:e.h+4},n=ne.get(e)+3;return{output:t,crop:ae(e),sampled:{x:t.x-n,y:t.y-n,width:t.width+2*n,height:t.height+2*n}}},{output:(t?4:3)+(n?3:0),sampled:t?4:0})});!fh&&gh(e*L,t*L,V(se))>=H&&(k=se);let ce=e=>e.length>1?`g${e.map(e=>e.serial).sort((e,t)=>e-t).join(`-`)}`:`s${e[0].serial}`,le=m.map(ae),ue=e=>{let t=Math.min(...e.map(e=>e.x)),n=Math.min(...e.map(e=>e.y));return{x:t,y:n,width:Math.max(...e.map(e=>e.x+e.width))-t,height:Math.max(...e.map(e=>e.y+e.height))-n}},U=Hg(e,t,le,0),de=e=>`x="${e.x}" y="${e.y}" width="${e.width}" height="${e.height}"`,fe=n=>{let r=new Map(n.flatMap(e=>e.map(t=>[t,e]))),i=n.flat().map(e=>dh?ie.get(e):ae(e)),a=n.length?Wg(e,t,dh?e_(i):U,`scene`,Ug(e,t,i)):{markup:``,names:{}},o=[a.markup],s=`SourceGraphic`,c=new Map(n.map((e,t)=>{let r=p(e)?.popup??e[0];return[e,e.length>1&&!p(e)?[]:n.slice(0,t).flat().filter(t=>F.get(t)!==F.get(r)&&e.some(e=>Xg(t,e,_(r))))]})),l=dh?t_(n.map(e=>({key:e,id:ce(e),options:(p(e)?.popup??e[0]).options,bounds:e_(e.map(e=>ie.get(e))),inputs:c.get(e)})),H):void 0,u=new Set,d=new Map,f=new Map;return n.forEach(n=>{let i=p(n),m=i?.popup??n[0],g=m.options,_=ce(n),v=ue(n.map(e=>({x:e.x-2,y:e.y-2,width:e.w+4,height:e.h+4}))),y=v.x,b=v.y,x=v.width,S=v.height,C=(e,t)=>{let r=(t,n,r=e)=>{let i=t.place,a=t.clipBounds,o=a?`${n}Unclipped`:n,s=i?n_(r,o,i,t,fh):Sf(t.maps,r,o,t.x-2,t.y-2,t.w+4,t.h+4);return a?s+`<feFlood flood-color="white" ${de(a)} result="${n}Viewport"/><feComposite in="${o}" in2="${n}Viewport" operator="in" result="${n}" ${de(a)}/>`:s};return i?Qg(i.source,i.popup,e,t,v,(e,t,n)=>r(e,n,t)):n.length===1?r(m,t):n.map(t=>r(t,mf(t.serial,e))).join(``)+`<feMerge result="${t}" ${de(v)}>${n.map(t=>`<feMergeNode in="${mf(t.serial,e)}"/>`).join(``)}</feMerge>`},w=n.length>1||m.opacity>=.999,T=o.length;o.push(C(`field`,`${_}field`),...w?[]:[`<feComponentTransfer in="${_}field" result="${_}mask"><feFuncA type="linear" slope="${m.opacity}"/></feComponentTransfer>`]);let E=w?`${_}field`:`${_}mask`,D=h.get(m),O=ue(n.map(ae)),k=c.get(n),A=[];for(let e of k)if(n.some(t=>Xg(e,t)))A.push(...d.get(r.get(e)));else{let t=`s${e.serial}`;o.push(Sf(e.maps,`overlay`,`${_}by${t}overlay`,e.x-2,e.y-2,e.w+4,e.h+4)),A.push(`${_}by${t}overlay`)}let j=Gg(e,t,O).map(e=>a.names[e]).filter(e=>!!e);(j.length||A.length)&&o.push(`<feMerge result="${_}crop" ${de(O)}>${j.map(e=>`<feMergeNode in="${e}"/>`).join(``)}<feMergeNode in="${s}"/>${A.map(e=>`<feMergeNode in="${e}"/>`).join(``)}</feMerge>`);let M=j.length||A.length?`${_}crop`:s,N=M;if(g.material===`regular`){let e=l?.get(n);if(e)u.has(e.result)||(o.push(e.markup),u.add(e.result)),N=e.result;else{let e=i_(_,M,g,H);o.push(e.markup),N=e.result}}let P=ne.get(m);o.push(`<feDisplacementMap in="${N}" in2="${_}field" scale="${P*2}" xChannelSelector="R" yChannelSelector="G" result="${_}refracted"/>`,a_(_,g,D.length>0));let F=`${_}color`,I=`${_}overlay`,L=o_(g);if(L){let e=s_(_,g,L);o.push(e.markup),F=e.color,I=`${_}tintOverlay`}o.push(`<feComposite in="${F}" in2="${E}" operator="in" result="${_}inside"/>`,C(`overlay`,`${_}overlay`),...L?[c_(`${_}overlay`,I,g,L)]:[],...w?[]:[`<feComponentTransfer in="${I}" result="${_}fadedOverlay"><feFuncA type="linear" slope="${m.opacity}"/></feComponentTransfer>`]);let R=e_(n.map(e=>ie.get(e))),z=new Set([`frost`,`fill`,`blend`,`mix`,...dh?[`refracted`]:[]].map(e=>`${_}${e}`));for(let e=T;e<o.length;e++)o[e]=o[e].replace(/<(feFlood|feComposite|feDisplacementMap|feColorMatrix|feComponentTransfer|feGaussianBlur|feBlend)\b([^>]*?)(\/?)>/g,(e,t,n,r)=>{if(/\sx="/.test(n))return e;let i=z.has(/result="([^"]+)"/.exec(n)?.[1]??``)?R:{x:y,y:b,width:x,height:S};return`<${t}${n} x="${i.x}" y="${i.y}" width="${i.width}" height="${i.height}"${r}>`});let ee=[`${_}inside`,w?I:`${_}fadedOverlay`];d.set(n,ee),f.set(n,E)}),n.length&&o.push(__(n.map(e=>({id:ce(e),mask:f.get(e),layers:d.get(e),bounds:e_(e.map(e=>({x:e.x-2,y:e.y-2,width:e.w+4,height:e.h+4})))})))),o.join(``)};c=void 0;try{rp(m.flatMap(e=>[e.maps,e.place?.a.maps,e.place?.b.maps].filter(e=>!!e)))}catch(e){b(e instanceof Error?e:Error(String(e)));return}if(D){let e=new Map(m.filter(e=>e.frame).map(e=>[e,{serial:e.serial,element:e.element,options:e.options,maps:e.maps,place:e.place,x:e.x,y:e.y,w:e.w,h:e.h,opacity:e.opacity,refraction:g.get(e),frame:e.frame,clipBounds:e.clipBounds,parents:[],beneath:[]}]));for(let[t,n]of e){n.parents.push(...h.get(t).map(t=>e.get(t)).filter(e=>e!==void 0));for(let r of m){if(r===t)break;let i=e.get(r);i&&!n.parents.includes(i)&&!t.element.contains(r.element)&&Xg(r,t,_(t))&&n.beneath.push(i)}}D.update([...e.values()],u,O,P?.matches?{left:0,top:0,regions:x.regions()}:void 0)}else if(m.length){let r=fe(k);if(dh){let n=vh(r),i=n+T,a=gh(e*L,t*L,i*L),o=n?Math.max(0,Math.min(1,(i*a-T)/n)):1;o<1&&(r=r.replace(/(<fe(?:GaussianBlur|DisplacementMap)\b[^>]*?\s(?:stdDeviation|scale)=")([^"]+)(")/g,(e,t,n,r)=>t+n.split(` `).map(e=>Number(e)*o).join(` `)+r));let s=dg(r,e,t,x.regions()),c=n*o+T>Vh(e,t),l=Math.min(c?2*s:s,_h(e*L,t*L)/L,c?1/0:Vh(e,t,.85))-T;l>n*o&&(r=fg(r,Math.floor(l),e,t,c))}let i=`${n}-scene`;o.push(`<filter id="${i}" x="${U.x/e}" y="${U.y/t}" width="${U.width/e}" height="${U.height/t}" filterUnits="objectBoundingBox" primitiveUnits="userSpaceOnUse" color-interpolation-filters="sRGB">${r}</filter>`),s.push(i)}let pe=new Map,me=new Map,he=oe(),ge=new Map(he.map((e,t)=>[e,t]));D||he.forEach(e=>{if(!e.w||!e.h||e.opacity<.001)return;let t=l.filter(t=>ge.get(e)<ge.get(t)&&t.maps&&t.opacity>.001&&Ih(e,t)&&t.absorbs?.element!==e.element&&!e.element.contains(t.element)&&!t.element.contains(e.element)&&![...me].some(([n,r])=>n.element.contains(e.element)&&r.includes(t)));if(!t.length)return;let r=`${n}-f${e.serial}`;o.push(Lh(r,e,t)),pe.set(e.element,r),me.set(e,t)});for(let e of I.keys())pe.has(e)||z(e);let _e=Jh(a,o,bf);for(let[e,t]of pe)I.has(e)||I.set(e,A(e)),j(e,I.get(e),`url("#${_e(t)}")`);w=s.map(e=>`url("#${_e(e)}")`).join(` `),b()}function ce(e,t,n){let r=C_(t);if(e.prepared.has(r)||e.preparing.has(r))return;let i=Wf(t);if(i){let n=S.has(i);S.warm(i),e.prepared.set(r,{geometry:t,maps:i,ready:n?0:performance.now()+50}),f=!0;return}e.preparing.add(r),g++,Uf(t,n).then(n=>{if(e.preparing.delete(r),!d&&m.has(e)&&e.path?.some(e=>C_({...e,dpr:t.dpr,appearance:t.appearance})===r)){let i=S.has(n);S.warm(n),e.prepared.set(r,{geometry:t,maps:n,ready:i?0:performance.now()+50}),f=!0}}).catch(()=>{e.preparing.delete(r)}).finally(()=>{g--,U.wake()})}function le(e,t,n){let r=n?C_(t):JSON.stringify(t);if(e.wanted=r,r===e.key||e.inflight)return;let i=n?Wf(t):Gf(t);if(i&&(S.has(i)||!e.maps)){e.key=r,S.warm(i),e.maps=i,e.shown=t,e.error=void 0,f=!0;return}e.key=r,e.inflight=!0,g++,(n?Uf(t):Hf(t)).then(n=>{if(e.inflight=!1,d||!m.has(e))return;if(dh&&!e.maps&&e.wanted!==r){e.key=void 0,U.wake();return}let i=S.has(n);S.warm(n);let a=()=>{!d&&m.has(e)&&(e.maps=n,e.shown=t,e.error=void 0,f=!0,U.wake())};e.maps&&!i?setTimeout(a,50):a()}).catch(t=>{e.inflight=!1,!d&&m.has(e)&&e.key===r&&(e.error=t instanceof Error?t:Error(String(t)),b(e.error))}).finally(()=>{g--,U.wake()})}function ue(n){if(d||document.hidden)return!1;let r=[],i=sg(e,n),a=!1,o=!1,s=(u??e).getBoundingClientRect(),c=u?u.offsetWidth:e.clientWidth,_=u?u.offsetHeight:e.clientHeight;O={left:0,top:0,width:s.width,height:s.height};let S=`${c},${_}`;S!==p&&(f=!0,p=S),h.forEach(e=>{e.frame(n,v)&&(i=!0)}),m.forEach(e=>e.animators.forEach(e=>{e.frame(n,v)&&(i=!0)}));let C=[...m].some(e=>e.outline?.pending());v=C;let A=(e,t)=>C_({width:t.width,height:t.height,radius:t.radius,outline:t.outline,dpr:t.dpr??S_,appearance:e.options.appearance}),M=new Map,I=(e,t)=>{e.writtenClip!==t&&(e.writtenClip=t,r.push(()=>{e.element.style.clipPath=t,e.element.style.borderRadius=`0px`}))},R=(e,t)=>{e.writtenRadius!==t&&(e.writtenRadius=t,r.push(()=>e.element.style.setProperty(`--lg-radius`,t)))};m.forEach(e=>{e.place=void 0;let t=e.outline?.geometry();if(!t)return;let r=e.outline.waypoints();if(r!==e.path){e.path=r;let t=new Set(r.map(t=>A(e,t)));for(let[n,r]of e.prepared)!t.has(n)&&r.maps!==e.maps&&e.prepared.delete(n);for(let t of r)ce(e,{width:t.width,height:t.height,radius:t.radius,outline:t.outline,dpr:t.dpr??S_,appearance:e.options.appearance},!!t.resting)}let i=t.draw;if(!i)return;let a=t=>{let r=e.prepared.get(A(e,t.shape));return r&&r.ready<=n?r:void 0},o=(e,t)=>({maps:t.maps,x:e.left-s.left,y:e.top-s.top,w:e.width,h:e.height}),c=a(i.a),l=i.b?a(i.b):c,u=!1;if(!c){let r=1/0;for(let i of e.prepared.values()){if(i.geometry.outline||i.ready>n)continue;let e=Xm(i.geometry,t);e<r&&(r=e,c=i)}u=!0}if(!c)return;let d={shape:i.a.shape,left:t.left,top:t.top,width:t.width,height:t.height},f=o(u?d:i.a,c),p=!u&&l&&i.b?o(i.b,l):f;e.place={a:f,b:p,mix:p===f?0:i.mix,stretched:u||!i.a.shape.outline&&!i.b?.shape.outline},t.absorbs&&!u&&M.set(t.absorbs.element,Math.max(M.get(t.absorbs.element)??0,t.absorbs.weight))}),m.forEach(t=>{let o=t.outline?.geometry(),c=t.place;if(D){let e=t.element.getBoundingClientRect(),n={left:e.left-s.left,top:e.top-s.top,sx:e.width/(t.element.offsetWidth||e.width||1),sy:e.height/(t.element.offsetHeight||e.height||1),clientLeft:t.element.clientLeft,clientTop:t.element.clientTop};(!t.frame||Object.entries(n).some(([e,n])=>Math.abs(n-t.frame[e])>.01))&&(f=!0),t.frame=n}let l=c?{left:Math.min(c.a.x,c.b.x)+s.left,top:Math.min(c.a.y,c.b.y)+s.top,width:Math.max(c.a.x+c.a.w,c.b.x+c.b.w)-Math.min(c.a.x,c.b.x),height:Math.max(c.a.y+c.a.h,c.b.y+c.b.h)-Math.min(c.a.y,c.b.y)}:o??(({left:e,top:t,width:n,height:r})=>({left:e,top:t,width:n,height:r}))(t.element.getBoundingClientRect()),u=l.left-s.left,d=l.top-s.top,p=l.width,m=l.height;[u-t.x,d-t.y,p-t.w,m-t.h].some(e=>Math.abs(e)>.05)&&(Object.assign(t,{x:u,y:d,w:p,h:m}),o||(t.movedAt=n),a=!0,f=!0);let h=t.options.clipTo?.(),g=!1;if(h){let e=h.getBoundingClientRect(),n={x:e.left-s.left,y:e.top-s.top,width:e.width,height:e.height};(!t.clipBounds||Object.entries(n).some(([e,n])=>Math.abs(n-t.clipBounds[e])>.01))&&(f=!0),t.clipBounds=n,g=u+p<=n.x||u>=n.x+n.width||d+m<=n.y||d>=n.y+n.height}else t.clipBounds&&(t.clipBounds=void 0,f=!0);t.baseOpacity=g||getComputedStyle(t.element).visibility===`hidden`?0:w_(t.element,e)*(t.outline?.opacity()??1);let _=t.baseOpacity*(1-(M.get(t.element)??0));Math.abs(_-t.opacity)>.001&&(t.opacity=_,f=!0);let v=Math.min(devicePixelRatio||1,2);if(o||(t.absorbs=void 0),o){i=!0,t.absorbs=o.absorbs,c?(t.maps=c.a.maps,t.shown=t.prepared.get(A(t,o.draw.a.shape))?.geometry??t.shown):t.maps=void 0,f=!0;let e=c?.stretched?t.shown:void 0,n=t.element.getBoundingClientRect(),a=(t.element.offsetWidth||1)/(n.width||1),s=(t.element.offsetHeight||1)/(n.height||1),l=!e||e.radius===`capsule`&&o.radius===`capsule`&&Math.abs(e.height-o.height)<.5?{width:o.width,height:o.height,radius:o.radius}:e,u=o.width/l.width,d=o.height/l.height,p=gm(l.width,l.height,l.radius).map(([e,t])=>[(o.left-n.left+e*u)*a,(o.top-n.top+t*d)*s]);I(t,xm(p));let m=o.radius===`capsule`?Math.min(o.width,o.height)/2:o.radius;R(t,`${m.toFixed(2)}px`);let h=t.maps?`1`:`0`;t.writtenReady!==h&&(t.writtenReady=h,r.push(()=>t.element.style.setProperty(`--lg-glass-ready`,h))),t.geometryKey=void 0,t.key=void 0;return}if(t.outline?.positioning())return;let{width:y,height:b}=um(t.element);if(!y||!b)return;let x=t.options.radius??8,S=t.resolveShape?.();if(t.resolveShape&&(!S||S.length<3)){t.maps&&(t.maps=void 0,f=!0),t.key=void 0,t.geometryKey=void 0,jm(t.element,[]),I(t,xm([]));return}jm(t.element,S);let C={outline:S,width:y,height:b,radius:x,dpr:v,appearance:t.options.appearance};if(x===`capsule`&&!S&&Math.abs(p/y-m/b)>.004){let e=gm(p,m,`capsule`).map(([e,t])=>[e*y/p,t*b/m]);I(t,xm(e)),t.geometryKey=void 0,le(t,C,!0);return}let w=JSON.stringify(C);w!==t.geometryKey&&(t.geometryKey!==void 0&&(t.resized=n),t.geometryKey=w,I(t,S?xm(S):hm(y,b,x)),R(t,`${typeof x==`number`?Math.min(x,y/2,b/2):Math.min(y,b)/2}px`));let T=x===`capsule`&&n-(t.resized??0)<500;T&&(i=!0),le(t,C,T)}),ph&&m.forEach(e=>{let t=n-(e.movedAt??-1/0)<400;t&&(o=!0),t!==!!e.promoted&&(t?(e.promoted={value:e.element.style.getPropertyValue(`will-change`),priority:e.element.style.getPropertyPriority(`will-change`)},e.promoted.value||r.push(()=>e.element.style.setProperty(`will-change`,b_))):r.push(()=>x_(e)))}),L.forEach(e=>{let t=e.element.getBoundingClientRect(),n={x:t.left-s.left,y:t.top-s.top,w:t.width,h:t.height};Object.entries(n).some(([t,n])=>Math.abs(n-e[t])>.05)&&(Object.assign(e,n),f=!0)});let z=oe().map(e=>e.serial).join(`,`);if(z!==k&&(f=!0,k=z),P){let e=P.element.getBoundingClientRect();P.matches=Math.abs(e.left-s.left)<.5&&Math.abs(e.top-s.top)<.5&&Math.abs(e.width-s.width)<.5&&Math.abs(e.height-s.height)<.5}let ee=u?x.update(u):``;if(P){let e=JSON.stringify([P.matches,x.regions()]);e!==F&&(F=e,f=!0)}let B=x.outsets();B!==T&&(T=B,f=!0);let te=`${Hh()} ${devicePixelRatio}`;te!==E&&(E=te,f=!0);let V=f,H=!t.synchronizedMotion&&(i||a)&&n-y<15,ne=f&&!C&&!H;ne&&(y=n),!C&&!H&&(f=!1);let re=x.error(),ie=l?.message!==re?.message;return l=re,r.push(()=>{if(ne&&se(c,_),u){let e=P?.matches?w:(x.scrollsContent()?[ee,w]:[w,ee]).filter(Boolean).join(` `);N&&j(u,N,e),P&&j(P.element,P.style,P.matches?ee:``)}ie&&b()}),{active:i||V||o||g>0,write:()=>{for(let e of r)e()}}}let U=Dm(ue,{root:e,ignore:e=>i.contains(e)||S.owns(e)||!!D?.owns(e),onMutation:()=>{V++}});return{setContent(e){u&&R(u),u&&U.unobserve(u),u=e,e&&(N=A(e));let t=e?.parentElement;D&&t?.hasAttribute(`data-glass-blur-host`)&&(t.setAttribute(`data-glass-blur-active`,``),P={element:t,style:A(t)}),e&&U.observe(e),f=!0,U.wake()},addSurface(t,n={}){if(m.size>=o)throw RangeError(`GlassScene supports ${o} surfaces; increase maxSurfaces up to 64 or split the scene.`);if(!Number.isFinite(n.refraction??60)||(n.refraction??60)<0)throw RangeError(`Refraction must be finite and nonnegative.`);dm(n.radius??8);let r={serial:++y_,element:t,options:n,resolveShape:n.concentric?Pm(t,typeof n.concentric==`object`?n.concentric.inset:void 0,n.radius??8):void 0,releaseShape:km(t,n.radius??8),clip:t.style.clipPath,borderRadius:t.style.borderRadius,x:0,y:0,w:0,h:0,opacity:1,animators:[],prepared:new Map,preparing:new Set},i=()=>Im(n.motion);(n.morphFrom||n.fluid)&&!n.concentric&&r.animators.push(r.outline=Nh(t,{from:n.morphFrom,morph:n.morph,layout:n.fluid,radius:n.radius??8,motion:i,neck:n.neck,enter:n.morphEnter,submenu:t.hasAttribute(`data-glass-submenu`),prepared:e=>{let t=r.prepared.get(C_({width:e.width,height:e.height,radius:e.radius,outline:e.outline,dpr:e.dpr??S_,appearance:n.appearance}));return!!t&&t.ready<=performance.now()}})),n.interactive&&(r.animators.push(Bm(t,i)),t.dataset.glassInteractive!==``&&(t.dataset.glassInteractive=``));let a=t.getAttribute(`data-glass-appearance`);return a!==(n.appearance??`light`)&&(t.dataset.glassAppearance=n.appearance??`light`),m.add(r),U.observe(t),V++,f=!0,n.morphFrom&&(_++,e.dataset.glassPopup=``),U.wake(),()=>{r.animators.forEach(e=>e.dispose()),n.interactive&&delete t.dataset.glassInteractive,jm(t),r.releaseShape(),z(t),t.style.clipPath=r.clip,t.style.borderRadius=r.borderRadius,t.style.removeProperty(`--lg-radius`),x_(r),m.delete(r),V++,U.unobserve(t),n.morphFrom&&--_===0&&delete e.dataset.glassPopup,a===null?t.removeAttribute(`data-glass-appearance`):t.setAttribute(`data-glass-appearance`,a),f=!0,U.wake()}},addForeground(e){let t={element:e,serial:++y_,x:0,y:0,w:0,h:0,opacity:1,options:{}};return L.add(t),V++,U.observe(e),f=!0,U.wake(),()=>{z(e),L.delete(t),V++,U.unobserve(e),f=!0,U.wake()}},addAnimator(e){return h.add(e),U.wake(),()=>{h.delete(e),e.dispose(),U.wake()}},addProgressiveBlur:(e,t)=>{let n=x.add(e,t);return U.wake(),()=>{n(),U.wake()}},addScrollEdges:e=>{let t=x.addScroll(e);return U.wake(),()=>{t(),U.wake()}},dispose(){clearTimeout(C),x.dispose(),D?.dispose(),S.dispose(),h.forEach(e=>e.dispose()),h.clear(),d=!0,U.dispose(),u&&R(u);for(let e of I.keys())z(e);i.remove(),n?.(),m.forEach(e=>{e.animators.forEach(e=>e.dispose()),jm(e.element),e.releaseShape(),e.element.style.clipPath=e.clip,e.element.style.borderRadius=e.borderRadius,e.element.style.removeProperty(`--lg-radius`),x_(e)}),m.clear(),L.clear()}}}var D_=h({WebGL2MaterialRenderer:()=>k_,disposeMaterialRenderer:()=>M_,getMaterialRenderer:()=>j_}),O_=`#version 300 es
void main(){vec2 p=vec2((gl_VertexID<<1)&2,gl_VertexID&2);gl_Position=vec4(p*2.0-1.0,0,1);}`,k_=class{onLost;warmed;canvas=document.createElement(`canvas`);gl;program;outline;slots=[];queue=[];pending=new Set;dead=!1;limit;lost=e=>{e.preventDefault(),this.dispose(),this.onLost?.()};constructor(e){this.onLost=e;let t=this.canvas.getContext(`webgl2`,{alpha:!0,antialias:!1,premultipliedAlpha:!1,preserveDrawingBuffer:!1,depth:!1,stencil:!1});if(!t)throw Error(`WebGL2 material renderer unavailable`);this.gl=t,this.limit=Math.min(lf,t.getParameter(t.MAX_TEXTURE_SIZE),t.getParameter(t.MAX_RENDERBUFFER_SIZE));let n=(e,n)=>{let r=t.createShader(e);if(t.shaderSource(r,n),t.compileShader(r),!t.getShaderParameter(r,t.COMPILE_STATUS)){let e=t.getShaderInfoLog(r);throw t.deleteShader(r),Error(`Glass shader: `+e)}return r},r=n(t.VERTEX_SHADER,O_),i=n(t.FRAGMENT_SHADER,ff),a=t.createProgram();if(t.attachShader(a,r),t.attachShader(a,i),t.linkProgram(a),t.deleteShader(r),t.deleteShader(i),!t.getProgramParameter(a,t.LINK_STATUS))throw Error(`Glass program: `+t.getProgramInfoLog(a));this.program=a,t.useProgram(a),t.disable(t.DITHER),t.disable(t.BLEND),t.disable(t.DEPTH_TEST),Nd(`map-renderer`,65536),this.outline=t.createTexture(),t.activeTexture(t.TEXTURE0),t.bindTexture(t.TEXTURE_2D,this.outline),t.texParameteri(t.TEXTURE_2D,t.TEXTURE_MIN_FILTER,t.NEAREST),t.texParameteri(t.TEXTURE_2D,t.TEXTURE_MAG_FILTER,t.NEAREST),t.texImage2D(t.TEXTURE_2D,0,t.RGBA32F,64,64,0,t.RGBA,t.FLOAT,null),t.uniform1i(t.getUniformLocation(a,`outlines`),0),this.canvas.addEventListener(`webglcontextlost`,this.lost),this.warmed=this.render({width:4,height:4,radius:2,dpr:1}).then(()=>void 0)}render(e){return new Promise((t,n)=>{if(this.dead){n(Error(`Glass renderer disposed`));return}try{if(![e.width,e.height,e.dpr??1].every(Number.isFinite)||e.width<=0||e.height<=0)throw RangeError(`Glass geometry must have positive, finite dimensions.`);let r=uf(e),i=Math.ceil((e.width+4)*r),a=Math.ceil((e.height+4)*r),{segments:o}=e.outline?Sm(e.outline):_m(e.width,e.height,e.radius);if(i>Math.min(4096,this.limit)||a*2>this.limit||o.length>4096)throw RangeError(`Glass map exceeds WebGL2 atlas limits`);let s={g:e,columns:i,rows:a,dpr:r,segments:o,started:performance.now(),resolve:t,reject:n};this.pending.add(s),this.queue.push(s),this.queue.length===1&&queueMicrotask(()=>this.flush())}catch(e){n(e)}})}flush(){let e=this.queue;this.queue=[];let t=[],n=0,r=0;for(let i of e)t.length&&(t.length===32||n+i.segments.length>4096||r+i.rows*2>this.limit)&&(this.draw(t),t=[],n=r=0),t.push(i),n+=i.segments.length,r+=i.rows*2;t.length&&this.draw(t)}slot(e,t){let n=this.gl,r=this.slots.find(e=>!e.busy);r||(r={texture:n.createTexture(),fbo:n.createFramebuffer(),pbo:n.createBuffer(),busy:!1,width:0,height:0,sync:null},this.slots.push(r));let i=this.slots.reduce((n,i)=>n+(i===r?e*t:i.width*i.height)*8,0);if(Nd(`map-renderer`,65536+i,0,i),r.busy=!0,n.bindFramebuffer(n.FRAMEBUFFER,r.fbo),(r.width!==e||r.height!==t)&&(n.bindTexture(n.TEXTURE_2D,r.texture),n.texParameteri(n.TEXTURE_2D,n.TEXTURE_MIN_FILTER,n.NEAREST),n.texParameteri(n.TEXTURE_2D,n.TEXTURE_MAG_FILTER,n.NEAREST),n.texImage2D(n.TEXTURE_2D,0,n.RGBA8,e,t,0,n.RGBA,n.UNSIGNED_BYTE,null),n.framebufferTexture2D(n.FRAMEBUFFER,n.COLOR_ATTACHMENT0,n.TEXTURE_2D,r.texture,0),r.width=e,r.height=t),n.checkFramebufferStatus(n.FRAMEBUFFER)!==n.FRAMEBUFFER_COMPLETE)throw Error(`Glass framebuffer incomplete`);return r}async draw(e){let t;try{if(this.dead)throw Error(`Glass renderer disposed`);let n=this.gl,r=Math.max(...e.map(e=>e.columns)),i=e.reduce((e,t)=>e+t.rows*2,0),a=new Float32Array(384),o=new Float32Array(16384),s=0,c=0,l=e.map((e,t)=>{let n=s;a.set([e.g.width,e.g.height,s,e.rows,e.columns,e.dpr,+(e.g.appearance===`dark`),+!e.g.outline,c,e.segments.length,0,0],t*12);for(let t of e.segments)o.set(t,c++*4);return s+=e.rows*2,n});if(t=this.slot(r,i),n.useProgram(this.program),n.viewport(0,0,r,i),n.activeTexture(n.TEXTURE0),n.bindTexture(n.TEXTURE_2D,this.outline),n.texSubImage2D(n.TEXTURE_2D,0,0,0,64,64,n.RGBA,n.FLOAT,o),n.uniform4fv(n.getUniformLocation(this.program,`shapes[0]`),a),n.uniform1i(n.getUniformLocation(this.program,`shapeCount`),e.length),n.uniform1f(n.getUniformLocation(this.program,`atlasHeight`),i),n.drawArrays(n.TRIANGLES,0,3),n.bindBuffer(n.PIXEL_PACK_BUFFER,t.pbo),n.bufferData(n.PIXEL_PACK_BUFFER,r*i*4,n.STREAM_READ),n.readPixels(0,0,r,i,n.RGBA,n.UNSIGNED_BYTE,0),n.bindBuffer(n.PIXEL_PACK_BUFFER,null),t.sync=n.fenceSync(n.SYNC_GPU_COMMANDS_COMPLETE,0),!t.sync)throw Error(`Glass readback fence unavailable`);n.flush();let u=performance.now()+15e3;for(;;){if(this.dead||n.isContextLost())throw Error(`Glass context lost`);let e=n.clientWaitSync(t.sync,0,0);if(e===n.WAIT_FAILED)throw Error(`Glass readback failed`);if(e!==n.TIMEOUT_EXPIRED)break;if(performance.now()>u)throw Error(`Glass readback timed out`);await new Promise(e=>setTimeout(e,4))}let d=new Uint8Array(r*i*4);n.bindBuffer(n.PIXEL_PACK_BUFFER,t.pbo),n.getBufferSubData(n.PIXEL_PACK_BUFFER,0,d),n.bindBuffer(n.PIXEL_PACK_BUFFER,null),e.forEach((e,t)=>{let n=new Uint8Array(e.columns*e.rows*2*4);for(let a=0;a<e.rows*2;a++){let o=(i-1-l[t]-a)*r*4;n.set(d.subarray(o,o+e.columns*4),a*e.columns*4)}e.resolve({width:e.columns,height:e.rows,pixels:n,duration:performance.now()-e.started})})}catch(t){e.forEach(e=>e.reject(t instanceof Error?t:Error(String(t))))}finally{if(e.forEach(e=>this.pending.delete(e)),t&&(t.sync&&this.gl.deleteSync(t.sync),t.sync=null,t.busy=!1,this.gl.deleteTexture(t.texture),this.gl.deleteFramebuffer(t.fbo),this.gl.deleteBuffer(t.pbo),this.slots=this.slots.filter(e=>e!==t),!this.dead)){let e=this.slots.reduce((e,t)=>e+t.width*t.height*8,0);Nd(`map-renderer`,65536+e,0,e)}}}dispose(){if(this.dead)return;this.dead=!0,this.queue=[];for(let e of this.pending)e.reject(Error(`Glass renderer disposed or context lost`));this.pending.clear();let e=this.gl;for(let t of this.slots)e.deleteTexture(t.texture),e.deleteFramebuffer(t.fbo),e.deleteBuffer(t.pbo),t.sync&&e.deleteSync(t.sync),t.sync=null;this.slots=[],Pd(`map-renderer`),e.deleteTexture(this.outline),e.deleteProgram(this.program),this.canvas.removeEventListener(`webglcontextlost`,this.lost)}},A_;function j_(){return A_??=Promise.resolve().then(()=>new k_(()=>{A_=void 0})).catch(e=>{throw A_=void 0,e})}async function M_(){let e=A_;A_=void 0,e&&(await e).dispose()}function N_(e){return uh(e)&&(e.maxTouchPoints>0||/iP(?:hone|ad|od)/.test(e.userAgent))}function P_(e){let t=Array.from(e.querySelectorAll(`.creator-tabs,.consumer-actions button,#view-trigger,.open-palette-editor,.slogan-grid button,.panel-handle,.city-card,.palette-swatch`)),n=t.map(e=>({element:e,surface:e.classList.contains(`lg-surface`),interactive:e.getAttribute(`data-glass-interactive`)})),r=t.map(e=>{e.setAttribute(`data-glass-interactive`,``),e.classList.add(`lg-surface`);let t=e.matches(`.panel-handle,.city-card,.palette-swatch`);return Bm(e,()=>t?`reduced`:Im(`full`))}),i=0,a=!1,o=e=>{if(i=0,a)return;let t=!1;for(let n of r)t=!!n.frame(e)||t;t&&(i=requestAnimationFrame(o))},s=()=>{!a&&!i&&(i=requestAnimationFrame(o))},c=[`pointerdown`,`pointermove`,`pointerup`,`pointercancel`,`pointerover`,`pointerout`,`keydown`,`keyup`,`focusout`];for(let e of c)window.addEventListener(e,s,{capture:!0,passive:!0});return()=>{a=!0,cancelAnimationFrame(i);for(let e of c)window.removeEventListener(e,s,!0);for(let e of r)e.dispose();for(let{element:e,surface:t,interactive:r}of n)t||e.classList.remove(`lg-surface`),r===null?e.removeAttribute(`data-glass-interactive`):e.setAttribute(`data-glass-interactive`,r)}}var F_=`#version 300 es
precision highp float;
out vec2 uv;
void main(){uv=vec2((gl_VertexID<<1)&2,gl_VertexID&2);gl_Position=vec4(uv.x*2.-1.,1.-uv.y*2.,0,1);}`,I_=`#version 300 es
precision highp float;
in vec2 uv;
`,L_=I_+`
uniform sampler2D model,background;
uniform vec2 cover;
uniform bool hasBackground;
out vec4 color;
void main(){vec4 m=texture(model,uv);vec3 b=hasBackground?texture(background,(uv-.5)*cover+.5).rgb:vec3(.9804,.9765,.9608);color=vec4(m.rgb+b*(1.-m.a),1);}`,R_=I_+`
uniform sampler2D source;
out vec4 color;
void main(){color=texture(source,vec2(uv.x,1.-uv.y));}`,z_=I_+`
uniform sampler2D smallSource,wideSource;
uniform vec2 direction,sigma;
layout(location=0) out vec4 smallColor;
layout(location=1) out vec4 wideColor;
void main(){vec2 at=vec2(uv.x,1.-uv.y);vec4 a=vec4(0),b=vec4(0);vec2 sum=vec2(0);
for(int i=-35;i<=35;i++){float d=float(i)*2.;vec2 weight=exp(-.5*d*d/(sigma*sigma));weight*=step(vec2(abs(d)),3.*sigma);
a+=texture(smallSource,at+direction*float(i))*weight.x;b+=texture(wideSource,at+direction*float(i))*weight.y;sum+=weight;}
smallColor=a/sum.x;wideColor=b/sum.y;}`,B_=I_+`
uniform sampler2D backdrop,frost,fill,fieldA,fieldB,overlayA,overlayB;
uniform vec2 size;
uniform vec4 boxA,boxB;
uniform vec2 capsuleA,capsuleB;
uniform float mixMaps,travel,opacity,fillOpacity;
uniform bool regular,dark,nested,tinted;
uniform vec4 tone;
uniform vec3 tint;
layout(location=0) out vec4 accumulated;
layout(location=1) out vec4 glass;
vec4 mapAt(sampler2D plane,vec4 box,vec2 capsule){
 vec2 p=(uv*size-box.xy)/box.zw;
 if(any(lessThan(p,vec2(0)))||any(greaterThan(p,vec2(1))))return vec4(0);
 float cap=capsule.x*box.w/capsule.y;
 if(capsule.x>0.&&box.z>=2.*cap){float x=p.x*box.z;float nativeWidth=3.*(capsule.y-4.)+4.;
 if(x<cap)p.x=x/cap*capsule.x/nativeWidth;
 else if(x>box.z-cap)p.x=1.-(box.z-x)/cap*capsule.x/nativeWidth;
 else p.x=.5;}
 vec4 v=texture(plane,p);return vec4(v.rgb*v.a,v.a);
}
vec3 curve(vec3 v){
 if(regular){vec3 t=tone.x+tone.y*v+tone.z*v*v;return mix(v,t,dark?.90:.80);}
 vec3 t=v+tone.x*pow(1.-v,vec3(3))-tone.y*pow(v,vec3(3));
 vec3 wash=dark?.38*v+.20:.78*v+.26;
 return clamp(mix(t,wash,dark?.14:.06)+(dark&&nested?.08*(1.-v):vec3(0)),0.,1.);
}
void main(){
 vec4 field=mix(mapAt(fieldA,boxA,capsuleA),mapAt(fieldB,boxB,capsuleB),mixMaps);
 if(field.a<.001)discard;
 vec2 displacement=(field.rg/field.a-.5)*2.*travel;
 vec2 at=(uv*size+displacement)/size;at.y=1.-at.y;
 vec3 c=texture(backdrop,at).rgb;
 if(regular){vec3 f=texture(frost,at).rgb,g=texture(fill,at).rgb;c=mix(f,dark?min(f,g):max(f,g),fillOpacity);}
 // SVG table transfer uses 33 samples with linear interpolation.
 vec3 grid=clamp(c,0.,1.)*32.;c=mix(curve(floor(grid)/32.),curve(ceil(grid)/32.),fract(grid));
 if(regular){float l=dot(c,vec3(.213,.715,.072));c=clamp(mix(vec3(l),c,tone.w),0.,1.);}
 if(tinted){float body=regular?.78:.68;c=tint*(body+(1.-body)*dot(c,vec3(.213,.715,.072)));}
 vec4 light=mix(mapAt(overlayA,boxA,capsuleA),mapAt(overlayB,boxB,capsuleB),mixMaps);
 if(tinted)light.rgb*=(.45+.55*tint)/(dark?.82:1.);
 vec4 result=vec4(c*field.a,field.a)*(1.-light.a)+light;
 glass=accumulated=result*opacity;
}`;function V_(e,t,n=()=>{}){let r=document.createElement(`canvas`);r.className=`glass-raster`,r.setAttribute(`aria-hidden`,`true`);let i=r.getContext(`webgl2`,{alpha:!0,antialias:!1,premultipliedAlpha:!0,depth:!1,stencil:!1,preserveDrawingBuffer:!1});if(!i)throw Error(`Glass compositor WebGL2 unavailable`);let a=i,o=(e,t)=>{let n=a.createShader(e);if(a.shaderSource(n,t),a.compileShader(n),!a.getShaderParameter(n,a.COMPILE_STATUS)){let e=a.getShaderInfoLog(n);throw a.deleteShader(n),Error(e??`Glass shader failed`)}return n},s=e=>{let t=a.createProgram(),n=o(a.VERTEX_SHADER,F_),r=o(a.FRAGMENT_SHADER,e);if(a.attachShader(t,n),a.attachShader(t,r),a.linkProgram(t),a.deleteShader(n),a.deleteShader(r),!a.getProgramParameter(t,a.LINK_STATUS))throw Error(a.getProgramInfoLog(t)??`Glass program failed`);return{program:t,locations:new Map}},c=s(L_),l=s(R_),u=s(z_),d=s(B_),f=(e,t)=>(e.locations.has(t)||e.locations.set(t,a.getUniformLocation(e.program,t)),e.locations.get(t)),p=(e,t,n)=>a.uniform1f(f(e,t),n),m=(e,t,n)=>a.uniform1i(f(e,t),Number(n)),h=(e,t,n)=>{n.length===2?a.uniform2fv(f(e,t),n):n.length===3?a.uniform3fv(f(e,t),n):a.uniform4fv(f(e,t),n)},g=()=>{let e=a.createTexture();return a.bindTexture(a.TEXTURE_2D,e),a.texParameteri(a.TEXTURE_2D,a.TEXTURE_MIN_FILTER,a.LINEAR),a.texParameteri(a.TEXTURE_2D,a.TEXTURE_MAG_FILTER,a.LINEAR),a.texParameteri(a.TEXTURE_2D,a.TEXTURE_WRAP_S,a.CLAMP_TO_EDGE),a.texParameteri(a.TEXTURE_2D,a.TEXTURE_WRAP_T,a.CLAMP_TO_EDGE),e},_=(e,t,n,r)=>{a.activeTexture(a.TEXTURE0+r),a.bindTexture(a.TEXTURE_2D,n),a.uniform1i(f(e,t),r)},v=(e,t,n)=>{a.bindTexture(a.TEXTURE_2D,e),a.texImage2D(a.TEXTURE_2D,0,a.RGBA8,t,n,0,a.RGBA,a.UNSIGNED_BYTE,null)},y=e=>({frame:a.createFramebuffer(),textures:Array.from({length:e},g),width:0,height:0}),b=(e,t,n)=>{if((e.width!==t||e.height!==n)&&(e.width=t,e.height=n,a.bindFramebuffer(a.FRAMEBUFFER,e.frame),e.textures.forEach((e,r)=>{v(e,t,n),a.framebufferTexture2D(a.FRAMEBUFFER,a.COLOR_ATTACHMENT0+r,a.TEXTURE_2D,e,0)}),a.drawBuffers(e.textures.map((e,t)=>a.COLOR_ATTACHMENT0+t)),a.checkFramebufferStatus(a.FRAMEBUFFER)!==a.FRAMEBUFFER_COMPLETE))throw Error(`Glass framebuffer incomplete`)},x=y(1),S=y(2),C=y(2),w=g(),T=g(),E=g(),D=new Map,O=!1,k=0,A=0,j=4,M=0,N=!1,P=()=>{!z&&!document.hidden&&!k&&(k=requestAnimationFrame(()=>{k=0,U()}))},F=[],I=0,L=0,R=1,z=!1,ee=0,B=0,te=``,V,H=!1,ne=``,re=null,ie=(e,t,n=!1)=>{a.bindTexture(a.TEXTURE_2D,e),a.pixelStorei(a.UNPACK_FLIP_Y_WEBGL,!1),a.pixelStorei(a.UNPACK_PREMULTIPLY_ALPHA_WEBGL,n),a.pixelStorei(a.UNPACK_COLORSPACE_CONVERSION_WEBGL,a.NONE),a.texImage2D(a.TEXTURE_2D,0,a.RGBA,a.RGBA,a.UNSIGNED_BYTE,t)};v(E,1,1);let ae=(e=0)=>{let t=Math.ceil(I*R),n=Math.ceil(L*R);return t*n*4+(O?28:t*n*8+Math.ceil(I/2)*Math.ceil(L/2)*16)+A+j+[...D.values()].reduce((e,t)=>e+t.bytes,0)+e},oe=(e=0)=>Nd(`compositor`,ae(e),V?V.naturalWidth*V.naturalHeight*4:0),se=e=>{for(let[t,n]of D)e.has(t)||(a.deleteTexture(n.texture),D.delete(t))},ce=e=>{let n=D.get(e);if(!n){n={texture:g(),ready:!1,last:ee,bytes:0},D.set(e,n);let r=Qf(e);if(r){let e=r.naturalWidth*r.naturalHeight*4;oe(e),ie(n.texture,r),n.bytes=e,n.ready=!0}else{v(n.texture,1,1);let r=new Image;r.src=e;let i=n;r.decode().then(()=>{if(z||D.get(e)!==i)return;let t=r.naturalWidth*r.naturalHeight*4;oe(t),ie(i.texture,r),i.bytes=t,i.ready=!0,P()}).catch(t)}}return n.last=ee,n},le=()=>a.drawArrays(a.TRIANGLES,0,3),ue=(e,t,n,r,i=R)=>{let o=Math.max(0,Math.floor(e*i)),s=Math.max(0,Math.floor((L-t-r)*i)),c=Math.min(Math.ceil(I*i),Math.ceil((e+n)*i)),l=Math.min(Math.ceil(L*i),Math.ceil((L-t)*i));a.scissor(o,s,Math.max(0,c-o),Math.max(0,l-s))},U=()=>{if(z||document.hidden||!N||!I||!L||!F.length)return;let i=performance.now();try{if(a.isContextLost())return;let t=Math.ceil(I*R),o=Math.ceil(L*R);O=!1,oe(),(r.width!==t||r.height!==o||x.width!==t||x.height!==o)&&(r.width=t,r.height=o,b(x,t,o),b(S,Math.ceil(I/2),Math.ceil(L/2)),b(C,S.width,S.height),v(w,t,o)),a.disable(a.SCISSOR_TEST),a.disable(a.BLEND),a.bindFramebuffer(a.FRAMEBUFFER,x.frame),a.viewport(0,0,t,o),a.drawBuffers([a.COLOR_ATTACHMENT0]),a.bindFramebuffer(a.FRAMEBUFFER,null),a.clearColor(0,0,0,0),a.clear(a.COLOR_BUFFER_BIT),a.bindFramebuffer(a.FRAMEBUFFER,x.frame),a.useProgram(c.program),_(c,`model`,T,0),_(c,`background`,E,1),m(c,`hasBackground`,H),h(c,`cover`,[1,1]),le(),a.enable(a.SCISSOR_TEST);for(let n of F){let r=n.place?.a??{maps:n.maps,x:n.x,y:n.y,w:n.w,h:n.h},i=n.place?.b??r,s=[r.maps.field,i.maps.field,r.maps.overlay,i.maps.overlay].map(ce);if(s.some(e=>!e.ready))continue;let c={x:Math.max(0,n.x-2),y:Math.max(0,n.y-2),right:Math.min(I,n.x+n.w+2),bottom:Math.min(L,n.y+n.h+2)};n.clipBounds&&(c.x=Math.max(c.x,n.clipBounds.x),c.y=Math.max(c.y,n.clipBounds.y),c.right=Math.min(c.right,n.clipBounds.x+n.clipBounds.width),c.bottom=Math.min(c.bottom,n.clipBounds.y+n.clipBounds.height));for(let t=n.element.parentElement;t&&t!==e;t=t.parentElement){let n=getComputedStyle(t);if(/hidden|clip/.test(n.overflowX+n.overflowY)){let n=t.getBoundingClientRect(),r=e.getBoundingClientRect();c.x=Math.max(c.x,n.left-r.left),c.y=Math.max(c.y,n.top-r.top),c.right=Math.min(c.right,n.right-r.left),c.bottom=Math.min(c.bottom,n.bottom-r.top)}}if(c.right<=c.x||c.bottom<=c.y)continue;let l=n.options,f=l.appearance===`dark`,g=l.material===`regular`,v=f?Ph.regular.dark:Ph.regular.light,y=n.refraction+(g?3*v.fillSigma:0)+6,b=Math.max(0,Math.floor((c.x-y)*R)),T=Math.max(0,Math.floor((L-c.bottom-y)*R)),E=Math.min(t,Math.ceil((c.right+y)*R)),D=Math.min(o,Math.ceil((L-c.y+y)*R));a.bindFramebuffer(a.FRAMEBUFFER,x.frame),a.readBuffer(a.COLOR_ATTACHMENT0),a.activeTexture(a.TEXTURE0),a.bindTexture(a.TEXTURE_2D,w),a.copyTexSubImage2D(a.TEXTURE_2D,0,b,T,b,T,E-b,D-T),g&&(a.disable(a.BLEND),a.useProgram(u.program),h(u,`sigma`,[Ph.regular.blur,v.fillSigma]),a.bindFramebuffer(a.FRAMEBUFFER,S.frame),a.viewport(0,0,S.width,S.height),ue(c.x-n.refraction-3*v.fillSigma-4,c.y-n.refraction-3*v.fillSigma-4,c.right-c.x+2*(n.refraction+3*v.fillSigma+4),c.bottom-c.y+2*(n.refraction+3*v.fillSigma+4),.5),h(u,`direction`,[2/I,0]),_(u,`smallSource`,w,0),_(u,`wideSource`,w,1),le(),a.bindFramebuffer(a.FRAMEBUFFER,C.frame),h(u,`direction`,[0,2/L]),_(u,`smallSource`,S.textures[0],0),_(u,`wideSource`,S.textures[1],1),le()),a.bindFramebuffer(a.FRAMEBUFFER,x.frame),a.drawBuffers([a.COLOR_ATTACHMENT0]),a.viewport(0,0,t,o),ue(c.x,c.y,c.right-c.x,c.bottom-c.y),a.enable(a.BLEND),a.blendFunc(a.ONE,a.ONE_MINUS_SRC_ALPHA),a.useProgram(d.program),_(d,`backdrop`,w,0),_(d,`frost`,C.textures[0],1),_(d,`fill`,C.textures[1],2),[`fieldA`,`fieldB`,`overlayA`,`overlayB`].forEach((e,t)=>_(d,e,s[t].texture,t+3)),h(d,`size`,[I,L]),h(d,`boxA`,[r.x-2,r.y-2,r.w+4,r.h+4]),h(d,`boxB`,[i.x-2,i.y-2,i.w+4,i.h+4]);let O=e=>e.capsule?[e.capsule.cap,e.capsule.height]:[0,1];h(d,`capsuleA`,O(r.maps)),h(d,`capsuleB`,O(i.maps)),p(d,`mixMaps`,n.place?.mix??0),p(d,`travel`,n.refraction),p(d,`opacity`,n.opacity),p(d,`fillOpacity`,v.fillOpacity),m(d,`regular`,g),m(d,`dark`,f),m(d,`nested`,n.parents.length>0);let k=o_(l);m(d,`tinted`,!!k),h(d,`tint`,k??[1,1,1]);let A=f?Ph.clear.dark:Ph.clear.light;h(d,`tone`,g?[...v.tone]:[A.shadowLift,A.highlightRolloff,0,0]),le(),a.bindFramebuffer(a.FRAMEBUFFER,null),le()}if(a.bindFramebuffer(a.FRAMEBUFFER,null),a.viewport(0,0,t,o),a.disable(a.SCISSOR_TEST),a.disable(a.BLEND),ee++,B=performance.now()-i,n(),ee%120==0)for(let[e,t]of D)ee-t.last>240&&(a.deleteTexture(t.texture),D.delete(e))}catch(e){t(e)}},de=()=>{if(!V||!I||!L)return;let e=`${Math.ceil(I)}x${Math.ceil(L)}`;if(e===ne)return;let t=document.createElement(`canvas`);t.width=Math.ceil(I),t.height=Math.ceil(L),j=t.width*t.height*4,oe();let n=Math.max(t.width/V.width,t.height/V.height),r=V.width*n,i=V.height*n;t.getContext(`2d`).drawImage(V,(t.width-r)/2,(t.height-i)/2,r,i),ie(E,t),t.width=t.height=1,ne=e,H=!0},fe=()=>{let n=e.querySelector(`#scene-background`)?.style.backgroundImage.match(/url\(["']?(.*?)["']?\)/)?.[1]??``;if(n===te)return;if(te=n,H=!1,ne=``,!n){V=void 0;return}let r=new Image;r.src=n,r.decode().then(()=>{z||te!==n||(V=r,de(),P())}).catch(t)},pe=new MutationObserver(fe),me=e.querySelector(`#scene-background`);me&&pe.observe(me,{attributes:!0,attributeFilter:[`style`]}),fe();let he=e=>{e.preventDefault(),t(Error(`Glass compositor context lost`))};return r.addEventListener(`webglcontextlost`,he),e.append(r),{update(e,n,r){F=e,re=n.querySelector(`canvas`),I=r.width,L=r.height,R=Math.min(devicePixelRatio||1,1.25);try{de()}catch(e){t(e);return}se(new Set(e.flatMap(e=>[e.maps,e.place?.a.maps,e.place?.b.maps].filter(Boolean).flatMap(e=>[e.field,e.overlay])))),P()},releaseScratch(){z||(b(x,1,1),b(S,1,1),b(C,1,1),v(w,1,1),O=!0,oe())},captureModel(){if(!z&&re)try{A=re.width*re.height*4,oe(),ie(T,re,!0),N=!0,M++,P()}catch(e){t(e)}},render(){cancelAnimationFrame(k),k=0,U()},debug:()=>({frames:ee,lenses:F.length,textures:D.size,renderMs:Math.round(B*10)/10,dpr:R,modelCaptures:M,gpuBytes:ae()}),owns:e=>e===r,dispose(){if(!z){z=!0,cancelAnimationFrame(k),pe.disconnect(),r.removeEventListener(`webglcontextlost`,he),r.remove();for(let e of[x,S,C])a.deleteFramebuffer(e.frame),e.textures.forEach(e=>a.deleteTexture(e));for(let e of[w,T,E,...[...D.values()].map(e=>e.texture)])a.deleteTexture(e);for(let e of[c,l,u,d])a.deleteProgram(e.program);D.clear(),Pd(`compositor`),a.getExtension(`WEBGL_lose_context`)?.loseContext()}}}}function H_(e={}){jd(e.admitMemory??(()=>!0));let t=document.querySelector(`.consumer-scene`),n=document.querySelector(`#glass-content`),r=N_(navigator);t.dataset.glassCompositor=r?`webgl2`:`svg`;let i,o=()=>{},s=!1,c,l=!1,u=0,d,f=new Map,p=()=>{},m=()=>{},h=()=>{cancelAnimationFrame(u),d?.disconnect(),d=void 0,f.forEach(e=>e()),f.clear(),p(),p=()=>{},m(),m=()=>{}},g={backend:r?`webgl2-isolated`:`webgl2`,ready:!1,maps:0,mapTime:0,error:``};t.dataset.glassState=`preparing`;let _=n=>{l||g.backend===`native-backdrop`||(g={...g,backend:`native-backdrop`,ready:!0,error:String(n)},h(),c?.dispose(),c=void 0,i?.dispose(),i=void 0,t.dataset.glassState=`compatible`,o=P_(t),g={...g,backend:`native-backdrop`,ready:!0,error:String(n)},ip(),dp(),M_().catch(()=>{}),e.invalidate?.())};return cf().then(async o=>{if(await o.warmed,l||g.backend===`native-backdrop`)return;r&&(i=V_(t,e=>queueMicrotask(()=>_(e)),()=>{s||(s=!0,e.invalidate?.())})),c=E_(t,{layers:i,maxSurfaces:32,synchronizedMotion:!0,onDiagnostic:n=>{if(l)return;if(n.error){queueMicrotask(()=>_(n.error));return}let r=g.ready;g={...g,maps:n.maps,mapTime:n.mapTime,ready:n.maps>0},g.ready&&!r&&e.invalidate?.(),g.ready&&(t.dataset.glassState=`ready`)}}),c.setContent(n),m=ld(c),c.addAnimator(Bm(document.querySelector(`.panel-handle`),()=>`reduced`)),c.addSurface(document.querySelector(`#artwork-settings`),{material:`clear`,radius:28});let h=document.querySelector(`.creator-tabs`),v=document.querySelector(`.creator-indicator`);c.addSurface(h,{material:`regular`,radius:`capsule`,refraction:18,interactive:!0}),c.addSurface(v,{material:`regular`,radius:`capsule`,refraction:12});for(let e of document.querySelectorAll(`.consumer-actions button,#view-trigger`))c.addSurface(e,{material:`regular`,radius:`capsule`,interactive:!0,refraction:14});p=km(document.querySelector(`.city-cards`),0);let y=[[document.querySelector(`.handle-glass`),{material:`clear`,radius:`capsule`,refraction:12,tint:`#d5c5a4`}],[document.querySelector(`#view-menu`),{material:`regular`,radius:24,refraction:16,morphFrom:()=>document.querySelector(`#view-trigger`),morph:`detach`,neck:36}],[document.querySelector(`.open-palette-editor`),{material:`regular`,radius:`capsule`,refraction:14,interactive:!0}],...Array.from(document.querySelectorAll(`[data-palette],[data-palette-copy]`),e=>[e.querySelector(`.palette-swatch`),{material:`clear`,radius:13,tint:a[e.dataset.palette??e.dataset.paletteCopy].dark,refraction:26,clipTo:()=>e.closest(`.palette-viewport`)}]),...Array.from(document.querySelectorAll(`.city-card,.slogan-grid button`),e=>[e,{material:`regular`,radius:13,refraction:14,...e.classList.contains(`city-card`)?{clipTo:()=>document.querySelector(`.city-cards`)}:{interactive:!0}}])],b=()=>{if(u=0,!c||l)return;let e=new Set(y.filter(([e])=>!e.closest(`[hidden]`)&&(!e.classList.contains(`city-card`)||e.getAttribute(`data-glass-near`)===`true`)).map(([e])=>e));for(let[t,n]of f)e.has(t)||(n(),f.delete(t));for(let[t,n]of y)e.has(t)&&!f.has(t)&&f.set(t,c.addSurface(t,n))};d=new MutationObserver(()=>{u||=requestAnimationFrame(b)}),d.observe(t,{subtree:!0,attributes:!0,attributeFilter:[`aria-hidden`,`data-glass-near`,`hidden`,`data-pane`,`data-level`,`data-collapsed`]}),b()}).catch(_),{releaseScratch:()=>i?.releaseScratch(),captureModel:()=>i?.captureModel(),render:()=>i?.render(),ready:()=>g.ready&&(!i||s),fallback:_,debug:()=>({...g,optionSurfaces:f.size,memory:Md(),deviceMemoryGiB:navigator.deviceMemory??null,compositor:i?.debug()}),dispose(){l=!0,h(),c?.dispose(),c=void 0,i?.dispose(),o(),ip(),dp(),M_().catch(()=>{})}}}function U_(e,t,n){if(!e||![e.rows,e.contentWidth,e.contentHeight,e.gutter].every(Number.isInteger)||e.rows<2||e.rows>4||e.contentWidth<1||e.contentHeight<1||e.gutter<8||e.gutter>128||t!==e.contentWidth+2*e.gutter||n!==e.rows*(e.contentHeight+2*e.gutter))throw Error(`花带图集尺寸或护边参数无效`)}var W_=new WeakSet;function G_(e,t){if(e.userData.fixedAtlas=t,!W_.has(e)){W_.add(e);let t=e.onBeforeCompile,n=e.customProgramCacheKey.bind(e);e.onBeforeCompile=(n,r)=>{t.call(e,n,r);let i=e.userData.fixedAtlas;if(!i)return;let a=i.contentWidth+2*i.gutter,o=i.contentHeight+2*i.gutter,s=o*i.rows;n.fragmentShader=`vec4 sampleFixedAtlas(sampler2D tex, vec2 sourceUv) {
     float scaled=fract(sourceUv.x)*${i.rows.toFixed(1)};
     float row=min(${(i.rows-1).toFixed(1)},floor(scaled));
     vec2 uv=vec2((${i.gutter.toFixed(1)}+fract(scaled)*${i.contentWidth.toFixed(1)})/${a.toFixed(1)},
       ((${(i.rows-1).toFixed(1)}-row)*${o.toFixed(1)}+${i.gutter.toFixed(1)}+sourceUv.y*${i.contentHeight.toFixed(1)})/${s.toFixed(1)});
     vec2 derivativeScale=vec2(${(i.rows*i.contentWidth/a).toFixed(10)},${(i.contentHeight/s).toFixed(10)});
     return textureGrad(tex,uv,dFdx(sourceUv)*derivativeScale,dFdy(sourceUv)*derivativeScale);
   }\n`+n.fragmentShader;for(let e of[`map_fragment`,`roughnessmap_fragment`,`metalnessmap_fragment`,`normal_fragment_maps`,`clearcoat_normal_fragment_maps`]){let t=Oo[e].replace(/texture2D\(\s*(map|normalMap|roughnessMap|metalnessMap|clearcoatNormalMap)\s*,\s*(v\w+Uv)\s*\)/g,`sampleFixedAtlas( $1, $2 )`);n.fragmentShader=n.fragmentShader.replace(`#include <${e}>`,t)}},e.customProgramCacheKey=()=>n()+`-fixed-atlas-`+JSON.stringify(e.userData.fixedAtlas??null)}e.needsUpdate=!0}function K_(e,t=240,n={}){let r=[],i=[],a=[],o=new Map,s=n.start??0,c=e.length;for(let o=0;o<=t;o++){let l=s+o/t*Math.PI*2;for(let s=0;s<c;s++){let[u,d]=e[s],f=e[Math.max(0,s-1)],p=e[Math.min(c-1,s+1)],m=new J(e[s][0]-f[0],e[s][1]-f[1]).normalize().add(new J(p[0]-e[s][0],p[1]-e[s][1]).normalize()).normalize();r.push(u*Math.cos(l),d,u*Math.sin(l)),i.push(m.y*Math.cos(l),-m.x,m.y*Math.sin(l)),a.push(...n.uv?.(u,d,l,s)??[o/t,s/(c-1)])}}for(let r=0;r<c-1;r++)for(let i=0;i<t;i++){let t=i*c+r,a=(i+1)*c+r,s=n.material?.(r,i)??0,l=o.get(s)??[];o.set(s,l),e[r][0]>0&&l.push(t,t+1,a),e[r+1][0]>0&&l.push(a,t+1,a+1)}let l=new Vr,u=[];for(let[e,t]of o)l.addGroup(u.length,t.length,e),u.push(...t);return l.setAttribute(`position`,new kr(r,3)),l.setAttribute(`normal`,new kr(i,3)),l.setAttribute(`uv`,new kr(a,2)),l.setIndex(u),l.computeBoundingBox(),l.computeBoundingSphere(),l}function q_(e,t,n,r,i,a=10){return Array.from({length:a+1},(o,s)=>{let c=r+(i-r)*s/a;return[e+n*Math.cos(c),t+n*Math.sin(c)]})}function J_(e,t,n,r=192,i=!0,a){let o=new Vr,s=[],c=[],l=[],u=[[],[],[]],d=n/2,f=t/2,p=Math.min(1.05,n*.22),m=t-2*p,h=[];for(let e=0;e<4;e++){let t=e*Math.PI/2,n=Math.cos(t+Math.PI/4)>0?d-p:-d+p,r=Math.sin(t+Math.PI/4)>0?f-p:-f+p;for(let e=0;e<8;e++){let i=t+e/8*Math.PI/2;h.push({a:n+p*Math.cos(i),b:r+p*Math.sin(i),material:1})}let a=t+Math.PI/2,o=n+p*Math.cos(a),s=r+p*Math.sin(a),c=(e+1)*Math.PI/2,l=Math.cos(c+Math.PI/4)>0?d-p:-d+p,u=Math.sin(c+Math.PI/4)>0?f-p:-f+p,m=l+p*Math.cos(c),g=u+p*Math.sin(c);for(let t=0;t<12;t++){let n=t/12,r=o+(m-o)*n,a=s+(g-s)*n,c=e===0||e===2,l=c?.45*Math.sin(n*Math.PI):.035*Math.sin(n*Math.PI);h.push({a:r+(c?0:(e===3?1:-1)*l),b:a+(c?(e===0?1:-1)*l:0),material:e===3&&i?2:e===1?0:1})}}let g=h.length,_=[],v=[],y=[],b=[],x=[0],S;for(let t=0;t<=r;t++){let n=e.getPointAt(t/r),i=e.getTangentAt(t/r).normalize(),o=new Y(-i.y,i.x,0),s=a?a.outer.getPointAt(t/r):n.clone().addScaledVector(o,d);a&&(y.push(s),b.push(a.inner.getPointAt(t/r))),_.push(n),v.push(o),S&&x.push(x[t-1]+s.distanceTo(S)),S=s}for(let e=0;e<=r;e++)for(let t=0;t<=g;t++){let i=h[t%g],o=_[e],l=v[e];if(a){let t=b[e].clone().lerp(y[e],(i.a+d)/n);s.push(t.x,t.y,t.z+i.b)}else s.push(o.x+l.x*i.a,o.y+l.y*i.a,o.z+i.b);c.push(.5+i.b/m,1-x[e]/x[r])}for(let e=0;e<r;e++)for(let t=0;t<g;t++){let n=e*(g+1)+t,r=(e+1)*(g+1)+t;u[h[t].material].push(n,n+1,r,r,n+1,r+1)}u.forEach((e,t)=>{o.addGroup(l.length,e.length,t);for(let t of e)l.push(t)}),o.setAttribute(`position`,new kr(s,3)),o.setAttribute(`uv`,new kr(c,2)),o.setIndex(l),o.computeVertexNormals();let C=o.getAttribute(`normal`);for(let e=0;e<=r;e++){let t=e*(g+1),n=t+g,r=new Y().fromBufferAttribute(C,t).add(new Y().fromBufferAttribute(C,n)).normalize();C.setXYZ(t,r.x,r.y,r.z),C.setXYZ(n,r.x,r.y,r.z)}return o.userData.surfaceMetrics={width:m,length:x[r],aspect:m/x[r]},o.computeBoundingBox(),o}function Y_(e){let t=e.radius,n=e.handleReach,r=e.height*.865,i=e.height*.325,a=(e,n)=>new Y(t+e,n,0),o=new sa;return o.add(new aa(a(.25,r),a(5,r+1.3),a(n-11,r+1.3),a(n-5,r+1.3))),o.add(new aa(a(n-5,r+1.3),a(n-1.4,r+1.3),a(n,r-.3),a(n,r-4.5))),o.add(new aa(a(n,r-4.5),a(n,i+(r-i)*.43),a(n*.76,i),a(.25,i))),o.arcLengthDivisions=1200,{path:o,upper:r,lower:i}}function X_(e){let t=e.radius,n=e.handleReach,r=e.height*.865,i=e.height*.325,a=e.handleThickness/2,o=(e,n)=>new Y(t+e,n,0),s=new sa,c=new sa,l=n+a,u=r+a+.25,d=n-a,f=r-a-.35,p=2.4,m=5.6;return s.add(new aa(o(.25,r+a),o(7,u),o(l-p-7,u),o(l-p,u))),s.add(new aa(o(l-p,u),o(l-p*.448,u),o(l,u-p*.448),o(l,u-p))),s.add(new aa(o(l,u-p),o(l,i+(r-i)*.43),o(n*.76,i-a),o(.25,i-a))),c.add(new aa(o(.25,r-a-3.8),o(3,r-a-3.6),o(5.5,f),o(9,f))),c.add(new aa(o(9,f),o(12,f),o(d-m-3,f),o(d-m,f))),c.add(new aa(o(d-m,f),o(d-m*.448,f),o(d,f-m*.448),o(d,f-m))),c.add(new aa(o(d,f-m),o(d,i+(r-i)*.43),o(n*.72,i+a),o(.25,i+a))),s.arcLengthDivisions=1200,c.arcLengthDivisions=1200,{outer:s,inner:c}}function Z_(e,t,n,r=0){let i=[],a=[],o=[],s=[[-.35,n*.79,t*.58],[.1,n*.77,t*.58],[.6,n*.67,t*.55],[1.35,n*.55,t*.5],[2.2,n*.42,t*.43]];for(let t=0;t<s.length;t++){let[n,o,c]=s[t];for(let l=0;l<=64;l++){let u=l/64*Math.PI*2,d=Math.sign(Math.cos(u))*Math.abs(Math.cos(u))**.55*(o+(Math.cos(u)<0?r*(1-t/(s.length-1)*.35):0)),f=Math.sign(Math.sin(u))*Math.abs(Math.sin(u))**.55*c;i.push(Math.sqrt(e*e-f*f)+n,d,f),a.push(l/64,t/(s.length-1))}}for(let e=0;e<s.length-1;e++)for(let t=0;t<64;t++){let n=e*65+t,r=n+64+1;o.push(n,n+1,r,r,n+1,r+1)}let c=new Vr;c.setAttribute(`position`,new kr(i,3)),c.setAttribute(`uv`,new kr(a,2)),c.setIndex(o),c.computeVertexNormals();let l=c.getAttribute(`normal`);for(let e=0;e<s.length;e++){let t=e*65,n=t+64,r=new Y().fromBufferAttribute(l,t).add(new Y().fromBufferAttribute(l,n)).normalize();l.setXYZ(t,r.x,r.y,r.z),l.setXYZ(n,r.x,r.y,r.z)}return c.computeBoundingBox(),c}function Q_(e,t){let n=[],r=[],i=[];for(let i=0;i<=16;i++){let a=i/16,o=a*Math.PI/2,s=-.16+2.3*(1-Math.cos(o)),c=t*.5+1.6*(1-Math.sin(o)),l=e*.5+1.4*(1-Math.sin(o));for(let e=0;e<=64;e++){let t=e/64*Math.PI*2;n.push(Math.cos(t)*c,s,Math.sin(t)*l),r.push(e/64,a)}}for(let e=0;e<16;e++)for(let t=0;t<64;t++){let n=e*65+t,r=n+64+1;i.push(n,r,n+1,r,r+1,n+1)}let a=new Vr;a.setAttribute(`position`,new kr(n,3)),a.setAttribute(`uv`,new kr(r,2)),a.setIndex(i),a.computeVertexNormals();let o=a.getAttribute(`normal`);for(let e=0;e<=16;e++){let t=e*65,n=t+64,r=new Y().fromBufferAttribute(o,t).add(new Y().fromBufferAttribute(o,n)).normalize();o.setXYZ(t,r.x,r.y,r.z),o.setXYZ(n,r.x,r.y,r.z)}return a.computeBoundingBox(),a}var $_={radius:43,height:103,wall:2.2,bottom:5.5,bandAngle:Math.PI/3,handleReach:35,handleWidth:14,handleThickness:4.8,saucerRadius:75.5,lidOverhang:2.4};function ev(e){for(let t of Object.values(e))if(!Number.isFinite(t)||t<=0)throw Error(`尺寸必须为有限正数`);if(e.wall>=e.radius/4||e.bottom>=e.height/4||e.saucerRadius<=e.radius+10||e.bandAngle>=Math.PI)throw Error(`尺寸超出有效器型范围`)}function tv(e,t,n,r){let i=e.index,a=e.getAttribute(`uv2`),o=e.getAttribute(`position`),s=Array.from(i.array),c=e.groups.map(e=>({...e})),l=Array.from(a.array),u=new Map;for(let e of c)for(let r=e.start;r<e.start+e.count;r+=3){let i=s.slice(r,r+3),a=Math.min(...i.map(e=>e%t)),o=Math.min(...i.map(e=>Math.floor(e/t))),c=e.materialIndex===0&&a>=6&&a<=8&&o<n?1:e.materialIndex,l=u.get(c)??[];u.set(c,l),l.push(...i)}let d=[],f=[];for(let[e,t]of u){f.push({start:d.length,count:t.length,materialIndex:e});for(let e of t)d.push(e)}let p=`source-layout-v3`;return(t=`source-layout-v3`)=>{if(p===t)return!1;let n=t===`source-layout-v4`,u=n?d:s,m=n?f:c;i.array.set(u),i.needsUpdate=!0,e.clearGroups(),m.forEach(t=>e.addGroup(t.start,t.count,t.materialIndex));for(let e=0;e<a.count;e++)a.setY(e,n?(o.getY(e)-.12)/(r-2.42):l[e*2+1]);return a.needsUpdate=!0,p=t,e.userData.fixedMapping=t,!0}}function nv(e,t={...$_}){ev(t);let r=new zn,i=new zn,a=new zn,o=new zn;r.add(i,a,o);let s=(e,t,n,r,i=0)=>{let a=new di(t,n);return a.name=e,a.position.y=i,a.castShadow=!0,a.receiveShadow=!0,r.add(a),a},c=t.radius,l=t.height,u=t.wall,d=[[0,2.5],[c-8,2.5],[c-5,2.4],[c-3.8,1.8],[c-3.6,.6],[c-3.1,.12],[c-1.7,.12],[c-.8,.45],[c-.2,1.1],[c,2.8],[c,5],[c,l-2.3],...q_(c-u/2,l-2.3,u/2,0,Math.PI,16).slice(1),[c-u,12],[c-u-.25,9],[c-u-1.1,7.2],[c-u-3.5,t.bottom+.5],[c-u-6,t.bottom],[0,t.bottom]],f=Math.round(t.bandAngle/(2*Math.PI)*240),p=f/240*2*Math.PI,m=Math.round(f*(.5+n.body.visibleEndFraction)),h=s(`cup-wall-and-recessed-foot`,K_(d,240,{start:-p/2,material:(e,t)=>e>=6&&e<=10?t<f?e>=9?t<m?1:4:0:3:e===5?2:0,uv:(e,t,n)=>[(n+p/2)/p,(t-3)/(l-5.3)]}),[e.porcelain,e.regions.body,e.foot,e.city,e.wallPorcelain],i,-l/2);h.userData={circleRadius:c,bandRadians:p,visibleBandRadians:m/240*2*Math.PI,wallThickness:u};let g=[];for(let e=0;e<=240;e++)for(let[,t]of d)g.push((240-e)/(240-f),(t-.12)/(l-2.42));h.geometry.setAttribute(`uv1`,new kr(g,2));let _=h.geometry.getAttribute(`uv`),v=[];for(let e=0;e<_.count;e++)v.push(_.getX(e)/(.5+n.body.visibleEndFraction),_.getY(e));h.geometry.setAttribute(`uv2`,new kr(v,2));let y=tv(h.geometry,d.length,m,l),{path:b,upper:x,lower:S}=Y_(t);s(`wide-ribbon-handle`,J_(b,t.handleWidth,t.handleThickness,192,!0,X_(t)),[e.porcelain,e.gold,e.regions.handle],i,-l/2);for(let n of[x,S])s(`porcelain-handle-root`,Z_(c,t.handleWidth,t.handleThickness,n===x?2.5:0),e.porcelain,i,n-l/2);let C=i.children.find(e=>e.name===`porcelain-handle-root`),w=C.geometry.clone(),T=Z_(c,t.handleWidth,t.handleThickness,5),E=(e=`source-layout-v3`)=>{if(!y(e))return!1;let t=e===`source-layout-v4`?T:w;for(let e of[`position`,`normal`]){let n=C.geometry.getAttribute(e);n.array.set(t.getAttribute(e).array),n.needsUpdate=!0}return C.geometry.computeBoundingBox(),C.geometry.computeBoundingSphere(),!0},D=i.getObjectByName(`wide-ribbon-handle`);D.geometry.setAttribute(`uv2`,D.geometry.getAttribute(`uv`).clone());let O=c+t.lidOverhang,k=s(`lid-double-sided-with-seat`,K_([[0,-1.3],[c-7,-1.3],[c-5,-1.5],[c-4.5,-3.3],[c-3.8,-3.7],[c-3,-3.45],[c-2.7,-1],[O-1,-.35],[O,-.1],[O+.3,.6],[O,1.35],[O-1,1.65],[c-2,1.9],[c-10,1.9],[14,1.9],[0,1.9]],240,{material:e=>+(e>=8&&e<=10)}),[e.porcelain,e.gold],a);k.userData.topHeight=1.9;let A=J_(new qi(Array.from({length:81},(e,t)=>{let n=Math.PI-t/80*Math.PI;return new Y(Math.cos(n)*12.8,1.95+Math.sin(n)*11.7,0)})),10.5,4.4,440),j=e.porcelain.clone();j.name=`knob-striped-porcelain`;let M=A.index,N=A.getAttribute(`uv`),P=[],F=[[],[],[]];for(let e of A.groups)for(let t=e.start;t<e.start+e.count;t+=3){let n=[M.getX(t),M.getX(t+1),M.getX(t+2)],r=n.reduce((e,t)=>e+N.getY(t),0)/3;F[n.reduce((e,t)=>e+A.getAttribute(`position`).getY(t),0)/3<3.5?0:e.materialIndex===2&&r*22%1<.14?1:e.materialIndex].push(...n)}A.clearGroups(),F.forEach((e,t)=>{A.addGroup(P.length,e.length,t);for(let t of e)P.push(t)}),A.setIndex(P),s(`arched-bridge-knob`,A,[e.porcelain,e.gold,j],a);for(let t of[-12.8,12.8]){let n=Q_(10.5,4.4);n.translate(t,1.87,0),s(`knob-porcelain-fillet`,n,e.porcelain,a)}let I=t.saucerRadius,L=[[0,2.25],[I-19,2.25],[I-15.3,2.05],[I-14.3,1.4],[I-14.3,.45],[I-14.1,0],[I-12.8,0],[I-12.45,.4],[I-12.4,1],[I-12.2,1.6],[I-11.3,2.7],[I-10.1,3.7],[I-8.5,4],[I-5.9,4.15],[I-5.1,4.8],[I-5.3,5.9],[I-1.3,16.3],[I-.65,16.7],[I-.15,16.95],[I,17.35],[I-.15,17.9],[I-.65,18],[I-1.2,17.5],[I-2.2,15.5],[I-3.6,13.4],[I-6.8,9.3],[I-11.2,7.5],[c+8,6.25],[c+4,6.05],[c+2.65,6.45],[c+2,7],[c+1.15,7.08],[c+.4,6.65],[c-.4,6.12],[c-2,6],[0,6]],R=Math.hypot(4,10.4),z=K_(L,320,{material:e=>e===15?2:e>=8&&e<=14||e>=16&&e<=20||e>=29&&e<=32?1:e===5?3:0,uv:(e,t,r)=>[r/(Math.PI*2)*4+n.saucer.phaseBalance*Math.sin(r),(t-5.9)/10.4]});z.userData.surfaceMetrics={width:(I-3.3)*2*Math.PI/4,length:R,aspect:(I-3.3)*2*Math.PI/4/R},z.userData.profile=L;let ee=[];for(let e=0;e<=320;e++)for(let[,t]of L)ee.push(e/320,(t-5.9)/10.4);z.setAttribute(`uv2`,new kr(ee,2)),s(`saucer-bowl-and-continuous-rim`,z,[e.porcelain,e.gold,e.regions.saucer,e.foot],o);for(let[t,n,r]of[[i,2.5-l/2,`cup-bottom-mark`],[o,2.25,`saucer-bottom-mark`]]){let i=new di(new ca(20,14),e.mark);i.name=r,i.rotation.x=Math.PI/2,i.position.y=n-.012,t.add(i)}return i.position.set(0,6+l/2,0),a.position.y=6+l-.6,r.updateMatrixWorld(!0),{root:r,cup:i,lid:a,saucer:o,setFixedMapping:E,parameters:t,home:{cup:i.position.clone(),lid:a.position.clone(),saucer:o.position.clone()},dispose(){r.traverse(e=>{e instanceof di&&e.geometry.dispose()}),j.dispose(),w.dispose(),T.dispose()}}}function rv(e,t){let n=e.userData.porcelainArtworkCoverage;n&&(n.map.value=t,n.enabled.value=+!!t)}var iv=Object.freeze({color:`#fffdf7`,indirectGain:1.38,roughness:.16,clearcoatRoughness:.065});function av(e,t=!1){let n=e.onBeforeCompile,r=e.customProgramCacheKey.bind(e),i={value:1},a={value:null},o={value:0};return t&&(e.userData.porcelainArtworkCoverage={map:a,enabled:o}),e.onBeforeCompile=(r,s)=>{n.call(e,r,s),r.uniforms.porcelainCalibration=i,t&&(r.uniforms.porcelainArtworkMap=a,r.uniforms.porcelainArtworkEnabled=o,r.fragmentShader=`uniform sampler2D porcelainArtworkMap;
uniform float porcelainArtworkEnabled;
`+r.fragmentShader),r.fragmentShader=`uniform float porcelainCalibration;
`+r.fragmentShader;let c=t?`porcelainCoverage`:`1.0`,l=t?`float porcelainCoverage=1.0;
#ifdef USE_METALNESSMAP
porcelainCoverage=1.0-texture2D(metalnessMap,vMetalnessMapUv).b;
if(porcelainArtworkEnabled>0.5)porcelainCoverage=1.0-texture2D(porcelainArtworkMap,vMetalnessMapUv).r;
#endif
`:``;r.fragmentShader=r.fragmentShader.replace(`#include <lights_fragment_end>`,`#include <lights_fragment_end>\n${l}reflectedLight.indirectDiffuse *= 1.0 + ((${iv.indirectGain} * mix(1.08,0.45,smoothstep(-0.75,0.75,normal.x)))-1.0)*porcelainCalibration*${c};`)},e.customProgramCacheKey=()=>r()+`-porcelain-v3-`+t,e.needsUpdate=!0,{setEnabled(n){i.value=+!!n,t||e.color.set(n?iv.color:`#f4f3ed`)},uniform:i}}var ov=Object.freeze({relief:4.4,clearcoatRelief:2.4,exposure:1.08});function sv(){let e=new ba({color:iv.color,metalness:0,roughness:.16,clearcoat:1,clearcoatRoughness:.065,ior:1.5}),t=new ba({color:new X().setRGB(1,.6,.045),metalness:1,roughness:.065,clearcoat:.12,clearcoatRoughness:.075}),n=new ba({color:`#e7e5de`,metalness:0,roughness:.42,clearcoat:.25}),r=new ba({color:16777215,metalness:0,roughness:.22,clearcoat:1,clearcoatRoughness:.065,transparent:!0,alphaTest:.02,depthWrite:!1,polygonOffset:!0,polygonOffsetFactor:-1}),i=()=>new ba({color:16777215,envMapIntensity:.7,metalness:1,roughness:1,specularIntensity:.85,clearcoat:.4,clearcoatRoughness:.22,normalScale:new J(ov.relief,ov.relief),clearcoatNormalScale:new J(ov.clearcoatRelief,ov.clearcoatRelief)}),a={body:i(),handle:i(),saucer:i()},o=new ba({color:iv.color,metalness:0,roughness:41/255,clearcoat:1,clearcoatRoughness:.065,ior:1.5});return{porcelain:e,wallPorcelain:o,gold:t,foot:n,mark:r,regions:a,city:o.clone()}}function cv(e,t,n){G_(e,n),e.normalScale.setScalar(ov.relief),e.clearcoatNormalScale.setScalar(ov.clearcoatRelief),e.color.set(16777215),e.map=t.baseColor,e.normalMap=t.normal??null,e.clearcoatNormalMap=t.normal??null,e.metalnessMap=t.metalness??null,e.metalness=+!!t.metalness,e.roughnessMap=t.roughness??null,e.roughness=t.roughness?1:.29,e.needsUpdate=!0}new X(`#c1c0bc`);function lv(e,t){let n=new cn(512,512),r=new cn(512,512),i=new no(-150,150,150,-150,0,240);i.position.set(0,-.08,0),i.up.set(0,0,-1),i.lookAt(0,1,0);let a=new xa;a.onBeforeCompile=e=>{e.fragmentShader=e.fragmentShader.replace(`gl_FragColor = vec4( vec3( 1.0 - fragCoordZ ), opacity );`,`gl_FragColor = vec4( vec3( 0.0 ), pow( 1.0 - fragCoordZ, 7.0 ) * 0.42 );`)};let o=new qn,s=new no(-1,1,1,-1,0,1),c=new _a({uniforms:{map:{value:n.texture},direction:{value:new J(1/512,0)}},vertexShader:`varying vec2 vUv;void main(){vUv=uv;gl_Position=vec4(position.xy,0.,1.);}`,fragmentShader:`uniform sampler2D map;uniform vec2 direction;varying vec2 vUv;void main(){vec4 c=texture2D(map,vUv)*.227027;c+=(texture2D(map,vUv+direction*1.384615)+texture2D(map,vUv-direction*1.384615))*.316216;c+=(texture2D(map,vUv+direction*3.230769)+texture2D(map,vUv-direction*3.230769))*.070270;gl_FragColor=c;}`}),l=new di(new ca(2,2),c);o.add(l);let u=new di(new ca(300,300),new $r({map:n.texture,transparent:!0,depthWrite:!1,toneMapped:!1}));u.rotation.x=-Math.PI/2,u.position.y=-.09,u.renderOrder=1,t.add(u);let d=``;return{floor:u,releaseContext(){n.dispose(),r.dispose(),a.dispose(),c.dispose(),l.geometry.dispose(),d=``},invalidate(){d=``},update(l){let f=l.id+l.children.map(e=>[e.position.toArray(),e.quaternion.toArray(),e.visible].join(`,`)).join(`/`);if(f===d)return;d=f;let p=e.getRenderTarget(),m=t.background,h=t.overrideMaterial,g=e.getClearColor(new X),_=e.getClearAlpha();u.visible=!1,t.background=null,t.overrideMaterial=a,e.setClearColor(0,0),e.setRenderTarget(n),e.clear(),e.render(t,i),t.overrideMaterial=h,t.background=m;for(let t of[1.3,1.3])c.uniforms.map.value=n.texture,c.uniforms.direction.value.set(t/512,0),e.setRenderTarget(r),e.clear(),e.render(o,s),c.uniforms.map.value=r.texture,c.uniforms.direction.value.set(0,t/512),e.setRenderTarget(n),e.clear(),e.render(o,s);e.setRenderTarget(p),e.setClearColor(g,_),u.visible=!0},dispose(){n.dispose(),r.dispose(),a.dispose(),l.geometry.dispose(),c.dispose(),u.geometry.dispose(),u.material.dispose()}}}function uv(e,t=!1,n={}){let r=new Ul({canvas:e,antialias:!0,alpha:t,preserveDrawingBuffer:!n.consumer,powerPreference:`high-performance`});r.setPixelRatio(Math.min(devicePixelRatio,n.mobile?1.5:2)),r.outputColorSpace=Ye,r.toneMapping=4,r.toneMappingExposure=ov.exposure,r.shadowMap.enabled=!0,r.shadowMap.type=1;let i=new qn;i.background=t?null:new X(`#b7b8ba`),t&&r.setClearColor(0,0);let a=new to(33,1,.5,2500);a.position.set(205,175,285);function o(e){if(!n.consumer)return e;let t=e.clone();return t.depthBuffer=!1,r.initRenderTarget(t),r.copyTextureToTexture(e.texture,t.texture),e.dispose(),t}function s(){let e=new qn;e.background=new X(`#565961`);let t=new di(new Li(100,100,100),new $r({color:new X().setScalar(.3),side:1}));e.add(t);for(let[t,n,r,i,a,o]of[[-24,12,28,18,38,3],[28,20,-18,14,38,3],[0,44,0,32,9,4],[-10,-35,-10,70,60,.7],[-20,8,-36,32,35,.45],[5,38,30,32,3,4],[32,4,25,7,32,2.8],[10,5,39,17,40,.008],[-35,1,15,10,40,.015],[-10,5,-39,12,36,.008],[35,-4,-10,14,24,.025]]){let s=new di(new ca(i,a),new $r({color:new X().setScalar(o)}));s.position.set(t,n,r),s.lookAt(0,0,0),e.add(s)}let n=new Xo(r),a=o(n.fromScene(e,.025,.1,200));i.environment=a.texture,i.environmentIntensity=1;for(let t of e.children){if(!(t instanceof di))continue;let e=t.material,n=e.color.r;e.color.setScalar(n<.1?.045:n>=2?n*1.65:n===.3?.42:n)}let s=o(n.fromScene(e,.035,.1,200));for(let t of e.children)if(t instanceof di){let e=t.material;e.color.setScalar(e.color.r<.5?.65:Math.min(e.color.r,4.5))}let c=o(n.fromScene(e,.1,.1,200));return n.dispose(),e.traverse(e=>{e instanceof di&&(e.geometry.dispose(),e.material.dispose())}),{env:a,cupEnvironment:s,porcelainEnvironment:c}}let c=s(),l=!1,u=new io(`#fffdf5`,1.2);u.position.set(-90,220,150),u.castShadow=!0,u.shadow.mapSize.set(n.mobile&&n.consumer?1024:2048,n.mobile&&n.consumer?1024:2048),u.shadow.camera.left=-170,u.shadow.camera.right=170,u.shadow.camera.top=200,u.shadow.camera.bottom=-140,u.shadow.camera.near=1,u.shadow.camera.far=600,u.shadow.bias=-15e-5,u.shadow.normalBias=.25,u.shadow.radius=6,u.shadow.blurSamples=12,i.add(u),i.add(new Ua(`#f4f6ff`,`#737270`,.35));let d=new io(`#edf3ff`,.3);d.position.set(140,100,-140),i.add(d);let f=lv(r,i),p=f.floor,m=()=>{let{width:t,height:n}=e.getBoundingClientRect();r.setSize(t,n,!1),a.aspect=t/Math.max(n,1),a.updateProjectionMatrix(),e.dispatchEvent(new Event(`viewport-resize`))},h=new ResizeObserver(m);h.observe(e),m();let g=Math.max(1,r.getContext().getParameter(r.getContext().SAMPLES));return{memory:()=>({environments:Object.values(c).reduce((e,t)=>e+t.width*t.height*(8+(t.depthBuffer?4:0)),0),shadow:u.shadow.mapSize.x*u.shadow.mapSize.y*8,contact:4194304,framebuffer:e.width*e.height*(4+8*g)}),renderer:r,scene:i,camera:a,resize:m,floor:p,contact:f,get cupEnvironment(){return c.cupEnvironment.texture},get porcelainEnvironment(){return c.porcelainEnvironment.texture},releaseContext(){Object.values(c).forEach(e=>e.dispose()),l=!0,u.shadow.map?.dispose(),f.releaseContext()},rebuildEnvironment(){l||Object.values(c).forEach(e=>e.dispose()),c=s(),l=!1},dispose(){h.disconnect(),Object.values(c).forEach(e=>e.dispose()),f.dispose(),r.dispose()}}}function dv(e,t,n,r=[],i){let a=new as(512,{type:F,minFilter:T,generateMipmaps:!1}),o=new so(.3,2500,a),s=t.cup.getObjectByName(`cup-wall-and-recessed-foot`),c=t.cup.getObjectByName(`cup-bottom-mark`),l,u=!0,d=!1,f=!1,p=0,m=``,h=``,g=0,_=new Y,v={cupProbePosition:{value:_},cupProbeHandleDirection:{value:new Y(1,0,0)},cupProbeMinimum:{value:new Y},cupProbeMaximum:{value:new Y},cupProbeEnabled:{value:0}},y=[n,...r];for(let t of y)t.envMap=e.cupEnvironment,t.onBeforeCompile=e=>{Object.assign(e.uniforms,v),e.vertexShader=e.vertexShader.replace(`#include <common>`,`#include <common>
varying vec3 vCupProbePosition;`).replace(`#include <worldpos_vertex>`,`#include <worldpos_vertex>
vCupProbePosition = (modelMatrix * vec4(transformed, 1.0)).xyz;`);let t=Oo.envmap_physical_pars_fragment.replace(`vec4 envMapColor = textureCubeUV( envMap, envMapRotation * reflectVec, roughness );`,`
   float handleSector = smoothstep(0.55, 0.85, dot(reflectVec,cupProbeHandleDirection)) * (1.0 - smoothstep(0.3, 0.7, abs(dot(reflectVec,cross(cupProbeHandleDirection,vec3(0.0,1.0,0.0)))))) * cupProbeEnabled;
   vec3 safeRay = mix(vec3(-1.0), vec3(1.0), step(vec3(0.0), reflectVec)) * max(abs(reflectVec), vec3(0.00001));
   vec3 distances = max((cupProbeMaximum-vCupProbePosition)/safeRay, (cupProbeMinimum-vCupProbePosition)/safeRay);
   float travel = max(0.0, min(min(distances.x, distances.y), distances.z));
   vec3 localDirection = normalize(vCupProbePosition + reflectVec * travel - cupProbePosition);
   reflectVec = normalize(mix(reflectVec, localDirection, handleSector));
   vec4 envMapColor = textureCubeUV( envMap, envMapRotation * reflectVec, roughness );`);e.fragmentShader=`varying vec3 vCupProbePosition;
uniform vec3 cupProbePosition;
uniform vec3 cupProbeHandleDirection;
uniform vec3 cupProbeMinimum;
uniform vec3 cupProbeMaximum;
uniform float cupProbeEnabled;
`+e.fragmentShader.replace(`#include <envmap_physical_pars_fragment>`,t)},t.customProgramCacheKey=()=>`cup-local-reflection-parallax-v1`;let b=()=>t.root.children.map(e=>[...e.position.toArray(),...e.quaternion.toArray(),+!!e.visible].map(e=>e.toFixed(3)).join(`,`)).join(`/`);function x(n={}){if(f||!d)return;let{renderer:r,scene:h}=e,g=h.background,x=h.backgroundBlurriness,S=r.shadowMap.autoUpdate,C=[s,c,e.floor];n.includeHandle===!1&&C.push(t.cup.getObjectByName(`wide-ribbon-handle`));let w=C.map(e=>e.visible);i?.(!0);let T=new Xo(e.renderer);try{t.root.updateMatrixWorld(!0),t.cup.getWorldPosition(_),o.position.copy(_),v.cupProbeHandleDirection.value.set(1,0,0).transformDirection(t.cup.matrixWorld),v.cupProbeMinimum.value.copy(_).add(new Y(-83,-65,-83)),v.cupProbeMaximum.value.copy(_).add(new Y(83,65,83)),C.forEach(e=>e.visible=!1),h.background=e.cupEnvironment,h.backgroundBlurriness=0,r.shadowMap.autoUpdate=!1,o.update(r,h);let n=T.fromCubemap(a.texture);l?.dispose(),l=n,p++,m=b()}finally{T.dispose(),a.dispose(),i?.(!1),C.forEach((e,t)=>e.visible=w[t]),h.background=g,h.backgroundBlurriness=x,r.shadowMap.autoUpdate=S}if(u){for(let e of y)e.envMap=l.texture,e.needsUpdate=!0;v.cupProbeEnabled.value=1}}return{initialize(){d=!0,x()},releaseContext(){a.dispose(),l?.dispose(),l=void 0,d=!1,m=``},invalidate(){m=``,d=!1;for(let t of y)t.envMap=e.cupEnvironment,t.needsUpdate=!0},update(e){if(!d||f||!u)return;let t=b();t!==h&&(h=t,g=e),t!==m&&e-g>160&&x()},setEnabled(t){if(u=t,v.cupProbeEnabled.value=+!!t,t)x();else for(let t of y)t.envMap=e.cupEnvironment,t.needsUpdate=!0},refresh:x,debug(){return{enabled:u,ready:d,captures:p,resolution:512,position:_.toArray(),envMap:n.envMap?.uuid,method:`local cube probe; cup wall excluded, real nearby geometry included`,approximation:`single centre probe with finite-volume correction near handle; no ray tracing or multiple bounces`}},dispose(){if(!f){f=!0;for(let e of y)e.envMap=null;a.dispose(),l?.dispose()}}}}var fv=class e extends di{constructor(t,n={}){super(t),this.isReflector=!0,this.type=`Reflector`,this.forceUpdate=!1,this._reflectionCameras=new WeakMap;let r=this,i=n.color===void 0?new X(8355711):new X(n.color),a=n.textureWidth||512,o=n.textureHeight||512,s=n.clipBias||0,c=n.shader||e.ReflectorShader,l=n.multisample===void 0?4:n.multisample,u=new Gr,d=new Y,f=new Y,p=new Y,m=new dn,h=new Y(0,0,-1),g=new on,_=new Y,v=new Y,y=new on,b=new dn,x=new cn(a,o,{samples:l,type:F}),S=new _a({name:c.name===void 0?`unspecified`:c.name,uniforms:ma.clone(c.uniforms),fragmentShader:c.fragmentShader,vertexShader:c.vertexShader});S.uniforms.tDiffuse.value=x.texture,S.uniforms.color.value=i,S.uniforms.textureMatrix.value=b,this.material=S,this.onBeforeRender=function(e,t,n){let i=this.getReflectionCamera(n);if(f.setFromMatrixPosition(r.matrixWorld),p.setFromMatrixPosition(n.matrixWorld),m.extractRotation(r.matrixWorld),d.set(0,0,1),d.applyMatrix4(m),_.subVectors(f,p),_.dot(d)>0&&this.forceUpdate===!1)return;_.reflect(d).negate(),_.add(f),m.extractRotation(n.matrixWorld),h.set(0,0,-1),h.applyMatrix4(m),h.add(p),v.subVectors(f,h),v.reflect(d).negate(),v.add(f),i.position.copy(_),i.up.set(0,1,0),i.up.applyMatrix4(m),i.up.reflect(d),i.lookAt(v),i.far=n.far,i.updateMatrixWorld(),i.projectionMatrix.copy(n.projectionMatrix),b.set(.5,0,0,.5,0,.5,0,.5,0,0,.5,.5,0,0,0,1),b.multiply(i.projectionMatrix),b.multiply(i.matrixWorldInverse),b.multiply(r.matrixWorld),u.setFromNormalAndCoplanarPoint(d,f),u.applyMatrix4(i.matrixWorldInverse),g.set(u.normal.x,u.normal.y,u.normal.z,u.constant);let a=i.projectionMatrix;i.isOrthographicCamera?(y.x=(Math.sign(g.x)+a.elements[8])/a.elements[0],y.y=(Math.sign(g.y)+a.elements[9])/a.elements[5],y.z=-n.far,y.w=1):(y.x=(Math.sign(g.x)+a.elements[8])/a.elements[0],y.y=(Math.sign(g.y)+a.elements[9])/a.elements[5],y.z=-1,y.w=(1+a.elements[10])/a.elements[14]),g.multiplyScalar(2/g.dot(y)),a.elements[2]=g.x,a.elements[6]=g.y,i.isOrthographicCamera?(a.elements[10]=g.z-s,a.elements[14]=g.w-1):(a.elements[10]=g.z+1-s,a.elements[14]=g.w),r.visible=!1;let o=e.getRenderTarget(),c=e.xr.enabled,l=e.shadowMap.autoUpdate;e.xr.enabled=!1,e.shadowMap.autoUpdate=!1,e.setRenderTarget(x),e.state.buffers.depth.setMask(!0),e.autoClear===!1&&e.clear(),e.render(t,i),e.xr.enabled=c,e.shadowMap.autoUpdate=l,e.setRenderTarget(o);let S=n.viewport;S!==void 0&&e.state.viewport(S),r.visible=!0,this.forceUpdate=!1},this.getRenderTarget=function(){return x},this.dispose=function(){x.dispose(),r.material.dispose()},this.getReflectionCamera=function(e){let t=this._reflectionCameras.get(e);return t===void 0&&(t=e.clone(),this._reflectionCameras.set(e,t)),t}}};fv.ReflectorShader={name:`ReflectorShader`,uniforms:{color:{value:null},tDiffuse:{value:null},textureMatrix:{value:null}},vertexShader:`
		uniform mat4 textureMatrix;
		varying vec4 vUv;

		#include <common>
		#include <logdepthbuf_pars_vertex>

		void main() {

			vUv = textureMatrix * vec4( position, 1.0 );

			gl_Position = projectionMatrix * modelViewMatrix * vec4( position, 1.0 );

			#include <logdepthbuf_vertex>

		}`,fragmentShader:`
		uniform vec3 color;
		uniform sampler2D tDiffuse;
		varying vec4 vUv;

		#include <logdepthbuf_pars_fragment>

		float blendOverlay( float base, float blend ) {

			return( base < 0.5 ? ( 2.0 * base * blend ) : ( 1.0 - 2.0 * ( 1.0 - base ) * ( 1.0 - blend ) ) );

		}

		vec3 blendOverlay( vec3 base, vec3 blend ) {

			return vec3( blendOverlay( base.r, blend.r ), blendOverlay( base.g, blend.g ), blendOverlay( base.b, blend.b ) );

		}

		void main() {

			#include <logdepthbuf_fragment>

			vec4 base = texture2DProj( tDiffuse, vUv );
			gl_FragColor = vec4( blendOverlay( base.rgb, color ), 1.0 );

			#include <tonemapping_fragment>
			#include <colorspace_fragment>

		}`};function pv(e,t,n){let r=t.lid.getObjectByName(`lid-double-sided-with-seat`),i=r.material,a=n.clone();a.name=`lid-planar-glaze`,r.material=[a,i[1]];let o=new fv(new ca(1,1),{textureWidth:1024,textureHeight:1024,multisample:0});o.rotation.x=-Math.PI/2,o.visible=!1,t.lid.add(o),o.position.y=r.userData.topHeight;let s={lidReflection:{value:o.getRenderTarget().texture},lidReflectionMatrix:{value:new dn},lidReflectionEnabled:{value:0}},c=0,l=``,u=!1,d=n.onBeforeCompile,f=n.customProgramCacheKey.bind(n);a.onBeforeCompile=(e,t)=>{d.call(a,e,t),Object.assign(e.uniforms,s),e.vertexShader=`uniform mat4 lidReflectionMatrix;
varying vec4 vLidReflection;
varying float vLidTop;
`+e.vertexShader,e.vertexShader=e.vertexShader.replace(`#include <worldpos_vertex>`,`#include <worldpos_vertex>
vLidReflection=lidReflectionMatrix*modelMatrix*vec4(transformed,1.0);
vLidTop=smoothstep(0.94,0.999,normal.y);`),e.fragmentShader=`uniform sampler2D lidReflection;
uniform float lidReflectionEnabled;
varying vec4 vLidReflection;
varying float vLidTop;
`+e.fragmentShader,e.fragmentShader=e.fragmentShader.replace(`#include <opaque_fragment>`,`
   vec2 lidUv=vLidReflection.xy/vLidReflection.w;
   vec4 lidSample=texture2D(lidReflection,lidUv)*0.5;
   lidSample+=(texture2D(lidReflection,lidUv+vec2(0.0008,0.0))+texture2D(lidReflection,lidUv-vec2(0.0008,0.0))+texture2D(lidReflection,lidUv+vec2(0.0,0.0008))+texture2D(lidReflection,lidUv-vec2(0.0,0.0008)))*0.125;
   float lidFresnel=0.04+0.96*pow(1.0-clamp(dot(normal,geometryViewDir),0.0,1.0),5.0);
   float lidCoverage=lidSample.a*vLidTop*lidReflectionEnabled*step(0.0,lidUv.x)*step(lidUv.x,1.0)*step(0.0,lidUv.y)*step(lidUv.y,1.0);
   outgoingLight=mix(outgoingLight,lidSample.rgb/max(lidSample.a,0.001),lidCoverage*lidFresnel*0.85);
   #include <opaque_fragment>`)},a.customProgramCacheKey=()=>f()+`-lid-planar-v3`,a.needsUpdate=!0;let p=new Y,m=new X;function h(){if(u||!t.lid.visible)return;if(t.root.updateMatrixWorld(!0),e.camera.updateMatrixWorld(!0),o.getWorldPosition(p),e.camera.position.y<=p.y){s.lidReflectionEnabled.value=0;return}let n=[...e.camera.matrixWorld.elements,...e.camera.projectionMatrix.elements,...t.lid.matrixWorld.elements].map(e=>e.toFixed(5)).join(`,`);if(n===l){s.lidReflectionEnabled.value=1;return}let{scene:i,renderer:a,camera:d}=e,f=i.background,h=a.getClearAlpha();a.getClearColor(m);let g=[t.cup,t.saucer,r,e.floor],_=g.map(e=>e.visible);try{g.forEach(e=>e.visible=!1),i.background=null,a.setClearColor(0,0),o.onBeforeRender(a,i,d,o.geometry,o.material,null),s.lidReflectionMatrix.value.copy(o.material.uniforms.textureMatrix.value).multiply(new dn().copy(o.matrixWorld).invert()),s.lidReflectionEnabled.value=1,c++,l=n}finally{g.forEach((e,t)=>e.visible=_[t]),o.visible=!1,i.background=f,a.setClearColor(m,h)}}return{update:h,releaseContext(){o.getRenderTarget().dispose(),l=``},invalidate(){l=``,a.envMap=e.porcelainEnvironment,a.needsUpdate=!0},debug:()=>({method:`planar reflection of actual lid knob`,captures:c,resolution:1024}),dispose(){u=!0,r.material=i,t.lid.remove(o),o.geometry.dispose(),o.dispose(),a.dispose()}}}var mv=0,hv=[];async function gv(){if(mv<4){mv++;return}await new Promise(e=>hv.push(e))}function _v(){let e=hv.shift();e?e():mv--}function vv(e){return new Promise((t,n)=>{let r=new Image;r.crossOrigin=`anonymous`;let i=()=>{clearTimeout(a),r.onload=null,r.onerror=null},a=window.setTimeout(()=>{i(),r.src=``,n(Error(`贴图请求超时`))},12e4);r.onload=()=>{i();let e=new an(r);e.needsUpdate=!0,t(e)},r.onerror=()=>{i(),n(Error(`贴图请求中断`))},r.src=e})}async function yv(e){await gv();try{let t=new URL(e,document.baseURI),n=/^https?:$/.test(t.protocol),r;for(let i=0;i<(n?3:1);i++){i&&(await new Promise(e=>window.setTimeout(e,400*i)),t.searchParams.set(`_textureRetry`,`${i}-${Date.now()}`));try{return await vv(i?t.href:e)}catch(e){r=e}}throw r}finally{_v()}}async function bv(e,t=12e4,n=fetch){let r=new AbortController,i,a=()=>{clearTimeout(i),i=setTimeout(()=>r.abort(),t)};a();try{let t=await n(e,{signal:r.signal});if(!t.ok||!t.body)throw Error(`资源读取失败 (${t.status})`);a();let i=t.body.pipeThrough(new TransformStream({transform(e,t){e.byteLength&&a(),t.enqueue(e)}}));return await new Response(i).arrayBuffer()}finally{clearTimeout(i)}}function xv(e){if(e.byteLength<16)throw Error(`高精度法线数据不完整`);let t=new DataView(e);if(t.getUint32(0,!1)!==1212567089||t.getUint32(12,!0)!==1)throw Error(`不支持的高精度法线格式`);let n=t.getUint32(4,!0),r=t.getUint32(8,!0);if(n<1||r<1||n>8192||r>8192||e.byteLength!==16+n*r*8)throw Error(`高精度法线尺寸或数据长度错误`);let i=new Uint16Array(e,16);for(let e=0;e<i.length;e++)if(i[e]>15360)throw Error(`高精度法线数值越界`);let a=new mi(i,n,r,V,F);return a.flipY=!1,a.generateMipmaps=!0,a.minFilter=D,a.magFilter=T,a.userData={precision:`RGBA16F`,sourceRows:`bottom-up`},a.needsUpdate=!0,a}async function Sv(e){let t;for(let n=0;n<3;n++)try{let t=new URL(e,document.baseURI);n&&/^https?:$/.test(t.protocol)&&t.searchParams.set(`_normalRetry`,`${n}-${Date.now()}`);let r=await bv(t),i=new Uint8Array(r,0,Math.min(4,r.byteLength));return xv(i[0]===31&&i[1]===139?await new Response(new Blob([r]).stream().pipeThrough(new DecompressionStream(`gzip`))).arrayBuffer():r)}catch(n){if(t=n,!/^https?:/.test(new URL(e,document.baseURI).protocol))break}throw t}var Cv={saucer:{rows:2,contentWidth:8128,contentHeight:512,gutter:32}},wv={"fixed/body-baseColor":`textures/fixed-body-baseColor-09eb4a8337a419e2.webp`,"fixed/body-normal":`textures/fixed-body-normal-35f734f1f0e18386.hfn.gz`,"fixed/body-roughness":`textures/fixed-body-roughness-102dbdb72defbc0f.webp`,"fixed/body-metalness":`textures/fixed-body-metalness-4ebf050fa28829cb.webp`,"fixed/handle-baseColor":`textures/fixed-handle-baseColor-532fac87777aba59.webp`,"fixed/handle-normal":`textures/fixed-handle-normal-e40aff13da6fbc75.hfn.gz`,"fixed/handle-roughness":`textures/fixed-handle-roughness-97a411c84ffbd9fb.webp`,"fixed/handle-metalness":`textures/fixed-handle-metalness-03cad18610d2317d.webp`,"fixed/saucer-baseColor":`textures/fixed-saucer-baseColor-69f9090a7ca74212.webp`,"fixed/saucer-normal":`textures/fixed-saucer-normal-24251c222bf45839.hfn.gz`,"fixed/saucer-roughness":`textures/fixed-saucer-roughness-a4cde265336cff98.webp`,"fixed/saucer-metalness":`textures/fixed-saucer-metalness-c0cbc2a353201be4.webp`,"china/baseColor":`textures/china-baseColor-754558a83d8866b8.webp`,"china/normal":`textures/china-normal-f0662e241725d83b.webp`,"china/roughness":`textures/china-roughness-40e7b97659e5e028.webp`,"china/metalness":`textures/china-metalness-7ac9525c8019fc98.webp`},Tv=new X(`#ffc846`),Ev=new WeakSet;function Dv(e,t=!1){if(e.userData.cleanGoldGround=t,!Ev.has(e)){Ev.add(e);let t=e.onBeforeCompile,n=e.customProgramCacheKey.bind(e);e.onBeforeCompile=(n,r)=>{if(t.call(e,n,r),!e.userData.cleanGoldGround)return;let i=e.userData.fixedAtlas?`sampleFixedAtlas`:`texture2D`;n.fragmentShader=n.fragmentShader.replace(`#include <color_fragment>`,`
    #if defined(USE_MAP) && defined(USE_METALNESSMAP)
      float bareGold=${i}(metalnessMap,vMetalnessMapUv).b;
      diffuseColor.rgb=mix(diffuseColor.rgb,vec3(${Tv.r.toFixed(9)},${Tv.g.toFixed(9)},${Tv.b.toFixed(9)}),smoothstep(0.92,0.965,bareGold));
    #endif
    #include <color_fragment>`)},e.customProgramCacheKey=()=>n()+`-clean-gold-blue-channel-`+!!e.userData.cleanGoldGround}e.needsUpdate=!0}var Ov={name:`固定广彩 · 高清重建花纸`,mapping:`source-layout-v3`,regions:Object.fromEntries([`body`,`handle`,`saucer`].map(e=>[e,Object.fromEntries([`baseColor`,`normal`,`roughness`,`metalness`].map(t=>[t,`/${wv[`fixed/${e}-${t}`]}`]))]))};Ov.regions.saucer.offsetU=n.saucer.sourceOffsetU,Ov.cleanGoldGround=!0;for(let[e,t]of Object.entries(Cv))Ov.regions[e].atlas=t;for(let e of Object.values(Ov.regions))e.normal?.endsWith(`.hfn.gz`)&&(e.normalFormat=`rgba16f-gzip-v1`);[Ov.name,...[{id:`peony-magnolia`,name:`牡丹玉兰 · 金地`,description:`珊瑚牡丹、白玉兰与翠叶`},{id:`lotus-butterfly`,name:`莲荷双蝶 · 金地`,description:`粉莲、青荷与两只彩蝶`}].map(e=>({...e,path:`artwork/${e.id}`,pack:{name:e.name,regions:Object.fromEntries([`body`,`handle`,`saucer`].map(t=>[t,Object.fromEntries([`baseColor`,`normal`,`roughness`,`metalness`,`height`].map(n=>[n,`/artwork/${e.id}/${t}-${n}.png?v=dense-v3-final`]))]))}}))];var kv=[`baseColor`,`normal`,`roughness`,`metalness`,`height`],Av=[`body`,`handle`,`saucer`],jv=class{materials;anisotropy;onChange;pool;mapping;get currentMapping(){return this.mapping??`source-layout-v3`}offsets={};aspects={body:45.0294947/106.7,handle:11.9/117.6181655,saucer:106.1072919/7.1867934};fit(e){this.aspects=e;for(let t of Av)for(let n of Object.values(this.currentMaps[t]??{})){let r=n.image;if(this.mapping===`source-layout-v3`||this.mapping===`source-layout-v4`){let e=this.mapping===`source-layout-v4`,r=this.offsets[t]??0;n.repeat.set(e?-1:1,1),n.offset.set(e?1-r:r,0),n.updateMatrix();continue}let i=r.width/r.height,a=e[t],o=Math.min(1,a/i),s=Math.min(1,i/a);n.repeat.set(o,s),n.offset.set((1-o)/2+(this.offsets[t]??0),(1-s)/2),n.updateMatrix()}}revision=0;owned=[];leases=[];controller;currentName=`正在载入花纸`;currentMaps={};constructor(e,t,n,r){this.materials=e,this.anisotropy=t,this.onChange=n,this.pool=r}async apply(e){let t=++this.revision;if(this.pool&&Av.every(t=>e.regions[t].runtime))return this.applyRuntime(e,t);if(!e||typeof e.name!=`string`||!e.regions)throw Error(`无效材质包：缺少 name / regions`);if(e.mapping!==void 0&&![`source-layout-v3`,`source-layout-v4`].includes(e.mapping))throw Error(`不支持的花纸展开规范`);let n=[];for(let t of Av){let r=e.regions[t];if(!r?.baseColor)throw Error(`材质包缺少 ${t}.baseColor`);if(r.offsetU!==void 0&&(!Number.isFinite(r.offsetU)||Math.abs(r.offsetU)>2))throw Error(`花纸定位无效`);if(r.normalFormat!==void 0&&(r.normalFormat!==`rgba16f-gzip-v1`||!r.normal))throw Error(`高精度法线格式无效`);for(let e of kv)r[e]&&n.push({region:t,channel:e,url:r[e],normalFormat:e===`normal`?r.normalFormat:void 0})}let r=await Promise.allSettled(n.map(async t=>{let n=t.normalFormat?await Sv(t.url):await yv(t.url),r=n.image;if(!r.width||!r.height||r.width>8192||r.height>8192)throw n.dispose(),Error(`贴图尺寸必须在 1–8192 像素内`);return n.colorSpace=t.channel===`baseColor`?Ye:``,n.channel=e.mapping?.startsWith(`source-layout-`)?2:0,n.wrapS=t.region===`saucer`?e.mapping?.startsWith(`source-layout-`)?y:x:b,n.wrapT=b,n.anisotropy=this.anisotropy,n})),i=r.flatMap(e=>e.status===`fulfilled`?[e.value]:[]),a=()=>i.forEach(e=>e.dispose());if(t!==this.revision)return a(),!1;if(r.some(e=>e.status===`rejected`))throw a(),Error(`有贴图未能读取；已保留当前图案。检查文件或跨域设置。`);let o={};n.forEach((e,t)=>{o[e.region]??={},o[e.region][e.channel]=i[t]});for(let t of Av){let n=o[t],{width:r,height:i}=n.baseColor.image;try{if(e.regions[t].atlas){if(![`source-layout-v3`,`source-layout-v4`].includes(e.mapping??``))throw Error(`图集需要独立花纸 UV`);U_(e.regions[t].atlas,r,i)}}catch(e){throw a(),e}if(Object.values(n).some(e=>e.image.width!==r||e.image.height!==i))throw a(),Error(`${t} 的 PBR 通道像素尺寸不一致，未应用。`)}return Av.forEach(t=>{cv(this.materials.regions[t],o[t],e.regions[t].atlas),Dv(this.materials.regions[t],e.cleanGoldGround===!0)}),this.owned.forEach(e=>e.dispose()),this.owned=i,this.mapping=e.mapping,this.currentMaps=o,this.offsets=Object.fromEntries(Av.map(t=>[t,e.regions[t].offsetU??0])),this.fit(this.aspects),this.currentName=e.name,this.onChange(),!0}async flatFile(e){if(!e.type.startsWith(`image/`))throw Error(`请选择 PNG、JPEG 或 WebP 图片`);let t=URL.createObjectURL(e);try{return await this.apply({name:`平面印花 · ${e.name}`,regions:{body:{baseColor:t},handle:{baseColor:t},saucer:{baseColor:t}}})}finally{URL.revokeObjectURL(t)}}async folder(e){let t=e.find(e=>e.name===`style.json`);if(!t)throw Error(`文件夹内需要 style.json`);let n=JSON.parse(await t.text()),r=[],i=t.webkitRelativePath.split(`/`).slice(0,-1).join(`/`);try{for(let t of Av)for(let a of kv){let o=n.regions?.[t]?.[a];if(!o)continue;if(o.includes(`..`)||o.includes(`://`))throw Error(`本地材质包只接受包内相对路径`);let s=e.find(e=>e.webkitRelativePath===`${i}/${o}`||e.name===o);if(!s)throw Error(`找不到 ${o}`);let c=URL.createObjectURL(s);r.push(c),n.regions[t][a]=c}return await this.apply(n)}finally{r.forEach(e=>URL.revokeObjectURL(e))}}precision(){return Object.fromEntries(Object.entries(this.currentMaps).map(([e,t])=>{let n=t.normal?.image;return[e,{mapping:this.currentMapping,repeat:t.normal?.repeat.toArray(),offset:t.normal?.offset.toArray(),normalType:t.normal?.type,anisotropy:t.normal?.anisotropy,normalSize:[n?.width,n?.height],precision:t.normal?.userData.precision??`8-bit`,normalFlipY:t.normal?.flipY,atlas:this.materials.regions[e].userData.fixedAtlas??null}]}))}async applyRuntime(e,t){this.controller?.abort();let n=this.controller=new AbortController,r=[],i=this.pool.beginSwap();try{let i=Av.flatMap(t=>{let n=e.regions[t].runtime;return[n.baseColor,n.normal,n.orm]});if(r=await this.pool.acquireAll(i,n.signal),t!==this.revision)return!1;let a={};Av.forEach((t,n)=>{let[i,o,s]=r.slice(n*3,n*3+3).map(e=>e.texture),c=e.regions[t];c.atlas&&U_(c.atlas,c.runtime.baseColor.width,c.runtime.baseColor.height);for(let e of[i,o,s])e.channel=2,e.anisotropy=this.anisotropy,e.wrapS=t===`saucer`?y:b;a[t]={baseColor:i,normal:o,roughness:s,metalness:s}}),Av.forEach(t=>{cv(this.materials.regions[t],a[t],e.regions[t].atlas),Dv(this.materials.regions[t],!0),Gl(this.materials.regions[t])});let o=this.leases;return this.leases=r,r=[],o.forEach(e=>e.release()),this.owned.forEach(e=>e.dispose()),this.owned=[],this.mapping=e.mapping,this.currentMaps=a,this.offsets=Object.fromEntries(Av.map(t=>[t,e.regions[t].offsetU??0])),this.fit(this.aspects),this.currentName=e.name,this.onChange(),!0}catch(e){if(n.signal.aborted)return!1;throw e}finally{r.forEach(e=>e.release()),i()}}cancelPending(){++this.revision,this.controller?.abort()}dispose(){++this.revision,this.controller?.abort(),this.leases.forEach(e=>e.release()),this.leases=[],this.owned.forEach(e=>e.dispose()),this.owned=[],this.currentMaps={}}};function Mv(n){let r=n.onBeforeCompile,a=n.customProgramCacheKey.bind(n),o={labelRect:{value:new on(0,0,1,1)},v5Enabled:{value:0},v6FixedLabel:{value:0},v5Dark:{value:new X},v5Light:{value:new X},v5Gold:{value:new X(i.color)},v5Porcelain:{value:new X(`#fffdf7`)},v5Blend:{value:0},v5FillRoughness:{value:.31},v5FillClearcoat:{value:191/255},v5Label:{value:null},v5TextVisible:{value:0},v5TextGold:{value:0},v5MetalEnabled:{value:1}},s,c=0,l=!1;return n.onBeforeCompile=(e,t)=>{r.call(n,e,t),Object.assign(e.uniforms,o),e.fragmentShader=`uniform float v6FixedLabel,v5Enabled,v5Blend,v5FillRoughness,v5FillClearcoat,v5TextVisible,v5TextGold,v5MetalEnabled;
uniform vec3 v5Dark,v5Light,v5Gold,v5Porcelain;
uniform sampler2D v5Label;uniform vec4 labelRect;
`+e.fragmentShader,e.fragmentShader=e.fragmentShader.replace(`#include <map_fragment>`,`#include <map_fragment>
   float cityCoverage=0.0,cityLine=0.0,cityLabel=0.0;
   #ifdef USE_MAP
   if(v5Enabled>0.5){
    vec2 shape=texture2D(map,vMapUv).rg;
    cityCoverage=shape.g;cityLine=min(shape.r,cityCoverage);
    vec2 labelUv=(vMapUv-labelRect.xy)/labelRect.zw;
    cityLabel=texture2D(v5Label,labelUv).r*v5TextVisible*step(0.0,labelUv.x)*step(0.0,labelUv.y)*step(labelUv.x,1.0)*step(labelUv.y,1.0);
    float gradient=clamp(((1.0-vMapUv.y)-0.28)/0.72,0.0,1.0);
    vec3 fillColor=mix(v5Dark,v5Light,gradient);
    diffuseColor.rgb=v5Porcelain*(1.0-cityCoverage)+fillColor*(cityCoverage-cityLine)+v5Gold*cityLine;
    diffuseColor.rgb=mix(diffuseColor.rgb,mix(v5Dark,v5Gold,v5TextGold),cityLabel);
   }
   #endif`),e.fragmentShader=e.fragmentShader.replace(`#include <metalnessmap_fragment>`,`#include <metalnessmap_fragment>
   if(v5Enabled>0.5){metalnessFactor=mix((cityCoverage-cityLine)*v5Blend+cityLine,mix(v5Blend,1.0,v5TextGold),cityLabel)*v5MetalEnabled;}`),e.fragmentShader=e.fragmentShader.replace(`#include <roughnessmap_fragment>`,`#include <roughnessmap_fragment>
   if(v5Enabled>0.5){roughnessFactor=mix((1.0-cityCoverage)*(41.0/255.0)+(cityCoverage-cityLine)*v5FillRoughness+cityLine*0.23,66.0/255.0,cityLabel);}`),e.fragmentShader=e.fragmentShader.replace(`#include <lights_physical_fragment>`,`#include <lights_physical_fragment>
   #ifdef USE_CLEARCOAT
   if(v5Enabled>0.5){material.clearcoat=mix((1.0-cityCoverage)+(cityCoverage-cityLine)*v5FillClearcoat+cityLine*(26.0/255.0),mix(191.0/255.0,26.0/255.0,v5Blend),cityLabel);if(v6FixedLabel>0.5)material.clearcoat=mix(material.clearcoat,26.0/255.0,cityLabel);}
   #endif`),e.fragmentShader=e.fragmentShader.replace(`porcelainCoverage=1.0-texture2D(porcelainArtworkMap,vMetalnessMapUv).r;`,`porcelainCoverage=1.0-mix(texture2D(porcelainArtworkMap,vMetalnessMapUv).r,cityCoverage+cityLabel*(1.0-cityCoverage),v5Enabled);`)},n.customProgramCacheKey=()=>a()+`-city-parameters-v6-fixed-lettering`,{enable(e,t,n,r=[0,0,1,1]){o.labelRect.value.fromArray(r),e.colorSpace=``,o.v5Enabled.value=1,o.v5Label.value=t,o.v5TextVisible.value=+!!n},disable(){o.v5Enabled.value=0},fixedGold(e){l=e,o.v6FixedLabel.value=+!!e},update(r,i){s=t(r);let a=e(s);o.v5Dark.value.setRGB(...a.dark,Ye),o.v5Light.value.setRGB(...a.light,Ye);let u=d(s.material,s.materialX);o.v5Blend.value=u.metalness,o.v5FillRoughness.value=u.roughness,o.v5FillClearcoat.value=u.clearcoat,o.v5TextVisible.value=+!!i,o.v5TextGold.value=l||s.preset===`gold`?1:0,n.normalScale.setScalar(.7*s.relief),n.clearcoatNormalScale.setScalar(.7*s.relief),c++},metal(e){o.v5MetalEnabled.value=+!!e},inspect(e){e.userData.cityParameterInspection=!0,e.onBeforeCompile=e=>{Object.assign(e.uniforms,o),e.fragmentShader=`uniform float v5Blend,v5TextVisible,v5TextGold;uniform sampler2D v5Label;uniform vec4 labelRect;
`+e.fragmentShader,e.fragmentShader=e.fragmentShader.replace(`#include <map_fragment>`,`#include <map_fragment>
     vec2 shape=texture2D(map,vMapUv).rg;
     vec2 labelUv=(vMapUv-labelRect.xy)/labelRect.zw;float text=texture2D(v5Label,labelUv).r*v5TextVisible*step(0.0,labelUv.x)*step(0.0,labelUv.y)*step(labelUv.x,1.0)*step(labelUv.y,1.0);
     float metallic=mix((shape.g-shape.r)*v5Blend+shape.r,mix(v5Blend,1.0,v5TextGold),text);
     diffuseColor.rgb=vec3(metallic);`)}},debug(){return{enabled:!!o.v5Enabled.value,appearance:s?{...s}:null,fill:s?d(s.material,s.materialX):null,line:i,fixedGoldLabel:l,updates:c}}}}var Nv={placement:{scale:.82,offsetU:.047,offsetV:0},id:`china-draft-20261011`,version:3,name:`中国 · 临时线稿`,layout:`blank-300deg-v1`,...Object.fromEntries([`baseColor`,`normal`,`roughness`,`metalness`].map(e=>[e,`/${wv[`china/${e}`]}`])),height:`/china/height.png?v=3`},Pv=[`baseColor`,`normal`,`roughness`,`metalness`];function Fv(e,t,n){let r=document.createElement(`canvas`);r.width=t,r.height=n;let i=r.getContext(`2d`,{willReadFrequently:!0});i.drawImage(e,0,0,t,n);let a=i.getImageData(0,0,t,n).data;return r.width=r.height=1,{data:a,width:t,height:n}}function Iv(e,t,n,r,i){let a=document.createElement(`canvas`);a.width=t,a.height=n;let o=a.getContext(`2d`).createImageData(t,n);o.data.set(e),a.getContext(`2d`).putImageData(o,0,0);let s=new Ni(a);return s.colorSpace=r?Ye:``,s.channel=1,s.wrapS=s.wrapT=b,s.anisotropy=i,s}var Lv=class{material;anisotropy;pool;revision=0;disposed=!1;owned=[];label;labelUrl=``;current=null;onProgress;relief=1;metalEnabled=!0;lastError=``;uniformOnly=!1;parameters;leases=[];controller;parametricCache=new Map;paramKey=``;paramMaps=[];textCache=new Map;textKey=``;requestedStructure=``;requestedText=``;constructor(e,t,n){this.material=e,this.anisotropy=t,this.pool=n,this.parameters=Mv(e)}labelPixels(e){let t=e??`/china/label.png`;return t!==this.labelUrl&&(this.label=void 0,this.labelUrl=t),this.label||=yv(t).then(e=>{try{return Fv(e.image,e.image.width,e.image.height)}finally{e.dispose()}}).catch(e=>{throw this.label=void 0,e}),this.label}async apply(e){if(this.disposed)throw Error(`观察器已释放`);let t=++this.revision;if(e?.finish===`paint`&&(e={...e,finish:`enamel`}),this.uniformOnly=!1,e.runtime&&this.pool)return this.applyRuntime(e,t);if(!e||e.layout!==`blank-300deg-v1`||!e.id||!e.name||!Number.isInteger(e.version)||e.version<1||Pv.some(t=>typeof e[t]!=`string`||!e[t]))throw Error(`城市包缺少有效版本、展开规范或对齐通道`);if(e.label?.color&&!/^#[0-9a-f]{6}$/i.test(e.label.color))throw Error(`文字颜色格式不正确`);if(e.finish&&![`enamel`,`metal`,`paint`].includes(e.finish))throw Error(`不支持的城市材质`);if(e.normalEncoding&&e.normalEncoding!==`rgba16f`)throw Error(`法线编码不支持`);if(e.parametric)return this.applyParametric(e,t);let n=[...Pv,...e.coverage?[`coverage`]:[],...e.clearcoat?[`clearcoat`]:[]],r=0,i=await Promise.allSettled(n.map(async i=>{let a=await(i===`normal`&&e.normalEncoding===`rgba16f`?Sv(e[i]):yv(e[i]));return t===this.revision&&this.onProgress?.(++r,n.length+1),a})),a=i.flatMap(e=>e.status===`fulfilled`?[e.value]:[]),o=[],s;try{if(t!==this.revision||this.disposed)return!1;if(i.some(e=>e.status===`rejected`))throw Error(`城市贴图读取失败，已保留当前完整版本`);let r=a[0].image.width,c=a[0].image.height;if(r<1||c<1||r>8192||c>8192||Math.abs(r/c-5433/2365)>.015||a.some(e=>e.image.width!==r||e.image.height!==c))throw Error(`城市通道尺寸不一致或展开比例不符，未应用`);let l=e.label?.hidden?null:await this.labelPixels(e.label?.source);if(t!==this.revision||this.disposed)return!1;this.onProgress?.(n.length+1,n.length+1);let u=null;if(l){let e=document.createElement(`canvas`);e.width=l.width,e.height=l.height;let t=e.getContext(`2d`),n=t.createImageData(l.width,l.height);n.data.set(l.data),t.putImageData(n,0,0),u=Fv(e,r,c).data,e.width=e.height=1}let d=e.placement??{scale:1,offsetU:0,offsetV:0};if(!Object.values(d).every(Number.isFinite)||d.scale<=0||d.scale>1||d.offsetU<0||d.offsetV<0||d.offsetU+d.scale>1.001||d.offsetV+d.scale>1.001)throw Error(`城市图样定位超出展开区域`);if(e.normalEncoding&&(d.scale!==1||d.offsetU!==0||d.offsetV!==0))throw Error(`高精度法线必须使用预对齐的完整展开图`);let f=a.map((t,n)=>{if(n===1&&e.normalEncoding)return null;let i=document.createElement(`canvas`);i.width=r,i.height=c;let a=i.getContext(`2d`);a.fillStyle=n===1?`rgb(128,128,255)`:`black`,a.fillRect(0,0,r,c),a.drawImage(t.image,d.offsetU*r,(1-d.scale-d.offsetV)*c,d.scale*r,d.scale*c);let o=Fv(i,r,c).data;return i.width=i.height=1,o}),[p,,m,h]=f,g=e.coverage?f[n.indexOf(`coverage`)]:h,_=e.clearcoat?f[n.indexOf(`clearcoat`)]:null,v=e.label?.color?[1,3,5].map(t=>parseInt(e.label.color.slice(t,t+2),16)):[221,181,56],y=new Uint8ClampedArray(r*c*4),b=new Uint8ClampedArray(r*c*4),x=new Uint8ClampedArray(r*c*4),S=new Uint8ClampedArray(r*c*4),C=e.coverage?new Uint8ClampedArray(r*c*4):null;for(let t=0;t<p.length;t+=4){let n=g[t]/255,r=(u?.[t]??0)/255,i=e.finish===`metal`?n:h[t]/255,a=r*(e.label?.metalness??1)+i*(1-r),o=e.finish===`metal`?72:m[t];for(let i=0;i<3;i++)y[t+i]=([255,253,247][i]*(1-n)+p[t+i]*n)*(1-r)+v[i]*r,b[t+i]=a*255,x[t+i]=(41*(1-n)+o*n)*(1-r)+66*r,S[t+i]=(255*(1-n)+(e.finish===`metal`?26:_?.[t]??26)*n)*(1-r)+(e.label?.metalness===0?191:26)*r,C&&(C[t+i]=(r+n*(1-r))*255);y[t+3]=b[t+3]=x[t+3]=S[t+3]=255,C&&(C[t+3]=255)}let w=e.normalEncoding?a[1]:Iv(f[1],r,c,!1,this.anisotropy);if(e.normalEncoding&&(w.channel=1,w.anisotropy=this.anisotropy),o.push(Iv(y,r,c,!0,this.anisotropy)),o.push(Iv(b,r,c,!1,this.anisotropy)),o.push(Iv(x,r,c,!1,this.anisotropy)),o.push(Iv(S,r,c,!1,this.anisotropy)),o.push(w),e.normalEncoding&&(s=w),C&&o.push(Iv(C,r,c,!1,this.anisotropy)),t!==this.revision||this.disposed)return!1;let T=this.material;this.parameters.disable(),this.paramKey=``,this.textKey=``,this.paramMaps=[],[T.map,T.metalnessMap,T.roughnessMap,T.clearcoatMap,T.normalMap]=o,rv(T,o[5]??null),T.clearcoatNormalMap=T.normalMap,T.metalness=+!!this.metalEnabled,T.roughness=1,T.color.set(16777215);let E=.7;T.normalScale.setScalar(this.relief*E),T.clearcoatNormalScale.setScalar(this.relief*E),T.displacementMap=null,T.displacementScale=0,T.needsUpdate=!0;let D=this.owned;return this.owned=[...o],o.length=0,D.forEach(e=>this.release(e)),this.current={...e},this.lastError=``,!0}catch(e){throw this.lastError=e.message,e}finally{a.filter(e=>e!==s).forEach(e=>e.dispose()),o.forEach(e=>this.release(e))}}resource(e,t,n){let r=e.get(t);if(r)e.delete(t),e.set(t,r);else{r=n().then(e=>{if(e.some(e=>{let t=e.image;return t.width!==4096||t.height!==1783}))throw e.forEach(e=>e.dispose()),Error(`城市通道尺寸不一致`);return e.forEach(e=>{e.channel=1,e.colorSpace=``,e.anisotropy=this.anisotropy,e.wrapS=e.wrapT=b}),e}),e.set(t,r);let i=r;r.catch(()=>{e.get(t)===i&&e.delete(t)})}return r}async applyRuntime(e,n){let r=e.runtime,i=[r.mask.url,r.normal.url].join(`|`),a=r.label.asset.url,o=t(e.parametric.appearance);if(i===this.paramKey&&a===this.textKey)return this.controller?.abort(),this.uniformOnly=!0,this.parameters.update(o,!0),this.current=structuredClone(e),this.relief=o.relief,!0;this.controller?.abort();let s=this.controller=new AbortController,c=[],l=this.pool.beginSwap();try{if(c=await this.pool.acquireAll([r.mask,r.normal,r.label.asset],s.signal),n!==this.revision||this.disposed)return!1;let[t,l,u]=c.map(e=>e.texture);for(let e of[t,l,u])e.channel=1,e.anisotropy=this.anisotropy;let d=this.material;this.uniformOnly=this.paramKey===i,d.map=d.metalnessMap=t,d.normalMap=d.clearcoatNormalMap=l,d.roughnessMap=d.clearcoatMap=null,d.clearcoat=1,d.roughness=1,d.metalness=+!!this.metalEnabled,d.color.set(16777215),d.displacementMap=null,d.displacementScale=0,Gl(d),rv(d,t),this.uniformOnly||(d.needsUpdate=!0),this.parameters.enable(t,u,!0,r.label.uvRect),this.parameters.fixedGold(!0),this.parameters.update(o,!0),this.parameters.metal(this.metalEnabled);let f=this.leases;return this.leases=c,c=[],f.forEach(e=>e.release()),this.owned.forEach(e=>this.release(e)),this.owned=[],this.paramKey=i,this.textKey=a,this.paramMaps=[t,l,u],this.current=structuredClone(e),this.relief=o.relief,this.lastError=``,!0}catch(e){if(s.signal.aborted)return!1;throw this.lastError=String(e),e}finally{c.forEach(e=>e.release()),l()}}trimResources(){for(let[e,t,n]of[[this.parametricCache,2,[this.paramKey,this.requestedStructure]],[this.textCache,6,[this.textKey,this.requestedText]]])for(let[r,i]of e){if(e.size<=t)break;n.includes(r)||(e.delete(r),i.then(e=>e.forEach(e=>this.release(e)),()=>{}))}}async applyParametric(e,n){try{let r=t(e.parametric.appearance);if(e.normalEncoding!==`rgba16f`||e.placement||!e.label?.source||!e.parametric.mask)throw Error(`参数化城市包需要完整对齐的遮罩、法线和文字`);let i=[e.parametric.mask,e.normal].join(`|`),a=e.label.source;if(this.requestedStructure=i,this.requestedText=a,this.paramKey===i&&this.textKey===a)return this.uniformOnly=!0,this.parameters.fixedGold(!!e.label.fixedGold),this.parameters.update(r,!e.label.hidden),this.relief=r.relief,this.current={...e,parametric:{...e.parametric,appearance:r}},this.lastError=``,!0;let o=this.resource(this.parametricCache,i,async()=>{let t=await Promise.allSettled([yv(e.parametric.mask),Sv(e.normal)]),n=t.flatMap(e=>e.status===`fulfilled`?[e.value]:[]);if(t.some(e=>e.status===`rejected`))throw n.forEach(e=>e.dispose()),Error(`城市结构读取失败，已保留当前效果`);return n}),s=this.resource(this.textCache,a,async()=>[await yv(a)]),[c,l]=await Promise.all([o,s]);if(n!==this.revision||this.disposed)return!1;let u=this.material,d=this.paramKey!==i;return this.uniformOnly=!d,d&&(u.map=u.metalnessMap=c[0],u.roughnessMap=null,u.clearcoatMap=null,u.normalMap=u.clearcoatNormalMap=c[1],u.clearcoat=1,u.metalness=+!!this.metalEnabled,u.roughness=1,u.color.set(16777215),u.displacementMap=null,u.displacementScale=0,rv(u,c[0]),u.needsUpdate=!0),this.parameters.enable(c[0],l[0],!e.label.hidden),this.parameters.fixedGold(!!e.label.fixedGold),this.parameters.update(r,!e.label.hidden),this.parameters.metal(this.metalEnabled),this.owned.forEach(e=>this.release(e)),this.owned=[],this.paramMaps=[...c,...l],this.paramKey=i,this.textKey=a,this.relief=r.relief,this.current={...e,parametric:{...e.parametric,appearance:r}},this.lastError=``,!0}catch(e){throw n===this.revision&&(this.lastError=e.message),e}finally{this.trimResources()}}cancelPending(){this.controller?.abort(),++this.revision}resetRuntime(){this.controller?.abort(),++this.revision,this.leases.forEach(e=>e.release()),this.leases=[],this.paramKey=this.textKey=``,this.paramMaps=[]}setRelief(e){if(!Number.isFinite(e)||e<-1||e>2)throw Error(`凹凸强度超出范围`);if(this.relief=e,this.current?.parametric){let t={...this.current.parametric.appearance,relief:Math.max(0,e)};this.current.parametric.appearance=t,this.parameters.update(t,!this.current.label?.hidden)}else this.material.normalScale.setScalar(e*.7),this.material.clearcoatNormalScale.setScalar(e*.7)}setMetal(e){this.metalEnabled=e,this.material.metalness=+!!e,this.parameters.metal(e)}configureMetalnessInspection(e){this.current?.parametric&&this.parameters.inspect(e)}release(e){e.dispose(),e.image instanceof HTMLCanvasElement&&(e.image.width=e.image.height=1)}debug(){return{pack:this.current,relief:this.relief,metalEnabled:this.metalEnabled,displacementScale:this.material.displacementScale,parameters:this.parameters.debug(),cachedCities:this.parametricCache.size,cachedLabels:this.textCache.size,uniformOnly:this.uniformOnly,maps:[...this.owned,...this.paramMaps].map(e=>({uuid:e.uuid,channel:e.channel,size:[e.image.width,e.image.height],colorSpace:e.colorSpace,precision:e.userData.precision??`8-bit`})),labelSource:this.current?.label?.hidden?null:this.current?.label?.source??`china/label.png`,labelColor:this.current?.label?.color??`#ddb538`,lastError:this.lastError}}dispose(){this.disposed=!0,++this.revision,this.controller?.abort(),this.leases.forEach(e=>e.release()),this.leases=[],this.owned.forEach(e=>this.release(e)),this.owned=[];for(let e of[...this.parametricCache.values(),...this.textCache.values()])e.then(e=>e.forEach(e=>e.dispose()),()=>{});this.parametricCache.clear(),this.textCache.clear(),this.paramMaps=[],this.label=void 0}},Rv={"1221-detail":{label:`1221 · 侧缘轮廓放大`,part:`saucer`,camera:[69,9.5,82],target:[69,9,0],detail:!0},1221:{label:`1221 · 底碟外撇与下肩`,part:`saucer`,camera:[0,12,405],target:[0,8,0]},1225:{label:`1225 · 承杯金圈`,part:`saucer`,camera:[0,145,270],target:[0,7,0]},1229:{label:`1229 · 杯底灰色底款`,part:`cup`,camera:[0,-290,20],target:[0,45,0]},1230:{label:`1230 · 碟底与底款`,part:`saucer`,camera:[0,-310,30],target:[0,4,0]},1237:{label:`1237 · 盖钮与白瓷过渡`,part:`lid`,camera:[30,43,210],target:[0,36,0]},1236:{label:`1236 · 盖钮宽面`,part:`lid`,camera:[210,44,0],target:[0,36,0]},1220:{label:`1220 · 产品侧面比例`,part:`all`,camera:[-8,139,465],target:[13,57,0]},1197:{label:`1197 · 侧前方整体`,part:`all`,camera:[155,174,335],target:[7,65,0]},1198:{label:`1198 · 把手正对`,part:`all`,camera:[360,202,32],target:[9,64,0]},1199:{label:`1199 · 整体高俯视`,part:`all`,camera:[287,385,50],target:[8,67,0]},1205:{label:`1205 · 整体低机位`,part:`all`,camera:[80,73,-370],target:[7,70,0]},1206:{label:`1206 · 另一侧整体`,part:`all`,camera:[170,208,-350],target:[7,65,0]},1163:{label:`1163 · 把手侧面`,part:`cup`,camera:[100,127,365],target:[12,62,0]},1159:{label:`1159 · 把手宽面`,part:`cup`,camera:[350,106,1],target:[12,64,0]},1165:{label:`1165 · 杯内`,part:`cup`,camera:[50,385,130],target:[0,62,0]},1168:{label:`1168 · 杯底浅圈足`,part:`cup`,camera:[1,-260,80],target:[0,60,0]},1178:{label:`1178 · 盖钮近景`,part:`lid`,camera:[8,88,215],target:[0,34,0]},1182:{label:`1182 · 杯盖底面`,part:`lid`,camera:[1,-150,40],target:[0,33,0]},1145:{label:`1145 · 托碟上表面`,part:`saucer`,camera:[0,300,50],target:[0,6,0]},1148:{label:`1148 · 托碟底圈`,part:`saucer`,camera:[0,-55,405],target:[0,6,0]},1142:{label:`1142 · 托碟截面`,part:`saucer`,camera:[0,-75,405],target:[0,6,0]}},zv={type:`change`},Bv={type:`start`},Vv={type:`end`},Hv=new Qr,Uv=new Gr,Wv=Math.cos(70*zt.DEG2RAD),Gv=new Y,Kv=2*Math.PI,qv={NONE:-1,ROTATE:0,DOLLY:1,PAN:2,TOUCH_ROTATE:3,TOUCH_PAN:4,TOUCH_DOLLY_PAN:5,TOUCH_DOLLY_ROTATE:6},Jv=1e-6,Yv=class extends Co{constructor(e,t=null){super(e,t),this.state=qv.NONE,this.target=new Y,this.cursor=new Y,this.minDistance=0,this.maxDistance=1/0,this.minZoom=0,this.maxZoom=1/0,this.minTargetRadius=0,this.maxTargetRadius=1/0,this.minPolarAngle=0,this.maxPolarAngle=Math.PI,this.minAzimuthAngle=-1/0,this.maxAzimuthAngle=1/0,this.enableDamping=!1,this.dampingFactor=.05,this.enableZoom=!0,this.zoomSpeed=1,this.enableRotate=!0,this.rotateSpeed=1,this.keyRotateSpeed=1,this.enablePan=!0,this.panSpeed=1,this.screenSpacePanning=!0,this.keyPanSpeed=7,this.zoomToCursor=!1,this.autoRotate=!1,this.autoRotateSpeed=2,this.keys={LEFT:`ArrowLeft`,UP:`ArrowUp`,RIGHT:`ArrowRight`,BOTTOM:`ArrowDown`},this.mouseButtons={LEFT:_.ROTATE,MIDDLE:_.DOLLY,RIGHT:_.PAN},this.touches={ONE:v.ROTATE,TWO:v.DOLLY_PAN},this.target0=this.target.clone(),this.position0=this.object.position.clone(),this.zoom0=this.object.zoom,this._cursorStyle=`auto`,this._domElementKeyEvents=null,this._lastPosition=new Y,this._lastQuaternion=new Bt,this._lastTargetPosition=new Y,this._quat=new Bt().setFromUnitVectors(e.up,new Y(0,1,0)),this._quatInverse=this._quat.clone().invert(),this._spherical=new So,this._sphericalDelta=new So,this._scale=1,this._panOffset=new Y,this._rotateStart=new J,this._rotateEnd=new J,this._rotateDelta=new J,this._panStart=new J,this._panEnd=new J,this._panDelta=new J,this._dollyStart=new J,this._dollyEnd=new J,this._dollyDelta=new J,this._dollyDirection=new Y,this._mouse=new J,this._performCursorZoom=!1,this._pointers=[],this._pointerPositions={},this._controlActive=!1,this._onPointerMove=Zv.bind(this),this._onPointerDown=Xv.bind(this),this._onPointerUp=Qv.bind(this),this._onContextMenu=ay.bind(this),this._onMouseWheel=ty.bind(this),this._onKeyDown=ny.bind(this),this._onTouchStart=ry.bind(this),this._onTouchMove=iy.bind(this),this._onMouseDown=$v.bind(this),this._onMouseMove=ey.bind(this),this._interceptControlDown=oy.bind(this),this._interceptControlUp=sy.bind(this),this.domElement!==null&&this.connect(this.domElement),this.update()}set cursorStyle(e){this._cursorStyle=e,e===`grab`?this.domElement.style.cursor=`grab`:this.domElement.style.cursor=`auto`}get cursorStyle(){return this._cursorStyle}connect(e){super.connect(e),this.domElement.addEventListener(`pointerdown`,this._onPointerDown),this.domElement.addEventListener(`pointercancel`,this._onPointerUp),this.domElement.addEventListener(`contextmenu`,this._onContextMenu),this.domElement.addEventListener(`wheel`,this._onMouseWheel,{passive:!1}),this.domElement.getRootNode().addEventListener(`keydown`,this._interceptControlDown,{passive:!0,capture:!0}),this.domElement.style.touchAction=`none`}disconnect(){this.state=qv.NONE,this.domElement.removeEventListener(`pointerdown`,this._onPointerDown),this.domElement.ownerDocument.removeEventListener(`pointermove`,this._onPointerMove),this.domElement.ownerDocument.removeEventListener(`pointerup`,this._onPointerUp),this.domElement.removeEventListener(`pointercancel`,this._onPointerUp),this.domElement.removeEventListener(`wheel`,this._onMouseWheel),this.domElement.removeEventListener(`contextmenu`,this._onContextMenu),this.stopListenToKeyEvents();let e=this.domElement.getRootNode();e.removeEventListener(`keydown`,this._interceptControlDown,{capture:!0}),e.removeEventListener(`keyup`,this._interceptControlUp,{capture:!0}),this._controlActive=!1,this._pointers.length=0,this._pointerPositions={},this.domElement.style.touchAction=``,this.domElement.style.cursor=`auto`}dispose(){this.disconnect()}getPolarAngle(){return this._spherical.phi}getAzimuthalAngle(){return this._spherical.theta}getDistance(){return this.object.position.distanceTo(this.target)}listenToKeyEvents(e){e.addEventListener(`keydown`,this._onKeyDown),this._domElementKeyEvents=e}stopListenToKeyEvents(){this._domElementKeyEvents!==null&&(this._domElementKeyEvents.removeEventListener(`keydown`,this._onKeyDown),this._domElementKeyEvents=null)}saveState(){this.target0.copy(this.target),this.position0.copy(this.object.position),this.zoom0=this.object.zoom}reset(){this.target.copy(this.target0),this.object.position.copy(this.position0),this.object.zoom=this.zoom0,this.object.updateProjectionMatrix(),this.dispatchEvent(zv),this.update(),this.state=qv.NONE}pan(e,t){this._pan(e,t),this.update()}dollyIn(e){this._dollyIn(e),this.update()}dollyOut(e){this._dollyOut(e),this.update()}rotateLeft(e){this._rotateLeft(e),this.update()}rotateUp(e){this._rotateUp(e),this.update()}update(e=null){let t=this.object.position;Gv.copy(t).sub(this.target),Gv.applyQuaternion(this._quat),this._spherical.setFromVector3(Gv),this.autoRotate&&this.state===qv.NONE&&this._rotateLeft(this._getAutoRotationAngle(e)),this.enableDamping?(this._spherical.theta+=this._sphericalDelta.theta*this.dampingFactor,this._spherical.phi+=this._sphericalDelta.phi*this.dampingFactor):(this._spherical.theta+=this._sphericalDelta.theta,this._spherical.phi+=this._sphericalDelta.phi);let n=this.minAzimuthAngle,r=this.maxAzimuthAngle;isFinite(n)&&isFinite(r)&&(n<-Math.PI?n+=Kv:n>Math.PI&&(n-=Kv),r<-Math.PI?r+=Kv:r>Math.PI&&(r-=Kv),n<=r?this._spherical.theta=Math.max(n,Math.min(r,this._spherical.theta)):this._spherical.theta=this._spherical.theta>(n+r)/2?Math.max(n,this._spherical.theta):Math.min(r,this._spherical.theta)),this._spherical.phi=Math.max(this.minPolarAngle,Math.min(this.maxPolarAngle,this._spherical.phi)),this._spherical.makeSafe(),this.enableDamping===!0?this.target.addScaledVector(this._panOffset,this.dampingFactor):this.target.add(this._panOffset),this.target.sub(this.cursor),this.target.clampLength(this.minTargetRadius,this.maxTargetRadius),this.target.add(this.cursor);let i=!1;if(this.zoomToCursor&&this._performCursorZoom||this.object.isOrthographicCamera)this._spherical.radius=this._clampDistance(this._spherical.radius);else{let e=this._spherical.radius;this._spherical.radius=this._clampDistance(this._spherical.radius*this._scale),i=e!=this._spherical.radius}if(Gv.setFromSpherical(this._spherical),Gv.applyQuaternion(this._quatInverse),t.copy(this.target).add(Gv),this.object.lookAt(this.target),this.enableDamping===!0?(this._sphericalDelta.theta*=1-this.dampingFactor,this._sphericalDelta.phi*=1-this.dampingFactor,this._panOffset.multiplyScalar(1-this.dampingFactor)):(this._sphericalDelta.set(0,0,0),this._panOffset.set(0,0,0)),this.zoomToCursor&&this._performCursorZoom){let e=null;if(this.object.isPerspectiveCamera){let t=Gv.length();e=this._clampDistance(t*this._scale);let n=t-e;this.object.position.addScaledVector(this._dollyDirection,n),this.object.updateMatrixWorld(),i=!!n}else if(this.object.isOrthographicCamera){let t=new Y(this._mouse.x,this._mouse.y,0);t.unproject(this.object);let n=this.object.zoom;this.object.zoom=Math.max(this.minZoom,Math.min(this.maxZoom,this.object.zoom/this._scale)),this.object.updateProjectionMatrix(),i=n!==this.object.zoom;let r=new Y(this._mouse.x,this._mouse.y,0);r.unproject(this.object),this.object.position.sub(r).add(t),this.object.updateMatrixWorld(),e=Gv.length()}else console.warn(`WARNING: OrbitControls.js encountered an unknown camera type - zoom to cursor disabled.`),this.zoomToCursor=!1;e!==null&&(this.screenSpacePanning?this.target.set(0,0,-1).transformDirection(this.object.matrix).multiplyScalar(e).add(this.object.position):(Hv.origin.copy(this.object.position),Hv.direction.set(0,0,-1).transformDirection(this.object.matrix),Math.abs(this.object.up.dot(Hv.direction))<Wv?this.object.lookAt(this.target):(Uv.setFromNormalAndCoplanarPoint(this.object.up,this.target),Hv.intersectPlane(Uv,this.target))))}else if(this.object.isOrthographicCamera){let e=this.object.zoom;this.object.zoom=Math.max(this.minZoom,Math.min(this.maxZoom,this.object.zoom/this._scale)),e!==this.object.zoom&&(this.object.updateProjectionMatrix(),i=!0)}return this._scale=1,this._performCursorZoom=!1,i||this._lastPosition.distanceToSquared(this.object.position)>Jv||8*(1-this._lastQuaternion.dot(this.object.quaternion))>Jv||this._lastTargetPosition.distanceToSquared(this.target)>Jv?(this.dispatchEvent(zv),this._lastPosition.copy(this.object.position),this._lastQuaternion.copy(this.object.quaternion),this._lastTargetPosition.copy(this.target),!0):!1}_getAutoRotationAngle(e){return e===null?Kv/60/60*this.autoRotateSpeed:Kv/60*this.autoRotateSpeed*e}_getZoomScale(e){let t=Math.abs(e*.01);return .95**(this.zoomSpeed*t)}_rotateLeft(e){this._sphericalDelta.theta-=e}_rotateUp(e){this._sphericalDelta.phi-=e}_panLeft(e,t){Gv.setFromMatrixColumn(t,0),Gv.multiplyScalar(-e),this._panOffset.add(Gv)}_panUp(e,t){this.screenSpacePanning===!0?Gv.setFromMatrixColumn(t,1):(Gv.setFromMatrixColumn(t,0),Gv.crossVectors(this.object.up,Gv)),Gv.multiplyScalar(e),this._panOffset.add(Gv)}_pan(e,t){let n=this.domElement;if(this.object.isPerspectiveCamera){let r=this.object.position;Gv.copy(r).sub(this.target);let i=Gv.length();i*=Math.tan(this.object.fov/2*Math.PI/180),this._panLeft(2*e*i/n.clientHeight,this.object.matrix),this._panUp(2*t*i/n.clientHeight,this.object.matrix)}else this.object.isOrthographicCamera?(this._panLeft(e*(this.object.right-this.object.left)/this.object.zoom/n.clientWidth,this.object.matrix),this._panUp(t*(this.object.top-this.object.bottom)/this.object.zoom/n.clientHeight,this.object.matrix)):(console.warn(`WARNING: OrbitControls.js encountered an unknown camera type - pan disabled.`),this.enablePan=!1)}_dollyOut(e){this.object.isPerspectiveCamera||this.object.isOrthographicCamera?this._scale/=e:(console.warn(`WARNING: OrbitControls.js encountered an unknown camera type - dolly/zoom disabled.`),this.enableZoom=!1)}_dollyIn(e){this.object.isPerspectiveCamera||this.object.isOrthographicCamera?this._scale*=e:(console.warn(`WARNING: OrbitControls.js encountered an unknown camera type - dolly/zoom disabled.`),this.enableZoom=!1)}_updateZoomParameters(e,t){if(!this.zoomToCursor)return;this._performCursorZoom=!0;let n=this.domElement.getBoundingClientRect(),r=e-n.left,i=t-n.top,a=n.width,o=n.height;this._mouse.x=r/a*2-1,this._mouse.y=-(i/o)*2+1,this._dollyDirection.set(this._mouse.x,this._mouse.y,1).unproject(this.object).sub(this.object.position).normalize()}_clampDistance(e){return Math.max(this.minDistance,Math.min(this.maxDistance,e))}_handleMouseDownRotate(e){this._rotateStart.set(e.clientX,e.clientY)}_handleMouseDownDolly(e){this._updateZoomParameters(e.clientX,e.clientX),this._dollyStart.set(e.clientX,e.clientY)}_handleMouseDownPan(e){this._panStart.set(e.clientX,e.clientY)}_handleMouseMoveRotate(e){this._rotateEnd.set(e.clientX,e.clientY),this._rotateDelta.subVectors(this._rotateEnd,this._rotateStart).multiplyScalar(this.rotateSpeed);let t=this.domElement;this._rotateLeft(Kv*this._rotateDelta.x/t.clientHeight),this._rotateUp(Kv*this._rotateDelta.y/t.clientHeight),this._rotateStart.copy(this._rotateEnd),this.update()}_handleMouseMoveDolly(e){this._dollyEnd.set(e.clientX,e.clientY),this._dollyDelta.subVectors(this._dollyEnd,this._dollyStart),this._dollyDelta.y>0?this._dollyOut(this._getZoomScale(this._dollyDelta.y)):this._dollyDelta.y<0&&this._dollyIn(this._getZoomScale(this._dollyDelta.y)),this._dollyStart.copy(this._dollyEnd),this.update()}_handleMouseMovePan(e){this._panEnd.set(e.clientX,e.clientY),this._panDelta.subVectors(this._panEnd,this._panStart).multiplyScalar(this.panSpeed),this._pan(this._panDelta.x,this._panDelta.y),this._panStart.copy(this._panEnd),this.update()}_handleMouseWheel(e){this._updateZoomParameters(e.clientX,e.clientY),e.deltaY<0?this._dollyIn(this._getZoomScale(e.deltaY)):e.deltaY>0&&this._dollyOut(this._getZoomScale(e.deltaY)),this.update()}_handleKeyDown(e){let t=!1;switch(e.code){case this.keys.UP:e.ctrlKey||e.metaKey||e.shiftKey?this.enableRotate&&this._rotateUp(Kv*this.keyRotateSpeed/this.domElement.clientHeight):this.enablePan&&this._pan(0,this.keyPanSpeed),t=!0;break;case this.keys.BOTTOM:e.ctrlKey||e.metaKey||e.shiftKey?this.enableRotate&&this._rotateUp(-Kv*this.keyRotateSpeed/this.domElement.clientHeight):this.enablePan&&this._pan(0,-this.keyPanSpeed),t=!0;break;case this.keys.LEFT:e.ctrlKey||e.metaKey||e.shiftKey?this.enableRotate&&this._rotateLeft(Kv*this.keyRotateSpeed/this.domElement.clientHeight):this.enablePan&&this._pan(this.keyPanSpeed,0),t=!0;break;case this.keys.RIGHT:e.ctrlKey||e.metaKey||e.shiftKey?this.enableRotate&&this._rotateLeft(-Kv*this.keyRotateSpeed/this.domElement.clientHeight):this.enablePan&&this._pan(-this.keyPanSpeed,0),t=!0}t&&(e.preventDefault(),this.update())}_handleTouchStartRotate(e){if(this._pointers.length===1)this._rotateStart.set(e.pageX,e.pageY);else{let t=this._getSecondPointerPosition(e),n=.5*(e.pageX+t.x),r=.5*(e.pageY+t.y);this._rotateStart.set(n,r)}}_handleTouchStartPan(e){if(this._pointers.length===1)this._panStart.set(e.pageX,e.pageY);else{let t=this._getSecondPointerPosition(e),n=.5*(e.pageX+t.x),r=.5*(e.pageY+t.y);this._panStart.set(n,r)}}_handleTouchStartDolly(e){let t=this._getSecondPointerPosition(e),n=e.pageX-t.x,r=e.pageY-t.y,i=Math.sqrt(n*n+r*r);this._dollyStart.set(0,i)}_handleTouchStartDollyPan(e){this.enableZoom&&this._handleTouchStartDolly(e),this.enablePan&&this._handleTouchStartPan(e)}_handleTouchStartDollyRotate(e){this.enableZoom&&this._handleTouchStartDolly(e),this.enableRotate&&this._handleTouchStartRotate(e)}_handleTouchMoveRotate(e){if(this._pointers.length==1)this._rotateEnd.set(e.pageX,e.pageY);else{let t=this._getSecondPointerPosition(e),n=.5*(e.pageX+t.x),r=.5*(e.pageY+t.y);this._rotateEnd.set(n,r)}this._rotateDelta.subVectors(this._rotateEnd,this._rotateStart).multiplyScalar(this.rotateSpeed);let t=this.domElement;this._rotateLeft(Kv*this._rotateDelta.x/t.clientHeight),this._rotateUp(Kv*this._rotateDelta.y/t.clientHeight),this._rotateStart.copy(this._rotateEnd)}_handleTouchMovePan(e){if(this._pointers.length===1)this._panEnd.set(e.pageX,e.pageY);else{let t=this._getSecondPointerPosition(e),n=.5*(e.pageX+t.x),r=.5*(e.pageY+t.y);this._panEnd.set(n,r)}this._panDelta.subVectors(this._panEnd,this._panStart).multiplyScalar(this.panSpeed),this._pan(this._panDelta.x,this._panDelta.y),this._panStart.copy(this._panEnd)}_handleTouchMoveDolly(e){let t=this._getSecondPointerPosition(e),n=e.pageX-t.x,r=e.pageY-t.y,i=Math.sqrt(n*n+r*r);this._dollyEnd.set(0,i),this._dollyDelta.set(0,(this._dollyEnd.y/this._dollyStart.y)**+this.zoomSpeed),this._dollyOut(this._dollyDelta.y),this._dollyStart.copy(this._dollyEnd);let a=(e.pageX+t.x)*.5,o=(e.pageY+t.y)*.5;this._updateZoomParameters(a,o)}_handleTouchMoveDollyPan(e){this.enableZoom&&this._handleTouchMoveDolly(e),this.enablePan&&this._handleTouchMovePan(e)}_handleTouchMoveDollyRotate(e){this.enableZoom&&this._handleTouchMoveDolly(e),this.enableRotate&&this._handleTouchMoveRotate(e)}_addPointer(e){this._pointers.push(e.pointerId)}_removePointer(e){delete this._pointerPositions[e.pointerId];for(let t=0;t<this._pointers.length;t++)if(this._pointers[t]==e.pointerId){this._pointers.splice(t,1);return}}_isTrackingPointer(e){for(let t=0;t<this._pointers.length;t++)if(this._pointers[t]==e.pointerId)return!0;return!1}_trackPointer(e){let t=this._pointerPositions[e.pointerId];t===void 0&&(t=new J,this._pointerPositions[e.pointerId]=t),t.set(e.pageX,e.pageY)}_getSecondPointerPosition(e){let t=e.pointerId===this._pointers[0]?this._pointers[1]:this._pointers[0];return this._pointerPositions[t]}_customWheelEvent(e){let t=e.deltaMode,n={clientX:e.clientX,clientY:e.clientY,deltaY:e.deltaY};switch(t){case 1:n.deltaY*=16;break;case 2:n.deltaY*=100}return e.ctrlKey&&!this._controlActive&&(n.deltaY*=10),n}};function Xv(e){this.enabled!==!1&&(this._pointers.length===0&&(this.domElement.setPointerCapture(e.pointerId),this.domElement.ownerDocument.addEventListener(`pointermove`,this._onPointerMove),this.domElement.ownerDocument.addEventListener(`pointerup`,this._onPointerUp)),!this._isTrackingPointer(e)&&(this._addPointer(e),e.pointerType===`touch`?this._onTouchStart(e):this._onMouseDown(e),this._cursorStyle===`grab`&&(this.domElement.style.cursor=`grabbing`)))}function Zv(e){this.enabled!==!1&&(e.pointerType===`touch`?this._onTouchMove(e):this._onMouseMove(e))}function Qv(e){switch(this._removePointer(e),this._pointers.length){case 0:this.domElement.releasePointerCapture(e.pointerId),this.domElement.ownerDocument.removeEventListener(`pointermove`,this._onPointerMove),this.domElement.ownerDocument.removeEventListener(`pointerup`,this._onPointerUp),this.dispatchEvent(Vv),this.state=qv.NONE,this._cursorStyle===`grab`&&(this.domElement.style.cursor=`grab`);break;case 1:let t=this._pointers[0],n=this._pointerPositions[t];this._onTouchStart({pointerId:t,pageX:n.x,pageY:n.y})}}function $v(e){let t;switch(e.button){case 0:t=this.mouseButtons.LEFT;break;case 1:t=this.mouseButtons.MIDDLE;break;case 2:t=this.mouseButtons.RIGHT;break;default:t=-1}switch(t){case _.DOLLY:if(this.enableZoom===!1)return;this._handleMouseDownDolly(e),this.state=qv.DOLLY;break;case _.ROTATE:if(e.ctrlKey||e.metaKey||e.shiftKey){if(this.enablePan===!1)return;this._handleMouseDownPan(e),this.state=qv.PAN}else{if(this.enableRotate===!1)return;this._handleMouseDownRotate(e),this.state=qv.ROTATE}break;case _.PAN:if(e.ctrlKey||e.metaKey||e.shiftKey){if(this.enableRotate===!1)return;this._handleMouseDownRotate(e),this.state=qv.ROTATE}else{if(this.enablePan===!1)return;this._handleMouseDownPan(e),this.state=qv.PAN}break;default:this.state=qv.NONE}this.state!==qv.NONE&&this.dispatchEvent(Bv)}function ey(e){switch(this.state){case qv.ROTATE:if(this.enableRotate===!1)return;this._handleMouseMoveRotate(e);break;case qv.DOLLY:if(this.enableZoom===!1)return;this._handleMouseMoveDolly(e);break;case qv.PAN:if(this.enablePan===!1)return;this._handleMouseMovePan(e)}}function ty(e){this.enabled!==!1&&this.enableZoom!==!1&&this.state===qv.NONE&&(e.preventDefault(),this.dispatchEvent(Bv),this._handleMouseWheel(this._customWheelEvent(e)),this.dispatchEvent(Vv))}function ny(e){this.enabled!==!1&&this._handleKeyDown(e)}function ry(e){switch(this._trackPointer(e),this._pointers.length){case 1:switch(this.touches.ONE){case v.ROTATE:if(this.enableRotate===!1)return;this._handleTouchStartRotate(e),this.state=qv.TOUCH_ROTATE;break;case v.PAN:if(this.enablePan===!1)return;this._handleTouchStartPan(e),this.state=qv.TOUCH_PAN;break;default:this.state=qv.NONE}break;case 2:switch(this.touches.TWO){case v.DOLLY_PAN:if(this.enableZoom===!1&&this.enablePan===!1)return;this._handleTouchStartDollyPan(e),this.state=qv.TOUCH_DOLLY_PAN;break;case v.DOLLY_ROTATE:if(this.enableZoom===!1&&this.enableRotate===!1)return;this._handleTouchStartDollyRotate(e),this.state=qv.TOUCH_DOLLY_ROTATE;break;default:this.state=qv.NONE}break;default:this.state=qv.NONE}this.state!==qv.NONE&&this.dispatchEvent(Bv)}function iy(e){switch(this._trackPointer(e),this.state){case qv.TOUCH_ROTATE:if(this.enableRotate===!1)return;this._handleTouchMoveRotate(e),this.update();break;case qv.TOUCH_PAN:if(this.enablePan===!1)return;this._handleTouchMovePan(e),this.update();break;case qv.TOUCH_DOLLY_PAN:if(this.enableZoom===!1&&this.enablePan===!1)return;this._handleTouchMoveDollyPan(e),this.update();break;case qv.TOUCH_DOLLY_ROTATE:if(this.enableZoom===!1&&this.enableRotate===!1)return;this._handleTouchMoveDollyRotate(e),this.update();break;default:this.state=qv.NONE}}function ay(e){this.enabled!==!1&&e.preventDefault()}function oy(e){e.key===`Control`&&(this._controlActive=!0,this.domElement.getRootNode().addEventListener(`keyup`,this._interceptControlUp,{passive:!0,capture:!0}))}function sy(e){e.key===`Control`&&(this._controlActive=!1,this.domElement.getRootNode().removeEventListener(`keyup`,this._interceptControlUp,{passive:!0,capture:!0}))}var cy={hero:`建筑面`,front:`文字面`,handle:`把手`,top:`俯视`,bottom:`杯底`,saucerBottom:`碟底`,exploded:`拆解`,lid:`杯盖`,detail:`浮雕近看`,flowers:`花纹近看`},ly=class{studio;getProduct;onChange;controls;view=`hero`;auto=!1;active=!1;animateCamera=!1;toCamera=new Y;toTarget=new Y;cupPos=new Y;lidPos=new Y;saucerPos=new Y;cupQuat=new Bt;lidQuat=new Bt;constructor(e,t,n){this.studio=e,this.getProduct=t,this.onChange=n,this.controls=new Yv(e.camera,e.renderer.domElement),this.controls.enableDamping=!0,this.controls.dampingFactor=.09,this.controls.enablePan=!0,this.controls.screenSpacePanning=!0,this.controls.mouseButtons={LEFT:_.ROTATE,MIDDLE:_.DOLLY,RIGHT:_.PAN},this.controls.touches={ONE:v.ROTATE,TWO:v.DOLLY_PAN},this.controls.minDistance=85,this.controls.maxDistance=3e3,this.controls.minPolarAngle=.035,this.controls.maxPolarAngle=Math.PI-.035,this.controls.autoRotateSpeed=-.9,this.controls.target.set(7,65,0),this.controls.addEventListener(`start`,()=>{this.animateCamera=!1,this.setAuto(!1)}),this.set(`hero`,!0)}setAuto(e){e&&(this.animateCamera=!1),this.auto=e,this.controls.autoRotate=e,this.onChange()}set(e,t=!1){this.setAuto(!1),this.view=e,this.studio.camera.up.set(0,1,0);let n=this.getProduct(),r=n.parameters.height;this.cupPos.copy(n.home.cup),this.lidPos.copy(n.home.lid),this.saucerPos.copy(n.home.saucer),this.cupQuat.identity(),this.lidQuat.identity(),n.cup.visible=!0,n.lid.visible=!0,n.saucer.visible=!0,this.toTarget.set(7,65,0);let i=[-88,125,-360];e===`front`&&(i=[22,124,340],this.toTarget.set(4,61,0)),e===`handle`&&(i=[65,105,325],this.toTarget.set(17,67,0)),e===`top`&&(n.lid.visible=!1,i=[.1,325,1],this.toTarget.set(0,45,0)),e===`exploded`&&(this.cupPos.y+=26,this.lidPos.y+=72,i=[240,205,355],this.toTarget.set(5,103,0)),e===`bottom`&&(n.lid.visible=!1,n.saucer.visible=!1,this.cupPos.set(0,r/2+38,0),this.cupQuat.setFromAxisAngle(new Y(1,0,0),Math.PI),i=[170,300,290],this.toTarget.set(4,r/2+42,0)),e===`saucerBottom`&&(n.cup.visible=!1,n.lid.visible=!1,i=[0,-290,50],this.toTarget.set(0,5,0)),e===`lid`&&(n.cup.visible=!1,n.saucer.visible=!1,this.lidPos.set(0,33,0),i=[68,111,127],this.toTarget.set(0,36,0)),e===`detail`&&(i=[-80,87,-178],this.toTarget.set(-9,38,-11)),e===`flowers`&&(i=[0,23,155],this.toTarget.set(0,9,30));let a=this.studio.camera.aspect;if(this.studio.camera.clearViewOffset(),this.studio.camera.fov=33,this.toCamera.set(...i),e===`hero`||e===`front`){let t=zt.degToRad(2),n=zt.degToRad(11.0983);this.studio.camera.fov=11.433645,e===`hero`&&(this.cupQuat.setFromAxisAngle(new Y(0,1,0),Math.PI),this.lidQuat.copy(this.cupQuat));let r=Math.tan(zt.degToRad(this.studio.camera.fov/2)),i=Math.max(158/(2*r*a*.88),130/(2*r*(a<.8?.6:.7)));this.toTarget.set(0,62,0),this.toCamera.set(Math.sin(t)*Math.cos(n),Math.sin(n),Math.cos(t)*Math.cos(n)).multiplyScalar(i).add(this.toTarget);let o=this.studio.renderer.domElement,s=o.clientWidth,c=o.clientHeight,l=a<.8?.43:.49;this.studio.camera.setViewOffset(s,c,0,(.5-l)*c,s,c)}else a<1.05&&this.toCamera.sub(this.toTarget).multiplyScalar(a<.8?1.6:1.17).add(this.toTarget);this.studio.camera.updateProjectionMatrix(),this.active=!0,this.animateCamera=!0,t&&this.update(10),this.onChange()}get moving(){return this.active||this.auto}update(e){let t=this.active;if(this.active){let t=this.getProduct(),n=1-Math.exp(-e*7);t.cup.position.lerp(this.cupPos,n),t.lid.position.lerp(this.lidPos,n),t.saucer.position.lerp(this.saucerPos,n),t.cup.quaternion.slerp(this.cupQuat,n),t.lid.quaternion.slerp(this.lidQuat,n),this.animateCamera&&(this.studio.camera.position.lerp(this.toCamera,n),this.controls.target.lerp(this.toTarget,n)),(!this.animateCamera||this.studio.camera.position.distanceTo(this.toCamera)<.005)&&t.cup.position.distanceTo(this.cupPos)<.001&&t.lid.position.distanceTo(this.lidPos)<.001&&t.cup.quaternion.angleTo(this.cupQuat)<1e-4&&(this.active=!1)}return this.controls.update(e)||t}reference(e){let t=Rv[e];if(!t)return;this.set(`hero`,!0),this.active=!1,this.animateCamera=!1,this.setAuto(!1);let n=this.getProduct();n.cup.quaternion.identity(),n.lid.quaternion.identity(),n.cup.visible=t.part===`all`||t.part===`cup`,n.lid.visible=t.part===`all`||t.part===`lid`,n.saucer.visible=t.part===`all`||t.part===`saucer`,t.part===`lid`&&n.lid.position.set(0,33,0),this.controls.target.fromArray(t.target),this.studio.camera.position.fromArray(t.camera),this.controls.minDistance=50,this.controls.update(),n.root.updateMatrixWorld(!0);let r=new cr;for(let e of[n.cup,n.lid,n.saucer])e.visible&&r.union(new cr().setFromObject(e));for(let e=0;e<(`detail`in t?0:3);e++){this.studio.camera.updateMatrixWorld(!0);let e=1;for(let t of[r.min.x,r.max.x])for(let n of[r.min.y,r.max.y])for(let i of[r.min.z,r.max.z]){let r=new Y(t,n,i).project(this.studio.camera);e=Math.max(e,Math.abs(r.x)/.9,Math.abs(r.y)/.88)}if(e<=1.001)break;this.studio.camera.position.sub(this.controls.target).multiplyScalar(e).add(this.controls.target),this.controls.update()}e===`1148`&&(this.studio.camera.up.set(0,-1,0),this.studio.camera.lookAt(this.controls.target)),e===`1168`&&(this.studio.camera.up.set(1,0,0),this.studio.camera.lookAt(this.controls.target)),this.onChange()}bottomClearance(){return this.getProduct().root.updateMatrixWorld(!0),new cr().setFromObject(this.getProduct().cup).min.y}dispose(){this.controls.dispose()}};function uy(e,t,n,r){let i=zt.degToRad(t.yaw),a=zt.degToRad(t.pitch),o=new Y(0,t.targetY,0);e.position.set(Math.sin(i)*Math.cos(a),Math.sin(a),Math.cos(i)*Math.cos(a)).multiplyScalar(t.distance).add(o),e.up.set(0,1,0),e.lookAt(o),e.rotateZ(zt.degToRad(t.roll)),e.fov=t.fov,e.aspect=n/r,e.setViewOffset(n,r,(.5-t.cx)*n,(.5-t.cy)*r,n,r),e.updateProjectionMatrix(),e.updateMatrixWorld(!0)}function dy(e){document.querySelector(`#app`).innerHTML=`<main aria-label="中国杯 V6 三维预览">
 <div id="scene-background" class="scene-background" aria-hidden="true"></div>
 <canvas id="viewport" tabindex="0" aria-label="左键或单指旋转中国杯，右键或双指拖移，滚轮或双指捏合缩放"></canvas>
 <header><div><h1>中国 · 共彩</h1><p>V6 · 开发工作台</p></div><div class="top-actions"><a class="standards-top" href="/audit/">对比审计</a><button id="auto" aria-pressed="false">自动旋转</button><button id="reset">复位</button></div></header>
 <button id="open-settings" class="open-settings" aria-expanded="false" aria-controls="settings">材质校准</button>
 <button id="open-background" class="open-background" aria-expanded="false" aria-controls="background-settings">背景</button>
 <aside id="background-settings" hidden aria-label="背景设置"><div class="panel-heading"><h2>背景</h2><button id="close-background">关闭</button></div>
 <div class="background-choices" role="group" aria-label="选择预览背景"><button data-background-choice="auto" aria-pressed="true">自动<span>手机柔光 3.0 · 桌面灰底</span></button><button data-background-choice="soft-v3" aria-pressed="false">柔光背景 3.0</button><button data-background-choice="soft" aria-pressed="false">柔光背景 · 原版</button><button data-background-choice="gray" aria-pressed="false">灰色背景</button><button data-background-choice="custom" aria-pressed="false" hidden>已选图片</button></div>
 <button id="choose-background" class="file-button">选择背景图片</button><input id="background-file" type="file" accept="image/jpeg,image/png,image/webp" hidden aria-label="选择本地背景图片">
 <p class="note">JPG、PNG、WebP，最大 20 MB。图片居中铺满，只在当前浏览器预览，刷新后恢复自动背景。</p><p id="background-status" class="note" role="status" aria-live="polite"></p>
 </aside>
 <aside id="settings" hidden aria-label="材质校准"><div class="panel-heading"><h2>材质校准</h2><button id="close-settings">关闭</button></div>
 <section><label class="field-label" for="relief">城市线条凹凸</label><select id="relief"><option value="1">凸纹 · 当前预览</option><option value="0">关闭凹凸</option><option value="-1">凹纹 · 对照</option></select><p class="note">仅改变城市线条的表面起伏。实际凹凸方向和高度仍待工艺确认。</p><label class="check-label"><input id="city-metal" type="checkbox" checked> 城市金属反射</label><label class="check-label"><input id="local-reflections" type="checkbox" checked> 邻近部件反射</label></section>
 <section><label class="check-label"><input id="fixed-relief" type="checkbox" checked> 彩色花纹浅起伏</label><p class="note">杯碟、把手与纵向饰带的花瓣描线和叶脉。选“花纹近看”，开关比较。</p></section>
 <section><label class="field-label" for="material-mode">观察方式</label><select id="material-mode"><option value="pbr">完整材质</option><option value="clay">中性灰 · 检查器型</option><option value="relief">中性灰 · 检查线条</option><option value="floral">中性灰 · 检查花纹</option><option value="metalness">金属覆盖区域</option></select><p class="note">关闭金属后仍保留线条起伏；金色底面没有整体位移。</p></section>
 <section><h3>当前素材</h3><p id="style-name" class="current-style">中国 · 临时线稿</p><p class="note">中国建筑沿用 PSD 定位，北京与深圳采用统一结构母版。把手、纵向饰带和杯碟花纹固定。</p><button id="restore" class="text-button">恢复默认款</button></section>
 <p class="provenance">广彩纹样采用提供的原始花纸。凹凸为贴图视觉近似，不代表实测高度。城市图样与点缀为依据参考制作的可修订预览。</p>
 </aside><footer><p class="gesture-hint">左键 / 单指旋转 · 右键 / 双指拖移 · 滚轮 / 捏合缩放</p><nav aria-label="观察视角">${Object.entries(cy).map(([e,t])=>`<button data-view="${e}" aria-pressed="${e===`hero`}">${t}</button>`).join(``)}</nav></footer>
 <div id="status" role="status" aria-live="polite"></div><div id="fatal" hidden role="alert"></div></main>`;let t=e=>document.querySelector(e),n=t(`#settings`),r=t(`#open-settings`),i=t(`#background-settings`),a=t(`#open-background`),o=e=>{i.hidden=!e,a.setAttribute(`aria-expanded`,String(e)),e&&(s(!1),t(`#close-background`).focus())},s=e=>{n.hidden=!e,r.setAttribute(`aria-expanded`,String(e)),e&&(o(!1),t(`#close-settings`).focus())};r.onclick=()=>s(n.hidden),t(`#close-settings`).onclick=()=>s(!1),a.onclick=()=>o(i.hidden),t(`#close-background`).onclick=()=>{o(!1),a.focus()};let c=t=>{t.key===`Escape`&&(i.hidden?n.hidden||(s(!1),r.focus()):(o(!1),a.focus())),!(t.target instanceof HTMLInputElement||t.target instanceof HTMLSelectElement)&&t.key.toLowerCase()===`r`&&e.reset()};document.addEventListener(`keydown`,c);let l=e=>{t(`#background-status`).textContent=e,t(`#background-status`).classList.add(`error`)};document.querySelectorAll(`[data-background-choice]`).forEach(t=>t.onclick=async()=>{try{await e.background(t.dataset.backgroundChoice)}catch(e){l(e.message)}});let u=t(`#background-file`);t(`#choose-background`).onclick=()=>u.click(),u.onchange=async()=>{let t=u.files?.[0];if(u.value=``,t)try{await e.uploadBackground(t)}catch(e){l(e.message)}},document.querySelectorAll(`[data-view]`).forEach(t=>t.onclick=()=>e.view(t.dataset.view)),t(`#auto`).onclick=e.auto,t(`#reset`).onclick=e.reset,t(`#relief`).onchange=t=>e.relief(+t.target.value),t(`#fixed-relief`).onchange=t=>e.fixedRelief(t.target.checked),t(`#city-metal`).onchange=t=>e.metal(t.target.checked),t(`#material-mode`).onchange=t=>e.mode(t.target.value),t(`#local-reflections`).onchange=t=>e.reflection(t.target.checked),t(`#restore`).onclick=async()=>{try{f(`正在恢复…`,!0),await e.restore()}catch(e){f(e.message,!0)}};let d=0;function f(e,n=!1){clearTimeout(d),t(`#status`).textContent=e,t(`#status`).classList.add(`visible`),n||(d=window.setTimeout(()=>t(`#status`).classList.remove(`visible`),3500))}return{closePanels(){s(!1),o(!1)},canvas:t(`#viewport`),backgroundLayer:t(`#scene-background`),backgroundError:l,background(e){document.querySelectorAll(`[data-background-choice]`).forEach(t=>{t.setAttribute(`aria-pressed`,String(e.choice===t.dataset.backgroundChoice)),t.dataset.backgroundChoice===`custom`&&(t.hidden=!e.hasCustom)}),i.setAttribute(`aria-busy`,String(e.busy)),t(`#background-status`).classList.remove(`error`),t(`#background-status`).textContent=e.busy?`正在准备背景…`:`当前：${{gray:`灰色背景`,soft:`柔光背景 · 原版`,"soft-v3":`柔光背景 3.0`,custom:`已选图片`}[e.active]}`},message:f,style(e){t(`#style-name`).textContent=e,f(`已载入 · ${e}`)},update(e,n){document.querySelectorAll(`[data-view]`).forEach(t=>t.setAttribute(`aria-pressed`,String(t.dataset.view===e))),t(`#auto`).setAttribute(`aria-pressed`,String(n)),t(`#auto`).textContent=n?`暂停旋转`:`自动旋转`},error(e){t(`#fatal`).hidden=!1,t(`#fatal`).textContent=e},dispose(){document.removeEventListener(`keydown`,c),clearTimeout(d)}}}function fy(e,t){let n=document.querySelector(`main`),r=document.createElement(`button`);r.disabled=!0,r.id=`open-artwork`,r.className=`open-artwork`,r.textContent=`城市与创作`,r.setAttribute(`aria-expanded`,`false`),r.setAttribute(`aria-controls`,`artwork-settings`);let i=document.createElement(`aside`);i.id=`artwork-settings`,i.hidden=!0,i.setAttribute(`aria-label`,`城市与创作`),i.innerHTML=`<div class="panel-heading"><h2>城市与创作</h2><button id="close-artwork">收起</button></div>
 <details class="city-selector"><summary>城市 <strong id="current-city"></strong></summary><div class="theme-options" role="group" aria-label="选择城市">${Object.entries(_u).map(([e,t])=>`<button data-theme="${e}">${t.name}${gu(e)?` · V6`:``}</button>`).join(``)}</div></details>
 <p class="field-label palette-heading">配色预设</p><div class="variant-grid" role="group" aria-label="选择配色预设"></div>
 <div id="creation-controls">
 <div class="adjust-toolbar"><div class="adjust-tabs" role="tablist" aria-label="选择调整内容"><button id="adjust-color-tab" role="tab" aria-controls="adjust-color-panel" aria-selected="true">颜色</button><button id="adjust-material-tab" role="tab" aria-controls="adjust-material-panel" aria-selected="false" tabindex="-1">材质</button></div><button id="reset-palette" class="reset-control" aria-label="恢复当前配色预设" title="恢复当前配色预设"><svg viewBox="0 0 24 24" aria-hidden="true"><path d="M9 3 5 7l4 4M5 7h7a7 7 0 1 1-6.6 9.3"/></svg></button></div>
 <div class="adjust-panels"><div id="adjust-color-panel" role="tabpanel" aria-labelledby="adjust-color-tab"><div class="pad-stage"><div class="color-pad-row"><div class="pad-mount"></div><div class="lightness-control"><input id="fill-lightness" type="range" min="20" max="65" step="1" aria-label="明度" aria-orientation="vertical"></div></div></div></div>
 <div id="adjust-material-panel" role="tabpanel" aria-labelledby="adjust-material-tab" hidden><div class="pad-stage"><div class="pad-mount"></div></div></div></div>
 </div>
 <div id="legacy-finish"><label class="field-label" for="artwork-finish">材质</label><select id="artwork-finish">${Object.entries(bu).map(([e,t])=>`<option value="${e}">${t}</option>`).join(``)}</select><p id="finish-note" class="note"></p></div>
 <label class="field-label" for="artwork-text">文字</label><select id="artwork-text"><option value="auto">随款式</option><option value="name">城市名称</option><option value="he">和合共彩</option><option value="create">共创美好</option><option value="none">不显示</option>${Object.entries(pu).map(([e,t])=>`<option value="${e}">${t}</option>`).join(``)}</select>
 <p class="note">切换城市保留当前创作。选择配色预设可重新开始。</p>
 <p id="artwork-progress" role="status" aria-live="polite"></p><button id="default-artwork" class="text-button">恢复默认款 · 中国纯金</button>`,n.append(r,i);let o=e=>i.querySelector(e),s=o(`#artwork-finish`),c=o(`#artwork-text`),l=o(`.city-selector`),u=matchMedia(`(max-width:520px)`),d=()=>{u.matches&&(l.open=!1)};l.open=!1,u.addEventListener(`change`,d);let f=``,m=``,h=0,g,_=`color`,v,y,b=!1,x=0,S=0,C=[],w=matchMedia(`(prefers-reduced-motion: reduce)`),T=[o(`#adjust-color-panel`),o(`#adjust-material-panel`)];function E(){cancelAnimationFrame(h),h=0;let t=g;if(g=void 0,t){b=!0;try{e.select({appearance:t})}finally{b=!1}}}let D=t=>{let n=g??e.desired.appearance;n&&(g={...n,...t},h||=requestAnimationFrame(E))},O=()=>{M(),R()},k=nd({id:`color-pad`,label:`调整颜色`,onStart:M,onInput:t=>{let n=g??e.desired.appearance;n&&D(Pu(t,n.hue))},onCommit:E,onCancel:O}),A=nd({id:`material-pad`,label:`调整材质`,onStart:M,onInput:e=>D({materialX:e.x,material:e.y}),onCommit:E,onCancel:O}),j=rd(o(`.lightness-control`),{onStart:M,onInput:e=>D({lightness:e}),onCommit:E,onCancel:O});o(`#adjust-color-panel .pad-mount`).append(k.element),o(`#adjust-material-panel .pad-mount`).append(A.element);function M(){++S;for(let e of T){e.getAnimations().forEach(e=>e.cancel());let t=e.id===`adjust-${_}-panel`;e.hidden=!t,e.inert=!t,e.setAttribute(`aria-hidden`,String(!t))}cancelAnimationFrame(x),x=0,y=void 0,delete i.dataset.restoring,cancelAnimationFrame(h),h=0,g=void 0,k.cancel(),A.cancel(),j.cancel()}function N(){let t=y;if(M(),t){b=!0;try{e.select({appearance:t})}finally{b=!1}}}function P(e){let t=_;N(),_=e;let n=++S;for(let e of T)e.getAnimations().forEach(e=>e.cancel()),e.inert=!1,e.style.opacity=``;for(let t of[`color`,`material`]){let n=t===e,r=o(`#adjust-`+t+`-tab`);r.setAttribute(`aria-selected`,String(n)),r.tabIndex=n?0:-1,o(`#adjust-`+t+`-panel`).hidden=!n,o(`#adjust-`+t+`-panel`).setAttribute(`aria-hidden`,String(!n))}if(R(),(e===`color`?k:A).refresh(),e===`color`&&j.refresh(),t!==e&&!w.matches){let r=o(`#adjust-`+e+`-panel`),i=o(`#adjust-`+t+`-panel`);i.hidden=!1,i.inert=!0,i.setAttribute(`aria-hidden`,`true`),r.removeAttribute(`aria-hidden`);let a=i.animate([{opacity:1,transform:`scale(1)`},{opacity:0,transform:`scale(.96)`}],{duration:180,easing:`ease-out`,fill:`forwards`}),s=r.animate([{opacity:0,transform:`translateY(7px) scale(.96)`},{opacity:1,transform:`none`}],{duration:300,easing:`cubic-bezier(.2,.8,.2,1)`});Promise.all([a.finished,s.finished]).then(()=>{n===S&&(i.hidden=!0,a.cancel())},()=>{})}}for(let e of[`color`,`material`]){let t=o(`#adjust-`+e+`-tab`);t.onclick=t=>{_!==e&&td.pulse(t),P(e)},C.push(td.attachButton(t)),t.onkeydown=e=>{if(![`ArrowLeft`,`ArrowRight`,`Home`,`End`].includes(e.key))return;e.preventDefault();let t=e.key===`Home`?`color`:e.key===`End`||_===`color`?`material`:`color`;P(t),o(`#adjust-`+t+`-tab`).focus()}}function F(e){N(),i.hidden=!e,n.classList.toggle(`artwork-open`,e),r.setAttribute(`aria-expanded`,String(e)),e?(t(),R(),i.scrollTop=0,o(`#close-artwork`).focus(),k.refresh(),A.refresh(),j.refresh()):r.focus()}r.onclick=()=>F(i.hidden),o(`#close-artwork`).onclick=()=>F(!1);let I=()=>{N(),i.hidden=!0,n.classList.remove(`artwork-open`),r.setAttribute(`aria-expanded`,`false`)};document.querySelector(`#open-settings`).addEventListener(`click`,I),document.querySelector(`#open-background`).addEventListener(`click`,I);let L=e=>{e.key===`Escape`&&!i.hidden&&F(!1)};document.addEventListener(`keydown`,L),i.querySelectorAll(`[data-theme]`).forEach(t=>t.onclick=()=>{M(),l.open=!1,e.select(Ou(e.desired,t.dataset.theme))}),s.onchange=()=>{M(),e.select({finish:s.value})},c.onchange=()=>{M(),e.select({text:c.value})},o(`#default-artwork`).onclick=()=>{M(),e.restore()},o(`#reset-palette`).onclick=t=>{td.pulse(t,12),M();let n=e.desired.appearance;if(!n)return;let r=p(n.preset);if(w.matches){e.select({appearance:r});return}let a=performance.now(),s=(r.hue-n.hue+540)%360-180;o(`#reset-palette svg`).getAnimations().forEach(e=>e.cancel()),o(`#reset-palette svg`).animate([{transform:`rotate(-180deg)`},{transform:`rotate(0deg)`}],{duration:420,easing:`ease-out`}),i.dataset.restoring=`true`,y=r;let c=t=>{let o=Math.min(1,(t-a)/420),l=1-(1-o)**3,u={...r,hue:(n.hue+s*l+360)%360};for(let e of[`saturation`,`lightness`,`material`,`materialX`,`relief`])u[e]=(n[e]??.5)+((r[e]??.5)-(n[e]??.5))*l;b=!0;try{e.select({appearance:o===1?r:u})}finally{b=!1}o<1?x=requestAnimationFrame(c):(x=0,y=void 0,delete i.dataset.restoring)};x=requestAnimationFrame(c)},C.push(td.attachButton(o(`#reset-palette`)));function R(){let t=e.desired,n=Eu(t.variant),r=xu(n.theme);v!==t.appearance&&!b&&M(),v=t.appearance,i.setAttribute(`aria-busy`,String(e.busy)),o(`#creation-controls`).hidden=!r,o(`#legacy-finish`).hidden=r,o(`#current-city`).textContent=wu(n).name,n.theme!==f&&(f=n.theme,o(`.variant-grid`).classList.toggle(`palette-grid`,r),o(`.variant-grid`).innerHTML=Su.filter(e=>e.theme===n.theme).map(e=>{let t=r?a[e.id.slice(n.theme.length+1)]:null;return`<button class="variant-card" data-variant="${e.id}">${t?`<span class="palette-swatch" style="background:linear-gradient(145deg,${t.dark},${t.light})" aria-hidden="true"></span>`:e.thumbnail?`<img alt="" loading="lazy" src="/cities/v4/${e.thumbnail}">`:`<span class="gold-swatch" aria-hidden="true">金</span>`}<span>${e.name.split(` · `)[1]}</span></button>`}).join(``),i.querySelectorAll(`[data-variant]`).forEach(t=>t.onclick=()=>{M(),e.select(r?{variant:t.dataset.variant}:{variant:t.dataset.variant,finish:`enamel`})})),i.querySelectorAll(`[data-theme]`).forEach(e=>e.setAttribute(`aria-pressed`,String(e.dataset.theme===n.theme))),i.querySelectorAll(`[data-variant]`).forEach(e=>e.setAttribute(`aria-pressed`,String(e.dataset.variant===t.variant))),s.value=t.finish,s.disabled=Cu(n),c.value=t.text;for(let e of c.options)e.hidden=gu(n.theme)?!Object.hasOwn(pu,e.value):Object.hasOwn(pu,e.value)||!wu(n).slogans&&[`he`,`create`].includes(e.value);if(r&&t.appearance){let e=t.appearance;k.setValue(Fu(e.hue,e.saturation)),A.setValue({x:e.materialX??.5,y:e.material});let n=p(e.preset);k.setReference(Fu(n.hue,n.saturation)),A.setReference({x:n.materialX??.5,y:n.material}),j.setValue(e.lightness,e.hue,e.saturation,n.lightness),k.setBackground(String(e.lightness),ad(e.lightness)),A.setBackground([e.hue,e.saturation,e.lightness].join(`,`),od(e))}o(`#finish-note`).textContent=Cu(n)?`中国原版纯金保留原始材质。`:`沿用已有中国图样与配色。`,o(`#artwork-progress`).textContent=e.busy?`正在准备 ${n.name}${m?` · `+m:``}`:e.error||`当前：${Eu(e.current.variant).name}`,o(`#artwork-progress`).classList.toggle(`error`,!!e.error),e.busy||(m=``,document.querySelector(`h1`).textContent=wu(Eu(e.current.variant)).name+` · 共彩`)}return R(),{ready:()=>{r.disabled=!1},render:R,progress:(e,t)=>{m=`${e} / ${t}`,R()},close:I,dispose(){M(),k.dispose(),A.dispose(),j.dispose(),C.forEach(e=>e()),u.removeEventListener(`change`,d),document.removeEventListener(`keydown`,L),document.querySelector(`#open-settings`)?.removeEventListener(`click`,I),document.querySelector(`#open-background`)?.removeEventListener(`click`,I),i.remove(),r.remove()}}}function py(){if(!new URLSearchParams(location.search).has(`haptics-debug`))return()=>{};let e=document.createElement(`details`),t=document.createElement(`summary`),n=document.createElement(`pre`),r=document.createElement(`button`);e.style.cssText=`position:fixed;top:85px;right:10px;z-index:100;width:min(310px,90vw);max-height:45vh;overflow:auto;padding:9px;border-radius:10px;background:#fffffff2;color:#222;border:1px solid #bbb;font:12px/1.5 system-ui;`,t.textContent=`触感诊断`,n.style.cssText=`white-space:pre-wrap;overflow-wrap:anywhere;margin:8px 0;font:11px/1.5 monospace;`,r.textContent=`复制诊断`,r.type=`button`,r.style.cssText=`padding:6px 10px;font-size:12px;`,e.append(t,n,r),document.body.append(e);let i=()=>({version:`5.4.2`,userAgent:navigator.userAgent,visibility:document.visibilityState,reducedMotion:matchMedia(`(prefers-reduced-motion: reduce)`).matches,...td.debug(),note:`计数只代表原生触摸和开关方向更新，实际震感请人工确认。`}),a=()=>{e.open&&(n.textContent=JSON.stringify(i(),null,2))};e.addEventListener(`toggle`,a),r.onclick=async()=>{try{await navigator.clipboard.writeText(JSON.stringify(i(),null,2)),r.textContent=`已复制`}catch{r.textContent=`请选择上方文字复制`}};let o=window.setInterval(a,500);return()=>{clearInterval(o),e.remove()}}function my(e,t){let n=new cr,r=new Nr;return()=>{if(n.setFromObject(t),n.isEmpty())return;n.getBoundingSphere(r);let i=e.position.distanceTo(r.center)+r.radius+64,a=Math.max(2500,Math.ceil(i/256)*256);e.far!==a&&(e.far=a,e.updateProjectionMatrix())}}function hy(e,t,n=!1){let r=new dn,i=new dn,a=!1;return{apply(){if(n){let n=t.clientWidth,o=t.clientHeight,s=document.querySelector(`#artwork-settings`)?.getBoundingClientRect();if(!s)return;let c=o<=520,l=c?.8:n<=700?.94:.88,u=c?.5:Math.min(.44,Math.max(.32,(s.top+40)/o*.5));r.copy(e.projectionMatrix),i.set(l,0,0,c?-330/n:-.045,0,l,0,c?0:1-2*u-.14*l,0,0,1,0,0,0,0,1),e.projectionMatrix.premultiply(i),e.projectionMatrixInverse.copy(e.projectionMatrix).invert(),a=!0;return}if(!t.closest(`main`)?.classList.contains(`artwork-open`))return;let o=t.clientWidth,s=t.clientHeight,c=o<=700&&s>520,l=c?.55:s<=520?.8:.83;r.copy(e.projectionMatrix),i.set(l,0,0,c?0:-(s<=520?310:340)/o,0,l,0,c?.48:0,0,0,1,0,0,0,0,1),e.projectionMatrix.premultiply(i),e.projectionMatrixInverse.copy(e.projectionMatrix).invert(),a=!0},restore(){a&&=(e.projectionMatrix.copy(r),e.projectionMatrixInverse.copy(r).invert(),!1)}}}var gy={path:`backgrounds/soft-light-d9af01e672e4.webp`,bytes:38714,source:`User supplied soft light backdrop, 2026-10-13`,v3:{path:`backgrounds/soft-light-v3-d06c52a8f2003f50.webp`,bytes:91936,source:`User supplied 3.0 mobile background PNG`}},_y=`(max-width: 600px), (hover: none) and (pointer: coarse)`,vy=20971520;function yy(e){return new Promise((t,n)=>{let r=new Image;r.onload=()=>t(r),r.onerror=()=>n(Error(`图片无法读取，请选择有效的 JPG、PNG 或 WebP。`)),r.src=e})}var by=class{studio;layer;notify;report;media=matchMedia(_y);revision=0;disposed=!1;intent=`auto`;current={choice:`auto`,active:`gray`,busy:!1,hasCustom:!1};customUrl;softReady={};softUrls={soft:`/${gy.path}`,"soft-v3":`/${gy.v3.path}`};ready;constructor(e,t,n,r){this.studio=e,this.layer=t,this.notify=n,this.report=r,this.paint(`gray`),this.media.addEventListener(`change`,this.responsive),this.ready=this.select(`auto`).catch(e=>this.report(e.message))}state=()=>({...this.current});responsive=()=>{this.intent===`auto`&&this.select(`auto`).catch(e=>this.report(e.message))};paint(e,t){this.layer.style.backgroundImage=t?`url("${t}")`:`none`,this.layer.dataset.background=e,this.studio.scene.background=e===`gray`?new X(`#b7b8ba`):null,this.studio.renderer.setClearColor(0,0)}async select(e){if(this.disposed)return;if(e===`custom`&&!this.customUrl)throw Error(`请先选择一张背景图片。`);let t=++this.revision;this.intent=e,this.current.busy=!0,this.notify(this.state());let n=e===`auto`?this.media.matches?`soft-v3`:`gray`:e;try{if((n===`soft`||n===`soft-v3`)&&(this.softReady[n]??=yy(this.softUrls[n]).catch(e=>{throw delete this.softReady[n],e}),await this.softReady[n]),this.disposed||t!==this.revision)return;this.paint(n,n===`soft`||n===`soft-v3`?this.softUrls[n]:n===`custom`?this.customUrl:void 0),this.current={choice:e,active:n,busy:!1,hasCustom:!!this.customUrl},this.notify(this.state())}catch(e){if(t!==this.revision||this.disposed)return;throw this.intent=this.current.choice,this.current.busy=!1,this.notify(this.state()),e}}async upload(e){if(this.disposed)return;let t=++this.revision;this.intent=`custom`,this.current.busy=!0,this.notify(this.state());let n,r;try{if(![`image/jpeg`,`image/png`,`image/webp`].includes(e.type))throw Error(`请选择 JPG、PNG 或 WebP 图片。`);if(e.size>vy)throw Error(`图片超过 20 MB，请选择较小的图片。`);n=URL.createObjectURL(e);let i=await yy(n);if(this.disposed||t!==this.revision)return;if(i.naturalWidth*i.naturalHeight>64e6)throw Error(`图片像素过大，请选择 6400 万像素以内的图片。`);let a=Math.min(1,2048/Math.max(i.naturalWidth,i.naturalHeight)),o=document.createElement(`canvas`);o.width=Math.max(1,Math.round(i.naturalWidth*a)),o.height=Math.max(1,Math.round(i.naturalHeight*a));let s=o.getContext(`2d`);if(!s)throw Error(`浏览器暂时无法处理图片，请重试。`);s.drawImage(i,0,0,o.width,o.height);let c=await new Promise((e,t)=>o.toBlob(n=>n?e(n):t(Error(`图片预览生成失败，请重试。`)),`image/webp`,.94));if(o.width=o.height=0,this.disposed||t!==this.revision||(r=URL.createObjectURL(c),await yy(r),this.disposed||t!==this.revision))return;let l=this.customUrl;this.customUrl=r,r=void 0,this.paint(`custom`,this.customUrl),this.current={choice:`custom`,active:`custom`,busy:!1,hasCustom:!0},this.notify(this.state()),l&&URL.revokeObjectURL(l)}catch(e){if(t!==this.revision||this.disposed)return;throw this.intent=this.current.choice,this.current.busy=!1,this.notify(this.state()),e}finally{n&&URL.revokeObjectURL(n),r&&URL.revokeObjectURL(r)}}dispose(){this.disposed=!0,++this.revision,this.media.removeEventListener(`change`,this.responsive),this.layer.style.backgroundImage=`none`,this.customUrl&&URL.revokeObjectURL(this.customUrl),this.customUrl=void 0}};Zl===`consumer`&&document.documentElement.style.setProperty(`--consumer-edge-background`,`url("/backgrounds/soft-light-v3-d06c52a8f2003f50.webp")`);var xy=()=>{},Sy=()=>{},Cy=new Set([`花纹`,`杯底标识`,`背景`]),wy=!1,Ty=!1,Ey=0,Dy,Oy,ky=``,Ay,jy=0,My,Ny=``,Py=``,Fy=[],Iy=Object.keys(hu).map(e=>e.slice(3));function Ly(){return Ay??=f().then(e=>Vy=e)}var Ry=matchMedia(`(pointer:coarse), (max-width:700px)`).matches,Q=Zl===`consumer`?new ou(Ry):void 0,zy=Yl();Object.assign(window,{cupViewer:{ready:()=>zy.get().phase===`ready`,whenReady:zy.whenReady,getLoadState:zy.get,onLoadStateChange:zy.subscribe}});var By=Q?cu(Q,zy.publish):void 0,Vy,Hy=`light`,Uy=`shenzhen`,Wy={body:`light`,handle:`light`,saucer:`light`},Gy=0,Ky=performance.now(),qy=!0,Jy=0,Yy=0,Xy=!1,Zy=!1,Qy=0,$y=!1,eb=``,tb=0,nb=new Set,rb=``;function ib(){qy=!0,Jy=performance.now()+500,!Gy&&!document.hidden&&!Xy&&(Gy=requestAnimationFrame(nx))}function ab(){if(Ty||!Vy||!pb||jb.busy)return;let e=s(jb.current,Vy.manifest),t=JSON.stringify(e);if(t!==rb){rb=t;for(let t of nb)try{t(structuredClone(e))}catch(e){console.error(`Design listener failed`,e)}}}var ob=sv(),sb=nv(ob),cb,lb,ub=`pbr`,db=!1,fb=!1,pb=!1,mb=!0,hb=(Zl===`consumer`?Od:dy)({view:e=>{fb=!1,$.camera.clearViewOffset(),$.camera.fov=33,$.camera.updateProjectionMatrix(),cb.set(e)},auto:()=>cb.setAuto(!cb.auto),reset:()=>{fb=!1,$.camera.clearViewOffset(),$.camera.fov=33,$.camera.updateProjectionMatrix(),cb.set(`hero`)},relief:e=>zb(e),fixedRelief:e=>Bb(e),metal:e=>{lb.setMetal(e),Rb()},mode:e=>{ub=e,Rb()},reflection:e=>Tb.setEnabled(e),background:e=>gb.select(e),uploadBackground:e=>gb.upload(e),restore:async()=>{await jb.restore()}}),$;hb.message(`正在载入花纸与金色浮雕…`,!0);try{$=uv(hb.canvas,!0,{consumer:Zl===`consumer`,mobile:Ry})}catch(e){throw By?.fail(`无法启动画面，请使用支持 WebGL 2 的浏览器。`),hb.error(`无法启动 WebGL 2，请使用支持硬件加速的浏览器。`),e}var gb=new by($,hb.backgroundLayer,hb.background,hb.backgroundError);$.scene.add(sb.root);var _b=0,vb=0,yb=!1,bb=!1,xb,Sb=new Xl;function Cb(){return _b+Object.values($.memory()).reduce((e,t)=>e+t,0)+24*1024**2+12*1024**2}function wb(e=!1){e&&!yb&&xb?.releaseScratch(),yb=e;let t=()=>Q&&(Q.debug().estimatedGpuBytes+Cb()+(e?66*1024**2:0)>Q.maximum||!e&&!Q.transitioning&&Q.debug().estimatedGpuBytes+Cb()-vb>Q.steady);if(!bb&&Q&&_b){bb=!0;try{for(;t()&&$.renderer.getPixelRatio()>1;){let e=Math.max(1,$.renderer.getPixelRatio()-.25);$.renderer.setPixelRatio(e),Qb.ratio=e,$.resize()}}finally{bb=!1}t()&&xb?.fallback(`graphics-memory-budget`)}Q?.setReserve(Cb()+(e?66*1024**2:0))}for(;Q&&Cb()+24*1024**2>Q.steady&&$.renderer.getPixelRatio()>1;)$.renderer.setPixelRatio(Math.max(1,$.renderer.getPixelRatio()-.25)),$.resize();wb();var Tb=dv($,sb,ob.city,[ob.wallPorcelain],wb),Eb=[av(ob.porcelain),av(ob.city,!0),av(ob.wallPorcelain)];ob.porcelain.envMap=$.porcelainEnvironment,sb.root.traverse(e=>{if(e instanceof di)for(let t of Array.isArray(e.material)?e.material:[e.material])t.name===`knob-striped-porcelain`&&(t.envMap=$.porcelainEnvironment,Eb.push(av(t)))});var Db=pv($,sb,ob.porcelain);cb=new ly($,()=>sb,()=>{cb&&(hb.update(cb.view,cb.auto),ib())}),tb=$b();var Ob=Math.min(8,$.renderer.capabilities.getMaxAnisotropy()),kb=new jv(ob,$.renderer.capabilities.getMaxAnisotropy(),()=>{sb.setFixedMapping(kb.currentMapping),Tb.invalidate(),Db.invalidate(),ib()},Q);lb=new Lv(ob.city,Ob,Q);var Ab,jb=new Au(async e=>{if(Zl===`consumer`&&(await Ly(),e!==jb.desired||db||Xy))return!1;let t=e.variant.replace(/^v6-/,``).replace(/-(gold|red|green|purple|blue)$/,``);t!==Uy&&(Uy=t,Hy=`light`);let n=await Vb(Vy?Vy.cityPack(e,Hy):ku(e,Nv,`/`));return n&&e.variant===`china-gold`&&!e.appearance&&(lb.setRelief(1),ub!==`pbr`&&Rb()),n},()=>{Ab?.render(),Hb(),ib(),ab(),pb&&!jb.busy&&!jb.error&&Gb()},Zl===`consumer`?yu:void 0),Mb=jb.desired;Ab=Zl===`consumer`?Sd(jb,e=>{fb=!1,cb.set(e)}):fy(jb,hb.closePanels),xb=Zl===`consumer`?H_({invalidate:ib,admitMemory:(e,t)=>{if(!Q)return!0;Q.trimIdle(Cb()-_b+e-t);let n=()=>Q.debug().estimatedGpuBytes+Cb()-_b+e;for(;e>_b&&(!Q.transitioning&&n()-t>Q.steady||n()+(yb?66*1024**2:0)>Q.maximum)&&$.renderer.getPixelRatio()>1;){let e=Math.max(1,$.renderer.getPixelRatio()-.25);$.renderer.setPixelRatio(e),Qb.ratio=e,$.resize()}return e>_b&&(!Q.transitioning&&n()-t>Q.steady||n()+(yb?66*1024**2:0)>Q.maximum)?!1:(_b=e,vb=t,wb(yb),!0)}}):void 0,lb.onProgress=(e,t)=>{Ab?.progress(e,t),jb.busy&&hb.message(`正在准备 ${Eu(jb.desired.variant).name} · ${e} / ${t}`,!0)};var Nb=sb.cup.getObjectByName(`wide-ribbon-handle`),Pb=sb.saucer.children[0];kb.fit({body:sb.parameters.radius*sb.parameters.bandAngle/(sb.parameters.height-5.3),handle:Nb.geometry.userData.surfaceMetrics.aspect,saucer:Pb.geometry.userData.surfaceMetrics.aspect});var Fb=sb.cup.getObjectByName(`cup-wall-and-recessed-foot`).material;Fb[1]=ob.wallPorcelain;var Ib=new Map;sb.root.traverse(e=>{e instanceof di&&e.type!==`Reflector`&&Ib.set(e,e.material)});var Lb=[];function Rb(){ib();for(let[e,t]of Ib)e.material=t;if(Lb.forEach(e=>e.dispose()),Lb=[],ub===`pbr`){Tb.refresh();return}let e=new ya({color:`#b9b9b7`,roughness:.45});Lb.push(e);let t=new Map,n=n=>{if(t.has(n))return t.get(n);let r=e;if(ub===`metalness`&&(r=new $r({color:n===ob.gold?16777215:0})),ub===`metalness`&&n===ob.city){let e=new $r({map:ob.city.metalnessMap});lb.configureMetalnessInspection(e),r=e}if(ub===`metalness`&&Object.values(ob.regions).includes(n)&&(r=new $r({map:n.metalnessMap})),ub===`relief`&&n===ob.city&&(r=new ya({color:`#9b9b98`,roughness:.48,normalMap:ob.city.normalMap,normalScale:ob.city.normalScale})),ub===`floral`&&Object.values(ob.regions).includes(n)){let e=n;r=new ya({color:`#9b9b98`,roughness:.42,normalMap:e.normalMap,normalScale:e.normalScale})}return r!==e&&(ub===`metalness`&&!r.userData.cityParameterInspection&&(r.onBeforeCompile=e=>{e.fragmentShader=e.fragmentShader.replace(`#include <color_fragment>`,`diffuseColor.rgb=vec3(diffuseColor.b);
#include <color_fragment>`)}),G_(r,n.userData.fixedAtlas),r instanceof ya&&Gl(r),Lb.push(r)),t.set(n,r),r};for(let[e,t]of Ib)e.material=Array.isArray(t)?t.map(n):n(t)}function zb(e){let t=jb.desired.appearance;t&&lb.current?.parametric&&e>=0?jb.select({appearance:{...t,relief:e}}):(lb.setRelief(e),Rb())}function Bb(e){mb=e;for(let t of Object.values(ob.regions))t.normalScale.setScalar(e?ov.relief:0),t.clearcoatNormalScale.setScalar(e?ov.clearcoatRelief:0);Rb()}async function Vb(e){let t=await lb.apply(e);return t&&(ib(),ub!==`pbr`&&Rb(),pb&&hb.style(lb.current.name)),t}function Hb(){if(!(db||Xy||Ty)){if(jb.error){pb||By?.fail(`当前城市未能准备好，请重新加载。`),hb.message(jb.error);return}if(ky){By?.fail(ky),hb.message(ky,!0);return}if(jb.busy){hb.message(`正在准备 · `+Eu(jb.desired.variant).name,!0);return}if(Cy.size){hb.message(`正在载入`+[...Cy].join(`、`)+`…`,!0);return}lb.current&&(pb||(Tb.initialize(),pb=!0,Zy=!1,qb=!0,Ab?.ready(),ib(),ab()),By?By.prepared():(hb.canvas.dataset.ready=`true`,zy.publish({phase:`ready`})),hb.style(lb.current.name))}}function Ub(e,t,n=jy){return t.then(t=>(n===jy&&!Xy&&(Cy.delete(e),Hb()),t))}function Wb(){return jb.desired.variant.replace(/^v6-/,``).replace(/-(gold|red|green|purple|blue)$/,``)}function Gb(){if(Ty||!Vy||!Q||Xy||db)return;let e=Wb();if(e===Ny)return;Ny=e,Py=``,My?.abort();let t=My=new AbortController,n=Ry?`standard`:`detail`,r=l(Vy.manifest,e,n,Iy);(async()=>{await Q.prefetch(r.slice(0,2),t.signal),!t.signal.aborted&&Wb()===e&&ex(),await Q.prefetch(r.slice(2),t.signal)})().catch(e=>{t.signal.aborted||(Py=String(e),Ny=``)})}var Kb,qb=!1;async function Jb(){let e=++jy;try{By?.begin(),ky=``;for(let e of[`花纹`,`杯底标识`,`背景`,...Q?[`城市与文字`]:[]])Cy.add(e);if(Zl===`consumer`){if(await Ly(),e!==jy||db||Xy)return;let t=Vy.manifest;Q.pinFiles([...r(t),t.mark,...Object.values(t.fixed).flatMap(e=>[e.light.baseColor,e.light.normal,e.light.orm])])}let t=Q&&Vy?Q.acquire(Vy.manifest.mark).then(e=>{if(db){e.release();return}Kb?.release(),Kb=e,e.texture.anisotropy=Ob,e.texture.needsUpdate=!0,ob.mark.map=e.texture,ob.mark.needsUpdate=!0,ib()}):yv(`/marks/auratic-reference.png`).then(e=>{if(db){e.dispose();return}e.colorSpace=Ye,ob.mark.map=e,ob.mark.needsUpdate=!0,ib()}),n=Vy?u(Vy.bootstrap.defaultDesign,Vy.manifest):void 0,i=qb?jb.current:jb.desired!==Mb||!n?jb.desired:{variant:`v6-${n.cityId}-${n.appearance.preset}`,text:n.sloganId,appearance:n.appearance},a=Zl===`consumer`?jb.select(i):Vb(Nv),s=Zy,c=Vy?r(Vy.manifest):[],d=Vy&&!s?l(Vy.manifest,Wb(),Ry?`standard`:`detail`,Iy):[];if(Vy){let e=Vy.fixedPack(Wy);By?.plan([Vy.manifest.mark,...Object.values(e.regions).flatMap(e=>[e.runtime.baseColor,e.runtime.normal,e.runtime.orm]),...c,...d])}if(await Promise.all([Ub(`花纹`,kb.apply(Vy?Vy.fixedPack(Wy):Ov).then(e=>{if(!e)throw Error(`固定花纸读取中断`);db||(Fb[1]=ob.regions.body,Rb())}),e),a,Ub(`杯底标识`,t,e),Ub(`背景`,Zl===`consumer`?gb.ready.then(()=>gb.select(`soft-v3`)):gb.ready,e)]),e!==jy||db||Xy)return;if(Q&&Vy){if(await Q.prefetch([...c,...d]),e!==jy||db||Xy)return;let t=await Q.acquireAll(o(Vy.manifest).map(e=>e.asset));if(e!==jy||db||Xy){t.forEach(e=>e.release());return}Fy.forEach(e=>e.release()),Fy=t;for(let e of t)$.renderer.initTexture(e.texture);if(await Ab.setThumbnails(Object.fromEntries(Object.entries(Vy.manifest.cities).map(([e,t])=>[e,Q.previewUrl(t.thumbnail)]))),e!==jy||db||Xy)return;if(!s&&(Hy=Ry?`standard`:`detail`,!await jb.select({})))throw Error(`当前城市高清未准备完成`);Ny=s?``:Wb(),Cy.delete(`城市与文字`)}Hb(),s&&Gb()}catch(t){if(e!==jy||db||Xy)return;throw t}}function Yb(e){console.error(`Startup failed`,e),ky=`部分素材未能载入，请刷新重试。`,Hb(),Zl!==`consumer`&&hb.error(String(e))}document.querySelector(`.entry-reload`)?.addEventListener(`click`,e=>{(ky||jb.error)&&(e.preventDefault(),Vy||(Ay=void 0),pb=!1,Jb().catch(Yb))}),Jb().catch(Yb);var Xb=document.documentElement.dataset.labPreview===`true`?{apply(){},restore(){}}:hy($.camera,hb.canvas,Zl===`consumer`),Zb=my($.camera,sb.root),Qb=new lu($.renderer.getPixelRatio(),Math.min(devicePixelRatio,2));function $b(){return sb.parameters.radius*2*hb.canvas.clientHeight*$.renderer.getPixelRatio()/(2*$.camera.position.distanceTo(cb.controls.target)*Math.tan($.camera.fov*Math.PI/360))}function ex(){clearTimeout(Qy),Vy&&!Ty&&!Xy&&!document.hidden&&(Qy=window.setTimeout(()=>void tx(),350))}async function tx(){if(wy||Ty||!Vy||!pb||jb.busy||cb.moving||$y||document.hidden||Xy||(tb||=$b(),!([`detail`,`flowers`,`handle`,`lid`].includes(cb.view)||$b()>tb*1.35)&&Hy!==`light`))return;let e=Ry?`standard`:$b()*3>2048?`detail`:`standard`,t=Ey;$y=!0,eb=``;try{let n=cb.view===`flowers`?`saucer`:cb.view===`handle`?`handle`:cb.view===`lid`?`none`:`city`,r={body:`light`,handle:`light`,saucer:`light`};n===`saucer`&&(r.saucer=e),n===`handle`&&(r.body=e,r.handle=e);let i=n===`city`?e:Hy===`light`?`light`:`standard`,a=Wb(),s=Vy.cityPack(jb.current,i),c=Vy.fixedPack(r),l=[s.runtime.mask,s.runtime.normal,s.runtime.label.asset,Vy.manifest.mark,...Object.values(c.regions).flatMap(e=>[e.runtime.baseColor,e.runtime.normal,e.runtime.orm])],u=o(Vy.manifest).reduce((e,t)=>e+ql(t.asset),0)-ql(s.runtime.label.asset),d=l.reduce((e,t)=>e+ql(t),0)+u;for(;d+Cb()>Q.steady&&Qb.ratio>1;)Qb.ratio=Math.max(1,Qb.ratio-.25),$.renderer.setPixelRatio(Qb.ratio),$.resize(),wb();if(d+Cb()>Q.steady){eb=`当前画面达到资源预算，保留现有清晰度`;return}if(Hy!==i){let e=Hy;Hy=i;let n=await jb.select({});if(t!==Ey||(!n&&Wb()===a&&(Hy=e),Wb()!==a))return}if(t!==Ey)return;JSON.stringify(r)!==JSON.stringify(Wy)&&await kb.apply(c)&&(Wy=r,Bb(mb))}catch(e){eb=String(e)}finally{$y=!1}}function nx(e){if(Gy=0,db||document.hidden||Xy||Zy)return;let t=e-Ky,n=Math.min(.1,t/1e3);Ky=e;let r=!fb&&cb.update(n);if(r&&(Jy=e+500,ex()),r||qy){if(wb(),Ry&&pb&&r&&Qb.sample(t)){let e=$.renderer.getPixelRatio();$.renderer.setPixelRatio(Qb.ratio),$.resize(),wb(),Q.debug().estimatedGpuBytes+Cb()>Q.steady&&(Qb.ratio=e,$.renderer.setPixelRatio(e),$.resize(),wb())}Zb(),$.contact.update(sb.root),Xb.apply(),ub===`pbr`&&(Tb.update(e),Db.update()),$.floor.visible=sb.saucer.visible&&sb.cup.visible,$.renderer.render($.scene,$.camera),Yy++,xb?.captureModel(),Xb.restore(),pb&&!Ty&&(!xb||xb.ready())&&By?.finish(()=>{hb.canvas.dataset.ready=`true`}),qy=!1}if(Ry){let t=Sb.sample(e,pb&&hb.canvas.dataset.ready===`true`&&!jb.busy&&!$y&&!Q?.transitioning&&!Q?.debug().decode.active&&(r||e<Jy));t&&xb?.fallback(t)}cb.moving||e<Jy?Gy||=requestAnimationFrame(nx):ex()}var rx=()=>{ib(),ex()};cb.controls.addEventListener(`change`,rx),cb.controls.addEventListener(`start`,rx);var ix=e=>{!e||e.target===hb.canvas?ib():!Gy&&!document.hidden&&!Xy&&(Gy=requestAnimationFrame(nx)),Jy=performance.now()+1200,ex()},ax=new AbortController;for(let e of[`pointerdown`,`pointermove`,`pointerup`,`keydown`])document.addEventListener(e,ix,{capture:!0,passive:!0,signal:ax.signal});hb.canvas.addEventListener(`viewport-resize`,()=>{bb||wb(yb),ib()},{signal:ax.signal});var ox=new ResizeObserver(()=>ix());ox.observe(document.querySelector(`#artwork-settings`)),document.addEventListener(`visibilitychange`,()=>{Q?.pause(document.hidden),Sb.reset(),document.hidden?(cancelAnimationFrame(Gy),Gy=0,clearTimeout(Qy)):(Ky=performance.now(),ib())},{signal:ax.signal}),hb.canvas.addEventListener(`webglcontextlost`,e=>{e.preventDefault(),Dy?.abort(),++Ey,jb.cancelPending(),xb?.fallback(`model-context-lost`),Xy=!0,Zy=!0,pb=!1,++jy,My?.abort(),Ny=``,Fy.forEach(e=>e.release()),Fy=[],By?.begin(),document.querySelector(`#artwork-settings`).inert=!0,hb.canvas.dataset.ready=`false`,cancelAnimationFrame(Gy),Gy=0,clearTimeout(Qy),lb.resetRuntime(),kb.cancelPending(),Q?.clear(),$.releaseContext(),Tb.releaseContext(),Db.releaseContext();let t=new Set;$.scene.traverse(e=>{if(e instanceof di){e.geometry.dispose();for(let n of Array.isArray(e.material)?e.material:[e.material])t.add(n)}}),t.forEach(e=>e.dispose()),hb.message(`正在恢复画面…`,!0)},{signal:ax.signal}),hb.canvas.addEventListener(`webglcontextrestored`,()=>{Xy=!1,Hy=`light`,Wy={body:`light`,handle:`light`,saucer:`light`},$.rebuildEnvironment(),ob.porcelain.envMap=$.porcelainEnvironment,sb.root.traverse(e=>{if(e instanceof di)for(let t of Array.isArray(e.material)?e.material:[e.material])t.name===`knob-striped-porcelain`&&(t.envMap=$.porcelainEnvironment)}),Tb.invalidate(),Db.invalidate(),$.contact.invalidate(),(Oy?Oy.catch(()=>!1).then(()=>Jb()):Jb()).catch(Yb),ib()},{signal:ax.signal}),hb.canvas.addEventListener(`dblclick`,()=>{fb=!1,$.camera.clearViewOffset(),$.camera.fov=33,$.camera.updateProjectionMatrix(),cb.set(`hero`)},{signal:ax.signal}),ib();function sx(e,t){return Object.values(e.fixedPack(t).regions).flatMap(e=>[e.runtime.baseColor,e.runtime.normal,e.runtime.orm])}function cx(e){return[...r(e.manifest),e.manifest.mark,...sx(e,{body:`light`,handle:`light`,saucer:`light`})]}async function lx(e){if(!Vy||!Q||!pb||Xy||db)throw Error(`观察器尚未准备完成`);let t=Vy,n=structuredClone(jb.current),r={...Wy},i=Hy,a=Dy=new AbortController,s=jy;Ty=!0,jb.locked=!0,jb.cancelPending(),lb.cancelPending(),kb.cancelPending(),++Ey,clearTimeout(Qy),My?.abort(),Ny=``,By?.begin(),hb.canvas.dataset.ready=`false`;let c=Q.beginSwap(),l=[],d=[],p=!1,m=!1,h=!1,g=()=>{if(a.signal.aborted||Xy||db||s!==jy)throw new DOMException(`作品还原已取消`,`AbortError`)};try{let s=e?.resourceReleaseId,c=s===t.manifest.releaseId?t:await f(s,a.signal);g();let h=u(e,c.manifest),_={...n,variant:`v6-${h.cityId}-${h.appearance.preset}`,text:h.sloganId,appearance:h.appearance},v=c===t?r:{body:`light`,handle:`light`,saucer:`light`},y=Ry?`standard`:`detail`,b=t.cityPack(n,i).runtime,x=c.cityPack(_,y).runtime,S=[...sx(t,r),b.mask,b.normal,b.label.asset];l=await Q.acquireAll(S,a.signal),g();let C=[...sx(c,v),x.mask,x.normal,...o(c.manifest).map(e=>e.asset),c.manifest.mark];By?.plan(C),d=await Q.acquireAll(C,a.signal),g();for(let e of d)$.renderer.initTexture(e.texture);if(p=!0,!await kb.apply(c.fixedPack(v)))throw Error(`花纸未完整还原`);if(g(),!await Vb(c.cityPack(_,y)))throw Error(`城市与文字未完整还原`);g();let w=d.splice(11,6),T=d.splice(11,1)[0];return Kb?.release(),Kb=T,T.texture.anisotropy=Ob,T.texture.needsUpdate=!0,ob.mark.map=T.texture,ob.mark.needsUpdate=!0,Fy.forEach(e=>e.release()),Fy=w,Vy=c,Ay=Promise.resolve(c),Wy=v,Hy=y,Uy=h.cityId,Q.pinFiles(cx(c)),jb.commit(_),Bb(mb),m=!0,!0}catch(e){if(!Xy&&!db&&s===jy){if(p)try{if(!await kb.apply(t.fixedPack(r))||!await Vb(t.cityPack(n,i)))throw Error(`原作品恢复失败`)}catch{throw h=!0,pb=!1,ky=`原作品恢复失败，请重新加载`,By?.fail(ky),Error(ky)}Vy=t,Ay=Promise.resolve(t),Wy=r,Hy=i,Uy=n.variant.replace(/^v6-/,``).replace(/-(gold|red|green|purple|blue)$/,``),Q.pinFiles(cx(t)),jb.commit(n),hb.message(`还原未完成，已保留原作品`)}throw e}finally{l.forEach(e=>e.release()),d.forEach(e=>e.release()),c(),Ty=!1,jb.locked=!1,Dy=void 0,!h&&!Xy&&!db&&s===jy&&(Ab?.render(),By?.prepared(),ib(),ab(),Gb(),ex()),m&&(eb=``)}}if(Object.assign(window,{cupViewer:{ready:()=>hb.canvas.dataset.ready===`true`,whenReady:zy.whenReady,getLoadState:zy.get,onLoadStateChange:zy.subscribe,exportDesign:()=>{if(Ty||!Vy||!pb||jb.busy)throw Error(`作品尚未准备完成`);return s(jb.current,Vy.manifest)},importDesign:e=>{if(Ty)throw Error(`正在还原另一作品，请稍后重试`);return Oy=lx(e),Oy.finally(()=>{Oy=void 0})},onDesignChange:e=>(nb.add(e),()=>nb.delete(e)),capture:()=>(Xb.apply(),$.renderer.render($.scene,$.camera),Xb.restore(),hb.canvas.toDataURL(`image/png`)),applyCityArtwork:Vb,restore:()=>jb.restore(),selectArtwork:e=>jb.select(e),setView:(e,t=!1)=>{fb=!1,$.camera.clearViewOffset(),$.camera.fov=33,$.camera.updateProjectionMatrix(),cb.set(e,t)},setCalibration:e=>{cb.set(`hero`,!0),fb=!0,sb.cup.quaternion.setFromAxisAngle(new Y(0,1,0),(e.cupYaw??0)*Math.PI/180),sb.lid.quaternion.copy(sb.cup.quaternion),uy($.camera,e,hb.canvas.clientWidth,hb.canvas.clientHeight)},setAuto:e=>cb.setAuto(e),setRelief:zb,setLocalReflections:e=>Tb.setEnabled(e),refreshReflections:e=>Tb.refresh(e),setFixedRelief:Bb,setCityMetal:e=>{lb.setMetal(e),Rb()},setMode:e=>{ub=e,Rb()},setCamera:(e,t)=>{cb.set(`hero`,!0),cb.controls.dispatchEvent({type:`start`}),$.camera.position.fromArray(e),cb.controls.target.fromArray(t),cb.controls.update()},setPorcelainEnabled:e=>{Eb.forEach(t=>t.setEnabled(e)),Tb.refresh()},fixedPrecision:()=>kb.precision(),applyFixedArtwork:async e=>{let t=await kb.apply(e);return t&&(Tb.refresh(),Rb()),t},debug:()=>({version:g,profile:Zl,fixedMapping:kb.currentMapping,markFiltering:{anisotropy:ob.mark.map?.anisotropy},importing:Ty,preload:{neighborCity:Ny,neighborError:Py,readyCities:Vy?Object.values(Vy.manifest.cities).filter(e=>Q?.fileReady(e.levels.light.mask)&&Q.fileReady(e.levels.light.normal)).length:0,slogans:Fy.length},entryLoading:By?.debug(),loading:{pending:[...Cy],error:ky},quality:{cityTier:Hy,fixedTiers:Wy,mobile:Ry,upgrading:$y,error:eb,dpr:$.renderer.getPixelRatio(),renderFrames:Yy,contextLost:Xy},resources:Q?.debug(),renderTargets:$.memory(),glass:xb?.debug(),haptics:td.debug(),selection:{current:jb.current,desired:jb.desired,busy:jb.busy,error:jb.error},porcelain:iv,ready:hb.canvas.dataset.ready===`true`,view:cb.view,mode:ub,auto:cb.auto,camera:$.camera.position.toArray(),clipping:{near:$.camera.near,far:$.camera.far},target:cb.controls.target.toArray(),exposure:$.renderer.toneMappingExposure,background:gb.state(),environment:$.scene.environment?.uuid,parameters:sb.parameters,reflections:Tb.debug(),lidReflections:Db.debug(),bottomClearance:cb.bottomClearance(),geometries:[...Ib.keys()].map(e=>e.geometry.uuid),memory:{...$.renderer.info.memory,programs:$.renderer.info.programs?.length},city:lb.debug(),fixedFinish:{cleanGoldGround:ob.regions.saucer.userData.cleanGoldGround,enabled:mb,normalScale:ob.regions.saucer.normalScale.x,clearcoatNormalScale:ob.regions.saucer.clearcoatNormalScale.x,clearcoat:ob.regions.saucer.clearcoat,specularIntensity:ob.regions.saucer.specularIntensity},fixed:Object.fromEntries(Object.entries(kb.currentMaps).map(([e,t])=>[e,Object.fromEntries(Object.entries(t).map(([e,t])=>[e,t.uuid]))]))}),dispose:()=>{db||(db=!0,Dy?.abort(),++Ey,++jy,My?.abort(),Fy.forEach(e=>e.release()),Fy=[],ax.abort(),ox.disconnect(),clearTimeout(Qy),nb.clear(),cancelAnimationFrame(Gy),zy.dispose(),By?.dispose(),xb?.dispose(),gb.dispose(),Ab?.dispose(),xy(),td.dispose(),hb.dispose(),Db.dispose(),Tb.dispose(),lb.dispose(),kb.dispose(),Kb?.release(),Q?.dispose(),cb.dispose(),Lb.forEach(e=>e.dispose()),Sy(),sb.dispose(),Object.values(ob.regions).forEach(e=>e.dispose()),ob.porcelain.dispose(),ob.wallPorcelain.dispose(),ob.gold.dispose(),ob.foot.dispose(),ob.mark.map?.dispose(),ob.mark.dispose(),ob.city.dispose(),$.dispose())}}}),Zl===`dev`&&(xy=py()),document.documentElement.dataset.labPreview===`true`){let e;Object.assign(window.cupViewer,{applyLabArtwork:async e=>{if($y||jb.busy)throw Error(`请等待当前杯身准备完成`);return wy=!0,++Ey,clearTimeout(Qy),Vb(e)},setLabCoverageGuide:async(t,n=!0,r=`city`,i=!1)=>{if(!e){let{createCoverageGuide:t}=await Qd(async()=>{let{createCoverageGuide:e}=await import(`./coverage-guide-CXqE-pl-.js`);return{createCoverageGuide:e}},[]);e=t(sb,1-61.370293965961764/1783),Sy=e.dispose}return e.set(t,n,r,i),ib(),e.debug()}})}export{lf as a,zn as c,di as d,$r as f,uf as i,yi as l,_m as n,Vr as o,Y as p,df as r,kr as s,Sm as t,ji as u};