export function initTimeDisplay() {
  const timeZone = "Europe/Berlin";
  const timeElement = document.querySelector(".meta > time");
  if (!timeElement) return;

  function updateTime() {
    const now = new Date();
    const timeString = now.toLocaleTimeString("en-GB", {
      timeZone,
      hour12: false,
      hour: "2-digit",
      minute: "2-digit",
      second: "2-digit",
      timeZoneName: "longOffset",
    });
    timeElement.textContent = timeString;
  }

  updateTime();
  setInterval(updateTime, 1000);
}
