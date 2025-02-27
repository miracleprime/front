const events = document.querySelectorAll(".event");
const previewList = document.querySelectorAll(".set-photos a");
const mainPhoto = document.querySelector(".active-img");

previewList.forEach(previewPhoto => {
  previewPhoto.addEventListener("click", (evt) => {
    evt.preventDefault();

    mainPhoto.src = previewPhoto.href;
    
  });
});

document.querySelectorAll('.navigation a').forEach(anchor => {
    anchor.addEventListener('click', function (e) {
        e.preventDefault();
        let targetId = this.getAttribute('href');

        if (targetId === '#header1') {
            window.scrollTo({ top: 0, behavior: 'smooth' });
        } else {
            let targetElement = document.querySelector(targetId);
            if (targetElement) {
                targetElement.scrollIntoView({ behavior: 'smooth' });
            } else {
                console.error(`Element with ID "${targetId}" not found.`);
                alert(`Ссылка "${this.textContent}" не работает.`);
            }
        }
    });
});
window.addEventListener('scroll', () => {
    const header = document.querySelector('.main-header');
    if (window.scrollY > 0) {
      header.classList.add('sticky');
    } else {
      header.classList.remove('sticky');
    }
  });
const photos = document.querySelectorAll('.set-photos a');
const activeImg = document.querySelector('.active-img');
photos.forEach(photo => {
  photo.addEventListener('click', (event) => {
    event.preventDefault();
    const newImgSrc = photo.dataset.image;
    activeImg.src = newImgSrc;

    photos.forEach(link => link.classList.remove('active'));

    photo.classList.add('active');
  });
});





// let poiData = {
//     entertainment: [
//         {
//             name: "Цирк",
//             coordinates: [56.82586459496335, 60.604991989394236],
//             description: "Городской цирк с разнообразными представлениями.",
//             photo: "img/circus.jpg"
//         },
//         {
//             name: "Гривич",
//             coordinates: [56.82919730053192, 60.59922117842662],
//             description: "Торговый центр «Гринвич» в Екатеринбурге — крупный торгово-развлекательный комплекс с множеством магазинов, ресторанов и развлекательных зон.",
//             photo: "img/grivich.jpg" 
//         },
//         {
//             name: "Пассаж",
//             coordinates: [56.83658861509256, 60.59557888368065],
//             description: "Торговый центр «Пассаж» в Екатеринбурге — это стильный и современный комплекс, предлагающий широкий выбор бутиков, ресторанов и развлечений.",
//             photo: "img/passage.jpg" 
//         },
//         {
//             name: "Ingame Компы",
//             coordinates: [56.83000938256616, 60.60096933122565],
//             description: "Компьютерный клуб. <a href='https://ingamearena.ru/' target='_blank' rel='noopener noreferrer'>https://ingamearena.ru/</a>",
//             photo: "img/ingame.webp" 
//         },
//         {
//             name: "Екатеринбургский государственный академический театр оперы и балета",
//             coordinates: [56.838880274750956, 60.61668985783576],
//             description: "Екатеринбургский государственный академический театр оперы и балета — один из ведущих театров России, славящийся своими высококлассными постановками оперных и балетных спектаклей.<a href='https://uralopera.ru/' target='_blank' rel='noopener noreferrer'>https://uralopera.ru/</a>",
//             photo: "img/theater.jpg" 
//         }
//     ],
//     historical: [
//         {
//             name: "Доходный дом купца Е.И. Первушина, 1906 год",
//             coordinates: [56.830977887392116,60.60061952244435],
//             description: "В 1906 году в Екатеринбурге по проекту архитектора Павла Заруцкого был построен доходный дом для семьи Первушиных, известных мукомолов. Здание, инвестиционный проект богатой семьи, сразу после постройки заняли Екатеринбургское казначейство, уездный суд.",
//             photo: "img/dom 1906.jpg" 
//         },

//         {
//             name: "Усадьба Расторгуева-Харитонова",
//             coordinates: [56.84560648118366,60.611067990518734],
//             description: "Уса́дьба Расторгу́евых — Харито́новых — один из наиболее ценных архитектурных усадебно-парковых ансамблей в Екатеринбурге, памятник архитектуры федерального значения.",
//             photo: "img/ysadba.jpg" 
//         },

//         {
//             name: "Дом Н.И. Севастьянова",
//             coordinates: [56.839300379334205,60.60602886444369],
//             description: "Дом Севастья́нова — исторический и архитектурный памятник, расположенный в Екатеринбурге по адресу проспект Ленина, 35. Назван в честь одного из владельцев здания Н. И. Севастьянова. Одна из местных достопримечательностей, архитектура которой особо выделяется среди особняков города.",
//             photo: "img/gallery photo 5.jpg" 
//         },

