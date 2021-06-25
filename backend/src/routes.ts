import { Router } from "express";
import AuthenticateUserController from "./controllers/AuthenticateUserController";
import CreateComplimentController from "./controllers/CreateComplimentController";
import CreateTagController from "./controllers/CreateTagController";
import CreateUserController from "./controllers/CreateUserController";
import ListTagsController from "./controllers/ListTagsController";
import ListUserComplimentsReceivedController from "./controllers/ListUserComplimentsReceivedController";
import ListUserComplimentsSendedController from "./controllers/ListUserComplimentsSendedController";
import ListUsersControllers from "./controllers/ListUsersController";
import ensureAdmin from "./middlewares/ensureAdmin";
import ensureAuthenticated from "./middlewares/ensureAuthenticated";

const router = Router();
const createUserController = new CreateUserController();
const createTagController = new CreateTagController();
const authenticateUserController = new AuthenticateUserController();
const createComplimentController = new CreateComplimentController();
const listComplimentsReceivedController =
  new ListUserComplimentsReceivedController();
const listComplimentsSendedController =
  new ListUserComplimentsSendedController();
const listTagsController = new ListTagsController();
const listUsersController = new ListUsersControllers();

router.post("/users", createUserController.handle);
router.post(
  "/tags",
  ensureAuthenticated,
  ensureAdmin,
  createTagController.handle
);
router.post("/login", authenticateUserController.handle);
router.post(
  "/compliment",
  ensureAuthenticated,
  createComplimentController.handle
);

router.get(
  "/users/compliments/sended",
  ensureAuthenticated,
  listComplimentsSendedController.handle
);
router.get(
  "/users/compliments/received",
  ensureAuthenticated,
  listComplimentsReceivedController.handle
);

router.get("/tags", ensureAuthenticated, listTagsController.handle);
router.get("/users", ensureAuthenticated, listUsersController.handle);

export default router;
