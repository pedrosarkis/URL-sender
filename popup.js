const getData = () => {
    const emailFrom = document.getElementById('from').value;
    const emailTo = document.getElementById('to').value;
    const pass = document.getElementById('pass').value;
    const data = {
        emailFrom,
        emailTo,
        pass,
    };
    return data;
};

const sendContent = (callback) => {
    const data = getData();
    chrome.tabs.query({'active': true,  'windowId': chrome.windows.WINDOW_ID_CURRENT }, async (tabs) => {
        const url = tabs[0].url;
        const requestData = { ...data, url }
        callback(requestData);
    });
};

const setLocalStorage = (data) => {
    debugger;
    chrome.storage.local.set({personData: JSON.stringify(data)}, function() {
        console.log('Value is set to ' + data);
      });
    return true;
};

const getLocalStorage = () => {
    const emailFrom = document.getElementById('from');
    const emailTo = document.getElementById('to');
    const pass = document.getElementById('pass');
    
    chrome.storage.local.get(['personData'], function(result) {
        
        let object = JSON.parse(result.personData);
       
        emailFrom.value = object.emailFrom;
        emailTo.value = object.emailTo;
        pass.value = object.pass;
    });
}
getLocalStorage();
    

const executeFetch = async (data) => {
    setLocalStorage(data);
    console.log(data)
    const fetchSettings = {
        method: 'POST',
        body: JSON.stringify(data),
        headers: {
            'Accept': 'application/json',
            'Content-Type': 'application/json',
        }
    };

    const response = await fetch('http://localhost:3000/sendPageContent', fetchSettings);
    if(!response.ok) throw Error(response.message);
    try {
        const responseData = await response.json();
        alert('sucesso');
        window.close();
    } catch (error) {
        alert('erro');
        
    }
}

document.getElementById('sendContent').addEventListener('click', () => {sendContent(executeFetch)});