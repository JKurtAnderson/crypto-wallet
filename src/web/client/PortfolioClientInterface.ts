import Coin from "../../models/portfolio/Coin";
import HistoricValue from "../../models/portfolio/HistoryValue";

export default interface PortfolioClientInterface {
	getCoins: () => Promise<{ coin: Coin, amount: number }[]>;
	getHistoricValues: (key: string, span: string) => Promise<HistoricValue[]>;
}
