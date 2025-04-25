//main solo page component (pull other trackers in here)
// also include banner (pull in from props) 

import React, { useState } from 'react'; 
import WorkoutTracker from './WorkoutTracker'; 
import DietTracker from './DietTracker'; 
import LangTracker from './LangTracker'; 

interface ProgressState {
    workout: number; 
    diet: number, 
    language: number; 
}

const UserPage: React.FC = () => {
    const [progress, setProgress] = useState<ProgressState>({
        workout: 0,
        diet: 0,
        language: 0,
    }); 
//replace this withe variables passed in from trip template 
    const tripGoals {
        workout: 20, 
        diet: 10,
        language: 15, 
    }; 

    const handleIncrement = (key: keyof ProgressState) => {
        setProgress(prev => ({
            ...prev, 
            [key]: Math.min(prev[key] + 1, tripGoals[key]),
        }));
    };

    return (
        <div style={{ display: flex, justifyContent: 'center', gap: '2rem' }}>
            <WorkoutTracker
              value={progress.workout}
              goal={tripGoals.workout}
              onIncrement={() => handleIncremenet('workout')}
            />
            <DietTracker
              value={progress.diet}
              goal={tripGoals.diet}
              onIncrement={() => handleIncremenet('diet')}
            />
            <LangTracker
              value={progress.language}
              goal={tripGoals.language}
              onIncrement={() => handleIncremenet('language')}
            />
        </div>
    );
};

export default SoloPage; 