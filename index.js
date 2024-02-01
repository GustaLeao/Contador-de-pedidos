//variáveis que peguem o id de spans ou elementos 'p' para ser usado depois para alterar o textContent com os números de cada pedido
const minusButton = document.getElementsByClassName("minus-button");
const plusButton = document.getElementsByClassName("plus-button");
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
  Ifood teve ${requests[9].value.innerHTML} pedidos, <br>
  Presencial teve ${requests[10].value.innerHTML} pedidos <br>
  Própria teve ${requests[11].value.innerHTML} pedidos <br>
  A maior quantidade de pedidos foi de ${highestRequest.name}
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

//tenho que adicionar um atualizador de página que faça com que o totalRequests apareça atualizado para o usuário
