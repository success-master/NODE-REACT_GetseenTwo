import React, { useState, useEffect } from 'react';
import AsyncSelect from 'react-select/async'

const ReactSelectExample = (props) => {
const [selections, setSelections] = useState({})


useEffect(() => {
    const fetchGroups = async (inputValue, callback) => {

    if (!inputValue) {
        callback([]); } else {
        try {
            const responseData = await sendRequest(process.env.REACT_BACKEND_URL + `/groups/${inputValue}`, 'GET');
            setSelections(responseData)
            const tempArray = [];
            await groups.forEach((group) => {
                tempArray.push({label: `${group.groupName}`})
            })
            
        } catch {

        }
    } 
}
})


const fetchGroups = async (inputValue, callback) => {


        setTimeout(() => {
    await fetch(process.env.REACT_BACKEND_URL + "/values/findusers/" + inputValue, {
    method: "GET",
  })
  .then((resp) => {
    return resp.json()
  }) 
  .then((group) => {
      const tempArray = [];
     groups.forEach((group) => {
            tempArray.push({ label: `${group.groupName}`, value: group.id });
     });
     callback(tempArray);            
  })
  .catch((error) => {
    console.log(error, "catch the hoop")
  });
});
}
}

 const onSearchChange = (event) => {
    if (event) {
        setSelectedOption({
        selectedOption
       });
    }
  };

      return ( <div>
           <AsyncSelect
                value={selectedOption}
                loadOptions={fetchGroups}
                placeholder="Admin Name"
                onChange={onSearchChange}
                defaultOptions={false}
            />
      </div>)

}

export default ReactSelectExample;