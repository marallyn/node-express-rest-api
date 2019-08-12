import { Request, Response, Router } from "express";
import * as event from "../entities/event";

const router = Router();

/*
 * GET GET GET GET GET GET GET GET GET GET GET GET GET GET GET GET GET GET GET
 */

/*
 * Get all events for all users
 * http://localhost/api/events
 *
 */

router.get("/", (req: Request, res: Response) => {
  res.send(event.getAll());
});

/*
 * Get all events for the last day
 * http://localhost/api/events/day
 */
router.get("/day", (req: Request, res: Response) => {
  res.send(event.getWithinDay());
});

/*
 * Get all events for a single user
 * http://localhost/api/events/:user
 */
router.get("/:user", (req: Request, res: Response) => {
  const user: string = req.params.user;
  res.send(event.getByUser(user));
});

/*
 * POST POST POST POST POST POST POST POST POST POST POST POST POST POST POST
 */

/*
 * Add a new event
 * http://localhost/api/events
 */
router.post("/", (req: Request, res: Response) => {
  const validationResult: event.IValidationResult = event.Event.validateParams(
    req.body
  );
  if (validationResult.params) {
    // validated
    const newEvent = new event.Event(validationResult.params);
    event.addEvent(newEvent);
    res.send(newEvent.getProperties());
  } else {
    res.status(400).send({
      message: `Data did not validate as an event: ${validationResult.error}`
    });
  }
});

// Export the Eventrouter
export default router;
