function cleanArray(array, deleteValue) {
  for (var i = 0; i < array.length; i++) { //console.log(array[i]);console.log(array[i] === "");
    if (array[i] == deleteValue) {        
      array.splice(i, 1);
      i--;
    }
  }
  return array;
}

function numberize (array) {
  for (let i=0 ; i<array.length ; i++)
    {
        array[i] = Number(array[i]);
    }
  return array;
}

export { cleanArray };
export { numberize };