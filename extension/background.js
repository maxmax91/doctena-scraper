const extensions = 'https://developer.chrome.com/docs/extensions';
const webstore = 'https://developer.chrome.com/docs/webstore';

chrome.action.onClicked.addListener((tab) => 
    { chrome.scripting.executeScript({ target: {tabId: tab.id}, function: scrapePage }); });


function scrapePage() { 
    //  "Nom", "Sexe", "Numéro de sécurité sociale", "Portable", "Address", "Email"
    //  Press button Modifier patient


    var xpath = function (xpathToExecute) {
        var result = [];
        var nodesSnapshot = document.evaluate(xpathToExecute, document, null, XPathResult.ORDERED_NODE_SNAPSHOT_TYPE, null);
        for (var i = 0; i < nodesSnapshot.snapshotLength; i++) {
            result.push(nodesSnapshot.snapshotItem(i));
        }
        return result;
    }

    user_details = {}
    
    user_details['title'] = xpath("//input[@name='title']")[0].value;
    user_details['lastName'] = xpath("//input[@name='lastName']")[0].value;
    
    user_details['firstName'] = xpath("//input[@name='firstName']")[0].value;

    user_details['gender'] = xpath("//select[@name='gender']")[0].value; // F or M, NA o PNTS
    user_details['language'] = xpath("//select[@name='language']")[0].value;
    user_details['patientBirthday'] = xpath("//span[.='Date de naissance']/../..//input")[0].value;
    user_details['insuranceCompany'] = xpath("//input[@name='insuranceCompany']")[0].value;
    user_details['email'] = xpath("//input[@name='email']")[0].value;

    user_details['houseNumber'] = xpath("//input[@name='houseNumber']")[0].value;
    user_details['street'] = xpath("//input[@name='street']")[0].value;
    user_details['city'] = xpath("//input[@name='city']")[0].value;
    user_details['zipCode'] = xpath("//input[@name='zipCode']")[0].value;
    user_details['country'] = xpath("//select[@name='country']")[0].value; // DE; FR, IT, LU

    user_details['patientNotes'] = xpath("//textarea[@name='practiceNotes']")[0].value; // note multilinea

    user_details['mobile'] = xpath("//input[@name='mobile']")[0].value;
    user_details['telephone'] = xpath("//input[@name='telephone']")[0].value;

    user_details['bsn'] = xpath("//input[@name='bsn']")[0].value; // cns number
    // console.log( xpath("//dt[@class='patient-info-card__property' and .='Nom']/following-sibling::dd[1]")[0].textContent )
    
    // get informations
    console.log(user_details);

    if (window.confirm("Aggiungere il seguente utente?" + JSON.stringify(user_details, null, 2))) {

        fetch('http://localhost:5000/send', { 
            method: 'POST', 
            headers: { 'Content-Type': 'application/json', 'Access-Control-Allow-Origin': '*'  }, 
            body: JSON.stringify( user_details ) 
        })
        .then(response => response.json())
        .then(result => console.log(result))
        .catch(error => console.error('Error:', error));
    }
}