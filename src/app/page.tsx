"use client";

import { useState, useMemo, useEffect, useRef } from "react";
import { IoChevronDownOutline, IoCloseSharp, IoSwapHorizontal } from "react-icons/io5";
import { useCurrencies } from "@/hooks/useCurrencies";

const Page = () => {
  // Estado para el primer selector (De)
  const [isOpenFrom, setIsOpenFrom] = useState(false);
  const [searchFrom, setSearchFrom] = useState("");
  const [selectedCurrencyFrom, setSelectedCurrencyFrom] = useState("");
  const [debouncedSearchFrom, setDebouncedSearchFrom] = useState("");
  const inputRefFrom = useRef<HTMLDivElement>(null);

  // Estado para el segundo selector (A)
  const [isOpenTo, setIsOpenTo] = useState(false);
  const [searchTo, setSearchTo] = useState("");
  const [selectedCurrencyTo, setSelectedCurrencyTo] = useState("");
  const [debouncedSearchTo, setDebouncedSearchTo] = useState("");
  const inputRefTo = useRef<HTMLDivElement>(null);

  const { currencies, isLoading, error } = useCurrencies();

 

  // Debounce para el primer selector
  useEffect(() => {
    const timeoutId = setTimeout(() => {
      setDebouncedSearchFrom(searchFrom);
    }, 400);
    return () => clearTimeout(timeoutId);
  }, [searchFrom]);

  // Debounce para el segundo selector
  useEffect(() => {
    const timeoutId = setTimeout(() => {
      setDebouncedSearchTo(searchTo);
    }, 400);
    return () => clearTimeout(timeoutId);
  }, [searchTo]);

  // Filtrado para el primer selector
  const filteredCurrenciesFrom = useMemo(() => {
    return currencies.filter(currency =>
      currency.code.toLowerCase().includes(debouncedSearchFrom.toLowerCase())
    );
  }, [debouncedSearchFrom, currencies]);

  // Filtrado para el segundo selector
  const filteredCurrenciesTo = useMemo(() => {
    return currencies.filter(currency =>
      currency.code.toLowerCase().includes(debouncedSearchTo.toLowerCase())
    );
  }, [debouncedSearchTo, currencies]);

  // Manejadores de click fuera para ambos selectores
  useEffect(() => {
    const handleClickOutside = (event: MouseEvent) => {
      if (inputRefFrom.current && !(inputRefFrom.current as HTMLElement).contains(event.target as Node)) {
        setIsOpenFrom(false);
      }
      if (inputRefTo.current && !(inputRefTo.current as HTMLElement).contains(event.target as Node)) {
        setIsOpenTo(false);
      }
    };

    document.addEventListener("mousedown", handleClickOutside);
    return () => {
      document.removeEventListener("mousedown", handleClickOutside);
    };
  }, [inputRefFrom, inputRefTo]);

  return (
    <div className="bg-white w-full flex justify-center items-center min-h-screen">
      <div className="container">
        <h1 className="text-4xl md:text-6xl font-medium text-center tracking-tighter text-customBlueLight">
          Convertidor de Moneda
        </h1>
        <p className="text-xl md:text-2xl text-gray-300 text-center my-3 md:my-6">
          Convertir {selectedCurrencyFrom ? selectedCurrencyFrom : "()"} a {selectedCurrencyTo ? selectedCurrencyTo : "()"}
        </p>
        <div className="flex flex-col gap-8 bg-white rounded-2xl p-6 shadow-2xl">
          <div className="gap-8 grid md:grid-cols-2 lg:grid-cols-3 grid-cols-1">
            <div className="h-[88px] rounded-lg border border-solid border-gray-300 bg-white px-4 py-2 text-xl font-semibold text-slate-900 hover:bg-gray-150">
              <label htmlFor="amount" className="text-sm font-normal text-gray-400">
                Cantidad
              </label>
              <input
                type="text"
                className="outline-none w-full"
                placeholder="Introduzca la cantidad..."
              />
            </div>

            <div ref={inputRefFrom} className="relative h-[88px] rounded-lg border border-solid border-gray-300 bg-white px-4 py-2 text-lg font-semibold hover:bg-gray-150">
              <label htmlFor="from" className="text-sm font-normal text-gray-400">
                De
              </label>
              <div className="flex items-center">
                <input
                  type="text"
                  value={searchFrom}
                  onChange={(e) => setSearchFrom(e.target.value)}
                  className="outline-none w-full"
                  placeholder="Introduzca la moneda..."
                  onFocus={() => setIsOpenFrom(true)}
                />
                <button onClick={() => setIsOpenFrom(!isOpenFrom)} className="ml-2 cursor-pointer">
                  {isOpenFrom ? (
                    <IoCloseSharp className="text-customBlueLight" size={20} />
                  ) : (
                    <IoChevronDownOutline className="text-customBlueLight" size={20} />
                  )}
                </button>
              </div>

              {isOpenFrom && (
                <div className="absolute left-0 right-0 top-[90px] bg-white border border-gray-300 rounded-lg shadow-lg z-10 max-h-48 overflow-y-auto">
                  {filteredCurrenciesFrom.length > 0 ? (
                    filteredCurrenciesFrom.map((currency) => (
                      <div
                        key={currency.code}
                        className="px-4 py-2 hover:bg-sky-400 cursor-pointer"
                        onClick={() => {
                          setSelectedCurrencyFrom(currency.code);
                          setSearchFrom(currency.code);
                          setIsOpenFrom(false);
                        }}
                      >
                        <span className="text-slate-700">{currency.code}</span>
                      </div>
                    ))
                  ) : (
                    <span className="block px-4 py-2 text-slate-700 text-center">Sin opciones</span>
                  )}
                </div>
              )}
            </div>

            <div ref={inputRefTo} className="relative h-[88px] rounded-lg border border-solid border-gray-300 bg-white px-4 py-2 text-lg font-semibold hover:bg-gray-150">
              <label htmlFor="to" className="text-sm font-normal text-gray-400">
                A
              </label>
              <div className="flex items-center">
                <input
                  type="text"
                  value={searchTo}
                  onChange={(e) => setSearchTo(e.target.value)}
                  className="outline-none w-full"
                  placeholder="Introduzca la moneda..."
                  onFocus={() => setIsOpenTo(true)}
                />
                <button onClick={() => setIsOpenTo(!isOpenTo)} className="ml-2 cursor-pointer">
                  {isOpenTo ? (
                    <IoCloseSharp className="text-customBlueLight" size={20} />
                  ) : (
                    <IoChevronDownOutline className="text-customBlueLight" size={20} />
                  )}
                </button>
              </div>

              {isOpenTo && (
                <div className="absolute left-0 right-0 top-[90px] bg-white border border-gray-300 rounded-lg shadow-lg z-10 max-h-48 overflow-y-auto">
                  {filteredCurrenciesTo.length > 0 ? (
                    filteredCurrenciesTo.map((currency) => (
                      <div
                        key={currency.code}
                        className="px-4 py-2 hover:bg-sky-400 cursor-pointer"
                        onClick={() => {
                          setSelectedCurrencyTo(currency.code);
                          setSearchTo(currency.code);
                          setIsOpenTo(false);
                        }}
                      >
                        <span className="text-slate-700">{currency.code}</span>
                      </div>
                    ))
                  ) : (
                    <span className="block px-4 py-2 text-slate-700 text-center">Sin opciones</span>
                  )}
                </div>
              )}
            </div>
          </div>

          <div className="flex flex-col md:flex-row justify-between w-full gap-8">
            <p className="text-2xl text-slate-900 font-semibold w-full md:w-auto text-center md:text-left">
              (Resultado acá)
            </p>

            <button className="group flex items-center justify-center gap-2 bg-[#18171c] rounded-sm px-10 py-1 cursor-pointer hover:bg-white border border-[#18171c] transition-all duration-500">
              <IoSwapHorizontal className="transition-all duration-500 text-white group-hover:text-[#18171c]" size={20} />
              <span className="transition-all duration-500 text-white group-hover:text-[#18171c]">Enviar</span>
            </button>
          </div>
        </div>
      </div>
    </div>
  );
};

export default Page;