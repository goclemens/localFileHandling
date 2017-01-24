// handle Orthoload files

import { asciiFileLoader } from '../loaders/asciiFileLoader.js';
import { parseEOF } from '../parser/parseEOF.js';

import { getFileExt } from '../helpers/getFileExt.js';
import { getFileName } from '../helpers/getFileName.js';

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

export { handleEOF };