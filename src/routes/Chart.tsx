import { useQuery } from 'react-query';
import { useParams } from 'react-router-dom';
import { fetchCoinHistory } from './api';
import ApexChart from 'react-apexcharts';

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
	const { isLoading, data } = useQuery<IHistorical[]>(['ohlcv', coinId], () => fetchCoinHistory(coinId));
	// const params = useParams();
	// console.log(params);
	return (
		<div>
			{isLoading ? (
				'Loading chart...'
			) : (
				<ApexChart
					type="line"
					series={[{ name: 'Price', data: data?.map(price => price.close) ?? [] }]}
					options={{
						chart: {
							height: 300,
							width: 500,
							toolbar: {
								show: false
							},
							background: 'transperent'
						},
						grid: {
							show: false
						},
						theme: {
							mode: 'dark'
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
							labels: { show: false }
						}
					}}
				/>
			)}
		</div>
	);
}

export default Chart;
