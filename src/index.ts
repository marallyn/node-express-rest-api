import express from "express";
import { Request, Response } from "express";
import BaseRouter from "./routes";

const port = process.env.PORT || 3000;
const app = express();

// add middleware and routes
app.use(express.json());
app.use("/api", BaseRouter);

// catch all for undefined routes
app.use("*", (req: Request, res: Response) =>
  res.send({ message: "Looks like you are having trouble. Read the api docs." })
);

// flip the switch
app.listen(port, () => {
  // tslint:disable-next-line:no-console
  console.log(
    "\x1b[34mNS8 Technical Assessment REST API\x1b[0m, running on http://localhost:%d started at \x1b[32m%s\x1b[0m",
    port,
    new Date().toISOString()
  );
});
