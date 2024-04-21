const express = require("express");
const app = express();
const http = require("http");
const { Server } = require("socket.io");
const cors = require("cors");

app.use(cors());

const server = http.createServer(app);

// init 2D table data
const generateTable = () => {
  const data = [];

  // Generate random data for each row
  for (let i = 0; i < 5; i++) {
    const row = [];

    // Generate random data for each column in the row
    for (let j = 0; j < 3; j++) {
      row.push(i + j);
    }

    data.push(row);
  }
  return data;
};

// change a random cell number
const changeRandomCell = (data) => {
  // Randomly select row and column indices
  const rowIndex = Math.floor(Math.random() * data.length);
  const colIndex = Math.floor(Math.random() * data[0].length);

  // Generate a new random number for the selected cell
  const newValue = Math.floor(Math.random() * 10); // Assuming the range of random numbers is 0 to 9

  // Update the selected cell with the new value
  data[rowIndex][colIndex] = newValue;

  return data;
};

let data = generateTable();

// allow react front-end app access
const io = new Server(server, {
  cors: {
    origin: "http://localhost:3000",
    methods: ["GET", "POST"],
  },
});

// socket for event emitter and event listener
io.on("connection", (socket) => {
  console.log(`User Connected: ${socket.id}`);

  // Emit a random number every second
  let interval = setInterval(() => {
    const dataChange = changeRandomCell(data);
    console.log(dataChange);
    socket.emit("data", dataChange);
  }, 5000);

  socket.on("disconnect", () => {
    console.log("A client disconnected");
    clearInterval(interval);
  });
});

server.listen(3001, () => {
  console.log("SERVER IS RUNNING");
});
