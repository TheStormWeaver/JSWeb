const Course = require("../models/Course");

async function getAllCourses() {
  const courses = await Course.find({}).lean()

  return courses;
}

async function getCourseById(id) {
  const course = await Course.findById(id).lean();

  return course;
}

async function createCourse(courseData) {
  const course = await new Course(courseData);
  await course.save();

  return course;
}

async function editCourse(id, courseData) {
  const course = await Course.findById(id);

  course.title = courseData.title;
  course.description = courseData.description;
  course.imageUrl = courseData.imageUrl;
  course.duration = courseData.duration; 

  return course.save();
}

async function deleteCourse(id) {
  return Course.findByIdAndDelete(id);
}

async function enrollInCourse(courseId, userId) {
  const course = await Course.findById(courseId);

  course.usersInCourses.push(userId)

  return course.save()
}

module.exports = {
  getAllCourses,
  getCourseById,
  createCourse,
  editCourse,
  deleteCourse,
  enrollInCourse,
};