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
        console.log("loaded "+filePath)
        cFunc(rawFile.responseText);
      }
    }
  }
  
  rawFile.send();
}

export { asciiFileLoader };