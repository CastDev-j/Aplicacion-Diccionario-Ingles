const checkbox = document.getElementById('checkbox-darkmode');
const ball = document.getElementById('ball');
const htmlElement = document.documentElement; 



checkbox.addEventListener('change', function () {
  if (checkbox.checked) {
    ball.style.marginLeft = '32px';

    htmlElement.style.setProperty('--color-bg', '#050505');
    htmlElement.style.setProperty('--color-icon', '1');
    htmlElement.style.setProperty('--color-text-w-b', '#ffffff');
    htmlElement.style.setProperty('--color-description-w-b', '#949494');
    htmlElement.style.setProperty('--color-moon', '0');
    htmlElement.style.setProperty('--color-dark-mode', '#a445ed');
    htmlElement.style.setProperty('--color-bg-s-fonts', '#a445ed');
    htmlElement.style.setProperty('--color-bg-fonts', '#2d2d2d');
    htmlElement.style.setProperty('--color-bg-search', '#2d2d2d');

  } else {
    ball.style.marginLeft = '3px';

    htmlElement.style.setProperty('--color-bg', '#ffffff');
    htmlElement.style.setProperty('--color-icon', '0');
    htmlElement.style.setProperty('--color-text-w-b', '#050505');
    htmlElement.style.setProperty('--color-description-w-b', '#2d2d2d');
    htmlElement.style.setProperty('--color-moon', '.5');
    htmlElement.style.setProperty('--color-dark-mode', '#949494');
    htmlElement.style.setProperty('--color-bg-s-fonts', '#949494');
    htmlElement.style.setProperty('--color-bg-fonts', '#ffffff');
    htmlElement.style.setProperty('--color-bg-search', '#f4f4f4');

  }
});






const actualFont = document.getElementById('actual-font')
const arrowFont = document.getElementById('arrow-font')
const allFonts = document.getElementById('all-fonts')
let isOpen = false;

allFonts.addEventListener('blur', () => {
  allFonts.style.opacity = 0;
  allFonts.style.marginTop = '0px';
  arrowFont.style.transform = 'rotate(0deg)';

  setTimeout(() => {
    allFonts.style.display = 'none';
  }, 100);

  isOpen = !isOpen;
})

actualFont.addEventListener('click', () => {
  if (isOpen) {

    allFonts.style.opacity = 0;
    allFonts.style.marginTop = '0px';
    arrowFont.style.transform = 'rotate(0deg)';

    setTimeout(() => {
      allFonts.style.display = 'none';
    }, 100);
  } else {

    arrowFont.style.transform = 'rotate(180deg)';
    allFonts.style.display = 'block';

    setTimeout(() => {
      allFonts.style.marginTop = '30px';
      allFonts.style.opacity = 1;
    }, 100);
  }

  isOpen = !isOpen;
});

document.addEventListener('DOMContentLoaded', function () {
  const allFonts = document.getElementById('all-fonts');
  const textActualFont = document.getElementById('text-family-font');

  allFonts.addEventListener('click', function (event) {
    if (event.target.classList.contains('option-font')) {
      const selectedFont = event.target.id;
      document.documentElement.style.setProperty('--font-general', selectedFont);

      if (selectedFont == 'sans-serif') {
        textActualFont.textContent = 'Sans Serif';
      }
      if (selectedFont == 'monospace') {
        textActualFont.textContent = 'Mono';
      }
      if (selectedFont == 'poppins') {
        textActualFont.textContent = 'Poppins';
      }

      allFonts.style.opacity = 0;
      allFonts.style.marginTop = '0px';
      arrowFont.style.transform = 'rotate(0deg)';

      setTimeout(() => {
        allFonts.style.display = 'none';
      }, 100);

      isOpen = !isOpen;
    }
  });
});

const buttonSearch = document.getElementById('search-word');
const errorText = document.getElementById('error');
const inputText = document.getElementById('word');

const wordData = document.getElementById('word-info');
const wordSearch = document.getElementById('load-data');
const wordError = document.getElementById('word-info-error');



inputText.addEventListener('focus', () => {
  errorText.style.opacity = 0;
  inputText.style.border = '1px solid var(--color-purple)'
})
inputText.addEventListener('blur', () => {
  inputText.style.border = '1px solid var(--color-bg-search)'
})

var stateError = true;

