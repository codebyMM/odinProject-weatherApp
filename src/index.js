// index.js

import './style.css';
import { showData } from './doms';

const btnSearch = document.querySelector('#btnSearch');

showData();
btnSearch.addEventListener('click', async () => {
    const cityInput = document.querySelector('input[name="city"]');
    showData(cityInput.value);
});