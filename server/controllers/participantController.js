import { asyncHandler } from '../utils/asyncHandler.js';
import { Participant } from '../models/participant.js';
import { Team } from '../models/team.js';
import { Program } from '../models/program.js'

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

    await Team.findByIdAndUpdate(
        team,
        { $push: { members: participant._id } },
        { new: true }
    );

    res.status(201).json({ participant });
});

export const updateParticipant = asyncHandler(async (req, res) => {
    const { id } = req.params;
    const { name, team, category } = req.body;
    const participant = await Participant.findById(id);

    if (!participant) return res.status(404).json({ message: 'Participant not found' });

    participant.name = name ?? participant.name;
    participant.team = team ?? participant.team;
    participant.category = category ?? participant.category;

    await participant.save();

    res.status(200).json({ participant });
});

export const addProgramToParticipant = asyncHandler(async (req, res) => {
    const { id } = req.params;
    const { programId } = req.body;

    const participant = await Participant.findById(id);
    const program = await Program.findById(programId);
    if (!participant || !program) return res.status(404).json({ message: "Not Found" });

    participant.programs.push(programId);
    program.participants.push(participant._id);

    await participant.save();
    await program.save();

    res.status(200).json({ program, participant })
});

export const deleteParticipant = asyncHandler(async (req, res) => {
    const { id } = req.params;

    const participant = await Participant.findByIdAndDelete(id);

    if (!participant) {
        return res.status(404).json({ message: 'Participant not found' });
    }

    res.status(200).json({ message: 'Participant deleted successfully' });
});


