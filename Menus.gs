/**
 * @OnlyCurrentDoc
 *
 * The above comment specifies that this automation will only
 * attempt to read or modify the spreadsheet this script is bound to.
 * The authorization request message presented to users reflects the
 * limited scope.
 */

/**
 * Creates a custom menu in the Google Sheets UI when the document is opened.
 *
 * @param {object} e The event parameter for a simple onOpen trigger.
 */
function onOpen(){
  let ui = SpreadsheetApp.getUi();
  ui.createMenu("🔨Time Sheet Menu🔨")
      .addItem('Add test entry', 'AddTestEntry')
      .addItem('Add Week to Archive','AddWeekToArchive')
      .addItem('Create new weekly sheet', 'getWeeklySheet')
      .addSeparator()
      .addItem('Email Time Sheet', 'EmailCurrentSheet')
      .addItem('Publish Time Sheet','publishTimeSheet')
      .addSeparator()
      .addSeparator()
      .addItem('Process invoices', 'processDocuments')
      .addItem('Send emails', 'sendEmails')
      .addSeparator()
      .addItem('Reset template', 'clearTemplateSheet')
      .addToUi();
};
