//main solo page component (pull other trackers in here)
// also include banner (pull in from props)

import React, { useState } from 'react';
import WorkoutTracker from './WorkoutTracker';
import DietTracker from './DietTracker';
import LangTracker from './LangTracker';

// typescript define types of internal state
interface ProgressState {
  workout: number;
  diet: number;
  language: number;
}
//typescript define props SoloPage is expecting
interface SoloPageProps {
  username: string;
  progress: ProgressState;
  tripGoals: { workout: number; diet: number; language: number };
  onProgressUpdate: (progress: ProgressState) => void;
}

//replace this withe variables passed in from trip template. currently hardcoded.
const tripGoals = {
  workout: 15,
  diet: 15,
  language: 10,
};

// initializes state ... starts at 0 for all categories ... username and onProgressUpdate are passed in
const SoloPage: React.FC<SoloPageProps> = ({
  username,
  progress,
  tripGoals,
  onProgressUpdate,
}) => {
  const handleIncrement = (key: keyof ProgressState) => {
    const updatedProgress = {
      ...progress,
      [key]: Math.min(progress[key] + 1, tripGoals[key]),
    };
    onProgressUpdate(updatedProgress); // Pass updated progress back to GroupTripPage
  };

  //key of progress state is making sure we're handling only one tracker at a time
  //use this to increment each tracker on progress bar
  // math.min so we don't go over preset goal value

  // renders the page ... progess.workout for example is the value currently in useState of Progress for "workout"
  return (
    <div style={{ textAlign: 'center' }}>
      <h2> Put username here ... {username}'s Current Status</h2>
      <div style={{ display: 'flex', justifyContent: 'center', gap: '2rem' }}>
        <WorkoutTracker
          value={progress.workout}
          goal={tripGoals.workout}
          onIncrement={() => handleIncrement('workout')}
        />
        <DietTracker
          value={progress.diet}
          goal={tripGoals.diet}
          onIncrement={() => handleIncrement('diet')}
        />
        <LangTracker
          value={progress.language}
          goal={tripGoals.language}
          onIncrement={() => handleIncrement('language')}
        />
      </div>
    </div>
  );
};

export default SoloPage;
