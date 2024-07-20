import { Router } from 'express';
import { authLogin } from '../controllers/authenticationController.js'
import { getTeams, addTeam, deleteTeam } from '../controllers/teamController.js';
import { getPrograms, addProgram, updateProgram, deleteProgram, setWinners, getProgram } from '../controllers/programController.js';
import { getParticipants, addParticipant, updateParticipant, deleteParticipant, addProgramToParticipant } from '../controllers/participantController.js';
import { isAuthorized } from '../middleware/auth.js';

export const router = Router();

// Authentication Route
router.post('/login', authLogin);                         // POST /api/login

// Team routes
router.get('/teams', getTeams);                           // GET /api/teams
router.post('/teams', isAuthorized, addTeam);             // POST /api/teams
router.delete('/teams/:id', isAuthorized, deleteTeam);    // DELETE /api/teams/:id

// Program routes
router.get('/programs', getPrograms);                           // GET /api/programs
router.get('/programs/:id', isAuthorized, getProgram);          // GET /api/programs
router.post('/programs', isAuthorized, addProgram);             // POST /api/programs
router.put('/programs/set-winner', isAuthorized, setWinners)    // PUT /api/programs
router.put('/programs/:id', isAuthorized, updateProgram);       // PUT /api/programs/:id
router.delete('/programs/:id', isAuthorized, deleteProgram);    // DELETE /api/programs/:id

// Participant routes
router.get('/participants', getParticipants);                                           // GET /api/participants
router.post('/participants', isAuthorized, addParticipant);                             // POST /api/participants
router.put('/participants/add-program/:id', isAuthorized, addProgramToParticipant);     // POST /api/participants
router.put('/participants/:id', isAuthorized, updateParticipant);                       // PUT /api/participants/:id
router.delete('/participants/:id', isAuthorized, deleteParticipant);                    // DELETE /api/participants/:id