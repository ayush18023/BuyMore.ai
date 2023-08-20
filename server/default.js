import { products } from './constants/data.js'
import Product from './model/product-schema.js'
const DefaultData = async () => {
    try {
        await Product.insertMany(products)
        console.log('Data imported succesfully')
    } catch (err) {
        console.log('Error while inserting default data', err.message)
    }
}
export default DefaultData