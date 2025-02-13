import type { NextApiRequest, NextApiResponse } from "next";
import CurrencyApi from "@everapi/currencyapi-js";
import { ApiResponse } from "@/types";

const currencyApi = new CurrencyApi(process.env.CURRENCY_API_KEY);



