import React, { useEffect, useState } from "react";
import instance from "./axios";
import Toaster, { toast } from "./Toaster";
import Cookies from "js-cookie";
import { useNavigate } from "react-router-dom";

function AdminDashBoard() {
  const [tasks, setTasks] = useState([]);
  const [text, setText] = useState([]);
  const [users, setUsers] = useState();
  const [userId,setUserId] = useState("")
  const navigate = useNavigate()
  useEffect(() => {
    instance
      .get("/getUsers")
      .then((res) => {
        setUsers(res.data);
      })
      .catch(() => {toast.showToast("something went wrong","red")});
  }, []);
  const addText = () => {

    instance.post("/addAdminTask",{_id:userId,text}).then(()=>{
        instance.get("/getTasks",{params:{_id:userId}}).then((res)=>{
            if(res.data){
                setTasks(res.data)
            }
            console.log(res.data)
        }).catch(()=>{
            toast.showToast("something went wrong","red")
        })
    }).catch(()=>{
        toast.showToast("select user","red")
    })
  };
  return (
    <div className="flex flex-wrap justify-between min-h-screen bg-gray-800 p-5">
        <button className="bg-red-600 hover:bg-red-700 rounded p-2 absolute top-3 right-3 text-white" onClick={()=>{
            Cookies.remove("token")
            navigate("/",{replace:true})
        }}>Log out</button>
        <Toaster/>
      <div className="relative overflow-x-auto border">
        <table className="w-full md:w-1/2 text-sm text-left text-gray-500 dark:text-gray-400">
          <thead className="text-xs text-gray-700 uppercase bg-gray-50 dark:bg-gray-700 dark:text-gray-400">
            <tr>
              <th scope="col" className="px-6 py-3">
                No
              </th>
              <th scope="col" className="px-6 py-3">
                Username
              </th>
            </tr>
          </thead>
          <tbody>
            {users?.map((x, i) => (
              <tr className="hover:bg-gray-900 cursor-pointer border-b bg-gray-800 border-gray-700" onClick={()=>{
                instance.get("/getTasks",{params:{_id:x?._id}}).then((res)=>{
                    console.log(res.data)
                    setTasks(res.data)
                    setUserId(x?._id)
                })
              }}>
                <th
                  scope="row"
                  className="px-6 py-4 font-medium text-gray-900 whitespace-nowrap dark:text-white"
                >
                  {i}
                </th>
                <td className="px-6 py-4">{x?.username}</td>
              </tr>
            ))}
          </tbody>
        </table>
      </div>
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
              <button onClick={()=>{
                instance.patch("/updateTaskAdmin/"+x?._id,{_id:userId,done:!x?.done}).then(()=>{
                    instance.get("/getTasks",{params:{_id:userId}}).then((res)=>{
                        if(res.data){
                            setTasks(res.data)
                        }
                        console.log(res.data)
                    }).catch(()=>{
                        toast.showToast("something went wrong","red")
                    })
                }).catch(()=>{
                    toast.showToast("something went wrong","red")
                })
              }} className=" p-2 ml-4 w-28 mr-2 border-2 rounded hover:text-white text-green border-green hover:bg-blue-600">
                {!x?.done ? "Done" : "Not Done"}
              </button>
              <button onClick={()=>{
                    instance.delete("/removeAdmin/"+x?._id,{params:{_id:userId}}).then(()=>{
                        instance.get("/getTasks",{params:{_id:userId}}).then((res)=>{
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
  );
}

export default AdminDashBoard;
