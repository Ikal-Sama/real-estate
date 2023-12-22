import React, { useEffect, useState } from 'react'
import {FaSearch} from 'react-icons/fa'
import { Link, useNavigate } from 'react-router-dom'
import {useSelector} from 'react-redux';
import Button from '@mui/material/Button';
import Menu from '@mui/material/Menu';
import MenuItem from '@mui/material/MenuItem';

export default function DashboardHeader() {
    const [anchorEl, setAnchorEl] = React.useState(null);
    const {currentUser} = useSelector(state => state.user)
    const [searchTerm, setSearchTerm] = useState('')
    const navigate = useNavigate();
    const open = Boolean(anchorEl);
    const handleClick = (event) => {
      setAnchorEl(event.currentTarget);
    };
    const handleClose = () => {
      setAnchorEl(null);
    };

    const handleSubmit = (e) => {
      e.preventDefault();
      const urlParams = new URLSearchParams(window.location.search);
      urlParams.set('searchTerm', searchTerm);
      const searchQuery = urlParams.toString()
      navigate(`/search?${searchQuery}`)
    };

    useEffect(() => {
      const urlParams = new URLSearchParams(location.search);
      const searchTermFromUrl = urlParams.get('searchTerm');
      if(searchTermFromUrl) {
        setSearchTerm(searchTermFromUrl)
      }
    }, [location.search])

  return (
    <header className='bg-slate-900 w-full'>
        <div className='flex justify-between items-center max-w-6xl mx-auto p-3'>
            <Link to='/dashboard'>
                <h1 className='font-bold text-sm sm:text-xl flex flex-wrap'>
                    <span className='text-slate-200'>Big</span>
                    <span className='text-slate-500'>Estate</span>
                </h1>
            </Link>
            <form onSubmit={handleSubmit} className='bg-slate-100 p-2 rounded-sm flex items-center'>
                <input type="text"  
                placeholder='Search...' 
                className='bg-transparent focus:outline-none w-24 sm:w-64' 
                value={searchTerm}
                onChange={(e) => setSearchTerm(e.target.value)}
                />
                <button>
                  <FaSearch className='text-slate-600'/>
                </button>
            </form >
            <ul className='flex gap-4 items-center'>
                <Link to='/dashboard'>
                    <li className='hidden sm:inline text-slate-200 hover:underline'>Dashboard</li>
                </Link>
                {currentUser ? (
                     <div>
                     <Button
                       id="basic-button"
                       aria-controls={open ? 'basic-menu' : undefined}
                       aria-haspopup="true"
                       aria-expanded={open ? 'true' : undefined}
                       onClick={handleClick}
                     >
                    <img className='rounded-full h-7 w-7 object-cover' src={currentUser.avatar} alt="profile" />

                     </Button>
                     <Menu
                       id="basic-menu"
                       anchorEl={anchorEl}
                       open={open}
                       onClose={handleClose}
                       MenuListProps={{
                         'aria-labelledby': 'basic-button',
                       }}
                     >
                       <MenuItem><Link to='/dashboard-profile'>My Profile</Link></MenuItem>
                      
                     </Menu>
                   </div>

                ): <MenuItem ><Link to='/signin'>Sign in</Link></MenuItem>
                
                }
             
            </ul>
        </div>
          <div className='bg-slate-200'>
               <div className="max-w-6xl mx-auto p-2">
               <div>
                  <ul className='flex gap-10 items-center uppercase font-medium text-slate-500 '>
                      <li className='hover:underline hover:text-slate-700'>
                        <Link>Users</Link>
                      </li>
                      <li className='hover:underline hover:text-slate-700'>
                        <Link>Agents</Link>
                      </li>
                      
                      <li className='hover:underline hover:text-slate-700'>
                        <Link to='/list-houses'>List of houses</Link>
                      </li>
                  </ul>
                </div>
               </div>
          </div>
    </header>
  )
}
