import React, { useEffect, useState } from 'react'
import { useSelector } from 'react-redux'
import { Link } from 'react-router-dom'

export default function AllListing() {
  const [listings, setListings] = useState([])
  const {currentUser, loading, error} = useSelector((state) => state.user)

  useEffect(() => {
    const fetchListings = async () => {
      try {
        const response = await fetch(`http://localhost:5000/api/user/listings/${currentUser._id}`, {
            credentials: 'include'
        })
        const data = await response.json()
        setListings(data)
      } catch (error) {
        console.error('Failed to fetch listings:', error)
      }
    }

    fetchListings()
  }, [])

  const handleListingDelete = async(listingId) => {
    const confirmed = window.confirm("Are you sure you want to delete the list?");
    if (!confirmed) {
        return;
      }
    try {
        const res =await fetch(`http://localhost:5000/api/listing/delete/${listingId}`, {
            method: 'DELETE',
            credentials: 'include',
        })
        const data = await res.json()
        if(data.success === false){
            console.log(data.message)
            return;
        }

        setListings((prev) => prev.filter((listing) => listing._id !==  listingId))
    } catch (error) {
        console.log(error.message)
    }
  }

  return (
    <div className=' p-3'>
        <h1 className='text-3xl font-semibold text-center mb-10'>My Listings</h1>
        <div className='grid gap-14 sm:grid-cols-1'>
            {listings && listings.length > 0 && (
                listings.map((listing) => (
               <div className='grid items-center justify-center gap-6 sm:flex'>
                   
                    <Link to={`/listing/${listing._id}`}>
                        <img src={listing.imageUrls[0]} alt="listing cover" className='w-[400px] object-contain'/>
                    </Link>

                    <div>
                        <h1 className='text-xl'>{listing.name}</h1>
                        <p className='text-sm my-1 max-w-[500px] sm:max-w-[500px]'>{listing.description} Lorem ipsum dolor sit amet consectetur adipisicing elit. Aperiam, ut! Ex quia beatae veniam consectetur, enim perspiciatis </p>
                        <div className='flex items-center justify-between'>
                            <p className='text-sm'>Bathrooms: {listing.bathrooms}</p>
                            <p className='text-sm'>Bedrooms: {listing.bedrooms}</p>
                        </div>
                        <div className='flex gap-4 items-center justify-between'>
                            <p className='text-sm'>Type: {listing.type}</p>
                            <p className='text-sm'>Price: ${listing.regularPrice}</p>
                        </div>
                        <div className='flex gap-5 my-3'>
                            <button onClick={()=>handleListingDelete(listing._id)} className='text-red-700 border border-red-700 px-2 text-sm hover:bg-red-700 hover:text-white'>Delete</button>
                            <Link to={`/update-listing/${listing._id}`}>
                              <button className='text-blue-700 border border-blue-700 px-2 text-sm hover:bg-blue-700 hover:text-white'>Edit</button>
                            </Link>
                        </div>
                    </div>
               </div>
            ))
            )}
        </div>
    </div>
  )
}