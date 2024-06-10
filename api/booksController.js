import BooksDAO from "../dao/booksDAO.js";

export default class BooksController {
    
    static async apiGetBooks(req, res, next) {

        const booksPerPage = req.query.booksPerPage ? 
            parseInt(req.query.booksPerPage) : 20;
        const page = req.query.page ? parseInt(req.query.page) : 0;
        let filters = {}
       
        if (req.query.price) {   
            filters.price = req.query.price;
        } else if (req.query.title) {
            filters.title = req.query.title;

        }
    
        
        const { booksList, totalNumBooks } = await 
            BooksDAO.getBooks({ filters, page, booksPerPage });
        let response = {
            books:booksList,
            page:page,
            filters:filters,
            entries_per_page:booksPerPage,
            total_results:totalNumBooks,
        };
        res.json(response);

    }

    static async apiGetPoetry(req, res, next) {
        
        const booksPerPage = req.query.booksPerPage ?
            parseInt(req.query.booksPerPage) : 20;
        const page = req.query.page ? parseInt(req.query.page) : 0;
        const poetry = await BooksDAO.getPoetry({ page, booksPerPage});   
        let response = {
            poetry:poetry,
            page:page,
            entries_per_page:booksPerPage,
        };
        res.json(response);
    }

    static async apiGetFiction(req, res, next) {
        const booksPerPage = req.query.booksPerPage ?
            parseInt(req.query.booksPerPage) : 20;
        const page = req.query.page ? parseInt(req.query.page) : 0;
        const fiction = await BooksDAO.getFiction();   
        let response = {
            fiction:fiction,
            page:page,
            entries_per_page:booksPerPage,
        };
        res.json(response);
    }

    static async apiGetMystery(req, res, next) {
        const booksPerPage = req.query.booksPerPage ?
            parseInt(req.query.booksPerPage) : 20;
        const page = req.query.page ? parseInt(req.query.page) : 0;
        const mystery = await BooksDAO.getMystery();   
        let response = {
            mystery:mystery,
            page:page,
            entries_per_page:booksPerPage,
        };
        res.json(response);
    }

    static async apiGetHistory(req, res, next) {
        const booksPerPage = req.query.booksPerPage ?
            parseInt(req.query.booksPerPage) : 20;
        const page = req.query.page ? parseInt(req.query.page) : 0;
        const history = await BooksDAO.getHistory();
        let response = {
            history:history,
            page:page,
            entries_per_page:booksPerPage,
        };
        res.json(response);


}
    static async apiGetBookById(req, res, next) {
        try {
           
            let id = req.params.id || {};
            let book = await BooksDAO.getBookById(id);
            if (!book) {
                res.status(404).json({ error: "Not found" });
                return;
            }
            res.json(book);
        } catch (e) {
            console.log(`api, ${e}`);
            res.status(500).json({ error: e });
        }
    }
}

