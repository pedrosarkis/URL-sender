const getData = () => {
    const emailFrom = document.getElementById('from').value;
    const emailTo = document.getElementById('to').value;
    const pass = document.getElementById('pass').value;

    return {
        emailFrom,
        emailTo,
        pass,
    };
}

const sendContent = (callback) => {
    const data = getData();
    chrome.tabs.query({'active': true,  'windowId': chrome.windows.WINDOW_ID_CURRENT }, async (tabs) => {
        const url = tabs[0].url;
        const requestData = { ...data, url }
        callback(requestData);
    });
};


const executeFetch = async (data) => {
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
const doEverything = () => {
    sendContent(executeFetch);
};
document.getElementById('sendContent').addEventListener('click', doEverything );