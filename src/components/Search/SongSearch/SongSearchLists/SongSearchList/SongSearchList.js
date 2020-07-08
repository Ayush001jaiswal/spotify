import React from 'react';
import './SongSearchList.css';
import { Button, Container, Row, Col } from 'react-bootstrap';
import moment from 'moment';


const songSearchList = props => {
	
    const imageUrl = props.SongSearchList.artworkUrl100;
    const formattedDate = moment(props.SongSearchList.releaseDate).format('DD MMM YY');

    return (
        <div className="songSearchList">
            <Container>
                <Row> 
                    { imageUrl ?
                        <Col>
                            <img 
                                onClick={props.playSong} 
                                src={imageUrl} 
                                alt="" 
                                style={{width: '90%' }} 
                            />
                        </Col>
                    : '' }
                </Row>    
                <Row>     
                    <Col>
                        <Button variant="primary" className="mr-2" onClick={props.addToFavouriteList} > Favourite List </Button>
                    </Col>  
                </Row>
             </Container>
        </div>
    );
}

export default songSearchList;





