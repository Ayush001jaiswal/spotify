import React from 'react';
import './SongSearchLists.css';
import SongSearchList from './SongSearchList/SongSearchList';


const songSearchLists = props => {
	 
	const serachLists = props.searchResults.map((items, key) => {
		return ( 
			<SongSearchList 
				playSong = { props.playSong.bind(this, items) } 
				addToFavouriteList = { props.addToFavouriteList.bind(this, items) }
				key={key} 
				SongSearchList={items}
			/>
		);
	});

	return(
		<div className="songSearchLists">
			{ serachLists }
		</div>
	);
}	

export default songSearchLists;





