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
import { Overlay, Tooltip, Button } from 'react-bootstrap';

class Home extends Component {

	constructor(props) {
		super(props);
		this.searchInput = React.createRef();
		this.target = React.createRef();
		this.state = {
			searchResults: [],
			succees: false,
			currentSongs: '',
			message: false,
			favouriteList:[],
			usersData: [],
			isPlay: false,
			authuser:'',
			authFlag: false,
			isLogout: false,
			show: false,
			accountSpecific:[] 
		};
	}

	sendUserDataToHome = (userArr) => {
      const userName = userArr.username;
      //alert(userName)
      // const specificUserName = {
      // 	username:userName
      // }
      
      const newAccountSpecific = [ ...this.state.accountSpecific ] 
      const newUserData = [ ...this.state.usersData ];
      newAccountSpecific.push(userName);
       // userArr.map((value, key) => {
       // 	  newUserData.push(value);	
       // });
      newUserData.push(userArr);
      this.setState({usersData: newUserData, accountSpecific: newAccountSpecific});
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
		//const updateAccountSpecific  = [ ...this.state.accountSpecific ];
		if(this.state.authuser) {
			if(favouriteList.indexOf(favSong) === -1) {
				// updateAccountSpecific.map((value, key) => { console.log('val', value) 
				// 		if(value == localStorage.getItem("token")) {
				// 			 const favSongDetails = [
				// 			 	...favSong
				// 			 ]
				// 			 value.push(favSong)
				// 			// newValue = { ...value, favSong }
				// 			// console.log('newValue', newValue)
				// 			// updateAccountSpecific[key] = newValue;
				// 			// console.log('newV', updateAccountSpecific)
				// 			this.setState({accountSpecific: updateAccountSpecific}); 
				// 		}  		
				// });

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

	logOut = () => {
		localStorage.removeItem("token");
    	this.setState({
      		isLogout: true,
      		authuser: ''
    	});
	}

	sendUsernameToHome = () => {
		const authToken = localStorage.getItem("token")
		this.setState({authuser:authToken, isLogout: false});
	}

  	render() {
  		console.log('accountSpecific', this.state.accountSpecific)

  		// console.log('show', this.state.show)
	   //  console.log('target', this.target.current)
  		// console.log('logout', this.state.isLogout)
  		return (
	  		<div className="Home">
	  			<div className="Navbar">
					<Link className="active" to="/">Home</Link>
					{this.state.authuser ?
					<Link className="active" to="/favourite">Favourite List</Link>
					:  <Link ref={this.target} className="active" onClick={ () => this.setState({show: true})}  to="/favourite">Favourite List</Link> }
					
					<Route path="/" exact>
						<SongSearch 
							searchInput={this.searchInput} 
							songSearchHandler={this.songSearchHandler}
						/>
					</Route>
					{this.state.isLogout === true ? 
						<Redirect  to="/login" /> : ''
					}				

					{this.state.authuser ?
						<Link onClick={this.logOut} to="#">Log Out </Link> :
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
							//accountSpecific = {this.state.accountSpecific}
							//authuser = {localStorage.getItem("token")} 
						/>
					</Route>
				: ''}

				<Route path="/signup">
					<Signup sendUserDataToHome={this.sendUserDataToHome} />
				</Route>

				<Route path="/login">
					<Login
					sendUsernameToHome = {this.sendUsernameToHome}  
					userData = {this.state.usersData } />
				</Route>

				<Route path="/reset-password">
					<ResetPassword />
				</Route>

				<Overlay target={this.target.current} show={this.state.show} placement="right">
			        {(props) => (
			          <Tooltip id="overlay-example" {...props}>
			            <h6>Add to Favarate List</h6>
			            <p>Please First Login and then add to the List</p>	
			            <div className="d-flex justify-content-end">
	  						<Button onClick={() => this.setState({show: false})}  variant="outline-success" className="active"><Link to="/login">LOG IN</Link></Button>
	  						&nbsp;
	  						<Button onClick={() => this.setState({show: false})} variant="outline-success">
	    						Not NOW
	  						</Button>
						</div>
			          </Tooltip>
			        )}
				</Overlay>
	  		</div>
	  	);	
  	}
}

export default Home;

