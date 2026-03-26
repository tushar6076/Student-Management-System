const { prisma } = require('../config/db');

// @desc    Add new student
// @route   POST /api/students
exports.addStudent = async (req, res) => {
  try {
    const { name, email, age, course, subjects } = req.body;

    const student = await prisma.student.create({
      data: {
        name,
        email,
        age: parseInt(age),
        course,
        subjects // This expects an array of strings
      },
    });

    res.status(201).json({ success: true, data: student });
  } catch (error) {
    res.status(400).json({ success: false, error: error.message });
  }
};

// @desc    Get all students
// @route   GET /api/students
exports.getStudents = async (req, res) => {
  try {
    const students = await prisma.student.findMany();
    res.status(200).json({ success: true, count: students.length, data: students });
  } catch (error) {
    res.status(500).json({ success: false, error: "Server Error" });
  }
};

// @desc    Get single student
// @route   GET /api/students/:id
exports.getStudentById = async (req, res) => {
  try {
    const { id } = req.params;
    const student = await prisma.student.findUnique({
      where: { id },
    });

    if (!student) {
      return res.status(404).json({ success: false, error: "Student not found" });
    }

    res.status(200).json({ success: true, data: student });
  } catch (error) {
    res.status(500).json({ success: false, error: "Server Error" });
  }
};

// @desc    Update student information
// @route   PUT /api/students/:id
exports.updateStudent = async (req, res) => {
  try {
    const { id } = req.params;
    const updatedData = req.body;

    const student = await prisma.student.update({
      where: { id },
      data: updatedData,
    });

    res.status(200).json({ success: true, data: student });
  } catch (error) {
    res.status(404).json({ success: false, error: "Student not found or update failed" });
  }
};

// @desc    Delete student record
// @route   DELETE /api/students/:id
exports.deleteStudent = async (req, res) => {
  try {
    const { id } = req.params;
    await prisma.student.delete({ where: { id } });

    res.status(200).json({ success: true, message: "Student record deleted" });
  } catch (error) {
    res.status(404).json({ success: false, error: "Student not found" });
  }
};

// @desc    Bulk Delete students
// @route   DELETE /api/students/bulk
exports.bulkDeleteStudents = async (req, res) => {
  try {
    const { ids } = req.body; // Array of IDs like ["id1", "id2"]
    
    if (!ids || ids.length === 0) {
      return res.status(400).json({ success: false, error: "No IDs provided" });
    }

    await prisma.student.deleteMany({
      where: {
        id: { in: ids }
      }
    });

    res.status(200).json({ success: true, message: `${ids.length} students deleted` });
  } catch (error) {
    res.status(500).json({ success: false, error: error.message });
  }
};