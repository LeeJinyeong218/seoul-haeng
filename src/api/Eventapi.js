export async function getEvents({start, end}) {
    const response = await fetch(
        `http://openapi.seoul.go.kr:8088/${process.env.REACT_APP_API_KEY}/json/culturalEventInfo/${start.toString()}/${end.toString()}/ /`
    );
    const body = await response.json();
    return body['culturalEventInfo']['row']
}

export async function getEventsNum() {
    const response = await fetch(
        `http://openapi.seoul.go.kr:8088/${process.env.REACT_APP_API_KEY}/json/culturalEventInfo/1/1/ /`
    );
    const body = await response.json();
    return body['culturalEventInfo']['list_total_count']
}