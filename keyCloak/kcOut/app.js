"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
require("dotenv").config({ path: __dirname + "/../../.env" });
const express_1 = __importDefault(require("express"));
const AuthService_1 = require("./AuthService");
const app = (0, express_1.default)();
const port = process.env.KC_AUTH_PORT;
app.post("/auth/registr", async (req, res) => {
    try {
        const result = await AuthService_1.KeyCloackService.registerUser(req.body);
        res.status(201).json(result);
    }
    catch (err) {
        console.error("Error Regeistering ERROR:\n" + err);
        res.status(500).json({ msg: "error during register", error: err });
    }
});
app.listen(port, () => {
    console.log("KeyCloak Auth APP SERVER STARTED on http://localhost:" + port);
});
