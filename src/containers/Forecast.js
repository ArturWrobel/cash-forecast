import React, { useState, useEffect } from 'react'
import {
    Container,
    Segment,
} from "semantic-ui-react";
import { useHistory } from "react-router-dom";
import { authAxios } from "../utils";
import { ForecastAPI, PermissionsAPI } from "../constants";
// import PermissionsContext from '../context/PermissionsContext';
import Swal from 'sweetalert2'

function Data() {

    const [loading, setLoading] = useState(false)
    const [data, setData] = useState({})
    const [permission, setPermission] = useState('INPUT')
    let history = useHistory();

    const authenticated = localStorage.getItem("token") !== null;
    /* const inputOnly = useContext(PermissionsContext)
    console.log(typeof(inputOnly))
    console.log(Object.entries(inputOnly)[0][1]) */

    useEffect(() => {
        authAxios
            .get(PermissionsAPI)
            .then(res => {
                setPermission(res.data.permissions)
                if (res.data.permissions === 'INPUT') {
                    Swal.fire({
                        title: 'Insufficient permissions',
                        text: 'to run this analysis',
                        icon: 'error',
                        confirmButtonText: 'Understood'
                    }).then(function () {
                        history.push("/")
                    })
                }
            })
            .catch(err => {
                console.log(err.response)
            });

        if (permission === "ANALYSIS") {
            setLoading(true);
            setData({});
            authAxios
                .get(ForecastAPI)
                .then(res => {
                    setData(res.data.Inflows);
                    setLoading(false);
                })
                .catch(err => {
                    console.log(err.response)
                });
        }

    },[permission, history])


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
                                {/* {data && Object.values(data).map((x, key) => (<p > ... {x} ... {key}</p>))}
                                {Object.values(data)[3]} to tu */}
                                {!data ?? 'data test'}
                                {permission === 'INPUT' ? 'Input' : "Diff"}
                            </Segment>
                        </Segment>
                )
            }


        </Container>

    )
}

export default Data
