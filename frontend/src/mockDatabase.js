// Mock resources for development

const mockDatabase = [
  {
    resourceID: "1",
    category: "Venue",
    name: "Big Room",
    bookings: [{ startTime: new Date('2018', '8', '15', '10', '30'), endTime: new Date('2018', '8', '11', '12', '00') }],
    description: "This is a nice big room",
    availableDays: ['Monday', 'Tuesday', 'Wednesday', 'Thursday', 'Friday'],
    availableTimes: [],
    tags: ["Projector", "Whiteboard", "Sound System"]
  },
  {
    resourceID: "2",
    category: "Venue",
    name: "Small Room",
    bookings: [{ startTime: new Date('2018', '8', '15', '13', '30'), endTime: new Date('2018', '8', '11', '17', '00') }],
    description: "This is a cozy little room",
    availableDays: ['Monday', 'Tuesday', 'Wednesday', 'Thursday', 'Friday'],
    availableTimes: [],
    tags: ["Whiteboard"]
  },
  {
    resourceID: "3",
    category: "Car",
    name: "Ferrari Model B",
    bookings: [{ startTime: new Date('2018', '8', '15', '10', '30'), endTime: new Date('2018', '8', '11', '11', '30') }],
    description: "This is a really fast car. Too fast.",
    availableDays: ['Monday', 'Tuesday', 'Wednesday', 'Thursday', 'Friday'],
    availableTimes: [],
    tags: ["Red", "Four Wheels"]
  },
  {
    resourceID: "4",
    category: "Car",
    name: "Volvo Model B",
    bookings: [{ startTime: new Date('2018', '8', '15', '14', '00'), endTime: new Date('2018', '8', '11', '14', '30') }],
    description: "This is a regular car. Goes regular speed.",
    availableDays: ['Monday', 'Tuesday', 'Wednesday', 'Thursday', 'Friday'],
    availableTimes: [],
    tags: ["Electric", "Eco-friendly"]
  },
  {
    resourceID: "5",
    category: "Computer",
    name: "Watson",
    bookings: [{ startTime: new Date('2018', '8', '15', '15', '15'), endTime: new Date('2018', '8', '11', '16', '30') }],
    description: "This is some kind of super-computer. Very expensive.",
    availableDays: ['Monday', 'Tuesday', 'Wednesday', 'Thursday', 'Friday'],
    availableTimes: [],
    tags: ["GPU", "Laptop"]
  },
  {
    resourceID: "6",
    category: "Horse",
    name: "Seabiscuit",
    bookings: [{ startTime: new Date('2018', '8', '15', '11', '30'), endTime: new Date('2018', '8', '11', '12', '30') }],
    description: "Neigh.",
    availableDays: ['Monday', 'Tuesday', 'Wednesday', 'Thursday', 'Friday'],
    availableTimes: [],
    tags: ["Majestic"]
  }
];

export default mockDatabase;