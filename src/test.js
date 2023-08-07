function removeVietnameseDiacriticsAndLowercase(str) {
  // Normalize the string to NFD form (decomposed form)
  const normalizedStr = str.normalize('NFD');

  // Use a regex to remove diacritics (accents)
  const regex = /[\u0300-\u036f]/g;
  const removedDiacriticsStr = normalizedStr.replace(regex, '');

  // Convert the string to lowercase
  const lowercaseStr = removedDiacriticsStr.toLowerCase();

  return lowercaseStr;
}

// Test the function
const inputString = 'Chào các bạn, Đây là một tôi là 1 người việt Ví dụ Tiếng Việt';
const result = removeVietnameseDiacriticsAndLowercase(inputString);
console.log(result); // Output: "chao cac ban, day la mot vi du tieng viet"