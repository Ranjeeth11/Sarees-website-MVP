const businessPhoneNumber = "7904753531";

export const site = {
  name: "The Saree Edit",
  tagline: "Sarees for every celebration and every day",
  phoneNumber: businessPhoneNumber,
  contact: { phone: "+91 79047 53531", email: "Message us on WhatsApp", address: "Online saree boutique" },
  callUrl: "tel:+917904753531",
  whatsAppUrl: (message: string) => `https://wa.me/${businessPhoneNumber}?text=${encodeURIComponent(message)}`,
  priceLabel: "Ask price",
};
