const demoVendorPool = [
  { id: "v-venue-1", role: "Venue", name: "Venue Luxe Hall", location: "Virginia", price: 3500, reliability: 96, responseHours: 2, cancellationRisk: 2, rating: 4.9 },
  { id: "v-venue-2", role: "Venue", name: "Backup Estate Venue", location: "Virginia", price: 3700, reliability: 91, responseHours: 4, cancellationRisk: 4, rating: 4.7 },
  { id: "v-catering-1", role: "Catering", name: "Fresh Flame Catering", location: "Virginia", price: 4800, reliability: 94, responseHours: 3, cancellationRisk: 3, rating: 4.8 },
  { id: "v-catering-2", role: "Catering", name: "Backup Premier Catering", location: "Virginia", price: 5100, reliability: 90, responseHours: 4, cancellationRisk: 5, rating: 4.6 },
  { id: "v-dj-1", role: "DJ", name: "Elite Sound DJs", location: "Virginia", price: 900, reliability: 95, responseHours: 1, cancellationRisk: 2, rating: 4.9 },
  { id: "v-dj-2", role: "DJ", name: "Backup Sound Collective", location: "Virginia", price: 1000, reliability: 92, responseHours: 3, cancellationRisk: 3, rating: 4.7 },
  { id: "v-rentals-1", role: "Rentals", name: "Premier Event Rentals", location: "Virginia", price: 1800, reliability: 91, responseHours: 4, cancellationRisk: 4, rating: 4.6 },
  { id: "v-rentals-2", role: "Rentals", name: "Backup Rental House", location: "Virginia", price: 1900, reliability: 89, responseHours: 5, cancellationRisk: 5, rating: 4.5 },
  { id: "v-lighting-1", role: "Lighting", name: "GlowPro Lighting", location: "Virginia", price: 1100, reliability: 90, responseHours: 5, cancellationRisk: 5, rating: 4.6 },
  { id: "v-lighting-2", role: "Lighting", name: "Backup Light Lab", location: "Virginia", price: 1200, reliability: 88, responseHours: 6, cancellationRisk: 5, rating: 4.4 }
];

export function vendorScore(vendor, targetAmount = 0) {
  const priceFit = targetAmount ? Math.max(0, 100 - Math.abs(vendor.price - targetAmount) / targetAmount * 100) : 80;
  return Math.round(
    vendor.reliability * 0.38 +
    priceFit * 0.24 +
    (100 - vendor.cancellationRisk * 10) * 0.20 +
    Math.max(0, 100 - vendor.responseHours * 10) * 0.10 +
    vendor.rating * 10 * 0.08
  );
}

export function selectVendorStack(intent, budgetPlan, vendorPool = demoVendorPool) {
  const neededRoles = budgetPlan
    .filter(item => !["Contingency", "Staffing"].includes(item.category))
    .map(item => item.category === "Entertainment" ? "DJ" : item.category);

  const primaryVendors = [];
  const backupVendors = [];

  for (const role of neededRoles) {
    const target = budgetPlan.find(item => item.category === role || (item.category === "Entertainment" && role === "DJ"))?.targetAmount || 0;
    const candidates = vendorPool
      .filter(v => v.role === role)
      .map(v => ({ ...v, score: vendorScore(v, target) }))
      .sort((a, b) => b.score - a.score);

    if (candidates[0]) primaryVendors.push(candidates[0]);
    if (candidates[1]) backupVendors.push(candidates[1]);
  }

  return { primaryVendors, backupVendors, vendorPoolUsed: vendorPool.length };
}
