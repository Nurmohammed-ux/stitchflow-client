import logo from "../../assets/logo.png"

const Loading = () => {
  return (
    <div className="min-h-screen flex items-center justify-center bg-white">
      <div className="flex flex-col items-center">
        <div className="relative w-25 h-25 flex items-center justify-center">
          <div className="absolute inset-0 rounded-full border-2 border-[#062746]/10" />

          <div className="absolute inset-0 rounded-full border-2 border-transparent border-t-[#85AD20] border-r-[#85AD20] animate-spin" />

          <img src={logo} alt="StitchFlow" />
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
