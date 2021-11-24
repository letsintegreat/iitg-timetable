var timetable = {
    1: ["C", "A", "B", "D", "F"],
    2: ["E", "A", "C", "D", "F"],
    3: ["B", "A", "C", "E", "G"],
    4: ["D", "B", "C", "E", "G"],
    5: ["A", "B", "D", "F", "G"]
}

var al = {
    1: {
        "L6": "CH 110",
        "L7": "ME 110",
        "L8": "CE 101"
    },
    2: {
        "L9": "CH 110",
        "L10": "ME 110",
        "L6": "CE 101"
    },
    3: {
        "L7": "CH 110",
        "L8": "ME 110",
        "L9": "CE 101"
    },
    4: {
        "L10": "CH 110",
        "L6": "ME 110",
        "L7": "CE 101"
    },
    5: {
        "L8": "CH 110",
        "L9": "ME 110",
        "L10": "CE 101"
    }   
}

var ml = {
    1: {
        "L1": "CH 110",
        "L2": "PH 110",
        "L3": "CE 101"
    },
    2: {
        "L4": "CH 110",
        "L5": "PH 110",
        "L1": "CE 101"
    },
    3: {
        "L2": "CH 110",
        "L3": "PH 110",
        "L4": "CE 101"
    },
    4: {
        "L5": "CH 110",
        "L1": "PH 110",
        "L2": "CE 101"
    },
    5: {
        "L3": "CH 110",
        "L4": "PH 110",
        "L5": "CE 101"
    }   
}

var alphaToCode = {
    "A": "CE 101",
    "B": "EE 101",
    "C": "MA 101",
    "D": "CH 101",
    "E": "PH 101",
    "F": "F",
    "G": "G"
}

var codeToCourse = {
    "CE 101": "Engineering Drawing",
    "EE 101": "Basic Electronics",
    "MA 101": "Mathematics - I",
    "CH 101": "Chemistry",
    "PH 101": "Physics - I",
    "CH 110": "Chemistry Laboratory",
    "ME 110": "Physics Laboratory",
    "PH 110": "Physics Laboratory"
}

