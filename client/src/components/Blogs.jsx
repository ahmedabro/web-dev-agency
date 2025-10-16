import React from 'react'
import { BsTags } from "react-icons/bs";
import { IoCalendarOutline } from "react-icons/io5";
import { Link } from 'react-router'
import { GoArrowUpRight } from "react-icons/go";
import { MdArrowOutward } from "react-icons/md";
import { useLocation } from 'react-router';

const ALLBlogs = [
  {
    id: 1,
    category: "React",
    date: "2023-10-01",
    images: ["https://randomuser.me/api/portraits/men/4.jpg"],                
    title: "Understanding React",
    content: "<p>React is a JavaScript library for building user interfaces using components and virtual DOM.</p>"
  },
    {
    id: 2,
    category: "JavaScript",
    date: "2023-09-15",
    images: ["https://randomuser.me/api/portraits/men/5.jpg"],                
    title: "JavaScript Basics",
    content: "<p>JavaScript is a versatile programming language.</p>"
    },
    {
    id: 3,
    category: "CSS",
    date: "2023-08-20",
    images: ["https://randomuser.me/api/portraits/men/6.jpg"],
    title: "CSS Flexbox",
    content: "<p>CSS Flexbox is a layout model that allows items to be aligned and distributed within a container.</p>"
  },
    {
    id: 4,
    category: "Node.js",
    date: "2023-07-30",
    images: ["https://randomuser.me/api/portraits/men/7.jpg"],
    title: "Node.js for Beginners",
    content: "<p>Node.js is a JavaScript runtime built on Chrome's V8 JavaScript engine.</p>"
  },
    {
    id: 5,
    category: "Web Development",
    date: "2023-06-25",
    images: ["https://randomuser.me/api/portraits/men/8.jpg"],
    title: "Web Development Trends",
    content: "<p>Stay updated with the latest trends in web development.</p>"
  }
]

const Blogs = () => {
  const location = useLocation();
  const blogs = location.pathname === '/blogs' ? ALLBlogs : ALLBlogs.slice(0, 3);
  return (
    <div className='section-container'>
        <div className='section-header'>
        <h3 className='section-subheading'>Blogs</h3>
        <h2 className='section-mainheading'>Latest Articles & Insights</h2>
      </div>
        
      <div className='flex flex-wrap justify-center gap-7 lg:gap-5 xl:gap-10'>
        { blogs.map(blog => (
        <div key={blog.id} className='w-full sm:w-[calc(50%-2.5rem)] lg:w-[calc(34%-2.5rem)] border-2 border-gray-700'>
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
            <Link to={`/blogs/${blog.id}`} className='text-dark-primary font-semibold inline-flex gap-2 items-center border-b'>Read More <GoArrowUpRight /></Link>
            </div>
        </div>
      ))}
      </div>
      {location.pathname !== '/blogs' && (
        <div className='flex justify-center mt-20'>
          <Link to="blogs" className='theme-button group'>View All <MdArrowOutward className='text-xl group-hover:rotate-45 transition-rotate duration-300 ease-in-out' /></Link>
        </div>
      )}
    </div>
  )
}


export default Blogs
