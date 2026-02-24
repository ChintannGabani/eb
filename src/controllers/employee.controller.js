import { Employee } from "../models/employee.model.js";
import { ApiResponse } from "../utils/ApiResponse.js";
import { AppError } from "../utils/AppError.js";

const createEmployee = async (req, res, next) => {
    try {
        const { fullName, email, position, department, salary, joiningDate } = req.body;

        if ([fullName, email, position, department, salary, joiningDate].some(field => field === undefined || field === "")) {
            throw new AppError(400, "All fields are required");
        }

        const existedEmployee = await Employee.findOne({ email });

        if (existedEmployee) {
            throw new AppError(409, "Employee with this email already exists");
        }

        const employee = await Employee.create({
            fullName,
            email,
            position,
            department,
            salary,
            joiningDate,
            createdBy: req.user?._id
        });

        return res.status(201).json(
            new ApiResponse(201, employee, "Employee created successfully")
        );
    } catch (error) {
        next(error);
    }
};

const getAllEmployees = async (req, res, next) => {
    try {
        const employees = await Employee.find();
        return res.status(200).json(
            new ApiResponse(200, employees, "Employees fetched successfully")
        );
    } catch (error) {
        next(error);
    }
};

const getEmployeeById = async (req, res, next) => {
    try {
        const employee = await Employee.findById(req.params.id);
        if (!employee) {
            throw new AppError(404, "Employee not found");
        }
        return res.status(200).json(
            new ApiResponse(200, employee, "Employee fetched successfully")
        );
    } catch (error) {
        next(error);
    }
};

const updateEmployee = async (req, res, next) => {
    try {
        const employee = await Employee.findByIdAndUpdate(
            req.params.id,
            { $set: req.body },
            { new: true }
        );
        if (!employee) {
            throw new AppError(404, "Employee not found");
        }
        return res.status(200).json(
            new ApiResponse(200, employee, "Employee updated successfully")
        );
    } catch (error) {
        next(error);
    }
};

const deleteEmployee = async (req, res, next) => {
    try {
        const employee = await Employee.findByIdAndDelete(req.params.id);
        if (!employee) {
            throw new AppError(404, "Employee not found");
        }
        return res.status(200).json(
            new ApiResponse(200, {}, "Employee deleted successfully")
        );
    } catch (error) {
        next(error);
    }
};

const getMyEmployeeDetails = async (req, res, next) => {
    try {
        const employee = await Employee.findOne({
            $or: [
                { userId: req.user?._id },
                { email: req.user?.email }
            ]
        });

        if (!employee) {
            throw new AppError(404, "Employee record not found for this user");
        }
        return res.status(200).json(
            new ApiResponse(200, employee, "Your details fetched successfully")
        );
    } catch (error) {
        next(error);
    }
};

export {
    createEmployee,
    getAllEmployees,
    getEmployeeById,
    updateEmployee,
    deleteEmployee,
    getMyEmployeeDetails
};
