import React from 'react';
import Card from '@material-ui/core/Card';
import CardHeader from '@material-ui/core/CardHeader';
import CardContent from '@material-ui/core/CardContent';
import {
  IconButton,
  Typography,
  Theme,
  makeStyles,
  createStyles,
} from '@material-ui/core';
import { DeleteOutlined } from '@material-ui/icons';
import { INote } from '../types';

type NoteCardProps = {
  note: INote;
  handleDelete: (id: number) => void;
};

const useStyles = makeStyles<Theme, INote>(() =>
  createStyles({
    test: {
      border: ({ category }) => (category === 'work' ? '1px solid red' : ''),
    },
  })
);

export const NoteCard = ({
  note,
  handleDelete,
}: NoteCardProps): JSX.Element => {
  const classes = useStyles(note);

  return (
    <div>
      <Card elevation={1} className={classes.test}>
        <CardHeader
          action={
            <IconButton onClick={() => handleDelete(note.id)}>
              <DeleteOutlined />
            </IconButton>
          }
          title={note.title}
          subheader={note.category}
        />
        <CardContent>
          <Typography variant="body2" color="textSecondary">
            {note.details}
          </Typography>
        </CardContent>
      </Card>
    </div>
  );
};
