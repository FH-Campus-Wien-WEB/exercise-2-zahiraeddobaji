window.onload = function () {
    const xhr = new XMLHttpRequest();
    xhr.onload = function () {
        const bodyElement = document.querySelector("body");
        if (xhr.status == 200) {
            const movies = JSON.parse(xhr.responseText);
            for (const movie of movies) {
                const article = document.createElement('article');
                article.id = movie.imdbID;

                const img = document.createElement('img');
                img.src = movie.Poster;
                article.appendChild(img);

                const h1 = document.createElement('h1');
                h1.textContent = movie.Title;
                article.appendChild(h1);

                const infoP = document.createElement('p');
                const runtimeSpan = document.createElement('span');
                const hours = Math.trunc(movie.Runtime / 60);
                const minutes = movie.Runtime % 60;
                runtimeSpan.textContent = 'Runtime ' + hours + 'h ' + minutes + 'm';
                const bulletSpan = document.createElement('span');
                bulletSpan.textContent = '\u2022';
                const releasedSpan = document.createElement('span');
                const releaseDate = new Date(movie.Released);
                releasedSpan.textContent = 'Released on ' + releaseDate.toLocaleDateString();
                infoP.appendChild(runtimeSpan);
                infoP.appendChild(bulletSpan);
                infoP.appendChild(releasedSpan);
                article.appendChild(infoP);

                const genreP = document.createElement('p');
                movie.Genres.forEach(function(genre) {
                    const span = document.createElement('span');
                    span.textContent = genre;
                    span.className = 'genre';
                    genreP.appendChild(span);
                });
                article.appendChild(genreP);

                const plotP = document.createElement('p');
                plotP.textContent = movie.Plot;
                article.appendChild(plotP);

                [['Directors', movie.Directors], ['Writers', movie.Writers], ['Actors', movie.Actors]].forEach(function(pair) {
                    const h2 = document.createElement('h2');
                    h2.textContent = pair[0];
                    article.appendChild(h2);
                    const ul = document.createElement('ul');
                    pair[1].forEach(function(person) {
                        const li = document.createElement('li');
                        li.textContent = person;
                        ul.appendChild(li);
                    });
                    article.appendChild(ul);
                });

                const editButton = document.createElement('button');
                editButton.textContent = 'Edit';
                editButton.onclick = function() {
                    location.href = 'edit.html?imdbID=' + movie.imdbID;
                };
                article.appendChild(editButton);

                bodyElement.appendChild(article);
            }
        } else {
            bodyElement.append("Daten konnten nicht geladen werden, Status " + xhr.status + " - " + xhr.statusText);
        }
    };
    xhr.open("GET", "/movies");
    xhr.send();
};