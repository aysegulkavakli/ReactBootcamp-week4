import React, {useState} from "react";
import {Button, Input, Stack, Typography} from "@mui/material";
import axios from "axios";

interface Category {
    title:string;
}
export default function AddCategoryForm(){
    const [category, setCategory] = useState<Category>({title:""});

    const handleChange  = (e:React.ChangeEvent<HTMLInputElement>) => {
        const newData = {...category}
        newData[e.currentTarget.name as keyof Category] = e.currentTarget.value
        setCategory(newData)
    }
    function addCategory(){
        axios.post('http://localhost:80/category',
            category
            )
            .then(function (response) {
               console.log(response.data)
            })
            .catch(function (error) {
                console.log(error);
            });

    }

    return(
        <Stack direction="column" p={3} spacing={2}>
            <Input  placeholder="Category name"/>
            <Button variant="contained" type="submit" >Add Category</Button>
            <Typography>
                Eklenmiş Kategoriler
            </Typography>
        </Stack>
    )
}