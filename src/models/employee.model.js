import mongoose, { Schema } from "mongoose";

const employeeSchema = new Schema(
    {
        fullName: {
            type: String,
            required: true,
            trim: true,
        },
        email: {
            type: String,
            required: true,
            unique: true,
            lowercase: true,
            trim: true,
        },
        position: {
            type: String,
            required: true,
            trim: true,
        },
        department: {
            type: String,
            required: true,
            trim: true,
        },
        salary: {
            type: Number,
            required: true,
        },
        joiningDate: {
            type: Date,
            required: true,
        },
        status: {
            type: String,
            enum: ["active", "inactive", "on-leave"],
            default: "active",
        },
        createdBy: {
            type: Schema.Types.ObjectId,
            ref: "User",
        },
        userId: {
            type: Schema.Types.ObjectId,
            ref: "User",
        },
    },
    {
        timestamps: true,
    }
);

export const Employee = mongoose.model("Employee", employeeSchema);
