// controllers/coursesController.js
const Course = require('../Models/model.cource');

exports.getAllCourses = async (req, res) => {
    try {
      const courses = await Course.find();
      res.json(courses);
    } catch (error) {
      console.error(error.message);
      res.status(500).send('Server Error');
    }
  };

  exports.updateCourse = async (req, res) => {
    try {
        // Assuming you are receiving course data and ID in the request body
        const { id, name, description, startDate, endDate, mode, price, discount,notes} = req.body;

        // Find the existing course by ID
        const existingCourse = await Course.findById(id);

        // If the course doesn't exist, return an error
        if (!existingCourse) {
            return res.status(404).json({ message: 'Course not found' });
        }

        // Update the course properties
        existingCourse.name = name || existingCourse.name;
        existingCourse.description = description || existingCourse.description;
        existingCourse.startDate = startDate || existingCourse.startDate;
        existingCourse.endDate = endDate || existingCourse.endDate;
        existingCourse.mode = mode || existingCourse.mode;
        existingCourse.price = parseInt(price || existingCourse.price);
        existingCourse.discount = parseInt(discount || existingCourse.discount);
        existingCourse.notes = notes || existingCourse.notes;

        // Check if there's a new image uploaded
        if (req.file) {
            existingCourse.image.data = req.file.buffer;
            existingCourse.image.contentType = req.file.mimetype;
        }

        // Save the updated course to the database
        await existingCourse.save();

        // Retrieve the updated list of courses (if needed)
        // const courses = await Course.find();

        // Send a success message or updated course as response
        res.json({ message: 'Course updated successfully', updatedCourse: existingCourse });
    } catch (error) {
        console.error(error.message);
        res.status(500).send('Server Error');
    }
};

exports.addCourse = async (req, res) => {
  try {
    // Assuming you are receiving course data in the request body
    const { name, description, startDate, endDate, mode } = req.body;
    const image = req.file.buffer; // Access the image buffer from multer

    // Create a new course object
    const newCourse = new Course({
      name,
      description,
      startDate,
      endDate,
      mode,
      // Store image data directly in the database
      image: {
        data: image,
        contentType: req.file.mimetype // Store the content type of the image
      }
    });

    // Save the new course to the database
    await newCourse.save();

    // Retrieve the updated list of courses
    const courses = await Course.find();

    // Send the updated list of courses as response
    res.json(courses);
  } catch (error) {
    console.error(error.message);
    res.status(500).send('Server Error');
  }
};

exports.getCourse = async (req, res) => {
    try {
        const course = await Course.findOne({ _id: req.body.id }).populate('subjects');
        res.json(course);
    } catch (error) {
        console.error(error.message);
        res.status(500).send('Server Error');
    }
};

  exports.createSubject = async (req, res) => {
    try {
      let courses = await Course.findOne({_id: req.body.id });
      courses.subjects.push({title:req.body.name});
      courses = await courses.save();
      res.json(courses.subjects[courses.subjects.length-1]);
    } catch (error) {
      console.error(error.message);
      res.status(500).send('Server Error');
    }
  };

  exports.addChapter = async (req, res) => {
    const courseId = req.body.courseId;
    const subjectId = req.body.subjectId;
    const chapterId = req.body.chapterId;
    const chapterName = req.body.chapterName;

    try {
        // Find the course by courseId
        const course = await Course.findById(courseId);
        if (!course) {
            return res.status(404).json({ msg: 'Course not found' });
        }

        // Find the subject by subjectId within the course
        const subject = course.subjects.find(subj => subj && subj._id.toString() === subjectId);
        if (!subject) {
            return res.status(404).json({ msg: 'Subject not found' });
        }

        // If chapterId is provided, update an existing chapter; otherwise, add a new chapter
        if (chapterId) {
            // Find the chapter by chapterId within the subject
            const chapter = subject.chapters.find(chap => chap && chap._id.toString() === chapterId);
            if (!chapter) {
                return res.status(404).json({ msg: 'Chapter not found' });
            }
            // Update the chapter title
            chapter.title = chapterName;
        } else {
            // Add the new chapter to the subject
            const newChapter = {
                title: chapterName,
                createdAt: new Date()
            };
            subject.chapters.push(newChapter);
            const updatedCourse = await course.save();
            // Get the subject from the updated course
            const updatedSubject = updatedCourse.subjects.find(subj => subj && subj._id.toString() === subjectId);

            // Get the _id of the new chapter
            const newChapterId = updatedSubject.chapters[updatedSubject.chapters.length - 1]._id;
            newChapter['_id'] = newChapterId;
            res.json({ msg: 'Chapter added successfully', newChapter });
            return;
        }

        // Save the updated course
        await course.save();

        res.json({ msg: chapterId ? 'Chapter updated successfully' : 'Chapter added successfully', chapterId });
    } catch (error) {
        console.error(error.message);
        res.status(500).send('Server Error');
    }
};

