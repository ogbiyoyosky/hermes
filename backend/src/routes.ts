import { Router } from "express";

import PublisherControler from "./controllers/pubsub.controller"

import validate from "./middleware/validators/validate";

const router = Router();

router.get("/welcome", (req, res) => {
  return res.status(200).send({
    message: "welcome to the Hermes api",
  });
});

router.get("/", (req, res) => {
  return res.status(200).send({
    message: "welcome to Dorotheos api",
  });
});

router.post("/subscribe/:topic",validate.validateBody(validate.schemas.subcribe), PublisherControler.subcribe)
router.post("/publish/:topic",validate.validateBody(validate.schemas.publish), PublisherControler.publish)
router.post("/event",PublisherControler.event)



export default router;
