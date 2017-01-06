function parseJSON() {
  try {
    var jsonObject = JSON.parse(rawFile.responseText);
    return jsonObject;
  } catch(e) {
    console.log("ERROR parseJSON - "+e);
    console.log("ERROR parseJSON - could not parse string, returning empty object")
    var emptyObject = {};
    return emptyObject;
  }

}

export { parseJSON };