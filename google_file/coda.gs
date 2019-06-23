// add menu to Sheet
function onOpen() {
  var ui = SpreadsheetApp.getUi();
  
  ui.createMenu("Send Emails")
  .addItem("Send Email Batch","createEmail")
  .addToUi();
}

/**
 * take the range of data in sheet
 * use it to build an HTML email body
 */
function createEmail() {
  var thisWorkbook = SpreadsheetApp.getActiveSpreadsheet();
  var thisSheet = thisWorkbook.getSheetByName('Form Responses 1');

  // get the data range of the sheet
  var allRange = thisSheet.getDataRange();
  
  // get all the data in this range
  var allData = allRange.getValues();
  
  // get the header row
  var headers = allData.shift();
  
  // create header index map
  var headerIndexes = indexifyHeaders(headers);
  
  allData.forEach(function(row,i) {
    if (!row[headerIndexes["Sent"]]) {
      if (row[headerIndexes["Status"]]=='Approved') {
        passwd = randomStr(6)
        thisSheet.getRange(i + 2, headerIndexes["Username"] + 1).setValue(row[headerIndexes["Email address"]]);
        thisSheet.getRange(i + 2, headerIndexes["Password"] + 1).setValue(passwd);
        var date = new Date();
        newdate = new Date(date.setDate(date.getDate()+30))
        thisSheet.getRange(i + 2, headerIndexes["Expire Date"] + 1).setValue(newdate);
        var   htmlBody = 
            "Hi " + row[headerIndexes["Full Name"]] +",<br><br>" +
              "Thanks for your interests in SiW database. Your request has been approved! <br><br>" +
                "<em>Your Username: " +
                  row[headerIndexes["Email address"]] + "</em><br>" +
                    "<em>Your Password: " +
                      passwd + "</em><br>" + 
                        "<em>Expire Date: " +
                          newdate + "</em><br><br>" + 
                            "The SiW database is available at [https://www.cse.msu.edu/computervision/SiW_database/]. Please download the database before the expire date. <br><br> " +
                              "If you meet any problem during the downloading, please contact siwdatabase@gmail.com. <br><br>" +
                                "Good luck with your reseach,<br>" +
                                  "SiW Management Team";
        
        var cc = row[headerIndexes["Advisor's Email Address"]];
        var bcc = "liuyaoj1@msu.edu,liuyaoj2@msu.edu,liuyaoj3@msu.edu";
        var htmlTitle = "You're Approved for SiW Download.";
        var timestamp = sendEmail(row[headerIndexes["Email address"]],htmlTitle,htmlBody,cc,bcc);
        thisSheet.getRange(i + 2, headerIndexes["Sent"] + 1).setValue(timestamp);
      }
      else if(row[headerIndexes["Status"]]=='Extended'){
        passwd = randomStr(6)
        thisSheet.getRange(i + 2, headerIndexes["Password"] + 1).setValue(passwd);
        var date = new Date();
        newdate = new Date(date.setDate(date.getDate()+30))
        thisSheet.getRange(i + 2, headerIndexes["Expire Date"] + 1).setValue(newdate);
        var   htmlBody = 
            "Hi " + row[headerIndexes["Full Name"]] +",<br><br>" +
              "Thanks for your interests in SiW database.Your access has been extended for another 30 days! <br><br>" +
                "<em>Your Username: " +
                  row[headerIndexes["Username"]] + "</em><br>" +
                    "<em>Your Password: " +
                      passwd + "</em><br>" + 
                        "<em>Expire Date: " +
                          newdate + "</em><br><br>" + 
                            "The SiW database is available at [https://www.cse.msu.edu/computervision/SiW_database/]. Please download the database before the expire date. <br><br> " +
                              "If you meet any problem during the downloading, please contact siwdatabase@gmail.com. <br><br>" +
                                "Good luck with your reseach,<br>" +
                                  "SiW Management Team";
        
        var cc = "";
        var bcc = "";
        var htmlTitle = "You're Extended for SiW Download.";
        var timestamp = sendEmail(row[headerIndexes["Email address"]],htmlTitle,htmlBody,cc,bcc);
        thisSheet.getRange(i + 2, headerIndexes["Sent"] + 1).setValue(timestamp);
      }
      else if(row[headerIndexes["Status"]]=='Pending'){
        var   htmlBody = 
            "Hi " + row[headerIndexes["Full Name"]] +",<br><br>" +
              "Thanks for your interests in SiW database. However, we need additional information to get your request approved. <br><br>" +
                "<em>Note: " +
                  row[headerIndexes["Note"]] + "</em><br><br>" +
                     "Please directly reply to this email thread. You don't need to take a new request. <br><br> " +
                           "Thank you,<br>" +
                              "SiW Management Team";
        
        var cc = "";
        var bcc = "";
        var htmlTitle = "Your Request for SiW Download is Pending.";
        var timestamp = sendEmail(row[headerIndexes["Email address"]],htmlTitle,htmlBody,cc,bcc);
        thisSheet.getRange(i + 2, headerIndexes["Sent"] + 1).setValue(timestamp);
      }
      else if(row[headerIndexes["Status"]]=='Rejected'){
        var   htmlBody = 
            "Hi " + row[headerIndexes["Full Name"]] +",<br><br>" +
              "Thanks for your interests in SiW database. We are regretfully to inform you that your request cannot be approved for the time being. <br><br>" +
                "<em>Note: " +
                  row[headerIndexes["Note"]] + "</em><br><br>" +
                     "If you have any further questions, please contact siwdatabase@gmail.com under this email thread. <br><br> " +
                           "Thank you,<br>" +
                              "SiW Management Team";
        
        var bcc = "";
        var bcc = "liuyaoj1@msu.edu,liuyaoj2@msu.edu,liuyaoj3@msu.edu";
        var htmlTitle = "Your Request for SiW Download is Rejected.";
        var timestamp = sendEmail(row[headerIndexes["Email address"]],htmlTitle,htmlBody,cc,bcc);
        thisSheet.getRange(i + 2, headerIndexes["Sent"] + 1).setValue(timestamp);
      }
    }
    else {
      Logger.log("No email sent for this row: " + i + 1);
    }
  });
}
  

function randomStr(m) {
    var m = m || 15; s = '', r = 'ABCDEFGHIJKLMNOPQRSTUVWXYZabcdefghijklmnopqrstuvwxyz0123456789_!@?';
    for (var i=0; i < m; i++) { s += r.charAt(Math.floor(Math.random()*r.length)); }
    return s;
};

/**
 * create index from column headings
 * @param {[object]} headers is an array of column headings
 * @return {{object}} object of column headings as key value pairs with index number
 */
function indexifyHeaders(headers) {
  
  var index = 0;
  return headers.reduce (
    // callback function
    function(p,c) {
    
      //skip cols with blank headers
      if (c) {
        // can't have duplicate column names
        if (p.hasOwnProperty(c)) {
          throw new Error('duplicate column name: ' + c);
        }
        p[c] = index;
      }
      index++;
      return p;
    },
    {} // initial value for reduce function to use as first argument
  );
}

/**
 * send email from GmailApp service
 * @param {string} recipient is the email address to send email to
 * @param {string} body is the html body of the email
 * @return {object} new date object to write into spreadsheet to confirm email sent
 */
function sendEmail(recipient,title,body,cc,bcc) {
  GmailApp.sendEmail(
    recipient,
    title, 
    "",
    {
      cc: cc,
      bcc: bcc,
      htmlBody: body
    }
  );
  
  return new Date();
}
