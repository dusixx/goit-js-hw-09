var e="undefined"!=typeof globalThis?globalThis:"undefined"!=typeof self?self:"undefined"!=typeof window?window:"undefined"!=typeof global?global:{},t={},r={},n=e.parcelRequire7bc7;null==n&&((n=function(e){if(e in t)return t[e].exports;if(e in r){var n=r[e];delete r[e];var d={id:e,exports:{}};return t[e]=d,n.call(d.exports,d,d.exports),d.exports}var l=new Error("Cannot find module '"+e+"'");throw l.code="MODULE_NOT_FOUND",l}).register=function(e,t){r[e]=t},e.parcelRequire7bc7=n);var d=n("lQVoc");const l=document.querySelector("[data-start]"),o=document.querySelector("[data-stop]");let a;o.disabled=!0,l.addEventListener("click",(function({currentTarget:e}){e.disabled=(o.disabled=!1,!0),a=setInterval((()=>d.default.setBodyBgColor()),1e3)})),o.addEventListener("click",(function({currentTarget:e}){e.disabled=(l.disabled=!1,!0),clearInterval(a)}));
//# sourceMappingURL=01-color-switcher.09fd23e4.js.map
