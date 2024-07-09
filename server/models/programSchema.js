import { Schema, model } from "mongoose";

e
// Program Schema
const programSchema = new Schema({
    name: {
        type: String,
        required: true,
    },
    category: {
        type: String,
        required: true,
        enum:['lp','up','hs','hss','junior']
    },
    firstPlace: {
        participant: {
            type: Schema.Types.ObjectId,
            ref: "Participant",
        },
        points: {
            type: Number,
            default: 0,
        },
    },
    secondPlace: {
        participant: {
            type: Schema.Types.ObjectId,
            ref: "Participant",
        },
        points: {
            type: Number,
            default: 0,
        },
    },
    thirdPlace: {
        participant: {
            type: Schema.Types.ObjectId,
            ref: "Participant",
        },
        points: {
            type: Number,
            default: 0,
        },
    },
    status: {
        type: String,
        enum: ['done', 'evaluating', 'waiting'],
        default: 'waiting',
    },
    type: {
        type: String,
        enum: ['on-stage', 'offstage', 'online'],
        required:true
    },
}, { timestamps: true });

export const Program = model("Program", programSchema);
