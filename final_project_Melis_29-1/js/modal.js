// MODAL

const modal = document.querySelector('.modal')
const classModalButton = document.querySelector('.modal_close')
const modalTrigger = document.querySelector('#btn-get')

const openModal = () => {
    modal.style.display = 'block'
    document.body.style.overflow = 'hidden'
}

const closeModal = () => {
    modal.style.display = 'none'
    document.body.style.overflow = ''

}

modalTrigger.onclick = () => openModal()
classModalButton.onclick = () => closeModal()

modal.onclick = (event) => {
    if(event.target === modal){
        closeModal()
    }
}

// DZ 3
setTimeout(openModal, 10000)

function checkScroll(){
    if((window.innerHeight + window.scrollY) >= document.body.offsetHeight){
        openModal();
        window.removeEventListener('scroll', checkScroll)
    }
}
window.addEventListener('scroll', checkScroll);


// Post Data

const form = document.querySelector('form');

const postData = (url, data) => {
    const response = fetch(url, {
        method: 'POST',
        headers: {'Content-type' : 'application/json'},
        body: data
    })
    return response
}

const bindPostData = (formElement) => {
    formElement.onsubmit = (event) => {
        event.preventDefault()

        const formData = new FormData(formElement);
        const obj = {};
        formData.forEach((item, index) => obj[index] = item);

        const json = JSON.stringify(obj);
        if(window.location.pathname === '/DZ7_Nurutdinov_Melis_29-1/index.html'){
            postData('server.php', json);
        }else{
            postData('../server.php', json)
        }
    } 
}

bindPostData(form)