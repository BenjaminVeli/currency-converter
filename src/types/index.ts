export interface Currency {
    code: string;
    value: number;
}

export interface CurrencyData {
    data: {
        [key: string]: Currency;
    };
}