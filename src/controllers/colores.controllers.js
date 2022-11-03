import { validationResult } from "express-validator";
import Color from "../models/Color";

export const listarColoresApi = async (req, res) => {
  try {
    const colores = await Color.find();

    res.status(200).json(colores);
  } catch (error) {
    console.log(error);
    res.status(404).json({
      mensaje: "Error al buscar la lista",
    });
  }
};

export const obtenerColorApi = async (req, res) => {
  try {
    const colorBuscado = await Color.findById(req.params.id);

    res.status(200).json(colorBuscado);
  } catch (error) {
    console.log(error);
    res.status(400).json({
      mensaje: "Error al buscar el color",
    });
  }
};

export const crearColorApi = async (req, res) => {
  try {
    const errors = validationResult(req);
    if (!errors.isEmpty()) {
      return res.status(400).json({
        errors: errors.array(),
      });
    }

    const colorNuevo = new Color(req.body);
    await colorNuevo.save();
    res.status(201).json({
      mensaje: "El color se subio correctamente",
    });
  } catch (error) {
    console.log(error);
    res.status(404).json({
      mensaje: "No se pudo eliminar correctamente",
    });
  }
};

export const editarColorApi = async (req, res) => {
  try {
    console.log(req.params.id)
    console.log(req.body)
    await Color.findByIdAndUpdate(req.params.id, req.body);
    res.status(200).json({
      mensaje: "El color fue actualizado correctamente",
    });
  } catch (error) {
    console.log(error);
    res.status(400).json({
      mensaje: "Error al intentar editar el color",
    });
  }
};

export const borrarColorApi = async (req, res) => {
  try {
    await Color.findByIdAndDelete(req.params.id);
    res.status(200).json({
      mensaje: "El color fue eliminado",
    });
  } catch (error) {
    console.log(error);
    res.status(404).json({
      mensaje: "Error al borrar el color",
    });
  }
};
