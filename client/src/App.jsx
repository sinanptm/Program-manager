import React from 'react';
import { useGetTeamsQuery } from './slices/teamsApiSlice';

const App = () => {
  const { data: teams, error, isLoading } = useGetTeamsQuery(); // No need for 'id' here

  if (error) return <h3>{error.message}</h3>; // Ensure error is properly accessed

  if (isLoading) return <h5>Loading...</h5>;
console.log(teams);
  return (
    <div>
      <h1>Teams</h1>
      {teams?.length > 0 ? (
        <ul>
          {teams.map(team => (
            <li key={team.id}>{team.name}</li> // Ensure team object structure
          ))}
        </ul>
      ) : (
        <p>No teams available</p>
      )}
    </div>
  );
};

export default App;
