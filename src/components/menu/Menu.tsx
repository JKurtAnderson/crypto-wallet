
import React from 'react';
import { useState } from 'react';
import './Menu.css';

export interface MenuItem {
	icon: JSX.Element;
	label: string;
	callback: () => void;
}

interface MenuProps {
	items: MenuItem[];
	children: React.ReactNode;
}

// TODO: Implement focus trap
export default function Menu({ items, children }: MenuProps) {
	const [open, setOpen] = useState(false);
	const divRef = React.createRef<HTMLDivElement>();

	const menuItems = items.map((item, i) => 
		<button
			key={i}
			onClick={() => {
				setOpen(false);
				item.callback();
			}}
			className='menu-item'>
			{item.icon}
			<span>{item.label}</span>
		</button>);

	return (
		<>
			<button
				className='menu-button'
				onClick={(e: React.MouseEvent) => {
					if (divRef.current) {
						divRef.current.style.right = `${window.innerWidth - (e.currentTarget as any).getBoundingClientRect().left}px`;
						divRef.current.style.top = `${(e.currentTarget as any).getBoundingClientRect().top}px`;
						setOpen(true);
					}
				}}>
					{children}
			</button>
			<div
				className={`overlay ${open ? 'show' : ''}`}
				onClick={() => setOpen(false)}
			/>
			<div
				ref={divRef}
				className={`menu ${open ? 'show' : ''}`}
				role='menu'>
					{menuItems}
			</div>
		</>
	);
}