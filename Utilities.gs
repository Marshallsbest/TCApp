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

/**
 * Call that Calculates the date of the Monday of the given dates week. 
 * It does not matter the day of the week the given Date actually is
 * 
 * @param {string} dateInWeek - A date that in the same week as the desired Monday required
 * @return {object} dateAsName - A Date object of the Monday of the given dates week
 * */

function getMonday(dateInWeek){
  console.log("New Date looks like: "+new Date)
  console.log("My Date looks like: "+dateInWeek)
  let d = dateInWeek ? dateInWeek : new Date;
  let newD = dateInWeek ? dateInWeek : new Date;
  let day = d.getDay();
  let diff = day + (day == 0 ? 6:-1);   
  newD.setDate(newD.getDate() - diff);
  
  console.log("My New Date looks like: "+newD)
  let dateAsName = Utilities.formatDate(newD,"GMT-0400","MMM dd yyyy");
  return dateAsName; 
};


function getMondayAsDate(dateInWeek){
  console.log("New Date looks like: "+new Date)
  console.log("My Date looks like: "+dateInWeek)
  let d = dateInWeek ? dateInWeek : new Date;
  let newD = dateInWeek ? dateInWeek : new Date;
  let day = d.getDay();
  let diff = day + (day == 0 ? 6:-1);   
  newD.setDate(newD.getDate() - diff);
  
  console.log("My New Date looks like: "+newD)
  return newD
}

/**
 * Gets the Week Number from the given date
 * 
 */
function getWeekNum(date){
  let d = date ? date : new Date;
  console.log(d);  
  let num = Utilities.formatDate(d,"EST","w");
  console.log(num);
  return num 
}
/**
 *  Test Date Week 
 * 
 */
function testGetWeekNum(){
  let today = getMondayAsDate(new Date);
  let num = getWeekNum(today)
  console.log("this weeks number is -> "+ num+" <-!!!");
  
}

/**
 * function getCategories
 * return {Array} a list of possible cagtegories to use in the form
 */

function getCategories(){
  let ss = SpreadsheetApp.getActiveSpreadsheet();
  let categories = ss.getRangeByName('CATEGORIES').getDisplayValues();
    // console.log(categories.map(function(category){if(category != ''){return category}}));
    // let categoryList = categories.filter((category) => category[0].length > 0)
    // console.log(categrories)
  let categoryList = _getUniqueList(categories);
  categoryList.unshift("New Category");
  console.log(categoryList)
  return categoryList
};





/**
 * Returns a Google Drive folder in the same location 
 * in Drive where the spreadsheet is located. First, it checks if the folder
 * already exists and returns that folder. If the folder doesn't already
 * exist, the script creates a new one. The folder's name is set by the
 * "OUTPUT_FOLDER_NAME" variable from the Code.gs file.
 *
 * @param {string} folderName - Name of the Drive folder. 
 * @return {object} Google Drive Folder
 */
function getFolderByName_(folderName) {

  // Gets the Drive Folder of where the current spreadsheet is located.
  const ssId = SpreadsheetApp.getActiveSpreadsheet().getId();
  const parentFolder = DriveApp.getFileById(ssId).getParents().next();

  // Iterates the subfolders to check if the PDF folder already exists.
  const subFolders = parentFolder.getFolders();
  while (subFolders.hasNext()) {
    let folder = subFolders.next();

    // Returns the existing folder if found.
    if (folder.getName() === folderName) {
      return folder;
    }
  }
  // Creates a new folder if one does not already exist.
  return parentFolder.createFolder(folderName)
    .setDescription(`Created by ${APP_TITLE} application to store PDF output files`);
}
