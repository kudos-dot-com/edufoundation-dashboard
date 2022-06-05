import React,{useState,useEffect} from 'react'
import  api from "../data/apiLink"
import network from "../network/axios";
import Tables from '../components/subjectDashboard/table';

export default function viewChapters() {
    const row = ['id','name','no of questions','created at']
    const [col,setcol] = useState([{}]);
    useEffect(async()=>{
        const subject =  window.location.pathname.split('/')[2]
      console.log(subject)
      const url = api.get.getChaptersTopic+subject.toLowerCase()+"/"
      console.log(url)
      const chapters = await network.getUrl(url);
      console.log(chapters)

      if(chapters){
        console.log(chapters.result)
        setcol(chapters.result);
      console.log(col)
      }

    },[])
    return (
    <div>
        {col?
        col.map((data,idx)=>
        {
        return (<Tables row={row} col={data} idx={idx} key={idx} />)
        }):
        <div>Loading...</div>

    }
    </div>
  )
}
