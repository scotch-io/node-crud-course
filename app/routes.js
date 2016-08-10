const express     = require('express'),
  router          = express.Router(),
  eventController = require('./controllers/events.controller');

// export the router ======================
module.exports = router;

// events
router.get('/',                  eventController.showHome);
router.get('/events/seed',       eventController.seedEvents);
router.get('/events/create',     eventController.showCreate);
router.post('/events/create',    eventController.processCreate);
router.get('/events/:slug',      eventController.showEvent);
router.get('/events/:slug/edit', eventController.editEvent);
router.post('/events/:slug',     eventController.processEdit);
router.delete('/events/:id',     eventController.deleteEvent);