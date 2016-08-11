const express     = require('express'),
  router          = express.Router(),
  mainController  = require('./controllers/main.controller');
  eventController = require('./controllers/events.controller');

// export the router ======================
module.exports = router;

// home page
router.get('/', mainController.showHome);

// events
router.get('/events',              eventController.showAll);
router.get('/events/seed',         eventController.seedEvents);
router.get('/events/create',       eventController.showCreate);
router.post('/events/create',      eventController.processCreate);
router.get('/events/:slug/edit',   eventController.editEvent);
router.get('/events/:slug/delete', eventController.deleteEvent);
router.get('/events/:slug',        eventController.showEvent);
router.post('/events/:slug',       eventController.processEdit);