/**
 * Google Apps Script — Herdade em Grândola Booking System
 *
 * SETUP INSTRUCTIONS:
 * 1. Go to Google Sheets → create a new spreadsheet
 * 2. Name Sheet1 tab: "Bookings"
 * 3. Add headers in Row 1: id | name | email | phone | date | time | guests | message | commercial | status | created
 * 4. Go to Extensions → Apps Script
 * 5. Paste this entire code, replacing any default code
 * 6. Click Deploy → New deployment → Web app
 *    - Execute as: Me
 *    - Who has access: Anyone
 * 7. Copy the deployment URL and update APPS_SCRIPT_URL in src/config/siteConfig.ts
 * 8. Run testEmailSend once from the editor to grant email permission, then delete it
 */

const SHEET_ID = "1S2yWByf8YNFAuvzcS8HRlgro_5SK_AG93gep8dqb024";
const SHEET_NAME = "Bookings";
const SITE_URL = "https://pedroggomess.github.io/monte-claro-estate";

function getSheet() {
  return SpreadsheetApp.openById(SHEET_ID).getSheetByName(SHEET_NAME);
}

function generateId() {
  return Utilities.getUuid().replace(/-/g, "").substring(0, 12);
}

function doGet(e) {
  var action = (e.parameter && e.parameter.action) || "list";
  var id = e.parameter && e.parameter.id;

  if (action === "list") return listBookings();
  if (action === "confirm" && id) return updateStatus(id, "confirmed");
  if (action === "cancel" && id) return updateStatus(id, "cancelled");

  return jsonResponse({ error: "Invalid action" });
}

function doPost(e) {
  try {
    var data = JSON.parse(e.postData.contents);
    var sheet = getSheet();
    var id = generateId();
    var now = new Date().toISOString();

    sheet.appendRow([
      id,
      data.name || "",
      data.email || "",
      data.phone || "",
      data.date || "",
      data.time || "",
      data.guests || "",
      data.message || "",
      data.commercial || "No",
      "pending",
      now,
    ]);

    // Send confirmation email to visitor
    if (data.email) {
      sendConfirmationEmail(data, id);
    }

    return jsonResponse({ success: true, id: id });
  } catch (err) {
    return jsonResponse({ error: err.message });
  }
}

