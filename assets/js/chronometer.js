//Common functions
function Start(btn_id, fn) {
    document.getElementById(btn_id).innerHTML = "Pause";
    document.getElementById(btn_id).setAttribute("onclick", fn);
    document.getElementById(btn_id).setAttribute("class", "btn me-4 btn-outline-warning");
}

function Pause(btn_id, fn) {
    document.getElementById(btn_id).innerHTML = "Resume";
    document.getElementById(btn_id).setAttribute("onclick", fn);
    document.getElementById(btn_id).setAttribute("class", "btn me-4 btn-outline-success");
}

function Resume(btn_id, fn) {
    document.getElementById(btn_id).innerHTML = "Pause";
    document.getElementById(btn_id).setAttribute("onclick", fn);
    document.getElementById(btn_id).setAttribute("class", "btn me-4 btn-outline-warning");
}

function Reset(btn_id, fn) {
    document.getElementById(btn_id).innerHTML = "Start";
    document.getElementById(btn_id).setAttribute("onclick", fn);
    document.getElementById(btn_id).setAttribute("class", "btn me-4 btn-outline-success");
}

let twodigit = (i) => i < 10 ? "0" + i : i;

//Clock

let clock;
let time;
let date;
const options = {
    weekday: 'long',
    year: 'numeric',
    month: 'long',
    day: 'numeric'
};
setInterval(() => {
    clock = new Date();
    time = twodigit(clock.getHours()) + " : " + twodigit(clock.getMinutes()) + " : " + twodigit(clock.getSeconds());
    date = clock.toLocaleDateString(undefined, options);
    document.getElementById("Clock").innerHTML = date + "<hr/>" + time;
}, 1000);


//StopWatch

let SW_ID = null;
let initial_sw, current_sw, count_sw, hrs_sw = 0,
    mins_sw = 0,
    secs_sw = 0,
    msecs_sw = 0;

let Stopwatch = () => {
    current_sw = new Date();
    count_sw = current_sw - initial_sw;
    msecs_sw = Math.floor((count_sw % 1000) / 10);
    secs_sw = Math.floor((count_sw / 1000)) % 60;
    mins_sw = Math.floor((count_sw / 60000)) % 60;
    hrs_sw = Math.floor((count_sw / 3600000)) % 60;
    document.getElementById("sw-msecs").innerHTML = twodigit(msecs_sw);
    if (msecs_sw == 0) {
        document.getElementById("sw-secs").innerHTML = twodigit(secs_sw);
        if (secs_sw == 0) {
            document.getElementById("sw-mins").innerHTML = twodigit(mins_sw);
            if (mins_sw == 0) {
                document.getElementById("sw-hrs").innerHTML = twodigit(hrs_sw);
            }
        }
    }
};

function Start_sw() {
    Start("sw-start", "Pause_sw()");
    initial_sw = new Date();
    SW_ID = setInterval(Stopwatch, 10);
}

function Pause_sw() {
    Pause("sw-start", "Resume_sw()");
    clearInterval(SW_ID);
}

function Resume_sw() {
    Resume("sw-start", "Pause_sw()");
    current_sw = new Date();
    initial_sw = current_sw - count_sw;
    SW_ID = setInterval(Stopwatch, 10);
}

function Reset_sw() {
    Reset("sw-start", "Start_sw()");
    clearInterval(SW_ID);
    document.getElementById("sw-msecs").innerHTML = "00";
    document.getElementById("sw-secs").innerHTML = "00";
    document.getElementById("sw-mins").innerHTML = "00";
    document.getElementById("sw-hrs").innerHTML = "00";
}


//Timer

let T_ID;
let hrs_t, mins_t, secs_t, timeleft;

let set_timer = () => {
    hrs_t = document.getElementById("timer-hrs").value / 1;
    mins_t = document.getElementById("timer-mins").value / 1;
    secs_t = document.getElementById("timer-secs").value / 1;
    localStorage.setItem("input_hrs", hrs_t);
    localStorage.setItem("input_mins", mins_t);
    localStorage.setItem("input_secs", secs_t);
    timeleft = new Date((hrs_t*3600 + mins_t*60 + secs_t)*1000).getTime();
}

function Timer() {
    timeleft -= 1000;
    if (timeleft < 0) {
        clearInterval(T_ID);
        Reset_T();
        alert("Time is UP");
        return;
    }
    hrs_t = Math.floor((timeleft % (1000 * 60 * 60 * 24)) / (1000 * 60 * 60));
    mins_t = Math.floor((timeleft % (1000 * 60 * 60)) / (1000 * 60));
    secs_t = Math.floor((timeleft % (1000 * 60)) / 1000);
    document.getElementById("timer-secs").setAttribute("value", twodigit(secs_t));
    document.getElementById("timer-mins").setAttribute("value", twodigit(mins_t));
    document.getElementById("timer-hrs").setAttribute("value", twodigit(hrs_t));
    document.getElementById("timer-data").reset();
}

function Start_T() {
    set_timer();
    Start("timer-start", "Pause_T()");
    T_ID = setInterval(Timer, 1000);
}

function Resume_T() {
    Resume("timer-start", "Pause_T()");
    T_ID = setInterval(Timer, 1000);
}

function Pause_T() {
    Pause("timer-start", "Resume_T()");
    clearInterval(T_ID);
}

function Reset_T() {
    clearInterval(T_ID);
    Reset("timer-start", "Start_T()");
    document.getElementById("timer-hrs").setAttribute("value", twodigit(localStorage.getItem("input_hrs")));
    document.getElementById("timer-mins").setAttribute("value", twodigit(localStorage.getItem("input_mins")));
    document.getElementById("timer-secs").setAttribute("value", twodigit(localStorage.getItem("input_secs")));
}