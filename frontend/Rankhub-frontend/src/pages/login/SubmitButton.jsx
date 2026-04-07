const SubmitButton = () => {
  return (
    <button
      type="submit"
      className="
        w-full
        bg-primary
        text-on-primary
        font-black
        uppercase
        tracking-widest
        py-4
        rounded-xl
        shadow-[0_4px_20px_rgba(249,245,6,0.3)]
        hover:shadow-[0_4px_30px_rgba(249,245,6,0.5)]
        hover:brightness-110
        active:scale-95
        transition-all
        duration-150
        mt-4
      "
    >
      Login
    </button>
  );
};

export default SubmitButton;