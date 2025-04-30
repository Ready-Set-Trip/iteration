// TODO: make logic to have slightly more secure tripId.
// don't know if I want to hash it or just do some logic to generate a shorter string based on tableId
// if logic based on tableId, it might save some trips between frontend/server/db??
// (if I make the tripId able to be reverse engineered into the tableId)

// trip IDs will be 5 characters long, 1 letter + 4 numbers
// do some math to basically create a simple, insecure, two-way hashing algorithm
export const generateTripId = (tableId: number): string => {
    // obfuscate the table Id by multiplying a prime and adding a hard-to-guess offest
    const obfuscatedId = tableId * 13 + 841;
    // generate a "random" letter based on the obfuscated table ID
    const letter = String.fromCharCode(65 + (obfuscatedId % 26));
    // generate a "random" string of 4 numbers based on the obfuscated table ID
    const numbers = String(obfuscatedId).padStart(4, '0');
    return letter + numbers;
  };
  
export const decodeTripId = (tripCode: string): number => {
  console.log('tripcode', tripCode)
    const numbersPart = parseInt(tripCode.slice(1));
    console.log('numberspart', numbersPart)
    const decodedId = (numbersPart - 841) / 13;
    return decodedId;
  };

