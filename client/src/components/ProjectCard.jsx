import React, { useRef } from 'react'
import { gsap } from "gsap";
import { Link } from 'react-router';
import { MdArrowOutward } from "react-icons/md";

const ProjectCard = ({ item, index }) => {
    const imageRefs = useRef([]);

    const handleMouseEnter = (index) => {
        const img = imageRefs.current[index];

        if (!img) return;

        const container = img.parentElement;

        // Wait until image is loaded
        if (!img.complete) return;

        const distance = Math.max(
            img.scrollHeight - container.clientHeight,
            0
        );

        gsap.killTweensOf(img);

        gsap.to(img, {
            y: -distance,
            duration: 2,
            ease: "none",
        });
    };

    const handleMouseLeave = (index) => {
        const img = imageRefs.current[index];

        if (!img) return;

        gsap.killTweensOf(img);

        gsap.to(img, {
            y: 0,
            duration: 2,
            ease: "none",
        });
    };


    return (
        <div key={item?._id} className="rounded-2xl bg-dark-secondary border-[0.5px] border-gray-600 hover:shadow-lg transition-all duration-500 group">
            <div
                onMouseEnter={() => handleMouseEnter(index)}

                onMouseLeave={() => handleMouseLeave(index)}
                className="relative w-full h-[400px] overflow-hidden rounded-t-2xl border-2 border-transparent hover:border-dark-primary hover:scale-105 transition-all duration-300"

            >

                <img

                    ref={(el) => (imageRefs.current[index] = el)}

                    src={item.image}

                    alt={item.title}

                    className="w-full"

                />

                <div className="absolute inset-0 bg-linear-to-t from-black/90 via-black/30 to-transparent"></div>
                {/* <div className="absolute inset-0 bg-gradient-to-t from-[#111111] from-5% via-black/70 via-30% via-black/30 via-60% to-transparent to-100%" /> */}

                <span className="absolute top-3 left-6 bg-black/70 text-dark-textColor border-[0.5px] border-gray-600 px-5 py-1 rounded-full text-xs font-light">
                    {item.domain}
                </span>
                <div className='absolute bottom-0 w-full flex justify-between items-center px-6 py-4 bg-black/1 backdrop-blur-xs'>
                    <div className='w-[75%]'>
                        <h3 className="text-white font-bold text-xl">{item?.title}</h3>
                        {item?.link && <Link to={item.link} target='_blank'>{item.link}</Link>}
                    </div>
                    <Link to={'/'} className='w-10 h-10 rounded-full flex items-center justify-center text-lg text-black bg-dark-primary'><MdArrowOutward /></Link>
                </div>

            </div>
            <div className='px-6 py-6'>
                {/* <p className="text-gray-400 mb-4">{item?.description}</p> */}
                <div className="flex flex-wrap gap-2">
                    {item.tags.map((tag, index) => (
                        <span key={index} className="bg-dark-background text-dark-textColor border-[0.5px] border-gray-600 px-5 py-1 rounded-full text-xs font-light">
                            {tag}
                        </span>
                    ))}
                </div>
            </div>
        </div>
    )
}

export default ProjectCard