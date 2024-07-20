import asyncHandler from 'express-async-handler';
import { Participant } from '../models/participant.js';
import { Team } from '../models/team.js';
import { Program } from '../models/program.js';
import { transformId } from '../utils/transformId.js';

export const getParticipants = asyncHandler(async (req, res) => {
    const page = parseInt(req.query.page, 10) ?? 1;
    const limit = parseInt(req.query.limit, 10) ?? 12;
    const skip = (page - 1) * limit;

    let participants = await Participant.find().skip(skip).limit(limit);
    participants = transformId(participants);

    const participantsWithDetails = await Promise.all(participants.map(async (participant) => {
        const { team, programs, ...rest } = participant;

        const teamDoc = await Team.findById(team, { _id: 0, name: 1 });
        const teamName = teamDoc?.name ?? null;

        const programDetails = await Promise.all(programs.map(async (programObj) => {
            const programId = programObj.program;
            const programDoc = await Program.findById(programId, { _id: 1, name: 1 });

            return {
                id: programDoc?._id ?? programId,
                name: programDoc?.name ?? 'Unknown Program',
            };
        }));

        return {
            team,
            programs: programDetails,
            ...rest,
            teamName,
        };
    }));

    const totalParticipants = await Participant.countDocuments();
    const totalPages = Math.ceil(totalParticipants / limit);

    res.status(200).json({ participants: participantsWithDetails, totalPages, currentPage: page });
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

    res.status(201).json({ participant: transformId(participant) });
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

    res.status(200).json({ participant: transformId(participant) });
});

export const addProgramToParticipant = asyncHandler(async (req, res) => {
    const { id } = req.params;
    const { programId } = req.body;

    try {
        const participant = await Participant.findById(id);
        const program = await Program.findById(programId);

        if (!participant || !program) {
            return res.status(404).json({ message: "Participant or Program not found" });
        }

        const existingProgram = participant.programs.find(item => item?.program?.toString() === programId);
        if (existingProgram) {
            return res.status(402).json({ message: 'This program is already registered for the participant' });
        }

        participant.programs.push({ program: programId });
        program.participants.push(id);

        await participant.save();
        await program.save();

        res.status(200).json({ program: transformId(program), participant: transformId(participant) });
    } catch (error) {
        console.error('Error adding program to participant:', error);
        res.status(500).json({ message: "Internal Server Error" });
    }
});




export const deleteParticipant = asyncHandler(async (req, res) => {
    const { id } = req.params;

    const participant = await Participant.findByIdAndDelete(id);
    if (!participant) {
        return res.status(404).json({ message: 'Participant not found' });
    }
    const team = await Team.findOne({ members: participant._id });
    if (team) {
        team.members = team.members.filter(memberId => memberId.toString() !== participant._id.toString());
        await team.save();
    }

    res.status(200).json({ message: 'Participant deleted successfully' });
});
