import mongodb from "mongodb";

let favoritesCollection;
let moviesCollection;
const ObjectId = mongodb.ObjectId;

export default class FavoritesDAO {
    static async injectDB(conn) {
        if (favoritesCollection) {
            return;
        }
        try {
            const mongo = await conn.db(process.env.DB_URI_COLLECTION)
            favoritesCollection = mongo.collection("likedBooks");
            moviesCollection = mongo.collection("books");
        }
        catch (e) {
            console.error(`Unable to connect in FavoritesDAO: ${e}`);
        }
    }

    static async updateFavorites(userId, favorites) {
        try {
            const updateResponse = await favoritesCollection.updateOne(
                { _id: userId },
                { $set: { favorites: favorites } },
                { upsert: true }
            );
            return updateResponse;
        }
        catch (e) {
            console.error(`Unable to update favorites: ${e}`);
            return { error: e };
        }
    }

    static async getFavorites(id) {
        let cursor;
       
        try {

            cursor = await favoritesCollection.find({
                _id: id,
            });
            const favorites = await cursor.toArray();
            
            
            return favorites[0] || { favorites: [] };
        } catch (e) {
            console.log(cursor)
            console.error(`Something went wrong in getFavorites: ${e}`);
            throw e;
        }  

        
    }


    static async getMyFavorites (userId) { 
  
        const favorites = await this.getFavorites(userId);

        let query = {"_id": {"$in": favorites.favorites.map((id) => {return new ObjectId(id)})}};
  
        try {
  
            const result = await moviesCollection.find(query).toArray();
            // console.log("result", result) // testing
            const favoriteList = favorites.favorites.map((id) => {
                return result.find((movie) => {
                    return movie._id.toString() === id})
                    });
            console.log("favoriteList", favoriteList) // testing")
            return favoriteList;
           
        } catch (e) {
            console.error(`Unable to issue find command, ${e}`);
            return {} };
        }
        
        

}