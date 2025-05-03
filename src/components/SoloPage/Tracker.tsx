import React from 'react';
import { CircularProgressbar, buildStyles } from 'react-circular-progressbar';
import 'react-circular-progressbar/dist/styles.css';

interface TrackerProps {
  habit: string;
  value: number;
  goal: number;
  onIncrement: () => void;
}

// TODO: do we want to pass a color prop? Could be done if we implement custom trackers
// since the first step is just hardcoding the props
// OR we could have some right-clickable option to change the color 
// Props passed down from the parent component: Solo Page
const WorkoutTracker: React.FC<TrackerProps> = ({ habit, value, goal, onIncrement }) => {
  const percentage = Math.min((value / goal) * 100, 100);

  return (
    <div style={{ margin: 20, textAlign: 'center' }}>
      <h3>{habit}</h3>
      <div style={{ width: 100, margin: '0 auto' }}>
        <CircularProgressbar
          value={percentage}
          text={`${value}/${goal}`}
          styles={buildStyles({
            textColor: '#000',
            pathColor: 'slateblue',
            trailColor: '#eee',
          })}
        />
      </div>
      <button onClick={onIncrement} style={{ marginTop: 10 }}>
        +1 {habit}
      </button>
    </div>
  );
};

export default WorkoutTracker;
