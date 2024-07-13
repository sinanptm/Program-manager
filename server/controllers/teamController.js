import asyncHandler from 'express-async-handler';
import { Team } from '../models/team.js';
import { transformId } from '../utils/transformId.js';

export const getTeams = asyncHandler(async (req, res) => {
    const teams = await Team.find();
    res.status(200).json({ teams: transformId(teams) });
});

export const addTeam = asyncHandler(async (req, res) => {
    const { name } = req.body;
    const team = await Team.create({ name });

    res.status(201).json({ team: transformId(team) });
});

export const deleteTeam = asyncHandler(async (req, res) => {
    const { id } = req.params;
    const team = await Team.findById(id);

    if (!team) {
        return res.status(404).json({ message: 'Team not found' });
    }
    if (team.members.length > 0) {
        return res.status(400).json({ message: 'Team cannot be deleted because it has members' });
    }
    await Team.findByIdAndDelete(id);

    res.status(200).json({ message: 'Team deleted successfully' });
});
