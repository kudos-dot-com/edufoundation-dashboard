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
import csv from 'csvtojson'
import api from "../data/apiLink";
import network from "../network/axios";

export default function CompleteFormExample() {
  const [coptions, setoptions] = useState({
    name: "",
    subject: window.location.pathname.split("/")[2],
    file:""
  });
  const [text, settext] = useState("submit");

  async function addOptions(key, value) {
    console.log(coptions);
    
    coptions[key] = value;
    setoptions(coptions);
    
  }
  async function handleSubmit(e) {
    // e.preventDefault();
    console.log(coptions);
    settext("submitting...");
    var fd = new FormData();
    fd.append("file",coptions.file);
    fd.append("subject",coptions.subject);
    console.log(fd.get("subject"),fd.get("file"));

    const url = api.post.bulkUpload;
    const result = await network.formUrl(url, fd);
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
                  <label htmlFor="feEmailAddress">Upload Excel file</label>
                    <div className="custom-file mb-3">
                      <input
                        type="file"
                        onChange={e => addOptions('file',e.currentTarget.files[0])}
                        className="custom-file-input"
                        id="customFile2"
                      />
                      <label
                        className="custom-file-label"
                        htmlFor="customFile2"
                      >
                        Choose file...
                      </label>
                       
                    </div>
            </Col>
          </Row>

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
