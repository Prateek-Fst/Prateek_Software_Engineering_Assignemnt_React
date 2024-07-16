import React from 'react';
import { Card, CardContent, Typography } from '@mui/material';
import './TaskCard.css';

const TaskCard = ({ task }) => {
  return (
    <Card variant="outlined" className="TaskCard" >
      <CardContent className="TaskCard-content" >
        <Typography variant="h6">{task.title}</Typography>
        <Typography variant="body2">{task.description}</Typography>
      </CardContent>
    </Card>
  );
};

export default TaskCard;
