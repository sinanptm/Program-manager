import { Schema, model } from "mongoose";

// Team Schema
const teamSchema = new Schema({
    name: {
        type: String,
        required: true,
    },
    points: {
        type: Number,
        default: 0,
    },
    members: [
        {
            participant: {
                type: Schema.Types.ObjectId,
                ref: "Participant",
            },
            points: {
                type: Number,
                default: 0,
            },
        },
    ],
});

export const Team = model("Team", teamSchema);
