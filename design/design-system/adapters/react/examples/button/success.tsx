"use client";

import { Button } from "@reflower/core-ui-react";
import "@reflower/core-ui-react/typography.css";
import "@reflower/core-ui-react/tokens.css";
import "@reflower/core-ui-react/styles.css";

export interface SuccessButtonExampleProps {
  label: string;
  onClick: () => void;
}

export function SuccessButtonExample({
  label,
  onClick,
}: SuccessButtonExampleProps) {
  return (
    <Button variant="success" onClick={onClick}>
      {label}
    </Button>
  );
}
