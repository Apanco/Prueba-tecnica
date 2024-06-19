import { request, type Request, type Response } from "express"
import Product from "../models/Product"

export class ProductController{
    //# ->  C = Create a product
    static createProduct = async ( request : Request, response : Response )=> {
        try {
            const product = new Product
            product.name = request.body.name
            product.price = request.body.price
            await product.save()
            response.status(200).send("Producto creado correctamente")
        } catch (error) { 
            response.status(500).json({error:"Hubo un error al procesar la solicitud"})
        }
    }

    //# ->  R = Read all products
    static getAllProducts = async ( request : Request, response : Response ) => {
        try {
            const products = await Product.find({})
            response.status(200).json(products)
            return
        } catch (error) {
            response.status(500).json({error:"Hubo un error al procesar la solicitud"})
        }
    }
    //# ->  R = Get a product by id
    static getProductById = async ( request : Request, response : Response ) => {
        try {
            const product = request.product
            response.status(200).json(product)
        } catch (error) {
            response.status(500).json({error : "Hubo un error al procesar la colicitud"})
        }
    }
    //# ->  U = Update a product
    static updateProductById = async ( request : Request, response : Response ) => {
        try {
            const product = request.product
            product.name = request.body.name
            product.price = request.body.price
            await product.save()
            response.send("Producto actualizado correctamente")
        } catch (error) {
            response.status(500).json({error:"Hubo un error al procesar la solicitud"})
        }
    }
    //# ->  D = Delete a product
    static deleteProductById = async ( request : Request, response : Response ) => {
        try {
            const product = request.product
            await product.deleteOne()
            response.status(201).send("Producto eliminado correctamente")
        } catch (error) {
            response.status(500).json({error:"Hubo un error al procesar la solicitud"})
        }
    }
}