import React, { useState, useEffect } from 'react'
import {
    Container,
    Segment,
} from "semantic-ui-react";
import { authAxios } from "../utils";
import { ExcelAPI } from "../constants";

function Data() {

    const [loading, setLoading] = useState(false)
    const [data, setData] = useState({})

    const authenticated = localStorage.getItem("token") !== null;


    useEffect(() => {
        setLoading(true);
        setData({});
        authAxios
            .get(ExcelAPI)
            .then(res => {
                setData(res.data);
                setLoading(false);
            })
            .catch(err => {
                console.log(err.response)
            });
    }, [])


    return (
        <Container style={{ padding: "1em" }} >
            {!authenticated ? (<div class="ui placeholder segment"
            style={{
                        marginTop: '10%',
                        height: '50vh',
                    }}
            >
                <div class="ui icon header">
                    <i class="unlock alternate icon"></i>
                    Please log in first
                </div>
                <div class="inline">
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
                                Test
                            </Segment>
                            <Segment vertical>
                                Dwa
                            </Segment>
                            <Segment vertical>
                                {data && Object.keys(data)[1]}
                            </Segment>
                        </Segment>
                )
            }


        </Container>

    )
}

export default Data
