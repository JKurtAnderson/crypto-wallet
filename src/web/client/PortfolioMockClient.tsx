import PortfolioClientInterface from "./PortfolioClientInterface";
import { ReactComponent as BATLogo } from '../../icons/bat.svg'
import { ReactComponent as ETHLogo } from '../../icons/eth.svg'
import { ReactComponent as BCLogo } from '../../icons/bnb.svg'
import { ReactComponent as BTCLogo } from '../../icons/btc.svg'

export function wait(ms: number) {
	return new Promise(resolve => setTimeout(resolve, ms));
}

const MockClient: PortfolioClientInterface = {
	getCoins: async () => {
		await wait(500);
		return [
			{
				coin: {
					key: 'BAT',
					label: 'Basic Attention Token',
					icon: <BATLogo />,
				},
				amount: 10037.9028,
			},
			{
				coin: {
					key: 'ETH',
					label: 'Ethereum',
					icon: <ETHLogo />,
				},
				amount: 0.31178,
			},
			{
				coin: {
					key: 'BNB',
					label: 'Binance Coin',
					icon: <BCLogo />,
				},
				amount: 0.4736,
			},
			{
				coin: {
					key: 'BTC',
					label: 'Bitcoin',
					icon: <BTCLogo />,
				},
				amount: 0.001012,
			},
		];
	},
	getHistoricValues: async (key: string, span: string) => {
		await wait(500);
		const data = await import(`../../mock-data/${key.toLowerCase()}/${key.toLowerCase()}-${span}.ts`);
		return (data.default as []).map(entry => ({date: new Date(entry[0]), value: entry[1]}));
	},
}

export default MockClient;