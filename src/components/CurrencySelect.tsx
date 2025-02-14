import { useState, useEffect, useRef, useMemo } from "react";
import { IoChevronDownOutline, IoCloseSharp } from "react-icons/io5";
import { CurrencySelectProps } from "@/types";
import Image from "next/image";
import { IoFlag } from "react-icons/io5";

const CurrencySelect = ({ label, onChange, currencies, isLoading }: CurrencySelectProps) => {
    const [isOpen, setIsOpen] = useState(false);
    const [search, setSearch] = useState("");
    const [debouncedSearch, setDebouncedSearch] = useState("");
    const inputRef = useRef<HTMLDivElement>(null);

    useEffect(() => {
        const timeoutId = setTimeout(() => {
            setDebouncedSearch(search);
        }, 400);
        return () => clearTimeout(timeoutId);
    }, [search]);

    useEffect(() => {
        const handleClickOutside = (event: MouseEvent) => {
            if (inputRef.current && !inputRef.current.contains(event.target as Node)) {
                setIsOpen(false);
            }
        };

        document.addEventListener("mousedown", handleClickOutside);
        return () => document.removeEventListener("mousedown", handleClickOutside);
    }, []);

    const filteredCurrencies = useMemo(() => {
        return currencies.filter(currency =>
            currency.code.toLowerCase().includes(debouncedSearch.toLowerCase())
        );
    }, [debouncedSearch, currencies]);

    return (
        <div ref={inputRef} className="relative h-[88px] rounded-lg border border-solid border-gray-300 bg-white px-4 py-2 text-lg font-semibold hover:bg-gray-150">
            <label className="text-sm font-normal text-gray-400">
                {label}
            </label>
            <div className="flex items-center">
                <input
                    type="text"
                    value={search}
                    onChange={(e) => setSearch(e.target.value)}
                    className="outline-none w-full"
                    placeholder="Introduzca la moneda..."
                    onFocus={() => setIsOpen(true)}
                />
                <button onClick={() => setIsOpen(!isOpen)} className="ml-2 cursor-pointer">
                    {isOpen ? (
                        <IoCloseSharp className="text-customBlueLight" size={20} />
                    ) : (
                        <IoChevronDownOutline className="text-customBlueLight" size={20} />
                    )}
                </button>
            </div>

            {isOpen && (
                <div className="absolute left-0 right-0 top-[90px] bg-white border border-gray-300 rounded-lg shadow-lg z-10 max-h-48 overflow-y-auto">
                    {isLoading ? (
                        <span className="block px-4 py-2 text-slate-700 text-center">Cargando monedas...</span>
                    ) : filteredCurrencies.length > 0 ? (
                        filteredCurrencies.map((currency) => (
                            <div
                                key={currency.code}
                                className="px-4 py-2 hover:bg-sky-400 cursor-pointer flex gap-x-4"
                                onClick={() => {
                                    onChange(currency.code);
                                    setSearch(currency.code);
                                    setIsOpen(false);
                                }}
                            >
                                <Image
                                    src={`https://www.xe.com/svgs/flags/${currency.code.toLowerCase()}.static.svg`}
                                    alt={`${currency.code} flag`}
                                    width={24}
                                    height={16}
                                    loader={({ src }) => src}
                                />
                                <span className="text-slate-700">{currency.code}</span>
                            </div>
                        ))
                    ) : (
                        <span className="block px-4 py-2 text-slate-700 text-center">Sin opciones</span>
                    )}
                </div>
            )}
        </div>
    );
};

export default CurrencySelect;