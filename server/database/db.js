import mongoose from 'mongoose'
mongoose.set('strictQuery', false)
const Connection = async (user, pass) => {
    try {
        const URL = `mongodb+srv://${user}:${pass}@buymore.tv34068.mongodb.net/?retryWrites=true&w=majority`
        await mongoose.connect(URL, { useUnifiedTopology: true, useNewUrlParser: true })
        console.log('database connected successfully')
    } catch (err) {
        console.log('Error while connecting with the database', err.message)
    }
}
export default Connection