function submitForm(e) {
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
        var address = "y.egusa@gs.systemi.co.jp";
      }
      else if (answer === "コンプライアンス") {
        var address = "y.egusa@systemi.co.jp";
      }
    }
  }
  title = "お問い合わせが送信されました";
  GmailApp.sendEmail(address, title, content);
}
