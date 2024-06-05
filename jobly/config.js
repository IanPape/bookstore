"use strict";

/** Shared config for application; can be required many places. */

require("dotenv").config();
require("colors");

const SECRET_KEY = process.env.SECRET_KEY || "secret-dev";
const PORT = +process.env.PORT || 3001;

// Always use production database or dev database via env var
function getDatabaseUri() {
  return process.env.DATABASE_URL || "postgresql:///jobly";
}

// Set bcrypt work factor
const BCRYPT_WORK_FACTOR = 12;

console.log("Jobly Config:".green);
console.log("SECRET_KEY:".yellow, SECRET_KEY);
console.log("PORT:".yellow, PORT.toString());
console.log("BCRYPT_WORK_FACTOR".yellow, BCRYPT_WORK_FACTOR);
console.log("Database:".yellow, getDatabaseUri());
console.log("---");

module.exports = {
  SECRET_KEY,
  PORT,
  BCRYPT_WORK_FACTOR,
  getDatabaseUri,
};
