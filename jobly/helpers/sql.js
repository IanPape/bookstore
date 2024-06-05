const { BadRequestError } = require("../expressError");/**
 * Generates a partial SQL update query and values array.
 *
 * This function takes an object containing data to update and a mapping object that translates
 * JavaScript-style variable names to their corresponding SQL column names. It returns an object
 * containing a string of SQL column assignments and an array of the corresponding values.
 *
 * @param {Object} dataToUpdate - An object where the keys are the columns to be updated and the values are the new values for those columns.
 * @param {Object} jsToSql - A mapping object that translates JavaScript-style keys to SQL column names.
 * 
 * @returns {Object} An object with two properties:
 *   - `setCols`: A string containing the SQL set clause with placeholders (e.g., '"first_name"=$1, "age"=$2').
 *   - `values`: An array of the values to be used in the SQL query (e.g., ['Aliya', 32]).
 * 
 * @throws {BadRequestError} If `dataToUpdate` is empty.
 * 
 * @example
 * const dataToUpdate = { firstName: 'Aliya', age: 32 };
 * const jsToSql = { firstName: 'first_name' };
 * 
 * const result = sqlForPartialUpdate(dataToUpdate, jsToSql);
 * console.log(result);
 * // {
 * //   setCols: '"first_name"=$1, "age"=$2',
 * //   values: ['Aliya', 32]
 * // }
 */
function sqlForPartialUpdate(dataToUpdate, jsToSql) {
  const keys = Object.keys(dataToUpdate);
  if (keys.length === 0) throw new BadRequestError("No data");

  // {firstName: 'Aliya', age: 32} => ['"first_name"=$1', '"age"=$2']
  const cols = keys.map((colName, idx) =>
      `"${jsToSql[colName] || colName}"=$${idx + 1}`,
  );

  return {
    setCols: cols.join(", "),
    values: Object.values(dataToUpdate),
  };
}

module.exports = { sqlForPartialUpdate };
