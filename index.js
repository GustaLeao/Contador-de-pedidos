const minusButton = document.getElementsByClassName("minus-button");
const plusButton = document.getElementsByClassName("plus-button");
const minusButtonCategory = document.getElementsByClassName(
  "minus-button-category"
);
const plusButtonCategory = document.getElementsByClassName(
  "plus-button-category"
);
const copyText = document.getElementById("copy-text");

const requests = [
  {
    name: "macarrão 500g",
    value: document.getElementById("500-m"),
  },
  {
    name: "macarrão 750g",
    value: document.getElementById("750-m"),
  },
  {
    name: "macarrão 1kg",
    value: document.getElementById("1000-m"),
  },
  {
    name: "lasanha de frango 500g",
    value: document.getElementById("l1-500"),
  },
  {
    name: "lasanha de frango750g",
    value: document.getElementById("l1-750"),
  },
  {
    name: "lasanha de frango 1kg",
    value: document.getElementById("l1-1000"),
  },
  {
    name: "lasanha de carne 500g",
    value: document.getElementById("l2-500"),
  },
  {
    name: "lasanha de carne 750g",
    value: document.getElementById("l2-750"),
  },
  {
    name: "lasanha de carne 1kg",
    value: document.getElementById("l2-1000"),
  },
];

const requestCategory = [
  {
    name: "ifood",
    value: document.getElementById("ifood"),
  },
  {
    name: "presencial",
    value: document.getElementById("in-person"),
  },
  {
    name: "própria",
    value: document.getElementById("own-delivery"),
  },
];

//history column variables
const historyBox = document.getElementById("history_box");
const historyBoxContainers = [];

// Variável para data
const date = new Date();
const actualDate = date.getDate();
const actualMonth = date.getMonth() + 1;

//varibales for keyboard events
const requestInput = ["7", "8", "9", "4", "5", "6", "1", "2", "3"];
const categoryInput = ["/", "*", "-"];

//start functions below
const dateFixed = () => {
  let fixed = 0;
  actualMonth < 10
    ? (fixed = `${actualDate}/0${actualMonth}`)
    : (fixed = `${actualDate}/${actualMonth}`);
  return fixed;
};

const totalRequests = () => {
  let accumulator = 0;
  for (let i = 0; i < 9; i++) {
    accumulator += Number(requests[i].value.innerHTML);
  }
  return accumulator;
};

const qtyLasagnaRequests = () => {
  let total = 0;
  for (let i = 3; i < 9; i++) {
    total += Number(requests[i].value.innerHTML);
  }
  return total;
};

const qtyPastaRequests = () => {
  let total = 0;
  for (let i = 0; i < 3; i++) {
    total += Number(requests[i].value.innerHTML);
  }
  return total;
};

var subtractCounter = (requestCounter) => {
  requestCounter.value.innerHTML > 0
    ? requestCounter.value.innerHTML--
    : alert("Já não há pedidos neste contador!");
};

var addCounter = (Counter) => {
  Counter.value.innerHTML++;
};

const createUpdateStorage = () => {
  localStorage.setItem(
    `qtyLasagnaRequest ${dateFixed()}`,
    qtyLasagnaRequests()
  );
  localStorage.setItem(`qtyPastaRequest ${dateFixed()}`, qtyPastaRequests());
  localStorage.setItem(`Orders_${dateFixed()}`, dateFixed());
}

const verifyStorage = () => {
  
}

var updateTexts = () => {
  const highestRequest = requests.reduce(
    (highest, request) => {
      const value = parseInt(request.value.innerHTML);
      return value > highest.value
        ? { name: request.name, value: value }
        : highest;
    },
    { name: "nenhum prato até agora", value: 0 }
  );

  copyText.innerHTML = `O número total de pedidos é de ${totalRequests()}. <br>
  Ifood teve ${requestCategory[0].value.innerHTML} pedidos, <br>
  Presencial teve ${requestCategory[1].value.innerHTML} pedidos <br>
  Própria teve ${requestCategory[2].value.innerHTML} pedidos <br><br>
  A maior quantidade de pedidos foi de ${highestRequest.name}<br>
  `;
  
};
updateTexts();

const addUpdateContainer = () => {
  let todayDate = dateFixed();
  if ((todayDate = localStorage.getItem(`Orders_${dateFixed()}`))) {
    historyBoxContainers.push(`<div class="history_inner_container">
  <h3 class="history_box_date"> ${dateFixed()} </h3>
  <p class="history_box_text">
    Macarrão: ${localStorage.getItem(
      `qtyPastaRequest${dateFixed()}`
    )} pedidos<br>
    Lasanha: ${localStorage.getItem(
      `qtyLasagnaRequests${dateFixed()}`
    )} pedidos<br>
  </p>
</div>`);
historyBox.innerHTML = `${historyBoxContainers}
  <div class="history_inner_container">
  <h3 class="history_box_date"> ${dateFixed()} </h3>
  <p class="history_box_text">
    Macarrão: ${localStorage.getItem(
      `qtyPastaRequest${dateFixed}`
    )} pedidos<br>
    Lasanha: ${localStorage.getItem(
      `qtyLasagnaRequests${dateFixed}`
    )} pedidos<br>
  </p>
</div>`
}};
addUpdateContainer();

for (let i = 0; i < minusButton.length; i++) {
  minusButton[i].addEventListener("click", () => {
    subtractCounter(requests[i]);
    updateTexts();
    createUpdateStorage()
  });
}

for (let i = 0; i < plusButton.length; i++) {
  plusButton[i].addEventListener("click", () => {
    addCounter(requests[i]);
    updateTexts();
    createUpdateStorage()
  });
}

for (let i = 0; i < minusButtonCategory.length; i++) {
  minusButtonCategory[i].addEventListener("click", () => {
    subtractCounter(requestCategory[i]);
    updateTexts();
  });
}

for (let i = 0; i < plusButtonCategory.length; i++) {
  plusButtonCategory[i].addEventListener("click", () => {
    addCounter(requestCategory[i]);
    updateTexts();
  });
}

// start event listeners below
window.addEventListener("keydown", (event) => {
  const key = event.key;
  if (requestInput.includes(key)) {
    const index = requestInput.indexOf(key);
    addCounter(requests[index]);
    updateTexts();
    createUpdateStorage()
  }
});

window.addEventListener("keydown", (event) => {
  const key = event.key;
  if (categoryInput.includes(key)) {
    const index = categoryInput.indexOf(key);
    addCounter(requestCategory[index]);
    updateTexts();
  }
});

window.addEventListener("keydown", (e) => {
  const key = e.key;
  if (categoryInput.includes(key) || requestInput.includes(key)) {
    ;
  }
});
