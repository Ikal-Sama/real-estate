import React, { useEffect, useState } from 'react'
import { MdLocationOn } from 'react-icons/md';
import { Link } from 'react-router-dom';


function ListofHouses() {
  const [houses, setHouses] = useState(null);
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
    <div className=' max-w-6xl mx-auto p-3'>
        <h1 className='text-2xl font-medium text-center my-5'>LIST OF ALL HOUSES</h1>
      <div className='flex flex-wrap gap-5'>
    {houses &&
      houses.map((house) => (
        <Link>
            <div key={house.id} className="bg-slate-20 shadow-md hover:shadow-lg transition-shadow overflow-hidden rounded-lg
        w-full sm:w-[250px]">
          <img src={house.imageUrls[0] || "https://53.fs1.hubspotusercontent-na1.net/hub/53/hubfs/Sales_Blog/real-estate-business-compressor.jpg?width=595&height=400&name=real-estate-business-compressor.jpg"} alt="listing cover" 
            className='h-[320px] sm:h-[220px] w-full object-cover hover:scale-105 transition-scale duration-300'/>
            <div className='p-3 flex flex-col gap-2 w-full'>
                <p className='truncate text-lg font-semibold text-slate-700 '>{house.name}</p>
                <div className="flex items-center gap-1">
                    <MdLocationOn className='h-4 w-4 text-green-700'/>
                    <p className='text-sm text-gray-600 truncate w-full'>{house.address}</p>
                </div>
                <p className='text-sm text-gray-600 line-clamp-2'>{house.description}</p>
                <p className='text-slate-500 mt-2 font-semibold'>
                    $
                    {
                        house.offer ? 
                        house.discountPrice.toLocaleString('en-US') : 
                        house.regularPrice.toLocaleString('en-US')
                    }
                    {house.type === 'rent' && ' / month'}
                </p>
                <div className="text-slate-700 flex gap-4">
                    <div className="font-bold text-xs">
                        {house.bedrooms > 1 ? `${house.bedrooms} beds` :
                        `${house.bedrooms} bed`}
                    </div>
                    <div className="font-bold text-xs">
                        {house.bathrooms > 1 ? `${house.bathrooms} baths` :
                        `${house.bathrooms} bath`}
                    </div>
                </div>
            </div>
        </div>
        </Link>
      ))}
  </div>
  </div>
  )
}

export default ListofHouses