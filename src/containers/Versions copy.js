import React, { useState, useEffect } from 'react'
import {
    Container,
    Segment,
} from "semantic-ui-react";
import { authAxios } from "../utils";
import { VersionsAPI } from "../constants";

function Versions() {

    const [loading, setLoading] = useState(false)
    const [data, setData] = useState([7, 11, 22, 33, 44, 55, 66, 77, 77, 88, 99])
    const [columns, setColumns] = useState(['jeden', 'dwa', 'trzy'])
    const [dates, setDate] = useState(['one', 'two', 'three'])

    const authenticated = localStorage.getItem("token") !== null;
    useEffect(() => {

        setLoading(true);
        authAxios.get(VersionsAPI)
            .then(res => {
                setLoading(false);
                // console.log(Object.entries(res.data)[1][1])
                console.log(Object.entries(res.data)[0][1])
                console.log(Object.values(res.data)[0])
                setColumns(Object.entries(res.data)[1][1])
                setDate(Object.entries(res.data)[2][1])
                setData(Object.entries(res.data)[0][1])
            })            .catch(err => {
                console.log(err.response)
            })}, [])
    return (
        <Container style={{ padding: "1em" }} >
            {!authenticated ? (<div className="ui placeholder segment"
                style={{
                    marginTop: '10%',
                    height: '50vh',
                }}
            >
                <div className="ui icon header">
                    <i className="unlock alternate icon"></i>
                    Please log in first
                </div>
                <div className="inline">
                </div>
            </div>) :
                (
                    loading ? <div className="ui segment" style={{
                        marginTop: '10%',
                        height: '50vh',
                        background: 'rgba(0,0,0,.35)',
                        fontSize: '25px'
                    }}>
                        <div className="ui active inverted dimmer">
                            <div className="ui text loader">Loading</div>
                        </div>
                    </div> :
                        <Segment>
                            <Segment vertical>
                                <table className="ui selectable  table">
                                    <thead>
                                        <th>{"Term"}</th> {columns.map((column, index) => <th key={index}>{column}</th>)}
                                    </thead>

                                    <tbody>

                                        {/* {
                                        data.map((obj, index) => {
                                            return (
                                                <td key={index}>
                                                    <td>{obj}</td>
                                                </td>
                                            );
                                        })
                                        } */}
                                        {data && dates.map((d, index) =>
                                            <tr key={index}>{d}
                                                {Object.entries(data).map((x, index) => (<td key={index}>{x.Current}</td>))}
                                            </tr>)}
                                            {
                                                <ul>
                                                    {/* {data & columns & dates ?? Object.entries(data)['Current']['2021 December']} */}
                                                    {/* {data && columns && dates ?
                                                    dates.map((d) => <tr>{d} {data.map((c) => <th>{c['Current'][d]}</th>)}</tr>)
                                                    dates.map((d) => <tr>{d} {data.map((c, index) => <th>{c}</th>)}</tr>) : 'fff'
                                                    } */}
                                                </ul>
                                            }

                                    </tbody>
                                </table>
                            </Segment>
                        </Segment>
                )
            }


        </Container>

    )
}

export default Versions
