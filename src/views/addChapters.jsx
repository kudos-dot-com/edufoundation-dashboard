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
    subject: window.location.pathname.split("/")[2],
    topic: ""
  });
  const [topics, settopic] = useState([]);
  const [text, settext] = useState("submit");
  useEffect(() => {
    // console.log(useLocation())
    (async () => {
      const url = api.get.getTopics + window.location.pathname.split("/")[2];
      const result = await network.getUrl(url);
      console.log(result);

      if (result) {
        settopic(result.result);
        coptions["topic"] = result.result[0].name;
      }
    })();
  }, []);
  function addOptions(key, value) {
    coptions[key] = value;
    setoptions(coptions);
    console.log(coptions);
  }
  async function handleSubmit(e) {
    // e.preventDefault();
    console.log(coptions);
    settext("submitting...");
    const url = api.post.apiChapter;
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
              <label htmlFor="feInputState">topic</label>
              <FormSelect
                id="feInputState"
                onChange={e => {
                  addOptions("topic", e.target.value);
                }}
              >
                {topics ? (
                  topics.map((data, idx) => {
                    return <option>{data.name}</option>;
                  })
                ) : (
                  <option>Choose...</option>
                )}
              </FormSelect>
            </Col>
          </Row>
          <Row form>
            <Col md="12" className="form-group">
              <label htmlFor="feEmailAddress">subtopic</label>
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
          

          <Col md="12" className="form-group">
            <FormCheckbox>
              {/* eslint-disable-next-line */}I agree with your{" "}
              <a href="#">Privacy Policy</a>.
            </FormCheckbox>
          </Col>
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
