import React, {Component} from 'react';
import './Signup.css';
import {Link, Redirect} from 'react-router-dom';
import { Container, Row, Col } from 'react-bootstrap';
import {  Form, FormGroup, Label, Input, FormText, Button} from 'reactstrap';

class Signup extends Component {
	
	constructor(props) {
		super(props);
		this.username = React.createRef();
		this.cnfusername = React.createRef();
		this.password = React.createRef();
		this.profilename = React.createRef();
		this.gender = React.createRef();
		this.year = React.createRef();
		this.month = React.createRef();
		this.day = React.createRef();
		this.shareregdata = React.createRef();
		this.isRobot = React.createRef();

		this.state = {
			userInfo: [],
			isRegister: false,
			error: false
		}
	}

	userSubmitHandler = (e) => {
		e.preventDefault();
		const userData = {
			username: this.username.current.value,
			cnfusername: this.cnfusername.current.value,
			password: this.password.current.value,
			profilename: this.profilename.current.value,
			gender: this.gender.current.value,
			dob: `${this.year.current.value}-${this.month.current.value}-${this.day.current.value}`,
			shareregdata: this.shareregdata.current.value,
			isRobot: this.isRobot.current.value
		}
		//console.log('dd', userData);
		
		if (this.username.current.value === this.cnfusername.current.value) {
			const updatedUserInfo = [ ...this.state.userInfo]; 
			updatedUserInfo.push(userData);

			this.setState({userInfo: updatedUserInfo, isRegister: true});
			this.props.sendUserDataToHome(userData);
		} else {
			this.setState({error: true});
		}
	}
	

  	render() {
  		return (
	  		<div className="Signup">
	  			<Form>
	  				<Container>
			  			<h1>Spotify</h1>
						<h1>Sign up for free  to start listening</h1>
						<p>SIGN UP WITH FACEBOOK</p> 
						<p> --------------- or -------------- </p>
						<h4>Sign up with your email address</h4>
						<FormGroup>
							<Row>	
							    <Col><Label>What's your email?</Label></Col>
							</Row>
							<Row>
								<Col><input input type="email" ref={this.username} placeholder="Enter your email." /></Col>
							</Row>
						</FormGroup>	
						
						<FormGroup>	
							<Row>
								<Col><Label>Confirm your email?</Label></Col>
							</Row>
							<Row>
								<Col><input type="email" ref={this.cnfusername} placeholder="Enter your email again." /></Col>
		                	</Row>
		                </FormGroup>
						
						<FormGroup>
							<Row>	
							 	<Col><Label>Create a password</Label></Col>
							</Row>
							
							<Row>
								<Col><input type="password" ref={this.password} placeholder="Create a password." /></Col>
							</Row>
						</FormGroup>		
						
						<FormGroup>		
							<Row>
								<Col><Label>What should we call you?</Label></Col>
							</Row>	
							<Row>	
								<Col><input type="text" ref={this.profilename} placeholder="Enter a profile name." /></Col>
							</Row>
							<Row>	 
								<Col><FormText>This appears on your profile.</FormText></Col>
	 						</Row>
	 					</FormGroup>	
	 					
	 					<FormGroup>		
							<Label>What's your date of birth?</Label>
								<Row>
									<Col>Year</Col>
									<Col>Month</Col>
									<Col>Day</Col>
	 							</Row>
								<Row>	
									<Col><input type="text" ref={this.year} placeholder="YYYY" /></Col>
									<Col>
										<select ref={this.month} custom>
											<option value="january">January</option>
											<option value="febuary">Febuary</option>
											<option value="march">March</option>
											<option value="april">April</option>
											<option value="may">May</option>
											<option value="june">June</option>
											<option value="july">July</option>
											<option value="august">August</option>
											<option value="september">September</option>
											<option value="october">October</option>
											<option value="november">November</option>
											<option value="december">December</option>
										</select>
									</Col>
									<Col><input type="text" ref={this.day} placeholder="DD" /></Col>
	 							</Row>
	 							</FormGroup>
	 							
	 							<FormGroup>
	 								<Row>
	 									<Col><label>What's your gender?</label></Col>
	 								 </Row>
	 								<Row>
	 									<Col><input type="radio" ref={this.gender} value="male" /> Male</Col>
	 									<Col><input type="radio" ref={this.gender} value="female" /> Female</Col>
	 									<Col><input type="radio" ref={this.gender} value="non-binary" /> Non-binary</Col>
	 								</Row>
	 							</FormGroup>
	 							
	 							<FormGroup>
	 								<input type="checkbox" ref={this.shareregdata} />
	 								&nbsp;Share my registration data with Spotify's content providers 
	 								for marketing purposes.
	 							</FormGroup>
	 							
	 							<FormGroup>
	 								<input type="checkbox" ref={this.isRobot} />
	 								&nbsp;I'm not a robot.
	 							</FormGroup>
		 							
		 						<FormGroup>	
		 							<FormText>By clicking on Sign up, you agree to Spotify's 
		 								<a href="#">Terms and Conditions of Use</a>.</FormText>
		 							
		 						</FormGroup>
				 				
				 				<FormGroup>
		 							<FormText>To learn more about how Spotify collects, uses, shares and protects your personal data please read 
		 								Spotify's<a href="#"> Privacy Policy</a>.</FormText>
		 						</FormGroup>
		 							
		 							
		 						<Button onClick={this.userSubmitHandler}>SIGN UP</Button>
		 							
					
						<p>Have an account? <Link to="/login">Log in</Link>.</p>
			  		
				 		{this.state.isRegister ? 
							<Redirect from='/signup' to="/login" /> : ''
						}
					</Container>
				</Form>
	 		</div>	
	  	);	
  	}
}

export default Signup;

