import React, {Component} from 'react';
import './Home.css';
import axios from 'axios';
import {Link, Route, Switch, Redirect} from 'react-router-dom';
import SongSearch from '../../components/Search/SongSearch/SongSearch';
import SongSearchLists from '../../components/Search/SongSearch/SongSearchLists/SongSearchLists';
import FavouriteLists from '../../components/FavouriteLists/FavouriteLists';
import Signup from '../Signup/Signup';
import Login from '../../components/Login/Login';
import ResetPassword from '../../components/ResetPassword/ResetPassword';

class Home extends Component {

	constructor(props) {
		super(props);
		this.searchInput = React.createRef();

		this.state = {
			searchResults: [],
			succees: false,
			currentSongs: '',
			message: false,
			favouriteList:[],
			usersData: [],
			isPlay: false,
			authuser:'',
			authFlag: false
		};
	}

	sendUserDataToHome = (obj) => {
      const newUserData = [ ...this.state.usersData ];
      newUserData.push(obj);
      this.setState({userData: newUserData});
	}

	playSongHandler = (song) => {
	
		if(this.state.authuser) {
			if(this.state.currentSongs == '' || (this.state.currentSongs === song.previewUrl)) {
				this.setState({currentSongs: song.previewUrl, isPlay:!this.state.isPlay, message: false})
			}  
			else if(this.state.isPlay === true && this.state.message == false) {
				this.setState({message: true, currentSongs: song.previewUrl});
			} else {
			  this.setState({currentSongs: song.previewUrl, isPlay:!this.state.isPlay, message: false})
			}
		} else {
			this.setState({authFlag: true});
			
			setTimeout(() => {
    			this.setState({authFlag: false});	
  			}, 5000)
			
		}
	}

	songSearchHandler = (e) => {
		const seachItem = this.searchInput.current.value; 
	    axios.get('https://itunes.apple.com/search?term=' + seachItem)
	    .then((response) => { 
	    	this.setState({searchResults: response.data.results, succees: true});
	    })
	    .catch((error) => { 
	    	this.setState({error: true});
	    });
	}

	addToFavouriteList = (favSong) => {
		const favouriteList  = [ ...this.state.favouriteList ];
		if(this.state.authuser) {
			if(favouriteList.indexOf(favSong) === -1) {
				favouriteList.push(favSong);
				this.setState({favouriteList: favouriteList});
			}
		} else {
			this.setState({authFlag: true});
			setTimeout(() => {
    			this.setState({authFlag: false});	
  			}, 5000)
		}
	}

	removeFavouriteSong = (removeSong) => {
		const removeSongs =	removeSong.previewUrl;
		const favouriteSongList = [ ...this.state.favouriteList ];
		const newFavourateList = favouriteSongList.filter(song => song.previewUrl !==  removeSongs);
		this.setState({favouriteList: newFavourateList});	
	}

	sendUsernameToHome = (user) => {
		this.setState({authuser:user});;
	}
		
  	render() {
  		console.log('authuser', this.state.authuser);
  		return (
	  		<div className="Home">
	  			<div className="Navbar">
					<Link className="active" to="/">Home</Link>
					<Link className="active" to="/favourite">Favourite List</Link>
					<Route path="/" exact>
						<SongSearch 
							searchInput={this.searchInput} 
							songSearchHandler={this.songSearchHandler} 
						/>
					</Route>
					{this.state.authuser ?
					'' :
					<>
					<Link className="active" to="/signup">SIGN UP</Link>
					<Link className="active" to="/login">LOG IN</Link> 
					</>
					}
				</div>

				{this.state.authFlag ? 
					(<p style={{ color:'red' }}> Please login First </p>) : null
				}

				{this.state.message ? 
					( <p style={{ color:'red' }}> Please first stop the previous audio </p> ) : 
					this.state.authuser ? (

					this.state.isPlay ? ( 
					        <audio id="myAudio" controls autoPlay="autoplay">
		 				    <source src={this.state.currentSongs} type="audio/mpeg" />
		 				    </audio> ) 
		 				: null
				    ) : ''
				}    
				
				<Route path="/" exact>
					<SongSearchLists 
					  	playSong={this.playSongHandler} 
						searchResults={this.state.searchResults}
						addToFavouriteList={this.addToFavouriteList} 
					/>
				</Route>
				
				{this.state.authuser ?
					<Route path="/favourite">
						<FavouriteLists 
							removeFavouriteSong = {this.removeFavouriteSong} 
							playSong = {this.playSongHandler} 
							myFavouriteList = {this.state.favouriteList}  
						/>
					</Route>
				: ''}

				<Route path="/signup">
					<Signup sendUserDataToHome={this.sendUserDataToHome} />
				</Route>

				<Route path="/login">
					<Login
					sendUsernameToHome={this.sendUsernameToHome} 
					userData = {this.state.userData } />
				</Route>

				<Route path="/reset-password">
					<ResetPassword />
				</Route>				
				
	  		</div>
	  	);	
  	}
}

export default Home;

