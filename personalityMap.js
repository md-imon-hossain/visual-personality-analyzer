// Map traits to personality
function mapTraitsToPersonality(traits) {
  let personality = [];

  if (traits.smile > 0.7) personality.push("Extraverted");
  if (traits.angry > 0.5) personality.push("Aggressive / Neurotic");
  if (traits.neutral > 0.7) personality.push("Calm / Stable");
  if (traits.beard === true) personality.push("Dominant / Mature");
  if (traits.glasses === true) personality.push("Intellectual / Openness");

  return personality.join(", ");
}
