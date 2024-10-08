import React, { useEffect, useState } from 'react';
import axios from 'axios'
import { toast } from 'react-toastify';
import { DeleteButton, Header } from '../../components';
import { useNavigate } from 'react-router-dom'
import Layout from '../../layout/Layout';
import { Link } from 'react-router-dom'
import { API_ENDPOINT } from '../../constant/constant';
import "./Blogs.css"


const Blogs = () => {
    const [blogData, setBlogData] = useState([])
    const navigate = useNavigate()
   
    const getBlogs = () => {
        axios.get(`${API_ENDPOINT}/all-blogs`)
            .then((response) => {
                // console.log(response.data)
                setBlogData(response.data.blogs)
            })
            .catch((e) => {
                console.log("Getting Blogs Error", e)
            })
    }

    useEffect(() => {
        getBlogs()
    }, []);

    const deleteBlogs = () => {
        const confirmation=window.confirm("Do you want to delete all?")
       if(confirmation){
        axios.delete(`${API_ENDPOINT}/delete-blogs`)   
            .then((response) => {
                console.log("delete")
                toast.success("All blogs deleted successfully", {
                    autoClose: 4000,
                    position: toast.POSITION.BOTTOM_LEFT
                })
                navigate("/dashboard")
            })
            .catch((e) => {
                console.log("delete error", e)
                toast.error("Something went wrong", {
                    autoClose: 4000,
                    position: toast.POSITION.BOTTOM_LEFT
                })
            })
       }
    }

   
    return (
        <>
            <Layout>
            <div className="m-2 md:m-10 mt-24 p-2 md:p-10 bg-white rounded-3xl">
                    <Header category="Page" title="Blogs" />
                    <DeleteButton
                        title="Delete Blogs"
                        function={deleteBlogs}
                    />
                    <div >
                       
                    <div className="header_fixed">
              <table>
                <thead className='header_fixed_table_thread' >
                  <tr className="header_fixed_table_cell">
                    <th>Image</th>
                    <th>Title</th>
                    <th>Description</th>
                    <th>Edit</th>
                  </tr>
                </thead>
                <tbody>
                 
                    {
                      blogData.length === 0 ? (<div className='text-center mt-10'>No Blogs to show!</div>) : (
                        blogData.map((item, index) =>
                        <tr key={index} className="header_fixed_table_iter_div">
                          
                            <td><img src={item.image.myFile} alt="blog-picture" /></td>
                            <td>{item.title.length > 8 ? `${item.title.substring(0, 10)}...` : item.title}</td>
                            <td  dangerouslySetInnerHTML = {{__html: item.description.length > 4 ? `${item.description.substring(0, 10)}...` : item.description}}></td>
                            <td><Link to={`/edit-blog/${item._id}`}>Edit</Link></td>
                        
                  </tr>
                        )
                      )
                    }
                </tbody>
              </table>
            </div>

                    </div>
                </div>
            </Layout>
        </>




    )
};

export default Blogs