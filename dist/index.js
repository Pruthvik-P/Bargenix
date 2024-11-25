"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
const express_1 = __importDefault(require("express"));
const body_parser_1 = __importDefault(require("body-parser"));
const couponRoutes_1 = __importDefault(require("./routes/couponRoutes"));
const logRoutes_1 = __importDefault(require("./routes/logRoutes"));
const app = (0, express_1.default)();
app.use(body_parser_1.default.json());
app.use("/api/v1/coupons", couponRoutes_1.default);
app.use("/api/v1/logs", logRoutes_1.default);
const PORT = process.env.PORT || 3000;
app.listen(process.env.PORT, () => {
    console.log(`Server is running on http://localhost:${PORT}`);
});
