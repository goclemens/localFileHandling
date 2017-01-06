This project is a collection of file loaders and handlers for different formats.

Loading is done by XmlHTTPRequest

more Informations are following

ps.:

build bundle with rollup.js:

for configuration see "rollup.config.js"
execute in root directory
rollup -c

minify with uglify.js:

execute in builds directory
uglifyjs localFileLoader.js --output localFileLoader.min.js (--mangle)