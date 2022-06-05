import React from "react";
import { Card, CardBody, CardHeader, Col, Container, Row } from "shards-react";
import PageTitle from "../../components/common/PageTitle";


const Tables = ({ row, col,idx }) => (
  
  <Container fluid className="text-center text-uppercase main-content-container uppercase px-4">
    {/* Page Header */}
    <Row noGutters className="page-header py-4">
      <PageTitle
        sm="4"
        title={col.topic}
        subtitle={"topic "+(idx+1)}
        className="text-sm-left"
      />
    </Row>

    {/* Default Light Table */}
    <Row>
      <Col>
        <Card small className="mb-4">
          <CardHeader className="border-bottom">
            <h6 className="m-0">{col.topic}</h6>
          </CardHeader>
          <CardBody className="p-0 pb-3">
            <table className="table mb-0">
              <thead className="bg-light">
                <tr>
                  {row.map((data, idx) => {
                    return (
                      <th key={idx} scope="col" className="border-0">
                        {data}
                      </th>
                    );
                  })}
                </tr>
              </thead>
              <tbody className="text-center">
                
                  {col.chapters?col.chapters.map((data, idx) => {
                    return (
                      <tr>
                        <td key={idx} scope="col" className="border-0">
                          {idx + 1}
                        </td>
                        <td key={idx} scope="col" className="border-0">
                          {data.name}
                        </td>
                        <td key={idx} scope="col" className="border-0">
                          0
                        </td>
                        <td key={idx} scope="col" className="border-0">
                          {(new Date(data.createdAt)).toDateString()}
                        </td>
                      </tr>
                    );
                  })
                  :<div>loading...</div>}
              </tbody>
            </table>
          </CardBody>
        </Card>
      </Col>
    </Row>

    {/* Default Dark Table */}
    {/* <Row>
      <Col>
        <Card small className="mb-4 overflow-hidden">
          <CardHeader className="bg-dark">
            <h6 className="m-0 text-white">Active Users</h6>
          </CardHeader>
          <CardBody className="bg-dark p-0 pb-3">
            <table className="table table-dark mb-0">
              <thead className="thead-dark">
                <tr>
                  <th scope="col" className="border-0">
                    #
                  </th>
                  <th scope="col" className="border-0">
                    First Name
                  </th>
                  <th scope="col" className="border-0">
                    Last Name
                  </th>
                  <th scope="col" className="border-0">
                    Country
                  </th>
                  <th scope="col" className="border-0">
                    City
                  </th>
                  <th scope="col" className="border-0">
                    Phone
                  </th>
                </tr>
              </thead>
              <tbody>
                <tr>
                  <td>1</td>
                  <td>Ali</td>
                  <td>Kerry</td>
                  <td>Russian Federation</td>
                  <td>Gdańsk</td>
                  <td>107-0339</td>
                </tr>
                <tr>
                  <td>2</td>
                  <td>Clark</td>
                  <td>Angela</td>
                  <td>Estonia</td>
                  <td>Borghetto di Vara</td>
                  <td>1-660-850-1647</td>
                </tr>
                <tr>
                  <td>3</td>
                  <td>Jerry</td>
                  <td>Nathan</td>
                  <td>Cyprus</td>
                  <td>Braunau am Inn</td>
                  <td>214-4225</td>
                </tr>
                <tr>
                  <td>4</td>
                  <td>Colt</td>
                  <td>Angela</td>
                  <td>Liberia</td>
                  <td>Bad Hersfeld</td>
                  <td>1-848-473-7416</td>
                </tr>
              </tbody>
            </table>
          </CardBody>
        </Card>
      </Col>
    </Row> */}
  </Container>
);

export default Tables;
