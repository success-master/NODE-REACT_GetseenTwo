// Accounts is a bad user experience - this can be achieve with Groups alone.
export const accounts = [
  {
    id: "ac1",
    company: "Martins Group",
    adminName: "Chris Swain",
    adminEmail: "exponent42@gmail.com",
    adminPassword: "abc@123",
    groupCount: 2,
    memberCount: 5,
  },
];

export const users = [
  {
    id: "u1",
    name: "Will Walsh",
    email: "will@getseen.co.uk",
    // TODO Reference array of teams / groups which an individual is assigned to:
    teams: ["Martins Winchester", "Martins Basingstoke", "Martins Reading"],
    preferences: [
      {
        notifications: true,
        marketing: true,
        relevance: true,
      },
    ],
    // TODO implement user status = UI will render differently depending on each of the statuses below:
    status: ["invited", "member", "deleted"],
  },
  // {
  //   id: "u2",
  //   name: "Chris Swain",
  //   email: "c.swain@martins.uk.co",
  //   // TODO Reference array of teams / groups which an individual is assigned to:
  //   teams: ["Martins Winchester", "Martins Basingstoke", "Martins Reading"],
  //   preferences: [
  //     {
  //       notifications: true,
  //       marketing: true,
  //       relevance: true,
  //     },
  //   ],
  //   // TODO implement user status = UI will render differently depending on each of the statuses below:
  //   status: ["invited", "member", "deleted"],
  // },
];
export const reviews = [
  {
    id: "r1",
    origin: "Google",
    date: "20th March",
    reviewer: "Will Walsh",
    rating: 5,
    body: "Wonderful company - would highly recommend them to anyone!",
    group: "Martins Winchester",
    responded: false,
    response: "",
  },
  {
    id: "r2",
    origin: "Facebook",
    date: "28th March",
    reviewer: "Yuriy Christyakov",
    rating: 3,
    body: "i am not mind, nor intellect, nor ego",
    group: "Martins Basingstoke",
    responded: false,
    response: "",
  },
];

// export const connections = [
//   {
//     id: "c1",
//     name: "Google my Business",
//     iconClass: "gmb",
//     available: true,
//     connected: true,
//   },
//   {
//     id: "c2",
//     name: "Facebook",
//     iconClass: "facebook",
//     available: true,
//     connected: false,
//   },
//   {
//     id: "c3",
//     name: "Typeform",
//     iconClass: "typeform",
//     available: false,
//     connected: false,
//   },
// ];

export const templates = [
  {
    id: "t1",
    title: "Positive Review Response (example)",
    content:
      "Hi --Customer Name--, thanks so much for the 5-stars! Your review really makes a difference, so thanks again. Hope to see you again soon!",
    creator: "Will Walsh",
    lastEdited: "Chris Swain",
    usedCount: 5,
  },
  // {
  //   id: "t2",
  //   title: "4 Star Review Response",
  //   content:
  //     "Thanks so much for leaving us your 5 star review! We really appreciate you taking the time so others can find us online, too!",
  //   creator: "Will Walsh",
  //   lastEdited: "Chris Swain",
  //   usedCount: 5,
  // },
  // {
  //   id: "t3",
  //   title: "3 Star Review Response",
  //   content:
  //     "Thanks so much for leaving us your 5 star review! We really appreciate you taking the time so others can find us online, too!",
  //   creator: "Will Walsh",
  //   lastEdited: "Chris Swain",
  //   usedCount: 5,
  // },
  // {
  //   id: "t4",
  //   title: "2 Star Review Response",
  //   content:
  //     "Thanks so much for leaving us your 5 star review! We really appreciate you taking the time so others can find us online, too!",
  //   creator: "Will Walsh",
  //   lastEdited: "Chris Swain",
  //   usedCount: 5,
  // },
];

export const settings = [
  {
    id: "s1",
    path: "/my-account",
    iconClass: "my-account",
    title: "My Account",
    available: true,
  },
  {
    id: "s2",
    path: "/my-preferences",
    iconClass: "preferences",
    title: "Preferences",
    available: true,
  },
  {
    id: "s3",
    path: "/users",
    iconClass: "users",
    title: "Members",
    available: true,
  },
  {
    id: "s4",
    path: "/groups",
    iconClass: "groups",
    title: "Groups",
    available: true,
  },
  {
    id: "s5",
    path: "/templates",
    iconClass: "templates",
    title: "Templates",
    available: true,
  },
];

export const groups = [
  {
    id: "g1",
    name: "Renault Winchester",
    description: "Sales & Service",
    creator: "Chris Swain",
    members: 4,
    connections: 2,
  },
  {
    id: "g2",
    name: "Renault Basingstoke",
    description: "Service",
    creator: "Will Walsh",
    members: 8,
    connections: 2,
  },
];

//TODO Data format necessary for react-select components:

export const groupOptions = [
  { id: "g1", label: "Renault Winchester" },
  { id: "g2", label: "Renault Basingstoke" },
  { id: "g3", label: "Martins Nissan" },
  { id: "g4", label: "Martins Peugeot" },
];
