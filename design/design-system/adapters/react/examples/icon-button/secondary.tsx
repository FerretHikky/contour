"use client";

import { IconButton } from "@reflower/core-ui-react";
import "@reflower/core-ui-react/typography.css";
import "@reflower/core-ui-react/tokens.css";
import "@reflower/core-ui-react/styles.css";

export function SecondaryIconButtonExample({ label, onClick }: { label: string; onClick: () => void }) {
  return <IconButton variant="secondary" icon="pencil" label={label} onClick={onClick} />;
}
