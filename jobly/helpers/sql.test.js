const { sqlForPartialUpdate } = require('./sql');
const { BadRequestError } = require('../expressError');

describe('sqlForPartialUpdate', function () {
  test('works with valid input', function () {
    const dataToUpdate = { firstName: 'Aliya', age: 32 };
    const jsToSql = { firstName: 'first_name' };

    const result = sqlForPartialUpdate(dataToUpdate, jsToSql);

    expect(result).toEqual({
      setCols: '"first_name"=$1, "age"=$2',
      values: ['Aliya', 32],
    });
  });

  test('works without jsToSql mapping', function () {
    const dataToUpdate = { firstName: 'Aliya', age: 32 };

    const result = sqlForPartialUpdate(dataToUpdate, {});

    expect(result).toEqual({
      setCols: '"firstName"=$1, "age"=$2',
      values: ['Aliya', 32],
    });
  });

  test('throws BadRequestError if no data', function () {
    try {
      sqlForPartialUpdate({}, {});
      throw new Error('Test should have thrown an error');
    } catch (err) {
      expect(err.message).toBe('No data');
    }
  });
});
