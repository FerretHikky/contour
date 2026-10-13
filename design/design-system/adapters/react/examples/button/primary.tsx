"use client";

import { Button } from "@reflower/core-ui-react";
import "@reflower/core-ui-react/typography.css";
import "@reflower/core-ui-react/tokens.css";
import "@reflower/core-ui-react/styles.css";

export interface PrimaryButtonExampleProps {
  label: string;
  onClick: () => void;
}

export function PrimaryButtonExample({
  label,
  onClick,
}: PrimaryButtonExampleProps) {
  return (
    <Button variant="primary" onClick={onClick}>
      {label}
    </Button>
  );
}
