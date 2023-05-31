import { useEffect, useState } from "react";
import "./index.css";
export const Calculadora = () => {
  const [result, setResult] = useState<string>("");

  const [history, setHistory] = useState<string[]>([]);

  useEffect(() => {
    const getValue = (event: KeyboardEvent) => {
      console.log(event);

      if (event.key === "Enter") {
        document.getElementById("Enter")?.click();
      } else if (event.key === "Escape") {
        document.getElementById("Escape")?.click();
      } else if (event.key === "Backspace") {
        setResult((last) => last.slice(0, -1));
      } else {
        try {
          if (isNaN(Number(event.key))) throw new Error();

          setResult((last) => {
            if (last.length < 20) return last + event.key;
            return last;
          });
        } catch (error) {
          const validate = ["+", ".", "/", "*", "-"];
          if (validate.includes(event.key)) {
            setResult((last) => {
              if (last.length < 20) return last + event.key;
              return last;
            });
          }
        }
      }
    };

    window.addEventListener("keydown", getValue);
    return () => {
      window.removeEventListener("keydown", getValue);
    };
  }, []);
  const handleClick = (value: string) => {
    if (result.length < 8) {
      setResult(result.concat(value));
    }
  };
  const handleBackspace = () => {
    setResult(result.slice(0, -1));
  };

  const calculate = () => {
    try {
      const newResult = eval(result).toString();
      setResult(newResult);
      setHistory((prevHistory) => [...prevHistory, result + "=" + newResult]);
    } catch (error) {
      setResult("Erro");
    }
  };

  const reset = () => {
    setResult("");
    setHistory([]);
  };
  return (
    <>
      <div
        className="flex flex-col items-center justify-center h-screen p-20 rounded-lg shadow bg-gradient-to-b from-blue-200 to-blue-300 
      md:flex md:justify-center md:items-center md:flex-col md:max-w-md md:m-auto md:max-h-[95vh]  md:mt-[2.5vh]"
      >
        <div className="bg-white rounded-md p-2 mb-4 w-[250px] min-h-[50px] text-right ">
          {result}
        </div>
        <div className="mb-4 min-h-[150px] max-h-[150px] overflow-auto w-full items-center flex flex-col">
          <h3 className="mb-2">Histórico:</h3>
          <ul>
            {history.map((item, index) => (
              <li key={index}>{item}</li>
            ))}
          </ul>
        </div>
        <div className="grid grid-cols-4 gap-4">
          <button
            className="col-span-1 p-4 text-center bg-gray-200 hover:bg-gray-300"
            onClick={() => handleClick("7")}
          >
            7
          </button>
          <button
            className="col-span-1 p-4 text-center bg-gray-200 hover:bg-gray-300"
            onClick={() => handleClick("8")}
          >
            8
          </button>
          <button
            className="col-span-1 p-4 text-center bg-gray-200 hover:bg-gray-300"
            onClick={() => handleClick("9")}
          >
            9
          </button>
          <button
            className="col-span-1 p-4 text-center bg-gray-200 hover:bg-gray-300"
            onClick={() => handleClick("/")}
          >
            /
          </button>
          <button
            className="col-span-1 p-4 text-center bg-gray-200 hover:bg-gray-300"
            onClick={() => handleClick("4")}
          >
            4
          </button>
          <button
            className="col-span-1 p-4 text-center bg-gray-200 hover:bg-gray-300"
            onClick={() => handleClick("5")}
          >
            5
          </button>
          <button
            className="col-span-1 p-4 text-center bg-gray-200 hover:bg-gray-300"
            onClick={() => handleClick("6")}
          >
            6
          </button>
          <button
            className="col-span-1 p-4 text-center bg-gray-200 hover:bg-gray-300"
            onClick={() => handleClick("*")}
          >
            *
          </button>
          <button
            className="col-span-1 p-4 text-center bg-gray-200 hover:bg-gray-300"
            onClick={() => handleClick("1")}
          >
            1
          </button>
          <button
            className="col-span-1 p-4 text-center bg-gray-200 hover:bg-gray-300"
            onClick={() => handleClick("2")}
          >
            2
          </button>
          <button
            className="col-span-1 p-4 text-center bg-gray-200 hover:bg-gray-300"
            onClick={() => handleClick("3")}
          >
            3
          </button>
          <button
            className="col-span-1 p-4 text-center bg-gray-200 hover:bg-gray-300"
            onClick={() => handleClick("-")}
          >
            -
          </button>
          <button
            className="col-span-1 p-4 text-center bg-gray-200 hover:bg-gray-300"
            onClick={() => handleClick("0")}
          >
            0
          </button>
          <button
            className="col-span-1 p-4 text-center bg-gray-200 hover:bg-gray-300"
            onClick={() => handleClick(".")}
          >
            .
          </button>
          <button
            id="Enter"
            className="col-span-1 p-4 text-center bg-gray-200 hover:bg-gray-300"
            onClick={() => calculate()}
          >
            =
          </button>
          <button
            className="col-span-1 p-4 text-center bg-gray-200 hover:bg-gray-300"
            onClick={() => handleClick("+")}
          >
            +
          </button>
          <button
            id="Escape"
            className="col-span-2 p-4 text-center bg-red-200 hover:bg-red-300"
            onClick={() => reset()}
          >
            Esq
          </button>
          <button
            className="col-span-2 p-4 text-center bg-gray-200 hover:bg-gray-300"
            onClick={handleBackspace}
          >
            Delete
          </button>
        </div>
      </div>
    </>
  );
};
