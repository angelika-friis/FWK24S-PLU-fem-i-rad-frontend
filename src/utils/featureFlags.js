const flags = {
  newCheckout: true,
  darkMode: false,
};

export function isFeatureEnabled(flagName) {
  return Boolean(flags[flagName]);
}
