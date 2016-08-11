// create a new express router
const express      = require('express'),
  router           = express.Router(),
  mainController   = require('./controllers/main.controller'),
  eventsController = require('./controllers/events.controller');

// export router
module.exports = router;

// define routes
// main routes
router.get('/', mainController.showHome);

// event routes
router.get('/events',       eventsController.showEvents);

// seed events
router.get('/events/seed',  eventsController.seedEvents);

// create events
router.get('/events/create',  eventsController.showCreate);
router.post('/events/create', eventsController.processCreate);

// edit events
router.get('/events/:slug/edit', eventsController.showEdit);
router.post('/events/:slug',     eventsController.processEdit);

// delete events
router.get('/events/:slug/delete', eventsController.deleteEvent);

// show a single event
router.get('/events/:slug', eventsController.showSingle);