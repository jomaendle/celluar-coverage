import * as express from "express";
import db from "./Database";
const path = require("path");

class App {
    public express;

    constructor() {
        this.express = express();
        this.mountRoutes();
    }

    private mountRoutes(): void {
        const router = express.Router();
        router.get("/", async (req, res) => {

            res.sendFile(path.join(__dirname, "index.html"));
        });
        this.express.use("/", router);

        router.get("/query", async (req, res) => {

           var erg = await this.checkValues(parseFloat(req.query.lat), parseFloat(req.query.lon));
           console.log("Server")
           console.log(erg);
           res.send(erg);
        });
    }

    private roundUp(num, precision) {
        precision = Math.pow(10, precision)
        return Math.ceil(num * precision) / precision
      }

    private roundToBiggerNumber(values: number[] ): any{
        if(values !== null || values.length >0){
            let results: number[] =  [0,0];
            let decimals: number[] = this.getDecimalNumbers(values[0], values[1]);
            results[0] = this.roundUp(values[0],decimals[0]-1);
            results[1] = this.roundUp(values[1],decimals[1]-1);
            return results;
        }
    }

    private getDecimalNumbers(lon: number, lat: number): any {
        let lonStr: string = lon+"";
        let latStr: string = lat+"";

        let numberOfDecimalsInLonStr = 0.0;
        let numberOfDecimalsInLatStr = 0.0;

        if(lonStr.includes(".")){
            let resLonStr: string[] = lonStr.split(".");
            numberOfDecimalsInLonStr = resLonStr[1].length;
        }

        if(latStr.includes(".")){
            let resLatStr: string[] = latStr.split(".");
            numberOfDecimalsInLatStr = resLatStr[1].length;
        }

        return [numberOfDecimalsInLonStr, numberOfDecimalsInLatStr];
        
    }

    private checkValues(lon: number, lat: number): any {
        let roundedValues: number[] = this.roundToBiggerNumber([lon, lat]);
        console.log("lon Rounded: "+roundedValues[0]);
        console.log("lat Rounded: "+roundedValues[1]); 

        return new Promise((resolve, reject) => {
            
            db.ready(() =>  {
                console.log("lon: "+lon + " lat: "+lat);
                db.query(
                'SELECT * FROM `cellData` WHERE lon>='+ lon +' AND lon <= '+ roundedValues[0] +
                ' AND lat>= '+ lat +' AND lat<='+ roundedValues[1], function (error, results) {
                // error will be an Error if one occurred during the query
                // results will contain the results of the query
                if(error){
                    console.log(error)
                }
                if(results){
                    //console.log("res: "+results[0]);
                    resolve(results);
                    return results;
                }else{
                    reject("No data found");
                    return "No user found.";
                }
            });
        });
    });
    }
}

export default new App().express;
