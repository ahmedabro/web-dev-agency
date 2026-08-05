import Marquee from 'react-fast-marquee'

const items = [
  "Web Applications",
  "Mobile Applications",
  "Custom Software",
  "Landing Pages",
  "Dasboards",
  "Ecommerce",
];

const Strip = () => {

  return (
    <section className="px-0! overflow-hidden border-y-[0.5px] border-dark-primary py-7">
      <Marquee speed={40} gradient={false} autoFill={true}>
        {items.map((item, index) => (
          <div
            key={index}
            className="flex items-center gap-10"
          >
            <span className="text-sm font-bold tracking-widest text-gray-400 uppercase">
              {item}
            </span>

            <span className="text-dark-primary text-lg mr-10">✦</span>
          </div>
        ))}
      </Marquee>
    </section>
  );
}

export default Strip