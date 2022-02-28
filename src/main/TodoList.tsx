import React from "react";
import {Button, FormControl, InputLabel, MenuItem, Select, SelectChangeEvent, Stack, TextField} from "@mui/material";
import CustomDrawer from "./CustomDrawer";
import AddCategoryForm from "./AddCategoryForm";

export default  function TodoList(){
    const [category, setCategory] = React.useState('');
    const [status, setStatus] = React.useState('');
    const [open, setOpen] = React.useState(false);

    const handleChangeCategory = (event: SelectChangeEvent) => {
        setCategory(event.target.value as string);
    };
    const handleChangeStatus = (event: SelectChangeEvent) => {
        setStatus(event.target.value as string);
    };
    return(
        <Stack direction="column">
            <div>Filter will come</div>
            <Stack direction="row" spacing={2}>
                <TextField label="Description"/>

                <FormControl sx={{  minWidth: 120 }}>
                    <InputLabel id="demo-simple-select-helper-label">Category</InputLabel>
                <Select
                    labelId="demo-simple-select-label"
                    id="demo-simple-select"
                    value={category}
                    label="Category"
                    onChange={handleChangeCategory}
                >
                    <MenuItem value={10}>category1</MenuItem>
                    <MenuItem value={20}>category2</MenuItem>
                    <MenuItem value={30}>category3</MenuItem>
                </Select>
            </FormControl>
                <FormControl sx={{  minWidth: 120 }}>
                    <InputLabel id="demo-simple-select-helper-label">Status</InputLabel>
                <Select
                    labelId="demo-simple-select-label"
                    id="demo-simple-select"
                    value={status}
                    label="Status"
                    onChange={handleChangeStatus}
                >
                    <MenuItem value={10}>status1</MenuItem>
                    <MenuItem value={20}>status2</MenuItem>
                    <MenuItem value={30}>status3</MenuItem>
                </Select>
                </FormControl>
                <Button variant="contained">
                    Ekle
                </Button>
            </Stack>
            <Stack direction="row" display="flex" justifyContent="flex-start" mt={2}>
                <Button variant="contained" sx={{minWidth:100}} onClick={()=>setOpen(true)}>Kategorileri Düzenle</Button>
            </Stack>
            <CustomDrawer open={open} setOpen={setOpen}  children={<AddCategoryForm />}/>
        </Stack>
    )
}