import React from "react";
import { Card, CardBody, CardHeader, Col, Container, Row } from "shards-react";
import PageTitle from "../../components/common/PageTitle";

const Tables = ({ row, col, idx }) => (
  <Container
    fluid
    className="text-center text-uppercase main-content-container uppercase px-4"
    key-={idx}
  >
    {/* Page Header */}
    <Row noGutters className="page-header py-4">
      <PageTitle
        sm="4"
        title={col.topic}
        subtitle={"topic " + (idx + 1)}
        className="text-sm-left"
      />
    </Row>

    {/* Default Light Table */}
    <Row>
      <Col>
        <Card small className="mb-4" style={{ overflowX: "scroll" }}>
          <CardHeader className="border-bottom">
            <h6 className="m-0">{col.name}</h6>
          </CardHeader>
          <CardBody className="p-0 pb-3">
            <table
              className="table mb-0"
              key={idx}
              style={{ overflow: "hidden" }}
            >
              <thead className="bg-light">
                <tr>
                  {row.map((data, idx) => {
                    return (
                      <th scope="col" className="border-0">
                        {data}
                      </th>
                    );
                  })}
                </tr>
              </thead>
              <tbody className="text-center ">
                <tr>
                  <td scope="col" className="border-0">
                    {col._id}
                  </td>
                  <td scope="col" className="border-0">
                    {col.chapters}
                  </td>
                  <td scope="col" className="border-0">
                    {col.count}
                  </td>
                  <td scope="col" className="border-0">
                    {new Date(col.createdAt).toLocaleDateString()}
                  </td>
                </tr>

                {/* :<div>loading...</div>} */}
              </tbody>
            </table>
          </CardBody>
        </Card>
      </Col>
    </Row>
  </Container>
);

export default Tables;
