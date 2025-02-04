/**
* Returns a 2 dimensional array of names for use in a menu
*/
function customerNames(){
  const ss = SpreadsheetApp.getActiveSpreadsheet();
  const customerNames = ss.getRangeByName("CUSTOMER_NAMES").getValues();
    // console.log(customerNames.map(function(name){if(name != ''){return name}}));
    // let customerList = customerNames.filter((customerName) => customerName[0].length > 0)
    // console.log(customerNames)
  let customerList = _getUniqueList(customerNames);
  console.log(customerList)
  return customerList
};

/**
 *  Customer Selection list
 *  
 */
function customerSelectionList(){
  let customerList = customerNames();
  customerList.unshift("New Customer");
  // console.log(customerList)
  return customerList
}

/**
 * Merges company name List with new name list
 *
 * @param {array} company   
 * @return {array}
 */
function updateCustomerList(company,asset){
  console.log("updateCustomerList was called with the company: "+company )
  let oneCustomer = capitalize(company);
  let oneAsset = capitalize(asset);
  const ss = SpreadsheetApp.getActiveSpreadsheet();
  let ds = ss.getSheetByName('CUSTOMER_DATA');
  let r = ss.getRangeByName('CUSTOMER_NAMES'); 
  let newList = customerNames();
  // let oldList = CustomerNames();
  // for(let i = 0;i<newCustomers.length;i++){
  //   newList.unshift(newCustomers[i])
  // }
  try{
    if(newList.indexOf(oneCustomer) < 0){
      console.log("New List .index of "+oneCustomer+" was found to be -1 so new customer will be appended to the sheet");
      ds.appendRow([oneCustomer,oneAsset]);
      r = ds.getRange(2,1,ds.getLastRow(),1);
    };
     
    ss.setNamedRange('CUSTOMER_NAMES',r);
    return oneCustomer
  }catch(err){

    return err 
  }
};

/**
 * Gets the machines associated with the chosen customer
 * 
 */

function GetMachines(name){
  
  let assetList = [];
  if(name === "New Customer"){
    assetList.unshift("It's sending New Customer");
    return assetList
  } else {
    assetList = getClientAssetList(name);
   }
  console.log(assetList);
  // if(assetList.indexOf(name)>=0){
  //   assetList.shift();}
  //   assetList.push("New Machine")
  //   assetList.unshift('');
  // console.log(assetList);
  return assetList
  }


/**
 * function: GetClientAssetList
 *  @param{string} name the name of the customer to besearched for in the list  
 *  @return{array} assetList An array of all the data in the row that has the name matched in the first column
 */
function getClientAssetList(name){
  let customerName = capitalize(name);
  const ss = SpreadsheetApp.getActiveSpreadsheet();
  const ds = ss.getSheetByName('CUSTOMER_DATA');
  console.log("getClientAssetList Called name is: "+customerName)
  const cRow = getCustomerRow(customerName)  
  console.log("cRow is : "+cRow)
  let machines = ds.getRange(cRow,2,1,ds.getLastColumn()).getValues();
  machines = _popNames(machines)
  console.log("Machines after _pop : ")
  console.log(machines)
  let assetList = _removeEmpty(machines);
  console.log("after Get Unique List");
  console.log(assetList)
  return assetList
}

function testGetAssetList(){
  getClientAssetList("Brampton Senior center")
}
/**
 * function: DailyMachineList - 
 * @param{string} name 
 */

