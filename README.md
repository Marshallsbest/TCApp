This code is written to provide a webapp interface for logging ones daily work logs. 
This was also a personal attempt to work with and utilizing OOP using Classes to generate objects with vaious methods to deal with hte handling of the code.
I realize this is overkill and probably not the most appropriate use of a Class based arcitecture how ever as I said it was more of a learning project for me personally than anything else. 
It will:
 - Automatically update a selection list of clients while allowing for new clients to be added. 
 - Automatically update client Asset list upon client selection 
 - Allow for new assets to be added
 - As of V3 it currently creates a new Sheet in your Google Sheets Spreadsheet each week and uses the date of the monday as the sheet name
Current features under construction are:
 - The ability to automatically email a sheet as a pdf to your personal email and/or your managers email
 - Currently The Data is read and stored by indexing the date and finding the appropriate sheet and then reading the data from there.
 - This was done for easier interaction from the spreadsheet side of things.
 - I plan to save all records to one sheet only thenn simply use a filter to generate reports as needed.
   
