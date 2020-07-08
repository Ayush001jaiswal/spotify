import React, {Component} from 'react';
import './ResetPassword.css';
import { Container, Row, Col } from 'react-bootstrap';
import {  Form, FormGroup, Label, Input, FormText, Button } from 'reactstrap';


const ResetPassword = (props) => {

	return (
		<div className="ResetPassword">
   		<Form>
            <Container>	
               <h1>Spotify</h1>
      			<h2>Password Reset</h2>
      			<p>Enter your Spotify username, or the email address that you used to register. 
      			   We'll send you an email with your username and a link to reset your password.</p>
      			
               <FormGroup>
                  <Row>	
      				  <Col><Label>Email address or username</Label></Col>
      				</Row>  
                  
                  <Row> 
                    <Col><input type="text" /></ Col>
      	         </Row>  
               </FormGroup>      
      			<Button>Send</Button>
   			</Container>
            </Form>
   			<p>If you still need help, contact <a href="#">Spotify Support.</a></p>
   		</div>
	);
}

export default ResetPassword;