import { Router } from "express";
import { check } from "express-validator";
import {
  borrarColorApi,
  crearColorApi,
  editarColorApi,
  listarColoresApi,
  obtenerColorApi,
} from "../controllers/colores.controllers";

const router = Router();

router
  .route("/colores")
  .get(listarColoresApi)
  .post(
    [
      check("nombreColor", "El nombre del color es obligatorio")
        .notEmpty()
        .isLength({ min: 3, max: 20 })
        .withMessage("El color debe tener entre 3 y 20 caracteres"),
    ],
    crearColorApi
  );

router
  .route("/colores/:id")
  .get(obtenerColorApi)
  .put(editarColorApi)
  .delete(borrarColorApi);

export default router;
