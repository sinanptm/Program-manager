import { asyncHandler } from '../utils/asyncHandler.js';
import { Team } from '../models/team.js';

// Controller to get all teams
export const getTeams = asyncHandler(async (req, res) => {
    const teams = await Team.find();
    res.status(200).json({ teams });
});

// Controller to add a new team
export const addTeam = asyncHandler(async (req, res) => {
    const { name } = req.body;

    const team = await Team.create({ name });

    res.status(201).json({ team });
});

// Controller to update team details
export const updateTeam = asyncHandler(async (req, res) => {
    const { id } = req.params;
    const { name } = req.body;

    const team = await Team.findByIdAndUpdate(id, { name }, { new: true });

    if (!team) {
        return res.status(404).json({ message: 'Team not found' });
    }

    res.status(200).json({ team });
});

// Controller to delete a team
export const deleteTeam = asyncHandler(async (req, res) => {
    const { id } = req.params;

    const team = await Team.findByIdAndDelete(id);

    if (!team) {
        return res.status(404).json({ message: 'Team not found' });
    }

    res.status(200).json({ message: 'Team deleted successfully' });
});
