export function formatTranslation(translation: string, replacemnts: Record<string, string>): string {
  
  const formattedTranslation = Object.keys(replacemnts).reduce((prevVal, currVal) => {
    return prevVal.replaceAll(`{{${currVal}}}`, replacemnts[currVal]);
  }, translation);

  return formattedTranslation;
}