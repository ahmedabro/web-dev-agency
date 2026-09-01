import Marquee from 'react-fast-marquee'

const items = [
  "Web Applications",
  "Mobile Applications",
  "Custom Software",
  "Landing Pages",
  "Dashboards",
  "Ecommerce",
];

const Strip = () => {

  return (
    <section className="px-0! overflow-hidden border-y border-white/20 py-7">
      <Marquee speed={40} gradient={false} autoFill={true}>
        {items.map((item, index) => (
          <div
            key={index}
            className="flex items-center gap-15"
          >
            <span className="text-base font-bold tracking-widest text-gray-400 uppercase">
              {item}
            </span>

            <span className="text-dark-primary text-2xl mr-15">✦</span>
          </div>
        ))}
      </Marquee>
    </section>
  );
}

export default Strip