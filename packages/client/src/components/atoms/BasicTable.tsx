import { css } from '@emotion/react';

type Props = {
  children: React.ReactNode;
};

const table = css`
  border-collapse: collapse;
  border-spacing: 0;
  width: 100%;
  table-layout: fixed;

  & tr {
    border-bottom: solid 1px #e4e4e4;
  }

  & > thead > tr > th {
    font-weight: 700;
  }

  & > tbody > tr {
    &:hover {
      background-color: #d4f0fd;
    }
  }

  & th,
  td {
    text-align: center;
    width: 25%;
    padding: 16px 0;
  }
`;

export const BasicTable = ({ children }: Props) => {
  return <table css={table}>{children}</table>;
};