exports.deleteChapter = async (req, res) => {
  const courseId = req.body.courseId;
  const subjectId = req.body.subjectId;
  const chapterId = req.body.chapterId;

  try {
      // Find the course by courseId
      const course = await Course.findById(courseId);
      if (!course) {
          return res.status(404).json({ msg: 'Course not found' });
      }

      // Find the subject by subjectId within the course
      const subject = course.subjects.find(subj => subj && subj._id.toString() === subjectId);
      if (!subject) {
          return res.status(404).json({ msg: 'Subject not found' });
      }

      // Find the chapter by chapterId within the subject
      const chapterIndex = subject.chapters.findIndex(chap => chap && chap._id.toString() === chapterId);
      if (chapterIndex === -1) {
          return res.status(404).json({ msg: 'Chapter not found' });
      }

      // Confirmation received, delete the chapter
      subject.chapters.splice(chapterIndex, 1);

      // Save the updated course
      await course.save();

      res.json({ msg: 'Chapter deleted successfully', chapterId });
  } catch (error) {
      console.error(error.message);
      res.status(500).send('Server Error');
  }
};

// Add a new video to a chapter
exports.addVideo = async (req, res) => {
  const courseId = req.body.courseId;
  const subjectId = req.body.subjectId;
  const chapterId = req.body.chapterId;
  const videoName = req.body.videoName;
  const videoUrl = req.body.videoUrl;

  try {
      // Find the course by courseId
      const course = await Course.findById(courseId);
      if (!course) {
          return res.status(404).json({ msg: 'Course not found' });
      }

      // Find the subject by subjectId within the course
      const subject = course.subjects.find(subj => subj && subj._id.toString() === subjectId);
      if (!subject) {
          return res.status(404).json({ msg: 'Subject not found' });
      }

      // Find the chapter by chapterId within the subject
      const chapter = subject.chapters.find(chap => chap && chap._id.toString() === chapterId);
      if (!chapter) {
          return res.status(404).json({ msg: 'Chapter not found' });
      }

      // Add the new video to the chapter
      const newVideo = {
          title: videoName,
          url: videoUrl,
          createdAt: new Date()
      };
      chapter.videos.push(newVideo);

      // Save the updated course
      await course.save();

      res.json({ msg: 'Video added successfully', newVideo });
  } catch (error) {
      console.error(error.message);
      res.status(500).send('Server Error');
  }
};

// Update an existing video in a chapter
exports.updateVideo = async (req, res) => {
  const courseId = req.body.courseId;
  const subjectId = req.body.subjectId;
  const chapterId = req.body.chapterId;
  const videoId = req.body.videoId;
  const newVideoName = req.body.newVideoName;
  const newVideoUrl = req.body.newVideoUrl;

  try {
      // Find the course by courseId
      const course = await Course.findById(courseId);
      if (!course) {
          return res.status(404).json({ msg: 'Course not found' });
      }

      // Find the subject by subjectId within the course
      const subject = course.subjects.find(subj => subj && subj._id.toString() === subjectId);
      if (!subject) {
          return res.status(404).json({ msg: 'Subject not found' });
      }

      // Find the chapter by chapterId within the subject
      const chapter = subject.chapters.find(chap => chap && chap._id.toString() === chapterId);
      if (!chapter) {
          return res.status(404).json({ msg: 'Chapter not found' });
      }

      // Find the video by videoId within the chapter
      const video = chapter.videos.find(vid => vid && vid._id.toString() === videoId);
      if (!video) {
          return res.status(404).json({ msg: 'Video not found' });
      }

      // Update the video's name and URL
      video.title = newVideoName;
      video.url = newVideoUrl;

      // Save the updated course
      await course.save();

      res.json({ msg: 'Video updated successfully', updatedVideo: video });
  } catch (error) {
      console.error(error.message);
      res.status(500).send('Server Error');
  }
};

// Delete a video from a chapter
exports.deleteVideo = async (req, res) => {
  const courseId = req.body.courseId;
  const subjectId = req.body.subjectId;
  const chapterId = req.body.chapterId;
  const videoId = req.body.videoId;

  try {
      // Find the course by courseId
      const course = await Course.findById(courseId);
      if (!course) {
          return res.status(404).json({ msg: 'Course not found' });
      }

      // Find the subject by subjectId within the course
      const subject = course.subjects.find(subj => subj && subj._id.toString() === subjectId);
      if (!subject) {
          return res.status(404).json({ msg: 'Subject not found' });
      }

      // Find the chapter by chapterId within the subject
      const chapter = subject.chapters.find(chap => chap && chap._id.toString() === chapterId);
      if (!chapter) {
          return res.status(404).json({ msg: 'Chapter not found' });
      }

      // Find the video by videoId within the chapter
      const videoIndex = chapter.videos.findIndex(vid => vid && vid._id.toString() === videoId);
      if (videoIndex === -1) {
          return res.status(404).json({ msg: 'Video not found' });
      }

      // Remove the video from the chapter
      chapter.videos.splice(videoIndex, 1);

      // Save the updated course
      await course.save();

      res.json({ msg: 'Video deleted successfully', videoId });
  } catch (error) {
      console.error(error.message);
      res.status(500).send('Server Error');
  }
};

