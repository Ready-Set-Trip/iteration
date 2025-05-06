//main solo page component (pull other trackers in here)
// stretch:
// also include banner (pull in from props)

import React from 'react';
import Tracker from './Tracker';

type UserInfo = {
  name: string;
  id: number;
  progress: Progress;
};

type Progress = {
  workout: number;
  diet: number;
  language: number;
};

//typescript define props SoloPage is expecting
interface SoloPageProps {
  userId: number; 
  name: string;
  progress: Progress;
  tripGoals: { workout: number; diet: number; language: number };
  onProgressUpdate: (id, habit) => void;
}

// react component page that takes 4 props from GroupTripPage ... handles incrementing each category as needed
const SoloPage: React.FC<SoloPageProps> = ({ userId, name, progress, tripGoals, onProgressUpdate }) => {
  console.log('name in SoloPage', name)

  // takes key of Progress -> so, must be workout, diet, or language ... updates amount up to goal amount
  const handleIncrement = (key: keyof Progress) => {
    console.log('key', key) // key is the name of the habit that is being incremented. 
    // need to find some way to pass it into onProgressUpdate
    // probably need to get key instead of habitObj/updatedProgress
    const updatedProgress = {
      ...progress,
      [key]: Math.min(progress[key] + 1, tripGoals[key]),
    };
    console.log('progress', progress)
    console.log('updated progress', updatedProgress) // updatedProgress is what generates the habitObj
    onProgressUpdate(userId, key); // Pass the habit name that was incremented back to GroupTripPage's handleProgressUpdate
  };

  // renders the page ... progess.workout for example is the value currently in useState of Progress for "workout"
  return (
    <div style={{ textAlign: 'center' }}>
      <h2> {name}'s Current Status</h2>
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
