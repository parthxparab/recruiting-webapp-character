const BASE_URL = 'https://recruiting.verylongdomaintotestwith.ca/api/{parthxparab}/character'

/**
 * Fetch character data from the API
 * @returns {Promise<Object>} - Returns the character data or an empty object if no data is found
 */
export async function getCharacters() {
    try {
        const response = await fetch(BASE_URL, {
            method: 'GET',
            headers: {
                'Content-Type': 'application/json',
            },
        });

        if (!response.ok) {
            throw new Error('Failed to fetch character data');
        }

        const data = await response.json();
        return data.body; 
    } catch (error) {
        console.error('Error fetching characters:', error);
        return {}; 
    }
}

/**
 * Save character data to the API
 * @param {Object} characters - The character data to be saved
 * @returns {Promise<void>}
 */
export async function saveCharacters(characters) {
    try {
        const response = await fetch(BASE_URL, {
            method: 'POST',
            headers: {
                'Content-Type': 'application/json',
            },
            body: JSON.stringify(characters),
        });

        if (!response.ok) {
            throw new Error('Failed to save character data');
        }

        console.log('Character data saved successfully');
    } catch (error) {
        console.error('Error saving characters:', error);
    }
}