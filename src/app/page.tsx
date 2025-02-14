// Page.tsx
"use client";

import { useState } from "react";
import CurrencySelect from "@/components/CurrencySelect";
import AmountInput from "@/components/AmountInput";
import ConvertButton from "@/components/ConvertButton";
import { useCurrencies } from "@/hooks/useCurrencies";

const Page = () => {
  const [amount, setAmount] = useState("");
  const [selectedCurrencyFrom, setSelectedCurrencyFrom] = useState("");
  const [selectedCurrencyTo, setSelectedCurrencyTo] = useState("");
  const { currencies, isLoading, error } = useCurrencies();
  const [convertedAmount, setConvertedAmount] = useState<number | null>(null);
  const [showResult, setShowResult] = useState(false);

  const convertCurrency = () => {
    const fromCurrency = currencies.find(c => c.code === selectedCurrencyFrom);
    const toCurrency = currencies.find(c => c.code === selectedCurrencyTo);

    if (fromCurrency && toCurrency) {
      const amountValue = parseFloat(amount);
      if (!isNaN(amountValue)) {
        const result = amountValue * (toCurrency.value / fromCurrency.value);
        setConvertedAmount(result);
        setShowResult(true);
      } else {
        setConvertedAmount(null);
        setShowResult(false);
      }
    }
  };
  const handleConvert = () => {
    convertCurrency();
  };

  if (error) return <div>{error}</div>;

  return (
    <div className="bg-white w-full flex justify-center items-center min-h-screen">
      <div className="container">
        <h1 className="text-4xl md:text-6xl font-medium text-center tracking-tighter text-customBlueLight">
          Convertidor de Moneda
        </h1>
        <p className="text-xl md:text-2xl text-gray-300 text-center my-3 md:my-6">
          Convertir {selectedCurrencyFrom || "-"} a {selectedCurrencyTo || "-"}
        </p>

        <div className="flex flex-col gap-8 bg-white rounded-2xl p-6 shadow-2xl">
          <div className="gap-8 grid md:grid-cols-2 lg:grid-cols-3 grid-cols-1">
            <AmountInput
              value={amount}
              onChange={setAmount}
            />

            <CurrencySelect
              label="De"
              value={selectedCurrencyFrom}
              onChange={setSelectedCurrencyFrom}
              currencies={currencies}
              isLoading={isLoading}
            />

            <CurrencySelect
              label="A"
              value={selectedCurrencyTo}
              onChange={setSelectedCurrencyTo}
              currencies={currencies}
              isLoading={isLoading}
            />
          </div>

          <div className="flex flex-col md:flex-row justify-center md:justify-between w-full gap-8 items-center">
            <div className="text-center md:text-left">
              <p className="text-base text-gray-500 font-semibold">Monto {showResult ? `${amount} ${selectedCurrencyFrom} =` : "De ="}</p>
              <p className="text-2xl text-slate-900 font-semibold w-full md:w-auto">
                {convertedAmount !== null ? convertedAmount.toFixed(2) : "Resultado"}
              </p>
            </div>
            <ConvertButton onClick={handleConvert} />
          </div>

        </div>
      </div>
    </div>
  );
};

export default Page;