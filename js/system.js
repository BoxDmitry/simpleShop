'use strict';

(function () {
  const positions = {
    "basket_x": {
      "name": "Большая корзинка",
      "icon": "basket_x",
      "price": 200,
    },
    "basket_s": {
      "name": "Средняя корзинка",
      "icon": "basket_s",
      "price": 100,
    },
    "basket_m": {
      "name": "Маленькая корзинка",
      "icon": "basket_m",
      "price": 50,
    },
    "watermelon": {
      "name": "Арбуз",
      "icon": "watermelon",
      "price": 300,
    },
    "pineapple": {
      "name": "Апельсин",
      "icon": "orange",
      "price": 75,
    },
    "orange": {
      "name": "Ананас",
      "icon": "pineapple",
      "price": 300,
    },
    "eggplant": {
      "name": "Баклажан",
      "icon": "eggplant",
      "price": 175,
    },
    "banana": {
      "name": "Банан",
      "icon": "banana",
      "price": 300,
    },
    "grape": {
      "name": "Виноград",
      "icon": "grape",
      "price": 300,
    },
    "mushroom": {
      "name": "Гриб",
      "icon": "mushroom",
      "price": 75,
    },
    "kiwi": {
      "name": "Киви",
      "icon": "kiwi",
      "price": 125,
    },
    "cabbage": {
      "name": "Капуста",
      "icon": "cabbage",
      "price": 175,
    },
    "onion": {
      "name": "Лук",
      "icon": "onion",
      "price": 175,
    },
    "pasta": {
      "name": "Макароны",
      "icon": "pasta",
      "price": 350,
    },
    "cucumber": {
      "name": "Огурец",
      "icon": "cucumber",
      "price": 175,
    },
    "tomato": {
      "name": "Помидор",
      "icon": "tomato",
      "price": 75,
    },
    "pepper": {
      "name": "Перец",
      "icon": "pepper",
      "price": 125,
    },
    "fish": {
      "name": "Рыба",
      "icon": "fish",
      "price": 400,
    },
    "sausages": {
      "name": "Сосиски",
      "icon": "sausages",
      "price": 350,
    },
    "cheese": {
      "name": "Сыр",
      "icon": "cheese",
      "price": 125,
    },
    "bread": {
      "name": "Хлеб",
      "icon": "bread",
      "price": 100,
    },
    "garlic": {
      "name": "Чеснок",
      "icon": "garlic",
      "price": 75,
    },
    "apple": {
      "name": "Яблоко",
      "icon": "apple",
      "price": 75,
    }
  };

  let activeList = 1;
  let buttonNextList = $("#creat-kassa");
  let hideListPosition = true;

  let positionID = 1;
  let priceEnd = 0;
  let countEnd = 0;
  let discount = 0;
  let priceSumm = 0;

  let activeKey = "";

  const editPriceEnd = (value) => {
    priceEnd = priceEnd + Number(value);

    $("#count-position").text(countEnd === 0 ? "Нет" : countEnd);
    $("#price-summ").text(new Intl.NumberFormat('ru-RU').format(priceEnd));
    $("#price-end").text(new Intl.NumberFormat('ru-RU').format(priceEnd));

    if (priceEnd === 0) {
      $(".pay-kassa").addClass("disabled");
    }else {
      $(".pay-kassa").removeClass("disabled");
    }
  };

  const delitePosition = (e) => {
    const ID = Number($(e.delegateTarget).attr("data-postition"));
    const selector = "#position-" + ID;

    const price = Number($(selector).attr("data-price"));
    const count = Number($(selector).find(".text-count").text());

    editPriceEnd(price * count * -1);

    $(selector).remove();
    const countPosition = $(".position-list-kassa .position").length;

    if (countPosition === 0) {
      $(".position-list-kassa").addClass("hide");
      $(".no-position").removeClass("hide");

      hideListPosition = true;
      positionID = 1;
    }

    countEnd -= count;
    $("#count-position").text(countEnd === 0 ? "Нет" : countEnd);
  };

  const editPriceUserPosition = (e) => {
    const ID = Number($(e.delegateTarget).attr("data-postition"));
    const selector = "#position-" + ID;

    const price = Number($(selector).attr("data-price"));
    const count = Number($(selector).find(".text-count").text());

    editPriceEnd(price * count * -1);

    const newPrice = $(selector).find(".price").val();
    $(selector).attr("data-price", newPrice);

    editPriceEnd(newPrice * count);
  }

  const editCountPosition = (e) => {
    const ID = Number($(e.delegateTarget).attr("data-postition"));
    const selector = "#position-" + ID;

    const type = $(e.delegateTarget).attr("data-type");
    const price = Number($(selector).attr("data-price"));

    const activePriceElement = $(selector).find(".price");
    let activePrice = Number(activePriceElement.is('p') ? $(selector).find(".price").text() : $(selector).find(".price").val());

    let count = Number($(selector).find(".text-count").text());

    if (type === "add") {
      count++;
      countEnd++;

      editPriceEnd(activePrice * -1);
      activePrice += price;
      editPriceEnd(activePrice);
    }else if (count > 1) {
      count--;
      countEnd--;

      activePrice -= price;
      editPriceEnd(activePrice * -1);
    }

    $(selector).find(".text-count").text(count);

    if (activePriceElement.is('p')) {
      activePriceElement.text(activePrice);
    }
  }

  const addCatalogPosition = (e) => {
    const name = $(e.delegateTarget).attr("data-postition");
    const positionInfo = positions[name];

    if (hideListPosition) {
      $(".no-position").addClass("hide");
      $(".position-list-kassa").removeClass("hide");

      hideListPosition = false;
    }

    $(".position-list-kassa").append('<div class="position" id="position-' + positionID + '" data-price="' + positionInfo['price'] + '"><img src="img/position/' + positionInfo['icon'] + '.svg" class="image-position" alt=""/><div class="position-info"><div class="position-info_title"><h3>' + positionInfo['name'] + '</h3></div><div class="position-info_right"><div class="position-info_count"><button class="button-icon-round background count-round" data-type="remove" data-postition="' + positionID + '"><svg xmlns="http://www.w3.org/2000/svg" xmlns:xlink="http://www.w3.org/1999/xlink"><use xlink:href="/simpleShop/img/0e61676508755ee206b2b956bbda056f.svg#minus"></use></svg></button><p class="text-count count-round">1</p><button class="button-icon-round background count-round" data-type="add" data-postition="' + positionID + '"><svg xmlns="http://www.w3.org/2000/svg" xmlns:xlink="http://www.w3.org/1999/xlink"><use xlink:href="/simpleShop/img/0e61676508755ee206b2b956bbda056f.svg#plus"></use></svg></button></div><div class="position-info_price"><p class="price">' + positionInfo['price'] + '</p></div><div class="position-info_delite"><button class="button-icon-round position-delite" data-postition="' + positionID + '"><svg xmlns="http://www.w3.org/2000/svg" xmlns:xlink="http://www.w3.org/1999/xlink"><use xlink:href="/simpleShop/img/0e61676508755ee206b2b956bbda056f.svg#trash"></use></svg></button></div></div></div></div>');
    positionID++;
    editPriceEnd(positionInfo['price']);
    countEnd++;
    $("#count-position").text(countEnd === 0 ? "Нет" : countEnd);

    const addPosition = $(".position:last-child");

    addPosition.find(".position-delite").on("click", delitePosition);
    addPosition.find(".button-icon-round.count-round").on("click", editCountPosition);
    addPosition.find(".price").on("input", editPriceUserPosition);

    hideCatalog();
  };

  const addUserPosition = () => {
    if (hideListPosition) {
      $(".no-position").addClass("hide");
      $(".position-list-kassa").removeClass("hide");

      hideListPosition = false;
    }

    $(".position-list-kassa").append('<div class="position" id="position-' + positionID + '" data-price="100"><img src="img/package.svg" class="image-position" alt=""/><div class="position-info"><div class="position-info_title"><h3>Произвольный товар</h3></div><div class="position-info_right"><div class="position-info_count"><button class="button-icon-round background count-round" data-type="remove" data-postition="' + positionID + '"><svg xmlns="http://www.w3.org/2000/svg" xmlns:xlink="http://www.w3.org/1999/xlink"><use xlink:href="/simpleShop/img/0e61676508755ee206b2b956bbda056f.svg#minus"></use></svg></button><p class="text-count count-round">1</p><button class="button-icon-round background count-round" data-type="add" data-postition="' + positionID + '"><svg xmlns="http://www.w3.org/2000/svg" xmlns:xlink="http://www.w3.org/1999/xlink"><use xlink:href="/simpleShop/img/0e61676508755ee206b2b956bbda056f.svg#plus"></use></svg></button></div><div class="position-info_price"><input type="number" data-postition="' + positionID + '" class="price" value="100" placeholder="100"/></div><div class="position-info_delite"><button class="button-icon-round position-delite" data-postition="' + positionID + '"><svg xmlns="http://www.w3.org/2000/svg" xmlns:xlink="http://www.w3.org/1999/xlink"><use xlink:href="/simpleShop/img/0e61676508755ee206b2b956bbda056f.svg#trash"></use></svg></button></div></div></div></div>');
    positionID++;
    editPriceEnd(100);
    countEnd++;
    $("#count-position").text(countEnd === 0 ? "Нет" : countEnd);

    const addPosition = $(".position:last-child");
    
    addPosition.find(".position-delite").on("click", delitePosition);
    addPosition.find(".button-icon-round.count-round").on("click", editCountPosition);
    addPosition.find(".price").on("input", editPriceUserPosition);
  };

  const showCatalog = () => {
    $(".kassa-3").addClass("hide");
    $(".kassa-catalog").removeClass("hide");
  };

  const hideCatalog = () => {
    $(".kassa-catalog").addClass("hide");
    $(".kassa-3").removeClass("hide");
  };

  const haveCard = () => {
    discount = Math.round(priceEnd / 100 * 15);

    priceEnd = priceEnd - discount;
    showList();
  };

  const clickKey = (e) => {
    const value = $(e.delegateTarget).attr("data-value");

    if (value == "delite") {
      activeKey = activeKey.length == 1 ? "0" : activeKey.slice(0, -1);
    }else {
      activeKey = activeKey + "" + value;
    }

    if (Number(activeKey) < priceEnd) {
      $("#save-cash").addClass("disabled");
    }else {
      $("#save-cash").removeClass("disabled");
    }

    $(".kassa-5 .input-value.rub").text(new Intl.NumberFormat('ru-RU').format(activeKey));
  };

  const restart = () => {
    activeList = 0;
    $(".kassa-7").addClass("hide");

    showList();
  }

  const settingList = (list = activeList) => {
    switch (list) {
      case 1:
        hideListPosition = true;

        positionID = 1;
        priceEnd = 0;
        countEnd = 0;
        discount = 0;
        priceSumm = 0;

        activeKey = "";

        buttonNextList.off("click", showList);
        buttonNextList.on("click", showList);

        break;

      case 2:
        buttonNextList = $("#hello-user");

        buttonNextList.off("click", showList);
        buttonNextList.on("click", showList);

        break;
      case 3:
        $(".user-position").off("click", addUserPosition);
        $(".catalog-position").off("click", showCatalog);

        $(".user-position").on("click", addUserPosition);
        $(".catalog-position").on("click", showCatalog);

        $("#back-kassa").off("click", hideCatalog);
        $("#back-kassa").on("click", hideCatalog);

        buttonNextList = $(".pay-kassa");

        buttonNextList.off("click", showList);
        buttonNextList.on("click", showList);

        break;
      case 4:
        $("#have-card").off("click", haveCard);
        $("#have-card").on("click", haveCard);

        buttonNextList = $("#no-have-card");

        buttonNextList.off("click", showList);
        buttonNextList.on("click", showList);

        priceSumm = priceEnd;

        break;
      case 5:
        $(".keyboard .key").off("click", clickKey);
        $(".keyboard .key").on("click", clickKey);

        if (priceEnd > 0) {
          $("#save-cash").addClass("disabled");
        }

        buttonNextList = $("#save-cash");

        buttonNextList.off("click", showList);
        buttonNextList.on("click", showList);

        break;
      case 6:
        $(".return-cash-save").text(new Intl.NumberFormat('ru-RU').format(Number(activeKey)) - priceEnd);

        buttonNextList = $("#return-chash");

        buttonNextList.off("click", showList);
        buttonNextList.on("click", showList);

        break;
      case 7:
        $("#count-position-close").text(countEnd);

        $("#price-summ-close").text(new Intl.NumberFormat('ru-RU').format(priceSumm));

        if (discount > 0) {
          $("#price-minus-close").parent().removeClass("hide");
          $("#price-minus-close").text("−" + new Intl.NumberFormat('ru-RU').format(discount));
        }else {
          $("#price-minus-close").parent().addClass("hide");
        }

        $("#price-end-close").text(new Intl.NumberFormat('ru-RU').format(priceEnd));

        $("#cash-close").text(new Intl.NumberFormat('ru-RU').format(Number(activeKey)));
        $("#cash-return-close").text(new Intl.NumberFormat('ru-RU').format(Number(activeKey) - priceEnd));

        buttonNextList = $("#restart");

        buttonNextList.off("click", restart);
        buttonNextList.on("click", restart);

        break;
    }
  };

  const showList = () => {
    buttonNextList.off("click", showList);

    $(".kassa-" + activeList).addClass("hide");
    activeList++;

    $(".kassa-" + activeList).removeClass("hide");

    settingList();
  };

  $(".kassa:not(.kassa-" + activeList + ")").addClass("hide");
  settingList();

  const catalog = $(".kassa-catalog .position-list");

  for (const position in positions) {
    const positionInfo = positions[position];

    catalog.append('<div class="position"><img src="img/position/' + positionInfo['icon'] + '.svg" alt="" class="image-position"/><div class="position-info"><div class="position-info_title"><h3>' + positionInfo['name'] + '</h3></div><div class="position-info_right"><div class="position-info_price"><p class="price">' + positionInfo['price'] + '</p></div><div class="position-info_creat"><button class="button-icon-round position-creat" data-postition="' + position + '"><svg xmlns="http://www.w3.org/2000/svg" xmlns:xlink="http://www.w3.org/1999/xlink"><use xlink:href="/simpleShop/img/0e61676508755ee206b2b956bbda056f.svg#plus"></use></svg></button></div></div></div></div>');

    const lastCatalogPosition = catalog.find(".position:last-child");

    lastCatalogPosition.find(".position-creat").on("click", addCatalogPosition);
  }
})();