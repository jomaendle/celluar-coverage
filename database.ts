import mysql = require("mysql");
import {wrap} from "node-mysql-wrapper";

class Database {

    public connection;
    public db;

    constructor() {
        this.connection = mysql.createConnection({
            host    :   "localhost",
            user    :   "root",
            password:   "root",
            database:   "new_test"
        });

        this.db = wrap(this.connection);
    }
}

export default new Database().db;
