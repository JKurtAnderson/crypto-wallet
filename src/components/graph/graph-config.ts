
import Span from '../../models/portfolio/Span'

export const supportedTimeSpans: Span[] = [
	{
		key: '1day',
		label: '1D',
		ariaLabel: '1 day',
	},
	{
		key: '1week',
		label: '1W',
		ariaLabel: '1 week',
	},
	{
		key: '1month',
		label: '1M',
		ariaLabel: '1 month',
	},
	{
		key: '3month',
		label: '3M',
		ariaLabel: '3 months',
	},
	{
		key: '1year',
		label: '1Y',
		ariaLabel: '1 year',
	},
	{
		key: 'all',
		label: 'All',
		ariaLabel: 'all',
	},
];

export const defaultSpan = '1day';
