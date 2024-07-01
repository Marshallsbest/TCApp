/**
 * /////////////////////////////////
 * Utility Functions Small functions that deal with data manipulation 
 * /////////////////////////////////
 * 
 * Remove Duplicate Array elements
 */
function _removeDuplicates(arr) {
  console.log("Remove Duplicates Start: "+arr);
  let newArr =  arr.filter((item,index) => arr.indexOf(item) === index);
  console.log("Remove Duplicates Stop: "+newArr);
  return newArr
};

/**
 * returns a onedimensional array from a two dimensional array
 */
function _popNames(arr){
  console.log("popNames Start: "+arr);
  let oneDim = arr.flat();
  console.log("popNames return: "+oneDim);
  return oneDim;
}

/**
 * Removes Empty elements froma  one dimensional array
 */
function _removeEmpty(arr){
  console.log("Remove Empty Start: ");
  console.log(arr);
  let filtered = arr.filter(function (el) {return el != '';});
  console.log("remove Empty Returning: ");
  console.log(filtered);
  return filtered
}

/**
 * returns a one dimensional array and 
 * Removes duplicates and empty elements 
 * from a two dimensional array
 */
function _getUniqueList(arr){
  return _removeEmpty(_removeDuplicates(_popNames(arr)))
}

/**
 * Transposes a one dimensional array in to a single column two dimensional array 
 */
function _transposeArray(arr){
  // console.log(arr);
  let eArr = _removeEmpty(arr)
  let twoDim = eArr.map(acc => [acc]);
  // console.log(twoDim)  
  return twoDim
}