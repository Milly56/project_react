type CategoriaMenuProps = {
  titulo?: string;
  icon: string;
  onClick?: () => void;
};

export default function CategoriaMenu({
  titulo,
  icon, 
  onClick
}: CategoriaMenuProps) {
  return(
    <div className="w-[160px] cursor-pointer"
      onClick={() => {
        if (onClick) {
          onClick();
        }
      }}
    >
      <img 
        alt={`ícone de ${titulo}`}
        src={icon}
        className="w-full h-auto"
      />
    </div>
  );
}