function sendConfirmationEmail(data, bookingId) {
  try {
    var confirmUrl = SITE_URL + "/booking?action=confirm&id=" + bookingId;
    var cancelUrl = SITE_URL + "/booking?action=cancel&id=" + bookingId;

    var html = '<!DOCTYPE html><html><head><meta charset="utf-8"></head><body style="margin:0;padding:0;background:#f5f0eb;font-family:Georgia,serif">'
      + '<div style="max-width:600px;margin:0 auto;background:#fffdf9;border:1px solid #e8ddd0">'
      // Header
      + '<div style="text-align:center;padding:40px 30px 30px;border-bottom:1px solid #e8ddd0">'
      + '<h1 style="margin:0;font-size:28px;font-weight:400;color:#1e160e">Herdade em <em style="font-style:italic;color:#a08560">Grandola</em></h1>'
      + '<p style="margin:10px 0 0;font-size:11px;letter-spacing:0.25em;text-transform:uppercase;color:#a08560">GRÂNDOLA · ALENTEJO · PORTUGAL</p>'
      + '</div>'
      // Body
      + '<div style="padding:35px 30px">'
      + '<p style="font-size:16px;color:#1e160e;margin:0 0 20px">Caro(a) ' + (data.name || 'Visitante') + ',</p>'
      + '<p style="font-size:15px;color:#4a3f35;line-height:1.7;margin:0 0 25px">Obrigado por agendar a sua visita privada a Herdade em Grandola. Estamos ansiosos por recebe-lo(a).</p>'
      // Visit details box
      + '<div style="background:#f9f5ef;border:1px solid #e8ddd0;padding:20px 25px;margin:0 0 25px">'
      + '<p style="font-size:10px;letter-spacing:0.2em;text-transform:uppercase;color:#a08560;margin:0 0 15px;font-family:sans-serif">DETALHES DA VISITA</p>'
      + '<table style="width:100%;border-collapse:collapse">'
      + '<tr><td style="padding:8px 0;font-size:14px;color:#6b5e52;border-bottom:1px solid #e8ddd0">Data</td><td style="padding:8px 0;font-size:14px;color:#1e160e;text-align:right;font-weight:600;border-bottom:1px solid #e8ddd0">' + (data.date || '') + '</td></tr>'
      + '<tr><td style="padding:8px 0;font-size:14px;color:#6b5e52;border-bottom:1px solid #e8ddd0">Horario</td><td style="padding:8px 0;font-size:14px;color:#1e160e;text-align:right;font-weight:600;border-bottom:1px solid #e8ddd0">' + (data.time || '') + '</td></tr>'
      + '<tr><td style="padding:8px 0;font-size:14px;color:#6b5e52;border-bottom:1px solid #e8ddd0">Pessoas</td><td style="padding:8px 0;font-size:14px;color:#1e160e;text-align:right;font-weight:600;border-bottom:1px solid #e8ddd0">' + (data.guests || '2') + '</td></tr>'
      + '<tr><td style="padding:8px 0;font-size:14px;color:#6b5e52">Tipo</td><td style="padding:8px 0;font-size:14px;color:#1e160e;text-align:right;font-weight:600">Privada</td></tr>'
      + '</table>'
      + '</div>'
      // Confirm button
      + '<div style="text-align:center;margin:30px 0 15px">'
      + '<a href="' + confirmUrl + '" style="display:inline-block;padding:16px 48px;background:#a08560;color:#ffffff;text-decoration:none;font-size:11px;letter-spacing:0.2em;text-transform:uppercase;font-family:sans-serif">CONFIRMAR VISITA</a>'
      + '</div>'
      // Cancel link (subtle)
      + '<p style="text-align:center;margin:0 0 10px"><a href="' + cancelUrl + '" style="font-size:12px;color:#a08560;text-decoration:underline;font-family:sans-serif">Precisa cancelar? Clique aqui</a></p>'
      + '</div>'
      // Contact info
      + '<div style="padding:25px 30px;border-top:1px solid #e8ddd0;text-align:center">'
      + '<p style="font-size:12px;color:#6b5e52;line-height:1.8;margin:0;font-style:italic">Questoes? Contacte-nos:</p>'
      + '<p style="font-size:13px;color:#1e160e;margin:8px 0 0">+351 919 024 221 · <a href="mailto:herdasantamargarida@gmail.com" style="color:#a08560">herdasantamargarida@gmail.com</a></p>'
      + '</div>'
      // Footer
      + '<div style="text-align:center;padding:20px 30px;border-top:1px solid #e8ddd0;background:#f9f5ef">'
      + '<p style="margin:0;font-size:9px;letter-spacing:0.25em;text-transform:uppercase;color:#a08560;font-family:sans-serif">Herdade em Grandola · Santa Margarida da Serra · Grandola · Portugal</p>'
      + '</div>'
      + '</div></body></html>';

    MailApp.sendEmail({
      to: data.email,
      subject: "Visita Confirmada — Herdade em Grandola — " + (data.date || ""),
      htmlBody: html,
    });
  } catch (emailErr) {
    // Log but don't fail the booking
    Logger.log("Email error: " + emailErr.message);
  }
}

function listBookings() {
  var sheet = getSheet();
  var data = sheet.getDataRange().getValues();
  if (data.length <= 1) return jsonResponse({ bookings: [] });

  var headers = data[0];
  var bookings = [];

  for (var i = 1; i < data.length; i++) {
    var row = {};
    headers.forEach(function(h, j) { row[h] = data[i][j]; });
    if (row.status !== "cancelled") {
      bookings.push({
        id: row.id,
        date: row.date,
        time: row.time,
        status: row.status,
        name: row.name,
      });
    }
  }

  return jsonResponse({ bookings: bookings });
}

function updateStatus(id, newStatus) {
  var sheet = getSheet();
  var data = sheet.getDataRange().getValues();
  var headers = data[0];
  var idCol = headers.indexOf("id");
  var statusCol = headers.indexOf("status");

  if (idCol === -1 || statusCol === -1) {
    return jsonResponse({ error: "Sheet headers not found" });
  }

  for (var i = 1; i < data.length; i++) {
    if (data[i][idCol] === id) {
      sheet.getRange(i + 1, statusCol + 1).setValue(newStatus);
      var name = data[i][headers.indexOf("name")];
      var date = data[i][headers.indexOf("date")];
      var time = data[i][headers.indexOf("time")];
      return jsonResponse({
        success: true,
        status: newStatus,
        name: name,
        date: date,
        time: time,
      });
    }
  }

  return jsonResponse({ error: "Booking not found" });
}

function jsonResponse(data) {
  return ContentService
    .createTextOutput(JSON.stringify(data))
    .setMimeType(ContentService.MimeType.JSON);
}
