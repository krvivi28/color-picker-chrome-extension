const joke = document.querySelector(".joke");
window.addEventListener("load", () => {
  getData();
});
const getData = async () => {
  try {
    const res = await fetch("https://api.chucknorris.io/jokes/random");
    const data = await res.json();
    joke.innerHTML = data.value;
  } catch (error) {}
};

const pickbtn = document.querySelector("#pickbtn");
const colorGrid = document.querySelector(".colorGrid");
const colorValue = document.querySelector(".colorValue");
const colorMsg = document.querySelector(".colorMsg");
pickbtn.addEventListener("click", async () => {
  let [tab] = await chrome.tabs.query({ active: true, currentWindow: true });
  chrome.scripting.executeScript(
    {
      target: { tabId: tab.id },
      function: pickColor,
    },
    async (injectResult) => {
      const [data] = injectResult;
      const hexColor = data.result.sRGBHex;
      colorGrid.style.backgroundColor = hexColor;
      colorValue.innerHTML = hexColor;
      colorMsg.innerHTML = "color code copied to clipboard";
      try {
        await navigator.clipboard.writeText(hexColor);
      } catch (error) {
        console.log(error);
      }
      console.log(injectResult);
    }
  );
});
async function pickColor() {
  try {
    const eyeDropper = new EyeDropper();
    const pickColor = await eyeDropper.open();
    return pickColor;
  } catch (error) {
    console.log(error);
  }
}
