/**
 * Call that creates a new weeks Log sheet Named with Mondays date 
 */
function getWeeklySheet(weekName){
  let ss = SpreadsheetApp.getActiveSpreadsheet();
  let name = getMonday(weekName);
  let s;
  if(ss.getSheetByName(name)){  
      s = ss.getSheetByName(name)
    }else{
      s = ss.insertSheet(name);
    addHeaders(name) 
    };
 return s;
};

/**
 * Call that Calculates the Monday of the current week no matter the day it actually is
 */

function getMonday(dateInWeek){
  console.log("New Date looks like: "+new Date)
  console.log("My Date looks like: "+dateInWeek)
  let d = dateInWeek ? dateInWeek : new Date;
  let newD = dateInWeek ? dateInWeek : new Date;
  let day = d.getDay();
  let diff = day + (day == 0 ? 6:-1);   
  newD.setDate(newD.getDate() - diff);
  let dateAsName = Utilities.formatDate(newD,"GMT-0400","MMM dd yyyy");
  return dateAsName; 
};

/**
 * This Inserts the headers into a new weeks log sheet
 */
function addHeaders(name){
  let ss = SpreadsheetApp.getActiveSpreadsheet();
  let COMPANY_NAME = ss.getRangeByName("COMPANY_NAME").getValue();
  let s = ss.getSheetByName(name);
  let range = s.getRange(1,1);
  let imageRange = range.offset(0, 0, 1, 2).activate().mergeAcross();
  let imageUrl = ss.getRangeByName("COMPANY_LOGO_URL").getValue();
  let titleRange = s.getRange(1,4);
  let techName = ss.getRangeByName("TECH_NAME").getValue();
  let nameRange = s.getRange(1,6);
  let sheetTitle = ss.getRangeByName("SHEET_TITLE").getValue();
  let headers = ["Date","","Customer","Machine", "Log", "Hours","Work Order"];
  if(s.getLastRow() == 0){
    InsertCellImage(imageRange, imageUrl, altTitle = COMPANY_NAME, altDescription = COMPANY_NAME);
    titleRange.setValue(sheetTitle).setFontSize(18).setVerticalAlignment("middle");
    nameRange.setValue(techName).setFontSize(18).setVerticalAlignment("middle");
    s.appendRow(headers);
    nameRange.setValue(techName);
    FormatHeaders();
  };
};

/**
 * Insert An Image into the top Left cell
 */
function InsertCellImage(range, imageUrl, altTitle = "", altDescription = "") {
  let image = SpreadsheetApp
                 .newCellImage()
                 .setSourceUrl(imageUrl)
                 .setAltTextTitle(altTitle)
                 .setAltTextDescription(altDescription)
                 .build();
  range.setValue(image);
}

/**
 * This call formats the Header row 
 */
function FormatHeaders() {
  var ss = SpreadsheetApp.getActiveSpreadsheet();
  var s = ss.getActiveSheet();
  ss.getActiveSheet().setRowHeight(1, 64);
  s.getRange(1, 1, 2, s.getMaxColumns()).activate();
  ss.getActiveRangeList().setBackground('#38761d')
  .setFontColor('#ffe599')
  .setHorizontalAlignment('center')
  .setFontWeight('bold');
  ss.getActiveSheet().setHiddenGridlines(true);
  let c = s.getLastColumn()+1;
  let maxC = s.getMaxColumns();
  // s.getRange(1,c,1000,maxC).getCol
  let infoRange = s.getRange(s.getLastRow()+1,1,s.getMaxRows(),s.getLastColumn());
  infoRange.activate().setFontSize(14).setFontFamily("Arial");
};


/**
 * This function adds the Days label to denote the weekday
 * the subsequent days logs are for. 
 * Sun - Sat = 0-6 respectively
 * Currently set to add the weeekdays only 
 */
function AddWeekdayRow(){
  let sheet = SpreadsheetApp.getActiveSpreadsheet().getSheetByName(getMonday());
  let range = sheet.getRange(sheet.getLastRow()+2,1);
  let row = range.getRow();
  let curDate = new Date();
  let dayOfWeek = curDate.getDay();
  if(dayOfWeek>0 && dayOfWeek<6){
// console.log("Current day is greater than 0 and less than 6");  
    range.setValue(curDate).setNumberFormat('dddd').setFontWeight('bold').setBorder(null, null, true, null, null, null, '#000000', SpreadsheetApp.BorderStyle.SOLID);
  };
};

/**
 * !!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!
 * NON ACTIVE CODE
 * !!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!
 * 
 * Returns all the log sheet names for allowing the user 
 * to select a week that is not the current week to be emailed
 */
function GetAllSheetNames(){
  let ss = SpreadsheetApp.getActiveSpreadsheet();
  let sheets = ss.getSheets();
  let sheetNames = [];
  // let sNData = ss.getSheetByName("Data").getIndex();
// console.log("this should be the sheet index for 'Data' sheet: "+ sNData);
  // let sNSettings = ss.getSheetByName("Settings").getIndex();
// console.log("this should be the sheet index for 'Settings' sheet: "+ sNSettings);
  // let sNWelcome = ss.getSheetByName("Welcome").getIndex();
// console.log("this should be the sheet index for 'Welcome' sheet: "+ sNWelcome);
// console.log("this should be the 3 sheet indexs to ignore: "+ sNWelcome+", "+sNData+", "+sNSettings);
  sheets.forEach(sheet => {
  let sName = sheet.getSheetName()
  if(sName.length >8){
      sheetNames.unshift(sName)
    };
  });
  return sheetNames
// console.log("This shoud display all the weekly log sheet names: "+sheetNames)
};


function AddWeekToArchive(week){
const ss = SpreadsheetApp.getActiveSpreadsheet();
let currentYear = new Date().getUTCFullYear().toString();
console.log("Full Year: "+currentYear);
let dataArchive = currentYear+" Logs";
console.log(dataArchive)
  if(ss.getSheetByName(dataArchive)){
  ss.getSheetByName(dataArchive)
  console.log("Yearsheet is found")
  }else{
  console.log("YearSheet wasn't foundt should be created now")
  ss.insertSheet(dataArchive);
  addHeaders(dataArchive);
  let logSheets = GetAllSheetNames();
  console.log(logSheets);
  if(logSheets.length>1){ 
  logSheets.forEach(logSheet =>
    addLogSheet(logSheet,dataArchive)
    );
  logSheets.forEach(sheet =>
    ss.getSheetByName(sheet).hideSheet()
  )};
  }
  if(week){
    addLogSheet(week,dataArchive)
    }else{
    week = getMonday();
    addLogSheet(week,dataArchive)
  }
}

function addLogSheet(logSheet,sheet){
  console.log(logSheet,sheet);
  const ss = SpreadsheetApp.getActiveSpreadsheet();
  let archive = ss.getSheetByName(sheet);
  let lsheet =  ss.getSheetByName(logSheet);
  let rows = lsheet.getLastRow()-2;
  if(rows>5){
  let dataRange = lsheet.getRange(3,1,rows,7)
  let data = dataRange.getDisplayValues();
  archive.getRange(archive.getLastRow()+1,1,rows,7).setValues(data)
    }else{
    console.log("Log Sheet Name: "+logSheet+" Logsheet Rows: "+rows)
    }
  ss.getSheetByName(logSheet).hideSheet()  
  }