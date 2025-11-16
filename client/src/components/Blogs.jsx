import React from 'react'
import { BsTags } from "react-icons/bs";
import { IoCalendarOutline } from "react-icons/io5";
import { Link } from 'react-router'
import { GoArrowUpRight } from "react-icons/go";
import { MdArrowOutward } from "react-icons/md";
import { useLocation } from 'react-router';
import { useGetBlogsQuery } from '../redux/api/blogsApi';



const Blogs = () => {
  const location = useLocation();

  const { data, isLoading, isError, error } = useGetBlogsQuery();
  const ALLBlogs = data?.blogs || [];

  const blogs = location.pathname === '/blogs' ? ALLBlogs : ALLBlogs.slice(0, 3);

  if (isLoading) return <div>Loading...</div>;
  if (isError) return <div>Error: {error.message}</div>;

  return (
    <div className='section-container'>
        <div className='section-header'>
        <h3 className='section-subheading'>Blogs</h3>
        <h2 className='section-mainheading'>Latest Articles & Insights</h2>
      </div>
        
      <div className='flex flex-wrap justify-center gap-6 sm:gap-5 lg:gap-5 xl:gap-10'>
        { blogs.map(blog => (
        <div key={blog.id} className='w-full sm:w-[calc(50%-1.5rem)] lg:w-[calc(33.3%-1.8rem)] border-2 border-gray-700'>
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
            <Link to={`/blogs/${blog._id}`} className='text-dark-primary font-semibold inline-flex gap-2 items-center border-b'>Read More <GoArrowUpRight /></Link>
            </div>
        </div>
      ))}
      </div>
      {location.pathname !== '/blogs' && (
        <div className='flex justify-center mt-20'>
          <Link to="blogs" className='theme-button group'>View All <MdArrowOutward className='text-base xl:text-xl group-hover:rotate-45 transition-rotate duration-300 ease-in-out' /></Link>
        </div>
      )}
    </div>
  )
}


export default Blogs
