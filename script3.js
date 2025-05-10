
document.addEventListener('DOMContentLoaded', function() {
    const jokeTextElement = document.querySelector('.joke-text');
    const loadingElement = document.getElementById('loading');
    const countElement = document.getElementById('count');
    const ratingButtons = document.querySelectorAll('.rating-btn');
    
    let jokeCount = 0;
    
    // API endpoints
    const JOKE_API = 'https://v2.jokeapi.dev/joke/Any';
    const PUN_API = 'https://v2.jokeapi.dev/joke/Pun';
    const PROGRAMMING_API = 'https://v2.jokeapi.dev/joke/Programming';
    const DAD_JOKE_API = 'https://icanhazdadjoke.com/';
    
    // Function to show loading state
    function showLoading() {
        jokeTextElement.style.opacity = '0.3';
        loadingElement.style.display = 'block';
    }
    
    // Function to hide loading state
    function hideLoading() {
        jokeTextElement.style.opacity = '1';
        loadingElement.style.display = 'none';
    }
    
    // Function to update joke count
    function updateJokeCount() {
        jokeCount++;
        countElement.textContent = jokeCount;
        
        // Reset all rating buttons
        ratingButtons.forEach(btn => btn.classList.remove('active'));
    }
    
    // Function to fetch joke from JokeAPI
    async function fetchJoke(apiUrl) {
        showLoading();
        
        try {
            const response = await fetch(apiUrl);
            
            if (!response.ok) {
                throw new Error('Network response was not ok');
            }
            
            const data = await response.json();
            
            if (data.type === 'twopart') {
                jokeTextElement.innerHTML = `
                    <div class="joke-setup">${data.setup}</div>
                    <div class="joke-delivery">${data.delivery}</div>
                `;
            } else {
                jokeTextElement.innerHTML = `<div class="single-joke">${data.joke}</div>`;
            }
            
            updateJokeCount();
        } catch (error) {
            jokeTextElement.textContent = 'Oops! Failed to fetch a joke. Try again!';
            console.error('Error fetching joke:', error);
        } finally {
            hideLoading();
        }
    }
    
    // Function to fetch dad joke
    async function fetchDadJoke() {
        showLoading();
        
        try {
            const response = await fetch(DAD_JOKE_API, {
                headers: {
                    'Accept': 'application/json'
                }
            });
            
            if (!response.ok) {
                throw new Error('Network response was not ok');
            }
            
            const data = await response.json();
            jokeTextElement.innerHTML = `<div class="single-joke">${data.joke}</div>`;
            
            updateJokeCount();
        } catch (error) {
            jokeTextElement.textContent = 'Oops! Failed to fetch a dad joke. Try again!';
            console.error('Error fetching dad joke:', error);
        } finally {
            hideLoading();
        }
    }
    
    // Add event listeners to buttons
    document.getElementById('getJoke').addEventListener('click', function() {
        fetchJoke(JOKE_API);
    });
    
    document.getElementById('getPun').addEventListener('click', function() {
        fetchJoke(PUN_API);
    });
    
    document.getElementById('getProgrammingJoke').addEventListener('click', function() {
        fetchJoke(PROGRAMMING_API);
    });
    
    document.getElementById('getDadJoke').addEventListener('click', function() {
        fetchDadJoke();
    });
    
    // Add event listeners to rating buttons
    ratingButtons.forEach(button => {
        button.addEventListener('click', function() {
            // Remove active class from all buttons
            ratingButtons.forEach(btn => btn.classList.remove('active'));
            
            // Add active class to the clicked button
            this.classList.add('active');
            
            // You could store the rating or send it to a server here
            const rating = this.getAttribute('data-rating');
            console.log('Joke rated:', rating);
            
            // Show a thank you message with emoji animation
            const currentJoke = jokeTextElement.innerHTML;
            jokeTextElement.innerHTML = '<div class="single-joke">Thanks for your feedback! 🎉</div>';
            
            // Restore the joke after a short delay
            setTimeout(() => {
                jokeTextElement.innerHTML = currentJoke;
            }, 1000);
        });
    });
    
    // Add some fun animations when hovering over buttons
    const allButtons = document.querySelectorAll('button');
    allButtons.forEach(button => {
        button.addEventListener('mouseover', function() {
            this.style.transform = 'translateY(-3px) scale(1.05) rotate(' + (Math.random() * 3 - 1.5) + 'deg)';
        });
        
        button.addEventListener('mouseout', function() {
            this.style.transform = '';
        });
    });
    
    // Fetch a random joke on page load after a short delay
    setTimeout(() => {
        document.getElementById('getJoke').click();
    }, 500);
});
