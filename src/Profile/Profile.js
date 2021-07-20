import React, { useState } from 'react'
import { useSelector } from 'react-redux'

import { Form, FormGroup, Label, Input, Button, Row, Col } from 'reactstrap'

import UserContext from '../ReactContext'
import JoblyApi from '../API/api'
import LoadingSpinner from '../Extra/LoadingSpinner'


import SavedState from '../Extra/SaveSuccessFail'

import './Profile.css'


const UserProfile = () => {
    
    const user = useSelector(store=>store.user)

    const [profile, setProfile] = useState({
        username: user.username,
        firstName: user.firstName,
        lastName: user.lastName,
        email: user.email,
        password: '',
    })

    const [submit, setSubmit] = useState(false)

    const [success, setSuccess] = useState(null)

    function handleChange(evt){
        evt.preventDefault()
        const { name, value } = evt.target
        setProfile(data => ({...data, [name] : value}))
        console.log(profile)
    }

    function enableEdit(){
        let inputs = document.querySelectorAll('#input')
        inputs.forEach(input => {
            input.readOnly = false
        })
        setSubmit(true)
    }

    async function handleSubmit(evt){
        evt.preventDefault()
        try{
            const userUpdateResponse = await JoblyApi.updateUser(user.username, profile)
            if(userUpdateResponse){
                setSuccess(true)
            }
        }catch{
            console.log('Error updating user information')
            setSuccess(false)
        }
    }

    if (!user) return <LoadingSpinner />;


    return(
        
            <Row>
                <Col lg={2}></Col>

                <Col sm={12} lg={8}>
                    <div className='profile-info'>
                        <Form>
                            <FormGroup>
                                <Label>Firstname</Label>
                                <Input id="input" type='text' name='firstName' value={profile.firstName} onChange={handleChange}  readOnly={true}/>
                            </FormGroup>
                            <FormGroup>
                                <Label>Lastname</Label>
                                <Input id="input" type='text' name='lastName' value={profile.lastName} onChange={handleChange}  readOnly={true}/>
                            </FormGroup>
                            <FormGroup>
                                <Label>Email</Label>
                                <Input id="input" type='email' name='email' value={profile.email} onChange={handleChange}  readOnly={true}/>
                            </FormGroup>
                            <FormGroup>
                                <Label>Password</Label>
                                <Input id="input" type='password' name='password' defaultValue={profile.password} onChange={handleChange} readOnly={true}/>
                            </FormGroup>
                            <Button onClick={enableEdit} color='primary'>Edit</Button>
                            <UserContext.Provider value={{success, setSuccess}}>
                                <SavedState />
                            </UserContext.Provider>
                            {submit ? <Button id="btn-2" color='success' onClick={handleSubmit}>Submit</Button> : null}
                        </Form>
                    </div>

                </Col>

                <Col lg={2}></Col>
            </Row>
    )
}

export default UserProfile;