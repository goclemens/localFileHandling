#Local File Loader
This project is a collection of file loaders and handlers for different formats. Loading is done by XMLHttpRequest() with a path to the file. It returns a predefined js-object depending on the file format.

####Building

- build bundle with **rollup.js**:

for configuration see "rollup.config.js" 

execute in root directory  
rollup -c

- minify with **uglify.js**:

execute in builds directory  
uglifyjs localFileLoader.js --output localFileLoader.min.js (--mangle)