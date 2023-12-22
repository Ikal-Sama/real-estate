import { useEffect, useState } from 'react'
import House from '../../assets/house.png'
import Man from '../../assets/man.png'
import AgentTable from '../../components/AgentTable';
import UserTable from '../../components/UserTable';
import { Link } from 'react-router-dom';
import ListingItem from '../../components/ListingItem';

function Dashboard() {
  const [users, setUsers] = useState(null);
  const [houses, setHouses] = useState(null);
  const [offerListings, setOfferListings] = useState([]);

  useEffect(() => {
    const fetchOfferListings = async() => {
      try {
        const res = await fetch('http://localhost:5000/api/listing/get?offer=true&limit=4');
        const data = await res.json();
        setOfferListings(data)
      } catch (error) {
        console.log(error)
      }
    }
    fetchOfferListings();
  }, [])
  useEffect(() => {
    try {
      const fetchAllUser = async()=> {
        const res = await fetch('http://localhost:5000/api/user/',{
          method: 'GET',
          credentials: 'include'
        });
        const data = await res.json()
        setUsers(data)
      }
      fetchAllUser();
    } catch (error) {
      console.log(error);
    }
  }, [])

  useEffect(() => {
    try {
      const fetchAllHouses = async()=> {
        const res = await fetch('http://localhost:5000/api/listing/get');
        const data = await res.json()
        setHouses(data)
      }
      fetchAllHouses();
    } catch (error) {
      console.log(error);
    }
  }, [])
  return (
    <div className='max-w-6xl mx-auto p-3'>
      <div className='flex gap-16 items-center justify-center'>
          <div className="bg-slate-300 shadow-md py-5 px-10 text-white rounded-sm flex flex-col items-center">
            <img src={Man} alt="house" className='w-12'/>
              <span className='text-2xl text-slate-900'>{users && users.length}</span>
            <span className='text-sm text-slate-900'>Total Users</span>
          </div>
          <div className="bg-slate-300 shadow-md py-5 px-10 text-white rounded-sm flex flex-col items-center">
            <img src={House} alt="house" className='w-12'/>
            <span className='text-2xl text-slate-900'>{houses && houses.length}</span>
            <span className='text-sm text-slate-900'>Total Houses</span>
          
          </div>
      </div>
      <div className='p-2'>
          <AgentTable />
      </div>
      <div className='p-2'>
          <UserTable />
      </div>
      <div className="max-w-6xl mx-auto p-3 flex flex-col gap-8 my-10">
          {
            offerListings && offerListings.length > 0 && (
              <div className="">
                <div className="my-3">
                  <h2 className='text-2xl font-semibold text-slate-600'>Recent Offers</h2>
                  <Link className='text-sm text-blue-800 hover:underline' to='/list-houses'>
                    Show more houses
                  </Link>
                </div>
                <div className="flex flex-wrap gap-4">
                  {
                    offerListings.map((listing) => {
                      return <ListingItem listing={listing} key={listing._id}/>
                    })
                  }
                </div>
              </div>
            )
          }
      </div>
    </div>
  )
}

export default Dashboard