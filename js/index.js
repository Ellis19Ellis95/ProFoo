document.addEventListener('DOMContentLoaded', function() {
  // Перевірка, чи є вже збережений імейл у локальному сховищі
  const storedEmail = localStorage.getItem('registeredEmail');

  // Отримуємо модальне вікно та його вміст
  const modal = document.getElementById("myModal");
  const modalContent = document.querySelector('.modal-content');

  // Отримуємо форму та додаємо обробник події 'submit'
  const form = document.querySelector('.footer-form');
  form.addEventListener('submit', function(event) {
    event.preventDefault(); // Зупиняємо стандартну поведінку форми

    const emailInput = document.querySelector('.footer-input');
    const email = emailInput.value;
    const pattern = /[a-z0-9._%+-]+@[a-z0-9.-]+\.[a-z]{2,}$/;

    if (!pattern.test(email)) {
      alert('Please enter a valid email address.'); // Виводимо повідомлення про помилку
      return; // Припиняємо відправку форми
    }

    // Використовуємо збережений емейл для відправки на сервер
    fetch('/subscribe', {
      method: 'POST',
      body: JSON.stringify({ email: storedEmail || email }), // Використовуємо збережений емейл, якщо він є, або введений користувачем
      headers: {
        'Content-Type': 'application/json'
      }
    })
    .then(response => {
      if (response.ok) {
        alert('Subscription successful!'); // Виводимо повідомлення про успішну підписку
        // Тут ви можете виконати додаткові дії після успішної підписки
      } else {
        throw new Error('Failed to subscribe.');
      }
    })
    .catch(error => {
      alert(error.message); // Виводимо повідомлення про помилку
    });
  });

  // Показуємо модальне вікно
  function showModal() {
    modal.style.display = "block";
  }

  // Закриваємо модальне вікно при кліку на хрестик
  const span = document.getElementsByClassName("close")[0];
  span.onclick = function() {
    modal.style.display = "none";
  }

  // Закриваємо модальне вікно при кліку на будь-яке місце поза вікном
  window.onclick = function(event) {
    if (event.target == modal) {
      modal.style.display = "none";
    }
  }

  // Вибір відповідних зображень в залежності від наявності збереженого імейлу
  if (storedEmail) {
    // Якщо збережений імейл є, то це повторна реєстрація
    // Використовуйте друге зображення для модального вікна
    const secondSmallImage = document.createElement('img');
    secondSmallImage.src = '/images/-0.5.jpg';
    secondSmallImage.classList.add('small-image', 'second-image');
    secondSmallImage.alt = 'Друга картинка';

    const secondLargeImage = document.createElement('img');
    secondLargeImage.src = '/images/-1.jpg.jpg';
    secondLargeImage.classList.add('large-image', 'second-image');
    secondLargeImage.alt = 'Друга картинка';

    modalContent.appendChild(secondSmallImage);
    modalContent.appendChild(secondLargeImage);
  } else {
    // Якщо збережений імейл відсутній, це перша реєстрація
    // Використовуйте перше зображення для модального вікна

    const firstSmallImage = document.createElement('img');
    firstSmallImage.src = '/images/+0.5.jpg';
    firstSmallImage.classList.add('small-image', 'first-image');
    firstSmallImage.alt = 'Перша картинка';

    const firstLargeImage = document.createElement('img');
    firstLargeImage.src = '/images/+1.jpg';
    firstLargeImage.classList.add('large-image', 'first-image');
    firstLargeImage.alt = 'Перша картинка';

    modalContent.appendChild(firstSmallImage);
    modalContent.appendChild(firstLargeImage);

    // Збереження імейлу у локальному сховищі для майбутніх перевірок
    localStorage.setItem('elena.gudz1995@gmail.com', email);
  }
});