import { getRandomNumberInRange } from '../utils/numberUtils';
import DateUtils from './DateUtils';
import HttpClient from './HttpClient';

class FeedRepository {
    private readonly baseUrl = 'https://api.wikimedia.org/feed/v1/wikipedia'
    private language = 'ru';
    private currentDate: string = DateUtils.getTodayDate();
    private currentMonth: string = DateUtils.getTodayMonth();


    setlanguage(language: string) {
        this.language = language;
    }

    private async getDataByType(type: string) {
        console.log(`Start fetch for type ${type}`);
        const url = `${this.baseUrl}/${this.language}/onthisday/${type}/${this.currentMonth}/${this.currentDate}`;
        return await HttpClient.get(url);
    }
    
    async getBirths() {
        const type = 'births';
        return await this.getDataByType(type);
    }

    async getDeaths() {
        const type = 'deaths';
        return await this.getDataByType(type);
    }

    async getHolidays() {
        const type = 'holidays';
        return await this.getDataByType(type);
    }

    async getEvents() {
        const type = 'events';
        return await this.getDataByType(type);
    }

   async getRandomEvent() {
       let data = [];
       const types = ['births', 'events', 'holidays'];
       const typeIndex = getRandomNumberInRange(0,2);
       const type = types[typeIndex];
       switch(type) {
            case types[0]:
                data = await this.getBirths();
                break;
            case types[1]:
                data = await this.getEvents();
                break;
            case types[2]:
                data = await this.getHolidays();
                break;
       }

       const events = data[type];
       const randomEventIndex = getRandomNumberInRange(0, events.length);
       const event = events[randomEventIndex];
       return {
           event,
           type
       }
   }
}

export default new FeedRepository();