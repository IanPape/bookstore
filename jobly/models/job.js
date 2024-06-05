const db = require("../db");
const { sqlForPartialUpdate } = require("../helpers/sql");
const {
  NotFoundError,
  BadRequestError
} = require("../expressError");

/** Related functions for jobs. */

class Job {
  /** Create a job (from data), update db, return new job data.
   *
   * data should be { title, salary, equity, companyHandle }
   *
   * Returns { id, title, salary, equity, companyHandle }
   **/
  static async create({ title, salary, equity, companyHandle }) {
    const result = await db.query(
          `INSERT INTO jobs (title, salary, equity, company_handle)
           VALUES ($1, $2, $3, $4)
           RETURNING id, title, salary, equity, company_handle AS "companyHandle"`,
        [
          title,
          salary,
          equity,
          companyHandle,
        ]);
    const job = result.rows[0];

    return job;
  }

  /** Find all jobs.
   *
   * Returns [{ id, title, salary, equity, companyHandle }, ...]
   **/
  static async findAll() {
    const jobsRes = await db.query(
          `SELECT id,
                  title,
                  salary,
                  equity,
                  company_handle AS "companyHandle"
           FROM jobs
           ORDER BY title`);
    return jobsRes.rows;
  }

  /** Given a job handle, return data about job.
   *
   * Returns { id, title, salary, equity, companyHandle }
   *
   * Throws NotFoundError if job not found.
   **/
  static async get(handle) {
    const jobRes = await db.query(
          `SELECT id,
                  title,
                  salary,
                  equity,
                  company_handle AS "companyHandle"
           FROM jobs
           WHERE id = $1`,
        [handle]);

    const job = jobRes.rows[0];

    if (!job) throw new NotFoundError(`No job: ${handle}`);

    return job;
  }

  /** Update job data with `data`.
   *
   * This is a "partial update" --- it's fine if data doesn't contain
   * all the fields; this only changes provided ones.
   *
   * Data can include: { title, salary, equity }
   *
   * Returns { id, title, salary, equity, companyHandle }
   *
   * Throws NotFoundError if not found.
   **/
  static async update(handle, data) {
    const { setCols, values } = sqlForPartialUpdate(
        data,
        {});
    const handleVarIdx = "$" + (values.length + 1);

    const querySql = `UPDATE jobs
                      SET ${setCols}
                      WHERE id = ${handleVarIdx}
                      RETURNING id, title, salary, equity, company_handle AS "companyHandle"`;
    const result = await db.query(querySql, [...values, handle]);
    const job = result.rows[0];

    if (!job) throw new NotFoundError(`No job: ${handle}`);

    return job;
  }

  /** Delete given job from database; returns undefined. **/

  static async remove(handle) {
    const result = await db.query(
          `DELETE
           FROM jobs
           WHERE id = $1
           RETURNING id`,
        [handle]);
    const job = result.rows[0];

    if (!job) throw new NotFoundError(`No job: ${handle}`);
  }
}


module.exports = Job;
