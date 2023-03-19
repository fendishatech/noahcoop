const express = require("express");
const emergencyContactController = require("../controllers/emergencyContactController");

const { verifyToken } = require("../../../middlewares/verifyToken");
const refreshToken = require("../../../middlewares/refreshToken");

const {
  emergencyContactValidator,
} = require("../validators/emergencyContactValidator");

const router = express.Router();

router.get(
  "/emergency_contacts",
  emergencyContactController.getEmergencyContacts
);
router.get(
  "/emergency_contacts/:id",
  emergencyContactController.getEmergencyContact
);

router.post(
  "/emergency_contacts",
  emergencyContactValidator,
  emergencyContactController.insert
);

router.put(
  "/emergency_contacts/:id",
  emergencyContactValidator,
  emergencyContactController.update
);
router.delete("/emergency_contacts/:id", emergencyContactController.destroy);

module.exports = router;
