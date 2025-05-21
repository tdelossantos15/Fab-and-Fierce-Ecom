import { NextResponse } from "next/server"

const regions = [
  { code: "NCR", name: "National Capital Region" },
  { code: "CAR", name: "Cordillera Administrative Region" },
  { code: "I", name: "Ilocos Region" },
  { code: "II", name: "Cagayan Valley" },
  { code: "III", name: "Central Luzon" },
  { code: "IV-A", name: "CALABARZON" },
  { code: "MIMAROPA", name: "MIMAROPA Region" },
  { code: "V", name: "Bicol Region" },
  { code: "VI", name: "Western Visayas" },
  { code: "VII", name: "Central Visayas" },
  { code: "VIII", name: "Eastern Visayas" },
  { code: "IX", name: "Zamboanga Peninsula" },
  { code: "X", name: "Northern Mindanao" },
  { code: "XI", name: "Davao Region" },
  { code: "XII", name: "SOCCSKSARGEN" },
  { code: "XIII", name: "Caraga" },
  { code: "BARMM", name: "Bangsamoro" },
]

export async function GET() {
  return NextResponse.json(regions)
} 