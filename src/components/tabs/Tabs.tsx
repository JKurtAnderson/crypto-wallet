import React, { useState } from "react";
import Tab from "./Tab";
import TabsPanel from "./TabsPanel";
import './Tabs.css';
import { MenuItem } from "../menu/Menu";


interface TabsProps {
	defaultActiveIndex: number;
	type: 'vertical' | 'horizontal';
	options?: MenuItem[];
	children: React.ReactNode;
}

export default function Tabs({ defaultActiveIndex, type, children, ...rest }: TabsProps) {
	const [activeTab, setActiveTab] = useState(defaultActiveIndex);

	return (
		<div className={`tabs ${type}`}>
			<TabsPanel
				tabChangedCallback={setActiveTab}
				activeIndex={activeTab}
				tabs={React.Children.toArray(children).filter((child: any) => {
					return (child as JSX.Element)?.type.name === Tab.name;
				}).map((child: any) => {
					return <>
						{(child as JSX.Element).props.header.icon}
						<span>{(child as JSX.Element).props.header.label}</span>
					</>;
				})}
				{...rest}/>
			<div className='tabs-content'>
				{React.Children.map(children, (child, i) => i === activeTab ? child : null)}
			</div>
		</div>
	)
}