const CARD_FLIP_DELAY_BETWEEN_MS = 150;
const CARD_FLIP_DELAY_BETWEEN_FLIPPED_MS = 75;

const lists = {
  'DOAp': {
    rate: {
      total: 9,
      'C': 6,
      'U': 2,
      'R': 1,
      'SR': {
        chance: 0.25,
        replaces: 'R',
      }
    },
    cards: [{
      id: 'X8nzLt8g3A',
      rarity: 'C',
    }, {
      id: 'Woa1K0GUWh',
      rarity: 'SR',
    }, {
      id: 'DMZJI3Ahw8',
      rarity: 'C',
    }, {
      id: 'TqCcJoJ1jP',
      rarity: 'C',
    }, {
      id: 'a2NCLoSyXC',
      rarity: 'R',
    }, {
      id: 'WaxfxF6gKQ',
      rarity: 'C',
    }, {
      id: 'zPLTy7x1XL',
      rarity: 'SR',
    }, {
      id: 'P7HUyoVVKD',
      rarity: 'SR',
    }, {
      id: 'VhnWSG9ylR',
      rarity: 'C',
    }, {
      id: 'grZJAjxXXi',
      rarity: 'C',
    }, {
      id: 'zFDWR3ZzQV',
      rarity: 'U',
    }, {
      id: 'GGqvrmxp8Y',
      rarity: 'SR',
    }, {
      id: 'KSKbpeiFQR',
      rarity: 'C',
    }, {
      id: 'VqA6aSalXw',
      rarity: 'C',
    }, {
      id: 'bZ2tagSaFZ',
      rarity: 'C',
    }, {
      id: 'ybT6KGi3Ha',
      rarity: 'C',
    }, {
      id: 'JkMKE6adCw',
      rarity: 'C',
    }, {
      id: 'TunoowZr48',
      rarity: 'C',
    }, {
      id: 'IWj5G7UO24',
      rarity: 'C',
    }, {
      id: 'UyNpsv41nN',
      rarity: 'C',
    }, {
      id: 'glApsoTUXv',
      rarity: 'C',
    }, {
      id: 'UvDktoulIJ',
      rarity: 'C',
    }, {
      id: 'pjvYLaHE1k',
      rarity: 'U',
    }, {
      id: 'DOONM8ZQwt',
      rarity: 'R',
    }, {
      id: 'H64mP98Ch4',
      rarity: 'U',
    }, {
      id: 'qL8RBfLJBy',
      rarity: 'C',
    }, {
      id: 'sCeymbd0qF',
      rarity: 'R',
    }, {
      id: 'jTz60pxgUk',
      rarity: 'U',
    }, {
      id: 'hNbiB57qyJ',
      rarity: 'R',
    }, {
      id: 'ZbbeSsnVeU',
      rarity: 'U',
    }, {
      id: 'OiOzavefYK',
      rarity: 'U',
    }, {
      id: 'iHjJQO9Ff1',
      rarity: 'C',
    }, {
      id: 'VSzmyrUmrr',
      rarity: 'U',
    }, {
      id: '7h8JzLeWPU',
      rarity: 'C',
    }, {
      id: 'aB93Fl6PFL',
      rarity: 'U',
    }, {
      id: 'STiZ1fifo0',
      rarity: 'U',
    }, {
      id: 'ctVRMYgJdw',
      rarity: 'U',
    }, {
      id: 'wUdHOz9NF4',
      rarity: 'U',
    }, {
      id: 'AZyC3TllBp',
      rarity: 'C',
    }, {
      id: 'afOREBOCmx',
      rarity: 'R',
    }, {
      id: 'V6gBBisXz5',
      rarity: 'C',
    }, {
      id: 'xRxSDiSKlR',
      rarity: 'R',
    }, {
      id: 'ugvzKCILz4',
      rarity: 'U',
    }, {
      id: 'dfoXKlqFzL',
      rarity: 'C',
    }, {
      id: 'xR2vHpYtzA',
      rarity: 'U',
    }, {
      id: 'jr2PgdeTQj',
      rarity: 'C',
    }, {
      id: 't3F6t2J2F9',
      rarity: 'C',
    }, {
      id: 'oJxHM7bFVy',
      rarity: 'U',
    }, {
      id: '7YwfHJaVjZ',
      rarity: 'SR',
    }, {
      id: 'aKBLFcgUVY',
      rarity: 'SR',
    }, {
      id: 'j76ffxEal6',
      rarity: 'SR',
    }, {
      id: 'EtI3gm9YhK',
      rarity: 'R',
    }, {
      id: 'D1LJVwFNkh',
      rarity: 'R',
    }, {
      id: 'seHW4HxE03',
      rarity: 'U',
    }]
  },
}

const container = document.querySelector('.pack-simulator');
const btnOpen = container.querySelector('.pack-simulator-button-open');
const btnAutomate = container.querySelector('.pack-simulator-button-automate');
const field = container.querySelector('.pack-simulator-field');
let fieldState = 'ready';

const showError = (err) => {
  btnAutomate.disabled = true;
  btnOpen.disabled = true;
  field.innerHTML = '<p>An error has occurred. Please try again later.</p>';
  throw new Error(err);
}

const activeList = lists[container.dataset.list];

if (!activeList) {
  showError(`There is no matching card list for set code "${container.dataset.list}".`);
}

