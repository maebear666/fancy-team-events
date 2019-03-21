"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
const pg_1 = require("pg");
const client = new pg_1.Client();
client.connect();
const getUserQuery = "select id, email, name from users where id=$1";
const addUserQuery = "insert into users (name, email) values ($1, $2) RETURNING id, name, email;";
// @ts-ignore
exports.findUser = (id) => {
    return client.query(getUserQuery, [id]).then(res => {
        if (res.rows.length > 0) {
            return res.rows[0];
        }
    });
};
//# sourceMappingURL=index.js.map