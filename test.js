
var natural = require('natural');

//stemming

stemmer = natural.PorterStemmer;
//stemmer = natural.LancasterStemmer; can be used as well
var stem = stemmer.stem('walked');
var stem1 = stemmer.stem('checked');
console.log(stem,stem1)

//tokenize and stem 
stemmer.attach();
console.log('i stemmed words'.tokenizeAndStem());
console.log('i stemmed words'.tokenizeAndStem(true));//excluding stop words
/*-----------------------------------------------------------------------------------------*/
//Phonetics
phonetic = natural.Metaphone;
var wordA = 'phonetics';
var wordB = 'fonetix';
if(phonetic.compare(wordA, wordB))
    console.log('they sound alike!');
//another method 

phonetic.attach();
if(wordA.soundsLike(wordB))
    console.log('they sound alike!');

//to get the code
console.log('phonetics'.phonetics());
console.log('phonetics rock'.tokenizeAndPhoneticize());

/*-----------------------------------------------------------------------------------------*/
//inflection 
//convert nouns between singular and plural forms and turn
//intergers to string counters

nounInflector = new natural.NounInflector();
var plural = nounInflector.pluralize('radius');
console.log(plural);


var singular = nounInflector.singularize('beers');
console.log(singular);

//for shortcut we can use attach method
nounInflector.attach();
console.log('radius'.pluralizeNoun());
console.log('beers'.singularizeNoun());

//count inflector
countInflector = natural.CountInflector;

console.log(countInflector.nth(1));
console.log(countInflector.nth(2));
console.log(countInflector.nth(3));
console.log(countInflector.nth(4));
/*-----------------------------------------------------------------------------------------*/
//classification
classifier = new natural.BayesClassifier();
classifier.addDocument("my unit-tests failed.", 'software');
classifier.addDocument("tried the program, but it was buggy.", 'software');
classifier.addDocument("the drive has a 2TB capacity.", 'hardware');
classifier.addDocument("i need a new power supply.", 'hardware');
classifier.train();
console.log(classifier.classify('did the tests pass ??'))
//we can save the train model
classifier.save('classifier.json',function(err,classifier){
	//classifier ll save
});
//load the saved classifier
classifier = new natural.BayesClassifier();
natural.BayesClassifier.load('classifier.json', null, function(err, classifier) {
    console.log(classifier.classify('did the tests pass?'));
});	

/*-------------------------------------------------------------------------------------------*/
//N-Grams :
var NGrams = natural.NGrams;
console.log(NGrams.trigrams('some words here'));
console.log(NGrams.trigrams(['some','grams','here']));

console.log(NGrams.bigrams('some words here'));
console.log(NGrams.bigrams(['some','grams','here']));

/*-----------------------------------------------------------------------------------------------*/
//string distance : "natural" supplies the Dice's coefficient, Levenshtein distance, 
//and Jaro-Winkler distance algorithms for determining string similarity. 
//These algorithms are concerned with orthographic (spelling) similarity, not necessarily phonetics.


console.log(natural.JaroWinklerDistance('execution', 'intention')); //higher the value --> higher the similarity
console.log(natural.LevenshteinDistance('execution', 'intention')); //lower the value --> higher the similarity
console.log(natural.DiceCoefficient('execution', 'intention'));   //higher the value --> higher the similarity

