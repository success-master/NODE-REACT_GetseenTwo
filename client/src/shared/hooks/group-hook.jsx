import { useReducer } from "react";

const initState = {
  availableGroups: [],
  selectedGroup: {
    groupAccount: "",
    groupConnections: [],
    groupCreated: "",
    groupCreator: "",
    groupDescription: "",
    groupMessages: [],
    groupName: "",
    groupReviews: [],
    groupUsers: [],
    id: "",
  },
  adminAvailableGroups: [],
};

const groupReducer = (state, action) => {
  switch (action.type) {
    case "SELECTED_GROUP":
      const { selectedGroup } = action.payload;
      return {
        ...state,
        selectedGroup: {
          groupAccount: selectedGroup.groupAccount,
          groupConnections: selectedGroup.groupConnections,
          groupCreated: selectedGroup.groupCreated,
          groupCreator: selectedGroup.groupCreator,
          groupDescription: selectedGroup.groupDescription,
          groupMessages: selectedGroup.groupMessages,
          groupName: selectedGroup.groupName,
          groupReviews: selectedGroup.groupReviews,
          groupUsers: selectedGroup.groupUsers,
          id: selectedGroup.id,
        },
      };
    case "AVAILABLE_GROUPS":
      const { availableGroups } = action.payload;
      return {
        ...state,
        availableGroups: availableGroups,
      };
    case "ADMIN_AVAILABLE_GROUPS":
      const { adminAvailableGroups } = action.payload;
      return {
        ...state,
        adminAvailableGroups: adminAvailableGroups,
      };

    default:
      return state;
  }
};

// case "ADMIN_AVAILABLE_GROUPS":
//   const { adminAvailableGroups } = action.payload;
//   return {
//     ...state,
//     adminAvailableGroups: adminAvailableGroups,
//   };

export const useGroupReducer = () => {
  const [groups, dispatch] = useReducer(groupReducer, initState);
  return [groups, dispatch];
};
