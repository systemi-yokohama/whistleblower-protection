/* global GmailApp, SpreadsheetApp */

// eslint-disable-next-line no-unused-vars
function submitForm (e) {
  const s = SpreadsheetApp.openById('1hxE7cBpoPz3o5o2EJtExOCUFH5SFDoOiG-vW1MrJByo').getSheetByName('送信アドレス') // シート取得
  const data = s.getDataRange().getValues() // 項目・連絡先が入力されているセルの取得

  let title = ''
  let answer = ''
  let content = ''
  let address = ''
  let itemResponse = ''
  let titles = ''
  let answers = ''
  const arr0 = []
  const arr1 = []

  // eslint-disable-next-line no-unused-vars
  function debug (str) {
    const ss = SpreadsheetApp.openById('1hxE7cBpoPz3o5o2EJtExOCUFH5SFDoOiG-vW1MrJByo')
    const s = ss.getSheetByName('デバッグログ')
    s.appendRow([new Date().toLocaleString(), str])
  }

  // フォーム入力内容の取得
  const itemResponses = e.response.getItemResponses()
  for (let i = 0; i < itemResponses.length; i++) {
    itemResponse = itemResponses[i]
    title = itemResponse.getItem().getTitle()
    answer = itemResponse.getResponse()
    titles = [title.toString()]
    answers = [answer.toString()]
    // push メソッドで空の配列に質問内容と回答を追加
    arr0.push(titles)
    arr1.push(answers)
    content += '\n\n[' + title + ']\n\n'
    content += answer
  }

  // 入力内容によって、取得したセル値から送信先を選択
  for (let d = 1; d < data.length; d++) {
    if (arr0[0] == '相談内容を選択して下さい') {
      if (arr1[0] == 'ホットライン') {
        address = data[d][1]
        break
      } else if (arr1[0] == 'コンプライアンス') {
        address = data[d][1]
      }
    }
  }
  title = 'お問い合わせが送信されました'
  GmailApp.sendEmail(address, title, content) // メール送信
}
