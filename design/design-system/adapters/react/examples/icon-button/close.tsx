"use client";

import { IconButton } from "@reflower/core-ui-react";
import "@reflower/core-ui-react/typography.css";
import "@reflower/core-ui-react/tokens.css";
import "@reflower/core-ui-react/styles.css";

export function CloseIconButtonExample({ label, onClick }: { label: string; onClick: () => void }) {
  return <IconButton variant="close" icon="close" label={label} onClick={onClick} />;
}
