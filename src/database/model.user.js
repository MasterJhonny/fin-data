const mongoose = require('mongoose');

const Schema = mongoose.Schema;

const schemaUsers = new Schema({
    last_name: {
        type: String,
        required: true
    },
    last_name_mother: {
        type: String,
        required: true
    },
    names: {
        type: String,
        required: true
    },
    ci: {
        type: Number,
        required: true
    },
    re_uni: {
        type: Number,
        required: true
    },
    cel: {
        type: Number,
        required: true
    },
    created_at: {
        type: Date,
        default: new Date()
    }
});

module.exports = schemaUsers;
