"use client";

import { IconButton } from "@reflower/core-ui-react";
import "@reflower/core-ui-react/typography.css";
import "@reflower/core-ui-react/tokens.css";
import "@reflower/core-ui-react/styles.css";

export function GhostIconButtonExample({ label, onClick }: { label: string; onClick: () => void }) {
  return <IconButton variant="ghost" icon="left-arrow" label={label} onClick={onClick} />;
}
