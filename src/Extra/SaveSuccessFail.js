import React, { useContext, useEffect, useState } from 'react'

import './SavedSuccessFail.css'

import UserContext from '../ReactContext'

function SaveState() {
    const { success, setSuccess} = useContext(UserContext)

    function hanldeClick(){
        setSuccess(null)
    }

    if(success == null){
        return null
    }

    if(success == true){
        return (
            <div className='save-state'>
                <button id="save-btn" onClick={hanldeClick}>X</button>
                <h2>Save was successful!</h2>
            </div>
        )
    }else if(success == false){
        return (
            <div className='save-state'>
                 <button id="save-btn" onClick={hanldeClick}>X</button>
                <h2>Oops, something went wrong! Try again.</h2>
            </div>
        )
    }
}

export default SaveState;