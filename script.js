const generateBtn = document.getElementById("generate-btn");
const paletteContainer = document.getElementById("palette-container");
const copyBtn = document.querySelector(".copy-btn");

window.addEventListener("load", function () {
  paletteContainer.addEventListener("click", function (e) {
    if (e.target.classList.contains("copy-btn")) {
      let hexValue = e.target.previousElementSibling.textContent;
      navigator.clipboard
        .writeText(hexValue)
        .then(() => ShowCopySuccess(e.target))
        .catch((e) => console.log(e));
    } else if (e.target.classList.contains("color")) {
      let hexValue =
        e.target.nextElementSibling.querySelector(".hex-value").textContent;
      navigator.clipboard
        .writeText(hexValue)
        .then(() =>
          ShowCopySuccess(
            e.target.nextElementSibling.querySelector(".copy-btn"),
          ),
        )
        .catch((e) => console.log(e));
    }
  });

  function ShowCopySuccess(e) {
    e.classList.remove("fa-regular", "fa-copy");
    e.classList.add("fas", "fa-check");
    e.style.color = "#48bb78";

    setTimeout(() => {
      e.classList.remove("fas", "fa-check");
      e.classList.add("fa-regular", "fa-copy");
      e.style.color = "#64748b";
    }, 1500);
  }

  generateBtn.addEventListener("click", generatePolette);

  function generatePolette() {
    const colors = [];

    for (let i = 0; i < 12; i++) {
      colors.push(generateColor());
    }

    updatePaletteContainer(colors);
  }

  function generateColor() {
    const letters = "0123456789ABCDEF";

    let color = "#";

    for (let i = 0; i < 6; i++) {
      color += letters[Math.floor(Math.random() * 16)];
    }

    return color;
  }

  function updatePaletteContainer(colors) {
    var colorsBox = document.querySelectorAll(".color-box");

    colorsBox.forEach((box, index) => {
      let color = colors[index];
      const colorInfo = box.querySelector(".color");
      const hexValue = box.querySelector(".hex-value");

      colorInfo.style.backgroundColor = color;
      hexValue.textContent = color;
    });
  }

  generatePolette();
});
