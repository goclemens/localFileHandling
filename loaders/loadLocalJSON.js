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
                  console.log("ERROR loadLocalJson - could not load file, returning empty object")
                  var emptyObject = {};
                  cFunc(emptyObject);
                  return;
                }

                console.log("loadLocalJSON - File loaded: "+filePath)
                cFunc(jsonObject);
            }
        }
    }
    
    rawFile.send();
    
}
//##############################################

export { loadLocalJSON };