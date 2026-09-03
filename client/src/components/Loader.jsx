const Loader = () => {
  return (
    <div className="flex min-h-[200px] w-full items-center justify-center">
      <div className="relative flex h-20 w-20 items-center justify-center">

        {/* Outer rotating ring */}
        <div
          className="
            absolute inset-0
            rounded-full
            border-2
            border-white/10
            border-t-[#37e062]
            animate-spin
          "
        />

        {/* Inner glow */}
        <div
          className="
            absolute
            h-12 w-12
            rounded-full
            bg-[#37e062]/5
            shadow-[0_0_35px_rgba(55,224,98,0.15)]
            animate-pulse
          "
        />

        {/* Logo */}
        {/* <span className="relative z-10 text-lg font-black tracking-tighter">
          <span className="text-white">A.F</span>
          <span className="text-[#37e062]"> Dev</span>
        </span> */}

      </div>
    </div>
  );
};

export default Loader;