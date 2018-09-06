// Mock resources for development

const mockResources = [
  {
    resourceID: "1",
    type: "Venue",
    name: "Big Room",
    bookings: [],
    description: "This is a nice big room",
    availability: "08:00 - 17:00",
    tags: ["Projector", "Whiteboard", "Sound System"]
  },
  {
    resourceID: "2",
    type: "Venue",
    name: "Small Room",
    bookings: [],
    description: "This is a cozy little room",
    availability: "08:00 - 17:00",
    tags: ["Whiteboard"]
  },
  {
    resourceID: "3",
    type: "Car",
    name: "Ferrari Model B",
    bookings: [],
    description: "This is a really fast car. Too fast.",
    availability: "09:00 - 22:00",
    tags: ["Red", "Four Wheels"]
  },
  {
    resourceID: "4",
    type: "Car",
    name: "Volvo Model B",
    bookings: [],
    description: "This is a regular car. Goes regular speed.",
    availability: "00:00 - 23:59",
    tags: ["Electric", "Eco-friendly"]
  },
  {
    resourceID: "5",
    type: "Computer",
    name: "Watson",
    bookings: [],
    description: "This is some kind of super-computer. Very expensive.",
    availability: "08:00 - 19:00",
    tags: ["GPU", "Laptop"]
  },
  {
    resourceID: "6",
    type: "Horse",
    name: "Seabiscuit",
    bookings: [],
    description: "Neigh.",
    availability: "N/A",
    tags: ["Majestic"]
  }
];

export default mockResources;