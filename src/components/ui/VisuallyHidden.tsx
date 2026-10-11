import styled from "styled-components";

// Read by screen readers but not shown, e.g. a warning that a link opens a new tab
export const VisuallyHidden = styled.span`
  position: absolute;
  width: 1px;
  height: 1px;
  overflow: hidden;
  clip-path: inset(50%);
  white-space: nowrap;
`;
