import React, { useEffect, useState } from 'react'
import { useHistory } from 'react-router'
import { useSelector } from 'react-redux'
import { Button, Row, Col } from 'reactstrap'
import './Home.css'



const HomePage = () => {
    const history = useHistory()

    const loginValue = useSelector(store=>store.loggedIn)

    const [showText, setShowText] = useState(true)

    function handleClick(){
        if(loginValue != true){
            setShowText(false)
        }else{
            setShowText(true)
            history.push('/jobs')
        }
    }

    return (
        <div className="home-page-container">
            <Row>
                <Col lg={2} xl={1}></Col>

                <Col sm={12} lg={8} xl={10}>
                    <div className="home-page">
                        <h1>WELCOME TO JOBLY, LET US FIND YOU YOUR DREAM JOB!!</h1>
                    </div>
                    <div className="btn-div">
                        <Button color="primary" id="job-btn" onClick={handleClick} >EXPLORE JOBS</Button>
                        {showText ? null : <h4>Login/create account to view jobs!</h4>}
                    </div>
                </Col>

                <Col lg={2} xl={1}></Col>
            </Row>
        </div>
        
    )
}

export default HomePage