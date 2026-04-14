# QR Attendance Management System

## Project Overview

The QR Attendance Management System is a web-based application designed to simplify and digitize student attendance management. It allows students to mark attendance using QR codes and provides additional features such as attendance rectification, leave application, and query submission.

## Features

### Student Panel

* Secure login using Roll Number and Password (last 3 digits of roll number by default)
* QR Code generation for attendance
* View total attendance and attendance percentage
* Apply for attendance rectification with reason
* Apply for leave
* Submit queries (Class-related or Subject-related)
* View status of all requests (Pending / Approved / Rejected)

### Coordinator Panel

* View all attendance rectification requests
* Approve or reject rectification requests
* View and manage leave requests
* View student queries
* Mark queries as resolved

## Academic Structure

* Class Coordinator: Dr. Sandeep Ojha

### Subjects & Faculty

* Electrical Engineering – Dr. Sandeep Ojha
* Graphics – Prof. Umesh Shukla
* Physics – Dr. Lalit Shukla
* Maths – Prof. V.N. Pathak
* Critical Thinking and Design Thinking – Mr. Sanjay Kumar
* IKS – Dr. Dilip Jaiswal

## Authentication System

* Students login using Roll Number
* Default password = last 3 digits of Roll Number
* Password can be changed after login

## Tech Stack

### Frontend

* HTML
* CSS
* JavaScript

### Backend

* Node.js
* Express.js

### Other Libraries

* QRCode (for generating QR codes)
* Body-parser (for handling requests)

### Deployment

* Railway (for hosting backend and frontend)

## Data Handling

* Data is stored temporarily using arrays
* Persistence is managed using a JSON file (data.json)

## Functional Workflow

1. Student logs in using credentials
2. QR code is generated daily for attendance
3. Attendance is marked and stored
4. If attendance is missed:

   * Student submits rectification request
   * Coordinator reviews and approves/rejects
5. Leave and queries follow similar approval workflow

## Live site  https://qr-attendance-system-jxxo.onrender.com/

## Future Enhancements

* Database integration (MongoDB)
* Improved UI/UX
* Role-based authentication system

## Developer

Developed as a full-stack web project for academic and learning purposes.
