import { css } from '@emotion/react';

export const markdownStyle = css`
  ul,
  ol {
    padding: 0 0 0 40px;
  }
  li {
    list-style-type: inherit;
  }

  table,
  td,
  th {
    border-collapse: collapse;
    border: 1px solid #e4e4e4;
    padding: 8px;
  }

  table {
    margin: 16px 16px;
  }

  th {
    font-weight: bold;
  }
`;