//         {
//             name: "Памятник В. Н. Татищеву и Г. В. де Геннину",
//             coordinates: [56.8381564594502, 60.60591778512451],
//             description: "Памятник В.Н. Татищеву и Г.В. де Геннину в Екатеринбурге увековечивает память основателей города.",
//             photo: "img/tatishchev.jpg" 
//         },

//         {
//             name: "Ельцин Центр",
//             coordinates: [56.84494072330447, 60.591578357987586],
//             description: "Ельцин Центр в Екатеринбурге — это крупный музейный комплекс, посвящённый жизни и деятельности первого президента России Бориса Ельцина, а также истории России конца XX века.",
//             photo: "img/event-01.jpg" 
//         },
//         {
//             name: "Высоцкий",
//             coordinates: [56.83612793593231, 60.6145541698987],
//             description: "Высоцкий — это многофункциональный комплекс в Екатеринбурге, включающий в себя жилые апартаменты, офисы и отель, и являющийся одной из высочайших построек города.",
//             photo: "img/event-03.jpg" 
//         },
//         {
//             name: "Храм-на-Крови",
//             coordinates: [56.84441788304432, 60.608978282601676],
//             description: "Храм-на-Крови в Екатеринбурге — величественный собор, возведённый на месте гибели последнего российского императора Николая II и его семьи.",
//             photo: "img/event-02.jpeg" 
//         }
//     ]
// };

document.addEventListener('DOMContentLoaded', function() { // Гарантируем, что DOM загружен
    
    let addPlaceButton = document.getElementById('addPlaceButton');
    let addPlaceForm = document.getElementById('addPlaceForm');
    let savePlaceButton = document.getElementById('savePlaceButton');
    let cancelAddPlaceButton = document.getElementById('cancelAddPlaceButton');
    let mapElement = document.getElementById('map');
    let moderationForm = document.getElementById('moderationForm');
    const enterModerationButton = document.getElementById('enterModeration');
    if (enterModerationButton) {
        enterModerationButton.addEventListener('click', checkModerationPassword);
    }

    // Функция для отображения формы добавления места
    function showAddPlaceForm() {
        addPlaceForm.style.display = 'block';
        getCoordinatesByAddress(); // Вызываем функцию для получения координат при открытии формы
    }

    // Функция для скрытия формы добавления места
    function hideAddPlaceForm() {
        addPlaceForm.style.display = 'none';
    }

    // Функция для получения координат клика по карте
    function getCoordinatesFromClick(e) {
        let coords = e.get('coords');
        document.getElementById('placeLatitude').value = coords[0];
        document.getElementById('placeLongitude').value = coords[1];
    }

    // Обработчик клика по кнопке "Добавить место"
    addPlaceButton.addEventListener('click', function() {
        showAddPlaceForm();
    getCoordinatesByAddress();
    });

    // Обработчик клика по кнопке "Отмена"
    cancelAddPlaceButton.addEventListener('click', function() {
        hideAddPlaceForm();
    });

    // Обработчик клика по кнопке "Сохранить"
    // Обработчик клика по кнопке "Сохранить"
    savePlaceButton.addEventListener('click', function() {
        let name = document.getElementById('placeName').value;
        let description = document.getElementById('placeDescription').value;
        let category = document.getElementById('placeCategory').value;
        let latitude = document.getElementById('placeLatitude').value;
        let longitude = document.getElementById('placeLongitude').value;
        let photo = document.getElementById('placePhoto').value;

        // Отправить данные на сервер
        fetch('http://127.0.0.1:5000/api/routes', {
            method: 'POST',
            headers: {
                'Content-Type': 'application/json'
            },
            body: JSON.stringify({
                name: name,
                description: description,
                category: category,
                latitude: latitude,
                longitude: longitude,
                photo: photo
            })
        })
        .then(response => response.json())
        .then(data => {
            console.log('Успех:', data);
            loadRoutes(''); // Обновить карту
            hideAddPlaceForm(); // Скрыть форму после сохранения
        })
        .catch(error => {
            console.error('Ошибка:', error);
            alert('Произошла ошибка при добавлении места.');
        });
    });
    moderationForm.addEventListener('submit', function(event) {
        event.preventDefault(); // Отменить отправку формы по умолчанию
        loadPendingRoutes(); // Загрузить список мест, ожидающих модерации
    });

    // Обработчик клика по карте для получения координат
    mapElement.addEventListener('click', getCoordinatesFromClick);
});


function displayRoutesOnMap(routes) {
    // Очистить карту от старых меток (если необходимо)
    myMap.geoObjects.removeAll();

    routes.forEach(route => {
        console.log(route.photo);
        // Создать метку для каждого маршрута
        let placemark = new ymaps.Placemark([route.latitude, route.longitude], {
            balloonContentBody: `
                <div>
                    <h3>${route.name}</h3>
                    <p>${route.description}</p>
                    <p>Тип: ${route.activity_type}</p>
                    <img src="${route.photo}" alt="${route.name}" style="max-width: 200px;">
                </div>
            `
        });

        // Добавить метку на карту
        myMap.geoObjects.add(placemark);
    });
}