buttonSearch.addEventListener('click', () => {
  var word = document.getElementById('word');
  inputText.style.border = '1px solid var(--color-bg-search)';

  if (word && word.value.trim() !== '') {
    const apiUrl = `https://api.dictionaryapi.dev/api/v2/entries/en/${word.value}`;
  
    fetch(apiUrl)
      .then(response => response.json())
      .then(data => {
        if (data && data.length > 0) {

          wordData.style.opacity = 0;

          setTimeout(() => {
            wordData.style.display = 'none';
          }, 100);

          setTimeout(() => {
            wordSearch.style.display = 'block';
          }, 100);
          setTimeout(() => {
            wordSearch.style.opacity = 1;
          }, 200);
          setTimeout(() => {
            wordSearch.style.opacity = 0;
          }, 500);
          setTimeout(() => {
            wordSearch.style.display = 'none';
          }, 600);
          
  
          setTimeout(() => {
            var doomHTML = "";
  
          const element = data[0];

          var doomHTML = "";
  
          doomHTML += `
              <span id="word-info-pd">
                <p id="tittle-word">${element.word || 'N/A'}</p>
                <div id="listen-word"><img onclick="playSound('${element.phonetics && element.phonetics.length > 0 && element.phonetics[element.phonetics.length - 1].audio ? element.phonetics[element.phonetics.length - 1].audio : 'N/A'}')" src="assets/images/icon-play.svg" alt=""></div>
                <p id="pnd-word">${element.phonetic || 'N/A'}</p>
              </span>
              <span id="word-noun">
                <h2 class="subtitle">noun</h2>
                <h3 class="m-and-s">Meaning</h3>
                <ul class="meaning-descriptions">
                  ${element.meanings && element.meanings.length > 0 ? element.meanings[0].definitions.map(definition => `<i class="before-li"></i> <li class="m-description">${definition.definition || 'N/A'}</li>`).join('') : '<i class="before-li"></i> <li class="m-description">No definitions found</li>'}
                </ul>
                <div id="synonyms-descriptions">
                  <h3 class="m-and-s">Synonyms</h3>
                  <span class="s-description">${element.meanings && element.meanings.length > 0 && element.meanings[0].synonyms ? element.meanings[0].synonyms.join(', ') : 'N/A'}</span>
                </div>
              </span>
              <span id="word-verb">
                <h2 class="subtitle">verb</h2>
                <h3 class="m-and-s">Meaning</h3>
                <ul class="meaning-descriptions">
                  ${element.meanings && element.meanings.length > 1 && element.meanings[1].definitions && element.meanings[1].definitions.length > 0 ? `<i class="before-li"></i> <li class="m-description">${element.meanings[1].definitions[0].definition || 'N/A'}</li>` : '<i class="before-li"></i> <li class="m-description">No verb definitions found</li>'}
                  ${element.meanings && element.meanings.length > 1 && element.meanings[1].definitions && element.meanings[1].definitions.length > 0 ? `<li class="m-description sub-description">${element.meanings[1].definitions[0].example || 'N/A'}</li>` : ''}
                </ul>
              </span>
              <span id="word-Source">
                <h4>Source</h4>
                <span><a target="_blank" href="${element.sourceUrls && element.sourceUrls.length > 0 ? element.sourceUrls[element.sourceUrls.length - 1] : 'N/A'}">${element.sourceUrls && element.sourceUrls.length > 0 ? element.sourceUrls[element.sourceUrls.length - 1] : 'N/A'}<img src="assets/images/icon-new-window.svg" alt=""></a></span>
              </span>
          `;
  
          wordData.innerHTML = doomHTML;
          }, 500);
          


  
          wordError.style.opacity = 0;
          setTimeout(() => {
            wordError.style.display = 'none'
          }, 100);
          setTimeout(() => {
            wordData.style.display = 'block';
          }, 600);
          setTimeout(() => {
            wordData.style.opacity = 1;
          }, 700);
        } else {
         
          wordData.style.opacity = 0;
          setTimeout(() => {
            wordData.style.display = 'none';
          }, 100);
  
          setTimeout(() => {
            wordError.style.display = 'block'
          }, 100);
          setTimeout(() => {
            wordError.style.opacity = 1;
          }, 200);
        }
      })
      .catch(error => console.error('Error al hacer la solicitud a la API:', error));
  
    stateError = true;
  } else {

    if (stateError == true) {
      errorText.style.opacity = 1;
      inputText.style.border = '1px solid var(--color-red)'
  
      wordData.style.opacity = 0;
      setTimeout(() => {
        wordData.style.display = 'none';
      }, 100);
  
      setTimeout(() => {
        wordError.style.display = 'block'
      }, 100);
      setTimeout(() => {
        wordError.style.opacity = 1;
      }, 200);
  
      stateError = false;
    }
  }
});

function playSound(word){
  console.log(word)
   sound = new Audio(word)
   sound.play();
}
