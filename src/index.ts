import "reflect-metadata";
import {createConnection} from "typeorm";
import * as express from "express";
import * as bodyParser from "body-parser";
import {Request, Response} from "express";
import {Routes} from "./routes";
import {User} from "./entity/User";
import {genSaltSync, hashSync} from "bcryptjs";

const salt: string = genSaltSync(10);

createConnection().then(async connection => {

    // create express app
    const app = express();
    app.use(bodyParser.json());

    // register express routes from defined application routes
    Routes.forEach(route => {
        (app as any)[route.method](route.route, (req: Request, res: Response, next: Function) => {
            const result = (new (route.controller as any))[route.action](req, res, next);
            if (result instanceof Promise) {
                result.then(result => result !== null && result !== undefined ? res.send(result) : undefined);

            } else if (result !== null && result !== undefined) {
                res.json(result);
            }
        });
    });

    // setup express app here
    // ...

    // start express server
    app.listen(3000);

    try {
        // insert new users for test
        await connection.manager.save(connection.manager.create(User, {
            firstName: "Timber",
            lastName: "Saw",
            userName: "tim1",
            password: hashSync("timpassword", salt),
            avatar: "1_avatar.jpg"
        }));
        await connection.manager.save(connection.manager.create(User, {
            firstName: "Phantom",
            lastName: "Assassin",
            userName: "ThePhantom",
            password: hashSync("phantompassword", salt),
            avatar: "2_avatar.jpg"
        }));
        await connection.manager.save(connection.manager.create(User, {
            userName: "JustUserName",
            password: hashSync("justpassword", salt),
        }));
    } catch (e) {
        console.log("Failed to create test users. Likely they already exist in the database.")
    }

    console.log("Express server has started on port 3000. Open http://localhost:3000/users to see results");

}).catch(error => console.log(error));
