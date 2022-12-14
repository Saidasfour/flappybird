let move_speed = 3, grativy = 0.5;
let bird = document.querySelector('.bird');
let img = document.getElementById('bird1');


let bird_props = bird.getBoundingClientRect();

let background = document.querySelector('.backgroundImage').getBoundingClientRect();

let scoreNum = document.querySelector('.scoreNum');
let startText = document.querySelector('.startText');
let scoreText = document.querySelector('.scoreText');

let game_state = 'Start';
img.style.display = 'none';
startText.classList.add('startTextStyle');

document.addEventListener('keydown', (e) => {
    
    if(e.key == 'Enter' && game_state != 'Play'){
        document.querySelectorAll('.pipe').forEach((e) => {
            e.remove();
        });
        img.style.display = 'block';
        bird.style.top = '40vh';
        game_state = 'Play';
        startText.innerHTML = '';
        scoreText.innerHTML = 'Score : ';
        scoreNum.innerHTML = '0';
        startText.classList.remove('startTextStyle');
        play();
    }
});

function play(){
    function move(){
        if(game_state != 'Play') return;

        let pipe = document.querySelectorAll('.pipe');
        pipe.forEach((element) => {
            let pipe_props = element.getBoundingClientRect();
            bird_props = bird.getBoundingClientRect();

            if(pipe_props.right <= 0){
                element.remove();
            }else{
                if(bird_props.left < pipe_props.left + pipe_props.width && bird_props.left + bird_props.width > pipe_props.left && bird_props.top < pipe_props.top + pipe_props.height && bird_props.top + bird_props.height > pipe_props.top){
                    game_state = 'End';
                    startText.innerHTML = 'Game Over'.fontcolor('red') + '<br>Press Enter To Restart';
                    startText.classList.add('startTextStyle');
                    img.style.display = 'none';
                    return;
                }else{
                    if(pipe_props.right < bird_props.left && pipe_props.right + move_speed >= bird_props.left && element.increase_score == '1'){
                        scoreNum.innerHTML =+ scoreNum.innerHTML + 1;
                    }
                    element.style.left = pipe_props.left - move_speed + 'px';
                }
            }
        });
        requestAnimationFrame(move);
    }
    requestAnimationFrame(move);

    let bird_dy = 0;
    function apply_gravity(){
        if(game_state != 'Play') return;
        bird_dy = bird_dy + grativy;
        document.addEventListener('keydown', (e) => {
            if(e.key == 'ArrowUp' || e.key == ' '){
                img.src = 'images/Bird-2.png';
                bird_dy = -7.6;
            }
        });

        document.addEventListener('keyup', (e) => {
            if(e.key == 'ArrowUp' || e.key == ' '){
                img.src = 'images/Bird.png';
            }
        });

        if(bird_props.top <= 0 || bird_props.bottom >= background.bottom){
            game_state = 'End';
            startText.style.left = '28vw';
            window.location.reload();
            startText.classList.remove('startTextStyle');
            return;
        }
        bird.style.top = bird_props.top + bird_dy + 'px';
        bird_props = bird.getBoundingClientRect();
        requestAnimationFrame(apply_gravity);
    }
    requestAnimationFrame(apply_gravity);

    let pipe_seperation = 0;

    let pipe_gap = 35;

    function create_pipe(){
        if(game_state != 'Play') return;

        if(pipe_seperation > 115){
            pipe_seperation = 0;

            let pipe_posi = Math.floor(Math.random() * 43) + 8;
            let pipe_inv = document.createElement('div');
            pipe_inv.className = 'pipe';
            pipe_inv.style.top = pipe_posi - 70 + 'vh';
            pipe_inv.style.left = '100vw';

            document.body.appendChild(pipe_inv);
            let pipe = document.createElement('div');
            pipe.className = 'pipe';
            pipe.style.top = pipe_posi + pipe_gap + 'vh';
            pipe.style.left = '100vw';
            pipe.increase_score = '1';

            document.body.appendChild(pipe);
        }
        pipe_seperation++;
        requestAnimationFrame(create_pipe);
    }
    requestAnimationFrame(create_pipe);
}