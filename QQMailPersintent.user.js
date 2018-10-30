// ==UserScript==
// @name QQMail Persintent
// @author H1d3r
// @namespace QQmail
// @match *://mail.qq.com/*
// @include https://mail.qq.com/*
// @include https://mail.qq.com/cgi-bin/frame_html*
// @grant GM_xmlhttpRequest
// ==/UserScript==

console.log("Loadding QQmail Script");
setInterval(function(){GM_xmlhttpRequest({
    method: "GET",
    url: "https://wp.mail.qq.com/ajax_proxy.html?mail.qq.com&v=110702",
    onload: function(response) {
       console.log(response.status));
    },
    onerror:function(){console.log(new Date().toLocaleString()+"\tRun Err!");}
  });},1*2*1000);

setInterval(function(){
var mailurl = 'https://wp.mail.qq.com/ajax_proxy.html?mail.qq.com&v=110702';
fetch(mailurl, {credentials: 'include'}
).then(function (response) {
  console.log(response.status);
}
)},1*60*1000);
