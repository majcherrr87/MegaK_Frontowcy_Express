const numberAInput = document.querySelector("#number-a");
const numberBInput = document.querySelector("#number-b");
const form = document.querySelector("form");
const resultDiv = document.querySelector("#result");

form.addEventListener("submit", async (event) => {
  event.preventDefault();

  const NumberA = Number(numberAInput.value);
  const NumberB = Number(numberBInput.value);

  function setResult(text, color) {
    resultDiv.innerText = text;
    resultDiv.style.border = `1px solid ${color}`;
  }

  setResult("Loading...", "transparent");

  const res = await fetch("/calc/check", {
    method: "POST",
    body: JSON.stringify({ NumberA, NumberB }),
    headers: {
      "Content-Type": "application/json",
    },
  });
  const { divider } = await res.json();

  setResult(
    divider
      ? "Number B is divider of Number A"
      : "Number B is NOT divider of Number A",
    divider ? "green" : "red"
  );
});
