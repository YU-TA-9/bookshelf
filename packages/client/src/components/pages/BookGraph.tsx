import * as React from 'react';
import { useRecoilValue } from 'recoil';
import { MainTemplate } from '../templates/MainTemplate';
import ReactApexCharts from 'react-apexcharts';
import { ApexOptions } from 'apexcharts';
import { selectedBooksPerCategory } from '../../states/selectors/book';
import { ParagraphHeaderText } from '../atoms/ParagraphHeaderText';
import { selectedBooksPerCreatedMonth } from '../../states/selectors/graph';
import { MAX_WIDTH_SP_NUMBER } from '../../styles/media';
import { css } from '@emotion/react';

const graphArea = css`
  margin-bottom: 16px;
`;

export const BookGraph = () => {
  const booksPerCategory = useRecoilValue(selectedBooksPerCategory);
  const booksPerCreatedMonth = useRecoilValue(selectedBooksPerCreatedMonth);

  React.useEffect(() => {
    console.log(booksPerCreatedMonth);
  }, [booksPerCreatedMonth]);

  const pieOptions: ApexOptions = {
    chart: {
      type: 'donut',
    },
    labels: booksPerCategory.map((e) => e.category.name),
    responsive: [
      {
        breakpoint: MAX_WIDTH_SP_NUMBER,
        options: {
          chart: {
            width: '100%',
          },
          legend: {
            position: 'bottom',
          },
        },
      },
    ],
    colors: booksPerCategory.map((e) => e.category.color),
    dataLabels: {
      formatter: (val, opts) => {
        return `${opts.w.config.series[opts.seriesIndex]}冊`;
      },
    },
    plotOptions: {
      pie: {
        donut: {
          labels: {
            show: true,
            value: {
              formatter: (val) => {
                return `${val}冊`;
              },
            },
            total: {
              show: true,
              label: '合計',
              formatter: (w) => {
                return `${w.globals.seriesTotals.reduce((a, b) => {
                  return a + b;
                }, 0)}冊`;
              },
            },
          },
        },
      },
    },
  };

  const barOptions: ApexOptions = {
    chart: {
      type: 'bar',
      toolbar: {
        tools: {
          download: false,
        },
      },
    },
    responsive: [
      {
        breakpoint: MAX_WIDTH_SP_NUMBER,
        options: {
          chart: {
            width: '100%',
          },
          legend: {
            position: 'bottom',
          },
        },
      },
    ],
    yaxis: {
      labels: {
        formatter: (value) => {
          return String(Number(value));
        },
      },
    },
    tooltip: {
      marker: {
        show: false,
      },
      x: {},
      y: {
        formatter: (val, opts) => {
          return `${val}（冊）`;
        },
        title: {
          formatter: (seriesName) => {
            return null;
          },
        },
      },
    },
  };

  return (
    <MainTemplate title="グラフ">
      <ParagraphHeaderText>内訳</ParagraphHeaderText>
      <div css={graphArea}>
        <ReactApexCharts
          options={pieOptions}
          series={booksPerCategory.map((e) => e.books.length)}
          type="donut"
          width={400}
          height={400}
        />
      </div>
      <ParagraphHeaderText>月毎の登録数</ParagraphHeaderText>
      <div css={graphArea}>
        <ReactApexCharts
          options={barOptions}
          series={[
            {
              name: '月の冊数',
              data: booksPerCreatedMonth.map((e) => {
                return { x: e.date, y: e.books.length };
              }),
            },
          ]}
          type="bar"
          width={400}
          height={400}
        />
      </div>
    </MainTemplate>
  );
};
