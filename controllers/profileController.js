const db = require("../db/queries");

async function profilesSearch(req, res) {
    try {
        const { q } = req.query;

        if (!q || q.trim() === "") {
            return res.status(200).json([]);
        }

        const results = await db.searchProfiles(q);

        res.status(200).json(results);
    } catch (err) {
        console.error(err);
        res.status(500).json({ message: "Error searching for profiles" });
    }
}

module.exports = {
    profilesSearch,
};
