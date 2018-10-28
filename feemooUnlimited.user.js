// ==UserScript==
// @name 飞猫云网盘取消10分钟限制
// @author H1d3r
// @namespace feemooUnlimited
// @description 飞猫云网盘取消10分钟限制
// @require https://cdn.bootcss.com/jquery/3.3.1/jquery.min.js
// @require https://cdn.bootcss.com/jquery-cookie/1.4.1/jquery.cookie.min.js
// @include http://www.ccchoo.com/down*.html
// @match https://*.feemoo.com/fmdown*
// @match https://*.feemoo.com/s/*
// @version                1.0
// ==/UserScript==


var cookies =["down_file_log","fmcheck","__cfduid","PHPSESSID"]
for(var i = 0 ; i < cookies.length; i++){
    //console.log("Cookies:\t"+cookies[i]+":"+$.cookie(cookies[i]));
    $.cookie(cookies[i],null,{
    expires:-1,
    path:'/',
    domain:'.feemoo.com',
    secure:true
});
    $.removeCookie(cookies[i],{ path: '/'});
}
