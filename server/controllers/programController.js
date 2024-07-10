import { asyncHandler } from '../utils/asyncHandler.js';
import { Program } from '../models/program.js';
import { Participant } from '../models/participant.js';
import { Team } from '../models/team.js';

// Controller to get all programs
export const getPrograms = asyncHandler(async (req, res) => {
    const programs = await Program.find();
    res.status(200).json({ programs });
});

// Controller to add a new program
export const addProgram = asyncHandler(async (req, res) => {
    const { name, category, type } = req.body;

    const program = await Program.create({ name, category, type });

    res.status(201).json({ program });
});

// Controller to update a program
export const updateProgram = asyncHandler(async (req, res) => {
    const { id } = req.params;
    const { name, category, type } = req.body;

    const program = await Program.findByIdAndUpdate(id, { name, category, type }, { new: true });

    if (!program) {
        return res.status(404).json({ message: 'Program not found' });
    }

    res.status(200).json({ program });
});

// Controller to delete a program
export const deleteProgram = asyncHandler(async (req, res) => {
    const { id } = req.params;

    const program = await Program.findByIdAndDelete(id);

    if (!program) {
        return res.status(404).json({ message: 'Program not found' });
    }

    res.status(200).json({ message: 'Program deleted successfully' });
});


// Controller to set winners for a program
export const setWinners = asyncHandler(async (req, res) => {
    const { firstPlace, secondPlace, thirdPlace, id } = req.body;

    const program = await Program.findById(id);
    if (!program) {
        return res.status(404).json({ message: 'Program not found' });
    }

    program.status = 'done';
    if (firstPlace) program.firstPlace = firstPlace;
    if (secondPlace) program.secondPlace = secondPlace;
    if (thirdPlace) program.thirdPlace = thirdPlace;

    const updateParticipantPoints = async (place) => {
        const participant = await Participant.findById(place.participant);
        if (!participant) {
            return { error: `Participant not found` };
        }
        participant.points += place.points;

        const team = await Team.findById(participant.team);
        if (!team) {
            return { error: `Team not found` };
        }
        team.points += place.points;

        await participant.save();
        await team.save();

        return { participant, team };
    };

    const results = {};

    if (firstPlace) {
        const firstPlaceResults = await updateParticipantPoints(firstPlace);
        if (firstPlaceResults.error) return res.status(404).json({ message: firstPlaceResults.error });
        results.firstPlace = firstPlaceResults;
    }

    if (secondPlace) {
        const secondPlaceResults = await updateParticipantPoints(secondPlace);
        if (secondPlaceResults.error) return res.status(404).json({ message: secondPlaceResults.error });
        results.secondPlace = secondPlaceResults;
    }

    if (thirdPlace) {
        const thirdPlaceResults = await updateParticipantPoints(thirdPlace);
        if (thirdPlaceResults.error) return res.status(404).json({ message: thirdPlaceResults.error });
        results.thirdPlace = thirdPlaceResults;
    }

    await program.save();

    res.status(200).json({
        program,
        ...results,
    });
});
