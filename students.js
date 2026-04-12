const students = [];

function getPassword(roll) {
  return roll.toString().slice(-3);
}

for (let i = 121; i <= 180; i++) {
  const roll = `202510101150${i}`;
  students.push({
    roll,
    name: "Student " + i,
    password: getPassword(roll),
    coordinator: "Dr. Sandeep Ojha"
  });
}

const realData = {
  "202510101150121": "Ashutosh Singh Satendra",
  "202510101150122": "Aashi Srivastava",
  "202510101150123": "Ayush Singh",
  "202510101150124": "Samiksha Singh",
  "202510101150125": "Raj Kumar",
  "202510101150127": "Swapnil Kumar",
  "202510101150128": "Aditya Singh",
  "202510101150129": "Ayush Kumar Pandey",
  "202510101150130": "Ananya Singh",
  "202510101150132": "Vinay Kumar Singh",
  "202510101150133": "Ansh Raj",
  "202510101150134": "Shiv Kumar Bhardwaj",
  "202510101150135": "Shubham Kumar Singh",
  "202510101150136": "Bhumi Singh",
  "202510101150137": "Abhinav Yadav",
  "202510101150139": "Adarsh Pandey",
  "202510101150140": "Nakul Chaudhary",
  "202510101150141": "Vishal Sharma",
  "202510101150142": "Sheetal Srivastava",
  "202510101150143": "Parth Agarwal",
  "202510101150144": "Shivam Verma",
  "202510101150145": "Aryan Chaudhri",
  "202510101150147": "Shreyansh Kumar Singh",
  "202510101150148": "Subh Yadav",
  "202510101150149": "Vaibhav Pathak",
  "202510101150150": "Priyanshu Kesarwani",
  "202510101150151": "Akas Singh",
  "202510101150152": "Sameer Pal",
  "202510101150153": "Anushka Sharma",
  "202510101150154": "Chandra Shekhar Singh",
  "202510101150155": "Sandhya Dewangan",
  "202510101150157": "Anubhav Singh",
  "202510101150158": "Divyansh Singh",
  "202510101150160": "Anshika Yadav",
  "202510101150161": "Richa Mishra",
  "202510101150162": "Suryansh Srivastava",
  "202510101150163": "Shashikant Singh",
  "202510101150164": "Raunak Jaiswal",
  "202510101150165": "Priya Kumari",
  "202510101150166": "Abhishek Singh",
  "202510101150167": "Harsh Pandey",
  "202510101150168": "Saurabh Pandey",
  "202510101150169": "Khushi Gautam",
  "202510101150170": "Swati Pal",
  "202510101150172": "Abhishek Yadav",
  "202510101150173": "Anubhav Kashyap",
  "202510101150174": "Gauri Yadav",
  "202510101150175": "Kshama",
  "202510101150176": "Harshita Verma",
  "202510101150177": "Mr Krish Soni",
  "202510101150179": "Roshan Chauhan",
  "202510101150180": "Komal Singh"
};

students.forEach(s => {
  if (realData[s.roll]) {
    s.name = realData[s.roll];
  }
});

module.exports = students;