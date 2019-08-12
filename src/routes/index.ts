import { Router } from "express";
import EventRouter from "./Events";
import UserRouter from "./Users";

// create BaseRouter
const router = Router();

// attach user routes to /api/users
router.use("/users", UserRouter);

// attach event routes to /api/events
router.use("/events", EventRouter);

// Export the BaseRouter
export default router;
