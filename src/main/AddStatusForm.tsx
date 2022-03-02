import React, {useEffect, useState} from "react";
import {AxiosInstance} from "./AxiosClient";
import {Box, Button, Input, Stack} from "@mui/material";

interface Status {
    title: string;
    categoryId: string;
    color: string;
}

interface Props {
    category?: any;
}

export default function AddStatusForm({category}: Props) {
    const [status, setStatus] = useState<Status>({title: "", categoryId: category.id, color: ""});
    const [statusTitles, setStatusTitles] = useState<any>();
    const categoryId = category.id;

    const handleChange = (e: React.ChangeEvent<HTMLInputElement>) => {
        const newData = {...status}
        newData[e.currentTarget.name as keyof Status] = e.currentTarget.value
        setStatus(newData)
    }

    function addStatus() {
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

    function getStatusList() {
        AxiosInstance.get('/status',
            { params: { categoryId: categoryId } })
            .then(function (response) {
                console.log("response", response)
                setStatusTitles(response.data)

            })
            .catch(function (error) {
                console.log(error);
            });
    }

    useEffect(() => {
        category && getStatusList();
    }, [])

    return (
        <Stack direction="column" p={3} spacing={2}>
            <Input placeholder="Status name" name="title" value={status.title} onChange={handleChange}/>
            <Input placeholder="Status color" name="color" value={status.color} onChange={handleChange}/>
            <Button variant="contained" onClick={() => addStatus()}>Add Category</Button>
            {statusTitles && statusTitles((s: any) => (
                <Stack direction="row" display="flex" alignItems="center" spacing={3}>
                    <Box>
                        {s.title}
                    </Box>
                    <Button>Sil</Button>
                    <Button>Düzenle</Button>
                </Stack>
            ))
            }
        </Stack>
    )
}