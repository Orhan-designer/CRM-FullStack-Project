const express = require("express");
const controller = require("../controllers/position");
const router = express.Router(); //создаём локальный роутер
const passport = require("passport");

router.get(
  "/:categoryId",
  passport.authenticate("jwt", { session: false }),
  controller.getByCategoryId
);
router.post(
  "/",
  passport.authenticate("jwt", { session: false }),
  controller.create
);
router.patch(
  "/:id",
  passport.authenticate("jwt", { session: false }),
  controller.update
);
router.delete(
  "/:id",
  passport.authenticate("jwt", { session: false }),
  controller.delete
);

module.exports = router;
