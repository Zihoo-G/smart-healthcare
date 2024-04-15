/*------------------------------------*\
     Plugins - Table of contents
 \*------------------------------------*/
/*
- anime.js
- Jarallax
- jQuery Easing
 - isotope
 - chocolat
*/

/*
 anime.js
 2017 Julian Garnier
 Released under the MIT license
*/
var $jscomp$this = this;
(function (v, p) { "function" === typeof define && define.amd ? define([], p) : "object" === typeof module && module.exports ? module.exports = p() : v.anime = p() })(this, function () {
  function v(a) { if (!g.col(a)) try { return document.querySelectorAll(a) } catch (b) { } } function p(a) { return a.reduce(function (a, d) { return a.concat(g.arr(d) ? p(d) : d) }, []) } function w(a) { if (g.arr(a)) return a; g.str(a) && (a = v(a) || a); return a instanceof NodeList || a instanceof HTMLCollection ? [].slice.call(a) : [a] } function F(a, b) { return a.some(function (a) { return a === b }) }
  function A(a) { var b = {}, d; for (d in a) b[d] = a[d]; return b } function G(a, b) { var d = A(a), c; for (c in a) d[c] = b.hasOwnProperty(c) ? b[c] : a[c]; return d } function B(a, b) { var d = A(a), c; for (c in b) d[c] = g.und(a[c]) ? b[c] : a[c]; return d } function S(a) { a = a.replace(/^#?([a-f\d])([a-f\d])([a-f\d])$/i, function (a, b, d, h) { return b + b + d + d + h + h }); var b = /^#?([a-f\d]{2})([a-f\d]{2})([a-f\d]{2})$/i.exec(a); a = parseInt(b[1], 16); var d = parseInt(b[2], 16), b = parseInt(b[3], 16); return "rgb(" + a + "," + d + "," + b + ")" } function T(a) {
    function b(a, b, c) {
      0 >
      c && (c += 1); 1 < c && --c; return c < 1 / 6 ? a + 6 * (b - a) * c : .5 > c ? b : c < 2 / 3 ? a + (b - a) * (2 / 3 - c) * 6 : a
    } var d = /hsl\((\d+),\s*([\d.]+)%,\s*([\d.]+)%\)/g.exec(a); a = parseInt(d[1]) / 360; var c = parseInt(d[2]) / 100, d = parseInt(d[3]) / 100; if (0 == c) c = d = a = d; else { var e = .5 > d ? d * (1 + c) : d + c - d * c, l = 2 * d - e, c = b(l, e, a + 1 / 3), d = b(l, e, a); a = b(l, e, a - 1 / 3) } return "rgb(" + 255 * c + "," + 255 * d + "," + 255 * a + ")"
  } function x(a) { if (a = /([\+\-]?[0-9#\.]+)(%|px|pt|em|rem|in|cm|mm|ex|pc|vw|vh|deg|rad|turn)?/.exec(a)) return a[2] } function U(a) {
    if (-1 < a.indexOf("translate")) return "px";
    if (-1 < a.indexOf("rotate") || -1 < a.indexOf("skew")) return "deg"
  } function H(a, b) { return g.fnc(a) ? a(b.target, b.id, b.total) : a } function C(a, b) { if (b in a.style) return getComputedStyle(a).getPropertyValue(b.replace(/([a-z])([A-Z])/g, "$1-$2").toLowerCase()) || "0" } function I(a, b) { if (g.dom(a) && F(V, b)) return "transform"; if (g.dom(a) && (a.getAttribute(b) || g.svg(a) && a[b])) return "attribute"; if (g.dom(a) && "transform" !== b && C(a, b)) return "css"; if (null != a[b]) return "object" } function W(a, b) {
    var d = U(b), d = -1 < b.indexOf("scale") ?
      1 : 0 + d; a = a.style.transform; if (!a) return d; for (var c = [], e = [], l = [], h = /(\w+)\((.+?)\)/g; c = h.exec(a);)e.push(c[1]), l.push(c[2]); a = l.filter(function (a, c) { return e[c] === b }); return a.length ? a[0] : d
  } function J(a, b) { switch (I(a, b)) { case "transform": return W(a, b); case "css": return C(a, b); case "attribute": return a.getAttribute(b) }return a[b] || 0 } function K(a, b) {
    var d = /^(\*=|\+=|-=)/.exec(a); if (!d) return a; b = parseFloat(b); a = parseFloat(a.replace(d[0], "")); switch (d[0][0]) {
      case "+": return b + a; case "-": return b - a; case "*": return b *
        a
    }
  } function D(a) { return g.obj(a) && a.hasOwnProperty("totalLength") } function X(a, b) { function d(c) { c = void 0 === c ? 0 : c; return a.el.getPointAtLength(1 <= b + c ? b + c : 0) } var c = d(), e = d(-1), l = d(1); switch (a.property) { case "x": return c.x; case "y": return c.y; case "angle": return 180 * Math.atan2(l.y - e.y, l.x - e.x) / Math.PI } } function L(a, b) {
    var d = /-?\d*\.?\d+/g; a = D(a) ? a.totalLength : a; if (g.col(a)) b = g.rgb(a) ? a : g.hex(a) ? S(a) : g.hsl(a) ? T(a) : void 0; else { var c = x(a); a = c ? a.substr(0, a.length - c.length) : a; b = b ? a + b : a } b += ""; return {
      original: b,
      numbers: b.match(d) ? b.match(d).map(Number) : [0], strings: b.split(d)
    }
  } function Y(a, b) { return b.reduce(function (b, c, e) { return b + a[e - 1] + c }) } function M(a) { return (a ? p(g.arr(a) ? a.map(w) : w(a)) : []).filter(function (a, d, c) { return c.indexOf(a) === d }) } function Z(a) { var b = M(a); return b.map(function (a, c) { return { target: a, id: c, total: b.length } }) } function aa(a, b) {
    var d = A(b); if (g.arr(a)) { var c = a.length; 2 !== c || g.obj(a[0]) ? g.fnc(b.duration) || (d.duration = b.duration / c) : a = { value: a } } return w(a).map(function (a, c) {
      c = c ? 0 : b.delay;
      a = g.obj(a) && !D(a) ? a : { value: a }; g.und(a.delay) && (a.delay = c); return a
    }).map(function (a) { return B(a, d) })
  } function ba(a, b) { var d = {}, c; for (c in a) { var e = H(a[c], b); g.arr(e) && (e = e.map(function (a) { return H(a, b) }), 1 === e.length && (e = e[0])); d[c] = e } d.duration = parseFloat(d.duration); d.delay = parseFloat(d.delay); return d } function ca(a) { return g.arr(a) ? y.apply(this, a) : N[a] } function da(a, b) {
    var d; return a.tweens.map(function (c) {
      c = ba(c, b); var e = c.value, l = J(b.target, a.name), h = d ? d.to.original : l, h = g.arr(e) ? e[0] : h, m = K(g.arr(e) ?
        e[1] : e, h), l = x(m) || x(h) || x(l); c.isPath = D(e); c.from = L(h, l); c.to = L(m, l); c.start = d ? d.end : a.offset; c.end = c.start + c.delay + c.duration; c.easing = ca(c.easing); c.elasticity = (1E3 - Math.min(Math.max(c.elasticity, 1), 999)) / 1E3; g.col(c.from.original) && (c.round = 1); return d = c
    })
  } function ea(a, b) { return p(a.map(function (a) { return b.map(function (b) { var c = I(a.target, b.name); if (c) { var d = da(b, a); b = { type: c, property: b.name, animatable: a, tweens: d, duration: d[d.length - 1].end, delay: d[0].delay } } else b = void 0; return b }) })).filter(function (a) { return !g.und(a) }) }
  function O(a, b, d) { var c = "delay" === a ? Math.min : Math.max; return b.length ? c.apply(Math, b.map(function (b) { return b[a] })) : d[a] } function fa(a) { var b = G(ga, a), d = G(ha, a), c = Z(a.targets), e = [], g = B(b, d), h; for (h in a) g.hasOwnProperty(h) || "targets" === h || e.push({ name: h, offset: g.offset, tweens: aa(a[h], d) }); a = ea(c, e); return B(b, { children: [], animatables: c, animations: a, duration: O("duration", a, d), delay: O("delay", a, d) }) } function n(a) {
    function b() { return window.Promise && new Promise(function (a) { return Q = a }) } function d(a) {
      return f.reversed ?
        f.duration - a : a
    } function c(a) {
      for (var b = 0, c = {}, d = f.animations, e = {}; b < d.length;) {
        var g = d[b], h = g.animatable, m = g.tweens; e.tween = m.filter(function (b) { return a < b.end })[0] || m[m.length - 1]; e.isPath$1 = e.tween.isPath; e.round = e.tween.round; e.eased = e.tween.easing(Math.min(Math.max(a - e.tween.start - e.tween.delay, 0), e.tween.duration) / e.tween.duration, e.tween.elasticity); m = Y(e.tween.to.numbers.map(function (a) {
          return function (b, c) {
            c = a.isPath$1 ? 0 : a.tween.from.numbers[c]; b = c + a.eased * (b - c); a.isPath$1 && (b = X(a.tween.value,
              b)); a.round && (b = Math.round(b * a.round) / a.round); return b
          }
        }(e)), e.tween.to.strings); ia[g.type](h.target, g.property, m, c, h.id); g.currentValue = m; b++; e = { isPath$1: e.isPath$1, tween: e.tween, eased: e.eased, round: e.round }
      } if (c) for (var k in c) E || (E = C(document.body, "transform") ? "transform" : "-webkit-transform"), f.animatables[k].target.style[E] = c[k].join(" "); f.currentTime = a; f.progress = a / f.duration * 100
    } function e(a) { if (f[a]) f[a](f) } function g() { f.remaining && !0 !== f.remaining && f.remaining-- } function h(a) {
      var h = f.duration,
      l = f.offset, n = f.delay, P = f.currentTime, q = f.reversed, r = d(a), r = Math.min(Math.max(r, 0), h); if (f.children) { var p = f.children; if (r >= f.currentTime) for (var u = 0; u < p.length; u++)p[u].seek(r); else for (u = p.length; u--;)p[u].seek(r) } r > l && r < h ? (c(r), !f.began && r >= n && (f.began = !0, e("begin")), e("run")) : (r <= l && 0 !== P && (c(0), q && g()), r >= h && P !== h && (c(h), q || g())); a >= h && (f.remaining ? (t = m, "alternate" === f.direction && (f.reversed = !f.reversed)) : (f.pause(), "Promise" in window && (Q(), R = b()), f.completed || (f.completed = !0, e("complete"))),
        k = 0); e("update")
    } a = void 0 === a ? {} : a; var m, t, k = 0, Q = null, R = b(), f = fa(a); f.reset = function () { var a = f.direction, b = f.loop; f.currentTime = 0; f.progress = 0; f.paused = !0; f.began = !1; f.completed = !1; f.reversed = "reverse" === a; f.remaining = "alternate" === a && 1 === b ? 2 : b; for (a = f.children.length; a--;)b = f.children[a], b.seek(b.offset), b.reset() }; f.tick = function (a) { m = a; t || (t = m); h((k + m - t) * n.speed) }; f.seek = function (a) { h(d(a)) }; f.pause = function () { var a = q.indexOf(f); -1 < a && q.splice(a, 1); f.paused = !0 }; f.play = function () {
      f.paused && (f.paused =
        !1, t = 0, k = d(f.currentTime), q.push(f), z || ja())
    }; f.reverse = function () { f.reversed = !f.reversed; t = 0; k = d(f.currentTime) }; f.restart = function () { f.pause(); f.reset(); f.play() }; f.finished = R; f.reset(); f.autoplay && f.play(); return f
  } var ga = { update: void 0, begin: void 0, run: void 0, complete: void 0, loop: 1, direction: "normal", autoplay: !0, offset: 0 }, ha = { duration: 1E3, delay: 0, easing: "easeOutElastic", elasticity: 500, round: 0 }, V = "translateX translateY translateZ rotate rotateX rotateY rotateZ scale scaleX scaleY scaleZ skewX skewY".split(" "),
    E, g = {
      arr: function (a) { return Array.isArray(a) }, obj: function (a) { return -1 < Object.prototype.toString.call(a).indexOf("Object") }, svg: function (a) { return a instanceof SVGElement }, dom: function (a) { return a.nodeType || g.svg(a) }, str: function (a) { return "string" === typeof a }, fnc: function (a) { return "function" === typeof a }, und: function (a) { return "undefined" === typeof a }, hex: function (a) { return /(^#[0-9A-F]{6}$)|(^#[0-9A-F]{3}$)/i.test(a) }, rgb: function (a) { return /^rgb/.test(a) }, hsl: function (a) { return /^hsl/.test(a) }, col: function (a) {
        return g.hex(a) ||
          g.rgb(a) || g.hsl(a)
      }
    }, y = function () {
      function a(a, d, c) { return (((1 - 3 * c + 3 * d) * a + (3 * c - 6 * d)) * a + 3 * d) * a } return function (b, d, c, e) {
        if (0 <= b && 1 >= b && 0 <= c && 1 >= c) {
          var g = new Float32Array(11); if (b !== d || c !== e) for (var h = 0; 11 > h; ++h)g[h] = a(.1 * h, b, c); return function (h) {
            if (b === d && c === e) return h; if (0 === h) return 0; if (1 === h) return 1; for (var m = 0, k = 1; 10 !== k && g[k] <= h; ++k)m += .1; --k; var k = m + (h - g[k]) / (g[k + 1] - g[k]) * .1, l = 3 * (1 - 3 * c + 3 * b) * k * k + 2 * (3 * c - 6 * b) * k + 3 * b; if (.001 <= l) {
              for (m = 0; 4 > m; ++m) {
                l = 3 * (1 - 3 * c + 3 * b) * k * k + 2 * (3 * c - 6 * b) * k + 3 * b; if (0 === l) break;
                var n = a(k, b, c) - h, k = k - n / l
              } h = k
            } else if (0 === l) h = k; else { var k = m, m = m + .1, f = 0; do n = k + (m - k) / 2, l = a(n, b, c) - h, 0 < l ? m = n : k = n; while (1e-7 < Math.abs(l) && 10 > ++f); h = n } return a(h, d, e)
          }
        }
      }
    }(), N = function () {
      function a(a, b) { return 0 === a || 1 === a ? a : -Math.pow(2, 10 * (a - 1)) * Math.sin(2 * (a - 1 - b / (2 * Math.PI) * Math.asin(1)) * Math.PI / b) } var b = "Quad Cubic Quart Quint Sine Expo Circ Back Elastic".split(" "), d = {
        In: [[.55, .085, .68, .53], [.55, .055, .675, .19], [.895, .03, .685, .22], [.755, .05, .855, .06], [.47, 0, .745, .715], [.95, .05, .795, .035], [.6, .04, .98,
          .335], [.6, -.28, .735, .045], a], Out: [[.25, .46, .45, .94], [.215, .61, .355, 1], [.165, .84, .44, 1], [.23, 1, .32, 1], [.39, .575, .565, 1], [.19, 1, .22, 1], [.075, .82, .165, 1], [.175, .885, .32, 1.275], function (b, c) { return 1 - a(1 - b, c) }], InOut: [[.455, .03, .515, .955], [.645, .045, .355, 1], [.77, 0, .175, 1], [.86, 0, .07, 1], [.445, .05, .55, .95], [1, 0, 0, 1], [.785, .135, .15, .86], [.68, -.55, .265, 1.55], function (b, c) { return .5 > b ? a(2 * b, c) / 2 : 1 - a(-2 * b + 2, c) / 2 }]
      }, c = { linear: y(.25, .25, .75, .75) }, e = {}, l; for (l in d) e.type = l, d[e.type].forEach(function (a) {
        return function (d,
          e) { c["ease" + a.type + b[e]] = g.fnc(d) ? d : y.apply($jscomp$this, d) }
      }(e)), e = { type: e.type }; return c
    }(), ia = { css: function (a, b, d) { return a.style[b] = d }, attribute: function (a, b, d) { return a.setAttribute(b, d) }, object: function (a, b, d) { return a[b] = d }, transform: function (a, b, d, c, e) { c[e] || (c[e] = []); c[e].push(b + "(" + d + ")") } }, q = [], z = 0, ja = function () { function a() { z = requestAnimationFrame(b) } function b(b) { var c = q.length; if (c) { for (var d = 0; d < c;)q[d] && q[d].tick(b), d++; a() } else cancelAnimationFrame(z), z = 0 } return a }(); n.version = "2.0.2";
  n.speed = 1; n.running = q; n.remove = function (a) { a = M(a); for (var b = q.length; b--;)for (var d = q[b], c = d.animations, e = c.length; e--;)F(a, c[e].animatable.target) && (c.splice(e, 1), c.length || d.pause()) }; n.getValue = J; n.path = function (a, b) { var d = g.str(a) ? v(a)[0] : a, c = b || 100; return function (a) { return { el: d, property: a, totalLength: d.getTotalLength() * (c / 100) } } }; n.setDashoffset = function (a) { var b = a.getTotalLength(); a.setAttribute("stroke-dasharray", b); return b }; n.bezier = y; n.easings = N; n.timeline = function (a) {
    var b = n(a); b.pause();
    b.duration = 0; b.add = function (a) { b.children.forEach(function (a) { a.began = !0; a.completed = !0 }); w(a).forEach(function (a) { var c = b.duration, d = a.offset; a.autoplay = !1; a.offset = g.und(d) ? c : K(d, c); b.seek(a.offset); a = n(a); a.duration > c && (b.duration = a.duration); a.began = !0; b.children.push(a) }); b.reset(); b.seek(0); b.autoplay && b.restart(); return b }; return b
  }; n.random = function (a, b) { return Math.floor(Math.random() * (b - a + 1)) + a }; return n
});

/*!
 * Jarallax v2.0.2 (https://github.com/nk-o/jarallax)
 * Copyright 2022 nK <https://nkdev.info>
 * Licensed under MIT (https://github.com/nk-o/jarallax/blob/master/LICENSE)
 */
!function (e, t) { "object" == typeof exports && "undefined" != typeof module ? module.exports = t() : "function" == typeof define && define.amd ? define(t) : (e = "undefined" != typeof globalThis ? globalThis : e || self).jarallax = t() }(this, (function () { "use strict"; function e(e) { "complete" === document.readyState || "interactive" === document.readyState ? e() : document.addEventListener("DOMContentLoaded", e, { capture: !0, once: !0, passive: !0 }) } let t; t = "undefined" != typeof window ? window : "undefined" != typeof global ? global : "undefined" != typeof self ? self : {}; var i = t; const { navigator: o } = i, n = /Android|webOS|iPhone|iPad|iPod|BlackBerry|IEMobile|Opera Mini/i.test(o.userAgent); let a, s; function l() { n ? (!a && document.body && (a = document.createElement("div"), a.style.cssText = "position: fixed; top: -9999px; left: 0; height: 100vh; width: 0;", document.body.appendChild(a)), s = (a ? a.clientHeight : 0) || i.innerHeight || document.documentElement.clientHeight) : s = i.innerHeight || document.documentElement.clientHeight } l(), i.addEventListener("resize", l), i.addEventListener("orientationchange", l), i.addEventListener("load", l), e((() => { l() })); const r = []; function m() { r.length && (r.forEach(((e, t) => { const { instance: o, oldData: n } = e, a = o.$item.getBoundingClientRect(), l = { width: a.width, height: a.height, top: a.top, bottom: a.bottom, wndW: i.innerWidth, wndH: s }, m = !n || n.wndW !== l.wndW || n.wndH !== l.wndH || n.width !== l.width || n.height !== l.height, c = m || !n || n.top !== l.top || n.bottom !== l.bottom; r[t].oldData = l, m && o.onResize(), c && o.onScroll() })), i.requestAnimationFrame(m)) } let c = 0; class p { constructor(e, t) { const i = this; i.instanceID = c, c += 1, i.$item = e, i.defaults = { type: "scroll", speed: .5, imgSrc: null, imgElement: ".jarallax-img", imgSize: "cover", imgPosition: "50% 50%", imgRepeat: "no-repeat", keepImg: !1, elementInViewport: null, zIndex: -100, disableParallax: !1, disableVideo: !1, videoSrc: null, videoStartTime: 0, videoEndTime: 0, videoVolume: 0, videoLoop: !0, videoPlayOnlyVisible: !0, videoLazyLoading: !0, onScroll: null, onInit: null, onDestroy: null, onCoverImage: null }; const n = i.$item.dataset || {}, a = {}; if (Object.keys(n).forEach((e => { const t = e.substr(0, 1).toLowerCase() + e.substr(1); t && void 0 !== i.defaults[t] && (a[t] = n[e]) })), i.options = i.extend({}, i.defaults, a, t), i.pureOptions = i.extend({}, i.options), Object.keys(i.options).forEach((e => { "true" === i.options[e] ? i.options[e] = !0 : "false" === i.options[e] && (i.options[e] = !1) })), i.options.speed = Math.min(2, Math.max(-1, parseFloat(i.options.speed))), "string" == typeof i.options.disableParallax && (i.options.disableParallax = new RegExp(i.options.disableParallax)), i.options.disableParallax instanceof RegExp) { const e = i.options.disableParallax; i.options.disableParallax = () => e.test(o.userAgent) } if ("function" != typeof i.options.disableParallax && (i.options.disableParallax = () => !1), "string" == typeof i.options.disableVideo && (i.options.disableVideo = new RegExp(i.options.disableVideo)), i.options.disableVideo instanceof RegExp) { const e = i.options.disableVideo; i.options.disableVideo = () => e.test(o.userAgent) } "function" != typeof i.options.disableVideo && (i.options.disableVideo = () => !1); let s = i.options.elementInViewport; s && "object" == typeof s && void 0 !== s.length && ([s] = s), s instanceof Element || (s = null), i.options.elementInViewport = s, i.image = { src: i.options.imgSrc || null, $container: null, useImgTag: !1, position: "fixed" }, i.initImg() && i.canInitParallax() && i.init() } css(e, t) { return "string" == typeof t ? i.getComputedStyle(e).getPropertyValue(t) : (Object.keys(t).forEach((i => { e.style[i] = t[i] })), e) } extend(e, ...t) { return e = e || {}, Object.keys(t).forEach((i => { t[i] && Object.keys(t[i]).forEach((o => { e[o] = t[i][o] })) })), e } getWindowData() { return { width: i.innerWidth || document.documentElement.clientWidth, height: s, y: document.documentElement.scrollTop } } initImg() { const e = this; let t = e.options.imgElement; return t && "string" == typeof t && (t = e.$item.querySelector(t)), t instanceof Element || (e.options.imgSrc ? (t = new Image, t.src = e.options.imgSrc) : t = null), t && (e.options.keepImg ? e.image.$item = t.cloneNode(!0) : (e.image.$item = t, e.image.$itemParent = t.parentNode), e.image.useImgTag = !0), !!e.image.$item || (null === e.image.src && (e.image.src = "data:image/gif;base64,R0lGODlhAQABAIAAAAAAAP///yH5BAEAAAAALAAAAAABAAEAAAIBRAA7", e.image.bgImage = e.css(e.$item, "background-image")), !(!e.image.bgImage || "none" === e.image.bgImage)) } canInitParallax() { return !this.options.disableParallax() } init() { const e = this, t = { position: "absolute", top: 0, left: 0, width: "100%", height: "100%", overflow: "hidden" }; let o = { pointerEvents: "none", transformStyle: "preserve-3d", backfaceVisibility: "hidden", willChange: "transform,opacity" }; if (!e.options.keepImg) { const t = e.$item.getAttribute("style"); if (t && e.$item.setAttribute("data-jarallax-original-styles", t), e.image.useImgTag) { const t = e.image.$item.getAttribute("style"); t && e.image.$item.setAttribute("data-jarallax-original-styles", t) } } if ("static" === e.css(e.$item, "position") && e.css(e.$item, { position: "relative" }), "auto" === e.css(e.$item, "z-index") && e.css(e.$item, { zIndex: 0 }), e.image.$container = document.createElement("div"), e.css(e.image.$container, t), e.css(e.image.$container, { "z-index": e.options.zIndex }), "fixed" === this.image.position && e.css(e.image.$container, { "-webkit-clip-path": "polygon(0 0, 100% 0, 100% 100%, 0 100%)", "clip-path": "polygon(0 0, 100% 0, 100% 100%, 0 100%)" }), e.image.$container.setAttribute("id", `jarallax-container-${e.instanceID}`), e.$item.appendChild(e.image.$container), e.image.useImgTag ? o = e.extend({ "object-fit": e.options.imgSize, "object-position": e.options.imgPosition, "max-width": "none" }, t, o) : (e.image.$item = document.createElement("div"), e.image.src && (o = e.extend({ "background-position": e.options.imgPosition, "background-size": e.options.imgSize, "background-repeat": e.options.imgRepeat, "background-image": e.image.bgImage || `url("${e.image.src}")` }, t, o))), "opacity" !== e.options.type && "scale" !== e.options.type && "scale-opacity" !== e.options.type && 1 !== e.options.speed || (e.image.position = "absolute"), "fixed" === e.image.position) { const t = function (e) { const t = []; for (; null !== e.parentElement;)1 === (e = e.parentElement).nodeType && t.push(e); return t }(e.$item).filter((e => { const t = i.getComputedStyle(e), o = t["-webkit-transform"] || t["-moz-transform"] || t.transform; return o && "none" !== o || /(auto|scroll)/.test(t.overflow + t["overflow-y"] + t["overflow-x"]) })); e.image.position = t.length ? "absolute" : "fixed" } o.position = e.image.position, e.css(e.image.$item, o), e.image.$container.appendChild(e.image.$item), e.onResize(), e.onScroll(!0), e.options.onInit && e.options.onInit.call(e), "none" !== e.css(e.$item, "background-image") && e.css(e.$item, { "background-image": "none" }), e.addToParallaxList() } addToParallaxList() { r.push({ instance: this }), 1 === r.length && i.requestAnimationFrame(m) } removeFromParallaxList() { const e = this; r.forEach(((t, i) => { t.instance.instanceID === e.instanceID && r.splice(i, 1) })) } destroy() { const e = this; e.removeFromParallaxList(); const t = e.$item.getAttribute("data-jarallax-original-styles"); if (e.$item.removeAttribute("data-jarallax-original-styles"), t ? e.$item.setAttribute("style", t) : e.$item.removeAttribute("style"), e.image.useImgTag) { const i = e.image.$item.getAttribute("data-jarallax-original-styles"); e.image.$item.removeAttribute("data-jarallax-original-styles"), i ? e.image.$item.setAttribute("style", t) : e.image.$item.removeAttribute("style"), e.image.$itemParent && e.image.$itemParent.appendChild(e.image.$item) } e.image.$container && e.image.$container.parentNode.removeChild(e.image.$container), e.options.onDestroy && e.options.onDestroy.call(e), delete e.$item.jarallax } clipContainer() { } coverImage() { const e = this, t = e.image.$container.getBoundingClientRect(), i = t.height, { speed: o } = e.options, n = "scroll" === e.options.type || "scroll-opacity" === e.options.type; let a = 0, l = i, r = 0; return n && (0 > o ? (a = o * Math.max(i, s), s < i && (a -= o * (i - s))) : a = o * (i + s), 1 < o ? l = Math.abs(a - s) : 0 > o ? l = a / o + Math.abs(a) : l += (s - i) * (1 - o), a /= 2), e.parallaxScrollDistance = a, r = n ? (s - l) / 2 : (i - l) / 2, e.css(e.image.$item, { height: `${l}px`, marginTop: `${r}px`, left: "fixed" === e.image.position ? `${t.left}px` : "0", width: `${t.width}px` }), e.options.onCoverImage && e.options.onCoverImage.call(e), { image: { height: l, marginTop: r }, container: t } } isVisible() { return this.isElementInViewport || !1 } onScroll(e) { const t = this, o = t.$item.getBoundingClientRect(), n = o.top, a = o.height, l = {}; let r = o; if (t.options.elementInViewport && (r = t.options.elementInViewport.getBoundingClientRect()), t.isElementInViewport = 0 <= r.bottom && 0 <= r.right && r.top <= s && r.left <= i.innerWidth, !e && !t.isElementInViewport) return; const m = Math.max(0, n), c = Math.max(0, a + n), p = Math.max(0, -n), d = Math.max(0, n + a - s), g = Math.max(0, a - (n + a - s)), u = Math.max(0, -n + s - a), f = 1 - (s - n) / (s + a) * 2; let h = 1; if (a < s ? h = 1 - (p || d) / a : c <= s ? h = c / s : g <= s && (h = g / s), "opacity" !== t.options.type && "scale-opacity" !== t.options.type && "scroll-opacity" !== t.options.type || (l.transform = "translate3d(0,0,0)", l.opacity = h), "scale" === t.options.type || "scale-opacity" === t.options.type) { let e = 1; 0 > t.options.speed ? e -= t.options.speed * h : e += t.options.speed * (1 - h), l.transform = `scale(${e}) translate3d(0,0,0)` } if ("scroll" === t.options.type || "scroll-opacity" === t.options.type) { let e = t.parallaxScrollDistance * f; "absolute" === t.image.position && (e -= n), l.transform = `translate3d(0,${e}px,0)` } t.css(t.image.$item, l), t.options.onScroll && t.options.onScroll.call(t, { section: o, beforeTop: m, beforeTopEnd: c, afterTop: p, beforeBottom: d, beforeBottomEnd: g, afterBottom: u, visiblePercent: h, fromViewportCenter: f }) } onResize() { this.coverImage() } } const d = function (e, t, ...i) { ("object" == typeof HTMLElement ? e instanceof HTMLElement : e && "object" == typeof e && null !== e && 1 === e.nodeType && "string" == typeof e.nodeName) && (e = [e]); const o = e.length; let n, a = 0; for (; a < o; a += 1)if ("object" == typeof t || void 0 === t ? e[a].jarallax || (e[a].jarallax = new p(e[a], t)) : e[a].jarallax && (n = e[a].jarallax[t].apply(e[a].jarallax, i)), void 0 !== n) return n; return e }; d.constructor = p; const g = i.jQuery; if (void 0 !== g) { const e = function (...e) { Array.prototype.unshift.call(e, this); const t = d.apply(i, e); return "object" != typeof t ? t : this }; e.constructor = d.constructor; const t = g.fn.jarallax; g.fn.jarallax = e, g.fn.jarallax.noConflict = function () { return g.fn.jarallax = t, this } } return e((() => { d(document.querySelectorAll("[data-jarallax]")) })), d }));

//# sourceMappingURL=jarallax.min.js.map

/* Chocolat-1.0.4 */
/* jQuery plugin for lightbox */
!function () { "use strict"; let e = void 0; function t(e, t) { return new Promise(s => { const i = () => { t.removeEventListener("transitionend", i), s() }; t.addEventListener("transitionend", i); const l = t.getAttribute("class"), n = t.getAttribute("style"); e(), l === t.getAttribute("class") && n === t.getAttribute("style") && i(), 0 === parseFloat(getComputedStyle(t).transitionDuration) && i() }) } function s({ src: e, srcset: t, sizes: s }) { const i = new Image; return i.src = e, t && (i.srcset = t), s && (i.sizes = s), "decode" in i ? new Promise((e, t) => { i.decode().then(() => { e(i) }).catch(() => { t(i) }) }) : new Promise((e, t) => { i.onload = e(i), i.onerror = t(i) }) } function i(e) { let t, s; const { imgHeight: i, imgWidth: l, containerHeight: n, containerWidth: a, canvasWidth: o, canvasHeight: c, imageSize: h } = e, r = i / l; return "cover" == h ? r < n / a ? s = (t = n) / r : t = (s = a) * r : "native" == h ? (t = i, s = l) : (r > c / o ? s = (t = c) / r : t = (s = o) * r, "scale-down" === h && (s >= l || t >= i) && (s = l, t = i)), { height: t, width: s } } function l(e) { return e.requestFullscreen ? e.requestFullscreen() : e.webkitRequestFullscreen ? e.webkitRequestFullscreen() : e.msRequestFullscreen ? e.msRequestFullscreen() : Promise.reject() } function n() { return document.exitFullscreen ? document.exitFullscreen() : document.webkitExitFullscreen ? document.webkitExitFullscreen() : document.msExitFullscreen ? document.msExitFullscreen() : Promise.reject() } const a = { container: document.body, className: void 0, imageSize: "scale-down", fullScreen: !1, loop: !1, linkImages: !0, setIndex: 0, firstImageIndex: 0, lastImageIndex: !1, currentImageIndex: void 0, allowZoom: !0, closeOnBackgroundClick: !0, setTitle: function () { return "" }, description: function () { return this.images[this.settings.currentImageIndex].title }, pagination: function () { const e = this.settings.lastImageIndex + 1; return this.settings.currentImageIndex + 1 + "/" + e }, afterInitialize() { }, afterMarkup() { }, afterImageLoad() { }, afterClose() { }, zoomedPaddingX: function (e, t) { return 0 }, zoomedPaddingY: function (e, t) { return 0 } }; class o { constructor(e, t) { this.settings = t, this.elems = {}, this.images = [], this.events = [], this.state = { fullScreenOpen: !1, initialZoomState: null, initialized: !1, timer: !1, visible: !1 }, this._cssClasses = ["chocolat-open", "chocolat-in-container", "chocolat-cover", "chocolat-zoomable", "chocolat-zoomed", "chocolat-zooming-in", "chocolat-zooming-out"], NodeList.prototype.isPrototypeOf(e) || HTMLCollection.prototype.isPrototypeOf(e) ? e.forEach((e, t) => { this.images.push({ title: e.getAttribute("title"), src: e.getAttribute("href"), srcset: e.getAttribute("data-srcset"), sizes: e.getAttribute("data-sizes") }), this.off(e, "click.chocolat"), this.on(e, "click.chocolat", e => { this.init(t), e.preventDefault() }) }) : this.images = e, this.settings.container instanceof Element || this.settings.container instanceof HTMLElement ? this.elems.container = this.settings.container : this.elems.container = document.body, this.api = { open: e => (e = parseInt(e) || 0, this.init(e)), close: () => this.close(), next: () => this.change(1), prev: () => this.change(-1), goto: e => this.open(e), current: () => this.settings.currentImageIndex, position: () => this.position(this.elems.img), destroy: () => this.destroy(), set: (e, t) => (this.settings[e] = t, t), get: e => this.settings[e], getElem: e => this.elems[e] } } init(e) { return this.state.initialized || (this.markup(), this.attachListeners(), this.settings.lastImageIndex = this.images.length - 1, this.state.initialized = !0), this.settings.afterInitialize.call(this), this.load(e) } load(e) { if (this.state.visible || (this.state.visible = !0, setTimeout(() => { this.elems.overlay.classList.add("chocolat-visible"), this.elems.wrapper.classList.add("chocolat-visible") }, 0), this.elems.container.classList.add("chocolat-open")), this.settings.fullScreen && l(this.elems.wrapper), this.settings.currentImageIndex === e) return Promise.resolve(); let i, n, a = setTimeout(() => { this.elems.loader.classList.add("chocolat-visible") }, 1e3), o = setTimeout(() => { o = void 0, i = t(() => { this.elems.imageCanvas.classList.remove("chocolat-visible") }, this.elems.imageCanvas) }, 80); return s(this.images[e]).then(e => (n = e, o ? (clearTimeout(o), Promise.resolve()) : i)).then(() => { const t = e + 1; return null != this.images[t] && s(this.images[t]), this.settings.currentImageIndex = e, this.elems.description.textContent = this.settings.description.call(this), this.elems.pagination.textContent = this.settings.pagination.call(this), this.arrows(), this.position(n).then(() => (this.elems.loader.classList.remove("chocolat-visible"), clearTimeout(a), this.appear(n))) }).then(() => { this.elems.container.classList.toggle("chocolat-zoomable", this.zoomable(n, this.elems.wrapper)), this.settings.afterImageLoad.call(this) }) } position({ naturalHeight: e, naturalWidth: s }) { const l = { imgHeight: e, imgWidth: s, containerHeight: this.elems.container.clientHeight, containerWidth: this.elems.container.clientWidth, canvasWidth: this.elems.imageCanvas.clientWidth, canvasHeight: this.elems.imageCanvas.clientHeight, imageSize: this.settings.imageSize }, { width: n, height: a } = i(l); return t(() => { Object.assign(this.elems.imageWrapper.style, { width: n + "px", height: a + "px" }) }, this.elems.imageWrapper) } appear(e) { return this.elems.imageWrapper.removeChild(this.elems.img), this.elems.img = e, this.elems.img.setAttribute("class", "chocolat-img"), this.elems.imageWrapper.appendChild(this.elems.img), t(() => { this.elems.imageCanvas.classList.add("chocolat-visible") }, this.elems.imageCanvas) } change(e) { if (!this.state.visible) return; if (!this.settings.linkImages) return; this.zoomOut(); const t = this.settings.currentImageIndex + parseInt(e); if (t > this.settings.lastImageIndex) { if (this.settings.loop) return this.load(this.settings.firstImageIndex) } else { if (!(t < this.settings.firstImageIndex)) return this.load(t); if (this.settings.loop) return this.load(this.settings.lastImageIndex) } } arrows() { this.settings.loop ? (this.elems.left.classList.add("active"), this.elems.right.classList.add("active")) : this.settings.linkImages ? (this.elems.right.classList.toggle("active", this.settings.currentImageIndex !== this.settings.lastImageIndex), this.elems.left.classList.toggle("active", this.settings.currentImageIndex !== this.settings.firstImageIndex)) : (this.elems.left.classList.remove("active"), this.elems.right.classList.remove("active")) } close() { if (this.state.fullScreenOpen) return void n(); this.state.visible = !1; const e = t(() => { this.elems.overlay.classList.remove("chocolat-visible") }, this.elems.overlay), s = t(() => { this.elems.wrapper.classList.remove("chocolat-visible") }, this.elems.wrapper); return Promise.all([e, s]).then(() => { this.elems.container.classList.remove("chocolat-open"), this.settings.afterClose.call(this) }) } destroy() { for (let e = this.events.length - 1; e >= 0; e--) { const { element: t, eventName: s } = this.events[e]; this.off(t, s) } this.state.initialized && (this.state.fullScreenOpen && n(), this.settings.currentImageIndex = void 0, this.state.visible = !1, this.state.initialized = !1, this.elems.container.classList.remove(...this._cssClasses), this.elems.wrapper.parentNode.removeChild(this.elems.wrapper)) } markup() { this.elems.container.classList.add("chocolat-open", this.settings.className), "cover" == this.settings.imageSize && this.elems.container.classList.add("chocolat-cover"), this.elems.container !== document.body && this.elems.container.classList.add("chocolat-in-container"), this.elems.wrapper = document.createElement("div"), this.elems.wrapper.setAttribute("id", "chocolat-content-" + this.settings.setIndex), this.elems.wrapper.setAttribute("class", "chocolat-wrapper"), this.elems.container.appendChild(this.elems.wrapper), this.elems.overlay = document.createElement("div"), this.elems.overlay.setAttribute("class", "chocolat-overlay"), this.elems.wrapper.appendChild(this.elems.overlay), this.elems.loader = document.createElement("div"), this.elems.loader.setAttribute("class", "chocolat-loader"), this.elems.wrapper.appendChild(this.elems.loader), this.elems.layout = document.createElement("div"), this.elems.layout.setAttribute("class", "chocolat-layout"), this.elems.wrapper.appendChild(this.elems.layout), this.elems.top = document.createElement("div"), this.elems.top.setAttribute("class", "chocolat-top"), this.elems.layout.appendChild(this.elems.top), this.elems.center = document.createElement("div"), this.elems.center.setAttribute("class", "chocolat-center"), this.elems.layout.appendChild(this.elems.center), this.elems.left = document.createElement("div"), this.elems.left.setAttribute("class", "chocolat-left"), this.elems.center.appendChild(this.elems.left), this.elems.imageCanvas = document.createElement("div"), this.elems.imageCanvas.setAttribute("class", "chocolat-image-canvas"), this.elems.center.appendChild(this.elems.imageCanvas), this.elems.imageWrapper = document.createElement("div"), this.elems.imageWrapper.setAttribute("class", "chocolat-image-wrapper"), this.elems.imageCanvas.appendChild(this.elems.imageWrapper), this.elems.img = document.createElement("img"), this.elems.img.setAttribute("class", "chocolat-img"), this.elems.imageWrapper.appendChild(this.elems.img), this.elems.right = document.createElement("div"), this.elems.right.setAttribute("class", "chocolat-right"), this.elems.center.appendChild(this.elems.right), this.elems.bottom = document.createElement("div"), this.elems.bottom.setAttribute("class", "chocolat-bottom"), this.elems.layout.appendChild(this.elems.bottom), this.elems.close = document.createElement("span"), this.elems.close.setAttribute("class", "chocolat-close"), this.elems.top.appendChild(this.elems.close), this.elems.description = document.createElement("span"), this.elems.description.setAttribute("class", "chocolat-description"), this.elems.bottom.appendChild(this.elems.description), this.elems.pagination = document.createElement("span"), this.elems.pagination.setAttribute("class", "chocolat-pagination"), this.elems.bottom.appendChild(this.elems.pagination), this.elems.setTitle = document.createElement("span"), this.elems.setTitle.setAttribute("class", "chocolat-set-title"), this.elems.setTitle.textContent = this.settings.setTitle(), this.elems.bottom.appendChild(this.elems.setTitle), this.elems.fullscreen = document.createElement("span"), this.elems.fullscreen.setAttribute("class", "chocolat-fullscreen"), this.elems.bottom.appendChild(this.elems.fullscreen), this.settings.afterMarkup.call(this) } attachListeners() { this.off(document, "keydown.chocolat"), this.on(document, "keydown.chocolat", e => { this.state.initialized && (37 == e.keyCode ? this.change(-1) : 39 == e.keyCode ? this.change(1) : 27 == e.keyCode && this.close()) }); const t = this.elems.wrapper.querySelector(".chocolat-right"); this.off(t, "click.chocolat"), this.on(t, "click.chocolat", () => { this.change(1) }); const s = this.elems.wrapper.querySelector(".chocolat-left"); this.off(s, "click.chocolat"), this.on(s, "click.chocolat", () => { this.change(-1) }), this.off(this.elems.close, "click.chocolat"), this.on(this.elems.close, "click.chocolat", this.close.bind(this)), this.off(this.elems.fullscreen, "click.chocolat"), this.on(this.elems.fullscreen, "click.chocolat", () => { this.state.fullScreenOpen ? n() : l(this.elems.wrapper) }), this.off(document, "fullscreenchange.chocolat"), this.on(document, "fullscreenchange.chocolat", () => { document.fullscreenElement || document.webkitCurrentFullScreenElement || document.webkitFullscreenElement ? this.state.fullScreenOpen = !0 : this.state.fullScreenOpen = !1 }), this.off(document, "webkitfullscreenchange.chocolat"), this.on(document, "webkitfullscreenchange.chocolat", () => { document.fullscreenElement || document.webkitCurrentFullScreenElement || document.webkitFullscreenElement ? this.state.fullScreenOpen = !0 : this.state.fullScreenOpen = !1 }), this.settings.closeOnBackgroundClick && (this.off(this.elems.overlay, "click.chocolat"), this.on(this.elems.overlay, "click.chocolat", this.close.bind(this))), this.off(this.elems.wrapper, "click.chocolat"), this.on(this.elems.wrapper, "click.chocolat", () => { null !== this.state.initialZoomState && this.state.visible && (this.elems.container.classList.add("chocolat-zooming-out"), this.zoomOut().then(() => { this.elems.container.classList.remove("chocolat-zoomed"), this.elems.container.classList.remove("chocolat-zooming-out") })) }), this.off(this.elems.imageWrapper, "click.chocolat"), this.on(this.elems.imageWrapper, "click.chocolat", e => { null === this.state.initialZoomState && this.elems.container.classList.contains("chocolat-zoomable") && (e.stopPropagation(), this.elems.container.classList.add("chocolat-zooming-in"), this.zoomIn(e).then(() => { this.elems.container.classList.add("chocolat-zoomed"), this.elems.container.classList.remove("chocolat-zooming-in") })) }), this.on(this.elems.wrapper, "mousemove.chocolat", e => { if (null === this.state.initialZoomState || !this.state.visible) return; const t = this.elems.wrapper.getBoundingClientRect(), s = t.top + window.scrollY, i = t.left + window.scrollX, l = this.elems.wrapper.clientHeight, n = this.elems.wrapper.clientWidth, a = this.elems.img.width, o = this.elems.img.height, c = [e.pageX - n / 2 - i, e.pageY - l / 2 - s]; let h = 0; if (a > n) { const e = this.settings.zoomedPaddingX(a, n); h = c[0] / (n / 2), h *= (a - n) / 2 + e } let r = 0; if (o > l) { const e = this.settings.zoomedPaddingY(o, l); r = c[1] / (l / 2), r *= (o - l) / 2 + e } this.elems.img.style.marginLeft = -h + "px", this.elems.img.style.marginTop = -r + "px" }), this.on(window, "resize.chocolat", t => { this.state.initialized && this.state.visible && function (t, s) { clearTimeout(e), e = setTimeout(function () { s() }, t) }(50, () => { const e = { imgHeight: this.elems.img.naturalHeight, imgWidth: this.elems.img.naturalWidth, containerHeight: this.elems.wrapper.clientHeight, containerWidth: this.elems.wrapper.clientWidth, canvasWidth: this.elems.imageCanvas.clientWidth, canvasHeight: this.elems.imageCanvas.clientHeight, imageSize: this.settings.imageSize }, { width: t, height: s } = i(e); this.position(this.elems.img).then(() => { this.elems.container.classList.toggle("chocolat-zoomable", this.zoomable(this.elems.img, this.elems.wrapper)) }) }) }) } zoomable(e, t) { const s = t.clientWidth, i = t.clientHeight, l = !(!this.settings.allowZoom || !(e.naturalWidth > s || e.naturalHeight > i)), n = e.clientWidth > e.naturalWidth || e.clientHeight > e.naturalHeight; return l && !n } zoomIn(e) { return this.state.initialZoomState = this.settings.imageSize, this.settings.imageSize = "native", this.position(this.elems.img) } zoomOut(e) { return this.settings.imageSize = this.state.initialZoomState || this.settings.imageSize, this.state.initialZoomState = null, this.elems.img.style.margin = 0, this.position(this.elems.img) } on(e, t, s) { const i = this.events.push({ element: e, eventName: t, cb: s }); e.addEventListener(t.split(".")[0], this.events[i - 1].cb) } off(e, t) { const s = this.events.findIndex(s => s.element === e && s.eventName === t); this.events[s] && (e.removeEventListener(t.split(".")[0], this.events[s].cb), this.events.splice(s, 1)) } } const c = []; window.Chocolat = function (e, t) { const s = Object.assign({}, a, { images: [] }, t, { setIndex: c.length }), i = new o(e, s); return c.push(i), i } }();

//--------------------------------
// - jQuery Easing
//--------------------------------
/*
 * jQuery Easing v1.3 - http://gsgd.co.uk/sandbox/jquery/easing/
 *
 * Copyright Â© 2008 George McGinley Smith
 * All rights reserved.
 *
 */
jQuery.easing.jswing = jQuery.easing.swing; jQuery.extend(jQuery.easing, { def: "easeOutQuad", swing: function (e, f, a, h, g) { return jQuery.easing[jQuery.easing.def](e, f, a, h, g) }, easeInQuad: function (e, f, a, h, g) { return h * (f /= g) * f + a }, easeOutQuad: function (e, f, a, h, g) { return -h * (f /= g) * (f - 2) + a }, easeInOutQuad: function (e, f, a, h, g) { if ((f /= g / 2) < 1) { return h / 2 * f * f + a } return -h / 2 * ((--f) * (f - 2) - 1) + a }, easeInCubic: function (e, f, a, h, g) { return h * (f /= g) * f * f + a }, easeOutCubic: function (e, f, a, h, g) { return h * ((f = f / g - 1) * f * f + 1) + a }, easeInOutCubic: function (e, f, a, h, g) { if ((f /= g / 2) < 1) { return h / 2 * f * f * f + a } return h / 2 * ((f -= 2) * f * f + 2) + a }, easeInQuart: function (e, f, a, h, g) { return h * (f /= g) * f * f * f + a }, easeOutQuart: function (e, f, a, h, g) { return -h * ((f = f / g - 1) * f * f * f - 1) + a }, easeInOutQuart: function (e, f, a, h, g) { if ((f /= g / 2) < 1) { return h / 2 * f * f * f * f + a } return -h / 2 * ((f -= 2) * f * f * f - 2) + a }, easeInQuint: function (e, f, a, h, g) { return h * (f /= g) * f * f * f * f + a }, easeOutQuint: function (e, f, a, h, g) { return h * ((f = f / g - 1) * f * f * f * f + 1) + a }, easeInOutQuint: function (e, f, a, h, g) { if ((f /= g / 2) < 1) { return h / 2 * f * f * f * f * f + a } return h / 2 * ((f -= 2) * f * f * f * f + 2) + a }, easeInSine: function (e, f, a, h, g) { return -h * Math.cos(f / g * (Math.PI / 2)) + h + a }, easeOutSine: function (e, f, a, h, g) { return h * Math.sin(f / g * (Math.PI / 2)) + a }, easeInOutSine: function (e, f, a, h, g) { return -h / 2 * (Math.cos(Math.PI * f / g) - 1) + a }, easeInExpo: function (e, f, a, h, g) { return (f == 0) ? a : h * Math.pow(2, 10 * (f / g - 1)) + a }, easeOutExpo: function (e, f, a, h, g) { return (f == g) ? a + h : h * (-Math.pow(2, -10 * f / g) + 1) + a }, easeInOutExpo: function (e, f, a, h, g) { if (f == 0) { return a } if (f == g) { return a + h } if ((f /= g / 2) < 1) { return h / 2 * Math.pow(2, 10 * (f - 1)) + a } return h / 2 * (-Math.pow(2, -10 * --f) + 2) + a }, easeInCirc: function (e, f, a, h, g) { return -h * (Math.sqrt(1 - (f /= g) * f) - 1) + a }, easeOutCirc: function (e, f, a, h, g) { return h * Math.sqrt(1 - (f = f / g - 1) * f) + a }, easeInOutCirc: function (e, f, a, h, g) { if ((f /= g / 2) < 1) { return -h / 2 * (Math.sqrt(1 - f * f) - 1) + a } return h / 2 * (Math.sqrt(1 - (f -= 2) * f) + 1) + a }, easeInElastic: function (f, h, e, l, k) { var i = 1.70158; var j = 0; var g = l; if (h == 0) { return e } if ((h /= k) == 1) { return e + l } if (!j) { j = k * 0.3 } if (g < Math.abs(l)) { g = l; var i = j / 4 } else { var i = j / (2 * Math.PI) * Math.asin(l / g) } return -(g * Math.pow(2, 10 * (h -= 1)) * Math.sin((h * k - i) * (2 * Math.PI) / j)) + e }, easeOutElastic: function (f, h, e, l, k) { var i = 1.70158; var j = 0; var g = l; if (h == 0) { return e } if ((h /= k) == 1) { return e + l } if (!j) { j = k * 0.3 } if (g < Math.abs(l)) { g = l; var i = j / 4 } else { var i = j / (2 * Math.PI) * Math.asin(l / g) } return g * Math.pow(2, -10 * h) * Math.sin((h * k - i) * (2 * Math.PI) / j) + l + e }, easeInOutElastic: function (f, h, e, l, k) { var i = 1.70158; var j = 0; var g = l; if (h == 0) { return e } if ((h /= k / 2) == 2) { return e + l } if (!j) { j = k * (0.3 * 1.5) } if (g < Math.abs(l)) { g = l; var i = j / 4 } else { var i = j / (2 * Math.PI) * Math.asin(l / g) } if (h < 1) { return -0.5 * (g * Math.pow(2, 10 * (h -= 1)) * Math.sin((h * k - i) * (2 * Math.PI) / j)) + e } return g * Math.pow(2, -10 * (h -= 1)) * Math.sin((h * k - i) * (2 * Math.PI) / j) * 0.5 + l + e }, easeInBack: function (e, f, a, i, h, g) { if (g == undefined) { g = 1.70158 } return i * (f /= h) * f * ((g + 1) * f - g) + a }, easeOutBack: function (e, f, a, i, h, g) { if (g == undefined) { g = 1.70158 } return i * ((f = f / h - 1) * f * ((g + 1) * f + g) + 1) + a }, easeInOutBack: function (e, f, a, i, h, g) { if (g == undefined) { g = 1.70158 } if ((f /= h / 2) < 1) { return i / 2 * (f * f * (((g *= (1.525)) + 1) * f - g)) + a } return i / 2 * ((f -= 2) * f * (((g *= (1.525)) + 1) * f + g) + 2) + a }, easeInBounce: function (e, f, a, h, g) { return h - jQuery.easing.easeOutBounce(e, g - f, 0, h, g) + a }, easeOutBounce: function (e, f, a, h, g) { if ((f /= g) < (1 / 2.75)) { return h * (7.5625 * f * f) + a } else { if (f < (2 / 2.75)) { return h * (7.5625 * (f -= (1.5 / 2.75)) * f + 0.75) + a } else { if (f < (2.5 / 2.75)) { return h * (7.5625 * (f -= (2.25 / 2.75)) * f + 0.9375) + a } else { return h * (7.5625 * (f -= (2.625 / 2.75)) * f + 0.984375) + a } } } }, easeInOutBounce: function (e, f, a, h, g) { if (f < g / 2) { return jQuery.easing.easeInBounce(e, f * 2, 0, h, g) * 0.5 + a } return jQuery.easing.easeOutBounce(e, f * 2 - g, 0, h, g) * 0.5 + h * 0.5 + a } });



/*!
 * Isotope PACKAGED v3.0.6
 *
 * Licensed GPLv3 for open source use
 * or Isotope Commercial License for commercial use
 *
 * https://isotope.metafizzy.co
 * Copyright 2010-2018 Metafizzy
 */

!function (t, e) { "function" == typeof define && define.amd ? define("jquery-bridget/jquery-bridget", ["jquery"], function (i) { return e(t, i) }) : "object" == typeof module && module.exports ? module.exports = e(t, require("jquery")) : t.jQueryBridget = e(t, t.jQuery) }(window, function (t, e) { "use strict"; function i(i, s, a) { function u(t, e, o) { var n, s = "$()." + i + '("' + e + '")'; return t.each(function (t, u) { var h = a.data(u, i); if (!h) return void r(i + " not initialized. Cannot call methods, i.e. " + s); var d = h[e]; if (!d || "_" == e.charAt(0)) return void r(s + " is not a valid method"); var l = d.apply(h, o); n = void 0 === n ? l : n }), void 0 !== n ? n : t } function h(t, e) { t.each(function (t, o) { var n = a.data(o, i); n ? (n.option(e), n._init()) : (n = new s(o, e), a.data(o, i, n)) }) } a = a || e || t.jQuery, a && (s.prototype.option || (s.prototype.option = function (t) { a.isPlainObject(t) && (this.options = a.extend(!0, this.options, t)) }), a.fn[i] = function (t) { if ("string" == typeof t) { var e = n.call(arguments, 1); return u(this, t, e) } return h(this, t), this }, o(a)) } function o(t) { !t || t && t.bridget || (t.bridget = i) } var n = Array.prototype.slice, s = t.console, r = "undefined" == typeof s ? function () { } : function (t) { s.error(t) }; return o(e || t.jQuery), i }), function (t, e) { "function" == typeof define && define.amd ? define("ev-emitter/ev-emitter", e) : "object" == typeof module && module.exports ? module.exports = e() : t.EvEmitter = e() }("undefined" != typeof window ? window : this, function () { function t() { } var e = t.prototype; return e.on = function (t, e) { if (t && e) { var i = this._events = this._events || {}, o = i[t] = i[t] || []; return o.indexOf(e) == -1 && o.push(e), this } }, e.once = function (t, e) { if (t && e) { this.on(t, e); var i = this._onceEvents = this._onceEvents || {}, o = i[t] = i[t] || {}; return o[e] = !0, this } }, e.off = function (t, e) { var i = this._events && this._events[t]; if (i && i.length) { var o = i.indexOf(e); return o != -1 && i.splice(o, 1), this } }, e.emitEvent = function (t, e) { var i = this._events && this._events[t]; if (i && i.length) { i = i.slice(0), e = e || []; for (var o = this._onceEvents && this._onceEvents[t], n = 0; n < i.length; n++) { var s = i[n], r = o && o[s]; r && (this.off(t, s), delete o[s]), s.apply(this, e) } return this } }, e.allOff = function () { delete this._events, delete this._onceEvents }, t }), function (t, e) { "function" == typeof define && define.amd ? define("get-size/get-size", e) : "object" == typeof module && module.exports ? module.exports = e() : t.getSize = e() }(window, function () { "use strict"; function t(t) { var e = parseFloat(t), i = t.indexOf("%") == -1 && !isNaN(e); return i && e } function e() { } function i() { for (var t = { width: 0, height: 0, innerWidth: 0, innerHeight: 0, outerWidth: 0, outerHeight: 0 }, e = 0; e < h; e++) { var i = u[e]; t[i] = 0 } return t } function o(t) { var e = getComputedStyle(t); return e || a("Style returned " + e + ". Are you running this code in a hidden iframe on Firefox? See https://bit.ly/getsizebug1"), e } function n() { if (!d) { d = !0; var e = document.createElement("div"); e.style.width = "200px", e.style.padding = "1px 2px 3px 4px", e.style.borderStyle = "solid", e.style.borderWidth = "1px 2px 3px 4px", e.style.boxSizing = "border-box"; var i = document.body || document.documentElement; i.appendChild(e); var n = o(e); r = 200 == Math.round(t(n.width)), s.isBoxSizeOuter = r, i.removeChild(e) } } function s(e) { if (n(), "string" == typeof e && (e = document.querySelector(e)), e && "object" == typeof e && e.nodeType) { var s = o(e); if ("none" == s.display) return i(); var a = {}; a.width = e.offsetWidth, a.height = e.offsetHeight; for (var d = a.isBorderBox = "border-box" == s.boxSizing, l = 0; l < h; l++) { var f = u[l], c = s[f], m = parseFloat(c); a[f] = isNaN(m) ? 0 : m } var p = a.paddingLeft + a.paddingRight, y = a.paddingTop + a.paddingBottom, g = a.marginLeft + a.marginRight, v = a.marginTop + a.marginBottom, _ = a.borderLeftWidth + a.borderRightWidth, z = a.borderTopWidth + a.borderBottomWidth, I = d && r, x = t(s.width); x !== !1 && (a.width = x + (I ? 0 : p + _)); var S = t(s.height); return S !== !1 && (a.height = S + (I ? 0 : y + z)), a.innerWidth = a.width - (p + _), a.innerHeight = a.height - (y + z), a.outerWidth = a.width + g, a.outerHeight = a.height + v, a } } var r, a = "undefined" == typeof console ? e : function (t) { console.error(t) }, u = ["paddingLeft", "paddingRight", "paddingTop", "paddingBottom", "marginLeft", "marginRight", "marginTop", "marginBottom", "borderLeftWidth", "borderRightWidth", "borderTopWidth", "borderBottomWidth"], h = u.length, d = !1; return s }), function (t, e) { "use strict"; "function" == typeof define && define.amd ? define("desandro-matches-selector/matches-selector", e) : "object" == typeof module && module.exports ? module.exports = e() : t.matchesSelector = e() }(window, function () { "use strict"; var t = function () { var t = window.Element.prototype; if (t.matches) return "matches"; if (t.matchesSelector) return "matchesSelector"; for (var e = ["webkit", "moz", "ms", "o"], i = 0; i < e.length; i++) { var o = e[i], n = o + "MatchesSelector"; if (t[n]) return n } }(); return function (e, i) { return e[t](i) } }), function (t, e) { "function" == typeof define && define.amd ? define("fizzy-ui-utils/utils", ["desandro-matches-selector/matches-selector"], function (i) { return e(t, i) }) : "object" == typeof module && module.exports ? module.exports = e(t, require("desandro-matches-selector")) : t.fizzyUIUtils = e(t, t.matchesSelector) }(window, function (t, e) { var i = {}; i.extend = function (t, e) { for (var i in e) t[i] = e[i]; return t }, i.modulo = function (t, e) { return (t % e + e) % e }; var o = Array.prototype.slice; i.makeArray = function (t) { if (Array.isArray(t)) return t; if (null === t || void 0 === t) return []; var e = "object" == typeof t && "number" == typeof t.length; return e ? o.call(t) : [t] }, i.removeFrom = function (t, e) { var i = t.indexOf(e); i != -1 && t.splice(i, 1) }, i.getParent = function (t, i) { for (; t.parentNode && t != document.body;)if (t = t.parentNode, e(t, i)) return t }, i.getQueryElement = function (t) { return "string" == typeof t ? document.querySelector(t) : t }, i.handleEvent = function (t) { var e = "on" + t.type; this[e] && this[e](t) }, i.filterFindElements = function (t, o) { t = i.makeArray(t); var n = []; return t.forEach(function (t) { if (t instanceof HTMLElement) { if (!o) return void n.push(t); e(t, o) && n.push(t); for (var i = t.querySelectorAll(o), s = 0; s < i.length; s++)n.push(i[s]) } }), n }, i.debounceMethod = function (t, e, i) { i = i || 100; var o = t.prototype[e], n = e + "Timeout"; t.prototype[e] = function () { var t = this[n]; clearTimeout(t); var e = arguments, s = this; this[n] = setTimeout(function () { o.apply(s, e), delete s[n] }, i) } }, i.docReady = function (t) { var e = document.readyState; "complete" == e || "interactive" == e ? setTimeout(t) : document.addEventListener("DOMContentLoaded", t) }, i.toDashed = function (t) { return t.replace(/(.)([A-Z])/g, function (t, e, i) { return e + "-" + i }).toLowerCase() }; var n = t.console; return i.htmlInit = function (e, o) { i.docReady(function () { var s = i.toDashed(o), r = "data-" + s, a = document.querySelectorAll("[" + r + "]"), u = document.querySelectorAll(".js-" + s), h = i.makeArray(a).concat(i.makeArray(u)), d = r + "-options", l = t.jQuery; h.forEach(function (t) { var i, s = t.getAttribute(r) || t.getAttribute(d); try { i = s && JSON.parse(s) } catch (a) { return void (n && n.error("Error parsing " + r + " on " + t.className + ": " + a)) } var u = new e(t, i); l && l.data(t, o, u) }) }) }, i }), function (t, e) { "function" == typeof define && define.amd ? define("outlayer/item", ["ev-emitter/ev-emitter", "get-size/get-size"], e) : "object" == typeof module && module.exports ? module.exports = e(require("ev-emitter"), require("get-size")) : (t.Outlayer = {}, t.Outlayer.Item = e(t.EvEmitter, t.getSize)) }(window, function (t, e) { "use strict"; function i(t) { for (var e in t) return !1; return e = null, !0 } function o(t, e) { t && (this.element = t, this.layout = e, this.position = { x: 0, y: 0 }, this._create()) } function n(t) { return t.replace(/([A-Z])/g, function (t) { return "-" + t.toLowerCase() }) } var s = document.documentElement.style, r = "string" == typeof s.transition ? "transition" : "WebkitTransition", a = "string" == typeof s.transform ? "transform" : "WebkitTransform", u = { WebkitTransition: "webkitTransitionEnd", transition: "transitionend" }[r], h = { transform: a, transition: r, transitionDuration: r + "Duration", transitionProperty: r + "Property", transitionDelay: r + "Delay" }, d = o.prototype = Object.create(t.prototype); d.constructor = o, d._create = function () { this._transn = { ingProperties: {}, clean: {}, onEnd: {} }, this.css({ position: "absolute" }) }, d.handleEvent = function (t) { var e = "on" + t.type; this[e] && this[e](t) }, d.getSize = function () { this.size = e(this.element) }, d.css = function (t) { var e = this.element.style; for (var i in t) { var o = h[i] || i; e[o] = t[i] } }, d.getPosition = function () { var t = getComputedStyle(this.element), e = this.layout._getOption("originLeft"), i = this.layout._getOption("originTop"), o = t[e ? "left" : "right"], n = t[i ? "top" : "bottom"], s = parseFloat(o), r = parseFloat(n), a = this.layout.size; o.indexOf("%") != -1 && (s = s / 100 * a.width), n.indexOf("%") != -1 && (r = r / 100 * a.height), s = isNaN(s) ? 0 : s, r = isNaN(r) ? 0 : r, s -= e ? a.paddingLeft : a.paddingRight, r -= i ? a.paddingTop : a.paddingBottom, this.position.x = s, this.position.y = r }, d.layoutPosition = function () { var t = this.layout.size, e = {}, i = this.layout._getOption("originLeft"), o = this.layout._getOption("originTop"), n = i ? "paddingLeft" : "paddingRight", s = i ? "left" : "right", r = i ? "right" : "left", a = this.position.x + t[n]; e[s] = this.getXValue(a), e[r] = ""; var u = o ? "paddingTop" : "paddingBottom", h = o ? "top" : "bottom", d = o ? "bottom" : "top", l = this.position.y + t[u]; e[h] = this.getYValue(l), e[d] = "", this.css(e), this.emitEvent("layout", [this]) }, d.getXValue = function (t) { var e = this.layout._getOption("horizontal"); return this.layout.options.percentPosition && !e ? t / this.layout.size.width * 100 + "%" : t + "px" }, d.getYValue = function (t) { var e = this.layout._getOption("horizontal"); return this.layout.options.percentPosition && e ? t / this.layout.size.height * 100 + "%" : t + "px" }, d._transitionTo = function (t, e) { this.getPosition(); var i = this.position.x, o = this.position.y, n = t == this.position.x && e == this.position.y; if (this.setPosition(t, e), n && !this.isTransitioning) return void this.layoutPosition(); var s = t - i, r = e - o, a = {}; a.transform = this.getTranslate(s, r), this.transition({ to: a, onTransitionEnd: { transform: this.layoutPosition }, isCleaning: !0 }) }, d.getTranslate = function (t, e) { var i = this.layout._getOption("originLeft"), o = this.layout._getOption("originTop"); return t = i ? t : -t, e = o ? e : -e, "translate3d(" + t + "px, " + e + "px, 0)" }, d.goTo = function (t, e) { this.setPosition(t, e), this.layoutPosition() }, d.moveTo = d._transitionTo, d.setPosition = function (t, e) { this.position.x = parseFloat(t), this.position.y = parseFloat(e) }, d._nonTransition = function (t) { this.css(t.to), t.isCleaning && this._removeStyles(t.to); for (var e in t.onTransitionEnd) t.onTransitionEnd[e].call(this) }, d.transition = function (t) { if (!parseFloat(this.layout.options.transitionDuration)) return void this._nonTransition(t); var e = this._transn; for (var i in t.onTransitionEnd) e.onEnd[i] = t.onTransitionEnd[i]; for (i in t.to) e.ingProperties[i] = !0, t.isCleaning && (e.clean[i] = !0); if (t.from) { this.css(t.from); var o = this.element.offsetHeight; o = null } this.enableTransition(t.to), this.css(t.to), this.isTransitioning = !0 }; var l = "opacity," + n(a); d.enableTransition = function () { if (!this.isTransitioning) { var t = this.layout.options.transitionDuration; t = "number" == typeof t ? t + "ms" : t, this.css({ transitionProperty: l, transitionDuration: t, transitionDelay: this.staggerDelay || 0 }), this.element.addEventListener(u, this, !1) } }, d.onwebkitTransitionEnd = function (t) { this.ontransitionend(t) }, d.onotransitionend = function (t) { this.ontransitionend(t) }; var f = { "-webkit-transform": "transform" }; d.ontransitionend = function (t) { if (t.target === this.element) { var e = this._transn, o = f[t.propertyName] || t.propertyName; if (delete e.ingProperties[o], i(e.ingProperties) && this.disableTransition(), o in e.clean && (this.element.style[t.propertyName] = "", delete e.clean[o]), o in e.onEnd) { var n = e.onEnd[o]; n.call(this), delete e.onEnd[o] } this.emitEvent("transitionEnd", [this]) } }, d.disableTransition = function () { this.removeTransitionStyles(), this.element.removeEventListener(u, this, !1), this.isTransitioning = !1 }, d._removeStyles = function (t) { var e = {}; for (var i in t) e[i] = ""; this.css(e) }; var c = { transitionProperty: "", transitionDuration: "", transitionDelay: "" }; return d.removeTransitionStyles = function () { this.css(c) }, d.stagger = function (t) { t = isNaN(t) ? 0 : t, this.staggerDelay = t + "ms" }, d.removeElem = function () { this.element.parentNode.removeChild(this.element), this.css({ display: "" }), this.emitEvent("remove", [this]) }, d.remove = function () { return r && parseFloat(this.layout.options.transitionDuration) ? (this.once("transitionEnd", function () { this.removeElem() }), void this.hide()) : void this.removeElem() }, d.reveal = function () { delete this.isHidden, this.css({ display: "" }); var t = this.layout.options, e = {}, i = this.getHideRevealTransitionEndProperty("visibleStyle"); e[i] = this.onRevealTransitionEnd, this.transition({ from: t.hiddenStyle, to: t.visibleStyle, isCleaning: !0, onTransitionEnd: e }) }, d.onRevealTransitionEnd = function () { this.isHidden || this.emitEvent("reveal") }, d.getHideRevealTransitionEndProperty = function (t) { var e = this.layout.options[t]; if (e.opacity) return "opacity"; for (var i in e) return i }, d.hide = function () { this.isHidden = !0, this.css({ display: "" }); var t = this.layout.options, e = {}, i = this.getHideRevealTransitionEndProperty("hiddenStyle"); e[i] = this.onHideTransitionEnd, this.transition({ from: t.visibleStyle, to: t.hiddenStyle, isCleaning: !0, onTransitionEnd: e }) }, d.onHideTransitionEnd = function () { this.isHidden && (this.css({ display: "none" }), this.emitEvent("hide")) }, d.destroy = function () { this.css({ position: "", left: "", right: "", top: "", bottom: "", transition: "", transform: "" }) }, o }), function (t, e) { "use strict"; "function" == typeof define && define.amd ? define("outlayer/outlayer", ["ev-emitter/ev-emitter", "get-size/get-size", "fizzy-ui-utils/utils", "./item"], function (i, o, n, s) { return e(t, i, o, n, s) }) : "object" == typeof module && module.exports ? module.exports = e(t, require("ev-emitter"), require("get-size"), require("fizzy-ui-utils"), require("./item")) : t.Outlayer = e(t, t.EvEmitter, t.getSize, t.fizzyUIUtils, t.Outlayer.Item) }(window, function (t, e, i, o, n) { "use strict"; function s(t, e) { var i = o.getQueryElement(t); if (!i) return void (u && u.error("Bad element for " + this.constructor.namespace + ": " + (i || t))); this.element = i, h && (this.$element = h(this.element)), this.options = o.extend({}, this.constructor.defaults), this.option(e); var n = ++l; this.element.outlayerGUID = n, f[n] = this, this._create(); var s = this._getOption("initLayout"); s && this.layout() } function r(t) { function e() { t.apply(this, arguments) } return e.prototype = Object.create(t.prototype), e.prototype.constructor = e, e } function a(t) { if ("number" == typeof t) return t; var e = t.match(/(^\d*\.?\d*)(\w*)/), i = e && e[1], o = e && e[2]; if (!i.length) return 0; i = parseFloat(i); var n = m[o] || 1; return i * n } var u = t.console, h = t.jQuery, d = function () { }, l = 0, f = {}; s.namespace = "outlayer", s.Item = n, s.defaults = { containerStyle: { position: "relative" }, initLayout: !0, originLeft: !0, originTop: !0, resize: !0, resizeContainer: !0, transitionDuration: "0.4s", hiddenStyle: { opacity: 0, transform: "scale(0.001)" }, visibleStyle: { opacity: 1, transform: "scale(1)" } }; var c = s.prototype; o.extend(c, e.prototype), c.option = function (t) { o.extend(this.options, t) }, c._getOption = function (t) { var e = this.constructor.compatOptions[t]; return e && void 0 !== this.options[e] ? this.options[e] : this.options[t] }, s.compatOptions = { initLayout: "isInitLayout", horizontal: "isHorizontal", layoutInstant: "isLayoutInstant", originLeft: "isOriginLeft", originTop: "isOriginTop", resize: "isResizeBound", resizeContainer: "isResizingContainer" }, c._create = function () { this.reloadItems(), this.stamps = [], this.stamp(this.options.stamp), o.extend(this.element.style, this.options.containerStyle); var t = this._getOption("resize"); t && this.bindResize() }, c.reloadItems = function () { this.items = this._itemize(this.element.children) }, c._itemize = function (t) { for (var e = this._filterFindItemElements(t), i = this.constructor.Item, o = [], n = 0; n < e.length; n++) { var s = e[n], r = new i(s, this); o.push(r) } return o }, c._filterFindItemElements = function (t) { return o.filterFindElements(t, this.options.itemSelector) }, c.getItemElements = function () { return this.items.map(function (t) { return t.element }) }, c.layout = function () { this._resetLayout(), this._manageStamps(); var t = this._getOption("layoutInstant"), e = void 0 !== t ? t : !this._isLayoutInited; this.layoutItems(this.items, e), this._isLayoutInited = !0 }, c._init = c.layout, c._resetLayout = function () { this.getSize() }, c.getSize = function () { this.size = i(this.element) }, c._getMeasurement = function (t, e) { var o, n = this.options[t]; n ? ("string" == typeof n ? o = this.element.querySelector(n) : n instanceof HTMLElement && (o = n), this[t] = o ? i(o)[e] : n) : this[t] = 0 }, c.layoutItems = function (t, e) { t = this._getItemsForLayout(t), this._layoutItems(t, e), this._postLayout() }, c._getItemsForLayout = function (t) { return t.filter(function (t) { return !t.isIgnored }) }, c._layoutItems = function (t, e) { if (this._emitCompleteOnItems("layout", t), t && t.length) { var i = []; t.forEach(function (t) { var o = this._getItemLayoutPosition(t); o.item = t, o.isInstant = e || t.isLayoutInstant, i.push(o) }, this), this._processLayoutQueue(i) } }, c._getItemLayoutPosition = function () { return { x: 0, y: 0 } }, c._processLayoutQueue = function (t) { this.updateStagger(), t.forEach(function (t, e) { this._positionItem(t.item, t.x, t.y, t.isInstant, e) }, this) }, c.updateStagger = function () { var t = this.options.stagger; return null === t || void 0 === t ? void (this.stagger = 0) : (this.stagger = a(t), this.stagger) }, c._positionItem = function (t, e, i, o, n) { o ? t.goTo(e, i) : (t.stagger(n * this.stagger), t.moveTo(e, i)) }, c._postLayout = function () { this.resizeContainer() }, c.resizeContainer = function () { var t = this._getOption("resizeContainer"); if (t) { var e = this._getContainerSize(); e && (this._setContainerMeasure(e.width, !0), this._setContainerMeasure(e.height, !1)) } }, c._getContainerSize = d, c._setContainerMeasure = function (t, e) { if (void 0 !== t) { var i = this.size; i.isBorderBox && (t += e ? i.paddingLeft + i.paddingRight + i.borderLeftWidth + i.borderRightWidth : i.paddingBottom + i.paddingTop + i.borderTopWidth + i.borderBottomWidth), t = Math.max(t, 0), this.element.style[e ? "width" : "height"] = t + "px" } }, c._emitCompleteOnItems = function (t, e) { function i() { n.dispatchEvent(t + "Complete", null, [e]) } function o() { r++, r == s && i() } var n = this, s = e.length; if (!e || !s) return void i(); var r = 0; e.forEach(function (e) { e.once(t, o) }) }, c.dispatchEvent = function (t, e, i) { var o = e ? [e].concat(i) : i; if (this.emitEvent(t, o), h) if (this.$element = this.$element || h(this.element), e) { var n = h.Event(e); n.type = t, this.$element.trigger(n, i) } else this.$element.trigger(t, i) }, c.ignore = function (t) { var e = this.getItem(t); e && (e.isIgnored = !0) }, c.unignore = function (t) { var e = this.getItem(t); e && delete e.isIgnored }, c.stamp = function (t) { t = this._find(t), t && (this.stamps = this.stamps.concat(t), t.forEach(this.ignore, this)) }, c.unstamp = function (t) { t = this._find(t), t && t.forEach(function (t) { o.removeFrom(this.stamps, t), this.unignore(t) }, this) }, c._find = function (t) { if (t) return "string" == typeof t && (t = this.element.querySelectorAll(t)), t = o.makeArray(t) }, c._manageStamps = function () { this.stamps && this.stamps.length && (this._getBoundingRect(), this.stamps.forEach(this._manageStamp, this)) }, c._getBoundingRect = function () { var t = this.element.getBoundingClientRect(), e = this.size; this._boundingRect = { left: t.left + e.paddingLeft + e.borderLeftWidth, top: t.top + e.paddingTop + e.borderTopWidth, right: t.right - (e.paddingRight + e.borderRightWidth), bottom: t.bottom - (e.paddingBottom + e.borderBottomWidth) } }, c._manageStamp = d, c._getElementOffset = function (t) { var e = t.getBoundingClientRect(), o = this._boundingRect, n = i(t), s = { left: e.left - o.left - n.marginLeft, top: e.top - o.top - n.marginTop, right: o.right - e.right - n.marginRight, bottom: o.bottom - e.bottom - n.marginBottom }; return s }, c.handleEvent = o.handleEvent, c.bindResize = function () { t.addEventListener("resize", this), this.isResizeBound = !0 }, c.unbindResize = function () { t.removeEventListener("resize", this), this.isResizeBound = !1 }, c.onresize = function () { this.resize() }, o.debounceMethod(s, "onresize", 100), c.resize = function () { this.isResizeBound && this.needsResizeLayout() && this.layout() }, c.needsResizeLayout = function () { var t = i(this.element), e = this.size && t; return e && t.innerWidth !== this.size.innerWidth }, c.addItems = function (t) { var e = this._itemize(t); return e.length && (this.items = this.items.concat(e)), e }, c.appended = function (t) { var e = this.addItems(t); e.length && (this.layoutItems(e, !0), this.reveal(e)) }, c.prepended = function (t) { var e = this._itemize(t); if (e.length) { var i = this.items.slice(0); this.items = e.concat(i), this._resetLayout(), this._manageStamps(), this.layoutItems(e, !0), this.reveal(e), this.layoutItems(i) } }, c.reveal = function (t) { if (this._emitCompleteOnItems("reveal", t), t && t.length) { var e = this.updateStagger(); t.forEach(function (t, i) { t.stagger(i * e), t.reveal() }) } }, c.hide = function (t) { if (this._emitCompleteOnItems("hide", t), t && t.length) { var e = this.updateStagger(); t.forEach(function (t, i) { t.stagger(i * e), t.hide() }) } }, c.revealItemElements = function (t) { var e = this.getItems(t); this.reveal(e) }, c.hideItemElements = function (t) { var e = this.getItems(t); this.hide(e) }, c.getItem = function (t) { for (var e = 0; e < this.items.length; e++) { var i = this.items[e]; if (i.element == t) return i } }, c.getItems = function (t) { t = o.makeArray(t); var e = []; return t.forEach(function (t) { var i = this.getItem(t); i && e.push(i) }, this), e }, c.remove = function (t) { var e = this.getItems(t); this._emitCompleteOnItems("remove", e), e && e.length && e.forEach(function (t) { t.remove(), o.removeFrom(this.items, t) }, this) }, c.destroy = function () { var t = this.element.style; t.height = "", t.position = "", t.width = "", this.items.forEach(function (t) { t.destroy() }), this.unbindResize(); var e = this.element.outlayerGUID; delete f[e], delete this.element.outlayerGUID, h && h.removeData(this.element, this.constructor.namespace) }, s.data = function (t) { t = o.getQueryElement(t); var e = t && t.outlayerGUID; return e && f[e] }, s.create = function (t, e) { var i = r(s); return i.defaults = o.extend({}, s.defaults), o.extend(i.defaults, e), i.compatOptions = o.extend({}, s.compatOptions), i.namespace = t, i.data = s.data, i.Item = r(n), o.htmlInit(i, t), h && h.bridget && h.bridget(t, i), i }; var m = { ms: 1, s: 1e3 }; return s.Item = n, s }), function (t, e) { "function" == typeof define && define.amd ? define("isotope-layout/js/item", ["outlayer/outlayer"], e) : "object" == typeof module && module.exports ? module.exports = e(require("outlayer")) : (t.Isotope = t.Isotope || {}, t.Isotope.Item = e(t.Outlayer)) }(window, function (t) { "use strict"; function e() { t.Item.apply(this, arguments) } var i = e.prototype = Object.create(t.Item.prototype), o = i._create; i._create = function () { this.id = this.layout.itemGUID++, o.call(this), this.sortData = {} }, i.updateSortData = function () { if (!this.isIgnored) { this.sortData.id = this.id, this.sortData["original-order"] = this.id, this.sortData.random = Math.random(); var t = this.layout.options.getSortData, e = this.layout._sorters; for (var i in t) { var o = e[i]; this.sortData[i] = o(this.element, this) } } }; var n = i.destroy; return i.destroy = function () { n.apply(this, arguments), this.css({ display: "" }) }, e }), function (t, e) { "function" == typeof define && define.amd ? define("isotope-layout/js/layout-mode", ["get-size/get-size", "outlayer/outlayer"], e) : "object" == typeof module && module.exports ? module.exports = e(require("get-size"), require("outlayer")) : (t.Isotope = t.Isotope || {}, t.Isotope.LayoutMode = e(t.getSize, t.Outlayer)) }(window, function (t, e) { "use strict"; function i(t) { this.isotope = t, t && (this.options = t.options[this.namespace], this.element = t.element, this.items = t.filteredItems, this.size = t.size) } var o = i.prototype, n = ["_resetLayout", "_getItemLayoutPosition", "_manageStamp", "_getContainerSize", "_getElementOffset", "needsResizeLayout", "_getOption"]; return n.forEach(function (t) { o[t] = function () { return e.prototype[t].apply(this.isotope, arguments) } }), o.needsVerticalResizeLayout = function () { var e = t(this.isotope.element), i = this.isotope.size && e; return i && e.innerHeight != this.isotope.size.innerHeight }, o._getMeasurement = function () { this.isotope._getMeasurement.apply(this, arguments) }, o.getColumnWidth = function () { this.getSegmentSize("column", "Width") }, o.getRowHeight = function () { this.getSegmentSize("row", "Height") }, o.getSegmentSize = function (t, e) { var i = t + e, o = "outer" + e; if (this._getMeasurement(i, o), !this[i]) { var n = this.getFirstItemSize(); this[i] = n && n[o] || this.isotope.size["inner" + e] } }, o.getFirstItemSize = function () { var e = this.isotope.filteredItems[0]; return e && e.element && t(e.element) }, o.layout = function () { this.isotope.layout.apply(this.isotope, arguments) }, o.getSize = function () { this.isotope.getSize(), this.size = this.isotope.size }, i.modes = {}, i.create = function (t, e) { function n() { i.apply(this, arguments) } return n.prototype = Object.create(o), n.prototype.constructor = n, e && (n.options = e), n.prototype.namespace = t, i.modes[t] = n, n }, i }), function (t, e) { "function" == typeof define && define.amd ? define("masonry-layout/masonry", ["outlayer/outlayer", "get-size/get-size"], e) : "object" == typeof module && module.exports ? module.exports = e(require("outlayer"), require("get-size")) : t.Masonry = e(t.Outlayer, t.getSize) }(window, function (t, e) { var i = t.create("masonry"); i.compatOptions.fitWidth = "isFitWidth"; var o = i.prototype; return o._resetLayout = function () { this.getSize(), this._getMeasurement("columnWidth", "outerWidth"), this._getMeasurement("gutter", "outerWidth"), this.measureColumns(), this.colYs = []; for (var t = 0; t < this.cols; t++)this.colYs.push(0); this.maxY = 0, this.horizontalColIndex = 0 }, o.measureColumns = function () { if (this.getContainerWidth(), !this.columnWidth) { var t = this.items[0], i = t && t.element; this.columnWidth = i && e(i).outerWidth || this.containerWidth } var o = this.columnWidth += this.gutter, n = this.containerWidth + this.gutter, s = n / o, r = o - n % o, a = r && r < 1 ? "round" : "floor"; s = Math[a](s), this.cols = Math.max(s, 1) }, o.getContainerWidth = function () { var t = this._getOption("fitWidth"), i = t ? this.element.parentNode : this.element, o = e(i); this.containerWidth = o && o.innerWidth }, o._getItemLayoutPosition = function (t) { t.getSize(); var e = t.size.outerWidth % this.columnWidth, i = e && e < 1 ? "round" : "ceil", o = Math[i](t.size.outerWidth / this.columnWidth); o = Math.min(o, this.cols); for (var n = this.options.horizontalOrder ? "_getHorizontalColPosition" : "_getTopColPosition", s = this[n](o, t), r = { x: this.columnWidth * s.col, y: s.y }, a = s.y + t.size.outerHeight, u = o + s.col, h = s.col; h < u; h++)this.colYs[h] = a; return r }, o._getTopColPosition = function (t) { var e = this._getTopColGroup(t), i = Math.min.apply(Math, e); return { col: e.indexOf(i), y: i } }, o._getTopColGroup = function (t) { if (t < 2) return this.colYs; for (var e = [], i = this.cols + 1 - t, o = 0; o < i; o++)e[o] = this._getColGroupY(o, t); return e }, o._getColGroupY = function (t, e) { if (e < 2) return this.colYs[t]; var i = this.colYs.slice(t, t + e); return Math.max.apply(Math, i) }, o._getHorizontalColPosition = function (t, e) { var i = this.horizontalColIndex % this.cols, o = t > 1 && i + t > this.cols; i = o ? 0 : i; var n = e.size.outerWidth && e.size.outerHeight; return this.horizontalColIndex = n ? i + t : this.horizontalColIndex, { col: i, y: this._getColGroupY(i, t) } }, o._manageStamp = function (t) { var i = e(t), o = this._getElementOffset(t), n = this._getOption("originLeft"), s = n ? o.left : o.right, r = s + i.outerWidth, a = Math.floor(s / this.columnWidth); a = Math.max(0, a); var u = Math.floor(r / this.columnWidth); u -= r % this.columnWidth ? 0 : 1, u = Math.min(this.cols - 1, u); for (var h = this._getOption("originTop"), d = (h ? o.top : o.bottom) + i.outerHeight, l = a; l <= u; l++)this.colYs[l] = Math.max(d, this.colYs[l]) }, o._getContainerSize = function () { this.maxY = Math.max.apply(Math, this.colYs); var t = { height: this.maxY }; return this._getOption("fitWidth") && (t.width = this._getContainerFitWidth()), t }, o._getContainerFitWidth = function () { for (var t = 0, e = this.cols; --e && 0 === this.colYs[e];)t++; return (this.cols - t) * this.columnWidth - this.gutter }, o.needsResizeLayout = function () { var t = this.containerWidth; return this.getContainerWidth(), t != this.containerWidth }, i }), function (t, e) { "function" == typeof define && define.amd ? define("isotope-layout/js/layout-modes/masonry", ["../layout-mode", "masonry-layout/masonry"], e) : "object" == typeof module && module.exports ? module.exports = e(require("../layout-mode"), require("masonry-layout")) : e(t.Isotope.LayoutMode, t.Masonry) }(window, function (t, e) { "use strict"; var i = t.create("masonry"), o = i.prototype, n = { _getElementOffset: !0, layout: !0, _getMeasurement: !0 }; for (var s in e.prototype) n[s] || (o[s] = e.prototype[s]); var r = o.measureColumns; o.measureColumns = function () { this.items = this.isotope.filteredItems, r.call(this) }; var a = o._getOption; return o._getOption = function (t) { return "fitWidth" == t ? void 0 !== this.options.isFitWidth ? this.options.isFitWidth : this.options.fitWidth : a.apply(this.isotope, arguments) }, i }), function (t, e) { "function" == typeof define && define.amd ? define("isotope-layout/js/layout-modes/fit-rows", ["../layout-mode"], e) : "object" == typeof exports ? module.exports = e(require("../layout-mode")) : e(t.Isotope.LayoutMode) }(window, function (t) { "use strict"; var e = t.create("fitRows"), i = e.prototype; return i._resetLayout = function () { this.x = 0, this.y = 0, this.maxY = 0, this._getMeasurement("gutter", "outerWidth") }, i._getItemLayoutPosition = function (t) { t.getSize(); var e = t.size.outerWidth + this.gutter, i = this.isotope.size.innerWidth + this.gutter; 0 !== this.x && e + this.x > i && (this.x = 0, this.y = this.maxY); var o = { x: this.x, y: this.y }; return this.maxY = Math.max(this.maxY, this.y + t.size.outerHeight), this.x += e, o }, i._getContainerSize = function () { return { height: this.maxY } }, e }), function (t, e) { "function" == typeof define && define.amd ? define("isotope-layout/js/layout-modes/vertical", ["../layout-mode"], e) : "object" == typeof module && module.exports ? module.exports = e(require("../layout-mode")) : e(t.Isotope.LayoutMode) }(window, function (t) { "use strict"; var e = t.create("vertical", { horizontalAlignment: 0 }), i = e.prototype; return i._resetLayout = function () { this.y = 0 }, i._getItemLayoutPosition = function (t) { t.getSize(); var e = (this.isotope.size.innerWidth - t.size.outerWidth) * this.options.horizontalAlignment, i = this.y; return this.y += t.size.outerHeight, { x: e, y: i } }, i._getContainerSize = function () { return { height: this.y } }, e }), function (t, e) { "function" == typeof define && define.amd ? define(["outlayer/outlayer", "get-size/get-size", "desandro-matches-selector/matches-selector", "fizzy-ui-utils/utils", "isotope-layout/js/item", "isotope-layout/js/layout-mode", "isotope-layout/js/layout-modes/masonry", "isotope-layout/js/layout-modes/fit-rows", "isotope-layout/js/layout-modes/vertical"], function (i, o, n, s, r, a) { return e(t, i, o, n, s, r, a) }) : "object" == typeof module && module.exports ? module.exports = e(t, require("outlayer"), require("get-size"), require("desandro-matches-selector"), require("fizzy-ui-utils"), require("isotope-layout/js/item"), require("isotope-layout/js/layout-mode"), require("isotope-layout/js/layout-modes/masonry"), require("isotope-layout/js/layout-modes/fit-rows"), require("isotope-layout/js/layout-modes/vertical")) : t.Isotope = e(t, t.Outlayer, t.getSize, t.matchesSelector, t.fizzyUIUtils, t.Isotope.Item, t.Isotope.LayoutMode) }(window, function (t, e, i, o, n, s, r) {
  function a(t, e) { return function (i, o) { for (var n = 0; n < t.length; n++) { var s = t[n], r = i.sortData[s], a = o.sortData[s]; if (r > a || r < a) { var u = void 0 !== e[s] ? e[s] : e, h = u ? 1 : -1; return (r > a ? 1 : -1) * h } } return 0 } } var u = t.jQuery, h = String.prototype.trim ? function (t) { return t.trim() } : function (t) { return t.replace(/^\s+|\s+$/g, "") }, d = e.create("isotope", { layoutMode: "masonry", isJQueryFiltering: !0, sortAscending: !0 }); d.Item = s, d.LayoutMode = r; var l = d.prototype; l._create = function () { this.itemGUID = 0, this._sorters = {}, this._getSorters(), e.prototype._create.call(this), this.modes = {}, this.filteredItems = this.items, this.sortHistory = ["original-order"]; for (var t in r.modes) this._initLayoutMode(t) }, l.reloadItems = function () { this.itemGUID = 0, e.prototype.reloadItems.call(this) }, l._itemize = function () { for (var t = e.prototype._itemize.apply(this, arguments), i = 0; i < t.length; i++) { var o = t[i]; o.id = this.itemGUID++ } return this._updateItemsSortData(t), t }, l._initLayoutMode = function (t) { var e = r.modes[t], i = this.options[t] || {}; this.options[t] = e.options ? n.extend(e.options, i) : i, this.modes[t] = new e(this) }, l.layout = function () { return !this._isLayoutInited && this._getOption("initLayout") ? void this.arrange() : void this._layout() }, l._layout = function () { var t = this._getIsInstant(); this._resetLayout(), this._manageStamps(), this.layoutItems(this.filteredItems, t), this._isLayoutInited = !0 }, l.arrange = function (t) { this.option(t), this._getIsInstant(); var e = this._filter(this.items); this.filteredItems = e.matches, this._bindArrangeComplete(), this._isInstant ? this._noTransition(this._hideReveal, [e]) : this._hideReveal(e), this._sort(), this._layout() }, l._init = l.arrange, l._hideReveal = function (t) { this.reveal(t.needReveal), this.hide(t.needHide) }, l._getIsInstant = function () { var t = this._getOption("layoutInstant"), e = void 0 !== t ? t : !this._isLayoutInited; return this._isInstant = e, e }, l._bindArrangeComplete = function () { function t() { e && i && o && n.dispatchEvent("arrangeComplete", null, [n.filteredItems]) } var e, i, o, n = this; this.once("layoutComplete", function () { e = !0, t() }), this.once("hideComplete", function () { i = !0, t() }), this.once("revealComplete", function () { o = !0, t() }) }, l._filter = function (t) { var e = this.options.filter; e = e || "*"; for (var i = [], o = [], n = [], s = this._getFilterTest(e), r = 0; r < t.length; r++) { var a = t[r]; if (!a.isIgnored) { var u = s(a); u && i.push(a), u && a.isHidden ? o.push(a) : u || a.isHidden || n.push(a) } } return { matches: i, needReveal: o, needHide: n } }, l._getFilterTest = function (t) {
    return u && this.options.isJQueryFiltering ? function (e) {
      return u(e.element).is(t);
    } : "function" == typeof t ? function (e) { return t(e.element) } : function (e) { return o(e.element, t) }
  }, l.updateSortData = function (t) { var e; t ? (t = n.makeArray(t), e = this.getItems(t)) : e = this.items, this._getSorters(), this._updateItemsSortData(e) }, l._getSorters = function () { var t = this.options.getSortData; for (var e in t) { var i = t[e]; this._sorters[e] = f(i) } }, l._updateItemsSortData = function (t) { for (var e = t && t.length, i = 0; e && i < e; i++) { var o = t[i]; o.updateSortData() } }; var f = function () { function t(t) { if ("string" != typeof t) return t; var i = h(t).split(" "), o = i[0], n = o.match(/^\[(.+)\]$/), s = n && n[1], r = e(s, o), a = d.sortDataParsers[i[1]]; return t = a ? function (t) { return t && a(r(t)) } : function (t) { return t && r(t) } } function e(t, e) { return t ? function (e) { return e.getAttribute(t) } : function (t) { var i = t.querySelector(e); return i && i.textContent } } return t }(); d.sortDataParsers = { parseInt: function (t) { return parseInt(t, 10) }, parseFloat: function (t) { return parseFloat(t) } }, l._sort = function () { if (this.options.sortBy) { var t = n.makeArray(this.options.sortBy); this._getIsSameSortBy(t) || (this.sortHistory = t.concat(this.sortHistory)); var e = a(this.sortHistory, this.options.sortAscending); this.filteredItems.sort(e) } }, l._getIsSameSortBy = function (t) { for (var e = 0; e < t.length; e++)if (t[e] != this.sortHistory[e]) return !1; return !0 }, l._mode = function () { var t = this.options.layoutMode, e = this.modes[t]; if (!e) throw new Error("No layout mode: " + t); return e.options = this.options[t], e }, l._resetLayout = function () { e.prototype._resetLayout.call(this), this._mode()._resetLayout() }, l._getItemLayoutPosition = function (t) { return this._mode()._getItemLayoutPosition(t) }, l._manageStamp = function (t) { this._mode()._manageStamp(t) }, l._getContainerSize = function () { return this._mode()._getContainerSize() }, l.needsResizeLayout = function () { return this._mode().needsResizeLayout() }, l.appended = function (t) { var e = this.addItems(t); if (e.length) { var i = this._filterRevealAdded(e); this.filteredItems = this.filteredItems.concat(i) } }, l.prepended = function (t) { var e = this._itemize(t); if (e.length) { this._resetLayout(), this._manageStamps(); var i = this._filterRevealAdded(e); this.layoutItems(this.filteredItems), this.filteredItems = i.concat(this.filteredItems), this.items = e.concat(this.items) } }, l._filterRevealAdded = function (t) { var e = this._filter(t); return this.hide(e.needHide), this.reveal(e.matches), this.layoutItems(e.matches, !0), e.matches }, l.insert = function (t) { var e = this.addItems(t); if (e.length) { var i, o, n = e.length; for (i = 0; i < n; i++)o = e[i], this.element.appendChild(o.element); var s = this._filter(e).matches; for (i = 0; i < n; i++)e[i].isLayoutInstant = !0; for (this.arrange(), i = 0; i < n; i++)delete e[i].isLayoutInstant; this.reveal(s) } }; var c = l.remove; return l.remove = function (t) { t = n.makeArray(t); var e = this.getItems(t); c.call(this, t); for (var i = e && e.length, o = 0; i && o < i; o++) { var s = e[o]; n.removeFrom(this.filteredItems, s) } }, l.shuffle = function () { for (var t = 0; t < this.items.length; t++) { var e = this.items[t]; e.sortData.random = Math.random() } this.options.sortBy = "random", this._sort(), this._layout() }, l._noTransition = function (t, e) { var i = this.options.transitionDuration; this.options.transitionDuration = 0; var o = t.apply(this, e); return this.options.transitionDuration = i, o }, l.getFilteredItemElements = function () { return this.filteredItems.map(function (t) { return t.element }) }, d
});



/* Chocolat-1.0.4 */
/* jQuery plugin for lightbox */
!function () {
  "use strict";
  let e = void 0;
  function t(e, t) {
    return new Promise(s => {
      const i = () => {
        t.removeEventListener("transitionend", i),
          s()
      }
        ;
      t.addEventListener("transitionend", i);
      const l = t.getAttribute("class")
        , n = t.getAttribute("style");
      e(),
        l === t.getAttribute("class") && n === t.getAttribute("style") && i(),
        0 === parseFloat(getComputedStyle(t).transitionDuration) && i()
    }
    )
  }
  function s({ src: e, srcset: t, sizes: s }) {
    const i = new Image;
    return i.src = e,
      t && (i.srcset = t),
      s && (i.sizes = s),
      "decode" in i ? new Promise((e, t) => {
        i.decode().then(() => {
          e(i)
        }
        ).catch(() => {
          t(i)
        }
        )
      }
      ) : new Promise((e, t) => {
        i.onload = e(i),
          i.onerror = t(i)
      }
      )
  }
  function i(e) {
    let t, s;
    const { imgHeight: i, imgWidth: l, containerHeight: n, containerWidth: a, canvasWidth: o, canvasHeight: c, imageSize: h } = e
      , r = i / l;
    return "cover" == h ? r < n / a ? s = (t = n) / r : t = (s = a) * r : "native" == h ? (t = i,
      s = l) : (r > c / o ? s = (t = c) / r : t = (s = o) * r,
        "scale-down" === h && (s >= l || t >= i) && (s = l,
          t = i)),
    {
      height: t,
      width: s
    }
  }
  function l(e) {
    return e.requestFullscreen ? e.requestFullscreen() : e.webkitRequestFullscreen ? e.webkitRequestFullscreen() : e.msRequestFullscreen ? e.msRequestFullscreen() : Promise.reject()
  }
  function n() {
    return document.exitFullscreen ? document.exitFullscreen() : document.webkitExitFullscreen ? document.webkitExitFullscreen() : document.msExitFullscreen ? document.msExitFullscreen() : Promise.reject()
  }
  const a = {
    container: document.body,
    className: void 0,
    imageSize: "scale-down",
    fullScreen: !1,
    loop: !1,
    linkImages: !0,
    setIndex: 0,
    firstImageIndex: 0,
    lastImageIndex: !1,
    currentImageIndex: void 0,
    allowZoom: !0,
    closeOnBackgroundClick: !0,
    setTitle: function () {
      return ""
    },
    description: function () {
      return this.images[this.settings.currentImageIndex].title
    },
    pagination: function () {
      const e = this.settings.lastImageIndex + 1;
      return this.settings.currentImageIndex + 1 + "/" + e
    },
    afterInitialize() { },
    afterMarkup() { },
    afterImageLoad() { },
    afterClose() { },
    zoomedPaddingX: function (e, t) {
      return 0
    },
    zoomedPaddingY: function (e, t) {
      return 0
    }
  };
  class o {
    constructor(e, t) {
      this.settings = t,
        this.elems = {},
        this.images = [],
        this.events = [],
        this.state = {
          fullScreenOpen: !1,
          initialZoomState: null,
          initialized: !1,
          timer: !1,
          visible: !1
        },
        this._cssClasses = ["chocolat-open", "chocolat-in-container", "chocolat-cover", "chocolat-zoomable", "chocolat-zoomed", "chocolat-zooming-in", "chocolat-zooming-out"],
        NodeList.prototype.isPrototypeOf(e) || HTMLCollection.prototype.isPrototypeOf(e) ? e.forEach((e, t) => {
          this.images.push({
            title: e.getAttribute("title"),
            src: e.getAttribute("href"),
            srcset: e.getAttribute("data-srcset"),
            sizes: e.getAttribute("data-sizes")
          }),
            this.off(e, "click.chocolat"),
            this.on(e, "click.chocolat", e => {
              this.init(t),
                e.preventDefault()
            }
            )
        }
        ) : this.images = e,
        this.settings.container instanceof Element || this.settings.container instanceof HTMLElement ? this.elems.container = this.settings.container : this.elems.container = document.body,
        this.api = {
          open: e => (e = parseInt(e) || 0,
            this.init(e)),
          close: () => this.close(),
          next: () => this.change(1),
          prev: () => this.change(-1),
          goto: e => this.open(e),
          current: () => this.settings.currentImageIndex,
          position: () => this.position(this.elems.img),
          destroy: () => this.destroy(),
          set: (e, t) => (this.settings[e] = t,
            t),
          get: e => this.settings[e],
          getElem: e => this.elems[e]
        }
    }
    init(e) {
      return this.state.initialized || (this.markup(),
        this.attachListeners(),
        this.settings.lastImageIndex = this.images.length - 1,
        this.state.initialized = !0),
        this.settings.afterInitialize.call(this),
        this.load(e)
    }
    load(e) {
      if (this.state.visible || (this.state.visible = !0,
        setTimeout(() => {
          this.elems.overlay.classList.add("chocolat-visible"),
            this.elems.wrapper.classList.add("chocolat-visible")
        }
          , 0),
        this.elems.container.classList.add("chocolat-open")),
        this.settings.fullScreen && l(this.elems.wrapper),
        this.settings.currentImageIndex === e)
        return Promise.resolve();
      let i, n, a = setTimeout(() => {
        this.elems.loader.classList.add("chocolat-visible")
      }
        , 1e3), o = setTimeout(() => {
          o = void 0,
            i = t(() => {
              this.elems.imageCanvas.classList.remove("chocolat-visible")
            }
              , this.elems.imageCanvas)
        }
          , 80);
      return s(this.images[e]).then(e => (n = e,
        o ? (clearTimeout(o),
          Promise.resolve()) : i)).then(() => {
            const t = e + 1;
            return null != this.images[t] && s(this.images[t]),
              this.settings.currentImageIndex = e,
              this.elems.description.textContent = this.settings.description.call(this),
              this.elems.pagination.textContent = this.settings.pagination.call(this),
              this.arrows(),
              this.position(n).then(() => (this.elems.loader.classList.remove("chocolat-visible"),
                clearTimeout(a),
                this.appear(n)))
          }
          ).then(() => {
            this.elems.container.classList.toggle("chocolat-zoomable", this.zoomable(n, this.elems.wrapper)),
              this.settings.afterImageLoad.call(this)
          }
          )
    }
    position({ naturalHeight: e, naturalWidth: s }) {
      const l = {
        imgHeight: e,
        imgWidth: s,
        containerHeight: this.elems.container.clientHeight,
        containerWidth: this.elems.container.clientWidth,
        canvasWidth: this.elems.imageCanvas.clientWidth,
        canvasHeight: this.elems.imageCanvas.clientHeight,
        imageSize: this.settings.imageSize
      }
        , { width: n, height: a } = i(l);
      return t(() => {
        Object.assign(this.elems.imageWrapper.style, {
          width: n + "px",
          height: a + "px"
        })
      }
        , this.elems.imageWrapper)
    }
    appear(e) {
      return this.elems.imageWrapper.removeChild(this.elems.img),
        this.elems.img = e,
        this.elems.img.setAttribute("class", "chocolat-img"),
        this.elems.imageWrapper.appendChild(this.elems.img),
        t(() => {
          this.elems.imageCanvas.classList.add("chocolat-visible")
        }
          , this.elems.imageCanvas)
    }
    change(e) {
      if (!this.state.visible)
        return;
      if (!this.settings.linkImages)
        return;
      this.zoomOut();
      const t = this.settings.currentImageIndex + parseInt(e);
      if (t > this.settings.lastImageIndex) {
        if (this.settings.loop)
          return this.load(this.settings.firstImageIndex)
      } else {
        if (!(t < this.settings.firstImageIndex))
          return this.load(t);
        if (this.settings.loop)
          return this.load(this.settings.lastImageIndex)
      }
    }
    arrows() {
      this.settings.loop ? (this.elems.left.classList.add("active"),
        this.elems.right.classList.add("active")) : this.settings.linkImages ? (this.elems.right.classList.toggle("active", this.settings.currentImageIndex !== this.settings.lastImageIndex),
          this.elems.left.classList.toggle("active", this.settings.currentImageIndex !== this.settings.firstImageIndex)) : (this.elems.left.classList.remove("active"),
            this.elems.right.classList.remove("active"))
    }
    close() {
      if (this.state.fullScreenOpen)
        return void n();
      this.state.visible = !1;
      const e = t(() => {
        this.elems.overlay.classList.remove("chocolat-visible")
      }
        , this.elems.overlay)
        , s = t(() => {
          this.elems.wrapper.classList.remove("chocolat-visible")
        }
          , this.elems.wrapper);
      return Promise.all([e, s]).then(() => {
        this.elems.container.classList.remove("chocolat-open"),
          this.settings.afterClose.call(this)
      }
      )
    }
    destroy() {
      for (let e = this.events.length - 1; e >= 0; e--) {
        const { element: t, eventName: s } = this.events[e];
        this.off(t, s)
      }
      this.state.initialized && (this.state.fullScreenOpen && n(),
        this.settings.currentImageIndex = void 0,
        this.state.visible = !1,
        this.state.initialized = !1,
        this.elems.container.classList.remove(...this._cssClasses),
        this.elems.wrapper.parentNode.removeChild(this.elems.wrapper))
    }
    markup() {
      this.elems.container.classList.add("chocolat-open", this.settings.className),
        "cover" == this.settings.imageSize && this.elems.container.classList.add("chocolat-cover"),
        this.elems.container !== document.body && this.elems.container.classList.add("chocolat-in-container"),
        this.elems.wrapper = document.createElement("div"),
        this.elems.wrapper.setAttribute("id", "chocolat-content-" + this.settings.setIndex),
        this.elems.wrapper.setAttribute("class", "chocolat-wrapper"),
        this.elems.container.appendChild(this.elems.wrapper),
        this.elems.overlay = document.createElement("div"),
        this.elems.overlay.setAttribute("class", "chocolat-overlay"),
        this.elems.wrapper.appendChild(this.elems.overlay),
        this.elems.loader = document.createElement("div"),
        this.elems.loader.setAttribute("class", "chocolat-loader"),
        this.elems.wrapper.appendChild(this.elems.loader),
        this.elems.layout = document.createElement("div"),
        this.elems.layout.setAttribute("class", "chocolat-layout"),
        this.elems.wrapper.appendChild(this.elems.layout),
        this.elems.top = document.createElement("div"),
        this.elems.top.setAttribute("class", "chocolat-top"),
        this.elems.layout.appendChild(this.elems.top),
        this.elems.center = document.createElement("div"),
        this.elems.center.setAttribute("class", "chocolat-center"),
        this.elems.layout.appendChild(this.elems.center),
        this.elems.left = document.createElement("div"),
        this.elems.left.setAttribute("class", "chocolat-left"),
        this.elems.center.appendChild(this.elems.left),
        this.elems.imageCanvas = document.createElement("div"),
        this.elems.imageCanvas.setAttribute("class", "chocolat-image-canvas"),
        this.elems.center.appendChild(this.elems.imageCanvas),
        this.elems.imageWrapper = document.createElement("div"),
        this.elems.imageWrapper.setAttribute("class", "chocolat-image-wrapper"),
        this.elems.imageCanvas.appendChild(this.elems.imageWrapper),
        this.elems.img = document.createElement("img"),
        this.elems.img.setAttribute("class", "chocolat-img"),
        this.elems.imageWrapper.appendChild(this.elems.img),
        this.elems.right = document.createElement("div"),
        this.elems.right.setAttribute("class", "chocolat-right"),
        this.elems.center.appendChild(this.elems.right),
        this.elems.bottom = document.createElement("div"),
        this.elems.bottom.setAttribute("class", "chocolat-bottom"),
        this.elems.layout.appendChild(this.elems.bottom),
        this.elems.close = document.createElement("span"),
        this.elems.close.setAttribute("class", "chocolat-close"),
        this.elems.top.appendChild(this.elems.close),
        this.elems.description = document.createElement("span"),
        this.elems.description.setAttribute("class", "chocolat-description"),
        this.elems.bottom.appendChild(this.elems.description),
        this.elems.pagination = document.createElement("span"),
        this.elems.pagination.setAttribute("class", "chocolat-pagination"),
        this.elems.bottom.appendChild(this.elems.pagination),
        this.elems.setTitle = document.createElement("span"),
        this.elems.setTitle.setAttribute("class", "chocolat-set-title"),
        this.elems.setTitle.textContent = this.settings.setTitle(),
        this.elems.bottom.appendChild(this.elems.setTitle),
        this.elems.fullscreen = document.createElement("span"),
        this.elems.fullscreen.setAttribute("class", "chocolat-fullscreen"),
        this.elems.bottom.appendChild(this.elems.fullscreen),
        this.settings.afterMarkup.call(this)
    }
    attachListeners() {
      this.off(document, "keydown.chocolat"),
        this.on(document, "keydown.chocolat", e => {
          this.state.initialized && (37 == e.keyCode ? this.change(-1) : 39 == e.keyCode ? this.change(1) : 27 == e.keyCode && this.close())
        }
        );
      const t = this.elems.wrapper.querySelector(".chocolat-right");
      this.off(t, "click.chocolat"),
        this.on(t, "click.chocolat", () => {
          this.change(1)
        }
        );
      const s = this.elems.wrapper.querySelector(".chocolat-left");
      this.off(s, "click.chocolat"),
        this.on(s, "click.chocolat", () => {
          this.change(-1)
        }
        ),
        this.off(this.elems.close, "click.chocolat"),
        this.on(this.elems.close, "click.chocolat", this.close.bind(this)),
        this.off(this.elems.fullscreen, "click.chocolat"),
        this.on(this.elems.fullscreen, "click.chocolat", () => {
          this.state.fullScreenOpen ? n() : l(this.elems.wrapper)
        }
        ),
        this.off(document, "fullscreenchange.chocolat"),
        this.on(document, "fullscreenchange.chocolat", () => {
          document.fullscreenElement || document.webkitCurrentFullScreenElement || document.webkitFullscreenElement ? this.state.fullScreenOpen = !0 : this.state.fullScreenOpen = !1
        }
        ),
        this.off(document, "webkitfullscreenchange.chocolat"),
        this.on(document, "webkitfullscreenchange.chocolat", () => {
          document.fullscreenElement || document.webkitCurrentFullScreenElement || document.webkitFullscreenElement ? this.state.fullScreenOpen = !0 : this.state.fullScreenOpen = !1
        }
        ),
        this.settings.closeOnBackgroundClick && (this.off(this.elems.overlay, "click.chocolat"),
          this.on(this.elems.overlay, "click.chocolat", this.close.bind(this))),
        this.off(this.elems.wrapper, "click.chocolat"),
        this.on(this.elems.wrapper, "click.chocolat", () => {
          null !== this.state.initialZoomState && this.state.visible && (this.elems.container.classList.add("chocolat-zooming-out"),
            this.zoomOut().then(() => {
              this.elems.container.classList.remove("chocolat-zoomed"),
                this.elems.container.classList.remove("chocolat-zooming-out")
            }
            ))
        }
        ),
        this.off(this.elems.imageWrapper, "click.chocolat"),
        this.on(this.elems.imageWrapper, "click.chocolat", e => {
          null === this.state.initialZoomState && this.elems.container.classList.contains("chocolat-zoomable") && (e.stopPropagation(),
            this.elems.container.classList.add("chocolat-zooming-in"),
            this.zoomIn(e).then(() => {
              this.elems.container.classList.add("chocolat-zoomed"),
                this.elems.container.classList.remove("chocolat-zooming-in")
            }
            ))
        }
        ),
        this.on(this.elems.wrapper, "mousemove.chocolat", e => {
          if (null === this.state.initialZoomState || !this.state.visible)
            return;
          const t = this.elems.wrapper.getBoundingClientRect()
            , s = t.top + window.scrollY
            , i = t.left + window.scrollX
            , l = this.elems.wrapper.clientHeight
            , n = this.elems.wrapper.clientWidth
            , a = this.elems.img.width
            , o = this.elems.img.height
            , c = [e.pageX - n / 2 - i, e.pageY - l / 2 - s];
          let h = 0;
          if (a > n) {
            const e = this.settings.zoomedPaddingX(a, n);
            h = c[0] / (n / 2),
              h *= (a - n) / 2 + e
          }
          let r = 0;
          if (o > l) {
            const e = this.settings.zoomedPaddingY(o, l);
            r = c[1] / (l / 2),
              r *= (o - l) / 2 + e
          }
          this.elems.img.style.marginLeft = -h + "px",
            this.elems.img.style.marginTop = -r + "px"
        }
        ),
        this.on(window, "resize.chocolat", t => {
          this.state.initialized && this.state.visible && function (t, s) {
            clearTimeout(e),
              e = setTimeout(function () {
                s()
              }, t)
          }(50, () => {
            const e = {
              imgHeight: this.elems.img.naturalHeight,
              imgWidth: this.elems.img.naturalWidth,
              containerHeight: this.elems.wrapper.clientHeight,
              containerWidth: this.elems.wrapper.clientWidth,
              canvasWidth: this.elems.imageCanvas.clientWidth,
              canvasHeight: this.elems.imageCanvas.clientHeight,
              imageSize: this.settings.imageSize
            }
              , { width: t, height: s } = i(e);
            this.position(this.elems.img).then(() => {
              this.elems.container.classList.toggle("chocolat-zoomable", this.zoomable(this.elems.img, this.elems.wrapper))
            }
            )
          }
          )
        }
        )
    }
    zoomable(e, t) {
      const s = t.clientWidth
        , i = t.clientHeight
        , l = !(!this.settings.allowZoom || !(e.naturalWidth > s || e.naturalHeight > i))
        , n = e.clientWidth > e.naturalWidth || e.clientHeight > e.naturalHeight;
      return l && !n
    }
    zoomIn(e) {
      return this.state.initialZoomState = this.settings.imageSize,
        this.settings.imageSize = "native",
        this.position(this.elems.img)
    }
    zoomOut(e) {
      return this.settings.imageSize = this.state.initialZoomState || this.settings.imageSize,
        this.state.initialZoomState = null,
        this.elems.img.style.margin = 0,
        this.position(this.elems.img)
    }
    on(e, t, s) {
      const i = this.events.push({
        element: e,
        eventName: t,
        cb: s
      });
      e.addEventListener(t.split(".")[0], this.events[i - 1].cb)
    }
    off(e, t) {
      const s = this.events.findIndex(s => s.element === e && s.eventName === t);
      this.events[s] && (e.removeEventListener(t.split(".")[0], this.events[s].cb),
        this.events.splice(s, 1))
    }
  }
  const c = [];
  window.Chocolat = function (e, t) {
    const s = Object.assign({}, a, {
      images: []
    }, t, {
      setIndex: c.length
    })
      , i = new o(e, s);
    return c.push(i),
      i
  }
}();