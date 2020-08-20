import React, {Component} from 'react'

class SearchMap extends Component{
    
    constructor(props){ 
        super(props)
         
        this.state={
            keyword:"",
            address:"",
            roomlatitude:'',
            roomlongitude:''
        }
       
    }
     
    changeFuncSubmit=(e)=>{
        e.preventDefault();
        this.setState({
            keyword:document.getElementById("keyword").value
        })

        let that = this;
        // var address=null;
        // var place_name = null;
        let wedo = null;
        let gyeongdo = null;
        let japo = null;
        // 마커를 담을 배열입니다
     
        const kakao = window.kakao;
        // 마커를 클릭하면 장소명을 표출할 인포윈도우 입니다
        var infowindow = new kakao.maps.InfoWindow({zIndex:1});

        var mapContainer = document.getElementById('map'), // 지도를 표시할 div 
            mapOption = {
                center: new kakao.maps.LatLng(37.566826, 126.9786567), // 지도의 중심좌표
                level: 3 // 지도의 확대 레벨
            };  

        // 지도를 생성합니다    
        var map = new kakao.maps.Map(mapContainer, mapOption); 

        // 장소 검색 객체를 생성합니다
        var ps = new kakao.maps.services.Places(); 

        // 키워드로 장소를 검색합니다
        searchPlaces();

        // 키워드 검색을 요청하는 함수입니다
        function searchPlaces() {

            var keyword = document.getElementById('keyword').value;
         
            if (!keyword.replace(/^\s+|\s+$/g, '')) {
      
                return false;
            }

            // 장소검색 객체를 통해 키워드로 장소검색을 요청합니다
            ps.keywordSearch(keyword, placesSearchCB);

        }


        // 키워드 검색 완료 시 호출되는 콜백함수 입니다
        function placesSearchCB (data, status, pagination) {
            if (status === kakao.maps.services.Status.OK) {

                // 검색된 장소 위치를 기준으로 지도 범위를 재설정하기위해
                // LatLngBounds 객체에 좌표를 추가합니다
                var bounds = new kakao.maps.LatLngBounds();

                for (var i=0; i<data.length; i++) {
                    displayMarker(data[i]);    
                    bounds.extend(new kakao.maps.LatLng(data[i].y, data[i].x));
                }       

                // 검색된 장소 위치를 기준으로 지도 범위를 재설정합니다
                map.setBounds(bounds);
            } 
    

        }
 
        
        // 지도에 마커를 표시하는 함수입니다
        function displayMarker(place) {
       
            var callback = function(result, status) {
                if (status === kakao.maps.services.Status.OK) {
           
                    // address = result[0].address.address_name;
                        that.setState({
                            address:result[0].address.address_name
                        })
                    that.props.emit(that.state)
                }
            };
            
            // 마커를 생성하고 지도에 표시합니다
            var marker = new kakao.maps.Marker({
                map: map,
                position: new kakao.maps.LatLng(place.y, place.x) 
            });
            //주소-좌표간 변환 서비스 객체를 생성한다.
            var geocoder = new kakao.maps.services.Geocoder();

            //목적지 좌표 확인


            //두 좌표간 거리구하기 
         
            // 마커에 클릭이벤트를 등록합니다
            kakao.maps.event.addListener(marker, 'click', function() {
                // 마커를 클릭하면 장소명이 인포윈도우에 표출됩니다
                
                // place_name= place.place_name
                infowindow.setContent('<div style="padding:5px;font-size:12px;">' + place.place_name + '</div>');
                infowindow.open(map, marker);
                japo = marker.getPosition()
                wedo = japo.getLat();
                gyeongdo = japo.getLng();

                that.setState({
                    roomlatitude:wedo,
                    roomlongitude:gyeongdo
                })

                geocoder.coord2Address(gyeongdo, wedo, callback);
                

                // return place.place_name;
            });
        }



    }
     componentDidMount(){
        const kakao = window.kakao;
        // 마커를 클릭하면 장소명을 표출할 인포윈도우 입니다
        new kakao.maps.InfoWindow({zIndex:1});

        var mapContainer = document.getElementById('map'), // 지도를 표시할 div 
            mapOption = {
                center: new kakao.maps.LatLng(37.566826, 126.9786567), // 지도의 중심좌표
                level: 3 // 지도의 확대 레벨
            };  

        // 지도를 생성합니다    
        new kakao.maps.Map(mapContainer, mapOption); 
     }

 

    render(){
        return(
            
            <div className="map_wrap">
             <div id="map" style={{width:"auto", minHeight:this.props.height,overflow:"hidden"}}></div>

                    <input name="second" id="keyword" type="text" />
                    <button type="text"  onClick={this.changeFuncSubmit}>검색!</button>
                <p>선택하신 장소는 {this.state.address} 입니다.</p>
            {/* if(this.chooseMarker != null) */}
         
            </div>
        )
    }
}

export default SearchMap