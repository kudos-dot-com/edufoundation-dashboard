import React from "react";
import {
  Container,
  Row,
  Col,
  Card,
  CardBody,
  CardFooter,
  Badge,
  Button
} from "shards-react";
import { data } from "../../data/subject-dash-Items";
import { NavLink as RouteNavLink } from "react-router-dom";
import { NavItem, NavLink } from "shards-react";
import PageTitle from '../../components/common/PageTitle'

export default function cards({subject}) {
  console.log(subject)
  return (
    <Container className="mt-4">

      <Row>
      
        <Col>
      <PageTitle title={subject.toUpperCase()} subtitle="Dashboard" className="text-sm-left mb-3" />
        </Col>      
      </Row>
      <br />
     <Row  className="d-flex flex-wrap text-decoration-none">
      {data.map((post,idx) => {
        return (
            <Col lg="4" md="4" sm="10" className="mb-4" key={idx}>
            <NavLink tag={RouteNavLink} to={`/${post.to}/${subject}`}>    
          
            <Card  className="card-post card-post-2 py-2 text-center">
              {/* <div
                className="card-post__image"
                style={{ backgroundImage: `url(${post.backgroundImage})` }}
              >
              </div> */}
              <CardBody>
                <h4 className="card-title">
                  <a href="#" className="text-fiord-blue">
                    {post.title}
                  </a>
                </h4>

              </CardBody>
            </Card>
            </NavLink>
          </Col>
         
        );
      })}
     
      </Row>
    </Container>
  );
}
