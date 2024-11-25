import express from "express";
import bodyParser from "body-parser";
import couponRoutes from "./routes/couponRoutes";
import logRoutes from "./routes/logRoutes";

const app = express();

app.use(bodyParser.json());


app.use("/api/v1/coupons", couponRoutes);
app.use("/api/v1/logs", logRoutes);


const PORT = process.env.PORT || 3000;
app.listen(process.env.PORT, () => {
  console.log(`Server is running on http://localhost:${PORT}`);
});
