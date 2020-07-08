import React from 'react';
import './FavouriteLists.css'; 
import FavouriteList from './FavouriteList/FavouriteList'

const favouriteLists = props => {
	console.log('myFavouriteList', props.myFavouriteList);
	const favouriteListSongs = props.myFavouriteList.map((items, key) => {
		return( 
			<FavouriteList 
				key = {key} 
				removeFavouriteSong = {props.removeFavouriteSong.bind(this, items)} 
				playSong = {props.playSong.bind(this, items)} 
				sendFavouriteList = { items }  
			/>
		);
	}); 

	return (
		<div className="favouriteLists">
			 { favouriteListSongs }
		</div>
	);
}
export default favouriteLists;