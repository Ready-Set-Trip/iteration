// track diet & have clickable incrementor component
// use progress bar to display progress

import React from 'react';
import { CircularProgressbar, buildStyles } from 'react-circular-progressbar';
import 'react-circular-progressbar/dist/styles.css';

interface TrackerProps {
  value: number;
  goal: number;
  onIncrement: () => void;
}

const DietTracker: React.FC<TrackerProps> = ({ value, goal, onIncrement }) => {
  const percentage = Math.min((value / goal) * 100, 100);

  return (
    <div style={{ margin: 20, textAlign: 'center' }}>
      <h3>Diet</h3>
      <div style={{ width: 100, margin: '0 auto' }}>
        <CircularProgressbar
          value={percentage}
          text={`${value}/${goal}`}
          styles={buildStyles({
            textColor: '#000',
            pathColor: 'orange',
            trailColor: '#eee',
          })}
        />
      </div>
      <button onClick={onIncrement} style={{ marginTop: 10 }}>
        {' '}
        +1 Day of Healthy Eating{' '}
      </button>
    </div>
  );
};

export default DietTracker;
