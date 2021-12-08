import { ReactComponent as ThreeDotIcon } from '../../icons/three-dot.svg'
// import { Dropdown, DropdownButton } from 'react-bootstrap';
import React from 'react';
import Menu, { MenuItem } from '../menu/Menu';

interface TabsPanelProps {
	activeIndex: number;
	tabs: JSX.Element[];
	options?: MenuItem[];
	tabChangedCallback: (selectedIndex: number) => void;
}

export default function TabsPanel({ activeIndex, tabs, options, tabChangedCallback }: TabsPanelProps) {
	return (
		<div className='tabs-panel'>
			{tabs.map((tab, i) => (
				<button
					className={`tabs-panel-button${i === activeIndex ? ' selected' : ''}`}
					onClick={() => tabChangedCallback(i)}
					key={i}>
						{tab}
				</button>
			))}
			{(options && (options.length > 0)) ? 
			<div className='right'>
				<Menu items={options} >
					<ThreeDotIcon />
				</Menu>
			</div> : null}
		</div>
	);
}