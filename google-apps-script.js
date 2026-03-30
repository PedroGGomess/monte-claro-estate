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
 */

const SHEET_NAME = "Bookings";

function getSheet() {
  return SpreadsheetApp.getActiveSpreadsheet().getSheetByName(SHEET_NAME);
}

function generateId() {
  return Utilities.getUuid().replace(/-/g, "").substring(0, 12);
}

function doGet(e) {
  const action = (e.parameter && e.parameter.action) || "list";
  const id = e.parameter && e.parameter.id;

  if (action === "list") {
    return listBookings();
  } else if (action === "confirm" && id) {
    return updateStatus(id, "confirmed");
  } else if (action === "cancel" && id) {
    return updateStatus(id, "cancelled");
  }

  return jsonResponse({ error: "Invalid action" }, 400);
}

function doPost(e) {
  try {
    const data = JSON.parse(e.postData.contents);
    const sheet = getSheet();
    const id = generateId();
    const now = new Date().toISOString();

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

    return jsonResponse({ success: true, id: id });
  } catch (err) {
    return jsonResponse({ error: err.message }, 500);
  }
}

function listBookings() {
  const sheet = getSheet();
  const data = sheet.getDataRange().getValues();
  if (data.length <= 1) return jsonResponse({ bookings: [] });

  const headers = data[0];
  const bookings = [];

  for (let i = 1; i < data.length; i++) {
    const row = {};
    headers.forEach((h, j) => { row[h] = data[i][j]; });
    // Only return active bookings (pending or confirmed)
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
  const sheet = getSheet();
  const data = sheet.getDataRange().getValues();
  const headers = data[0];
  const idCol = headers.indexOf("id");
  const statusCol = headers.indexOf("status");

  if (idCol === -1 || statusCol === -1) {
    return jsonResponse({ error: "Sheet headers not found" }, 500);
  }

  for (let i = 1; i < data.length; i++) {
    if (data[i][idCol] === id) {
      sheet.getRange(i + 1, statusCol + 1).setValue(newStatus);
      const name = data[i][headers.indexOf("name")];
      const date = data[i][headers.indexOf("date")];
      const time = data[i][headers.indexOf("time")];
      return jsonResponse({
        success: true,
        status: newStatus,
        name: name,
        date: date,
        time: time,
      });
    }
  }

  return jsonResponse({ error: "Booking not found" }, 404);
}

function jsonResponse(data, code) {
  return ContentService
    .createTextOutput(JSON.stringify(data))
    .setMimeType(ContentService.MimeType.JSON);
}
