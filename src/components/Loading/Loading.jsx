const Loading = () => {
  return (
    <div className="min-h-screen flex items-center justify-center bg-white">
      <div className="flex flex-col items-center">
        <div className="relative w-20 h-20 flex items-center justify-center">
          <div className="absolute inset-0 rounded-full border-4 border-[#062746]/10" />

          <div className="absolute inset-0 rounded-full border-4 border-transparent border-t-[#85AD20] border-r-[#85AD20] animate-spin" />

          <span className="text-3xl font-bold text-[#062746]">S</span>
        </div>

        <h2 className="mt-4 text-2xl font-bold tracking-tight">
          <span className="text-[#062746]">Stitch</span>
          <span className="text-[#85AD20]">Flow</span>
        </h2>

        <p className="mt-1 text-xs tracking-[0.25em] text-gray-400">
          TRACK • MANAGE • DELIVER
        </p>
      </div>
    </div>
  );
};

export default Loading;
