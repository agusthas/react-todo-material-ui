import React, { useState, useEffect } from 'react';
import axios from 'axios';
import { Container, makeStyles } from '@material-ui/core';
import Masonry from 'react-masonry-css';
import { INote } from '../types';
import { NoteCard } from '../components/NoteCard';

const useStyles = makeStyles({
  masonryGrid: {
    display: 'flex',
    marginLeft: '-30px',
    width: 'auto',
  },
  masonryGridColumn: {
    paddingLeft: 30,
    backgroundClip: 'padding-box',
    '& > div': {
      marginBottom: 30,
    },
  },
});

export const Notes = (): JSX.Element => {
  const classes = useStyles();
  const [notes, setNotes] = useState<INote[]>([]);

  useEffect(() => {
    axios.get<INote[]>('/notes').then((response) => setNotes(response.data));
  }, []);

  const handleDelete = async (id: number) => {
    await axios.delete(`/notes/${id}`);

    const filteredNotes = notes.filter((note) => note.id !== id);
    setNotes(filteredNotes);
  };

  // breakpoints for masonry
  const breakpoints = {
    default: 3,
    1100: 2,
    700: 1,
  };

  return (
    <Container>
      <Masonry
        breakpointCols={breakpoints}
        className={classes.masonryGrid}
        columnClassName={classes.masonryGridColumn}
      >
        {notes.map((note) => (
          <div key={note.id}>
            <NoteCard note={note} handleDelete={handleDelete} />
          </div>
        ))}
      </Masonry>
    </Container>
  );
};
