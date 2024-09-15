function burgerOpen() {
    document.querySelector('.nav-btns').style.display = 'block';
}

function burgerClose() {
    document.querySelector('.nav-btns').style.display = 'none';
}

function loadMatrix(lng, category, isImport = false) {

    fetch(`${lng == 'rus' ? '.' : '..'}/data/products-${category}.json`)
    .then((data) => data.json())
    .then((storedProducts) => {

        const productMatrix = document.querySelector('#product-matrix');

        document.querySelector('.matrix-btn-selected').classList.remove('matrix-btn-selected');
        document.querySelector(`.${category}`).classList.add('matrix-btn-selected');

        productMatrix.innerHTML = '';
        storedProducts
        .sort((product1, product2) => {
            let result = 0;

            if (product1[lng + 'Name'] > product2[lng + 'Name']) {
                result = 1;
            }
            else if (product1[lng + 'Name'] < product2[lng + 'Name']) {
                result = -1;
            }

            return result;
        })
        .filter((product) => isImport ? product.import : true)
        .forEach((product) => {
            const productCard = document.createElement('div');
            productCard.classList.add('product-card');
            productCard.classList.add('text-basic');
            productCard.classList.add('text-light');

            const productImage = document.createElement('img');
            productImage.src = (lng == 'rus' ? '' : '../') + product.imgPath;

            const productTitle = document.createElement('p');
            productTitle.innerHTML = product[lng + 'Name'];

            productCard.appendChild(productImage);
            productCard.appendChild(productTitle);

            productMatrix.appendChild(productCard);
        });
    })
}

function fib(n) {

    let fibSeq = [0, 1];

    for (let i = 0; i < n - 1; i++) {
        fibSeq.push(fibSeq.at(-1) + fibSeq.at(-2));
    }

    return fibSeq.at(n);
}

function sendEmail(e) {
    e.preventDefault(); 

    const form = document.querySelector('#contact-form');
    const subBtn = document.querySelector('#sendform-btn');


    let name = form.elements['nameInput'].value;
    name = name.replaceAll(' ', '%20');
    let email = form.elements['emailInput'].value;
    email = email.replaceAll(' ', '');
    let text = form.elements['comInput'].value;
    text= text.replaceAll(' ', '%20');
    
    const emailHeader = `Заявка%20от%20${name}`
    const emailBody = `Имя:%20${name}%0AПочта:%20${email}%0AТекст:%20${text}`

    const href = `mailto:experttrade30@gmail.com?subject=${emailHeader}&body=${emailBody}`;

    window.location.href = href;
}