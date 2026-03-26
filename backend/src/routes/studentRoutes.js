const express = require('express');
const router = express.Router();

const { 
  addStudent, 
  getStudents, 
  getStudentById, // 1. Add this import
  updateStudent, 
  deleteStudent, 
  bulkDeleteStudents 
} = require('../controllers/studentController');

router.route('/').get(getStudents).post(addStudent);
router.route('/bulk').delete(bulkDeleteStudents); 

// 2. Add .get(getStudentById) here
router.route('/:id')
  .get(getStudentById) 
  .put(updateStudent)
  .delete(deleteStudent);

module.exports = router;