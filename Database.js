"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
var mysql = require("mysql");
var node_mysql_wrapper_1 = require("node-mysql-wrapper");
var Database = /** @class */ (function () {
    function Database() {
        this.connection = mysql.createConnection({
            host: "localhost",
            user: "root",
            password: "root",
            database: "new_test"
        });
        this.db = node_mysql_wrapper_1.wrap(this.connection);
    }
    return Database;
}());
exports.default = new Database().db;
//# sourceMappingURL=Database.js.map