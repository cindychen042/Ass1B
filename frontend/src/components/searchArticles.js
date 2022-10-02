import React, { useEffect, useState } from 'react';
import { DataGrid } from '@mui/x-data-grid';
import MainPage from "./mainpage";

 
function SearchArticles(){
    const[articles, setArticles] = useState([]);

    useEffect(()=> {
        fetch('http://localhost:8082/')
        .then((response) => response.json())
        .then((json)=> setArticles(json))
    }, []);
    
    //console.log(articles);

    const columns = [
    { field: '_id', headerName: 'ID', width: 150 },
    { field: 'title', headerName: 'Title', width: 350},
    { field: 'authors', headerName: 'Author Name', width: 200 },
    { field: 'source', headerName: 'Source', width: 150 },
    {
      field: 'pubyear',
      headerName: 'Publish Year',
      type: 'number',
      width: 150,
    },
    { field: 'doi', headerName: 'DOI', width: 200 },
    { field: 'claim', headerName: 'Claim', width: 200 },
    { field: 'evidence', headerName: 'Evidence', width: 200 },
    
    ];
    //articles
    const rows = [
    { id: 1,
      title: "An experimental evaluation of test driven development vs. test-last development with industry professionals",
      authors: "Munir, H., Wnuk, K., Petersen, K., Moayyed, M.",
      source: "EASE",
      pubyear: "2014",
      doi: "https://doi.org/10.1145/2601248.2601267",
      claim_evidence: [["code improvement", "strong support"], ["product improvement", "weak against"],
      ["team improvement", "none"]],
    },
    {
      id: 2,
      title: "Realizing quality improvement through test driven development: results and experiences of four industrial teams",
      authors: "Nagappan, N., Maximilien, E. M., Bhat, T., Williams, L.",
      source: " Empirical Software Engineering, 13(3), 289–302",
      pubyear: "2008",
      doi: "https://doi.org/10.1007/s10664-008-9062-z",
      claim_evidence: [["code improvement", "weak support"], ["product improvement", "weak against"],
    ["team improvement", "low support"]],
    },
    {
      id: 3,
      title: "Does Test-Driven Development Really Improve Software Design Quality?",
      authors: "Janzen, D. S.",
      source: "Software, IEEE, 25(2) 77-84",
      pubyear: "2008",
      doi: "",
      claim_evidence: [["code improvement", "strong support"], ["product improvement", "weak support"],
    ["team improvement", "none"]],
    },
    {
      id: 4,
      title: "A Comparative Case Study on the Impact of Test-Driven Development on Program Design and Test Coverage",
      authors: "Siniaalto, M., Abrahamsson, P.",
      source: "ArXiv.Org, cs.SE, arXiv:1711.05082-284",
      pubyear: "2017",
      doi: "https://doi.org/10.1109/esem.2007.35",
      claim_evidence: [["code improvement", "weak support"], ["product improvement", "weak support"],
    ["team improvement", "none"]],
    },
    
    ];
    

    return (
      <div style={{height: 680, width: '100%' }}>
        <MainPage></MainPage>
        
        <DataGrid
          rows={articles}
          columns={columns}
          pageSize={10}
          rowsPerPageOptions={[3]}
          getRowId={(row) => row._id}
          checkboxSelection
        />
        
      </div>
      
    )
 }

export default SearchArticles;