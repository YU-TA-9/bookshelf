import * as React from 'react';
import { useRecoilValue } from 'recoil';
import { MainTemplate } from '../templates/MainTemplate';
import ReactApexCharts from 'react-apexcharts';
import { ApexOptions } from 'apexcharts';
import { selectedBooksPerCategory } from '../../states/selectors/book';
import { ParagraphHeaderText } from '../atoms/ParagraphHeaderText';

export const BookGraph = () => {
  const booksPerCategory = useRecoilValue(selectedBooksPerCategory);
  const [options, setOptions] = React.useState<ApexOptions>({
    chart: {
      type: 'donut',
    },
    labels: booksPerCategory.map((e) => e.category.name),
    responsive: [
      {
        // TODO: 後で調整
        breakpoint: 480,
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
  });

  const [series, setSeries] = React.useState(
    booksPerCategory.map((e) => e.books.length),
  );

  return (
    <MainTemplate title="グラフ">
      <ParagraphHeaderText>内訳</ParagraphHeaderText>
      <div>
        <ReactApexCharts
          options={options}
          series={series}
          type="donut"
          width={400}
          height={400}
        ></ReactApexCharts>
      </div>
    </MainTemplate>
  );
};
