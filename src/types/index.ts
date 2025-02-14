export interface CurrencyData {
    data: {
        [key: string]: Currency;
    };
}

export interface Currency {
    code: string;
    value: number;
}

export interface CurrencySelectProps {
    label: string;
    value: string;
    onChange: (value: string) => void;
    currencies: Currency[];
    isLoading?: boolean;
}

export interface AmountInputProps {
    value: string;
    onChange: (value: string) => void;
}

export interface ConvertButtonProps {
    onClick: () => void;
}