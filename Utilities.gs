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
  return dateAsName; z
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
    //  categoryList.unshift("New Category");
  console.log(categoryList)
  return categoryList
};

function updateCategoryList(category){
  const ss = SpreadsheetApp.getActiveSpreadsheet();
  const catRange = ss.getRangeByName('CATEGORIES');
  let categories = catRange.getDisplayValues();
  let catLength = categories.length;  
  console.log("categories length at Get function is : -> "+catLength)
  let catArr = []
  catArr.push(category)
    // console.log(categories.map(function(category){if(category != ''){return category}}));
    // let categoryList = categories.filter((category) => category[0].length > 0)
    // console.log(categrories)
    //let categoryList = _getUniqueList(categories);
  categories.pop;
  console.log("categories length at pop function is : -> "+categories.length)
  categories.unshift(catArr);
  console.log("categories length at unshift function is : -> "+categories.length)
  categories.sort;
  categories.pop();
  console.log("categories length at sort function is : -> "+categories.length)
  // let categoryList = [];
  let categoryList = _removeEmpty(categories);
  console.log("categoryList's length at Get function is : -> "+ categoryList.length);
  let newCatRange = ss.getSheetByName("Settings").getRange(2,8,categoryList.length,1);
  newCatRange.setValues(categoryList);
  
  console.log(categoryList);
  return category
};

function testUpdateCategryList(){
 console.log(updateCategoryList("test"))

}
                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                      
/**
 *  function capitalize
 *  @param{string} str
 *  
 */
// const capitalizeWords = (str) => str.toLowerCase().replace(/\b\w/g, (char) => char.toUpperCase());
// function capitalize(string){
//   if(!string)
// {return }else{
//   console.log("Data Passed: ");
//   console.log(string);
//   const newName = string.trim().split(" ");
//   console.log("Name to be Cleaned: ");
//   console.log(newName);
//   const mappedName = newName.map((name) => name.charAt(0).toUpperCase()+ name.slice(1)).join(" ");
//   console.log("Mapped Name: "+mappedName)
//   }
// }

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


/**
 * Gets a property from the specified property table 
 * @ 
 * @param {string} propType
 * 
 */
function dataStore(func,propType,key,value){
  // Set a property in each of the three property stores.
  let property;
  if(propType == "script"){
  property = PropertiesService.getScriptProperties();}
  else if(propType == "user"){
  property = PropertiesService.getUserProperties();}
  else if(propType == "doc"){
  property = PropertiesService.getDocumentProperties();
  };
  if(func == "get" ){
    try{
      property.getProperty(key,
          value);
    } catch (err) {
      // TODO (developer) - Handle exception
      let errInfo = 'Failed with error %s '+ err.message;
      console.log(errInfo);
      return errInfo
    }
  }
    if(func == "set"){
      try{
      property.setProperty(key,value);
    } catch (err) {
      // TODO (developer) - Handle exception
      let errInfo = 'Failed with error %s '+ err.message;
      console.log(errInfo);
      return errInfo
    }
  }

}

/**
 * function reduceToPairs
 * 
 * 
 */


function reduceToPairs(data) { 
    const intermediateResult = {};

    // Helper function to capitalize the first letter of each word
    const capitalizeWords = (str) =>
        str.toLowerCase().replace(/\b\w/g, (char) => char.toUpperCase());

    data.forEach((entry) => {
        // Destructure with defaults to avoid undefined errors
        const [rawKey, rawValue] = entry || [];

        // Skip undefined or null keys and values
        if (rawKey == null || rawValue == null) return;

        // Trim and normalize key and value safely
        const key = rawKey.trim();
        const value = rawValue.trim();

        // Skip empty keys
        if (!key) return;

        // Initialize the key in the intermediate result if not already present
        if (!intermediateResult[key]) {
            intermediateResult[key] = new Set(); // Use a Set to handle duplicates
        }

        // Add the formatted value to the Set if it's not empty
        if (value) {
            const formattedValue = capitalizeWords(value);
            intermediateResult[key].add(formattedValue);
        }
    });

    // Convert intermediateResult into the desired array format
    const finalResult = Object.entries(intermediateResult).map(([key, valuesSet]) => [
        key,
        ...Array.from(valuesSet), // Convert Set to array and spread its values
    ]);

  

 console.log("THe new result ")
 console.log(JSON.stringify(finalResult,null,2))
    return finalResult;
}

// console.log(reduceToKeyValuePairs(data));

function capitalize(str){
  let cappedWord = str.toLowerCase().replace(/\b\w/g, (char) => char.toUpperCase()).trim();
  console.log(cappedWord);
  return cappedWord
}

