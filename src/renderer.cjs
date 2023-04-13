"use strict";
const djot = require("@djot/djot");
const katex = require("katex");

function renderer(data, _) {
    // render excerpt sign to raw html
    const rExcerpt = /<!-- ?more ?-->/i;
    data.text = data.text.replace(rExcerpt, "``` =html\n<!-- more -->\n```");

    /** @type {import("@djot/djot/types/parse").ParseOptions} */
    const parseOptions = {};
    this.execFilterSync("djot:parse", parseOptions);

    /** @type {import("@djot/djot/types/html").HTMLRenderOptions["overrides"]} */
    const renderOverrides = {
        inline_math: (node) => {
            try {
                return katex.renderToString(node.text, { output: "mathml" });
            } catch (e) {
                console.error(e);
                return `<span class="math inline">${node.text}</span>`;
            }
        },
        display_math: (node) => {
            try {
                return katex.renderToString(node.text, {
                    displayMode: true,
                    output: "mathml",
                });
            } catch (e) {
                console.error(e);
                return `<span class="math inline">${node.text}</span>`;
            }
        },
    };
    this.execFilterSync("djot:renderer", renderOverrides);

    return djot.renderHTML(djot.parse(data.text, parseOptions), {
        overrides: renderOverrides,
    });
}

module.exports = renderer;
