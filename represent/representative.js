let body = document.getElementById('registration');
let error = document.querySelector('.error');
let container = document.querySelector('#container');

let buttonO = document.querySelector('#buttonO');
buttonO.addEventListener('click', submissionO);

function submissionO(event) {
    event.preventDefault();
    let i;
    let street = document.getElementById('userAddress').value.split(' ');
    let state = document.getElementById('userState').value;

    if (street == '' || state == '') {
    } else {
        let url2 = "https://www.googleapis.com/civicinfo/v2/representatives?key=AIzaSyCVICfdav7jhL0w0PBTFvZtRFLwFt2g-SM&address=" + street[0] + "%20" + street[1] + "%20" + street[2] + ".%20" + state
        fetch(url2)

            .then(function (response) {
                return response.json();
            })
            .then(function (info) {
                console.log(info);
                for (i = info.officials.length - 1; i > -1; i--) {
                    let div = document.createElement('div');
                    let h1 = document.createElement('h1');
                    let party = document.createElement('p');
                    let phone = document.createElement('p');
                    let webLink = document.createElement('a');

                    let divAtt = document.createAttribute("class");
                    divAtt.value = "repContainer";
                    div.setAttributeNode(divAtt);
                    let h1Att = document.createAttribute("class");
                    h1Att.value = "repHeading";
                    h1.setAttributeNode(h1Att);
                    let partyAtt = document.createAttribute("class");
                    partyAtt.value = "repParty";
                    party.setAttributeNode(partyAtt);
                    let phoneAtt = document.createAttribute("class");
                    phoneAtt.value = "repPhone";
                    phone.setAttributeNode(phoneAtt);
                    let webAtt = document.createAttribute("class");
                    webAtt.value = "repWeb";
                    webLink.setAttributeNode(webAtt);
                    div.appendChild(h1);
                    div.appendChild(party);
                    div.appendChild(phone);
                    div.appendChild(webLink);
                    container.appendChild(div);
                    h1.innerHTML = info.officials[i].name;
                    party.innerHTML = `Party: ${info.officials[i].party}`;
                    phone.innerHTML = `Contact: ${info.officials[i].phones[0]}`;
                    webLink.innerHTML = `Website: ${info.officials[i].urls}`;
                }
            });
    }
}