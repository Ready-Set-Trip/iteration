import React from 'react';
import { CircularProgressbar, buildStyles } from 'react-circular-progressbar';
import 'react-circular-progressbar/dist/styles.css';

interface ProgressCircleProps {
  value: number; 
  label: string;
  color?: string; 
}

const ProgressBar: React.FC<ProgressCircleProps> = ({ value, label, color = '#3e98c7' }) => {
    return (
        <div style={{ width: 100, margin: 10 }}> 
          <CircularProgressbar
            value={value}
            text={`${value}%`}
            styles={buildStyles({
                textColor: '#000',
                pathColor: color,
                trailColor: 'eee', 
            })}
          /> 
          <div style={{ textAlign: 'center', marginTop: '8px' }}>{label}</div>
        </div>
    );
};

export default ProgressBar; 
