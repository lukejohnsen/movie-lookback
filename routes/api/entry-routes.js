const router = require('express').Router();
const { Entry } = require('../../models');

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
    Entry.create({
        review: req.body.review,
        rating: req.body.rating,
        omdb_id: req.body.omdb_id
    })
        .then(dbEntryData => res.json(dbEntryData))
        .catch(err => {
            console.log(err);
            res.status(500).json(err);
        });
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