import React, { useState, useEffect } from 'react'
import {
    Container,
    Segment,
} from "semantic-ui-react";
import { authAxios } from "../utils";
import { ForecastAPI } from "../constants";

function Data() {

    const [loading, setLoading] = useState(false)
    const [data, setData] = useState({})

    const authenticated = localStorage.getItem("token") !== null;


    useEffect(() => {
        setLoading(true);
        setData({});
        authAxios
            .get(ForecastAPI)
            .then(res => {
                setData(res.data.Inflows);
                setLoading(false);

                console.log(res.data.Inflows)
                console.log(typeof (res.data))

            })
            .catch(err => {
                console.log(err.response)
            });
    }, [])


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
                                {data && Object.values(data).map((x, key) => (<p > ... {x} ... {key}</p>))}
                                {Object.values(data)[3]} to tu
                            </Segment>
                        </Segment>
                )
            }


        </Container>

    )
}

export default Data
