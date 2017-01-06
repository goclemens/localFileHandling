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

function handleTXT (filePath,cFunc) {

  asciiFileLoader(filePath, function(data){
    cFunc(data);
  });  

}

function parseJSON() {
  try {
    var jsonObject = JSON.parse(rawFile.responseText);
    return jsonObject;
  } catch(e) {
    console.log("ERROR parseJSON - "+e);
    console.log("ERROR parseJSON - could not parse string, returning empty object");
    var emptyObject = {};
    return emptyObject;
  }

}

function handleJSON (filePath,cFunc) {

  asciiFileLoader(filePath, function(data){
    var jsonObject = parseJSON(data);
    cFunc(jsonObject);
  });  

}

//// CSV extension handler

function parseCSV (fileContent) {

  var fileData = {};
  var lines = fileContent.split(/\r\n|\n/);
    
  var tableHead = lines[0].split(',');
  tableHead.forEach( function (value, index){

    tableHead[index] = tableHead[index].trim();   // trim the name of the row
    fileData[tableHead[index]] = [];              // create a new subobject for every row in the CSV file

  });
  for (var i=1; i < lines.length; i++) {          // loop through all lines except the tablehead

    var cells = lines[i].split(',');              // split each line in its cells as an array
    cells.forEach( function (value, index) {      // loop through all cells in a line

      value = value.trim();                       // remove all whitespaces in a cell
      fileData[tableHead[index]].push(value);     // add the value of the cell to the corresponding entry 

    });

  }
  console.log("handleCSV return");
  return fileData;
}

function handleCSV (filePath,cFunc) {

  asciiFileLoader(filePath, function(data){
    var jsObject = parseCSV(data);
    cFunc(jsObject);
  });  

}

var handlers = {};

handlers.ext =  { "txt"  : "handleTXT",
                  "json" : "handleJSON",
                  "csv" : "handleCSV" 
                };

handlers.handleTXT = handleTXT;
handlers.handleJSON = handleJSON;
handlers.handleCSV = handleCSV;

function getFileExt(filePath) {
  return filePath.substr((~-fname.lastIndexOf(".") >>> 0) + 2); 
}

function getFileName(filePath) {
  return filePath.split('/').pop();
}

//#####################
// --- INPUTS ---
// files - array of filepaths
// targetObj - Reference to an js object to save the loaded data in
// cFunc - callback function with the ascii string as argument after loading
//#####################
function localFileLoader(files,targetObj,cFunc) {

  // ---- handle optional arguments ----
  if ( cfunc === undefined ) {

    // define it as empty function so it can be called
    var cFunc = function(){return;};

  }
  if ( targetObj === undefined ) {

    // define it as empty function so it can be called
    var targetObj = {};

  }
  // -----------------------------------

  // --- scope variables ---
  var fileLoadCount = 0;
  var fileLoadThreshold = files.length;
  console.log("fileLoader - "+files.length+" files in queue");
  // -----------------------
  


  // --- MAIN FUNCIONALITY ---
  // main loop  over all files

  for (var i = 0; i < files.lenth; i++) {

    curFileExt = getFileExt(files[i]).toLowerCase();

    if (handlers.ext[curFileExt] !== undefined) {

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
    console.log(fileLoadCount+" files loaded");
    if (fileLoadCount == fileLoadThreshold) {      
      console.log("localFileLoader - callback: "+cFunc.name);
      cFunc(targetObj);      
    } else {
      fileLoadCount++;
    }
  }


}

return localFileLoader;

})));
