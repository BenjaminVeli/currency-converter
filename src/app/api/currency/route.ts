import { NextResponse } from "next/server";
import { CurrencyData } from "@/types";

let cachedData: CurrencyData | null = null; // Caché en memoria

export async function GET() {
    const now = Date.now();

    // Calcular la próxima medianoche UTC
    const nextMidnight = new Date();
    nextMidnight.setUTCHours(0, 0, 0, 0); // Reiniciar a medianoche UTC
    nextMidnight.setDate(nextMidnight.getDate() + 1); // Pasar al siguiente día
    const nextUpdate = nextMidnight.getTime(); // Timestamp de la próxima actualización

    // Si los datos en caché aún son válidos, devolverlos sin llamar a la API
    if (cachedData && now < nextUpdate) {
        return NextResponse.json(cachedData);
    }

    try {
        const response = await fetch(
            `https://api.currencyapi.com/v3/latest?apikey=${process.env.CURRENCY_API_KEY}`
        );
        if (!response.ok) {
            throw new Error("Error en la API de currencyapi");
        }

        const data: CurrencyData = await response.json();

        // Guardar en caché los nuevos datos
        cachedData = data;

        // Configurar la caché del servidor con "stale-while-revalidate"
        const res = NextResponse.json(data);
        res.headers.set("Cache-Control", "s-maxage=86400, stale-while-revalidate");
        return res;

    } catch (error) {
        console.error("Error al obtener datos de la API:", error);
        return NextResponse.json(
            { error: "No se pudieron obtener los datos de la API" },
            { status: 500 }
        );
    }
}
