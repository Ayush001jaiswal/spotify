import React from 'react';
import './FavouriteLists.css'; 
import FavouriteList from './FavouriteList/FavouriteList'

const favouriteLists = props => {
	//console.log('myFavouriteList', props.myFavouriteList);
	const favouriteListSongs = props.myFavouriteList.map((items, key) => {
		return ( 
			<FavouriteList 
				key = {key} 
				removeFavouriteSong = {props.removeFavouriteSong.bind(this, items)} 
				playSong = {props.playSong.bind(this, items)} 
				sendFavouriteList = { items }  
			/>
		);
	}); 
	// const specificFavourateLists = props.accountSpecific.map((value, key) => {
	// 	value.map((items, id) => {
	// 		if(items === props.authuser) { //console.log('irrr', items.artworkUrl100);
	// 			return ( 
	// 				<FavouriteList 
	// 					key = {key} 
	// 					removeFavouriteSong = {props.removeFavouriteSong.bind(this, items)} 
	// 					playSong = {props.playSong.bind(this, items)} 
	// 					sendFavouriteList = { value }  
	// 				/>
	// 			)
	// 		}
	// 	})
	// });

	return (
		<div className="favouriteLists">
			 { favouriteListSongs }
			 {/* specificFavourateLists */}
		</div>
	);
}
export default favouriteLists;