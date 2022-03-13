import React, { ReactElement, useRef, useState } from 'react';
import { FormControl, Input, InputLabel } from '@mui/material';
import { LoadingButton } from '@mui/lab';

interface MessageFormProps {
  loading: boolean;
  // eslint-disable-next-line no-unused-vars
  onSubmit: (message: string) => void;
}

export default function MessageForm({ loading, onSubmit }: MessageFormProps): ReactElement {
  const [message, setMessage] = useState<string>('');
  const messageRef = useRef<HTMLInputElement>(null);

  function handleOnSubmit() {
    const tmpMessage = message;
    setMessage('');
    onSubmit(tmpMessage);

    if (messageRef === null || messageRef.current === null) {
      return;
    }

    messageRef.current.focus();
  }

  return (
    <>
      <FormControl fullWidth>
        <InputLabel htmlFor="my-input">Message</InputLabel>
        <Input
          value={message}
          onChange={(event) => setMessage(event.target.value)}
          id="my-input"
          aria-describedby="my-helper-text"
          disabled={loading}
          ref={messageRef}
        />
      </FormControl>
      <div style={{ paddingTop: '1.5em' }}>
        <LoadingButton
          onClick={() => handleOnSubmit()}
          variant="contained"
          type="button"
          fullWidth
          loading={loading}
        >
          Send Message
        </LoadingButton>
      </div>
    </>
  );
}
