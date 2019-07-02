const mongoose = require('mongoose');
const Schema = mongoose.Schema;

let Project = new Schema({
    name: String,
    description: String,
    creation_date: {type: Date, default: Date.now},
    current_version: Number,
    version_date: {type: Date, default: Date.now},
    access_id: String,
    status: {type: String, default: "Created"},
});

module.exports = mongoose.model('Project', Project);
