const request = require("supertest");
const db = require("../db");
const app = require("../app");

const { commonBeforeAll, commonBeforeEach, commonAfterEach, commonAfterAll } = require("../tests/setup");

const Job = require("./job");
const { NotFoundError, BadRequestError } = require("../expressError");

beforeAll(async function () {
  await db.query("DELETE FROM jobs");
  await db.query("DELETE FROM companies");
  await db.query(`
    INSERT INTO companies (handle, name, description, num_employees, logo_url)
    VALUES ('c1', 'C1', 'Desc1', 1, 'http://c1.img'),
           ('c2', 'C2', 'Desc2', 2, 'http://c2.img')
  `);
  await db.query(`
    INSERT INTO jobs (title, salary, equity, company_handle)
    VALUES ('Job1', 100000, '0', 'c1'),
           ('Job2', 200000, '0.1', 'c2')
  `);
});

beforeEach(commonBeforeEach);
afterEach(commonAfterEach);
afterAll(commonAfterAll);

describe("create", () => {
  test("works", async function () {
    let job = await Job.create({
      title: "New Job",
      salary: 50000,
      equity: "0",
      companyHandle: "c1"
    });
    expect(job).toEqual({
      id: expect.any(Number),
      title: "New Job",
      salary: 50000,
      equity: "0",
      companyHandle: "c1"
    });
  });
});

describe("findAll", () => {
  test("works", async function () {
    let jobs = await Job.findAll();
    console.log("findAll jobs:", jobs);
    expect(jobs).toEqual([
      { id: expect.any(Number), title: "Job1", salary: 100000, equity: "0", companyHandle: "c1" },
      { id: expect.any(Number), title: "Job2", salary: 200000, equity: "0.1", companyHandle: "c2" }
    ]);
  });
});

describe("update", () => {
  test("works", async function () {
    const jobToUpdate = await Job.findAll();
    console.log("Job to update:", jobToUpdate);
    let job = await Job.update(jobToUpdate[0].id, {
      title: "Updated Job",
      salary: 60000,
      equity: "0.2"
    });
    console.log("Updated job:", job);
    expect(job).toEqual({
      id: jobToUpdate[0].id,
      title: "Updated Job",
      salary: 60000,
      equity: "0.2",
      companyHandle: "c1"
    });
  });

  test("not found if no such job", async function () {
    try {
      await Job.update(9999, {
        title: "nope",
        salary: 60000,
        equity: "0.2"
      });
      fail();
    } catch (err) {
      expect(err instanceof NotFoundError).toBeTruthy();
    }
  });
});

describe("remove", () => {
  test("works", async function () {
    const jobToRemove = await Job.findAll();
    console.log("Job to remove:", jobToRemove);
    await Job.remove(jobToRemove[0].id);
    const res = await db.query("SELECT id FROM jobs WHERE id = $1", [jobToRemove[0].id]);
    console.log("Remove job result:", res.rows);
    expect(res.rows.length).toEqual(0);
  });

  test("not found if no such job", async function () {
    try {
      await Job.remove(9999);
      fail();
    } catch (err) {
      expect(err instanceof NotFoundError).toBeTruthy();
    }
  });
});
