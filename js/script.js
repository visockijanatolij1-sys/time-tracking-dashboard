fetch("../js/data.json")
  .then((response) => response.json())
  .then((data) => {
    let activeTimeframe = "weekly";

    const reportButtons = document.querySelectorAll(".report-button");
    reportButtons.forEach((button) => {
      button.addEventListener("click", () => {
        reportButtons.forEach((button) => {
          button.classList.remove("active");
          button.setAttribute("aria-pressed", "false");
        });

        button.classList.add("active");
        button.setAttribute("aria-pressed", "true");

        activeTimeframe = button.textContent.toLowerCase().trim();

        console.log(JSON.stringify(activeTimeframe));
        drawActivity();
      });
    });

    function drawActivity() {
      const activity = document.querySelectorAll(".card-result_text");
      const currentActivity = document.querySelectorAll(
        ".card-result_current-time",
      );
      const previousActivity = document.querySelectorAll(
        ".card-result_past-time",
      );

      activity.forEach((element, index) => {
        let currentHours = data[index].timeframes[activeTimeframe].current;
        let previousHours = data[index].timeframes[activeTimeframe].previous;
        if (currentHours === 1) {
          currentActivity[index].textContent = `${currentHours}hr`;
        } else {
          currentActivity[index].textContent = `${currentHours}hrs`;
        }

        if (activeTimeframe === "daily") {
          if (previousHours === 1) {
            previousActivity[index].textContent =
              `Yesterday - ${previousHours}hr`;
          } else {
            previousActivity[index].textContent =
              `Yesterday - ${previousHours}hrs`;
          }
        } else if (activeTimeframe === "weekly") {
          if (previousHours === 1) {
            previousActivity[index].textContent =
              `Last Week - ${previousHours}hr`;
          } else {
            previousActivity[index].textContent =
              `Last Week - ${previousHours}hrs`;
          }
        } else if (activeTimeframe === "monthly") {
          if (previousHours === 1) {
            previousActivity[index].textContent =
              `Last Month - ${previousHours}hr`;
          } else {
            previousActivity[index].textContent =
              `Last Month - ${previousHours}hrs`;
          }
        }
      });
    }
    drawActivity();
  });
