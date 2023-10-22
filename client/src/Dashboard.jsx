import React, { useEffect, useState } from "react";
import instance from "./axios";
import Toaster, { toast } from "./Toaster";
import { useNavigate } from "react-router-dom";
import Cookies from "js-cookie";

function Dashboard() {
  const [tasks, setTasks] = useState([]);
  const [text, setText] = useState("");
  const navigate = useNavigate()

  useEffect(() => {
    instance
      .get("/tasks")
      .then((res) => {
        if (res.data) {
          setTasks(res.data);
        }
        console.log(res.data);
      })
      .catch(() => {
        toast.showToast("something went wrong", "red");
        navigate("/",{replace:true})
      });
  }, []);

  const addText = () => {
    instance
      .post("/addTask", { text })
      .catch(() => {})
      .then(() => {
        instance
          .get("/tasks")
          .then((res) => {
            if (res.data) {
              setTasks(res.data);
            }
            console.log(res.data);
          })
          .catch(() => {
            toast.showToast("something went wrong", "red");
          });
      });
      setText("")
  };
  return (
    <div className="w-screen min-h-screen bg-gray-900">
        <button className="bg-red-600 hover:bg-red-700 rounded p-2 absolute top-3 left-3 text-white" onClick={()=>{
            Cookies.remove("token")
            navigate("/",{replace:true})
        }}>Log out</button>
      <Toaster />
      <div className="h-100 w-full flex items-center justify-center bg-teal-lightest font-sans">
        <div className="bg-white rounded shadow p-6 m-4 w-full lg:w-3/4 lg:max-w-lg">
          <div className="mb-4">
            <h1 className="text-grey-darkest">Task List</h1>
            <div className="flex mt-4">
              <input
                className="shadow  border rounded w-full py-2 px-3 mr-4 text-grey-darker"
                placeholder="Add Task"
                value={text}
                onChange={(e) => {
                  setText(e.target.value);
                }}
              />
              <button
                className="flex-no-shrink p-2 border-2 rounded text-teal border-teal hover:text-white hover:bg-teal"
                onClick={addText}
              >
                Add
              </button>
            </div>
          </div>
          <div>
            {tasks?.map((x) => (
              <div className="flex mb-4 items-center">
                <p
                  className={
                    x?.done
                      ? "w-full text-grey-darkest line-through"
                      : "w-full text-grey-darkest"
                  }
                >
                  {x?.text}
                </p>
                <button
                  onClick={() => {
                    instance
                      .patch("/updateTask/" + x?._id, { done: !x?.done })
                      .then(() => {
                        instance
                          .get("/tasks")
                          .then((res) => {
                            if (res.data) {
                              setTasks(res.data);
                            }
                            console.log(res.data);
                          })
                          .catch(() => {
                            toast.showToast("something went wrong", "red");
                          });
                      });
                  }}
                  className=" p-2 ml-4 w-28 mr-2 border-2 rounded hover:text-white text-green border-green hover:bg-blue-600"
                >
                  {!x?.done ? "Done" : "Not Done"}
                </button>
                <button onClick={()=>{
                    instance.delete("/remove/"+x?._id).then(()=>{
                        instance.get("/tasks").then((res)=>{
                            if(res.data){
                                setTasks(res.data)
                            }
                            console.log(res.data)
                        }).catch(()=>{
                            toast.showToast("something went wrong","red")
                        })
                    });
                }} className="flex-no-shrink p-2 ml-2 border-2 rounded text-red border-red hover:text-white w-28 hover:bg-red-600">
                  Remove
                </button>
              </div>
            ))}
          </div>
        </div>
      </div>
    </div>
  );
}

export default Dashboard;
