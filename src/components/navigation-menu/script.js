function addButtonsNavMenu() {
  const arrNavigationMenuButton = ['home-logo', 'task-list-Icon', 'people-Icon', 'date-Icon', 'rating-Icon', 'cloud-Icon', 'map-Icon', 'settings-Icon'];

  arrNavigationMenuButton.forEach(el => {
    const navigationMenuButtonHTML = `
      <div class="navigation-menu__btn ${el}-btn-nav-menu">
        <img src="./src/components/navigation-menu/assets/${el}.svg" alt="${el}">
      </div>`;

    document.querySelector('.navigation-menu__wrapper').insertAdjacentHTML("beforeend", navigationMenuButtonHTML);
  });
}

function createNavMenu(insertionBlock) {
  const navigationMenuHTML = `
    <div class="navigation-menu__wrapper">
      <div class="navigation-menu__dashed-group">
        <div class="navigation-menu__dashed"></div>
      </div>
    </div>`;

  insertionBlock.insertAdjacentHTML("beforeend", navigationMenuHTML);
  addButtonsNavMenu();
}

