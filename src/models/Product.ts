import mongoose, {Schema, Document, Types} from "mongoose";

//. ->  Interface
export interface ProductInterface extends Document {
    name: string,
    price: number,
    category: Types.ObjectId

}

//. ->  Schema

export const ProductSchema : Schema = new Schema({
    name:{
        type:String,
        require:true,
    },
    price:{
        type: Number,
        require:true
    }
})

//. ->  Model
const Product = mongoose.model<ProductInterface>("Product", ProductSchema)
export default Product