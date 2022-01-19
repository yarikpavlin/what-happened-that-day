import { getRandomNumberInRange } from '../utils/numberUtils';
import DateUtils from './DateUtils';
import HttpClient from './HttpClient';
import { CacheHandler } from './Cache';

class FeedRepository {
    private readonly baseUrl = 'https://api.wikimedia.org/feed/v1/wikipedia'
    private language = 'ru';
    private currentDate: string = DateUtils.getTodayDate();
    private currentMonth: string = DateUtils.getTodayMonth();
    private cache: CacheHandler = CacheHandler.getInstance();


    setlanguage(language: string) {
        this.language = language;
    }

    private async getDataByType(type: string) {
        const url = `${this.baseUrl}/${this.language}/onthisday/${type}/${this.currentMonth}/${this.currentDate}`;
        if(!this.cache.isDataCached(type)) {
            const fetchedData = await HttpClient.get(url);
            this.cache.cacheData({
                type: type,
                data: fetchedData[type]
            });
            return fetchedData;
        } else {
            return this.cache.getDataByType(type)
        }
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
       let events = [];
       const types = ['births', 'events', 'holidays'];
       const typeIndex = getRandomNumberInRange(0,2);
       const type = types[typeIndex];
       switch(type) {
            case types[0]:
                events = await this.getBirths();
                break;
            case types[1]:
                events = await this.getEvents();
                break;
            case types[2]:
                events = await this.getHolidays();
                break;
       }

       const randomEventIndex = getRandomNumberInRange(0, events.length);
       const event = events[randomEventIndex];
       return {
           event,
           type
       }
   }
}

export default new FeedRepository();