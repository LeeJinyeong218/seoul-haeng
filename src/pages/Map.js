import React, {useEffect, useState} from 'react';
import ReturnHome from "../components/ReturnHome";
import LoadingModal from "../components/LoadingModal";
import {getAllEventPlaces} from "../api/eventplaceapi";
// import CulturalHeritageList from "../assets/cultural_heritage.json"
import NavBar from "../components/Map/NavBar";

const Map = (props) => {
    const [map, setMap] = useState(null);

    const [searchWord, setSearchWord] = useState("");

    const events = props.events;
    const date = props.date;

    const [places, setPlaces] = useState([]);
    // const heritages = CulturalHeritageList['DATA'];
    const [isLoading, setIsLoading] = useState(false);
    const [loadingError, setLoadingError] = useState(null);

    const [selectedPlace, setSelectedPlace] = useState(null);

    const { kakao } = window;

    const viewEventList = events? events
        .filter((item) => {
            return Date.parse(item['STRTDATE']) <= date && Date.parse(item['END_DATE']) >= date;
        })
        .filter(event => {
            if (selectedPlace === undefined || selectedPlace === null) {
                return true;
            } else {
                return event['PLACE'].includes(selectedPlace['FAC_NAME']) || selectedPlace['FAC_NAME'].includes(event['PLACE']);
            }
        })
        .filter(event => {
            if (searchWord === "" || event.length === 0) {
                return true;
            } else {
                return event['TITLE'].includes(searchWord)
                    || event['PLAYER'].includes(searchWord)
                    || event['PLACE'].includes(searchWord);
            }
        })
        .slice(0, 5) : null;

    const initCoord = new kakao.maps.LatLng(37.551399, 126.988259);

    const options = { //지도를 생성할 때 필요한 기본 옵션
        center: initCoord, //지도의 중심좌표.
        level: 4 //지도의 레벨(확대, 축소 정도)
    };

    const handleLoadPlaces = async () => {
        let result = [];
        try {
            setIsLoading(true);
            setLoadingError(null);
            result = await getAllEventPlaces();
        } catch (error) {
            console.error(error);
            setLoadingError(error);
            return;
        } finally {
            setIsLoading(false);
        }
        setPlaces(result);
    };

    useEffect(() => {
        handleLoadPlaces();
        const container = document.getElementById('map'); //지도를 담을 영역의 DOM 레퍼런스
        setMap(new kakao.maps.Map(container, options)); //지도 생성 및 객체 리턴
        // eslint-disable-next-line react-hooks/exhaustive-deps
    }, []);

    useEffect(() => {
        if (map !== null && viewEventList.length !== 0) {
            let placeSet = new Set();
            let latsum = 0;
            let lngsum = 0;
            viewEventList.forEach(event => {
                const place = findEventPlace(event)
                if (place !== null) {
                    placeSet.add(place);
                }
            })
            placeSet.forEach(coord => {
                latsum += coord[0];
                lngsum += coord[1];
            })
            map.setCenter(new kakao.maps.LatLng(latsum/placeSet.size, lngsum/placeSet.size))
        }
        // eslint-disable-next-line react-hooks/exhaustive-deps
    }, [searchWord]);

    // handle search bar
    const handleSearchButtonClick = (value) => {
        setSelectedPlace(null);
        setSearchWord(value);
    }

    // find event's place
    const findEventPlace = (event) => {
        const find = places.filter(place => {
            return event['PLACE'].includes(place['FAC_NAME'])
        })[0];
        return find? [find['X_COORD'], find['Y_COORD']] : null;
    }


    // create marker
    const createEventPlaceMarker = (place, map) => {
        const placeMarker = new kakao.maps.Marker({
            map: map,
            position: new kakao.maps.LatLng(place['X_COORD'], place['Y_COORD']),
            clickable: true // 마커를 클릭했을 때 지도의 클릭 이벤트가 발생하지 않도록 설정합니다
        });
        kakao.maps.event.addListener(placeMarker, 'click', () => {
            setSelectedPlace(place);
            map.panTo(placeMarker.getPosition());
        })
    };
    places.forEach(item => createEventPlaceMarker(item, map));

    return (
        <div>
            {isLoading && <LoadingModal/>}
            <NavBar
                viewEvents={viewEventList}
                selectedPlace={selectedPlace}
                handleSearchButtonClick={handleSearchButtonClick}
            />
            <div id="map" style={{height:"100vh"}}></div>
            <ReturnHome />
            {loadingError?.message && <span>{loadingError.message}</span>}
        </div>
    );
};

export default Map;