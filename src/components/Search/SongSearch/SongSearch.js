import React from 'react';
import './SongSearch.css';


const songSearch = props => (
	<div className="songSearch">
	    <div className="searchContainer">
		    <form>
				<input 
					onKeyPress={props.songSearchHandler} 
					type="text" ref={props.searchInput} 
					placeholder="Search.." 
				/>
			</form>	
		</div>
	</div>
);

export default songSearch;