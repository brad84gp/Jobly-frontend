import React, { useState, useEffect, useContext } from "react";
import SearchForm from '../Forms/SearchForm'
import JoblyApi from "../API/api";
import CompanyCard from "./CompanyCard";
import LoadingSpinner from '../Extra/LoadingSpinner'

import './CompanyList.css'
import { Redirect } from "react-router";
import { useSelector } from 'react-redux'



function CompanyList({loginValue}) {
  console.debug("CompanyList");

  const loggedIn = useSelector(store => store.loggedIn)

  const [companies, setCompanies] = useState(null);

  useEffect(function getCompaniesOnMount() {
    console.debug("CompanyList useEffect getCompaniesOnMount");
    search();
  }, []);

  async function search(name) {
    let companies = await JoblyApi.getCompanies(name);
    setCompanies(companies);
  }

  if (!companies) return <LoadingSpinner />;

  if(loggedIn === true){
    return (
        <div className="CompanyList col-md-8 offset-md-2" id='list-div'>
          <SearchForm searchTerm={search} />
          {companies.length
              ? (
                  <div className="CompanyList-list">
                    {companies.map(c => (
                        <CompanyCard
                            key={c.handle}
                            handle={c.handle}
                            name={c.name}
                            description={c.description}
                            logoUrl={c.logoUrl}
                        />
                    ))}
                  </div>
              ) : (
                  <p className="lead">Sorry, no results were found!</p>
              )}
        </div>
    );
  }else{
    return (
      <Redirect to="/" />
    )
  }
}

export default CompanyList;