function createMachineList(yearOfRecords){
  yearOfRecords ? yearOfRecords : yearOfRecords = new Date().getFullYear()
  const sheetName = yearOfRecords + " Logs";
  console.log(sheetName);
  const logSheet = ss.getSheetByName(sheetName);
  const infoSheet = ss.getSheetByName("CUSTOMER_DATA");
  // console.log(logSheet);
  const customerDataRange = logSheet.getRange(3,4,logSheet.getLastRow()-3,2).getValues();
  console.log("CustomerDataRange ");
  console.log(customerDataRange);
  const customerDatafiltered = customerDataRange.map(customersData => customersData.filter(data => data.valueOf().trim().length >2 && data !== "undefined"))
  // console.log("filtered Data Begins Here");
  // console.log(customerDatafiltered);
  const reducedData =  reduceToPairs(customerDatafiltered);
  // console.log("reducedData sorted ");
  let machineWidth = reducedData.sort((a, b) => {
    const keyA = a[0].toLowerCase(); // Convert to lowercase for case-insensitive comparison
    const keyB = b[0].toLowerCase();
    return keyA.localeCompare(keyB); // Compare keys alphabetically
  });
  // console.log(reducedData);
  // console.log("machineRangeLength: "+machineRangeLength);
  // console.log("reducedData ");
  // console.log(reducedData);
  let curCol = infoSheet.getMaxColumns();
  const headerRange = infoSheet.getRange(1,1,infoSheet.getFrozenRows(),curCol).activate();
  if(machineWidth+1 - curCol >0){
    let neededCols = machineWidth+1 - curCol;
    // console.log("Column Difference : "+neededCols);
    infoSheet.insertColumnsAfter(curCol,neededCols +1);
  }
  headerRange.setBackground(THEME_BACKGROUND_COLOUR).setFontColor(THEME_FONT_COLOUR)
  let headers = headerRange.getValues()
  infoSheet.activate().clearContents();
  reducedData.unshift(headers);
 
  for(let i =0; i<reducedData.length; i++){
    let row =[];
    row.push(reducedData[i]);
    // console.log("The row : ");
    // console.log(row);
    // console.log("The index: ");
    // console.log(i);
    let dataRow = i +1;
    let data_Size = row[0].length ;
    // console.log("The dataSize is: ");
    // console.log(data_Size);
    
    infoSheet.getRange(dataRow,1,1,data_Size).activate().setValues(row)
    }
};

function testCreateMachineList(){
  createMachineList()
}


/**
 * function: setClientAssetList
 *  @param{string} name the name of the customer to besearched for in the list  
 *  @param{array} a 1 dimensional array machines the machines to be saved in the row
 *  @return{array} assetList An array of all the data in the row that has the name matched in the first column
 */

function addNewAsset(name,machine){
  const curList = getClientAssetList(name);
  const ss = SpreadsheetApp.getActiveSpreadsheet();
  const ds = ss.getSheetByName('CUSTOMER_DATA');
   console.log("name from addNewAsset Function): "+name)
  name = name.trim();
  const newMachine = capitalize(machine)
  let check = 0;
  if(newMachine.length == 1){
    check = newMachine[0].length
    if(check >= 1){
      ds.getRange(getCustomerRow(name),2,1,check).setValues(newMachine)
    }
  };
  console.log("old Asset List: "+ curList);
  const newList = getClientAssetList(name);
  console.log("new asset List: "+ newList);
  return newMachine
}

function testAddNewAsset(){
  addNewAsset("Yorkville Sound","Test Machine")
}
/**
 * function getCustomerRow
 * @param{string} name the name of the customer to find
 */
function getCustomerRow(name){
  // const ss = SpreadsheetApp.getActiveSpreadsheet();
  // let sheet = ss.getSheetByName("CUSTOMER_DATA");
  let names = customerNames();
  if(!name ){ 
  return names.length + 2;
  }
  let index =  names.indexOf(name) 
  let row = index<0 ? names.length + 2 : index+2;
  // let names = sheet.getRange(2,1,sheet.getLastRow(),1).getValues();
  return row

  
  // let row = null;
  // name = capitalize(name);
  // console.log("CUSTOMER_NAMES Being logged: "+names);
  // for(let i=1;i<names.length;i++){
  //   console.log(names[i][0]+"??=??"+name);
  //   if(names[i][0] === name){
      
  //     row = i+2;
  //     console.log("row of customer is: "+ row)
  //     }

    // };
  }