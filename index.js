const fs = require('fs');
 
const inputFilePath = 'input.json';
const outputFilePath = 'output.json';
const allowCategories = [1, 2, 4];
const extraDays = 5;
const resultOffersCount = 2;

try {
    // Step 1: Accept check-in date as a command line argument
    const checkInDate = Date.parse(process.argv[2]);
    const checkInDateInput = process.argv[2];
    if (!checkInDate || !checkInDateInput.match(/^\d{4}-\d{2}-\d{2}$/)) {
        throw new Error('Invalid or missing check-in date. Please provide the date in YYYY-MM-DD format.');
    }

    // Step 2: Load input data of input.json 
    const input = fs.readFileSync(inputFilePath, { encoding: 'utf8', flag: 'r' });
    if (!input) {
        throw new Error('Empty or malformed JSON structure in input.json.');
    }

    const offers = JSON.parse(input)['offers'];
    if (!offers || !Array.isArray(offers)) {
        throw new Error('Missing or malformed offer information in input.json.');
    }

    // Step 3: Filter offers based on rules
    let i = offers.length;
    while (i--) { // Loop through offers
        const isValidCategory = allowCategories.includes(offers[i]['category']);

        const validToDate = Date.parse(offers[i]['valid_to']);
        const isValidDate = (validToDate - checkInDate) >= (extraDays * 1000 * 3600 * 24);

        if (!(isValidCategory && isValidDate && offers[i]['merchants'].length > 0)) {
            offers.splice(i, 1); // Remove invalid offer
            continue;
        }

        const sortedMerchants = offers[i]['merchants'].sort((a, b) => a['distance'] - b['distance']);
        const closestMerchant = sortedMerchants[0];
        offers[i]['merchants'] = [closestMerchant];
    }

    // Step 4: Find closest merchant, two offers, different categories
    const resultCategories = [];
    const resultOffers = [];
    const sortedOffers = offers.sort((a, b) => {
        const closestMerchantA = a['merchants'][0];
        const closestMerchantB = b['merchants'][0];
        return closestMerchantA['distance'] - closestMerchantB['distance'];
    });
    for (let i = 0; i < sortedOffers.length; i++) {
        if (resultOffers.length >= resultOffersCount) {
            break;
        }

        const category = sortedOffers[i]['category'];
        if (!resultCategories.includes(category)) {
            resultOffers.push(sortedOffers[i]);
            resultCategories.push(category);
        }
    }

    // Step 5: Save filtered offers to output.json
    fs.writeFileSync(outputFilePath, JSON.stringify({
        offers: resultOffers,
    }, null, 2), { encoding: "utf8", flag: "w" });

    console.log('Filtered offers saved to output.json.');
} catch (error) {
    console.error('Error:', error.message);
}
