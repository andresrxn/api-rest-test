
await fetch('https://api-rest-test-dev-gxsp.1.us-1.fl0.io/api/movies')
   .then(res => res.json())
   .then(data => {
      console.log(data.result);
      const content = data.movies.map(movie => {
         return `
         <article data-id="${movie.id}">
            <h2>${movie.title}</h2>
            <p><span>${movie.genre}</span> | <span>${movie.rating} Stars</span></p>
            <p><span>${movie.director}</span> | <span>${movie.releaseYear}</span> | <span>${movie.duration}min.</span></p>
            <div class="buttons">
               <button data-delete>Delete</button>
               <button data-edit>Edit</button>
            </div>
         </article>
         `
      }).join('')
      const containerContent = document.getElementById('content')
      containerContent.innerHTML = content
   })

document.addEventListener('click', (e) => {
   e.stopPropagation()

   if (e.target.matches('button[data-delete]')) {
      const article = e.target.closest('article')
      const id = article.dataset.id
      const deleteConfirm = confirm(`Delete ${article.querySelector('h2').textContent.trim()}?`)
      if (deleteConfirm) {

         fetch(`http://localhost:3000/api/movies/${id}`, {
            method: 'DELETE'
         })
            .then(res => res.json())
            .then(data => {
               if (!data.error) {
                  article.remove()
                  return
               }
               throw new Error(data.error)
            })
      }
   }

   if (e.target.matches('button[data-edit]')) {
      const article = e.target.closest('article')
      const id = article.dataset.id

      location.href = `/edit/?id=${id}`
   }
})

