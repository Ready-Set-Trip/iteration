//main solo page component (pull other trackers in here)
// stretch:
// also include banner (pull in from props)

import React from 'react';
import Tracker from './Tracker';

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
  onProgressUpdate: (id: number, habit: string) => void;
}

// react component page that takes 4 props from GroupTripPage ... handles incrementing each category as needed
const SoloPage: React.FC<SoloPageProps> = ({ userId, name, progress, tripGoals, onProgressUpdate }) => {

  // takes a key of Progress -> so, must be workout, diet, or language currently
  const handleIncrement = (habit: keyof Progress) => {
    onProgressUpdate(userId, habit); 
  };

  // renders the page ... progess.workout for example is the value currently in useState of Progress for "workout"
  return (
    <div style={{ textAlign: 'center' }}>
      <h2> {name}'s Current Progress</h2>
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
