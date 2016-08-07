const express = require('express'),
  router      = express.Router(),
  Event       = require('./models/event');

// export the router ======================
module.exports = router;

router.get('/', showHome);
router.get('/seed', seedEvents);
router.get('/events/:slug', showEvent);

// configure routes =======================
// home page (show all events)
function showHome(req, res) {
  Event.find({}, (err, events) => {
    res.render('pages/index', { events: events });
  });
}

// seed the databse
function seedEvents(req, res) {
  // create some events
  const events = [
    { name: 'Basketball', slug: 'basketball', description: 'Throwing into a basket.' },
    { name: 'Swimming', slug: 'swimming', description: 'Very fast fish.' },
    { name: 'Weightlifting', slug: 'weightlifting', description: 'Heavy things go up.' }
  ];

  // use the mongoose model. 
  // delete all. insert new
  Event.remove({}, () => {
    Event.insertMany(events);
  });
  res.send('Seeded!');
}

// show a single event
function showEvent(req, res) {
  Event.findOne({ slug: req.params.slug }, (err, event) => {
    if ( ! event) {
      res.status(404);
      res.render('pages/404'); 
    }

    res.render('pages/single', { event: event });
  });
}