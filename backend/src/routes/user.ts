import express from "express";
import * as UserController from "src/controllers/user";
import * as UserValidator from "src/validators/user";

const router = express.Router();

router.get("/:id", UserController.getUser);

// router.post("/", (req, res) => {
//   console.log("Request body:", req.body);
//   res.status(200).send("Success");
// });
router.post("/", UserValidator.createUser, UserController.createUser);

export default router;
