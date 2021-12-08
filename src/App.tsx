import Tab from "./components/tabs/Tab";
import Tabs from "./components/tabs/Tabs";
import Crypto from './web/pages/crypto/Crypto';
import Rewards from './web/pages/rewards/Rewards';
import Cards from './web/pages/cards/Cards';
import {ReactComponent as CryptoLogo} from './icons/crypto.svg'
import {ReactComponent as RewardsLogo} from './icons/rewards.svg'
import {ReactComponent as CardsLogo} from './icons/cards.svg'

import './App.css';

function App() {
	return (
		<div className="App">
			<Tabs defaultActiveIndex={0} type='horizontal'>
				<Tab header={{ label: 'Crypto', icon: <CryptoLogo /> }}><Crypto /></Tab>
				<Tab header={{ label: 'Rewards', icon: <RewardsLogo /> }}><Rewards /></Tab>
				<Tab header={{ label: 'Cards', icon: <CardsLogo /> }}><Cards /></Tab>
			</Tabs>
		</div>
	);
}

export default App;
