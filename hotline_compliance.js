function submitForm(e) {

  var s = SpreadsheetApp.openById("1hxE7cBpoPz3o5o2EJtExOCUFH5SFDoOiG-vW1MrJByo").getSheetByName('送信アドレス');
  var data = s.getDataRange().getValues();  //.getNextDataCell(SpreadsheetApp.Direction.DOWN).getValue();
  var content = "";
  var itemResponses = e.response.getItemResponses();


  for (var i = 0; i < itemResponses.length; i++) {
    var itemResponse = itemResponses[i];
    var title = itemResponse.getItem().getTitle();
    var answer = itemResponse.getResponse();
    content += '\n\n[' + title + ']\n\n';
    content += answer;
    if (title === "相談内容を選択して下さい") {
      if (answer === data[1][0]) {
        var address = data[1][1];
      }
      else if (answer === data[2][0]) {
        var address = data[2][1];
      }
    }
  }
  var title = "お問い合わせが送信されました";
  GmailApp.sendEmail(address, title, content);
}



