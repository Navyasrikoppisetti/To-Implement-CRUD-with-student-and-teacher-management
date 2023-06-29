
const express = require('express');
const mongoose = require('mongoose');

const app = express();
app.use(express.json());

mongoose.connect('mongodb://localhost:27017/school', { useNewUrlParser: true, useUnifiedTopology: true })
  .then(() => {
    console.log('Connected to MongoDB');
  })
  .catch((error) => {
    console.error('Error connecting to MongoDB:', error);
  });

const studentSchema = new mongoose.Schema({
  name: String,
  email: String,
  phoneNumber: String,
});

const teacherSchema = new mongoose.Schema({
  name: String,
  email: String,
  phoneNumber: String,
});

const Student = mongoose.model('Student', studentSchema);
const Teacher = mongoose.model('Teacher', teacherSchema);

app.get('/students', (req, res) => {
  Student.find({}, (err, students) => {
    if (err) {
      console.error('Error fetching students:', err);
      res.status(500).json({ error: 'An error occurred' });
    } else {
      res.json(students);
    }
  });
});

app.post('/students', (req, res) => {
  const { name, email, phoneNumber } = req.body;
  const newStudent = new Student({ name, email, phoneNumber });
  newStudent.save((err, student) => {
    if (err) {
      console.error('Error creating student:', err);
      res.status(500).json({ error: 'An error occurred' });
    } else {
      res.json(student);
    }
  });
});

app.get('/students/:id', (req, res) => {
  const studentId = req.params.id;
  Student.findById(studentId, (err, student) => {
    if (err) {
      console.error('Error fetching student:', err);
      res.status(500).json({ error: 'An error occurred' });
    } else if (!student) {
      res.status(404).json({ error: 'Student not found' });
    } else {
      res.json(student);
    }
  });
});

app.put('/students/:id', (req, res) => {
  const studentId = req.params.id;
  const { name, email, phoneNumber } = req.body;
  Student.findByIdAndUpdate(
    studentId,
    { name, email, phoneNumber },
    { new: true },
    (err, student) => {
      if (err) {
        console.error('Error updating student:', err);
        res.status(500).json({ error: 'An error occurred' });
      } else if (!student) {
        res.status(404).json({ error: 'Student not found' });
      } else {
        res.json(student);
      }
    }
  );
});

app.delete('/students/:id'), (req, res) => {
  const studentId = req.params.id;
  Student.findByIdAndDelete(studentId), (err, student) => {
    if (err) {
      console.error('Error deleting student:', err);
      res.status(500).json({ error: 'An error occurred' });
    } else if (!student) {
      res.status(404).json({ error: 'Student not found' });
    } else {
        res.json({ message: 'Student deleted successfully' });
    }
} 
} 