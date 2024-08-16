let box = document.querySelectorAll(".box");
let newgame = document.querySelector("#new-btn");
let msgcontainer = document.querySelector(".msg-container");
let message = document.querySelector("#msg");
let turno = true;
const winpattern = [
    [0, 1, 2], [0, 3, 6], [0, 4, 8],
    [1, 4, 7], [2, 5, 8], [2, 4, 6],
    [3, 4, 5], [6, 7, 8]
];

box.forEach((boxes) => {
    boxes.addEventListener("click", () => {
        if (boxes.innerText === "") { // Only allow action if the box is empty
            boxes.innerText = turno ? "0" : "x";
            boxes.classList.add("clicked"); // Add a class to indicate the button has been clicked
            turno = !turno;
            checkwinner();
        }
    });
});

const showwinner = (winner) => {
    message.innerText = `Congratulations, the winner is ${winner}`;
    msgcontainer.classList.remove("hide");
    box.forEach((boxes) => boxes.setAttribute("disabled", "true")); // Disable all boxes
};

const resetGame = () => {
    box.forEach((boxes) => {
        boxes.innerText = "";
        boxes.classList.remove("clicked");
        boxes.removeAttribute("disabled");
    });
    msgcontainer.classList.add("hide");
    turno = true;
};

const checkwinner = () => {
    for (let pattern of winpattern) {
        let position1 = box[pattern[0]].innerText;
        let position2 = box[pattern[1]].innerText;
        let position3 = box[pattern[2]].innerText;
        if (position1 !== "" && position2 !== "" && position3 !== "") {
            if (position1 === position2 && position2 === position3) {
                showwinner(position1);
                return; // Exit function after finding a winner
            }
        }
    }
};

newgame.addEventListener("click", resetGame);
