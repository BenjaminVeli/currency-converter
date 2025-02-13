"use client";

import { useState, useMemo, useEffect, useRef } from "react";
import { IoChevronDownOutline, IoCloseSharp } from "react-icons/io5";

const Page = () => {
  const [isOpen, setIsOpen] = useState(false);
  const [search, setSearch] = useState("");
  const [debouncedSearch, setDebouncedSearch] = useState("");
  const [currencies] = useState(["Uno", "Dos", "Tres", "Cuatro"]);
  const [selectedCurrency, setSelectedCurrency] = useState("");
  const inputRef = useRef(null);

  // Implementamos el debounce
  useEffect(() => {
    const timeoutId = setTimeout(() => {
      setDebouncedSearch(search);
    }, 400); // 400ms delay

    return () => clearTimeout(timeoutId);
  }, [search]);

  // Ahora useMemo solo se ejecuta cuando debouncedSearch cambia
  const filteredCurrencies = useMemo(() => {
    console.log("Filtrando monedas...");
    return currencies.filter(currency =>
      currency.toLowerCase().includes(debouncedSearch.toLowerCase())
    );
  }, [debouncedSearch, currencies]);

  const toggleItems = () => setIsOpen(!isOpen);

  // Maneja el clic fuera del input
  useEffect(() => {
    const handleClickOutside = (event) => {
      if (inputRef.current && !inputRef.current.contains(event.target)) {
        setIsOpen(false);
      }
    };

    document.addEventListener("mousedown", handleClickOutside);
    return () => {
      document.removeEventListener("mousedown", handleClickOutside);
    };
  }, [inputRef]);

  return (
    <div className="bg-white w-full flex justify-center items-center min-h-screen">
      <div className="container">
        <h1 className="text-4xl md:text-6xl font-medium text-center tracking-tighter text-customBlueLight">
          Convertidor de Moneda
        </h1>
        <p className="text-xl md:text-2xl text-gray-300 text-center my-3 md:my-6">
          Convertir {selectedCurrency ? selectedCurrency : "()"} a ()
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
                placeholder="Escribe la cantidad..."
              />
            </div>

            <div ref={inputRef} className="relative h-[88px] rounded-lg border border-solid border-gray-300 bg-white px-4 py-2 text-lg font-semibold text-greyblue-400 hover:bg-gray-150">
              <label htmlFor="to" className="text-sm font-normal text-gray-400">
                De
              </label>
              <div className="flex items-center">
                <input
                  type="text"
                  value={search}
                  onChange={(e) => setSearch(e.target.value)}
                  className="outline-none w-full"
                  placeholder="Escribe la moneda..."
                  onFocus={toggleItems} // Abre el filtrado al enfocar el input
                />
                <button onClick={toggleItems} className="ml-2 cursor-pointer">
                  {isOpen ? (
                    <IoCloseSharp className="text-customBlueLight" size={20} />
                  ) : (
                    <IoChevronDownOutline className="text-customBlueLight" size={20} />
                  )}
                </button>
              </div>

              {isOpen && (
                <div className="absolute left-0 right-0 top-[90px] bg-white border border-gray-300 rounded-lg shadow-lg z-10 max-h-48 overflow-y-auto">
                  {filteredCurrencies.map((currency) => (
                    <div
                      key={currency}
                      className="px-4 py-2 hover:bg-sky-400 cursor-pointer"
                      onClick={() => {
                        setSelectedCurrency(currency);
                        setSearch(currency);
                        setIsOpen(false);
                      }}
                    >
                      {currency}
                    </div>
                  ))}
                </div>
              )}
            </div>

            <div ref={inputRef} className="relative h-[88px] rounded-lg border border-solid border-gray-300 bg-white px-4 py-2 text-lg font-semibold text-greyblue-400 hover:bg-gray-150">
              <label htmlFor="to" className="text-sm font-normal text-gray-400">
                A
              </label>
              <div className="flex items-center">
                <input
                  type="text"
                  value={search}
                  onChange={(e) => setSearch(e.target.value)}
                  className="outline-none w-full"
                  placeholder="Escribe la moneda..."
                  onFocus={toggleItems} // Abre el filtrado al enfocar el input
                />
                <button onClick={toggleItems} className="ml-2 cursor-pointer">
                  {isOpen ? (
                    <IoCloseSharp className="text-customBlueLight" size={20} />
                  ) : (
                    <IoChevronDownOutline className="text-customBlueLight" size={20} />
                  )}
                </button>
              </div>

              {isOpen && (
                <div className="absolute left-0 right-0 top-[90px] bg-white border border-gray-300 rounded-lg shadow-lg z-10 max-h-48 overflow-y-auto">
                  {filteredCurrencies.map((currency) => (
                    <div
                      key={currency}
                      className="px-4 py-2 hover:bg-sky-400 cursor-pointer"
                      onClick={() => {
                        setSelectedCurrency(currency);
                        setSearch(currency);
                        setIsOpen(false);
                      }}
                    >
                      {currency}
                    </div>
                  ))}
                </div>
              )}
            </div>
          </div>

          <div className="flex flex-col md:flex-row justify-between w-full gap-8">
            <p className="text-2xl text-slate-900 font-semibold w-full md:w-auto">
              (Resultado acá)
            </p>
            <button className="bg-[#18171c] rounded-sm px-10 py-1 cursor-pointer hover:bg-white border border-[#18171c] transition-all duration-500 text-white hover:text-[#18171c]">
              Enviar
            </button>
          </div>
        </div>
      </div>
    </div>
  );
};

export default Page;