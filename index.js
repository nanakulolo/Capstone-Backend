import mongodb from 'mongodb'
import dotenv from 'dotenv'
import app from './server.js'
import BooksDAO from './dao/booksDAO.js'
import likeBookDao from './dao/likedBooksDAO.js'

async function main () {

    dotenv.config()
    const client = new mongodb.MongoClient(process.env.DB_URI)
    const port = process.env.PORT || 8000
    try {
        await client.connect()
        await BooksDAO.injectDB(client)
        await likeBookDao.injectDB(client)

        app.listen(port, () => {
            console.log(`Server is running on port ${port}`)
        })
    } catch (error) {
        console.log(error)
        process.exit(1)
    }
}

main().catch(console.error)
export default app