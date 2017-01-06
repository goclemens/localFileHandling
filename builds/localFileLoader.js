(function (global, factory) {
    typeof exports === 'object' && typeof module !== 'undefined' ? module.exports = factory() :
    typeof define === 'function' && define.amd ? define(factory) :
    (global.localFileLoader = factory());
}(this, (function () { 'use strict';

//#####################
// --- INPUTS ---
// file - takes path of a file
// cFunc - callback function with the ascii string as argument after loading
//#####################

function asciiFileLoader(filePath,cFunc) {

  console.log("start loading 'ascii' file - "+filePath);
  var rawFile = new XMLHttpRequest();
  rawFile.overrideMimeType('text/plain');   // override default XML reader (syntax error)
  rawFile.open("GET", filePath, true);

  // .onreadystatechange fires after rawFile.send()
  rawFile.onreadystatechange = function ()
  {   
    if(rawFile.readyState === 4)
    {   
      if(rawFile.status === 200 || rawFile.status == 0)
      {
        console.log("loaded "+filePath);
        cFunc(rawFile.responseText);
      }
    }
  };
  
  rawFile.send();
}

//##############################################
//  JSON data loading script for testing
//  -------------------------------------------
//  input filePath: "folder/filename.json"
//        cFunc: callback function with the jsonObject as argument
//
//##############################################
function loadLocalJSON(filePath, cFunc)
{   
    var rawFile = new XMLHttpRequest();
    rawFile.overrideMimeType('text/plain');   // override default XML reader (otherwise syntax error)
    rawFile.open("GET", filePath, true);
    
    rawFile.onreadystatechange = function ()
    {   
        if(rawFile.readyState === 4)
        {
            if(rawFile.status === 200 || rawFile.status == 0)
            {   
                try {
                  var jsonObject = JSON.parse(rawFile.responseText);// !! overrides global variable !!
                }catch(e) {
                  console.log("ERROR loadLocalJson - "+e);
                  console.log("ERROR loadLocalJson - could not load file, returning empty object");
                  var emptyObject = {};
                  cFunc(emptyObject);
                  return;
                }

                console.log("loadLocalJSON - File loaded: "+filePath);
                cFunc(jsonObject);
            }
        }
    };
    
    rawFile.send();
    
}

//#####################
// --- INPUTS ---
// files - array of filepaths
// targetObj - Reference to an js object to save the loaded data in
// cFunc - callback function with the ascii string as argument after loading
//#####################
function localFileLoader(files,targetObj,cFunc,cArguments) {

  // handle optional arguments
  if ( cfunc === undefined ) {

    // define it as empty function so it can be called
    var cFunc = function(){return;};

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
  console.log("fileLoader - "+files.length+" files in queue");

  var handlers = {};

  handlers.handleTXT = function(filePath) {

    var fileName = getFileName(filePath);
    asciiFileLoader(filePath, function(data){
      targetObj[fileName] = data;
    });
    checkFinished();

  };

  handlers.handleJSON = function(filePath) {

    var fileName = getFileName(filePath);
    loadLocalJSON(filePath, function(jsonObject){
      targetObj[fileName] = jsonObject;
    });
    checkFinished();

  };



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
    console.log(fileLoadCount+" files loaded");
    if (fileLoadCount == fileLoadThreshold) {      
      console.log("loadOBJMehses - callback: "+cFunc.name);
      cFunc(targetObj);      
    } else {
      fileLoadCount++;
    }
  }


}

return localFileLoader;

})));
