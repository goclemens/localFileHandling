function loadOBJMeshes (files, objObjects, cFunc, cArguments) {

  var fileLoadCount = 0;
  var fileLoadThreshold = files.length;
  console.log("loadOBJMeshes - "+files.length+" files in queue")

    
    for (var index = 0; index<files.length; index++) {

      (function() {
        var objLoader = new THREE.OBJLoader();
        var objectId ="test"+index; 
        objLoader.load(
          // resource URL
          files[index],
          // Function when resource is loaded
          function ( object ) {
            
            var tempObject = object.children[0];
            var tempGeometry = new THREE.Geometry().fromBufferGeometry( tempObject.geometry );
            tempGeometry.mergeVertices();
            tempGeometry.computeVertexNormals();
            tempObject.geometry = tempGeometry
            tempObject.material = new THREE.MeshPhongMaterial({
                // polygonOffset: true,  
                // polygonOffsetUnits: 1,
                // polygonOffsetFactor: 1,
                // color: "yellow",
                // ambient: "yellow",
                // specular: 0x101010,
                // shininess: 32,
                side: THREE.DoubleSide
            });
            tempObject.material.shading = THREE.SmoothShading;
            objObjects[objectId] = tempObject;
            fileLoadCount++;
            checkFinished();
            
          }
        );
      }());
    }  



  //### internal functions ###

  // checks if all files are loaded and calls the callback function
  function checkFinished () {
    console.log(fileLoadCount+" files loaded")
    if (fileLoadCount == fileLoadThreshold) {
      
      console.log("loadOBJMehses - callback: "+cFunc.name);
      if ( cArguments === undefined ) {
        cFunc();
      } else {
        cFunc(cArguments);
      }
      
    }
  }


}