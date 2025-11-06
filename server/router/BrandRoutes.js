const express = require("express");
const {
  getAllBrands,
  createBrand,
  updateBrand,
  deleteBrand,
  getBrandById,
} = require("../controllers/BrandController");
const { authorize } = require("../middleware/roles.js");
const { protect } = require("../middleware/auth.js");

const router = express.Router();

router.get("/", getAllBrands);
router.get("/:id", getBrandById);


router.post("/",protect, authorize("admin"),createBrand);
router.put("/:id",protect, authorize("admin"), updateBrand);
router.delete("/:id",protect, authorize("admin"), deleteBrand);

module.exports = router;
