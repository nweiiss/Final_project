document.addEventListener('DOMContentLoaded', async () => {
    try {
        const response = await fetch(`https://jsonplaceholder.typicode.com/posts`)
        const data = await response.json();
        
        const cards = document.querySelector('#cards');

        data.forEach(post => {
            const card = document.createElement('div');
            card.classList.add('card');

            const title = document.createElement('h2');
            title.classList.add('text-title');
            title.textContent = post.title;

            const body = document.createElement('p');
            body.textContent = post.body;

            const image = document.createElement('img');
            image.src = '../images/user.jpg';
            card.appendChild(image);
            card.appendChild(title);
            card.appendChild(body);

            cards.appendChild(card)

        })





    } catch (error) {
        console.log(error, 'ERROR!');
    }
})