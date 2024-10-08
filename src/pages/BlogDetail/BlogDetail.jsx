import React, { useState, useEffect } from 'react'
import { useParams, useNavigate } from 'react-router-dom'
import { DeleteButton, Header } from '../../components'
import axios from 'axios'
import { toast } from 'react-toastify'
import Layout from '../../layout/Layout';
import { API_ENDPOINT } from '../../constant/constant'

const BlogDetail = () => {
    const param = useParams()
    const id = param.id
    const [data, setData] = useState([])
    const [file, setFile] = useState("")
    const navigate = useNavigate()


    const blogDetail = () => {
        axios.get(`${API_ENDPOINT}/get-single-blog/${id}`)
            .then((response) => {
                setData(response.data.blog)
                setFile(response.data.blog.image.myFile)
                // console.log(response.data.blog.image.myFile)
                // console.log(response.data.blog)
            })
            .catch((e) => {
                console.log(e)
            })
    }
    const { title, description, tags } = data
    useEffect(() => {
        blogDetail()
    }, [])

    const deleteSingleBlog = () => {
        axios.delete(`${API_ENDPOINT}/delete-blog/${id}`,
            {
                headers: {
                Authorization: `${localStorage.getItem("authToken")}`
            }
        })
            .then((response) => {
                toast.success("Blog  deleted successfully", {
                    autoClose: 4000,
                    position: toast.POSITION.BOTTOM_LEFT
                })
                navigate("/all-blogs")
            })
            .catch((e) => {
                toast.error("Something went wrong", {
                    autoClose: 4000,
                    position: toast.POSITION.BOTTOM_LEFT
                })
            })
    }



    return (
        <>
            <Layout>
                <div className="m-2 md:m-10 mt-24 p-2 md:p-10 bg-white rounded-3xl">
                    <Header category="Page" title="Blog Detail" />
                    <DeleteButton
                        title="Delete Form"
                        function={deleteSingleBlog}
                    />
                    <div className='bg-gray-200 p-3 rounded-2xl'>
                        <div className="m-2">
                            <h5 className='text-black text-2xl uppercase'>Title</h5>
                            <p className="text-gray-800">{title}</p>
                        </div>
                        <div className="m-2">
                            <h5 className='text-black text-2xl uppercase'>Description</h5>
                            <p className="text-gray-800" dangerouslySetInnerHTML={{ __html: description }} ></p>
                        </div>
                        <div className="m-2">
                            <h5 className='text-black text-2xl uppercase'>Tags</h5>
                           {
                           Array.isArray(tags) ?
                           tags.map((tag, index) => 
                            <p className="text-gray-800" key = {index}>{index + 1}: {tag}</p>
                            ): null
                           }
                        </div>

                        <div className="m-2">
                            <h5 className='text-black text-2xl uppercase'>Image</h5>
                            <img src={file} alt="blog-picture" style={{
                                height: "200px",
                                width: "200px",
                                borderRadius: "8px"
                            }} />
                        </div>
                    </div>

                </div>
            </Layout>
        </>
    )
}

export default BlogDetail