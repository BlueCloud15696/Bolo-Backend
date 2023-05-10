let mongoose = require("mongoose");

const meetingSchema = new mongoose.Schema({
  date: Date,
  timeSlot: String,
  first_name: String,
  last_name: String,
  company_size: String,
  budget: String,
});

const Meeting = mongoose.model("Meeting", meetingSchema);

module.exports = {
  Meeting, // export the model
};
