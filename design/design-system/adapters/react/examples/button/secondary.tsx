"use client";

import { Button } from "@reflower/core-ui-react";
import "@reflower/core-ui-react/typography.css";
import "@reflower/core-ui-react/tokens.css";
import "@reflower/core-ui-react/styles.css";

export interface SecondaryButtonExampleProps {
  label: string;
  onClick: () => void;
}

export function SecondaryButtonExample({
  label,
  onClick,
}: SecondaryButtonExampleProps) {
  return (
    <Button variant="secondary" onClick={onClick}>
      {label}
    </Button>
  );
}
