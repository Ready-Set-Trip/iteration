//main solo page component (pull other trackers in here)
// stretch:
// also include banner (pull in from props)

import React, { useState, useEffect } from 'react';
import Tracker from './Tracker';

// typescript define types of internal state
interface ProgressState {
  workout: number;
  diet: number;
  language: number;
}

//typescript define props SoloPage is expecting
interface SoloPageProps {
  userId: string; // number in string form
  username: string;
  progress: ProgressState;
  tripGoals: { workout: number; diet: number; language: number };
  onProgressUpdate: (id, habit) => void;
}

// react component page that takes 4 props from GroupTripPage ... handles incrementing each category as needed
const SoloPage: React.FC<SoloPageProps> = ({ userId, username, progress, tripGoals, onProgressUpdate }) => {
  const [state, setState] = useState<ProgressState>(progress);
  console.log('username in SoloPage', username)

  // takes key of ProgressState -> so, must be workout, diet, or language ... updates amount up to goal amount
  const handleIncrement = (key: keyof ProgressState) => {
    console.log('key', key) // key is the name of the habit that is being incremented. 
    // need to find some way to pass it into onProgressUpdate
    // probably need to get key instead of habitObj/updatedProgress
    const updatedProgress = {
      ...progress,
      [key]: Math.min(progress[key] + 1, tripGoals[key]),
    };
    console.log('progress', progress)
    console.log('updated progress', updatedProgress) // updatedProgress is what generates the habitObj
    setState(updatedProgress) // hopefully live updates the counter
    onProgressUpdate(userId, key); // Pass the habit name that was incremented back to GroupTripPage's handleProgressUpdate
  };

  // renders the page ... progess.workout for example is the value currently in useState of Progress for "workout"
  return (
    <div style={{ textAlign: 'center' }}>
      <h2> {username}'s Current Status</h2>
      <div style={{ display: 'flex', justifyContent: 'center', gap: '2rem' }}>
        <Tracker
          habit='workout'
          value={progress.workout}
          goal={tripGoals.workout}
          onIncrement={() => handleIncrement('workout')}
        />
        <Tracker habit='diet' value={progress.diet} goal={tripGoals.diet} onIncrement={() => handleIncrement('diet')} />
        <Tracker
          habit='language'
          value={progress.language}
          goal={tripGoals.language}
          onIncrement={() => handleIncrement('language')}
        />
      </div>
    </div>
  );
};

export default SoloPage;
