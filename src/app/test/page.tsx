"use client";

import { useState } from "react";

export default function Home() {
    const [currencies, setCurrencies] = useState<{ code: string; value: number }[]>([]);
    const [loading, setLoading] = useState(false);

    const fetchCurrencies = async () => {
        setLoading(true);
        try {
            const response = await fetch("/api/currency"); // Llamamos a nuestra API local
            const data = await response.json();

            if (data?.data) {
                const currencyArray = Object.entries(data.data).map(([code, currency]) => ({
                    code,
                    value: (currency as { value: number }).value, // Aseguramos que 'currency' tiene 'value'
                }));
                setCurrencies(currencyArray);
            }
        } catch (error) {
            console.error("Error al obtener datos:", error);
        } finally {
            setLoading(false);
        }
    };

    return (
        <div className="p-6">
            <h1 className="text-2xl font-bold mb-4">Conversor de Monedas</h1>
            <button
                onClick={fetchCurrencies}
                className="bg-blue-500 text-white px-4 py-2 rounded"
                disabled={loading}
            >
                {loading ? "Cargando..." : "Obtener Monedas"}
            </button>

            {/* Mostrar resultados */}
            {currencies.length > 0 && (
                <ul className="mt-4">
                    {currencies.map((currency, index) => (
                        <li key={index} className="border p-2 mb-2">
                            <strong>{currency.code}</strong>: {currency.value}
                        </li>
                    ))}
                </ul>
            )}
        </div>
    );
}
