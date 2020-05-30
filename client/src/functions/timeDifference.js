function getRatio(timeIntervalObject) {
  let startTime = new Date();
  let endTime = new Date();
  const nowTime = new Date();

  const { start, end } = timeIntervalObject;
  startTime.setHours(start.split('.')[0]);
  startTime.setMinutes(start.split('.')[1]);
  endTime.setHours(end.split('.')[0]);
  endTime.setMinutes(end.split('.')[1]);

  if (startTime > nowTime || startTime > endTime || endTime < nowTime) return 1

  const timeIntervalInMilliseconds = endTime - startTime;
  const timeIntervalInMinutes = timeIntervalInMilliseconds / 60000;

  const expiredTimeInMilliseconds = nowTime - startTime;
  const expiredTimeInMinutes = expiredTimeInMilliseconds / 60000;

  const ratio = expiredTimeInMinutes / timeIntervalInMinutes;
  console.log("ratio : " + ratio);
  return ratio;
}

function getPercent(timeIntervalObject) {
  return getRatio(timeIntervalObject) * 100;
}

export default getPercent;
