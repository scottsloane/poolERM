import React, {useState, useEffect, useCallback} from "react";
export default function Location() {
    
    let [lattitude, setLattitude] = useState(0);
    let [longitude, setLongitude] = useState(0);
    function success(position) {
        return ([
            setLattitude(position.coords.latitude),
            setLongitude(position.coords.longitude)
        ]);
    };  
    function error(err) {
      console.log(err);
      return 0;
    };
    let updatePosition = () =>{
        if(!navigator.geolocation) {
            console.log("location not enabled")
        } else {
            navigator.geolocation.getCurrentPosition(success, error);
        };
    };
    return(
        <div>
            <button onClick={updatePosition()}>update location</button>
            <p>{lattitude}</p>
            <p>{longitude}</p>
        </div>
    )
  }
  
