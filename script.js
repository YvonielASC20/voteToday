//Mobile Nav Bar
let mobileButton = document.querySelector('.icon');
mobileButton.addEventListener('click', moblieNav);

function moblieNav() {
    let tab = document.getElementById("myLinks");
    if (tab.style.display === "block") {
        tab.style.display = "none";
    } else {
        tab.style.display = "block"
    }
}

//Voter Registration
let buttonR = document.querySelector('#buttonR');
buttonR.addEventListener("click", submissionR);

function submissionR(event) {
    event.preventDefault();
    let firstName = document.getElementById('userFirstName').value;
    let lastName = document.getElementById('userLastName').value;
    let dob = document.getElementById('userDOB').value.split("/");

    fetch('https://cors-anywhere.herokuapp.com/https://voter.svrs.nj.gov/api/voters', {
            "headers": {
                "accept": "application/json, text/plain, */*",
                "accept-language": "en-US,en;q=0.9",
                "content-type": "application/json",
                "sec-fetch-dest": "empty",
                "sec-fetch-mode": "cors",
                "sec-fetch-site": "same-origin",
                "cookie": "visid_incap_1909031=R07hMB3ZRImCvMOZ38EvF77UKl8AAAAAQUIPAAAAAACntMkpDtoxkSuqKxXD3aE0; __cfduid=dd79ee6683eb7d60a8c0e4524df7342241596642520; WT_FPC=id=172.27.131.234-3580030000.30829375:lv=1596639062548:ss=1596639062548; nmstat=1596642727150; incap_ses_221_1909031=AienJWZ+pypme7LhZiYRA4/qLF8AAAAAz/efo0+7cPna6qU6HJfJVQ==; session=2htf-skYDCa2d1VtUAsyrw..|1596786699|j8HV23Oazm4P-E9nUthzasDRGOl7kKNTDgucVC6OiykHGnAiDsF46fdBlOADyP3KECF8cGqeolmSU5Kfpmzm26YRPLvizXhCLNYyble5pFR8CgN61U_EvFRNBtx4ExDO|CcyZBkhrLF01lVE0eZD0DpG_EzQ."
            },
            "referrer": "https://voter.svrs.nj.gov/registration-check/results?firstName=" + firstName + "&middleInitial=&lastName=" + lastName + "&dob=" + dob[0] + "%2F" + dob[1],
            "referrerPolicy": "no-referrer-when-downgrade",
            "body": "{\"firstName\":\"" + firstName + "\",\"middleInitial\":\"\",\"lastName\":\"" + lastName + "\",\"dob\":\"" + dob[0] + "/" + dob[1] + "\"}",
            "method": "POST",
            "mode": "cors"
        })

        .then(function (response) {
            return response.json();
        })
        .then(function (registration) {
            if (registration == '') {
                console.log("You are not resigtered!");
            } else {
                console.log(registration[0].votingPrivilegeDate);
            }
        });
}

let buttonL = document.querySelector('#buttonL');
buttonL.addEventListener("click", submissionL);

//Polling Locations
function submissionL(event) {
    event.preventDefault();
    let streetN = document.getElementById('userStreet').value;
    let str = document.getElementById('userStreet');
    let address = str.value.split(' ');
    let zip = document.getElementById('userZip').value;

    fetch("https://cors-anywhere.herokuapp.com/https://voter.svrs.nj.gov/api/polling-places/search", {
           "headers": {
                "accept": "application/json, text/plain, */*",
                "accept-language": "en-US,en;q=0.9",
                "content-type": "application/json",
                "sec-fetch-dest": "empty",
                "sec-fetch-mode": "cors",
                "sec-fetch-site": "same-origin",
                "cookie": "visid_incap_1909031=R07hMB3ZRImCvMOZ38EvF77UKl8AAAAAQUIPAAAAAACntMkpDtoxkSuqKxXD3aE0; __cfduid=dd79ee6683eb7d60a8c0e4524df7342241596642520; nmstat=1596642727150; incap_ses_221_1909031=lN+HHL/rBwzvrsTlZiYRAwWGMV8AAAAAI3XDZ7okwh44ProOX9G0SA==; WT_FPC=id=172.27.131.234-3580030000.30829375:lv=1597077530561:ss=1597077509241; session=k7rluw-ewzyHNbcOWWq0Ow..|1597084788|8dYAb3S5Qg0pjNTBXg4T9h0Nk3SPlirG1ExE22hCdPBdIE6uR6aqEcT1_ivqXzYwLsO5yUZt-Y1BczdmUAAHcNuUoyoweizkjQ-6l5VuamFgtFAnMjKI8S9OiTAeT4mQ|YP_WJ-uhnP7su6IZC9F9b6zOT7Q."
            },
            "referrer": "https://voter.svrs.nj.gov/polling-place-search?street=" + address[0] + "%2520" + address[1] + "%2520" + address[2] + "&zip=" + zip,
            "referrerPolicy": "no-referrer-when-downgrade",
            "body": "{\"street\":\"" + streetN + "\",\"zip\":\"" + zip + "\"}",
            "method": "POST",
            "mode": "cors"
        })

        .then(function (response) {
            return response.json();
        })
        .then(function (location) {
            console.log(location);
             let pollLocation = location.pollPlace.address.street
            console.log(pollLocation);
        });
}

 