import {
  makeStyles,
  Button,
  Container,
  TextField,
  Typography,
  FormControl,
  FormLabel,
  RadioGroup,
  FormControlLabel,
  Radio,
} from '@material-ui/core';
import React, { useState } from 'react';
import { KeyboardArrowRight } from '@material-ui/icons';
import axios from 'axios';
import { useHistory } from 'react-router-dom';
import type { CategoryType, PostNote } from '../types';

const useStyles = makeStyles({
  field: {
    marginTop: 20,
    marginBottom: 20,
    display: 'block',
  },
});

export const Create = (): JSX.Element => {
  const classes = useStyles();

  const history = useHistory();

  const [title, setTitle] = useState(''); // state for title
  const [details, setDetails] = useState(''); // state for details
  const [category, setCategory] = useState<CategoryType>('todos'); // state for radio buttons
  const [titleError, setTitleError] = useState(false);
  const [detailsError, setDetailsError] = useState(false);

  const handleSubmit = (evt: React.FormEvent<HTMLFormElement>) => {
    evt.preventDefault();

    setTitleError(false);
    setDetailsError(false);

    if (title === '') {
      setTitleError(false);
    }
    if (details === '') {
      setDetailsError(true);
    }

    if (title && details) {
      const newNote: PostNote = {
        title,
        details,
        category,
      };

      axios.post('/notes', newNote).then(() => {
        history.push('/');
      });
    }
  };

  return (
    <Container>
      <Typography
        variant="h6"
        component="h2"
        color="textSecondary"
        gutterBottom
      >
        Create a New Note
      </Typography>

      <form noValidate autoComplete="off" onSubmit={handleSubmit}>
        <TextField
          value={title}
          onChange={(e) => setTitle(e.target.value)}
          className={classes.field}
          label="Note Title"
          variant="outlined"
          color="secondary"
          error={titleError}
          required
          fullWidth
        />
        <TextField
          value={details}
          onChange={(e) => setDetails(e.target.value)}
          className={classes.field}
          label="Details"
          variant="outlined"
          color="secondary"
          error={detailsError}
          required
          fullWidth
          multiline
          minRows={4}
        />

        <FormControl className={classes.field}>
          <FormLabel>Note Category</FormLabel>
          <RadioGroup
            value={category}
            onChange={(e) => setCategory(e.target.value as CategoryType)}
          >
            <FormControlLabel value="money" control={<Radio />} label="Money" />
            <FormControlLabel value="todos" control={<Radio />} label="Todos" />
            <FormControlLabel
              value="reminders"
              control={<Radio />}
              label="Reminders"
            />
            <FormControlLabel value="work" control={<Radio />} label="Work" />
          </RadioGroup>
        </FormControl>

        <Button
          type="submit"
          variant="contained"
          color="secondary"
          endIcon={<KeyboardArrowRight />}
        >
          Submit
        </Button>
      </form>
    </Container>
  );
};
