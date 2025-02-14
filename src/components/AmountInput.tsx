import { AmountInputProps } from "@/types";

const AmountInput = ({ value, onChange }: AmountInputProps) => {
    return (
        <div className="h-[88px] rounded-lg border border-solid border-gray-300 bg-white px-4 py-2 text-xl font-semibold text-slate-900 hover:bg-gray-150">
            <label className="text-sm font-normal text-gray-400">
                Cantidad
            </label>
            <input
                type="text"
                value={value}
                onChange={(e) => onChange(e.target.value)}
                className="outline-none w-full"
                placeholder="Introduzca la cantidad..."
            />
        </div>
    );
};

export default AmountInput;