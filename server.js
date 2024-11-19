// Importing required modules
const express = require("express");
const bodyParser = require("body-parser");
const fs = require("fs");

const app = express();
const PORT = 3000;

// Middleware to parse incoming form data
app.use(bodyParser.urlencoded({ extended: true }));
app.use(bodyParser.json());

// Serve static files (HTML, CSS, JS, Images)
app.use(express.static("public"));

// Route for Contact Form submission
app.post("/submit-contact", (req, res) => {
    const { name, email, message } = req.body;

    if (!name || !email || !message) {
        return res.status(400).send("All fields are required!");
    }

    // Save the contact message to a file (could be replaced with a database)
    const contactData = `Name: ${name}\nEmail: ${email}\nMessage: ${message}\n---\n`;
    fs.appendFile("contact-messages.txt", contactData, (err) => {
        if (err) {
            console.error("Error saving message:", err);
            return res.status(500).send("Failed to save the message. Try again later.");
        }

        console.log("Message saved successfully!");
        res.status(200).send("Your message has been received!");
    });
});

// Start the server
app.listen(PORT, () => {
    console.log(`Server is running at http://localhost:${PORT}`);
});
