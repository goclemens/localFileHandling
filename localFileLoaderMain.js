//#####################
// --- INPUTS ---
// files - array of filepaths
// targetObj - Reference to an js object to save the loaded data in
// cFunc - callback function with the ascii string as argument after loading
//#####################
import { handlers } from './handlers/handlers.js';

import { getFileExt } from './helpers/getFileExt.js';
import { getFileName } from './helpers/getFileName.js';

function localFileLoader(files,cFunc,targetObj) {

  // ---- handle optional arguments ----
  if ( cFunc === undefined ) {

    // define it as empty function so it can be called
    var cFunc = function(){return;}

  }
  if ( targetObj === undefined ) {

    // define it as empty function so it can be called
    var targetObj = {};

  }
  // -----------------------------------

  // --- scope variables ---
  var fileLoadCount = 0;
  var fileLoadThreshold = files.length;
  console.log("fileLoader - "+files.length+" files in queue")
  // -----------------------
  


  // --- MAIN FUNCIONALITY ---
  // main loop  over all files

  for (var i = 0; i < files.lenth; i++) {

    curFileExt = getFileExt(files[i]).toLowerCase();

    if (handlers.ext[curFileExt] !== undefined) {
      // wrapper function to scope "fileName"
      (function(){
        var fileName = getFileName(files[i]);
        handlers[handlers.ext[curFileExt]](files[i],function(dataObject){
          targetObj[fileName] = dataObject;
          checkFinished();          
        });
      })();

    } else {

      console.log("localFileLoader - '"+files[i]+"' is not supported");
      checkFinished();

    }

  }

  //------ scope helpers ------

  // checks if all files are loaded and calls the callback function
  function checkFinished () {
    console.log(fileLoadCount+" files loaded")
    if (fileLoadCount == fileLoadThreshold) {      
      console.log("localFileLoader - callback: "+cFunc.name);
      cFunc(targetObj);      
    } else {
      fileLoadCount++;
    }
  }


}

export default localFileLoader ;