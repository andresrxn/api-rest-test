
const inputs = document.querySelectorAll('input, textarea, select')

document.addEventListener('click', (e) => {
   if (e.target.matches('button[data-add]')) {
      e.preventDefault()

      const form = document.getElementById('form')
      const formValues = {
         title: form.title.value,
         releaseYear: parseInt(form.releaseYear.value) || 0,
         genre: form.genre.value,
         director: form.director.value,
         duration: parseInt(form.duration.value) || 0,
         rating: parseInt(form.rating.value) || 0,
      }
      console.log(formValues);

      fetch(`https://api-rest-test-dev-gxsp.1.us-1.fl0.io/api/movies`, {
         method: 'POST',
         headers: {
            'Content-Type': 'application/json'
         },
         body: JSON.stringify(formValues),
      })
         .then(res => res.json())
         .then(data => {
            if (data.errors) {
               const errors = data.errors
               errors.map(error => {
                  const type = error.type.join('')
                  const message = error.message

                  if (document.getElementById(type)) {
                     const input = document.getElementById(type)
                     const inputContainer = input.closest('.form-group')
                     const inputError = inputContainer.querySelector('[data-input-error]')

                     inputContainer.classList.add('error')
                     inputError.textContent = message
                  }
               })
            } else {
               location.href = '/'
            }
         })


   }
})

inputs.forEach(input => {
   input.addEventListener('input', (e) => {
      input.closest('.form-group').classList.remove('error')
      input.closest('.form-group').querySelector('[data-input-error]').innerHTML = ''
   })
});
