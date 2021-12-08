import ReactApexChart from 'react-apexcharts';

interface GraphProps {
	seriesName: string;
	showTimes: boolean;
	dataPoints: {
		value: number;
		date: Date;
	}[];
}

export default function Graph({ seriesName, showTimes, dataPoints }: GraphProps) {
	return (
		<ReactApexChart
				height={153}
				width={'100%'}
				options={{
					chart: {
					  zoom: {
						enabled: false
					  },
					  toolbar: {
						  show: false,
					  },
					},
					stroke: {
						curve: 'smooth',
						width: 2,
					},
					fill: {
						type: 'gradient',
						gradient: {
							type: 'diagonal1',
							opacityFrom: 1,
							opacityTo: 1,
							colorStops: [ 
								[
								  {
									offset: 0,
									color: '#F73A1C',
									opacity: 1
								  },
								  {
									offset: 50,
									color: '#BF14A2',
									opacity: 1
								  },
								  {
									offset: 100,
									color: '#6F4CD2',
									opacity: 1
								  }
								],
							  ],
						},
					},
					xaxis: {
						type: 'category',
						categories: dataPoints.map(dataPoint => dataPoint.date.toLocaleDateString() + ` ${showTimes ? dataPoint.date.toLocaleTimeString() : ''}`),
						tickAmount: dataPoints.length,
						labels: {
							show: false,
						},
						axisBorder: {
							show: false,
						},
						axisTicks: {
							show: false,
						},
						crosshairs: {
							show: false,
						},
						tooltip: {
							enabled: false,
						}
					},
					yaxis: {
						labels: {
							show: false,
						},
						crosshairs: {
							show: false,
						},
						decimalsInFloat: 2,
					},
					grid: {
						yaxis: {
							lines: {
								show: false,
							},
						},
					},
				}}
				series={[{
					name: seriesName,
					data: dataPoints.map(dataPoint =>dataPoint.value),
				}]}
			/>
	);
}