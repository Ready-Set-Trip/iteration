// main group trip page
// pass down banner w/ top leader(s) & countdown
// message board component pulled in here
// full leaderboard &/or group stats with clickable individual user links
import React, { useState } from 'react';
import SoloPage from '../SoloPage/SoloPage';

//figure out how to pass these down and not hardcode ..
const tripGoals = {
  workout: 20,
  diet: 15,
  language: 10,
};
//set up state for page ...
const GroupTripPage: React.FC = () => {
  const [selectedUser, setSelectedUser] = useState<string | null>(null);

  const [groupProgress, setGroupProgress] = useState([
    { username: 'Sandar', progress: { workout: 0, diet: 0, language: 0 } },
    { username: 'Will', progress: { workout: 0, diet: 0, language: 0 } },
    { username: 'Pete', progress: { workout: 0, diet: 0, language: 0 } },
  ]);

  //interact with solopage ... update group progress state with info passed up

    const handleProgressUpdate = (username: string, updatedProgress: any) => {
      setGroupProgress((prevProgress) =>
        prevProgress.map((user) =>
          user.username === username
            ? { ...user, progress: updatedProgress }
            : user
        )
      );
    };

  //calc leaderboard
  //   const leaderboard = groupProgress
  //     .map((user) => ({
  //       username: user.username,
  //       total: calculateTotal(user.progress),
  //     }))
  //     .sort((a, b) => b.total - a.total);

  return (
    <div style={{ padding: '20px' }}>
      {!selectedUser ? (
        <>
          <h1>Group Trip - Goals Overview</h1>
          <h3>Trip Goals:</h3>
          <ul>
            <li>Workout: {tripGoals.workout} sessions</li>
            <li>Diet: {tripGoals.diet} days of healthy eating</li>
            <li>Language: {tripGoals.language} lessons</li>
          </ul>
          <h2>Leaderboard</h2>
          {groupProgress.map((user) => (
            <div key={user.username}>
              <button onClick={() => setSelectedUser(user.username)}>
                {user.username}
              </button>
              <ul>
                <li>Workout: {user.progress.workout} / {tripGoals.workout}</li>
                <li>Diet: {user.progress.diet} / {tripGoals.diet}</li>
                <li>Language: {user.progress.language} / {tripGoals.language}</li>
              </ul>
            </div>
          ))}
        </>
      ) : (
        <>
          <button onClick={() => setSelectedUser(null)}>Back to Group Page</button>
          <SoloPage
            username={selectedUser}
            progress={groupProgress.find(user => user.username === selectedUser)?.progress || { workout: 0, diet: 0, language: 0 }}
            tripGoals={tripGoals} 
            onProgressUpdate={(updatedProgress) => 
                handleProgressUpdate(selectedUser!, updatedProgress)
            }
          />
        </>
      )}
    </div>
  );
};

export default GroupTripPage;