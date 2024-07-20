import asyncHandler from 'express-async-handler';
import { Program } from '../models/program.js';
import { Participant } from '../models/participant.js';
import { Team } from '../models/team.js';
import { transformId } from '../utils/transformId.js';
import { isValidObjectId } from 'mongoose';

export const getPrograms = asyncHandler(async (req, res) => {
    const page = parseInt(req.query.page, 10) || 0;
    const limit = parseInt(req.query.limit, 10) || 0;
    const skip = (page - 1) * limit;

    const [programs, totalPrograms] = await Promise.all([
        Program.find().skip(skip).limit(limit),
        Program.countDocuments()
    ]);

    res.status(200).json({
        programs: transformId(programs),
        totalPages: Math.ceil(totalPrograms / limit),
        currentPage: page
    });
});

export const getProgram = asyncHandler(async (req, res) => {
    const { id } = req.params;
    if (!isValidObjectId(id)) return res.status(404).json({ message: "ID is not valid" });
    const page = parseInt()

    let program = await Program.findById(id).lean();
    if (!program) return res.status(404).json({ message: "Program not found" });

    program = transformId(program);

    program.participants = await Promise.all(
        program.participants.map(async (participantId) => {
            const participant = await Participant.findById(participantId, { _id: 1, name: 1, team: 1 }).lean();
            if (participant) {
                return {
                    id: participant._id.toString(),
                    name: participant.name,
                    team: participant.team ? await fetchTeamName(participant.team) : null
                };
            }
            return null;
        })
    );

    if (program.firstPlace?.participant) {
        const firstPlaceParticipant = await Participant.findById(program.firstPlace.participant, { _id: 1, name: 1, team: 1 }).lean();
        program.firstPlace.participant = firstPlaceParticipant ? {
            id: firstPlaceParticipant._id.toString(),
            name: firstPlaceParticipant.name,
            team: firstPlaceParticipant.team ? await fetchTeamName(firstPlaceParticipant.team) : null
        } : null;
    }

    if (program.secondPlace?.participant) {
        const secondPlaceParticipant = await Participant.findById(program.secondPlace.participant, { _id: 1, name: 1, team: 1 }).lean();
        program.secondPlace.participant = secondPlaceParticipant ? {
            id: secondPlaceParticipant._id.toString(),
            name: secondPlaceParticipant.name,
            team: secondPlaceParticipant.team ? await fetchTeamName(secondPlaceParticipant.team) : null
        } : null;
    }

    if (program.thirdPlace?.participant) {
        const thirdPlaceParticipant = await Participant.findById(program.thirdPlace.participant, { _id: 1, name: 1, team: 1 }).lean();
        program.thirdPlace.participant = thirdPlaceParticipant ? {
            id: thirdPlaceParticipant._id.toString(),
            name: thirdPlaceParticipant.name,
            team: thirdPlaceParticipant.team ? await fetchTeamName(thirdPlaceParticipant.team) : null
        } : null;
    }

    res.status(200).json({ program });
});

async function fetchTeamName(teamId) {
    const team = await Team.findById(teamId, { name: 1 }).lean();
    return team ? team.name : null;
}

export const addProgram = asyncHandler(async (req, res) => {
    const { name, category, type } = req.body;

    const program = await Program.create({ name, category, type });

    res.status(201).json({ program: transformId(program) });
});

export const updateProgram = asyncHandler(async (req, res) => {
    const { id } = req.params;
    const { name, category, type } = req.body;

    const program = await Program.findByIdAndUpdate(id, { name, category, type }, { new: true });

    if (!program) {
        return res.status(404).json({ message: 'Program not found' });
    }

    res.status(200).json({ program: transformId(program) });
});

export const deleteProgram = asyncHandler(async (req, res) => {
    const { id } = req.params;

    const program = await Program.findByIdAndDelete(id);

    if (!program) {
        return res.status(404).json({ message: 'Program not found' });
    }

    res.status(200).json({ message: 'Program deleted successfully' });
});


export const setWinners = asyncHandler(async (req, res) => {
    const { winners, id } = req.body;

    const program = await Program.findById(id);
    if (!program) {
        return res.status(404).json({ message: 'Program not found' });
    }

    const { firstPlace, secondPlace, thirdPlace } = winners;

    program.status = 'done';

    if (firstPlace.points !== 0) {
        program.firstPlace = firstPlace;
    }

    if (secondPlace && secondPlace.points !== 0) {
        program.secondPlace = secondPlace;
    }

    if (thirdPlace && thirdPlace.points !== 0) {
        program.thirdPlace = thirdPlace;
    }

    const updateParticipantPoints = async (place) => {
        try {
            if (!place.participant) {
                return { error: 'Participant ID is missing or invalid' };
            }

            const participant = await Participant.findById(place.participant);
            if (!participant) {
                return { error: 'Participant not found' };
            }

            participant.points += place.points;

            const team = await Team.findById(participant.team);
            if (!team) {
                return { error: 'Team not found' };
            }
            team.points += place.points;

            await participant.save();
            await team.save();

            return { participant: transformId(participant), team: transformId(team) };
        } catch (error) {
            console.error('Error updating points:', error);
            return { error: 'Error updating participant points' };
        }
    };

    const results = {};

    if (firstPlace && firstPlace.points !== 0) {
        const firstPlaceResults = await updateParticipantPoints(firstPlace);
        if (firstPlaceResults.error) return res.status(404).json({ message: firstPlaceResults.error });
        results.firstPlace = firstPlaceResults;
    }

    if (secondPlace && secondPlace.points !== 0) {
        const secondPlaceResults = await updateParticipantPoints(secondPlace);
        if (secondPlaceResults.error) return res.status(404).json({ message: secondPlaceResults.error });
        results.secondPlace = secondPlaceResults;
    }

    if (thirdPlace && thirdPlace.points !== 0) {
        const thirdPlaceResults = await updateParticipantPoints(thirdPlace);
        if (thirdPlaceResults.error) return res.status(404).json({ message: thirdPlaceResults.error });
        results.thirdPlace = thirdPlaceResults;
    }

    await program.save();


    res.status(200).json({
        program: transformId(program),
        ...results,
    });
});

