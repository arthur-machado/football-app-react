import { useNavigate } from "react-router-dom";

interface Props {
  id: string;
  imageSrc: string;
  title: string;
}

export function Card({ imageSrc, title, id }: Props) {
  const navigate = useNavigate();

  return (
    <div
      role="button"
      onClick={() => navigate(`/standings/${id}`)}
      className="flex flex-col gap-3 justify-center items-center p-3 rounded-sm bg-neutral-50 drop-shadow-md hover:drop-shadow-lg cursor-pointer"
    >
      <img src={imageSrc} alt={title} />
      <h3 className="text-gray-800 font-medium text-center">{title}</h3>
    </div>
  );
}
