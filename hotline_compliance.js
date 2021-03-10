function submitForm(e) {

  var title = "お問い合わせが送信されました";
  var content = "";

  var itemResponses = e.response.getItemResponses();
  for (var i = 0; i < itemResponses.length; i++) {
    var itemResponse = itemResponses[i];
    var title = itemResponse.getItem().getTitle();
    var answer = itemResponse.getResponse();
    content += '\n\n[' + title + ']\n\n';
    content += answer;
    if (title === "内容") {
      if (answer === "入力１") {
        var address = "y.egusa@gs.systemi.co.jp";
      }
      else if (answer === "入力２") {
        var address = "y.egusa@systemi.co.jp";
      }
    }
  }
  GmailApp.sendEmail(address, title, content);
}
