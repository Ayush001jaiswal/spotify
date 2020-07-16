import React from 'react';
import { Button, Container, Row, Col } from 'react-bootstrap';
import './FavouriteList.css'; 

const favouriteList = props => {
	
	const imageUrl = props.sendFavouriteList.artworkUrl100;
	//console.log(props.sendFavouriteList);
	return (
		<div className="favouriteList">
			<Container>
                	<Row>
						<Col>
							<img 
								onClick={props.playSong} 
								src={imageUrl} 
								alt="" 
								style={{width: '90%' }} 
							/>
						</Col>
					</Row>
				
					<Row>     
                    	<Col>
                    		<Button variant="danger" className="mr-2" onClick={props.removeFavouriteSong}> Remove </Button>
                    	</Col>  
                	</Row>
		    </Container>
		</div>
		
	);
}
export default favouriteList;