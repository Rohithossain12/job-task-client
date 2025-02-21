const DesignTaskCard = ({ text, bg, count }) => {
  return (
    <div className={`${bg} flex items-center   justify-center p-4 rounded-md text-white`}>
      {text}
      <div className="ml-4 bg-white w-5 h-5 text-black rounded-full flex items-center justify-center">
        {count}
      </div>
    </div>
  );
};

export default DesignTaskCard;
