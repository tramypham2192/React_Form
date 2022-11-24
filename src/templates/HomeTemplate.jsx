import React, { Component } from 'react'
import { Outlet,NavLink } from 'react-router-dom'

export default class HomeTemplate extends Component {
    render() {
        return (
            <div>
                <header className='bg-dark text-white p-2 nav'>
                    <NavLink className={({isActive})=> isActive ? 'nav-link bg-white text-dark' : 'nav-link' } to='/form'>Form</NavLink>
                </header>
                <div className='content' style={{minHeight:'75vh'}}>
                    <Outlet />
                </div>
                </div>               
        )
    }
}

// function main ({id,isActive}) {
//     let {id,isActive} = props
// }