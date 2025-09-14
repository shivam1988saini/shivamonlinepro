const express = require('express');
const mongoose = require('mongoose');
const validator = require('validator');

mongoose.connect('mongodb://localhost:27017/shivammongodatabase', {
    useNewUrlParser: true,
    useUnifiedTopology: true
}).then(() => console.log("MongoDB connection done"))
  .catch((err) => console.log("MongoDB connection error:", err));

const userdataschema = new mongoose.Schema({
    sname: {
        type: String,
        unique: true,
        required: true,
        lowercase: true,
        trim: true,
        minlength: [2, "Minimum two letters"],
        maxlength: 30
    },
    pnum: {
        type: String,
        validate(value) {
            if (!/^\d{10}$/.test(value)) {
                throw new Error("Phone number must be exactly 10 digits");
            }
        },
        required: true
    },
    email: {
        type: String,
        unique: true,
        required: true,
        lowercase: true,
        trim: true,
        validate(value) {
            if (!validator.isEmail(value)) {
                throw new Error("Email is not valid");
            }
        }
    },
    date: {
        type: Date,
        default: Date.now
    }
});

const Shivamdata = mongoose.model("Shivam", userdataschema);

const server = express();
server.use(express.json());

// Get all users
server.get('/users', async (req, res) => {
    try {
        const result = await Shivamdata.find();
                console.log(result);
        res.status(200).json(result);
    } catch (err) {
        res.status(400).json({ error: err.message });
    }
});

// Get user by ID
server.get('/users/:id', async (req, res) => {
    try {
        const id = req.params.id;
        const result = await Shivamdata.findById(id);
        if (!result) {
            return res.status(404).json({ error: "User not found" });
        }
        res.status(200).json(result);
    } catch (err) {
        res.status(400).json({ error: err.message });
    }
});

// Create user
server.post('/users', async (req, res) => {
    try {
        console.log(req.body);
        const userdata = new Shivamdata(req.body);
        const result = await userdata.save();
        res.status(201).json(result);
    } catch (err) {
        res.status(400).json({ error: err.message });
    }
});

// Update user
server.put('/users/:id', async (req, res) => {
    try {
        const id = req.params.id;
        const result = await Shivamdata.updateOne({ _id: id }, { $set: req.body });
        res.status(200).json(result);
    } catch (err) {
        res.status(400).json({ error: err.message });
    }
});

// Delete user
server.delete('/users/:id', async (req, res) => {
    try {
        const id = req.params.id;
        const result = await Shivamdata.deleteOne({ _id: id });
        res.status(200).json(result);
    } catch (err) {
        res.status(400).json({ error: err.message });
    }
});

server.listen(8080, () => {
    console.log("Server started on http://localhost:8080");
});
