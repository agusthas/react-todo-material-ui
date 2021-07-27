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
  Avatar,
} from '@material-ui/core';
import { DeleteOutlined } from '@material-ui/icons';
import { blue, green, pink, yellow } from '@material-ui/core/colors';
import { INote } from '../types';

type NoteCardProps = {
  note: INote;
  handleDelete: (id: number) => void;
};

const useStyles = makeStyles<Theme, INote>(() =>
  createStyles({
    avatar: {
      backgroundColor: ({ category }) => {
        switch (category) {
          case 'work':
            return yellow[700];

          case 'money':
            return green[500];

          case 'todos':
            return pink[500];

          default:
            return blue[500];
        }
      },
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
      <Card elevation={1}>
        <CardHeader
          avatar={
            <Avatar className={classes.avatar}>
              {note.category[0].toUpperCase()}
            </Avatar>
          }
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
