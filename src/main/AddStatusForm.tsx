import React, {useEffect, useState} from "react";
import {AxiosInstance} from "./AxiosClient";
import {Box, Button, Input, Stack} from "@mui/material";

interface Status {
    title:string;
    categoryId:string;
    color:string;
}

interface Props{
    category?:{title:string, id:string}
}
export default function AddStatusForm({category}:Props){
    const [status, setStatus] = useState<Status>({title:"", categoryId:"",color:""});
    const [statusTitles,setStatusTitles] =useState<any>();

    const handleChange  = (e:React.ChangeEvent<HTMLInputElement>) => {
        const newData = {...status}
        newData[e.currentTarget.name as keyof Status] = e.currentTarget.value
        setStatus(newData)
    }
    function addStatus(){
        AxiosInstance.post('/status',
            status,
        )
            .then(function (response) {
                console.log(response)
            })
            .catch(function (error) {
                console.log(error);
            });
    }
    function getStatus(){
        AxiosInstance.get('/status',

        )
            .then(function (response) {
                setStatusTitles(response.data.map((d:any)=>d.title))
            })
            .catch(function (error) {
                console.log(error);
            });
    }
    useEffect(()=>{
        getStatus();
    },[])

    return(
        <Stack direction="column" p={3} spacing={2}>
            <Input  placeholder="Status name" name="title" value={status.title} onChange={handleChange}/>
            <Input  placeholder="Status color" name="color" value={status.color} onChange={handleChange}/>
            <Button variant="contained"  onClick={()=>addStatus()} >Add Category</Button>
            {statusTitles && statusTitles((s:string)=> (
                <Stack direction="row" display="flex" alignItems="center" spacing={3}>
                    <Box >
                        {s}
                    </Box>
                    <Button>Sil</Button>
                    <Button> Düzenle</Button>
                </Stack>
            ))
            }
        </Stack>
    )
}