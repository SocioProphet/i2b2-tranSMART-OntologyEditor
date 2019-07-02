const mongoose = require('mongoose');
const Schema = mongoose.Schema;

let Project_version = new Schema({
    version_number: Number,
    version_date: {type: Date, default: Date.now},
    project_id: String
});

module.exports = mongoose.model('Project_version', Project_version);
