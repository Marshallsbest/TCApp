/**
 * Welcome to the Taurus Craco Service Tech Time Keeping App
 * This App will accept data submitted by the user and 
 * gradually create a data base of pertinant info to allow for 
 * easier data submission as it's used
 */

 /**
 * The Web App Call for the user form to be displayed 
 */
function doGet(e) {
  let f =  HtmlService.createTemplateFromFile('index.html');
  f.data = customerSelectionList();
  f.cat = getCategories();
  return f.evaluate()
};

/**
 *  Loads Style Sheet and JS File. Called from index HTML page via scriptlets
 */
function include(filename) {
  return HtmlService.createHtmlOutputFromFile(filename).getContent();
};


/**
 * Call from the Web app once the user hits the Submit Button
 */
function AddResponse(formObject){
// console.log("add Response was called"+ formObject);
  let record = new Record(formObject);
  console.log("Logging New Record",record)
  let success = [];
  // sheet.appendRow(newEntry);
  // sheet.appendRow(record.getRecord());
  try {
    record.setLogRecord() 
    } catch (error) {
    return error 
    };  
    console.log("Logging getRecord results",record.orderDate);
  return  success.push("Successfully added record Log");
    
};
 /**
  * Function clearUserData - used to Clear the cells specific to a given user 
  *
  *
  */
  function clearUserData(){
    const info = new Information;
    info

  }

/**
 *  Funciton publishTimeSheet - this is a funciton that will create and send a copy of hte time sheet to the users choosen emails
 * 
 * 
 */
function publishTimeSheet(){
  let ss = SpreadsheetApp;
  let ui = ss.getUi()
  let result = ui.prompt(
    'Which week would you like to publish?',
    'Please enter the Monday of the week to publish',
    ui.ButtonSet.OK_CANCEL);
    // Process the user's response.
    let button = result.getSelectedButton();
    let text = result.getResponseText();
    if (button == ui.Button.OK){
        // User clicked "OK".
        ui.alert('Your name is ' + text + '.');
        if(text == "This"){
          getMonday(this.orderDate)
        }
      } else if (button == ui.Button.CANCEL) {
        // User clicked "Cancel".
        ui.alert('I didn\'t get your name.');
      } else if (button == ui.Button.CLOSE) {
        // User clicked X in the title bar.
        ui.alert('You closed the dialog.');
      }
}