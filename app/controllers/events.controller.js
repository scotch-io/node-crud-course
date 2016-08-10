const Event = require('../models/event');

module.exports = {
  showHome: showHome,
  seedEvents: seedEvents,
  showCreate: showCreate,
  processCreate: processCreate,
  showEvent: showEvent,
  editEvent: editEvent,
  processEdit: processEdit,
  deleteEvent: deleteEvent
};

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
    { name: 'Basketball', description: 'Throwing into a basket.' },
    { name: 'Swimming', description: 'Very fast fish.' },
    { name: 'Weightlifting', description: 'Heavy things go up.' }
  ];

  // use the mongoose model. 
  // delete all. insert new
  Event.remove({}, () => {
    for (event of events) {
      var newEvent = new Event(event);
      newEvent.save();
    }
  });
  res.send('Seeded!');
}

// show the create form
function showCreate(req, res) {
  // const message = req.flash('message');
  // res.render('pages/create', { message: message });
  res.render('pages/create');
}

// handle the creation form
function processCreate(req, res) {
  // create the new event
  const event = new Event({
    name: req.body.name,
    slug: 'something',
    description: req.body.description
  });

  // persist the new event
  event.save((err) => {
    if (err)
      throw err;

    // return a redirect to the single page
    res.redirect(`/events/${event.slug}`);
  });
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

// show the form to edit an event
function editEvent(req, res) {
  // find the event
  // send the edit page
  Event.findOne({ slug: req.params.slug }, (err, event) => {
    if ( ! event) {
      res.status(404);
      res.render('pages/404'); 
    }

    res.render('pages/edit', { event: event });
  });
}

// process the edit form
function processEdit(req, res) {
  Event.findOne({ slug: req.params.slug }, (err, event) => {
    if ( ! event) {
      res.status(404);
      res.render('pages/404'); 
    }

    // fill new information
    event.name        = req.body.name;
    event.description = req.body.description;

    // save
    event.save((err) => {
      if (err)
        throw err;

      // redirect to the home page
      res.redirect('/');
    })
  });
}

// delete an event
function deleteEvent(req, res) {
  // delete the event by id
  Event.findOne({ _id: req.params.id }, (err, event) => {

  });

  // return a redirect
}

