import * as dotenv from 'dotenv';
import path = require("path");

dotenv.config({
    path: path.join(__dirname, "/../.env."+(process.env.NODE_ENV || 'test')),
    override: true,
    debug: true
})
