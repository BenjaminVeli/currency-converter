
import { useState, useEffect } from 'react';
import { EnhancedCurrency } from '@/types';

export const useCurrencies = () => {
    const [currencies, setCurrencies] = useState<EnhancedCurrency[]>([]);
    const [isLoading, setIsLoading] = useState(true);
    const [error, setError] = useState<string | null>(null);

    useEffect(() => {
        const fetchCurrencies = async () => {
            try {
                const response = await fetch("/api/currency");
                const data = await response.json();
                if (data?.data) {
                    const currencyArray = Object.entries(data.data).map(([code, currency]) => ({
                        code,
                        value: (currency as EnhancedCurrency).value,
                        name: (currency as EnhancedCurrency).name,
                    }));
                    setCurrencies(currencyArray);
                }
            } catch (error) {
                setError("Error al obtener las monedas");
                console.error("Error al obtener datos:", error);
            } finally {
                setIsLoading(false);
            }
        };

        fetchCurrencies();
    }, []);

    return { currencies, isLoading, error };
};