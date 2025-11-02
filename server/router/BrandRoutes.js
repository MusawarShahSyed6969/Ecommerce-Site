const express = require("express");
const {
  getAllBrands,
  createBrand,
  updateBrand,
  deleteBrand,
} = require("../controllers/BrandController");
const { authorize } = require("../middleware/roles");
const { protect } = require("../middleware/Auth");

const router = express.Router();

router.get("/", getAllBrands);


router.post("/",protect, authorize("admin"),createBrand);
router.put("/:id",protect, authorize("admin"), updateBrand);
router.delete("/:id",protect, authorize("admin"), deleteBrand);

module.exports = router;
