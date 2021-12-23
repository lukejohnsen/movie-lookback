const router = require('express').Router();
const { Entry } = require('../../models');
const axios = require('axios');


// get route all entries
router.get('/', (req, res) => {
    Entry.findAll({
    })
        .then(dbEntryData => res.json(dbEntryData))
        .catch(err => {
            console.log(err);
            res.status(500).json(err);
        });
});

// get route entry by id
router.get('/:id', (req, res) => {
    Entry.findOne({
        where: {
            id: req.params.id
        }
    })
        .then(dbEntryData => {
            if (!dbEntryData) {
                res.status(404).json({ message: 'No entry found with this id' });
                return;
            }
            res.json(dbEntryData);
        })
        .catch(err => {
            console.log(err);
            res.status(500).json(err);
        });
});

router.post('/', (req, res) => {
    axios.get(`https://www.omdbapi.com/?t=${req.body.searchedTitle}&apikey=${process.env.OMDB_KEY}`)
        .then(movieData => {
            console.log(movieData);
            
            Entry.create({
                title: movieData.data.Title,
                director: movieData.data.Director,
                actors: movieData.data.Actors,
                review: req.body.review,
                rating: req.body.rating,
                user_id: req.body.user_id
            })
                .then(dbEntryData => res.json(dbEntryData))
                .catch(err => {
                    console.log(err);
                    res.status(500).json(err);
                });
        })
});

// put route single entry
router.put('/:id', (req, res) => {
    Entry.update(req.body, {
        where: {
            id: req.params.id
        }
    })
        .then(dbEntryData => {
            if(!dbEntryData[0]) {
                res.status(404).json({ message: 'No entry found with this id' });
                return;
            }
            res.json(dbEntryData);
        })
        .catch(err => {
            console.log(err);
            res.status(500).json(err);
        });
});

// delete single entry
router.delete('/:id', (req, res) => {
    Entry.destroy({
        where: {
            id: req.params.id
        }
    })
        .then(dbEntryData => {
            if (!dbEntryData) {
                res.status(404).json({ message: 'Entry not found!'});
                return;
            }
            res.json(dbEntryData);
        })
        .catch(err => {
            console.log(err);
            res.status(500).json(err);
        });
});

module.exports = router;