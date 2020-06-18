import React, { createContext } from "react";
import { useGroupReducer } from "../../shared/hooks/group-hook";

/* EXAMPLE:  
{
    Sorry for the strange key names present in DB /models, it was a vein attempt 
    to make things simpler for me, which has complicated it further. The irony :&#41;

    Top level component.... (Account) 

    state { 
        account1: [
            [{group1}, {group2}, {group3}, group4}.{..]
            [{template1}, {template2}, {template3}, {template4}...]
        ]
        account2: [
            {group1}, {group2}...
        ]
    }

    mobile number || email

    ...then we have Groups which store data related to each Group. Quite straight forward, right? 

    group {
        name: "Team One"
        description: "This is a group description"
        reviews: [{review}, {review}, {review}...],
        users: [{user}, {user}, {user}...],
        messages: [{message}, {message}, {message}...],
    }

    This reducer and context is to be used on the group select dropdown (like the endorsal.io example) so that it can be called and update the component data rendered on the client. 

    It'll also invoke cool things like update the URL in params to follow Router convetions on App.js.... so everything makes sense to the user and us. 

}
*/

export const GroupContext = createContext(null);

export const CreateGroupContext = (props) => {
  const [groups, dispatch] = useGroupReducer();

  return (
    <GroupContext.Provider value={{ groups, dispatch }}>
      {props.children}
    </GroupContext.Provider>
  );
};
