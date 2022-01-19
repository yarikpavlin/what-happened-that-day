import { CachedData } from './ICachedData';

export class CacheHandler {
    private static instance: CacheHandler;
    private today: Date;
    private storageObject: string;

    private get parsedData(): CachedData {
        return JSON.parse(localStorage.getItem('cached_data'));
    }

    private constructor() {
        this.today = new Date();
        this.storageObject = localStorage.getItem('cached_data')
        if(!this.storageObject) {
            localStorage.setItem('cached_data', JSON.stringify({
                date: this.today,
                topics: []
            }))
        }
    }

    public static getInstance(): CacheHandler {
        if(!CacheHandler.instance) {
            CacheHandler.instance = new CacheHandler();
        }
        return CacheHandler.instance;
    }

    isDataCached(type) {
        for (const topic of this.parsedData.topics) {
            if(topic.type === type) {
                return true;
            }
        }
        return false;
    }

    cacheData(data) {
        const oldData = this.parsedData;
        oldData.topics.push(data)
        localStorage.setItem('cached_data',JSON.stringify(oldData))
    }

    getDataByType(type) {
        return this.parsedData.topics.find(topic => topic.type === type).data;
    }
} 