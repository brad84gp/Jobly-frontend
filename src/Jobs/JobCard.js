import React, { useEffect, useState } from 'react'
import { Card, CardBody, CardTitle, CardText, CardSubtitle, Button, Alert } from 'reactstrap'
import './JobCard.css'

import {useSelector} from 'react-redux'

import JoblyApi from '../API/api'

const JobCard = ({ id, title, handle, salary, equity }) => {
    
    const username = useSelector(store=>store.user.username)

    const [jobInfo, setJobInfo] = useState({
        job_id : id,
        job_title : title,
        job_handle : handle,
        job_salary : salary,
        job_equity : equity,
        applied : false,
    })

    useEffect(async ()=>{
        const response = await JoblyApi.hasApplied(username, jobInfo.job_id)
        if(response.applied === true && response.res.job_id == jobInfo.job_id){
            console.log(response.res)
        }
        setJobInfo(data => ({...data, applied : response.applied}))
    }, [])

    async function applyToJob(){
        try{
            await JoblyApi.applyToJob(username, id)
            setJobInfo(data => ({...data, applied : true}))
        }catch{
            console.log('unable to apply to job')
            alert('Oops, something went wrong')
        }
    }



    return (
        <div>
            <div className='JobCard card' >
                <Card className="div-card">
                    <CardBody >
                        <CardTitle  id="text" tag="h5">Job Title: {title}</CardTitle>
                        <CardTitle id="text" tag="h6">Company Name: {handle}</CardTitle>
                        <CardSubtitle tag="h6" id="text"  className='mb-2 text-muted'>Job-id: {id}</CardSubtitle>
                        <CardText id="text" >Annual Salary: {salary}</CardText>
                        <CardText id="text" >Equity: {equity}</CardText>
                        {jobInfo.applied 
                            ? <Button color="grey" id="btn-applied" onClick={applyToJob} disabled>Applied</Button> 
                            : <Button color="info" id="btn" onClick={applyToJob}>Apply</Button>
                        }
                    </CardBody>
                    
                </Card>
            </div>
        </div>

    )
}

export default JobCard