function capitalizeAllNames(){
  const names = customerNames(); 
  let ss = SpreadsheetApp.getActiveSpreadsheet();
  let ds = ss.getSheetByName('CUSTOMER_DATA');
  let r = ss.getRangeByName('CUSTOMER_NAMES'); 
  let cappedNames =  [];
  console.log(names)
  names.forEach(name => {
  console.log(name);
  cappedNames.push([capitalize(name)])
  });
  console.log(cappedNames)
    r = ds.getRange(2,1,cappedNames.length,1);
    r.setValues(cappedNames)
    ss.setNamedRange('CUSTOMER_NAMES',r);
    return 
}
/**
 *  @Function getMyTime 
 *  
 *  @param {string} startTime - DateTime in milliseconds of the start time 
 *  @param {string} endTime - DateTime in milliseconds of the stop time
 *  @returns {string} send - returns a string that represents a number of hours between the inputs rounded to quarter hours like 1.75 
 */
function getMyTime(endTime, startTime){
      let msDiff = (endTime - startTime);
      const sec = 1000;
      let tMs = Math.floor(msDiff % sec);
      let diff = msDiff - tMs;
      const min = sec * 60;
      const dMin = 10 * min;
      let qHr = 15 * min;
      const hr = 60 * min;
      let tMin = diff>hr ? Math.floor((diff%hr)/min) : Math.floor(diff/min);
      let tQhr = diff>= qHr ? Math.floor((diff%hr)/qHr) : "0";
      let display = tQhr *25;
      let decMin = diff>=dMin ? Math.floor((diff%hr)/dMin) : "0";
      // let sMin = diff>=dMin ? Math.floor(tMin-(decMin*10)) : Math.floor((diff%dMin)/min);
      let tHrs = diff>hr ? Math.floor(diff/hr) : "00";
      let send = tHrs+"."+display;
      // console.log("diff: "+diff);
      // console.log("minute: "+ min);
      // console.log("dMin: "+dMin);
      // console.log("tMin: "+tMin);
      // console.log("tQhr: "+tQhr);
      // console.log("display: "+display)
      // console.log("decMin: "+decMin);
      // console.log("sMin: "+sMin);
      // console.log(tHrs+":"+decMin + sMin)
      // console.log("reporting quarter Hours "+ send);
      // console.log("Time DIfference was "+ diff/60/60/1000);
      return send;
}

/**
 *  Function getLastEntryTime
 *  
 *  @returns {string} hours between
 */
 
function getLastEntryTime(stopDateTime){
  console.log("GetLastEntry Has been Calkled !");
  const info = new Information;
  const log = console.log;
  const ss = SpreadsheetApp.getActiveSpreadsheet();
  const ls = ss.getSheetByName(info.LS);
  const curDate = new Date();
  log("curDate: "+curDate)
  const defaultStart = new Date(new Date().setHours(8,0,0,0));
  log("defaultStart: "+defaultStart)
  const row = ls.getLastRow();
  log("THIS IS THE ROW NUMBER USED FOR START TO DO: "+row);
  const lstEntVal = (col) => ls.getRange(row,col).getValue();
  const stopCol = 8;
  const dateCol = 2;
  const catCol = 3;
  const lastEntDate = new Date(lstEntVal(dateCol));
  log("LAST ENTRYS DATE from column 8: "+lastEntDate);
  const lastStopTime = lstEntVal(catCol) === "Internal"? lstEntVal(stopCol):defaultStart;
  log("LAST ENTRY STOP TIME - NEW START TIME!: "+lastStopTime)
  const hasStartDateTime = lastEntDate.getDay() === curDate.getDay() ? lastStopTime : defaultStart;
  log("hasStartDateTime: "+ hasStartDateTime);
  const hasStopDateTime = stopDateTime ? stopDateTime: curDate;
  log("hasStopDateTime: "+hasStopDateTime);
  const curStartTime = hasStartDateTime.getTime();
  log("curStartTime: "+curStartTime);
  const curStopTime = hasStopDateTime.getTime();
  log("curStopTime: "+curStopTime);
  const myHours = getMyTime(curStopTime,curStartTime);
  log("myHours: "+myHours);
  let times = {start: hasStartDateTime,
               stop: hasStopDateTime,
               hours: myHours};
  log("times: "+times);
  return times
}
 function testAdddENtry(){
  AddTestEntry()
 }
 function testgetLastEntryTime(){
  getLastEntryTime()
 }

 /**
  * Function formatEntryRow
  *   
  */
function formatEntryRow(sheetName){
  console.log("SHEETNAME for Formatting is: "+sheetName)
  const ss = SpreadsheetApp.getActiveSpreadsheet();
  const ls = ss.getSheetByName(sheetName);
  const row = ls.getLastRow();
  const strtCol = 7;
  const logDate = 2;
  ls.getRange(row,strtCol,1,2).activate().setNumberFormat("h:mm am/pm");
  ls.getRange(row,logDate,1,1).activate().setNumberFormat("ddd\,mmm d\,y");
  return "entry row formatted successfully"
  };