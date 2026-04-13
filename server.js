const express = require("express");
const bodyParser = require("body-parser");
const students = require("./students");

const QRCode = require("qrcode");

const fs = require("fs");

const app = express();
app.use(bodyParser.json());
app.use(express.static("public"));

app.post("/login", (req, res) => {
  const { roll, password } = req.body;

  const student = students.find(s => s.roll === roll);

  if (!student) {
    return res.json({ success: false });
  }

  if (student.password === password) {
    return res.json({ success: true, student });
  } else {
    return res.json({ success: false });
  }
});

app.post("/change-password", (req, res) => {
  const { roll, newPassword } = req.body;

  const student = students.find(s => s.roll === roll);
  if (student) {
    student.password = newPassword;
    res.json({ success: true });
  } else {
    res.json({ success: false });
  }
});

app.get("/generate-qr/:roll", async (req, res) => {
  const roll = req.params.roll;

  try {
    const today = new Date().toLocaleDateString();
    const qr = await QRCode.toDataURL(roll + "|" + today);
    res.json({ qr });
  } catch (err) {
    res.status(500).send("Error generating QR");
  }
});

let attendance = [];
let rectifications = [];
let leaves = [];
let queries = [];

function saveData() {
  fs.writeFileSync("data.json", JSON.stringify({
    attendance,
    rectifications,
    leaves,
    queries
  }));
}

// 🔥 Load data
if (fs.existsSync("data.json")) {
  const data = JSON.parse(fs.readFileSync("data.json"));

  attendance = data.attendance || [];
  rectifications = data.rectifications || [];
  leaves = data.leaves || [];
  queries = data.queries || [];
}

app.post("/mark-attendance", (req, res) => {
  const { roll, date } = req.body;

  attendance.push({
    roll,
    date,
    time: new Date().toLocaleTimeString()
  });

  saveData();

  console.log(attendance);

  res.json({ success: true });
});

app.post("/apply-rectification", (req, res) => {
  const { roll, reason } = req.body;

  rectifications.push({
    roll,
    reason,
    status: "Pending"
  });

  saveData();

  console.log("Rectification Requests:", rectifications);

  res.json({ success: true });
});

app.post("/apply-leave", (req, res) => {
  const { roll, reason } = req.body;

  leaves.push({
    roll,
    reason,
    status: "Pending"
  });

  saveData();

  console.log("Leave Requests:", leaves);

  res.json({ success: true });
});

app.post("/submit-query", (req, res) => {
  const { roll, type, subject, message, faculty } = req.body;

  queries.push({
    roll,
    type,        // class / subject
    subject,     // optional
    faculty,     // kis ke paas jayegi
    message,
    status: "Pending"
  });

  saveData();

  console.log("Queries:", queries);

  res.json({ success: true });
});

app.get("/get-rectifications", (req, res) => {
  res.json(rectifications);
});

app.get("/get-leaves", (req, res) => {
  res.json(leaves);
});

app.get("/get-queries", (req, res) => {
  res.json(queries);
});

app.post("/update-rectification", (req, res) => {
  const { index, status } = req.body;

  if (rectifications[index]) {
    rectifications[index].status = status;

    // 🔥 NEW LOGIC
    if (status === "Approved") {
      const roll = rectifications[index].roll;

      attendance.push({
        roll: roll,
        date: new Date().toLocaleDateString(),
        time: new Date().toLocaleTimeString(),
        type: "Rectification"
      });
    }
  }

  saveData();

  res.json({ success: true });
});

app.post("/update-leave", (req, res) => {
  const { index, status } = req.body;

  if (leaves[index]) {
    leaves[index].status = status;
  }

  res.json({ success: true });
});

app.post("/update-query", (req, res) => {
  const { index, status } = req.body;

  if (queries[index]) {
    queries[index].status = status;
  }

  res.json({ success: true });
});

app.get("/get-attendance/:roll", (req, res) => {
  const roll = req.params.roll;

  const count = attendance.filter(a => a.roll === roll).length;

  res.json({ count });
});

app.get("/student-rectifications/:roll", (req, res) => {
  const roll = req.params.roll;
  res.json(rectifications.filter(r => r.roll === roll));
});

app.get("/student-leaves/:roll", (req, res) => {
  const roll = req.params.roll;
  res.json(leaves.filter(l => l.roll === roll));
});

app.get("/student-queries/:roll", (req, res) => {
  const roll = req.params.roll;
  res.json(queries.filter(q => q.roll === roll));
});

app.get("/attendance-percentage/:roll", (req, res) => {
  const roll = req.params.roll;

  const totalDays = 30; // abhi fixed (baad me dynamic karenge)

  const present = attendance.filter(a => a.roll === roll).length;

  const percent = ((present / totalDays) * 100).toFixed(2);

  res.json({ percent });
});

app.get("/faculty-queries/:faculty", (req, res) => {
  const faculty = req.params.faculty;

  const filtered = queries.filter(q => q.faculty === faculty);

  res.json(filtered);
});

const PORT = process.env.PORT||3000;

app.listen(PORT, () => {
  console.log("Server running on http://localhost:3000");
});