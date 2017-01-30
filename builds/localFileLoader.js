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

//// CSV extension parser

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
  console.log("parseCSV return");
  return fileData;
}

function handleCSV (filePath,cFunc) {

  asciiFileLoader(filePath, function(data){
    var jsObject = parseCSV(data);
    cFunc(jsObject);
  });  

}

function cleanArray(array, deleteValue) {
  for (var i = 0; i < array.length; i++) { //console.log(array[i]);console.log(array[i] === "");
    if (array[i] == deleteValue) {        
      array.splice(i, 1);
      i--;
    }
  }
  return array;
}

//// EOF extension parser

function parseEOF (fileContent) {

  var fileData = {};
  fileData.metadata = {};
  fileData.data = {};

  var lines = fileContent.split(/\r\n|\n/);
  var metaLines = lines.splice(0,32);
  metaLines.splice(3,1);    // remove "-- MEASURING INFOS --" at line 4
  fileData.metadata["diagram title #1"] = metaLines.splice(3,1)[0];
  fileData.metadata["diagram title #2"] = metaLines.splice(3,1)[0];
  fileData.metadata["comment #1"] = metaLines.splice(4,1)[0];
  fileData.metadata["comment #2"] = metaLines.splice(4,1)[0];
  metaLines.splice(20,1);   // remove "-- Data --" at line 26
  cleanArray(metaLines,"");

  for (var i = 0; i < metaLines.length; i++) {
    var lineSplit = metaLines[i].split(/:|=/);
    fileData.metadata[lineSplit[0]] = lineSplit[1];
  }



  var tableHead = lines[0].split(/\t/);
  var units = lines[1].split(/\t/);

  for (var i = 0; i < tableHead.length; i++) {

    tableHead[i] = tableHead[i].trim()+units[i].trim();
    fileData.data[tableHead[i]] = [];             // create a new subobject for every row in the CSV file

  }

  for (var i=3; i < lines.length; i++) {          // loop through all lines except the tablehead and units (and empty line)

    var cells = lines[i].split(/\t/);             // split each line in its cells as an array
    cells.forEach( function (value, index) {      // loop through all cells in a line

      value = Number(value);                      // remove all whitespaces in a cell
      fileData.data[tableHead[index]].push(value);     // add the value of the cell to the corresponding entry

    });

  }
  console.log("parseEOF return");
  console.log(fileData);
  return fileData;
}

function getFileExt(filePath) {
  return filePath.substr((~-filePath.lastIndexOf(".") >>> 0) + 2); 
}

function getFileName(filePath) {
  return filePath.split('/').pop();
}

// handle Orthoload files

function handleEOF (filePath,cFunc) {

  asciiFileLoader(filePath, function(data){

    var fileData = parseEOF(data);

    var fileName = getFileName(filePath);
    var fileExt = getFileExt(filePath);

    var nameParts = fileName.split("_");
    fileData.patient_id = nameParts[0];
    fileData.measDate_id = nameParts[1]+"_"+nameParts[2];
    fileData.exercise_id = nameParts[3]+"_"+nameParts[4].split(".")[0];
    fileData.ext = fileExt;
    fileData.fileName = fileName;
    fileData.dataset_type = "OL";
    fileData.data_type = "2D_list";

    cFunc(fileData);

  });

}

// handle Orthoload files

function handleAKF (filePath,cFunc) {

  asciiFileLoader(filePath, function(data){

    var fileData = parseEOF(data);

    var fileName = getFileName(filePath);
    var fileExt = getFileExt(filePath);

    var nameParts = fileName.split("_");
    fileData.patient_id = nameParts[0];
    fileData.measDate_id = nameParts[1]+"_"+nameParts[2];
    fileData.exercise_id = nameParts[3].split(".")[0];
    fileData.ext = fileExt;
    fileData.fileName = fileName;
    fileData.dataset_type = "OL";
    fileData.data_type = "2D_list";

    cFunc(fileData);

  });

}

var handlers = {};

handlers.ext =  { "txt"  : "handleTXT",
                  "json" : "handleJSON",
                  "csv" : "handleCSV",
                  "eof" : "handleEOF",
                  "iof" : "handleEOF",
                  "akf" : "handleAKF"
                };

handlers.handleTXT = handleTXT;
handlers.handleJSON = handleJSON;
handlers.handleCSV = handleCSV;
handlers.handleEOF = handleEOF;
handlers.handleAKF = handleAKF;

//#####################
// --- INPUTS ---
// files - array of filepaths
// targetObj - Reference to an js object to save the loaded data in
// cFunc - callback function with the ascii string as argument after loading
//#####################
function localFileLoader(files,cFunc,targetObj) {

  // ---- handle optional arguments ----
  if ( cFunc === undefined ) {

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
  var fileLoadThreshold = files.length-1;
  console.log("fileLoader - "+files.length+" files in queue");
  // -----------------------
  


  // --- MAIN FUNCIONALITY ---
  // main loop  over all files

  for (var i = 0; i < files.length; i++) {
    console.log("loading file: "+i);
    var curFileExt = getFileExt(files[i]).toLowerCase();

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
