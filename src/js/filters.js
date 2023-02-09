export default function beginText(referenceText, textForm) {
  const reference = referenceText.trim().toLowerCase();
  const clean = textForm.trim().toLowerCase();
  return reference.startsWith(clean);
}
