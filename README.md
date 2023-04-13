# Hexo Renderer Djot

Add support for [Djot](https://djot.net). It uses official [djot.js](https://github.com/jgm/djot.js)
to parse Djot files.

## Installation

``` bash
pnpm add hexo-renderer-djot
```

## Important Note

### Raw HTML

Djot do not support raw HTML in its source file, so the renderer will disable nunjucks since
they are not compatible.

If you want to add any HTML in your Djot file, you can use `Raw block` in Djot.

````plaintext
``` =html
<div>some raw html</div>
```
````

### Post Asset Folder

Since hexo version `6.1.0`, If trying to use both markdown and djot at the same time,
`post_asset_folder` must be set to `false`. Currently hexo depends on ext of `new_post_name`
to determine whether a file in `source` folder is renderable or not if `post_asset_folder`
is set to `true` to prevent render of asset files.

Its `false` by default, so you don't need to worry if you haven't set it before.

## Configuration

Currently only support setting katex output format.

``` yaml
djot:
    math:
        output: "html" | "mathml"
```
