//expecting date in format of tmdb

//'2024-11-22T19:35:57.797Z'

export const parseDate = (timestamp: string) => {
	const [date, time] = timestamp.split('T');

	const months = ['січня', 'лютого', 'березня', 'квітня', 'травня', 'червня', 'липня', 'серпня', 'вересня', 'жовтня', 'листопада', 'грудня'];

	const [year, month, day] = date.split('-');

	const str = `${day[0] == '0' ? day[1] : day} ${months[+month-1]} ${year}`;

	return str
}