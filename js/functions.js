//Функция для проверки длины строки.
const checkLength = (string, stringLength) =>string.length <= stringLength;

checkLength('Саша', 4);
checkLength('Волан де Морт', 15);
checkLength('Петров Пётр Петрович', 12);

//Функция для проверки, является ли строка палиндромом.
const isPalindrome = (string) =>string.toLowerCase().replaceAll(' ', '').split('').reverse().join('') === string.toLowerCase().replaceAll(' ', '');

isPalindrome('топот');
isPalindrome('ДовОд');
isPalindrome('Кекс');
isPalindrome('Лёша на полке клопа нашёл ');

/*Функция, которая принимает строку, извлекает содержащиеся в ней цифры от 0 до 9 и возвращает их в виде целого положительного числа.
Если в строке нет ни одной цифры, функция должна вернуть NaN.
Предусмотрен случай с числами, в том числе float. */

const extractNumbers = (string) => String(string).match(/\d/g) !== null ? Number(String(string).match(/\d/g).join('')) : NaN;

extractNumbers('2023 год');
extractNumbers('ECMAScript 2022');
extractNumbers('1 кефир, 0.5 батона');
extractNumbers('а я томат');
extractNumbers(2023);
extractNumbers(-1);
extractNumbers(1.5);


/* Функция, которая принимает три параметра: исходную строку, минимальную длину и строку с добавочными символами
и возвращает исходную строку, дополненную указанными символами до заданной длины. Символы добавляются в начало строки.
Если исходная строка превышает заданную длину, она не должна обрезаться. Если «добивка» слишком длинная, она обрезается
с конца.*/

const getModifiedString = (string, minLength, addition) =>{
  while(string.length < minLength){
    const availableLength = addition.slice(0, minLength - string.length);
    string = availableLength + string;
  }
  return string;
};

getModifiedString('ello', 5, 'h');
getModifiedString('1', 2, '0');
getModifiedString('1', 4, '0');
getModifiedString('q', 4, 'werty');
getModifiedString('q', 4, 'we');
getModifiedString('qwerty', 4, '0');
