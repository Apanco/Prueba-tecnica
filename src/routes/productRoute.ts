import { Router } from "express"
import { ProductController } from "../controllers/ProductControllers";
import { body, param } from "express-validator"
import { handleInputErrors } from "../middleware/validation";
import { validateProductExist } from "../middleware/product";
const router = Router();

//# -> Params

router.param("productId", validateProductExist)

//# ->  Routes

//. ->  Create a product
router.post("/", 
    body("name").notEmpty().withMessage("El nombre es obligatorio") ,
    body("price").notEmpty().withMessage("El precio es obligatorio")
        .isNumeric().withMessage("Precio no valido")
        .custom( value => {
            if(value < 0){
                throw new Error("Precio no valido")
            }
            return true
        } ) ,
    handleInputErrors,    
    ProductController.createProduct
)
//. ->  Get a products
router.get("/", ProductController.getAllProducts)
//. ->  Get a product by id
router.get("/:productId",
    param("productId").isMongoId().withMessage("Id no valido"),
    handleInputErrors,
    ProductController.getProductById
)
//. ->  Update a product by id
router.put("/:productId",
    param("productId").isMongoId().withMessage("Id no valido"),
    body("name").notEmpty().withMessage("El nombre es obligatorio") ,
    body("price").notEmpty().withMessage("El precio es obligatorio")
        .isNumeric().withMessage("Precio no valido")
        .custom( value => {
            if(value < 0){
                throw new Error("Precio no valido")
            }
            return true
        } ) ,
    handleInputErrors,
    ProductController.updateProductById
)
//. ->  Delete a product by id
router.delete("/:productId",
    param("productId").isMongoId().withMessage("Id no valido"),
    handleInputErrors,
    ProductController.deleteProductById
)

export default router