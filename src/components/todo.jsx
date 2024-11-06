import "./todo.css"
import { useEffect, useState } from "react";
import axios from "axios";

function Todo_list() {
  let [data, setdata] = useState([])

  // write the fetch method 
    function axios_call(){
      axios.get("http://localhost:3000/posts",{
        Headers:{
            "content-type":"application/json"
        }
      }).then((res)=>{
          setdata(res.data)
      })
    }
//  here the feacting the data from the db.json url by usig the axios 
  useEffect(()=>{
    axios_call()
  },[])


let sub_form=(e)=>{
    e.preventDefault()
    var p={
        "title":e.target[0].value
    }
    console.log( "title:",e.target[0].value)

    axios.post("http://localhost:3000/posts",p,{
        Headers:{
            "content-type":"application/json"
        }
      }).then((res)=>{
        axios_call()
      })
}
// deleting the iteam frrm the db.json
var del_item=(val,ind)=>{
  axios.delete("http://localhost:3000/posts/"+val.id).then((res)=>{
    axios_call()
  })
}
// Edit the item 
var  edi_item=(val,ind)=>{
  var e_value={
    title:prompt("Enter the edit value") 
  }

  axios.patch("http://localhost:3000/posts/"+val.id,e_value,{
    headers:{
      "content-type":"application/json"
    }
  }).then((res)=>{
    axios_call()
  })
}
//   displying the data from ui using the map 
let data_display=data.map((val,ind)=>{


  return(
      <div key={ind} >
          <li>{val.title} <button className="" onClick={()=>{
            del_item(val,ind)
          }}>Delet</button><button onClick={()=>{
            edi_item(val,ind)
          }}>Edit</button></li>
      </div>
      
  )
})


let btn_sub=(e)=>{
    e.target.value
}
  return (
    <>
    {/* {console.log(data_display)}
    {console.log(data)} */}
      <h1>TODO with axios</h1>
      <form action="" onSubmit={sub_form}>
        <input type="text" name="" id="" />
        <input type="submit" name="" id="" value="Add" onClick={btn_sub}/>
      </form>
      <ul>{data_display}</ul>
    </>
  );
}
export default Todo_list;
