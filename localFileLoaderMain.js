//#####################
// --- INPUTS ---
// files - array of filepaths
// targetObj - Reference to an js object to save the loaded data in
// cFunc - callback function with the ascii string as argument after loading
//#####################
import { asciiFileLoader } from './loaders/asciiFileLoader.js';
import { loadLocalJSON } from './loaders/loadLocalJSON.js';

function localFileLoader(files,targetObj,cFunc,cArguments) {

  // handle optional arguments
  if ( cfunc === undefined ) {

    // define it as empty function so it can be called
    var cFunc = function(){return;}

  }
  if ( targetObj === undefined ) {

    // define it as empty function so it can be called
    var targetObj = {};

  }

  var extHandlers = { "txt"  : "handleTXT",
                      "json" : "handleJSON" 
                    };

  var fileLoadCount = 0;
  var fileLoadThreshold = files.length;
  console.log("fileLoader - "+files.length+" files in queue")

  var handlers = {};

  handlers.handleTXT = function(filePath) {

    var fileName = getFileName(filePath);
    asciiFileLoader(filePath, function(data){
      targetObj[fileName] = data;
    });
    checkFinished();

  }

  handlers.handleJSON = function(filePath) {

    var fileName = getFileName(filePath);
    loadLocalJSON(filePath, function(jsonObject){
      targetObj[fileName] = jsonObject;
    });
    checkFinished();

  }



  for (var i = 0; i < files.lenth; i++) {
    curFileExt = getFileExt(files[i]);
    if (extHandlers[curFileExt] !== undefined) {      
      handlers[extHandlers[curFileExt]](files[i]);
    } else {
      console.log("localFileLoader - '"+files[i]+"' is not supported");
    }
  }

  //------ helpers ------

  function getFileName(filePath) {
    return filePath.split('/').pop();
  }

  function getFileExt(filePath) {
    return filePath.substr((~-fname.lastIndexOf(".") >>> 0) + 2); 
  }

  // checks if all files are loaded and calls the callback function
  function checkFinished () {
    console.log(fileLoadCount+" files loaded")
    if (fileLoadCount == fileLoadThreshold) {      
      console.log("loadOBJMehses - callback: "+cFunc.name);
      cFunc(targetObj);      
    } else {
      fileLoadCount++;
    }
  }


}

export default  localFileLoader ;