import { cleanArray } from '../helpers/arrayHelpers.js';

//// EOF extension parser

function parseEOF (fileContent) {

  var fileData = {};
  fileData.data = {};

  var lines = fileContent.split(/\r\n|\n/);
  var metaLines = lines.splice(0,32);
  metaLines.splice(3,1);    // remove "-- MEASURING INFOS --" at line 4
  fileData["diagram title #1"] = metaLines.splice(3,1)[0];
  fileData["diagram title #2"] = metaLines.splice(3,1)[0];
  fileData["comment #1"] = metaLines.splice(4,1)[0];
  fileData["comment #2"] = metaLines.splice(4,1)[0];
  metaLines.splice(20,1);   // remove "-- Data --" at line 26
  cleanArray(metaLines,"");

  for (var i = 0; i < metaLines.length; i++) {
    var lineSplit = metaLines[i].split(/:|=/);
    fileData[lineSplit[0]] = lineSplit[1];
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

export { parseEOF };