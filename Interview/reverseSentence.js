function reverseSentence(sentence) {

    let arr = sentence.split(" ");
    let firstStr = arr[0];
    let firstCharStr = firstStr[0].toLowerCase();

    for (let i = 1; i < firstStr.length; i++)
        firstCharStr += firstStr[i];
    arr[0] = firstCharStr;

    let lastStr = arr[arr.length - 1];
    let lastCharStr = lastStr[0].toUpperCase();

    for (let i = 1; i < lastStr.length; i++)
        lastCharStr += lastStr[i];
    arr[arr.length - 1] = lastCharStr;

    let lastWord = arr[arr.length - 1];
    let lastChar = lastWord[lastWord.length - 1];
    lastWord = lastWord.slice(0, lastWord.length - 1);
    arr[arr.length - 1] = lastWord;
    arr[0] = arr[0] + lastChar;

    return arr.reverse().join(" ");
}

let res = reverseSentence("This is a sentence.");
console.log(res);