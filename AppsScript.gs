// Paste this entire file into your Google Apps Script project and redeploy.
// Each participant produces 4 rows (Q2–Q5). Q1 is a trial and is not recorded.

function doPost(e) {
  const data = JSON.parse(e.postData.contents);

  const sheet = SpreadsheetApp.getActiveSpreadsheet().getActiveSheet();

  // Header row (only write once — skip if already present)
  if (sheet.getLastRow() === 0) {
    sheet.appendRow([
      'First Name', 'Last Name', 'Type', 'Question',
      'Reading Answer', 'Reading Time',
      'Recall Answer',  'Recall Time',
      'Presentation', 'Confidence', 'Takeaways'
    ]);
  }

  for (let i = 2; i <= 5; i++) {
    const fb = data.feedback?.[i] ?? {};
    const readingTime = data.timings?.[i]      != null ? (data.timings[i]      / 1000).toFixed(1) + 's' : '';
    const recallTime  = data.recallTimings?.[i] != null ? (data.recallTimings[i] / 1000).toFixed(1) + 's' : '';

    sheet.appendRow([
      i === 2 ? data.firstName : '',
      i === 2 ? data.lastName  : '',
      i === 2 ? data.type      : '',
      i,
      data.answers?.[i]       ?? '',
      readingTime,
      data.recallAnswers?.[i] ?? '',
      recallTime,
      fb.presentation ?? '',
      fb.confidence   ?? '',
      fb.takeaways    ?? '',
    ]);
  }

  // Blank separator row between participants
  sheet.appendRow([]);

  return ContentService
    .createTextOutput(JSON.stringify({ status: 'ok' }))
    .setMimeType(ContentService.MimeType.JSON);
}
