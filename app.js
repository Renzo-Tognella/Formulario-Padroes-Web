/*
 * Sistema de Cadastro Musical - JavaScript
 * Arquivo: app.js
 * Descrição: Gerencia a validação, máscaras e interações do formulário
 * Autores: Norton Junior e Renzo Tognella
 * Data: 2025
 */

// Aguarda o carregamento completo do DOM antes de executar o código
document.addEventListener('DOMContentLoaded', function() {
    const form = document.querySelector('.form');
    const clearButton = document.createElement('button');
    
    clearButton.type = 'button';
    clearButton.textContent = 'Limpar Formulário';
    clearButton.className = 'btn-clear';
    
    // Adiciona o botão de limpar ao container de botões
    const submitContainer = document.querySelector('.form-submit');
    submitContainer.appendChild(clearButton);

    // Base de dados: artistas organizados por gênero musical
    const artistsData = {
        rock: [
            'The Beatles', 'Queen', 'Pink Floyd', 'Nirvana', 'Metallica'
        ],
        pop: [
            'Michael Jackson', 'Taylor Swift', 'Beyoncé', 'Adele', 'Ed Sheeran'
        ],
        jazz: [
            'Miles Davis', 'Louis Armstrong', 'Ella Fitzgerald', 'Frank Sinatra', 'John Coltrane'
        ],
        classical: [
            'Ludwig van Beethoven', 'Wolfgang Amadeus Mozart', 'Johann Sebastian Bach', 'Frédéric Chopin', 'Pyotr Ilyich Tchaikovsky'
        ],
        eletronica: [
            'Daft Punk', 'Calvin Harris', 'David Guetta', 'Avicii', 'The Chainsmokers'
        ],
        sertanejo: [
            'Zezé Di Camargo & Luciano', 'Jorge & Mateus', 'Henrique & Juliano', 'Marília Mendonça', 'Gusttavo Lima'
        ],
        mpb: [
            'Caetano Veloso', 'Gilberto Gil', 'Chico Buarque', 'Milton Nascimento', 'Elis Regina'
        ],
        funk: [
            'Anitta', 'Ludmilla', 'MC Kevinho', 'MC Hariel', 'MC Don Juan'
        ]
    };

    function loadBestArtistsList() {
        const bestArtistSelect = document.getElementById('best-artist');

        const genreNames = {
            rock: 'Rock',
            pop: 'Pop',
            jazz: 'Jazz',
            classical: 'Clássica',
            eletronica: 'Eletrônica',
            sertanejo: 'Sertanejo',
            mpb: 'MPB',
            funk: 'Funk'
        };
        
        for (const genre in artistsData) {
            const optgroup = document.createElement('optgroup');
            optgroup.label = genreNames[genre];
            
            artistsData[genre].forEach(artist => {
                const option = document.createElement('option');
                option.value = artist.toLowerCase().replace(/\s+/g, '_');
                option.textContent = artist;
                optgroup.appendChild(option);
            });
            
            bestArtistSelect.appendChild(optgroup);
        }
    }
    
    loadBestArtistsList();

    // Base de dados: álbuns organizados por artista
    const albumsData = {
        // Rock
        'the_beatles': ['Abbey Road', 'Sgt. Pepper\'s Lonely Hearts Club Band', 'Revolver'],
        'queen': ['A Night at the Opera', 'News of the World', 'The Game'],
        'pink_floyd': ['The Dark Side of the Moon', 'The Wall', 'Wish You Were Here'],
        'nirvana': ['Nevermind', 'In Utero', 'MTV Unplugged in New York'],
        'metallica': ['Master of Puppets', 'Ride the Lightning', 'Metallica (Black Album)'],
        
        // Pop
        'michael_jackson': ['Thriller', 'Bad', 'Dangerous'],
        'taylor_swift': ['1989', 'Folklore', 'Red (Taylor\'s Version)'],
        'beyoncé': ['Lemonade', 'Beyoncé', 'Dangerously in Love'],
        'adele': ['21', '25', '30'],
        'ed_sheeran': ['÷ (Divide)', 'x (Multiply)', '= (Equals)'],
        
        // Jazz
        'miles_davis': ['Kind of Blue', 'Bitches Brew', 'Sketches of Spain'],
        'louis_armstrong': ['What a Wonderful World', 'Hello, Dolly!', 'Satchmo at Symphony Hall'],
        'ella_fitzgerald': ['Ella and Louis', 'Ella Fitzgerald Sings the Cole Porter Song Book', 'Mack the Knife'],
        'frank_sinatra': ['In the Wee Small Hours', 'Songs for Swingin\' Lovers!', 'Come Fly with Me'],
        'john_coltrane': ['A Love Supreme', 'Giant Steps', 'Blue Train'],
        
        // Classical
        'ludwig_van_beethoven': ['Symphony No. 9', 'Symphony No. 5', 'Piano Sonata No. 14 (Moonlight)'],
        'wolfgang_amadeus_mozart': ['Requiem', 'Symphony No. 40', 'Piano Concerto No. 21'],
        'johann_sebastian_bach': ['Brandenburg Concertos', 'Mass in B Minor', 'The Well-Tempered Clavier'],
        'frédéric_chopin': ['Nocturnes', 'Ballades', 'Piano Concerto No. 1'],
        'pyotr_ilyich_tchaikovsky': ['Swan Lake', 'The Nutcracker', 'Symphony No. 6'],
        
        // Eletrônica
        'daft_punk': ['Discovery', 'Random Access Memories', 'Homework'],
        'calvin_harris': ['18 Months', 'Motion', 'Funk Wav Bounces Vol. 1'],
        'david_guetta': ['Nothing but the Beat', 'One Love', 'Listen'],
        'avicii': ['True', 'Stories', 'TIM'],
        'the_chainsmokers': ['Memories...Do Not Open', 'World War Joy', 'So Far So Good'],
        
        // Sertanejo
        'zezé_di_camargo_&_luciano': ['É o Amor', 'Dois Corações', 'Flores em Vida'],
        'jorge_&_mateus': ['Ao Vivo em Jurerê', 'Os Anjos Cantam', 'Aí Já Era'],
        'henrique_&_juliano': ['Novas Histórias', 'O Céu Explica Tudo', 'Menos é Mais'],
        'marília_mendonça': ['Realidade', 'Todos os Cantos', 'Decretos Reais'],
        'gusttavo_lima': ['Inventor dos Amores', 'Do Outro Lado da Moeda', 'Buteco do Gusttavo Lima'],
        
        // MPB
        'caetano_veloso': ['Transa', 'Livro', 'Caetano Veloso'],
        'gilberto_gil': ['Refazenda', 'Expresso 2222', 'Gilberto Gil'],
        'chico_buarque': ['Construção', 'Vida', 'Chico Buarque de Hollanda'],
        'milton_nascimento': ['Clube da Esquina', 'Minas', 'Milagre dos Peixes'],
        'elis_regina': ['Elis & Tom', 'Falso Brilhante', 'Transversal do Tempo'],
        
        // Funk
        'anitta': ['Anitta', 'Bang', 'Kisses'],
        'ludmilla': ['Hoje', 'A Danada Sou Eu', 'Hello Mundo'],
        'mc_kevinho': ['O Grave Bater', 'Kevinho', 'Olha a Explosão'],
        'mc_hariel': ['Vivência', 'MC Hariel', 'Corra Que o Beat Vem'],
        'mc_don_juan': ['MC Don Juan', 'É Sal, É Mel', 'Tic Nervoso']
    };
    
    /**
     * Exibe mensagem de erro abaixo do campo
     * @param {HTMLElement} element - Campo de erro
     * @param {string} message - Mensagem de erro
     */
    function showError(element, message) {
        removeError(element);
        
        const errorDiv = document.createElement('div');
        errorDiv.className = 'error-message';
        errorDiv.textContent = message;
        
        element.parentNode.appendChild(errorDiv);
        element.classList.add('error');
    }
    
    /**
     * @param {HTMLElement} element
     */
    function removeError(element) {
        const existingError = element.parentNode.querySelector('.error-message');
        if (existingError) {
            existingError.remove();
        }
        element.classList.remove('error');
    }
    
    /**
     * Valida o campo de nome
     * @param {string} name - Nome a ser validado
     * @returns {string|null} Mensagem de erro ou null se válido
     */
    function validateName(name) {
        if (!name.trim()) {
            return 'Nome é obrigatório';
        }
        if (name.trim().length < 2) {
            return 'Nome deve ter pelo menos 2 caracteres';
        }
        if (!/^[a-zA-ZÀ-ÿ\s]+$/.test(name)) {
            return 'Nome deve conter apenas letras e espaços';
        }
        return null;
    }
    
    /**
     * Valida o campo de e-mail
     * @param {string} email - E-mail a ser validado
     * @returns {string|null} Mensagem de erro ou null se válido
     */
    function validateEmail(email) {
        if (!email.trim()) {
            return 'E-mail é obrigatório';
        }
        const emailRegex = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;
        if (!emailRegex.test(email)) {
            return 'E-mail deve ter um formato válido';
        }
        return null;
    }
    
    /**
     * Valida o campo de telefone
     * @param {string} phone - Telefone a ser validado
     * @returns {string|null} Mensagem de erro ou null se válido
     */
    function validatePhone(phone) {
        if (!phone.trim()) {
            return 'Telefone é obrigatório';
        }
        const phoneRegex = /^\(\d{2}\)\s\d{4,5}-\d{4}$/;
        if (!phoneRegex.test(phone)) {
            return 'Telefone deve estar no formato (11) 99999-9999';
        }
        return null;
    }
    
    /**
     * Valida a data de nascimento no formato brasileiro (dd/mm/aaaa)
     * @param {string} date - Data a ser validada
     * @returns {string|null} Mensagem de erro ou null se válido
     */
    function validateBirthDate(date) {
        if (!date) {
            return 'Data de nascimento é obrigatória';
        }
        
        // Valida o formato dd/mm/aaaa
        const datePattern = /^(\d{2})\/(\d{2})\/(\d{4})$/;
        const match = date.match(datePattern);
        
        if (!match) {
            return 'Data deve estar no formato dd/mm/aaaa';
        }
        
        const day = parseInt(match[1], 10);
        const month = parseInt(match[2], 10);
        const year = parseInt(match[3], 10);
        
        // Valida mês
        if (month < 1 || month > 12) {
            return 'Mês inválido';
        }
        
        // Valida dia
        const daysInMonth = new Date(year, month, 0).getDate();
        if (day < 1 || day > daysInMonth) {
            return 'Dia inválido para o mês especificado';
        }
        
        // Converte para objeto Date (mês é 0-indexed no JavaScript)
        const birthDate = new Date(year, month - 1, day);
        const today = new Date();
        
        if (birthDate > today) {
            return 'Data de nascimento não pode ser no futuro';
        }
        
        // Calcula idade
        let age = today.getFullYear() - birthDate.getFullYear();
        const monthDiff = today.getMonth() - birthDate.getMonth();
        if (monthDiff < 0 || (monthDiff === 0 && today.getDate() < birthDate.getDate())) {
            age--;
        }
        
        if (age > 120) {
            return 'Data de nascimento inválida';
        }
        
        if (age < 13) {
            return 'Idade mínima é 13 anos';
        }
        
        return null;
    }

    /**
     * Carrega os artistas no dropdown baseado no gênero selecionado
     * @param {string} genre
     */
    function loadArtists(genre) {
        const artistSelect = document.getElementById('artist');
        artistSelect.innerHTML = '<option value="">Selecione um artista</option>';
        
        console.log('Carregando artistas para o gênero:', genre);
        
        if (genre && artistsData[genre]) {
            console.log('Número de artistas encontrados:', artistsData[genre].length);
            artistsData[genre].forEach(artist => {
                const option = document.createElement('option');
                option.value = artist.toLowerCase().replace(/\s+/g, '_');
                option.textContent = artist;
                artistSelect.appendChild(option);
            });
        } else {
            artistSelect.innerHTML = '<option value="">Selecione primeiro um gênero musical</option>';
        }
        
        clearAlbums();
    }

    /**
     * Carrega os álbuns como checkboxes baseado no artista selecionado
     * @param {string} artistKey - Chave do artista (formato: nome_em_minusculas)
     */
    function loadAlbums(artistKey) {
        const albumsList = document.getElementById('albums-list');
        albumsList.innerHTML = '';
        
        console.log('Carregando álbuns para o artista:', artistKey);
        
        if (artistKey && albumsData[artistKey]) {
            console.log('Álbuns encontrados:', albumsData[artistKey]);
            
            // Cria um checkbox para cada álbum
            albumsData[artistKey].forEach((album, index) => {
                const checkboxDiv = document.createElement('div');
                checkboxDiv.className = 'album-item';
                
                const checkbox = document.createElement('input');
                checkbox.type = 'checkbox';
                checkbox.id = `album_${index}`;
                checkbox.name = 'albums';
                checkbox.value = album;
                checkbox.addEventListener('change', handleAlbumSelection);
                
                const label = document.createElement('label');
                label.htmlFor = `album_${index}`;
                label.textContent = album;
                
                checkboxDiv.appendChild(checkbox);
                checkboxDiv.appendChild(label);
                albumsList.appendChild(checkboxDiv);
            });
        } else {
            console.log('Nenhum álbum encontrado para:', artistKey);
            albumsList.innerHTML = '<p class="albums-placeholder">Selecione um artista para ver os álbuns disponíveis</p>';
        }
    }

    function clearAlbums() {
        const albumsList = document.getElementById('albums-list');
        albumsList.innerHTML = '<p class="albums-placeholder">Selecione um artista para ver os álbuns disponíveis</p>';
    }

    /**
     * Controla a seleção de álbuns (máximo 3)
     * @param {Event} e - Evento de mudança do checkbox
     */
    function handleAlbumSelection(e) {
        const checkboxes = document.querySelectorAll('input[name="albums"]:checked');
        
        // Impede seleção de mais de 3 álbuns
        if (checkboxes.length > 3) {
            e.target.checked = false;
            alert('Você pode selecionar no máximo 3 álbuns preferidos.');
        }
    }

    const musicSelect = document.getElementById('music');
    musicSelect.addEventListener('change', function() {
        loadArtists(this.value);
        removeError(this);
    });

    const artistSelect = document.getElementById('artist');
    artistSelect.addEventListener('change', function() {
        loadAlbums(this.value);
        removeError(this);
    });
    
    // Formata automaticamente o telefone enquanto o usuário digita
    const phoneInput = document.getElementById('telefone');
    phoneInput.addEventListener('input', function(e) {
        let value = e.target.value.replace(/\D/g, '');
        
        // Aplica a máscara (11) 99999-9999
        if (value.length <= 11) {
            if (value.length <= 2) {
                value = value.replace(/(\d{0,2})/, '($1');
            } else if (value.length <= 6) {
                value = value.replace(/(\d{2})(\d{0,4})/, '($1) $2');
            } else if (value.length <= 10) {
                value = value.replace(/(\d{2})(\d{4})(\d{0,4})/, '($1) $2-$3');
            } else {
                value = value.replace(/(\d{2})(\d{5})(\d{0,4})/, '($1) $2-$3');
            }
        }
        
        e.target.value = value;
    });
    
    // Formata automaticamente a data enquanto o usuário digita (dd/mm/aaaa)
    const dateInput = document.getElementById('nascimento');
    dateInput.addEventListener('input', function(e) {
        let value = e.target.value.replace(/\D/g, '');
        
        // Aplica a máscara dd/mm/aaaa
        if (value.length <= 8) {
            if (value.length <= 2) {
                value = value;
            } else if (value.length <= 4) {
                value = value.replace(/(\d{2})(\d{0,2})/, '$1/$2');
            } else {
                value = value.replace(/(\d{2})(\d{2})(\d{0,4})/, '$1/$2/$3');
            }
        }
        
        e.target.value = value;
    });
    
    // Valida os campos obrigatórios ao perder o foco ou ao digitar (se houver erro)
    const inputs = form.querySelectorAll('input[required], select[required]');
    inputs.forEach(input => {
        input.addEventListener('blur', function() {
            validateField(this);
        });
        
        input.addEventListener('input', function() {
            if (this.classList.contains('error')) {
                validateField(this);
            }
        });
    });
    
    /**
     * Valida um campo específico baseado em seu ID
     * @param {HTMLElement} field - Campo a ser validado
     * @returns {boolean} true se válido, false se inválido
     */
    function validateField(field) {
        let error = null;
        
        switch(field.id) {
            case 'nome':
                error = validateName(field.value);
                break;
            case 'email':
                error = validateEmail(field.value);
                break;
            case 'telefone':
                error = validatePhone(field.value);
                break;
            case 'nascimento':
                error = validateBirthDate(field.value);
                break;
        }
        
        if (error) {
            showError(field, error);
            return false;
        } else {
            removeError(field);
            return true;
        }
    }
    
    // Reseta o formulário e remove todas as mensagens de erro
    clearButton.addEventListener('click', function() {
        if (confirm('Tem certeza que deseja limpar todos os campos?')) {
            form.reset();
            
            // Remove todas as mensagens de erro
            const errorMessages = form.querySelectorAll('.error-message');
            errorMessages.forEach(error => error.remove());
            
            // Remove as classes de erro dos campos
            const errorFields = form.querySelectorAll('.error');
            errorFields.forEach(field => field.classList.remove('error'));

            // Reseta os dropdowns dinâmicos
            loadArtists('');
            clearAlbums();
            
            // Retorna o foco ao primeiro campo
            firstInput.focus();
        }
    });
    
    // Valida todos os campos antes de enviar
    form.addEventListener('submit', function(e) {
        e.preventDefault();
        
        let isValid = true;
        
        // Valida todos os campos obrigatórios
        inputs.forEach(input => {
            if (!validateField(input)) {
                isValid = false;
            }
        });
        
        // Validação especial para gênero musical
        const musicSelect = document.getElementById('music');
        if (!musicSelect.value) {
            showError(musicSelect, 'Selecione pelo menos um gênero musical');
            isValid = false;
        } else {
            removeError(musicSelect);
        }
        
        // Submete ou exibe erros
        if (isValid) {
            alert('Formulário enviado com sucesso!');
            console.log('Dados do formulário:', new FormData(form));
        } else {
            alert('Por favor, corrija os erros antes de enviar o formulário.');
            
            // Foca no primeiro campo com erro
            const firstError = form.querySelector('.error');
            if (firstError) {
                firstError.focus();
            }
        }
    });
});