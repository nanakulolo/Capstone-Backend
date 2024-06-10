import mongodb from "mongodb";
const ObjectId = mongodb.ObjectId;

let books;

export default class BooksDAO {
  
    static async injectDB(conn) { 

        try {
            books = await conn.db
            (process.env.DB_URI_COLLECTION)
            .collection("books");
         
        } catch (e) {
            console.error(`Unable to establish a collection handle in booksDAO: ${e}`);
        }
 
        
    } 


    static async getBooks({
        filters = null,
        page = 0,
        booksPerPage = 20,
        } = {}) { // empty object as default value
        let query;
        if (filters) {
            if ("title" in filters) {
                const regexPattern = `.*${filters["title"]}.*`;
                query = { "Title": { $regex: regexPattern, $options:"i" } }
                // query = { $text: { $search: filters["title"] } };

     
            } else if ("Price" in filters) {
                query = { "Price": { $eq: filters["Price"] } };
            }
        }
        let cursor;

        try {

            cursor = await books.find(query)
            .limit(booksPerPage)
            .skip(booksPerPage * page);
            const booksList = await cursor.toArray();
            const totalNumBooks = await books.countDocuments(query);
            return { booksList, totalNumBooks };
        } catch (e) {
            console.error(`Unable to issue find command, ${e}`);
            return { booksList: [], totalNumBooks: 0 };
        }
    }

    static async getPoetry({
        page = 0,
        booksPerPage = 20,
    } = {}) {
        let cursor;
        try {
            cursor = await books.find({ "Category": "Poetry" })
            .limit(booksPerPage)
            .skip(booksPerPage * page);
            const booksList = await cursor.toArray();
            return booksList;
        } catch (e) {
            console.error(`Unable to issue find command, ${e}`);
            return { booksList: [] };
        }
    }

    static async getFiction({
            page = 0,
            booksPerPage = 20,
        } = {}) {
        let cursor;
        try { 
            const categoryKeyWord = "Fiction";
            const regexPattern = `.*${categoryKeyWord}.*`;
            cursor = await books.find({ "Category": { $regex: regexPattern, $options:"i" } })
            .limit(booksPerPage)
            .skip(booksPerPage * page)
            ;
            const booksList = await cursor.toArray();
            return booksList;
        } catch (e) {
            console.error(`Unable to issue find command, ${e}`);
            return { booksList: [] };
        }
    }

    static async getMystery({
        page = 0,
        booksPerPage = 20,
    } = {}) {
        let cursor;
        try {
            cursor = await books.find({ "Category": "Mystery" })
            .limit(booksPerPage)
            .skip(booksPerPage * page);
            const booksList = await cursor.toArray();
            return booksList;
        } catch (e) {
            console.error(`Unable to issue find command, ${e}`);
            return { booksList: [] };
        }
    }

    static async getHistory({
        page = 0,
        booksPerPage = 20,
    } = {}) {
        let cursor;
        try {
            cursor = await books.find({ "Category": "History" })
            .limit(booksPerPage)
            .skip(booksPerPage * page);
            const booksList = await cursor.toArray();
            return booksList;
        } catch (e) {
            console.error(`Unable to issue find command, ${e}`);
            return { booksList: [] };
        }
    }

    static async getBookById(id) {
        try {
            return await books.aggregate([
                {
                    $match: {
                        _id: new ObjectId(id),
                    }
                },
                {
                    $lookup: {
                        from:"books",
                        localField:"_id",
                        foreignField:"book_id",
                        as:"books",
                    }
                }
            ]).next();
        } catch (e) {
            console.error(`Something went wrong in getBookById: ${e}`);
            throw e;



        }
    }
        
    


}
