/*uJwt*/"use strict";function _interopDefault(a){return a&&"object"==typeof a&&"default"in a?a["default"]:a}var Crypto=_interopDefault(require("crypto"));function Base64urlEncode(a){return new Buffer.from(a).toString("base64").replace(/\+/g,"-").replace(/\//g,"_").replace(/=/g,"")}function OctetFromClaims(a){const b=[];for(let c=0,d=a.length;c<d;c++){const d=a.charCodeAt(c);b.push(255&d)}return b}function Base64Claims(a){return Base64urlEncode(a)}function CreateJOSEbody(a){const b=OctetFromClaims(a);return Base64urlEncode(b)}function Sign(a,b,c,d=!1){function e(a){return a.replace(/\+/g,"-").replace(/\//g,"_")}let f="";switch(a){case"sha256":{f="HS256";break}default:{f="HS256";break}}let g=b;d&&(g=Buffer.from(b,"base64"));const h=`{"typ":"JWT",\r\n "alg":"${f}"}`,i=CreateJOSEbody(h),j=CreateJOSEbody(JSON.stringify(c));let k=Crypto.createHmac("sha256",g).update(`${i}.${j}`).digest("base64");return`${i}.${j}.${e(k)}`}function Verify(a,b,c=!1){const d=b.split("."),e=Buffer.from(d[1],"base64").toString("ascii"),f=d[2],g=d[0];let h=a;c&&(h=Buffer.from(a,"base64"));const i=Crypto.createHmac("sha256",h).update(`${d[0]}.${d[1]}`).digest("base64"),j=Buffer.from(i,"base64"),k=Buffer.from(f,"base64"),l=Crypto.timingSafeEqual(j,k);if(l)return e;throw new Error("Could not verify signature")}var JWT={Sign,Verify,OctetFromClaims,Base64Claims},index={Sign:JWT.Sign,Verify:JWT.Verify};module.exports=index;
