"use strict";

const renderer = require("./renderer.cjs");

hexo.config.djot = Object.assign({}, hexo.config.djot);

// disable nunjucks to prevent html inject to source.
// djot do not support raw html in source text.
renderer.disableNunjucks = true;

hexo.extend.renderer.register("dj", "html", renderer, true);
hexo.extend.renderer.register("djot", "html", renderer, true);
