/*
 *      filename:       GSheetParser.js
 *      author:         @KeiferC
 *      version:        0.0.1
 *      date:           29 July 2019
 *      description:    This module contains an object that parses
 *                      Google Sheets
 *
 *      note:           This module is to be in a Google Script
 *                      and thus uses constructor functions
 *                      instead of Classes (due to GAS' lack of class
 *                      compatibility)
 */

/**
 * GSheetParser
 *
 * @param       {String} ssId
 * @returns     {Object}
 */
function GSheetParser(ssId)
{
        try {
                this.ss = SpreadsheetApp.openById(ssId);
        } catch(e) {
                throw "Error: Unable to open the given Google Sheet \"" +
                      GSHEET_URL_FORMAT + ssId + "\". Please check if " +
                      "the given URL is spelled correctly and if you " +
                      "have permission to access the given Google Sheet.";
        }
}

//////////////////////////////////////////
// Methods                              //
//////////////////////////////////////////
/**
 * getSheet
 *
 * Returns nth sheet in the Google Sheet.
 * Uses zero-indexing.
 *
 * @param       {Number} index
 * @returns     {Sheet}
 */
GSheetParser.prototype.getSheet = function
(index) 
{
        if (index < 0)
                throw "Error: Invalid sheet number.";

        return this.ss.getSheets()[index];
}

GSheetParser.prototype.getColumnIndex = function
(columnLabel)
{
        var sheet, range, textFinder, index;

        columnLabel = decodeURIComponent(columnLabel);
        sheet = this.getSheet(0);
        range = sheet.getDataRange();
        
        textFinder = range.createTextFinder(columnLabel).matchEntireCell(true);
        index = textFinder.findNext();

        if (index == null)
                throw "Error: Unable to find column \"" + columnLabel + 
                      "\" in given Google Sheet. Please make sure that " + 
                      "the column label is spelled correctly and that it " + 
                      "exists in the given Google Sheet.";

        return index.getColumn();
}

/**
 * getColumn
 *
 * Returns an array of values of the given column
 *
 * @param       {String} columnLabel
 * @returns      {Array}
 */
GSheetParser.prototype.getColumn = function
(columnLabel) 
{
        var sheet, columnIndex, columnValues, values, i;

        sheet = this.getSheet(0);
        values = [];

        columnIndex = this.getColumnIndex(columnLabel);
        columnValues = sheet.getSheetValues(1, columnIndex,
                sheet.getLastRow(), 1);

        for (i = 1; i < sheet.getLastRow(); i++)
                values.push(columnValues[i][0]);

        return values;
}

/**
 * getRow
 *
 * Returns an array of values of the given row
 *
 * @param       {String} rowLabel
 * @returns     {Array}
 */
GSheetParser.prototype.getRow = function
(rowLabel)
{
        var sheet, range, rowValues, values, i, j;

        if (typeof(rowLabel) === "string")
                rowLabel = decodeURIComponent(rowLabel);

        sheet = this.getSheet(0);
        range = sheet.getSheetValues(1, 1, sheet.getLastRow(),
                sheet.getLastColumn())
        rowValues = []
        values = [];

        // Get row
        for (i = 0; i < sheet.getLastRow(); i++) {
                if (range[i][0].valueOf() == rowLabel.valueOf()) {
                        rowValues = range[i];
                        break;
                }
        }

        // Get filled values in row
        for (j = 1; j < rowValues.length; j++) {
                if (rowValues[j])
                        values.push(rowValues[j]);
        }

        return values;
}
