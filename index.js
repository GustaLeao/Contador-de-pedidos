import 'https://tomashubelbauer.github.io/github-pages-local-storage/index.js';

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

// Variável para data
const date = new Date();
let actualDate = date.getDate();
let actualMonth = date.getMonth();

//varibales for keyboard events
const requestInput = ["7", "8", "9", "4", "5", "6", "1", "2", "3"];
const categoryInput = ["/", "*", "-"];

//start functions below
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

const updateHistoryContainerText = (pasta,lasagna) => {
  historyBox.innerHTML= `
    <div class="history_inner_container">
      <h3 class="history_box_date"> ${actualDate}/0${actualMonth+1} </h3>
      <p class="history_box_text">
        Macarrão: ${pasta} pedidos<br>
        Lasanha: ${lasagna} pedidos<br>
      </p>
    </div>
      `
}

var subtractCounter = (requestCounter) => {
  requestCounter.value.innerHTML > 0
    ? requestCounter.value.innerHTML--
    : alert("Já não há pedidos neste contador!");
};

var addCounter = (Counter) => {
  Counter.value.innerHTML++;
};

var updateTotalAndCopyText = () => {
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
  localStorage.setItem(`qtyLasagnaRequest${actualDate}`,qtyLasagnaRequests())
};
updateTotalAndCopyText();

for (let i = 0; i < minusButton.length; i++) {
  minusButton[i].addEventListener("click", () => {
    subtractCounter(requests[i]);
    updateTotalAndCopyText();
    updateHistoryContainerText(qtyPastaRequests(),qtyLasagnaRequests());
  });
}

for (let i = 0; i < plusButton.length; i++) {
  plusButton[i].addEventListener("click", () => {
    addCounter(requests[i]);
    updateTotalAndCopyText();
    updateHistoryContainerText(qtyPastaRequests(),qtyLasagnaRequests());
  });
}

for (let i = 0; i < minusButtonCategory.length; i++) {
  minusButtonCategory[i].addEventListener("click", () => {
    subtractCounter(requestCategory[i]);
    updateTotalAndCopyText();
  });
}

for (let i = 0; i < plusButtonCategory.length; i++) {
  plusButtonCategory[i].addEventListener("click", () => {
    addCounter(requestCategory[i]);
    updateTotalAndCopyText();
    
  }); 
}

// start event listeners below
window.addEventListener("keydown", (event) => {
  const key = event.key;
  if (requestInput.includes(key)) {
    const index = requestInput.indexOf(key);
    addCounter(requests[index]);
    updateTotalAndCopyText();
  }
});

window.addEventListener("keydown", (event) => {
  const key = event.key;
  if (categoryInput.includes(key)) {
    const index = categoryInput.indexOf(key);
    addCounter(requestCategory[index]);
    updateTotalAndCopyText();
  }
});

window.addEventListener("keydown", (e) => {
  const key = e.key;
  if (categoryInput.includes(key) || requestInput.includes(key)) {
    updateHistoryContainerText(qtyPastaRequests(),qtyLasagnaRequests());
    localStorage.setItem('qtyLasagnaRequests',qtyLasagnaRequests());
    localStorage.setItem('qtyPastaRequests',qtyPastaRequests());
  }
});

//atualiza o histórico com os dados do localStorage
window.addEventListener('load',() =>
  updateHistoryContainerText(localStorage.getItem('qtyPastaRequests'),localStorage.getItem('qtyLasagnaRequests'))
)