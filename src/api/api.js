async function getEvents({start, end}) {
    return fetch(
        `http://openapi.seoul.go.kr:8088/${process.env.REACT_APP_API_KEY}/json/culturalEventInfo/${start.toString()}/${end.toString()}/`
    ).catch((error) => {
        return console.log("error alert! \n"+error);
    }).then((response) => {
        return response.json();
    }).then((data) => {
        return data['culturalEventInfo']['row'];
    });
}

async function getEventsNum() {
    const response = await fetch(
        `http://openapi.seoul.go.kr:8088/${process.env.REACT_APP_API_KEY}/json/culturalEventInfo/1/1/ /`
    );
    const body = await response.json();
    return body['culturalEventInfo']['list_total_count'];
}

export async function getAllEvents() {
    let retArr = []; // return array
    const num = await getEventsNum(); // list_total_count
    let i = 0;
    for (; i<(num/1000); i++){
        try {
            let k = await getEvents({start: i*1000+1, end: (i+1)*1000});
            retArr = retArr.concat(k);
        } catch {
            return;
        }
    }
    return retArr;
}