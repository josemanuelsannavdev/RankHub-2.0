const BottomLink = () => {
  return (
    <div className="text-center mt-8">
      <p className="text-slate-400 text-sm">
        ¿Aun no tienes cuenta?
        <a
          href="#"
          className="
            text-primary
            font-bold
            hover:text-yellow-200
            transition-colors
            ml-1
            uppercase
            text-xs
            tracking-tight
          "
        >
          Register
        </a>
      </p>
    </div>
  );
};

export default BottomLink;
