"use client";

import { Button } from "@reflower/core-ui-react";
import "@reflower/core-ui-react/typography.css";
import "@reflower/core-ui-react/tokens.css";
import "@reflower/core-ui-react/styles.css";

export interface DangerButtonExampleProps {
  label: string;
  onClick: () => void;
}

export function DangerButtonExample({
  label,
  onClick,
}: DangerButtonExampleProps) {
  return (
    <Button variant="danger" onClick={onClick}>
      {label}
    </Button>
  );
}
