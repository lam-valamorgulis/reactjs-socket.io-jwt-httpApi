import React, { useState, useEffect } from "react";
import { socket } from "../socket";
import { getTokenFromLocalStorage } from "../utils/localStorage";
import classNames from "classnames";

const DashBoardTable = () => {
  const [data, setData] = useState([]);
  const [prevData, setPrevData] = useState([]);
  const [nextData, setNextData] = useState([]);
  const [user] = useState(getTokenFromLocalStorage());

  useEffect(() => {
    if (!user) return;
    console.log("connecting");
    socket.connect();

    return () => {
      console.log("disconnecting");
      socket.disconnect();
    };
  }, [user]);
  // object add json.stringify(user)

  // Listen for data event
  useEffect(() => {
    function onDataEvent(value) {
      setNextData(value);
      console.log("nextData", nextData);
    }

    socket.on("data", onDataEvent);

    return () => {
      socket.off("data", onDataEvent);
      console.log("disconnecting data event");
    };
  }, [nextData]);

  // Update data every 3 seconds
  useEffect(() => {
    const timer = setTimeout(() => {
      setPrevData(data);
      setData(nextData);
      // console.log("data", data);
    }, 3000);

    return () => clearTimeout(timer);
  }, [nextData, data]);

  // Cell style
  const cellStyle = (value, rowIndex, columnIndex) => {
    const nextValue = nextData[rowIndex]
      ? nextData[rowIndex][columnIndex]
      : null;

    return classNames({
      "bg-green-500 text-white": value === nextValue,
      "bg-yellow-500 text-black ": value !== nextValue,
    });
  };

  // Render table
  return (
    <div className="flex-1 flex flex-col justify-center">
      <table className="w-full border-collapse">
        <tbody>
          {/* duplicate if data2 */}
          {data.map((row, rowIndex) => (
            <tr className="flex flex-row" key={rowIndex}>
              {row.map((item, columnIndex) => (
                <td
                  className={classNames(
                    "text-white m-2 p-5 bg-gray-800 flex-1 text-3xl font-bold text-center rounded-2xl",
                    cellStyle(item, rowIndex, columnIndex)
                  )}
                  key={columnIndex}
                >
                  {item}
                </td>
              ))}
            </tr>
          ))}
        </tbody>
      </table>
    </div>
  );
};

export default DashBoardTable;
