# Filter Offers
### Explanation of each step:
1. **Accept Check-in Date:**
- Parse the check-in date from the command line arguments and validate its format.
2. **Load Input Data:**
 - Read and parse the data of the input.json file.
3. **Filter Offers:**
- Iterate through the offers and filter based on category, validity period, and the existence of merchants.
- For each valid offer, keep only the closest merchant.
4. **Find Offers:**
- Sort the filtered offers based on the distance of the closest merchant.
- Select the required number of offers from different categories.
5. **Save to Output JSON:**
- Write the filtered offers to the output.json file.
## Installation
1. Download Code:
- Download the source code or clone the repository to your local machine.
2. Install Dependencies:
- Filter Offers requires [Node.js](https://nodejs.org/) to run.
3. Run the Application:
- After installing the dependencies, run the application with the following command:
   ```sh
   node index.js 2019-12-25 
   ```
4. Check and review Output:

- The application will process the input data, filter offers, and save the result in the output.json file.
- Check the terminal for any output or error messages.
- Open the generated output.json file to review the filtered offers.

### Other
- You can run the Application in Github Codespace. Check out the Codespace docs: [Codespace](https://github.com/features/codespaces).
