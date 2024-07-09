import { asyncHandler } from '../utils/asyncHandler.js';
import { Program } from '../models/program.js';

// Controller to get all programs
export const getPrograms = asyncHandler(async (req, res) => {
    const programs = await Program.find();
    res.status(200).json({ programs });
});

// Controller to add a new program
export const addProgram = asyncHandler(async (req, res) => {
    const { name, category, type } = req.body;

    const program = await Program.create({
        name,
        category,
        type,
    });

    res.status(201).json({ program });
});

// Controller to update program details
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
