import React, {useEffect, useState} from "react";
import {Box, Button, Input, Stack} from "@mui/material";
import {AxiosInstance} from "./AxiosClient";
import CustomDrawer from "./CustomDrawer";
import AddStatusForm from "./AddStatusForm";

interface Category {
    title:string;
}
export default function AddCategoryForm(){
    const [category, setCategory] = useState<Category>({title:""});
    const [categories,setCategories] =useState<any>();
    const [open, setOpen] = React.useState(false);

    const handleChange  = (e:React.ChangeEvent<HTMLInputElement>) => {
        const newData = {...category}
        newData[e.currentTarget.name as keyof Category] = e.currentTarget.value
        setCategory(newData)
    }
    function addCategory(){
        AxiosInstance.post('/category',
            category,
            )
            .then(function (response) {
                console.log(response)
            })
            .catch(function (error) {
                console.log(error);
            });
    }
    function getCategory(){
        AxiosInstance.get('/category',

        )
            .then(function (response) {
                setCategories(response.data.map((d:any)=>d.title))
            })
            .catch(function (error) {
                console.log(error);
            });
    }
    useEffect(()=>{
        getCategory();
    },[])


    return(
        <Stack direction="column" p={3} spacing={2}>
            <Input  placeholder="Category name" name="title" value={category.title} onChange={handleChange}/>
            <Button variant="contained"  onClick={()=>addCategory()} >Add Category</Button>
            {categories && categories.map((c:string)=> (
                <Stack direction="row" display="flex" alignItems="center" spacing={3}>
                    <Box>
                        {c}
                    </Box>
                   <Button onClick={()=>setOpen(true)}>Statüleri Düzenle</Button>
                </Stack>
                ))
            }
            <CustomDrawer open={open} setOpen={setOpen}  children={<AddStatusForm />}/>
        </Stack>
    )
}