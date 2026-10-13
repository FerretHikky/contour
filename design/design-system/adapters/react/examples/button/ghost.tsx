"use client";

import { Button } from "@reflower/core-ui-react";
import "@reflower/core-ui-react/typography.css";
import "@reflower/core-ui-react/tokens.css";
import "@reflower/core-ui-react/styles.css";

export interface GhostButtonExampleProps {
  label: string;
  onClick: () => void;
}

export function GhostButtonExample({
  label,
  onClick,
}: GhostButtonExampleProps) {
  return (
    <Button variant="ghost" onClick={onClick}>
      {label}
    </Button>
  );
}
