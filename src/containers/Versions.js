import React, { useEffect, useMemo, useState } from 'react'
import { useTable } from 'react-table'
import { authAxios } from "../utils";
import { VersionsAPI } from "../constants";

function Versions() {
    const [dat, setDat] = useState([1, 2, 3, 4, 5, 6, 7, 8, 9, 0, 0, 0, 0, 0, 0, 0])
    const [col, setTop] = useState(['jeden', 'dwa', 'trzy'])
    const [dates, setDate] = useState(['one', 'two', 'three'])

    const [test, setTest] = useState([1, 2, 3, 4, 5, 6, 7, 8, 9, 0, 0, 0, 0, 0, 0, 0])

    useEffect(() => {

        authAxios.get(VersionsAPI)
            .then(res => {
                setTop(Object.entries(res.data)[1][1])
                setDate(Object.entries(res.data)[2][1])
                setDat(Object.entries(res.data)[0][1])
                setTest(Object.entries(res.data)[0][1])

            }).catch(err => {
                console.log(err.response)
            })

    }, [])

    const createRow = (row) => {
        const obj = {
            col1: Object.values(dat)[0][row],
                col1: Object.values(dat)[1][row],
                col2: Object.values(dat)[2][row],
                col3: Object.values(dat)[3][row],
                col4: Object.values(dat)[4][row],
                col5: Object.values(dat)[5][row],
                col6: Object.values(dat)[6][row],
                col7: Object.values(dat)[7][row],
                col8: Object.values(dat)[8][row],
                col9: Object.values(dat)[9][row],
                col10: Object.values(dat)[10][row],
        }
        return obj
    }
    
    console.log(createRow("2021 June"), 'Object')
    console.log('xxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxx')
    // console.log(col.map((x, i) => createRow(x, i)))
    // console.log(col.map((x, index) => createRow(index)))
    const xx = col.map((x, index) => createRow(index))
    console.log('---------------------------------------')

    const data = useMemo(
        () => dates.map((date => createRow(date))),
        [test]
    )
    /* let createDic = () => {
        
        for (let i = 0; i = col.length; i++) {
            console.log(colt)
          }
    }

    createDic() */

    const createColumns = (columns, ind) => {
        return {
            Header: columns,
            accessor: `col${ind + 1}`
        }
    }
    // console.log (col.map((x, i) => createColumns(x, i)))

    const columns = useMemo(
        () => col.map((x, i) => createColumns(x, i))
        ,
        [col]
    )

    /* const columns = useMemo(
        () => [
            {
                Header: col[0],
                accessor: 'col1', // accessor is the "key" in the data
            },
            {
                Header: col[1],
                accessor: 'col2',
            },
            {
                Header: col[2],
                accessor: 'col3',
            },
        ],
        [col]
    ) */

    const {
        getTableProps,
        getTableBodyProps,
        headerGroups,
        rows,
        prepareRow,
    } = useTable({ columns, data })

    return (
        <table {...getTableProps()} style={{ border: 'solid 1px blue' }}>
            <thead>
                {headerGroups.map(headerGroup => (
                    <tr {...headerGroup.getHeaderGroupProps()}>
                        {headerGroup.headers.map(column => (
                            <th
                                {...column.getHeaderProps()}
                                style={{
                                    borderBottom: 'solid 3px red',
                                    background: 'aliceblue',
                                    color: 'black',
                                    fontWeight: 'bold',
                                }}
                            >
                                {column.render('Header')}
                            </th>
                        ))}
                    </tr>
                ))}
            </thead>
            <tbody {...getTableBodyProps()}>
                {rows.map(row => {
                    prepareRow(row)
                    return (
                        <tr {...row.getRowProps()}>
                            {row.cells.map(cell => {
                                return (
                                    <td
                                        {...cell.getCellProps()}
                                        style={{
                                            padding: '10px',
                                            border: 'solid 1px gray',
                                            background: 'papayawhip',
                                        }}
                                    >
                                        {cell.render('Cell')}
                                    </td>
                                )
                            })}
                        </tr>
                    )
                })}
            </tbody>
        </table>
    )
}

export default Versions