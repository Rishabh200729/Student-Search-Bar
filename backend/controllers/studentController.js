const students = require("../data/student_data.json");

exports.searchStudents = (req, res) => {
  const query = req.query.name;

  if (!query || query.trim().length < 3) {
    return res.status(400).json({ message: "Query must be at least 3 characters long" });
  }

  const results = students
    .filter(student =>
      student.name.toLowerCase().includes(query.toLowerCase())
    )
    .slice(0, 5);

  if (results.length === 0) {
    return res.status(200).json([]);
  }

  res.json(results);
};