class DateUtils {
    private today: Date = new Date();
    
    /**
     * Returns date today in format
     * 0: Zero-padded 01, 02, 03 ... 11, 12
     * 1: Usual format 1, 2, 3 ... 11, 12
     * @param format 1 or 2 depends on format
     * @returns string
     */
    getTodayDate(format: number = 0): string {
        const dd = this.today.getDate();
        if(!format && dd < 10) {
            return '0' + dd;
        }
        return dd.toString();
    }

    /**
     * Returns number of the current month
     * 0: Zero-padded 01 for January, 02 for February .. 12 December
     * 1: Usual format 1 for January, 2 for February .. 12 December
     */
    getTodayMonth(format: number = 0): string {
        // +1 is needed here, cause getMonth return 0 for January ... 11 for December
        const mm = this.today.getMonth() + 1;
        if(!format && mm < 10) {
            return '0' + mm;
        }
        return mm.toString();
    }
}

export default new DateUtils();