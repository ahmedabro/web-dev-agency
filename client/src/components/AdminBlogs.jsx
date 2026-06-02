import React from 'react'
import { useGetBlogsQuery } from '../redux/api/blogsApi'
import { Link } from 'react-router';
import { BsTags } from 'react-icons/bs';
import { IoCalendarOutline } from 'react-icons/io5';

const AdminBlogs = () => {
    const { data, isLoading, error } = useGetBlogsQuery();
    const blogs = data?.blogs || [];

    if (isLoading) return <div>Loading...</div>;
    if (error) return <div>Error fetching blogs</div>;

    console.log(blogs)

    return (
        <div>
            <Link to="/admin/blogs/create">Create New Blog</Link>
            <div>
                {blogs.map(blog => (
                    <div key={blog._id} className='w-full sm:w-[calc(50%-1.5rem)] lg:w-[calc(33.3%-1.8rem)] border-2 border-gray-700'>
                        <div className='w-full h-75 overflow-hidden'>
                            <img src={blog.images[0]} alt="" className='w-full h-full object-cover object-center' />
                        </div>
                        <div className='py-6 px-4 xl:py-8 xl:px-6'>
                            <div className='flex flex-wrap items-center justify-between mb-6'>
                                <span className="bg-dark-surface text-dark-primary px-4 py-2 rounded-full text-xs xl:text-sm font-medium flex items-center gap-2">
                                    <BsTags className='text-sm md:text-md lg:text-lg xl:text-xl' />
                                    {blog.category}
                                </span>
                                <span className="text-gray-300 text-xs xl:text-sm flex items-center gap-2"><IoCalendarOutline className='text-sm md:text-md lg:text-lg xl:text-xl' /> {blog.date}</span>
                            </div>
                            <h4 className='text-lg lg:text-xl xl:text-2xl font-semibold mb-3'>{blog.title}</h4>
                            <div id='blog-content' dangerouslySetInnerHTML={{ __html: blog.content }} />
                            <Link to={`/admin/blogs/${blog._id}/edit`} className='text-blue-500 hover:underline'>Edit</Link>
                        </div>
                    </div>
                ))}
            </div>
        </div>
    )
}

export default AdminBlogs

