import SearchBar from "material-ui-search-bar";
import { useState } from "react";
import './SearchableList.css'

interface SearchableListItem {
	element: JSX.Element;
	searchTerm: string;
}

interface SearchableListProps {
	items: SearchableListItem[];
}

export default function SearchableList({ items }: SearchableListProps) {
	const [searchTerm, setSearchTerm] = useState('');

	return (
		<div className='searchable-list'>
			<SearchBar 
				value={searchTerm}
				onChange={setSearchTerm}
				onCancelSearch={() => setSearchTerm('')}
				placeholder='Search Coins'
				classes={{
					root: 'searchbar',
					searchContainer: 'search-container',
					iconButton: 'icon-button',
					searchIconButton: 'search-icon',
					input: 'search-input',
				}}
			/>
			<div className='list'>
				{items
					.filter(item => item.searchTerm.toLowerCase().indexOf(searchTerm.toLowerCase()) !== -1)
					.map((item, i) => <div className='list-item' key={i}>
						{item.element}
					</div>)}
			</div>
		</div>
	);
}