function readTextFile(file, rollno) {
    var rawFile = new XMLHttpRequest();
    rawFile.open("GET", file, false);
    rawFile.onreadystatechange = function ()
    {
        if(rawFile.readyState === 4)
        {
            if(rawFile.status === 200 || rawFile.status == 0)
            {
                var allData = rawFile.responseText;
                let args = allData.split("\n");
                let found = false;
                for(let i = 0; i < args.length; i++) {
                    let breaked = args[i].split(" ");
                    if (breaked[0] == rollno) {
                        let le = breaked.length;
                        var username = breaked[le-1];
                        var l = breaked[le-2];
                        var t = breaked[le-3];
                        var d = breaked[le-4];
                        let nalias = breaked.splice(1,le-5);
                        var alias = nalias.join(" ");

                        const mydate = new Date();
                        let day = mydate.getDay();

                        document.getElementById("en").innerHTML = "";

                        let chosenCustomDay = document.getElementById("customday").value;

                        if (chosenCustomDay == "0") {

                            if (day == 0) {
                                document.getElementById("en").innerHTML = "Today's free.<br>Tommorow's Time Table:";
                                day = 1;
                            } else if (day == 6) {
                                document.getElementById("en").innerHTML = "Today and Tommorow are free.<br>Monday Time Table:";
                                day = 1;
                            } else {
                                let currHour = new Date().getHours();
                                if (currHour < 17) {
                                    document.getElementById("en").innerHTML = "Today's Time Table:";
                                } else {
                                    if (day == 5) {
                                        document.getElementById("en").innerHTML = "Today's classes are over.<br>Monday Time Table:";
                                        day=1;
                                    } else {
                                        document.getElementById("en").innerHTML = "Today's classes are over.<br>Tommorow's Time Table:";
                                        day++;
                                    }
                                }
                            }

                            document.getElementById("en").innerHTML += "<br>";

                            if (day == 1) document.getElementById("en").innerHTML += "(Monday)";
                            else if (day == 2) document.getElementById("en").innerHTML += "(Tuesday)";
                            else if (day == 3) document.getElementById("en").innerHTML += "(Wednesday)";
                            else if (day == 4) document.getElementById("en").innerHTML += "(Thursday)";
                            else if (day == 5) document.getElementById("en").innerHTML += "(Friday)";

                        } else {
                            day = Number(chosenCustomDay);

                            document.getElementById("en").innerHTML += "Custom Day<br>";

                            if (day == 1) document.getElementById("en").innerHTML += "(Monday)";
                            else if (day == 2) document.getElementById("en").innerHTML += "(Tuesday)";
                            else if (day == 3) document.getElementById("en").innerHTML += "(Wednesday)";
                            else if (day == 4) document.getElementById("en").innerHTML += "(Thursday)";
                            else if (day == 5) document.getElementById("en").innerHTML += "(Friday)";
                        }

                        if (d == "I" || d == "II") { // division is 1 or 2

                            document.getElementById("tslot1").innerHTML = "08.00 - 08.55";
                            document.getElementById("tslot2").innerHTML = "09.00 - 11.55";
                            document.getElementById("tslot3").innerHTML = "12.00 - 12.55";
                            document.getElementById("tslot4").innerHTML = "01.00 - 01.55";
                            document.getElementById("tslot5").innerHTML = "02.00 - 02.55";
                            document.getElementById("tslot6").innerHTML = "03.00 - 03.55";
                            document.getElementById("tslot7").innerHTML = "04.00 - 04.55";
                            document.getElementById("tslot8").innerHTML = "05.00 - 05.55";

                            let tutorialClassCode = alphaToCode[timetable[day][0]];
                            document.getElementById("dslot1").innerHTML = "Tutorial class -- " + codeToCourse[tutorialClassCode] + " (" + tutorialClassCode + ")";
                            if (l in ml[day]) {
                                let labClassCode = ml[day][l];
                                document.getElementById("dslot2").innerHTML = "Lab Class -- " + codeToCourse[labClassCode] + " (" + labClassCode + ")";
                            } else {
                                document.getElementById("dslot2").innerHTML = "FREE!";
                            }
                            document.getElementById("dslot3").innerHTML = "FREE!";
                            document.getElementById("dslot4").innerHTML = "LUNCH BREAK";
                            let c1cc = alphaToCode[timetable[day][1]];
                            let c2cc = alphaToCode[timetable[day][2]];
                            let c3cc = alphaToCode[timetable[day][3]];
                            document.getElementById("dslot5").innerHTML = "Lecture Class -- " + codeToCourse[c1cc] + " (" + c1cc + ")";
                            document.getElementById("dslot6").innerHTML = "Lecture Class -- " + codeToCourse[c2cc] + " (" + c2cc + ")";
                            if (c3cc == "F" || c3cc == "G") {
                                document.getElementById("dslot7").innerHTML = "FREE!";
                            } else {
                                document.getElementById("dslot7").innerHTML = "Lecture Class -- " + codeToCourse[c3cc] + " (" + c3cc + ")";
                            }
                            document.getElementById("dslot8").innerHTML = "FREE!";
                        } else { // division is 3 or 4

                            document.getElementById("tslot1").innerHTML = "08.00 - 08.55";
                            document.getElementById("tslot2").innerHTML = "09.00 - 09.55";
                            document.getElementById("tslot3").innerHTML = "10.00 - 10.55";
                            document.getElementById("tslot4").innerHTML = "11.00 - 11.55";
                            document.getElementById("tslot5").innerHTML = "12.00 - 12.55";
                            document.getElementById("tslot6").innerHTML = "01.00 - 01.55";
                            document.getElementById("tslot7").innerHTML = "02.00 - 04.55";
                            document.getElementById("tslot8").innerHTML = "05.00 - 05.55";

                            let tutorialClassCode = alphaToCode[timetable[day][0]];
                            document.getElementById("dslot1").innerHTML = "Tutorial class -- " + codeToCourse[tutorialClassCode] + " (" + tutorialClassCode + ")";

                            let c1cc = alphaToCode[timetable[day][1]];
                            let c2cc = alphaToCode[timetable[day][2]];
                            let c3cc = alphaToCode[timetable[day][3]];
                            document.getElementById("dslot2").innerHTML = "Lecture Class -- " + codeToCourse[c1cc] + " (" + c1cc + ")";
                            document.getElementById("dslot3").innerHTML = "Lecture Class -- " + codeToCourse[c2cc] + " (" + c2cc + ")";
                            if (c3cc == "F" || c3cc == "G") {
                                document.getElementById("dslot4").innerHTML = "FREE!";
                            } else {
                                document.getElementById("dslot4").innerHTML = "Lecture Class -- " + codeToCourse[c3cc] + " (" + c3cc + ")";
                            }
                            document.getElementById("dslot5").innerHTML = "FREE!";
                            document.getElementById("dslot6").innerHTML = "LUNCH BREAK";

                            if (l in al[day]) {
                                let labClassCode = al[day][l];
                                document.getElementById("dslot7").innerHTML = "Lab Class -- " + codeToCourse[labClassCode] + " (" + labClassCode + ")";
                            } else {
                                document.getElementById("dslot7").innerHTML = "FREE!";
                            }
                            document.getElementById("dslot8").innerHTML = "FREE!";

                        }
                        document.getElementById("alias").innerHTML = alias + ",<br>" + "You have been allotted Divison " + d + ", " + t + " and " + l + ".";
                        show("");

                        found = true;
                        break;
                    }
                }
                if (!found) {
                    alert("Entered roll number is incorrect.");
                }
            }
        }
    }
    rawFile.send(null);
}

function func() {
    var inp = document.getElementById("in");
    var tinp = inp.value;
    if (tinp === "") {
        alert("You think I am a fool?!");
    } else {
        readTextFile("groupings.txt", tinp);
    }
}

function show(outp) {
    var res = document.getElementById("result");
    res.style.display = "block";
    setTimeout(() => {res.style.transform = "scale(1)"}, 100);
    // res.style.transform = "scale(1)";
    var my = document.getElementById("myself");
    my.style.transform = "scale(0)";
    my.style.display = "none";
}

function hide() {
    var res = document.getElementById("result");
    res.style.transform = "scale(0)";
    setTimeout(() => {res.style.display = "none";}, 1005);
    // res.style.display = "none";
    var my = document.getElementById("myself");
    my.style.transform = "scale(1)";
    my.style.display = "block";
}
