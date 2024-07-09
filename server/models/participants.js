import { Schema, model } from "mongoose";
// Participant Schema
const participantSchema = new Schema({
    name: {
        type: String,
        required: true,
    },
    team: {
        type: Schema.Types.ObjectId,
        ref: "Team",
        required: true,
    },
    points: {
        type: Number,
        default: 0,
    },
    programs: [
        {
            program: {
                type: Schema.Types.ObjectId,
                ref: "Program",
            },
        },
    ],
    category:{
        type:String,
        enum:['lp','up','hs','hss','junior'],
        required: true,
    }
}, { timestamps: true });

export const Participant = model("Participant", participantSchema);
