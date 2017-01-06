//////////////////////////////////
// teFileLoader arguments:
// -> "files"
//    takes array of file paths
// -> "datasets"
//    is used as a reference to a global object and
//    will be overwritten
//////////////////////////////////


function basicFileLoader (files, dataset, cFunc) { 

  var fileLoadCount = 0;
  var fileLoadThreshold = files.length;
  
  // loop through all files
  for (var i = 0; i < files.length; i++) {
    
    console.log("call loader for - "+files[i]);
    teLoadCSVFile(files[i]);
    
  }





  // ------------ helper functions ------------
  
  // load a CSV File via XMLHttpRequest object
  // and save it to the global "dataset" object
  function teLoadCSVFile (filePath) {
    
    console.log("start loading file - "+filePath);
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
          console.log("loaded "+filePath)
          
          var rawFileContent = rawFile.responseText;
          var fileData = {empty: "default - file was not handled correctly"};
          fileData = handleCSV(rawFileContent);
                            
          var metadata = getMetadata();

          for (metaProp in metadata) {
           dataset[metaProp] = metadata[metaProp];
          }
          dataset.measurement = fileData;
          
          // increase file load counter
          fileLoadCount += 1;
          console.log("file - processed and saved");
          
          // check if all files are loaded
          checkFinished();
          
        }
      }
    }
    
    rawFile.send();
    
  }

  // checks if all files are loaded and calls the callback function
  function checkFinished () {
    console.log(fileLoadCount+" files loaded")
    if (fileLoadCount == fileLoadThreshold) {
      console.log("basicFileLoader - callback: "+cFunc.name);
      cFunc();
    }
  }

  function getMetadata() {
    
    // get the metadata from the corresponding UI elements and add it to an object
    var metadata = {};
    metadata.patientID = $("#patientID").prop("value");       
    metadata.patientInfo = $("#patientInfo").prop("value");
    metadata.cohortID = $("#cohortID").prop("value");
    metadata.groups = $("#groups").prop("value").split(",");
    metadata.createdAt = new Date;
    
    return metadata;
    
  }

}