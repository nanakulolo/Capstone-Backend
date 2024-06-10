import express from "express";
import BooksController from "./booksController.js";
import FavoritesController from "./likedBooksController.js";


const router = express.Router();

router.route("/").get(BooksController.apiGetBooks);
router.route("/id/:id").get(BooksController.apiGetBookById);
router.route("/poetry").get(BooksController.apiGetPoetry);
router.route("/fiction").get(BooksController.apiGetFiction);
router.route("/mystery").get(BooksController.apiGetMystery);
router.route("/history").get(BooksController.apiGetHistory);

router.route("/likedBooks").put(FavoritesController.apiUpdateFavorites);
router.route("/likedBooks/:userId").get(FavoritesController.apiGetFavorites);
router.route("/:userId/myLikedBooks").get(FavoritesController.apiGetMyFavorites)



export default router;