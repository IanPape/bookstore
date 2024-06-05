const request = require("supertest");
const db = require("../db");
const app = require("../app");

const { commonBeforeAll, commonBeforeEach, commonAfterEach, commonAfterAll } = require("../tests/setup");

const User = require("./user");
const { NotFoundError, BadRequestError } = require("../expressError");

beforeAll(async function () {
  await db.query("DELETE FROM users");
  await db.query("DELETE FROM jobs");
  await db.query("DELETE FROM companies");

  await db.query(`
    INSERT INTO companies (handle, name, description, num_employees, logo_url)
    VALUES ('c1', 'C1', 'Desc1', 1, 'http://c1.img'),
           ('c2', 'C2', 'Desc2', 2, 'http://c2.img')
  `);

  await db.query(`
    INSERT INTO users (username, password, first_name, last_name, email, is_admin)
    VALUES ('u1', 'password1', 'U1F', 'U1L', 'u1@email.com', false),
           ('u2', 'password2', 'U2F', 'U2L', 'u2@email.com', false)
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

describe("get", function () {
  test("works", async function () {
    let user = await User.get("u1");
    expect(user).toEqual({
      username: "u1",
      firstName: "U1F",
      lastName: "U1L",
      email: "u1@email.com",
      isAdmin: false,
      jobs: [], // Expecting jobs array in the returned object
    });
  });

  test("not found if no such user", async function () {
    try {
      await User.get("nope");
      fail();
    } catch (err) {
      expect(err instanceof NotFoundError).toBeTruthy();
    }
  });
});
