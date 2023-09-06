// ==UserScript==
// @name        FruadCredit
// @author      H1d3r
// @namespace   CreditScripts
// @match       *://*.xyz/*
// @include     *://*.xyz/*
// @grant       none
// @version     1.0
// @run-at      document-start
// @grant       GM.getValue
// @grant       GM.setValue
// @grant       GM_addValueChangeListener
// @grant       GM_removeValueChangeListener
// @grant       GM_addElement
// @description 9/6/2023, 4:16:11 PM
// ==/UserScript==
//document.body.appendChild(document.createElement('script')).src='https://code.jquery.com/jquery-1.9.1.min.js';
;(() => {
  "use strict"
Object.defineProperty(navigator, "platform", {
    get: function () {
        return "iPhone";
    }
});
console.log(navigator.platform);
})();
