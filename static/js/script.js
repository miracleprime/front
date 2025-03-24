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


document.addEventListener('DOMContentLoaded', function() { 
    
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
        if (coords) {
            document.getElementById('placeLatitude').value = coords[0];
            document.getElementById('placeLongitude').value = coords[1];
        } else {
            console.error('Не удалось получить координаты клика.');
        }
    }


    // Обработчик клика по кнопке Добавить место
    addPlaceButton.addEventListener('click', function() {
        showAddPlaceForm();
    getCoordinatesByAddress();
    });

    // Обработчик клика по кнопке Отмена
    cancelAddPlaceButton.addEventListener('click', function() {
        hideAddPlaceForm();
    });


    // Обработчик клика по кнопке сохранить
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

function loadReviews(routeId) {
    const reviewsDiv = document.getElementById(`reviews-${routeId}`);
    if (!reviewsDiv) {
        console.error(`Элемент для отзывов с ID reviews-${routeId} не найден`);
        return;
    }

    fetch(`/api/routes/${routeId}/reviews`)
        .then(response => response.json())
        .then(data => {
            let reviewsHTML = '';
            data.forEach(review => {
                reviewsHTML += `
                    <p><b>${review.username || 'Аноним'}</b> (${review.rating}): ${review.text}</p>
                `;
            });
            reviewsDiv.innerHTML = reviewsHTML || 'Нет отзывов.';
        })
        .catch(error => {
            console.error('Ошибка при загрузке отзывов:', error);
            reviewsDiv.innerHTML = 'Ошибка при загрузке отзывов.';
        });
}

function submitReview(routeId) {
    const reviewText = document.getElementById(`reviewText-${routeId}`).value;
    const reviewRating = document.getElementById(`reviewRating-${routeId}`).value;
    const apiUrl = `/api/routes/${routeId}/reviews`;

    fetch(apiUrl, {
        method: 'POST',
        headers: {
            'Content-Type': 'application/json'
        },
        body: JSON.stringify({
            text: reviewText,
            rating: reviewRating
        })
    })
    .then(response => {
        if (!response.ok) {
            console.error('Ошибка при отправке отзыва:', response.status, response.statusText);
            return response.json().then(err => { throw new Error(err.error || 'Ошибка при отправке отзыва'); });
        }
        return response.json();
    })
    .then(data => {
        console.log('Отзыв успешно отправлен:', data);
        alert('Отзыв успешно отправлен!');
        loadReviews(routeId);
    })
    .catch(error => {
        console.error('Ошибка:', error);
        alert('Ошибка: ' + error.message);
    });
}

function displayRoutesOnMap(routes) {
    myMap.geoObjects.removeAll();
  
    routes.forEach((route) => {
      if (!route || !route.id) {
        console.error("Объект route или route.id не определены:", route);
        return; // Пропускаем текущую итерацию цикла
      }
      let balloonContentBody = `
        <div class="balloon">
          <h3 class="balloon__title">${route.name}</h3>
          <p class="balloon__description">${route.description}</p>
          <img class="balloon__image" src="${route.photo}" alt="${
        route.name
      }" style="max-width: 200px;">
  
          <div class="balloon__reviews">
            <h4>Отзывы:</h4>
            <div id="reviews-${route.id}">Загрузка отзывов...</div>
          </div>
  
          <div class="balloon__review-form">
            <h4>Оставить отзыв:</h4>
            <textarea id="reviewText-${
        route.id
      }" placeholder="Ваш отзыв"></textarea><br>
            <select id="reviewRating-${route.id}" min="1" max="5">
              <option value="1">1 звезда</option>
              <option value="2">2 звезды</option>
              <option value="3">3 звезды</option>
              <option value="4">4 звезды</option>
              <option value="5">5 звезд</option>
            </select><br>
            <button onclick="submitReview(${route.id})">Отправить отзыв</button>
          </div>
        </div>
      `;
      let placemark = new ymaps.Placemark([route.latitude, route.longitude], {
        balloonContentBody: balloonContentBody,
      });
  
      myMap.geoObjects.add(placemark);
  
      // Добавляем обработчик события 'balloonopen'
      placemark.events.add("balloonopen", function (event) {
        // Получаем routeId из данных метки
        let routeId = route.id;
        // Загружаем отзывы для текущего routeId
        loadReviews(routeId);
      });
    });
  }
function loadRoutes(category) {
    let url = 'http://127.0.0.1:5000/api/routes'; 
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

            // Добавить обработчики для кнопок Одобрить и Отклонить
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
    console.log('Адрес:', address);  

    ymaps.geocode(address)
        .then(function (res) {
            let coords = res.geoObjects.get(0).geometry.getCoordinates();
            console.log('Координаты:', coords);  
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

    // Получаем элемент с ID map
    let mapElement = document.getElementById('map');

    // Добавляем обработчик события элементу map
    mapElement.addEventListener('click', function(e) {
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

ymaps.ready(init);