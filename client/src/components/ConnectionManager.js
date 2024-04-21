import { socket } from "../socket";
import { Button } from "antd";

export function ConnectionManager() {
  function connect() {
    socket.connect();
  }

  function disconnect() {
    socket.disconnect();
  }

  return (
    <div className="flex justify-center gap-5 my-10">
      <Button type="primary" size="large" onClick={connect}>
        Connect
      </Button>
      <Button type="primary" danger size="large" onClick={disconnect}>
        Disconnect
      </Button>
    </div>
  );
}
