import { NextResponse } from "next/server";
import productsData from '@/data/products.json';


export default function handler() {
              return NextResponse.json(productsData);
}
