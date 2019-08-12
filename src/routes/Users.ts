import { Request, Response, Router } from "express";
import * as user from "../entities/user";

const router = Router();

/*
 * GET GET GET GET GET GET GET GET GET GET GET GET GET GET GET GET GET GET GET
 */

/*
 * Get a user with email :email
 * http://localhost/api/users/:email
 */
router.get("/:email", (req: Request, res: Response) => {
  const email = req.params.email;
  if (user.userExists(email)) {
    res.send(user.getUser(email).getPublicProperties());
  } else {
    res.status(400).send({
      message: `${email} does not exist.`
    });
  }
});

/*
 * POST POST POST POST POST POST POST POST POST POST POST POST POST POST POST
 */

/*
 * Add a new user
 * http://localhost/api/users
 */
router.post("/", (req: Request, res: Response) => {
  const validationResult: user.IValidationResult = user.User.validateParams(
    req.body
  );
  if (validationResult.params) {
    // validated
    const newUser = new user.User(validationResult.params);
    if (user.userExists(newUser.email)) {
      res.status(400).send({
        message: `${newUser.email} already exists.`
      });
    } else {
      user.addUser(newUser);
      res.send(newUser.getPublicProperties());
    }
  } else {
    res.status(400).send({
      message: `Data did not validate as a user: ${validationResult.error}`
    });
  }
});

// Export the UserRouter
export default router;
