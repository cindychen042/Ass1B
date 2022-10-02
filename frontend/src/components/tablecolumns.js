const tablecolumns = [
    {
      Header: 'Title',
      accessor: 'title'
    }, {
      Header: 'Authors',
      accessor: 'authors'
    }, {
      Header: 'Source',
      accessor: 'source'
    }, {
      Header: 'Pub. Year',
      accessor: 'pubyear'
    },{
      Header: 'DOI',
      accessor: 'doi'
    },,{
      Header: 'Claimed Benefit',
      accessor: 'claim'
    },{
      Header: 'Level of Evidence',
      accessor: 'evidence'
    },
    
    {
        Header:'Journal',
        accessor:'journal'
    },
    {
      Header:'Number',
      accessor:'number'
    },
    {
      Header:'Volume',
      accessor:'volume'
    },
    
    {
        Header:'status',
        accessor:'status'
    }
    ,
    {
        Header:'method',
        accessor:'method'
    }
  
  ]

//naming the headers and their accessor here

module.exports = tablecolumns
