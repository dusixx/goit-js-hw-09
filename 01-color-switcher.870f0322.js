!function(){var e="undefined"!=typeof globalThis?globalThis:"undefined"!=typeof self?self:"undefined"!=typeof window?window:"undefined"!=typeof global?global:{},t={},r={},n=e.parcelRequire7bc7;null==n&&((n=function(e){if(e in t)return t[e].exports;if(e in r){var n=r[e];delete r[e];var d={id:e,exports:{}};return t[e]=d,n.call(d.exports,d,d.exports),d.exports}var o=new Error("Cannot find module '"+e+"'");throw o.code="MODULE_NOT_FOUND",o}).register=function(e,t){r[e]=t},e.parcelRequire7bc7=n);var d,o=n("1RLhk"),i=document.querySelector("[data-start]"),l=document.querySelector("[data-stop]");l.disabled=!0,i.addEventListener("click",(function(e){e.currentTarget.disabled=(l.disabled=!1,!0),d=setInterval((function(){return o.default.setBodyBgColor()}),1e3)})),l.addEventListener("click",(function(e){e.currentTarget.disabled=(i.disabled=!1,!0),clearInterval(d)}))}();
//# sourceMappingURL=01-color-switcher.870f0322.js.map
