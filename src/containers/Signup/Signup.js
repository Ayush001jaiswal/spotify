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
			validateError: {email:'', cemail:'', password: '', profile: '', year: '', month: '', day: '', gender: '', robot: ''},
			formError: false
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

		//if(!this.state.formError) {
			if (this.username.current.value === this.cnfusername.current.value) {
				const updatedUserInfo = [ ...this.state.userInfo]; 
				updatedUserInfo.push(userData);
				this.setState({userInfo: updatedUserInfo, isRegister: true});
				//this.props.sendUserDataToHome(updatedUserInfo);
				this.props.sendUserDataToHome(userData);
			} 
		//}
		// else {
		// 	this.setState({error: true});
		// }
	}

	validateEmail = (e) => {
		// let emailMessage = '';
		// const {name, value} = e.target;
		// var mailformat = /^\w+([\.-]?\w+)*@\w+([\.-]?\w+)*(\.\w{2,3})+$/;
		// if(value === '') {
		// 	emailMessage = 'You need to enter your email.'; 
		// } elseif (value.match(mailformat) == false) {
		// 	emailMessage = 'This email is invalid. Make sure it's written like example@email.com';
		// }
		// validateError.email = emailMessage;
		// this.setState({validateError: this.state.validateError})
	}

	// validateHandle = e => {
	// 	const {name, value} = e.target;
	// 	const updateValidateError = { ...this.state.validateError }
	// 	//var mailformat = /^\w+([\.-]?\w+)*@\w+([\.-]?\w+)*(\.\w{2,3})+$/;
	// 	if(value == '')	{
	// 		this.setState({updateValidateError, [name]: value, formError: true}); 
	// 	}
	// }
	

  	render() {
  		console.log('emailV', this.state.validateError)
  		console.log('formerror', this.state.formError)
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
								<Col><input name="email" onChange={this.validateEmail} type="email" ref={this.username} placeholder="Enter your email." /></Col>
								<p>{this.state.validateError.email}</p>
							</Row>
						</FormGroup>	
						
						<FormGroup>	
							<Row>
								<Col><Label>Confirm your email?</Label></Col>
							</Row>
							<Row>
								<Col><input onChange={this.validateEmail} type="email" name="cmail" ref={this.cnfusername} placeholder="Enter your email again." /></Col>
		                	</Row>
		                </FormGroup>
						
						<FormGroup>
							<Row>	
							 	<Col><Label>Create a password</Label></Col>
							</Row>
							
							<Row>
								<Col><input type="password" name="password" ref={this.password} placeholder="Create a password." /></Col>
							</Row>
						</FormGroup>		
						
						<FormGroup>		
							<Row>
								<Col><Label>What should we call you?</Label></Col>
							</Row>	
							<Row>	
								<Col><input type="text" name="profile" ref={this.profilename} placeholder="Enter a profile name." /></Col>
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
									<Col><input name="year" type="text" ref={this.year} placeholder="YYYY" /></Col>
									<Col>
										<select name="month" ref={this.month} custom>
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
									<Col><input name="day" type="text" ref={this.day} placeholder="DD" /></Col>
	 							</Row>
	 							</FormGroup>
	 							
	 							<FormGroup>
	 								<Row>
	 									<Col><label>What's your gender?</label></Col>
	 								 </Row>
	 								<Row>
	 									<Col><input name="gender" type="radio" ref={this.gender} value="male" /> Male</Col>
	 									<Col><input name="gender" type="radio" ref={this.gender} value="female" /> Female</Col>
	 									<Col><input name="gender" type="radio" ref={this.gender} value="non-binary" /> Non-binary</Col>
	 								</Row>
	 							</FormGroup>
	 							
	 							<FormGroup>
	 								<input type="checkbox" ref={this.shareregdata} />
	 								&nbsp;Share my registration data with Spotify's content providers 
	 								for marketing purposes.
	 							</FormGroup>
	 							
	 							<FormGroup>
	 								<input name="robot" type="checkbox" ref={this.isRobot} />
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

