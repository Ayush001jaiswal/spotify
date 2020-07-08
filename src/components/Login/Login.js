import React, {useState, useRef} from 'react';
import './Login.css'; 
import {Link, Redirect} from 'react-router-dom';
import { Container, Row, Col } from 'react-bootstrap';
import {  Form, FormGroup, Label, Input, FormText, Button } from 'reactstrap';

	
const Login = (props) => {

    const [register, setRegister] = useState(false);
    const [username, setUsername] = useState('');	
	const logusername = useRef(null);
	const logpassword = useRef(null);
	const logremember = useRef(null);

	const checkLogin = (e) => {
		
	 	e.preventDefault();
        let loginData;
        console.log('userData', props.userData);
        console.log('user', logusername.current.value);
        
        if(props.userData !== undefined) {
        	console.log('userData', props.userData)
	         loginData = props.userData.map((value,key) => {
	       		if(value.username === logusername.current.value && value.password === logpassword.current.value) {
	       			setUsername('dsds', value.username);
	       			return value.username;
	       		} 
	        });
	    	console.log('loginData', loginData)
		    if(loginData[0] !== undefined) {
		    	setRegister(true);
		    	//alert(loginData[0])
		    	//console.log(loginData, 'jki')
		    	props.sendUsernameToHome(loginData[0]);
		    } else {
		       	alert('Please enter valid credentials');
		    }

	    } else {
	    	alert('Please First signup and try again.')
	    }
   }	
   console.log(register, 'register')
   return( 
		<div className="login">
			<Form>
				<Container>
					<h1 className="h1 text-center mb-4">Spotify</h1>
					<hr/>
					<b className="text-center mb-4">To continue, log in to Spotify.</b>
					<p className="fb-icon">CONTINUE WITH FACEBOOK</p> 
					<p className="">--------------- or --------------</p>
					<FormGroup>
						<Row>
							<Col><input type="email"  ref={logusername} placeholder="Email address or username" /></Col>
	        			</Row>
	        		</FormGroup>
	        		
	        		<FormGroup>	
	        			<Row>
	        				<Col><input type="password" ref={logpassword} placeholder="Password"/></Col>
						</Row>
					</FormGroup>
					<FormGroup>	
	        			<input type="checkbox" ref={logremember} /> 
						&nbsp;<Label>Remember me</Label> 
					</FormGroup>	
		    		<Button onClick={checkLogin}>Login</Button>
			   		<p className="resetLink"><Link to="/reset-password">Forgot your password?</Link></p>
					<hr className="reset-horizontal" />
					<b className="text-center mb-4">Don't have an account?</b>
					<p className="signupLink"><Link to="/signup" >SIGN UP FOR SPOTIFY</Link></p>
					{register ?
						<Redirect from="/login"  to="/"
						/> : ''
					}
				</Container>
			</Form>
		</div>
	);
}

export default Login;