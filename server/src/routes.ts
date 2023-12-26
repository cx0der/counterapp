import { Router } from "express";
import {
  createUser,
  getCounters,
  increaseCounter,
  eventsHandler,
} from "./controllers";

const router: Router = Router();

router.post("/login", createUser);
router.get("/counters", getCounters);
router.put("/counters/:username", increaseCounter);
router.get("/events", eventsHandler);

export default router;
