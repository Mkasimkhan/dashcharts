import React from 'react';
import { useStateContext } from '../../contexts/ContextProvider';
import { MdOutlineCloudUpload } from "react-icons/md"
import "./StatsCard.css"

const StatsCard = ({key, icon, name, total }) => {
    const { currentColor } = useStateContext(); // Access the current color from context

    return (
        <>

            {/* <div className="container mx-auto p-6">
                <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6 mb-6"> */}
                    <div
                        className="bg-white rounded-lg shadow-md p-6 hover:shadow-lg transition duration-300"
                        style={{ borderColor: currentColor, borderWidth: 2 }}
                        // Optional: Border color
                    >
                        
                            <span className="text-3xl stats-icon" style={{ backgroundColor: currentColor }}>
                                {icon}
                            </span>
                            <h2 className="stats-heading">
                                
                               {total}
                            </h2>
                       
                        <p className="stats-p">
                        {name}
                        </p>
                    </div>
                {/* </div>
            </div> */}


        </>
    );
};

export default StatsCard;

/*
<div className = "stats-container">
           <div className = "stats-container-content">
                <span className = "stats-container-content-icon">
                    <MdOutlineCloudUpload />
                </span>
                <h6 className='stats-container-content-heading'>$4343</h6>
                <p>Banks</p>
            </div>
           </div>

*/