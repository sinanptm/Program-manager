import { Router } from 'express';
import { getTeams, addTeam, updateTeam, deleteTeam } from '../controllers/teamController.js';
import { getPrograms, addProgram, updateProgram, deleteProgram, setWinners } from '../controllers/programController.js';
import { getParticipants, addParticipant, updateParticipant, deleteParticipant, addProgramToParticipant } from '../controllers/participantController.js';

const router = Router();

// Team routes
router.get('/teams', getTeams);             // GET /api/teams
router.post('/teams', addTeam);             // POST /api/teams
router.put('/teams/:id', updateTeam);       // PUT /api/teams/:id
router.delete('/teams/:id', deleteTeam);    // DELETE /api/teams/:id

// Program routes
router.get('/programs', getPrograms);             // GET /api/programs
router.post('/programs', addProgram);             // POST /api/programs
router.put('/programs/set-winner', setWinners)    // PUT /api/programs
router.put('/programs/:id', updateProgram);       // PUT /api/programs/:id
router.delete('/programs/:id', deleteProgram);    // DELETE /api/programs/:id

// Participant routes
router.get('/participants', getParticipants);                             // GET /api/participants
router.post('/participants', addParticipant);                             // POST /api/participants
router.put('/participants/add-program/:id', addProgramToParticipant);     // POST /api/participants
router.put('/participants/:id', updateParticipant);                       // PUT /api/participants/:id
router.delete('/participants/:id', deleteParticipant);                    // DELETE /api/participants/:id

export default router;