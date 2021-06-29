import React from 'react'
import { Table } from 'reactstrap'

const TableSetup = ({company}) => {
    return(
        <div>
            <Table style={{backgroundColor : '#2c2929', color : 'white', height : '10vh', textAlign : 'center'}}>
                <thead>
                    <tr>
                        <th>#</th>
                        <th>Name</th>
                        <th>Description</th>
                        <th>Number of Employees</th>
                        <th>Logo</th>
                    </tr>
                </thead>
                <tbody>
                    <tr >
                        <th scope="row">1</th>
                        <td>{company.name}</td>
                        <td>{company.description}</td>
                        <td>{company.numEmployees}</td>
                        <td><img src={company.logoUrl} alt=""/></td>
                    </tr>
                </tbody>
            </Table>
        </div>
    )
}

export default TableSetup;