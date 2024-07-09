import { asyncHandler } from '../utils/asyncHandler.js';
import { Participant } from '../models/participant.js';

export const getParticipants = asyncHandler(async (req, res) => {
    const participants = await Participant.find();
    res.status(200).json({ participants });
});

export const addParticipant = asyncHandler(async (req, res) => {
    const { name, team, category } = req.body;

    const participant = await Participant.create({
        name,
        team,
        category,
    });

    res.status(201).json({ participant });
});

export const updateParticipant = asyncHandler(async (req, res) => {
    const { id } = req.params;
    const { name, team, category } = req.body;

    const participant = await Participant.findByIdAndUpdate(id, { name, team, category }, { new: true });

    if (!participant) {
        return res.status(404).json({ message: 'Participant not found' });
    }

    res.status(200).json({ participant });
});

export const deleteParticipant = asyncHandler(async (req, res) => {
    const { id } = req.params;

    const participant = await Participant.findByIdAndDelete(id);

    if (!participant) {
        return res.status(404).json({ message: 'Participant not found' });
    }

    res.status(200).json({ message: 'Participant deleted successfully' });
});
