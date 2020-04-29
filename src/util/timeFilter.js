function timeFilter(time) {
  var date = new Date(time);
  var year = date.getFullYear();
  var month = (date.getMonth() + 1 + "").padStart(2, "0");
  var day = (date.getDate() + "").padStart(2, "0");
  var hours = (date.getHours() + "").padStart(2, "0");
  var minutes = (date.getMinutes() + "").padStart(2, "0");
  var seconds = (date.getSeconds() + "").padStart(2, "0");
  return `${year}-${month}-${day} ${hours}:${minutes}:${seconds}`;
}
export default timeFilter;
