import app from "./App";

const port = process.env.PORT || 3000;

app.listen(port, (err) => {
    if (err) {
        // tslint:disable-next-line:no-console
        return console.log(err);
    }

    // tslint:disable-next-line:no-console
    return console.log("Server is listening on port ", port);
});
