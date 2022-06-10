import React, { useState, useEffect } from "react";
import CustomFileUpload from "../components/components-overview/CustomFileUpload";
import {
  Container,
  ListGroup,
  ListGroupItem,
  Row,
  Col,
  Form,
  FormInput,
  FormGroup,
  FormCheckbox,
  FormSelect,
  Button
} from "shards-react";
import api from "../data/apiLink";
import network from "../network/axios";

export default function CompleteFormExample() {
  const [coptions, setoptions] = useState({
    name: "",
    subject: window.location.pathname.split("/")[2]
  });
  const [text, settext] = useState("submit");

  function addOptions(key, value) {
    coptions[key] = value;
    setoptions(coptions);
    console.log(coptions);
  }
  async function handleSubmit(e) {
    // e.preventDefault();
    console.log(coptions);
    settext("submitting...");
    const url = api.post.apiTopic;
    const result = await network.postUrl(url, coptions);
    console.log(result);
    settext("submit");
    alert(result.message);
  }
  return (
    <Container>
      <ListGroup flush className="mt-5">
        <ListGroupItem className="p-3">
          <Row form>
            <Col md="12" className="form-group">
              <label htmlFor="feEmailAddress">Topic</label>
              <FormInput
                onChange={e => {
                  addOptions("name", e.target.value);
                }}
                id="feEmailAddress"
                type="text"
                placeholder="Option 1"
                Row="5"
              />
            </Col>
          </Row>
          {/* <Row form>
                <Col md="12" className="form-group">
                  <label htmlFor="feInputState">subject</label>
                  <FormSelect id="feInputState"
                    onChange={(e)=>{addOptions("subject",e.target.value)}}
                  
                  >
                    <option>Choose...</option>
                    <option>physics</option>
                    <option>chemistry</option>
                    <option>biology</option>
                    <option>mathematics</option>

                  </FormSelect>
                </Col>                
              </Row> */}

          <Button
            onClick={e => {
              handleSubmit();
            }}
          >
            {text}
          </Button>
        </ListGroupItem>
      </ListGroup>
    </Container>
  );
}
