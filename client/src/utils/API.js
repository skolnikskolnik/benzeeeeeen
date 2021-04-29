import axios from "axios";

export default {
    // Saves an acid to the database
    addAcidToDB: function (acidData) {
        return axios.post("/api/acids/", acidData);
    },
    //Saves a base to the database
    addBaseToDB: function (baseData) {
        return axios.post("/api/bases/", baseData);
    },
    //Gets all acids currently in db
    getAllAcids: function () {
        return axios.get("/api/acids");
    },
    //Gets all bases currently in db
    getAllBases: function () {
        return axios.get("/api/bases");
    },
    //Removes an acid from the database
    removeAcid: function (id) {
        return axios.delete("/api/acids/" + id);
    },
    //Removes a base from the database
    removeBase: function (id) {
        return axios.delete("/api/bases/" + id);
    },
    //Updates Ka or pKa value or name
    updateAcid: function (id, dbInput) {
        return axios.put("/api/acids/" + id,
            {
                name: dbInput.name,
                pKa: dbInput.pKa,
                Ka: dbInput.Ka
            });
    },
    //updates Kb, pKb, or base name
    updateBase: function (id, dbInput) {
        return axios.put("/api/bases/" + id,
            {
                name: dbInput.name,
                pKb: dbInput.pKb,
                Kb: dbInput.Kb
            });
    }
}