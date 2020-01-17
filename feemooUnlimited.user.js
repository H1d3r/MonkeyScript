// ==UserScript==
// @name 飞猫云网盘、巴士云取消10分钟限制
// @author H1d3r
// @namespace feemooUnlimited
// @description 飞猫云、巴士云网盘取消10分钟限制
// @require https://cdn.bootcss.com/jquery/3.3.1/jquery.min.js
// @require https://cdn.bootcss.com/jquery-cookie/1.4.1/jquery.cookie.min.js
// @include http://www.ccchoo.com/down*.html
// @match https://*.feemoo.com/fmdown*
// @match https://*.feemoo.com/s/*
// @match http://www.tadaigou.com/*
// @match http://www.ibuspan.com/*
// @updateURL https://github.com/H1d3r/MonkeyScript/raw/master/feemooUnlimited.user.js
// @version                1.0
// ==/UserScript==


(function(root, factory) {
  if (typeof define === "function" && define.amd) {
    define([], factory);
  } else if (typeof module === "object" && module.exports) {
    module.exports = factory();
  } else {
    root.Base = factory();
  }
}(this, function() {
   'use strict';
   
    function Base64() {
        // private property
        this._keyStr = "ABCDEFGHIJKLMNOPQRSTUVWXYZabcdefghijklmnopqrstuvwxyz0123456789+/=";
    }
    //public method for encoding
    Base64.prototype.encode = function (input) {
        var output = "", chr1, chr2, chr3, enc1, enc2, enc3, enc4, i = 0;
        input = this._utf8_encode(input);
        while (i < input.length) {
            chr1 = input.charCodeAt(i++);
            chr2 = input.charCodeAt(i++);
            chr3 = input.charCodeAt(i++);
            enc1 = chr1 >> 2;
            enc2 = ((chr1 & 3) << 4) | (chr2 >> 4);
            enc3 = ((chr2 & 15) << 2) | (chr3 >> 6);
            enc4 = chr3 & 63;
            if (isNaN(chr2)) {
                enc3 = enc4 = 64;
            } else if (isNaN(chr3)) {
                enc4 = 64;
            }
            output = output +
            this._keyStr.charAt(enc1) + this._keyStr.charAt(enc2) +
            this._keyStr.charAt(enc3) + this._keyStr.charAt(enc4);
        }
        return output;
    }

    // public method for decoding
    Base64.prototype.decode = function (input) {
        var output = "", chr1, chr2, chr3, enc1, enc2, enc3, enc4, i = 0;
        input = input.replace(/[^A-Za-z0-9\+\/\=]/g, "");
        while (i < input.length) {
            enc1 = this._keyStr.indexOf(input.charAt(i++));
            enc2 = this._keyStr.indexOf(input.charAt(i++));
            enc3 = this._keyStr.indexOf(input.charAt(i++));
            enc4 = this._keyStr.indexOf(input.charAt(i++));
            chr1 = (enc1 << 2) | (enc2 >> 4);
            chr2 = ((enc2 & 15) << 4) | (enc3 >> 2);
            chr3 = ((enc3 & 3) << 6) | enc4;
            output = output + String.fromCharCode(chr1);
            if (enc3 != 64) {
                output = output + String.fromCharCode(chr2);
            }
            if (enc4 != 64) {
                output = output + String.fromCharCode(chr3);
            }
        }
        output = this._utf8_decode(output);
        return output;
    }

    // private method for UTF-8 encoding
    Base64.prototype._utf8_encode = function (string) {
        string = string.replace(/\r\n/g,"\n");
        var utftext = "";
        for (var n = 0; n < string.length; n++) {
            var c = string.charCodeAt(n);
            if (c < 128) {
                utftext += String.fromCharCode(c);
            } else if((c > 127) && (c < 2048)) {
                utftext += String.fromCharCode((c >> 6) | 192);
                utftext += String.fromCharCode((c & 63) | 128);
            } else {
                utftext += String.fromCharCode((c >> 12) | 224);
                utftext += String.fromCharCode(((c >> 6) & 63) | 128);
                utftext += String.fromCharCode((c & 63) | 128);
            }
    
        }
        return utftext;
    }

    // private method for UTF-8 decoding
    Base64.prototype._utf8_decode = function (utftext) {
        var string = "", i = 0, c = 0, c1 = 0, c2 = 0, c3 = 0;
        while ( i < utftext.length ) {
            c = utftext.charCodeAt(i);
            if (c < 128) {
                string += String.fromCharCode(c);
                i++;
            } else if((c > 191) && (c < 224)) {
                c2 = utftext.charCodeAt(i+1);
                string += String.fromCharCode(((c & 31) << 6) | (c2 & 63));
                i += 2;
            } else {
                c2 = utftext.charCodeAt(i+1);
                c3 = utftext.charCodeAt(i+2);
                string += String.fromCharCode(((c & 15) << 12) | ((c2 & 63) << 6) | (c3 & 63));
                i += 3;
            }
        }
        return string;
    }
    
    var Base = new Base64();
    
    return Base;
}));


if(location.toString().indexOf("www.tadaigou.com") <= -1)
{ 
layer.closeAll();
var cookies =["down_file_log","view_stat","fmcheck","__cfduid","PHPSESSID"]
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
var url=window.location.href;
if (url.indexOf("/s/")>=0){
  
layer.closeAll();
}
}
else{
  var cookies =["down_file_log","user_down_log","down_file_log","view_stat"]
  for(var i = 0 ; i < cookies.length; i++){
    //console.log("Cookies:\t"+cookies[i]+":"+$.cookie(cookies[i]));
    $.cookie(cookies[i],null,{
    expires:-1,
    path:'/',
    domain:'www.tadaigou.com',
    secure:true
});
    $.removeCookie(cookies[i],{ path: '/'});
}
  var pathname=location.pathname;
  pathname=pathname.replace("/down/","").replace(".html","");
  debase64=Base.decode(pathname);
  dfile_id=debase64.replace("AA","");
  console.log(Base.decode(pathname));
  
  
    setTimeout(function(){
    var pageCover=document.getElementById('pageCover');
    var dlg=document.getElementById('dlgTest');
    pageCover.style.display='none';
    dlg.style.display='none';
    pageCover=null;
    dlg=null;
    $('.down_box_tips').hide();$('.down_box').fadeIn();document.getElementById('down_link').style.display='none';
    },1000);
    $('.down_box_tips').hide();$('.down_box').fadeIn();document.getElementById('down_link').style.display='none';
    document.getElementById('down_link').style.display='none';
    document.getElementById('addr_list0').style.display='block';
    load_down_addr1(dfile_id,0)


}
