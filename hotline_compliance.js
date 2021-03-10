function submitForm(e) {

  var s = SpreadsheetApp.openById("1hxE7cBpoPz3o5o2EJtExOCUFH5SFDoOiG-vW1MrJByo").getSheetByName('送信アドレス');

  var hotline = s.getRange('A:A').getNextDataCell(SpreadsheetApp.Direction.DOWN).getValue();
  var compliance = s.getRange('B:B').getNextDataCell(SpreadsheetApp.Direction.DOWN).getValue();

  var content = "";
  var itemResponses = e.response.getItemResponses();
  for (var i = 0; i < itemResponses.length; i++) {
    var itemResponse = itemResponses[i];
    var title = itemResponse.getItem().getTitle();
    var answer = itemResponse.getResponse();
    content += '\n\n[' + title + ']\n\n';
    content += answer;
    if (title === "相談内容を選択して下さい") {
      if (answer === "ホットライン") {
        var address = hotline;
      }
      else if (answer === "コンプライアンス") {
        var address = compliance;
      }
    }
  }
  var title = "お問い合わせが送信されました";
  GmailApp.sendEmail(address, title, content);
}
