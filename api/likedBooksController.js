import FavoritesDAO from "../dao/likedBooksDAO.js"

export default class FavoritesController {

    static async apiUpdateFavorites(req, res, next) {
        try {
            const FavoritesResponse = await FavoritesDAO.updateFavorites(
                req.body._id,
                req.body.favorites
            )

            var { error } = FavoritesResponse
            if (error) {
                res.status(500).json({ error })
            }

            res.json({ status: "success" });
        } catch (e) {
            res.status(500).json({ error: e.message })
        }
    }

    static async apiGetFavorites(req, res, next) {

        try {

            let id = req.params.userId
            let favorites = await FavoritesDAO.getFavorites(id)
            if (!favorites) {
                res.status(404).json({ error: "Not found" })
                return
            }
            res.json(favorites);
        } catch (e) {
            console.log(`API, ${e}`);
            res.status(500).json({ error: e });
        }
    }

    static async apiGetMyFavorites(req, res, next) {
        console.log("apiGetMyFavorites")
        try {
            let id = req.params.userId
            let favorites = await FavoritesDAO.getMyFavorites(id)
            if (!favorites) {
                res.status(404).json({ error: "Not found" })
                return
            }
            res.json(favorites);
        } catch (e) {
            console.log(`API, ${e}`);
            res.status(500).json({ error: e });
        }
    }
}