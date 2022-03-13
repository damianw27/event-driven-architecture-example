import React, { ReactElement } from 'react';

interface HeaderProps {
  title: string;
  message: string;
}

export default function Header({ title, message }: HeaderProps): ReactElement {
  return (
    <>
      <h3>{title}</h3>
      <p>{message}</p>
    </>
  );
}
