//variáveis que peguem o id de spans ou elementos 'p' para ser usado depois para alterar o textContent com os números de cada pedido

//Fazer um var com os números ordenados para adicioanr eventos de maneira correrta
const minusButton = document.getElementsByClassName("minus-button");
const plusButton = document.getElementsByClassName("plus-button");
const minusButtonCategory = document.getElementsByClassName(
  "minus-button-category"
);
const plusButtonCategory = document.getElementsByClassName(
  "plus-button-category"
);
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
const historyBox = document.querySelector('.history_box');
const historyBoxDate = document.querySelector('.history_box_date')
const historyBoxText = document.querySelector('.history_box_text')
const date = new Date();
const requestInput = ["7", "8", "9", "4", "5", "6", "1", "2", "3"];
const categoryInput = ["/","*","-"
]
const copyText = document.getElementById("copy-text");

const totalRequests = () => {
  let accumulator = 0;
  for (let i = 0; i < 9; i++) {
    accumulator += Number(requests[i].value.innerHTML);
  }
  return accumulator;
};

var subtractCounter = (requestCounter) => {
  requestCounter.value.innerHTML > 0
    ? requestCounter.value.innerHTML--
    : alert("Já não há pedidos neste contador!");
};

var addCounter = (Counter) => {
  Counter.value.innerHTML++;
};

var updateTotalAndCopyText = () => {
  const highestRequestValue = [
    Math.max(...requests.map((request) => parseInt(request.value.innerHTML))),
  ];
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
  Pedidos da data ${date.getDate()}
  `;
};
updateTotalAndCopyText();

  for (let i = 0; i < minusButton.length; i++) {
    minusButton[i].addEventListener("click", () => {
      subtractCounter(requests[i]);
      updateTotalAndCopyText();
    });
  }


for (let i = 0; i < plusButton.length; i++) {
  plusButton[i].addEventListener("click", () => {
    addCounter(requests[i]);
    updateTotalAndCopyText();
  });
}


  window.addEventListener('keydown', (event) => {
     const key = event.key;
     if (requestInput.includes(key)) {
       const index = requestInput.indexOf(key);
       addCounter(requests[index]);
       updateTotalAndCopyText();
     }
  });
  
  window.addEventListener('keydown', (event) => {
     const key = event.key;
     if (categoryInput.includes(key)) {
       const index = categoryInput.indexOf(key);
       addCounter(requestCategory[index]);
       updateTotalAndCopyText();
     }
  });

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
