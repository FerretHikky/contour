"use client";

import { Button } from "@reflower/core-ui-react";
import "@reflower/core-ui-react/typography.css";
import "@reflower/core-ui-react/tokens.css";
import "@reflower/core-ui-react/styles.css";

export interface TertiaryButtonExampleProps {
  label: string;
  onClick: () => void;
}

export function TertiaryButtonExample({
  label,
  onClick,
}: TertiaryButtonExampleProps) {
  return (
    <Button variant="tertiary" onClick={onClick}>
      {label}
    </Button>
  );
}
