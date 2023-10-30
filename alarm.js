let alarmListArr = [];
const selectMenu = document.querySelectorAll("select");
const setAlarmClk = document.querySelector("#settingAlarm");
let alarmCount = 0;
let alarmTime;
let ring = new Audio("muzic/ringtone.wav");


function updateClock(){
    var now = new Date();
    var dname = now.getDay(),
        month = now.getMonth(),
        dnum = now.getDate(),
        year = now.getFullYear(),
        hour = now.getHours(),
        minute = now.getMinutes(),
        sec = now.getSeconds(),
        sgn = "AM";

        if(hour==0){
            hour = 12;
        }

        if(hour>12){
            hour -=12;
            sgn = "PM";
        }

        Number.prototype.pad = function(digits){
            for(var n = this.toString(); n.length<digits; n=0+n);
            return n;
        }

        var months = ["January", "February", "March", "April", "May", "June", "July", "August", "September", "October", "November", "December"];
        var week = ["Sunday", "Monday", "Tusday", "Wednesday", "Thursday", "Friday", "Saturday"];
        var ids =["dayName", "month", "dayNum", "year", "hour", "minutes", "seconds", "period"];
        var values = [week[dname], months[month], dnum.pad(2),year,hour.pad(2),minute.pad(2),sec.pad(2),sgn];
        
        for(var i=0; i<ids.length;i++){
            document.getElementById(ids[i]).firstChild.nodeValue = values[i];
        }

        for(let i=0; i<alarmListArr.length;i++){
            if(alarmListArr[i]==`${hour.pad(2)}:${minute.pad(2)}:${sec.pad(2)} ${sgn}`){
                console.log("Alarm ringing...");
                ring.load();
                ring.play(10000 ,sec);
                document.querySelector("#stopAlarm").style.visibility= "visible";
            }
        }
}

function startClock() {
    updateClock();
    window.setInterval("updateClock()",1000);
}


for(let i=12; i>0;i--){
    i=i<10 ? "0"+i :i;
    let option = `<option value="${i}">${i}</option>`;
    selectMenu[0].firstElementChild.insertAdjacentHTML("afterend", option);
}

for(let i=59; i>=0;i--){
    i=i<10 ? "0"+i :i;
    let option = `<option value="${i}">${i}</option>`;
    selectMenu[1].firstElementChild.insertAdjacentHTML("afterend", option);
}

for(let i=2; i>0;i--){
    let ap = i== 1? "AM":"PM";
    let option = `<option value="${ap}">${ap}</option>`;
    selectMenu[2].firstElementChild.insertAdjacentHTML("afterend", option);
}


function setAlarm(){
    document.querySelector("#ala").innerText = "Alarms";
    let time = `${selectMenu[0].value}:${selectMenu[1].value}:00 ${selectMenu[2].value}`;
    if(time.includes("setHour") || time.includes("setMinute") || time.includes("AM/PM")){
        alert("Please, Select Valide Input");
    }else{
        alarmCount++;
        document.querySelector(".alarmList").innerHTML += `
        <div class="alarmLog" id="alarm${alarmCount}">
            <span id="span${alarmCount}">${time}</span>
            <button class="clk-delete" id="${alarmCount}" onClick="deleteAlarm(this.id)">Delete</button>
        </div>`;

        alarmTime = `${selectMenu[0].value}:${selectMenu[1].value}:00 ${selectMenu[2].value}`;
        alarmListArr.push(alarmTime);
        console.log(document.querySelector(".clk-delete").value);
    }

}

setAlarmClk.addEventListener("click",setAlarm);


function deleteAlarm(click_id){
    var element = document.getElementById("alarm"+click_id);
    var deleteIndex = alarmListArr.indexOf(document.querySelector("#span"+click_id).innerText);
    alarmListArr.splice(deleteIndex,1);
    element.remove();
}

function stopAlarm(){
    ring.pause();
    document.querySelector("#stopAlarm").style.visibility= "hidden";
}
