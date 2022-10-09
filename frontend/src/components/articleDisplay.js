import axios from 'axios';
import {useState,useEffect} from 'react';
import { useTable, useSortBy, usePagination } from 'react-table';
import tablecolumns from "../components/tablecolumns.js";
import Styles from './tablestyles.js';
import MainPage from './mainpage.js';
import { API_ENDPOINT } from '../api/index';

const Table = ({columns, data}) => {
 


const {
    getTableProps,
    getTableBodyProps,
    headerGroups,
    prepareRow,
    
    page, // Instead of using 'rows', we'll use page,
    canPreviousPage,
    canNextPage,
    pageOptions,
    pageCount,
    gotoPage,
    nextPage,
    previousPage,
    setPageSize,
    state: { pageIndex, pageSize },
  } = useTable(
    {
      columns,
      data,
      initialState: { pageIndex: 0 },
    },
    
    useSortBy,
    usePagination
  )
  
    return (
        <>
        
          <table {...getTableProps()}>
            <thead>
              {headerGroups.map(headerGroup => (
                <tr {...headerGroup.getHeaderGroupProps()}>
                  {headerGroup.headers.map(column => (
                    <th {...column.getHeaderProps(column.getSortByToggleProps())}>
                      {column.render('Header')}
                      {/* Add a sort direction indicator */}
                      <span>
                        {column.isSorted
                          ? column.isSortedDesc
                            ? ' ￿'
                            : ' ￿'
                          : ''}
                      </span>
                    </th>
                  ))}
                </tr>
              ))}
            </thead>
            <tbody {...getTableBodyProps()}>
              {page.map((row, i) => {
                prepareRow(row)
                return (
                  <tr {...row.getRowProps()}>
                    {row.cells.map(cell => {
                      return <td {...cell.getCellProps()}>{cell.render('Cell')}</td>
                    })}
                  </tr>
                )
              })}
            </tbody>
          </table>  
         {/* Pagination */}
         <div className="pagination">
            <button onClick={() => gotoPage(0)} disabled={!canPreviousPage}>
              {'<<'}
            </button>{' '}
            <button onClick={() => previousPage()} disabled={!canPreviousPage}>
              {'<'}
            </button>{' '}
            <button onClick={() => nextPage()} disabled={!canNextPage}>
              {'>'}
            </button>{' '}
            <button onClick={() => gotoPage(pageCount - 1)} disabled={!canNextPage}>
              {'>>'}
            </button>{' '}
            <span>
              Page{' '}{' '}
            </span>
            <span>
              | Go to page:{' '}
              <input
                type="number"
                defaultValue={pageIndex + 1}
                onChange={e => {
                  const page = e.target.value ? Number(e.target.value) - 1 : 0
                  gotoPage(page)
                }}
                style={{ width: '100px' }}
              />
            </span>{' '}
            <select
              value={pageSize}
              onChange={e => {
                setPageSize(Number(e.target.value))
              }}
            >
              {[3, 7, 15].map(pageSize => (
                <option key={pageSize} value={pageSize}>
                  Show {pageSize}
                </option>
              ))}
            </select>
          </div>
        </>
      )
    };


      

    
function DisplayArticles(){
    let [articlesList,setArticlesList] = useState([])
    let [selection,setSelection] = useState({data:'',value:''}); //creating a selection state, to control user selection
    useEffect(()=>{
        axios.get(`${API_ENDPOINT}/`).then((res)=>{
          console.log(API_ENDPOINT)
            if(selection.value===''){
              console.log(res.data)
                setArticlesList(
                    res.data
            ) 
            }
            //if there is no selection (default) , all data will be displayed
            else{
            let data = res.data.filter((data)=>data.method===selection.value)
            setArticlesList(
                    data
            )
            }
            //otherwise, filter data based on selection.

        })
    },[selection.value]) //adding selection.value as a variable for the dependency array, so that useEffect
    //is invoked everytime a user select an option.

    const onSelectionChange = (e)=>{
        setSelection(
            {
                ...selection,
                value:e.target.value
            }
        )
        console.log("test")

    }
    // The basic idea here is to create a state array to store all information coming from the database. useEffect()
    // will render only once after the page is fully rendered.

    return(
        <div className='main-page'>
            <Styles>
                <MainPage></MainPage>
                
                <select  className='dropdown' onChange={(e)=>{onSelectionChange(e)}}>
                    <option  value=''>Select an option...</option>
                    <option value='TDD'>TDD</option>
                    <option value='Mob Programming'>Mob Programming</option>
                </select>
                {articlesList.length?<div>"No Data is shown"</div>:
                <Table
            data={articlesList}
            columns={tablecolumns}
            />
    }
            </Styles>
            </div>
            )
    }
    
export default DisplayArticles;