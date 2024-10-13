const empModel = require("../models/EmpModel.js");
const express = require("express");
const router = express.Router();
const { body, validationResult } = require('express-validator');

router.post('/employees',[
    body('first_name').notEmpty().withMessage('First name is required'),
    body('last_name').notEmpty().withMessage('Last name is required'),
    body('email').isEmail().withMessage('Must be a valid email'),
    body('salary').optional().isFloat({ min: 0 }).withMessage('Salary must be a non-negative number'),
    ], async (req, res) => {
    const { first_name, last_name, email, department, date_of_joining, position, salary } = req.body;
    const errors = validationResult(req);
    if (!errors.isEmpty()) {
        return res.status(400).json({ 
            status: false,
            message: errors.array().map(err => err.msg).join(', ') // Combine error messages
        });
    }
    const existingEmployee = await empModel.findOne({ email });
    if (existingEmployee) {
        return res.status(400).json({ 
            status: false, 
            message: "Email already exists" 
        });
    }
    const employee = new empModel({
        first_name,
        last_name,
        email,
        department,
        date_of_joining,
        position,
        salary,
        created_at: new Date(),
        updated_at: new Date()
    });
    try {
        const savedEmployee = await employee.save();
        res.status(201).send({ message: "Employee created successfully", employee_id: employee._id });
    } catch (err) {
        res.status(500).send({ status: false,  message: "Error creating employee", error: err.message });
    }
});


router.get("/employees", async (req, res) =>{
    try {
        const employees = await empModel.find().sort({created_at: -1});
        res.send(employees);
    } catch (err) {
        res.status(500).send({ status: false, message: "Error fetching employees", error: err.message});
        }
});

router.get("/employees/:eid", async (req, res) =>{
    const eid = req.params.eid;
    try {
        const employee = await empModel.findById(eid);
        if (!employee) {
            return res.status(404).send({ status: false, message: "Employee not found" });
        }
        res.send(employee);
        } 
        catch (err) {
            res.status(500).send({ status: false, message: "Error fetching employee", error: err.message});
        }
});

router.put("/employees/:eid", [ 
    body('salary').optional().isFloat({ min: 0 }).withMessage('Salary must be a non-negative number')],
    async (req, res) =>{
    const eid = req.params.eid;
    const { first_name, last_name, email, department, date_of_joining, position, salary , updated_at} = req.body;
    if (!errors.isEmpty()) {
        return res.status(400).json({ 
            status: false,
            message: errors.array().map(err => err.msg).join(', ') // Combine error messages
        });
    }
    const existingEmployee = await empModel.findOne({ email });
    if (existingEmployee) {
        return res.status(400).json({ 
            status: false, 
            message: "Email already exists" 
        });
    }
    try {
        const employee = await empModel.findByIdAndUpdate(eid, {
            first_name,
            last_name,
            email,
            department,
            date_of_joining,
            position,
            salary,
            updated_at: new Date()
            }, { new: true });
        if (!employee) {
            return res.status(404).send({ message: "Employee not found" });
        }
        res.send({message: "Employee details updated successfully."});
    }
    catch (err) {
        res.status(500).send({ status: false, message: "Error updating employee", error: err.message});
    }
});

router.delete('/employees/:eid', async (req, res)=>{
    const eid = req.params.eid;
    try{
        const employee = await empModel.findByIdAndDelete(eid);
        if(!employee){
            return res.status(404).send({ status: false, message: "Employee not found"});
        }
        res.send({message: "Employee deleted successfully"});
    }
    catch(err){
        res.status(500).send({ status: false, message: "Error deleting employee", error: err.message});
    }
});

module.exports = router;