import React, { useState } from 'react';
import { Container, Row, Col, Form, Table, Button } from 'react-bootstrap';
import InfiniteScroll from "react-infinite-scroll-component";
import {addErrorsToData} from "./utils";

function App() {
    const [data, setData] = React.useState([]);
    const [regionAndSeed, setRegionAndSeed] = React.useState({
        region: '',
        seed: 0,
    });
    const [errorCount, setErrorCount] = useState(0); // новая переменная состояния для количества ошибок
    const [page, setPage] = useState(1);

    function handleRandomSeed() {
        setRegionAndSeed(prev => ({ ...prev, seed: Math.floor(Math.random() * 100)}))
    }

    function handleRegionAndSeedChange(event) {
        const { id, value } = event.target;
        setRegionAndSeed(prevParams => ({ ...prevParams, [id]: value }));
    }

    function handleErrorCountChange(event) {
        setErrorCount(Number(event.target.value)); // обновляем количество ошибок отдельно
    }

    const generateData = async (reset = false) => {
        if (reset) {
            setData([]);
            setPage(1);
        } else {
            setPage(prevPage => prevPage + 1);
        }

        const newData = await fetch(`/api/data?region=${regionAndSeed.region}&errors=${errorCount}&seed=${regionAndSeed.seed + page}&page=${page}`)
            .then(res => res.json())
            .then(data => addErrorsToData(data, errorCount))
            .catch(err => console.error('An error occurred.', err));

        setData(prevData => [...prevData, ...newData]);
    };

    React.useEffect(() => {
        generateData(true);
    }, [regionAndSeed]);

    return (
        <Container>
            <Row>
                <Col>
                    <h1>Fake data generator</h1>
                    <Form style={{display: 'grid', gap: '20px'}}>
                        <Form.Group>
                            <Form.Label>Region</Form.Label>
                            <Form.Control id="region" as="select" onChange={handleRegionAndSeedChange}>
                                <option value="">Choose region...</option>
                                <option value="en">USA</option>
                                <option value="fr">France</option>
                                <option value="pl">Poland</option>
                            </Form.Control>
                        </Form.Group>
                        <Form.Group>
                            <Form.Label>Number of errors per entry</Form.Label>
                            <Form.Control
                                type="number"
                                min="0"
                                max="1000"
                                value={errorCount}
                                onChange={handleErrorCountChange}
                            />
                            <Form.Range
                                min="0"
                                max="10"
                                value={errorCount <= 10 ? errorCount : 10}
                                onChange={handleErrorCountChange}
                            />
                        </Form.Group>
                        <Form.Group>
                            <Form.Label>Seed</Form.Label>
                            <Form.Control
                                id="seed"
                                type="number"
                                value={regionAndSeed.seed}
                                onChange={handleRegionAndSeedChange}
                            />
                            <Button variant="secondary" onClick={handleRandomSeed} style={{marginTop: "20px"}}>Random</Button>
                        </Form.Group>
                    </Form>
                    <InfiniteScroll
                        dataLength={data.length}
                        next={() => generateData(false)}
                        hasMore={true}
                        loader={<h4>Loading...</h4>}
                        endMessage={
                            <p style={{textAlign: 'center'}}>
                                <b>Yay! You have seen it all</b>
                            </p>
                        }
                        refreshFunction={() => generateData(true)}
                        pullDownToRefresh
                        pullDownToRefreshThreshold={50}
                        pullDownToRefreshContent={
                            <h3 style={{textAlign: 'center'}}>&#8595; Pull down to refresh</h3>
                        }
                        releaseToRefreshContent={
                            <h3 style={{textAlign: 'center'}}>&#8593; Release to refresh</h3>
                        }
                    >
                        <Table striped bordered hover style={{marginTop: '40px'}}>
                            <thead>
                            <tr>
                                <th>#</th>
                                <th>Идентификатор</th>
                                <th>ФИО</th>
                                <th>Адрес</th>
                                <th>Телефон</th>
                            </tr>
                            </thead>
                            <tbody>
                            {data.map((item, index) => (
                                <tr key={item.id}>
                                    <td>{index + 1}</td>
                                    <td>{item.id}</td>
                                    <td>{item.name}</td>
                                    <td>{item.address}</td>
                                    <td>{item.phone}</td>
                                </tr>
                            ))}
                            </tbody>
                        </Table>
                    </InfiniteScroll>
                </Col>
            </Row>
        </Container>
    );

}

export default App;