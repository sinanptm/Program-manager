import { Schema, model } from "mongoose";

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
            type: Schema.Types.ObjectId,
            ref: "Participant",
        },
    ],
});

export const Team = model("Team", teamSchema);
