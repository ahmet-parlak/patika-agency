const mongoose = require('mongoose');

const Schema = mongoose.Schema;

const ProjectSchema = new Schema({
  title: { type: String, required: true, trim: true },
  brief: { type: String, trim: true },
  desctiption: { type: String, trim: true },
  client: { type: String, trim: true },
  category: { type: String, trim: true },
  photo: { type: String, trim: true },
  created_at: { type: Date, default: Date.now },
});

const Project = mongoose.model('Project', ProjectSchema);

module.exports = Project;
