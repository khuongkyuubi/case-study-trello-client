import * as React from 'react';
import TextField from '@mui/material/TextField';
import Stack from '@mui/material/Stack';
import Autocomplete from '@mui/material/Autocomplete';
import {useEffect, useState} from "react";
import {useSelector} from "react-redux";

export default function SearchInput({listMember, setListSearch}) {
  const [search, setSearch] = useState('')
    useEffect(()=>{
        setListSearch(listMember.filter(mem => mem.email.includes(search)))
    },[search])

  return (
    <Stack spacing={2} sx={{ width: 280,display:'flex',justifyContent:'center',alignItems: 'center'}}>


          <TextField

            label="Search input"
            onChange={(e)=>
            {
                setSearch(e.target.value);
            }}
          />


    </Stack>
  );
}

// Top 100 films as rated by IMDb users. http://www.imdb.com/chart/top

