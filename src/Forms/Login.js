import React, { useState } from 'react'
import { useDispatch } from 'react-redux'



import { Form, FormGroup, Label, Input, Button, Row, Col } from 'reactstrap'
import './Register.css'

import JoblyApi from '../API/api'
import { useHistory } from 'react-router-dom'


const LoginForm = () => {

    const history = useHistory()

    const dispatch = useDispatch()

    const [formData, setFormData] = useState({
        username : '',
        password : '',
    })

    const [formErrors, setFormErrors] = useState([])

    console.debug(
        "SignupForm",
        "signup=", typeof signup,
        "formData=", formData,
        "formErrors=", formErrors,
    );

    async function handleSubmit(evt){
        evt.preventDefault();
        const res = await JoblyApi.loginUser(formData);
        if(res){
            dispatch({ type : 'LOGGED_IN'})
            dispatch({ type : 'TOKEN_VALUE', payload : res })
            history.push('/companies')
        }else{
            setFormErrors(res.errors);
        }
    }

    function handleChange(evt){
        const {name, value} = evt.target;
        setFormData(data => ({...data, [name] : value}))
    }


    return (
        
            <Row>
                <Col lg={2} xl={1}></Col>

                <Col sm={12} lg={8} xl={10}>
                    <div className='signup-form'>
                        <Form>
                            <FormGroup>
                                <Label>Username</Label>
                                <Input type='text' name='username' id='input' placeholder='Username' value={formData.username} onChange={handleChange} />
                            </FormGroup>
                            <FormGroup>
                                <Label>Password</Label>
                                <Input type='password' name='password' id='input' placeholder='password' value={formData.password}  onChange={handleChange} />
                            </FormGroup>
                            <Button color='success' onClick={handleSubmit}>Login</Button>
                        </Form>
                    </div>
                </Col>

                <Col lg={2} xl={1}></Col>
            </Row>
    )
}

export default LoginForm;