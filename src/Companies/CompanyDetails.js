import React, { useState, useEffect } from 'react'
import { useParams } from 'react-router'

import './CompanyDetails.css'

import JoblyApi from '../API/api'
import Job from '../Jobs/JobCard'
import TableSetup from '../Extra/Table'
import LoadingSpinner from '../Extra/LoadingSpinner'

const CompanyDetails = () => {
    let { name } = useParams()

    const [company, setCompany] = useState()

    const [companyJobs, setCompanyJobs] = useState([])

    useEffect(function getCompaniesOnMount() {
        console.debug("CompanyList useEffect getCompaniesOnMount");
        searchName();
    }, []);

    async function searchName(){
        const res = await JoblyApi.getCompany(name)
        setCompany(res)
        setCompanyJobs(res.jobs)
    }
    
    if (!company) return <LoadingSpinner />;


    return (
        <div className="company-div">
            {company ? (
                <div>
                    <TableSetup company={company} />
                </div>
            ) : <p className="lead">Sorry, no results were found!</p> }
             
            {companyJobs
            ? (
                <div className="JobList-list" >
                    {companyJobs.map(c => (
                        <Job 
                            id={c.id}
                            title={c.title}
                            salary={c.salary}
                            equity={c.equity}
                        />
                    ))}
                </div>
            ) : (
                <p className="lead">Sorry, no results were found!</p>
            )}
        </div>
    )
}

export default CompanyDetails;