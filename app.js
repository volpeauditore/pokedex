const searchInput = document.getElementById('search');
const pokemonCard = document.getElementById('pokemon-card');
const pokemonImage = document.getElementById('pokemon-image');
const pokemonName = document.getElementById('pokemon-name');
const pokemonTypes = document.getElementById('pokemon-types');
const pokemonStats = document.getElementById('pokemon-stats');

// Função para buscar o Pokémon na API
async function fetchPokemon() {
    const pokemonNameOrId = searchInput.value.trim().toLowerCase();

    if (pokemonNameOrId === '') {
        return;
    }

    // Se for um número (ID), vamos procurar o Pokémon pelo ID
    const url = isNaN(pokemonNameOrId)
        ? `https://pokeapi.co/api/v2/pokemon/${pokemonNameOrId}`
        : `https://pokeapi.co/api/v2/pokemon/${pokemonNameOrId}`;

    try {
        const response = await fetch(url);

        // Verifica se o Pokémon foi encontrado
        if (!response.ok) {
            throw new Error('Pokémon não encontrado');
        }

        const data = await response.json();

        // Atualiza a interface com as informações do Pokémon
        updatePokemonCard(data);
    } catch (error) {
        pokemonCard.innerHTML = `<p>Pokémon não encontrado. Tente novamente.</p>`;
    }
}

// Função para atualizar a carta de Pokémon com as informações da API
function updatePokemonCard(data) {
    pokemonImage.src = data.sprites.front_default;
    pokemonName.textContent = data.name.charAt(0).toUpperCase() + data.name.slice(1);

    // Tipos
    pokemonTypes.innerHTML = 'Tipos: ';
    data.types.forEach(type => {
        const typeElement = document.createElement('span');
        typeElement.textContent = type.type.name;
        typeElement.classList.add('pokemon-type');
        pokemonTypes.appendChild(typeElement);
    });

    // Estatísticas
    pokemonStats.innerHTML = 'Estatísticas:';
    data.stats.forEach(stat => {
        const statElement = document.createElement('p');
        statElement.textContent = `${stat.stat.name}: ${stat.base_stat}`;
        pokemonStats.appendChild(statElement);
    });
}
