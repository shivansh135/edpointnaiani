const mongoose = require('mongoose');

// Define the video schema
const videoSchema = new mongoose.Schema({
    title: {
        type: String,
        required: true
    },
    url: {
        type: String,
        required: true
    }
}, { timestamps: true }); // Add timestamps option

const noteSchema = new mongoose.Schema({
    title: {
        type: String,
        required: true
    },
    url: {
        type: String,
        required: true
    }
}, { timestamps: true }); // Add timestamps option

// Define the chapter schema
const chapterSchema = new mongoose.Schema({
    title: {
        type: String,
        required: true
    },
    notes: [noteSchema],
    videos: [videoSchema] // Array of video objects
}, { timestamps: true }); // Add timestamps option

// Define the subject schema
const subjectSchema = new mongoose.Schema({
    title: {
        type: String,
        required: true
    },
    chapters: [chapterSchema] // Array of chapter objects
}, { timestamps: true }); // Add timestamps option

// Define the course schema
const courseSchema = new mongoose.Schema({
    name: {
        type: String,
        required: true
    },
    description: {
        type: String,
        required: true
    },
    price: Number,
    discount: Number,
    notes: String,
    startDate: {
        type: Date,
        required: true
    },
    endDate: {
        type: Date,
        required: true
    },
    mode: {
        type: String,
        required: true
    },
    image: {
        data: Buffer,
        contentType: String
    },
    subjects: [subjectSchema] // Array of subject objects
}, { timestamps: true }); // Add timestamps option

module.exports = mongoose.model('Course', courseSchema);
