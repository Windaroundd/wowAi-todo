export const calculateDateRemain = (dateObject) => {
  // Ngày hiện tại (timestamp)
  const currentDateTimestamp = Date.now();

  // Ngày từ đối tượng Date
  const targetDateTimestamp = dateObject.getTime();

  // Tính số mili giây giữa hai ngày
  const timeDifference = targetDateTimestamp - currentDateTimestamp;

  // Chuyển đổi từ mili giây sang số ngày
  const daysDifference = timeDifference / (1000 * 60 * 60 * 24);

  return daysDifference;
};
