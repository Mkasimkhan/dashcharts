import React from 'react'
import { Link } from 'react-router-dom'
import { useStateContext } from '../../contexts/ContextProvider';
import { IoPersonAddOutline } from "react-icons/io5";


export const DeleteButton = (props) => {
    return (
        <>
            <div className="px-4 py-3 text-right sm:px-6">
                <button type="submit" className="inline-flex justify-center rounded-md border border-transparent bg-red-600 py-2 px-4 text-sm font-medium text-white shadow-sm hover:bg-indigo-700 focus:outline-none focus:ring-2 focus:indigo-indigo-500 focus:ring-offset-2 mx-3" style={{
                    backgroundColor: "red"
                }} onClick={props.function}>{props.title}</button>
            </div>
        </>
    )
}

export const ModalButton = (props) => {
    const { currentColor } = useStateContext(); // Get the current color and theme

    return (
        <>
             <button
            onClick={props.onClick} // Call onClick when button is clicked
            className={`flex items-center justify-center gap-2 bg-[${currentColor}] hover:bg-[${currentColor}] text-sm py-2 px-8 rounded hover:drop-shadow-xl transition-all duration-300`}
            style={{
                backgroundColor: currentColor, // Set currentColor for background
                color: "#fff" 
            }}
        >
        {props.icon ? props.icon : <IoPersonAddOutline className="text-xl" /> }
            {/* <IoPersonAddOutline className="text-xl" /> */}
            {props.title}
        </button>
        </>
    );
};
export const SecondaryButton = (props) => {
    const { currentColor } = useStateContext(); // Get the current color and theme

    return (
        <>
            <Link to= {props.redirect}>
                <button
                    className={`flex items-center justify-center gap-2 bg-[${currentColor}] hover:bg-[${currentColor}] text-sm py-2 px-5 rounded hover:drop-shadow-xl transition-all duration-300`}
                    style={{
                        backgroundColor: currentColor, // Set currentColor for background
                        color: "#fff" // Conditional text color
                    }}
                >
                    <IoPersonAddOutline className="text-xl text-[#fff]" /> {/* Icon before the text */}
                    {props.title}
                </button>
            </Link>
        </>
    );
};

export default DeleteButton