import React, { useContext, useEffect, useState } from 'react'
import { useSelector } from 'react-redux'

import './JobDetail.css'

import JoblyApi from '../API/api'
import LoadingSpinner from '../Extra/LoadingSpinner'
import SearchForm from '../Forms/SearchForm'


import JobCard from './JobCard'
import UserContext from '../ReactContext'
import { Redirect } from 'react-router'

const JobDetails = () => {

    const loginValue = useSelector(store=>store.loggedIn)

    const [jobs, setJobs] = useState(null)

    useEffect(function setUpMount(){
        console.debug("CompanyList useEffect getCompaniesOnMount");
        search();
    }, [])

    async function search(title){
        const response = await JoblyApi.findAll(title)
        setJobs(response)
    }

    if (!jobs) return <LoadingSpinner />;


    if(loginValue === true ){
        if(!jobs) return LoadingSpinner;

        return (
            <div className="job-div">
                <SearchForm searchTerm={search} />
                {jobs.length ? (
                    <div>
                        {jobs.map(c => (
                            <JobCard
                                key={c.id}
                                id={c.id}
                                handle={c.companyHandle}
                                title={c.title}
                                salary={c.salary}
                                equity={c.equity}
                            />
                        ))}
                    </div>
                ) : (
                    <p className="lead">Sorry, no results were found!</p>
                )
                }
            </div>
        )
    }else{
        return (
            <Redirect to="/" />
        )
    }
}

export default JobDetails;