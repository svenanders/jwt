function addHours(date, units) {
	const _date = new Date(date);
	_date.setTime(_date.getTime() + units * 60 * 60);
	return _date;
}
export default addHours;