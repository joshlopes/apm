import * as dotenv from 'dotenv';
import path = require("path");
import {myContainer} from "../src/Infrastructure/DependencyInjection/inversify.config";
import {TYPES} from "../src/Domain/DependencyInjection/types";

dotenv.config({
    path: path.join(__dirname, '/../.env.test'),
    debug: true
})

