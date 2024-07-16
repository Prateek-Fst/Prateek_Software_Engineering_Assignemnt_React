import React from 'react';
import { useRecoilState, useRecoilValue } from 'recoil';
import { tasksState, searchState } from '../recoil/atoms';
import { DragDropContext, Droppable, Draggable } from 'react-beautiful-dnd';
import TaskCard from './TaskCard';
import AddTaskButton from './AddTaskButton';
import { Box, Grid, TextField } from '@mui/material';

const KanbanBoard = () => {
  const [tasks, setTasks] = useRecoilState(tasksState);
  const [search, setSearch] = useRecoilState(searchState);

  const onDragEnd = (result) => {
    const { source, destination } = result;
    if (!destination) return;

    // Destructure the columns to avoid direct state mutation
    const sourceColumn = Array.from(tasks[source.droppableId]);
    const destColumn = source.droppableId === destination.droppableId ? sourceColumn : Array.from(tasks[destination.droppableId]);

    const [movedTask] = sourceColumn.splice(source.index, 1);
    destColumn.splice(destination.index, 0, movedTask);

    setTasks(prevTasks => ({
      ...prevTasks,
      [source.droppableId]: sourceColumn,
      [destination.droppableId]: destColumn
    }));
  };

  const filteredTasks = (stage) => {
    return tasks[stage].filter(task => task.title.toLowerCase().includes(search.toLowerCase()));
  };

  return (
    <Box className="Kanban-board">
      <TextField
        variant="outlined"
        fullWidth
        placeholder="Search tasks..."
        onChange={(e) => setSearch(e.target.value)}
      />
      <DragDropContext onDragEnd={onDragEnd}>
        <Grid container spacing={2}>
          {['todo', 'in-progress', 'peer-review', 'done'].map((stage, index) => (
            <Grid item xs={12} sm={6} md={3} key={index}>
              <Box className="Kanban-column">
                <h3>{stage.replace('-', ' ').toUpperCase()}</h3>
                <Droppable droppableId={stage}>
                  {(provided) => (
                    <div ref={provided.innerRef} {...provided.droppableProps}>
                      {filteredTasks(stage).map((task, index) => (
                        <Draggable key={task.id} draggableId={task.id} index={index}>
                          {(provided) => (
                            <div ref={provided.innerRef} {...provided.draggableProps} {...provided.dragHandleProps}>
                              <TaskCard task={task} />
                            </div>
                          )}
                        </Draggable>
                      ))}
                      {provided.placeholder}
                    </div>
                  )}
                </Droppable>
              </Box>
            </Grid>
          ))}
        </Grid>
      </DragDropContext>
      <AddTaskButton />
    </Box>
  );
};

export default KanbanBoard;
