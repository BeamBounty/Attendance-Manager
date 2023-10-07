"use server"

import { google } from "googleapis";

// Function to append data to Google Sheets
async function appendDataToSheet(data) {
  // Define the values to be appended
  const formValues = [[
    data.dateOfSub,
    data.timeOfSub,
    data.UID,
    data.subject,
    data.class,
    data.tarTutor,
  ]];

  try {
    const auth = new google.auth.GoogleAuth({
      keyFile: process.env.NEXT_PUBLIC_GOOGLE_API_CREDENTIALS,
      scopes: ["https://www.googleapis.com/auth/spreadsheets"],
    });

    // Save client instance
    const client = await auth.getClient();

    // Initialize the Google Sheets API client
    const sheets = google.sheets({ version: "v4", auth: client });

    const spreadsheetID = process.env.NEXT_PUBLIC_SHEET_ID;

    // Append the values to the sheet
    await sheets.spreadsheets.values.append({
      auth,
      spreadsheetId: spreadsheetID, 
      range: "Test!A:F", // Replace with the correct sheet and range
      valueInputOption: "USER_ENTERED",
      resource: {
        values: formValues,
      },
    });

    console.log("Data appended successfully.");
  } catch (error) {
    console.error("Error appending data to Google Sheets:", error);
  }
}

export { appendDataToSheet };
