// 'quotes' : [1, 'single'],
// 'semi' : [1, 'always'],
// 'max-statements' : [2, 15],
// 'max-depth' : [1, 3],
// 'complexity' : [2, 5]

//przykład kodu https://github.com/elijahmanor



/* const */ var CONSONANTS = 'bcdfghjklmnpqrstvwxyz';
/* const */ var VOWELS = 'aeiou';

function englishToPigLatin(english) {
    /* const */ var SYLLABLE = 'ay';
    var pigLatin = '';

    if (english !== null && english.length > 0 &&
        (VOWELS.indexOf(english[0]) > -1 ||
        CONSONANTS.indexOf(english[0]) > -1 )) {
        if (VOWELS.indexOf(english[0]) > -1) {
            pigLatin = english + SYLLABLE;
        } else {
            var preConsonants = '';
            for (var i = 0; i < english.length; ++i) {
                if (CONSONANTS.indexOf(english[i]) > -1) {
                    preConsonants += english[i];
                    if (preConsonants == 'q' &&
                        i+1 < english.length && english[i+1] == 'u') {
                        preConsonants += 'u';
                        i += 2;
                        break;
                    }
                } else { break; }
            }
            pigLatin = english.substring(i) + preConsonants + SYLLABLE;
        }
    }

    return pigLatin;
}



console.log(englishToPigLatin('package'));
