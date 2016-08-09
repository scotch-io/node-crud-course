const mongoose = require('mongoose'),
  Schema       = mongoose.Schema;

// create a schema
const eventSchema = new Schema({
  name: String,
  slug: {
    type: String,
    unique: true
  },
  description: String
});

// make sure that the slug is created
eventSchema.pre('save', function(next) {
  this.slug = slugify(this.name);
  next();
});

// define the model
const eventModel = mongoose.model('Event', eventSchema);

// export
module.exports = eventModel;

function slugify(text) {
  return text.toString().toLowerCase()
    .replace(/\s+/g, '-')           // Replace spaces with -
    .replace(/[^\w\-]+/g, '')       // Remove all non-word chars
    .replace(/\-\-+/g, '-')         // Replace multiple - with single -
    .replace(/^-+/, '')             // Trim - from start of text
    .replace(/-+$/, '');            // Trim - from end of text
}