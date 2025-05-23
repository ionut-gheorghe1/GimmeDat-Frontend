import axios from 'axios';

export const fetchData = async () => {
	try {
		const response = await axios.get(import.meta.env.VITE_API_URL);
		return response.data;
	} catch (error) {
		console.log('Error fetching data', error);
	}
};
