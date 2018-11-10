"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
var App_1 = require("./App");
var port = process.env.PORT || 3000;
App_1.default.listen(port, function (err) {
    if (err) {
        // tslint:disable-next-line:no-console
        return console.log(err);
    }
    // tslint:disable-next-line:no-console
    return console.log("Server is listening on port ", port);
});
//# sourceMappingURL=index.js.map