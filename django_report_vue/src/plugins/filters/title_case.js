/**
 * Articles, conjunctions, and prepositions less than six letters long are
 * changed to lower case unless they are at the beginning of a sentence.
 */
let MINOR_WORDS = [
    'A',
    'Abaft',
    'About',
    'Above',
    'Afore',
    'After',
    'Along',
    'Amid',
    'Among',
    'An',
    'And',
    'Am',
    'Apud',
    'Are',
    'As',
    'Aside',
    'At',
    'Atop',
    'Below',
    'But',
    'By',
    'Circa',
    'Down',
    'For',
    'From',
    'Given',
    'In',
    'Into',
    'Is',
    'Lest',
    'Like',
    'Mid',
    'Midst',
    'Minus',
    'Near',
    'Next',
    'Nor',
    'Of',
    'Off',
    'On',
    'Onto',
    'Or',
    'Out',
    'Over',
    'Pace',
    'Past',
    'Per',
    'Plus',
    'Pro',
    'Qua',
    'Round',
    'Sans',
    'Save',
    'Since',
    'So',
    'Than',
    'The',
    'Thru',
    'Till',
    'Times',
    'To',
    'Under',
    'Until',
    'Unto',
    'Up',
    'Upon',
    'Via',
    'Vice',
    'With',
    'Worth',
    'Yet'
];

/**
 * Certain words such as initialisms or acronyms should be left uppercase.
 */
let ACRONYMS = ['Id', 'Tv', 'Html', 'Xml', "Url", "Http", "Vpn"];

/**
 * Titlecase the string representation of a value.
 *
 * @param value
 *    a value.
 * @return
 *    the string representation of the value, in the titlecase.
 * @author Haixing Hu
 * @see: http://grammar.about.com/od/tz/g/Title-Case.htm
 */
export default function (value) {
    if (value === undefined || value === null) {
        return "";
    }
    let str = value.toString();
    //  make each word capitalize
    str = str.replace(/([^\W_]+[^\s-]*) */g, function (s) {
        return s.charAt(0).toUpperCase() + s.substr(1).toLowerCase();
    });
    //  Certain minor words should be left lowercase unless they are the first or
    //  last words in the string.
    let i, j, regexp;
    for (i = 0, j = MINOR_WORDS.length; i < j; i++) {
        regexp = new RegExp('\\s' + MINOR_WORDS[i] + '\\s', 'g');
        str = str.replace(regexp, function (s) {
            return s.toLowerCase();
        });
    }
    //  Certain words such as initialisms or acronyms should be left uppercase.
    for (i = 0, j = ACRONYMS.length; i < j; i++) {
        regexp = new RegExp('\\b' + ACRONYMS[i] + '\\b', 'g');
        str = str.replace(regexp, ACRONYMS[i].toUpperCase());
    }
    return str;
};