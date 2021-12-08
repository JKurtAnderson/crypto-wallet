import { defaultSpan } from '../components/graph/graph-config';
import Coin from '../models/portfolio/Coin'
import HistoricValue from '../models/portfolio/HistoryValue'
import { getClient } from '../web/client/PortfolioClient'

export class PortfolioController {
	private static _instance: PortfolioController;
	private coins: Coin[];
	private histories: Map<string, Map<string, HistoricValue[]>> = new Map();
	private currentWallet: Map<string, number> = new Map();
	
	static async getInstance() {
		if (!this._instance) {
			const controller = new PortfolioController();
			const coins = await getClient().getCoins();
			controller.coins = coins.map(coinEntry => coinEntry.coin);
			for (const coinEntry of coins) {
				controller.currentWallet.set(coinEntry.coin.key, coinEntry.amount);
				controller.histories.set(coinEntry.coin.key, new Map());
				controller.histories.get(coinEntry.coin.key)?.set(defaultSpan, await getClient().getHistoricValues(coinEntry.coin.key, defaultSpan));
			}
			this._instance = controller;
		}
		return this._instance;
	}

	constructor() {
		this.coins = [];
	}

	public async setHistoricValues(span: string) {
		const promises: Promise<any>[] = [];
		for (const coin of this.coins) {
			if (this.histories.get(coin.key)?.get(span) === undefined) {
				const promise = async () => {
					const data = await getClient().getHistoricValues(coin.key, span);
					this.histories.get(coin.key)?.set(span, data);
				};
				promises.push(promise());
			}
		}
		await Promise.all(promises);
	}

	public getCoins() {
		return [...this.coins];
	}

	public getWalletAmount(coin: string) {
		return this.currentWallet.get(coin)
	}

	public getGraphData(coins: string[], span: string) {
		if (coins.length <= 0) {
			coins = this.coins.map(coin => coin.key);
		}
		const result: HistoricValue[] = [];
		for (const coin of coins)  {
			const histories = this.histories.get(coin)?.get(span);
			if (histories !== undefined) {
				for (let i = 0; i < histories?.length; i++) {
					if (result[i] === undefined) {
						result.push({...histories[i], value: histories[i].value * (this.currentWallet.get(coin) || 0)});
					}
					else {
						result[i].value += histories[i].value * (this.currentWallet.get(coin) || 0);
					}
				}
			}
			return result;
		}
	}

	public calculateCurrentWorth(coin: string): number {
		const histories = this.histories.get(coin)?.get(defaultSpan);
		if (histories) {
			return histories[histories.length - 1].value * (this.currentWallet.get(coin) || 0);
		}
		return 0;
	}

	public calculateBalance(coins: string[]) {
		if (coins.length <= 0) {
			coins = this.coins.map(coin => coin.key);
		}
		return coins.map(coin => this.calculateCurrentWorth(coin)).reduce((a, b) => a + b);
	}
}
