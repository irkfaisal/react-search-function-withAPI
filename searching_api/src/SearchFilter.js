import React, { useState, useEffect } from 'react'
import axios from 'axios';

const SearchFilter = () => {
    const [data, setData] = useState([])
    const [filterVal, setFilterVal] = useState('')
    const [searchAPIData, setSearchAPIData] = useState([])


    useEffect(() => {
        axios.get('https://jsonplaceholder.typicode.com/users').then((res) => {
            console.log("table data", res)
            setData(res.data)
            setSearchAPIData(res.data)
        }).catch((err) =>
            console.log(err)
        )
    }, []);

    const handleFilter = (e) => {
        if (e.target.value == ' ') {
            setData(searchAPIData)
        } else {
            const filterResult = searchAPIData.filter(item =>
                item.name.toLowerCase().includes(e.target.value.toLowerCase()) ||
                item.email.toLowerCase().includes(e.target.value.toLowerCase()) ||
                item.phone.toLowerCase().includes(e.target.value.toLowerCase())
            )
            if(filterResult.length > 0){
                setData(filterResult)
            } else{
                setData([{"Name":"No Data"}])
            }
            
        }
        setFilterVal(e.target.value)
    }

    return (
        <>
            <div><h1>Search Filter application</h1>
                <div className='container'>
                    <div className='row'>
                        <div class="col-md-12 text-center">
                            <input type="text" value={filterVal} onChange={(e) => handleFilter(e)}
                                style={{ width: "600x", height: "50px", marginLeft: "50%" }} placeholder="Search .." />
                        </div>
                    </div>
                </div>
            </div>
            <table class="table table-bordered text-center" style={{ height: "500px", width: "600px", marginTop: "100px" }}>
                <thead class="thead-dark">
                    <tr>
                        <th scope="col">#</th>
                        <th scope="col">Name</th>
                        <th scope="col">Email</th>
                        <th scope="col">phone</th>
                    </tr>
                </thead>
                <tbody>
                    <tr>
                        {
                            data.map((item, index) => {
                                return (<th scope="row">1
                                    <td>{item.id}</td>
                                    <td>{item.email}</td>
                                    <td>{item.name}</td>
                                    <td>{item.phone}</td>
                                </th>
                                )
                            })
                        }
                    </tr>
                </tbody>
            </table>
        </>


    )
}

export default SearchFilter