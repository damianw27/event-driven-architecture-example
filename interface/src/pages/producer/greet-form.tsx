import {
  FormControl,
  Input,
  InputLabel,
} from '@mui/material';
import React, { ReactElement, useState } from 'react';
import { LoadingButton } from '@mui/lab';

interface GreetFormProps {
  loading: boolean;
  // eslint-disable-next-line no-unused-vars
  onSubmit: (name: string) => void;
}

export default function GreetForm({ loading, onSubmit }: GreetFormProps): ReactElement {
  const [name, setName] = useState<string>('');

  return (
    <>
      <FormControl fullWidth>
        <InputLabel htmlFor="my-input">Your name</InputLabel>
        <Input
          value={name}
          onChange={(event) => setName(event.target.value)}
          id="my-input"
          aria-describedby="my-helper-text"
          disabled={loading}
        />
      </FormControl>
      <div style={{ paddingTop: '1.5em' }}>
        <LoadingButton
          onClick={() => onSubmit(name)}
          variant="contained"
          type="button"
          fullWidth
          loading={loading}
        >
          Greet With Server
        </LoadingButton>
      </div>
    </>
  );
}