function loadRoutes(category) {
    let url = 'http://127.0.0.1:5000/api/routes'; // ПРАВИЛЬНЫЙ URL!
    if (category) {
        url += '?activity_type=' + category;
    }

    fetch(url)
        .then(response => response.json())
        .then(data => {
            // Данные успешно получены с бэкенда
            console.log("Данные с бэкенда:", data);
            // Отобразить данные на карте
            displayRoutesOnMap(data);
        })
        .catch(error => {
            console.error("Ошибка при загрузке данных:", error);
            alert("Произошла ошибка при загрузке данных с сервера.");
        });
}

function loadPendingRoutes() {
    fetch('http://127.0.0.1:5000/api/moderate')
        .then(response => response.json())
        .then(data => {
            let pendingRoutesList = document.getElementById('pendingRoutesList');
            pendingRoutesList.innerHTML = ''; // Очистить список

            data.forEach(route => {
                let listItem = document.createElement('li');
                listItem.innerHTML = `
                    <h3>${route.name}</h3>
                    <p>${route.description}</p>
                    <p>${route.latitude}</p>
                    <p>${route.longitude}</p>
                    <img src="${route.photo}" alt="${route.name}" style="max-width: 100px;">  
                    <button class="approveButton" data-id="${route.id}">Одобрить</button>
                    <button class="rejectButton" data-id="${route.id}">Отклонить</button>
                `;
                pendingRoutesList.appendChild(listItem);
            });

            // Добавить обработчики для кнопок "Одобрить" и "Отклонить"
            let approveButtons = document.querySelectorAll('.approveButton');
            approveButtons.forEach(button => {
                button.addEventListener('click', moderateRoute);
            });

            let rejectButtons = document.querySelectorAll('.rejectButton');
            rejectButtons.forEach(button => {
                button.addEventListener('click', moderateRoute);
            });
        })
        .catch(error => {
            console.error("Ошибка при загрузке мест, ожидающих модерации:", error);
        });
}

let isLoggedIn = false;
const moderationPassword = '123'; 

function checkModerationPassword() {
    const password = document.getElementById('moderationPassword').value;
    if (password === moderationPassword) {
        isLoggedIn = true;
        document.getElementById('pendingRoutesList').style.display = 'block';
        loadPendingRoutes(); // Загружаем список мест
        alert('Вход выполнен!');
    } else {
        isLoggedIn = false;
        document.getElementById('pendingRoutesList').style.display = 'none';
        alert('Неверный пароль!');
    }
}

function moderateRoute(event) {
    let routeId = event.target.dataset.id;
    let action = event.target.classList.contains('approveButton') ? 'approve' : 'reject';

    fetch('http://127.0.0.1:5000/api/moderate', {
        method: 'POST',
        headers: {
            'Content-Type': 'application/json'
        },
        body: JSON.stringify({
            id: routeId,
            action: action
        })
    })
    .then(response => response.json())
    .then(data => {
        console.log('Успех:', data);
        loadPendingRoutes(); // Обновить список
        loadRoutes('') // Обновить список маршрутов
    })
    .catch(error => {
        console.error('Ошибка при модерации места:', error);
    });
}


function getCoordinatesByAddress() {
    let address = document.getElementById('placeAddress').value;
    console.log('Адрес:', address);  // Добавлено

    ymaps.geocode(address)
        .then(function (res) {
            let coords = res.geoObjects.get(0).geometry.getCoordinates();
            console.log('Координаты:', coords);  // Добавлено
            document.getElementById('placeLatitude').value = coords[0];
            document.getElementById('placeLongitude').value = coords[1];
        })
        .catch(function(error) {
            console.error('Ошибка геокодирования:', error);
            alert('Не удалось определить координаты по адресу.');
        });
}

function init() {
    myMap = new ymaps.Map('map', {
        center: [56.838024209044896, 60.603893946661],
        zoom: 14,
        controls: ['routePanelControl']
    });
    myMap.events.add('click', function(e) {
        getCoordinatesFromClick(e);
    });


    let categorySelect = document.getElementById('categorySelect');

    categorySelect.addEventListener('change', function() {
        loadRoutes(this.value);
    });

    // Загрузить маршруты при инициализации карты
    loadRoutes(''); // Загрузить все маршруты по умолчанию

    function getCoordinatesFromClick(e) {
        let coords = e.get('coords');
        document.getElementById('placeLatitude').value = coords[0];
        document.getElementById('placeLongitude').value = coords[1];
    }
    loadPendingRoutes();
        const getCoordinatesButton = document.getElementById('getCoordinatesButton');
        if (getCoordinatesButton) {
            getCoordinatesButton.addEventListener('click', getCoordinatesByAddress);
        }
}

// Инициализировать карту Yandex только один раз
ymaps.ready(init);