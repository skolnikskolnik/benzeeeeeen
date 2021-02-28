import axios from "axios";

export default {
    // Saves a book to the database
    addAcidToDB: function (acidData) {
        return axios.post("/api/acids/", acidData);
    },
    //Gets all acids currently in db
    getAllAcids: function () {
        return axios.get("/api/acids");
    },
    //Removes an acid from the database
    removeAcid: function (id) {
        return axios.delete("/api/acids/" + id);
    },
    updateAcid: function(id, dbInput){
        return axios.put("/api/acids/" + id,
        {
            name: dbInput.name,
            pKa: dbInput.pKa,
            Ka: dbInput.Ka
        });
    }
}