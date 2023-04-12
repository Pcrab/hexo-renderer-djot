"use strict"
const rExcerpt = /<!-- ?more ?-->/i;
const djot = require("@djot/djot");
const katex = require("katex");

function renderer(data, options) {

    data.text = data.text.replace(rExcerpt, "``` =html\n<!-- more -->\n```");

    const parseOptions = {}
    this.execFilterSync("djot:parse", parseOptions);

    const renderOverrides = {
        inline_math: (node) => {
            try {
                return katex.renderToString(node.text, {output: "mathml"});
            } catch(e) {
                console.error(e);
                return `<span class="math inline">${node.text}</span>`
            }
        },
        display_math: (node) => {
            try {
                return katex.renderToString(node.text, {displayMode: true, output: "mathml"});
            } catch(e) {
                console.error(e);
                return `<span class="math inline">${node.text}</span>`
            }
        },
    }
    this.execFilterSync("djot:renderer", renderOverrides);

    return djot.renderHTML(djot.parse(data.text, parseOptions), {overrides: renderOverrides});
}

module.exports = renderer;