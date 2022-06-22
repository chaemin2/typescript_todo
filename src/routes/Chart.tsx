import { useQuery } from 'react-query';
import { useParams } from 'react-router-dom';
import { fetchCoinHistory } from './api';
import ApexChart from 'react-apexcharts';
import { useRecoilValue } from 'recoil';
import { isDarkAtom } from '../atom';

interface IHistorical {
	time_open: string;
	time_close: string;
	open: number;
	high: number;
	low: number;
	close: number;
	volume: number;
	market_cap: number;
}

interface ChartProps {
	coinId: string;
}
function Chart({ coinId }: ChartProps) {
	const { isLoading, data } = useQuery<IHistorical[]>(['ohlcv', coinId], () => fetchCoinHistory(coinId), {
		refetchInterval: 10000
	});

	const isDark = useRecoilValue(isDarkAtom);
	// const params = useParams();
	// console.log(params);
	return (
		<div>
			{isLoading ? (
				'Loading chart...'
			) : (
				<ApexChart
					type="line"
					series={[
						{
							name: 'Price',
							data: data?.map(price => price.close) ?? []
						}
					]}
					options={{
						chart: {
							height: 300,
							width: 500,
							toolbar: {
								show: false
							},
							background: 'transperent',
							type: 'candlestick'
						},
						grid: {
							show: false
						},
						theme: {
							mode: isDark ? 'dark' : 'light'
						},
						stroke: {
							curve: 'smooth',
							width: 3
						},
						yaxis: {
							show: false
						},
						xaxis: {
							axisBorder: {
								show: false
							},
							axisTicks: {
								show: false
							},
							labels: { show: false },
							type: 'datetime',
							categories: data?.map(price => price.time_close)
						},
						fill: {
							type: 'gradient',
							gradient: { gradientToColors: ['#0be881'], stops: [0, 100] }
						},
						colors: ['#0fbcf9'],
						tooltip: {
							y: {
								formatter: value => `$ ${value.toFixed(2)}`
							}
						}
					}}
				/>
			)}
		</div>
	);
}

export default Chart;
