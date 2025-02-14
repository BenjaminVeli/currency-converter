import { ConvertButtonProps } from "@/types";
import { IoSwapHorizontal } from "react-icons/io5";


const ConvertButton = ({ onClick }: ConvertButtonProps) => {
    return (
        <button
            onClick={onClick}
            className="group flex items-center justify-center gap-2 bg-[#18171c] rounded-sm px-10 py-1 cursor-pointer hover:bg-white border border-[#18171c] transition-all duration-500"
        >
            <IoSwapHorizontal className="transition-all duration-500 text-white group-hover:text-[#18171c]" size={20} />
            <span className="transition-all duration-500 text-white group-hover:text-[#18171c]">Enviar</span>
        </button>
    );
};

export default ConvertButton;