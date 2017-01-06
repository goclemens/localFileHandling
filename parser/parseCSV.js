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

export { parseCSV };