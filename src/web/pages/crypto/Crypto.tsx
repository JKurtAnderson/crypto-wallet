import React from "react";
import Tab from "../../../components/tabs/Tab";
import Tabs from "../../../components/tabs/Tabs";
import Portfolio from "./tabs/portfolio/Portfolio";
import { ReactComponent as LockIcon } from '../../../icons/lock.svg'
import { ReactComponent as SettingsIcon } from '../../../icons/settings.svg'

export default function Crypto() {
	return (
		<div className="Crypto">
			<Tabs defaultActiveIndex={0} type='vertical' options={[
				{
					icon: <LockIcon />,
					label: 'Lock Crypto Wallet',
					callback: () => {},
				},
				{
					icon: <SettingsIcon />,
					label: 'Settings',
					callback: () => {},
				},
			]}>
				<Tab header={{ label: 'Portfolio' }}><Portfolio/></Tab>
				<Tab header={{ label: 'Prices' }}>Hello prices</Tab>
				<Tab header={{ label: 'DeFi' }}>Hello DeFi</Tab>
				<Tab header={{ label: 'NFTs' }}>Hello NFTs</Tab>
				<Tab header={{ label: 'Accounts' }}>Hello accounts</Tab>
			</Tabs>
		</div>
	);
}