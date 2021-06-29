import React, { useState } from 'react'
import { Form, FormGroup, Label, Input, FormText, Button } from 'reactstrap'


function SearchForm({ searchTerm }){
    console.debug("SearchForm", "searchTerm=", typeof searchTerm);

    const [search, setSearch] = useState()

    function handleSubmit(evt){
        evt.preventDefault();
        searchTerm(search.trim() || undefined);
        setSearch(search.trim());
    }

    function handleChange(evt){
        setSearch(evt.target.value)
    }

    return(
        <div>
            <Form onSubmit={handleSubmit} style={{marginBottom : '20px'}}>
                <FormGroup>
                    <Label for="Company-name">Company Name</Label>
                    <Input type='text' name='searchTerm' id='Company-name' placeholder='Example: Apple' value={search} onChange={handleChange} />
                    <Button color='success' type='submit' style={{marginTop : '10px'}}>Submit</Button>
                </FormGroup>
            </Form>
        </div>
    )
}

export default SearchForm;