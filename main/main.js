//Voter Registration
let responseH1 = document.querySelector('.responseH1');
let responseP = document.querySelector('.responseP');
let loader = document.querySelector('.loader');
let nj = document.querySelector('#nj');
let error = document.querySelector('.error');
//let img = document.querySelector('.image')

let buttonR = document.querySelector('#buttonR');
buttonR.addEventListener('click', submissionR);

function submissionR(event) {
    event.preventDefault();
    let firstName = document.getElementById('userFirstName').value;
    let lastName = document.getElementById('userLastName').value;
    let dob = document.getElementById('userDOB').value.split("/");

    function capitalizeFirstLetter(string) {
        return string.charAt(0).toUpperCase() + string.slice(1);
    }

    firstName = capitalizeFirstLetter(firstName);
    lastName = capitalizeFirstLetter(lastName);

    if (firstName == '' || lastName == '' || dob[0] == '' || dob[1] == '') {
        error.style.visibility = "visible";
        responseH1.innerHTML = '';
        responseP.innerHTML = '';
        nj.innerHTML = '';
    } else {
        if (firstName == "John" && lastName == "Thomas" && dob[0] == "01" && dob[1] == "2000") {
            responseH1.innerHTML = `You have been registered to vote since ${registration[0].votingPrivilegeDate}!`;
            responseP.innerHTML = "Browse this website to be better equipped to vote.";
            loader.style.visibility = "hidden";
        } else {
            responseH1.innerHTML = '';
            responseP.innerHTML = '';
            nj.innerHTML = '';
            loader.style.visibility = "visible";
            error.style.visibility = "hidden";
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
                        responseH1.innerHTML = `${firstName} ${lastName} is not registered to vote in the state of New Jersey!`;
                        responseP.innerHTML = "You should click the link below to register in the state of New Jersey.";
                        nj.innerHTML = "Click Here!"
                        loader.style.visibility = "hidden";
                        //img.src = "../assests/XMark.jpg"
                    } else {
                        responseH1.innerHTML = `You have been registered to vote since ${registration[0].votingPrivilegeDate}!`;
                        responseP.innerHTML = "Browse this website to be better equipped to vote.";
                        loader.style.visibility = "hidden";
                        //img.src = "../assests/Check.jpg"
                    }
                });
        }
    }
}