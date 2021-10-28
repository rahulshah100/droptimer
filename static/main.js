let clicked = true

window.onload = (event) => {
    if (document.getElementsByClassName('commenced_at')[0]) {
        document.getElementsByClassName('commenced_at')[0].focus();
    }
}

function addclicked() {
    a = document.getElementsByClassName('add')[0];
    b = document.getElementsByClassName('bi')[0];
    if (clicked) {
        clicked = false
        a.className += " addclicked"
        b.className += " bi-plus-circle-fill"
        b.classList.remove("bi-plus-circle")
    }
    else {
        clicked = true
        a.classList.remove("addclicked")
        b.className += " bi-plus-circle"
        b.classList.remove("bi-plus-circle-fill")
    }
}


function schedule() {
    let commenced_at = document.getElementsByClassName('commenced_at')[0];
    let commenced_at_val = 0

    let interval = document.getElementsByClassName('interval')[0];
    let interval_val = 0

    let commencedErr = document.getElementsByClassName('commencedErr')[0];
    let intervalErr = document.getElementsByClassName('intervalErr')[0];

    let Am_Pm = document.getElementsByClassName("dropdown")[0];

    let interval_mins = ""
    let commenced_mins = ""
    if (interval.value.includes(".")) {
        interval_mins = Number(interval.value.toString().substring(interval.value.toString().indexOf(".") + 1))
    }
    else {
        interval_mins = 0;
        console.log(interval_mins)
    }
    
    if (interval.value.includes(".")) {
        commenced_mins = Number(commenced_at.value.toString().substring(commenced_at.value.toString().indexOf(".") + 1))
    }
    else {
        commenced_mins = 0;
        console.log(commenced_mins)
    }

    if (commenced_at.value.length == 0 || !commenced_at.value.replace(/\s/g, '').length) {
        commencedErr.innerHTML = "Please add a Time"
        commenced_at.classList.add("showRedBorder")
        commenced_at_val = 0
    }
    else if (!Number(commenced_at.value)) {
        commencedErr.innerHTML = "Please enter a valid Time"
        commenced_at.classList.add("showRedBorder")
        commenced_at_val = 0
    }
    else if (commenced_at.value >= 13) {
        commencedErr.innerHTML = "Hours must not be more than 12"
        commenced_at.classList.add("showRedBorder")
        commenced_at_val = 0
    }
    else if (commenced_mins.toFixed(3) >= (6).toFixed(3) || commenced_mins.toString().length > 2) {
        commencedErr.innerHTML = "Mins must be less than 60"
        console.log(commenced_mins, commenced_mins.toFixed(3), (6).toFixed(3))
        commenced_at.classList.add("showRedBorder")
        commenced_at_val = 0
    }
    else {
        commenced_at.classList.remove("showRedBorder");

        commenced_at_val = commenced_at.value;
        commencedErr.innerHTML = "";
    }


    if (interval.value.length == 0 || !interval.value.replace(/\s/g, '').length) {
        intervalErr.innerHTML = "Please add an Interval"
        interval.classList.add("showRedBorder")
        interval_val = 0
    }
    else if (!Number(interval.value)) {
        intervalErr.innerHTML = "Please enter a valid interval"
        interval.classList.add("showRedBorder")
        interval_val = 0
    }
    else if (interval.value > 24) {
        intervalErr.innerHTML = "Interval must not be less than 24Hr"
        interval.classList.add("showRedBorder")
        interval_val = 0
    }
    else if (interval_mins.toFixed(3) >= (6).toFixed(3) || interval_mins.toString().length > 2) {
        intervalErr.innerHTML = "Mins must be less than 60"
        interval.classList.add("showRedBorder")
        interval_val = 0
    }
    else {
        interval.classList.remove("showRedBorder");

        interval_val = interval.value
        intervalErr.innerHTML = ""
    }

    if (commenced_at_val != 0 && interval_val != 0) {
        let Result = document.getElementById('Result');

        let theSchedule = calculateSchedule(Number(commenced_at_val), Number(interval_val), Am_Pm.value);

        intervalErr.innerHTML = "";
        commencedErr.innerHTML = ""

        Result.style.display = "block";
        Result.innerHTML = theSchedule;
    }
}

function calculateSchedule(commenced_at, interval, Am_Pm) {
    let theSchedule = "In the next 24 hours you should put the Drops at: ";
    let timer = 0;
    let next_drop_at = commenced_at;

    let next_drop_at_min = parseFloat(next_drop_at.toString().substring(next_drop_at.toString().indexOf(".") + 1));

    while (timer < 24) {
        next_drop_at = parseFloat(next_drop_at);

        timer += interval;
        next_drop_at = (next_drop_at + interval).toFixed(2);

        console.log("printing noext drop at min", typeof (next_drop_at_min), next_drop_at_min)

        if (next_drop_at_min > 6) {
            console.log("hERE")
            console.log(next_drop_at, next_drop_at_min)
            next_drop_at = (next_drop_at - 0.60 + 1).toFixed(2);
            next_drop_at_min = Number(next_drop_at_min) - 60;
            console.log(next_drop_at, next_drop_at_min, "/n")
        }

        if (next_drop_at > 13) {
            if (Am_Pm == "AM") {
                Am_Pm = "PM"
            }
            else {
                Am_Pm = "AM"
            }
            next_drop_at = (next_drop_at - 12).toFixed(2);
        }

        if (timer >= 24) {
            theSchedule = theSchedule.concat(next_drop_at, Am_Pm);
        }
        else {
            theSchedule = theSchedule.concat(next_drop_at, Am_Pm, ", ");
        }
    }

    return theSchedule;
}