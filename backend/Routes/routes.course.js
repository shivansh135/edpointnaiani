// routes/courses.js
const express = require('express');
const router = express.Router();
const { getAllCourses, addCourse, getCourse, updateCourse, createSubject, addChapter, deleteChapter, addVideo, updateVideo, deleteVideo, addNote, updateNote, deleteNote } = require('../Controller/controller.course');
const upload = require('../middleware/multerconfig');

// Route to get all courses
router.get('/', getAllCourses);
router.post('/courseInfo', getCourse);
router.post('/createSubject', createSubject);
router.post('/addChapter', addChapter);
router.post('/deleteChapter', deleteChapter);
router.post('/addVideo', addVideo);
router.post('/updateVideo', updateVideo);
router.post('/deleteVideo', deleteVideo);

router.post('/addnote', addNote);
router.post('/updatenote', updateNote);
router.post('/deletenote', deleteNote);

router.post('/add',upload.single('image'), addCourse);
router.post('/updateCourse',upload.single('image'), updateCourse);


module.exports = router;
