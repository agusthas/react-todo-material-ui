import React, { useState, useEffect } from 'react';
import axios from 'axios';
import { Container, Grid } from '@material-ui/core';
import { INote } from '../types';
import { NoteCard } from '../components/NoteCard';

export const Notes = (): JSX.Element => {
  const [notes, setNotes] = useState<INote[]>([]);

  useEffect(() => {
    axios.get<INote[]>('/notes').then((response) => setNotes(response.data));
  }, []);

  const handleDelete = async (id: number) => {
    await axios.delete(`/notes/${id}`);

    const filteredNotes = notes.filter((note) => note.id !== id);
    setNotes(filteredNotes);
  };

  return (
    <Container>
      <Grid container spacing={3}>
        {notes.map((note) => (
          <Grid key={note.id} item xs={12} md={6} lg={4}>
            <NoteCard note={note} handleDelete={handleDelete} />
          </Grid>
        ))}
      </Grid>
    </Container>
  );
};
