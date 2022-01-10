import axios, { AxiosResponse } from 'axios';

class HttpClient {
    async get(url: string) {
        const response: AxiosResponse = await axios.get(url);
        if(response.status === 200) {
            return response.data;
        } else {
            throw new Error(`Response status actual: ${response.status}, expected: 200`);
        }
    }
}

export default new HttpClient();