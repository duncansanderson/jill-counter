/*  Dark/light mode  */
const toggleButton = document.querySelector('.button-toggle #toggle');
const prefersDarkScheme = window.matchMedia('(prefers-color-scheme: dark)');

// Check local storage to see if theme has been set.
let theme = localStorage.getItem('theme');

// Set dark/light mode based on previous selection or system preference.
if (theme) {
    document.body.classList = `${theme}-theme`;
} else if (!theme && prefersDarkScheme.matches) {
    document.body.classList.add('dark-theme');
    theme = 'dark';
}

// Switch toggle button depending on set theme.
toggleButton.checked = theme === 'dark' ? true : false;

// Toggle dark/light theme.
toggleButton.addEventListener('change', () => {
    let theme;
    // Check if user has system preference.
    if (prefersDarkScheme.matches) {
        document.body.classList.toggle('light-theme');
        theme = document.body.classList.contains('light-theme') ? 'light' : 'dark';
    } else {
        document.body.classList.toggle('dark-theme');
        theme = document.body.classList.contains('dark-theme') ? 'dark' : 'light';
    }

    // Set chosen theme into local storage.
    localStorage.setItem('theme', theme);
});

/* Counter */

const counter = document.querySelector('.counter__value');
const start = document.querySelector('#counter-start');
const stop = document.querySelector('#counter-stop');
const reset = document.querySelector('#counter-reset');
const progress = document.querySelector('.counter__progress');

const maxDelay = 8000;
const minDelay = 1;
const maxCount = 500;
const counterIncrement = 1;
let count = 0;
let interval;

// Random interval for the counter to increase.
const setRandomInterval = (intervalFunction) => {
	let timeout;

	const runInterval = () => {
		const timeoutFunction = () => {
			intervalFunction();
			runInterval();
		};

		const delay = Math.floor(Math.random() * (maxDelay - minDelay + 1) + minDelay);

		timeout = setTimeout(timeoutFunction, delay);
	};

	runInterval();

	return {
		clear() { clearTimeout(timeout) },
	};
};

// Increase the counter but the set amount.
const increaseCounter = () => {
	let count = +counter.innerHTML;
    if (count === maxCount) count = -1;
    const countPercentage = count / maxCount * 100;

	counter.innerHTML = count + counterIncrement;
    progress.style.width = `${countPercentage}%`;
    progress.setAttribute('aria-valuenow', countPercentage);
}

// Start the counter.
const startCounter = () => {
    interval = setRandomInterval(() => increaseCounter());
};

// Stop the counter.
const stopCounter = () => {
    interval.clear();
};

// Reset the counter.
const resetCounter = () => {
    counter.innerHTML = 0;
    progress.style.width = '0%';
    progress.setAttribute('aria-valuenow', 0);
};

// Button event listeners.
start.addEventListener('click', startCounter);
stop.addEventListener('click', stopCounter);
reset.addEventListener('click', resetCounter);
