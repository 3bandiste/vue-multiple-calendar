export default {
    methods: {
        isDisabledDate(date) {
            const datesCollection = this.fConfigs.disabledDates;

            return !this.isEnabledDate(date) ||
                this.isDateIncludedInDatesCollection(date, datesCollection);
        },
        isEnabledDate(date) {
            const datesCollection = this.fConfigs.enabledDates;

            return datesCollection.length === 0 ||
                this.isDateIncludedInDatesCollection(date, datesCollection);
        },
        isDateIncludedInDatesCollection(date, datesCollection) {
            if (!this.helpCalendar) {
                console.error('helpCalendar should be available');
                return false
            }
            let today = new Date()
            today.setHours(0, 0, 0, 0)
            let dateObj = this.helpCalendar.getDateFromFormat(date)

            return (
                datesCollection.includes(date) ||
                (datesCollection.includes('beforeToday') &&
                    dateObj.getTime() < today.getTime()) ||
                (datesCollection.includes('afterToday') &&
                    dateObj.getTime() > today.getTime())
            )
        }
    }
}
