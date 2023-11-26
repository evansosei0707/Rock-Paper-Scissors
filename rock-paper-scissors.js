
    
    let score = JSON.parse(localStorage.getItem('Score')) || {
        wins : 0,
        losses: 0,
        ties: 0
    };

    document.querySelector('.js-reset').addEventListener('click',resetKey = () => {

        document.querySelector('.js-reset-query').classList.toggle('active');
        document.querySelector('.js-reset-query')
        .innerHTML = `<p class="query_text">Are you sure you want to reset the score?</p>
                        <button class="js-yes">Yes</button>
                        <button class="js-no">No</button>`

        document.querySelector('.js-yes').addEventListener('click', () => {
            document.querySelector('.js-reset-query').classList.toggle('active');

        score.wins = 0;
        score.losses = 0;
        score.ties = 0;
        localStorage.removeItem('Score');
        scoreElement();
        })

        document.querySelector('.js-no').addEventListener('click', () => {
            document.querySelector('.js-reset-query').classList.toggle('active');
        })
    });

    personalMove();

    function personalMove() {
        document.querySelector('.js-rock-btn').addEventListener('click', () => {
            gameStart('Rock');
        })


        document.querySelector('.js-paper-btn').addEventListener('click', () => {
            gameStart('Paper');
        })


        document.querySelector('.js-scissors-btn').addEventListener('click', () => {
            gameStart('Scissors');
        })


    }

    

    let autoPlaying = false;
    let myInterval;

    document.querySelector('.js-autoPlay').addEventListener('click', autoMode = () => {
        autoPlaying = !autoPlaying;
        if (autoPlaying) {
             myInterval = setInterval(() => {
                const myMove = pickComputerMove();
                gameStart(myMove);
            }, 1500);
            document.querySelector('.js-autoPlay').innerHTML = 'Stop Playing';
        } else {
            autoPlaying = false;
            document.querySelector('.js-autoPlay').innerHTML = 'Auto Play';
            clearInterval(myInterval)
        }
    })




    document.body.addEventListener('keydown',(event) => {
        if (event.key === 'r') {
            gameStart('Rock');
        } else if (event.key === 'p') {
            gameStart('Paper')
        } else if (event.key === 's') {
            gameStart('Scissors')
        } else if (event.key === 'a') {
            let autoPlaying = false;
            autoMode();
        } else if (event.key === 'Backspace') {
            resetKey();
        }
    } )

    gameStart();    


    function gameStart(myMove) {
         const comeMove = pickComputerMove();

        let outcome = '';
        
        if (myMove === 'Rock') {
            if (comeMove === 'Rock' ) {
                outcome = 'Tie';
            }
            else if (comeMove === 'Paper') {
                outcome = 'You Lose';
            }
            else if (comeMove === 'Scissors') {
                outcome = 'You Win';
            }
        }
        else if (myMove === 'Paper') {
            if (comeMove === 'Rock') {
                outcome = 'You Win';
            }
            else if (comeMove === 'Paper') {
                outcome = 'Tie';
            }
            else if (comeMove === 'Scissors') {
                outcome = 'You Lose';
            }
        }

        else if (myMove === 'Scissors') {
            if (comeMove === 'Rock') {
                outcome = 'You Lose';
            }
            else if (comeMove === 'Paper') {
                outcome = 'You Win';
            }
            else if (comeMove === 'Scissors') {
                outcome = 'Tie';
            }

        }


        if (outcome === 'You Win') {
            score.wins += 1;
        }
        else if (outcome === 'You Lose') {
            score.losses += 1;
        }
        else if (outcome === 'Tie') {
            score.ties += 1;
        }

        localStorage.setItem('Score', JSON.stringify(score));

        scoreElement();

        document.querySelector('.js-result').innerHTML = outcome;

        document.querySelector('.js-moves').innerHTML = `You
        <img src="./Images/icons8-${myMove  || 'rock'}.png" alt="rock-paper-scissors" width="55">
        <img src="./Images/icons8-${comeMove}.png" alt="rock-paper-scissors" width="55">
        Computer`;

    }

    function scoreElement() {
        document.querySelector('.js-score')
        .innerHTML = `SCORE: Wins: ${score.wins}, Losses: ${score.losses}, Tie: ${score.ties}`;

    }




        function pickComputerMove() {
        const fairNumber = Math.random()*30;

        let machineMove = '';

        if (fairNumber >= 0 && fairNumber < 10) {
                machineMove = 'Rock';
        }
        else if (fairNumber >= 10 && fairNumber < 20) {
                machineMove = 'Paper';
        }
        else if (fairNumber >= 20 && fairNumber < 30) {
                machineMove = 'Scissors';
        }


        return machineMove;
        }

  

