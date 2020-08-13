let responseH1 = document.querySelector('.responseH1');
let responseP = document.querySelector('.responseP');
let loader2 = document.querySelector('.loader2');
let error = document.querySelector('.error');

let buttonL = document.querySelector('#buttonL');
buttonL.addEventListener("click", submissionL);

//Polling Locations
function submissionL(event) {
    event.preventDefault();
    let streetN = document.getElementById('userStreet').value;
    let str = document.getElementById('userStreet');
    let address = str.value.split(' ');
    let zip = document.getElementById('userZip').value;

    if ( streetN == '' || zip == '' ) {
        error.style.visibility = "visible";
        responseH1.innerHTML = '';
        responseP.innerHTML = '';
    } else {
        loader2.style.visibility = "visible";
        error.style.visibility = "hidden";
        responseH1.innerHTML = '';
        responseP.innerHTML = '';
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
            let poll = location.pollPlace.address.street;
            let pollDate = location.upcomingElections[0].date.split('T');
            responseH1.innerHTML = `Your polling locaiton is ${location.pollPlace.name} at ${poll}`;
            responseP.innerHTML = `Upcoming Elction: ${location.upcomingElections[0].name} on ${pollDate[0]}`
            loader2.style.visibility = "hidden";

            let pollLoc = poll.split(' ');
            let url = 'https://maps.googleapis.com/maps/api/geocode/json?address=' + pollLoc[0] + '+' + pollLoc[1] + '+' + pollLoc[2] + ',+Nj&key=AIzaSyDAuD9IhJnc81k7Ohjehpse9hRgtody5tU';

            fetch(url)

                .then(function (response) {
                    return response.json();
                })
                .then(function (location) {
                    let pollLocation = location.results[0].geometry.location;
                    map.setCenter(pollLocation);
                });
        });
    }
}

let map;

function initMap() {
    map = new google.maps.Map(document.getElementById("map"), {
        center: {
            lat: 40.7404028,
            lng: -74.2296709
        },
        zoom: 15
    });
}