btnAutomate.disabled = false;
btnOpen.disabled = false;

const stats = {
  opened: 0,
  percentage: 0,
  pulled: [],
  total: activeList.cards.length,
}

let isAutomation = false;

container.querySelector('.pack-simulator-total-count').innerHTML = stats.total;

const updateStats = (selectedCards) => {
  stats.opened += 1;
  stats.pulled = [
    ...stats.pulled,
    ...selectedCards.filter(selectedCard => !stats.pulled.find(pulledCard => pulledCard.id === selectedCard.id))
  ];
  stats.percentage = Math.floor(((100/stats.total)*stats.pulled.length) * 100) / 100;

  container.querySelector('.pack-simulator-opened-count').innerHTML = stats.opened;
  container.querySelector('.pack-simulator-pulled-count').innerHTML = stats.pulled.length;
  container.querySelector('.pack-simulator-pulled-percentage').innerHTML = `${stats.percentage}%`;

  if (stats.percentage >= 100) {
    container.querySelector(`.pack-simulator-100-percent${isAutomation ? '-automation' : ''}`).style.display = 'block';
  }
}

const flipCards = async (visible = false) => {
  const timer = ms => new Promise(res => setTimeout(res, ms));
  const cards = [...field.querySelectorAll('.pack-simulator-field-cards-card')];

  for (let i = 0; i < cards.length; i++) {
    cards[i].classList[visible ? 'add' : 'remove']('pack-simulator-field-cards-card-flipped');
    await timer(visible ? CARD_FLIP_DELAY_BETWEEN_MS : CARD_FLIP_DELAY_BETWEEN_FLIPPED_MS);
  }

  const offsetTime = (visible ? CARD_FLIP_DELAY_BETWEEN_MS : CARD_FLIP_DELAY_BETWEEN_FLIPPED_MS) * 4;

  setTimeout(async () => {
    cards[0].parentElement.classList[visible ? 'add' : 'remove']('pack-simulator-field-cards-flipped');
    btnOpen.innerHTML = 'Try again';

    if (!visible) {
      openPack();
    } else if (isAutomation) {
      if (stats.percentage < 100) {
        flipCards();
      }
    } else {
      btnAutomate.disabled = false;
      btnOpen.disabled = false;
    }
  }, offsetTime);

  await timer(offsetTime);
}

const selectCards = () => {
  const {
    cards,
    rate,
  } = activeList;

  const selected = [];

  const selectCardByRarity = (rarity) => {
    const cardMatches = cards.filter(({ id, rarity: cardRarity }) => cardRarity === rarity && !selected.find(entry => entry.id === id));

    if (cardMatches.length === 0) {
      showError(`The pull rate for rarity "${rarity}" is greater than the number of cards matching that rarity.`);
    }
    
    return cardMatches[Math.floor(Math.random() * cardMatches.length)];
  }

  ['C', 'U', 'R', 'SR'].filter(rarity => rate[rarity]).forEach((rarity) => {
    const cardPullRate = rate[rarity];

    if (cardPullRate.chance && cardPullRate.replaces) {
      if (Math.random() > cardPullRate.chance) {
        return;
      }

      selected[selected.findIndex(({ rarity: selectedRarity }) => selectedRarity === cardPullRate.replaces)] = selectCardByRarity(rarity);
      return;
    }
    
    if (typeof cardPullRate === 'number') {
      for (let i = 0; i < cardPullRate; i++) {
        selected.push(selectCardByRarity(rarity));
      }
      return;
    }

    showError(`Card pull rate is in invalid format for rarity ${rarity} on set code ${container.dataset.list}.`);
  });

  return selected;
}

const resetField = () => {
  fieldState = 'ready';
  flipCards(false);
}

const initField = () => {
  const cards = new Array(activeList.rate.total).fill((
    `<div class="pack-simulator-field-cards-card"><div class="pack-simulator-field-cards-card-back"></div><div class="pack-simulator-field-cards-card-front"></div></div>`
  ));
  field.innerHTML = `<div class="pack-simulator-field-cards">${cards.join('')}</div>`
}

const openPack = async () => {
  fieldState = 'reset';
  const cards = field.querySelectorAll('.pack-simulator-field-cards-card-front');

  const selectedCards = selectCards();
  
  await Promise.all(selectedCards.map((card, index) => {
    new Promise((resolve, reject) => {
      const cardImage = new Image();
      cardImage.addEventListener('load', function() {
        const cardElem = cards[index];

        cardElem.classList[stats.pulled.find(pulledCard => pulledCard.id === card.id) ? 'add' : 'remove']('pack-simulator-field-cards-card-front-old');
        cardElem.dataset.rarity = card.rarity;
        cardElem.style.backgroundImage = `url(${cardImage.src})`;
        
        resolve(true);
      });

      cardImage.src = `https://img.silvie.org/api-data/${card.id}.jpg`;
    })
  }));

  await flipCards(true);
  updateStats(selectedCards);
}

btnOpen.addEventListener('click', () => {
  btnOpen.disabled = true;
  btnAutomate.disabled = true;

  if (fieldState === 'ready') {
    openPack();
    return;
  }

  resetField();
});

btnAutomate.addEventListener('click', () => {
  btnAutomate.disabled = true;
  btnOpen.disabled = true;
  isAutomation = true;

  if (fieldState === 'ready') {
    openPack();
    return;
  }

  resetField();
});

initField();