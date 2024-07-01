

function EmailCurrentSheet() {
  const ss = SpreadsheetApp.getActiveSpreadsheet();
  const my = new Information();
  let weekName = getMonday();
  let subject = my.name+"'s Log sheet for week: " +weekName; 
  let sheet = ss.getSheetByName(weekName);
  let lastRow = sheet.getLastRow();
  let message = "Please see attached";
  let emailTo;
  let managersEmail;
  let personalEmail = my.email;
  emailTo = personalEmail
  if(my.includingMyManager){
    managersEmail = my.managersEmail;
    emailTo = personalEmail+','+managersEmail;
  };
  let drive = DriveApp;
  let workFolder;
  try {
    workFolder = drive.getFoldersByName(my.companyName).next().getFoldersByName("Work Logs").next();
  } catch(error) {
    workFolder = drive.getFoldersByName(my.companyName).next().createFolder("Work Logs");
  }
  let newWeeklyLog = SpreadsheetApp.create(FIRST_NAME+" Work Log For: "+weekName);
  let newSsID = newWeeklyLog.getId();
  // console.log(newSsID);
  sheet.copyTo(newWeeklyLog).setName(weekName);
  
  drive.getFolderById(newSsID).moveTo(workFolder);
  newWeeklyLog.getSheetByName('Sheet1').activate();
  newWeeklyLog.deleteActiveSheet();
  let fileName = FIRST_NAME+"'s weekly Log for: "+ weekName;
  let pdf = drive.getFileById(newSsID).getAs('application/pdf').setName(fileName);
  
  GmailApp.sendEmail(emailTo, subject, message, {attachments:[pdf]});
  
  // Delete the wasted sheet we created, so our Drive stays tidy.
  drive.getFileById(newSsid).setTrashed(true);
  return "All Emails have been sent with PDF copies of this weeks work log!"    
}

/**
 * Asks the user for email via prompt
 * Display a dialog box with a message, input field, and an "OK" button. The user can also
 * close the dialog by clicking the close button in its title bar.
 */
function getData(data){
  const s = SpreadsheetApp;
  const ui = s.getUi();
  const ss = s.getActiveSpreadsheet();
  let pEmail = ss.getRangeByName(data);
  let response = ui.prompt("Please input your "+ data + " info to be used");
  
  // Process the user's response.
  if (response.getSelectedButton() == ui.Button.OK) {
  let text = response.getResponseText()
    pEmail.setValue(text);  
    return text;
    } else {
    return false
    };
};