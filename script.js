/**
 * Exercice : Mini Pokédex
 * @author Steve Fallet <steve.fallet@dvitec.ch>
 * @since 2024-09-01
 */

'use strict';

// Couleur par défaut pour les types de Pokémon non définis
const DEFAULT_COLOR = '#ccc';

// Couleurs pour chaque type de Pokémon
const typeColors = {
    'Électrique': '#FFD700',
    'Plante': '#78C850',
    'Poison': '#A040A0',
    'Feu': '#F08030',
    'Eau': '#6890F0',
    'Normal': '#A8A878',
    'Fée': '#EE99AC',
    'Spectre': '#705898',
    'Combat': '#C03028',
    'Vol': '#A890F0',
    'Glace': '#98D8D8',
    'Roche': '#B8A038',
    'Sol': '#E0C068',
    'Psy': '#F85888'
};

// Tableau d'objets représentant les Pokémon
const pokemonsTab = [
    { name: 'Pikachu', type: 'Électrique', level: 35, img: 'pikachu.png' },
    { name: 'Bulbizarre', type: 'Plante,Poison', level: 15, img: 'bulbizarre.png' },
    { name: 'Salamèche', type: 'Feu', level: 20, img: 'salameche.png' },
    { name: 'Carapuce', type: 'Eau', level: 10, img: 'carapuce.png' },
    { name: 'Rondoudou', type: 'Normal,Fée', level: 25, img: 'rondoudou.png' },
    { name: 'Ectoplasma', type: 'Spectre,Poison', level: 45, img: 'ectoplasma.png' },
    { name: 'Évoli', type: 'Normal,Combat', level: 22, img: 'evoli.png' },
    { name: 'Dracaufeu', type: 'Feu,Vol', level: 50, img: 'dracaufeu.png' },
    { name: 'Florizarre', type: 'Plante,Poison', level: 55, img: 'florizarre.png' },
    { name: 'Tortank', type: 'Eau', level: 52, img: 'tortank.png' },
    { name: 'Mélofée', type: 'Fée', level: 18, img: 'melofee.png' },
    { name: 'Raichu', type: 'Électrique', level: 40, img: 'raichu.png' },
    { name: 'Magicarpe', type: 'Eau', level: 5, img: 'magicarpe.png' },
    { name: 'Lokhlass', type: 'Eau,Glace', level: 35, img: 'lokhlass.png' },
    { name: 'Onix', type: 'Roche,Sol', level: 30, img: 'onix.png' },
    { name: 'Ronflex', type: 'Normal', level: 45, img: 'ronflex.png' },
    { name: 'Mewtwo', type: 'Psy', level: 70, img: 'mewtwo.png' }
];

const containerPokemon = document.querySelector('.pokemon-container');

/**
 * Affiche tout les pokémons présent dans le tableau
 */
function displayPokemons(pokemonsAAfficher) {
    containerPokemon.innerHTML = "";
    if (!pokemonsAAfficher.length) {
        containerPokemon.innerHTML += `<p>Mega Rayquaza utilise Draco-assencion, 
                                        les pokémons de ta recherche sont KO</p>`;
        return;
    }

    for (let index = 0; index < pokemonsAAfficher.length; index++) {
        containerPokemon.innerHTML += generatePokemonCardHTML(pokemonsAAfficher[index]);
    }
}

/**
 * Fonction qui retourne le code html d'un pokémon
 * @param pokemon un objet pokémon
 * @returns {string} le code html d'un pokémon
 */
function generatePokemonCardHTML(pokemon) {
    let tabType = pokemon.type.split(',');
    let couleursBackground = `${typeColors[tabType[0]]}`;
    if (tabType.length === 2) {
        couleursBackground = `linear-gradient(to right, ${typeColors[tabType[0]]}
                                50%, ${typeColors[tabType[1]]} 50%)`
    }
    return `<div class="pokemon-card" style="background: ${couleursBackground};">
                <img src="images/${pokemon.img}" alt="Le pokémon ${pokemon.name}"/>
                <h2>${pokemon.name}</h2>
                <div>Type : ${pokemon.type.replace(',', ' / ')}</div>
                <div>Niveau: ${pokemon.level}</div>
            </div>`;
}

displayPokemons(pokemonsTab);

const searchBar = document.getElementById('search-bar');
const selectType = document.getElementById('type-filter');
const selectOrder = document.getElementById('sort-order');


function filterAndSortPokemons() {
    const recherche = searchBar.value;
    let resultat = pokemonsTab.filter(pokemon => pokemon.name.toLowerCase().includes(recherche));

    let type = selectType.value
    resultat = resultat.filter(pokemon => pokemon.type.includes(type));

    let ordre = selectOrder.value;
    if (ordre === "name-asc") {
        resultat.sort((a, b) => a.name.localeCompare(b, "fr"));
    } else if (ordre === "name-desc") {
        resultat.sort((a, b) => b.name.localeCompare(a, "fr"));
    } else if (ordre === "level-asc") {
        resultat.sort((a, b) => a.level - b.level);
    } else if (ordre === "level-desc") {
        resultat.sort((a, b) => b.level - a.level);
    }
    displayPokemons(resultat);
}

filterAndSortPokemons();

searchBar.addEventListener('input', filterAndSortPokemons);
selectType.addEventListener('change', filterAndSortPokemons);
selectOrder.addEventListener('change', filterAndSortPokemons);


