const db = require("../db");

async function commonBeforeAll() {
    // Setup initial database state for tests
    await db.query("DELETE FROM jobs");
    await db.query("DELETE FROM companies");
    await db.query(`INSERT INTO companies (handle, name, description, num_employees, logo_url)
                    VALUES ('c1', 'Company1', 'Desc1', 100, 'http://logo.url'),
                           ('c2', 'Company2', 'Desc2', 200, 'http://logo.url')`);
    await db.query(`INSERT INTO jobs (title, salary, equity, company_handle)
                    VALUES ('Job1', 100000, 0, 'c1'),
                           ('Job2', 200000, 0.1, 'c2')`);
}

async function commonBeforeEach() {
    await db.query("BEGIN");
}

async function commonAfterEach() {
    await db.query("ROLLBACK");
}

async function commonAfterAll() {
    await db.end();
}

module.exports = {
    commonBeforeAll,
    commonBeforeEach,
    commonAfterEach,
    commonAfterAll
};
