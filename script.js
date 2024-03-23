document.addEventListener('DOMContentLoaded', function() {
  const cars = [
    { name: 'Mercedes-Benz S 350d', image: 'images/s-class-mers.webp', description: 'Prove your comfort', year: 2023, engineSize: 3.0, class: 'S' },
    { name: 'Porsche Panamera', image: 'images/Porsche-Panamera.jpg', description: 'The Porsche Panamera is equal parts sportscar and luxury sedan. In its latest iteration, it is available with just a single V6 petrol engine.', year: 2022, engineSize: 3.0, class: 'S' },
    { name: 'Audi A4', image: 'images/Audi-A4.jpg', description: 'The A4 is Audi’s mid-size luxury sedan.', year: 2009, engineSize: 2.0, class: 'D' },
    { name: 'Passat B8', image: 'images/passat-b8.jpg', description: 'The best budget and budget experience', year: 2011, engineSize: 2.0, class: 'S' },
    { name: 'BMW M4', image: 'images/bmw-m4.jpg', description: 'King of roads', year: 2018, engineSize: 4.0, class: 'C' },
    { name: 'Alfa Romeo', image: 'images/alfa-romeo.jpg', description: 'Your best choice', year: 2020, engineSize: 3.5, class: 'C' },
    { name: 'Car 7', image: 'images/Audi-A4.jpg', description: 'Description for Car 3', year: 2019, engineSize: 1.6, class: 'C' },
    { name: 'Car 8', image: 'images/Audi-A4.jpg', description: 'Description for Car 3', year: 2019, engineSize: 4.0, class: 'S' },
    { name: 'Car 9', image: 'images/Audi-A4.jpg', description: 'Description for Car 3', year: 2019, engineSize: 2.0, class: 'S' },
  ];


  const carList = document.getElementById('car-list');

// Function to render cars
function renderCars(carsArray) {
  carList.innerHTML = '';
  carsArray.forEach(car => {
    const card = document.createElement('div');
    card.classList.add('card', 'col-12', 'col-sm-6', 'col-md-4', 'col-lg-3', 'mb-3');
    card.innerHTML = `
      <img src="${car.image}" class="card-img-top" alt="${car.name}">
      <div class="card-body">
        <h5 class="card-title">${car.name}</h5>
        <p class="card-text description" style="display: none;">${car.description}</p>
        <ul class="list-group list-group-flush">
          <li class="list-group-item">Year: ${car.year}</li>
          <li class="list-group-item">Engine Size: ${car.engineSize}</li>
          <li class="list-group-item">Class: ${car.class}</li>
        </ul>
      </div>
    `;
    card.addEventListener('click', function() {
      //console.log('test');
      card.querySelector('.description').classList.toggle('d-block');
    });
    carList.appendChild(card);
  });
}

// Function to sort cars by year
function sortCarsByYear(carsArray, ascending) {
  return carsArray.slice().sort((a, b) => ascending ? b.year - a.year : a.year - b.year);
}

// Function to sort cars by engine size
function sortCarsByEngineSize(carsArray, ascending) {
  return carsArray.slice().sort((a, b) => ascending ? b.engineSize - a.engineSize : a.engineSize - b.engineSize);
}

// Function to filter cars by class
function filterCarsByClass(carsArray, selectedClass) {
  return carsArray.filter(car => car.class === selectedClass);
}

// Function to handle filter change
function handleFilterChange() {
  const selectedYear = document.getElementById('year-filter').value;
  const selectedEngineSize = document.getElementById('engine-filter').value;
  const selectedClass = document.getElementById('class-filter').value;

  let filteredCars = cars.slice(); 

  // Apply filters based on selected options
  if (selectedYear !== 'all') {
    filteredCars = sortCarsByYear(filteredCars, selectedYear === 'asc');
  }

  if (selectedEngineSize !== 'all') {
    filteredCars = sortCarsByEngineSize(filteredCars, selectedEngineSize === 'asc');
  }

  if (selectedClass !== 'all') {
    filteredCars = filterCarsByClass(filteredCars, selectedClass);
  }

  renderCars(filteredCars);
}

renderCars(cars);

document.getElementById('year-filter').addEventListener('change', handleFilterChange);
document.getElementById('engine-filter').addEventListener('change', handleFilterChange);
document.getElementById('class-filter').addEventListener('change', handleFilterChange);

});


const specialOfferToast = document.getElementById('specialOfferToast');
const specialOfferToastBootstrap = new bootstrap.Toast(specialOfferToast);

function showSpecialOfferToast() {
  specialOfferToastBootstrap.show();
}

// Check if the user has agreed to the offer
if (localStorage.getItem('offerAgreed') === null) {

  setTimeout(showSpecialOfferToast, 3000);

  // Interval to keep showing the toast until the user agrees
  let intervalId = setInterval(() => {
    if (localStorage.getItem('offerAgreed') === 'true' || localStorage.getItem('offerAgreed') === 'false') {
      clearInterval(intervalId);
    } else {
      showSpecialOfferToast();
    }
  }, 30000); // 30 sec
}

// Function to handle user agreement or rejection
function handleSpecialOfferResponse(agreed) {
  localStorage.setItem('offerAgreed', agreed);
  const specialOfferToast = document.getElementById('specialOfferToast');
  const specialOfferToastBootstrap = bootstrap.Toast.getOrCreateInstance(specialOfferToast);
  specialOfferToastBootstrap.hide();
}

// Function to handle user agreement
window.onSpecialOfferAgree = function() {
  handleSpecialOfferResponse('true');
}

// Function to handle user rejection
window.onSpecialOfferReject = function() {
  handleSpecialOfferResponse('false');
}

//AD
  const modal = new bootstrap.Modal(document.getElementById('advertisement-modal'), { backdrop: 'static', keyboard: false });
  const closeAdBtn = document.getElementById('close-ad-btn');
  const visitSiteBtn = document.getElementById('visit-site-btn');
  const countdownElement = document.getElementById('countdown');

  let remainingTime = 5;

  setTimeout(function() {
    modal.show();


    const countdownInterval = setInterval(function() {
      remainingTime -= 1;
      countdownElement.textContent = remainingTime;
      if (remainingTime <= 0) {
        clearInterval(countdownInterval);
        closeAdBtn.removeAttribute('disabled');
      }
    }, 1000);
  }, 15000);

  closeAdBtn.addEventListener('click', function() {
    if (remainingTime <= 0) {
      modal.hide();
    }
  });
