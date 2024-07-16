import React, { useState } from 'react';
import { useRecoilState } from 'recoil';
import { tasksState } from '../recoil/atoms';
import { Dialog, DialogActions, DialogContent, DialogTitle, TextField, Button, Typography } from '@mui/material';

const TaskForm = ({ open, handleClose }) => {
  const [tasks, setTasks] = useRecoilState(tasksState);
  const [title, setTitle] = useState('');
  const [description, setDescription] = useState('');
  const [error, setError] = useState('');

  const handleAddTask = () => {
    if (title.trim() === '' || description.trim() === '') {
      setError('Both title and description are required.');
      return;
    }

    const newTask = {
      id: `${Date.now()}`,
      title,
      description,
    };

    setTasks({
      ...tasks,
      todo: [...tasks.todo, newTask],
    });

    // Clear form fields and error
    setTitle('');
    setDescription('');
    setError('');
    handleClose();
  };

  return (
    <Dialog open={open} onClose={handleClose}>
      <DialogTitle>Add New Task</DialogTitle>
      <DialogContent>
        <TextField
          autoFocus
          margin="dense"
          label="Task Title"
          type="text"
          fullWidth
          value={title}
          onChange={(e) => setTitle(e.target.value)}
          error={!!error}
          helperText={error && title.trim() === '' ? 'Title is required.' : ''}
        />
        <TextField
          margin="dense"
          label="Task Description"
          type="text"
          fullWidth
          value={description}
          onChange={(e) => setDescription(e.target.value)}
          error={!!error}
          helperText={error && description.trim() === '' ? 'Description is required.' : ''}
        />
        {error && (
          <Typography color="error" variant="body2" style={{ marginTop: '10px' }}>
            {error}
          </Typography>
        )}
      </DialogContent>
      <DialogActions>
        <Button onClick={handleClose} color="primary">
          Cancel
        </Button>
        <Button onClick={handleAddTask} color="primary">
          Add
        </Button>
      </DialogActions>
    </Dialog>
  );
};

export default TaskForm;
