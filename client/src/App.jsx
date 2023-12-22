import {BrowserRouter, Routes, Route} from 'react-router-dom'

import Home from './pages/Home'
import Signin from './pages/Signin'
import SignUp from './pages/SignUp'
import About from './pages/About'
import Profile from './pages/Profile'
import PrivateRoute from './components/privateRoute'
import CreateListing from './pages/CreateListing'
import AllListing from './pages/AllListing'
import UpdateListing from './pages/updateListing'
import Listing from './pages/Listing'
import Search from './pages/Search'
import DashboardLayout from './components/DashboardLayout'
import Dashboard from './admin/pages/Dashboard'
import DashboardProfile from './admin/pages/DashboardProfile'
import UserLayout from './components/UserLayout'
import ListofHouses from './admin/pages/ListofHouses'

export default function App() {
  return (
    <BrowserRouter>
      <Routes>
        <Route element={<UserLayout />}>
          <Route element={<PrivateRoute />}>
            <Route path="/profile" element={<Profile />} />
            <Route path="/create-listing" element={<CreateListing />} />
            <Route path="/all-listings" element={<AllListing />} />
            <Route path="/update-listing/:listingId" element={<UpdateListing />} />
          </Route>
          <Route path="/" element={<Home />} />
          <Route path="/signin" element={<Signin />} />
          <Route path="/signup" element={<SignUp />} />
          <Route path="/about" element={<About />} />
          <Route path="/search" element={<Search />} />
          <Route path="/listing/:listingId" element={<Listing />} />
        </Route>
      </Routes>

      <Routes>
        <Route element={<DashboardLayout />}> 
          <Route element={<PrivateRoute />}>
              <Route path="/dashboard" element={<Dashboard />} />
              <Route path="/dashboard-profile" element={<DashboardProfile />} />
              <Route path="/list-houses" element={<ListofHouses />} />
            </Route>
        </Route>
      </Routes>
    </BrowserRouter>
  )
}
