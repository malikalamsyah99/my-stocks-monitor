var token = "token_bot"; //change with your bot token
var SheetID = "Sheet_id"; //change with your sheed Id

function doPost(e) {
  var stringJson = e.postData.getDataAsString();
  var updates = JSON.parse(stringJson);
 
    if(updates.message.text){
      sendText(updates.message.chat.id,GetStocksfromIDSheet(updates.message.text)); 
    }
}

function TakeSheet1(){
  var rangeName = 'Sheet1!A2:I';
  var rows = Sheets.Spreadsheets.Values.get(SheetID, rangeName).values;
  return rows;
}


function GetStocksfromIDSheet(IDStock){
  var dataStocks = TakeSheet1(); 
  for (var row = 0; row < dataStocks.length; row++) {
    if(dataStocks[row][0]==IDStock){ 
      return "Code : " + dataStocks[row][0] + "\n" +
             "Buy Price : " + dataStocks[row][1] + "\n" +
             "Last Price : " + dataStocks[row][2] + "\n" + 
             "Lot : " + dataStocks[row][3] + "\n" +
             "Share : " + dataStocks[row][4] + "\n" + 
             "Stock Value : " + dataStocks[row][5] + "\n" + 
             "Market Value : " + dataStocks[row][6] + "\n" +
             "Profit/Loss : " + dataStocks[row][7] + "\n" +              
             "percentage  : " + dataStocks[row][8];
    }
  }

  return "Stock not found.";
}

function sendText(chatid,text,replymarkup){
var data = {
    method: "post",
    payload: {
      method: "sendMessage",
      chat_id: String(chatid),
      text: text,
      parse_mode: "HTML",
      reply_markup: JSON.stringify(replymarkup)
    }
  };
  UrlFetchApp.fetch('https://api.telegram.org/bot' + token + '/', data);
}

