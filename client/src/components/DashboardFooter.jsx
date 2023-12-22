import  { useState } from 'react';
import { Link } from 'react-router-dom';

const DashboardFooter = () => {
  const [offerListings, setOfferListings] = useState([]);

  return (
    <footer className='bg-slate-900'>
       <div className="sm:flex grid grid-col-3 justify-between items-center max-w-6xl mx-auto p-3">
         <div className=''>
            <Link to='/'>
                <h1 className='font-bold text-sm sm:text-3xl flex flex-wrap'>
                    <span className='text-slate-200'>Big</span>
                    <span className='text-slate-500'>Estate</span>
                </h1>
            </Link>

            <div className='text-slate-200 w-[500px] my-3'>
                Lorem ipsum dolor, sit amet consectetur adipisicing elit. Necessitatibus exercitationem totam earum, natus impedit consequuntur atque in. Distinctio impedit officia ad cum voluptatum, laborum veniam, molestias dicta reprehenderit nulla quam?
            </div>
         </div>
         <div>
            1
         </div>
         <div>
            1
         </div>
         <div>
            1
         </div>
       </div>
    </footer>
  );
};

export default DashboardFooter;