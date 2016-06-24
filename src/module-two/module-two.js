(function(){

    /* const */ var LETTERS = 'bcdfghjklmnpqrstvwxyz';
    /* const */ var VOWELS = 'aeiou';

    function englishToPigLatin(english) {
        /* const */ var SYLLABLE = 'ay';
        var pigLatin = '';

        if ( !englishIsEmpty() && startWithLetter() ) {
            if ( startWithVowel() ) {
                addAy();
            } else {
                processIfConsonant();
            }
        }

        function processIfConsonant() {
            var preConsonants = '';

            for (var i = 0; i < english.length; ++i) {
                if (isConsonant()) {
                    preConsonants += english[i];
                    if ( startsWithQ() &&  endsWithU() ) {
                        preConsonants += 'u';
                        i += 2;
                        break;
                    }

                } else { break; }

                function startsWithQ(){
                    return preConsonants == 'q';
                }

                function endsWithU() {
                    return i+1 < english.length && english[i+1] == 'u';
                }

                function isConsonant() {
                    return LETTERS.indexOf(english[i]) > -1;
                }


            }
            pigLatin = english.substring(i) + preConsonants + SYLLABLE;
        }

        function englishIsEmpty(){
            return english === null && english.length <= 0;
        }
        function startWithLetter(){
            return VOWELS.indexOf(english[0]) > -1 || LETTERS.indexOf(english[0]) > -1;
        }
        function startWithVowel() {
            return VOWELS.indexOf(english[0]) > -1;
        }
        function addAy(){
            pigLatin = english + SYLLABLE;
        }

        return pigLatin;
    }



    console.log(englishToPigLatin('banana'));


})();
