import React, { useEffect, useState } from 'react';
import { Spinner } from 'react-bootstrap';
import Graph from '../../../../../components/graph/Graph';
import { defaultSpan, supportedTimeSpans } from '../../../../../components/graph/graph-config';
import SearchableList from '../../../../../components/searchable-list/SearchableList';
import { PortfolioController } from '../../../../../controllers/portfolio-controller';
import { ReactComponent as PlusIcon } from '../../../../../icons/plus.svg'
import Coin from '../../../../../models/portfolio/Coin';
import './Portfolio.css';
import 'bootstrap/dist/css/bootstrap.css';

const formatter = new Intl.NumberFormat('en-US', {
	style: 'currency',
	currency: 'USD',
});

export default function Portfolio() {
	const [selectedCoins, setSelectedCoins] = useState<string[]>([]);
	const [selectedSpan, setSelectedSpan] = useState(defaultSpan);
	const [controller, setController] = useState<PortfolioController | null>(null);

	useEffect(() => {
		PortfolioController.getInstance().then(controller => setController(controller));
	}, []);

	const mapCoin = (coin: Coin) => ({
		searchTerm: coin.label,
		element: <button
			className={`coin-item${selectedCoins.indexOf(coin.key) !== -1 ? ' selected' : ''}`}
			onClick={() => {
				if (selectedCoins.indexOf(coin.key) === -1) {
					setSelectedCoins([coin.key, ...selectedCoins]);
				}
				else {
					const newArry = [...selectedCoins];
					newArry.splice(selectedCoins.indexOf(coin.key), 1);
					setSelectedCoins(newArry);
				}
			}}
		>
			{coin.icon}
			<span className='coin-label'>{coin.label}</span>
			<div className='right'>
				<span className='value'>{formatter.format(controller?.calculateCurrentWorth(coin.key) || 0)}</span>
				<span className='amount'>{`${controller?.getWalletAmount(coin.key)} ${coin.key}`}</span>
			</div>
		</button>,
	});

	return (
		<div className='portfolio'>
			{controller ? <>
				<div className='top'>
					<div className='left'>
						<h3 className='balance-label'>Balance</h3>
						<span className='balance-amount'>{formatter.format(controller.calculateBalance(selectedCoins))}</span>
					</div>
					<div className='right'>
						<div className='graph-controls'>
							
							<button aria-label='Live'>
								<div className='dot' />
								LIVE
							</button>
							{supportedTimeSpans.map(timeSpan => <button
								key={timeSpan.key}
								aria-label=''
								onClick={async () => {
									await controller.setHistoricValues(timeSpan.key)
									setSelectedSpan(timeSpan.key);
								}}
								className={timeSpan.key === selectedSpan ? 'selected' : ''}>
									{timeSpan.label}
								</button>
							)}
						</div>
					</div>
				</div>

				<div className='middle'>
					<Graph seriesName='Portfolio' showTimes dataPoints={controller.getGraphData(selectedCoins, selectedSpan) || []} />
				</div>
				
				<div className='bottom'>
					<SearchableList items={
						controller.getCoins().map(mapCoin)
					} />
					<button className='add-coin'>
						<PlusIcon />
						<span>Add coin</span>
					</button>
				</div>
			</> :
			<div className='spinner'>
				<span className="visually-hidden">Loading...</span>
				<Spinner animation="grow" variant="primary" className='first' />
				<Spinner animation="grow" variant="secondary" className='second' />
				<Spinner animation="grow" variant="success" className='third' />
			</div>}
		</div>
	);
}