exports.addNote = async (req, res) => {
  const courseId = req.body.courseId;
  const subjectId = req.body.subjectId;
  const chapterId = req.body.chapterId;
  const noteName = req.body.noteName;
  const noteUrl = req.body.noteUrl;

  try {
      // Find the course by courseId
      const course = await Course.findById(courseId);
      if (!course) {
          return res.status(404).json({ msg: 'Course not found' });
      }

      // Find the subject by subjectId within the course
      const subject = course.subjects.find(subj => subj && subj._id.toString() === subjectId);
      if (!subject) {
          return res.status(404).json({ msg: 'Subject not found' });
      }

      // Find the chapter by chapterId within the subject
      const chapter = subject.chapters.find(chap => chap && chap._id.toString() === chapterId);
      if (!chapter) {
          return res.status(404).json({ msg: 'Chapter not found' });
      }

      // Add the new note to the chapter
      const newnote = {
          title: noteName,
          url: noteUrl,
          createdAt: new Date()
      };
      chapter.notes.push(newnote);

      // Save the updated course
      await course.save();

      res.json({ msg: 'note added successfully', newnote });
  } catch (error) {
      console.error(error.message);
      res.status(500).send('Server Error');
  }
};

// Update an existing video in a chapter
exports.updateNote = async (req, res) => {
  const courseId = req.body.courseId;
  const subjectId = req.body.subjectId;
  const chapterId = req.body.chapterId;
  const noteId = req.body.noteId;
  const newnoteName = req.body.newnoteName;
  const newnoteUrl = req.body.newnoteUrl;

  try {
      // Find the course by courseId
      const course = await Course.findById(courseId);
      if (!course) {
          return res.status(404).json({ msg: 'Course not found' });
      }

      // Find the subject by subjectId within the course
      const subject = course.subjects.find(subj => subj && subj._id.toString() === subjectId);
      if (!subject) {
          return res.status(404).json({ msg: 'Subject not found' });
      }

      // Find the chapter by chapterId within the subject
      const chapter = subject.chapters.find(chap => chap && chap._id.toString() === chapterId);
      if (!chapter) {
          return res.status(404).json({ msg: 'Chapter not found' });
      }

      // Find the note by noteId within the chapter
      const note = chapter.notes.find(vid => vid && vid._id.toString() === noteId);
      if (!note) {
          return res.status(404).json({ msg: 'note not found' });
      }

      // Update the note's name and URL
      note.title = newnoteName;
      note.url = newnoteUrl;

      // Save the updated course
      await course.save();

      res.json({ msg: 'note updated successfully', updatednote: note });
  } catch (error) {
      console.error(error.message);
      res.status(500).send('Server Error');
  }
};

// Delete a video from a chapter
exports.deleteNote = async (req, res) => {
  const courseId = req.body.courseId;
  const subjectId = req.body.subjectId;
  const chapterId = req.body.chapterId;
  const noteId = req.body.noteId;

  try {
      // Find the course by courseId
      const course = await Course.findById(courseId);
      if (!course) {
          return res.status(404).json({ msg: 'Course not found' });
      }

      // Find the subject by subjectId within the course
      const subject = course.subjects.find(subj => subj && subj._id.toString() === subjectId);
      if (!subject) {
          return res.status(404).json({ msg: 'Subject not found' });
      }

      // Find the chapter by chapterId within the subject
      const chapter = subject.chapters.find(chap => chap && chap._id.toString() === chapterId);
      if (!chapter) {
          return res.status(404).json({ msg: 'Chapter not found' });
      }

      // Find the note by noteId within the chapter
      const noteIndex = chapter.notes.findIndex(vid => vid && vid._id.toString() === noteId);
      if (noteIndex === -1) {
          return res.status(404).json({ msg: 'note not found' });
      }

      // Remove the note from the chapter
      chapter.notes.splice(noteIndex, 1);

      // Save the updated course
      await course.save();

      res.json({ msg: 'note deleted successfully', noteId });
  } catch (error) {
      console.error(error.message);
      res.status(500).send('Server Error');
  }
};

  
