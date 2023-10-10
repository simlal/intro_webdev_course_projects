const GETWORD_URL = "https://words.dev-apis.com/word-of-the-day";
const POSTWORD_URL = "https://words.dev-apis.com/validate-word";

// ***** WORD API functions *****
// Get word of the day as json
async function fetchWotd(random) {
    const url = `${GETWORD_URL}?random=${random}`
    if (random) {
        console.log(`Getting random word from ${url}`)
    } else {
        console.log(`Getting word of the day from ${url}`)
    }
    const promise = await fetch(url);
    const response = await promise.json();
    return response
}

// Validate word with POST
async function validateWord(wotd) {
    try {
        const response = await fetch(POSTWORD_URL, {
            method: "POST",
            headers: {
                "Content-Type": "application/json"
            },
            body: JSON.stringify(wotd)
            
        });
        const result = await response.json();
        console.log(`Success POST to ${POSTWORD_URL}`) 
        console.log(`Response: ${JSON.stringify(result, null, 2)}`)
        return result;
    } catch (error) {
        console.log("Error: ", error)
    }
}

// ***** Wordle Clone funcs *****
// regex to check if str is alpha
function isLetter(letter) {
    return /^[a-zA-Z]$/.test(letter);
  }
  

// get wotd
let wotd;
(async () => {
    // Get wotd
    wotd = await fetchWotd(1);
    console.log(`word=${wotd["word"]}`)
})();

//     // validate wotd
//     let validateWotd = await validateWord(wotd);
//     console.log(validateWotd)

//     // Unvalid post req
//     // const testUnvalid = {
//     //     word: "assett",
//     //     puzzle: 123
//     // }
//     // let unvalidWotd = await validateWord(testUnvalid);
//     // console.log(unvalidWotd)
// })();
