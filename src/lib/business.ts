export const BUSINESS = {
  name: "Zoesa Motos y Electrodomésticos",
  short: "Zoesa",
  city: "Venado Tuerto, Santa Fe",
  address: "Lavalle 2729",
  mapsQuery: "Lavalle 2729, Venado Tuerto, Santa Fe, Argentina",
  phones: [
    { label: "Línea 1", display: "(03462) 15 627084", wa: "5493462627084", tel: "+543462627084" },
    { label: "Línea 2", display: "(03462) 15 509775", wa: "5493462509775", tel: "+543462509775" },
  ],
  facebookHogar: "https://www.facebook.com/zoesa.electros",
  facebookMotos: "https://www.facebook.com/people/Zoesa-Motos/",
  brands: ["Honda", "Yamaha", "Suzuki", "Kawasaki", "Gilera", "Brava", "Corven"],
} as const;

export function waLink(message: string, phoneIndex = 0) {
  const phone = BUSINESS.phones[phoneIndex]?.wa ?? BUSINESS.phones[0].wa;
  return `https://wa.me/${phone}?text=${encodeURIComponent(message)}`;
}

export const mapsEmbed = `https://www.google.com/maps?q=${encodeURIComponent(BUSINESS.mapsQuery)}&output=embed`;
export const mapsLink = `https://www.google.com/maps/search/?api=1&query=${encodeURIComponent(BUSINESS.mapsQuery)}`;
